---
layout: page
title: "Elasticstack Install Notes"
date: 2018-07-28
categories: elasticstack
tags: elasticstack
---

<!-- Configure netflow2 support in ERL with 
{% highlight  console %}
set system flow-accounting interface eth0
set system flow-accounting netflow engine-id 0
set system flow-accounting netflow server 10.255.255.87 port 5606
set system flow-accounting netflow version 9
{% endhighlight %}

Set netflow in /etc/logstash/logstash.yaml
modules:
- name: netflow
  var.input.tcp.port: 5606

  Specify which interface should default to the applicable zone.
-->
* Edit network config at /etc/sysconfig/network-scripts/ifcfg-interfacename
* Add [ZONE=internal] without brackets
* Configure the Linux firewall with the following commands; port number may change depending on configuration:  

{% highlight console%}
sudo firewall-cmd --set-default-zone=internal
sudo firewall-cmd --permanent --zone=internal --add-port=514/tcp #syslog port
sudo firewall-cmd --permanent --zone=internal --add-port=514/udp #syslog port
sudo firewall-cmd --permanent --zone=internal --add-port=5514/tcp #syslog forwarded port
sudo firewall-cmd --permanent --zone=internal --add-port=5514/udp #syslog forwarded port
sudo firewall-cmd --permanent --zone=internal --add-port=5600/tcp #kibana
sudo firewall-cmd --permanent --zone=internal --add-port=5601/tcp #kibana
sudo firewall-cmd --permanent --zone=internal --add-port=5606/tcp #netflow
sudo firewall-cmd --permanent --zone=internal --add-port=5606/udp #netflow
sudo firewall-cmd --permanent --zone=internal --add-port=9600/tcp #logstash
sudo firewall-cmd --permanent --zone=internal --add-port=9200/tcp #elasticsearch
sudo firewall-cmd --permanent --zone=internal --add-port=9300/tcp #elasticsearch
sudo firewall-cmd --zone=internal --add-masquerade --permanent
{% endhighlight %}

* Restart the networking service and firewall service:  

{% highlight console %}
sudo systemctl restart network.service
sudo systemctl restart firewalld
{% endhighlight %}

* Add port forwarding from configured syslog port to the default syslog port; this is because ports below 5000 require administrative rights, and it was easier to forward packets.
{% highlight console %}
sudo firewall-cmd --add-forward-port=port=514:proto=udp:toport=5514 --permanent
sudo firewall-cmd --add-forward-port=port=514:proto=tcp:toport=5514 --permanent
sudo systemctl restart firewalld
{% endhighlight %}

* Verify the firewall configurations with the following commands:  
{% highlight console %}
firewall-cmd --list-all-zones
firewall-cmd --zone=internal --list-all
firewall-cmd --zone=internal --query-masquerade
{% endhighlight %}

<!-- {% highlight console %}
Change ELASTIFLOW_NETFLOW_IPV4_PORT  in /etc/systemd/system/logstash.service.d/elastiflow.conf to 5606
sudo systemctl daemon-reload
sudo systemctl restart logstash
{% endhighlight %} -->