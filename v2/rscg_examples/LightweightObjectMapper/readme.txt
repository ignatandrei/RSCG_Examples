# LightweightObjectMapper

## 1. Intro

A out of the box object mapper library based on `SourceGenerator`. 基于 `SourceGenerator` 的开箱即用对象映射库。

## 2. Features

- 开箱即用、无需预配置（Out of the box, no pre-configuration required）
- 无运行库引用（No runtime library reference）
- 映射代码可观察（Observable mapping code）
- 无反射（No Reflection）
- 无Emit或其它动态生成（No emit or other dynamic generations）
- 基于拓展方法实现，不侵入目标类型（Implementation based on extension methods, non intrusive target type）

### Note!!!
 - 基于 `SourceGenerator` 实现，约等价于手写代码，无法实现手写代码不能实现的功能，如：访问私有字段、访问私有构造函数等。
 - 当前不会自动处理嵌套类型映射，需要手动映射嵌套类型后才能正常工作。

## 3. 使用方法

### 3.1 引用包
```xml
<ItemGroup>
  <PackageReference Include="LightweightObjectMapper" Version="1.0.0" />
</ItemGroup>
```

### 3.2 快速使用

无配置文件的使用方式，引用命名空间 `LightweightObjectMapper` ，直接使用拓展方法 `MapTo` 进行映射；

```C#
using LightweightObjectMapper;

class Class1 { }
class Class2 { }
struct Struct1 { }

class1Instance.MapTo<Class2>();
class1Instance.MapTo(class2Instance);

class1Instance.MapTo(ref struct1Instance);

var list1 = new List<Class1>();
list1.MapTo<IEnumerable<Class2>>();
```

### 3.3 配置映射 `MappingProfile`

 - 创建 `MappingProfile` 类：
    ```C#
    [MappingProfile]
    internal partial class SampleMappingProfile
    {
    }
    ```
    - 使用特性 `[MappingProfile]` 标记类型；
    - 将类型声明为 `partial`；

 - 为 `SampleMappingProfile` 实现对应的配置接口：
    - `IMappingPrepare<TIn, TOut>`：映射前准备。用于使用 `TIn` 映射到 `TOut` 时初始化 `TOut`；
    - `IPostMapping<TIn, TOut>`：映射后执行的动作。用于使用 `TIn` 映射到 `TOut` 完成后，执行的后续附加代码；
    - `ITypeMapping<TIn, TOut>`：接管完整的类型映射。（仅非目标实例映射时有效）；
    - `ITypeMemberIgnoreMapping<T>`：类型成员忽略映射声明。声明映射到目标类型 `T` 时，应忽略的 `T` 的成员；

 - 拓展集合映射：
    - 默认支持`T[]`、`List<T>`、`IEnumerable<T>`等基础集合映射；
    - 自定义集合映射：
        - 在 `MappingProfile` 类内部声明任意名称静态方法；
        - 使用特性 `[CollectionMapping]` 标记该方法；
        - 该方法必须包含一个`泛型参数`；
        - 该方法必须有一个参数，且参数类型为 `IEnumerable<泛型参数>`；
        - 该方法的返回值类型必须派生自 `IEnumerable<泛型参数>`；

 - 示例：
 ```C#
using System.Collections.Concurrent;
using System.Collections.Generic;
using LightweightObjectMapper;

namespace MappingProfileSample;

class MyClass1
{
    public int MyProperty1 { get; set; }

    public int MyProperty2 { get; set; }

    public int MyProperty3 { get; set; }
}

class MyClass2
{
    public int MyProperty1 { get; set; }

    public int MyProperty2 { get; set; }

    public int MyProperty3 { get; set; }
}

[MappingProfile]
internal partial class SampleMappingProfile
    : IMappingPrepare<MyClass1, MyClass2>
    , IPostMapping<MyClass1, MyClass2>
    , ITypeMapping<MyClass2, MyClass1>
    , ITypeMemberIgnoreMapping<MyClass2>
{
    public object? IgnoreMapping(MyClass2 target)
    {
        // 映射到 MyClass2 时忽略其 MyProperty2
        return new
        {
            target.MyProperty2,
        };
    }

    public MyClass2 MappingPrepare(MyClass1 source)
    {
        // MyClass1 映射到 MyClass2 时，MyClass2 实例的创建方式
        return new MyClass2()
        {
            MyProperty1 = 1
        };
    }

    public MyClass2 PostMapping(MyClass1 source, MyClass2 target)
    {
        // MyClass1 映射到 MyClass2 时，映射完成后执行的代码
        target.MyProperty1 = source.MyProperty1 * 2;
        return target;
    }

    public MyClass1 TypeMapping(MyClass2 source)
    {
        //接管 MyClass2 到 MyClass1 的映射
        return new MyClass1()
        {
            MyProperty1 = source.MyProperty1 / 2
        };
    }

    [CollectionMapping]
    public static ConcurrentBag<T>? ToList<T>(IEnumerable<T>? items)
    {
        //拓展对 ConcurrentBag 的映射支持
        return items is null ? null : new ConcurrentBag<T>(items);
    }
}
 ```

### 3.4 引入其它程序集内的 `MappingProfile`
跨程序集共享 `MappingProfile`。
 - 将要进行共享的 `MappingProfile` 声明为 `public`；
 - 在需要引用此 `MappingProfile` 的程序集内定义新的 `MappingProfile`，并对其添加特性 `[MappingProfileInclude]` 进行引用；
 - 示例：
 ```C#
 // 引用 InternalMappingProfile 和 InternalMappingProfile1
 [MappingProfileInclude(typeof(InternalMappingProfile), typeof(InternalMappingProfile1))]
 [MappingProfile]
 internal partial class MappingProfileIncludeMapProfile1
 {
 }
 ```

### 4. 其它配置
配置项目的 `Property` 来进行一些特殊配置，示例：
```xml
  <PropertyGroup>
    <!--不添加预生成代码-->
    <NoLightweightObjectMapperPreCodes>true</NoLightweightObjectMapperPreCodes>
    <!--设置生成的拓展方法可访问性-->
    <LOMappingMethodAccessibility>public</LOMappingMethodAccessibility>
  </PropertyGroup>
```
