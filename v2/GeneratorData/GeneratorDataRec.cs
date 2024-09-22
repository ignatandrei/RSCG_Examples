namespace GeneratorData;
public record GeneratorDataRec(bool show, DateTime dtStart)
{
    public string ID { get; set; }
    public GeneratorDataRec(bool show, DateTime dtStart, Category category) : this(show, dtStart)
    {
        this.Category = category;
    }
    public Category Category { get; set; }
    public GeneratorDataRec PutCategory(Category category)
    {
        var cat = new GeneratorDataRec(show, dtStart, category);
        return cat;
    }
    public string DateString
    {
        get
        {
            return dtStart.ToString("s");
        }
    }

    public static Dictionary<string , GeneratorDataRec> Data()
    {
        DateTime dtStart = new(2023, 04, 16);
        GeneratorDataRec before = new(true, dtStart);

        return new()
        {
            { "ThisAssembly",before.PutCategory(Category.EnhancementProject) },
            {"RSCG_TimeBombComment",before.PutCategory(Category.EnhancementProject)},
            {"System.Text.Json",before.PutCategory(Category.Serializer) },
            {"RSCG_Utils",before.PutCategory(Category.FilesToCode) },
            {"System.Text.RegularExpressions",before.PutCategory(Category.EnhancementClass) },
            {"SkinnyControllersCommon",before.PutCategory(Category.API) },
            {"Microsoft.Extensions.Logging",before.PutCategory(Category.EnhancementClass) },
            {"RSCG_Static",before.PutCategory(Category.Interface) },
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
            {"NetEscapades.EnumGenerators",before.PutCategory(Category.Enum) },
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
            {"MorrisMoxy", new(true,new(2023,8,1), Category.Templating)},
            {"Mediator" , new(true,new(2023,8,2), Category.EnhancementProject)},
            {"Matryoshki" , new(true,new(2023,8,3), Category.Interface)},
            {"MemoryPack" , new(true,new(2023,8,4), Category.EnhancementClass)},
            {"DeeDee" , new(true,new(2023,8,5),Category.EnhancementProject)},
            {"ProxyGen", new(true,new(2023,8,6),Category.Interface)},
            {"AutoRegisterInject" , new(true,new(2023,8,7), Category.DependencyInjection)},
            {"EnumClass" , new(true,new(2023,8,8), Category.Enum)},
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
            {"Roozie.AutoInterface",new GeneratorDataRec(true,new(2023,8,26),Category.Interface) },
            {"Memo",new GeneratorDataRec(true,new(2023,8,27),Category.FunctionalProgramming) },
            {"ThisAssembly_Resources", new GeneratorDataRec(true,new(2023,9,16),Category.FilesToCode) },
            {"SourceGenerator.Helper.CopyCode",new (true, new(2023,9,17), Category.CodeToString) },
            {"SafeRouting",new(true,new(2023,09,23),Category.API) },
            {"ProtobufSourceGenerator",new (true,new(2023,09,24),Category.Serializer) },
            {"RSCG_Decorator",new(true,new(2023,9,30),Category.EnhancementClass) },
            {"StringLiteral", new(true,new(2023,10,1),Category.Optimizer) },
            {"ResXGenerator", new (true,new(2023,10,2),Category.FilesToCode) },
            {"Disposer",new(true, new(2023,10,3),Category.Disposer) },
            {"BuilderGenerator", new (true,new(2023,10,4),Category.Builder) },
            {"MapTo", new (true,new(2023,10,5),Category.Mapper ) },
            {"JsonPolymorphicGenerator", new (true,new(2023,10,6),Category.Serializer  )},
            {"RSCG_Templating",new(true,new(2023,10,7),Category.Templating) },
            {"MagicMap" ,new(true,new(2023,10,8),Category.Mapper)},
            {"DisposableHelpers",new(true,new(2023,10,9),Category.Disposer) },
            {"Poly",new(true,new(2023,10,10),Category.EnhancementClass) },
            {"IDisposableGenerator",new(true,new(2023,10,11),Category.Disposer) },
            {"CredFetoEnum",new (true,new(2023,10,12),Category.Enum) },
            {"StaticReflection", new (true,new(2023,10,13),Category.EnhancementClass) },
            {"UnitGenerator", new(true,new(2023,10,15),Category.PrimitiveObsession) },
            {"DynamicsMapper",new(true,new(2023,10,16),Category.Mapper) },
            {"MinimalApiBuilder", new (true,new(2023,10,26),Category.API) },
            { "DudNet",new(true,new(2023,10,27),Category.EnhancementClass) },
            {"AutoConstructor" ,new(true,new(2023,10,28),Category.Constructor)},
            {"N.SourceGenerators.UnionTypes",new(true,new(2023,10,29),Category.FunctionalProgramming) },
            {"jscsg",new(true,new(2023,10,30),Category.Serializer) },
            {"PrimaryParameter",new(true,new(2023,11,15),Category.Constructor) },
            {"Biwen.AutoClassGen",new(true,new(2023,11,16),Category.Interface) },
            {"OptValidator",new(true,new(2023,11,17),Category.EnhancementClass) },
            {"ConfigBinder",new(true,new(2023,month: 11,18),Category.API) },
            {"RDG",new(true,new(2023,11,19),Category.API) },
            {"COM",new(true,new(2023,11,20),Category.EnhancementProject) },
            {"InterceptorTemplate", new (true,new(2023,11,29),Category.Templating) },
            {"TelemetryLogging",new(true,new(2023,11,30),Category.EnhancementClass) },
            {"Ling.Audit" , new(true,new(2023,12,12),Category.EnhancementClass)},
            {"RSCG_UtilityTypes",new(true,new(2023,12,22),Category.EnhancementClass) },
            {"Mocklis",new(true,new(2024,1,3),Category.Tests) },
            {"AspectGenerator",new(true,new(2024,1,7),Category.EnhancementClass) },
            {"CopyCat",new(true,new(2024,1,9),Category.Interface) } ,
            {"HsuSgSync",new(true,new(2024,1,10),Category.EnhancementClass) },
            {"DomainPrimitives",new(true,new(2024,1,11),Category.PrimitiveObsession) },
            {"FUD",new(true,new(2024,1,18),Category.FunctionalProgramming) },
            {"MakeInterface",new(true,new(2024,1,19),Category.Interface) },
            {"BuildInfo",new(true,new(2024,1,20),Category.EnhancementProject) },
            {"EmbedRes", new(true,new(2024,1,21),Category.FilesToCode) },
            {"Blazorators",new(true,new(2024,1,22),Category.Blazor) },
            {"HangfireRecurringJob",new(true,new(2024,1,25),Category.Hangfire) },
            {"NotNotAppSettings",new(true,new(2024,1,26),Category.FilesToCode) },
            {"Weave",new(true,new(2024,1,27), Category.FilesToCode) },
            {"WIAD",new(true,new(2024,1,28), Category.AOP) },
            {"NetAutomaticInterface", new(true, new (2024,1,29),Category.Interface ) },
            {"CommandLine",new(true,new(2024,2,11),Category.EnhancementProject) },
            {"FunicularSwitch",new(true,new(2024,2,12),Category.FunctionalProgramming) },
            {"jab",new (true,new(2024,2,13),Category.DependencyInjection) },
            {"cachesourcegenerator",new(true,new (2024,2,14),Category.FunctionalProgramming) },
            {"OptionToStringGenerator",new (true,new(2024,2,15),Category.EnhancementClass) },
            {"sourcedepend",new(true,new(2024,2,16),Category.Constructor) },
            {"corecraft",new(true,new(2024,2,17),Category.FilesToCode) },
            {"UnionsGenerator",new(true,new(2024,2,18),Category.FunctionalProgramming) },
            {"CopyTo",new(true,new(2024,2,19),Category.EnhancementClass) },
            {"PlantUmlClassDiagramGenerator",new(true,new(2024,2,20),Category.EnhancementProject) },
            {"RSCG_Wait",new(true,new(2024,2,21),Category.EnhancementProject) },
            {"AutoGen",new(true,new (2024,2,22),Category.Mapper) },
            {"LingoGen",new(true,new(2024,2,23),Category.FilesToCode) },
            {"AutoSpectre",new (true,new(2024,2,24),Category.EnhancementProject )},
            {"RSCG_JSON2Class",new(true,new(2024,2,29),Category.FilesToCode) },
            {"CodeAnalysis",new(true,new(2024,3,1),Category.CodeToString)},
            {"Architect.DomainModeling",new(true,new(2024,3,2),Category.Builder) },
            {"AutoInvoke.Generator",new(true,new(2024,3,3),Category.EnhancementProject)},
            {"LinqGen.Generator",new(true,new(2024,3,4),Category.EnhancementProject)},
            {"TypeUtilities",new(true,new(2024,3,5),Category.FunctionalProgramming)},
            {"Farskeptic.AutoCompose",new(true,new(2024,3,16),Category.Interface) },
            {"CommonCodeGenerator"  ,new(true,new(2024,4,3),Category.EnhancementClass) },
            {"MSTest" ,new(true,new(2024,4,4),Category.Tests) },
            {"EnumUtilities", new(true,new(2024,4,5),Category.Enum) },
            {"UnionGen",new(true,new(2024,4,5),Category.FunctionalProgramming) },
            {"FusionReactor",new(true,new(2024,04,6),Category.Enum) },
            {"StronglyTypedUid",new(true,new(2024,04,7),Category.PrimitiveObsession) },
            {"BitsKit",new(true,new(2024,04,15),Category.Bitwise) },
            {"MinimalApis.Discovery", new(true,new(2024,04,16),Category.API)},
            {"Minerals.AutoInterfaces",new(true,new(2024,04,17),Category.Interface) },
            {"RossLean.StringificationGenerator",new (true,new(2024,4,18),Category.CodeToString) },
            {"ThisClass",new(true,new(2024,4,19),Category.EnhancementClass) },
            {"Minerals.AutoMixins",new(true,new(2024,4,20),Category.Templating) },
            {"ActorSrcGen", new(true,new(2024,5,1),Category.Actor) }
        };

    }
}

