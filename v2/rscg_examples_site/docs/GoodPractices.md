---
sidebar_position: 15
title: Good Practices
---

## Content 

I am trying here to add good practices , as I see 

## For generated code
 ### Add a version

[global::System.CodeDom.Compiler.GeneratedCode("Name", "1.0.0.0")]

Could use AssemblyInfo 

### General attributes / code 

Problem - make internal or have another assembly referenced ( or the opposite)
https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/


### mark the code as non - code coverage

[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]



 ### Add comments for method / classes  /  properties generated

 could have warnings as errors .
 or 
https://github.com/dotnet/roslyn/issues/54103
#pragma warning disable CS1591 // Compensate for https://github.com/dotnet/roslyn/issues/54103

 ### Add nullable enable
 
 #nullable enable
TODO: add example

 ### Add reference to another package when need just for compilation

 
TODO: add example

## For Debug

### Add IsRoslynComponent

TODO: add example


## For deploy

### Add source link

TODO: add example


