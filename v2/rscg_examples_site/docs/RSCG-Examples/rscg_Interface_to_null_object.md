---
sidebar_position: 1820
title: 182 - rscg_Interface_to_null_object
description: Generate null objects for interfaces
slug: /rscg_Interface_to_null_object
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveInterface.mdx';

# rscg_Interface_to_null_object  by Andrei Ignat


<TOCInline toc={toc}  />

## NuGet / site data
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

Source: https://github.com/ignatandrei/rscg_Interface_to_null_object/

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

### Example (source csproj, source files)

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceAttribute.g.cs" label="AutoInterfaceAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Generates an interface for the decorated class/struct.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = true)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceAttribute : Attribute {
    /// <summary>
    /// <para>The name of the generated interface.</para>
    /// <para>Default is "I{ClassName}"</para>
    /// </summary>
    public string Name { get; init; }

    /// <summary>
    /// <para>The modifier(s) for the interface.</para>
    /// <para>Deault is "public partial"</para>
    /// </summary>
    public string Modifier { get; init; }

    /// <summary>
    /// <para>The namespace declaration for the interface.</para>
    /// <para>If empty string, no namespace directive will be used (global namespace).<br />
    /// Default (if not present) it will be mapped to the same namespace as the namespace of the class/struct.</para>
    /// </summary>
    public string Namespace { get; init; }

    /// <summary>
    /// <para>interface inheritance: Name(s) of interfaces this interface will inherit.</para>
    /// <para>Default is Array.Empty</para>
    /// </summary>
    public Type[] Inheritance { get; init; }

    /// <summary>
    /// <para>
    /// The Classes, structs or interfaces containing the generated interface.<br />
    /// e.g. ["public sealed partial class Example"] will wrap the interface with that expression.
    /// </para>
    /// <para>Default is Array.Empty</para>
    /// </summary>
    public string[] Nested { get; init; }

    /// <summary>
    /// <para>If enabled, static members get accepted and are generating "static abstract" members.</para>
    /// <para>Default is false</para>
    /// </summary>
    public bool StaticMembers { get; init; }
}

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceVisibilityInternalAttribute.g.cs" label="AutoInterfaceVisibilityInternalAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Adds a "internal" access modifier to the interface member.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceVisibilityInternal : Attribute { }

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceVisibilityPrivateProtectedAttribute.g.cs" label="AutoInterfaceVisibilityPrivateProtectedAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Adds a "private protected" access modifier to the interface member.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceVisibilityPrivateProtected : Attribute { }

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceVisibilityProtectedAttribute.g.cs" label="AutoInterfaceVisibilityProtectedAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Adds a "protected" access modifier to the interface member.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceVisibilityProtected : Attribute { }

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceVisibilityProtectedInternalAttribute.g.cs" label="AutoInterfaceVisibilityProtectedInternalAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Adds a "protected internal" access modifier to the interface member.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceVisibilityProtectedInternal : Attribute { }

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\AutoInterfaceVisibilityPublicAttribute.g.cs" label="AutoInterfaceVisibilityPublicAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// Adds a "public" access modifier to the interface member.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class AutoInterfaceVisibilityPublic : Attribute { }

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\IDepartment_NullInterface.Department_IDepartment.cs.g.cs" label="IDepartment_NullInterface.Department_IDepartment.cs.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations




namespace NullInterface;

public partial interface IDepartment {
    string Name { get; set; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\IEmployee_NullInterface.Employee_Employee.cs.g.cs" label="IEmployee_NullInterface.Employee_Employee.cs.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using AutoInterfaceAttributes;

namespace NullInterface;

public partial interface IEmployee {
    string FirstName { get; set; }

    string LastName { get; set; }

    IDepartment Department { get; set; }

    string GetFullName();

    string GetFullNameAndDepartment(string separator);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_Interface_to_null_object\src\NullInterface\obj\GX\AutoInterface\AutoInterface.AutoInterfaceGenerator\IgnoreAutoInterfaceAttribute.g.cs" label="IgnoreAutoInterfaceAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


#if !AUTOINTERFACE_EXCLUDE_ATTRIBUTES

using System;

namespace AutoInterfaceAttributes;

/// <summary>
/// The decorated member will be Ignored by the generator.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Event)]
[System.CodeDom.Compiler.GeneratedCodeAttribute("AutoInterface", "2.4.0")]
internal sealed class IgnoreAutoInterfaceAttribute : Attribute { }

#endif

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

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

aaa
<SameCategory />

