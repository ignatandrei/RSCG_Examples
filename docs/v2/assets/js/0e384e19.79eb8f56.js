"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[9671],{1039:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=o(7462),n=(o(7294),o(4137));const a={sidebar_position:1},s="Introduction",c={unversionedId:"intro",id:"intro",title:"Introduction",description:"What is a Roslyn Source Code Generator?",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/RSCG_Examples/v2/docs/intro",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"About",permalink:"/RSCG_Examples/v2/docs/about"}},i={},l=[{value:"What is a Roslyn Source Code Generator?",id:"what-is-a-roslyn-source-code-generator",level:2},{value:"How can I make a Roslyn Source Code Generator?",id:"how-can-i-make-a-roslyn-source-code-generator",level:2},{value:"Show me some code for RSCG",id:"show-me-some-code-for-rscg",level:2},{value:"How the RSCG can help me to write faster / better the code  ?",id:"how-the-rscg-can-help-me-to-write-faster--better-the-code--",level:2},{value:"More Links",id:"more-links",level:2}],d={toc:l},u="wrapper";function m(e){let{components:t,...o}=e;return(0,n.kt)(u,(0,r.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"introduction"},"Introduction"),(0,n.kt)("h2",{id:"what-is-a-roslyn-source-code-generator"},"What is a Roslyn Source Code Generator?"),(0,n.kt)("p",null,"A Roslyn Source Code Generator (RSCG) is a program that generates code in the compile time, based on the previous source code and/or another data. This new source code is added to the compilation and compile with the previous source code."),(0,n.kt)("h2",{id:"how-can-i-make-a-roslyn-source-code-generator"},"How can I make a Roslyn Source Code Generator?"),(0,n.kt)("p",null,"For creating the RSCG you will simply create a .NET Standard 2.0 project, add those 2 references"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml"},'\n    <PackageReference Include="Microsoft.CodeAnalysis.Analyzers"  PrivateAssets="all" />\n    <PackageReference Include="Microsoft.CodeAnalysis.CSharp"  />\n\n')),(0,n.kt)("p",null,"For tutorials , it is easiear to start implementing ,even if deprecated"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp"},"\npublic interface ISourceGenerator\n{\n    void Initialize(GeneratorInitializationContext context);\n    void Execute(GeneratorExecutionContext context);\n}\n\n")),(0,n.kt)("p",null,"After you understand , you can start with v2 IIncrementalGenerator :\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md"},"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md")),(0,n.kt)("p",null,"Start from examples at ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators"},"https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators")),(0,n.kt)("p",null,"Also, you can read the source code for the RSCG presented in this book."),(0,n.kt)("h1",{id:""}),(0,n.kt)("h2",{id:"show-me-some-code-for-rscg"},"Show me some code for RSCG"),(0,n.kt)("p",null,"Start read"),(0,n.kt)("p",null," ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.md"},"https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.md")),(0,n.kt)("p",null,"and"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md"},"https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md")," ."),(0,n.kt)("p",null,"After that, you can play with the examples from ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators"},"https://github.com/dotnet/roslyn-sdk/tree/main/samples/CSharp/SourceGenerators")," or from ",(0,n.kt)("a",{parentName:"p",href:"https://sourcegen.dev/"},"https://sourcegen.dev/")," (see AutoNotify in the dropdown)"),(0,n.kt)("p",null,"Second iteration , incremental generators: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md"},"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md")," "),(0,n.kt)("h2",{id:"how-the-rscg-can-help-me-to-write-faster--better-the-code--"},"How the RSCG can help me to write faster / better the code  ?"),(0,n.kt)("p",null,"Glad that you asked. You can see in action a RSCG for automatically generating code for automating testing (see DynamicMocking ) , parsing enum (see Enum ) , generating controllers actions from a interface ( SkinnyControllers ), currying functions and many more. In this book you will find more than 10 examples of some RSCG that can help you. Also, you can find the source code of the examples at  ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Examples"},"https://github.com/ignatandrei/RSCG_Examples"),"."),(0,n.kt)("h1",{id:"is-microsoft-using-roslyn-source-code-generators-"},"Is Microsoft using Roslyn Source Code Generators ?"),(0,n.kt)("p",null,"Yes , Microsoft is developing more Generators - for getting rid of reflection - and other tasks."),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/search?q=repo%3Adotnet%2Fruntime%20IIncrementalGenerator&type=code"},"https://github.com/search?q=repo%3Adotnet%2Fruntime%20IIncrementalGenerator&type=code")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/search?q=org%3Adotnet+IIncrementalGenerator+language%3AC%23&type=code&l=C%23&p=2"},"https://github.com/search?q=org%3Adotnet+IIncrementalGenerator+language%3AC%23&type=code&l=C%23&p=2")),(0,n.kt)("h2",{id:"more-links"},"More Links"),(0,n.kt)("p",null,"First iteration of RSCG: "),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/"},"https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview"},"https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview")),(0,n.kt)("p",null,"Second iteration , incremental generators: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md"},"https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md")," "),(0,n.kt)("p",null,"Andrew Lock's blog post on source generators:  ",(0,n.kt)("a",{parentName:"p",href:"https://andrewlock.net/series/creating-a-source-generator/"},"https://andrewlock.net/series/creating-a-source-generator/")),(0,n.kt)("p",null,"Jason Bock on constructing AutoDeconstruct : ",(0,n.kt)("a",{parentName:"p",href:"https://codemag.com/Article/2305061/Writing-Code-to-Generate-Code-in-C#"},"https://codemag.com/Article/2305061/Writing-Code-to-Generate-Code-in-C#")),(0,n.kt)("p",null,"How to debug a RSCG: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/JoanComasFdz/dotnet-how-to-debug-source-generator-vs2022"},"https://github.com/JoanComasFdz/dotnet-how-to-debug-source-generator-vs2022")),(0,n.kt)("p",null,"CheatSheet for RSCG: ",(0,n.kt)("a",{parentName:"p",href:"https://notanaverageman.github.io/2020/12/07/cs-source-generators-cheatsheet.html"},"https://notanaverageman.github.io/2020/12/07/cs-source-generators-cheatsheet.html")),(0,n.kt)("p",null,"Pawel Gerr on RSCG: ",(0,n.kt)("a",{parentName:"p",href:"https://www.thinktecture.com/en/net/roslyn-source-generators-introduction/"},"https://www.thinktecture.com/en/net/roslyn-source-generators-introduction/")),(0,n.kt)("p",null,"Unity: ",(0,n.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Packages/com.unity.roslyn@0.2/manual/index.html"},"https://docs.unity3d.com/Packages/com.unity.roslyn@0.2/manual/index.html")))}m.isMDXComponent=!0}}]);