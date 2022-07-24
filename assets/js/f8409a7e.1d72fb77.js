"use strict";(self.webpackChunkerdia_docs=self.webpackChunkerdia_docs||[]).push([[206],{3905:(t,e,r)=>{r.d(e,{Zo:()=>p,kt:()=>u});var a=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},i=Object.keys(t);for(a=0;a<i.length;a++)r=i[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)r=i[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var m=a.createContext({}),s=function(t){var e=a.useContext(m),r=e;return t&&(r="function"==typeof t?t(e):l(l({},e),t)),r},p=function(t){var e=s(t.components);return a.createElement(m.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},c=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,i=t.originalType,m=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),c=s(r),u=n,f=c["".concat(m,".").concat(u)]||c[u]||d[u]||i;return r?a.createElement(f,l(l({ref:e},p),{},{components:r})):a.createElement(f,l({ref:e},p))}));function u(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var i=r.length,l=new Array(i);l[0]=c;var o={};for(var m in e)hasOwnProperty.call(e,m)&&(o[m]=e[m]);o.originalType=t,o.mdxType="string"==typeof t?t:n,l[1]=o;for(var s=2;s<i;s++)l[s]=r[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},9568:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>m,toc:()=>p});var a=r(7462),n=(r(7294),r(3905)),i=r(4996);const l={sidebar_position:1,title:"Introduction",slug:"/"},o=void 0,m={unversionedId:"intro",id:"intro",title:"Introduction",description:"What is ERdia?",source:"@site/docs/intro.mdx",sourceDirName:".",slug:"/",permalink:"/erdia/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Introduction",slug:"/"},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/erdia/getting-start/installation"}},s={},p=[{value:"What is ERdia?",id:"what-is-erdia",level:2},{value:"Why should I use it?",id:"why-should-i-use-it",level:2},{value:"Showcase",id:"showcase",level:2},{value:"ER diagram generate from example entities",id:"er-diagram-generate-from-example-entities",level:3},{value:"Entity schema table from example entities",id:"entity-schema-table-from-example-entities",level:3},{value:"user (User)",id:"user-user",level:4}],d={toc:p};function c(t){let{components:e,...r}=t;return(0,n.kt)("wrapper",(0,a.Z)({},d,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"what-is-erdia"},"What is ERdia?"),(0,n.kt)("p",null,"ERdia is ER diagram, Entity schema table generator using TypeORM."),(0,n.kt)("h2",{id:"why-should-i-use-it"},"Why should I use it?"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Generate ER diagram document automatically"),(0,n.kt)("li",{parentName:"ul"},"Generate Entity schema spec. document automatically"),(0,n.kt)("li",{parentName:"ul"},"Support variety document format: html, markdown, pdf, png, svg"),(0,n.kt)("li",{parentName:"ul"},"Support interactive initialize cli interface")),(0,n.kt)("h2",{id:"showcase"},"Showcase"),(0,n.kt)("h3",{id:"er-diagram-generate-from-example-entities"},"ER diagram generate from ",(0,n.kt)("a",{parentName:"h3",href:"https://github.com/imjuni/erdia/tree/master/entities"},"example entities")),(0,n.kt)("img",{src:(0,i.Z)("/img/erdiagram.png"),title:"showcase-erdiagram",style:{marginBottom:30}}),(0,n.kt)("h3",{id:"entity-schema-table-from-example-entities"},"Entity schema table from ",(0,n.kt)("a",{parentName:"h3",href:"https://github.com/imjuni/erdia/tree/master/entities"},"example entities")),(0,n.kt)("h4",{id:"user-user"},"user (User)"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Name of Entity"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"center"},"Attribute Key"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Comment"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"id"),(0,n.kt)("td",{parentName:"tr",align:"left"},"id"),(0,n.kt)("td",{parentName:"tr",align:"left"},"number"),(0,n.kt)("td",{parentName:"tr",align:"center"},"PK"),(0,n.kt)("td",{parentName:"tr",align:"left"})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"photoId"),(0,n.kt)("td",{parentName:"tr",align:"left"},"photo"),(0,n.kt)("td",{parentName:"tr",align:"left"},"number"),(0,n.kt)("td",{parentName:"tr",align:"center"},"FK"),(0,n.kt)("td",{parentName:"tr",align:"left"})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"lastName"),(0,n.kt)("td",{parentName:"tr",align:"left"},"lastName"),(0,n.kt)("td",{parentName:"tr",align:"left"},"varchar(64)"),(0,n.kt)("td",{parentName:"tr",align:"center"}),(0,n.kt)("td",{parentName:"tr",align:"left"})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"isActive"),(0,n.kt)("td",{parentName:"tr",align:"left"},"isActive"),(0,n.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,n.kt)("td",{parentName:"tr",align:"center"}),(0,n.kt)("td",{parentName:"tr",align:"left"},"line1",(0,n.kt)("br",null),"line2",(0,n.kt)("br",null),"line3")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"first_name"),(0,n.kt)("td",{parentName:"tr",align:"left"},"firstName"),(0,n.kt)("td",{parentName:"tr",align:"left"},"string"),(0,n.kt)("td",{parentName:"tr",align:"center"}),(0,n.kt)("td",{parentName:"tr",align:"left"},"user firstname")))))}c.isMDXComponent=!0}}]);