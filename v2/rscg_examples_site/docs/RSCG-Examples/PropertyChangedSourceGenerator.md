---
sidebar_position: 480
title: 48 - PropertyChangedSourceGenerator
description: Generating PropertyChange to properties
slug: /PropertyChangedSourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# PropertyChangedSourceGenerator  by Antony Male


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/PropertyChanged.SourceGenerator?label=PropertyChanged.SourceGenerator)](https://www.nuget.org/packages/PropertyChanged.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/canton7/PropertyChanged.SourceGenerator?label=updated)](https://github.com/canton7/PropertyChanged.SourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/canton7/PropertyChanged.SourceGenerator?style=social)

## Details

### Info
:::info

Name: **PropertyChangedSourceGenerator**

TODO

Author: Antony Male

NuGet: 
*https://www.nuget.org/packages/PropertyChanged.SourceGenerator/*   


You can find more details at https://github.com/canton7/PropertyChanged.SourceGenerator

Source : https://github.com/canton7/PropertyChanged.SourceGenerator

:::

### Original Readme
:::note

![Project Icon](https://raw.githubusercontent.com/canton7/PropertyChanged.SourceGenerator/master/icon-small.png) PropertyChanged.SourceGenerator
===============================================================

[![NuGet](https://img.shields.io/nuget/v/PropertyChanged.SourceGenerator.svg)](https://www.nuget.org/packages/PropertyChanged.SourceGenerator/) [![Build status](https://ci.appveyor.com/api/projects/status/r989lw0mclb6jmja?svg=true)](https://ci.appveyor.com/project/canton7/propertychanged-sourcegenerator)

Implementing `INotifyPropertyChanged` / `INotifyPropertyChanging` is annoying. PropertyChanged.SourceGenerator hooks into your compilation process to generate the boilerplate for you, automatically.

PropertyChanged.SourceGenerator works well if you're using an MVVM framework or going without, and supports various time-saving features such as:

 - Automatically notifying dependent properties.
 - Calling hooks when particular properties change.
 - Keeping track of whether any properties have changed.

### Table of Contents

1. [Installation](#installation)
1. [Quick Start](#quick-start)
1. [Versioning](#versioning)
1. [Defining your ViewModel](#defining-your-viewmodel)
1. [Defining Properties](#defining-properties)
   1. [Property Names](#property-names)
   1. [Property Accessibility](#property-accessibility)
   1. [Property Doc Comments](#property-doc-comments)
   1. [Attributes on Generated Properties](#attributes-on-generated-properties)
1. [Property Dependencies](#property-dependencies)
   1. [Automatic Dependencies](#automatic-dependencies)
   1. [Manual Dependencies with `[DependsOn]`](#manual-dependencies-with-dependson)
   1. [Manual Dependencies with `[AlsoNotify]`](#manual-dependencies-with-alsonotify)
1. [Property Changed Hooks](#property-changed-hooks)
   1. [Type Hooks with `OnPropertyChanged` / `OnPropertyChanging`](#type-hooks-with-onanypropertychanged--onanypropertychanging)
   1. [Property Hooks with `On{PropertyName}Changed` / `On{PropertyName}Changing`](#property-hooks-with-onpropertynamechanged--onpropertynamechanging)
1. [Change Tracking with `[IsChanged]`](#change-tracking-with-ischanged)
1. [Configuration](#configuration)
   1. [Generated Property Names](#generated-property-names)
   1. [`OnPropertyChanged` / `OnPropertyChanging` Method Name](#onpropertychanged--onpropertychanging-method-name)
   1. [Automatic Dependencies](#automatic-dependencies-1)
1. [Contributing](#contributing)
1. [Comparison to PropertyChanged.Fody](#comparison-to-propertychangedfody)


Installation
------------

[PropertyChanged.SourceGenerator is available on NuGet](https://www.nuget.org/packages/PropertyChanged.SourceGenerator). You'll need to be running Visual Studio 2019 16.9 or higher, or by building using the .NET SDK 5.0.200 or higher (your project doesn't have to target .NET 5, you just need to be building using a newish version of the .NET SDK).

These dependencies may change in future minor versions, see [Versioning](#versioning).

If you're using Visual Studio 17.2.6 with WPF and you get lots of "... already contains a definition for ..." error messages, [see this bug and workaround](https://github.com/dotnet/wpf/issues/6792#issuecomment-1183633402).


Quick Start
-----------

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify] private string _lastName;
    public string FullName => $"Dr. {LastName}";
}
```

Make sure your ViewModel is `partial`, and define the backing fields for your properties, decorated with `[Notify]`. When you build your project, PropertyChanged.SourceGenerator will create a partial class which looks something like:

```cs
partial class MyViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    public string LastName
    {
        get => _lastName;
        set
        {
            if (!EqualityComparer<string>.Default.Equals(_lastName, value))
            {
                _lastName = value;
                OnPropertyChanged(EventArgsCache.LastName);
                OnPropertyChanged(EventArgsCache.FullName);
            }
        }
    }

    protected virtual void OnPropertyChanged(PropertyChangedEventArgs args)
    {
        PropertyChanged?.Invoke(args);
    }
}
```

What happened there?

1. PropertyChanged.SourceGenerator spotted that you defined a partial class and at least one property was decorated with `[Notify]`, so it got involved and generated another part to the partial class.
2. It noticed that you hadn't implemented `INotifyPropertyChanged`, so it implemented it for you (it's also fine if you implement it yourself).
3. For each field decorated with `[Notify]`, it generated property with the same name (but with the leading `_` removed and the first letter capitalised) which used that field as its backing field. That property implemented `INotifyPropertyChanged`.
4. It noticed that `FullName` depended on `LastName`, so raised the `PropertyChanged` event for `FullName` whenever `LastName` changed.

**Note**: It's really important that you don't refer to the backing fields after you've defined them: let PropertyChanged.SourceGenerator generate the corresponding properties, and then always use those propertues.


Versioning
----------

Source Generators are a relatively new technology, and they're being improved all the time. Unfortunately, in order for source generators to take advantage of improvements, they must target a newer version of Visual Studio / the .NET SDK.

If/when PropertyChanged.SourceGenerator is updated to depend on a new version Visual Studio / the .NET SDK, this will be signified by a **minor version bump**: the minor version number will be incremented. Changes which mean you have to change existing *code* to keep PropertyChanged.SourceGenerator working will be signified by a **major version bump**.


| Version Number | Min Visual Studio Version | Min .NET SDK Version |
|----------------|---------------------------|----------------------|
| 1.0.x | 2019 16.9 | 5.0.200 |
| 1.1.x | 2022 17.3 | 6.0.304 |


Defining your ViewModel
-----------------------

### `INotifyPropertyChanged`

When you define a ViewModel which makes use of PropertyChanged.SourceGenerator, that ViewModel must be `partial`. If it isn't, you'll get a warning.

Your ViewModel can implement `INotifyPropertyChanged`, or not, or it can implement parts of it (such as implementing the interface but not defining the `PropertyChanged` event), or it can extend from a base class which implements `INotifyPropertyChanged`: PropertyChanged.SourceGenerator will figure it out and fill in the gaps.

If you've got a `ViewModel` base class which implements `INotifyPropertyChanged` (perhaps as part of an MVVM framework), PropertyChanged.SourceGenerator will try and find a suitable method to call in order to raise the `PropertyChanged` event. It will look for a method called `OnPropertyChanged`, `RaisePropertyChanged`, `NotifyOfPropertyChange`, or `NotifyPropertyChanged`, which covers all of the major MVVM frameworks (although this is configurable, see [Configuration](#configuration)), with one of the following signatures:

 - `void OnPropertyChanged(PropertyChangedEventArgs args)`
 - `void OnPropertyChanged(string propertyName)`
 - `void OnPropertyChanged(PropertyChangedEventArgs args, object oldValue, object newValue)`
 - `void OnPropertyChanged(string propertyName, object oldValue, object newValue)`

If it can't find a suitable method, you'll get a warning and it won't run on that particular ViewModel.

### `INotifyPropertyChanging`

Working with `INotifyPropertyChanging` is similar, with the caveat that your class or one of its base classes must implement `INotifyPropertyChanging` (not everone wants to implement this interface, so it's opt-in). You don't need to implement all of the interface members: PropertyChanged.SourceGenerator will step in and fill in the gaps.

As with `INotifyPropertyChanged`, PropertyChanged.SourceGenerator will try and find a suitable method to call in order to raise the `PropertyChanging` event. It will look for a method called `OnPropertyChanging`, `RaisePropertyChanging`, `NotifyOfPropertyChanging`, or `NotifyPropertyChanging` (again this is configurable, see [Configuration](#configuration)), with one of the following signatures:

 - `void OnPropertyChanging(PropertyChangingEventArgs args)`
 - `void OnPropertyChanging(string propertyName)`
 - `void OnPropertyChanging(PropertyChangingEventArgs args, object oldValue)`
 - `void OnPropertyChanging(string propertyName, object oldValue)`


Defining Properties
-------------------

To get PropertyChanged.SourceGenerator to generate a property which implements `INotifyPropertyChanged`, you must define the backing field for that property, and decorate it with `[Notify]`.

(This is an annoying effect of how Source Generators work. If you'd like a better way, please [vote for this issue on partial properties](https://github.com/dotnet/csharplang/discussions/3412)).

If you write:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel : INotifyPropertyChanged
{
    [Notify] private int _foo;
}
```

PropertyChanged.SourceGenerator will generate something like:

```cs
partial class MyViewModel
{
    public int Foo
    {
        get => _foo,
        set
        {
            if (!EqualityComparer<int>.Default.Equals(_foo, value))
            {
                _foo = value;
                OnPropertyChanged(EventArgsCache.Foo);
            }
        }
    }

    // PropertyChanged event, OnPropertyChanged method, etc.
}
```


### Property Names

The name of the generated property is derived from the name of the backing field, by:

1. Removing a `_` prefix, if one exists
2. Changing the first letter to upper-case

This can be customised, see [Configuration](#configuration).

If you want to manually specify the name of a particular property, you can pass a string to `[Notify]`:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel : INotifyPropertyChanged
{
    [Notify("FOO")] private int _foo;
}
```

PropertyChanged.SourceGenerator will generate a property called `FOO`.


### Property Accessibility

By default, all generated properties have public getters and public setters.

This isn't always what you want, so it's possible to override this by passing `Getter.XXX` and `Setter.XXX` to `[Notify]`.

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel : INotifyPropertyChanged
{
    [Notify(Setter.Private)]
    private int _foo;

    [Notify(Getter.PrivateProtected, Setter.Protected)]
    private string _bar;
}
```

This generates:

```cs
partial class MyViewModel
{
    public int Foo
    {
        get => _foo
        private set { /* ... */ }
    }

    protected string Bar
    {
        private protected get => _bar,
        set { /* ... */ }
    }
}
```


### Property Doc Comments

Any XML doc comments applied to your field will be copied to the generated property. Note that any such comments must appear *before* the `[Notify]` attribute.

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    /// <summary>
    /// The Foo property
    /// </summary>
    [Notify] private int _foo;
}
```

Generates:

```cs
partial class MyViewModel
{
    /// <summary>
    /// The Foo property
    /// </summary>
    public int Foo
    {
        // ...
    }
}
```


### Attributes on Generated Properties

Sometimes you need the to place attributes onto the generated property, e.g. to control validation or serialization. You can do this by passing a string containing this attribute to the `[PropertyAttribute]` attribute, e.g.:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [PropertyAttribute("[System.Xml.Serialization.XmlIgnore]")]
    [Notify] private int _foo;
}
```

The string that you pass to `[PropertAttribute]` will be pasted into the generated file verbatim. It's important to note that the generated file doesn't have any `using` statements, so you need to fully-qualify all types. For example:

```cs
[PropertyAttribute("[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]")]
```

rather than just:

```cs
[PropertyAttribute("[EditorBrowsable(EditorBrowsabeState.Never)]")]
```


### Virtual Properties

If you want the generated property to be `virtual`, use:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel : INotifyPropertyChanged
{
    [Notify(IsVirtual = true]
    private int _foo;
}
```

Generates:

```cs
partial class MyViewModel
{
    public virtual int Foo
    {
        // ...
    }
}
```


Property Dependencies
---------------------

Sometimes, you have properties which depend on other properties, for example:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify] private string _firstName;
    [Notify] private string _lastName;
    public string FullName => $"{FirstName} {LastName}";
}
```

Whenever `FirstName` or `LastName` is updated, you want to raise a PropertyChanged event for `FullName`, so that the UI also updates the value of `FullName` which is displayed.


### Automatic Dependencies

If a property has a getter which accesses a generated property on the same type, then PropertyChanged.SourceGenerator will automatically raise a PropertyChanged event every time the property it depends on changes.

For example, if you write:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify] private string _lastName;
    public string FullName => $"Dr. {LastName}";
}
```

PropertyChanged.SourceGenerator will notice that the getter for `FullName` accesses the generated `LastName` property, and so it will add code to the `LastName` setter to raise a PropertyChanged event for `FullName` whenever `LastName` is set:

```cs
partial class MyViewModel : INotifyPropertyChanged
{
    public string LastName
    {
        get => _lastName;
        set
        {
            if (!EqualityComparer<string>.Default.Equals(_lastName, value))
            {
                _lastName = value;
                OnPropertyChanged(EventArgsCache.LastName);
                OnPropertyChanged(EventArgsCache.FullName); // <-- Here
            }
        }
    }
}
```

If the property being depended on is not being generated by PropertyChanged.SourceGenerator, or is defined in a base class, then PropertyChanged.SourceGenerator handles this by overriding the `OnPropertyChanged` method. For example:

```cs
public partial class Base
{
    [Notify] private string _firstName;
}
public partial class Derived : Base
{
    [Notify] private string _middleName;
    public string LastName { get; }
    public string FullName => $"{FirstName} {MiddleName} {LastName}";
}
```

This will generate something like the following `OnPropertyChanged` method for `Derived`:

```cs
partial class Derived
{
    protected override void OnPropertyChanged(PropertyChangedEventArgs eventArgs)
    {
        base.OnPropertyChanged(eventArgs);
        switch (eventArgs.PropertyName)
        {
            case "FirstName":
            case "LastName":
                OnPropertyChanged(EventArgsCache.FullName);
                break;
        }
    }
}
```

Note that this cannot work for getters which access properties on other types, or on other instances of the current type. Also note that your property getter must reference the generated property and not its backing field (i.e. `LastName`, not `_lastName` above).

Automatic dependency resolution does not happen if the property is decorated with `[DependsOn(...)]`. Therefore, to disable automatic dependency resolution for a single property, you can decorate it with an empty `[DependsOn]`. To disable automatic dependency resolution across your entire project, set `propertychanged.auto_notify = false` in your .editorconfig, see [Configuration](#configuration).


### Manual Dependencies with `[DependsOn]`

If automatic dependencies aren't working for you, you can also specify dependencies manually using the `[DependsOn]` attribute. `[DependsOn]` takes the names of one or more generated properties, and means that a PropertyChanged event will be raised if any of those properties are set.

For example:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify] private string _firstName;
    [Notify] private string _lastName;

    [DependsOn(nameof(FirstName), nameof(LastName))]
    public string FullName { get; set; }
}
```

The generated setters for `FirstName` and `LastName` will raise a PropertyChanged event for `FullName`.

As with automatic dependencies, `[DependsOn]` can refer to properties in the current class or base classes. It can also refer to properties which don't actually exist, which means you can refer to properties on derived classes as well.


### Manual Dependencies with `[AlsoNotify]`

`[AlsoNotify]` is the opposite of `[DependsOn]`: you place it on a backing field which also has `[Notify]`, and PropertyChanged.SourceGenerator will insert code to raise a PropertyChanged for each named property whenever the generated property is set.

The named property or properties don't have to exist (although you'll get a warning if they don't), and you can raise PropertyChanged events for properties in base classes.

If you're naming a property which is generated by PropertyChanged.SourceGenerator, make sure you use the name of the generated property, and not the backing field.

For example:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify, AlsoNotify(nameof(FullName))] private string _firstName;
    [Notify, AlsoNotify(nameof(FullName))] private string _lastName;

    public string FullName { get; set; }
}
```


Property Changed Hooks
----------------------

Hooks are a way for you to be told when a generated property is changed, without needing to subscribe to a type's own PropertyChanged event.


### Type Hooks with `OnAnyPropertyChanged` / `OnAnyPropertyChanging`

#### `INotifyPropertyChanged`

The easiest way to be notified when any generated property has changed is to specify an `OnAnyPropertyChanged` method. This is called from the generated `OnPropertyChanged` method.

This method can have the following signatures, and any accessibility:

```cs
void OnAnyPropertyChanged(string propertyName);
void OnAnyPropertyChanged(string propertyName, object oldValue, object newValue);
```

In order for PropertyChanged.SourceGenerator to be able to supply values for `oldValue` and `newValue`, the `OnPropertyChanged` method in your base class must have a signature which also has these parameters.

Note that the `oldValue` might be `null`, if the property is being raised because of a [property dependency](#property-dependencies).

#### `INotifyPropertyChanging`

To be notified before a generated property changes, you can specify an `OnAnyPropertyChanging` method.

This method can have the following signatures, and any accessibility:

```cs
void OnAnyPropertyChanged(string propertyName);
void OnAnyPropertyChanged(string propertyName, object oldValue);
```

In order for PropertyChanged.SourceGenerator to be able to supply values for `oldValue`, the `OnPropertyChanging` method in your base class must have a signature which also has this parameter.

Note that the `oldValue` might be `null`, if the property is being raised because of a [property dependency](#property-dependencies).

### Property Hooks with `On{PropertyName}Changed` / `On{PropertyName}Changing`

#### `INotifyPropertyChanged`

Let's say you have a generated property called `FirstName`. If you define a method called `OnFirstNameChanged` in the same class, that method will be called every time `FirstName` changes.

This method can have two signatures:

 - `On{PropertyName}Changed()`.
 - `On{PropertyName}Changed(T oldValue, T newValue)` where `T` is the type of the property called `PropertyName`.

For example:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify] private string _firstName;
    [Notify] private string _lastName;

    private void OnFirstNameChanged(string oldValue, string newValue)
    {
        // ...
    } 

    private void OnLastNameChanged()
    {
        // ...
    }
}
```

Note that `oldValue` might have a value of `default(T)`, if the property is being raised because of a [property dependency](#property-dependencies).

#### `INotifyPropertyChanging`

Using the example above, if you define a method called `OnFirstNameChanging` in the same class, that method will be called just before `FirstName` changes.

This method can have two signatures:

 - `On{PropertyName}Changing()`.
 - `On{PropertyName}Changing(T oldValue)` where `T` is the type of the property called `PropertyName`.

Note that `oldValue` might have a value of `default(T)`, if the property is being raised because of a [property dependency](#property-dependencies).

## Change tracking with `[IsChanged]`

Sometimes you need to keep track of whether any properties on a type have been set.

If you define a `bool` property and decorate it with `[IsChanged]`, then that property will be set to `true` whenever any generate properties are set. It's then up to you to set it back to `false` when appropriate.

For example:

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [IsChanged] public bool IsChanged { get; private set; }
    [Notify] private string _firstName;
}

var vm = new MyViewModel();
Assert.False(vm.IsChanged);

vm.FirstName = "Harry";
Assert.True(vm.IsChanged);
```

That `bool IsChanged` property can also be generated by PropertyChanged.SourceGenerator, if you want a PropertyChanged event to be raised when it changed;

```cs
using PropertyChanged.SourceGenerator;
public partial class MyViewModel
{
    [Notify, IsChanged] private bool _isChanged;
}
```


Configuration
-------------

Various aspects of PropertyChanged.SourceGenerator's behaviour can be configured through a [`.editorconfig` file](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options).

If you have one already, great! If not simply add a file called `.editorconfig` in the folder which contains your `.csproj` file (if you want those settings to apply to a single project), or next to your `.sln` file (to apply them to all projects in the solution). There are various other ways to combine settings from different `.editorconfig` files, see the MSDN documentation.

All of PropertyChanged.SourceGenerator's settings must be in a `[*.cs]` section.


### Generated Property Names

There are a few settings which control how PropertyChanged.SourceGenerator turns the name of your backing field into the name of the property it generates.

```
[*.cs]

# A string to add to the beginning of any generated property name
# Default: ''
propertychanged.add_prefix =

# A semicolon-delimeted list of values to remove from the beginning of any generated property name, if present
# Default: '_'
propertychanged.remove_prefixes = _

# A string to add to the end of any generated property name
# Default: ''
propertychanged.add_suffix =

# A semicolon-delimeted list of values to remove from the end of any generated property name
# Default: ''
propertychanged.remove_suffixes =

# How the first letter of the generated property name should be capitalised
# Valid values: none, upper_case, lower_Case
# Default: upper_case
propertychanged.first_letter_capitalization = upper_case
```


### `OnPropertyChanged` / `OnPropertyChanging` Method Name

When PropertyChanged.SourceGenerator runs, it looks for a suitable pre-existing method which can be used to raise the PropertyChanged and PropertyChanging event. If none is found, it will generate a suitable method itself, if it can.

The names of the pre-existing methods which it searches for, and the name of the method which it will generate, can be configured.

```
[*.cs]

# A ';' separated list of method names to search for when finding a method to raise the
# PropertyChanged event. If none is found, the first name listed here is used to generate one.
# Default: OnPropertyChanged;RaisePropertyChanged;NotifyOfPropertyChange;NotifyPropertyChanged
propertychanged.onpropertychanged_method_name = OnPropertyChanged;RaisePropertyChanged;NotifyOfPropertyChange;NotifyPropertyChanged

# A ';' separated list of method names to search for when finding a method to raise the
# PropertyChanging event. If none is found, the first name listed here is used to generate one.
# Default: OnPropertyChanging;RaisePropertyChanging;NotifyOfPropertyChanging;NotifyPropertyChanging
propertychanged.onpropertychanging_method_name = OnPropertyChanging;RaisePropertyChanging;NotifyOfPropertyChanging;NotifyPropertyChanging
```


### Automatic Dependencies

To disable [automatic property dependency resolution](#automatic-dependencies) across your whole project, set:

```
[*.cs]

# Whether to enable automatic property dependency resolution
# Valid values: true, false
# Default: true
propertychanged.auto_notify = false 
```

Contributing
------------

It's great that you want to get involved, thank you! Please [open a discussion](https://github.com/canton7/PropertyChanged.SourceGenerator/discussions/new) before doing any serious amount of work, so we can agree an approach before you get started.

Open a feature branch based on `develop` (**not** `master`), and make sure that you submit any Pull Requests to the `develop` branch.


Comparison to PropertyChanged.Fody
----------------------------------

PropertyChanged.SourceGenerator has the same goals as PropertyChanged.Fody. Here are some of the differences:

 - PropertyChanged.Fody is able to rewrite your code, which PropertyChanged.SourceGenerator can only add to it (due to the design of Source Generators). This means that PropertyChanged.Fody is able to insert event-raising code directly into your property setters, whereas PropertyChanged.SourceGenerator needs to generate the whole property itself.
 - PropertyChanged.Fody supports some functionality which PropertyChanged.SourceGenerator does not, such as global interception. Please [let me know](https://github.com/canton7/PropertyChanged.SourceGenerator/discussions/new) if you need a bit of functionality which PropertyChanged.SourceGenerator doesn't yet support.
 - PropertyChanged.SourceGenerator supports some functionality which PropertyChanged.Fody does not, such as letting you define `On{PropertyName}Changed` methods which accept the old and new values of the property.
 - PropertyChanged.Fody uses a variety of methods to locate a suitable method to compare a property's old and new value; PropertyChanged.SourceGenerator just uses `EqualityComparer<T>.Default`.
 - I don't [expect you to pay](https://github.com/Fody/Home/blob/master/pages/licensing-patron-faq.md) to use PropertyChanged.SourceGenerator, and will never close an issue or refuse a contribution because you're not giving me money.
 


:::

### About
:::note

Generating PropertyChange to properties


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **PropertyChangedSourceGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="PropertyChanged.SourceGenerator" Version="1.0.8">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropChange\src\PropChangeDemo\Program.cs" label="Program.cs" >

  This is the use of **PropertyChangedSourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using PropChangeDemo;

Person person = new ();
person.FirstName = "Andrei";
Console.WriteLine (person.FirstName);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropChange\src\PropChangeDemo\Person.cs" label="Person.cs" >

  This is the use of **PropertyChangedSourceGenerator** in *Person.cs*

```csharp showLineNumbers 
using PropertyChanged.SourceGenerator;
namespace PropChangeDemo;

partial class Person
{
    [Notify]    
    private string? _FirstName;
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropChange\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\Attributes.cs" label="Attributes.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Auto-generated by PropertyChanged.SourceGenerator 1.0.8.0
// </auto-generated>
namespace PropertyChanged.SourceGenerator
{
    /// <summary>
    /// Specifies the accessibility of a generated property getter
    /// </summary>
    internal enum Getter
    {
        Public = 6,
        ProtectedInternal = 5,
        Internal = 4,
        Protected = 3,
        PrivateProtected = 2,
        Private = 1,
    }

    /// <summary>
    /// Specifies the accessibility of a generated property getter
    /// </summary>
    internal enum Setter
    {
        Public = 6,
        ProtectedInternal = 5,
        Internal = 4,
        Protected = 3,
        PrivateProtected = 2,
        Private = 1,
    }

    /// <summary>
    /// Instruct PropertyChanged.SourceGenerator to generate a property which implements INPC using this backing field
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property, AllowMultiple = false)]
    [global::System.Diagnostics.Conditional("DEBUG")]
    internal class NotifyAttribute : global::System.Attribute
    {
        /// <summary>
        /// Generate a property whose name is derived from the name of this field, with a public getter and setter
        /// </summary>
        public NotifyAttribute() { }

        /// <summary>
        /// Generate a property with the given name, and optionally the given getter and setter accessibilities
        /// </summary>
        /// <param name="name">Name of the generated property</param>
        /// <param name="get">Accessibility of the generated getter</param>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(string name, Getter get = Getter.Public, Setter set = Setter.Public) { }

        /// <summary>
        /// Generate a property whose name is derived from the name of this field, with the given getter and optionally setter accessibilities
        /// </summary>
        /// <param name="get">Accessibility of the generated getter</param>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(Getter get, Setter set = Setter.Public) { }

        /// <summary>
        /// Generate a property whose name is derived from the name of this field, with a public getter and the given setter accessibility
        /// </summary>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(Setter set) { }

        /// <summary>
        /// If <c>true</c>, the generated property will be <c>virtual</c>.
        /// </summary>
        public bool IsVirtual { get; set; }
    }

    /// <summary>
    /// Instruct PropertyChanged.SourceGenerator to also raise INPC notifications for the named properties whenever the property this is applied to changes
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property, AllowMultiple = true)]
    [global::System.Diagnostics.Conditional("DEBUG")]
    internal class AlsoNotifyAttribute : global::System.Attribute
    {
        /// <summary>
        /// Raise INPC notifications for the given properties when the property generated for this backing field changes
        /// </summary>
        /// <param name="otherProperties">Other properties to raise INPC notifications for</param>
        public AlsoNotifyAttribute(params string[] otherProperties) { }
    }

    /// <summary>
    /// Instruct PropertyChanged.SourceGenerator to raise INPC notifications for this property whenever one of the named generated properties is changed
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property, AllowMultiple = false)]
    [global::System.Diagnostics.Conditional("DEBUG")]
    internal class DependsOnAttribute : global::System.Attribute
    {
        /// <summary>
        /// Raise an INPC notification for this property whenever one of the named properties is changed
        /// </summary>
        /// <param name="dependsOn">Other properties this property depends on</param>
        public DependsOnAttribute(params string[] dependsOn) { }
    }

    /// <summary>
    /// Instruct PropertyChanged.SourceGenerator to assign true to this boolean property whenver any generated member changes
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property, AllowMultiple = true)]
    [global::System.Diagnostics.Conditional("DEBUG")]
    internal class IsChangedAttribute : global::System.Attribute
    {
    }

    /// <summary>
    /// Specifies an attribute which will be added to the generated property for this backing field
    /// </summary>
    /// <remarks>
    /// The string passed to this attribute will be placed verbatim into the generated code. All types must therefore by fully-qualified.
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property, AllowMultiple = true)]
    [global::System.Diagnostics.Conditional("DEBUG")]
    internal class PropertyAttributeAttribute : global::System.Attribute
    {
        /// <summary>
        /// Specify an attribute which iwll be added to the generated property for this backing field
        /// </summary>
        /// <param name="attribute">An attribute to place on the generated property</param>
        public PropertyAttributeAttribute(string attribute) { }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropChange\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\EventArgsCache.g.cs" label="EventArgsCache.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Auto-generated by PropertyChanged.SourceGenerator 1.0.8.0
// </auto-generated>
namespace PropertyChanged.SourceGenerator.Internal
{
    internal static class EventArgsCache
    {
        private static global::System.ComponentModel.PropertyChangedEventArgs _PropertyChanged_FirstName;
        public static global::System.ComponentModel.PropertyChangedEventArgs PropertyChanged_FirstName => _PropertyChanged_FirstName ??= new global::System.ComponentModel.PropertyChangedEventArgs(@"FirstName");
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropChange\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Auto-generated by PropertyChanged.SourceGenerator 1.0.8.0
// </auto-generated>
#nullable enable
namespace PropChangeDemo
{
    partial class Person : global::System.ComponentModel.INotifyPropertyChanged
    {
        /// <inheritdoc />
        public event global::System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
        public string? FirstName
        {
            get => this._FirstName;
            set
            {
                if (!global::System.Collections.Generic.EqualityComparer<string?>.Default.Equals(value, this._FirstName))
                {
                    this._FirstName = value;
                    this.OnPropertyChanged(global::PropertyChanged.SourceGenerator.Internal.EventArgsCache.PropertyChanged_FirstName);
                }
            }
        }
        /// <summary>
        /// Raises the PropertyChanged event
        /// </summary>
        /// <param name="eventArgs">The EventArgs to use to raise the event</param>
        protected virtual void OnPropertyChanged(global::System.ComponentModel.PropertyChangedEventArgs eventArgs)
        {
            this.PropertyChanged?.Invoke(this, eventArgs);
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project PropertyChangedSourceGenerator ](/sources/PropertyChangedSourceGenerator.zip)

:::


### Share PropertyChangedSourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator&quote=PropertyChangedSourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator&text=PropertyChangedSourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator&title=PropertyChangedSourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator&title=PropertyChangedSourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyChangedSourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/PropertyChangedSourceGenerator

### In the same category (MVVM) - 1 other generators


#### [CommunityToolkit.Mvvm](/docs/CommunityToolkit.Mvvm)

