"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[1234],{4137:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>f});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=o.createContext({}),c=function(e){var r=o.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=c(e.components);return o.createElement(p.Provider,{value:r},e.children)},S="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),S=c(t),u=n,f=S["".concat(p,".").concat(u)]||S[u]||m[u]||a;return t?o.createElement(f,i(i({ref:r},l),{},{components:t})):o.createElement(f,i({ref:r},l))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var p in r)hasOwnProperty.call(r,p)&&(s[p]=r[p]);s.originalType=e,s[S]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<a;c++)i[c]=t[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9705:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var o=t(7462),n=(t(7294),t(4137));const a={sidebar_position:9229,title:"9229 - Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",description:"Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",slug:"/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator"},i="Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",s={unversionedId:"Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",id:"Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",title:"9229 - Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",description:"Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",source:"@site/docs/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator.md",sourceDirName:"Microsoft",slug:"/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",draft:!1,tags:[],version:"current",sidebarPosition:9229,frontMatter:{sidebar_position:9229,title:"9229 - Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",description:"Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator",slug:"/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator"},sidebar:"tutorialSidebar",previous:{title:"8661 - System.Text.Json.SourceGeneration_System.Text.Json.SourceGeneration.JsonSourceGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/System.Text.Json.SourceGeneration_System.Text.Json.SourceGeneration.JsonSourceGenerator"},next:{title:"9236 - Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSExportGenerator",permalink:"/RSCG_Examples/v2/docs/Microsoft/Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSExportGenerator"}},p={},c=[{value:"Original Code",id:"original-code",level:2},{value:"Generated Code",id:"generated-code",level:2},{value:"More details",id:"more-details",level:2}],l={toc:c},S="wrapper";function m(e){let{components:r,...a}=e;return(0,n.kt)(S,(0,o.Z)({},l,a,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"microsoftinteropjavascriptjsimportgenerator_microsoftinteropjavascriptjsimportgenerator"},"Microsoft.Interop.JavaScript.JSImportGenerator_Microsoft.Interop.JavaScript.JSImportGenerator"),(0,n.kt)("h2",{id:"original-code"},"Original Code"),(0,n.kt)("p",null,"The code that will be improved by generation is :"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'\n\nusing System.Runtime.InteropServices.JavaScript;\nusing System.Runtime.Versioning;\n\nnamespace TestBlazor.Pages;\n\n[SupportedOSPlatform("browser")]\npublic partial class CallJavaScript1\n{\n    //Generator:JSImports.g.cs\n    [JSImport("getMessage", "CallJavaScript1")]\n    internal static partial string GetWelcomeMessage(string s);\n    //Generator:JSExports.g.cs\n    [JSExport]\n    internal static string GetMessageFromDotnet(string s)\n    {\n        return " GetMessageFromDotnet  => " +  s;\n    }\n}\n')),(0,n.kt)("h2",{id:"generated-code"},"Generated Code"),(0,n.kt)("p",null,"The code that is written is"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"showLineNumbers",showLineNumbers:!0},'// <auto-generated/>\nnamespace TestBlazor.Pages\n{\n    public partial class CallJavaScript1\n    {\n        [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Interop.JavaScript.JSImportGenerator", "7.0.8.32018")]\n        internal static partial string GetWelcomeMessage(string s)\n        {\n            if (__signature_GetWelcomeMessage_2043502129 == null)\n            {\n                __signature_GetWelcomeMessage_2043502129 = global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindJSFunction("getMessage", "CallJavaScript1", new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[] { global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String, global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String });\n            }\n\n            global::System.Span<global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument> __arguments_buffer = stackalloc global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument[3];\n            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];\n            __arg_exception.Initialize();\n            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];\n            __arg_return.Initialize();\n            string __retVal;\n            // Setup - Perform required setup.\n            ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __s_native__js_arg = ref __arguments_buffer[2];\n            __s_native__js_arg.ToJS(s);\n            global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.InvokeJS(__signature_GetWelcomeMessage_2043502129, __arguments_buffer);\n            // Unmarshal - Convert native data to managed data.\n            __arg_return.ToManaged(out __retVal);\n            return __retVal;\n        }\n\n        [global::System.ThreadStaticAttribute]\n        static global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding __signature_GetWelcomeMessage_2043502129;\n    }\n}\n\n')),(0,n.kt)("h2",{id:"more-details"},"More details"),(0,n.kt)("p",null,"Csharp Project: See TestBlazor.csproj from ",(0,n.kt)("a",{target:"_blank",href:t(2096).Z},"/sources/Microsoft.zip")),(0,n.kt)("p",null,"You can see the whole list at",(0,n.kt)("a",{target:"_blank",href:"https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG"},"https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG")))}m.isMDXComponent=!0},2096:(e,r,t)=>{t.d(r,{Z:()=>o});const o=t.p+"assets/files/Microsoft-8cd7710ee53ee1e7831e645619d887db.zip"}}]);