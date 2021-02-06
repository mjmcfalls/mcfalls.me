---
title: "AwS Solution Architect Pro Notes"
description: "AwS Solution Architect Pro Notes"
date: 2021-02-04
draft: true
---

### Glacier  
  Cheap  
  Slow to respond  
  Aka: cold storage  
  Used by AWS Storage Gateway Virtual tape library as storage  
  Used by S3 Lifecycle Management  
  Faster retrevial speed if pay more  

  Glacier vault is like a S3 bucket.  
  Archives are the files (Max 40TB, immutable)  

  Access controlled by IAM  
  Glacier Vault Lock are the policies applied to the vault; enforce rules like require MFA to delete.  
  Vault lock is immutable; can be overwritted, but not directly changed.  
  24 hours to confirm vault lock or abort; cannot change after 24 hours period.  if not confirmed, in 24 hours, then aborted automatically.  

### EBS (Elastic Block Storage)
 Virtual hard drives  
 Can only be used with EC2  
 Tied to a single AZ 
 Variety of choices optimzed for IOPS, throughput, and/or cost  
 Snapshots!  
 Goes over network to reach volume
 Cost effective backups with snapshots.
 Snapshots can be shared across accounts and users, or used to move EC2 to another AZ
 Converted unecrypted volume to encrypted volume.
 Do not lose the ability to restore if intermediate snapshots or root snapshots are deleted.
 Data Lifecycle Manager: schedule shapshots every few hours; retention rules for removing old/stale snapshots.


### Instance stores
  Better performance becuase directly attached  
  Ideal for caches, buffers, stratch area  
  Temporily, and lost when EC2 stopped or terminated  

### Elastic File Store
  Implementation of NFS
  Only pay for waht you use
  Multi AZ metadata and storage
  Configure mount points in one or several AZs
  Can be mounted from on-premises (No secured, and needs high performance)
    Use Amazon DataSync instead to keep on-prem to 
  EFS is the most expensive option
  Verify if NFSv4 features are supported, if they are needed.

### Storage Gateway
  Virtual machine that runs on-prem with VMware or HyperV
  Or on a specifically configured Dell applicance
  Provides local storage backed by S3 and Glacier
  Used for diaster recover to sync with AWS
  Can be used in cloud migraions (slow sync on-prem data to cloud)
  Modes
  | New Name | Old Name | Interface | Function |
  | File gateway | NA | NFS, SMB | Allow on-prem or EC2 to use NFS or SMB to store objs in S3 |
  | Volume Gateway Stored Mode | Gateway-Stored Volumes | iSCSI | Async replication of on-prem data to S3 |
  | Volume Gateway Cached Mode | Gateway-cached Volumes | iSCSI | Data primarily in stored in S3, with frequently accessed data cached on-prem |
  | Tape Gateway | Gateway-Virtual Tape Library | iSCSI | Virtual media changer and tape library to use with existing backup software |

  Storage gateway contains bandwidth throttling options - good for remote offices with limited bandwidth

### Workdocs
  Secure and fully managed collab service
  Integrates witth AD for SSO
  Web, mobile, and native clients (Windows and MAC)
  No linux client
  HIPAA, PCI DSS, and ISO compliant


### RDS Anti-patterns
| Need | Use intead of RDS |
| Binary objects, BLOBs | S3 |
| Automated scaling | DynamoDB |
| Name/value structure | DynamoDB |
| Unstructured, unpredictable data | DynamoDB |
| Other DBS (ex DB2, SAP HANA) | EC2 |
| Complete DB control | EC2 |

### DynamoDB
  Mult-AZ NoSQL data store
  Has Cross-region replication
  Defaults to eventual consistency reads  
  Can request strongly consistency reads via SDK
  Can support ACID compliance, defaults to BASE
  Priced on throughput, not compute
  Provision anticipated read/write needs
  Autoscaling: watching table for reads/writes -> cloudwatch alarm -> scaling
  Does not automatically scale back down; scale capacity down via synthenic transactions
  on-demand capacity is availabl at a premium cost

### Redshift
Fully managed clustered data warehouse
Cost effect compared to some on-prem warehouses.
PostgreSQL compatiable
JDBC and ODBC drives avialable.
Compatiable with most BI tools
Parallel processing
Columnar data stores optimzed for complex queries
Redshift spectrum -> query data files directon from S3

### Neptune
Managed graph database
Supports open graph APIs fro Gremlin and SPARQL

### Elasticache
Managed implementations of redis and memcached
Scalabilly for memory, writes, reads
in-memory key/value stores