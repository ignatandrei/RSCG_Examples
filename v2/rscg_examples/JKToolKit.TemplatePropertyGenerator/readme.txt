<!-- # JKToolKit.TemplatePropertyGenerator -->

## Overview

`TemplatePropertyGenerator` is a C# source generator that creates strongly-typed template properties from annotated classes. This allows for easy and safe string formatting by generating classes with methods to format predefined templates.

## Features

- Define template properties with format strings using attributes.
- Auto-generate classes with methods to format the strings.
- Supports FormattableString for more complex formatting needs.

## How to Use

1. **Install the NuGet package:**

	Ensure you have the NuGet package installed in your project. If not, you can install it via the NuGet Package Manager or the .NET CLI.

	```sh
	dotnet add package JKToolKit.TemplatePropertyGenerator
	```

2. **Define your templates:**

   Use the `TemplateProperty` attribute to define your template properties in a partial class. The attribute takes the name of the property and the format string as parameters.

    ```csharp
    [TemplateProperty("Hello", "Hello {value}, {value}!")]
    [TemplateProperty("FooBar", "Foo {value}, Bar {value}")]
    public static partial class Consts
    {
    }
    ```

3. **Use the generated code:**

   Once the generator runs, it will produce a class with properties and methods to format your strings. You can use these in your code as shown below:

   ```csharp
   private static void Main(string[] args)
   {
       Console.WriteLine(Consts.Hello.Template); // Output: Hello {value}, {value}!
       Console.WriteLine(Consts.Hello.Format("World")); // Output: Hello World, World!
	   Console.WriteLine(Consts.FooBar.Format("Foo1", "Bar1")); // Output: Foo Foo1, Bar Bar1
   }
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Source Generators in .NET](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview)
- [Microsoft Roslyn](https://github.com/dotnet/roslyn)
