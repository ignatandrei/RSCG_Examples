# JsonPolymorphicGenerator
c# / .net Source Code Generator for System.Text.Json JsonDerivedType attributes on polymorphic classes

## Usage

For this, your base classes need the `partial` and `abstract` key words, and be decorated with `JsonPolymorphic`, and there need to be derived types in that same assembly for this to work.

An example of this is:

```
[JsonPolymorphic]
public abstract partial class BaseClass
{
    public string Property1 { get; set; }
}
```

This will then generate a partial class, that is decorated with the `JsonDerivedType` attribute, and use the class name as the discriminator.

```
[JsonDerivedType(typeof(GoLive.JsonPolymorphicGenerator.Playground.InheritedClass1), "InheritedClass1")]
[JsonDerivedType(typeof(GoLive.JsonPolymorphicGenerator.Playground.InheritedClass2), "InheritedClass2")]
public partial class BaseClass
{
}
```

You can now transform the text of the attributes that gets spat out! You have a number of options, that gets added to an `.editorconfig`, such as:

```
root = true

[*.cs]
jsonpolymorphicgenerator.text_preappend = JSON_
jsonpolymorphicgenerator.text_transform = return classname.GetHashCode().ToString()
jsonpolymorphicgenerator.text_postappend = _A
```

For the `jsonpolymorphicgenerator.text_transform` option, you have to provide valid c# code, that returns a string - there are 2 input variables - `classname` and `namespacename`