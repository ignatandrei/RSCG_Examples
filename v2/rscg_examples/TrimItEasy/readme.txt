# TrimItEasy

A simple and efficient .NET library for automatically trimming string properties in complex objects.

## Installation

Install the package from NuGet:

```bash
dotnet add package TrimItEasy
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package TrimItEasy
```

## Usage

### Basic Usage

Simply call the `TrimStrings()` extension method on any complex object:

```csharp
using TrimItEasy;

public class Person
{
    public string Name { get; set; }

    public string Email { get; set; }

    public Address HomeAddress { get; set; }
}

var person = new Person 
{
    Name = "  John Doe  ",
    Email = "  john@example.com  ",
    HomeAddress = new Address 
    {
        Street = "  123 Main St  ",
        City = "  New York  "
    }
};

// Trim all string properties
person.TrimStrings();
```

### Skip Trimming Specific Properties

Use the `[NotTrimmed]` attribute to prevent trimming of specific properties:

```csharp
public class Address
{
    [NotTrimmed]
    public string Street { get; set; }  // This property will not be trimmed
    
    public string City { get; set; }    // This property will be trimmed
}

var address = new Address 
{
    Street = "  123 Main St, Apt 4B  ",  // Will remain unchanged
    City = "  New York  "                 // Will be trimmed to "New York"
};

address.TrimStrings();
```

### Recursive Trimming

By default, the library recursively trims all string properties in nested objects up to a maximum depth of 64 levels. You can customize this behavior using `TrimmingOptions`:

```csharp
// Only trim top-level string properties (disable recursion)
person.TrimStrings(new TrimmingOptions { Recursive = false });

// Limit recursion to 2 levels of nested objects
person.TrimStrings(new TrimmingOptions { MaxDepth = 2 });

// Only trim the top-level object's string properties (no nested objects)
person.TrimStrings(new TrimmingOptions { MaxDepth = 0 });
```

| Option      | Type   | Default | Description                                                                                          |
|-------------|--------|---------|------------------------------------------------------------------------------------------------------|
| `Recursive` | `bool` | `true`  | Whether to trim strings in nested objects. When `false`, only top-level string properties are trimmed.|
| `MaxDepth`  | `int`  | `64`    | Maximum depth for recursive trimming. `0` trims only top-level properties, `1` includes one level of nested objects, and so on. |

### Supported Types

The library works with:
- Complex objects with string properties
- Collections (Lists, Arrays, etc.)
- Nested objects
- Properties marked with `[NotTrimmed]` will be skipped

### Limitations

The library will throw an `ArgumentException` if you try to use it on:
- String types (use `string.Trim()` instead)
- Primitive types
- Enum types

## Examples

### Working with Collections

```csharp
public class Company
{
    public string Name { get; set; }

    public List<Employee> Employees { get; set; }
}

public class Employee
{
    public string Name { get; set; }

    [NotTrimmed]
    public string EmployeeId { get; set; }
}

var company = new Company
{
    Name = "  Acme Corp  ",
    Employees = new List<Employee>
    {
        new Employee { Name = "  John Doe  ", EmployeeId = "  E001  " },
        new Employee { Name = "  Jane Smith  ", EmployeeId = "  E002  " }
    }
};

company.TrimStrings();
// Result:
// - company.Name = "Acme Corp"
// - company.Employees[0].Name = "John Doe"
// - company.Employees[0].EmployeeId = "  E001  " (not trimmed due to [NotTrimmed])
```

### Working with Nested Objects

```csharp
public class Order
{
    public string OrderNumber { get; set; }

    public Customer Customer { get; set; }

    public List<OrderItem> Items { get; set; }
}

public class Customer
{
    public string Name { get; set; }

    [NotTrimmed]
    public string PhoneNumber { get; set; }
}

var order = new Order
{
    OrderNumber = "  ORD-001  ",
    Customer = new Customer
    {
        Name = "  John Doe  ",
        PhoneNumber = "  +1 (555) 123-4567  "
    },
    Items = new List<OrderItem>
    {
        new OrderItem { Description = "  Product A  " }
    }
};

order.TrimStrings();
// All string properties will be trimmed except Customer.PhoneNumber
```

### Source Generator (Zero Reflection)

For maximum performance, TrimItEasy includes a source generator that produces optimized trimming code at compile time � no reflection at runtime.

#### Installation

Install both the core library and the source generator package:

```bash
dotnet add package TrimItEasy
dotnet add package TrimItEasy.Generators
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package TrimItEasy
Install-Package TrimItEasy.Generators
```

> **Note:** The `TrimItEasy.Generators` package must be referenced as an analyzer. If you are referencing the project directly, use:
> ```xml
> <ProjectReference Include="..\TrimItEasy.Generators\TrimItEasy.Generators.csproj"
>                   OutputItemType="Analyzer"
>                   ReferenceOutputAssembly="false" />
> ```

#### Usage

1. **Define a `static partial` extension method** that takes your target type as a `this` parameter and returns `void`.
2. **Annotate it with `[GeneratedTrimming]`**.

The source generator will implement the method body automatically.

```csharp
using TrimItEasy;

public class Person
{
    public string Name { get; set; }
    public string Email { get; set; }
    public Address HomeAddress { get; set; }
    public List<Phone> Phones { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
}

public class Phone
{
    public string Type { get; set; }
    public string Number { get; set; }
}

// Define the partial method � the source generator fills in the implementation
public static partial class PersonExtensions
{
    [GeneratedTrimming]
    public static partial void FastTrimStrings(this Person person);
	
    [GeneratedTrimming]
    public static partial void FastTrimStringsWithOptions(this Person person, TrimmingOptions? options = null);
}
```

Then simply call the generated method:

```csharp
var person = new Person
{
    Name = "  John Doe  ",
    Email = "  john@example.com  ",
    HomeAddress = new Address
    {
        Street = "  123 Main St  ",
        City = "  New York  "
    },
    Phones = new List<Phone>
    {
        new Phone { Type = "  Mobile  ", Number = " 123-456-7890 " }
    }
};

person.FastTrimStrings();
// All string properties are trimmed, including nested objects and collections
```

#### How It Works

- The source generator analyzes the target type's property graph at compile time.
- It generates a dedicated trimming method that directly accesses each string property � no reflection involved.
- Nested objects and collections (`List<T>`, arrays, etc.) are handled recursively.
- Properties marked with `[NotTrimmed]` are respected and skipped.
- Circular references are detected and handled safely using a visited set.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.