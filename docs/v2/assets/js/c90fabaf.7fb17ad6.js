"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2672],{3874:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>m,contentTitle:()=>u,default:()=>g,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var a=n(87462),o=(n(67294),n(3905)),r=n(73992),i=n(18679),s=n(68839);const l={sidebar_position:800,title:"80 - AutoConstructor",description:"Generating constructor for class with many properties",slug:"/AutoConstructor"},u="AutoConstructor  by K\xe9vin Gallienne",p={unversionedId:"RSCG-Examples/AutoConstructor",id:"RSCG-Examples/AutoConstructor",title:"80 - AutoConstructor",description:"Generating constructor for class with many properties",source:"@site/docs/RSCG-Examples/AutoConstructor.md",sourceDirName:"RSCG-Examples",slug:"/AutoConstructor",permalink:"/RSCG_Examples/v2/docs/AutoConstructor",draft:!1,tags:[],version:"current",sidebarPosition:800,frontMatter:{sidebar_position:800,title:"80 - AutoConstructor",description:"Generating constructor for class with many properties",slug:"/AutoConstructor"},sidebar:"tutorialSidebar",previous:{title:"79 - DudNet",permalink:"/RSCG_Examples/v2/docs/DudNet"},next:{title:"81 - N.SourceGenerators.UnionTypes",permalink:"/RSCG_Examples/v2/docs/N.SourceGenerators.UnionTypes"}},m={},c=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use-1",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share AutoConstructor",id:"share-autoconstructor",level:3},{value:"In the same category (Constructor)",id:"in-the-same-category-constructor",level:2},{value:"AutoCtor",id:"autoctor",level:3},{value:"AutoDeconstruct",id:"autodeconstruct",level:3},{value:"PrimaryParameter",id:"primaryparameter",level:3},{value:"QuickConstructor",id:"quickconstructor",level:3}],d={toc:c},h="wrapper";function g(t){let{components:e,...l}=t;return(0,o.kt)(h,(0,a.Z)({},d,l,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"autoconstructor--by-k\xe9vin-gallienne"},"AutoConstructor  by K\xe9vin Gallienne"),(0,o.kt)(s.Z,{toc:c,mdxType:"TOCInline"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AutoConstructor/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/AutoConstructor?label=AutoConstructor",alt:"Nuget"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/k94ll13nn3/AutoConstructor"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/k94ll13nn3/AutoConstructor?label=updated",alt:"GitHub last commit"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/k94ll13nn3/AutoConstructor?style=social",alt:"GitHub Repo stars"})),(0,o.kt)("h2",{id:"details"},"Details"),(0,o.kt)("h3",{id:"info"},"Info"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Name: ",(0,o.kt)("strong",{parentName:"p"},"AutoConstructor")),(0,o.kt)("p",{parentName:"admonition"},"Source generator for automatic constructor generation."),(0,o.kt)("p",{parentName:"admonition"},"Author: K\xe9vin Gallienne"),(0,o.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,o.kt)("em",{parentName:"p"},(0,o.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/AutoConstructor/"},"https://www.nuget.org/packages/AutoConstructor/")),"   "),(0,o.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/k94ll13nn3/AutoConstructor"},"https://github.com/k94ll13nn3/AutoConstructor")),(0,o.kt)("p",{parentName:"admonition"},"Source : ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/k94ll13nn3/AutoConstructor"},"https://github.com/k94ll13nn3/AutoConstructor"))),(0,o.kt)("h3",{id:"original-readme"},"Original Readme"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("h1",{parentName:"admonition",id:"autoconstructor"},"AutoConstructor"),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/AutoConstructor/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/vpre/AutoConstructor?logo=nuget",alt:"NuGet"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/k94ll13nn3/AutoConstructor/releases/latest"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/release/k94ll13nn3/AutoConstructor.svg?logo=github",alt:"GitHub release"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/k94ll13nn3/AutoConstructor/main/LICENSE"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/license/k94ll13nn3/AutoConstructor",alt:"GitHub license"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://github.com/k94ll13nn3/AutoConstructor/workflows/.github/workflows/ci.yml/badge.svg",alt:"ci.yml"})),(0,o.kt)("p",{parentName:"admonition"},"C# source generator that generates a constructor from readonly fields/properties in a class."),(0,o.kt)("h2",{parentName:"admonition",id:"installation"},"Installation"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Grab the latest package on ",(0,o.kt)("a",{parentName:"li",href:"https://www.nuget.org/packages/AutoConstructor/"},"NuGet"),".")),(0,o.kt)("h2",{parentName:"admonition",id:"requirements"},"Requirements"),(0,o.kt)("table",{parentName:"admonition"},(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Version"),(0,o.kt)("th",{parentName:"tr",align:null},"Visual Studio"),(0,o.kt)("th",{parentName:"tr",align:null},".NET SDK"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"<=1.3.0"),(0,o.kt)("td",{parentName:"tr",align:null},"16.10+"),(0,o.kt)("td",{parentName:"tr",align:null},"5.0.300+")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},">=2.0.0"),(0,o.kt)("td",{parentName:"tr",align:null},"17.0+"),(0,o.kt)("td",{parentName:"tr",align:null},"6.0.100+")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},">=5.0.0"),(0,o.kt)("td",{parentName:"tr",align:null},"17.6+"),(0,o.kt)("td",{parentName:"tr",align:null},"7.0.302+")))),(0,o.kt)("h2",{parentName:"admonition",id:"basic-usage"},"Basic usage"),(0,o.kt)("p",{parentName:"admonition"},"The following code:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'[AutoConstructor]\npublic partial class MyClass\n{\n    private readonly MyDbContext _context;\n    private readonly IHttpClientFactory _clientFactory;\n    private readonly IService _service;\n\n    [AutoConstructorInject("options?.Value", "options", typeof(IOptions<ApplicationOptions>))]\n    private readonly ApplicationOptions _options;\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"will generate:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},"partial class MyClass\n{\n    public MyClass(\n        MyApp.MyDbContext context,\n        System.Net.Http.IHttpClientFactory clientFactory,\n        MyApp.IService service,\n        Microsoft.Extensions.Options.IOptions<MyApp.ApplicationOptions> options)\n    {\n        this._context = context;\n        this._clientFactory = clientFactory;\n        this._service = service;\n        this._options = options?.Value;\n    }\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"A sample containing more cases is available at the end of this README."),(0,o.kt)("h2",{parentName:"admonition",id:"how-to-use"},"How to use"),(0,o.kt)("p",{parentName:"admonition"},"For any class where the generator will be used:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Mark the class as ",(0,o.kt)("inlineCode",{parentName:"li"},"partial")),(0,o.kt)("li",{parentName:"ul"},"Use ",(0,o.kt)("inlineCode",{parentName:"li"},"AutoConstructorAttribute")," on the class")),(0,o.kt)("p",{parentName:"admonition"},"By default, all ",(0,o.kt)("inlineCode",{parentName:"p"},"readonly")," non-",(0,o.kt)("inlineCode",{parentName:"p"},"static")," fields without initialization will be used. They will be injected with the same name without any leading ",(0,o.kt)("inlineCode",{parentName:"p"},"_"),"."),(0,o.kt)("p",{parentName:"admonition"},"Fields marked with ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorIgnoreAttribute")," will be ignored."),(0,o.kt)("p",{parentName:"admonition"},"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInjectAttribute")," to customize the behavior, usually when the injected parameter and the fields\ndo not have the same type. It takes three optional parameters:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"initializer"),": a string that will be used to initialize the field (by example ",(0,o.kt)("inlineCode",{parentName:"li"},"myService.GetData()"),"), default to the ",(0,o.kt)("inlineCode",{parentName:"li"},"parameterName")," if null or empty."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"parameterName"),": the name of the parameter to used in the constructor  (by example ",(0,o.kt)("inlineCode",{parentName:"li"},"myService"),"), default to the field name trimmed if null or empty."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"injectedType"),": the type of the parameter to used in the constructor  (by example ",(0,o.kt)("inlineCode",{parentName:"li"},"IMyService"),"), default to the field type if null.")),(0,o.kt)("p",{parentName:"admonition"},"If no parameters are provided, the behavior will be the same as without the attribute. Using the attribute on a field that would not be injected otherwise\nwon't make the field injectable."),(0,o.kt)("p",{parentName:"admonition"},"When using ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInjectAttribute"),", the parameter name can be shared across multiple fields,\nand even use a parameter from another field not annotated with ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInjectAttribute"),", but type must match."),(0,o.kt)("h3",{parentName:"admonition",id:"constructor-accessibility"},"Constructor accessibility"),(0,o.kt)("p",{parentName:"admonition"},"Constructor accessibility can be changed using the optionnal parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"accessibility")," on ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorAttribute")," (like ",(0,o.kt)("inlineCode",{parentName:"p"},'[AutoConstructor("internal")]'),").\nThe default is ",(0,o.kt)("inlineCode",{parentName:"p"},"public")," and it can be set to one of the following values:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"public")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"private")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"protected")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"internal")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"protected internal")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"private protected"))),(0,o.kt)("h3",{parentName:"admonition",id:"initializer-method"},"Initializer method"),(0,o.kt)("p",{parentName:"admonition"},"It is possible to add a method call at the end of the constructor. To do this, the attribute ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInitializer")," can be added to\na parameterless method that returns void. This will generate a call to the method at the end."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},"[AutoConstructor]\ninternal partial class Test\n{\n    private readonly int _t;\n\n    [AutoConstructorInitializer]\n    public void Initializer()\n    {\n    }\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"will generate"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},"public Test(int t)\n{\n    this._t = t;\n\n    this.Initializer();\n}\n")),(0,o.kt)("h3",{parentName:"admonition",id:"properties-injection"},"Properties injection"),(0,o.kt)("p",{parentName:"admonition"},"Get-only properties (",(0,o.kt)("inlineCode",{parentName:"p"},"public int Property { get; }"),") are injected by the generator by default.\nNon get-only properties (",(0,o.kt)("inlineCode",{parentName:"p"},"public int Property { get; set;}"),") are injected only if marked with (",(0,o.kt)("inlineCode",{parentName:"p"},"[field: AutoConstructorInject]"),") attributte.\nThe behavior of the injection can be modified using ",(0,o.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-7.3/auto-prop-field-attrs"},"auto-implemented property field-targeted attributes")," on its backing field. The following code show an injected get-only property with a custom injecter:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'[field: AutoConstructorInject(initializer: "injected.ToString()", injectedType: typeof(int), parameterName: "injected")]\npublic int Property { get; }\n')),(0,o.kt)("p",{parentName:"admonition"},"\u26a0\ufe0f The compiler support for auto-implemented property field-targeted attributes is not perfect (as described in the link above), and Roslyn analyzers are not running on backings fields so some warnings may not be reported."),(0,o.kt)("h2",{parentName:"admonition",id:"configuration"},"Configuration"),(0,o.kt)("h3",{parentName:"admonition",id:"generating-argumentnullexception"},"Generating ",(0,o.kt)("inlineCode",{parentName:"h3"},"ArgumentNullException")),(0,o.kt)("p",{parentName:"admonition"},"By default, null checks with ",(0,o.kt)("inlineCode",{parentName:"p"},"ArgumentNullException")," are not generated when needed.\nTo enable this behavior, set ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor_DisableNullChecking")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," in the project file:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-xml"},"<AutoConstructor_DisableNullChecking>false</AutoConstructor_DisableNullChecking>\n")),(0,o.kt)("h3",{parentName:"admonition",id:"generating-xml-documentation-comment"},"Generating XML documentation comment"),(0,o.kt)("p",{parentName:"admonition"},"By default, no XML documentation comment will be generated for the constructor.\nTo enable this behavior, set ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor_GenerateConstructorDocumentation")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," in the project file:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-xml"},"<AutoConstructor_GenerateConstructorDocumentation>true</AutoConstructor_GenerateConstructorDocumentation>\n")),(0,o.kt)("p",{parentName:"admonition"},"This will generate a default comment like this one, with each parameter reusing the corresponding field summary if available, and the parameter name otherwise:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},'/// <summary>\n/// Initializes a new instance of the Test class.\n/// </summary>\n/// <param name=""t1"">Some field.</param>\n/// <param name=""t2"">t2</param>\n')),(0,o.kt)("p",{parentName:"admonition"},"By using the ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor_ConstructorDocumentationComment")," property, you can configure the comment message:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-xml"},"<AutoConstructor_ConstructorDocumentationComment>Some comment for the {0} class.</AutoConstructor_ConstructorDocumentationComment>\n")),(0,o.kt)("p",{parentName:"admonition"},"This will generate the following code:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-c#"},'/// <summary>\n/// Some comment for the Test class.\n/// </summary>\n/// <param name=""t1"">Some field.</param>\n/// <param name=""t2"">t2</param>\n')),(0,o.kt)("h2",{parentName:"admonition",id:"samples-describing-some-cases"},"Samples describing some cases"),(0,o.kt)("h3",{parentName:"admonition",id:"sample-for-fields"},"Sample for fields"),(0,o.kt)("p",{parentName:"admonition"},"The following code"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'[AutoConstructor]\npartial class Test\n{\n    private readonly string _name;\n\n    // Won\'t be injected\n    private readonly Uri _uri = new Uri("/non-modified", UriKind.Relative);\n\n    // Won\'t be injected\n    [AutoConstructorIgnore]\n    private readonly DateTime _dateNotTaken;\n\n    // Won\'t be injected because not readonly. Attribute would be taken into account if this were a property, not a field.\n    [AutoConstructorInject]\n    private int  _stuff;\n\n    // Won\'t be injected\n    private int? _toto;\n\n    // Support for nullables\n    private readonly DateTime? _date;\n\n    // Support for generics\n    private readonly List<DateTime> _items;\n\n    // Inject with custom initializer\n    [AutoConstructorInject("guid.ToString()", "guid", typeof(Guid))]\n    private readonly string _guidString;\n\n    // Use existing parameter defined with AutoConstructorInject\n    [AutoConstructorInject("guid.ToString().Length", "guid", typeof(Guid))]\n    private readonly int _guidLength;\n\n    // Use existing parameter from a basic injection\n    [AutoConstructorInject("name.ToUpper()", "name", typeof(string))]\n    private readonly string _nameShared;\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"will generate"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},"public Test(string name, System.DateTime? date, System.Collections.Generic.List<System.DateTime> items, System.Guid guid)\n{\n    this._name = name ?? throw new System.ArgumentNullException(nameof(name));\n    this._date = date ?? throw new System.ArgumentNullException(nameof(date));\n    this._items = items ?? throw new System.ArgumentNullException(nameof(items));\n    this._guidString = guid.ToString() ?? throw new System.ArgumentNullException(nameof(guid));\n    this._guidLength = guid.ToString().Length;\n    this._nameShared = name.ToUpper() ?? throw new System.ArgumentNullException(nameof(name));\n}\n")),(0,o.kt)("h3",{parentName:"admonition",id:"sample-for-get-only-properties"},"Sample for get-only properties"),(0,o.kt)("p",{parentName:"admonition"},"The following code"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'[AutoConstructor]\npublic partial class Test\n{\n    [field: AutoConstructorInject]\n    public int Injected { get; }\n\n    public int AlsoInjectedEvenWhenMissingAttribute { get; }\n\n    /// <summary>\n    /// Some property.\n    /// </summary>\n    [field: AutoConstructorInject]\n    public int InjectedWithDocumentation { get; }\n\n    [field: AutoConstructorInject]\n    public int InjectedBecauseExplicitInjection { get; set; }\n\n    [field: AutoConstructorInject]\n    public static int NotInjectedBecauseStatic { get; }\n\n    [field: AutoConstructorInject]\n    public int NotInjectedBecauseInitialized { get; } = 2;\n\n    [field: AutoConstructorIgnore]\n    public int NotInjectedBecauseHasIgnoreAttribute { get; }\n\n    [field: AutoConstructorInject(initializer: ""injected.ToString()"", injectedType: typeof(int), parameterName: ""injected"")]\n    public string InjectedWithoutCreatingAParam { get; }\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"will generate"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},' partial class Test\n    {\n        /// <summary>\n        /// Initializes a new instance of the Test class.\n        /// </summary>\n        /// <param name=""injected"">injected</param>\n        /// <param name=""injectedWithDocumentation"">Some property.</param>\n        /// <param name=""injectedBecauseExplicitInjection"">injectedBecauseExplicitInjection</param>\n        /// <param name=""alsoInjectedEvenWhenMissingAttribute"">alsoInjectedEvenWhenMissingAttribute</param>\n        public Test(int injected, int injectedWithDocumentation, int injectedBecauseExplicitInjection, int alsoInjectedEvenWhenMissingAttribute)\n        {\n            this.Injected = injected;\n            this.InjectedWithDocumentation = injectedWithDocumentation;\n            this.InjectedBecauseExplicitInjection = injectedBecauseExplicitInjection;\n            this.AlsoInjectedEvenWhenMissingAttribute = alsoInjectedEvenWhenMissingAttribute;\n            this.InjectedWithoutCreatingAParam = injected.ToString() ?? throw new System.ArgumentNullException(nameof(injected));\n        }\n    }\n')),(0,o.kt)("h2",{parentName:"admonition",id:"diagnostics"},"Diagnostics"),(0,o.kt)("h3",{parentName:"admonition",id:"acons01"},"ACONS01"),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor")," attribute is used on a class that is not partial."),(0,o.kt)("h3",{parentName:"admonition",id:"acons02"},"ACONS02"),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor")," attribute is used on a class without fields to inject."),(0,o.kt)("h3",{parentName:"admonition",id:"acons03"},"ACONS03"),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorIgnore")," attribute is used on a field that won't already be processed."),(0,o.kt)("h3",{parentName:"admonition",id:"acons04"},"ACONS04"),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInject")," attribute is used on a field that won't already be processed."),(0,o.kt)("h3",{parentName:"admonition",id:"acons05"},"ACONS05"),(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorIgnore")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInject")," are used on a class without the ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor")," attribute."),(0,o.kt)("h3",{parentName:"admonition",id:"acons06"},"ACONS06"),(0,o.kt)("p",{parentName:"admonition"},"A type specified in ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInject")," attribute does not match the type of another parameter with the same name."),(0,o.kt)("p",{parentName:"admonition"},"In the following sample, both fields will be injected with ",(0,o.kt)("inlineCode",{parentName:"p"},"guid")," as parameter name, but one of type ",(0,o.kt)("inlineCode",{parentName:"p"},"string")," and the other of type ",(0,o.kt)("inlineCode",{parentName:"p"},"Guid"),",\npreventing the generator from running."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},'public partial class Test\n{\n    [AutoConstructorInject("guid.ToString()", "guid", typeof(Guid))]\n    private readonly string _guid2;\n    private readonly string _guid;\n}\n')),(0,o.kt)("h3",{parentName:"admonition",id:"acons07"},"ACONS07"),(0,o.kt)("p",{parentName:"admonition"},"The accessibility defined in the ",(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructor")," attribute is not an allowed value."),(0,o.kt)("h3",{parentName:"admonition",id:"acons08"},"ACONS08"),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInitializer")," attribute used on multiple methods."),(0,o.kt)("h3",{parentName:"admonition",id:"acons09"},"ACONS09"),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInitializer")," attribute used on a method not returning void."),(0,o.kt)("h3",{parentName:"admonition",id:"acons10"},"ACONS10"),(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"AutoConstructorInitializer")," attribute used on a method with parameters.")),(0,o.kt)("h3",{id:"about"},"About"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Generating constructor for class with many properties")),(0,o.kt)("h2",{id:"how-to-use-1"},"How to use"),(0,o.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,o.kt)("p",null,"This is the CSharp Project that references ",(0,o.kt)("strong",{parentName:"p"},"AutoConstructor")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {16}",showLineNumbers:!0,"{16}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n    <ItemGroup>\n      <PackageReference Include="AutoConstructor" Version="4.1.1">\n        <PrivateAssets>all</PrivateAssets>\n        <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>\n      </PackageReference>\n    </ItemGroup>\n</Project>\n\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoConstructor")," in ",(0,o.kt)("em",{parentName:"p"},"Program.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using QuickConstructorDemo;\n\nvar p = new Person("Andrei", "Ignat");\n\nConsole.WriteLine(p.FullName());\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"AutoConstructor")," in ",(0,o.kt)("em",{parentName:"p"},"Person.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace QuickConstructorDemo;\n\n[AutoConstructor]\ninternal partial class Person\n{\n    private readonly string FirstName;\n    private readonly string? LastName;\n    \n    public string FullName() => $"{FirstName} {LastName}";\n    \n}\n\n')))),(0,o.kt)("h3",{id:"generated-files"},"Generated Files"),(0,o.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\obj\\GX\\AutoConstructor.Generator\\AutoConstructor.Generator.AutoConstructorGenerator\\AutoConstructorAttribute.cs",label:"AutoConstructorAttribute.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by the AutoConstructor source generator.\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n\n[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]\ninternal sealed class AutoConstructorAttribute : System.Attribute\n{\n}\n\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\obj\\GX\\AutoConstructor.Generator\\AutoConstructor.Generator.AutoConstructorGenerator\\AutoConstructorIgnoreAttribute.cs",label:"AutoConstructorIgnoreAttribute.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by the AutoConstructor source generator.\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n\n[System.AttributeUsage(System.AttributeTargets.Field, Inherited = false, AllowMultiple = false)]\ninternal sealed class AutoConstructorIgnoreAttribute : System.Attribute\n{\n}\n\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\obj\\GX\\AutoConstructor.Generator\\AutoConstructor.Generator.AutoConstructorGenerator\\AutoConstructorInjectAttribute.cs",label:"AutoConstructorInjectAttribute.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by the AutoConstructor source generator.\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n\n[System.AttributeUsage(System.AttributeTargets.Field, Inherited = false, AllowMultiple = false)]\ninternal sealed class AutoConstructorInjectAttribute : System.Attribute\n{\n    public AutoConstructorInjectAttribute(string initializer = null, string parameterName = null, System.Type injectedType = null)\n    {\n        Initializer = initializer;\n        ParameterName = parameterName;\n        InjectedType = injectedType;\n    }\n\n    public string Initializer { get; }\n\n    public string ParameterName { get; }\n\n    public System.Type InjectedType { get; }\n}\n\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\AutoConstructor\\src\\ConstructorDemo\\obj\\GX\\AutoConstructor.Generator\\AutoConstructor.Generator.AutoConstructorGenerator\\QuickConstructorDemo.Person.g.cs",label:"QuickConstructorDemo.Person.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//------------------------------------------------------------------------------\n// <auto-generated>\n//     This code was generated by the AutoConstructor source generator.\n//\n//     Changes to this file may cause incorrect behavior and will be lost if\n//     the code is regenerated.\n// </auto-generated>\n//------------------------------------------------------------------------------\n#nullable enable\nnamespace QuickConstructorDemo\n{\n    partial class Person\n    {\n        public Person(string FirstName, string? LastName)\n        {\n            this.FirstName = FirstName;\n            this.LastName = LastName;\n        }\n    }\n}\n\n")))),(0,o.kt)("h2",{id:"usefull"},"Usefull"),(0,o.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{target:"_blank",href:n(6929).Z},"Download Example project AutoConstructor "))),(0,o.kt)("h3",{id:"share-autoconstructor"},"Share AutoConstructor"),(0,o.kt)("ul",null,(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor&quote=AutoConstructor",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor&text=AutoConstructor:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor&title=AutoConstructor",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor&title=AutoConstructor&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoConstructor",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoConstructor"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoConstructor")),(0,o.kt)("h2",{id:"in-the-same-category-constructor"},"In the same category (Constructor)"),(0,o.kt)("h3",{id:"autoctor"},(0,o.kt)("a",{parentName:"h3",href:"/docs/AutoCtor"},"AutoCtor")),(0,o.kt)("h3",{id:"autodeconstruct"},(0,o.kt)("a",{parentName:"h3",href:"/docs/AutoDeconstruct"},"AutoDeconstruct")),(0,o.kt)("h3",{id:"primaryparameter"},(0,o.kt)("a",{parentName:"h3",href:"/docs/PrimaryParameter"},"PrimaryParameter")),(0,o.kt)("h3",{id:"quickconstructor"},(0,o.kt)("a",{parentName:"h3",href:"/docs/QuickConstructor"},"QuickConstructor")))}g.isMDXComponent=!0},6929:(t,e,n)=>{n.d(e,{Z:()=>a});const a=n.p+"assets/files/AutoConstructor-09386946b2962476a8431da141b3c2b6.zip"}}]);