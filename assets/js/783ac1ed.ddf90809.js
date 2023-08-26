"use strict";(self.webpackChunkerdia_docs=self.webpackChunkerdia_docs||[]).push([[1192],{4137:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>c});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=d(n),y=r,c=u["".concat(p,".").concat(y)]||u[y]||s[y]||o;return n?a.createElement(c,i(i({ref:t},m),{},{components:n})):a.createElement(c,i({ref:t},m))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=y;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},5448:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var a=n(7462),r=(n(7294),n(4137));const o={id:"typeorm_relations_getManyToManyJoinColumn",title:"Module: typeorm/relations/getManyToManyJoinColumn",sidebar_label:"typeorm/relations/getManyToManyJoinColumn",sidebar_position:0,custom_edit_url:null},i=void 0,l={unversionedId:"api/modules/typeorm_relations_getManyToManyJoinColumn",id:"api/modules/typeorm_relations_getManyToManyJoinColumn",title:"Module: typeorm/relations/getManyToManyJoinColumn",description:"Functions",source:"@site/docs/api/modules/typeorm_relations_getManyToManyJoinColumn.md",sourceDirName:"api/modules",slug:"/api/modules/typeorm_relations_getManyToManyJoinColumn",permalink:"/erdia/api/modules/typeorm_relations_getManyToManyJoinColumn",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"typeorm_relations_getManyToManyJoinColumn",title:"Module: typeorm/relations/getManyToManyJoinColumn",sidebar_label:"typeorm/relations/getManyToManyJoinColumn",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"typeorm/relations/getManyToManyEntityMetadata",permalink:"/erdia/api/modules/typeorm_relations_getManyToManyEntityMetadata"},next:{title:"typeorm/relations/getManyToOneJoinColumn",permalink:"/erdia/api/modules/typeorm_relations_getManyToOneJoinColumn"}},p={},d=[{value:"Functions",id:"functions",level:2},{value:"default",id:"default",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4}],m={toc:d},u="wrapper";function s(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"functions"},"Functions"),(0,r.kt)("h3",{id:"default"},"default"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"default"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"relationMetadata"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"Pick"),"<",(0,r.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/databases_interfaces_IRelationRecord.default"},(0,r.kt)("inlineCode",{parentName:"a"},"default")),", ",(0,r.kt)("inlineCode",{parentName:"p"},'"joinColumnName"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"joinPropertyName"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"inverseJoinColumnOne"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"inverseJoinColumnNullable"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"isDuplicate"'),">"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"relationMetadata")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Pick"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"RelationMetadata"),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"entityMetadata"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"inverseEntityMetadata"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"inverseJoinColumns"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"joinTableName"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"joinColumns"'),">")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Pick"),"<",(0,r.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/databases_interfaces_IRelationRecord.default"},(0,r.kt)("inlineCode",{parentName:"a"},"default")),", ",(0,r.kt)("inlineCode",{parentName:"p"},'"joinColumnName"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"joinPropertyName"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"inverseJoinColumnOne"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"inverseJoinColumnNullable"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"isDuplicate"'),">"),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/imjuni/erdia/blob/f6edcdf/src/typeorm/relations/getManyToManyJoinColumn.ts#L7"},"typeorm/relations/getManyToManyJoinColumn.ts:7")))}s.isMDXComponent=!0}}]);