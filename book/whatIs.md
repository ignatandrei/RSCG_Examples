# Introduction

## What is a Roslyn Source Code Generator?

A Roslyn Source Code Generator (RSCG) is a program that generates code in the compile time, based on the previous source code and/or another data. This new source code is added to the compilation and compile with the previous source code.

## How can I make a Roslyn Source Code Generator? 

For creating the RSCG you will simply create a .NET Standard 2.0 project, add those 2 references

``` xml

    <PackageReference Include="Microsoft.CodeAnalysis.Analyzers" Version="3.3.1" PrivateAssets="all" />
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="3.8.0" />

``` 


and start implementing 

``` csharp

public interface ISourceGenerator
{
    void Initialize(GeneratorInitializationContext context);
    void Execute(GeneratorExecutionContext context);
}

```

Start from examples at https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators
Also, you can read the source code for the RSCG presented in this book.


## Show me some code for RSCG

Start read

 https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.md
 
and

https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md .

After that, you can play with the examples from https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators or from https://sourcegen.dev/ (see AutoNotify in the dropdown)


## How the RSCG can help me to write faster / better the code  ?

Glad that you asked. You can see in action a RSCG for automatically generating code for automating testing (see DynamicMocking ) , parsing enum (see Enum ) , generating controllers actions from a interface ( SkinnyControllers ), currying functions and many more. In this book you will find more than 10 examples of some RSCG that can help you. Also, you can find the source code of the examples at  https://github.com/ignatandrei/RSCG_Examples.

