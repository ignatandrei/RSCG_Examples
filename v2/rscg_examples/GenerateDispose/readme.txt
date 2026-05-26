# GenerateDispose for C#
![GenerateDispose logo](https://raw.githubusercontent.com/ItaiTzur76/GenerateDispose/main/Logo.png)
## Project Description
**GenerateDispose** is a Rosyln-powered generator for the Dispose pattern's boilerplate code.

## Motivation
The purpose of this package is to allow C# developers to replace over 10 lines of boilerplate code with a single attribute when implementing the Dispose pattern, and also make the implemented pattern accommodate itself to future changes in the class modifiers.

## Example
Suppose you have a class like the following:
```cs
public sealed class StreamOfConsciousness : IDisposable
{
    // some field declarations

    // some more stuff
}
```
The IDE would show [a CS0535 error](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/interface-implementation-errors#:~:text=contract%3A-,CS0535%3A,member.) on `IDisposable`.
Selecting [Implement interface with Dispose pattern](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose#implement-the-dispose-pattern) from the _Show potential fixes_ menu would change the class into something like:
```cs
public sealed class StreamOfConsciousness : IDisposable
{
    // some field declarations
    private bool _disposedValue;

    // some more stuff

    private void Dispose(bool disposing)
    {
        if (!_disposedValue)
        {
            if (disposing)
            {
                // TODO: dispose managed state (managed objects)
            }

            _disposedValue = true;
        }
    }

    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }
}
```
(I took the liberty of clearing the snippet above from all comments not directly related to managed state.)

As important as the Dispose pattern may be, it is a textbook example of boilerplate code - the same huge envelope is "stamped" into your code, and you just paste the disposing logic (usually one or two lines) that is the reason you wrote ` : IDisposable` in the first place.

But bloating up your code is not the end of it.

If the original class was _not_ declared as `sealed`, the generated pattern would be exactly the same, except that `Dispose(bool disposing)` would now be `protected virtual` instead of `private`. (That stands to reason because now your class can be extended by other child classes and they might have `Dispose` methods of their own, which must also be called.)

So, if you start out with a `sealed` class having the Dispose pattern and then, at some point in the future, you want to make it non-`sealed` (for example if you want to expose it to external users but find out that keeping it `sealed` would break the _Open/Closed Principle_), you would also have to remember to fiddle around with the Dispose pattern that was generated at some point in the past, and who can remember.

Moreover, if (after adding the Dispose-pattern boilerplate code) you replace `IDisposable` with `MemoryStream` for example (because you just realized that it fits your purposes better) you would start getting compiler messages and have to resolve them all:
1. First you would get [a CS0108 warning](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0108) on the `Dispose()` method (because it now hides the same method in `MemoryStream`) and [a CA1816 warning](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1816) on the `GC.SuppressFinalize(this)` call inside it. To resolve that you would have to manually remove the `Dispose()` method entirely.
2. You would also get [a CS0114 warning](https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0114) on the `Dispose(bool disposing)` method because now it, too, hides the same method inherited from `MemoryStream`. To resolve that you would have to manually make this method `protected override`.
3. Having done that, you would now get [a CA2215 warning](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2215) on the same method. To resolve that you would have to manually add a `base.Dispose(disposing);` call to the end of this method.

That is a lot of redundant manual work for simply maintaining the boilerplate code that takes up room in your codebase anyway.

And that is where this source-generator comes in. Consider the following rephrase:
```cs
[GenerateDispose(nameof(DisposeImpl))]
public sealed partial class StreamOfConsciousness : IDisposable
{
    // some field declarations

    private void DisposeImpl()
    {
        // TODO: dispose managed state (managed objects)
    }

    // some more stuff
}
```
This is almost identical to the original snippet, except a method that handles the disposal has been added (I called it `DisposeImpl` but you can call it however you want) and a `GenerateDispose` attribute has been added to the class (now also made `partial`), with the `nameof` that disposal-method as its only argument.

And that's it. All the boilerplate code is generated and handled out of view, and accommodates itself to changes such as `sealed` changes or `IDisposable` parent classes. (You can see that even the ` : IDisposable` suffix of the class declaration line is not necessary anymore.) You end up with code that is much more focused on your core business, with a lot less clutter. Just make sure the disposing method (`DisposeImpl` in this example) is one that can be called without providing any arguments, and you're good.

If you want to see the members generated for the currently edited class – namely two `public void Dispose` methods and a `private int _isDisposed` field – you can find them (as grayed-out) in the member drop-down list of the navigation bar.

## Requirements
**SDK**: [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) and up. (Use `dotnet --version`, `dotnet --info` or [any other way](https://learn.microsoft.com/en-us/dotnet/core/install/how-to-detect-installed-versions) to retrieve the .NET version you have installed.)

## Install and Setup
To use **GenerateDispose**, include its package in your C# project by either following the package installation command (for your tool of choice) in [the **GenerateDispose** NuGet package](https://www.NuGet.org/packages/GenerateDispose) page, or searching for (and installing) it via the _NuGet Package Manager_.

It is recommended you [manage your packages centrally](https://DevBlogs.microsoft.com/dotnet/introducing-central-package-management), either manually or by following the package installation command for CPM in the NuGet package page. If you do that, you can make **GenerateDispose** available in all projects of your solution by adding the following to an `ItemGroup` element in [your Directory.Build.props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory) instead of in each project separately:
```xml
<PackageReference Include="GenerateDispose" PrivateAssets="all" IncludeAssets="analyzers" />
```
It is then also recommended you add the following to [your Directory.Build.props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory):
```xml
<ItemGroup>
  <Using Include="GenerateDispose.SourceGenerators" />
</ItemGroup>
```
## Acknowledgement
Special thanks go to [Yehuda Arkin Adar](https://GitHub.com/YudApps) without whose experience, professional advice and reviews this generator could not have been implemented with the quality it has today.

The logo of this project was designed by the very skilled [@_duck_pie](https://www.instagram.com/_duck_pie).

Happy coding!