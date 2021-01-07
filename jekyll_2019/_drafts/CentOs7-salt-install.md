---
layout: page
title: "Salt installation on CentOS 7"
date: 2019-05-29
categories: salt
tags: salt
---

## Install Salt Master
```console 
curl -o bootstrap-salt.sh -L https://bootstrap.saltstack.com
```
```console
sudo sh bootstrap-salt.sh -M -N 
````

Verify salt-master is running with systemctl status salt-master