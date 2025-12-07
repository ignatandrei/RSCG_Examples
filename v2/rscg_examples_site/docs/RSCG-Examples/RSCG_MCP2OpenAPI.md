---
sidebar_position: 2410
title: 241 - RSCG_MCP2OpenAPI
description: Generating OpenAPI based on MCP source code.
slug: /RSCG_MCP2OpenAPI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMCP.mdx';

# RSCG_MCP2OpenAPI  by Ignat Andrei


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_MCP2OpenAPI?label=RSCG_MCP2OpenAPI)](https://www.nuget.org/packages/RSCG_MCP2OpenAPI/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_OpenApi2MCP?label=updated)](https://github.com/ignatandrei/RSCG_OpenApi2MCP)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_OpenApi2MCP?style=social)

## Details

### Info
:::info

Name: **RSCG_MCP2OpenAPI**

Generating Swagger/OpenAPI function from MCP tool.

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_MCP2OpenAPI/*   


You can find more details at https://github.com/ignatandrei/RSCG_OpenApi2MCP

Source: https://github.com/ignatandrei/RSCG_OpenApi2MCP

:::

### Author
:::note
Ignat Andrei 
![Alt text](https://github.com/ignatandrei.png)
:::

### Original Readme
:::note

This is a place holder


:::

### About
:::note

Generating OpenAPI based on MCP source code.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_MCP2OpenAPI**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0" />

		<PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.0" />
		<PackageReference Include="ModelContextProtocol" Version="0.5.0-preview.1" />
		<PackageReference Include="ModelContextProtocol.AspNetCore" Version="0.5.0-preview.1" />
		<PackageReference Include="RSCG_MCP2OpenAPI" Version="9.2025.1202.1952" />
		<PackageReference Include="OpenAPISwaggerUI" Version="9.2024.1215.2209" />
		<PackageReference Include="Serilog.AspNetCore" Version="10.0.0" />

	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2OpenAPI\src\MCPDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_MCP2OpenAPI** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
global using Microsoft.AspNetCore.Builder;
using MCPDemo;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenAPISwaggerUI;


Console.WriteLine("Hello, World!");
var    builderApp = Host.CreateApplicationBuilder(args);

var    builderWeb = WebApplication.CreateBuilder();

// Configure all logs to go to stderr (stdout is used for the MCP protocol messages).
//builder.Logging.AddConsole(o => o.LogToStandardErrorThreshold = LogLevel.Trace);

var serverApp = builderApp.Services
    .AddMcpServer();
serverApp = serverApp.WithStdioServerTransport();
serverApp.WithTools<MyTools>();


var serverWeb = builderWeb.Services.AddMcpServer();
serverWeb = serverWeb.WithHttpTransport();
serverWeb.WithTools<MyTools>();


builderWeb.Services.AddOpenApi();
builderWeb.Services.AddTransient<MyTools>();
    
var app = builderApp.Build();
var web = builderWeb.Build();
    web.MapOpenApi();
    web.MapOpenApi("/openapi/{documentName}.yaml");
    web.MapMcp();
    web.UseOpenAPISwaggerUI();
web.AddAll_MyTools();

var t1 = web.RunAsync();
var t2 = app.RunAsync();

await Task.WhenAll(t1, t2);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2OpenAPI\src\MCPDemo\MyTools.cs" label="MyTools.cs" >

  This is the use of **RSCG_MCP2OpenAPI** in *MyTools.cs*

```csharp showLineNumbers 
using ModelContextProtocol.Server;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MCPDemo;
[MCP2OpenAPI.AddMCP2OpenApi()]
partial class MyTools
{
    [McpServerTool]
    [Description("Echo demo")]
    public async Task<string> SendEcho([Description("echo")] string echoData)
    {
        await Task.Delay(10);
        return echoData;
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2OpenAPI\src\MCPDemo\obj\GX\RSCG_MCP2OpenAPI\RSCG_MCP2OpenAPI.MCP2OpenAPI\MCP2OpenAPI.g.cs" label="MCP2OpenAPI.g.cs" >
```csharp showLineNumbers 

                namespace MCP2OpenAPI
                {
                    [global::Microsoft.CodeAnalysis.EmbeddedAttribute]
                    [global::System.AttributeUsage(global::System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
                    internal class AddMCP2OpenApi: global::System.Attribute {} 
                }
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2OpenAPI\src\MCPDemo\obj\GX\RSCG_MCP2OpenAPI\RSCG_MCP2OpenAPI.MCP2OpenAPI\Microsoft.CodeAnalysis.EmbeddedAttribute.cs" label="Microsoft.CodeAnalysis.EmbeddedAttribute.cs" >
```csharp showLineNumbers 
// <auto-generated/>
namespace Microsoft.CodeAnalysis
{
    internal sealed partial class EmbeddedAttribute : global::System.Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2OpenAPI\src\MCPDemo\obj\GX\RSCG_MCP2OpenAPI\RSCG_MCP2OpenAPI.MCP2OpenAPI\MyTools_ExportToFile.g.cs" label="MyTools_ExportToFile.g.cs" >
```csharp showLineNumbers 

namespace MCPDemo;


///Number methods : 1
internal static partial class MyTools_OpenAPI
{
    public static void AddAll_MyTools(this Microsoft.AspNetCore.Routing.IEndpointRouteBuilder builder){
Add_SendEcho(builder);
    }



    public record rec_SendEcho ( string? echoData );
    
public static void Add_SendEcho (Microsoft.AspNetCore.Routing.IEndpointRouteBuilder builder){
    
        builder.MapPost("/api/mcp/MyTools/SendEcho",([Microsoft.AspNetCore.Mvc.FromServices]MCPDemo.MyTools toolClass,[Microsoft.AspNetCore.Mvc.FromBody]rec_SendEcho  value)=>
        toolClass.SendEcho(value.echoData)
        );

}



}


```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RSCG_MCP2OpenAPI ](/sources/RSCG_MCP2OpenAPI.zip)

:::


### Share RSCG_MCP2OpenAPI 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI&quote=RSCG_MCP2OpenAPI" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI&text=RSCG_MCP2OpenAPI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI&title=RSCG_MCP2OpenAPI" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI&title=RSCG_MCP2OpenAPI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2OpenAPI" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_MCP2OpenAPI

<SameCategory />

