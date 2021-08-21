
# RSCG - Roslyn Source Code Generators with examples


## Content

You have {{all.Length}} examples with source codes ( see below).

Also, there are 33 more examples waiting to be discovered by you .

{{ index= 0}}
<table>
<tr>
<td>Nr.</td><td>Name</td><td>Summary</td>

</tr>
{{~ for mi in all ~}}
{{ index= index+1}}
<tr>
<td>{{index}}</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/{{mi.rootFolder}}' target='_blank'>{{ mi.Generator.Name }}</a>
</td>

<td>{{mi.Data.GoodFor}}</td>

</td>

</tr>
{{~ end ~}}

</table>

## If you want to develop a Roslyn Source Code Generator

### Documentation for Source Generators

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.md

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.cookbook.md

https://github.com/dotnet/roslyn-sdk/tree/master/samples/CSharp/SourceGenerators

### Helper for see the files

```xml   
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>
```
### Advanced debug

In the RSCG project

```xml
 <PropertyGroup>
    <TargetFrameworks>netstandard2.0</TargetFrameworks>
    <IsRoslynComponent>true</IsRoslynComponent>
  </PropertyGroup>
```xml

In the project

```xml
<ItemGroup>
    <ProjectReference Include="Path_To_The.csproj" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
```

## Read all in one go

[https://ignatandrei.github.io/RSCG_Examples/](https://ignatandrei.github.io/RSCG_Examples/)

## Free ebook

[https://ignatandrei.github.io/RSCG_Examples/index.docx](https://ignatandrei.github.io/RSCG_Examples/index.docx)

