"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[8644],{5456:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>p});var o=n(7462),i=(n(7294),n(4137));const s={sidebar_position:11285,title:"11285 - Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",description:"Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",slug:"/Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},a="Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",r={unversionedId:"Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",id:"Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",title:"11285 - Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",description:"Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",source:"@site/docs/Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator.md",sourceDirName:"Microsoft",slug:"/Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",draft:!1,tags:[],version:"current",sidebarPosition:11285,frontMatter:{sidebar_position:11285,title:"11285 - Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",description:"Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator",slug:"/Microsoft/Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"},sidebar:"tutorialSidebar",previous:{title:"9939 - Microsoft.NET.Sdk.Razor.SourceGenerators_Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/Microsoft.NET.Sdk.Razor.SourceGenerators_Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator"},next:{title:"12534 - Microsoft.AspNetCore.Http.RequestDelegateGenerator_Microsoft.AspNetCore.Http.RequestDelegateGenerator.RequestDelegateGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/Microsoft.AspNetCore.Http.RequestDelegateGenerator_Microsoft.AspNetCore.Http.RequestDelegateGenerator.RequestDelegateGenerator"}},l={},p=[{value:"Original Code",id:"original-code",level:2},{value:"Generated Code",id:"generated-code",level:2},{value:"More details",id:"more-details",level:2}],c={toc:p},d="wrapper";function u(t){let{components:e,...s}=t;return(0,i.kt)(d,(0,o.Z)({},c,s,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"microsoftextensionsoptionssourcegeneration_microsoftextensionsoptionsgeneratorsoptionsvalidatorgenerator"},"Microsoft.Extensions.Options.SourceGeneration_Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator"),(0,i.kt)("h2",{id:"original-code"},"Original Code"),(0,i.kt)("p",null,"The code that will be improved by generation is :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"namespace DemoValidatorObj;\n//Generator:Validators.g.cs\n[OptionsValidator]\npublic partial class ValidatorForMyApp\n    : IValidateOptions<MyAppOptions>\n{\n}\n\n//public class SecondModelNoNamespace\n//{\n//    [Required]\n//    [MinLength(5)]\n//    public string P4 { get; set; } = string.Empty;\n//}\n\n\n//[OptionsValidator]\n//public partial class SecondValidatorNoNamespace\n//    : IValidateOptions<SecondModelNoNamespace>\n//{\n//}\n\n\n\n")),(0,i.kt)("h2",{id:"generated-code"},"Generated Code"),(0,i.kt)("p",null,"The code that is written is"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\n    // <auto-generated/>\n    #nullable enable\n    #pragma warning disable CS1591 // Compensate for https://github.com/dotnet/roslyn/issues/54103\n    namespace DemoValidatorObj\n{\n    partial class ValidatorForMyApp\n    {\n        /// <summary>\n        /// Validates a specific named options instance (or all when <paramref name="name"/> is <see langword="null" />).\n        /// </summary>\n        /// <param name="name">The name of the options instance being validated.</param>\n        /// <param name="options">The options instance.</param>\n        /// <returns>Validation result.</returns>\n        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]\n        [System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessage("Trimming", "IL2026:RequiresUnreferencedCode",\n             Justification = "The created ValidationContext object is used in a way that never call reflection")]\n        public global::Microsoft.Extensions.Options.ValidateOptionsResult Validate(string? name, global::DemoValidatorObj.MyAppOptions options)\n        {\n            global::Microsoft.Extensions.Options.ValidateOptionsResultBuilder? builder = null;\n            var context = new global::System.ComponentModel.DataAnnotations.ValidationContext(options);\n            var validationResults = new global::System.Collections.Generic.List<global::System.ComponentModel.DataAnnotations.ValidationResult>();\n            var validationAttributes = new global::System.Collections.Generic.List<global::System.ComponentModel.DataAnnotations.ValidationAttribute>(2);\n\n            context.MemberName = "AppDisplayName";\n            context.DisplayName = string.IsNullOrEmpty(name) ? "MyAppOptions.AppDisplayName" : $"{name}.AppDisplayName";\n            validationAttributes.Add(global::__OptionValidationStaticInstances.__Attributes.A1);\n            validationAttributes.Add(global::__OptionValidationStaticInstances.__Attributes.A2);\n            if (!global::System.ComponentModel.DataAnnotations.Validator.TryValidateValue(options.AppDisplayName, context, validationResults, validationAttributes))\n            {\n                (builder ??= new()).AddResults(validationResults);\n            }\n\n            return builder is null ? global::Microsoft.Extensions.Options.ValidateOptionsResult.Success : builder.Build();\n        }\n    }\n}\nnamespace __OptionValidationStaticInstances\n{\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]\n    file static class __Attributes\n    {\n        internal static readonly global::System.ComponentModel.DataAnnotations.RequiredAttribute A1 = new global::System.ComponentModel.DataAnnotations.RequiredAttribute();\n\n        internal static readonly __OptionValidationGeneratedAttributes.__SourceGen__MinLengthAttribute A2 = new __OptionValidationGeneratedAttributes.__SourceGen__MinLengthAttribute(\n            (int)3);\n    }\n}\nnamespace __OptionValidationStaticInstances\n{\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]\n    file static class __Validators\n    {\n    }\n}\nnamespace __OptionValidationGeneratedAttributes\n{\n    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Options.SourceGeneration", "8.0.9.3103")]\n    [global::System.AttributeUsage(global::System.AttributeTargets.Property | global::System.AttributeTargets.Field | global::System.AttributeTargets.Parameter, AllowMultiple = false)]\n    file class __SourceGen__MinLengthAttribute : global::System.ComponentModel.DataAnnotations.ValidationAttribute\n    {\n        private static string DefaultErrorMessageString => "The field {0} must be a string or array type with a minimum length of \'{1}\'.";\n\n        public __SourceGen__MinLengthAttribute(int length) : base(() => DefaultErrorMessageString) { Length = length; }\n        public int Length { get; }\n        public override bool IsValid(object? value)\n        {\n            if (Length < -1)\n            {\n                throw new global::System.InvalidOperationException("MinLengthAttribute must have a Length value that is zero or greater.");\n            }\n            if (value == null)\n            {\n                return true;\n            }\n\n            int length;\n            if (value is string stringValue)\n            {\n                length = stringValue.Length;\n            }\n            else if (value is System.Collections.ICollection collectionValue)\n            {\n                length = collectionValue.Count;\n            }\n            else\n            {\n                throw new global::System.InvalidCastException($"The field of type {value.GetType()} must be a string, array, or ICollection type.");\n            }\n\n            return length >= Length;\n        }\n        public override string FormatErrorMessage(string name) => string.Format(global::System.Globalization.CultureInfo.CurrentCulture, ErrorMessageString, name, Length);\n    }\n}\n\n')),(0,i.kt)("h2",{id:"more-details"},"More details"),(0,i.kt)("p",null,"Csharp Project: See DemoValidatorObj.csproj from ",(0,i.kt)("a",{target:"_blank",href:n(2096).Z},"/sources/Microsoft.zip")),(0,i.kt)("p",null,"You can see the whole list at",(0,i.kt)("a",{target:"_blank",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG")))}u.isMDXComponent=!0},2096:(t,e,n)=>{n.d(e,{Z:()=>o});const o=n.p+"assets/files/Microsoft-385cd2ffcf8f095f697f6bd3011bc60a.zip"}}]);