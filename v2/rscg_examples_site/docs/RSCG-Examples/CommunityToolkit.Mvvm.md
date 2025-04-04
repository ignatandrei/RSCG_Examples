---
sidebar_position: 90
title: 09 - CommunityToolkit.Mvvm
description: Shows how to implement INotifyPropertyChanged,ObservableProperty and RelayCommand
slug: /CommunityToolkit.Mvvm
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# CommunityToolkit.Mvvm  by Microsoft


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/CommunityToolkit.Mvvm?label=CommunityToolkit.Mvvm)](https://www.nuget.org/packages/CommunityToolkit.Mvvm)
[![GitHub last commit](https://img.shields.io/github/last-commit/CommunityToolkit/dotnet?label=updated)](https://github.com/CommunityToolkit/dotnet)
![GitHub Repo stars](https://img.shields.io/github/stars/CommunityToolkit/dotnet?style=social)

## Details

### Info
:::info

Name: **CommunityToolkit.Mvvm**

This package includes a .NET Standard MVVM library with helpers such as:
      - ObservableObject: a base class for objects implementing the INotifyPropertyChanged interface.
      - ObservableRecipient: a base class for observable objects with support for the IMessenger service.
      - ObservableValidator: a base class for objects implementing the INotifyDataErrorInfo interface.
      - RelayCommand: a simple delegate command implementing the ICommand interface.
      - AsyncRelayCommand: a delegate command supporting asynchronous operations and cancellation.
      - WeakReferenceMessenger: a messaging system to exchange messages through different loosely-coupled objects.
      - StrongReferenceMessenger: a high-performance messaging system that trades weak references for speed.
      - Ioc: a helper class to configure dependency injection service containers.

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/CommunityToolkit.Mvvm*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/generators/overview

Source : https://github.com/CommunityToolkit/dotnet

:::

### Original Readme
:::note

# 🧰 .NET Community Toolkit

.NET Community Toolkit is a collection of helpers and APIs that work for all .NET developers and are agnostic of any specific UI platform. The toolkit is maintained and published by Microsoft, and part of the .NET Foundation.

## 👀 What does this repo contain?

This repository contains several .NET libraries (originally developed as part of the [Windows Community Toolkit](https://github.com/CommunityToolkit/WindowsCommunityToolkit)) that can be used both by application developers (regardless on the specific UI framework in use, they work everywhere!) and library authors. These libraries are also being used internally at Microsoft to power many of our first party apps (such as the new Microsoft Store) and constantly improved by listening to feedbacks from other teams, external partners and other developers from the community. Here's a quick breakdown of the various components you'll find in this repository:

Package | Latest stable | Latest Preview | Description
---------|---------------|---------------|------------
[`CommunityToolkit.Common`](https://learn.microsoft.com/dotnet/api/communitytoolkit.common) | [![CommunityToolkit.Common](https://img.shields.io/nuget/v/CommunityToolkit.Common)](https://nuget.org/packages/CommunityToolkit.Common/) | [![CommunityToolkit.Common](https://img.shields.io/nuget/vpre/CommunityToolkit.Common)](https://nuget.org/packages/CommunityToolkit.Common/absoluteLatest) | A set of helper APIs shared with other [`CommunityToolkit`](https://learn.microsoft.com/dotnet/communitytoolkit/) libraries.
[`CommunityToolkit.Diagnostics`](https://learn.microsoft.com/dotnet/communitytoolkit/diagnostics/introduction) | [![CommunityToolkit.Diagnostics](https://img.shields.io/nuget/v/CommunityToolkit.Diagnostics)](https://nuget.org/packages/CommunityToolkit.Diagnostics/) | [![CommunityToolkit.Diagnostics](https://img.shields.io/nuget/vpre/CommunityToolkit.Diagnostics)](https://nuget.org/packages/CommunityToolkit.Diagnostics/absoluteLatest) | A set of helper APIs (specifically, [`Guard`](https://learn.microsoft.com/dotnet/communitytoolkit/diagnostics/guard) and [`ThrowHelper`](https://learn.microsoft.com/dotnet/communitytoolkit/diagnostics/throwhelper)) that can be used for cleaner, more efficient and less error-prone argument validation and error checking.
[`CommunityToolkit.HighPerformance`](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/introduction) | [![CommunityToolkit.HighPerformance](https://img.shields.io/nuget/v/CommunityToolkit.HighPerformance)](https://nuget.org/packages/CommunityToolkit.HighPerformance/) | [![CommunityToolkit.HighPerformance](https://img.shields.io/nuget/vpre/CommunityToolkit.HighPerformance)](https://nuget.org/packages/CommunityToolkit.HighPerformance/absoluteLatest) | A collection of helpers for working in high-performance scenarios. It includes APIs such as [pooled buffer helpers](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/memoryowner), a fast [string pool](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/stringpool) type, a 2D variant of `Memory<T>` and `Span<T>` ([`Memory2D<T>`](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/memory2d) and [`Span2D<T>`](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/span2d)) also supporting discontiguous regions, helpers for bit shift operations (such as [`BitHelper`](https://learn.microsoft.com/dotnet/communitytoolkit/high-performance/span2d), also used in [Paint.NET](https://getpaint.net)), and more.
[`CommunityToolkit.Mvvm` (aka MVVM Toolkit)](https://aka.ms/mvvmtoolkit/docs) | [![CommunityToolkit.Mvvm](https://img.shields.io/nuget/v/CommunityToolkit.Mvvm)](https://nuget.org/packages/CommunityToolkit.Mvvm/) | [![CommunityToolkit.Mvvm](https://img.shields.io/nuget/vpre/CommunityToolkit.Mvvm)](https://nuget.org/packages/CommunityToolkit.Mvvm/absoluteLatest) | A fast, modular, platform-agnostic MVVM library, which is the official successor of `MvvmLight`. It's used extensively in the Microsoft Store and other first party apps. [The sample app repository is here](https://aka.ms/mvvmtoolkit/samples).

## 🙌 Getting Started

Please read the [Getting Started with the .NET Community Toolkit](https://learn.microsoft.com/windows/communitytoolkit/getting-started) page for more detailed information.

## 📃 Documentation

All documentation for the toolkit is hosted on [Microsoft Docs](https://learn.microsoft.com/dotnet/communitytoolkit/).

All API documentation can be found at the [.NET API Browser](https://learn.microsoft.com/dotnet/api/?view=win-comm-toolkit-dotnet-stable).

## 🚀 Contribution

Do you want to contribute?

Check out our [.NET Community Toolkit Wiki](https://aka.ms/wct/wiki) page to learn more about contribution and guidelines!

## 📦 NuGet Packages

NuGet is a standard package manager for .NET applications which is built into Visual Studio. When you open solution in Visual Studio, choose the *Tools* menu > *NuGet Package Manager* > *Manage NuGet packages for solution…* Enter one of the package names mentioned in [.NET Community Toolkit NuGet Packages](https://learn.microsoft.com/windows/communitytoolkit/nuget-packages) table to search for it online.

## 🌍 Roadmap

Read what we [plan for next iterations](https://github.com/CommunityToolkit/dotnet/milestones), and feel free to ask questions.

Check out our [Preview Packages Wiki Page](https://github.com/CommunityToolkit/dotnet/wiki/Preview-Packages) to learn more about updating your NuGet sources in Visual Studio, then you can also get pre-release packages of upcoming versions to try.

## 📄 Code of Conduct

This project has adopted the code of conduct defined by the [Contributor Covenant](http://contributor-covenant.org/) to clarify expected behavior in our community.
For more information see the .NET Foundation Code of Conduct.

## 🏢 .NET Foundation

This project is supported by the [.NET Foundation](http://dotnetfoundation.org).

## 🏆 Contributors

[![Toolkit Contributors](https://contrib.rocks/image?repo=CommunityToolkit/dotnet)](https://github.com/CommunityToolkit/dotnet/graphs/contributors)

Made with [contrib.rocks](https://contrib.rocks).


:::

### About
:::note

Shows how to implement INotifyPropertyChanged,ObservableProperty and RelayCommand


Unfortunately , not yet a separate package just for those.


Also, this show that RSCG could generate multiple partial declarations


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **CommunityToolkit.Mvvm**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="CommunityToolkit.Mvvm" Version="8.2.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\Program.cs" label="Program.cs" >

  This is the use of **CommunityToolkit.Mvvm** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using test;

Console.WriteLine("Hello, World!");

MyViewModel myViewModel = new();
myViewModel.Name = "Andrei";
var x=myViewModel.SayHelloCommand;
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\MyViewModel.cs" label="MyViewModel.cs" >

  This is the use of **CommunityToolkit.Mvvm** in *MyViewModel.cs*

```csharp showLineNumbers 
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace test;

[INotifyPropertyChanged]
public partial class MyViewModel 
{
    [ObservableProperty]
    private string? name;

    [RelayCommand]
    private void SayHello()
    {
        Console.WriteLine("Hello");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\obj\GX\CommunityToolkit.Mvvm.SourceGenerators\CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator\test.MyViewModel.g.cs" label="test.MyViewModel.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace test
{
    /// <inheritdoc/>
    partial class MyViewModel : global::System.ComponentModel.INotifyPropertyChanged
    {
        /// <inheritdoc cref = "global::System.ComponentModel.INotifyPropertyChanged.PropertyChanged"/>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public event global::System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
        /// <summary>
        /// Raises the <see cref = "PropertyChanged"/> event.
        /// </summary>
        /// <param name = "e">The input <see cref = "global::System.ComponentModel.PropertyChangedEventArgs"/> instance.</param>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected virtual void OnPropertyChanged(global::System.ComponentModel.PropertyChangedEventArgs e)
        {
            PropertyChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Raises the <see cref = "PropertyChanged"/> event.
        /// </summary>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected void OnPropertyChanged([global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            OnPropertyChanged(new global::System.ComponentModel.PropertyChangedEventArgs(propertyName));
        }

        /// <summary>
        /// Compares the current and new values for a given property. If the value has changed, updates
        /// the property with the new value, then raises the <see cref = "PropertyChanged"/> event.
        /// </summary>
        /// <typeparam name = "T">The type of the property that changed.</typeparam>
        /// <param name = "field">The field storing the property's value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are the same.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<T>([global::System.Diagnostics.CodeAnalysis.NotNullIfNotNull("newValue")] ref T field, T newValue, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            if (global::System.Collections.Generic.EqualityComparer<T>.Default.Equals(field, newValue))
            {
                return false;
            }

            field = newValue;
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given property. If the value has changed, updates
        /// the property with the new value, then raises the <see cref = "PropertyChanged"/> event.
        /// See additional notes about this overload in <see cref = "SetProperty{T}(ref T, T, string)"/>.
        /// </summary>
        /// <typeparam name = "T">The type of the property that changed.</typeparam>
        /// <param name = "field">The field storing the property's value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "comparer">The <see cref = "global::System.Collections.Generic.IEqualityComparer{T}"/> instance to use to compare the input values.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<T>([global::System.Diagnostics.CodeAnalysis.NotNullIfNotNull("newValue")] ref T field, T newValue, global::System.Collections.Generic.IEqualityComparer<T> comparer, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            if (comparer.Equals(field, newValue))
            {
                return false;
            }

            field = newValue;
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given property. If the value has changed, updates
        /// the property with the new value, then raises the <see cref = "PropertyChanged"/> event.
        /// This overload is much less efficient than <see cref = "SetProperty{T}(ref T, T, string)"/> and it
        /// should only be used when the former is not viable (eg. when the target property being
        /// updated does not directly expose a backing field that can be passed by reference).
        /// For performance reasons, it is recommended to use a stateful callback if possible through
        /// the <see cref = "SetProperty{TModel, T}(T, T, TModel, global::System.Action{TModel, T}, string? )"/> whenever possible
        /// instead of this overload, as that will allow the C# compiler to cache the input callback and
        /// reduce the memory allocations. More info on that overload are available in the related XML
        /// docs. This overload is here for completeness and in cases where that is not applicable.
        /// </summary>
        /// <typeparam name = "T">The type of the property that changed.</typeparam>
        /// <param name = "oldValue">The current property value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "callback">A callback to invoke to update the property value.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are the same.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<T>(T oldValue, T newValue, global::System.Action<T> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            if (global::System.Collections.Generic.EqualityComparer<T>.Default.Equals(oldValue, newValue))
            {
                return false;
            }

            callback(newValue);
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given property. If the value has changed, updates
        /// the property with the new value, then raises the <see cref = "PropertyChanged"/> event.
        /// See additional notes about this overload in <see cref = "SetProperty{T}(T, T, global::System.Action{T}, string)"/>.
        /// </summary>
        /// <typeparam name = "T">The type of the property that changed.</typeparam>
        /// <param name = "oldValue">The current property value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "comparer">The <see cref = "global::System.Collections.Generic.IEqualityComparer{T}"/> instance to use to compare the input values.</param>
        /// <param name = "callback">A callback to invoke to update the property value.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<T>(T oldValue, T newValue, global::System.Collections.Generic.IEqualityComparer<T> comparer, global::System.Action<T> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            if (comparer.Equals(oldValue, newValue))
            {
                return false;
            }

            callback(newValue);
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given nested property. If the value has changed,
        /// updates the property and then raises the <see cref = "PropertyChanged"/> event.
        /// The behavior mirrors that of <see cref = "SetProperty{T}(ref T, T, string)"/>,
        /// with the difference being that this method is used to relay properties from a wrapped model in the
        /// current instance. This type is useful when creating wrapping, bindable objects that operate over
        /// models that lack support for notification (eg. for CRUD operations).
        /// Suppose we have this model (eg. for a database row in a table):
        /// <code>
        /// public class Person
        /// {
        ///     public string Name { get; set; }
        /// }
        /// </code>
        /// We can then use a property to wrap instances of this type into our observable model (which supports
        /// notifications), injecting the notification to the properties of that model, like so:
        /// <code>
        /// [INotifyPropertyChanged]
        /// public partial class BindablePerson
        /// {
        ///     public Model { get; }
        ///
        ///     public BindablePerson(Person model)
        ///     {
        ///         Model = model;
        ///     }
        ///
        ///     public string Name
        ///     {
        ///         get => Model.Name;
        ///         set => Set(Model.Name, value, Model, (model, name) => model.Name = name);
        ///     }
        /// }
        /// </code>
        /// This way we can then use the wrapping object in our application, and all those "proxy" properties will
        /// also raise notifications when changed. Note that this method is not meant to be a replacement for
        /// <see cref = "SetProperty{T}(ref T, T, string)"/>, and it should only be used when relaying properties to a model that
        /// doesn't support notifications, and only if you can't implement notifications to that model directly (eg. by having
        /// it implement <see cref = "global::System.ComponentModel.INotifyPropertyChanged"/>). The syntax relies on passing the target model and a stateless callback
        /// to allow the C# compiler to cache the function, which results in much better performance and no memory usage.
        /// </summary>
        /// <typeparam name = "TModel">The type of model whose property (or field) to set.</typeparam>
        /// <typeparam name = "T">The type of property (or field) to set.</typeparam>
        /// <param name = "oldValue">The current property value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "model">The model containing the property being updated.</param>
        /// <param name = "callback">The callback to invoke to set the target property value, if a change has occurred.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are the same.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<TModel, T>(T oldValue, T newValue, TModel model, global::System.Action<TModel, T> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
            where TModel : class
        {
            if (global::System.Collections.Generic.EqualityComparer<T>.Default.Equals(oldValue, newValue))
            {
                return false;
            }

            callback(model, newValue);
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given nested property. If the value has changed,
        /// updates the property and then raises the <see cref = "PropertyChanged"/> event.
        /// The behavior mirrors that of <see cref = "SetProperty{T}(ref T, T, string)"/>,
        /// with the difference being that this method is used to relay properties from a wrapped model in the
        /// current instance. See additional notes about this overload in <see cref = "SetProperty{TModel, T}(T, T, TModel, global::System.Action{TModel, T}, string)"/>.
        /// </summary>
        /// <typeparam name = "TModel">The type of model whose property (or field) to set.</typeparam>
        /// <typeparam name = "T">The type of property (or field) to set.</typeparam>
        /// <param name = "oldValue">The current property value.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "comparer">The <see cref = "global::System.Collections.Generic.IEqualityComparer{T}"/> instance to use to compare the input values.</param>
        /// <param name = "model">The model containing the property being updated.</param>
        /// <param name = "callback">The callback to invoke to set the target property value, if a change has occurred.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetProperty<TModel, T>(T oldValue, T newValue, global::System.Collections.Generic.IEqualityComparer<T> comparer, TModel model, global::System.Action<TModel, T> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
            where TModel : class
        {
            if (comparer.Equals(oldValue, newValue))
            {
                return false;
            }

            callback(model, newValue);
            OnPropertyChanged(propertyName);
            return true;
        }

        /// <summary>
        /// Compares the current and new values for a given field (which should be the backing field for a property).
        /// If the value has changed, updates the field and then raises the <see cref = "PropertyChanged"/> event.
        /// The behavior mirrors that of <see cref = "SetProperty{T}(ref T, T, string)"/>, with the difference being that
        /// this method will also monitor the new value of the property (a generic <see cref = "global::System.Threading.Tasks.Task"/>) and will also
        /// raise the <see cref = "PropertyChanged"/> again for the target property when it completes.
        /// This can be used to update bindings observing that <see cref = "global::System.Threading.Tasks.Task"/> or any of its properties.
        /// This method and its overload specifically rely on the <see cref = "TaskNotifier"/> type, which needs
        /// to be used in the backing field for the target <see cref = "global::System.Threading.Tasks.Task"/> property. The field doesn't need to be
        /// initialized, as this method will take care of doing that automatically. The <see cref = "TaskNotifier"/>
        /// type also includes an implicit operator, so it can be assigned to any <see cref = "global::System.Threading.Tasks.Task"/> instance directly.
        /// Here is a sample property declaration using this method:
        /// <code>
        /// private TaskNotifier myTask;
        ///
        /// public Task MyTask
        /// {
        ///     get => myTask;
        ///     private set => SetAndNotifyOnCompletion(ref myTask, value);
        /// }
        /// </code>
        /// </summary>
        /// <param name = "taskNotifier">The field notifier to modify.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are
        /// the same. The return value being <see langword="true"/> only indicates that the new value being assigned to
        /// <paramref name = "taskNotifier"/> is different than the previous one, and it does not mean the new
        /// <see cref = "global::System.Threading.Tasks.Task"/> instance passed as argument is in any particular state.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetPropertyAndNotifyOnCompletion([global::System.Diagnostics.CodeAnalysis.NotNull] ref TaskNotifier? taskNotifier, global::System.Threading.Tasks.Task? newValue, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            return SetPropertyAndNotifyOnCompletion(taskNotifier ??= new TaskNotifier(), newValue, null, propertyName);
        }

        /// <summary>
        /// Compares the current and new values for a given field (which should be the backing field for a property).
        /// If the value has changed, updates the field and then raises the <see cref = "PropertyChanged"/> event.
        /// This method is just like <see cref = "SetPropertyAndNotifyOnCompletion(ref TaskNotifier, global::System.Threading.Tasks.Task, string)"/>,
        /// with the difference being an extra <see cref = "global::System.Action{T}"/> parameter with a callback being invoked
        /// either immediately, if the new task has already completed or is <see langword="null"/>, or upon completion.
        /// </summary>
        /// <param name = "taskNotifier">The field notifier to modify.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "callback">A callback to invoke to update the property value.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are the same.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetPropertyAndNotifyOnCompletion([global::System.Diagnostics.CodeAnalysis.NotNull] ref TaskNotifier? taskNotifier, global::System.Threading.Tasks.Task? newValue, global::System.Action<global::System.Threading.Tasks.Task?> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            return SetPropertyAndNotifyOnCompletion(taskNotifier ??= new TaskNotifier(), newValue, callback, propertyName);
        }

        /// <summary>
        /// Compares the current and new values for a given field (which should be the backing field for a property).
        /// If the value has changed, updates the field and then raises the <see cref = "PropertyChanged"/> event.
        /// The behavior mirrors that of <see cref = "SetProperty{T}(ref T, T, string)"/>, with the difference being that
        /// this method will also monitor the new value of the property (a generic <see cref = "global::System.Threading.Tasks.Task"/>) and will also
        /// raise the <see cref = "PropertyChanged"/> again for the target property when it completes.
        /// This can be used to update bindings observing that <see cref = "global::System.Threading.Tasks.Task"/> or any of its properties.
        /// This method and its overload specifically rely on the <see cref = "TaskNotifier{T}"/> type, which needs
        /// to be used in the backing field for the target <see cref = "global::System.Threading.Tasks.Task"/> property. The field doesn't need to be
        /// initialized, as this method will take care of doing that automatically. The <see cref = "TaskNotifier{T}"/>
        /// type also includes an implicit operator, so it can be assigned to any <see cref = "global::System.Threading.Tasks.Task"/> instance directly.
        /// Here is a sample property declaration using this method:
        /// <code>
        /// private TaskNotifier&lt;int&gt; myTask;
        ///
        /// public Task&lt;int&gt; MyTask
        /// {
        ///     get => myTask;
        ///     private set => SetAndNotifyOnCompletion(ref myTask, value);
        /// }
        /// </code>
        /// </summary>
        /// <typeparam name = "T">The type of result for the <see cref = "global::System.Threading.Tasks.Task{TResult}"/> to set and monitor.</typeparam>
        /// <param name = "taskNotifier">The field notifier to modify.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are
        /// the same. The return value being <see langword="true"/> only indicates that the new value being assigned to
        /// <paramref name = "taskNotifier"/> is different than the previous one, and it does not mean the new
        /// <see cref = "global::System.Threading.Tasks.Task{TResult}"/> instance passed as argument is in any particular state.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetPropertyAndNotifyOnCompletion<T>([global::System.Diagnostics.CodeAnalysis.NotNull] ref TaskNotifier<T>? taskNotifier, global::System.Threading.Tasks.Task<T>? newValue, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            return SetPropertyAndNotifyOnCompletion(taskNotifier ??= new TaskNotifier<T>(), newValue, null, propertyName);
        }

        /// <summary>
        /// Compares the current and new values for a given field (which should be the backing field for a property).
        /// If the value has changed, updates the field and then raises the <see cref = "PropertyChanged"/> event.
        /// This method is just like <see cref = "SetPropertyAndNotifyOnCompletion{T}(ref TaskNotifier{T}, global::System.Threading.Tasks.Task{T}, string)"/>,
        /// with the difference being an extra <see cref = "global::System.Action{T}"/> parameter with a callback being invoked
        /// either immediately, if the new task has already completed or is <see langword="null"/>, or upon completion.
        /// </summary>
        /// <typeparam name = "T">The type of result for the <see cref = "global::System.Threading.Tasks.Task{TResult}"/> to set and monitor.</typeparam>
        /// <param name = "taskNotifier">The field notifier to modify.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "callback">A callback to invoke to update the property value.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        /// <remarks>
        /// The <see cref = "PropertyChanged"/> event is not raised if the current and new value for the target property are the same.
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected bool SetPropertyAndNotifyOnCompletion<T>([global::System.Diagnostics.CodeAnalysis.NotNull] ref TaskNotifier<T>? taskNotifier, global::System.Threading.Tasks.Task<T>? newValue, global::System.Action<global::System.Threading.Tasks.Task<T>?> callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
        {
            return SetPropertyAndNotifyOnCompletion(taskNotifier ??= new TaskNotifier<T>(), newValue, callback, propertyName);
        }

        /// <summary>
        /// Implements the notification logic for the related methods.
        /// </summary>
        /// <typeparam name = "TTask">The type of <see cref = "global::System.Threading.Tasks.Task"/> to set and monitor.</typeparam>
        /// <param name = "taskNotifier">The field notifier.</param>
        /// <param name = "newValue">The property's value after the change occurred.</param>
        /// <param name = "callback">(optional) A callback to invoke to update the property value.</param>
        /// <param name = "propertyName">(optional) The name of the property that changed.</param>
        /// <returns><see langword="true"/> if the property was changed, <see langword="false"/> otherwise.</returns>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        private bool SetPropertyAndNotifyOnCompletion<TTask>(ITaskNotifier<TTask> taskNotifier, TTask? newValue, global::System.Action<TTask?>? callback, [global::System.Runtime.CompilerServices.CallerMemberName] string? propertyName = null)
            where TTask : global::System.Threading.Tasks.Task
        {
            if (ReferenceEquals(taskNotifier.Task, newValue))
            {
                return false;
            }

            bool isAlreadyCompletedOrNull = newValue?.IsCompleted ?? true;
            taskNotifier.Task = newValue;
            OnPropertyChanged(propertyName);
            if (isAlreadyCompletedOrNull)
            {
                if (callback != null)
                {
                    callback(newValue);
                }

                return true;
            }

            async void MonitorTask()
            {
                await global::CommunityToolkit.Mvvm.ComponentModel.__Internals.__TaskExtensions.GetAwaitableWithoutEndValidation(newValue!);
                if (ReferenceEquals(taskNotifier.Task, newValue))
                {
                    OnPropertyChanged(propertyName);
                }

                if (callback != null)
                {
                    callback(newValue);
                }
            }

            MonitorTask();
            return true;
        }

        /// <summary>
        /// An interface for task notifiers of a specified type.
        /// </summary>
        /// <typeparam name = "TTask">The type of value to store.</typeparam>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        private interface ITaskNotifier<TTask>
            where TTask : global::System.Threading.Tasks.Task
        {
            /// <summary>
            /// Gets or sets the wrapped <typeparamref name = "TTask"/> value.
            /// </summary>
            TTask? Task { get; set; }
        }

        /// <summary>
        /// A wrapping class that can hold a <see cref = "global::System.Threading.Tasks.Task"/> value.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected sealed class TaskNotifier : ITaskNotifier<global::System.Threading.Tasks.Task>
        {
            /// <summary>
            /// Initializes a new instance of the <see cref = "TaskNotifier"/> class.
            /// </summary>
            internal TaskNotifier()
            {
            }

            private global::System.Threading.Tasks.Task? task;
            /// <inheritdoc/>
            global::System.Threading.Tasks.Task? ITaskNotifier<global::System.Threading.Tasks.Task>.Task { get => this.task; set => this.task = value; }

            /// <summary>
            /// Unwraps the <see cref = "global::System.Threading.Tasks.Task"/> value stored in the current instance.
            /// </summary>
            /// <param name = "notifier">The input <see cref = "TaskNotifier{TTask}"/> instance.</param>
            public static implicit operator global::System.Threading.Tasks.Task? (TaskNotifier? notifier)
            {
                return notifier?.task;
            }
        }

        /// <summary>
        /// A wrapping class that can hold a <see cref = "global::System.Threading.Tasks.Task{T}"/> value.
        /// </summary>
        /// <typeparam name = "T">The type of value for the wrapped <see cref = "global::System.Threading.Tasks.Task{T}"/> instance.</typeparam>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.INotifyPropertyChangedGenerator", "8.2.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected sealed class TaskNotifier<T> : ITaskNotifier<global::System.Threading.Tasks.Task<T>>
        {
            /// <summary>
            /// Initializes a new instance of the <see cref = "TaskNotifier{TTask}"/> class.
            /// </summary>
            internal TaskNotifier()
            {
            }

            private global::System.Threading.Tasks.Task<T>? task;
            /// <inheritdoc/>
            global::System.Threading.Tasks.Task<T>? ITaskNotifier<global::System.Threading.Tasks.Task<T>>.Task { get => this.task; set => this.task = value; }

            /// <summary>
            /// Unwraps the <see cref = "global::System.Threading.Tasks.Task{T}"/> value stored in the current instance.
            /// </summary>
            /// <param name = "notifier">The input <see cref = "TaskNotifier{TTask}"/> instance.</param>
            public static implicit operator global::System.Threading.Tasks.Task<T>? (TaskNotifier<T>? notifier)
            {
                return notifier?.task;
            }
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\obj\GX\CommunityToolkit.Mvvm.SourceGenerators\CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator\test.MyViewModel.g.cs" label="test.MyViewModel.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace test
{
    /// <inheritdoc/>
    partial class MyViewModel
    {
        /// <inheritdoc cref="name"/>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public string? Name
        {
            get => name;
            set
            {
                if (!global::System.Collections.Generic.EqualityComparer<string?>.Default.Equals(name, value))
                {
                    OnNameChanging(value);
                    OnNameChanging(default, value);
                    name = value;
                    OnNameChanged(value);
                    OnNameChanged(default, value);
                    OnPropertyChanged(global::CommunityToolkit.Mvvm.ComponentModel.__Internals.__KnownINotifyPropertyChangedArgs.Name);
                }
            }
        }

        /// <summary>Executes the logic for when <see cref="Name"/> is changing.</summary>
        /// <param name="value">The new property value being set.</param>
        /// <remarks>This method is invoked right before the value of <see cref="Name"/> is changed.</remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
        partial void OnNameChanging(string? value);
        /// <summary>Executes the logic for when <see cref="Name"/> is changing.</summary>
        /// <param name="oldValue">The previous property value that is being replaced.</param>
        /// <param name="newValue">The new property value being set.</param>
        /// <remarks>This method is invoked right before the value of <see cref="Name"/> is changed.</remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
        partial void OnNameChanging(string? oldValue, string? newValue);
        /// <summary>Executes the logic for when <see cref="Name"/> just changed.</summary>
        /// <param name="value">The new property value that was set.</param>
        /// <remarks>This method is invoked right after the value of <see cref="Name"/> is changed.</remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
        partial void OnNameChanged(string? value);
        /// <summary>Executes the logic for when <see cref="Name"/> just changed.</summary>
        /// <param name="oldValue">The previous property value that was replaced.</param>
        /// <param name="newValue">The new property value that was set.</param>
        /// <remarks>This method is invoked right after the value of <see cref="Name"/> is changed.</remarks>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
        partial void OnNameChanged(string? oldValue, string? newValue);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\obj\GX\CommunityToolkit.Mvvm.SourceGenerators\CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator\__KnownINotifyPropertyChangedArgs.g.cs" label="__KnownINotifyPropertyChangedArgs.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace CommunityToolkit.Mvvm.ComponentModel.__Internals
{
    /// <summary>
    /// A helper type providing cached, reusable <see cref="global::System.ComponentModel.PropertyChangedEventArgs"/> instances
    /// for all properties generated with <see cref="global::CommunityToolkit.Mvvm.ComponentModel.ObservablePropertyAttribute"/>.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.ObservablePropertyGenerator", "8.2.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
    [global::System.Obsolete("This type is not intended to be used directly by user code")]
    internal static class __KnownINotifyPropertyChangedArgs
    {
        /// <summary>The cached <see cref="global::System.ComponentModel.PropertyChangedEventArgs"/> instance for all "Name" generated properties.</summary>
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("This field is not intended to be referenced directly by user code")]
        public static readonly global::System.ComponentModel.PropertyChangedEventArgs Name = new global::System.ComponentModel.PropertyChangedEventArgs("Name");
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommunityToolkit.Mvvm\src\ToolkitMVVM\obj\GX\CommunityToolkit.Mvvm.SourceGenerators\CommunityToolkit.Mvvm.SourceGenerators.RelayCommandGenerator\test.MyViewModel.SayHello.g.cs" label="test.MyViewModel.SayHello.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace test
{
    /// <inheritdoc/>
    partial class MyViewModel
    {
        /// <summary>The backing field for <see cref="SayHelloCommand"/>.</summary>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.RelayCommandGenerator", "8.2.0.0")]
        private global::CommunityToolkit.Mvvm.Input.RelayCommand? sayHelloCommand;
        /// <summary>Gets an <see cref="global::CommunityToolkit.Mvvm.Input.IRelayCommand"/> instance wrapping <see cref="SayHello"/>.</summary>
        [global::System.CodeDom.Compiler.GeneratedCode("CommunityToolkit.Mvvm.SourceGenerators.RelayCommandGenerator", "8.2.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public global::CommunityToolkit.Mvvm.Input.IRelayCommand SayHelloCommand => sayHelloCommand ??= new global::CommunityToolkit.Mvvm.Input.RelayCommand(new global::System.Action(SayHello));
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project CommunityToolkit.Mvvm ](/sources/CommunityToolkit.Mvvm.zip)

:::


### Share CommunityToolkit.Mvvm 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm&quote=CommunityToolkit.Mvvm" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm&text=CommunityToolkit.Mvvm:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm&title=CommunityToolkit.Mvvm" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm&title=CommunityToolkit.Mvvm&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommunityToolkit.Mvvm" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/CommunityToolkit.Mvvm

### In the same category (MVVM) - 1 other generators


#### [PropertyChangedSourceGenerator](/docs/PropertyChangedSourceGenerator)

