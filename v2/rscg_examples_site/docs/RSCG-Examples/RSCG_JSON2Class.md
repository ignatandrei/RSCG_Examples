---
sidebar_position: 1220
title: 122 - RSCG_JSON2Class
description: transform any json into a class
slug: /RSCG_JSON2Class
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_JSON2Class  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_JSON2Class?label=RSCG_JSON2Class)](https://www.nuget.org/packages/RSCG_JSON2Class/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_JSON2Class?label=updated)](https://github.com/ignatandrei/RSCG_JSON2Class)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_JSON2Class?style=social)

## Details

### Info
:::info

Name: **RSCG_JSON2Class**

This package transforms any json into a class

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_JSON2Class/*   


You can find more details at https://github.com/ignatandrei/RSCG_JSON2Class

Source : https://github.com/ignatandrei/RSCG_JSON2Class

:::

### Original Readme
:::note

# RSCG_JSON2Class
Transform any json ( including appsettings ) into a class

## Usage

Install the nuget package into your project

```xml
<ItemGroup>
  <PackageReference Include="RSCG_JSON2Class" Version="2024.2.29.807" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
</ItemGroup>
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	<GenerateDocumentationFile>True</GenerateDocumentationFile>
</PropertyGroup>

```


Verify that the json file is set analyzer ( and , if you want to deserialize, copy to the output directory)

```xml
<ItemGroup>
  <None Remove="testData.json" />
</ItemGroup>
<ItemGroup>
<AdditionalFiles Include="testData.json">
<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
</AdditionalFiles>
</ItemGroup>

```

Access from C# code

```csharp
using System.Text.Json;
var testData = JsonSerializer.Deserialize<JSON2ClassConsole.SettingsJson.testData>(System.IO.File.ReadAllText("testData.json"));
ArgumentNullException.ThrowIfNull(testData);
Console.WriteLine(testData.Logging.LogLevel.Default);
Console.WriteLine(testData.DictData.Number_2);
```



:::

### About
:::note

transform any json into a class


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_JSON2Class**
```xml showLineNumbers {20}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
<ItemGroup>
  <None Remove="testData.json" />
</ItemGroup>
<ItemGroup>
  <AdditionalFiles Include="testData.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </AdditionalFiles>
</ItemGroup>
	

	<ItemGroup>
  <PackageReference Include="RSCG_JSON2Class" Version="2024.2.29.807" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
		<GenerateDocumentationFile>True</GenerateDocumentationFile>
	</PropertyGroup>


</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_JSON2Class\src\JSON2ClassConsole\Program.cs" label="Program.cs" >

  This is the use of **RSCG_JSON2Class** in *Program.cs*

```csharp showLineNumbers 
using System.Text.Json;
var testData = JsonSerializer.Deserialize<JSON2ClassConsole.SettingsJson.testData>(System.IO.File.ReadAllText("testData.json"));
ArgumentNullException.ThrowIfNull(testData);
Console.WriteLine(testData.Logging.LogLevel.Default);
Console.WriteLine(testData.DictData.Number_2);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_JSON2Class\src\JSON2ClassConsole\testData.json" label="testData.json" >

  This is the use of **RSCG_JSON2Class** in *testData.json*

```csharp showLineNumbers 
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "MicrosoftHostingLifetime": "Trace"
    }
  },
  "PropChars": {
    "a": "ab'"
  },
  "NoProp": {},
  "AllowedHosts": "*",
  "MyTest": "'aa < >",
  "DictData": {
    "Test": {
      "1234a": [
        "1a",
        "b"
      ]
    },
    "A": "asdasd",
    "2": "asdasd",
    "MyNumber": 10,
    "55": {
      "a": "b1",
      "2": "test1"
    }
  }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_JSON2Class\src\JSON2ClassConsole\obj\GX\RSCG_JSON2Class\RSCG_JSON2Class.RSCG_JSON2Class\testData.cs" label="testData.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
namespace JSON2ClassConsole.SettingsJson
{

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class LogLevel 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "DEFAULT":
                    return this.Default ;
                
                case "MICROSOFT":
                    return this.Microsoft ;
                
                case "MICROSOFTHOSTINGLIFETIME":
                    return this.MicrosoftHostingLifetime ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from LogLevel prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Default" ;
            
                yield return "Microsoft" ;
            
                yield return "MicrosoftHostingLifetime" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("Default")]
        public string Default { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("Microsoft")]
        public string Microsoft { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("MicrosoftHostingLifetime")]
        public string MicrosoftHostingLifetime { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class Logging 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "LOGLEVEL":
                    return this.LogLevel ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from Logging prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "LogLevel" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("LogLevel")]
        public LogLevel LogLevel { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class PropChars 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "A":
                    return this.A ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from PropChars prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "A" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("a")]
        public string A { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class NoProp 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from NoProp prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
            yield break;
        }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class Test 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "NUMBER_1234A":
                    return this.Number_1234a ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from Test prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Number_1234a" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("1234a")]
        public IList<string> Number_1234a { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class Number_55 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "A":
                    return this.A ;
                
                case "NUMBER_2":
                    return this.Number_2 ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from Number_55 prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "A" ;
            
                yield return "Number_2" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("a")]
        public string A { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("2")]
        public string Number_2 { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class DictData 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "TEST":
                    return this.Test ;
                
                case "A":
                    return this.A ;
                
                case "NUMBER_2":
                    return this.Number_2 ;
                
                case "MYNUMBER":
                    return this.MyNumber ;
                
                case "NUMBER_55":
                    return this.Number_55 ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from DictData prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Test" ;
            
                yield return "A" ;
            
                yield return "Number_2" ;
            
                yield return "MyNumber" ;
            
                yield return "Number_55" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("Test")]
        public Test Test { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("A")]
        public string A { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("2")]
        public string Number_2 { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("MyNumber")]
        public int MyNumber { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("55")]
        public Number_55 Number_55 { get; set; }
        
        
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("RSCG_JSON2Class", "2024.2.29.807")]
    public partial class testData 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "LOGGING":
                    return this.Logging ;
                
                case "PROPCHARS":
                    return this.PropChars ;
                
                case "NOPROP":
                    return this.NoProp ;
                
                case "ALLOWEDHOSTS":
                    return this.AllowedHosts ;
                
                case "MYTEST":
                    return this.MyTest ;
                
                case "DICTDATA":
                    return this.DictData ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from testData prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Logging" ;
            
                yield return "PropChars" ;
            
                yield return "NoProp" ;
            
                yield return "AllowedHosts" ;
            
                yield return "MyTest" ;
            
                yield return "DictData" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("Logging")]
        public Logging Logging { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("PropChars")]
        public PropChars PropChars { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("NoProp")]
        public NoProp NoProp { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("AllowedHosts")]
        public string AllowedHosts { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("MyTest")]
        public string MyTest { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("DictData")]
        public DictData DictData { get; set; }
        
        
    }

}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_JSON2Class ](/sources/RSCG_JSON2Class.zip)

:::


### Share RSCG_JSON2Class 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class&quote=RSCG_JSON2Class" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class&text=RSCG_JSON2Class:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class&title=RSCG_JSON2Class" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class&title=RSCG_JSON2Class&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_JSON2Class" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_JSON2Class

### In the same category (FilesToCode) - 10 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [Weave](/docs/Weave)

