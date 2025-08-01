---
sidebar_position: 210
title: 21 - Microsoft.Interop.JavaScript.JSImportGenerator
description: Generating partial JSimport / JSExport in C# form
slug: /Microsoft.Interop.JavaScript.JSImportGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Microsoft.Interop.JavaScript.JSImportGenerator  by Microsoft


<TOCInline toc={toc}  />

## Nuget / site data




## Details

### Info
:::info

Name: **Microsoft.Interop.JavaScript.JSImportGenerator**



Author: Microsoft

NuGet: 
**   


You can find more details at 

Source : 

:::

### Original Readme
:::note



:::

### About
:::note

Generating partial JSimport / JSExport in C# form


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Microsoft.Interop.JavaScript.JSImportGenerator**
```xml showLineNumbers {1}
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="7.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="7.0.0" PrivateAssets="all" />
  </ItemGroup>

  <ItemGroup>
    <ServiceWorker Include="wwwroot\service-worker.js" PublishedContent="wwwroot\service-worker.published.js" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Program.cs" label="Program.cs" >

  This is the use of **Microsoft.Interop.JavaScript.JSImportGenerator** in *Program.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using TestBlazor;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\index.razor.cs" label="index.razor.cs" >

  This is the use of **Microsoft.Interop.JavaScript.JSImportGenerator** in *index.razor.cs*

```csharp showLineNumbers 


