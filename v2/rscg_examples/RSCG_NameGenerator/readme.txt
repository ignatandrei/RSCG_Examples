# NameGenerator

Generator of names for an assembly /  product release . Generates names  for {adjective}-{name} or {adjective-name-city} 

The fact that is a Roslyn Code Generator ensures that you can use it in your projects without any additional dependencies - and get rid of him !

## Usage

Add to the .csproj file:

```xml
  <ItemGroup>
	  <PackageReference Include="RSCG_NameGenerator" Version="2024.26.8.2002" >
		  <OutputItemType>Analyzer</OutputItemType>
		  <ReferenceOutputAssembly>false</ReferenceOutputAssembly>
	  </PackageReference>
  </ItemGroup>
  <!-- optional -->
  <PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

Then, in the code, you can use the following code:

```csharp
using Generated.TestNameGenerator;
//by just putting here
//you will not deploy the dll when you deploy the project
//name are generated in the code source
Console.WriteLine($"Name:{TheAssemblyInfo.GeneratedName}");
Console.WriteLine($"Nice:{TheAssemblyInfo.GeneratedNameNice}");
Console.WriteLine($"Small:{TheAssemblyInfo.GeneratedNameSmall}");
```


## More examples

Please see https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG for a list of examples of Roslyn Source Code Generators

Enjoy!