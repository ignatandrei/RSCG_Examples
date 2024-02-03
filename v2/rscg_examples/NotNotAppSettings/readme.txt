# NotNot.AppSettings

Automatically create strongly typed C# settings objects from AppSettings.json. Uses Source Generators.

Includes a simple deserialization helper for when you are using Dependency Injection, or not.

## Getting Started

1) Add an `appsettings.json` file to your project *(make sure it's copied to the output)*.
2) **[Install this nuget package `NotNot.AppSettings`](https://www.nuget.org/packages/NotNot.AppSettings)**.
3) Build your project
4) Use the generated `AppSettings` class in your code. (See the example section below).

## How it works

During your project's build process, NotNot.AppSettings will parse the  `appsettings*.json` in your project's root folder.  These files are all merged into a single schema. Using source-generators it then creates a set of csharp classes that matches each node in the json hierarchy.

After building your project, an `AppSettings` class contains the strongly-typed definitions,
and an `AppSettingsBinder` helper/loader util will be found under the `{YourProjectRootNamespace}.AppSettingsGen` namespace.

## Example

`appsettings.json`

```json
{
  "Hello": {
	"World": "Hello back at you!"
  }
}
```

`Program.cs`

```csharp
using ExampleApp.AppSettingsGen;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ExampleApp;
public class Program
{ 
   public static async Task Main(string[] args)
   {
      {
         Console.WriteLine("NON-DI EXAMPLE");
                  
         var appSettings = ExampleApp.AppSettingsGen.AppSettingsBinder.LoadDirect();
         Console.WriteLine(appSettings.Hello.World);         
      }
      {
         Console.WriteLine("DI EXAMPLE");

         HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
         builder.Services.AddSingleton<IAppSettingsBinder, AppSettingsBinder>();
         var app = builder.Build();
         var appSettings = app.Services.GetRequiredService<IAppSettingsBinder>().AppSettings;
         Console.WriteLine(appSettings.Hello.World);
      }
   }
}
```
*See the **`./NotNot.AppSettings.Example`** folder in the repository for a fully buildable version of this example.*

## Troubleshooting / Tips

### How to extend the generated `AppSettings` class?

You can extend any/all of the generated code by creating a partial class in the same namespace.

### Some settings not being loaded (value is `NULL`). Or:  My `appSettings.Development.json` file is not loaded

Ensure the proper environment variable is set.   For example, The `appSettings.Development.json` file is only loaded when the `ASPNETCORE_ENVIRONMENT` 
or `DOTNET_ENVIORNMENT` environment variable is set to `Development`.

### Intellisense not working for `AppSettings` class

A strongly-typed `AppSettings` (and sub-classes) is recreated every time you build your project.
This may confuse your IDE and you might need to restart it to get intellisense working again.

### Why are some of my nodes typed as `object`?

Under some circumstances, the type of a node's value in `appsettings.json` would be ambiguous, so `object` is used:

- If the value is `null` or `undefined`
- If the value is a POJO/Array/primitive in one appsettings file, and a different one of those three in another.


### Tip: Backup generated code in your git repository

Add this to your `.csproj` to have the code output to `./Generated` and have it be ***ignored*** by your project.
This way you can check it into source control and have a backup of the generated code in case you need to stop using this package.
```xml
<!--output the source generator build files-->
<Target Name="DeleteFolder" BeforeTargets="PreBuildEvent">
	<RemoveDir Directories="$(CompilerGeneratedFilesOutputPath)" />
</Target>	
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
<ItemGroup>
	<!--Exclude the output of source generators from the compilation-->
	<Compile Remove="$(CompilerGeneratedFilesOutputPath)/**" />
</ItemGroup>
```

## Contribute

- If you find value from this project, consider sponsoring.

## Acknowledgments

- This project was inspired by https://github.com/FrodeHus/AppSettingsSourceGenerator which unfortunately did not match my needs in fundamental ways.

## License: MPL-2.0

A summary from [TldrLegal](https://www.tldrlegal.com/license/mozilla-public-license-2-0-mpl-2):

>   MPL is a copyleft license that is easy to comply with. You must make the source code for any of your changes available under MPL, but you can combine the MPL software with proprietary code, as long as you keep the MPL code in separate files. Version 2.0 is, by default, compatible with LGPL and GPL version 2 or greater. You can distribute binaries under a proprietary license, as long as you make the source available under MPL.

**In brief**: You can basically use this project however you want, but all changes to it must be open sourced.

## Changes

- **`1.0.0`** : polish and readme tweaks.  **Put a fork in it, it's done!**
- **`0.12.0`** : change appsettings read logic to use "AdditionalFiles" workflow instead of File.IO
- **`0.10.0`** : Initial Release.
