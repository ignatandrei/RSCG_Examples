"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[8591],{737:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>u,default:()=>g,frontMatter:()=>o,metadata:()=>p,toc:()=>d});var r=a(87462),n=(a(67294),a(3905)),i=a(73992),l=a(18679),s=a(68839);const o={sidebar_position:660,title:"66 - BuilderGenerator",description:"Generating Builder class for an object",slug:"/BuilderGenerator"},u="BuilderGenerator  by Mell Grubb",p={unversionedId:"RSCG-Examples/BuilderGenerator",id:"RSCG-Examples/BuilderGenerator",title:"66 - BuilderGenerator",description:"Generating Builder class for an object",source:"@site/docs/RSCG-Examples/BuilderGenerator.md",sourceDirName:"RSCG-Examples",slug:"/BuilderGenerator",permalink:"/RSCG_Examples/v2/docs/BuilderGenerator",draft:!1,tags:[],version:"current",sidebarPosition:660,frontMatter:{sidebar_position:660,title:"66 - BuilderGenerator",description:"Generating Builder class for an object",slug:"/BuilderGenerator"},sidebar:"tutorialSidebar",previous:{title:"65 - Disposer",permalink:"/RSCG_Examples/v2/docs/Disposer"},next:{title:"67 - MapTo",permalink:"/RSCG_Examples/v2/docs/MapTo"}},m={},d=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share BuilderGenerator",id:"share-buildergenerator",level:3},{value:"In the same category (EnhancementClass)",id:"in-the-same-category-enhancementclass",level:2},{value:"ApparatusAOT",id:"apparatusaot",level:3},{value:"AspectGenerator",id:"aspectgenerator",level:3},{value:"DudNet",id:"dudnet",level:3},{value:"FastGenericNew",id:"fastgenericnew",level:3},{value:"GeneratorEquals",id:"generatorequals",level:3},{value:"HsuSgSync",id:"hsusgsync",level:3},{value:"Immutype",id:"immutype",level:3},{value:"Ling.Audit",id:"lingaudit",level:3},{value:"Lombok.NET",id:"lomboknet",level:3},{value:"M31.FluentAPI",id:"m31fluentapi",level:3},{value:"MemoryPack",id:"memorypack",level:3},{value:"Meziantou.Polyfill",id:"meziantoupolyfill",level:3},{value:"Microsoft.Extensions.Logging",id:"microsoftextensionslogging",level:3},{value:"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator",level:3},{value:"Microsoft.Interop.JavaScript.JSImportGenerator",id:"microsoftinteropjavascriptjsimportgenerator",level:3},{value:"Roozie.AutoInterface",id:"roozieautointerface",level:3},{value:"RSCG_Decorator",id:"rscg_decorator",level:3},{value:"RSCG_UtilityTypes",id:"rscg_utilitytypes",level:3},{value:"StaticReflection",id:"staticreflection",level:3},{value:"SyncMethodGenerator",id:"syncmethodgenerator",level:3},{value:"System.Runtime.InteropServices",id:"systemruntimeinteropservices",level:3},{value:"System.Text.RegularExpressions",id:"systemtextregularexpressions",level:3},{value:"TelemetryLogging",id:"telemetrylogging",level:3}],c={toc:d},h="wrapper";function g(e){let{components:t,...o}=e;return(0,n.kt)(h,(0,r.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"buildergenerator--by-mell-grubb"},"BuilderGenerator  by Mell Grubb"),(0,n.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/BuilderGenerator/"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/BuilderGenerator?label=BuilderGenerator",alt:"Nuget"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/MelGrubb/BuilderGenerator?label=updated",alt:"GitHub last commit"})),"\n",(0,n.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/MelGrubb/BuilderGenerator?style=social",alt:"GitHub Repo stars"})),(0,n.kt)("h2",{id:"details"},"Details"),(0,n.kt)("h3",{id:"info"},"Info"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Name: ",(0,n.kt)("strong",{parentName:"p"},"BuilderGenerator")),(0,n.kt)("p",{parentName:"admonition"},"Generates builder classes for testing and/or seed data."),(0,n.kt)("p",{parentName:"admonition"},"Author: Mell Grubb"),(0,n.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,n.kt)("em",{parentName:"p"},(0,n.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/BuilderGenerator/"},"https://www.nuget.org/packages/BuilderGenerator/")),"   "),(0,n.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator"},"https://github.com/MelGrubb/BuilderGenerator")),(0,n.kt)("p",{parentName:"admonition"},"Source : ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator"},"https://github.com/MelGrubb/BuilderGenerator"))),(0,n.kt)("h3",{id:"original-readme"},"Original Readme"),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/BuilderGenerator/"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/buildergenerator",alt:"Nuget"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://opensource.org/licenses/MIT"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/github/license/melgrubb/buildergenerator",alt:"GitHub"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator/issues"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/github/issues/melgrubb/buildergenerator",alt:"GitHub issues"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator/actions/workflows/ci.yml"},(0,n.kt)("img",{parentName:"a",src:"https://github.com/MelGrubb/BuilderGenerator/actions/workflows/ci.yml/badge.svg",alt:"CI"})),"\n",(0,n.kt)("a",{parentName:"p",href:"https://discord.com/channels/813785114722697258/1099524153436012694"},(0,n.kt)("img",{parentName:"a",src:"https://img.shields.io/discord/813785114722697258?logo=discord&logoColor=white",alt:"Discord"}))),(0,n.kt)("h1",{parentName:"admonition",id:"builder-generator"},"Builder Generator"),(0,n.kt)("p",{parentName:"admonition"},'This is a .Net Source Generator designed to add "Builders" to your projects. ',(0,n.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Builder_pattern"},"Builders")," are an object creation pattern, similar to the ",(0,n.kt)("a",{parentName:"p",href:"https://martinfowler.com/bliki/ObjectMother.html"},"Object Mother"),' pattern. Object Mothers and Builders are most commonly used to create objects for testing, but they can be used anywhere you want "canned" objects.'),(0,n.kt)("p",{parentName:"admonition"},"For more complete documentation, please see the ",(0,n.kt)("a",{parentName:"p",href:"https://melgrubb.github.io/BuilderGenerator/"},"documentation site")," or the raw ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/MelGrubb/BuilderGenerator/blob/main/docs/index.md"},"documentation source"),"."),(0,n.kt)("h2",{parentName:"admonition",id:"known-issues"},"Known Issues"),(0,n.kt)("p",{parentName:"admonition"},"This project has moved to the .Net 6 version of source generators, which unfortuntely means that it's incompatible with Visual Studio 2019. It's also breaking the GitHub build pipeline at the moment. It all seems to work just fine in VS2022 though. If you're stuck on .Net 5 and VS2019, you can always use the v1.x series, although its usage is different."),(0,n.kt)("h2",{parentName:"admonition",id:"installation"},"Installation"),(0,n.kt)("p",{parentName:"admonition"},"BuilderGenerator is installed as an analyzer via NuGet package (",(0,n.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/BuilderGenerator/"},"https://www.nuget.org/packages/BuilderGenerator/"),'). You can find it through the "Manage NuGet Packages" dialog in Visual Studio, or from the command line.'),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-ps"},"Install-Package BuilderGenerator\n")),(0,n.kt)("h2",{parentName:"admonition",id:"usage"},"Usage"),(0,n.kt)("p",{parentName:"admonition"},"After installation, create a partial class to define your builder in. Decorate it with the ",(0,n.kt)("inlineCode",{parentName:"p"},"BuilderFor")," attribute, specifying the type of class that the builder is meant to build (e.g. ",(0,n.kt)("inlineCode",{parentName:"p"},"[BuilderFor(typeof(Foo))]"),'. Define any factory and helper methods in this partial class. Meanwhile, another partial class definition will be auto-generated which contains all the "boring" parts such as the backing fields and "with" methods.'),(0,n.kt)("h2",{parentName:"admonition",id:"version-history"},"Version History"),(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.3.0"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Major caching and performance improvements"),(0,n.kt)("li",{parentName:"ul"},"Internal code cleanup"),(0,n.kt)("li",{parentName:"ul"},"Conversion of templates to embedded resources"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.2.0"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Changed generated file extension to .g.cs"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.7"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Fixed #13, NetStandard2.0 compatibility"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.6"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Fixed #12, Generated files now marked with auth-generated header"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.5"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Fixed #14, duplicate properties"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.3"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Attempting to fix NuGet packaging problems"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.2"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Setters for base class properties rendering properly"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.1"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Improved error handling"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v2.0.0"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Updated to .Net 6 and IIncrementalGenerator (See note above about incompatibility with VS2019)"),(0,n.kt)("li",{parentName:"ul"},"Changed usage pattern from marking target classes with attributes to marking partial builder classes"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v1.2"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Solution reorganization"),(0,n.kt)("li",{parentName:"ul"},"Version number synchronization"),(0,n.kt)("li",{parentName:"ul"},"Automated build pipeline"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v1.0"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"First major release"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"v0.5"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Public beta"),(0,n.kt)("li",{parentName:"ul"},"Working NuGet package"),(0,n.kt)("li",{parentName:"ul"},"Customizable templates")))),(0,n.kt)("h2",{parentName:"admonition",id:"roadmap"},"Roadmap"),(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},"Read-only collection support in default templates"),(0,n.kt)("li",{parentName:"ul"},"Attribute-less generation of partial classes"),(0,n.kt)("li",{parentName:"ul"},"Completed documentation"),(0,n.kt)("li",{parentName:"ul"},"Unit tests for generation components")),(0,n.kt)("h2",{parentName:"admonition",id:"attributions"},"Attributions"),(0,n.kt)("p",{parentName:"admonition"},"The BuilderGenerator logo includes ",(0,n.kt)("a",{parentName:"p",href:"https://thenounproject.com/term/tools/11192"},"tools")," by John Caserta from the Noun Project.")),(0,n.kt)("h3",{id:"about"},"About"),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"Generating Builder class for an object")),(0,n.kt)("h2",{id:"how-to-use"},"How to use"),(0,n.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,n.kt)(i.Z,{mdxType:"Tabs"},(0,n.kt)(l.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,n.kt)("p",null,"This is the CSharp Project that references ",(0,n.kt)("strong",{parentName:"p"},"BuilderGenerator")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {14}",showLineNumbers:!0,"{14}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n  </PropertyGroup>\n\n      <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n      <ItemGroup>\n        <PackageReference Include="BuilderGenerator" Version="2.3.0" />\n      </ItemGroup>\n\n</Project>\n\n'))),(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,n.kt)("p",null,"  This is the use of ",(0,n.kt)("strong",{parentName:"p"},"BuilderGenerator")," in ",(0,n.kt)("em",{parentName:"p"},"Program.cs")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using Builder;\n\nvar pOld = new Person();\npOld.FirstName = "Andrei";\npOld.LastName = "Ignat";\npOld.MiddleName = "G";\nvar build = new PersonBuilder()\n    .WithFirstName(pOld.FirstName)\n    .WithMiddleName("")\n    .WithLastName(pOld.LastName)\n    ;\n    \nvar pNew = build.Build();\nSystem.Console.WriteLine(pNew.FullName());\nSystem.Console.WriteLine(pOld.FullName());\n\n'))),(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,n.kt)("p",null,"  This is the use of ",(0,n.kt)("strong",{parentName:"p"},"BuilderGenerator")," in ",(0,n.kt)("em",{parentName:"p"},"Person.cs")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace Builder;\npublic class Person\n{\n    public string FirstName { get; set; }\n    public string? MiddleName { get; set; }\n    public string LastName { get; set; }\n\n    public string FullName()\n    {\n        return FirstName + " " + MiddleName + " "+LastName;\n    }\n    \n}\n\n'))),(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\PersonBuilder.cs",label:"PersonBuilder.cs",mdxType:"TabItem"},(0,n.kt)("p",null,"  This is the use of ",(0,n.kt)("strong",{parentName:"p"},"BuilderGenerator")," in ",(0,n.kt)("em",{parentName:"p"},"PersonBuilder.cs")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace Builder;\n\n[BuilderGenerator.BuilderFor(typeof(Person))]\npublic partial class PersonBuilder\n{\n}\n")))),(0,n.kt)("h3",{id:"generated-files"},"Generated Files"),(0,n.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,n.kt)(i.Z,{mdxType:"Tabs"},(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\obj\\GX\\BuilderGenerator\\BuilderGenerator.BuilderGenerator\\BuilderBaseClass.cs",label:"BuilderBaseClass.cs",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'#nullable disable\n\nnamespace BuilderGenerator\n{\n    /// <summary>Base class for object builder classes.</summary>\n    /// <typeparam name="T">The type of the objects built by this builder.</typeparam>\n    public abstract class Builder<T> where T : class\n    {\n        /// <summary>Gets or sets the object returned by this builder.</summary>\n        /// <value>The constructed object.</value>\n        #pragma warning disable CA1720 // Identifier contains type name\n        protected System.Lazy<T> Object { get; set; }\n        #pragma warning restore CA1720 // Identifier contains type name\n\n        /// <summary>Builds the object instance.</summary>\n        /// <returns>The constructed object.</returns>\n        public abstract T Build();\n\n        protected virtual void PostProcess(T value)\n        {\n        }\n\n        /// <summary>Sets the object to be returned by this instance.</summary>\n        /// <param name="value">The object to be returned.</param>\n        /// <returns>A reference to this builder instance.</returns>\n        public Builder<T> WithObject(T value)\n        {\n            Object = new System.Lazy<T>(() => value);\n\n            return this;\n        }\n    }\n}\n\n'))),(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\obj\\GX\\BuilderGenerator\\BuilderGenerator.BuilderGenerator\\BuilderForAttribute.cs",label:"BuilderForAttribute.cs",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace BuilderGenerator\n{\n    [System.AttributeUsage(System.AttributeTargets.Class)]\n    public class BuilderForAttribute : System.Attribute\n    {\n        public bool IncludeInternals { get; }\n        public System.Type Type { get; }\n\n        public BuilderForAttribute(System.Type type, bool includeInternals = false)\n        {\n            IncludeInternals = includeInternals;\n            Type = type;\n        }\n    }\n}\n\n"))),(0,n.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\BuilderGenerator\\src\\Builder\\obj\\GX\\BuilderGenerator\\BuilderGenerator.BuilderGenerator\\PersonBuilder.g.cs",label:"PersonBuilder.g.cs",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"#nullable disable\n\n//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by BuilderGenerator at 2024-01-21T09:37:26 in 38.1083ms.\n// </auto-generated>\n//------------------------------------------------------------------------------\nusing System.CodeDom.Compiler;\n\n\nnamespace Builder\n{\n    public partial class PersonBuilder : BuilderGenerator.Builder<Builder.Person>\n    {\n        public System.Lazy<string> FirstName = new System.Lazy<string>(() => default(string));\n        public System.Lazy<string> LastName = new System.Lazy<string>(() => default(string));\n        public System.Lazy<string?> MiddleName = new System.Lazy<string?>(() => default(string?));\n\n        public override Builder.Person Build()\n        {\n            if (Object?.IsValueCreated != true)\n            {\n                Object = new System.Lazy<Builder.Person>(() =>\n                {\n                    var result = new Builder.Person\n                    {\n                        FirstName = FirstName.Value,\n                        LastName = LastName.Value,\n                        MiddleName = MiddleName.Value,\n                    };\n\n                    return result;\n                });\n\n                PostProcess(Object.Value);\n            }\n\n            return Object.Value;\n        }\n\n        public PersonBuilder WithFirstName(string value)\n        {\n            return WithFirstName(() => value);\n        }\n\n        public PersonBuilder WithFirstName(System.Func<string> func)\n        {\n            FirstName = new System.Lazy<string>(func);\n            return this;\n        }\n\n        public PersonBuilder WithoutFirstName()\n        {\n            FirstName = new System.Lazy<string>(() => default(string));\n            return this;\n        }\n\n        public PersonBuilder WithLastName(string value)\n        {\n            return WithLastName(() => value);\n        }\n\n        public PersonBuilder WithLastName(System.Func<string> func)\n        {\n            LastName = new System.Lazy<string>(func);\n            return this;\n        }\n\n        public PersonBuilder WithoutLastName()\n        {\n            LastName = new System.Lazy<string>(() => default(string));\n            return this;\n        }\n\n        public PersonBuilder WithMiddleName(string? value)\n        {\n            return WithMiddleName(() => value);\n        }\n\n        public PersonBuilder WithMiddleName(System.Func<string?> func)\n        {\n            MiddleName = new System.Lazy<string?>(func);\n            return this;\n        }\n\n        public PersonBuilder WithoutMiddleName()\n        {\n            MiddleName = new System.Lazy<string?>(() => default(string?));\n            return this;\n        }\n    }\n}\n\n")))),(0,n.kt)("h2",{id:"usefull"},"Usefull"),(0,n.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("a",{target:"_blank",href:a(31255).Z},"Download Example project BuilderGenerator "))),(0,n.kt)("h3",{id:"share-buildergenerator"},"Share BuilderGenerator"),(0,n.kt)("ul",null,(0,n.kt)("li",null,(0,n.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&quote=BuilderGenerator",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,n.kt)("li",null,(0,n.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&text=BuilderGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,n.kt)("li",null,(0,n.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&title=BuilderGenerator",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,n.kt)("li",null,(0,n.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&title=BuilderGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/BuilderGenerator"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/BuilderGenerator")),(0,n.kt)("h2",{id:"in-the-same-category-enhancementclass"},"In the same category (EnhancementClass)"),(0,n.kt)("h3",{id:"apparatusaot"},(0,n.kt)("a",{parentName:"h3",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,n.kt)("h3",{id:"aspectgenerator"},(0,n.kt)("a",{parentName:"h3",href:"/docs/AspectGenerator"},"AspectGenerator")),(0,n.kt)("h3",{id:"dudnet"},(0,n.kt)("a",{parentName:"h3",href:"/docs/DudNet"},"DudNet")),(0,n.kt)("h3",{id:"fastgenericnew"},(0,n.kt)("a",{parentName:"h3",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,n.kt)("h3",{id:"generatorequals"},(0,n.kt)("a",{parentName:"h3",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,n.kt)("h3",{id:"hsusgsync"},(0,n.kt)("a",{parentName:"h3",href:"/docs/HsuSgSync"},"HsuSgSync")),(0,n.kt)("h3",{id:"immutype"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Immutype"},"Immutype")),(0,n.kt)("h3",{id:"lingaudit"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Ling.Audit"},"Ling.Audit")),(0,n.kt)("h3",{id:"lomboknet"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,n.kt)("h3",{id:"m31fluentapi"},(0,n.kt)("a",{parentName:"h3",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,n.kt)("h3",{id:"memorypack"},(0,n.kt)("a",{parentName:"h3",href:"/docs/MemoryPack"},"MemoryPack")),(0,n.kt)("h3",{id:"meziantoupolyfill"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Meziantou.Polyfill"},"Meziantou.Polyfill")),(0,n.kt)("h3",{id:"microsoftextensionslogging"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,n.kt)("h3",{id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator")),(0,n.kt)("h3",{id:"microsoftinteropjavascriptjsimportgenerator"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,n.kt)("h3",{id:"roozieautointerface"},(0,n.kt)("a",{parentName:"h3",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,n.kt)("h3",{id:"rscg_decorator"},(0,n.kt)("a",{parentName:"h3",href:"/docs/RSCG_Decorator"},"RSCG_Decorator")),(0,n.kt)("h3",{id:"rscg_utilitytypes"},(0,n.kt)("a",{parentName:"h3",href:"/docs/RSCG_UtilityTypes"},"RSCG_UtilityTypes")),(0,n.kt)("h3",{id:"staticreflection"},(0,n.kt)("a",{parentName:"h3",href:"/docs/StaticReflection"},"StaticReflection")),(0,n.kt)("h3",{id:"syncmethodgenerator"},(0,n.kt)("a",{parentName:"h3",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,n.kt)("h3",{id:"systemruntimeinteropservices"},(0,n.kt)("a",{parentName:"h3",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")),(0,n.kt)("h3",{id:"systemtextregularexpressions"},(0,n.kt)("a",{parentName:"h3",href:"/docs/System.Text.RegularExpressions"},"System.Text.RegularExpressions")),(0,n.kt)("h3",{id:"telemetrylogging"},(0,n.kt)("a",{parentName:"h3",href:"/docs/TelemetryLogging"},"TelemetryLogging")))}g.isMDXComponent=!0},31255:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/files/BuilderGenerator-85e110a7b49ed4df3ef9dbc287414fdb.zip"}}]);