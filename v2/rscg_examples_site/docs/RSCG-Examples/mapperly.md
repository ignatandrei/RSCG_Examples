---
sidebar_position: 250
title: 25 - mapperly
description: Mapping classes to/from DTO
slug: /mapperly
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# mapperly  by Riok

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/Riok.Mapperly?label=Riok.Mapperly)](https://www.nuget.org/packages/Riok.Mapperly/)
[![GitHub last commit](https://img.shields.io/github/last-commit/riok/mapperly?label=updated)](https://github.com/riok/mapperly)
![GitHub Repo stars](https://img.shields.io/github/stars/riok/mapperly?style=social)

## Details

### Info
:::info

Name: **mapperly**

Author: Riok

NuGet: 
*https://www.nuget.org/packages/Riok.Mapperly/*   


You can find more details at https://mapperly.riok.app/docs/getting-started/installation/

Source : https://github.com/riok/mapperly
:::

### About
:::note

Mapping classes to/from DTO


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **mapperly**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Riok.Mapperly" Version="2.8.0"  OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\mapperly\src\mapperlyDemo\Program.cs" label="Program.cs" >

  This is the use of **mapperly** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using mapperlyDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonMapper mapper = new() ;
var dto=mapper.Person2PersonDTO(p);
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\mapperly\src\mapperlyDemo\Person.cs" label="Person.cs" >

  This is the use of **mapperly** in *Person.cs*

```csharp showLineNumbers 

public class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}


```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\mapperly\src\mapperlyDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **mapperly** in *PersonDTO.cs*

```csharp showLineNumbers 
namespace mapperlyDemo;

public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\mapperly\src\mapperlyDemo\PersonMapper.cs" label="PersonMapper.cs" >

  This is the use of **mapperly** in *PersonMapper.cs*

```csharp showLineNumbers 
using Riok.Mapperly.Abstractions;

namespace mapperlyDemo;

[Mapper]
public partial class PersonMapper
{
    public partial PersonDTO Person2PersonDTO(Person p);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\mapperly\src\mapperlyDemo\obj\GX\Riok.Mapperly\Riok.Mapperly.MapperGenerator\PersonMapper.g.cs" label="PersonMapper.g.cs" >


```csharp showLineNumbers 
#nullable enable
namespace mapperlyDemo
{
    public partial class PersonMapper
    {
        public partial global::mapperlyDemo.PersonDTO Person2PersonDTO(global::Person p)
        {
            var target = new global::mapperlyDemo.PersonDTO();
            target.ID = p.ID;
            target.FirstName = p.FirstName;
            target.LastName = p.LastName;
            return target;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project mapperly ](/sources/mapperly.zip)

:::

### Download PDF

[Download PDF mapperly ](/pdfs/mapperly.pdf)

### Share mapperly 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly&quote=mapperly" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly&text=mapperly:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly&title=mapperly" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly&title=mapperly&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmapperly" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/mapperly
