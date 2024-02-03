Weave <img src="Weave.svg" width="42" height="42" />
=====

Weave is a text templating engine for .NET that is all about attention to detail.  Weave handles the tricky work of making your rendered text beautiful.

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](license.md)
[![Get it on NuGet](https://img.shields.io/nuget/v/Weave.svg?style=flat-square)](http://nuget.org/packages/Weave)

[![Appveyor Build](https://img.shields.io/appveyor/ci/otac0n/Weave.svg?style=flat-square)](https://ci.appveyor.com/project/otac0n/weave)
[![Test Coverage](https://img.shields.io/codecov/c/github/otac0n/Weave.svg?style=flat-square)](https://codecov.io/gh/otac0n/Weave)
[![Pre-release packages available](https://img.shields.io/nuget/vpre/Weave.svg?style=flat-square)](http://nuget.org/packages/Weave)

Getting Started
---------------

The easiest way to get a copy of Weave is to install the [Weave NuGet package](http://nuget.org/packages/Weave) in Visual Studio.

    PM> Install-Package Weave

Due to a limitation in Visual Studio, you will need to reload your project for the 'WeaveTemplate' build action to be recognized.

Once you have the package installed, files in your project marked as 'WeaveTemplate' in the properties window will be compiled to their respective `.weave.cs` template classes before every build.  These template classes will be automatically included in compilation.

For help with template syntax, see [the Syntax Guide wiki entry](https://github.com/otac0n/Weave/wiki/Syntax-Guide)

Example
-------

    @namespace MyProject
    @methodname RenderFizzBuzz
    @model IEnumerable<int>

    {{each i in model}}
        {{if i % 3 == 0 && i % 5 == 0}}
            {{= i }} FizzBuzz
        {{elif i % 3 == 0}}
            {{= i }} Fizz
        {{elif i % 5 == 0}}
            {{= i }} Buzz
        {{else}}
            {{= i }}
        {{/if}}
    {{/each}}

This would generate a static (by default) method named `RenderFizzBuzz` in the `Templates` class (again, by default).  You would use this method like so:

    Templates.RenderFizzBuzz(Enumerable.Range(0, 100), Console.Out);

Any `TextWriter` is supported.  To get the text as a string, use a `StringWriter`.
