# Blazor.TSRuntime

An improved JSRuntime with

- automatic JS-module loading and caching
- compile time errors instead of runtime errors
- IntelliSense guidance

![InlineComposition Example](README_IMAGE.png)

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
    public required ITSRuntime TsRuntime { private get; init; }
    
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

- **[\[webroot path\]](Readme_md/InputPath.md)**:
 Relative path to the web root (starting folder 'wwwroot' is ignored).
- **[\[input path\]](Readme_md/InputPath.md)**:
 Folder where to locate the input files. Path relative to [webroot path] and must start with '/'.
- **[\[using statements\]](Readme_md/UsingStatements.md)**:
 List of generated using statements at the top of ITSRuntime.
- **[\[invoke function\].\[sync enabled\]](#invoke)**:
 Toggles whether sync invoke methods should be generated for modules.
- **[\[invoke function\].\[trysync enabled\]](#invoke)**:
 Toggles whether try-sync invoke methods should be generated for modules.
- **[\[invoke function\].\[async enabled\]](#invoke)**:
 Toggles whether async invoke methods should be generated for modules.
- **[\[invoke function\].\[name pattern\].\[pattern\]](Readme_md/NamePattern.md)**:
 Naming of the generated methods that invoke module functions.
- **[\[invoke function\].\[name pattern\].\[module transform\]](Readme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[invoke function\].\[name pattern\].\[function transform\]](Readme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #function#.
- **[\[invoke function\].\[name pattern\].\[action transform\]](Readme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #action#.. 
- **[\[invoke function\].\[name pattern\].\[action name\]\[sync\]](Readme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is synchronous.
- **[\[invoke function\].\[name pattern\].\[action name\]\[trysync\]](Readme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is try synchronous.
- **[\[invoke function\].\[name pattern\].\[action name\]\[async\]](Readme_md/NamePattern.md)**:
 Naming of the #action# variable for the invoke module functions name pattern when the action is asynchronous.
- **[\[invoke function\].\[promise\].\[only async enabled\]](Readme_md/PromiseFunction.md)**:
 Generates only async invoke method when return-type is promise.
- **[\[invoke function\].\[promise\].\[append async\]](Readme_md/PromiseFunction.md)**:
 Appends to the name 'Async' when return-type is promise.
- **[\[invoke function\].\[type map\]](Readme_md/TypeMap.md)**:
 Mapping of TypeScript-types (key) to C#-types (value). Not listed types are mapped unchanged (Identity function).
- **[\[preload function\].\[name pattern\].\[pattern\]](Readme_md/NamePattern.md)**:
 Naming of the generated methods that preloads a specific module.
- **[\[preload function\].\[name pattern\].\[module transform\]](Readme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[preload function\].\[all modules name\]](Readme_md/NamePattern.md)**:
 Naming of the method that preloads all modules.
- **[\[module grouping\].\[enabled\]](Readme_md/ModuleGrouping.md)**:
 Each module gets it own interface and the functions of that module are only available in that interface.
- **[\[module grouping\].\[interface name pattern\].\[pattern\]](Readme_md/NamePattern.md)**:
 Naming of the generated module interfaces when *module grouping* is enabled.
- **[\[module grouping\].\[interface name pattern\].\[module transform\]](Readme_md/NamePattern.md)**:
 Lower/Upper case transform for the variable #module#.
- **[\[js runtime\].\[sync enabled\]](Readme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime sync invoke method should be generated.
- **[\[js runtime\].\[trysync enabled\]](Readme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime try-sync invoke method should be generated.
- **[\[js runtime\].\[async enabled\]](Readme_md/JSRuntime.md)**:
 Toggles whether generic JSRuntime async invoke method should be generated.
- **[\[service extension\]](Readme_md/ModuleGrouping.md)**:
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
  - improved declaration path: Instead of one include string, an array of objects { "include": string, "excludes": string[], "file module path": string } is now supported
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
  - callbacks are supported: Mapping parameters of a function type to the corresponding C# delegate (*Action<>*/*Func<>*)
  - JSDoc "@typeparam" tag is now supported
