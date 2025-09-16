---
sidebar_position: 2280
title: 228 - mvvmgen
description: Generate MVVM boilerplate code
slug: /mvvmgen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# mvvmgen  by Thomas Claudius Huber


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/mvvmgen?label=mvvmgen)](https://www.nuget.org/packages/mvvmgen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/thomasclaudiushuber/mvvmgen?label=updated)](https://github.com/thomasclaudiushuber/mvvmgen)
![GitHub Repo stars](https://img.shields.io/github/stars/thomasclaudiushuber/mvvmgen?style=social)

## Details

### Info
:::info

Name: **mvvmgen**

MvvmGen is a next generation MVVM library for XAML applications built with C# source generators. MvvmGen helps you to efficently build your WPF, WinUI, and MAUI apps with the Model-View-ViewModel pattern, as it generates all the boilerplate for you.

Author: Thomas Claudius Huber

NuGet: 
*https://www.nuget.org/packages/mvvmgen/*   


You can find more details at https://github.com/thomasclaudiushuber/mvvmgen

Source: https://github.com/thomasclaudiushuber/mvvmgen

:::

### Author
:::note
Thomas Claudius Huber 
![Alt text](https://github.com/thomasclaudiushuber.png)
:::

### Original Readme
:::note

# ⚡ MvvmGen 

[![Build MvvmGen](https://github.com/thomasclaudiushuber/mvvmgen/actions/workflows/build_mvvmgen.yml/badge.svg)](https://github.com/thomasclaudiushuber/mvvmgen/actions/workflows/build_mvvmgen.yml)
[![NuGet MvvmGen](https://img.shields.io/nuget/v/MvvmGen.svg?label=NuGet%20MvvmGen)](https://www.nuget.org/packages/Mvvmgen)
[![NuGet MvvmGen](https://img.shields.io/nuget/v/MvvmGen.PureCodeGeneration.svg?label=NuGet%20MvvmGen.PureCodeGeneration)](https://www.nuget.org/packages/Mvvmgen.PureCodeGeneration)

## Your Friend Who Writes the Boilerplate for You

Hey there, welcome to the **MvvmGen** repository. **MvvmGen** is a lightweight 
and modern MVVM library (.NET Standard 2.0) built with C# Source Generators
that helps you to apply the popular Model-View-ViewModel-pattern (MVVM) 
in your XAML applications that you build with WPF, WinUI, Uno Platform, 
Avalonia, Xamarin Forms, or .NET MAUI.

MvvmGen is licensed under the [MIT license](https://github.com/thomasclaudiushuber/mvvmgen/LICENSE).

## Get Started

- [Documentation](https://github.com/thomasclaudiushuber/mvvmgen/docs/00_start_here.md)
- [Samples](https://github.com/thomasclaudiushuber/mvvmgen-samples)
- [Blog post that introduces MvvmGen](https://www.thomasclaudiushuber.com/2021/05/12/introducing-the-mvvmgen-library)
- [Blog post about pure code generation](https://www.thomasclaudiushuber.com/2021/05/19/mvvmgen-the-special-edition-pure-code-generation)

## Quick intro

In this quick intro, you'll learn that creating a ViewModel is a lot of fun with **MvvmGen**! 🔥 

### Installing the MvvmGen NuGet Package 
Reference the NuGet package [MvvmGen](https://www.nuget.org/packages/MvvmGen/) 
in your .NET application, and then you're ready to go:
```
Install-Package MvvmGen
```  

MvvmGen will register itself as a C# source generator in your project, 
and it will be your friend who writes the boilerplate for you.

### Generating a ViewModel class

To generate a ViewModel class, you create a new class, you mark it as `partial`,
and you put MvvmGen's `ViewModel` attribute on the class:

```csharp
using MvvmGen;

namespace MyWpfApp.ViewModel
{
  [ViewModel]
  public partial class EmployeeViewModel
  {
  }
}
```

The `ViewModel` attribute tells MvvmGen to generate another
 partial `EmployeeViewModel` class. Right now, it will be a class 
that looks like this:

```csharp
using MvvmGen.Commands;
using MvvmGen.Events;
using MvvmGen.ViewModels;

namespace MyWpfApp.ViewModel
{
    partial class EmployeeViewModel : ViewModelBase
    {
        public EmployeeViewModel()
        {
            this.OnInitialize();
        }

        partial void OnInitialize();
    }
}
```

You can see that generated class in Visual Studio under Dependencies->Analyzers:
![Generated class](https://github.com/thomasclaudiushuber/mvvmgen/docs/images/generate_a_viewModel_01.png)

Beside the `ViewModel` attribute, you find many other attributes in the `MvvmGen` namespace 
that you can use to decorate your ViewModel class. These attributes allow you to 
build a full ViewModel like this:

```csharp
using MvvmGen;
using MvvmGen.Events;

namespace MyWpfApp.ViewModel
{
  public record EmployeeSavedEvent(string FirstName, string LastName);

  [Inject(typeof(IEventAggregator))]
  [ViewModel]
  public partial class EmployeeViewModel
  {
    [Property] private string _firstName;
    [Property] private string _lastName;

    [Command(CanExecuteMethod = nameof(CanSave))]
    private void Save()
    {
      EventAggregator.Publish(new EmployeeSavedEvent(FirstName, LastName));
    }

    [CommandInvalidate(nameof(FirstName))]
    private bool CanSave()
    {
      return !string.IsNullOrEmpty(FirstName);
    }
  }
}
```
For this ViewModel, MvvmGen will generate the following partial class definition for you
```csharp
using MvvmGen.Commands;
using MvvmGen.Events;
using MvvmGen.ViewModels;

namespace MyWpfApp.ViewModel
{
  partial class EmployeeViewModel : ViewModelBase
  {
    private IDelegateCommand? _saveCommand;

    public EmployeeViewModel(MvvmGen.Events.IEventAggregator eventAggregator)
    {
      this.EventAggregator = eventAggregator;
      this.OnInitialize();
    }

    partial void OnInitialize();

    public IDelegateCommand SaveCommand => _saveCommand ??= new DelegateCommand(_ => Save(), _ => CanSave());

    public string FirstName
    {
      get => _firstName;
      set
      {
        if (_firstName != value)
        {
          _firstName = value;
          OnPropertyChanged("FirstName");
        }
      }
    }

    public string LastName
    {
      get => _lastName;
      set
      {
        if (_lastName != value)
        {
          _lastName = value;
          OnPropertyChanged("LastName");
        }
      }
    }

    protected MvvmGen.Events.IEventAggregator EventAggregator \{ get; private set; }
    
    protected override void InvalidateCommands(string? propertyName)
    {
      base.InvalidateCommands(propertyName);
      if(propertyName == "FirstName")
      {
          SaveCommand.RaiseCanExecuteChanged();
      }
    }
  }
}
```

To learn all the details, go to the [documentation in this repo](https://github.com/thomasclaudiushuber/mvvmgen/docs/00_start_here.md).


:::

### About
:::note

Generate MVVM boilerplate code


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **mvvmgen**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<ItemGroup>
		<PackageReference Include="MvvmGen.PureCodeGeneration" Version="1.4.0">
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\Program.cs" label="Program.cs" >

  This is the use of **mvvmgen** in *Program.cs*

```csharp showLineNumbers 
using PropChangeDemo;

Person person = new ();
person.FirstName = "Andrei";
Console.WriteLine (person.FirstName);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\Person.cs" label="Person.cs" >

  This is the use of **mvvmgen** in *Person.cs*

```csharp showLineNumbers 
using MvvmGen;
namespace PropChangeDemo;

[ViewModel]
partial class Person
{
    [Property] private string _FirstName;

    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.CommandAttribute.g.cs" label="MvvmGen.Attributes.CommandAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that a DelegateCommand property in the ViewModel should be generated for a method. Set this attribute on methods of a class that has the <see cref="ViewModelAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class CommandAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CommandAttribute"/> class.
        /// </summary>
        public CommandAttribute() \{ }

        /// <summary>
        /// Initializes a new instance of the <see cref="CommandAttribute"/> class.
        /// </summary>
        /// <param name="canExecuteMethod">The name of the method with the can-execute logic</param>
        public CommandAttribute(string canExecuteMethod)
        {
            CanExecuteMethod = canExecuteMethod;
        }

        /// <summary>
        /// Gets or sets the name of the method with the can-execute logic.
        /// </summary>
        public string? CanExecuteMethod \{ get; set; }

        /// <summary>
        /// Gets or sets the name of the command property.
        /// </summary>
        public string? PropertyName \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.CommandInvalidateAttribute.g.cs" label="MvvmGen.Attributes.CommandInvalidateAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using System.Linq;
using MvvmGen.Commands;

namespace MvvmGen
{
    /// <summary>
    /// Specifies a property, in which the <see cref="DelegateCommand.RaiseCanExecuteChanged"/> method of a DelegateCommand is called to refresh controls in the UI that are using the <see cref="DelegateCommand"/>. Set this one or more instances of this attribute on the execute or can-execute method of a command that you have defined with the <see cref="CommandAttribute"/>.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class CommandInvalidateAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CommandInvalidateAttribute"/> class.
        /// </summary>
        /// <param name="propertyName">The name of the property in which the DelegateCommand's <see cref="DelegateCommand.RaiseCanExecuteChanged"/> method is called</param>
        /// <param name="morePropertyNames">More properties in which the DelegateCommand's <see cref="DelegateCommand.RaiseCanExecuteChanged"/> method is called</param>
        public CommandInvalidateAttribute(string propertyName, params string[] morePropertyNames)
        {
            PropertyNames = new[] \{ propertyName }.Concat(morePropertyNames).ToArray();
        }

        /// <summary>
        /// Gets the property names in which the DelegateCommand's <see cref="DelegateCommand.RaiseCanExecuteChanged"/> method is called.
        /// </summary>
        public string[] PropertyNames \{ get; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.InjectAttribute.g.cs" label="MvvmGen.Attributes.InjectAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that a type is injected into a ViewModel. Generates a constructor parameter and initializes a property with the injected type. Set this attribute on a class that has the <see cref="ViewModelAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    public class InjectAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InjectAttribute"/> class.
        /// </summary>
        /// <param name="type">The type that is injected into the ViewModel.</param>
        public InjectAttribute(Type type)
        {
            Type = type;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="InjectAttribute"/> class.
        /// </summary>
        /// <param name="type">The type that is injected into the ViewModel.</param>
        /// <param name="propertyName">The name of the property that stores the injected type.</param>
        public InjectAttribute(Type type, string propertyName)
        {
            Type = type;
            PropertyName = propertyName;
        }

        /// <summary>
        /// Gets the type that is injected into the ViewModel.
        /// </summary>
        public Type Type \{ get; }

        /// <summary>
        /// Gets or sets the name of the property that stores the injected type.
        /// </summary>
        public string? PropertyName \{ get; set; }


        /// <summary>
        /// Gets or sets the access modifier of the property that stores the injected type.
        /// </summary>
        public AccessModifier PropertyAccessModifier \{ get; set; }
    }

    public enum AccessModifier
    {
        Private = 1,
        ProtectedInternal = 2,
        Protected = 3,
        Internal = 4,
        Public = 5
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.PropertyAttribute.g.cs" label="MvvmGen.Attributes.PropertyAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that a property in the ViewModel should be generated for a field. Set this attribute on a field of a class that has the <see cref="ViewModelAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    public class PropertyAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PropertyAttribute"/> class.
        /// </summary>
        public PropertyAttribute() \{ }

        /// <summary>
        /// Initializes a new instance of the <see cref="PropertyAttribute"/> class.
        /// </summary>
        /// <param name="propertyName">The name of the property to generate</param>
        public PropertyAttribute(string propertyName)
        {
            PropertyName = propertyName;
        }

        /// <summary>
        /// Gets or sets the name of property to generate.
        /// </summary>
        public string? PropertyName \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.PropertyCallMethodAttribute.g.cs" label="MvvmGen.Attributes.PropertyCallMethodAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that a method should be called in the setter of a generated property. Set this attribute a field that has the <see cref="PropertyAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = true)]
    public class PropertyCallMethodAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PropertyCallMethodAttribute"/> class.
        /// </summary>
        /// <param name="methodName">The method to call</param>
        public PropertyCallMethodAttribute(string methodName)
        {
            MethodName = methodName;
        }

        /// <summary>
        /// Gets or sets the method to call.
        /// </summary>
        public string MethodName \{ get; }

        /// <summary>
        /// Gets or sets the method arguments that are passed to the method that is called. As the method is called in the setter of a property, you can specify for example "value" to pass the value of the property as an argument to the method.
        /// </summary>
        public string? MethodArgs \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.PropertyInvalidateAttribute.g.cs" label="MvvmGen.Attributes.PropertyInvalidateAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using System.ComponentModel;
using System.Linq;

namespace MvvmGen
{
    /// <summary>
    /// Set this attribute once or multiple times on a readonly property that depends on another property.
    /// Typical case is you define a FullName property in your ViewModel that depends on FirstName and LastName.
    /// You would create it like this:
    /// <code>
    /// [PropertyInvalidate(nameof(LastName))]
    /// [PropertyInvalidate(nameof(FirstName))]
    /// public string FullName => $"{FirstName} {LastName}";
    /// </code>
    /// Then the <see cref="INotifyPropertyChanged.PropertyChanged"/> event is raised for the FullName property in the setters of the properties FirstName and LastName.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class PropertyInvalidateAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PropertyInvalidateAttribute"/> class.
        /// </summary>
        /// <param name="propertyName">The name of the property in which the <see cref="INotifyPropertyChanged.PropertyChanged"/> event is raised.</param>
        /// /// <param name="morePropertyNames">More properties in which the <see cref="INotifyPropertyChanged.PropertyChanged"/> event is raised.</param>
        public PropertyInvalidateAttribute(string propertyName, params string[] morePropertyNames)
        {
            PropertyNames = new[] \{ propertyName }.Concat(morePropertyNames).ToArray();
        }

        /// <summary>
        /// Gets the property names in which the <see cref="INotifyPropertyChanged.PropertyChanged"/> event is raised.
        /// </summary>
        public string[] PropertyNames \{ get; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.PropertyPublishEventAttribute.g.cs" label="MvvmGen.Attributes.PropertyPublishEventAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using MvvmGen.Events;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that an event should be published in the setter of a generated property. Set this attribute a field that has the <see cref="PropertyAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = true)]
    public class PropertyPublishEventAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PropertyPublishEventAttribute"/> class.
        /// </summary>
        /// <param name="eventType">The event type to publish</param>
        public PropertyPublishEventAttribute(Type eventType)
        {
            EventType = eventType;
        }

        /// <summary>
        /// Gets or sets the event type to publish
        /// </summary>
        public Type EventType \{ get; }

        /// <summary>
        /// Gets or sets the constructor arguments that are passed to the constructor of the <see cref="EventType"/> class. As the event is published in the setter of a property, you can specify for example <code>"value"</code> to pass the value of the property as an argument to the constructor of the event, or you can specify <code>"value?.Id, value?.FirstName"</code> to pass two arguments to the event constructor.
        /// </summary>
        public string? EventConstructorArgs \{ get; set; }

        /// <summary>
        /// Gets or sets the name of the member that contains the <see cref="IEventAggregator"/> instance. The default value is "EventAggregator".
        /// </summary>
        public string EventAggregatorMemberName \{ get; set; \} = "EventAggregator";

        /// <summary>
        /// Gets or sets a condition that must be met to publish the event. Pass for example in a string like <code>"value is not null"</code>
        /// </summary>
        public string? PublishCondition \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.ViewModelAttribute.g.cs" label="MvvmGen.Attributes.ViewModelAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that a class is a ViewModel. With this attribute set on a class, a partial class definition is generated.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class ViewModelAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ViewModelAttribute"/> class.
        /// </summary>
        public ViewModelAttribute() \{ }

        /// <summary>
        /// Initializes a new instance of the <see cref="ViewModelAttribute"/> class.
        /// </summary>
        /// <param name="modelType">The type of the model that is wrapped by the ViewModel. All properties of the model type will be generated in the ViewModel.</param>
        public ViewModelAttribute(Type modelType)
        {
            ModelType = modelType;
        }

        /// <summary>
        /// Gets or sets the type of the model that is wrapped by the ViewModel. All properties of the model type will be generated in the ViewModel.
        /// </summary>
        public Type? ModelType \{ get; set; }

        /// <summary>
        /// Gets or sets the name of generated property that contains the wrapped ModelType. If not set, the property has the name Model
        /// </summary>
        public string? ModelPropertyName \{ get; set; }

        /// <summary>
        /// Gets or sets a comma separated list of model properties that should not be generated
        /// in the ViewModel for the model that you specified with the <see cref="ModelType"/> property.
        /// </summary>
        public string? ModelPropertiesToIgnore \{ get; set; }

        /// <summary>
        /// Gets or sets if a constructor is generated. Default value is true.
        /// </summary>
        public bool GenerateConstructor \{ get; set; \} = true;

        /// <summary>
        /// Gets or sets the <see cref="MvvmGen.Commands.IDelegateCommand"/> implementation to use.
        /// That your <see cref="MvvmGen.Commands.IDelegateCommand"/> implementation works seemlessly 
        /// with MvvmGen, it must have a constructor with the following signature:
        /// <code>
        /// public YourCommand(Action<object?> execute, Func<object?, bool>? canExecute = null)
        /// {
        /// \}  
        /// </code>
        /// If this property is not set, the <see cref="MvvmGen.Commands.DelegateCommand"/> class is used
        /// as an <see cref="MvvmGen.Commands.IDelegateCommand"/> implementation.
        /// </summary>
        public Type? CommandType \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.ViewModelGenerateFactoryAttribute.g.cs" label="MvvmGen.Attributes.ViewModelGenerateFactoryAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using MvvmGen.ViewModels;

namespace MvvmGen
{
    /// <summary>
    /// Specifies that an <see cref="IViewModelFactory{T}"/> is generated, where T is your ViewModel class. Set this attribute on a class that has the <see cref="ViewModelAttribute"/> set.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class ViewModelGenerateFactoryAttribute : Attribute
    {
        /// <summary>
        /// Gets or sets the name of the generated factory class.
        /// </summary>
        public string? ClassName \{ get; set; }

        /// <summary>
        /// Gets or sets the name of the generated factory interface.
        /// </summary>
        public string? InterfaceName \{ get; set; }

        /// <summary>
        /// Gets or sets the return type of the Create method. By default, this will be
        /// - either the ViewModel type
        /// - or the generated interface by the ViewModelGenerateInterface attribute
        /// But you can explicitly specify here a custom return type if needed. 
        /// </summary>
        public Type? ReturnType \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Attributes.ViewModelGenerateInterfaceAttribute.g.cs" label="MvvmGen.Attributes.ViewModelGenerateInterfaceAttribute.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;

namespace MvvmGen

{
    /// <summary>
    /// Specifies that an interface is generated for your ViewModel class. 
    /// Set this attribute on a class that has the <see cref="ViewModelAttribute"/> set,
    /// and then the generated ViewModel will automatically implement the generated interface
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class ViewModelGenerateInterfaceAttribute : Attribute
    {
        /// <summary>
        /// Gets or sets the name of the generated interface.
        /// </summary>
        public string? InterfaceName \{ get; set; }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Commands.DelegateCommand.g.cs" label="MvvmGen.Commands.DelegateCommand.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using System.Windows.Input;

namespace MvvmGen.Commands
{
    /// <summary>
    /// An <see cref="ICommand"/> implementation that works with delegates for the execute and can-execute logic
    /// </summary>
    public class DelegateCommand : IDelegateCommand
    {
        private readonly Action<object?> _execute;
        private readonly Func<object?, bool>? _canExecute;

        public DelegateCommand(Action<object?> execute, Func<object?, bool>? canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        /// <inheritdoc/>
        public event EventHandler? CanExecuteChanged;

        /// <summary>
        /// Raises the <see cref="CanExecuteChanged"/> event.
        /// </summary>
        public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);

        /// <inheritdoc/>
        public void Execute(object? parameter) => _execute(parameter);

        /// <inheritdoc/>
        public bool CanExecute(object? parameter) => _canExecute == null || _canExecute(parameter);

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Commands.IDelegateCommand.g.cs" label="MvvmGen.Commands.IDelegateCommand.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System.Windows.Input;

namespace MvvmGen.Commands
{
    public interface IDelegateCommand : ICommand
    {
        void RaiseCanExecuteChanged();
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Events.EventAggregator.g.cs" label="MvvmGen.Events.EventAggregator.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System;
using System.Collections.Generic;
using System.Linq;

namespace MvvmGen.Events
{
    /// <summary>
    /// A class to communicate between loosely coupled objects, like for example ViewModels
    /// </summary>
    public class EventAggregator : IEventAggregator
    {
        internal Dictionary<Type, List<WeakReference>> _subscribersByEvent = new();

        /// <inheritdoc/>
        public void Publish<TEvent>(TEvent eventToPublish)
        {
            if (eventToPublish is null)
            {
                throw new ArgumentNullException(nameof(eventToPublish));
            }
            lock (_subscribersByEvent)
            {
                if (!_subscribersByEvent.ContainsKey(typeof(TEvent)))
                {
                    return;
                }

                var subscribersToRemove = new List<WeakReference>();

                foreach (var subscriber in _subscribersByEvent[typeof(TEvent)])
                {
                    if (subscriber.IsAlive)
                    {
                        var target = subscriber.Target;
                        if (target is not null)
                        {
                            target.GetType()
                              .GetMethod(nameof(IEventSubscriber<object>.OnEvent), new[] \{ typeof(TEvent) })
                              ?.Invoke(target, new object[] \{ eventToPublish });
                        }
                    }
                    else
                    {
                        subscribersToRemove.Add(subscriber);
                    }
                }

                foreach (var subscriber in subscribersToRemove)
                {
                    _subscribersByEvent[typeof(TEvent)].Remove(subscriber);
                }
            }
        }

        /// <inheritdoc/>
        public void RegisterSubscriber<TSubscriber>(TSubscriber subscriber)
        {
            if (subscriber is null)
            {
                throw new ArgumentNullException(nameof(subscriber));
            }

            var subscriberInterfaces = typeof(TSubscriber).GetInterfaces()
                .Where(t => t.IsGenericType && t.FullName?.StartsWith("MvvmGen.Events.IEventSubscriber") == true).ToList();
            if (!subscriberInterfaces.Any())
            {
                return;
            }

            var weakReference = new WeakReference(subscriber);

            var eventTypes = subscriberInterfaces.SelectMany(x => x.GenericTypeArguments).Distinct();
            lock (_subscribersByEvent)
            {
                foreach (var eventType in eventTypes)
                {
                    if (!_subscribersByEvent.ContainsKey(eventType))
                    {
                        _subscribersByEvent.Add(eventType, new());
                    }

                    if (!_subscribersByEvent[eventType].Any(x => x.IsAlive && x.Target?.Equals(subscriber) == true))
                    {
                        _subscribersByEvent[eventType].Add(weakReference);
                    }
                }
            }
        }

        /// <summary>
        /// Unregisters an MvvmGen.Events.IEventSubscriber, so that it won't receive events anymore from the IEventAggregator instance.
        /// Note that calling this method is optional for an instance of this <see cref="EventAggregator"/> class, because the
        /// <see cref="EventAggregator"/> stores a subscriber internally in a <see cref="WeakReference"/>, which means
        /// the subscriber can get garbage collected, even if you don't call this UnregisterSubscriber method.
        /// Calling this method though will immediately unregister a subscriber, even before it got garbage collected.
        /// </summary>
        /// <typeparam name="TSubscriber">The subscriber type</typeparam>
        /// <param name="subscriber">The subscriber instance to unregister</param>
        public void UnregisterSubscriber<TSubscriber>(TSubscriber subscriber)
        {
            if (subscriber is null)
            {
                throw new ArgumentNullException(nameof(subscriber));
            }
            lock (_subscribersByEvent)
            {
                foreach (var subscribersByEvent in _subscribersByEvent)
                {
                    var subscribersToRemove = new List<WeakReference>();
                    foreach (var weakReference in subscribersByEvent.Value)
                    {
                        if (!weakReference.IsAlive
                         || weakReference.Target?.Equals(subscriber) == true)
                        {
                            subscribersToRemove.Add(weakReference);
                        }
                    }

                    foreach (var subscriberToRemove in subscribersToRemove)
                    {
                        subscribersByEvent.Value.Remove(subscriberToRemove);
                    }
                }
            }
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Events.IEventAggregator.g.cs" label="MvvmGen.Events.IEventAggregator.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

namespace MvvmGen.Events
{
    /// <summary>
    /// Provides methods to communicate between loosely coupled objects.
    /// </summary>
    public interface IEventAggregator
    {
        /// <summary>
        /// Publishes an event.
        /// </summary>
        /// <typeparam name="TEvent">The event type to publish</typeparam>
        /// <param name="eventToPublish">The event instance to publish</param>
        void Publish<TEvent>(TEvent eventToPublish);

        /// <summary>
        /// Registers an MvvmGen.Events.IEventSubscriber, so that it will receive events from the <see cref="IEventAggregator"/> instance.
        /// </summary>
        /// <typeparam name="TSubscriber">The subscriber type</typeparam>
        /// <param name="subscriber">The subscriber instance to register</param>
        void RegisterSubscriber<TSubscriber>(TSubscriber subscriber);

        /// <summary>
        /// Unregisters an <see cref="IEventSubscriber{TEvent}"/>, so that it won't receive events anymore from the <see cref="IEventAggregator"/> instance.
        /// </summary>
        /// <typeparam name="TSubscriber">The subscriber type</typeparam>
        /// <param name="subscriber">The subscriber instance to unregister</param>
        void UnregisterSubscriber<TSubscriber>(TSubscriber subscriber);
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.Events.IEventSubscriber.g.cs" label="MvvmGen.Events.IEventSubscriber.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

namespace MvvmGen.Events
{
    /// <summary>
    /// Subscribes to an event of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent">The event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2> : IEventSubscriber<TEvent1>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent2 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3> : IEventSubscriber<TEvent1, TEvent2>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent3 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4> : IEventSubscriber<TEvent1, TEvent2, TEvent3>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent4 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent5 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    /// <typeparam name="TEvent6">The sixth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent6 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    /// <typeparam name="TEvent6">The sixth event to subscribe</typeparam>
    /// <typeparam name="TEvent7">The seventh event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent7 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    /// <typeparam name="TEvent6">The sixth event to subscribe</typeparam>
    /// <typeparam name="TEvent7">The seventh event to subscribe</typeparam>
    /// <typeparam name="TEvent8">The eighth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7, TEvent8> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent8 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    /// <typeparam name="TEvent6">The sixth event to subscribe</typeparam>
    /// <typeparam name="TEvent7">The seventh event to subscribe</typeparam>
    /// <typeparam name="TEvent8">The eighth event to subscribe</typeparam>
    /// <typeparam name="TEvent9">The ninth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7, TEvent8, TEvent9> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7, TEvent8>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent9 eventData);
    }

    /// <summary>
    /// Subscribes to events of an <see cref="IEventAggregator"/>.
    /// </summary>
    /// <typeparam name="TEvent1">The first event to subscribe</typeparam>
    /// <typeparam name="TEvent2">The second event to subscribe</typeparam>
    /// <typeparam name="TEvent3">The third event to subscribe</typeparam>
    /// <typeparam name="TEvent4">The fourth event to subscribe</typeparam>
    /// <typeparam name="TEvent5">The fifth event to subscribe</typeparam>
    /// <typeparam name="TEvent6">The sixth event to subscribe</typeparam>
    /// <typeparam name="TEvent7">The seventh event to subscribe</typeparam>
    /// <typeparam name="TEvent8">The eighth event to subscribe</typeparam>
    /// <typeparam name="TEvent9">The ninth event to subscribe</typeparam>
    /// <typeparam name="TEvent10">The tenth event to subscribe</typeparam>
    public interface IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7, TEvent8, TEvent9, TEvent10> : IEventSubscriber<TEvent1, TEvent2, TEvent3, TEvent4, TEvent5, TEvent6, TEvent7, TEvent8, TEvent9>
    {
        /// <summary>
        /// Gets called when the event was published
        /// </summary>
        /// <param name="eventData">The event instance</param>
        void OnEvent(TEvent10 eventData);
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.ViewModels.IViewModelFactory.g.cs" label="MvvmGen.ViewModels.IViewModelFactory.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

namespace MvvmGen.ViewModels
{
    /// <summary>
    /// Represents a factory that can create ViewModel instances with a parameterless <see cref="Create"/> method.
    /// You get a generated implementation of this interface by setting the <see cref="ViewModelGenerateFactoryAttribute"/> on your ViewModel.
    /// </summary>
    public interface IViewModelFactory<out T>
    {
        /// <summary>
        /// Creates and returns a ViewModel instance.
        /// </summary>
        /// <returns>The created ViewModel instance</returns>
        T Create();
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\MvvmGen.ViewModels.ViewModelBase.g.cs" label="MvvmGen.ViewModels.ViewModelBase.g.cs" >
```csharp showLineNumbers 
// ***********************************************************************
// ⚡ MvvmGen => https://github.com/thomasclaudiushuber/mvvmgen
// Copyright © by Thomas Claudius Huber
// Licensed under the MIT license => See LICENSE file in repository root
// ***********************************************************************

#nullable enable

using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace MvvmGen.ViewModels
{
    /// <summary>
    /// A base class for view models
    /// </summary>
    public class ViewModelBase : INotifyPropertyChanged
    {
        /// <inheritdoc cref="INotifyPropertyChanged.PropertyChanged"/>
        public event PropertyChangedEventHandler? PropertyChanged;

        /// <summary>
        /// Raises the <see cref="PropertyChanged"/> event
        /// </summary>
        /// <param name="e">A <see cref="PropertyChangedEventArgs"/> that contains the name of the changed property.</param>
        protected virtual void OnPropertyChanged(PropertyChangedEventArgs e)
        {
            PropertyChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Raises the <see cref="PropertyChanged"/> event
        /// </summary>
        /// <param name="propertyName">(optional) The name of the changed property.</param>
        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        {
            OnPropertyChanged(new PropertyChangedEventArgs(propertyName));
            InvalidateCommands(propertyName);
        }

        /// <summary>
        /// Invalidates the commands for the changed propertyName
        /// </summary>
        /// <param name="propertyName">The name of the changed property.</param>
        protected virtual void InvalidateCommands(string? propertyName) \{ }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\MvvmGen.PureCodeGeneration.SourceGenerators\MvvmGen.ViewModelGenerator\PropChangeDemo.Person.g.cs" label="PropChangeDemo.Person.g.cs" >
```csharp showLineNumbers 
// <auto-generated>
//   This code was generated for you by
//   ⚡ MvvmGen, a tool created by Thomas Claudius Huber (https://www.thomasclaudiushuber.com)
//   Generator version: 1.4.0
// </auto-generated>
#nullable enable
using MvvmGen.Commands;
using MvvmGen.Events;
using MvvmGen.ViewModels;

namespace PropChangeDemo
{
    partial class Person : global::MvvmGen.ViewModels.ViewModelBase
    {
        public Person()
        {
            this.OnInitialize();
        }

        partial void OnInitialize();

        public string FirstName
        {
            get => _FirstName;
            set
            {
                if (_FirstName != value)
                {
                    _FirstName = value;
                    OnPropertyChanged("FirstName");
                }
            }
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\Attributes.cs" label="Attributes.cs" >
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
        public NotifyAttribute() \{ }

        /// <summary>
        /// Generate a property with the given name, and optionally the given getter and setter accessibilities
        /// </summary>
        /// <param name="name">Name of the generated property</param>
        /// <param name="get">Accessibility of the generated getter</param>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(string name, Getter get = Getter.Public, Setter set = Setter.Public) \{ }

        /// <summary>
        /// Generate a property whose name is derived from the name of this field, with the given getter and optionally setter accessibilities
        /// </summary>
        /// <param name="get">Accessibility of the generated getter</param>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(Getter get, Setter set = Setter.Public) \{ }

        /// <summary>
        /// Generate a property whose name is derived from the name of this field, with a public getter and the given setter accessibility
        /// </summary>
        /// <param name="set">Accessibility of the generated setter</param>
        public NotifyAttribute(Setter set) \{ }

        /// <summary>
        /// If <c>true</c>, the generated property will be <c>virtual</c>.
        /// </summary>
        public bool IsVirtual \{ get; set; }
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
        public AlsoNotifyAttribute(params string[] otherProperties) \{ }
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
        public DependsOnAttribute(params string[] dependsOn) \{ }
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
        public PropertyAttributeAttribute(string attribute) \{ }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\EventArgsCache.g.cs" label="EventArgsCache.g.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\mvvmgen\src\PropChangeDemo\obj\GX\PropertyChanged.SourceGenerator\PropertyChanged.SourceGenerator.PropertyChangedSourceGenerator\Person.g.cs" label="Person.g.cs" >
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
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project mvvmgen ](/sources/mvvmgen.zip)

:::


### Share mvvmgen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen&quote=mvvmgen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen&text=mvvmgen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen&title=mvvmgen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen&title=mvvmgen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fmvvmgen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/mvvmgen

<SameCategory />

