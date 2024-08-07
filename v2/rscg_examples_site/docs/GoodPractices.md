---
sidebar_position: 15
title: Good Practices
---

## Content 

I am trying here to add good practices , as I see from the community and from my experience.
The examples are from the https://github.com/ignatandrei/RSCG_WaitAndOptions project


## If you are using a Roslyn Source Code Generator 

### See files generated

To see the files generated , add the following to the csproj file

```xml
<PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
 ```

 Then go to the obj/GX folder and inspect the files generated 

<details><summary>Example - click to expand</summary>
If you have downloaded https://github.com/ignatandrei/RSCG_WaitAndOptions , 
see src\Console_Wait\Console_Wait.csproj file 

also, after compiling, you can see the files generated in the obj/GX folder from the src\Console_Wait folder

</details>

### See if implements IIncrementalGenerator

In simple terms, works better and faster with VS if RSCG implements IIncrementalGenerator instead of ISourceGenerator

The old way to create a RSCG was with ISourceGenerator interface. The new way is with IIncrementalGenerator interface. 

The difference is that the IIncrementalGenerator interface has a method called "Initialize" that is called only once per modification of the code - it is not called if the code is not modified.

Also the source generators have been deprecated in favor of the new incremental generators.

See https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md


 ## If you are creating a Roslyn Source Code Generator project

### It is a nuget package

Follow best practices for NuGet packages. See https://learn.microsoft.com/en-us/nuget/create-packages/package-authoring-best-practices


### Read the documentation

The documentation is at https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md 


### For easy debugging, add IsRoslynComponent

You can debug easy the component if you add the following code to the Roslyn csproj file

```xml
<PropertyGroup>
    <IsRoslynComponent>true</IsRoslynComponent>
</PropertyGroup>
```

Then add a simple console ( or any other project) and reference the Roslyn project. 
( Pay attention to ReferenceOutputAssembly property ,could be false or true)

```xml
<ItemGroup>
	<ProjectReference Include="..\RSCG_Wait\RSCG_Wait.csproj" OutputItemType="Analyzer"
					ReferenceOutputAssembly="false"  />
</ItemGroup>
```

Then in the Roslyn project you can add a breakpoint and debug the code .

<details><summary>Example - click to expand</summary>

If you have downloaded https://github.com/ignatandrei/RSCG_WaitAndOptions , 
see src\RSCG_Wait\RSCG_Wait.csproj file 

</details>

### For continuous debugging

If you want continuous debugging, a la dotnet watch run , you should delete the bin and obj files of the target project and run dotnet build again

<details><summary>Example - click to expand</summary>
This is the powershell that I use for this with the name rscg_build.ps1 . I run it in the src\Console_Wait folder from https://github.com/ignatandrei/RSCG_WaitAndOptions , i.e in the target project folder.

```powershell
while($true)
{

    cls
    Write-Host "delete obj and bin"
    gci obj -recurse | foreach{ri $_.FullName -recurse -force }
    gci bin -recurse | foreach{ri $_.FullName -recurse -force }
    dotnet clean
    dotnet restore
    dotnet build /p:EmitCompilerGeneratedFiles=true --disable-build-servers --force
    dotnet run
    Read-Host -Prompt "Press Enter to continue"

}

```

</details>

### Aim for ReferenceOutputAssembly="false"  

Generally speaking , the work of a Roslyn generator is to generate code. So, you do not need to reference the assembly generated when publishing the build. 

So, you should aim for ReferenceOutputAssembly="false" in the csproj file that reference the Roslyn generator.

<details><summary>Example - click to expand</summary>

</details>

### Do not use all classes

Add an attribute to be used on the classes that you want to add  functionality to.

For example, in the project
```csharp
public void Initialize(IncrementalGeneratorInitializationContext context)
{

    var classToImplement = context.SyntaxProvider
                        .ForAttributeWithMetadataName("RSCG_IFormattableCommon.AddIFormattableAttribute",
                                                    CouldBeClass,
                                                    GetClassInfo)
                        .Collect();
    ; 
//more code

```

I do prefer putting this attribute in a separate nuget package and reference it from the main program.

### General attributes / code 

Problem - make internal or have another assembly referenced ( or the opposite)
https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/

### Add reference to another package when need just for compilation

See the documentation at https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md#use-functionality-from-nuget-packages 
 

## For files generated

### Add .g.cs extension

Add a .g.cs generated suffix so some tools consider the file to be generated

<details><summary>Example - click to expand</summary>

The following code is from the project https://github.com/ignatandrei/RSCG_WaitAndOptions 

```csharp
private void GenerateData(SourceProductionContext context /*other arguments*/)
{
     context.AddSource("WaitGeneratorStart.g", $$"""
//generated code here
""");
}
```
</details>

### Add auto-generated comment

As a header of the file generated, add the following comment

```csharp
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version: ...
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
```
<details><summary>Example - click to expand</summary>
In the project  https://github.com/ignatandrei/RSCG_WaitAndOptions , this the header

```csharp
static string Header()
{
    var version = ThisAssembly.Info.Version;
    var name = ThisAssembly.Info.Title;
    var header = $$"""
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool {{name}}.
//     Runtime Version: {{version}}
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
""";
    return header;
}
```
</details>


### Add a version to the files generated
```csharp
[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName", "1.0.0.0")]
```
You could use the version from the generator in order to know what version of the generator was used to generate the code.

<details><summary>Example - click to expand</summary>

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
</details>

### Make the full path of the file generated shorter


