# RSCG_JSON2Class
Transform any json ( including appsettings ) into a class

## Usage

Install the nuget package into your project

```xml
<ItemGroup>
  <PackageReference Include="RSCG_JSON2Class" Version="2024.2.29.807" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
</ItemGroup>
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	<GenerateDocumentationFile>True</GenerateDocumentationFile>
</PropertyGroup>

```


Verify that the json file is set analyzer ( and , if you want to deserialize, copy to the output directory)

```xml
<ItemGroup>
  <None Remove="testData.json" />
</ItemGroup>
<ItemGroup>
<AdditionalFiles Include="testData.json">
<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
</AdditionalFiles>
</ItemGroup>

```

Access from C# code

```csharp
using System.Text.Json;
var testData = JsonSerializer.Deserialize<JSON2ClassConsole.SettingsJson.testData>(System.IO.File.ReadAllText("testData.json"));
ArgumentNullException.ThrowIfNull(testData);
Console.WriteLine(testData.Logging.LogLevel.Default);
Console.WriteLine(testData.DictData.Number_2);
```

