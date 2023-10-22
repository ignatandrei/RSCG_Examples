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
