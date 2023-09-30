# RSCG_Decorator
Decorator for classes , permit to know when method start and ends


## Usage

Add reference to RSCG_Decorator and RSCG_DecoratorCommon

```xml
<ItemGroup>
	
	  <PackageReference Include="RSCG_Decorator" Version="7.2023.930.2116" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
	  <PackageReference Include="RSCG_DecoratorCommon" Version="7.2023.930.2116" />
</ItemGroup>
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
	
```

For any class that you want to intercept methods, implement interface IDecoratorMethodV1

See example at the RSCG_DecoratorTestConsole

```csharp
public partial class Person : IDecoratorMethodV1
{
    public void EndMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("end "+recognizer.UniqueId);
    }

   
    public void ExceptionMethod(Exception ex, MethodRecognizer recognizer)
    {
        logger.LogError(ex, "exception on " + recognizer.UniqueId+ " Value Parameters:" + recognizer.ValueTypeParametersString); 
    }


    public void StartMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("start " + recognizer.UniqueId + " Value Parameters:"+recognizer.ValueTypeParametersString);
   }
}
```

## Usage with ASP.NET Core - or any DI framework

Let's take Person with interface IPerson. You have the following:

```csharp
serviceCollection 
          .AddTransient<IPerson, Person>();

```
You can add this as the latest

```csharp
serviceCollection = serviceCollection
     .AddTransient<Person, Person>()
     .AddTransient<IPerson, Person_Decorator>();
     
```

And when asking for IPerson , the last wins:

```csharp

var data = serviceProvider.GetRequiredService<IPerson>();
//obtaining Person_Decorator because is the last one

```

