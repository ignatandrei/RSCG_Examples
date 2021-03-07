# RSCG - Roslyn Source Code Generators with examples



## Content

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

## Links for Source Generators

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.md

https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.cookbook.md

https://github.com/dotnet/roslyn-sdk/tree/master/samples/CSharp/SourceGenerators

## Helper for see the files

```   
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>
```