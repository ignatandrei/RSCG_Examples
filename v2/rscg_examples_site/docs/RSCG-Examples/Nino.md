---
sidebar_position: 2180
title: 218 - Nino
description: binary serialization
slug: /Nino
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# Nino  by Jason Xu


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Nino?label=Nino)](https://www.nuget.org/packages/Nino/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JasonXuDeveloper/Nino?label=updated)](https://github.com/JasonXuDeveloper/Nino)
![GitHub Repo stars](https://img.shields.io/github/stars/JasonXuDeveloper/Nino?style=social)

## Details

### Info
:::info

Name: **Nino**

High performance and low size binary serialization solution, especially for Unity.

Author: Jason Xu

NuGet: 
*https://www.nuget.org/packages/Nino/*   


You can find more details at https://github.com/JasonXuDeveloper/Nino

Source: https://github.com/JasonXuDeveloper/Nino

:::

### Author
:::note
Jason Xu 
![Alt text](https:/github.com/JasonXuDeveloper.png)
:::

### Original Readme
:::note

<div align="center">

# Nino

**Ultimate high-performance binary serialization library for C#**

[![Build Status](https://img.shields.io/github/actions/workflow/status/JasonXuDeveloper/Nino/.github/workflows/ci.yml?branch=main&style=flat-square)](https://github.com/JasonXuDeveloper/Nino/actions)
[![License](https://img.shields.io/github/license/JasonXuDeveloper/Nino?style=flat-square)](https://github.com/JasonXuDeveloper/Nino/blob/main/LICENSE)
[![NuGet](https://img.shields.io/nuget/v/Nino?label=NuGet&style=flat-square&logo=nuget)](https://www.nuget.org/packages/Nino)
[![OpenUPM](https://img.shields.io/npm/v/com.jasonxudeveloper.nino?label=OpenUPM&style=flat-square&logo=unity&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.jasonxudeveloper.nino/)

[🌐 **Official Website**](https://nino.xgamedev.net/en/) • [📚 **Documentation**](https://nino.xgamedev.net/en/doc/start) • [🚀 **Performance**](https://nino.xgamedev.net/en/perf/micro) • [🇨🇳 **中文**](README.zh.md)

*Fast, flexible, and effortless C# binary serialization*

</div>

---

## ✨ Why Choose Nino?

<table>
<tr>
<td width="25%" align="center">
  <h3>🔧 Seamless Integration</h3>
  <p>Leverages C# Source Generators for automatic compile-time code generation. Zero manual setup required.</p>
</td>
<td width="25%" align="center">
  <h3>⚡ Blazing Performance</h3>
  <p>Engineered for high-throughput, low-latency scenarios with minimal GC pressure and memory allocation.</p>
</td>
<td width="25%" align="center">
  <h3>🎮 Unity Compatible</h3>
  <p>Works seamlessly with Unity projects and native Unity data types like Vector3 and Quaternion.</p>
</td>
<td width="25%" align="center">
  <h3>🛠️ Advanced Features</h3>
  <p>Handles complex scenarios like polymorphism, versioning, custom constructors, and private member serialization.</p>
</td>
</tr>
</table>

---

## 🎯 Core Features

### 🚀 **Performance & Reliability**
- **High-Speed Serialization**: Consistently ranks among the fastest C# binary serializers
- **Low Memory Footprint**: Minimal GC pressure and memory allocation
- **By-Reference Deserialization**: Deserialize directly into existing objects to eliminate allocation overhead
- **Thread-Safe Operations**: Fully concurrent serialization/deserialization without external locking
- **Data Integrity**: Built-in type checking ensures data consistency

### 🧩 **Comprehensive Type Support**
- **Primitives & Built-ins**: Full support for all C# primitive types (`int`, `float`, `DateTime`, etc.)
- **Modern C# Features**: `records`, `record structs`, `structs`, `classes`, and generics
- **Collections**: Any `IEnumerable<T>` including `List<T>`, `Dictionary<TKey,TValue>`, `HashSet<T>`, `ConcurrentDictionary<TKey,TValue>`
- **Advanced Generics**: Complex nested types like `Dictionary<string, List<CustomType[]>>`
- **Value Types**: `ValueTuple`, `Tuple`, `KeyValuePair<TKey,TValue>`, `Nullable<T>`

### 🎮 **Unity & Cross-Platform**
- **Unity Native Types**: `Vector3`, `Quaternion`, `Matrix4x4`, and other Unity-specific data types
- **Cross-Assembly Support**: Serialize types across different .NET assemblies and projects
- **Platform Agnostic**: Works seamlessly across different .NET implementations

### ⚙️ **Advanced Control**
- **Polymorphism**: Interface and abstract class serialization with type preservation
- **Custom Constructors**: `[NinoConstructor]` for immutable types and factory patterns
- **Versioning & Migration**: `[NinoMember]` ordering and `[NinoFormerName]` for backward compatibility
- **Privacy Control**: `[NinoType(true)]` to include private/protected members
- **Selective Serialization**: `[NinoIgnore]` to exclude specific fields
- **String Optimization**: `[NinoUtf8]` for efficient UTF-8 string handling

---

## 📖 Quick Start

### Installation

**Standard .NET Projects:**
```bash
dotnet add package Nino
```

**Unity Projects (via OpenUPM):**
```bash
openupm add com.jasonxudeveloper.nino
```

### Basic Usage

```csharp
[NinoType]
public class GameData
{
    public int Score;
    public string PlayerName;
    public DateTime LastPlayed;
}

// Serialize
var data = new GameData \{ Score = 1000, PlayerName = "Player1", LastPlayed = DateTime.Now };
byte[] bytes = NinoSerializer.Serialize(data);

// Deserialize
var restored = NinoDeserializer.Deserialize<GameData>(bytes);
```

**[📚 Full Documentation →](https://nino.xgamedev.net/en/doc/start)**

---

## 📊 Performance

Nino consistently delivers exceptional performance across various scenarios. See detailed benchmarks and comparisons with other popular serialization libraries.

**[🚀 View Benchmarks →](https://nino.xgamedev.net/en/perf/micro)**

---

## 🤝 Community & Support

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/JasonXuDeveloper/Nino?style=flat-square)](https://github.com/JasonXuDeveloper/Nino/issues)
[![GitHub Stars](https://img.shields.io/github/stars/JasonXuDeveloper/Nino?style=flat-square)](https://github.com/JasonXuDeveloper/Nino/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/JasonXuDeveloper/Nino?style=flat-square)](https://github.com/JasonXuDeveloper/Nino/network)

**[🐛 Report Issues](https://github.com/JasonXuDeveloper/Nino/issues)** • **[💡 Feature Requests](https://github.com/JasonXuDeveloper/Nino/issues)** • **[🔀 Contribute](https://github.com/JasonXuDeveloper/Nino/pulls)**

</div>

---

<div align="center">

**Made with ❤️ by [JasonXuDeveloper](https://github.com/JasonXuDeveloper)**

*Licensed under [MIT License](LICENSE)*

</div>


:::

### About
:::note

binary serialization


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Nino**
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
	  <PackageReference Include="Nino" Version="4.0.0-beta.15" />
	  <PackageReference Include="Nino.Serialization" Version="4.0.0-beta.15" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\Program.cs" label="Program.cs" >

  This is the use of **Nino** in *Program.cs*

```csharp showLineNumbers 
using Nino.Core;
using SerializerDemo;

var p= new Person() \{ Name= "Andrei Ignat" , Age=55};
var str= NinoSerializer.Serialize(p);
//Console.WriteLine(str);
var entity = NinoDeserializer.Deserialize<Person>(str);
Console.WriteLine("name is "+entity.Name);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\Person.cs" label="Person.cs" >

  This is the use of **Nino** in *Person.cs*

```csharp showLineNumbers 

using Nino.Core;

namespace SerializerDemo;
[NinoType]
public partial class Person
{
    public int Age;

    public string Name = string.Empty;

    
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.Collection.g.cs" label="Serializer.NinoGen.Deserializer.Collection.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669

using System;
using global::Nino.Core;
using System.Buffers;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
#region System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> - Generated by transformer TrivialEnumerableUsingAdd
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
        
            if (!reader.ReadCollectionHeader(out var length))
            {
                value = default;
                return;
            }
        
        #if WEAK_VERSION_TOLERANCE
            Reader eleReader;
        #endif
        
            var lst = new System.Collections.Generic.List<System.Collections.Generic.KeyValuePair<string, object?>>();
            for (int i = 0; i < length; i++)
            {
        #if WEAK_VERSION_TOLERANCE
                eleReader = reader.Slice();
                NinoDeserializer.Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> item, ref eleReader);
        #else
                NinoDeserializer.Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> item, ref reader);
        #endif
                lst.Add(item);
            }
        
            value = lst;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Reader reader) => Deserialize(out value, ref reader);
        
#endregion

#region System.Collections.Generic.KeyValuePair<string, object?> - Generated by transformer KeyValuePair
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out System.Collections.Generic.KeyValuePair<string, object?> value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            NinoDeserializer.Deserialize(out string k, ref reader);
            object v = NinoDeserializer.DeserializeBoxed(ref reader, null);
            value = new System.Collections.Generic.KeyValuePair<string, object?>(k, v);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref System.Collections.Generic.KeyValuePair<string, object?> value, ref Reader reader)
            => Deserialize(out value, ref reader);
        
#endregion

#region byte[] - Generated by transformer Array
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out byte[] value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out byte[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref byte[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.ReadRef(ref value);
        }
        
#endregion

#region int[] - Generated by transformer Array
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out int[] value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out int[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref int[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.ReadRef(ref value);
        }
        
#endregion

#region long? - Generated by transformer Nullable
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out long? value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out long? value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out bool hasValue);
            if (!hasValue)
            {
                value = default;
                return;
            }
        
            reader.UnsafeRead(out long ret);
            value = ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref long? value, ref Reader reader) => Deserialize(out value, ref reader);
        
#endregion

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.g.cs" label="Serializer.NinoGen.Deserializer.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out string value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
             if (reader.Eof)
             {
                value = default;
                return;
             }
        #endif
            
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref string value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
             if (reader.Eof)
             {
                value = default;
                return;
             }
        #endif
            
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out string value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }



        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeImpl(out SerializerDemo.Person value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
           if (reader.Eof)
           {
              value = default;
              return;
           }
        #endif
            reader.Read(out int typeId);
            if(typeId == TypeCollector.Null)
            {
                value = default;
                return;
            }
            else if(typeId != NinoTypeConst.SerializerDemo_Person)
                throw new InvalidOperationException("Invalid type id");

            value = new SerializerDemo.Person();
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.UnsafeRead(out value.Age);
#else
            reader.UnsafeRead(out value.Age);
#endif
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.Read(out value.Name);
#else
            reader.Read(out value.Name);
#endif
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeImplRef(ref SerializerDemo.Person value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
           if (reader.Eof)
           {
              value = default;
              return;
           }
        #endif
            if (Unsafe.IsNullRef(ref value))
            {
                DeserializeImpl(out value, ref reader);
                return;
            }

            reader.Read(out int typeId);
            if(typeId == TypeCollector.Null)
            {
                value = default;
                return;
            }
            else if(typeId != NinoTypeConst.SerializerDemo_Person)
                throw new InvalidOperationException("Invalid type id");

#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.UnsafeRead(out value.Age);
#else
            reader.UnsafeRead(out value.Age);
#endif
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.Read(out value.Name);
#else
            reader.Read(out value.Name);
#endif
        }


    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.Generic.g.cs" label="Serializer.NinoGen.Deserializer.Generic.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
        private static bool _initialized;
        private static object _lock = new object();
        
        static Deserializer()
        {
            Init();
        }
        
    #if NET5_0_OR_GREATER
        [ModuleInitializer]
    #endif
        public static void Init()
        {
            lock (_lock)
            {
                if (_initialized)
                    return;
                    
                RegisterTrivialDeserializers();
                RegisterCollectionDeserializers();
                _initialized = true;
            }
        }
        
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
    
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
    
        private static void RegisterCollectionDeserializers()
        {
            NinoTypeMetadata.RegisterDeserializer<System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>>>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<System.Collections.Generic.KeyValuePair<string, object?>>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<byte[]>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<int[]>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<long?>(Deserialize, DeserializeRef, false);
        }
        private static void RegisterTrivialDeserializers()
        {
            NinoTypeMetadata.RegisterDeserializer<SerializerDemo.Person>(DeserializeImpl, DeserializeImplRef, false);
            NinoTypeMetadata.RegisterDeserializer<string>(Deserialize, DeserializeRef, false);
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Graph.g.cs" label="Serializer.NinoGen.Graph.g.cs" >


```csharp showLineNumbers 
/*
Base Types:

Sub Types:

Top Types:
SerializerDemo.Person

Circular Types:


*/
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.PartialClass.g.cs" label="Serializer.NinoGen.PartialClass.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS0109, CS8669
using System;
using System.Runtime.CompilerServices;


```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.PrivateAccessor.g.cs" label="Serializer.NinoGen.PrivateAccessor.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Runtime.CompilerServices;

#if NET8_0_OR_GREATER
namespace Serializer.NinoGen
{
    internal static partial class PrivateAccessor
    {
    }
}
#endif
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.Collection.g.cs" label="Serializer.NinoGen.Serializer.Collection.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669

using System;
using global::Nino.Core;
using System.Buffers;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
#region System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> - Generated by transformer TrivialEnumerable

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Writer writer)
        {
            if (value == null)
            {
                writer.Write(TypeCollector.NullCollection);
                return;
            }
        
            var serializer_1388A30A = CachedSerializer<System.Collections.Generic.KeyValuePair<string, object?>>.Instance;
        
            int cnt = 0;
            int oldPos = writer.Advance(4);
        
            foreach (var item in value)
            {
                cnt++;
        #if WEAK_VERSION_TOLERANCE
                var pos = writer.Advance(4);
        #endif
                serializer_1388A30A.Serialize(item, ref writer);
        #if WEAK_VERSION_TOLERANCE
                writer.PutLength(pos);
        #endif
            }
        
            writer.PutBack(TypeCollector.GetCollectionHeader(cnt), oldPos);
        }
        
#endregion

#region System.Collections.Generic.KeyValuePair<string, object?> - Generated by transformer KeyValuePair

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value, ref Writer writer)
        {
            var serializer_C55A10A5 = CachedSerializer<string>.Instance;
            var serializer_7A439E91 = CachedSerializer<object>.Instance;
        
            serializer_C55A10A5.Serialize(value.Key, ref writer);
            NinoSerializer.SerializeBoxed(value.Value, ref writer, value.Value?.GetType());
        }
        
#endregion

#region byte[] - Generated by transformer Array

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this byte[] value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this byte[] value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this byte[] value, ref Writer writer)
        {
            writer.Write(value);
        }
        
#endregion

#region int[] - Generated by transformer Array

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this int[] value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this int[] value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this int[] value, ref Writer writer)
        {
            writer.Write(value);
        }
        
#endregion

#region long? - Generated by transformer Nullable

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this long? value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this long? value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this long? value, ref Writer writer)
        {
            if (!value.HasValue)
            {
                writer.Write(false);
                return;
            }
        
            writer.Write(true);
            writer.Write(value.Value);
        }
        
#endregion

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.g.cs" label="Serializer.NinoGen.Serializer.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Buffers;
using System.Threading;
using global::Nino.Core;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
        private static readonly ConcurrentQueue<NinoArrayBufferWriter> BufferWriters = new();
        private static readonly NinoArrayBufferWriter DefaultBufferWriter = new NinoArrayBufferWriter(1024);
        private static int _defaultUsed;

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static NinoArrayBufferWriter GetBufferWriter()
        {
            // Fast path
            if (Interlocked.CompareExchange(ref _defaultUsed, 1, 0) == 0)
            {
                return DefaultBufferWriter;
            }

            if (BufferWriters.Count == 0)
            {
                return new NinoArrayBufferWriter(1024);
            }

            if (BufferWriters.TryDequeue(out var bufferWriter))
            {
                return bufferWriter;
            }

            return new NinoArrayBufferWriter(1024);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void ReturnBufferWriter(NinoArrayBufferWriter bufferWriter)
        {
#if NET8_0_OR_GREATER
            bufferWriter.ResetWrittenCount();
#else
            bufferWriter.Clear();
#endif
            // Check if the buffer writer is the default buffer writer
            if (bufferWriter == DefaultBufferWriter)
            {
                // Ensure it is in use, otherwise throw an exception
                if (Interlocked.CompareExchange(ref _defaultUsed, 0, 1) == 0)
                {
                    throw new InvalidOperationException("The returned buffer writer is not in use.");
                }

                return;
            }

            BufferWriters.Enqueue(bufferWriter);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(bool value)
        {
            if (value)
                return new byte[1] \{ 1 };
           
            return new byte[1] \{ 0 };
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(byte value)
        {
            return new byte[1] \{ value };
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(string value, ref Writer writer) 
        {
            writer.Write(value);
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this string value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this string value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void SerializeImpl(SerializerDemo.Person value, ref Writer writer)
        {
            if(value == null)
            {
                writer.Write(TypeCollector.Null);
                return;
            }

            writer.Write(NinoTypeConst.SerializerDemo_Person);
            writer.Write(value.Age);
            writer.Write(value.Name);
        }

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.Generic.g.cs" label="Serializer.NinoGen.Serializer.Generic.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
        static Serializer()
        {
            Init();
        }
        
        private static bool _initialized;
        private static object _lock = new object();
        

        #if NET5_0_OR_GREATER
            [ModuleInitializer]
        #endif
        public static void Init()
        {
            lock (_lock)
            {
                if (_initialized)
                    return;
                    
                RegisterTrivialSerializers();
                RegisterCollectionSerializers();
                _initialized = true;
            }
        }
        
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
    
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
        
        private static void RegisterCollectionSerializers()
        {
            NinoTypeMetadata.RegisterSerializer<System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>>>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<System.Collections.Generic.KeyValuePair<string, object?>>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<byte[]>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<int[]>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<long?>(Serialize, false);
        }

        private static void RegisterTrivialSerializers()
        {
            NinoTypeMetadata.RegisterSerializer<SerializerDemo.Person>(SerializeImpl, false);
            NinoTypeMetadata.RegisterSerializer<string>(Serialize, false);
        }

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.TypeConst.g.cs" label="Serializer.NinoGen.TypeConst.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using Nino.Core;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static class NinoTypeConst
    {
        private static bool _initialized;
        private static object _lock = new object();
       
        static NinoTypeConst()
        {
            Init();
        }
               
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
   
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
       
    #if NET5_0_OR_GREATER
        [ModuleInitializer]
    #endif
		public static void Init()
		{
			lock (_lock)
			{
				if (_initialized)
					return;
				_initialized = true;

				NinoTypeMetadata.RegisterType<global::SerializerDemo.Person>(SerializerDemo_Person);
			}
		}

		// global::SerializerDemo.Person
		public const int SerializerDemo_Person = 192498207;

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Nino\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Types.g.cs" label="Serializer.NinoGen.Types.g.cs" >


```csharp showLineNumbers 
/*
Type: SerializerDemo.Person
Parents:
Members:
	int Age [Ctor: False, Private: False, Property: False, Utf8String: False]
	string Name [Ctor: False, Private: False, Property: False, Utf8String: False]

*/
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Nino ](/sources/Nino.zip)

:::


### Share Nino 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino&quote=Nino" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino&text=Nino:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino&title=Nino" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino&title=Nino&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNino" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Nino

aaa
<SameCategory />

