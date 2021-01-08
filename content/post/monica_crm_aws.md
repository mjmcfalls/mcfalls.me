---
title: "Monica Personal CRM build in AWS"
description: "My build process for Monica on AWS"
date: 2020-12-26
draft: false
---

Here are the high-level steps. 
1. Create a VPC
2. Create two subnets in the VPC.  One for the app containers, and one for the Aurora database
3. Create two security groups.  One for the database and for the applications containers.
4. Create external access for port 80, 443, 22 in the aapplication security group; create port 3306 access to the database subnet
5. In the security group create port 3306 access back to the application subnet
6. Under the VPCs, create an Internet Gateway.
7. Under the VPC route table, allow external traffic to the Internet Gateway
8. Configure the Aurora serverless database
9. Configure SES for SMTP access; this would include any authorized emails or domains, that need to be created.
    
   
At this point the VPC should be ready for the ECS cluster to be built and the EC2 instances to have connectivity to ECS for the ECS agents to connect the instances to the cluster.  

I purchased a reserved EC2 t3a.small instance for my install.  This instance is a little larger than necessary; it seemed to give me a little bit better performance than a t3a.micro, and I'm content with higher cost.

The code can be found at [https://github.com/mjmcfalls/monica_crm](https://github.com/mjmcfalls/monica_crm)

Notes:
* ECS EC2 instance needs connectivity back to ECS for the agents to report in; I had to add an Internet Gateway get this to happen.
* I was not able to get the contacts from Gmail to import; however, I have only a handful of contacts and imported them by hand.  
```php artisan import:csv "emailAddress" "/tmp/Monica_Import.csv" --format=google``` 
* I have noticed the reminders don't fire with this setup.  I'm not sure if its because the Aurora database is suspended when the alerts fire or another issue. I'm still trying to sort out what's happening with this issue.

