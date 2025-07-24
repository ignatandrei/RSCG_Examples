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
