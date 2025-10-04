---
sidebar_position: 2350
title: 235 - Csvcsharp
description: Serializer for CSV files
slug: /Csvcsharp
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# Csvcsharp  by Yusuke Nakada


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Csvcsharp?label=Csvcsharp)](https://www.nuget.org/packages/Csvcsharp/)
[![GitHub last commit](https://img.shields.io/github/last-commit/nuskey8/Csv-CSharp?label=updated)](https://github.com/nuskey8/Csv-CSharp)
![GitHub Repo stars](https://img.shields.io/github/stars/nuskey8/Csv-CSharp?style=social)

## Details

### Info
:::info

Name: **Csvcsharp**

Fast CSV Serializer for .NET and Unity.

Author: Yusuke Nakada

NuGet: 
*https://www.nuget.org/packages/Csvcsharp/*   


You can find more details at https://github.com/nuskey8/Csv-CSharp

Source: https://github.com/nuskey8/Csv-CSharp

:::

### Author
:::note
Yusuke Nakada 
![Alt text](https://github.com/nuskey8.png)
:::

### Original Readme
:::note

# Csv-CSharp

[![NuGet](https://img.shields.io/nuget/v/CsvCSharp.svg)](https://www.nuget.org/packages/CsvCSharp)
[![Releases](https://img.shields.io/github/release/nuskey8/Csv-CSharp.svg)](https://github.com/nuskey8/Csv-CSharp/releases)
[![GitHub license](https://img.shields.io/github/license/nuskey8/Csv-CSharp.svg)](https://github.com/nuskey8/Csv-CSharp/LICENSE)

English | [日本語](https://github.com/nuskey8/Csv-CSharp/README_JA.md)

![img](https://github.com/nuskey8/Csv-CSharp/docs/img1.png)

Csv-CSharp is a highly performant CSV (TSV) parser for .NET and Unity. It is designed to parse UTF-8 binaries directly and leverage Source Generators to enable serialization/deserialization between CSV (TSV) and object arrays with zero (or very low) allocation.

## Installation

### NuGet packages

Csv-CSharp requires .NET Standard 2.1 or higher. The package can be obtained from NuGet.

### .NET CLI

```ps1
dotnet add package CsvCSharp
```

### Package Manager

```ps1
Install-Package CsvCSharp
```

### Unity

You can install Csv-CSharp in Unity by using [NugetForUnity](https://github.com/GlitchEnzo/NuGetForUnity). For details, refer to the NugetForUnity README.

## Quick Start

Csv-CSharp serializes/deserializes CSV data to and from arrays of classes/structs.

Define a class/struct and add the `[CsvObject]` attribute and the `partial` keyword.

```cs
[CsvObject]
public partial class Person
{
    [Column(0)]
    public string Name \{ get; set; }

    [Column(1)]
    public int Age \{ get; set; }
}
```

All public fields/properties of a type marked with `[CsvObject]` must have either the `[Column]` or `[IgnoreMember]` attribute. (An analyzer will output a compile error if it does not find either attribute on public members.)

The `[Column]` attribute can specify a column index as an `int` or a header name as a `string`.

To serialize this type to CSV or deserialize it from CSV, use `CsvSerializer`.

```cs
var array = new Person[]
{
    new() \{ Name = "Alice", Age = 18 },
    new() \{ Name = "Bob", Age = 23 },
    new() \{ Name = "Carol", Age = 31 },
}

// Person[] -> CSV (UTF-8)
byte[] csv = CsvSerializer.Serialize(array);

// Person[] -> CSV (UTF-16)
string csvText = CsvSerializer.SerializeToString(array);

// CSV (UTF-8) -> Person[]
array = CsvSerializer.Deserialize<Person>(csv);

// CSV (UTF-16) -> Person[]
array = CsvSerializer.Deserialize<Person>(csvText);
```

Serialize has an overload that returns a UTF-8 encoded `byte[]`, and you can also pass a `Stream` or `IBufferWriter<byte>` for writing. Deserialize accepts UTF-8 byte arrays as `byte[]` and also supports `string`, `Stream`, and `ReadOnlySequence<byte>`.

The default supported types for fields are `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `char`, `string`, `Enum`, `Nullable<T>`, `DateTime`, `TimeSpan`, and `Guid`. To support other types, refer to the Extensions section.

## Serialization

The class/struct passed to `CsvSerializer` should have the `[CsvObject]` attribute and the `partial` keyword.

By default, fields and properties with the `[Column]` attribute are the targets for serialization/deserialization. The `[Column]` attribute is mandatory for public members, but you can target private members by adding the `[Column]` attribute.

```cs
[CsvObject]
public partial class Person
{
    [Column(0)]
    public string Name \{ get; set; }

    [Column(1)]
    int age;

    [IgnoreMember]
    public int Age => age;
}
```

To specify header names instead of indices, use a string key.

```cs
[CsvObject]
public partial class Person
{
    [Column("name")]
    public string Name \{ get; set; }

    [Column("age")]
    public int Age \{ get; set; }
}
```

To use member names as keys, specify `[CsvObject(keyAsPropertyName: true)]`. In this case, the `[Column]` attribute is not required.

```cs
[CsvObject(keyAsPropertyName: true)]
public partial class Person
{
    public string Name \{ get; set; }
    public int Age \{ get; set; }
}
```

## CsvDocument

If you need to directly parse CSV fields, you can use `CsvDocument`.

```cs
var array = new Person[]
{
    new() \{ Name = "Alice", Age = 18 },
    new() \{ Name = "Bob", Age = 23 },
    new() \{ Name = "Carol", Age = 31 },
};

byte[] csv = CsvSerializer.Serialize(array);

// CSV (UTF-8) -> CsvDocument
var document = CsvSerializer.ConvertToDocument(csv);

foreach (var row in document.Rows)
{
    var name = row["Name"].GetValue<string>();
    var age = row["Age"].GetValue<int>();
}
```

## Options

You can change CSV settings by passing `CsvOptions` to Serialize/Deserialize.

```cs
CsvSerializer.Serialize(array, new CsvOptions()
{
    HasHeader = true, // Include header row
    AllowComments = true, // Allow comments starting with '#''
    NewLine = NewLineType.LF, // Newline type
    Separator = SeparatorType.Comma, // Separator character
    QuoteMode = QuoteMode.Minimal, // Conditions for quoting fields (Minimal quotes only strings containing escape characters)
    FormatterProvider = StandardFormatterProvider.Instance, // ICsvFormatterProvider to use
});
```

## CSV Specifications

The default settings of Csv-CSharp generally follow the specifications outlined in [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180.html). However, please note that for performance and practicality reasons, some specifications may be disregarded.

- The default newline character is LF instead of CRLF.
- Records with a mismatch in the number of fields can be read without errors being output; missing fields will be set to their default values.

## Extensions

Interfaces `ICsvFormatter<T>` and `ICsvFormatterProvider` are provided to customize field serialization/deserialization.

Use `ICsvFormatter<T>` for type serialization/deserialization. Here is an example of implementing a formatter for a struct wrapping an `int`.

```cs
public struct Foo
{
    public int Value;

    public Foo(int value)
    {
        this.Value = value;
    }
}

public sealed class FooFormatter : ICsvFormatter<Foo>
{
    public Foo Deserialize(ref CsvReader reader)
    {
        var value = reader.ReadInt32();
        return new Foo(value);
    }

    public void Serialize(ref CsvWriter writer, Foo value)
    {
        writer.WriteInt32(value.Value);
    }
}
```

Next, implement a formatter provider to retrieve the formatter.

```cs
public class CustomFormatterProvider : ICsvFormatterProvider
{
    public static readonly ICsvFormatterProvider Instance = new CustomFormatterProvider();

    CustomFormatterProvider()
    {
    }

    static CustomFormatterProvider()
    {
        FormatterCache<Foo>.Formatter = new FooFormatter();
    }

    public ICsvFormatter<T>? GetFormatter<T>()
    {
        return FormatterCache<T>.Formatter;
    }

    static class FormatterCache<T>
    {
        public static readonly ICsvFormatter<T> Formatter;
    }
}
```

You can set the created formatter provider in CsvOptions. The above `CustomFormatterProvider` only supports the `Foo` struct, so combine it with the standard formatter provider `StandardFormatterProvider`.

```cs
// Create a composite formatter provider combining multiple formatter providers
var provider = CompositeFormatterProvider.Create(
    CustomFormatterProvider.Instance,
    StandardFormatterProvider.Instance
);

CsvSerializer.Serialize(array, new CsvOptions()
{
    FormatterProvider = provider
});
```

## License

This library is released under the MIT license.

:::

### About
:::note

Serializer for CSV files


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Csvcsharp**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

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
	<ItemGroup>
	  <PackageReference Include="CsvCSharp" Version="1.0.0" />
	</ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CsvCsharp\src\Serializer\Program.cs" label="Program.cs" >

  This is the use of **Csvcsharp** in *Program.cs*

```csharp showLineNumbers 
using Csv;
using SerializerDemo;

var p= new Person() \{ Name= "Andrei Ignat" , Age=55};
var utf8Csv = CsvSerializer.SerializeToString<Person>([p]);
Console.WriteLine(utf8Csv);
var p1 = CsvSerializer.Serialize<Person>([p]);
var p2 = CsvSerializer.Deserialize<Person>(p1);

Console.WriteLine(p2.First().Name);
Console.WriteLine(p2.First().Age);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CsvCsharp\src\Serializer\Person.cs" label="Person.cs" >

  This is the use of **Csvcsharp** in *Person.cs*

```csharp showLineNumbers 
using Csv.Annotations;

namespace SerializerDemo;
[CsvObject]
public partial class Person 
{
    [Column(0)]
    public int Age \{ get; set; }
    [Column(1)]
    public string Name \{ get; set; \} = string.Empty;

}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CsvCsharp\src\Serializer\obj\GX\Csv.SourceGenerator\Csv.SourceGenerator.CsvSerializerGenerator\SerializerDemo.Person.CsvSerializer.g.cs" label="SerializerDemo.Person.CsvSerializer.g.cs" >
```csharp showLineNumbers 
 // <auto-generated />
 #nullable enable
 #pragma warning disable CS0162 // Unreachable code
 #pragma warning disable CS0219 // Variable assigned but never used
 #pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
 #pragma warning disable CS8601 // Possible null reference assignment
 #pragma warning disable CS8602 // Possible null return
 #pragma warning disable CS8604 // Possible null reference argument for parameter
 #pragma warning disable CS8631 // The type cannot be used as type parameter in the generic type or method

 using System;
 using Csv;
 using Csv.Annotations;
 using Csv.Internal;

 namespace SerializerDemo
 {
	 partial class Person : global::Csv.ICsvSerializerRegister
	 {
		 static void RegisterCsvSerializer()
		 {
			 global::Csv.CsvSerializer.Register(GeneratedCsvSerializer.Instance);
		 }
		 class GeneratedCsvSerializer : ICsvSerializer<global::SerializerDemo.Person>
		 {
			 public static readonly GeneratedCsvSerializer Instance = new();
			 static readonly byte[] AgeUtf8Key = \{ 65, 103, 101 }; // Age
			 static readonly byte[] NameUtf8Key = \{ 78, 97, 109, 101 }; // Name

			 public void Serialize(ref global::Csv.CsvWriter writer, global::System.ReadOnlySpan<global::SerializerDemo.Person> values)
			 {
				 if (writer.Options.HasHeader)
				 {
					 var quoteHeader = writer.Options.QuoteMode is (global::Csv.QuoteMode.All or global::Csv.QuoteMode.NonNumeric);
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteRaw(AgeUtf8Key.AsSpan());
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteSeparator();
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteRaw(NameUtf8Key.AsSpan());
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteEndOfLine();
				 }
				 for (int i = 0; i < values.Length; i++)
				 {
					 var item = values[i];
					 writer.WriteInt32(item.Age);
					 writer.WriteSeparator();
					 writer.WriteString(item.Name);
					 if (i != values.Length - 1) writer.WriteEndOfLine();
				 }
			 }

			 public void Serialize(ref global::Csv.CsvWriter writer, global::System.Collections.Generic.IEnumerable<global::SerializerDemo.Person> values)
			 {
				 if (writer.Options.HasHeader)
				 {
					 var quoteHeader = writer.Options.QuoteMode is (global::Csv.QuoteMode.All or global::Csv.QuoteMode.NonNumeric);
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteRaw(AgeUtf8Key.AsSpan());
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteSeparator();
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteRaw(NameUtf8Key.AsSpan());
					 if (quoteHeader) writer.WriteRaw((byte)'"');
					 writer.WriteEndOfLine();
				 }
				 var e = values.GetEnumerator();
				 try
				 {
					 if (!e.MoveNext()) return;
					 while (true)
					 {
						 var item = e.Current;
						 writer.WriteInt32(item.Age);
						 writer.WriteSeparator();
						 writer.WriteString(item.Name);
						 if (!e.MoveNext())
						 {
							 writer.WriteEndOfLine();
							 break;
						 }
					 }
				 }
				 finally
				 {
					 e.Dispose();
				 }
			 }

			 public global::SerializerDemo.Person[] Deserialize(ref global::Csv.CsvReader reader)
			 {
				 var allowComments = reader.Options.AllowComments;
				 while (reader.TryReadEndOfLine(true) || (allowComments && reader.TrySkipComment(false))) \{ }
				 if (reader.Options.HasHeader) reader.SkipLine();
				 using var list = new TempList<global::SerializerDemo.Person>();
				 while (reader.Remaining > 0)
				 {
					 if (reader.TryReadEndOfLine()) continue;
					 if (allowComments && reader.TrySkipComment(false)) continue;
					 var __Age = default(int);
					 var __Name = default(string);
					 var ___endOfLine = false;
					 for (int __i = 0; __i <= 1; __i++)
					 {
						 switch (__i)
						 {
							 case 0:
								 __Age = reader.ReadInt32();
								 break;
							 case 1:
								 __Name = reader.ReadString();
								 break;
							 default:
								 reader.SkipField();
								 break;
						 }
						 if (reader.TryReadEndOfLine(true))
						 {
							 ___endOfLine = true;
							 goto ADD_ITEM;
						 }
						 if (!reader.TryReadSeparator(false)) goto ADD_ITEM;
					 }

					 ADD_ITEM:
					 list.Add(					 new()
					 {
						 Age = __Age,
						 Name = __Name,
					 }
					 );

					 if (!___endOfLine) reader.SkipLine();
				 }
				 return list.AsSpan().ToArray();
			 }

			 public int Deserialize(ref global::Csv.CsvReader reader, global::System.Span<global::SerializerDemo.Person> destination)
			 {
				 var allowComments = reader.Options.AllowComments;
				 while (reader.TryReadEndOfLine(true) || (allowComments && reader.TrySkipComment(false))) \{ }
				 if (reader.Options.HasHeader) reader.SkipLine();
				 var n = 0;
				 while (reader.Remaining > 0)
				 {
					 if (reader.TryReadEndOfLine()) continue;
					 if (allowComments && reader.TrySkipComment(false)) continue;
					 var __Age = default(int);
					 var __Name = default(string);
					 var ___endOfLine = false;
					 for (int __i = 0; __i <= 1; __i++)
					 {
						 switch (__i)
						 {
							 case 0:
								 __Age = reader.ReadInt32();
								 break;
							 case 1:
								 __Name = reader.ReadString();
								 break;
							 default:
								 reader.SkipField();
								 break;
						 }
						 if (reader.TryReadEndOfLine(true))
						 {
							 ___endOfLine = true;
							 goto ADD_ITEM;
						 }
						 if (!reader.TryReadSeparator(false)) goto ADD_ITEM;
					 }

					 ADD_ITEM:
					 destination[n++] = new()
					 {
						 Age = __Age,
						 Name = __Name,
					 }
					 ;

					 if (!___endOfLine) reader.SkipLine();
				 }
				 return n;
			 }
		 }
	 }
	 #pragma warning restore CS0162 // Unreachable code
	 #pragma warning restore CS0219 // Variable assigned but never used
	 #pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
	 #pragma warning restore CS8601 // Possible null reference assignment
	 #pragma warning restore CS8602 // Possible null return
	 #pragma warning restore CS8604 // Possible null reference argument for parameter
	 #pragma warning restore CS8631 // The type cannot be used as type parameter in the generic type or method
 }

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CsvCsharp\src\Serializer\obj\GX\VYaml.SourceGenerator\VYaml.SourceGenerator.VYamlIncrementalSourceGenerator\SerializerDemo.Person.YamlFormatter.g.cs" label="SerializerDemo.Person.YamlFormatter.g.cs" >
```csharp showLineNumbers 
 // <auto-generated />
 #nullable enable
 #pragma warning disable CS0162 // Unreachable code
 #pragma warning disable CS0219 // Variable assigned but never used
 #pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
 #pragma warning disable CS8601 // Possible null reference assignment
 #pragma warning disable CS8602 // Possible null return
 #pragma warning disable CS8604 // Possible null reference argument for parameter
 #pragma warning disable CS8619 // Possible null reference assignment fix
 #pragma warning disable CS8631 // The type cannot be used as type parameter in the generic type or method

 using System;
 using VYaml.Annotations;
 using VYaml.Parser;
 using VYaml.Emitter;
 using VYaml.Serialization;

 namespace SerializerDemo
 {
     partial class Person
     {
         [VYaml.Annotations.Preserve]
         public static void __RegisterVYamlFormatter()
         {
             global::VYaml.Serialization.GeneratedResolver.Register(new PersonGeneratedFormatter());
         }
         [VYaml.Annotations.Preserve]
         public class PersonGeneratedFormatter : IYamlFormatter<global::SerializerDemo.Person?>
         {
             static readonly byte[] AgeKeyUtf8Bytes = \{ 97, 103, 101 }; // age

             static readonly byte[] NameKeyUtf8Bytes = \{ 110, 97, 109, 101 }; // name

             [VYaml.Annotations.Preserve]
             public void Serialize(ref Utf8YamlEmitter emitter, global::SerializerDemo.Person? value, YamlSerializationContext context)
             {
                 if (value is null)
                 {
                     emitter.WriteNull();
                     return;
                 }
                 emitter.BeginMapping();
                 if (context.Options.NamingConvention == global::VYaml.Annotations.NamingConvention.LowerCamelCase)
                 {
                     emitter.WriteScalar(AgeKeyUtf8Bytes);
                 }
                 else
                 {
                     global::VYaml.Serialization.NamingConventionMutator.MutateToThreadStaticBufferUtf8(AgeKeyUtf8Bytes, context.Options.NamingConvention, out var mutated, out var written);
                     emitter.WriteScalar(mutated.AsSpan(0, written));
                 }
                 context.Serialize(ref emitter, value.Age);
                 if (context.Options.NamingConvention == global::VYaml.Annotations.NamingConvention.LowerCamelCase)
                 {
                     emitter.WriteScalar(NameKeyUtf8Bytes);
                 }
                 else
                 {
                     global::VYaml.Serialization.NamingConventionMutator.MutateToThreadStaticBufferUtf8(NameKeyUtf8Bytes, context.Options.NamingConvention, out var mutated, out var written);
                     emitter.WriteScalar(mutated.AsSpan(0, written));
                 }
                 context.Serialize(ref emitter, value.Name);
                 emitter.EndMapping();
             }
             [VYaml.Annotations.Preserve]
             public global::SerializerDemo.Person? Deserialize(ref YamlParser parser, YamlDeserializationContext context)
             {
                 if (parser.IsNullScalar())
                 {
                     parser.Read();
                     return default;
                 }
                 parser.ReadWithVerify(ParseEventType.MappingStart);

                 var __Age__ = default(int);
                 var __Name__ = default(string);
                 while (!parser.End && parser.CurrentEventType != ParseEventType.MappingEnd)
                 {
                     if (parser.CurrentEventType != ParseEventType.Scalar)
                     {
                         throw new YamlSerializerException(parser.CurrentMark, "Custom type deserialization supports only string key");
                     }

                     if (!parser.TryGetScalarAsSpan(out var key))
                     {
                         throw new YamlSerializerException(parser.CurrentMark, "Custom type deserialization supports only string key");
                     }

                     if (context.Options.NamingConvention != global::VYaml.Annotations.NamingConvention.LowerCamelCase)
                     {
                         global::VYaml.Serialization.NamingConventionMutator.MutateToThreadStaticBufferUtf8(key, global::VYaml.Annotations.NamingConvention.LowerCamelCase, out var mutated, out var written);
                         key = mutated.AsSpan(0, written);
                     }
                     switch (key.Length)
                     {
                         case 3:
                             if (key.SequenceEqual(AgeKeyUtf8Bytes))
                             {
                                 parser.Read(); // skip key
                                 __Age__ = context.DeserializeWithAlias<int>(ref parser);
                                 continue;
                             }
                             goto default;
                         case 4:
                             if (key.SequenceEqual(NameKeyUtf8Bytes))
                             {
                                 parser.Read(); // skip key
                                 __Name__ = context.DeserializeWithAlias<string>(ref parser);
                                 continue;
                             }
                             goto default;
                         default:
                             parser.Read(); // skip key
                             parser.SkipCurrentNode(); // skip value
                             continue;
                     }
                 }
                 parser.ReadWithVerify(ParseEventType.MappingEnd);
                 return new Person
                 {
                     Age = __Age__,
                     Name = __Name__,
                 }
                 ;
             }
         }
     }
 }
 #pragma warning restore CS0162 // Unreachable code
 #pragma warning restore CS0219 // Variable assigned but never used
 #pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
 #pragma warning restore CS8601 // Possible null reference assignment
 #pragma warning restore CS8602 // Possible null return
 #pragma warning restore CS8604 // Possible null reference argument for parameter
 #pragma warning restore CS8631 // The type cannot be used as type parameter in the generic type or method

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Csvcsharp ](/sources/Csvcsharp.zip)

:::


### Share Csvcsharp 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp&quote=Csvcsharp" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp&text=Csvcsharp:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp&title=Csvcsharp" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp&title=Csvcsharp&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCsvcsharp" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Csvcsharp

<SameCategory />

