# RSGC - Roslyn Source Code Generators with examples
{{ index= 0}}
<table>
<tr>
<td>Nr.</td><td>Name</td><td>Summary</td>
<td>Link</td>
</tr>
{{~ for mi in all ~}}
{{ index= index+1}}
<tr>
<td>{{index}}</td>
<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/{{mi.rootFolder}}'>{{ mi.Generator.Name }}</a>
</td>

<td>{{mi.Data.GoodFor}}</td>

<td>
<a href='https://github.com/ignatandrei/RSCG_Examples/tree/main/{{mi.rootFolder}}'>
https://github.com/ignatandrei/RSCG_Examples/tree/main/{{mi.rootFolder}}
</a>
</td>

</tr>
{{~ end ~}}

</table>

