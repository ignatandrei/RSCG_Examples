---
sidebar_position: 1810
title: 181 - Larcanum.GitInfo
description: 
slug: /Larcanum.GitInfo
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Larcanum.GitInfo  by 


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Larcanum.GitInfo?label=Larcanum.GitInfo)](https://www.nuget.org/packages/Larcanum.GitInfo/)
[![GitHub last commit](https://img.shields.io/github/last-commit/lord-executor/Larcanum.GitInfo?label=updated)](https://github.com/lord-executor/Larcanum.GitInfo)
![GitHub Repo stars](https://img.shields.io/github/stars/lord-executor/Larcanum.GitInfo?style=social)

## Details

### Info
:::info

Name: **Larcanum.GitInfo**

Package Description

Author: 

NuGet: 
*https://www.nuget.org/packages/Larcanum.GitInfo/*   


You can find more details at https://github.com/lord-executor/Larcanum.GitInfo

Source : https://github.com/lord-executor/Larcanum.GitInfo

:::

### Original Readme
:::note

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lord-executor/Larcanum.GitInfo/blob/main/LICENSE)
[![Build](https://github.com/lord-executor/Larcanum.GitInfo/actions/workflows/build.yaml/badge.svg)](https://github.com/lord-executor/Larcanum.GitInfo/actions/workflows/build.yaml)
[![Nuget](https://img.shields.io/nuget/v/Larcanum.GitInfo.svg)](https://www.nuget.org/packages/Larcanum.GitInfo)

# Overview

`Larcanum.GitInfo` is a package that you can add to your project to get access to some basic `git` information directly
in your source code through a _generated_ `GitInfo` class and some build integration to configure MSBuild to use the
version information extracted from `git`. The goal of the package is to simplify versioning of library packages and
binaries based on `git` conventions.

Being able to statically access basic `git` version information is also very useful in the context of applications
and web services since this allows that information to be exposed to the end user. This also works during development
which turns out to be rather useful when working with various different versions of web service projects at the same
time.

This package is designed to be as simple as possible while still getting the job done and to that end, it makes some
relatively strong assumptions.

- The code is C#, using language version 10 or above
  - VB support could be added in the future if somebody needs that
- The .NET Framework version being used is reasonable new (.NET 6+ should do it)
- The `git` binary is present in the `PATH`
  - This can be configured manually, but by default it assumes that `git` is in the PATH and there is no attempt at discovering other locations
- The target project is using [Semantic Versioning](https://semver.org/)
- The target project is using `git` tags as the primary source of version information

Usage of the package is very simple too as you can see in the `GitInfo.Out` sample project in the "src" directory. All
that is needed is a package reference and that's it. You have access to the `GitInfo` class.

If you need more features than what `Larcanum.GitInfo` provides, then you have three options

- You can create an issue [here](https://github.com/lord-executor/Larcanum.GitInfo/issues) and if it falls within the scope of the project, then it will likely be added
  - More customization options in the form of configurable variants are good candidates for this 
- You can fork this project and customize from there
  - As stated above, the simplicity of the implementation was a primary design goal which makes it easy for most developers to understand and thus easy to customize
- You can use [devlooped/GitInfo](https://www.devlooped.com/GitInfo/) instead which has very similar functionality but has way more features
  - Also note that said project comes with [SponsorLink](https://github.com/devlooped#sponsorlink) which is not everybody's cup of tea

# How to Use It

Assuming that you already have a project with a `git` repository, all you have to do is add the package with
```shell
dotnet add package Larcanum.GitInfo
```

This will add the source generator and build files as a _development_ dependency, which means that it is isolated to the
project it is added to and does not "leak" to other projects. This is what the package reference in the project file
looks like.
```xml
<PackageReference Include="Larcanum.GitInfo" Version="1.0.0">
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  <PrivateAssets>all</PrivateAssets>
</PackageReference>
```

By default, the `GitInfo` class is added to the project's root namespace which in this example is "DemoProj". We can
output the current version to the console with
```cs
Console.WriteLine($"Version: {DemoProj.GitInfo.Tag}");
```

# What it Looks Like

The generated code looks something like the example below which is actually taken from _this_ repository. The information includes:
- The _dirty_ state of the work tree which is considered dirty if there are any uncommitted changes.
- The branch and commit information of the current `HEAD`.
- The tag description which is assumed to contain a semantic version string.
- A version string that is compatible with the .NET `Version` class and is derived from the tag description.

**NOTE:** If you are looking at the generated source file in your IDE, it _may_ not be 100% up to date since IDEs like
VisualStudio and Rider try to do some "shortcuts" to optimize the build process which means that the `GitInfoFingerprintFile`
target is not always triggered. This should NOT matter, however since any proper `dotnet build` or packing or publishing
will include that target and thus the `GitInfo` class that is actually part of the final assembly will be up to date.

```cs
[assembly: System.Reflection.AssemblyVersion("0.5.0")]
[assembly: System.Reflection.AssemblyFileVersion("0.5.0")]
[assembly: System.Reflection.AssemblyInformationalVersion("v0.5.0")]

namespace Larcanum.GitInfo.UnitTests;

public partial class GitInfo
{
    public const bool IsDirty = true;

    public const string Branch = @"main";

    public const string CommitShortHash = @"a777e94";

    public const string CommitHash = @"a777e94677cbe32c3d2d1c1582ecdbf75ac159f8";

    public const string CommitDate = @"2024-12-23T11:54:14+01:00";

    public const string Tag = @"v0.5.0";

    public const string DotNetVersion = @"0.5.0";
}
```

- If the current `HEAD` is tagged, then the tag _is_ the description and if it contains a semantic version, this will be extracted as the .NET version
  - e.g. `v0.5.0` /  `0.5.0`
- If the current `HEAD` is not tagged, but there is a previous tag in the commit history, then the tag description will include the tag as well as the number of commits since that tag and the short commit hash
  - e.g. `v0.5.0-1-g7af059a` / `0.5.0`
- If there is _no_ tag between the current `HEAD` and the root, then the tag description will just consist of the short commit hash and the .NET version will default to 1.0.0
  - e.g. `e83e39d` / `1.0.0` 

# How it Works

The primary challenge that needed to be solved was to allow _user code_ to actually explicitly **reference** generated
code as in `GitInfo.CommitHash.Should().HaveLength(40);`. Using MSBuild alone something like that is not really possible
with a _reasonable_ amount of effort. Generating code that can be directly referenced by user code is fortunately
exactly what .NET Source Generators are meant for. This is why the primary functionality of this package is taking the
form of an [incremental source generator](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md).

Every incremental source generator needs a _trigger_. Something that it can attach itself to and generate code for that
thing or category of things in an efficient manner. For the `GitInfo` class, there is no obvious anchor point in the
code since the _input_ for the generator is coming from outside the compilation unit and the code that is generated
is (project-)global.

One such trigger can be an [additional file](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md#additional-file-transformation)
that can be used to trigger source generators, but we also don't want users to have to set up a dedicated marker file
in order to use the `GitInfo` generator. This is where the mandatory MSBuild integration comes in. MSBuild allows us to
define such `AdditionalFiles` items without the need for the consumer to do anything, and we can _hide_ those items too.
The additional file that we define is called "GitInfo.fingerprint.txt" and is stored somewhere in the "obj" directory.
Having an actual file, while not strictly necessary for the source generator to work, provides some key benefits like
proper build caching through the modification date of the file. To get that modification date, we run a variant of the
`git describe` command in the `BeforeBuild` stage and if the output of that command, which we refer to as the
fingerprint, changes then we update the contents of our fingerprint file which in turn triggers the source generator
to re-generate the source code. This approach is certainly not perfect since it only detects changes to the git "state"
when the actual `Build` target is executed, but this is probably the best we can do with reasonable effort.

The source generator can be configured with a set of MSBuild properties like `GitInfoNamespace` which have to be made
explicitly visible to the compiler infrastructure by declaring them as items of the form `<CompilerVisibleProperty Include="GitInfoNamespace" />`.
These configuration values are then used by the generator to customize the output to some degree.

## Assembly Version Attributes

Having access to the git version information from within the program itself is very useful, but if the generated
assembly shows a completely different version than what `GitInfo` provides that would be rather confusing. What we
usually want is to keep the assembly version attributes in line with the version information provided by `git`.

To that end, we hook into the existing MSBuild mechanism provided by "Microsoft.NET.GenerateAssemblyInfo.targets"
which generates assembly info from metadata and has various properties to allow for customization. If the MSBuild
property `GitInfoGenerateAssemblyVersion` is set to true, which is the default, this _disables_ the automatic generation
of AssemblyVersion, AssemblyFileVersion and AssemblyInformationalVersion and replaces them by adding these three
attributes directly into the generated file that contains the `GitInfo` class with version values derived from the
git tag description.

The informational version is simply set to the full git tag description as it allows any string value. For the assembly
and file version, the semantic version is translated to a .NET "Major.Minor.Build.Revision" version by
- using the SemVer MAJOR, MINOR, PATCH as Major, Minor and Build respectively
- if the SemVer LABEL is a standard label as generated by `git describe`, the number of commits since the last tag
  is extracted and used as the Revision

In the example of the `Larcanum.GitInfo.UnitTests` assembly, the overall assembly info (as seen with ILSpy) ends up
looking like this:
```cs
[assembly: CompilationRelaxations(8)]
[assembly: RuntimeCompatibility(WrapNonExceptionThrows = true)]
[assembly: Debuggable(/*Could not decode attribute arguments.*/)]
[assembly: TargetFramework(".NETCoreApp,Version=v9.0", FrameworkDisplayName = ".NET 9.0")]
[assembly: AssemblyCompany("Larcanum.GitInfo.UnitTests")]
[assembly: AssemblyConfiguration("Debug")]
[assembly: AssemblyProduct("Larcanum.GitInfo.UnitTests")]
[assembly: AssemblyTitle("Larcanum.GitInfo.UnitTests")]
[assembly: AssemblyMetadata("Microsoft.Testing.Platform.Application", "True")]
// Only the 3 attributes below this line are touched by GitInfo
[assembly: AssemblyFileVersion("0.7.0.1")]
[assembly: AssemblyInformationalVersion("v0.7.0-1-gef72f47")]
[assembly: AssemblyVersion("0.7.0.1")]
```

## Build Property $(Version)

Finally, there is the MSBuild `$(Version)` property that is used in several parts of the build process, including the
parts of the build that creates a NuGet package with `dotnet pack`. When and how exactly that property is used is not
documented very well and neither are the assumptions about its format, but from practical experience the only limitation
seems to be that it cannot have a _prefix_ like "v".

If the `GitInfoUpdateVersionProp` is set to true, which is the default, then the `GitInfoVersion` target which runs
before the `BeforeBuild` target tries to update the version property according to the following rules:
- If the `Version` has already been set to a value _other than_ "1.0.0" by a previous step of the build process, like if the version is specified as a command line argument, then it is left as it is.
- If a call to `git describe` returns something that matches the expected SemVer expression, then `Version` will be set to that string, excluding a "v" prefix if present.

# Configuration

All the configuration happens through MSBuild properties that can be added to the project file

- `<GitInfoGlobalNamespace>true</GitInfoGlobalNamespace>`
  Defaults to `false`. When set to `false`, the generated `GitInfo` class will be added to the namespace defined in `GitInfoNamespace`, but when set to `true` it will be added to the _global_ namespace instead.
- `<GitInfoNamespace>My.Custom.Ns</GitInfoNamespace>`
  Defaults to `$(RootNamespace)`. Defines the namespace declaration for the generated class. If set to the empty string, this has the same effect as setting `GitInfoGlobalNamespace` to true.
- `<GitInfoGitBin>/usr/bin/git</GitInfoGitBin>`
  Defaults to `git`. This is the path to the `git` binary that will be used to gather the `GitInfo` details.
- `<GitInfoUpdateVersionProp>false</GitInfoUpdateVersionProp>`
  Defaults to `true`. This value determines if the GitInfo targets are going to try to set the `$(Version)` property based on the git tag description. When set to `false`, the Version property will be left as is.
- `<GitInfoGenerateAssemblyVersion>false</GitInfoGenerateAssemblyVersion>`
  Defaults to `true`. When enabled, this will include the 3 versioning attributes `AssemblyVersion`, `AssemblyFileVersion` and `AssemblyInformationalVersion` in the generated "GitInfo.g.cs" file and disable the default "GenerateAssembly...Attribute" flags.
- `<GitInfoDebug>true</GitInfoDebug>`
  Defaults to `false`. Enables the generation of a dedicated `GitInfo.Debug` property when set to `true` which contains all the context that the generator class had when generating the `GitInfo` class. Useful for debugging and should of course not be enabled for release builds.

# Use Cases

## Automated NuGet Package Release with GitHub Action

Let us assume that we have a .NET library project called "DemoLib" that we want to publish on NuGet. We want to automate the publication process with GitHub actions and we want to **trigger** the process by simply pushing a tag with the version of the new release.

In this example
- The project uses .NET 9
- The project file for the library is "src/DemoLib/DemoLib.csproj"
- The versioning scheme for the tags uses the "v"-prefix, but that is not mandatory and easy to change.

The workflow definition is stored in the file ".github/workflows/publish.yml" and would look like this.

```yaml
name: NuGet Package Release

on:
    push:
        tags:
            # Trigger this workflow on _tag push_ where the tag name matches the 'v*.*.*' pattern
            # See https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#running-your-workflow-only-when-a-push-of-specific-tags-occurs
            - 'v*.*.*'

jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            # Checkout the repository
            - name: Checkout code
              uses: actions/checkout@v3

            # Setup .NET Core SDK
            - name: Setup .NET Core
              uses: actions/setup-dotnet@v3
              with:
                  dotnet-version: 9.0.x

            # Pack the project with the version that Larcanum.GitInfo extracts from git (this will match the tag)
            - name: Pack the project
              run: dotnet pack --configuration Release --output ./artifacts src/DemoLib/DemoLib.csproj

            # Push the package to NuGet
            - name: Push to NuGet
              env:
                  NUGET_API_KEY: ${{ secrets.NUGET_API_KEY }}
              run: dotnet nuget push ./artifacts/*.nupkg --api-key ${{ secrets.NUGET_API_KEY }} --source https://api.nuget.org/v3/index.json
```

The NuGet authorization is handled with a NuGet access token that is configured as the `NUGET_API_KEY` secret under `https://github.com/[user]/[repository]/settings/secrets/actions`.


:::

### About
:::note




:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Larcanum.GitInfo**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
	<ItemGroup>
	  <PackageReference Include="Larcanum.GitInfo" Version="1.1.0">
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	    <PrivateAssets>all</PrivateAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Larcanum.GitInfo\src\DemoGit\Program.cs" label="Program.cs" >

  This is the use of **Larcanum.GitInfo** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
Console.WriteLine($"Version: {DemoGit.GitInfo.Branch}");
Console.WriteLine($"Version: {DemoGit.GitInfo.CommitDate}");

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Larcanum.GitInfo\src\DemoGit\obj\GX\Larcanum.GitInfo\Larcanum.GitInfo.GitInfoGenerator\GitInfo.g.cs" label="GitInfo.g.cs" >


```csharp showLineNumbers 
// <auto-generated />

// Generator Context
// ProjectDir: D:\gth\RSCG_Examples\v2\rscg_examples\Larcanum.GitInfo\src\DemoGit\DemoGit\
// GitInfoNamespace: DemoGit
// GitInfoGlobalNamespace: False
// GitInfoGitBin: git
// GitInfoVersionRegex: v?(?<VERSION>(?<MAJOR>\d+)\.(?<MINOR>\d+)(?:\.(?<PATCH>\d+))?(?:[-+](?<LABEL>[\dA-Za-z\-\.]+))?)$
// GitInfoGenerateAssemblyVersion: True
// GitInfoDebug: False
// GitPath: C:\Program Files\Git\cmd\git.exe
// GitVersion: git version 2.42.0.windows.2
// GitRoot: D:/gth/RSCG_Examples
// GitFingerprint: vPureDI3-7-g5308331d7
// Timestamp: 2025-01-18T15:18:22.4819389+02:00

[assembly: System.Reflection.AssemblyVersion("1.0.0.0")]
[assembly: System.Reflection.AssemblyFileVersion("1.0.0.0")]
[assembly: System.Reflection.AssemblyInformationalVersion("vPureDI3-7-g5308331d7")]


namespace DemoGit;

/// <summary>Provides access to the git information for the current assembly.</summary>
internal partial class GitInfo
{
    public const bool IsDirty = false;

    public const string Branch = @"Larcanum.GitInfo";

    public const string CommitShortHash = @"5308331d7";

    public const string CommitHash = @"5308331d78c3674c7354749ac82d7b1199277997";

    public const string CommitDate = @"2024-12-24T19:19:30+02:00";

    public const string Tag = @"vPureDI3-7-g5308331d7";

    public const string DotNetVersion = @"1.0.0.0";
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Larcanum.GitInfo ](/sources/Larcanum.GitInfo.zip)

:::


### Share Larcanum.GitInfo 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo&quote=Larcanum.GitInfo" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo&text=Larcanum.GitInfo:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo&title=Larcanum.GitInfo" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo&title=Larcanum.GitInfo&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLarcanum.GitInfo" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Larcanum.GitInfo

### In the same category (EnhancementProject) - 18 other generators


#### [AutoInvoke.Generator](/docs/AutoInvoke.Generator)


#### [AutoSpectre](/docs/AutoSpectre)


#### [BuildInfo](/docs/BuildInfo)


#### [Com](/docs/Com)


#### [CommandLine](/docs/CommandLine)


#### [Credfeto.Version.Information.Generator](/docs/Credfeto.Version.Information.Generator)


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

