"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[821],{34794:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>m,contentTitle:()=>p,default:()=>g,frontMatter:()=>s,metadata:()=>d,toc:()=>u});var t=n(87462),a=(n(67294),n(3905)),r=n(73992),l=n(18679),o=n(68839);const s={sidebar_position:780,title:"78 - MinimalApiBuilder",description:"Generate Minimal API from classes",slug:"/MinimalApiBuilder"},p="MinimalApiBuilder  by",d={unversionedId:"RSCG-Examples/MinimalApiBuilder",id:"RSCG-Examples/MinimalApiBuilder",title:"78 - MinimalApiBuilder",description:"Generate Minimal API from classes",source:"@site/docs/RSCG-Examples/MinimalApiBuilder.md",sourceDirName:"RSCG-Examples",slug:"/MinimalApiBuilder",permalink:"/RSCG_Examples/v2/docs/MinimalApiBuilder",draft:!1,tags:[],version:"current",sidebarPosition:780,frontMatter:{sidebar_position:780,title:"78 - MinimalApiBuilder",description:"Generate Minimal API from classes",slug:"/MinimalApiBuilder"},sidebar:"tutorialSidebar",previous:{title:"77 - DynamicsMapper",permalink:"/RSCG_Examples/v2/docs/DynamicsMapper"},next:{title:"79 - DudNet",permalink:"/RSCG_Examples/v2/docs/DudNet"}},m={},u=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use-1",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share MinimalApiBuilder",id:"share-minimalapibuilder",level:3},{value:"In the same category (API) - 7 other generators",id:"in-the-same-category-api---7-other-generators",level:3},{value:"Microsoft.Extensions.Configuration.Binder",id:"microsoftextensionsconfigurationbinder",level:4},{value:"MinimalApis.Discovery",id:"minimalapisdiscovery",level:4},{value:"RDG",id:"rdg",level:4},{value:"Refit",id:"refit",level:4},{value:"RSCG_WebAPIExports",id:"rscg_webapiexports",level:4},{value:"SafeRouting",id:"saferouting",level:4},{value:"SkinnyControllersCommon",id:"skinnycontrollerscommon",level:4}],c={toc:u},h="wrapper";function g(e){let{components:i,...s}=e;return(0,a.kt)(h,(0,t.Z)({},c,s,{components:i,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"minimalapibuilder--by"},"MinimalApiBuilder  by"),(0,a.kt)(o.Z,{toc:u,mdxType:"TOCInline"}),(0,a.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/MinimalApiBuilder/"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/MinimalApiBuilder?label=MinimalApiBuilder",alt:"Nuget"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JensDll/MinimalApiBuilder"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/JensDll/MinimalApiBuilder?label=updated",alt:"GitHub last commit"})),"\n",(0,a.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/JensDll/MinimalApiBuilder?style=social",alt:"GitHub Repo stars"})),(0,a.kt)("h2",{id:"details"},"Details"),(0,a.kt)("h3",{id:"info"},"Info"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Name: ",(0,a.kt)("strong",{parentName:"p"},"MinimalApiBuilder")),(0,a.kt)("p",{parentName:"admonition"},"Reflectionless, source-generated, thin abstraction layer over the ASP.NET Core Minimal APIs\ninterface"),(0,a.kt)("p",{parentName:"admonition"},"Author: "),(0,a.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/MinimalApiBuilder/"},"https://www.nuget.org/packages/MinimalApiBuilder/")),"   "),(0,a.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JensDll/MinimalApiBuilder"},"https://github.com/JensDll/MinimalApiBuilder")),(0,a.kt)("p",{parentName:"admonition"},"Source : ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/JensDll/MinimalApiBuilder"},"https://github.com/JensDll/MinimalApiBuilder"))),(0,a.kt)("h3",{id:"original-readme"},"Original Readme"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("h1",{parentName:"admonition",id:"minimalapibuilder"},"MinimalApiBuilder"),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/MinimalApiBuilder"},(0,a.kt)("img",{parentName:"a",src:"https://badgen.net/nuget/v/MinimalApiBuilder",alt:"nuget"}))),(0,a.kt)("p",{parentName:"admonition"},"Reflectionless, source-generated, thin abstraction layer over\nthe ",(0,a.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-gb/aspnet/core/fundamentals/minimal-apis/overview"},"ASP.NET Core Minimal APIs"),"\ninterface."),(0,a.kt)("h2",{parentName:"admonition",id:"how-to-use"},"How to Use"),(0,a.kt)("p",{parentName:"admonition"},"Based on the Vertical Slice Architecture with ",(0,a.kt)("inlineCode",{parentName:"p"},"Feature")," folder.\nThere is one class for every API endpoint. A basic example looks like the following:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'using Microsoft.AspNetCore.Mvc;\nusing MinimalApiBuilder;\n\npublic partial class BasicEndpoint : MinimalApiBuilderEndpoint\n{\n    private static string Handle([FromServices] BasicEndpoint endpoint)\n    {\n        return "Hello, World!";\n    }\n}\n')),(0,a.kt)("p",{parentName:"admonition"},"The endpoint class must be ",(0,a.kt)("inlineCode",{parentName:"p"},"partial"),", inherit from ",(0,a.kt)("inlineCode",{parentName:"p"},"MinimalApiBuilderEndpoint"),",\nand have a ",(0,a.kt)("inlineCode",{parentName:"p"},"Handle")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"HandleAsync")," method with the containing type passed\nfrom dependency injection.\nThe endpoint is mapped through the typical ",(0,a.kt)("inlineCode",{parentName:"p"},"IEndpointRouteBuilder")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Map<Verb>")," extension methods:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'app.MapGet<BasicEndpoint>("/hello");\n')),(0,a.kt)("p",{parentName:"admonition"},"The above is functionally equivalent to:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'app.MapGet("/hello", static () => "Hello, World!");\n')),(0,a.kt)("p",{parentName:"admonition"},"This library depends on ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/FluentValidation/FluentValidation"},(0,a.kt)("inlineCode",{parentName:"a"},"FluentValidation >= 11")),". An endpoint can have a validated request object:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'public struct BasicRequest\n{\n    public required string Name { get; init; }\n}\n\npublic partial class BasicRequestEndpoint : MinimalApiBuilderEndpoint\n{\n    private static string Handle([FromServices] BasicRequestEndpoint endpoint,\n        [AsParameters] BasicRequest request)\n    {\n        return $"Hello, {request.Name}!";\n    }\n}\n\npublic class BasicRequestValidator : AbstractValidator<BasicRequest>\n{\n    public BasicRequestValidator()\n    {\n        RuleFor(static request => request.Name).MinimumLength(2);\n    }\n}\n')),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'app.MapGet<BasicRequestEndpoint>("/hello/{name}");\n')),(0,a.kt)("p",{parentName:"admonition"},"The incremental generator will generate code to validate the request object before the handler is called and return a ",(0,a.kt)("inlineCode",{parentName:"p"},"400 Bad Request")," response if the validation fails.\nIn ",(0,a.kt)("inlineCode",{parentName:"p"},"Program.cs")," the below"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"builder.Services.AddMinimalApiBuilderEndpoints();\n")),(0,a.kt)("p",{parentName:"admonition"},"needs to be added to register the necessary types with dependency injection.")),(0,a.kt)("h3",{id:"about"},"About"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Generate Minimal API from classes")),(0,a.kt)("h2",{id:"how-to-use-1"},"How to use"),(0,a.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,a.kt)(r.Z,{mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,a.kt)("p",null,"This is the CSharp Project that references ",(0,a.kt)("strong",{parentName:"p"},"MinimalApiBuilder")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {12}",showLineNumbers:!0,"{12}":!0},'<Project Sdk="Microsoft.NET.Sdk.Web">\n\n  <PropertyGroup>\n    <TargetFramework>net7.0</TargetFramework>\n    <Nullable>enable</Nullable>\n    <ImplicitUsings>enable</ImplicitUsings>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="7.0.12" />\n    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />\n      <PackageReference Include="MinimalApiBuilder" Version="1.3.3" />\n  </ItemGroup>\n\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n</Project>\n\n'))),(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\MinimalApiBuilder\\src\\DemoApi\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,a.kt)("p",null,"  This is the use of ",(0,a.kt)("strong",{parentName:"p"},"MinimalApiBuilder")," in ",(0,a.kt)("em",{parentName:"p"},"Program.cs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using MinimalApiBuilder;\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// Add services to the container.\n\nbuilder.Services.AddControllers();\n// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle\nbuilder.Services.AddEndpointsApiExplorer();\nbuilder.Services.AddSwaggerGen();\n//MinimalApiBuilder.DependencyInjection.AddMinimalApiBuilderEndpoints(builder.Services);\nbuilder.Services.AddMinimalApiBuilderEndpoints();\nvar app = builder.Build();\n\n// Configure the HTTP request pipeline.\nif (app.Environment.IsDevelopment())\n{\n    app.UseSwagger();\n    app.UseSwaggerUI();\n}\n\napp.UseAuthorization();\n\napp.MapControllers();\n\napp.MapGet<BasicEndpoint>("/hello");\napp.Run();\n\n'))),(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\MinimalApiBuilder\\src\\DemoApi\\BasicEndpoint.cs",label:"BasicEndpoint.cs",mdxType:"TabItem"},(0,a.kt)("p",null,"  This is the use of ",(0,a.kt)("strong",{parentName:"p"},"MinimalApiBuilder")," in ",(0,a.kt)("em",{parentName:"p"},"BasicEndpoint.cs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using Microsoft.AspNetCore.Mvc;\nusing MinimalApiBuilder;\n\npublic partial class BasicEndpoint : MinimalApiBuilderEndpoint\n{\n    private static string Handle([FromServices] BasicEndpoint endpoint)\n    {\n        return "Hello, World!";\n    }\n}\n\n')))),(0,a.kt)("h3",{id:"generated-files"},"Generated Files"),(0,a.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,a.kt)(r.Z,{mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\MinimalApiBuilder\\src\\DemoApi\\obj\\GX\\MinimalApiBuilder.Generator\\MinimalApiBuilder.Generator.MinimalApiBuilderGenerator\\DependencyInjection.g.cs",label:"DependencyInjection.g.cs",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated>\n// This is a MinimalApiBuilder source generated file.\n// </auto-generated>\n\n#nullable enable\n\nnamespace MinimalApiBuilder\n{\n    public static class DependencyInjection\n    {\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]\n        public static global::Microsoft.Extensions.DependencyInjection.IServiceCollection AddMinimalApiBuilderEndpoints(this global::Microsoft.Extensions.DependencyInjection.IServiceCollection services)\n        {\n            global::Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped<global::BasicEndpoint>(services);\n            return services;\n        }\n    }\n}\n\n'))),(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\MinimalApiBuilder\\src\\DemoApi\\obj\\GX\\MinimalApiBuilder.Generator\\MinimalApiBuilder.Generator.MinimalApiBuilderGenerator\\Endpoint.g.cs",label:"Endpoint.g.cs",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated>\n// This is a MinimalApiBuilder source generated file.\n// </auto-generated>\n\n#nullable enable\n\npublic partial class BasicEndpoint : global::MinimalApiBuilder.IEndpoint\n{\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]\n    public static global::System.Delegate _auto_generated_Handler { get; } = Handle;\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]\n    public static void _auto_generated_Configure(global::Microsoft.AspNetCore.Builder.RouteHandlerBuilder builder)\n    {\n    }\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]\n    public static void Configure(global::Microsoft.AspNetCore.Builder.RouteHandlerBuilder builder)\n    {\n    }\n}\n\n')))),(0,a.kt)("h2",{id:"usefull"},"Usefull"),(0,a.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{target:"_blank",href:n(41834).Z},"Download Example project MinimalApiBuilder "))),(0,a.kt)("h3",{id:"share-minimalapibuilder"},"Share MinimalApiBuilder"),(0,a.kt)("ul",null,(0,a.kt)("li",null,(0,a.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&quote=MinimalApiBuilder",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&text=MinimalApiBuilder:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&title=MinimalApiBuilder",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&title=MinimalApiBuilder&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/MinimalApiBuilder"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/MinimalApiBuilder")),(0,a.kt)("h3",{id:"in-the-same-category-api---7-other-generators"},"In the same category (API) - 7 other generators"),(0,a.kt)("h4",{id:"microsoftextensionsconfigurationbinder"},(0,a.kt)("a",{parentName:"h4",href:"/docs/Microsoft.Extensions.Configuration.Binder"},"Microsoft.Extensions.Configuration.Binder")),(0,a.kt)("h4",{id:"minimalapisdiscovery"},(0,a.kt)("a",{parentName:"h4",href:"/docs/MinimalApis.Discovery"},"MinimalApis.Discovery")),(0,a.kt)("h4",{id:"rdg"},(0,a.kt)("a",{parentName:"h4",href:"/docs/RDG"},"RDG")),(0,a.kt)("h4",{id:"refit"},(0,a.kt)("a",{parentName:"h4",href:"/docs/Refit"},"Refit")),(0,a.kt)("h4",{id:"rscg_webapiexports"},(0,a.kt)("a",{parentName:"h4",href:"/docs/RSCG_WebAPIExports"},"RSCG_WebAPIExports")),(0,a.kt)("h4",{id:"saferouting"},(0,a.kt)("a",{parentName:"h4",href:"/docs/SafeRouting"},"SafeRouting")),(0,a.kt)("h4",{id:"skinnycontrollerscommon"},(0,a.kt)("a",{parentName:"h4",href:"/docs/SkinnyControllersCommon"},"SkinnyControllersCommon")))}g.isMDXComponent=!0},41834:(e,i,n)=>{n.d(i,{Z:()=>t});const t=n.p+"assets/files/MinimalApiBuilder-5ed48bb2f0f9e5e573d0c5a43907cee0.zip"}}]);