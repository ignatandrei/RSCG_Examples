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

<!---
<TOCInline toc={toc} />
-->




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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Program.cs" label="Program.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\index.razor.cs" label="index.razor.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor" label="Index.razor" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\index.razor.js" label="index.razor.js" >

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.Interop.JavaScript.JSImportGenerator\Microsoft.Interop.JavaScript.JSExportGenerator\JSExports.g.cs" label="JSExports.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
namespace TestBlazor.Pages
{
    public partial class CallJavaScript1
    {
        internal static unsafe void __Wrapper_GetMessageFromDotnet_962733327(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
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
        [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_GetMessageFromDotnet_962733327", typeof(TestBlazor.Pages.CallJavaScript1))]
        internal static void __Register_GetMessageFromDotnet_962733327()
        {
            if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
                return;
            global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[TestBlazor]TestBlazor.Pages.CallJavaScript1:GetMessageFromDotnet", 962733327, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[] { global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String, global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String });
        }
    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.Interop.JavaScript.JSImportGenerator\Microsoft.Interop.JavaScript.JSImportGenerator\JSImports.g.cs" label="JSImports.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
namespace TestBlazor.Pages
{
    public partial class CallJavaScript1
    {
        [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Interop.JavaScript.JSImportGenerator", "7.0.8.32018")]
        internal static partial string GetWelcomeMessage(string s)
        {
            if (__signature_GetWelcomeMessage_962733327 == null)
            {
                __signature_GetWelcomeMessage_962733327 = global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindJSFunction("getMessage", "CallJavaScript1", new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[] { global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String, global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String });
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
            global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.InvokeJS(__signature_GetWelcomeMessage_962733327, __arguments_buffer);
            // Unmarshal - Convert native data to managed data.
            __arg_return.ToManaged(out __retVal);
            return __retVal;
        }

        [global::System.ThreadStaticAttribute]
        static global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding __signature_GetWelcomeMessage_962733327;
    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\App_razor.g.cs" label="App_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "ca69fbc161c0130d6d7831728befc975abb17b04491a271bc49266261055543b"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#line default
#line hidden
#nullable disable
    public partial class App : global::Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenComponent<global::Microsoft.AspNetCore.Components.Routing.Router>(0);
            __builder.AddAttribute(1, "AppAssembly", (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Reflection.Assembly>(
#nullable restore
#line 1 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
                      typeof(App).Assembly

#line default
#line hidden
#nullable disable
            )));
            __builder.AddAttribute(2, "Found", (global::Microsoft.AspNetCore.Components.RenderFragment<Microsoft.AspNetCore.Components.RouteData>)((routeData) => (__builder2) => {
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.RouteView>(3);
                __builder2.AddAttribute(4, "RouteData", (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::Microsoft.AspNetCore.Components.RouteData>(
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
                               routeData

#line default
#line hidden
#nullable disable
                )));
                __builder2.AddAttribute(5, "DefaultLayout", (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Type>(
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
                                                          typeof(MainLayout)

#line default
#line hidden
#nullable disable
                )));
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(6, "\r\n        ");
                __builder2.OpenComponent<global::Microsoft.AspNetCore.Components.Routing.FocusOnNavigate>(7);
                __builder2.AddAttribute(8, "RouteData", (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::Microsoft.AspNetCore.Components.RouteData>(
#nullable restore
#line 4 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
                                     routeData

#line default
#line hidden
#nullable disable
                )));
                __builder2.AddAttribute(9, "Selector", (object)("h1"));
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
                __builder2.AddAttribute(16, "Layout", (object)(global::Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<global::System.Type>(
#nullable restore
#line 8 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\App.razor"
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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\MainLayout_razor.g.cs" label="MainLayout_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\MainLayout.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "ae5700b58f509b241d54e7cc9392df00c78fe49dc34536d713dcbb68e7b415a2"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#line default
#line hidden
#nullable disable
    public partial class MainLayout : LayoutComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "main");
#nullable restore
#line (4,6)-(4,10) 24 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\MainLayout.razor"
__builder.AddContent(1, Body);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Pages_Index_razor.g.cs" label="Pages_Index_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "aa041de1d9d3922f2df558b4a08272ee907b58c89f74ea567a271428b96a1f4e"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Components.RouteAttribute("/")]
    public partial class Index : global::Microsoft.AspNetCore.Components.ComponentBase
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
#line (5,33)-(5,38) 24 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(7, Title);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.AddMarkupContent(8, "\r\n        ");
            __builder.OpenElement(9, "p");
            __builder.AddAttribute(10, "class", "card-text");
#nullable restore
#line (6,31)-(6,43) 25 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(11, ChildContent);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.AddMarkupContent(12, "\r\n        ");
            __builder.OpenElement(13, "button");
            __builder.AddAttribute(14, "onclick", global::Microsoft.AspNetCore.Components.EventCallback.Factory.Create<global::Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 7 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
                          OnYes

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(15, "Yes! ");
#nullable restore
#line (7,40)-(7,41) 25 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(16, i);

#line default
#line hidden
#nullable disable
            __builder.AddContent(17, "  ");
#nullable restore
#line (7,44)-(7,45) 25 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
__builder.AddContent(18, s);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.CloseElement();
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 11 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\Pages\Index.razor"
       
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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\_Imports_razor.g.cs" label="_Imports_razor.g.cs" >


```csharp showLineNumbers 
#pragma checksum "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "b7b5050a7c8564675deb28d65ac06666412236a28151ac87d29acc67cf28aa36"
// <auto-generated/>
#pragma warning disable 1591
namespace TestBlazor
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using TestBlazor;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.Versioning;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Interop.JavaScript.JSImportGenerator\src\TestBlazor\_Imports.razor"
using System.Runtime.InteropServices.JavaScript;

#line default
#line hidden
#nullable disable
    public partial class _Imports : global::Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project Microsoft.Interop.JavaScript.JSImportGenerator ](/sources/Microsoft.Interop.JavaScript.JSImportGenerator.zip)

:::

### Download PDF

[Download PDF Microsoft.Interop.JavaScript.JSImportGenerator ](/pdfs/Microsoft.Interop.JavaScript.JSImportGenerator.pdf)

### Share Microsoft.Interop.JavaScript.JSImportGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&quote=Microsoft.Interop.JavaScript.JSImportGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&text=Microsoft.Interop.JavaScript.JSImportGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&title=Microsoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator&title=Microsoft.Interop.JavaScript.JSImportGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Interop.JavaScript.JSImportGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Interop.JavaScript.JSImportGenerator
