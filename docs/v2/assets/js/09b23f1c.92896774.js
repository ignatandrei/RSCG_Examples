"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[4438],{17661:(e,t,r)=>{r.d(t,{Z:()=>y});var i=r(67294),n=r(86010),a=r(78259),c=r(83699),s=r(2735),o=r(97325);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function d(e){let{href:t,children:r}=e;return i.createElement(c.Z,{href:t,className:(0,n.Z)("card padding--lg",l.cardContainer)},r)}function m(e){let{href:t,icon:r,title:a,description:c}=e;return i.createElement(d,{href:t},i.createElement("h2",{className:(0,n.Z)("text--truncate",l.cardTitle),title:a},r," ",a),c&&i.createElement("p",{className:(0,n.Z)("text--truncate",l.cardDescription),title:c},c))}function u(e){let{item:t}=e;const r=(0,a.Wl)(t);return r?i.createElement(m,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,o.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function p(e){let{item:t}=e;const r=(0,s.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",n=(0,a.xz)(t.docId??void 0);return i.createElement(m,{href:t.href,icon:r,title:t.label,description:t.description??n?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return i.createElement(p,{item:t});case"category":return i.createElement(u,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function f(e){let{className:t}=e;const r=(0,a.jA)();return i.createElement(y,{items:r.items,className:t})}function y(e){const{items:t,className:r}=e;if(!t)return i.createElement(f,e);const c=(0,a.MN)(t);return i.createElement("section",{className:(0,n.Z)("row",r)},c.map(((e,t)=>i.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},i.createElement(g,{item:e})))))}},34790:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var i=r(87462),n=(r(67294),r(3905));r(17661);const a={sidebar_position:25,title:"RSCG by category",description:"RSCG  by category",slug:"/categories"},c=void 0,s={unversionedId:"Categories/index",id:"Categories/index",title:"RSCG by category",description:"RSCG  by category",source:"@site/docs/Categories/index.md",sourceDirName:"Categories",slug:"/categories",permalink:"/RSCG_Examples/v2/docs/categories",draft:!1,tags:[],version:"current",sidebarPosition:25,frontMatter:{sidebar_position:25,title:"RSCG by category",description:"RSCG  by category",slug:"/categories"},sidebar:"tutorialSidebar",previous:{title:"About",permalink:"/RSCG_Examples/v2/docs/about"},next:{title:"AOP",permalink:"/RSCG_Examples/v2/docs/Categories/AOP"}},o={},l=[],d={toc:l},m="wrapper";function u(e){let{components:t,...r}=e;return(0,n.kt)(m,(0,i.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/List-of-RSCG"},"See time based list")))}u.isMDXComponent=!0}}]);