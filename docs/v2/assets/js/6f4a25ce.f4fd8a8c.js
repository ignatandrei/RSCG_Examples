"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[9952],{28729:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>N,frontMatter:()=>s,metadata:()=>m,toc:()=>u});var a=n(87462),r=(n(67294),n(3905)),o=n(73992),p=n(18679),i=n(68839);const s={sidebar_position:460,title:"46 - NextGenMapper",description:"Automating generating mapping between classes",slug:"/NextGenMapper"},l="NextGenMapper  by Anton Ryabchikov",m={unversionedId:"RSCG-Examples/NextGenMapper",id:"RSCG-Examples/NextGenMapper",title:"46 - NextGenMapper",description:"Automating generating mapping between classes",source:"@site/docs/RSCG-Examples/NextGenMapper.md",sourceDirName:"RSCG-Examples",slug:"/NextGenMapper",permalink:"/RSCG_Examples/v2/docs/NextGenMapper",draft:!1,tags:[],version:"current",sidebarPosition:460,frontMatter:{sidebar_position:460,title:"46 - NextGenMapper",description:"Automating generating mapping between classes",slug:"/NextGenMapper"},sidebar:"tutorialSidebar",previous:{title:"45 - BenutomoAutomaticDisposeImplSourceGenerator",permalink:"/RSCG_Examples/v2/docs/BenutomoAutomaticDisposeImplSourceGenerator"},next:{title:"47 - Injectio",permalink:"/RSCG_Examples/v2/docs/Injectio"}},c={},u=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share NextGenMapper",id:"share-nextgenmapper",level:3},{value:"In the same category (Mapper)",id:"in-the-same-category-mapper",level:2},{value:"AutoDTO",id:"autodto",level:3},{value:"DynamicsMapper",id:"dynamicsmapper",level:3},{value:"MagicMap",id:"magicmap",level:3},{value:"mapperly",id:"mapperly",level:3},{value:"MapTo",id:"mapto",level:3}],d={toc:u},h="wrapper";function N(e){let{components:t,...s}=e;return(0,r.kt)(h,(0,a.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"nextgenmapper--by-anton-ryabchikov"},"NextGenMapper  by Anton Ryabchikov"),(0,r.kt)(i.Z,{toc:u,mdxType:"TOCInline"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/NextGenMapper/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/NextGenMapper?label=NextGenMapper",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/DedAnton/NextGenMapper"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/DedAnton/NextGenMapper?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/DedAnton/NextGenMapper?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"NextGenMapper")),(0,r.kt)("p",{parentName:"admonition"},"Package Description"),(0,r.kt)("p",{parentName:"admonition"},"Author: Anton Ryabchikov"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/NextGenMapper/"},"https://www.nuget.org/packages/NextGenMapper/")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/DedAnton/NextGenMapper"},"https://github.com/DedAnton/NextGenMapper")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/DedAnton/NextGenMapper"},"https://github.com/DedAnton/NextGenMapper"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"https://user-images.githubusercontent.com/36799941/191375272-27b0034d-0418-44a6-95c6-802b863de2b3.svg",width:"242",height:"242"})),(0,r.kt)("p",{align:"center"},(0,r.kt)("a",{href:"https://opensource.org/licenses/MIT"},(0,r.kt)("img",{src:"https://img.shields.io/badge/License-MIT-yellow.svg",alt:"License: MIT"})),(0,r.kt)("img",{alt:"GitHub release (latest by date including pre-releases)",src:"https://img.shields.io/github/v/release/DedAnton/NextGenMapper?include_prereleases"}),(0,r.kt)("a",{href:"https://vk.com/away.php?utf=1&to=https%3A%2F%2Fwww.tinkoff.ru%2Fcf%2F3ySZ9DEsxfL"},(0,r.kt)("img",{src:"https://img.shields.io/badge/%24-donate-9cf",alt:"donate"})),(0,r.kt)("h4",{align:"center"},"Extremely fast and lightweight minimalistic object mapper generated on the fly")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://user-images.githubusercontent.com/36799941/191618500-31f7e179-3510-49dc-ad13-18e07de8309b.mov"},"https://user-images.githubusercontent.com/36799941/191618500-31f7e179-3510-49dc-ad13-18e07de8309b.mov")),(0,r.kt)("h1",{parentName:"admonition",id:"key-features"},"Key features"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Generation of mapping methods on the fly"),(0,r.kt)("li",{parentName:"ul"},"Reflection and expression trees are not used"),(0,r.kt)("li",{parentName:"ul"},"Performance like a hand-written mapper"),(0,r.kt)("li",{parentName:"ul"},"Minimum memory allocation"),(0,r.kt)("li",{parentName:"ul"},"Does not increase application startup time"),(0,r.kt)("li",{parentName:"ul"},"No dependencies in the final assembly"),(0,r.kt)("li",{parentName:"ul"},"No third party tools and IDE dependencies"),(0,r.kt)("li",{parentName:"ul"},"Static analysis support"),(0,r.kt)("li",{parentName:"ul"},"Code navigation support"),(0,r.kt)("li",{parentName:"ul"},"Easy to debug"),(0,r.kt)("li",{parentName:"ul"},"No attributes and fluid API")),(0,r.kt)("p",{parentName:"admonition"},"NextGenMapper is a tool that just solves a problem and tries not to create new ones"),(0,r.kt)("h1",{parentName:"admonition",id:"usage"},"Usage"),(0,r.kt)("p",{parentName:"admonition"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"using NextGenMapper")," and call the ",(0,r.kt)("inlineCode",{parentName:"p"},"Map")," extension method on the object you want to map"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'using NextGenMapper;\n\nvar source = new Source("Anton", 25);\n\nvar destination = source.Map<Destination>();\n\nConsole.WriteLine(destination);\n\nrecord Source(string Name, int Age);\nrecord Destination(string Name, int Age);\n')),(0,r.kt)("br",null),(0,r.kt)("p",{parentName:"admonition"},"To customize the mapping of certain properties, call the ",(0,r.kt)("inlineCode",{parentName:"p"},"MapWith")," method and pass the value of the overridden property as an argument"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'using NextGenMapper;\n\nvar source = new Source("Anton", "Ryabchikov", 25);\n\nvar destination = source.MapWith<Destination>(name: source.FirstName + \' \' + source.LastName);\n\nConsole.WriteLine(destination);\n\nrecord Source(string FirstName, string LastName, int Age);\nrecord Destination(string Name, int Age);\n')),(0,r.kt)("br",null),(0,r.kt)("p",{parentName:"admonition"},"In order for NextGenMapper to use your mapping when mapping other objects, you need to create a partial class ",(0,r.kt)("inlineCode",{parentName:"p"},"Mapper")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},"NextGenMapper")," namespace and add the ",(0,r.kt)("inlineCode",{parentName:"p"},"Map")," method with your implementation to it"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},"namespace NextGenMapper;\n\ninternal static partial class Mapper\n{\n    internal static Destination Map<To>(this Source source) \n        => source.MapWith<Destination>(name: source.FirstName + ' ' + source.LastName);\n}\n")),(0,r.kt)("br",null),(0,r.kt)("p",{parentName:"admonition"},"The following collection types are currently supported: ",(0,r.kt)("inlineCode",{parentName:"p"},"List<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Array<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ICollection<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IEnumerable<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IList<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IReadOnlyCollection<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IReadOnlyList<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ImmutableArray<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ImmutableList<T>"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"IImmutableList<T>")),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},'var sourceCollection = new List<Source> { new("Anton", 25) };\n\nvar destination = sourceCollection.Map<List<Destination>>();\n')),(0,r.kt)("br",null),(0,r.kt)("p",{parentName:"admonition"},"Enums can also be mapped"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},"var source = Source.EnumValue;\n\nvar destination = source.Map<Destination>();\n")),(0,r.kt)("br",null),(0,r.kt)("p",{parentName:"admonition"},"Projection for IQueryable supported"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c#"},"_dbContext.Users.Project<UserDestination>().ToList();\n")),(0,r.kt)("br",null),(0,r.kt)("blockquote",{parentName:"admonition"},(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),":\nDue to the use of new technology, some versions of Visual Studio can sometimes experience problems with syntax highlighting if IntelliCode says an error, but the solution was build without errors is to simply restart Visual Studio"),(0,r.kt)("h3",{parentName:"blockquote",id:"installation"},"Installation")),(0,r.kt)("p",{parentName:"admonition"},"Install from the package manager console:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"PM> Install-Package NextGenMapper -prerelease\n")),(0,r.kt)("p",{parentName:"admonition"},"Or from the .NET CLI as:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"dotnet add package NextGenMapper --prerelease\n")),(0,r.kt)("h1",{parentName:"admonition",id:"how-it-works"},"How it works?"),(0,r.kt)("p",{parentName:"admonition"},"NextGenMapper uses the new C# language feature - ",(0,r.kt)("a",{parentName:"p",href:"https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/"},"Source Code Generators"),". You can describe the work of the Source Code Generator in the following steps:"),(0,r.kt)("ol",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ol"},"Code compiles"),(0,r.kt)("li",{parentName:"ol"},"The source code generator analyzes the assembly"),(0,r.kt)("li",{parentName:"ol"},"Generates new code based on analysis"),(0,r.kt)("li",{parentName:"ol"},"Compiles the new code and adds it to the assembly")),(0,r.kt)("p",{parentName:"admonition"},"This is how the method that is called initially looks like:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},'internal static To Map<To>(this object source) => throw new InvalidOperationException($""Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function."");\n')),(0,r.kt)("p",{parentName:"admonition"},"When we call it, the generator analyzes this call and generates a mapping function:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-C#"},"internal static Destination Map<To>(this Source source) \n    => new Destination(source.Name, source.Age);\n")),(0,r.kt)("p",{parentName:"admonition"},"The trick is that the method signatures are identical, but the generated method has more specific parameters and fits better, so it is called (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/csharplang/blob/a4c9db9a69ae0d1334ed5675e8faca3b7574c0a1/spec/expressions.md#better-function-member"},"this behavior is described in the specification"),")"),(0,r.kt)("h1",{parentName:"admonition",id:"status"},"Status"),(0,r.kt)("p",{parentName:"admonition"},"At the moment, all the main functionality has been added. But the work isn't over yet."),(0,r.kt)("p",{parentName:"admonition"},"All tasks and their progress can be viewed on the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/users/DedAnton/projects/3"},"project board"))),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Automating generating mapping between classes")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"NextGenMapper")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="NextGenMapper" Version="0.1.0-alpha.13" OutputItemType="Analyzer"  />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"NextGenMapper")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// See https://aka.ms/new-console-template for more information\nusing NextGenMapperDemo;\n\nusing NextGenMapper;\n\n//var source = new Source("Anton", 25);\n\n//var destination = source.Map<Destination>();\n\n//Console.WriteLine(destination);\n\n\n//record Source(string Name, int Age);\n//record Destination(string Name, int Age);\n\nPerson p = new();\np.Name = "Andrei Ignat";\np.Country_Name = "Romania";\n\nvar dto = p.MapWith<PersonDTO>(\n    BirthCountry:new Country()\n    {\n        CountryCode=p.Country_CountryCode,\n        Name=p.Country_Name\n    });\n\n//Name is automatically mapped\nConsole.WriteLine(dto.Name);\nConsole.WriteLine(dto.BirthCountry!.Name);\n\n'))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"NextGenMapper")," in ",(0,r.kt)("em",{parentName:"p"},"Person.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"\nnamespace NextGenMapperDemo;\n\ninternal class Person\n{\n    public int ID { get; set; } \n    public string? Name { get; set; }\n    public string? Country_Name { get; set; }\n    public string? Country_CountryCode { get; set; }\n}\n\n\n\n"))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\PersonDTO.cs",label:"PersonDTO.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"NextGenMapper")," in ",(0,r.kt)("em",{parentName:"p"},"PersonDTO.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"\nnamespace NextGenMapperDemo;\ninternal class Country\n{\n\n    public string? Name { get; set; }\n    public string? CountryCode { get; set; }\n}\ninternal class PersonDTO\n{\n    public int Id { get; set; }\n    public string? Name { get; set; }\n    public Country? BirthCountry { get; set; }\n}\n\n")))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\obj\\GX\\NextGenMapper\\NextGenMapper.MapperGenerator\\MapperExtensions.g.cs",label:"MapperExtensions.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using System;\nusing System.Collections.Generic;\nusing System.Runtime.CompilerServices;\nusing System.Runtime.InteropServices;\n\nnamespace NextGenMapper.Extensions\n{\n    internal static class MapperExtensions\n    {\n        /// <summary>\n        /// Do not use this method, for auto-generated mapper only!\n        /// </summary>\n        [MethodImpl(MethodImplOptions.AggressiveInlining)]\n        public static bool TryGetSpan<TSource>(this IEnumerable<TSource> source, out ReadOnlySpan<TSource> span)\n        {\n            bool result = true;\n            if (source.GetType() == typeof(TSource[]))\n            {\n                span = Unsafe.As<TSource[]>(source);\n            }\n            #if NET5_0_OR_GREATER\n            else if (source.GetType() == typeof(List<TSource>))\n            {\n                span = CollectionsMarshal.AsSpan(Unsafe.As<List<TSource>>(source));\n            }\n            #endif\n            else\n            {\n                span = default;\n                result = false;\n            }\n\n            return result;\n        }\n    }\n}\n"))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\obj\\GX\\NextGenMapper\\NextGenMapper.MapperGenerator\\Mapper_ConfiguredMaps.g.cs",label:"Mapper_ConfiguredMaps.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"#nullable enable\nusing NextGenMapper.Extensions;\n\nnamespace NextGenMapper\n{\n    internal static partial class Mapper\n    {\n        internal static NextGenMapperDemo.PersonDTO MapWith<To>\n        (\n            this NextGenMapperDemo.Person source,\n            NextGenMapperDemo.Country BirthCountry\n        )\n        => new NextGenMapperDemo.PersonDTO\n        {\n            Name = source.Name,\n            BirthCountry = BirthCountry\n        };\n    }\n}\n"))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\obj\\GX\\NextGenMapper\\NextGenMapper.MapperGenerator\\Mapper_ConfiguredMaps_MockMethods.g.cs",label:"Mapper_ConfiguredMaps_MockMethods.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'#nullable enable\nusing NextGenMapper.Extensions;\n\nnamespace NextGenMapper\n{\n    internal static partial class Mapper\n    {\n        internal static NextGenMapperDemo.PersonDTO MapWith<To>\n        (\n            this NextGenMapperDemo.Person source,\n            int Id = default!,\n            string? Name = default!,\n            NextGenMapperDemo.Country? BirthCountry = default!\n        )\n        {\n            throw new System.NotImplementedException("This method is a mock and is not intended to be called");\n        }\n    }\n}\n'))),(0,r.kt)(p.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\NextGenMapper\\src\\NextGenMapperDemo\\obj\\GX\\NextGenMapper\\NextGenMapper.MapperGenerator\\StartMapper.g.cs",label:"StartMapper.g.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System;\nusing System.Linq;\n\nnamespace NextGenMapper\n{\n    internal static partial class Mapper\n    {\n        internal static To Map<To>(this object source) => throw new InvalidOperationException($"Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function.");\n\n        internal static To MapWith<To>(this object source) => throw new InvalidOperationException($"Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function.");\n    \n        internal static To Project<To>(this IQueryable<object> source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, project function was not found.");\n        \n        internal static To ProjectWith<To>(this IQueryable<object> source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, project function was not found.");\n        \n        internal static To Project<To>(this IQueryable source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, projection for non generic IQueryable is not supported");\n\n        internal static To ProjectWith<To>(this IQueryable source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, projection for non generic IQueryable is not supported");\n    }\n}\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:n(29325).Z},"Download Example project NextGenMapper "))),(0,r.kt)("h3",{id:"share-nextgenmapper"},"Share NextGenMapper"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&quote=NextGenMapper",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&text=NextGenMapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&title=NextGenMapper",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&title=NextGenMapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/NextGenMapper"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/NextGenMapper")),(0,r.kt)("h2",{id:"in-the-same-category-mapper"},"In the same category (Mapper)"),(0,r.kt)("h3",{id:"autodto"},(0,r.kt)("a",{parentName:"h3",href:"/docs/AutoDTO"},"AutoDTO")),(0,r.kt)("h3",{id:"dynamicsmapper"},(0,r.kt)("a",{parentName:"h3",href:"/docs/DynamicsMapper"},"DynamicsMapper")),(0,r.kt)("h3",{id:"magicmap"},(0,r.kt)("a",{parentName:"h3",href:"/docs/MagicMap"},"MagicMap")),(0,r.kt)("h3",{id:"mapperly"},(0,r.kt)("a",{parentName:"h3",href:"/docs/mapperly"},"mapperly")),(0,r.kt)("h3",{id:"mapto"},(0,r.kt)("a",{parentName:"h3",href:"/docs/MapTo"},"MapTo")))}N.isMDXComponent=!0},29325:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/NextGenMapper-8e85b4730de6884d439d8ca7ffd49421.zip"}}]);