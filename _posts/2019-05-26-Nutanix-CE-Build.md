---
layout: page
title: "Nutanix CE Cluster Build"
date: 2019-05-22
categories: [nutanix, homelab]
tags: [nutanix, homelab]
---


I was slowly purchasing used equipment to build out a storage cluster to replace an underpowered whitebox NAS.  While the hardware was sitting around waiting for me to purchase hard drives for the storage cluster, I decided it would be fun to install Nutanix CE to get a better feel for the same tools we use at work. 

##### Overall
--------
Overall, Nutanix CE has performed quite well on these systems.  They are, however, not the best choice for getting the best experience out of Nutanix.  The HP Z600s are capped at 24 GBs of RAM, which highly limits the number of workloads the cluster can run, especially if Prism Central is installed. 

Each CVM (controller virtual machine) requires a minimum of 12 GBs of RAM.  I ended overridding the minimum down to 8 GBs to provide more RAM availablity; at 8 GBs of RAM for the CVMs, Prism Central will install, but will not start up, because it requires 16 GBs of RAM -- which is more than a single node could provide.  Not being able to run Prism Central reduces some of the features available, it specifically limits behind able to use terraform to manage the virtual machines.


##### Hardware
--------

Below is a list of the hardware I ended up using for the running cluster -- as of 2019-05-22:
<table>
<colgroup>
    <col width="5%" />
    <col width="10%" />
    <col width="15%" />
    <col width="15%" />
    <col width="10%" />
</colgroup>
<thead>
    <tr>
        <th>Server</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>SSD</th>
        <th>HDD</th>
    </tr>
</thead>
<tbody>
<tr>
    <td>HP Z600</td>
    <td>2x Xeon X5650</td>
    <td>24 GB (6x 4GB DDR3)</td>
    <td>Crucial BX500 240GB</td>
    <td>500 GB</td>
</tr>
<tr>
    <td>HP Z600</td>
    <td>2x Xeon X5650</td>
    <td>24 GB (6x 4GB DDR3)</td>
    <td>Crucial BX500 240GB</td>
    <td>750 GB</td>
</tr>
<tr>
    <td>HP Z600</td>
    <td>2x Xeon X5675</td>
    <td>24 GB (6x 4GB DDR3)</td>
    <td>Crucial BX500 240GB</td>
    <td>500 GB</td>
</tr>
</tbody> 
</table>

I had a spare Dell T710 running a single L5640 with 20 GBs of RAM instead of one of the HP Z600s.  The Dell was much better suited to the cluster and I had purchased an additional processor for the system, however the Dell turned out to be too noisy for use around my desk, and ultimately was swapped out for a quieter HP Z600.  


#### Build Specific steps
--------
I am not going to document where and how to put Nutanix CE on a USB 3 flash drive -- there are plenty of guides to do similar things.  
This first time I built the cluster I took the long way around to get the old network inferface names. The shorter version is much easier and quicker.  

##### Set interface names
1. Edit Grub - `vi /etc/default/grub`  
2. Add `net.ifnames=0 biosdevname=0` to the line starting with GRUB_CMDLINE_LINUX.  
3. Regenerate grub -  `grub2-mkconfig -o /boot/grub2/grub.cfg`  
4. Reboot  
5. Verify with `ip addr`  
<br/>
##### Reduce memory for Controller Virtual Machines (CVM)
It is best to reduce the CVM memory before creating a cluster.  Otherwise the cluster will need to be shutdown, before any change to the CVM or host can be made.  
I would not recommend less than 8 GBs of RAM for the CVM otherwise it will not start all the services.
1. SSH into the Nutanix node (not the CVM).
2. List the running VMs to get the VM name 
```console
virsh list --all
```
3. Shutdown the CVM (This could take couple of minutes).
```console
virsh shutdown VMNAME
``` 
4. Set the memory  (8G references 8 GBs of memory)
```console 
virsh setmem VMANME 8G --config
''`<br/>  
5. Set max memory 
```console
virsh setmaxmem VMNAME 8G --config
```
6. Start the virtual machine  
```console
virsh start VMNAME
```
7. Verify VM starts and memory changes take affect 
```console
virsh dominfo VMNAME
```  
<br/>
##### Dell T710 Specific issues
Installing Nutanix CE on the Dell T710 ran into issues before the install would start.  
The same changes for the network interface names was required to get Prism to see the network interfaces. 
Specifically, the installer could not find the BNX firmware. I manually created a symlink from the existing firmware to the a filename the installer was looking for with:  
* ```console
ln -s /var/lib/firmware/bnx2/bnx2-mips-09.6.21.a.fw /var/lib/firware/bnx2/bnx2-mips-09-06-21.b.fw
```
This allowed the installer to complete.  
<br/>
##### Creating a cluster
1. Log into a CVM vi ssh.
2. Create a cluster with the CVM IPs
 ```console 
ncli cluster -s <CVM IP addresses>
```
3. Start the cluster 
```console 
ncli cluster start
```
4. Set the cluster name 
```console
ncli cluster edit-params new-name=NAME
```
5. Set DNS servers 
 ```console
ncli cluster edit-params add-to-name-servers servers=<name of IP addresses>"
```
6. Show DNS servers  
 ```console
ncli cluster getname-servers
```
7. Set NTP servers 
```console
ncli cluster add-to-ntp-servers servers=<name or IP address of server>
```
8. Set Cluster IP 
```console 
ncli cluster external-ip-address=<IP Adress>
```  
<br/>
#### Notes 
--------
* This design does not have the capacity to run Prism Central without lowering the CVM memory.  I have not tested if the memory of the CVMs can be set to 6 or 7 GBs.  I would not set the CVM memory lower than 8 GBs on this hardware, as the CVMs periodically get a little bit of lag.  
* Performance could be improved by swapping out the BX500 SSDs with higher IOP SSDs and installing a better SATA controller (than the stock HP Z600).


