---
sidebar_position: 1140
title: 114 - corecraft
description: Decomposing properties and class into Domain Models. Seems however too complicated to use
slug: /corecraft
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# corecraft  by 


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/corecraft?label=corecraft)](https://www.nuget.org/packages/corecraft/)
[![GitHub last commit](https://img.shields.io/github/last-commit/AlexNav73/CoreCraft?label=updated)](https://github.com/AlexNav73/CoreCraft)
![GitHub Repo stars](https://img.shields.io/github/stars/AlexNav73/CoreCraft?style=social)

## Details

### Info
:::info

Name: **corecraft**

A core library to build cross-platform and highly customizable domain models

Author: 

NuGet: 
*https://www.nuget.org/packages/corecraft/*   


You can find more details at https://github.com/AlexNav73/CoreCraft

Source : https://github.com/AlexNav73/CoreCraft

:::

### Original Readme
:::note

<p align="center">
  <img src="images/logo.png" width="15%" />
</p>

[![build](https://github.com/AlexNav73/CoreCraft/workflows/releasing/badge.svg)](https://github.com/AlexNav73/CoreCraft/actions)
[![codecov](https://codecov.io/gh/AlexNav73/CoreCraft/branch/master/graph/badge.svg?token=Q6ZY0WHL9J)](https://codecov.io/gh/AlexNav73/CoreCraft) ![Nuget](https://img.shields.io/nuget/dt/CoreCraft) ![GitHub](https://img.shields.io/github/license/AlexNav73/CoreCraft) ![Lines of code](https://img.shields.io/tokei/lines/github/AlexNav73/CoreCraft)  

## Introduction

`CoreCraft` is a comprehensive toolkit designed to simplify domain modeling and data management in .NET applications. It offers a range of powerful features and functionalities that enable developers to build robust and scalable domain models.

## Main Features

The `CoreCraft` provides a wealth of features, including:

1. **Automatic Domain Model Generation with Roslyn Source Generators**: `CoreCraft` leverages Roslyn Source Generators to automatically generate domain models based on your schema. This automated process eliminates the need for manual coding, saving you time and effort. The generated models are accurate, consistent, and reflect the structure of your schema.

2. **Change Tracking**: `CoreCraft` incorporates change tracking mechanisms that allow you to monitor modifications to your domain model. By tracking changes at a granular level, `CoreCraft` notifies you of specific modifications, enabling you to respond effectively. This feature eliminates the need for manual change detection and parsing of the entire model.

3. **Undo/Redo Support**: `CoreCraft` simplifies the implementation of undo and redo operations in your application. It provides built-in support for managing and reverting changes, giving users the ability to undo actions and redo them as needed.

4. **Data integrity**: `CoreCraft` follows a command-based execution approach, where the domain model is read-only by default, and modifications are made through commands. When a command executes, it operates on a snapshot of the model, ensuring data integrity in case of exceptions during command execution.

5. **Persistence Options**: `CoreCraft` offers seamless support for persisting your generated domain model. With `CoreCraft`, there's no need for additional code to handle persistence. It supports saving and loading the model's state to a **SQLite** database and **JSON** files. The toolkit takes care of the storage and retrieval process, making it convenient and hassle-free. Additionally, `CoreCraft` allows for easy implementation of additional storage options, making it flexible to adapt to your specific requirements.

6. **Plugin Architecture Support**: `CoreCraft` is well-suited for use in a plugin architecture. It provides the necessary abstractions and features to support modular development, allowing different plugins to contribute to the overall application state.

7. **Reactive Extensions (Rx.NET) Integration**: `CoreCraft` incorporates Reactive Extensions ([Rx.NET](https://github.com/dotnet/reactive)) to provide a flexible subscription mechanism. It utilizes the `IObservable` and `IObserver` interfaces, allowing you to leverage the power of Rx.NET for event-driven programming and reactive data processing. This integration enables you to easily subscribe to change events and apply custom logic using the extensive set of operators provided by `Rx.NET`.

`CoreCraft` empowers developers to create robust and scalable domain models with ease. With automatic model generation, change tracking, persistence options, and support for undo/redo operations, `CoreCraft` simplifies application state management and enhances the user experience.

## NuGet Packages

CoreCraft is distributed as NuGet packages.

|Package|Status|
|:------|:-----:|
|CoreCraft|[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/CoreCraft?color=blue)](https://www.nuget.org/packages/CoreCraft)|
|CoreCraft.Generators|[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/CoreCraft.Generators?color=blue)](https://www.nuget.org/packages/CoreCraft.Generators)|
|CoreCraft.Storage.SQLite|[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/CoreCraft.Storage.SQLite?color=blue)](https://www.nuget.org/packages/CoreCraft.Storage.SQLite)|
|CoreCraft.Storage.Json|[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/CoreCraft.Storage.Json?color=blue)](https://www.nuget.org/packages/CoreCraft.Storage.Json)|

## Basic usage

The only thing is needed to start using the `CoreCraft` toolkit is to define the schema for the domain model. Create a `*.model.json` file that describes your entities, properties and their relations. Here's an example:

```json
{
  "shards": [
    {
      "name": "ToDo",
      "entities": [
        {
          "name": "ToDoItem",
          "properties": [
            { "name": "Name", "type": "string", "defaultValue": "string.Empty" }
          ]
        }
      ],
      "collections": [
        { "name": "Items", "entityType": "ToDoItem" }
      ],
      "relations": []
    }
  ]
}
```

And add the additional files entry to the project file:

```xml
<ItemGroup>
  <AdditionalFiles Include="Model.model.json" />
</ItemGroup>
```

The model schema is the only piece needed to define data of your domain model. Everything else will be automatically generated by the `CoreCraft.Generators` package.

Now, an instance of the domain model can be created using an instance of generated `ToDoModelShard` class:

```cs
// Create an instance of the domain model
var model = new DomainModel(new[] { new ToDoModelShard() });
```

> **Note:** instead of using `DomainModel` class directly, you can use build-in classes (`AutoSaveDomainModel`, `UndoRedoDomainModel`) or inherit from it and implement custom logic

Then we need to subscribe to the model changes by providing an event handler method to handle the collection changes.:

```cs
// Subscribe to Items collection change events 
using var subscription = model.For<IToDoChangesFrame>()
    .With(x => x.Items)
    .Subscribe(OnItemChanged);

// Observe changes
void OnItemChanged(Change<ICollectionChangeSet<ToDoItem, ToDoItemProperties>> changes)
{
    foreach (var c in changes.Hunk)
    {
        Console.WriteLine($"Entity [{c.Entity}] has been {c.Action}ed.");
        Console.WriteLine($"   Old data: {c.OldData}");
        Console.WriteLine($"   New data: {c.NewData}");
    }
}
```

When subscription is done, let's execute a command to modify the model:

```cs
// Adds new item to the collection
model.Run<IMutableToDoModelShard>(
    (shard, _) => shard.Items.Add(new() { Name = "test" }));
```

Save the domain model to an SQLite database file.

```cs
var storage = new SqliteStorage(Array.Empty<IMigration>());

model.Save(storage, "my_data.db");
```

Please refer to the [documentation](https://github.com/AlexNav73/CoreCraft/wiki/Getting-Started) for comprehensive information on using the `CoreCraft` toolkit and its features.

## License

[MIT](https://github.com/AlexNav73/CoreCraft/LICENSE).

:::

### About
:::note

Decomposing properties and class into Domain Models. Seems however too complicated to use


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **corecraft**
```xml showLineNumbers {22}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <None Remove="Person.model.json" />
	</ItemGroup>
	<ItemGroup>
	  <AdditionalFiles Include="Person.model.json">
	    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	  </AdditionalFiles>
	</ItemGroup>
	<ItemGroup>
	  <PackageReference Include="CoreCraft" Version="0.6.0" />
	  <PackageReference Include="CoreCraft.Generators" Version="0.6.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\corecraft\src\Json2Code\Json2Code.csproj" label="Json2Code.csproj" >

  This is the use of **corecraft** in *Json2Code.csproj*

```csharp showLineNumbers 
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <None Remove="Person.model.json" />
	</ItemGroup>
	<ItemGroup>
	  <AdditionalFiles Include="Person.model.json">
	    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	  </AdditionalFiles>
	</ItemGroup>
	<ItemGroup>
	  <PackageReference Include="CoreCraft" Version="0.6.0" />
	  <PackageReference Include="CoreCraft.Generators" Version="0.6.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\corecraft\src\Json2Code\Program.cs" label="Program.cs" >

  This is the use of **corecraft** in *Program.cs*

```csharp showLineNumbers 
using CoreCraft;
using CoreCraft.ChangesTracking;
using CoreCraft.Subscription;
using Json2Code.Person;
using Json2Code.Person.Entities;
var model = new DomainModel(new[] { new Json2Code.Person.PersonShardModelShard() });

// Subscribe to Items collection change events 
using var subscription = model.For<IPersonShardChangesFrame>()
    .With(x => x.Persons)
    .Subscribe(OnItemChanged);

// Observe changes
void OnItemChanged(Change<ICollectionChangeSet<Person, PersonProperties>> changes)
{
    foreach (var c in changes.Hunk)
    {
        Console.WriteLine($"Entity [{c.Entity}] has been {c.Action}ed.");
        Console.WriteLine($"   Old data: {c.OldData}");
        Console.WriteLine($"   New data: {c.NewData}");
    }
}


await model.Run<IMutablePersonShardModelShard> (
    (shard, _) =>
    {
        shard.Persons.Add(new() { FirstName = "A", LastName = "B" });
        //shard.Persons.Remove(shard.Persons.First());
    });
await model.Run<IMutablePersonShardModelShard>(
    (shard, _) =>
    {        
        shard.Persons.Modify(shard.Persons.First(), p => p with { FirstName = "C" });
    });

await model.Run<IMutablePersonShardModelShard>(
    (shard, _) =>
    {
        shard.Persons.Remove(shard.Persons.First());
    });



Console.WriteLine("Press any key to exit...");
Console.ReadKey();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\corecraft\src\Json2Code\Person.model.json" label="Person.model.json" >

  This is the use of **corecraft** in *Person.model.json*

```csharp showLineNumbers 
{
  "shards": [
    {
      "name": "PersonShard",
      "entities": [
        {
          "name": "Person",
          "properties": [
            {
              "name": "FirstName",
              "type": "string",
              "defaultValue": "\"Andrei\""
            },
            {
              "name": "LastName",
              "type": "string",
              "defaultValue": "\"Ignat\""
            }
          ]
        }
      ],
      "collections": [
        {
          "name": "Persons",
          "entityType": "Person"
        }
      ],
      "relations": []
    }
  ]
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\corecraft\src\Json2Code\obj\GX\CoreCraft.Generators\CoreCraft.Generators.ApplicationModelGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

namespace Json2Code.Person
{
    using CoreCraft.Core;
    using CoreCraft.ChangesTracking;
    using CoreCraft.Persistence;
    using Json2Code.Person.Entities;

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public interface IPersonShardModelShard : IModelShard
    {
        ICollection<Person, PersonProperties> Persons { get; }

    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public interface IMutablePersonShardModelShard : IModelShard
    {
        IMutableCollection<Person, PersonProperties> Persons { get; }

    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    internal static class PersonShardModelShardInfo
    {
        public static readonly CollectionInfo PersonsInfo = new("PersonShard", "Persons", new PropertyInfo[] { new("FirstName", typeof(string), false), new("LastName", typeof(string), false) });

    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    internal sealed partial class PersonShardModelShard : IPersonShardModelShard
    {
        public const string PersonsId = "Json2Code.Person.PersonShard.Persons";

        public PersonShardModelShard()
        {
            Persons = new Collection<Person, PersonProperties>(
                PersonsId,
                static id => new Person(id),
                static () => new PersonProperties());

        }

        internal PersonShardModelShard(IMutablePersonShardModelShard mutable)
        {
            Persons = ((IMutableState<ICollection<Person, PersonProperties>>)mutable.Persons).AsReadOnly();

        }

        public ICollection<Person, PersonProperties> Persons { get; init; } = null!;

    }

    internal sealed partial class PersonShardModelShard : IReadOnlyState<IMutablePersonShardModelShard>
    {
        public IMutablePersonShardModelShard AsMutable(global::System.Collections.Generic.IEnumerable<IFeature> features)
        {
            var persons = (IMutableCollection<Person, PersonProperties>)Persons;


            foreach (var feature in features)
            {
                persons = feature.Decorate(this, persons);

            }

            return new MutablePersonShardModelShard()
            {
                Persons = persons,

            };
        }
    }

    internal sealed partial class PersonShardModelShard : ICanBeSaved
    {
        public void Save(IRepository repository)
        {
            repository.Save(PersonShardModelShardInfo.PersonsInfo, Persons);

        }
    }

    internal sealed partial class PersonShardModelShard : IFeatureContext
    {
        IChangesFrame IFeatureContext.GetOrAddFrame(IMutableModelChanges modelChanges)
        {
            return modelChanges.Register(static () => new PersonShardChangesFrame());
        }
    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public interface IPersonShardChangesFrame : IChangesFrame
    {
        ICollectionChangeSet<Person, PersonProperties> Persons { get; }

    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    internal sealed class PersonShardChangesFrame : IPersonShardChangesFrame, IChangesFrameEx, ICanBeSaved
    {
        public PersonShardChangesFrame()
        {
            Persons = new CollectionChangeSet<Person, PersonProperties>(PersonShardModelShard.PersonsId);

        }

        public ICollectionChangeSet<Person, PersonProperties> Persons { get; private set; }


        ICollectionChangeSet<TEntity, TProperty>? IChangesFrame.Get<TEntity, TProperty>(ICollection<TEntity, TProperty> collection)
        {
            if (Persons.Id == collection.Id) return Persons as ICollectionChangeSet<TEntity, TProperty>;

            throw new System.InvalidOperationException("Unable to find collection's changes set");
        }

        IRelationChangeSet<TParent, TChild>? IChangesFrame.Get<TParent, TChild>(IRelation<TParent, TChild> relation)
        {

            throw new System.InvalidOperationException($"Unable to find relation's change set");
        }

        IChangesFrame IChangesFrame.Invert()
        {
            return new PersonShardChangesFrame()
            {
                Persons = Persons.Invert(),

            };
        }

        public void Apply(IModel model)
        {
            var modelShard = model.Shard<IMutablePersonShardModelShard>();

            Persons.Apply(modelShard.Persons);
        }

        public bool HasChanges()
        {
            return Persons.HasChanges();
        }

        public IChangesFrame Merge(IChangesFrame frame)
        {
            var typedFrame = (PersonShardChangesFrame)frame;

            return new PersonShardChangesFrame()
            {
                Persons = Persons.Merge(typedFrame.Persons),

            };
        }

        public void Save(IRepository repository)
        {
            repository.Save(PersonShardModelShardInfo.PersonsInfo, Persons);

        }

    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    internal sealed class MutablePersonShardModelShard : IMutablePersonShardModelShard, IMutableState<IPersonShardModelShard>, ICanBeLoaded
    {
        public IMutableCollection<Person, PersonProperties> Persons { get; init; } = null!;


        public IPersonShardModelShard AsReadOnly()
        {
            return new PersonShardModelShard(this);
        }

        public void Load(IRepository repository)
        {
            repository.Load(PersonShardModelShardInfo.PersonsInfo, Persons);

        }
    }

}

namespace Json2Code.Person.Entities
{
    using CoreCraft.Core;

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    public sealed record Person(global::System.Guid Id) : Entity(Id)
    {
        internal Person() : this(global::System.Guid.NewGuid())
        {
        }
    }

    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("C# Source Generator", "1.0.0.0")]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute()]
    public sealed partial record PersonProperties : Properties
    {
        public PersonProperties()
        {
            FirstName = "Andrei";
            LastName = "Ignat";
        }

        public string FirstName { get; init; }
        public string LastName { get; init; }

#if NET5_0_OR_GREATER
        public override PersonProperties ReadFrom(IPropertiesBag bag)
#else
        public override Properties ReadFrom(IPropertiesBag bag)
#endif
        {
            return new PersonProperties()
            {
                FirstName = bag.Read<string>("FirstName"),
                LastName = bag.Read<string>("LastName"),
            };
        }

        public override void WriteTo(IPropertiesBag bag)
        {
            bag.Write("FirstName", FirstName);
            bag.Write("LastName", LastName);
        }

    }


}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project corecraft ](/sources/corecraft.zip)

:::


### Share corecraft 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft&quote=corecraft" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft&text=corecraft:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft&title=corecraft" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft&title=corecraft&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fcorecraft" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/corecraft

### In the same category (FilesToCode) - 10 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_JSON2Class](/docs/RSCG_JSON2Class)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [Weave](/docs/Weave)

