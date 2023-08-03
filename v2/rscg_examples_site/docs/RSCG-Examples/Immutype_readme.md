# Immutype

[![NuGet](https://buildstats.info/nuget/Immutype)](https://www.nuget.org/packages/Immutype)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[<img src="http://teamcity.jetbrains.com/app/rest/builds/buildType:(id:OpenSourceProjects_DevTeam_Immutype_BuildAndTestBuildType)/statusIcon"/>](http://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_DevTeam_Immutype_BuildAndTestBuildType&guest=1)

_Immutype_ is [.NET code generator](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) creating extension methods for records, structures, and classes marked by the attribute `````[Immutype.Target]````` to efficiently operate with instances of these types like with immutable ones.

For instance, for the type Foo for the constructor parameter *__values__* of type ```IEnumerable<int>``` following extension methods are generated:

- ```Foo WithValues(this Foo it, params int[] values)``` - to replace values by the new ones using a method with variable number of arguments
- ```Foo WithValues(this Foo it, IEnumerable<int> values)``` - to replace values by the new ones
- ```Foo AddValues(this Foo it, params int[] values)``` - to add values using a method with variable number of arguments
- ```Foo AddValues(this Foo it, IEnumerable<int> values)``` - to add values
- ```Foo RemoveValues(this Foo it, params int[] values)``` - to remove values using a method with variable number of arguments
- ```Foo RemoveValues(this Foo it, IEnumerable<int> values)``` - to remove values
- ```Foo ClearValues(this Foo it)``` - to clear all values

For the type Foo for the constructor parameter *__value__* of other types, like ```int```, with default value ```99``` following extension methods are generated:

- ```Foo WithValue(this Foo it, int value)``` - to replace a value by the new one
- ```Foo WithDefaultValue(this Foo it)``` - to replace a value by the default value *__99__*

The extensions methods above are generating automatically for each ```public``` or ```internal``` type, like *__Foo__* marked by the attribute ```[Immutype.Target]``` in the static class named as *__FooExtensions__*. This generated class *__FooExtensions__* is static, has the same accessibility level and the same namespace like a target class *__Foo__*. Each generated static extension method has two attributes:
- ```[MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]``` - to improve performance
- ```[Pure]``` - to indicate that this method is pure, that is, it does not make any visible state changes

_Immutype_ supports nullable [reference](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references) and [value](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types) types and the following list of enumerable types:

- Arrays
- ```IEnumerable<T>```
- ```List<T>```
- ```IList<T>```
- ```IReadOnlyCollection<T>```
- ```IReadOnlyList<T>```
- ```ICollection<T>```
- ```HashSet<T>```
- ```ISet<T>```
- ```Queue<T>```
- ```Stack<T>```
- ```IReadOnlyCollection<T>```
- ```IReadOnlyList<T>```
- ```IReadOnlySet<T>```
- ```ImmutableList<T>```
- ```IImmutableList<T>```
- ```ImmutableArray<T>```
- ```ImmutableQueue<T>```
- ```IImmutableQueue<T>```
- ```ImmutableStack<T>```
- ```IImmutableStack<T>```

_Immutype_ supports [IIncrementalGenerator](https://docs.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.iincrementalgenerator) as well as [ISourceGenerator](https://docs.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isourcegenerator) so it works quite effective.

## NuGet package

[![NuGet](https://buildstats.info/nuget/Immutype)](https://www.nuget.org/packages/Immutype)

- Package Manager

  ```
  Install-Package Immutype
  ```

- .NET CLI

  ```
  dotnet add package Immutype
  ```

## Development environment requirements

- [.NET SDK 5.0.102+](https://dotnet.microsoft.com/download/dotnet/5.0)
- [C# v.6 or newer](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history#c-version-40)

## Supported frameworks

- [.NET and .NET Core](https://docs.microsoft.com/en-us/dotnet/core/) 1.0+
- [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 1.0+
- [.NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/) 3.5+
- [UWP/XBOX](https://docs.microsoft.com/en-us/windows/uwp/index)
- [.NET IoT](https://dotnet.microsoft.com/apps/iot)
- [Xamarin](https://dotnet.microsoft.com/apps/xamarin)
- [.NET Multi-platform App UI (MAUI)](https://docs.microsoft.com/en-us/dotnet/maui/)


## Usage Scenarios

- Basics
  - [Sample scenario](#sample-scenario)
  - [Array](#array)
  - [Applying defaults](#applying-defaults)
  - [Clearing](#clearing)
  - [Immutable collection](#immutable-collection)
  - [Removing](#removing)
  - [Generic types](#generic-types)
  - [Nullable collection](#nullable-collection)
  - [Set](#set)
  - [Record with constructor](#record-with-constructor)
  - [Explicit constructor choice](#explicit-constructor-choice)

### Sample scenario



``` CSharp
[Immutype.Target]
internal record Person(
    string Name,
    bool HasPassport = true,
    int Age = 0,
    ImmutableArray<Person> Friends = default);

public class SampleScenario
{
    public void Run()
    {
        var john = new Person("John", false, 15)
            .AddFriends(
                new Person("David").WithAge(16),
                new Person("James").WithAge(17)
                    .WithFriends(new Person("Tyler").WithAge(16)));
            
        john.Friends.Length.ShouldBe(2);

        john = john.WithAge(16).WithDefaultHasPassport();
        john.Age.ShouldBe(16);
        john.HasPassport.ShouldBeTrue();

        john = john.AddFriends(
            new Person("Daniel").WithAge(17),
            new Person("Sophia").WithAge(18));
        
        john.Friends.Length.ShouldBe(4);
            
        john = john.RemoveFriends(new Person("David").WithAge(16));

        john.Friends.Length.ShouldBe(3);
    }
}
```



### Array



``` CSharp
[Immutype.Target]
internal readonly record struct Person(string Name, int Age = 0, params Person[] Friends);

public class Array
{ 
    public void Run()
    {
        var john = new Person("John")
            .WithAge(15)
            .AddFriends(new Person("David").WithAge(16))
            .AddFriends(
                new Person("James"),
                new Person("Daniel").WithAge(17));
        
        john.Friends.Length.ShouldBe(3);
    }
}
```



### Applying defaults



``` CSharp
[Immutype.Target]
internal readonly record struct Person(string Name = "John", int Age = 17);

public class ApplyingDefaults
{
    public void Run()
    {
        var john = new Person("David", 15)
            .WithDefaultAge()
            .WithDefaultName();
        
        john.Name.ShouldBe("John");
        john.Age.ShouldBe(17);
    }
}
```



### Clearing



``` CSharp
[Immutype.Target]
internal readonly record struct Person(
    string Name,
    int Age = 0,
    params Person[] Friends);

public class Clearing
{
    public void Run()
    {
        var john = new Person("John",15, new Person("David").WithAge(16))
            .AddFriends(new Person("James"));

        john = john.ClearFriends();
        
        john.Friends.Length.ShouldBe(0);
    }
}
```



### Immutable collection



``` CSharp
[Immutype.Target]
internal readonly struct Person
{
    public readonly string Name;
    public readonly int Age;
    public readonly IImmutableList<Person> Friends;

    public Person(
        string name,
        int age = 0,
        IImmutableList<Person>? friends = default)
    {
        Name = name;
        Age = age;
        Friends = friends ?? ImmutableList<Person>.Empty;
    }
};

public class ImmutableCollection
{
    public void Run()
    {
        var john = new Person("John",15)
            .WithFriends(
                new Person("David").WithAge(16),
                new Person("James").WithAge(17))
            .AddFriends(
                new Person("David").WithAge(22));
        
        john.Friends.Count.ShouldBe(3);
    }
}
```



### Removing



``` CSharp
[Immutype.Target]
internal readonly record struct Person(
    string Name,
    int Age = 0,
    params Person[] Friends);

public class Removing
{
    public void Run()
    {
        var john = new Person("John",15, new Person("David").WithAge(16))
            .AddFriends(new Person("James"));

        john = john.RemoveFriends(new Person("James"));
        
        john.Friends.Length.ShouldBe(1);
    }
}
```



### Generic types

It is possible to use generic types including any generic constraints.

``` CSharp
[Immutype.Target]
internal record Person<TAge>(string Name, TAge Age = default, IEnumerable<Person<TAge>>? Friends = default) 
    where TAge : struct;

public class GenericTypes
{ 
    public void Run()
    {
        var john = new Person<int>("John")
            .WithAge(15)
            .WithFriends(new Person<int>("David").WithAge(16))
            .AddFriends(
                new Person<int>("James"),
                new Person<int>("Daniel").WithAge(17));
        
        john.Friends?.Count().ShouldBe(3);
    }
}
```



### Nullable collection



``` CSharp
[Immutype.Target]
internal record Person(
    string Name,
    int? Age = default,
    ICollection<Person>? Friends = default);

public class NullableCollection
{
    public void Run()
    {
        var john = new Person("John",15)
            .AddFriends(
                new Person("David").WithAge(16),
                new Person("James").WithAge(17)
                    .WithFriends(new Person("Tyler").WithAge(16)));
        
        john.Friends?.Count.ShouldBe(2);
    }
}
```



### Set



``` CSharp
[Immutype.Target]
internal record Person(
    string Name,
    int Age = 0,
    ISet<Person>? Friends = default);

public class Set
{
    public void Run()
    {
        var john = new Person("John",15)
            .AddFriends(
                new Person("David").WithAge(16),
                new Person("David").WithAge(16),
                new Person("James").WithAge(17)
                    .WithFriends(new Person("Tyler").WithAge(16)));
        
        john.Friends?.Count.ShouldBe(2);
    }
}
```



### Record with constructor



``` CSharp
[Immutype.Target]
internal record Person
{
    public Person(
        string name,
        int? age = default,
        ICollection<Person>? friends = default)
    {
        Name = name;
        Age = age;
        Friends = friends;
    }

    public string Name { get; }

    public int? Age { get; }

    public ICollection<Person>? Friends { get; }

    public void Deconstruct(
        out string name,
        out int? age,
        out ICollection<Person>? friends)
    {
        name = Name;
        age = Age;
        friends = Friends;
    }
}

public class RecordWithConstructor
{
    public void Run()
    {
        var john = new Person("John",15)
            .WithFriends(
                new Person("David").WithAge(16),
                new Person("James").WithAge(17)
                    .WithFriends(new Person("Tyler").WithAge(16)));
        
        john.Friends?.Count.ShouldBe(2);
    }
}
```



### Explicit constructor choice



``` CSharp
[Immutype.Target]
internal readonly struct Person
{
    public readonly string Name;
    public readonly int Age;
    public readonly IImmutableList<Person> Friends;

    // You can explicitly select a constructor by marking it with the [Immutype.Target] attribute
    [Immutype.Target]
    public Person(
        string name,
        int age = 0,
        IImmutableList<Person>? friends = default)
    {
        Name = name;
        Age = age;
        Friends = friends ?? ImmutableList<Person>.Empty;
    }
    
    public Person(
        string name,
        int age,
        IImmutableList<Person>? friends,
        int someArg = 99)
    {
        Name = name;
        Age = age;
        Friends = friends ?? ImmutableList<Person>.Empty;
    }
};

public class ExplicitConstructorChoice
{
    public void Run()
    {
        var john = new Person("John",15)
            .WithFriends(
                new Person("David").WithAge(16),
                new Person("James").WithAge(17))
            .AddFriends(
                new Person("David").WithAge(22));
        
        john.Friends.Count.ShouldBe(3);
    }
}
```



