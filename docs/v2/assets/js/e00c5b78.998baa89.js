"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[6724],{82102:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_position:15,title:"Good Practices"},s=void 0,l={unversionedId:"GoodPractices",id:"GoodPractices",title:"Good Practices",description:"Content",source:"@site/docs/GoodPractices.md",sourceDirName:".",slug:"/GoodPractices",permalink:"/RSCG_Examples/v2/docs/GoodPractices",draft:!1,tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15,title:"Good Practices"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/RSCG_Examples/v2/docs/intro"},next:{title:"About",permalink:"/RSCG_Examples/v2/docs/about"}},i={},d=[{value:"Content",id:"content",level:2},{value:"For using any generator",id:"for-using-any-generator",level:2},{value:"For creating the generator",id:"for-creating-the-generator",level:2},{value:"For easy debugging, add IsRoslynComponent",id:"for-easy-debugging-add-isroslyncomponent",level:3},{value:"For files generated",id:"for-files-generated",level:2},{value:"Add .g.cs extension",id:"add-gcs-extension",level:3},{value:"Add auto-generated comment",id:"add-auto-generated-comment",level:3},{value:"Add a version to the files generated",id:"add-a-version-to-the-files-generated",level:3},{value:"General attributes / code",id:"general-attributes--code",level:3},{value:"Make it shorter",id:"make-it-shorter",level:3},{value:"mark the code as non - code coverage",id:"mark-the-code-as-non---code-coverage",level:3},{value:"Add comments for method / classes  /  properties generated",id:"add-comments-for-method--classes----properties-generated",level:3},{value:"Add nullable enable",id:"add-nullable-enable",level:3},{value:"Add reference to another package when need just for compilation",id:"add-reference-to-another-package-when-need-just-for-compilation",level:3},{value:"For deploy",id:"for-deploy",level:2},{value:"Add source link",id:"add-source-link",level:3},{value:"Ensure in nuget",id:"ensure-in-nuget",level:2},{value:"performance",id:"performance",level:2}],p={toc:d},c="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"content"},"Content"),(0,r.kt)("p",null,"I am trying here to add good practices , as I see from the community and from my experience."),(0,r.kt)("h2",{id:"for-using-any-generator"},"For using any generator"),(0,r.kt)("p",null,"To see the files generated , add the following to the csproj file"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<PropertyGroup>\n    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>\n    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\\GX</CompilerGeneratedFilesOutputPath>\n</PropertyGroup>\n")),(0,r.kt)("h2",{id:"for-creating-the-generator"},"For creating the generator"),(0,r.kt)("h3",{id:"for-easy-debugging-add-isroslyncomponent"},"For easy debugging, add IsRoslynComponent"),(0,r.kt)("p",null,"You can debug easy the component if you add the following code to the Roslyn csproj file"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<PropertyGroup>\n    <IsRoslynComponent>true</IsRoslynComponent>\n</PropertyGroup>\n")),(0,r.kt)("p",null,"Then add a simple console ( or any other project) and reference the Roslyn project.\n( Pay attention to ReferenceOutputAssembly property!)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <ProjectReference Include="..\\RSCG_Wait\\RSCG_Wait.csproj" OutputItemType="Analyzer"\n                    ReferenceOutputAssembly="false"  />\n</ItemGroup>\n')),(0,r.kt)("p",null,"Also in the Debug"),(0,r.kt)("h2",{id:"for-files-generated"},"For files generated"),(0,r.kt)("h3",{id:"add-gcs-extension"},"Add .g.cs extension"),(0,r.kt)("p",null,"Add a .g.cs generated suffix so some tools consider the file to be generated"),(0,r.kt)("p",null,"The following code is from the project ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_WaitAndOptions"},"https://github.com/ignatandrei/RSCG_WaitAndOptions")," "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'private void GenerateData(SourceProductionContext context /*other arguments*/)\n{\n     context.AddSource("WaitGeneratorStart.g", $$"""\n//generated code here\n""");\n}\n')),(0,r.kt)("h3",{id:"add-auto-generated-comment"},"Add auto-generated comment"),(0,r.kt)("h3",{id:"add-a-version-to-the-files-generated"},"Add a version to the files generated"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'[global::System.CodeDom.Compiler.GeneratedCode("GeneratorName", "1.0.0.0")]\n')),(0,r.kt)("p",null,"You could use the version from the generator"),(0,r.kt)("p",null,"You could use AssemblyInfo , as I have done myself into the project ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/RSCG_WaitAndOptions"},"https://github.com/ignatandrei/RSCG_WaitAndOptions")," "),(0,r.kt)("p",null,"In the csproj file , add the following"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n    <PackageReference Include="ThisAssembly.AssemblyInfo" Version="1.4.3" OutputItemType="Analyzer"\n                    ReferenceOutputAssembly="false">\n        <PrivateAssets>all</PrivateAssets>\n        <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>\n    </PackageReference>\n</ItemGroup>\n\n')),(0,r.kt)("p",null,"And use when generating the code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var version=ThisAssembly.Info.Version;\nvar name = ThisAssembly.Info.Title;\nvar data = $$"""\nnamespace RSCG_Wait;\n[global::System.CodeDom.Compiler.GeneratedCode("{{name}}", "{{version}}")]\npublic partial class OptionsFromBuild{\n\n}\n""";\n')),(0,r.kt)("h3",{id:"general-attributes--code"},"General attributes / code"),(0,r.kt)("p",null,"Problem - make internal or have another assembly referenced ( or the opposite)\n",(0,r.kt)("a",{parentName:"p",href:"https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/"},"https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/")),(0,r.kt)("h3",{id:"make-it-shorter"},"Make it shorter"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell"},"https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell")),(0,r.kt)("h3",{id:"mark-the-code-as-non---code-coverage"},"mark the code as non - code coverage"),(0,r.kt)("p",null,"[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]"),(0,r.kt)("h3",{id:"add-comments-for-method--classes----properties-generated"},"Add comments for method / classes  /  properties generated"),(0,r.kt)("p",null," could have warnings as errors .\nor\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/issues/54103"},"https://github.com/dotnet/roslyn/issues/54103"),"\n#pragma warning disable CS1591 // Compensate for ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dotnet/roslyn/issues/54103"},"https://github.com/dotnet/roslyn/issues/54103")),(0,r.kt)("h3",{id:"add-nullable-enable"},"Add nullable enable"),(0,r.kt)("p",null," #nullable enable\nTODO: add example"),(0,r.kt)("h3",{id:"add-reference-to-another-package-when-need-just-for-compilation"},"Add reference to another package when need just for compilation"),(0,r.kt)("p",null,"TODO: add example"),(0,r.kt)("h2",{id:"for-deploy"},"For deploy"),(0,r.kt)("h3",{id:"add-source-link"},"Add source link"),(0,r.kt)("p",null,"TODO: add example"),(0,r.kt)("h2",{id:"ensure-in-nuget"},"Ensure in nuget"),(0,r.kt)("p",null,"image addToNuget"),(0,r.kt)("h2",{id:"performance"},"performance"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://andrewlock.net/creating-a-source-generator-part-9-avoiding-performance-pitfalls-in-incremental-generators/"},"https://andrewlock.net/creating-a-source-generator-part-9-avoiding-performance-pitfalls-in-incremental-generators/")),(0,r.kt)("p",null," ",(0,r.kt)("a",{parentName:"p",href:"https://www.thinktecture.com/net/roslyn-source-generators-high-level-api-forattributewithmetadataname/"},"https://www.thinktecture.com/net/roslyn-source-generators-high-level-api-forattributewithmetadataname/")),(0,r.kt)("p",null," ",(0,r.kt)("a",{parentName:"p",href:"https://papafe.dev/posts/source-generators-tips/"},"https://papafe.dev/posts/source-generators-tips/")))}u.isMDXComponent=!0}}]);