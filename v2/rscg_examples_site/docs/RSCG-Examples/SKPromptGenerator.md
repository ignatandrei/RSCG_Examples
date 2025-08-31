---
sidebar_position: 2190
title: 219 - SKPromptGenerator
description: Generate typed prompts for Semantic Kernel
slug: /SKPromptGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAI.mdx';

# SKPromptGenerator  by Charlie Chen


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/SKPromptGenerator?label=SKPromptGenerator)](https://www.nuget.org/packages/SKPromptGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/CharlieDigital/SKPromptGenerator?label=updated)](https://github.com/CharlieDigital/SKPromptGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/CharlieDigital/SKPromptGenerator?style=social)

## Details

### Info
:::info

Name: **SKPromptGenerator**

A source generator to automatically create classes from string prompts.

Author: Charlie Chen

NuGet: 
*https://www.nuget.org/packages/SKPromptGenerator/*   


You can find more details at https://github.com/CharlieDigital/SKPromptGenerator

Source: https://github.com/CharlieDigital/SKPromptGenerator

:::

### Author
:::note
Charlie Chen 
![Alt text](https:/github.com/CharlieDigital.png)
:::

### Original Readme
:::note

# Semantic Kernel (SK) Prompt Generator

SKPromptGenerator is a C# source generator which automatically creates strongly-typed classes for your string prompt templates.

It is intended to be used with [Semantic Kernel](https://github.com/microsoft/semantic-kernel).

https://github.com/user-attachments/assets/a3727ef4-6880-4939-be40-5c5c08948a3e

> 💡 NOTE: As of version 4, the token format is switched from `{name}` to `{{$name}}` to match Semantic Kernel.

## Motivation

When working with prompts, you'll end up doing a lot of string templating and repetitive code.

Wouldn't it be nice if you could just have a strongly-typed class for each prompt automatically created using the prompt?

This library does exactly that.

```csharp
public static class Prompts
{
  // Define a prompt
  [PromptTemplate]
  public const string Capitol = """
    What is the capitol of {{$state}} {{$country}}?
    Respond directly in a single line
    """;
}

// Execute the prompt passing in a Semantic Kernel instance.
var capitol = await new CapitolPrompt(
  state: "NJ",
  country: "USA"
).ExecuteAsync(kernel);
```

The tokens in the prompt string become named parameters on the class constructor 🎉

## Limitations

1. Your prompt must be a `const string` because the generator needs to be able to read the string in the source.
2. Your prompts must live in some class in a namespace.  If you get the error `error CS1001: Identifier expected`, then you are probably missing a namespace around your prompt.
3. You must add a dependency to `Microsoft.SemanticKernel` since the `ExecuteAsync` method requires the `Kernel` instance.
4. Currently only targets .NET 8; considering `netstandard2.0`.

## Installing

This generator is built for .NET 8.

To install:

```shell
dotnet add package SKPromptGenerator
```

For the latest releases, see: https://www.nuget.org/packages/SKPromptGenerator

## Using

This repository includes a sample project under the `/app` directory.

To use, create a new console app:

```shell
mkdir sk-prompt-gen-test
cd sk-prompt-gen-test
dotnet new console
dotnet add package SKPromptGenerator
dotnet add package Microsoft.SemanticKernel
```

In the project, create a class like so (you can call your class whatever you want):

```csharp
namespace SomeNamespace;

public static class Prompts
{
  [PromptTemplate]
  public const string Capitol = """
    What is the capitol of {{$state}} {{$country}}?
    Respond directly in a single line
    When writing the state, always write it as the full name
    Write your output in the format: The capitol of <STATE> is: <CAPITOL>.
    For example: The capitol of California is: Sacramento.
    """;
}
```

> 💡 Note the usage of a namespace for the class.  The prompt need not be in a standalone class.  It can also be placed in an existing `Controller` (for example)

In the code above, we've created a prompt with two tokens: `{{$state}}` and `{{$country}}`.

The `[PromptTemplate]` attribute instructs the generator to create a class like so:

```csharp
using System;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using SKPromptGenerator;

namespace SomeNamespace;

public partial class CapitolPrompt(
  string state, string country
) : PromptTemplateBase
{
  public override string Text => $$"""
What is the capitol of {{state}} {{country}}?
Respond directly in a single line
When writing the state, always write it as the full name
Write your output in the format: The capitol of <STATE> is: <CAPITOL>.
For example: The capitol of California is: Sacramento.
""";

  public override OpenAIPromptExecutionSettings Settings => new OpenAIPromptExecutionSettings
  {
    MaxTokens = 500,
    Temperature = 0.5d,
    TopP = 0d,
  };
}
```

Note the two class parameters `state` and `country` which are extracted from the prompt template are now string literal tokens.

Now we can use the prompt like so:

```csharp
var capitol = await new CapitolPrompt("NJ", "USA").ExecuteAsync(kernel);

Console.WriteLine($"{capitol}");
// The capitol of New Jersey is: Trenton.

capitol = await new CapitolPrompt("NY", "USA").ExecuteAsync(kernel);

Console.WriteLine($"{capitol}");
// The capitol of New York is: Albany.
```

If your prompt returns JSON, we can also deserialize it into an object:

```csharp
// Our model that we are serializing to
public record CapitolResponse(string Country, string State, string Capitol);

// Use ExecuteWithJsonAsync if we also want the raw JSON
var (sacramento, json) = await new CapitolJsonPrompt(
  "CA",
  "US"
).ExecuteWithJsonAsync<CapitolResponse>(kernel);
```

NOTE: The underlying code will strip Markdown fences so if you are expecting your result to contain markdown, it will be stripped.

### Typed Parameters

If you want to use typed parameters, you can append the type to the parameter token:

```csharp
[PromptTemplate]
public const string Cities = """
  Write a list of {{$count:int}} cities in {{$region}}, {{$country}}
  Write each city on a separate line
  Start you response with: Sure, here are {{$count:int}} cities in {{$region}}, {{$country}}
  """;
```

This will generate the signature:

```csharp
public partial class CitiesPrompt(
  int count, string region, string country
) : PromptTemplateBase
```

Which can then be invoked with a typed, integer parameter for count:

```csharp
var njCities = await new CitiesPrompt(4, "NJ", "USA").ExecuteAsync(kernel);
```

This will output:

```
Sure, here are 4 cities in NJ, USA:

1. Newark
2. Jersey City
3. Paterson
4. Elizabeth
```

Note that if you are using your own types, those types should be added using a global `using` statement or specify the full type name since the generated class does not know about your namespaces.

(See the example in the `/app` directory for usage)

### Including History

The `ExecuteAsync` method takes a `historyBuilder` parameter which will receives a `ChatHistory` instance

The unit tests show how this can be used:

```csharp
[Fact]
public async void History_Builder_Test()
{
  var response = await new HistoryTmplPrompt("Spencer").ExecuteAsync(
    new Kernel(),
    // 👇 Here we can build the chat history up before adding the new user prompt
    historyBuilder: (h) =>
    {
      h.Add(new ChatMessageContent(AuthorRole.User, "User question"));
      h.Add(new ChatMessageContent(AuthorRole.System, "System response"));
    }
  );

  // Fake test where we are just going to return the history instead
  Assert.Equal("User question\nSystem response", response);
}
```

You can do the retrieval of the actual history *before* the block and then do the history building in the block.

## Custom Base Class

If you want to customize how the prompt is executed, you can specify a custom base class when assigning the attribute.

Your base class must inherit from `PromptTemplateBase`:

```csharp
public abstract class CustomBase : PromptTemplateBase
{
  public override async Task<string> ExecuteAsync(
    Kernel kernel,
    string? serviceId = null,
    CancellationToken cancellation = default
  )
  {
    return await Task.FromResult("response");
  }
}
```

And then you can specify this custom base class as a generic type:

```csharp
[PromptTemplate<CustomBase>]
public const string CapitolCustom = """
  What is the capitol of {{$state}} {{$country}}?
  Respond directly in a single line
  When writing the state, always write it as the full name
  Write your output in the format: The capitol of <STATE> is: <CAPITOL>.
  For example: The capitol of California is: Sacramento.
  """;
```

This allows you to take full control of the execution of the prompt (e.g. add logging, telemetry, etc.).

> 💡 Note: you should use a global `using` statement for the namespace of your custom base class.

## Prompt Execution Settings

The `PromptTemplate` attribute also allows specification of the prompt execution settings.

The three parameters are:

|Parameter|Details|Default|
|--|--|--|
|`MaxTokens`|The maximum number of tokens in the response|`500`|
|`Temperature`|The temperature|`0.5`|
|`TopP`|The TopP|`0`|

For example:

```csharp
public static class Prompts
{
  [PromptTemplate(10, 0.1)]
  public const string SampleTmpl1 = """
    What is the capitol of {{$state}} {{$country}}
    Respond directly on a single line.
    """;
}
```

(See the `PromptTmpl` class for details)

## Using the Sample App

To use the sample app, you'll need to set up user secrets:

```shell
dotnet user-secrets init
dotnet user-secrets set "AzureOpenAIKey" "YOUR_AZURE_OPEN_AI_KEY"
dotnet user-secrets set "AzureOpenAIEndpoint" "YOUR_AZURE_OPEN_AI_ENDPOINT"
```

If you are using OpenAI, feel free to fork this project and simply change the service type and configuration values.


:::

### About
:::note

Generate typed prompts for Semantic Kernel


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SKPromptGenerator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.SemanticKernel" Version="1.64.0" />
    <PackageReference Include="SKPromptGenerator" Version="0.5.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SKPromptGenerator\src\DemoAI\Program.cs" label="Program.cs" >

  This is the use of **SKPromptGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
var capitol = new DemoAI.WeatherPrompt("Bucuresti");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SKPromptGenerator\src\DemoAI\WeatherCity.cs" label="WeatherCity.cs" >

  This is the use of **SKPromptGenerator** in *WeatherCity.cs*

```csharp showLineNumbers 
using SKPromptGenerator; // <-- Add namespace here

namespace DemoAI
{
    public static partial class MyPrompts
    {
        [PromptTemplate] // <-- Remove namespace here
        public const string Weather = """
            What is the weather in the city {{$city}} ?
            Respond directly in a single line
            """;
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SKPromptGenerator\src\DemoAI\obj\GX\SKPromptGenerator\SKPromptGenerator.PromptGenerator\WeatherPrompt.g.cs" label="WeatherPrompt.g.cs" >
```csharp showLineNumbers 
using System;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using SKPromptGenerator;

namespace DemoAI;

/// <summary>
/// Generated prompt for `Weather`
/// </summary>
public partial class WeatherPrompt(
  string city
) : PromptTemplateBase
{
  /// <summary>
  /// The base prompt template string for `Weather`
  /// </summary>
  public override string Text => $$"""
What is the weather in the city {{city}} ?
Respond directly in a single line
""";

  /// <summary>
  /// Settings for the prompt `Weather`:
  ///   MaxTokens = 500
  ///   Temperature = 0.5d
  ///   TopP = 0d
  /// </summary>
  public override OpenAIPromptExecutionSettings Settings => new OpenAIPromptExecutionSettings
  {
    MaxTokens = 500,
    Temperature = 0.5d,
    TopP = 0d,
  };
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SKPromptGenerator\src\DemoAI\obj\GX\SKPromptGenerator\SKPromptGenerator.PromptTemplateAttributeGenerator\PromptTemplateAttribute.g.cs" label="PromptTemplateAttribute.g.cs" >
```csharp showLineNumbers 
using System;
using System.Reflection;

namespace SKPromptGenerator;

/// <summary>
/// Attribute applied to `const string` class fields to generate a prompt class.
/// Use this when specifying a custom base class for executing the prompt.
/// </summary>
/// <param name="maxTokens">The maximum number of tokens; default is 500</param>
/// <param name="temperature">The temperature; default is 0.5</param>
/// <param name="topP">The Top P parameter; default is 0</param>
/// <typeparam name="T">The base type for the template inheriting from `PromptTemplateBase`</typeparam>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public class PromptTemplateAttribute<T>(
  int maxTokens = 500,
  double temperature = 0.5,
  double topP = 0
) : Attribute where T : PromptTemplateBase {
  public int MaxTokens => maxTokens;
  public double Temperature => temperature;
  public double TopP => topP;
}

/// <summary>
/// Attribute applied to `const string` class fields to generate a prompt class.
/// </summary>
/// <param name="maxTokens">The maximum number of tokens; default is 500</param>
/// <param name="temperature">The temperature; default is 0.5</param>
/// <param name="topP">The Top P parameter; default is 0</param>
/// <typeparam name="T">The base type for the template inheriting from `PromptTemplateBase`</typeparam>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
public class PromptTemplateAttribute(
  int maxTokens = 500,
  double temperature = 0.5,
  double topP = 0
) : PromptTemplateAttribute<PromptTemplateBase>(maxTokens, temperature, topP) {

}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SKPromptGenerator\src\DemoAI\obj\GX\SKPromptGenerator\SKPromptGenerator.PromptTemplateBaseGenerator\PromptTemplateBase.g.cs" label="PromptTemplateBase.g.cs" >
```csharp showLineNumbers 
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace SKPromptGenerator;

/// <summary>
/// Abstract base class for executing the prompt.  Override this class to
/// provide custom execution of the prompt.
/// </summary>
public abstract class PromptTemplateBase
{
  protected static readonly JsonSerializerOptions SerializerOptions = new() {
    PropertyNameCaseInsensitive = true
  };

  /// <summary>
  /// The execution settings for this prompt.
  /// </summary>
  public abstract OpenAIPromptExecutionSettings Settings \{ get; }

  /// <summary>
  /// The text of this prompt.
  /// </summary>
  public abstract string Text \{ get; }

  /// <summary>
  /// Executes the prompt using the default execution.  Override this method
  /// to provide custom execution logic (e.g. logging, telemetry, etc.)
  /// </summary>
  /// <param name="kernel">The Semantic Kernel instance.</param>
  /// <param name="serviceId">An optional service ID to specify for execution.</param>
  /// <param name="historyBuilder">An optional builder for the chat history.</param>
  /// <param name="cancellation">An optional cancellation token.</param>
  /// <returns>A string with the results of execution.</returns>
  public virtual async Task<string> ExecuteAsync(
    Kernel kernel,
    #nullable enable
    string? serviceId = null,
    Action<ChatHistory>? historyBuilder = null,
    #nullable disable
    CancellationToken cancellation = default
  )
  {
    var chat = kernel.GetRequiredService<IChatCompletionService>(serviceId);

    var history = new ChatHistory();

    if (historyBuilder != null)
    {
      historyBuilder(history);
    }

    history.AddUserMessage(Text);

    var result = await chat.GetChatMessageContentAsync(history, Settings, kernel, cancellation);

    return result.ToString();
  }

  /// <summary>
  /// Executes the prompt and expects a JSON response that will be deserialized
  /// to the type `T`.
  /// </summary>
  /// <param name="kernel">The Semantic Kernel instance.</param>
  /// <param name="serviceId">An optional service ID to specify for execution.</param>
  /// <param name="historyBuilder">An optional builder for the chat history.</param>
  /// <param name="cancellation">An optional cancellation token.</param>
  /// <typeparam name="T">The type `T` of the response object.</typeparam>
  /// <returns>An instance of type `T` deserialized from the JSON response.</returns>
  #nullable enable
  public virtual async Task<T?> ExecuteAsync<T>(
    Kernel kernel,
    #nullable enable
    string? serviceId = null,
    Action<ChatHistory>? historyBuilder = null,
    #nullable disable
    CancellationToken cancellation = default
  ) {
    var (result, _) = await ExecuteWithJsonAsync<T>(kernel, serviceId, historyBuilder, cancellation);

    return result;
  }
  #nullable disable

  /// <summary>
  /// Executes the prompt and expects a JSON response that will be deserialized
  /// to the type `T`.  This call includes the JSON result as part of the tuple.
  /// This method call will perform trimming of JSON fences if present using
  /// regular string find/replace.
  /// </summary>
  /// <param name="kernel">The Semantic Kernel instance.</param>
  /// <param name="serviceId">An optional service ID to specify for execution.</param>
  /// <param name="historyBuilder">An optional builder for the chat history.</param>
  /// <param name="cancellation">An optional cancellation token.</param>
  /// <typeparam name="T">The type `T` of the response object.</typeparam>
  /// <returns>An instance of type `T` deserialized from the JSON response in a tuple with the full JSON response as well..</returns>
  #nullable enable
  public virtual async Task<(T? Result, string Json)> ExecuteWithJsonAsync<T>(
    Kernel kernel,
    #nullable enable
    string? serviceId = null,
    Action<ChatHistory>? historyBuilder = null,
    #nullable disable
    CancellationToken cancellation = default
  ) {
    var json = await ExecuteAsync(kernel, serviceId, historyBuilder, cancellation);

    json = json.Trim().Replace("```json", "").Replace("```", "");

    return (JsonSerializer.Deserialize<T>(json, SerializerOptions), json);
  }
  #nullable disable
}
```
  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project SKPromptGenerator ](/sources/SKPromptGenerator.zip)

:::


### Share SKPromptGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator&quote=SKPromptGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator&text=SKPromptGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator&title=SKPromptGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator&title=SKPromptGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSKPromptGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SKPromptGenerator

aaa
<SameCategory />

