---
sidebar_position: 220
title: 22 - RSCG_FunctionsWithDI
description: Generating functions that have parameters from services
slug: /RSCG_FunctionsWithDI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_FunctionsWithDI  by Andrei Ignat


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/RSCG_FunctionsWithDI?label=RSCG_FunctionsWithDI)](https://www.nuget.org/packages/RSCG_FunctionsWithDI/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/functionsdi?label=updated)](https://github.com/ignatandrei/functionsdi)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/functionsdi?style=social)

## Details

### Info
:::info

Name: **RSCG_FunctionsWithDI**

Generate correct functions from  [FromServices]

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_FunctionsWithDI/*   


You can find more details at https://github.com/ignatandrei/functionsdi

Source : https://github.com/ignatandrei/functionsdi

:::

### Original Readme
:::note

# FunctionsDI

[![Nuget](https://img.shields.io/nuget/v/RSCG_FunctionsWithDI)](https://www.nuget.org/packages/RSCG_FunctionsWithDI)

Generate (constructor) and functions calls similar with ASP.NET Core WebAPI ( [FromServices] will be provided by DI )
Also, verifies for null  .

# Usage 1 - generate constructors from methods

Reference into the csproj

```xml
<ItemGroup>
    <PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
    <PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />
</ItemGroup> 	
<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

```

Then for every class you can write [FromServices]

```csharp
using RSCG_FunctionsWithDI_Base;
//namespace if necessary
public partial class TestDIFunction
{
    public bool TestMyFunc1([FromServices] TestDI1 t1, [FromServices] TestDI2 t2, int x, int y)
    {
        return true;
    }
    //more functions
}
```

generates the constructor with needed details 

```csharp

public partial class TestDIFunction
{ 
private TestDI1 _TestDI1;
private TestDI2 _TestDI2;
public TestDIFunction  (TestDI1 _TestDI1,TestDI2 _TestDI2) //constructor generated with needed DI
 { 
this._TestDI1=_TestDI1;
this._TestDI2=_TestDI2;

 } //end constructor 

//making call to TestMyFunc1
public bool TestMyFunc1(int  x,int  y){ 
var t1 = this._TestDI1  ;
if(t1 == null) throw new ArgumentException(" service TestDI1  is null in TestDIFunction ");
var t2 = this._TestDI2  ;
if(t2 == null) throw new ArgumentException(" service TestDI2  is null in TestDIFunction ");
return  TestMyFunc1(t1,t2,x,y);
}

```

so you can call 
```csharp

var test=serviceProvider.GetService<TestDIFunction>();
Console.WriteLine(test.TestMyFunc1(10,3)); // calling without the [FromServices] arguments

```

# Usage 2 - generate constructors from fields / constructors
```xml
<ItemGroup>
    <PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
    <PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />
</ItemGroup>	
<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

```
Assuming this classes, that you want to keep a minimum of parameters constructors 
```csharp
public partial class TestDIFunctionAdvWithConstructor
    {
        [RSCG_FunctionsWithDI_Base.FromServices]
        private TestDI1 NewTestDI1;

        [RSCG_FunctionsWithDI_Base.FromServices]
        public TestDI2 NewTestDI2 { get; set; }

        public readonly TestDI3 myTestDI3;

        private TestDIFunctionAdvWithConstructor(TestDI3 test)
        {
            myTestDI3= test;
        }
        
    }
    public partial class TestDIFunctionAdvNoConstructor
    {
        [RSCG_FunctionsWithDI_Base.FromServices]
        public TestDI1 NewTestDI1;

        [RSCG_FunctionsWithDI_Base.FromServices]
        private TestDI2 NewTestDI2 { get; set; }




    }
```
the generator will generate 

```csharp
namespace TestFunctionsWithDI

{ 
public partial class TestDIFunctionAdvNoConstructor
{ 
public TestDIFunctionAdvNoConstructor( TestDI1 _NewTestDI1,TestDI2 _NewTestDI2 ) 
{ 
this.NewTestDI1 = _NewTestDI1; 
this.NewTestDI2 = _NewTestDI2; 
}//end constructor 

 }//class
 }//namespace


namespace TestFunctionsWithDI

{ 
public partial class TestDIFunctionAdvWithConstructor
{ 
public TestDIFunctionAdvWithConstructor(TestDI3 test, TestDI1 _NewTestDI1, TestDI2 _NewTestDI2) : this (test) 
{ 
this.NewTestDI1 = _NewTestDI1; 
this.NewTestDI2 = _NewTestDI2; 
}//end constructor 

 }//class
 }//namespace
```

Enjoy!


:::

### About
:::note

Generating functions that have parameters from services


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_FunctionsWithDI**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

<ItemGroup>
		<PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
		<PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />
	<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />



</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.DependencyInjection;
using RSCG_FunctionsWithDIDemo;
var services = new ServiceCollection();
services.AddSingleton<TestDIMyClass>();
services.AddSingleton<TestDI1>();
services.AddSingleton<TestDI2>();
var serviceProvider = services.BuildServiceProvider();
var test = serviceProvider.GetRequiredService<TestDIMyClass>();
Console.WriteLine("the TestMyFunc1 is not called with [FromServices] parameters " +test.TestMyFunc1(10, 3));

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDI1.cs" label="TestDI1.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *TestDI1.cs*

```csharp showLineNumbers 
namespace RSCG_FunctionsWithDIDemo;

public class TestDI1
{
    public int x;
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDI2.cs" label="TestDI2.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *TestDI2.cs*

```csharp showLineNumbers 
namespace RSCG_FunctionsWithDIDemo;

public class TestDI2
{
    public int x;
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDIMyClass.cs" label="TestDIMyClass.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *TestDIMyClass.cs*

```csharp showLineNumbers 
using RSCG_FunctionsWithDI_Base;

namespace RSCG_FunctionsWithDIDemo;
public partial class TestDIMyClass
{

    public bool TestMyFunc1([FromServices] TestDI1 t1, [FromServices] TestDI2 t2, int x, int y)
    {
        return true;
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\obj\GX\RSCG_FunctionsWithDI\RSCG_FunctionsWithDI.DIGenerator\TestDIMyClass_gen_methods.cs" label="TestDIMyClass_gen_methods.cs" >


```csharp showLineNumbers 
namespace RSCG_FunctionsWithDIDemo
{ 
public partial class TestDIMyClass
{ 
private TestDI1 _TestDI1;
private TestDI2 _TestDI2;
public TestDIMyClass  

(TestDI1 _TestDI1,TestDI2 _TestDI2)
 { 
this._TestDI1=_TestDI1;
this._TestDI2=_TestDI2;

 } //end constructor 

//making call to TestMyFunc1
public bool TestMyFunc1(int  x,int  y){ 
var t1 = this._TestDI1  ;
if(t1 == null) throw new ArgumentException(" service TestDI1  is null in TestDIMyClass ");
var t2 = this._TestDI2  ;
if(t2 == null) throw new ArgumentException(" service TestDI2  is null in TestDIMyClass ");
return  TestMyFunc1(t1,t2,x,y);
}

 }//class
 }//namespace
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_FunctionsWithDI ](/sources/RSCG_FunctionsWithDI.zip)

:::


### Share RSCG_FunctionsWithDI 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&quote=RSCG_FunctionsWithDI" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&text=RSCG_FunctionsWithDI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_FunctionsWithDI

## In the same category (EnhancementProject)


### [BuildInfo](/docs/BuildInfo)


### [Com](/docs/Com)


### [DeeDee](/docs/DeeDee)


### [Matryoshki](/docs/Matryoshki)


### [Mediator](/docs/Mediator)


### [ProxyGen](/docs/ProxyGen)


### [RSCG_AMS](/docs/RSCG_AMS)


### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)


### [ThisAssembly](/docs/ThisAssembly)

