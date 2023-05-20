# RSCG - {{nr}} Examples of Roslyn Source Code Generators 

If you want to see them , please goto  ***[List V2](https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG)***

## Content 

This are the {{nr}} Roslyn Source Code Generators that I have tested you can see and download example:


| No        | Name  | Link | Nuget |Author|
| --------- | ----- | -----| ----- |----- |  
{{~ for desc in all ~}} 
|{{desc.Nr}}|[{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}})| https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}} | [{{desc.Generator.NugetFirst}}]({desc.Generator.Nuget.First()}) | {{desc.Generator.Author}}|
{{~ end ~}}


## Not tested yet 

{{~ for noex in rscgNoExamples ~}} 

{{for.index+1}}) {{noex}}

{{~ end ~}}


## Old examples made with ISourceGenerator 

For historical reasons, I will keep the old examples in a separate folder - see  https://github.com/ignatandrei/RSCG_Examples/tree/main/v1  folder.

This is the list 

| No        | Name  |
| --------- | ----- |
{{~ for descOld in oldDesc ~}} 
|{{for.index+1}}| [{{descOld.Generator.Name}}]( https://ignatandrei.github.io/RSCG_Examples/v1/#rscg-number-{{descOld.Nr+1}}--{{descOld.Generator.NameForBookmark}}) |"
{{~ end ~}}


## Want to help ? 

https://github.com/ignatandrei/RSCG_Examples/labels/good%20first%20issue

## Contributors welcome

If you are an author of a Source Generator, please make an issue to contact you

Also, if you think of better organizing of code, please make an issue to contact you