"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[5916],{74879:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>g,contentTitle:()=>p,default:()=>c,frontMatter:()=>o,metadata:()=>m,toc:()=>d});var n=a(87462),l=(a(67294),a(3905)),r=a(73992),i=a(18679),s=a(68839);const o={sidebar_position:1750,title:"175 - Dolly",description:"Clone objects with ease.",slug:"/Dolly"},p="Dolly  by Peter Andersson",m={unversionedId:"RSCG-Examples/Dolly",id:"RSCG-Examples/Dolly",title:"175 - Dolly",description:"Clone objects with ease.",source:"@site/docs/RSCG-Examples/Dolly.md",sourceDirName:"RSCG-Examples",slug:"/Dolly",permalink:"/RSCG_Examples/v2/docs/Dolly",draft:!1,tags:[],version:"current",sidebarPosition:1750,frontMatter:{sidebar_position:1750,title:"175 - Dolly",description:"Clone objects with ease.",slug:"/Dolly"},sidebar:"tutorialSidebar",previous:{title:"174 - Dapper.AOT",permalink:"/RSCG_Examples/v2/docs/Dapper.AOT"},next:{title:"v1",permalink:"/RSCG_Examples/v2/docs/v1"}},g={},d=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share Dolly",id:"share-dolly",level:3},{value:"In the same category (Clone) - 1 other generators",id:"in-the-same-category-clone---1-other-generators",level:3},{value:"CopyTo",id:"copyto",level:4}],h={toc:d},u="wrapper";function c(e){let{components:t,...o}=e;return(0,l.kt)(u,(0,n.Z)({},h,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"dolly--by-peter-andersson"},"Dolly  by Peter Andersson"),(0,l.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,l.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Dolly/"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/Dolly?label=Dolly",alt:"Nuget"})),"\n",(0,l.kt)("a",{parentName:"p",href:"https://github.com/AnderssonPeter/Dolly"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/AnderssonPeter/Dolly?label=updated",alt:"GitHub last commit"})),"\n",(0,l.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/AnderssonPeter/Dolly?style=social",alt:"GitHub Repo stars"})),(0,l.kt)("h2",{id:"details"},"Details"),(0,l.kt)("h3",{id:"info"},"Info"),(0,l.kt)("admonition",{type:"info"},(0,l.kt)("p",{parentName:"admonition"},"Name: ",(0,l.kt)("strong",{parentName:"p"},"Dolly")),(0,l.kt)("p",{parentName:"admonition"},"Clone .net objects using source generation"),(0,l.kt)("p",{parentName:"admonition"},"Author: Peter Andersson"),(0,l.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,l.kt)("em",{parentName:"p"},(0,l.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/Dolly/"},"https://www.nuget.org/packages/Dolly/")),"   "),(0,l.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/AnderssonPeter/Dolly"},"https://github.com/AnderssonPeter/Dolly")),(0,l.kt)("p",{parentName:"admonition"},"Source : ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/AnderssonPeter/Dolly"},"https://github.com/AnderssonPeter/Dolly"))),(0,l.kt)("h3",{id:"original-readme"},"Original Readme"),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{align:"center"},(0,l.kt)("a",{href:"https://github.com/AnderssonPeter/Dolly"},"Dolly"),"  ",(0,l.kt)("h3",{align:"center"},"Dolly"),"  ",(0,l.kt)("p",{align:"center"},"Clone .net objects using source generation",(0,l.kt)("br",null),(0,l.kt)("br",null),"\xb7",(0,l.kt)("a",{href:"https://github.com/AnderssonPeter/Dolly/issues"},"Report Bug"),"\xb7",(0,l.kt)("a",{href:"https://github.com/AnderssonPeter/Dolly/issues"},"Request Feature"),"\xb7")),(0,l.kt)("br",null),(0,l.kt)("p",{parentName:"admonition"},(0,l.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Dolly"},(0,l.kt)("img",{parentName:"a",src:"https://badge.fury.io/nu/Dolly.svg",alt:"NuGet version"})),"\n",(0,l.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Dolly"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/Dolly",alt:"Nuget"})),"\n",(0,l.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/AnderssonPeter/Dolly/main/LICENSE"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/license-Apache%202-blue.svg",alt:"GitHub license"}))),(0,l.kt)("p",{parentName:"admonition"},(0,l.kt)("a",{parentName:"p",href:"https://github.com/AnderssonPeter/Dolly/actions/workflows/test.yml"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/github/actions/workflow/status/AnderssonPeter/Dolly/test.yml?branch=main&style=flat-square&label=unit%20tests",alt:"unit tests"})),"\n",(0,l.kt)("a",{parentName:"p",href:"https://anderssonpeter.testspace.com/spaces/293120/result_sets"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/testspace/tests/AnderssonPeter/AnderssonPeter:Dolly/main?style=flat-square",alt:"Testspace tests"})),"\n",(0,l.kt)("a",{parentName:"p",href:"https://coveralls.io/github/AnderssonPeter/Dolly"},(0,l.kt)("img",{parentName:"a",src:"https://img.shields.io/coveralls/github/AnderssonPeter/Dolly?style=flat-square",alt:"Coverage Status"}))),(0,l.kt)("h2",{parentName:"admonition",id:"table-of-contents"},"Table of Contents"),(0,l.kt)("ul",{parentName:"admonition"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#about-the-project"},"About the Project")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#getting-started"},"Getting Started")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#example"},"Example")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#Benchmarks"},"Benchmarks"))),(0,l.kt)("h2",{parentName:"admonition",id:"about-the-project"},"About The Project"),(0,l.kt)("p",{parentName:"admonition"},"Generate c# code to clone objects on the fly."),(0,l.kt)("h2",{parentName:"admonition",id:"getting-started"},"Getting Started"),(0,l.kt)("ul",{parentName:"admonition"},(0,l.kt)("li",{parentName:"ul"},"Add the ",(0,l.kt)("inlineCode",{parentName:"li"},"Dolly")," nuget and add ",(0,l.kt)("inlineCode",{parentName:"li"},"[Clonable]")," attribute to a class and ensure that the class is marked as ",(0,l.kt)("inlineCode",{parentName:"li"},"partial"),"."),(0,l.kt)("li",{parentName:"ul"},"Add ",(0,l.kt)("inlineCode",{parentName:"li"},"[CloneIgnore]")," to any property or field that you don't want to include in the clone."),(0,l.kt)("li",{parentName:"ul"},"Call ",(0,l.kt)("inlineCode",{parentName:"li"},"DeepClone()")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"ShallowClone()")," on the object.")),(0,l.kt)("h3",{parentName:"admonition",id:"example"},"Example"),(0,l.kt)("pre",{parentName:"admonition"},(0,l.kt)("code",{parentName:"pre",className:"language-C#"},"[Clonable]\npublic partial class SimpleClass\n{\n    public string First { get; set; }\n    public int Second { get; set; }\n    [CloneIgnore]\n    public float DontClone { get; set; }\n}\n")),(0,l.kt)("p",{parentName:"admonition"},"Should generate"),(0,l.kt)("pre",{parentName:"admonition"},(0,l.kt)("code",{parentName:"pre",className:"language-C#"},"partial class SimpleClass : IClonable<SimpleClass>\n{\n    \n    object ICloneable.Clone() => this.DeepClone();\n\n    public SimpleClass DeepClone() =>\n        new SimpleClass()\n        {\n            First = First,\n            Second = Second\n        };\n\n    public SimpleClass ShallowClone() =>\n        new SimpleClass()\n        {\n            First = First,\n            Second = Second\n        };\n}\n")),(0,l.kt)("h2",{parentName:"admonition",id:"benchmarks"},"Benchmarks"),(0,l.kt)("table",{parentName:"admonition"},(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Mean"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Error"),(0,l.kt)("th",{parentName:"tr",align:"right"},"StdDev"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Ratio"),(0,l.kt)("th",{parentName:"tr",align:"right"},"RatioSD"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Gen0"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Gen1"),(0,l.kt)("th",{parentName:"tr",align:"right"},"Allocated"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Dolly"),(0,l.kt)("td",{parentName:"tr",align:"right"},"124.5 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"1.59 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"1.49 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"1.00"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.02"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.0362"),(0,l.kt)("td",{parentName:"tr",align:"right"},"-"),(0,l.kt)("td",{parentName:"tr",align:"right"},"608 B")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"DeepCloner"),(0,l.kt)("td",{parentName:"tr",align:"right"},"457.7 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"7.01 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"6.56 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"3.68"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.07"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.0830"),(0,l.kt)("td",{parentName:"tr",align:"right"},"-"),(0,l.kt)("td",{parentName:"tr",align:"right"},"1392 B")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"CloneExtensions"),(0,l.kt)("td",{parentName:"tr",align:"right"},"566.2 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"9.61 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"8.52 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"4.55"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.08"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.0896"),(0,l.kt)("td",{parentName:"tr",align:"right"},"-"),(0,l.kt)("td",{parentName:"tr",align:"right"},"1504 B")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"NClone"),(0,l.kt)("td",{parentName:"tr",align:"right"},"4,308.0 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"62.01 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"58.01 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"34.61"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.61"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.5112"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.0076"),(0,l.kt)("td",{parentName:"tr",align:"right"},"8584 B")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"FastCloner"),(0,l.kt)("td",{parentName:"tr",align:"right"},"15,310.6 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"221.85 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"207.52 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"123.00"),(0,l.kt)("td",{parentName:"tr",align:"right"},"2.16"),(0,l.kt)("td",{parentName:"tr",align:"right"},"0.3967"),(0,l.kt)("td",{parentName:"tr",align:"right"},"-"),(0,l.kt)("td",{parentName:"tr",align:"right"},"6800 B")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"AnyClone"),(0,l.kt)("td",{parentName:"tr",align:"right"},"19,011.9 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"354.27 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"347.94 ns"),(0,l.kt)("td",{parentName:"tr",align:"right"},"152.74"),(0,l.kt)("td",{parentName:"tr",align:"right"},"3.25"),(0,l.kt)("td",{parentName:"tr",align:"right"},"2.4414"),(0,l.kt)("td",{parentName:"tr",align:"right"},"-"),(0,l.kt)("td",{parentName:"tr",align:"right"},"41256 B"))))),(0,l.kt)("h3",{id:"about"},"About"),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"Clone objects with ease.")),(0,l.kt)("h2",{id:"how-to-use"},"How to use"),(0,l.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,l.kt)(r.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,l.kt)("p",null,"This is the CSharp Project that references ",(0,l.kt)("strong",{parentName:"p"},"Dolly")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net9.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="Dolly" Version="0.0.7">\n      <PrivateAssets>all</PrivateAssets>\n      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>\n    </PackageReference>\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,l.kt)("p",null,"  This is the use of ",(0,l.kt)("strong",{parentName:"p"},"Dolly")," in ",(0,l.kt)("em",{parentName:"p"},"Program.cs")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// See https://aka.ms/new-console-template for more information\nusing CloneData;\n\nConsole.WriteLine("Hello, World!");\nPerson p = new ();\np.FirstName = "Andrei";\np.LastName = "Ignat";\np.Age = 54;\nvar p1=p.DeepClone();\nConsole.WriteLine(p1.Name());\n'))),(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,l.kt)("p",null,"  This is the use of ",(0,l.kt)("strong",{parentName:"p"},"Dolly")," in ",(0,l.kt)("em",{parentName:"p"},"Person.cs")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\nnamespace CloneData;\n[Dolly.Clonable]\npublic partial class Person\n{\n    public string FirstName { get; set; } = "";\n    public string LastName { get; set; } = "";\n    [Dolly.CloneIgnore]\n    public int Age { get; set; }\n    public string Name() => $"{FirstName} {LastName}";\n\n    public Person[] Childs { get; set; } = [];\n}\n\n')))),(0,l.kt)("h3",{id:"generated-files"},"Generated Files"),(0,l.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,l.kt)(r.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\obj\\GX\\Dolly\\Dolly.DollyGenerator\\ClonableAttribute.g.cs",label:"ClonableAttribute.g.cs",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using System;\n\nnamespace Dolly\n{\n    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct)]\n    public class ClonableAttribute : Attribute\n    {\n    }\n}\n"))),(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\obj\\GX\\Dolly\\Dolly.DollyGenerator\\CloneIgnoreAttribute.g.cs",label:"CloneIgnoreAttribute.g.cs",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using System;\n\nnamespace Dolly\n{\n    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]\n    public class CloneIgnoreAttribute : Attribute\n    {\n    }\n}\n"))),(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\obj\\GX\\Dolly\\Dolly.DollyGenerator\\IClonable.g.cs",label:"IClonable.g.cs",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using System;\nnamespace Dolly\n{\n    public interface IClonable<T> : ICloneable\n    {\n        T DeepClone();\n        T ShallowClone();\n    }\n}\n"))),(0,l.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Dolly\\src\\CloneData\\obj\\GX\\Dolly\\Dolly.DollyGenerator\\Person.g.cs",label:"Person.g.cs",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using Dolly;\nusing System.Linq;\nnamespace CloneData;\npartial class Person : IClonable<Person>\n{\n    object ICloneable.Clone() => this.DeepClone();\n    public virtual Person DeepClone() =>\n        new ()\n        {\n            FirstName = FirstName,\n            LastName = LastName,\n            Childs = Childs.Select(item => item.DeepClone()).ToArray()\n        };\n\n    public virtual Person ShallowClone() =>\n        new ()\n        {\n            FirstName = FirstName,\n            LastName = LastName,\n            Childs = Childs.ToArray()\n        };\n}\n")))),(0,l.kt)("h2",{id:"usefull"},"Usefull"),(0,l.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},(0,l.kt)("a",{target:"_blank",href:a(13333).Z},"Download Example project Dolly "))),(0,l.kt)("h3",{id:"share-dolly"},"Share Dolly"),(0,l.kt)("ul",null,(0,l.kt)("li",null,(0,l.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&quote=Dolly",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,l.kt)("li",null,(0,l.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&text=Dolly:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,l.kt)("li",null,(0,l.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&title=Dolly",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,l.kt)("li",null,(0,l.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&title=Dolly&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dolly"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dolly")),(0,l.kt)("h3",{id:"in-the-same-category-clone---1-other-generators"},"In the same category (Clone) - 1 other generators"),(0,l.kt)("h4",{id:"copyto"},(0,l.kt)("a",{parentName:"h4",href:"/docs/CopyTo"},"CopyTo")))}c.isMDXComponent=!0},13333:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/Dolly-cab1ac5f13768cc077702a6fff150bcb.zip"}}]);