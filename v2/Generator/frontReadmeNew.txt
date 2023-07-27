# RSCG - {{nr}} Examples of Roslyn Source Code Generators  / {{MSFT_RSCG_NR}} created by Microsoft / {{nrNoExamples}} in queue

If you want to go to documentation , please click  ***[List V2](https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG)***

## Content 

Those are the {{nr}} Roslyn Source Code Generators that I have tested you can see and download source code example.
( including {{MSFT_RSCG_NR}} from Microsoft )

{{~ for desc in all ~}} 
### {{desc.Nr}}. [{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}})
generated: {{desc.generatedDate  | date.to_string '%F => %d %B %Y' }}

Link: [https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}})


Nuget: [{{desc.Generator.NugetFirst}}]({desc.Generator.NugetFirst}) 


Author: {{desc.Generator.Author}}

Source: [{{desc.Generator.Source}}](desc.Generator.Source)
{{~ end ~}}


## Roslyn Source Code Generators created by Microsoft 

You can find also the {{MSFT_RSCG_NR}} from Roslyn Source Code Generators that Microsoft wrote for .NET 
| No        | Name  | Link | 
| --------- | ----- | -----| 
{{~ for msft in MSFT_RSCG ~}} 
|{{msft.NrFile}}|[{{msft.NameGenerator}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft/{{msft.NameGenerator}})| https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft/{{msft.NameGenerator}} |
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