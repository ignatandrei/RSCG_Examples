"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[8406],{6943:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>p,metadata:()=>m,toc:()=>g});var n=a(87462),r=(a(67294),a(3905)),i=a(73992),s=a(18679),o=a(68839);const p={sidebar_position:690,title:"69 - RSCG_Templating",description:"Templating every your data ( starting with class)",slug:"/RSCG_Templating"},l="RSCG_Templating  by Andrei Ignat",m={unversionedId:"RSCG-Examples/RSCG_Templating",id:"RSCG-Examples/RSCG_Templating",title:"69 - RSCG_Templating",description:"Templating every your data ( starting with class)",source:"@site/docs/RSCG-Examples/RSCG_Templating.md",sourceDirName:"RSCG-Examples",slug:"/RSCG_Templating",permalink:"/RSCG_Examples/v2/docs/RSCG_Templating",draft:!1,tags:[],version:"current",sidebarPosition:690,frontMatter:{sidebar_position:690,title:"69 - RSCG_Templating",description:"Templating every your data ( starting with class)",slug:"/RSCG_Templating"},sidebar:"tutorialSidebar",previous:{title:"68 - JsonPolymorphicGenerator",permalink:"/RSCG_Examples/v2/docs/JsonPolymorphicGenerator"},next:{title:"70 - MagicMap",permalink:"/RSCG_Examples/v2/docs/MagicMap"}},d={},g=[{value:"Nuget / site data",id:"nuget--site-data",level:2},{value:"Details",id:"details",level:2},{value:"Info",id:"info",level:3},{value:"Original Readme",id:"original-readme",level:3},{value:"About",id:"about",level:3},{value:"How to use",id:"how-to-use-1",level:2},{value:"Example ( source csproj, source files )",id:"example--source-csproj-source-files-",level:3},{value:"Generated Files",id:"generated-files",level:3},{value:"Usefull",id:"usefull",level:2},{value:"Download Example (.NET  C# )",id:"download-example-net--c-",level:3},{value:"Share RSCG_Templating",id:"share-rscg_templating",level:3},{value:"In the same category (Templating) - 7 other generators",id:"in-the-same-category-templating---7-other-generators",level:3},{value:"Gobie",id:"gobie",level:4},{value:"InterceptorTemplate",id:"interceptortemplate",level:4},{value:"Microsoft.NET.Sdk.Razor.SourceGenerators",id:"microsoftnetsdkrazorsourcegenerators",level:4},{value:"Minerals.AutoMixins",id:"mineralsautomixins",level:4},{value:"MorrisMoxy",id:"morrismoxy",level:4},{value:"RazorBlade",id:"razorblade",level:4},{value:"spreadcheetah",id:"spreadcheetah",level:4}],c={toc:g},u="wrapper";function h(e){let{components:t,...p}=e;return(0,r.kt)(u,(0,n.Z)({},c,p,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"rscg_templating--by-andrei-ignat"},"RSCG_Templating  by Andrei Ignat"),(0,r.kt)(o.Z,{toc:g,mdxType:"TOCInline"}),(0,r.kt)("h2",{id:"nuget--site-data"},"Nuget / site data"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_Templating/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_Templating?label=RSCG_Templating",alt:"Nuget"})),(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/RSCG_TemplatingCommon"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/nuget/dt/RSCG_TemplatingCommon?label=RSCG_TemplatingCommon",alt:"Nuget"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/rscg_templating/"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/github/last-commit/ignatandrei/rscg_templating?label=updated",alt:"GitHub last commit"})),"\n",(0,r.kt)("img",{parentName:"p",src:"https://img.shields.io/github/stars/ignatandrei/rscg_templating?style=social",alt:"GitHub Repo stars"})),(0,r.kt)("h2",{id:"details"},"Details"),(0,r.kt)("h3",{id:"info"},"Info"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Name: ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")),(0,r.kt)("p",{parentName:"admonition"},"Roslyn Templating for all"),(0,r.kt)("p",{parentName:"admonition"},"Author: Andrei Ignat"),(0,r.kt)("p",{parentName:"admonition"},"NuGet:\n",(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/RSCG_Templating/"},"https://www.nuget.org/packages/RSCG_Templating/")),"   "),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("em",{parentName:"p"},(0,r.kt)("a",{parentName:"em",href:"https://www.nuget.org/packages/RSCG_TemplatingCommon"},"https://www.nuget.org/packages/RSCG_TemplatingCommon")),"   "),(0,r.kt)("p",{parentName:"admonition"},"You can find more details at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/rscg_templating/"},"https://github.com/ignatandrei/rscg_templating/")),(0,r.kt)("p",{parentName:"admonition"},"Source : ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/rscg_templating/"},"https://github.com/ignatandrei/rscg_templating/"))),(0,r.kt)("h3",{id:"original-readme"},"Original Readme"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("h1",{parentName:"admonition",id:"rscg_templating"},"RSCG_Templating"),(0,r.kt)("p",{parentName:"admonition"},"Templating for generating everything from classes, methods from a Roslyn Code Generator"),(0,r.kt)("p",{parentName:"admonition"},"Templating is in SCRIBAN form"),(0,r.kt)("h2",{parentName:"admonition",id:"how-to-use"},"How to use"),(0,r.kt)("p",{parentName:"admonition"},"Add reference to "),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'  <ItemGroup>\n    <PackageReference Include="RSCG_Templating" Version="2023.1007.724" OutputItemType="Analyzer"  ReferenceOutputAssembly="false"   />\n    <PackageReference Include="RSCG_TemplatingCommon" Version="2023.1007.724" />\n  </ItemGroup>\n\x3c!-- this is just for debug purposes --\x3e\n<PropertyGroup>\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n</PropertyGroup>\n\x3c!-- those are the templates files, see IGenerateDataFromClass --\x3e\n  <ItemGroup>\n    <AdditionalFiles Include="ClassTypeName.txt" />\n    <AdditionalFiles Include="ClassPropByName.txt" />\n  </ItemGroup>\n\n')),(0,r.kt)("p",{parentName:"admonition"},"Then add additional files , for example "),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-scriban"},'//autogenerated by RSCG_Templating version {{data.Version}} from file {{fileName}}\nnamespace {{data.nameSpace}} {\n     \n    partial class {{data.className}} {\n        public string MyTypeName = "{{data.nameSpace}}.{{data.className}}";     \n    }//end class\n\n}//end namespace\n')),(0,r.kt)("p",{parentName:"admonition"},"Now add "),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'//can have multiple attributes on partial classes\n[IGenerateDataFromClass("ClassTypeName")]\npublic partial class Person\n')),(0,r.kt)("h2",{parentName:"admonition",id:"advanced-uses"},"Advanced uses"),(0,r.kt)("p",{parentName:"admonition"},"For the moment , RSCG_Templating generates definition for a class with properties + methods .\nSee example for generating enum from properties and setting properties by name"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var x = new Person();\nConsole.WriteLine("The generated string type is "+x.MyTypeName);\nx.FirstName = "Andrei";\n//set last name via prop\nx.SetPropValue(ePerson_Properties.LastName, "Ignat");\nConsole.WriteLine("called directly first name : " + x.FirstName);\nConsole.WriteLine("called via enum of prop first name : " + x.GetPropValue(ePerson_Properties.FirstName));\nConsole.WriteLine("called get property :" + x.GetPropValue(ePerson_Properties.Name));\n')),(0,r.kt)("p",{parentName:"admonition"},"See example at ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_Templating/tree/main/src/RSCG_Templating"},"https://github.com/ignatandrei/RSCG_Templating/tree/main/src/RSCG_Templating")),(0,r.kt)("h2",{parentName:"admonition",id:"more-templates"},"More templates"),(0,r.kt)("ol",{parentName:"admonition",start:10},(0,r.kt)("li",{parentName:"ol"},"Template for having the class type name: ClassTypeName"),(0,r.kt)("li",{parentName:"ol"},"Template for having the class properties as enum : ClassPropByName"),(0,r.kt)("li",{parentName:"ol"},"Template for setting properties after name : ClassPropByName"))),(0,r.kt)("h3",{id:"about"},"About"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Templating every your data ( starting with class)")),(0,r.kt)("h2",{id:"how-to-use-1"},"How to use"),(0,r.kt)("h3",{id:"example--source-csproj-source-files-"},"Example ( source csproj, source files )"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"csproj",label:"CSharp Project",mdxType:"TabItem"},(0,r.kt)("p",null,"This is the CSharp Project that references ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"showLineNumbers {14}",showLineNumbers:!0,"{14}":!0},'<Project Sdk="Microsoft.NET.Sdk">\n\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net7.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n    <ItemGroup>\n        <AdditionalFiles Include="ClassTypeName.txt" />\n        <AdditionalFiles Include="ClassPropByName.txt" />\n    </ItemGroup>\n     <ItemGroup>\n    <PackageReference Include="RSCG_Templating" Version="2023.1022.1748" OutputItemType="Analyzer"  />\n    <PackageReference Include="RSCG_TemplatingCommon" Version="2023.1022.1748"  />\n    \n  </ItemGroup>\n\n    <PropertyGroup>\n        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n    </PropertyGroup>\n\n</Project>\n\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\Program.cs",label:"Program.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")," in ",(0,r.kt)("em",{parentName:"p"},"Program.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using RSCG_TemplatingDemo;\n\nvar x = new Person();\nConsole.WriteLine("The generated string type is " + x.MyTypeName);\nx.FirstName = "Andrei";\n//set last name via prop\nx.SetPropValue(ePerson_Properties.LastName, "Ignat");\nConsole.WriteLine("called directly first name : " + x.FirstName);\nConsole.WriteLine("called via enum of prop first name : " + x.GetPropValue(ePerson_Properties.FirstName));\nConsole.WriteLine("called get property :" + x.GetPropValue(ePerson_Properties.Name));\n\nConsole.WriteLine("this will throw error because Name has not set ");\ntry\n{\n    x.SetPropValue(ePerson_Properties.Name, "asd");\n}\ncatch (Exception)\n{\n    Console.WriteLine("this is good!");\n}\nConsole.ReadLine();\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\Person.cs",label:"Person.cs",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")," in ",(0,r.kt)("em",{parentName:"p"},"Person.cs")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'using RSCG_TemplatingCommon;\n\nnamespace RSCG_TemplatingDemo;\n\n[IGenerateDataFromClass("ClassTypeName")]\n[IGenerateDataFromClass("ClassPropByName")]\npublic partial class Person\n{\n    public string Name { get { return FullName(" "); } }\n    public string? FirstName { get; set; }\n    public string? LastName { get; set; }\n    public string FullName(string separator = " ")\n    {\n        return FirstName + separator + LastName;\n    }\n    public void DisplayNameOnConsole()\n    {\n        Console.WriteLine(FullName());\n    }\n    public async Task<string> GetName()\n    {\n        await Task.Delay(1000);\n        return FirstName ?? "";\n    }\n    public Task<string> GetFullName()\n    {\n        return Task.FromResult(FullName());\n    }\n    public Task SaveId(int id)\n    {\n        if (id < 0)\n        {\n            throw new ArgumentException("this is an error because is <0 ");\n        }\n        return Task.CompletedTask;\n    }\n}\n\n'))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\ClassPropByName.txt",label:"ClassPropByName.txt",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")," in ",(0,r.kt)("em",{parentName:"p"},"ClassPropByName.txt")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//autogenerated by RSCG_Templating version {{data.Version}} from file {{fileName}}\nnamespace {{data.nameSpace}} {\n    public enum e{{data.className}}_Properties {\n        None = 0,\n        {{ for prop in data.properties }}\n        {{prop.PropertyName}},\n        {{ end }}\n    } \n    partial class {{data.className}} {\n\n        public object GetPropValue(e{{data.className}}_Properties prop){\n            switch(prop){\n                {{ for prop in data.properties }}\n                    case e{{data.className}}_Properties.{{prop.PropertyName}}:\n                    {{ if prop.CanCallGetMethod }}\n                        return this.{{prop.PropertyName}};\n                    {{ else }}\n                        throw new NotImplementedException();\n                    {{ end}}\n                {{ end }}\n                default:\n                        throw new NotImplementedException();\n            }\n        }\n        public void SetPropValue<T>(e{{data.className}}_Properties prop , T value){\n            switch(prop){\n                {{ for prop in data.properties }}\n                    case e{{data.className}}_Properties.{{prop.PropertyName}}:\n                    {{ if prop.CanCallSetMethod }}\n                        this.{{prop.PropertyName}} = ({{prop.PropertyType}})(dynamic)value;\n                        break;\n                    {{ else }}\n                        throw new NotImplementedException();\n                    {{ end}}\n                {{ end }}\n                default:\n                        throw new NotImplementedException();\n            }\n        }\n    }//end class\n\n}//end namespace\n"))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\ClassTypeName.txt",label:"ClassTypeName.txt",mdxType:"TabItem"},(0,r.kt)("p",null,"  This is the use of ",(0,r.kt)("strong",{parentName:"p"},"RSCG_Templating")," in ",(0,r.kt)("em",{parentName:"p"},"ClassTypeName.txt")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'//autogenerated by RSCG_Templating version {{data.Version}} from file {{fileName}}\nnamespace {{data.nameSpace}} {\n     \n    partial class {{data.className}} {\n        public string MyTypeName = "{{data.nameSpace}}.{{data.className}}";     \n    }//end class\n\n}//end namespace\n')))),(0,r.kt)("h3",{id:"generated-files"},"Generated Files"),(0,r.kt)("p",null,"Those are taken from $(BaseIntermediateOutputPath)\\GX"),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\obj\\GX\\RSCG_Templating\\RSCG_Templating.GeneratorIntercept\\RSCG_TemplatingDemo.Person.ClassPropByName.cs",label:"RSCG_TemplatingDemo.Person.ClassPropByName.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},"//autogenerated by RSCG_Templating version 2023.1022.1748.0 from file Microsoft.CodeAnalysis.AdditionalTextFile\nnamespace RSCG_TemplatingDemo {\n    public enum ePerson_Properties {\n        None = 0,\n        \n                Name,\n                \n                FirstName,\n                \n                LastName,\n                \n    } \n    partial class Person {\n\n        public object GetPropValue(ePerson_Properties prop){\n            switch(prop){\n                \n                                    case ePerson_Properties.Name:\n                                    \n                                            return this.Name;\n                                        \n                                \n                                    case ePerson_Properties.FirstName:\n                                    \n                                            return this.FirstName;\n                                        \n                                \n                                    case ePerson_Properties.LastName:\n                                    \n                                            return this.LastName;\n                                        \n                                \n                default:\n                        throw new NotImplementedException();\n            }\n        }\n        public void SetPropValue<T>(ePerson_Properties prop , T value){\n            switch(prop){\n                \n                                    case ePerson_Properties.Name:\n                                    \n                                            throw new NotImplementedException();\n                                        \n                                \n                                    case ePerson_Properties.FirstName:\n                                    \n                                            this.FirstName = (string?)(dynamic)value;\n                                            break;\n                                        \n                                \n                                    case ePerson_Properties.LastName:\n                                    \n                                            this.LastName = (string?)(dynamic)value;\n                                            break;\n                                        \n                                \n                default:\n                        throw new NotImplementedException();\n            }\n        }\n    }//end class\n\n}//end namespace\n"))),(0,r.kt)(s.Z,{value:"D:\\gth\\RSCG_Examples\\v2\\rscg_examples\\RSCG_Templating\\src\\RSCG_TemplatingDemo\\obj\\GX\\RSCG_Templating\\RSCG_Templating.GeneratorIntercept\\RSCG_TemplatingDemo.Person.ClassTypeName.cs",label:"RSCG_TemplatingDemo.Person.ClassTypeName.cs",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'//autogenerated by RSCG_Templating version 2023.1022.1748.0 from file Microsoft.CodeAnalysis.AdditionalTextFile\nnamespace RSCG_TemplatingDemo {\n     \n    partial class Person {\n        public string MyTypeName = "RSCG_TemplatingDemo.Person";        \n    }//end class\n\n}//end namespace\n')))),(0,r.kt)("h2",{id:"usefull"},"Usefull"),(0,r.kt)("h3",{id:"download-example-net--c-"},"Download Example (.NET  C# )"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{target:"_blank",href:a(93115).Z},"Download Example project RSCG_Templating "))),(0,r.kt)("h3",{id:"share-rscg_templating"},"Share RSCG_Templating"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating&quote=RSCG_Templating",title:"Share on Facebook",target:"_blank"},"Share on Facebook")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating&text=RSCG_Templating:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating",target:"_blank",title:"Tweet"},"Share in Twitter")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating&title=RSCG_Templating",target:"_blank",title:"Submit to Reddit"},"Share on Reddit")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating&title=RSCG_Templating&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Templating",target:"_blank",title:"Share on LinkedIn"},"Share on Linkedin"))),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Templating"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Templating")),(0,r.kt)("h3",{id:"in-the-same-category-templating---7-other-generators"},"In the same category (Templating) - 7 other generators"),(0,r.kt)("h4",{id:"gobie"},(0,r.kt)("a",{parentName:"h4",href:"/docs/Gobie"},"Gobie")),(0,r.kt)("h4",{id:"interceptortemplate"},(0,r.kt)("a",{parentName:"h4",href:"/docs/InterceptorTemplate"},"InterceptorTemplate")),(0,r.kt)("h4",{id:"microsoftnetsdkrazorsourcegenerators"},(0,r.kt)("a",{parentName:"h4",href:"/docs/Microsoft.NET.Sdk.Razor.SourceGenerators"},"Microsoft.NET.Sdk.Razor.SourceGenerators")),(0,r.kt)("h4",{id:"mineralsautomixins"},(0,r.kt)("a",{parentName:"h4",href:"/docs/Minerals.AutoMixins"},"Minerals.AutoMixins")),(0,r.kt)("h4",{id:"morrismoxy"},(0,r.kt)("a",{parentName:"h4",href:"/docs/MorrisMoxy"},"MorrisMoxy")),(0,r.kt)("h4",{id:"razorblade"},(0,r.kt)("a",{parentName:"h4",href:"/docs/RazorBlade"},"RazorBlade")),(0,r.kt)("h4",{id:"spreadcheetah"},(0,r.kt)("a",{parentName:"h4",href:"/docs/spreadcheetah"},"spreadcheetah")))}h.isMDXComponent=!0},93115:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/RSCG_Templating-5efac6af5537aadbfa09920fd9e85e2b.zip"}}]);