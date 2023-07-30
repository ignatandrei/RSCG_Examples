# RSCG_Utils

Roslyn Source Code Generators Utils

[![pack to nuget](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml)

[![pack to nuget](https://img.shields.io/nuget/dt/rscgutils?style=for-the-badge)](https://www.nuget.org/packages/rscgutils)

# Usage

## Additional Files

Allow you to see additional files directly as C# const. For this, please add some .gen. files to the project.

In your csproj

```xml
<ItemGroup>
 	  <PackageReference Include="rscgutils" Version="2023.502.835" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
<ItemGroup>
	<AdditionalFiles Include="Second.gen.txt" />
	<AdditionalFiles Include="first.gen.txt" />
	<AdditionalFiles Include="test\Afirst.gen.txt" />
	<AdditionalFiles Include="sql/**/*" />
</ItemGroup>
```

In the code

```csharp
//see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string
string x= MyAdditionalFiles.Second_gen_txt;
```

To debug, you can add into the .csproj
```xml
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GeneratedX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

More details at http://msprogrammer.serviciipeweb.ro/2023/05/08/file-to-csharp-const/


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)


