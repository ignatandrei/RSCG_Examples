---
sidebar_position: 1840
title: 184 - MockMe
description: Creating mocks for testing classes
slug: /MockMe
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTests.mdx';

# MockMe  by connorivy


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MockMe?label=MockMe)](https://www.nuget.org/packages/MockMe/)
[![GitHub last commit](https://img.shields.io/github/last-commit/connorivy/MockMe?label=updated)](https://github.com/connorivy/MockMe/)
![GitHub Repo stars](https://img.shields.io/github/stars/connorivy/MockMe?style=social)

## Details

### Info
:::info

Name: **MockMe**

The concrete type mocking library for .NET

Author: connorivy

NuGet: 
*https://www.nuget.org/packages/MockMe/*   


You can find more details at https://github.com/connorivy/MockMe/

Source: https://github.com/connorivy/MockMe/

:::

### Original Readme
:::note

![MockMeFull](https://github.com/user-attachments/assets/43d8b58f-98b0-4469-95c3-7e5ca0683ffc)

___

[![Coverage Status](https://coveralls.io/repos/github/connorivy/MockMe/badge.svg?branch=main)](https://coveralls.io/github/connorivy/MockMe?branch=main)

## What is it?

MockMe is a library for mocking dependencies in your unit test projects. Unlike other libraries that can only mock interfaces and virtual methods, MockMe can mock sealed classes and non-virtual methods.

## Getting Started

Imagine you have the following repository class
```csharp
sealed class MyRepo
{
    public int ExpensiveDatabaseCall() => // some code;
}
```

Download the MockMe NuGet package, then the source generators and the "MockMe.Mock" type will be available in your project.
Then you can customize the behavior of the repository class as below.

```csharp
using MockMe;

// use this syntax to trigger the source generator to make a mock of the provided type
// the 'mock' object will have 3 properties: Setup, Assert, and MockedObject
// hint: rebuild test project after writing this line or IntelliSense may not work correctly
var mock = Mock.Me(default(MyRepo)); 

// the mock.Setup object has an identical interface to the original object
// from there you can configure method behavior with 'Returns', 'Callback', 'Throws', etc
mock.Setup.ExpensiveDatabaseCall().Returns(99);

// the mock.MockedObject is a special instance of the mocked type which has the modified behavior
// other instances of the mocked type will have the original behavior
MyRepo myRepo = mock.MockedObject;
int result = myRepo.ExpensiveDatabaseCall();

Assert.Equal(99, result);

// the mock.Assert object also has an identical interface to the original object.
// you can use it to assert certain mock behaviors
mock.Assert.ExpensiveDatabaseCall().WasCalled();

```

Check out the [Wiki](https://github.com/connorivy/MockMe/wiki/QuickStart) for more examples.

## Give it a Star 

If you like this project, please give it a star!


:::

### About
:::note

Creating mocks for testing classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MockMe**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.5.0" />
    <PackageReference Include="MockMe" Version="1.1.2" />
    <PackageReference Include="MSTest.TestAdapter" Version="2.2.10" />
    <PackageReference Include="MSTest.TestFramework" Version="2.2.10" />
    <PackageReference Include="coverlet.collector" Version="3.2.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MockData\MockData.csproj" />
  </ItemGroup>

 	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MockMe\src\TestClock\TestClock.cs" label="TestClock.cs" >

  This is the use of **MockMe** in *TestClock.cs*

```csharp showLineNumbers 

using MockMe;

namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var mock = Mock.Me(default(MyClock));
        mock.Setup.GetUtcNow().Returns(DateTime.Now.AddYears(-1));
        mock.Setup.GetNow().Returns(DateTime.Now.AddYears(-1));
        MyClock clock = mock;
        Assert.AreEqual(DateTime.Now.AddYears(-1).Year, clock.GetNow().Year);
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MockMe\src\TestClock\obj\GX\MockMe.Generator\MockMe.Generator.MockStoreGenerator\AssemblyAttributes.g.cs" label="AssemblyAttributes.g.cs" >


```csharp showLineNumbers 

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MockMe\src\TestClock\obj\GX\MockMe.Generator\MockMe.Generator.MockStoreGenerator\Mock.DummyDeclaration.g.cs" label="Mock.DummyDeclaration.g.cs" >


```csharp showLineNumbers 

// <auto-generated />
#pragma warning disable
using System;

namespace MockMe
{
    internal static partial class Mock
    {
        public static object Me(global::MockMe.DummyClass unusedInstance)
        {
            throw new global::System.NotImplementedException();
        }
    }
}
#pragma warning restore
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MockMe\src\TestClock\obj\GX\MockMe.Generator\MockMe.Generator.MockStoreGenerator\Mock.g.cs" label="Mock.g.cs" >


```csharp showLineNumbers 

// <auto-generated />
#pragma warning disable
#nullable enable

namespace MockMe
{
    internal static partial class Mock
    {


        [global::System.CodeDom.Compiler.GeneratedCode("MockMe", "1.1.2.0")]
        public static global::MockMe.Generated.MockData.MyClockMock Me(global::MockData.MyClock? unusedInstance)
        {
            return new();
        }

    }
}
#pragma warning restore


```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MockMe\src\TestClock\obj\GX\MockMe.Generator\MockMe.Generator.MockStoreGenerator\MyClockMock.g.cs" label="MyClockMock.g.cs" >


```csharp showLineNumbers 

// <auto-generated />
#pragma warning disable
#nullable enable
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Reflection;
using HarmonyLib;
using MockMe;
using MockMe.Mocks;
using MockMe.Mocks.ClassMemberMocks;
using MockMe.Mocks.ClassMemberMocks.CallTracker;

namespace MockMe.Generated.MockData
{
    [global::System.CodeDom.Compiler.GeneratedCode("MockMe", "1.1.2.0")]
    internal class MyClockMock
        : global::MockMe.Abstractions.SealedTypeMock<global::MockData.MyClock>
    {
        
        public MyClockMock()
        {
            this.Setup = new MyClockMockSetup();
            this.CallTracker = new MyClockMockSetup.MyClockMockCallTracker(this.Setup);
            this.Assert = new MyClockMockSetup.MyClockMockCallTracker.MyClockMockAsserter(this.CallTracker);
            global::MockMe.MockStore<global::MockData.MyClock>.Store.TryAdd(this.MockedObject, this);
        }

        public MyClockMockSetup Setup { get; }
        public MyClockMockSetup.MyClockMockCallTracker.MyClockMockAsserter Assert { get; }
        private MyClockMockSetup.MyClockMockCallTracker CallTracker { get; }

        internal sealed class Patche3022228d9a74650b73fc7bf202bb794
        {
            private static bool Prefix(global::MockData.MyClock __instance, ref global::System.DateTime __result)
            {
                if (global::MockMe.MockStore<global::MockData.MyClock>.TryGetValue<MyClockMock>(__instance, out var mock))
                {
                    __result = mock.CallTracker.GetNow();
                    return false;
                }

                return true;
            }
        }
        internal sealed class Patch9c65ff6ba20c4224bd5585786f975467
        {
            private static bool Prefix(global::MockData.MyClock __instance, ref global::System.DateTime __result)
            {
                if (global::MockMe.MockStore<global::MockData.MyClock>.TryGetValue<MyClockMock>(__instance, out var mock))
                {
                    __result = mock.CallTracker.GetUtcNow();
                    return false;
                }

                return true;
            }
        }
        static MyClockMock()
        {
            var harmony = new global::HarmonyLib.Harmony("com.mockme.patch");

            var originalPatche3022228d9a74650b73fc7bf202bb794 = typeof(global::MockData.MyClock).GetMethod("GetNow", new Type[] {  } );
            var Patche3022228d9a74650b73fc7bf202bb794 = typeof(Patche3022228d9a74650b73fc7bf202bb794).GetMethod("Prefix", global::System.Reflection.BindingFlags.Static | global::System.Reflection.BindingFlags.NonPublic);

            harmony.Patch(originalPatche3022228d9a74650b73fc7bf202bb794, prefix: new HarmonyMethod(Patche3022228d9a74650b73fc7bf202bb794));

            var originalPatch9c65ff6ba20c4224bd5585786f975467 = typeof(global::MockData.MyClock).GetMethod("GetUtcNow", new Type[] {  } );
            var Patch9c65ff6ba20c4224bd5585786f975467 = typeof(Patch9c65ff6ba20c4224bd5585786f975467).GetMethod("Prefix", global::System.Reflection.BindingFlags.Static | global::System.Reflection.BindingFlags.NonPublic);

            harmony.Patch(originalPatch9c65ff6ba20c4224bd5585786f975467, prefix: new HarmonyMethod(Patch9c65ff6ba20c4224bd5585786f975467));

        }

    }

    [global::System.CodeDom.Compiler.GeneratedCode("MockMe", "1.1.2.0")]
    internal class MyClockMockSetup : global::MockMe.Mocks.ClassMemberMocks.Setup.MemberMockSetup
    {

        private global::MockMe.Mocks.ClassMemberMocks.MemberMock<global::System.DateTime>? GetNow_BagStore;
        public global::MockMe.Mocks.ClassMemberMocks.MemberMock<global::System.DateTime> GetNow()
        {

            return this.GetNow_BagStore ??= new();;
        }
        private global::MockMe.Mocks.ClassMemberMocks.MemberMock<global::System.DateTime>? GetUtcNow_BagStore;
        public global::MockMe.Mocks.ClassMemberMocks.MemberMock<global::System.DateTime> GetUtcNow()
        {

            return this.GetUtcNow_BagStore ??= new();;
        }
        [global::System.CodeDom.Compiler.GeneratedCode("MockMe", "1.1.2.0")]
        internal class MyClockMockCallTracker : MockCallTracker
        {
            private readonly MyClockMockSetup setup;
            public MyClockMockCallTracker(MyClockMockSetup setup)
            {
                this.setup = setup;
            }

            private int GetNow_CallStore;

            public global::System.DateTime GetNow()
            {
                this.GetNow_CallStore++;
                return MockCallTracker.CallMemberMock<global::System.DateTime>(this.setup.GetNow_BagStore);
            }

            private int GetUtcNow_CallStore;

            public global::System.DateTime GetUtcNow()
            {
                this.GetUtcNow_CallStore++;
                return MockCallTracker.CallMemberMock<global::System.DateTime>(this.setup.GetUtcNow_BagStore);
            }

            [global::System.CodeDom.Compiler.GeneratedCode("MockMe", "1.1.2.0")]
            internal class MyClockMockAsserter : MockAsserter
            {
                private readonly MyClockMockSetup.MyClockMockCallTracker tracker;
                public MyClockMockAsserter(MyClockMockSetup.MyClockMockCallTracker tracker)
                {
                    this.tracker = tracker;
                }

                public global::MockMe.Asserters.MemberAsserter GetNow() =>
                    new(this.tracker.GetNow_CallStore);

                public global::MockMe.Asserters.MemberAsserter GetUtcNow() =>
                    new(this.tracker.GetUtcNow_CallStore);

            }

        }

    }

}
#pragma warning restore

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MockMe ](/sources/MockMe.zip)

:::


### Share MockMe 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe&quote=MockMe" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe&text=MockMe:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe&title=MockMe" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe&title=MockMe&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMockMe" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MockMe

aaa
<SameCategory />

