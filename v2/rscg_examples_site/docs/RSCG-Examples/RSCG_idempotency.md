---
sidebar_position: 2520
title: 252 - RSCG_idempotency
description: Generating code for idempotency
slug: /RSCG_idempotency
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveIdempotency.mdx';

# RSCG_idempotency  by Ignat Andrei


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_idempotency?label=RSCG_idempotency)](https://www.nuget.org/packages/RSCG_idempotency/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_idempotency?label=updated)](https://github.com/ignatandrei/RSCG_idempotency)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_idempotency?style=social)

## Details

### Info
:::info

Name: **RSCG_idempotency**

Automatic generating Idempotency for function parameters

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_idempotency/*   


You can find more details at https://github.com/ignatandrei/RSCG_idempotency

Source: https://github.com/ignatandrei/RSCG_idempotency

:::

### Author
:::note
Ignat Andrei 
![Alt text](https://github.com/ignatandrei.png)
:::

### Original Readme
:::note

# RSCG Idempotency Generator - Usage Guide

## Installation

Install the package RSCG_Idempotency 
[![NuGet](https://img.shields.io/nuget/v/RSCG_Idempotency.svg)](https://www.nuget.org/packages/RSCG_Idempotency/)
from nuget .

## Overview

The RSCG (Roslyn Source Code Generator) Idempotency module provides automatic duplicate detection and prevention for method parameters. It uses the `[Idempotent]` attribute to mark parameters that should be tracked, generating helper infrastructure to ensure idempotent behavior.


## Key Concepts

### What is Idempotency?
Idempotency means that performing the same operation multiple times with identical inputs produces the same result as performing it once. This generator helps enforce this by:
- Tracking which parameter values have been processed before
- Providing methods to check for duplicates
- Cleaning up old cached entries automatically

### Generated Components

1. **IdempotentAttribute** - Marks parameters for tracking
2. **TimeProvider** - Supplies UTC timestamps for cache entries
3. **Helper Methods** - Generated per method to manage the duplicate tracking

## Usage

### Step 1: Mark Parameters with `[Idempotent]`

In your C# method, apply the `[Idempotent]` attribute to parameters you want to track:

```csharp
using RSCG_IdemPotency;

public partial class YourClass
{
    public void ProcessData([Idempotent] string input, int retry)
    {
        // Your implementation here
        // The generator will create tracking infrastructure for 'input'
    }
}
```

### Step 2: Generated Helper Methods

For each method with `[Idempotent]` parameters, the generator creates:

#### Check for Duplicates
```csharp
private bool MethodName_ExistsBefore(T parameter)
{
    // Returns true if the parameter was processed before
    // Returns false if it's the first occurrence
}
```

Example:
```csharp
public void ProcessData([Idempotent] string input, int retry)
{
    if (ProcessData_ExistsBefore(input))
    {
        // This input was already processed
        Console.WriteLine("Duplicate detected, skipping");
        return;
    }
    
    // Process new input
    Console.WriteLine($"Processing: {input}");
}
```

#### Clean Up Old Entries
```csharp
private void MethodName_DeletePreviousData(DateTimeOffset dt)
{
    // Removes cached entries older than the specified date
}
```

Example:
```csharp
public void CleanupCache()
{
    var oneHourAgo = DateTimeOffset.UtcNow.AddHours(-1);
    ProcessData_DeletePreviousData(oneHourAgo);
    Console.WriteLine("Cleaned up entries older than 1 hour");
}
```

## Generated Infrastructure Details

### Caching Mechanism

For each method, a static `ConcurrentDictionary` is created:

```csharp
static ConcurrentDictionary<ParameterType, DateTimeOffset> MethodName_Dict = [];
```

- **Key**: The parameter value being tracked (e.g., string, int)
- **Value**: UTC timestamp when first encountered

### Thread Safety

The generator uses `ConcurrentDictionary` to ensure thread-safe operations in multi-threaded scenarios.

## Complete Example

### Original Method Definition

```csharp
using RSCG_IdemPotency;

public partial class PaymentProcessor
{
    public void ProcessPayment([Idempotent] string transactionId, int maxRetries)
    {
        if (ProcessPayment_ExistsBefore(transactionId))
        {
            Console.WriteLine($"Transaction {transactionId} already processed");
            return;
        }
        
        // Process new transaction
        Console.WriteLine($"Processing payment for transaction: {transactionId}");
        // ... payment logic ...
    }
    
    public void MaintenanceCleanup()
    {
        // Remove transactions processed more than 30 days ago
        var thirtyDaysAgo = DateTimeOffset.UtcNow.AddDays(-30);
        ProcessPayment_DeletePreviousData(thirtyDaysAgo);
    }
}
```

### Generated Code (Auto-created by RSCG)

```csharp
partial class PaymentProcessor
{
    static ConcurrentDictionary<string, DateTimeOffset> ProcessPayment_Dict = [];
    
    private bool ProcessPayment_ExistsBefore(string transactionId)
    {
        var tp = IdemPotentTimeProvider.timeProv;
        var utcDate = tp.GetUtcNow();
        var existing = ProcessPayment_Dict.GetOrAdd(transactionId, utcDate);
        if (utcDate == existing) return false; // First time
        return true; // Seen before
    }
    
    private void ProcessPayment_DeletePreviousData(DateTimeOffset dt)
    {
        var values = ProcessPayment_Dict.Where(it => it.Value < dt).ToArray();
        if (values.Length == 0) return;
        foreach (var item in values)
        {
            ProcessPayment_Dict.TryRemove(item.Key, out _);
        }
    }
}
```

## Best Practices

### 1. Use Partial Classes
The generated code modifies partial classes, so declare your class as `partial`:

```csharp
public partial class MyService
{
    public void MyMethod([Idempotent] string input, int retry)
    {
        // Implementation
    }
}
```

### 2. Check for Duplicates Early
Always call the `*_ExistsBefore()` method at the start of your logic:

```csharp
public void ProcessRequest([Idempotent] string requestId)
{
    if (ProcessRequest_ExistsBefore(requestId))
        return; // Skip duplicate
    
    // Main logic
}
```

### 3. Implement Cache Cleanup
For long-running applications, periodically clean old entries:

```csharp
public void PeriodicMaintenance()
{
    var oneDayAgo = DateTimeOffset.UtcNow.AddDays(-1);
    MyMethod_DeletePreviousData(oneDayAgo);
}
```

### 4. Multiple Parameters
If multiple parameters need tracking, apply `[Idempotent]` to each:

```csharp
public void Transfer([Idempotent] string sourceAccount, [Idempotent] string destAccount, decimal amount)
{
    if (Transfer_ExistsBefore(sourceAccount) || Transfer_ExistsBefore(destAccount))
        return;
    // Process transfer
}
```

### 5. Memory Considerations
The tracking dictionary persists for the lifetime of the application. For high-volume scenarios:
- Implement aggressive cleanup schedules
- Consider application restart strategies
- Monitor cache size in production

## Time Provider

The generator uses `IdemPotentTimeProvider.timeProv` (set to `TimeProvider.System` by default) for UTC timestamps. This enables:
- Accurate timestamp recording
- Testability (can be mocked in tests)
- System-independent time handling

## Summary

| Component | Purpose |
|-----------|---------|
| `[Idempotent]` attribute | Marks parameters for duplicate tracking |
| `*_ExistsBefore()` method | Checks if a parameter was previously processed |
| `*_DeletePreviousData()` method | Cleans up old cache entries |
| `*_Dict` static dictionary | Stores tracked parameter values and timestamps |
| `IdemPotentTimeProvider` | Supplies UTC timestamps |

This generator simplifies idempotent operation implementation, reducing the boilerplate needed for duplicate detection and prevention.


:::

### About
:::note

Generating code for idempotency


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_idempotency**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Caching.Memory" Version="10.0.2" />
    <PackageReference Include="RSCG_idempotency" Version="10.2026.127.2000" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_idempotency** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using IdempotencyDemo;

Console.WriteLine("Hello, World!");
Purchase p=  new Purchase();
var uniq = Guid.NewGuid().ToString("D");
var s= p.PurchaseNow(uniq, "Book1", 20);
Console.WriteLine(s);
s = p.PurchaseNow(uniq, "Book1", 20);
Console.WriteLine(s);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\Purchase.cs" label="Purchase.cs" >

  This is the use of **RSCG_idempotency** in *Purchase.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;

namespace IdempotencyDemo;

internal partial class Purchase
{
    public bool PurchaseNow([RSCG_IdemPotency.Idempotent]string UniqueId, string idProduct,int quantity)
    {
        if(PurchaseNow_ExistsBefore(UniqueId))
            return false;

        Console.WriteLine($"bought ! ");
        return true;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\obj\GX\RSCG_idempotency\RSCG_idempotency.IPGen\IdempotencyDemo_Purchase_PurchaseNow_UniqueId.cs" label="IdempotencyDemo_Purchase_PurchaseNow_UniqueId.cs" >
```csharp showLineNumbers 

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool. Name: https://github.com/ignatandrei/RSCG_idempotency
//     Runtime Version: 2026-01-27T18:12:56.0000000
//     ( name : Ivo Andric is feeling cut in Vientiane )
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//</auto-generated>
//------------------------------------------------------------------------------
using System.Linq;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;
namespace IdempotencyDemo {
partial class Purchase {

    
    static ConcurrentDictionary<string , DateTimeOffset> PurchaseNow_Dict=[];
    /// <summary>
    /// Verify if the argument was before
    ///</summary>
    ///<param name="input">the data</param>
    /// <returns>true if exists before;false if encountered first time</returns>
    [global::System.CodeDom.Compiler.GeneratedCode("RSCG_idempotency", "2026.10127.11812")]
    private bool PurchaseNow_ExistsBefore( 
        string UniqueId) {
        
        var tp=IdemPotentTimeProvider.timeProv;
        var utcDate = tp.GetUtcNow();
        var existing = PurchaseNow_Dict.GetOrAdd(UniqueId,utcDate);
        if(utcDate == existing) return false;//it was inserted now
        return true;
    
    }
    /// <summary>
    /// clear the data before a date
    ///</summary>
    ///<param name="dt">date to remove previous</param>
    private void PurchaseNow_DeletePreviousData(DateTimeOffset dt)
    {
        var values = PurchaseNow_Dict.Where(it => it.Value < dt).ToArray();
        if (values.Length == 0) return;
        foreach (var item in values)
        {
            PurchaseNow_Dict.TryRemove(item.Key,out _);
        }
    }

}

}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\obj\GX\RSCG_idempotency\RSCG_idempotency.IPGen\IdempotentAttribute.gen.cs" label="IdempotentAttribute.gen.cs" >
```csharp showLineNumbers 

namespace RSCG_IdemPotency
{
    //TODO : Add versioning info in the attribute
    [global::Microsoft.CodeAnalysis.EmbeddedAttribute]
    [System.AttributeUsage(System.AttributeTargets.Parameter, AllowMultiple = false)]
    internal class IdempotentAttribute : global::System.Attribute
    {
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\obj\GX\RSCG_idempotency\RSCG_idempotency.IPGen\Microsoft.CodeAnalysis.EmbeddedAttribute.cs" label="Microsoft.CodeAnalysis.EmbeddedAttribute.cs" >
```csharp showLineNumbers 
// <auto-generated/>
namespace Microsoft.CodeAnalysis
{
    internal sealed partial class EmbeddedAttribute : global::System.Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_idempotency\src\IdempotencyDemo\obj\GX\RSCG_idempotency\RSCG_idempotency.IPGen\TimeProvider.gen.cs" label="TimeProvider.gen.cs" >
```csharp showLineNumbers 

class IdemPotentTimeProvider{
    internal static TimeProvider timeProv= TimeProvider.System;
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RSCG_idempotency ](/sources/RSCG_idempotency.zip)

:::


### Share RSCG_idempotency 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency&quote=RSCG_idempotency" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency&text=RSCG_idempotency:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency&title=RSCG_idempotency" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency&title=RSCG_idempotency&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_idempotency" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_idempotency

<SameCategory />

