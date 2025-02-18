---
sidebar_position: 1740
title: 174 - Dapper.AOT
description: Generating AOT code for Dapper -hydrating classes from SQL queries.
slug: /Dapper.AOT
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Dapper.AOT  by Marc Gravell


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Dapper.AOT?label=Dapper.AOT)](https://www.nuget.org/packages/Dapper.AOT/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DapperLib/DapperAOT?label=updated)](https://github.com/DapperLib/DapperAOT)
![GitHub Repo stars](https://img.shields.io/github/stars/DapperLib/DapperAOT?style=social)

## Details

### Info
:::info

Name: **Dapper.AOT**

Build time (AOT) tools for Dapper

Author: Marc Gravell

NuGet: 
*https://www.nuget.org/packages/Dapper.AOT/*   


You can find more details at https://aot.dapperlib.dev/

Source : https://github.com/DapperLib/DapperAOT

:::

### Original Readme
:::note

Let's face it: ADO.NET is a complicated API, and writing "good" ADO.NET code by hand is time consuming and error-prone. But a lot of times you also don't want
the ceremony of an ORM like EF or LLBLGenPro - you just want to execute SQL!

For years now, Dapper helped by providing a great low-friction way of talking to arbitrary ADO.NET databases, handling command preparation, invocation, and result parsing.

Dapper.AOT radically changes how Dapper works, generating the necessary code *during build*, and offers a range of usage guidance to improve how you use Dapper.

[Getting Started](https://aot.dapperlib.dev/gettingstarted) | [Documentation](https://aot.dapperlib.dev/)

:::

### About
:::note

Generating AOT code for Dapper -hydrating classes from SQL queries.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Dapper.AOT**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Dapper" Version="2.1.35" />
    <PackageReference Include="Dapper.AOT" Version="1.0.31" />
    <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.2" />
  </ItemGroup>
	<PropertyGroup>
		<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);Dapper.AOT</InterceptorsPreviewNamespaces>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dapper.AOT\src\DapperDemo\DapperDemo.csproj" label="DapperDemo.csproj" >

  This is the use of **Dapper.AOT** in *DapperDemo.csproj*

```csharp showLineNumbers 
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Dapper" Version="2.1.35" />
    <PackageReference Include="Dapper.AOT" Version="1.0.31" />
    <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.2" />
  </ItemGroup>
	<PropertyGroup>
		<InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);Dapper.AOT</InterceptorsPreviewNamespaces>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dapper.AOT\src\DapperDemo\Program.cs" label="Program.cs" >

  This is the use of **Dapper.AOT** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information

Console.WriteLine("Hello, World!");
var p= Product.GetProduct(new SqlConnection("Server=localhost;Database=AdventureWorks2019;Trusted_Connection=True;"), 1);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dapper.AOT\src\DapperDemo\Product.cs" label="Product.cs" >

  This is the use of **Dapper.AOT** in *Product.cs*

```csharp showLineNumbers 

namespace DapperDemo;
internal partial class Product
{
    public int ID { get; set; }
    public string Name { get; set; } = "";
    public string ProductId { get; set; } = ""; 
    public static Product GetProduct(SqlConnection connection, int productId) => connection.QueryFirst<Product>(
    "select ID, Name, ProductId from Production.Product where ProductId=@productId", new { productId });
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dapper.AOT\src\DapperDemo\globals.cs" label="globals.cs" >

  This is the use of **Dapper.AOT** in *globals.cs*

```csharp showLineNumbers 
global using Dapper;
global using Microsoft.Data.SqlClient;
global using DapperDemo;


[module: DapperAot]
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dapper.AOT\src\DapperDemo\obj\GX\Dapper.AOT.Analyzers\Dapper.CodeAnalysis.DapperInterceptorGenerator\DapperDemo.generated.cs" label="DapperDemo.generated.cs" >


```csharp showLineNumbers 
#nullable enable
namespace Dapper.AOT // interceptors must be in a known namespace
{
    file static class DapperGeneratedInterceptors
    {
        [global::System.Runtime.CompilerServices.InterceptsLocationAttribute("D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dapper.AOT\\src\\DapperDemo\\Product.cs", 8, 93)]
        internal static global::DapperDemo.Product QueryFirst0(this global::System.Data.IDbConnection cnn, string sql, object? param, global::System.Data.IDbTransaction? transaction, int? commandTimeout, global::System.Data.CommandType? commandType)
        {
            // Query, TypedResult, HasParameters, SingleRow, Text, AtLeastOne, BindResultsByName, KnownParameters
            // takes parameter: <anonymous type: int productId>
            // parameter map: productId
            // returns data: global::DapperDemo.Product
            global::System.Diagnostics.Debug.Assert(!string.IsNullOrWhiteSpace(sql));
            global::System.Diagnostics.Debug.Assert((commandType ?? global::Dapper.DapperAotExtensions.GetCommandType(sql)) == global::System.Data.CommandType.Text);
            global::System.Diagnostics.Debug.Assert(param is not null);

            return global::Dapper.DapperAotExtensions.Command(cnn, transaction, sql, global::System.Data.CommandType.Text, commandTimeout.GetValueOrDefault(), CommandFactory0.Instance).QueryFirst(param, RowFactory0.Instance);

        }


        private static global::Dapper.CommandFactory<object?> DefaultCommandFactory => global::Dapper.CommandFactory.Simple;

        private sealed class RowFactory0 : global::Dapper.RowFactory<global::DapperDemo.Product>
        {
            internal static readonly RowFactory0 Instance = new();
            private RowFactory0() {}
            public override object? Tokenize(global::System.Data.Common.DbDataReader reader, global::System.Span<int> tokens, int columnOffset)
            {
                for (int i = 0; i < tokens.Length; i++)
                {
                    int token = -1;
                    var name = reader.GetName(columnOffset);
                    var type = reader.GetFieldType(columnOffset);
                    switch (NormalizedHash(name))
                    {
                        case 926444256U when NormalizedEquals(name, "id"):
                            token = type == typeof(int) ? 0 : 3; // two tokens for right-typed and type-flexible
                            break;
                        case 2369371622U when NormalizedEquals(name, "name"):
                            token = type == typeof(string) ? 1 : 4;
                            break;
                        case 2521315361U when NormalizedEquals(name, "productid"):
                            token = type == typeof(string) ? 2 : 5;
                            break;

                    }
                    tokens[i] = token;
                    columnOffset++;

                }
                return null;
            }
            public override global::DapperDemo.Product Read(global::System.Data.Common.DbDataReader reader, global::System.ReadOnlySpan<int> tokens, int columnOffset, object? state)
            {
                global::DapperDemo.Product result = new();
                foreach (var token in tokens)
                {
                    switch (token)
                    {
                        case 0:
                            result.ID = reader.GetInt32(columnOffset);
                            break;
                        case 3:
                            result.ID = GetValue<int>(reader, columnOffset);
                            break;
                        case 1:
                            result.Name = reader.GetString(columnOffset);
                            break;
                        case 4:
                            result.Name = GetValue<string>(reader, columnOffset);
                            break;
                        case 2:
                            result.ProductId = reader.GetString(columnOffset);
                            break;
                        case 5:
                            result.ProductId = GetValue<string>(reader, columnOffset);
                            break;

                    }
                    columnOffset++;

                }
                return result;

            }

        }

        private sealed class CommandFactory0 : global::Dapper.CommandFactory<object?> // <anonymous type: int productId>
        {
            internal static readonly CommandFactory0 Instance = new();
            public override void AddParameters(in global::Dapper.UnifiedCommand cmd, object? args)
            {
                var typed = Cast(args, static () => new { productId = default(int) }); // expected shape
                var ps = cmd.Parameters;
                global::System.Data.Common.DbParameter p;
                p = cmd.CreateParameter();
                p.ParameterName = "productId";
                p.DbType = global::System.Data.DbType.Int32;
                p.Direction = global::System.Data.ParameterDirection.Input;
                p.Value = AsValue(typed.productId);
                ps.Add(p);

            }
            public override void UpdateParameters(in global::Dapper.UnifiedCommand cmd, object? args)
            {
                var typed = Cast(args, static () => new { productId = default(int) }); // expected shape
                var ps = cmd.Parameters;
                ps[0].Value = AsValue(typed.productId);

            }
            public override bool CanPrepare => true;

        }


    }
}
namespace System.Runtime.CompilerServices
{
    // this type is needed by the compiler to implement interceptors - it doesn't need to
    // come from the runtime itself, though

    [global::System.Diagnostics.Conditional("DEBUG")] // not needed post-build, so: evaporate
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true)]
    sealed file class InterceptsLocationAttribute : global::System.Attribute
    {
        public InterceptsLocationAttribute(string path, int lineNumber, int columnNumber)
        {
            _ = path;
            _ = lineNumber;
            _ = columnNumber;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Dapper.AOT ](/sources/Dapper.AOT.zip)

:::


### Share Dapper.AOT 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT&quote=Dapper.AOT" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT&text=Dapper.AOT:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT&title=Dapper.AOT" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT&title=Dapper.AOT&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDapper.AOT" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dapper.AOT

### In the same category (Database) - 3 other generators


#### [Breezy](/docs/Breezy)


#### [Gedaq](/docs/Gedaq)


#### [TableStorage](/docs/TableStorage)

