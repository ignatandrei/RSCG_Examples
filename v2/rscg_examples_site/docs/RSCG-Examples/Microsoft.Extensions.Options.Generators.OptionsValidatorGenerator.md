---
sidebar_position: 850
title: 85 - Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator
description: Generating the validation for data annotations on options classes.
slug: /Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator  by Microsoft


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Microsoft.Extensions.Options?label=Microsoft.Extensions.Options)](https://www.nuget.org/packages/Microsoft.Extensions.Options)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/runtime?label=updated)](https://github.com/dotnet/runtime)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/runtime?style=social)

## Details

### Info
:::info

Name: **Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator**

Microsoft.Extensions.Options

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.Extensions.Options*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/core/extensions/options-validation-generator

Source : https://github.com/dotnet/runtime

:::

### Original Readme
:::note

# .NET Runtime

[![Build Status](https://dev.azure.com/dnceng-public/public/_apis/build/status/dotnet/runtime/runtime?branchName=main)](https://dev.azure.com/dnceng-public/public/_build/latest?definitionId=129&branchName=main)
[![Help Wanted](https://img.shields.io/github/issues/dotnet/runtime/help%20wanted?style=flat-square&color=%232EA043&label=help%20wanted)](https://github.com/dotnet/runtime/labels/help%20wanted)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dotnet/runtime)
[![Discord](https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA)](https://aka.ms/dotnet-discord)

* [What is .NET?](#what-is-net)
* [How can I contribute?](#how-can-i-contribute)
* [Reporting security issues and security bugs](#reporting-security-issues-and-security-bugs)
* [Filing issues](#filing-issues)
* [Useful Links](#useful-links)
* [.NET Foundation](#net-foundation)
* [License](#license)

This repo contains the code to build the .NET runtime, libraries and shared host (`dotnet`) installers for
all supported platforms, as well as the sources to .NET runtime and libraries.

## What is .NET?

Official Starting Page: <https://dotnet.microsoft.com>

* [How to use .NET](https://docs.microsoft.com/dotnet/core/get-started) (with VS, VS Code, command-line CLI)
  * [Install official releases](https://dotnet.microsoft.com/download)
  * [Documentation](https://docs.microsoft.com/dotnet/core) (Get Started, Tutorials, Porting from .NET Framework, API reference, ...)
    * [Deploying apps](https://docs.microsoft.com/dotnet/core/deploying)
  * [Supported OS versions](https://github.com/dotnet/core/blob/main/os-lifecycle-policy.md)
* [Roadmap](https://github.com/dotnet/core/blob/main/roadmap.md)
* [Releases](https://github.com/dotnet/core/tree/main/release-notes)

## How can I contribute?

We welcome contributions! Many people all over the world have helped make this project better.


## Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue). You can also find these instructions in this repo's Security doc.

Also see info about related [Microsoft .NET Core and ASP.NET Core Bug Bounty Program](https://www.microsoft.com/msrc/bounty-dot-net-core).

## Filing issues

This repo should contain issues that are tied to the runtime, the class libraries and frameworks, the installation of the `dotnet` binary (sometimes known as the `muxer`) and the installation of the .NET runtime and libraries.

For other issues, please file them to their appropriate sibling repos. We have links to many of them on [our new issue page](https://github.com/dotnet/runtime/issues/new/choose).

## Useful Links

* [.NET Core source index](https://source.dot.net) / [.NET Framework source index](https://referencesource.microsoft.com)
* [API Reference docs](https://docs.microsoft.com/dotnet/api)
* [.NET API Catalog](https://apisof.net) (incl. APIs from daily builds and API usage info)
* [API docs writing guidelines](https://github.com/dotnet/dotnet-api-docs/wiki) - useful when writing /// comments
* [.NET Discord Server](https://aka.ms/dotnet-discord) - a place to discuss the development of .NET and its ecosystem

## .NET Foundation

.NET Runtime is a [.NET Foundation](https://www.dotnetfoundation.org/projects) project.

There are many .NET related projects on GitHub.

* [.NET home repo](https://github.com/Microsoft/dotnet) - links to 100s of .NET projects, from Microsoft and the community.
* [ASP.NET Core home](https://docs.microsoft.com/aspnet/core) - the best place to start learning about ASP.NET Core.

This project has adopted the code of conduct defined by the [Contributor Covenant](https://contributor-covenant.org) to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://www.dotnetfoundation.org/code-of-conduct).

General .NET OSS discussions: [.NET Foundation Discussions](https://github.com/dotnet-foundation/Home/discussions)

## License

.NET (including the runtime repo) is licensed under the MIT license.


:::

### About
:::note

Generating the validation for data annotations on options classes.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator**
```xml showLineNumbers {9}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Microsoft.Extensions.Options" Version="8.0.0" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OptValidator\src\DemoValidatorObj\MyAppValidator.cs" label="MyAppValidator.cs" >

  This is the use of **Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator** in *MyAppValidator.cs*

```csharp showLineNumbers 
namespace DemoValidatorObj;

[OptionsValidator]
public partial class ValidatorForMyApp
    : IValidateOptions<MyAppOptions>
{
}

//public class SecondModelNoNamespace
//{
//    [Required]
//    [MinLength(5)]
//    public string P4 { get; set; } = string.Empty;
//}


//[OptionsValidator]
//public partial class SecondValidatorNoNamespace
//    : IValidateOptions<SecondModelNoNamespace>
//{
//}



```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OptValidator\src\DemoValidatorObj\MyAppOptions.cs" label="MyAppOptions.cs" >

  This is the use of **Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator** in *MyAppOptions.cs*

```csharp showLineNumbers 
namespace DemoValidatorObj;

[DebuggerDisplay("{AppDisplayName}")]
public class MyAppOptions
{
    public const string ConfigName = "MyAppOptionsInConfig";
    [Required]
    [MinLength(3)]
    public string AppDisplayName { get; set; } = string.Empty;

    //[ValidateObjectMembers(
    //    typeof(SecondValidatorNoNamespace))]
    //public SecondModelNoNamespace? P2 { get; set; }
}

//[OptionsValidator]
//public partial class SecondValidatorNoNamespace
//    : IValidateOptions<SecondModelNoNamespace>
//{
//}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OptValidator\src\DemoValidatorObj\obj\GX\Microsoft.Extensions.Options.SourceGeneration\Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator\Validators.g.cs" label="Validators.g.cs" >


```csharp showLineNumbers 

    // <auto-generated/>
    #nullable enable
    #pragma warning disable CS1591 // Compensate for https://github.com/dotnet/roslyn/issues/54103
    namespace DemoValidatorObj
{
    partial class ValidatorForMyApp
    {
        /// <summary>
        /// Validates a specific named options instance (or all when <paramref name="name"/> is <see langword="null" />).
        /// </summary>
        /// <param name="name">The name of the options instance being validated.</param>
        /// <param name="options">The options instance.</param>
        /// <returns>Validation result.</returns>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]
        [System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessage("Trimming", "IL2026:RequiresUnreferencedCode",
             Justification = "The created ValidationContext object is used in a way that never call reflection")]
        public global::Microsoft.Extensions.Options.ValidateOptionsResult Validate(string? name, global::DemoValidatorObj.MyAppOptions options)
        {
            global::Microsoft.Extensions.Options.ValidateOptionsResultBuilder? builder = null;
            var context = new global::System.ComponentModel.DataAnnotations.ValidationContext(options);
            var validationResults = new global::System.Collections.Generic.List<global::System.ComponentModel.DataAnnotations.ValidationResult>();
            var validationAttributes = new global::System.Collections.Generic.List<global::System.ComponentModel.DataAnnotations.ValidationAttribute>(2);

            context.MemberName = "AppDisplayName";
            context.DisplayName = string.IsNullOrEmpty(name) ? "MyAppOptions.AppDisplayName" : $"{name}.AppDisplayName";
            validationAttributes.Add(global::__OptionValidationStaticInstances.__Attributes.A1);
            validationAttributes.Add(global::__OptionValidationStaticInstances.__Attributes.A2);
            if (!global::System.ComponentModel.DataAnnotations.Validator.TryValidateValue(options.AppDisplayName, context, validationResults, validationAttributes))
            {
                (builder ??= new()).AddResults(validationResults);
            }

            return builder is null ? global::Microsoft.Extensions.Options.ValidateOptionsResult.Success : builder.Build();
        }
    }
}
namespace __OptionValidationStaticInstances
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]
    file static class __Attributes
    {
        internal static readonly global::System.ComponentModel.DataAnnotations.RequiredAttribute A1 = new global::System.ComponentModel.DataAnnotations.RequiredAttribute();

        internal static readonly __OptionValidationGeneratedAttributes.__SourceGen__MinLengthAttribute A2 = new __OptionValidationGeneratedAttributes.__SourceGen__MinLengthAttribute(
            (int)3);
    }
}
namespace __OptionValidationStaticInstances
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]
    file static class __Validators
    {
    }
}
namespace __OptionValidationGeneratedAttributes
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]
    [global::System.AttributeUsage(global::System.AttributeTargets.Property | global::System.AttributeTargets.Field | global::System.AttributeTargets.Parameter, AllowMultiple = false)]
    file class __SourceGen__MinLengthAttribute : global::System.ComponentModel.DataAnnotations.ValidationAttribute
    {
        private static string DefaultErrorMessageString => "The field {0} must be a string or array type with a minimum length of '{1}'.";

        public __SourceGen__MinLengthAttribute(int length) : base(() => DefaultErrorMessageString) { Length = length; }
        public int Length { get; }
        public override bool IsValid(object? value)
        {
            if (Length < -1)
            {
                throw new global::System.InvalidOperationException("MinLengthAttribute must have a Length value that is zero or greater.");
            }
            if (value == null)
            {
                return true;
            }

            int length;
            if (value is string stringValue)
            {
                length = stringValue.Length;
            }
            else if (value is System.Collections.ICollection collectionValue)
            {
                length = collectionValue.Count;
            }
            else
            {
                throw new global::System.InvalidCastException($"The field of type {value.GetType()} must be a string, array, or ICollection type.");
            }

            return length >= Length;
        }
        public override string FormatErrorMessage(string name) => string.Format(global::System.Globalization.CultureInfo.CurrentCulture, ErrorMessageString, name, Length);
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator ](/sources/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator.zip)

:::


### Share Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator&quote=Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator&text=Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator&title=Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator&title=Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Options.Generators.OptionsValidatorGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator

### In the same category (EnhancementClass) - 26 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemberAccessor](/docs/MemberAccessor)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

