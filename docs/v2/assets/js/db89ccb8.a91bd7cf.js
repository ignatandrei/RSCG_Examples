"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2183],{9174:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>m,default:()=>g,frontMatter:()=>s,metadata:()=>p,toc:()=>u});var a=n(7462),i=(n(7294),n(4137)),r=n(3992),o=n(425),l=n(8839);const s={sidebar_position:550,title:"55 - M31.FluentAPI",description:"Builder for your class. But the order counts - generates a new interface each time",slug:"/M31.FluentAPI"},m="M31.FluentAPI  by Kevin Schaal",p={unversionedId:"RSCG-Examples/M31.FluentAPI",id:"RSCG-Examples/M31.FluentAPI",title:"55 - M31.FluentAPI",description:"Builder for your class. But the order counts - generates a new interface each time",source:"@site/docs/RSCG-Examples/M31.FluentAPI.md",sourceDirName:"RSCG-Examples",slug:"/M31.FluentAPI",permalink:"/RSCG_Examples/v2/docs/M31.FluentAPI",draft:!1,tags:[],version:"current",sidebarPosition:550,frontMatter:{sidebar_position:550,title:"55 - M31.FluentAPI",description:"Builder for your class. But the order counts - generates a new interface each time",slug:"/M31.FluentAPI"},sidebar:"tutorialSidebar",previous:{title:"54 - AutoDTO",permalink:"/RSCG_Examples/v2/docs/AutoDTO"},next:{title:"Microsoft Examples",permalink:"/RSCG_Examples/v2/docs/category/microsoft-examples"}},d={},u=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share M31.FluentAPI",id:"share-m31fluentapi",level:3}],h={toc:u},c="wrapper";function g(e){let{components:t,...s}=e;return(0,i.kt)(c,(0,a.Z)({},h,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"m31fluentapi--by-kevin-schaal"},"M31.FluentAPI  by Kevin Schaal"),(0,i.kt)(l.Z,{toc:u,mdxType:"TOCInline"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/M31.FluentAPI/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/M31.FluentAPI?label=M31.FluentAPI",alt:"Nuget"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/m31coding/M31.FluentAPI"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/m31coding/M31.FluentAPI?label=updated",alt:"GitHub last commit"})),"\n",(0,i.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/m31coding/M31.FluentAPI?style=social",alt:"GitHub Repo stars"})),(0,i.kt)("h2",{id:"details"},"Details"),(0,i.kt)("h3",{id:"info"},"Info"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Name: ",(0,i.kt)("strong",{parentName:"p"},"M31.FluentAPI")),(0,i.kt)("p",{parentName:"admonition"},"Generate fluent APIs in C#."),(0,i.kt)("p",{parentName:"admonition"},"Author: Kevin Schaal"),(0,i.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,i.kt)("em",{parentName:"p"},(0,i.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/M31.FluentAPI/"},"https://www.nuget.org/packages/M31.FluentAPI/")),"   "),(0,i.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,i.kt)("a",{parentName:"p",href:"https://www.m31coding.com/blog/fluent-api.html"},"https://www.m31coding.com/blog/fluent-api.html")),(0,i.kt)("p",{parentName:"admonition"},"Source : ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/m31coding/M31.FluentAPI"},"https://github.com/m31coding/M31.FluentAPI"))),(0,i.kt)("h3",{id:"original-readme"},"Original Readme"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("h1",{parentName:"admonition",id:"fluent-apis-in-c"},"Fluent APIs in C#"),(0,i.kt)("p",{parentName:"admonition"},"Everybody wants to use fluent APIs but writing them is tedious. With this library providing fluent APIs for your classes becomes a breeze. Simply annotate them with attributes and the source code for the fluent API will be generated. The fluent API library leverages incremental source code generation at development time and your IDE will offer you the corresponding code completion immediately."),(0,i.kt)("p",{parentName:"admonition"},"The generated code follows the builder design pattern and allows you to construct objects step by step. This approach avoids big constructors and results in very readable code. "),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://github.com/m31coding/M31.BinarySearchTrees/blob/master/LICENSE"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/license-MIT-brightgreen",alt:"license"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://dotnet.microsoft.com/en-us/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/.NET-Standard%202.0-6D429C",alt:".net version"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/M31.FluentApi/"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/M31.FluentApi",alt:"version"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/m31coding/M31.FluentAPI/actions/workflows/ci.yml"},(0,i.kt)("img",{parentName:"a",src:"https://github.com/m31coding/M31.FluentAPI/actions/workflows/ci.yml/badge.svg",alt:"CI"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://www.m31coding.com"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/www-m31coding.com-34345B",alt:"m31coding"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/channel/UC6CZ_Bcyql1kfHZvx9W85mA"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/youtube-kevin%20schaal-FF0000.svg",alt:"youtube"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://twitter.com/m31coding"},(0,i.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/twitter-@m31coding-1DA1F2.svg",alt:"twitter"}))),(0,i.kt)("p",{parentName:"admonition"},"Accompanying blog post: ",(0,i.kt)("a",{parentName:"p",href:"https://www.m31coding.com/blog/fluent-api.html"},"www.m31coding.com>blog>fluent-api")),(0,i.kt)("h1",{parentName:"admonition",id:"installing-via-nuget"},"Installing via NuGet"),(0,i.kt)("p",{parentName:"admonition"},"Install the latest version of the package ",(0,i.kt)("inlineCode",{parentName:"p"},"M31.FluentAPI")," via your IDE or use the package manager console:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre"},"PM> Install-Package M31.FluentApi\n")),(0,i.kt)("p",{parentName:"admonition"},"A package reference will be added to your ",(0,i.kt)("inlineCode",{parentName:"p"},"csproj")," file. Moreover, since this library provides code via source code generation, consumers of your project don't need the reference to ",(0,i.kt)("inlineCode",{parentName:"p"},"M31.FluentAPI"),". Therefore, it is recommended to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"PrivateAssets")," metadata tag:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},'<PackageReference Include="M31.FluentApi" Version="1.0.0" PrivateAssets="all"/>\n')),(0,i.kt)("p",{parentName:"admonition"},"If you would like to examine the generated code, you may emit it by adding the following lines to your ",(0,i.kt)("inlineCode",{parentName:"p"},"csproj")," file:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-xml"},"<PropertyGroup>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n</PropertyGroup>\n")),(0,i.kt)("p",{parentName:"admonition"},"The code can then be found in the ",(0,i.kt)("inlineCode",{parentName:"p"},"obj/Generated")," folder."),(0,i.kt)("h1",{parentName:"admonition",id:"usage"},"Usage"),(0,i.kt)("p",{parentName:"admonition"},"If you use this library for the first time I recommend that you read the storybook: M31.FluentApi.Storybook.csproj>Program.cs."),(0,i.kt)("p",{parentName:"admonition"},"Here is an example that uses all of the available attributes:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-cs"},'[FluentApi]\npublic class Student\n{\n    [FluentMember(0, "Named", 0)]\n    public string FirstName { get; private set; }\n\n    [FluentMember(0, "Named", 1)]\n    public string LastName { get; private set; }\n\n    [FluentMember(1, "OfAge")]\n    public int Age { get; private set; }\n\n    [FluentMethod(1)]\n    private void BornOn(DateOnly dateOfBirth)\n    {\n        DateOnly today = DateOnly.FromDateTime(DateTime.Today);\n        int age = today.Year - dateOfBirth.Year;\n        if (dateOfBirth > today.AddYears(-age)) age--;\n        Age = age;\n    }\n\n    [FluentMember(2, "InSemester")]\n    [FluentDefault("WhoStartsUniversity")]\n    public int Semester { get; private set; } = 0;\n\n    [FluentMember(3, "LivingIn")]\n    [FluentDefault("LivingInBoston")]\n    [FluentNullable("InUnknownCity")]\n    public string? City { get; private set; } = "Boston";\n\n    [FluentPredicate(4, "WhoIsHappy", "WhoIsSad")]\n    [FluentNullable("WithUnknownMood")]\n    public bool? IsHappy { get; private set; }\n\n    [FluentCollection(5, "Friend", "WhoseFriendsAre", "WhoseFriendIs", "WhoHasNoFriends")]\n    public IReadOnlyCollection<string> Friends { get; private set; }\n }\n')),(0,i.kt)("p",{parentName:"admonition"},"You may have a look at the generated code for this example: CreateStudent.g.cs. Note that if you use private members or properties with a private set accessor, as it is the case in this example, the generated code will use reflection in order to set the properties 'by force'."),(0,i.kt)("h2",{parentName:"admonition",id:"attributes"},"Attributes"),(0,i.kt)("p",{parentName:"admonition"},"The attributes ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentApi")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMember")," are the basic attributes; they are all you need in order to get started. The attributes ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentPredicate")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentCollection")," can be used instead of a ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMember")," attribute if the decorated member is a boolean or a collection, respectively. ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentDefault")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentNullable")," are orthogonal attributes and used in combination with the attributes above. Finally, the ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMethod")," attribute is used for custom implementations."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentapi"},"FluentApi"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentApiAttribute(string builderClassName = "Create{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Use this attribute for your class / struct / record. The optional parameter allows you to specify the name of the builder class that will be generated. Within the argument the template ",(0,i.kt)("inlineCode",{parentName:"p"},"{Name}")," can be used, which will be replaced by the name of your decorated type."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentmember"},"FluentMember"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentMemberAttribute(int builderStep, string method = "With{Name}", int parameterPosition = 0)'),(0,i.kt)("p",{parentName:"admonition"},"Use this attribute for fields and properties of your class. They can be private but properties must have a set accessor. The ",(0,i.kt)("inlineCode",{parentName:"p"},"builderStep")," parameter specifies the step in which the member can be set. With the method parameter you can specify the name of the builder method."),(0,i.kt)("p",{parentName:"admonition"},"If two ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMember")," attributes with the same builder step are used, either a compound method or a fork will be created.\nIf the specified method names are equal, a compound method will be created, which is a builder method that sets multiple properties at once. See the ",(0,i.kt)("inlineCode",{parentName:"p"},"WithName")," method in the example above. For compounds the position of the parameters can be controlled by the last parameter of this attribute.",(0,i.kt)("br",null),"\nIf the specified method names differ, a fork will be created. That means that there are multiple methods at this step but you can call only one. See the ",(0,i.kt)("inlineCode",{parentName:"p"},"OfAge")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"BornOn")," methods in the example above."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentpredicate"},"FluentPredicate"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentPredicateAttribute(int builderStep, string method = "{Name}", string negatedMethod = "Not{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Can be used instead of a ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMember")," attribute if the decorated member is of type ",(0,i.kt)("inlineCode",{parentName:"p"},"bool"),". This attribute generates two methods, one for setting the value of the member to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," and one for setting it to ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentcollection"},"FluentCollection"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentCollectionAttribute(\nint builderStep,\nstring singularName,\nstring withItems = "With{Name}",\nstring withItem = "With{SingularName}",\nstring withZeroItems = "WithZero{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Can be used instead of a ",(0,i.kt)("inlineCode",{parentName:"p"},"FluentMember")," attribute if the decorated member is a collection. This attribute generates methods for setting multiple items, one item and zero items. The supported collection types can be seen in the source file CollectionInference.cs. "),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentdefault"},"FluentDefault"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentDefaultAttribute(string method = "WithDefault{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Can be used for fields and properties in addition to other attributes. When the generated builder method is called the member will keep its initial value."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentnullable"},"FluentNullable"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentNullableAttribute(string method = "Without{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Can be used for fields and properties in addition to other attributes. Generates a builder method that sets the member to ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,i.kt)("hr",{parentName:"admonition"}),(0,i.kt)("h3",{parentName:"admonition",id:"fluentmethod"},"FluentMethod"),(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("strong",{parentName:"p"},"Definition"),': FluentMethodAttribute(int builderStep, string method = "{Name}")'),(0,i.kt)("p",{parentName:"admonition"},"Use this attribute on methods in order to provide a custom implementation for setting values or triggering additional behavior. The decorated method must return ",(0,i.kt)("inlineCode",{parentName:"p"},"void"),"."),(0,i.kt)("h1",{parentName:"admonition",id:"when-not-to-use-this-library"},"When not to use this library"),(0,i.kt)("p",{parentName:"admonition"},"This library generates a builder class for initializing objects step by step. There are use cases for simpler builder classes that don't offer a step by step initialization. E.g. consider the following API for combining hash codes:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-cs"},'HashCode hashCode = new HashCode()\n    .Add(42).Add(3.14).AddSequence(new[] { 1, 2, 3 }).Add("Hello world");\n')),(0,i.kt)("p",{parentName:"admonition"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Add")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"AddSequence")," methods can be called any number of times and in any order. This behavior can not be modeled with the fluent API library. In order to create such a builder class I suggest to write the code by hand, since the implementation is straight forward and does not require a lot of additional code."),(0,i.kt)("h1",{parentName:"admonition",id:"problems-with-the-ide"},"Problems with the IDE"),(0,i.kt)("p",{parentName:"admonition"},"As of 2023 code generation with Roslyn is still a relatively new feature but is already supported quite well in Visual Studio and Rider. Since code generation is potentially triggered with every single key stroke, there are sometimes situations where the code completion index of the IDE does not keep up with all the changes."),(0,i.kt)("p",{parentName:"admonition"},"In particular, if your IDE visually indicates that there are errors in your code but it compiles and runs just fine, try the following things:"),(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"Rebuild the project or the whole solution"),(0,i.kt)("li",{parentName:"ul"},"Unload and reload the project"),(0,i.kt)("li",{parentName:"ul"},"Close and reopen the IDE"),(0,i.kt)("li",{parentName:"ul"},"Remove the .vs folder (Visual Studio) or the .idea folder (Rider)")),(0,i.kt)("h1",{parentName:"admonition",id:"contributing"},"Contributing"),(0,i.kt)("p",{parentName:"admonition"},"Would you like to improve this project? You are kindly invited to contribute. If you would like to implement a new feature, please create a GitHub issue and you will receive timely feedback."),(0,i.kt)("p",{parentName:"admonition"},"Happy coding!")),(0,i.kt)("h3",{id:"about"},"About"),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Builder for your class. But the order counts - generates a new interface each time")),(0,i.kt)("h2",{id:"how-to-use"},"How to use"),(0,i.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,i.kt)(r.Z,{mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,i.kt)("p",null,"This is the CSharp Project that references ",(0,i.kt)("strong",{parentName:"p"},"M31.FluentAPI")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {10}",showLineNumbers:!0,"{10}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n    <ItemGroup>\n        <PackageReference Include="M31.FluentApi" Version="1.0.0" PrivateAssets="all"/>\n    </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\M31FluentAPI\\src\\M31FluentAPIDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"M31.FluentAPI")," in ",(0,i.kt)("em",{parentName:"p"},"Program.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using M31FluentAPIDemo;\n\nConsole.WriteLine("Hello, World!");\nvar p =CreatePerson\n    //the order does matter\n    .Named("Andrei","Ignat")\n    .HasDOB(null);\n\n'))),(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\M31FluentAPI\\src\\M31FluentAPIDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,i.kt)("p",null,"  This is the use of ",(0,i.kt)("strong",{parentName:"p"},"M31.FluentAPI")," in ",(0,i.kt)("em",{parentName:"p"},"Person.cs")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using M31.FluentApi.Attributes;\n\nnamespace M31FluentAPIDemo;\n[FluentApi]\ninternal class Person\n{\n    [FluentMember(0, "Named", 0)]\n    public string FirstName { get; set; } = string.Empty;\n    [FluentMember(0, "Named", 1)]\n    public string? LastName { get; set; }\n\n    [FluentMember(1, "HasDOB")]\n    public DateTime? DOB { get; set; }\n}\n\n')))),(0,i.kt)("h3",{id:"generated-files"},"Generated Files"),(0,i.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,i.kt)(r.Z,{mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\M31FluentAPI\\src\\M31FluentAPIDemo\\obj\\GX\\M31.FluentApi.Generator\\M31.FluentApi.Generator.SourceGenerators.SourceGenerator\\M31FluentAPIDemo.Person.fluentapi.g.cs",label:"M31FluentAPIDemo.Person.fluentapi.g.cs",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"// <auto-generated/>\n// This code was generated by the library M31.FluentAPI.\n// Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.\n\n#nullable enable\n\nusing M31.FluentApi.Attributes;\n\nnamespace M31FluentAPIDemo;\n\ninternal class CreatePerson : CreatePerson.IHasDOB\n{\n    private readonly Person person;\n\n    private CreatePerson()\n    {\n        person = new Person();\n    }\n\n    public static IHasDOB Named(string firstName, string? lastName)\n    {\n        CreatePerson createPerson = new CreatePerson();\n        createPerson.person.FirstName = firstName;\n        createPerson.person.LastName = lastName;\n        return createPerson;\n    }\n\n    public Person HasDOB(System.DateTime? dOB)\n    {\n        person.DOB = dOB;\n        return person;\n    }\n\n    internal interface IHasDOB\n    {\n        Person HasDOB(System.DateTime? dOB);\n    }\n}\n")))),(0,i.kt)("h2",{id:"usefull"},"Usefull"),(0,i.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{target:"_blank",href:n(7312).Z},"Download Example project M31.FluentAPI "))),(0,i.kt)("h3",{id:"share-m31fluentapi"},"Share M31.FluentAPI"),(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI&quote=M31.FluentAPI",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI&text=M31.FluentAPI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI&title=M31.FluentAPI",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,i.kt)("li",null,(0,i.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI&title=M31.FluentAPI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FM31.FluentAPI",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/M31.FluentAPI"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/M31.FluentAPI")))}g.isMDXComponent=!0},7312:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/M31.FluentAPI-7bfe1bb74cb982a4a9275ac4fbe19ca3.zip"}}]);