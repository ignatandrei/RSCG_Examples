<p align="center">
  <a href="https://github.com/AnderssonPeter/Dolly">
    <img src="icon_white.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Dolly</h3>

  <p align="center">
    Clone .net objects using source generation
    <br />
    <br />
    ·
    <a href="https://github.com/AnderssonPeter/Dolly/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnderssonPeter/Dolly/issues">Request Feature</a>
    ·
  </p>
</p>
<br />

[![NuGet version](https://badge.fury.io/nu/Dolly.svg)](https://www.nuget.org/packages/Dolly)
[![Nuget](https://img.shields.io/nuget/dt/Dolly)](https://www.nuget.org/packages/Dolly)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/AnderssonPeter/Dolly/main/LICENSE)

[![unit tests](https://img.shields.io/github/actions/workflow/status/AnderssonPeter/Dolly/test.yml?branch=main&style=flat-square&label=unit%20tests)](https://github.com/AnderssonPeter/Dolly/actions/workflows/test.yml)
[![Testspace tests](https://img.shields.io/testspace/tests/AnderssonPeter/AnderssonPeter:Dolly/main?style=flat-square)](https://anderssonpeter.testspace.com/spaces/293120/result_sets)
[![Coverage Status](https://img.shields.io/coveralls/github/AnderssonPeter/Dolly?style=flat-square)](https://coveralls.io/github/AnderssonPeter/Dolly)

## Table of Contents
* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
* [Example](#example)
* [Benchmarks](#Benchmarks)

## About The Project
Generate c# code to clone objects on the fly.

## Getting Started
* Add the `Dolly` nuget and add `[Clonable]` attribute to a class and ensure that the class is marked as `partial`.
* Add `[CloneIgnore]` to any property or field that you don't want to include in the clone.
* Call `DeepClone()` or `ShallowClone()` on the object.

### Example
```C#
[Clonable]
public partial class SimpleClass
{
    public string First { get; set; }
    public int Second { get; set; }
    [CloneIgnore]
    public float DontClone { get; set; }
}
```
Should generate
```C#
partial class SimpleClass : IClonable<SimpleClass>
{
    
    object ICloneable.Clone() => this.DeepClone();

    public SimpleClass DeepClone() =>
        new SimpleClass()
        {
            First = First,
            Second = Second
        };

    public SimpleClass ShallowClone() =>
        new SimpleClass()
        {
            First = First,
            Second = Second
        };
}
```

## Benchmarks

| Method          | Mean        | Error     | StdDev    | Ratio  | RatioSD | Gen0   | Gen1   | Allocated |
|---------------- |------------:|----------:|----------:|-------:|--------:|-------:|-------:|----------:|
| Dolly           |    124.5 ns |   1.59 ns |   1.49 ns |   1.00 |    0.02 | 0.0362 |      - |     608 B |
| DeepCloner      |    457.7 ns |   7.01 ns |   6.56 ns |   3.68 |    0.07 | 0.0830 |      - |    1392 B |
| CloneExtensions |    566.2 ns |   9.61 ns |   8.52 ns |   4.55 |    0.08 | 0.0896 |      - |    1504 B |
| NClone          |  4,308.0 ns |  62.01 ns |  58.01 ns |  34.61 |    0.61 | 0.5112 | 0.0076 |    8584 B |
| FastCloner      | 15,310.6 ns | 221.85 ns | 207.52 ns | 123.00 |    2.16 | 0.3967 |      - |    6800 B |
| AnyClone        | 19,011.9 ns | 354.27 ns | 347.94 ns | 152.74 |    3.25 | 2.4414 |      - |   41256 B |