﻿{{ index= 0
for mi in all 
index= index+1
 end }}
 {{
 linksRSCG = 53
 }}
# RSCG - {{index + linksRSCG }} examples of Roslyn Source Code Generators 


## Content
You have {{index}} examples with my own source codes ( see below).

Also, there are {{linksRSCG}} more examples waiting to be discovered/analyzed by you .

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
<a href='https://ignatandrei.github.io/RSCG_Examples/#rscg-number-{{index}}--{{mi.Generator.Name | string.downcase }}' target='_blank'>See in action: {{ mi.Generator.Name }}</a>


Other links:

<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/{{mi.rootFolder}}' target='_blank'>Source Code</a>

<a href='{{mi.Generator.Source}}' target='_blank'>Official Site
{{mi.Generator.MarkdownLastCommit}} {{mi.Generator.MarkDownStars}}
</a>
{{mi.Generator.MarkDownNugetDownloads}}

</td>

<td>{{mi.Data.GoodFor}}</td>

</td>

</tr>
{{~ end ~}}

</table>


{{ other_roslyn}}

# If you want to develop a Roslyn Source Code Generator

## Documentation for Source Generators

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.md

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.cookbook.md

https://github.com/dotnet/roslyn-sdk/tree/master/samples/CSharp/SourceGenerators

## Helper for see the files

```xml   
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>
```
## Advanced debug

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

