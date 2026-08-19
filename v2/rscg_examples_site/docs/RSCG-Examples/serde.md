---
sidebar_position: 2800
title: 280 - serde
description: Serializing in SERDE format
slug: /serde
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# serde  by Andy Gocke


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/serde?label=serde)](https://www.nuget.org/packages/serde/)
[![GitHub last commit](https://img.shields.io/github/last-commit/serdedotnet/serde?label=updated)](https://github.com/serdedotnet/serde)
![GitHub Repo stars](https://img.shields.io/github/stars/serdedotnet/serde?style=social)

## Details

### Info
:::info

Name: **serde**

Package Description

Author: Andy Gocke

NuGet: 
*https://www.nuget.org/packages/serde/*   


You can find more details at https://github.com/serdedotnet/serde

Source: https://github.com/serdedotnet/serde

:::

### Author
:::note
Andy Gocke 
![Alt text](https://github.com/serdedotnet.png)
:::

## Original Readme
:::note

### Serde.NET

Serde.NET is a port of the popular [serde.rs](https://serde.rs) Rust ***ser***ialization/***de***serialization
library to .NET.

For an overview, see [Overview](https://serdedotnet.github.io/overview.html).

Start by adding the `serde` NuGet package:

```bash
dotnet add package serde
```

To generate serialization/deserialization info for a type, now do the following:
1. Mark the type partial
2. Add the `[GenerateSerde]` attribute


```csharp
using Serde;
using Serde.Json;

string output = JsonSerializer.Serialize(new SampleClass());

// prints: {"X":3,"Y":"sample"}
Console.WriteLine(output);

var deserialized = JsonSerializer.Deserialize<SampleClass>(output);

// prints SampleClass \{ X = 3, Y = sample }
Console.WriteLine(deserialized);

[GenerateSerde]
partial record SampleClass
{
    // automatically includes public properties and fields
    public int X \{ get; init; \} = 3;
    public string Y = "sample";
}
```


:::

### About
:::note

Serializing in SERDE format


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **serde**
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
	  <PackageReference Include="Serde" Version="0.17.1" />
	</ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\serde\src\Serializer\Program.cs" label="Program.cs" >

  This is the use of **serde** in *Program.cs*

```csharp showLineNumbers 
using Serde.Json;
using SerializerDemo;

Person p = new () \{ Name= "Andrei Ignat" , Age=55};
var utf8= JsonSerializer.Serialize<Person>(p);
Console.WriteLine(utf8);
var p1 = JsonSerializer.Deserialize<Person>(utf8);
Console.WriteLine(p.Name);
Console.WriteLine(p1.Age);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\serde\src\Serializer\Person.cs" label="Person.cs" >

  This is the use of **serde** in *Person.cs*

```csharp showLineNumbers 

using Serde;

namespace SerializerDemo;

[GenerateSerde]
public partial class Person 
{
    public int Age \{ get; set; }
    public string Name \{ get; set; \} = string.Empty;

}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\serde\src\Serializer\obj\GX\SerdeGenerator\Serde.SerdeImplRoslynGenerator\SerializerDemo.Person.ISerde.g.cs" label="SerializerDemo.Person.ISerde.g.cs" >
```csharp showLineNumbers 

#nullable enable

using System;
using Serde;

namespace SerializerDemo;

partial class Person
{
    sealed partial class _SerdeObj : global::Serde.ISerde<SerializerDemo.Person>
    {
        global::Serde.ISerdeInfo global::Serde.ISerdeInfoProvider.SerdeInfo => SerializerDemo.Person.s_serdeInfo;

        void global::Serde.ISerialize<SerializerDemo.Person>.Serialize(SerializerDemo.Person value, global::Serde.ISerializer serializer)
        {
            var _l_info = global::Serde.SerdeInfoProvider.GetInfo(this);
            var _l_type = serializer.WriteType(_l_info, 2);
            _l_type.WriteI32(_l_info, 0, value.Age);
            _l_type.WriteString(_l_info, 1, value.Name);
            _l_type.End(_l_info);
        }
        SerializerDemo.Person Serde.IDeserialize<SerializerDemo.Person>.Deserialize(IDeserializer deserializer)
        {
            int _l_age = default!;
            string _l_name = string.Empty;

            byte _r_assignedValid = 0;

            var _l_serdeInfo = global::Serde.SerdeInfoProvider.GetInfo(this);
            var typeDeserialize = deserializer.ReadType(_l_serdeInfo);
            while (true)
            {
                var (_l_index_, _) = typeDeserialize.TryReadIndexWithName(_l_serdeInfo);
                if (_l_index_ == Serde.ITypeDeserializer.EndOfType)
                {
                    break;
                }

                switch (_l_index_)
                {
                    case 0:
                        Serde.DeserializeException.ThrowIfDuplicate(_r_assignedValid, 0, _l_serdeInfo);
                        _l_age = typeDeserialize.ReadI32(_l_serdeInfo, _l_index_);
                        _r_assignedValid |= ((byte)1) << 0;
                        break;
                    case 1:
                        Serde.DeserializeException.ThrowIfDuplicate(_r_assignedValid, 1, _l_serdeInfo);
                        _l_name = typeDeserialize.ReadString(_l_serdeInfo, _l_index_);
                        _r_assignedValid |= ((byte)1) << 1;
                        break;
                    case Serde.ITypeDeserializer.IndexNotFound:
                        typeDeserialize.SkipValue(_l_serdeInfo, _l_index_);
                        break;
                    default:
                        throw new InvalidOperationException("Unexpected index: " + _l_index_);
                }
            }
            typeDeserialize.End(_l_serdeInfo);
            if ((_r_assignedValid & 0b1) != 0b1)
            {
                throw Serde.DeserializeException.UnassignedMember();
            }
            var newType = new SerializerDemo.Person() {
                Age = _l_age,
                Name = _l_name,
            };

            return newType;
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\serde\src\Serializer\obj\GX\SerdeGenerator\Serde.SerdeImplRoslynGenerator\SerializerDemo.Person.ISerdeInfoProvider.g.cs" label="SerializerDemo.Person.ISerdeInfoProvider.g.cs" >
```csharp showLineNumbers 

#nullable enable

namespace SerializerDemo;

partial class Person
{
    private static global::Serde.ISerdeInfo s_serdeInfo = Serde.SerdeInfo.MakeCustom(
        "Person",
        typeof(SerializerDemo.Person).GetCustomAttributesData(),
        new global::Serde.SerdeInfo.FieldInfo[] {
            new("age", global::Serde.SerdeInfoProvider.GetSerializeInfo<int, global::Serde.I32Proxy>()),
            new("name", global::Serde.SerdeInfoProvider.GetSerializeInfo<string, global::Serde.StringProxy>())
        }
    );
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\serde\src\Serializer\obj\GX\SerdeGenerator\Serde.SerdeImplRoslynGenerator\SerializerDemo.Person.ISerdeProvider.g.cs" label="SerializerDemo.Person.ISerdeProvider.g.cs" >
```csharp showLineNumbers 

namespace SerializerDemo;

partial class Person : Serde.ISerdeProvider<SerializerDemo.Person, SerializerDemo.Person._SerdeObj, SerializerDemo.Person>
{
    static SerializerDemo.Person._SerdeObj global::Serde.ISerdeProvider<SerializerDemo.Person, SerializerDemo.Person._SerdeObj, SerializerDemo.Person>.Instance \{ get; }
        = new SerializerDemo.Person._SerdeObj();
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project serde ](/sources/serde.zip)

:::


### Share serde 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde&quote=serde" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde&text=serde:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde&title=serde" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde&title=serde&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fserde" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/serde

<SameCategory />

