"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[2417],{390:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>p,metadata:()=>u,toc:()=>d});var t=i(7462),o=(i(7294),i(4137)),r=i(3992),s=i(425),a=i(8839);const p={sidebar_position:860,title:"86 - Microsoft.Extensions.Configuration.Binder",description:"Generating Binding for configuration files",slug:"/Microsoft.Extensions.Configuration.Binder"},l="Microsoft.Extensions.Configuration.Binder  by Microsoft",u={unversionedId:"RSCG-Examples/Microsoft.Extensions.Configuration.Binder",id:"RSCG-Examples/Microsoft.Extensions.Configuration.Binder",title:"86 - Microsoft.Extensions.Configuration.Binder",description:"Generating Binding for configuration files",source:"@site/docs/RSCG-Examples/Microsoft.Extensions.Configuration.Binder.md",sourceDirName:"RSCG-Examples",slug:"/Microsoft.Extensions.Configuration.Binder",permalink:"/RSCG_Examples/v2/docs/Microsoft.Extensions.Configuration.Binder",draft:!1,tags:[],version:"current",sidebarPosition:860,frontMatter:{sidebar_position:860,title:"86 - Microsoft.Extensions.Configuration.Binder",description:"Generating Binding for configuration files",slug:"/Microsoft.Extensions.Configuration.Binder"},sidebar:"tutorialSidebar",previous:{title:"85 - Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},next:{title:"87 - RDG",permalink:"/RSCG_Examples/v2/docs/RDG"}},c={},d=[{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share Microsoft.Extensions.Configuration.Binder",id:"share-microsoftextensionsconfigurationbinder",level:3},{value:"In the same category (API)",id:"in-the-same-category-api",level:2},{value:"MinimalApiBuilder",id:"minimalapibuilder",level:3},{value:"RDG",id:"rdg",level:3},{value:"Refit",id:"refit",level:3},{value:"RSCG_WebAPIExports",id:"rscg_webapiexports",level:3},{value:"SafeRouting",id:"saferouting",level:3},{value:"SkinnyControllersCommon",id:"skinnycontrollerscommon",level:3}],g={toc:d},f="wrapper";function m(n){let{components:e,...p}=n;return(0,o.kt)(f,(0,t.Z)({},g,p,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"microsoftextensionsconfigurationbinder--by-microsoft"},"Microsoft.Extensions.Configuration.Binder  by Microsoft"),(0,o.kt)(a.Z,{toc:d,mdxType:"TOCInline"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Binder/"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/Microsoft.Extensions.Configuration.Binder?label=Microsoft.Extensions.Configuration.Binder",alt:"Nuget"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#configuration-binding-source-generator"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/learn.microsoft/last-commit/en-us/dotnet?label=updated",alt:"GitHub last commit"})),"\n",(0,o.kt)("img",{parentName:"p",src:"https://img.shields.io/learn.microsoft/stars/en-us/dotnet?style=social",alt:"GitHub Repo stars"})),(0,o.kt)("h2",{id:"details"},"Details"),(0,o.kt)("h3",{id:"info"},"Info"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Name: ",(0,o.kt)("strong",{parentName:"p"},"Microsoft.Extensions.Configuration.Binder")),(0,o.kt)("p",{parentName:"admonition"},"Functionality to bind an object to data in configuration providers."),(0,o.kt)("p",{parentName:"admonition"},"Author: Microsoft"),(0,o.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,o.kt)("em",{parentName:"p"},(0,o.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Binder/"},"https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Binder/")),"   "),(0,o.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dotnet/runtime"},"https://github.com/dotnet/runtime")),(0,o.kt)("p",{parentName:"admonition"},"Source : ",(0,o.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#configuration-binding-source-generator"},"https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#configuration-binding-source-generator"))),(0,o.kt)("h3",{id:"original-readme"},"Original Readme"),(0,o.kt)("admonition",{type:"note"}),(0,o.kt)("h3",{id:"about"},"About"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Generating Binding for configuration files")),(0,o.kt)("h2",{id:"how-to-use"},"How to use"),(0,o.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(s.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,o.kt)("p",null,"This is the CSharp Project that references ",(0,o.kt)("strong",{parentName:"p"},"Microsoft.Extensions.Configuration.Binder")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {11}",showLineNumbers:!0,"{11}":!0},'<Project Sdk="Microsoft.NET.Sdk.Web">\n\n  <PropertyGroup>\n    <TargetFramework>net8.0</TargetFramework>\n    <Nullable>enable</Nullable>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <InvariantGlobalization>true</InvariantGlobalization>\n  </PropertyGroup>\n\n  <ItemGroup>\n      \x3c!--<PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="8.0.0" />--\x3e\n    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />\n    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />\n  </ItemGroup>\n    <PropertyGroup>\n        <EnableConfigurationBindingGenerator>true</EnableConfigurationBindingGenerator>\n    </PropertyGroup>\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n\n</Project>\n\n'))),(0,o.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ConfigBinder\\src\\ConfigBinderDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"Microsoft.Extensions.Configuration.Binder")," in ",(0,o.kt)("em",{parentName:"p"},"Program.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using ConfigBinderDemo;\nusing Microsoft.Extensions.Options;\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// Add services to the container.\n// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle\nbuilder.Services.AddEndpointsApiExplorer();\nbuilder.Services.AddSwaggerGen();\n\nvar app = builder.Build();\n\n// Configure the HTTP request pipeline.\nif (app.Environment.IsDevelopment())\n{\n    app.UseSwagger();\n    app.UseSwaggerUI();\n}\nbuilder.Services.AddOptions<MyAppOptions>()\n            .BindConfiguration(MyAppOptions.ConfigName);\napp.MapGet("/nameApp", (IOptions<MyAppOptions> opt) =>\n{\n    try\n    {\n        var val = opt.Value.AppDisplayName;\n        return val;\n    }\n    catch (OptionsValidationException ex)\n    {\n        var problems = ex.Failures.ToArray();\n        return string.Join(",", problems);\n    }\n\n})\n.WithName("GetWeatherForecast")\n.WithOpenApi();\n\napp.Run();\n\ninternal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)\n{\n    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);\n}\n\n'))),(0,o.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ConfigBinder\\src\\ConfigBinderDemo\\MyAppOptions.cs",label:"MyAppOptions.cs",mdxType:"TabItem"},(0,o.kt)("p",null,"  This is the use of ",(0,o.kt)("strong",{parentName:"p"},"Microsoft.Extensions.Configuration.Binder")," in ",(0,o.kt)("em",{parentName:"p"},"MyAppOptions.cs")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using System.Diagnostics;\n\nnamespace ConfigBinderDemo;\n\n[DebuggerDisplay("{AppDisplayName}")]\npublic class MyAppOptions\n{\n    public const string ConfigName = "MyAppOptionsInConfig";\n    public string AppDisplayName { get; set; } = string.Empty;\n\n}\n\n')))),(0,o.kt)("h3",{id:"generated-files"},"Generated Files"),(0,o.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ConfigBinder\\src\\ConfigBinderDemo\\obj\\GX\\Microsoft.Extensions.Configuration.Binder.SourceGeneration\\Microsoft.Extensions.Configuration.Binder.SourceGeneration.ConfigurationBindingGenerator\\BindingExtensions.g.cs",label:"BindingExtensions.g.cs",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\n#nullable enable\n#pragma warning disable CS0612, CS0618 // Suppress warnings about [Obsolete] member usage in generated code.\n\nnamespace System.Runtime.CompilerServices\n{\n    using System;\n    using System.CodeDom.Compiler;\n\n    [GeneratedCode("Microsoft.Extensions.Configuration.Binder.SourceGeneration", "8.0.9.3103")]\n    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]\n    file sealed class InterceptsLocationAttribute : Attribute\n    {\n        public InterceptsLocationAttribute(string filePath, int line, int column)\n        {\n        }\n    }\n}\n\nnamespace Microsoft.Extensions.Configuration.Binder.SourceGeneration\n{\n    using ConfigBinderDemo;\n    using Microsoft.Extensions.Configuration;\n    using Microsoft.Extensions.DependencyInjection;\n    using Microsoft.Extensions.Options;\n    using System;\n    using System.CodeDom.Compiler;\n    using System.Collections.Generic;\n    using System.Globalization;\n    using System.Runtime.CompilerServices;\n\n    [GeneratedCode("Microsoft.Extensions.Configuration.Binder.SourceGeneration", "8.0.9.3103")]\n    file static class BindingExtensions\n    {\n        #region OptionsBuilder<TOptions> extensions.\n        /// <summary>Registers the dependency injection container to bind <typeparamref name="TOptions"/> against the <see cref="IConfiguration"/> obtained from the DI service provider.</summary>\n        [InterceptsLocation(@"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\ConfigBinder\\src\\ConfigBinderDemo\\Program.cs", 20, 14)]\n        public static OptionsBuilder<TOptions> BindConfiguration<TOptions>(this OptionsBuilder<TOptions> optionsBuilder, string configSectionPath, Action<BinderOptions>? configureBinder = null) where TOptions : class\n        {\n            if (optionsBuilder is null)\n            {\n                throw new ArgumentNullException(nameof(optionsBuilder));\n            }\n\n            if (configSectionPath is null)\n            {\n                throw new ArgumentNullException(nameof(configSectionPath));\n            }\n\n            optionsBuilder.Configure<IConfiguration>((instance, config) =>\n            {\n                if (config is null)\n                {\n                    throw new ArgumentNullException(nameof(config));\n                }\n\n                IConfiguration section = string.Equals(string.Empty, configSectionPath, StringComparison.OrdinalIgnoreCase) ? config : config.GetSection(configSectionPath);\n                BindCoreMain(section, instance, typeof(TOptions), configureBinder);\n            });\n\n            optionsBuilder.Services.AddSingleton<IOptionsChangeTokenSource<TOptions>, ConfigurationChangeTokenSource<TOptions>>();\n            return optionsBuilder;\n        }\n        #endregion OptionsBuilder<TOptions> extensions.\n\n        #region Core binding extensions.\n        private readonly static Lazy<HashSet<string>> s_configKeys_MyAppOptions = new(() => new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "AppDisplayName" });\n\n        public static void BindCoreMain(IConfiguration configuration, object instance, Type type, Action<BinderOptions>? configureOptions)\n        {\n            if (instance is null)\n            {\n                return;\n            }\n\n            if (!HasValueOrChildren(configuration))\n            {\n                return;\n            }\n\n            BinderOptions? binderOptions = GetBinderOptions(configureOptions);\n\n            if (type == typeof(MyAppOptions))\n            {\n                var temp = (MyAppOptions)instance;\n                BindCore(configuration, ref temp, defaultValueIfNotFound: false, binderOptions);\n                return;\n            }\n\n            throw new NotSupportedException($"Unable to bind to type \'{type}\': generator did not detect the type as input.");\n        }\n\n        public static void BindCore(IConfiguration configuration, ref MyAppOptions instance, bool defaultValueIfNotFound, BinderOptions? binderOptions)\n        {\n            ValidateConfigurationKeys(typeof(MyAppOptions), s_configKeys_MyAppOptions, configuration, binderOptions);\n\n            if (configuration["AppDisplayName"] is string value1)\n            {\n                instance.AppDisplayName = value1;\n            }\n        }\n\n\n        /// <summary>If required by the binder options, validates that there are no unknown keys in the input configuration object.</summary>\n        public static void ValidateConfigurationKeys(Type type, Lazy<HashSet<string>> keys, IConfiguration configuration, BinderOptions? binderOptions)\n        {\n            if (binderOptions?.ErrorOnUnknownConfiguration is true)\n            {\n                List<string>? temp = null;\n        \n                foreach (IConfigurationSection section in configuration.GetChildren())\n                {\n                    if (!keys.Value.Contains(section.Key))\n                    {\n                        (temp ??= new List<string>()).Add($"\'{section.Key}\'");\n                    }\n                }\n        \n                if (temp is not null)\n                {\n                    throw new InvalidOperationException($"\'ErrorOnUnknownConfiguration\' was set on the provided BinderOptions, but the following properties were not found on the instance of {type}: {string.Join(", ", temp)}");\n                }\n            }\n        }\n\n        public static bool HasValueOrChildren(IConfiguration configuration)\n        {\n            if ((configuration as IConfigurationSection)?.Value is not null)\n            {\n                return true;\n            }\n            return AsConfigWithChildren(configuration) is not null;\n        }\n\n        public static IConfiguration? AsConfigWithChildren(IConfiguration configuration)\n        {\n            foreach (IConfigurationSection _ in configuration.GetChildren())\n            {\n                return configuration;\n            }\n            return null;\n        }\n\n        public static BinderOptions? GetBinderOptions(Action<BinderOptions>? configureOptions)\n        {\n            if (configureOptions is null)\n            {\n                return null;\n            }\n        \n            BinderOptions binderOptions = new();\n            configureOptions(binderOptions);\n        \n            if (binderOptions.BindNonPublicProperties)\n            {\n                throw new NotSupportedException($"The configuration binding source generator does not support \'BinderOptions.BindNonPublicProperties\'.");\n            }\n        \n            return binderOptions;\n        }\n        #endregion Core binding extensions.\n    }\n}\n\n')))),(0,o.kt)("h2",{id:"usefull"},"Usefull"),(0,o.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{target:"_blank",href:i(4773).Z},"Download Example project Microsoft.Extensions.Configuration.Binder "))),(0,o.kt)("h3",{id:"share-microsoftextensionsconfigurationbinder"},"Share Microsoft.Extensions.Configuration.Binder"),(0,o.kt)("ul",null,(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder&quote=Microsoft.Extensions.Configuration.Binder",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder&text=Microsoft.Extensions.Configuration.Binder:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder&title=Microsoft.Extensions.Configuration.Binder",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,o.kt)("li",null,(0,o.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder&title=Microsoft.Extensions.Configuration.Binder&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Configuration.Binder",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Extensions.Configuration.Binder"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Extensions.Configuration.Binder")),(0,o.kt)("h2",{id:"in-the-same-category-api"},"In the same category (API)"),(0,o.kt)("h3",{id:"minimalapibuilder"},(0,o.kt)("a",{parentName:"h3",href:"/docs/MinimalApiBuilder"},"MinimalApiBuilder")),(0,o.kt)("h3",{id:"rdg"},(0,o.kt)("a",{parentName:"h3",href:"/docs/RDG"},"RDG")),(0,o.kt)("h3",{id:"refit"},(0,o.kt)("a",{parentName:"h3",href:"/docs/Refit"},"Refit")),(0,o.kt)("h3",{id:"rscg_webapiexports"},(0,o.kt)("a",{parentName:"h3",href:"/docs/RSCG_WebAPIExports"},"RSCG_WebAPIExports")),(0,o.kt)("h3",{id:"saferouting"},(0,o.kt)("a",{parentName:"h3",href:"/docs/SafeRouting"},"SafeRouting")),(0,o.kt)("h3",{id:"skinnycontrollerscommon"},(0,o.kt)("a",{parentName:"h3",href:"/docs/SkinnyControllersCommon"},"SkinnyControllersCommon")))}m.isMDXComponent=!0},4773:(n,e,i)=>{i.d(e,{Z:()=>t});const t=i.p+"assets/files/Microsoft.Extensions.Configuration.Binder-14439d99bab258e9195200e2b0a25387.zip"}}]);