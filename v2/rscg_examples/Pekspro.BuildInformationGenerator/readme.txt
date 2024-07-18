# Pekspro.BuildInformationGenerator

![Build status](https://github.com/pekspro/BuildInformationGenerator/actions/workflows/build-and-test.yml/badge.svg)
[![NuGet](https://img.shields.io/nuget/v/Pekspro.BuildInformationGenerator.svg)](https://www.nuget.org/packages/Pekspro.BuildInformationGenerator/)

This project simplifies the process of adding build information to your .NET
projects. It uses a source generator to embed details like build time, commit ID
and branch directly into your code.

By default, the values are faked in debug mode. This can be changed in the
`[BuildInformation]` attribute with the `FakeIfDebug` property.

## Usage

Create a new partial class in your project and add the `[BuildInformation]`
(from the `Pekspro.BuildInformationGenerator` namespace) attribute and define
which information you want. For example:

```csharp
[BuildInformation(AddBuildTime = true, AddGitCommitId = true)]
partial class MyBuildInformation
{

}
```

Constants will automatically be added to this class that you can use like this:

```csharp
Console.WriteLine($"Build time: {MyBuildInformation.BuildTime}");
Console.WriteLine($"Commit id: {MyBuildInformation.Git.CommitId}");
```

## Installation

Add the package to your application with:

```bash
dotnet add package Pekspro.BuildInformationGenerator
```

This adds a `<PackageReference>` to your project. It's recommended that you also
add the attributes `PrivateAssets` and `ExcludeAssets` like below to exclude the
source generator to your final assembly:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
      <PackageReference Include="Pekspro.BuildInformationGenerator" Version="0.2.0" 
        PrivateAssets="all" ExcludeAssets="runtime" />
  </ItemGroup>
</Project>
```

Setting `PrivateAssets="all"` means any projects referencing this one won't get
a reference to the **Pekspro.BuildInformationGenerator** package.

Setting `ExcludeAssets="runtime"` ensures the
**Pekspro.BuildInformationGenerator.Attributes.dll** file is not copied to your
build output (it is not required at runtime).

## Configuration

The `[BuildInformation]` attribute has a number of properties you can set to
control the generated class.

| Property                      | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `AddBuildTime`                | Build time (in UTC).                                |
| `AddLocalBuildTime`           | Local build time.                                   |
| `AddAssemblyVersion`          | Assembly version.                                   |
| `AddOSVersion`                | OS version of the machine where the build happens.  |
| `AddGitCommitId`              | Commit id.                                          |
| `AddGitBranch`                | Branch name.                                        |
| `AddDotNetSdkVersion`         | .NET SDK version.                                   |
| `AddWorkloadMauiVersion`      | Workload for .NET MAUI.                             |
| `AddWorkloadWasmToolsVersion` | Workload for WebAssembly tools.                     |

If everything is set to true, the generated class will look like this:

```csharp
static partial class BuildInfoAll
{

    /// <summary>
    /// Build time: 2024-06-22 09:57:54
    /// Value was taken from the system clock.
    /// </summary>
    public static readonly global::System.DateTime BuildTime = new global::System.DateTime(638546470747876765L, global::System.DateTimeKind.Utc);

    /// <summary>
    /// Local build time: 2024-06-22 11:57:54 (+02:00)
    /// Value was taken from the system clock.
    /// </summary>
    public static readonly global::System.DateTimeOffset LocalBuildTime = new global::System.DateTimeOffset(638546542747876765L, new global::System.TimeSpan(72000000000));

    /// <summary>
    /// Build information related to git.
    /// </summary>
    static public partial class Git
    {

        /// <summary>
        /// The commit id in git at the time of build.
        /// Value was taken from the AssemblyInformationalVersion attribute.
        /// </summary>
        public const string CommitId = "552a8218395c744446b12d2e7a2662ce19ddecbb";

        /// <summary>
        /// The short commit id in git at the time of build.
        /// Value was taken from the AssemblyInformationalVersion attribute.
        /// </summary>
        public const string ShortCommitId = "552a8218";

        /// <summary>
        /// The git branch used at build time.
        /// Value was taken from the git branch command.
        /// </summary>
        public const string Branch = "main";

    }

    /// <summary>
    /// Version of the assembly.
    /// Value was taken from assembly version attribute.
    /// </summary>
    public const string AssemblyVersionString = "0.2.0.0";

    /// <summary>
    /// OS version of the building machine.
    /// Value was taken from Environment.OSVersion.
    /// </summary>
    public const string OSVersion = "Microsoft Windows NT 10.0.22631.0";

    /// <summary>
    /// .NET SDK version used at build time.
    /// Value was taken from the dotnet --version command.
    /// </summary>
    public const string DotNetSdkVersion = "8.0.205";

    /// <summary>
    /// Build information related to .NET Workloads.
    /// </summary>
    static public partial class Workloads
    {

        /// <summary>
        /// MAUI version used at build time.
        /// Value was taken from the dotnet workload list command.
        /// </summary>
        public const string MauiVersion = "8.0.7/8.0.100";

        /// <summary>
        /// wasm-tools version used at build time.
        /// Value was taken from the dotnet workload list command.
        /// </summary>
        public const string WasmToolsVersion = "";

    }

}
```

You can view your generated code by right clicking on your class name and selecting **Go to definition**.

Another option is to add this to your `.csproj` file:

```XML
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
  <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\$(Configuration)\GeneratedFiles</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

You will then find the file in the `obj` directory.

### Performance

You can specify if you want to have faked or real values:

| Property        | Default | Description                           |
| --------------- | ------- | ------------------------------------- |
| `FakeIfDebug`   | true    | Fake values if `DEBUG` is defined.    |
| `FakeIfRelease` | false   | Fake values if `RELEASE` is defined.  |

To get the real values, `BuildInformationGenerator` might need to start a
process. This should be fast, but probably nothing you want during normal
development. In Visual Studio, a source generator can be called very often
(every keystroke), so try to use fake values in development.

| Property                     | Data source                                         |
| ---------------------------- | --------------------------------------------------- |
| `BuildTime`                  | `DateTimeOffset`.                                   |
| `LocalBuildTime`             | `DateTimeOffset`.                                   |
| `AssemblyVersion`            | `AssemblyVersion` attribute.                        |
| `OSVersion`                  | `Environment.OSVersion`.                            |
| `Git.CommitId`               | `AssemblyInformationalVersionAttribute` attribute, by default but also the **process** `git rev-parse HEAD` as a fallback. |
| `Git.Branch`                 | **Process** `git branch --show-current`. The environment variable `BUILD_SOURCEBRANCHNAME` might be used instead, that is automatically set in Azure Devops where git cannot be used to the the branch. |
| `DotNetSdkVersion`           | **Process** `dotnet --version`.                     |
| `Workloads.MauiVersion`      | **Process** `dotnet workload list`.                 |
| `Workloads.WasmToolsVersion` | **Process** `dotnet workload list`                  |

## Requirements

This source generator requires the .NET 7 SDK. You can target earlier frameworks
like .NET Core 3.1 etc, but the **SDK** must be at least 7.0.100.

## Credits

This project is heavily inspired by the
[NetEscapades.EnumGenerators](https://github.com/andrewlock/NetEscapades.EnumGenerators)
project.
