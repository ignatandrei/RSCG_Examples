---
sidebar_position: 1960
title: 196 - ArgumentParsing
description: Transform command line arguments into strongly typed objects
slug: /ArgumentParsing
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveCommandLine.mdx';

# ArgumentParsing  by 


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ArgumentParsing?label=ArgumentParsing)](https://www.nuget.org/packages/ArgumentParsing/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DoctorKrolic/ArgumentParsing?label=updated)](https://github.com/DoctorKrolic/ArgumentParsing)
![GitHub Repo stars](https://img.shields.io/github/stars/DoctorKrolic/ArgumentParsing?style=social)

## Details

### Info
:::info

Name: **ArgumentParsing**

Source generator based command line arguments parser

Author: 

NuGet: 
*https://www.nuget.org/packages/ArgumentParsing/*   


You can find more details at https://github.com/DoctorKrolic/ArgumentParsing

Source: https://github.com/DoctorKrolic/ArgumentParsing

:::

### Original Readme
:::note

# Argument Parsing

Library for command line arguments parsing with intuitive API in declarative style, allowing you to build complex command line applications by simply declaring options type and annotating its members with attributes to get the desired behavior. All logic is source-generated, making this library completely AOT-friendly!

## Overview

- Best works on latest .NET version, but is __.NET Standard 2.0 compatible__, meaning it works on a huge variety of .NET versions, including .NET Framework
- Provides simple declarative API: you define _what_ you want and the library figures out _how_ to achieve that
- Supports wide variety of types, including nullable value types and immutable sequences like `ImmutableArray<T>`
- Good integration with modern C# features (e.g. you can specify a required option/parameter by making its corresponding property `required`)
- Provides default implementations of `--help` and `--version` commands with additional customization
- All parsing logic is entirely source-generated, making this library completely NativeAOT-friendly
- Delivers rich developer experience: the editor provides real-time diagnostics, including error detection, code suggestions and more as you type
- Includes detailed and comprehensive wiki documentation

## Quick start example

```cs
using ArgumentParsing;
using ArgumentParsing.Generated;
using ArgumentParsing.Results;
using ArgumentParsing.SpecialCommands.Help;
using System;
using System.Collections.Immutable;
using System.Linq;

namespace SimpleSumApp;

partial class Program
{
    private static void Main(string[] args)
    {
        ParseArguments(args).ExecuteDefaults(ExecuteMainApp);
    }

    [GeneratedArgumentParser]
    private static partial ParseResult<Options> ParseArguments(string[] args);

    private static void ExecuteMainApp(Options options)
    {
        // At this point all errors and special cases are handled,
        // so we get valid options object we can work with
        var sum = options.FirstRequiredParameter + options.SecondRequiredParameter;
        if (options.Verbose)
        {
            Console.WriteLine($"Sum of 2 required parameters: {sum}");
        }

        var remainingSum = options.RemainingParameters.Sum();
        if (options.Verbose)
        {
            Console.WriteLine($"Sum of remaining parameters: {remainingSum}");
        }

        Console.WriteLine($"Total sum: {sum + remainingSum}");
    }
}

[OptionsType]
class Options
{
    [Option('v'), HelpInfo("Enables verbose logging")]
    public bool Verbose { get; init; }

    [Parameter(0)]
    public required int FirstRequiredParameter { get; init; }

    [Parameter(1)]
    public required int SecondRequiredParameter { get; init; }

    [RemainingParameters]
    public ImmutableArray<int> RemainingParameters { get; init; }
}
```


:::

### About
:::note

Transform command line arguments into strongly typed objects


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ArgumentParsing**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <!--<ItemGroup>
    <ProjectReference Include="..\src\ArgumentParsing\ArgumentParsing.csproj" />
    <ProjectReference Include="..\src\ArgumentParsing.Generators\ArgumentParsing.Generators.csproj" OutputItemType="Analyzer" ReferenceOutputAssembly="false" PrivateAssets="all" />
  </ItemGroup>-->
  
  
  <PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
  </PropertyGroup>
  
  
  <ItemGroup>
    <PackageReference Include="ArgumentParsing" Version="0.3.0" OutputItemType="Analyzer" ReferenceOutputAssembly="false" PrivateAssets="all" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ArgumentParsing\src\ArgPars\Program.cs" label="Program.cs" >

  This is the use of **ArgumentParsing** in *Program.cs*

```csharp showLineNumbers 
using ArgumentParsing;
using ArgumentParsing.Results;

namespace ArgPars;

partial class Program
{
    /// <summary>
    /// Execute in the folder with csproj file:
    ///
    /// dotnet run -- --help
    /// dotnet run -- --version
    /// dotnet run -- sample-input.txt
    /// dotnet run -- -v -f Xml sample-input.txt
    /// </summary>
    /// <param name="args"></param>
    private static void Main(string[] args)
    {
        // Parse the command line arguments with the generated parser
        var result = ParseArguments(args);
        
        // Handle the result based on its state
        switch (result.State) 
        {
            case ParseResultState.ParsedOptions:
                ExecuteMainApp(result.Options!);
                break;
            case ParseResultState.ParsedWithErrors:
                Console.Error.WriteLine("Error parsing arguments:");
                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        Console.Error.WriteLine($"  {error.GetMessage()}");
                    }
                }
                Environment.Exit(1);
                break;
            case ParseResultState.ParsedSpecialCommand:
                var exitCode = result.SpecialCommandHandler!.HandleCommand();
                Environment.Exit(exitCode);
                break;
        }
    }

    [GeneratedArgumentParser]
    private static partial ParseResult<FileProcessorOptions> ParseArguments(string[] args);

    private static void ExecuteMainApp(FileProcessorOptions options)
    {
        // At this point all errors and special cases are handled,
        // so we get valid options object we can work with
        
        Console.WriteLine("=== File Processor Tool ===");
        Console.WriteLine($"Verbose mode: {options.Verbose}");

        if (options.Verbose)
        {
            Console.WriteLine($"Verbose mode: enabled");
            Console.WriteLine($"Output format: {options.OutputFormat}");
            Console.WriteLine($"Max file size: {options.MaxFileSizeBytes} bytes");
            Console.WriteLine($"Input file: {options.InputFile}");
            
            if (!string.IsNullOrEmpty(options.OutputFile))
                Console.WriteLine($"Output file: {options.OutputFile}");
                
            if (options.AdditionalFiles.Length > 0)
            {
                Console.WriteLine($"Additional files ({options.AdditionalFiles.Length}):");
                foreach (var file in options.AdditionalFiles)
                {
                    Console.WriteLine($"  - {file}");
                }
            }
        }

        //TODO: Simulate file processing
        
    }

    

    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ArgumentParsing\src\ArgPars\FileProcessorOptions.cs" label="FileProcessorOptions.cs" >

  This is the use of **ArgumentParsing** in *FileProcessorOptions.cs*

```csharp showLineNumbers 
using ArgumentParsing;
using ArgumentParsing.SpecialCommands.Help;
using System.Collections.Immutable;

namespace ArgPars;

[OptionsType]
class FileProcessorOptions
{
    [Option('v', "verbose"), HelpInfo("Enable verbose logging and detailed output")]
    public bool Verbose { get; init; }

    [Option('f', "format"), HelpInfo("Output format for processed files (json, xml, csv)")]
    public OutputFormat OutputFormat { get; init; } = OutputFormat.Json;

    [Option('m', "max-size"), HelpInfo("Maximum file size in bytes (default: 10MB)")]
    public long MaxFileSizeBytes { get; init; } = 10 * 1024 * 1024; // 10MB default

    [Option('o', "output"), HelpInfo("Output file path (optional, defaults to input file with new extension)")]
    public string? OutputFile { get; init; }

    [Parameter(0, Name = "input-file"), HelpInfo("Path to the input file to process")]
    public required string InputFile { get; init; }

    [RemainingParameters, HelpInfo("Additional files to process")]
    public ImmutableArray<string> AdditionalFiles { get; init; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ArgumentParsing\src\ArgPars\obj\GX\ArgumentParsing.Generators\ArgumentParsing.Generators.ArgumentParserGenerator\ExampleProject.FileProcessorOptions.g.cs" label="ExampleProject.FileProcessorOptions.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable disable
#pragma warning disable

namespace ArgumentParsing.Generated
{
    internal static partial class ParseResultExtensions
    {
        /// <summary>
        /// Executes common default actions for the given <see cref="global::ArgumentParsing.Results.ParseResult{TOptions}"/>
        /// <list type="bullet">
        /// <item>If <paramref name="result"/> is in <see cref="global::ArgumentParsing.Results.ParseResultState.ParsedOptions"/> state invokes provided <paramref name="action"/> with parsed options object</item>
        /// <item>If <paramref name="result"/> is in <see cref="global::ArgumentParsing.Results.ParseResultState.ParsedWithErrors"/> state writes help screen text with parse errors to <see cref="global::System.Console.Error"/> and exits application with code 1</item>
        /// <item>If <paramref name="result"/> is in <see cref="global::ArgumentParsing.Results.ParseResultState.ParsedSpecialCommand"/> state executes parsed handler and exits application with code, returned from the handler</item>
        /// </list>
        /// </summary>
        /// <param name="result">Parse result</param>
        /// <param name="action">Action, which will be invoked if options type is correctly parsed</param>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("ArgumentParsing.Generators.ArgumentParserGenerator", "0.3.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute]
        public static void ExecuteDefaults(this global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions> result, global::System.Action<global::ExampleProject.FileProcessorOptions> action)
        {
            switch (result.State)
            {
                case global::ArgumentParsing.Results.ParseResultState.ParsedOptions:
                    action(result.Options);
                    break;
                case global::ArgumentParsing.Results.ParseResultState.ParsedWithErrors:
                    string errorScreenText = global::ArgumentParsing.Generated.HelpCommandHandler_ExampleProject_FileProcessorOptions.GenerateHelpText(result.Errors);
                    global::System.Console.Error.WriteLine(errorScreenText);
                    global::System.Environment.Exit(1);
                    break;
                case global::ArgumentParsing.Results.ParseResultState.ParsedSpecialCommand:
                    int exitCode = result.SpecialCommandHandler.HandleCommand();
                    global::System.Environment.Exit(exitCode);
                    break;
            }
        }
    }
}

namespace ExampleProject
{
    partial class Program
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("ArgumentParsing.Generators.ArgumentParserGenerator", "0.3.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute]
        private static partial global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions> ParseArguments(string[] args)
        {
            bool Verbose_val = default(bool);
            global::ExampleProject.OutputFormat OutputFormat_val = default(global::ExampleProject.OutputFormat);
            long MaxFileSizeBytes_val = default(long);
            string OutputFile_val = default(string);
            string InputFile_val = default(string);
            global::System.Collections.Immutable.ImmutableArray<string>.Builder remainingParametersBuilder = global::System.Collections.Immutable.ImmutableArray.CreateBuilder<string>();

            int state = -3;
            int seenOptions = 0;
            global::System.Collections.Generic.HashSet<global::ArgumentParsing.Results.Errors.ParseError> errors = null;
            global::System.Span<global::System.Range> longArgSplit = stackalloc global::System.Range[2];
            global::System.ReadOnlySpan<char> latestOptionName = default(global::System.ReadOnlySpan<char>);
            string previousArgument = null;
            int parameterIndex = 0;

            foreach (string arg in args)
            {
                if (state == -3)
                {
                    switch (arg)
                    {
                        case "--help":
                            return new global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions>(new global::ArgumentParsing.Generated.HelpCommandHandler_ExampleProject_FileProcessorOptions());
                        case "--version":
                            return new global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions>(new global::ArgumentParsing.Generated.VersionCommandHandler());
                    }

                    state = 0;
                }

                global::System.ReadOnlySpan<char> val;

                bool hasLetters = global::System.Linq.Enumerable.Any(arg, char.IsLetter);
                bool startsOption = hasLetters && arg.Length > 1 && arg.StartsWith('-');

                if (state > 0 && startsOption)
                {
                    errors ??= new();
                    errors.Add(new global::ArgumentParsing.Results.Errors.OptionValueIsNotProvidedError(previousArgument));
                    state = 0;
                }

                if (state != -2)
                {
                    if (arg.StartsWith("--") && (hasLetters || arg.Length == 2 || arg.Contains('=')))
                    {
                        global::System.ReadOnlySpan<char> slice = global::System.MemoryExtensions.AsSpan(arg, 2);
                        int written = global::System.MemoryExtensions.Split(slice, longArgSplit, '=');

                        latestOptionName = slice[longArgSplit[0]];
                        switch (latestOptionName)
                        {
                            case "":
                                if (written == 1)
                                {
                                    state = -2;
                                }
                                else
                                {
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.UnrecognizedArgumentError(arg));
                                }
                                continue;
                            case "verbose":
                                if ((seenOptions & 0b0001) > 0)
                                {
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("verbose"));
                                }
                                Verbose_val = true;
                                state = -10;
                                seenOptions |= 0b0001;
                                break;
                            case "format":
                                if ((seenOptions & 0b0010) > 0)
                                {
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("format"));
                                }
                                state = 2;
                                seenOptions |= 0b0010;
                                break;
                            case "max-size":
                                if ((seenOptions & 0b0100) > 0)
                                {
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("max-size"));
                                }
                                state = 3;
                                seenOptions |= 0b0100;
                                break;
                            case "output":
                                if ((seenOptions & 0b1000) > 0)
                                {
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("output"));
                                }
                                state = 4;
                                seenOptions |= 0b1000;
                                break;
                            default:
                                errors ??= new();
                                errors.Add(new global::ArgumentParsing.Results.Errors.UnknownOptionError(latestOptionName.ToString(), arg));
                                if (written == 1)
                                {
                                    state = -1;
                                }
                                goto continueMainLoop;
                        }

                        if (written == 2)
                        {
                            val = slice[longArgSplit[1]];
                            goto decodeValue;
                        }

                        goto continueMainLoop;
                    }

                    if (startsOption)
                    {
                        global::System.ReadOnlySpan<char> slice = global::System.MemoryExtensions.AsSpan(arg, 1);

                        for (int i = 0; i < slice.Length; i++)
                        {
                            if (state > 0)
                            {
                                val = slice.Slice(i);
                                goto decodeValue;
                            }

                            char shortOptionName = slice[i];
                            latestOptionName = new global::System.ReadOnlySpan<char>(in slice[i]);
                            switch (shortOptionName)
                            {
                                case 'v':
                                    if ((seenOptions & 0b0001) > 0)
                                    {
                                        errors ??= new();
                                        errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("v"));
                                    }
                                    Verbose_val = true;
                                    state = -10;
                                    seenOptions |= 0b0001;
                                    break;
                                case 'f':
                                    if ((seenOptions & 0b0010) > 0)
                                    {
                                        errors ??= new();
                                        errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("f"));
                                    }
                                    state = 2;
                                    seenOptions |= 0b0010;
                                    break;
                                case 'm':
                                    if ((seenOptions & 0b0100) > 0)
                                    {
                                        errors ??= new();
                                        errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("m"));
                                    }
                                    state = 3;
                                    seenOptions |= 0b0100;
                                    break;
                                case 'o':
                                    if ((seenOptions & 0b1000) > 0)
                                    {
                                        errors ??= new();
                                        errors.Add(new global::ArgumentParsing.Results.Errors.DuplicateOptionError("o"));
                                    }
                                    state = 4;
                                    seenOptions |= 0b1000;
                                    break;
                                default:
                                    if (state <= -10)
                                    {
                                        val = slice.Slice(i);
                                        latestOptionName = new global::System.ReadOnlySpan<char>(in slice[i - 1]);
                                        goto decodeValue;
                                    }
                                    errors ??= new();
                                    errors.Add(new global::ArgumentParsing.Results.Errors.UnknownOptionError(shortOptionName.ToString(), arg));
                                    state = -1;
                                    goto continueMainLoop;
                            }
                        }

                        goto continueMainLoop;
                    }
                }

                val = global::System.MemoryExtensions.AsSpan(arg);

            decodeValue:
                switch (state)
                {
                    case -1:
                        break;
                    case 2:
                        if (!global::System.Enum.TryParse<global::ExampleProject.OutputFormat>(val, out OutputFormat_val))
                        {
                            errors ??= new();
                            errors.Add(new global::ArgumentParsing.Results.Errors.BadOptionValueFormatError(val.ToString(), latestOptionName.ToString()));
                        }
                        break;
                    case 3:
                        if (!long.TryParse(val, global::System.Globalization.NumberStyles.Integer, global::System.Globalization.CultureInfo.InvariantCulture, out MaxFileSizeBytes_val))
                        {
                            errors ??= new();
                            errors.Add(new global::ArgumentParsing.Results.Errors.BadOptionValueFormatError(val.ToString(), latestOptionName.ToString()));
                        }
                        break;
                    case 4:
                        OutputFile_val = val.ToString();
                        break;
                    default:
                        switch (parameterIndex++)
                        {
                            case 0:
                                InputFile_val = arg;
                                break;
                            default:
                                remainingParametersBuilder.Add(arg);
                                break;
                        }
                        break;
                }

                state = 0;

            continueMainLoop:
                previousArgument = arg;
            }

            if (state > 0)
            {
                errors ??= new();
                errors.Add(new global::ArgumentParsing.Results.Errors.OptionValueIsNotProvidedError(previousArgument));
            }

            if (parameterIndex <= 0)
            {
                errors ??= new();
                errors.Add(new global::ArgumentParsing.Results.Errors.MissingRequiredParameterError(
                "input-file", 0));
            }

            if (errors != null)
            {
                return new global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions>(global::ArgumentParsing.Results.Errors.ParseErrorCollection.AsErrorCollection(errors));
            }

            global::ExampleProject.FileProcessorOptions options = new global::ExampleProject.FileProcessorOptions
            {
                Verbose = Verbose_val,
                OutputFormat = OutputFormat_val,
                MaxFileSizeBytes = MaxFileSizeBytes_val,
                OutputFile = OutputFile_val,
                InputFile = InputFile_val,
                AdditionalFiles = remainingParametersBuilder.ToImmutable(),
            };

            return new global::ArgumentParsing.Results.ParseResult<global::ExampleProject.FileProcessorOptions>(options);
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ArgumentParsing\src\ArgPars\obj\GX\ArgumentParsing.Generators\ArgumentParsing.Generators.ArgumentParserGenerator\HelpCommandHandler.ExampleProject.FileProcessorOptions.g.cs" label="HelpCommandHandler.ExampleProject.FileProcessorOptions.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable disable
#pragma warning disable

