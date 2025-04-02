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
