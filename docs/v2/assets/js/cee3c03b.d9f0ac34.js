"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[3264],{3655:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>h,frontMatter:()=>m,metadata:()=>c,toc:()=>d});var n=a(7462),i=(a(7294),a(4137)),r=a(3992),o=a(425),s=a(8839);const m={sidebar_position:80,title:"08 - RSCG_Static",description:"Generate interfaces and classes from static classes",slug:"/RSCG_Static"},l="RSCG_Static  by Andrei Ignat",c={unversionedId:"RSCG-Examples/RSCG_Static",id:"RSCG-Examples/RSCG_Static",title:"08 - RSCG_Static",description:"Generate interfaces and classes from static classes",source:"@site/docs/RSCG-Examples/RSCG_Static.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_Static",permalink:"/RSCG_Examples/v2/docs/RSCG_Static",draft:!1,tags:[],version:"current",sidebarPosition:80,frontMatter:{sidebar_position:80,title:"08 - RSCG_Static",description:"Generate interfaces and classes from static classes",slug:"/RSCG_Static"},sidebar:"tutorialSidebar",previous:{title:"07 - Microsoft.Extensions.Logging",permalink:"/RSCG_Examples/v2/docs/Microsoft.Extensions.Logging"},next:{title:"09 - CommunityToolkit.Mvvm",permalink:"/RSCG_Examples/v2/docs/CommunityToolkit.Mvvm"}},p={},d=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share RSCG_Static",id:"share-rscg_static",level:3},{value:"In the same category (EnhancementClass)",id:"in-the-same-category-enhancementclass",level:2},{value:"ApparatusAOT",id:"apparatusaot",level:3},{value:"BenutomoAutomaticDisposeImplSourceGenerator",id:"benutomoautomaticdisposeimplsourcegenerator",level:3},{value:"CommunityToolkit.Mvvm",id:"communitytoolkitmvvm",level:3},{value:"EnumClass",id:"enumclass",level:3},{value:"FastGenericNew",id:"fastgenericnew",level:3},{value:"GeneratorEquals",id:"generatorequals",level:3},{value:"Immutype",id:"immutype",level:3},{value:"Lombok.NET",id:"lomboknet",level:3},{value:"M31.FluentAPI",id:"m31fluentapi",level:3},{value:"MemoryPack",id:"memorypack",level:3},{value:"Microsoft.Extensions.Logging",id:"microsoftextensionslogging",level:3},{value:"Microsoft.Interop.JavaScript.JSImportGenerator",id:"microsoftinteropjavascriptjsimportgenerator",level:3},{value:"MorrisMoxy",id:"morrismoxy",level:3},{value:"NetEscapades.EnumGenerators",id:"netescapadesenumgenerators",level:3},{value:"PropertyChangedSourceGenerator",id:"propertychangedsourcegenerator",level:3},{value:"Roozie.AutoInterface",id:"roozieautointerface",level:3},{value:"SyncMethodGenerator",id:"syncmethodgenerator",level:3},{value:"System.Runtime.InteropServices",id:"systemruntimeinteropservices",level:3},{value:"System.Text.Json",id:"systemtextjson",level:3},{value:"System.Text.RegularExpressions",id:"systemtextregularexpressions",level:3}],u={toc:d},S="wrapper";function h(e){let{components:t,...m}=e;return(0,i.kt)(S,(0,n.Z)({},u,m,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rscg_static--by-andrei-ignat"},"RSCG_Static  by Andrei Ignat"),(0,i.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_Static/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_Static?label=RSCG_Static",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Static"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/RSCG_Static?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/RSCG_Static?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Static")),(0,i.kt)("p",{parentName:"admonition"},"This package make you an interface and  record from static properties / methods"),(0,i.kt)("p",{parentName:"admonition"},"Author: Andrei Ignat"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/RSCG_Static/"},"https://www.nuget.org/packages/RSCG_Static/")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Static"},"https://github.com/ignatandrei/RSCG_Static")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Static"},"https://github.com/ignatandrei/RSCG_Static"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"rscg_static"},"RSCG_Static"),(0,i.kt)("p",{parentName:"admonition"},"Roslyn Source Code Generator - transform static classes into instances and interfaces "),(0,i.kt)("p",{parentName:"admonition"},"More, there is a MakeNew static method created to can have DI."),(0,i.kt)("p",{parentName:"admonition"},"Just put a function like this ( example for System.DateTime)"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"        public Type GenerateInterfaceFromDate()=>typeof(DateTime);\n")),(0,i.kt)("p",{parentName:"admonition"},"and the properties of the classes will be generated into interfaces and you can write:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'//for DI, register\n//ISystem_DateTime  with transient for new clsSystem_DateTime()\nConsole.WriteLine("Hello World!");\nISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static\nISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real \n\nConsole.WriteLine(dateStatic.Now.Second);\nConsole.WriteLine(dateVar.Now.Second);\nawait Task.Delay(10 * 1000);\nConsole.WriteLine(dateStatic.Now.Second);\nConsole.WriteLine(dateVar.Now.Second);\n')),(0,i.kt)("h1",{parentName:"admonition",id:"more-roslyn-source-code-generators"},"More Roslyn Source Code Generators"),(0,i.kt)("p",{parentName:"admonition"},"You can find more RSCG with examples at ",(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/"},"Roslyn Source Code Generators"))),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Generate interfaces and classes from static classes")),(0,i.kt)("h2",{id:"how-to-use"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(r.Z,{mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Static")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {14}",showLineNumbers:!0,"{14}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n    <PropertyGroup>\n        <OutputType>Exe</OutputType>\n        <TargetFramework>net7.0</TargetFramework>\n        <ImplicitUsings>enable</ImplicitUsings>\n        <Nullable>enable</Nullable>\n    </PropertyGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n    <ItemGroup>\n        <PackageReference Include="RSCG_Static" Version="2023.5.19.2037" />\n    </ItemGroup>\n\n</Project>\n\n'))),(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Static\\src\\RSCG_StaticDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Static")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using RSCG_StaticDemo;\n//for DI, register\n//ISystem_DateTime  with transient for new clsSystem_DateTime()\nConsole.WriteLine("Hello World!");\nISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static\nISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real \n\nConsole.WriteLine(dateStatic.Now.Second);\nConsole.WriteLine(dateVar.Now.Second);\nawait Task.Delay(10 * 1000);\nConsole.WriteLine(dateStatic.Now.Second);\nConsole.WriteLine(dateVar.Now.Second);\n\n'))),(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Static\\src\\RSCG_StaticDemo\\StaticToInterface.cs",label:"StaticToInterface.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Static")," in ",(0,i.kt)("em",{parentName:"p"},"StaticToInterface.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace RSCG_StaticDemo;\n\npublic partial class StaticToInterface\n{\n    public Type GenerateInterfaceFromDate() => typeof(DateTime);\n}\n\n")))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(r.Z,{mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Static\\src\\RSCG_StaticDemo\\obj\\GX\\RSCG_Static\\RSCG_Static.GenerateFromStaticIncremental\\GenerateInterfaceFromDate.cs",label:"GenerateInterfaceFromDate.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"\n#nullable enable\n namespace RSCG_StaticDemo {\n      public interface ISystem_DateTime {\n          public System.DateTime Now  {get;}\n          public System.DateTime Today  {get;}\n          public System.DateTime UtcNow  {get;}\n      }// interface\n//now the partial class\n      public record recSystem_DateTime (System.DateTime Now,System.DateTime Today,System.DateTime UtcNow) : ISystem_DateTime\n      { \n            public static recSystem_DateTime MakeNew() {\n            return new recSystem_DateTime(System.DateTime.Now,System.DateTime.Today,System.DateTime.UtcNow);\n            } //end makenew\n      } //end record\n      public class clsSystem_DateTime : ISystem_DateTime \n      { \n            public System.DateTime Now  {get { return System.DateTime.Now; } }\n            public System.DateTime Today  {get { return System.DateTime.Today; } }\n            public System.DateTime UtcNow  {get { return System.DateTime.UtcNow; } }\n       } //end class\n } // namespace\n#nullable disable\n")))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:a(8365).Z},"Download Example project RSCG_Static "))),(0,i.kt)("h3",{id:"share-rscg_static"},"Share RSCG_Static"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&quote=RSCG_Static",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&text=RSCG_Static:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&title=RSCG_Static",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&title=RSCG_Static&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Static"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Static")),(0,i.kt)("h2",{id:"in-the-same-category-enhancementclass"},"In the same category (EnhancementClass)"),(0,i.kt)("h3",{id:"apparatusaot"},(0,i.kt)("a",{parentName:"h3",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,i.kt)("h3",{id:"benutomoautomaticdisposeimplsourcegenerator"},(0,i.kt)("a",{parentName:"h3",href:"/docs/BenutomoAutomaticDisposeImplSourceGenerator"},"BenutomoAutomaticDisposeImplSourceGenerator")),(0,i.kt)("h3",{id:"communitytoolkitmvvm"},(0,i.kt)("a",{parentName:"h3",href:"/docs/CommunityToolkit.Mvvm"},"CommunityToolkit.Mvvm")),(0,i.kt)("h3",{id:"enumclass"},(0,i.kt)("a",{parentName:"h3",href:"/docs/EnumClass"},"EnumClass")),(0,i.kt)("h3",{id:"fastgenericnew"},(0,i.kt)("a",{parentName:"h3",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,i.kt)("h3",{id:"generatorequals"},(0,i.kt)("a",{parentName:"h3",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,i.kt)("h3",{id:"immutype"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Immutype"},"Immutype")),(0,i.kt)("h3",{id:"lomboknet"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,i.kt)("h3",{id:"m31fluentapi"},(0,i.kt)("a",{parentName:"h3",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,i.kt)("h3",{id:"memorypack"},(0,i.kt)("a",{parentName:"h3",href:"/docs/MemoryPack"},"MemoryPack")),(0,i.kt)("h3",{id:"microsoftextensionslogging"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,i.kt)("h3",{id:"microsoftinteropjavascriptjsimportgenerator"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,i.kt)("h3",{id:"morrismoxy"},(0,i.kt)("a",{parentName:"h3",href:"/docs/MorrisMoxy"},"MorrisMoxy")),(0,i.kt)("h3",{id:"netescapadesenumgenerators"},(0,i.kt)("a",{parentName:"h3",href:"/docs/NetEscapades.EnumGenerators"},"NetEscapades.EnumGenerators")),(0,i.kt)("h3",{id:"propertychangedsourcegenerator"},(0,i.kt)("a",{parentName:"h3",href:"/docs/PropertyChangedSourceGenerator"},"PropertyChangedSourceGenerator")),(0,i.kt)("h3",{id:"roozieautointerface"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,i.kt)("h3",{id:"syncmethodgenerator"},(0,i.kt)("a",{parentName:"h3",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,i.kt)("h3",{id:"systemruntimeinteropservices"},(0,i.kt)("a",{parentName:"h3",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")),(0,i.kt)("h3",{id:"systemtextjson"},(0,i.kt)("a",{parentName:"h3",href:"/docs/System.Text.Json"},"System.Text.Json")),(0,i.kt)("h3",{id:"systemtextregularexpressions"},(0,i.kt)("a",{parentName:"h3",href:"/docs/System.Text.RegularExpressions"},"System.Text.RegularExpressions")))}h.isMDXComponent=!0},8365:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/RSCG_Static-100493f5c7550092680645c13f637be0.zip"}}]);