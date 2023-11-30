# RSCG_InterceptorTemplate

Interceptor template - supported from >= .NET 8.0 . Uses also experimental interceptor feature from C#12.0

It can rewrite any method call to any other method call. It can also rewrite any method call to any other method call with the same signature. It can also rewrite any method call to any other method call with the same signature and the same return type.

It does not ( yet ) support generic methods.

For example, if you have a method call like this:

```csharp
Console.WriteLine("and now with argument " + newPerson.TestFullNameWithArguments("<","!+",">",2));
```

it can intercept it with the arguments .

For example, if you use this template 

```csharp
public static {{(ser.item.HasTaskReturnType?"async":"")}} {{ser.item.TypeReturn}} {{ser.item.MethodSignature}}({{ser.item.ThisArgument}} {{ser.item.ArgumentsForCallMethod}} )  
{
    var cc=Console.BackgroundColor ;
    try{
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.WriteLine("start specific TestFullNameWithArguments template-->{{ser.item.MethodSignature}}");
        Console.WriteLine("number of arguments = {{ser.item.Arguments.size}}");
        {{ for argum in ser.item.Arguments }}
        Console.WriteLine("argument {{for.index+1}} type {{argum.Type}} and value = "+ {{argum.Name}});
        {{ end }}
        {{ser.item.ReturnString}} {{(ser.item.HasTaskReturnType ? "await" : "")}} {{ser.item.CallMethod}};
    }
    finally{
        Console.WriteLine("end specific template-->{{ser.item.MethodSignature}}");
        Console.BackgroundColor = cc;
    }
}
```

The final result will be:

```csharp
public static  string Intercept_newPerson_TestFullNameWithArguments(this RSCG_DemoObjects.Person newPerson ,string start,string separator,string end,int repeat )  
{
    var cc=Console.BackgroundColor ;
    try{
        Console.BackgroundColor = ConsoleColor.DarkRed;
        Console.WriteLine("start specific TestFullNameWithArguments template-->Intercept_newPerson_TestFullNameWithArguments");
        Console.WriteLine("number of arguments = 4");
        Console.WriteLine("argument 1 type string and value = "+ start);
        Console.WriteLine("argument 2 type string and value = "+ separator);
        Console.WriteLine("argument 3 type string and value = "+ end);
        Console.WriteLine("argument 4 type int and value = "+ repeat);
        return  newPerson.TestFullNameWithArguments(start,separator,end,repeat);
    }
    finally{
        Console.WriteLine("end specific template-->Intercept_newPerson_TestFullNameWithArguments");
        Console.BackgroundColor = cc;
    }
}
```

You can use any template . Some examples at src/RSCG_InterceptorTemplateConsole/Interceptors


## How to use it


Add to your project (>= .NET 8 ) the nuget package RSCG_InterceptorTemplate

```xml
<ItemGroup>
 <PackageReference Include="RSCG_InterceptorTemplate" Version="8.2023.2811.524" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
<PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);RSCG_InterceptorTemplate</InterceptorsPreviewNamespaces>
</PropertyGroup>
```

Make a folder Interceptors in the project and add also at least the generic interceptor ( see templates at src/RSCG_InterceptorTemplateConsole/Interceptors/ , start with GenericInterceptorForAllMethods.txt )

```csharp

```xml
  <ItemGroup>
    <!-- <AdditionalFiles Include="Interceptors\TestFullNameWithArguments.txt">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </AdditionalFiles> -->
    <AdditionalFiles Include="Interceptors\GenericInterceptorForAllMethods.txt">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </AdditionalFiles>
  </ItemGroup>
```

The interceptor will not run template at build time in Visual Studiom, but it will run at build time in dotnet build.

For this, you need to have something like that ( powershell file) -I named mine compile.ps1

```powershell
cls
#not necessary for CI builds, but only for debugging purposes
Write-Host "delete obj and bin"
gci obj -recurse | foreach{ri $_.FullName -recurse -force }
gci bin -recurse | foreach{ri $_.FullName -recurse -force }
#for windows batch file 
#setx InterceptMethods "FullName"
#echo Environment variable InterceptMethods has been set to %InterceptMethods%
#put here the names of the methods you want to intercept , separated by ;
$env:InterceptMethods = "FullName;Test;PersonsLoaded;TestFullNameWithArguments;ShowRandomPersonNumber;Connect;SavePerson;InsertPerson"
Write-Host "Environment variable  $env:InterceptMethods  has been set to " $env:InterceptMethods
dotnet clean
dotnet restore
dotnet build /p:EmitCompilerGeneratedFiles=true --disable-build-servers --force
#debug only
# dotnet run --project RSCG_InterceptorTemplateConsole/RSCG_InterceptorTemplateConsole.csproj

```

Enjoy!