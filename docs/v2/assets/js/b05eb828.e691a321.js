"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[3470],{5255:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>m,default:()=>g,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var a=n(7462),r=(n(7294),n(4137)),s=n(3992),i=n(425),o=n(8839);const l={sidebar_position:50,title:"05 - System.Text.RegularExpressions",description:"Regex compiled",slug:"/System.Text.RegularExpressions"},m="System.Text.RegularExpressions  by Microsoft",p={unversionedId:"RSCG-Examples/System.Text.RegularExpressions",id:"RSCG-Examples/System.Text.RegularExpressions",title:"05 - System.Text.RegularExpressions",description:"Regex compiled",source:"@site/docs/RSCG-Examples/System.Text.RegularExpressions.md",sourceDirName:"RSCG-Examples",slug:"/System.Text.RegularExpressions",permalink:"/RSCG_Examples/v2/docs/System.Text.RegularExpressions",draft:!1,tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_position:50,title:"05 - System.Text.RegularExpressions",description:"Regex compiled",slug:"/System.Text.RegularExpressions"},sidebar:"tutorialSidebar",previous:{title:"04 - RSCG_Utils",permalink:"/RSCG_Examples/v2/docs/RSCG_Utils"},next:{title:"06 - SkinnyControllersCommon",permalink:"/RSCG_Examples/v2/docs/SkinnyControllersCommon"}},u={},c=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share System.Text.RegularExpressions",id:"share-systemtextregularexpressions",level:3},{value:"In the same category (EnhancementClass)",id:"in-the-same-category-enhancementclass",level:2},{value:"ApparatusAOT",id:"apparatusaot",level:3},{value:"BuilderGenerator",id:"buildergenerator",level:3},{value:"FastGenericNew",id:"fastgenericnew",level:3},{value:"GeneratorEquals",id:"generatorequals",level:3},{value:"Immutype",id:"immutype",level:3},{value:"Lombok.NET",id:"lomboknet",level:3},{value:"M31.FluentAPI",id:"m31fluentapi",level:3},{value:"MemoryPack",id:"memorypack",level:3},{value:"Meziantou.Polyfill",id:"meziantoupolyfill",level:3},{value:"Microsoft.Extensions.Logging",id:"microsoftextensionslogging",level:3},{value:"Microsoft.Interop.JavaScript.JSImportGenerator",id:"microsoftinteropjavascriptjsimportgenerator",level:3},{value:"Roozie.AutoInterface",id:"roozieautointerface",level:3},{value:"RSCG_Decorator",id:"rscg_decorator",level:3},{value:"RSCG_Static",id:"rscg_static",level:3},{value:"StaticReflection",id:"staticreflection",level:3},{value:"SyncMethodGenerator",id:"syncmethodgenerator",level:3},{value:"System.Runtime.InteropServices",id:"systemruntimeinteropservices",level:3}],d={toc:c},h="wrapper";function g(e){let{components:t,...l}=e;return(0,r.kt)(h,(0,a.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"systemtextregularexpressions--by-microsoft"},"System.Text.RegularExpressions  by Microsoft"),(0,r.kt)(o.Z,{toc:c,mdxType:"TOCInline"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/System.Text.RegularExpressions/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/System.Text.RegularExpressions?label=System.Text.RegularExpressions",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/runtime"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/dotnet/runtime?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/dotnet/runtime?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"System.Text.RegularExpressions")),(0,r.kt)("p",{parentName:"admonition"},"Provides the System.Text.RegularExpressions.Regex class, an implementation of a regular expression engine."),(0,r.kt)("p",{parentName:"admonition"},"Commonly Used Types:\nSystem.Text.RegularExpressions.Regex\nSystem.Text.RegularExpressions.RegexOptions\nSystem.Text.RegularExpressions.Match\nSystem.Text.RegularExpressions.Group\nSystem.Text.RegularExpressions.Capture\nSystem.Text.RegularExpressions.MatchEvaluator"),(0,r.kt)("p",{parentName:"admonition"},"Author: Microsoft"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/System.Text.RegularExpressions/"},"https://www.nuget.org/packages/System.Text.RegularExpressions/")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators/"},"https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators/")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/runtime"},"https://github.com/dotnet/runtime"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"net-runtime"},".NET Runtime"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://dev.azure.com/dnceng-public/public/_build/latest?definitionId=129&branchName=main"},(0,r.kt)("img",{parentName:"a",src:"https://dev.azure.com/dnceng-public/public/_apis/build/status/dotnet/runtime/runtime?branchName=main",alt:"Build Status"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/runtime/labels/help%20wanted"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/issues/dotnet/runtime/help%20wanted?style=flat-square&color=%232EA043&label=help%20wanted",alt:"Help Wanted"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://gitter.im/dotnet/runtime"},(0,r.kt)("img",{parentName:"a",src:"https://badges.gitter.im/Join%20Chat.svg",alt:"Gitter"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://aka.ms/dotnet-discord"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA",alt:"Discord"}))),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#what-is-net"},"What is .NET?")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#how-can-i-contribute"},"How can I contribute?")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#reporting-security-issues-and-security-bugs"},"Reporting security issues and security bugs")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#filing-issues"},"Filing issues")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#useful-links"},"Useful Links")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#net-foundation"},".NET Foundation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#license"},"License"))),(0,r.kt)("p",{parentName:"admonition"},"This repo contains the code to build the .NET runtime, libraries and shared host (",(0,r.kt)("inlineCode",{parentName:"p"},"dotnet"),") installers for\nall supported platforms, as well as the sources to .NET runtime and libraries."),(0,r.kt)("h2",{parentName:"admonition",id:"what-is-net"},"What is .NET?"),(0,r.kt)("p",{parentName:"admonition"},"Official Starting Page: ",(0,r.kt)("a",{parentName:"p",href:"https://dotnet.microsoft.com"},"https://dotnet.microsoft.com")),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/dotnet/core/get-started"},"How to use .NET")," (with VS, VS Code, command-line CLI)",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://dotnet.microsoft.com/download"},"Install official releases")),(0,r.kt)("li",{parentName:"ul"},"Install daily builds"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/dotnet/core"},"Documentation")," (Get Started, Tutorials, Porting from .NET Framework, API reference, ...)",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/dotnet/core/deploying"},"Deploying apps")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dotnet/core/blob/main/os-lifecycle-policy.md"},"Supported OS versions")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dotnet/core/blob/main/roadmap.md"},"Roadmap")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dotnet/core/tree/main/release-notes"},"Releases"))),(0,r.kt)("h2",{parentName:"admonition",id:"how-can-i-contribute"},"How can I contribute?"),(0,r.kt)("p",{parentName:"admonition"},"We welcome contributions! Many people all over the world have helped make this project better."),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Contributing explains what kinds of contributions we welcome"),(0,r.kt)("li",{parentName:"ul"},"Workflow Instructions explains how to build and test"),(0,r.kt)("li",{parentName:"ul"},"Get Up and Running on .NET Core explains how to get nightly builds of the runtime and its libraries to test them in your own projects.")),(0,r.kt)("h2",{parentName:"admonition",id:"reporting-security-issues-and-security-bugs"},"Reporting security issues and security bugs"),(0,r.kt)("p",{parentName:"admonition"},"Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) ",(0,r.kt)("a",{parentName:"p",href:"mailto:secure@microsoft.com"},"secure@microsoft.com"),". You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the ",(0,r.kt)("a",{parentName:"p",href:"https://www.microsoft.com/msrc/faqs-report-an-issue"},"Security TechCenter"),". You can also find these instructions in this repo's Security doc."),(0,r.kt)("p",{parentName:"admonition"},"Also see info about related ",(0,r.kt)("a",{parentName:"p",href:"https://www.microsoft.com/msrc/bounty-dot-net-core"},"Microsoft .NET Core and ASP.NET Core Bug Bounty Program"),"."),(0,r.kt)("h2",{parentName:"admonition",id:"filing-issues"},"Filing issues"),(0,r.kt)("p",{parentName:"admonition"},"This repo should contain issues that are tied to the runtime, the class libraries and frameworks, the installation of the ",(0,r.kt)("inlineCode",{parentName:"p"},"dotnet")," binary (sometimes known as the ",(0,r.kt)("inlineCode",{parentName:"p"},"muxer"),") and installation of the .NET runtime and libraries."),(0,r.kt)("p",{parentName:"admonition"},"For other issues, please file them to their appropriate sibling repos. We have links to many of them on ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/runtime/issues/new/choose"},"our new issue page"),"."),(0,r.kt)("h2",{parentName:"admonition",id:"useful-links"},"Useful Links"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://source.dot.net"},".NET Core source index")," / ",(0,r.kt)("a",{parentName:"li",href:"https://referencesource.microsoft.com"},".NET Framework source index")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/dotnet/api"},"API Reference docs")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://apisof.net"},".NET API Catalog")," (incl. APIs from daily builds and API usage info)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dotnet/dotnet-api-docs/wiki"},"API docs writing guidelines")," - useful when writing /// comments"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://aka.ms/dotnet-discord"},".NET Discord Server")," - a place to discuss the development of .NET and its ecosystem")),(0,r.kt)("h2",{parentName:"admonition",id:"net-foundation"},".NET Foundation"),(0,r.kt)("p",{parentName:"admonition"},".NET Runtime is a ",(0,r.kt)("a",{parentName:"p",href:"https://www.dotnetfoundation.org/projects"},".NET Foundation")," project."),(0,r.kt)("p",{parentName:"admonition"},"There are many .NET related projects on GitHub."),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/Microsoft/dotnet"},".NET home repo"),"\xa0- links to 100s of .NET projects, from Microsoft and the community."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/aspnet/core"},"ASP.NET Core home")," - the best place to start learning about ASP.NET Core.")),(0,r.kt)("p",{parentName:"admonition"},"This project has adopted the code of conduct defined by the ",(0,r.kt)("a",{parentName:"p",href:"https://contributor-covenant.org"},"Contributor Covenant")," to clarify expected behavior in our community. For more information, see the ",(0,r.kt)("a",{parentName:"p",href:"https://www.dotnetfoundation.org/code-of-conduct"},".NET Foundation Code of Conduct"),"."),(0,r.kt)("p",{parentName:"admonition"},"General .NET OSS discussions: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet-foundation/Home/discussions"},".NET Foundation Discussions")),(0,r.kt)("h2",{parentName:"admonition",id:"license"},"License"),(0,r.kt)("p",{parentName:"admonition"},".NET (including the runtime repo) is licensed under the MIT license.")),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Regex compiled")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(s.Z,{mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"System.Text.RegularExpressions")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {1}",showLineNumbers:!0,"{1}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n</Project>\n\n'))),(0,r.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\System.Text.RegularExpressions\\src\\DemoRegex\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"System.Text.RegularExpressions")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using Demo;\n//https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators\n//https://devblogs.microsoft.com/dotnet/regular-expression-improvements-in-dotnet-7/\nvar x = "Abc";\nConsole.WriteLine(DemoRegex.EvaluateText(x));\n'))),(0,r.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\System.Text.RegularExpressions\\src\\DemoRegex\\WeatherForecast.cs",label:"WeatherForecast.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"System.Text.RegularExpressions")," in ",(0,r.kt)("em",{parentName:"p"},"WeatherForecast.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System.Text.RegularExpressions;\n\nnamespace Demo;\n\npublic partial class DemoRegex\n{\n    [GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]\n    private static partial Regex AbcOrDefGeneratedRegex();\n\n    public static bool EvaluateText(string text)\n    {\n        return (AbcOrDefGeneratedRegex().IsMatch(text));\n        \n    }\n}\n\n')))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(s.Z,{mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\System.Text.RegularExpressions\\src\\DemoRegex\\obj\\GX\\System.Text.RegularExpressions.Generator\\System.Text.RegularExpressions.Generator.RegexGenerator\\RegexGenerator.g.cs",label:"RegexGenerator.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n#nullable enable\n#pragma warning disable CS0162 // Unreachable code\n#pragma warning disable CS0164 // Unreferenced label\n#pragma warning disable CS0219 // Variable assigned but never used\n\nnamespace Demo\n{\n    partial class DemoRegex\n    {\n        /// <remarks>\n        /// Pattern explanation:<br/>\n        /// <code>\n        /// \u25cb Match with 2 alternative expressions, atomically.<br/>\n        ///     \u25cb Match a sequence of expressions.<br/>\n        ///         \u25cb Match a character in the set [Aa].<br/>\n        ///         \u25cb Match a character in the set [Bb].<br/>\n        ///         \u25cb Match a character in the set [Cc].<br/>\n        ///     \u25cb Match a sequence of expressions.<br/>\n        ///         \u25cb Match a character in the set [Dd].<br/>\n        ///         \u25cb Match a character in the set [Ee].<br/>\n        ///         \u25cb Match a character in the set [Ff].<br/>\n        /// </code>\n        /// </remarks>\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.47720")]\n        private static partial global::System.Text.RegularExpressions.Regex AbcOrDefGeneratedRegex() => global::System.Text.RegularExpressions.Generated.AbcOrDefGeneratedRegex_0.Instance;\n    }\n}\n\nnamespace System.Text.RegularExpressions.Generated\n{\n    using System;\n    using System.CodeDom.Compiler;\n    using System.Collections;\n    using System.ComponentModel;\n    using System.Globalization;\n    using System.Runtime.CompilerServices;\n    using System.Text.RegularExpressions;\n    using System.Threading;\n\n    /// <summary>Custom <see cref="Regex"/>-derived type for the AbcOrDefGeneratedRegex method.</summary>\n    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.47720")]\n    file sealed class AbcOrDefGeneratedRegex_0 : Regex\n    {\n        /// <summary>Cached, thread-safe singleton instance.</summary>\n        internal static readonly AbcOrDefGeneratedRegex_0 Instance = new();\n    \n        /// <summary>Initializes the instance.</summary>\n        private AbcOrDefGeneratedRegex_0()\n        {\n            base.pattern = "abc|def";\n            base.roptions = RegexOptions.IgnoreCase;\n            ValidateMatchTimeout(Utilities.s_defaultTimeout);\n            base.internalMatchTimeout = Utilities.s_defaultTimeout;\n            base.factory = new RunnerFactory();\n            base.capsize = 1;\n        }\n    \n        /// <summary>Provides a factory for creating <see cref="RegexRunner"/> instances to be used by methods on <see cref="Regex"/>.</summary>\n        private sealed class RunnerFactory : RegexRunnerFactory\n        {\n            /// <summary>Creates an instance of a <see cref="RegexRunner"/> used by methods on <see cref="Regex"/>.</summary>\n            protected override RegexRunner CreateInstance() => new Runner();\n        \n            /// <summary>Provides the runner that contains the custom logic implementing the specified regular expression.</summary>\n            private sealed class Runner : RegexRunner\n            {\n                /// <summary>Scan the <paramref name="inputSpan"/> starting from base.runtextstart for the next match.</summary>\n                /// <param name="inputSpan">The text being scanned by the regular expression.</param>\n                protected override void Scan(ReadOnlySpan<char> inputSpan)\n                {\n                    // Search until we can\'t find a valid starting position, we find a match, or we reach the end of the input.\n                    while (TryFindNextPossibleStartingPosition(inputSpan) &&\n                           !TryMatchAtCurrentPosition(inputSpan) &&\n                           base.runtextpos != inputSpan.Length)\n                    {\n                        base.runtextpos++;\n                        if (Utilities.s_hasTimeout)\n                        {\n                            base.CheckTimeout();\n                        }\n                    }\n                }\n        \n                /// <summary>Search <paramref name="inputSpan"/> starting from base.runtextpos for the next location a match could possibly start.</summary>\n                /// <param name="inputSpan">The text being scanned by the regular expression.</param>\n                /// <returns>true if a possible match was found; false if no more matches are possible.</returns>\n                private bool TryFindNextPossibleStartingPosition(ReadOnlySpan<char> inputSpan)\n                {\n                    int pos = base.runtextpos;\n                    ulong charMinusLow;\n                    \n                    // Any possible match is at least 3 characters.\n                    if (pos <= inputSpan.Length - 3)\n                    {\n                        // The pattern matches a character in the set [CFcf] at index 2.\n                        // Find the next occurrence. If it can\'t be found, there\'s no match.\n                        ReadOnlySpan<char> span = inputSpan.Slice(pos);\n                        for (int i = 0; i < span.Length - 2; i++)\n                        {\n                            int indexOfPos = span.Slice(i + 2).IndexOfAny("CFcf");\n                            if (indexOfPos < 0)\n                            {\n                                goto NoMatchFound;\n                            }\n                            i += indexOfPos;\n                            \n                            if (((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i] - \'A\')) & (charMinusLow - 64)) < 0) &&\n                                ((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i + 1] - \'B\')) & (charMinusLow - 64)) < 0))\n                            {\n                                base.runtextpos = pos + i;\n                                return true;\n                            }\n                        }\n                    }\n                    \n                    // No match found.\n                    NoMatchFound:\n                    base.runtextpos = inputSpan.Length;\n                    return false;\n                }\n        \n                /// <summary>Determine whether <paramref name="inputSpan"/> at base.runtextpos is a match for the regular expression.</summary>\n                /// <param name="inputSpan">The text being scanned by the regular expression.</param>\n                /// <returns>true if the regular expression matches at the current position; otherwise, false.</returns>\n                private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)\n                {\n                    int pos = base.runtextpos;\n                    int matchStart = pos;\n                    ReadOnlySpan<char> slice = inputSpan.Slice(pos);\n                    \n                    // Match with 2 alternative expressions, atomically.\n                    {\n                        if (slice.IsEmpty)\n                        {\n                            return false; // The input didn\'t match.\n                        }\n                        \n                        switch (slice[0])\n                        {\n                            case \'A\' or \'a\':\n                                if ((uint)slice.Length < 3 ||\n                                    !slice.Slice(1).StartsWith("bc", StringComparison.OrdinalIgnoreCase)) // Match the string "bc" (ordinal case-insensitive)\n                                {\n                                    return false; // The input didn\'t match.\n                                }\n                                \n                                pos += 3;\n                                slice = inputSpan.Slice(pos);\n                                break;\n                                \n                            case \'D\' or \'d\':\n                                if ((uint)slice.Length < 3 ||\n                                    !slice.Slice(1).StartsWith("ef", StringComparison.OrdinalIgnoreCase)) // Match the string "ef" (ordinal case-insensitive)\n                                {\n                                    return false; // The input didn\'t match.\n                                }\n                                \n                                pos += 3;\n                                slice = inputSpan.Slice(pos);\n                                break;\n                                \n                            default:\n                                return false; // The input didn\'t match.\n                        }\n                    }\n                    \n                    // The input matched.\n                    base.runtextpos = pos;\n                    base.Capture(0, matchStart, pos);\n                    return true;\n                }\n            }\n        }\n\n    }\n    \n    /// <summary>Helper methods used by generated <see cref="Regex"/>-derived implementations.</summary>\n    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.47720")]\n    file static class Utilities\n    {\n        /// <summary>Default timeout value set in <see cref="AppContext"/>, or <see cref="Regex.InfiniteMatchTimeout"/> if none was set.</summary>\n        internal static readonly TimeSpan s_defaultTimeout = AppContext.GetData("REGEX_DEFAULT_MATCH_TIMEOUT") is TimeSpan timeout ? timeout : Regex.InfiniteMatchTimeout;\n        \n        /// <summary>Whether <see cref="s_defaultTimeout"/> is non-infinite.</summary>\n        internal static readonly bool s_hasTimeout = s_defaultTimeout != Timeout.InfiniteTimeSpan;\n    }\n}\n\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:n(8798).Z},"Download Example project System.Text.RegularExpressions "))),(0,r.kt)("h3",{id:"share-systemtextregularexpressions"},"Share System.Text.RegularExpressions"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&quote=System.Text.RegularExpressions",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&text=System.Text.RegularExpressions:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&title=System.Text.RegularExpressions",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&title=System.Text.RegularExpressions&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/System.Text.RegularExpressions"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/System.Text.RegularExpressions")),(0,r.kt)("h2",{id:"in-the-same-category-enhancementclass"},"In the same category (EnhancementClass)"),(0,r.kt)("h3",{id:"apparatusaot"},(0,r.kt)("a",{parentName:"h3",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,r.kt)("h3",{id:"buildergenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/BuilderGenerator"},"BuilderGenerator")),(0,r.kt)("h3",{id:"fastgenericnew"},(0,r.kt)("a",{parentName:"h3",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,r.kt)("h3",{id:"generatorequals"},(0,r.kt)("a",{parentName:"h3",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,r.kt)("h3",{id:"immutype"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Immutype"},"Immutype")),(0,r.kt)("h3",{id:"lomboknet"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,r.kt)("h3",{id:"m31fluentapi"},(0,r.kt)("a",{parentName:"h3",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,r.kt)("h3",{id:"memorypack"},(0,r.kt)("a",{parentName:"h3",href:"/docs/MemoryPack"},"MemoryPack")),(0,r.kt)("h3",{id:"meziantoupolyfill"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Meziantou.Polyfill"},"Meziantou.Polyfill")),(0,r.kt)("h3",{id:"microsoftextensionslogging"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,r.kt)("h3",{id:"microsoftinteropjavascriptjsimportgenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,r.kt)("h3",{id:"roozieautointerface"},(0,r.kt)("a",{parentName:"h3",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,r.kt)("h3",{id:"rscg_decorator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/RSCG_Decorator"},"RSCG_Decorator")),(0,r.kt)("h3",{id:"rscg_static"},(0,r.kt)("a",{parentName:"h3",href:"/docs/RSCG_Static"},"RSCG_Static")),(0,r.kt)("h3",{id:"staticreflection"},(0,r.kt)("a",{parentName:"h3",href:"/docs/StaticReflection"},"StaticReflection")),(0,r.kt)("h3",{id:"syncmethodgenerator"},(0,r.kt)("a",{parentName:"h3",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,r.kt)("h3",{id:"systemruntimeinteropservices"},(0,r.kt)("a",{parentName:"h3",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")))}g.isMDXComponent=!0},8798:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/System.Text.RegularExpressions-6991df9ba31a5d17f892bc08776c38fc.zip"}}]);