# MapTo
[![Nuget](https://img.shields.io/nuget/v/mapto?logo=nuget)](https://www.nuget.org/packages/MapTo/)
![Publish Packages](https://github.com/mrtaikandi/MapTo/workflows/Publish%20Packages/badge.svg)

A convention based object to object mapper using [Roslyn source generator](https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.md).

MapTo is a library that programmatically generates the necessary code to map one object to another during compile-time. It eliminates the need to use reflection to map objects and makes it much faster in runtime. It provides compile-time safety checks and ease of use by leveraging extension methods.


## Installation
```
dotnet add package MapTo --prerelease
```

## Usage
Unlike other libraries that require a separate class to define the mappings, `MapTo` uses attributes to define and instruct it on generating the mappings. To start, declare the target class and annotate it with the `MapFrom` attribute to specify the source class.

```c#
using MapTo;

namespace App.ViewModels;

[MapFrom(typeof(App.Data.Models.User))]
public class UserViewModel 
{
    public string FirstName { get; init; }

    public string LastName { get; init; }
    
    [IgnoreProperty]
    public string FullName { get; set; }
}
```

To get an instance of `UserViewModel` from the `User` class, you can use the generated extension method:

```c#
var user = new User(id: 10) { FirstName = "John", LastName = "Doe" };

var vm = user.MapToUserViewModel(); // A generated extension method for User class.
```

Sometimes, the target class (UserViewModel in this case) might have read-only properties that need to be set during the mapping. To do that, you can define the properties without setters and declare the target class as partial. Changing the class to partial will allow the `MapTo` generator to create the necessary constructor to initialize the read-only properties.

```c#
[MapFrom(typeof(App.Data.Models.User))]
public partial class UserViewModel 
{
    public int Id { get; }
    
    public string FirstName { get; init; }

    public string LastName { get; init; }
    
    [IgnoreProperty]
    public string FullName { get; set; }
}
```

## Available Attributes

### MapFrom
As mentioned above, this attribute is used to specify the source class. It also can be used to specify custom methods to run on before or after the mapping process.

```c#
[MapFrom(typeof(App.Data.Models.User), BeforeMap = nameof(RunBeforeMap), AfterMap = nameof(RunAfterMap))]
public partial class UserViewModel
{
    public int Id { get; }

    ...
    
    // The BeforeMap method can also return a `User` type. If so, 
    // the returned value will be used as the source object.
    // Or it can return `null` to skip the mapping process and return `null` to 
    // the extension method's caller.
    private static void RunBeforeMap(User? source) { /* ... */ }
    
    private static void RunAfterMap(UserViewModel target) { /* ... */ }
}
```

### IgnoreProperty
By default, MapTo will include all properties with the same name (case-sensitive), whether read-only or not, in the mapping unless annotating them with the `IgnoreProperty` attribute.
```c#
[IgnoreProperty]
public string FullName { get; set; }
``` 

### MapProperty
This attribute gives you more control over how the annotated property should get mapped. For instance, if the annotated property should use a property in the source class with a different name.

```c#
[MapProperty(From = "Id")]
public int Key { get; set; }
```

### PropertyTypeConverter
A compilation error gets raised by default if the source and destination properties types are not implicitly convertible, but to convert the incompatible source type to the desired destination type, `PropertyTypeConverterAttribute` can be used.

This attribute will accept a static method in the target class or another class to convert the source type to the destination type. The method must have the following signature:

```c#
public static TDestination Convert(TSource source)

// or

public static TDestination Convert(TSource source, object[]? parameters)
```

```c#
[MapFrom(typeof(User))]
public partial class UserViewModel
{
    public DateTimeOffset RegisteredAt { get; set; }
    
    [IgnoreProperty]
    public ProfileViewModel Profile { get; set; }
    
    [MapProperty(From = nameof(User.Id))]    
    [PropertyTypeConverter(nameof(IntToHexConverter))]
    public string Key { get; }

    private static string IntToHexConverter(int source) => $"{source:X}"; // The converter method.
}
```
