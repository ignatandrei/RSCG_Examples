---
sidebar_position: 170
title: 17 - RazorBlade
description: Fast templating with Razor syntax
slug: /RazorBlade
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RazorBlade  by Lucas Trzesniewski


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RazorBlade?label=RazorBlade)](https://www.nuget.org/packages/RazorBlade/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ltrzesniewski/RazorBlade?label=updated)](https://github.com/ltrzesniewski/RazorBlade)
![GitHub Repo stars](https://img.shields.io/github/stars/ltrzesniewski/RazorBlade?style=social)

## Details

### Info
:::info

Name: **RazorBlade**

Compile Razor templates at build-time without a dependency on ASP.NET.

Author: Lucas Trzesniewski

NuGet: 
*https://www.nuget.org/packages/RazorBlade/*   


You can find more details at https://github.com/ltrzesniewski/RazorBlade

Source : https://github.com/ltrzesniewski/RazorBlade

:::

### Original Readme
:::note

# RazorBlade                       

[![Build](https://github.com/ltrzesniewski/RazorBlade/workflows/Build/badge.svg)](https://github.com/ltrzesniewski/RazorBlade/actions?query=workflow%3ABuild)
[![NuGet package](https://img.shields.io/nuget/v/RazorBlade.svg?logo=NuGet)](https://www.nuget.org/packages/RazorBlade)
[![GitHub release](https://img.shields.io/github/release/ltrzesniewski/RazorBlade.svg?logo=GitHub)](https://github.com/ltrzesniewski/RazorBlade/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ltrzesniewski/RazorBlade/blob/master/LICENSE)

*The sharpest part of the razor.*

Compile Razor templates at build-time without a dependency on ASP.NET.

## Usage

This package will generate a template class for every `.cshtml` file in your project.

The generated classes will inherit from `RazorBlade.HtmlTemplate` by default, though it is advised to specify the base class explicitly to get the best IDE experience:

````Razor
@inherits RazorBlade.HtmlTemplate
````

A version with a model is also available for convenience. The following will add a `Model` property and a constructor with a `TModel` parameter:

```Razor
@inherits RazorBlade.HtmlTemplate<TModel>
```

Further [documentation](#Documentation) is provided below.

## Example

The following template, in the `TestTemplate.cshtml` file:

```Razor
@inherits RazorBlade.HtmlTemplate

Hello, <i>@Name</i>!

@functions
{
    public string? Name { get; set; }
}
```

Will generate the following class in your project:

```C#
internal partial class TestTemplate : RazorBlade.HtmlTemplate
{
    // ...
    public string? Name { get; set; }
    // ...
}
```

That you can use like the following:

```C#
var template = new TestTemplate
{
    Name = "World"
};

var result = template.Render();
```

### With a model

A similar template with a model would be:

```Razor
@using MyApplication.Models
@inherits RazorBlade.HtmlTemplate<GreetingModel>

Hello, <i>@Model.Name</i>!
```

Instantiating the generated class requires a model argument:

```C#
var model = new GreetingModel { Name = "World" };
var template = new TestTemplate(model);
var result = template.Render();
```

## Documentation

### Base template classes

For HTML templates, specify one of the following base classes with an `@inherits` directive:

- `RazorBlade.HtmlTemplate`
- `RazorBlade.HtmlTemplate<TModel>`

If you'd like to write a plain text template (which never escapes HTML), the following classes are available:

- `RazorBlade.PlainTextTemplate`
- `RazorBlade.PlainTextTemplate<TModel>`

They all derive from `RazorBlade.RazorTemplate`, which provides the base functionality.

You can also write your own base classes. Marking a constructor with `[TemplateConstructor]` will forward it to the generated template class. 

### Writing templates

HTML escaping can be avoided by using the `@Html.Raw(value)` method, just like in ASP.NET. The `IEncodedContent` interface represents content which does not need to be escaped. The `HtmlString` class is a simple implementation of this interface.

Templates can be included in other templates by evaluating them, since they implement `IEncodedContent`. For instance, a `Footer` template can be included by writing `@(new Footer())`. Remember to always create a new instance of the template to include, even if it doesn't contain custom code, as templates are stateful and not thread-safe.

The namespace of the generated class can be customized with the `@namespace` directive. The default value is deduced from the file location.

### Executing templates

The `RazorTemplate` base class provides `Render` and `RenderAsync` methods to execute the template.

Templates are stateful and not thread-safe, so it is advised to always create new instances of the templates to render.

### MSBuild

The source generator will process `RazorBlade` MSBuild items which have the `.cshtml` file extension.

By default, all `.cshtml` files are included, unless one of the `EnableDefaultRazorBladeItems` or `EnableDefaultItems` properties are set to `false`. You can also manually customize this set.

### Removing the dependency on RazorBlade

RazorBlade makes it possible to remove the dependency on its runtime assembly. This could be useful for library projects which should be self-contained, with no dependencies on external packages.

This mode is enabled by default when the `PackageReference` of RazorBlade has the `PrivateAssets="all"` attribute. In order to avoid compilation warnings, the assembly reference also needs to be explicitly excluded with `ExcludeAssets="compile;runtime"`.

```XML
<PackageReference Include="RazorBlade" Version="..." ExcludeAssets="compile;runtime" PrivateAssets="all" />
```

A source generator will then embed an `internal` version of the RazorBlade library in the target project. This behavior can also be controlled by setting the `RazorBladeEmbeddedLibrary` MSBuild property to `true` or `false`.


:::

### About
:::note

Fast templating with Razor syntax


Do not forget to put into AdditionalFiles section of csproj file


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RazorBlade**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="RazorBlade" Version="0.4.3" PrivateAssets="all" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
	</ItemGroup>
	<ItemGroup>
		<AdditionalFiles Include="PersonDisplay.cshtml" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\Program.cs" label="Program.cs" >

  This is the use of **RazorBlade** in *Program.cs*

```csharp showLineNumbers 
using RazorBladeDemo;

Console.WriteLine("Hello, World!");
Person p = new();
p.FirstName= "Andrei";
p.LastName = "Ignat";


var template = new PersonDisplay(p);
var result = template.Render();
Console.WriteLine(result);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\Person.cs" label="Person.cs" >

  This is the use of **RazorBlade** in *Person.cs*

```csharp showLineNumbers 
namespace RazorBladeDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return FirstName + " "+LastName;
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml" label="PersonDisplay.cshtml" >

  This is the use of **RazorBlade** in *PersonDisplay.cshtml*

```csharp showLineNumbers 
@using RazorBladeDemo;
@inherits RazorBlade.HtmlTemplate<Person>;

This is the @Model.FirstName @Model.LastName

<br />

This should be full name of @Model.FullName()
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\Attributes.g.cs" label="Attributes.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System;

namespace RazorBlade.Support;

/// <summary>
/// Specifies that this constructor needs to be provided by the generated template class.
/// </summary>
[AttributeUsage(AttributeTargets.Constructor)]
internal sealed class TemplateConstructorAttribute : Attribute
{
}

/// <summary>
/// Specifies if a method should be used depending on the template being sync or async.
/// </summary>
[AttributeUsage(AttributeTargets.Method)]
internal sealed class ConditionalOnAsyncAttribute : Attribute
{
    /// <summary>
    /// The message to display.
    /// </summary>
    public string? Message { get; set; }

    /// <summary>
    /// Marks a method as meant to be used in a sync or async template.
    /// </summary>
    /// <param name="async">True for methods meant to be used in async templates, and false for methods meant to be used for sync templates.</param>
    public ConditionalOnAsyncAttribute(bool async)
    {
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\HtmlHelper.g.cs" label="HtmlHelper.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace RazorBlade;

// ReSharper disable once RedundantDisableWarningComment
#pragma warning disable CA1822

/// <summary>
/// Utilities for HTML Razor templates.
/// </summary>
[SuppressMessage("ReSharper", "MemberCanBeMadeStatic.Global")]
internal sealed class HtmlHelper
{
    internal static HtmlHelper Instance { get; } = new();

    /// <summary>
    /// Returns markup that is not HTML encoded.
    /// </summary>
    /// <param name="value">The HTML markup.</param>
    public HtmlString Raw(object? value)
        => new(value?.ToString());

    /// <summary>
    /// HTML-encodes the provided value.
    /// </summary>
    /// <param name="value">Value to HTML-encode.</param>
    public string Encode(object? value)
    {
        var valueString = value?.ToString();
        if (valueString is null or "")
            return string.Empty;

#if NET6_0_OR_GREATER
        var valueSpan = valueString.AsSpan();
        var sb = new StringBuilder();

        while (true)
        {
            var idx = valueSpan.IndexOfAny("&<>\"\'");
            if (idx < 0)
                break;

            if (idx != 0)
                sb.Append(valueSpan[..idx]);

            sb.Append(valueSpan[idx] switch
            {
                '&'   => "&amp;",
                '<'   => "&lt;",
                '>'   => "&gt;",
                '"'   => "&quot;",
                '\''  => "&#x27;",
                var c => c.ToString() // Won't happen
            });

            valueSpan = valueSpan[(idx + 1)..];
        }

        if (valueSpan.Length != 0)
            sb.Append(valueSpan);

        return sb.ToString();
#else
        return valueString.Replace("&", "&amp;")
                          .Replace("<", "&lt;")
                          .Replace(">", "&gt;")
                          .Replace("\"", "&quot;")
                          .Replace("\'", "&#x27;");
#endif
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\HtmlString.g.cs" label="HtmlString.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System.IO;

namespace RazorBlade;

/// <summary>
/// Represents an HTML-encoded string that should not be encoded again.
/// </summary>
internal sealed class HtmlString : IEncodedContent
{
    private readonly string _value;

    /// <summary>
    /// Creates a HTML-encoded string.
    /// </summary>
    public HtmlString(string? value)
        => _value = value ?? string.Empty;

    /// <inheritdoc />
    public override string ToString()
        => _value;

    void IEncodedContent.WriteTo(TextWriter textWriter)
        => textWriter.Write(_value);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\HtmlTemplate.g.cs" label="HtmlTemplate.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;
using RazorBlade.Support;

namespace RazorBlade;

/// <summary>
/// Base class for HTML templates.
/// </summary>
/// <remarks>
/// Special HTML characters will be escaped.
/// </remarks>
internal abstract class HtmlTemplate : RazorTemplate
{
    private AttributeInfo _currentAttribute;

    // ReSharper disable once RedundantDisableWarningComment
#pragma warning disable CA1822

    /// <inheritdoc cref="HtmlHelper"/>
    [SuppressMessage("ReSharper", "MemberCanBeMadeStatic.Global")]
    protected HtmlHelper Html => HtmlHelper.Instance;

    /// <inheritdoc cref="HtmlHelper.Raw"/>
    [SuppressMessage("ReSharper", "MemberCanBeMadeStatic.Global")]
    protected HtmlString Raw(object? value)
        => HtmlHelper.Instance.Raw(value);

#pragma warning restore CA1822

    /// <inheritdoc />
    protected override void Write(object? value)
    {
        if (value is IEncodedContent encodedContent)
        {
            encodedContent.WriteTo(Output);
            return;
        }

        var valueString = value?.ToString();
        if (valueString is null or "")
            return;

#if NET6_0_OR_GREATER
        var valueSpan = valueString.AsSpan();

        while (true)
        {
            var idx = valueSpan.IndexOfAny("&<>\"\'");
            if (idx < 0)
                break;

            if (idx != 0)
                Output.Write(valueSpan[..idx]);

            Output.Write(valueSpan[idx] switch
            {
                '&'   => "&amp;",
                '<'   => "&lt;",
                '>'   => "&gt;",
                '"'   => "&quot;",
                '\''  => "&#x27;",
                var c => c.ToString() // Won't happen
            });

            valueSpan = valueSpan[(idx + 1)..];
        }

        if (valueSpan.Length != 0)
            Output.Write(valueSpan);
#else
        Output.Write(
            valueString.Replace("&", "&amp;")
                       .Replace("<", "&lt;")
                       .Replace(">", "&gt;")
                       .Replace("\"", "&quot;")
                       .Replace("\'", "&#x27;")
        );
#endif
    }

    /// <inheritdoc />
    protected override void BeginWriteAttribute(string name, string prefix, int prefixOffset, string suffix, int suffixOffset, int attributeValuesCount)
    {
        _currentAttribute = new(name, prefix, suffix, attributeValuesCount);

        if (_currentAttribute.AttributeValuesCount != 1)
            WriteLiteral(prefix);
    }

    /// <inheritdoc />
    protected override void WriteAttributeValue(string prefix, int prefixOffset, object? value, int valueOffset, int valueLength, bool isLiteral)
    {
        // This implements the Razor semantics of ASP.NET (conditional attributes):

        // When an attribute consists of a single value part (without whitespace): foo="@bar"
        //  - if bar evaluates to false or null, omit the attribute entirely
        //  - if bar evaluates to true, write the attribute name as the value: foo="foo"
        //  - otherwise, write the value of bar as usual

        // When an attribute contains multiple value parts: class="foo @bar"
        //  - if bar evaluates to null, omit it and its whitespace prefix: class="foo"
        //  - otherwise, write the value of bar as usual (even if it evaluates to a boolean)

        // Note that if an attribute name starts with "data-", these attribute-specific methods are not called,
        // and Write is used instead, effectively bypassing these rules and always writing the attribute value as-is.

        if (_currentAttribute.AttributeValuesCount == 1)
        {
            if (string.IsNullOrEmpty(prefix))
            {
                if (value is bool boolValue)
                    value = boolValue ? _currentAttribute.Name : null;

                if (value is null)
                {
                    _currentAttribute.Suppressed = true;
                    return;
                }
            }

            WriteLiteral(_currentAttribute.Prefix);
        }

        if (value is not null)
        {
            WriteLiteral(prefix);

            if (isLiteral)
                WriteLiteral(value.ToString());
            else
                Write(value);
        }
    }

    /// <inheritdoc />
    protected override void EndWriteAttribute()
    {
        if (!_currentAttribute.Suppressed)
            WriteLiteral(_currentAttribute.Suffix);
    }

    private struct AttributeInfo
    {
        public readonly string? Name;
        public readonly string? Prefix;
        public readonly string? Suffix;
        public readonly int AttributeValuesCount;
        public bool Suppressed;

        public AttributeInfo(string name, string prefix, string suffix, int attributeValuesCount)
        {
            Name = name;
            Prefix = prefix;
            Suffix = suffix;
            AttributeValuesCount = attributeValuesCount;

            Suppressed = false;
        }
    }
}

/// <summary>
/// Base class for HTML templates with a model.
/// </summary>
/// <remarks>
/// Special HTML characters will be escaped.
/// </remarks>
/// <typeparam name="TModel">The model type.</typeparam>
internal abstract class HtmlTemplate<TModel> : HtmlTemplate
{
    /// <summary>
    /// The model for the template.
    /// </summary>
    public TModel Model { get; }

    /// <summary>
    /// Initializes a new instance of the template.
    /// </summary>
    /// <param name="model">The model for the template.</param>
    [TemplateConstructor]
    protected HtmlTemplate(TModel model)
    {
        Model = model;
    }

    /// <summary>
    /// This constructor is provided for the designer only. Do not use.
    /// </summary>
    protected HtmlTemplate()
    {
        throw new NotSupportedException("Use the constructor overload that takes a model.");
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\IEncodedContent.g.cs" label="IEncodedContent.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System.IO;

namespace RazorBlade;

/// <summary>
/// Encoded content to we written to the output as-is.
/// </summary>
internal interface IEncodedContent
{
    /// <summary>
    /// Writes the content to the provided <see cref="TextWriter"/>.
    /// </summary>
    /// <param name="textWriter"><see cref="TextWriter"/> to write the content to.</param>
    void WriteTo(TextWriter textWriter);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\PlainTextTemplate.g.cs" label="PlainTextTemplate.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System;
using RazorBlade.Support;

namespace RazorBlade;

/// <summary>
/// Base class for plain text templates.
/// </summary>
/// <remarks>
/// Values will be written as-is, without escaping.
/// </remarks>
internal abstract class PlainTextTemplate : RazorTemplate
{
    private string? _currentAttributeSuffix;

    /// <inheritdoc />
    protected override void Write(object? value)
    {
        if (value is IEncodedContent encodedContent)
            encodedContent.WriteTo(Output);
        else
            Output.Write(value);
    }

    /// <inheritdoc />
    protected override void BeginWriteAttribute(string name, string prefix, int prefixOffset, string suffix, int suffixOffset, int attributeValuesCount)
    {
        WriteLiteral(prefix);
        _currentAttributeSuffix = suffix;
    }

    /// <inheritdoc />
    protected override void WriteAttributeValue(string prefix, int prefixOffset, object? value, int valueOffset, int valueLength, bool isLiteral)
    {
        WriteLiteral(prefix);

        if (isLiteral)
            WriteLiteral(value?.ToString());
        else
            Write(value);
    }

    /// <inheritdoc />
    protected override void EndWriteAttribute()
    {
        WriteLiteral(_currentAttributeSuffix);
        _currentAttributeSuffix = null;
    }
}

/// <summary>
/// Base class for plain text templates with a model.
/// </summary>
/// <remarks>
/// Values will be written as-is, without escaping.
/// </remarks>
/// <typeparam name="TModel">The model type.</typeparam>
internal abstract class PlainTextTemplate<TModel> : PlainTextTemplate
{
    /// <summary>
    /// The model for the template.
    /// </summary>
    public TModel Model { get; }

    /// <summary>
    /// Initializes a new instance of the template.
    /// </summary>
    /// <param name="model">The model for the template.</param>
    [TemplateConstructor]
    protected PlainTextTemplate(TModel model)
    {
        Model = model;
    }

    /// <summary>
    /// This constructor is provided for the designer only. Do not use.
    /// </summary>
    protected PlainTextTemplate()
    {
        throw new NotSupportedException("Use the constructor overload that takes a model.");
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.EmbeddedLibrarySourceGenerator\RazorTemplate.g.cs" label="RazorTemplate.g.cs" >


```csharp showLineNumbers 
// This file is part of the RazorBlade library.

#nullable enable

using System.ComponentModel;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using RazorBlade.Support;

namespace RazorBlade;

/// <summary>
/// Base class for Razor templates.
/// </summary>
internal abstract class RazorTemplate : IEncodedContent
{
    /// <summary>
    /// The <see cref="TextWriter"/> which receives the output.
    /// </summary>
    protected TextWriter Output { get; set; } = new StreamWriter(Stream.Null);

    /// <summary>
    /// The cancellation token.
    /// </summary>
    protected CancellationToken CancellationToken { get; private set; }

    /// <summary>
    /// Renders the template synchronously and returns the result as a string.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <remarks>
    /// Use this only if the template does not use <c>@async</c> directives.
    /// </remarks>
    [ConditionalOnAsync(false, Message = $"The generated template is async. Use {nameof(RenderAsync)} instead.")]
    public string Render(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var renderTask = RenderAsync(cancellationToken);
        if (renderTask.IsCompleted)
            return renderTask.Result;

        return Task.Run(async () => await renderTask.ConfigureAwait(false), CancellationToken.None).GetAwaiter().GetResult();
    }

    /// <summary>
    /// Renders the template synchronously to the given <see cref="TextWriter"/>.
    /// </summary>
    /// <param name="textWriter">The <see cref="TextWriter"/> to write to.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <remarks>
    /// Use this only if the template does not use <c>@async</c> directives.
    /// </remarks>
    [ConditionalOnAsync(false, Message = $"The generated template is async. Use {nameof(RenderAsync)} instead.")]
    public void Render(TextWriter textWriter, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var renderTask = RenderAsync(textWriter, cancellationToken);
        if (renderTask.IsCompleted)
        {
            renderTask.GetAwaiter().GetResult();
            return;
        }

        Task.Run(async () => await renderTask.ConfigureAwait(false), CancellationToken.None).GetAwaiter().GetResult();
    }

    /// <summary>
    /// Renders the template asynchronously and returns the result as a string.
    /// </summary>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <remarks>
    /// Use this if the template uses <c>@async</c> directives.
    /// </remarks>
    public async Task<string> RenderAsync(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var output = new StringWriter();
        await RenderAsync(output, cancellationToken).ConfigureAwait(false);
        return output.ToString();
    }

    /// <summary>
    /// Renders the template asynchronously to the given <see cref="TextWriter"/>.
    /// </summary>
    /// <param name="textWriter">The <see cref="TextWriter"/> to write to.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <remarks>
    /// Use this if the template uses <c>@async</c> directives.
    /// </remarks>
    public async Task RenderAsync(TextWriter textWriter, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var previousState = (Output, CancellationToken);

        try
        {
            Output = textWriter;
            CancellationToken = cancellationToken;

            await ExecuteAsync().ConfigureAwait(false);
        }
        finally
        {
            (Output, CancellationToken) = previousState;
        }
    }

    /// <summary>
    /// Executes the template and appends the result to <see cref="Output"/>.
    /// </summary>
    protected virtual Task ExecuteAsync()
        => Task.CompletedTask; // The IDE complains when this method is abstract :(

    /// <summary>
    /// Writes a literal value to the output.
    /// </summary>
    /// <param name="value">The value to write.</param>
    protected void WriteLiteral(string? value)
        => Output.Write(value);

    /// <summary>
    /// Write a value to the output.
    /// </summary>
    /// <param name="value">The value to write.</param>
    protected abstract void Write(object? value);

    /// <summary>
    /// Write already encoded content to the output.
    /// </summary>
    /// <param name="content">The template to render.</param>
    protected void Write(IEncodedContent? content)
        => content?.WriteTo(Output);

    /// <summary>
    /// Begins writing an attribute.
    /// </summary>
    /// <param name="name">The attribute name.</param>
    /// <param name="prefix">The attribute prefix, which is the text from the whitespace preceding the attribute name to the quote before the attribute value.</param>
    /// <param name="prefixOffset">The prefix offset in the Razor file.</param>
    /// <param name="suffix">The suffix, consisting of the end quote.</param>
    /// <param name="suffixOffset">The suffix offset in the Razor file.</param>
    /// <param name="attributeValuesCount">The count of attribute value parts, which is the count of subsequent <see cref="WriteAttributeValue"/> calls.</param>
    [EditorBrowsable(EditorBrowsableState.Never)]
    protected abstract void BeginWriteAttribute(string name, string prefix, int prefixOffset, string suffix, int suffixOffset, int attributeValuesCount);

    /// <summary>
    /// Writes part of an attribute value.
    /// </summary>
    /// <param name="prefix">The value prefix, consisting of the whitespace preceding the value.</param>
    /// <param name="prefixOffset">The prefix offset in the Razor file.</param>
    /// <param name="value">The value to write.</param>
    /// <param name="valueOffset">The value offset in the Razor file.</param>
    /// <param name="valueLength">The value length in the Razor file.</param>
    /// <param name="isLiteral">Whether the value is a literal.</param>
    [EditorBrowsable(EditorBrowsableState.Never)]
    protected abstract void WriteAttributeValue(string prefix, int prefixOffset, object? value, int valueOffset, int valueLength, bool isLiteral);

    /// <summary>
    /// Ends writing an attribute.
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    protected abstract void EndWriteAttribute();

    void IEncodedContent.WriteTo(TextWriter textWriter)
        => Render(textWriter, CancellationToken.None);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.RazorBladeSourceGenerator\RazorBladeDemo.PersonDisplay.Razor.g.cs" label="RazorBladeDemo.PersonDisplay.Razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0ee9a5bcc623252570e9d97efdeb7e3c5a8d6350"
// <auto-generated/>
#pragma warning disable 1591
namespace RazorBladeDemo
{
    #line hidden
#nullable restore
#line 1 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml"
using RazorBladeDemo;

#line default
#line hidden
#nullable disable
    #nullable restore
    internal partial class PersonDisplay : RazorBlade.HtmlTemplate<Person>
    #nullable disable
    {
        #pragma warning disable 1998
        protected async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\nThis is the ");
#nullable restore
#line (4,14)-(4,29) 6 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml"
Write(Model.FirstName);

#line default
#line hidden
#nullable disable
            WriteLiteral(" ");
#nullable restore
#line (4,31)-(4,45) 6 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml"
Write(Model.LastName);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n<br />\r\n\r\nThis should be full name of ");
#nullable restore
#line (8,30)-(8,46) 6 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\PersonDisplay.cshtml"
Write(Model.FullName());

#line default
#line hidden
#nullable disable
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorBlade\src\RazorBladeDemo\obj\GX\RazorBlade.Analyzers\RazorBlade.Analyzers.RazorBladeSourceGenerator\RazorBladeDemo.PersonDisplay.RazorBlade.g.cs" label="RazorBladeDemo.PersonDisplay.RazorBlade.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable restore

namespace RazorBladeDemo
{
    partial class PersonDisplay
    {
        /// <inheritdoc cref="M:RazorBlade.HtmlTemplate`1.#ctor(`0)" />
        public PersonDisplay(global::RazorBladeDemo.Person model)
            : base(model)
        {
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RazorBlade ](/sources/RazorBlade.zip)

:::


### Share RazorBlade 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade&quote=RazorBlade" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade&text=RazorBlade:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade&title=RazorBlade" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade&title=RazorBlade&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorBlade" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RazorBlade

### In the same category (Templating) - 11 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [NTypewriter](/docs/NTypewriter)


#### [RazorSlices](/docs/RazorSlices)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

