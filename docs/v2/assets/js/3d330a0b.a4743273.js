"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[1014],{7661:(e,t,n)=>{n.d(t,{Z:()=>x});var r=n(7294),a=n(6010),o=n(8259),s=n(3699),l=n(2735),p=n(7325);const m={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function c(e){let{href:t,children:n}=e;return r.createElement(s.Z,{href:t,className:(0,a.Z)("card padding--lg",m.cardContainer)},n)}function i(e){let{href:t,icon:n,title:o,description:s}=e;return r.createElement(c,{href:t},r.createElement("h2",{className:(0,a.Z)("text--truncate",m.cardTitle),title:o},n," ",o),s&&r.createElement("p",{className:(0,a.Z)("text--truncate",m.cardDescription),title:s},s))}function u(e){let{item:t}=e;const n=(0,o.Wl)(t);return n?r.createElement(i,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,p.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function d(e){let{item:t}=e;const n=(0,l.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",a=(0,o.xz)(t.docId??void 0);return r.createElement(i,{href:t.href,icon:n,title:t.label,description:t.description??a?.description})}function k(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(d,{item:t});case"category":return r.createElement(u,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function h(e){let{className:t}=e;const n=(0,o.jA)();return r.createElement(x,{items:n.items,className:t})}function x(e){const{items:t,className:n}=e;if(!t)return r.createElement(h,e);const s=(0,o.MN)(t);return r.createElement("section",{className:(0,a.Z)("row",n)},s.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(k,{item:e})))))}},4856:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>p,toc:()=>c});var r=n(7462),a=(n(7294),n(4137)),o=n(7661);const s={sidebar_position:30,title:"67 RSCG by category",description:"67 RSCG by category",slug:"/rscg-examples"},l=void 0,p={unversionedId:"RSCG-Examples/index",id:"RSCG-Examples/index",title:"67 RSCG by category",description:"67 RSCG by category",source:"@site/docs/RSCG-Examples/index.md",sourceDirName:"RSCG-Examples",slug:"/rscg-examples",permalink:"/RSCG_Examples/v2/docs/rscg-examples",draft:!1,tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30,title:"67 RSCG by category",description:"67 RSCG by category",slug:"/rscg-examples"},sidebar:"tutorialSidebar",previous:{title:"List of RSCG",permalink:"/RSCG_Examples/v2/docs/List-of-RSCG"},next:{title:"01 - ThisAssembly",permalink:"/RSCG_Examples/v2/docs/ThisAssembly"}},m={},c=[],i={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/List-of-RSCG"},"See time based list")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"API =>examples:4"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/SkinnyControllersCommon"},"SkinnyControllersCommon")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Refit"},"Refit")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_WebAPIExports"},"RSCG_WebAPIExports")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/SafeRouting"},"SafeRouting"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Constructor =>examples:3"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/AutoDeconstruct"},"AutoDeconstruct")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/QuickConstructor"},"QuickConstructor")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/AutoCtor"},"AutoCtor"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Database =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Gedaq"},"Gedaq")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Breezy"},"Breezy"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"DependencyInjection =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/AutoRegisterInject"},"AutoRegisterInject")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Injectio"},"Injectio"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Disposer =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/BenutomoAutomaticDisposeImplSourceGenerator"},"BenutomoAutomaticDisposeImplSourceGenerator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Disposer"},"Disposer"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"EnhancementClass =>examples:19"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/System.Text.RegularExpressions"},"System.Text.RegularExpressions")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Microsoft.Extensions.Logging"},"Microsoft.Extensions.Logging")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_Static"},"RSCG_Static")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/System.Runtime.InteropServices"},"System.Runtime.InteropServices")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ApparatusAOT"},"ApparatusAOT")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/NetEscapades.EnumGenerators"},"NetEscapades.EnumGenerators")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Microsoft.Interop.JavaScript.JSImportGenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Lombok.NET"},"Lombok.NET")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/MorrisMoxy"},"MorrisMoxy")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/MemoryPack"},"MemoryPack")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/EnumClass"},"EnumClass")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/FastGenericNew"},"FastGenericNew")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/GeneratorEquals"},"GeneratorEquals")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Immutype"},"Immutype")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/SyncMethodGenerator"},"SyncMethodGenerator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/M31.FluentAPI"},"M31.FluentAPI")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Roozie.AutoInterface"},"Roozie.AutoInterface")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_Decorator"},"RSCG_Decorator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/BuilderGenerator"},"BuilderGenerator"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"EnhancementProject =>examples:9"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ThisAssembly"},"ThisAssembly")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_TimeBombComment"},"RSCG_TimeBombComment")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_AMS"},"RSCG_AMS")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_FunctionsWithDI"},"RSCG_FunctionsWithDI")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Mediator"},"Mediator")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Matryoshki"},"Matryoshki")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/DeeDee"},"DeeDee")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ProxyGen"},"ProxyGen")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/SourceGenerator.Helper.CopyCode"},"SourceGenerator.Helper.CopyCode"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"FilesToCode =>examples:5"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_Utils"},"RSCG_Utils")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Podimo.ConstEmbed"},"Podimo.ConstEmbed")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/EmbedResourceCSharp"},"EmbedResourceCSharp")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ThisAssembly_Resources"},"ThisAssembly_Resources")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ResXGenerator"},"ResXGenerator"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"FunctionalProgramming =>examples:4"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/dunet"},"dunet")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/PartiallyApplied"},"PartiallyApplied")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/OneOf"},"OneOf")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RSCG_Utils_Memo"},"RSCG_Utils_Memo"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Mapper =>examples:4"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/mapperly"},"mapperly")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/NextGenMapper"},"NextGenMapper")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/AutoDTO"},"AutoDTO")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/MapTo"},"MapTo"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"MVVM =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/CommunityToolkit.Mvvm"},"CommunityToolkit.Mvvm")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/PropertyChangedSourceGenerator"},"PropertyChangedSourceGenerator"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Optimizer =>examples:1"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/StringLiteral"},"StringLiteral"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"PrimitiveObsession =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Vogen"},"Vogen")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Strongly"},"Strongly"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Serializer =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/System.Text.Json"},"System.Text.Json")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/ProtobufSourceGenerator"},"ProtobufSourceGenerator"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Templating =>examples:4"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/RazorBlade"},"RazorBlade")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Microsoft.NET.Sdk.Razor.SourceGenerators"},"Microsoft.NET.Sdk.Razor.SourceGenerators")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/spreadcheetah"},"spreadcheetah")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Gobie"},"Gobie"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Tests =>examples:2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Rocks"},"Rocks")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/Ridge"},"Ridge"))),(0,a.kt)("mermaid",{value:"flowchart LR;\n\n\n    API--\x3e SkinnyControllersCommon((SkinnyControllersCommon))\n\n    API--\x3e Refit((Refit))\n\n    API--\x3e RSCG_WebAPIExports((RSCG_WebAPIExports))\n\n    API--\x3e SafeRouting((SafeRouting))\n\n    Constructor--\x3e AutoDeconstruct((AutoDeconstruct))\n\n    Constructor--\x3e QuickConstructor((QuickConstructor))\n\n    Constructor--\x3e AutoCtor((AutoCtor))\n\n    Database--\x3e Gedaq((Gedaq))\n\n    Database--\x3e Breezy((Breezy))\n\n    DependencyInjection--\x3e AutoRegisterInject((AutoRegisterInject))\n\n    DependencyInjection--\x3e Injectio((Injectio))\n\n    Disposer--\x3e BenutomoAutomaticDisposeImplSourceGenerator((BenutomoAutomaticDisposeImplSourceGenerator))\n\n    Disposer--\x3e Disposer((Disposer))\n\n    EnhancementClass--\x3e System.Text.RegularExpressions((System.Text.RegularExpressions))\n\n    EnhancementClass--\x3e Microsoft.Extensions.Logging((Microsoft.Extensions.Logging))\n\n    EnhancementClass--\x3e RSCG_Static((RSCG_Static))\n\n    EnhancementClass--\x3e System.Runtime.InteropServices((System.Runtime.InteropServices))\n\n    EnhancementClass--\x3e ApparatusAOT((ApparatusAOT))\n\n    EnhancementClass--\x3e NetEscapades.EnumGenerators((NetEscapades.EnumGenerators))\n\n    EnhancementClass--\x3e Microsoft.Interop.JavaScript.JSImportGenerator((Microsoft.Interop.JavaScript.JSImportGenerator))\n\n    EnhancementClass--\x3e Lombok.NET((Lombok.NET))\n\n    EnhancementClass--\x3e MorrisMoxy((MorrisMoxy))\n\n    EnhancementClass--\x3e MemoryPack((MemoryPack))\n\n    EnhancementClass--\x3e EnumClass((EnumClass))\n\n    EnhancementClass--\x3e FastGenericNew((FastGenericNew))\n\n    EnhancementClass--\x3e GeneratorEquals((GeneratorEquals))\n\n    EnhancementClass--\x3e Immutype((Immutype))\n\n    EnhancementClass--\x3e SyncMethodGenerator((SyncMethodGenerator))\n\n    EnhancementClass--\x3e M31.FluentAPI((M31.FluentAPI))\n\n    EnhancementClass--\x3e Roozie.AutoInterface((Roozie.AutoInterface))\n\n    EnhancementClass--\x3e RSCG_Decorator((RSCG_Decorator))\n\n    EnhancementClass--\x3e BuilderGenerator((BuilderGenerator))\n\n    EnhancementProject--\x3e ThisAssembly((ThisAssembly))\n\n    EnhancementProject--\x3e RSCG_TimeBombComment((RSCG_TimeBombComment))\n\n    EnhancementProject--\x3e RSCG_AMS((RSCG_AMS))\n\n    EnhancementProject--\x3e RSCG_FunctionsWithDI((RSCG_FunctionsWithDI))\n\n    EnhancementProject--\x3e Mediator((Mediator))\n\n    EnhancementProject--\x3e Matryoshki((Matryoshki))\n\n    EnhancementProject--\x3e DeeDee((DeeDee))\n\n    EnhancementProject--\x3e ProxyGen((ProxyGen))\n\n    EnhancementProject--\x3e SourceGenerator.Helper.CopyCode((SourceGenerator.Helper.CopyCode))\n\n    FilesToCode--\x3e RSCG_Utils((RSCG_Utils))\n\n    FilesToCode--\x3e Podimo.ConstEmbed((Podimo.ConstEmbed))\n\n    FilesToCode--\x3e EmbedResourceCSharp((EmbedResourceCSharp))\n\n    FilesToCode--\x3e ThisAssembly_Resources((ThisAssembly_Resources))\n\n    FilesToCode--\x3e ResXGenerator((ResXGenerator))\n\n    FunctionalProgramming--\x3e dunet((dunet))\n\n    FunctionalProgramming--\x3e PartiallyApplied((PartiallyApplied))\n\n    FunctionalProgramming--\x3e OneOf((OneOf))\n\n    FunctionalProgramming--\x3e RSCG_Utils_Memo((RSCG_Utils_Memo))\n\n    Mapper--\x3e mapperly((mapperly))\n\n    Mapper--\x3e NextGenMapper((NextGenMapper))\n\n    Mapper--\x3e AutoDTO((AutoDTO))\n\n    Mapper--\x3e MapTo((MapTo))\n\n    MVVM--\x3e CommunityToolkit.Mvvm((CommunityToolkit.Mvvm))\n\n    MVVM--\x3e PropertyChangedSourceGenerator((PropertyChangedSourceGenerator))\n\n    Optimizer--\x3e StringLiteral((StringLiteral))\n\n    PrimitiveObsession--\x3e Vogen((Vogen))\n\n    PrimitiveObsession--\x3e Strongly((Strongly))\n\n    Serializer--\x3e System.Text.Json((System.Text.Json))\n\n    Serializer--\x3e ProtobufSourceGenerator((ProtobufSourceGenerator))\n\n    Templating--\x3e RazorBlade((RazorBlade))\n\n    Templating--\x3e Microsoft.NET.Sdk.Razor.SourceGenerators((Microsoft.NET.Sdk.Razor.SourceGenerators))\n\n    Templating--\x3e spreadcheetah((spreadcheetah))\n\n    Templating--\x3e Gobie((Gobie))\n\n    Tests--\x3e Rocks((Rocks))\n\n    Tests--\x3e Ridge((Ridge))\n   "}),(0,a.kt)(o.Z,{mdxType:"DocCardList"}))}d.isMDXComponent=!0}}]);