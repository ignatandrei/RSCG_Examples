# RSGC Name: {{Generator.Name}}

Nuget :
{{~ for mi in Generator.Nuget ~}}
    {{ mi }}
{{~ end ~}}


link : {{Generator.Link}} 


author :{{ Generator.Author }}


## What can do

{{ Data.GoodFor }}

## The code that you start with is 

```
{{~ for mi in Data.ExistingCode }}
    {{ mi }}
{{~ end ~}}
```

The code that you will use is

```csharp

{{~ for mi in Data.Usage }}
    {{ mi }}
{{~ end ~}}

```

The code that is generated is
```csharp

{{~ for mi in Data.GeneratedCode }}
    {{ mi }}
{{~ end ~}}

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/{{rootFolder}}" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/{{rootFolder}}</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>