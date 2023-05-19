---
sidebar_position: 140
title: RSCG - dunet
description: Add union types to C#  - similar with F#/TS discriminated unions
slug: /dunet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# dunet  by Domn Werner

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/dunet?label=dunet)](https://www.nuget.org/packages/dunet/)
[![GitHub last commit](https://img.shields.io/github/last-commit/domn1995/dunet?label=updated)](https://github.com/domn1995/dunet)
![GitHub Repo stars](https://img.shields.io/github/stars/domn1995/dunet?style=social)

## Details

### Info
:::info

Name: **dunet**

Author: Domn Werner

NuGet: 
*https://www.nuget.org/packages/dunet/*   


You can find more details at https://github.com/domn1995/dunet

Source : https://github.com/domn1995/dunet
:::

### About
:::note

Add union types to C#  - similar with F#/TS discriminated unions


Check his examples-  awesome


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **dunet**
```xml
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Dunet" Version="1.8.0">
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\Program.cs" label="Program.cs" >

  This is the use of **dunet** in *Program.cs*

```csharp
// See https://github.com/domn1995/dunet for more examples
using duneDemo;
Console.WriteLine(WhatIsTheString.FromString("1"));

Console.WriteLine(WhatIsTheString.FromString("Andrei"));

Console.WriteLine(WhatIsTheString.FromString("1970-04-16"));

Console.WriteLine("Enter something - 1, 1970-04-16 or Andrei !");
var readLine = Console.ReadLine();
var opt= WhatIsTheString.FromString(readLine);
Console.WriteLine(opt);
//if if it long
opt.MatchIsLong(
    l => Console.WriteLine("is long " + l.value),
    () => Console.WriteLine("is not long")
    ) ;
//C# switch
var x=opt switch
{
    WhatIsTheString.IsLong l => "is long " +l.value,
    WhatIsTheString.IsDate d=> "is date "+ d.value,
    WhatIsTheString.IsString s=>"is string "+ s.value,
    WhatIsTheString.IsNullWhiteSpace w=>"no data",
    _ => throw new NotImplementedException()

};
Console.WriteLine(x);





```
  </TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\Recognize.cs" label="Recognize.cs" >

  This is the use of **dunet** in *Recognize.cs*

```csharp
using Dunet;
namespace duneDemo;

[Union]
partial record WhatIsTheString
{
    partial record IsString(string value);
    partial record IsLong(long value);
    partial record IsDate(DateTime value);

    partial record IsNullWhiteSpace();

    public static WhatIsTheString FromString(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return new IsNullWhiteSpace();

        if(long.TryParse(value, out var longValue))
        {
            return new IsLong(longValue);
        }
        if(DateTime.TryParse(value, out var dateTimeValue))
        {
            return new IsDate(dateTimeValue);
        }
        return new IsString(value);
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionAttributeGeneration.UnionAttributeGenerator\UnionAttribute.g.cs" label="UnionAttribute.g.cs" >


```csharp
using System;

namespace Dunet;

/// <summary>
/// Enables dunet union source generation for the decorated partial record.
/// </summary>
[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class UnionAttribute : Attribute {}
```

  </TabItem>


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionGeneration.UnionGenerator\duneDemo.WhatIsTheString.g.cs" label="duneDemo.WhatIsTheString.g.cs" >


```csharp
#pragma warning disable 1591
namespace duneDemo;
abstract partial record WhatIsTheString
{
    private WhatIsTheString() {}

    public abstract TMatchOutput Match<TMatchOutput>(
        System.Func<IsString, TMatchOutput> @isString,
        System.Func<IsLong, TMatchOutput> @isLong,
        System.Func<IsDate, TMatchOutput> @isDate,
        System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    );
    public abstract void Match(
        System.Action<IsString> @isString,
        System.Action<IsLong> @isLong,
        System.Action<IsDate> @isDate,
        System.Action<IsNullWhiteSpace> @isNullWhiteSpace
    );

    public abstract TMatchOutput Match<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsString, TMatchOutput> @isString,
        System.Func<TState, IsLong, TMatchOutput> @isLong,
        System.Func<TState, IsDate, TMatchOutput> @isDate,
        System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    );
    public abstract void Match<TState>(
        TState state,
        System.Action<TState, IsString> @isString,
        System.Action<TState, IsLong> @isLong,
        System.Action<TState, IsDate> @isDate,
        System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
    );

    public abstract TMatchOutput MatchIsString<TMatchOutput>(
        System.Func<IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsLong<TMatchOutput>(
        System.Func<IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsDate<TMatchOutput>(
        System.Func<IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
        System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    );

    public abstract void MatchIsString(
        System.Action<IsString> @isString,
        System.Action @else
    );
    public abstract void MatchIsLong(
        System.Action<IsLong> @isLong,
        System.Action @else
    );
    public abstract void MatchIsDate(
        System.Action<IsDate> @isDate,
        System.Action @else
    );
    public abstract void MatchIsNullWhiteSpace(
        System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    );

    public abstract TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsString, TMatchOutput> @isString,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsLong, TMatchOutput> @isLong,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsDate, TMatchOutput> @isDate,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TState, TMatchOutput> @else
    );

    public abstract void MatchIsString<TState>(
        TState state,
        System.Action<TState, IsString> @isString,
        System.Action<TState> @else
    );
    public abstract void MatchIsLong<TState>(
        TState state,
        System.Action<TState, IsLong> @isLong,
        System.Action<TState> @else
    );
    public abstract void MatchIsDate<TState>(
        TState state,
        System.Action<TState, IsDate> @isDate,
        System.Action<TState> @else
    );
    public abstract void MatchIsNullWhiteSpace<TState>(
        TState state,
        System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action<TState> @else
    );

    public sealed partial record IsString : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isString(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isString(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isString(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isString(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @isString(this);
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @isString(this);
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @isString(state, this);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @isString(state, this);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsLong : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isLong(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isLong(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isLong(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isLong(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @isLong(this);
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @isLong(this);
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @isLong(state, this);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @isLong(state, this);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsDate : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isDate(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isDate(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isDate(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isDate(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @isDate(this);
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @isDate(this);
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @isDate(state, this);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @isDate(state, this);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsNullWhiteSpace : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isNullWhiteSpace(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isNullWhiteSpace(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isNullWhiteSpace(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isNullWhiteSpace(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @isNullWhiteSpace(this);
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @isNullWhiteSpace(this);
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @isNullWhiteSpace(state, this);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @isNullWhiteSpace(state, this);
    }

}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionGeneration.UnionGenerator\duneDemo.WhatIsTheStringMatchExtensions.g.cs" label="duneDemo.WhatIsTheStringMatchExtensions.g.cs" >


```csharp
#pragma warning disable 1591

namespace duneDemo;

internal static class WhatIsTheStringMatchExtensions
{
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.Task MatchAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.ValueTask MatchAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsStringAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsLongAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsDateAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsNullWhiteSpaceAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsStringAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsLongAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsDateAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsNullWhiteSpaceAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsStringAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsLongAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsDateAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsNullWhiteSpaceAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsStringAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsLongAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsDateAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsNullWhiteSpaceAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
}
#pragma warning restore 1591

```

  </TabItem>


</Tabs>

## Usefull

### Download Example
:::tip

[Download Example dunet ](/sources/dunet.zip)

:::

### Download PDF

[Download PDF dunet ](/pdfs/dunet.pdf)

### Share dunet 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&quote=dunet" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&text=dunet:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&title=dunet" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&title=dunet&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/dunet
