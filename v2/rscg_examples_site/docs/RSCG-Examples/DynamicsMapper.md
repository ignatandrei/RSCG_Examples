---
sidebar_position: 770
title: 77 - DynamicsMapper
description: Mapper for Dataverse client - generates also column names from properties
slug: /DynamicsMapper
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DynamicsMapper  by Yonatan Cohavi


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/YC.DynamicsMapper?label=YC.DynamicsMapper)](https://www.nuget.org/packages/YC.DynamicsMapper/)
[![GitHub last commit](https://img.shields.io/github/last-commit/YonatanCohavi/DynamicsMapper?label=updated)](https://github.com/YonatanCohavi/DynamicsMapper/)
![GitHub Repo stars](https://img.shields.io/github/stars/YonatanCohavi/DynamicsMapper?style=social)

## Details

### Info
:::info

Name: **DynamicsMapper**

A .NET source generator for generating dynamics crm Enity mappings.
      No runtime reflection.

Author: Yonatan Cohavi

NuGet: 
*https://www.nuget.org/packages/YC.DynamicsMapper/*   


You can find more details at https://github.com/YonatanCohavi/DynamicsMapper/

Source : https://github.com/YonatanCohavi/DynamicsMapper/

:::

### Original Readme
:::note

# Using the Source Generator

This document provides a brief overview of how to use the source generator to generate mapper classes for your entity classes.


## Step 1: Define Your Entity Classes

First, you need to define your entity classes and decorate them with the `CrmEntity` and `CrmField` attributes. These attributes specify the mapping between your entity classes and the corresponding CRM entities.

For example, here is a sample `Person` class decorated with the `CrmEntity` and `CrmField` attributes:

```csharp
[CrmEntity("person")]
public class Person
{
    [CrmField("personid", Mapping = MappingType.PrimaryId)]
    public Guid PersonId { get; set; }

    [CrmField("firstname")]
    public string? FirstName { get; set; }

    [CrmField("lastname")]
    public string? LastName { get; set; }
}
```

## Step 2: Run the Source Generator

The source generator is executed automatically when you build your project. This will generate the mapper classes for each of your entity classes. The mapper classes implement the `IEntityMapper<TEntity>` interface and are responsible for mapping between your entity classes and the corresponding CRM entities.

## Step 3: Use the Mapper Classes

Once the mapper classes have been generated, you can use them to map between your entity classes and the CRM entities. To do this, you need to create an instance of the appropriate mapper class and call its `Map` methods.

For example, here is how you might use the `PersonMapper` class to map between a `Person` object and a CRM entity:

```csharp
var person = new Person { PersonId = Guid.NewGuid(), FirstName = "John", LastName = "Doe" };
var mapper = new PersonMapper();
var entity = mapper.Map(person);
```

You can also use the `Map` method to map from a CRM entity to a `Person` object. Here is an example:

```csharp
var entity = new Entity("person");
entity.Id = Guid.NewGuid();
entity["firstname"] = "Jane";
entity["lastname"] = "Doe";

var mapper = new PersonMapper();
var person = mapper.Map(entity);
```

## Mapping Types
- `Basic`: This is the default mapping type and is used for simple data types such as strings, integers, and booleans.
- `Lookup`: This mapping type is used for lookup fields in the CRM entity. A lookup field is a field that references another entity record.
- `Money`: This mapping type is used for money fields in the CRM entity. A money field is a field that stores currency values.
- `Formatted`: This mapping type is used for formatted fields in the CRM entity. A formatted field is a field that has a specific format, such as a date or time field.
- `Options`: This mapping type is used for option set fields in the CRM entity. An option set field is a field that allows the user to select from a predefined set of options.
- `MultipleOptions`: This mapping type is used for multi-select option set fields in the CRM entity. A multi-select option set field is a field that allows the user to select multiple options from a predefined set of options.
- `PrimaryId`: This mapping type is used for the primary ID field of the CRM entity. The primary ID field is the unique identifier for the entity record.

## Define Linked Entities with the CrmLink Attribute

In addition to the `CrmEntity` and `CrmField` attributes, you can also use the `CrmLink` attribute to map linked entities. This attribute allows you to establish relationships between different entities in your CRM.

Here's how you can use it:

```csharp
[CrmEntity("order")]
public class Order
{
    [CrmField("orderid", Mapping = MappingType.PrimaryId)]
    public Guid OrderId { get; set; }

    [CrmField("totalamount")]
    public decimal? TotalAmount { get; set; }

    [CrmLink("person")]
    public Person Person { get; set; }
}
```

In the example above, the `Order` class has a `Person` property that represents the person associated with the order. The `CrmLink` attribute is used to specify that this property maps to a linked entity in the CRM.

And that's it! You can now use the source generator to generate mapper classes for your entity classes and easily map between your entity classes and the corresponding CRM entities.


:::

### About
:::note

Mapper for Dataverse client - generates also column names from properties


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DynamicsMapper**
```xml showLineNumbers {17}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="Microsoft.PowerPlatform.Dataverse.Client" Version="1.1.14" />
	  <PackageReference Include="YC.DynamicsMapper" Version="1.0.8" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DynamicsMapper\src\MapperDemo\Program.cs" label="Program.cs" >

  This is the use of **DynamicsMapper** in *Program.cs*

```csharp showLineNumbers 
using NextGenMapperDemo;
var pm = new PersonMapper();
Console.WriteLine(pm.Entityname);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DynamicsMapper\src\MapperDemo\Person.cs" label="Person.cs" >

  This is the use of **DynamicsMapper** in *Person.cs*

```csharp showLineNumbers 

using DynamicsMapper.Abstractions;

namespace NextGenMapperDemo;


[CrmEntity("person")]
public class Person
{
    [CrmField("personid", Mapping = MappingType.PrimaryId)]
    public Guid ID { get; set; }
    [CrmField("name")]

    public string? Name { get; set; }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DynamicsMapper\src\MapperDemo\obj\GX\DynamicsMapper\DynamicsMapper.MapperGenerator\EntityExtentions.g.cs" label="EntityExtentions.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using Microsoft.Xrm.Sdk;
using System.Linq;

namespace DynamicsMapper.Extension
{
    public static class EntityExtension
    {
        public static Entity? GetAliasedEntity(this Entity entity, string alias)
        {
            var attributes = entity.Attributes.Where(e => e.Key.StartsWith(alias)).ToArray();
            if (!attributes.Any())
                return null;
            var aliasEntity = new Entity();
            foreach (var attribute in attributes)
            {
                if (!(attribute.Value is AliasedValue aliasedValued))
                    continue;
                if (string.IsNullOrEmpty(aliasEntity.LogicalName))
                    aliasEntity.LogicalName = aliasedValued.EntityLogicalName;
                aliasEntity[aliasedValued.AttributeLogicalName] = aliasedValued.Value;
            }

            return aliasEntity;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DynamicsMapper\src\MapperDemo\obj\GX\DynamicsMapper\DynamicsMapper.MapperGenerator\IEntityMapper.g.cs" label="IEntityMapper.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace DynamicsMapper.Mappers
{
    public interface IEntityMapper<T>
    {
        public string Entityname { get; }
        public ColumnSet Columns { get; }

        public T Map(Entity entity);
        public T? Map(Entity entity, string alias);
        public Entity Map(T model);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DynamicsMapper\src\MapperDemo\obj\GX\DynamicsMapper\DynamicsMapper.MapperGenerator\PersonMapper.g.cs" label="PersonMapper.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using DynamicsMapper.Extension;
using DynamicsMapper.Mappers;
using System;

namespace NextGenMapperDemo
{
    public class PersonMapper : IEntityMapper<Person>
    {
        private static readonly string[] columns = new[]
        {
            "personid",
            "name"
        };
        public ColumnSet Columns => new ColumnSet(columns);

        private const string entityname = "person";
        public string Entityname => entityname;

        public Entity Map(Person person)
        {
            var entity = new Entity(entityname);
            entity.Id = person.ID;
            entity["name"] = person.Name;
            return entity;
        }

        public Person? Map(Entity entity, string alias) => InternalMap(entity, alias);
        public Person Map(Entity entity) => InternalMap(entity)!;
        private static Person? InternalMap(Entity source, string? alias = null)
        {
            Entity? entity;
            if (string.IsNullOrEmpty(alias))
            {
                entity = source;
            }
            else
            {
                entity = source.GetAliasedEntity(alias);
                if (entity is null)
                    return null;
            }

            if (entity?.LogicalName != entityname)
                throw new ArgumentException($"entity LogicalName expected to be {entityname} recived: {entity?.LogicalName}", "entity");
            var person = new Person();
            person.ID = entity.GetAttributeValue<Guid>("personid");
            person.Name = entity.GetAttributeValue<string?>("name");
            return person;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project DynamicsMapper ](/sources/DynamicsMapper.zip)

:::


### Share DynamicsMapper 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper&quote=DynamicsMapper" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper&text=DynamicsMapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper&title=DynamicsMapper" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper&title=DynamicsMapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDynamicsMapper" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DynamicsMapper

### In the same category (Mapper) - 5 other generators


#### [AutoDTO](/docs/AutoDTO)


#### [MagicMap](/docs/MagicMap)


#### [mapperly](/docs/mapperly)


#### [MapTo](/docs/MapTo)


#### [NextGenMapper](/docs/NextGenMapper)

