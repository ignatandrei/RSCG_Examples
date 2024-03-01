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