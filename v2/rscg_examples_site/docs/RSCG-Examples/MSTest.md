---
sidebar_position: 1300
title: 130 - MSTest
description: AOP for MSTest
slug: /MSTest
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTests.mdx';

# MSTest  by Microsoft


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MSTest.SourceGeneration?label=MSTest.SourceGeneration)](https://www.nuget.org/packages/MSTest.SourceGeneration/)
[![GitHub last commit](https://img.shields.io/github/last-commit/microsoft/testfx?label=updated)](https://github.com/microsoft/testfx)
![GitHub Repo stars](https://img.shields.io/github/stars/microsoft/testfx?style=social)

## Details

### Info
:::info

Name: **MSTest**

Microsoft.Testing is a set of platform, framework and protocol intended to make it possible to run any test on any target or device.

This package provides the C# source generators for MSTest test framework.

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/MSTest.SourceGeneration/*   


You can find more details at https://github.com/microsoft/testfx

Source: https://github.com/microsoft/testfx

:::

### Original Readme
:::note

# Microsoft Test Framework

[![GitHub release](https://img.shields.io/github/release/microsoft/testfx.svg)](https://GitHub.com/microsoft/testfx/releases/)
[![GitHub repo size](https://img.shields.io/github/repo-size/microsoft/testfx)](https://github.com/microsoft/testfx)
[![GitHub issues-opened](https://img.shields.io/github/issues/microsoft/testfx.svg)](https://GitHub.com/microsoft/testfx/issues?q=is%3Aissue+is%3Aopened)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/microsoft/testfx.svg)](https://GitHub.com/microsoft/testfx/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pulls-opened](https://img.shields.io/github/issues-pr/microsoft/testfx.svg)](https://GitHub.com/microsoft/testfx/pulls?q=is%3Aissue+is%3Aopened)
[![GitHub pulls-merged](https://img.shields.io/github/issues-search/microsoft/testfx?label=merged%20pull%20requests&query=is%3Apr%20is%3Aclosed%20is%3Amerged&color=darkviolet)](https://github.com/microsoft/testfx/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/testfx.svg)](https://GitHub.com/microsoft/testfx/graphs/contributors/)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/microsoft/testfx)](.)
[![Build Status](https://dev.azure.com/dnceng-public/public/_apis/build/status/Microsoft/testfx/microsoft.testfx?branchName=main)](https://dev.azure.com/dnceng-public/public/_build/latest?definitionId=209&branchName=main)

MSTest, Microsoft Testing Framework, is a unit testing framework for .NET applications. It allows you to write tests, use Test Explorer, create test suites, and apply the red, green, refactor pattern to write code.

This is a fully supported, open source and cross-platform test framework with which to write tests targeting .NET Framework, .NET Core, .NET, UWP and WinUI on Windows, Linux, and Mac.

## How can I contribute?

We welcome any kind of contribution!

- [Contributing](https://github.com/microsoft/testfx/CONTRIBUTING.md) provides guidance on how to best contribute
- [Dev Guide](https://github.com/microsoft/testfx/docs/dev-guide.md) explains how to build and test
- [Documentation](https://github.com/microsoft/testfx/docs/README.md) contains information about history, context and supported or unsupported features. It also gather the various official documentation pages on learn.microsoft.com about MSTest.

## How to consume MSTest?

MSTest is shipped as NuGet packages that can be added to your projects. The following table lists all available packages.

| Name | Description | Stable version | Preview version | Dogfood version |
|--------------|---------|:--------------:|:---------------:|:---------------:|
| MSTest | This package is a meta package that simplifies referencing all recommended MSTest packages. | [![#](https://img.shields.io/nuget/v/mstest.svg?style=flat)](http://www.nuget.org/packages/MSTest/) | [![#](https://img.shields.io/nuget/vpre/mstest.svg?style=flat)](http://www.nuget.org/packages/MSTest/) | [Azure Artifacts](https://dnceng.visualstudio.com/public/_artifacts/feed/test-tools/NuGet/MSTest/versions) |
| MSTest.TestFramework | This package includes the libraries for writing tests with MSTest. To ensure discovery and execution of your tests, install the `MSTest.TestAdapter`` package. | [![#](https://img.shields.io/nuget/v/mstest.testframework.svg?style=flat)](http://www.nuget.org/packages/MSTest.TestFramework/) | [![#](https://img.shields.io/nuget/vpre/mstest.testframework.svg?style=flat)](http://www.nuget.org/packages/MSTest.TestFramework/) | [Azure Artifacts](https://dnceng.visualstudio.com/public/_artifacts/feed/test-tools/NuGet/MSTest.TestFramework/versions) |
| MSTest.TestAdapter | This package includes the adapter logic to discover and run tests. For access to the testing framework, install the `MSTest.TestFramework` package. | [![#](https://img.shields.io/nuget/v/mstest.testadapter.svg?style=flat)](http://www.nuget.org/packages/MSTest.TestAdapter/) | [![#](https://img.shields.io/nuget/vpre/mstest.testadapter.svg?style=flat)](http://www.nuget.org/packages/MSTest.TestAdapter/) | [Azure Artifacts](https://dnceng.visualstudio.com/public/_artifacts/feed/test-tools/NuGet/MSTest.TestAdapter/versions) |
| MSTest.Analyzers | This package includes code analyzers and code fixes for MSTest. | [![#](https://img.shields.io/nuget/v/mstest.analyzers.svg?style=flat)](http://www.nuget.org/packages/MSTest.Analyzers/) | [![#](https://img.shields.io/nuget/vpre/mstest.analyzers.svg?style=flat)](http://www.nuget.org/packages/MSTest.Analyzers/) | [Azure Artifacts](https://dnceng.visualstudio.com/public/_artifacts/feed/test-tools/NuGet/MSTest.Analyzers/versions) |

## License

MSTest is licensed under the [MIT license](https://github.com/microsoft/testfx/LICENSE).

The LICENSE and ThirdPartyNotices in any downloaded archives are authoritative.


:::

### About
:::note

AOP for MSTest


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MSTest**
```xml showLineNumbers {20}
<!-- file: UnitTestProject1.csproj -->
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>

		<OutputType>exe</OutputType>
		<PublishAot>true</PublishAot>
	</PropertyGroup>

	<ItemGroup>
		<!-- 
      Experimental MSTest Engine & source generator, 
      close sourced, licensed the same as our extensions 
      with Microsoft Testing Platform Tools license.
    -->
		<PackageReference Include="MSTest.Engine" Version="1.0.0-alpha.24163.4" />
		<PackageReference Include="MSTest.SourceGeneration" Version="1.0.0-alpha.24163.4" />

		<PackageReference Include="Microsoft.CodeCoverage.MSBuild" Version="17.10.4" />
		<PackageReference Include="Microsoft.Testing.Extensions.CodeCoverage" Version="17.10.4" />

		<PackageReference Include="Microsoft.Testing.Extensions.TrxReport" Version="1.0.2" />
		<PackageReference Include="Microsoft.Testing.Platform.MSBuild" Version="1.0.2" />
		<PackageReference Include="MSTest.TestFramework" Version="3.2.2" />
		<PackageReference Include="MSTest.Analyzers" Version="3.2.2" />

	</ItemGroup>

	<ItemGroup>
		<ProjectReference Include="..\MyImportantClass\MyImportantClass.csproj" />
	</ItemGroup>

	<ItemGroup>
		<Using Include="Microsoft.VisualStudio.TestTools.UnitTesting" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>
```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\UnitTest1.cs" label="UnitTest1.cs" >

  This is the use of **MSTest** in *UnitTest1.cs*

```csharp showLineNumbers 
// file: UnitTest1.cs
using MyImportantClass;

namespace DemoTest;

[TestClass]
public class UnitTest1
{
    [TestMethod]
    public void TestMethod1()
    {
        Assert.AreEqual(3, new Class1().Add(1, 2));
    }

    [TestMethod]
    [DataRow(1, 2)]
    [DataRow(100, -97)]
    public void TestMethod2(int left, int right)
    {
        Assert.AreEqual(3, new Class1().Add(left, right));
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\obj\GX\MSTest.SourceGeneration\Microsoft.Testing.Framework.SourceGeneration.TestNodesGenerator\DemoTest.UnitTest1.g.cs" label="DemoTest.UnitTest1.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by Microsoft Testing Framework Generator.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemoTest
{
    using Threading = global::System.Threading;
    using ColGen = global::System.Collections.Generic;
    using CA = global::System.Diagnostics.CodeAnalysis;
    using Sys = global::System;
    using Msg = global::Microsoft.Testing.Platform.Extensions.Messages;
    using MSTF = global::Microsoft.Testing.Framework;

    [CA::ExcludeFromCodeCoverage]
    public static class DemoTest_UnitTest1
    {
        public static readonly MSTF::TestNode TestNode = new MSTF::TestNode
        {
            StableUid = "DemoTest.DemoTest.UnitTest1",
            DisplayName = "UnitTest1",
            Properties = new Msg::IProperty[1]
            {
                new Msg::TestFileLocationProperty(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\UnitTest1.cs", new(new(6, -1), new(22, -1))),
            },
            Tests = new MSTF::TestNode[]
            {
                new MSTF::InternalUnsafeActionTestNode
                {
                    StableUid = "DemoTest.DemoTest.UnitTest1.TestMethod1()",
                    DisplayName = "TestMethod1",
                    Properties = new Msg::IProperty[2]
                    {
                        new Msg::TestMethodIdentifierProperty(
                            "DemoTest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                            "DemoTest",
                            "UnitTest1",
                            "TestMethod1",
                            Sys::Array.Empty<string>(),
                            "System.Void"),
                        new Msg::TestFileLocationProperty(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\UnitTest1.cs", new(new(9, -1), new(13, -1))),
                    },
                    Body = static testExecutionContext =>
                    {
                        var instance = new UnitTest1();
                        try
                        {
                            instance.TestMethod1();
                        }
                        catch (global::System.Exception ex)
                        {
                            testExecutionContext.ReportException(ex, null);
                        }
                    },
                },
                new MSTF::InternalUnsafeActionParameterizedTestNode<MSTF::InternalUnsafeTestArgumentsEntry<(int left, int right)>>
                {
                    StableUid = "DemoTest.DemoTest.UnitTest1.TestMethod2(int, int)",
                    DisplayName = "TestMethod2",
                    Properties = new Msg::IProperty[2]
                    {
                        new Msg::TestMethodIdentifierProperty(
                            "DemoTest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                            "DemoTest",
                            "UnitTest1",
                            "TestMethod2",
                            new string[2]
                            {
                                "System.Int32",
                                "System.Int32",
                            },
                            "System.Void"),
                        new Msg::TestFileLocationProperty(@"D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\UnitTest1.cs", new(new(15, -1), new(21, -1))),
                    },
                    GetArguments = static () => new MSTF::InternalUnsafeTestArgumentsEntry<(int left, int right)>[]
                    {
                        new MSTF::InternalUnsafeTestArgumentsEntry<(int left, int right)>((1, 2), "left: 1, right: 2"),
                        new MSTF::InternalUnsafeTestArgumentsEntry<(int left, int right)>((100, -97), "left: 100, right: -97"),
                    },
                    Body = static (testExecutionContext, data) =>
                    {
                        var instance = new UnitTest1();
                        try
                        {
                            instance.TestMethod2(data.Arguments.left, data.Arguments.right);
                        }
                        catch (global::System.Exception ex)
                        {
                            testExecutionContext.ReportException(ex, null);
                        }
                    },
                },
            },
        };
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\obj\GX\MSTest.SourceGeneration\Microsoft.Testing.Framework.SourceGeneration.TestNodesGenerator\SourceGeneratedTestingPlatformBuilderHook.g.cs" label="SourceGeneratedTestingPlatformBuilderHook.g.cs" >


```csharp showLineNumbers 

namespace Microsoft.Testing.Framework.SourceGeneration
{
    public static class SourceGeneratedTestingPlatformBuilderHook
    {
        public static void AddExtensions(Microsoft.Testing.Platform.Builder.ITestApplicationBuilder testApplicationBuilder, string[] _)
        {
            testApplicationBuilder.AddTestFramework(new Microsoft.Testing.Framework.Configurations.TestFrameworkConfiguration(System.Environment.ProcessorCount),
                new DemoTest.SourceGeneratedTestNodesBuilder());
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MSTest\src\DemoTest\obj\GX\MSTest.SourceGeneration\Microsoft.Testing.Framework.SourceGeneration.TestNodesGenerator\SourceGeneratedTestNodesBuilder.g.cs" label="SourceGeneratedTestNodesBuilder.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by Microsoft Testing Framework Generator.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemoTest
{
    using DemoTest;
    using ColGen = global::System.Collections.Generic;
    using CA = global::System.Diagnostics.CodeAnalysis;
    using Sys = global::System;
    using Tasks = global::System.Threading.Tasks;
    using Msg = global::Microsoft.Testing.Platform.Extensions.Messages;
    using MSTF = global::Microsoft.Testing.Framework;
    using Cap = global::Microsoft.Testing.Platform.Capabilities.TestFramework;
    using TrxReport = global::Microsoft.Testing.Extensions.TrxReport.Abstractions;

    [CA::ExcludeFromCodeCoverage]
    public sealed class SourceGeneratedTestNodesBuilder : MSTF::ITestNodesBuilder
    {
        private sealed class ClassCapabilities : TrxReport::ITrxReportCapability
        {
            bool TrxReport::ITrxReportCapability.IsSupported { get; } = true;
            void TrxReport::ITrxReportCapability.Enable() {}
        }

        public ColGen::IReadOnlyCollection<Cap::ITestFrameworkCapability> Capabilities { get; } = new Cap::ITestFrameworkCapability[1] { new ClassCapabilities() };

        public Tasks::Task<MSTF::TestNode[]> BuildAsync(MSTF::ITestSessionContext testSessionContext)
        {
            ColGen::List<MSTF::TestNode> namespace1Tests = new();
            namespace1Tests.Add(DemoTest_UnitTest1.TestNode);

            MSTF::TestNode root = new MSTF::TestNode
            {
                StableUid = "DemoTest",
                DisplayName = "DemoTest",
                Properties = Sys::Array.Empty<Msg::IProperty>(),
                Tests = new MSTF::TestNode[]
                {
                    new MSTF::TestNode
                    {
                        StableUid = "DemoTest.DemoTest",
                        DisplayName = "DemoTest",
                        Properties = Sys::Array.Empty<Msg::IProperty>(),
                        Tests = namespace1Tests.ToArray(),
                    },
                },
            };

            return Tasks::Task.FromResult(new MSTF::TestNode[1] { root });
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MSTest ](/sources/MSTest.zip)

:::


### Share MSTest 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest&quote=MSTest" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest&text=MSTest:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest&title=MSTest" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest&title=MSTest&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMSTest" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MSTest

aaa
<SameCategory />