namespace ArgumentParsing.Generated
{
    /// <summary>
    /// Default implementation of <c>--help</c> command for <see cref="global::ExampleProject.FileProcessorOptions"/> type
    /// </summary>
    [global::ArgumentParsing.SpecialCommands.SpecialCommandAliasesAttribute("--help")]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("ArgumentParsing.Generators.ArgumentParserGenerator", "0.3.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute]
    internal sealed class HelpCommandHandler_ExampleProject_FileProcessorOptions : global::ArgumentParsing.SpecialCommands.ISpecialCommandHandler
    {
        /// <summary>
        /// Generates help text for <see cref="global::ExampleProject.FileProcessorOptions"/> type.
        /// If <paramref name="errors"/> parameter is supplied, generated text will contain an error section
        /// </summary>
        /// <param name="errors">Parse errors to include into help text</param>
        /// <returns>Generated help text</returns>
        public static string GenerateHelpText(global::ArgumentParsing.Results.Errors.ParseErrorCollection? errors = null)
        {
            global::System.Text.StringBuilder helpBuilder = new();
            helpBuilder.AppendLine("ArgPars 1.0.0");
            helpBuilder.AppendLine("Copyright (C) " + global::System.DateTime.UtcNow.Year.ToString());
            if ((object)errors != null)
            {
                helpBuilder.AppendLine();
                helpBuilder.AppendLine("ERROR(S):");
                foreach (global::ArgumentParsing.Results.Errors.ParseError error in errors)
                {
                    helpBuilder.AppendLine("  " + error.GetMessage());
                }
            }
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("OPTIONS:");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  -v, --verbose\tEnable verbose logging and detailed output");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  -f, --format\tOutput format for processed files (json, xml, csv)");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  -m, --max-size\tMaximum file size in bytes (default: 10MB)");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  -o, --output\tOutput file path (optional, defaults to input file with new extension)");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("PARAMETERS:");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  input-file (at index 0)\tRequired. Path to the input file to process");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  Remaining parameters\tAdditional files to process");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("COMMANDS:");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  --help\tShow help screen");
            helpBuilder.AppendLine();
            helpBuilder.AppendLine("  --version\tShow version information");
            return helpBuilder.ToString();
        }

        /// <inheritdoc/>
        public int HandleCommand()
        {
            global::System.Console.Out.WriteLine(GenerateHelpText());
            return 0;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ArgumentParsing\src\ArgPars\obj\GX\ArgumentParsing.Generators\ArgumentParsing.Generators.ArgumentParserGenerator\VersionCommandHandler.ArgPars.g.cs" label="VersionCommandHandler.ArgPars.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable disable
#pragma warning disable

namespace ArgumentParsing.Generated
{
    /// <summary>
    /// Default implementation of <c>--version</c> command for <c>ArgPars</c> assembly
    /// </summary>
    [global::ArgumentParsing.SpecialCommands.SpecialCommandAliasesAttribute("--version")]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("ArgumentParsing.Generators.ArgumentParserGenerator", "0.3.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute]
    internal sealed class VersionCommandHandler : global::ArgumentParsing.SpecialCommands.ISpecialCommandHandler
    {
        /// <inheritdoc/>
        public int HandleCommand()
        {
            global::System.Console.WriteLine("ArgPars 1.0.0");
            return 0;
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ArgumentParsing ](/sources/ArgumentParsing.zip)

:::


### Share ArgumentParsing 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing&quote=ArgumentParsing" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing&text=ArgumentParsing:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing&title=ArgumentParsing" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing&title=ArgumentParsing&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArgumentParsing" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ArgumentParsing

aaa
<SameCategory />

