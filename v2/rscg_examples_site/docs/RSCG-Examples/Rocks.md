---
sidebar_position: 240
title: 24 - Rocks
description: Creating mocks for testing interfaces/classes
slug: /Rocks
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Rocks  by Json Bock


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Rocks?label=Rocks)](https://www.nuget.org/packages/Rocks/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JasonBock/Rocks?label=updated)](https://github.com/JasonBock/Rocks/)
![GitHub Repo stars](https://img.shields.io/github/stars/JasonBock/Rocks?style=social)

## Details

### Info
:::info

Name: **Rocks**

A mocking library based on the Compiler API.

Author: Json Bock

NuGet: 
*https://www.nuget.org/packages/Rocks/*   


You can find more details at https://github.com/JasonBock/Rocks/blob/main/docs/Quickstart.md

Source : https://github.com/JasonBock/Rocks/

:::

### Original Readme
:::note

# Rocks

A mocking library based on the Compiler APIs (Roslyn + Mocks)

## Getting Started

Reference the `Rocks` [NuGet package](https://www.nuget.org/packages/Rocks) - that's it.

### Prerequisites

The Rocks package targets .NET Standard 2.0 for host flexibility. Note that Rocks looks for, and generates, code that targets .NET 7.

## Usage

To make a mock, you take an interface or an unsealed class that has virtual members:

```csharp
public interface IAmSimple
{
  void TargetAction();
}
```

and you use Rocks to create a mock with expectations, along with verifying its usage:

```csharp
var expectations = Rock.Create<IAmSimple>();
expectations.Methods().TargetAction();

var mock = expectations.Instance();
mock.TargetAction();

expectations.Verify();
```

More details can be found on the [Quickstart page](https://github.com/JasonBock/Rocks/blob/main/docs/Quickstart.md).

## Additional Documentation

* [Discord Server](https://discord.com/channels/1035376645864955974/1035376646326321194)
* [Changelog](https://github.com/JasonBock/Rocks/blob/main/changelog.md)
* [Unit testing best practices with .NET Core and .NET Standard](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
* [BenchmarkMockNet](https://github.com/ecoAPM/BenchmarkMockNet)

## Feedback

If you run into any issues, please add them [here](https://github.com/JasonBock/Rocks/issues).

:::

### About
:::note

Creating mocks for testing interfaces/classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Rocks**
```xml showLineNumbers {17}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.5.0" />
    <PackageReference Include="MSTest.TestAdapter" Version="2.2.10" />
    <PackageReference Include="MSTest.TestFramework" Version="2.2.10" />
    <PackageReference Include="coverlet.collector" Version="3.2.0" />
    <PackageReference Include="Rocks" Version="7.1.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MockRock\MockRock.csproj" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Rocks\src\TestClock\TestClock.cs" label="TestClock.cs" >

  This is the use of **Rocks** in *TestClock.cs*

```csharp showLineNumbers 

namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var expectations = Rock.Create<IMyClock>();
        expectations.Methods().GetNow().Returns(DateTime.Now.AddYears(-1));
        
        var mock = expectations.Instance();
        var data= mock.GetNow();
        Assert.AreEqual(DateTime.Now.Year -1, data.Year);
        expectations.Verify();
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Rocks\src\TestClock\obj\GX\Rocks\Rocks.RockCreateGenerator\IMyClock_Rock_Create.g.cs" label="IMyClock_Rock_Create.g.cs" >


```csharp showLineNumbers 
using Rocks.Extensions;
using System.Collections.Generic;
using System.Collections.Immutable;
#nullable enable

namespace MockRock
{
	internal static class CreateExpectationsOfIMyClockExtensions
	{
		internal static global::Rocks.Expectations.MethodExpectations<global::MockRock.IMyClock> Methods(this global::Rocks.Expectations.Expectations<global::MockRock.IMyClock> @self) =>
			new(@self);
		
		internal static global::MockRock.IMyClock Instance(this global::Rocks.Expectations.Expectations<global::MockRock.IMyClock> @self)
		{
			if (!@self.WasInstanceInvoked)
			{
				@self.WasInstanceInvoked = true;
				var @mock = new RockIMyClock(@self);
				@self.MockType = @mock.GetType();
				return @mock;
			}
			else
			{
				throw new global::Rocks.Exceptions.NewMockInstanceException("Can only create a new mock once.");
			}
		}
		
		private sealed class RockIMyClock
			: global::MockRock.IMyClock
		{
			private readonly global::System.Collections.Generic.Dictionary<int, global::System.Collections.Generic.List<global::Rocks.HandlerInformation>> handlers;
			
			public RockIMyClock(global::Rocks.Expectations.Expectations<global::MockRock.IMyClock> @expectations)
			{
				this.handlers = @expectations.Handlers;
			}
			
			[global::Rocks.MemberIdentifier(0, "global::System.DateTime GetNow()")]
			public global::System.DateTime GetNow()
			{
				if (this.handlers.TryGetValue(0, out var @methodHandlers))
				{
					var @methodHandler = @methodHandlers[0];
					@methodHandler.IncrementCallCount();
					var @result = @methodHandler.Method is not null ?
						((global::System.Func<global::System.DateTime>)@methodHandler.Method)() :
						((global::Rocks.HandlerInformation<global::System.DateTime>)@methodHandler).ReturnValue;
					return @result!;
				}
				
				throw new global::Rocks.Exceptions.ExpectationException("No handlers were found for global::System.DateTime GetNow()");
			}
			
			[global::Rocks.MemberIdentifier(1, "global::System.DateTime GetUtcNow()")]
			public global::System.DateTime GetUtcNow()
			{
				if (this.handlers.TryGetValue(1, out var @methodHandlers))
				{
					var @methodHandler = @methodHandlers[0];
					@methodHandler.IncrementCallCount();
					var @result = @methodHandler.Method is not null ?
						((global::System.Func<global::System.DateTime>)@methodHandler.Method)() :
						((global::Rocks.HandlerInformation<global::System.DateTime>)@methodHandler).ReturnValue;
					return @result!;
				}
				
				throw new global::Rocks.Exceptions.ExpectationException("No handlers were found for global::System.DateTime GetUtcNow()");
			}
			
		}
	}
	
	internal static class MethodExpectationsOfIMyClockExtensions
	{
		internal static global::Rocks.MethodAdornments<global::MockRock.IMyClock, global::System.Func<global::System.DateTime>, global::System.DateTime> GetNow(this global::Rocks.Expectations.MethodExpectations<global::MockRock.IMyClock> @self) =>
			new global::Rocks.MethodAdornments<global::MockRock.IMyClock, global::System.Func<global::System.DateTime>, global::System.DateTime>(@self.Add<global::System.DateTime>(0, new global::System.Collections.Generic.List<global::Rocks.Argument>()));
		internal static global::Rocks.MethodAdornments<global::MockRock.IMyClock, global::System.Func<global::System.DateTime>, global::System.DateTime> GetUtcNow(this global::Rocks.Expectations.MethodExpectations<global::MockRock.IMyClock> @self) =>
			new global::Rocks.MethodAdornments<global::MockRock.IMyClock, global::System.Func<global::System.DateTime>, global::System.DateTime>(@self.Add<global::System.DateTime>(1, new global::System.Collections.Generic.List<global::Rocks.Argument>()));
	}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Rocks ](/sources/Rocks.zip)

:::


### Share Rocks 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks&quote=Rocks" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks&text=Rocks:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks&title=Rocks" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks&title=Rocks&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRocks" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Rocks

### In the same category (Tests) - 4 other generators


#### [mocklis](/docs/mocklis)


#### [MockMe](/docs/MockMe)


#### [MSTest](/docs/MSTest)


#### [Ridge](/docs/Ridge)

