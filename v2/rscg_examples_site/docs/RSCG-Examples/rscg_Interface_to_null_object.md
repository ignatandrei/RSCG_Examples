---
sidebar_position: 1820
title: 182 - rscg_Interface_to_null_object
description: Generate null objects for interfaces
slug: /rscg_Interface_to_null_object
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# rscg_Interface_to_null_object  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/rscg_Interface_to_null_object?label=rscg_Interface_to_null_object)](https://www.nuget.org/packages/rscg_Interface_to_null_object/)[![Nuget](https://img.shields.io/nuget/dt/rscg_Interface_to_null_object_common?label=rscg_Interface_to_null_object_common)](https://www.nuget.org/packages/rscg_Interface_to_null_object_common)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/rscg_Interface_to_null_object?label=updated)](https://github.com/ignatandrei/rscg_Interface_to_null_object/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/rscg_Interface_to_null_object?style=social)

## Details

### Info
:::info

Name: **rscg_Interface_to_null_object**

Interface to null object - common

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/rscg_Interface_to_null_object/*   

*https://www.nuget.org/packages/rscg_Interface_to_null_object_common*   


You can find more details at https://github.com/ignatandrei/rscg_Interface_to_null_object/

Source : https://github.com/ignatandrei/rscg_Interface_to_null_object/

:::

### Original Readme
:::note

[![NuGet version](https://img.shields.io/nuget/v/rscg_Interface_to_null_object.svg?style=flat-square)](https://www.nuget.org/packages/rscg_Interface_to_null_object)

[![NuGet version](https://img.shields.io/nuget/v/rscg_Interface_to_null_object_common.svg?style=flat-square)](https://www.nuget.org/packages/rscg_Interface_to_null_object_common)


# Interface to Null Object Pattern
Implementation of https://en.wikipedia.org/wiki/Null_object_pattern  from interface

# Installation

Add to your csproj file:

```xml
  <ItemGroup>
    <PackageReference Include="rscg_Interface_to_null_object" Version="2025.120.1832"  OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
    <PackageReference Include="rscg_Interface_to_null_object_common" Version="2025.120.1832" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
```

Or add the nuget packages rscg_Interface_to_null_object  and rscg_Interface_to_null_object_common

# Usage

```csharp
[InterfaceToNullObject.ToNullObject]
public interface IEmployee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();
  
}
```

And then a C# class that implements the interface will be generated

```csharp
public partial class Employee_null : global::IntegrationConsole.IEmployee
{

        public virtual string FirstName { get; set; } = default(string);
    
        public virtual string LastName { get; set; } = default(string);
    
        public virtual IntegrationConsole.IDepartment Department { get; set; } = default(IntegrationConsole.IDepartment);
    
        public virtual string GetFullName() { return default(string); }
    
}
```





:::

### About
:::note

Generate null objects for interfaces


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **rscg_Interface_to_null_object**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="rscg_Interface_to_null_object" Version="2025.120.1832" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
    <PackageReference Include="rscg_Interface_to_null_object_common" Version="2025.120.1832" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\Program.cs" label="Program.cs" >

  This is the use of **rscg_Interface_to_null_object** in *Program.cs*

```csharp showLineNumbers 
using NullInterface;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
IDepartment department = new Department_null();
department.Name = "IT";
IEmployee employee = new Employee_null();
employee.FirstName = "Andrei";
employee.Department = department;
Console.WriteLine(employee.FirstName);
Console.WriteLine(employee.Department.Name);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\IEmployee.cs" label="IEmployee.cs" >

  This is the use of **rscg_Interface_to_null_object** in *IEmployee.cs*

```csharp showLineNumbers 

using InterfaceToNullObject;

namespace NullInterface;
[ToNullObject]
public interface IEmployee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();

    public string GetFullNameAndDepartment(string separator);
    public bool MoveEmployeeToDepartment(IDepartment department);

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\IDepartment.cs" label="IDepartment.cs" >

  This is the use of **rscg_Interface_to_null_object** in *IDepartment.cs*

```csharp showLineNumbers 
namespace NullInterface;

using InterfaceToNullObject;

[ToNullObject]
public interface IDepartment
{
    public string Name { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\NameGenerator\NameGenerator.NameGen\TheAssemblyInfo.g.cs" label="TheAssemblyInfo.g.cs" >


```csharp showLineNumbers 

                // <auto-generated/>
                namespace Generated.NullInterface
                {
                    public static class TheAssemblyInfo
                    {
                        
                        public static readonly System.DateTime DateGeneratedUTC ;
                        public const string AssemblyName = "NullInterface";
                        public const string GeneratedNameNice = "Olga Tokarczuk is feeling quick-witted in Quito";
                        public const string GeneratedNameSmall = "quick-witted-Olga Tokarczuk";
                        public const string GeneratedName = "quick-witted-Olga Tokarczuk-Quito";
                        static TheAssemblyInfo(){
                            DateGeneratedUTC = System.DateTime.ParseExact("2025-02-15 15:42:10", "yyyy-MM-dd HH:mm:ss", null);
                        }
                    }
                }
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\rscg_Interface_to_null_object\rscg_Interface_to_null_object.GenerateNullObjectFromInterface\IDepartment_null.cs" label="IDepartment_null.cs" >


```csharp showLineNumbers 
// <auto-generated>
    //     This code was generated by a tool :rscg_Interface_to_null_object
    //     Runtime Version: Jaroslav Seifert is feeling cheap in Belmopan
    //     DateOfTool : 2025-01-20 16:33:43
    //     Changes to this file may cause incorrect behavior and will be lost if
    //     the code is regenerated.
    // </auto-generated>
//------------------------------------------------------------------------------
/// <summary>
    /// This static partial class contains extension methods for sorting collections of IDepartment objects.
    /// </summary>

 #nullable enable
 #pragma warning disable CS8603
 #pragma warning disable CS8625
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName","2025.10120.11633.143")]
public partial class Department_null : global::NullInterface.IDepartment
{

        public virtual string Name { get; set; } = default(string);
    
}

#nullable restore
#pragma warning restore CS8603
#pragma warning restore CS8625
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\rscg_Interface_to_null_object\rscg_Interface_to_null_object.GenerateNullObjectFromInterface\IEmployee_null.cs" label="IEmployee_null.cs" >


```csharp showLineNumbers 
// <auto-generated>
    //     This code was generated by a tool :rscg_Interface_to_null_object
    //     Runtime Version: Jaroslav Seifert is feeling cheap in Belmopan
    //     DateOfTool : 2025-01-20 16:33:43
    //     Changes to this file may cause incorrect behavior and will be lost if
    //     the code is regenerated.
    // </auto-generated>
//------------------------------------------------------------------------------
/// <summary>
    /// This static partial class contains extension methods for sorting collections of IEmployee objects.
    /// </summary>

 #nullable enable
 #pragma warning disable CS8603
 #pragma warning disable CS8625
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName","2025.10120.11633.143")]
public partial class Employee_null : global::NullInterface.IEmployee
{

        public virtual string FirstName { get; set; } = default(string);
    
        public virtual string LastName { get; set; } = default(string);
    
        public virtual NullInterface.IDepartment Department { get; set; } = default(NullInterface.IDepartment);
    
        public virtual string GetFullName() { return default(string); }
    
        public virtual string GetFullNameAndDepartment(string separator) { return default(string); }
    
        public virtual bool MoveEmployeeToDepartment(global::NullInterface.IDepartment department) { return default(bool); }
    
}

#nullable restore
#pragma warning restore CS8603
#pragma warning restore CS8625
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project rscg_Interface_to_null_object ](/sources/rscg_Interface_to_null_object.zip)

:::


### Share rscg_Interface_to_null_object 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object&quote=rscg_Interface_to_null_object" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object&text=rscg_Interface_to_null_object:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object&title=rscg_Interface_to_null_object" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object&title=rscg_Interface_to_null_object&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_Interface_to_null_object" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg_Interface_to_null_object

### In the same category (Interface) - 10 other generators


#### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


#### [CopyCat](/docs/CopyCat)


#### [Farskeptic.AutoCompose](/docs/Farskeptic.AutoCompose)


#### [MakeInterface.Generator](/docs/MakeInterface.Generator)


#### [Matryoshki](/docs/Matryoshki)


#### [Minerals.AutoInterfaces](/docs/Minerals.AutoInterfaces)


#### [NetAutomaticInterface](/docs/NetAutomaticInterface)


#### [ProxyGen](/docs/ProxyGen)


#### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


#### [RSCG_Static](/docs/RSCG_Static)

