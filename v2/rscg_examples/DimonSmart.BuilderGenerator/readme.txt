# BuilderGenerator

**BuilderGenerator** is a Roslyn Source Generator that creates Builder classes at compile time. It�s especially helpful for classes with many properties, giving you a clear, explicit way to see what�s being initialized. You can even generate builders for third-party classes, and a simple hierarchy is supported, including links from child objects back to their parent. If you need something more specialized, take the generated code and adapt it to fit your own needs.

---

## Installation

Install via NuGet:

```
dotnet add package BuilderGenerator
```

Or use your preferred IDE�s NuGet package manager interface.

---

## How It Works

The **BuilderGenerator** uses two main approaches to specify which class to generate a builder for:

1. **Attribute directly on the class.**  
2. **Attribute on a �container� class** where you specify `TargetType` in `[GenerateBuilder(TargetType = typeof(YourClass))]`.

Below are some examples.

---

## Examples

### 1. Simple Scenario: Attribute on the Class

In this example, we have a `Person` class and an `Address` class. We annotate them directly:

```
csharp
using BuilderGenerator.Runtime;

namespace BuilderGenerator.Sample
{
    public interface IPerson
    { }

    [GenerateBuilder] // Directly on the Person class
    public class Person : IPerson
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public Address? Address { get; set; }
    }

    [GenerateBuilder] // Directly on the Address class
    public class Address
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public IPerson? Person { get; set; }
    }
}
```

Thanks to these attributes, the Source Generator will create:

- `PersonBuilder` (with fluent methods `Name(...)`, `Age(...)`, `Address(...)`)
- `AddressBuilder` (with fluent methods `Street(...)`, `City(...)`, `Person(...)`)

**Usage** might look like:

```
csharp
var person = PersonBuilder.Create()
    .Name("John")
    .Age(30)
    // Here we invoke a nested Address builder
    .Address(addr => addr
        .Street("Main St.")
        .City("Metropolis")
    )
    .Build();
```

After building, `person` becomes an instance of the `Person` class populated with those property values.

---

### 2. Container Approach: Attribute on Another Class

Sometimes you might not want to mark the target class directly with `[GenerateBuilder]`.  
Instead, you can create a separate "container" class (or file) and specify which type it should generate a builder for:

```
csharp
using BuilderGenerator.Runtime;

namespace BuilderGenerator.OtherSamples
{
    [GenerateBuilder(TargetType = typeof(Person))]
    [GenerateBuilder(TargetType = typeof(Address))]
    public class PersonBuilderContainer
    {
        // Could be empty
    }

    // Meanwhile, Person and Address themselves have no direct attribute:
    public class Person
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public Address? Address { get; set; }
    }

    public class Address
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public IPerson? Person { get; set; }
    }
}
```

The generator will now produce `PersonBuilderContainerBuilder.g.cs` and `AddressBuilderContainerBuilder.g.cs` (or very similarly named files) that act as your fluent builder classes.

**Usage** is the same pattern:

```
csharp
var person = PersonBuilderContainer.Create()
    .Name("Alice")
    .Age(25)
    .Address(addr => addr
        .Street("Baker St.")
        .City("London")
    )
    .Build();
```

---

### 3. Hierarchical Builder Example

The above code already shows how you can nest calls, for example:

```
csharp
var person = PersonBuilder.Create()
    .Name("Bruce")
    .Age(42)
    .Address(a => a
        .Street("Gotham Rd.")
        .City("Gotham")
    )
    .Build();
```

When `Address(...)` is called, the generator automatically creates a nested builder for `Address`.

---

### 4. Setting a Reference to the Parent

In some scenarios, you may want an object to reference its �parent.� For instance, an `Address` might have a property `Person Person { get; set; }`. In your example, `IPerson? Person { get; set; }` is a reference back to the parent. The Source Generator includes a helper method called:

```
csharp
public TParent BuildAndSetParent<TProperty>(
    Expression<Func<TheChildClass, TProperty>> parentSelector
) where TProperty : class
{
    // ...
}
```

This method allows you to set the parent reference in the child builder. Here�s a conceptual usage snippet (the code is somewhat simplified to illustrate the idea):

```
csharp
var personBuilder = PersonBuilder.Create();
var addressBuilder = AddressBuilder.Create();

// Suppose you want address.Person to be the person you are building
// and want the final personBuilder to keep track of the newly built Address:

addressBuilder
    .Street("Parent Av.")
    .City("Capital City")
    .BuildAndSetParent(a => a.Person); 
    // "a => a.Person" indicates that the child Person property should refer back to the parent
```

---

## License

**0BSD License**:  
You�re free to use, copy, modify, distribute, and do pretty much anything else with BuilderGenerator.  
See the [0BSD text](https://opensource.org/licenses/0BSD) for details.

---

## Contributing

If you encounter bugs or have feature requests, feel free to open an issue or submit a pull request on [GitHub](https://github.com/DimonSmart/BuilderGenerator).
```