Because of the 260 characters limit for the path, you should the path of the files generated shorter. See more at
https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell

<details><summary>Example - click to expand</summary>

The files generated for the project src\Console_Wait\Console_Wait.csproj 

are in the folder

obj\GX\RSCG_Wait\RSCG_Wait.WaitGenerator

i.e obj\GX\Name of the Nuget\Name of the class name that implements IIncrementalGenerator

</details>

### mark the code as non - code coverage

Add the following attribute to the generated code

```csharp
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
```

<details><summary>Example - click to expand</summary>

In the mentioned project src\RSCG_Wait\RSCG_Wait.csproj 
```csharp
var data = $$"""
{{Header()}}
namespace RSCG_Wait;
[global::System.CodeDom.Compiler.GeneratedCode("{{name}}", "{{version}}")]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
partial class OptionsFromBuild
{
""";
```
</details>





 ### Add comments for method / classes  /  properties generated

Add comments to the generated code in order to help the user understand the code generated

Or if not , add 
```csharp
//pragma warning disable CS1591
```
to the generated code

<details><summary>Example - click to expand</summary>

In the mentioned project src\RSCG_Wait\RSCG_Wait.csproj 

```csharp
context.AddSource("WaitGeneratorStart.g", $$"""
{{Header()}}
namespace RSCG_Wait;
//pragma warning disable CS1591
[global::System.CodeDom.Compiler.GeneratedCode("{{name}}", "{{version}}")]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
partial class MyGeneratedCode
```
</details>

 ### If you're fond of nullable reference types
 
 Add 
 ```csharp
 #nullable enable
 ```
 at the start of the file and
```csharp
#nullable restore
```
at the end of the file

<details><summary>Example - click to expand</summary>
In the mentioned project src\RSCG_Wait\RSCG_Wait.csproj

```csharp
context.AddSource("WaitGeneratorStart.g", $$"""
{{Header()}}
#nullable enable
namespace RSCG_Wait;
//pragma warning disable CS1591
[global::System.CodeDom.Compiler.GeneratedCode("{{name}}", "{{version}}")]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
partial class MyGeneratedCode
{
    public static string DateStart => "{{DateTime.Now.ToString()}}";
    public static int SecondsToWait={{secondsToWait}};
}
#nullable restore
""");
```
</details>

 


## For deploy

### NuGet package

The best way to deploy the Roslyn generator is to use a NuGet package.

So you should follow documentation at https://learn.microsoft.com/en-us/nuget/create-packages/package-authoring-best-practices

Read also https://www.meziantou.net/ensuring-best-practices-for-nuget-packages.htm 

<details><summary>Example - click to expand</summary>
In the mentioned project src\RSCG_Wait\RSCG_Wait.csproj

```xml
<PropertyGroup>
    <EnforceExtendedAnalyzerRules>true</EnforceExtendedAnalyzerRules>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>

<ItemGroup>
    <None Include="../../readme.md" Pack="true" PackagePath="\" />
    <None Include="../../docs/imgs/nuget.png" Pack="true" PackagePath="\" />
    <None Include="$(OutputPath)\$(AssemblyName).dll" Pack="true" PackagePath="analyzers/dotnet/cs" Visible="false" />
    <None Include="../../readme.txt" pack="true" PackagePath="." />
</ItemGroup>
<PropertyGroup>
    <Version>2024.2.23.1940</Version>
    <Authors>Andrei Ignat</Authors>
    <Description>This package wait for a time and put all global options into a cs file</Description>
    <Title>RSCG Wait and Options</Title>
    <PackageId>RSCG_WaitAndOptions</PackageId>
    <PackageTags>C#;.NET;Roslyn;RSCG;Roslyn Source Code Generator;</PackageTags>
    <PackageReadmeFile>readme.md</PackageReadmeFile>
    <PackageIcon>nuget.png</PackageIcon>
    <RepositoryUrl>https://github.com/ignatandrei/RSCG_WaitAndOptions</RepositoryUrl>
    <PackageProjectUrl>https://github.com/ignatandrei/RSCG_WaitAndOptions</PackageProjectUrl>
    <RepositoryType>GIT</RepositoryType>
    <Copyright>MIT</Copyright>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <IncludeSymbols>true</IncludeSymbols>
    <PublishRepositoryUrl>true</PublishRepositoryUrl>
    <EmbedUntrackedSources>true</EmbedUntrackedSources>
    <Deterministic>true</Deterministic>
    <DebugType>embedded</DebugType>

</PropertyGroup>
<PropertyGroup Condition="'$(GITHUB_ACTIONS)' == 'true'">
    <ContinuousIntegrationBuild>true</ContinuousIntegrationBuild>
</PropertyGroup>
```
</details>

### Ensure in nuget

The generator should be packed in analyzer folder in nuget package

![image](/img/addToNuget.png)

<details><summary>Example - click to expand</summary>
In the mentioned project src\RSCG_Wait\RSCG_Wait.csproj

```xml
<ItemGroup>
    <None Include="$(OutputPath)\$(AssemblyName).dll" Pack="true" PackagePath="analyzers/dotnet/cs" Visible="false" />
</ItemGroup>
```
</details>


## Performance

For performance, see the following links:

https://andrewlock.net/creating-a-source-generator-part-9-avoiding-performance-pitfalls-in-incremental-generators/

 https://www.thinktecture.com/net/roslyn-source-generators-high-level-api-forattributewithmetadataname/

 https://papafe.dev/posts/source-generators-tips/

 