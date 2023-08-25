"use strict";(self.webpackChunkerdia_docs=self.webpackChunkerdia_docs||[]).push([[4334],{4137:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>b});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=c(t),d=l,b=p["".concat(s,".").concat(d)]||p[d]||u[d]||r;return t?a.createElement(b,i(i({ref:n},m),{},{components:t})):a.createElement(b,i({ref:n},m))}));function b(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=d;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[p]="string"==typeof e?e:l,i[1]=o;for(var c=2;c<r;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4932:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var a=t(7462),l=(t(7294),t(4137));const r={id:"template_html_table",title:"Module: template/html/table",sidebar_label:"template/html/table",sidebar_position:0,custom_edit_url:null},i=void 0,o={unversionedId:"api/modules/template_html_table",id:"api/modules/template_html_table",title:"Module: template/html/table",description:"Variables",source:"@site/docs/api/modules/template_html_table.md",sourceDirName:"api/modules",slug:"/api/modules/template_html_table",permalink:"/erdia/api/modules/template_html_table",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"template_html_table",title:"Module: template/html/table",sidebar_label:"template/html/table",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"template/html/style",permalink:"/erdia/api/modules/template_html_style"},next:{title:"template/image/document",permalink:"/erdia/api/modules/template_image_document"}},s={},c=[{value:"Variables",id:"variables",level:2},{value:"default",id:"default",level:3},{value:"Defined in",id:"defined-in",level:4}],m={toc:c},p="wrapper";function u(e){let{components:n,...t}=e;return(0,l.kt)(p,(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"variables"},"Variables"),(0,l.kt)("h3",{id:"default"},"default"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,l.kt)("strong",{parentName:"p"},"default"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"\"<div class=\\\"container-fluid\\\">\\n  <% it.version.entities.forEach((entity) => { -%>\\n<div class=\\\"container-fluid\\\">\\n  <h2 id=\\\"<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>\\\" class=\\\"title is-3\\\">\\n    <% if (entity.change === 'add') { -%>\\n    <span class=\\\"badge text-bg-success\\\">Add</span>\\n    <% } else if (entity.change === 'change') { -%>\\n    <span class=\\\"badge text-bg-warning\\\">Update</span>\\n    <% } else if (entity.change === 'delete') { -%>\\n    <span class=\\\"badge text-bg-danger\\\">Delete</span>\\n    <% } -%>\\n    <%= entity.dbName %>\\n    <small class=\\\"text-body-secondary\\\">(<%= entity.name %>)</small>\\n    <a class=\\\"anchor-link\\\" href=\\\"#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>\\\" aria-label=\\\"Link to this section: <%= entity.dbName %>(<%= entity.name %>)\\\">#</a>\\n  </h2>\\n\\n  <table class=\\\"table table-striped table-hover\\\">\\n    <thead>\\n      <tr>\\n        <th>&nbsp;</th>\\n        <th>Database Name</th>\\n        <th>Property Name</th>\\n        <th>Attribute</th>\\n        <th>Type</th>\\n        <th>Nullable</th>\\n        <th>Charset</th>\\n        <th>Comment</th>\\n      </tr>\\n    </thead>\\n    <tbody>\\n      <% entity.columns.forEach((column) => { -%><tr>\\n        <td>\\n          <% if (column.change === 'add') { -%>\\n          <span class=\\\"badge text-bg-success\\\">Add</span>\\n          <% } else if (column.change === 'change') { -%>\\n          <span class=\\\"badge text-bg-warning\\\">Update</span>\\n          <% } else if (column.change === 'delete') { -%>\\n          <span class=\\\"badge text-bg-danger\\\">Delete</span>\\n          <% } -%>\\n        </td>\\n        <td id=\\\"<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>\\\">\\n          <a class=\\\"anchor-link\\\" href=\\\"#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>\\\" aria-label=\\\"Link to this section: <%= column.dbName %> in <%= entity.dbName %>(<%= entity.name %>)\\\">#</a>\\n          <span><%= column.dbName %></span>\\n        </td>\\n        <td id=\\\"<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>\\\">\\n          <a class=\\\"anchor-link\\\" href=\\\"#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>\\\" aria-label=\\\"Link to this section: <%= column.name %> in <%= entity.dbName %>(<%= entity.name %>)\\\">#</a>\\n          <span><%= column.name %></span>\\n        </td>\\n        <td>\\n        <% if (column.change !== 'change') { -%>\\n          <span><%= column.attributeKey.join(',') %></span>\\n        <% } else { -%>\\n          <span><%= column.attributeKey.join(',') %></span>\\n          <br />\\n          <% if (column.prev != null && column?.prev?.columnTypeWithLength && column.attributeKey.join(',') !== column?.prev?.attributeKey.join(',')) { -%>\\n          <span><del><%= column.attributeKey.join(',') %></del></span>\\n          <% } -%>\\n        <% } -%>\\n        </td>\\n        <td>\\n        <% if (column.change !== 'change') { -%>\\n          <span><%= column.columnTypeWithLength %></span>\\n        <% } else { -%>\\n          <span><%= column.columnTypeWithLength %></span>\\n          <br />\\n          <% if (column.prev != null && column?.prev?.columnTypeWithLength && column.columnTypeWithLength !== column?.prev?.columnTypeWithLength) { -%>\\n          <span><del><%= column.prev.columnTypeWithLength %></del></span>\\n          <% } -%>\\n        <% } -%>\\n        </td>\\n        <td>\\n        <% if (column.change !== 'change') { -%>\\n          <span><%= column.isNullable ? 'Nullable' : '' %></span>\\n        <% } else { -%>\\n          <span><%= column.isNullable ? 'Nullable' : '' %></span>\\n          <br />\\n          <% if (column.prev != null && column?.prev?.isNullable && column.isNullable !== column?.prev?.isNullable) { -%>\\n            <span><del><%= column.prev.isNullable ? 'Nullable' : '' %></del></span>\\n          <% } -%>\\n        <% } -%>\\n        </td>\\n        <td>\\n        <% if (column.change !== 'change') { -%>\\n          <span><%= column.charset %></span>\\n        <% } else { -%>\\n          <span><%= column.charset %></span>\\n          <br />\\n          <% if (column.prev != null && column?.prev?.charset != null && column.charset !== column?.prev?.charset) { -%>\\n          <span><del><%= column.prev.charset %></del></span>\\n          <% } -%>\\n        <% } -%>\\n        </td>\\n        <td>\\n        <% if (column.change !== 'change') { -%>\\n          <span><%= column.comment %></span>\\n        <% } else { -%>\\n          <span><%= column.comment %></span>\\n          <br />\\n          <% if (column.prev != null && column?.prev?.comment != null && column.comment !== column?.prev?.comment) { -%>\\n          <span><del><%= column.prev.comment %></del></span>\\n          <% } -%>\\n        <% } -%>\\n        </td>\\n      </tr>\\n      <% }) %>\\n    </tbody>\\n  </table>\\n  <div class=\\\"mx-auto p-4\\\" style=\\\"width: 100%;\\\"></div>\\n</div>\\n<% }) -%>\\n</div>\"")),(0,l.kt)("h4",{id:"defined-in"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/imjuni/erdia/blob/dbbce86/src/template/html/table.ts#L1"},"template/html/table.ts:1")))}u.isMDXComponent=!0}}]);