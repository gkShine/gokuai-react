module.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=79)}({31:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"gk-loading",show:function(e){var t=this;if(!this.exist){var n=window.getComputedStyle(e).position;"static"!==n&&""!==n||(this.static=!0,e.style.position="relative"),e.classList.add("gk-loading-scope");var i=document.createElement("div");i.className="gk-loading-wrapper",!1!==this.options.bg&&(i.style.backgroundColor=this.options.bg),e.appendChild(i);var o=document.createElement("div");if(o.className="gk-loading",o.innerHTML='<svg style="styles" class="gk-loading-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>',i.appendChild(o),!1!==this.options.text){o.classList.add("gk-loading-text");var r=document.createElement("p");r.textContent=this.options.text,o.appendChild(r)}this.box=i}this.exist=!0,window.requestAnimationFrame(function(){t.box.style.opacity="1"})},hide:function(e){var t=this;e.classList.remove("gk-loading-scope"),this.box.addEventListener("transitionend",function(){t.box.remove(),t.box=null,t.exist=!1,t.static&&e.style.removeProperty("position")}),this.box.style.opacity="0.01"},bind:function(e,t){var n=t.def;n.box=null,n.static=n.exist=!1,n.options={bg:e.getAttribute("gk-loading-background")||!1,text:e.getAttribute("gk-loading-text")||!1}},update:function(e,t){var n=t.def;if(t.oldValue!==t.value)if(t.value)n.show(e);else{if(!n.exist)return;n.hide(e)}}}},79:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){return e&&e.__esModule?e:{default:e}}(n(31));i.default.install=function(e){e.directive(i.default.name,i.default)},t.default=i.default}});