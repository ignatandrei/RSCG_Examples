"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[5564],{4137:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),m=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=m(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=m(r),d=o,h=p["".concat(s,".").concat(d)]||p[d]||u[d]||a;return r?n.createElement(h,l(l({ref:t},c),{},{components:r})):n.createElement(h,l({ref:t},c))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:o,l[1]=i;for(var m=2;m<a;m++)l[m]=r[m];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9254:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>m});var n=r(7462),o=(r(7294),r(4137));const a={},l="RSCG_TimeBombComment aka Time Bomb comment for technical debt",i={unversionedId:"RSCG-Examples/RSCG_TimeBombComment_readme",id:"RSCG-Examples/RSCG_TimeBombComment_readme",title:"RSCG_TimeBombComment aka Time Bomb comment for technical debt",description:"Reference the nuget package",source:"@site/docs/RSCG-Examples/RSCG_TimeBombComment_readme.md",sourceDirName:"RSCG-Examples",slug:"/RSCG-Examples/RSCG_TimeBombComment_readme",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/RSCG_TimeBombComment_readme",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"RSCG_Static",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/RSCG_Static_readme"},next:{title:"RSCG_Utils",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/RSCG_Utils_readme"}},s={},m=[{value:"Examples",id:"examples",level:2},{value:"Usage for technical debt",id:"usage-for-technical-debt",level:2},{value:"Usage for obsolete methods",id:"usage-for-obsolete-methods",level:2},{value:"Other Roslyn Source Code Generators",id:"other-roslyn-source-code-generators",level:2}],c={toc:m},p="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rscg_timebombcomment-aka-time-bomb-comment-for-technical-debt"},"RSCG_TimeBombComment aka Time Bomb comment for technical debt"),(0,o.kt)("p",null,"Reference the nuget package "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml"},'    <PackageReference Include="RSCG_TimeBombComment" Version="2023.5.9.2110"  PrivateAssets="all" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />\n')),(0,o.kt)("p",null,"Then just add :"),(0,o.kt)("p",null,"//TB: 2021-09-13 this is a comment transformed into an error"),(0,o.kt)("p",null,"and you will see the error!"),(0,o.kt)("p",null,"The general form is"),(0,o.kt)("p",null,"//TB: yyyy-MM-dd whatever here"),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cs"},"//TB: 2020-09-13 this is a comment transformed into an error\n")),(0,o.kt)("p",null,"will produce an error"),(0,o.kt)("h2",{id:"usage-for-technical-debt"},"Usage for technical debt"),(0,o.kt)("p",null,"When you have a "),(0,o.kt)("p",null,"//TODO"),(0,o.kt)("p",null,"comment in your code, you can transform it into an error time bomb by adding the following line in your project file"),(0,o.kt)("p",null,"//TB: yyyy-MM-dd whatever here\nand on the date will produce an error when compiling the project"),(0,o.kt)("h2",{id:"usage-for-obsolete-methods"},"Usage for obsolete methods"),(0,o.kt)("p",null,"Imagine you have a method that is obsolete and you want to remember that you have to remove it.\nJust put the following line in your project file"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cs"},'[Obsolete("should be deleted on the date on the right", TB_20210915)]\nstatic string Test1()\n{\n    return "asdasd";\n}\n')),(0,o.kt)("p",null,"Then RSCG will create a static const boolean TB_20210915 that will be true if the date is less than 2021-09-15"),(0,o.kt)("p",null,"Also, when you want to test something in your code, but give error if compiled with release"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp"},"//Just for debug: if(args.length>0) throw new ArgumentException();\n//JFD: test\n")),(0,o.kt)("p",null,"will raise error if compiled with "),(0,o.kt)("p",null,"dotnet build -c release"),(0,o.kt)("h2",{id:"other-roslyn-source-code-generators"},"Other Roslyn Source Code Generators"),(0,o.kt)("p",null,"You can find more ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/rscg_examples/"},"Roslyn Source Code Generators")," at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/ignatandrei/rscg_examples/"},"https://github.com/ignatandrei/rscg_examples/")),(0,o.kt)("h1",{id:"more-roslyn-source-code-generators"},"More Roslyn Source Code Generators"),(0,o.kt)("p",null,"You can find more RSCG with examples at ",(0,o.kt)("a",{parentName:"p",href:"https://ignatandrei.github.io/RSCG_Examples/v2/"},"Roslyn Source Code Generators")))}u.isMDXComponent=!0}}]);