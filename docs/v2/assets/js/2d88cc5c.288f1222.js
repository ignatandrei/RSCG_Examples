"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[5305],{45239:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>f,frontMatter:()=>r,metadata:()=>m,toc:()=>u});var i=n(87462),a=(n(67294),n(3905)),o=n(73992),l=n(18679),s=n(68839);const r={sidebar_position:750,title:"75 - StaticReflection",description:"Call prop/methods on classes",slug:"/StaticReflection"},c="StaticReflection  by Cricle",m={unversionedId:"RSCG-Examples/StaticReflection",id:"RSCG-Examples/StaticReflection",title:"75 - StaticReflection",description:"Call prop/methods on classes",source:"@site/docs/RSCG-Examples/StaticReflection.md",sourceDirName:"RSCG-Examples",slug:"/StaticReflection",permalink:"/RSCG_Examples/v2/docs/StaticReflection",draft:!1,tags:[],version:"current",sidebarPosition:750,frontMatter:{sidebar_position:750,title:"75 - StaticReflection",description:"Call prop/methods on classes",slug:"/StaticReflection"},sidebar:"tutorialSidebar",previous:{title:"74 - CredFetoEnum",permalink:"/RSCG_Examples/v2/docs/CredFetoEnum"},next:{title:"76 - UnitGenerator",permalink:"/RSCG_Examples/v2/docs/UnitGenerator"}},p={},u=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share StaticReflection",id:"share-staticreflection",level:3},{value:"In the same category (EnhancementClass)",id:"in-the-same-category-enhancementclass",level:2},{value:"ApparatusAOT",id:"apparatusaot",level:3},{value:"AspectGenerator",id:"aspectgenerator",level:3},{value:"BuilderGenerator",id:"buildergenerator",level:3},{value:"DudNet",id:"dudnet",level:3},{value:"FastGenericNew",id:"fastgenericnew",level:3},{value:"GeneratorEquals",id:"generatorequals",level:3},{value:"HsuSgSync",id:"hsusgsync",level:3},{value:"Immutype",id:"immutype",level:3},{value:"Ling.Audit",id:"lingaudit",level:3},{value:"Lombok.NET",id:"lomboknet",level:3},{value:"M31.FluentAPI",id:"m31fluentapi",level:3},{value:"MemoryPack",id:"memorypack",level:3},{value:"Meziantou.Polyfill",id:"meziantoupolyfill",level:3},{value:"Microsoft.Extensions.Logging",id:"microsoftextensionslogging",level:3},{value:"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator",level:3},{value:"Microsoft.Interop.JavaScript.JSImportGenerator",id:"microsoftinteropjavascriptjsimportgenerator",level:3},{value:"OptionToStringGenerator",id:"optiontostringgenerator",level:3},{value:"RSCG_Decorator",id:"rscg_decorator",level:3},{value:"RSCG_UtilityTypes",id:"rscg_utilitytypes",level:3},{value:"SyncMethodGenerator",id:"syncmethodgenerator",level:3},{value:"System.Runtime.InteropServices",id:"systemruntimeinteropservices",level:3},{value:"System.Text.RegularExpressions",id:"systemtextregularexpressions",level:3},{value:"TelemetryLogging",id:"telemetrylogging",level:3}],S={toc:u},g="wrapper";function f(e){let{components:t,...r}=e;return(0,a.kt)(g,(0,i.Z)({},S,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"staticreflection--by-cricle"},"StaticReflection  by Cricle"),(0,a.kt)(s.Z,{toc:u,mdxType:"TOCInline"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/FastStaticReflection/"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/FastStaticReflection?label=FastStaticReflection",alt:"Nuget"})),(0,a.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/FastStaticReflection.CodeGen/"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/FastStaticReflection.CodeGen?label=FastStaticReflection.CodeGen",alt:"Nuget"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Cricle/StaticReflection/"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/Cricle/StaticReflection?label=updated",alt:"GitHub last commit"})),"\n",(0,a.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/Cricle/StaticReflection?style=social",alt:"GitHub Repo stars"})),(0,a.kt)("h2",{id:"details"},"Details"),(0,a.kt)("h3",{id:"info"},"Info"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Name: ",(0,a.kt)("strong",{parentName:"p"},"StaticReflection")),(0,a.kt)("p",{parentName:"admonition"},"Use roslyn to make relection static, autogen code for type reflection"),(0,a.kt)("p",{parentName:"admonition"},"Author: Cricle"),(0,a.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/FastStaticReflection/"},"https://www.nuget.org/packages/FastStaticReflection/")),"   "),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/FastStaticReflection.CodeGen/"},"https://www.nuget.org/packages/FastStaticReflection.CodeGen/")),"   "),(0,a.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Cricle/StaticReflection/"},"https://github.com/Cricle/StaticReflection/")),(0,a.kt)("p",{parentName:"admonition"},"Source : ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Cricle/StaticReflection/"},"https://github.com/Cricle/StaticReflection/"))),(0,a.kt)("h3",{id:"original-readme"},"Original Readme"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("h2",{align:"center"},"StaticReflection"),(0,a.kt)("h3",{align:"center"},"A fast, easy, scalable static reflection."),(0,a.kt)("h2",{parentName:"admonition",id:"fast-use"},"Fast use"),(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Install from nuget ",(0,a.kt)("inlineCode",{parentName:"p"},"FastStaticReflection"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"FastStaticReflection.CodeGen"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Write assembly class"))),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"[StaticReflectionAssembly]//for generate assembly code\npublic partial class C\n{\n}\n")),(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"Tag static type reflection")),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"//You can Tag at assembly\n[assembly: StaticReflection(Type = typeof(StaticReflection.Sample.A))]\n\n//Or Property\n[StaticReflection]\n[StaticReflection(Type =typeof(B))]\npublic A a { get; set; }\n\n//Or class\n[StaticReflection]\npublic class A\n{\n    //....\n}\n")),(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"For use")),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'internal class Program\n{\n    static void Main(string[] args)\n    {\n        var b=new Student();\n        var @class=C.Default.Types.First(x => x.Name == "Student");\n        @class.SetProperty(b, "Id", 1);//Reflection get property value\n        Console.WriteLine("Id: "+@class.GetProperty(b, "Id"));//Reflection set property value\n        var @event = (IEventTransfer)@class.Events.First(x => x.Name == "AlreadyGoSchool");\n        using (var eventScope = @event.CreateScope(b))\n        {\n            eventScope.Start();\n            eventScope.EventTransfed += Instance_EventTransfed;//Reflection listen event\n            var method = @class.Methods.First(x => x.Name == "GoToSchool");\n            Console.WriteLine("GoToSchool:" + method.InvokeUsualMethod(b));//Reflection call method\n        }\n        var obj = @class.Constructors.First(x => x.ArgumentTypes.Count == 0);\n        var inst = obj.InvokeUsualMethod(null);//Reflection create object\n        Console.WriteLine(inst);\n    }\n\n    private static void Instance_EventTransfed(object? sender, EventTransferEventArgs e)\n    {\n        Console.WriteLine("EventRaise: " + e.Args[0]);\n    }\n}\n[StaticReflection]\npublic record class Student\n{\n    public int Id { get; set; }\n\n    public string? Name { get; set; }\n\n    public event EventHandler<Student>? AlreadyGoSchool;\n\n    public int GoToSchool()\n    {\n        AlreadyGoSchool?.Invoke(this, this);\n        return Id;\n    }\n}\n[StaticReflectionAssembly]\npublic partial class C\n{\n}\n\n')),(0,a.kt)("h2",{parentName:"admonition",id:"benchmarks"},"Benchmarks"),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/Cricle/StaticReflection//blob/main/test/Benchmarks.md"},"Benchmarks"))),(0,a.kt)("h3",{id:"about"},"About"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Call prop/methods on classes  ")),(0,a.kt)("h2",{id:"how-to-use"},"How to use"),(0,a.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,a.kt)(o.Z,{mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,a.kt)("p",null,"This is the CSharp Project that references ",(0,a.kt)("strong",{parentName:"p"},"StaticReflection")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="FastStaticReflection" Version="1.0.0-preview.3" />\n    <PackageReference Include="FastStaticReflection.CodeGen" Version="1.0.0-preview.3" />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\StaticReflection\\src\\StaticReflectionDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,a.kt)("p",null,"  This is the use of ",(0,a.kt)("strong",{parentName:"p"},"StaticReflection")," in ",(0,a.kt)("em",{parentName:"p"},"Program.cs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using StaticReflection;\nusing StaticReflectionDemo;\n\nvar p = new Person();\n\nPersonReflection.Instance.SetProperty(p, "FirstName","Andrei");\nPersonReflection.Instance.SetProperty(p, "LastName", "Ignat");\n\nConsole.WriteLine(p.Name());\n'))),(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\StaticReflection\\src\\StaticReflectionDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,a.kt)("p",null,"  This is the use of ",(0,a.kt)("strong",{parentName:"p"},"StaticReflection")," in ",(0,a.kt)("em",{parentName:"p"},"Person.cs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using StaticReflection.Annotions;\n\nnamespace StaticReflectionDemo;\n[StaticReflection]\ninternal partial class Person\n{\n    public string FirstName { get; set; }\n    public string LastName { get; set; }\n    public string Name()\n    {\n        return $"{FirstName} {LastName}";\n    }\n}\n\n')))),(0,a.kt)("h3",{id:"generated-files"},"Generated Files"),(0,a.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,a.kt)(o.Z,{mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\StaticReflection\\src\\StaticReflectionDemo\\obj\\GX\\StaticReflection.CodeGen\\StaticReflection.CodeGen.Generators.StaticReflectionGenerator\\PersonReflection.g.cs",label:"PersonReflection.g.cs",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n#pragma warning disable CS9082\n#pragma warning disable CS8669\nnamespace StaticReflectionDemo\n{\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]\n    [global::System.Diagnostics.DebuggerStepThrough]\n    [global::System.Runtime.CompilerServices.CompilerGenerated]\n    internal sealed class PersonReflection : StaticReflection.ITypeDefine\n    {\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]\n        [global::System.Diagnostics.DebuggerStepThrough]\n        [global::System.Runtime.CompilerServices.CompilerGenerated]\n        internal sealed class Person0PReflection : StaticReflection.IMemberInvokeDefine<StaticReflectionDemo.Person, string>, StaticReflection.IPropertyDefine, StaticReflection.IMemberAnonymousInvokeDefine\n        {\n            public static readonly Person0PReflection Instance = new Person0PReflection();\n            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);\n            public System.String Name { get; } = "FirstName";\n            public System.String MetadataName { get; } = "FirstName";\n            public System.Boolean IsVirtual { get; } = false;\n            public System.Boolean IsStatic { get; } = false;\n            public System.Boolean IsOverride { get; } = false;\n            public System.Boolean IsAbstract { get; } = false;\n            public System.Boolean IsSealed { get; } = false;\n            public System.Boolean IsDefinition { get; } = true;\n            public System.Boolean IsExtern { get; } = false;\n            public System.Boolean IsImplicitlyDeclared { get; } = false;\n            public System.Boolean CanBeReferencedByName { get; } = true;\n            public System.Boolean IsPublic { get; } = true;\n            public System.Boolean IsPrivate { get; } = false;\n            public System.Boolean IsProtected { get; } = false;\n            public System.Boolean IsInternal { get; } = false;\n            public System.Type PropertyType { get; } = typeof(string);\n            public System.Boolean CanRead { get; } = true;\n            public System.Boolean CanWrite { get; } = true;\n            public System.Boolean IsRequired { get; } = false;\n            public System.Boolean IsWithEvents { get; } = false;\n            public System.Boolean ReturnsByRef { get; } = false;\n            public System.Boolean ReturnsByRefReadonly { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> GetterAttributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> SetterAttributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]\n            {\n            };\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public string GetValue(Person instance)\n            {\n                return instance.FirstName;\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public void SetValue(Person instance, string value)\n            {\n                instance.FirstName = value;\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public void SetValueAnonymous(object instance, object value)\n            {\n                SetValue((StaticReflectionDemo.Person)instance, (string)value);\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public object GetValueAnonymous(object instance)\n            {\n                return (object)GetValue((StaticReflectionDemo.Person)instance);\n            }\n        }\n\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]\n        [global::System.Diagnostics.DebuggerStepThrough]\n        [global::System.Runtime.CompilerServices.CompilerGenerated]\n        internal sealed class Person1PReflection : StaticReflection.IMemberInvokeDefine<StaticReflectionDemo.Person, string>, StaticReflection.IPropertyDefine, StaticReflection.IMemberAnonymousInvokeDefine\n        {\n            public static readonly Person1PReflection Instance = new Person1PReflection();\n            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);\n            public System.String Name { get; } = "LastName";\n            public System.String MetadataName { get; } = "LastName";\n            public System.Boolean IsVirtual { get; } = false;\n            public System.Boolean IsStatic { get; } = false;\n            public System.Boolean IsOverride { get; } = false;\n            public System.Boolean IsAbstract { get; } = false;\n            public System.Boolean IsSealed { get; } = false;\n            public System.Boolean IsDefinition { get; } = true;\n            public System.Boolean IsExtern { get; } = false;\n            public System.Boolean IsImplicitlyDeclared { get; } = false;\n            public System.Boolean CanBeReferencedByName { get; } = true;\n            public System.Boolean IsPublic { get; } = true;\n            public System.Boolean IsPrivate { get; } = false;\n            public System.Boolean IsProtected { get; } = false;\n            public System.Boolean IsInternal { get; } = false;\n            public System.Type PropertyType { get; } = typeof(string);\n            public System.Boolean CanRead { get; } = true;\n            public System.Boolean CanWrite { get; } = true;\n            public System.Boolean IsRequired { get; } = false;\n            public System.Boolean IsWithEvents { get; } = false;\n            public System.Boolean ReturnsByRef { get; } = false;\n            public System.Boolean ReturnsByRefReadonly { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> GetterAttributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> SetterAttributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]\n            {\n            };\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public string GetValue(Person instance)\n            {\n                return instance.LastName;\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public void SetValue(Person instance, string value)\n            {\n                instance.LastName = value;\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public void SetValueAnonymous(object instance, object value)\n            {\n                SetValue((StaticReflectionDemo.Person)instance, (string)value);\n            }\n\n            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public object GetValueAnonymous(object instance)\n            {\n                return (object)GetValue((StaticReflectionDemo.Person)instance);\n            }\n        }\n\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]\n        [global::System.Diagnostics.DebuggerStepThrough]\n        [global::System.Runtime.CompilerServices.CompilerGenerated]\n        internal sealed class Person0MReflection : StaticReflection.IMethodDefine, StaticReflection.Invoking.IArgsMethod<StaticReflectionDemo.Person, string>, StaticReflection.Invoking.IArgs0AnonymousMethod, StaticReflection.Invoking.IUsualArgsMethod<StaticReflectionDemo.Person, string>, StaticReflection.Invoking.IUsualArgs0AnonymousMethod\n        {\n            public static readonly Person0MReflection Instance = new Person0MReflection();\n            private Person0MReflection()\n            {\n            }\n\n            public System.String Name { get; } = "Name";\n            public System.String MetadataName { get; } = "Name";\n            public System.Boolean IsVirtual { get; } = false;\n            public System.Boolean IsStatic { get; } = false;\n            public System.Boolean IsOverride { get; } = false;\n            public System.Boolean IsAbstract { get; } = false;\n            public System.Boolean IsSealed { get; } = false;\n            public System.Boolean IsDefinition { get; } = true;\n            public System.Boolean IsExtern { get; } = false;\n            public System.Boolean IsImplicitlyDeclared { get; } = false;\n            public System.Boolean CanBeReferencedByName { get; } = true;\n            public System.Boolean IsPublic { get; } = true;\n            public System.Boolean IsPrivate { get; } = false;\n            public System.Boolean IsProtected { get; } = false;\n            public System.Boolean IsInternal { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);\n            public System.Boolean ReturnsByRef { get; } = false;\n            public StaticReflection.StaticMethodKind MethodKind { get; } = StaticReflection.StaticMethodKind.Ordinary;\n            public StaticReflection.StaticRefKind RefKind { get; } = StaticReflection.StaticRefKind.None;\n            public StaticReflection.StaticNullableAnnotation ReturnNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;\n            public StaticReflection.StaticNullableAnnotation ReceiverNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;\n            public System.Boolean ReturnsByRefReadonly { get; } = false;\n            public System.Type ReturnType { get; } = typeof(string);\n            public System.Collections.Generic.IReadOnlyList<System.Type> ArgumentTypes { get; } = new System.Type[]\n            {\n            };\n            public System.Boolean IsGenericMethod { get; } = false;\n            public System.Int32 Arity { get; } = 0;\n            public System.Boolean IsExtensionMethod { get; } = false;\n            public System.Boolean IsAsync { get; } = false;\n            public System.Boolean IsVararg { get; } = false;\n            public System.Boolean IsCheckedBuiltin { get; } = false;\n            public System.Boolean HidesBaseMethodsByName { get; } = false;\n            public System.Boolean ReturnsVoid { get; } = false;\n            public System.Boolean IsReadOnly { get; } = false;\n            public System.Boolean IsInitOnly { get; } = false;\n            public System.Boolean IsPartialDefinition { get; } = false;\n            public System.Boolean IsConditional { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<StaticReflection.ITypeArgumentDefine> TypeArguments { get; } = new StaticReflection.ITypeArgumentDefine[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> ReturnTypeAttributes { get; } = new System.Attribute[]\n            {\n            };\n\n            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public \n#if !NET7_0_OR_GREATER\n            unsafe \n#endif\n            ref string Invoke(StaticReflectionDemo.Person instance)\n            {\n                ref string result = ref System.Runtime.CompilerServices.Unsafe.AsRef(instance.Name());\n                return ref result;\n            }\n\n            public \n#if !NET7_0_OR_GREATER\n            unsafe \n#endif\n            ref object InvokeAnonymous(object instance)\n            {\n                return ref System.Runtime.CompilerServices.Unsafe.AsRef<object>(Invoke((StaticReflectionDemo.Person)instance));\n            }\n\n            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public string InvokeUsual(StaticReflectionDemo.Person instance)\n            {\n                return instance.Name();\n            }\n\n            public object InvokeUsualAnonymous(object instance)\n            {\n                return InvokeUsual((StaticReflectionDemo.Person)instance);\n            }\n        }\n\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("StaticReflection.CodeGen", "1.0.0")]\n        [global::System.Diagnostics.DebuggerStepThrough]\n        [global::System.Runtime.CompilerServices.CompilerGenerated]\n        internal sealed class Person0CReflection : StaticReflection.IConstructorDefine, StaticReflection.Invoking.IArgsMethod<StaticReflectionDemo.Person, StaticReflectionDemo.Person>, StaticReflection.Invoking.IArgs0AnonymousMethod, StaticReflection.Invoking.IUsualArgsMethod<StaticReflectionDemo.Person, StaticReflectionDemo.Person>, StaticReflection.Invoking.IUsualArgs0AnonymousMethod\n        {\n            public static readonly Person0CReflection Instance = new Person0CReflection();\n            private Person0CReflection()\n            {\n            }\n\n            public System.String Name { get; } = ".ctor";\n            public System.String MetadataName { get; } = ".ctor";\n            public System.Boolean IsVirtual { get; } = false;\n            public System.Boolean IsStatic { get; } = false;\n            public System.Boolean IsOverride { get; } = false;\n            public System.Boolean IsAbstract { get; } = false;\n            public System.Boolean IsSealed { get; } = false;\n            public System.Boolean IsDefinition { get; } = true;\n            public System.Boolean IsExtern { get; } = false;\n            public System.Boolean IsImplicitlyDeclared { get; } = true;\n            public System.Boolean CanBeReferencedByName { get; } = false;\n            public System.Boolean IsPublic { get; } = true;\n            public System.Boolean IsPrivate { get; } = false;\n            public System.Boolean IsProtected { get; } = false;\n            public System.Boolean IsInternal { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]\n            {\n            };\n            public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);\n            public System.Boolean ReturnsByRef { get; } = false;\n            public StaticReflection.StaticMethodKind MethodKind { get; } = StaticReflection.StaticMethodKind.Constructor;\n            public StaticReflection.StaticRefKind RefKind { get; } = StaticReflection.StaticRefKind.None;\n            public StaticReflection.StaticNullableAnnotation ReturnNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;\n            public StaticReflection.StaticNullableAnnotation ReceiverNullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.NotAnnotated;\n            public System.Boolean ReturnsByRefReadonly { get; } = false;\n            public System.Type ReturnType { get; } = typeof(StaticReflectionDemo.Person);\n            public System.Collections.Generic.IReadOnlyList<System.Type> ArgumentTypes { get; } = new System.Type[]\n            {\n            };\n            public System.Boolean IsGenericMethod { get; } = false;\n            public System.Int32 Arity { get; } = 0;\n            public System.Boolean IsExtensionMethod { get; } = false;\n            public System.Boolean IsAsync { get; } = false;\n            public System.Boolean IsVararg { get; } = false;\n            public System.Boolean IsCheckedBuiltin { get; } = false;\n            public System.Boolean HidesBaseMethodsByName { get; } = false;\n            public System.Boolean ReturnsVoid { get; } = true;\n            public System.Boolean IsReadOnly { get; } = false;\n            public System.Boolean IsInitOnly { get; } = false;\n            public System.Boolean IsPartialDefinition { get; } = false;\n            public System.Boolean IsConditional { get; } = false;\n            public System.Collections.Generic.IReadOnlyList<StaticReflection.ITypeArgumentDefine> TypeArguments { get; } = new StaticReflection.ITypeArgumentDefine[]\n            {\n            };\n            public System.Collections.Generic.IReadOnlyList<System.Attribute> ReturnTypeAttributes { get; } = new System.Attribute[]\n            {\n            };\n\n            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public \n#if !NET7_0_OR_GREATER\n            unsafe \n#endif\n            ref StaticReflectionDemo.Person Invoke(StaticReflectionDemo.Person instance)\n            {\n                ref StaticReflectionDemo.Person result = ref System.Runtime.CompilerServices.Unsafe.AsRef(new Person());\n                return ref result;\n            }\n\n            public \n#if !NET7_0_OR_GREATER\n            unsafe \n#endif\n            ref object InvokeAnonymous(object instance)\n            {\n                return ref System.Runtime.CompilerServices.Unsafe.AsRef<object>(Invoke((StaticReflectionDemo.Person)instance));\n            }\n\n            [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]\n            public StaticReflectionDemo.Person InvokeUsual(StaticReflectionDemo.Person instance)\n            {\n                return new Person();\n            }\n\n            public object InvokeUsualAnonymous(object instance)\n            {\n                return InvokeUsual((StaticReflectionDemo.Person)instance);\n            }\n        }\n\n        public static readonly PersonReflection Instance = new PersonReflection();\n        public System.Type DeclareType { get; } = typeof(StaticReflectionDemo.Person);\n        public System.String Name { get; } = "Person";\n        public System.String MetadataName { get; } = "Person";\n        public System.Boolean IsVirtual { get; } = false;\n        public System.Boolean IsStatic { get; } = false;\n        public System.Boolean IsOverride { get; } = false;\n        public System.Boolean IsAbstract { get; } = false;\n        public System.Boolean IsSealed { get; } = false;\n        public System.Boolean IsDefinition { get; } = true;\n        public System.Boolean IsExtern { get; } = false;\n        public System.Boolean IsImplicitlyDeclared { get; } = false;\n        public System.Boolean CanBeReferencedByName { get; } = true;\n        public System.Boolean IsPublic { get; } = false;\n        public System.Boolean IsPrivate { get; } = false;\n        public System.Boolean IsProtected { get; } = false;\n        public System.Boolean IsInternal { get; } = true;\n        public System.Type? BaseType { get; } = typeof(StaticReflectionDemo.Person);\n        public System.Boolean IsReferenceType { get; } = true;\n        public System.Boolean IsValueType { get; } = false;\n        public System.Boolean IsAnonymousType { get; } = false;\n        public System.Boolean IsTupleType { get; } = false;\n        public System.Boolean IsNativeIntegerType { get; } = false;\n        public System.Boolean IsRefLikeType { get; } = false;\n        public System.Boolean IsUnmanagedType { get; } = false;\n        public System.Boolean IsReadOnly { get; } = false;\n        public System.Boolean IsRecord { get; } = false;\n        public System.Int32 TypeKind { get; } = 2;\n        public StaticReflection.StaticNullableAnnotation NullableAnnotation { get; } = StaticReflection.StaticNullableAnnotation.None;\n        public System.Collections.Generic.IReadOnlyList<System.String> Interfaces { get; } = new System.String[]\n        {\n        };\n        public System.Collections.Generic.IReadOnlyList<System.String> AllInterfaces { get; } = new System.String[]\n        {\n        };\n        public System.Collections.Generic.IReadOnlyList<System.Attribute> Attributes { get; } = new System.Attribute[]\n        {\n            new StaticReflection.Annotions.StaticReflectionAttribute()\n            {\n            }\n        };\n        public System.Collections.Generic.IReadOnlyList<StaticReflection.IPropertyDefine> Properties { get; } = new StaticReflection.IPropertyDefine[]\n        {\n            Person0PReflection.Instance,\n            Person1PReflection.Instance\n        };\n        public System.Collections.Generic.IReadOnlyList<StaticReflection.IMethodDefine> Methods { get; } = new StaticReflection.IMethodDefine[]\n        {\n            Person0MReflection.Instance\n        };\n        public System.Collections.Generic.IReadOnlyList<StaticReflection.IEventDefine> Events { get; } = new StaticReflection.IEventDefine[]\n        {\n        };\n        public System.Collections.Generic.IReadOnlyList<StaticReflection.IFieldDefine> Fields { get; } = new StaticReflection.IFieldDefine[]\n        {\n        };\n        public System.Collections.Generic.IReadOnlyList<StaticReflection.IConstructorDefine> Constructors { get; } = new StaticReflection.IConstructorDefine[]\n        {\n            Person0CReflection.Instance\n        };\n    }\n}\n')))),(0,a.kt)("h2",{id:"usefull"},"Usefull"),(0,a.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("a",{target:"_blank",href:n(69853).Z},"Download Example project StaticReflection "))),(0,a.kt)("h3",{id:"share-staticreflection"},"Share StaticReflection"),(0,a.kt)("ul",null,(0,a.kt)("li",null,(0,a.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&quote=StaticReflection",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&text=StaticReflection:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&title=StaticReflection",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,a.kt)("li",null,(0,a.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection&title=StaticReflection&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStaticReflection",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/StaticReflection"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/StaticReflection")),(0,a.kt)("h2",{id:"in-the-same-category-enhancementclass"},"In the same category (EnhancementClass)"),(0,a.kt)("h3",{id:"apparatusaot"},(0,a.kt)("a",{parentName:"h3",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,a.kt)("h3",{id:"aspectgenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/AspectGenerator"},"AspectGenerator")),(0,a.kt)("h3",{id:"buildergenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/BuilderGenerator"},"BuilderGenerator")),(0,a.kt)("h3",{id:"dudnet"},(0,a.kt)("a",{parentName:"h3",href:"/docs/DudNet"},"DudNet")),(0,a.kt)("h3",{id:"fastgenericnew"},(0,a.kt)("a",{parentName:"h3",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,a.kt)("h3",{id:"generatorequals"},(0,a.kt)("a",{parentName:"h3",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,a.kt)("h3",{id:"hsusgsync"},(0,a.kt)("a",{parentName:"h3",href:"/docs/HsuSgSync"},"HsuSgSync")),(0,a.kt)("h3",{id:"immutype"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Immutype"},"Immutype")),(0,a.kt)("h3",{id:"lingaudit"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Ling.Audit"},"Ling.Audit")),(0,a.kt)("h3",{id:"lomboknet"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,a.kt)("h3",{id:"m31fluentapi"},(0,a.kt)("a",{parentName:"h3",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,a.kt)("h3",{id:"memorypack"},(0,a.kt)("a",{parentName:"h3",href:"/docs/MemoryPack"},"MemoryPack")),(0,a.kt)("h3",{id:"meziantoupolyfill"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Meziantou.Polyfill"},"Meziantou.Polyfill")),(0,a.kt)("h3",{id:"microsoftextensionslogging"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,a.kt)("h3",{id:"microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},"Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator")),(0,a.kt)("h3",{id:"microsoftinteropjavascriptjsimportgenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,a.kt)("h3",{id:"optiontostringgenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/OptionToStringGenerator"},"OptionToStringGenerator")),(0,a.kt)("h3",{id:"rscg_decorator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/RSCG_Decorator"},"RSCG_Decorator")),(0,a.kt)("h3",{id:"rscg_utilitytypes"},(0,a.kt)("a",{parentName:"h3",href:"/docs/RSCG_UtilityTypes"},"RSCG_UtilityTypes")),(0,a.kt)("h3",{id:"syncmethodgenerator"},(0,a.kt)("a",{parentName:"h3",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,a.kt)("h3",{id:"systemruntimeinteropservices"},(0,a.kt)("a",{parentName:"h3",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")),(0,a.kt)("h3",{id:"systemtextregularexpressions"},(0,a.kt)("a",{parentName:"h3",href:"/docs/System.Text.RegularExpressions"},"System.Text.RegularExpressions")),(0,a.kt)("h3",{id:"telemetrylogging"},(0,a.kt)("a",{parentName:"h3",href:"/docs/TelemetryLogging"},"TelemetryLogging")))}f.isMDXComponent=!0},69853:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/files/StaticReflection-236be561d1853a3fb9df9b8b2d6e3f08.zip"}}]);