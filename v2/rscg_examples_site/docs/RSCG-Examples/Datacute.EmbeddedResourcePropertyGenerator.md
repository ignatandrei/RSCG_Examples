---
sidebar_position: 1660
title: 166 - Datacute.EmbeddedResourcePropertyGenerator
description: Generating class to access easy the embedded resource
slug: /Datacute.EmbeddedResourcePropertyGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Datacute.EmbeddedResourcePropertyGenerator  by Stephen Denne


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Datacute.EmbeddedResourcePropertyGenerator?label=Datacute.EmbeddedResourcePropertyGenerator)](https://www.nuget.org/packages/Datacute.EmbeddedResourcePropertyGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/datacute/EmbeddedResourcePropertyGenerator?label=updated)](https://github.com/datacute/EmbeddedResourcePropertyGenerator/)
![GitHub Repo stars](https://img.shields.io/github/stars/datacute/EmbeddedResourcePropertyGenerator?style=social)

## Details

### Info
:::info

Name: **Datacute.EmbeddedResourcePropertyGenerator**

This project generates properties for embedded resources in a project.

Author: Stephen Denne

NuGet: 
*https://www.nuget.org/packages/Datacute.EmbeddedResourcePropertyGenerator/*   


You can find more details at https://github.com/datacute/EmbeddedResourcePropertyGenerator/

Source: https://github.com/datacute/EmbeddedResourcePropertyGenerator/

:::

### Original Readme
:::note

# Embedded Resource Property Generator
The Embedded Resource Property Generator is a Source Generator
which generates properties for text file embedded resources in a
project, in a similar way to how properties are generated from the string
resources in .resx files.

By adding the `[EmbeddedResourceProperties]` attribute to a partial class,
and specifying the filename extension and folder path to search, the
source generator will add a property to the class for each matching
embedded resource file. Accessing the property will return the text
content of the embedded resource file.

## Why not just use a resx file?
The use case for this project is when you have a large number of text
files that you want to embed in your project, such as SQL queries, and you
wish to  develop these files with an external editor that supports syntax
highlighting, execution, debugging, and other features.

While resx files do support including files, doing so requires either
the use of another custom editor, or manipulating the xml of the resx
file directly.

## What's wrong with just using Assembly.GetManifestResourceStream?
The purpose of providing properties to access the text, is to aid the
developer by generating doc-comments for the properties, showing the first
few lines of the file.

```csharp
/// <summary>Text value of the Embedded Resource: GoodIndenting.cypher</summary>
/// <value>
/// <code>
/// MERGE (n)
///   ON CREATE SET n.prop = 0
/// MERGE (a:A)-[:T]-(b:B)
///   ON CREATE SET a.name = 'me'
///   ON MATCH SET b.name = 'you'
/// RETURN a.prop
/// </code>
/// </value>
/// <remarks>
/// The value is read from the embedded resource on first access.
/// </remarks>
public static string GoodIndenting => 
  // Generated code to read the resource "Namespace.ClassName.GoodIndenting.cypher";
```

The full names of the embedded resources are also generated, and no longer
need to be supplied by the developer, making it easy to move the location
of the resource files to another directory, without needing to find and
fix all the references to the resource names.

## Usage
1. Add a reference to the `EmbeddedResourcePropertyGenerator` project.
2. Add the following section to your .csproj file, to include all 
   EmbeddedResource files as Additional Files for the source generators:
   ```xml
     <PropertyGroup>
       <AdditionalFileItemNames>$(AdditionalFileItemNames);EmbeddedResource</AdditionalFileItemNames>
     </PropertyGroup>
   ```
3. Add a directory to your project to group the files you want to embed.
4. Add text files to your project, in that directory, and set their Build
   Action to `EmbeddedResource`.
    ```text
    > SqlQueries
        SelectAll.sql
        SelectById.sql
    Program.cs
    ```
    ```xml
      <ItemGroup>
        <EmbeddedResource Include="SqlQueries\SelectAll.sql" />
        <EmbeddedResource Include="SqlQueries\SelectById.sql"/>
      </ItemGroup>
    ```
5. Add a partial class to your code.
6. Include a using statement to the namespace of the code generator.
7. Put the attribute `[EmbeddedResourcePropertyGenerator]` on the class.
8. Specify the extension and folder path to search for embedded resources.
9. Use the properties generated on the partial class.
    ```csharp
    using Datacute.EmbeddedResourcePropertyGenerator;
    
    [EmbeddedResourceProperties(".sql", "SqlQueries")]
    public static partial class SqlQuery;
    
    class Program
    {
        static void Main()
        {
            Console.WriteLine(SqlQuery.SelectAll);
        }
    }
    ``` 

## Localisation and External Overrides
Localisation and External Overrides are not supported. If you need these
features, consider using a resx file instead.

## Non-text File Types
This project expects text files so that it can generate properties that
are strings. It currently expects UTF-8 encoded files.

If you need to embed other types of files, use the 
`Assembly.GetManifestResourceStream` method directly.

## Extending the Behaviour

The generated code includes a private nested class `EmbeddedResource` containing:

| Method or Class | Purpose |
|-----------------|---------|
| `Read(string resourceName)` | Method for reading embedded resources |
| `BackingField` | Nested class caching the property values |
| `ResourceName` | Nested class holding the resource names |

The implementation supports including two ***partial methods*** that can
be implemented in the same partial class as the generated properties.

If the partial methods are not implemented, the calls to them are removed, 
and the code effectively reduces to:

```csharp
public static string Example =>
        EmbeddedResource.BackingField.Example ??= EmbeddedResource.Read(EmbeddedResource.ResourceName.Example);
```

### Partial methods:
- `ReadEmbeddedResourceValue` - This method is called to allow the class
  to override how the value representing the content of the embedded
  resource is obtained. If the `backingField` parameter is null when this
  method ends, the default implementation will be used.
- `AlterEmbeddedResourceReturnValue` - This method is called after the
  text content has been read, and can be used to modify the text content
  before it is returned. Altering the returned value does not affect the
  value stored in the backing field.

```csharp
    [EmbeddedResourceProperties(".sql", "SqlQueries")]
    public static partial class SqlQuery
    {
        static partial void ReadEmbeddedResourceValue(
            ref string? backingField, 
            string resourceName, 
            string propertyName)
        {
            // This method is called before the default implementation.

            // The default implementation only reads the resource
            // if the backingField is null, so by setting it in this method,
            // the default implementation can be bypassed.

            // The backingField is a reference to a static field
            // for the property, and will be null for the first call,
            // but will retain the value for subsequent calls
            // for the same property.

            // Use custom logic to read the text content given the names
            // of the resource, and of the property.
            backingField ??= CustomReader(resourceName, propertyName);
        }

        static partial void AlterEmbeddedResourceReturnValue(
            ref string value,
            string resourceName,
            string propertyName);
        {
            // The value parameter is a reference to a variable that 
            // will be returned as the value of the property.
            
            // Implement custom logic to alter the value.
            value = CustomValueAlteringMethod(value, resourceName, propertyName);
        }
    }
```

This is an example of the code generated for a property, showing how the partial methods are called:

```csharp
/// <summary>Text value of the Embedded Resource: Example.txt</summary>
/// <value>
/// <code>
/// This is the content of the Example.txt file.
/// Only the first few lines are shown here.
/// </code>
/// </value>
/// <remarks>
/// The value is read from the embedded resource on first access.
/// </remarks>
public static string Example
{
    get
    {
        ReadEmbeddedResourceValue(ref EmbeddedResource.BackingField.Example, EmbeddedResource.ResourceName.Example, "Example");
        var value = EmbeddedResource.BackingField.Example ??= EmbeddedResource.Read(EmbeddedResource.ResourceName.Example);
        AlterEmbeddedResourceReturnValue(ref value, EmbeddedResource.ResourceName.Example, "Example");
        return value;
    }
}
```

## Thanks

Thanks to Andrew Lock for his Series: [Creating a source generator](https://andrewlock.net/series/creating-a-source-generator/).

## Future Enhancements
- [ ] Add an option to leave out the Read method.
  - It is now included in the generated code for each class,
    but an implementation of the `ReadEmbeddedResourceValue` partial
    method might make it unnecessary.
- [ ] Support for alternative text encodings.
  - Overriding `ReadEmbeddedResourceValue` is a technique that can be
    used to read the text content of the embedded resource with a
    different encoding, but the doc-comment will still be generated
    expecting UTF-8.
- [ ] Support for specifying the number of lines to include in the
  doc-comment (including zero to exclude the code section).
  - This is currently set to 10 lines.
- [ ] Support generating text formatting methods.
  - Call `CompositeFormat.Parse` on the loaded text, and additionally count
    the number of format items, and generate a method that takes the
    same number of arguments.
  - Using a resx file is probably a better fit that adding this feature.
- [ ] Support generating `ReadOnlySpan<byte>` properties instead of `string`
  - The decoding from utf-8 may not be needed.

:::

### About
:::note

Generating class to access easy the embedded resource


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Datacute.EmbeddedResourcePropertyGenerator**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  
  <ItemGroup>
    <EmbeddedResource Include="TestData\Countries.txt" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Datacute.EmbeddedResourcePropertyGenerator" Version="1.0.0" >
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<AdditionalFileItemNames>$(AdditionalFileItemNames);EmbeddedResource</AdditionalFileItemNames>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Datacute.EmbeddedResourcePropertyGenerator\src\EmbedDemo\Program.cs" label="Program.cs" >

  This is the use of **Datacute.EmbeddedResourcePropertyGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EmbedDemo;

Console.WriteLine("Hello, World!");

var data= TestData.Countries;

Console.WriteLine(data);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Datacute.EmbeddedResourcePropertyGenerator\src\EmbedDemo\TestData.cs" label="TestData.cs" >

  This is the use of **Datacute.EmbeddedResourcePropertyGenerator** in *TestData.cs*

```csharp showLineNumbers 
using Datacute.EmbeddedResourcePropertyGenerator;
namespace EmbedDemo;
[EmbeddedResourceProperties(".txt", "TestData")]
public static partial class TestData;

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Datacute.EmbeddedResourcePropertyGenerator\src\EmbedDemo\TestData\Countries.txt" label="Countries.txt" >

  This is the use of **Datacute.EmbeddedResourcePropertyGenerator** in *Countries.txt*

```csharp showLineNumbers 
USA
Germany
France
Romania
Italy

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Datacute.EmbeddedResourcePropertyGenerator\src\EmbedDemo\obj\GX\Datacute.EmbeddedResourcePropertyGenerator\Datacute.EmbeddedResourcePropertyGenerator.Generator\EmbedDemo.TestData.g.cs" label="EmbedDemo.TestData.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Datacute.EmbeddedResourcePropertyGenerator.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

namespace EmbedDemo;
/// <summary>
/// This class's properties are generated from project files meeting the criteria:
/// <list type="bullet">
/// <item>
/// <description>they are both an <c>EmbeddedResource</c> and an <c>AdditionalFile</c></description>
/// </item>
/// <item>
/// <description>they are in the project folder <c>TestData</c></description>
/// </item>
/// <item>
/// <description>they have the extension <c>.txt</c></description>
/// </item>
/// </list>
/// </summary>
public static partial class TestData
{
    private static class EmbeddedResource
    {
        public static string Read(string resourceName)
        {
            var assembly = typeof(TestData).Assembly;
            using var stream = assembly.GetManifestResourceStream(resourceName)!;
            using var streamReader = new global::System.IO.StreamReader(stream, global::System.Text.Encoding.UTF8);
            var resourceText = streamReader.ReadToEnd();
            return resourceText;
        }
        public static class BackingField
        {
            public static string? Countries;
        }
        public static class ResourceName
        {
            public const string Countries = "EmbedDemo.TestData.Countries.txt";
        }
    }
    static partial void ReadEmbeddedResourceValue(ref string? backingField, string resourceName, string propertyName);
    static partial void AlterEmbeddedResourceReturnValue(ref string value, string resourceName, string propertyName);

    /// <summary>Text value of the Embedded Resource: Countries.txt</summary>
    /// <value>
    /// <code>
    /// USA
    /// Germany
    /// France
    /// Romania
    /// Italy
    /// 
    /// </code>
    /// </value>
    /// <remarks>
    /// The value is read from the embedded resource on first access.
    /// </remarks>
    public static string Countries
    {
        get
        {
            ReadEmbeddedResourceValue(ref EmbeddedResource.BackingField.Countries, EmbeddedResource.ResourceName.Countries, "Countries");
            var value = EmbeddedResource.BackingField.Countries ??= EmbeddedResource.Read(EmbeddedResource.ResourceName.Countries);
            AlterEmbeddedResourceReturnValue(ref value, EmbeddedResource.ResourceName.Countries, "Countries");
            return value;
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Datacute.EmbeddedResourcePropertyGenerator ](/sources/Datacute.EmbeddedResourcePropertyGenerator.zip)

:::


### Share Datacute.EmbeddedResourcePropertyGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator&quote=Datacute.EmbeddedResourcePropertyGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator&text=Datacute.EmbeddedResourcePropertyGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator&title=Datacute.EmbeddedResourcePropertyGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator&title=Datacute.EmbeddedResourcePropertyGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDatacute.EmbeddedResourcePropertyGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Datacute.EmbeddedResourcePropertyGenerator

### In the same category (FilesToCode) - 13 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [DotnetYang](/docs/DotnetYang)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_JSON2Class](/docs/RSCG_JSON2Class)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [ThisAssembly.Strings](/docs/ThisAssembly.Strings)


#### [Weave](/docs/Weave)

