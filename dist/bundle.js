(()=>{"use strict";var e={373:(e,t,o)=>{o.r(t)},402:(e,t)=>{var o,r,n,i,s;Object.defineProperty(t,"__esModule",{value:!0}),t.manColors=t.womanColors=t.ties=t.dressComplex=t.dressLength=void 0,(s=t.dressLength||(t.dressLength={})).LONG="long",s.MEDIUM="medium",s.SHORT="short",(i=t.dressComplex||(t.dressComplex={}))[i.TWO_PIECES=2]="TWO_PIECES",i[i.THREE_PIECES=3]="THREE_PIECES",(n=t.ties||(t.ties={})).TIE="with a classic tie",n.BOW="with a bow tie",n.NOTHING="without a tie",(r=t.womanColors||(t.womanColors={})).WHITE="white",r.RED="red",r.BLUE="blue",r.YELLOW="yellow",(o=t.manColors||(t.manColors={})).WHITE="white",o.BLACK="black",o.BLUE="blue",o.GRAY="gray"},922:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ManCloth=t.WomanCloth=t.Cloth=void 0;const s=i(o(402));class l{constructor(e,t){this.color=e,this.imageURL=t,this._price=this.setRandom(1500,1e3),this.size=this.setSize([[46,48],2]),this.popolarity=this.setRandom(4,2)}get price(){return this._price}static refColor(e,t){return"w"===t?Object.entries(s.womanColors).filter((t=>t[1]===e)):Object.entries(s.manColors).filter((t=>t[1]===e))[0][0]}setSize(e){const t=e[0],o=e[1],r=[];for(let e=0;e<o;e++){let e=t[this.setRandom(t.length)];r.includes(e)||r.push(e)}return r.sort(((e,t)=>e-t))}setRandom(e,t=0){return Math.floor(Math.random()*e+t)}toString(){}}t.Cloth=l,t.WomanCloth=class extends l{constructor(e,t,o,r){super(e,r),this.sleeves=t,this.length=o,this.size=this.setSize([[38,40,42,44,46,48,50,52,54],5])}toString(){let e=this.sleeves?"with sleeves":"without sleeves";return`${this.color[0].toUpperCase()+this.color.slice(1)} ${this.length} woman wedding dress ${e} \nAvailable sizes: ${this.size},\nprice: ${this.price}$, popolarity: ${this.popolarity}`}},t.ManCloth=class extends l{constructor(e,t,o,r){super(e,r),this.size=this.setSize([[42,44,46,48,50,52,54,56,58],5])}}},299:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t},s=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function l(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const l=i(o(922)),a=i(o(402));o(373),new l.WomanCloth(a.womanColors.RED,!1,a.dressLength.LONG,"assets/woman/w-red-3"),function(){s(this,void 0,void 0,(function*(){const e=yield fetch("/src/database/woman.json"),t=yield e.text(),o=JSON.parse(t);o.forEach((e=>{"long"===e.length?e.length=a.dressLength.LONG:"medium"===e.length?e.length=a.dressLength.MEDIUM:e.length=a.dressLength.SHORT}));for(let e of o)r(e);function r(e){new l.WomanCloth(e.color,e.sleeves,e.length,e.imageURL),console.log(l.Cloth.refColor(e.color,"w"))}}))}()}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,o),i.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(299)})();