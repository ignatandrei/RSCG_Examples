using ArrayToExcel;
using Scriban.Parsing;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;

namespace Generator;
public class MultiGeneratorV2 
{
    const string tooComplicated = "too complicated for me, need help";
    const string old = "old ISourceGenerator";
    const string archived = "archived";
    const string inspirational = "not having nuget, but having IIncrementalGenerator";
    const string noReadMe = "no readme";
    const string later = "later";
    const string WaitingForIssue = "issue opened";
    const string lessNet7 = "less than net 7";
    NoExample[] rscgNoExamples = new NoExample[] {

new("AutoEmbed https://github.com/chsienki/AutoEmbed                           ",old)
,new("Cloneable https://github.com/mostmand/Cloneable                           ",old)
,new("fonderie https://github.com/jeromelaban/fonderie                          ",old)
,new("Generators.Blazor https://github.com/excubo-ag/Generators.Blazor          ",old)
,new("Generators.Grouping https://github.com/excubo-ag/Generators.Grouping      ",old)
,new("JsonMergePatch https://github.com/ladeak/JsonMergePatch                   ",old)
,new("MemoizeSourceGenerator https://github.com/Zoxive/MemoizeSourceGenerator   ",old)
,new("MiniRazor https://github.com/Tyrrrz/MiniRazor/                            ",archived)
,new("MockGen https://github.com/thomas-girotto/MockGen                         ",old)
,new("RoslynWeave https://github.com/Jishun/RoslynWeave                        ",old)
,new("StaticProxyGenerator https://github.com/robertturner/StaticProxyGenerator",old)
,new("WrapperValueObject https://github.com/martinothamar/WrapperValueObject","not maintained as in readme")
,new("ApiClientGenerator https://github.com/surgicalcoder/ApiClientGenerator","seems complicated with output file")
,new("TypealizR https://github.com/earloc/TypealizR","depends on Microsoft.Extensions.Localization")
,new("StrongInject https://github.com/YairHalberstadt/stronginject/",tooComplicated)
,new("DependencyPropertyGenerator https://github.com/HavenDV/DependencyPropertyGenerator","example with MAUI")
,new("Intellenum https://github.com/SteveDunn/Intellenum","not understand how to use ")
,new("Tinyhand https://github.com/archi-Doc/Tinyhand","tried, need documentation")
,new("Architect.DomainModeling https://github.com/TheArchitectDev/Architect.DomainModeling",tooComplicated)
,new("Maui.BindableProperty.Generator https://github.com/rrmanzano/maui-bindableproperty-generator",tooComplicated)
,new ("AdaskoTheBeAsT.Identity.Dapper https://github.com/AdaskoTheBeAsT/AdaskoTheBeAsT.Identity.Dapper",tooComplicated)
,new ("AjaxService.Gen https://github.com/MrAliSalehi/AjaxService",old)
,new ("AnyOf https://github.com/StefH/AnyOf",old)
,new ("AutoDeconstructable https://github.com/nemesissoft/Nemesis.TextParsers/tree/master/Nemesis.TextParsers.CodeGen/Deconstructable",old)
,new ("AutoFilterer.Generators https://github.com/enisn/AutoFilterer/blob/develop/docs/generators/AutoFilterer-Generators.md",old)
,new ("AutoInterface https://github.com/beakona/AutoInterface",old)
,new ("Avalonia.NameGenerator https://github.com/AvaloniaUI/Avalonia.NameGenerator",old)
,new ("avatar https://github.com/kzu/avatar",archived)
,new ("Azura https://github.com/cyriaca/Azura"," System.Text.Json has already not refelection serializer")
,new ("BetterEnums https://github.com/Ceiridge/BetterEnums",old)
,new ("BigMachines https://github.com/archi-Doc/BigMachines","state machine - full of features. To be analyzed , need help")
,new ("BlazorInteropGenerator https://github.com/surgicalcoder/BlazorInteropGenerator",old)
,new ("BlazorOcticons https://github.com/BlazorOcticons/BlazorOcticons",old)
,new ("boilerplatezero https://github.com/IGood/boilerplatezero","not yet ready to test something that depends on WPF")
,new ("Buildenator https://github.com/progala2/Buildenator",old)
,new ("ComputeSharp https://github.com/Sergio0694/ComputeSharp",inspirational)
,new ("CoreWCF https://github.com/CoreWCF/CoreWCF",inspirational)
,new ("Credfeto.Enumeration.Source.Generation https://github.com/credfeto/credfeto-enum-source-generation",WaitingForIssue)
,new ("Data Builder Generator https://github.com/dasMulli/data-builder-generator",old)
,new ("DependencyManagement https://github.com/essy-ecosystem/dependency-management","DI container. To be analyzed")
,new ("DevExpress.Mvvm.CodeGenerators https://github.com/DevExpress/DevExpress.Mvvm.CodeGenerators",old)
,new ("docopt.net https://github.com/docopt/docopt.net",old)
,new ("dot-env-generator https://github.com/betwixt-labs/dot-env-generator",old)
,new ("dotVariant https://github.com/mknejp/dotvariant",old)
,new ("Durian https://github.com/piotrstenke/Durian",old)
,new ("Enum.Source.Generator https://github.com/EngRajabi/Enum.Source.Generator",old)
,new ("EnumerationClassGenerator https://github.com/HamedFathi/EnumerationClassGenerator",old)
,new ("EnumFastToStringDotNet https://github.com/Spinnernicholas/EnumFastToStringDotNet",old)
,new ("EnumUtilitiesGenerator https://github.com/leoformaggi/enum-utilities-generator",old)
,new ("Fairy https://github.com/hermanussen/Fairy",old)
,new ("FastEnumGenerator https://github.com/musictopia2/FastEnumGenerator",noReadMe)
,new ("Flattening https://github.com/Kros-sk/Kros.Generators.Flattening",old)
,new ("FluentBuilder https://github.com/StefH/FluentBuilder",old)
,new ("GenerateHelperLibraries https://github.com/musictopia2/GenerateHelperLibraries",old)
,new ("GitBuildInfo.SourceGenerator https://github.com/Elskom/GitBuildInfo.SourceGenerator",old)
,new ("GraphQL.Tools https://github.com/MoienTajik/GraphQL.Tools",old)
,new ("GrpcInjection https://github.com/juniorporfirio/grpcinjection",old)
,new ("GRPC-Mock-Server https://github.com/cezarypiatek/GRPC-Mock-Server",tooComplicated)
,new ("HttpClientCodeGenerator https://github.com/Jalalx/HttpClientCodeGenerator",old)
,new ("H.NSwag.Generator https://github.com/HavenDV/H.NSwag.Generator","nswag , need help")
,new ("IDisposableGenerator https://github.com/Elskom/IDisposableGenerator",WaitingForIssue)
,new ("Imp.NET https://github.com/DouglasDwyer/Imp.NET",old)
,new ("InterfaceGenerator https://github.com/daver32/InterfaceGenerator",old)
,new ("IoTHubClientGenerator https://github.com/alonf/IoTHubClientGenerator",old)
,new ("Jab https://github.com/pakrym/jab","Service + DI container. I use the one from MSFT")
,new ("JsonByExampleGenerator https://github.com/hermanussen/JsonByExampleGenerator",old)
,new ("JsonDeserializeResourceSourceGenerator https://github.com/musictopia2/JsonDeserializeResourceSourceGenerator",noReadMe)
,new ("JsonSerializerContextGenerator https://github.com/musictopia2/JsonSerializerContextGenerator",noReadMe)
,new ("JsonSrcGen https://github.com/trampster/JsonSrcGen",old)
,new ("kli.Localize https://github.com/kl1mm/localize",old)
,new ("lambdajection https://github.com/cythral/lambdajection",old)
,new ("Lazysh https://github.com/B1Z0N/LazyshGen",old)
,new ("LinqGen https://github.com/cathei/LinqGen",tooComplicated)
,new ("LoggingDecoratorGenerator https://github.com/DavidFineboym/LoggingDecoratorGenerator","Microsoft have done same feature")
,new ("MapDataReader https://github.com/jitbit/MapDataReader",old)
,new ("MappingCloningExtensions https://github.com/musictopia2/MappingCloningExtensions",noReadMe)
,new ("MediatR controllers generator https://github.com/Burgyn/MMLib.MediatR.Generators",old)
,new ("MemberAccessGenerator https://github.com/ufcpp/MemberAccessGenerator",old)
,new ("MockableStaticGenerator https://github.com/HamedFathi/MockableStaticGenerator",old)
,new ("MockSourceGenerator https://github.com/hermanussen/MockSourceGenerator",old)
,new ("MrMeeseeks.DIE https://github.com/Yeah69/MrMeeseeks.DIE",old)
,new ("MrMeeseeks.ResXToViewModelGenerator https://github.com/Yeah69/MrMeeseeks.ResXToViewModelGenerator",old)
,new ("MrMeeseeks.StaticDelegateGenerator https://github.com/Yeah69/MrMeeseeks.StaticDelegateGenerator",old)
,new ("MrMeeseeks.Visitor https://github.com/Yeah69/MrMeeseeks.Visitor",old)
,new ("MvvmGen https://github.com/thomasclaudiushuber/mvvmgen",tooComplicated)
,new ("N.SourceGenerators.UnionTypes https://github.com/Ne4to/N.SourceGenerators.UnionTypes",old)
,new ("Navitski.Crystalized https://github.com/AlexNav73/CoreCraft"," JSON to classes. Waiting for .NET 8 to see if MSFT has done natively")
,new ("net_automatic_interface https://github.com/codecentric/net_automatic_interface",old)
,new ("Plastic https://github.com/sang-hyeon/Plastic",old)
,new ("PrimaryConstructor https://github.com/chaowlert/PrimaryConstructor",old)
,new ("PrimitiveStaticDataGenerator https://github.com/iiweis/PrimitiveStaticDataGenerator",old)
,new ("PrintMembersGenerator https://github.com/Youssef1313/PrintMembersGenerator",old)
,new ("ProxyInterfaceGenerator https://github.com/StefH/ProxyInterfaceSourceGenerator",old)
,new ("Pure.DI https://github.com/DevTeam/Pure.DI",tooComplicated)
,new ("RazorPageRouteGenerator https://github.com/surgicalcoder/RazorPageRouteGenerator",old)
,new ("ScenarioTests https://github.com/koenbeuk/ScenarioTests",old)
,new ("SerdeDn serde-sn) https://github.com/serdedotnet/serde","serializer. Done by MSFT with System.Text.Json")
,new ("SmallSharp https://github.com/devlooped/SmallSharp",old)
,new ("SmartAnnotations https://github.com/fiseni/SmartAnnotations",old)
,new ("SourceApi https://github.com/alekshura/SourceApi",old)
,new ("SourceConfig https://github.com/alekshura/SourceConfig",old)
,new ("SourceGeneratorQuery https://github.com/roeibajayo/SourceGeneratorQuery",old)
,new ("SourceInject https://github.com/giggio/sourceinject/",old)
,new ("SourceMapper https://github.com/paiden/SourceMapper/",old)
,new ("SourceMapper https://github.com/alekshura/SourceMapper",old)
,new ("SqlMarshal https://github.com/kant2002/SqlMarshal",old)
,new ("ST.NSwag.ServerSourceGenerator https://github.com/s-tarasov/ST.NSwag.ServerSourceGenerator","swagger,need help")
,new ("StackXML https://github.com/ZingBallyhoo/StackXML",old)
,new ("StronglyTypedEmbeddedResources https://github.com/surgicalcoder/StronglyTypedEmbeddedResources",old)
,new ("StructPacker https://github.com/RudolfKurka/StructPacker",old)
,new ("Svg to C# Source Generators https://github.com/wieslawsoltes/Svg.Skia",old)
,new ("TeuJson https://github.com/Terria-K/TeuJson","json a class, was done in System.Text.Json")
,new ("Thunderboltloc https://github.com/AlyElhaddad/ThunderboltIoc",old)
,new ("ToString https://github.com/Burgyn/MMLib.ToString",old)
,new ("Transplator https://github.com/atifaziz/Transplator",old)
,new ("TupleOverloadGenerator https://github.com/ProphetLamb/TupleOverloadGenerator",tooComplicated)
,new ("TxtToListGenerator https://github.com/musictopia2/TxtToListGenerator",noReadMe)
,new ("ValueChangedGenerator https://github.com/ufcpp/ValueChangedGenerator",old)
,new ("ValueLink https://github.com/archi-Doc/ValueLink",tooComplicated)
,new ("ValueObjectGenerator https://github.com/RyotaMurohoshi/ValueObjectGenerator",old)
,new ("Visor https://github.com/Tinkoff/Visor",tooComplicated)
,new("PolySharp https://github.com/Sergio0694/PolySharp",tooComplicated)
,new ("Figgle, https://github.com/drewnoakes/figgle",old)
,new("Jos.Enumeration, https://github.com/joseftw/jos.enumeration",tooComplicated)
,new("AutoSpectre, https://github.com/jeppevammenkristensen/auto-spectre",tooComplicated)
, new("PrimaryParameter https://github.com/FaustVX/PrimaryParameter",later + " in .net 8")
,new("Xtz.StronglyTyped https://github.com/dev-experience/Xtz.StronglyTyped",old)
,new("Tortuga.Shipwright https://github.com/TortugaResearch/Tortuga.Shipwright",tooComplicated)
,new ("FastEndpoints https://github.com/FastEndpoints/FastEndpoints", tooComplicated)
, new ("ControllerGenerator https://github.com/cloud0259/ControllerGenerator",WaitingForIssue)
,new("WinUI-ObservableSettings https://github.com/JasonWei512/WinUI-ObservableSettings", lessNet7 )
,new("AutoInvoke.Generator https://github.com/LokiMidgard/AutoInvoke.Generator",tooComplicated)
,new ("CSV-Parser-Generator https://github.com/LokiMidgard/CSV-Parser-Generator", old)
, new NoExample("DudNet https://github.com/jwshyns/DudNet",WaitingForIssue)
,new NoExample("FluentAssertions.Eventual https://github.com/mazharenko/FluentAssertions.Eventual",tooComplicated)
,new NoExample("lucide-blazor https://github.com/brecht-vde/lucide-blazor/",inspirational )//https://blog.vanderelst.dev/using-source-generators-to-create-a-blazor-icon-library
,new NoExample("HubClientProxyGenerator https://www.nuget.org/packages/Microsoft.AspNetCore.SignalR.Client.SourceGenerator",inspirational)   
,new NoExample("ArchomedaDisposeGenerator https://github.com/Archomeda/DisposeGenerator",old)
,new NoExample("PolymorphicJsonSourceGenerator https://github.com/harrhp/PolymorphicJsonSourceGenerator/","work just with records")
, new NoExample("VisitorPatternGenerator https://github.com/hikarin522/VisitorPatternGenerator/",WaitingForIssue)
};
    
