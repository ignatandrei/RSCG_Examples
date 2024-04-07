# CommonCodeGenerator

[![NuGet Badge](https://buildstats.info/nuget/CommonCodeGenerator)](https://www.nuget.org/packages/CommonCodeGenerator/)

## Reference

Add reference to CommonCodeGenerator and CommonCodeGenerator.SourceGenerator to csproj.

```xml
  <ItemGroup>
    <PackageReference Include="CommonCodeGenerator" Version="0.2.0" />
    <PackageReference Include="CommonCodeGenerator.SourceGenerator" Version="0.2.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
```

## ToString

### Source

```cs
[GenerateToString]
public partial class Data
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public int[] Values { get; set; } = default!;

    [IgnoreToString]
    public int Ignore { get; set; }
}
```

### Result

```cs

var data = new Data { Id = 123, Name = "xyz", Values = [1, 2] };
var str = data.ToString();
Assert.Equal("{ Id = 123, Name = xyz, Values = [1, 2] }", str);
```
