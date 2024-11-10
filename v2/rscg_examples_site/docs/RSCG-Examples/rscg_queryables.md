---
sidebar_position: 1650
title: 165 - rscg_queryables
description: Generating code for .Where and .OrderBy by string, not by lambda
slug: /rscg_queryables
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# rscg_queryables  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/rscg_queryables?label=rscg_queryables)](https://www.nuget.org/packages/rscg_queryables/)[![Nuget](https://img.shields.io/nuget/dt/rscg_queryablesCommon?label=rscg_queryablesCommon)](https://www.nuget.org/packages/rscg_queryablesCommon/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/rscg_queryables?label=updated)](https://github.com/ignatandrei/rscg_queryables)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/rscg_queryables?style=social)

## Details

### Info
:::info

Name: **rscg_queryables**

Intercept method

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/rscg_queryables/*   

*https://www.nuget.org/packages/rscg_queryablesCommon/*   


You can find more details at https://github.com/ignatandrei/rscg_queryables

Source : https://github.com/ignatandrei/rscg_queryables

:::

### Original Readme
:::note


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





:::

### About
:::note

Generating code for .Where and .OrderBy by string, not by lambda


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **rscg_queryables**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference  Include="rscg_queryablesCommon" Version="2024.1110.1815" />
		<PackageReference Include="rscg_queryables" Version="2024.1110.1815"  OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_queryables\src\SortAndWhere\Program.cs" label="Program.cs" >

  This is the use of **rscg_queryables** in *Program.cs*

```csharp showLineNumbers 
using SortAndWhere;


Console.WriteLine("Hello, World!");

var students = new Student[]
{
    new Student { FirstName = "John", LastName = "Doe", StartYear = 1935},
    new Student { FirstName = "Ignat", LastName = "Andrei", StartYear = 1989 },
};

var orderedExplicitly = students.OrderBy(p => p.FirstName).ToArray();
var orderedImplicitly = students.OrderBy("firStnaMe").ToArray();
var orderedImplicitly2 = students.AsQueryable().OrderBy("fIrsTnAme").ToArray();


//Search by property name

var search = students.AsQueryable().Where("firstName", rscg_queryablesCommon.WhereOperator.Equal, "John").ToArray();

Console.WriteLine("found : " + search.Length);

search = students.AsQueryable().Where(Student_.Where_Expr("firstName", rscg_queryablesCommon.WhereOperator.Equal, "John")).ToArray();
Console.WriteLine("found : " + search.Length);



```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_queryables\src\SortAndWhere\Student.cs" label="Student.cs" >

  This is the use of **rscg_queryables** in *Student.cs*

```csharp showLineNumbers 
using rscg_queryablesCommon;

namespace SortAndWhere;
[MakeSortable]
[MakeWhere]
public class Student
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public int StartYear { get; set; }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_queryables\src\SortAndWhere\obj\GX\rscg_queryables\rscg_queryables.GenerateOrderBy\SortAndWhere_Student_sortable.cs" label="SortAndWhere_Student_sortable.cs" >


```csharp showLineNumbers 

public static partial class ExtensionsSortable_SortAndWhere_Student {
    
    #region Enumerable
    public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student> OrderBy
    (
    this IEnumerable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return OrderByAscDesc(source,propertyName,true);
    }
        public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student>
            OrderByDescending
            (
            this IEnumerable<global::SortAndWhere.Student>
                source, string propertyName
                )
                {

                return OrderByAscDesc(source,propertyName,false);
                }
    public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student> OrderByAscDesc
    (
     this IEnumerable<global::SortAndWhere.Student> source, string propertyName, bool Ascending
    )
   {

                        if(string.Equals(propertyName, "FirstName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.FirstName);
                            else
                                return source.OrderByDescending(x => x.FirstName);                            
                        }
                    
                        if(string.Equals(propertyName, "LastName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.LastName);
                            else
                                return source.OrderByDescending(x => x.LastName);                            
                        }
                    
                        if(string.Equals(propertyName, "StartYear", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.StartYear);
                            else
                                return source.OrderByDescending(x => x.StartYear);                            
                        }
                                    throw new ArgumentException($"Property {propertyName} not found", propertyName);
    }

    public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student> ThenByAscDesc
    (
     this IOrderedEnumerable<global::SortAndWhere.Student> source, string propertyName, bool Ascending
    )
   {

                        if(string.Equals(propertyName, "FirstName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.FirstName);
                            else
                                return source.ThenByDescending(x => x.FirstName);                            
                        }
                    
                        if(string.Equals(propertyName, "LastName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.LastName);
                            else
                                return source.ThenByDescending(x => x.LastName);                            
                        }
                    
                        if(string.Equals(propertyName, "StartYear", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.StartYear);
                            else
                                return source.ThenByDescending(x => x.StartYear);                            
                        }
                                    throw new ArgumentException($"Property {propertyName} not found", propertyName);
    }
    public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student> ThenBy
    (
    this IOrderedEnumerable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return ThenByAscDesc(source,propertyName,true);
    }
    public static System.Linq.IOrderedEnumerable<global::SortAndWhere.Student> ThenByDescending
    (
    this IOrderedEnumerable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return ThenByAscDesc(source,propertyName,false);
    }

    #endregion 

#region Queryable
    public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student> OrderBy
    (
    this IQueryable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return OrderByAscDesc(source,propertyName,true);
    }
        public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student>
            OrderByDescending
            (
            this IQueryable<global::SortAndWhere.Student>
                source, string propertyName
                )
                {

                return OrderByAscDesc(source,propertyName,false);
                }
    public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student> OrderByAscDesc
    (
     this IQueryable<global::SortAndWhere.Student> source, string propertyName, bool Ascending
    )
   {

                        if(string.Equals(propertyName, "FirstName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.FirstName);
                            else
                                return source.OrderByDescending(x => x.FirstName);                            
                        }
                    
                        if(string.Equals(propertyName, "LastName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.LastName);
                            else
                                return source.OrderByDescending(x => x.LastName);                            
                        }
                    
                        if(string.Equals(propertyName, "StartYear", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.OrderBy(x => x.StartYear);
                            else
                                return source.OrderByDescending(x => x.StartYear);                            
                        }
                                    throw new ArgumentException($"Property {propertyName} not found", propertyName);
    }
    public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student> ThenByAscDesc
    (
     this IOrderedQueryable<global::SortAndWhere.Student> source, string propertyName, bool Ascending
    )
   {

                        if(string.Equals(propertyName, "FirstName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.FirstName);
                            else
                                return source.ThenByDescending(x => x.FirstName);                            
                        }
                    
                        if(string.Equals(propertyName, "LastName", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.LastName);
                            else
                                return source.ThenByDescending(x => x.LastName);                            
                        }
                    
                        if(string.Equals(propertyName, "StartYear", StringComparison.OrdinalIgnoreCase)){
                            if(Ascending)
                                return source.ThenBy(x => x.StartYear);
                            else
                                return source.ThenByDescending(x => x.StartYear);                            
                        }
                                    throw new ArgumentException($"Property {propertyName} not found", propertyName);
    }
    public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student> ThenBy
    (
    this IOrderedQueryable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return ThenByAscDesc(source,propertyName,true);
    }
    public static System.Linq.IOrderedQueryable<global::SortAndWhere.Student> ThenByDescending
    (
    this IOrderedQueryable<global::SortAndWhere.Student>
        source, string propertyName
    )
    {

        return ThenByAscDesc(source,propertyName,false);
    }

    #endregion 

}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_queryables\src\SortAndWhere\obj\GX\rscg_queryables\rscg_queryables.GenerateWhere\SortAndWhere_Student_where.cs" label="SortAndWhere_Student_where.cs" >


```csharp showLineNumbers 

public static class ExtensionsWhere_SortAndWhere_Student{
    

        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        FirstName_Expr_Equal(string argument) => (a => a.FirstName== argument);

        internal static Func<global::SortAndWhere.Student,bool>
            FirstName_Equal(string argument) => (a => a.FirstName== argument);

        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        FirstName_Expr_NotEqual(string argument) => (a => a.FirstName != argument);

        internal static Func<global::SortAndWhere.Student,bool>
                FirstName_NotEqual(string argument) => (a => a.FirstName != argument);

    
        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        LastName_Expr_Equal(string argument) => (a => a.LastName== argument);

        internal static Func<global::SortAndWhere.Student,bool>
            LastName_Equal(string argument) => (a => a.LastName== argument);

        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        LastName_Expr_NotEqual(string argument) => (a => a.LastName != argument);

        internal static Func<global::SortAndWhere.Student,bool>
                LastName_NotEqual(string argument) => (a => a.LastName != argument);

    
        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        StartYear_Expr_Equal(int argument) => (a => a.StartYear== argument);

        internal static Func<global::SortAndWhere.Student,bool>
            StartYear_Equal(int argument) => (a => a.StartYear== argument);

        internal static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        StartYear_Expr_NotEqual(int argument) => (a => a.StartYear != argument);

        internal static Func<global::SortAndWhere.Student,bool>
                StartYear_NotEqual(int argument) => (a => a.StartYear != argument);

    
   

}
public static class Student_{


        public static System.Linq.IQueryable<global::SortAndWhere.Student>
            Where(this System.Linq.IQueryable<global::SortAndWhere.Student> original,
                string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, string argument)
        {
            return original.Where(Where_Expr(propertyName, operatorWhere, argument));
        }
        public static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        Where_Expr(string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, string argument)
            {

                    if(string.Equals(propertyName,  "FirstName", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.FirstName_Expr_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.FirstName_Expr_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if FirstName

                
                    if(string.Equals(propertyName,  "LastName", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.LastName_Expr_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.LastName_Expr_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if LastName

                
            throw new ArgumentException("Property "+ propertyName +" not found for string type");
            }





        public static Func<global::SortAndWhere.Student,bool>
            Where(string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, string argument)
            {

                    if(string.Equals(propertyName,  "FirstName", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.FirstName_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.FirstName_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if FirstName

                
                    if(string.Equals(propertyName,  "LastName", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.LastName_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.LastName_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if LastName

                
            throw new ArgumentException("Property "+ propertyName +" not found for string type");
            }

    
        public static System.Linq.IQueryable<global::SortAndWhere.Student>
            Where(this System.Linq.IQueryable<global::SortAndWhere.Student> original,
                string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, int argument)
        {
            return original.Where(Where_Expr(propertyName, operatorWhere, argument));
        }
        public static System.Linq.Expressions.Expression < Func < global::SortAndWhere.Student,bool>>
        Where_Expr(string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, int argument)
            {

                    if(string.Equals(propertyName,  "StartYear", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.StartYear_Expr_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.StartYear_Expr_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if StartYear

                
            throw new ArgumentException("Property "+ propertyName +" not found for int type");
            }





        public static Func<global::SortAndWhere.Student,bool>
            Where(string propertyName,rscg_queryablesCommon.WhereOperator operatorWhere, int argument)
            {

                    if(string.Equals(propertyName,  "StartYear", StringComparison.OrdinalIgnoreCase)){
                    switch(operatorWhere){
                    case rscg_queryablesCommon.WhereOperator.Equal:
                    return ExtensionsWhere_SortAndWhere_Student.StartYear_Equal( argument);
                    case rscg_queryablesCommon.WhereOperator.NotEqual:
                    return ExtensionsWhere_SortAndWhere_Student.StartYear_NotEqual( argument);
                    default:
                    throw new ArgumentException($"Operator {operatorWhere} not found");
                    }//end switch
                    }//end if StartYear

                
            throw new ArgumentException("Property "+ propertyName +" not found for int type");
            }

    

}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project rscg_queryables ](/sources/rscg_queryables.zip)

:::


### Share rscg_queryables 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables&quote=rscg_queryables" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables&text=rscg_queryables:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables&title=rscg_queryables" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables&title=rscg_queryables&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_queryables" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg_queryables

### In the same category (FunctionalProgramming) - 13 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Dusharp](/docs/Dusharp)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionGen](/docs/UnionGen)


#### [UnionsGenerator](/docs/UnionsGenerator)

