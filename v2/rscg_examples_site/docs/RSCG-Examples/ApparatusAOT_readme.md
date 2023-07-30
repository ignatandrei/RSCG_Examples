# AOT.Reflection is faster reflection powered via Source Generators

This library aims to create a subset of reflection that will be faster than the default one and will not break at the platforms with the AOT compilation support. The source generators will help us with that.

# How to use

To make it work, you will need to install a NuGet package ``` Apparatus.AOT.Reflection ```:

```
dotnet add package Apparatus.AOT.Reflection
```

Then you can use it like that:

``` cs
public class User
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
}

public static void Main()
{
    var user = new User();
    var properties = user.GetProperties().Values;
    foreach (var property in properties)
    {
        Console.WriteLine(property.Name);
    }
}
```

This sample will print the names of properties.
```
FirstName
LastName
```

Also, it works for enums too:
``` cs 

public enum UserKind 
{
    User,
    Admin
}

// ...

public static void Main()
{
    var values = EnumHelper.GetEnumInfo<UserKind>();
    foreach (var value in values)
    {
        Console.WriteLine(value.Name);
    }
}

```

You will see:
```
User
Admin
```

It does not end with the only property names. You can get property values and assigned attributes. 

Here is an example:

``` cs
var requiredProperties = _user
    .GetProperties()
    .Values
    .Where(o => o.Attributes.Any(attr => attr is RequiredAttribute))
    .ToArray();

foreach (var requiredProperty in requiredProperties)
{
    if (requiredProperty.TryGetValue(_user, out var value))
    {
        Console.WriteLine($"{requiredProperty.Name} => {value}");
    }
}
```

The same applies to enums too. Let have a look at the following sample:
``` cs 
public enum AccountKind
{
    [Description("User account")]
    User,
    [Description("Admin account")]
    Admin,
    [Description("Customer account")]
    Customer,
    [Description("Manager account")]
    Manager
}

// ...

var values = EnumHelper.GetEnumInfo<AccountKind>();
foreach (var value in values)
{
    var description = value.Attributes
        .OfType<DescriptionAttribute>()
        .First();
    
    Console.WriteLine($"{value.Name} => {description.Description}");
}
```
# KeyOf

The AOT.Reflection contains a way to express the intention safely when you want to pass the property inside the method. It works similarly to `` keyof `` from TypeScript. Here is an example:

``` cs
using Apparatus.AOT.Reflection;

var user = new User {FirstName = "Jon", LastName = "Smith"};
var firstName = DoIt (user, "FirstName"); // no error
var lastName = DoIt (user, "LastName"); // no error
var missingProperty = DoIt (user, "Test"); // compilation error


object DoIt <T> (T value, KeyOf <T> propertyName)
{
     var property = value.GetProperties () [propertyName];
     if (property.TryGetValue (value, out var propertyValue))
     {
         return propertyValue;
     }

     return null;
}

class User
{
     public string FirstName {get; set; }
     public string LastName {get; set; }
}
```

