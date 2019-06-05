---
layout: page
title: "Powershell Notes - Advanced Automated Administration Class"
date: 2019-06-05
categories: powershell class notes
tags: powershell notes
---

These are my notes from the Global Knowledge "Advanced Automated Administration with Powershell" class. Class ran from 2019-06-03 to 2019-06-05.  


##### Advanced Functions and Parameter blocks
* Add ```[CmdletBinding()]``` to the head of the function or script.  
Parameter block example:
```powershell
Param(
    $ParamOne, #No type or conditions
    [string]$ParamTwo, # parameter expects a string
    [string]$ParamThree = "DefaultValue", # Parameter expects a string, and defaults to "DefaultValue" if no value is provided.
    [Parameter(Mandatory=$true)]
    [string]$ParamFour, # Sets parameter to mandatory.  $True is not required as adding Mandatory assumes true.
)
```
* ```[string[]]``` allows multiple string inputs and requires logic in script to handle; ex: multiple computer names.
* ```[ValidateCount(start,end)]``` sets a min and max number of inputs to a parameter.
* ```[ValidateSet()]``` Validates only items in the list can be used and are available via tab completion.
* ```[ValidateScript({True or False script block})]``` Validate a script block, which evaluates to True or False.<br/>
Example: 
```powershell
    [ValidateScript({
        If(Test-Path(Split-Path $_)){
            $True
        }
        else {
            Throw "Could not find $_"
            }
    })]
```
<br/>
##### Script Modules
* Modules end in .psm1 and are only renamed ps1 files.
* ```PSModulePath``` contains the paths to script modules.
* Module name and the directory name must match if not using a module manifest.
```powershell
    Import-Module ModuleName.psm1 # Import Module
    Remove-Module ModuleName # Remove Module
    dir function: # List install modules
    Get-command # List all available commands
```
<br/>

#### Module Manifest
```powershell
    New-ModuleManifest -Path Path\To\File.psd1 -RootModule FileName.psm1 # Generate a Module Manifest
```
* Recommended to use module manifest for more fine grained control over the module.
* In the manifest, ```FunctionToExport`` change be changed to limit the functions exposed to users.  The other internal functions would still be available for the exposed functions to use.
* Validate a module manifest with ```Test-ModuleManifest``` 


##### Breakpoints  
* Backtick (`) without a trailing space breaks a command to the next line.  
* Multiple function parameters can be broken onto separate lines with a backtick without a trailing space.  
* The best place to break multiple pipes is right after the pipe (|) symbol and does not require a backtick.  
<br/>
* "." references the localhost.  
*  Works for most Powershell commands, but a few it won't work with.
* It would not display the name of the local computer.  If the computer name needs to be display, ```$env:COMPUTERNAME``` should be used instead.
<br/>

###### Positional Parameters
* Follow the order of the parameters defined in the function or script.
* Rearranging the order of the parameters changes the order.
<br/>

###### WMI Examples
* Select all Win32_LogicalDisk properties from local computer: ```Get-WmiObject Win32_LogicalDisk```
* Select all logical disks from computer Alpha: ```Get-WmiObject Win32_LogicalDisk -ComputerName Alpha```
* Select Logical disks from Alpha with drive type 3: ```Get-WmiObject Win32_LogicalDisk -ComputerName Alpha | Where-Object { $_.DriveType -eq 3}```
<br/>

###### Where-Object 
There are two basic formats:
* Simple: ```Where-Object DriveType -eq 3```
* Advanced: ```Where-Object { $_.DriveType -eq 3}```
<br/>
The advanced format allows more complex selection critiera including logical AND/OR, while the simple syntax does not support more than a single condition.

