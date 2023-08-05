<p align="center">
    <img src="https://user-images.githubusercontent.com/36799941/191375272-27b0034d-0418-44a6-95c6-802b863de2b3.svg" width="242" height="242" />
</p>
<p align="center">
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/>
    </a>
    <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/DedAnton/NextGenMapper?include_prereleases" />
    <a href="https://vk.com/away.php?utf=1&to=https%3A%2F%2Fwww.tinkoff.ru%2Fcf%2F3ySZ9DEsxfL">
        <img src="https://img.shields.io/badge/%24-donate-9cf" alt="donate" />
    </a>
    <h4 align="center">Extremely fast and lightweight minimalistic object mapper generated on the fly</h4>
</p>

https://user-images.githubusercontent.com/36799941/191618500-31f7e179-3510-49dc-ad13-18e07de8309b.mov

# Key features
- Generation of mapping methods on the fly
- Reflection and expression trees are not used
- Performance like a hand-written mapper
- Minimum memory allocation
- Does not increase application startup time
- No dependencies in the final assembly
- No third party tools and IDE dependencies
- Static analysis support
- Code navigation support
- Easy to debug
- No attributes and fluid API

NextGenMapper is a tool that just solves a problem and tries not to create new ones

# Usage

Add `using NextGenMapper` and call the `Map` extension method on the object you want to map
```c#
using NextGenMapper;

var source = new Source("Anton", 25);

var destination = source.Map<Destination>();

Console.WriteLine(destination);

record Source(string Name, int Age);
record Destination(string Name, int Age);
```
<br />

To customize the mapping of certain properties, call the `MapWith` method and pass the value of the overridden property as an argument
```c#
using NextGenMapper;

var source = new Source("Anton", "Ryabchikov", 25);

var destination = source.MapWith<Destination>(name: source.FirstName + ' ' + source.LastName);

Console.WriteLine(destination);

record Source(string FirstName, string LastName, int Age);
record Destination(string Name, int Age);
```
<br />

In order for NextGenMapper to use your mapping when mapping other objects, you need to create a partial class `Mapper` in the `NextGenMapper` namespace and add the `Map` method with your implementation to it
```c#
namespace NextGenMapper;

internal static partial class Mapper
{
    internal static Destination Map<To>(this Source source) 
        => source.MapWith<Destination>(name: source.FirstName + ' ' + source.LastName);
}
```
<br />

The following collection types are currently supported: `List<T>`, `Array<T>`, `ICollection<T>`, `IEnumerable<T>`, `IList<T>`, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`, `ImmutableArray<T>`, `ImmutableList<T>`, `IImmutableList<T>`
```c#
var sourceCollection = new List<Source> { new("Anton", 25) };

var destination = sourceCollection.Map<List<Destination>>();
```
<br />

Enums can also be mapped
```c#
var source = Source.EnumValue;

var destination = source.Map<Destination>();
```
<br />

Projection for IQueryable supported
```c#
_dbContext.Users.Project<UserDestination>().ToList();
```
<br />

> **Note**: 
> Due to the use of new technology, some versions of Visual Studio can sometimes experience problems with syntax highlighting if IntelliCode says an error, but the solution was build without errors is to simply restart Visual Studio
### Installation

Install from the package manager console:
```
PM> Install-Package NextGenMapper -prerelease
```
Or from the .NET CLI as:
```
dotnet add package NextGenMapper --prerelease
```

# How it works?
NextGenMapper uses the new C# language feature - [Source Code Generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/). You can describe the work of the Source Code Generator in the following steps:
1. Code compiles
2. The source code generator analyzes the assembly
3. Generates new code based on analysis
4. Compiles the new code and adds it to the assembly

This is how the method that is called initially looks like:
```C#
internal static To Map<To>(this object source) => throw new InvalidOperationException($""Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function."");
```

When we call it, the generator analyzes this call and generates a mapping function:
```C#
internal static Destination Map<To>(this Source source) 
    => new Destination(source.Name, source.Age);
```

The trick is that the method signatures are identical, but the generated method has more specific parameters and fits better, so it is called ([this behavior is described in the specification](https://github.com/dotnet/csharplang/blob/a4c9db9a69ae0d1334ed5675e8faca3b7574c0a1/spec/expressions.md#better-function-member))

# Status
At the moment, all the main functionality has been added. But the work isn't over yet.

All tasks and their progress can be viewed on the [project board](https://github.com/users/DedAnton/projects/3)
