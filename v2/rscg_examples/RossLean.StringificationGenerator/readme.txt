# RossLean

RossLean is a project within the RossLean organization that aims to bring [Roslyn](https://github.com/dotnet/roslyn)-powered applications (analyzers and source generators) empowering the experience in the C# (and sometimes the entire .NET) ecosystem.

## Origins

Some analyzers that are included here were developed intending to enhance the experience of developing in C#. Then, [RoseLynn](https://github.com/Rekkonnect/RoseLynn) was developed for the purposes of abstracting common operations in Roslyn applications.

RossLean, following the same wordplay pattern as RoseLynn, came to life after deciding that grouping our efforts would be more encouraging for the entire community. This included staging and unifying the home for already existing packages and repos, with the intent of developing more in the future.

## Goals

The goal of RossLean is to accommodate source generators and analyzers that provide further versatility and usability of existing features and components of the language. This includes expanding on the set of capabilities that any given feature provides. For example, [GenericsAnalyzer](RoseLynn.GenericsAnalyzer/) provides a lot of flexibility around declaring constraints on generic type parameters.

The projects are to be made available under the copyrights and ownership of the RossLean organization and its affiliates. Previously held copyright ownership is not ceased, but will be migrated and merged with RossLean.

All code herein adheres to the MIT license. It is not expected to change in the future.

## Current Projects

- [GenericsAnalyzer](RossLean.GenericsAnalyzer/) - Expansions to the generic constraint model
- [NameOn](RossLean.NameOn/) - Enforcement and encouragement of `nameof` usage patterns
- [Smarttributes](RossLean.Smarttributes/) - Constraints on application of attributes
- [StringificationGenerator](RossLean.StringificationGenerator/) - Generator for construction code generation

## Future Projects

- Many features that are asked from the community in the [C# language design discussions](https://github.com/dotnet/csharplang/discussions). Currently interesting ones include:
  - Disallow direct value assignment to `ref` - `ref readonly` also provides immutability ([Link](https://github.com/dotnet/csharplang/discussions/7842))
  - Opt out of structural typing for specific types ([Link](https://github.com/dotnet/csharplang/discussions/5278#discussion-3623748))
- Common coding pattern simplification generators
  - Params method overload generator
  - Type parameter method overload generator
  - [VisitorPatternGenerator](https://github.com/Ghost4Man/VisitorPatternGenerator)
    - Extra features will be included in dedicated issues

Check out [this GitHub project](https://github.com/orgs/RossLean/projects/1) for a detailed list of issues regarding project ideas and their status.

## Contributing

Before opening a PR and making changes, it is required to open an issue for discussion around the desired changes. Any PRs without a clear issue they are tackling will be handled appropriately, depending on the scope of the issue itself.

The first priority of all these projects is providing helpful tools and frameworks with the smallest possible performance cost in the development experience within the IDE. We are aware that analyzers and source generators impose a significant enough performance penalty on their own, so we are careful to not hinder the experience any further.

### Guidelines

Analyzer and source generator packages should be built in a way such that the underlying `.Core` packages of each application are automatically transitively installed on the user's project, without their manual intervention.

Using [RoseLynn](https://github.com/Rekkonnect/RoseLynn) is highly encouraged, if necessary. It generally provides a great number of tools that may be useful in common scenarios. `RoseLynn.Testing` specifically is a must.

All projects must come with unit tests covering a viably large set of intended cases. Testing should be focused on isolated reported diagnostics or generated sources. No unit tests must ever fail; if we want to include unit tests that do not currently work, we will have to use `Ignore`.

All unit tests are written using the NUnit testing framework.

#### Analyzers

Analyzers can be built with Visual Studio 2019 in mind. This restricts the versions of the included `Microsoft.CodeAnalysis` to below 4.0.0. Additionally, only the RoseLynn*.VS2019 packages can be used.

It is not mandatory to support VS 2019 however. Rarely, some analyzer might be focused on newer versions of the language, or have to handle such cases. In this case, where the cost of backwards compatibility would be unreasonably large, VS 2022 onwards is the only path.

#### Source Generators

All source generators must be incremental (implementing only the `IIncrementalGenerator` attribute). This means that we will only support Visual Studio 2022 and above. Using T4 templates is highly discouraged, primarily for maintainability concerns.

Projects that also provide a domain-specific public API for consumption may not include the API in generated source. The underlying API that the source generator makes use of must be a separate package, and package versions must match exactly. In cases of hotfixes with version number difference in the build number, including the supported version in the description is sufficient.
