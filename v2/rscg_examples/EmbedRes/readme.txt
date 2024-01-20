# EmbeddedResourceAccessGenerator
[![NuGet version (Chorn.EmbeddedResourceAccessGenerator)](https://img.shields.io/nuget/v/Chorn.EmbeddedResourceAccessGenerator.svg?style=flat-square)](https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator/)


The EmbeddedResourceAccessGenerator is a code generator to allow easy access to all
embedded resources.

## Usage
Get the nuget package [here](https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator).

After referencing the `Chorn.EmbeddedResourceAccessGenerator` nuget the code generation will
automatically create a class `EmbeddedResources` in the root namespace of the project.

Together with the generated `EmbeddedResource` enumeration there are several options to access
embedded resources:

E.g. for a `Test.txt` embedded resource in the `TestAsset` folder:

- Via enum access through the `EmbeddedResource` enum:

```csharp
	// Via the generated extension methods on the enum
	using Stream s = EmbeddedResource.TestAsset_Test_txt.GetStream();
	using StreamReader sr = EmbeddedResource.TestAsset_Test_txt.GetReader();
```

- Via enum access through the `EmbeddedResource[FolderName]` enum:

```csharp
	// Via the generated extension methods on the enum
	using Stream s = EmbeddedResourceTestAsset.Test_txt.GetStream();
	using StreamReader sr = EmbeddedResourceTestAsset.Test_txt.GetReader();
```

- Via direct static acccess on `EmbeddedResources`:

```csharp
	using StreamReader sr = EmbeddedResources.TestAsset_Test_txt_Reader;
	Console.WriteLine(sr.ReadToEnd());

	// Or via access through the Stream
	using Stream s = EmbeddedResources.TestAsset_Test_txt_Stream;
	// ...
```

## Motivation
Instead of using magic strings in the resource access code that may point to non-existant
resources this generator guarantees resources to exist and code to not compile when they are
removed.

Grouping the resources via their path adds path specific enums, e.g. to easily write tests
for all embedded resource in a subfolder.

Also it saves quite a bit of typing effort.
