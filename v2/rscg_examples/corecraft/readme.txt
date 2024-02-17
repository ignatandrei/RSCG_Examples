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

[MIT](LICENSE).