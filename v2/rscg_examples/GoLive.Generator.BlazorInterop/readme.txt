# BlazorInteropGenerator
Generates Blazor -> Javascript strongly typed interop methods, by parsing the Javascript it self and generating extension methods for IJSRuntime.

## Usage

Firstly, add the project from Nuget - [GoLive.Generator.BlazorInterop](https://www.nuget.org/packages/GoLive.Generator.BlazorInterop/), then add an AdditionalFile in your .csproj named "BlazorInterop.json", like so:

```
<ItemGroup>
     <AdditionalFiles Include="BlazorInterop.json" />
</ItemGroup>
```

Once that's done, add the settings file and change as required:


```
{
  "Files": [
    {
      "Output": "JSInterop.cs",
      "Source": "wwwroot\\blazorinterop.js",
      "Namespace": "GoLive.Generator.BlazorInterop.Playground.Client",
      "ObjectToInterop": "window.blazorInterop",
      "Init": ["window={}"]
    }
  ],
  "InvokeVoidString": "await JSRuntime.InvokeVoidAsync(\"{0}\", {1});",
  "InvokeString": "return await JSRuntime.InvokeAsync of T (\"{0}\",{1});"
}

```

### Description of Each Option
- Files: An array of file objects specifying details of the files involved in the interop process.
  - Output: The name of the output C# file to be generated.
  - Source: The path to the source JavaScript file used for the interop.
  - Namespace: The namespace used in the generated C# file.
  - ObjectToInterop: The JavaScript object used for the interop. 
  - Init: An array of initialization scripts executed before the interop. In this example above, we are interop'ing to window.blazorInterop, and window doesn't exist, so we have to create it.
- InvokeVoidString: A template string for invoking a JavaScript function that does not return a value using JSRuntime.InvokeVoidAsync. Placeholders {0} and {1} are replaced with the function name and arguments, respectively.
- InvokeString: A template string for invoking a JavaScript function that returns a value using JSRuntime.InvokeAsync of T . Placeholders {0} and {1} are replaced with the function name and arguments, respectively.