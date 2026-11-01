---
sidebar_position: 2960
title: 296 - ModernLibs.FileHelpers
description: Read/write records based on fixed-width or delimited formats
slug: /ModernLibs.FileHelpers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# ModernLibs.FileHelpers  by Piotr-Nawrot


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ModernLibs.FileHelpers?label=ModernLibs.FileHelpers)](https://www.nuget.org/packages/ModernLibs.FileHelpers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ModernLibs/FileHelpers?label=updated)](https://github.com/ModernLibs/FileHelpers/)
![GitHub Repo stars](https://img.shields.io/github/stars/ModernLibs/FileHelpers?style=social)

## Details

### Info
:::info

Name: **ModernLibs.FileHelpers**

Modern, AOT-ready rewrite of FileHelpers 3.x for .NET 10. Reads and writes delimited (CSV, TSV, ...) and fixed-length files. Record descriptors are created at compile time by a bundled source generator, so there is no runtime reflection and the library is trimming- and Native AOT-compatible. Reading record structs causes no per-record allocations by the engine (string field values still allocate their text). FileHelpers 3.x-style API (record attributes, engines, error modes); the migration guide lists the differences.

Author: Piotr-Nawrot

NuGet: 
*https://www.nuget.org/packages/ModernLibs.FileHelpers/*   


You can find more details at https://github.com/ModernLibs/FileHelpers/

Source: https://github.com/ModernLibs/FileHelpers/

:::

### Author
:::note
Piotr-Nawrot 
![Alt text](https://github.com/ModernLibs.png)
:::

## Original Readme
:::note

### ModernLibs.FileHelpers

[![NuGet](https://img.shields.io/nuget/v/ModernLibs.FileHelpers.svg)](https://www.nuget.org/packages/ModernLibs.FileHelpers)
[![CI](https://github.com/ModernLibs/FileHelpers/actions/workflows/ci.yml/badge.svg)](https://github.com/ModernLibs/FileHelpers/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ModernLibs/FileHelpers/blob/main/LICENSE)

Typed reading and writing of delimited (CSV, TSV, pipe, ...) and fixed-length text files for .NET 10,
with a [FileHelpers](https://github.com/MarcosMeli/FileHelpers) 3.x-style API.

You describe a record layout with attributes. A source generator, shipped inside the package, turns
the layout into parsing and formatting code at compile time. There is no runtime reflection, so the
library works with Native AOT and trimming.

ModernLibs.FileHelpers is an independent reimplementation modelled on the API of FileHelpers 3.x by
Marcos Meli and contributors. FileHelpers 3.x is the reference for its behaviour. It is not the
original project: please report problems with this library
[here](https://github.com/ModernLibs/FileHelpers/issues), not upstream.

###### Install

```bash
dotnet add package ModernLibs.FileHelpers
```

Requirements: .NET 10 (`net10.0`). Requires C# 11 or later (`MLFH026`): the .NET 10 SDK defaults to
C# 14, so this only matters if your project pins an older `<LangVersion>`. The package has no runtime
dependencies. The source generator is included as an analyzer;
there is nothing else to install.

###### Quick start

######### Delimited records

```csharp
using ModernLibs.FileHelpers;

[DelimitedRecord(",")]
[IgnoreFirst(1)]
public sealed class Customer
{
    public int Id;

    [FieldQuoted]
    public string Name = "";

    public decimal Balance;

    [FieldConverter(ConverterKind.Date, "yyyy-MM-dd")]
    public DateTime Joined;
}
```

```csharp
var engine = new FileHelperEngine<Customer>();

Customer[] customers = engine.ReadFile("customers.csv");   // the header line is kept in engine.HeaderText
foreach (Customer c in customers)
    Console.WriteLine($"{c.Id}: {c.Name} owes {c.Balance}");

engine.WriteFile("customers-copy.csv", customers);           // HeaderText is written back first
```

Fields are read in declaration order. Use `[FieldOrder(n)]` when you want the order to be explicit.

######### Fixed-length records

```csharp
[FixedLengthRecord]
public sealed class Employee
{
    [FieldFixedLength(6)]
    [FieldAlign(AlignMode.Right, '0')]
    public int Id;

    [FieldFixedLength(20)]
    [FieldTrim(TrimMode.Right)]
    public string Name = "";

    [FieldFixedLength(10)]
    [FieldAlign(AlignMode.Right, '0')]
    public decimal Salary;
}
```

```csharp
var engine = new FileHelperEngine<Employee>();

Employee[] staff = engine.ReadString(
    "000042John Smith          0001234.50\r\n" +
    "000043Mary Jones          0000980.00\r\n");

string text = engine.WriteString(staff);   // writes the same layout back
```

`[FixedLengthRecord(FixedMode.AllowLessChars)]` and the other `FixedMode` values control how lines
that are shorter or longer than the layout are handled.

######### Record structs without per-record allocations

Records can be `struct` or `record struct` types. A struct whose fields are all value types (numbers,
dates, `bool`, `Guid`, enums, ...) can be read through a callback or a streaming method without any
heap allocation per record:

```csharp
[DelimitedRecord(",")]
public record struct Trade
{
    public long Id;
    public decimal Price;
    public int Quantity;
}
```

```csharp
var engine = new FileHelperEngine<Trade>();

decimal notional = 0;
int count = engine.ReadFile("trades.csv", trade => notional += trade.Price * trade.Quantity);
```

The callback overloads of `ReadFile`, `ReadString` and `ReadSpan`, and the streaming `ReadSync`, do
not allocate a result array or a per-line string. A `string` field still allocates its string, and
the array-returning overloads still allocate the array. `ReadString` and `ReadSpan` also accept a
`SpanRecordCallback<T>` that receives each record by reference.

###### Features

- **Delimited and fixed-length records** described with FileHelpers-style attributes: `[DelimitedRecord]`,
  `[FixedLengthRecord]`, `[FieldOrder]`, `[FieldFixedLength]`, `[FieldQuoted]`, `[FieldTrim]`,
  `[FieldAlign]`, `[FieldConverter]`, `[FieldNullValue]`, `[FieldOptional]`, `[FieldInNewLine]`,
  `[FieldHidden]`, `[FieldNotEmpty]`, `[IgnoreFirst]`, `[IgnoreLast]`, `[IgnoreEmptyLines]`,
  `[IgnoreCommentedLines]`, `[ConditionalRecord]` and more.
- **Record shapes**: classes, structs, `record` and `record struct` types, including positional records,
  types without a parameterless constructor (values are bound by constructor parameter name) and
  `required` members. `public`, `internal` and `protected internal` fields and properties are mapped;
  use `[FieldHidden]` to leave one out. `private` and `protected` members cannot be mapped, and the
  ones FileHelpers 3.x would read as columns are reported (`MLFH023`, `MLFH028`).
- **Field types**: `string`, `char`, `bool`, all integer types, `decimal`, `double`, `float`,
  `DateTime`, `DateOnly`, `TimeOnly`, `DateTimeOffset`, `TimeSpan`, `Guid`, enums and their nullable
  forms. Other types use a custom converter.
- **Converters**: built-in converters with FileHelpers 3.x parsing rules and culture-independent
  defaults, per-field culture (`[FieldConverter(..., CultureName = "de-DE")]`), 3.x-style
  `ConverterBase` custom converters, and span-based `ISpanConverter<T>` converters.
- **Engines**: `FileHelperEngine<T>` (read/write string, span, file, `TextReader`/`TextWriter`,
  append), `FileHelperAsyncEngine<T>` (record-by-record `BeginRead*`/`ReadNext` and
  `BeginWrite*`/`WriteNext`), `MultiRecordEngine` (several record types in one file) and
  `MasterDetailEngine<TMaster, TDetail>` (grouped master/detail lines).
- **Streaming**: `ReadSync` (`IEnumerable<T>`), `ReadAsync` (`IAsyncEnumerable<T>` with cancellation),
  callback reads, and async variants of the multi-record and master/detail engines.
- **Parallel reads**: `ParallelReadFile` / `ParallelReadString` extension methods split large inputs
  into chunks and keep sequential semantics (same records, errors and line numbers).
- **Events**: `BeforeReadRecord`, `AfterReadRecord`, `BeforeWriteRecord`, `AfterWriteRecord`, `Progress`,
  and `INotifyRead<T>` / `INotifyWrite<T>` on the record type.
- **Errors**: FileHelpers 3.x exception types and `ErrorMode` handling (see below).
- **Quoting as in FileHelpers 3.x**: per-field quote character, `QuoteMode` on read and write, and
  multiline quoted values allowed by default.
- **Compile-time diagnostics**: layout mistakes are reported as build errors and warnings
  (`MLFH001`-`MLFH029`), see the [diagnostics reference](https://github.com/ModernLibs/FileHelpers/blob/main/docs/diagnostics.md).
  Diagnostics come from an analyzer shipped in the generator assembly. `MLFH` warnings can be
  suppressed as usual; errors that block the descriptor cannot (`#pragma`, `.editorconfig`, `NoWarn`
  are ignored). If they are hidden with `[SuppressMessage]` or `RunAnalyzers=false`, using the record
  throws a `BadUsageException` that names the errors (see
  [suppressing diagnostics](https://github.com/ModernLibs/FileHelpers/blob/main/docs/diagnostics.md#suppressing-diagnostics)).

###### Error handling

By default (`ErrorMode.ThrowException`) the first bad record stops the read with an exception that
carries the line number:

| Exception | Raised when |
|---|---|
| `ConvertException` | A field value cannot be converted (also `[FieldNotEmpty]` violations). Has `FieldName`, `FieldType`, `FieldStringValue`, `LineNumber`, `ColumnNumber`. |
| `NullValueNotFoundException` | A non-nullable value-type field is empty and has no `[FieldNullValue]`. |
| `BadUsageException` | The line does not match the layout (extra fields, wrong fixed width, unclosed quote, ...). |
| `FileHelpersException` | Base class of all of the above; also raised for lines with too few fields. |

```csharp
try
{
    engine.ReadFile("customers.csv");
}
catch (ConvertException ex)
{
    Console.WriteLine($"Line {ex.LineNumber}, field {ex.FieldName}: '{ex.FieldStringValue}' is not a {ex.FieldType.Name}");
}
```

With `ErrorMode.SaveAndContinue` bad records are skipped and collected; `ErrorMode.IgnoreAndContinue`
skips them silently:

```csharp
var engine = new FileHelperEngine<Customer> \{ ErrorMode = ErrorMode.SaveAndContinue };
Customer[] good = engine.ReadFile("customers.csv");

foreach (ErrorInfo error in engine.ErrorManager.Errors)
    Console.WriteLine($"Line {error.LineNumber}, field {error.FieldName}: {error.ExceptionInfo?.Message}");
```

###### Streaming large files

```csharp
await foreach (Customer c in engine.ReadAsync("big.csv", cancellationToken))
{
    // one record at a time
}

using var reader = new FileHelperAsyncEngine<Customer>();
reader.BeginReadFile("big.csv");
while (reader.ReadNext() is \{ \} customer)
{
    // FileHelpers 3.x-style pull loop
}
```

See [Opt-in features](https://github.com/ModernLibs/FileHelpers/blob/main/docs/OPT-IN-FEATURES.md) for
callbacks, record recycling and parallel reads.

###### Native AOT and trimming

All parsing and formatting code is generated at compile time. The library uses no reflection,
`Expression` compilation or `DynamicMethod`, and is built with `IsAotCompatible` and `IsTrimmable`
enabled, so the trim and AOT analyzers check it on every build. Applications that use it can publish
with `PublishAot=true`.

###### Performance

The read path works on `ReadOnlySpan<char>`: lines and fields are sliced, not copied, and numeric,
date and other value-type fields are parsed straight from the span. Buffers are pooled. Struct records
with value-type fields are read without per-record allocations (see above), and this is checked by
the test suite.

The repository contains a BenchmarkDotNet suite that compares this library with FileHelpers 3.5.2,
Sep, Sylvan.Data.Csv and CsvHelper. In the
[4.8.0 results](https://github.com/ModernLibs/FileHelpers/blob/main/docs/benchmarks/v4.8.0.md)
(Ryzen 9 5900X, WSL2, .NET 10, 100K rows):

- Reading a 25-column delimited file into objects: 182 ms, against 344 ms for FileHelpers 3.5.2 and
  352 ms for CsvHelper. Sylvan (107 ms) and Sep (122 ms) are faster, and allocate about 2.5 times less
  than `ReadFile(path)`, which loads the whole file into a string (the streaming
  `ReadFile(path, callback)` overload allocates as little as Sep).
- Reading a fixed-width file: 53 ms, against 84 ms for FileHelpers 3.5.2 (which allocates 16 % less).
- Writing the same records to a string: 70 ms, against 75 ms for Sep and 173 ms for CsvHelper.

Results depend on hardware and record shape; see
[BENCHMARKS.md](https://github.com/ModernLibs/FileHelpers/blob/main/BENCHMARKS.md) to run the suite on
your own hardware.

###### Migrating from FileHelpers 3.x

The API follows FileHelpers 3.x: the same attribute names, engine classes, events and exception types.
Most code migrates by changing the namespace:

```diff
- using FileHelpers;
+ using ModernLibs.FileHelpers;
```

Some things are different. Runtime-reflection features (`ClassBuilder`, non-generic engines,
`DelimitedFileEngine` options) are not available, a few signatures changed, and some defaults differ
(UTF-8 encoding, `\r\n` line endings on every platform). The
[migration guide](https://github.com/ModernLibs/FileHelpers/blob/main/docs/MIGRATION.md) lists every
difference we know of.

###### Versioning

4.x is a ground-up modern reimplementation that follows FileHelpers 3.x, so its major version
continues after 3.x. Versions 4.0.0 to 4.7.0 were development milestones, published only as source
releases on GitHub. **4.8.0 is the first release on NuGet.** From 4.8.0 on, the package follows
[Semantic Versioning](https://semver.org/). See the
[changelog](https://github.com/ModernLibs/FileHelpers/blob/main/CHANGELOG.md).

###### Documentation

- [Migration guide](https://github.com/ModernLibs/FileHelpers/blob/main/docs/MIGRATION.md) - every difference from FileHelpers 3.x
- [Diagnostics reference](https://github.com/ModernLibs/FileHelpers/blob/main/docs/diagnostics.md) - `MLFH001`-`MLFH029`
- [Opt-in features](https://github.com/ModernLibs/FileHelpers/blob/main/docs/OPT-IN-FEATURES.md) - callbacks, streaming, recycling, parallel reads
- [Gap analysis](https://github.com/ModernLibs/FileHelpers/blob/main/docs/GAP-ANALYSIS.md) - FileHelpers 3.x features that are not included, and why
- [Benchmarks](https://github.com/ModernLibs/FileHelpers/blob/main/BENCHMARKS.md)
- [Changelog](https://github.com/ModernLibs/FileHelpers/blob/main/CHANGELOG.md)
- [Samples](https://github.com/ModernLibs/FileHelpers/tree/main/samples)

###### Contributing

Issues and pull requests are welcome. See
[CONTRIBUTING.md](https://github.com/ModernLibs/FileHelpers/blob/main/CONTRIBUTING.md) for how to
build, test and submit changes.

###### License and credits

MIT, see [LICENSE](https://github.com/ModernLibs/FileHelpers/blob/main/LICENSE).

The API and behaviour are modelled on [FileHelpers](https://github.com/MarcosMeli/FileHelpers) by
Marcos Meli and contributors (also MIT licensed). Thank you to everyone who built and maintained it.


:::

### About
:::note

Read/write records based on fixed-width or delimited formats


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ModernLibs.FileHelpers**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="ModernLibs.FileHelpers" Version="4.8.0" />
	</ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ModernLibs.FileHelpers\src\Serializer\Person.cs" label="Person.cs" >

  This is the use of **ModernLibs.FileHelpers** in *Person.cs*

```csharp showLineNumbers 


using ModernLibs.FileHelpers;

namespace SerializerDemo;

[DelimitedRecord(",")]
public partial class Person 
{
    [FieldConverter(ConverterKind.Date, "yyyy-MM-dd")]
    public DateTime DOB \{ get; set; }
    [FieldQuoted]
    public string Name \{ get; set; \} = string.Empty;

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ModernLibs.FileHelpers\src\Serializer\Program.cs" label="Program.cs" >

  This is the use of **ModernLibs.FileHelpers** in *Program.cs*

```csharp showLineNumbers 
using ModernLibs.FileHelpers;
using SerializerDemo;
var engine = new FileHelperEngine<Person>();
Person p = new () \{ Name= "Andrei Ignat" , DOB=new DateTime(1970, 4, 16)};

var data= engine.WriteString([p]);
var p1 = engine.ReadString(data);
Console.WriteLine(p1[0].Name);
Console.WriteLine(p1[0].DOB);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ModernLibs.FileHelpers\src\Serializer\obj\GX\ModernLibs.FileHelpers.Generator\ModernLibs.FileHelpers.Generator.FileHelpersGenerator\SerializerDemo.Person.1e57ba39.DelimitedDescriptor.g.cs" label="SerializerDemo.Person.1e57ba39.DelimitedDescriptor.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
#pragma warning disable CA2255 // ModuleInitializer in source-generated consumer code
#pragma warning disable CS0612, CS0618 // obsolete record members

namespace SerializerDemo;

file sealed class __PersonDescriptor : global::ModernLibs.FileHelpers.IRecyclableDescriptor<global::SerializerDemo.Person>
{
    public static readonly __PersonDescriptor Instance = new();

    private static class __Conv
    {
        internal static readonly global::ModernLibs.FileHelpers.Converters.DateTimeConverter __conv_field0 = new("yyyy-MM-dd", null);
    }

    private static int __Column(global::System.ReadOnlySpan<char> lines, global::System.ReadOnlySpan<char> value)
    {
        if (global::System.MemoryExtensions.Overlaps(lines, value, out int offset))
            return offset + 1;
        if (!value.IsEmpty)
            return -1;
        nint bytes = global::System.Runtime.CompilerServices.Unsafe.ByteOffset(
            ref global::System.Runtime.InteropServices.MemoryMarshal.GetReference(lines),
            ref global::System.Runtime.InteropServices.MemoryMarshal.GetReference(value));
        return bytes >= 0 && bytes <= (nint)lines.Length * sizeof(char) ? (int)(bytes / sizeof(char)) + 1 : -1;
    }

    private static global::ModernLibs.FileHelpers.ConvertException __ConvertError(global::System.ReadOnlySpan<char> lines, global::System.ReadOnlySpan<char> value, global::System.Type type, string field, string? extra, global::System.Exception? inner) =>
        new(new string(value), type, field, -1, __Column(lines, value), extra, inner);

    private static global::ModernLibs.FileHelpers.NullValueNotFoundException __NullValueNotFound(global::System.ReadOnlySpan<char> lines, global::System.ReadOnlySpan<char> value, string field) =>
        new(-1, __Column(lines, value), "No value found for the value type field: '" + field + "' Class: 'Person'. You must use the [FieldNullValue] attribute because this is a value type and can't be null or use a Nullable Type instead of the current type.");

    private static void __WriteText(global::System.Buffers.IBufferWriter<char> writer, global::System.ReadOnlySpan<char> text)
    {
        if (text.IsEmpty) return;
        text.CopyTo(writer.GetSpan(text.Length));
        writer.Advance(text.Length);
    }

    private static void __WriteQuoted(global::System.Buffers.IBufferWriter<char> writer, global::System.ReadOnlySpan<char> text, char quote)
    {
        // Indexed loops: foreach over a span needs C# 13 against .NET 10, whose span enumerator implements interfaces.
        int count = global::System.MemoryExtensions.Count(text, quote);
        int total = text.Length + count + 2;
        var dest = writer.GetSpan(total);
        dest[0] = quote;
        int pos = 1;
        for (int i = 0; i < text.Length; i++)
        {
            char c = text[i];
            dest[pos++] = c;
            if (c == quote) dest[pos++] = quote;
        }
        dest[pos] = quote;
        writer.Advance(total);
    }

    private static void __WriteQuotedField(global::System.Buffers.IBufferWriter<char> writer, global::System.ReadOnlySpan<char> text, char quote, bool always, bool multilineWrite, string separator, string field)
    {
        bool newLine = global::System.MemoryExtensions.IndexOfAny(text, '\r', '\n') >= 0;
        if (newLine && !multilineWrite)
            throw new global::ModernLibs.FileHelpers.BadUsageException("One value for the field " + field + " has a new line inside. To allow this value to be written you must add a FieldQuoted attribute with the multiline option set.");
        if (always || newLine || global::System.MemoryExtensions.IndexOf(text, separator, global::System.StringComparison.Ordinal) >= 0)
            __WriteQuoted(writer, text, quote);
        else
            __WriteText(writer, text);
    }

    private static void __WritePadded(global::System.Buffers.IBufferWriter<char> writer, global::System.ReadOnlySpan<char> text, int width, int align, char pad, bool overflowError, string field)
    {
        if (text.Length > width)
        {
            if (overflowError)
                throw new global::System.InvalidOperationException($"Field '{field}' exceeds fixed length {width} (actual: {text.Length} characters).");
            text = text.Slice(0, width);
        }
        var dest = writer.GetSpan(width);
        int padding = width - text.Length;
        int left = align == 2 ? padding : align == 1 ? padding / 2 : 0;
        dest.Slice(0, left).Fill(pad);
        text.CopyTo(dest.Slice(left));
        dest.Slice(left + text.Length, padding - left).Fill(pad);
        writer.Advance(width);
    }

    private static global::System.ReadOnlySpan<char> __Format<TConverter, TValue>(TConverter converter, TValue value, global::System.Span<char> buffer, ref char[]? rented)
        where TConverter : global::ModernLibs.FileHelpers.Converters.ISpanConverter<TValue>
    {
        int written;
        while (!converter.TryFormat(value, buffer, out written))
        {
            if (buffer.Length >= 0x100000)
                throw new global::System.FormatException("The field value could not be formatted by " + converter.GetType().Name + ".");
            int size = buffer.Length * 2;
            if (rented is not null)
                global::System.Buffers.ArrayPool<char>.Shared.Return(rented);
            rented = global::System.Buffers.ArrayPool<char>.Shared.Rent(size);
            buffer = rented;
        }
        return buffer.Slice(0, written);
    }

    public global::SerializerDemo.Person Parse(global::System.ReadOnlySpan<char> lines, int lineCount)
    {
        const int __expectedLines = 1; // 1 + 0 FieldInNewLine fields
        if (lineCount != __expectedLines)
            throw new global::ModernLibs.FileHelpers.BadUsageException($"Expected {__expectedLines} lines for the record but received {lineCount}. Check that all multi-line fields are present.");
        var line = lines;

        char[]? __qRent1 = null;
        try
        {
        // Quote-aware delimited splitting (3.x DelimitedField rules; quotes only in [FieldQuoted] fields).
        global::System.ReadOnlySpan<char> __f0;
        global::System.ReadOnlySpan<char> __qrem1;
        bool __qhas1;
        int __qsSep0 = global::System.MemoryExtensions.IndexOf(line, ',');
        __f0 = __qsSep0 < 0 ? line : line.Slice(0, __qsSep0);
        __qhas1 = __qsSep0 >= 0;
        __qrem1 = __qsSep0 < 0 ? global::System.ReadOnlySpan<char>.Empty : line.Slice(__qsSep0 + 1);
        global::System.ReadOnlySpan<char> __f1;
        bool __fq1 = false;
        int __qsPos1 = 0;
        int __qsLen1 = __qrem1.Length;
        if (__qsPos1 < __qsLen1 && __qrem1[__qsPos1] == '"')
        {
            int __qsStart1 = __qsPos1;
            __qsPos1++;
            while (true)
            {
                int __qsQ1 = global::System.MemoryExtensions.IndexOf(__qrem1.Slice(__qsPos1), '"');
                if (__qsQ1 < 0)
                    throw new global::ModernLibs.FileHelpers.BadUsageException(-1, __Column(lines, __qrem1), "The field 'Name' has an unclosed quoted string. Check that every opening \" has a closing \" (use \"\" for a quote inside the value) or allow multiline values in [FieldQuoted].");
                __qsPos1 += __qsQ1;
                if (__qsPos1 + 1 < __qsLen1 && __qrem1[__qsPos1 + 1] == '"') \{ __qsPos1 += 2; continue; }
                __qsPos1++;
                break;
            }
            __f1 = __qrem1.Slice(__qsStart1, __qsPos1 - __qsStart1);
            __fq1 = true;
        }
        else
        {
            __f1 = __qrem1;
        }

        // [FieldQuoted] strip + unescape for field 'Name'.
        if (__fq1)
        {
            var __qInner1 = __f1.Slice(1, __f1.Length - 2);
            bool __hasDoubled1 = false;
            for (int __si1 = 0; __si1 < __qInner1.Length - 1; __si1++)
            {
                if (__qInner1[__si1] == '"' && __qInner1[__si1 + 1] == '"')
                {
                    __hasDoubled1 = true;
                    break;
                }
            }
            if (!__hasDoubled1)
            {
                __f1 = __qInner1;
            }
            else
            {
                // Rented buffer, returned in the finally block after the value is materialised.
                var __qBuf1 = global::System.Buffers.ArrayPool<char>.Shared.Rent(__qInner1.Length);
                __qRent1 = __qBuf1;
                int __qLen1 = 0;
                for (int __qi1 = 0; __qi1 < __qInner1.Length; __qi1++)
                {
                    char __qc1 = __qInner1[__qi1];
                    if (__qc1 == '"' && __qi1 + 1 < __qInner1.Length && __qInner1[__qi1 + 1] == '"')
                    {
                        __qBuf1[__qLen1++] = '"';
                        __qi1++;
                    }
                    else
                    {
                        __qBuf1[__qLen1++] = __qc1;
                    }
                }
                __f1 = new global::System.ReadOnlySpan<char>(__qBuf1, 0, __qLen1);
            }
        }

        global::System.DateTime __v0;
        if (global::System.MemoryExtensions.IsWhiteSpace(__f0))
            throw __NullValueNotFound(lines, __f0, "DOB");
        else if (__Conv.__conv_field0.TryParse(__f0, out global::System.DateTime __p0))
            __v0 = __p0;
        else
            throw __ConvertError(lines, __f0, typeof(global::System.DateTime), "DOB", null, null);
        string __v1 = new string(__f1);

        return new global::SerializerDemo.Person
        {
            DOB = __v0,
            Name = __v1
        };
        }
        finally
        {
            if (__qRent1 is not null)
                global::System.Buffers.ArrayPool<char>.Shared.Return(__qRent1);
        }
    }

    public void ParseInto(global::System.ReadOnlySpan<char> lines, int lineCount, global::SerializerDemo.Person existing)
    {
        const int __expectedLines = 1; // 1 + 0 FieldInNewLine fields
        if (lineCount != __expectedLines)
            throw new global::ModernLibs.FileHelpers.BadUsageException($"Expected {__expectedLines} lines for the record but received {lineCount}. Check that all multi-line fields are present.");
        var line = lines;

        char[]? __qRent1 = null;
        try
        {
        // Quote-aware delimited splitting (3.x DelimitedField rules; quotes only in [FieldQuoted] fields).
        global::System.ReadOnlySpan<char> __f0;
        global::System.ReadOnlySpan<char> __qrem1;
        bool __qhas1;
        int __qsSep0 = global::System.MemoryExtensions.IndexOf(line, ',');
        __f0 = __qsSep0 < 0 ? line : line.Slice(0, __qsSep0);
        __qhas1 = __qsSep0 >= 0;
        __qrem1 = __qsSep0 < 0 ? global::System.ReadOnlySpan<char>.Empty : line.Slice(__qsSep0 + 1);
        global::System.ReadOnlySpan<char> __f1;
        bool __fq1 = false;
        int __qsPos1 = 0;
        int __qsLen1 = __qrem1.Length;
        if (__qsPos1 < __qsLen1 && __qrem1[__qsPos1] == '"')
        {
            int __qsStart1 = __qsPos1;
            __qsPos1++;
            while (true)
            {
                int __qsQ1 = global::System.MemoryExtensions.IndexOf(__qrem1.Slice(__qsPos1), '"');
                if (__qsQ1 < 0)
                    throw new global::ModernLibs.FileHelpers.BadUsageException(-1, __Column(lines, __qrem1), "The field 'Name' has an unclosed quoted string. Check that every opening \" has a closing \" (use \"\" for a quote inside the value) or allow multiline values in [FieldQuoted].");
                __qsPos1 += __qsQ1;
                if (__qsPos1 + 1 < __qsLen1 && __qrem1[__qsPos1 + 1] == '"') \{ __qsPos1 += 2; continue; }
                __qsPos1++;
                break;
            }
            __f1 = __qrem1.Slice(__qsStart1, __qsPos1 - __qsStart1);
            __fq1 = true;
        }
        else
        {
            __f1 = __qrem1;
        }

        // [FieldQuoted] strip + unescape for field 'Name'.
        if (__fq1)
        {
            var __qInner1 = __f1.Slice(1, __f1.Length - 2);
            bool __hasDoubled1 = false;
            for (int __si1 = 0; __si1 < __qInner1.Length - 1; __si1++)
            {
                if (__qInner1[__si1] == '"' && __qInner1[__si1 + 1] == '"')
                {
                    __hasDoubled1 = true;
                    break;
                }
            }
            if (!__hasDoubled1)
            {
                __f1 = __qInner1;
            }
            else
            {
                // Rented buffer, returned in the finally block after the value is materialised.
                var __qBuf1 = global::System.Buffers.ArrayPool<char>.Shared.Rent(__qInner1.Length);
                __qRent1 = __qBuf1;
                int __qLen1 = 0;
                for (int __qi1 = 0; __qi1 < __qInner1.Length; __qi1++)
                {
                    char __qc1 = __qInner1[__qi1];
                    if (__qc1 == '"' && __qi1 + 1 < __qInner1.Length && __qInner1[__qi1 + 1] == '"')
                    {
                        __qBuf1[__qLen1++] = '"';
                        __qi1++;
                    }
                    else
                    {
                        __qBuf1[__qLen1++] = __qc1;
                    }
                }
                __f1 = new global::System.ReadOnlySpan<char>(__qBuf1, 0, __qLen1);
            }
        }

        global::System.DateTime __v0;
        if (global::System.MemoryExtensions.IsWhiteSpace(__f0))
            throw __NullValueNotFound(lines, __f0, "DOB");
        else if (__Conv.__conv_field0.TryParse(__f0, out global::System.DateTime __p0))
            __v0 = __p0;
        else
            throw __ConvertError(lines, __f0, typeof(global::System.DateTime), "DOB", null, null);
        string __v1 = new string(__f1);

        existing.DOB = __v0;
        existing.Name = __v1;
        }
        finally
        {
            if (__qRent1 is not null)
                global::System.Buffers.ArrayPool<char>.Shared.Return(__qRent1);
        }
    }

    public void Format(global::SerializerDemo.Person record, global::System.Buffers.IBufferWriter<char> writer)
    {
        {
            global::System.Span<char> __b0 = stackalloc char[64];
            char[]? __r0 = null;
            scoped global::System.ReadOnlySpan<char> __t0;
            __t0 = __Format(__Conv.__conv_field0, record.DOB, __b0, ref __r0);
            __WriteText(writer, __t0);
            if (__r0 is not null)
                global::System.Buffers.ArrayPool<char>.Shared.Return(__r0);
        }
        \{ writer.GetSpan(1)[0] = ','; writer.Advance(1); }
        {
            var __t1 = global::System.MemoryExtensions.AsSpan(record.Name);
            __WriteQuotedField(writer, __t1, '"', true, true, ",", "Name");
        }
    }

    public global::System.ReadOnlySpan<global::ModernLibs.FileHelpers.FieldDescriptor> Fields =>
        new global::System.ReadOnlySpan<global::ModernLibs.FileHelpers.FieldDescriptor>(_fields);

    public global::ModernLibs.FileHelpers.RecordOptions Options =>
        new()
        {
            IgnoreFirst = 0,
            IgnoreLast = 0,
            IgnoreEmptyLines = false,
            CommentMarker = '\0',
            CommentAnyPlace = true,
            Delimiter = ",",
            Condition = (global::ModernLibs.FileHelpers.RecordCondition)0,
            ConditionPattern = "",
            LineCountPerLogicalRecord = 1,
            MultilineMode = (global::ModernLibs.FileHelpers.MultilineMode)0,
            IgnoreEmptySpaces = false,
            QuoteChar = '"',
        };

    public global::SerializerDemo.Person CreateDefaultInstance()
    {
        return new global::SerializerDemo.Person();
    }

    private static readonly global::ModernLibs.FileHelpers.FieldDescriptor[] _fields =
        new global::ModernLibs.FileHelpers.FieldDescriptor[]
        {
            new(nameof(global::SerializerDemo.Person.DOB), typeof(global::System.DateTime), 0, -1, -1, null, false, null, null, false, (global::ModernLibs.FileHelpers.TrimMode)0, '\0', (global::ModernLibs.FileHelpers.MultilineMode)0, null),
            new(nameof(global::SerializerDemo.Person.Name), typeof(string), 1, -1, -1, null, false, null, null, false, (global::ModernLibs.FileHelpers.TrimMode)0, '"', (global::ModernLibs.FileHelpers.MultilineMode)0, null),
        };
}

file static class __PersonRegistration
{
    [global::System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        global::ModernLibs.FileHelpers.FileHelperRegistry<global::SerializerDemo.Person>
            .SetDescriptor(__PersonDescriptor.Instance);
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ModernLibs.FileHelpers ](/sources/ModernLibs.FileHelpers.zip)

:::


### Share ModernLibs.FileHelpers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers&quote=ModernLibs.FileHelpers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers&text=ModernLibs.FileHelpers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers&title=ModernLibs.FileHelpers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers&title=ModernLibs.FileHelpers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FModernLibs.FileHelpers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ModernLibs.FileHelpers

<SameCategory />

