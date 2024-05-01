# RSCG - {{nr}} Examples of Roslyn Source Code Generators  / {{MSFT_RSCG_NR}} created by Microsoft / 

## Latest Update : {{LatestUpdate | date.to_string '%F => %d %B %Y' }}

If you want to see examples with code, please click  ***[List V2](https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG)***

If you want just those from Microsoft, please click ***[Microsoft](https://ignatandrei.github.io/RSCG_Examples/v2/docs/category/microsoft-examples)***

If you want to see by category, please click ***[category](https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg-examples)***

If you have a Roslyn Source Code Generator, please create an issue.

If you want to help, see below .

If you want to be notified each time I add a new RSCG example , please click https://dashboard.mailerlite.com/forms/611357/100178843411678256/share


## Content 

Those are the {{nr}} Roslyn Source Code Generators that I have tested you can see and download source code example.
( including {{MSFT_RSCG_NR}} from Microsoft )
{{~ 
inDescOrder =  all  | array.sort "ReverseNr"
~}} 
{{~ for desc in inDescOrder  ~}} 
### {{desc.Nr}}. [{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}}) , in the [{{desc.GeneratorData.Category}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg-examples#{{desc.GeneratorData.Category  | string.downcase }}) category 

Generated on : {{desc.generatedDate  | date.to_string '%F => %d %B %Y' }}

<details>
  <summary>Expand</summary>



Author: {{desc.Generator.Author}}

{{desc.DescriptionNuget}} 

Nuget: [{{desc.Generator.NugetFirst}}]({{desc.Generator.NugetFirst}}) 


Link: [https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}}](https://ignatandrei.github.io/RSCG_Examples/v2/docs/{{desc.Generator.Name}})

Source: [{{desc.Generator.Source}}]({{desc.Generator.Source}})

</details>

{{~ end ~}}


## Contributors Welcome for those

Please help with those by providing a simple example :

{{~ for descNoExample in rscgNoExamples ~}} 

{{for.index+1}}) [{{descNoExample.NameRSCG}}]( {{descNoExample.SiteRSCG}}) , {{descNoExample.SiteRSCG}} 

Why I have not tested : {{descNoExample.why}}

https://github.com/ignatandrei/RSCG_Examples/issues/new?title={{descNoExample.NameRSCG}}&body={{descNoExample.SiteRSCG}}

{{~ end ~}}

## Do not want to test {{nrOld}} ( old ISourceGenerator )

<details>
  <summary>Expand</summary>

Those examples are made with old ISourceGenerator or have other problems 

{{~ for descNoExample in rscgNoExamplesOld ~}} 

{{for.index+1}}) [{{descNoExample.NameRSCG}}]( {{descNoExample.SiteRSCG}}) , {{descNoExample.SiteRSCG}} 

Why I have not tested : {{descNoExample.why}}


{{~ end ~}}

</details>

## V1: Old examples made with ISourceGenerator 

For historical reasons, I will keep the old examples in a separate folder - see  https://github.com/ignatandrei/RSCG_Examples/tree/main/v1  folder.

This is the list 
<details>
  <summary>Expand</summary>

| No        | Name  |
| --------- | ----- |
{{~ for descOld in oldDesc ~}} 
|{{for.index+1}}| [{{descOld.Generator.Name}}]( https://ignatandrei.github.io/RSCG_Examples/v1/#rscg-number-{{descOld.Nr+1}}--{{descOld.Generator.NameForBookmark}}) |"
{{~ end ~}}

</details>

