# Hangfire.RecurringJob [![Nuget](https://img.shields.io/nuget/v/IeuanWalker.Hangfire.RecurringJob)](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) [![Nuget](https://img.shields.io/nuget/dt/IeuanWalker.Hangfire.RecurringJob)](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) 

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/IeuanWalker/Hangfire.RecurringJob/actions/workflows/build.yml/badge.svg)](https://github.com/IeuanWalker/Hangfire.RecurringJob/actions/workflows/build.yml)

Automatically generates the recurring job registration code using source generators

## How to use it?
1. Install the [NuGet package](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) into your project.
```
Install-Package IeuanWalker.Hangfire.RecurringJob
```

2. Add the `RecurringJob` attribute to a class, and create an `Execute()` method.
```csharp
[RecurringJob]
public class RecurringJob1
{
	public Task Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob("* * * *")]
public class RecurringJob2
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob("* * * *", "Priority")]
public class RecurringJob3
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob]
[RecurringJob("*/5 * * * *", "GMT", "Priority", "DataRetention")]
public class RecurringJob4
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}
```
3. Register the recurring jobs
> Once a `RecurringJob` attribute has been added to a class in your project an extension method for `IApplicationBuilder` will automatically be created.
> The extension method name convention is AddRecurringJobsFrom + your assembly name.
```csharp
app.AddRecurringJobsFromExampleProject();
```

## Example
Here is an example of what it looks like in use - 
> Left is the example code, and right is the generated code

![image](https://github.com/IeuanWalker/Hangfire.RecurringJob.Generator/assets/6544051/cef12771-5178-46cf-9264-dbb54654efc6)


