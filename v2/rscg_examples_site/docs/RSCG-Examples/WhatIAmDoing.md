---
sidebar_position: 1060
title: 106 - WhatIAmDoing
description: Intercept any method in any project
slug: /WhatIAmDoing
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# WhatIAmDoing  by Ignat Andrei


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_WhatIAmDoing?label=RSCG_WhatIAmDoing)](https://www.nuget.org/packages/RSCG_WhatIAmDoing/)[![Nuget](https://img.shields.io/nuget/dt/RSCG_WhatIAmDoing_Common?label=RSCG_WhatIAmDoing_Common)](https://www.nuget.org/packages/RSCG_WhatIAmDoing_Common/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_WhatIAmDoing?label=updated)](https://github.com/ignatandrei/RSCG_WhatIAmDoing)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_WhatIAmDoing?style=social)

## Details

### Info
:::info

Name: **WhatIAmDoing**

What I Am Doing - see what your software is doing. Add also RSCG_WhatIAmDoing_Common

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_WhatIAmDoing/*   

*https://www.nuget.org/packages/RSCG_WhatIAmDoing_Common/*   


You can find more details at https://github.com/ignatandrei/RSCG_WhatIAmDoing

Source : https://github.com/ignatandrei/RSCG_WhatIAmDoing

:::

### Original Readme
:::note

# RSCG_WhatIAmDoing


Instrument C# software on CI to find what the software is doing.


# Introduction

Decide what you want to monitor ... and then monitor it.


# Example

## Packages 

Add the following into the csproj you want to be monitores

```xml
	<ItemGroup>
	  <!-- <PackageReference Include="Microsoft.Extensions.Caching.Memory" Version="8.0.0" /> -->
	  <PackageReference Include="RSCG_WhatIAmDoing" Version="8.2024.10201.735" />
	  <PackageReference Include="RSCG_WhatIAmDoing_Common" Version="8.2024.10201.735" />
    </ItemGroup>

<PropertyGroup>

	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
</PropertyGroup>
```

## Code

### Intercept static methods
Assume that you want to monitor all calls to System.Console 

```csharp
//[ExposeClass(typeof(Encoding), nameof(Encoding.EncodingName))]
//[InterceptStatic("System.IO.File.*ts")]
//[InterceptStatic("System.IO.File.*")]
[InterceptStatic("System.Console.*")] // regex
//[InterceptStatic("WIAD_DemoConsole.Fib.*")]
internal class InterceptorMethodStatic : InterceptorMethodStaticBase, IInterceptorMethodStatic
{
    
}
```

### Intercept instance methods

Assume that you want to monitor all calls to any  method of any instance of Person

```csharp
//[InterceptInstanceClass(typeof(Person),"ame")]
//[InterceptInstanceClass(typeof(Person), "parat")]
//[InterceptInstanceClass(typeof(Person), "ncodi")]
[InterceptInstanceClass(typeof(Person), ".*")] //regex
public class InterceptorMethodInstanceClass: InterceptorMethodInstanceClassBase, IInterceptorMethodInstanceClass
{
    
    public InterceptorMethodInstanceClass()
    {
        
    }

}
```


### See the results

```csharp
var data= CachingData.Methods().ToArray();

foreach (var item in data)
{
    WriteLine($"Method {item.typeAndMethodData.MethodName} from class {item.typeAndMethodData.TypeOfClass} Time: {item.StartedAtDate} state {item.State} ");
    WriteLine($"  =>Arguments: {item.ArgumentsAsString()}");
    if ((item.State & AccumulatedStateMethod.HasResult) == AccumulatedStateMethod.HasResult)
    {
        WriteLine($"  =>Result: {item.Result}");
    }

}

```


# More details

If you want to implement YOUR interception , implement the following interfaces

IInterceptorMethodInstanceClass

IInterceptorMethodStatic


# License

MIT

:::

### About
:::note

Intercept any method in any project


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **WhatIAmDoing**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<ItemGroup>
		<!-- <PackageReference Include="Microsoft.Extensions.Caching.Memory" Version="8.0.0" /> -->
		<PackageReference Include="RSCG_WhatIAmDoing" Version="8.2024.10201.735" />
		<PackageReference Include="RSCG_WhatIAmDoing_Common" Version="8.2024.10201.735" />
	</ItemGroup>

	<PropertyGroup>

		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
		<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\Program.cs" label="Program.cs" >

  This is the use of **WhatIAmDoing** in *Program.cs*

```csharp showLineNumbers 
using RSCG_WhatIAmDoing_Common;

Console.WriteLine("Hello, World!");
var data = CachingData.Methods().ToArray();

foreach (var item in data)
{
    Console.WriteLine($"Method {item.typeAndMethodData.MethodName} from class {item.typeAndMethodData.TypeOfClass} Time: {item.StartedAtDate} state {item.State} ");
    Console.WriteLine($"  =>Arguments: {item.ArgumentsAsString()}");
    if ((item.State & AccumulatedStateMethod.HasResult) == AccumulatedStateMethod.HasResult)
    {
        Console.WriteLine($"  =>Result: {item.Result}");
    }

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\InterceptorStatic.cs" label="InterceptorStatic.cs" >

  This is the use of **WhatIAmDoing** in *InterceptorStatic.cs*

```csharp showLineNumbers 
using RSCG_WhatIAmDoing;
using RSCG_WhatIAmDoing_Common;

namespace WIADDemo;
//[ExposeClass(typeof(Encoding), nameof(Encoding.EncodingName))]
[InterceptStatic("System.Console.*")] // regex
internal class InterceptorMethodStatic : InterceptorMethodStaticBase, IInterceptorMethodStatic
{

}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\obj\GX\RSCG_WhatIAmDoing\RSCG_WhatIAmDoing.GeneratorWIAD\System.Console_WriteLine_1.cs" label="System.Console_WriteLine_1.cs" >


```csharp showLineNumbers 
#pragma warning disable CS1591 
#pragma warning disable CS9113
namespace System.Runtime.CompilerServices{
[AttributeUsage(AttributeTargets.Method,AllowMultiple =true)]
file class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute
{
}
}//end namespace

namespace RSCG_InterceptorTemplate{
static partial class SimpleIntercept
{


//replace code:Console.WriteLine("Hello, World!");
//replace code:123456789!123456789!123456789!12345
[System.Runtime.CompilerServices.InterceptsLocation(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\Program.cs", 3, 9)]
    
//[System.Diagnostics.DebuggerStepThrough()]
public static  void Intercept__WriteLine_0 (  string? value )  
{

System.Collections.Generic.Dictionary<string,string?> valValues = new (){


};//end valValues

System.Collections.Generic.Dictionary<string,string?> stringValues = new() {


                { "value", value  ?.ToString() } ,
            };//end stringValues

        System.Collections.Generic.Dictionary<string,string?>
            expValues = new() {

            };//end exposeValues


        var x=WIADDemo.InterceptorMethodStatic .InterceptStaticMethodBefore(
$$$""""
    {"IsVoid":true,"Tag":"","MethodName":"WriteLine","TypeOfClass":"System.Console"}
""""
            ,valValues , stringValues , expValues
)
; 


                try{

                 System.Console.WriteLine(value);

                WIADDemo.InterceptorMethodStatic .InterceptMethodAfterWithoutResult(x);
                
                }

            
        
            catch(System.Exception ex){
                WIADDemo.InterceptorMethodStatic .InterceptMethodException(x,ex);
                throw;
            }
            finally{
                WIADDemo.InterceptorMethodStatic .InterceptMethodFinally(x);
            }
        
}
                

}//end class

}//namespace RSCG_InterceptorTemplate


```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\obj\GX\RSCG_WhatIAmDoing\RSCG_WhatIAmDoing.GeneratorWIAD\System.Console_WriteLine_2.cs" label="System.Console_WriteLine_2.cs" >


```csharp showLineNumbers 
#pragma warning disable CS1591 
#pragma warning disable CS9113
namespace System.Runtime.CompilerServices{
[AttributeUsage(AttributeTargets.Method,AllowMultiple =true)]
file class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute
{
}
}//end namespace

namespace RSCG_InterceptorTemplate{
static partial class SimpleIntercept
{


//replace code:    Console.WriteLine($"Method {item.typeAndMethodData.MethodName} from class {item.typeAndMethodData.TypeOfClass} Time: {item.StartedAtDate} state {item.State} ");
//replace code:123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!123456789!1234
[System.Runtime.CompilerServices.InterceptsLocation(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\Program.cs", 8, 13)]
    
//[System.Diagnostics.DebuggerStepThrough()]
public static  void Intercept__WriteLine_1 (  string? value )  
{

System.Collections.Generic.Dictionary<string,string?> valValues = new (){


};//end valValues

System.Collections.Generic.Dictionary<string,string?> stringValues = new() {


                { "value", value  ?.ToString() } ,
            };//end stringValues

        System.Collections.Generic.Dictionary<string,string?>
            expValues = new() {

            };//end exposeValues


        var x=WIADDemo.InterceptorMethodStatic .InterceptStaticMethodBefore(
$$$""""
    {"IsVoid":true,"Tag":"","MethodName":"WriteLine","TypeOfClass":"System.Console"}
""""
            ,valValues , stringValues , expValues
)
; 


                try{

                 System.Console.WriteLine(value);

                WIADDemo.InterceptorMethodStatic .InterceptMethodAfterWithoutResult(x);
                
                }

            
        
            catch(System.Exception ex){
                WIADDemo.InterceptorMethodStatic .InterceptMethodException(x,ex);
                throw;
            }
            finally{
                WIADDemo.InterceptorMethodStatic .InterceptMethodFinally(x);
            }
        
}
                

}//end class

}//namespace RSCG_InterceptorTemplate


```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\obj\GX\RSCG_WhatIAmDoing\RSCG_WhatIAmDoing.GeneratorWIAD\System.Console_WriteLine_3.cs" label="System.Console_WriteLine_3.cs" >


```csharp showLineNumbers 
#pragma warning disable CS1591 
#pragma warning disable CS9113
namespace System.Runtime.CompilerServices{
[AttributeUsage(AttributeTargets.Method,AllowMultiple =true)]
file class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute
{
}
}//end namespace

namespace RSCG_InterceptorTemplate{
static partial class SimpleIntercept
{


//replace code:    Console.WriteLine($"  =>Arguments: {item.ArgumentsAsString()}");
//replace code:123456789!123456789!123456789!123456789!123456789!123456789!12345678
[System.Runtime.CompilerServices.InterceptsLocation(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\Program.cs", 9, 13)]
    
//[System.Diagnostics.DebuggerStepThrough()]
public static  void Intercept__WriteLine_2 (  string? value )  
{

System.Collections.Generic.Dictionary<string,string?> valValues = new (){


};//end valValues

System.Collections.Generic.Dictionary<string,string?> stringValues = new() {


                { "value", value  ?.ToString() } ,
            };//end stringValues

        System.Collections.Generic.Dictionary<string,string?>
            expValues = new() {

            };//end exposeValues


        var x=WIADDemo.InterceptorMethodStatic .InterceptStaticMethodBefore(
$$$""""
    {"IsVoid":true,"Tag":"","MethodName":"WriteLine","TypeOfClass":"System.Console"}
""""
            ,valValues , stringValues , expValues
)
; 


                try{

                 System.Console.WriteLine(value);

                WIADDemo.InterceptorMethodStatic .InterceptMethodAfterWithoutResult(x);
                
                }

            
        
            catch(System.Exception ex){
                WIADDemo.InterceptorMethodStatic .InterceptMethodException(x,ex);
                throw;
            }
            finally{
                WIADDemo.InterceptorMethodStatic .InterceptMethodFinally(x);
            }
        
}
                

}//end class

}//namespace RSCG_InterceptorTemplate


```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\obj\GX\RSCG_WhatIAmDoing\RSCG_WhatIAmDoing.GeneratorWIAD\System.Console_WriteLine_4.cs" label="System.Console_WriteLine_4.cs" >


```csharp showLineNumbers 
#pragma warning disable CS1591 
#pragma warning disable CS9113
namespace System.Runtime.CompilerServices{
[AttributeUsage(AttributeTargets.Method,AllowMultiple =true)]
file class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute
{
}
}//end namespace

namespace RSCG_InterceptorTemplate{
static partial class SimpleIntercept
{


//replace code:        Console.WriteLine($"  =>Result: {item.Result}");
//replace code:123456789!123456789!123456789!123456789!123456789!123456
[System.Runtime.CompilerServices.InterceptsLocation(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\WIAD\src\WIADDemo\Program.cs", 12, 17)]
    
//[System.Diagnostics.DebuggerStepThrough()]
public static  void Intercept__WriteLine_3 (  string? value )  
{

System.Collections.Generic.Dictionary<string,string?> valValues = new (){


};//end valValues

System.Collections.Generic.Dictionary<string,string?> stringValues = new() {


                { "value", value  ?.ToString() } ,
            };//end stringValues

        System.Collections.Generic.Dictionary<string,string?>
            expValues = new() {

            };//end exposeValues


        var x=WIADDemo.InterceptorMethodStatic .InterceptStaticMethodBefore(
$$$""""
    {"IsVoid":true,"Tag":"","MethodName":"WriteLine","TypeOfClass":"System.Console"}
""""
            ,valValues , stringValues , expValues
)
; 


                try{

                 System.Console.WriteLine(value);

                WIADDemo.InterceptorMethodStatic .InterceptMethodAfterWithoutResult(x);
                
                }

            
        
            catch(System.Exception ex){
                WIADDemo.InterceptorMethodStatic .InterceptMethodException(x,ex);
                throw;
            }
            finally{
                WIADDemo.InterceptorMethodStatic .InterceptMethodFinally(x);
            }
        
}
                

}//end class

}//namespace RSCG_InterceptorTemplate


```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project WhatIAmDoing ](/sources/WhatIAmDoing.zip)

:::


### Share WhatIAmDoing 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing&quote=WhatIAmDoing" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing&text=WhatIAmDoing:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing&title=WhatIAmDoing" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing&title=WhatIAmDoing&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWhatIAmDoing" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/WhatIAmDoing

### In the same category (AOP) - 0 other generators

