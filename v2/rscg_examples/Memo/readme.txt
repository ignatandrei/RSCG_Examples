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


## Json2Class

If you have an additional json file, you can have a file from this

```xml
<ItemGroup>
	<AdditionalFiles Include="my.gen.json" />
</ItemGroup>
```

And you can have from the code
```csharp

var json = System.Text.Json.JsonSerializer
    .Deserialize<GeneratedJson.my_gen_json>(MyAdditionalFiles.my_gen_json);

ArgumentNullException.ThrowIfNull( json );
Console.WriteLine( ":hosts"+json.AllowedHosts );

```

## Memoization of function returns

Put _MemoPure and the return of the function will be memo-ized

```csharp
public long Test_MemoPure()
{
    Console.WriteLine("calculating type");
    return this.GetType().ToString().GetHashCode();
}
public async Task<long> fib(long nr)
{
    await Task.Delay(1000);
    //Console.WriteLine("calculated value for " + nr);
    if (nr <= 1) return 1;
    if (nr == 2) return 2;
    return await fib(nr - 1) + await fib(nr - 1);
}

public async Task<long> fibonacci_MemoPure(long nr)
{
    if (nr <= 1) return 1;
    if (nr == 2) return 2;
    await Task.Delay(1000);
    return await fibonacci(nr - 1) + await fibonacci(nr - 1);

}
```

And call

```csharp
fibTest f = new();
Console.WriteLine("first time :" + f.Test());
Console.WriteLine("second time :" + f.Test());

Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("no memo :"+await f.fib(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("memo :" + await f.fibonacci(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));
Console.WriteLine("FAST memo :" + await f.fibonacci(5));
Console.WriteLine(DateTime.Now.ToString("mm_ss"));


```

# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)


