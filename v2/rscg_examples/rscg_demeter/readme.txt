# RSCG_Demeter
Demeter Law : http://haacked.com/archive/2009/07/14/law-of-demeter-dot-counting.aspx/


# Usage

Add the package RSCG_Demeter to the csproj

```xml
	<ItemGroup>
    <PackageReference Include="RSCG_Demeter" Version="2026.328.706" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
  </ItemGroup>
```

Then build the project - the analyzer will run and show the errors in the error list.

## Export 

Add this to the csproj

```xml
	<ItemGroup>
		<CompilerVisibleProperty Include="RSCG_Demeter_GenerateFile" />
	</ItemGroup>
	<PropertyGroup>
		<RSCG_Demeter_GenerateFile>../YourProjectName.csproj.txt</RSCG_Demeter_GenerateFile>
	</PropertyGroup>

```

And the file YourProjectName.csproj.txt will be generated with the errors.