using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace TestBlazor.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage(string s);
    [JSExport]
    internal static string GetMessageFromDotnet(string s)
    {
        return " GetMessageFromDotnet  => " +  s;
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor" label="Index.razor" >

  This is the use of **Microsoft.Interop.JavaScript.JSImportGenerator** in *Index.razor*

```csharp showLineNumbers 
@page "/"

<div class="card" style="width:22rem">
    <div class="card-body">
        <h3 class="card-title">@Title</h3>
        <p class="card-text">@ChildContent</p>
        <button @onclick="OnYes">Yes! @i  @s</button>
    </div>
</div>

@code {
    int i =0;
    string s = "aa";
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    [Parameter]
    public string? Title { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await JSHost.ImportAsync("CallJavaScript1",
           "../Pages/index.razor.js");
        await base.OnInitializedAsync();
    }
    private void OnYes()
    {
        s = CallJavaScript1.GetWelcomeMessage("number "+ i);
        Console.WriteLine("Write to the console in C#! 'Yes' button selected.");
        i++;
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\index.razor.js" label="index.razor.js" >

  This is the use of **Microsoft.Interop.JavaScript.JSImportGenerator** in *index.razor.js*

```csharp showLineNumbers 
export function getMessage(fromCSharp) {
    console.log('test');
    setMessage(' JavaSCript getMessage =>'+ fromCSharp);
    return "andrei";
}


export async function setMessage(message) {
    const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
    var exports = await getAssemblyExports("TestBlazor.dll");
    var fromJScript = " Javascript setMessage =>" + message;
    console.log(exports.TestBlazor.Pages.CallJavaScript1.GetMessageFromDotnet(fromJScript));
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\App_razor.g.cs" label="App_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "ca69fbc161c0130d6d7831728befc975abb17b04491a271bc49266261055543b"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Components;
#nullable restore
#line (1,2)-(1,23) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http

#nullable disable
    ;
#nullable restore
#line (2,2)-(2,28) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json

#nullable disable
    ;
#nullable restore
#line (3,2)-(3,47) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing

#nullable disable
    ;
#nullable restore
#line (4,2)-(4,43) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web

#nullable disable
    ;
#nullable restore
#line (5,2)-(5,56) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http

#nullable disable
    ;
#nullable restore
#line (6,2)-(6,27) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop

#nullable disable
    ;
#nullable restore
#line (7,2)-(7,18) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor

#nullable disable
    ;
#nullable restore
#line (8,2)-(8,34) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#nullable disable
#nullable restore
#line (9,2)-(9,50) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#nullable disable
    #line default
    #line hidden
    #nullable restore
    public partial class App : global::Microsoft.AspNetCore.Components.ComponentBase
    #nullable disable
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Routing.Router>(0);
            __builder.AddAttribute(1, nameof(global::Microsoft.AspNetCore.Components.Routing.Router.
#nullable restore
#line (1,9)-(1,20) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
AppAssembly

#line default
#line hidden
#nullable disable
            ), (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Reflection.Assembly>(
#nullable restore
#line (1,23)-(1,43) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
typeof(App).Assembly

#line default
#line hidden
#nullable disable
            )));
            __builder.AddAttribute(2, "Found", (global::Microsoft.AspNetCore.Components.RenderFragment<global::Microsoft.AspNetCore.Components.RouteData>)((routeData) => (__builder2) => {
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.RouteView>(3);
                __builder2.AddAttribute(4, nameof(global::Microsoft.AspNetCore.Components.RouteView.
#nullable restore
#line (3,20)-(3,29) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
RouteData

#line default
#line hidden
#nullable disable
                ), (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::Microsoft.AspNetCore.Components.RouteData>(
#nullable restore
#line (3,32)-(3,41) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
routeData

#line default
#line hidden
#nullable disable
                )));
                __builder2.AddAttribute(5, nameof(global::Microsoft.AspNetCore.Components.RouteView.
#nullable restore
#line (3,43)-(3,56) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
DefaultLayout

#line default
#line hidden
#nullable disable
                ), (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Type>(
#nullable restore
#line (3,59)-(3,77) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
typeof(MainLayout)

#line default
#line hidden
#nullable disable
                )));
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(6, "\r\n        ");
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.Routing.FocusOnNavigate>(7);
                __builder2.AddAttribute(8, nameof(global::Microsoft.AspNetCore.Components.Routing.FocusOnNavigate.
#nullable restore
#line (4,26)-(4,35) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
RouteData

#line default
#line hidden
#nullable disable
                ), (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::Microsoft.AspNetCore.Components.RouteData>(
#nullable restore
#line (4,38)-(4,47) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
routeData

#line default
#line hidden
#nullable disable
                )));
                __builder2.AddAttribute(9, nameof(global::Microsoft.AspNetCore.Components.Routing.FocusOnNavigate.
#nullable restore
#line (4,49)-(4,57) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
Selector

#line default
#line hidden
#nullable disable
                ), (object)("h1"));
                __builder2.CloseComponent();
            }
            ));
            __builder.AddAttribute(10, "NotFound", (global::Microsoft.AspNetCore.Components.RenderFragment)((__builder2) => {
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.Web.PageTitle>(11);
                __builder2.AddAttribute(12, "ChildContent", (global::Microsoft.AspNetCore.Components.RenderFragment)((__builder3) => {
                    __builder3.AddContent(13, "Not found");
                }
                ));
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(14, "\r\n        ");
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.LayoutView>(15);
                __builder2.AddAttribute(16, nameof(global::Microsoft.AspNetCore.Components.LayoutView.
#nullable restore
#line (8,21)-(8,27) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
Layout

#line default
#line hidden
#nullable disable
                ), (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Type>(
#nullable restore
#line (8,30)-(8,48) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
typeof(MainLayout)

#line default
#line hidden
#nullable disable
                )));
                __builder2.AddAttribute(17, "ChildContent", (global::Microsoft.AspNetCore.Components.RenderFragment)((__builder3) => {
                    __builder3.AddMarkupContent(18, "<p role=\"alert\">Sorry, there\'s nothing at this address.</p>");
                }
                ));
                __builder2.CloseComponent();
            }
            ));
            __builder.CloseComponent();
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\MainLayout_razor.g.cs" label="MainLayout_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\MainLayout.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "ae5700b58f509b241d54e7cc9392df00c78fe49dc34536d713dcbb68e7b415a2"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Components;
#nullable restore
#line (1,2)-(1,23) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http

#nullable disable
    ;
#nullable restore
#line (2,2)-(2,28) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json

#nullable disable
    ;
#nullable restore
#line (3,2)-(3,47) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing

#nullable disable
    ;
#nullable restore
#line (4,2)-(4,43) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web

#nullable disable
    ;
#nullable restore
#line (5,2)-(5,56) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http

#nullable disable
    ;
#nullable restore
#line (6,2)-(6,27) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop

#nullable disable
    ;
#nullable restore
#line (7,2)-(7,18) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor

#nullable disable
    ;
#nullable restore
#line (8,2)-(8,34) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#nullable disable
#nullable restore
#line (9,2)-(9,50) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#nullable disable
    #line default
    #line hidden
    #nullable restore
    public partial class MainLayout : 
#nullable restore
#line (1,11)-(1,30) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\MainLayout.razor"
LayoutComponentBase

#line default
#line hidden
#nullable disable

    #nullable disable
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "main");
#nullable restore
#line (4,6)-(4,10) 24 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\MainLayout.razor"
__builder.AddContent(1, Body

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Pages_Index_razor.g.cs" label="Pages_Index_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "aa041de1d9d3922f2df558b4a08272ee907b58c89f74ea567a271428b96a1f4e"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor.Pages
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Components;
#nullable restore
#line (1,2)-(1,23) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http

#nullable disable
    ;
#nullable restore
#line (2,2)-(2,28) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json

#nullable disable
    ;
#nullable restore
#line (3,2)-(3,47) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing

#nullable disable
    ;
#nullable restore
#line (4,2)-(4,43) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web

#nullable disable
    ;
#nullable restore
#line (5,2)-(5,56) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http

#nullable disable
    ;
#nullable restore
#line (6,2)-(6,27) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop

#nullable disable
    ;
#nullable restore
#line (7,2)-(7,18) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor

#nullable disable
    ;
#nullable restore
#line (8,2)-(8,34) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#nullable disable
#nullable restore
#line (9,2)-(9,50) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#nullable disable
    #line default
    #line hidden
    [global::Microsoft.AspNetCore.Components.RouteAttribute(
    // language=Route,Component
#nullable restore
#line (1,7)-(1,10) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
"/"

#line default
#line hidden
#nullable disable
    )]
    #nullable restore
    public partial class Index : global::Microsoft.AspNetCore.Components.ComponentBase
    #nullable disable
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.AddAttribute(1, "class", "card");
            __builder.AddAttribute(2, "style", "width:22rem");
            __builder.OpenElement(3, "div");
            __builder.AddAttribute(4, "class", "card-body");
            __builder.OpenElement(5, "h3");
            __builder.AddAttribute(6, "class", "card-title");
#nullable restore
#line (5,33)-(5,38) 24 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(7, Title

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(8, "\r\n        ");
            __builder.OpenElement(9, "p");
            __builder.AddAttribute(10, "class", "card-text");
#nullable restore
#line (6,31)-(6,43) 25 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(11, ChildContent

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(12, "\r\n        ");
            __builder.OpenElement(13, "button");
            __builder.AddAttribute(14, "onclick", global::Microsoft.AspNetCore.Components.EventCallback.Factory.Create<global::Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line (7,27)-(7,32) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
OnYes

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(15, "Yes! ");
#nullable restore
#line (7,40)-(7,41) 25 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(16, i

#line default
#line hidden
#nullable disable
            );
            __builder.AddContent(17, "  ");
#nullable restore
#line (7,44)-(7,45) 25 "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(18, s

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.CloseElement();
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line (11,8)-(32,1) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"

    int i =0;
    string s = "aa";
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    [Parameter]
    public string? Title { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await JSHost.ImportAsync("CallJavaScript1",
           "../Pages/index.razor.js");
        await base.OnInitializedAsync();
    }
    private void OnYes()
    {
        s = CallJavaScript1.GetWelcomeMessage("number "+ i);
        Console.WriteLine("Write to the console in C#! 'Yes' button selected.");
        i++;
    }

#line default
#line hidden
#nullable disable

    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\_Imports_razor.g.cs" label="_Imports_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "b7b5050a7c8564675deb28d65ac06666412236a28151ac87d29acc67cf28aa36"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Components;
#nullable restore
#line (1,2)-(1,23) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http

#nullable disable
    ;
#nullable restore
#line (2,2)-(2,28) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json

#nullable disable
    ;
#nullable restore
#line (3,2)-(3,47) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing

#nullable disable
    ;
#nullable restore
#line (4,2)-(4,43) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web

#nullable disable
    ;
#nullable restore
#line (5,2)-(5,56) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http

#nullable disable
    ;
#nullable restore
#line (6,2)-(6,27) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop

#nullable disable
    ;
#nullable restore
#line (7,2)-(7,18) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor

#nullable disable
    ;
#nullable restore
#line (8,2)-(8,34) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#nullable disable
#nullable restore
#line (9,2)-(9,50) "D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#nullable disable
    #line default
    #line hidden
    #nullable restore
    public partial class _Imports : object
    #nullable disable
    {
        #pragma warning disable 1998
        protected void Execute()
        {
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.Interop.JavaScript.JSImportGenerator\Microsoft.Interop.JavaScript.JSExportGenerator\JSExports.g.cs" label="JSExports.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
namespace TestBlazor.Pages
{
    public partial class CallJavaScript1
    {
        internal static unsafe void __Wrapper_GetMessageFromDotnet_569789743(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
        {
            string s;
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
            string __retVal;
            // Setup - Perform required setup.
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __s_native__js_arg = ref __arguments_buffer[2];
            // Unmarshal - Convert native data to managed data.
            __s_native__js_arg.ToManaged(out s);
            try
            {
                __retVal = TestBlazor.Pages.CallJavaScript1.GetMessageFromDotnet(s);
                __arg_return.ToJS(__retVal);
            }
            catch (global::System.Exception ex)
            {
                __arg_exception.ToJS(ex);
            }
        }

        [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
        [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_GetMessageFromDotnet_569789743", typeof(TestBlazor.Pages.CallJavaScript1))]
        internal static void __Register_GetMessageFromDotnet_569789743()
        {
            if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
                return;
            global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[TestBlazor]TestBlazor.Pages.CallJavaScript1:GetMessageFromDotnet", 569789743, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[] { global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String, global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String });
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.Interop.JavaScript.JSImportGenerator\Microsoft.Interop.JavaScript.JSImportGenerator\JSImports.g.cs" label="JSImports.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
namespace TestBlazor.Pages
{
    public partial class CallJavaScript1
    {
        [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Interop.JavaScript.JSImportGenerator", "7.0.10.26716")]
        internal static partial string GetWelcomeMessage(string s)
        {
            if (__signature_GetWelcomeMessage_569789743 == null)
            {
                __signature_GetWelcomeMessage_569789743 = global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindJSFunction("getMessage", "CallJavaScript1", new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[] { global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String, global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String });
            }

            global::System.Span<global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument> __arguments_buffer = stackalloc global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument[3];
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
            __arg_exception.Initialize();
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
            __arg_return.Initialize();
            string __retVal;
            // Setup - Perform required setup.
            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __s_native__js_arg = ref __arguments_buffer[2];
            __s_native__js_arg.ToJS(s);
            global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.InvokeJS(__signature_GetWelcomeMessage_569789743, __arguments_buffer);
            // Unmarshal - Convert native data to managed data.
            __arg_return.ToManaged(out __retVal);
            return __retVal;
        }

        [global::System.ThreadStaticAttribute]
        static global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding __signature_GetWelcomeMessage_569789743;
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Microsoft.Interop.JavaScript.JSImportGenerator ](/sources/Microsoft.Interop.JavaScript.JSImportGenerator.zip)

:::


### Share Microsoft.Interop.JavaScript.JSImportGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&quote=Microsoft.Interop.JavaScript.JSImportGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&text=Microsoft.Interop.JavaScript.JSImportGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&title=Microsoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&title=Microsoft.Interop.JavaScript.JSImportGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Interop.JavaScript.JSImportGenerator

### In the same category (EnhancementClass) - 27 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [Comparison](/docs/Comparison)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemberAccessor](/docs/MemberAccessor)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

