"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[433],{19062:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>I,frontMatter:()=>c,metadata:()=>u,toc:()=>m});var s=n(87462),i=(n(67294),n(3905)),a=n(73992),r=n(18679),o=n(68839);const c={sidebar_position:220,title:"22 - RSCG_FunctionsWithDI",description:"Generating functions that have parameters from services",slug:"/RSCG_FunctionsWithDI"},l="RSCG_FunctionsWithDI  by Andrei Ignat",u={unversionedId:"RSCG-Examples/RSCG_FunctionsWithDI",id:"RSCG-Examples/RSCG_FunctionsWithDI",title:"22 - RSCG_FunctionsWithDI",description:"Generating functions that have parameters from services",source:"@site/docs/RSCG-Examples/RSCG_FunctionsWithDI.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_FunctionsWithDI",permalink:"/RSCG_Examples/v2/docs/RSCG_FunctionsWithDI",draft:!1,tags:[],version:"current",sidebarPosition:220,frontMatter:{sidebar_position:220,title:"22 - RSCG_FunctionsWithDI",description:"Generating functions that have parameters from services",slug:"/RSCG_FunctionsWithDI"},sidebar:"tutorialSidebar",previous:{title:"21 - Microsoft.Interop.JavaScript.JSImportGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},next:{title:"23 - Microsoft.NET.Sdk.Razor.SourceGenerators",permalink:"/RSCG_Examples/v2/docs/Microsoft.NET.Sdk.Razor.SourceGenerators"}},p={},m=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share RSCG_FunctionsWithDI",id:"share-rscg_functionswithdi",level:3},{value:"In the same category (EnhancementProject)",id:"in-the-same-category-enhancementproject",level:2},{value:"Com",id:"com",level:3},{value:"DeeDee",id:"deedee",level:3},{value:"Matryoshki",id:"matryoshki",level:3},{value:"Mediator",id:"mediator",level:3},{value:"ProxyGen",id:"proxygen",level:3},{value:"RSCG_AMS",id:"rscg_ams",level:3},{value:"RSCG_TimeBombComment",id:"rscg_timebombcomment",level:3},{value:"SourceGenerator.Helper.CopyCode",id:"sourcegeneratorhelpercopycode",level:3},{value:"ThisAssembly",id:"thisassembly",level:3}],h={toc:m},d="wrapper";function I(e){let{components:t,...c}=e;return(0,i.kt)(d,(0,s.Z)({},h,c,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rscg_functionswithdi--by-andrei-ignat"},"RSCG_FunctionsWithDI  by Andrei Ignat"),(0,i.kt)(o.Z,{toc:m,mdxType:"TOCInline"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_FunctionsWithDI/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_FunctionsWithDI?label=RSCG_FunctionsWithDI",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/functionsdi"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/functionsdi?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/functionsdi?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")),(0,i.kt)("p",{parentName:"admonition"},"Generate correct functions from  ","[FromServices]"),(0,i.kt)("p",{parentName:"admonition"},"Author: Andrei Ignat"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/RSCG_FunctionsWithDI/"},"https://www.nuget.org/packages/RSCG_FunctionsWithDI/")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/functionsdi"},"https://github.com/ignatandrei/functionsdi")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/functionsdi"},"https://github.com/ignatandrei/functionsdi"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"functionsdi"},"FunctionsDI"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_FunctionsWithDI"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/RSCG_FunctionsWithDI",alt:"Nuget"}))),(0,i.kt)("p",{parentName:"admonition"},"Generate (constructor) and functions calls similar with ASP.NET Core WebAPI ( ","[FromServices]"," will be provided by DI )\nAlso, verifies for null  ."),(0,i.kt)("h1",{parentName:"admonition",id:"usage-1---generate-constructors-from-methods"},"Usage 1 - generate constructors from methods"),(0,i.kt)("p",{parentName:"admonition"},"Reference into the csproj"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />\n    <PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />\n</ItemGroup>    \n<PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n')),(0,i.kt)("p",{parentName:"admonition"},"Then for every class you can write ","[FromServices]"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"using RSCG_FunctionsWithDI_Base;\n//namespace if necessary\npublic partial class TestDIFunction\n{\n    public bool TestMyFunc1([FromServices] TestDI1 t1, [FromServices] TestDI2 t2, int x, int y)\n    {\n        return true;\n    }\n    //more functions\n}\n")),(0,i.kt)("p",{parentName:"admonition"},"generates the constructor with needed details "),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'\npublic partial class TestDIFunction\n{ \nprivate TestDI1 _TestDI1;\nprivate TestDI2 _TestDI2;\npublic TestDIFunction  (TestDI1 _TestDI1,TestDI2 _TestDI2) //constructor generated with needed DI\n { \nthis._TestDI1=_TestDI1;\nthis._TestDI2=_TestDI2;\n\n } //end constructor \n\n//making call to TestMyFunc1\npublic bool TestMyFunc1(int  x,int  y){ \nvar t1 = this._TestDI1  ;\nif(t1 == null) throw new ArgumentException(" service TestDI1  is null in TestDIFunction ");\nvar t2 = this._TestDI2  ;\nif(t2 == null) throw new ArgumentException(" service TestDI2  is null in TestDIFunction ");\nreturn  TestMyFunc1(t1,t2,x,y);\n}\n\n')),(0,i.kt)("p",{parentName:"admonition"},"so you can call "),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"\nvar test=serviceProvider.GetService<TestDIFunction>();\nConsole.WriteLine(test.TestMyFunc1(10,3)); // calling without the [FromServices] arguments\n\n")),(0,i.kt)("h1",{parentName:"admonition",id:"usage-2---generate-constructors-from-fields--constructors"},"Usage 2 - generate constructors from fields / constructors"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />\n    <PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />\n</ItemGroup>    \n<PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n')),(0,i.kt)("p",{parentName:"admonition"},"Assuming this classes, that you want to keep a minimum of parameters constructors "),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"public partial class TestDIFunctionAdvWithConstructor\n    {\n        [RSCG_FunctionsWithDI_Base.FromServices]\n        private TestDI1 NewTestDI1;\n\n        [RSCG_FunctionsWithDI_Base.FromServices]\n        public TestDI2 NewTestDI2 { get; set; }\n\n        public readonly TestDI3 myTestDI3;\n\n        private TestDIFunctionAdvWithConstructor(TestDI3 test)\n        {\n            myTestDI3= test;\n        }\n        \n    }\n    public partial class TestDIFunctionAdvNoConstructor\n    {\n        [RSCG_FunctionsWithDI_Base.FromServices]\n        public TestDI1 NewTestDI1;\n\n        [RSCG_FunctionsWithDI_Base.FromServices]\n        private TestDI2 NewTestDI2 { get; set; }\n\n\n\n\n    }\n")),(0,i.kt)("p",{parentName:"admonition"},"the generator will generate "),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"namespace TestFunctionsWithDI\n\n{ \npublic partial class TestDIFunctionAdvNoConstructor\n{ \npublic TestDIFunctionAdvNoConstructor( TestDI1 _NewTestDI1,TestDI2 _NewTestDI2 ) \n{ \nthis.NewTestDI1 = _NewTestDI1; \nthis.NewTestDI2 = _NewTestDI2; \n}//end constructor \n\n }//class\n }//namespace\n\n\nnamespace TestFunctionsWithDI\n\n{ \npublic partial class TestDIFunctionAdvWithConstructor\n{ \npublic TestDIFunctionAdvWithConstructor(TestDI3 test, TestDI1 _NewTestDI1, TestDI2 _NewTestDI2) : this (test) \n{ \nthis.NewTestDI1 = _NewTestDI1; \nthis.NewTestDI2 = _NewTestDI2; \n}//end constructor \n\n }//class\n }//namespace\n")),(0,i.kt)("p",{parentName:"admonition"},"Enjoy!")),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Generating functions that have parameters from services")),(0,i.kt)("h2",{id:"how-to-use"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(a.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n<ItemGroup>\n        <PackageReference Include="RSCG_FunctionsWithDI" Version="2022.7.7.636" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />\n        <PackageReference Include="RSCG_FunctionsWithDI_Base" Version="2022.7.7.636" />\n    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />\n\n\n\n</ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n</Project>\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_FunctionsWithDI\\src\\RSCG_FunctionsWithDIDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// See https://aka.ms/new-console-template for more information\nusing Microsoft.Extensions.DependencyInjection;\nusing RSCG_FunctionsWithDIDemo;\nvar services = new ServiceCollection();\nservices.AddSingleton<TestDIMyClass>();\nservices.AddSingleton<TestDI1>();\nservices.AddSingleton<TestDI2>();\nvar serviceProvider = services.BuildServiceProvider();\nvar test = serviceProvider.GetRequiredService<TestDIMyClass>();\nConsole.WriteLine("the TestMyFunc1 is not called with [FromServices] parameters " +test.TestMyFunc1(10, 3));\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_FunctionsWithDI\\src\\RSCG_FunctionsWithDIDemo\\TestDI1.cs",label:"TestDI1.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")," in ",(0,i.kt)("em",{parentName:"p"},"TestDI1.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace RSCG_FunctionsWithDIDemo;\n\npublic class TestDI1\n{\n    public int x;\n}\n\n"))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_FunctionsWithDI\\src\\RSCG_FunctionsWithDIDemo\\TestDI2.cs",label:"TestDI2.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")," in ",(0,i.kt)("em",{parentName:"p"},"TestDI2.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace RSCG_FunctionsWithDIDemo;\n\npublic class TestDI2\n{\n    public int x;\n}\n\n"))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_FunctionsWithDI\\src\\RSCG_FunctionsWithDIDemo\\TestDIMyClass.cs",label:"TestDIMyClass.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_FunctionsWithDI")," in ",(0,i.kt)("em",{parentName:"p"},"TestDIMyClass.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using RSCG_FunctionsWithDI_Base;\n\nnamespace RSCG_FunctionsWithDIDemo;\npublic partial class TestDIMyClass\n{\n\n    public bool TestMyFunc1([FromServices] TestDI1 t1, [FromServices] TestDI2 t2, int x, int y)\n    {\n        return true;\n    }\n}\n")))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(a.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_FunctionsWithDI\\src\\RSCG_FunctionsWithDIDemo\\obj\\GX\\RSCG_FunctionsWithDI\\RSCG_FunctionsWithDI.DIGenerator\\TestDIMyClass_gen_methods.cs",label:"TestDIMyClass_gen_methods.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace RSCG_FunctionsWithDIDemo\n{ \npublic partial class TestDIMyClass\n{ \nprivate TestDI1 _TestDI1;\nprivate TestDI2 _TestDI2;\npublic TestDIMyClass  \n\n(TestDI1 _TestDI1,TestDI2 _TestDI2)\n { \nthis._TestDI1=_TestDI1;\nthis._TestDI2=_TestDI2;\n\n } //end constructor \n\n//making call to TestMyFunc1\npublic bool TestMyFunc1(int  x,int  y){ \nvar t1 = this._TestDI1  ;\nif(t1 == null) throw new ArgumentException(" service TestDI1  is null in TestDIMyClass ");\nvar t2 = this._TestDI2  ;\nif(t2 == null) throw new ArgumentException(" service TestDI2  is null in TestDIMyClass ");\nreturn  TestMyFunc1(t1,t2,x,y);\n}\n\n }//class\n }//namespace\n')))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:n(64446).Z},"Download Example project RSCG_FunctionsWithDI "))),(0,i.kt)("h3",{id:"share-rscg_functionswithdi"},"Share RSCG_FunctionsWithDI"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&quote=RSCG_FunctionsWithDI",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&text=RSCG_FunctionsWithDI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI&title=RSCG_FunctionsWithDI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_FunctionsWithDI",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_FunctionsWithDI"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_FunctionsWithDI")),(0,i.kt)("h2",{id:"in-the-same-category-enhancementproject"},"In the same category (EnhancementProject)"),(0,i.kt)("h3",{id:"com"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Com"},"Com")),(0,i.kt)("h3",{id:"deedee"},(0,i.kt)("a",{parentName:"h3",href:"/docs/DeeDee"},"DeeDee")),(0,i.kt)("h3",{id:"matryoshki"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Matryoshki"},"Matryoshki")),(0,i.kt)("h3",{id:"mediator"},(0,i.kt)("a",{parentName:"h3",href:"/docs/Mediator"},"Mediator")),(0,i.kt)("h3",{id:"proxygen"},(0,i.kt)("a",{parentName:"h3",href:"/docs/ProxyGen"},"ProxyGen")),(0,i.kt)("h3",{id:"rscg_ams"},(0,i.kt)("a",{parentName:"h3",href:"/docs/RSCG_AMS"},"RSCG_AMS")),(0,i.kt)("h3",{id:"rscg_timebombcomment"},(0,i.kt)("a",{parentName:"h3",href:"/docs/RSCG_TimeBombComment"},"RSCG_TimeBombComment")),(0,i.kt)("h3",{id:"sourcegeneratorhelpercopycode"},(0,i.kt)("a",{parentName:"h3",href:"/docs/SourceGenerator.Helper.CopyCode"},"SourceGenerator.Helper.CopyCode")),(0,i.kt)("h3",{id:"thisassembly"},(0,i.kt)("a",{parentName:"h3",href:"/docs/ThisAssembly"},"ThisAssembly")))}I.isMDXComponent=!0},64446:(e,t,n)=>{n.d(t,{Z:()=>s});const s=n.p+"assets/files/RSCG_FunctionsWithDI-215476ff441abee209e229df43f09cd4.zip"}}]);