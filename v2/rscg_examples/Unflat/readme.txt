# Unflat

[![Unflat](https://img.shields.io/nuget/v/Unflat?style=flat-square)](https://www.nuget.org/packages/Unflat/)

Unflat is an AOT ORM Сode generator for fast parsing DataReader into complex classes/structs with zero allocations

## How To Use

### Generating Parser

Unflat generates parsers for classes or structs that have the UnflatMarkerAttribute applied to them. Target types can contain any number of nested complex fields or properties, with no depth limit. Circular references are resolved using default values.
 
 ```csharp
[UnflatMarker(Case = MatchCase.IgnoreCase)]
public sealed class TestClass
{
    ...
}
```

### Custom Converters

Unflat supports custom converters by applying the UnflatParserAttribute to a method that should be called during parsing. Unflat searches for converters by matching the property types with the return types of marked methods, and selects the method that is closest in namespace to the target type.
For example, if there are two converters—one in Namespace1 and the other in Namespace1.Namespace2:
 - If the target type is in Namespace1.Namespace2.Namespace3, the second converter will be chosen.
 - If the target is in Namespace1.Namespace4, the first converter will be chosen.
 - If the target is in Namespace5, the one marked with IsDefault = true will be selected.

There are several options to control how converters are called and matched:
 - CallFormat: Specifies how the converter should be invoked. It is used as the format string for string.Format(...), where {0} is replaced with reader.GetValue(<column_index>) and {1} with <column_index>.
 - IsDefault: Indicates that this converter is the default and should be used when no closer match is found by namespace.
 - NamespaceScope: Tells Unflat to treat the converter as if it resides in the specified namespace, regardless of its actual location.

```csharp
[UnflatParser(CallFormat = "Example.ExampleClass.Parse({0}, {1}, reader)", IsDefault = false, NamespaceScope = "Example2")]
public static int Parse(object v, int index, IDataReader reader)
{
    return Convert.ToInt32(v);
}
```

### Per Property/Field converter

For different parsing behavior on specific properties or fields, use the SettableParserAttribute. It takes a single argument—the format string for string.Format(...), where {0} is replaced with reader.GetValue(<column_index>) and {1} with <column_index>.

```csharp
[SettableParser("Convert.ToString({0})")]
public string Description { get; set; }
```

### SplitOn, Column Prefix

Unflat does not currently support split_on like Dapper.

Instead, you can use the UnflatPrefixAttribute to differentiate properties or fields of complex types that share the same names as properties or fields of primitive types.

If all names are unique (or if a field source is explicitly specified to resolve naming conflicts), no additional configuration is needed—nested complex types will be automatically assigned to their corresponding properties, unlike in Dapper.

```csharp
public sealed class Example
{
    [UnflatPrefix("nested_class_")]
    public required NestedClassExample NestedClass { get; set; }

    [UnflatPrefix("nested_class_2_")]
    public required NestedClassExample NestedClass { get; set; }
}
```

### Per Property/Field Field Source

Unflat allows you to specify a field source using the UnflatSourceAttribute. It can be a concrete column name, a column ordinal, or multiple column names.

```csharp
[UnflatSource("column_1")]
public required strign Field1 { get; set; }

[UnflatSource(1)]
public required strign Field2 { get; set; }

[UnflatSource(["column_1", "column_2", "column_3"])]
public required strign Field3 { get; set; }
```

## Planned Features / Limitations
 - Parameterless constructor requirement: Unflat currently only works if the target type has a parameterless constructor. I plan to add support for constructor argument matching (similar to Dapper) and the ability to call methods where parameters correspond to fields in the reader.
 - Method argument support: The ability to pass arguments to parsing methods, including injecting custom code into generated parsing logic.
 - Code templating: Support for templated code generation—such as automatically generating method extensions—to reduce boilerplate. For example, generating helper methods that use Dapper to fetch data and parse it with Unflat.
 - Alternative error handling: Currently, errors result in exceptions. Future support may include returning a Result<TTarget> type (if the user chooses), which could provide detailed error information—such as missing columns for required fields, invalid casts, etc.
 - Generic converters: Support for generic converter types (e.g., Converter<T>), which are not currently supported.
 - Multi-column converters: Converters that require values from multiple columns. (I haven’t yet determined how to design the API for this without conflicting with class or struct field declarations.)
 - "Split On" support: Potential future support for a split_on-like feature, if there is a clear need.
 - Tuple parsing: Currently, Unflat cannot parse tuples. This limitation may be addressed in a future update.
 
## Perfomane

#### Raw test against Dapper

Parsing an in-memory DataTable using a DataTableReader into a model with 18 properties.

````csharp
[UnflatMarker]
public class TestClass
{
    public string String1 { get; set; }
    public string String2 { get; set; }
    public string String3 { get; set; }
    public string Int { get; set; }
    public string Int2 { get; set; }
    public int IntNullable { get; set; }

    public string String1_1 { get; set; }
    public string String2_1 { get; set; }
    public string String3_1 { get; set; }
    public string Int_1 { get; set; }
    public string Int2_1 { get; set; }
    public int IntNullable_1 { get; set; }

    public string String1_2 { get; set; }
    public string String2_2 { get; set; }
    public string String3_2 { get; set; }
    public string Int_2 { get; set; }
    public string Int2_2 { get; set; }
    public int IntNullable_2 { get; set; }
}
````

````
BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.4652)
11th Gen Intel Core i5-1135G7 2.40GHz, 1 CPU, 8 logical and 4 physical cores
.NET SDK 10.0.100-preview.5.25277.114
  [Host]     : .NET 9.0.0 (9.0.24.52809), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI
  DefaultJob : .NET 9.0.0 (9.0.24.52809), X64 RyuJIT AVX-512F+CD+BW+DQ+VL+VBMI
````

| Method | count | Mean         | Error      | StdDev       | Median       | Gen0      | Gen1      | Gen2     | Allocated   |
|------- |------ |-------------:|-----------:|-------------:|-------------:|----------:|----------:|---------:|------------:|
| Unflat | 100   |     22.68 us |   0.259 us |     0.242 us |     22.61 us |    7.2021 |         - |        - |    29.49 KB |
| Dapper | 100   |     27.61 us |   0.549 us |     0.933 us |     27.44 us |    7.9956 |         - |        - |    32.69 KB |
| Unflat | 1000  |    260.84 us |   5.161 us |     5.069 us |    258.15 us |   68.8477 |   18.5547 |        - |   282.63 KB |
| Dapper | 1000  |    297.94 us |   4.265 us |     4.380 us |    296.87 us |   76.1719 |    8.7891 |        - |   313.95 KB |
| Unflat | 10000 |  5,680.10 us | 113.556 us |   308.937 us |  5,555.69 us |  546.8750 |  343.7500 |  93.7500 |  2913.38 KB |
| Dapper | 10000 |  7,420.81 us | 146.523 us |   271.590 us |  7,444.71 us |  609.3750 |  375.0000 | 109.3750 |     3226 KB |
| Unflat | 50000 | 33,989.82 us | 352.901 us |   330.104 us | 33,963.35 us | 2600.0000 | 1600.0000 | 466.6667 |  14306.6 KB |
| Dapper | 50000 | 41,203.97 us | 815.625 us | 1,551.811 us | 41,597.04 us | 2833.3333 | 1666.6667 | 416.6667 | 15869.31 KB |

## What's the purpose?

Unflat allows you to debug the parsing process and see exactly which converters or parsers are used—at compile time. In contrast, debugging the parsing logic in Dapper is difficult and often requires tools like WinDbg. With Dapper, you must manually verify whether a type parser is registered, and since only one parser can be registered per type, you may end up writing general-purpose converters that perform unnecessary checks, hurting performance.

Additionally, Unflat does not allocate any memory beyond what is required to create the target object—which is unavoidable, as object creation is the core purpose of any ORM.

## What About Other Libraries?

I couldn't find any source generators that address the most frustrating aspects of Dapper — specifically, the inability to debug the parsing process and the need to manually register type parsers.

Some similar libraries only support flat types, while others lack support for custom type parsers altogether.
