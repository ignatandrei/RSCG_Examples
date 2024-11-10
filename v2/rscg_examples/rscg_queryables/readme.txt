
# rscg_queryables


[![NuGet](https://img.shields.io/nuget/v/rscg_queryables.svg)](https://www.nuget.org/packages/rscg_queryables)
[![NuGet](https://img.shields.io/nuget/v/rscg_queryablesCommon.svg)](https://www.nuget.org/packages/rscg_queryablesCommon)
[![GitHub Actions](https://github.com/ignatandrei/rscg_queryables/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ignatandrei/rscg_queryables/actions/workflows/dotnet.yml)


`rscg_queryables` is a Roslyn Code Generator designed to generate extension methods for sorting and filtering `IEnumerable` and `IQueryable` collections based on a given class.



## Sorting how the user wants in frontend  - description

Consider a scenario where we need to display a list of `Person` objects and allow the user to sort them by various properties. The user should have the ability to select the property and the sorting order.

```csharp
public class Person
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public int Age { get; set; }
    public string FullName
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
}
```

When data is transmitted over HTTP, it is often in the form of a string object. To sort by first name in descending order, the query string should look like this:

```json
orderBy=FirstName&Asc=false
```

Then in the backend code we should parse the query string and apply the sorting logic.

```csharp
if(queryString.ContainsKey("orderBy"))
{
    string orderBy = queryString["orderBy"];
    bool asc = queryString["asc"] == "false" ? false: true;//default is true
    if(orderBy == "FirstName")
    {
        if(asc)
        {
            persons = persons.OrderBy(p => p.FirstName);
        }
        else
        {
            persons = persons.OrderByDescending(p => p.FirstName);
        }
    }
    //do the same for other properties : LastName, Age, FullName

}
```

## The solution

With rscg_queryables, you can do this in a more elegant way.

```csharp
if(queryString.ContainsKey("orderBy"))
{
    string orderBy = queryString["orderBy"];
    bool asc = queryString["asc"] == "false" ? false: true;//default is true
    persons = persons.OrderByAscDesc(orderBy, asc);
    //or you can do this, if you want to control 
    //if(asc)
    //{
    //    persons = persons.OrderBy(orderBy);
    //}
    //else
    //{
    //    persons = persons.OrderByDescending(orderBy);
    //}
}
```

This should be done for everything that implements IEnumerable or IQueryable.



## Filtering Based on User Preferences - Description

Consider a scenario where we need to display a list of `Person` objects and allow the user to filter them by various properties. The user should have the ability to select the property, the filter criteria, and the filter operator (equal or different).

When data is transmitted over HTTP, it is often in the form of a string object. To filter by first name where the value is "John", the query string should look like this:

```json
filterBy=FirstName&filterOperator=equal&filterValue=John
```

In the backend code, we need to parse the query string and apply the appropriate filtering logic.

```csharp
if (queryString.ContainsKey("filterBy") && queryString.ContainsKey("filterOperator") && queryString.ContainsKey("filterValue"))
{
    string filterBy = queryString["filterBy"];
    string filterOperator = queryString["filterOperator"];
    string filterValue = queryString["filterValue"];
    if (filterBy == "FirstName")
    {
        if (filterOperator == "equal")
        {
            persons = persons.Where(p => p.FirstName == filterValue);
        }
        else if (filterOperator == "different")
        {
            persons = persons.Where(p => p.FirstName != filterValue);
        }
    }
    // Do the same for other properties: LastName, Age, FullName
}
```

## The Solution

With `rscg_queryables`, you can achieve this in a more elegant and efficient manner.

1. add the  nugets to your project

```xml
	<ItemGroup>
		<PackageReference  Include="rscg_queryablesCommon" Version="2024.1110.1815" />
		<PackageReference Include="rscg_queryables" Version="2024.1110.1815"  OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	</ItemGroup>
```

Optional see the code generated
```xml
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
```

2. Modify the `Person` class to add the `rscg_queryables` attribute.

```csharp
[MakeSortable]
[MakeWhere]
public class Person
{
    //same code as above, omitted for brevity
}
```

3. Use the overloaded `Where` method to filter the collection based on the query string.

```csharp
if (queryString.ContainsKey("filterBy") && queryString.ContainsKey("filterOperator") && queryString.ContainsKey("filterValue"))
{
    string filterBy = queryString["filterBy"];
    string filterOperator = queryString["filterOperator"] == "equal"?WhereOperator.Equal:WhereOperator.Different;
    string filterValue = queryString["filterValue"];
    persons = persons.Where(filterBy, filterOperator, filterValue);
    
}
```

This approach can be applied to any collection that implements `IEnumerable` or `IQueryable`.

## Other Roslyn Code Generators

For more Roslyn Source Code Generators, visit [RSCG Examples https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg-examples](https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg-examples).



