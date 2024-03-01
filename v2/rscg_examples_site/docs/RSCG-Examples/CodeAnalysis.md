---
sidebar_position: 1230
title: 123 - CodeAnalysis
description: Code to string literal. Unfortunately, it carries also some other CodeAnalysis generated files, which are not so useful.
slug: /CodeAnalysis
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# CodeAnalysis  by Feast


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Feast.CodeAnalysis?label=Feast.CodeAnalysis)](https://www.nuget.org/packages/Feast.CodeAnalysis/)
[![GitHub last commit](https://img.shields.io/github/last-commit/feast107/CodeAnalysis?label=updated)](https://github.com/feast107/CodeAnalysis)
![GitHub Repo stars](https://img.shields.io/github/stars/feast107/CodeAnalysis?style=social)

## Details

### Info
:::info

Name: **CodeAnalysis**

Auto generate extensions for Microsoft.CodeAnalysis

Author: Feast

NuGet: 
*https://www.nuget.org/packages/Feast.CodeAnalysis/*   


You can find more details at https://github.com/feast107/CodeAnalysis

Source : https://github.com/feast107/CodeAnalysis

:::

### Original Readme
:::note

# CodeAnalysis
自动生成提供给 `SourceGenerator` 的扩展

## Requires

+ [PolySharp](https://github.com/Sergio0694/PolySharp)

## Supports

+ `[Literal]`
    
    Auto generate full qualified string literal for target class
    
    if you have a class like
    ```csharp
    [Literal("Your.Program.Class")]
    public class Test
    {
        public IEnumerable<string> Name { get; set; }
    }
    ```
    Then it will generate a class like

    ```csharp
    namespace Your.Program{
        public class Class{
            public static string Text = """
    public class Test
    {
        public global::System.Collection.Generic.IEnumerable<string> Name { get; set; }
    }
    """;
        }
    }
    ```

+ `Feast.CompileTime`
    ```csharp
    class Assembly : System.Reflection.Assembly;
    class Module : System.Reflection.Module;
    class Type : System.Type;
    class MemberInfo : System.Reflection.MemberInfo;
    class MethodInfo : System.Reflection.MethodInfo;
    class EventInfo : System.Reflection.EventInfo;
    class FieldInfo : System.Reflection.FieldInfo;
    class PropertyInfo : System.Reflection.PropertyInfo;
    class ParameterInfo : System.Reflection.ParameterInfo;
    class ConstructorInfo : System.Reflection.ConstructorInfo;
    ```

## Comment

我们需要 `源代码生成器`

因为我们需要生成更多的代码

我们需要 `源代码生成器` 的 `源代码生成器`

因为 `源代码生成器` 现在还不够强大

我们需要 `源代码生成器` 的 `源代码生成器` 的 `源代码生成器`

因为 `源代码生成器` 的 `源代码生成器` 现在还不能自举

由此可见

道生一，一生二，二生三，三生万物

总结

玩源生玩的。

:::

### About
:::note

Code to string literal. Unfortunately, it carries also some other CodeAnalysis generated files, which are not so useful.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **CodeAnalysis**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Feast.CodeAnalysis" Version="0.1.4" />
	  <PackageReference Include="Microsoft.CodeAnalysis.Analyzers" Version="3.3.4">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	  <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="4.0.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\Program.cs" label="Program.cs" >

  This is the use of **CodeAnalysis** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(Namespace_Andrei.Class_Ignat.Text);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.AttributeDataExtensionsGenerator\Feast.CodeAnalysis.AttributeDataExtensions.g.cs" label="Feast.CodeAnalysis.AttributeDataExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Microsoft.CodeAnalysis
{
    public static class AttributeDataExtensions
    {
        internal static T ToAttribute<T>(this global::Microsoft.CodeAnalysis.AttributeData attributeData)
            where T : global::System.Attribute
        {
            if (attributeData.AttributeConstructor == null)
                throw new global::System.ArgumentException("Attribute constructor not found");
            var attrType = typeof(T);
            var ctor = attrType.GetConstructors().FirstOrDefault(x =>
            {
                var param = x.GetParameters();
                if (param.Length != attributeData.AttributeConstructor.Parameters.Length)
                    return false;
                return !param.Where((t, i) => attributeData.AttributeConstructor.Parameters[i].Type.ToType().FullName != t.ParameterType.FullName).Any();
            });
            if (ctor == null)
                throw new global::System.MissingMethodException("Cannot find best match ctor for attribute");
            var param = ctor.GetParameters();
            var args = attributeData.ConstructorArguments.Select((x, i) => x.GetArgumentValue(param[i].ParameterType)).ToArray();
            var attribute = (T)global::System.Activator.CreateInstance(typeof(T), args);
            var publicProps = attrType.GetProperties(global::System.Reflection.BindingFlags.Public | global::System.Reflection.BindingFlags.Instance).Where(static x => x.CanWrite).ToDictionary(static x => x.Name, static x => x);
            foreach (var argument in attributeData.NamedArguments)
            {
                if (!publicProps.TryGetValue(argument.Key, out var prop))
                    continue;
                prop.SetValue(attribute, argument.Value.GetArgumentValue(prop.PropertyType));
            }

            return attribute;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.Assembly.g.cs" label="Feast.CodeAnalysis.Assembly.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using Microsoft.CodeAnalysis;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class Assembly(global::Microsoft.CodeAnalysis.IAssemblySymbol symbol) : global::System.Reflection.Assembly, global::System.IEquatable<global::System.Reflection.Assembly>
    {
        internal readonly global::Microsoft.CodeAnalysis.IAssemblySymbol Symbol = symbol;
        public override string FullName => Symbol.GetFullyQualifiedName();
        public override string Location => Symbol.Locations.FirstOrDefault()?.GetLineSpan().Path ?? string.Empty;
        public override bool ReflectionOnly => !Symbol.CanBeReferencedByName;
        public override global::System.Collections.Generic.IEnumerable<global::System.Reflection.Module> Modules => Symbol.Modules.Select(static x => new global::Feast.CodeAnalysis.CompileTime.Module(x));
        public override global::System.Collections.Generic.IEnumerable<global::System.Type> ExportedTypes => Symbol.GetForwardedTypes().Where(static x => x.DeclaredAccessibility == global::Microsoft.CodeAnalysis.Accessibility.Public).Select(static x => new global::Feast.CodeAnalysis.CompileTime.Type(x));

        public bool Equals(global::System.Reflection.Assembly other)
        {
            if (other is global::Feast.CodeAnalysis.CompileTime.Assembly compileTime)
                return global::Microsoft.CodeAnalysis.SymbolEqualityComparer.Default.Equals(Symbol, compileTime.Symbol);
            return other is not null && FullName == other.FullName;
        }

        public override int GetHashCode() => Symbol.GetHashCode();
        public override bool Equals(object o) => o is global::Feast.CodeAnalysis.CompileTime.Assembly assembly && Equals(assembly);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.AttributeData.g.cs" label="Feast.CodeAnalysis.AttributeData.g.cs" >


```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using Microsoft.CodeAnalysis;

namespace Feast.CodeAnalysis.CompileTime
{
    public partial class AttributeData(global::Microsoft.CodeAnalysis.AttributeData attributeData) : global::System.Reflection.CustomAttributeData
    {
        public override global::System.Reflection.ConstructorInfo Constructor => new global::Feast.CodeAnalysis.CompileTime.ConstructorInfo(attributeData.AttributeConstructor!);
        public override global::System.Collections.Generic.IList<global::System.Reflection.CustomAttributeTypedArgument> ConstructorArguments => attributeData.ConstructorArguments.Select((x, i) =>
        {
            var value = x.GetArgumentValue();
            return new CustomAttributeTypedArgument(attributeData.AttributeConstructor!.Parameters[i].Type.ToType(), value);
        }).ToList();
        public override global::System.Collections.Generic.IList<global::System.Reflection.CustomAttributeNamedArgument> NamedArguments => attributeData.NamedArguments.Select(x =>
        {
            var value = x.Value.GetArgumentValue();
            if (value is null)
                return (global::System.Reflection.CustomAttributeNamedArgument? )null;
            return new global::System.Reflection.CustomAttributeNamedArgument(attributeData.AttributeClass!.GetMembers().First(p => p.Name == x.Key).ToMemberInfo(), value);
        }).Where(static x => x != null).Cast<global::System.Reflection.CustomAttributeNamedArgument>().ToList();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.CompileTimeExtensions.g.cs" label="Feast.CodeAnalysis.CompileTimeExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Reflection;

namespace Microsoft.CodeAnalysis
{
    public static partial class CompileTimeExtensions
    {
        public static global::System.Reflection.Assembly ToAssembly(this global::Microsoft.CodeAnalysis.IAssemblySymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.Assembly(symbol);
        public static global::System.Reflection.Module ToModule(this global::Microsoft.CodeAnalysis.IModuleSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.Module(symbol);
        public static global::System.Type ToType(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.Type(symbol);
        public static global::System.Reflection.MemberInfo ToMemberInfo(this global::Microsoft.CodeAnalysis.ISymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.MemberInfo(symbol);
        public static global::System.Reflection.MethodInfo ToMethodInfo(this global::Microsoft.CodeAnalysis.IMethodSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.MethodInfo(symbol);
        public static global::System.Reflection.FieldInfo ToFieldInfo(this global::Microsoft.CodeAnalysis.IFieldSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.FieldInfo(symbol);
        public static global::System.Reflection.PropertyInfo ToPropertyInfo(this global::Microsoft.CodeAnalysis.IPropertySymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.PropertyInfo(symbol);
        public static global::System.Reflection.ConstructorInfo ToConstructorInfo(this global::Microsoft.CodeAnalysis.IMethodSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.ConstructorInfo(symbol);
        public static global::System.Reflection.EventInfo ToEventInfo(this global::Microsoft.CodeAnalysis.IEventSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.EventInfo(symbol);
        public static global::System.Reflection.ParameterInfo ToParameterInfo(this global::Microsoft.CodeAnalysis.IParameterSymbol symbol) => new global::Feast.CodeAnalysis.CompileTime.ParameterInfo(symbol);
        public static bool IsAssignableTo(this global::System.Type type, global::System.Type another) => another.IsAssignableFrom(type);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.ConstructorInfo.g.cs" label="Feast.CodeAnalysis.ConstructorInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using System.Reflection;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class ConstructorInfo(global::Microsoft.CodeAnalysis.IMethodSymbol constructor) : global::System.Reflection.ConstructorInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => constructor.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => constructor.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => constructor.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type((constructor.ContainingSymbol as global::Microsoft.CodeAnalysis.ITypeSymbol)!);
        public override string Name => constructor.MetadataName;
        public override global::System.Type ReflectedType => new global::Feast.CodeAnalysis.CompileTime.Type(constructor.ReturnType);

        public override global::System.Reflection.MethodImplAttributes GetMethodImplementationFlags() => throw new global::System.NotSupportedException();
        public override global::System.Reflection.ParameterInfo[] GetParameters() => constructor.Parameters.Select(static x => (global::System.Reflection.ParameterInfo)new global::Feast.CodeAnalysis.CompileTime.ParameterInfo(x)).ToArray();
        public override object Invoke(object obj, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object[] parameters, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
        public override global::System.Reflection.MethodAttributes Attributes
        {
            get
            {
                var ret = global::System.Reflection.MethodAttributes.PrivateScope;
                if (constructor.IsStatic)
                    ret |= global::System.Reflection.MethodAttributes.Static;
                if (constructor.IsVirtual)
                    ret |= global::System.Reflection.MethodAttributes.Virtual;
                if (constructor.IsAbstract)
                    ret |= global::System.Reflection.MethodAttributes.Abstract;
                switch (constructor.DeclaredAccessibility)
                {
                    case global::Microsoft.CodeAnalysis.Accessibility.Public:
                        ret |= global::System.Reflection.MethodAttributes.Public;
                        break;
                    case Microsoft.CodeAnalysis.Accessibility.Protected or Microsoft.CodeAnalysis.Accessibility.Private:
                        ret |= global::System.Reflection.MethodAttributes.Private;
                        break;
                }

                return ret;
            }
        }

        public override global::System.RuntimeMethodHandle MethodHandle => throw new global::System.NotSupportedException();

        public override object Invoke(global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object[] parameters, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.EventInfo.g.cs" label="Feast.CodeAnalysis.EventInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class EventInfo(global::Microsoft.CodeAnalysis.IEventSymbol @event) : global::System.Reflection.EventInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => @event.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => @event.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => @event.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type((@event.ContainingSymbol as global::Microsoft.CodeAnalysis.ITypeSymbol)!);
        public override string Name => @event.MetadataName;
        public override global::System.Type ReflectedType => DeclaringType;

        public override global::System.Reflection.MethodInfo GetAddMethod(bool nonPublic) => @event.AddMethod == null ? null : @event.AddMethod.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public == nonPublic ? new global::Feast.CodeAnalysis.CompileTime.MethodInfo(@event.AddMethod) : null;
        public override global::System.Reflection.MethodInfo GetRaiseMethod(bool nonPublic) => @event.RaiseMethod == null ? null : @event.RaiseMethod.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public == nonPublic ? new global::Feast.CodeAnalysis.CompileTime.MethodInfo(@event.RaiseMethod) : null;
        public override global::System.Reflection.MethodInfo GetRemoveMethod(bool nonPublic) => @event.RemoveMethod == null ? null : @event.RemoveMethod.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public == nonPublic ? new global::Feast.CodeAnalysis.CompileTime.MethodInfo(@event.RemoveMethod) : null;
        public override global::System.Reflection.EventAttributes Attributes => global::System.Reflection.EventAttributes.None;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.FieldInfo.g.cs" label="Feast.CodeAnalysis.FieldInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class FieldInfo(global::Microsoft.CodeAnalysis.IFieldSymbol field) : global::System.Reflection.FieldInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => field.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => field.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => field.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type(field.ContainingType);
        public override string Name => field.MetadataName;
        public override global::System.Type ReflectedType => FieldType;

        public override object GetValue(object obj) => throw new global::System.NotSupportedException();
        public override void SetValue(object obj, object value, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
        public override global::System.Reflection.FieldAttributes Attributes
        {
            get
            {
                var ret = global::System.Reflection.FieldAttributes.PrivateScope;
                if (field.IsStatic)
                    ret |= global::System.Reflection.FieldAttributes.Static;
                if (field.IsReadOnly)
                    ret |= global::System.Reflection.FieldAttributes.InitOnly;
                if (field.HasConstantValue)
                    ret |= global::System.Reflection.FieldAttributes.HasDefault;
                if (field.IsConst)
                    ret |= global::System.Reflection.FieldAttributes.Literal;
                switch (field.DeclaredAccessibility)
                {
                    case global::Microsoft.CodeAnalysis.Accessibility.Public:
                        ret |= global::System.Reflection.FieldAttributes.Public;
                        break;
                    default:
                        ret |= global::System.Reflection.FieldAttributes.Private;
                        break;
                }

                return ret;
            }
        }

        public override global::System.RuntimeFieldHandle FieldHandle => throw new global::System.NotSupportedException();
        public override global::System.Type FieldType => new global::Feast.CodeAnalysis.CompileTime.Type(field.Type);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.MemberInfo.g.cs" label="Feast.CodeAnalysis.MemberInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class MemberInfo(global::Microsoft.CodeAnalysis.ISymbol symbol) : global::System.Reflection.MemberInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => symbol.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => symbol.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => symbol.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type(symbol.ContainingType);

        public override global::System.Reflection.MemberTypes MemberType
        {
            get
            {
                return symbol switch
                {
                    global::Microsoft.CodeAnalysis.ITypeSymbol type => type.ContainingType != null ? global::System.Reflection.MemberTypes.NestedType : global::System.Reflection.MemberTypes.TypeInfo,
                    global::Microsoft.CodeAnalysis.IPropertySymbol => global::System.Reflection.MemberTypes.Property,
                    global::Microsoft.CodeAnalysis.IFieldSymbol => global::System.Reflection.MemberTypes.Field,
                    global::Microsoft.CodeAnalysis.IMethodSymbol method => method.ContainingType.Constructors.Contains(method) ? global::System.Reflection.MemberTypes.Constructor : global::System.Reflection.MemberTypes.Method,
                    global::Microsoft.CodeAnalysis.IEventSymbol => global::System.Reflection.MemberTypes.Event,
                    _ => global::System.Reflection.MemberTypes.Custom
                };
            }
        }

        public override string Name => symbol.MetadataName;
        public override global::System.Type ReflectedType => new global::Feast.CodeAnalysis.CompileTime.Type(symbol switch
        {
            global::Microsoft.CodeAnalysis.ITypeSymbol type => type,
            global::Microsoft.CodeAnalysis.IPropertySymbol property => property.Type,
            global::Microsoft.CodeAnalysis.IFieldSymbol field => field.Type,
            global::Microsoft.CodeAnalysis.IMethodSymbol method => method.ReturnType,
            _ => throw new global::System.ArgumentOutOfRangeException()});
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.MethodInfo.g.cs" label="Feast.CodeAnalysis.MethodInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class MethodInfo(global::Microsoft.CodeAnalysis.IMethodSymbol method) : global::System.Reflection.MethodInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => method.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => method.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => method.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type((method.ContainingSymbol as global::Microsoft.CodeAnalysis.ITypeSymbol)!);
        public override string Name => method.MetadataName;
        public override global::System.Type ReflectedType => new global::Feast.CodeAnalysis.CompileTime.Type(method.ReturnType);

        public override global::System.Reflection.MethodImplAttributes GetMethodImplementationFlags()
        {
            var ret = global::System.Reflection.MethodImplAttributes.Managed;
            return ret;
        }

        public override global::System.Reflection.ParameterInfo[] GetParameters() => method.Parameters.Select(static x => (global::System.Reflection.ParameterInfo)new global::Feast.CodeAnalysis.CompileTime.ParameterInfo(x)).ToArray();
        public override object Invoke(object obj, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object[] parameters, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
        public override global::System.Reflection.MethodAttributes Attributes
        {
            get
            {
                var ret = global::System.Reflection.MethodAttributes.PrivateScope;
                if (method.IsStatic)
                    ret |= global::System.Reflection.MethodAttributes.Static;
                if (method.IsVirtual)
                    ret |= global::System.Reflection.MethodAttributes.Virtual;
                if (method.IsAbstract)
                    ret |= global::System.Reflection.MethodAttributes.Abstract;
                switch (method.DeclaredAccessibility)
                {
                    case global::Microsoft.CodeAnalysis.Accessibility.Public:
                        ret |= global::System.Reflection.MethodAttributes.Public;
                        break;
                    case Microsoft.CodeAnalysis.Accessibility.Protected or Microsoft.CodeAnalysis.Accessibility.Private:
                        ret |= global::System.Reflection.MethodAttributes.Private;
                        break;
                }

                return ret;
            }
        }

        public override global::System.RuntimeMethodHandle MethodHandle => throw new global::System.NotSupportedException();

        public override global::System.Reflection.MethodInfo GetBaseDefinition() => new global::Feast.CodeAnalysis.CompileTime.MethodInfo(method.OriginalDefinition);
        public override global::System.Reflection.ICustomAttributeProvider ReturnTypeCustomAttributes => throw new global::System.NotImplementedException();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.Module.g.cs" label="Feast.CodeAnalysis.Module.g.cs" >


```csharp showLineNumbers 
using System;
using Microsoft.CodeAnalysis;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class Module(global::Microsoft.CodeAnalysis.IModuleSymbol module) : global::System.Reflection.Module
    {
        public override string Name => module.MetadataName;
        public override string FullyQualifiedName => module.GetFullyQualifiedName();
        public override global::System.Reflection.Assembly Assembly => new global::Feast.CodeAnalysis.CompileTime.Assembly(module.ContainingAssembly);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.ParameterInfo.g.cs" label="Feast.CodeAnalysis.ParameterInfo.g.cs" >


```csharp showLineNumbers 
using System;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class ParameterInfo(global::Microsoft.CodeAnalysis.IParameterSymbol parameter) : global::System.Reflection.ParameterInfo
    {
        public override string Name => parameter.MetadataName;
        public override global::System.Type ParameterType => new global::Feast.CodeAnalysis.CompileTime.Type(parameter.Type);

        public override global::System.Reflection.ParameterAttributes Attributes
        {
            get
            {
                var ret = global::System.Reflection.ParameterAttributes.None;
                if (parameter.IsOptional)
                    ret |= global::System.Reflection.ParameterAttributes.Optional;
                switch (parameter.RefKind)
                {
                    case global::Microsoft.CodeAnalysis.RefKind.Out:
                        ret |= global::System.Reflection.ParameterAttributes.Out;
                        break;
                    case global::Microsoft.CodeAnalysis.RefKind.In:
                        ret |= global::System.Reflection.ParameterAttributes.In;
                        break;
                }

                return ret;
            }
        }

        public override object DefaultValue => parameter.ExplicitDefaultValue;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.PropertyInfo.g.cs" label="Feast.CodeAnalysis.PropertyInfo.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using Microsoft.CodeAnalysis;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class PropertyInfo(global::Microsoft.CodeAnalysis.IPropertySymbol property) : global::System.Reflection.PropertyInfo
    {
        public override object[] GetCustomAttributes(bool inherit) => property.GetAttributes().Cast<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => property.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => property.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Type DeclaringType => new global::Feast.CodeAnalysis.CompileTime.Type(property.ContainingType);
        public override string Name => property.Name;
        public override global::System.Type ReflectedType => PropertyType;

        public override global::System.Reflection.MethodInfo[] GetAccessors(bool nonPublic) => [GetGetMethod(nonPublic), GetSetMethod(nonPublic)];
        public override global::System.Reflection.MethodInfo GetGetMethod(bool nonPublic) => property.GetMethod == null ? null : property.GetMethod.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public == nonPublic ? new global::Feast.CodeAnalysis.CompileTime.MethodInfo(property.GetMethod) : null;
        public override global::System.Reflection.ParameterInfo[] GetIndexParameters() => property.Parameters.Select(x => (global::System.Reflection.ParameterInfo)new global::Feast.CodeAnalysis.CompileTime.ParameterInfo(x)).ToArray();
        public override global::System.Reflection.MethodInfo GetSetMethod(bool nonPublic) => property.SetMethod == null ? null : property.SetMethod.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public == nonPublic ? new global::Feast.CodeAnalysis.CompileTime.MethodInfo(property.SetMethod) : null;
        public override object GetValue(object obj, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object[] index, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
        public override void SetValue(object obj, object value, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object[] index, global::System.Globalization.CultureInfo culture) => throw new global::System.NotSupportedException();
        public override global::System.Reflection.PropertyAttributes Attributes => global::System.Reflection.PropertyAttributes.SpecialName;
        public override bool CanRead => !property.IsWriteOnly;
        public override bool CanWrite => !property.IsReadOnly;
        public override global::System.Reflection.Module Module => property.ContainingModule.ToModule();
        public override global::System.Type PropertyType => new global::Feast.CodeAnalysis.CompileTime.Type(property.Type);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.Type.g.cs" label="Feast.CodeAnalysis.Type.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using System.Reflection;
using Microsoft.CodeAnalysis;

namespace Feast.CodeAnalysis.CompileTime
{
    internal partial class Type(global::Microsoft.CodeAnalysis.ITypeSymbol symbol) : global::System.Type, global::System.IEquatable<global::System.Type>
    {
        internal readonly global::Microsoft.CodeAnalysis.ITypeSymbol Symbol = symbol;
        public override object[] GetCustomAttributes(bool inherit) => Symbol.GetAttributes().CastArray<object>().ToArray();
        public override object[] GetCustomAttributes(global::System.Type attributeType, bool inherit) => Symbol.GetAttributes().Where(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName).Cast<object>().ToArray();
        public override bool IsDefined(global::System.Type attributeType, bool inherit) => Symbol.GetAttributes().Any(x => x.AttributeClass?.ToDisplayString() == attributeType.FullName);
        public override global::System.Collections.Generic.IEnumerable<global::System.Reflection.CustomAttributeData> CustomAttributes => Symbol.GetAttributes().Select(x => new global::Feast.CodeAnalysis.CompileTime.AttributeData(x));
        public override string Namespace => Symbol.ContainingNamespace.ToDisplayString();
        public override string Name => Symbol.MetadataName;
        public override string FullName => Symbol.TypeKind switch
        {
            global::Microsoft.CodeAnalysis.TypeKind.Array => $"{GetElementType()!.FullName}[]",
            global::Microsoft.CodeAnalysis.TypeKind.Pointer => $"{GetElementType()!.FullName}*",
            _ => $"{Namespace}.{Name}{(!IsGenericType ? string.Empty : '[' + string.Join(",", GenericTypeArguments.Select(x => $"[{x.AssemblyQualifiedName}]")) + ']')}"};
        public override string AssemblyQualifiedName => $"{FullName}, {Assembly.FullName}";
        public override global::System.Guid GUID => throw new global::System.NotSupportedException();
        public override global::System.Reflection.MemberTypes MemberType => Symbol.ContainingType is not null ? global::System.Reflection.MemberTypes.NestedType : global::System.Reflection.MemberTypes.TypeInfo;
        public override global::System.Type BaseType => Symbol.BaseType == null ? null : new global::Feast.CodeAnalysis.CompileTime.Type(Symbol.BaseType);
        public override global::System.Type ReflectedType => Symbol.ContainingType is null ? null : new global::Feast.CodeAnalysis.CompileTime.Type(Symbol.ContainingType);
        public override global::System.Type DeclaringType => Symbol.ContainingType is null ? null : new global::Feast.CodeAnalysis.CompileTime.Type(Symbol.ContainingType);
        public override global::System.Reflection.MethodBase DeclaringMethod => Symbol.ContainingSymbol is not IMethodSymbol methodSymbol ? null : new global::Feast.CodeAnalysis.CompileTime.MethodInfo(methodSymbol);
        public override bool IsEnum => Symbol.TypeKind == global::Microsoft.CodeAnalysis.TypeKind.Enum;
        public override global::System.Reflection.Assembly Assembly => new global::Feast.CodeAnalysis.CompileTime.Assembly(Symbol.ContainingAssembly);
        public override global::System.Reflection.Module Module => new global::Feast.CodeAnalysis.CompileTime.Module(Symbol.ContainingModule);
        public override global::System.Type UnderlyingSystemType => new global::Feast.CodeAnalysis.CompileTime.Type(Symbol);
        public override bool IsGenericType => Symbol is INamedTypeSymbol { TypeArguments.Length: > 0 };
        public override bool ContainsGenericParameters => Symbol is INamedTypeSymbol { TypeParameters.Length: > 0 };
        public override bool IsGenericParameter => Symbol.TypeKind == global::Microsoft.CodeAnalysis.TypeKind.TypeParameter;
        public override bool IsGenericTypeDefinition => Symbol is global::Microsoft.CodeAnalysis.INamedTypeSymbol namedType && namedType.TypeParameters.Length > namedType.TypeArguments.Length;
        public override bool IsConstructedGenericType => Symbol is global::Microsoft.CodeAnalysis.INamedTypeSymbol namedType && namedType.TypeParameters.Length == namedType.TypeArguments.Length;
        public override global::System.Type[] GenericTypeArguments => Symbol is INamedTypeSymbol { TypeArguments.Length: > 0 } typeSymbol ? typeSymbol.TypeArguments.Select(static x => (global::System.Type)new global::Feast.CodeAnalysis.CompileTime.Type(x)).ToArray() : global::System.Array.Empty<global::System.Type>();

        public override global::System.Type[] GetGenericParameterConstraints()
        {
            if (Symbol is not ITypeParameterSymbol typeParameterSymbol)
                return global::System.Array.Empty<global::System.Type>();
            return typeParameterSymbol.ConstraintTypes.Select(static x => (global::System.Type)new global::Feast.CodeAnalysis.CompileTime.Type(x)).ToArray();
        }

        protected override global::System.Reflection.TypeAttributes GetAttributeFlagsImpl()
        {
            var ret = Symbol.TypeKind switch
            {
                global::Microsoft.CodeAnalysis.TypeKind.Interface => global::System.Reflection.TypeAttributes.Interface,
                global::Microsoft.CodeAnalysis.TypeKind.Class => global::System.Reflection.TypeAttributes.Class,
                _ => global::System.Reflection.TypeAttributes.NotPublic
            };
            if (Symbol.DeclaredAccessibility == global::Microsoft.CodeAnalysis.Accessibility.Public)
            {
                ret |= global::System.Reflection.TypeAttributes.Public;
                if (Symbol.ContainingType != null)
                {
                    ret |= global::System.Reflection.TypeAttributes.NestedPublic;
                }
            }
            else if (Symbol is { DeclaredAccessibility: Accessibility.Private, ContainingType: not null })
            {
                ret |= TypeAttributes.NestedPrivate;
            }

            if (Symbol.IsAbstract)
            {
                ret |= global::System.Reflection.TypeAttributes.Abstract;
            }

            if (Symbol.IsSealed)
            {
                ret |= global::System.Reflection.TypeAttributes.Sealed;
            }

            return ret;
        }

        protected override global::System.Reflection.ConstructorInfo GetConstructorImpl(global::System.Reflection.BindingFlags bindingAttr, global::System.Reflection.Binder binder, global::System.Reflection.CallingConventions callConvention, global::System.Type[] types, global::System.Reflection.ParameterModifier[] modifiers)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IMethodSymbol>().FirstOrDefault(x => Qualified(x, bindingAttr) && !types.Where((c, i) => new global::Feast.CodeAnalysis.CompileTime.Type(x.Parameters[i].Type).Equals(c)).Any());
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.ConstructorInfo(ret);
        }

        public override global::System.Reflection.ConstructorInfo[] GetConstructors(global::System.Reflection.BindingFlags bindingAttr)
        {
            switch (Symbol.TypeKind)
            {
                case global::Microsoft.CodeAnalysis.TypeKind.Class:
                case global::Microsoft.CodeAnalysis.TypeKind.Array:
                case global::Microsoft.CodeAnalysis.TypeKind.Delegate:
                case global::Microsoft.CodeAnalysis.TypeKind.Struct:
                    return (Symbol as global::Microsoft.CodeAnalysis.INamedTypeSymbol)!.Constructors.Select(static x => (global::System.Reflection.ConstructorInfo)new global::Feast.CodeAnalysis.CompileTime.ConstructorInfo(x)).ToArray();
            }

            return global::System.Array.Empty<global::System.Reflection.ConstructorInfo>();
        }

        public override global::System.Reflection.EventInfo GetEvent(string name, global::System.Reflection.BindingFlags bindingAttr)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IEventSymbol>().FirstOrDefault(x => x.Name == name && Qualified(x, bindingAttr));
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.EventInfo(ret);
        }

        public override global::System.Reflection.EventInfo[] GetEvents(global::System.Reflection.BindingFlags bindingAttr)
        {
            return Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IEventSymbol>().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.EventInfo)new global::Feast.CodeAnalysis.CompileTime.EventInfo(x)).ToArray();
        }

        public override global::System.Reflection.FieldInfo GetField(string name, global::System.Reflection.BindingFlags bindingAttr)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IFieldSymbol>().FirstOrDefault(x => Qualified(x, bindingAttr) && x.Name == name);
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.FieldInfo(ret);
        }

        public override global::System.Reflection.FieldInfo[] GetFields(global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IFieldSymbol>().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.FieldInfo)new global::Feast.CodeAnalysis.CompileTime.FieldInfo(x)).ToArray();
        private static bool Qualified(global::Microsoft.CodeAnalysis.ISymbol symbol, global::System.Reflection.BindingFlags flags) => (!flags.HasFlag(global::System.Reflection.BindingFlags.Instance) || !symbol.IsStatic) && (!flags.HasFlag(global::System.Reflection.BindingFlags.Static) || symbol.IsStatic) && (!flags.HasFlag(global::System.Reflection.BindingFlags.Public) || symbol.DeclaredAccessibility == global::Microsoft.CodeAnalysis.Accessibility.Public) && (!flags.HasFlag(global::System.Reflection.BindingFlags.NonPublic) || symbol.DeclaredAccessibility != global::Microsoft.CodeAnalysis.Accessibility.Public);
        private static bool Qualified(global::Microsoft.CodeAnalysis.ISymbol symbol, global::System.Reflection.MemberTypes memberTypes) => memberTypes is MemberTypes.All || symbol switch
        {
            global::Microsoft.CodeAnalysis.IFieldSymbol => memberTypes.HasFlag(global::System.Reflection.MemberTypes.Field),
            global::Microsoft.CodeAnalysis.IMethodSymbol method => method.MethodKind == global::Microsoft.CodeAnalysis.MethodKind.Constructor ? memberTypes.HasFlag(global::System.Reflection.MemberTypes.Constructor) : memberTypes.HasFlag(global::System.Reflection.MemberTypes.Method),
            global::Microsoft.CodeAnalysis.IPropertySymbol => memberTypes.HasFlag(global::System.Reflection.MemberTypes.Property),
            global::Microsoft.CodeAnalysis.IEventSymbol => memberTypes.HasFlag(global::System.Reflection.MemberTypes.Event),
            global::Microsoft.CodeAnalysis.INamedTypeSymbol => memberTypes.HasFlag(global::System.Reflection.MemberTypes.NestedType),
            _ => false
        };
        public override global::System.Reflection.MemberInfo[] GetMembers(global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.ISymbol>().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.MemberInfo)new global::Feast.CodeAnalysis.CompileTime.MemberInfo(x)).ToArray();
        protected override global::System.Reflection.MethodInfo GetMethodImpl(string name, global::System.Reflection.BindingFlags bindingAttr, global::System.Reflection.Binder binder, global::System.Reflection.CallingConventions callConvention, global::System.Type[] types, global::System.Reflection.ParameterModifier[] modifiers)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IMethodSymbol>().FirstOrDefault(x => x.Name == name && Qualified(x, bindingAttr) && x.Parameters.Length == types.Length && !x.Parameters.Where((p, i) => types[i] != new global::Feast.CodeAnalysis.CompileTime.Type(p.Type)).Any());
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.MethodInfo(ret);
        }

        public override global::System.Reflection.MethodInfo[] GetMethods(global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IMethodSymbol>().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.MethodInfo)new global::Feast.CodeAnalysis.CompileTime.MethodInfo(x)).ToArray();
        public override global::System.Reflection.PropertyInfo[] GetProperties(global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IPropertySymbol>().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.PropertyInfo)new global::Feast.CodeAnalysis.CompileTime.PropertyInfo(x)).ToArray();
        public override global::System.Reflection.EventInfo[] GetEvents() => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IEventSymbol>().Select(static x => (global::System.Reflection.EventInfo)new global::Feast.CodeAnalysis.CompileTime.EventInfo(x)).ToArray();
        public override bool IsSerializable => Symbol.GetAttributes().Any(static x => x.AttributeClass?.ToType().Equals(typeof(global::System.SerializableAttribute))is true);

        public override global::System.Reflection.MemberInfo[] GetMember(string name, global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().Where(x => Qualified(x, bindingAttr)).Select(static x => (global::System.Reflection.MemberInfo)new global::Feast.CodeAnalysis.CompileTime.MemberInfo(x)).ToArray();
        public override global::System.Reflection.MemberInfo[] GetMember(string name, global::System.Reflection.MemberTypes type, global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().Where(x => x.Name == name && Qualified(x, bindingAttr) && Qualified(x, type)).Select(static x => (global::System.Reflection.MemberInfo)new global::Feast.CodeAnalysis.CompileTime.MemberInfo(x)).ToArray();
        public override bool IsEnumDefined(object value) => IsEnum && Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IFieldSymbol>().Any(x => x.ConstantValue == value);
        public override object InvokeMember(string name, global::System.Reflection.BindingFlags invokeAttr, global::System.Reflection.Binder binder, object target, object[] args, global::System.Reflection.ParameterModifier[] modifiers, global::System.Globalization.CultureInfo culture, string[] namedParameters) => throw new global::System.NotSupportedException();
        protected override bool IsArrayImpl() => Symbol.SpecialType == global::Microsoft.CodeAnalysis.SpecialType.System_Array;
        protected override bool IsByRefImpl() => Symbol.IsReferenceType || Symbol.IsRefLikeType;
        protected override bool IsCOMObjectImpl() => Symbol is INamedTypeSymbol { IsComImport: true };
        protected override bool IsPointerImpl() => Symbol.Kind == global::Microsoft.CodeAnalysis.SymbolKind.PointerType;
        protected override bool IsPrimitiveImpl() => Symbol.SpecialType is >= SpecialType.System_Boolean and <= SpecialType.System_Double or global::Microsoft.CodeAnalysis.SpecialType.System_Object or global::Microsoft.CodeAnalysis.SpecialType.System_String;
        public override global::System.Array GetEnumValues() => IsEnum ? Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IFieldSymbol>().Select(x => x.ConstantValue).ToArray() : throw new global::System.InvalidOperationException();
        public override global::System.Reflection.GenericParameterAttributes GenericParameterAttributes => throw new global::System.InvalidOperationException();

        protected override global::System.Reflection.PropertyInfo GetPropertyImpl(string name, global::System.Reflection.BindingFlags bindingAttr, global::System.Reflection.Binder binder, global::System.Type returnType, global::System.Type[] types, global::System.Reflection.ParameterModifier[] modifiers)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.IPropertySymbol>().FirstOrDefault(x => Qualified(x, bindingAttr) && new global::Feast.CodeAnalysis.CompileTime.Type(x.Type).Equals(returnType));
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.PropertyInfo(ret);
        }

        protected override bool HasElementTypeImpl() => Symbol.TypeKind == global::Microsoft.CodeAnalysis.TypeKind.Array || Symbol.TypeKind == global::Microsoft.CodeAnalysis.TypeKind.Pointer || Symbol.IsReferenceType;
        public override global::System.Type GetElementType() => Symbol switch
        {
            { TypeKind: TypeKind.Array } => new global::Feast.CodeAnalysis.CompileTime.Type(Symbol.Interfaces.First(x => x.TypeArguments.Length == 1).TypeArguments[0]),
            { TypeKind: TypeKind.Pointer } and global::Microsoft.CodeAnalysis.IPointerTypeSymbol pointer => new global::Feast.CodeAnalysis.CompileTime.Type(pointer.PointedAtType),
            { IsReferenceType: true } => this,
            _ => null
        };
        protected override bool IsValueTypeImpl() => Symbol.TypeKind is global::Microsoft.CodeAnalysis.TypeKind.Struct or global::Microsoft.CodeAnalysis.TypeKind.Structure;
        public override global::System.Type GetNestedType(string name, global::System.Reflection.BindingFlags bindingAttr)
        {
            var ret = Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.INamedTypeSymbol>().FirstOrDefault(x => x.Name == name && Qualified(x, bindingAttr));
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.Type(ret);
        }

        public override global::System.Type[] GetNestedTypes(global::System.Reflection.BindingFlags bindingAttr) => Symbol.GetMembers().OfType<global::Microsoft.CodeAnalysis.INamedTypeSymbol>().Select(x => (global::System.Type)new global::Feast.CodeAnalysis.CompileTime.Type(x)).ToArray();
        public override global::System.Type GetInterface(string name, bool ignoreCase)
        {
            var ret = Symbol.AllInterfaces.FirstOrDefault(x => ignoreCase ? string.Equals(name, x.Name, global::System.StringComparison.OrdinalIgnoreCase) : name == x.Name);
            return ret == null ? null : new global::Feast.CodeAnalysis.CompileTime.Type(ret);
        }

        public override global::System.Type[] GetInterfaces() => Symbol.AllInterfaces.Select(x => (global::System.Type)new global::Feast.CodeAnalysis.CompileTime.Type(x)).ToArray();
        public override bool Equals(global::System.Type o)
        {
            switch (o)
            {
                case null:
                    return false;
                case Type ct:
                    return global::Microsoft.CodeAnalysis.SymbolEqualityComparer.Default.Equals(ct.Symbol, Symbol);
            }

            if (o.FullName != FullName)
                return false;
            return !IsGenericParameter || DeclaringType?.Equals(o.DeclaringType)is true || DeclaringMethod?.Equals(o.DeclaringMethod)is true;
        }

        public override bool IsAssignableFrom(global::System.Type c)
        {
            if (c is null)
                return false;
            if (Equals(c))
                return true;
            switch (this)
            {
                case { IsClass: true }when c.IsClass:
                    return c.IsSubclassOf(this);
                case { IsInterface: true }when c.IsInterface || c.IsClass:
                    return c.GetInterfaces().Any(Equals);
                case { IsGenericParameter: true }:
                    return true;
            }

            return false;
        }

        public override string ToString() => $"{Namespace}.{Name}{(!IsGenericType ? string.Empty : '[' + string.Join(",", GenericTypeArguments.Select(x => x.FullName)) + ']')}";
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.CompileTimeGenerator\Feast.CodeAnalysis.TypeEqualityComparer.g.cs" label="Feast.CodeAnalysis.TypeEqualityComparer.g.cs" >


```csharp showLineNumbers 
using System;

namespace Feast.CodeAnalysis
{
    public partial class TypeEqualityComparer : global::System.Collections.Generic.IEqualityComparer<global::System.Type>
    {
        public bool Equals(global::System.Type x, global::System.Type y) => x is global::Feast.CodeAnalysis.CompileTime.Type ? x.Equals(y) : y is global::Feast.CodeAnalysis.CompileTime.Type ? y.Equals(x) : x.Equals(y);
        public int GetHashCode(global::System.Type obj) => obj is global::Feast.CodeAnalysis.CompileTime.Type type ? type.GetHashCode() : obj.GetHashCode();
        public static global::Feast.CodeAnalysis.TypeEqualityComparer Default { get; } = new();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ExtendedClassGenerator\Feast.CodeAnalysis.GeneratorAttributeSyntaxContext.g.cs" label="Feast.CodeAnalysis.GeneratorAttributeSyntaxContext.g.cs" >


```csharp showLineNumbers 
#if !ROSLYN_4_3_1_OR_GREATER
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.
using System;
using System.Collections.Immutable;

namespace Microsoft.CodeAnalysis.Internal
{
    internal readonly struct GeneratorAttributeSyntaxContext
    {
        /// <summary>
        /// Creates a new <see cref="GeneratorAttributeSyntaxContext"/> instance with the specified parameters.
        /// </summary>
        /// <param name="targetNode">The syntax node the attribute is attached to.</param>
        /// <param name="targetSymbol">The symbol that the attribute is attached to.</param>
        /// <param name="semanticModel">Semantic model for the file that <see cref="TargetNode"/> is contained within.</param>
        /// <param name="attributes">The collection of matching attributes.</param>
        internal GeneratorAttributeSyntaxContext(global::Microsoft.CodeAnalysis.SyntaxNode targetNode, global::Microsoft.CodeAnalysis.ISymbol targetSymbol, global::Microsoft.CodeAnalysis.SemanticModel semanticModel, global::System.Collections.Immutable.ImmutableArray<global::Microsoft.CodeAnalysis.AttributeData> attributes)
        {
            TargetNode = targetNode;
            TargetSymbol = targetSymbol;
            SemanticModel = semanticModel;
            Attributes = attributes;
        }

        /// <summary>
        /// The syntax node the attribute is attached to. For example, with <c>[CLSCompliant] class C { }</c> this would the class declaration node.
        /// </summary>
        public global::Microsoft.CodeAnalysis.SyntaxNode TargetNode { get; }
        /// <summary>
        /// The symbol that the attribute is attached to. For example, with <c>[CLSCompliant] class C { }</c> this would be the <see cref="INamedTypeSymbol"/> for <c>"C"</c>.
        /// </summary>
        public global::Microsoft.CodeAnalysis.ISymbol TargetSymbol { get; }
        /// <summary>
        /// Semantic model for the file that <see cref="TargetNode"/> is contained within.
        /// </summary>
        public global::Microsoft.CodeAnalysis.SemanticModel SemanticModel { get; }
        /// <summary>
        /// <see cref="AttributeData"/>s for any matching attributes on <see cref="TargetSymbol"/>. Always non-empty. All
        /// these attributes will have an <see cref="AttributeData.AttributeClass"/> whose fully qualified name metadata
        /// name matches the name requested in <see cref="SyntaxValueProviderExtensions.ForAttributeWithMetadataName"/>.
        /// <para>
        /// To get the entire list of attributes, use <see cref="ISymbol.GetAttributes"/> on <see cref="TargetSymbol"/>.
        /// </para>
        /// </summary>
        public global::System.Collections.Immutable.ImmutableArray<global::Microsoft.CodeAnalysis.AttributeData> Attributes { get; }
    }
}
#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ExtendedClassGenerator\Feast.CodeAnalysis.Global.g.cs" label="Feast.CodeAnalysis.Global.g.cs" >


```csharp showLineNumbers 
#if !ROSLYN_4_3_1_OR_GREATER
using Microsoft.CodeAnalysis.Internal;
#endif
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ExtendedClassGenerator\Feast.CodeAnalysis.ImmutableArrayBuilder{T}.g.cs" label="Feast.CodeAnalysis.ImmutableArrayBuilder{T}.g.cs" >


```csharp showLineNumbers 
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.
// This file is ported and adapted from ComputeSharp (Sergio0694/ComputeSharp),
// more info in ThirdPartyNotices.txt in the root of the project.
using System;
using System.Buffers;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace Microsoft.CodeAnalysis
{
    internal ref struct ImmutableArrayBuilder<T>
    {
        /// <summary>
        /// The rented <see cref="Writer"/> instance to use.
        /// </summary>
        private global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<T>.Writer writer;
        /// <summary>
        /// Creates a <see cref="ImmutableArrayBuilder{T}"/> value with a pooled underlying data writer.
        /// </summary>
        /// <returns>A <see cref="ImmutableArrayBuilder{T}"/> instance to write data to.</returns>
        public static global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<T> Rent()
        {
            return new(new global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<T>.Writer());
        }

        /// <summary>
        /// Creates a new <see cref="ImmutableArrayBuilder{T}"/> object with the specified parameters.
        /// </summary>
        /// <param name="writer">The target data writer to use.</param>
        private ImmutableArrayBuilder(global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<T>.Writer writer)
        {
            this.writer = writer;
        }

        /// <inheritdoc cref="ImmutableArray{T}.Builder.Count"/>
        public readonly int Count {[MethodImpl(MethodImplOptions.AggressiveInlining)]
            get => this.writer!.Count; }

        /// <summary>
        /// Gets the data written to the underlying buffer so far, as a <see cref="ReadOnlySpan{T}"/>.
        /// </summary>
        [UnscopedRef]
        public readonly global::System.ReadOnlySpan<T> WrittenSpan {[MethodImpl(MethodImplOptions.AggressiveInlining)]
            get => this.writer!.WrittenSpan; }

        /// <inheritdoc cref="ImmutableArray{T}.Builder.Add(T)"/>
        public readonly void Add(T item)
        {
            this.writer!.Add(item);
        }

        /// <summary>
        /// Adds the specified items to the end of the array.
        /// </summary>
        /// <param name="items">The items to add at the end of the array.</param>
        public readonly void AddRange(scoped global::System.ReadOnlySpan<T> items)
        {
            this.writer!.AddRange(items);
        }

        /// <inheritdoc cref="ImmutableArray{T}.Builder.ToImmutable"/>
        public readonly global::System.Collections.Immutable.ImmutableArray<T> ToImmutable()
        {
            T[] array = this.writer!.WrittenSpan.ToArray();
            return global::System.Runtime.CompilerServices.Unsafe.As<T[], global::System.Collections.Immutable.ImmutableArray<T>>(ref array);
        }

        /// <inheritdoc cref="ImmutableArray{T}.Builder.ToArray"/>
        public readonly T[] ToArray()
        {
            return this.writer!.WrittenSpan.ToArray();
        }

        /// <summary>
        /// Gets an <see cref="IEnumerable{T}"/> instance for the current builder.
        /// </summary>
        /// <returns>An <see cref="IEnumerable{T}"/> instance for the current builder.</returns>
        /// <remarks>
        /// The builder should not be mutated while an enumerator is in use.
        /// </remarks>
        public readonly global::System.Collections.Generic.IEnumerable<T> AsEnumerable()
        {
            return this.writer!;
        }

        /// <inheritdoc/>
        public readonly override string ToString()
        {
            return this.writer!.WrittenSpan.ToString();
        }

        /// <inheritdoc cref="IDisposable.Dispose"/>
        public void Dispose()
        {
            global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<T>.Writer writer = this.writer;
            this.writer = null;
            writer?.Dispose();
        }

        /// <summary>
        /// A class handling the actual buffer writing.
        /// </summary>
        private sealed class Writer : global::System.Collections.Generic.ICollection<T>, global::System.IDisposable
        {
            /// <summary>
            /// The underlying <typeparamref name="T"/> array.
            /// </summary>
            private T[] array;
            /// <summary>
            /// The starting offset within <see cref="array"/>.
            /// </summary>
            private int index;
            /// <summary>
            /// Creates a new <see cref="Writer"/> instance with the specified parameters.
            /// </summary>
            public Writer()
            {
                this.array = global::System.Buffers.ArrayPool<T>.Shared.Rent(typeof(T) == typeof(char) ? 1024 : 8);
                this.index = 0;
            }

            /// <inheritdoc cref="ImmutableArrayBuilder{T}.Count"/>
            public int Count {[MethodImpl(MethodImplOptions.AggressiveInlining)]
                get => this.index; }
            /// <inheritdoc cref="ImmutableArrayBuilder{T}.WrittenSpan"/>
            public global::System.ReadOnlySpan<T> WrittenSpan {[MethodImpl(MethodImplOptions.AggressiveInlining)]
                get => new(this.array!, 0, this.index); }

            bool ICollection<T>.IsReadOnly => true;

            /// <inheritdoc cref="ImmutableArrayBuilder{T}.Add"/>
            public void Add(T value)
            {
                EnsureCapacity(1);
                this.array![this.index++] = value;
            }

            /// <inheritdoc cref="ImmutableArrayBuilder{T}.AddRange"/>
            public void AddRange(global::System.ReadOnlySpan<T> items)
            {
                EnsureCapacity(items.Length);
                items.CopyTo(this.array.AsSpan(this.index)!);
                this.index += items.Length;
            }

            /// <inheritdoc/>
            public void Dispose()
            {
                T[] array = this.array;
                this.array = null;
                if (array is not null)
                {
                    global::System.Buffers.ArrayPool<T>.Shared.Return(array, clearArray: typeof(T) != typeof(char));
                }
            }

            void ICollection<T>.Clear()
            {
                throw new global::System.NotSupportedException();
            }

            bool ICollection<T>.Contains(T item)
            {
                throw new global::System.NotSupportedException();
            }

            void ICollection<T>.CopyTo(T[] array, int arrayIndex)
            {
                global::System.Array.Copy(this.array!, 0, array, arrayIndex, this.index);
            }

            global::System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator()
            {
                T[] array = this.array!;
                int length = this.index;
                for (int i = 0; i < length; i++)
                {
                    yield return array[i]!;
                }
            }

            global::System.Collections.IEnumerator IEnumerable.GetEnumerator()
            {
                return ((global::System.Collections.Generic.IEnumerable<T>)this).GetEnumerator();
            }

            bool ICollection<T>.Remove(T item)
            {
                throw new global::System.NotSupportedException();
            }

            /// <summary>
            /// Ensures that <see cref="array"/> has enough free space to contain a given number of new items.
            /// </summary>
            /// <param name="requestedSize">The minimum number of items to ensure space for in <see cref="array"/>.</param>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            private void EnsureCapacity(int requestedSize)
            {
                if (requestedSize > this.array!.Length - this.index)
                {
                    ResizeBuffer(requestedSize);
                }
            }

            /// <summary>
            /// Resizes <see cref="array"/> to ensure it can fit the specified number of new items.
            /// </summary>
            /// <param name="sizeHint">The minimum number of items to ensure space for in <see cref="array"/>.</param>
            [MethodImpl(MethodImplOptions.NoInlining)]
            private void ResizeBuffer(int sizeHint)
            {
                int minimumSize = this.index + sizeHint;
                T[] oldArray = this.array!;
                T[] newArray = global::System.Buffers.ArrayPool<T>.Shared.Rent(minimumSize);
                global::System.Array.Copy(oldArray, newArray, this.index);
                this.array = newArray;
                global::System.Buffers.ArrayPool<T>.Shared.Return(oldArray, clearArray: typeof(T) != typeof(char));
            }
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ExtendedClassGenerator\Feast.CodeAnalysis.SyntaxValueProviderExtensions.g.cs" label="Feast.CodeAnalysis.SyntaxValueProviderExtensions.g.cs" >


```csharp showLineNumbers 
#if !ROSLYN_4_3_1_OR_GREATER
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.
using System.Threading;
using System;
using System.Collections.Immutable;

namespace Microsoft.CodeAnalysis
{
    internal static class SyntaxValueProviderExtensions
    {
        /// <summary>
        /// Creates an <see cref="IncrementalValuesProvider{T}"/> that can provide a transform over all <see
        /// cref="SyntaxNode"/>s if that node has an attribute on it that binds to a <see cref="INamedTypeSymbol"/> with the
        /// same fully-qualified metadata as the provided <paramref name="fullyQualifiedMetadataName"/>. <paramref
        /// name="fullyQualifiedMetadataName"/> should be the fully-qualified, metadata name of the attribute, including the
        /// <c>Attribute</c> suffix.  For example <c>"System.CLSCompliantAttribute</c> for <see cref="CLSCompliantAttribute"/>.
        /// </summary>
        /// <param name="syntaxValueProvider">The source <see cref="SyntaxValueProvider"/> instance to use.</param>
        /// <param name="fullyQualifiedMetadataName">The fully qualified metadata name of the attribute to look for.</param>
        /// <param name="predicate">A function that determines if the given <see cref="SyntaxNode"/> attribute target (<see
        /// cref="GeneratorAttributeSyntaxContext.TargetNode"/>) should be transformed.  Nodes that do not pass this
        /// predicate will not have their attributes looked at at all.</param>
        /// <param name="transform">A function that performs the transform. This will only be passed nodes that return <see
        /// langword="true"/> for <paramref name="predicate"/> and which have a matching <see cref="AttributeData"/> whose
        /// <see cref="AttributeData.AttributeClass"/> has the same fully qualified, metadata name as <paramref
        /// name="fullyQualifiedMetadataName"/>.</param>
        public static global::Microsoft.CodeAnalysis.IncrementalValuesProvider<T> ForAttributeWithMetadataName<T>(this global::Microsoft.CodeAnalysis.SyntaxValueProvider syntaxValueProvider, string fullyQualifiedMetadataName, global::System.Func<global::Microsoft.CodeAnalysis.SyntaxNode, global::System.Threading.CancellationToken, bool> predicate, global::System.Func<global::Microsoft.CodeAnalysis.Internal.GeneratorAttributeSyntaxContext, global::System.Threading.CancellationToken, T> transform)
        {
            return syntaxValueProvider.CreateSyntaxProvider(predicate, (context, token) =>
            {
                ISymbol? symbol = context.SemanticModel.GetDeclaredSymbol(context.Node, token);
                // If the syntax node doesn't have a declared symbol, just skip this node. This would be
                // the case for eg. lambda attributes, but those are not supported by the MVVM Toolkit.
                if (symbol is null)
                {
                    return null;
                }

                // Skip symbols without the target attribute
                if (!symbol.TryGetAttributeWithFullyQualifiedMetadataName(fullyQualifiedMetadataName, out AttributeData? attributeData))
                {
                    return null;
                }

                // Edge case: if the symbol is a partial method, skip the implementation part and only process the partial method
                // definition. This is needed because attributes will be reported as available on both the definition and the
                // implementation part. To avoid generating duplicate files, we only give priority to the definition part.
                // On Roslyn 4.3+, ForAttributeWithMetadataName will already only return the symbol the attribute was located on.
                if (symbol is IMethodSymbol { IsPartialDefinition: false, PartialDefinitionPart: not null })
                {
                    return null;
                }

                // Create the GeneratorAttributeSyntaxContext value to pass to the input transform. The attributes array
                // will only ever have a single value, but that's fine with the attributes the various generators look for.
                global::Microsoft.CodeAnalysis.Internal.GeneratorAttributeSyntaxContext syntaxContext = new(targetNode: context.Node, targetSymbol: symbol, semanticModel: context.SemanticModel, attributes: ImmutableArray.Create(attributeData));
                return new Option<T>(transform(syntaxContext, token));
            }).Where(static item => item is not null).Select(static (item, _) => item!.Value)!;
        }

        /// <summary>
        /// A simple record to wrap a value that might be missing.
        /// </summary>
        /// <typeparam name="T">The type of values to wrap</typeparam>
        /// <param name="Value">The wrapped value, if it exists.</param>
        private sealed record Option<T>(T? Value);
    }
}
#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ISymbolExtensionsGenerator\Feast.CodeAnalysis.ISymbolExtensions.g.cs" label="Feast.CodeAnalysis.ISymbolExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using Feast.CodeAnalysis;

namespace Microsoft.CodeAnalysis
{
    internal static class ISymbolExtensions
    {
        public static bool Is(this global::Microsoft.CodeAnalysis.ISymbol symbol, global::Microsoft.CodeAnalysis.ISymbol other) => global::Microsoft.CodeAnalysis.SymbolEqualityComparer.Default.Equals(symbol, other);
        public static string GlobalName(this global::Microsoft.CodeAnalysis.ISymbol symbol) => symbol.ToDisplayString(global::Microsoft.CodeAnalysis.SymbolDisplayFormat.FullyQualifiedFormat);
        public static string GetFullyQualifiedName(this global::Microsoft.CodeAnalysis.ISymbol symbol) => symbol.ToDisplayString(global::Microsoft.CodeAnalysis.SymbolDisplayFormat.FullyQualifiedFormat);
        public static bool IsInitOnly(this global::Microsoft.CodeAnalysis.IPropertySymbol symbol) => !symbol.IsReadOnly && symbol.SetMethod!.IsInitOnly;
        public static global::System.Collections.Generic.IEnumerable<global::Microsoft.CodeAnalysis.CSharp.SyntaxKind> GetSyntaxKind(this global::Microsoft.CodeAnalysis.Accessibility accessibility)
        {
            switch (accessibility)
            {
                case global::Microsoft.CodeAnalysis.Accessibility.Public:
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.PublicKeyword;
                    yield break;
                case global::Microsoft.CodeAnalysis.Accessibility.Protected:
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.ProtectedKeyword;
                    yield break;
                case global::Microsoft.CodeAnalysis.Accessibility.Internal:
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.InternalKeyword;
                    yield break;
                case global::Microsoft.CodeAnalysis.Accessibility.Private:
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.PrivateKeyword;
                    yield break;
                case global::Microsoft.CodeAnalysis.Accessibility.ProtectedOrInternal:
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.ProtectedKeyword;
                    yield return global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.InternalKeyword;
                    yield break;
                default:
                    throw new global::System.ArgumentOutOfRangeException(nameof(accessibility), accessibility, null);
            }
        }

#if !ROSLYN_4_3_1_OR_GREATER
        /// <summary>
        /// Tries to get an attribute with the specified fully qualified metadata name.
        /// </summary>
        /// <param name="symbol">The input <see cref="ISymbol"/> instance to check.</param>
        /// <param name="name">The attribute name to look for.</param>
        /// <param name="attributeData">The resulting attribute, if it was found.</param>
        /// <returns>Whether or not <paramref name="symbol"/> has an attribute with the specified name.</returns>
        public static bool TryGetAttributeWithFullyQualifiedMetadataName(this global::Microsoft.CodeAnalysis.ISymbol symbol, string name, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out global::Microsoft.CodeAnalysis.AttributeData attributeData)
        {
            foreach (var attribute in symbol.GetAttributes())
            {
                if (attribute.AttributeClass?.HasFullyQualifiedMetadataName(name) == true)
                {
                    attributeData = attribute;
                    return true;
                }
            }

            attributeData = null;
            return false;
        }
#endif
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.ITypeSymbolExtensionsGenerator\Feast.CodeAnalysis.ITypeSymbolExtensions.g.cs" label="Feast.CodeAnalysis.ITypeSymbolExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Microsoft.CodeAnalysis
{
    internal static class ITypeSymbolExtensions
    {
        /// <summary>
        /// Checks whether or not a given type symbol has a specified fully qualified metadata name.
        /// </summary>
        /// <param name="symbol">The input <see cref="ITypeSymbol"/> instance to check.</param>
        /// <param name="name">The full name to check.</param>
        /// <returns>Whether <paramref name="symbol"/> has a full name equals to <paramref name="name"/>.</returns>
        public static bool HasFullyQualifiedMetadataName(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol, string name)
        {
            using global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<char> builder = global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<char>.Rent();
            symbol.AppendFullyQualifiedMetadataName(in builder);
            return builder.WrittenSpan.SequenceEqual(name.AsSpan());
        }

        /// <summary>
        /// Appends the fully qualified metadata name for a given symbol to a target builder.
        /// </summary>
        /// <param name="symbol">The input <see cref="ITypeSymbol"/> instance.</param>
        /// <param name="builder">The target <see cref="ImmutableArrayBuilder{T}"/> instance.</param>
        private static void AppendFullyQualifiedMetadataName(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol, in global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<char> builder)
        {
            static void BuildFrom(global::Microsoft.CodeAnalysis.ISymbol? symbol, in global::Microsoft.CodeAnalysis.ImmutableArrayBuilder<global::System.Char> builder)
            {
                switch (symbol)
                {
                    // Namespaces that are nested also append a leading '.'
                    case global::Microsoft.CodeAnalysis.INamespaceSymbol { ContainingNamespace.IsGlobalNamespace: false }:
                        BuildFrom(symbol.ContainingNamespace, in builder);
                        builder.Add('.');
                        builder.AddRange(symbol.MetadataName.AsSpan());
                        break;
                    // Other namespaces (ie. the one right before global) skip the leading '.'
                    case global::Microsoft.CodeAnalysis.INamespaceSymbol { IsGlobalNamespace: false }:
                        builder.AddRange(symbol.MetadataName.AsSpan());
                        break;
                    // Types with no namespace just have their metadata name directly written
                    case global::Microsoft.CodeAnalysis.ITypeSymbol { ContainingSymbol: global::Microsoft.CodeAnalysis.INamespaceSymbol { IsGlobalNamespace: true } }:
                        builder.AddRange(symbol.MetadataName.AsSpan());
                        break;
                    // Types with a containing non-global namespace also append a leading '.'
                    case global::Microsoft.CodeAnalysis.ITypeSymbol { ContainingSymbol: global::Microsoft.CodeAnalysis.INamespaceSymbol namespaceSymbol }:
                        BuildFrom(namespaceSymbol, in builder);
                        builder.Add('.');
                        builder.AddRange(symbol.MetadataName.AsSpan());
                        break;
                    // Nested types append a leading '+'
                    case global::Microsoft.CodeAnalysis.ITypeSymbol { ContainingSymbol: global::Microsoft.CodeAnalysis.ITypeSymbol typeSymbol }:
                        BuildFrom(typeSymbol, in builder);
                        builder.Add('+');
                        builder.AddRange(symbol.MetadataName.AsSpan());
                        break;
                    default:
                        break;
                }
            }

            BuildFrom(symbol, in builder);
        }

        public static T AsNoneErrorType<T>(this T symbol)
            where T : global::Microsoft.CodeAnalysis.ITypeSymbol
        {
            return symbol is global::Microsoft.CodeAnalysis.IErrorTypeSymbol errorTypeSymbol ? (T)errorTypeSymbol.CandidateSymbols.FirstOrDefault()! : (T)symbol;
        }

        public static global::Microsoft.CodeAnalysis.INamespaceOrTypeSymbol AsNoneErrorType(this global::Microsoft.CodeAnalysis.INamespaceOrTypeSymbol symbol)
        {
            return symbol is global::Microsoft.CodeAnalysis.IErrorTypeSymbol errorTypeSymbol ? (global::Microsoft.CodeAnalysis.INamespaceOrTypeSymbol)errorTypeSymbol.CandidateSymbols.FirstOrDefault()! : symbol;
        }

        public static bool IsJsonBool(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol) => symbol.SpecialType == global::Microsoft.CodeAnalysis.SpecialType.System_Boolean;
        public static bool IsJsonNumber(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol) => symbol is { SpecialType: >= global::Microsoft.CodeAnalysis.SpecialType.System_SByte and <= global::Microsoft.CodeAnalysis.SpecialType.System_Single };
        public static bool IsJsonString(this global::Microsoft.CodeAnalysis.ITypeSymbol symbol) => symbol.SpecialType is global::Microsoft.CodeAnalysis.SpecialType.System_String or global::Microsoft.CodeAnalysis.SpecialType.System_Char;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.LiteralGenerator.LiteralGenerator\LiteralAttribute.g.cs" label="LiteralAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable
using System;
namespace System
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct | global::System.AttributeTargets.Interface | global::System.AttributeTargets.Enum | global::System.AttributeTargets.Delegate)]
    public class LiteralAttribute : Attribute
    {
        public string? FieldName { get; set; }
    
        public LiteralAttribute(string belongToFullyQualifiedClassName){ }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.LiteralGenerator.LiteralGenerator\Namespace_Andrei.Class_Ignat.g.cs" label="Namespace_Andrei.Class_Ignat.g.cs" >


```csharp showLineNumbers 
// <auto-generated/> By Feast.CodeAnalysis
#pragma warning disable
#nullable enable
namespace Namespace_Andrei
{
    partial class Class_Ignat
    {
        internal static string Text = """
namespace DemoLit
{
    internal class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
""".Replace("\"^\"\"", "\"\"\"");
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.SyntaxExtensionsGenerator\Feast.CodeAnalysis.SyntaxExtensions.g.cs" label="Feast.CodeAnalysis.SyntaxExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using Feast.CodeAnalysis;

namespace Microsoft.CodeAnalysis
{
    internal static class SyntaxExtensions
    {
        public static global::System.Collections.Generic.IEnumerable<global::Microsoft.CodeAnalysis.CSharp.Syntax.AttributeSyntax> GetAllAttributes(this global::Microsoft.CodeAnalysis.SyntaxNode syntax)
        {
            var attributeLists = syntax switch
            {
                global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax compilationUnitSyntax => compilationUnitSyntax.AttributeLists,
                global::Microsoft.CodeAnalysis.CSharp.Syntax.MemberDeclarationSyntax memberDeclarationSyntax => memberDeclarationSyntax.AttributeLists,
                global::Microsoft.CodeAnalysis.CSharp.Syntax.LambdaExpressionSyntax lambdaExpressionSyntax => lambdaExpressionSyntax.AttributeLists,
                global::Microsoft.CodeAnalysis.CSharp.Syntax.BaseParameterSyntax baseParameterSyntax => baseParameterSyntax.AttributeLists,
                global::Microsoft.CodeAnalysis.CSharp.Syntax.StatementSyntax statementSyntax => statementSyntax.AttributeLists,
                _ => throw new global::System.NotSupportedException($"{syntax.GetType()} has no attribute")};
            return attributeLists.SelectMany(attributeListSyntax => attributeListSyntax.Attributes);
        }

        public static global::System.Collections.Generic.IEnumerable<global::Microsoft.CodeAnalysis.CSharp.Syntax.AttributeSyntax> GetSpecifiedAttributes(this global::Microsoft.CodeAnalysis.SyntaxNode syntax, global::Microsoft.CodeAnalysis.SemanticModel semanticModel, string fullAttributeName, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
        {
            foreach (var attributeSyntax in syntax.GetAllAttributes())
            {
                if (cancellationToken.IsCancellationRequested)
                    yield break;
                if (semanticModel.GetSymbolInfo(attributeSyntax, cancellationToken).Symbol is not global::Microsoft.CodeAnalysis.IMethodSymbol attributeSymbol)
                    continue;
                string attributeName = attributeSymbol.ContainingType.ToDisplayString();
                if (attributeName == fullAttributeName)
                    yield return attributeSyntax;
            }
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.AttributeSyntax GetSpecifiedAttribute(this global::Microsoft.CodeAnalysis.SyntaxNode syntax, global::Microsoft.CodeAnalysis.SemanticModel semanticModel, string fullAttributeName, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
        {
            foreach (var attributeSyntax in syntax.GetSpecifiedAttributes(semanticModel, fullAttributeName, cancellationToken))
            {
                return attributeSyntax;
            }

            return null;
        }

        public static bool HasSpecifiedAttribute(this global::Microsoft.CodeAnalysis.CSharp.Syntax.MemberDeclarationSyntax syntax, global::Microsoft.CodeAnalysis.SemanticModel semanticModel, string fullAttributeName)
        {
            return syntax.GetSpecifiedAttribute(semanticModel, fullAttributeName)is not null;
        }

        public static string GetArgumentString(this global::Microsoft.CodeAnalysis.CSharp.Syntax.AttributeArgumentSyntax syntax)
        {
            if (syntax.Expression is not global::Microsoft.CodeAnalysis.CSharp.Syntax.LiteralExpressionSyntax literalExpressionSyntax)
                return null;
            if (!literalExpressionSyntax.IsKind(global::Microsoft.CodeAnalysis.CSharp.SyntaxKind.StringLiteralExpression))
                return null;
            return literalExpressionSyntax.Token.ValueText;
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.TypeSyntax GetArgumentType(this global::Microsoft.CodeAnalysis.CSharp.Syntax.AttributeArgumentSyntax syntax)
        {
            if (syntax.Expression is not global::Microsoft.CodeAnalysis.CSharp.Syntax.TypeOfExpressionSyntax typeOfExpression)
                return null;
            return typeOfExpression.Type;
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax ToNameSyntax(this string text, int offset = 0, bool consumeFullText = true)
        {
            return global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ParseName(text, offset, consumeFullText);
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.NamespaceDeclarationSyntax ToNamespaceDeclaration(this global::Microsoft.CodeAnalysis.CSharp.Syntax.NameSyntax syntax)
        {
            return global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.NamespaceDeclaration(syntax);
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax ToClassDeclaration(this string identifier)
        {
            return global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ClassDeclaration(identifier);
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax AddMembers(this global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax syntax, params string[] members)
        {
            return syntax.AddMembers(members.Select(x => global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ParseMemberDeclaration(x) ?? throw new global::System.Exception($"Text : {x} , Parse failed")).ToArray());
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax AddMembers(this global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax syntax, params string[] members)
        {
            return syntax.AddMembers(members.Select(x => global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ParseMemberDeclaration(x) ?? throw new global::System.Exception($"Text : {x} , Parse failed")).ToArray());
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax AddUsings(this global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax syntax, params string[] usings)
        {
            return syntax.AddUsings(usings.Select(x => global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.UsingDirective(global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ParseName(x))).ToArray());
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax AddNamespace(this global::Microsoft.CodeAnalysis.CSharp.Syntax.CompilationUnitSyntax syntax, string @namespace)
        {
            return syntax.AddMembers(global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.NamespaceDeclaration(global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.ParseName(@namespace)));
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax AddModifiers(this global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax syntax, params global::Microsoft.CodeAnalysis.CSharp.SyntaxKind[] items)
        {
            return syntax.AddModifiers(items.Select(x => global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.Token(x)).ToArray());
        }

        public static global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax AddBaseListTypes(this global::Microsoft.CodeAnalysis.CSharp.Syntax.ClassDeclarationSyntax syntax, params string[] identifiers)
        {
            return syntax.AddBaseListTypes(identifiers.Select(x => global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.SimpleBaseType(global::Microsoft.CodeAnalysis.CSharp.SyntaxFactory.IdentifierName(x))).ToArray());
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.SourceGenerators\Feast.CodeAnalysis.Generators.TypedConstantGenerator\Feast.CodeAnalysis.TypedConstantExtensions.g.cs" label="Feast.CodeAnalysis.TypedConstantExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace Microsoft.CodeAnalysis
{
    internal static class TypedConstantExtensions
    {
        private static global::System.Type GetElementType(this global::System.Type type)
        {
            return type.IsArray ? type.GetElementType()! : throw new global::System.ArgumentException("type is not an array");
        }

        internal static object GenericList(this global::System.Type type, params object[] values)
        {
            var listType = type.MakeGenericType(type.GetGenericArguments());
            var list = global::System.Activator.CreateInstance(listType);
            var add = listType.GetMethod(nameof(global::System.Collections.Generic.List<object>.Add))!;
            foreach (var value in values)
            {
                add.Invoke(list, new object[] { value });
            }

            return list;
        }

        private static object ToArray(object genericList)
        {
            var toArray = genericList.GetType().GetMethod(nameof(global::System.Collections.Generic.List<object>.ToArray))!;
            return toArray.Invoke(genericList, null);
        }

        public static object GetArgumentValue(this global::Microsoft.CodeAnalysis.TypedConstant constant) => constant.Kind switch
        {
            global::Microsoft.CodeAnalysis.TypedConstantKind.Array => constant.Values.Select(x => x.GetArgumentValue()).ToArray(),
            global::Microsoft.CodeAnalysis.TypedConstantKind.Error => null,
            global::Microsoft.CodeAnalysis.TypedConstantKind.Type => (constant.Value as global::Microsoft.CodeAnalysis.INamedTypeSymbol)?.ToType(),
            _ => constant.Value
        };
        public static object GetArgumentValue(this global::Microsoft.CodeAnalysis.TypedConstant constant, global::System.Type type)
        {
            var value = constant.GetArgumentValue();
            if (!type.IsArray)
                return type.IsEnum ? value == null ? null : global::System.Enum.ToObject(type, (int)value) : value;
            if (value is not object[] arr)
                throw new global::System.ArgumentException("constant is not an array");
            var ret = global::System.Array.CreateInstance(type.GetElementType()!, arr.Length);
            global::System.Array.Copy(arr, ret, arr.Length);
            return ret;
        }

        public static global::Microsoft.CodeAnalysis.INamedTypeSymbol GetArgumentType(this global::Microsoft.CodeAnalysis.TypedConstant constant) => constant.Kind == global::Microsoft.CodeAnalysis.TypedConstantKind.Type ? constant.Value as global::Microsoft.CodeAnalysis.INamedTypeSymbol : throw new global::System.ArgumentException("constant is not a type");
        public static string GetArgumentString(this global::Microsoft.CodeAnalysis.TypedConstant constant) => constant.Kind == global::Microsoft.CodeAnalysis.TypedConstantKind.Primitive ? constant.Value as string : throw new global::System.ArgumentException("constant is not a string");
        public static T GetArgumentEnum<T>(this global::Microsoft.CodeAnalysis.TypedConstant constant)
            where T : global::System.Enum => constant.Kind == global::Microsoft.CodeAnalysis.TypedConstantKind.Enum ? (T)constant.Value : throw new global::System.ArgumentException("constant is not an enum");
        public static T? GetArgumentPrimitive<T>(this global::Microsoft.CodeAnalysis.TypedConstant constant)
            where T : struct => constant.Kind == global::Microsoft.CodeAnalysis.TypedConstantKind.Primitive ? (T? )constant.Value : throw new global::System.ArgumentException("constant is not a primitive");
        public static T[] GetArgumentArray<T>(this global::Microsoft.CodeAnalysis.TypedConstant constant) => constant.Kind == global::Microsoft.CodeAnalysis.TypedConstantKind.Array ? constant.Values.Select(x => (T)x.Value).ToArray() : throw new global::System.ArgumentException("constant is not an array");
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\PolySharp.SourceGenerators\PolySharp.SourceGenerators.PolyfillsGenerator\System.Runtime.CompilerServices.IsExternalInit.g.cs" label="System.Runtime.CompilerServices.IsExternalInit.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable

[assembly: global::System.Runtime.CompilerServices.TypeForwardedTo(typeof(global::System.Runtime.CompilerServices.IsExternalInit))]
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\PolySharp.SourceGenerators\PolySharp.SourceGenerators.PolyfillsGenerator\System.Runtime.CompilerServices.RequiresLocationAttribute.g.cs" label="System.Runtime.CompilerServices.RequiresLocationAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable

[assembly: global::System.Runtime.CompilerServices.TypeForwardedTo(typeof(global::System.Runtime.CompilerServices.RequiresLocationAttribute))]
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project CodeAnalysis ](/sources/CodeAnalysis.zip)

:::


### Share CodeAnalysis 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&quote=CodeAnalysis" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&text=CodeAnalysis:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&title=CodeAnalysis" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&title=CodeAnalysis&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/CodeAnalysis

### In the same category (CodeToString) - 1 other generators


#### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)

