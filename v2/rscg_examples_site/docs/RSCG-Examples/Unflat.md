---
sidebar_position: 2300
title: 230 - Unflat
description: DataReader to Object Model
slug: /Unflat
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDatabase.mdx';

# Unflat  by pstlnce


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Unflat?label=Unflat)](https://www.nuget.org/packages/Unflat/)
[![GitHub last commit](https://img.shields.io/github/last-commit/pstlnce/unflat?label=updated)](https://github.com/pstlnce/unflat)
![GitHub Repo stars](https://img.shields.io/github/stars/pstlnce/unflat?style=social)

## Details

### Info
:::info

Name: **Unflat**

AOT ORM Сode generator for fast parsing DataReader into complex classes/structs with zero allocations

Author: pstlnce

NuGet: 
*https://www.nuget.org/packages/Unflat/*   


You can find more details at https://github.com/pstlnce/unflat

Source: https://github.com/pstlnce/unflat

:::

### Author
:::note
pstlnce 
![Alt text](https://github.com/pstlnce.png)
:::

### Original Readme
:::note

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
 - CallFormat: Specifies how the converter should be invoked. It is used as the format string for string.Format(...), where {0} is replaced with reader.GetValue(&lt;column_index&gt;) and {1} with &lt;column_index&gt;.
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

For different parsing behavior on specific properties or fields, use the SettableParserAttribute. It takes a single argument—the format string for string.Format(...), where {0} is replaced with reader.GetValue(&lt;column_index&gt;) and {1} with &lt;column_index&gt;.

```csharp
[SettableParser("Convert.ToString({0})")]
public string Description \{ get; set; }
```

### SplitOn, Column Prefix

Unflat does not currently support split_on like Dapper.

Instead, you can use the UnflatPrefixAttribute to differentiate properties or fields of complex types that share the same names as properties or fields of primitive types.

If all names are unique (or if a field source is explicitly specified to resolve naming conflicts), no additional configuration is needed—nested complex types will be automatically assigned to their corresponding properties, unlike in Dapper.

```csharp
public sealed class Example
{
    [UnflatPrefix("nested_class_")]
    public required NestedClassExample NestedClass \{ get; set; }

    [UnflatPrefix("nested_class_2_")]
    public required NestedClassExample NestedClass \{ get; set; }
}
```

### Per Property/Field Field Source

Unflat allows you to specify a field source using the UnflatSourceAttribute. It can be a concrete column name, a column ordinal, or multiple column names.

```csharp
[UnflatSource("column_1")]
public required strign Field1 \{ get; set; }

[UnflatSource(1)]
public required strign Field2 \{ get; set; }

[UnflatSource(["column_1", "column_2", "column_3"])]
public required strign Field3 \{ get; set; }
```

## Planned Features / Limitations
 - Parameterless constructor requirement: Unflat currently only works if the target type has a parameterless constructor. I plan to add support for constructor argument matching (similar to Dapper) and the ability to call methods where parameters correspond to fields in the reader.
 - Method argument support: The ability to pass arguments to parsing methods, including injecting custom code into generated parsing logic.
 - Code templating: Support for templated code generation—such as automatically generating method extensions—to reduce boilerplate. For example, generating helper methods that use Dapper to fetch data and parse it with Unflat.
 - Alternative error handling: Currently, errors result in exceptions. Future support may include returning a Result&lt;TTarget&gt; type (if the user chooses), which could provide detailed error information—such as missing columns for required fields, invalid casts, etc.
 - Generic converters: Support for generic converter types (e.g., Converter&lt;T&gt;), which are not currently supported.
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
    public string String1 \{ get; set; }
    public string String2 \{ get; set; }
    public string String3 \{ get; set; }
    public string Int \{ get; set; }
    public string Int2 \{ get; set; }
    public int IntNullable \{ get; set; }

    public string String1_1 \{ get; set; }
    public string String2_1 \{ get; set; }
    public string String3_1 \{ get; set; }
    public string Int_1 \{ get; set; }
    public string Int2_1 \{ get; set; }
    public int IntNullable_1 \{ get; set; }

    public string String1_2 \{ get; set; }
    public string String2_2 \{ get; set; }
    public string String3_2 \{ get; set; }
    public string Int_2 \{ get; set; }
    public string Int2_2 \{ get; set; }
    public int IntNullable_2 \{ get; set; }
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


:::

### About
:::note

DataReader to Object Model


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Unflat**
```xml showLineNumbers {4}
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <PackageReference Include="Unflat" Version="0.0.1" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
  </ItemGroup>


  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Unflat\src\UnflatDemo\Program.cs" label="Program.cs" >

  This is the use of **Unflat** in *Program.cs*

```csharp showLineNumbers 
using System;
using System.Data;
using Unflat;

namespace UnflatDemo
{

    class Program
    {
        static void Main(string[] args)
        {
            // Create a DataTable and fill with sample data
            var table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Age", typeof(int));

            table.Rows.Add(1, "Andrei", 30);
            table.Rows.Add(2, "Ignat", 55);

            using var reader = table.CreateDataReader();

            var persons = PersonParser.ReadList(reader);
            foreach (var person in persons)
            {
                Console.WriteLine($"Id: {person.Id}, Name: {person.Name}, Age: {person.Age}");
            }
        }
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Unflat\src\UnflatDemo\Person.cs" label="Person.cs" >

  This is the use of **Unflat** in *Person.cs*

```csharp showLineNumbers 
namespace UnflatDemo
{
    [Unflat.UnflatMarker]
    public partial class Person
    {
        public int Id \{ get; set; }
        public string Name \{ get; set; \} = string.Empty;
        public int Age \{ get; set; }
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Unflat\src\UnflatDemo\obj\GX\Unflat\Unflat.SourceGen\Unflat.UnflatMarkerAttribute.g.cs" label="Unflat.UnflatMarkerAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace Unflat
{
    [AttributeUsage(AttributeTargets.Class)]
    internal sealed class UnflatMarkerAttribute : Attribute
    {
        public string? ClassName \{ get; set; }
        public MatchCase Case \{ get; set; \} = MatchCase.All;
    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    internal sealed class SettableParserAttribute : Attribute
    {
        /// <summary>
        /// <list type="bullet">
        /// <item> {0} - reader[i] </item>
        /// <item> {1} - i </item>
        /// <item> i - related column index </item>
        /// <item> reader - reader... </item>
        /// </list>
        /// </summary>
        /// <param name="callFormat"> an argument for string.Format(callFormat, "reader[i]", i) </param>
        public SettableParserAttribute(string callFormat) {}
    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    internal sealed class UnflatPrefixAttribute : Attribute
    {
        public UnflatPrefixAttribute(string prefix) \{ }
    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    internal sealed class UnflatSourceAttribute : Attribute
    {
        public UnflatSourceAttribute(params string[] fields) {}
        public UnflatSourceAttribute(int fieldOrder) {}
    }

    [Flags]
    public enum MatchCase : int
    {
        None                 = 0,
        IgnoreCase           = 1,
        MatchOriginal        = 1 << 1,
        SnakeCase            = 1 << 2,
        CamalCase            = 1 << 3,
        PascalCase           = 1 << 4,
        ApplyOnOverritenName = 1 << 5,
        All = IgnoreCase | MatchOriginal | SnakeCase | CamalCase | PascalCase | ApplyOnOverritenName
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    internal sealed class UnflatParserAttribute : Attribute
    {
        /// <summary>
        /// <list type="bullet">
        /// <item> {0} - reader[i] </item>
        /// <item> {1} - i </item>
        /// <item> i - related column index </item>
        /// <item> reader - reader... </item>
        /// </list>
        /// </summary>
        /// <param name="callFormat"> an argument for string.Format(callFormat, "reader[i]", i) </param>
        public string CallFormat \{ get; set; }

        /// <summary>
        /// If true than this would be a fallback way
        /// for parsing reader's column value to returning type
        /// if not found parsers in closest namespaces
        /// </summary>
        public bool IsDefault \{ get; set; }

        /// <summary>
        /// If set this value will replace the namespace that contains this parser.
        /// Parser searcher will look to closest parser available to the model.
        /// Parser in Test namespace, the target in Test.Test1 => matched.
        /// Parser in Test.Test1.Test2, the target in Test.Test1 => not matched.
        /// Parser in Test.Test1, the target in Test.Test2 => not matched, etc...
        /// </summary>
        public string NamespaceScope \{ get; set; }
    }

    [Serializable]
    internal sealed class NotEnoughFieldsForRequiredException : Exception
    {
        public NotEnoughFieldsForRequiredException(int expected, int actual)
            : base($"Required field/properties count: {expected}, actual reader's fields count: {actual}")
        {
            Expected = expected;
            Actual = actual;
        }
        
        public int Expected \{ get; init; }
        public int Actual \{ get; init; }
    }

    [Serializable]
    public class MissingRequiredFieldOrPropertyException : System.Exception
    {
        public MissingRequiredFieldOrPropertyException(string[] propertiesOrFields)
            : base("There is no matched data for required properties or fields")
        {
            PropertiesOrFields = propertiesOrFields;
        }

        public string[] PropertiesOrFields \{ get; init; }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Unflat\src\UnflatDemo\obj\GX\Unflat\Unflat.SourceGen\UnflatDemo.PersonParser.g.cs" label="UnflatDemo.PersonParser.g.cs" >
```csharp showLineNumbers 
using System;
using System.Data;
using System.Data.Common;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace UnflatDemo
{
    internal sealed partial class PersonParser
    {
        internal static List<UnflatDemo.Person> ReadList<TReader>(TReader reader)
            where TReader : IDataReader
        {
            var result = new List<UnflatDemo.Person>();
        
            if(!reader.Read())
            {
                return result;
            }
        
            ReadSchemaIndexes(reader, out int col_Age, out int col_Name, out int col_Id);
        
            do
            {
                UnflatDemo.Person parsed = new UnflatDemo.Person();
                
                if(col_Age != -1)
                {
                	parsed.Age = reader[col_Age] is int pcol_Age ? pcol_Age : default;
                }
                
                if(col_Name != -1)
                {
                	parsed.Name = reader[col_Name] is string pcol_Name ? pcol_Name : default;
                }
                
                if(col_Id != -1)
                {
                	parsed.Id = reader[col_Id] is int pcol_Id ? pcol_Id : default;
                }
        
                result.Add(parsed);
            \} while(reader.Read());
        
            return result;
        }
    
        internal static IEnumerable<UnflatDemo.Person> ReadUnbuffered<TReader>(TReader reader)
            where TReader : IDataReader
        {
            if(!reader.Read())
            {
                yield break;
            }
        
            ReadSchemaIndexes(reader, out int col_Age, out int col_Name, out int col_Id);
        
            do
            {
                UnflatDemo.Person parsed = new UnflatDemo.Person();
                
                if(col_Age != -1)
                {
                	parsed.Age = reader[col_Age] is int pcol_Age ? pcol_Age : default;
                }
                
                if(col_Name != -1)
                {
                	parsed.Name = reader[col_Name] is string pcol_Name ? pcol_Name : default;
                }
                
                if(col_Id != -1)
                {
                	parsed.Id = reader[col_Id] is int pcol_Id ? pcol_Id : default;
                }
        
                yield return parsed;
            \} while(reader.Read());
        }
    
        internal static async Task<List<UnflatDemo.Person>> ReadListAsync<TReader>(TReader reader, CancellationToken token = default)
            where TReader : DbDataReader
        {
            var result = new List<UnflatDemo.Person>();
        
            if(!(await reader.ReadAsync(token).ConfigureAwait(false)))
            {
                return result;
            }
        
            ReadSchemaIndexes(reader, out int col_Age, out int col_Name, out int col_Id);
        
            Task<bool> reading;
        
            while(true)
            {
                UnflatDemo.Person parsed = new UnflatDemo.Person();
                
                if(col_Age != -1)
                {
                	parsed.Age = reader[col_Age] is int pcol_Age ? pcol_Age : default;
                }
                
                if(col_Name != -1)
                {
                	parsed.Name = reader[col_Name] is string pcol_Name ? pcol_Name : default;
                }
                
                if(col_Id != -1)
                {
                	parsed.Id = reader[col_Id] is int pcol_Id ? pcol_Id : default;
                }
        
                reading = reader.ReadAsync(token);
        
                result.Add(parsed);
        
                if(!(await reading.ConfigureAwait(false)))
                {
                    break;
                }
            }
        
            return result;
        }
    
        internal static async ValueTask<List<UnflatDemo.Person>> ReadListAsyncValue<TReader>(TReader reader, CancellationToken token = default)
            where TReader : DbDataReader
        {
            var result = new List<UnflatDemo.Person>();
        
            if(!(await reader.ReadAsync(token).ConfigureAwait(false)))
            {
                return result;
            }
        
            ReadSchemaIndexes(reader, out int col_Age, out int col_Name, out int col_Id);
        
            Task<bool> reading;
        
            while(true)
            {
                UnflatDemo.Person parsed = new UnflatDemo.Person();
                
                if(col_Age != -1)
                {
                	parsed.Age = reader[col_Age] is int pcol_Age ? pcol_Age : default;
                }
                
                if(col_Name != -1)
                {
                	parsed.Name = reader[col_Name] is string pcol_Name ? pcol_Name : default;
                }
                
                if(col_Id != -1)
                {
                	parsed.Id = reader[col_Id] is int pcol_Id ? pcol_Id : default;
                }
        
                reading = reader.ReadAsync(token);
        
                result.Add(parsed);
        
                if(!(await reading.ConfigureAwait(false)))
                {
                    break;
                }
            }
        
            return result;
        }
    
        internal static async IAsyncEnumerable<UnflatDemo.Person> ReadUnbufferedAsync<TReader>(TReader reader, [EnumeratorCancellationAttribute] CancellationToken token = default)
            where TReader : DbDataReader
        {
            if(!(await reader.ReadAsync(token).ConfigureAwait(false)))
            {
                yield break;
            }
        
            ReadSchemaIndexes(reader, out int col_Age, out int col_Name, out int col_Id);
        
            Task<bool> reading;
        
            while(true)
            {
                UnflatDemo.Person parsed = new UnflatDemo.Person();
                
                if(col_Age != -1)
                {
                	parsed.Age = reader[col_Age] is int pcol_Age ? pcol_Age : default;
                }
                
                if(col_Name != -1)
                {
                	parsed.Name = reader[col_Name] is string pcol_Name ? pcol_Name : default;
                }
                
                if(col_Id != -1)
                {
                	parsed.Id = reader[col_Id] is int pcol_Id ? pcol_Id : default;
                }
        
                reading = reader.ReadAsync(token);
        
                yield return parsed;
        
                if(!(await reading.ConfigureAwait(false)))
                {
                    break;
                }
            }
        }
    
        public static void ReadSchemaIndexes<TReader>(TReader reader, out int col_Age, out int col_Name, out int col_Id)
            where TReader : IDataReader
        {
        	col_Age = -1;
        	col_Name = -1;
        	col_Id = -1;
        
        	var fieldCount = reader.FieldCount;
        
        	for(int i = 0; i < fieldCount; i++)
        	{
        		ReadSchemaIndex(reader.GetName(i), i, ref col_Age, ref col_Name, ref col_Id);
        	}
        }
    
        public static void ReadSchemaIndex(string name, int i, ref int col_Age, ref int col_Name, ref int col_Id)
        {
        	switch(name.Length)
        	{
        		case 2:
        			if(col_Id == -1 && string.Equals("Id", name, StringComparison.OrdinalIgnoreCase))
        			{
        				col_Id = i;
        			}
        
        			break;
        
        		case 3:
        			if(col_Age == -1 && string.Equals("Age", name, StringComparison.OrdinalIgnoreCase))
        			{
        				col_Age = i;
        			}
        
        			break;
        
        		case 4:
        			if(col_Name == -1 && string.Equals("Name", name, StringComparison.OrdinalIgnoreCase))
        			{
        				col_Name = i;
        			}
        
        			break;
        
        		default:
        			break;
        	}
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Unflat ](/sources/Unflat.zip)

:::


### Share Unflat 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat&quote=Unflat" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat&text=Unflat:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat&title=Unflat" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat&title=Unflat&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnflat" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Unflat

<SameCategory />

