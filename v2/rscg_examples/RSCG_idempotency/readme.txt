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
