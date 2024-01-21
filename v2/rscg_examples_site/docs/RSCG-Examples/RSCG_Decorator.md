---
sidebar_position: 620
title: 62 - RSCG_Decorator
description: Intercept methods - start, stop,exception
slug: /RSCG_Decorator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_Decorator  by Andrei Ignat


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/RSCG_Decorator?label=RSCG_Decorator)](https://www.nuget.org/packages/RSCG_Decorator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_Decorator?label=updated)](https://github.com/ignatandrei/RSCG_Decorator)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_Decorator?style=social)

## Details

### Info
:::info

Name: **RSCG_Decorator**

Roslyn Decorator for a class- intercept methods

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_Decorator/*   


You can find more details at https://github.com/ignatandrei/RSCG_Decorator

Source : https://github.com/ignatandrei/RSCG_Decorator

:::

### Original Readme
:::note

# RSCG_Decorator
Decorator for classes , permit to know when method start and ends


## Usage

Add reference to RSCG_Decorator and RSCG_DecoratorCommon

```xml
<ItemGroup>
	
	  <PackageReference Include="RSCG_Decorator" Version="7.2023.930.2116" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
	  <PackageReference Include="RSCG_DecoratorCommon" Version="7.2023.930.2116" />
</ItemGroup>
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
	
```

For any class that you want to intercept methods, implement interface IDecoratorMethodV1

See example at the RSCG_DecoratorTestConsole

```csharp
public partial class Person : IDecoratorMethodV1
{
    public void EndMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("end "+recognizer.UniqueId);
    }

   
    public void ExceptionMethod(Exception ex, MethodRecognizer recognizer)
    {
        logger.LogError(ex, "exception on " + recognizer.UniqueId+ " Value Parameters:" + recognizer.ValueTypeParametersString); 
    }


    public void StartMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("start " + recognizer.UniqueId + " Value Parameters:"+recognizer.ValueTypeParametersString);
   }
}
```

## Usage with ASP.NET Core - or any DI framework

Let's take Person with interface IPerson. You have the following:

```csharp
serviceCollection 
          .AddTransient<IPerson, Person>();

```
You can add this as the latest

```csharp
serviceCollection = serviceCollection
     .AddTransient<Person, Person>()
     .AddTransient<IPerson, Person_Decorator>();
     
```

And when asking for IPerson , the last wins:

```csharp

var data = serviceProvider.GetRequiredService<IPerson>();
//obtaining Person_Decorator because is the last one

```



:::

### About
:::note

Intercept methods - start, stop,exception


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_Decorator**
```xml showLineNumbers {22}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
	  <IsPackable>false</IsPackable>
  </PropertyGroup>

  <PropertyGroup>
    <TreatWarningsAsErrors>True</TreatWarningsAsErrors>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
    <PackageReference Include="Microsoft.Extensions.Logging" Version="7.0.0" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="7.0.0" />
  </ItemGroup>

  <ItemGroup>
	  <PackageReference Include="RSCG_Decorator" Version="7.2023.930.2116" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
	  <PackageReference Include="RSCG_DecoratorCommon" Version="7.2023.930.2116" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Decorator\src\RSCG_DecoratorTestConsole\Program.cs" label="Program.cs" >

  This is the use of **RSCG_Decorator** in *Program.cs*

```csharp showLineNumbers 

var serviceCollection = new ServiceCollection()
          .AddLogging(builder =>
        builder.AddSimpleConsole(options =>
        {
            options.IncludeScopes = true;
            options.SingleLine = true;
            options.TimestampFormat = "HH:mm:ss ";
        }))
          .AddTransient<IPerson, Person>();

//register here the decorator
    serviceCollection = serviceCollection
        .AddTransient<Person, Person>()
        .AddTransient<IPerson, Person_Decorator>();

var serviceProvider=serviceCollection.BuildServiceProvider();

ArgumentNullException.ThrowIfNull(serviceProvider);

var logger = serviceProvider.GetRequiredService<ILoggerFactory>()
    .CreateLogger<Program>();


//using (logger.BeginScope("[scope is enabled]"))
//{
//    logger.LogInformation("Hello World!");
//}
logger.LogInformation("Starting app!");

var data = serviceProvider.GetRequiredService<IPerson>();
data.FirstName = "Andrei";
data.LastName = "Ignat";

Console.WriteLine(data.GetType().FullName);
Console.WriteLine( data.FullName("|"));

try
{
    await data.SaveId(-100);
}
catch(Exception ex)
{
    logger.LogError(ex, "in the main program");
}
//Console.ReadLine();

public partial class Program
{

}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Decorator\src\RSCG_DecoratorTestConsole\PersonLogger.cs" label="PersonLogger.cs" >

  This is the use of **RSCG_Decorator** in *PersonLogger.cs*

```csharp showLineNumbers 
using RSCG_DecoratorCommon;

namespace RSCG_DecoratorTestConsole;
public partial class Person : IDecoratorMethodV1
{
    public void EndMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("end "+recognizer.UniqueId);
    }

   
    public void ExceptionMethod(Exception ex, MethodRecognizer recognizer)
    {
        logger.LogError(ex, "exception on " + recognizer.UniqueId+ " Value Parameters:" + recognizer.ValueTypeParametersString); 
    }


    public void StartMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("start " + recognizer.UniqueId + " Value Parameters:"+recognizer.ValueTypeParametersString);
   }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Decorator\src\RSCG_DecoratorTestConsole\Person.cs" label="Person.cs" >

  This is the use of **RSCG_Decorator** in *Person.cs*

```csharp showLineNumbers 
using Microsoft.Extensions.Logging;
using System.Text;

namespace RSCG_DecoratorTestConsole;

public partial  class Person : IPerson 
{
    internal readonly ILogger<Person> logger;    
    public Person(ILogger<Person> logger)
    {
        this.logger = logger;
    }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName(string separator=" ")
    {
        logger.LogInformation("from original method");
        return FirstName+separator+LastName;
    }
    public void DisplayNameOnConsole()
    {
        Console.WriteLine(FullName());
    }
    public async Task<string> GetName()
    {
        await Task.Delay(1000);
        return FirstName??"";
    }
    public Task<string> GetFullName()
    {
        return Task.FromResult( FullName());
    }
    public Task SaveId(int id)
    {
        if (id < 0)
        {
            throw new ArgumentException("this is an error because is <0 ");
        }
        return Task.CompletedTask;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Decorator\src\RSCG_DecoratorTestConsole\obj\GX\RSCG_Decorator\RSCG_Decorator.GeneratorDecorator\RSCG_DecoratorTestConsole.Person_MethodDecoratorV1.cs" label="RSCG_DecoratorTestConsole.Person_MethodDecoratorV1.cs" >


```csharp showLineNumbers 
//generated by RSCG_Decorator, version 7.2023.930.2116
namespace RSCG_DecoratorTestConsole {
    partial class Person_Decorator :RSCG_DecoratorTestConsole.IPerson {
        private Person original;
        public Person_Decorator (Person original ){
            this.original=original;
        }
        //now decorate methods : 5


        public string? FirstName {
            get{
        return original.FirstName;
        }
        set{
        original.FirstName=value;
    }            
            
} 
    
        public string? LastName {
            get{
        return original.LastName;
        }
        set{
        original.LastName=value;
    }            
            
} 
    
        /*
        FullName 
        */
        public string FullName(string separator = " ")
        {
        var FullName_14 =new RSCG_DecoratorCommon.MethodRecognizer("Person","FullName");
        FullName_14.FileName="D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Decorator\\src\\RSCG_DecoratorTestConsole\\Person.cs";
        FullName_14.Line=14;

            FullName_14.ValueTypeParameters.Add("separator", separator);
                    using var mrUtils= new RSCG_DecoratorCommon.MRUtils(FullName_14, original);
        try{
             return original.FullName(separator);
        }
        catch(Exception ex){
        mrUtils.SendException(ex);
            throw;
        }
        
        }
        
    
        /*
        DisplayNameOnConsole 
        */
        public void DisplayNameOnConsole()
        {
        var DisplayNameOnConsole_19 =new RSCG_DecoratorCommon.MethodRecognizer("Person","DisplayNameOnConsole");
        DisplayNameOnConsole_19.FileName="D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Decorator\\src\\RSCG_DecoratorTestConsole\\Person.cs";
        DisplayNameOnConsole_19.Line=19;
        using var mrUtils= new RSCG_DecoratorCommon.MRUtils(DisplayNameOnConsole_19, original);
        try{
            original.DisplayNameOnConsole();
        }
        catch(Exception ex){
        mrUtils.SendException(ex);
            throw;
        }
        
        }
        
    
        /*
        GetName 
        */
        public async System.Threading.Tasks.Task<string> GetName()
        {
        var GetName_23 =new RSCG_DecoratorCommon.MethodRecognizer("Person","GetName");
        GetName_23.FileName="D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Decorator\\src\\RSCG_DecoratorTestConsole\\Person.cs";
        GetName_23.Line=23;
        using var mrUtils= new RSCG_DecoratorCommon.MRUtils(GetName_23, original);
        try{
            return await original.GetName();
        }
        catch(Exception ex){
        mrUtils.SendException(ex);
            throw;
        }
        
        }
        
    
        /*
        GetFullName 
        */
        public async System.Threading.Tasks.Task<string> GetFullName()
        {
        var GetFullName_28 =new RSCG_DecoratorCommon.MethodRecognizer("Person","GetFullName");
        GetFullName_28.FileName="D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Decorator\\src\\RSCG_DecoratorTestConsole\\Person.cs";
        GetFullName_28.Line=28;
        using var mrUtils= new RSCG_DecoratorCommon.MRUtils(GetFullName_28, original);
        try{
            return await original.GetFullName();
        }
        catch(Exception ex){
        mrUtils.SendException(ex);
            throw;
        }
        
        }
        
    
        /*
        SaveId 
        */
        public async System.Threading.Tasks.Task SaveId(int id)
        {
        var SaveId_32 =new RSCG_DecoratorCommon.MethodRecognizer("Person","SaveId");
        SaveId_32.FileName="D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Decorator\\src\\RSCG_DecoratorTestConsole\\Person.cs";
        SaveId_32.Line=32;

            SaveId_32.ValueTypeParameters.Add("id", id);
                    using var mrUtils= new RSCG_DecoratorCommon.MRUtils(SaveId_32, original);
        try{
            await original.SaveId(id);
        }
        catch(Exception ex){
        mrUtils.SendException(ex);
            throw;
        }
        
        }
        
    
    }
}


```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_Decorator ](/sources/RSCG_Decorator.zip)

:::


### Share RSCG_Decorator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator&quote=RSCG_Decorator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator&text=RSCG_Decorator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator&title=RSCG_Decorator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator&title=RSCG_Decorator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Decorator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Decorator

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [AspectGenerator](/docs/AspectGenerator)


### [BuilderGenerator](/docs/BuilderGenerator)


### [DudNet](/docs/DudNet)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [HsuSgSync](/docs/HsuSgSync)


### [Immutype](/docs/Immutype)


### [Ling.Audit](/docs/Ling.Audit)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MakeInterface.Generator](/docs/MakeInterface.Generator)


### [MemoryPack](/docs/MemoryPack)


### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


### [StaticReflection](/docs/StaticReflection)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


### [TelemetryLogging](/docs/TelemetryLogging)

