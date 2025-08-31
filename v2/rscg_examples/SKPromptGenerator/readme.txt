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
