"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[6053],{46250:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>m,default:()=>k,frontMatter:()=>l,metadata:()=>d,toc:()=>u});var n=a(87462),o=(a(67294),a(3905)),r=a(73992),i=a(18679),s=a(68839);const l={sidebar_position:1250,title:"125 - AutoInvoke.Generator",description:"Finding all implementation of an interface/class and invoke them.",slug:"/AutoInvoke.Generator"},m="AutoInvoke.Generator  by Patrick Kranz",d={unversionedId:"RSCG-Examples/AutoInvoke.Generator",id:"RSCG-Examples/AutoInvoke.Generator",title:"125 - AutoInvoke.Generator",description:"Finding all implementation of an interface/class and invoke them.",source:"@site/docs/RSCG-Examples/AutoInvoke.Generator.md",sourceDirName:"RSCG-Examples",slug:"/AutoInvoke.Generator",permalink:"/RSCG_Examples/v2/docs/AutoInvoke.Generator",draft:!1,tags:[],version:"current",sidebarPosition:1250,frontMatter:{sidebar_position:1250,title:"125 - AutoInvoke.Generator",description:"Finding all implementation of an interface/class and invoke them.",slug:"/AutoInvoke.Generator"},sidebar:"tutorialSidebar",previous:{title:"124 - Architect.DomainModeling",permalink:"/RSCG_Examples/v2/docs/Architect.DomainModeling"},next:{title:"126 - LinqGen.Generator",permalink:"/RSCG_Examples/v2/docs/LinqGen.Generator"}},p={},u=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share AutoInvoke.Generator",id:"share-autoinvokegenerator",level:3},{value:"In the same category (EnhancementProject) - 17 other generators",id:"in-the-same-category-enhancementproject---17-other-generators",level:3},{value:"AutoSpectre",id:"autospectre",level:4},{value:"BuildInfo",id:"buildinfo",level:4},{value:"Com",id:"com",level:4},{value:"CommandLine",id:"commandline",level:4},{value:"DeeDee",id:"deedee",level:4},{value:"LinqGen.Generator",id:"linqgengenerator",level:4},{value:"Mediator",id:"mediator",level:4},{value:"Pekspro.BuildInformationGenerator",id:"peksprobuildinformationgenerator",level:4},{value:"PlantUmlClassDiagramGenerator",id:"plantumlclassdiagramgenerator",level:4},{value:"RSCG_AMS",id:"rscg_ams",level:4},{value:"RSCG_ExportDiagram",id:"rscg_exportdiagram",level:4},{value:"RSCG_FunctionsWithDI",id:"rscg_functionswithdi",level:4},{value:"RSCG_TimeBombComment",id:"rscg_timebombcomment",level:4},{value:"RSCG_Wait",id:"rscg_wait",level:4},{value:"ThisAssembly",id:"thisassembly",level:4},{value:"ThisAssembly.Constants",id:"thisassemblyconstants",level:4},{value:"ThisAssembly.Metadata",id:"thisassemblymetadata",level:4}],c={toc:u},h="wrapper";function k(e){let{components:t,...l}=e;return(0,o.kt)(h,(0,n.Z)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"autoinvokegenerator--by-patrick-kranz"},"AutoInvoke.Generator  by Patrick Kranz"),(0,o.kt)(s.Z,{toc:u,mdxType:"TOCInline"}),(0,o.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AutoInvoke.Generator/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/AutoInvoke.Generator?label=AutoInvoke.Generator",alt:"Nuget"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/LokiMidgard/AutoInvoke.Generator"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/LokiMidgard/AutoInvoke.Generator?label=updated",alt:"GitHub last commit"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/LokiMidgard/AutoInvoke.Generator?style=social",alt:"GitHub Repo stars"})),(0,o.kt)("h2",{id:"details"},"Details"),(0,o.kt)("h3",{id:"info"},"Info"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Name: ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")),(0,o.kt)("p",{parentName:"admonition"},"A generator that invokes a specified Metohd for ever Type in your Project that sattisfis a defined constraint"),(0,o.kt)("p",{parentName:"admonition"},"Author: Patrick Kranz"),(0,o.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,o.kt)("em",{parentName:"p"},(0,o.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/AutoInvoke.Generator/"},"https://www.nuget.org/packages/AutoInvoke.Generator/")),"   "),(0,o.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/LokiMidgard/AutoInvoke.Generator"},"https://github.com/LokiMidgard/AutoInvoke.Generator")),(0,o.kt)("p",{parentName:"admonition"},"Source : ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/LokiMidgard/AutoInvoke.Generator"},"https://github.com/LokiMidgard/AutoInvoke.Generator"))),(0,o.kt)("h3",{id:"original-readme"},"Original Readme"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AutoInvoke.Generator/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/AutoInvoke.Generator.svg?style=flat-square",alt:"NuGet"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://tldrlegal.com/license/mit-license#summary"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/license/LokiMidgard/AutoInvoke.Generator.svg?style=flat-square",alt:"GitHub license"}))),(0,o.kt)("h1",{parentName:"admonition",id:"autoinvoke"},"AutoInvoke"),(0,o.kt)("p",{parentName:"admonition"},"This Generator let you anotate an Parameterless Generic Method with exactly one TypeArgument."),(0,o.kt)("p",{parentName:"admonition"},"It will then generate a method with the same name and no type arguments that calls your anotated\nmethod for every (non static) Type decleared in your project, that satisfies the type constraints."),(0,o.kt)("h2",{parentName:"admonition",id:"sample"},"Sample"),(0,o.kt)("p",{parentName:"admonition"},"Assume you have the following Interface:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},"internal interface IFileLoder {\n    public abstract static IFileLoder Init(string path);\n    public abstract static string FileExtension { get; }\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"This describes a File loader for different types in our project."),(0,o.kt)("p",{parentName:"admonition"},"And following implementation: "),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},'internal class AudioLoader : IFileLoder {\n    public static string FileExtension => ".mp3";\n\n    public static IFileLoder Init(string Path) {\n        return new AudioLoader(path);\n    }\n    // the rest of the code...\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"Which defines how we want to load mp3 files."),(0,o.kt)("p",{parentName:"admonition"},"We now want to automaticly get a list of all ",(0,o.kt)("inlineCode",{parentName:"p"},"IFileLoader")," so we know what files we can handle,\nand we do not want to manualy handel such a list. "),(0,o.kt)("p",{parentName:"admonition"},"An Implementation could look like this:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},"internal delegate IFileLoder LoadFile(string path);\ninternal partial class FileHandler {\n    private readonly Dictionary<string, LoadFile> loaders = new();\n\n    public FileHandler() {\n        LoadLoaders();\n    }\n\n    public void LoadFile(string file) {\n        if (loaders.TryGetValue(Path.GetExtension(file), out var loaderFactory)) {\n            var loader = loaderFactory(file);\n            // use loader to do things\n        }\n    }\n\n\n    [AutoInvoke.Generator.FindAndInvoke]\n    public void LoadLoaders<T>() where T : IFileLoder {\n        this.loaders.Add(T.FileExtension, T.Init);\n    }\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"The field loaders will have all extensions our code can handle, and has to every extension\nthe corresponding ",(0,o.kt)("inlineCode",{parentName:"p"},"Init"),"-Method."),(0,o.kt)("p",{parentName:"admonition"},"The Generated code will look like this:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},"partial class FileHandler {\n    private void LoadLoaders() {\n        LoadLoaders<AutoInvoke.Generator.Example.AudioLoader>();\n    }\n}\n")),(0,o.kt)("h2",{parentName:"admonition",id:"featurs-and-limitations"},"Featurs and limitations"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"You can control wich type of types shold get called. E.g. by\ndefault no calls are generated for abstract classes or types defined in referenced Assemblys. But you can overide this setting"),(0,o.kt)("li",{parentName:"ul"},"The anotated method can be static"),(0,o.kt)("li",{parentName:"ul"},"If the anotated method has parameters the generated method has the same parametrs"),(0,o.kt)("li",{parentName:"ul"},"If the return type is not ",(0,o.kt)("inlineCode",{parentName:"li"},"void")," the generated methods returntype is an array of the return type of the attributed method")),(0,o.kt)("h3",{parentName:"admonition",id:"limitations"},"Limitations"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"When using multiple Type Parameters, one Type Parameter must contain all others (transitiv) like ",(0,o.kt)("inlineCode",{parentName:"li"},"Foo<T1, T2, T3>() where T1: IComparable<T2> where T2 : IComparable<T3>")),(0,o.kt)("li",{parentName:"ul"},"You can't call static Types. Generics do not allow this."))),(0,o.kt)("h3",{id:"about"},"About"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Finding all implementation of an interface/class and invoke them.")),(0,o.kt)("h2",{id:"how-to-use"},"How to use"),(0,o.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,o.kt)("p",null,"This is the CSharp Project that references ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="AutoInvoke.Generator" Version="0.0.9">\n      <PrivateAssets>all</PrivateAssets>\n      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>\n    </PackageReference>\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n</Project>\n\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")," in ",(0,o.kt)("em",{parentName:"p"},"Program.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using AutoAdd;\n\nRemoteCollection rc=new();\nforeach(var item in rc.loaders)\n{\n    item.Execute();\n}\n\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\RemoteCollection.cs",label:"RemoteCollection.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")," in ",(0,o.kt)("em",{parentName:"p"},"RemoteCollection.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"\nnamespace AutoAdd;\npartial class RemoteCollection\n{\n    public List<IRemoteCommand> loaders = new ();\n\n    public RemoteCollection()\n    {\n        LoadLoaders();\n    }\n    [AutoInvoke.FindAndInvoke]\n    public void LoadLoaders<T>() where T : IRemoteCommand,new()\n    {\n        loaders.Add(new T());\n    }\n    \n}\n\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\PCRemote.cs",label:"PCRemote.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")," in ",(0,o.kt)("em",{parentName:"p"},"PCRemote.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\nnamespace AutoAdd;\ninternal class PCRemote : IRemoteCommand\n{\n    public void Execute()\n    {\n        Console.WriteLine("start PC");\n    }\n}\n\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\TVRemote.cs",label:"TVRemote.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoInvoke.Generator")," in ",(0,o.kt)("em",{parentName:"p"},"TVRemote.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\nnamespace AutoAdd;\ninternal class TVRemote : IRemoteCommand\n{\n    public void Execute()\n    {\n        Console.WriteLine("start TV");\n    }\n}\n\n')))),(0,o.kt)("h3",{id:"generated-files"},"Generated Files"),(0,o.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\obj\\GX\\AutoInvoke.Generator\\AutoInvoke.Generator.InvokeGenerator\\attribute.g.cs",label:"attribute.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n#nullable enable\n\nnamespace AutoInvoke;\n[System.AttributeUsage(System.AttributeTargets.Method, Inherited = false, AllowMultiple = true)]\n[System.Diagnostics.Conditional("AutoNotifyGenerator_DEBUG")]\ninternal sealed class FindAndInvokeAttribute : System.Attribute\n{\n#pragma warning disable CS0169 // Remove unused parameter\n\n#pragma warning disable IDE0060 // Remove unused parameter\n\n#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.\n\n    public FindAndInvokeAttribute()\n    {\n    }\n\n    public FindAndInvokeAttribute(string pattern)\n    {\n    }\n\n    public bool ScanExternalAssamblies { get; set; }\n    public string MethodName { get; set; }\n    public bool CallForAbstractClasses { get; set; }\n    public bool CallForInterfaces { get; set; }\n    public bool CallForStructs { get; set; }\n    public bool CallForClasses { get; set; }\n    public bool CallForRecords { get; set; }\n#pragma warning restore CS0169 // Remove unused parameter\n\n#pragma warning restore IDE0060 // Remove unused parameter\n\n#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.\n\n}\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoInvoke.Generator\\src\\AutoAdd\\obj\\GX\\AutoInvoke.Generator\\AutoInvoke.Generator.InvokeGenerator\\AutoAdd.class.LoadLoaders.g.cs",label:"AutoAdd.class.LoadLoaders.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n#nullable enable\nnamespace AutoAdd;\npartial class RemoteCollection {\n    private void LoadLoaders() {\n        LoadLoaders<global::AutoAdd.PCRemote>();\n        LoadLoaders<global::AutoAdd.TVRemote>();\n    }\n}\n\n")))),(0,o.kt)("h2",{id:"usefull"},"Usefull"),(0,o.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{target:"_blank",href:a(84064).Z},"Download Example project AutoInvoke.Generator "))),(0,o.kt)("h3",{id:"share-autoinvokegenerator"},"Share AutoInvoke.Generator"),(0,o.kt)("ul",null,(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&quote=AutoInvoke.Generator",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&text=AutoInvoke.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&title=AutoInvoke.Generator",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator&title=AutoInvoke.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoInvoke.Generator",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoInvoke.Generator"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoInvoke.Generator")),(0,o.kt)("h3",{id:"in-the-same-category-enhancementproject---17-other-generators"},"In the same category (EnhancementProject) - 17 other generators"),(0,o.kt)("h4",{id:"autospectre"},(0,o.kt)("a",{parentName:"h4",href:"/docs/AutoSpectre"},"AutoSpectre")),(0,o.kt)("h4",{id:"buildinfo"},(0,o.kt)("a",{parentName:"h4",href:"/docs/BuildInfo"},"BuildInfo")),(0,o.kt)("h4",{id:"com"},(0,o.kt)("a",{parentName:"h4",href:"/docs/Com"},"Com")),(0,o.kt)("h4",{id:"commandline"},(0,o.kt)("a",{parentName:"h4",href:"/docs/CommandLine"},"CommandLine")),(0,o.kt)("h4",{id:"deedee"},(0,o.kt)("a",{parentName:"h4",href:"/docs/DeeDee"},"DeeDee")),(0,o.kt)("h4",{id:"linqgengenerator"},(0,o.kt)("a",{parentName:"h4",href:"/docs/LinqGen.Generator"},"LinqGen.Generator")),(0,o.kt)("h4",{id:"mediator"},(0,o.kt)("a",{parentName:"h4",href:"/docs/Mediator"},"Mediator")),(0,o.kt)("h4",{id:"peksprobuildinformationgenerator"},(0,o.kt)("a",{parentName:"h4",href:"/docs/Pekspro.BuildInformationGenerator"},"Pekspro.BuildInformationGenerator")),(0,o.kt)("h4",{id:"plantumlclassdiagramgenerator"},(0,o.kt)("a",{parentName:"h4",href:"/docs/PlantUmlClassDiagramGenerator"},"PlantUmlClassDiagramGenerator")),(0,o.kt)("h4",{id:"rscg_ams"},(0,o.kt)("a",{parentName:"h4",href:"/docs/RSCG_AMS"},"RSCG_AMS")),(0,o.kt)("h4",{id:"rscg_exportdiagram"},(0,o.kt)("a",{parentName:"h4",href:"/docs/RSCG_ExportDiagram"},"RSCG_ExportDiagram")),(0,o.kt)("h4",{id:"rscg_functionswithdi"},(0,o.kt)("a",{parentName:"h4",href:"/docs/RSCG_FunctionsWithDI"},"RSCG_FunctionsWithDI")),(0,o.kt)("h4",{id:"rscg_timebombcomment"},(0,o.kt)("a",{parentName:"h4",href:"/docs/RSCG_TimeBombComment"},"RSCG_TimeBombComment")),(0,o.kt)("h4",{id:"rscg_wait"},(0,o.kt)("a",{parentName:"h4",href:"/docs/RSCG_Wait"},"RSCG_Wait")),(0,o.kt)("h4",{id:"thisassembly"},(0,o.kt)("a",{parentName:"h4",href:"/docs/ThisAssembly"},"ThisAssembly")),(0,o.kt)("h4",{id:"thisassemblyconstants"},(0,o.kt)("a",{parentName:"h4",href:"/docs/ThisAssembly.Constants"},"ThisAssembly.Constants")),(0,o.kt)("h4",{id:"thisassemblymetadata"},(0,o.kt)("a",{parentName:"h4",href:"/docs/ThisAssembly.Metadata"},"ThisAssembly.Metadata")))}k.isMDXComponent=!0},84064:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/AutoInvoke.Generator-ba3bd2c7dc206cd72537b42ac9aa105c.zip"}}]);