More information you can find in separate [article](https://dev.to/byme8/improving-c-with-typescript-keyof-t-1jea).

# Performance

Let's imagine that we need to find a property with ``` Required ``` attribute and the name  ``` FirstName ```.
If it exists, then print the value of the property, otherwise return the empty string. The implementation will be messy because I don't want to measure the LINQ performance, but the overall idea must be clear.

Here is the source code with default reflection:
``` cs
var type = _user.GetType();
var property = type.GetProperty(nameof(User.FirstName));

var required = false;
foreach (var o in property.GetCustomAttributes())
{
    if (o.GetType() == typeof(RequiredAttribute))
    {
        required = true;
        break;
    }
}

if (required)
{
    return (string)property.GetMethod?.Invoke(_user, null);
}

return string.Empty;

```

Here the source code with aot reflection:
``` cs 
var entries = _user.GetProperties();
var firstName = entries[nameof(User.FirstName)];

var required = false;
foreach (var o in firstName.Attributes)
{
    if (o is RequiredAttribute)
    {
        required = true;
        break;
    }
}

if (required)
{
    if (firstName.TryGetValue(_user, out var value))
    {
        return (string)value;
    }

    return string.Empty;
}

return string.Empty;
```

Here are the benchmark results:
``` 
BenchmarkDotNet=v0.13.1, OS=Windows 10.0.19043.1165 (21H1/May2021Update)
11th Gen Intel Core i7-11700KF 3.60GHz, 1 CPU, 16 logical and 8 physical cores
.NET SDK=6.0.100-preview.7.21379.14
  [Host]     : .NET 5.0.7 (5.0.721.25508), X64 RyuJIT
  DefaultJob : .NET 5.0.7 (5.0.721.25508), X64 RyuJIT


|        Method |        Mean |    Error |   StdDev |  Gen 0 | Allocated |
|-------------- |------------:|---------:|---------:|-------:|----------:|
|    Reflection | 1,758.91 ns | 2.714 ns | 2.406 ns | 0.1278 |   1,072 B |
| AOTReflection |    16.01 ns | 0.090 ns | 0.075 ns |      - |         - |
```

As you can see, the AOT.Reflection is significantly faster comparing to default reflection.

Now let's have a look at enums performance. Imagine that we have the enum value, and we need to get a description associated with it.
Here how it will look:
``` cs 
var attributes = _account.GetEnumValueInfo().Attributes;
for (int i = 0; i < attributes.Length; i++)
{
    var attribute = attributes[i];
    if (attribute is DescriptionAttribute descriptionAttribute)
    {
        return descriptionAttribute.Description;
    }
}

return "";
```

Here is the results:
``` cs
|              Method |       Mean |     Error |    StdDev |  Gen 0 | Allocated |
|-------------------- |-----------:|----------:|----------:|-------:|----------:|
|        GetValuesAOT |   6.253 ns | 0.0394 ns | 0.0329 ns |      - |         - |
| GetValuesReflection | 734.563 ns | 2.3173 ns | 1.9351 ns | 0.0324 |     272 B |
```
And again, the AOT reflection works much faster.

The complete source code of benchmarks you can find [here](https://github.com/byme8/Apparatus.AOT.Reflection/blob/master/src/Apparatus.AOT.Reflection.Benchmark/Program.cs).

# Limitations

I would recommend being careful when you try to use these APIs inside the generic methods because, at this point, there is no easy way to analyze them and identify the correct signatures. It means the source generation will not happen. As a result, we will have an error at runtime.
Let's have a look at the following sample:
``` cs
public class Program
{
    public static string? GetDescription<T>(T enumValue)
        where T : Enum
    {
        return enumValue
            .GetEnumValueInfo()
            .Attributes
            .OfType<DescriptionAttribute>()
            .FirstOrDefault()
            ?.Description;
    }
    
    public static void Main()
    {
        var account = AccountKind.Admin;
        Console.WriteLine(GetDescription(account));
    }
}
```
We will have an exception if we run it because the source generator could not figure out the signatures. The type `` T `` is the mystery for it.
But we can fix it with a small trick:
``` cs
public class Program
{
    private void DontCallMe()
    {
        EnumHelper.GetEnumInfo<AccountKind>();
    }
    
    public static string? GetDescription<T>(T enumValue)
        where T : Enum
    {
        return enumValue
            .GetEnumValueInfo()
            .Attributes
            .OfType<DescriptionAttribute>()
            .FirstOrDefault()
            ?.Description;
    }
    
    public static void Main()
    {
        var account = AccountKind.Admin;
        Console.WriteLine(GetDescription(account));
    }
}

```
Pay attention to the ``DontCallMe `` method. We do not have any intention to use it anywhere. It is here to help the source generator to analyze the source code. Now, if we run it, everything works as expected.
The same issue exists for the properties reflection, and we can use the same trick to avoid it.


# Support

Right now, only public properties and enums are supported. Regarding the private members, I doubt them because they would ruin the performance, but we will see.
