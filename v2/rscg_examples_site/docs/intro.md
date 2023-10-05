---
sidebar_position: 1
---

# Introduction

## What is a Roslyn Source Code Generator?

A Roslyn Source Code Generator (RSCG) is a program that generates code in the compile time, based on the previous source code and/or another data. This new source code is added to the compilation and compile with the previous source code.

## How can I make a Roslyn Source Code Generator? 

For creating the RSCG you will simply create a .NET Standard 2.0 project, add those 2 references

``` xml

    <PackageReference Include="Microsoft.CodeAnalysis.Analyzers"  PrivateAssets="all" />
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp"  />

``` 

For tutorials , it is easiear to start implementing ,even if deprecated

``` csharp

public interface ISourceGenerator
{
    void Initialize(GeneratorInitializationContext context);
    void Execute(GeneratorExecutionContext context);
}

```

After you understand , you can start with v2 IIncrementalGenerator : 
https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md



Start from examples at https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators

Also, you can read the source code for the RSCG presented in this book.



#

## Show me some code for RSCG

Start read

 https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.md
 
and

https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md .

After that, you can play with the examples from https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators or from https://sourcegen.dev/ (see AutoNotify in the dropdown)


Second iteration , incremental generators: https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md 



## How the RSCG can help me to write faster / better the code  ?

Glad that you asked. You can see in action a RSCG for automatically generating code for automating testing (see DynamicMocking ) , parsing enum (see Enum ) , generating controllers actions from a interface ( SkinnyControllers ), currying functions and many more. In this book you will find more than 10 examples of some RSCG that can help you. Also, you can find the source code of the examples at  https://github.com/ignatandrei/RSCG_Examples.

# Is Microsoft using Roslyn Source Code Generators ?

Yes , Microsoft is developing more Generators - for getting rid of reflection - and other tasks.

https://github.com/search?q=repo%3Adotnet%2Fruntime%20IIncrementalGenerator&type=code

https://github.com/search?q=org%3Adotnet+IIncrementalGenerator+language%3AC%23&type=code&l=C%23&p=2



## More Links

First iteration of RSCG: 

https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/

https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview

Second iteration , incremental generators: https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md 

Andrew Lock's blog post on source generators:  https://andrewlock.net/series/creating-a-source-generator/

Also please read 
https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/

Jason Bock on constructing AutoDeconstruct : https://codemag.com/Article/2305061/Writing-Code-to-Generate-Code-in-C#

How to debug a RSCG: https://github.com/JoanComasFdz/dotnet-how-to-debug-source-generator-vs2022

CheatSheet for RSCG: https://notanaverageman.github.io/2020/12/07/cs-source-generators-cheatsheet.html

Pawel Gerr on RSCG: https://www.thinktecture.com/en/net/roslyn-source-generators-introduction/

Unity: https://docs.unity3d.com/Packages/com.unity.roslyn@0.2/manual/index.html

Other sites with RSCG:

https://github.com/amis92/csharp-source-generators

https://github.com/ironcev/awesome-roslyn#source-generators

Nuget:

https://www.nuget.org/packages?q=Tags%3A%22SourceGenerator%22