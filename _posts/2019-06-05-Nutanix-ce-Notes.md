---
layout: page
title: "Nutanix CE Notes"
date: 2019-06-05
categories: nutanix ce
tags: nutanix ce
---

* Verify all hosts and CVMs are in the same time zone.
* If putting the CVMs and hosts in a different native VLAN, it is easier to do before creating VMs, but can be done afterwards if down time is not an issue.

* Get cluster parameters - ```ncli cluster get-params```
* Set Cluster time zone = ```ncli cluster set-timezone timezone=America/New_York```
* Cluster status = ```cluster status```

* Check /etc/resolv.conf on the hosts.  Mine was missing after the initial install, and started throwing errors after a few days.  I resolved it by creating the file with similar DNS servers as the CVMs.

* Nutanix Cluster Check (NCC)
* Run Multiple checks: ```ncc health_checks system_checks plugin_list=cluster_version_check,cvm_reboot_check```  
* Run all: ```ncc health_checks run_all```
* Rerun failing checks: ```ncc --rerun_failing_plugins=True```

* Checks can be run in parallel with ```--parallel=4``` flag (4 is the max)
* Display status in terminal with --use-npyscreen

* Power Off all VMs that are powered on: ```for vm_name in `acli vm.list power_state=on | grep -v ^'VM name' | awk '{print $1}'`; do acli vm.force_off $vm_name; done```  

* Change CVM vlan: ```change_cvm_vlan VLAN_ID```
* Set the OpenVSwitch Vlan on the host: ```ovs-vsctl set port br0 tag=10```


* Power on all powered off VMs: ```for vm_name in `acli vm.list power_state=off | grep -v ^'VM name' | awk '{print $1}'`; do acli vm.on $vm_name; done```

