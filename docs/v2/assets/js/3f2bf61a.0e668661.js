"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[1416],{88387:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var n=a(87462),i=(a(67294),a(3905)),o=a(73992),r=a(18679),s=a(68839);const l={sidebar_position:1180,title:"118 - RSCG_Wait",description:"Demo for waiting in compilation and show the options of compiling the code",slug:"/RSCG_Wait"},p="RSCG_Wait  by Andrei Ignat",d={unversionedId:"RSCG-Examples/RSCG_Wait",id:"RSCG-Examples/RSCG_Wait",title:"118 - RSCG_Wait",description:"Demo for waiting in compilation and show the options of compiling the code",source:"@site/docs/RSCG-Examples/RSCG_Wait.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_Wait",permalink:"/RSCG_Examples/v2/docs/RSCG_Wait",draft:!1,tags:[],version:"current",sidebarPosition:1180,frontMatter:{sidebar_position:1180,title:"118 - RSCG_Wait",description:"Demo for waiting in compilation and show the options of compiling the code",slug:"/RSCG_Wait"},sidebar:"tutorialSidebar",previous:{title:"117 - PlantUmlClassDiagramGenerator",permalink:"/RSCG_Examples/v2/docs/PlantUmlClassDiagramGenerator"},next:{title:"119 - AutoGen",permalink:"/RSCG_Examples/v2/docs/AutoGen"}},m={},c=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use-1",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share RSCG_Wait",id:"share-rscg_wait",level:3},{value:"In the same category (EnhancementProject) - 13 other generators",id:"in-the-same-category-enhancementproject---13-other-generators",level:3},{value:"AutoInvoke.Generator",id:"autoinvokegenerator",level:4},{value:"AutoSpectre",id:"autospectre",level:4},{value:"BuildInfo",id:"buildinfo",level:4},{value:"Com",id:"com",level:4},{value:"CommandLine",id:"commandline",level:4},{value:"DeeDee",id:"deedee",level:4},{value:"LinqGen.Generator",id:"linqgengenerator",level:4},{value:"Mediator",id:"mediator",level:4},{value:"PlantUmlClassDiagramGenerator",id:"plantumlclassdiagramgenerator",level:4},{value:"RSCG_AMS",id:"rscg_ams",level:4},{value:"RSCG_FunctionsWithDI",id:"rscg_functionswithdi",level:4},{value:"RSCG_TimeBombComment",id:"rscg_timebombcomment",level:4},{value:"ThisAssembly",id:"thisassembly",level:4}],u={toc:c},g="wrapper";function h(e){let{components:t,...l}=e;return(0,i.kt)(g,(0,n.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rscg_wait--by-andrei-ignat"},"RSCG_Wait  by Andrei Ignat"),(0,i.kt)(s.Z,{toc:c,mdxType:"TOCInline"}),(0,i.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_WaitAndOptions/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_WaitAndOptions?label=RSCG_WaitAndOptions",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_WaitAndOptions"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/RSCG_WaitAndOptions?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/RSCG_WaitAndOptions?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Wait")),(0,i.kt)("p",{parentName:"admonition"},"This package wait for a time and put all global options into a cs file"),(0,i.kt)("p",{parentName:"admonition"},"Author: Andrei Ignat"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/RSCG_WaitAndOptions/"},"https://www.nuget.org/packages/RSCG_WaitAndOptions/")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_WaitAndOptions"},"https://github.com/ignatandrei/RSCG_WaitAndOptions")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_WaitAndOptions"},"https://github.com/ignatandrei/RSCG_WaitAndOptions"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"rscg_waitandoptions"},"RSCG_WaitAndOptions"),(0,i.kt)("p",{parentName:"admonition"},"Wait pending compilation  and see compiling options "),(0,i.kt)("p",{parentName:"admonition"},"This package is just for demo purposes and it is not intended to be used in production code."),(0,i.kt)("p",{parentName:"admonition"},"More details at ",(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/GoodPractices"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/GoodPractices")),(0,i.kt)("h1",{parentName:"admonition",id:"how-to-use"},"How to use"),(0,i.kt)("p",{parentName:"admonition"},"Add the Nuget package RSCG_WaitAndOptions to your project and use the following code:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <CompilerVisibleProperty Include="RSCG_Wait_Seconds" />\n</ItemGroup>\n<PropertyGroup>\n    <RSCG_Wait_Seconds>10</RSCG_Wait_Seconds>\n</PropertyGroup>\n<ItemGroup>\n  <PackageReference Include="RSCG_WaitAndOptions" Version="2024.2.24.1940" \n                    OutputItemType="Analyzer" ReferenceOutputAssembly="false" \n                    />\n</ItemGroup>\n\n')),(0,i.kt)("p",{parentName:"admonition"},"And then compile the code . You will see in obj/GX the code generated"),(0,i.kt)("p",{parentName:"admonition"},"And you can access by "),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"Console.WriteLine(RSCG_Wait.MyGeneratedCode.DateStart);\nConsole.WriteLine(RSCG_Wait.MyGeneratedCode.SecondsToWait);\nConsole.WriteLine(RSCG_Wait.MyGeneratedCode.DateEnd);\nConsole.WriteLine(RSCG_Wait.OptionsFromBuild.build_property_projectdir);\n"))),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Demo for waiting in compilation and show the options of compiling the code")),(0,i.kt)("h2",{id:"how-to-use-1"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Wait")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {17}",showLineNumbers:!0,"{17}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n    <PropertyGroup>\n        <OutputType>Exe</OutputType>\n        <TargetFramework>net8.0</TargetFramework>\n        <ImplicitUsings>enable</ImplicitUsings>\n        <Nullable>enable</Nullable>\n        \n    </PropertyGroup>\n    <ItemGroup>\n        <CompilerVisibleProperty Include="RSCG_Wait_Seconds" />\n    </ItemGroup>\n    <PropertyGroup>\n        <RSCG_Wait_Seconds>10</RSCG_Wait_Seconds>\n    </PropertyGroup>\n    <ItemGroup>\n      <PackageReference Include="RSCG_WaitAndOptions" Version="2024.2.24.1940" \n                        OutputItemType="Analyzer" ReferenceOutputAssembly="false" \n                        />\n    </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n        <GenerateDocumentationFile>True</GenerateDocumentationFile>\n    </PropertyGroup>\n    \n</Project>\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Wait\\src\\Console_Wait\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Wait")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// See https://aka.ms/new-console-template for more information\nConsole.WriteLine("Hello, World!");\nConsole.WriteLine(RSCG_Wait.MyGeneratedCode.DateStart);\nConsole.WriteLine(RSCG_Wait.MyGeneratedCode.SecondsToWait);\nConsole.WriteLine(RSCG_Wait.MyGeneratedCode.DateEnd);\nConsole.WriteLine(RSCG_Wait.OptionsFromBuild.build_property_projectdir);\nConsole.WriteLine(RSCG_Wait.OptionsFromBuild.build_property_rootnamespace);\nConsole.WriteLine(RSCG_Wait.OptionsFromBuild.build_property__supportedplatformlist );\n\n')))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Wait\\src\\Console_Wait\\obj\\GX\\RSCG_Wait\\RSCG_Wait.WaitGenerator\\GeneratorOptions.g.cs",label:"GeneratorOptions.g.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by a tool RSCG_Wait.\n//     Runtime Version: 2024.2.24.1940\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n//pragma warning disable CS1591\nnamespace RSCG_Wait;\n[global::System.CodeDom.Compiler.GeneratedCode("RSCG_Wait", "2024.2.24.1940")]\n[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]\npartial class OptionsFromBuild\n{//real name: build_property.rootnamespace\npublic static string build_property_rootnamespace => @"Console_Wait";\n//real name: build_property.projecttypeguids\npublic static string build_property_projecttypeguids => @"";\n//real name: build_property.enforceextendedanalyzerrules\npublic static string build_property_enforceextendedanalyzerrules => @"";\n//real name: build_property.rscg_wait_seconds\npublic static string build_property_rscg_wait_seconds => @"10";\n//real name: build_property.targetframework\npublic static string build_property_targetframework => @"net8.0";\n//real name: build_property.targetplatformminversion\npublic static string build_property_targetplatformminversion => @"";\n//real name: build_property.invariantglobalization\npublic static string build_property_invariantglobalization => @"";\n//real name: build_property.platformneutralassembly\npublic static string build_property_platformneutralassembly => @"";\n//real name: build_property.projectdir\npublic static string build_property_projectdir => @"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Wait\\src\\Console_Wait\\";\n//real name: build_property.enablecomhosting\npublic static string build_property_enablecomhosting => @"";\n//real name: build_property.enablegeneratedcominterfacecomimportinterop\npublic static string build_property_enablegeneratedcominterfacecomimportinterop => @"";\n//real name: build_property._supportedplatformlist\npublic static string build_property__supportedplatformlist => @"Linux,macOS,Windows";\n//real name: build_property.usingmicrosoftnetsdkweb\npublic static string build_property_usingmicrosoftnetsdkweb => @"";\n}//end class//end namespace\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Wait\\src\\Console_Wait\\obj\\GX\\RSCG_Wait\\RSCG_Wait.WaitGenerator\\WaitGeneratorEnd.g.cs",label:"WaitGeneratorEnd.g.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by a tool RSCG_Wait.\n//     Runtime Version: 2024.2.24.1940\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n//pragma warning disable CS1591\nnamespace RSCG_Wait;\npartial class MyGeneratedCode\n{\n    public static string DateEnd => "2/29/2024 8:21:15 AM";\n    \n}\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Wait\\src\\Console_Wait\\obj\\GX\\RSCG_Wait\\RSCG_Wait.WaitGenerator\\WaitGeneratorStart.g.cs",label:"WaitGeneratorStart.g.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by a tool RSCG_Wait.\n//     Runtime Version: 2024.2.24.1940\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n#nullable enable\nnamespace RSCG_Wait;\n//pragma warning disable CS1591\n[global::System.CodeDom.Compiler.GeneratedCode("RSCG_Wait", "2024.2.24.1940")]\n[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]\npartial class MyGeneratedCode\n{\n    public static string DateStart => "2/29/2024 8:21:05 AM";\n    public static int SecondsToWait=10;\n}\n#nullable restore\n')))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:a(97772).Z},"Download Example project RSCG_Wait "))),(0,i.kt)("h3",{id:"share-rscg_wait"},"Share RSCG_Wait"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait&quote=RSCG_Wait",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait&text=RSCG_Wait:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait&title=RSCG_Wait",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait&title=RSCG_Wait&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Wait",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Wait"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Wait")),(0,i.kt)("h3",{id:"in-the-same-category-enhancementproject---13-other-generators"},"In the same category (EnhancementProject) - 13 other generators"),(0,i.kt)("h4",{id:"autoinvokegenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/AutoInvoke.Generator"},"AutoInvoke.Generator")),(0,i.kt)("h4",{id:"autospectre"},(0,i.kt)("a",{parentName:"h4",href:"/docs/AutoSpectre"},"AutoSpectre")),(0,i.kt)("h4",{id:"buildinfo"},(0,i.kt)("a",{parentName:"h4",href:"/docs/BuildInfo"},"BuildInfo")),(0,i.kt)("h4",{id:"com"},(0,i.kt)("a",{parentName:"h4",href:"/docs/Com"},"Com")),(0,i.kt)("h4",{id:"commandline"},(0,i.kt)("a",{parentName:"h4",href:"/docs/CommandLine"},"CommandLine")),(0,i.kt)("h4",{id:"deedee"},(0,i.kt)("a",{parentName:"h4",href:"/docs/DeeDee"},"DeeDee")),(0,i.kt)("h4",{id:"linqgengenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/LinqGen.Generator"},"LinqGen.Generator")),(0,i.kt)("h4",{id:"mediator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/Mediator"},"Mediator")),(0,i.kt)("h4",{id:"plantumlclassdiagramgenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/PlantUmlClassDiagramGenerator"},"PlantUmlClassDiagramGenerator")),(0,i.kt)("h4",{id:"rscg_ams"},(0,i.kt)("a",{parentName:"h4",href:"/docs/RSCG_AMS"},"RSCG_AMS")),(0,i.kt)("h4",{id:"rscg_functionswithdi"},(0,i.kt)("a",{parentName:"h4",href:"/docs/RSCG_FunctionsWithDI"},"RSCG_FunctionsWithDI")),(0,i.kt)("h4",{id:"rscg_timebombcomment"},(0,i.kt)("a",{parentName:"h4",href:"/docs/RSCG_TimeBombComment"},"RSCG_TimeBombComment")),(0,i.kt)("h4",{id:"thisassembly"},(0,i.kt)("a",{parentName:"h4",href:"/docs/ThisAssembly"},"ThisAssembly")))}h.isMDXComponent=!0},97772:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/RSCG_Wait-b6371a1532387ec22bc40bcaeaa6d796.zip"}}]);