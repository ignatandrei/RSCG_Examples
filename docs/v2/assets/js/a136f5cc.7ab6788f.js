"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2095],{28783:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>p,default:()=>k,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var a=t(87462),i=(t(67294),t(3905)),o=t(73992),r=t(18679),s=t(68839);const l={sidebar_position:1320,title:"132 - UnionGen",description:"Generating unions between types",slug:"/UnionGen"},p="UnionGen  by M. Haslinger",u={unversionedId:"RSCG-Examples/UnionGen",id:"RSCG-Examples/UnionGen",title:"132 - UnionGen",description:"Generating unions between types",source:"@site/docs/RSCG-Examples/UnionGen.md",sourceDirName:"RSCG-Examples",slug:"/UnionGen",permalink:"/RSCG_Examples/v2/docs/UnionGen",draft:!1,tags:[],version:"current",sidebarPosition:1320,frontMatter:{sidebar_position:1320,title:"132 - UnionGen",description:"Generating unions between types",slug:"/UnionGen"},sidebar:"tutorialSidebar",previous:{title:"131 - EnumUtilities",permalink:"/RSCG_Examples/v2/docs/EnumUtilities"},next:{title:"133 - FusionReactor",permalink:"/RSCG_Examples/v2/docs/FusionReactor"}},m={},d=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share UnionGen",id:"share-uniongen",level:3},{value:"In the same category (FunctionalProgramming) - 10 other generators",id:"in-the-same-category-functionalprogramming---10-other-generators",level:3},{value:"cachesourcegenerator",id:"cachesourcegenerator",level:4},{value:"dunet",id:"dunet",level:4},{value:"Funcky.DiscriminatedUnion",id:"funckydiscriminatedunion",level:4},{value:"FunicularSwitch",id:"funicularswitch",level:4},{value:"N.SourceGenerators.UnionTypes",id:"nsourcegeneratorsuniontypes",level:4},{value:"OneOf",id:"oneof",level:4},{value:"PartiallyApplied",id:"partiallyapplied",level:4},{value:"RSCG_Utils_Memo",id:"rscg_utils_memo",level:4},{value:"TypeUtilities",id:"typeutilities",level:4},{value:"UnionsGenerator",id:"unionsgenerator",level:4}],c={toc:d},h="wrapper";function k(e){let{components:n,...l}=e;return(0,i.kt)(h,(0,a.Z)({},c,l,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"uniongen--by-m-haslinger"},"UnionGen  by M. Haslinger"),(0,i.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,i.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/UnionGen/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/UnionGen?label=UnionGen",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/markushaslinger/union_source_generator"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/markushaslinger/union_source_generator?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/markushaslinger/union_source_generator?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"UnionGen")),(0,i.kt)("p",{parentName:"admonition"},"A source generator for creating C# union types via a generic marker attribute."),(0,i.kt)("p",{parentName:"admonition"},"Author: M. Haslinger"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/UnionGen/"},"https://www.nuget.org/packages/UnionGen/")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/markushaslinger/union_source_generator"},"https://github.com/markushaslinger/union_source_generator")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/markushaslinger/union_source_generator"},"https://github.com/markushaslinger/union_source_generator"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"union-source-generator"},"Union Source Generator"),(0,i.kt)("p",{parentName:"admonition"},"Union Source Generator is a C# source generator that generates a union type for a set of types. The generated union type can hold any ",(0,i.kt)("em",{parentName:"p"},"one")," of the specified types.\nConsuming the type can be done by ",(0,i.kt)("em",{parentName:"p"},"exhaustive")," pattern matching."),(0,i.kt)("p",{parentName:"admonition"},"The main component is one ",(0,i.kt)("strong",{parentName:"p"},"generic attribute"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"UnionAttribute"),", which is used to specify the types that the union can hold, on a ",(0,i.kt)("inlineCode",{parentName:"p"},"struct"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"[Union<Result<int>, NotFound>]\npublic readonly partial struct SimpleObj;\n")),(0,i.kt)("p",{parentName:"admonition"},"This will result in a generated ",(0,i.kt)("inlineCode",{parentName:"p"},"SimpleObj")," type that can hold any of the specified types, ",(0,i.kt)("strong",{parentName:"p"},"but only one at a time"),".\nIt also provides compile time checked ",(0,i.kt)("em",{parentName:"p"},"exhaustive")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Switch")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Match")," methods to handle the different types.\nImplicit conversions operators are generated as well as equality members."),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'SimpleObj simple = CreateSimple();\nsimple.Switch(\n              r =>  Console.WriteLine($"Found: {r}"),\n              _ => Console.WriteLine("not found"));\nint result = simple.Match(r => r.Value * 2,\n                          _ => -1);\n\nSimpleObj CreateSimple() => new NotFound();\n')),(0,i.kt)("blockquote",{parentName:"admonition"},(0,i.kt)("p",{parentName:"blockquote"},"While the generator itself has to be a ",(0,i.kt)("inlineCode",{parentName:"p"},"netstandard2.0")," project, the generated code assumes C#12 / .NET 8 at this point.")),(0,i.kt)("blockquote",{parentName:"admonition"},(0,i.kt)("p",{parentName:"blockquote"},"This project is ",(0,i.kt)("em",{parentName:"p"},"heavily")," influenced by the great ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/mcintyre321/OneOf"},"OneOf")," library. All credit for the original concept to its authors!")),(0,i.kt)("h2",{parentName:"admonition",id:"opinionated-naming-scheme"},"Opinionated Naming Scheme"),(0,i.kt)("p",{parentName:"admonition"},"This library is ",(0,i.kt)("strong",{parentName:"p"},"opinionated")," as it will try to assign '",(0,i.kt)("em",{parentName:"p"},"readable"),"' names to the properties based on the specified types:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"SimpleObj simple = new SimpleObj(new Result<int>(12));\nbool found = simple.IsNotFound;\nResult<int> result = simple.AsResultOfInt32();\n")),(0,i.kt)("p",{parentName:"admonition"},"It even will try to detect collections and assign names like ",(0,i.kt)("inlineCode",{parentName:"p"},"ListOfFoo")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"DictionaryOfStringAndInt64"),"."),(0,i.kt)("p",{parentName:"admonition"},"The same is true for the lambda parameter names in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Match")," & ",(0,i.kt)("inlineCode",{parentName:"p"},"Switch")," methods.\nFor ",(0,i.kt)("inlineCode",{parentName:"p"},"Switch")," they will get names like ",(0,i.kt)("inlineCode",{parentName:"p"},"forString")," (or ",(0,i.kt)("inlineCode",{parentName:"p"},"forNone"),") and for ",(0,i.kt)("inlineCode",{parentName:"p"},"Match")," ones like ",(0,i.kt)("inlineCode",{parentName:"p"},"withString")," (or ",(0,i.kt)("inlineCode",{parentName:"p"},"withNone"),")."),(0,i.kt)("p",{parentName:"admonition"},"That can work great in many scenarios but will probably lead to bad naming in some cases - that's the trade-off I'm willing to accept."),(0,i.kt)("h2",{parentName:"admonition",id:"union-object-size"},"Union Object Size"),(0,i.kt)("p",{parentName:"admonition"},"We try to be smart and use as little memory as possible for the union object."),(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"They are ",(0,i.kt)("inlineCode",{parentName:"li"},"readonly struct"),"s"),(0,i.kt)("li",{parentName:"ul"},"Only those fields actually needed are generated",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"e.g. only a single reference field which is used for all reference types"),(0,i.kt)("li",{parentName:"ul"},"if there are no reference types, no reference field is generated"),(0,i.kt)("li",{parentName:"ul"},"if there are no value types, no value field is generated"))),(0,i.kt)("li",{parentName:"ul"},"A single ",(0,i.kt)("inlineCode",{parentName:"li"},"byte")," is used for storing the state so that they union object knows ",(0,i.kt)("em",{parentName:"li"},"what")," it is")),(0,i.kt)("p",{parentName:"admonition"},"Plus padding for alignment done by the runtime."),(0,i.kt)("h2",{parentName:"admonition",id:"motivation"},"Motivation"),(0,i.kt)("p",{parentName:"admonition"},"My main motivation was to finally learn more about writing source generators by creating one myself.\nI haven't found a lot of resources regarding ",(0,i.kt)("em",{parentName:"p"},"generic")," marker attributes in combination with source generators, so I'm not sure my approach is optimal, but maybe it can serve as a starting point for others."),(0,i.kt)("p",{parentName:"admonition"},"As a first project I wanted something with a small scope and I was always a little annoyed by the property names (",(0,i.kt)("inlineCode",{parentName:"p"},"T0"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"T1"),", ...) in the ",(0,i.kt)("inlineCode",{parentName:"p"},"OneOf")," library (which they have to use due to the types being generic - even when using their source generator).\nSo this is what I decided to tackle."),(0,i.kt)("h2",{parentName:"admonition",id:"quality"},"Quality"),(0,i.kt)("p",{parentName:"admonition"},"This is a two-day toy project without much testing (and no serious automated tests).\nI will probably use it in my own projects in the future to see how far I'll get and fix issues as they arise."),(0,i.kt)("p",{parentName:"admonition"},"Feedback (and PRs \ud83d\ude09) to make the implementation more robust, efficient and generally better are welcome, of course!"),(0,i.kt)("blockquote",{parentName:"admonition"},(0,i.kt)("p",{parentName:"blockquote"},"Don't expect production grade reliability here!"))),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Generating unions between types")),(0,i.kt)("h2",{id:"how-to-use"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"UnionGen")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {16}",showLineNumbers:!0,"{16}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n    <ItemGroup>\n      <PackageReference Include="UnionGen" Version="1.4.0" />\n    </ItemGroup>\n\n</Project>\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\UnionGen\\src\\UnionTypesDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"UnionGen")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using UnionTypesDemo;\n\nConsole.WriteLine("Save or not");\nvar data = SaveToDatabase.Save(0);\nConsole.WriteLine(data.IsNotFound);\ndata = SaveToDatabase.Save(1);\nConsole.WriteLine(data.IsResultOfInt32);\n\nConsole.WriteLine(data.AsResultOfInt32());\n\n'))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\UnionGen\\src\\UnionTypesDemo\\ResultSave.cs",label:"ResultSave.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"UnionGen")," in ",(0,i.kt)("em",{parentName:"p"},"ResultSave.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using UnionGen.Types;\nusing UnionGen;\nnamespace UnionTypesDemo;\n\n[Union<Result<int>, NotFound>]\npublic partial struct ResultSave\n{\n}\n\n\n\n"))),(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\UnionGen\\src\\UnionTypesDemo\\SaveToDatabase.cs",label:"SaveToDatabase.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"UnionGen")," in ",(0,i.kt)("em",{parentName:"p"},"SaveToDatabase.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using UnionGen.Types;\n\nnamespace UnionTypesDemo;\n\npublic class SaveToDatabase\n{\n    public static ResultSave Save(int i)\n    {\n        if(i ==0)\n        {\n            return new NotFound();\n        }\n        return new Result<int>(i);\n    }\n}\n\n\n\n")))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(o.Z,{mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\UnionGen\\src\\UnionTypesDemo\\obj\\GX\\UnionGen.Generator\\UnionGen.UnionSourceGen\\UnionTypesDemo.ResultSave.g.cs",label:"UnionTypesDemo.ResultSave.g.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated by UnionSourceGen />\n#nullable enable\nusing System;\nnamespace UnionTypesDemo\n{\n\n    public readonly partial struct ResultSave : IEquatable<ResultSave>\n    {\n        private readonly UnionGen.Types.Result<int> _value0;\n        private readonly UnionGen.Types.NotFound _value1;\n        private readonly UnionGen.InternalUtil.StateByte _state;\n\n        private ResultSave(int index, int actualTypeIndex)\n        {\n            _state = new UnionGen.InternalUtil.StateByte(index, actualTypeIndex);\n        }\n\n        public ResultSave(UnionGen.Types.Result<int> value): this(0, 0)\n        {\n            _value0 = value;\n        }\n\n        public ResultSave(UnionGen.Types.NotFound value): this(1, 1)\n        {\n            _value1 = value;\n        }\n\n        [Obsolete(UnionGen.InternalUtil.UnionGenInternalConst.DefaultConstructorWarning, true)]\n        public ResultSave(): this(0, 0) {}\n\n        public bool IsResultOfInt32 => _state.Index == 0;\n        public bool IsNotFound => _state.Index == 1;\n\n        public UnionGen.Types.Result<int> AsResultOfInt32() =>\n            IsResultOfInt32\n                ? _value0\n                : throw UnionGen.InternalUtil.ExceptionHelper.ThrowNotOfType(GetTypeName(0), GetTypeName(_state.ActualTypeIndex));\n        \n        public UnionGen.Types.NotFound AsNotFound() =>\n            IsNotFound\n                ? _value1\n                : throw UnionGen.InternalUtil.ExceptionHelper.ThrowNotOfType(GetTypeName(1), GetTypeName(_state.ActualTypeIndex));\n\n        public static implicit operator ResultSave(UnionGen.Types.Result<int> value) => new ResultSave(value);\n        public static implicit operator ResultSave(UnionGen.Types.NotFound value) => new ResultSave(value);\n        public static bool operator ==(ResultSave left, ResultSave right) => left.Equals(right);\n        public static bool operator !=(ResultSave left, ResultSave right) => !left.Equals(right);\n\n        public TResult Match<TResult>(Func<UnionGen.Types.Result<int>, TResult> withResultOfInt32, Func<UnionGen.Types.NotFound, TResult> withNotFound) =>      \n            _state.ActualTypeIndex switch\n            {\n                0 => withResultOfInt32(_value0),\n                1 => withNotFound(_value1),\n                _ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.ActualTypeIndex)\n            };\n\n        public void Switch(Action<UnionGen.Types.Result<int>> forResultOfInt32, Action<UnionGen.Types.NotFound> forNotFound)        \n        {\n            switch (_state.ActualTypeIndex)\n            {\n                case 0: forResultOfInt32(_value0); break;\n                case 1: forNotFound(_value1); break;\n                default: throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.ActualTypeIndex);\n            }\n        }\n\n        public override string ToString() =>        \n            _state.Index switch\n            {\n                0 => _value0.ToString()!,\n                1 => _value1.ToString()!,\n                _ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.Index)\n            };\n\n        public bool Equals(ResultSave other) => \n            _state.Index == other._state.Index\n                && _state.Index switch \n                {\n                    0 => _value0.Equals(other._value0),\n                    1 => _value1.Equals(other._value1),\n                    _ => false\n                };\n\n        public override bool Equals(object? obj)\n        {\n            if (ReferenceEquals(null, obj))\n            {\n                return false;\n            }\n            return obj is ResultSave other && Equals(other);\n        }\n\n        public override int GetHashCode(){      \n            unchecked\n            {\n                var hash = _state.Index switch\n                {\n                    0 => _value0.GetHashCode(),\n                    1 => _value1.GetHashCode(),\n                    _ => 0\n                };\n                return (hash * 397) ^ _state.Index;\n            }\n        }\n\n        public string GetTypeName(int index) =>\n            index switch \n            {\n                0 => "UnionGen.Types.Result<int>",\n                1 => "UnionGen.Types.NotFound",\n                _ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(index)\n            };\n\n    }\n\n}\n')))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:t(19435).Z},"Download Example project UnionGen "))),(0,i.kt)("h3",{id:"share-uniongen"},"Share UnionGen"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&quote=UnionGen",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&text=UnionGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&title=UnionGen",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&title=UnionGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/UnionGen"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/UnionGen")),(0,i.kt)("h3",{id:"in-the-same-category-functionalprogramming---10-other-generators"},"In the same category (FunctionalProgramming) - 10 other generators"),(0,i.kt)("h4",{id:"cachesourcegenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/cachesourcegenerator"},"cachesourcegenerator")),(0,i.kt)("h4",{id:"dunet"},(0,i.kt)("a",{parentName:"h4",href:"/docs/dunet"},"dunet")),(0,i.kt)("h4",{id:"funckydiscriminatedunion"},(0,i.kt)("a",{parentName:"h4",href:"/docs/Funcky.DiscriminatedUnion"},"Funcky.DiscriminatedUnion")),(0,i.kt)("h4",{id:"funicularswitch"},(0,i.kt)("a",{parentName:"h4",href:"/docs/FunicularSwitch"},"FunicularSwitch")),(0,i.kt)("h4",{id:"nsourcegeneratorsuniontypes"},(0,i.kt)("a",{parentName:"h4",href:"/docs/N.SourceGenerators.UnionTypes"},"N.SourceGenerators.UnionTypes")),(0,i.kt)("h4",{id:"oneof"},(0,i.kt)("a",{parentName:"h4",href:"/docs/OneOf"},"OneOf")),(0,i.kt)("h4",{id:"partiallyapplied"},(0,i.kt)("a",{parentName:"h4",href:"/docs/PartiallyApplied"},"PartiallyApplied")),(0,i.kt)("h4",{id:"rscg_utils_memo"},(0,i.kt)("a",{parentName:"h4",href:"/docs/RSCG_Utils_Memo"},"RSCG_Utils_Memo")),(0,i.kt)("h4",{id:"typeutilities"},(0,i.kt)("a",{parentName:"h4",href:"/docs/TypeUtilities"},"TypeUtilities")),(0,i.kt)("h4",{id:"unionsgenerator"},(0,i.kt)("a",{parentName:"h4",href:"/docs/UnionsGenerator"},"UnionsGenerator")))}k.isMDXComponent=!0},19435:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/files/UnionGen-67c3529e71de5b77ede2410fdec7066d.zip"}}]);