---
title: "Monica Personal CRM build locally in Docker"
description: "My build process for a local dev instance of Monica in Docker"
date: 2020-12-26
draft: false
---

I created a local docker-compose to stand up a development/testing instance for my personal usage.  I stood up a local instance to work with Traefik more and get a better handle on how the Let Encrypt process works with Traefik.

To avoid having to provision a externally accessible domain for testing, I used the the Small Step CA docker container to build work as an ACME server.  I exported the certs, then built a custom traefik container with the Small Step certificates installed.  I tried a couple of other methods, but building a custom container with the certificates proved to be the easier route. 

The dev code can be found at [https://github.com/mjmcfalls/monica_crm](https://github.com/mjmcfalls/monica_crm)


