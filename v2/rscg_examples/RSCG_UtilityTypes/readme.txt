# RSCG_UtilityTypes

Omit and Pick from TypeScript : https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

generating also extension for converting from one type to another . See demo project.

## Usage

Add to your csproj file
```xml
  <ItemGroup>
	  <PackageReference Include="RSCG_UtilityTypes" Version="2023.1223.1230" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	  <PackageReference Include="RSCG_UtilityTypesCommon" Version="2023.1223.1230" />
  </ItemGroup>

```

In C# 9.0

```csharp
[Omit("MoviePreviewSmall", nameof(Actors),nameof(Year))]
[Pick("MoviePreviewMinimal", nameof(Title), nameof(Year))]
public class Movie
{
    public string? Title { get; set; }
    public string? Director { get; set; }
    public int Year { get; set; }
    public string[]? Actors { get; set; }
}
```

And 2 new classes will be generated , MoviePreviewSmall and MoviePreviewMinimal