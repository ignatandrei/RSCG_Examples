# RSCG_WaitAndOptions


Wait pending compilation  and see compiling options 

This package is just for demo purposes and it is not intended to be used in production code.

More details at https://ignatandrei.github.io/RSCG_Examples/v2/docs/GoodPractices

# How to use

Add the Nuget package RSCG_WaitAndOptions to your project and use the following code:

```xml
<ItemGroup>
	<CompilerVisibleProperty Include="RSCG_Wait_Seconds" />
</ItemGroup>
<PropertyGroup>
	<RSCG_Wait_Seconds>10</RSCG_Wait_Seconds>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="RSCG_WaitAndOptions" Version="2024.2.24.1940" 
					OutputItemType="Analyzer" ReferenceOutputAssembly="false" 
					/>
</ItemGroup>

```

And then compile the code . You will see in obj/GX the code generated

And you can access by 


```csharp
Console.WriteLine(RSCG_Wait.MyGeneratedCode.DateStart);
Console.WriteLine(RSCG_Wait.MyGeneratedCode.SecondsToWait);
Console.WriteLine(RSCG_Wait.MyGeneratedCode.DateEnd);
Console.WriteLine(RSCG_Wait.OptionsFromBuild.build_property_projectdir);
```