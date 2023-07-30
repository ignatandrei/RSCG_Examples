# QuickConstructor
[![QuickConstructor](https://img.shields.io/nuget/v/QuickConstructor.svg?style=flat-square&color=blue&logo=nuget)](https://www.nuget.org/packages/QuickConstructor/)

QuickConstructor is a reliable and feature-rich source generator that can automatically emit a constructor from the fields and properties of a class. 

## Features

- Decorate any class with the `[QuickConstructor]` attribute to automatically generate a constructor for that class.
- The constructor updates in real-time as the class is modified.
- Customize which fields and properties are initialized in the constructor.
- Generate null checks automatically based on nullable annotations.
- Works with nested classes and generic classes.
- Supports derived classes.
- Supports classes, records and structs.
- Ability to place attributes on the parameters of the generated constructor.
- No traces left after compilation, no runtime reference necessary.
- Generate XML documentation automatically for the constructor.
- Lightning fast thanks to the .NET 6.0 incremental source generator system.

## Example

Code without QuickConstructor:

```csharp
public class Car
{
    private readonly string _registration;
    private readonly string _model;
    private readonly string _make;
    private readonly string _color;
    private readonly int _year;

    public Car(string registration, string model, string make, string color, int year)
    {
        _registration = registration;
        _model = model;
        _make = make;
        _color = color;
        _year = year;
    }
}
```

With QuickConstructor, this becomes:

```csharp
[QuickConstructor]
public partial class Car
{
    private readonly string _registration;
    private readonly string _model;
    private readonly string _make;
    private readonly string _color;
    private readonly int _year;
}
```

The constructor is automatically generated from the field definitions.

## Installation

The requirements to use the QuickConstructor package are the following:

- Visual Studio 17.0+
- .NET SDK 6.0.100+

Install the NuGet package:

```
dotnet add package QuickConstructor
```

## Usage

QuickConstructor is very easy to use. By simply decorating a class with the `[QuickConstructor]` attribute and making the class `partial`, the source generator will automatically create a constructor based on fields and properties declared in the class. The constructor will automatically update to reflect any change made to the class.

QuickConstructor offers options to customize various aspects of the constructors being generated.

### Fields selection

Quick constructors will always initialize read-only fields as the constructor would otherwise cause a compilation error. However mutable fields can either be included or excluded from the constructor. This is controlled via the `Fields` property of the `[QuickConstructor]` attribute. The possible values are:

| Value                          | Description |
| ------------------------------ | ----------- |
| `IncludeFields.ReadOnlyFields` | **(default)** Only read-only fields are initialized in the constructor. |
| `IncludeFields.AllFields` | All fields are initialized in the constructor. |

Fields with an initializer are never included as part of the constructor.

### Properties selection

It is possible to control which property is initialized in the constructor via the `Properties` property of the `[QuickConstructor]` attribute. The possible values are:

| Value                    | Description |
| ------------------------ | ----------- |
| `IncludeProperties.None` | No property is initialized in the constructor. |
| `IncludeProperties.ReadOnlyProperties` | **(default)** Only read-only auto-implemented properties are initialized in the constructor. |
| `IncludeProperties.AllProperties` | All settable properties are initialized in the constructor. |

Properties with an initializer are never included as part of the constructor.

### Null checks

QuickConstructor has the ability to generate null checks for reference parameters. This is controlled via the `NullCheck` property of the `[QuickConstructor]` attribute. The possible values are:

| Value               | Description |
| ------------------- | ----------- |
| `NullChecks.Always` | Null checks are generated for any field or property whose type is a reference type. |
| `NullChecks.Never` | Null checks are not generated for this constructor. |
| `NullChecks.NonNullableReferencesOnly` | **(default)** When null-state analysis is enabled (C# 8.0 and later), a null check will be generated only if a type is marked as non-nullable. When null-state analysis is disabled, no null check is generated. |

For example, with null-state analysis enabled:

```csharp
[QuickConstructor]
public partial class Name
{
    private readonly string _firstName;
    private readonly string? _middleName;
    private readonly string _lastName;
}
```

This code will result in the following constructor being generated:

```csharp
public Name(string firstName, string? middleName, string lastName)
{
    if (firstName == null)
        throw new ArgumentNullException(nameof(firstName));

    if (lastName == null)
        throw new ArgumentNullException(nameof(lastName));

    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
}
```

### Explicitely include a field or property

It is possible to explicitely include a field or property by decorating it with the `[QuickConstructorParameter]`.

For example:

```csharp
[QuickConstructor]
public partial class Vehicle
{
    [QuickConstructorParameter]
    private int _mileage;

    private int _speed;
}
```

will result in this constructor:

```csharp
public Vehicle(int mileage)
{
    this._mileage = mileage;
}
```

While both `_mileage` and `_speed` are mutable fields, and therefore are exluded by default, `_mileage` does get initialized in the constructor because it is decorated with `[QuickConstructorParameter]`.

### Overriding the name of a parameter

It is possible to override the name of a parameter in the constructor using the `Name` property of the `[QuickConstructorParameter]` attribute.

This class:

```csharp
[QuickConstructor]
public partial class Vehicle
{
    [QuickConstructorParameter(Name = "startingMileage")]
    private int _mileage;

    private int _speed;
}
```

will result in this constructor:

```csharp
public Vehicle(int startingMileage)
{
    this._mileage = startingMileage;
}
```

### Derived classes

It is possible to generate a constructor for a class inheriting from a base class, however the base class must either itself be decorated with `[QuickConstructor]`, or it must have a parameterless constructor.

For example:

```csharp
[QuickConstructor(Fields = IncludeFields.AllFields)]
public partial class Vehicle
{
    private int _mileage;
    private int _speed;
}

[QuickConstructor]
public partial class Bus : Vehicle
{
    private readonly int _capacity;
}
```

In that situation, a constructor will be generated for the `Bus` class, with the following implementation:

```csharp
public Bus(int mileage, int speed, int capacity)
    : base(mileage, speed)
{
    this._capacity = capacity;
}
```

### Constructor accessibility

It is possible to customize the accessibility level of the auto-generated constructor. This is controlled via the `ConstructorAccessibility` property of the `[QuickConstructor]` attribute.

## License

Copyright 2022 Flavien Charlon

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
