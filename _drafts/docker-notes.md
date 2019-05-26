---
layout: page
title: "Random Docker Notes"
date: 2019-05-26
categories: docker
tags: docker
---

I don't remember the context of these, other than I was interfacing Consul with Registrator and they seemed important to keep.  

{% raw %}
    docker run consul agent -server -client='{{ GetInterfaceIP "eth0" }}' -bind='{{ GetInterfaceIP "eth0" }}' -bootstrap-expect=2
{% endraw %}
 
{% raw %}
    #docker run -d --name=consul_0 -v /tmp/consul:/consul:rw consul consul agent -server -client='{{ GetInterfaceIP "eth0" }}' -bind='{{ GetInterfaceIP "eth0" }}' -bootstrap-expect=2  -data-dir=/consul
{% endraw %}
 
{% raw %}
    #docker run -d --name=consul_0  consul consul agent -server -client='{{ GetInterfaceIP "eth0" }}' -bind='{{ GetInterfaceIP "eth0" }}' -bootstrap-expect=2  -data-dir=/consul
{% endraw %}
 
{% raw %}
    docker run -d --name=consul_0  consul consul agent -server -client='0.0.0.0' -bind='{{ GetInterfaceIP "eth0" }}' -bootstrap-expect=2  -data-dir=/consul
{% endraw %}
 
{% raw %}
    docker run -d --name=consul_0  consul consul agent -server -client='{{ GetInterfaceIP "eth0" }}' -bind='{{ GetInterfaceIP "eth0" }}' join 172.17.0.2
{% endraw %}
 
{% raw %}
    docker run -d --name=registrator -v/var/run/docker.sock:/tmp/docker.sock gliderlabs/registrator:latest consul://172.17.0.2:8500
{% endraw %}
 
{% raw %}
    docker run -d --name=registrator -v/var/run/docker.sock:/tmp/docker.sock gliderlabs/registrator:latest -internal=True consul://172.17.0.2:8500
{% endraw %}
 
{% raw %}
    docker run --rm --name consul-tpl -e CONSUL_TEMPLATE_LOG=debug -v /var/run/docker.sock:/var/run/    docker.sock -v /usr/bin/docker:/usr/bin/docker -v /home/mmcfalls/consul/nginx:/tmp/nginx_config hashicorp/consul-template -template "/tmp/nginx_config/template.ctmpl:/tmp/nginx_config/simple.conf:/usr/bin/docker kill -s HUP nginx" -consul-addr `docker inspect consul_0 --format {{.NetworkSettings.Networks.bridge.IPAddress}}`
{% endraw %}
 
{% raw %}
    docker run --rm --name consul-tpl -e CONSUL_TEMPLATE_LOG=debug -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /home/mmcfalls/consul/nginx:/tmp/nginx_config hashicorp/consul-template -template "/tmp/nginx_config/template.ctmpl:/tmp/nginx_config/simple.conf:docker kill -s HUP nginx" -consul-addr 172.17.0.2:8500
{% endraw %}
 
{% raw %}
    docker run -d --name nginx -p 80:80 -v /home/mmcfalls/consul/nginx:/etc/nginx/conf.d nginx
{% endraw %}
