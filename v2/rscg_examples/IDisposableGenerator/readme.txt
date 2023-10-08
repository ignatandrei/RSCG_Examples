# IDisposableGenerator
Source Generator Generating the Dispose functions in Disposables.

## Code Ownership

All code used is copyright of Elskom org, with the exception of Roslyn which is copyright of the .NET Foundation and it's contributors.

The dependencies of the unit tests are copyright of their respective owners.

## Status

This project is currently actively maintained whenever an issue happens (or whenever major roslyn changes happens that break it).

## Purpose

This project is for easily generating the dispose functions of disposable types using attributes to control the generator on how it writes the generated code. This results in code that is more maintainable and cleaner than if you had to implement the IDisposable interface yourself. Disposable types require marking the type as partial to properly compile the generated code.

## Documentation

It is currently in the works.

## Badges
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4764a3b231ad40c798ea3d193ff3dfe7)](https://www.codacy.com/gh/Elskom/IDisposableGenerator/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Elskom/IDisposableGenerator&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage Badge](https://app.codacy.com/project/badge/Coverage/4764a3b231ad40c798ea3d193ff3dfe7)](https://www.codacy.com/gh/Elskom/IDisposableGenerator/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Elskom/IDisposableGenerator&amp;utm_campaign=Badge_Coverage)

| Package | Version |
|:-------:|:-------:|
| IDisposableGenerator | [![NuGet Badge](https://buildstats.info/nuget/IDisposableGenerator?includePreReleases=true)](https://www.nuget.org/packages/IDisposableGenerator/) |
