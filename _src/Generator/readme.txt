# RSCG number {{Nr+1}} : {{Generator.Name}}

Nuget :
{{~ for mi in Generator.Nuget ~}}
    {{ mi }}
{{~ end ~}}


link : {{Generator.Link}} 


author :{{ Generator.Author }}


## What can do

{{ Data.GoodFor }}

## Here is the csproj with the references

<img src='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/The.csproj.png' />
<small>
<a href='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/The.csproj' target='_blank'>code</a>
</small>


## The code that you start with is 


<img src='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/ExistingCode.cs.png' />
<small>
<a href='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/ExistingCode.cs' target='_blank'>code</a>
</small>

The code that you will use is

<img src='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/Usage.cs.png' />
<small>
<a href='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/Usage.cs' target='_blank'>code</a>
</small>



The code that is generated is

<img src='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/GeneratedCode.cs.png' />
<small>
<a href='http://ignatandrei.github.io/RSCG_Examples/images/{{Generator.Name}}/GeneratedCode.cs' target='_blank'>code</a>
</small>


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/{{rootFolder}}" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/{{rootFolder}}</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>