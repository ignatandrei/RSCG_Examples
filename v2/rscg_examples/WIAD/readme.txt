# RSCG_WhatIAmDoing


Instrument C# software on CI to find what the software is doing.


# Introduction

Decide what you want to monitor ... and then monitor it.


# Example

## Packages 

Add the following into the csproj you want to be monitores

```xml
	<ItemGroup>
	  <!-- <PackageReference Include="Microsoft.Extensions.Caching.Memory" Version="8.0.0" /> -->
	  <PackageReference Include="RSCG_WhatIAmDoing" Version="8.2024.10201.735" />
	  <PackageReference Include="RSCG_WhatIAmDoing_Common" Version="8.2024.10201.735" />
    </ItemGroup>

<PropertyGroup>

	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
</PropertyGroup>
```

## Code

### Intercept static methods
Assume that you want to monitor all calls to System.Console 

```csharp
//[ExposeClass(typeof(Encoding), nameof(Encoding.EncodingName))]
//[InterceptStatic("System.IO.File.*ts")]
//[InterceptStatic("System.IO.File.*")]
[InterceptStatic("System.Console.*")] // regex
//[InterceptStatic("WIAD_DemoConsole.Fib.*")]
internal class InterceptorMethodStatic : InterceptorMethodStaticBase, IInterceptorMethodStatic
{
    
}
```

### Intercept instance methods

Assume that you want to monitor all calls to any  method of any instance of Person

```csharp
//[InterceptInstanceClass(typeof(Person),"ame")]
//[InterceptInstanceClass(typeof(Person), "parat")]
//[InterceptInstanceClass(typeof(Person), "ncodi")]
[InterceptInstanceClass(typeof(Person), ".*")] //regex
public class InterceptorMethodInstanceClass: InterceptorMethodInstanceClassBase, IInterceptorMethodInstanceClass
{
    
    public InterceptorMethodInstanceClass()
    {
        
    }

}
```


### See the results

```csharp
var data= CachingData.Methods().ToArray();

foreach (var item in data)
{
    WriteLine($"Method {item.typeAndMethodData.MethodName} from class {item.typeAndMethodData.TypeOfClass} Time: {item.StartedAtDate} state {item.State} ");
    WriteLine($"  =>Arguments: {item.ArgumentsAsString()}");
    if ((item.State & AccumulatedStateMethod.HasResult) == AccumulatedStateMethod.HasResult)
    {
        WriteLine($"  =>Result: {item.Result}");
    }

}

```


# More details

If you want to implement YOUR interception , implement the following interfaces

IInterceptorMethodInstanceClass

IInterceptorMethodStatic


# License

MIT