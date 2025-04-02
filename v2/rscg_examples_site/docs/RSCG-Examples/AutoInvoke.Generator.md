---
sidebar_position: 1250
title: 125 - AutoInvoke.Generator
description: Finding all implementation of an interface/class and invoke them.
slug: /AutoInvoke.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AutoInvoke.Generator  by Patrick Kranz


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/AutoInvoke.Generator?label=AutoInvoke.Generator)](https://www.nuget.org/packages/AutoInvoke.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/LokiMidgard/AutoInvoke.Generator?label=updated)](https://github.com/LokiMidgard/AutoInvoke.Generator)
![GitHub Repo stars](https://img.shields.io/github/stars/LokiMidgard/AutoInvoke.Generator?style=social)

## Details

### Info
:::info

Name: **AutoInvoke.Generator**

A generator that invokes a specified Metohd for ever Type in your Project that sattisfis a defined constraint

Author: Patrick Kranz

NuGet: 
*https://www.nuget.org/packages/AutoInvoke.Generator/*   


You can find more details at https://github.com/LokiMidgard/AutoInvoke.Generator

Source : https://github.com/LokiMidgard/AutoInvoke.Generator

:::

### Original Readme
:::note

[![NuGet](https://img.shields.io/nuget/v/AutoInvoke.Generator.svg?style=flat-square)](https://www.nuget.org/packages/AutoInvoke.Generator/)
[![GitHub license](https://img.shields.io/github/license/LokiMidgard/AutoInvoke.Generator.svg?style=flat-square)](https://tldrlegal.com/license/mit-license#summary)
# AutoInvoke

This Generator let you anotate an Parameterless Generic Method with exactly one TypeArgument.

It will then generate a method with the same name and no type arguments that calls your anotated
method for every (non static) Type decleared in your project, that satisfies the type constraints.



## Sample

Assume you have the following Interface:

```c#
internal interface IFileLoder {
    public abstract static IFileLoder Init(string path);
    public abstract static string FileExtension { get; }
}
```

This describes a File loader for different types in our project.

And following implementation: 

```c#
internal class AudioLoader : IFileLoder {
    public static string FileExtension => ".mp3";

    public static IFileLoder Init(string Path) {
        return new AudioLoader(path);
    }
    // the rest of the code...
}
```

Which defines how we want to load mp3 files.

We now want to automaticly get a list of all `IFileLoader` so we know what files we can handle,
and we do not want to manualy handel such a list. 

An Implementation could look like this:

```c#
internal delegate IFileLoder LoadFile(string path);
internal partial class FileHandler {
    private readonly Dictionary<string, LoadFile> loaders = new();

    public FileHandler() {
        LoadLoaders();
    }

    public void LoadFile(string file) {
        if (loaders.TryGetValue(Path.GetExtension(file), out var loaderFactory)) {
            var loader = loaderFactory(file);
            // use loader to do things
        }
    }


    [AutoInvoke.Generator.FindAndInvoke]
    public void LoadLoaders<T>() where T : IFileLoder {
        this.loaders.Add(T.FileExtension, T.Init);
    }
}
```

The field loaders will have all extensions our code can handle, and has to every extension
the corresponding `Init`-Method.

The Generated code will look like this:

```c#
partial class FileHandler {
    private void LoadLoaders() {
        LoadLoaders<AutoInvoke.Generator.Example.AudioLoader>();
    }
}
```


## Featurs and limitations

- You can control wich type of types shold get called. E.g. by
  default no calls are generated for abstract classes or types defined in referenced Assemblys. But you can overide this setting
- The anotated method can be static
- If the anotated method has parameters the generated method has the same parametrs
- If the return type is not `void` the generated methods returntype is an array of the return type of the attributed method

### Limitations
- When using multiple Type Parameters, one Type Parameter must contain all others (transitiv) like `Foo<T1, T2, T3>() where T1: IComparable<T2> where T2 : IComparable<T3>`
- You can't call static Types. Generics do not allow this.




:::

### About
:::note

Finding all implementation of an interface/class and invoke them.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AutoInvoke.Generator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoInvoke.Generator" Version="0.0.9">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\Program.cs" label="Program.cs" >

  This is the use of **AutoInvoke.Generator** in *Program.cs*

```csharp showLineNumbers 
using AutoAdd;

RemoteCollection rc=new();
foreach(var item in rc.loaders)
{
    item.Execute();
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\RemoteCollection.cs" label="RemoteCollection.cs" >

  This is the use of **AutoInvoke.Generator** in *RemoteCollection.cs*

```csharp showLineNumbers 

namespace AutoAdd;
partial class RemoteCollection
{
    public List<IRemoteCommand> loaders = new ();

    public RemoteCollection()
    {
        LoadLoaders();
    }
    [AutoInvoke.FindAndInvoke]
    public void LoadLoaders<T>() where T : IRemoteCommand,new()
    {
        loaders.Add(new T());
    }
    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\PCRemote.cs" label="PCRemote.cs" >

  This is the use of **AutoInvoke.Generator** in *PCRemote.cs*

```csharp showLineNumbers 

namespace AutoAdd;
internal class PCRemote : IRemoteCommand
{
    public void Execute()
    {
        Console.WriteLine("start PC");
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\TVRemote.cs" label="TVRemote.cs" >

  This is the use of **AutoInvoke.Generator** in *TVRemote.cs*

```csharp showLineNumbers 

namespace AutoAdd;
internal class TVRemote : IRemoteCommand
{
    public void Execute()
    {
        Console.WriteLine("start TV");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\obj\GX\AutoInvoke.Generator\AutoInvoke.Generator.InvokeGenerator\attribute.g.cs" label="attribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace AutoInvoke;
[System.AttributeUsage(System.AttributeTargets.Method, Inherited = false, AllowMultiple = true)]
[System.Diagnostics.Conditional("AutoNotifyGenerator_DEBUG")]
internal sealed class FindAndInvokeAttribute : System.Attribute
{
#pragma warning disable CS0169 // Remove unused parameter

#pragma warning disable IDE0060 // Remove unused parameter

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

    public FindAndInvokeAttribute()
    {
    }

    public FindAndInvokeAttribute(string pattern)
    {
    }

    public bool ScanExternalAssamblies { get; set; }
    public string MethodName { get; set; }
    public bool CallForAbstractClasses { get; set; }
    public bool CallForInterfaces { get; set; }
    public bool CallForStructs { get; set; }
    public bool CallForClasses { get; set; }
    public bool CallForRecords { get; set; }
#pragma warning restore CS0169 // Remove unused parameter

#pragma warning restore IDE0060 // Remove unused parameter

#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoInvoke.Generator\src\AutoAdd\obj\GX\AutoInvoke.Generator\AutoInvoke.Generator.InvokeGenerator\AutoAdd.class.LoadLoaders.g.cs" label="AutoAdd.class.LoadLoaders.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace AutoAdd;
partial class RemoteCollection {
    private void LoadLoaders() {
        LoadLoaders<global::AutoAdd.PCRemote>();
        LoadLoaders<global::AutoAdd.TVRemote>();
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project AutoInvoke.Generator ](/sources/AutoInvoke.Generator.zip)

:::


### Share AutoInvoke.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&quote=AutoInvoke.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&text=AutoInvoke.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&title=AutoInvoke.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&title=AutoInvoke.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoInvoke.Generator

### In the same category (EnhancementProject) - 17 other generators


#### [AutoSpectre](/docs/AutoSpectre)


#### [BuildInfo](/docs/BuildInfo)


#### [CommandLine](/docs/CommandLine)


#### [Credfeto.Version.Information.Generator](/docs/Credfeto.Version.Information.Generator)


#### [Larcanum.GitInfo](/docs/Larcanum.GitInfo)


#### [LinqGen.Generator](/docs/LinqGen.Generator)


#### [Pekspro.BuildInformationGenerator](/docs/Pekspro.BuildInformationGenerator)


#### [PlantUmlClassDiagramGenerator](/docs/PlantUmlClassDiagramGenerator)


#### [RSCG_AMS](/docs/RSCG_AMS)


#### [RSCG_ExportDiagram](/docs/RSCG_ExportDiagram)


#### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


#### [RSCG_NameGenerator](/docs/RSCG_NameGenerator)


#### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


#### [RSCG_Wait](/docs/RSCG_Wait)


#### [ThisAssembly](/docs/ThisAssembly)


#### [ThisAssembly.Constants](/docs/ThisAssembly.Constants)


#### [ThisAssembly.Metadata](/docs/ThisAssembly.Metadata)

