# AsyncIt

AsyncIt is a NuGet package library that allows the automatic generation of additional synchronous and asynchronous APIs for existing user codebase and external packages.

It aims to extend user-defined CLR types by automating the otherwise manual process of defining repetitive and straightforward routines. Thus, the development, maintenance and consumption of the released API are simplified due to the balanced (close to ideal) ratio of the synchronous and asynchronous API endpoints:

&nbsp;&nbsp;&nbsp;_**Every functionality point has both Async and Sync API endpoints available.**_

This content is an extract from the project's main [Wiki page](https://github.com/oleg-shilo/AsyncIt/wiki). It is highly recommended that you read it, as it explains the deep reasons behind this project and details the more concrete usage scenarios.

## Overview

AsyncIt is a source generator that is integrated into the .NET build process as a special tool type - the so-called "Analyzer". It is invoked by the compiler during the assembly build and allows the injection of missing API endpoints based on the present assembly API. Thus, if the assembly being built has the `GetStatus` but not the `GetStatusAsync` method, then AsyncIt will generate the missing method with a straightforward implementation. It can also generate the synchronous API if it is not present in the original codebase:

- The API defines synchronous methods only:

  _Original code_

  ```C#
  public partial class DeviceLib
  {
      public static string GetStatus() {. . .}
  }
  ```

  _Code that is fed to the C# compiler_

  ```C#
  public partial class DeviceLib
  {
      public static string GetStatus() {. . .}
  }

  public partial class DeviceLib // AsyncIt generated
  {
      public static Task<string> GetStatusAsync() 
          => TaskRun(() => GetStatus());
  }
  ```

AsyncIt does not do anything fancy. Like the `await` keyword, it cannot magically convert a synchronous routine into an asynchronous one and vice versa. Instead, it simply emits the code that the developer would type manually if he/she decides to use the API in a concurrency way that the API author did not anticipate. 

AsyncIt can also be used to balance API of the external assemblies (e.g. .NET base classes, nuget packages)

This is where AsyncIt is placed in the overall .NET concurrency model architecture: 

![image](https://github.com/oleg-shilo/AsyncIt/assets/16729806/dec186b7-706b-4aee-817b-9e7472c46fc9)

## Usage

In order to integrate AsyncIt with your .NET project, add AsyncIt Nuget package. 

```ps
dotnet add package AsyncIt
```

That's it. Now, you can mark any type for which you want to generate async/sync methods with the `[Async]` attribute (see the details below), and the new source code will be generated and included in the build. 

You can always inspect the generated code in the Visual Studio solution explorer:   

![image](https://github.com/oleg-shilo/AsyncIt/assets/16729806/fabed4b6-3eec-4421-a293-ed10fad4a950)


###  Extending user-defined types

In this scenario, a user type containing sync/async methods is extended by additional source file(s) implementing additional API methods.
The type can be extended either with an additional partial class definition or by the extension methods class.

A typical usage can be illustrated by the code below.

_Async scenario:_
 
```C#
[Async]
public partial class BankService
{
    public partial class OrderService
    {
        public Order GetOrder(int id) // and GetOrderAsync will be created by AsyncIt
        {...}
    }
}

...

async Task OnButtonClick(object sender, EventArgs args)
{
    Order order = await service.GetOrderAsync(this.OrderId);
    orderLabel.Text = order.Name;
}
```

_Sync scenario:_

```c#
[Async(Interface = Interface.Sync)]
partial class AccountService
{
    public async Task<Account> GetAccountAsync(int id) // and GetAccount will be created by AsyncIt
    {...}
}

...

static void Main()
{
   var account = new AccountService().GetAccount(333);
   
   File.WriteAllText($"account_{account.Id}.txt", account.Balance.ToString());
}
```

###  Extending external types

In this scenario, an external type (from a referenced assembly) containing sync/async methods is extended by additional source file(s) implementing additional API methods.
The type can be extended by the extension methods class.

A typical usage can be illustrated by the code below for generating on-fly synchronous methods for type `HttpClient`  .

_Async scenario:_
 
```C#
// For all synchronous methods of DirectoryInfo will be created an async equivalent by AsyncIt
[assembly: AsyncExternal(typeof(DirectoryInfo), Interface.Async)] 

...

async Task OnButtonClick(object sender, EventArgs args)
{
    var info = new DirectoryInfo(workingDir);
    
    string[] folders = await info.GetDirectoriesAsync("*", SearchOption.AllDirectories);

    foreach(var path in folders)
      foldersListBox.Add(path);
}
```

_Sync scenario:_

```c#
// For all asynchronous methods of HttpClient will be created a sync equivalent by AsyncIt
[assembly: AsyncExternal(typeof(HttpClient), Interface.Sync)];

...

static void Main() 
    => File.WriteAllText(
           "temperature.txt", 
           new HttpClient().GetString("https://www.weather.com/au/melbourne/temperature"));
```
