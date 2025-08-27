# StackXML
Stack based zero*-allocation XML serializer and deserializer powered by C# 9 source generators.

## Why
Premature optimisation :)

## Setup
- From Nuget
  - https://www.nuget.org/packages/StackXML

- As a submodule
  - Add the following to your project to reference the serializer and enable the source generator
```xml
<ItemGroup>
    <ProjectReference Include="..\StackXML\StackXML\StackXML.csproj" />
    <ProjectReference Include="..\StackXML\StackXML.Generator\StackXML.Generator.csproj" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
```

## Usage
- The common entrypoint for deserializing is `XmlReadBuffer.ReadStatic(ReadOnlySpan<char>)`
- The common entrypoint for serializing is `XmlWriteBuffer.SerializeStatic(IXmlSerializable)`
  - This method returns a string, to avoid this allocation you will need create your own instance of XmlWriteBuffer and ensure it is disposed safely like `SerializeStatic` does. The `ToSpan` method returns the char span containing the serialized text

## Features
- Fully structured XML serialization and deserialization with 0 allocations, apart from the output data structure when deserializing. Serialization uses a pooled buffer from `ArrayPool<char>.Shared` that is released when the serializer is disposed.
  - `XmlReadBuffer` handles deserialization
  - `XmlWriteBuffer` handles serialization
  - `XmlCls` maps a type to an element
    - Used for the serializer to know what the element name should be
    - Used by the deserializer to map to IXmlSerializable bodies with no explicit name
  - `XmlField` maps to attributes
  - `XmlBody` maps to child elements
  - `IXmlSerializable` (not actually an interface, see quirks) represents a type that can be read from or written to XML
    - Can be manually added as a base, or the source generator will add it automatically to any type that has XML attributes
- Parsing delimited attributes into typed lists
  - `<test list='1,2,3,4,6,7,8,9'>`
  - `[XmlField("list")] [XmlSplitStr(',')] public List<int> m_list;`
  - Using StrReader and StrWriter, see below
- StrReader and StrWriter classes, for reading and writing (comma usually) delimited strings with 0 allocations.
  - Can be used in a fully structured way by adding `StrField` attributes to fields on a `ref partial struct` (not compatible with XmlSplitStr, maybe future consideration)
- Agnostic logging through [LibLog](https://github.com/damianh/LibLog)

## Quirks
- Invalid data inside or between elements is ignored
  - `<int>0<this still deserializes as zero with no errors</int>`
  - `<test>anything here is completely missed<testInner/><test/>`
- Spaces between attributes is not required by the deserializer
  - e.g `<test one='aa'two='bb'>` 
- XmlSerializer must be disposed otherwise the pooled buffer will be leaked.
  - XmlSerializer.SerializeStatic gives of an example of how this should be done in a safe way
- ~~Data types can only be classes, not structs.~~
  - ~~All types must inherit from IXmlSerializable (either manually or added by the source generator) which is actually an abstract class and not an interface~~
  - ~~Using structs would be possible but I don't think its worth the box~~
- ~~Types from another assembly can't be used as a field/body. Needs fixing~~
- All elements in the data to parse must be defined in the type in one way or another, otherwise an exception will be thrown.
  - The deserializer relies on complete parsing and has no way of skipping elements
- Comments within a primitive type body will cause the parser to crash (future consideration...)
  - `<n><!--uh oh-->hi<n>`
- Null strings are currently output exactly the same as empty strings... might need changing
- The source generator emits a parameterless constructor on all XML types that initializes `List<T>` bodies to an empty list
  - Trying to serialize a null list currently crashes the serializer....
- When decoding XML text an extra allocation of the input string is required
  - WebUtility.HtmlDecode does not provide an overload taking a span, but the method taking a string turns it into a span anyway.. hmm
  - The decode is avoided where possible
- Would be nice to be able to use [ValueStringBuilder](https://github.com/dotnet/runtime/blob/master/src/libraries/Common/src/System/Text/ValueStringBuilder.cs). See https://github.com/dotnet/runtime/issues/25587

## Performance
Very simple benchmark, loading a single element and getting the string value of its attribute `attribute`
``` ini

BenchmarkDotNet=v0.13.0, OS=Windows 10.0.19045
Intel Core i5-6600K CPU 3.50GHz (Skylake), 1 CPU, 4 logical and 4 physical cores
.NET SDK=9.0.200
  [Host]     : .NET 9.0.2 (9.0.225.6610), X64 RyuJIT
  DefaultJob : .NET 9.0.2 (9.0.225.6610), X64 RyuJIT
```
|        Method |        Mean |     Error |    StdDev |  Ratio | RatioSD |  Gen 0 | Gen 1 | Gen 2 | Allocated |
|-------------- |------------:|----------:|----------:|-------:|--------:|-------:|------:|------:|----------:|
|    ReadBuffer |    60.16 ns |  0.791 ns |  0.740 ns |   1.00 |    0.00 | 0.0178 |     - |     - |      56 B |
|    XmlReader_ |   823.91 ns |  6.864 ns |  6.421 ns |  13.70 |    0.23 | 3.2892 |     - |     - |  10,336 B |
|    XDocument_ | 1,047.87 ns | 17.032 ns | 15.931 ns |  17.42 |    0.27 | 3.4218 |     - |     - |  10,760 B |
|   XmlDocument | 1,435.48 ns | 15.425 ns | 14.428 ns |  23.87 |    0.43 | 3.9063 |     - |     - |  12,248 B |
| XmlSerializer | 6,398.11 ns | 88.037 ns | 82.350 ns | 106.37 |    2.14 | 4.5471 |     - |     - |  14,305 B |

## Example data classes
### Simple Attribute
```xml
<test attribute='value'/>
```
```csharp
[XmlCls("test"))]
public partial class Test
{
    [XmlField("attribute")]
    public string m_attribute;
}
```
### Text body
```xml
<test2>
    <name><![CDATA[Hello world]]></name>
</test2>
```
CData can be configured by setting `cdataMode` for serializing and deserializing
```xml
<test2>
    <name>Hello world</name>
</test2>
```
```csharp
[XmlCls("test2"))]
public partial class Test2
{
    [XmlBody("name")]
    public string m_name;
}
```
### Lists
```xml
<container>
    <listItem name="hey" age='25'/>
    <listItem name="how" age='2'/>
    <listItem name="are" age='4'/>
    <listItem name="you" age='53'/>
</container>
```
```csharp
[XmlCls("listItem"))]
public partial class ListItem
{
    [XmlField("name")]
    public string m_name;
    
    [XmlField("age")]
    public int m_age; // could also be byte, uint etc
}

[XmlCls("container")]
public partial class ListContainer
{
    [XmlBody()]
    public List<ListItem> m_items; // no explicit name, is taken from XmlCls
}
```
### Delimited attributes
```xml
<musicTrack id='5' artists='5,6,1,24,535'>
    <n><![CDATA[Awesome music]]></n>
    <tags>cool</tags>
    <tags>awesome</tags>
    <tags>fresh</tags>
</musicTrack>
```
```csharp
[XmlCls("musicTrack"))]
public partial class MusicTrack
{
    [XmlField("id")]
    public int m_id;
    
    [XmlBody("n")]
    public string m_name;
    
    [XmlField("artists"), XmlSplitStr(',')]
    public List<int> m_artists;
    
    [XmlBody("tags")]
    public List<string> m_tags;
}
```