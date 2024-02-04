# Automatic Interface

A C# Source Generator to automatically create Interface from classes.

## What does it do?

Not all .NET Interfaces are created equal. Some Interfaces are lovingly handcrafted, e.g. the public interface of your .NET package which is used by your customers. Other interfaces are far from lovingly crafted, they are birthed because you need an interface for testing or for the DI container. They are often implemented only once or twice: The class itself and a mock for testing. They are noise at best and often create lots of friction. Adding a new method / field? You have to edit the interface, too!. Change parameters? Edit the interface. Add documentation? Hopefully you add it to the interface, too!

This Source Generator aims to eliminate this cost by generating an interface from the class, without you needing to do anything.
This interface will be generated on each subsequent build, eliminating the the friction.

## Example

```c#
using AutomaticInterfaceAttribute;
using System;

namespace AutomaticInterfaceExample
{
    /// <summary>
    /// Class Documentation will be copied
    /// </summary>
    [GenerateAutomaticInterface]  // you need to create an Attribute with exactly this name in your solution. You cannot reference Code from the Analyzer.
    class DemoClass: IDemoClass // You Interface will get the Name I+classname, here IDemoclass. 
    // Generics, including constraints are allowed, too. E.g. MyClass<T> where T: class
    {

        /// <summary>
        /// Property Documentation will be copied
        /// </summary>
        public string Hello { get; set; }  // included, get and set are copied to the interface when public

        public string OnlyGet { get; } // included, get and set are copied to the interface when public

        /// <summary>
        /// Method Documentation will be copied
        /// </summary>
        public string AMethod(string x, string y) // included
        {
            return BMethod(x,y);
        }

        private string BMethod(string x, string y) // ignored because not public
        {
            return x + y;
        }
		
        public string CMethod<T, T1, T2, T3, T4>(string? x, string y) // included
            where T : class
            where T1 : struct
            where T3 : DemoClass
            where T4 : IDemoClass
        {
            return "Ok";
        }

        public static string StaticProperty => "abc"; // static property, ignored

        public static string StaticMethod()  // static method, ignored
        {
            return "static" + DateTime.Now;
        }

        /// <summary>
        /// event Documentation will be copied
        /// </summary>

        public event EventHandler ShapeChanged;  // included

        private event EventHandler ShapeChanged2; // ignored because not public

        private readonly int[] arr = new int[100];

        public int this[int index] // currently ignored
        {
            get => arr[index];
            set => arr[index] = value;
        }
    }
}
```

This will create this interface:

```C#
#nullable enable
using System.CodeDom.Compiler;
using AutomaticInterfaceAttribute;
using System;

/// <summary>
/// Result of the generator
/// </summary>
namespace AutomaticInterfaceExample
{
    /// <summary>
    /// Bla bla
    /// </summary>
    [GeneratedCode("AutomaticInterface", "")]
    public partial interface IDemoClass
    {
        /// <summary>
        /// Property Documentation will be copied
        /// </summary>
        string Hello { get; set; }

        string OnlyGet { get; }

        /// <summary>
        /// Method Documentation will be copied
        /// </summary>
        string AMethod(string x, string y);

        string CMethod<T, T1, T2, T3, T4>(string? x, string y) where T : class where T1 : struct where T3 : DemoClass where T4 : IDemoClass;

        /// <summary>
        /// event Documentation will be copied
        /// </summary>
        event System.EventHandler ShapeChanged;

    }
}
#nullable restore
```

## How to use it?

1. Install the nuget: `dotnet add package AutomaticInterface`
2. Create an Attribute with the Name `[GenerateAutomaticInterface]`. You can just copy the minimal code from this Repo (see the `AutomaticInterfaceAttribute` project). It's the easiest way to get that attribute because you cannot reference any code from the analyzer package.
3. Let your class implement the interface, e.g. `SomeClass: ISomeClass`
4. Build Solution, the Interface should now be available.

Any errors? Ping me at: christiian.sauer@codecentric.de

## Troubleshooting

### How can I see the Source code?

Newer Visual Studio Versions (2019+) can see the source code directly:

![alt text](sg_example.png "Example")

Alternatively, the Source Generator generates a log file - look out for a "logs" folder somewhere in bin/debug/... OR your temp folder /logs. The exact location is also reported on Diagnosticlevel Info.

### I have an error

Please create an issue and a minimally reproducible test for the problem. 

PRs are welcome!
Please make sure that you run [CSharpier](https://csharpier.com/) on the code for formatting.

## Contributors

- Thanks to [dnf](https://dominikjeske.github.io/) for creating some great extensions. I use them partially in this Generator. Unfortunately due to problems referencing packages I cannot depend on his packages directly.
- skarllot for PRs
- Frederik91 for PRs
- definitelyokay for PRs

## Run tests

Should be simply a build and run Tests

## Changelog

### 2.1.1

- Fix bug where multiple automatic interfaces caused issues
- Better support for nullable like Task<string?>, previously only top level generic where considered

### 2.0.0

- Major rework to Incremental Source generator
- Fixed some outstanding bugs
- Removed logging, b/c not really used
- Increased coverage

### 1.6.1

 - Minor bug fixes

### 1.5.0

 - Add support nullable context

### 1.4.0

 - Add support for overloaded methods.
 - Add support for optional parameters in method `void test(string x = null)` should now work.
