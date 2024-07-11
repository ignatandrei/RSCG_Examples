# RSCG_IFormattable
Roslyn Code Generator for IFormattable

## Usage
Add to your csproj file:
```xml
<ItemGroup>
  <PackageReference Include="RSCG_IFormattable" Version="2024.711.2013" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  <PackageReference Include="RSCG_IFormattableCommon" Version="2024.711.2013" />
</ItemGroup>
```

Add to your source file:
```csharp
[RSCG_IFormattableCommon.AddIFormattable]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
```

And then the result is 
```csharp
using RSCG_IFormattableConsole;

Person person = new ();
person.FirstName = "Andrei";
person.LastName = "Ignat";

Console.WriteLine(person.ToString("The person name is {FirstName} {LastName}",null));
```

