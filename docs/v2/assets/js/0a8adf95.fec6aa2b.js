"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[1779],{97729:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>h,frontMatter:()=>c,metadata:()=>l,toc:()=>u});var a=n(87462),r=(n(67294),n(3905)),i=n(73992),s=n(18679),o=n(68839);const c={sidebar_position:940,title:"94 - AspectGenerator",description:"AOP for methods in the same project. Uses interceptors",slug:"/AspectGenerator"},p="AspectGenerator  by Igor Tkachev",l={unversionedId:"RSCG-Examples/AspectGenerator",id:"RSCG-Examples/AspectGenerator",title:"94 - AspectGenerator",description:"AOP for methods in the same project. Uses interceptors",source:"@site/docs/RSCG-Examples/AspectGenerator.md",sourceDirName:"RSCG-Examples",slug:"/AspectGenerator",permalink:"/RSCG_Examples/v2/docs/AspectGenerator",draft:!1,tags:[],version:"current",sidebarPosition:940,frontMatter:{sidebar_position:940,title:"94 - AspectGenerator",description:"AOP for methods in the same project. Uses interceptors",slug:"/AspectGenerator"},sidebar:"tutorialSidebar",previous:{title:"93 - mocklis",permalink:"/RSCG_Examples/v2/docs/mocklis"},next:{title:"95 - CopyCat",permalink:"/RSCG_Examples/v2/docs/CopyCat"}},m={},u=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share AspectGenerator",id:"share-aspectgenerator",level:3},{value:"In the same category (EnhancementClass)",id:"in-the-same-category-enhancementclass",level:2},{value:"ApparatusAOT",id:"apparatusaot",level:3},{value:"BuilderGenerator",id:"buildergenerator",level:3},{value:"DudNet",id:"dudnet",level:3},{value:"FastGenericNew",id:"fastgenericnew",level:3},{value:"GeneratorEquals",id:"generatorequals",level:3},{value:"HsuSgSync",id:"hsusgsync",level:3},{value:"Immutype",id:"immutype",level:3},{value:"Ling.Audit",id:"lingaudit",level:3},{value:"Lombok.NET",id:"lomboknet",level:3},{value:"M31.FluentAPI",id:"m31fluentapi",level:3},{value:"MemoryPack",id:"memorypack",level:3},{value:"Meziantou.Polyfill",id:"meziantoupolyfill",level:3},{value:"Microsoft.Extensions.Logging",id:"microsoftextensionslogging",level:3},{value:"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator",level:3},{value:"Microsoft.Interop.JavaScript.JSImportGenerator",id:"microsoftinteropjavascriptjsimportgenerator",level:3},{value:"Roozie.AutoInterface",id:"roozieautointerface",level:3},{value:"RSCG_Decorator",id:"rscg_decorator",level:3},{value:"RSCG_UtilityTypes",id:"rscg_utilitytypes",level:3},{value:"StaticReflection",id:"staticreflection",level:3},{value:"SyncMethodGenerator",id:"syncmethodgenerator",level:3},{value:"System.Runtime.InteropServices",id:"systemruntimeinteropservices",level:3},{value:"System.Text.RegularExpressions",id:"systemtextregularexpressions",level:3},{value:"TelemetryLogging",id:"telemetrylogging",level:3}],d={toc:u},g="wrapper";function h(e){let{components:t,...c}=e;return(0,r.kt)(g,(0,a.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"aspectgenerator--by-igor-tkachev"},"AspectGenerator  by Igor Tkachev"),(0,r.kt)(o.Z,{toc:u,mdxType:"TOCInline"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AspectGenerator/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/AspectGenerator?label=AspectGenerator",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/igor-tkachev/AspectGenerator?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/igor-tkachev/AspectGenerator?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"AspectGenerator")),(0,r.kt)("p",{parentName:"admonition"},"The Aspect Generator can help you easily create your own aspects."),(0,r.kt)("p",{parentName:"admonition"},"Author: Igor Tkachev"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/AspectGenerator/"},"https://www.nuget.org/packages/AspectGenerator/")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator"},"https://github.com/igor-tkachev/AspectGenerator")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator"},"https://github.com/igor-tkachev/AspectGenerator"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"aspect-generator"},"Aspect Generator"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator/actions?workflow=.NET"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/actions/workflow/status/igor-tkachev/AspectGenerator/dotnet.yml?branch=master&label=test&logo=github&style=flat-square",alt:"Test workflow"}))," ",(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AspectGenerator"},(0,r.kt)("img",{parentName:"a",src:"https://buildstats.info/nuget/AspectGenerator?includePreReleases=true",alt:"NuGet Version and Downloads count"}))),(0,r.kt)("p",{parentName:"admonition"},"The Aspect Generator can help you easily create your own aspects."),(0,r.kt)("blockquote",{parentName:"admonition"},(0,r.kt)("p",{parentName:"blockquote"},"[!WARNING][Interceptors]","(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/d71ec683082104e9122a4937abc768710c5f7782/docs/features/interceptors.md"},"https://github.com/dotnet/roslyn/blob/d71ec683082104e9122a4937abc768710c5f7782/docs/features/interceptors.md"),") are an experimental compiler feature planned to ship in .NET 8 (with support for C# only).\nThe feature may be subject to breaking changes or removal in a future release.")),(0,r.kt)("blockquote",{parentName:"admonition"},(0,r.kt)("p",{parentName:"blockquote"},"[!NOTE]","\nThe community still has doubts about the usefulness of this feature. On the one hand, it looks like not kosher fake AOP. On the other hand, it works just fine. This project can help you to try it and share your own opinion.")),(0,r.kt)("h2",{parentName:"admonition",id:"download-and-install"},"Download and Install"),(0,r.kt)("p",{parentName:"admonition"},"Install nuget"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"> dotnet add package AspectGenerator\n")),(0,r.kt)("p",{parentName:"admonition"},"Modify your project file"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<PropertyGroup>\n    ...\n    <LangVersion>preview</LangVersion>\n    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);AspectGenerator</InterceptorsPreviewNamespaces>\n\n    \x3c!-- Add these settings to specify generated files output path --\x3e\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GeneratedFiles</CompilerGeneratedFilesOutputPath>\n</PropertyGroup>\n")),(0,r.kt)("h2",{parentName:"admonition",id:"read-documentation"},"Read documentation"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator/wiki#how-it-works"},"How it works")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/igor-tkachev/AspectGenerator/wiki#creating-your-own-aspect"},"Creating your own aspect")),(0,r.kt)("h2",{parentName:"admonition",id:"opentelemetry-aspect-example"},"OpenTelemetry Aspect example"),(0,r.kt)("p",{parentName:"admonition"},"Create OpenTelemetryFactory and Metrics aspect:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'using System;\nusing System.Diagnostics;\n\nusing OpenTelemetry;\nusing OpenTelemetry.Resources;\nusing OpenTelemetry.Trace;\n\nnamespace AspectGenerator\n{\n    /// <summary>\n    /// Initializes OpenTelemetry.\n    /// </summary>\n    static class OpenTelemetryFactory\n    {\n        public static TracerProvider? Create()\n        {\n            return Sdk.CreateTracerProviderBuilder()\n                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("MySample"))\n                .AddSource("Sample.Aspect")\n                .AddConsoleExporter()\n                .Build();\n        }\n    }\n\n    /// <summary>\n    /// Metrics aspect.\n    /// </summary>\n    [Aspect(\n        // Specify the name of the method used in the \'using\' statement\n        // that returns an IDisposable object.\n        OnUsing = nameof(OnUsing)\n        )]\n    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]\n    sealed class MetricsAttribute : Attribute\n    {\n        static readonly ActivitySource _activitySource = new("Sample.Aspect");\n\n        public static Activity? OnUsing(InterceptInfo info)\n        {\n            return _activitySource.StartActivity(info.MemberInfo.Name);\n        }\n    }\n}\n')),(0,r.kt)("p",{parentName:"admonition"},"Use it:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},"using System;\nusing System.Threading;\n\nusing Aspects;\n\nnamespace OpenTelemetryAspect\n{\n    static class Program\n    {\n        static void Main()\n        {\n            using var _ = OpenTelemetryFactory.Create();\n\n            Method1();\n            Method2();\n            Method1();\n        }\n\n        [Metrics]\n        public static void Method1()\n        {\n            Thread.Sleep(100);\n        }\n\n        [Metrics]\n        public static void Method2()\n        {\n            Thread.Sleep(200);\n        }\n    }\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"Application output:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"Activity.TraceId:            d47417e726824c7b39055efb4685a9dd\nActivity.SpanId:             12fbf29f5b622e13\nActivity.TraceFlags:         Recorded\nActivity.ActivitySourceName: Sample.Aspect\nActivity.DisplayName:        Method1\nActivity.Kind:               Internal\nActivity.StartTime:          2023-11-22T00:50:15.9079068Z\nActivity.Duration:           00:00:00.1016180\nResource associated with Activity:\n    service.name: MySample\n    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1\n    telemetry.sdk.name: opentelemetry\n    telemetry.sdk.language: dotnet\n    telemetry.sdk.version: 1.6.0\n\nActivity.TraceId:            b90735bfb52cb0b52a504d02bc5ead2e\nActivity.SpanId:             75109ef3af25a3e9\nActivity.TraceFlags:         Recorded\nActivity.ActivitySourceName: Sample.Aspect\nActivity.DisplayName:        Method2\nActivity.Kind:               Internal\nActivity.StartTime:          2023-11-22T00:50:16.0360160Z\nActivity.Duration:           00:00:00.2058166\nResource associated with Activity:\n    service.name: MySample\n    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1\n    telemetry.sdk.name: opentelemetry\n    telemetry.sdk.language: dotnet\n    telemetry.sdk.version: 1.6.0\n\nActivity.TraceId:            e9653008f381b6330a8e538e02b7a61d\nActivity.SpanId:             be3d7cd1d4376bd7\nActivity.TraceFlags:         Recorded\nActivity.ActivitySourceName: Sample.Aspect\nActivity.DisplayName:        Method1\nActivity.Kind:               Internal\nActivity.StartTime:          2023-11-22T00:50:16.2517480Z\nActivity.Duration:           00:00:00.1135186\nResource associated with Activity:\n    service.name: MySample\n    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1\n    telemetry.sdk.name: opentelemetry\n    telemetry.sdk.language: dotnet\n    telemetry.sdk.version: 1.6.0\n")),(0,r.kt)("p",{parentName:"admonition"},"Generated code:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'// <auto-generated/>\n#pragma warning disable\n#nullable enable\n\nusing System;\n\nusing SR  = System.Reflection;\nusing SLE = System.Linq.Expressions;\nusing SCG = System.Collections.Generic;\n\nnamespace Aspects\n{\n    static partial class Interceptors\n    {\n        static SR.MethodInfo GetMethodInfo(SLE.Expression expr)\n        {\n            return expr switch\n            {\n                SLE.MethodCallExpression mc => mc.Method,\n                _                           => throw new InvalidOperationException()\n            };\n        }\n\n        static SR.MethodInfo MethodOf<T>(SLE.Expression<Func<T>> func) => GetMethodInfo(func.Body);\n        static SR.MethodInfo MethodOf   (SLE.Expression<Action>  func) => GetMethodInfo(func.Body);\n\n        static SR. MemberInfo                 Method1_Interceptor_MemberInfo        = MethodOf(() => OpenTelemetryAspect.Program.Method1());\n        static SCG.Dictionary<string,object?> Method1_Interceptor_AspectArguments_0 = new ()\n        {\n        };\n        //\n        /// <summary>\n        /// Intercepts OpenTelemetryAspect.Program.Method1().\n        /// </summary>\n        //\n        // Intercepts Method1().\n        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\\AspectGenerator\\Examples\\OpenTelemetryAspect\\Program.cs", line: 14, character: 4)]\n        //\n        // Intercepts Method1().\n        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\\AspectGenerator\\Examples\\OpenTelemetryAspect\\Program.cs", line: 16, character: 4)]\n        //\n        [System.Runtime.CompilerServices.CompilerGenerated]\n        //[System.Diagnostics.DebuggerStepThrough]\n        public static void Method1_Interceptor()\n        {\n            // Aspects.MetricsAttribute\n            //\n            var __info__0 = new Aspects.InterceptInfo<Void>\n            {\n                MemberInfo      = Method1_Interceptor_MemberInfo,\n                AspectType      = typeof(Aspects.MetricsAttribute),\n                AspectArguments = Method1_Interceptor_AspectArguments_0,\n            };\n\n            using (Aspects.MetricsAttribute.OnUsing(__info__0))\n            {\n                OpenTelemetryAspect.Program.Method1();\n            }\n        }\n\n        static SR. MemberInfo                 Method2_Interceptor_MemberInfo        = MethodOf(() => OpenTelemetryAspect.Program.Method2());\n        static SCG.Dictionary<string,object?> Method2_Interceptor_AspectArguments_0 = new ()\n        {\n        };\n        //\n        /// <summary>\n        /// Intercepts OpenTelemetryAspect.Program.Method2().\n        /// </summary>\n        //\n        // Intercepts Method2().\n        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\\AspectGenerator\\Examples\\OpenTelemetryAspect\\Program.cs", line: 15, character: 4)]\n        //\n        [System.Runtime.CompilerServices.CompilerGenerated]\n        //[System.Diagnostics.DebuggerStepThrough]\n        public static void Method2_Interceptor()\n        {\n            // Aspects.MetricsAttribute\n            //\n            var __info__0 = new Aspects.InterceptInfo<Void>\n            {\n                MemberInfo      = Method2_Interceptor_MemberInfo,\n                AspectType      = typeof(Aspects.MetricsAttribute),\n                AspectArguments = Method2_Interceptor_AspectArguments_0,\n            };\n\n            using (Aspects.MetricsAttribute.OnUsing(__info__0))\n            {\n                OpenTelemetryAspect.Program.Method2();\n            }\n        }\n    }\n}\n')),(0,r.kt)("p",{parentName:"admonition"},"More advanced version of the Metrics aspect can also set activity status and support ",(0,r.kt)("inlineCode",{parentName:"p"},"await using"),"."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'[Aspect(\n    OnUsing      = nameof(OnUsing),\n    OnAsyncUsing = nameof(OnAsyncUsing),\n    OnFinally    = nameof(OnFinally)\n    )]\n[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]\nsealed class MetricsAttribute : Attribute\n{\n    static readonly ActivitySource _activitySource = new("Sample.Aspect");\n\n    public static Activity? OnUsing(InterceptInfo info)\n    {\n        var activity = _activitySource.StartActivity(info.MemberInfo.Name);\n\n        info.Tag = activity;\n\n        return activity;\n    }\n\n    class AsyncActivity(Activity activity) : IAsyncDisposable\n    {\n        public readonly Activity Activity = activity;\n\n        public ValueTask DisposeAsync()\n        {\n            Activity.Dispose();\n            return ValueTask.CompletedTask;\n        }\n    }\n\n    public static IAsyncDisposable? OnAsyncUsing(InterceptInfo info)\n    {\n        var activity = _activitySource.StartActivity(info.MemberInfo.Name);\n\n        if (activity == null)\n            return null;\n\n        var asyncActivity = new AsyncActivity(activity);\n\n        info.Tag = asyncActivity;\n\n        return asyncActivity;\n    }\n\n    public static void OnFinally(InterceptInfo info)\n    {\n        switch (info)\n        {\n            case { Tag: Activity activity, Exception: var ex } : SetStatus(activity,    ex); break;\n            case { Tag: AsyncActivity aa,  Exception: var ex } : SetStatus(aa.Activity, ex); break;\n        }\n\n        static void SetStatus(Activity activity, Exception? ex) =>\n            activity.SetStatus(ex is null ? ActivityStatusCode.Ok : ActivityStatusCode.Error);\n    }\n}\n'))),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"AOP for methods in the same project. Uses interceptors")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"AspectGenerator")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="AspectGenerator" Version="0.0.9-preview" OutputItemType="Analyzer"  />\n  </ItemGroup>\n<PropertyGroup>\n    \n    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);AspectGenerator</InterceptorsPreviewNamespaces>\n\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n</PropertyGroup>\n</Project>\n\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"AspectGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using AG;\n\nvar p=new Person { FirstName="Ignat", LastName="Andrei" };\nvar x= p.FullName();\nConsole.WriteLine(x);   \n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"AspectGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"Person.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace AG;\n\ninternal class Person\n{\n    public string? FirstName { get; set; }\n    public string? LastName { get; set; }\n    [Metrics]\n    public string FullName()\n    {\n        return $"{FirstName} {LastName}";\n    }\n}\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\AG.cs",label:"AG.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"AspectGenerator")," in ",(0,r.kt)("em",{parentName:"p"},"AG.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System.Diagnostics;\nusing AspectGenerator;\nnamespace AG;\n\n[Aspect(\n       // Specify the name of the method used in the \'using\' statement\n       // that returns an IDisposable object.\n       OnUsing = nameof(OnUsing)\n       )]\n[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]\nsealed class MetricsAttribute : Attribute\n{\n    //static readonly ActivitySource _activitySource = new("Sample.Aspect");\n\n    public static Activity? OnUsing(InterceptInfo info)\n    {\n        Console.WriteLine($"Entering {info.MemberInfo.Name}");\n        return null;\n        //var data=_activitySource.StartActivity(info.MemberInfo.Name);\n        //return data;\n    }\n}\n')))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\obj\\GX\\AspectGenerator\\AspectGenerator.AspectSourceGenerator\\AspectAttribute.g.cs",label:"AspectAttribute.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n#pragma warning disable\n#nullable enable\n\nusing System;\n\n#if AG_GENERATE_API || !AG_NOT_GENERATE_API\n\nnamespace AspectGenerator\n{\n    /// <summary>\n    /// <para>Defines an aspect.</para>\n    /// <para>Create a new attribute decorated with this attribute to define an aspect.</para>\n    /// </summary>\n    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]\n#if AG_PUBLIC_API\n    public\n#endif\n    sealed class AspectAttribute : Attribute\n    {\n        public string?   OnInit            { get; set; }\n        public string?   OnUsing           { get; set; }\n        public string?   OnUsingAsync      { get; set; }\n        public string?   OnBeforeCall      { get; set; }\n        public string?   OnBeforeCallAsync { get; set; }\n        public string?   OnCall            { get; set; }\n        public string?   OnAfterCall       { get; set; }\n        public string?   OnAfterCallAsync  { get; set; }\n        public string?   OnCatch           { get; set; }\n        public string?   OnCatchAsync      { get; set; }\n        public string?   OnFinally         { get; set; }\n        public string?   OnFinallyAsync    { get; set; }\n        public string[]? InterceptMethods  { get; set; }\n        public bool      UseInterceptType  { get; set; }\n        public bool      PassArguments     { get; set; }\n        public bool      UseInterceptData  { get; set; }\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    enum InterceptType\n    {\n        OnInit,\n        OnUsing,\n        OnBeforeCall,\n        OnAfterCall,\n        OnCatch,\n        OnFinally\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    enum InterceptResult\n    {\n        Continue,\n        Return,\n        ReThrow     = Continue,\n        IgnoreThrow = Return\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    struct Void\n    {\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    partial class InterceptInfo\n    {\n        public object?         Tag;\n        public InterceptType   InterceptType;\n        public InterceptResult InterceptResult;\n        public Exception?      Exception;\n\n        public InterceptInfo?                                        PreviousInfo;\n        public System.Reflection.MemberInfo                          MemberInfo;\n        public object?[]?                                            MethodArguments;\n        public Type                                                  AspectType;\n        public System.Collections.Generic.Dictionary<string,object?> AspectArguments;\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    partial class InterceptInfo<T> : InterceptInfo\n    {\n        public T ReturnValue;\n    }\n\n#if AG_PUBLIC_API\n    public\n#endif\n    partial struct InterceptData<T>\n    {\n        public object?         Tag;\n        public InterceptType   InterceptType;\n        public InterceptResult InterceptResult;\n        public Exception?      Exception;\n\n        public InterceptInfo<T>?                                     PreviousInfo;\n        public System.Reflection.MemberInfo                          MemberInfo;\n        public object?[]?                                            MethodArguments;\n        public Type                                                  AspectType;\n        public System.Collections.Generic.Dictionary<string,object?> AspectArguments;\n\n        public T ReturnValue;\n    }\n}\n\n#endif\n\n#if AG_GENERATE_InterceptsLocationAttribute || !AG_NOT_GENERATE_InterceptsLocationAttribute\n\nnamespace System.Runtime.CompilerServices\n{\n    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]\n    sealed class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute\n    {\n    }\n}\n\n#endif\n\n"))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\obj\\GX\\AspectGenerator\\AspectGenerator.AspectSourceGenerator\\Interceptors.g.cs",label:"Interceptors.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n#pragma warning disable\n#nullable enable\n\nusing System;\n\nusing SR  = System.Reflection;\nusing SLE = System.Linq.Expressions;\nusing SCG = System.Collections.Generic;\n\nnamespace AspectGenerator\n{\n    using AspectGenerator = AspectGenerator;\n\n    static partial class Interceptors\n    {\n        static SR.MethodInfo GetMethodInfo(SLE.Expression expr)\n        {\n            return expr switch\n            {\n                SLE.MethodCallExpression mc => mc.Method,\n                _                           => throw new InvalidOperationException()\n            };\n        }\n\n        static SR.MethodInfo MethodOf<T>(SLE.Expression<Func<T>> func) => GetMethodInfo(func.Body);\n        static SR.MethodInfo MethodOf   (SLE.Expression<Action>  func) => GetMethodInfo(func.Body);\n\n        static SR. MemberInfo                 FullName_Interceptor_MemberInfo        = MethodOf(() => default(AG.Person).FullName());\n        static SCG.Dictionary<string,object?> FullName_Interceptor_AspectArguments_0 = new()\n        {\n        };\n        //\n        /// <summary>\n        /// Intercepts AG.Person.FullName().\n        /// </summary>\n        //\n        // Intercepts p.FullName().\n        [System.Runtime.CompilerServices.InterceptsLocation(@"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AspectGenerator\\src\\AG\\Program.cs", line: 4, character: 10)]\n        //\n        [System.Runtime.CompilerServices.CompilerGenerated]\n        //[System.Diagnostics.DebuggerStepThrough]\n        public static string FullName_Interceptor(this AG.Person __this__)\n        {\n            // AG.MetricsAttribute\n            //\n            var __info__0 = new AspectGenerator.InterceptInfo<string>\n            {\n                MemberInfo      = FullName_Interceptor_MemberInfo,\n                AspectType      = typeof(AG.MetricsAttribute),\n                AspectArguments = FullName_Interceptor_AspectArguments_0,\n            };\n\n            using (AG.MetricsAttribute.OnUsing(__info__0))\n            {\n                __info__0.ReturnValue = __this__.FullName();\n            }\n\n            return __info__0.ReturnValue;\n        }\n    }\n}\n\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:n(96673).Z},"Download Example project AspectGenerator "))),(0,r.kt)("h3",{id:"share-aspectgenerator"},"Share AspectGenerator"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&quote=AspectGenerator",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&text=AspectGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&title=AspectGenerator",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&title=AspectGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AspectGenerator"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AspectGenerator")),(0,r.kt)("h2",{id:"in-the-same-category-enhancementclass"},"In the same category (EnhancementClass)"),(0,r.kt)("h3",{id:"apparatusaot"},(0,r.kt)("a",{parentName:"h3",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,r.kt)("h3",{id:"buildergenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/BuilderGenerator"},"BuilderGenerator")),(0,r.kt)("h3",{id:"dudnet"},(0,r.kt)("a",{parentName:"h3",href:"/docs/DudNet"},"DudNet")),(0,r.kt)("h3",{id:"fastgenericnew"},(0,r.kt)("a",{parentName:"h3",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,r.kt)("h3",{id:"generatorequals"},(0,r.kt)("a",{parentName:"h3",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,r.kt)("h3",{id:"hsusgsync"},(0,r.kt)("a",{parentName:"h3",href:"/docs/HsuSgSync"},"HsuSgSync")),(0,r.kt)("h3",{id:"immutype"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Immutype"},"Immutype")),(0,r.kt)("h3",{id:"lingaudit"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Ling.Audit"},"Ling.Audit")),(0,r.kt)("h3",{id:"lomboknet"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,r.kt)("h3",{id:"m31fluentapi"},(0,r.kt)("a",{parentName:"h3",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,r.kt)("h3",{id:"memorypack"},(0,r.kt)("a",{parentName:"h3",href:"/docs/MemoryPack"},"MemoryPack")),(0,r.kt)("h3",{id:"meziantoupolyfill"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Meziantou.Polyfill"},"Meziantou.Polyfill")),(0,r.kt)("h3",{id:"microsoftextensionslogging"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,r.kt)("h3",{id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator")),(0,r.kt)("h3",{id:"microsoftinteropjavascriptjsimportgenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,r.kt)("h3",{id:"roozieautointerface"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,r.kt)("h3",{id:"rscg_decorator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/RSCG_Decorator"},"RSCG_Decorator")),(0,r.kt)("h3",{id:"rscg_utilitytypes"},(0,r.kt)("a",{parentName:"h3",href:"/docs/RSCG_UtilityTypes"},"RSCG_UtilityTypes")),(0,r.kt)("h3",{id:"staticreflection"},(0,r.kt)("a",{parentName:"h3",href:"/docs/StaticReflection"},"StaticReflection")),(0,r.kt)("h3",{id:"syncmethodgenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,r.kt)("h3",{id:"systemruntimeinteropservices"},(0,r.kt)("a",{parentName:"h3",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")),(0,r.kt)("h3",{id:"systemtextregularexpressions"},(0,r.kt)("a",{parentName:"h3",href:"/docs/System.Text.RegularExpressions"},"System.Text.RegularExpressions")),(0,r.kt)("h3",{id:"telemetrylogging"},(0,r.kt)("a",{parentName:"h3",href:"/docs/TelemetryLogging"},"TelemetryLogging")))}h.isMDXComponent=!0},96673:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/AspectGenerator-6f068f4e2f2096da51dd4fe1a2d85b62.zip"}}]);