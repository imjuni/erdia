"use strict";(self.webpackChunkerdia_docs=self.webpackChunkerdia_docs||[]).push([[9092],{4137:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>y});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),m=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=m(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=m(n),c=i,y=d["".concat(p,".").concat(c)]||d[c]||u[c]||a;return n?r.createElement(y,o(o({ref:t},s),{},{components:n})):r.createElement(y,o({ref:t},s))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[d]="string"==typeof e?e:i,o[1]=l;for(var m=2;m<a;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3945:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>m});var r=n(7462),i=(n(7294),n(4137));const a={id:"typeorm_entities_getEntityName",title:"Module: typeorm/entities/getEntityName",sidebar_label:"typeorm/entities/getEntityName",sidebar_position:0,custom_edit_url:null},o=void 0,l={unversionedId:"api/modules/typeorm_entities_getEntityName",id:"api/modules/typeorm_entities_getEntityName",title:"Module: typeorm/entities/getEntityName",description:"Functions",source:"@site/docs/api/modules/typeorm_entities_getEntityName.md",sourceDirName:"api/modules",slug:"/api/modules/typeorm_entities_getEntityName",permalink:"/erdia/api/modules/typeorm_entities_getEntityName",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"typeorm_entities_getEntityName",title:"Module: typeorm/entities/getEntityName",sidebar_label:"typeorm/entities/getEntityName",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"typeorm/columns/getIsNullable",permalink:"/erdia/api/modules/typeorm_columns_getIsNullable"},next:{title:"typeorm/entities/getEntityPropertyName",permalink:"/erdia/api/modules/typeorm_entities_getEntityPropertyName"}},p={},m=[{value:"Functions",id:"functions",level:2},{value:"default",id:"default",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4}],s={toc:m},d="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"default"},"default"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"default"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"entityMeta"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"\uc5d4\ud2f0\ud2f0 \uba54\ud0c0 \ub370\uc774\ud130\ub97c \ubc1b\uc544\uc11c \ub2e4\uc774\uc5b4\uadf8\ub7a8\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc774\ub984\uc744 \ubc18\ud658\ud55c\ub2e4.\n\uad04\ud638\ub098 \uc5d8\ub9ac\uc5b4\uc2a4\ub97c \ud45c\uc2dc\ud560 \uc218 \uc788\ub294 \ubc29\ubc95\uc774 \uc5c6\uc5b4\uc11c \ud14c\uc774\ube14 \uc774\ub984\uc744 \uc0ac\uc6a9\ud55c\ub2e4.\n\ud14c\uc774\ube14 \uc774\ub984\uc774 \uc5c6\ub294 \uacbd\uc6b0\uc5d0\ub9cc \uc5d4\ud2f0\ud2f0 \uc774\ub984\uc744 \uc0ac\uc6a9\ud55c\ub2e4."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"entityMeta")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/erdia/api/interfaces/databases_interfaces_IEntityRecord.default"},(0,i.kt)("inlineCode",{parentName:"a"},"default"))," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},"Pick"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"EntityMetadata"),", ",(0,i.kt)("inlineCode",{parentName:"td"},'"name"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},'"tableName"'),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"\uc5d4\ud2f0\ud2f0 \uba54\ud0c0 \ub370\uc774\ud130")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"entity name in CF-ER Diagram"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/imjuni/erdia/blob/dbbce86/src/typeorm/entities/getEntityName.ts#L12"},"typeorm/entities/getEntityName.ts:12")))}u.isMDXComponent=!0}}]);