"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[327],{6015:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>h,frontMatter:()=>p,metadata:()=>c,toc:()=>d});var a=n(87462),o=(n(67294),n(3905)),r=n(73992),i=n(18679),s=n(68839);const p={sidebar_position:950,title:"95 - CopyCat",description:"Implementation of the Decorator pattern in C# - only for not implemented methods",slug:"/CopyCat"},l="CopyCat  by Serhii Buta",c={unversionedId:"RSCG-Examples/CopyCat",id:"RSCG-Examples/CopyCat",title:"95 - CopyCat",description:"Implementation of the Decorator pattern in C# - only for not implemented methods",source:"@site/docs/RSCG-Examples/CopyCat.md",sourceDirName:"RSCG-Examples",slug:"/CopyCat",permalink:"/RSCG_Examples/v2/docs/CopyCat",draft:!1,tags:[],version:"current",sidebarPosition:950,frontMatter:{sidebar_position:950,title:"95 - CopyCat",description:"Implementation of the Decorator pattern in C# - only for not implemented methods",slug:"/CopyCat"},sidebar:"tutorialSidebar",previous:{title:"94 - AspectGenerator",permalink:"/RSCG_Examples/v2/docs/AspectGenerator"},next:{title:"96 - HsuSgSync",permalink:"/RSCG_Examples/v2/docs/HsuSgSync"}},m={},d=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share CopyCat",id:"share-copycat",level:3},{value:"In the same category (Interface)",id:"in-the-same-category-interface",level:2},{value:"Biwen.AutoClassGen",id:"biwenautoclassgen",level:3},{value:"MakeInterface.Generator",id:"makeinterfacegenerator",level:3},{value:"Matryoshki",id:"matryoshki",level:3},{value:"NetAutomaticInterface",id:"netautomaticinterface",level:3},{value:"ProxyGen",id:"proxygen",level:3},{value:"Roozie.AutoInterface",id:"roozieautointerface",level:3},{value:"RSCG_Static",id:"rscg_static",level:3}],g={toc:d},u="wrapper";function h(e){let{components:t,...p}=e;return(0,o.kt)(u,(0,a.Z)({},g,p,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"copycat--by-serhii-buta"},"CopyCat  by Serhii Buta"),(0,o.kt)(s.Z,{toc:d,mdxType:"TOCInline"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Copycat/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/Copycat?label=Copycat",alt:"Nuget"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Otaman/Copycat/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/Otaman/Copycat?label=updated",alt:"GitHub last commit"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/Otaman/Copycat?style=social",alt:"GitHub Repo stars"})),(0,o.kt)("h2",{id:"details"},"Details"),(0,o.kt)("h3",{id:"info"},"Info"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Name: ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")),(0,o.kt)("p",{parentName:"admonition"},"Decorator pattert source generator with user-defined template"),(0,o.kt)("p",{parentName:"admonition"},"Author: Serhii Buta"),(0,o.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,o.kt)("em",{parentName:"p"},(0,o.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/Copycat/"},"https://www.nuget.org/packages/Copycat/")),"   "),(0,o.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Otaman/Copycat/"},"https://github.com/Otaman/Copycat/")),(0,o.kt)("p",{parentName:"admonition"},"Source : ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Otaman/Copycat/"},"https://github.com/Otaman/Copycat/"))),(0,o.kt)("h3",{id:"original-readme"},"Original Readme"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("h1",{parentName:"admonition",id:"copycat-nuget-badge"},"Copycat ",(0,o.kt)("a",{parentName:"h1",href:"https://www.nuget.org/packages/Copycat"},(0,o.kt)("img",{parentName:"a",src:"https://buildstats.info/nuget/Copycat?includePreReleases=true",alt:"NuGet Badge"}))),(0,o.kt)("p",{parentName:"admonition"},"Source generator for creating decorators by templates.\nThe source generator intents to simplify implementation of a ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Decorator_pattern"},"Decorator Pattern"),"."),(0,o.kt)("blockquote",{parentName:"admonition"},(0,o.kt)("p",{parentName:"blockquote"},"The package is still in ",(0,o.kt)("em",{parentName:"p"},"beta"),". Currently, caching is not implemented, so the source generator regenerates output for every input, which may slow down IDEs in larger projects.")),(0,o.kt)("h2",{parentName:"admonition",id:"use-cases"},"Use Cases"),(0,o.kt)("p",{parentName:"admonition"},"Les't begin from simple scenario. We need to decorate ISomeInterface:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},"public interface ISomeInterface\n{\n    void DoSomething();\n    void DoSomethingElse(int a, string b);\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"To activate generator, use ","[","Decorate","]"," attribute on a class. The class must be partial and have exactly one interface to decorate:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},"using Copycat;\n\n[Decorate]\npublic partial class SimpleDecorator : ISomeInterface { }\n")),(0,o.kt)("p",{parentName:"admonition"},"In this example, Copycat generates pass-through decorator:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},"// <auto-generated/>\npublic partial class SimpleDecorator\n{\n    private ISomeInterface _decorated;\n    public SimpleDecorator(ISomeInterface decorated)\n    {\n        _decorated = decorated;\n    }\n\n    public void DoSomething() => _decorated.DoSomething();\n\n    public void DoSomethingElse(int a, string b) => _decorated.DoSomethingElse(a, b);\n}\n")),(0,o.kt)("p",{parentName:"admonition"},"Pass-through decorators don't do much, but still can be useful for changing behaviour of particular methods without touching others:"),(0,o.kt)("blockquote",{parentName:"admonition"},(0,o.kt)("p",{parentName:"blockquote"},"Here and after we skip ",(0,o.kt)("inlineCode",{parentName:"p"},"using Copycat;")," and combine user-defined and auto-generated code for brevity "),(0,o.kt)("pre",{parentName:"blockquote"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},"[Decorate]\npublic partial class SimpleDecorator : ISomeInterface \n{ \n    public void DoSomething()\n    {\n        // actually, do nothing\n    }\n}\n"))),(0,o.kt)("p",{parentName:"admonition"},"// ",(0,o.kt)("auto-generated",null),"\npublic partial class SimpleDecorator\n{\nprivate ISomeInterface _decorated;\npublic SimpleDecorator(ISomeInterface decorated)\n{\n_decorated = decorated;\n}"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre"},"public void DoSomethingElse(int a, string b) => _decorated.DoSomethingElse(a, b);\n")),(0,o.kt)("p",{parentName:"admonition"},"}"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre"},'As we see, Copycat now generates pass-through only for non-implemented methods (DoSomethingElse), allowing us to concentrate on important changes.\n\nBut what if we want to override behaviour for one method, but throw for all others (assuming we got some huge legacy interface, where most methods are useless for us)? \nNow it\'s time to play with templates :sunglasses:\n\nTo make Copycat generate something different from pass-through we need to define a template:\n```C#\npublic interface IAmPartiallyUseful\n{   \n    void DoSomethingUseful();\n    void DoSomething();\n    void DoSomethingElse();\n}\n\n[Decorate]\npublic partial class ThrowDecorator : IAmPartiallyUseful\n{\n    public void DoSomethingUseful() => Console.WriteLine("I did some work!");\n\n    [Template]\n    private void Throw(Action action) => throw new NotImplementedException();\n}\n\n// <auto-generated/>\npublic partial class ThrowDecorator\n{\n    private IAmPartiallyUseful _decorated;\n    public ThrowDecorator(IAmPartiallyUseful decorated)\n    {\n        _decorated = decorated;\n    }\n\n    /// <see cref = "ThrowDecorator.Throw(Action)"/>\n    public void DoSomething() => throw new NotImplementedException();\n    /// <see cref = "ThrowDecorator.Throw(Action)"/>\n    public void DoSomethingElse() => throw new NotImplementedException();\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"That's better, now we do some work on DoSomethingUseful and throw on DoSomething or DoSomethingElse, but how?\nWe defined a template:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},"[Template]\nprivate void Throw(Action action) {...}\n")),(0,o.kt)("p",{parentName:"admonition"},"Template is a method that takes parameterless delegate which has the same return type as the method itself.\nWe can use any names for the template method and a delegate (as usual, it's better to keep them self-explanatory)."),(0,o.kt)("p",{parentName:"admonition"},"We didn't use the delegate in the pevious example because we limited ourselves to simple examples where it wasn't needed.\nNow it's time to explore more real-world scenarios. Decorators fit nicely for aspect-oriented programming (AOP) when using them as wrappers."),(0,o.kt)("h3",{parentName:"admonition",id:"logging"},"Logging"),(0,o.kt)("p",{parentName:"admonition"},"One of the aspects, than can be separated easily is logging. For example:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},'using System.Diagnostics;\n\npublic interface ISomeInterface\n{\n    void DoNothing();\n    void DoSomething();\n    void DoSomethingElse(int a, string b);\n}\n\n[Decorate]\npublic partial class SimpleDecorator : ISomeInterface\n{\n    private readonly ISomeInterface _decorated;\n\n    public SimpleDecorator(ISomeInterface decorated) => \n        _decorated = decorated;\n\n    [Template]\n    public void CalculateElapsedTime(Action action)\n    {\n        var sw = Stopwatch.StartNew();\n        action();\n        Console.WriteLine($"{nameof(action)} took {sw.ElapsedMilliseconds} ms");\n    }\n    \n    public void DoNothing() { }\n}\n\npublic partial class SimpleDecorator\n{\n    /// <see cref = "SimpleDecorator.CalculateElapsedTime(Action)"/>\n    public void DoSomething()\n    {\n        var sw = Stopwatch.StartNew();\n        _decorated.DoSomething();\n        Console.WriteLine($"{nameof(DoSomething)} took {sw.ElapsedMilliseconds} ms");\n    }\n\n    /// <see cref = "SimpleDecorator.CalculateElapsedTime(Action)"/>\n    public void DoSomethingElse(int a, string b)\n    {\n        var sw = Stopwatch.StartNew();\n        _decorated.DoSomethingElse(a, b);\n        Console.WriteLine($"{nameof(DoSomethingElse)} took {sw.ElapsedMilliseconds} ms");\n    }\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"Here DoSomething and DoSomething else are generated as specified by the template CalculateElapsedTime.\nCopycat has convention to replace delegate invocation with decorated method invocation (includes passing all parameters). For convenience, ",(0,o.kt)("em",{parentName:"p"},"nameof(delegate)")," also replaced with nameof(MethodName) for easier use in templating."),(0,o.kt)("h3",{parentName:"admonition",id:"retries"},"Retries"),(0,o.kt)("p",{parentName:"admonition"},"Let's make our generator do some more interesting task. In most situations Polly nuget package is the best choice for retries. But for simple cases it may bring unnecessary complexity, like here:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},'public interface ICache<T>\n{\n    Task<T> Get(string key);\n    Task<T> Set(string key, T value);\n}\n\n[Decorate]\npublic partial class CacheDecorator<T> : ICache<T>\n{\n    private readonly ICache<T> _decorated;\n    \n    public CacheDecorator(ICache<T> decorated) => _decorated = decorated;\n    \n    [Template]\n    public async Task<T> RetryOnce(Func<Task<T>> action, string key)\n    {\n        try\n        {\n            return await action();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"Retry {nameof(action)} for {key} due to {e.Message}");\n            return await action();\n        }\n    }\n}\n\npublic partial class CacheDecorator<T>\n{\n    /// <see cref = "CacheDecorator.RetryOnce(Func{Task{T}}, string)"/>\n    public async Task<T> Get(string key)\n    {\n        try\n        {\n            return await _decorated.Get(key);\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"Retry {nameof(Get)} for {key} due to {e.Message}");\n            return await _decorated.Get(key);\n        }\n    }\n\n    /// <see cref = "CacheDecorator.RetryOnce(Func{Task{T}}, string)"/>\n    public async Task<T> Set(string key, T value)\n    {\n        try\n        {\n            return await _decorated.Set(key, value);\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"Retry {nameof(Set)} for {key} due to {e.Message}");\n            return await _decorated.Set(key, value);\n        }\n    }\n}\n')),(0,o.kt)("p",{parentName:"admonition"},"Caching should be fast, so we can't retry many times. One is ok, especially with some log message about the problem.\nPay attention to ",(0,o.kt)("em",{parentName:"p"},"key")," parameter in the template, it matches nicely our interface methods parameter. "),(0,o.kt)("blockquote",{parentName:"admonition"},(0,o.kt)("p",{parentName:"blockquote"},"If additional parameters defined in template, then generator applies this template only for methods that have same exact parameter.\nActually, we can implement more complext retry patterns, too:"),(0,o.kt)("pre",{parentName:"blockquote"},(0,o.kt)("code",{parentName:"pre",className:"language-C#"},'[Template]\npublic async Task<T> Retry<T>(Func<Task<T>> action)\n{\n    var retryCount = 0;\n    while (true)\n    {\n        try\n        {\n            return await action();\n        }\n        catch (Exception e)\n        {\n            if (retryCount++ >= 3)\n                throw;\n            Console.WriteLine($"Retry {nameof(action)} {retryCount} due to {e.Message}");\n        }\n    }\n}\n'))),(0,o.kt)("h3",{parentName:"admonition",id:"advanced"},"Advanced"),(0,o.kt)("p",{parentName:"admonition"},"There are plenty use cases, than can be covered with Copycat. Feel free to explore them in ",(0,o.kt)("inlineCode",{parentName:"p"},"src/Copycat/Copycat.IntegrationTests")," (and ",(0,o.kt)("inlineCode",{parentName:"p"},"Generated")," folder inside).\nFor instance, defining template in base class (see RetryWrapperWithBase.cs) or using multiple template to match methods with different signature see TestMultipleTemplates.cs).")),(0,o.kt)("h3",{id:"about"},"About"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Implementation of the Decorator pattern in C# - only for not implemented methods")),(0,o.kt)("h2",{id:"how-to-use"},"How to use"),(0,o.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,o.kt)("p",null,"This is the CSharp Project that references ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include="Copycat" Version="0.2.0-beta.1" OutputItemType="Analyzer"   />\n  </ItemGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n</Project>\n\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")," in ",(0,o.kt)("em",{parentName:"p"},"Program.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"using CCDemo;\n\nICoffee c =new Coffee();\nc= new CoffeeWithLogging(c);\nawait c.Prepare();\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\ICoffee.cs",label:"ICoffee.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")," in ",(0,o.kt)("em",{parentName:"p"},"ICoffee.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"\nnamespace CCDemo;\n\ninternal interface ICoffee\n{\n    //for the moment does not work for properties in interface\n    //string? Name { get; set; }\n    Task<bool> Prepare();\n\n    string[] GetIngredients();\n}\n"))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\Coffee.cs",label:"Coffee.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")," in ",(0,o.kt)("em",{parentName:"p"},"Coffee.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'namespace CCDemo;\ninternal class Coffee : ICoffee\n{\n    public string? Name { get; set; }\n    public async Task<bool> Prepare()\n    {\n        Console.WriteLine("start prepare coffee");\n        await Task.Delay(1000);\n        Console.WriteLine("finish prepare coffee");\n        return true;\n    }\n    public string[] GetIngredients() => new[] { "water", "coffee" };\n\n}\n\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\CoffeeWithLogging.cs",label:"CoffeeWithLogging.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"CopyCat")," in ",(0,o.kt)("em",{parentName:"p"},"CoffeeWithLogging.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using Copycat;\n\nnamespace CCDemo;\n[Decorate]\ninternal partial class CoffeeWithLogging: ICoffee\n{\n    [Template]\n    private string[] AddLogging(Func<string[]> action)\n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(action)}  ");\n            return action();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(action)} ");\n            throw;\n        }\n        finally\n        {\n               Console.WriteLine($"end logging {nameof(action)} ");\n        }\n    }\n\n\n    [Template]\n    public async Task<bool> AddLogging(Func<Task<bool>> action)       \n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(action)} ");\n            return await action();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(action)} ");\n            throw;\n        }\n        finally\n        {\n            Console.WriteLine($"end logging {nameof(action)} ");\n        }\n    }\n}\n\n')))),(0,o.kt)("h3",{id:"generated-files"},"Generated Files"),(0,o.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\obj\\GX\\Copycat\\Copycat.DecoratorGenerator\\CofeeWithLogging.g.cs",label:"CofeeWithLogging.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\nusing Copycat;\n\nnamespace CCDemo;\ninternal partial class CofeeWithLogging\n{\n    private CCDemo.ICoffee _decorated;\n    public CofeeWithLogging(CCDemo.ICoffee decorated)\n    {\n        _decorated = decorated;\n    }\n\n    /// <see cref = "CofeeWithLogging.AddLogging(Func{Task{bool}})"/>\n    public async //for the moment does not work for properties in interface\n    //string? Name { get; set; }\n    Task<bool> Prepare()\n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(Prepare)} ");\n            return await _decorated.Prepare();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(Prepare)} ");\n            throw;\n        }\n        finally\n        {\n            Console.WriteLine($"end logging {nameof(Prepare)} ");\n        }\n    }\n\n    /// <see cref = "CofeeWithLogging.AddLogging(Func{string[]})"/>\n    public string[] GetIngredients()\n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(GetIngredients)}  ");\n            return _decorated.GetIngredients();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(GetIngredients)} ");\n            throw;\n        }\n        finally\n        {\n            Console.WriteLine($"end logging {nameof(GetIngredients)} ");\n        }\n    }\n}\n'))),(0,o.kt)(i.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\CopyCat\\src\\CCDemo\\obj\\GX\\Copycat\\Copycat.DecoratorGenerator\\CoffeeWithLogging.g.cs",label:"CoffeeWithLogging.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\nusing Copycat;\n\nnamespace CCDemo;\ninternal partial class CoffeeWithLogging\n{\n    private CCDemo.ICoffee _decorated;\n    public CoffeeWithLogging(CCDemo.ICoffee decorated)\n    {\n        _decorated = decorated;\n    }\n\n    /// <see cref = "CoffeeWithLogging.AddLogging(Func{Task{bool}})"/>\n    public async //for the moment does not work for properties in interface\n    //string? Name { get; set; }\n    Task<bool> Prepare()\n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(Prepare)} ");\n            return await _decorated.Prepare();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(Prepare)} ");\n            throw;\n        }\n        finally\n        {\n            Console.WriteLine($"end logging {nameof(Prepare)} ");\n        }\n    }\n\n    /// <see cref = "CoffeeWithLogging.AddLogging(Func{string[]})"/>\n    public string[] GetIngredients()\n    {\n        try\n        {\n            Console.WriteLine($"start logging {nameof(GetIngredients)}  ");\n            return _decorated.GetIngredients();\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"exception  {nameof(GetIngredients)} ");\n            throw;\n        }\n        finally\n        {\n            Console.WriteLine($"end logging {nameof(GetIngredients)} ");\n        }\n    }\n}\n')))),(0,o.kt)("h2",{id:"usefull"},"Usefull"),(0,o.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{target:"_blank",href:n(17521).Z},"Download Example project CopyCat "))),(0,o.kt)("h3",{id:"share-copycat"},"Share CopyCat"),(0,o.kt)("ul",null,(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat&quote=CopyCat",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat&text=CopyCat:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat&title=CopyCat",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat&title=CopyCat&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCopyCat",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/CopyCat"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/CopyCat")),(0,o.kt)("h2",{id:"in-the-same-category-interface"},"In the same category (Interface)"),(0,o.kt)("h3",{id:"biwenautoclassgen"},(0,o.kt)("a",{parentName:"h3",href:"/docs/Biwen.AutoClassGen"},"Biwen.AutoClassGen")),(0,o.kt)("h3",{id:"makeinterfacegenerator"},(0,o.kt)("a",{parentName:"h3",href:"/docs/MakeInterface.Generator"},"MakeInterface.Generator")),(0,o.kt)("h3",{id:"matryoshki"},(0,o.kt)("a",{parentName:"h3",href:"/docs/Matryoshki"},"Matryoshki")),(0,o.kt)("h3",{id:"netautomaticinterface"},(0,o.kt)("a",{parentName:"h3",href:"/docs/NetAutomaticInterface"},"NetAutomaticInterface")),(0,o.kt)("h3",{id:"proxygen"},(0,o.kt)("a",{parentName:"h3",href:"/docs/ProxyGen"},"ProxyGen")),(0,o.kt)("h3",{id:"roozieautointerface"},(0,o.kt)("a",{parentName:"h3",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,o.kt)("h3",{id:"rscg_static"},(0,o.kt)("a",{parentName:"h3",href:"/docs/RSCG_Static"},"RSCG_Static")))}h.isMDXComponent=!0},17521:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/CopyCat-cb5521fb4dbcc731d40cb33aeb1f9eb9.zip"}}]);