"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[6716],{5621:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>b,frontMatter:()=>r,metadata:()=>p,toc:()=>u});var o=a(7462),n=(a(7294),a(4137)),m=a(3992),i=a(425),s=a(8839);const r={sidebar_position:2,title:"RSCG - RSCG_TimeBombComment",description:"This will generate an error from the comment after a certain date",slug:"/RSCG_TimeBombComment"},l="RSCG_TimeBombComment  by Andrei Ignat",p={unversionedId:"RSCG-Examples/002RSCG_TimeBombComment",id:"RSCG-Examples/002RSCG_TimeBombComment",title:"RSCG - RSCG_TimeBombComment",description:"This will generate an error from the comment after a certain date",source:"@site/docs/RSCG-Examples/002RSCG_TimeBombComment.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_TimeBombComment",permalink:"/RSCG_Examples/v2/docs/RSCG_TimeBombComment",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"RSCG - RSCG_TimeBombComment",description:"This will generate an error from the comment after a certain date",slug:"/RSCG_TimeBombComment"},sidebar:"tutorialSidebar",previous:{title:"RSCG - ThisAssembly",permalink:"/RSCG_Examples/v2/docs/ThisAssembly"},next:{title:"RSCG Without Examples",permalink:"/RSCG_Examples/v2/docs/category/rscg-without-examples"}},d={},u=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example",id:"download-example",level:3},{value:"Download PDF",id:"download-pdf",level:3},{value:"Share this page",id:"share-this-page",level:3}],c={toc:u},C="wrapper";function b(e){let{components:t,...r}=e;return(0,n.kt)(C,(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"rscg_timebombcomment--by-andrei-ignat"},"RSCG_TimeBombComment  by Andrei Ignat"),(0,n.kt)(s.Z,{toc:u,mdxType:"TOCInline"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_TimeBombComment/"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_TimeBombComment?label=RSCG_TimeBombComment",alt:"Nuget"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_TimeBombComment"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/RSCG_TimeBombComment?label=updated",alt:"GitHub last commit"})),"\n",(0,n.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/RSCG_TimeBombComment?style=social",alt:"GitHub Repo stars"})),(0,n.kt)("h2",{id:"details"},"Details"),(0,n.kt)("h3",{id:"info"},"Info"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Author: Andrei Ignat"),(0,n.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,n.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_TimeBombComment/"},"https://www.nuget.org/packages/RSCG_TimeBombComment/")),(0,n.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,n.kt)("a",{parentName:"p",href:"http://msprogrammer.serviciipeweb.ro/category/roslyn/"},"http://msprogrammer.serviciipeweb.ro/category/roslyn/")),(0,n.kt)("p",{parentName:"admonition"},"Source : ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_TimeBombComment"},"https://github.com/ignatandrei/RSCG_TimeBombComment"))),(0,n.kt)("h3",{id:"about"},"About"),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"This will generate an error from the comment after a certain date")),(0,n.kt)("h2",{id:"how-to-use"},"How to use"),(0,n.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,n.kt)(m.Z,{mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,n.kt)("p",null,"This is the CSharp Project that references RSCG_TimeBombComment "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},'<Project Sdk="Microsoft.NET.Sdk">\n    <PropertyGroup>\n        <OutputType>Exe</OutputType>\n        <TargetFramework>net7.0</TargetFramework>\n    </PropertyGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GeneratedX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n    <ItemGroup>\n        <PackageReference Include="RSCG_TimeBombComment" Version="2023.5.9.2110" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />\n    </ItemGroup>\n</Project>\n\n'))),(0,n.kt)(i.Z,{value:"TestClass.cs",label:"TestClass.cs",mdxType:"TabItem"},(0,n.kt)("p",null,"  This is the use of RSCG_TimeBombComment in TestClass.cs"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp"},'namespace Console_TimeBombComment;\ninternal partial class TestClass\n{\n    [Obsolete("this will be obsolete",TB_20230508)]\n    public int DataObsolete()\n    {\n        return 5;\n    }\n\n    public int CommentsWithErrors()\n    {\n        //JFD: test\n        //TB: 2021-09-13 this is a comment transformed into an error\n        //TB: and this is a warning\n        //TB: 2050-12-30 and this should not appear yet\n        return 5;\n    }\n}\n\n')))),(0,n.kt)("h3",{id:"generated-files"},"Generated Files"),(0,n.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GeneratedX"),(0,n.kt)(m.Z,{mdxType:"Tabs"},(0,n.kt)(i.Z,{value:"Obsolete_1.cs",label:"Obsolete_1.cs",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp"},"\nnamespace Console_TimeBombComment {\n    partial class TestClass { \n        const bool TB_20230508 = true;\n    }\n}\n\n                \n")))),(0,n.kt)("h2",{id:"usefull"},"Usefull"),(0,n.kt)("h3",{id:"download-example"},"Download Example"),(0,n.kt)("p",null,(0,n.kt)("a",{target:"_blank",href:a(9937).Z},"Download Example RSCG_TimeBombComment ")),(0,n.kt)("h3",{id:"download-pdf"},"Download PDF"),(0,n.kt)("p",null,(0,n.kt)("a",{target:"_blank",href:a(6649).Z},"Download PDF RSCG_TimeBombComment ")),(0,n.kt)("h3",{id:"share-this-page"},"Share this page"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_TimeBombComment"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_TimeBombComment")))}b.isMDXComponent=!0},6649:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/files/RSCG_TimeBombComment-444b75f2f46e39c84d88dccd6b1d3567.pdf"},9937:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/files/RSCG_TimeBombComment-8fac07af48dffdc44d8ed937ba3bf42a.zip"}}]);