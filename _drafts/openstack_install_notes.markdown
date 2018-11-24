---
layout: page
title: "Openstack install Notes"
date: 2018-08-09
categories: openstack
tags: openstack
---

* Ran through normal centos install.
* Manually partitioned disks to use LVM.
* Installer wouldn't see one disk, but it showed up in the OS after boot.

* Adding disk to LVM
  * View Volume groups with ' vgdisplay'
  * View Logical volumes with 'lvdisplay'
  * Display physical volumes with 'pvdisplay'
  * Find physical disk with 'lsblk' (ex: /dev/sdc)
  * Create physical volume with: 'pvcreate /dev/sdc'
  * Extend volume group with new physical volume: 'vgextend centos_openstack /dev/sdc'
   * Extend Logical Volume with to use full space of added disk:
    'lvextend volumeGroup/logicalVolume /physical/disk
   * Resize existing volume to use new space: ' xfs_growfs /dev/centos_openstack/home' 
   * Verify sizes with 'df -h'

* Installing Openstack with PackStack
  * Use ss -tulpn to find and disable unnecessary services:
    * Stop services: 'systemctl stop postfix firewalld NetworkManager'
    * Disable services 'systemctl disable postfix firewalld NetworkManager'
    * Mask networkmanager: ' systemctl mask NetworkManager'
    * Remove services: 'yum -y remove postfix NetworkManager NetworkManager-libnm'
  * Disable selinux
    * setenforce 0 (temporary)
    * Change SELINUX= to SELINUX=disabled in /etc/selinux/config (permanent)
  * Verify and update hostname with ' hostnamectl' if needed

  * Install the RDO repo: yum -y install https://www.rdoproject.org/repos/rdo-release.rpm 
  * Search for the current version of openstack with 'yum search centos-release-openstack
  * Install  Openstack Queens with 'yum install -y centos-release-openstack-queens'
  * Install packstack ' yum install -y openstack-packstack'
  * Generate a Packstack config file with 'packstack --gen-answer-file="packstack-`date --iso`".conf
  * Update NTP_SERVERS with 'sed -i 's/CONFIG_NTP_SERVERS=/CONFIG_NTP_SERVERS=0.us.pool.ntp.org/' packstack-2018-08-09.conf'
  * Verify CONFIG_PROVISION_DEMO setting is == n 'sed -n '/CONFIG_PROVISION_DEMO/p' packstack-2018-08-09.conf'
  * Set to 'n' if necessary: 'sed -i 's/CONFIG_PROVISION_DEMO=y/CONFIG_PROVISION_DEMO=n/' packstack-2018-08-09.conf'
  * Get Keystone admin password:  sed -n '/CONFIG_KEYSTONE_ADMIN_PW=/p' packstack-2018-08-09.conf
  * Change Keystone admin password: sed -i "/CONFIG_KEYSTONE_ADMIN_PW=/ c\CONFIG_KEYSTONE_ADMIN_PW=I27sR16bs" packstack-2018-08-09.conf
  * Enable SSL for horizon:
    sed -i '/CONFIG_HORIZON_SSL=/c\CONFIG_HORIZON_SSL=y' packstack-2018-08-09.conf
    [VERIFY changes] sed -n '/CONFIG_HORIZON_SSL=/p' packstack-2018-08-09.conf
  * Get random MariaDB password: sed -n '/CONFIG_MARIADB_PW=/p' packstack-2018-08-09.conf
  * Change MariaDB password: sed -i '/CONFIG_MARIADB_PW=/c\CONFIG_MARIADB_PW=NewPassword' packstack-2018-08-09.conf
  * Add CONFIG_NAGIOS_INSTALL=y to install nagios: sed -i  '$ a\CONFIG_NAGIOS_INSTALL=y' packstack-2018-08-09.conf
  *  Set Nagios admin password: sed -i  '$ a\CONFIG_NAGIOS_PW=I27sR16bs' packstack-2018-08-09.conf
  * Allow Root ssh login: sed -i '/PermitRootLogin/c\PermitRootLogin yes' /etc/ssh/sshd_config
  * Restart sshd: systemctl restart sshd
* Build packstack: packstack --answer-file FILENAME.conf
* This may take some time.

* Openstack dashboard URL/dashboard

* Install nagios: yum install -y nagios nagios-devel nagios-plugins* gd gd-devel php gcc glibc glibc-common openssl



