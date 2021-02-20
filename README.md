# RSGC - Roslyn Source Code Generators with examples



## Content


<table>
<tr>
<td>Nr.</td><td>Name</td><td>Summary</td>
<td>Link</td>
</tr>

<tr>
<td>1</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion'>ThisAssembly</a>
</td>

<td>The ThisAssembly.Info allows you access to the Assembly Information as constants, instead of going to reflection each time. I found useful to see the assembly version right away in any project that I have.</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion
</a>
</td>

</tr>

<tr>
<td>2</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum'>Enum</a>
</td>

<td>This will generate code to fast parsing a int or a string to an enum</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum
</a>
</td>

</tr>

<tr>
<td>3</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass'>JsonByExampleGenerator</a>
</td>

<td>This will generate C# classes from json files.</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass
</a>
</td>

</tr>

<tr>
<td>4</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor'>CopyConstructor + Deconstructor</a>
</td>

<td>This will generate code for a POCO to generate copy constructor and deconstructor</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor
</a>
</td>

</tr>

<tr>
<td>5</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper'>GeneratedMapper</a>
</td>

<td>AutoMapping from a POCO to a DTO. Lots of customizations</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper
</a>
</td>

</tr>

<tr>
<td>6</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers'>Skinny Controllers</a>
</td>

<td>This will generate code for WebAPI for each method of a field in the controller</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers
</a>
</td>

</tr>

<tr>
<td>7</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder'>data-builder-generator</a>
</td>

<td>Implements the Builder Design pattern for any class. Useful , at least, for test projects </td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder
</a>
</td>

</tr>

<tr>
<td>8</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking'>MockSourceGenerator</a>
</td>

<td>This will generate Mock classes directly for any interface - with your implementation.</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking
</a>
</td>

</tr>

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