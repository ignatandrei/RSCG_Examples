"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[3569],{5139:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>p,toc:()=>m});var n=a(7462),r=(a(7294),a(4137)),i=a(3992),o=a(425),s=a(8839);const l={sidebar_position:130,title:"13 - QuickConstructor",description:"Fast add constructors that are read only FIELDS",slug:"/QuickConstructor"},c="QuickConstructor  by Flavien Charlon",p={unversionedId:"RSCG-Examples/QuickConstructor",id:"RSCG-Examples/QuickConstructor",title:"13 - QuickConstructor",description:"Fast add constructors that are read only FIELDS",source:"@site/docs/RSCG-Examples/QuickConstructor.md",sourceDirName:"RSCG-Examples",slug:"/QuickConstructor",permalink:"/RSCG_Examples/v2/docs/QuickConstructor",draft:!1,tags:[],version:"current",sidebarPosition:130,frontMatter:{sidebar_position:130,title:"13 - QuickConstructor",description:"Fast add constructors that are read only FIELDS",slug:"/QuickConstructor"},sidebar:"tutorialSidebar",previous:{title:"12 - System.Runtime.InteropServices",permalink:"/RSCG_Examples/v2/docs/System.Runtime.InteropServices"},next:{title:"14 - AutoCtor",permalink:"/RSCG_Examples/v2/docs/AutoCtor"}},u={},m=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Download PDF",id:"download-pdf",level:3},{value:"Share QuickConstructor",id:"share-quickconstructor",level:3}],d={toc:m},k="wrapper";function h(e){let{components:t,...l}=e;return(0,r.kt)(k,(0,n.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"quickconstructor--by-flavien-charlon"},"QuickConstructor  by Flavien Charlon"),(0,r.kt)(s.Z,{toc:m,mdxType:"TOCInline"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/QuickConstructor"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/QuickConstructor?label=QuickConstructor",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/flavien/QuickConstructor"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/flavien/QuickConstructor?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/flavien/QuickConstructor?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"QuickConstructor")),(0,r.kt)("p",{parentName:"admonition"},"Source generator that automatically creates a constructor from the fields and properties of a class."),(0,r.kt)("p",{parentName:"admonition"},"Author: Flavien Charlon"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/QuickConstructor"},"https://www.nuget.org/packages/QuickConstructor")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/flavien/QuickConstructor"},"https://github.com/flavien/QuickConstructor")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/flavien/QuickConstructor"},"https://github.com/flavien/QuickConstructor"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"quickconstructor"},"QuickConstructor"),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/QuickConstructor/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/v/QuickConstructor.svg?style=flat-square&color=blue&logo=nuget",alt:"QuickConstructor"}))),(0,r.kt)("p",{parentName:"admonition"},"QuickConstructor is a reliable and feature-rich source generator that can automatically emit a constructor from the fields and properties of a class. "),(0,r.kt)("h2",{parentName:"admonition",id:"features"},"Features"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Decorate any class with the ",(0,r.kt)("inlineCode",{parentName:"li"},"[QuickConstructor]")," attribute to automatically generate a constructor for that class."),(0,r.kt)("li",{parentName:"ul"},"The constructor updates in real-time as the class is modified."),(0,r.kt)("li",{parentName:"ul"},"Customize which fields and properties are initialized in the constructor."),(0,r.kt)("li",{parentName:"ul"},"Generate null checks automatically based on nullable annotations."),(0,r.kt)("li",{parentName:"ul"},"Works with nested classes and generic classes."),(0,r.kt)("li",{parentName:"ul"},"Supports derived classes."),(0,r.kt)("li",{parentName:"ul"},"Supports classes, records and structs."),(0,r.kt)("li",{parentName:"ul"},"Ability to place attributes on the parameters of the generated constructor."),(0,r.kt)("li",{parentName:"ul"},"No traces left after compilation, no runtime reference necessary."),(0,r.kt)("li",{parentName:"ul"},"Generate XML documentation automatically for the constructor."),(0,r.kt)("li",{parentName:"ul"},"Lightning fast thanks to the .NET 6.0 incremental source generator system.")),(0,r.kt)("h2",{parentName:"admonition",id:"example"},"Example"),(0,r.kt)("p",{parentName:"admonition"},"Code without QuickConstructor:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public class Car\n{\n    private readonly string _registration;\n    private readonly string _model;\n    private readonly string _make;\n    private readonly string _color;\n    private readonly int _year;\n\n    public Car(string registration, string model, string make, string color, int year)\n    {\n        _registration = registration;\n        _model = model;\n        _make = make;\n        _color = color;\n        _year = year;\n    }\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"With QuickConstructor, this becomes:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"[QuickConstructor]\npublic partial class Car\n{\n    private readonly string _registration;\n    private readonly string _model;\n    private readonly string _make;\n    private readonly string _color;\n    private readonly int _year;\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"The constructor is automatically generated from the field definitions."),(0,r.kt)("h2",{parentName:"admonition",id:"installation"},"Installation"),(0,r.kt)("p",{parentName:"admonition"},"The requirements to use the QuickConstructor package are the following:"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Visual Studio 17.0+"),(0,r.kt)("li",{parentName:"ul"},".NET SDK 6.0.100+")),(0,r.kt)("p",{parentName:"admonition"},"Install the NuGet package:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"dotnet add package QuickConstructor\n")),(0,r.kt)("h2",{parentName:"admonition",id:"usage"},"Usage"),(0,r.kt)("p",{parentName:"admonition"},"QuickConstructor is very easy to use. By simply decorating a class with the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]")," attribute and making the class ",(0,r.kt)("inlineCode",{parentName:"p"},"partial"),", the source generator will automatically create a constructor based on fields and properties declared in the class. The constructor will automatically update to reflect any change made to the class."),(0,r.kt)("p",{parentName:"admonition"},"QuickConstructor offers options to customize various aspects of the constructors being generated."),(0,r.kt)("h3",{parentName:"admonition",id:"fields-selection"},"Fields selection"),(0,r.kt)("p",{parentName:"admonition"},"Quick constructors will always initialize read-only fields as the constructor would otherwise cause a compilation error. However mutable fields can either be included or excluded from the constructor. This is controlled via the ",(0,r.kt)("inlineCode",{parentName:"p"},"Fields")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]")," attribute. The possible values are:"),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IncludeFields.ReadOnlyFields")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"(default)")," Only read-only fields are initialized in the constructor.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IncludeFields.AllFields")),(0,r.kt)("td",{parentName:"tr",align:null},"All fields are initialized in the constructor.")))),(0,r.kt)("p",{parentName:"admonition"},"Fields with an initializer are never included as part of the constructor."),(0,r.kt)("h3",{parentName:"admonition",id:"properties-selection"},"Properties selection"),(0,r.kt)("p",{parentName:"admonition"},"It is possible to control which property is initialized in the constructor via the ",(0,r.kt)("inlineCode",{parentName:"p"},"Properties")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]")," attribute. The possible values are:"),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IncludeProperties.None")),(0,r.kt)("td",{parentName:"tr",align:null},"No property is initialized in the constructor.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IncludeProperties.ReadOnlyProperties")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"(default)")," Only read-only auto-implemented properties are initialized in the constructor.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IncludeProperties.AllProperties")),(0,r.kt)("td",{parentName:"tr",align:null},"All settable properties are initialized in the constructor.")))),(0,r.kt)("p",{parentName:"admonition"},"Properties with an initializer are never included as part of the constructor."),(0,r.kt)("h3",{parentName:"admonition",id:"null-checks"},"Null checks"),(0,r.kt)("p",{parentName:"admonition"},"QuickConstructor has the ability to generate null checks for reference parameters. This is controlled via the ",(0,r.kt)("inlineCode",{parentName:"p"},"NullCheck")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]")," attribute. The possible values are:"),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NullChecks.Always")),(0,r.kt)("td",{parentName:"tr",align:null},"Null checks are generated for any field or property whose type is a reference type.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NullChecks.Never")),(0,r.kt)("td",{parentName:"tr",align:null},"Null checks are not generated for this constructor.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NullChecks.NonNullableReferencesOnly")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"(default)")," When null-state analysis is enabled (C# 8.0 and later), a null check will be generated only if a type is marked as non-nullable. When null-state analysis is disabled, no null check is generated.")))),(0,r.kt)("p",{parentName:"admonition"},"For example, with null-state analysis enabled:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"[QuickConstructor]\npublic partial class Name\n{\n    private readonly string _firstName;\n    private readonly string? _middleName;\n    private readonly string _lastName;\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"This code will result in the following constructor being generated:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public Name(string firstName, string? middleName, string lastName)\n{\n    if (firstName == null)\n        throw new ArgumentNullException(nameof(firstName));\n\n    if (lastName == null)\n        throw new ArgumentNullException(nameof(lastName));\n\n    this._firstName = firstName;\n    this._middleName = middleName;\n    this._lastName = lastName;\n}\n")),(0,r.kt)("h3",{parentName:"admonition",id:"explicitely-include-a-field-or-property"},"Explicitely include a field or property"),(0,r.kt)("p",{parentName:"admonition"},"It is possible to explicitely include a field or property by decorating it with the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructorParameter]"),"."),(0,r.kt)("p",{parentName:"admonition"},"For example:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"[QuickConstructor]\npublic partial class Vehicle\n{\n    [QuickConstructorParameter]\n    private int _mileage;\n\n    private int _speed;\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"will result in this constructor:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public Vehicle(int mileage)\n{\n    this._mileage = mileage;\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"While both ",(0,r.kt)("inlineCode",{parentName:"p"},"_mileage")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"_speed")," are mutable fields, and therefore are exluded by default, ",(0,r.kt)("inlineCode",{parentName:"p"},"_mileage")," does get initialized in the constructor because it is decorated with ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructorParameter]"),"."),(0,r.kt)("h3",{parentName:"admonition",id:"overriding-the-name-of-a-parameter"},"Overriding the name of a parameter"),(0,r.kt)("p",{parentName:"admonition"},"It is possible to override the name of a parameter in the constructor using the ",(0,r.kt)("inlineCode",{parentName:"p"},"Name")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructorParameter]")," attribute."),(0,r.kt)("p",{parentName:"admonition"},"This class:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'[QuickConstructor]\npublic partial class Vehicle\n{\n    [QuickConstructorParameter(Name = "startingMileage")]\n    private int _mileage;\n\n    private int _speed;\n}\n')),(0,r.kt)("p",{parentName:"admonition"},"will result in this constructor:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public Vehicle(int startingMileage)\n{\n    this._mileage = startingMileage;\n}\n")),(0,r.kt)("h3",{parentName:"admonition",id:"derived-classes"},"Derived classes"),(0,r.kt)("p",{parentName:"admonition"},"It is possible to generate a constructor for a class inheriting from a base class, however the base class must either itself be decorated with ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]"),", or it must have a parameterless constructor."),(0,r.kt)("p",{parentName:"admonition"},"For example:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"[QuickConstructor(Fields = IncludeFields.AllFields)]\npublic partial class Vehicle\n{\n    private int _mileage;\n    private int _speed;\n}\n\n[QuickConstructor]\npublic partial class Bus : Vehicle\n{\n    private readonly int _capacity;\n}\n")),(0,r.kt)("p",{parentName:"admonition"},"In that situation, a constructor will be generated for the ",(0,r.kt)("inlineCode",{parentName:"p"},"Bus")," class, with the following implementation:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public Bus(int mileage, int speed, int capacity)\n    : base(mileage, speed)\n{\n    this._capacity = capacity;\n}\n")),(0,r.kt)("h3",{parentName:"admonition",id:"constructor-accessibility"},"Constructor accessibility"),(0,r.kt)("p",{parentName:"admonition"},"It is possible to customize the accessibility level of the auto-generated constructor. This is controlled via the ",(0,r.kt)("inlineCode",{parentName:"p"},"ConstructorAccessibility")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"[QuickConstructor]")," attribute."),(0,r.kt)("h2",{parentName:"admonition",id:"license"},"License"),(0,r.kt)("p",{parentName:"admonition"},"Copyright 2022 Flavien Charlon"),(0,r.kt)("p",{parentName:"admonition"},'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at'),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"http://www.apache.org/licenses/LICENSE-2.0\n")),(0,r.kt)("p",{parentName:"admonition"},'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and limitations under the License.')),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Fast add constructors that are read only FIELDS"),(0,r.kt)("p",{parentName:"admonition"},"Has multiple other features")),(0,r.kt)("h2",{id:"how-to-use"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"QuickConstructor")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="QuickConstructor" Version="1.0.5" />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,r.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\QuickConstructor\\src\\QuickConstructorDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"QuickConstructor")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using QuickConstructorDemo;\n\nvar p = new Person("Andrei", "Ignat");\n'))),(0,r.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\QuickConstructor\\src\\QuickConstructorDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"QuickConstructor")," in ",(0,r.kt)("em",{parentName:"p"},"Person.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using QuickConstructor.Attributes;\n\nnamespace QuickConstructorDemo;\n\n[QuickConstructor]\ninternal partial class Person\n{\n    private readonly string FirstName;\n    private readonly string? LastName;\n\n    \n}\n\n")))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"C:\\gth\\RSCG_Examples\\v2\\rscg_examples\\QuickConstructor\\src\\QuickConstructorDemo\\obj\\GX\\QuickConstructor.Generator\\QuickConstructor.Generator.QuickConstructorGenerator\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'/// <auto-generated>\n/// This code was generated by the QuickConstructor source generator.\n/// </auto-generated>\n\n#nullable enable\n\nnamespace QuickConstructorDemo\n{\n    partial class Person\n    {\n        /// <summary>\n        /// Initializes a new instance of the <see cref="Person" /> class.\n        /// </summary>\n        public Person(string @firstName, string? @lastName)\n        {\n            if (@firstName == null)\n                throw new global::System.ArgumentNullException(nameof(@firstName));\n\n            this.@FirstName = @firstName;\n            this.@LastName = @lastName;\n        }\n    }\n}\n\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:a(2282).Z},"Download Example project QuickConstructor "))),(0,r.kt)("h3",{id:"download-pdf"},"Download PDF"),(0,r.kt)("p",null,(0,r.kt)("a",{target:"_blank",href:a(8758).Z},"Download PDF QuickConstructor ")),(0,r.kt)("h3",{id:"share-quickconstructor"},"Share QuickConstructor"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&quote=QuickConstructor",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&text=QuickConstructor:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&title=QuickConstructor",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&title=QuickConstructor&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/QuickConstructor"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/QuickConstructor")))}h.isMDXComponent=!0},8758:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/QuickConstructor-8438124baaff1885980f487c2e208f39.pdf"},2282:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/QuickConstructor-b3c4460b32f86aed4f2ba563566870aa.zip"}}]);