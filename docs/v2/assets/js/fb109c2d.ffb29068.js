"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[8978],{58573:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>g,frontMatter:()=>p,metadata:()=>c,toc:()=>m});var a=n(87462),r=(n(67294),n(3905)),i=n(73992),o=n(18679),s=n(68839);const p={sidebar_position:1440,title:"144 - depso",description:"generating DI code",slug:"/depso"},l="depso  by Yusuf Tar\u0131k G\xfcnayd\u0131n",c={unversionedId:"RSCG-Examples/depso",id:"RSCG-Examples/depso",title:"144 - depso",description:"generating DI code",source:"@site/docs/RSCG-Examples/depso.md",sourceDirName:"RSCG-Examples",slug:"/depso",permalink:"/RSCG_Examples/v2/docs/depso",draft:!1,tags:[],version:"current",sidebarPosition:1440,frontMatter:{sidebar_position:1440,title:"144 - depso",description:"generating DI code",slug:"/depso"},sidebar:"tutorialSidebar",previous:{title:"143 - FactoryGenerator",permalink:"/RSCG_Examples/v2/docs/FactoryGenerator"},next:{title:"145 - DotnetYang",permalink:"/RSCG_Examples/v2/docs/DotnetYang"}},d={},m=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share depso",id:"share-depso",level:3},{value:"In the same category (DependencyInjection) - 5 other generators",id:"in-the-same-category-dependencyinjection---5-other-generators",level:3},{value:"AutoRegisterInject",id:"autoregisterinject",level:4},{value:"FactoryGenerator",id:"factorygenerator",level:4},{value:"Injectio",id:"injectio",level:4},{value:"jab",id:"jab",level:4},{value:"ServiceScan.SourceGenerator",id:"servicescansourcegenerator",level:4}],v={toc:m},u="wrapper";function g(e){let{components:t,...p}=e;return(0,r.kt)(u,(0,a.Z)({},v,p,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"depso--by-yusuf-tar\u0131k-g\xfcnayd\u0131n"},"depso  by Yusuf Tar\u0131k G\xfcnayd\u0131n"),(0,r.kt)(s.Z,{toc:m,mdxType:"TOCInline"}),(0,r.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/depso/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/depso?label=depso",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/notanaverageman/Depso"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/notanaverageman/Depso?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/notanaverageman/Depso?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"depso")),(0,r.kt)("p",{parentName:"admonition"},"Package Description"),(0,r.kt)("p",{parentName:"admonition"},"Author: Yusuf Tar\u0131k G\xfcnayd\u0131n"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/depso/"},"https://www.nuget.org/packages/depso/")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/notanaverageman/Depso"},"https://github.com/notanaverageman/Depso")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/notanaverageman/Depso"},"https://github.com/notanaverageman/Depso"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"jab-compile-time-dependency-injection"},"Jab Compile Time Dependency Injection"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Jab"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/Jab",alt:"Nuget"}))),(0,r.kt)("p",{parentName:"admonition"},"Jab provides a ",(0,r.kt)("a",{parentName:"p",href:"https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/"},"C# Source Generator")," based dependency injection container implementation."),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Fast startup (200x faster than Microsoft.Extensions.DependencyInjection). ",(0,r.kt)("a",{parentName:"li",href:"#Startup-Time"},"Details"),"."),(0,r.kt)("li",{parentName:"ul"},"Fast resolution (7x faster than Microsoft.Extensions.DependencyInjection). ",(0,r.kt)("a",{parentName:"li",href:"#GetService"},"Details"),"."),(0,r.kt)("li",{parentName:"ul"},"No runtime dependencies."),(0,r.kt)("li",{parentName:"ul"},"AOT and linker friendly, all code is generated during project compilation."),(0,r.kt)("li",{parentName:"ul"},"Clean stack traces:  ",(0,r.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/pakrym/jab/main/doc/stacktrace.png",alt:"stacktrace"})),(0,r.kt)("li",{parentName:"ul"},"Readable generated code:  ",(0,r.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/pakrym/jab/main/doc/generatedcode.png",alt:"generated code"})),(0,r.kt)("li",{parentName:"ul"},"Registration validation. Container configuration issues become compiler errors:  ",(0,r.kt)("img",{parentName:"li",src:"https://raw.githubusercontent.com/pakrym/jab/main/doc/errors.png",alt:"generated code"})),(0,r.kt)("li",{parentName:"ul"},"Incremental generation, .NET 5/6/7/8 SDK support, .NET Standard 2.0 support, ","[Unity support]","(",(0,r.kt)("a",{parentName:"li",href:"https://github.com/notanaverageman/Depso/README.md#Unity-installation"},"https://github.com/notanaverageman/Depso/README.md#Unity-installation"))),(0,r.kt)("h2",{parentName:"admonition",id:"example"},"Example"),(0,r.kt)("p",{parentName:"admonition"},"Add Jab package reference:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <PackageReference Include="Jab" Version="0.10.2" PrivateAssets="all" />\n</ItemGroup>\n')),(0,r.kt)("p",{parentName:"admonition"},"Define a service and implementation:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"internal interface IService\n{\n    void M();\n}\n\ninternal class ServiceImplementation : IService\n{\n    public void M()\n    {\n    }\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"Define a composition root and register services:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Transient(typeof(IService), typeof(ServiceImplementation))]\ninternal partial class MyServiceProvider { }\n")),(0,r.kt)("p",{parentName:"admonition"},"Use the service provider:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"MyServiceProvider c = new MyServiceProvider();\nIService service = c.GetService<IService>();\n")),(0,r.kt)("h2",{parentName:"admonition",id:"features"},"Features"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"No runtime dependency, safe to use in libraries"),(0,r.kt)("li",{parentName:"ul"},"Transient, Singleton, Scoped service registration"),(0,r.kt)("li",{parentName:"ul"},"Named registrations"),(0,r.kt)("li",{parentName:"ul"},"Factory registration"),(0,r.kt)("li",{parentName:"ul"},"Instance registration"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"IEnumerable")," resolution"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"IDisposable")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"IAsyncDisposable")," support"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"IServiceProvider")," support")),(0,r.kt)("p",{parentName:"admonition"},"The plan is to support the minimum feature set Microsoft.Extensions.DependencyInjection.Abstraction requires but ",(0,r.kt)("em",{parentName:"p"},"NOT")," the ",(0,r.kt)("inlineCode",{parentName:"p"},"IServiceCollection"),"-based registration syntax as it is runtime based."),(0,r.kt)("h3",{parentName:"admonition",id:"singleton-services"},"Singleton services"),(0,r.kt)("p",{parentName:"admonition"},"Singleton services are created once per container lifetime in a thread-safe manner and cached.\nTo register a singleton service use the ",(0,r.kt)("inlineCode",{parentName:"p"},"SingletonAttribute"),":"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Singleton(typeof(IService), typeof(ServiceImplementation))]\ninternal partial class MyServiceProvider { }\n")),(0,r.kt)("h3",{parentName:"admonition",id:"singleton-instances"},"Singleton Instances"),(0,r.kt)("p",{parentName:"admonition"},"If you want to use an existing object as a service define a property in the container declaration and use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Instance")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"SingletonAttribute")," to register the service:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Singleton(typeof(IService), Instance = nameof(MyServiceInstance))]\ninternal partial class MyServiceProvider {\n    public IService MyServiceInstance { get;set; }\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"Then initialize the property during the container creation:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"MyServiceProvider c = new MyServiceProvider();\nc.MyServiceInstance = new ServiceImplementation();\n\nIService service = c.GetService<IService>();\n")),(0,r.kt)("h3",{parentName:"admonition",id:"named-services"},"Named services"),(0,r.kt)("p",{parentName:"admonition"},"Use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Name")," property to assign a name to your service registrations and ",(0,r.kt)("inlineCode",{parentName:"p"},'[FromNamedServices("...")]')," attribute to resolve a service using its name."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},'[ServiceProvider]\n[Singleton(typeof(INotificationService), typeof(EmailNotificationService), Name="email")]\n[Singleton(typeof(INotificationService), typeof(SmsNotificationService), Name="sms")]\n[Singleton(typeof(Notifier))]\ninternal partial class MyServiceProvider {}\n\nclass Notifier\n{\n    public Notifier(\n        [FromNamedServices("email")] INotificationService email,\n        [FromNamedServices("sms")] INotificationService sms)\n    {}\n}\n')),(0,r.kt)("p",{parentName:"admonition"},"NOTE: Jab also recognizes the ",(0,r.kt)("inlineCode",{parentName:"p"},"[FromKeyedServices]")," attribute from ",(0,r.kt)("inlineCode",{parentName:"p"},"Microsoft.Extensions.DependencyInjection"),"."),(0,r.kt)("h3",{parentName:"admonition",id:"factories"},"Factories"),(0,r.kt)("p",{parentName:"admonition"},"Sometimes it's useful to provide a custom way to create a service instance without using the automatic construction selection.\nTo do this define a method in the container declaration and use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Factory")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"SingletonAttribute")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"TransientAttribute")," to register the service:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Transient(typeof(IService), Factory = nameof(MyServiceFactory))]\ninternal partial class MyServiceProvider {\n    public IService MyServiceFactory() => new ServiceImplementation();\n}\n\nMyServiceProvider c = new MyServiceProvider();\nIService service = c.GetService<IService>();\n")),(0,r.kt)("p",{parentName:"admonition"},"When using with ",(0,r.kt)("inlineCode",{parentName:"p"},"TransientAttribute")," the factory method would be invoked for every service resolution.\nWhen used with ",(0,r.kt)("inlineCode",{parentName:"p"},"SingletonAttribute")," it would only be invoked the first time the service is requested."),(0,r.kt)("p",{parentName:"admonition"},"Similar to constructors, factories support parameter injection:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"[ServiceProvider]\n[Transient(typeof(IService), Factory = nameof(MyServiceFactory))]\n[Transient(typeof(SomeOtherService))]\ninternal partial class MyServiceProvider {\n    public IService MyServiceFactory(SomeOtherService other) => new ServiceImplementation(other);\n}\n")),(0,r.kt)("h3",{parentName:"admonition",id:"scoped-services"},"Scoped Services"),(0,r.kt)("p",{parentName:"admonition"},"Scoped services are created once per service provider scope. To create a scope use the ",(0,r.kt)("inlineCode",{parentName:"p"},"CreateScope()")," method of the service provider.\nService are resolved from the scope using the ",(0,r.kt)("inlineCode",{parentName:"p"},"GetService<IService>()")," call."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Scoped(typeof(IService), typeof(ServiceImplementation))]\ninternal partial class MyServiceProvider { }\n\nMyServiceProvider c = new MyServiceProvider();\nusing MyServiceProvider.Scope scope = c.CreateScope();\nIService service = scope.GetService<IService>();\n")),(0,r.kt)("p",{parentName:"admonition"},"When the scope is disposed all ",(0,r.kt)("inlineCode",{parentName:"p"},"IDisposable")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"IAsyncDisposable")," services that were resolved from it are disposed as well."),(0,r.kt)("h3",{parentName:"admonition",id:"generic-registration-attributes"},"Generic registration attributes"),(0,r.kt)("p",{parentName:"admonition"},"You can use generic attributes to register services if your project targets ",(0,r.kt)("inlineCode",{parentName:"p"},"net7.0")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"net6.0")," and has ",(0,r.kt)("inlineCode",{parentName:"p"},"LangVersion")," set to preview."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <TargetFrameworks>net7.0</TargetFrameworks>\n  </PropertyGroup>\n\n</Project>\n\n')),(0,r.kt)("p",{parentName:"admonition"},"Generic attributes allow declaration to be more compact by avoiding the ",(0,r.kt)("inlineCode",{parentName:"p"},"typeof")," calls:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Scoped<IService, ServiceImplementation>]\n[Import<IMyModule>]\ninternal partial class MyServiceProvider { }\n")),(0,r.kt)("h3",{parentName:"admonition",id:"modules"},"Modules"),(0,r.kt)("p",{parentName:"admonition"},"Often, a set of service registrations would represent a distinct set of functionality that can be included into arbitrary\nservice provider. Modules are used to implement registration sharing. To define a module create an interface and mark it with ",(0,r.kt)("inlineCode",{parentName:"p"},"ServiceProviderModuleAttribute"),". Service registrations can be listed in module the same way they are in the service provider."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProviderModule]\n[Singleton(typeof(IService), typeof(ServiceImplementation))]\npublic interface IMyModule\n{\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"To use the module apply the ",(0,r.kt)("inlineCode",{parentName:"p"},"Import")," attribute to the service provider type:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider]\n[Import(typeof(IMyModule))]\ninternal partial class MyServiceProvider\n{\n}\n\nMyServiceProvider c = new MyServiceProvider();\nIService service = c.GetService<IEnumerable<IService>>();\n")),(0,r.kt)("p",{parentName:"admonition"},"Modules can import other modules as well."),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"NOTE"),": module service and implementation types have to be accessible from the project where service provider is generated."),(0,r.kt)("h2",{parentName:"admonition",id:"root-services"},"Root services"),(0,r.kt)("p",{parentName:"admonition"},"By default, ",(0,r.kt)("inlineCode",{parentName:"p"},"IEnumerable<...>")," service accessors are only generated when requested by other service constructors. If you would like to have a root ",(0,r.kt)("inlineCode",{parentName:"p"},"IEnumerable<..>")," accessor generated use the ",(0,r.kt)("inlineCode",{parentName:"p"},"RootService")," parameter of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ServiceProvider")," attribute. The generator also scans all the ",(0,r.kt)("inlineCode",{parentName:"p"},"GetService<...>")," usages and tries to all collected type arguments as the root service."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"[ServiceProvider(RootServices = new [] {typeof(IEnumerable<IService>)})]\n[Singleton(typeof(IService), typeof(ServiceImplementation))]\n[Singleton(typeof(IService), typeof(ServiceImplementation))]\n[Singleton(typeof(IService), typeof(ServiceImplementation))]\ninternal partial class MyServiceProvider\n{\n}\n\nMyServiceProvider c = new MyServiceProvider();\nIService service = c.GetService<IEnumerable<IService>>();\n")),(0,r.kt)("h2",{parentName:"admonition",id:"samples"},"Samples"),(0,r.kt)("h3",{parentName:"admonition",id:"console-application"},"Console application"),(0,r.kt)("p",{parentName:"admonition"},"Sample Jab usage in console application can be found in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/notanaverageman/Depso/src/samples/ConsoleSample"},"src/samples/ConsoleSample")),(0,r.kt)("h2",{parentName:"admonition",id:"performance"},"Performance"),(0,r.kt)("p",{parentName:"admonition"},"The performance benchmark project is available in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/notanaverageman/Depso/src/Jab.Performance/"},"src/Jab.Performance/"),"."),(0,r.kt)("h3",{parentName:"admonition",id:"startup-time"},"Startup time"),(0,r.kt)("p",{parentName:"admonition"},"The startup time benchmark measures time between application startup and the first service being resolved."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"| Method |        Mean |     Error |    StdDev |  Ratio | RatioSD |  Gen 0 |  Gen 1 | Gen 2 | Allocated |\n|------- |------------:|----------:|----------:|-------:|--------:|-------:|-------:|------:|----------:|\n|   MEDI | 2,437.88 ns | 14.565 ns | 12.163 ns | 220.91 |    2.72 | 0.6332 | 0.0114 |     - |    6632 B |\n|    Jab |    11.03 ns |  0.158 ns |  0.123 ns |   1.00 |    0.00 | 0.0046 |      - |     - |      48 B |\n")),(0,r.kt)("h3",{parentName:"admonition",id:"getservice"},"GetService"),(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"GetService")," benchmark measures the ",(0,r.kt)("inlineCode",{parentName:"p"},"provider.GetService<IService>()")," call."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"| Method |      Mean |     Error |    StdDev | Ratio | RatioSD |  Gen 0 | Gen 1 | Gen 2 | Allocated |\n|------- |----------:|----------:|----------:|------:|--------:|-------:|------:|------:|----------:|\n|   MEDI | 39.340 ns | 0.2419 ns | 0.2263 ns |  7.01 |    0.09 | 0.0023 |     - |     - |      24 B |\n|    Jab |  5.619 ns | 0.0770 ns | 0.0643 ns |  1.00 |    0.00 | 0.0023 |     - |     - |      24 B |\n")),(0,r.kt)("h2",{parentName:"admonition",id:"unity-installation"},"Unity installation"),(0,r.kt)("ol",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ol"},"Navigate to the Packages directory of your project."),(0,r.kt)("li",{parentName:"ol"},"Adjust the ",(0,r.kt)("a",{parentName:"li",href:"https://docs.unity3d.com/Manual/upm-manifestPrj.html"},"project manifest file")," manifest.json in a text editor."),(0,r.kt)("li",{parentName:"ol"},"Ensure ",(0,r.kt)("inlineCode",{parentName:"li"},"https://registry.npmjs.org/")," is part of ",(0,r.kt)("inlineCode",{parentName:"li"},"scopedRegistries"),"."),(0,r.kt)("li",{parentName:"ol"},"Ensure ",(0,r.kt)("inlineCode",{parentName:"li"},"com.pakrym")," is part of ",(0,r.kt)("inlineCode",{parentName:"li"},"scopes"),"."),(0,r.kt)("li",{parentName:"ol"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"com.pakrym.jab")," to the dependencies, stating the latest version.")),(0,r.kt)("p",{parentName:"admonition"},"A minimal example ends up looking like this:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},'{\n  "scopedRegistries": [\n    {\n      "name": "npmjs",\n      "url": "https://registry.npmjs.org/",\n      "scopes": [\n        "com.pakrym"\n      ]\n    }\n  ],\n  "dependencies": {\n    "com.pakrym.jab": "0.10.2",\n    ...\n  }\n}\n')),(0,r.kt)("h2",{parentName:"admonition",id:"debugging-locally"},"Debugging locally"),(0,r.kt)("p",{parentName:"admonition"},"Run ",(0,r.kt)("inlineCode",{parentName:"p"},"dotnet build /t:CreateLaunchSettings")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Jab.Tests")," directory would update the ",(0,r.kt)("inlineCode",{parentName:"p"},"Jab\\Properties\\launchSettings.json")," file to include ",(0,r.kt)("inlineCode",{parentName:"p"},"csc")," invocation that allows F5 debugging of the generator targeting the ",(0,r.kt)("inlineCode",{parentName:"p"},"Jab.Tests")," project.")),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"generating DI code")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"depso")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {10}",showLineNumbers:!0,"{10}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n    <ItemGroup>\n        <PackageReference Include="Depso" Version="1.0.1" />\n    </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"depso")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using InjectDemo;\nMyServiceProvider sc = new();\nvar con = sc.GetService(typeof(Database)) as IDatabase;\nArgumentNullException.ThrowIfNull(con);\ncon.Open();\n\n\n[Depso.ServiceProvider]\npublic partial class MyServiceProvider\n{\n    private void RegisterServices()\n    {\n        AddTransient<Database, Database>();\n        AddTransient<IDatabase, DatabaseCon>();\n    }\n}\n"))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\Database.cs",label:"Database.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"depso")," in ",(0,r.kt)("em",{parentName:"p"},"Database.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace InjectDemo;\n\npartial class Database : IDatabase\n{\n    private readonly IDatabase con;\n\n    public Database(IDatabase con)\n    {\n        this.con = con;\n    }\n    public void Open()\n    {\n        Console.WriteLine($"open from database");\n        con.Open();\n    }\n\n}\n\n\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\DatabaseCon.cs",label:"DatabaseCon.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"depso")," in ",(0,r.kt)("em",{parentName:"p"},"DatabaseCon.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\nnamespace InjectDemo;\n\npublic partial class DatabaseCon:IDatabase\n{\n    public string? Connection { get; set; }\n    public void Open()\n    {\n        Console.WriteLine("open from database con" );\n    }\n}\n\n\n')))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\obj\\GX\\Depso\\Depso.ServiceProviderGenerator\\Depso.Attributes.ServiceProvider.g.cs",label:"Depso.Attributes.ServiceProvider.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n\n#nullable enable\n\nnamespace Depso\n{\n    [global::System.AttributeUsage(global::System.AttributeTargets.Class)]\n    internal sealed class ServiceProviderAttribute : global::System.Attribute\n    {\n    }\n}\n"))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\obj\\GX\\Depso\\Depso.ServiceProviderGenerator\\Depso.Attributes.ServiceProviderModule.g.cs",label:"Depso.Attributes.ServiceProviderModule.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n\n#nullable enable\n\nnamespace Depso\n{\n    [global::System.AttributeUsage(global::System.AttributeTargets.Class)]\n    internal sealed class ServiceProviderModuleAttribute : global::System.Attribute\n    {\n    }\n}\n"))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\obj\\GX\\Depso\\Depso.ServiceProviderGenerator\\Depso.MyServiceProvider.g.cs",label:"Depso.MyServiceProvider.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n\n#nullable enable\n\npublic partial class MyServiceProvider\n    :\n    global::System.IDisposable,\n    global::System.IAsyncDisposable,\n    global::System.IServiceProvider\n{\n    private readonly object _sync = new object();\n\n    private global::MyServiceProvider.Scope? _rootScope;\n    private global::MyServiceProvider.Scope RootScope => _rootScope ??= CreateScope(_sync);\n\n    private bool _isDisposed;\n\n    public object? GetService(global::System.Type serviceType)\n    {\n        if (serviceType == typeof(global::InjectDemo.Database)) return CreateDatabase_0();\n        if (serviceType == typeof(global::InjectDemo.IDatabase)) return CreateDatabaseCon_0();\n        if (serviceType == typeof(global::System.IServiceProvider)) return this;\n\n        return null;\n    }\n\n    private T GetService<T>()\n    {\n        return (T)GetService(typeof(T))!;\n    }\n\n    private global::InjectDemo.Database CreateDatabase_0()\n    {\n        return new global::InjectDemo.Database(GetService<global::InjectDemo.IDatabase>());\n    }\n\n    private global::InjectDemo.DatabaseCon CreateDatabaseCon_0()\n    {\n        return new global::InjectDemo.DatabaseCon();\n    }\n\n    private global::MyServiceProvider.Scope CreateScope(object? sync)\n    {\n        ThrowIfDisposed();\n        return new global::MyServiceProvider.Scope(this, sync);\n    }\n\n    public void Dispose()\n    {\n        lock (_sync)\n        {\n            if (_isDisposed)\n            {\n                return;\n            }\n\n            _isDisposed = true;\n        }\n\n        if (_rootScope != null) _rootScope.Dispose();\n    }\n\n    public async global::System.Threading.Tasks.ValueTask DisposeAsync()\n    {\n        lock (_sync)\n        {\n            if (_isDisposed)\n            {\n                return;\n            }\n\n            _isDisposed = true;\n        }\n\n        if (_rootScope != null) await _rootScope.DisposeAsync();\n    }\n\n    private void ThrowIfDisposed()\n    {\n        if (_isDisposed)\n        {\n            throw new global::System.ObjectDisposedException("MyServiceProvider");\n        }\n    }\n}\n\n'))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\obj\\GX\\Depso\\Depso.ServiceProviderGenerator\\Depso.MyServiceProvider.RegistrationMethods.g.cs",label:"Depso.MyServiceProvider.RegistrationMethods.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n\n#nullable enable\n\npublic partial class MyServiceProvider\n{\n    private class RegistrationModifier\n    {\n        public static readonly global::MyServiceProvider.RegistrationModifier Instance;\n\n        static RegistrationModifier()\n        {\n            Instance = new global::MyServiceProvider.RegistrationModifier();\n        }\n\n        private RegistrationModifier()\n        {\n        }\n\n        public global::MyServiceProvider.RegistrationModifier AlsoAsSelf()\n        {\n            return this;\n        }\n\n        public global::MyServiceProvider.RegistrationModifier AlsoAs(global::System.Type type)\n        {\n            return this;\n        }\n\n        public global::MyServiceProvider.RegistrationModifier AlsoAs<T>()\n        {\n            return this;\n        }\n    }\n\n    private global::MyServiceProvider.RegistrationModifier ImportModule<T>()\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier ImportModule(global::System.Type moduleType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddSingleton(global::System.Type serviceType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddSingleton(global::System.Type serviceType, global::System.Type implementationType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddSingleton<TService>()\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddSingleton<TService, TImplementation>() where TImplementation : TService\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddSingleton<TService>(global::System.Func<global::System.IServiceProvider, TService> factory)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddScoped(global::System.Type serviceType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddScoped(global::System.Type serviceType, global::System.Type implementationType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddScoped<TService>()\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddScoped<TService, TImplementation>() where TImplementation : TService\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddScoped<TService>(global::System.Func<global::System.IServiceProvider, TService> factory)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddTransient(global::System.Type serviceType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddTransient(global::System.Type serviceType, global::System.Type implementationType)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddTransient<TService>()\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddTransient<TService, TImplementation>() where TImplementation : TService\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n\n    private global::MyServiceProvider.RegistrationModifier AddTransient<TService>(global::System.Func<global::System.IServiceProvider, TService> factory)\n    {\n        return global::MyServiceProvider.RegistrationModifier.Instance;\n    }\n}\n\n"))),(0,r.kt)(o.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\depso\\src\\InjectDemo\\obj\\GX\\Depso\\Depso.ServiceProviderGenerator\\Depso.MyServiceProvider.Scoped.g.cs",label:"Depso.MyServiceProvider.Scoped.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n\n#nullable enable\n\npublic partial class MyServiceProvider\n{\n    public class Scope\n        :\n        global::System.IDisposable,\n        global::System.IAsyncDisposable,\n        global::System.IServiceProvider\n    {\n        private readonly object _sync = new object();\n        private readonly global::MyServiceProvider _root;\n\n        private bool _isDisposed;\n\n        public Scope(global::MyServiceProvider root, object? sync)\n        {\n            _root = root;\n\n            if (sync != null)\n            {\n                _sync = sync;\n            }\n        }\n\n        public object? GetService(global::System.Type serviceType)\n        {\n            if (serviceType == typeof(global::InjectDemo.Database)) return _root.CreateDatabase_0();\n            if (serviceType == typeof(global::InjectDemo.IDatabase)) return _root.CreateDatabaseCon_0();\n            if (serviceType == typeof(global::System.IServiceProvider)) return this;\n\n            return null;\n        }\n\n        private T GetService<T>()\n        {\n            return (T)GetService(typeof(T))!;\n        }\n\n        public void Dispose()\n        {\n            lock (_sync)\n            {\n                if (_isDisposed)\n                {\n                    return;\n                }\n\n                _isDisposed = true;\n            }\n        }\n\n        public global::System.Threading.Tasks.ValueTask DisposeAsync()\n        {\n            lock (_sync)\n            {\n                if (_isDisposed)\n                {\n                    return default;\n                }\n\n                _isDisposed = true;\n            }\n\n            return default;\n        }\n\n        private void ThrowIfDisposed()\n        {\n            if (_isDisposed)\n            {\n                throw new global::System.ObjectDisposedException("MyServiceProvider.Scope");\n            }\n        }\n    }\n}\n\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:n(15198).Z},"Download Example project depso "))),(0,r.kt)("h3",{id:"share-depso"},"Share depso"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso&quote=depso",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso&text=depso:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso&title=depso",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso&title=depso&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdepso",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/depso"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/depso")),(0,r.kt)("h3",{id:"in-the-same-category-dependencyinjection---5-other-generators"},"In the same category (DependencyInjection) - 5 other generators"),(0,r.kt)("h4",{id:"autoregisterinject"},(0,r.kt)("a",{parentName:"h4",href:"/docs/AutoRegisterInject"},"AutoRegisterInject")),(0,r.kt)("h4",{id:"factorygenerator"},(0,r.kt)("a",{parentName:"h4",href:"/docs/FactoryGenerator"},"FactoryGenerator")),(0,r.kt)("h4",{id:"injectio"},(0,r.kt)("a",{parentName:"h4",href:"/docs/Injectio"},"Injectio")),(0,r.kt)("h4",{id:"jab"},(0,r.kt)("a",{parentName:"h4",href:"/docs/jab"},"jab")),(0,r.kt)("h4",{id:"servicescansourcegenerator"},(0,r.kt)("a",{parentName:"h4",href:"/docs/ServiceScan.SourceGenerator"},"ServiceScan.SourceGenerator")))}g.isMDXComponent=!0},15198:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/depso-86a00c92d13687826978759f443fd6c9.zip"}}]);