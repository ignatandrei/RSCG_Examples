---
sidebar_position: 2420
title: 242 - RSCG_MCP2File
description: Generating code for saving MCP result to file.
slug: /RSCG_MCP2File
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMCP.mdx';

# RSCG_MCP2File  by Ignat Andrei


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_MCP2File?label=RSCG_MCP2File)](https://www.nuget.org/packages/RSCG_MCP2File/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_OpenApi2MCP?label=updated)](https://github.com/ignatandrei/RSCG_OpenApi2MCP)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_OpenApi2MCP?style=social)

## Details

### Info
:::info

Name: **RSCG_MCP2File**

Generating MCP tool function that exports to file the result of another MCP tool.

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_MCP2File/*   


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

Generating code for saving MCP result to file.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_MCP2File**
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
		<PackageReference Include="RSCG_MCP2File" Version="9.2025.1202.1952" />
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2File\src\MCPDemo\MCPDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_MCP2File** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using MCPDemo;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenAPISwaggerUI;
using Serilog;
using Serilog.Events;

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
    
    


var t1 = web.RunAsync();
var t2 = app.RunAsync();

await Task.WhenAll(t1, t2);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2File\src\MCPDemo\MCPDemo\obj\GX\RSCG_MCP2File\RSCG_MCP2File.MCP2File\MCPExportToFile.g.cs" label="MCPExportToFile.g.cs" >
```csharp showLineNumbers 

                namespace MCP2File
                {
                    [global::Microsoft.CodeAnalysis.EmbeddedAttribute]
                    [global::System.AttributeUsage(global::System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
                    internal class AddMCPExportToFile: global::System.Attribute {} 
                }
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2File\src\MCPDemo\MCPDemo\obj\GX\RSCG_MCP2File\RSCG_MCP2File.MCP2File\Microsoft.CodeAnalysis.EmbeddedAttribute.cs" label="Microsoft.CodeAnalysis.EmbeddedAttribute.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_MCP2File\src\MCPDemo\MCPDemo\obj\GX\RSCG_MCP2File\RSCG_MCP2File.MCP2File\MyTools_ExportToFile.g.cs" label="MyTools_ExportToFile.g.cs" >
```csharp showLineNumbers 
// Auto-generated by MCP2File
namespace MCPDemo
{
    public partial class MyTools
    {
         [global::ModelContextProtocol.Server.McpServerTool]
               [global::System.ComponentModel.Description("calls the SendEcho and saves the result to a file ")]
        public async Task SendEchoExportToFile(string echoData, string exportToFile)
        {
            dynamic result = await SendEcho(echoData);
            if (result is byte[] bytes)
            {
                await File.WriteAllBytesAsync(exportToFile, bytes);
            }
            else if (result is string str)
            {
                await File.WriteAllTextAsync(exportToFile, str);
            }
            else
            {
                await File.WriteAllTextAsync(exportToFile, result?.ToString() ?? string.Empty);
            }
        }

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RSCG_MCP2File ](/sources/RSCG_MCP2File.zip)

:::


### Share RSCG_MCP2File 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File&quote=RSCG_MCP2File" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File&text=RSCG_MCP2File:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File&title=RSCG_MCP2File" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File&title=RSCG_MCP2File&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_MCP2File" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_MCP2File

<SameCategory />

