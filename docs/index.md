-   [About this book](#about-this-book)
    -   [Content of the book](#content-of-the-book)
    -   [Are those examples ready for
        production?](#are-those-examples-ready-for-production)
    -   [How to read this book](#how-to-read-this-book)
    -   [I have a suggestion for a new RSCG that is worth mentioning in
        this book. What can I
        do?](#i-have-a-suggestion-for-a-new-rscg-that-is-worth-mentioning-in-this-book-what-can-i-do)
    -   [I want to make a RSCG that will be useful. How can I
        do?](#i-want-to-make-a-rscg-that-will-be-useful-how-can-i-do)
    -   [I want the book / sponsor you](#i-want-the-book--sponsor-you)
-   [Introduction](#introduction)
    -   [What is a Roslyn Source Code
        Generator?](#what-is-a-roslyn-source-code-generator)
    -   [How can I make a Roslyn Source Code
        Generator?](#how-can-i-make-a-roslyn-source-code-generator)
    -   [Show me some code for RSCG](#show-me-some-code-for-rscg)
    -   [How the RSCG can help me to write faster / better the code
        ?](#how-the-rscg-can-help-me-to-write-faster--better-the-code-)
-   [RSCG number 1 : ThisAssembly](#rscg-number-1--thisassembly)
    -   [What RSCG ThisAssembly can do](#what-rscg-thisassembly-can-do)
    -   [Example code](#example-code)
    -   [More details about RSCG
        ThisAssembly](#more-details-about-rscg-thisassembly)
-   [RSCG number 2 : Enum](#rscg-number-2--enum)
    -   [What RSCG Enum can do](#what-rscg-enum-can-do)
    -   [Example code](#example-code-1)
    -   [More details about RSCG Enum](#more-details-about-rscg-enum)
-   [RSCG number 3 :
    JsonByExampleGenerator](#rscg-number-3--jsonbyexamplegenerator)
    -   [What RSCG JsonByExampleGenerator can
        do](#what-rscg-jsonbyexamplegenerator-can-do)
    -   [Example code](#example-code-2)
    -   [More details about RSCG
        JsonByExampleGenerator](#more-details-about-rscg-jsonbyexamplegenerator)
    -   [Author of JsonByExampleGenerator , Robin
        Hermanussen](#author-of-jsonbyexamplegenerator--robin-hermanussen)
-   [RSCG number 4 : CopyConstructor +
    Deconstructor](#rscg-number-4--copyconstructor--deconstructor)
    -   [What RSCG CopyConstructor + Deconstructor can
        do](#what-rscg-copyconstructor--deconstructor-can-do)
    -   [Example code](#example-code-3)
    -   [More details about RSCG CopyConstructor +
        Deconstructor](#more-details-about-rscg-copyconstructor--deconstructor)
-   [RSCG number 5 : GeneratedMapper](#rscg-number-5--generatedmapper)
    -   [What RSCG GeneratedMapper can
        do](#what-rscg-generatedmapper-can-do)
    -   [Example code](#example-code-4)
    -   [More details about RSCG
        GeneratedMapper](#more-details-about-rscg-generatedmapper)
    -   [Author of GeneratedMapper , Thomas
        Bleijendaal](#author-of-generatedmapper--thomas-bleijendaal)
-   [RSCG number 6 : Skinny
    Controllers](#rscg-number-6--skinny-controllers)
    -   [What RSCG Skinny Controllers can
        do](#what-rscg-skinny-controllers-can-do)
    -   [Example code](#example-code-5)
    -   [More details about RSCG Skinny
        Controllers](#more-details-about-rscg-skinny-controllers)
-   [RSCG number 7 :
    data-builder-generator](#rscg-number-7--data-builder-generator)
    -   [What RSCG data-builder-generator can
        do](#what-rscg-data-builder-generator-can-do)
    -   [Example code](#example-code-6)
    -   [More details about RSCG
        data-builder-generator](#more-details-about-rscg-data-builder-generator)
    -   [Author of data-builder-generator , Martin Andreas
        Ulrich](#author-of-data-builder-generator--martin-andreas-ulrich)
-   [RSCG number 8 : Metadata from
    object](#rscg-number-8--metadata-from-object)
    -   [What RSCG Metadata from object can
        do](#what-rscg-metadata-from-object-can-do)
    -   [Example code](#example-code-7)
    -   [More details about RSCG Metadata from
        object](#more-details-about-rscg-metadata-from-object)
-   [RSCG number 9 :
    MockSourceGenerator](#rscg-number-9--mocksourcegenerator)
    -   [What RSCG MockSourceGenerator can
        do](#what-rscg-mocksourcegenerator-can-do)
    -   [Example code](#example-code-8)
    -   [More details about RSCG
        MockSourceGenerator](#more-details-about-rscg-mocksourcegenerator)
    -   [Author of MockSourceGenerator , Robin
        Hermanussen](#author-of-mocksourcegenerator--robin-hermanussen)
-   [RSCG number 10 : Method
    decorator](#rscg-number-10--method-decorator)
    -   [What RSCG Method decorator can
        do](#what-rscg-method-decorator-can-do)
    -   [Example code](#example-code-9)
    -   [More details about RSCG Method
        decorator](#more-details-about-rscg-method-decorator)
-   [RSCG number 11 :
    PartiallyApplied](#rscg-number-11--partiallyapplied)
    -   [What RSCG PartiallyApplied can
        do](#what-rscg-partiallyapplied-can-do)
    -   [Example code](#example-code-10)
    -   [More details about RSCG
        PartiallyApplied](#more-details-about-rscg-partiallyapplied)
-   [RSCG number 12 : IFormattable](#rscg-number-12--iformattable)
    -   [What RSCG IFormattable can do](#what-rscg-iformattable-can-do)
    -   [Example code](#example-code-11)
    -   [More details about RSCG
        IFormattable](#more-details-about-rscg-iformattable)
-   [RSCG number 13 : AutoInterface](#rscg-number-13--autointerface)
    -   [What RSCG AutoInterface can
        do](#what-rscg-autointerface-can-do)
    -   [Example code](#example-code-12)
    -   [More details about RSCG
        AutoInterface](#more-details-about-rscg-autointerface)
    -   [Author of AutoInterface ,
        beakona](#author-of-autointerface--beakona)
-   [RSCG number 14 : Property Expression
    Generator](#rscg-number-14--property-expression-generator)
    -   [What RSCG Property Expression Generator can
        do](#what-rscg-property-expression-generator-can-do)
    -   [Example code](#example-code-13)
    -   [More details about RSCG Property Expression
        Generator](#more-details-about-rscg-property-expression-generator)
-   [RSCG number 15 : Transplator](#rscg-number-15--transplator)
    -   [What RSCG Transplator can do](#what-rscg-transplator-can-do)
    -   [Example code](#example-code-14)
    -   [More details about RSCG
        Transplator](#more-details-about-rscg-transplator)
-   [RSCG number 16 : RSCG\_AMS](#rscg-number-16--rscg_ams)
    -   [What RSCG RSCG\_AMS can do](#what-rscg-rscg_ams-can-do)
    -   [Example code](#example-code-15)
    -   [More details about RSCG
        RSCG\_AMS](#more-details-about-rscg-rscg_ams)
-   [RSCG number 17 :
    HttpClientGenerator](#rscg-number-17--httpclientgenerator)
    -   [What RSCG HttpClientGenerator can
        do](#what-rscg-httpclientgenerator-can-do)
    -   [Example code](#example-code-16)
    -   [More details about RSCG
        HttpClientGenerator](#more-details-about-rscg-httpclientgenerator)
    -   [Author of HttpClientGenerator , Jalal Amini
        Robati](#author-of-httpclientgenerator--jalal-amini-robati)
-   [RSCG - worth mention](#rscg---worth-mention)
-   [Final Chapter](#final-chapter)
    -   [Conclusion](#conclusion)
    -   [One hour of free consultancy](#one-hour-of-free-consultancy)

## About this book

### Content of the book

You will find in this book code examples about &gt;10 Roslyn Source Code
Generator (RSCG) that can be useful for you. That means, you will write
more elegant and concise code - even if the generators code is not
always nice to look.

### Are those examples ready for production?

I have done due diligence to test the RSCG that I have shown to you
here. However, I cannot guarantee that will fit your code. That means
that you can test it for your case and, because all are open source on
Github.com, you can contribute to improve them ;-)

### How to read this book

For each chapter, you will find

1.  Name of the RSCG and link to the NuGet package / GitHub repository
2.  What the RSCG can do
3.  What you need to include in .csproj file
4.  What will be the initial code
5.  How to use the Code generated by RSCG
6.  Code Generated by RSCG
7.  Link to the downloadable code to practice

### I have a suggestion for a new RSCG that is worth mentioning in this book. What can I do?

Please send me an email to <ignatandrei@yahoo.com>

### I want to make a RSCG that will be useful. How can I do?

In the introduction I have put the links to get you started with RSCG.

And, if you bought this book from Amazon, you are entitled to have 1
hour free of consultancy with me. I can help you make one.

### I want the book / sponsor you

Glad that you have asked. Please goto Amazon: <https://amzn.to/3f6gll3>

( and this will remain free:
<https://ignatandrei.github.io/RSCG_Examples/>)

## Introduction

### What is a Roslyn Source Code Generator?

A Roslyn Source Code Generator (RSCG) is a program that generates code
in the compile time, based on the previous source code and/or another
data. This new source code is added to the compilation and compile with
the previous source code.

### How can I make a Roslyn Source Code Generator?

For creating the RSCG you will simply create a .NET Standard 2.0
project, add those 2 references

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

Start from examples at
<https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators>
Also, you can read the source code for the RSCG presented in this book.

### Show me some code for RSCG

Start read

<https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.md>

and

<https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md>
.

After that, you can play with the examples from
<https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators>
or from <https://sourcegen.dev/> (see AutoNotify in the dropdown)

### How the RSCG can help me to write faster / better the code ?

Glad that you asked. You can see in action a RSCG for automatically
generating code for automating testing (see DynamicMocking ) , parsing
enum (see Enum ) , generating controllers actions from a interface (
SkinnyControllers ), currying functions and many more. In this book you
will find more than 10 examples of some RSCG that can help you. Also,
you can find the source code of the examples at
<https://github.com/ignatandrei/RSCG_Examples>.

## RSCG number 1 : ThisAssembly

### What RSCG ThisAssembly can do

The ThisAssembly.Info allows you access to the Assembly Information as
constants, instead of going to reflection each time. I found useful to
see the assembly version right away in any project that I have.

### Example code

#### Here is the csproj with the references for RSCG ThisAssembly

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/ExistingCode.cs)
</small>

#### The code below will use the RSCG ThisAssembly

![usage](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/Usage.cs)
<small>

#### The code that is generated by RSCG ThisAssembly

![gc](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/GeneratedCode.cs)
</small>

### More details about RSCG ThisAssembly

The author of **RSCG ThisAssembly** is *Daniel Cazzulino*

You cand find **RSCG ThisAssembly** at Nuget.org :
<https://www.nuget.org/packages/ThisAssembly> and the sources at
<https://github.com/devlooped/ThisAssembly>

For more usage features please read :
<https://www.clarius.org/ThisAssembly/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion>](https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion)

## RSCG number 2 : Enum

### What RSCG Enum can do

This will generate code to fast parsing a int or a string to an enum

### Example code

#### Here is the csproj with the references for RSCG Enum

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Enum/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Enum/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Enum/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Enum/ExistingCode.cs)
</small>

#### The code below will use the RSCG Enum

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Enum/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Enum/Usage.cs)
<small>

#### The code that is generated by RSCG Enum

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Enum/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Enum/GeneratedCode.cs)
</small>

### More details about RSCG Enum

The author of **RSCG Enum** is *Andrei Ignat*

You cand find **RSCG Enum** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum>](https://github.com/ignatandrei/RSCG_Examples/tree/main/Enum)

## RSCG number 3 : JsonByExampleGenerator

### What RSCG JsonByExampleGenerator can do

This will generate C\# classes from json files.

### Example code

#### Here is the csproj with the references for RSCG JsonByExampleGenerator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/ExistingCode.cs)
</small>

#### The code below will use the RSCG JsonByExampleGenerator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/Usage.cs)
<small>

#### The code that is generated by RSCG JsonByExampleGenerator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/JsonByExampleGenerator/GeneratedCode.cs)
</small>

### More details about RSCG JsonByExampleGenerator

The author of **RSCG JsonByExampleGenerator** is *Robin Hermanussen*

You cand find **RSCG JsonByExampleGenerator** at Nuget.org :
<https://www.nuget.org/packages/JsonByExampleGenerator/> and the sources
at <https://github.com/hermanussen/JsonByExampleGenerator/>

For more usage features please read :
<https://github.com/hermanussen/JsonByExampleGenerator/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass>](https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass)

### Author of JsonByExampleGenerator , Robin Hermanussen

#### Short info about you , Robin Hermanussen

I'm a Software Architect at Iquality (software company in the
Netherlands). I'm passionate about software development in general, but
with a particular interest in .NET.

#### Why did you start this JsonByExampleGenerator ?

I have written a bunch of C\# analyzers in the past that served specific
needs and now wanted to get some experience in writing source
generators. It seemed like a good idea to me to generate classes based
on example JSON, because it replaces a task that I often find a bit
tedious; writing data contract classes and then tests to ensure they get
properly (de)serialized with the JSON that I'm using.

#### How do yourself use your JsonByExampleGenerator ?

I'm not really using it in real world projects right now, as I'm not
working on any projects that require it.

#### What other RSCG do you use ?

I've used ThisAssembly and a few others, for learning purposes.

#### Any other feedback ?

If anyone wants to use JsonByExampleGenerator and give me feedback from
the real world, let me know! I'll be happy to help out with any issues
or questions you may run into. Just add an issue to the project on
GitHub to get in touch.

## RSCG number 4 : CopyConstructor + Deconstructor

### What RSCG CopyConstructor + Deconstructor can do

This will generate code for a POCO to generate copy constructor and
deconstructor

### Example code

#### Here is the csproj with the references for RSCG CopyConstructor + Deconstructor

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/ExistingCode.cs)
</small>

#### The code below will use the RSCG CopyConstructor + Deconstructor

![usage](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/Usage.cs)
<small>

#### The code that is generated by RSCG CopyConstructor + Deconstructor

![gc](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/CopyConstructor%20+%20Deconstructor/GeneratedCode.cs)
</small>

### More details about RSCG CopyConstructor + Deconstructor

The author of **RSCG CopyConstructor + Deconstructor** is *Andrei Ignat*

You cand find **RSCG CopyConstructor + Deconstructor** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor>](https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor)

## RSCG number 5 : GeneratedMapper

### What RSCG GeneratedMapper can do

AutoMapping from a POCO to a DTO. Lots of customizations

### Example code

#### Here is the csproj with the references for RSCG GeneratedMapper

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/ExistingCode.cs)
</small>

#### The code below will use the RSCG GeneratedMapper

![usage](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/Usage.cs)
<small>

#### The code that is generated by RSCG GeneratedMapper

![gc](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/GeneratedMapper/GeneratedCode.cs)
</small>

### More details about RSCG GeneratedMapper

The author of **RSCG GeneratedMapper** is *Thomas Bleijendaal*

You cand find **RSCG GeneratedMapper** at Nuget.org :
<https://www.nuget.org/packages/GeneratedMapper/> and the sources at
<https://github.com/ThomasBleijendaal/GeneratedMapper>

For more usage features please read :
<https://github.com/ThomasBleijendaal/GeneratedMapper>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper>](https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper)

### Author of GeneratedMapper , Thomas Bleijendaal

#### Short info about you , Thomas Bleijendaal

I'm Thomas Bleijendaal, I'm a .NET developer working for Triple in
Alkmaar, The Netherlands.

#### Why did you start this GeneratedMapper ?

I've started GeneratedMapper to get more familiar with source
generation. While the tooling is a bit rough now, I do believe that this
feature can really bring a lot of value to .NET.

I've been burned before by a lot of hard-to-find bugs caused by badly
behaving mappers and runtime surprises from badly handled
null-references. I wanted to create a object-to-object mapper that would
be very picky and raise compilation errors instead of runtime
exceptions. Being able to see what the mapper will do by simply
inspecting the code is very handy, and makes you trust your mapper even
more.

#### How do yourself use your GeneratedMapper ?

I use the GeneratedMapper in a project where I map models coming from
Contentful to DTOs that are used in views. I've also tried to use it in
another project, but because that targeted an older runtime I could not
make that work. But, since I could copy all the generated mappers and
maintain those manually, switching away from it wasn't that bad. I think
that is also very valuable of code generation, you still have a copy of
what a generator made for you.

#### What other RSCG do you use ?

I haven't really used any other RSCGs yet, other than a metadata
generator that Microsoft made for the out-of-process .NET-based Azure
Functions (<https://github.com/Azure/azure-functions-dotnet-worker/>).
That stuff is all very preview still, so it could be removed from the
product, but it's cool to see Microsoft starting to use it too.

#### Any other feedback ?

Cool book!

## RSCG number 6 : Skinny Controllers

### What RSCG Skinny Controllers can do

This will generate code for WebAPI for each method of a field in the
controller

### Example code

#### Here is the csproj with the references for RSCG Skinny Controllers

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/ExistingCode.cs)
</small>

#### The code below will use the RSCG Skinny Controllers

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/Usage.cs)
<small>

#### The code that is generated by RSCG Skinny Controllers

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Skinny%20Controllers/GeneratedCode.cs)
</small>

### More details about RSCG Skinny Controllers

The author of **RSCG Skinny Controllers** is *Andrei Ignat*

You cand find **RSCG Skinny Controllers** at Nuget.org :
<https://www.nuget.org/packages/SkinnyControllersCommon/>
<https://www.nuget.org/packages/SkinnyControllersGenerator/> and the
sources at <http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers>](https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers)

## RSCG number 7 : data-builder-generator

### What RSCG data-builder-generator can do

Implements the Builder Design pattern for any class. Useful , at least,
for test projects

### Example code

#### Here is the csproj with the references for RSCG data-builder-generator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/ExistingCode.cs)
</small>

#### The code below will use the RSCG data-builder-generator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/Usage.cs)
<small>

#### The code that is generated by RSCG data-builder-generator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/data-builder-generator/GeneratedCode.cs)
</small>

### More details about RSCG data-builder-generator

The author of **RSCG data-builder-generator** is *Martin Andreas Ulrich*

You cand find **RSCG data-builder-generator** at Nuget.org :
<https://www.nuget.org/packages/DasMulli.DataBuilderGenerator/> and the
sources at <https://github.com/dasMulli/data-builder-generator>

For more usage features please read :
<https://github.com/dasMulli/data-builder-generator>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder>](https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder)

### Author of data-builder-generator , Martin Andreas Ulrich

#### Short info about you , Martin Andreas Ulrich

I am a software engineer working on diverse tech stacks but focusing
mostly on .NET in C\#, Web Technologies and iOS/Swift.

I am a technology enthusiast who always works on improving development
and DevOps processes at our company to make life easier for developers
and help deliver high. I was awarded Microsoft MVP for community and
open-source work around .NET Core.

#### Why did you start this data-builder-generator ?

#### How do yourself use your data-builder-generator ?

In "enterprise" contexts (I hate that term) one usually has to deal with
business logic working on data objects. Writing tests is really
important in these contexts but creating lots of test data for various
scenarios can be quite cumbersome. You usually have some set of defaults
(e.g. a base order with a dummy customer and items, an insurance
application from a dummy customer etc.) and then deviate from it a
little for each scenario. This is where C\# 9 records would come in
handy, but they were at the time not released and adopting them could be
challenging (e.g. proper EF support while we're still on EF Core 3.1
anyway) so we opted for a test data builder approach where the builder
classes would be generated. I did something similar a few years back at
a previous company based on
<https://github.com/AArnott/CodeGeneration.Roslyn> (which is now
archived in favor of rolsyn source generators) and decided that for a
current project I'll have a go and try to create something similar based
on roslyn. While there are still a few bugs in the generator (get-only
properties for example), this works quite well just annotating all EF
model POCOs and then creating a few default builders that can be used
from tests (Think TestData.DefaultOrder.WithoutCustomerAddress().Build()
- extension methods are useful here as well to reuse builder functions
that have a business meaning (.WithChecksumMismatchingIBAN())). I hope
that many of these concerns can be solved with records in the future, so
each .WithXYZ() can be done as a proper with-expression. But until then,
autogenerating builder patterns is a good approach. I wanted to hold off
refactoring / fixing bugs for advanced use cases until a few first-party
generators exist and we know what performance pitfalls to look out for.
Since we were using them when generators were in preview, we also had to
deal with breaking changes in the API which was a bit of pain.

#### What other RSCG do you use ?

Currently this is the only one. I hope that OpenAPI processing /
generation will be a source generator soon - this is currently patched
in via NSwag/MSBuild for some projects.

#### Any other feedback ?

As mentioned I hope that some patterns of how to implement fast source
generators emerge. This one likely isn't the best but I wanted to hold
off a few months before refactoring. I don't plan on making a huge deal
out of it, I just thought it's good to put useful tools we're building
on GitHub for discussion and maybe it helps someone else as well.

## RSCG number 8 : Metadata from object

### What RSCG Metadata from object can do

This will generate code to retrieve the values of properties directly,
not by reflection

### Example code

#### Here is the csproj with the references for RSCG Metadata from object

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/ExistingCode.cs)
</small>

#### The code below will use the RSCG Metadata from object

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/Usage.cs)
<small>

#### The code that is generated by RSCG Metadata from object

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Metadata%20from%20object/GeneratedCode.cs)
</small>

### More details about RSCG Metadata from object

The author of **RSCG Metadata from object** is *Andrei Ignat*

You cand find **RSCG Metadata from object** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/MetadataFromObject>](https://github.com/ignatandrei/RSCG_Examples/tree/main/MetadataFromObject)

## RSCG number 9 : MockSourceGenerator

### What RSCG MockSourceGenerator can do

This will generate Mock classes directly for any interface - with your
implementation.

### Example code

#### Here is the csproj with the references for RSCG MockSourceGenerator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/ExistingCode.cs)
</small>

#### The code below will use the RSCG MockSourceGenerator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/Usage.cs)
<small>

#### The code that is generated by RSCG MockSourceGenerator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/MockSourceGenerator/GeneratedCode.cs)
</small>

### More details about RSCG MockSourceGenerator

The author of **RSCG MockSourceGenerator** is *Robin Hermanussen*

You cand find **RSCG MockSourceGenerator** at Nuget.org :
<https://www.nuget.org/packages/MockSourceGenerator/> and the sources at
<https://github.com/hermanussen/MockSourceGenerator/>

For more usage features please read :
<https://github.com/hermanussen/MockSourceGenerator/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking>](https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking)

### Author of MockSourceGenerator , Robin Hermanussen

#### Short info about you , Robin Hermanussen

I'm a Software Architect at Iquality (software company in the
Netherlands). I'm passionate about software development in general, but
with a particular interest in .NET.

#### Why did you start this MockSourceGenerator ?

I have written a bunch of C\# analyzers in the past that served specific
needs and now wanted to get some experience in writing source
generators. The thing about libraries like Moq or NSubstitute that I
don't really like is how it takes so much code to set them up and then I
don't find them very readable. MockSourceGenerator takes an approach
that allows people to mock something in a single statement (with an
object initializer) and I think it is more readable this way.

#### How do yourself use your MockSourceGenerator ?

I'm not really using it in real world projects right now, as I'm not
working on any projects that require it.

#### What other RSCG do you use ?

I've used ThisAssembly and a few others, for learning purposes.

#### Any other feedback ?

If anyone wants to use MockSourceGenerator and give me feedback from the
real world, let me know! I'll be happy to help out with any issues or
questions you may run into. Just add an issue to the project on GitHub
to get in touch.

## RSCG number 10 : Method decorator

### What RSCG Method decorator can do

This will generate code to decorate methods with anything you want (
stopwatch, logging , authorization...)

### Example code

#### Here is the csproj with the references for RSCG Method decorator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/ExistingCode.cs)
</small>

#### The code below will use the RSCG Method decorator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/Usage.cs)
<small>

#### The code that is generated by RSCG Method decorator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Method%20decorator/GeneratedCode.cs)
</small>

### More details about RSCG Method decorator

The author of **RSCG Method decorator** is *Andrei Ignat*

You cand find **RSCG Method decorator** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/MethodDecorator>](https://github.com/ignatandrei/RSCG_Examples/tree/main/MethodDecorator)

## RSCG number 11 : PartiallyApplied

### What RSCG PartiallyApplied can do

This will generate curry for your functions

### Example code

#### Here is the csproj with the references for RSCG PartiallyApplied

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/ExistingCode.cs)
</small>

#### The code below will use the RSCG PartiallyApplied

![usage](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/Usage.cs)
<small>

#### The code that is generated by RSCG PartiallyApplied

![gc](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/GeneratedCode.cs)
</small>

### More details about RSCG PartiallyApplied

The author of **RSCG PartiallyApplied** is *Jason Bock*

You cand find **RSCG PartiallyApplied** at Nuget.org :
<https://www.nuget.org/packages/PartiallyApplied/> and the sources at
<https://github.com/JasonBock/PartiallyApplied>

For more usage features please read :
<https://github.com/JasonBock/PartiallyApplied>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/PartiallyFunction>](https://github.com/ignatandrei/RSCG_Examples/tree/main/PartiallyFunction)

## RSCG number 12 : IFormattable

### What RSCG IFormattable can do

This will generate code to add IFormattable to any class, based on the
properties of the class

### Example code

#### Here is the csproj with the references for RSCG IFormattable

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/ExistingCode.cs)
</small>

#### The code below will use the RSCG IFormattable

![usage](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/Usage.cs)
<small>

#### The code that is generated by RSCG IFormattable

![gc](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/IFormattable/GeneratedCode.cs)
</small>

### More details about RSCG IFormattable

The author of **RSCG IFormattable** is *Andrei Ignat*

You cand find **RSCG IFormattable** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/IFormattable>](https://github.com/ignatandrei/RSCG_Examples/tree/main/IFormattable)

## RSCG number 13 : AutoInterface

### What RSCG AutoInterface can do

Implement the Design Pattern Decorator. Based on template - you can
modify the source code generated

### Example code

#### Here is the csproj with the references for RSCG AutoInterface

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/ExistingCode.cs)
</small>

#### The code below will use the RSCG AutoInterface

![usage](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/Usage.cs)
<small>

#### The code that is generated by RSCG AutoInterface

![gc](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/AutoInterface/GeneratedCode.cs)
</small>

### More details about RSCG AutoInterface

The author of **RSCG AutoInterface** is *beakona*

You cand find **RSCG AutoInterface** at Nuget.org :
<https://www.nuget.org/packages/BeaKona.AutoInterfaceGenerator> and the
sources at <https://github.com/beakona/AutoInterface>

For more usage features please read :
<https://github.com/beakona/AutoInterface>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Decorator>](https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Decorator)

### Author of AutoInterface , beakona

#### Short info about you , beakona

I am a dad and software developer with more than 15 years of working
experience in various industries and technologies. I am working mostly
on embedded and desktop solutions mainly in C and C\#.

#### Why did you start this AutoInterface ?

After the Source Generator public announcement, I decided to give them a
try. I realized that Source Generators would allow us to explore
composition-over-inheritance in its new form (from C\# perspective).
Technically, this approach uses interface invocation (which impacts
performance) but one can view it as one form of composition. I consider
myself a language designer and I wanted to explore the mechanics of this
approach (regardless of poor performance) on existing and reputable
language that I use daily.

#### How do yourself use your AutoInterface ?

I use it experimentally as a tool that allows a class to be
composed-of-members and yet acts as inherited-as. Young and experimental
languages have similar concepts as an alternative to inheritance. Those
who find this interesting can explore the approach chosen by Jonathan
Blow in its language Jai

#### What other RSCG do you use ?

There is only one Source Generator that I use in production; AutoCoder
and it is not public because I didn't find time to make it configurable
and polished. It automatically implements ICoding interface for the
target class (Bridge pattern). I have been using this approach for years
because the existing infrastructure does not work for me. The main
concept is inspired by Foundation framework class NSCoder but is
implemented in the C\# way. Abstraction-side has two directions
IEncoding/IDecoding and there are two implementers: IEncoder<IEncoding>
and IDecoder<IDecoding>. AutoCoder acts on behalf of the abstraction
side by offering targeted fields/properties to IEncoder/IDecoder. The
author of IEncoder/IDecoder can decide what, how, when, and in which
context to encode/decode. In other words, AutoCoder automates boring
stuff and does not make typos.

#### Any other feedback ?

If you have special, funny, or helpful paragraphs that acts like mentor
or life coach concept I think there is worth mentioning TED talk: Why
you will fail to have a great career by Larry Smith or book: "Hold on to
Your Kids: Why Parents Need to Matter More Than Peers", 2019, by Dr.
Gabor Mat&eacute; and Gordon Neufeld.

## RSCG number 14 : Property Expression Generator

### What RSCG Property Expression Generator can do

This will generate code to add function to be used with Entity Framework
to search for any property of a class

### Example code

#### Here is the csproj with the references for RSCG Property Expression Generator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/ExistingCode.cs)
</small>

#### The code below will use the RSCG Property Expression Generator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/Usage.cs)
<small>

#### The code that is generated by RSCG Property Expression Generator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Property%20Expression%20Generator/GeneratedCode.cs)
</small>

### More details about RSCG Property Expression Generator

The author of **RSCG Property Expression Generator** is *Andrei Ignat*

You cand find **RSCG Property Expression Generator** at Nuget.org :
<https://www.nuget.org/packages/AOPMethodsCommon/>
<https://www.nuget.org/packages/AOPMethodsGenerator/> and the sources at
<http://github.com/ignatandrei/aop_With_Roslyn/>

For more usage features please read :
<http://msprogrammer.serviciipeweb.ro/category/roslyn/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/PropertyExpressionGenerator>](https://github.com/ignatandrei/RSCG_Examples/tree/main/PropertyExpressionGenerator)

## RSCG number 15 : Transplator

### What RSCG Transplator can do

The Transplator is a small fast rendering engine to allow you to make
rendering from any class instance.

### Example code

#### Here is the csproj with the references for RSCG Transplator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/ExistingCode.cs)
</small>

#### The code below will use the RSCG Transplator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/Usage.cs)
<small>

#### The code that is generated by RSCG Transplator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/Transplator/GeneratedCode.cs)
</small>

### More details about RSCG Transplator

The author of **RSCG Transplator** is *Atif Aziz*

You cand find **RSCG Transplator** at Nuget.org :
<https://www.nuget.org/packages/Transplator/> and the sources at
<https://github.com/atifaziz/Transplator/>

For more usage features please read :
<https://github.com/atifaziz/Transplator/>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/TemplateRender>](https://github.com/ignatandrei/RSCG_Examples/tree/main/TemplateRender)

## RSCG number 16 : RSCG\_AMS

### What RSCG RSCG\_AMS can do

The AMS will add in the CI the version and creator to your project.See
<https://netcoreblockly.herokuapp.com/ams> for an example

### Example code

#### Here is the csproj with the references for RSCG RSCG\_AMS

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/ExistingCode.cs)
</small>

#### The code below will use the RSCG RSCG\_AMS

![usage](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/Usage.cs)
<small>

#### The code that is generated by RSCG RSCG\_AMS

![gc](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/RSCG_AMS/GeneratedCode.cs)
</small>

### More details about RSCG RSCG\_AMS

The author of **RSCG RSCG\_AMS** is *Andrei Ignat*

You cand find **RSCG RSCG\_AMS** at Nuget.org :
<https://www.nuget.org/packages/AMS_Base>
<https://www.nuget.org/packages/AMSWebAPI>
<https://www.nuget.org/packages/RSCG_AMS> and the sources at
<https://github.com/ignatandrei/RSCG_AMS>

For more usage features please read :
<https://github.com/ignatandrei/RSCG_AMS>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/CI_Version>](https://github.com/ignatandrei/RSCG_Examples/tree/main/CI_Version)

## RSCG number 17 : HttpClientGenerator

### What RSCG HttpClientGenerator can do

HttpClientGenerator is a tool that uses Roslyn code generator feature to
write boilerplate HttpClient code for you.

### Example code

#### Here is the csproj with the references for RSCG HttpClientGenerator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/The.csproj)
</small>

#### The initial code that you start with is

![start](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/ExistingCode.cs)
</small>

#### The code below will use the RSCG HttpClientGenerator

![usage](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/Usage.cs)
<small>

#### The code that is generated by RSCG HttpClientGenerator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/GeneratedCode.cs)
</small>

### More details about RSCG HttpClientGenerator

The author of **RSCG HttpClientGenerator** is *Jalal Amini Robati*

You cand find **RSCG HttpClientGenerator** at Nuget.org :
<https://www.nuget.org/packages/HttpClientGenerator/> and the sources at
<https://github.com/Jalalx/HttpClientCodeGenerator>

For more usage features please read :
<https://github.com/Jalalx/HttpClientCodeGenerator>

#### Link to Example Code:

[<https://github.com/ignatandrei/RSCG_Examples/tree/main/HttpClientCodeGenerator>](https://github.com/ignatandrei/RSCG_Examples/tree/main/HttpClientCodeGenerator)

### Author of HttpClientGenerator , Jalal Amini Robati

1.  Short info about you , Jalal Amini Robati

I am working as a senior software engineer at Alibaba Travels.

2.  Why did you start this HttpClientGenerator ?

I built HttpClientGenerator to help users stop writing HttpClient code.
Currently, some users use tools like swaggergen which generates too much
code that is hard to maintain.

3.  How do yourself use your HttpClientGenerator ?

I am going to use it in a high-traffic website on production when it
gets mature enough. I mostly use it on my personal projects and look for
feedback from developers for now.

4.  What other RSCG do you use ?

Since the RSCG is in the early stages, I don't know that many tools but
I think it can be applied to many areas like DI, ORMs. Currently
Dapper.AOT is using this feature that would make writing database code
so much faster.

## RSCG - worth mention

There are more RSCG that you could see - here is a list that you may
want to look at:

1.  AutoEmbed <https://github.com/chsienki/AutoEmbed>
2.  Cloneable <https://github.com/mostmand/Cloneable>
3.  fonderie <https://github.com/jeromelaban/fonderie>
4.  Generators.Blazor <https://github.com/excubo-ag/Generators.Blazor>
5.  Generators.Grouping
    <https://github.com/excubo-ag/Generators.Grouping>
6.  JsonMergePatch <https://github.com/ladeak/JsonMergePatch>
7.  MemoizeSourceGenerator
    <https://github.com/Zoxive/MemoizeSourceGenerator>
8.  MiniRazor <https://github.com/Tyrrrz/MiniRazor/>
9.  MockGen <https://github.com/thomas-girotto/MockGen>
10. ProxyGen <https://github.com/Sholtee/ProxyGen>
11. Rocks <https://github.com/JasonBock/Rocks>
12. RoslynWeave <https://github.com/Jishun/RoslynWeave>
13. SmallSharp <https://github.com/devlooped/SmallSharp>
14. StaticProxyGenerator
    <https://github.com/robertturner/StaticProxyGenerator>
15. ValueChangedGenerator
    <https://github.com/ufcpp/ValueChangedGenerator>
16. Web-Anchor <https://github.com/mattiasnordqvist/Web-Anchor>
17. WrapperValueObject
    <https://github.com/martinothamar/WrapperValueObject>
18. Plant UML to C\# -
    <https://github.com/gabriele-tomassetti/code-generation-roslyn>
19. Strong Inject - <https://github.com/YairHalberstadt/stronginject>
20. <https://github.com/thinktecture/article-roslyn-source-generators>
21. <https://github.com/HamedFathi/MockableStaticGenerator>
22. <https://github.com/mrtaikandi/MapTo/>
23. <https://www.nuget.org/packages/Dnf.SourceGenerators/1.0.0>
24. <https://github.com/Flash0ver/F0.Generators>
25. <https://github.com/giggio/sourceinject>
26. <https://github.com/anton-yashin/LightMock.Generator>
27. <https://github.com/sungaila/Cdelta>
28. <https://github.com/robertturner/StaticProxyGenerator>
29. <https://github.com/JoshDiDuca/CodeSourceGenerator/tree/master/examples>
30. <https://github.com/MelGrubb/BuilderGenerator>
31. <https://github.com/wieslawsoltes/Svg.Skia>
32. <https://github.com/marlond18/EMDD.KtEquatable>
33. <https://github.com/petarpetrovt/fast-enum-string>

## Final Chapter

### Conclusion

I am happy that you have read / or practice / the RSCG presented in this
book. I hope that inspired you to produce yours - and send me to review
and maybe add to this book .

### One hour of free consultancy

If you bought this book from Amazon, <https://amzn.to/3f6gll3>, you are
entitled to have 1 hour free of consultancy with me.

Thanks ! Andrei
