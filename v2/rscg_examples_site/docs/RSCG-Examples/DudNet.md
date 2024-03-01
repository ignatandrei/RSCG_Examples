---
sidebar_position: 790
title: 79 - DudNet
description: Generate proxy classes for the principal classes
slug: /DudNet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DudNet  by jwshyns


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Jwshyns.DudNet?label=Jwshyns.DudNet)](https://www.nuget.org/packages/Jwshyns.DudNet/)
[![GitHub last commit](https://img.shields.io/github/last-commit/jwshyns/DudNet?label=updated)](https://github.com/jwshyns/DudNet)
![GitHub Repo stars](https://img.shields.io/github/stars/jwshyns/DudNet?style=social)

## Details

### Info
:::info

Name: **DudNet**

Proxy-pattern source generator

Author: jwshyns

NuGet: 
*https://www.nuget.org/packages/Jwshyns.DudNet/*   


You can find more details at https://github.com/jwshyns/DudNet

Source : https://github.com/jwshyns/DudNet

:::

### Original Readme
:::note

# DudNet [![NuGet Badge](https://buildstats.info/nuget/Jwshyns.DudNet)](https://www.nuget.org/packages/Jwshyns.DudNet)
 
DudNet is a C# source generator for implementing a proxy pattern. 

## Example

Generating a proxy for a class is as simple as marking it with the `ProxyServiceAttribute` as follows:
```csharp
using DudNet.Attributes;

public interface IExampleService {
    
       public void ExampleFunction();
    
       public int ExampleFunctionWithArgumentAndReturn(int number);
    
}

[ProxyService]
public class ExampleService : IExampleService {
    
       public void ExampleFunction(){
           // omitted for brevity
       }
        
       public int ExampleFunctionWithArgumentAndReturn(int number){
           // omitted for brevity
       }
    
       public void FunctionNotOnInterface(){
           // ommitted for brevity
       }
    
}
```

Which would generate the following two classes:
```csharp
using System.Runtime.CompilerServices;
using DudNet.Attributes;

public partial class ExampleServiceProxy : IExampleService {

	private readonly IExampleService _service;

	public void ExampleFunction() {
		Interceptor();
		ExampleFunctionInterceptor();
		_service.ExampleFunction();
	}
    
	public int ExampleFunctionWithArgumentAndReturn(int number) {
		Interceptor();
		ExampleFunctionWithArgumentAndReturnInterceptor(number);
		_service.ExampleFunctionWithArgumentAndReturn(number);
	}
    
	partial void Interceptor([CallerMemberName]string callerName = null);

	partial void ExampleFunctionInterceptor();

	partial void ExampleFunctionWithArgumentAndReturnInterceptor(int number);
}
```
and 
```csharp
using DudNet.Attributes;

public class ExampleServiceDud : IExampleService {

    public void ExampleFunction() {
    }
    
    public int ExampleFunctionWithArgumentAndReturn(int number) {
    }

}
```

These generated classes can be used by further implementing the `partial` proxy class as follows:
```csharp
public partial class ExampleServiceProxy : IExampleService {
    
    public ExampleServiceProxy(ExampleProxyService service) {
        // Some logic to determine whether you want to effectively "disable" the service
        if (Random.Shared.NextDouble() > 0.5)
        { 
            _service = service;
            return;
        }
        
        _service = new ExampleServiceDud();
    }
    
    partial void Interceptor([CallerMemberName]string callerName = null) {
        Console.Writeline("'{caller}' was called", callerName);
    }   
    
    partial void ExampleFunctionWithArgumentAndReturnInterceptor(int number) {
        if(number > 5) 
        {
            throw new Exception("Received number value '{number}' - too high!", number);
        }
    }

}

```


:::

### About
:::note

Generate proxy classes for the principal classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DudNet**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Jwshyns.DudNet" Version="1.2.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DudNet\src\DudNetDemo\Program.cs" label="Program.cs" >

  This is the use of **DudNet** in *Program.cs*

```csharp showLineNumbers 
using DudNetDemo;

var p = new Person();
var p1= new PersonProxy(p);
p1.FirstName = "John";
p1.LastName = "Doe";
Console.WriteLine(p.FullName());
Console.WriteLine(p1.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DudNet\src\DudNetDemo\Person.cs" label="Person.cs" >

  This is the use of **DudNet** in *Person.cs*

```csharp showLineNumbers 
using DudNet.Attributes;
using System.Runtime.CompilerServices;

namespace DudNetDemo;
[ProxyService]
public partial class Person : IPerson
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return FirstName + " " + LastName;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DudNet\src\DudNetDemo\obj\GX\DudNet\DudNet.Generation.ProxyServiceGenerator\PersonDud.g.cs" label="PersonDud.g.cs" >


```csharp showLineNumbers 
using System.Runtime.CompilerServices;
using DudNet.Attributes;
using System.Runtime.CompilerServices;

namespace DudNetDemo;

/// <inheritdoc cref="IPerson"/>
public partial class PersonDud : IPerson {

	public string? FirstName {
		get {
			return (string?) default;
		}
		set {
		}
	}
	public string? LastName {
		get {
			return (string?) default;
		}
		set {
		}
	}
	public string FullName() {
		return (string) default;
	}

}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DudNet\src\DudNetDemo\obj\GX\DudNet\DudNet.Generation.ProxyServiceGenerator\PersonProxy.g.cs" label="PersonProxy.g.cs" >


```csharp showLineNumbers 
using System.Runtime.CompilerServices;
using DudNet.Attributes;
using System.Runtime.CompilerServices;

namespace DudNetDemo;

/// <inheritdoc cref="IPerson"/>
public partial class PersonProxy : IPerson {

	private readonly IPerson _service;

	public string? FirstName {
		get {
			Interceptor();
			get_FirstNameInterceptor();
			return _service.FirstName;
		}
		set {
			Interceptor();
			set_FirstNameInterceptor(value);
			_service.FirstName = value;
		}
	}
	public string? LastName {
		get {
			Interceptor();
			get_LastNameInterceptor();
			return _service.LastName;
		}
		set {
			Interceptor();
			set_LastNameInterceptor(value);
			_service.LastName = value;
		}
	}
	public string FullName() {
		Interceptor();
		FullNameInterceptor();
		return _service.FullName();
	}
	partial void Interceptor([CallerMemberName]string callerName = null);
	partial void get_FirstNameInterceptor();
	partial void set_FirstNameInterceptor(string? value);
	partial void get_LastNameInterceptor();
	partial void set_LastNameInterceptor(string? value);
	partial void FullNameInterceptor();

}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project DudNet ](/sources/DudNet.zip)

:::


### Share DudNet 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet&quote=DudNet" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet&text=DudNet:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet&title=DudNet" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet&title=DudNet&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDudNet" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DudNet

### In the same category (EnhancementClass) - 23 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CopyTo](/docs/CopyTo)


#### [FastGenericNew](/docs/FastGenericNew)


#### [GeneratorEquals](/docs/GeneratorEquals)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)

