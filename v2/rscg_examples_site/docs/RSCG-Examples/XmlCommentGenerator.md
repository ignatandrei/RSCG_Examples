---
sidebar_position: 2400
title: 240 - XmlCommentGenerator
description: Adding Xml comments to generated OpenAPI documentation
slug: /XmlCommentGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAPI.mdx';

# XmlCommentGenerator  by Microsoft


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Microsoft.AspNetCore.OpenApi?label=Microsoft.AspNetCore.OpenApi)](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/dotnet?label=updated)](https://github.com/dotnet/dotnet/)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/dotnet?style=social)

## Details

### Info
:::info

Name: **XmlCommentGenerator**

Provides APIs for annotating route handler endpoints in ASP.NET Core with OpenAPI annotations.

This package was built from the source code at https://github.com/dotnet/aspnetcore/tree/e77cb01b5529c137130757859f09f892dbdd2436

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi/*   


You can find more details at https://dotnet.microsoft.com/en-us/apps/aspnet

Source: https://github.com/dotnet/dotnet/

:::

### Author
:::note
Microsoft 
![Alt text](https://github.com/dotnet.png)
:::

### Original Readme
:::note

# dotnet/dotnet - Home of the .NET VMR

This repository is a **Virtual Monolithic Repository (VMR)** which includes all the source code and infrastructure needed to build the .NET SDK.

What this means:

- **Monolithic** - a join of multiple repositories that make up the whole product, such as [dotnet/runtime](https://github.com/dotnet/runtime) or [dotnet/sdk](https://github.com/dotnet/sdk).
- **Virtual** - a mirror (not replacement) of product repos where sources from those repositories are synchronized with.

In the VMR, you can find:

- source files of each product repository which are mirrored inside of their respective directories under [`src/`](https://github.com/dotnet/dotnet/tree/main/src),
- tooling that enables [building the whole .NET product from source](https://github.com/dotnet/source-build) on Linux platforms,
- *[in future]* E2E tests for the whole .NET product.

Just like the development repositories, the VMR will have a release branch for every feature band (e.g. `release/10.0.1xx`).
Similarly, VMR's `main` branch will follow default branches of product repositories (see [Synchronization Based on Declared Dependencies](https://github.com/dotnet/dotnet//docs/VMR-Design-And-Operation.md#synchronization-based-on-declared-dependencies)).

More in-depth documentation about the VMR can be found in [VMR Design And Operation](https://github.com/dotnet/dotnet//docs/VMR-Design-And-Operation.md#layout).
See also [dotnet/source-build](https://github.com/dotnet/source-build) for more information about our whole-product source-build.

## Installing the SDK

You can download the .NET SDK either as an installer (MSI, PKG) or as an archive (zip, tar.gz). The .NET SDK contains both the .NET runtimes and CLI tools.

- [**Latest builds table**](https://github.com/dotnet/dotnet//docs/builds-table.md)

## Goals

- The main purpose of the [dotnet/dotnet](https://github.com/dotnet/dotnet) repository is to have all source code necessary to build the .NET product available in one repository and identified by a single commit.
- The VMR also aims to become the place from which we release and service future versions of .NET to reduce the complexity of the product construction process. This should allow our partners and and 3rd parties to easily build, test and modify .NET using their custom infrastructure as well as make the process available to the community.
- Lastly, we hope to solve other problems that the current multi-repo setup brings:
  - Enable the standard [down-/up-stream open-source model](https://github.com/dotnet/dotnet//docs/VMR-Upstream-Downstream.md).
  - Fulfill requirements of .NET distro builders such as RedHat or Canonical to natively include .NET in their distribution repositories.
  - Simplify scenarios such as client-run testing of bug fixes and improvements. The build should work in an offline environment too for certain platforms.
  - Enable developers to make and test changes spanning multiple repositories.
  - More efficient pipeline for security fixes during the CVE pre-disclosure process.

We will achieve these goals while keeping active coding work in the separate repos where it happens today. For example: ASP.NET features will continue to be developed in `dotnet/aspnetcore` and CLR features will be continue to be developed in `dotnet/runtime`. Each of these repos have their own distinct communities and processes, and aggregating development into a true mono-repo would work against that. Hence, the "virtual" monolithic repo: the VMR gives us the simplicity of a mono-repo for building and servicing the product, while active development of components of that product stays in its various existing repos. The day to day experience for typical contributors will not change.

## Supported platforms

- 8.0 and 9.0
  - source-build configuration on Linux
- 10.0+ (WIP)
  - source-build configuration on Linux
  - non-source-build configuration on Linux, Mac, and Windows

For the latest information about Source-Build support for new .NET versions, please check our [GitHub Discussions page](https://github.com/dotnet/source-build/discussions) for announcements.

## Code flow

The VMR's code flow operates in two directions. Individual repositories flow source changes into the VMR upon promotion of their local official builds (forward flow). The VMR changes are checked in, an official build happens, and then source changes + packages flows backward into the constituent repositories (back flow). For more details on code flow and code flow pull requests, please see this information on [Code Flow PRs](https://github.com/dotnet/dotnet//docs/Codeflow-PRs.md).

## Contribution

Contribution to the .NET product should currently be done mostly in the constituent repositories. The reasons for this are two-fold:
- We want to slowly ramp up direct VMR changes to avoid surprises.
- The individual repositories still have the best validation for most changes.

If you would like to make a cross-cutting change in the VMR, please ask the Unified Build team (please tag @dotnet/product-construction in an issue/discussion in your repository). However, some changes **should** be made directly in the VMR. For a breakdown of where changes should be made, please see below.

#### Where to make changes:

- `src/*` - Constituent repositories, except VMR pipeline changes.
- Non `src/*` directories - Directly in VMR
- Arcade `eng/common` changes - There are many copies of eng/common in the VMR:
  - The VMR uses its root eng/common/* to bootstrap the VMR build. These should not be updated manually. They should only be updated via a re-bootrap of the VMR.
  - A VMR build uses `src/arcade/eng/common/*` for arcade and any repository that builds after arcade. Changes may be made to these files, and they will flow back into arcade as well as to any repository that gets its arcade flow from the VMR. However, due to varying scenarios in which `eng/common/` can be used, it is generally recommended that the VMR only be used to test `eng/common` changes, while actual changes should still be made in the dotnet/arcade repository.
- VMR pipeline changes - The root pipeline logic lives in eng/* and should be changed in the VMR.

For any questions, please ask the Unified Build team.

## Dev instructions

Please note that **this repository is a work-in-progress** and there are some usability issues connected to this.
These can be nuisances such as some checked-in files getting modified by the build itself and similar.
For the latest information about Source-Build support, please watch for announcements posted on our [GitHub Discussions page](https://github.com/dotnet/source-build/discussions).

### Prerequisites

The dependencies for building can be found [here](https://github.com/dotnet/runtime/blob/main/docs/workflow/requirements/).
In case you don't want to / cannot prepare your environment per the requirements, consider [using Docker](#building-using-docker).

For building the VMR with Source-Build, the following additional dependencies are required for your Linux environment:
* `brotli-dev`

For building the VMR on Windows, it is recommended to put the repo under a short path, i.e. `C:\dotnet`. Also, [long path support must be enabled](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=registry#enable-long-paths-in-windows-10-version-1607-and-later). This is necessary as some of the tools used don't support long paths (WiX Toolset v3 and cl.exe).

For some `git` commands and when synchronizing changes via the `darc` CLI, long path support should be enabled in the `git` config as well:
```bash
git config --system core.longpaths true # needs elevated prompt
git config --global core.longpaths true
```

### Building

1. **Clone the repository**

   ```bash
   git clone https://github.com/dotnet/dotnet dotnet-dotnet
   cd dotnet-dotnet
   ```

1. **Build the .NET SDK**

    Choose one of the following build modes:

    - **Microsoft based build**

        For Unix:

        ```bash
        ./build.sh --clean-while-building
        ```

        For Windows:

        ```cmd
        .\build.cmd -cleanWhileBuilding
        ```

    - **Building from source**

        ```bash
        # Prep the source to build on your distro.
        # This downloads a .NET SDK and a number of .NET packages needed to build .NET from source.
        ./prep-source-build.sh

        # Build the .NET SDK
        ./build.sh -sb --clean-while-building

        # When building RTM and servicing, pass the `--branding` switch to generate stable branding
        ./build.sh --sb --branding rtm
        ```

    The resulting SDK is placed at `artifacts/assets/Release/dotnet-sdk-9.0.100-[your-RID].tar.gz` (for Unix) or `artifacts/assets/Release/dotnet-sdk-9.0.100-[your-RID].zip` (for Windows).

1. *(Optional)* **Unpack and install the .NET SDK**

    For Unix:

    ```bash
    mkdir -p $HOME/dotnet
    tar zxf artifacts/assets/Release/dotnet-sdk-10.0.100-[your-RID].tar.gz -C $HOME/dotnet
    ln -s $HOME/dotnet/dotnet /usr/bin/dotnet
    ```

    For Windows:

    ```cmd
    mkdir %userprofile%\dotnet
    tar -xf artifacts/assets/Release/dotnet-sdk-10.0.100-[your RID].zip -C %userprofile%\dotnet
    set "PATH=%userprofile%\dotnet;%PATH%"
    ```

    To test your built SDK, run the following:

    ```bash
    dotnet --info
    ```

> [!NOTE]
> Run `./build.sh --help` (for Unix) or `.\build.cmd -help` (for Windows) to see more information about supported build options.

### Building using Docker

You can also build the repository using a Docker image which has the required prerequisites inside.
The example below creates a Docker volume named `vmr` and clones and builds the VMR there.

```sh
docker run --rm -it -v vmr:/vmr -w /vmr mcr.microsoft.com/dotnet-buildtools/prereqs:centos-stream-10-amd64
git clone https://github.com/dotnet/dotnet .

# - Microsoft based build
./build.sh --clean-while-building

# - Building from source
./prep-source-build.sh && ./build.sh -sb --clean-while-building

mkdir -p $HOME/.dotnet
tar -zxf artifacts/assets/Release/dotnet-sdk-9.0.100-centos.9-x64.tar.gz -C $HOME/.dotnet
ln -s $HOME/.dotnet/dotnet /usr/bin/dotnet
```

### Codespaces

You can also utilize [GitHub Codespaces](https://github.com/features/codespaces) where you can find preset containers in this repository.

### Building from released sources

You can also build from sources (and not from a context of a git repository), such as the ones you can acquire from a [dotnet/dotnet release](https://github.com/dotnet/dotnet/releases).
In this case, you need to provide additional information which includes the original repository and commit hash the code was built from so that the SDK can provide a better debugging experience (think the `Step into..` functionality).
Usually, this means the [dotnet/dotnet repository](https://github.com/dotnet/dotnet) together with the commit the release tag is connected to.

In practice, this means that when calling the main build script, you need to provide additional arguments when building outside of a context of a git repository.  
Alternatively, you can also provide a manifest file where this information can be read from. This file (`release.json`) can be found attached with the [dotnet/dotnet release](https://github.com/dotnet/dotnet/releases).

### Synchronizing code into the VMR

Sometimes you want to make a change in a repository and test that change in the VMR. You could of course make the change in the VMR directly, but in case it's already available in your repository, you can synchronize it locally into your clone of the VMR, commit, and then open a PR.

To do this, you need to use the [`darc vmr forwardflow` command](https://github.com/dotnet/arcade-services/blob/main/docs/Darc.md#forwardflow) which can move your changes from your repository's dev branch into a local VMR one. Please refer to command's documentation (`--help`) for more details.

## Filing Issues

This repo should contain issues that are tied to the VMR infrastructure and documentation.

For other issues, please open them in the appropriate product repos. We have links to many of them on [our new issue page](https://github.com/dotnet/dotnet/issues/new/choose).

## Useful Links

- Design documentation for the VMR - a set of documents describing the high-level design and the why's and how's
  - [Design and Operation](https://github.com/dotnet/dotnet//docs/VMR-Design-And-Operation.md)
  - [Upstream/Downstream Relationships](https://github.com/dotnet/dotnet//docs/VMR-Upstream-Downstream.md)
  - [Code and Build Workflow](https://github.com/dotnet/dotnet//docs/VMR-Code-And-Build-Workflow.md)
  - [Strategy for Managing External Source Dependencies](https://github.com/dotnet/dotnet//docs/VMR-Strategy-For-External-Source.md)
- [.NET Source-Build](https://github.com/dotnet/source-build)
- [What is .NET](https://dotnet.microsoft.com)

## .NET Foundation

.NET Runtime is a [.NET Foundation](https://www.dotnetfoundation.org/projects) project.

## License

.NET is licensed under the [MIT](https://github.com/dotnet/dotnet//LICENSE.TXT) license.


:::

### About
:::note

Adding Xml comments to generated OpenAPI documentation


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **XmlCommentGenerator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
    <PublishAot>true</PublishAot>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\XmlCommentGenerator\src\TestProgram\Program.cs" label="Program.cs" >

  This is the use of **XmlCommentGenerator** in *Program.cs*

```csharp showLineNumbers 
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

Todo[] sampleTodos =
[
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
];

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos)
        .WithName("GetTodos");

todosApi.MapGet("/{id}", Results<Ok<Todo>, NotFound> (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is \{ \} todo
        ? TypedResults.Ok(todo)
        : TypedResults.NotFound())
    .WithName("GetTodoById");

app.Run();

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\XmlCommentGenerator\src\TestProgram\obj\GX\Microsoft.AspNetCore.OpenApi.SourceGenerators\Microsoft.AspNetCore.OpenApi.SourceGenerators.XmlCommentGenerator\OpenApiXmlCommentSupport.generated.cs" label="OpenApiXmlCommentSupport.generated.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#nullable enable
// Suppress warnings about obsolete types and members
// in generated code
#pragma warning disable CS0612, CS0618

namespace System.Runtime.CompilerServices
{
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    file sealed class InterceptsLocationAttribute : System.Attribute
    {
        public InterceptsLocationAttribute(int version, string data)
        {
        }
    }
}

namespace Microsoft.AspNetCore.OpenApi.Generated
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using System.Text.Json;
    using System.Text.Json.Nodes;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.OpenApi;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.OpenApi;

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file record XmlComment(
        string? Summary,
        string? Description,
        string? Remarks,
        string? Returns,
        string? Value,
        bool Deprecated,
        List<string>? Examples,
        List<XmlParameterComment>? Parameters,
        List<XmlResponseComment>? Responses);

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file record XmlParameterComment(string? Name, string? Description, string? Example, bool Deprecated);

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file record XmlResponseComment(string Code, string? Description, string? Example);

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file static class XmlCommentCache
    {
        private static Dictionary<string, XmlComment>? _cache;
        public static Dictionary<string, XmlComment> Cache => _cache ??= GenerateCacheEntries();

        private static Dictionary<string, XmlComment> GenerateCacheEntries()
        {
            var cache = new Dictionary<string, XmlComment>();


            return cache;
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file static class DocumentationCommentIdHelper
    {
        /// <summary>
        /// Generates a documentation comment ID for a type.
        /// Example: T:Namespace.Outer+Inner`1 becomes T:Namespace.Outer.Inner`1
        /// </summary>
        public static string CreateDocumentationId(this Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return "T:" + GetTypeDocId(type, includeGenericArguments: false, omitGenericArity: false);
        }

        /// <summary>
        /// Generates a documentation comment ID for a property.
        /// Example: P:Namespace.ContainingType.PropertyName or for an indexer P:Namespace.ContainingType.Item(System.Int32)
        /// </summary>
        public static string CreateDocumentationId(this PropertyInfo property)
        {
            if (property == null)
            {
                throw new ArgumentNullException(nameof(property));
            }

            var sb = new StringBuilder();
            sb.Append("P:");

            if (property.DeclaringType != null)
            {
                sb.Append(GetTypeDocId(property.DeclaringType, includeGenericArguments: false, omitGenericArity: false));
            }

            sb.Append('.');
            sb.Append(property.Name);

            // For indexers, include the parameter list.
            var indexParams = property.GetIndexParameters();
            if (indexParams.Length > 0)
            {
                sb.Append('(');
                for (int i = 0; i < indexParams.Length; i++)
                {
                    if (i > 0)
                    {
                        sb.Append(',');
                    }

                    sb.Append(GetTypeDocId(indexParams[i].ParameterType, includeGenericArguments: true, omitGenericArity: false));
                }
                sb.Append(')');
            }

            return sb.ToString();
        }

        /// <summary>
        /// Generates a documentation comment ID for a property given its container type and property name.
        /// Example: P:Namespace.ContainingType.PropertyName
        /// </summary>
        public static string CreateDocumentationId(Type containerType, string propertyName)
        {
            if (containerType == null)
            {
                throw new ArgumentNullException(nameof(containerType));
            }
            if (string.IsNullOrEmpty(propertyName))
            {
                throw new ArgumentException("Property name cannot be null or empty.", nameof(propertyName));
            }

            var sb = new StringBuilder();
            sb.Append("P:");
            sb.Append(GetTypeDocId(containerType, includeGenericArguments: false, omitGenericArity: false));
            sb.Append('.');
            sb.Append(propertyName);

            return sb.ToString();
        }

        /// <summary>
        /// Generates a documentation comment ID for a method (or constructor).
        /// For example:
        ///   M:Namespace.ContainingType.MethodName(ParamType1,ParamType2)~ReturnType
        ///   M:Namespace.ContainingType.#ctor(ParamType)
        /// </summary>
        public static string CreateDocumentationId(this MethodInfo method)
        {
            if (method == null)
            {
                throw new ArgumentNullException(nameof(method));
            }

            var sb = new StringBuilder();
            sb.Append("M:");

            // Append the fully qualified name of the declaring type.
            if (method.DeclaringType != null)
            {
                sb.Append(GetTypeDocId(method.DeclaringType, includeGenericArguments: false, omitGenericArity: false));
            }

            sb.Append('.');

            // Append the method name, handling constructors specially.
            if (method.IsConstructor)
            {
                sb.Append(method.IsStatic ? "#cctor" : "#ctor");
            }
            else
            {
                sb.Append(method.Name);
                if (method.IsGenericMethod)
                {
                    sb.Append("``");
                    sb.AppendFormat(CultureInfo.InvariantCulture, "{0}", method.GetGenericArguments().Length);
                }
            }

            // Append the parameter list, if any.
            var parameters = method.GetParameters();
            if (parameters.Length > 0)
            {
                sb.Append('(');
                for (int i = 0; i < parameters.Length; i++)
                {
                    if (i > 0)
                    {
                        sb.Append(',');
                    }

                    // Omit the generic arity for the parameter type.
                    sb.Append(GetTypeDocId(parameters[i].ParameterType, includeGenericArguments: true, omitGenericArity: true));
                }
                sb.Append(')');
            }

            // Append the return type after a '~' (if the method returns a value).
            if (method.ReturnType != typeof(void))
            {
                sb.Append('~');
                // Omit the generic arity for the return type.
                sb.Append(GetTypeDocId(method.ReturnType, includeGenericArguments: true, omitGenericArity: true));
            }

            return sb.ToString();
        }

        /// <summary>
        /// Generates a documentation ID string for a type.
        /// This method handles nested types (replacing '+' with '.'),
        /// generic types, arrays, pointers, by-ref types, and generic parameters.
        /// The <paramref name="includeGenericArguments"/> flag controls whether
        /// constructed generic type arguments are emitted, while <paramref name="omitGenericArity"/>
        /// controls whether the generic arity marker (e.g. "`1") is appended.
        /// </summary>
        private static string GetTypeDocId(Type type, bool includeGenericArguments, bool omitGenericArity)
        {
            if (type.IsGenericParameter)
            {
                // Use `` for method-level generic parameters and ` for type-level.
                if (type.DeclaringMethod != null)
                {
                    return "``" + type.GenericParameterPosition;
                }
                else if (type.DeclaringType != null)
                {
                    return "`" + type.GenericParameterPosition;
                }
                else
                {
                    return type.Name;
                }
            }

            if (type.IsGenericType)
            {
                Type genericDef = type.GetGenericTypeDefinition();
                string fullName = genericDef.FullName ?? genericDef.Name;

                var sb = new StringBuilder(fullName.Length);

                // Replace '+' with '.' for nested types
                for (var i = 0; i < fullName.Length; i++)
                {
                    char c = fullName[i];
                    if (c == '+')
                    {
                        sb.Append('.');
                    }
                    else if (c == '`')
                    {
                        break;
                    }
                    else
                    {
                        sb.Append(c);
                    }
                }

                if (!omitGenericArity)
                {
                    int arity = genericDef.GetGenericArguments().Length;
                    sb.Append('`');
                    sb.AppendFormat(CultureInfo.InvariantCulture, "{0}", arity);
                }

                if (includeGenericArguments && !type.IsGenericTypeDefinition)
                {
                    var typeArgs = type.GetGenericArguments();
                    sb.Append('{');

                    for (int i = 0; i < typeArgs.Length; i++)
                    {
                        if (i > 0)
                        {
                            sb.Append(',');
                        }

                        sb.Append(GetTypeDocId(typeArgs[i], includeGenericArguments, omitGenericArity));
                    }

                    sb.Append('}');
                }

                return sb.ToString();
            }

            // For non-generic types, use FullName (if available) and replace nested type separators.
            return (type.FullName ?? type.Name).Replace('+', '.');
        }

        /// <summary>
        /// Normalizes a documentation comment ID to match the compiler-style format.
        /// Strips the return type suffix for ordinary methods but retains it for conversion operators.
        /// </summary>
        /// <param name="docId">The documentation comment ID to normalize.</param>
        /// <returns>The normalized documentation comment ID.</returns>
        public static string NormalizeDocId(string docId)
        {
            // Find the tilde character that indicates the return type suffix
            var tildeIndex = docId.IndexOf('~');
            if (tildeIndex == -1)
            {
                // No return type suffix, return as-is
                return docId;
            }

            // Check if this is a conversion operator (op_Implicit or op_Explicit)
            // For these operators, we need to keep the return type suffix
            if (docId.Contains("op_Implicit") || docId.Contains("op_Explicit"))
            {
                return docId;
            }

            // For ordinary methods, strip the return type suffix
            return docId.Substring(0, tildeIndex);
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file class XmlCommentOperationTransformer : IOpenApiOperationTransformer
    {
        public Task TransformAsync(OpenApiOperation operation, OpenApiOperationTransformerContext context, CancellationToken cancellationToken)
        {
            var methodInfo = context.Description.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor
                ? controllerActionDescriptor.MethodInfo
                : context.Description.ActionDescriptor.EndpointMetadata.OfType<MethodInfo>().SingleOrDefault();

            if (methodInfo is null)
            {
                return Task.CompletedTask;
            }
            if (XmlCommentCache.Cache.TryGetValue(DocumentationCommentIdHelper.NormalizeDocId(methodInfo.CreateDocumentationId()), out var methodComment))
            {
                if (methodComment.Summary is \{ \} summary)
                {
                    operation.Summary = summary;
                }
                if (methodComment.Description is \{ \} description)
                {
                    operation.Description = description;
                }
                if (methodComment.Remarks is \{ \} remarks)
                {
                    operation.Description = remarks;
                }
                if (methodComment.Parameters is \{ Count: > 0})
                {
                    foreach (var parameterComment in methodComment.Parameters)
                    {
                        var parameterInfo = methodInfo.GetParameters().SingleOrDefault(info => info.Name == parameterComment.Name);
                        var operationParameter = operation.Parameters?.SingleOrDefault(parameter => parameter.Name == parameterComment.Name);
                        if (operationParameter is not null)
                        {
                            var targetOperationParameter = UnwrapOpenApiParameter(operationParameter);
                            targetOperationParameter.Description = parameterComment.Description;
                            if (parameterComment.Example is \{ \} jsonString)
                            {
                                targetOperationParameter.Example = jsonString.Parse();
                            }
                            targetOperationParameter.Deprecated = parameterComment.Deprecated;
                        }
                        else
                        {
                            var requestBody = operation.RequestBody;
                            if (requestBody is not null)
                            {
                                requestBody.Description = parameterComment.Description;
                                if (parameterComment.Example is \{ \} jsonString)
                                {
                                    var content = requestBody?.Content?.Values;
                                    if (content is null)
                                    {
                                        continue;
                                    }
                                    foreach (var mediaType in content)
                                    {
                                        mediaType.Example = jsonString.Parse();
                                    }
                                }
                            }
                        }
                    }
                }
                // Applies `<returns>` on XML comments for operation with single response value.
                if (methodComment.Returns is \{ \} returns && operation.Responses is \{ Count: 1 })
                {
                    var response = operation.Responses.First();
                    response.Value.Description = returns;
                }
                // Applies `<response>` on XML comments for operation with multiple response values.
                if (methodComment.Responses is \{ Count: > 0} && operation.Responses is \{ Count: > 0 })
                {
                    foreach (var response in operation.Responses)
                    {
                        var responseComment = methodComment.Responses.SingleOrDefault(xmlResponse => xmlResponse.Code == response.Key);
                        if (responseComment is not null)
                        {
                            response.Value.Description = responseComment.Description;
                        }
                    }
                }
            }
            foreach (var parameterDescription in context.Description.ParameterDescriptions)
            {
                var metadata = parameterDescription.ModelMetadata;
                if (metadata.MetadataKind == ModelMetadataKind.Property
                    && metadata.ContainerType is \{ \} containerType
                    && metadata.PropertyName is \{ \} propertyName)
                {
                    var propertyDocId = DocumentationCommentIdHelper.CreateDocumentationId(containerType, propertyName);
                    if (XmlCommentCache.Cache.TryGetValue(DocumentationCommentIdHelper.NormalizeDocId(propertyDocId), out var propertyComment))
                    {
                        var parameter = operation.Parameters?.SingleOrDefault(p => p.Name == metadata.Name);
                        var description = propertyComment.Summary;
                        if (!string.IsNullOrEmpty(description) && !string.IsNullOrEmpty(propertyComment.Value))
                        {
                            description = $"{description}\n{propertyComment.Value}";
                        }
                        else if (string.IsNullOrEmpty(description))
                        {
                            description = propertyComment.Value;
                        }
                        if (parameter is null)
                        {
                            if (operation.RequestBody is not null)
                            {
                                operation.RequestBody.Description = description;
                                if (propertyComment.Examples?.FirstOrDefault() is \{ \} jsonString)
                                {
                                    var content = operation.RequestBody.Content?.Values;
                                    if (content is null)
                                    {
                                        continue;
                                    }
                                    var parsedExample = jsonString.Parse();
                                    foreach (var mediaType in content)
                                    {
                                        mediaType.Example = parsedExample;
                                    }
                                }
                            }
                            continue;
                        }
                        var targetOperationParameter = UnwrapOpenApiParameter(parameter);
                        if (targetOperationParameter is not null)
                        {
                            targetOperationParameter.Description = description;
                            if (propertyComment.Examples?.FirstOrDefault() is \{ \} jsonString)
                            {
                                targetOperationParameter.Example = jsonString.Parse();
                            }
                        }
                    }
                }
            }

            return Task.CompletedTask;
        }

        private static OpenApiParameter UnwrapOpenApiParameter(IOpenApiParameter sourceParameter)
        {
            if (sourceParameter is OpenApiParameterReference parameterReference)
            {
                if (parameterReference.Target is OpenApiParameter target)
                {
                    return target;
                }
                else
                {
                    throw new InvalidOperationException($"The input schema must be an {nameof(OpenApiParameter)} or {nameof(OpenApiParameterReference)}.");
                }
            }
            else if (sourceParameter is OpenApiParameter directParameter)
            {
                return directParameter;
            }
            else
            {
                throw new InvalidOperationException($"The input schema must be an {nameof(OpenApiParameter)} or {nameof(OpenApiParameterReference)}.");
            }
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file class XmlCommentSchemaTransformer : IOpenApiSchemaTransformer
    {
        public Task TransformAsync(OpenApiSchema schema, OpenApiSchemaTransformerContext context, CancellationToken cancellationToken)
        {
            // Apply comments from the type
            if (XmlCommentCache.Cache.TryGetValue(DocumentationCommentIdHelper.NormalizeDocId(context.JsonTypeInfo.Type.CreateDocumentationId()), out var typeComment))
            {
                schema.Description = typeComment.Summary;
                if (typeComment.Examples?.FirstOrDefault() is \{ \} jsonString)
                {
                    schema.Example = jsonString.Parse();
                }
            }

            if (context.JsonPropertyInfo is \{ AttributeProvider: PropertyInfo propertyInfo })
            {
                // Apply comments from the property
                if (XmlCommentCache.Cache.TryGetValue(DocumentationCommentIdHelper.NormalizeDocId(propertyInfo.CreateDocumentationId()), out var propertyComment))
                {
                    var description = propertyComment.Summary;
                    if (!string.IsNullOrEmpty(description) && !string.IsNullOrEmpty(propertyComment.Value))
                    {
                        description = $"{description}\n{propertyComment.Value}";
                    }
                    else if (string.IsNullOrEmpty(description))
                    {
                        description = propertyComment.Value;
                    }
                    if (schema.Metadata is null
                        || !schema.Metadata.TryGetValue("x-schema-id", out var schemaId)
                        || string.IsNullOrEmpty(schemaId as string))
                    {
                        // Inlined schema
                        schema.Description = description;
                        if (propertyComment.Examples?.FirstOrDefault() is \{ \} jsonString)
                        {
                            schema.Example = jsonString.Parse();
                        }
                    }
                    else
                    {
                        // Schema Reference
                        if (!string.IsNullOrEmpty(description))
                        {
                            schema.Metadata["x-ref-description"] = description;
                        }
                        if (propertyComment.Examples?.FirstOrDefault() is \{ \} jsonString)
                        {
                            schema.Metadata["x-ref-example"] = jsonString.Parse()!;
                        }
                    }
                }
            }
            return Task.CompletedTask;
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file static class JsonNodeExtensions
    {
        public static JsonNode? Parse(this string? json)
        {
            if (json is null)
            {
                return null;
            }

            try
            {
                return JsonNode.Parse(json);
            }
            catch (JsonException)
            {
                try
                {
                    // If parsing fails, try wrapping in quotes to make it a valid JSON string
                    return JsonNode.Parse($"\"{json.Replace("\"", "\\\"")}\"");
                }
                catch (JsonException)
                {
                    return null;
                }
            }
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.OpenApi.SourceGenerators, Version=10.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "10.0.0.0")]
    file static class GeneratedServiceCollectionExtensions
    {
        [global::System.Runtime.CompilerServices.InterceptsLocationAttribute(1, "zWiVZ/5bs1be9O0AioU4Qo0BAABQcm9ncmFtLmNz")]
        public static IServiceCollection AddOpenApi(this IServiceCollection services)
        {
            return services.AddOpenApi("v1", options =>
            {
                options.AddSchemaTransformer(new XmlCommentSchemaTransformer());
                options.AddOperationTransformer(new XmlCommentOperationTransformer());
            });
        }

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project XmlCommentGenerator ](/sources/XmlCommentGenerator.zip)

:::


### Share XmlCommentGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator&quote=XmlCommentGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator&text=XmlCommentGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator&title=XmlCommentGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator&title=XmlCommentGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FXmlCommentGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/XmlCommentGenerator

<SameCategory />

