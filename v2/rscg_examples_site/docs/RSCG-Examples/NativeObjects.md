---
sidebar_position: 1930
title: 193 - NativeObjects
description: Object to IntPtr and back
slug: /NativeObjects
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveWinAPI.mdx';

# NativeObjects  by Kevin Gosse


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/NativeObjects?label=NativeObjects)](https://www.nuget.org/packages/NativeObjects/)
[![GitHub last commit](https://img.shields.io/github/last-commit/kevingosse/NativeObjects?label=updated)](https://github.com/kevingosse/NativeObjects)
![GitHub Repo stars](https://img.shields.io/github/stars/kevingosse/NativeObjects?style=social)

## Details

### Info
:::info

Name: **NativeObjects**

Source generator for native interop.
      Generates implementation for interfaces to expose managed objects as COM-like, or call methods on COM-like native objects.

Author: Kevin Gosse

NuGet: 
*https://www.nuget.org/packages/NativeObjects/*   


You can find more details at https://github.com/kevingosse/NativeObjects

Source: https://github.com/kevingosse/NativeObjects

:::

### Original Readme
:::note

# NativeObjects

Source-generator for easier native interop.

It provides two core features:
- Ability to consume COM-like native objects
- Ability to expose managed objects as COM-like native objects

# Usage

**Remember to enable unsafe on your project when referencing this source-generator**

```xml
<PropertyGroup>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

Declare the interface you want to consume or expose, and decorate it with the [NativeObject] attribute:

```csharp

[NativeObject]
public interface ICalculator
{
    int Add(int value1, int value2);
}
```

**The order of the methods is used to build the vtable. Therefore you MUST declare the methods in your interface in the same order as the native object.**

From there, you can consume a native object that implements this interface:

```csharp
public int DoSomething(IntPtr nativePtr)
{
    var calc = NativeObjects.ICalculator.Wrap(nativePtr);

    return calc.Add(2, 3);
}
```

Or implement that interface then expose the managed object to native code:

```csharp
public class MyCalculator : ICalculator
{
    public int Add(int value1, int value2)
    {
        return value1 + value2;
    }
}

var calculator = new MyCalculator();
using (var nativeCalculator = NativeObjects.ICalculator.Wrap(calculator))
{
    // nativeCalculator can be implicitly cast to IntPtr
    // This is equivalent to calling nativeCalculator.Object
    SomeNativeCode((IntPtr)nativeCalculator);
}
```

The generated objects have the same visibility as the interface. For instance, if the interface is declared as internal, the generated objects will be internal.

# Namespace

By default, the interop types are emitted in the NativeObjects namespace. You can change it by adding an attribute at the assembly level:

```csharp
[assembly: NativeObjectsNamespace("MyNamespace")]
```


:::

### About
:::note

Object to IntPtr and back


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NativeObjects**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
		<AllowUnsafeBlocks>true</AllowUnsafeBlocks>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="NativeObjects" Version="1.3.0" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NativeObjects\src\NativeObjectsDemo\Program.cs" label="Program.cs" >

  This is the use of **NativeObjects** in *Program.cs*

```csharp showLineNumbers 
using NativeObjectsDemo;
Person p = new Person();

p.DateOfBirth= new DateTime(1970,4,16);
using (var nativ = NativeObjects.IPerson.Wrap(p))
{
    SomeNativeCode((IntPtr)nativ.Object);
}

static void SomeNativeCode(IntPtr nativePerson)
{
    var p = NativeObjects.IPerson.Wrap(nativePerson);
    Console.WriteLine($"Age: {p.CalculateAge()}");

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NativeObjects\src\NativeObjectsDemo\Person.cs" label="Person.cs" >

  This is the use of **NativeObjects** in *Person.cs*

```csharp showLineNumbers 
namespace NativeObjectsDemo;
[NativeObject]
public interface IPerson
{
    public int CalculateAge();
}
class Person : IPerson
{
    public DateTime DateOfBirth { get; set; }

    public int CalculateAge()
    {

        return (int)DateTime.Now.Subtract(DateOfBirth).TotalDays / 365;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NativeObjects\src\NativeObjectsDemo\obj\GX\NativeObjects\NativeObjectGenerator.NativeObjectGenerator\NativeObjectAttribute.g.cs" label="NativeObjectAttribute.g.cs" >


```csharp showLineNumbers 
using System;

[AttributeUsage(AttributeTargets.Interface, Inherited = false, AllowMultiple = false)]
internal class NativeObjectAttribute : Attribute { }

[AttributeUsage(AttributeTargets.Assembly, Inherited = false, AllowMultiple = false)]
internal class NativeObjectsNamespaceAttribute : Attribute
{
    public NativeObjectsNamespaceAttribute(string name) { }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NativeObjects\src\NativeObjectsDemo\obj\GX\NativeObjects\NativeObjectGenerator.NativeObjectGenerator\NativeObjectsDemo.IPerson.g.cs" label="NativeObjectsDemo.IPerson.g.cs" >


```csharp showLineNumbers 
namespace NativeObjects
{
    
    using System;
    using System.Runtime.CompilerServices;
    using System.Runtime.InteropServices;

    public unsafe class IPerson : IDisposable
    {
        private IPerson(NativeObjectsDemo.IPerson implementation)
        {
            const int delegateCount = 1;

            var vtable = (IntPtr*)NativeMemory.Alloc((nuint)delegateCount, (nuint)IntPtr.Size);

            *(vtable + 0) = (IntPtr)(delegate* unmanaged<IntPtr*, int>)&Exports.CalculateAge;


            var obj = (IntPtr*)NativeMemory.Alloc((nuint)2, (nuint)IntPtr.Size);
            *obj = (IntPtr)vtable;

            var handle = GCHandle.Alloc(implementation);
            *(obj + 1) = GCHandle.ToIntPtr(handle);

            Object = (IntPtr)obj;
        }

        public IntPtr Object { get; private set; }

        public static IPerson Wrap(NativeObjectsDemo.IPerson implementation) => new(implementation);

        public static IPersonInvoker Wrap(IntPtr ptr) => new(ptr);

        public static implicit operator IntPtr(IPerson stub) => stub.Object;

        public void Dispose()
        {
            if (Object != IntPtr.Zero)
            {
                var target = (void**)Object;
                NativeMemory.Free(*target);
                NativeMemory.Free(target);
                Object = IntPtr.Zero;
            }
        }

        private static class Exports
        {
            [UnmanagedCallersOnly]
            public static int CalculateAge(IntPtr* self)
            {
                var handle = GCHandle.FromIntPtr(*(self + 1));
                var obj = (NativeObjectsDemo.IPerson)handle.Target;
                var result = obj.CalculateAge();
                return result;
            }



        }
    }

    public unsafe struct IPersonInvoker
    {
        private readonly IntPtr _implementation;

        public IPersonInvoker(IntPtr implementation)
        {
            _implementation = implementation;
        }

        public static implicit operator IntPtr(IPersonInvoker invoker) => invoker._implementation;

        private nint* VTable => (nint*)*(nint*)_implementation;

        public  int CalculateAge()
        {
            var __func__ = (delegate* unmanaged[Stdcall]<IntPtr,  int>)*(VTable + 0);
            return  __func__(_implementation);
        }
 
    }

}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project NativeObjects ](/sources/NativeObjects.zip)

:::


### Share NativeObjects 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects&quote=NativeObjects" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects&text=NativeObjects:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects&title=NativeObjects" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects&title=NativeObjects&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNativeObjects" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NativeObjects

aaa
<SameCategory />

