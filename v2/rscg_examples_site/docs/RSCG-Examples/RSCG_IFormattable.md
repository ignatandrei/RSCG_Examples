---
sidebar_position: 1460
title: 146 - RSCG_IFormattable
description: Generating .ToString for IFormattable
slug: /RSCG_IFormattable
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_IFormattable  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_IFormattable?label=RSCG_IFormattable)](https://www.nuget.org/packages/RSCG_IFormattable/)[![Nuget](https://img.shields.io/nuget/dt/RSCG_IFormattableCommon?label=RSCG_IFormattableCommon)](https://www.nuget.org/packages/RSCG_IFormattableCommon/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/rscg_iformattable?label=updated)](https://github.com/ignatandrei/rscg_iformattable/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/rscg_iformattable?style=social)

## Details

### Info
:::info

Name: **RSCG_IFormattable**

Implement IFormattable for a class

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_IFormattable/*   

*https://www.nuget.org/packages/RSCG_IFormattableCommon/*   


You can find more details at https://github.com/ignatandrei/rscg_iformattable/

Source : https://github.com/ignatandrei/rscg_iformattable/

:::

### Original Readme
:::note

# RSCG_IFormattable
Roslyn Code Generator for IFormattable

## Usage
Add to your csproj file:
```xml
<ItemGroup>
  <PackageReference Include="RSCG_IFormattable" Version="2024.711.2013" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  <PackageReference Include="RSCG_IFormattableCommon" Version="2024.711.2013" />
</ItemGroup>
```

Add to your source file:
```csharp
[RSCG_IFormattableCommon.AddIFormattable]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
```

And then the result is 
```csharp
using RSCG_IFormattableConsole;

Person person = new ();
person.FirstName = "Andrei";
person.LastName = "Ignat";

Console.WriteLine(person.ToString("The person name is {FirstName} {LastName}",null));
```



:::

### About
:::note

Generating .ToString for IFormattable


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_IFormattable**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="RSCG_IFormattable" Version="2024.711.2013" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
		<PackageReference Include="RSCG_IFormattableCommon" Version="2024.711.2013" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>


</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_IFormattable\src\RSCG_IFormattableDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_IFormattable** in *Program.cs*

```csharp showLineNumbers 
using RSCG_IFormattableDemo;

Person person = new();
person.FirstName = "Andrei";
person.LastName = "Ignat";

Console.WriteLine(person.ToString("The person name is {FirstName} {LastName}"));

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_IFormattable\src\RSCG_IFormattableDemo\Person.cs" label="Person.cs" >

  This is the use of **RSCG_IFormattable** in *Person.cs*

```csharp showLineNumbers 

namespace RSCG_IFormattableDemo;
[RSCG_IFormattableCommon.AddIFormattable]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_IFormattable\src\RSCG_IFormattableDemo\obj\GX\RSCG_IFormattable\RSCG_IFormattable.GeneratorIFormattable\Person.gen.cs" label="Person.gen.cs" >


```csharp showLineNumbers 
namespace RSCG_IFormattableDemo {

    partial class Person {
        public string ToString(string format){
            return ToString(format, System.Globalization.CultureInfo.CurrentCulture);
        }
        public string ToString(string format, IFormatProvider provider) {
            if (String.IsNullOrEmpty(format)) format = "G";
            if (provider == null) provider = System.Globalization.CultureInfo.CurrentCulture;
            string retValue=format;
            if(format=="G") {
                retValue ="";

        retValue += FirstName + " = " + FirstName + ";";
    
        retValue += LastName + " = " + LastName + ";";
        return retValue;
            }

                    if(format.Contains("{FirstName}")){
                        var val = FirstName;
                        retValue=retValue.Replace("{FirstName}", val.ToString());
                    }
                
                    if(format.Contains("{LastName}")){
                        var val = LastName;
                        retValue=retValue.Replace("{LastName}", val.ToString());
                    }
                            return retValue;
        }
    }


}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_IFormattable ](/sources/RSCG_IFormattable.zip)

:::


### Share RSCG_IFormattable 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable&quote=RSCG_IFormattable" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable&text=RSCG_IFormattable:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable&title=RSCG_IFormattable" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable&title=RSCG_IFormattable&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_IFormattable" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_IFormattable

### In the same category (Templating) - 11 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [NTypewriter](/docs/NTypewriter)


#### [RazorBlade](/docs/RazorBlade)


#### [RazorSlices](/docs/RazorSlices)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

