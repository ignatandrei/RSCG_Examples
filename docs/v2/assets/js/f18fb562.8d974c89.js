"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2963],{10505:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>m,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var a=n(87462),i=(n(67294),n(3905)),o=n(73992),r=n(18679),s=n(68839);const l={sidebar_position:570,title:"57 - RSCG_Utils_Memo",description:"Memo the function result",slug:"/RSCG_Utils_Memo"},m="RSCG_Utils_Memo  by Ignat Andrei",c={unversionedId:"RSCG-Examples/RSCG_Utils_Memo",id:"RSCG-Examples/RSCG_Utils_Memo",title:"57 - RSCG_Utils_Memo",description:"Memo the function result",source:"@site/docs/RSCG-Examples/RSCG_Utils_Memo.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_Utils_Memo",permalink:"/RSCG_Examples/v2/docs/RSCG_Utils_Memo",draft:!1,tags:[],version:"current",sidebarPosition:570,frontMatter:{sidebar_position:570,title:"57 - RSCG_Utils_Memo",description:"Memo the function result",slug:"/RSCG_Utils_Memo"},sidebar:"tutorialSidebar",previous:{title:"56 - Roozie.AutoInterface",permalink:"/RSCG_Examples/v2/docs/Roozie.AutoInterface"},next:{title:"58 - ThisAssembly_Resources",permalink:"/RSCG_Examples/v2/docs/ThisAssembly_Resources"}},u={},p=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share RSCG_Utils_Memo",id:"share-rscg_utils_memo",level:3},{value:"In the same category (FunctionalProgramming) - 8 other generators",id:"in-the-same-category-functionalprogramming---8-other-generators",level:3},{value:"cachesourcegenerator",id:"cachesourcegenerator",level:4},{value:"dunet",id:"dunet",level:4},{value:"Funcky.DiscriminatedUnion",id:"funckydiscriminatedunion",level:4},{value:"FunicularSwitch",id:"funicularswitch",level:4},{value:"N.SourceGenerators.UnionTypes",id:"nsourcegeneratorsuniontypes",level:4},{value:"OneOf",id:"oneof",level:4},{value:"PartiallyApplied",id:"partiallyapplied",level:4},{value:"UnionsGenerator",id:"unionsgenerator",level:4}],d={toc:p},g="wrapper";function h(e){let{components:t,...l}=e;return(0,i.kt)(g,(0,a.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rscg_utils_memo--by-ignat-andrei"},"RSCG_Utils_Memo  by Ignat Andrei"),(0,i.kt)(s.Z,{toc:p,mdxType:"TOCInline"}),(0,i.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/rscgutils"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/rscgutils?label=rscgutils",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Utils"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/RSCG_Utils?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/RSCG_Utils?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Utils_Memo")),(0,i.kt)("p",{parentName:"admonition"},"Additional files as strings"),(0,i.kt)("p",{parentName:"admonition"},"Author: Ignat Andrei"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/rscgutils"},"https://www.nuget.org/packages/rscgutils")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation"},"https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Utils"},"https://github.com/ignatandrei/RSCG_Utils"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"rscg_utils"},"RSCG_Utils"),(0,i.kt)("p",{parentName:"admonition"},"Roslyn Source Code Generators Utils"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml"},(0,i.kt)("img",{parentName:"a",src:"https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml/badge.svg",alt:"pack to nuget"}))),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/rscgutils"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/rscgutils?style=for-the-badge",alt:"pack to nuget"}))),(0,i.kt)("h1",{parentName:"admonition",id:"usage"},"Usage"),(0,i.kt)("h2",{parentName:"admonition",id:"additional-files"},"Additional Files"),(0,i.kt)("p",{parentName:"admonition"},"Allow you to see additional files directly as C# const. For this, please add some .gen. files to the project."),(0,i.kt)("p",{parentName:"admonition"},"In your csproj"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n      <PackageReference Include="rscgutils" Version="2023.502.835" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />\n</ItemGroup>\n<ItemGroup>\n    <AdditionalFiles Include="Second.gen.txt" />\n    <AdditionalFiles Include="first.gen.txt" />\n    <AdditionalFiles Include="test\\Afirst.gen.txt" />\n    <AdditionalFiles Include="sql/**/*" />\n</ItemGroup>\n')),(0,i.kt)("p",{parentName:"admonition"},"In the code"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"//see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string\nstring x= MyAdditionalFiles.Second_gen_txt;\n")),(0,i.kt)("p",{parentName:"admonition"},"To debug, you can add into the .csproj"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},"<PropertyGroup>\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GeneratedX</CompilerGeneratedFilesOutputPath>\n</PropertyGroup>\n")),(0,i.kt)("p",{parentName:"admonition"},"More details at ",(0,i.kt)("a",{parentName:"p",href:"http://msprogrammer.serviciipeweb.ro/2023/05/08/file-to-csharp-const/"},"http://msprogrammer.serviciipeweb.ro/2023/05/08/file-to-csharp-const/")),(0,i.kt)("h2",{parentName:"admonition",id:"json2class"},"Json2Class"),(0,i.kt)("p",{parentName:"admonition"},"If you have an additional json file, you can have a file from this"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <AdditionalFiles Include="my.gen.json" />\n</ItemGroup>\n')),(0,i.kt)("p",{parentName:"admonition"},"And you can have from the code"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'\nvar json = System.Text.Json.JsonSerializer\n    .Deserialize<GeneratedJson.my_gen_json>(MyAdditionalFiles.my_gen_json);\n\nArgumentNullException.ThrowIfNull( json );\nConsole.WriteLine( ":hosts"+json.AllowedHosts );\n\n')),(0,i.kt)("h2",{parentName:"admonition",id:"memoization-of-function-returns"},"Memoization of function returns"),(0,i.kt)("p",{parentName:"admonition"},"Put _MemoPure and the return of the function will be memo-ized"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'public long Test_MemoPure()\n{\n    Console.WriteLine("calculating type");\n    return this.GetType().ToString().GetHashCode();\n}\npublic async Task<long> fib(long nr)\n{\n    await Task.Delay(1000);\n    //Console.WriteLine("calculated value for " + nr);\n    if (nr <= 1) return 1;\n    if (nr == 2) return 2;\n    return await fib(nr - 1) + await fib(nr - 1);\n}\n\npublic async Task<long> fibonacci_MemoPure(long nr)\n{\n    if (nr <= 1) return 1;\n    if (nr == 2) return 2;\n    await Task.Delay(1000);\n    return await fibonacci(nr - 1) + await fibonacci(nr - 1);\n\n}\n')),(0,i.kt)("p",{parentName:"admonition"},"And call"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'fibTest f = new();\nConsole.WriteLine("first time :" + f.Test());\nConsole.WriteLine("second time :" + f.Test());\n\nConsole.WriteLine(DateTime.Now.ToString("mm_ss"));\nConsole.WriteLine("no memo :"+await f.fib(5));\nConsole.WriteLine(DateTime.Now.ToString("mm_ss"));\nConsole.WriteLine("memo :" + await f.fibonacci(5));\nConsole.WriteLine(DateTime.Now.ToString("mm_ss"));\nConsole.WriteLine("FAST memo :" + await f.fibonacci(5));\nConsole.WriteLine(DateTime.Now.ToString("mm_ss"));\n\n\n')),(0,i.kt)("h1",{parentName:"admonition",id:"more-roslyn-source-code-generators"},"More Roslyn Source Code Generators"),(0,i.kt)("p",{parentName:"admonition"},"You can find more RSCG with examples at ",(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/"},"Roslyn Source Code Generators"))),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Memo the function result")),(0,i.kt)("h2",{id:"how-to-use"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Utils_Memo")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="rscgutils" Version="2023.914.2016" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Memo\\src\\DemoRSCG_UtilsMemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Utils_Memo")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using DemoRSCG_UtilsMemo;\n\nfibTest f = new();\nConsole.Write("start calculating, see output");\nConsole.WriteLine("first time result:" + f.Test());\nConsole.WriteLine("memo, no output");\nConsole.WriteLine("second time result:" + f.Test());\nvar dt = DateTime.Now;\nConsole.WriteLine("no memo :" + await f.fib(5) );\nConsole.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));\ndt = DateTime.Now;\nConsole.WriteLine("memo :" + await f.fibonacci(5));\nConsole.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));\ndt = DateTime.Now;\nConsole.WriteLine("FAST memo :" + await f.fibonacci(5));\nConsole.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));\n\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Memo\\src\\DemoRSCG_UtilsMemo\\fib.cs",label:"fib.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"RSCG_Utils_Memo")," in ",(0,i.kt)("em",{parentName:"p"},"fib.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace DemoRSCG_UtilsMemo;\n\ninternal partial class fibTest\n{\n    public long Test_MemoPure()\n    {\n        Console.WriteLine("calculating type");\n        return this.GetType().ToString().GetHashCode();\n    }\n    public async Task<long> fib(long nr)\n    {\n        await Task.Delay(1000);\n        //Console.WriteLine("calculated value for " + nr);\n        if (nr <= 1) return 1;\n        if (nr == 2) return 2;\n        return await fib(nr - 1) + await fib(nr - 1);\n    }\n\n    public async Task<long> fibonacci_MemoPure(long nr)\n    {\n        if (nr <= 1) return 1;\n        if (nr == 2) return 2;\n        await Task.Delay(1000);\n        return await fibonacci(nr - 1) + await fibonacci(nr - 1);\n\n    }\n}\n\n')))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Memo\\src\\DemoRSCG_UtilsMemo\\obj\\GX\\RSCG_Utils\\RSCG_Utils.UtilsGenerator\\DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.cs",label:"DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System.Collections.Concurrent;\n\n//this is auto-generated by a tool\nnamespace DemoRSCG_UtilsMemo;\npartial class fibTest \n{\n    \n    System.Collections.Concurrent.ConcurrentDictionary<Tuple<long > , long> __cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure =new System.Collections.Concurrent.ConcurrentDictionary<Tuple<long >, long>();\n    //True \n    public async Task<long>  fibonacci (long nr ){\n        var key= Tuple.Create(nr);\n        if (__cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.TryGetValue(key, out var result)) return result;\n        //Console.WriteLine($"not in cache, calculating {key}");\n        var data= await __wrap_fibonacci(key);\n        return __cache_DemoRSCG_UtilsMemo_fibTest_fibonacci_MemoPure.GetOrAdd(key,data);\n    }\n    public async Task<long>  __wrap_fibonacci (Tuple<long > args){\n        return await fibonacci_MemoPure (args.Item1);\n    }\n    \n}\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\Memo\\src\\DemoRSCG_UtilsMemo\\obj\\GX\\RSCG_Utils\\RSCG_Utils.UtilsGenerator\\DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.cs",label:"DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System.Collections.Concurrent;\n\n//this is auto-generated by a tool\nnamespace DemoRSCG_UtilsMemo;\npartial class fibTest \n{\n    \n    System.Collections.Concurrent.ConcurrentDictionary<string , long > __cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure =new System.Collections.Concurrent.ConcurrentDictionary<string, long >();\n    //False \n    public  long  Test ( ){\n        var key= string.Empty;\n        if (__cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.TryGetValue(key, out var result)) return result;\n        //Console.WriteLine($"not in cache, calculating {key}");\n        var data=  __wrap_Test(key);\n        return __cache_DemoRSCG_UtilsMemo_fibTest_Test_MemoPure.GetOrAdd(key,data);\n    }\n    public  long  __wrap_Test (string args){\n        return  Test_MemoPure ();\n    }\n    \n}\n\n')))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:n(95343).Z},"Download Example project RSCG_Utils_Memo "))),(0,i.kt)("h3",{id:"share-rscg_utils_memo"},"Share RSCG_Utils_Memo"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&quote=RSCG_Utils_Memo",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&text=RSCG_Utils_Memo:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&title=RSCG_Utils_Memo",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo&title=RSCG_Utils_Memo&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils_Memo",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Utils_Memo"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Utils_Memo")),(0,i.kt)("h3",{id:"in-the-same-category-functionalprogramming---8-other-generators"},"In the same category (FunctionalProgramming) - 8 other generators"),(0,i.kt)("h4",{id:"cachesourcegenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/cachesourcegenerator"},"cachesourcegenerator")),(0,i.kt)("h4",{id:"dunet"},(0,i.kt)("a",{parentName:"h4",href:"/docs/dunet"},"dunet")),(0,i.kt)("h4",{id:"funckydiscriminatedunion"},(0,i.kt)("a",{parentName:"h4",href:"/docs/Funcky.DiscriminatedUnion"},"Funcky.DiscriminatedUnion")),(0,i.kt)("h4",{id:"funicularswitch"},(0,i.kt)("a",{parentName:"h4",href:"/docs/FunicularSwitch"},"FunicularSwitch")),(0,i.kt)("h4",{id:"nsourcegeneratorsuniontypes"},(0,i.kt)("a",{parentName:"h4",href:"/docs/N.SourceGenerators.UnionTypes"},"N.SourceGenerators.UnionTypes")),(0,i.kt)("h4",{id:"oneof"},(0,i.kt)("a",{parentName:"h4",href:"/docs/OneOf"},"OneOf")),(0,i.kt)("h4",{id:"partiallyapplied"},(0,i.kt)("a",{parentName:"h4",href:"/docs/PartiallyApplied"},"PartiallyApplied")),(0,i.kt)("h4",{id:"unionsgenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/UnionsGenerator"},"UnionsGenerator")))}h.isMDXComponent=!0},95343:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/RSCG_Utils_Memo-23a1c2b50ced11991f2fdb4082691515.zip"}}]);