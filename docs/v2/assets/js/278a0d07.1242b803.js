"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2039],{37231:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>h,frontMatter:()=>c,metadata:()=>p,toc:()=>d});var n=a(87462),r=(a(67294),a(3905)),i=a(73992),o=a(18679),s=a(68839);const c={sidebar_position:1520,title:"152 - ServiceScan.SourceGenerator",description:"Generating service collection / DI registration",slug:"/ServiceScan.SourceGenerator"},l="ServiceScan.SourceGenerator  by Oleksandr Liakhevych",p={unversionedId:"RSCG-Examples/ServiceScan.SourceGenerator",id:"RSCG-Examples/ServiceScan.SourceGenerator",title:"152 - ServiceScan.SourceGenerator",description:"Generating service collection / DI registration",source:"@site/docs/RSCG-Examples/ServiceScan.SourceGenerator.md",sourceDirName:"RSCG-Examples",slug:"/ServiceScan.SourceGenerator",permalink:"/RSCG_Examples/v2/docs/ServiceScan.SourceGenerator",draft:!1,tags:[],version:"current",sidebarPosition:1520,frontMatter:{sidebar_position:1520,title:"152 - ServiceScan.SourceGenerator",description:"Generating service collection / DI registration",slug:"/ServiceScan.SourceGenerator"},sidebar:"tutorialSidebar",previous:{title:"151 - ThisAssembly.Strings",permalink:"/RSCG_Examples/v2/docs/ThisAssembly.Strings"},next:{title:"153 - RSCG_ExportDiagram",permalink:"/RSCG_Examples/v2/docs/RSCG_ExportDiagram"}},m={},d=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share ServiceScan.SourceGenerator",id:"share-servicescansourcegenerator",level:3},{value:"In the same category (DependencyInjection) - 5 other generators",id:"in-the-same-category-dependencyinjection---5-other-generators",level:3},{value:"AutoRegisterInject",id:"autoregisterinject",level:4},{value:"depso",id:"depso",level:4},{value:"FactoryGenerator",id:"factorygenerator",level:4},{value:"Injectio",id:"injectio",level:4},{value:"jab",id:"jab",level:4}],u={toc:d},S="wrapper";function h(e){let{components:t,...c}=e;return(0,r.kt)(S,(0,n.Z)({},u,c,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"servicescansourcegenerator--by-oleksandr-liakhevych"},"ServiceScan.SourceGenerator  by Oleksandr Liakhevych"),(0,r.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,r.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/ServiceScan.SourceGenerator/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/ServiceScan.SourceGenerator?label=ServiceScan.SourceGenerator",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Dreamescaper/ServiceScan.SourceGenerator"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/Dreamescaper/ServiceScan.SourceGenerator?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/Dreamescaper/ServiceScan.SourceGenerator?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"ServiceScan.SourceGenerator")),(0,r.kt)("p",{parentName:"admonition"},"Package Description"),(0,r.kt)("p",{parentName:"admonition"},"Author: Oleksandr Liakhevych"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/ServiceScan.SourceGenerator/"},"https://www.nuget.org/packages/ServiceScan.SourceGenerator/")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Dreamescaper/ServiceScan.SourceGenerator"},"https://github.com/Dreamescaper/ServiceScan.SourceGenerator")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Dreamescaper/ServiceScan.SourceGenerator"},"https://github.com/Dreamescaper/ServiceScan.SourceGenerator"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"servicescansourcegenerator"},"ServiceScan.SourceGenerator"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/ServiceScan.SourceGenerator/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/ServiceScan.SourceGenerator",alt:"NuGet Version"}))),(0,r.kt)("p",{parentName:"admonition"},"Source generator for services registrations inspired by ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/khellang/Scrutor/"},"Scrutor"),".\nCode generation allows to have AOT-compatible code, without an additional hit on startup performance due to runtime assembly scanning."),(0,r.kt)("h2",{parentName:"admonition",id:"installation"},"Installation"),(0,r.kt)("p",{parentName:"admonition"},"Add the NuGet Package to your project:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"dotnet add package ServiceScan.SourceGenerator\n")),(0,r.kt)("h2",{parentName:"admonition",id:"usage"},"Usage"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"ServiceScan")," generates a partial method implementation based on ",(0,r.kt)("inlineCode",{parentName:"p"},"GenerateServiceRegistrations")," attribute. This attribute can be added to a partial method with ",(0,r.kt)("inlineCode",{parentName:"p"},"IServiceCollection")," parameter.\nFor example, based on the following partial method:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static partial class ServicesExtensions\n{\n    [GenerateServiceRegistrations(AssignableTo = typeof(IMyService), Lifetime = ServiceLifetime.Scoped)]\n    public static partial IServiceCollection AddServices(this IServiceCollection services);\n}\n")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"ServiceScan")," will generate the following implementation:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static partial class ServicesExtensions\n{\n    public static partial IServiceCollection AddServices(this IServiceCollection services)\n    {\n        return services\n            .AddScoped<IMyService, ServiceImplementation1>()\n            .AddScoped<IMyService, ServiceImplementation2>();\n    }\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"The only thing left is to invoke this method on your ",(0,r.kt)("inlineCode",{parentName:"p"},"IServiceCollection")," instance."),(0,r.kt)("h2",{parentName:"admonition",id:"examples"},"Examples"),(0,r.kt)("h3",{parentName:"admonition",id:"register-all-fluentvalidation-validators"},"Register all ",(0,r.kt)("a",{parentName:"h3",href:"https://github.com/FluentValidation/FluentValidation"},"FluentValidation")," validators"),(0,r.kt)("p",{parentName:"admonition"},"Unlike using ",(0,r.kt)("inlineCode",{parentName:"p"},"FluentValidation.DependencyInjectionExtensions")," package, ",(0,r.kt)("inlineCode",{parentName:"p"},"ServiceScan")," is AOT-compatible, and doesn't affect startup performance:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"[GenerateServiceRegistrations(AssignableTo = typeof(IValidator<>), Lifetime = ServiceLifetime.Singleton)]\npublic static partial IServiceCollection AddValidators(this IServiceCollection services);\n")),(0,r.kt)("h3",{parentName:"admonition",id:"add-mediatr-handlers"},"Add ",(0,r.kt)("a",{parentName:"h3",href:"https://github.com/jbogard/MediatR"},"MediatR")," handlers"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static IServiceCollection AddMediatR(this IServiceCollection services)\n{\n    return services\n        .AddTransient<IMediator, Mediator>()\n        .AddMediatRHandlers();\n}\n\n[GenerateServiceRegistrations(AssignableTo = typeof(IRequestHandler<>), Lifetime = ServiceLifetime.Transient)]\n[GenerateServiceRegistrations(AssignableTo = typeof(IRequestHandler<,>), Lifetime = ServiceLifetime.Transient)]\nprivate static partial IServiceCollection AddMediatRHandlers(this IServiceCollection services);\n")),(0,r.kt)("p",{parentName:"admonition"},"It adds MediatR handlers, which would work for simple cases, although you might need to add other types like PipelineBehaviors or NotificationHandlers."),(0,r.kt)("h3",{parentName:"admonition",id:"add-all-repository-types-from-your-project-based-on-name-filter-as-their-implemented-interfaces"},"Add all repository types from your project based on name filter as their implemented interfaces:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'[GenerateServiceRegistrations(\n    TypeNameFilter = "*Repository",\n    AsImplemetedInterfaces = true,\n    Lifetime = ServiceLifetime.Scoped)]\nprivate static partial IServiceCollection AddRepositories(this IServiceCollection services);\n')),(0,r.kt)("h2",{parentName:"admonition",id:"parameters"},"Parameters"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"GenerateServiceRegistrations")," attribute has the following properties:\n| Property | Description |\n| --- | --- |\n| ",(0,r.kt)("strong",{parentName:"p"},"FromAssemblyOf")," |Set the assembly containing the given type as the source of types to register. If not specified, the assembly containing the method with this attribute will be used. |\n| ",(0,r.kt)("strong",{parentName:"p"},"AssignableTo")," | Set the type that the registered types must be assignable to. Types will be registered with this type as the service type, unless ",(0,r.kt)("inlineCode",{parentName:"p"},"AsImplementedInterfaces")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"AsSelf")," is set. |\n| ",(0,r.kt)("strong",{parentName:"p"},"Lifetime")," | Set the lifetime of the registered services. ",(0,r.kt)("inlineCode",{parentName:"p"},"ServiceLifetime.Transient")," is used if not specified. |\n| ",(0,r.kt)("strong",{parentName:"p"},"AsImplementedInterfaces")," | If true, the registered types will be registered as implemented interfaces instead of their actual type. |\n| ",(0,r.kt)("strong",{parentName:"p"},"AsSelf")," | If true, types will be registered with their actual type. It can be combined with ",(0,r.kt)("inlineCode",{parentName:"p"},"AsImplementedInterfaces"),'. In that case implemeted interfaces will be "forwarded" to an actual implementation type |\n| ',(0,r.kt)("strong",{parentName:"p"},"TypeNameFilter")," | Set this value to filter the types to register by their full name. You can use '*' wildcards. You can also use ',' to separate multiple filters. |")),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Generating service collection / DI registration")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"ServiceScan.SourceGenerator")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {14}",showLineNumbers:!0,"{14}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n    <ItemGroup>\n      <PackageReference Include="ServiceScan.SourceGenerator" Version="1.1.2">\n        <PrivateAssets>all</PrivateAssets>\n        <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>\n      </PackageReference>\n        <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="8.0.0" />\n    </ItemGroup>\n</Project>\n\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ServiceScan.SourceGenerator\\src\\InjectDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"ServiceScan.SourceGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using InjectDemo;\nusing Microsoft.Extensions.DependencyInjection;\nvar sc=new ServiceCollection();\nsc.AddMyServices();\nvar sp=sc.BuildServiceProvider();\nvar con = sp.GetService(typeof(Database)) as IDatabase;\nArgumentNullException.ThrowIfNull(con);\ncon.Open();\n\n\n\npublic static partial class MyServiceProvider\n{\n    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(Database),AsSelf =true, Lifetime = ServiceLifetime.Scoped)]\n\n    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(IDatabase), Lifetime = ServiceLifetime.Scoped)]\n    public static partial IServiceCollection AddMyServices(this IServiceCollection services)\n    ;\n}\n"))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ServiceScan.SourceGenerator\\src\\InjectDemo\\Database.cs",label:"Database.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"ServiceScan.SourceGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"Database.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace InjectDemo;\n\npartial class Database : IDatabase\n{\n    private readonly IDatabase con;\n\n    public Database(IDatabase con)\n    {\n        this.con = con;\n    }\n    public void Open()\n    {\n        Console.WriteLine($"open from database");\n        con.Open();\n    }\n\n}\n\n\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ServiceScan.SourceGenerator\\src\\InjectDemo\\DatabaseCon.cs",label:"DatabaseCon.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"ServiceScan.SourceGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"DatabaseCon.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\nnamespace InjectDemo;\n\npublic partial class DatabaseCon:IDatabase\n{\n    public string? Connection { get; set; }\n    public void Open()\n    {\n        Console.WriteLine("open from database con" );\n    }\n}\n\n\n')))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ServiceScan.SourceGenerator\\src\\InjectDemo\\obj\\GX\\ServiceScan.SourceGenerator\\ServiceScan.SourceGenerator.DependencyInjectionGenerator\\GenerateServiceRegistrationsAttribute.Generated.cs",label:"GenerateServiceRegistrationsAttribute.Generated.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'#nullable enable\n\nusing System;\nusing System.Diagnostics;\nusing Microsoft.Extensions.DependencyInjection;\n\nnamespace ServiceScan.SourceGenerator;\n\n[Conditional("CODE_ANALYSIS")]\n[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]\ninternal class GenerateServiceRegistrationsAttribute : Attribute\n{\n    /// <summary>\n    /// Set the assembly containing the given type as the source of types to register.\n    /// If not specified, the assembly containing the method with this attribute will be used.\n    /// </summary>\n    public Type? FromAssemblyOf { get; set; }\n\n    /// <summary>\n    /// Set the type that the registered types must be assignable to.\n    /// Types will be registered with this type as the service type,\n    /// unless <see cref="AsImplementedInterfaces"/> or <see cref="AsSelf"/> is set.\n    /// </summary>\n    public Type? AssignableTo { get; set; }\n\n    /// <summary>\n    /// Set the lifetime of the registered services.\n    /// <see cref="ServiceLifetime.Transient"/> is used if not specified.\n    /// </summary>\n    public ServiceLifetime Lifetime { get; set; }\n\n    /// <summary>\n    /// If set to true, types will be registered as implemented interfaces instead of their actual type.\n    /// </summary>\n    public bool AsImplementedInterfaces { get; set; }\n\n    /// <summary>\n    /// If set to true, types will be registered with their actual type.\n    /// It can be combined with <see cref="AsImplementedInterfaces"/>, in that case implemeted interfaces will be\n    /// "forwarded" to "self" implementation.\n    /// </summary>\n    public bool AsSelf { get; set; }\n\n    /// <summary>\n    /// Set this value to filter the types to register by their full name. \n    /// You can use \'*\' wildcards.\n    /// You can also use \',\' to separate multiple filters.\n    /// </summary>\n    /// <example>Namespace.With.Services.*</example>\n    /// <example>*Service,*Factory</example>\n    public string? TypeNameFilter { get; set; }\n}\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ServiceScan.SourceGenerator\\src\\InjectDemo\\obj\\GX\\ServiceScan.SourceGenerator\\ServiceScan.SourceGenerator.DependencyInjectionGenerator\\MyServiceProvider_AddMyServices.Generated.cs",label:"MyServiceProvider_AddMyServices.Generated.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using Microsoft.Extensions.DependencyInjection;\n\n\n\npublic static partial class MyServiceProvider\n{\n    public static partial IServiceCollection AddMyServices(this IServiceCollection services)\n    {\n        return services\n            .AddScoped<InjectDemo.Database, InjectDemo.Database>()\n            .AddScoped<InjectDemo.IDatabase, InjectDemo.Database>()\n            .AddScoped<InjectDemo.IDatabase, InjectDemo.DatabaseCon>();\n    }\n}\n")))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:a(19563).Z},"Download Example project ServiceScan.SourceGenerator "))),(0,r.kt)("h3",{id:"share-servicescansourcegenerator"},"Share ServiceScan.SourceGenerator"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&quote=ServiceScan.SourceGenerator",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&text=ServiceScan.SourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&title=ServiceScan.SourceGenerator",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&title=ServiceScan.SourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/ServiceScan.SourceGenerator"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/ServiceScan.SourceGenerator")),(0,r.kt)("h3",{id:"in-the-same-category-dependencyinjection---5-other-generators"},"In the same category (DependencyInjection) - 5 other generators"),(0,r.kt)("h4",{id:"autoregisterinject"},(0,r.kt)("a",{parentName:"h4",href:"/docs/AutoRegisterInject"},"AutoRegisterInject")),(0,r.kt)("h4",{id:"depso"},(0,r.kt)("a",{parentName:"h4",href:"/docs/depso"},"depso")),(0,r.kt)("h4",{id:"factorygenerator"},(0,r.kt)("a",{parentName:"h4",href:"/docs/FactoryGenerator"},"FactoryGenerator")),(0,r.kt)("h4",{id:"injectio"},(0,r.kt)("a",{parentName:"h4",href:"/docs/Injectio"},"Injectio")),(0,r.kt)("h4",{id:"jab"},(0,r.kt)("a",{parentName:"h4",href:"/docs/jab"},"jab")))}h.isMDXComponent=!0},19563:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/ServiceScan.SourceGenerator-4f11fa3f39c97008bbb6a93928f7053e.zip"}}]);