     //there are more https://ignatandrei.github.io/RSCG_Examples/v2/docs/CommunityToolkit.Mvvm
     //https://github.com/search?q=repo%3ACommunityToolkit%2Fdotnet++IIncrementalGenerator&type=code
     Dictionary<string, GeneratorData> generators;
    private readonly string rootPath;
    private Description[]? _AllDescriptions = null;
    private FoundFile[]? MicrosoftRSCG= null;
    public MultiGeneratorV2(string root)
    {
        rscgNoExamples = rscgNoExamples.OrderBy(it => it.name).ToArray();

        this.rootPath = root;
        DateTime dtStart = new(2023, 04, 16);
        GeneratorData before = new(true, dtStart);
        generators = new()
        {
            { "ThisAssembly",before.PutCategory(Category.EnhancementProject) },
            {"RSCG_TimeBombComment",before.PutCategory(Category.EnhancementProject)},
            {"System.Text.Json",before.PutCategory(Category.Serializer) },
            {"RSCG_Utils",before.PutCategory(Category.FilesToCode) },
            {"System.Text.RegularExpressions",before.PutCategory(Category.EnhancementClass) },
            {"SkinnyControllersCommon",before.PutCategory(Category.API) },
            {"Microsoft.Extensions.Logging",before.PutCategory(Category.EnhancementClass) },
            {"RSCG_Static",before.PutCategory(Category.EnhancementClass) },
            {"CommunityToolkit.Mvvm",before.PutCategory(Category.MVVM) },
            {"RSCG_AMS",before.PutCategory(Category.EnhancementProject) },
            {"AutoDeconstruct",before.PutCategory(Category.Constructor) },
            {"System.Runtime.InteropServices",before.PutCategory(Category.EnhancementClass) },
            {"QuickConstructor",before.PutCategory(Category.Constructor) },
            {"AutoCtor",before.PutCategory(Category.Constructor) },
            { "dunet",before.PutCategory(Category.FunctionalProgramming)},
            {"Vogen",before.PutCategory(Category.PrimitiveObsession) },
            {"RazorBlade",before.PutCategory(Category.Templating) },
            { "PartiallyApplied",before.PutCategory(Category.FunctionalProgramming)},
            {"Apparatus.AOT.Reflection",before.PutCategory(Category.EnhancementClass) },
            {"NetEscapades.EnumGenerators",before.PutCategory(Category.EnhancementClass) },
            {"Microsoft.Interop.JavaScript.JSImportGenerator",before.PutCategory(Category.EnhancementClass) },
            {"RSCG_FunctionsWithDI",before.PutCategory(Category.EnhancementProject) },
            {"Microsoft.NET.Sdk.Razor.SourceGenerators",before.PutCategory(Category.Templating) },
            {"Rocks" ,before.PutCategory(Category.Tests)},
            {"mapperly",before.PutCategory(Category.Mapper) },
            {"Podimo.ConstEmbed",before.PutCategory(Category.FilesToCode) },
            {"EmbeddingResourceCSharp",before.PutCategory(Category.FilesToCode) },
            {"Lombok.NET",before.PutCategory(Category.EnhancementClass) },
            {"Gedaq", new (true,new(2023,7,29),Category.Database)},
            {"Refit",new(true,new(2023,7,31),Category.API) },
            {"MorrisMoxy", new(true,new(2023,8,1), Category.EnhancementClass)},
            {"Mediator" , new(true,new(2023,8,2), Category.EnhancementProject)},
            {"Matryoshki" , new(true,new(2023,8,3), Category.EnhancementProject)},
            {"MemoryPack" , new(true,new(2023,8,4), Category.EnhancementClass)},
            {"DeeDee" , new(true,new(2023,8,5),Category.EnhancementProject)},
            {"ProxyGen", new(true,new(2023,8,6),Category.EnhancementProject)},
            {"AutoRegisterInject" , new(true,new(2023,8,7), Category.DependencyInjection)},
            {"EnumClass" , new(true,new(2023,8,8), Category.EnhancementClass)},
            {"Breezy", new(true,new(2023,8,9),Category.Database)},
            {"FastGenericNew" , new(true,new(2023,8,10),Category.EnhancementClass)},
            {"GeneratorEquals", new(true,new(2023,8,11),Category.EnhancementClass)},
            {"Immutype",  new(true,new(2023,8,12), Category.EnhancementClass)},
            {"spreadcheetah" ,  new(true,new(2023,8,13),Category.Templating)},
            {"zomp" ,  new(true,new(2023,8,14),Category.EnhancementClass)},
            {"IDisp", new(true,new(2023,8,15),Category.Disposer)},
            {"NextGenMapper" , new(true,new(2023,8,16),Category.Mapper)},
            {"Injectio" , new(true,new(2023,8,17),Category.DependencyInjection)},
            {"PropChange", new(true,new(2023,8,18), Category.MVVM)},
            {"Strongly", new(true,new(2023,8,19), Category.PrimitiveObsession)},
            {"Ridge" , new(true,new(2023,8,20),Category.Tests)},
            {"OneOf", new(true,new(2023,8,21), Category.FunctionalProgramming)},
            {"Gobie" , new(true,new(2023,8,22),Category.Templating)},
            {"RSCG_WebAPIExports", new(true,new(2023,8,23),Category.API)},
            {"AutoDTO",new (true,new (2023,8,24),Category.Mapper) },
            {"M31FluentAPI",new(true,new (2023,8,25),Category.EnhancementClass)},
            {"Roozie.AutoInterface",new GeneratorData(true,new(2023,8,26),Category.EnhancementClass) },
            {"Memo",new GeneratorData(true,new(2023,8,27),Category.FunctionalProgramming) },
            {"ThisAssembly_Resources", new GeneratorData(true,new(2023,9,16),Category.FilesToCode) },
            {"SourceGenerator.Helper.CopyCode",new (true, new(2023,9,17), Category.EnhancementProject) },
            {"SafeRouting",new(true,new(2023,09,23),Category.API) },
            {"ProtobufSourceGenerator",new (true,new(2023,09,24),Category.Serializer) },
            {"RSCG_Decorator",new(true,new(2023,9,30),Category.EnhancementClass) },
            {"StringLiteral", new(true,new(2023,10,1),Category.Optimizer) },
            {"ResXGenerator", new (true,new(2023,10,2),Category.FilesToCode) },
            {"Disposer",new(true, new(2023,10,3),Category.Disposer) },
            {"BuilderGenerator", new (true,new(2023,10,4),Category.EnhancementClass) },
            {"MapTo", new (true,new(2023,10,5),Category.Mapper ) },
            {"JsonPolymorphicGenerator", new (true,new(2023,10,6),Category.Serializer  )},
            //{"MagicMap" ,new(true,new(2023,10,7),Category.Mapper)},
            //{"DisposableHelpers",new(true,new(2023,10,8),Category.Disposer) }

        };
        var noCategory = generators.Where(it=>it.Value.Category == Category.None).ToArray();
        if (noCategory.Length > 0)
        {
            throw new ArgumentException("please put category on " + noCategory[0].Key);
        }
        //foreach (var v in generators) 
        //{
        //    generators[v.Key] = (v.Key == "Microsoft.Interop.JavaScript.JSImportGenerator");
        //}
    }
    public async Task OpenFindIIncremental()
    {
        var data= rscgNoExamples.Where(it=>it.why== old).ToArray();
        foreach (var item in data)
        {
            string url = item.FindIIncremental();
            var ps = new ProcessStartInfo(url)
            {
                UseShellExecute = true,
                Verb = "open",
                
            };
            Process.Start(ps);
            await Task.Delay(1000 * Random.Shared.Next(1,5));
        }
    }
    public async Task<string[]?> GatherData()
    {
        string folderExamples = Path.Combine(rootPath, "rscg_examples");
        var tasks = generators
            .Select(it => new { it.Key, it.Value })
            .Select((it, nr) =>
                it.Value.show ? GatherData(nr + 1, it.Key, folderExamples,it.Value.dtStart) : null)
            .Where(it => it != null)
            .ToArray();
        ArgumentNullException.ThrowIfNull(tasks);
        var data=await Task.WhenAll(tasks!);
        ArgumentNullException.ThrowIfNull(data);
        _AllDescriptions  = data
            .Where(it=>it !=null)
            .Select(it=>it!)
            .ToArray();
        var l = _AllDescriptions.Length;
        foreach (var item in _AllDescriptions)
        {
            item.ReverseNr = l - item.Nr;
            
            item.GeneratorData = generators.ValueOf(item.GeneratorKey??"");
        }
        return _AllDescriptions!.Select(it => it.Generator!.Source!).ToArray();

    }
    public string[] SourceNoRSCG()
    {
        return rscgNoExamples.Select(it=>it.SiteRSCG).ToArray();
    }
    public async Task<string?> GrabReadMe()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        var t = _AllDescriptions
            .Select(it =>GrabReadMe(it).AddData(it))
            .ToArray();
        //t = _AllDescriptions.SelectTaskWithData(GrabReadMe).ToArray();
        var desc = await Task.WhenAll(t);
        foreach(var it in desc)
        {
            it.data.OriginalReadme = it.res;
        }
        //foreach(var it in _AllDescriptions!)
        //{
        //    var nameFile = Path.Combine(it.rootFolder!, "readme.txt");
        //    if (!File.Exists(nameFile))
        //        continue;
        //    it.OriginalReadme= await File.ReadAllTextAsync(nameFile);

