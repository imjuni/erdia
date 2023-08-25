"use strict";(self.webpackChunkerdia_docs=self.webpackChunkerdia_docs||[]).push([[8209],{4137:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>f});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=r.createContext({}),p=function(e){var t=r.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},s=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,d=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=p(a),u=n,f=c["".concat(d,".").concat(u)]||c[u]||m[u]||i;return a?r.createElement(f,o(o({ref:t},s),{},{components:a})):r.createElement(f,o({ref:t},s))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[c]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},37:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=a(7462),n=(a(7294),a(4137));const i={id:"typeorm_relations_getRelationRecord",title:"Module: typeorm/relations/getRelationRecord",sidebar_label:"typeorm/relations/getRelationRecord",sidebar_position:0,custom_edit_url:null},o=void 0,l={unversionedId:"api/modules/typeorm_relations_getRelationRecord",id:"api/modules/typeorm_relations_getRelationRecord",title:"Module: typeorm/relations/getRelationRecord",description:"Functions",source:"@site/docs/api/modules/typeorm_relations_getRelationRecord.md",sourceDirName:"api/modules",slug:"/api/modules/typeorm_relations_getRelationRecord",permalink:"/erdia/api/modules/typeorm_relations_getRelationRecord",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"typeorm_relations_getRelationRecord",title:"Module: typeorm/relations/getRelationRecord",sidebar_label:"typeorm/relations/getRelationRecord",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"typeorm/relations/getManyToOneJoinColumn",permalink:"/erdia/api/modules/typeorm_relations_getManyToOneJoinColumn"},next:{title:"typeorm/relations/getRelationRecords",permalink:"/erdia/api/modules/typeorm_relations_getRelationRecords"}},d={},p=[{value:"Functions",id:"functions",level:2},{value:"default",id:"default",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4}],s={toc:p},c="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"functions"},"Functions"),(0,n.kt)("h3",{id:"default"},"default"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"default"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"entityMetadatas"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"relationMetadata"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"metadata"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"PassFailEither"),"<",(0,n.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/creators_interfaces_IReason.default"},(0,n.kt)("inlineCode",{parentName:"a"},"default")),", ",(0,n.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/databases_interfaces_IRelationRecord.default"},(0,n.kt)("inlineCode",{parentName:"a"},"default")),"[]",">"),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"entityMetadatas")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"EntityMetadata"),"[]")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"relationMetadata")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"RelationMetadata"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"metadata")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/erdia/api/interfaces/databases_interfaces_IRecordMetadata.default"},(0,n.kt)("inlineCode",{parentName:"a"},"default")))))),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"PassFailEither"),"<",(0,n.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/creators_interfaces_IReason.default"},(0,n.kt)("inlineCode",{parentName:"a"},"default")),", ",(0,n.kt)("a",{parentName:"p",href:"/erdia/api/interfaces/databases_interfaces_IRelationRecord.default"},(0,n.kt)("inlineCode",{parentName:"a"},"default")),"[]",">"),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/imjuni/erdia/blob/dbbce86/src/typeorm/relations/getRelationRecord.ts#L16"},"typeorm/relations/getRelationRecord.ts:16")))}m.isMDXComponent=!0}}]);