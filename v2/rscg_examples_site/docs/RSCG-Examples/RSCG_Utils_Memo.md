---
sidebar_position: 570
title: 57 - RSCG_Utils_Memo
description: Memo the function result
slug: /RSCG_Utils_Memo
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_Utils_Memo  by Ignat Andrei


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/rscgutils?label=rscgutils)](https://www.nuget.org/packages/rscgutils)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_Utils?label=updated)](https://github.com/ignatandrei/RSCG_Utils)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_Utils?style=social)

## Details

### Info
:::info

Name: **RSCG_Utils_Memo**

Additional files as strings

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/rscgutils*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation

Source : https://github.com/ignatandrei/RSCG_Utils

:::

### Original Readme
:::note

# RSCG_Utils

Roslyn Source Code Generators Utils

[![pack to nuget](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml)

[![pack to nuget](https://img.shields.io/nuget/dt/rscgutils?style=for-the-badge)](https://www.nuget.org/packages/rscgutils)

# Usage

## Additional Files

Allow you to see additional files directly as C# const. For this, please add some .gen. files to the project.

In your csproj

```xml
<ItemGroup>
 	  <PackageReference Include="rscgutils" Version="2023.502.835" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
<ItemGroup>
	<AdditionalFiles Include="Second.gen.txt" />
	<AdditionalFiles Include="first.gen.txt" />
	<AdditionalFiles Include="test\Afirst.gen.txt" />
	<AdditionalFiles Include="sql/**/*" />
</ItemGroup>
```

In the code

```csharp
//see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string
string x= MyAdditionalFiles.Second_gen_txt;
```

To debug, you can add into the .csproj
```xml
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GeneratedX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

More details at http://msprogrammer.serviciipeweb.ro/2023/05/08/file-to-csharp-const/


## Json2Class

If you have an additional json file, you can have a file from this

```xml
<ItemGroup>
	<AdditionalFiles Include="my.gen.json" />
</ItemGroup>
```

And you can have from the code
```csharp

var json = System.Text.Json.JsonSerializer
    .Deserialize<GeneratedJson.my_gen_json>(MyAdditionalFiles.my_gen_json);

ArgumentNullException.ThrowIfNull( json );
Console.WriteLine( ":hosts"+json.AllowedHosts );

```

## Memoization of function returns

Put _MemoPure and the return of the function will be memo-ized

```csharp
public long Test_MemoPure()
{
    Console.WriteLine("calculating type");
    return this.GetType().ToString().GetHashCode();
}
public async Task<long> fib(long nr)
{
    await Task.Delay(1000);
    //Console.WriteLine("calculated value for " + nr);
    if (nr <= 1) return 1;
    if (nr == 2) return 2;
    return await fib(nr - 1) + await fib(nr - 1);
}

public async Task<long> fibonacci_MemoPure(long nr)
{
    if (nr <= 1) return 1;
    if (nr == 2) return 2;
    await Task.Delay(1000);
    return await fibonacci(nr - 1) + await fibonacci(nr - 1);

}
```

And call

```csharp
fibTest f = new();
Console.WriteLine("first time :" + f.Test());
Console.WriteLine("second time :" + f.Test());

Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("no memo :"+await f.fib(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("memo :" + await f.fibonacci(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("FAST memo :" + await f.fibonacci(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));


```

# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)




:::

### About
:::note

Memo the function result


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_Utils_Memo**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="rscgutils" Version="2023.914.2016" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Memo\src\DemoRSCG_UtilsMemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_Utils_Memo** in *Program.cs*

```csharp showLineNumbers 
using DemoRSCG_UtilsMemo;

fibTest f = new();
Console.Write("start calculating, see output");
Console.WriteLine("first time result:" + f.Test());
Console.WriteLine("memo, no output");
Console.WriteLine("second time result:" + f.Test());
var dt = DateTime.Now;
Console.WriteLine("no memo :" + await f.fib(5) );
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));
dt = DateTime.Now;
Console.WriteLine("memo :" + await f.fibonacci(5));
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));
dt = DateTime.Now;
Console.WriteLine("FAST memo :" + await f.fibonacci(5));
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Memo\src\DemoRSCG_UtilsMemo\fib.cs" label="fib.cs" >

  This is the use of **RSCG_Utils_Memo** in *fib.cs*

```csharp showLineNumbers 
namespace DemoRSCG_UtilsMemo;

internal partial class fibTest
{
    public long Test_MemoPure()
    {
        Console.WriteLine("calculating type");
        return this.GetType().ToString().GetHashCode();
    }
    public async Task<long> fib(long nr)
    {
        await Task.Delay(1000);
        //Console.WriteLine("calculated value for " + nr);
        if (nr <= 1) return 1;
        if (nr == 2) return 2;
        return await fib(nr - 1) + await fib(nr - 1);
    }

    public async Task<long> fibonacci_MemoPure(long nr)
    {
        if (nr <= 1) return 1;
        if (nr == 2) return 2;
        await Task.Delay(1000);
        return await fibonacci(nr - 1) + await fibonacci(nr - 1);

    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Memo\src\DemoRSCG_UtilsMemo\obj\GX\RSCG_Utils\RSCG_Utils.UtilsGenerator\DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.cs" label="DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.cs" >


```csharp showLineNumbers 
using System.Collections.Concurrent;

//this is auto-generated by a tool
namespace DemoRSCG_UtilsMemo;
partial class fibTest 
{
    
    System.Collections.Concurrent.ConcurrentDictionary<Tuple<long > , long> __cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure =new System.Collections.Concurrent.ConcurrentDictionary<Tuple<long >, long>();
    //True 
    public async Task<long>  fibonacci (long nr ){
        var key= Tuple.Create(nr);
        if (__cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.TryGetValue(key, out var result)) return result;
        //Console.WriteLine($"not in cache, calculating {key}");
        var data= await __wrap_fibonacci(key);
        return __cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.GetOrAdd(key,data);
    }
    public async Task<long>  __wrap_fibonacci (Tuple<long > args){
        return await fibonacci_MemoPure (args.Item1);
    }
    
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Memo\src\DemoRSCG_UtilsMemo\obj\GX\RSCG_Utils\RSCG_Utils.UtilsGenerator\DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.cs" label="DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.cs" >


```csharp showLineNumbers 
using System.Collections.Concurrent;

//this is auto-generated by a tool
namespace DemoRSCG_UtilsMemo;
partial class fibTest 
{
    
    System.Collections.Concurrent.ConcurrentDictionary<string , long > __cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure =new System.Collections.Concurrent.ConcurrentDictionary<string, long >();
    //False 
    public  long  Test ( ){
        var key= string.Empty;
        if (__cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.TryGetValue(key, out var result)) return result;
        //Console.WriteLine($"not in cache, calculating {key}");
        var data=  __wrap_Test(key);
        return __cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.GetOrAdd(key,data);
    }
    public  long  __wrap_Test (string args){
        return  Test_MemoPure ();
    }
    
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_Utils_Memo ](/sources/RSCG_Utils_Memo.zip)

:::


### Share RSCG_Utils_Memo 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&quote=RSCG_Utils_Memo" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&text=RSCG_Utils_Memo:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&title=RSCG_Utils_Memo" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&title=RSCG_Utils_Memo&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Utils_Memo

### In the same category (FunctionalProgramming) - 12 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Dusharp](/docs/Dusharp)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionGen](/docs/UnionGen)


#### [UnionsGenerator](/docs/UnionsGenerator)

