[![Nuget (Generator)](https://img.shields.io/nuget/v/dotnetYang?style=flat-square)](https://www.nuget.org/packages/dotnetYang/)
[![Build](https://img.shields.io/github/actions/workflow/status/westermo/dotnetYang/build.yml?branch=main&style=flat-square)](https://github.com/westermo/dotnetYang/actions)
[![License](https://img.shields.io/github/license/westermo/dotnetYang?style=flat-square)](https://github.com/westermo/dotnetYang/blob/develop/LICENSE)

dotnetYang is a [Roslyn](https://github.com/dotnet/roslyn) source generator for using the .yang language to generate C# code, providing access to data models, ease-of-use asynchronous RPC, Action & Notification calls directly from code and generated server interfaces.

## Features

- **Drop-and-go:** Add your .yang files to a C# project as additional files that references this generator, that is it, your .yang defined RPC's and more are now available directly in  that C# projects code
- **Server-interface:** Want to implement a server that responds to NETCONF calls? Look no further than the generated interface `IYangServer` and it's extension method `async Task Recieve(this IYangServer server, Stream input, Stream output);` which provides a framework for implementing your own server without having to worry about serializing and parsing NETCONF directly, but instead work with well defined C# Datatypes.

## Documentation

### Getting Started

In order to start using `dotnetYang` on a new .csproj project, start by adding the nuget packages by, for example, using the dotnet CLI in your project directory:
`dotnet add package dotnetYang`

Afterwards, create or add a .yang file to said project:
`some-module.yang`
```yang
module some-module {
    yang-version 1.1;
    namespace "urn:dotnet:yang:some:module";
    prefix sm;
    identity someIdentity;
    identity someOtherIdentity
    {
        base someIdentity;
    }
    rpc doSomething {
        input {
            leaf the-big-leaf
            {
                type uint32;
                default "4";
                description "The value that is the input of the doSomething rpc";
            }
        }
        output {
            leaf response
            {
                type identityref
                {
                    base someIdentity;
                }
                default "someOtherIdentity";
                description "The identity that is the output of the doSomething rpc";
            }
        }
    }
}
```
And then add it as an additional file to your .csproj file
```xml
<Project Sdk="Microsoft.NET.Sdk">
    <!--Other parts of the .csproj file -->
    <ItemGroup>
        <AdditionalFiles Include="some-module.yang" />
    </ItemGroup>
    <!--Other parts of the .csproj file -->
</Project>
```
Now the generated C# code from `some-module.yang` will be available, with it's naming conventions adjusted to be C# compliant
```csharp
namespace MyProject;
public class Program
{
  public static async Task Main()
  {
      IChannel channel = //...Code for setting up whatever channel you want to send the rpc over
      int messageID = //...Code for getting message id;
      //Set up the rpc input, not the slight name changes
      Some.Module.YangNode.DoSomethingInput input = new Some.Module.YangNode.DoSomethingInput
      {
          TheBigLeaf = 123
      };
      //Call the rpc function, note the slight name changes and the asynchronous nature of the call
      Some.Module.YangNode.DoSomethingOutput output = await Some.Module.YangNode.DoSomething(channel, messageID, input);
      //Write the "response" leaf of the output to console.
      Console.WriteLine(output.Response);
  }
}
```

### Server creation
Say that you want to create a server that can response to calls defined in `some-module.yang`, then you would create a class that implementes the generated `IYangServer` interface, which might look something like this:

```csharp
using Some.Module;
namespace MyProject;
public class Server : IYangServer
{
    public async Task<YangNode.DoSomethingOutput> OnDoSomething(YangNode.DoSomethingInput input)
    {
        //Do whatever it is the server is expected to do when told to "doSomething"...
        //Await something, do something else, the options are endless...
        
        //Create the output, not nessecarily like this..
        YangNode.DoSomethingOutput output = new YangNode.DoSomethingOutput(); 
        return output;
    }
}
```

Of course, if there are a lot of yang modules in a project, `IYangServer` runs the risk of becoming rather big. In such a case, it is recommended to split it's implementation into several `partial` server classes in order to maintain readability.  