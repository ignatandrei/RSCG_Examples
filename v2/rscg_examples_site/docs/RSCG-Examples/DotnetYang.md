---
sidebar_position: 1450
title: 145 - DotnetYang
description: Generating source code from YANG models
slug: /DotnetYang
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DotnetYang  by Westermo Network Technologies


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/DotnetYang?label=DotnetYang)](https://www.nuget.org/packages/DotnetYang/)
[![GitHub last commit](https://img.shields.io/github/last-commit/westermo/DotnetYang?label=updated)](https://github.com/westermo/DotnetYang)
![GitHub Repo stars](https://img.shields.io/github/stars/westermo/DotnetYang?style=social)

## Details

### Info
:::info

Name: **DotnetYang**

Package Description

Author: Westermo Network Technologies

NuGet: 
*https://www.nuget.org/packages/DotnetYang/*   


You can find more details at https://github.com/westermo/DotnetYang

Source: https://github.com/westermo/DotnetYang

:::

### Original Readme
:::note

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

:::

### About
:::note

Generating source code from YANG models


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DotnetYang**
```xml showLineNumbers {20}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  
  <ItemGroup>
    <AdditionalFiles Include="demo.yang" />
  </ItemGroup>

	 <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>	
  <ItemGroup>
    <PackageReference Include="dotnetYang" Version="0.3.0" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DotnetYang\src\yangDemo\Program.cs" label="Program.cs" >

  This is the use of **DotnetYang** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine("Yang file from https://info.support.huawei.com/info-finder/encyclopedia/en/YANG.html#content4!");
Some.Module.YangNode.DoSomethingInput input = new Some.Module.YangNode.DoSomethingInput
{
    TheBigLeaf = 123
};
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DotnetYang\src\yangDemo\demo.yang" label="demo.yang" >

  This is the use of **DotnetYang** in *demo.yang*

```csharp showLineNumbers 
module some-module {
    yang-version 1.1;
    namespace "urn:dotnet:yang:andrei";
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
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DotnetYang\src\yangDemo\obj\GX\dotnetYang\YangParser.Generator.YangGenerator\Configuration.cs" label="Configuration.cs" >


```csharp showLineNumbers 
using System;
using System.Xml;
using YangSupport;
namespace yangDemo;
///<summary>
///Configuration root object for yangDemo based on provided .yang modules
///</summary>

public class Configuration
{
    public Some.Module.YangNode? SomeModule { get; set; }
    public async Task WriteXMLAsync(XmlWriter writer)
	{
	    await writer.WriteStartElementAsync(null,"root",null);
	    
	    if(SomeModule is not null) await SomeModule.WriteXMLAsync(writer);
	    await writer.WriteEndElementAsync();
	}
    public static async Task<Configuration> ParseAsync(XmlReader reader)
	{
	    Some.Module.YangNode? _SomeModule = default!;
	    while(await reader.ReadAsync())
	    {
	       switch(reader.NodeType)
	       {
	           case XmlNodeType.Element:
	               switch(reader.Name)
	               {
	                    case "some-module":
						    _SomeModule = await Some.Module.YangNode.ParseAsync(reader);
						    continue;
	                    case "rpc-error": throw await RpcException.ParseAsync(reader);
	                    default: throw new Exception($"Unexpected element '{reader.Name}' under 'root'");
	               }
	           case XmlNodeType.EndElement when reader.Name == "root":
	               return new Configuration{
	                   SomeModule = _SomeModule,
	               };
	           case XmlNodeType.Whitespace: break;
	           default: throw new Exception($"Unexpected node type '{reader.NodeType}' : '{reader.Name}' under 'root'");
	       }
	    }
	    throw new Exception("Reached end-of-readability without ever returning from Configuration.ParseAsync");
	}
}
public static class IYangServerExtensions
{
   public static async Task Receive(this IYangServer server, global::System.IO.Stream input, global::System.IO.Stream output)
   {
       var initialPosition = output.Position;
       var initialLength = output.Length;
       string? id = null;
       using XmlReader reader = XmlReader.Create(input, SerializationHelper.GetStandardReaderSettings());
       using XmlWriter writer = XmlWriter.Create(output, SerializationHelper.GetStandardWriterSettings());
       try
       {
           await reader.ReadAsync();
           switch(reader.Name)
           {
               case "rpc":
                   id = reader.ParseMessageId();
                   await writer.WriteStartElementAsync(null, "rpc-reply", "urn:ietf:params:xml:ns:netconf:base:1.0");
                   await writer.WriteAttributeStringAsync(null, "message-id", null, id);
                   await reader.ReadAsync();
                   switch(reader.Name)
                   {
                       case "action":
                           await server.ReceiveAction(reader, writer);
                           break;
                       default:
                           await server.ReceiveRPC(reader, writer);
                           break;
                   }
                   await writer.WriteEndElementAsync();
                   await writer.FlushAsync();
                   break;
               case "notification":
                   var eventTime = await reader.ParseEventTime();
                   await reader.ReadAsync();
                   await server.ReceiveNotification(reader, eventTime);
                   break;
           }
       }
       catch(RpcException ex)
       {
           await writer.FlushAsync();
           output.Position = initialPosition;
           output.SetLength(initialLength);
           await ex.SerializeAsync(output,id);
       }
       catch(Exception ex)
       {
           await writer.FlushAsync();
           output.Position = initialPosition;
           output.SetLength(initialLength);
           await output.SerializeRegularExceptionAsync(ex,id);
       }
   }
   public static async Task ReceiveRPC(this IYangServer server, XmlReader reader, XmlWriter writer)
   {
       switch(reader.Name)
       {
           case "doSomething" when reader.NamespaceURI is "urn:dotnet:yang:andrei":
			{
			    var input = await Some.Module.YangNode.DoSomethingInput.ParseAsync(reader);
			    var task = server.OnDoSomething(input);
			    var response = await task;
			    await response.WriteXMLAsync(writer);
			}
			break;
       }
   }
   public static async Task ReceiveAction(this IYangServer server, XmlReader reader, XmlWriter writer)
   {
       await reader.ReadAsync();
       switch(reader.Name)
       {
           
       }
   }
   public static async Task ReceiveNotification(this IYangServer server, XmlReader reader, DateTime eventTime)
   {
       switch(reader.Name)
       {
           
           
       }
   }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DotnetYang\src\yangDemo\obj\GX\dotnetYang\YangParser.Generator.YangGenerator\YangModules\some\some-module.cs" label="some-module.cs" >


```csharp showLineNumbers 
using System;
using System.Xml;
using System.Text;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using YangSupport;
namespace yangDemo
{
    public partial interface IYangServer
    {
        Task<Some.Module.YangNode.DoSomethingOutput> OnDoSomething(Some.Module.YangNode.DoSomethingInput input);
    }
}
namespace Some.Module{
public class YangNode
{
    public const string ModuleName = "some-module";
    public const string Revision = "";
    public static string[] Features = [];
    //Yang Version 1.1
	public const string Namespace = "urn:dotnet:yang:andrei";
	public static string GetEncodedValue(SomeIdentityIdentity value)
	{
	    switch(value)
	    {
	        case SomeIdentityIdentity.SomeIdentity: return "someIdentity";
			case SomeIdentityIdentity.SomeOtherIdentity: return "someOtherIdentity";
	        default: return value.ToString();
	    }
	}
	public static string GetEncodedValue(SomeIdentityIdentity? value) => GetEncodedValue(value!.Value!);
	public static SomeIdentityIdentity GetSomeIdentityIdentityValue(string value)
	{
	    switch(value)
	    {
	        case "someIdentity": return SomeIdentityIdentity.SomeIdentity;
			case "someOtherIdentity": return SomeIdentityIdentity.SomeOtherIdentity;
	        default: throw new Exception($"{value} is not a valid value for SomeIdentityIdentity");
	    }
	}
	public enum SomeIdentityIdentity
	{
	    SomeIdentity,
		SomeOtherIdentity
	}
	public static string GetEncodedValue(SomeOtherIdentityIdentity value)
	{
	    switch(value)
	    {
	        case SomeOtherIdentityIdentity.SomeOtherIdentity: return "someOtherIdentity";
	        default: return value.ToString();
	    }
	}
	public static string GetEncodedValue(SomeOtherIdentityIdentity? value) => GetEncodedValue(value!.Value!);
	public static SomeOtherIdentityIdentity GetSomeOtherIdentityIdentityValue(string value)
	{
	    switch(value)
	    {
	        case "someOtherIdentity": return SomeOtherIdentityIdentity.SomeOtherIdentity;
	        default: throw new Exception($"{value} is not a valid value for SomeOtherIdentityIdentity");
	    }
	}
	public enum SomeOtherIdentityIdentity
	{
	    SomeOtherIdentity
	}
	public static async Task<Some.Module.YangNode.DoSomethingOutput> DoSomething(IChannel channel, int messageID, Some.Module.YangNode.DoSomethingInput input)
	{
	    using XmlWriter writer = XmlWriter.Create(channel.WriteStream, SerializationHelper.GetStandardWriterSettings());
	    await writer.WriteStartElementAsync(null,"rpc","urn:ietf:params:xml:ns:netconf:base:1.0");
	    await writer.WriteAttributeStringAsync(null,"message-id",null,messageID.ToString());
	    await writer.WriteStartElementAsync("","doSomething","urn:dotnet:yang:andrei");
		await input.WriteXMLAsync(writer);
	    await writer.WriteEndElementAsync();
	    await writer.WriteEndElementAsync();
	    await writer.FlushAsync();
	    await channel.Send();
	    using XmlReader reader = XmlReader.Create(channel.ReadStream, SerializationHelper.GetStandardReaderSettings());
	    await reader.ReadAsync();
	    if(reader.NodeType != XmlNodeType.Element || reader.Name != "rpc-reply" || reader.NamespaceURI != "urn:ietf:params:xml:ns:netconf:base:1.0" || reader["message-id"] != messageID.ToString())
	    {
	        throw new Exception($"Expected stream to start with a <rpc-reply> element with message id {messageID} & \"urn:ietf:params:xml:ns:netconf:base:1.0\" but got {reader.NodeType}: {reader.Name} in {reader.NamespaceURI}");
	    }
		var value = await DoSomethingOutput.ParseAsync(reader);
	    return value;
	}
	public class DoSomethingOutput
	{
	    ///<summary>
		///The identity that is the output of the doSomething rpc
		///</summary>
		public SomeIdentityIdentity? Response { get; set; } = SomeIdentityIdentity.SomeOtherIdentity;
	    public static async Task<DoSomethingOutput> ParseAsync(XmlReader reader)
	{
	    SomeIdentityIdentity? _Response = default!;
	    while(await reader.ReadAsync())
	    {
	       switch(reader.NodeType)
	       {
	           case XmlNodeType.Element:
	               switch(reader.Name)
	               {
	                    case "response":
						    await reader.ReadAsync();
							if(reader.NodeType != XmlNodeType.Text)
							{
							    throw new Exception($"Expected token in ParseCall for 'response' to be text, but was '{reader.NodeType}'");
							}
							_Response = GetSomeIdentityIdentityValue(await reader.GetValueAsync());
							if(!reader.IsEmptyElement)
							{
							    await reader.ReadAsync();
							    if(reader.NodeType != XmlNodeType.EndElement)
							    {
							        throw new Exception($"Expected token in ParseCall for 'response' to be an element closure, but was '{reader.NodeType}'");
							    }
							}
						    continue;
	                    case "rpc-error": throw await RpcException.ParseAsync(reader);
	                    default: throw new Exception($"Unexpected element '{reader.Name}' under 'rpc-reply'");
	               }
	           case XmlNodeType.EndElement when reader.Name == "rpc-reply":
	               return new DoSomethingOutput{
	                   Response = _Response,
	               };
	           case XmlNodeType.Whitespace: break;
	           default: throw new Exception($"Unexpected node type '{reader.NodeType}' : '{reader.Name}' under 'rpc-reply'");
	       }
	    }
	    throw new Exception("Reached end-of-readability without ever returning from DoSomethingOutput.ParseAsync");
	}
	    public async Task WriteXMLAsync(XmlWriter writer)
	{
	    if(Response != default)
		{
		    await writer.WriteStartElementAsync(null,"response","urn:dotnet:yang:andrei");
		    await writer.WriteStringAsync(YangNode.GetEncodedValue(Response!));
		    await writer.WriteEndElementAsync();
		}
	}
	}
	public class DoSomethingInput
	{
	    ///<summary>
		///The value that is the input of the doSomething rpc
		///</summary>
		public uint? TheBigLeaf { get; set; } = 4;
	    public async Task WriteXMLAsync(XmlWriter writer)
		{
		    if(TheBigLeaf != default)
			{
			    await writer.WriteStartElementAsync(null,"the-big-leaf","urn:dotnet:yang:andrei");
			    await writer.WriteStringAsync(TheBigLeaf!.ToString());
			    await writer.WriteEndElementAsync();
			}
		}
	    public static async Task<DoSomethingInput> ParseAsync(XmlReader reader)
		{
		    uint? _TheBigLeaf = default!;
		    while(await reader.ReadAsync())
		    {
		       switch(reader.NodeType)
		       {
		           case XmlNodeType.Element:
		               switch(reader.Name)
		               {
		                    case "the-big-leaf":
							    await reader.ReadAsync();
								if(reader.NodeType != XmlNodeType.Text)
								{
								    throw new Exception($"Expected token in ParseCall for 'the-big-leaf' to be text, but was '{reader.NodeType}'");
								}
								_TheBigLeaf = uint.Parse(await reader.GetValueAsync());
								if(!reader.IsEmptyElement)
								{
								    await reader.ReadAsync();
								    if(reader.NodeType != XmlNodeType.EndElement)
								    {
								        throw new Exception($"Expected token in ParseCall for 'the-big-leaf' to be an element closure, but was '{reader.NodeType}'");
								    }
								}
							    continue;
		                    case "rpc-error": throw await RpcException.ParseAsync(reader);
		                    default: throw new Exception($"Unexpected element '{reader.Name}' under 'doSomething'");
		               }
		           case XmlNodeType.EndElement when reader.Name == "doSomething":
		               return new DoSomethingInput{
		                   TheBigLeaf = _TheBigLeaf,
		               };
		           case XmlNodeType.Whitespace: break;
		           default: throw new Exception($"Unexpected node type '{reader.NodeType}' : '{reader.Name}' under 'doSomething'");
		       }
		    }
		    throw new Exception("Reached end-of-readability without ever returning from DoSomethingInput.ParseAsync");
		}
	}
    public static async Task<Some.Module.YangNode> ParseAsync(XmlReader reader)
	{
	    while(await reader.ReadAsync())
	    {
	       switch(reader.NodeType)
	       {
	           case XmlNodeType.Element:
	               switch(reader.Name)
	               {
	                    case "rpc-error": throw await RpcException.ParseAsync(reader);
	                    default: throw new Exception($"Unexpected element '{reader.Name}' under 'some-module'");
	               }
	           case XmlNodeType.EndElement when reader.Name == "some-module":
	               return new Some.Module.YangNode{
	               };
	           case XmlNodeType.Whitespace: break;
	           default: throw new Exception($"Unexpected node type '{reader.NodeType}' : '{reader.Name}' under 'some-module'");
	       }
	    }
	    throw new Exception("Reached end-of-readability without ever returning from Some.Module.YangNode.ParseAsync");
	}
    public async Task WriteXMLAsync(XmlWriter writer)
	{
	    await writer.WriteStartElementAsync(null,"some-module","urn:dotnet:yang:andrei");
	    await writer.WriteEndElementAsync();
	}
}
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project DotnetYang ](/sources/DotnetYang.zip)

:::


### Share DotnetYang 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang&quote=DotnetYang" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang&text=DotnetYang:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang&title=DotnetYang" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang&title=DotnetYang&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDotnetYang" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DotnetYang

### In the same category (FilesToCode) - 13 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [Datacute.EmbeddedResourcePropertyGenerator](/docs/Datacute.EmbeddedResourcePropertyGenerator)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_JSON2Class](/docs/RSCG_JSON2Class)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [ThisAssembly.Strings](/docs/ThisAssembly.Strings)


#### [Weave](/docs/Weave)

