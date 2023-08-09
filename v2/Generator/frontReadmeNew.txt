# RSCG - {{nr}} Examples of Roslyn Source Code Generators  / {{MSFT_RSCG_NR}} created by Microsoft / 
{{nrNoExamples- nrOld}} in queue / {{ nrOld }} that have problems
 
If you want to see examples , please click  ***[List V2](https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG)***

If you want just those from Microsoft, please click ***[Microsoft](https://ignatandrei.github.io/RSCG_Examples/v2/docs/category/microsoft-examples)***

If you want to see by category, please click ***[category](https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg-examples)***

If you have a Roslyn Source Code Generator, please create an issue.

If you want to help, please let me know ( again, create an issue).

## Content 

Those are the {{nr}} Roslyn Source Code Generators that I have tested you can see and download source code example.
( including {{MSFT_RSCG_NR}} from Microsoft )
{{~ 
inDescOrder =  all  | array.sort "ReverseNr"
~}} 
{{~ for desc in inDescOrder  ~}} 
### {{desc.Nr}}. [{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}}) generated on : {{desc.generatedDate  | date.to_string '%F => %d %B %Y' }}
<details>
  <summary>Expand</summary>
Author: {{desc.Generator.Author}}

{{desc.DescriptionNuget}} 

Nuget: [{{desc.Generator.NugetFirst}}]({{desc.Generator.NugetFirst}}) 


Link: [https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}})

Source: [{{desc.Generator.Source}}]({{desc.Generator.Source}})

</details>

{{~ end ~}}


## Roslyn Source Code Generators created by Microsoft 

You can find also the {{MSFT_RSCG_NR}} from Roslyn Source Code Generators that Microsoft wrote for .NET 
| No        | Name  | Link | 
| --------- | ----- | -----| 
{{~ for msft in MSFT_RSCG ~}} 
|{{msft.NrFile}}|[{{msft.NameGenerator}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft/{{msft.NameGenerator}})| https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft/{{msft.NameGenerator}} |
{{~ end ~}}


## To be tested {{nrNoExamples-nrOld}}

Please help with those by providing a simple example :

{{~ for descNoExample in rscgNoExamples ~}} 

{{for.index+1}}) [{{descNoExample.NameRSCG}}]( {{descNoExample.SiteRSCG}}) , {{descNoExample.SiteRSCG}} 

Why I have not tested : {{descNoExample.why}}

https://github.com/ignatandrei/RSCG_Examples/issues/new?title={{descNoExample.NameRSCG}}&body={{descNoExample.SiteRSCG}}

{{~ end ~}}

## Do not want to test {{nrOld}}

Those examples are made with old ISourceGenerator or have other problems 

{{~ for descNoExample in rscgNoExamplesOld ~}} 

{{for.index+1}}) [{{descNoExample.NameRSCG}}]( {{descNoExample.SiteRSCG}}) , {{descNoExample.SiteRSCG}} 

Why I have not tested : {{descNoExample.why}}


{{~ end ~}}



## V1: Old examples made with ISourceGenerator 

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