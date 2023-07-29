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

<!---
<TOCInline toc={toc} />
-->
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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\Program.cs" label="Program.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDI1.cs" label="TestDI1.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *TestDI1.cs*

```csharp showLineNumbers 
namespace RSCG_FunctionsWithDIDemo;

public class TestDI1
{
    public int x;
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDI2.cs" label="TestDI2.cs" >

  This is the use of **RSCG_FunctionsWithDI** in *TestDI2.cs*

```csharp showLineNumbers 
namespace RSCG_FunctionsWithDIDemo;

public class TestDI2
{
    public int x;
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\TestDIMyClass.cs" label="TestDIMyClass.cs" >

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_FunctionsWithDI\src\RSCG_FunctionsWithDIDemo\obj\GX\RSCG_FunctionsWithDI\RSCG_FunctionsWithDI.DIGenerator\TestDIMyClass_gen_methods.cs" label="TestDIMyClass_gen_methods.cs" >


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

### Download PDF

[Download PDF RSCG_FunctionsWithDI ](/pdfs/RSCG_FunctionsWithDI.pdf)

### Share RSCG_FunctionsWithDI 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&quote=RSCG_FunctionsWithDI" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&text=RSCG_FunctionsWithDI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_FunctionsWithDI
