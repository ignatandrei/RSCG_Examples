
# RSCG - Roslyn Source Code Generators with examples



## Content


<table>
<tr>
<td>Nr.</td><td>Name</td><td>Summary</td>

</tr>

<tr>
<td>1</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion' target='_blank'>ThisAssembly</a>
</td>

<td>The ThisAssembly.Info allows you access to the Assembly Information as constants, instead of going to reflection each time. I found useful to see the assembly version right away in any project that I have.</td>

</td>

</tr>

<tr>
<td>2</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum' target='_blank'>Enum</a>
</td>

<td>This will generate code to fast parsing a int or a string to an enum</td>

</td>

</tr>

<tr>
<td>3</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass' target='_blank'>JsonByExampleGenerator</a>
</td>

<td>This will generate C# classes from json files.</td>

</td>

</tr>

<tr>
<td>4</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor' target='_blank'>CopyConstructor + Deconstructor</a>
</td>

<td>This will generate code for a POCO to generate copy constructor and deconstructor</td>

</td>

</tr>

<tr>
<td>5</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper' target='_blank'>GeneratedMapper</a>
</td>

<td>AutoMapping from a POCO to a DTO. Lots of customizations</td>

</td>

</tr>

<tr>
<td>6</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers' target='_blank'>Skinny Controllers</a>
</td>

<td>This will generate code for WebAPI for each method of a field in the controller</td>

</td>

</tr>

<tr>
<td>7</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder' target='_blank'>data-builder-generator</a>
</td>

<td>Implements the Builder Design pattern for any class. Useful , at least, for test projects </td>

</td>

</tr>

<tr>
<td>8</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/MetadataFromObject' target='_blank'>Metadata from object</a>
</td>

<td>This will generate code to retrieve the values of properties directly, not by reflection</td>

</td>

</tr>

<tr>
<td>9</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking' target='_blank'>MockSourceGenerator</a>
</td>

<td>This will generate Mock classes directly for any interface - with your implementation.</td>

</td>

</tr>

<tr>
<td>10</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/MethodDecorator' target='_blank'>Method decorator</a>
</td>

<td>This will generate code to decorate methods with anything you want ( stopwatch, logging , authorization...)</td>

</td>

</tr>

<tr>
<td>11</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/PartiallyFunction' target='_blank'>PartiallyApplied</a>
</td>

<td>This will generate curry for your functions </td>

</td>

</tr>

<tr>
<td>12</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/IFormattable' target='_blank'>IFormattable</a>
</td>

<td>This will generate code to add IFormattable to any class, based on the properties of the class</td>

</td>

</tr>

<tr>
<td>13</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Decorator' target='_blank'>AutoInterface</a>
</td>

<td>Implement the Design Pattern Decorator. Based on template - you can modify the source code generated</td>

</td>

</tr>

<tr>
<td>14</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/PropertyExpressionGenerator' target='_blank'>Property Expression Generator</a>
</td>

<td>This will generate code to add function to be used with Entity Framework to search for any property of a class</td>

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

## Read all in one go
[https://ignatandrei.github.io/RSCG_Examples/](https://ignatandrei.github.io/RSCG_Examples/)
