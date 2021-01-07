---
title: "MotionEye - Lessons Learned"
date: 2020-12-26T00:57:58Z
draft: true
---
Here is what I learned from setting up MotionEye on Centos 8 in a docker container.

The MJPEG stream does not work on the Foscam C1 version 1. 
The set subVideo commands succeed (```http://IP-ADDRESS:88/cgi-bin/CGIProxy.fcgi?cmd=setSubVideoStreamType&streamType=0&usr=admin&pwd=Password```), but result in an access denied when trying to view with the correct credentials.

Here's an example of the success message from the URL command above. 
```xml
<CGI_Result>
    <result>0</result>
</CGI_Result>
```

The rstp connection works with the following address: ```rtsp://IP-ADDRESS/videoMain```.  Do not include the username and password in the URI. To add the camera in MotionEye, place the username and password in the respective fields, instead of in the URI.s

Here's the RSTP address for streaming with VLC: ```rtsp://admin:password@IP-ADDRESS/videoMain```
Replace admin, password, and IP-ADDRESS with the appropriate values. 