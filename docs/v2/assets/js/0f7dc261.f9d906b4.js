"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2128],{9779:(t,e,o)=>{o.r(e),o.d(e,{assets:()=>p,contentTitle:()=>c,default:()=>k,frontMatter:()=>u,metadata:()=>l,toc:()=>m});var a=o(87462),r=(o(67294),o(3905)),n=o(73992),s=o(18679),i=o(68839);const u={sidebar_position:110,title:"11 - AutoDeconstruct",description:"Automatically add deconstruct for all types in an assembly",slug:"/AutoDeconstruct"},c="AutoDeconstruct  by Jason Bock",l={unversionedId:"RSCG-Examples/AutoDeconstruct",id:"RSCG-Examples/AutoDeconstruct",title:"11 - AutoDeconstruct",description:"Automatically add deconstruct for all types in an assembly",source:"@site/docs/RSCG-Examples/AutoDeconstruct.md",sourceDirName:"RSCG-Examples",slug:"/AutoDeconstruct",permalink:"/RSCG_Examples/v2/docs/AutoDeconstruct",draft:!1,tags:[],version:"current",sidebarPosition:110,frontMatter:{sidebar_position:110,title:"11 - AutoDeconstruct",description:"Automatically add deconstruct for all types in an assembly",slug:"/AutoDeconstruct"},sidebar:"tutorialSidebar",previous:{title:"10 - RSCG_AMS",permalink:"/RSCG_Examples/v2/docs/RSCG_AMS"},next:{title:"12 - System.Runtime.InteropServices",permalink:"/RSCG_Examples/v2/docs/System.Runtime.InteropServices"}},p={},m=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share AutoDeconstruct",id:"share-autodeconstruct",level:3},{value:"In the same category (Constructor) - 5 other generators",id:"in-the-same-category-constructor---5-other-generators",level:3},{value:"AutoConstructor",id:"autoconstructor",level:4},{value:"AutoCtor",id:"autoctor",level:4},{value:"PrimaryParameter",id:"primaryparameter",level:4},{value:"QuickConstructor",id:"quickconstructor",level:4},{value:"sourcedepend",id:"sourcedepend",level:4}],d={toc:m},h="wrapper";function k(t){let{components:e,...u}=t;return(0,r.kt)(h,(0,a.Z)({},d,u,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"autodeconstruct--by-jason-bock"},"AutoDeconstruct  by Jason Bock"),(0,r.kt)(i.Z,{toc:m,mdxType:"TOCInline"}),(0,r.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AutoDeconstruct"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/AutoDeconstruct?label=AutoDeconstruct",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/jasonbock/autodeconstruct"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/jasonbock/autodeconstruct?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/jasonbock/autodeconstruct?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"AutoDeconstruct")),(0,r.kt)("p",{parentName:"admonition"},"Generates deconstruction methods for type definitions."),(0,r.kt)("p",{parentName:"admonition"},"Author: Jason Bock"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/AutoDeconstruct"},"https://www.nuget.org/packages/AutoDeconstruct")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/JasonBock/AutoDeconstruct/blob/main/docs/Overview.md"},"https://github.com/JasonBock/AutoDeconstruct/blob/main/docs/Overview.md")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/jasonbock/autodeconstruct"},"https://github.com/jasonbock/autodeconstruct"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"autodeconstruct"},"AutoDeconstruct"),(0,r.kt)("p",{parentName:"admonition"},"A library that automatically adds support for object deconstruction in C#."),(0,r.kt)("h2",{parentName:"admonition",id:"overview"},"Overview"),(0,r.kt)("p",{parentName:"admonition"},"The idea started with ",(0,r.kt)("a",{parentName:"p",href:"https://twitter.com/buhakmeh/status/1462106117564207104"},"this tweet")," - specifically, ",(0,r.kt)("a",{parentName:"p",href:"https://twitter.com/dave_peixoto/status/1462181358248374278"},"this reply"),". I thought...how automatic can I make object deconstruction in C#? That's what this source generator is all about."),(0,r.kt)("p",{parentName:"admonition"},"Read the overview document for further details.")),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Automatically add deconstruct for all types in an assembly")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(n.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"AutoDeconstruct")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net6.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="AutoDeconstruct" Version="1.0.0" />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoDeconstruct\\src\\AutoDeconstructDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"AutoDeconstruct")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// See https://aka.ms/new-console-template for more information\nConsole.WriteLine("Hello, World!");\nvar p = new Person();\np.FirstName = "Test";\np.LastName = "Ignat";\nvar (_, l, _ ) = p;\nConsole.WriteLine($"Last name is {l}");\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoDeconstruct\\src\\AutoDeconstructDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"AutoDeconstruct")," in ",(0,r.kt)("em",{parentName:"p"},"Person.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// See https://aka.ms/new-console-template for more information\nusing AutoDeconstruct;\n\npublic class Person\n{\n    public string? FirstName { get; set; }\n    public string? LastName { get; set; }\n    public string? Title { get; set; }\n}\n\n[NoAutoDeconstruct]\npublic class TestPerson\n{\n    public string? FirstName { get; set; }\n    public string? LastName { get; set; }\n    public string? Title { get; set; }\n\n}\n")))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(n.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoDeconstruct\\src\\AutoDeconstructDemo\\obj\\GX\\AutoDeconstruct\\AutoDeconstruct.AutoDeconstructGenerator\\AutoDeconstruct.g.cs",label:"AutoDeconstruct.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"#nullable enable\n\npublic static partial class PersonExtensions\n{\n    public static void Deconstruct(this global::Person @self, out string? @firstName, out string? @lastName, out string? @title)\n    {\n        global::System.ArgumentNullException.ThrowIfNull(@self);\n        (@firstName, @lastName, @title) =\n            (@self.FirstName, @self.LastName, @self.Title);\n    }\n}\n\n")))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:o(70274).Z},"Download Example project AutoDeconstruct "))),(0,r.kt)("h3",{id:"share-autodeconstruct"},"Share AutoDeconstruct"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&quote=AutoDeconstruct",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&text=AutoDeconstruct:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&title=AutoDeconstruct",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&title=AutoDeconstruct&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoDeconstruct"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoDeconstruct")),(0,r.kt)("h3",{id:"in-the-same-category-constructor---5-other-generators"},"In the same category (Constructor) - 5 other generators"),(0,r.kt)("h4",{id:"autoconstructor"},(0,r.kt)("a",{parentName:"h4",href:"/docs/AutoConstructor"},"AutoConstructor")),(0,r.kt)("h4",{id:"autoctor"},(0,r.kt)("a",{parentName:"h4",href:"/docs/AutoCtor"},"AutoCtor")),(0,r.kt)("h4",{id:"primaryparameter"},(0,r.kt)("a",{parentName:"h4",href:"/docs/PrimaryParameter"},"PrimaryParameter")),(0,r.kt)("h4",{id:"quickconstructor"},(0,r.kt)("a",{parentName:"h4",href:"/docs/QuickConstructor"},"QuickConstructor")),(0,r.kt)("h4",{id:"sourcedepend"},(0,r.kt)("a",{parentName:"h4",href:"/docs/sourcedepend"},"sourcedepend")))}k.isMDXComponent=!0},70274:(t,e,o)=>{o.d(e,{Z:()=>a});const a=o.p+"assets/files/AutoDeconstruct-7c04b54223fa499c41f117505d3fabf6.zip"}}]);