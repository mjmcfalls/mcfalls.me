---
layout: page
title: "Openstack install Notes"
date: 2018-08-09
categories: openstack
tags: openstack
---
* Add to ~/.bash_profile to persist across sessions, and allow use of the openstack cli.
* Will require typing passwords, unless passwords is set or a token is retrieved.

export OS_USERNAME=admin
export OS_AUTH_URL=http://URL:5000/v3
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_IDENTITY_API_VERSION=3

* Get physical interface with ip addr (ex: enp6s0)