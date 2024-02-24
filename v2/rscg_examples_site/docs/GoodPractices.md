---
sidebar_position: 15
title: Good Practices
---

## Content 

I am trying here to add good practices , as I see from the community and from my experience.

## For using any generator

To see the files generated , add the following to the csproj file

```xml
<PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
 ```
 
 ## For creating the generator

### For easy debugging, add IsRoslynComponent

You can debug easy the component if you add the following code to the Roslyn csproj file

```xml
<PropertyGroup>
    <IsRoslynComponent>true</IsRoslynComponent>
</PropertyGroup>
```

Then add a simple console ( or any other project) and reference the Roslyn project. 
( Pay attention to ReferenceOutputAssembly property!)
```xml
<ItemGroup>
	<ProjectReference Include="..\RSCG_Wait\RSCG_Wait.csproj" OutputItemType="Analyzer"
					ReferenceOutputAssembly="false"  />
</ItemGroup>
```

Also in the Debug

## For files generated

### Add .g.cs extension

Add a .g.cs generated suffix so some tools consider the file to be generated

The following code is from the project https://github.com/ignatandrei/RSCG_WaitAndOptions 

```csharp
private void GenerateData(SourceProductionContext context /*other arguments*/)
{
     context.AddSource("WaitGeneratorStart.g", $$"""
//generated code here
""");
}
```

### Add auto-generated comment



### Add a version to the files generated
```csharp
[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName", "1.0.0.0")]
```
You could use the version from the generator

You could use AssemblyInfo , as I have done myself into the project https://github.com/ignatandrei/RSCG_WaitAndOptions 

In the csproj file , add the following

```xml
<ItemGroup>
    <PackageReference Include="ThisAssembly.AssemblyInfo" Version="1.4.3" OutputItemType="Analyzer"
                    ReferenceOutputAssembly="false">
        <PrivateAssets>all</PrivateAssets>
        <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
</ItemGroup>

```
And use when generating the code
```csharp
var version=ThisAssembly.Info.Version;
var name = ThisAssembly.Info.Title;
var data = $$"""
namespace RSCG_Wait;
[global::System.CodeDom.Compiler.GeneratedCode("{{name}}", "{{version}}")]
public partial class OptionsFromBuild{

}
""";
```

### General attributes / code 

Problem - make internal or have another assembly referenced ( or the opposite)
https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/


### Make it shorter


https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell

### mark the code as non - code coverage

[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]



 ### Add comments for method / classes  /  properties generated

 could have warnings as errors .
 or 
https://github.com/dotnet/roslyn/issues/54103
#pragma warning disable CS1591 // Compensate for https://github.com/dotnet/roslyn/issues/54103

 ### Add nullable enable
 
 #nullable enable
TODO: add example

 ### Add reference to another package when need just for compilation

 
TODO: add example




## For deploy

### Add source link

TODO: add example

## Ensure in nuget

image addToNuget

## performance

https://andrewlock.net/creating-a-source-generator-part-9-avoiding-performance-pitfalls-in-incremental-generators/

 https://www.thinktecture.com/net/roslyn-source-generators-high-level-api-forattributewithmetadataname/

 https://papafe.dev/posts/source-generators-tips/

 