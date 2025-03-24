---
sidebar_position: 1860
title: 186 - RSCG_CompositeProvider
description: Generate composite class from interface, using multiple sources
slug: /RSCG_CompositeProvider
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_CompositeProvider  by Ignat Andrei


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_CompositeProvider?label=RSCG_CompositeProvider)](https://www.nuget.org/packages/RSCG_CompositeProvider/)[![Nuget](https://img.shields.io/nuget/dt/RSCG_CompositeProvider_common?label=RSCG_CompositeProvider_common)](https://www.nuget.org/packages/RSCG_CompositeProvider_common/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_CompositeProvider?label=updated)](https://github.com/ignatandrei/RSCG_CompositeProvider)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_CompositeProvider?style=social)

## Details

### Info
:::info

Name: **RSCG_CompositeProvider**

Interface to null object - common

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_CompositeProvider/*   

*https://www.nuget.org/packages/RSCG_CompositeProvider_common/*   


You can find more details at https://github.com/ignatandrei/RSCG_CompositeProvider

Source : https://github.com/ignatandrei/RSCG_CompositeProvider

:::

### Original Readme
:::note

# RSCG_CompositeProvider


Composite provider from interface . Given multiple implementation of an interface , return data from each / one 


## Usage

Add the nuget package to your project

```
dotnet add package RSCG_CompositeProvider
dotnet add package RSCG_CompositeProviderCommon
```

or put in your csproj file
```xml
  <ItemGroup>
    <PackageReference Include="RSCG_CompositeProvider" Version="2025.218.2100" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
    <PackageReference Include="RSCG_CompositeProvider_Common" Version="2025.218.2100" />
  </ItemGroup>
```

Then if you have an interface like this

```csharp
public interface IDataFrom
{
    string Name { get; }
    Task<string> KeyFromValue(string value, bool isKey);
}
```

and multiple implementation of the interface like this

```csharp
class DataFromHttp : IDataValue
{
    public string Name { get { return "DataFromHttp"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        var http=new HttpClient();
        var result = await http.GetStringAsync("https://www."+ Guid.NewGuid().ToString()+".com/" + key);
        return result;
    }
}


class DataFromMemory : IDataValue
{
    public string Name { get { return "DataFromMemory"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        await Task.Delay(1000);
        return $"this is value for {key} from memory";
    }
}
```

then you can call the composite provider to get data from all the implementation of the interface like this

```csharp

IDataValue provider = new DataValue_CP(new DataFromHttp(), new DataFromMemory());
var result = await provider.KeyFromValue("test", false);
Console.WriteLine(result);
DataValue_CP realClass = (DataValue_CP)provider ;
var lastInterface = realClass.lastUsedInterface ?? -1;
Console.WriteLine("value was obtained from " + realClass.Get(lastInterface).Name);
```



:::

### About
:::note

Generate composite class from interface, using multiple sources


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_CompositeProvider**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
	  <IsPackable>false</IsPackable>
  <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
</PropertyGroup>

  
  <ItemGroup>
    <PackageReference Include="RSCG_CompositeProvider" Version="2025.218.2100" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
    <PackageReference Include="RSCG_CompositeProvider_Common" Version="2025.218.2100" />
  </ItemGroup>
  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_CompositeProvider\src\CP_Console\Program.cs" label="Program.cs" >

  This is the use of **RSCG_CompositeProvider** in *Program.cs*

```csharp showLineNumbers 
using CP_Console;

IDataValue provider = new DataValue_CP(new DataFromHttp(), new DataFromMemory());
var result = await provider.KeyFromValue("test", false);
Console.WriteLine(result);
DataValue_CP realClass = (DataValue_CP)provider ;
var lastInterface = realClass.lastUsedInterface ?? -1;
Console.WriteLine("value was obtained from " + realClass.Get(lastInterface).Name);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_CompositeProvider\src\CP_Console\IDataValue.cs" label="IDataValue.cs" >

  This is the use of **RSCG_CompositeProvider** in *IDataValue.cs*

```csharp showLineNumbers 
using RSCG_CompositeProvider_Common;

namespace CP_Console;
[CompositeProvider]
public interface IDataValue
{
    public string Name { get; set; }
    public Task<string> KeyFromValue(string key, bool defaultValue);

    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_CompositeProvider\src\CP_Console\DataFromHttp.cs" label="DataFromHttp.cs" >

  This is the use of **RSCG_CompositeProvider** in *DataFromHttp.cs*

```csharp showLineNumbers 

namespace CP_Console;

class DataFromHttp : IDataValue
{
    public string Name { get { return "DataFromHttp"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        var http=new HttpClient();
        var result = await http.GetStringAsync("https://www."+ Guid.NewGuid().ToString()+".com/" + key);
        return result;
    }
}


class DataFromMemory : IDataValue
{
    public string Name { get { return "DataFromMemory"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        await Task.Delay(1000);
        return $"this is value for {key} from memory";
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_CompositeProvider\src\CP_Console\obj\GX\NameGenerator\NameGenerator.NameGen\TheAssemblyInfo.g.cs" label="TheAssemblyInfo.g.cs" >


```csharp showLineNumbers 

                // <auto-generated/>
                namespace Generated.CP_Console
                {
                    public static class TheAssemblyInfo
                    {
                        
                        public static readonly System.DateTime DateGeneratedUTC ;
                        public const string AssemblyName = "CP_Console";
                        public const string GeneratedNameNice = "Bertrand Russell is feeling good-natured in Rothera";
                        public const string GeneratedNameSmall = "good-natured-Bertrand Russell";
                        public const string GeneratedName = "good-natured-Bertrand Russell-Rothera";
                        static TheAssemblyInfo(){
                            DateGeneratedUTC = System.DateTime.ParseExact("2025-02-24 14:32:51", "yyyy-MM-dd HH:mm:ss", null);
                        }
                    }
                }
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_CompositeProvider\src\CP_Console\obj\GX\RSCG_CompositeProvider\RSCG_CompositeProvider.ToCompositeProvider\IDataValue_cp.cs" label="IDataValue_cp.cs" >


```csharp showLineNumbers 
// <auto-generated>
    //     This code was generated by a tool :RSCG_CompositeProvider
    //     Runtime Version: Herta Müller is feeling amiable in George Town
    //     DateOfTool : 2025-02-18 17:23:31
    //     Changes to this file may cause incorrect behavior and will be lost if
    //     the code is regenerated.
    //</auto-generated>
//------------------------------------------------------------------------------
/// <summary>
    /// This static partial class is a composite provider of IDataValue objects. 
    ///</summary>

#nullable enable
#pragma warning disable CS8603
#pragma warning disable CS8625
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName","2025.10218.11723.131")]
[System.Diagnostics.DebuggerDisplay("Name = {Name} ")]
public partial class DataValue_CP : global::CP_Console.IDataValue
{
public int? lastUsedInterface ;

private global::CP_Console.IDataValue[] values;
public DataValue_CP(params global::CP_Console.IDataValue[] values){
this.values=values;
}
public int Count{
get{
return values.Length;
}
}
public global::CP_Console.IDataValue Get(int nr){
    return values[nr];
}




        public string Name { get
        {
        lastUsedInterface = null;
        foreach(var item in values){
        lastUsedInterface =(lastUsedInterface ??-1)+1;
        if(item == null)continue;
        try{
        return item.Name;
        }
        catch(Exception ){
        //try with the next one
        }
        }
        throw new System.Collections.Generic.KeyNotFoundException();
        }
        set
        {
        foreach(var item in values){
        if(item == null)continue;
        try{
        item.Name = value;
        }
        catch(Exception ){
        //try with the next one
        }
        }
        }

        } 
    
            public virtual  async  System.Threading.Tasks.Task<string> KeyFromValue(string key, bool defaultValue) {
                lastUsedInterface =null;
                foreach(var item in values){
                    lastUsedInterface =(lastUsedInterface ??-1)+1;
                    if(item == null)continue;
                    try{
                        var data=   await  item.KeyFromValue(key, defaultValue) ;
                        return data;
                    }
                    catch(Exception ){
                        //try with the next one
                    }
                }
                throw new System.Collections.Generic.KeyNotFoundException();
            }
        
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_CompositeProvider ](/sources/RSCG_CompositeProvider.zip)

:::


### Share RSCG_CompositeProvider 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider&quote=RSCG_CompositeProvider" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider&text=RSCG_CompositeProvider:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider&title=RSCG_CompositeProvider" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider&title=RSCG_CompositeProvider&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_CompositeProvider" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_CompositeProvider

### In the same category (Interface) - 11 other generators


#### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


#### [CopyCat](/docs/CopyCat)


#### [Farskeptic.AutoCompose](/docs/Farskeptic.AutoCompose)


#### [MakeInterface.Generator](/docs/MakeInterface.Generator)


#### [Matryoshki](/docs/Matryoshki)


#### [Minerals.AutoInterfaces](/docs/Minerals.AutoInterfaces)


#### [NetAutomaticInterface](/docs/NetAutomaticInterface)


#### [ProxyGen](/docs/ProxyGen)


#### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


#### [rscg_Interface_to_null_object](/docs/rscg_Interface_to_null_object)


#### [RSCG_Static](/docs/RSCG_Static)

