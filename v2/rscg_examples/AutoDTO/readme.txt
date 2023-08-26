# AutoDto

This tool allows to auto create DTO model from BL model in compile time.

It supports different strategies for relations, such as ReplaceToIdProperty, AddIdProperty and ReplaceToDtoProperty

## Setup

To use AutoDto, first install the [NuGet package](https://www.nuget.org/packages/AutoDto):
```shell
dotnet add package AutoDto
```

- Declare partial DTO type like `public partial SomeDto {}`
- Add attribute `[DtoFrom(typeof(SomeBlType))]`
- Build project

Full simple setup:

```csharp
[DtoFrom(typeof(SomeBlType))]
public partial SomeDto {}
```
 
AutoDto tool will generate partial SomeDto class with all public properties from SomeBlType.

## Relation Strategies

Relation strategy means what to do with relation property during generating DTO.

Supported strategies:
- None
- ReplaceToIdProperty
- AddIdProperty
- ReplaceToDtoProperty

### Usage

Set strategy in `[DtoFrom]` attribute after BL type.

```csharp
[DtoFrom(typeof(SomeBlType), RelationStrategy.AddIdProperty)]
public partial SomeDto {}
```

> If not specified - RelationStrategy.None will be used

### None
DTO will have property on BL type

### ReplaceToIdProperty
If BL relation property has `Id` property:
DTO will have only RelationPropName**Id** property of BL relation Id prop type.
If BlType has relation with array or enumerable - generated name will be RelationPropName**Ids**

> :exclamation: If no `Id` found in relation entity - result will be same as with None strategy

### AddIdProperty
DTO will have relation type property and `Id` property is found

### ReplaceToDtoProperty
Try find DTO, generated for RelationType and replace to RelationTypeDto.

> :exclamation: If many DTOs exists for RelationType - use `[MainDto]` attribute to mark which one should be used in `ReplaceToDtoProperty`


## Ignore properties

To avoid some properties from BlType, use `[DtoIgnore]` attribute:

```csharp
[DtoFrom(typeof(SomeBlType), RelationStrategy.AddIdProperty)]
[DtoIgnore(nameof(SomeBlType.PropName1), nameof(SomeBlType.PropName2))]
public partial SomeDto {}
```

## Options

Options can be set only in `.editorconfig`.

> :exclamation: All options are applied once, after first generator running (mostly after open project).

### Generator running

Generator is based on `IIncrementalGenerator`. Generator is running on every class declaration change event (on every change that affects class structure).
To avoid performance issues, it is used debouncer for collecting all events to regenerate classes. By default debounce time is 500 ms. After some time debouncer will collect execution statistic and rebalance timer.

Any user can turn off debouncer, set initial time ets by setting options in `.editorconfig`.

Supported options:
- auto_dto.debounce.enabled - true/false - use debounce or always run generation for every event
- auto_dto.debounce.interval - int - in milliseconds - set initial debounce interval
- auto_dto.debounce.auto_rebalance_enabled - true/false - allow auto timer change or not.

Default values:
- auto_dto.debounce.enabled = true
- auto_dto.debounce.interval = 500
- auto_dto.debounce.auto_rebalance_enabled = true

> :warning: Debouncer can be turned off and switched to every request generating.

### Logging
Logger is disabled by default. If any issues with generator - enable logger, set folder path for logs and set logging level.

Supported options:
- auto_dto.logger.folder_path - string - path to folder where logs will be generated
- auto_dto.logger.enabled - true/false
- auto_dto.logger.log_level - Serilog log levels. See [LogEventLevel](https://github.com/serilog/serilog/blob/main/src/Serilog/Events/LogEventLevel.cs)

Default values:
- auto_dto.logger.folder_path = Try get value from `build_property.projectdir`. If cannot - `Path.Combine(Environment.CurrentDirectory, "Logs")` is using
- auto_dto.logger.enabled = false
- auto_dto.logger.log_level = Warning





