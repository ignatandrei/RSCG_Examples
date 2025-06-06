---
sidebar_position: 890
title: 89 - InterceptorTemplate
description: Andrei Ignat
slug: /InterceptorTemplate
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# InterceptorTemplate  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_InterceptorTemplate?label=RSCG_InterceptorTemplate)](https://www.nuget.org/packages/RSCG_InterceptorTemplate/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_InterceptorTemplate?label=updated)](https://github.com/ignatandrei/RSCG_InterceptorTemplate)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_InterceptorTemplate?style=social)

## Details

### Info
:::info

Name: **InterceptorTemplate**

Package Description

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_InterceptorTemplate/*   


You can find more details at https://github.com/ignatandrei/RSCG_InterceptorTemplate

Source : https://github.com/ignatandrei/RSCG_InterceptorTemplate

:::

### Original Readme
:::note

# RSCG_InterceptorTemplate

Interceptor template - supported from >= .NET 8.0 . Uses also experimental interceptor feature from C#12.0

It can rewrite any method call to any other method call. It can also rewrite any method call to any other method call with the same signature. It can also rewrite any method call to any other method call with the same signature and the same return type.

It does not ( yet ) support generic methods.

For example, if you have a method call like this:

```csharp
Console.WriteLine("and now with argument " + newPerson.TestFullNameWithArguments("<","!+",">",2));
```

it can intercept it with the arguments .

For example, if you use this template 

```csharp
public static {{(ser.item.HasTaskReturnType?"async":"")}} {{ser.item.TypeReturn}} {{ser.item.MethodSignature}}({{ser.item.ThisArgument}} {{ser.item.ArgumentsForCallMethod}} )  
{
    var cc=Console.BackgroundColor ;
    try{
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.WriteLine("start specific TestFullNameWithArguments template-->{{ser.item.MethodSignature}}");
        Console.WriteLine("number of arguments = {{ser.item.Arguments.size}}");
        {{ for argum in ser.item.Arguments }}
        Console.WriteLine("argument {{for.index+1}} type {{argum.Type}} and value = "+ {{argum.Name}});
        {{ end }}
        {{ser.item.ReturnString}} {{(ser.item.HasTaskReturnType ? "await" : "")}} {{ser.item.CallMethod}};
    }
    finally{
        Console.WriteLine("end specific template-->{{ser.item.MethodSignature}}");
        Console.BackgroundColor = cc;
    }
}
```

The final result will be:

```csharp
public static  string Intercept_newPerson_TestFullNameWithArguments(this RSCG_DemoObjects.Person newPerson ,string start,string separator,string end,int repeat )  
{
    var cc=Console.BackgroundColor ;
    try{
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.WriteLine("start specific TestFullNameWithArguments template-->Intercept_newPerson_TestFullNameWithArguments");
        Console.WriteLine("number of arguments = 4");
        Console.WriteLine("argument 1 type string and value = "+ start);
        Console.WriteLine("argument 2 type string and value = "+ separator);
        Console.WriteLine("argument 3 type string and value = "+ end);
        Console.WriteLine("argument 4 type int and value = "+ repeat);
        return  newPerson.TestFullNameWithArguments(start,separator,end,repeat);
    }
    finally{
        Console.WriteLine("end specific template-->Intercept_newPerson_TestFullNameWithArguments");
        Console.BackgroundColor = cc;
    }
}
```

You can use any template . Some examples at src/RSCG_InterceptorTemplateConsole/Interceptors


## How to use it


Add to your project (>= .NET 8 ) the nuget package RSCG_InterceptorTemplate

```xml
<ItemGroup>
 <PackageReference Include="RSCG_InterceptorTemplate" Version="8.2023.2811.524" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
<PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
</PropertyGroup>
```

Make a folder Interceptors in the project and add also at least the generic interceptor ( see templates at src/RSCG_InterceptorTemplateConsole/Interceptors/ , start with GenericInterceptorForAllMethods.txt )

```csharp

```xml
  <ItemGroup>
    <!-- <AdditionalFiles Include="Interceptors\TestFullNameWithArguments.txt">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </AdditionalFiles> -->
    <AdditionalFiles Include="Interceptors\GenericInterceptorForAllMethods.txt">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </AdditionalFiles>
  </ItemGroup>
```

The interceptor will not run template at build time in Visual Studiom, but it will run at build time in dotnet build.

For this, you need to have something like that ( powershell file) -I named mine compile.ps1

```powershell
cls
#not necessary for CI builds, but only for debugging purposes
Write-Host "delete obj and bin"
gci obj -recurse | foreach{ri $_.FullName -recurse -force }
gci bin -recurse | foreach{ri $_.FullName -recurse -force }
#for windows batch file 
#setx InterceptMethods "FullName"
#echo Environment variable InterceptMethods has been set to %InterceptMethods%
#put here the names of the methods you want to intercept , separated by ;
$env:InterceptMethods = "FullName;Test;PersonsLoaded;TestFullNameWithArguments;ShowRandomPersonNumber;Connect;SavePerson;InsertPerson"
Write-Host "Environment variable  $env:InterceptMethods  has been set to " $env:InterceptMethods
dotnet clean
dotnet restore
dotnet build /p:EmitCompilerGeneratedFiles=true --disable-build-servers --force
#debug only
# dotnet run --project RSCG_InterceptorTemplateConsole/RSCG_InterceptorTemplateConsole.csproj

```

Enjoy!

:::

### About
:::note

Andrei Ignat


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **InterceptorTemplate**
```xml showLineNumbers {26}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
	  <IsPackable>false</IsPackable>

  </PropertyGroup>
  
  <ItemGroup>
    <AdditionalFiles Include="Interceptors\TestFullNameWithArguments.txt">
      <CopyToOutputDirectory>Never</CopyToOutputDirectory>
    </AdditionalFiles>
    <AdditionalFiles Include="Interceptors\GenericInterceptorForAllMethods.txt">
      <CopyToOutputDirectory>Never</CopyToOutputDirectory>
    </AdditionalFiles>
    <AdditionalFiles Include="Interceptors\FullName.txt">
      <CopyToOutputDirectory>Never</CopyToOutputDirectory>
    </AdditionalFiles>
  </ItemGroup>
  

  <ItemGroup>
	  <PackageReference Include="RSCG_InterceptorTemplate" Version="8.2023.2811.446" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  </ItemGroup>
  

  <ItemGroup>
    <ProjectReference Include="..\RSCG_DemoObjects\RSCG_DemoObjects.csproj" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
		<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
	</PropertyGroup>
	<PropertyGroup>
		<TreatWarningsAsErrors>True</TreatWarningsAsErrors>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\InterceptorTemplate\src\RSCG_InterceptorTemplateConsole\Program.cs" label="Program.cs" >

  This is the use of **InterceptorTemplate** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine("Run the compile.ps1 file!");
var p=new Person();
p.FirstName="Andrei";
p.LastName="Ignat";
Console.WriteLine("debug for "+p.FullName());
Console.WriteLine("this is "+p.FullName());
var x = p.Test();
Console.WriteLine(x);
var newPerson = new Person();
newPerson.FirstName = "Andrei";
newPerson.LastName = "Ignat";
var namePerson = newPerson.FullName();
Console.WriteLine(namePerson);

Console.WriteLine("loaded "+Person.PersonsLoaded());
Console.WriteLine("loaded " + RSCG_DemoObjects.Person.PersonsLoaded());
Console.WriteLine("and again  " + RSCG_DemoObjects.Person.PersonsLoaded());

Console.WriteLine("and now with argument " + newPerson.TestFullNameWithArguments("<","!+",">",2));
Console.WriteLine("and a random person " + Person.ShowRandomPersonNumber(1));
var q= await PersonLoader.SavePerson(newPerson);
PersonLoader.Connect();
//Console.ReadLine();
IPersonLoader ipl=new PersonLoader();
await ipl.InsertPerson(newPerson);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\InterceptorTemplate\src\RSCG_InterceptorTemplateConsole\Interceptors\FullName.txt" label="FullName.txt" >

  This is the use of **InterceptorTemplate** in *FullName.txt*

```csharp showLineNumbers 
//example generating for full name {{Version}}
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

{{ for loc in ser.dataForEachIntercepts }}
//replace code:{{loc.code}}";
//replace code:{{loc.CodeNumbered}}";
[System.Runtime.CompilerServices.InterceptsLocation(@"{{loc.Path}}", {{loc.Line}}, {{loc.StartMethod}})]
{{ end }}

//[System.Diagnostics.DebuggerStepThrough()]
public static {{(ser.item.HasTaskReturnType?"async":"")}} {{ser.item.TypeReturn}} {{ser.item.MethodSignature}}({{ser.item.ThisArgument}} {{ser.item.ArgumentsForCallMethod}} )  
{
    var cc=Console.BackgroundColor ;
    try{
    Console.BackgroundColor = ConsoleColor.DarkGreen;
    Console.WriteLine("start specific FullName template-->{{ser.item.MethodSignature}}");
    {{ser.item.ReturnString}} {{(ser.item.HasTaskReturnType ? "await" : "")}} {{ser.item.CallMethod}};
    }
    finally{
        Console.WriteLine("end specific template-->{{ser.item.MethodSignature}}");
        Console.BackgroundColor = cc;
    }
}
                

}//end class

}//namespace RSCG_InterceptorTemplate
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\InterceptorTemplate\src\RSCG_InterceptorTemplateConsole\Interceptors\TestFullNameWithArguments.txt" label="TestFullNameWithArguments.txt" >

  This is the use of **InterceptorTemplate** in *TestFullNameWithArguments.txt*

```csharp showLineNumbers 
//example generating for TestFullNameWithArguments {{Version}}
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

{{ for loc in ser.dataForEachIntercepts }}
//replace code:{{loc.code}}";
//replace code:{{loc.CodeNumbered}}";
[System.Runtime.CompilerServices.InterceptsLocation(@"{{loc.Path}}", {{loc.Line}}, {{loc.StartMethod}})]
{{ end }}

//[System.Diagnostics.DebuggerStepThrough()]
public static {{(ser.item.HasTaskReturnType?"async":"")}} {{ser.item.TypeReturn}} {{ser.item.MethodSignature}}({{ser.item.ThisArgument}} {{ser.item.ArgumentsForCallMethod}} )  
{
    var cc=Console.BackgroundColor ;
    try{
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.WriteLine("start specific TestFullNameWithArguments template-->{{ser.item.MethodSignature}}");
        Console.WriteLine("number of arguments = {{ser.item.Arguments.size}}");
        {{ for argum in ser.item.Arguments }}
        Console.WriteLine("argument {{for.index+1}} type {{argum.Type}} and value = "+ {{argum.Name}});
        {{ end }}
        {{ser.item.ReturnString}} {{(ser.item.HasTaskReturnType ? "await" : "")}} {{ser.item.CallMethod}};
    }
    finally{
        Console.WriteLine("end specific template-->{{ser.item.MethodSignature}}");
        Console.BackgroundColor = cc;
    }
}
                

}//end class

}//namespace RSCG_InterceptorTemplate
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\InterceptorTemplate\src\RSCG_InterceptorTemplateConsole\Interceptors\GenericInterceptorForAllMethods.txt" label="GenericInterceptorForAllMethods.txt" >

  This is the use of **InterceptorTemplate** in *GenericInterceptorForAllMethods.txt*

```csharp showLineNumbers 
//example generating generic for all methods in a class {{Version}}
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

{{ for loc in ser.dataForEachIntercepts }}
//replace code:{{loc.code}}";
//replace code:{{loc.CodeNumbered}}";
[System.Runtime.CompilerServices.InterceptsLocation(@"{{loc.Path}}", {{loc.Line}}, {{loc.StartMethod}})]
{{ end }}

//[System.Diagnostics.DebuggerStepThrough()]
public static {{(ser.item.HasTaskReturnType?"async":"")}} {{ser.item.TypeReturn}} {{ser.item.MethodSignature}}({{ser.item.ThisArgument}} {{ser.item.ArgumentsForCallMethod}} )  
{
    try{
        Console.WriteLine("start from generic template-->{{ser.item.MethodSignature}}");
        {{ser.item.ReturnString}} {{(ser.item.HasTaskReturnType ? "await" : "")}} {{ser.item.CallMethod}};
    }
    finally{
        Console.WriteLine("end from generic template-->{{ser.item.MethodSignature}}");
    }
}
                

}//end class

}//namespace RSCG_InterceptorTemplate
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\InterceptorTemplate\src\RSCG_DemoObjects\IPersonLoader.cs" label="IPersonLoader.cs" >

  This is the use of **InterceptorTemplate** in *IPersonLoader.cs*

```csharp showLineNumbers 

namespace RSCG_DemoObjects;

public interface IPersonLoader
{
    Task<Person> InsertPerson(Person p);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX


## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project InterceptorTemplate ](/sources/InterceptorTemplate.zip)

:::


### Share InterceptorTemplate 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate&quote=InterceptorTemplate" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate&text=InterceptorTemplate:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate&title=InterceptorTemplate" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate&title=InterceptorTemplate&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInterceptorTemplate" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/InterceptorTemplate

### In the same category (Templating) - 11 other generators


#### [Gobie](/docs/Gobie)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [NTypewriter](/docs/NTypewriter)


#### [RazorBlade](/docs/RazorBlade)


#### [RazorSlices](/docs/RazorSlices)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

