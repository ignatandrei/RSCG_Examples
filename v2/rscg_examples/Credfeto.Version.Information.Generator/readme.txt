# credfeto-version-constants-generator

Source generator for embedding build information as compile time constants in C# projects.

## Usage

Add the following to your project file:

```xml

<ItemGroup>
    <PackageReference Include="Credfeto.Version.Information.Generator" Version="1.0.2.16" PrivateAssets="All"
                      ExcludeAssets="runtime"/>
</ItemGroup>
```

This generates a class called `VersionInformation` in the root namespace of the project with the following properties
taken from properties in the project file:

```csharp
internal static class VersionInformation
{
    public const string Version = "0.0.0.1-test";
    public const string Product = "Credfeto.Version.Information.Example.Tests";
    public const string Company = "Example Company";
    public const string Copyright = "Copyright © Example Company 2024";
}
```

Controlled by the following properties:

```xml
<PropertyGroup>
    <Company>Example Company</Company>
    <Copyright>Copyright © Example Company 2024</Copyright>
</PropertyGroup>
```

* Version comes from the ``AssemblyInformationalVersion`` that can be set using the ``/p:Version=0.0.1-test`` command
  line argument to MSBuild. or a ``<Version>`` property in the project file.
* Product comes from the Root Namespace property for the assembly.

## Build Status

| Branch  | Status                                                                                                                                                                                                                                        |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| main    | [![Build: Pre-Release](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-pre-release.yml/badge.svg)](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-pre-release.yml) |
| release | [![Build: Release](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-release.yml/badge.svg)](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-release.yml)             |

## Changelog

View [changelog](CHANGELOG.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->