        //}
        return "";
    }
    async Task<string?> GrabReadMe(Description d)
    {
        var source = d.Generator?.Source;
        if(string.IsNullOrWhiteSpace(source))
            return null;

        var nameFile = Path.Combine(d.rootFolder!, "readme.txt");
        if (File.Exists(nameFile))
        {
            var text=await File.ReadAllTextAsync(nameFile);
            text = text.Replace("(LICENSE)", $"({d.Generator!.Source}/LICENSE)");
            return text;
        }
            ;

        var data = await tryToGetReadme(source);
        if (data == null) return null;
        await File.WriteAllTextAsync(nameFile, data);
        return data;
    }
    async Task<string?> tryToGetMasterOrMain(HttpClient httpClient,string FullUrl)
    {
        var response = await httpClient.GetAsync(FullUrl);
        if(response.StatusCode == HttpStatusCode.OK) return await response.Content.ReadAsStringAsync();
        FullUrl = FullUrl.Replace("/main/", "/master/");
        response = await httpClient.GetAsync(FullUrl);
        if (response.StatusCode == HttpStatusCode.OK) return await response.Content.ReadAsStringAsync();
        return null;
    }
    async Task<string?> tryToGetReadme(string source)
    {
        if(!source.StartsWith("https://github.com/"))
            return null;
        var url = source.Replace("https://github.com/", "https://raw.githubusercontent.com/");
        url += "/main/";
        HttpClientHandler handler = new ()
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        using HttpClient httpClient = new (handler);
        
        var response = await tryToGetMasterOrMain(httpClient,url+"README.md");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response    = await tryToGetMasterOrMain(httpClient,(url + "readme.md"));
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response =  await tryToGetMasterOrMain(httpClient,(url + "Readme.md"));
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response = await tryToGetMasterOrMain(httpClient, url + "README.MD");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        Console.WriteLine("!!! not grab readme.md from "+source + " with url "+ url);
        return null;

    }
    public async Task<long> GrabDescriptionFromNuget()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);

        var t = _AllDescriptions.Select(
            it => new TaskWithData<Description, string?>(it, GrabDescriptionFromNuget(it))
            )
            .Select(td=>td.GetTask())            
            .ToArray();

        var desc = await Task.WhenAll(t);
        foreach (var item in desc)
        {
            item.data.DescriptionNuget = item.res;
        }
        return t.Length;



        //var t = _AllDescriptions!
        //    .Select(it => GrabDescriptionFromNuget(it))
        //    .ToArray();
        //var desc = await Task.WhenAll(t);
        //foreach (var item in _AllDescriptions!)
        //{
        //    var nameFile = Path.Combine(item.rootFolder!, "nuget.txt");
        //    if (File.Exists(nameFile))
        //        item.DescriptionNuget = await File.ReadAllTextAsync(nameFile);
        //}
        //return desc.Length;
    }
    async Task<string?> GrabDescriptionFromNuget(Description d)
    {
        var nameFile = Path.Combine(d.rootFolder!, "nuget.txt");
        if(File.Exists(nameFile))
            return await File.ReadAllTextAsync(nameFile);

        if (d.Generator!.NugetFirst.Length == 0)
            return "";

        var namePackage = d.Generator!.NameNugetFirst().ToLower();
     
        var url = $"https://api.nuget.org/v3/registration5-gz-semver2/{namePackage}/index.json";
        var handler = new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        HttpClient _client = new(handler);
     
        var response = await _client.GetAsync(url);
        var data=await response.Content.ReadAsStringAsync();
        var answer= JsonDocument.Parse(data);
        var items = answer.RootElement.GetProperty("items");
        foreach (var item in items.EnumerateArray())
        {
            var newItems = item.GetProperty("items");
            foreach (var newItem in newItems.EnumerateArray())
            {
                var cat=newItem.GetProperty("catalogEntry");
                var desc=cat.GetProperty("description").GetString();
                if (!string.IsNullOrEmpty(desc))
                {
                    await File.WriteAllTextAsync(nameFile, desc);
                    return desc;
                }
            }
        }
        return "";
    }

    public async Task CreateZip()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => CreateZipFiles(it, pathDocusaurus)));

        //create the microsoft zip
        Description d = new ();
        var strRoot = _AllDescriptions.First().rootFolder;
        ArgumentException.ThrowIfNullOrEmpty(strRoot);
        var dirInfo = new DirectoryInfo(strRoot);
        ArgumentNullException.ThrowIfNull(dirInfo);
        ArgumentNullException.ThrowIfNull(dirInfo.Parent);
        ArgumentException.ThrowIfNullOrEmpty(dirInfo.Parent.FullName);
        d.rootFolder = Path.Combine(dirInfo.Parent.FullName,"Microsoft");
        d.Generator = new();
        d.Generator.Name = "Microsoft";
        await CreateZipFiles(d, pathDocusaurus);

    }
    bool Write(string zipFileOrPdf)
    {
        //return false;
        if (File.Exists(zipFileOrPdf))
        {
            if (new FileInfo(zipFileOrPdf).Length < 3)
            {
                File.Delete(zipFileOrPdf);
                return true;
            }
            else
                return false;
        }
        return true;
    }
    private async Task<bool> CreateZipFiles(Description desc, string rootFolder)
    {
        ArgumentNullException.ThrowIfNull(desc.rootFolder);
        string sources = Path.Combine(desc.rootFolder, "src");
        await CleanProject(sources);
        ArgumentNullException.ThrowIfNull(desc.Generator);
        var zipFile = Path.Combine(rootFolder, "static", "sources", desc.Generator.Name + ".zip");
        //Console.WriteLine(zipFile);
        if (!Write(zipFile)) return false;
        ZipFile.CreateFromDirectory(sources, zipFile, CompressionLevel.SmallestSize, false);
        return true;
    }
    private async Task<Description> GatherData(int nr, string generator, string rootFolder,DateTime generatedDate)
    {
        var folder = Path.Combine(rootFolder, generator);
        var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
        var desc = JsonSerializer.Deserialize<Description>(text);
        ArgumentNullException.ThrowIfNull(desc);
        desc.Nr = nr;
        desc.GeneratorKey = generator;
        desc.rootFolder = folder;
        desc.generatedDate = generatedDate;
        string sources = Path.Combine(desc.rootFolder, "src");
        //await CleanProject(sources);
        //var zipFile = Path.Combine(rootFolder + "_site", "static", "sources", desc.Generator.Name + ".zip");
        ////Console.WriteLine(zipFile);
        //if (File.Exists(zipFile)) File.Delete(zipFile);
        //ZipFile.CreateFromDirectory(sources, zipFile,CompressionLevel.SmallestSize,false);
        //await BuildProject(sources);
        ArgumentNullException.ThrowIfNull(desc.Data);
        ArgumentNullException.ThrowIfNull(desc.Data.CSProj);
        var csprojItems = Directory.GetFiles(sources, desc.Data.CSProj, SearchOption.AllDirectories);
        if (csprojItems.Length != 1)
        {
            throw new Exception($"cannot find {desc.Data.CSProj}");
        }
        var output = desc.Data.outputFiles;
        output.fullPathToCsproj = csprojItems[0];
        ArgumentNullException.ThrowIfNull(desc.Data);
        ArgumentNullException.ThrowIfNull(desc.Data.CsFiles);
        output.csFiles = desc.Data.CsFiles;
        ArgumentNullException.ThrowIfNull(desc.Generator);
        var nugetName = desc.Generator.NugetFirst;
        if(!string.IsNullOrWhiteSpace(nugetName))
        nugetName = nugetName
            .Split("/")
            .Where(it=>!string.IsNullOrWhiteSpace(it))
            .Last();
        await output.GatherData(nugetName);
        
        //Console.WriteLine(desc.Data.outputFiles.ContentCsProj);
        return desc;
    }
    private async Task<bool> CleanProject(string path)
    {
        //Console.WriteLine("Starting in" + path);
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = path;
        psi.FileName = @"C:\Program Files\dotnet\dotnet.exe";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = true;
        psi.CreateNoWindow = true;
        psi.Arguments = "clean";

        var p = new Process();
        p.StartInfo = psi;

        p.Start();
        p.PriorityClass = ProcessPriorityClass.RealTime;
        await p.WaitForExitAsync();
        return p.ExitCode == 0;
    }
    private async Task<bool> BuildProject(string path)
    {
        //Console.WriteLine("Starting in" + path);
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = path;
        psi.FileName = @"C:\Program Files\dotnet\dotnet.exe";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = true;
        psi.CreateNoWindow = true;
        psi.Arguments = "build";
        var p = new Process();
        p.StartInfo = psi;

        p.Start();
        p.PriorityClass = ProcessPriorityClass.RealTime;
        await p.WaitForExitAsync();
        return p.ExitCode == 0;
    }
    private string pathDocusaurus
    {
        get
        {
            return Path.Combine(this.rootPath, "rscg_examples_site");
        }
    }
    private string pathBook
    {
        get
        {
            return Path.Combine(this.rootPath, "book");
        }
    }
    internal async Task WrotePDFs()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.Delay(1000);
        return; 
        //await Task.WhenAll(_AllDescriptions.Select(it => WrotePDF(it, pathDocusaurus,pathBook)));
    }
    internal async Task CreateHTMLBook()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => CreateHTMLBook(it, Path.Combine(pathBook, "examples"))));
        var list = new RSCG_List(_AllDescriptions);
        var data = list.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, "list.html"), data);

        var pandocYML = new pandocHTML(_AllDescriptions);
        var pandoc = pandocYML.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, "pandocHTML.yaml"), pandoc);
        //pandoc.exe -d pandocHTML.yaml -o index.docx
        //pandoc.exe -d pandocHTML.yaml -o index.html
        //await WroteIndex(pathBook);
    }
    private async Task<bool> WroteIndex(string pathOfBook)
    {
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = pathOfBook;
        //psi.FileName = "cmd.exe";
        psi.FileName = Path.Combine(pathOfBook, "pandoc.exe");
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = $@"-d  pandocHTML.yaml  -o index.html";

        Console.WriteLine(psi.Arguments);
        //psi.ArgumentList.Add("/K ");
        //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }


    private async Task CreateHTMLBook(Description it, string pathBook)
    {
        ArgumentNullException.ThrowIfNull(it.Generator);
        var item = new RSCG_Item(it);
        var data = item.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, it.Generator.Name + ".html"), data);
    }
    
    internal async Task CreateImageFiles()
    {
        try
        {
            Ping p = new();
            var pr = p.Send("www.yahoo.com");
            if (pr.Status != IPStatus.Success)
            {
                Console.WriteLine("no internet");
                return;
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine("no internet" + ex.Message);
            return;
        }

        var pathImages = Path.Combine(pathBook, "examples", "images");
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        foreach (var item in _AllDescriptions)
        {
            await CreateImageFile(item, pathImages);
        }
        var textNoImages = Directory.GetFiles(pathImages, "*.txt",SearchOption.AllDirectories);
        foreach(var txt in textNoImages)
        {
            if(!File.Exists(txt.Substring(0,txt.Length-4)+".png"))
            {
                Console.WriteLine($"PLEASE MAKE IMAGE FOR {txt}");
            }
        }
    }

    private async Task CreateImageFile(Description it, string pathImages)
    {
        ArgumentNullException.ThrowIfNull(it.Generator);
        var name = it.Generator.Name;
        ArgumentNullException.ThrowIfNull(name);
        var folderToGenerate = Path.Combine(pathImages, name);
        if (!Directory.Exists(name))
            Directory.CreateDirectory(name);
        ArgumentNullException.ThrowIfNull(it.Data);
        var csproj = it.Data.outputFiles.fullPathToCsproj;
        ArgumentNullException.ThrowIfNull(it.Data.CSProj);
        ArgumentNullException.ThrowIfNull(csproj);
        await CreateCarbonFile(csproj, Path.Combine(folderToGenerate, it.Data.CSProj));
        string csFiles = Path.Combine(folderToGenerate, "csFiles");
        if (!Directory.Exists(csFiles))
            Directory.CreateDirectory(csFiles);
        ArgumentNullException.ThrowIfNull(it.Data);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles.contentFiles);
        foreach (var item in it.Data.outputFiles.contentFiles)
        {
            await CreateCarbonFile(item.fullPathFile, Path.Combine(csFiles, Path.GetFileName(item.fullPathFile)));
        }

        string generated = Path.Combine(folderToGenerate, "generated");
        if (!Directory.Exists(generated))
            Directory.CreateDirectory(generated);
        ArgumentNullException.ThrowIfNull(it.Data);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles.generatedFiles);
        foreach (var gen in it.Data.outputFiles.generatedFiles)
        {
            await CreateCarbonFile(gen.fullPathFile, Path.Combine(generated, Path.GetFileName(gen.fullPathFile)));
        }



    }
    private async Task<bool> CreateCarbonFile(string imageFile, string destination)
    {
        var nameFileImg = Path.GetFileName(destination);
            
        if (File.Exists(destination) || File.Exists(destination + ".png"))
            return false;
        if (!File.Exists(destination + ".txt"))
        {
            await File.WriteAllTextAsync(destination + ".txt", File.ReadAllText(imageFile));
        }

        //if (destination.Contains("RazorTemplate.g.cs")) return true;
        ProcessStartInfo psi = new ();
        //psi.WorkingDirectory = @"carbon-now.cmd";
        //psi.FileName = "cmd.exe";
        psi.FileName = @"carbon-now.cmd";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = $"{imageFile} --save-to {Path.GetDirectoryName(destination)} --save-as {Path.GetFileName(destination)}";

        Console.WriteLine(psi.Arguments);
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    internal async Task<bool> WroteDocusaurusAll()
    {
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await ModifyDocusaurusTotalExamples(pathDocusaurus, generators.Count);
        await ModifyDocusaurusWithoutExamples(pathDocusaurus);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WroteDocusaurus(it, pathDocusaurus)));
        if(!await WroteIndexListOfRSCG(this.rootPath))
        {
            Console.WriteLine(" please make true to all to write index");
        }
        return true;
    }

    private async Task<bool> WroteIndexListOfRSCG(string rootPath)
    {
        if (generators.Any(it => !it.Value.show))
            return false;
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        var pathIndex = Path.Combine(pathDocusaurus,"docs", "indexRSCG.md");
        var template = await File.ReadAllTextAsync("RSCGList.txt");
        var templateScriban = Scriban.Template.Parse(template);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        var output = templateScriban.Render(
            new {nr= _AllDescriptions.Length, all = _AllDescriptions, nrMSFT=MicrosoftRSCG?.Length, MSFT=MicrosoftRSCG },
            member => member.Name);
        await File.WriteAllTextAsync(pathIndex, output);
        //now the mermaid 
        
        var templateMermaidText = await File.ReadAllTextAsync("RSCGListMermaid.txt");
        var templateMermaid = Scriban.Template.Parse(templateMermaidText)  ;
        var categs = _AllDescriptions
            .Select(it=>it.GeneratorData?.Category??Category.None)
            .Distinct()
            .Select(it=>it.ToString())
            .OrderBy(it=>it).ToArray();
        var all = _AllDescriptions.OrderBy(it => (it.GeneratorData?.Category ?? Category.None).ToString());
        var categDict=all
            .GroupBy(it=> (it.GeneratorData?.Category ?? Category.None).ToString())
            .ToDictionary(it=>it.Key,it=>it.ToArray());
        //this.MicrosoftRSCG
        var outputMermaid = templateMermaid.Render(new { nr = _AllDescriptions.Length,  categs,all,categDict}, 
            memberRenamer:(MemberInfo mi)=> mi.Name);
        var pathIndexMermaid = Path.Combine(pathDocusaurus, "docs", "RSCG-Examples", "index.md");
        await File.WriteAllTextAsync(pathIndexMermaid, outputMermaid);
        var allRSCG = _AllDescriptions.Select(it =>
            new {
                Name = it.Generator?.Name ?? "",
                Link = "https://ignatandrei.github.io/RSCG_Examples/v2/docs/" + it.GeneratorKey,
                NuGet = it.Generator?.NugetFirst ?? "",
                Source = it.Generator?.Source ?? "",
                Category = (it.GeneratorData?.Category ?? Category.None).ToString(),
                AddedOn = (it.generatedDate.ToString("s"))
            }).ToArray();
        var jsonObj = new
        {
            CodeSource = "https://github.com/ignatandrei/RSCG_Examples",
            Site= "https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG",
            All= allRSCG,
        };

        var textJson =JsonSerializer.Serialize(jsonObj,new JsonSerializerOptions()
        {
            WriteIndented = true,
        });
        var jsonPath = Path.Combine(pathDocusaurus, "static","exports");
        await File.WriteAllTextAsync(Path.Combine(jsonPath, "RSCG.json"), textJson);
        var excel = allRSCG.ToExcel(a =>
        {
            a.SheetName("RSCG");
            a.ColumnFilter(x => true);
        });
        await File.WriteAllBytesAsync(Path.Combine(jsonPath,"RSCG.xlsx"), excel);

        return true;
    }

    internal async Task WrotePost()
    {
        await Task.Delay(1000);
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        var x = 0;
        x++;
        //if(x>2)
        await Task.WhenAll(_AllDescriptions
            .Where(it=>DateTime.Now.Subtract( it.generatedDate).TotalDays < 5)
            .Select(it => WrotePost(it, pathDocusaurus))
            .ToArray());
    }

    private async Task ModifyDocusaurusTotalExamples(string pathDocusaurus, int nr) {
        await ModifyDocusaurusIndex(pathDocusaurus, nr);
        await ModifyDocusaurusAbout(pathDocusaurus, nr);
    }
    private async Task ModifyDocusaurusWithoutExamples(string pathDocusaurus)
    {
        var noEx = new NoExamples(rscgNoExamples);
        var text = noEx.Render();
        var index = Path.Combine(pathDocusaurus, "docs", "NoExamples.md");
        await File.WriteAllTextAsync(index,text);
    }
    private async Task ModifyDocusaurusAbout(string pathDocusaurus, int nr)
    {
        var index = Path.Combine(pathDocusaurus, "docs",  "about.md");
        var content = await File.ReadAllLinesAsync(index);
        string newContent = "";
        foreach (var line in content)
        {
            if (line.Contains("of ") && line.Contains("Roslyn Source Code Generator (RSCG)", StringComparison.InvariantCultureIgnoreCase))
            {
                newContent += $"of {nr} Roslyn Source Code Generator (RSCG)";

            }
            else
            {
                newContent += line;

            }
            newContent += Environment.NewLine;
        }
        await File.WriteAllTextAsync(index, newContent);



    }
    private async Task ModifyDocusaurusIndex(string pathDocusaurus, int nr)
    {
        var index = Path.Combine(pathDocusaurus, "src", "components", "HomepageFeatures", "index.tsx");
        var content = await File.ReadAllLinesAsync(index);
        string newContent = "";
        foreach(var line in content)
        {
            if (line.Contains("title:") && line.Contains("examples",StringComparison.InvariantCultureIgnoreCase))
            {
                newContent += $"title: '{nr} Examples ({MicrosoftRSCG?.Length} from MSFT)',";

            }
            else
            {
                newContent += line;

            }
            newContent += Environment.NewLine;
        }
        await File.WriteAllTextAsync(index,newContent);



    }
    private async Task<bool> WrotePDF(Description it, string pathOfDocusaurus,string pathOfBook)
    {
        string folderToWrite = Path.Combine(pathOfDocusaurus, "static", "pdfs");
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Generator.Name + ".pdf";
        file = Path.Combine(folderToWrite, file);
        if (!Write(file)) return false;
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = Path.Combine(pathOfBook, "examples");
        //psi.FileName = "cmd.exe";
        psi.FileName = Path.Combine(pathOfBook, "pandoc.exe");
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        string output = Path.Combine(pathOfDocusaurus, "static", "pdfs", it.Generator.Name+".pdf");
        Console.WriteLine($"writing {output} ");


        psi.Arguments = $@"{it.Generator.Name}.html -f html -t pdf -o {output}";

        Console.WriteLine(psi.Arguments);
        //psi.ArgumentList.Add("/K ");
        //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    //private async Task<bool> WrotePDF(Description it, string pathDocusaurus)
    //{
    //    string folderToWrite = Path.Combine(pathDocusaurus, "static", "pdfs");
    //    string file =  it.Generator.Name + ".pdf";
    //    file = Path.Combine(folderToWrite, file);
    //    if (!Write(file)) return false;
    //    var psi = new ProcessStartInfo();
    //    psi.WorkingDirectory = @"C:\Program Files (x86)\Prince\engine\bin";
    //    //psi.FileName = "cmd.exe";
    //    psi.FileName = @"C:\Program Files (x86)\Prince\engine\bin\prince.exe";
    //    psi.WindowStyle = ProcessWindowStyle.Hidden;
    //    psi.UseShellExecute = false;
    //    psi.CreateNoWindow = true;
    //    psi.Arguments = $@"https://ignatandrei.github.io/RSCG_Examples/v2/docs/{it.Generator.Name} -o {file}";

    //    Console.WriteLine(psi.Arguments);
    //    //psi.ArgumentList.Add("/K ");
    //    //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
    //    var p = new Process();
    //    p.StartInfo = psi;
    //    p.Start();
    //    await p.WaitForExitAsync();
    //    return (p.ExitCode == 0);

    //}
    private async Task<bool> WrotePost(Description it, string pathDocusaurus)
    {
        var template = await File.ReadAllTextAsync("newPost.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new { Description = it }, member => member.Name);
        string folderToWrite = Path.GetTempPath();
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Nr.ToString("00#") + it.Generator.Name + ".md";
        file = Path.Combine(folderToWrite, file);
        await File.WriteAllTextAsync(file, output);
        Process.Start("notepad.exe", file);
        //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }
    private async Task<bool> WroteDocusaurus(Description it, string pathDocusaurus)
    {
        ArgumentNullException.ThrowIfNull(it.GeneratorData);

        var category = it.GeneratorData.Category;
        var otherDesc  = _AllDescriptions!
            .Where(it=>it.GeneratorData?.Category == category)
            .Where(loop=>loop.Generator?.Name != it.Generator?.Name)
            .OrderBy(it=>it.Generator?.Name)
            .ToArray();
         
        var template = await File.ReadAllTextAsync("DocusaurusExample.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new {Description=it, otherDesc, category}, member => member.Name);
            
        string folderToWrite = Path.Combine(pathDocusaurus, "docs", "RSCG-Examples");
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Generator.Name+ ".md";
        file=Path.Combine(folderToWrite,file);
        await File.WriteAllTextAsync(file, output);
        //await File.WriteAllTextAsync(Path.Combine(folderToWrite, it.Generator.Name + "_readme.md"), it.OriginalReadme);
         //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }

    internal async Task WriteFrontReadMe(DescriptionOld?[] oldDesc)
    {
        oldDesc = oldDesc.Where(ut => ut != null).ToArray();
        var readMe = Path.Combine(rootPath, "..", "README.md");
        var template = await File.ReadAllTextAsync("frontReadmeNew.txt");
        var templateScriban = Scriban.Template.Parse(template);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        ArgumentNullException.ThrowIfNull(MicrosoftRSCG);
        string[] notShow =new[] { old, archived, inspirational, noReadMe };
        var output = templateScriban.Render(
            new {
                nrNoExamples = rscgNoExamples.Length,
                rscgNoExamples = rscgNoExamples.Where(it => !notShow.Contains(it.why)).ToArray(),
                nrOld = rscgNoExamples.Where(it => notShow.Contains(it.why)).Count(),
                rscgNoExamplesOld = rscgNoExamples.Where(it => notShow.Contains(it.why)).ToArray(),
                oldDesc,
                nr = _AllDescriptions.Length,
                all = _AllDescriptions,
                MSFT_RSCG = MicrosoftRSCG,
                MSFT_RSCG_NR = MicrosoftRSCG.Length,
                LatestUpdate = _AllDescriptions.Max(it=>it!.GeneratorData!.dtStart)
            },
            member => member.Name); 
        await File.WriteAllTextAsync(readMe, output);
    }
    

    internal async Task<long> GenerateMSFT()
    {
        string folderMSFT = Path.Combine(rootPath, "rscg_examples","Microsoft");
        await BuildProject(Path.Combine(folderMSFT, "src"));
        ByMicrosoft msft = new(folderMSFT);
        this.MicrosoftRSCG = await msft.Search();
        var nr = await msft.WriteFiles(Path.Combine(rootPath, "rscg_examples_site"));
        return nr;
        //var data= (await msft.Search()).ToList();
        //data.Sort((a,b) => a.NameGenerator.CompareTo(b.NameGenerator));
        
        //string folderWithDocs = Path.Combine(rootPath, "rscg_examples_site","docs", "Microsoft");
        //foreach (var ff in data)
        //{
        //    var item = new ItemMSFT(ff);
        //    var fileContents = await item.RenderAsync();
        //    var nameFile = Path.Combine(folderWithDocs, ff.NameGenerator.Replace(FoundFile.sepShow,"_"));
        //    nameFile += ".md";
        //    //Console.WriteLine(nameFile);
        //    await File.WriteAllTextAsync(nameFile, fileContents);
        //}
        ////var item = new MicrosoftItem(it);t
        ////var data = item.Render();
        //return data.Count;
    }

    internal async Task WriteAllIntoFile(string fileName)
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        
        StringBuilder sb = new ();
        sb.AppendLine("Nr,Key,Source,Category"); 
        foreach (var it in _AllDescriptions)
        {
            ArgumentNullException.ThrowIfNull(it);
            ArgumentNullException.ThrowIfNull(it.Generator);
            ArgumentNullException.ThrowIfNull(it.GeneratorData);
            sb.AppendLine($"{it.Nr},{it.GeneratorKey}, {it.Generator.Source},{it.GeneratorData.Category}");
        }
        await File.WriteAllTextAsync(fileName,sb.ToString());
    }

    internal async Task WriteVideo()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WriteVideo(it)));


    }

    private async Task WriteVideo(Description it)
    {
        VideoScenario vid = new VideoScenario(it);
        try
        {
            var data = await vid.RenderAsync();
            var nameFile = Path.Combine(it.rootFolder!, "video.md");
            await File.WriteAllTextAsync(nameFile, data);
        }
        catch(Exception ex)
        {
            Console.WriteLine("error for " + it.Generator?.Name??"" + " " + ex.Message);
        }
    }
}     