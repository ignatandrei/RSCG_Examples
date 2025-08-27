---
sidebar_position: 750
title: 75 - StaticReflection
description: Call prop/methods on classes  
slug: /StaticReflection
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementClass.mdx';

# StaticReflection  by Cricle


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/FastStaticReflection?label=FastStaticReflection)](https://www.nuget.org/packages/FastStaticReflection/)[![Nuget](https://img.shields.io/nuget/dt/FastStaticReflection.CodeGen?label=FastStaticReflection.CodeGen)](https://www.nuget.org/packages/FastStaticReflection.CodeGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Cricle/StaticReflection?label=updated)](https://github.com/Cricle/StaticReflection/)
![GitHub Repo stars](https://img.shields.io/github/stars/Cricle/StaticReflection?style=social)

## Details

### Info
:::info

Name: **StaticReflection**

Use roslyn to make relection static, autogen code for type reflection

Author: Cricle

NuGet: 
*https://www.nuget.org/packages/FastStaticReflection/*   

*https://www.nuget.org/packages/FastStaticReflection.CodeGen/*   


You can find more details at https://github.com/Cricle/StaticReflection/

Source: https://github.com/Cricle/StaticReflection/

:::

### Original Readme
:::note

<h2 align="center">
StaticReflection
</h2>

<h3 align="center">
A fast, easy, scalable static reflection.
</h3>


## Fast use

* Install from nuget `FastStaticReflection`, `FastStaticReflection.CodeGen`

* Write assembly class

```csharp
[StaticReflectionAssembly]//for generate assembly code
public partial class C
{
}
```

* Tag static type reflection

```csharp
//You can Tag at assembly
[assembly: StaticReflection(Type = typeof(StaticReflection.Sample.A))]

//Or Property
[StaticReflection]
[StaticReflection(Type =typeof(B))]
public A a { get; set; }

//Or class
[StaticReflection]
public class A
{
    //....
}
```

* For use

```csharp
internal class Program
{
    static void Main(string[] args)
    {
        var b=new Student();
        var @class=C.Default.Types.First(x => x.Name == "Student");
        @class.SetProperty(b, "Id", 1);//Reflection get property value
        Console.WriteLine("Id: "+@class.GetProperty(b, "Id"));//Reflection set property value
        var @event = (IEventTransfer)@class.Events.First(x => x.Name == "AlreadyGoSchool");
        using (var eventScope = @event.CreateScope(b))
        {
            eventScope.Start();
            eventScope.EventTransfed += Instance_EventTransfed;//Reflection listen event
            var method = @class.Methods.First(x => x.Name == "GoToSchool");
            Console.WriteLine("GoToSchool:" + method.InvokeUsualMethod(b));//Reflection call method
        }
        var obj = @class.Constructors.First(x => x.ArgumentTypes.Count == 0);
        var inst = obj.InvokeUsualMethod(null);//Reflection create object
        Console.WriteLine(inst);
    }

    private static void Instance_EventTransfed(object? sender, EventTransferEventArgs e)
    {
        Console.WriteLine("EventRaise: " + e.Args[0]);
    }
}
[StaticReflection]
public record class Student
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public event EventHandler<Student>? AlreadyGoSchool;

    public int GoToSchool()
    {
        AlreadyGoSchool?.Invoke(this, this);
        return Id;
    }
}
[StaticReflectionAssembly]
public partial class C
{
}

```

## Benchmarks

[Benchmarks](https://github.com/Cricle/StaticReflection//blob/main/test/Benchmarks.md)

:::

### About
:::note

Call prop/methods on classes  


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **StaticReflection**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="FastStaticReflection" Version="1.0.0-preview.3" />
    <PackageReference Include="FastStaticReflection.CodeGen" Version="1.0.0-preview.3" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StaticReflection\src\StaticReflectionDemo\Program.cs" label="Program.cs" >

  This is the use of **StaticReflection** in *Program.cs*

```csharp showLineNumbers 
using StaticReflection;
using StaticReflectionDemo;

var p = new Person();

PersonReflection.Instance.SetProperty(p, "FirstName","Andrei");
PersonReflection.Instance.SetProperty(p, "LastName", "Ignat");

Console.WriteLine(p.Name());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StaticReflection\src\StaticReflectionDemo\Person.cs" label="Person.cs" >

  This is the use of **StaticReflection** in *Person.cs*

```csharp showLineNumbers 
using StaticReflection.Annotions;

namespace StaticReflectionDemo;
[StaticReflection]
internal partial class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name()
    {
        return $"{FirstName} {LastName}";
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StaticReflection\src\StaticReflectionDemo\obj\GX\StaticReflection.CodeGen\StaticReflection.CodeGen.Generators.StaticReflectionGenerator\PersonReflection.g.cs" label="PersonReflection.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS9082
#pragma warning disable CS8669
namespace StaticReflectionDemo
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]
    [global::System.Diagnostics.DebuggerStepThrough]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    internal sealed class PersonReflection : StaticReflection.ITypeDefine
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]
        [global::System.Diagnostics.DebuggerStepThrough]
        [global::System.Runtime.CompilerServices.CompilerGenerated]
        internal sealed class Person0PReflection : StaticReflection.IMemberInvokeDefine<StaticReflectionDemo.Person, string>, StaticReflection.IPropertyDefine, StaticReflection.IMemberAnonymousInvokeDefine
        {
            public static readonly Person0PReflection Instance = new Person0PReflection();
            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);
            public System.String Name { get; } = "FirstName";
            public System.String MetadataName { get; } = "FirstName";
            public System.Boolean IsVirtual { get; } = false;
            public System.Boolean IsStatic { get; } = false;
            public System.Boolean IsOverride { get; } = false;
            public System.Boolean IsAbstract { get; } = false;
            public System.Boolean IsSealed { get; } = false;
            public System.Boolean IsDefinition { get; } = true;
            public System.Boolean IsExtern { get; } = false;
            public System.Boolean IsImplicitlyDeclared { get; } = false;
            public System.Boolean CanBeReferencedByName { get; } = true;
            public System.Boolean IsPublic { get; } = true;
            public System.Boolean IsPrivate { get; } = false;
            public System.Boolean IsProtected { get; } = false;
            public System.Boolean IsInternal { get; } = false;
            public System.Type PropertyType { get; } = typeof(string);
            public System.Boolean CanRead { get; } = true;
            public System.Boolean CanWrite { get; } = true;
            public System.Boolean IsRequired { get; } = false;
            public System.Boolean IsWithEvents { get; } = false;
            public System.Boolean ReturnsByRef { get; } = false;
            public System.Boolean ReturnsByRefReadonly { get; } = false;
            public System.Collections.Generic.IReadOnlyList<System.Attribute> GetterAttributes { get; } = new System.Attribute[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> SetterAttributes { get; } = new System.Attribute[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]
            {
            };

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public string GetValue(Person instance)
            {
                return instance.FirstName;
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValue(Person instance, string value)
            {
                instance.FirstName = value;
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValueAnonymous(object instance, object value)
            {
                SetValue((StaticReflectionDemo.Person)instance, (string)value);
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public object GetValueAnonymous(object instance)
            {
                return (object)GetValue((StaticReflectionDemo.Person)instance);
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]
        [global::System.Diagnostics.DebuggerStepThrough]
        [global::System.Runtime.CompilerServices.CompilerGenerated]
        internal sealed class Person1PReflection : StaticReflection.IMemberInvokeDefine<StaticReflectionDemo.Person, string>, StaticReflection.IPropertyDefine, StaticReflection.IMemberAnonymousInvokeDefine
        {
            public static readonly Person1PReflection Instance = new Person1PReflection();
            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);
            public System.String Name { get; } = "LastName";
            public System.String MetadataName { get; } = "LastName";
            public System.Boolean IsVirtual { get; } = false;
            public System.Boolean IsStatic { get; } = false;
            public System.Boolean IsOverride { get; } = false;
            public System.Boolean IsAbstract { get; } = false;
            public System.Boolean IsSealed { get; } = false;
            public System.Boolean IsDefinition { get; } = true;
            public System.Boolean IsExtern { get; } = false;
            public System.Boolean IsImplicitlyDeclared { get; } = false;
            public System.Boolean CanBeReferencedByName { get; } = true;
            public System.Boolean IsPublic { get; } = true;
            public System.Boolean IsPrivate { get; } = false;
            public System.Boolean IsProtected { get; } = false;
            public System.Boolean IsInternal { get; } = false;
            public System.Type PropertyType { get; } = typeof(string);
            public System.Boolean CanRead { get; } = true;
            public System.Boolean CanWrite { get; } = true;
            public System.Boolean IsRequired { get; } = false;
            public System.Boolean IsWithEvents { get; } = false;
            public System.Boolean ReturnsByRef { get; } = false;
            public System.Boolean ReturnsByRefReadonly { get; } = false;
            public System.Collections.Generic.IReadOnlyList<System.Attribute> GetterAttributes { get; } = new System.Attribute[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> SetterAttributes { get; } = new System.Attribute[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]
            {
            };

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public string GetValue(Person instance)
            {
                return instance.LastName;
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValue(Person instance, string value)
            {
                instance.LastName = value;
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValueAnonymous(object instance, object value)
            {
                SetValue((StaticReflectionDemo.Person)instance, (string)value);
            }

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public object GetValueAnonymous(object instance)
            {
                return (object)GetValue((StaticReflectionDemo.Person)instance);
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]
        [global::System.Diagnostics.DebuggerStepThrough]
        [global::System.Runtime.CompilerServices.CompilerGenerated]
        internal sealed class Person0MReflection : StaticReflection.IMethodDefine, StaticReflection.Invoking.IArgsMethod<StaticReflectionDemo.Person, string>, StaticReflection.Invoking.IArgs0AnonymousMethod, StaticReflection.Invoking.IUsualArgsMethod<StaticReflectionDemo.Person, string>, StaticReflection.Invoking.IUsualArgs0AnonymousMethod
        {
            public static readonly Person0MReflection Instance = new Person0MReflection();
            private Person0MReflection()
            {
            }

            public System.String Name { get; } = "Name";
            public System.String MetadataName { get; } = "Name";
            public System.Boolean IsVirtual { get; } = false;
            public System.Boolean IsStatic { get; } = false;
            public System.Boolean IsOverride { get; } = false;
            public System.Boolean IsAbstract { get; } = false;
            public System.Boolean IsSealed { get; } = false;
            public System.Boolean IsDefinition { get; } = true;
            public System.Boolean IsExtern { get; } = false;
            public System.Boolean IsImplicitlyDeclared { get; } = false;
            public System.Boolean CanBeReferencedByName { get; } = true;
            public System.Boolean IsPublic { get; } = true;
            public System.Boolean IsPrivate { get; } = false;
            public System.Boolean IsProtected { get; } = false;
            public System.Boolean IsInternal { get; } = false;
            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]
            {
            };
            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);
            public System.Boolean ReturnsByRef { get; } = false;
            public StaticReflection.StaticMethodKind MethodKind { get; } = StaticReflection.StaticMethodKind.Ordinary;
            public StaticReflection.StaticRefKind RefKind { get; } = StaticReflection.StaticRefKind.None;
            public StaticReflection.StaticNullableAnnotation ReturnNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;
            public StaticReflection.StaticNullableAnnotation ReceiverNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;
            public System.Boolean ReturnsByRefReadonly { get; } = false;
            public System.Type ReturnType { get; } = typeof(string);
            public System.Collections.Generic.IReadOnlyList<System.Type> ArgumentTypes { get; } = new System.Type[]
            {
            };
            public System.Boolean IsGenericMethod { get; } = false;
            public System.Int32 Arity { get; } = 0;
            public System.Boolean IsExtensionMethod { get; } = false;
            public System.Boolean IsAsync { get; } = false;
            public System.Boolean IsVararg { get; } = false;
            public System.Boolean IsCheckedBuiltin { get; } = false;
            public System.Boolean HidesBaseMethodsByName { get; } = false;
            public System.Boolean ReturnsVoid { get; } = false;
            public System.Boolean IsReadOnly { get; } = false;
            public System.Boolean IsInitOnly { get; } = false;
            public System.Boolean IsPartialDefinition { get; } = false;
            public System.Boolean IsConditional { get; } = false;
            public System.Collections.Generic.IReadOnlyList<StaticReflection.ITypeArgumentDefine> TypeArguments { get; } = new StaticReflection.ITypeArgumentDefine[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> ReturnTypeAttributes { get; } = new System.Attribute[]
            {
            };

            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public 
#if !NET7_0_OR_GREATER
            unsafe 
#endif
            ref string Invoke(StaticReflectionDemo.Person instance)
            {
                ref string result = ref System.Runtime.CompilerServices.Unsafe.AsRef(instance.Name());
                return ref result;
            }

            public 
#if !NET7_0_OR_GREATER
            unsafe 
#endif
            ref object InvokeAnonymous(object instance)
            {
                return ref System.Runtime.CompilerServices.Unsafe.AsRef<object>(Invoke((StaticReflectionDemo.Person)instance));
            }

            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public string InvokeUsual(StaticReflectionDemo.Person instance)
            {
                return instance.Name();
            }

            public object InvokeUsualAnonymous(object instance)
            {
                return InvokeUsual((StaticReflectionDemo.Person)instance);
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]
        [global::System.Diagnostics.DebuggerStepThrough]
        [global::System.Runtime.CompilerServices.CompilerGenerated]
        internal sealed class Person0CReflection : StaticReflection.IConstructorDefine, StaticReflection.Invoking.IArgsMethod<StaticReflectionDemo.Person, StaticReflectionDemo.Person>, StaticReflection.Invoking.IArgs0AnonymousMethod, StaticReflection.Invoking.IUsualArgsMethod<StaticReflectionDemo.Person, StaticReflectionDemo.Person>, StaticReflection.Invoking.IUsualArgs0AnonymousMethod
        {
            public static readonly Person0CReflection Instance = new Person0CReflection();
            private Person0CReflection()
            {
            }

            public System.String Name { get; } = ".ctor";
            public System.String MetadataName { get; } = ".ctor";
            public System.Boolean IsVirtual { get; } = false;
            public System.Boolean IsStatic { get; } = false;
            public System.Boolean IsOverride { get; } = false;
            public System.Boolean IsAbstract { get; } = false;
            public System.Boolean IsSealed { get; } = false;
            public System.Boolean IsDefinition { get; } = true;
            public System.Boolean IsExtern { get; } = false;
            public System.Boolean IsImplicitlyDeclared { get; } = true;
            public System.Boolean CanBeReferencedByName { get; } = false;
            public System.Boolean IsPublic { get; } = true;
            public System.Boolean IsPrivate { get; } = false;
            public System.Boolean IsProtected { get; } = false;
            public System.Boolean IsInternal { get; } = false;
            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]
            {
            };
            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);
            public System.Boolean ReturnsByRef { get; } = false;
            public StaticReflection.StaticMethodKind MethodKind { get; } = StaticReflection.StaticMethodKind.Constructor;
            public StaticReflection.StaticRefKind RefKind { get; } = StaticReflection.StaticRefKind.None;
            public StaticReflection.StaticNullableAnnotation ReturnNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;
            public StaticReflection.StaticNullableAnnotation ReceiverNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;
            public System.Boolean ReturnsByRefReadonly { get; } = false;
            public System.Type ReturnType { get; } = typeof(StaticReflectionDemo.Person);
            public System.Collections.Generic.IReadOnlyList<System.Type> ArgumentTypes { get; } = new System.Type[]
            {
            };
            public System.Boolean IsGenericMethod { get; } = false;
            public System.Int32 Arity { get; } = 0;
            public System.Boolean IsExtensionMethod { get; } = false;
            public System.Boolean IsAsync { get; } = false;
            public System.Boolean IsVararg { get; } = false;
            public System.Boolean IsCheckedBuiltin { get; } = false;
            public System.Boolean HidesBaseMethodsByName { get; } = false;
            public System.Boolean ReturnsVoid { get; } = true;
            public System.Boolean IsReadOnly { get; } = false;
            public System.Boolean IsInitOnly { get; } = false;
            public System.Boolean IsPartialDefinition { get; } = false;
            public System.Boolean IsConditional { get; } = false;
            public System.Collections.Generic.IReadOnlyList<StaticReflection.ITypeArgumentDefine> TypeArguments { get; } = new StaticReflection.ITypeArgumentDefine[]
            {
            };
            public System.Collections.Generic.IReadOnlyList<System.Attribute> ReturnTypeAttributes { get; } = new System.Attribute[]
            {
            };

            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public 
#if !NET7_0_OR_GREATER
            unsafe 
#endif
            ref StaticReflectionDemo.Person Invoke(StaticReflectionDemo.Person instance)
            {
                ref StaticReflectionDemo.Person result = ref System.Runtime.CompilerServices.Unsafe.AsRef(new Person());
                return ref result;
            }

            public 
#if !NET7_0_OR_GREATER
            unsafe 
#endif
            ref object InvokeAnonymous(object instance)
            {
                return ref System.Runtime.CompilerServices.Unsafe.AsRef<object>(Invoke((StaticReflectionDemo.Person)instance));
            }

            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public StaticReflectionDemo.Person InvokeUsual(StaticReflectionDemo.Person instance)
            {
                return new Person();
            }

            public object InvokeUsualAnonymous(object instance)
            {
                return InvokeUsual((StaticReflectionDemo.Person)instance);
            }
        }

        public static readonly PersonReflection Instance = new PersonReflection();
        public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);
        public System.String Name { get; } = "Person";
        public System.String MetadataName { get; } = "Person";
        public System.Boolean IsVirtual { get; } = false;
        public System.Boolean IsStatic { get; } = false;
        public System.Boolean IsOverride { get; } = false;
        public System.Boolean IsAbstract { get; } = false;
        public System.Boolean IsSealed { get; } = false;
        public System.Boolean IsDefinition { get; } = true;
        public System.Boolean IsExtern { get; } = false;
        public System.Boolean IsImplicitlyDeclared { get; } = false;
        public System.Boolean CanBeReferencedByName { get; } = true;
        public System.Boolean IsPublic { get; } = false;
        public System.Boolean IsPrivate { get; } = false;
        public System.Boolean IsProtected { get; } = false;
        public System.Boolean IsInternal { get; } = true;
        public System.Type? BaseType { get; } = typeof(StaticReflectionDemo.Person);
        public System.Boolean IsReferenceType { get; } = true;
        public System.Boolean IsValueType { get; } = false;
        public System.Boolean IsAnonymousType { get; } = false;
        public System.Boolean IsTupleType { get; } = false;
        public System.Boolean IsNativeIntegerType { get; } = false;
        public System.Boolean IsRefLikeType { get; } = false;
        public System.Boolean IsUnmanagedType { get; } = false;
        public System.Boolean IsReadOnly { get; } = false;
        public System.Boolean IsRecord { get; } = false;
        public System.Int32 TypeKind { get; } = 2;
        public StaticReflection.StaticNullableAnnotation NullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.None;
        public System.Collections.Generic.IReadOnlyList<System.String> Interfaces { get; } = new System.String[]
        {
        };
        public System.Collections.Generic.IReadOnlyList<System.String> AllInterfaces { get; } = new System.String[]
        {
        };
        public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]
        {
            new StaticReflection.Annotions.StaticReflectionAttribute()
            {
            }
        };
        public System.Collections.Generic.IReadOnlyList<StaticReflection.IPropertyDefine> Properties { get; } = new StaticReflection.IPropertyDefine[]
        {
            Person0PReflection.Instance,
            Person1PReflection.Instance
        };
        public System.Collections.Generic.IReadOnlyList<StaticReflection.IMethodDefine> Methods { get; } = new StaticReflection.IMethodDefine[]
        {
            Person0MReflection.Instance
        };
        public System.Collections.Generic.IReadOnlyList<StaticReflection.IEventDefine> Events { get; } = new StaticReflection.IEventDefine[]
        {
        };
        public System.Collections.Generic.IReadOnlyList<StaticReflection.IFieldDefine> Fields { get; } = new StaticReflection.IFieldDefine[]
        {
        };
        public System.Collections.Generic.IReadOnlyList<StaticReflection.IConstructorDefine> Constructors { get; } = new StaticReflection.IConstructorDefine[]
        {
            Person0CReflection.Instance
        };
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project StaticReflection ](/sources/StaticReflection.zip)

:::


### Share StaticReflection 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&quote=StaticReflection" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&text=StaticReflection:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&title=StaticReflection" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&title=StaticReflection&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/StaticReflection

aaa
<SameCategory />

