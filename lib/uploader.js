module.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=92)}([function(e,t,i){"use strict";function n(e,t,i,n,s,a,r,o){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=i,l._compiled=!0),n&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=c):s&&(c=o?function(){s.call(this,this.$root.$options.shadowRoot)}:s),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(e,t){return c.call(t),u(e,t)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:l}}i.d(t,"a",function(){return n})},,,function(e,t,i){"use strict";i.r(t);var n=i(4),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t.default=s.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"GkCheckbox",props:{"is-checked":Boolean},data:function(){return{checked:this.isChecked}},watch:{isChecked:"updateChecked"},methods:{updateChecked:function(){this.checked=this.isChecked},changeChecked:function(){this.checked=this.$refs.checkbox.checked},setChecked:function(e){this.checked=e}}}},,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function s(e,t){t=t||"yyyy-MM-dd hh:mm:ss";var i={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)));return t}t.bitSize=function(e,t){if(void 0===e||"-"===e)return e;"number"!=typeof e&&(e=Number(e));if(e<0)return"";var i=t&&["b","kb","mb","gb","tb","pb"]||["B","KB","MB","GB","TB","PB"],n=0;for(;e>=1024;){if(n>=5)return e+i[n];e/=1024,n++}return 0===e?e:Math.round(100*e)/100+i[n]},t.strToB=function(e){var t=(e=e.toUpperCase()).match(/[A-Z]+/i)[0],i=e.match(/[0-9]+/)[0];switch(t){case"KB":case"K":i*=1024;break;case"MB":case"M":i*=1048576;break;case"GB":case"G":i*=1073741824;break;case"TB":case"T":i*=1099511627776;break;case"PB":case"P":i*=0x4000000000000;break;case"EB":case"E":i*=0x1000000000000000}return i},t.formatDate=s,t.timeToDate=function(e,t){return s(new Date(e),t)},t.getOS=function(){var e="Others";navigator.userAgent.indexOf("Android")>-1||navigator.userAgent.indexOf("Linux")>-1?e="Android":navigator.userAgent.indexOf("iPhone")>-1?e="iOS":navigator.userAgent.indexOf("Windows Phone")>-1?e="WP":window.navigator.userAgent.indexOf("Windows NT")>-1?e="Windows":window.navigator.userAgent.indexOf("Mac")>-1?e="Mac":window.navigator.userAgent.indexOf("X11")>-1?e="UNIX":window.navigator.userAgent.indexOf("Linux")>-1&&(e="Linux");return e},t.isIE=function(){var e=navigator.userAgent.toLowerCase();if(e.indexOf("msie")>-1)return e.match(/msie ([\d.]+)/)[1];return!1},t.intersect=function(e,t,i){var n={};for(var s in e)for(var a in t)if(JSON.stringify(e[s])===JSON.stringify(t[a])){n[a]=e[s];break}return i?Object.values(n):n},t.getSelected=function(e,t){var i={};if(void 0===e)return i;"object"===(void 0===e?"undefined":n(e))?e.forEach(function(e){i[e]=t[e]}):i[e]=t[e];return i},t.getExt=function(e){return e.slice(e.lastIndexOf(".")+1).toLowerCase()},t.baseName=function(e){return(e=e.toString()).replace(/\\/g,"/").replace(/.*\//,"")},t.dirName=function(e){return(e=e.toString()).indexOf("/")<0?"":e.replace(/\\/g,"/").replace(/\/[^\/]*$/,"")}},function(e,t,i){"use strict";var n=function(){var e=this.$createElement;return(this._self._c||e)("input",{ref:"checkbox",staticClass:"gk-checkbox",class:{"gk-checkbox-checked":this.checked},attrs:{"aria-checked":this.checked,type:"checkbox"},domProps:{checked:this.checked},on:{change:this.changeChecked}})},s=[];n._withStripped=!0,i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s})},,,,function(e,t,i){"use strict";i.r(t);var n=i(7),s=i(3);for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);var r=i(0),o=Object(r.a)(s.default,n.a,n.b,!1,null,null,null);o.options.__file="packages/checkbox/src/checkbox.vue",t.default=o.exports},,,,,,,function(e,t,i){"use strict";i.r(t);var n=i(19),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t.default=s.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(6);t.default={name:"GkFileicon",props:{folder:Boolean,type:String,thumbnail:String,filename:String,size:{type:Number|String,default:32}},data:function(){return{showThumbnail:!!this.thumbnail}},watch:{thumbnail:"watchThumbnai"},computed:{sizeCls:function(){return"gk-fileicon-"+this.size},typeCls:function(){return this.folder?"gk-fileicon-"+(this.type?this.type+"-folder":"folder"):"gk-fileicon-"+(this.type||(0,n.getExt)(this.filename))}},methods:{watchThumbnai:function(e){this.showThumbnail=!!e}}}},function(e,t,i){"use strict";i.r(t);var n=i(21),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t.default=s.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(i(40)),s=r(i(50)),a=i(51);function r(e){return e&&e.__esModule?e:{default:e}}t.default={name:"GkTable",mixins:[n.default],components:{GkTableCell:s.default,VirtualScroller:a.VirtualScroller},props:{height:Number,"show-more":Boolean,"show-header":Boolean,data:{type:Array,required:!0},"more-text":{type:String,default:"loading..."},"item-height":{type:Number,default:42}},data:function(){return{timer:0,page:1,hasScrollbar:!1}},computed:{computedStyle:function(){var e={};if(this.$refs.thead){if(!this.fit&&this.height){var t=this.height;if(this.showHeader){var i=window.getComputedStyle(this.$refs.thead.querySelector("th:first-child")).height;t-=parseInt(i)}e.height=t+"px"}return e}},tableStyle:function(){var e={};return this.fit?e:(this.height&&(e.height=this.height+"px"),e)},columns:function(){var e=this,t=[];return this.$children.forEach(function(i){i.isTableColumn&&t.push(Object.assign({columnStyle:Object.assign({height:e.itemHeight+"px"},i.columnStyle),render:i.$scopedSlots.default},i.$props))}),t}},methods:{handleSort:function(e,t){this.$emit("sort-by",e,t)},refreshCheckAllState:function(){var e=this.getHeadCheckbox();if(void 0!==e){var t=Object.keys(this.checked).length;e.setChecked(t>0&&t===this.data.length)}},getHeadCheckbox:function(){if(this.$refs.thead&&this.$refs.thead.querySelector("th.gk-table-checkbox"))return this.$children[0].$children[0]},getCheckboxes:function(){var e=[];return this.$refs.table.$children.forEach(function(t){t.$el.className.indexOf("gk-table-checkbox")>-1&&e.push(t.$children[0])}),e},setScrollbar:function(){if(this.$refs.table){var e=this.$refs.table.$el;this.hasScrollbar=this.itemHeight*this.data.length>e.clientHeight}},windowResize:function(){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){e.setScrollbar()},5)},documentKeyDown:function(e){if(!1===this.handleShortcut(e))return!1;"ArrowUp"===e.code?(this.handleSelectPrevNext(-1,e),e.preventDefault()):"ArrowDown"===e.code?(this.handleSelectPrevNext(1,e),e.preventDefault()):"Enter"===e.code&&(this.handleDblclick(Object.values(this.selected)[0],Object.keys(this.selected)[0],e),e.preventDefault())}},mounted:function(){var e=this;this.$nextTick(function(){e.setScrollbar()}),window.addEventListener("resize",this.windowResize)},updated:function(){this.setScrollbar()},destroyed:function(){window.removeEventListener("resize",this.windowResize)}}},function(e,t,i){"use strict";i.r(t);var n=i(23),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t.default=s.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(i(11));t.default={name:"gkTableColumn",components:{GkCheckbox:n.default},data:function(){return{isTableColumn:!0,order:this.sortable}},props:{label:String,width:Number|String,checkbox:Boolean,property:String,sortable:Boolean|String,align:{type:String,default:"left"},formatter:Function},computed:{columnClass:function(){return{"gk-table-checkbox":this.checkbox,"gk-table-sortable":this.showSort}},columnStyle:function(){return{width:"number"==typeof this.width?this.width+"px":this.width,"text-align":this.align}},showSort:function(){return void 0!==this.sortable}},methods:{checkAll:function(e){var t=e.target;this.$parent.handleCheckAll(t.checked)},handleClick:function(){var e=this;if(!this.showSort)return!1;switch(this.order){case"asc":this.order="desc";break;case"desc":this.order="";break;default:this.order="asc"}this.$parent.$children.forEach(function(t){e._uid!==t._uid&&t.showSort&&(t.order=void 0)}),this.$parent.handleSort(this.property,this.order)}}}},,,function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.showThumbnail?i("img",{class:e.sizeCls,attrs:{src:e.thumbnail},on:{error:function(t){e.showThumbnail=!1}}}):i("i",{class:[e.sizeCls,e.typeCls]})},s=[];n._withStripped=!0,i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s})},,,function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"gk-table",class:{"gk-table-with-header":e.showHeader,"gk-table-fit":e.fit,"gk-table-show-checkbox":e.showCheckbox},style:e.tableStyle},[e.data.length?[i("table",{directives:[{name:"show",rawName:"v-show",value:e.showHeader,expression:"showHeader"}],ref:"thead",staticClass:"gk-table-header"},[i("thead",[i("tr",[e._t("default"),e._v(" "),e.hasScrollbar?i("th",{staticClass:"gk-table-header-last"}):e._e()],2)])]),e._v(" "),i("virtual-scroller",{directives:[{name:"scroll-load",rawName:"v-scroll-load",value:e.loadMore,expression:"loadMore"},{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticClass:"gk-table-virtual gk-scrollbar",style:e.computedStyle,attrs:{contentClass:"gk-table-body",items:e.data,"content-tag":"table","item-height":e.itemHeight},nativeOn:{contextmenu:function(t){e.handleContextmenu(null,null,t)},click:function(t){e.handleCancelSelect()}},scopedSlots:e._u([{key:"default",fn:function(t){return[i("tr",{staticClass:"gk-table-item",class:{"gk-table-item-active":void 0!==e.selected[t.itemIndex]},on:{click:function(i){e.handleSelect(t.item,t.itemIndex,i)},dblclick:function(i){e.handleDblclick(t.item,t.itemIndex,i)},contextmenu:function(i){e.handleContextmenu(t.item,t.itemIndex,i)}}},e._l(e.columns,function(n,s){return i("gk-table-cell",{key:s,attrs:{"is-checked":void 0!==e.checked[t.itemIndex],index:t.itemIndex,data:t.item,column:n},on:{check:e.handleCheck}})}))]}}])}),e._v(" "),e.showMore?i("div",{staticClass:"gk-table-more"},[i("span",{staticClass:"gk-table-more-text"},[e._v(e._s(e.moreText))])]):e._e()]:i("div",{staticClass:"gk-table-empty"},[e._t("empty")],2)],2)},s=[];n._withStripped=!0,i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s})},function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("th",{class:e.columnClass,style:e.columnStyle,on:{click:e.handleClick}},[e.checkbox?i("gk-checkbox",{attrs:{type:"checkbox"},nativeOn:{click:function(t){e.checkAll(t)}}}):i("span",[e._v(e._s(e.label))]),e._v(" "),e.showSort?i("span",{staticClass:"sortable",class:{"sortable-desc":"desc"===e.order,"sortable-asc":"asc"===e.order}},[i("i",{staticClass:"sort-caret asc"}),e._v(" "),i("i",{staticClass:"sort-caret desc"})]):e._e()],1)},s=[];n._withStripped=!0,i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"gk-loading",show:function(e){var t=this;if(!this.exist){var i=window.getComputedStyle(e).position;"static"!==i&&""!==i||(this.static=!0,e.style.position="relative"),e.classList.add("gk-loading-scope");var n=document.createElement("div");n.className="gk-loading-wrapper",!1!==this.options.bg&&(n.style.backgroundColor=this.options.bg),e.appendChild(n);var s=document.createElement("div");if(s.className="gk-loading",s.innerHTML='<svg style="styles" class="gk-loading-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>',n.appendChild(s),!1!==this.options.text){s.classList.add("gk-loading-text");var a=document.createElement("p");a.textContent=this.options.text,s.appendChild(a)}this.box=n}this.exist=!0,window.requestAnimationFrame(function(){t.box.style.opacity="1"})},hide:function(e){var t=this;e.classList.remove("gk-loading-scope"),this.box.addEventListener("transitionend",function(){t.box.remove(),t.box=null,t.exist=!1,t.static&&e.style.removeProperty("position")}),this.box.style.opacity="0.01"},bind:function(e,t){var i=t.def;i.box=null,i.static=i.exist=!1,i.options={bg:e.getAttribute("gk-loading-background")||!1,text:e.getAttribute("gk-loading-text")||!1}},update:function(e,t){var i=t.def;if(t.oldValue!==t.value)if(t.value)i.show(e);else{if(!i.exist)return;i.hide(e)}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"gk-scroll-load",bind:function(e,t){var i=0,n=new Function("return {"+(e.getAttribute("gk-scroll-load-option")||"")+"}")();!1!==(n=Object.assign({distance:20,disabled:!1,frequency:200,selector:!1},n)).selector&&e.querySelector(n.selector).length&&(e=e.querySelector(n.selector));var s=function(){e.scrollTop&&e.scrollTop+e.clientHeight+n.distance>=e.scrollHeight&&"function"==typeof t.value&&t.value()};s(),e.onscroll=function(){n.disabled||(clearTimeout(i),i=setTimeout(function(){s()},n.frequency))}},update:function(e,t){}}},,,,,,,,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(i(31)),s=r(i(32)),a=i(6);function r(e){return e&&e.__esModule?e:{default:e}}t.default={directives:{loading:n.default,scrollLoad:s.default},props:{loading:Boolean,fit:Boolean,shortcut:Boolean,"right-selected":Boolean,"show-checkbox":Boolean,"before-select":Function,"scroll-on-check":Boolean,"scroll-on-select":Boolean,"default-index":Number|Array,"default-checked-index":{type:Number|Array,default:function(){return[]}},"select-on-check":{type:Boolean,default:!0},"check-on-select":{type:Boolean,default:!0}},data:function(){return{scrollCheckAll:!1,scrollSelectAll:!1,lastSelectedIndex:-1,lastIndex:-1,clickTimer:!1,clickItem:!1,selected:(0,a.getSelected)(this.defaultIndex,this.data),checked:(0,a.getSelected)(this.defaultCheckedIndex,this.data)}},watch:{data:"updateData"},methods:{handleSelect:function(e,t,i){var n=this;if("function"==typeof this.beforeSelect&&!this.beforeSelect(e,t,i))return!1;this.clickItem=!0,clearTimeout(this.clickTimer),this.clickTimer=setTimeout(function(){if(i&&(i.ctrlKey||i.metaKey)){var s=n.selected;n.selected={},void 0===s[t]?(s[t]=e,n.lastSelectedIndex=t,n.selected=s):(delete s[t],n.selected=s)}else if(n.selected={},i&&i.shiftKey&&n.lastSelectedIndex>-1)for(var a=Math.min(t,n.lastSelectedIndex);a<=Math.max(t,n.lastSelectedIndex);a++)n.selected[a]=n.data[a];else{if(void 0!==n.selected[t])return;n.selected[t]=e,n.lastSelectedIndex=t}n.clickItem=!1,n.lastIndex=t,n.updateChecked(),n.$emit("select",n.getSelected(),i)},20)},handleCancelSelect:function(e){this.clickItem||(this.selected={},this.lastIndex=-1,this.updateChecked(),this.$emit("select",null,e))},handleSelectAll:function(){this.selected=Object.assign({},this.data),this.lastIndex=this.data.length-1,this.updateChecked(),this.$emit("selectAll",event)},handleDblclick:function(e,t){clearTimeout(this.clickTimer),this.$emit("dblclick",e,t)},handleCheck:function(e,t,i){i.target.checked?this.checked[t]=e:delete this.checked[t],this.refreshCheckAllState(),(this.checkOnSelect||this.selectOnCheck)&&(this.updateSelected(t),i.stopPropagation()),this.$emit("check",this.getChecked(),i)},handleContextmenu:function(e,t,i){-1!==Object.keys(this.$listeners).indexOf("contextmenu")&&(this.rightSelected&&void 0===this.selected[t]&&this.handleSelect(e,t,i),this.$emit("contextmenu",this.getSelected(),i),i.stopPropagation(),i.preventDefault())},handleSelectPrevNext:function(e,t){if(-1===this.lastIndex)return!1;var i=parseInt(this.lastIndex)+e;if(i<0||i>this.data.length-1)return!1;this.handleSelect(this.data[i],i,t)},handleCheckAll:function(e){this.getCheckboxes().forEach(function(t){t.setChecked(e)}),this.checked=e?this.data:[],this.updateSelected(this.checked.length-1),this.$emit("checkAll",event)},handleShortcut:function(e){return(e.ctrlKey||e.metaKey)&&"KeyA"===e.code?(this.handleSelectAll(),e.preventDefault(),!1):("PgUp"===e.code?(this.handleSelect(this.data[0],0,e),e.preventDefault()):"End"!==e.code&&"PgDn"!==e.code||(this.handleSelect(this.data[this.data.length-1],this.data.length-1,e),e.preventDefault()),!!Object.keys(this.selected).length&&void 0)},loadMore:function(){this.scrollOnCheck&&(this.scrollCheckAll=Object.keys(this.checked).length===this.data.length),this.scrollOnSelect&&(this.scrollSelectAll=Object.keys(this.selected).length===this.data.length),this.$emit("load-more")},refreshCheckAllState:function(){return!1},updateChecked:function(){this.selectOnCheck&&(this.checked=Object.assign({},this.selected),this.refreshCheckAllState())},updateSelected:function(e){this.checkOnSelect&&(this.selected=Object.assign({},this.checked),this.lastIndex=e)},updateData:function(){this.checked=(0,a.intersect)(this.checked,this.data),this.selected=(0,a.intersect)(this.selected,this.data),this.scrollOnCheck&&this.scrollCheckAll&&(this.scrollCheckAll=!1,this.handleCheckAll(!0)),this.scrollOnSelect&&this.scrollSelectAll&&(this.scrollSelectAll=!1,this.selected=this.data),this.refreshCheckAllState()},getSelected:function(){return Object.values(this.selected)},getSelectedIndex:function(){return Object.keys(this.selected)},getChecked:function(){return Object.values(this.checked)},getCheckedIndex:function(){return Object.keys(this.checked)}},mounted:function(){this.shortcut&&document.addEventListener("keydown",this.documentKeyDown)},destroyed:function(){this.shortcut&&document.removeEventListener("keydown",this.documentKeyDown)}}},,,,,,,,function(e,t,i){"use strict";i.r(t);var n=i(26),s=i(18);for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);var r=i(0),o=Object(r.a)(s.default,n.a,n.b,!1,null,null,null);o.options.__file="packages/fileicon/src/fileicon.vue",t.default=o.exports},function(e,t,i){"use strict";i.r(t);var n=i(29),s=i(20);for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);var r=i(0),o=Object(r.a)(s.default,n.a,n.b,!1,null,null,null);o.options.__file="packages/table/src/table.vue",t.default=o.exports},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(i(11));t.default={name:"gkTableCell",components:{GkCheckbox:n.default},props:{column:Object,data:Object,index:Number,isChecked:Boolean},render:function(e){var t=this,i=this.column,n=void 0;if(i.render)n=this.column.render(this.data);else if(i.checkbox)n=e("gk-checkbox",{props:{"is-checked":this.isChecked},nativeOn:{click:function(e){t.$emit("check",t.data,t.index,e)},dblclick:function(e){e.stopPropagation()}}});else if(i.property){var s=this.data[i.property];n=this.column.formatter?this.column.formatter(s,this.data,this.index):s}else this.column.formatter&&(n=this.column.formatter());return e("td",{style:i.columnStyle,class:{"gk-table-checkbox":i.checkbox}},[n])},computed:{label:function(){var e=this.data[this.column.property];return this.column.formatter?this.column.formatter(e,this.data):e}}}},function(e,t){e.exports=require("vue-virtual-scroller")},function(e,t,i){"use strict";i.r(t);var n=i(30),s=i(22);for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);var r=i(0),o=Object(r.a)(s.default,n.a,n.b,!1,null,null,null);o.options.__file="packages/table/src/table-column.vue",t.default=o.exports},,,,,function(e,t,i){"use strict";i.r(t);var n=i(58),s=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t.default=s.a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(i(94)),s=l(i(95)),a=l(i(49)),r=l(i(52)),o=l(i(48)),c=i(6);function l(e){return e&&e.__esModule?e:{default:e}}t.default={name:"GkUploader",components:{GkTable:a.default,GkTableColumn:r.default,GkFileicon:o.default},props:{auto:{type:Boolean,default:!0},server:{type:String,required:!0},picker:Object,height:{type:Number,default:400},"head-tpl":{type:String,default:"selected :d"},"empty-content-width":{type:Number,default:500},"form-data":Object,buttons:Array,options:Object,fit:Boolean,dnd:String,chunked:Boolean,dialog:Boolean,translate:Object,"hide-delete":Boolean,"before-check":Function,"check-response":Function},data:function(){return{mini:!0,hidden:this.dialog,headLabel:this.headTpl.replace(":d",0),list:[],relation:{},finishFiles:[],uploader:!1,deleteButtons:[],emptyContentStyle:{}}},computed:{showCheck:function(){return!this.auto},buttonList:function(){var e=this,t=[];return void 0===this.buttons?t=Object.values(this.defaultButtons):this.buttons.forEach(function(i){"folder"===i.type&&e.isIE||t.push(Object.assign(e.defaultButtons[i.type],i))}),t},defaultButtons:function(){return{delete:{type:"delete",class:"gk-uploader-delete"},file:{type:"file",class:"gk-uploader-file",multiple:!0},folder:{type:"folder",class:"gk-uploader-folder",multiple:!0}}},states:function(){return{ready:"ready",pause:"pause",cancel:"cancel",progress:"progress",success:"success",uploadError:"uploadError",error:"error"}}},watch:{mini:"changeMini",list:"changeList",finishFiles:"checkFinish",formData:{handler:"updateData",deep:!0}},methods:{gettext:function(e){return this.translate&&this.translate[e]||e},dialogTitle:function(){return this.finishFiles.length===this.list.length?this.gettext("Upload Finish"):this.gettext("Uploading (:n/:t)").replace(":n",this.finishFiles.length).replace(":t",this.list.length)},changeMini:function(){this.$refs.uploader.style.height=this.mini?"auto":this.height+"px"},changeList:function(){var e=this;this.hideDelete&&this.deleteButtons.forEach(function(t){t.style.display=e.list.length?"inline-block":"none"}),this.updateHeadLabel()},checkFinish:function(){this.finishFiles.length===this.list.length&&(this.$emit("finish"),this.dialog&&(this.mini=!0))},updateData:function(e){this.uploader.option("formData",e)},formatSize:function(e){return(0,c.bitSize)(e)},formatState:function(e,t){var i="";switch(t.state){case this.states.ready:i=this.auto?this.gettext("ready"):"";break;case this.states.pause:i=this.gettext("paused");break;case this.states.success:i=this.gettext("successful");break;case this.states.cancel:i=this.gettext("canceled");break;case this.states.uploadError:case this.states.error:i=this.uploader.getFile(t.id).statusText}return i?this.$createElement("span",{class:"uploader-state-"+t.state},i):t.percent>0?(100*t.percent).toFixed(2)+"% "+(0,c.bitSize)(t.speed,!0)+"/s":""},formatOption:function(e,t){var i=this.$createElement,n=this,s=[];switch(t.state){case this.states.ready:case this.states.error:this.auto||s.push(i("i",{class:"gk-icon-times",on:{click:function(){n.removeFile(t.id)}}}));break;case this.states.pause:s.push(i("i",{class:"gk-icon-playarrow",on:{click:function(){var e=n.uploader.getFile(t.id);n.uploader.upload(e),t.state=n.states.progress}}}));break;case this.states.progress:this.chunked&&s.push(i("i",{class:"gk-icon-pause",on:{click:function(){n.uploader.stop(t.id),t.state=n.states.pause}}}));break;case this.states.cancel:case this.states.uploadError:s.push(i("i",{class:"gk-icon-redo",on:{click:function(){var e=n.uploader.getFile(t.id);n.uploader.retry(e),t.state=n.states.progress}}}))}return[this.states.pause,this.states.progress].indexOf(t.state)>-1&&s.push(i("i",{class:"gk-icon-times",on:{click:function(){n.uploader.cancelFile(t.id),Object.assign(t,{state:n.states.cancel,percent:0,speed:0})}}})),s},updateHeadLabel:function(){var e=this;setTimeout(function(){e.headLabel=e.headTpl.replace(":d",e.$refs.table.getCheckedIndex().length)},20)},findList:function(e){return this.list[this.relation[e]]},removeFile:function(e){var t=this.uploader.getFile(e);this.uploader.removeFile(t);var i=this.relation[e];this.list.splice(i,1),delete this.relation[e];for(var n=i;n<this.list.length;n++)this.relation[this.list[n].id]=n},webUpload:function(e){var t=this;if(!1!==this.uploader)return this.uploader.addButton(e),this.uploader;var i=n.default.create(Object.assign({chunked:this.chunked,auto:this.auto,swf:s.default,server:this.server,pick:e,formData:this.formData||{},dnd:void 0===this.dnd?void 0:this.dnd?this.dnd:".gk-uploader",disableGlobalDnd:this.dnd},this.options||{}));return i.on("fileQueued",function(e){var i=!t.beforeCheck||t.beforeCheck(e);t.list.push({id:e.id,name:e.name,path:e.source.source.webkitRelativePath||e.name,state:!0===i?t.states.ready:t.states.error,size:e.size,percent:0,speed:0}),t.relation[e.id]=t.list.length-1,t.hidden=t.mini=!1,!0!==i&&(t.finishFiles.push(e),e.setStatus("invalid",i)),t.$emit("before",e)}),i.on("uploadProgress",function(e,i){var n=t.findList(e.id),s=(new Date).getTime(),a=(s-(n.timestamp||s-1e3))/1e3,r=(i-n.percent)*n.size;Object.assign(n,{state:t.states.progress,percent:i,timestamp:s,speed:r/a}),t.$emit("progress",e,i)}),i.on("uploadBeforeSend",function(e,i){var n=t.findList(e.file.id);i.path=n.path.substring(0,n.path.lastIndexOf(i.name)-1)}),i.on("uploadSuccess",function(e,i){var n=t.findList(e.id),s=!t.checkResponse||t.checkResponse(e,i);!0===s?n.state=t.states.success:(n.state=t.states.uploadError,e.setStatus("error",s)),t.finishFiles.push(e),t.$emit("success",e,i)}),i.on("uploadError",function(e,i){t.findList(e.id).state=t.states.uploadError,e.setStatus("error",i),t.$emit("uploadError",e,i)}),i.on("error",function(e){t.$emit("error",null,e,{F_EXCEED_SIZE:"文件大小超过限制",Q_EXCEED_NUM_LIMIT:"文件上传数超出限制"})}),i.on("uploadComplete",function(e,i){t.$emit("complete",e,i)}),this.uploader=i,i},initDelete:function(e){var t=this;this.deleteButtons=document.querySelectorAll(e),this.deleteButtons.forEach(function(e){t.hideDelete&&(e.style.display="none"),e.onclick=function(){t.$refs.table.getChecked().forEach(function(e){t.removeFile(e.id)})}})},updateEmptyStyle:function(){var e=this.$refs.emptyContent.getBoundingClientRect();this.emptyContentStyle={width:this.emptyContentWidth+"px","margin-left":-this.emptyContentWidth/2+"px","margin-top":-e.height/2+"px"}},upload:function(){this.uploader.upload()}},mounted:function(){var e=this;this.updateEmptyStyle(),void 0!==this.picker?this.webUpload(this.picker):this.buttonList.forEach(function(t){switch(t.type){case"delete":e.initDelete("."+t.class);break;case"file":e.webUpload({id:"."+t.class,multiple:t.multiple});break;case"folder":e.webUpload({id:"."+t.class,multiple:t.multiple});var i=setInterval(function(){var e=document.querySelectorAll("."+t.class+" input[type=file]");e.length>0&&(e.forEach(function(e){e.setAttribute("webkitdirectory","")}),clearInterval(i))},10)}})}}},,,,,,,function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{ref:"uploader",staticClass:"gk-uploader",class:{"gk-uploader-dialog":e.dialog},style:{display:e.hidden?"none":"block"}},[e.dialog?i("div",{staticClass:"gk-uploader-head"},[i("h2",[e._v(e._s(e.dialogTitle()))]),e._v(" "),i("div",[i("i",{class:"gk-icon-window-"+(e.mini?"maximize":"minimize"),on:{click:function(t){e.mini=!e.mini}}}),i("i",{staticClass:"gk-icon-times",on:{click:function(t){e.hidden=!0}}})])]):e._e(),e._v(" "),i("div",{staticClass:"gk-uploader-body"},[i("gk-table",{ref:"table",attrs:{fit:e.fit||e.dialog,data:e.list,"show-header":e.showCheck,"show-checkbox":e.showCheck,height:e.height,"before-select":function(){return!1}},on:{check:e.updateHeadLabel}},[i("gk-table-column",{attrs:{checkbox:e.showCheck,width:30,align:"center"}}),e._v(" "),i("gk-table-column",{attrs:{property:"name",label:e.headLabel},scopedSlots:e._u([{key:"default",fn:function(t){return[i("gk-fileicon",{attrs:{filename:t.name,size:24}}),e._v("\n                    "+e._s(t.name)+"\n                ")]}}])}),e._v(" "),i("gk-table-column",{attrs:{property:"size",width:80,formatter:e.formatSize}}),e._v(" "),i("gk-table-column",{attrs:{property:"percent",width:130,formatter:e.formatState}}),e._v(" "),i("gk-table-column",{attrs:{property:"state",formatter:e.formatOption,align:"center",width:100}}),e._v(" "),i("div",{staticClass:"gk-uploader-empty",attrs:{slot:"empty"},slot:"empty"},[i("div",{ref:"emptyContent",staticClass:"gk-uploader-empty-content",style:e.emptyContentStyle},[e._t("default")],2)])],1)],1)])},s=[];n._withStripped=!0,i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s})},,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(i(93));n.default.install=function(e){e.component(n.default.name,n.default)},t.default=n.default},function(e,t,i){"use strict";i.r(t);var n=i(65),s=i(57);for(var a in s)"default"!==a&&function(e){i.d(t,e,function(){return s[e]})}(a);var r=i(0),o=Object(r.a)(s.default,n.a,n.b,!1,null,null,null);o.options.__file="packages/uploader/src/uploader.vue",t.default=o.exports},function(e,t){e.exports=require("webuploader")},function(e,t){e.exports=require("webuploader/dist/Uploader.swf")}]);