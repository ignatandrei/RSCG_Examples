---
sidebar_position: 2130
title: 213 - Blazor.TSRuntime
description: Generating C# Code for Blazor from javascript files
slug: /Blazor.TSRuntime
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBlazor.mdx';

# Blazor.TSRuntime  by Black White Yoshi


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Blazor.TSRuntime?label=Blazor.TSRuntime)](https://www.nuget.org/packages/Blazor.TSRuntime/)
[![GitHub last commit](https://img.shields.io/github/last-commit/BlackWhiteYoshi/Blazor.TSRuntime?label=updated)](https://github.com/BlackWhiteYoshi/Blazor.TSRuntime)
![GitHub Repo stars](https://img.shields.io/github/stars/BlackWhiteYoshi/Blazor.TSRuntime?style=social)

## Details

### Info
:::info

Name: **Blazor.TSRuntime**

TSRuntime is an improved JSRuntime with automatic JS-module loading and caching, compile time errors instead of runtime errors and nice IntelliSense guidance.

Author: Black White Yoshi

NuGet: 
*https://www.nuget.org/packages/Blazor.TSRuntime/*   


You can find more details at https://github.com/BlackWhiteYoshi/Blazor.TSRuntime

Source: https://github.com/BlackWhiteYoshi/Blazor.TSRuntime

:::

### Original Readme
:::note

# Blazor.TSRuntime

An improved JSRuntime with

- automatic JS-module loading and caching
- compile time errors instead of runtime errors
- IntelliSense guidance

![InlineComposition Example](https://github.com/BlackWhiteYoshi/Blazor.TSRuntime/README_IMAGE.png)

Works with [*JavaScript JSDoc*](#get-started) and [*TypeScript*](#get-started).


<br></br>
## Available Methods

### Invoke

Each "export function" in JavaScript will generate up to 3 C#-methods:
- **Invoke** - interops synchronous
- **InvokeTrySync** - interops synchronous if possible, otherwise asynchronous
- **InvokeAsync** - interops asynchronous

```csharp
// saveNumber(name: string, myNumber: number)

TsRuntime.SaveNumberInvoke("key1", 5); // will invoke sync
await TsRuntime.SaveNumberInvokeTrySync("key1", 5); // invokes sync if possible, otherwise async
await TsRuntime.SaveNumberInvokeAsync("key1", 5); // invokes async
```

**Note**:
- *InvokeTrySync* checks if IJSInProcessRuntime is available and if available, executes the call synchronous.
So, if the module is already be downloaded and IJSInProcessRuntime is available, this method executes synchronous.
- Asynchronous JavaScript-functions (JS-functions that return a promise) should be called with *InvokeAsync* (not *Invoke* or *InvokeTrySync*), otherwise the promise will not be awaited.
- *Invoke*-interop fails with an exception when module is not loaded.
So make sure to await the corresponding preload-method beforehand.

### Preload

Each module will generate a method to preload the module.
Additionaly, there is a *PreloadAllModules* method, that preloads all modules.
Preloading will start the download of the JS-module and the task completes when the module is downloaded and cached.  
If a JS-function is called before or while preloading, the download task will first be awaited before executing the function (A sync-call throws an exception).
Therefore, it is recommended to call this method as "fire and forget".
```csharp
_ = PreloadExample(); // loads and caches Example module in the background
_ = PreloadAllModules(); // loads and caches all modules in the background
await PreloadAllModules(); // awaits the loading of all modules, recommended when using sync-interop
```

Furthermore you can prefetch your modules on page load, so the Preload-methods will only get a reference to the module.
```html
<head>
  ...
  <link rel="modulepreload" href="Page/Example.razor.js" />
</head>
```


<br></br>
## Get Started

### 1. Add NuGet package

In your .csproj-file put a package reference to *Blazor.TSRuntime*.

```xml
<ItemGroup>
  <PackageReference Include="Blazor.TSRuntime" Version="{latest version}" PrivateAssets="all" />
</ItemGroup>
```


### 2. Add &lt;AdditionalFiles&gt;

In your .csproj-file put an &lt;AdditionalFiles&gt; directive to *tsruntime.json*
and an &lt;AdditionalFiles&gt; to make all .js-files available to the source-generator.

```xml
<ItemGroup>
  <PackageReference Include="Blazor.TSRuntime" Version="{latest version}" PrivateAssets="all" />
  <AdditionalFiles Include="tsruntime.json" />
  <AdditionalFiles Include="**/*.js" Exclude="bin/**;obj/**;Properties/**" />
</ItemGroup>
```

Create a *tsruntime.json*-file in the same folder as your .csproj-file.

```json
{
  "invoke function": {
    "sync enabled": false,
    "trysync enabled": true,
    "async enabled": false,
    "name pattern": {
      "pattern": "#function#",
      "module transform": "first upper case",
      "function transform": "first upper case",
      "action transform": "none"
    },
    "type map": {
      "number": {
        "type": "TNumber",
        "generic types": {
          "name": "TNumber",
          "constraint": "INumber<TNumber>"
        }
      },
      "boolean": "bool",
      "Uint8Array": "byte[]",
      "HTMLElement": "ElementReference"
    }
  }
}
```


### 3. Register ITSRuntime

If everything is set up correctly, the generator should already be generating the 2 files *TSRuntime*, *ITSRuntime*.  
Register them in your dependency container.

```csharp
using Microsoft.JSInterop;

// IServiceCollection services
services.AddTSRuntime();
```

### 4. Hello World

Now you are ready to rumble, to make a "Hello World" test you can create 2 files:

- Example.razor

```razor
<button @onclick="InvokeJS">InvokeJS</button>

@code {
    [Inject]
    public required ITSRuntime TsRuntime \{ private get; init; }
    
    private async Task InvokeJS() => await TsRuntime.Example();
}
```

- Example.razor.js

```js
export function example() {
    console.log("Hello World");
}
```


### Optional

You can add a *jsconfig.json* file and rename **tsruntime.json** to **jsconfig.tsruntime.json**.  
Here is an example *jsconfig.json*:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "checkJs": true,
    "strictNullChecks": true,
    "noImplicitAny": true
  }
}
```


### TypeScript

For using TypeScript, you only need a few adjustments:
- *tsconfig.json* instead of *jsconfig.json*
  - rename *jsconfig.tsruntime.json* to *tsconfig.tsruntime.json*
- change *&lt;AdditionalFiles Include="\*\*\\\*.js"* /&gt; to *&lt;AdditionalFiles Include="\*\*\\\*.ts" /&gt;*

<br></br>
Note:  
To recognize a module, the file must end with ".js", ".ts" or ".d.ts".  
Function definitions inside a module must start with "export function".  
Futhermore a function definition must not contain any line breaks.

If using TypeScript types together with JSDoc types, JSDoc takes priority,
because JSDoc is parsed after the function declaration and overwrites the previous type.  
But this problem should not exist in the first place as long you do not mix things up, use JS with JSDoc or TS with TSDoc.


<br></br>
## Config - tsruntime.json

All available config keys with its default value:

```json
{
  "webroot path": "",
  "input path": {
    "include": "/",
    "excludes": [ "/bin", "/obj", "/Properties" ],
    "module files": true
  },
  "using statements": [ "Microsoft.AspNetCore.Components", "System.Numerics" ],
  "invoke function": {
    "sync enabled": false,
    "trysync enabled": true,
    "async enabled": false,
    "name pattern": {
      "pattern": "#function#",
      "module transform": "first upper case",
      "function transform": "first upper case",
      "action transform": "none",
      "action name": {
        "sync": "Invoke",
        "trysync": "InvokeTrySync",
        "async": "InvokeAsync"
      }
    },
    "promise": {
      "only async enabled": true,
      "append async": false
    },
    "type map": {
      "number": {
        "type": "TNumber",
        "generic types": {
          "name": "TNumber",
          "constraint": "INumber<TNumber>"
        }
      },
      "boolean": "bool",
      "Uint8Array": "byte[]",
      "HTMLElement": "ElementReference"
    }
  },
  "preload function": {
    "name pattern": {
      "pattern": "Preload#module#",
      "module transform": "first upper case"
    },
    "all modules name": "PreloadAllModules",
  },
  "module grouping": {
    "enabled": false,
    "interface name pattern": {
      "pattern": "I#module#Module",
      "module transform": "first upper case"
    }
  },
  "js runtime": {
    "sync enabled": false,
    "trysync enabled": false,
    "async enabled": false
  },
  "service extension": true
}
```

- **[\[webroot path\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/InputPath.md)**:
 Relative path to the web root (starting folder 'wwwroot' is ignored).
- **[\[input path\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/InputPath.md)**:
 Folder where to locate the input files. Path relative to [webroot path] and must start with '/'.
- **[\[using statements\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/UsingStatements.md)**:
 List of generated using statements at the top of ITSRuntime.
- **[\[invoke function\].\[sync enabled\]](#invoke)**:
 Toggles whether sync invoke methods should be generated for modules.
- **[\[invoke function\].\[trysync enabled\]](#invoke)**:
 Toggles whether try-sync invoke methods should be generated for modules.
- **[\[invoke function\].\[async enabled\]](#invoke)**:
 Toggles whether async invoke methods should be generated for modules.
- **[\[invoke function\].\[name pattern\].\[pattern\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the generated methods that invoke module functions.
- **[\[invoke function\].\[name pattern\].\[module transform\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[invoke function\].\[name pattern\].\[function transform\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #function#.
- **[\[invoke function\].\[name pattern\].\[action transform\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #action#.. 
- **[\[invoke function\].\[name pattern\].\[action name\]\[sync\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is synchronous.
- **[\[invoke function\].\[name pattern\].\[action name\]\[trysync\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is try synchronous.
- **[\[invoke function\].\[name pattern\].\[action name\]\[async\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is asynchronous.
- **[\[invoke function\].\[promise\].\[only async enabled\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/PromiseFunction.md)**:
 Generates only async invoke method when return-type is promise.
- **[\[invoke function\].\[promise\].\[append async\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/PromiseFunction.md)**:
 Appends to the name 'Async' when return-type is promise.
- **[\[invoke function\].\[type map\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/TypeMap.md)**:
 Mapping of TypeScript-types (key) to C#-types (value). Not listed types are mapped unchanged (Identity function).
- **[\[preload function\].\[name pattern\].\[pattern\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the generated methods that preloads a specific module.
- **[\[preload function\].\[name pattern\].\[module transform\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[preload function\].\[all modules name\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the method that preloads all modules.
- **[\[module grouping\].\[enabled\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/ModuleGrouping.md)**:
 Each module gets it own interface and the functions of that module are only available in that interface.
- **[\[module grouping\].\[interface name pattern\].\[pattern\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Naming of the generated module interfaces when *module grouping* is enabled.
- **[\[module grouping\].\[interface name pattern\].\[module transform\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[js runtime\].\[sync enabled\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime sync invoke method should be generated.
- **[\[js runtime\].\[trysync enabled\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime try-sync invoke method should be generated.
- **[\[js runtime\].\[async enabled\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime async invoke method should be generated.
- **[\[service extension\]](https://github.com/BlackWhiteYoshi/Blazor.TSRuntimeReadme_md/ModuleGrouping.md)**:
 A service extension method is generated, which registers ITSRuntime and if enabled, the module interfaces.


<br></br>
## Callback (Function as Parameter)

```js
/**
 * @param {(key: string) => Promise<number>} mapToId
 * @returns {Promise<void>}
 */
export async function callbackExample(mapToId) {
    const id = await mapToId("42");
    console.log(id);
}
```

```csharp
// CallbackExample<int>(Func<string, int> mapToId)
await TsRuntime.CallbackExample((string key) => ValueTask.FromResult(key.GetHashCode()));
```

In JavaScript functions are first-class citizens and a variable/parameter can hold a function.
In C# the equivalent of that are delegates.
Such variables are also called callbacks.
When using a JS-function as parameter, it will be mapped automatically to the corresponding *Action&lt;&gt;*/*Func&lt;&gt;* type.
However, behind the scenes there is a lot going on to make this work and there are a few edge cases you should be aware of.

### Sync/Async Callbacks

To interop from C# to JS you can choose from 3 options: *Sync*/*TrySync*/*Async*.
You may expect the same when using interop from JS to C#.
Unfortunately, it is not implemented that way and you can only choose between *Sync* and *Async*:

If the return-type is not a *Promise&lt;T&gt;*, it will be a *Sync* call.  
If the return-type is a *Promise&lt;T&gt;*, it will be *Async* call.

So, to make sure it works in every environment, your callbacks should always return a *Promise&lt;T&gt;*.
Note, in that case the return-type of your delegate will be *ValueTask*/*ValueTask&lt;T&gt;*.
When your C# method itself is synchronous, just use *ValueTask.CompletedTask*/*ValueTask&lt;T&gt;.FromResult()* as return value.

### Callback Module

To make the mapping possible, additional JS functions are needed.
These JS functions are located in an additional module, the *callback*-module.
This internal module loads automatically.  
For Sync-invoke scenarios, you must ensure that the used modules are loaded.
There is no dedicated *Preload()*-method for the *callback*-module,
but the *PreloadAll()*-method awaits also the *callback*-module.

### DotNetObjectReference

For the mapping a *DotNetObjectReference* is created.
To make sure there is no memory leak, the *DotNetObjectReference* is disposed after the JS-call.
That means, immediately after the JS-call the callback is no longer available.
So, the JS-function must outlast the callback, otherwise a "*System.ArgumentException: There is no tracked object with id ...*" occurs.
In sync-calls everything works fine,
but when your callback is async, your JS function must also be async and must complete after the callback completes.

### Nested Functions or Returning a Function

A callback can have its own parameters and return-type.
If you put another callback as parameter or return-type, 
the generated type will be *CALLBACK_INSIDE_CALLBACK_NOT_SUPPORTED* or *CALLBACK_RETURN_TYPE_NOT_SUPPORTED*, what leads to a compile error.  
Only callbacks as parameters without nesting are supported.


<br></br>
## Release Notes

- 0.0.1
  - first version, includes all basic functionalities for generating TSRuntime
- 0.1
  - improved declaration path: Instead of one include string, an array of objects \{ "include": string, "excludes": string[], "file module path": string \} is now supported
- 0.2
  - optional parameters and default parameter values are now supported
- 0.3
  - breaking changes: changed config keys, defaults and properties in Config, changed Config.FromJson(string json) to new Config(string json)
  - added key "generate on save" and "action name" keys to config
- 0.4
  - module grouping is now supported
  - small breaking change: A namespace that contains IServiceCollection is required when serviceExtension is enabled and namespace *Microsoft.Extensions.DependencyInjection* was added to the defaults
- 0.5
  - generics in type map are now supported
- 0.6
  - \*\*\* huge Refactoring, many breaking changes \*\*\*
  - renamed the project, repository and NuGet package to "Blazor.TSRuntime" (before it was "TSRuntime")
  - dropped *Programmatically Usage* and *Visual Studio Extension*, only *Source Generator* will be continued -> reduced project structure to 2 projects
  - changed ISourceGenerator to IIncrementalGenerator
    - *tsconfig.tsruntime.json* can now be named *\*.tsruntime.json*
    - .d.ts-files must be added with *&lt;AdditionalFiles Include="\*\*\\\*.d.ts" /&gt;*
  - added config key *webroot path*
  - moved config key *[module grouping].[service extension]* to *[service extension]*
  - renamed key "declaration path" to "input path"
  - renamed key "file module path" to "module path"
  - renamed key "append Async" to "append async"
  - Config.InputPath.ModulePath must end with ".js"
- 0.7
  - breaking change: [input path] ('include', 'excludes', 'module path') must start with '/'
  - generic TS-functions are now supported
  - TS-function description is mapped to C# method description. Currently supported tags are &lt;summary&gt;, &lt;remarks&gt;, &lt;param&gt;, &lt;returns&gt;
  - JS-files with JSDocs type annotations are now supported
  - TS-files are now supported
- 0.8
  - scripts are supported (non-module-files: js-files that are included via &lt;script&gt; tag)
<br></br>
- 1.0
  - callbacks are supported: Mapping parameters of a function type to the corresponding C# delegate (*Action&lt;&gt;*/*Func&lt;&gt;*)
  - JSDoc "@typeparam" tag is now supported


:::

### About
:::note

Generating C# Code for Blazor from javascript files


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Blazor.TSRuntime**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Blazor.TSRuntime" Version="1.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>

	  <AdditionalFiles Include="tsruntime.json" />
	  <AdditionalFiles Include="**/*.js" Exclude="bin/**;obj/**;Properties/**" />
	  
	  
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="9.0.8" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="9.0.8" PrivateAssets="all" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\Program.cs" label="Program.cs" >

  This is the use of **Blazor.TSRuntime** in *Program.cs*

```csharp showLineNumbers 
using BlazorData;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddTSRuntime();
builder.Services.AddScoped(sp => new HttpClient \{ BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\tsruntime.json" label="tsruntime.json" >

  This is the use of **Blazor.TSRuntime** in *tsruntime.json*

```csharp showLineNumbers 
{
  "invoke function": {
    "sync enabled": false,
    "trysync enabled": true,
    "async enabled": false,
    "name pattern": {
      "pattern": "#function#",
      "module transform": "first upper case",
      "function transform": "first upper case",
      "action transform": "none"
    },
    "type map": {
      "number": {
        "type": "TNumber",
        "generic types": {
          "name": "TNumber",
          "constraint": "INumber<TNumber>"
        }
      },
      "boolean": "bool",
      "Uint8Array": "byte[]",
      "HTMLElement": "ElementReference"
    }
  }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\Pages\Home.razor" label="Home.razor" >

  This is the use of **Blazor.TSRuntime** in *Home.razor*

```csharp showLineNumbers 
@page "/"

<PageTitle>Home</PageTitle>

<h1>Hello, world!</h1>
<a  onclick="@SayHello">Click</a>


@code {
    [Inject]
    IJSRuntime JS \{ get; set; }

    [Inject]
    public required ITSRuntime TsRuntime \{ private get; init; }

    public async Task SayHello()
    {
        Console.WriteLine("Hello from Blazor");
        await TsRuntime.SayHello("Andrei");
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\Pages\Home.razor.js" label="Home.razor.js" >

  This is the use of **Blazor.TSRuntime** in *Home.razor.js*

```csharp showLineNumbers 
/**
 * Displays a greeting alert with the provided name.
 * @param {string} name - The name to include in the greeting.
 */
export function SayHello(name) {
    alert("Hello from JavaScript," + name);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap.g.cs" label="ITSRuntime_bootstrap.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> GetbootstrapModule();

    /// <summary>
    /// <para>Loads 'bootstrap' (/wwwroot/lib/bootstrap/dist/js/bootstrap.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap() => GetbootstrapModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap_bundle.g.cs" label="ITSRuntime_bootstrap_bundle.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> Getbootstrap_bundleModule();

    /// <summary>
    /// <para>Loads 'bootstrap_bundle' (/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap_bundle() => Getbootstrap_bundleModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap_bundle_min.g.cs" label="ITSRuntime_bootstrap_bundle_min.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> Getbootstrap_bundle_minModule();

    /// <summary>
    /// <para>Loads 'bootstrap_bundle_min' (/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap_bundle_min() => Getbootstrap_bundle_minModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap_esm.g.cs" label="ITSRuntime_bootstrap_esm.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> Getbootstrap_esmModule();

    /// <summary>
    /// <para>Loads 'bootstrap_esm' (/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap_esm() => Getbootstrap_esmModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap_esm_min.g.cs" label="ITSRuntime_bootstrap_esm_min.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> Getbootstrap_esm_minModule();

    /// <summary>
    /// <para>Loads 'bootstrap_esm_min' (/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap_esm_min() => Getbootstrap_esm_minModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_bootstrap_min.g.cs" label="ITSRuntime_bootstrap_min.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> Getbootstrap_minModule();

    /// <summary>
    /// <para>Loads 'bootstrap_min' (/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadBootstrap_min() => Getbootstrap_minModule();
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_Core.g.cs" label="ITSRuntime_Core.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.JSInterop;

/// <summary>
/// <para>Interface for JS-interop.</para>
/// <para>It contains an invoke-method for every js-function, a preload-method for every module and a method to load all modules.</para>
/// </summary>
[System.CodeDom.Compiler.GeneratedCodeAttribute("Blazor.TSRuntime", "1.0.1")]
public partial interface ITSRuntime {
    /// <summary>
    /// <para>Fetches all modules as javascript-modules.</para>
    /// <para>If already loading, it doesn't trigger a second loading and if any already loaded, these are not loaded again, so if all already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when all module loading Tasks have completed.</returns>
    public Task PreloadAllModules();



    /// <summary>
    /// <para>Invokes the specified JavaScript function synchronously.</para>
    /// <para>If module is not loaded or synchronous is not supported, it fails with an exception.</para>
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <returns></returns>
    protected TResult TSInvoke<TResult>(string identifier, object?[]? args);

    /// <summary>
    /// Invokes the specified JavaScript function synchronously when supported, otherwise asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeTrySync<TResult>(string identifier, object?[]? args, CancellationToken cancellationToken);

    /// <summary>
    /// Invokes the specified JavaScript function asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeAsync<TResult>(string identifier, object?[]? args, CancellationToken cancellationToken);


    /// <summary>
    /// <para>Invokes the specified JavaScript function in the specified module synchronously.</para>
    /// <para>If module is not loaded or synchronous is not supported, it fails with an exception.</para>
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <returns></returns>
    protected TResult TSInvoke<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args);

    /// <summary>
    /// Invokes the specified JavaScript function in the specified module synchronously when supported, otherwise asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeTrySync<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args, CancellationToken cancellationToken);

    /// <summary>
    /// Invokes the specified JavaScript function in the specified module asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeAsync<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args, CancellationToken cancellationToken);


    /// <summary>
    /// <para>Invokes the specified JavaScript function synchronously.</para>
    /// <para>If module is not loaded or synchronous is not supported, it fails with an exception.</para>
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <returns></returns>
    protected TResult TSInvoke<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args) where TCallback : class;

    /// <summary>
    /// Invokes the specified JavaScript function synchronously when supported, otherwise asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeTrySync<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class;

    /// <summary>
    /// Invokes the specified JavaScript function asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeAsync<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class;


    /// <summary>
    /// <para>Invokes the specified JavaScript function in the specified module synchronously.</para>
    /// <para>If module is not loaded or synchronous is not supported, it fails with an exception.</para>
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <returns></returns>
    protected TResult TSInvoke<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args) where TCallback : class;

    /// <summary>
    /// Invokes the specified JavaScript function in the specified module synchronously when supported, otherwise asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeTrySync<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class;

    /// <summary>
    /// Invokes the specified JavaScript function in the specified module asynchronously.
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <typeparam name="TCallback"></typeparam>
    /// <param name="moduleTask">The loading task of a module</param>
    /// <param name="identifier">name of the javascript function</param>
    /// <param name="dotNetObjectReference">reference to a csharp object with callback functions</param>
    /// <param name="args">parameter passing to the JS-function</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns></returns>
    protected ValueTask<TResult> TSInvokeAsync<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class;
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\ITSRuntime_Home.g.cs" label="ITSRuntime_Home.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Numerics;

namespace Microsoft.JSInterop;

public partial interface ITSRuntime {
    protected Task<IJSObjectReference> GetHomeModule();

    /// <summary>
    /// <para>Loads 'Home' (/Pages/Home.razor.js) as javascript-module.</para>
    /// <para>If already loading, it does not trigger a second loading and if already loaded, it returns a completed task.</para>
    /// </summary>
    /// <returns>A Task that will complete when the module import have completed.</returns>
    public Task PreloadHome() => GetHomeModule();


    /// <summary>
    /// <para>Displays a greeting alert with the provided name.</para>
    /// <para>Invokes in module 'Home' the JS-function 'SayHello' synchronously when supported, otherwise asynchronously.</para>
    /// </summary>
    /// <param name="name">The name to include in the greeting.</param>
    /// <param name="cancellationToken">A cancellation token to signal the cancellation of the operation. Specifying this parameter will override any default cancellations such as due to timeouts (<see cref="JSRuntime.DefaultAsyncTimeout"/>) from being applied.</param>
    /// <returns>A Task that will complete when the JS-Function have completed.</returns>
    public async ValueTask SayHello(string name, CancellationToken cancellationToken = default) {
        await TSInvokeTrySync<Infrastructure.IJSVoidResult>(GetHomeModule(), "SayHello", [name], cancellationToken);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\TSRuntime.g.cs" label="TSRuntime.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.JSInterop;

/// <summary>
/// <para>An implementation for <see cref="ITSRuntime"/>.</para>
/// <para>It manages JS-modules: It loads the modules, caches it in an array and disposing releases all modules.</para>
/// <para>
/// There are 7 modules available:<br />
/// - Home<br />
/// - bootstrap_bundle<br />
/// - bootstrap_bundle_min<br />
/// - bootstrap_esm<br />
/// - bootstrap_esm_min<br />
/// - bootstrap<br />
/// - bootstrap_min
/// </para>
/// </summary>
[System.CodeDom.Compiler.GeneratedCodeAttribute("Blazor.TSRuntime", "1.0.1")]
public sealed class TSRuntime(IJSRuntime jsRuntime) : ITSRuntime, IDisposable, IAsyncDisposable {
    private readonly CancellationTokenSource cancellationTokenSource = new();

    Task<IJSObjectReference> ITSRuntime.GetHomeModule() => GetHomeModule();
    private Task<IJSObjectReference>? HomeModule;
    private Task<IJSObjectReference> GetHomeModule()
        => HomeModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => HomeModule,
            _ => HomeModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/Pages/Home.razor.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.Getbootstrap_bundleModule() => Getbootstrap_bundleModule();
    private Task<IJSObjectReference>? bootstrap_bundleModule;
    private Task<IJSObjectReference> Getbootstrap_bundleModule()
        => bootstrap_bundleModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrap_bundleModule,
            _ => bootstrap_bundleModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.Getbootstrap_bundle_minModule() => Getbootstrap_bundle_minModule();
    private Task<IJSObjectReference>? bootstrap_bundle_minModule;
    private Task<IJSObjectReference> Getbootstrap_bundle_minModule()
        => bootstrap_bundle_minModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrap_bundle_minModule,
            _ => bootstrap_bundle_minModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.Getbootstrap_esmModule() => Getbootstrap_esmModule();
    private Task<IJSObjectReference>? bootstrap_esmModule;
    private Task<IJSObjectReference> Getbootstrap_esmModule()
        => bootstrap_esmModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrap_esmModule,
            _ => bootstrap_esmModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.Getbootstrap_esm_minModule() => Getbootstrap_esm_minModule();
    private Task<IJSObjectReference>? bootstrap_esm_minModule;
    private Task<IJSObjectReference> Getbootstrap_esm_minModule()
        => bootstrap_esm_minModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrap_esm_minModule,
            _ => bootstrap_esm_minModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.GetbootstrapModule() => GetbootstrapModule();
    private Task<IJSObjectReference>? bootstrapModule;
    private Task<IJSObjectReference> GetbootstrapModule()
        => bootstrapModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrapModule,
            _ => bootstrapModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.js").AsTask()
        };

    Task<IJSObjectReference> ITSRuntime.Getbootstrap_minModule() => Getbootstrap_minModule();
    private Task<IJSObjectReference>? bootstrap_minModule;
    private Task<IJSObjectReference> Getbootstrap_minModule()
        => bootstrap_minModule switch {
            Task<IJSObjectReference> \{ IsCompletedSuccessfully: true }
            or Task<IJSObjectReference> \{ IsCompleted: false \} => bootstrap_minModule,
            _ => bootstrap_minModule = jsRuntime.InvokeAsync<IJSObjectReference>("import", cancellationTokenSource.Token, "/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js").AsTask()
        };

    public Task PreloadAllModules() {
        GetHomeModule();
        Getbootstrap_bundleModule();
        Getbootstrap_bundle_minModule();
        Getbootstrap_esmModule();
        Getbootstrap_esm_minModule();
        GetbootstrapModule();
        Getbootstrap_minModule();

        return Task.WhenAll([HomeModule!, bootstrap_bundleModule!, bootstrap_bundle_minModule!, bootstrap_esmModule!, bootstrap_esm_minModule!, bootstrapModule!, bootstrap_minModule!]);
    }


    TResult ITSRuntime.TSInvoke<TResult>(string identifier, object?[]? args) => ((IJSInProcessRuntime)jsRuntime).Invoke<TResult>(identifier, args);

    ValueTask<TResult> ITSRuntime.TSInvokeTrySync<TResult>(string identifier, object?[]? args, CancellationToken cancellationToken) {
        if (jsRuntime is IJSInProcessRuntime jsInProcessRuntime)
            return ValueTask.FromResult(jsInProcessRuntime.Invoke<TResult>(identifier, args));
        else
            return jsRuntime.InvokeAsync<TResult>(identifier, cancellationToken, args);
    }

    ValueTask<TResult> ITSRuntime.TSInvokeAsync<TResult>(string identifier, object?[]? args, CancellationToken cancellationToken)
        => jsRuntime.InvokeAsync<TResult>(identifier, cancellationToken, args);


    TResult ITSRuntime.TSInvoke<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args) {
        if (!moduleTask.IsCompletedSuccessfully)
            throw new JSException("JS-module is not loaded. Use and await the Preload()-method to ensure the module is loaded.");

        return ((IJSInProcessObjectReference)moduleTask.Result).Invoke<TResult>(identifier, args);
    }

    async ValueTask<TResult> ITSRuntime.TSInvokeTrySync<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args, CancellationToken cancellationToken) {
        IJSObjectReference module = await moduleTask;
        if (module is IJSInProcessObjectReference inProcessModule)
            return inProcessModule.Invoke<TResult>(identifier, args);
        else
            return await module.InvokeAsync<TResult>(identifier, cancellationToken, args);
    }

    async ValueTask<TResult> ITSRuntime.TSInvokeAsync<TResult>(Task<IJSObjectReference> moduleTask, string identifier, object?[]? args, CancellationToken cancellationToken) {
        IJSObjectReference module = await moduleTask;
        return await module.InvokeAsync<TResult>(identifier, cancellationToken, args);
    }


    TResult ITSRuntime.TSInvoke<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args) where TCallback : class => default; // no callbacks are used

    ValueTask<TResult> ITSRuntime.TSInvokeTrySync<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class => default; // no callbacks are used

    ValueTask<TResult> ITSRuntime.TSInvokeAsync<TResult, TCallback>(string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class => default; // no callbacks are used


    TResult ITSRuntime.TSInvoke<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args) where TCallback : class  => default; // no callbacks are used

    ValueTask<TResult> ITSRuntime.TSInvokeTrySync<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class  => default; // no callbacks are used

    ValueTask<TResult> ITSRuntime.TSInvokeAsync<TResult, TCallback>(Task<IJSObjectReference> moduleTask, string identifier, DotNetObjectReference<TCallback> dotNetObjectReference, object?[]? args, CancellationToken cancellationToken) where TCallback : class => default; // no callbacks are used



    /// <summary>
    /// Releases each module synchronously if possible, otherwise asynchronously per fire and forget.
    /// </summary>
    public void Dispose() {
        if (cancellationTokenSource.IsCancellationRequested)
            return;

        cancellationTokenSource.Cancel();
        cancellationTokenSource.Dispose();

        if (HomeModule?.IsCompletedSuccessfully == true)
            if (HomeModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = HomeModule.Result.DisposeAsync().Preserve();
        HomeModule = null;

        if (bootstrap_bundleModule?.IsCompletedSuccessfully == true)
            if (bootstrap_bundleModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrap_bundleModule.Result.DisposeAsync().Preserve();
        bootstrap_bundleModule = null;

        if (bootstrap_bundle_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_bundle_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrap_bundle_minModule.Result.DisposeAsync().Preserve();
        bootstrap_bundle_minModule = null;

        if (bootstrap_esmModule?.IsCompletedSuccessfully == true)
            if (bootstrap_esmModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrap_esmModule.Result.DisposeAsync().Preserve();
        bootstrap_esmModule = null;

        if (bootstrap_esm_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_esm_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrap_esm_minModule.Result.DisposeAsync().Preserve();
        bootstrap_esm_minModule = null;

        if (bootstrapModule?.IsCompletedSuccessfully == true)
            if (bootstrapModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrapModule.Result.DisposeAsync().Preserve();
        bootstrapModule = null;

        if (bootstrap_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else
                _ = bootstrap_minModule.Result.DisposeAsync().Preserve();
        bootstrap_minModule = null;
    }

    /// <summary>
    /// <para>Releases each module synchronously if possible, otherwise asynchronously and returns a task that completes, when all module disposing tasks complete.</para>
    /// <para>The asynchronous disposing tasks are happening in parallel.</para>
    /// </summary>
    /// <returns></returns>
    public ValueTask DisposeAsync() {
        if (cancellationTokenSource.IsCancellationRequested)
            return ValueTask.CompletedTask;

        cancellationTokenSource.Cancel();
        cancellationTokenSource.Dispose();

        List<Task> taskList = new(7);

        if (HomeModule?.IsCompletedSuccessfully == true)
            if (HomeModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = HomeModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        HomeModule = null;

        if (bootstrap_bundleModule?.IsCompletedSuccessfully == true)
            if (bootstrap_bundleModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrap_bundleModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrap_bundleModule = null;

        if (bootstrap_bundle_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_bundle_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrap_bundle_minModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrap_bundle_minModule = null;

        if (bootstrap_esmModule?.IsCompletedSuccessfully == true)
            if (bootstrap_esmModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrap_esmModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrap_esmModule = null;

        if (bootstrap_esm_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_esm_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrap_esm_minModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrap_esm_minModule = null;

        if (bootstrapModule?.IsCompletedSuccessfully == true)
            if (bootstrapModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrapModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrapModule = null;

        if (bootstrap_minModule?.IsCompletedSuccessfully == true)
            if (bootstrap_minModule.Result is IJSInProcessObjectReference inProcessModule)
                inProcessModule.Dispose();
            else {
                ValueTask valueTask = bootstrap_minModule.Result.DisposeAsync();
                if (!valueTask.IsCompleted)
                    taskList.Add(valueTask.AsTask());
            }
        bootstrap_minModule = null;

        if (taskList.Count == 0)
            return ValueTask.CompletedTask;
        else
            return new ValueTask(Task.WhenAll(taskList));
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Blazor.TSRuntime\src\BlazorData\obj\GX\Blazor.TSRuntime\TSRuntime.TSRuntimeGenerator\TSRuntime_ServiceExtension.g.cs" label="TSRuntime_ServiceExtension.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations


using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.JSInterop;

[System.CodeDom.Compiler.GeneratedCodeAttribute("Blazor.TSRuntime", "1.0.1")]
public static class TSRuntimeServiceExtension {
    /// <summary>
    /// Registers a scoped ITSRuntime with a TSRuntime as implementation and if available, registers the module interfaces with the same TSRuntime-object.
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddTSRuntime(this IServiceCollection services) {
        services.AddScoped<ITSRuntime, TSRuntime>();

        return services;
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Blazor.TSRuntime ](/sources/Blazor.TSRuntime.zip)

:::


### Share Blazor.TSRuntime 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime&quote=Blazor.TSRuntime" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime&text=Blazor.TSRuntime:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime&title=Blazor.TSRuntime" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime&title=Blazor.TSRuntime&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazor.TSRuntime" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Blazor.TSRuntime

aaa
<SameCategory />

