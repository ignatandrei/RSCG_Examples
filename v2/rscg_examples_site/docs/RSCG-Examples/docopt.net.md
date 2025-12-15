---
sidebar_position: 2480
title: 248 - docopt.net
description: Generating command line argument parsers from usage documentation.
slug: /docopt.net
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveCommandLine.mdx';

# docopt.net  by Atif Aziz


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/docopt.net?label=docopt.net)](https://www.nuget.org/packages/docopt.net/)
[![GitHub last commit](https://img.shields.io/github/last-commit/docopt/docopt.net?label=updated)](https://github.com/docopt/docopt.net)
![GitHub Repo stars](https://img.shields.io/github/stars/docopt/docopt.net?style=social)

## Details

### Info
:::info

Name: **docopt.net**

docopt.net is the .net version of the docopt python beautiful command line parser.  docopt.net helps you define an interface for your command-line app, and automatically generate a parser for it. docopt.net is based on conventions that have been used for decades in help messages and man pages for program interface description.  Interface description in docopt.net is such a help message, but formalized. Check out http://docopt.org for a more detailed explanation.
         Quick example:  var arguments = new DocOpt().Apply("Usage: prog [-a] [-b] FILE", args); if (arguments["-a"].IsTrue) \{ ... }
          }

Author: Atif Aziz

NuGet: 
*https://www.nuget.org/packages/docopt.net/*   


You can find more details at https://github.com/docopt/docopt.net

Source: https://github.com/docopt/docopt.net

:::

### Author
:::note
Atif Aziz 
![Alt text](https://github.com/docopt.png)
:::

### Original Readme
:::note

# **docopt.net** is a .NET implementation of [docopt]

**docopt.net** is a parser for command-line arguments. It automatically derives
the parsing logic from the help text of a program containing its command-line
usage in [docopt] format. [docopt] is the formalization of conventions that have
been used for decades in help messages and man pages for describing a program's
interface. Below is an example of such a help text containing the usage for a
hypothetical program called Naval Fate:

    Naval Fate.

    Usage:
      naval_fate.exe ship new <name>...
      naval_fate.exe ship <name> move <x> <y> [--speed=<kn>]
      naval_fate.exe ship shoot <x> <y>
      naval_fate.exe mine (set|remove) <x> <y> [--moored | --drifting]
      naval_fate.exe (-h | --help)
      naval_fate.exe --version

    Options:
      -h --help     Show this screen.
      --version     Show version.
      --speed=<kn>  Speed in knots [default: 10].
      --moored      Moored (anchored) mine.
      --drifting    Drifting mine.

## Usage

The following C# example shows one basic way to use **docopt.net**:

```c#
#nullable enable

using System;
using DocoptNet;

const string usage = @"Naval Fate.

Usage:
  naval_fate.exe ship new <name>...
  naval_fate.exe ship <name> move <x> <y> [--speed=<kn>]
  naval_fate.exe ship shoot <x> <y>
  naval_fate.exe mine (set|remove) <x> <y> [--moored | --drifting]
  naval_fate.exe (-h | --help)
  naval_fate.exe --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --speed=<kn>  Speed in knots [default: 10].
  --moored      Moored (anchored) mine.
  --drifting    Drifting mine.

";

var arguments = new Docopt().Apply(usage, args, version: "Naval Fate 2.0", exit: true)!;
foreach (var (key, value) in arguments)
    Console.WriteLine("{0} = {1}", key, value);
```

See the [documentation] for more examples and uses of the **docopt.net** API.

## Documentation

The documentation can be found online at <https://docopt.github.io/docopt.net/>.

## Installation

Install [the package][nupkg] in a .NET project using:

    dotnet add package docopt.net

## Copyright and License

- &copy; 2012-2014 Vladimir Keleshev <vladimir@keleshev.com>
- &copy; 2013 Dinh Doan Van Bien <dinh@doanvanbien.com>
- &copy; 2021 Atif Aziz
- Portions &copy; .NET Foundation and Contributors
- Portions &copy; West Wind Technologies, 2008

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[docopt]: http://docopt.org/
[nupkg]: https://www.nuget.org/packages/docopt.net
[documentation]: https://docopt.github.io/docopt.net/


:::

### About
:::note

Generating command line argument parsers from usage documentation.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **docopt.net**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="docopt.net" Version="0.8.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\docopt.net\src\ConsoleArgs\Program.cs" label="Program.cs" >

  This is the use of **docopt.net** in *Program.cs*

```csharp showLineNumbers 
//Console.WriteLine(ConsoleArgs.ProgramArguments.Help);
Console.WriteLine(ConsoleArgs.ProgramArguments.Usage);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\docopt.net\src\ConsoleArgs\Program.docopt.txt" label="Program.docopt.txt" >

  This is the use of **docopt.net** in *Program.docopt.txt*

```csharp showLineNumbers 
Array 2 Any

Usage:
  array_2_any.exe translate <text>
  array_2_any.exe translatefile <nameFile>
  array_2_any.exe (-h | --help)
  array_2_any.exe --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --verbose     Show more output.
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\docopt.net\src\ConsoleArgs\obj\GX\DocoptNet\DocoptNet.CodeGeneration.SourceGenerator\ConsoleArgs.ProgramArguments.cs" label="ConsoleArgs.ProgramArguments.cs" >
```csharp showLineNumbers 
#nullable enable annotations

using System.Collections;
using System.Collections.Generic;
using DocoptNet;
using DocoptNet.Internals;
using Leaves = DocoptNet.Internals.ReadOnlyList<DocoptNet.Internals.LeafPattern>;

namespace ConsoleArgs
{
    partial class ProgramArguments : IEnumerable<KeyValuePair<string, object?>>
    {
        public const string Help = @"Array 2 Any

Usage:
  array_2_any.exe translate <text>
  array_2_any.exe translatefile <nameFile>
  array_2_any.exe (-h | --help)
  array_2_any.exe --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --verbose     Show more output.";

        public const string Usage = @"Usage:
  array_2_any.exe translate <text>
  array_2_any.exe translatefile <nameFile>
  array_2_any.exe (-h | --help)
  array_2_any.exe --version";

        static readonly IHelpFeaturingParser<ProgramArguments> Parser = GeneratedSourceModule.CreateParser(Help, Parse).EnableHelp();

        public static IHelpFeaturingParser<ProgramArguments> CreateParser() => Parser;

        static IParser<ProgramArguments>.IResult Parse(IEnumerable<string> args, ParseFlags flags, string? version)
        {
            var options = new List<Option>
            {
                new("-h", "--help", 0, false),
                new(null, "--version", 0, false),
                new(null, "--verbose", 0, false),
            };

            return GeneratedSourceModule.Parse(Help, Usage, args, options, flags, version, Parse);

            static IParser<ProgramArguments>.IResult Parse(Leaves left)
            {
                var required = new RequiredMatcher(1, left, new Leaves());
                Match(ref required);
                if (!required.Result || required.Left.Count > 0)
                {
                    return GeneratedSourceModule.CreateInputErrorResult<ProgramArguments>(string.Empty, Usage);
                }
                var collected = required.Collected;
                var result = new ProgramArguments();

                foreach (var leaf in collected)
                {
                    var value = leaf.Value is \{ IsStringList: true \} ? ((StringList)leaf.Value).Reverse() : leaf.Value;
                    switch (leaf.Name)
                    {
                        case "translate": result.CmdTranslate = (bool)value; break;
                        case "<text>": result.ArgText = (string?)value; break;
                        case "translatefile": result.CmdTranslatefile = (bool)value; break;
                        case "<nameFile>": result.ArgNamefile = (string?)value; break;
                        case "--help": result.OptHelp = (bool)value; break;
                        case "--version": result.OptVersion = (bool)value; break;
                    }
                }

                return GeneratedSourceModule.CreateArgumentsResult(result);
            }

            static void Match(ref RequiredMatcher required)
            {
                // Required(Either(Required(Command(translate, False), Argument(<text>, )), Required(Command(translatefile, False), Argument(<nameFile>, )), Required(Required(Option(-h,--help,0,False))), Required(Option(,--version,0,False))))
                var a = new RequiredMatcher(1, required.Left, required.Collected);
                while (a.Next())
                {
                    // Either(Required(Command(translate, False), Argument(<text>, )), Required(Command(translatefile, False), Argument(<nameFile>, )), Required(Required(Option(-h,--help,0,False))), Required(Option(,--version,0,False)))
                    var b = new EitherMatcher(4, a.Left, a.Collected);
                    while (b.Next())
                    {
                        switch (b.Index)
                        {
                            case 0:
                            {
                                // Required(Command(translate, False), Argument(<text>, ))
                                var c = new RequiredMatcher(2, b.Left, b.Collected);
                                while (c.Next())
                                {
                                    switch (c.Index)
                                    {
                                        case 0:
                                        {
                                            // Command(translate, False)
                                            c.Match(PatternMatcher.MatchCommand, "translate", ArgValueKind.Boolean);
                                        }
                                        break;
                                        case 1:
                                        {
                                            // Argument(<text>, )
                                            c.Match(PatternMatcher.MatchArgument, "<text>", ArgValueKind.None);
                                        }
                                        break;
                                    }
                                    if (!c.LastMatched)
                                    {
                                        break;
                                    }
                                }
                                b.Fold(c.Result);
                            }
                            break;
                            case 1:
                            {
                                // Required(Command(translatefile, False), Argument(<nameFile>, ))
                                var c = new RequiredMatcher(2, b.Left, b.Collected);
                                while (c.Next())
                                {
                                    switch (c.Index)
                                    {
                                        case 0:
                                        {
                                            // Command(translatefile, False)
                                            c.Match(PatternMatcher.MatchCommand, "translatefile", ArgValueKind.Boolean);
                                        }
                                        break;
                                        case 1:
                                        {
                                            // Argument(<nameFile>, )
                                            c.Match(PatternMatcher.MatchArgument, "<nameFile>", ArgValueKind.None);
                                        }
                                        break;
                                    }
                                    if (!c.LastMatched)
                                    {
                                        break;
                                    }
                                }
                                b.Fold(c.Result);
                            }
                            break;
                            case 2:
                            {
                                // Required(Required(Option(-h,--help,0,False)))
                                var c = new RequiredMatcher(1, b.Left, b.Collected);
                                while (c.Next())
                                {
                                    // Required(Option(-h,--help,0,False))
                                    var d = new RequiredMatcher(1, c.Left, c.Collected);
                                    while (d.Next())
                                    {
                                        // Option(-h,--help,0,False)
                                        d.Match(PatternMatcher.MatchOption, "--help", ArgValueKind.Boolean);
                                        if (!d.LastMatched)
                                        {
                                            break;
                                        }
                                    }
                                    c.Fold(d.Result);
                                    if (!c.LastMatched)
                                    {
                                        break;
                                    }
                                }
                                b.Fold(c.Result);
                            }
                            break;
                            case 3:
                            {
                                // Required(Option(,--version,0,False))
                                var c = new RequiredMatcher(1, b.Left, b.Collected);
                                while (c.Next())
                                {
                                    // Option(,--version,0,False)
                                    c.Match(PatternMatcher.MatchOption, "--version", ArgValueKind.Boolean);
                                    if (!c.LastMatched)
                                    {
                                        break;
                                    }
                                }
                                b.Fold(c.Result);
                            }
                            break;
                        }
                        if (!b.LastMatched)
                        {
                            break;
                        }
                    }
                    a.Fold(b.Result);
                    if (!a.LastMatched)
                    {
                        break;
                    }
                }
                required.Fold(a.Result);
            }
        }

        IEnumerator<KeyValuePair<string, object?>> GetEnumerator()
        {
            yield return KeyValuePair.Create("translate", (object?)CmdTranslate);
            yield return KeyValuePair.Create("<text>", (object?)ArgText);
            yield return KeyValuePair.Create("translatefile", (object?)CmdTranslatefile);
            yield return KeyValuePair.Create("<nameFile>", (object?)ArgNamefile);
            yield return KeyValuePair.Create("--help", (object?)OptHelp);
            yield return KeyValuePair.Create("--version", (object?)OptVersion);
        }

        IEnumerator<KeyValuePair<string, object?>> IEnumerable<KeyValuePair<string, object?>>.GetEnumerator() => GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        /// <summary><c>Command(translate, False)</c></summary>
        public bool CmdTranslate \{ get; private set; }

        /// <summary><c>Argument(&lt;text&gt;, )</c></summary>
        public string? ArgText \{ get; private set; }

        /// <summary><c>Command(translatefile, False)</c></summary>
        public bool CmdTranslatefile \{ get; private set; }

        /// <summary><c>Argument(&lt;nameFile&gt;, )</c></summary>
        public string? ArgNamefile \{ get; private set; }

        /// <summary><c>Option(-h,--help,0,False)</c></summary>
        public bool OptHelp \{ get; private set; }

        /// <summary><c>Option(,--version,0,False)</c></summary>
        public bool OptVersion \{ get; private set; }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project docopt.net ](/sources/docopt.net.zip)

:::


### Share docopt.net 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net&quote=docopt.net" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net&text=docopt.net:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net&title=docopt.net" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net&title=docopt.net&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdocopt.net" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/docopt.net

<SameCategory />

