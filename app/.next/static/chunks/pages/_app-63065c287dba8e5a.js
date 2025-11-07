(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{4444:function(e,t,n){"use strict";n.d(t,{BH:function(){return E},DV:function(){return z},GJ:function(){return q},L:function(){return d},LL:function(){return L},P0:function(){return w},Pz:function(){return T},Sg:function(){return I},UG:function(){return S},UI:function(){return W},US:function(){return u},Wl:function(){return U},Yr:function(){return R},ZR:function(){return O},aH:function(){return b},b$:function(){return N},cI:function(){return F},dS:function(){return et},eu:function(){return D},g5:function(){return o},gK:function(){return ee},gQ:function(){return Q},h$:function(){return c},hl:function(){return P},hu:function(){return s},m9:function(){return er},ne:function(){return J},p$:function(){return p},pd:function(){return Y},q4:function(){return v},r3:function(){return B},ru:function(){return x},tV:function(){return f},uI:function(){return k},ug:function(){return en},vZ:function(){return function e(t,n){if(t===n)return!0;let r=Object.keys(t),i=Object.keys(n);for(let s of r){if(!i.includes(s))return!1;let r=t[s],o=n[s];if(H(r)&&H(o)){if(!e(r,o))return!1}else if(r!==o)return!1}for(let e of i)if(!r.includes(e))return!1;return!0}},w1:function(){return A},w9:function(){return V},xO:function(){return K},xb:function(){return $},z$:function(){return C},zd:function(){return G}});var r=n(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},s=function(e,t){if(!e)throw o(t)},o=function(e){return Error("Firebase Database ("+i.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},a=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):(64512&i)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},l=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=e[n++],o=e[n++],a=e[n++],l=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(1023&l))}else{let s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},u={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,o=s?e[t+1]:0,a=t+2<e.length,l=a?e[t+2]:0,u=i>>2,h=(3&i)<<4|o>>4,c=(15&o)<<2|l>>6,d=63&l;a||(d=64,s||(c=64)),r.push(n[u],n[h],n[c],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):l(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],s=t<e.length,o=s?n[e.charAt(t)]:0;++t;let a=t<e.length,l=a?n[e.charAt(t)]:64;++t;let u=t<e.length,c=u?n[e.charAt(t)]:64;if(++t,null==i||null==o||null==l||null==c)throw new h;let d=i<<2|o>>4;if(r.push(d),64!==l){let e=o<<4&240|l>>2;if(r.push(e),64!==c){let e=l<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class h extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let c=function(e){let t=a(e);return u.encodeByteArray(t,!0)},d=function(e){return c(e).replace(/\./g,"")},f=function(e){try{return u.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(e){return function e(t,n){if(!(n instanceof Object))return n;switch(n.constructor){case Date:return new Date(n.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return n}for(let r in n)n.hasOwnProperty(r)&&"__proto__"!==r&&(t[r]=e(t[r],n[r]));return t}(void 0,e)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let m=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n.g)return n.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,g=()=>{if(void 0===r||void 0===r.env)return;let e=r.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},y=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&f(e[1]);return t&&JSON.parse(t)},_=()=>{try{return m()||g()||y()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},v=e=>{var t,n;return null===(n=null===(t=_())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},w=e=>{let t=v(e);if(!t)return;let n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},b=()=>{var e;return null===(e=_())||void 0===e?void 0:e.config},T=e=>{var t;return null===(t=_())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[d(JSON.stringify({alg:"none",type:"JWT"})),d(JSON.stringify(s)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function k(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(C())}function S(){var e;let t=null===(e=_())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(e){return!1}}function x(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function N(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function A(){let e=C();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function R(){return!0===i.NODE_CLIENT||!0===i.NODE_ADMIN}function P(){try{return"object"==typeof indexedDB}catch(e){return!1}}function D(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}class O extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,L.prototype.create)}}class L{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(M,(e,t)=>{let r=n[t];return null!=r?String(r):`<${t}?>`}):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new O(r,o,n);return a}}let M=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return JSON.parse(e)}function U(e){return JSON.stringify(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let j=function(e){let t={},n={},r={},i="";try{let s=e.split(".");t=F(f(s[0])||""),n=F(f(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}},V=function(e){let t=j(e),n=t.claims;return!!n&&"object"==typeof n&&n.hasOwnProperty("iat")},q=function(e){let t=j(e).claims;return"object"==typeof t&&!0===t.admin};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function z(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function $(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function W(e,t,n){let r={};for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function H(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function G(e){let t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){let[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function Y(e){let t=e.indexOf("?");if(!t)return"";let n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){let n,r;t||(t=0);let i=this.W_;if("string"==typeof e)for(let n=0;n<16;n++)i[n]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let n=0;n<16;n++)i[n]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){let t=i[e-3]^i[e-8]^i[e-14]^i[e-16];i[e]=(t<<1|t>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],l=this.chain_[3],u=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(n=l^o&(a^l),r=1518500249):(n=o^a^l,r=1859775393):e<60?(n=o&a|l&(o|a),r=2400959708):(n=o^a^l,r=3395469782);let t=(s<<5|s>>>27)+n+u+r+i[e]&4294967295;u=l,l=a,a=(o<<30|o>>>2)&4294967295,o=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);let n=t-this.blockSize,r=0,i=this.buf_,s=this.inbuf_;for(;r<t;){if(0===s)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[s]=e.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}else for(;r<t;)if(i[s]=e[r],++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){let e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}}function J(e,t){let n=new X(e,t);return n.subscribe.bind(n)}class X{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw Error("Missing Observer.");void 0===(r=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:n}:e).next&&(r.next=Z),void 0===r.error&&(r.error=Z),void 0===r.complete&&(r.complete=Z);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Z(){}function ee(e,t){return`${e} failed: ${t} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){let t=i-55296;s(++r<e.length,"Surrogate pair missing trail surrogate.");let n=e.charCodeAt(r)-56320;i=65536+(t<<10)+n}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},en=function(e){let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(e){return e&&e._delegate?e._delegate:e}},3454:function(e,t,n){"use strict";var r,i;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(i=n.g.process)?void 0:i.env)?n.g.process:n(7663)},3837:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(4973)}])},1516:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3740:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(6495).Z,i=n(2648).Z,s=n(1598).Z,o=n(7273).Z,a=s(n(7294)),l=i(n(2636)),u=n(7757),h=n(3735),c=n(3341);n(4210);var d=i(n(7746));let f={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function p(e){return void 0!==e.default}function m(e){return"number"==typeof e||void 0===e?e:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function g(e,t,n,i,s,o,a){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let l="decode"in e?e.decode():Promise.resolve();l.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("blur"===n&&o(!0),null==i?void 0:i.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,s=!1;i.current(r({},t,{nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>s,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{s=!0,t.stopPropagation()}}))}(null==s?void 0:s.current)&&s.current(e)}})}let y=a.forwardRef((e,t)=>{var{imgAttributes:n,heightInt:i,widthInt:s,qualityInt:l,className:u,imgStyle:h,blurStyle:c,isLazy:d,fill:f,placeholder:p,loading:m,srcString:y,config:_,unoptimized:v,loader:w,onLoadRef:b,onLoadingCompleteRef:T,setBlurComplete:E,setShowAltText:I,onLoad:C,onError:k}=e,S=o(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadRef","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return m=d?"lazy":m,a.default.createElement(a.default.Fragment,null,a.default.createElement("img",Object.assign({},S,{loading:m,width:s,height:i,decoding:"async","data-nimg":f?"fill":"1",className:u,style:r({},h,c)},n,{ref:a.useCallback(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(k&&(e.src=e.src),e.complete&&g(e,y,p,b,T,E,v))},[y,p,b,T,E,k,v,t]),onLoad:e=>{let t=e.currentTarget;g(t,y,p,b,T,E,v)},onError:e=>{I(!0),"blur"===p&&E(!0),k&&k(e)}})))}),_=a.forwardRef((e,t)=>{let n,i;var s,{src:g,sizes:_,unoptimized:v=!1,priority:w=!1,loading:b,className:T,quality:E,width:I,height:C,fill:k,style:S,onLoad:x,onLoadingComplete:N,placeholder:A="empty",blurDataURL:R,layout:P,objectFit:D,objectPosition:O,lazyBoundary:L,lazyRoot:M}=e,F=o(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoad","onLoadingComplete","placeholder","blurDataURL","layout","objectFit","objectPosition","lazyBoundary","lazyRoot"]);let U=a.useContext(c.ImageConfigContext),j=a.useMemo(()=>{let e=f||U||h.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),n=e.deviceSizes.sort((e,t)=>e-t);return r({},e,{allSizes:t,deviceSizes:n})},[U]),V=F,q=V.loader||d.default;delete V.loader;let B="__next_img_default"in q;if(B){if("custom"===j.loader)throw Error('Image with src "'.concat(g,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}else{let e=q;q=t=>{let{config:n}=t,r=o(t,["config"]);return e(r)}}if(P){"fill"===P&&(k=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[P];e&&(S=r({},S,e));let t={responsive:"100vw",fill:"100vw"}[P];t&&!_&&(_=t)}let z="",$=m(I),W=m(C);if("object"==typeof(s=g)&&(p(s)||void 0!==s.src)){let e=p(g)?g.default:g;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(e)));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(e)));if(n=e.blurWidth,i=e.blurHeight,R=R||e.blurDataURL,z=e.src,!k){if($||W){if($&&!W){let t=$/e.width;W=Math.round(e.height*t)}else if(!$&&W){let t=W/e.height;$=Math.round(e.width*t)}}else $=e.width,W=e.height}}let H=!w&&("lazy"===b||void 0===b);((g="string"==typeof g?g:z).startsWith("data:")||g.startsWith("blob:"))&&(v=!0,H=!1),j.unoptimized&&(v=!0),B&&g.endsWith(".svg")&&!j.dangerouslyAllowSVG&&(v=!0);let[K,G]=a.useState(!1),[Y,Q]=a.useState(!1),J=m(E),X=Object.assign(k?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:D,objectPosition:O}:{},Y?{}:{color:"transparent"},S),Z="blur"===A&&R&&!K?{backgroundSize:X.objectFit||"cover",backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(u.getImageBlurSvg({widthInt:$,heightInt:W,blurWidth:n,blurHeight:i,blurDataURL:R,objectFit:X.objectFit}),'")')}:{},ee=function(e){let{config:t,src:n,unoptimized:r,width:i,quality:s,sizes:o,loader:a}=e;if(r)return{src:n,srcSet:void 0,sizes:void 0};let{widths:l,kind:u}=function(e,t,n){let{deviceSizes:r,allSizes:i}=e;if(n){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let r;r=e.exec(n);r)t.push(parseInt(r[2]));if(t.length){let e=.01*Math.min(...t);return{widths:i.filter(t=>t>=r[0]*e),kind:"w"}}return{widths:i,kind:"w"}}if("number"!=typeof t)return{widths:r,kind:"w"};let s=[...new Set([t,2*t].map(e=>i.find(t=>t>=e)||i[i.length-1]))];return{widths:s,kind:"x"}}(t,i,o),h=l.length-1;return{sizes:o||"w"!==u?o:"100vw",srcSet:l.map((e,r)=>"".concat(a({config:t,src:n,quality:s,width:e})," ").concat("w"===u?e:r+1).concat(u)).join(", "),src:a({config:t,src:n,quality:s,width:l[h]})}}({config:j,src:g,unoptimized:v,width:$,quality:J,sizes:_,loader:q}),et=g,en={imageSrcSet:ee.srcSet,imageSizes:ee.sizes,crossOrigin:V.crossOrigin},er=a.useRef(x);a.useEffect(()=>{er.current=x},[x]);let ei=a.useRef(N);a.useEffect(()=>{ei.current=N},[N]);let es=r({isLazy:H,imgAttributes:ee,heightInt:W,widthInt:$,qualityInt:J,className:T,imgStyle:X,blurStyle:Z,loading:b,config:j,fill:k,unoptimized:v,placeholder:A,loader:q,srcString:et,onLoadRef:er,onLoadingCompleteRef:ei,setBlurComplete:G,setShowAltText:Q},V);return a.default.createElement(a.default.Fragment,null,a.default.createElement(y,Object.assign({},es,{ref:t})),w?a.default.createElement(l.default,null,a.default.createElement("link",Object.assign({key:"__nimg-"+ee.src+ee.srcSet+ee.sizes,rel:"preload",as:"image",href:ee.srcSet?void 0:ee.src},en))):null)});t.default=_,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,i=n(7273).Z,s=r(n(7294)),o=n(4532),a=n(3353),l=n(1410),u=n(9064),h=n(370),c=n(9955),d=n(4224),f=n(508),p=n(1516),m=n(4266);let g=new Set;function y(e,t,n,r,i){if(i||a.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let i=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,s=t+"%"+n+"%"+i;if(g.has(s))return;g.add(s)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function _(e){return"string"==typeof e?e:l.formatUrl(e)}let v=s.default.forwardRef(function(e,t){let n,r;let{href:l,as:g,children:v,prefetch:w,passHref:b,replace:T,shallow:E,scroll:I,locale:C,onClick:k,onMouseEnter:S,onTouchStart:x,legacyBehavior:N=!1}=e,A=i(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=v,N&&("string"==typeof n||"number"==typeof n)&&(n=s.default.createElement("a",null,n));let R=!1!==w,P=s.default.useContext(c.RouterContext),D=s.default.useContext(d.AppRouterContext),O=null!=P?P:D,L=!P,{href:M,as:F}=s.default.useMemo(()=>{if(!P){let e=_(l);return{href:e,as:g?_(g):e}}let[e,t]=o.resolveHref(P,l,!0);return{href:e,as:g?o.resolveHref(P,g):t||e}},[P,l,g]),U=s.default.useRef(M),j=s.default.useRef(F);N&&(r=s.default.Children.only(n));let V=N?r&&"object"==typeof r&&r.ref:t,[q,B,z]=f.useIntersection({rootMargin:"200px"}),$=s.default.useCallback(e=>{(j.current!==F||U.current!==M)&&(z(),j.current=F,U.current=M),q(e),V&&("function"==typeof V?V(e):"object"==typeof V&&(V.current=e))},[F,V,M,z,q]);s.default.useEffect(()=>{O&&B&&R&&y(O,M,F,{locale:C},L)},[F,M,B,C,R,null==P?void 0:P.locale,O,L]);let W={ref:$,onClick(e){N||"function"!=typeof k||k(e),N&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),O&&!e.defaultPrevented&&function(e,t,n,r,i,o,l,u,h,c){let{nodeName:d}=e.currentTarget,f="A"===d.toUpperCase();if(f&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!h&&!a.isLocalURL(n)))return;e.preventDefault();let p=()=>{"beforePopState"in t?t[i?"replace":"push"](n,r,{shallow:o,locale:u,scroll:l}):t[i?"replace":"push"](r||n,{forceOptimisticNavigation:!c})};h?s.default.startTransition(p):p()}(e,O,M,F,T,E,I,C,L,R)},onMouseEnter(e){N||"function"!=typeof S||S(e),N&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),O&&(R||!L)&&y(O,M,F,{locale:C,priority:!0,bypassPrefetchedCheck:!0},L)},onTouchStart(e){N||"function"!=typeof x||x(e),N&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),O&&(R||!L)&&y(O,M,F,{locale:C,priority:!0,bypassPrefetchedCheck:!0},L)}};if(u.isAbsoluteUrl(F))W.href=F;else if(!N||b||"a"===r.type&&!("href"in r.props)){let e=void 0!==C?C:null==P?void 0:P.locale,t=(null==P?void 0:P.isLocaleDomain)&&p.getDomainLocale(F,e,null==P?void 0:P.locales,null==P?void 0:P.domainLocales);W.href=t||m.addBasePath(h.addLocale(F,e,null==P?void 0:P.defaultLocale))}return N?s.default.cloneElement(r,W):s.default.createElement("a",Object.assign({},A,W),n)});t.default=v,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:l}=e,u=l||!s,[h,c]=r.useState(!1),d=r.useRef(null),f=r.useCallback(e=>{d.current=e},[]);r.useEffect(()=>{if(s){if(u||h)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:i,elements:s}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=a.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=o.get(r)))return t;let i=new Map,s=new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:s,elements:i},a.push(n),o.set(n,t),t}(n);return s.set(e,t),i.observe(e),function(){if(s.delete(e),i.unobserve(e),0===s.size){i.disconnect(),o.delete(r);let e=a.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&c(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!h){let e=i.requestIdleCallback(()=>c(!0));return()=>i.cancelIdleCallback(e)}},[u,n,t,h,d.current]);let p=r.useCallback(()=>{c(!1)},[]);return[f,h,p]};var r=n(7294),i=n(29);let s="function"==typeof IntersectionObserver,o=new Map,a=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7757:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){let{widthInt:t,heightInt:n,blurWidth:r,blurHeight:i,blurDataURL:s,objectFit:o}=e,a=r||t,l=i||n,u=s.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return a&&l?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(a," ").concat(l,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(r&&i?"1":"20","'/%3E").concat(u,"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(s,"'/%3E%3C/svg%3E"):"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='".concat("contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none","' x='0' y='0' height='100%25' width='100%25' href='").concat(s,"'/%3E%3C/svg%3E")}},7746:function(e,t){"use strict";function n(e){let{config:t,src:n,width:r,quality:i}=e;return"".concat(t.path,"?url=").concat(encodeURIComponent(n),"&w=").concat(r,"&q=").concat(i||75)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n.__next_img_default=!0,t.default=n},5352:function(e,t,n){"use strict";var r=n(5893),i=n(7294),s=n(5675),o=n.n(s);t.Z=i.memo(function(e){var t;let{src:n,email:s="",size:a=96,editable:l=!1,onFileChange:u=()=>{},className:h="",priority:c=!1}=e,[d,f]=(0,i.useState)(!1),[p,m]=(0,i.useState)(!1),g="string"==typeof n&&n.startsWith("blob:"),y=(0,r.jsx)("div",{className:"bg-primary flex items-center justify-center rounded-full ".concat(h),style:{width:a,height:a},children:(0,r.jsx)("span",{className:"text-primary-darker dark:text-neutral-light font-semibold",style:{fontSize:a/2.2},children:(null===(t=s[0])||void 0===t?void 0:t.toUpperCase())||"U"})});return(0,r.jsxs)("div",{className:"relative rounded-full overflow-hidden group transition-all ".concat(h),style:{width:a,height:a},onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),children:[!d&&n?(0,r.jsx)(o(),{src:n,alt:"Avatar",width:a,height:a,className:"object-cover rounded-full",onError:()=>f(!0),unoptimized:!(n&&!g),priority:c}):y,l&&(0,r.jsxs)("div",{className:"absolute inset-0 bg-neutral-dark bg-opacity-50 flex flex-col items-center justify-center transition-opacity ".concat(p?"opacity-100":"opacity-0"),children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-neutral-light mb-1",fill:"currentColor",viewBox:"0 0 20 20",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"})}),(0,r.jsx)("span",{className:"text-neutral-light text-sm font-medium",children:"Change Photo"}),(0,r.jsx)("input",{type:"file",onChange:u,className:"absolute inset-0 opacity-0 cursor-pointer",accept:"image/*",name:"avatar"})]})]})})},8285:function(e,t,n){"use strict";var r=n(5893),i=n(7294);t.Z=i.memo(function(e){let{children:t,className:n="",containerClass:i=""}=e;return(0,r.jsx)("div",{className:"min-h-screen bg-neutral-light dark:bg-neutral-dark pt-[80px] ".concat(n),children:(0,r.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ".concat(i),children:t})})})},2603:function(e,t,n){"use strict";var r=n(5893),i=n(7294),s=n(5697),o=n.n(s);let a=e=>{let{variant:t="filled",size:n="md",disabled:i=!1,onClick:s,children:o,className:a=""}=e,l=["font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-darker dark:focus:ring-primary",{filled:"bg-primary-darker hover:bg-primary-darkest text-white dark:bg-primary-darker dark:hover:bg-primary-darkest dark:text-slate-800",outline:"border border-primary-darker text-primary-darker hover:bg-primary-darker hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-slate-800"}[t],{sm:"px-3 py-3 text-sm",md:"px-4 py-3 text-base",lg:"px-6 py-3 text-lg"}[n],i?"opacity-50 cursor-not-allowed":"",a].filter(Boolean).join(" ");return(0,r.jsx)("button",{type:"button",className:l,onClick:s,disabled:i,children:o})};a.propTypes={variant:o().oneOf(["filled","outline"]),size:o().oneOf(["sm","md","lg"]),disabled:o().bool,onClick:o().func,children:o().node.isRequired,className:o().string},t.Z=i.memo(a)},1701:function(e,t,n){"use strict";n.d(t,{C4:function(){return a},X9:function(){return o}});var r=n(5893),i=n(7294);let s=(0,i.createContext)(),o=e=>{let{initialState:t,reducer:n,children:o}=e;return(0,r.jsx)(s.Provider,{value:(0,i.useReducer)(n,t),children:o})},a=()=>(0,i.useContext)(s)},4973:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return R}});var r=n(5893),i=n(7294),s=n(2947);n(1399);var o=n(9008),a=n.n(o),l=n(1664),u=n.n(l),h=n(6893),c=i.memo(function(e){let{className:t="text-accent"}=e;return(0,r.jsxs)("svg",{width:"240",height:"60",viewBox:"0 0 240 80",fill:"none",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet",className:t,children:[(0,r.jsx)("path",{d:"M30 40C30 25 50 20 60 30C70 40 65 55 50 60C35 65 30 55 30 40Z",stroke:"currentColor",strokeWidth:"2",fill:"none"}),(0,r.jsx)("path",{d:"M45 35L50 30L55 35",stroke:"currentColor",strokeWidth:"1.5",fill:"none"}),(0,r.jsx)("path",{d:"M65 45L70 40L75 45",stroke:"currentColor",strokeWidth:"1.5",fill:"none"}),(0,r.jsx)("path",{d:"M50 55L55 50L60 55",stroke:"currentColor",strokeWidth:"1.5",fill:"none"}),(0,r.jsx)("text",{x:"120",y:"40",fontFamily:"'Playfair Display', serif",fontSize:"24",fontWeight:"700",fill:"currentColor",textAnchor:"middle",children:"Bridal"}),(0,r.jsx)("text",{x:"120",y:"60",fontFamily:"'Montserrat', sans-serif",fontSize:"24",fontWeight:"600",fill:"currentColor",textAnchor:"middle",children:"Flock"}),(0,r.jsxs)("g",{className:"text-neutral-medium dark:text-neutral-light",children:[" ",(0,r.jsx)("text",{x:"120",y:"75",fontFamily:"'Montserrat', sans-serif",fontSize:"10",fill:"currentColor",letterSpacing:"1",textAnchor:"middle",children:"Where wedding pros take flight"})]})]})}),d=n(1701),f=n(4698);h.uOf,h.Dp0,h.qOw,h.JID,h.Ccr;var p=i.memo(function(){let[{isDarkMode:e}]=(0,d.C4)();return(0,r.jsx)("footer",{className:"w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-neutral-medium/30 bg-neutral-light dark:bg-neutral-dark dark:border-neutral-medium",children:(0,r.jsxs)("div",{className:"max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between",children:[(0,r.jsx)("div",{className:"h-10 flex items-center mb-4 md:mb-0",children:(0,r.jsx)(c,{className:e?"text-neutral-light":"text-primary-darker"})}),(0,r.jsxs)("div",{className:"flex flex-col md:flex-row items-center text-sm",children:[(0,r.jsx)(u(),{href:"/privacy-policy",legacyBehavior:!0,children:(0,r.jsx)("a",{className:"text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline",children:"Privacy Policy"})}),(0,r.jsx)("span",{className:"text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline",children:"\xb7"}),(0,r.jsx)(u(),{href:"/terms-of-service",legacyBehavior:!0,children:(0,r.jsx)("a",{className:"text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline mt-1 md:mt-0 md:ml-2",children:"Terms of Service"})}),(0,r.jsx)("span",{className:"text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline",children:"\xb7"}),(0,r.jsxs)("p",{className:"text-neutral-medium dark:text-neutral-light mt-1 md:mt-0 md:ml-2",children:["\xa9 ",new Date().getFullYear()," ",f.r.REACT_APP_NAME,". All rights reserved."]})]})]})})}),m=n(5641),g=n(9822),y=n(9451),_=n(751),v=n(5352);function w(e){let{buttonId:t}=e,[{isDarkMode:n},s]=(0,d.C4)();(0,i.useEffect)(()=>{let e;let t=localStorage.getItem("darkMode");e=t?"true"===t:window.matchMedia("(prefers-color-scheme: dark)").matches,s({type:g.J.SET_DARK_MODE,payload:e}),document.documentElement.classList.toggle("dark",e)},[s]);let o=()=>{let e=!n;s({type:g.J.TOGGLE_DARK_MODE}),localStorage.setItem("darkMode",e.toString()),document.documentElement.classList.toggle("dark",e)};return(0,r.jsx)("button",{id:t,onClick:o,"aria-label":n?"Switch to light mode":"Switch to dark mode",className:"p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent",children:n?"\uD83C\uDF1E":"\uD83C\uDF19"})}var b=i.memo(function(e){let{userId:t,isLoading:n,initialAuthChecked:s}=e,{navigate:o,router:a}=(0,m.H)(),[l,f]=(0,i.useState)(!1),[{user:p,isSeller:b,isDarkMode:T},E]=(0,d.C4)(),[I,C]=(0,i.useState)(!1),[k,S]=(0,i.useState)(!1),[x,N]=(0,i.useState)(!1),A=(0,i.useMemo)(()=>p&&b?"/seller":"/buyer",[p,b]),R=(0,i.useCallback)(()=>{E({type:g.J.TOGGLE_LOGIN_MODAL,showLoginModal:!0})},[E]),P=(0,i.useCallback)(()=>{o(b?"/seller/orders":"/buyer/orders"),S(!1)},[b,o]),D=(0,i.useCallback)(()=>{E({type:g.J.SWITCH_MODE}),o(b?"/buyer":"/seller"),S(!1)},[E,b,o]),O=(0,i.useCallback)(()=>{(0,y.w7)(_.I8),E({type:g.J.SET_USER,user:void 0}),C(!1),S(!1),N(!1),o("/")},[E,o]),L=(0,i.useCallback)(()=>{C(!1),S(!1),N(!1),o("/profile")},[o]),M=(0,i.useCallback)(()=>{C(e=>!e)},[]),F=(0,i.useCallback)(()=>{N(e=>!e)},[]);(0,i.useEffect)(()=>{if("/"===a.pathname){let e=()=>f(window.pageYOffset>0);return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}f(!0)},[a.pathname]);let U="text-primary-darker hover:text-primary dark:text-primary dark:hover:text-primary-darker font-medium",j="bg-primary hover:bg-primary-darker text-white dark:text-white px-4 py-2 rounded-lg dark:bg-primary-darker dark:hover:bg-primary";return(0,r.jsxs)("nav",{className:"w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 top-0 z-30 transition-all duration-300 ".concat(l||p?"fixed bg-neutral-light border-b border-neutral-medium/30 shadow-sm dark:bg-neutral-dark dark:border-neutral-medium":"absolute bg-neutral-light/90 backdrop-blur-sm border-transparent dark:bg-neutral-dark/90 dark:border-transparent"),children:[(0,r.jsxs)("div",{className:"max-w-screen-xl mx-auto flex justify-between items-center w-full",children:[(0,r.jsx)("div",{className:"shrink-0",children:(0,r.jsx)(u(),{href:"/","aria-label":"Home",children:(0,r.jsx)(c,{className:T?"text-neutral-light":l||p?"text-primary-darker":"text-accent"})})}),(0,r.jsx)("button",{className:"lg:hidden ".concat(U),onClick:()=>S(!k),"aria-label":k?"Close menu":"Open menu",children:k?(0,r.jsx)(h.q5L,{size:24}):(0,r.jsx)(h.cur,{size:24})}),(0,r.jsx)("div",{className:"hidden lg:flex items-center gap-8",children:n?(0,r.jsx)("span",{className:"text-sm ".concat(U),children:"Authenticating..."}):!s||n||p?(0,r.jsxs)("ul",{className:"flex gap-8 items-center",children:[b&&(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:()=>o("/seller/services/create"),className:U,children:"Create Service"})}),p&&(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:()=>o(A),className:U,children:"Dashboard"})}),(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:P,className:U,children:"Orders"})}),p&&(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:()=>o("/messages"),className:U,children:"Messages"})}),(0,r.jsx)("li",{className:"flex items-center",children:(0,r.jsx)(w,{})}),(0,r.jsxs)("li",{className:"relative",children:[(0,r.jsx)("button",{onClick:M,children:(0,r.jsx)(v.Z,{src:p?p.avatar:"",email:p?p.email:"",size:40,borderColor:"border-accent/50 dark:border-accent"})}),I&&(0,r.jsxs)("ul",{className:"absolute right-0 mt-2 bg-neutral-light border border-neutral-medium/30 rounded shadow text-sm w-40 z-50 dark:bg-neutral-dark dark:border-neutral-medium",children:[(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:L,className:"w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",children:"Profile"})}),(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:D,className:"w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",children:b?"Switch To Buyer":"Switch To Seller"})}),(0,r.jsx)("li",{children:(0,r.jsx)("button",{onClick:O,className:"w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",children:"Logout"})})]})]})]}):(0,r.jsx)("button",{onClick:R,className:j,children:"Sign in"})})]}),k&&(0,r.jsx)("div",{className:"lg:hidden absolute top-full left-0 right-0 bg-neutral-light shadow border-t border-neutral-medium/30 z-40 dark:bg-neutral-dark dark:border-neutral-medium",children:(0,r.jsx)("div",{className:"px-4 py-4 space-y-3",children:n?(0,r.jsx)("span",{className:"block text-center text-sm ".concat(U," py-2"),children:"Authenticating..."}):!s||n||p?(0,r.jsxs)(r.Fragment,{children:[b&&(0,r.jsx)("button",{onClick:()=>{o("/seller/services/create"),S(!1)},className:"w-full text-left py-2 ".concat(U),children:"Create Service"}),p&&(0,r.jsx)("button",{onClick:()=>{o(A),S(!1)},className:"w-full text-left py-2 ".concat(U),children:"Dashboard"}),(0,r.jsx)("button",{onClick:P,className:"w-full text-left py-2 ".concat(U),children:"Orders"}),p&&(0,r.jsx)("button",{onClick:()=>{o("/messages"),S(!1)},className:"w-full text-left py-2 ".concat(U),children:"Messages"}),(0,r.jsxs)("div",{className:"flex justify-between items-center w-full py-2 border-t border-neutral-medium/30 dark:border-neutral-medium",children:[(0,r.jsx)("span",{className:"".concat(U," text-sm"),children:T?"Light Mode":"Dark Mode"}),(0,r.jsx)(w,{})]}),(0,r.jsxs)("div",{className:"border-t border-neutral-medium/30 pt-4 dark:border-neutral-medium",children:[(0,r.jsxs)("button",{onClick:F,className:"w-full flex items-center gap-3 text-left",children:[(0,r.jsx)(v.Z,{src:p?p.avatar:"",email:p?p.email:"",size:40,borderColor:"border-accent/50 dark:border-accent"}),(0,r.jsx)("span",{className:"font-medium text-neutral-dark dark:text-neutral-light",children:"My Account"})]}),x&&(0,r.jsxs)("div",{className:"mt-3 space-y-2 pl-12 text-sm",children:[(0,r.jsx)("button",{onClick:L,className:"block w-full text-left py-2 hover:text-primary dark:hover:text-primary",children:"Profile"}),(0,r.jsx)("button",{onClick:D,className:"block w-full text-left py-2 hover:text-primary dark:hover:text-primary",children:b?"Switch To Buyer":"Switch To Seller"}),(0,r.jsx)("button",{onClick:O,className:"block w-full text-left py-2 hover:text-primary dark:hover:text-primary",children:"Logout"})]})]})]}):(0,r.jsx)("button",{onClick:R,className:"w-full ".concat(j),children:"Sign in"})})})]})}),T=n(8285);let E={user:void 0,showLoginModal:!1,isSeller:!1,serviceData:void 0,hasOrdered:!1,reloadReviews:!1,isDarkMode:!1},I=(e,t)=>{switch(t.type){case g.J.SET_USER:return{...e,user:t.user};case g.J.CLEAR_USER:return{...e,user:void 0};case g.J.TOGGLE_LOGIN_MODAL:return{...e,showLoginModal:t.showLoginModal};case g.J.CLOSE_AUTH_MODAL:return{...e,showLoginModal:!1};case g.J.SWITCH_MODE:return{...e,isSeller:!e.isSeller};case g.J.SET_SERVICE_DATA:return{...e,serviceData:t.serviceData};case g.J.HAS_USER_ORDERED_SERVICE:return{...e,hasOrdered:t.hasOrdered};case g.J.ADD_REVIEW:return{...e,serviceData:{...e.serviceData,reviews:[...e.serviceData.reviews,t.newReview]}};case g.J.TOGGLE_DARK_MODE:return{...e,isDarkMode:!e.isDarkMode};case g.J.SET_DARK_MODE:return{...e,isDarkMode:t.payload};default:return e}};var C=n(9611);n(3057);var k=n(8357);function S(e){return(0,k.w_)({tag:"svg",attr:{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#FFC107",d:"M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r\n	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r\n	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"}},{tag:"path",attr:{fill:"#FF3D00",d:"M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r\n	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"}},{tag:"path",attr:{fill:"#4CAF50",d:"M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r\n	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"}},{tag:"path",attr:{fill:"#1976D2",d:"M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r\n	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"}}]})(e)}var x=n(1163),N=n(2603),A=function(){let[{user:e},t]=(0,d.C4)(),n=(0,x.useRouter)(),[o,a]=(0,i.useState)(""),[l,u]=(0,i.useState)(!1),[h,c]=(0,i.useState)(!1),p=(0,i.useCallback)(()=>{t({type:g.J.TOGGLE_LOGIN_MODAL,showLoginModal:!1})},[t]);(0,i.useEffect)(()=>(document.documentElement.style.overflowY="hidden",()=>{document.documentElement.style.overflowY="auto"}),[]),(0,i.useEffect)(()=>{c(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))},[o]);let m=async()=>{if(!l){u(!0);try{let e=new y.hJ,r=await (0,y.rh)(_.I8,e),i=r.user;if(i){let e={uid:i.uid,email:i.email,displayName:i.displayName};t({type:g.J.SET_USER,user:e}),s.Am.success("Login Successful!"),p();let r=sessionStorage.getItem("redirectUrl");r?(n.push(r),sessionStorage.removeItem("redirectUrl")):n.push("/")}else throw Error("No user data received from Google sign-in")}catch(e){console.error("Google login failed:",e),s.Am.error(e.message||"Google Sign-in failed.")}finally{u(!1)}}},v=async()=>{if(!l&&h){u(!0);try{let e={url:window.location.origin,handleCodeInApp:!0};await (0,y.oo)(_.I8,o,e),window.localStorage.setItem("emailForSignIn",o),s.Am.success("Magic link sent! Check your inbox."),a("")}catch(e){console.error("Email-link login failed:",e),s.Am.error(e.message||"Failed to send magic link.")}finally{u(!1)}}};return(0,r.jsxs)("div",{className:"fixed inset-0 z-[100]",onClick:p,children:[(0,r.jsx)("div",{className:"absolute inset-0 backdrop-blur-md bg-neutral-dark/30"}),(0,r.jsx)("div",{className:"relative z-[101] flex h-full w-full items-center justify-center p-4",onClick:e=>e.stopPropagation(),children:(0,r.jsxs)("div",{className:"w-full max-w-md rounded-lg bg-neutral-light dark:bg-neutral-dark p-6 shadow-lg",children:[(0,r.jsxs)("h3",{className:"mb-6 text-center text-2xl font-semibold text-neutral-dark dark:text-neutral-light",children:["Sign in to ",f.r.REACT_APP_NAME]}),(0,r.jsxs)("button",{onClick:m,disabled:l,className:"mb-4 flex w-full items-center justify-center gap-2 rounded-md border py-3 transition text-neutral-dark dark:text-neutral-light ".concat(l?"opacity-50 cursor-not-allowed border-neutral-medium/30 dark:border-neutral-medium":"border-neutral-medium dark:border-neutral-medium hover:bg-secondary dark:hover:bg-neutral-medium"),children:[(0,r.jsx)(S,{className:"text-2xl"}),l?"Processing...":"Continue with Google"]}),(0,r.jsxs)("div",{className:"relative my-4 text-center text-sm text-neutral-medium dark:text-neutral-light",children:[(0,r.jsx)("span",{className:"bg-neutral-light dark:bg-neutral-dark px-2 relative z-[1]",children:"OR"}),(0,r.jsx)("div",{className:"absolute inset-0 top-[50%] h-[1px] bg-neutral-medium dark:bg-neutral-medium"})]}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("input",{type:"email",placeholder:"Enter your email",value:o,onChange:e=>a(e.target.value.trim()),autoFocus:!0,className:"w-full rounded-md border p-3 focus:outline-none bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium ".concat(o&&!h?"border-error focus:ring-error":"border-neutral-medium dark:border-neutral-medium focus:ring-success"," focus:ring-2")}),o&&!h&&(0,r.jsx)("p",{className:"mt-1 text-sm text-error",children:"Please enter a valid email"})]}),(0,r.jsx)(N.Z,{variant:"filled",size:"lg",onClick:v,disabled:l||!h,className:"w-full transition text-white dark:text-white ".concat(!(l||!h)&&"bg-primary hover:bg-violet-700"," ").concat((l||!h)&&"bg-primary/50"),children:l?"Sending...":"Send Magic Link"})]})})]})};function R(e){let{Component:t,pageProps:n}=e;return(0,r.jsx)(d.X9,{initialState:E,reducer:I,children:(0,r.jsx)(P,{Component:t,pageProps:n})})}function P(e){let{Component:t,pageProps:n}=e,[{showLoginModal:i}]=(0,d.C4)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(D,{children:(e,i,s)=>(0,r.jsx)(L,{userId:e,isLoading:i,initialAuthChecked:s,children:(0,r.jsx)(t,{...n})})}),i&&(0,r.jsx)(A,{})," "]})}function D(e){let{children:t}=e,{router:n,navigateToRedirect:r,navigateWithRedirect:o}=(0,m.H)(),[,a]=(0,d.C4)(),[l,u]=(0,i.useState)(null),[h,c]=(0,i.useState)(!0),[f,p]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{(0,y.Fb)(_.I8,y.a$).catch(e=>{console.error("Could not set persistence:",e),s.Am.error("Failed to initialize authentication")})},[]),(0,i.useEffect)(()=>{let e=(0,y.Aj)(_.I8,async e=>{try{if(e){u(e.uid);try{let t=await (0,C.et)(e.uid),r={...e,...t};if(a({type:g.J.SET_USER,user:r}),!t.userName){n.push("/profile?new=true");return}}catch(t){console.error("Failed to fetch user profile data:",t),a({type:g.J.SET_USER,user:e})}r()}else a({type:g.J.CLEAR_USER}),u(null)}catch(e){console.error("Auth state error:",e),s.Am.error("Authentication error")}finally{c(!1),p(!0)}});return()=>e()},[a,n,r]),(0,i.useEffect)(()=>{let e=async()=>{try{if((0,y.JB)(_.I8,window.location.href)){c(!0);let e=window.localStorage.getItem("emailForSignIn");if(!e){s.Am.error("Missing email. Please try again.");return}await (0,y.P6)(_.I8,e,window.location.href),window.localStorage.removeItem("emailForSignIn"),s.Am.success("Login Successful!"),a({type:g.J.TOGGLE_LOGIN_MODAL,showLoginModal:!1}),r("/")}}catch(e){console.error("Email sign-in error:",e),s.Am.error("Sign-in failed. Please try again.")}finally{c(!1)}};e()},[a,r]),t(l,h,f)}let O=["/terms-of-service","/privacy-policy"];function L(e){let{children:t,userId:n,isLoading:o,initialAuthChecked:l}=e,{navigate:u,navigateWithRedirect:h,router:c}=(0,m.H)(),[{user:y},_]=(0,d.C4)();return(0,i.useEffect)(()=>{let e=!O.includes(c.pathname)&&"/"!==c.pathname;if(l&&!o&&y&&!y.userName&&"/profile"!==c.pathname){u("/profile?new=true");return}l&&!o&&!n&&e&&(h("/"),_({type:g.J.TOGGLE_LOGIN_MODAL,showLoginModal:!0}))},[l,o,n,y,_,u,h,c.pathname]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("link",{rel:"shortcut icon",href:"/favicon.ico"}),(0,r.jsx)("title",{children:f.r.REACT_APP_NAME})]}),(0,r.jsxs)("div",{className:"relative flex flex-col min-h-screen",children:[(0,r.jsx)(b,{userId:n,isLoading:o,initialAuthChecked:l}),(0,r.jsx)("main",{className:"flex-1",children:(0,r.jsx)(T.Z,{children:t})}),(0,r.jsx)(p,{})]}),(0,r.jsx)(s.Ix,{position:"top-center",autoClose:3e3,hideProgressBar:!1,toastClassName:"text-sm"})]})}},1399:function(){},3057:function(){},7663:function(e){!function(){var t={229:function(e){var t,n,r,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var l=[],u=!1,h=-1;function c(){u&&r&&(u=!1,r.length?l=r.concat(l):h=-1,l.length&&d())}function d(){if(!u){var e=a(c);u=!0;for(var t=l.length;t;){for(r=l,l=[];++h<t;)r&&r[h].run();h=-1,t=l.length}r=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new f(e,t)),1!==l.length||u||a(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var s=n[e]={exports:{}},o=!0;try{t[e](s,s.exports,r),o=!1}finally{o&&delete n[e]}return s.exports}r.ab="//";var i=r(229);e.exports=i}()},9008:function(e,t,n){e.exports=n(2636)},5675:function(e,t,n){e.exports=n(3740)},1664:function(e,t,n){e.exports=n(5569)},1163:function(e,t,n){e.exports=n(6885)},2703:function(e,t,n){"use strict";var r=n(414);function i(){}function s(){}s.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,s,o){if(o!==r){var a=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:i};return n.PropTypes=n,n}},5697:function(e,t,n){e.exports=n(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},6893:function(e,t,n){"use strict";n.d(t,{Ccr:function(){return h},Dp0:function(){return d},JID:function(){return o},Qxo:function(){return u},TCC:function(){return i},cur:function(){return l},q5L:function(){return c},qOw:function(){return a},uOf:function(){return s}});var r=n(8357);function i(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"}},{tag:"polyline",attr:{points:"12 6 12 12 16 14"}}]})(e)}function s(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(e)}function o(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"2",width:"20",height:"20",rx:"5",ry:"5"}},{tag:"path",attr:{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}},{tag:"line",attr:{x1:"17.5",y1:"6.5",x2:"17.51",y2:"6.5"}}]})(e)}function a(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"}},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"}}]})(e)}function l(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"}},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"}},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"}}]})(e)}function u(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"1 4 1 10 7 10"}},{tag:"polyline",attr:{points:"23 20 23 14 17 14"}},{tag:"path",attr:{d:"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"}}]})(e)}function h(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}}]})(e)}function c(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"}},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"}}]})(e)}function d(e){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"}},{tag:"polygon",attr:{points:"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"}}]})(e)}},8357:function(e,t,n){"use strict";n.d(t,{w_:function(){return l}});var r=n(7294),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=r.createContext&&r.createContext(i),o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},a=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};function l(e){return function(t){return r.createElement(u,o({attr:o({},e.attr)},t),function e(t){return t&&t.map(function(t,n){return r.createElement(t.tag,o({key:n},t.attr),e(t.child))})}(e.child))}}function u(e){var t=function(t){var n,i=e.attr,s=e.size,l=e.title,u=a(e,["attr","size","title"]),h=s||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,u,{className:n,style:o(o({color:e.color||t.color},t.style),e.style),height:h,width:h,xmlns:"http://www.w3.org/2000/svg"}),l&&r.createElement("title",null,l),e.children)};return void 0!==s?r.createElement(s.Consumer,null,function(e){return t(e)}):t(i)}},5816:function(e,t,n){"use strict";let r,i;n.d(t,{Jn:function(){return O},qX:function(){return R},Xd:function(){return A},Mq:function(){return M},ZF:function(){return L},KN:function(){return F}});var s,o=n(740),a=n(3333),l=n(4444);let u=(e,t)=>t.some(t=>e instanceof t),h=new WeakMap,c=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,m={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return c.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return g(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function g(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(g(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let n="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(y(this),e),g(h.get(this))}:function(...e){return g(t.apply(y(this),e))}:function(e,...n){let r=t.call(y(this),e,...n);return d.set(r,e.sort?e.sort():[e]),g(r)}:(t instanceof IDBTransaction&&function(e){if(c.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});c.set(e,t)}(t),u(t,r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,m):t;return n!==e&&(f.set(e,n),p.set(n,e)),n}let y=e=>p.get(e),_=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],w=new Map;function b(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(w.get(t))return w.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||_.includes(n)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return w.set(t,s),s}m={...s=m,get:(e,t,n)=>b(e,t)||s.get(e,t,n),has:(e,t)=>!!b(e,t)||s.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let E="@firebase/app",I="0.9.13",C=new a.Yd("@firebase/app"),k="[DEFAULT]",S={[E]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},x=new Map,N=new Map;function A(e){let t=e.name;if(N.has(t))return C.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(N.set(t,e),x.values()))!function(e,t){try{e.container.addComponent(t)}catch(n){C.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}(n,e);return!0}function R(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}let P=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new o.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw P.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let O="9.23.0";function L(e,t={}){let n=e;if("object"!=typeof t){let e=t;t={name:e}}let r=Object.assign({name:k,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw P.create("bad-app-name",{appName:String(i)});if(n||(n=(0,l.aH)()),!n)throw P.create("no-options");let s=x.get(i);if(s){if((0,l.vZ)(n,s.options)&&(0,l.vZ)(r,s.config))return s;throw P.create("duplicate-app",{appName:i})}let a=new o.H0(i);for(let e of N.values())a.addComponent(e);let u=new D(n,r,a);return x.set(i,u),u}function M(e=k){let t=x.get(e);if(!t&&e===k&&(0,l.aH)())return L();if(!t)throw P.create("no-app",{appName:e});return t}function F(e,t,n){var r;let i=null!==(r=S[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);let s=i.match(/\s|\//),a=t.match(/\s|\//);if(s||a){let e=[`Unable to register library "${i}" with version "${t}":`];s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),C.warn(e.join(" "));return}A(new o.wA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}let U="firebase-heartbeat-store",j=null;function V(){return j||(j=(function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(e,1),a=g(o);return r&&o.addEventListener("upgradeneeded",e=>{r(g(o.result),e.oldVersion,e.newVersion,g(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(U)}}).catch(e=>{throw P.create("idb-open",{originalErrorMessage:e.message})})),j}async function q(e){try{let t=await V(),n=await t.transaction(U).objectStore(U).get(z(e));return n}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=P.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}async function B(e,t){try{let n=await V(),r=n.transaction(U,"readwrite"),i=r.objectStore(U);await i.put(t,z(e)),await r.done}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=P.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}function z(e){return`${e.name}!${e.options.appId}`}class ${constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new H(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=W();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))?void 0:(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),n=Date.now();return n-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=W(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),K(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),K(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=(0,l.L)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function W(){let e=new Date;return e.toISOString().substring(0,10)}class H{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await q(this.app);return e||{heartbeats:[]}}}async overwrite(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let n=await this.read();return B(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let n=await this.read();return B(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function K(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}A(new o.wA("platform-logger",e=>new T(e),"PRIVATE")),A(new o.wA("heartbeat",e=>new $(e),"PRIVATE")),F(E,I,""),F(E,I,"esm2017"),F("fire-js","")},740:function(e,t,n){"use strict";n.d(t,{H0:function(){return a},wA:function(){return i}});var r=n(4444);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new r.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);n===i&&t.resolve(r)}return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},3333:function(e,t,n){"use strict";var r,i;n.d(t,{Yd:function(){return h},in:function(){return r}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=[];(i=r||(r={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let o={debug:r.DEBUG,verbose:r.VERBOSE,info:r.INFO,warn:r.WARN,error:r.ERROR,silent:r.SILENT},a=r.INFO,l={[r.DEBUG]:"log",[r.VERBOSE]:"log",[r.INFO]:"info",[r.WARN]:"warn",[r.ERROR]:"error"},u=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=l[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class h{constructor(e){this.name=e,this._logLevel=a,this._logHandler=u,this._userLogHandler=null,s.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in r))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,r.DEBUG,...e),this._logHandler(this,r.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,r.VERBOSE,...e),this._logHandler(this,r.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,r.INFO,...e),this._logHandler(this,r.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,r.WARN,...e),this._logHandler(this,r.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,r.ERROR,...e),this._logHandler(this,r.ERROR,...e)}}},9451:function(e,t,n){"use strict";n.d(t,{hJ:function(){return e$},a$:function(){return te},v0:function(){return nt},JB:function(){return e2},Aj:function(){return e3},oo:function(){return e1},Fb:function(){return e9},P6:function(){return e4},rh:function(){return tS},w7:function(){return e5}});var r,i=n(4444),s=n(5816);function o(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}"function"==typeof SuppressedError&&SuppressedError;var a=n(3333),l=n(740);function u(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let h=new i.LL("auth","Firebase",u()),c=new a.Yd("@firebase/auth");function d(e,...t){c.logLevel<=a.in.ERROR&&c.error(`Auth (${s.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,...t){throw g(e,...t)}function p(e,...t){return g(e,...t)}function m(e,t,n){let r=Object.assign(Object.assign({},u()),{[t]:n}),s=new i.LL("auth","Firebase",r);return s.create(t,{appName:e.name})}function g(e,...t){if("string"!=typeof e){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return h.create(e,...t)}function y(e,t,...n){if(!e)throw g(t,...n)}function _(e){let t="INTERNAL ASSERTION FAILED: "+e;throw d(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function w(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,t){this.shortDelay=e,this.longDelay=t,t>e||_("Short delay should be less than long delay!"),this.isMobile=(0,i.uI)()||(0,i.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===w()||"https:"===w()||(0,i.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){e.emulator||_("Emulator should always be set here");let{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void _("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void _("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void _("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let I={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},C=new b(3e4,6e4);function k(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function S(e,t,n,r,s={}){return x(e,s,async()=>{let s={},o={};r&&("GET"===t?o=r:s={body:JSON.stringify(r)});let a=(0,i.xO)(Object.assign({key:e.config.apiKey},o)).slice(1),l=await e._getAdditionalHeaders();return l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode),E.fetch()(A(e,e.config.apiHost,n,a),Object.assign({method:t,headers:l,referrerPolicy:"no-referrer"},s))})}async function x(e,t,n){e._canInitEmulator=!1;let r=Object.assign(Object.assign({},I),t);try{let t=new R(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw P(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw P(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw P(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw P(e,"user-disabled",s);let a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw m(e,a,o);f(e,a)}}catch(t){if(t instanceof i.ZR)throw t;f(e,"network-request-failed",{message:String(t)})}}async function N(e,t,n,r,i={}){let s=await S(e,t,n,r,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}function A(e,t,n,r){let i=`${t}${n}?${r}`;return e.config.emulator?T(e.config,i):`${e.config.apiScheme}://${i}`}class R{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),C.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function P(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=p(e,t,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D(e,t){return S(e,"POST","/v1/accounts:delete",t)}async function O(e,t){return S(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function M(e,t=!1){let n=(0,i.m9)(e),r=await n.getIdToken(t),s=U(r);y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");let o="object"==typeof s.firebase?s.firebase:void 0,a=null==o?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:L(F(s.auth_time)),issuedAtTime:L(F(s.iat)),expirationTime:L(F(s.exp)),signInProvider:a||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}}function F(e){return 1e3*Number(e)}function U(e){let[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return d("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,i.tV)(n);if(!e)return d("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return d("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof i.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;let e=null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0,n=e-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=L(this.lastLoginAt),this.creationTime=L(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B(e){var t;let n=e.auth,r=await e.getIdToken(),i=await j(e,O(n,{idToken:r}));y(null==i?void 0:i.users.length,n,"internal-error");let s=i.users[0];e._notifyReloadListener(s);let a=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?s.providerUserInfo.map(e=>{var{providerId:t}=e,n=o(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}):[],l=function(e,t){let n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}(e.providerData,a),u=e.isAnonymous,h=!(e.email&&s.passwordHash)&&!(null==l?void 0:l.length),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new q(s.createdAt,s.lastLoginAt),isAnonymous:!!u&&h};Object.assign(e,c)}async function z(e){let t=(0,i.m9)(e);await B(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t){let n=await x(e,{},async()=>{let n=(0,i.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,o=A(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",E.fetch()(o,{method:"POST",headers:a,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(void 0!==e.idToken,"internal-error"),y(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){let t=U(e);return y(t,"internal-error"),y(void 0!==t.exp,"internal-error"),y(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return(y(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired)?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await $(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){let{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new W;return n&&(y("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(y("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(y("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new W,this.toJSON())}_performRefresh(){return _("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e,t){y("string"==typeof e||void 0===e,"internal-error",{appName:t})}class K{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=o(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new V(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new q(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await j(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return M(this,e)}reload(){return z(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new K(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await B(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await j(this,D(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,o,a,l,u;let h=null!==(n=t.displayName)&&void 0!==n?n:void 0,c=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(l=t.createdAt)&&void 0!==l?l:void 0,_=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:T,stsTokenManager:E}=t;y(v&&E,e,"internal-error");let I=W.fromJSON(this.name,E);y("string"==typeof v,e,"internal-error"),H(h,e.name),H(c,e.name),y("boolean"==typeof w,e,"internal-error"),y("boolean"==typeof b,e,"internal-error"),H(d,e.name),H(f,e.name),H(p,e.name),H(m,e.name),H(g,e.name),H(_,e.name);let C=new K({uid:v,auth:e,email:c,emailVerified:w,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:g,lastLoginAt:_});return T&&Array.isArray(T)&&(C.providerData=T.map(e=>Object.assign({},e))),m&&(C._redirectEventId=m),C}static async _fromIdTokenResponse(e,t,n=!1){let r=new W;r.updateFromServerResponse(t);let i=new K({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await B(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G=new Map;function Y(e){e instanceof Function||_("Expected a class definition");let t=G.get(e);return t?(t instanceof e||_("Instance stored in cache mismatched with class"),t):(t=new e,G.set(e,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e,t,n){return`firebase:${e}:${t}:${n}`}Q.type="NONE";class X{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=J(this.userKey,r.apiKey,i),this.fullPersistenceKey=J("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?K._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new X(Y(Q),e,n);let r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=r[0]||Y(Q),s=J(n,e.config.apiKey,e.name),o=null;for(let n of t)try{let t=await n._get(s);if(t){let r=K._fromJSON(e,t);n!==i&&(o=r),i=n;break}}catch(e){}let a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length&&(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(e){}}))),new X(i,e,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(er(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(ee(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(es(t))return"Blackberry";if(eo(t))return"Webos";if(et(t))return"Safari";if((t.includes("chrome/")||en(t))&&!t.includes("edge/"))return"Chrome";if(ei(t))return"Android";let n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==n?void 0:n.length)===2)return n[1]}return"Other"}function ee(e=(0,i.z$)()){return/firefox\//i.test(e)}function et(e=(0,i.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function en(e=(0,i.z$)()){return/crios\//i.test(e)}function er(e=(0,i.z$)()){return/iemobile/i.test(e)}function ei(e=(0,i.z$)()){return/android/i.test(e)}function es(e=(0,i.z$)()){return/blackberry/i.test(e)}function eo(e=(0,i.z$)()){return/webos/i.test(e)}function ea(e=(0,i.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function el(e=(0,i.z$)()){return ea(e)||ei(e)||eo(e)||es(e)||/windows phone/i.test(e)||er(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(e,t=[]){let n;switch(e){case"Browser":n=Z((0,i.z$)());break;case"Worker":n=`${Z((0,i.z$)())}-${e}`;break;default:n=e}let r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${s.Jn}/${r}`}async function eh(e,t){return S(e,"GET","/v2/recaptchaConfig",k(e,t))}function ec(e){return void 0!==e&&void 0!==e.enterprise}class ed{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(e=>"EMAIL_PASSWORD_PROVIDER"===e.provider&&"OFF"!==e.enforcementState)}}function ef(e){return new Promise((t,n)=>{var r,i;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=p("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(i=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==i?i:document).appendChild(s)})}function ep(e){return`__${e}${Math.floor(1e6*Math.random())}`}class em{constructor(e){this.type="recaptcha-enterprise",this.auth=ev(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{eh(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0===r.recaptchaKey)n(Error("recaptcha Enterprise site key undefined"));else{let n=new ed(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function r(t,n,r){let i=window.grecaptcha;ec(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n("NO_RECAPTCHA")})}):r(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&ec(window.grecaptcha))r(n,e,i);else{if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}ef("https://www.google.com/recaptcha/enterprise.js?render="+n).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function eg(e,t,n,r=!1){let i;let s=new em(e);try{i=await s.verify(n)}catch(e){i=await s.verify(n,!0)}let o=Object.assign({},t);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{let r=e(t);n(r)}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ew(this),this.idTokenSubscription=new ew(this),this.beforeStateQueue=new ey(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Y(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await X.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let n=await this.assertedPersistence.getCurrentUser(),r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);(!n||n===s)&&(null==o?void 0:o.user)&&(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await B(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?(0,i.m9)(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Y(e))})}async initializeRecaptchaConfig(){let e=await eh(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),t=new ed(e);if(null==this.tenantId?this._agentRecaptchaConfig=t:this._tenantRecaptchaConfigs[this.tenantId]=t,t.emailPasswordEnabled){let e=new em(this);e.verify()}}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new i.LL("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Y(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await X.create(this,[Y(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=this._isInitialized?Promise.resolve():this._initializationPromise;return(y(s,this,"internal-error"),s.then(()=>i(this.currentUser)),"function"==typeof t)?e.addObserver(t,n,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){c.logLevel<=a.in.WARN&&c.warn(`Auth (${s.Jn}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function ev(e){return(0,i.m9)(e)}class ew{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.ne)(e=>this.observer=e)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function eb(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eT(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _("not implemented")}_getIdTokenResponse(e){return _("not implemented")}_linkToIdToken(e,t){return _("not implemented")}_getReauthenticationResolver(e){return _("not implemented")}}async function eI(e,t){return S(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eC(e,t){return N(e,"POST","/v1/accounts:signInWithPassword",k(e,t))}async function ek(e,t){return S(e,"POST","/v1/accounts:sendOobCode",k(e,t))}async function eS(e,t){return ek(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ex(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",k(e,t))}async function eN(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",k(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA extends eE{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new eA(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new eA(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){var t;switch(this.signInMethod){case"password":let n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(null===(t=e._getRecaptchaConfig())||void 0===t||!t.emailPasswordEnabled)return eC(e,n).catch(async t=>{if("auth/missing-recaptcha-token"!==t.code)return Promise.reject(t);{console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");let t=await eg(e,n,"signInWithPassword");return eC(e,t)}});{let t=await eg(e,n,"signInWithPassword");return eC(e,t)}case"emailLink":return ex(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return eI(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return eN(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eR(e,t){return N(e,"POST","/v1/accounts:signInWithIdp",k(e,t))}class eP extends eE{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new eP(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=o(t,["providerId","signInMethod"]);if(!n||!r)return null;let s=new eP(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){let t=this.buildRequest();return eR(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,eR(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,eR(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,i.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eD(e,t){return S(e,"POST","/v1/accounts:sendVerificationCode",k(e,t))}async function eO(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,t))}async function eL(e,t){let n=await N(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,t));if(n.temporaryProof)throw P(e,"account-exists-with-different-credential",n);return n}let eM={USER_NOT_FOUND:"user-not-found"};async function eF(e,t){let n=Object.assign(Object.assign({},t),{operation:"REAUTH"});return N(e,"POST","/v1/accounts:signInWithPhoneNumber",k(e,n),eM)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eU extends eE{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new eU({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new eU({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eO(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return eL(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return eF(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new eU({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class ej{constructor(e){var t,n,r,s,o,a;let l=(0,i.zd)((0,i.pd)(e)),u=null!==(t=l.apiKey)&&void 0!==t?t:null,h=null!==(n=l.oobCode)&&void 0!==n?n:null,c=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=l.mode)&&void 0!==r?r:null);y(u&&h&&c,"argument-error"),this.apiKey=u,this.operation=c,this.code=h,this.continueUrl=null!==(s=l.continueUrl)&&void 0!==s?s:null,this.languageCode=null!==(o=l.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(a=l.tenantId)&&void 0!==a?a:null}static parseLink(e){let t=function(e){let t=(0,i.zd)((0,i.pd)(e)).link,n=t?(0,i.zd)((0,i.pd)(t)).deep_link_id:null,r=(0,i.zd)((0,i.pd)(e)).deep_link_id,s=r?(0,i.zd)((0,i.pd)(r)).link:null;return s||r||n||t||e}(e);try{return new ej(t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eV{constructor(){this.providerId=eV.PROVIDER_ID}static credential(e,t){return eA._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=ej.parseLink(t);return y(n,"argument-error"),eA._fromEmailAndCode(e,n.code,n.tenantId)}}eV.PROVIDER_ID="password",eV.EMAIL_PASSWORD_SIGN_IN_METHOD="password",eV.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eq{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eB extends eq{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ez extends eB{constructor(){super("facebook.com")}static credential(e){return eP._fromParams({providerId:ez.PROVIDER_ID,signInMethod:ez.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ez.credentialFromTaggedObject(e)}static credentialFromError(e){return ez.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ez.credential(e.oauthAccessToken)}catch(e){return null}}}ez.FACEBOOK_SIGN_IN_METHOD="facebook.com",ez.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e$ extends eB{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return eP._fromParams({providerId:e$.PROVIDER_ID,signInMethod:e$.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return e$.credentialFromTaggedObject(e)}static credentialFromError(e){return e$.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return e$.credential(t,n)}catch(e){return null}}}e$.GOOGLE_SIGN_IN_METHOD="google.com",e$.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eW extends eB{constructor(){super("github.com")}static credential(e){return eP._fromParams({providerId:eW.PROVIDER_ID,signInMethod:eW.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eW.credentialFromTaggedObject(e)}static credentialFromError(e){return eW.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eW.credential(e.oauthAccessToken)}catch(e){return null}}}eW.GITHUB_SIGN_IN_METHOD="github.com",eW.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eH extends eB{constructor(){super("twitter.com")}static credential(e,t){return eP._fromParams({providerId:eH.PROVIDER_ID,signInMethod:eH.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return eH.credentialFromTaggedObject(e)}static credentialFromError(e){return eH.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return eH.credential(t,n)}catch(e){return null}}}eH.TWITTER_SIGN_IN_METHOD="twitter.com",eH.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){let i=await K._fromIdTokenResponse(e,n,r),s=eG(n),o=new eK({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);let r=eG(n);return new eK({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function eG(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY extends i.ZR{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,eY.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new eY(e,t,n,r)}}function eQ(e,t,n,r){let i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw eY._fromErrorAndOperation(e,n,t,r);throw n})}async function eJ(e,t,n=!1){let r=await j(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return eK._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eX(e,t,n=!1){let{auth:r}=e,i="reauthenticate";try{let s=await j(e,eQ(r,i,t,e),n);y(s.idToken,r,"internal-error");let o=U(s.idToken);y(o,r,"internal-error");let{sub:a}=o;return y(e.uid===a,r,"user-mismatch"),eK._forOperation(e,i,s)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&f(r,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eZ(e,t,n=!1){let r="signIn",i=await eQ(e,r,t),s=await eK._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}async function e0(e,t){return eZ(ev(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e1(e,t,n){var r;let i=ev(e),s={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};function o(e,t){if(y(t.handleCodeInApp,i,"argument-error"),t){var n,r;n=e,y((null===(r=t.url)||void 0===r?void 0:r.length)>0,i,"invalid-continue-uri"),y(void 0===t.dynamicLinkDomain||t.dynamicLinkDomain.length>0,i,"invalid-dynamic-link-domain"),n.continueUrl=t.url,n.dynamicLinkDomain=t.dynamicLinkDomain,n.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(y(t.iOS.bundleId.length>0,i,"missing-ios-bundle-id"),n.iOSBundleId=t.iOS.bundleId),t.android&&(y(t.android.packageName.length>0,i,"missing-android-pkg-name"),n.androidInstallApp=t.android.installApp,n.androidMinimumVersionCode=t.android.minimumVersion,n.androidPackageName=t.android.packageName)}}if(null===(r=i._getRecaptchaConfig())||void 0===r?void 0:r.emailPasswordEnabled){let e=await eg(i,s,"getOobCode",!0);o(e,n),await eS(i,e)}else o(s,n),await eS(i,s).catch(async e=>{if("auth/missing-recaptcha-token"!==e.code)return Promise.reject(e);{console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");let e=await eg(i,s,"getOobCode",!0);o(e,n),await eS(i,e)}})}function e2(e,t){let n=ej.parseLink(t);return(null==n?void 0:n.operation)==="EMAIL_SIGNIN"}async function e4(e,t,n){let r=(0,i.m9)(e),s=eV.credentialWithLink(t,n||v());return y(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),e0(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e9(e,t){return(0,i.m9)(e).setPersistence(t)}function e3(e,t,n,r){return(0,i.m9)(e).onAuthStateChanged(t,n,r)}function e5(e){return(0,i.m9)(e).signOut()}new WeakMap;let e6="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e7{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(e6,"1"),this.storage.removeItem(e6),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class e8 extends e7{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){let e=(0,i.z$)();return et(e)||ea(e)}()&&function(){try{return!!(window&&window!==window.top)}catch(e){return!1}}(),this.fallbackToPolling=el(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let r=this.storage.getItem(n);if(e.newValue!==r)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}let r=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);(0,i.w1)()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}e8.type="LOCAL";let te=e8;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt extends e7{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tt.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let n=new tn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:n,data:r}=e.data,i=this.handlersMap[n];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:n});let s=Array.from(i).map(async t=>t(e.origin,r)),o=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:n,response:o})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}tn.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((o,a)=>{let l=tr("",20);s.port1.start();let u=setTimeout(()=>{a(Error("unsupported_event"))},n);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{a(Error("timeout"))},3e3);break;case"done":clearTimeout(r),o(e.data.response);break;default:clearTimeout(u),clearTimeout(r),a(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){return void 0!==ts().WorkerGlobalScope&&"function"==typeof ts().importScripts}async function ta(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{let e=await navigator.serviceWorker.ready;return e.active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tl="firebaseLocalStorageDb",tu="firebaseLocalStorage",th="fbase_key";class tc{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function td(e,t){return e.transaction([tu],t?"readwrite":"readonly").objectStore(tu)}function tf(){let e=indexedDB.open(tl,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(tu,{keyPath:th})}catch(e){n(e)}}),e.addEventListener("success",async()=>{let n=e.result;n.objectStoreNames.contains(tu)?t(n):(n.close(),await function(){let e=indexedDB.deleteDatabase(tl);return new tc(e).toPromise()}(),t(await tf()))})})}async function tp(e,t,n){let r=td(e,!0).put({[th]:t,value:n});return new tc(r).toPromise()}async function tm(e,t){let n=td(e,!1).get(t),r=await new tc(n).toPromise();return void 0===r?null:r.value}function tg(e,t){let n=td(e,!0).delete(t);return new tc(n).toPromise()}class ty{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await tf()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return to()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=tn._getInstance(to()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>{let n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ta(),!this.activeServiceWorker)return;this.sender=new ti(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await tf();return await tp(e,e6,"1"),await tg(e,e6),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>tp(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>tm(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tg(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>{let t=td(e,!1).getAll();return new tc(t).toPromise()});if(!e||0!==this.pendingWrites)return[];let t=[],n=new Set;for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}async function t_(e,t,n){var r,i,s;let o=await n.verify();try{let a;if(y("string"==typeof o,e,"argument-error"),y("recaptcha"===n.type,e,"argument-error"),a="string"==typeof t?{phoneNumber:t}:t,"session"in a){let t=a.session;if("phoneNumber"in a){y("enroll"===t.type,e,"internal-error");let n=await (i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:a.phoneNumber,recaptchaToken:o}},S(e,"POST","/v2/accounts/mfaEnrollment:start",k(e,i)));return n.phoneSessionInfo.sessionInfo}{y("signin"===t.type,e,"internal-error");let n=(null===(r=a.multiFactorHint)||void 0===r?void 0:r.uid)||a.multiFactorUid;y(n,e,"missing-multi-factor-info");let i=await (s={mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:o}},S(e,"POST","/v2/accounts/mfaSignIn:start",k(e,s)));return i.phoneResponseInfo.sessionInfo}}{let{sessionInfo:t}=await eD(e,{phoneNumber:a.phoneNumber,recaptchaToken:o});return t}}finally{n._reset()}}ty.type="LOCAL",ep("rcb"),new b(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e){this.providerId=tv.PROVIDER_ID,this.auth=ev(e)}verifyPhoneNumber(e,t){return t_(this.auth,e,(0,i.m9)(t))}static credential(e,t){return eU._fromVerification(e,t)}static credentialFromResult(e){return tv.credentialFromTaggedObject(e)}static credentialFromError(e){return tv.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?eU._fromTokenResponse(t,n):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(e,t){return t?Y(t):(y(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}tv.PROVIDER_ID="phone",tv.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb extends eE{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return eR(e,this._buildIdpRequest())}_linkToIdToken(e,t){return eR(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return eR(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tT(e){return eZ(e.auth,new tb(e),e.bypassAuthState)}function tE(e){let{auth:t,user:n}=e;return y(n,t,"internal-error"),eX(n,new tb(e),e.bypassAuthState)}async function tI(e){let{auth:t,user:n}=e;return y(n,t,"internal-error"),eJ(n,new tb(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s){this.reject(s);return}let a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tT;case"linkViaPopup":case"linkViaRedirect":return tI;case"reauthViaPopup":case"reauthViaRedirect":return tE;default:f(this.auth,"internal-error")}}resolve(e){this.pendingPromise||_("Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){this.pendingPromise||_("Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tk=new b(2e3,1e4);async function tS(e,t,n){let r=ev(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&f(e,"argument-error"),m(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,eq);let i=tw(r,n),s=new tx(r,"signInViaPopup",t,i);return s.executeNotNull()}class tx extends tC{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,tx.currentPopupAction&&tx.currentPopupAction.cancel(),tx.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){1===this.filter.length||_("Popup operations only handle one event");let e=tr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,tx.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tk.get())};e()}}tx.currentPopupAction=null;let tN=new Map;class tA extends tC{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=tN.get(this.auth._key());if(!e){try{let t=await tR(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}tN.set(this.auth._key(),e)}return this.bypassAuthState||tN.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tR(e,t){let n=J("pendingRedirect",t.config.apiKey,t.name),r=Y(e._redirectPersistence);if(!await r._isAvailable())return!1;let i=await r._get(n)==="true";return await r._remove(n),i}function tP(e,t){tN.set(e._key(),t)}async function tD(e,t,n=!1){let r=ev(e),i=tw(r,t),s=new tA(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}class tO{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tM(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!tM(e)){let r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(p(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(tL(e))}saveEventToCache(e){this.cachedEventUids.add(tL(e)),this.lastProcessedEventTime=Date.now()}}function tL(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function tM({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tF(e,t={}){return S(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tU=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tj=/^https?/;async function tV(e){if(e.config.emulator)return;let{authorizedDomains:t}=await tF(e);for(let e of t)try{if(function(e){let t=v(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!tj.test(n))return!1;if(tU.test(e))return r===e;let i=e.replace(/\./g,"\\."),s=RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}(e))return}catch(e){}f(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tq=new b(3e4,6e4);function tB(){let e=ts().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let tz=null,t$=new b(5e3,15e3),tW={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tH=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function tK(e){let t=await (tz=tz||new Promise((t,n)=>{var r,i,s;function o(){tB(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{tB(),n(p(e,"network-request-failed"))},timeout:tq.get()})}if(null===(i=null===(r=ts().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else if(null===(s=ts().gapi)||void 0===s?void 0:s.load)o();else{let t=ep("iframefcb");return ts()[t]=()=>{gapi.load?o():n(p(e,"network-request-failed"))},ef(`https://apis.google.com/js/api.js?onload=${t}`).catch(e=>n(e))}}).catch(e=>{throw tz=null,e})),n=ts().gapi;return y(n,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;y(t.authDomain,e,"auth-domain-config-required");let n=t.emulator?T(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:s.Jn},o=tH.get(e.config.apiHost);o&&(r.eid=o);let a=e._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${(0,i.xO)(r).slice(1)}`}(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:tW,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=p(e,"network-request-failed"),s=ts().setTimeout(()=>{r(i)},t$.get());function o(){ts().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tG={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class tY{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let tQ=encodeURIComponent("fac");async function tJ(e,t,n,r,o,a){y(e.config.authDomain,e,"auth-domain-config-required"),y(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:s.Jn,eventId:o};if(t instanceof eq)for(let[n,r]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,i.xb)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(a||{})))l[n]=r;if(t instanceof eB){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}e.tenantId&&(l.tid=e.tenantId);let u=l;for(let e of Object.keys(u))void 0===u[e]&&delete u[e];let h=await e._getAppCheckToken(),c=h?`#${tQ}=${encodeURIComponent(h)}`:"";return`${function({config:e}){return e.emulator?T(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,i.xO)(u).slice(1)}${c}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tX="webStorageSupport",tZ=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tt,this._completeRedirectFn=tD,this._overrideRedirectResult=tP}async _openPopup(e,t,n,r){var s;(null===(s=this.eventManagers[e._key()])||void 0===s?void 0:s.manager)||_("_initialize() not called before _openPopup()");let o=await tJ(e,t,n,v(),r);return function(e,t,n,r=500,s=600){let o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),l="",u=Object.assign(Object.assign({},tG),{width:r.toString(),height:s.toString(),top:o,left:a}),h=(0,i.z$)().toLowerCase();n&&(l=en(h)?"_blank":n),ee(h)&&(t=t||"http://localhost",u.scrollbars="yes");let c=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=(0,i.z$)()){var t;return ea(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(h)&&"_self"!==l)return function(e,t){let n=document.createElement("a");n.href=e,n.target=t;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",l),new tY(null);let d=window.open(t||"",l,c);y(d,e,"popup-blocked");try{d.focus()}catch(e){}return new tY(d)}(e,o,tr())}async _openRedirect(e,t,n,r){await this._originValidation(e);let i=await tJ(e,t,n,v(),r);return ts().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(n||_("If manager is not set, promise should be"),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await tK(e),n=new tO(e);return t.register("authEvent",t=>{y(null==t?void 0:t.authEvent,e,"invalid-auth-event");let r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){let n=this.iframes[e._key()];n.send(tX,{type:tX},n=>{var r;let i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[tX];void 0!==i&&t(!!i),f(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tV(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return el()||et()||ea()}};class t0{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return _("unexpected MultiFactorSessionType")}}}class t1 extends t0{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new t1(e)}_finalizeEnroll(e,t,n){return S(e,"POST","/v2/accounts/mfaEnrollment:finalize",k(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return S(e,"POST","/v2/accounts/mfaSignIn:finalize",k(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class t2 extends t0{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new t2(t,void 0,e)}static _fromEnrollmentId(e,t){return new t2(t,e)}async _finalizeEnroll(e,t,n){return y(void 0!==this.secret,e,"argument-error"),S(e,"POST","/v2/accounts/mfaEnrollment:finalize",k(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){y(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let n={verificationCode:this.otp};return S(e,"POST","/v2/accounts/mfaSignIn:finalize",k(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n}))}}class t4{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new t4(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let r=!1;return(t9(e)||t9(t))&&(r=!0),r&&(t9(e)&&(e=(null===(n=this.auth.currentUser)||void 0===n?void 0:n.email)||"unknownuser"),t9(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function t9(e){return void 0===e||(null==e?void 0:e.length)===0}var t3="@firebase/auth",t5="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t6{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;let t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let t7=(0,i.Pz)("authIdTokenMaxAge")||300,t8=null,ne=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>t7)return;let i=null==n?void 0:n.token;t8!==i&&(t8=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nt(e=(0,s.Mq)()){let t=(0,s.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let n=(0,s.qX)(e,"auth");if(n.isInitialized()){let e=n.getImmediate(),r=n.getOptions();if((0,i.vZ)(r,null!=t?t:{}))return e;f(e,"already-initialized")}let r=n.initialize({options:t});return r}(e,{popupRedirectResolver:tZ,persistence:[ty,te,tt]}),r=(0,i.Pz)("authTokenSyncURL");if(r){var o,a;let e=ne(r);o=()=>e(n.currentUser),(0,i.m9)(n).beforeAuthStateChanged(e,o),a=t=>e(t),(0,i.m9)(n).onIdTokenChanged(a,void 0,void 0)}let l=(0,i.q4)("auth");return l&&function(e,t,n){let r=ev(e);y(r._canInitEmulator,r,"emulator-config-failed"),y(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");let i=!!(null==n?void 0:n.disableWarnings),s=eb(t),{host:o,port:a}=function(e){let t=eb(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};let r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:eT(r.substr(e.length+1))}}{let[e,t]=r.split(":");return{host:e,port:eT(t)}}}(t),l=null===a?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(n,`http://${l}`),n}r="Browser",(0,s.Xd)(new l.wA("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=n.options;y(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});let l={apiKey:o,authDomain:a,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eu(r)},u=new e_(n,i,s,l);return function(e,t){let n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Y);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{let r=e.getProvider("auth-internal");r.initialize()})),(0,s.Xd)(new l.wA("auth-internal",e=>{let t=ev(e.getProvider("auth").getImmediate());return new t6(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,s.KN)(t3,t5,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(r)),(0,s.KN)(t3,t5,"esm2017")},9355:function(e,t,n){"use strict";let r,i,s,o,a,l,u,h,c,d,f;n.d(t,{EW:function(){return rQ},U2:function(){return rF},N8:function(){return r0},vh:function(){return rH},S1:function(){return rq},jM:function(){return rV},g2:function(){return rG},VF:function(){return rO},IO:function(){return rJ},iH:function(){return rP},Bt:function(){return r2},t8:function(){return rL},Vx:function(){return rM}});var p,m,g=n(5816),y=n(740),_=n(4444),v=n(3333),w=n(3454);let b="@firebase/database",T="0.14.4",E="";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),(0,_.Wl)(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:(0,_.cI)(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return(0,_.r3)(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let k=function(e){try{if("undefined"!=typeof window&&void 0!==window[e]){let t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new I(t)}}catch(e){}return new C},S=k("localStorage"),x=k("sessionStorage"),N=new v.Yd("@firebase/database"),A=(f=1,function(){return f++}),R=function(e){let t=(0,_.dS)(e),n=new _.gQ;n.update(t);let r=n.digest();return _.US.encodeByteArray(r)},P=function(...e){let t="";for(let n=0;n<e.length;n++){let r=e[n];Array.isArray(r)||r&&"object"==typeof r&&"number"==typeof r.length?t+=P.apply(null,r):"object"==typeof r?t+=(0,_.Wl)(r):t+=r,t+=" "}return t},D=null,O=!0,L=function(e,t){(0,_.hu)(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(N.logLevel=v.in.VERBOSE,D=N.log.bind(N),t&&x.set("logging_enabled",!0)):"function"==typeof e?D=e:(D=null,x.remove("logging_enabled"))},M=function(...e){if(!0===O&&(O=!1,null===D&&!0===x.get("logging_enabled")&&L(!0)),D){let t=P.apply(null,e);D(t)}},F=function(e){return function(...t){M(e,...t)}},U=function(...e){let t="FIREBASE INTERNAL ERROR: "+P(...e);N.error(t)},j=function(...e){let t=`FIREBASE FATAL ERROR: ${P(...e)}`;throw N.error(t),Error(t)},V=function(...e){let t="FIREBASE WARNING: "+P(...e);N.warn(t)},q=function(){"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},B=function(e){return"number"==typeof e&&(e!=e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},z=function(e){if((0,_.Yr)()||"complete"===document.readyState)e();else{let t=!1,n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}t||(t=!0,e())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}},$="[MIN_NAME]",W="[MAX_NAME]",H=function(e,t){if(e===t)return 0;if(e===$||t===W)return -1;if(t===$||e===W)return 1;{let n=ee(e),r=ee(t);return null!==n?null!==r?n-r==0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},K=function(e,t){return e===t?0:e<t?-1:1},G=function(e,t){if(t&&e in t)return t[e];throw Error("Missing required key ("+e+") in object: "+(0,_.Wl)(t))},Y=function(e){if("object"!=typeof e||null===e)return(0,_.Wl)(e);let t=[];for(let n in e)t.push(n);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=(0,_.Wl)(t[r])+":"+Y(e[t[r]]);return n+"}"},Q=function(e,t){let n=e.length;if(n<=t)return[e];let r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function J(e,t){for(let n in e)e.hasOwnProperty(n)&&t(n,e[n])}let X=function(e){let t,n,r,i,s;(0,_.hu)(!B(e),"Invalid JSON number"),0===e?(n=0,r=0,t=1/e==-1/0?1:0):(t=e<0,(e=Math.abs(e))>=22250738585072014e-324?(n=(i=Math.min(Math.floor(Math.log(e)/Math.LN2),1023))+1023,r=Math.round(e*Math.pow(2,52-i)-4503599627370496)):(n=0,r=Math.round(e/5e-324)));let o=[];for(s=52;s;s-=1)o.push(r%2?1:0),r=Math.floor(r/2);for(s=11;s;s-=1)o.push(n%2?1:0),n=Math.floor(n/2);o.push(t?1:0),o.reverse();let a=o.join(""),l="";for(s=0;s<64;s+=8){let e=parseInt(a.substr(s,8),2).toString(16);1===e.length&&(e="0"+e),l+=e}return l.toLowerCase()},Z=RegExp("^-?(0*)\\d{1,10}$"),ee=function(e){if(Z.test(e)){let t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},et=function(e){try{e()}catch(e){setTimeout(()=>{let t=e.stack||"";throw V("Exception was thrown by user callback.",t),e},Math.floor(0))}},en=function(){let e="object"==typeof window&&window.navigator&&window.navigator.userAgent||"";return e.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},er=function(e,t){let n=setTimeout(e,t);return"number"==typeof n&&"undefined"!=typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"==typeof n&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=null==t?void 0:t.getImmediate({optional:!0}),this.appCheck||null==t||t.get().then(e=>this.appCheck=e)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;null===(t=this.appCheckProvider)||void 0===t||t.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(M("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}}class eo{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}eo.OWNER="owner";let ea=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,el="websocket",eu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,t,n,r,i=!1,s="",o=!1,a=!1){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=s,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=S.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&S.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){let e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ec(e,t,n){let r;if((0,_.hu)("string"==typeof t,"typeof type must == string"),(0,_.hu)("object"==typeof n,"typeof params must == object"),t===el)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else if(t===eu)r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?";else throw Error("Unknown connection type: "+t);(e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams)&&(n.ns=e.namespace);let i=[];return J(n,(e,t)=>{i.push(e+"="+t)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(){this.counters_={}}incrementCounter(e,t=1){(0,_.r3)(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return(0,_.p$)(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ef={},ep={};function em(e){let t=e.toString();return ef[t]||(ef[t]=new ed),ef[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&et(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ey="start";class e_{constructor(e,t,n,r,i,s,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=s,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=F(e),this.stats_=em(t),this.urlFn=e=>(this.appCheckToken&&(e.ac=this.appCheckToken),ec(t,eu,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new eg(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(3e4)),z(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ev((...e)=>{let[t,n,r,i,s]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder){if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===ey)this.id=n,this.password=r;else if("close"===t)n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_();else throw Error("Unrecognized command received: "+t)}},(...e)=>{let[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);let e={};e[ey]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v="5",this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e.ac=this.appCheckToken),"undefined"!=typeof location&&location.hostname&&ea.test(location.hostname)&&(e.r="f");let t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){e_.forceAllow_=!0}static forceDisallow(){e_.forceDisallow_=!0}static isAvailable(){return!(0,_.Yr)()&&(!!e_.forceAllow_||!e_.forceDisallow_&&"undefined"!=typeof document&&null!=document.createElement&&!("object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"==typeof Windows&&"object"==typeof Windows.UI))}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){!this.isClosed_&&(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){let t=(0,_.Wl)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let n=(0,_.h$)(t),r=Q(n,1840);for(let e=0;e<r.length;e++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[e]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if((0,_.Yr)())return;this.myDisconnFrame=document.createElement("iframe");let n={};n.dframe="t",n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=(0,_.Wl)(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ev{constructor(e,t,n,r){if(this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,(0,_.Yr)())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=A(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=ev.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){let e=document.domain;n='<script>document.domain="'+e+'";</script>'}let r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(e){M("frame writing exception"),e.stack&&M(e.stack),M(e)}}}static createIFrame_(){let e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{let t=e.contentWindow.document;t||M("No IE domain setting required")}catch(n){let t=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+t+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(!this.alive||!this.sendNewPolls||!(this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)))return!1;{this.currentSerial++;let e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0;){let e=this.pendingSegs[0];if(e.d.length+30+n.length<=1870){let e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}else break}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3)),i=()=>{clearTimeout(r),n()};this.addTag(e,i)}addTag(e,t){(0,_.Yr)()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){let e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{M("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(e){}},Math.floor(1))}}let ew=null;"undefined"!=typeof MozWebSocket?ew=MozWebSocket:"undefined"!=typeof WebSocket&&(ew=WebSocket);class eb{constructor(e,t,n,r,i,s,o){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=F(this.connId),this.stats_=em(t),this.connURL=eb.connectionURL_(t,s,o,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){let s={};return s.v="5",!(0,_.Yr)()&&"undefined"!=typeof location&&location.hostname&&ea.test(location.hostname)&&(s.r="f"),t&&(s.s=t),n&&(s.ls=n),r&&(s.ac=r),i&&(s.p=i),ec(e,el,s)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,S.set("previous_websocket_failure",!0);try{let e;if((0,_.Yr)()){let t=this.nodeAdmin?"AdminNode":"Node";e={headers:{"User-Agent":`Firebase/5/${E}/${w.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers["X-Firebase-AppCheck"]=this.appCheckToken);let n=w.env,r=0===this.connURL.indexOf("wss://")?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new ew(this.connURL,[],e)}catch(t){this.log_("Error instantiating WebSocket.");let e=t.message||t.data;e&&this.log_(e),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");let t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){eb.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!=typeof navigator&&navigator.userAgent){let t=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);t&&t.length>1&&4.4>parseFloat(t[1])&&(e=!0)}return!e&&null!==ew&&!eb.forceDisallow_}static previouslyFailed(){return S.isInMemoryStorage||!0===S.get("previous_websocket_failure")}markConnectionHealthy(){S.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let e=this.frames.join("");this.frames=null;let t=(0,_.cI)(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if((0,_.hu)(null===this.frames,"We already have a frame buffer"),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{let e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();let t=(0,_.Wl)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let n=Q(t,16384);n.length>1&&this.sendString_(String(n.length));for(let e=0;e<n.length;e++)this.sendString_(n[e])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){!this.isClosed_&&(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}eb.responsesRequiredToBeHealthy=2,eb.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[e_,eb]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){let t=eb&&eb.isAvailable(),n=t&&!eb.previouslyFailed();if(e.webSocketOnly&&(t||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[eb];else{let e=this.transports_=[];for(let t of eT.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);eT.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}eT.globalTransportInitialized_=!1;class eE{constructor(e,t,n,r,i,s,o,a,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=s,this.onReady_=o,this.onDisconnect_=a,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=F("c:"+this.id+":"),this.transportManager_=new eT(t),this.log_("Connection created"),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));let r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=er(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){this.sendData_({t:"d",d:e})}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){let t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=G("t",e),n=G("d",e);if("c"===t)this.onSecondaryControl_(n);else if("d"===t)this.pendingDataMessages.push(n);else throw Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=G("t",e),n=G("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){!this.isHealthy_&&(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=G("t",e);if("d"in e){let n=e.d;if("h"===t){let e=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?U("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):U("Unknown control packet command: "+t)}}onHandshake_(e){let t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),"5"!==n&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),er(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):er(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(S.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eC{constructor(e){this.allowedEvents_=e,this.listeners_={},(0,_.hu)(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});let r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);let r=this.listeners_[e]||[];for(let e=0;e<r.length;e++)if(r[e].callback===t&&(!n||n===r[e].context)){r.splice(e,1);return}}validateEventType_(e){(0,_.hu)(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek extends eC{constructor(){super(["online"]),this.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||(0,_.uI)()||(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ek}getInitialEvent(e){return(0,_.hu)("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}class eS{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function ex(){return new eS("")}function eN(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function eA(e){return e.pieces_.length-e.pieceNum_}function eR(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new eS(e.pieces_,t)}function eP(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function eD(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function eO(e){if(e.pieceNum_>=e.pieces_.length)return null;let t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new eS(t,0)}function eL(e,t){let n=[];for(let t=e.pieceNum_;t<e.pieces_.length;t++)n.push(e.pieces_[t]);if(t instanceof eS)for(let e=t.pieceNum_;e<t.pieces_.length;e++)n.push(t.pieces_[e]);else{let e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new eS(n,0)}function eM(e){return e.pieceNum_>=e.pieces_.length}function eF(e,t){let n=eN(e),r=eN(t);if(null===n)return t;if(n===r)return eF(eR(e),eR(t));throw Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function eU(e,t){let n=eD(e,0),r=eD(t,0);for(let e=0;e<n.length&&e<r.length;e++){let t=H(n[e],r[e]);if(0!==t)return t}return n.length===r.length?0:n.length<r.length?-1:1}function ej(e,t){if(eA(e)!==eA(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function eV(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(eA(e)>eA(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class eq{constructor(e,t){this.errorPrefix_=t,this.parts_=eD(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let e=0;e<this.parts_.length;e++)this.byteLength_+=(0,_.ug)(this.parts_[e]);eB(this)}}function eB(e){if(e.byteLength_>768)throw Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+ez(e))}function ez(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e$ extends eC{constructor(){let e,t;super(["visible"]),"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{let t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))},!1)}static getInstance(){return new e$}getInitialEvent(e){return(0,_.hu)("visible"===e,"Unknown event type: "+e),[this.visible_]}}class eW extends eI{constructor(e,t,n,r,i,s,o,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=s,this.appCheckTokenProvider_=o,this.authOverride_=a,this.id=eW.nextPersistentConnectionId_++,this.log_=F("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=1e3,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a&&!(0,_.Yr)())throw Error("Auth override specified in options, but not supported on non Node.js platforms");e$.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&ek.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){let r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_((0,_.Wl)(i)),(0,_.hu)(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();let t=new _.BH,n={p:e._path.toString(),q:e._queryObject};this.outstandingGets_.push({action:"g",request:n,onComplete:e=>{let n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}}),this.outstandingGetCount_++;let r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();let i=e._queryIdentifier,s=e._path.toString();this.log_("Listen called for "+s+" "+i),this.listens.has(s)||this.listens.set(s,new Map),(0,_.hu)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),(0,_.hu)(!this.listens.get(s).has(i),"listen() called twice for same path/queryId.");let o={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(s).set(i,o),this.connected_&&this.sendListen_(o)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){let t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);let i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,i=>{let s=i.d,o=i.s;eW.warnOnListenWarnings_(s,t);let a=this.listens.get(n)&&this.listens.get(n).get(r);a===e&&(this.log_("listen response",i),"ok"!==o&&this.removeListen_(n,r),e.onComplete&&e.onComplete(o,s))})}static warnOnListenWarnings_(e,t){if(e&&"object"==typeof e&&(0,_.r3)(e,"w")){let n=(0,_.DV)(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){let e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){let t=e&&40===e.length;(t||(0,_.GJ)(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=(0,_.w9)(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"==typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,t=>{let n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{let t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){let n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),(0,_.hu)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");let i=this.removeListen_(n,r);i&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);let i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){let i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,e=>{r&&setTimeout(()=>{r(e.s,e.d)},Math.floor(0))})}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();let s={p:t,d:n};void 0!==i&&(s.h=i),this.outstandingPuts_.push({action:e,request:s,onComplete:r}),this.outstandingPutCount_++;let o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,e=>{let t=e.s;if("ok"!==t){let t=e.d;this.log_("reportStats","Error sending stats: "+t)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+(0,_.Wl)(e));let t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else if("error"in e)throw"A server-side error has occurred: "+e.error;else"a"in e&&this.onDataPush_(e.a,e.b)}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):U("Unrecognized action received from server: "+(0,_.Wl)(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){(0,_.hu)(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){!e||this.visible_||this.reconnectDelay_!==this.maxReconnectDelay_||(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){let e=new Date().getTime()-this.lastConnectionEstablishedTime_;e>3e4&&(this.reconnectDelay_=1e3),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime();let e=new Date().getTime()-this.lastConnectionAttemptTime_,t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+eW.nextConnectionId_++,i=this.lastSessionId,s=!1,o=null,a=function(){o?o.close():(s=!0,n())};this.realtime_={close:a,sendRequest:function(e){(0,_.hu)(o,"sendRequest call when we're not connected not allowed."),o.sendRequest(e)}};let l=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[a,u]=await Promise.all([this.authTokenProvider_.getToken(l),this.appCheckTokenProvider_.getToken(l)]);s?M("getToken() completed but was canceled"):(M("getToken() completed. Creating connection."),this.authToken_=a&&a.accessToken,this.appCheckToken_=u&&u.token,o=new eE(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,e=>{V(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")},i))}catch(e){this.log_("Failed to get token: "+e),s||(this.repoInfo_.nodeAdmin&&V(e),a())}}}interrupt(e){M("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){M("Resuming connection for reason: "+e),delete this.interruptReasons_[e],(0,_.xb)(this.interruptReasons_)&&(this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>Y(e)).join("$"):"default";let r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){let n;let r=new eS(e).toString();if(this.listens.has(r)){let e=this.listens.get(r);n=e.get(t),e.delete(t),0===e.size&&this.listens.delete(r)}else n=void 0;return n}onAuthRevoked_(e,t){M("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),("invalid_token"===e||"permission_denied"===e)&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){M("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,("invalid_token"===e||"permission_denied"===e)&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){for(let e of(this.tryAuth(),this.tryAppCheck(),this.listens.values()))for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t="js";(0,_.Yr)()&&(t=this.repoInfo_.nodeAdmin?"admin_node":"node"),e["sdk."+t+"."+E.replace(/\./g,"-")]=1,(0,_.uI)()?e["framework.cordova"]=1:(0,_.b$)()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){let e=ek.getInstance().currentlyOnline();return(0,_.xb)(this.interruptReasons_)&&e}}eW.nextPersistentConnectionId_=0,eW.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eH{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new eH(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let n=new eH($,e),r=new eH($,t);return 0!==this.compare(n,r)}minPost(){return eH.MIN}}class eG extends eK{static get __EMPTY_NODE(){return r}static set __EMPTY_NODE(e){r=e}compare(e,t){return H(e.name,t.name)}isDefinedOn(e){throw(0,_.g5)("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return eH.MIN}maxPost(){return new eH(W,r)}makePost(e,t){return(0,_.hu)("string"==typeof e,"KeyIndex indexValue must always be a string."),new eH(e,r)}toString(){return".key"}}let eY=new eG;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,r&&(s*=-1),s<0)e=this.isReverse_?e.left:e.right;else if(0===s){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}getNext(){let e;if(0===this.nodeStack_.length)return null;let t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class eJ{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:eJ.RED,this.left=null!=r?r:eX.EMPTY_NODE,this.right=null!=i?i:eX.EMPTY_NODE}copy(e,t,n,r,i){return new eJ(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp_()}removeMin_(){if(this.left.isEmpty())return eX.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),(e=e.copy(null,null,null,e.left.removeMin_(),null)).fixUp_()}remove(e,t){let n,r;if(n=this,0>t(e,n.key))n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return eX.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight_())).rotateLeft_()).colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=(e=e.rotateRight_()).colorFlip_()),e}rotateLeft_(){let e=this.copy(null,null,eJ.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){let e=this.copy(null,null,eJ.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){let e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw Error("Right child of ("+this.key+","+this.value+") is red");let e=this.left.check_();if(e===this.right.check_())return e+(this.isRed_()?0:1);throw Error("Black depths differ")}}eJ.RED=!0,eJ.BLACK=!1;class eX{constructor(e,t=eX.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new eX(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,eJ.BLACK,null,null))}remove(e){return new eX(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,eJ.BLACK,null,null))}get(e){let t;let n=this.root_;for(;!n.isEmpty();){if(0===(t=this.comparator_(e,n.key)))return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(0===(t=this.comparator_(e,n.key))){if(n.left.isEmpty()){if(r)return r.key;return null}for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new eQ(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new eQ(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new eQ(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new eQ(this.root_,null,this.comparator_,!0,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eZ(e,t){return H(e.name,t.name)}function e0(e,t){return H(e,t)}eX.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new eJ(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};let e1=function(e){return"number"==typeof e?"number:"+X(e):"string:"+e},e2=function(e){if(e.isLeafNode()){let t=e.val();(0,_.hu)("string"==typeof t||"number"==typeof t||"object"==typeof t&&(0,_.r3)(t,".sv"),"Priority must be a string or number.")}else(0,_.hu)(e===i||e.isEmpty(),"priority of unexpected type.");(0,_.hu)(e===i||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};class e4{constructor(e,t=e4.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,(0,_.hu)(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),e2(this.priorityNode_)}static set __childrenNodeConstructor(e){s=e}static get __childrenNodeConstructor(){return s}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new e4(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:e4.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return eM(e)?this:".priority"===eN(e)?this.priorityNode_:e4.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:e4.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){let n=eN(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:((0,_.hu)(".priority"!==n||1===eA(e),".priority must be the last token in a path"),this.updateImmediateChild(n,e4.__childrenNodeConstructor.EMPTY_NODE.updateChild(eR(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+e1(this.priorityNode_.val())+":");let t=typeof this.value_;e+=t+":","number"===t?e+=X(this.value_):e+=this.value_,this.lazyHash_=R(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===e4.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof e4.__childrenNodeConstructor?-1:((0,_.hu)(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){let t=typeof e.value_,n=typeof this.value_,r=e4.VALUE_TYPE_ORDER.indexOf(t),i=e4.VALUE_TYPE_ORDER.indexOf(n);return((0,_.hu)(r>=0,"Unknown leaf type: "+t),(0,_.hu)(i>=0,"Unknown leaf type: "+n),r!==i)?i-r:"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1}withIndex(){return this}isIndexed(){return!0}equals(e){return e===this||!!e.isLeafNode()&&this.value_===e.value_&&this.priorityNode_.equals(e.priorityNode_)}}e4.VALUE_TYPE_ORDER=["object","boolean","number","string"];let e9=new class extends eK{compare(e,t){let n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?H(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return eH.MIN}maxPost(){return new eH(W,new e4("[PRIORITY-POST]",a))}makePost(e,t){let n=o(e);return new eH(t,new e4("[PRIORITY-POST]",n))}toString(){return".priority"}},e3=Math.log(2);class e5{constructor(e){this.count=parseInt(Math.log(e+1)/e3,10),this.current_=this.count-1;let t=parseInt(Array(this.count+1).join("1"),2);this.bits_=e+1&t}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}}let e6=function(e,t,n,r){e.sort(t);let i=function(t,r){let s,o;let a=r-t;if(0===a)return null;if(1===a)return s=e[t],o=n?n(s):s,new eJ(o,s.node,eJ.BLACK,null,null);{let l=parseInt(a/2,10)+t,u=i(t,l),h=i(l+1,r);return s=e[l],o=n?n(s):s,new eJ(o,s.node,eJ.BLACK,u,h)}},s=new e5(e.length),o=function(t){let r=null,s=null,o=e.length,a=function(t,r){let s=o-t,a=o;o-=t;let u=i(s+1,a),h=e[s],c=n?n(h):h;l(new eJ(c,h.node,r,null,u))},l=function(e){r?(r.left=e,r=e):(s=e,r=e)};for(let e=0;e<t.count;++e){let n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?a(r,eJ.BLACK):(a(r,eJ.BLACK),a(r,eJ.RED))}return s}(s);return new eX(r||t,o)},e7={};class e8{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return(0,_.hu)(e7&&e9,"ChildrenNode.ts has not been loaded"),l=l||new e8({".priority":e7},{".priority":e9})}get(e){let t=(0,_.DV)(this.indexes_,e);if(!t)throw Error("No index defined for "+e);return t instanceof eX?t:null}hasIndex(e){return(0,_.r3)(this.indexSet_,e.toString())}addIndex(e,t){let n;(0,_.hu)(e!==eY,"KeyIndex always exists and isn't meant to be added to the IndexMap.");let r=[],i=!1,s=t.getIterator(eH.Wrap),o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();n=i?e6(r,e.getCompare()):e7;let a=e.toString(),l=Object.assign({},this.indexSet_);l[a]=e;let u=Object.assign({},this.indexes_);return u[a]=n,new e8(u,l)}addToIndexes(e,t){let n=(0,_.UI)(this.indexes_,(n,r)=>{let i=(0,_.DV)(this.indexSet_,r);if((0,_.hu)(i,"Missing index implementation for "+r),n===e7){if(!i.isDefinedOn(e.node))return e7;{let n=[],r=t.getIterator(eH.Wrap),s=r.getNext();for(;s;)s.name!==e.name&&n.push(s),s=r.getNext();return n.push(e),e6(n,i.getCompare())}}{let r=t.get(e.name),i=n;return r&&(i=i.remove(new eH(e.name,r))),i.insert(e,e.node)}});return new e8(n,this.indexSet_)}removeFromIndexes(e,t){let n=(0,_.UI)(this.indexes_,n=>{if(n===e7)return n;{let r=t.get(e.name);return r?n.remove(new eH(e.name,r)):n}});return new e8(n,this.indexSet_)}}class te{constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&e2(this.priorityNode_),this.children_.isEmpty()&&(0,_.hu)(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return u||(u=new te(new eX(e0),null,e8.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||u}updatePriority(e){return this.children_.isEmpty()?this:new te(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{let t=this.children_.get(e);return null===t?u:t}}getChild(e){let t=eN(e);return null===t?this:this.getImmediateChild(t).getChild(eR(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if((0,_.hu)(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{let n,r;let i=new eH(e,t);t.isEmpty()?(n=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(n=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));let s=n.isEmpty()?u:this.priorityNode_;return new te(n,s,r)}}updateChild(e,t){let n=eN(e);if(null===n)return t;{(0,_.hu)(".priority"!==eN(e)||1===eA(e),".priority must be the last token in a path");let r=this.getImmediateChild(n).updateChild(eR(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;let t={},n=0,r=0,i=!0;if(this.forEachChild(e9,(s,o)=>{t[s]=o.val(e),n++,i&&te.INTEGER_REGEXP_.test(s)?r=Math.max(r,Number(s)):i=!1}),e||!i||!(r<2*n))return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t;{let e=[];for(let n in t)e[n]=t[n];return e}}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+e1(this.getPriority().val())+":"),this.forEachChild(e9,(t,n)=>{let r=n.hash();""!==r&&(e+=":"+t+":"+r)}),this.lazyHash_=""===e?"":R(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){let r=this.resolveIndex_(n);if(!r)return this.children_.getPredecessorKey(e);{let n=r.getPredecessorKey(new eH(e,t));return n?n.name:null}}getFirstChildName(e){let t=this.resolveIndex_(e);if(!t)return this.children_.minKey();{let e=t.minKey();return e&&e.name}}getFirstChild(e){let t=this.getFirstChildName(e);return t?new eH(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(!t)return this.children_.maxKey();{let e=t.maxKey();return e&&e.name}}getLastChild(e){let t=this.getLastChildName(e);return t?new eH(t,this.children_.get(t)):null}forEachChild(e,t){let n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{let n=this.children_.getIteratorFrom(e.name,eH.Wrap),r=n.peek();for(;null!=r&&0>t.compare(r,e);)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{let n=this.children_.getReverseIteratorFrom(e.name,eH.Wrap),r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===tt?-1:0}withIndex(e){if(e===eY||this.indexMap_.hasIndex(e))return this;{let t=this.indexMap_.addIndex(e,this.children_);return new te(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===eY||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode()||!this.getPriority().equals(e.getPriority())||this.children_.count()!==e.children_.count())return!1;{let t=this.getIterator(e9),n=e.getIterator(e9),r=t.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=t.getNext(),i=n.getNext()}return null===r&&null===i}}resolveIndex_(e){return e===eY?null:this.indexMap_.get(e.toString())}}te.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;let tt=new class extends te{constructor(){super(new eX(e0),te.EMPTY_NODE,e8.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return te.EMPTY_NODE}isEmpty(){return!1}};function tn(e,t=null){if(null===e)return te.EMPTY_NODE;if("object"==typeof e&&".priority"in e&&(t=e[".priority"]),(0,_.hu)(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!=typeof e||".sv"in e){let n=e;return new e4(n,tn(t))}if(e instanceof Array){let n=te.EMPTY_NODE;return J(e,(t,r)=>{if((0,_.r3)(e,t)&&"."!==t.substring(0,1)){let e=tn(r);(e.isLeafNode()||!e.isEmpty())&&(n=n.updateImmediateChild(t,e))}}),n.updatePriority(tn(t))}{let n=[],r=!1,i=e;if(J(i,(e,t)=>{if("."!==e.substring(0,1)){let i=tn(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new eH(e,i)))}}),0===n.length)return te.EMPTY_NODE;let s=e6(n,eZ,e=>e.name,e0);if(!r)return new te(s,tn(t),e8.Default);{let e=e6(n,e9.getCompare());return new te(s,tn(t),new e8({".priority":e},{".priority":e9}))}}}Object.defineProperties(eH,{MIN:{value:new eH($,te.EMPTY_NODE)},MAX:{value:new eH(W,tt)}}),eG.__EMPTY_NODE=te.EMPTY_NODE,e4.__childrenNodeConstructor=te,i=tt,a=tt,o=tn;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends eK{constructor(e){super(),this.indexPath_=e,(0,_.hu)(!eM(e)&&".priority"!==eN(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?H(e.name,t.name):i}makePost(e,t){let n=tn(e),r=te.EMPTY_NODE.updateChild(this.indexPath_,n);return new eH(t,r)}maxPost(){let e=te.EMPTY_NODE.updateChild(this.indexPath_,tt);return new eH(W,e)}toString(){return eD(this.indexPath_,0).join("/")}}let ti=new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class extends eK{compare(e,t){let n=e.node.compareTo(t.node);return 0===n?H(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return eH.MIN}maxPost(){return eH.MAX}makePost(e,t){let n=tn(e);return new eH(t,n)}toString(){return".value"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(e){return{type:"value",snapshotNode:e}}function to(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function ta(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function tl(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.index_=e}updateChild(e,t,n,r,i,s){(0,_.hu)(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");let o=e.getImmediateChild(t);return o.getChild(r).equals(n.getChild(r))&&o.isEmpty()===n.isEmpty()?e:(null!=s&&(n.isEmpty()?e.hasChild(t)?s.trackChildChange(ta(t,o)):(0,_.hu)(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):o.isEmpty()?s.trackChildChange(to(t,n)):s.trackChildChange(tl(t,n,o))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return null==n||(e.isLeafNode()||e.forEachChild(e9,(e,r)=>{t.hasChild(e)||n.trackChildChange(ta(e,r))}),t.isLeafNode()||t.forEachChild(e9,(t,r)=>{if(e.hasChild(t)){let i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(tl(t,r,i))}else n.trackChildChange(to(t,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?te.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e){this.indexedFilter_=new tu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=th.getStartPost_(e),this.endPost_=th.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?0>=this.index_.compare(this.getStartPost(),e):0>this.index_.compare(this.getStartPost(),e),n=this.endIsInclusive_?0>=this.index_.compare(e,this.getEndPost()):0>this.index_.compare(e,this.getEndPost());return t&&n}updateChild(e,t,n,r,i,s){return this.matches(new eH(t,n))||(n=te.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,s)}updateFullNode(e,t,n){t.isLeafNode()&&(t=te.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(te.EMPTY_NODE);let i=this;return t.forEachChild(e9,(e,t)=>{i.matches(new eH(e,t))||(r=r.updateImmediateChild(e,te.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(!e.hasStart())return e.getIndex().minPost();{let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}}static getEndPost_(e){if(!e.hasEnd())return e.getIndex().maxPost();{let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{let t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{let t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new th(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,s){return(this.rangedFilter_.matches(new eH(t,n))||(n=te.EMPTY_NODE),e.getImmediateChild(t).equals(n))?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,s):this.fullLimitUpdateChild_(e,t,n,i,s)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=te.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=te.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){let t=e.getNext();if(this.withinDirectionalStart(t)){if(this.withinDirectionalEnd(t))r=r.updateImmediateChild(t.name,t.node),n++;else break}}}else{let e;r=(r=t.withIndex(this.index_)).updatePriority(te.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){let t=e.getNext(),i=n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t);i?n++:r=r.updateImmediateChild(t.name,te.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let s;if(this.reverse_){let e=this.index_.getCompare();s=(t,n)=>e(n,t)}else s=this.index_.getCompare();(0,_.hu)(e.numChildren()===this.limit_,"");let o=new eH(t,n),a=this.reverse_?e.getFirstChild(this.index_):e.getLastChild(this.index_),l=this.rangedFilter_.matches(o);if(e.hasChild(t)){let u=e.getImmediateChild(t),h=r.getChildAfterChild(this.index_,a,this.reverse_);for(;null!=h&&(h.name===t||e.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);let c=null==h?1:s(h,o),d=l&&!n.isEmpty()&&c>=0;if(d)return null!=i&&i.trackChildChange(tl(t,n,u)),e.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(ta(t,u));let n=e.updateImmediateChild(t,te.EMPTY_NODE),r=null!=h&&this.rangedFilter_.matches(h);return r?(null!=i&&i.trackChildChange(to(h.name,h.node)),n.updateImmediateChild(h.name,h.node)):n}}return n.isEmpty()?e:l&&s(a,o)>=0?(null!=i&&(i.trackChildChange(ta(a.name,a.node)),i.trackChildChange(to(t,n))),e.updateImmediateChild(t,n).updateImmediateChild(a.name,te.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=e9}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return(0,_.hu)(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return((0,_.hu)(this.startSet_,"Only valid if start has been set"),this.startNameSet_)?this.indexStartName_:$}hasEnd(){return this.endSet_}getIndexEndValue(){return(0,_.hu)(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return((0,_.hu)(this.endSet_,"Only valid if end has been set"),this.endNameSet_)?this.indexEndName_:W}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return(0,_.hu)(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===e9}copy(){let e=new td;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function tf(e){let t;let n={};if(e.isDefault())return n;if(e.index_===e9?t="$priority":e.index_===ti?t="$value":e.index_===eY?t="$key":((0,_.hu)(e.index_ instanceof tr,"Unrecognized index type!"),t=e.index_.toString()),n.orderBy=(0,_.Wl)(t),e.startSet_){let t=e.startAfterSet_?"startAfter":"startAt";n[t]=(0,_.Wl)(e.indexStartValue_),e.startNameSet_&&(n[t]+=","+(0,_.Wl)(e.indexStartName_))}if(e.endSet_){let t=e.endBeforeSet_?"endBefore":"endAt";n[t]=(0,_.Wl)(e.indexEndValue_),e.endNameSet_&&(n[t]+=","+(0,_.Wl)(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?n.limitToFirst=e.limit_:n.limitToLast=e.limit_),n}function tp(e){let t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==e9&&(t.i=e.index_.toString()),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm extends eI{constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=F("p:rest:"),this.listens_={}}reportStats(e){throw Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:((0,_.hu)(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,n,r){let i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);let s=tm.getListenId_(e,n),o={};this.listens_[s]=o;let a=tf(e._queryParams);this.restRequest_(i+".json",a,(e,t)=>{let a=t;404===e&&(a=null,e=null),null===e&&this.onDataUpdate_(i,a,!1,n),(0,_.DV)(this.listens_,s)===o&&r(e?401===e?"permission_denied":"rest_error:"+e:"ok",null)})}unlisten(e,t){let n=tm.getListenId_(e,t);delete this.listens_[n]}get(e){let t=tf(e._queryParams),n=e._path.toString(),r=new _.BH;return this.restRequest_(n+".json",t,(e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(Error(i))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(t.auth=r.accessToken),i&&i.token&&(t.ac=i.token);let s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+(0,_.xO)(t);this.log_("Sending REST request for "+s);let o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&4===o.readyState){this.log_("REST Response for "+s+" received. status:",o.status,"response:",o.responseText);let e=null;if(o.status>=200&&o.status<300){try{e=(0,_.cI)(o.responseText)}catch(e){V("Failed to parse JSON response for "+s+": "+o.responseText)}n(null,e)}else 401!==o.status&&404!==o.status&&V("Got unsuccessful REST response for "+s+" Status: "+o.status),n(o.status);n=null}},o.open("GET",s,!0),o.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(){this.rootNode_=te.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(){return{value:null,children:new Map}}function t_(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach((e,n)=>{t(n,e)})}(e,(e,r)=>{let i=new eS(t.toString()+"/"+e);t_(r,i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t=Object.assign({},e);return this.last_&&J(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}}class tw{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new tv(e),er(this.reportStats_.bind(this),Math.floor(1e4+2e4*Math.random()))}reportStats_(){let e=this.statsListener_.get(),t={},n=!1;J(e,(e,r)=>{r>0&&(0,_.r3)(this.statsToReport_,e)&&(t[e]=r,n=!0)}),n&&this.server_.reportStats(t),er(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}function tb(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function tT(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function tE(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}(p=m||(m={}))[p.OVERWRITE=0]="OVERWRITE",p[p.MERGE=1]="MERGE",p[p.ACK_USER_WRITE=2]="ACK_USER_WRITE",p[p.LISTEN_COMPLETE=3]="LISTEN_COMPLETE";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=m.ACK_USER_WRITE,this.source=tb()}operationForChild(e){if(!eM(this.path))return(0,_.hu)(eN(this.path)===e,"operationForChild called for unrelated child."),new tI(eR(this.path),this.affectedTree,this.revert);if(null!=this.affectedTree.value)return(0,_.hu)(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{let t=this.affectedTree.subtree(new eS(e));return new tI(ex(),t,this.revert)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t){this.source=e,this.path=t,this.type=m.LISTEN_COMPLETE}operationForChild(e){return eM(this.path)?new tC(this.source,ex()):new tC(this.source,eR(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=m.OVERWRITE}operationForChild(e){return eM(this.path)?new tk(this.source,ex(),this.snap.getImmediateChild(e)):new tk(this.source,eR(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=m.MERGE}operationForChild(e){if(!eM(this.path))return(0,_.hu)(eN(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new tS(this.source,eR(this.path),this.children);{let t=this.children.subtree(new eS(e));return t.isEmpty()?null:t.value?new tk(this.source,ex(),t.value):new tS(this.source,ex(),t)}}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tx{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(eM(e))return this.isFullyInitialized()&&!this.filtered_;let t=eN(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tN{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function tA(e,t,n,r,i,s){let o=r.filter(e=>e.type===n);o.sort((t,n)=>(function(e,t,n){if(null==t.childName||null==n.childName)throw(0,_.g5)("Should only compare child_ events.");let r=new eH(t.childName,t.snapshotNode),i=new eH(n.childName,n.snapshotNode);return e.index_.compare(r,i)})(e,t,n)),o.forEach(n=>{var r;let o=("value"===(r=n).type||"child_removed"===r.type||(r.prevName=s.getPredecessorChildName(r.childName,r.snapshotNode,e.index_)),r);i.forEach(r=>{r.respondsTo(n.type)&&t.push(r.createEvent(o,e.query_))})})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tR(e,t){return{eventCache:e,serverCache:t}}function tP(e,t,n,r){return tR(new tx(t,n,r),e.serverCache)}function tD(e,t,n,r){return tR(e.eventCache,new tx(t,n,r))}function tO(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function tL(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}let tM=()=>(h||(h=new eX(K)),h);class tF{constructor(e,t=tM()){this.value=e,this.children=t}static fromObject(e){let t=new tF(null);return J(e,(e,n)=>{t=t.set(new eS(e),n)}),t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:ex(),value:this.value};if(eM(e))return null;{let n=eN(e),r=this.children.get(n);if(null===r)return null;{let i=r.findRootMostMatchingPathAndValue(eR(e),t);if(null==i)return null;{let e=eL(new eS(n),i.path);return{path:e,value:i.value}}}}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(eM(e))return this;{let t=eN(e),n=this.children.get(t);return null!==n?n.subtree(eR(e)):new tF(null)}}set(e,t){if(eM(e))return new tF(t,this.children);{let n=eN(e),r=this.children.get(n)||new tF(null),i=r.set(eR(e),t),s=this.children.insert(n,i);return new tF(this.value,s)}}remove(e){if(eM(e))return this.children.isEmpty()?new tF(null):new tF(null,this.children);{let t=eN(e),n=this.children.get(t);if(!n)return this;{let r;let i=n.remove(eR(e));return(r=i.isEmpty()?this.children.remove(t):this.children.insert(t,i),null===this.value&&r.isEmpty())?new tF(null):new tF(this.value,r)}}}get(e){if(eM(e))return this.value;{let t=eN(e),n=this.children.get(t);return n?n.get(eR(e)):null}}setTree(e,t){if(eM(e))return t;{let n;let r=eN(e),i=this.children.get(r)||new tF(null),s=i.setTree(eR(e),t);return n=s.isEmpty()?this.children.remove(r):this.children.insert(r,s),new tF(this.value,n)}}fold(e){return this.fold_(ex(),e)}fold_(e,t){let n={};return this.children.inorderTraversal((r,i)=>{n[r]=i.fold_(eL(e,r),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,ex(),t)}findOnPath_(e,t,n){let r=!!this.value&&n(t,this.value);if(r)return r;if(eM(e))return null;{let r=eN(e),i=this.children.get(r);return i?i.findOnPath_(eR(e),eL(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ex(),t)}foreachOnPath_(e,t,n){if(eM(e))return this;{this.value&&n(t,this.value);let r=eN(e),i=this.children.get(r);return i?i.foreachOnPath_(eR(e),eL(t,r),n):new tF(null)}}foreach(e){this.foreach_(ex(),e)}foreach_(e,t){this.children.inorderTraversal((n,r)=>{r.foreach_(eL(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tU{constructor(e){this.writeTree_=e}static empty(){return new tU(new tF(null))}}function tj(e,t,n){if(eM(t))return new tU(new tF(n));{let r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){let i=r.path,s=r.value,o=eF(i,t);return s=s.updateChild(o,n),new tU(e.writeTree_.set(i,s))}{let r=new tF(n),i=e.writeTree_.setTree(t,r);return new tU(i)}}}function tV(e,t,n){let r=e;return J(n,(e,n)=>{r=tj(r,eL(t,e),n)}),r}function tq(e,t){if(eM(t))return tU.empty();{let n=e.writeTree_.setTree(t,new tF(null));return new tU(n)}}function tB(e,t){return null!=tz(e,t)}function tz(e,t){let n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(eF(n.path,t)):null}function t$(e){let t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(e9,(e,n)=>{t.push(new eH(e,n))}):e.writeTree_.children.inorderTraversal((e,n)=>{null!=n.value&&t.push(new eH(e,n.value))}),t}function tW(e,t){if(eM(t))return e;{let n=tz(e,t);return new tU(null!=n?new tF(n):e.writeTree_.subtree(t))}}function tH(e){return e.writeTree_.isEmpty()}function tK(e,t){return function e(t,n,r){if(null!=n.value)return r.updateChild(t,n.value);{let i=null;return n.children.inorderTraversal((n,s)=>{".priority"===n?((0,_.hu)(null!==s.value,"Priority writes must always be leaf nodes"),i=s.value):r=e(eL(t,n),s,r)}),r.getChild(t).isEmpty()||null===i||(r=r.updateChild(eL(t,".priority"),i)),r}}(ex(),e.writeTree_,t)}function tG(e){return e.visible}function tY(e,t,n){let r=tU.empty();for(let i=0;i<e.length;++i){let s=e[i];if(t(s)){let e;let t=s.path;if(s.snap)eV(n,t)?r=tj(r,e=eF(n,t),s.snap):eV(t,n)&&(e=eF(t,n),r=tj(r,ex(),s.snap.getChild(e)));else if(s.children){if(eV(n,t))r=tV(r,e=eF(n,t),s.children);else if(eV(t,n)){if(eM(e=eF(t,n)))r=tV(r,ex(),s.children);else{let t=(0,_.DV)(s.children,eN(e));if(t){let n=t.getChild(eR(e));r=tj(r,ex(),n)}}}}else throw(0,_.g5)("WriteRecord should have .snap or .children")}}return r}function tQ(e,t,n,r,i){if(r||i){let s=tW(e.visibleWrites,t);if(!i&&tH(s))return n;if(!i&&null==n&&!tB(s,ex()))return null;{let s=tY(e.allWrites,function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(eV(e.path,t)||eV(t,e.path))},t),o=n||te.EMPTY_NODE;return tK(s,o)}}{let r=tz(e.visibleWrites,t);if(null!=r)return r;{let r=tW(e.visibleWrites,t);if(tH(r))return n;if(null==n&&!tB(r,ex()))return null;{let e=n||te.EMPTY_NODE;return tK(r,e)}}}}function tJ(e,t,n,r){return tQ(e.writeTree,e.treePath,t,n,r)}function tX(e,t){return function(e,t,n){let r=te.EMPTY_NODE,i=tz(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(e9,(e,t)=>{r=r.updateImmediateChild(e,t)}),r;if(n){let i=tW(e.visibleWrites,t);return n.forEachChild(e9,(e,t)=>{let n=tK(tW(i,new eS(e)),t);r=r.updateImmediateChild(e,n)}),t$(i).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}{let n=tW(e.visibleWrites,t);return t$(n).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}}(e.writeTree,e.treePath,t)}function tZ(e,t,n,r){return function(e,t,n,r,i){(0,_.hu)(r||i,"Either existingEventSnap or existingServerSnap must exist");let s=eL(t,n);if(tB(e.visibleWrites,s))return null;{let t=tW(e.visibleWrites,s);return tH(t)?i.getChild(n):tK(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function t0(e,t){var n,r;return n=e.writeTree,r=eL(e.treePath,t),tz(n.visibleWrites,r)}function t1(e,t,n){return function(e,t,n,r){let i=eL(t,n),s=tz(e.visibleWrites,i);if(null!=s)return s;if(!r.isCompleteForChild(n))return null;{let t=tW(e.visibleWrites,i);return tK(t,r.getNode().getImmediateChild(n))}}(e.writeTree,e.treePath,t,n)}function t2(e,t){return t4(eL(e.treePath,t),e.writeTree)}function t4(e,t){return{treePath:e,writeTree:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t9{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,n=e.childName;(0,_.hu)("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),(0,_.hu)(".priority"!==n,"Only non-priority child changes can be tracked.");let r=this.changeMap.get(n);if(r){let i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,tl(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,ta(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,to(n,e.snapshotNode));else if("child_changed"===t&&"child_changed"===i)this.changeMap.set(n,tl(n,e.snapshotNode,r.oldSnap));else throw(0,_.g5)("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}let t3=new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class t5{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let t=null!=this.optCompleteServerCache_?new tx(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return t1(this.writes_,e,t)}}getChildAfterChild(e,t,n){var r;let i=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:tL(this.viewCache_),s=function(e,t,n,r,i,s,o){let a;let l=tW(e.visibleWrites,t),u=tz(l,ex());if(null!=u)a=u;else{if(null==n)return[];a=tK(l,n)}if((a=a.withIndex(o)).isEmpty()||a.isLeafNode())return[];{let e=[],t=o.getCompare(),n=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o),i=n.getNext();for(;i&&e.length<1;)0!==t(i,r)&&e.push(i),i=n.getNext();return e}}((r=this.writes_).writeTree,r.treePath,i,t,0,n,e);return 0===s.length?null:s[0]}}function t6(e,t,n,r,i,s){let o=t.eventCache;if(null!=t0(r,n))return t;{let a,l;if(eM(n)){if((0,_.hu)(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){let n=tL(t),i=n instanceof te?n:te.EMPTY_NODE,o=tX(r,i);a=e.filter.updateFullNode(t.eventCache.getNode(),o,s)}else{let n=tJ(r,tL(t));a=e.filter.updateFullNode(t.eventCache.getNode(),n,s)}}else{let u=eN(n);if(".priority"===u){(0,_.hu)(1===eA(n),"Can't have a priority with additional path components");let i=o.getNode();l=t.serverCache.getNode();let s=tZ(r,n,i,l);a=null!=s?e.filter.updatePriority(i,s):o.getNode()}else{let h;let c=eR(n);if(o.isCompleteForChild(u)){l=t.serverCache.getNode();let e=tZ(r,n,o.getNode(),l);h=null!=e?o.getNode().getImmediateChild(u).updateChild(c,e):o.getNode().getImmediateChild(u)}else h=t1(r,u,t.serverCache);a=null!=h?e.filter.updateChild(o.getNode(),u,h,c,i,s):o.getNode()}}return tP(t,a,o.isFullyInitialized()||eM(n),e.filter.filtersNodes())}}function t7(e,t,n,r,i,s,o,a){let l;let u=t.serverCache,h=o?e.filter:e.filter.getIndexedFilter();if(eM(n))l=h.updateFullNode(u.getNode(),r,null);else if(h.filtersNodes()&&!u.isFiltered()){let e=u.getNode().updateChild(n,r);l=h.updateFullNode(u.getNode(),e,null)}else{let e=eN(n);if(!u.isCompleteForPath(n)&&eA(n)>1)return t;let i=eR(n),s=u.getNode().getImmediateChild(e),o=s.updateChild(i,r);l=".priority"===e?h.updatePriority(u.getNode(),o):h.updateChild(u.getNode(),e,o,i,t3,null)}let c=tD(t,l,u.isFullyInitialized()||eM(n),h.filtersNodes()),d=new t5(i,c,s);return t6(e,c,n,i,d,a)}function t8(e,t,n,r,i,s,o){let a,l;let u=t.eventCache,h=new t5(i,t,s);if(eM(n))l=e.filter.updateFullNode(t.eventCache.getNode(),r,o),a=tP(t,l,!0,e.filter.filtersNodes());else{let i=eN(n);if(".priority"===i)l=e.filter.updatePriority(t.eventCache.getNode(),r),a=tP(t,l,u.isFullyInitialized(),u.isFiltered());else{let s;let l=eR(n),c=u.getNode().getImmediateChild(i);if(eM(l))s=r;else{let e=h.getCompleteChild(i);s=null!=e?".priority"===eP(l)&&e.getChild(eO(l)).isEmpty()?e:e.updateChild(l,r):te.EMPTY_NODE}if(c.equals(s))a=t;else{let n=e.filter.updateChild(u.getNode(),i,s,l,h,o);a=tP(t,n,u.isFullyInitialized(),e.filter.filtersNodes())}}}return a}function ne(e,t){return e.eventCache.isCompleteForChild(t)}function nt(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function nn(e,t,n,r,i,s,o,a){let l;if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let u=t;l=eM(n)?r:new tF(null).setTree(n,r);let h=t.serverCache.getNode();return l.children.inorderTraversal((n,r)=>{if(h.hasChild(n)){let l=t.serverCache.getNode().getImmediateChild(n),h=nt(e,l,r);u=t7(e,u,new eS(n),h,i,s,o,a)}}),l.children.inorderTraversal((n,r)=>{let l=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!h.hasChild(n)&&!l){let l=t.serverCache.getNode().getImmediateChild(n),h=nt(e,l,r);u=t7(e,u,new eS(n),h,i,s,o,a)}}),u}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let n=this.query_._queryParams,r=new tu(n.getIndex()),i=n.loadsAllData()?new tu(n.getIndex()):n.hasLimit()?new tc(n):new th(n);this.processor_={filter:i};let s=t.serverCache,o=t.eventCache,a=r.updateFullNode(te.EMPTY_NODE,s.getNode(),null),l=i.updateFullNode(te.EMPTY_NODE,o.getNode(),null),u=new tx(a,s.isFullyInitialized(),r.filtersNodes()),h=new tx(l,o.isFullyInitialized(),i.filtersNodes());this.viewCache_=tR(h,u),this.eventGenerator_=new tN(this.query_)}get query(){return this.query_}}function ni(e){return 0===e.eventRegistrations_.length}function ns(e,t,n){let r=[];if(n){(0,_.hu)(null==t,"A cancel should cancel all event registrations.");let i=e.query._path;e.eventRegistrations_.forEach(e=>{let t=e.createCancelEvent(n,i);t&&r.push(t)})}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){let i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function no(e,t,n,r){var i,s;t.type===m.MERGE&&null!==t.source.queryId&&((0,_.hu)(tL(e.viewCache_),"We should always have a full cache before handling merges"),(0,_.hu)(tO(e.viewCache_),"Missing event cache, even though we have a server cache"));let o=e.viewCache_,a=function(e,t,n,r,i){let s,o;let a=new t9;if(n.type===m.OVERWRITE)n.source.fromUser?s=t8(e,t,n.path,n.snap,r,i,a):((0,_.hu)(n.source.fromServer,"Unknown source."),o=n.source.tagged||t.serverCache.isFiltered()&&!eM(n.path),s=t7(e,t,n.path,n.snap,r,i,o,a));else if(n.type===m.MERGE){var l,u;let h;n.source.fromUser?(l=n.path,u=n.children,h=t,u.foreach((n,s)=>{let o=eL(l,n);ne(t,eN(o))&&(h=t8(e,h,o,s,r,i,a))}),u.foreach((n,s)=>{let o=eL(l,n);ne(t,eN(o))||(h=t8(e,h,o,s,r,i,a))}),s=h):((0,_.hu)(n.source.fromServer,"Unknown source."),o=n.source.tagged||t.serverCache.isFiltered(),s=nn(e,t,n.path,n.children,r,i,o,a))}else if(n.type===m.ACK_USER_WRITE)s=n.revert?function(e,t,n,r,i,s){let o;if(null!=t0(r,n))return t;{let a;let l=new t5(r,t,i),u=t.eventCache.getNode();if(eM(n)||".priority"===eN(n)){let n;if(t.serverCache.isFullyInitialized())n=tJ(r,tL(t));else{let e=t.serverCache.getNode();(0,_.hu)(e instanceof te,"serverChildren would be complete if leaf node"),n=tX(r,e)}a=e.filter.updateFullNode(u,n,s)}else{let i=eN(n),h=t1(r,i,t.serverCache);null==h&&t.serverCache.isCompleteForChild(i)&&(h=u.getImmediateChild(i)),(a=null!=h?e.filter.updateChild(u,i,h,eR(n),l,s):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(u,i,te.EMPTY_NODE,eR(n),l,s):u).isEmpty()&&t.serverCache.isFullyInitialized()&&(o=tJ(r,tL(t))).isLeafNode()&&(a=e.filter.updateFullNode(a,o,s))}return o=t.serverCache.isFullyInitialized()||null!=t0(r,ex()),tP(t,a,o,e.filter.filtersNodes())}}(e,t,n.path,r,i,a):function(e,t,n,r,i,s,o){if(null!=t0(i,n))return t;let a=t.serverCache.isFiltered(),l=t.serverCache;if(null!=r.value){if(eM(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return t7(e,t,n,l.getNode().getChild(n),i,s,a,o);if(!eM(n))return t;{let r=new tF(null);return l.getNode().forEachChild(eY,(e,t)=>{r=r.set(new eS(e),t)}),nn(e,t,n,r,i,s,a,o)}}{let u=new tF(null);return r.foreach((e,t)=>{let r=eL(n,e);l.isCompleteForPath(r)&&(u=u.set(e,l.getNode().getChild(r)))}),nn(e,t,n,u,i,s,a,o)}}(e,t,n.path,n.affectedTree,r,i,a);else if(n.type===m.LISTEN_COMPLETE)s=function(e,t,n,r,i){let s=t.serverCache,o=tD(t,s.getNode(),s.isFullyInitialized()||eM(n),s.isFiltered());return t6(e,o,n,r,t3,i)}(e,t,n.path,r,a);else throw(0,_.g5)("Unknown operation type: "+n.type);let h=a.getChanges();return function(e,t,n){let r=t.eventCache;if(r.isFullyInitialized()){let i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=tO(e);!(n.length>0)&&e.eventCache.isFullyInitialized()&&(!i||r.getNode().equals(s))&&r.getNode().getPriority().equals(s.getPriority())||n.push(ts(tO(t)))}}(t,s,h),{viewCache:s,changes:h}}(e.processor_,o,t,n,r);return i=e.processor_,s=a.viewCache,(0,_.hu)(s.eventCache.getNode().isIndexed(i.filter.getIndex()),"Event snap not indexed"),(0,_.hu)(s.serverCache.getNode().isIndexed(i.filter.getIndex()),"Server snap not indexed"),(0,_.hu)(a.viewCache.serverCache.isFullyInitialized()||!o.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=a.viewCache,na(e,a.changes,a.viewCache.eventCache.getNode(),null)}function na(e,t,n,r){let i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){let i=[],s=[];return t.forEach(t=>{if("child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)){var n;s.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))}}),tA(e,i,"child_removed",t,r,n),tA(e,i,"child_added",t,r,n),tA(e,i,"child_moved",s,r,n),tA(e,i,"child_changed",t,r,n),tA(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}class nl{constructor(){this.views=new Map}}function nu(e,t,n,r){let i=t.source.queryId;if(null!==i){let s=e.views.get(i);return(0,_.hu)(null!=s,"SyncTree gave us an op for an invalid query."),no(s,t,n,r)}{let i=[];for(let s of e.views.values())i=i.concat(no(s,t,n,r));return i}}function nh(e,t,n,r,i){let s=t._queryIdentifier,o=e.views.get(s);if(!o){let e=tJ(n,i?r:null),s=!1;e?s=!0:r instanceof te?(e=tX(n,r),s=!1):(e=te.EMPTY_NODE,s=!1);let o=tR(new tx(e,s,!1),new tx(r,i,!1));return new nr(t,o)}return o}function nc(e){let t=[];for(let n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function nd(e,t){let n=null;for(let r of e.views.values())n=n||function(e,t){let n=tL(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!eM(t)&&!n.getImmediateChild(eN(t)).isEmpty())?n.getChild(t):null}(r,t);return n}function nf(e,t){let n=t._queryParams;if(n.loadsAllData())return nm(e);{let n=t._queryIdentifier;return e.views.get(n)}}function np(e){return null!=nm(e)}function nm(e){for(let t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}let ng=1;class ny{constructor(e){this.listenProvider_=e,this.syncPointTree_=new tF(null),this.pendingWriteTree_={visibleWrites:tU.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function n_(e,t,n,r,i){var s,o;return(s=e.pendingWriteTree_,o=i,(0,_.hu)(r>s.lastWriteId,"Stacking an older write on top of newer ones"),void 0===o&&(o=!0),s.allWrites.push({path:t,snap:n,writeId:r,visible:o}),o&&(s.visibleWrites=tj(s.visibleWrites,t,n)),s.lastWriteId=r,i)?nC(e,new tk(tb(),t,n)):[]}function nv(e,t,n=!1){let r=function(e,t){for(let n=0;n<e.allWrites.length;n++){let r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t),i=function(e,t){let n=e.allWrites.findIndex(e=>e.writeId===t);(0,_.hu)(n>=0,"removeWrite called with nonexistent writeId.");let r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,s=!1,o=e.allWrites.length-1;for(;i&&o>=0;){let t=e.allWrites[o];t.visible&&(o>=n&&function(e,t){if(e.snap)return eV(e.path,t);for(let n in e.children)if(e.children.hasOwnProperty(n)&&eV(eL(e.path,n),t))return!0;return!1}(t,r.path)?i=!1:eV(r.path,t.path)&&(s=!0)),o--}if(!i)return!1;if(s){var a;return(a=e).visibleWrites=tY(a.allWrites,tG,ex()),a.allWrites.length>0?a.lastWriteId=a.allWrites[a.allWrites.length-1].writeId:a.lastWriteId=-1,!0}if(r.snap)e.visibleWrites=tq(e.visibleWrites,r.path);else{let t=r.children;J(t,t=>{e.visibleWrites=tq(e.visibleWrites,eL(r.path,t))})}return!0}(e.pendingWriteTree_,t);if(!i)return[];{let t=new tF(null);return null!=r.snap?t=t.set(ex(),!0):J(r.children,e=>{t=t.set(new eS(e),!0)}),nC(e,new tI(r.path,t,n))}}function nw(e,t,n){return nC(e,new tk(tT(),t,n))}function nb(e,t,n,r,i=!1){let s=t._path,o=e.syncPointTree_.get(s),a=[];if(o&&("default"===t._queryIdentifier||null!=nf(o,t))){let l=function(e,t,n,r){let i=t._queryIdentifier,s=[],o=[],a=np(e);if("default"===i)for(let[t,i]of e.views.entries())o=o.concat(ns(i,n,r)),ni(i)&&(e.views.delete(t),i.query._queryParams.loadsAllData()||s.push(i.query));else{let t=e.views.get(i);t&&(o=o.concat(ns(t,n,r)),ni(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||s.push(t.query)))}return a&&!np(e)&&s.push(new((0,_.hu)(c,"Reference.ts has not been loaded"),c)(t._repo,t._path)),{removed:s,events:o}}(o,t,n,r);0===o.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(s));let u=l.removed;if(a=l.events,!i){let n=-1!==u.findIndex(e=>e._queryParams.loadsAllData()),i=e.syncPointTree_.findOnPath(s,(e,t)=>np(t));if(n&&!i){let t=e.syncPointTree_.subtree(s);if(!t.isEmpty()){let n=t.fold((e,t,n)=>{if(t&&np(t)){let e=nm(t);return[e]}{let e=[];return t&&(e=nc(t)),J(n,(t,n)=>{e=e.concat(n)}),e}});for(let t=0;t<n.length;++t){let r=n[t],i=r.query,s=nk(e,r);e.listenProvider_.startListening(nP(i),nS(e,i),s.hashFn,s.onComplete)}}}i||!(u.length>0)||r||(n?e.listenProvider_.stopListening(nP(t),null):u.forEach(t=>{let n=e.queryToTagMap.get(nx(t));e.listenProvider_.stopListening(nP(t),n)}))}!function(e,t){for(let n=0;n<t.length;++n){let r=t[n];if(!r._queryParams.loadsAllData()){let t=nx(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,u)}return a}function nT(e,t,n,r){let i=nN(e,r);if(null==i)return[];{let r=nA(i),s=r.path,o=r.queryId,a=eF(s,t),l=new tk(tE(o),a,n);return nR(e,s,l)}}function nE(e,t,n,r=!1){var i;let s;let o=t._path,a=null,l=!1;e.syncPointTree_.foreachOnPath(o,(e,t)=>{let n=eF(e,o);a=a||nd(t,n),l=l||np(t)});let u=e.syncPointTree_.get(o);if(u?(l=l||np(u),a=a||nd(u,ex())):(u=new nl,e.syncPointTree_=e.syncPointTree_.set(o,u)),null!=a)s=!0;else{s=!1,a=te.EMPTY_NODE;let t=e.syncPointTree_.subtree(o);t.foreachChild((e,t)=>{let n=nd(t,ex());n&&(a=a.updateImmediateChild(e,n))})}let h=null!=nf(u,t);if(!h&&!t._queryParams.loadsAllData()){let n=nx(t);(0,_.hu)(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");let r=ng++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let c=(i=e.pendingWriteTree_,t4(o,i)),d=function(e,t,n,r,i,s){let o=nh(e,t,r,i,s);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),!function(e,t){e.eventRegistrations_.push(t)}(o,n),function(e,t){let n=e.viewCache_.eventCache,r=[];if(!n.getNode().isLeafNode()){let e=n.getNode();e.forEachChild(e9,(e,t)=>{r.push(to(e,t))})}return n.isFullyInitialized()&&r.push(ts(n.getNode())),na(e,r,n.getNode(),t)}(o,n)}(u,t,n,c,a,s);if(!h&&!l&&!r){let n=nf(u,t);d=d.concat(function(e,t,n){let r=t._path,i=nS(e,t),s=nk(e,n),o=e.listenProvider_.startListening(nP(t),i,s.hashFn,s.onComplete),a=e.syncPointTree_.subtree(r);if(i)(0,_.hu)(!np(a.value),"If we're adding a query, it shouldn't be shadowed");else{let t=a.fold((e,t,n)=>{if(!eM(e)&&t&&np(t))return[nm(t).query];{let e=[];return t&&(e=e.concat(nc(t).map(e=>e.query))),J(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){let r=t[n];e.listenProvider_.stopListening(nP(r),nS(e,r))}}return o}(e,t,n))}return d}function nI(e,t,n){let r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,(e,n)=>{let r=eF(e,t),i=nd(n,r);if(i)return i});return tQ(r,t,i,n,!0)}function nC(e,t){var n;return function e(t,n,r,i){if(eM(t.path))return function e(t,n,r,i){let s=n.get(ex());null==r&&null!=s&&(r=nd(s,ex()));let o=[];return n.children.inorderTraversal((n,s)=>{let a=r?r.getImmediateChild(n):null,l=t2(i,n),u=t.operationForChild(n);u&&(o=o.concat(e(u,s,a,l)))}),s&&(o=o.concat(nu(s,t,i,r))),o}(t,n,r,i);{let s=n.get(ex());null==r&&null!=s&&(r=nd(s,ex()));let o=[],a=eN(t.path),l=t.operationForChild(a),u=n.children.get(a);if(u&&l){let t=r?r.getImmediateChild(a):null,n=t2(i,a);o=o.concat(e(l,u,t,n))}return s&&(o=o.concat(nu(s,t,i,r))),o}}(t,e.syncPointTree_,null,(n=e.pendingWriteTree_,t4(ex(),n)))}function nk(e,t){let n=t.query,r=nS(e,n);return{hashFn:()=>{let e=t.viewCache_.serverCache.getNode()||te.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t){var i;return r?function(e,t,n){let r=nN(e,n);if(!r)return[];{let n=nA(r),i=n.path,s=n.queryId,o=eF(i,t),a=new tC(tE(s),o);return nR(e,i,a)}}(e,n._path,r):(i=n._path,nC(e,new tC(tT(),i)))}{let r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");let r=Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return nb(e,n,null,r)}}}}function nS(e,t){let n=nx(t);return e.queryToTagMap.get(n)}function nx(e){return e._path.toString()+"$"+e._queryIdentifier}function nN(e,t){return e.tagToQueryMap.get(t)}function nA(e){let t=e.indexOf("$");return(0,_.hu)(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new eS(e.substr(0,t))}}function nR(e,t,n){let r=e.syncPointTree_.get(t);(0,_.hu)(r,"Missing sync point for query tag that we're tracking");let i=t4(t,e.pendingWriteTree_);return nu(r,n,i,null)}function nP(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new((0,_.hu)(d,"Reference.ts has not been loaded"),d)(e._repo,e._path):e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{constructor(e){this.node_=e}getImmediateChild(e){let t=this.node_.getImmediateChild(e);return new nD(t)}node(){return this.node_}}class nO{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){let t=eL(this.path_,e);return new nO(this.syncTree_,t)}node(){return nI(this.syncTree_,this.path_)}}let nL=function(e,t,n){return e&&"object"==typeof e?((0,_.hu)(".sv"in e,"Unexpected leaf node or priority contents"),"string"==typeof e[".sv"])?nM(e[".sv"],t,n):"object"==typeof e[".sv"]?nF(e[".sv"],t):void(0,_.hu)(!1,"Unexpected server value: "+JSON.stringify(e,null,2)):e},nM=function(e,t,n){if("timestamp"===e)return n.timestamp;(0,_.hu)(!1,"Unexpected server value: "+e)},nF=function(e,t,n){e.hasOwnProperty("increment")||(0,_.hu)(!1,"Unexpected server value: "+JSON.stringify(e,null,2));let r=e.increment;"number"!=typeof r&&(0,_.hu)(!1,"Unexpected increment value: "+r);let i=t.node();if((0,_.hu)(null!=i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;let s=i.getValue();return"number"!=typeof s?r:s+r},nU=function(e,t,n,r){return nV(t,new nO(n,e),r)},nj=function(e,t,n){return nV(e,new nD(t),n)};function nV(e,t,n){let r;let i=e.getPriority().val(),s=nL(i,t.getImmediateChild(".priority"),n);if(!e.isLeafNode())return r=e,s!==e.getPriority().val()&&(r=r.updatePriority(new e4(s))),e.forEachChild(e9,(e,i)=>{let s=nV(i,t.getImmediateChild(e),n);s!==i&&(r=r.updateImmediateChild(e,s))}),r;{let r=nL(e.getValue(),t,n);return r!==e.getValue()||s!==e.getPriority().val()?new e4(r,tn(s)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nq{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function nB(e,t){let n=t instanceof eS?t:new eS(t),r=e,i=eN(n);for(;null!==i;){let e=(0,_.DV)(r.node.children,i)||{children:{},childCount:0};r=new nq(i,r,e),i=eN(n=eR(n))}return r}function nz(e){return e.node.value}function n$(e,t){e.node.value=t,function e(t){null!==t.parent&&function(t,n,r){let i=void 0===nz(r)&&!nW(r),s=(0,_.r3)(t.node.children,n);i&&s?(delete t.node.children[n],t.node.childCount--,e(t)):i||s||(t.node.children[n]=r.node,t.node.childCount++,e(t))}(t.parent,t.name,t)}(e)}function nW(e){return e.node.childCount>0}function nH(e,t){J(e.node.children,(n,r)=>{t(new nq(n,e,r))})}function nK(e){return new eS(null===e.parent?e.name:nK(e.parent)+"/"+e.name)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nG=/[\[\].#$\/\u0000-\u001F\u007F]/,nY=/[\[\].#$\u0000-\u001F\u007F]/,nQ=function(e){return"string"==typeof e&&0!==e.length&&!nG.test(e)},nJ=function(e){return"string"==typeof e&&0!==e.length&&!nY.test(e)},nX=function(e){return null===e||"string"==typeof e||"number"==typeof e&&!B(e)||e&&"object"==typeof e&&(0,_.r3)(e,".sv")},nZ=function(e,t,n,r){r&&void 0===t||n0((0,_.gK)(e,"value"),t,n)},n0=function(e,t,n){let r=n instanceof eS?new eq(n,e):n;if(void 0===t)throw Error(e+"contains undefined "+ez(r));if("function"==typeof t)throw Error(e+"contains a function "+ez(r)+" with contents = "+t.toString());if(B(t))throw Error(e+"contains "+t.toString()+" "+ez(r));if("string"==typeof t&&t.length>3495253.3333333335&&(0,_.ug)(t)>10485760)throw Error(e+"contains a string greater than 10485760 utf8 bytes "+ez(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){let n=!1,i=!1;if(J(t,(t,s)=>{var o;if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!nQ(t)))throw Error(e+" contains an invalid key ("+t+") "+ez(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');(o=r).parts_.length>0&&(o.byteLength_+=1),o.parts_.push(t),o.byteLength_+=(0,_.ug)(t),eB(o),n0(e,s,r),function(e){let t=e.parts_.pop();e.byteLength_-=(0,_.ug)(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)}),n&&i)throw Error(e+' contains ".value" child '+ez(r)+" in addition to actual children.")}},n1=function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];let i=eD(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!nQ(i[t]))throw Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(eU);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&eV(i,r))throw Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},n2=function(e,t,n,r){if(r&&void 0===t)return;let i=(0,_.gK)(e,"values");if(!(t&&"object"==typeof t)||Array.isArray(t))throw Error(i+" must be an object containing the children to replace.");let s=[];J(t,(e,t)=>{let r=new eS(e);if(n0(i,t,eL(n,r)),".priority"===eP(r)&&!nX(t))throw Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(r)}),n1(i,s)},n4=function(e,t,n,r){if((!r||void 0!==n)&&!nQ(n))throw Error((0,_.gK)(e,t)+'was an invalid key = "'+n+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')},n9=function(e,t,n,r){if((!r||void 0!==n)&&!nJ(n))throw Error((0,_.gK)(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},n3=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),n9(e,t,n,r)},n5=function(e,t){if(".info"===eN(t))throw Error(e+" failed = Can't modify data under /.info/")},n6=function(e,t){var n;let r=t.path.toString();if("string"!=typeof t.repoInfo.host||0===t.repoInfo.host.length||!nQ(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==r.length&&((n=r)&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),!nJ(n)))throw Error((0,_.gK)(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n7{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function n8(e,t){let n=null;for(let r=0;r<t.length;r++){let i=t[r],s=i.getPath();null===n||ej(s,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:s}),n.events.push(i)}n&&e.eventLists_.push(n)}function re(e,t,n){n8(e,n),rn(e,e=>ej(e,t))}function rt(e,t,n){n8(e,n),rn(e,e=>eV(e,t)||eV(t,e))}function rn(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){let i=e.eventLists_[r];if(i){let s=i.path;t(s)?(function(e){for(let t=0;t<e.events.length;t++){let n=e.events[t];if(null!==n){e.events[t]=null;let r=n.getEventRunner();D&&M("event: "+n.toString()),et(r)}}}(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}class rr{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new n7,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ty(),this.transactionQueueTree_=new nq,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ri(e){let t=e.infoData_.getNode(new eS(".info/serverTimeOffset")),n=t.val()||0;return new Date().getTime()+n}function rs(e){var t;return(t=t={timestamp:ri(e)}).timestamp=t.timestamp||new Date().getTime(),t}function ro(e,t,n,r,i){e.dataUpdateCount++;let s=new eS(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(i){if(r){let t=(0,_.UI)(n,e=>tn(e));o=function(e,t,n,r){let i=nN(e,r);if(!i)return[];{let r=nA(i),s=r.path,o=r.queryId,a=eF(s,t),l=tF.fromObject(n),u=new tS(tE(o),a,l);return nR(e,s,u)}}(e.serverSyncTree_,s,t,i)}else{let t=tn(n);o=nT(e.serverSyncTree_,s,t,i)}}else if(r){let t=(0,_.UI)(n,e=>tn(e));o=function(e,t,n){let r=tF.fromObject(n);return nC(e,new tS(tT(),t,r))}(e.serverSyncTree_,s,t)}else{let t=tn(n);o=nw(e.serverSyncTree_,s,t)}let a=s;o.length>0&&(a=rp(e,s)),rt(e.eventQueue_,a,o)}function ra(e,t){rl(e,"connected",t),!1===t&&function(e){rc(e,"onDisconnectEvents");let t=rs(e),n=ty();t_(e.onDisconnect_,ex(),(r,i)=>{let s=nU(r,i,e.serverSyncTree_,t);!function e(t,n,r){if(eM(n))t.value=r,t.children.clear();else if(null!==t.value)t.value=t.value.updateChild(n,r);else{let i=eN(n);t.children.has(i)||t.children.set(i,ty());let s=t.children.get(i);e(s,n=eR(n),r)}}(n,r,s)});let r=[];t_(n,ex(),(t,n)=>{r=r.concat(nw(e.serverSyncTree_,t,n));let i=r_(e,t);rp(e,i)}),e.onDisconnect_=ty(),rt(e.eventQueue_,ex(),r)}(e)}function rl(e,t,n){let r=new eS("/.info/"+t),i=tn(n);e.infoData_.updateSnapshot(r,i);let s=nw(e.infoSyncTree_,r,i);rt(e.eventQueue_,r,s)}function ru(e){return e.nextWriteId_++}function rh(e,t,n){let r;r=".info"===eN(t._path)?nb(e.infoSyncTree_,t,n):nb(e.serverSyncTree_,t,n),re(e.eventQueue_,t._path,r)}function rc(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),M(n,...t)}function rd(e,t,n,r){t&&et(()=>{if("ok"===n)t(null);else{let e=(n||"error").toUpperCase(),i=e;r&&(i+=": "+r);let s=Error(i);s.code=e,t(s)}})}function rf(e,t,n){return nI(e.serverSyncTree_,t,n)||te.EMPTY_NODE}function rp(e,t){let n=rm(e,t),r=nK(n),i=rg(e,n);return function(e,t,n){if(0===t.length)return;let r=[],i=[],s=t.filter(e=>0===e.status),o=s.map(e=>e.currentWriteId);for(let s=0;s<t.length;s++){let a=t[s],l=eF(n,a.path),u=!1,h;if((0,_.hu)(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null."),4===a.status)u=!0,h=a.abortReason,i=i.concat(nv(e.serverSyncTree_,a.currentWriteId,!0));else if(0===a.status){if(a.retryCount>=25)u=!0,h="maxretry",i=i.concat(nv(e.serverSyncTree_,a.currentWriteId,!0));else{let n=rf(e,a.path,o);a.currentInputSnapshot=n;let r=t[s].update(n.val());if(void 0!==r){n0("transaction failed: Data returned ",r,a.path);let t=tn(r),s="object"==typeof r&&null!=r&&(0,_.r3)(r,".priority");s||(t=t.updatePriority(n.getPriority()));let l=a.currentWriteId,u=rs(e),h=nj(t,n,u);a.currentOutputSnapshotRaw=t,a.currentOutputSnapshotResolved=h,a.currentWriteId=ru(e),o.splice(o.indexOf(l),1),i=(i=i.concat(n_(e.serverSyncTree_,a.path,h,a.currentWriteId,a.applyLocally))).concat(nv(e.serverSyncTree_,l,!0))}else u=!0,h="nodata",i=i.concat(nv(e.serverSyncTree_,a.currentWriteId,!0))}}rt(e.eventQueue_,n,i),i=[],u&&(t[s].status=2,setTimeout(t[s].unwatcher,Math.floor(0)),t[s].onComplete&&("nodata"===h?r.push(()=>t[s].onComplete(null,!1,t[s].currentInputSnapshot)):r.push(()=>t[s].onComplete(Error(h),!1,null))))}ry(e,e.transactionQueueTree_);for(let e=0;e<r.length;e++)et(r[e]);(function e(t,n=t.transactionQueueTree_){if(n||ry(t,n),nz(n)){let r=rg(t,n);(0,_.hu)(r.length>0,"Sending zero length transaction queue");let i=r.every(e=>0===e.status);i&&function(t,n,r){let i=r.map(e=>e.currentWriteId),s=rf(t,n,i),o=s,a=s.hash();for(let e=0;e<r.length;e++){let t=r[e];(0,_.hu)(0===t.status,"tryToSendTransactionQueue_: items in queue should all be run."),t.status=1,t.retryCount++;let i=eF(n,t.path);o=o.updateChild(i,t.currentOutputSnapshotRaw)}let l=o.val(!0);t.server_.put(n.toString(),l,i=>{rc(t,"transaction put response",{path:n.toString(),status:i});let s=[];if("ok"===i){let i=[];for(let e=0;e<r.length;e++)r[e].status=2,s=s.concat(nv(t.serverSyncTree_,r[e].currentWriteId)),r[e].onComplete&&i.push(()=>r[e].onComplete(null,!0,r[e].currentOutputSnapshotResolved)),r[e].unwatcher();ry(t,nB(t.transactionQueueTree_,n)),e(t,t.transactionQueueTree_),rt(t.eventQueue_,n,s);for(let e=0;e<i.length;e++)et(i[e])}else{if("datastale"===i)for(let e=0;e<r.length;e++)3===r[e].status?r[e].status=4:r[e].status=0;else{V("transaction at "+n.toString()+" failed: "+i);for(let e=0;e<r.length;e++)r[e].status=4,r[e].abortReason=i}rp(t,n)}},a)}(t,nK(n),r)}else nW(n)&&nH(n,n=>{e(t,n)})})(e,e.transactionQueueTree_)}(e,i,r),r}function rm(e,t){let n;let r=e.transactionQueueTree_;for(n=eN(t);null!==n&&void 0===nz(r);)r=nB(r,n),n=eN(t=eR(t));return r}function rg(e,t){let n=[];return function e(t,n,r){let i=nz(n);if(i)for(let e=0;e<i.length;e++)r.push(i[e]);nH(n,n=>{e(t,n,r)})}(e,t,n),n.sort((e,t)=>e.order-t.order),n}function ry(e,t){let n=nz(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,n$(t,n.length>0?n:void 0)}nH(t,t=>{ry(e,t)})}function r_(e,t){let n=nK(rm(e,t)),r=nB(e.transactionQueueTree_,t);return!function(e,t,n){let r=e.parent;for(;null!==r;){if(t(r))return!0;r=r.parent}}(r,t=>{rv(e,t)}),rv(e,r),!function e(t,n,r,i){r&&!i&&n(t),nH(t,t=>{e(t,n,!0,i)}),r&&i&&n(t)}(r,t=>{rv(e,t)}),n}function rv(e,t){let n=nz(t);if(n){let r=[],i=[],s=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?((0,_.hu)(s===t-1,"All SENT items should be at beginning of queue."),s=t,n[t].status=3,n[t].abortReason="set"):((0,_.hu)(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(nv(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,Error("set"),!1,null))));-1===s?n$(t,void 0):n.length=s+1,rt(e.eventQueue_,nK(t),i);for(let e=0;e<r.length;e++)et(r[e])}}let rw=function(e,t){let n=rb(e),r=n.namespace;"firebase.com"===n.domain&&j(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||j("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||q();let i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new eh(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new eS(n.pathString)}},rb=function(e){let t="",n="",r="",i="",s="",o=!0,a="https",l=443;if("string"==typeof e){let u=e.indexOf("//");u>=0&&(a=e.substring(0,u-1),e=e.substring(u+2));let h=e.indexOf("/");-1===h&&(h=e.length);let c=e.indexOf("?");-1===c&&(c=e.length),t=e.substring(0,Math.min(h,c)),h<c&&(i=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="",n=e.split("/");for(let e=0;e<n.length;e++)if(n[e].length>0){let r=n[e];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch(e){}t+="/"+r}return t}(e.substring(h,c)));let d=function(e){let t={};for(let n of("?"===e.charAt(0)&&(e=e.substring(1)),e.split("&"))){if(0===n.length)continue;let r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):V(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,c)));(u=t.indexOf(":"))>=0?(o="https"===a||"wss"===a,l=parseInt(t.substring(u+1),10)):u=t.length;let f=t.slice(0,u);if("localhost"===f.toLowerCase())n="localhost";else if(f.split(".").length<=2)n=f;else{let e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),s=r}"ns"in d&&(s=d.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}},rT="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",rE=function(){let e=0,t=[];return function(n){let r;let i=n===e;e=n;let s=Array(8);for(r=7;r>=0;r--)s[r]=rT.charAt(n%64),n=Math.floor(n/64);(0,_.hu)(0===n,"Cannot push at time == 0");let o=s.join("");if(i){for(r=11;r>=0&&63===t[r];r--)t[r]=0;t[r]++}else for(r=0;r<12;r++)t[r]=Math.floor(64*Math.random());for(r=0;r<12;r++)o+=rT.charAt(t[r]);return(0,_.hu)(20===o.length,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){let e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+(0,_.Wl)(this.snapshot.exportVal())}}class rC{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return(0,_.hu)(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return eM(this._path)?null:eP(this._path)}get ref(){return new rA(this._repo,this._path)}get _queryIdentifier(){let e=tp(this._queryParams),t=Y(e);return"{}"===t?"default":t}get _queryObject(){return tp(this._queryParams)}isEqual(e){if(!((e=(0,_.m9)(e))instanceof rS))return!1;let t=this._repo===e._repo,n=ej(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}function rx(e){let t=null,n=null;if(e.hasStart()&&(t=e.getIndexStartValue()),e.hasEnd()&&(n=e.getIndexEndValue()),e.getIndex()===eY){let r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(e.hasStart()){let n=e.getIndexStartName();if(n!==$)throw Error(r);if("string"!=typeof t)throw Error(i)}if(e.hasEnd()){let t=e.getIndexEndName();if(t!==W)throw Error(r);if("string"!=typeof n)throw Error(i)}}else if(e.getIndex()===e9){if(null!=t&&!nX(t)||null!=n&&!nX(n))throw Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if((0,_.hu)(e.getIndex() instanceof tr||e.getIndex()===ti,"unknown index type."),null!=t&&"object"==typeof t||null!=n&&"object"==typeof n)throw Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function rN(e){if(e.hasStart()&&e.hasEnd()&&e.hasLimit()&&!e.hasAnchoredLimit())throw Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class rA extends rS{constructor(e,t){super(e,t,new td,!1)}get parent(){let e=eO(this._path);return null===e?null:new rA(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class rR{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){let t=new eS(e),n=rD(this.ref,e);return new rR(this._node.getChild(t),n,e9)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;let t=this._node;return!!t.forEachChild(this._index,(t,n)=>e(new rR(n,rD(this.ref,t),e9)))}hasChild(e){let t=new eS(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function rP(e,t){return(e=(0,_.m9)(e))._checkNotDeleted("ref"),void 0!==t?rD(e._root,t):e._root}function rD(e,t){return null===eN((e=(0,_.m9)(e))._path)?n3("child","path",t,!1):n9("child","path",t,!1),new rA(e._repo,eL(e._path,t))}function rO(e,t){let n;n5("push",(e=(0,_.m9)(e))._path),nZ("push",t,e._path,!0);let r=ri(e._repo),i=rE(r),s=rD(e,i),o=rD(e,i);return n=null!=t?rL(o,t).then(()=>o):Promise.resolve(o),s.then=n.then.bind(n),s.catch=n.then.bind(n,void 0),s}function rL(e,t){n5("set",(e=(0,_.m9)(e))._path),nZ("set",t,e._path,!1);let n=new _.BH;return!function(e,t,n,r,i){rc(e,"set",{path:t.toString(),value:n,priority:r});let s=rs(e),o=tn(n,r),a=nI(e.serverSyncTree_,t),l=nj(o,a,s),u=ru(e),h=n_(e.serverSyncTree_,t,l,u,!0);n8(e.eventQueue_,h),e.server_.put(t.toString(),o.val(!0),(n,r)=>{let s="ok"===n;s||V("set at "+t+" failed: "+n);let o=nv(e.serverSyncTree_,u,!s);rt(e.eventQueue_,t,o),rd(e,i,n,r)});let c=r_(e,t);rp(e,c),rt(e.eventQueue_,c,[])}(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function rM(e,t){n2("update",t,e._path,!1);let n=new _.BH;return!function(e,t,n,r){rc(e,"update",{path:t.toString(),value:n});let i=!0,s=rs(e),o={};if(J(n,(n,r)=>{i=!1,o[n]=nU(eL(t,n),tn(r),e.serverSyncTree_,s)}),i)M("update() called with empty data.  Don't do anything."),rd(e,r,"ok",void 0);else{let i=ru(e),s=function(e,t,n,r){var i;i=e.pendingWriteTree_,(0,_.hu)(r>i.lastWriteId,"Stacking an older merge on top of newer ones"),i.allWrites.push({path:t,children:n,writeId:r,visible:!0}),i.visibleWrites=tV(i.visibleWrites,t,n),i.lastWriteId=r;let s=tF.fromObject(n);return nC(e,new tS(tb(),t,s))}(e.serverSyncTree_,t,o,i);n8(e.eventQueue_,s),e.server_.merge(t.toString(),n,(n,s)=>{let o="ok"===n;o||V("update at "+t+" failed: "+n);let a=nv(e.serverSyncTree_,i,!o),l=a.length>0?rp(e,t):t;rt(e.eventQueue_,l,a),rd(e,r,n,s)}),J(n,n=>{let r=r_(e,eL(t,n));rp(e,r)}),rt(e.eventQueue_,t,[])}}(e._repo,e._path,t,n.wrapCallback(()=>{})),n.promise}function rF(e){e=(0,_.m9)(e);let t=new rk(()=>{}),n=new rU(t);return(function(e,t,n){let r=function(e,t){var n;let r=t._path,i=null;e.syncPointTree_.foreachOnPath(r,(e,t)=>{let n=eF(e,r);i=i||nd(t,n)});let s=e.syncPointTree_.get(r);s?i=i||nd(s,ex()):(s=new nl,e.syncPointTree_=e.syncPointTree_.set(r,s));let o=null!=i,a=o?new tx(i,!0,!1):null,l=(n=e.pendingWriteTree_,t4(t._path,n)),u=nh(s,t,l,o?a.getNode():te.EMPTY_NODE,o);return tO(u.viewCache_)}(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then(r=>{let i;let s=tn(r).withIndex(t._queryParams.getIndex());if(nE(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())i=nw(e.serverSyncTree_,t._path,s);else{let n=nS(e.serverSyncTree_,t);i=nT(e.serverSyncTree_,t._path,s,n)}return rt(e.eventQueue_,t._path,i),nb(e.serverSyncTree_,t,n,null,!0),s},n=>(rc(e,"get for query "+(0,_.Wl)(t)+" failed: "+n),Promise.reject(Error(n))))})(e._repo,e,n).then(t=>new rR(t,new rA(e._repo,e._path),e._queryParams.getIndex()))}class rU{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){let n=t._queryParams.getIndex();return new rI("value",this,new rR(e.snapshotNode,new rA(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new rC(this,e,t):null}matches(e){return e instanceof rU&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class rj{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new rC(this,e,t):null}createEvent(e,t){(0,_.hu)(null!=e.childName,"Child events should have a childName.");let n=rD(new rA(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new rI(e.type,this,new rR(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof rj&&this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext))}hasAnyCallback(){return!!this.callbackContext}}function rV(e,t,n,r){return function(e,t,n,r,i){var s;let o,a;if("object"==typeof r&&(o=void 0,i=r),"function"==typeof r&&(o=r),i&&i.onlyOnce){let t=n,r=(n,r)=>{rh(e._repo,e,u),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}let l=new rk(n,o||void 0),u="value"===t?new rU(l):new rj(t,l);return s=e._repo,a=".info"===eN(e._path)?nE(s.infoSyncTree_,e,u):nE(s.serverSyncTree_,e,u),re(s.eventQueue_,e._path,a),()=>rh(e._repo,e,u)}(e,"value",t,n,r)}function rq(e,t,n){let r=null,i=n?new rk(n):null;"value"===t?r=new rU(i):t&&(r=new rj(t,i)),rh(e._repo,e,r)}class rB{}class rz extends rB{constructor(e,t){super(),this._value=e,this._key=t}_apply(e){nZ("endAt",this._value,e._path,!0);let t=function(e,t,n){let r=e.copy();return r.endSet_=!0,void 0===t&&(t=null),r.indexEndValue_=t,void 0!==n?(r.endNameSet_=!0,r.indexEndName_=n):(r.endNameSet_=!1,r.indexEndName_=""),r}(e._queryParams,this._value,this._key);if(rN(t),rx(t),e._queryParams.hasEnd())throw Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new rS(e._repo,e._path,t,e._orderByCalled)}}class r$ extends rB{constructor(e,t){super(),this._value=e,this._key=t}_apply(e){nZ("startAt",this._value,e._path,!0);let t=function(e,t,n){let r=e.copy();return r.startSet_=!0,void 0===t&&(t=null),r.indexStartValue_=t,null!=n?(r.startNameSet_=!0,r.indexStartName_=n):(r.startNameSet_=!1,r.indexStartName_=""),r}(e._queryParams,this._value,this._key);if(rN(t),rx(t),e._queryParams.hasStart())throw Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new rS(e._repo,e._path,t,e._orderByCalled)}}class rW extends rB{constructor(e){super(),this._limit=e}_apply(e){if(e._queryParams.hasLimit())throw Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new rS(e._repo,e._path,function(e,t){let n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="r",n}(e._queryParams,this._limit),e._orderByCalled)}}function rH(e){if("number"!=typeof e||Math.floor(e)!==e||e<=0)throw Error("limitToLast: First argument must be a positive integer.");return new rW(e)}class rK extends rB{constructor(e){super(),this._path=e}_apply(e){!function(e,t){if(!0===e._orderByCalled)throw Error(t+": You can't combine multiple orderBy calls.")}(e,"orderByChild");let t=new eS(this._path);if(eM(t))throw Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");let n=new tr(t),r=function(e,t){let n=e.copy();return n.index_=t,n}(e._queryParams,n);return rx(r),new rS(e._repo,e._path,r,!0)}}function rG(e){if("$key"===e)throw Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if("$priority"===e)throw Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if("$value"===e)throw Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return n9("orderByChild","path",e,!1),new rK(e)}class rY extends rB{constructor(e,t){super(),this._value=e,this._key=t}_apply(e){if(nZ("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new rz(this._value,this._key)._apply(new r$(this._value,this._key)._apply(e))}}function rQ(e,t){return n4("equalTo","key",t,!0),new rY(e,t)}function rJ(e,...t){let n=(0,_.m9)(e);for(let e of t)n=e._apply(n);return n}(0,_.hu)(!c,"__referenceConstructor has already been defined"),c=rA,(0,_.hu)(!d,"__referenceConstructor has already been defined"),d=rA;let rX={};class rZ{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(function(e,t,n){if(e.stats_=em(e.repoInfo_),e.forceRestClient_||en())e.server_=new tm(e.repoInfo_,(t,n,r,i)=>{ro(e,t,n,r,i)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>ra(e,!0),0);else{if(null!=n){if("object"!=typeof n)throw Error("Only objects are supported for option databaseAuthVariableOverride");try{(0,_.Wl)(n)}catch(e){throw Error("Invalid authOverride provided: "+e)}}e.persistentConnection_=new eW(e.repoInfo_,t,(t,n,r,i)=>{ro(e,t,n,r,i)},t=>{ra(e,t)},t=>{J(t,(t,n)=>{rl(e,t,n)})},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=function(e,t){let n=e.toString();return ep[n]||(ep[n]=t()),ep[n]}(e.repoInfo_,()=>new tw(e.stats_,e.server_)),e.infoData_=new tg,e.infoSyncTree_=new ny({startListening:(t,n,r,i)=>{let s=[],o=e.infoData_.getNode(t._path);return o.isEmpty()||(s=nw(e.infoSyncTree_,t._path,o),setTimeout(()=>{i("ok")},0)),s},stopListening:()=>{}}),rl(e,"connected",!1),e.serverSyncTree_=new ny({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,(n,r)=>{let s=i(n,r);rt(e.eventQueue_,t._path,s)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new rA(this._repo,ex())),this._rootInternal}_delete(){return null!==this._rootInternal&&(function(e,t){let n=rX[t];n&&n[e.key]===e||j(`Database ${t}(${e.repoInfo_}) has already been deleted.`),e.persistentConnection_&&e.persistentConnection_.interrupt("repo_interrupt"),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&j("Cannot call "+e+" on a deleted database.")}}function r0(e=(0,g.Mq)(),t){let n=(0,g.qX)(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){let e=(0,_.P0)("database");e&&function(e,t,n,r={}){var i,s;let o;(e=(0,_.m9)(e))._checkNotDeleted("useEmulator"),e._instanceStarted&&j("Cannot call useEmulator() after instance has already been initialized.");let a=e._repoInternal;if(a.repoInfo_.nodeAdmin)r.mockUserToken&&j('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new eo(eo.OWNER);else if(r.mockUserToken){let t="string"==typeof r.mockUserToken?r.mockUserToken:(0,_.Sg)(r.mockUserToken,e.app.options.projectId);o=new eo(t)}i=a,s=o,i.repoInfo_=new eh(`${t}:${n}`,!1,i.repoInfo_.namespace,i.repoInfo_.webSocketOnly,i.repoInfo_.nodeAdmin,i.repoInfo_.persistenceKey,i.repoInfo_.includeNamespaceInQueryParams,!0),s&&(i.authTokenProvider_=s)}(n,...e)}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r1={".sv":"timestamp"};function r2(){return r1}eW.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},eW.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)},E=g.Jn,(0,g.Xd)(new y.wA("database",(e,{instanceIdentifier:t})=>{let n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return function(e,t,n,r,i){var s,o,a;let l,u,h,c,d=r||e.options.databaseURL;void 0===d&&(e.options.projectId||j("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),M("Using default host for project ",e.options.projectId),d=`${e.options.projectId}-default-rtdb.firebaseio.com`);let f=rw(d,i),p=f.repoInfo;void 0!==w&&w.env&&(h=w.env.FIREBASE_DATABASE_EMULATOR_HOST),h?(c=!0,p=(f=rw(d=`http://${h}?ns=${p.namespace}`,i)).repoInfo):c=!f.repoInfo.secure;let m=i&&c?new eo(eo.OWNER):new es(e.name,e.options,t);n6("Invalid Firebase Database URL",f),eM(f.path)||j("Database URL must point to the root of a Firebase Database (not including a child path).");let g=(s=p,o=e,a=new ei(e.name,n),(l=rX[o.name])||(l={},rX[o.name]=l),(u=l[s.toURLString()])&&j("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),u=new rr(s,!1,m,a),l[s.toURLString()]=u,u);return new rZ(g,e)}(n,r,i,t)},"PUBLIC").setMultipleInstances(!0)),(0,g.KN)(b,T,void 0),(0,g.KN)(b,T,"esm2017")},6100:function(e,t,n){"use strict";n.d(t,{hJ:function(){return aN},JU:function(){return aA},QT:function(){return li},PL:function(){return lo},ad:function(){return aO},b9:function(){return a3},cf:function(){return la},IO:function(){return a0},ar:function(){return a2}});var r,i,s,o,a,l,u,h=n(5816),c=n(740),d=n(3333),f=n(4444),p="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},m={},g=g||{},y=p||self;function _(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function v(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function w(e,t,n){return e.call.apply(e.bind,arguments)}function b(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function T(e,t,n){return(T=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?w:b).apply(null,arguments)}function E(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function I(e,t){function n(){}n.prototype=t.prototype,e.$=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.ac=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function C(){this.s=this.s,this.o=this.o}C.prototype.s=!1,C.prototype.sa=function(){this.s||(this.s=!0,this.N())},C.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};let k=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return -1};function S(e){let t=e.length;if(0<t){let n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function x(e,t){for(let t=1;t<arguments.length;t++){let n=arguments[t];if(_(n)){let t=e.length||0,r=n.length||0;e.length=t+r;for(let i=0;i<r;i++)e[t+i]=n[i]}else e.push(n)}}function N(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}N.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!y.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{y.addEventListener("test",()=>{},t),y.removeEventListener("test",()=>{},t)}catch(e){}return e}();function R(e){return/^[\s\xa0]*$/.test(e)}function P(){var e=y.navigator;return e&&(e=e.userAgent)?e:""}function D(e){return -1!=P().indexOf(e)}function O(e){return O[" "](e),e}O[" "]=function(){};var L=D("Opera"),M=D("Trident")||D("MSIE"),F=D("Edge"),U=F||M,j=D("Gecko")&&!(-1!=P().toLowerCase().indexOf("webkit")&&!D("Edge"))&&!(D("Trident")||D("MSIE"))&&!D("Edge"),V=-1!=P().toLowerCase().indexOf("webkit")&&!D("Edge");function q(){var e=y.document;return e?e.documentMode:void 0}e:{var B,z="",$=(B=P(),j?/rv:([^\);]+)(\)|;)/.exec(B):F?/Edge\/([\d\.]+)/.exec(B):M?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(B):V?/WebKit\/(\S+)/.exec(B):L?/(?:Version)[ \/]?(\S+)/.exec(B):void 0);if($&&(z=$?$[1]:""),M){var W=q();if(null!=W&&W>parseFloat(z)){i=String(W);break e}}i=z}var H=y.document&&M&&(q()||parseInt(i,10))||void 0;function K(e,t){if(N.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(j){e:{try{O(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:G[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&K.$.h.call(this)}}I(K,N);var G={2:"touch",3:"pen",4:"mouse"};K.prototype.h=function(){K.$.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Y="closure_listenable_"+(1e6*Math.random()|0),Q=0;function J(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.la=i,this.key=++Q,this.fa=this.ia=!1}function X(e){e.fa=!0,e.listener=null,e.proxy=null,e.src=null,e.la=null}function Z(e,t,n){for(let r in e)t.call(n,e[r],r,e)}function ee(e){let t={};for(let n in e)t[n]=e[n];return t}let et="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function en(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t])e[n]=r[n];for(let t=0;t<et.length;t++)n=et[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function er(e){this.src=e,this.g={},this.h=0}function ei(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=k(i,t);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(X(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function es(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.fa&&s.listener==t&&!!n==s.capture&&s.la==r)return i}return -1}er.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=es(e,t,r,i);return -1<o?(t=e[o],n||(t.ia=!1)):((t=new J(t,this.src,s,!!r,i)).ia=n,e.push(t)),t};var eo="closure_lm_"+(1e6*Math.random()|0),ea={};function el(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=v(i)?!!i.capture:!!i,a=ed(e);if(a||(e[eo]=a=new er(e)),(n=a.add(t,n,r,o,s)).proxy)return n;if(r=function e(t){return ec.call(e.src,e.listener,t)},n.proxy=r,r.src=e,r.listener=n,e.addEventListener)A||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(eh(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function eu(e){if("number"!=typeof e&&e&&!e.fa){var t=e.src;if(t&&t[Y])ei(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(eh(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=ed(t))?(ei(n,e),0==n.h&&(n.src=null,t[eo]=null)):X(e)}}}function eh(e){return e in ea?ea[e]:ea[e]="on"+e}function ec(e,t){if(e.fa)e=!0;else{t=new K(t,this);var n=e.listener,r=e.la||e.src;e.ia&&eu(e),e=n.call(r,t)}return e}function ed(e){return(e=e[eo])instanceof er?e:null}var ef="__closure_events_fn_"+(1e9*Math.random()>>>0);function ep(e){return"function"==typeof e?e:(e[ef]||(e[ef]=function(t){return e.handleEvent(t)}),e[ef])}function em(){C.call(this),this.i=new er(this),this.S=this,this.J=null}function eg(e,t){var n,r=e.J;if(r)for(n=[];r;r=r.J)n.push(r);if(e=e.S,r=t.type||t,"string"==typeof t)t=new N(t,e);else if(t instanceof N)t.target=t.target||e;else{var i=t;en(t=new N(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=ey(o,r,!0,t)&&i}if(i=ey(o=t.g=e,r,!0,t)&&i,i=ey(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=ey(o=t.g=n[s],r,!1,t)&&i}function ey(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.fa&&o.capture==n){var a=o.listener,l=o.la||o.src;o.ia&&ei(e.i,o),i=!1!==a.call(l,r)&&i}}return i&&!r.defaultPrevented}I(em,C),em.prototype[Y]=!0,em.prototype.removeEventListener=function(e,t,n,r){!function e(t,n,r,i,s){if(Array.isArray(n))for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);else(i=v(i)?!!i.capture:!!i,r=ep(r),t&&t[Y])?(t=t.i,(n=String(n).toString())in t.g&&-1<(r=es(o=t.g[n],r,i,s))&&(X(o[r]),Array.prototype.splice.call(o,r,1),0==o.length&&(delete t.g[n],t.h--))):t&&(t=ed(t))&&(n=t.g[n.toString()],t=-1,n&&(t=es(n,r,i,s)),(r=-1<t?n[t]:null)&&eu(r))}(this,e,t,n,r)},em.prototype.N=function(){if(em.$.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)X(n[r]);delete t.g[e],t.h--}}this.J=null},em.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},em.prototype.P=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var e_=y.JSON.stringify,ev=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new ew,e=>e.reset());class ew{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let eb,eT=!1,eE=new class{constructor(){this.h=this.g=null}add(e,t){let n=ev.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},eI=()=>{let e=y.Promise.resolve(void 0);eb=()=>{e.then(eC)}};var eC=()=>{let e;for(;e=null,(t=eE).g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),n=e;){try{n.h.call(n.g)}catch(e){!function(e){y.setTimeout(()=>{throw e},0)}(e)}var t,n,r=ev;r.j(n),100>r.h&&(r.h++,n.next=r.g,r.g=n)}eT=!1};function ek(e,t){em.call(this),this.h=e||1,this.g=t||y,this.j=T(this.qb,this),this.l=Date.now()}function eS(e){e.ga=!1,e.T&&(e.g.clearTimeout(e.T),e.T=null)}function ex(e,t,n){if("function"==typeof e)n&&(e=T(e,n));else if(e&&"function"==typeof e.handleEvent)e=T(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:y.setTimeout(e,t||0)}I(ek,em),(u=ek.prototype).ga=!1,u.T=null,u.qb=function(){if(this.ga){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-e):(this.T&&(this.g.clearTimeout(this.T),this.T=null),eg(this,"tick"),this.ga&&(eS(this),this.start()))}},u.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())},u.N=function(){ek.$.N.call(this),eS(this),delete this.g};class eN extends C{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=ex(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.j);let n=t.h;t.h=null,t.m.apply(null,n)}(this)}N(){super.N(),this.g&&(y.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eA(e){C.call(this),this.h=e,this.g={}}I(eA,C);var eR=[];function eP(e,t,n,r){Array.isArray(n)||(n&&(eR[0]=n.toString()),n=eR);for(var i=0;i<n.length;i++){var s=function e(t,n,r,i,s){if(i&&i.once)return function e(t,n,r,i,s){if(Array.isArray(n)){for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);return null}return r=ep(r),t&&t[Y]?t.P(n,r,v(i)?!!i.capture:!!i,s):el(t,n,r,!0,i,s)}(t,n,r,i,s);if(Array.isArray(n)){for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);return null}return r=ep(r),t&&t[Y]?t.O(n,r,v(i)?!!i.capture:!!i,s):el(t,n,r,!1,i,s)}(t,n[i],r||e.handleEvent,!1,e.h||e);if(!s)break;e.g[s.key]=s}}function eD(e){Z(e.g,function(e,t){this.g.hasOwnProperty(t)&&eu(e)},e),e.g={}}function eO(){this.g=!0}function eL(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}}return e_(n)}catch(e){return t}}(e,n)+(r?" "+r:"")})}eA.prototype.N=function(){eA.$.N.call(this),eD(this)},eA.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},eO.prototype.Ea=function(){this.g=!1},eO.prototype.info=function(){};var eM={},eF=null;function eU(){return eF=eF||new em}function ej(e){N.call(this,eM.Ta,e)}function eV(e){let t=eU();eg(t,new ej(t))}function eq(e,t){N.call(this,eM.STAT_EVENT,e),this.stat=t}function eB(e){let t=eU();eg(t,new eq(t,e))}function ez(e,t){N.call(this,eM.Ua,e),this.size=t}function e$(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return y.setTimeout(function(){e()},t)}eM.Ta="serverreachability",I(ej,N),eM.STAT_EVENT="statevent",I(eq,N),eM.Ua="timingevent",I(ez,N);var eW={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},eH={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function eK(){}function eG(e){return e.h||(e.h=e.i())}function eY(){}eK.prototype.h=null;var eQ={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function eJ(){N.call(this,"d")}function eX(){N.call(this,"c")}function eZ(){}function e0(e,t,n,r){this.l=e,this.j=t,this.m=n,this.W=r||1,this.U=new eA(this),this.P=e2,e=U?125:void 0,this.V=new ek(e),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new e1}function e1(){this.i=null,this.g="",this.h=!1}I(eJ,N),I(eX,N),I(eZ,eK),eZ.prototype.g=function(){return new XMLHttpRequest},eZ.prototype.i=function(){return{}},o=new eZ;var e2=45e3,e4={},e9={};function e3(e,t,n){e.L=1,e.v=tf(tl(t)),e.s=n,e.S=!0,e5(e,null)}function e5(e,t){e.G=Date.now(),e8(e),e.A=tl(e.v);var n=e.A,r=e.W;Array.isArray(r)||(r=[String(r)]),tk(n.i,"t",r),e.C=0,n=e.l.J,e.h=new e1,e.g=nm(e.l,n?t:null,!e.s),0<e.O&&(e.M=new eN(T(e.Pa,e,e.g),e.O)),eP(e.U,e.g,"readystatechange",e.nb),t=e.I?ee(e.I):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ha(e.A,e.u,e.s,t)):(e.u="GET",e.g.ha(e.A,e.u,null,t)),eV(),function(e,t,n,r,i,s){e.info(function(){if(e.g){if(s)for(var o="",a=s.split("&"),l=0;l<a.length;l++){var u=a[l].split("=");if(1<u.length){var h=u[0];u=u[1];var c=h.split("_");o=2<=c.length&&"type"==c[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null}else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.j,e.u,e.A,e.m,e.W,e.s)}function e6(e){return!!e.g&&"GET"==e.u&&2!=e.L&&e.l.Ha}function e7(e,t,n){let r=!0,i;for(;!e.J&&e.C<n.length;)if((i=function(e,t){var n=e.C,r=t.indexOf("\n",n);return -1==r?e9:isNaN(n=Number(t.substring(n,r)))?e4:(r+=1)+n>t.length?e9:(t=t.slice(r,r+n),e.C=r+n,t)}(e,n))==e9){4==t&&(e.o=4,eB(14),r=!1),eL(e.j,e.m,null,"[Incomplete Response]");break}else if(i==e4){e.o=4,eB(15),eL(e.j,e.m,n,"[Invalid Chunk]"),r=!1;break}else eL(e.j,e.m,i,null),ti(e,i);e6(e)&&i!=e9&&i!=e4&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,eB(16),r=!1),e.i=e.i&&r,r?0<n.length&&!e.ba&&(e.ba=!0,(t=e.l).g==e&&t.ca&&!t.M&&(t.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),na(t),t.M=!0,eB(11))):(eL(e.j,e.m,n,"[Invalid Chunked Response]"),tr(e),tn(e))}function e8(e){e.Y=Date.now()+e.P,te(e,e.P)}function te(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=e$(T(e.lb,e),t)}function tt(e){e.B&&(y.clearTimeout(e.B),e.B=null)}function tn(e){0==e.l.H||e.J||nh(e.l,e)}function tr(e){tt(e);var t=e.M;t&&"function"==typeof t.sa&&t.sa(),e.M=null,eS(e.V),eD(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.sa())}function ti(e,t){try{var n=e.l;if(0!=n.H&&(n.g==e||tD(n.i,e))){if(!e.K&&tD(n.i,e)&&3==n.H){try{var r=n.Ja.g.parse(t)}catch(e){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(n.g.G+3e3<e.G)nu(n),t8(n);else break e}no(n),eB(18)}}else n.Fa=i[1],0<n.Fa-n.V&&37500>i[2]&&n.G&&0==n.A&&!n.v&&(n.v=e$(T(n.ib,n),6e3));if(1>=tP(n.i)&&n.oa){try{n.oa()}catch(e){}n.oa=void 0}}else nd(n,11)}else if((e.K||n.g==e)&&nu(n),!R(t))for(i=n.Ja.g.parse(t),t=0;t<i.length;t++){let a=i[t];if(n.V=a[0],a=a[1],2==n.H){if("c"==a[0]){n.K=a[1],n.pa=a[2];let t=a[3];null!=t&&(n.ra=t,n.l.info("VER="+n.ra));let i=a[4];null!=i&&(n.Ga=i,n.l.info("SVER="+n.Ga));let l=a[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;let u=e.g;if(u){let e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.i;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(tO(s,s.h),s.h=null))}if(r.F){let e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.Da=e,td(r.I,r.F,e))}}if(n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-e.G,n.l.info("Handshake RTT: "+n.S+"ms")),(r=n).wa=np(r,r.J?r.pa:null,r.Y),e.K){tL(r.i,e);var o=r.L;o&&e.setTimeout(o),e.B&&(tt(e),e8(e)),r.g=e}else ns(r);0<n.j.length&&nt(n)}else"stop"!=a[0]&&"close"!=a[0]||nd(n,7)}else 3==n.H&&("stop"==a[0]||"close"==a[0]?"stop"==a[0]?nd(n,7):t7(n):"noop"!=a[0]&&n.h&&n.h.Aa(a),n.A=0)}}eV(4)}catch(e){}}function ts(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(_(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.ta&&"function"==typeof e.ta)return e.ta();if(!e.Z||"function"!=typeof e.Z){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(_(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}for(let r in t=[],n=0,e)t[n++]=r;return t}}}(e),r=function(e){if(e.Z&&"function"==typeof e.Z)return e.Z();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(_(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}(u=e0.prototype).setTimeout=function(e){this.P=e},u.nb=function(e){e=e.target;let t=this.M;t&&3==t2(e)?t.l():this.Pa(e)},u.Pa=function(e){try{if(e==this.g)e:{let h=t2(this.g);var t=this.g.Ia();let c=this.g.da();if(!(3>h)&&(3!=h||U||this.g&&(this.h.h||this.g.ja()||t4(this.g)))){this.J||4!=h||7==t||(8==t||0>=c?eV(3):eV(2)),tt(this);var n=this.g.da();this.ca=n;t:if(e6(this)){var r=t4(this.g);e="";var i=r.length,s=4==t2(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){tr(this),tn(this);var o="";break t}this.h.i=new y.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:s&&t==i-1});r.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=200==n,function(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.j,this.u,this.A,this.m,this.W,h,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(a)){var u=a;break t}}u=null}if(n=u)eL(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ti(this,n);else{this.i=!1,this.o=3,eB(12),tr(this),tn(this);break e}}this.S?(e7(this,h,o),U&&this.i&&3==h&&(eP(this.U,this.V,"tick",this.mb),this.V.start())):(eL(this.j,this.m,o,null),ti(this,o)),4==h&&tr(this),this.i&&!this.J&&(4==h?nh(this.l,this):(this.i=!1,e8(this)))}else(function(e){let t={};e=(e.g&&2<=t2(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(R(e[r]))continue;var n=function(e){var t=1;e=e.split(":");let n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}(e[r]);let i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();let s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(let n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<o.indexOf("Unknown SID")?(this.o=3,eB(12)):(this.o=0,eB(13)),tr(this),tn(this)}}}catch(e){}finally{}},u.mb=function(){if(this.g){var e=t2(this.g),t=this.g.ja();this.C<t.length&&(tt(this),e7(this,e,t),this.i&&4!=e&&e8(this))}},u.cancel=function(){this.J=!0,tr(this)},u.lb=function(){this.B=null;let e=Date.now();0<=e-this.Y?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.j,this.A),2!=this.L&&(eV(),eB(17)),tr(this),this.o=2,tn(this)):te(this,this.Y-e)};var to=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ta(e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof ta){this.h=e.h,tu(this,e.j),this.s=e.s,this.g=e.g,th(this,e.m),this.l=e.l;var t=e.i,n=new tT;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),tc(this,n),this.o=e.o}else e&&(t=String(e).match(to))?(this.h=!1,tu(this,t[1]||"",!0),this.s=tp(t[2]||""),this.g=tp(t[3]||"",!0),th(this,t[4]),this.l=tp(t[5]||"",!0),tc(this,t[6]||"",!0),this.o=tp(t[7]||"")):(this.h=!1,this.i=new tT(null,this.h))}function tl(e){return new ta(e)}function tu(e,t,n){e.j=n?tp(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function th(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function tc(e,t,n){var r,i;t instanceof tT?(e.i=t,r=e.i,(i=e.h)&&!r.j&&(tE(r),r.i=null,r.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(tI(this,t),tk(this,n,e))},r)),r.j=i):(n||(t=tm(t,tw)),e.i=new tT(t,e.h))}function td(e,t,n){e.i.set(t,n)}function tf(e){return td(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function tp(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tm(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,tg),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function tg(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}ta.prototype.toString=function(){var e=[],t=this.j;t&&e.push(tm(t,ty,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(tm(t,ty,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(tm(n,"/"==n.charAt(0)?tv:t_,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",tm(n,tb)),e.join("")};var ty=/[#\/\?@]/g,t_=/[#\?:]/g,tv=/[#\?]/g,tw=/[#\?@]/g,tb=/#/g;function tT(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tE(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function tI(e,t){tE(e),t=tS(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tC(e,t){return tE(e),t=tS(e,t),e.g.has(t)}function tk(e,t,n){tI(e,t),0<n.length&&(e.i=null,e.g.set(tS(e,t),S(n)),e.h+=n.length)}function tS(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(u=tT.prototype).add=function(e,t){tE(this),this.i=null,e=tS(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},u.forEach=function(e,t){tE(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},u.ta=function(){tE(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){let i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},u.Z=function(e){tE(this);let t=[];if("string"==typeof e)tC(this,e)&&(t=t.concat(this.g.get(tS(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},u.set=function(e,t){return tE(this),this.i=null,tC(this,e=tS(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},u.get=function(e,t){return e&&0<(e=this.Z(e)).length?String(e[0]):t},u.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];let s=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")};var tx=class{constructor(e,t){this.g=e,this.map=t}};function tN(e){this.l=e||tA,e=y.PerformanceNavigationTiming?0<(e=y.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(y.g&&y.g.Ka&&y.g.Ka()&&y.g.Ka().ec),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var tA=10;function tR(e){return!!e.h||!!e.g&&e.g.size>=e.j}function tP(e){return e.h?1:e.g?e.g.size:0}function tD(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function tO(e,t){e.g?e.g.add(t):e.h=t}function tL(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function tM(e){if(null!=e.h)return e.i.concat(e.h.F);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let n of e.g.values())t=t.concat(n.F);return t}return S(e.i)}tN.prototype.cancel=function(){if(this.i=tM(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var tF=class{stringify(e){return y.JSON.stringify(e,void 0)}parse(e){return y.JSON.parse(e,void 0)}};function tU(){this.g=new tF}function tj(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(e){}}function tV(e){this.l=e.fc||null,this.j=e.ob||!1}function tq(e,t){em.call(this),this.F=e,this.u=t,this.m=void 0,this.readyState=tB,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}I(tV,eK),tV.prototype.g=function(){return new tq(this.l,this.j)},tV.prototype.i=(r={},function(){return r}),I(tq,em);var tB=0;function tz(e){e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))}function t$(e){e.readyState=4,e.l=null,e.j=null,e.A=null,tW(e)}function tW(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(u=tq.prototype).open=function(e,t){if(this.readyState!=tB)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,tW(this)},u.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.F||y).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))},u.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,t$(this)),this.readyState=tB},u.$a=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tW(this)),this.g&&(this.readyState=3,tW(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(void 0!==y.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;tz(this)}else e.text().then(this.Za.bind(this),this.ka.bind(this))}},u.Xa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?t$(this):tW(this),3==this.readyState&&tz(this)}},u.Za=function(e){this.g&&(this.response=this.responseText=e,t$(this))},u.Ya=function(e){this.g&&(this.response=e,t$(this))},u.ka=function(){this.g&&t$(this)},u.setRequestHeader=function(e,t){this.v.append(e,t)},u.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},u.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var n=t.next();!n.done;)e.push((n=n.value)[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(tq.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var tH=y.JSON.parse;function tK(e){em.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=tG,this.L=this.M=!1}I(tK,em);var tG="",tY=/^https?$/i,tQ=["POST","PUT"];function tJ(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,tX(e),t0(e)}function tX(e){e.F||(e.F=!0,eg(e,"complete"),eg(e,"error"))}function tZ(e){if(e.h&&void 0!==g&&(!e.C[1]||4!=t2(e)||2!=e.da())){if(e.v&&4==t2(e))ex(e.La,0,e);else if(eg(e,"readystatechange"),4==t2(e)){e.h=!1;try{let o=e.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,n,r=!0;break e;default:r=!1}if(!(t=r)){if(n=0===o){var i=String(e.I).match(to)[1]||null;!i&&y.self&&y.self.location&&(i=y.self.location.protocol.slice(0,-1)),n=!tY.test(i?i.toLowerCase():"")}t=n}if(t)eg(e,"complete"),eg(e,"success");else{e.m=6;try{var s=2<t2(e)?e.g.statusText:""}catch(e){s=""}e.j=s+" ["+e.da()+"]",tX(e)}}finally{t0(e)}}}}function t0(e,t){if(e.g){t1(e);let n=e.g,r=e.C[0]?()=>{}:null;e.g=null,e.C=null,t||eg(e,"ready");try{n.onreadystatechange=r}catch(e){}}}function t1(e){e.g&&e.L&&(e.g.ontimeout=null),e.A&&(y.clearTimeout(e.A),e.A=null)}function t2(e){return e.g?e.g.readyState:0}function t4(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.K){case tG:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function t9(e){let t="";return Z(e,function(e,n){t+=n+":"+e+"\r\n"}),t}function t3(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=t9(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):td(e,t,n))}function t5(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function t6(e){this.Ga=0,this.j=[],this.l=new eO,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=t5("failFast",!1,e),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=t5("baseRetryDelayMs",5e3,e),this.hb=t5("retryDelaySeedMs",1e4,e),this.eb=t5("forwardChannelMaxRetries",2,e),this.xa=t5("forwardChannelRequestTimeoutMs",2e4,e),this.va=e&&e.xmlHttpFactory||void 0,this.Ha=e&&e.dc||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.i=new tN(e&&e.concurrentRequestLimit),this.Ja=new tU,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=e&&e.bc||!1,e&&e.Ea&&this.l.Ea(),e&&e.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&e&&e.detectBufferingProxy||!1,this.qa=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.qa=e.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}function t7(e){if(ne(e),3==e.H){var t=e.W++,n=tl(e.I);if(td(n,"SID",e.K),td(n,"RID",t),td(n,"TYPE","terminate"),nr(e,n),(t=new e0(e,e.l,t)).L=2,t.v=tf(tl(n)),n=!1,y.navigator&&y.navigator.sendBeacon)try{n=y.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!n&&y.Image&&((new Image).src=t.v,n=!0),n||(t.g=nm(t.l,null),t.g.ha(t.v)),t.G=Date.now(),e8(t)}nf(e)}function t8(e){e.g&&(na(e),e.g.cancel(),e.g=null)}function ne(e){t8(e),e.u&&(y.clearTimeout(e.u),e.u=null),nu(e),e.i.cancel(),e.m&&("number"==typeof e.m&&y.clearTimeout(e.m),e.m=null)}function nt(e){if(!tR(e.i)&&!e.m){e.m=!0;var t=e.Na;eb||eI(),eT||(eb(),eT=!0),eE.add(t,e),e.C=0}}function nn(e,t){var n;n=t?t.m:e.W++;let r=tl(e.I);td(r,"SID",e.K),td(r,"RID",n),td(r,"AID",e.V),nr(e,r),e.o&&e.s&&t3(r,e.o,e.s),n=new e0(e,e.l,n,e.C+1),null===e.o&&(n.I=e.s),t&&(e.j=t.F.concat(e.j)),t=ni(e,n,1e3),n.setTimeout(Math.round(.5*e.xa)+Math.round(.5*e.xa*Math.random())),tO(e.i,n),e3(n,r,t)}function nr(e,t){e.na&&Z(e.na,function(e,n){td(t,n,e)}),e.h&&ts({},function(e,n){td(t,n,e)})}function ni(e,t,n){n=Math.min(e.j.length,n);var r=e.h?T(e.h.Va,e.h,e):null;e:{var i=e.j;let t=-1;for(;;){let e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let o=0;o<n;o++){let n=i[o].g,a=i[o].map;if(0>(n-=t))t=Math.max(0,i[o].g-100),s=!1;else try{!function(e,t,n){let r=n||"";try{ts(e,function(e,n){let i=e;v(e)&&(i=e_(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}(a,e,"req"+n+"_")}catch(e){r&&r(a)}}if(s){r=e.join("&");break e}}}return e=e.j.splice(0,n),t.F=e,r}function ns(e){if(!e.g&&!e.u){e.ba=1;var t=e.Ma;eb||eI(),eT||(eb(),eT=!0),eE.add(t,e),e.A=0}}function no(e){return!e.g&&!e.u&&!(3<=e.A)&&(e.ba++,e.u=e$(T(e.Ma,e),nc(e,e.A)),e.A++,!0)}function na(e){null!=e.B&&(y.clearTimeout(e.B),e.B=null)}function nl(e){e.g=new e0(e,e.l,"rpc",e.ba),null===e.o&&(e.g.I=e.s),e.g.O=0;var t=tl(e.wa);td(t,"RID","rpc"),td(t,"SID",e.K),td(t,"AID",e.V),td(t,"CI",e.G?"0":"1"),!e.G&&e.qa&&td(t,"TO",e.qa),td(t,"TYPE","xmlhttp"),nr(e,t),e.o&&e.s&&t3(t,e.o,e.s),e.L&&e.g.setTimeout(e.L);var n=e.g;e=e.pa,n.L=1,n.v=tf(tl(t)),n.s=null,n.S=!0,e5(n,e)}function nu(e){null!=e.v&&(y.clearTimeout(e.v),e.v=null)}function nh(e,t){var n=null;if(e.g==t){nu(e),na(e),e.g=null;var r=2}else{if(!tD(e.i,t))return;n=t.F,tL(e.i,t),r=1}if(0!=e.H){if(t.i){if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.G;var i,s,o=e.C;eg(r=eU(),new ez(r,n)),nt(e)}else ns(e)}else if(3==(o=t.o)||0==o&&0<t.ca||!(1==r&&(i=e,s=t,!(tP(i.i)>=i.i.j-(i.m?1:0))&&(i.m?(i.j=s.F.concat(i.j),!0):1!=i.H&&2!=i.H&&!(i.C>=(i.cb?0:i.eb))&&(i.m=e$(T(i.Na,i,s),nc(i,i.C)),i.C++,!0)))||2==r&&no(e)))switch(n&&0<n.length&&((t=e.i).i=t.i.concat(n)),o){case 1:nd(e,5);break;case 4:nd(e,10);break;case 3:nd(e,6);break;default:nd(e,2)}}}function nc(e,t){let n=e.ab+Math.floor(Math.random()*e.hb);return e.isActive()||(n*=2),n*t}function nd(e,t){if(e.l.info("Error code "+t),2==t){var n=null;e.h&&(n=null);var r=T(e.pb,e);n||(n=new ta("//www.google.com/images/cleardot.gif"),y.location&&"http"==y.location.protocol||tu(n,"https"),tf(n)),function(e,t){let n=new eO;if(y.Image){let r=new Image;r.onload=E(tj,n,r,"TestLoadImage: loaded",!0,t),r.onerror=E(tj,n,r,"TestLoadImage: error",!1,t),r.onabort=E(tj,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=E(tj,n,r,"TestLoadImage: timeout",!1,t),y.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(n.toString(),r)}else eB(2);e.H=0,e.h&&e.h.za(t),nf(e),ne(e)}function nf(e){if(e.H=0,e.ma=[],e.h){let t=tM(e.i);(0!=t.length||0!=e.j.length)&&(x(e.ma,t),x(e.ma,e.j),e.i.i.length=0,S(e.j),e.j.length=0),e.h.ya()}}function np(e,t,n){var r=n instanceof ta?tl(n):new ta(n);if(""!=r.g)t&&(r.g=t+"."+r.g),th(r,r.m);else{var i=y.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new ta(null);r&&tu(s,r),t&&(s.g=t),i&&th(s,i),n&&(s.l=n),r=s}return n=e.F,t=e.Da,n&&t&&td(r,n,t),td(r,"VER",e.ra),nr(e,r),r}function nm(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tK(n&&e.Ha&&!e.va?new tV({ob:!0}):e.va)).Oa(e.J),t}function ng(){}function ny(){if(M&&!(10<=Number(H)))throw Error("Environmental error: no available transport.")}function n_(e,t){em.call(this),this.g=new t6(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(e?e["X-WebChannel-Client-Profile"]=t.Ca:e={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=e,(e=t&&t.cc)&&!R(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!R(t)&&(this.g.F=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new nb(this)}function nv(e){eJ.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function nw(){eX.call(this),this.status=1}function nb(e){this.g=e}function nT(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}function nE(e,t,n){n||(n=0);var r=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^n&(i^s))+r[0]+3614090360&4294967295;o=s+(i^(t=n+(o<<7&4294967295|o>>>25))&(n^i))+r[1]+3905402710&4294967295,o=i+(n^(s=t+(o<<12&4294967295|o>>>20))&(t^n))+r[2]+606105819&4294967295,o=n+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+r[3]+3250441966&4294967295,o=t+(s^(n=i+(o<<22&4294967295|o>>>10))&(i^s))+r[4]+4118548399&4294967295,o=s+(i^(t=n+(o<<7&4294967295|o>>>25))&(n^i))+r[5]+1200080426&4294967295,o=i+(n^(s=t+(o<<12&4294967295|o>>>20))&(t^n))+r[6]+2821735955&4294967295,o=n+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+r[7]+4249261313&4294967295,o=t+(s^(n=i+(o<<22&4294967295|o>>>10))&(i^s))+r[8]+1770035416&4294967295,o=s+(i^(t=n+(o<<7&4294967295|o>>>25))&(n^i))+r[9]+2336552879&4294967295,o=i+(n^(s=t+(o<<12&4294967295|o>>>20))&(t^n))+r[10]+4294925233&4294967295,o=n+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+r[11]+2304563134&4294967295,o=t+(s^(n=i+(o<<22&4294967295|o>>>10))&(i^s))+r[12]+1804603682&4294967295,o=s+(i^(t=n+(o<<7&4294967295|o>>>25))&(n^i))+r[13]+4254626195&4294967295,o=i+(n^(s=t+(o<<12&4294967295|o>>>20))&(t^n))+r[14]+2792965006&4294967295,o=n+(t^(i=s+(o<<17&4294967295|o>>>15))&(s^t))+r[15]+1236535329&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(i^s&(n^i))+r[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[6]+3225465664&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[0]+3921069994&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[10]+38016083&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[4]+3889429448&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[14]+3275163606&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[8]+1163531501&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^s&(n^i))+r[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(t^n))+r[2]+4243563512&4294967295,s=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(s^t))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^t&(i^s))+r[12]+2368359562&4294967295,o=t+((n=i+(o<<20&4294967295|o>>>12))^i^s)+r[5]+4294588738&4294967295,o=s+((t=n+(o<<4&4294967295|o>>>28))^n^i)+r[8]+2272392833&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^n)+r[11]+1839030562&4294967295,o=n+((i=s+(o<<16&4294967295|o>>>16))^s^t)+r[14]+4259657740&4294967295,o=t+((n=i+(o<<23&4294967295|o>>>9))^i^s)+r[1]+2763975236&4294967295,o=s+((t=n+(o<<4&4294967295|o>>>28))^n^i)+r[4]+1272893353&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^n)+r[7]+4139469664&4294967295,o=n+((i=s+(o<<16&4294967295|o>>>16))^s^t)+r[10]+3200236656&4294967295,o=t+((n=i+(o<<23&4294967295|o>>>9))^i^s)+r[13]+681279174&4294967295,o=s+((t=n+(o<<4&4294967295|o>>>28))^n^i)+r[0]+3936430074&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^n)+r[3]+3572445317&4294967295,o=n+((i=s+(o<<16&4294967295|o>>>16))^s^t)+r[6]+76029189&4294967295,o=t+((n=i+(o<<23&4294967295|o>>>9))^i^s)+r[9]+3654602809&4294967295,o=s+((t=n+(o<<4&4294967295|o>>>28))^n^i)+r[12]+3873151461&4294967295,o=i+((s=t+(o<<11&4294967295|o>>>21))^t^n)+r[15]+530742520&4294967295,o=n+((i=s+(o<<16&4294967295|o>>>16))^s^t)+r[2]+3299628645&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(i^(n|~s))+r[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[7]+1126891415&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[5]+4237533241&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[3]+2399980690&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[1]+2240044497&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[15]+4264355552&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[13]+1309151649&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~s))+r[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=s+(n^(t|~i))+r[11]+3174756917&4294967295,s=t+(o<<10&4294967295|o>>>22),o=i+(t^(s|~n))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function nI(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}(u=tK.prototype).Oa=function(e){this.M=e},u.ha=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+e);t=t?t.toUpperCase():"GET",this.I=e,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():o.g(),this.C=this.u?eG(this.u):eG(o),this.g.onreadystatechange=T(this.La,this);try{this.G=!0,this.g.open(t,String(e),!0),this.G=!1}catch(e){tJ(this,e);return}if(e=n||"",n=new Map(this.headers),r){if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else if("function"==typeof r.keys&&"function"==typeof r.get)for(let e of r.keys())n.set(e,r.get(e));else throw Error("Unknown input type for opt_headers: "+String(r))}for(let[s,o]of(r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=y.FormData&&e instanceof y.FormData,!(0<=k(tQ,t))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(s,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{var s;t1(this),0<this.B&&((this.L=(s=this.g,M&&"number"==typeof s.timeout&&void 0!==s.ontimeout))?(this.g.timeout=this.B,this.g.ontimeout=T(this.ua,this)):this.A=ex(this.ua,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){tJ(this,e)}},u.ua=function(){void 0!==g&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,eg(this,"timeout"),this.abort(8))},u.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,eg(this,"complete"),eg(this,"abort"),t0(this))},u.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),t0(this,!0)),tK.$.N.call(this)},u.La=function(){this.s||(this.G||this.v||this.l?tZ(this):this.kb())},u.kb=function(){tZ(this)},u.isActive=function(){return!!this.g},u.da=function(){try{return 2<t2(this)?this.g.status:-1}catch(e){return -1}},u.ja=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},u.Wa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),tH(t)}},u.Ia=function(){return this.m},u.Sa=function(){return"string"==typeof this.j?this.j:String(this.j)},(u=t6.prototype).ra=8,u.H=1,u.Na=function(e){if(this.m){if(this.m=null,1==this.H){if(!e){this.W=Math.floor(1e5*Math.random()),e=this.W++;let i=new e0(this,this.l,e),s=this.s;if(this.U&&(s?en(s=ee(s),this.U):s=this.U),null!==this.o||this.O||(i.I=s,s=null),this.P)e:{for(var t=0,n=0;n<this.j.length;n++){t:{var r=this.j[n];if("__data__"in r.map&&"string"==typeof(r=r.map.__data__)){r=r.length;break t}r=void 0}if(void 0===r)break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.j.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=ni(this,i,t),td(n=tl(this.I),"RID",e),td(n,"CVER",22),this.F&&td(n,"X-HTTP-Session-Id",this.F),nr(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(t9(s)))+"&"+t:this.o&&t3(n,this.o,s)),tO(this.i,i),this.bb&&td(n,"TYPE","init"),this.P?(td(n,"$req",t),td(n,"SID","null"),i.aa=!0,e3(i,n,null)):e3(i,n,t),this.H=2}}else 3==this.H&&(e?nn(this,e):0==this.j.length||tR(this.i)||nn(this))}},u.Ma=function(){if(this.u=null,nl(this),this.ca&&!(this.M||null==this.g||0>=this.S)){var e=2*this.S;this.l.info("BP detection timer enabled: "+e),this.B=e$(T(this.jb,this),e)}},u.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,eB(10),t8(this),nl(this))},u.ib=function(){null!=this.v&&(this.v=null,t8(this),no(this),eB(19))},u.pb=function(e){e?(this.l.info("Successfully pinged google.com"),eB(2)):(this.l.info("Failed to ping google.com"),eB(1))},u.isActive=function(){return!!this.h&&this.h.isActive(this)},(u=ng.prototype).Ba=function(){},u.Aa=function(){},u.za=function(){},u.ya=function(){},u.isActive=function(){return!0},u.Va=function(){},ny.prototype.g=function(e,t){return new n_(e,t)},I(n_,em),n_.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var e=this.g,t=this.l,n=this.h||void 0;eB(0),e.Y=t,e.na=n||{},e.G=e.aa,e.I=np(e,null,e.Y),nt(e)},n_.prototype.close=function(){t7(this.g)},n_.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=e_(e),e=n);t.j.push(new tx(t.fb++,e)),3==t.H&&nt(t)},n_.prototype.N=function(){this.g.h=null,delete this.j,t7(this.g),delete this.g,n_.$.N.call(this)},I(nv,eJ),I(nw,eX),I(nb,ng),nb.prototype.Ba=function(){eg(this.g,"a")},nb.prototype.Aa=function(e){eg(this.g,new nv(e))},nb.prototype.za=function(e){eg(this.g,new nw)},nb.prototype.ya=function(){eg(this.g,"b")},I(nT,function(){this.blockSize=-1}),nT.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0},nT.prototype.j=function(e,t){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=this.m,i=this.h,s=0;s<t;){if(0==i)for(;s<=n;)nE(this,e,s),s+=this.blockSize;if("string"==typeof e){for(;s<t;)if(r[i++]=e.charCodeAt(s++),i==this.blockSize){nE(this,r),i=0;break}}else for(;s<t;)if(r[i++]=e[s++],i==this.blockSize){nE(this,r),i=0;break}}this.h=i,this.i+=t},nT.prototype.l=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.i;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.j(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var nC={};function nk(e){var t;return -128<=e&&128>e?(t=nC,Object.prototype.hasOwnProperty.call(t,e)?t[e]:t[e]=new nI([0|e],0>e?-1:0)):new nI([0|e],0>e?-1:0)}function nS(e){if(isNaN(e)||!isFinite(e))return nN;if(0>e)return nO(nS(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=nx;return new nI(t,0)}var nx=4294967296,nN=nk(0),nA=nk(1),nR=nk(16777216);function nP(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function nD(e){return -1==e.h}function nO(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new nI(n,~e.h).add(nA)}function nL(e,t){return e.add(nO(t))}function nM(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function nF(e,t){this.g=e,this.h=t}function nU(e,t){if(nP(t))throw Error("division by zero");if(nP(e))return new nF(nN,nN);if(nD(e))return t=nU(nO(e),t),new nF(nO(t.g),nO(t.h));if(nD(t))return t=nU(e,nO(t)),new nF(nO(t.g),t.h);if(30<e.g.length){if(nD(e)||nD(t))throw Error("slowDivide_ only works with positive integers.");for(var n=nA,r=t;0>=r.X(e);)n=nj(n),r=nj(r);var i=nV(n,1),s=nV(r,1);for(r=nV(r,2),n=nV(n,2);!nP(r);){var o=s.add(r);0>=o.X(e)&&(i=i.add(n),s=o),r=nV(r,1),n=nV(n,1)}return t=nL(e,i.R(t)),new nF(i,t)}for(i=nN;0<=e.X(t);){for(r=48>=(r=Math.ceil(Math.log(n=Math.max(1,Math.floor(e.ea()/t.ea())))/Math.LN2))?1:Math.pow(2,r-48),o=(s=nS(n)).R(t);nD(o)||0<o.X(e);)n-=r,o=(s=nS(n)).R(t);nP(s)&&(s=nA),i=i.add(s),e=nL(e,o)}return new nF(i,e)}function nj(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.D(r)<<1|e.D(r-1)>>>31;return new nI(n,e.h)}function nV(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,i=[],s=0;s<r;s++)i[s]=0<t?e.D(s+n)>>>t|e.D(s+n+1)<<32-t:e.D(s+n);return new nI(i,e.h)}(u=nI.prototype).ea=function(){if(nD(this))return-nO(this).ea();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.D(n);e+=(0<=r?r:nx+r)*t,t*=nx}return e},u.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(nP(this))return"0";if(nD(this))return"-"+nO(this).toString(e);for(var t=nS(Math.pow(e,6)),n=this,r="";;){var i=nU(n,t).g,s=((0<(n=nL(n,i.R(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(nP(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},u.D=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},u.X=function(e){return nD(e=nL(this,e))?-1:nP(e)?0:1},u.abs=function(){return nD(this)?nO(this):this},u.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,i=0;i<=t;i++){var s=r+(65535&this.D(i))+(65535&e.D(i)),o=(s>>>16)+(this.D(i)>>>16)+(e.D(i)>>>16);r=o>>>16,s&=65535,o&=65535,n[i]=o<<16|s}return new nI(n,-2147483648&n[n.length-1]?-1:0)},u.R=function(e){if(nP(this)||nP(e))return nN;if(nD(this))return nD(e)?nO(this).R(nO(e)):nO(nO(this).R(e));if(nD(e))return nO(this.R(nO(e)));if(0>this.X(nR)&&0>e.X(nR))return nS(this.ea()*e.ea());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<e.g.length;i++){var s=this.D(r)>>>16,o=65535&this.D(r),a=e.D(i)>>>16,l=65535&e.D(i);n[2*r+2*i]+=o*l,nM(n,2*r+2*i),n[2*r+2*i+1]+=s*l,nM(n,2*r+2*i+1),n[2*r+2*i+1]+=o*a,nM(n,2*r+2*i+1),n[2*r+2*i+2]+=s*a,nM(n,2*r+2*i+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new nI(n,0)},u.gb=function(e){return nU(this,e).h},u.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)&e.D(r);return new nI(n,this.h&e.h)},u.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)|e.D(r);return new nI(n,this.h|e.h)},u.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)^e.D(r);return new nI(n,this.h^e.h)},ny.prototype.createWebChannel=ny.prototype.g,n_.prototype.send=n_.prototype.u,n_.prototype.open=n_.prototype.m,n_.prototype.close=n_.prototype.close,eW.NO_ERROR=0,eW.TIMEOUT=8,eW.HTTP_ERROR=6,eH.COMPLETE="complete",eY.EventType=eQ,eQ.OPEN="a",eQ.CLOSE="b",eQ.ERROR="c",eQ.MESSAGE="d",em.prototype.listen=em.prototype.O,tK.prototype.listenOnce=tK.prototype.P,tK.prototype.getLastError=tK.prototype.Sa,tK.prototype.getLastErrorCode=tK.prototype.Ia,tK.prototype.getStatus=tK.prototype.da,tK.prototype.getResponseJson=tK.prototype.Wa,tK.prototype.getResponseText=tK.prototype.ja,tK.prototype.send=tK.prototype.ha,tK.prototype.setWithCredentials=tK.prototype.Oa,nT.prototype.digest=nT.prototype.l,nT.prototype.reset=nT.prototype.reset,nT.prototype.update=nT.prototype.j,nI.prototype.add=nI.prototype.add,nI.prototype.multiply=nI.prototype.R,nI.prototype.modulo=nI.prototype.gb,nI.prototype.compare=nI.prototype.X,nI.prototype.toNumber=nI.prototype.ea,nI.prototype.toString=nI.prototype.toString,nI.prototype.getBits=nI.prototype.D,nI.fromNumber=nS,nI.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return nO(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=nS(Math.pow(n,8)),i=nN,s=0;s<t.length;s+=8){var o=Math.min(8,t.length-s),a=parseInt(t.substring(s,s+o),n);8>o?(o=nS(Math.pow(n,o)),i=i.R(o).add(nS(a))):i=(i=i.R(r)).add(nS(a))}return i};var nq=m.createWebChannelTransport=function(){return new ny},nB=m.getStatEventTarget=function(){return eU()},nz=m.ErrorCode=eW,n$=m.EventType=eH,nW=m.Event=eM,nH=m.Stat={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},nK=m.FetchXmlHttpFactory=tV,nG=m.WebChannel=eY,nY=m.XhrIo=tK,nQ=m.Md5=nT,nJ=m.Integer=nI;n(3454);let nX="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nZ{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nZ.UNAUTHENTICATED=new nZ(null),nZ.GOOGLE_CREDENTIALS=new nZ("google-credentials-uid"),nZ.FIRST_PARTY=new nZ("first-party-uid"),nZ.MOCK_USER=new nZ("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n0="9.23.0",n1=new d.Yd("@firebase/firestore");function n2(){return n1.logLevel}function n4(e,...t){if(n1.logLevel<=d.in.DEBUG){let n=t.map(n5);n1.debug(`Firestore (${n0}): ${e}`,...n)}}function n9(e,...t){if(n1.logLevel<=d.in.ERROR){let n=t.map(n5);n1.error(`Firestore (${n0}): ${e}`,...n)}}function n3(e,...t){if(n1.logLevel<=d.in.WARN){let n=t.map(n5);n1.warn(`Firestore (${n0}): ${e}`,...n)}}function n5(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n6(e="Unexpected state"){let t=`FIRESTORE (${n0}) INTERNAL ASSERTION FAILED: `+e;throw n9(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n7={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class n8 extends f.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(nZ.UNAUTHENTICATED))}shutdown(){}}class rr{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class ri{constructor(e){this.t=e,this.currentUser=nZ.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new re;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new re,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{n4("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?o(e):(n4("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new re)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(n4("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||n6(),new rt(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||n6(),new nZ(e)}}class rs{constructor(e,t,n){this.h=e,this.l=t,this.m=n,this.type="FirstParty",this.user=nZ.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);let e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class ro{constructor(e,t,n){this.h=e,this.l=t,this.m=n}getToken(){return Promise.resolve(new rs(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(nZ.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ra{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rl{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,t){let n=e=>{null!=e.error&&n4("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.T;return this.T=e.token,n4("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{n4("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.I.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.I.getImmediate({optional:!0});e?r(e):n4("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||n6(),this.T=e.token,new ra(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{static A(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function rh(e,t){return e<t?-1:e>t?1:0}function rc(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new n8(n7.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new n8(n7.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return rd.fromMillis(Date.now())}static fromDate(e){return rd.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new rd(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?rh(this.nanoseconds,e.nanoseconds):rh(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e){this.timestamp=e}static fromTimestamp(e){return new rf(e)}static min(){return new rf(new rd(0,0))}static max(){return new rf(new rd(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e,t,n){void 0===t?t=0:t>e.length&&n6(),void 0===n?n=e.length-t:n>e.length-t&&n6(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===rp.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof rp?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.get(r),i=t.get(r);if(n<i)return -1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class rm extends rp{construct(e,t,n){return new rm(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new n8(n7.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new rm(t)}static emptyPath(){return new rm([])}}let rg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ry extends rp{construct(e,t,n){return new ry(e,t,n)}static isValidIdentifier(e){return rg.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ry.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new ry(["__name__"])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new n8(n7.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new n8(n7.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new n8(n7.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new n8(n7.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ry(t)}static emptyPath(){return new ry([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e){this.path=e}static fromPath(e){return new r_(rm.fromString(e))}static fromName(e){return new r_(rm.fromString(e).popFirst(5))}static empty(){return new r_(rm.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===rm.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return rm.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r_(new rm(e.slice()))}}class rv{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new rv(rf.min(),r_.empty(),-1)}static max(){return new rv(rf.max(),r_.empty(),-1)}}class rw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rb(e){if(e.code!==n7.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;n4("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&n6(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new rT((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof rT?t:rT.resolve(t)}catch(e){return rT.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):rT.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):rT.reject(t)}static resolve(e){return new rT((t,n)=>{t(e)})}static reject(e){return new rT((t,n)=>{n(e)})}static waitFor(e){return new rT((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=rT.resolve(!1);for(let n of e)t=t.next(e=>e?rT.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new rT((n,r)=>{let i=e.length,s=Array(i),o=0;for(let a=0;a<i;a++){let l=a;t(e[l]).next(e=>{s[l]=e,++o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new rT((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}function rE(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ot(e),this.ut=e=>t.writeSequenceNumber(e))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ut&&this.ut(e),e}}function rC(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rk(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function rS(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function rx(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}rI.ct=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rN{constructor(e,t){this.comparator=e,this.root=t||rR.EMPTY}insert(e,t){return new rN(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,rR.BLACK,null,null))}remove(e){return new rN(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rR.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rA(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rA(this.root,e,this.comparator,!1)}getReverseIterator(){return new rA(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rA(this.root,e,this.comparator,!0)}}class rA{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class rR{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:rR.RED,this.left=null!=r?r:rR.EMPTY,this.right=null!=i?i:rR.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new rR(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return rR.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return rR.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,rR.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,rR.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw n6();let e=this.left.check();if(e!==this.right.check())throw n6();return e+(this.isRed()?0:1)}}rR.EMPTY=null,rR.RED=!0,rR.BLACK=!1,rR.EMPTY=new class{constructor(){this.size=0}get key(){throw n6()}get value(){throw n6()}get color(){throw n6()}get left(){throw n6()}get right(){throw n6()}copy(e,t,n,r,i){return this}insert(e,t,n){return new rR(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e){this.comparator=e,this.data=new rN(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rD(this.data.getIterator())}getIteratorFrom(e){return new rD(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof rP)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new rP(this.comparator);return t.data=e,t}}class rD{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rO{constructor(e){this.fields=e,e.sort(ry.comparator)}static empty(){return new rO([])}unionWith(e){let t=new rP(ry.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new rO(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return rc(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rL extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rM{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new rL("Invalid base64 string: "+e):e}}(e);return new rM(t)}static fromUint8Array(e){let t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new rM(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return rh(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}rM.EMPTY_BYTE_STRING=new rM("");let rF=RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function rU(e){if(e||n6(),"string"==typeof e){let t=0,n=rF.exec(e);if(n||n6(),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}let r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:rj(e.seconds),nanos:rj(e.nanos)}}function rj(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function rV(e){return"string"==typeof e?rM.fromBase64String(e):rM.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rq(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function rB(e){let t=e.mapValue.fields.__previous_value__;return rq(t)?rB(t):t}function rz(e){let t=rU(e.mapValue.fields.__local_write_time__.timestampValue);return new rd(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r${constructor(e,t,n,r,i,s,o,a,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=l}}class rW{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new rW("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof rW&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rH={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function rK(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?rq(e)?4:r5(e)?9007199254740991:10:n6()}function rG(e,t){if(e===t)return!0;let n=rK(e);if(n!==rK(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return rz(e).isEqual(rz(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=rU(e.timestampValue),r=rU(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return rV(e.bytesValue).isEqual(rV(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return rj(e.geoPointValue.latitude)===rj(t.geoPointValue.latitude)&&rj(e.geoPointValue.longitude)===rj(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return rj(e.integerValue)===rj(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=rj(e.doubleValue),r=rj(t.doubleValue);return n===r?rC(n)===rC(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return rc(e.arrayValue.values||[],t.arrayValue.values||[],rG);case 10:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(rk(n)!==rk(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!rG(n[e],r[e])))return!1;return!0}(e,t);default:return n6()}}function rY(e,t){return void 0!==(e.values||[]).find(e=>rG(e,t))}function rQ(e,t){if(e===t)return 0;let n=rK(e),r=rK(t);if(n!==r)return rh(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return rh(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=rj(e.integerValue||e.doubleValue),r=rj(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return rJ(e.timestampValue,t.timestampValue);case 4:return rJ(rz(e),rz(t));case 5:return rh(e.stringValue,t.stringValue);case 6:return function(e,t){let n=rV(e),r=rV(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=rh(n[e],r[e]);if(0!==t)return t}return rh(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=rh(rj(e.latitude),rj(t.latitude));return 0!==n?n:rh(rj(e.longitude),rj(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=rQ(n[e],r[e]);if(t)return t}return rh(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===rH.mapValue&&t===rH.mapValue)return 0;if(e===rH.mapValue)return 1;if(t===rH.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=rh(r[e],s[e]);if(0!==t)return t;let o=rQ(n[r[e]],i[s[e]]);if(0!==o)return o}return rh(r.length,s.length)}(e.mapValue,t.mapValue);default:throw n6()}}function rJ(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return rh(e,t);let n=rU(e),r=rU(t),i=rh(n.seconds,r.seconds);return 0!==i?i:rh(n.nanos,r.nanos)}function rX(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=rU(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?rV(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,r_.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=rX(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${rX(e.fields[i])}`;return n+"}"}(e.mapValue):n6()}function rZ(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function r0(e){return!!e&&"integerValue"in e}function r1(e){return!!e&&"arrayValue"in e}function r2(e){return!!e&&"nullValue"in e}function r4(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function r9(e){return!!e&&"mapValue"in e}function r3(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return rS(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=r3(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=r3(e.arrayValue.values[n]);return t}return Object.assign({},e)}function r5(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r6{constructor(e){this.value=e}static empty(){return new r6({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!r9(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=r3(t)}setAll(e){let t=ry.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=r3(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());r9(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return rG(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];r9(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(rS(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new r6(r3(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r7{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new r7(e,0,rf.min(),rf.min(),rf.min(),r6.empty(),0)}static newFoundDocument(e,t,n,r){return new r7(e,1,t,rf.min(),n,r,0)}static newNoDocument(e,t){return new r7(e,2,t,rf.min(),rf.min(),r6.empty(),0)}static newUnknownDocument(e,t){return new r7(e,3,t,rf.min(),rf.min(),r6.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(rf.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=r6.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=r6.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=rf.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof r7&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r7(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r8{constructor(e,t){this.position=e,this.inclusive=t}}function ie(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],o=e.position[i];if(r=s.field.isKeyField()?r_.comparator(r_.fromName(o.referenceValue),n.key):rQ(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function it(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!rG(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{}class is extends ii{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new iu(e,t,n):"array-contains"===t?new ip(e,n):"in"===t?new im(e,n):"not-in"===t?new ig(e,n):"array-contains-any"===t?new iy(e,n):new is(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ih(e,n):new ic(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(rQ(t,this.value)):null!==t&&rK(this.value)===rK(t)&&this.matchesComparison(rQ(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return n6()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class io extends ii{constructor(e,t){super(),this.filters=e,this.op=t,this.lt=null}static create(e,t){return new io(e,t)}matches(e){return ia(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.lt||(this.lt=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.ft(e=>e.isInequality());return null!==e?e.field:null}ft(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}}function ia(e){return"and"===e.op}function il(e){for(let t of e.filters)if(t instanceof io)return!1;return!0}class iu extends is{constructor(e,t,n){super(e,t,n),this.key=r_.fromName(n.referenceValue)}matches(e){let t=r_.comparator(e.key,this.key);return this.matchesComparison(t)}}class ih extends is{constructor(e,t){super(e,"in",t),this.keys=id("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class ic extends is{constructor(e,t){super(e,"not-in",t),this.keys=id("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function id(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>r_.fromName(e.referenceValue))}class ip extends is{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return r1(t)&&rY(t.arrayValue,this.value)}}class im extends is{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&rY(this.value.arrayValue,t)}}class ig extends is{constructor(e,t){super(e,"not-in",t)}matches(e){if(rY(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!rY(this.value.arrayValue,t)}}class iy extends is{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!r1(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>rY(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.dt=null}}function iv(e,t=null,n=[],r=[],i=null,s=null,o=null){return new i_(e,t,n,r,i,s,o)}function iw(e){let t=e;if(null===t.dt){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:"+t.filters.map(e=>(function e(t){if(t instanceof is)return t.field.canonicalString()+t.op.toString()+rX(t.value);if(il(t)&&ia(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+t.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==t.limit||(e+="|l:"+t.limit),t.startAt&&(e+="|lb:"+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>rX(e)).join(",")),t.endAt&&(e+="|ub:"+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>rX(e)).join(",")),t.dt=e}return t.dt}function ib(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof is?n instanceof is&&t.op===n.op&&t.field.isEqual(n.field)&&rG(t.value,n.value):t instanceof io?n instanceof io&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void n6()}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!it(e.startAt,t.startAt)&&it(e.endAt,t.endAt)}function iT(e){return r_.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.wt=null,this._t=null,this.startAt,this.endAt}}function iI(e){return new iE(e)}function iC(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function ik(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function iS(e){for(let t of e.filters){let e=t.getFirstInequalityField();if(null!==e)return e}return null}function ix(e){return null!==e.collectionGroup}function iN(e){let t=e;if(null===t.wt){t.wt=[];let e=iS(t),n=ik(t);if(null!==e&&null===n)e.isKeyField()||t.wt.push(new ir(e)),t.wt.push(new ir(ry.keyField(),"asc"));else{let e=!1;for(let n of t.explicitOrderBy)t.wt.push(n),n.field.isKeyField()&&(e=!0);if(!e){let e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.wt.push(new ir(ry.keyField(),e))}}}return t.wt}function iA(e){let t=e;if(!t._t){if("F"===t.limitType)t._t=iv(t.path,t.collectionGroup,iN(t),t.filters,t.limit,t.startAt,t.endAt);else{let e=[];for(let n of iN(t)){let t="desc"===n.dir?"asc":"desc";e.push(new ir(n.field,t))}let n=t.endAt?new r8(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new r8(t.startAt.position,t.startAt.inclusive):null;t._t=iv(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}return t._t}function iR(e,t){t.getFirstInequalityField(),iS(e);let n=e.filters.concat([t]);return new iE(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function iP(e,t,n){return new iE(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function iD(e,t){return ib(iA(e),iA(t))&&e.limitType===t.limitType}function iO(e){return`${iw(iA(e))}|lt:${e.limitType}`}function iL(e){var t;let n;return`Query(target=${n=(t=iA(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof is?`${t.field.canonicalString()} ${t.op} ${rX(t.value)}`:t instanceof io?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>rX(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>rX(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function iM(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):r_.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of iN(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=ie(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,iN(e),t))&&(!e.endAt||!!function(e,t,n){let r=ie(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,iN(e),t))}function iF(e){return(t,n)=>{let r=!1;for(let i of iN(e)){let e=function(e,t,n){let r=e.field.isKeyField()?r_.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?rQ(r,i):n6()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return n6()}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iU{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){rS(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return rx(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ij=new rN(r_.comparator),iV=new rN(r_.comparator);function iq(...e){let t=iV;for(let n of e)t=t.insert(n.key,n);return t}function iB(){return new iU(e=>e.toString(),(e,t)=>e.isEqual(t))}new rN(r_.comparator);let iz=new rP(r_.comparator);function i$(...e){let t=iz;for(let n of e)t=t.add(n);return t}let iW=new rP(rh);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iH(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rC(t)?"-0":t}}function iK(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iG{constructor(){this._=void 0}}class iY extends iG{}class iQ extends iG{constructor(e){super(),this.elements=e}}function iJ(e,t){let n=i2(t);for(let t of e.elements)n.some(e=>rG(e,t))||n.push(t);return{arrayValue:{values:n}}}class iX extends iG{constructor(e){super(),this.elements=e}}function iZ(e,t){let n=i2(t);for(let t of e.elements)n=n.filter(e=>!rG(e,t));return{arrayValue:{values:n}}}class i0 extends iG{constructor(e,t){super(),this.serializer=e,this.gt=t}}function i1(e){return rj(e.integerValue||e.doubleValue)}function i2(e){return r1(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class i4{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new i4}static exists(e){return new i4(void 0,e)}static updateTime(e){return new i4(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function i9(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class i3{}function i5(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new si(e.key,i4.none()):new i8(e.key,e.data,i4.none());{let n=e.data,r=r6.empty(),i=new rP(ry.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new se(e.key,r,new rO(i.toArray()),i4.none())}}function i6(e,t,n,r){return e instanceof i8?function(e,t,n,r){if(!i9(e.precondition,t))return n;let i=e.value.clone(),s=sr(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof se?function(e,t,n,r){if(!i9(e.precondition,t))return n;let i=sr(e.fieldTransforms,r,t),s=t.data;return(s.setAll(st(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):i9(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function i7(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&rc(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof iQ&&r instanceof iQ||n instanceof iX&&r instanceof iX?rc(n.elements,r.elements,rG):n instanceof i0&&r instanceof i0?rG(n.gt,r.gt):n instanceof iY&&r instanceof iY)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class i8 extends i3{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class se extends i3{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function st(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function sn(e,t,n){var r;let i=new Map;e.length===n.length||n6();for(let s=0;s<n.length;s++){let o=e[s],a=o.transform,l=t.data.field(o.field);i.set(o.field,(r=n[s],a instanceof iQ?iJ(a,l):a instanceof iX?iZ(a,l):r))}return i}function sr(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof iY?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&rq(t)&&(t=rB(t)),t&&(n.fields.__previous_value__=t),{mapValue:n}}(t,s):e instanceof iQ?iJ(e,s):e instanceof iX?iZ(e,s):function(e,t){var n,r;let i=(n=e,r=t,n instanceof i0?r0(r)||r&&"doubleValue"in r?r:{integerValue:0}:null),s=i1(i)+i1(e.gt);return r0(i)&&r0(e.gt)?iK(s):iH(e.serializer,s)}(e,s))}return r}class si extends i3{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof i8?function(e,t,n){let r=e.value.clone(),i=sn(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof se?function(e,t,n){if(!i9(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=sn(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(st(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=i6(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=i6(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=iB();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;let a=i5(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(rf.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),i$())}isEqual(e){return this.batchId===e.batchId&&rc(this.mutations,e.mutations,(e,t)=>i7(e,t))&&rc(this.baseMutations,e.baseMutations,(e,t)=>i7(e,t))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(e,t){this.count=e,this.unchangedNames=t}}function sl(e){if(void 0===e)return n9("GRPC error has no .code"),n7.UNKNOWN;switch(e){case a.OK:return n7.OK;case a.CANCELLED:return n7.CANCELLED;case a.UNKNOWN:return n7.UNKNOWN;case a.DEADLINE_EXCEEDED:return n7.DEADLINE_EXCEEDED;case a.RESOURCE_EXHAUSTED:return n7.RESOURCE_EXHAUSTED;case a.INTERNAL:return n7.INTERNAL;case a.UNAVAILABLE:return n7.UNAVAILABLE;case a.UNAUTHENTICATED:return n7.UNAUTHENTICATED;case a.INVALID_ARGUMENT:return n7.INVALID_ARGUMENT;case a.NOT_FOUND:return n7.NOT_FOUND;case a.ALREADY_EXISTS:return n7.ALREADY_EXISTS;case a.PERMISSION_DENIED:return n7.PERMISSION_DENIED;case a.FAILED_PRECONDITION:return n7.FAILED_PRECONDITION;case a.ABORTED:return n7.ABORTED;case a.OUT_OF_RANGE:return n7.OUT_OF_RANGE;case a.UNIMPLEMENTED:return n7.UNIMPLEMENTED;case a.DATA_LOSS:return n7.DATA_LOSS;default:return n6()}}(l=a||(a={}))[l.OK=0]="OK",l[l.CANCELLED=1]="CANCELLED",l[l.UNKNOWN=2]="UNKNOWN",l[l.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",l[l.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",l[l.NOT_FOUND=5]="NOT_FOUND",l[l.ALREADY_EXISTS=6]="ALREADY_EXISTS",l[l.PERMISSION_DENIED=7]="PERMISSION_DENIED",l[l.UNAUTHENTICATED=16]="UNAUTHENTICATED",l[l.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",l[l.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",l[l.ABORTED=10]="ABORTED",l[l.OUT_OF_RANGE=11]="OUT_OF_RANGE",l[l.UNIMPLEMENTED=12]="UNIMPLEMENTED",l[l.INTERNAL=13]="INTERNAL",l[l.UNAVAILABLE=14]="UNAVAILABLE",l[l.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return sh}static getOrCreateInstance(){return null===sh&&(sh=new su),sh}onExistenceFilterMismatch(e){let t=Symbol();return this.onExistenceFilterMismatchCallbacks.set(t,e),()=>this.onExistenceFilterMismatchCallbacks.delete(t)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(t=>t(e))}}let sh=null,sc=new nJ([4294967295,4294967295],0);function sd(e){let t=(new TextEncoder).encode(e),n=new nQ;return n.update(t),new Uint8Array(n.digest())}function sf(e){let t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new nJ([n,r],0),new nJ([i,s],0)]}class sp{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new sm(`Invalid padding: ${t}`);if(n<0||e.length>0&&0===this.hashCount)throw new sm(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new sm(`Invalid padding when bitmap length is 0: ${t}`);this.It=8*e.length-t,this.Tt=nJ.fromNumber(this.It)}Et(e,t,n){let r=e.add(t.multiply(nJ.fromNumber(n)));return 1===r.compare(sc)&&(r=new nJ([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Tt).toNumber()}At(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}vt(e){if(0===this.It)return!1;let t=sd(e),[n,r]=sf(t);for(let e=0;e<this.hashCount;e++){let t=this.Et(n,r,e);if(!this.At(t))return!1}return!0}static create(e,t,n){let r=new Uint8Array(Math.ceil(e/8)),i=new sp(r,e%8==0?0:8-e%8,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.It)return;let t=sd(e),[n,r]=sf(t);for(let e=0;e<this.hashCount;e++){let t=this.Et(n,r,e);this.Rt(t)}}Rt(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class sm extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,sy.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new sg(rf.min(),r,new rN(rh),ij,i$())}}class sy{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new sy(n,t,i$(),i$(),i$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t,n,r){this.Pt=e,this.removedTargetIds=t,this.key=n,this.bt=r}}class sv{constructor(e,t){this.targetId=e,this.Vt=t}}class sw{constructor(e,t,n=rM.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class sb{constructor(){this.St=0,this.Dt=sI(),this.Ct=rM.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return 0!==this.St}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=i$(),t=i$(),n=i$();return this.Dt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:n6()}}),new sy(this.Ct,this.xt,e,t,n)}Ft(){this.Nt=!1,this.Dt=sI()}Bt(e,t){this.Nt=!0,this.Dt=this.Dt.insert(e,t)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class sT{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=ij,this.zt=sE(),this.Wt=new rN(rh)}Ht(e){for(let t of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(t,e.bt):this.Yt(t,e.key,e.bt);for(let t of e.removedTargetIds)this.Yt(t,e.key,e.bt)}Xt(e){this.forEachTarget(e,t=>{let n=this.Zt(t);switch(e.state){case 0:this.te(t)&&n.$t(e.resumeToken);break;case 1:n.Ut(),n.kt||n.Ft(),n.$t(e.resumeToken);break;case 2:n.Ut(),n.kt||this.removeTarget(t);break;case 3:this.te(t)&&(n.Kt(),n.$t(e.resumeToken));break;case 4:this.te(t)&&(this.ee(t),n.$t(e.resumeToken));break;default:n6()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Qt.forEach((e,n)=>{this.te(n)&&t(n)})}ne(e){var t;let n=e.targetId,r=e.Vt.count,i=this.se(n);if(i){let s=i.target;if(iT(s)){if(0===r){let e=new r_(s.path);this.Yt(n,e,r7.newNoDocument(e,rf.min()))}else 1===r||n6()}else{let i=this.ie(n);if(i!==r){let r=this.re(e,i);0!==r&&(this.ee(n),this.Wt=this.Wt.insert(n,2===r?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch")),null===(t=su.instance)||void 0===t||t.notifyOnExistenceFilterMismatch(function(e,t,n){var r,i,s,o,a,l;let u={localCacheCount:t,existenceFilterCount:n.count},h=n.unchangedNames;return h&&(u.bloomFilter={applied:0===e,hashCount:null!==(r=null==h?void 0:h.hashCount)&&void 0!==r?r:0,bitmapLength:null!==(o=null===(s=null===(i=null==h?void 0:h.bits)||void 0===i?void 0:i.bitmap)||void 0===s?void 0:s.length)&&void 0!==o?o:0,padding:null!==(l=null===(a=null==h?void 0:h.bits)||void 0===a?void 0:a.padding)&&void 0!==l?l:0}),u}(r,i,e.Vt))}}}}re(e,t){let n,r;let{unchangedNames:i,count:s}=e.Vt;if(!i||!i.bits)return 1;let{bits:{bitmap:o="",padding:a=0},hashCount:l=0}=i;try{n=rV(o).toUint8Array()}catch(e){if(e instanceof rL)return n3("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw e}try{r=new sp(n,a,l)}catch(e){return n3(e instanceof sm?"BloomFilter error: ":"Applying bloom filter failed: ",e),1}return 0===r.It?1:s!==t-this.oe(e.targetId,r)?2:0}oe(e,t){let n=this.Gt.getRemoteKeysForTarget(e),r=0;return n.forEach(n=>{let i=this.Gt.ue(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;t.vt(s)||(this.Yt(e,n,null),r++)}),r}ce(e){let t=new Map;this.Qt.forEach((n,r)=>{let i=this.se(r);if(i){if(n.current&&iT(i.target)){let t=new r_(i.target.path);null!==this.jt.get(t)||this.ae(r,t)||this.Yt(r,t,r7.newNoDocument(t,e))}n.Mt&&(t.set(r,n.Ot()),n.Ft())}});let n=i$();this.zt.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this.se(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.jt.forEach((t,n)=>n.setReadTime(e));let r=new sg(e,t,this.Wt,this.jt,n);return this.jt=ij,this.zt=sE(),this.Wt=new rN(rh),r}Jt(e,t){if(!this.te(e))return;let n=this.ae(e,t.key)?2:0;this.Zt(e).Bt(t.key,n),this.jt=this.jt.insert(t.key,t),this.zt=this.zt.insert(t.key,this.he(t.key).add(e))}Yt(e,t,n){if(!this.te(e))return;let r=this.Zt(e);this.ae(e,t)?r.Bt(t,1):r.Lt(t),this.zt=this.zt.insert(t,this.he(t).delete(e)),n&&(this.jt=this.jt.insert(t,n))}removeTarget(e){this.Qt.delete(e)}ie(e){let t=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let t=this.Qt.get(e);return t||(t=new sb,this.Qt.set(e,t)),t}he(e){let t=this.zt.get(e);return t||(t=new rP(rh),this.zt=this.zt.insert(e,t)),t}te(e){let t=null!==this.se(e);return t||n4("WatchChangeAggregator","Detected inactive target",e),t}se(e){let t=this.Qt.get(e);return t&&t.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new sb),this.Gt.getRemoteKeysForTarget(e).forEach(t=>{this.Yt(e,t,null)})}ae(e,t){return this.Gt.getRemoteKeysForTarget(e).has(t)}}function sE(){return new rN(r_.comparator)}function sI(){return new rN(r_.comparator)}let sC={asc:"ASCENDING",desc:"DESCENDING"},sk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sS={and:"AND",or:"OR"};class sx{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function sN(e,t){return e.useProto3Json||null==t?t:{value:t}}function sA(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function sR(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function sP(e){return e||n6(),rf.fromTimestamp(function(e){let t=rU(e);return new rd(t.seconds,t.nanos)}(e))}function sD(e,t){return new rm(["projects",e.projectId,"databases",e.database]).child("documents").child(t).canonicalString()}function sO(e){let t=rm.fromString(e);return sq(t)||n6(),t}function sL(e,t){let n=sO(t);if(n.get(1)!==e.databaseId.projectId)throw new n8(n7.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new n8(n7.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new r_(sU(n))}function sM(e,t){return sD(e.databaseId,t)}function sF(e){return new rm(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function sU(e){return e.length>4&&"documents"===e.get(4)||n6(),e.popFirst(5)}function sj(e){return{fieldPath:e.canonicalString()}}function sV(e){return ry.fromServerFormat(e.fieldPath)}function sq(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sB{constructor(e,t,n,r,i=rf.min(),s=rf.min(),o=rM.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new sB(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new sB(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new sB(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new sB(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sz{constructor(e){this.fe=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s${constructor(){}_e(e,t){this.me(e,t),t.ge()}me(e,t){if("nullValue"in e)this.ye(t,5);else if("booleanValue"in e)this.ye(t,10),t.pe(e.booleanValue?1:0);else if("integerValue"in e)this.ye(t,15),t.pe(rj(e.integerValue));else if("doubleValue"in e){let n=rj(e.doubleValue);isNaN(n)?this.ye(t,13):(this.ye(t,15),rC(n)?t.pe(0):t.pe(n))}else if("timestampValue"in e){let n=e.timestampValue;this.ye(t,20),"string"==typeof n?t.Ie(n):(t.Ie(`${n.seconds||""}`),t.pe(n.nanos||0))}else if("stringValue"in e)this.Te(e.stringValue,t),this.Ee(t);else if("bytesValue"in e)this.ye(t,30),t.Ae(rV(e.bytesValue)),this.Ee(t);else if("referenceValue"in e)this.ve(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.ye(t,45),t.pe(n.latitude||0),t.pe(n.longitude||0)}else"mapValue"in e?r5(e)?this.ye(t,Number.MAX_SAFE_INTEGER):(this.Re(e.mapValue,t),this.Ee(t)):"arrayValue"in e?(this.Pe(e.arrayValue,t),this.Ee(t)):n6()}Te(e,t){this.ye(t,25),this.be(e,t)}be(e,t){t.Ie(e)}Re(e,t){let n=e.fields||{};for(let e of(this.ye(t,55),Object.keys(n)))this.Te(e,t),this.me(n[e],t)}Pe(e,t){let n=e.values||[];for(let e of(this.ye(t,50),n))this.me(e,t)}ve(e,t){this.ye(t,37),r_.fromName(e).path.forEach(e=>{this.ye(t,60),this.be(e,t)})}ye(e,t){e.pe(t)}Ee(e){e.pe(2)}}s$.Ve=new s$;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sW{constructor(){this.rn=new sH}addToCollectionParentIndex(e,t){return this.rn.add(t),rT.resolve()}getCollectionParents(e,t){return rT.resolve(this.rn.getEntries(t))}addFieldIndex(e,t){return rT.resolve()}deleteFieldIndex(e,t){return rT.resolve()}getDocumentsMatchingTarget(e,t){return rT.resolve(null)}getIndexType(e,t){return rT.resolve(0)}getFieldIndexes(e,t){return rT.resolve([])}getNextCollectionGroupToUpdate(e){return rT.resolve(null)}getMinOffset(e,t){return rT.resolve(rv.min())}getMinOffsetFromCollectionGroup(e,t){return rT.resolve(rv.min())}updateCollectionGroup(e,t,n){return rT.resolve()}updateIndexEntries(e,t){return rT.resolve()}}class sH{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new rP(rm.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new rP(rm.comparator)).toArray()}}new Uint8Array(0);class sK{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new sK(e,sK.DEFAULT_COLLECTION_PERCENTILE,sK.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sK.DEFAULT_COLLECTION_PERCENTILE=10,sK.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,sK.DEFAULT=new sK(41943040,sK.DEFAULT_COLLECTION_PERCENTILE,sK.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),sK.DISABLED=new sK(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sG{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new sG(0)}static Mn(){return new sG(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sY{constructor(){this.changes=new iU(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,r7.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?rT.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sQ{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&i6(n.mutation,e,rO.empty(),rd.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,i$()).next(()=>t))}getLocalViewOfDocuments(e,t,n=i$()){let r=iB();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=iq();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=iB();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,i$()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=ij,s=iB(),o=iB();return t.forEach((e,t)=>{let o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof se)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),i6(o.mutation,t,o.mutation.getFieldMask(),rd.now())):s.set(t.key,rO.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new sQ(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(e,t){let n=iB(),r=new rN((e,t)=>e-t),i=i$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let o=n.get(e)||rO.empty();o=i.applyToLocalView(s,o),n.set(e,o);let a=(r.get(i.batchId)||i$()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{let s=[],o=r.getReverseIterator();for(;o.hasNext();){let r=o.getNext(),a=r.key,l=r.value,u=iB();l.forEach(e=>{if(!i.has(e)){let r=i5(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return rT.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){return r_.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):ix(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):rT.resolve(iB()),o=-1,a=i;return s.next(t=>rT.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?rT.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,i$())).next(e=>{let t;return{batchId:o,changes:(t=iV,e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t)}}))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new r_(t)).next(e=>{let t=iq();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){let r=t.collectionGroup,i=iq();return this.indexManager.getCollectionParents(e,r).next(s=>rT.forEach(s,s=>{var o;let a=(o=s.child(r),new iE(o,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt));return this.getDocumentsMatchingCollectionQuery(e,a,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r))).next(e=>{r.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,r7.newInvalidDocument(r)))});let n=iq();return e.forEach((e,i)=>{let s=r.get(e);void 0!==s&&i6(s.mutation,i,rO.empty(),rd.now()),iM(t,i)&&(n=n.insert(e,i))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sX{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,t){return rT.resolve(this.cs.get(t))}saveBundleMetadata(e,t){return this.cs.set(t.id,{id:t.id,version:t.version,createTime:sP(t.createTime)}),rT.resolve()}getNamedQuery(e,t){return rT.resolve(this.hs.get(t))}saveNamedQuery(e,t){return this.hs.set(t.name,{name:t.name,query:function(e){let t=function(e){var t,n,r,i,s,o,a,l;let u,h=function(e){let t=sO(e);return 4===t.length?rm.emptyPath():sU(t)}(e.parent),c=e.structuredQuery,d=c.from?c.from.length:0,f=null;if(d>0){1===d||n6();let e=c.from[0];e.allDescendants?f=e.collectionId:h=h.child(e.collectionId)}let p=[];c.where&&(p=function(e){var t;let n=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=sV(e.unaryFilter.field);return is.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=sV(e.unaryFilter.field);return is.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=sV(e.unaryFilter.field);return is.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=sV(e.unaryFilter.field);return is.create(i,"!=",{nullValue:"NULL_VALUE"});default:return n6()}}(t):void 0!==t.fieldFilter?is.create(sV(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return n6()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?io.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return n6()}}(t.compositeFilter.op)):n6()}(e);return n instanceof io&&il(t=n)&&ia(t)?n.getFilters():[n]}(c.where));let m=[];c.orderBy&&(m=c.orderBy.map(e=>new ir(sV(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let g=null;c.limit&&(g=null==(u="object"==typeof(t=c.limit)?t.value:t)?null:u);let y=null;c.startAt&&(y=function(e){let t=!!e.before,n=e.values||[];return new r8(n,t)}(c.startAt));let _=null;return c.endAt&&(_=function(e){let t=!e.before,n=e.values||[];return new r8(n,t)}(c.endAt)),n=h,r=f,i=m,s=p,o=g,a=y,l=_,new iE(n,r,i,s,o,"F",a,l)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?iP(t,t.limit,"L"):t}(t.bundledQuery),readTime:sP(t.readTime)}),rT.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sZ{constructor(){this.overlays=new rN(r_.comparator),this.ls=new Map}getOverlay(e,t){return rT.resolve(this.overlays.get(t))}getOverlays(e,t){let n=iB();return rT.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.we(e,t,r)}),rT.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.ls.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.ls.delete(n)),rT.resolve()}getOverlaysForCollection(e,t,n){let r=iB(),i=t.length+1,s=new r_(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){let e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return rT.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new rN((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=iB(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let o=iB(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return rT.resolve(o)}we(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.ls.get(r.largestBatchId).delete(n.key);this.ls.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new so(t,n));let i=this.ls.get(t);void 0===i&&(i=i$(),this.ls.set(t,i)),this.ls.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(){this.fs=new rP(s1.ds),this.ws=new rP(s1._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,t){let n=new s1(e,t);this.fs=this.fs.add(n),this.ws=this.ws.add(n)}gs(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.ys(new s1(e,t))}ps(e,t){e.forEach(e=>this.removeReference(e,t))}Is(e){let t=new r_(new rm([])),n=new s1(t,e),r=new s1(t,e+1),i=[];return this.ws.forEachInRange([n,r],e=>{this.ys(e),i.push(e.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){let t=new r_(new rm([])),n=new s1(t,e),r=new s1(t,e+1),i=i$();return this.ws.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new s1(e,0),n=this.fs.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class s1{constructor(e,t){this.key=e,this.As=t}static ds(e,t){return r_.comparator(e.key,t.key)||rh(e.As,t.As)}static _s(e,t){return rh(e.As,t.As)||r_.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s2{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.vs=1,this.Rs=new rP(s1.ds)}checkEmpty(e){return rT.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new ss(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.Rs=this.Rs.add(new s1(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return rT.resolve(s)}lookupMutationBatch(e,t){return rT.resolve(this.Ps(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.bs(t+1),r=n<0?0:n;return rT.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return rT.resolve(0===this.mutationQueue.length?-1:this.vs-1)}getAllMutationBatches(e){return rT.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new s1(t,0),r=new s1(t,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([n,r],e=>{let t=this.Ps(e.As);i.push(t)}),rT.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new rP(rh);return t.forEach(e=>{let t=new s1(e,0),r=new s1(e,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([t,r],e=>{n=n.add(e.As)})}),rT.resolve(this.Vs(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;r_.isDocumentKey(i)||(i=i.child(""));let s=new s1(new r_(i),0),o=new rP(rh);return this.Rs.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.As)),!0)},s),rT.resolve(this.Vs(o))}Vs(e){let t=[];return e.forEach(e=>{let n=this.Ps(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){0===this.Ss(t.batchId,"removed")||n6(),this.mutationQueue.shift();let n=this.Rs;return rT.forEach(t.mutations,r=>{let i=new s1(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Rs=n})}Cn(e){}containsKey(e,t){let n=new s1(t,0),r=this.Rs.firstAfterOrEqual(n);return rT.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,rT.resolve()}Ss(e,t){return this.bs(e)}bs(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Ps(e){let t=this.bs(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s4{constructor(e){this.Ds=e,this.docs=new rN(r_.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Ds(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return rT.resolve(n?n.document.mutableCopy():r7.newInvalidDocument(t))}getEntries(e,t){let n=ij;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():r7.newInvalidDocument(e))}),rT.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=ij,s=t.path,o=new r_(s.child("")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){let{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=r_.comparator(e.documentKey,t.documentKey))?n:rh(e.largestBatchId,t.largestBatchId)}(new rv(o.readTime,o.key,-1),n)||(r.has(o.key)||iM(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return rT.resolve(i)}getAllFromCollectionGroup(e,t,n,r){n6()}Cs(e,t){return rT.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new s9(this)}getSize(e){return rT.resolve(this.size)}}class s9 extends sY{constructor(e){super(),this.os=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.os.addEntry(e,r)):this.os.removeEntry(n)}),rT.waitFor(t)}getFromCache(e,t){return this.os.getEntry(e,t)}getAllFromCache(e,t){return this.os.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s3{constructor(e){this.persistence=e,this.xs=new iU(e=>iw(e),ib),this.lastRemoteSnapshotVersion=rf.min(),this.highestTargetId=0,this.Ns=0,this.ks=new s0,this.targetCount=0,this.Ms=sG.kn()}forEachTarget(e,t){return this.xs.forEach((e,n)=>t(n)),rT.resolve()}getLastRemoteSnapshotVersion(e){return rT.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return rT.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),rT.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Ns&&(this.Ns=t),rT.resolve()}Fn(e){this.xs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Ms=new sG(t),this.highestTargetId=t),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,t){return this.Fn(t),this.targetCount+=1,rT.resolve()}updateTargetData(e,t){return this.Fn(t),rT.resolve()}removeTargetData(e,t){return this.xs.delete(t.target),this.ks.Is(t.targetId),this.targetCount-=1,rT.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.xs.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.xs.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),rT.waitFor(i).next(()=>r)}getTargetCount(e){return rT.resolve(this.targetCount)}getTargetData(e,t){let n=this.xs.get(t)||null;return rT.resolve(n)}addMatchingKeys(e,t,n){return this.ks.gs(t,n),rT.resolve()}removeMatchingKeys(e,t,n){this.ks.ps(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),rT.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ks.Is(t),rT.resolve()}getMatchingKeysForTargetId(e,t){let n=this.ks.Es(t);return rT.resolve(n)}containsKey(e,t){return rT.resolve(this.ks.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s5{constructor(e,t){var n;this.$s={},this.overlays={},this.Os=new rI(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new s3(this),this.indexManager=new sW,this.remoteDocumentCache=(n=e=>this.referenceDelegate.Ls(e),new s4(n)),this.serializer=new sz(t),this.qs=new sX(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sZ,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.$s[e.toKey()];return n||(n=new s2(t,this.referenceDelegate),this.$s[e.toKey()]=n),n}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,t,n){n4("MemoryPersistence","Starting transaction:",e);let r=new s6(this.Os.next());return this.referenceDelegate.Us(),n(r).next(e=>this.referenceDelegate.Ks(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Gs(e,t){return rT.or(Object.values(this.$s).map(n=>()=>n.containsKey(e,t)))}}class s6 extends rw{constructor(e){super(),this.currentSequenceNumber=e}}class s7{constructor(e){this.persistence=e,this.Qs=new s0,this.js=null}static zs(e){return new s7(e)}get Ws(){if(this.js)return this.js;throw n6()}addReference(e,t,n){return this.Qs.addReference(n,t),this.Ws.delete(n.toString()),rT.resolve()}removeReference(e,t,n){return this.Qs.removeReference(n,t),this.Ws.add(n.toString()),rT.resolve()}markPotentiallyOrphaned(e,t){return this.Ws.add(t.toString()),rT.resolve()}removeTarget(e,t){this.Qs.Is(t.targetId).forEach(e=>this.Ws.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Ws.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Us(){this.js=new Set}Ks(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return rT.forEach(this.Ws,n=>{let r=r_.fromPath(n);return this.Hs(e,r).next(e=>{e||t.removeEntry(r,rf.min())})}).next(()=>(this.js=null,t.apply(e)))}updateLimboDocument(e,t){return this.Hs(e,t).next(e=>{e?this.Ws.delete(t.toString()):this.Ws.add(t.toString())})}Ls(e){return 0}Hs(e,t){return rT.or([()=>rT.resolve(this.Qs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gs(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s8{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Fi=n,this.Bi=r}static Li(e,t){let n=i$(),r=i$();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new s8(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(){this.qi=!1}initialize(e,t){this.Ui=e,this.indexManager=t,this.qi=!0}getDocumentsMatchingQuery(e,t,n,r){return this.Ki(e,t).next(i=>i||this.Gi(e,t,r,n)).next(n=>n||this.Qi(e,t))}Ki(e,t){if(iC(t))return rT.resolve(null);let n=iA(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=iA(t=iP(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=i$(...r);return this.Ui.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.ji(t,r);return this.zi(t,s,i,n.readTime)?this.Ki(e,iP(t,null,"F")):this.Wi(e,s,t,n)}))})))}Gi(e,t,n,r){return iC(t)||r.isEqual(rf.min())?this.Qi(e,t):this.Ui.getDocuments(e,n).next(i=>{let s=this.ji(t,i);return this.zi(t,s,n,r)?this.Qi(e,t):(n2()<=d.in.DEBUG&&n4("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),iL(t)),this.Wi(e,s,t,function(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=rf.fromTimestamp(1e9===r?new rd(n+1,0):new rd(n,r));return new rv(i,r_.empty(),-1)}(r,0)))})}ji(e,t){let n=new rP(iF(e));return t.forEach((t,r)=>{iM(e,r)&&(n=n.add(r))}),n}zi(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(e,t){return n2()<=d.in.DEBUG&&n4("QueryEngine","Using full collection scan to execute query:",iL(t)),this.Ui.getDocumentsMatchingQuery(e,t,rv.min())}Wi(e,t,n,r){return this.Ui.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,n,r){this.persistence=e,this.Hi=t,this.serializer=r,this.Ji=new rN(rh),this.Yi=new iU(e=>iw(e),ib),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(n)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new sJ(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ji))}}async function on(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e.tr(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],o=i$();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))o=o.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))o=o.add(t.key);return e.localDocuments.getDocuments(n,o).next(e=>({er:e,removedBatchIds:i,addedBatchIds:s}))})})}function or(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Bs.getLastRemoteSnapshotVersion(t))}async function oi(e,t,n){let r=e,i=r.Ji.get(t);try{n||await r.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!rE(e))throw e;n4("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ji=r.Ji.remove(t),r.Yi.delete(i.target)}function os(e,t,n){let r=rf.min(),i=i$();return e.persistence.runTransaction("Execute query","readonly",s=>(function(e,t,n){let r=e.Yi.get(n);return void 0!==r?rT.resolve(e.Ji.get(r)):e.Bs.getTargetData(t,n)})(e,s,iA(t)).next(t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,e.Bs.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.Hi.getDocumentsMatchingQuery(s,t,n?r:rf.min(),n?i:i$())).next(n=>{var r;let s;return r=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.Xi.get(r)||rf.min(),n.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.Xi.set(r,s),{documents:n,ir:i}}))}class oo{constructor(){this.activeTargetIds=iW}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class oa{constructor(){this.Hr=new oo,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,t,n){this.Jr[e]=t}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new oo,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){for(let e of(n4("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.so))e(0)}no(){for(let e of(n4("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.so))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oh=null;function oc(){return null===oh?oh=268435456+Math.round(2147483648*Math.random()):oh++,"0x"+oh.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let od={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let op="WebChannelConnection";class om extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.mo=t+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,t,n,r,i){let s=oc(),o=this.To(e,t);n4("RestConnection",`Sending RPC '${e}' ${s}:`,o,n);let a={};return this.Eo(a,r,i),this.Ao(e,o,a,n).then(t=>(n4("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw n3("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}vo(e,t,n,r,i,s){return this.Io(e,t,n,r,i)}Eo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+n0,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}To(e,t){let n=od[e];return`${this.mo}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,t,n,r){let i=oc();return new Promise((s,o)=>{let a=new nY;a.setWithCredentials(!0),a.listenOnce(n$.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case nz.NO_ERROR:let t=a.getResponseJson();n4(op,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case nz.TIMEOUT:n4(op,`RPC '${e}' ${i} timed out`),o(new n8(n7.DEADLINE_EXCEEDED,"Request time out"));break;case nz.HTTP_ERROR:let n=a.getStatus();if(n4(op,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(n7).indexOf(t)>=0?t:n7.UNKNOWN}(t.status);o(new n8(e,t.message))}else o(new n8(n7.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new n8(n7.UNAVAILABLE,"Connection failed."));break;default:n6()}}finally{n4(op,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(r);n4(op,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",l,n,15)})}Ro(e,t,n){let r=oc(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=nq(),o=nB(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.xmlHttpFactory=new nK({})),this.Eo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;let h=i.join("");n4(op,`Creating RPC '${e}' stream ${r}: ${h}`,l);let c=s.createWebChannel(h,l),d=!1,f=!1,p=new of({ro:t=>{f?n4(op,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(d||(n4(op,`Opening RPC '${e}' stream ${r} transport.`),c.open(),d=!0),n4(op,`RPC '${e}' stream ${r} sending:`,t),c.send(t))},oo:()=>c.close()}),m=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return m(c,nG.EventType.OPEN,()=>{f||n4(op,`RPC '${e}' stream ${r} transport opened.`)}),m(c,nG.EventType.CLOSE,()=>{f||(f=!0,n4(op,`RPC '${e}' stream ${r} transport closed`),p.wo())}),m(c,nG.EventType.ERROR,t=>{f||(f=!0,n3(op,`RPC '${e}' stream ${r} transport errored:`,t),p.wo(new n8(n7.UNAVAILABLE,"The operation could not be completed")))}),m(c,nG.EventType.MESSAGE,t=>{var n;if(!f){let i=t.data[0];i||n6();let s=i.error||(null===(n=i[0])||void 0===n?void 0:n.error);if(s){n4(op,`RPC '${e}' stream ${r} received error:`,s);let t=s.status,n=function(e){let t=a[e];if(void 0!==t)return sl(t)}(t),i=s.message;void 0===n&&(n=n7.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),f=!0,p.wo(new n8(n,i)),c.close()}else n4(op,`RPC '${e}' stream ${r} received:`,i),p._o(i)}}),m(o,nW.STAT_EVENT,t=>{t.stat===nH.PROXY?n4(op,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===nH.NOPROXY&&n4(op,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{p.fo()},0),p}}function og(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oy(e){return new sx(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t,n=1e3,r=1.5,i=6e4){this.ii=e,this.timerId=t,this.Po=n,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();let t=Math.floor(this.So+this.ko()),n=Math.max(0,Date.now()-this.Co),r=Math.max(0,t-n);r>0&&n4("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){null!==this.Do&&(this.Do.skipDelay(),this.Do=null)}cancel(){null!==this.Do&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t,n,r,i,s,o,a){this.ii=e,this.$o=n,this.Oo=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new o_(e,t)}Uo(){return 1===this.state||5===this.state||this.Ko()}Ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&null===this.Bo&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,t){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,4!==e?this.qo.reset():t&&t.code===n7.RESOURCE_EXHAUSTED?(n9(t.toString()),n9("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):t&&t.code===n7.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(t)}Yo(){}auth(){this.state=1;let e=this.Xo(this.Fo),t=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.Fo===t&&this.Zo(e,n)},t=>{e(()=>{let e=new n8(n7.UNKNOWN,"Fetching auth token failed: "+t.message);return this.tu(e)})})}Zo(e,t){let n=this.Xo(this.Fo);this.stream=this.eu(e,t),this.stream.uo(()=>{n(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(e=>{n(()=>this.tu(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return n4("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return t=>{this.ii.enqueueAndForget(()=>this.Fo===e?t():(n4("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ow extends ov{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}eu(e,t){return this.connection.Ro("Listen",e,t)}onMessage(e){this.qo.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i;t.targetChange;let s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:n6(),o=t.targetChange.targetIds||[],a=(i=t.targetChange.resumeToken,e.useProto3Json?(void 0===i||"string"==typeof i||n6(),rM.fromBase64String(i||"")):(void 0===i||i instanceof Uint8Array||n6(),rM.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause,u=l&&function(e){let t=void 0===e.code?n7.UNKNOWN:sl(e.code);return new n8(t,e.message||"")}(l);n=new sw(s,o,a,u||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=sL(e,r.document.name),s=sP(r.document.updateTime),o=r.document.createTime?sP(r.document.createTime):rf.min(),a=new r6({mapValue:{fields:r.document.fields}}),l=r7.newFoundDocument(i,s,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];n=new s_(u,h,l.key,l)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=sL(e,r.document),s=r.readTime?sP(r.readTime):rf.min(),o=r7.newNoDocument(i,s),a=r.removedTargetIds||[];n=new s_([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=sL(e,r.document),s=r.removedTargetIds||[];n=new s_([],s,i,null)}else{if(!("filter"in t))return n6();{t.filter;let e=t.filter;e.targetId;let{count:r=0,unchangedNames:i}=e,s=new sa(r,i),o=e.targetId;n=new sv(o,s)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return rf.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?rf.min():t.readTime?sP(t.readTime):rf.min()}(e);return this.listener.nu(t,n)}su(e){let t={};t.database=sF(this.serializer),t.addTarget=function(e,t){let n;let r=t.target;if((n=iT(r)?{documents:{documents:[sM(e,r.path)]}}:{query:function(e,t){var n,r;let i={structuredQuery:{}},s=t.path;null!==t.collectionGroup?(i.parent=sM(e,s),i.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i.parent=sM(e,s.popLast()),i.structuredQuery.from=[{collectionId:s.lastSegment()}]);let o=function(e){if(0!==e.length)return function e(t){return t instanceof is?function(e){if("=="===e.op){if(r4(e.value))return{unaryFilter:{field:sj(e.field),op:"IS_NAN"}};if(r2(e.value))return{unaryFilter:{field:sj(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(r4(e.value))return{unaryFilter:{field:sj(e.field),op:"IS_NOT_NAN"}};if(r2(e.value))return{unaryFilter:{field:sj(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:sj(e.field),op:sk[e.op],value:e.value}}}(t):t instanceof io?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:sS[t.op],filters:n}}}(t):n6()}(io.create(e,"and"))}(t.filters);o&&(i.structuredQuery.where=o);let a=function(e){if(0!==e.length)return e.map(e=>({field:sj(e.field),direction:sC[e.dir]}))}(t.orderBy);a&&(i.structuredQuery.orderBy=a);let l=sN(e,t.limit);return null!==l&&(i.structuredQuery.limit=l),t.startAt&&(i.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(i.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),i}(e,r)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=sR(e,t.resumeToken);let r=sN(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(rf.min())>0){n.readTime=sA(e,t.snapshotVersion.toTimestamp());let r=sN(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);let n=function(e,t){let n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return n6()}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.Wo(t)}iu(e){let t={};t.database=sF(this.serializer),t.removeTarget=e,this.Wo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new n8(n7.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,t,n){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Io(e,t,n,r,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===n7.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new n8(n7.UNKNOWN,e.toString())})}vo(e,t,n,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.vo(e,t,n,i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===n7.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new n8(n7.UNKNOWN,e.toString())})}terminate(){this.lu=!0}}class oT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){0===this.wu&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){"Online"===this.state?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,"Online"===e&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(n9(t),this.mu=!1):n4("OnlineStateTracker",t)}Tu(){null!==this._u&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(e=>{n.enqueueAndForget(async()=>{oP(this)&&(n4("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.vu.add(4),await oC(e),e.bu.set("Unknown"),e.vu.delete(4),await oI(e)}(this))})}),this.bu=new oT(n,r)}}async function oI(e){if(oP(e))for(let t of e.Ru)await t(!0)}async function oC(e){for(let t of e.Ru)await t(!1)}function ok(e,t){e.Au.has(t.targetId)||(e.Au.set(t.targetId,t),oR(e)?oA(e):oj(e).Ko()&&ox(e,t))}function oS(e,t){let n=oj(e);e.Au.delete(t),n.Ko()&&oN(e,t),0===e.Au.size&&(n.Ko()?n.jo():oP(e)&&e.bu.set("Unknown"))}function ox(e,t){if(e.Vu.qt(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(rf.min())>0){let n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}oj(e).su(t)}function oN(e,t){e.Vu.qt(t),oj(e).iu(t)}function oA(e){e.Vu=new sT({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),le:t=>e.Au.get(t)||null,ue:()=>e.datastore.serializer.databaseId}),oj(e).start(),e.bu.gu()}function oR(e){return oP(e)&&!oj(e).Uo()&&e.Au.size>0}function oP(e){return 0===e.vu.size}async function oD(e){e.Au.forEach((t,n)=>{ox(e,t)})}async function oO(e,t){e.Vu=void 0,oR(e)?(e.bu.Iu(t),oA(e)):e.bu.set("Unknown")}async function oL(e,t,n){if(e.bu.set("Online"),t instanceof sw&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.Au.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Au.delete(r),e.Vu.removeTarget(r))}(e,t)}catch(n){n4("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await oM(e,n)}else if(t instanceof s_?e.Vu.Ht(t):t instanceof sv?e.Vu.ne(t):e.Vu.Xt(t),!n.isEqual(rf.min()))try{let t=await or(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.Vu.ce(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.Au.get(r);i&&e.Au.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{let r=e.Au.get(t);if(!r)return;e.Au.set(t,r.withResumeToken(rM.EMPTY_BYTE_STRING,r.snapshotVersion)),oN(e,t);let i=new sB(r.target,t,n,r.sequenceNumber);ox(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){n4("RemoteStore","Failed to raise snapshot:",t),await oM(e,t)}}async function oM(e,t,n){if(!rE(t))throw t;e.vu.add(1),await oC(e),e.bu.set("Offline"),n||(n=()=>or(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{n4("RemoteStore","Retrying IndexedDB access"),await n(),e.vu.delete(1),await oI(e)})}async function oF(e,t){e.asyncQueue.verifyOperationInProgress(),n4("RemoteStore","RemoteStore received new credentials");let n=oP(e);e.vu.add(3),await oC(e),n&&e.bu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.vu.delete(3),await oI(e)}async function oU(e,t){t?(e.vu.delete(2),await oI(e)):t||(e.vu.add(2),await oC(e),e.bu.set("Unknown"))}function oj(e){var t,n,r;return e.Su||(e.Su=(t=e.datastore,n=e.asyncQueue,r={uo:oD.bind(null,e),ao:oO.bind(null,e),nu:oL.bind(null,e)},t.fu(),new ow(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.Ru.push(async t=>{t?(e.Su.Qo(),oR(e)?oA(e):e.bu.set("Unknown")):(await e.Su.stop(),e.Vu=void 0)})),e.Su}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oV{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new re,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,r,i){let s=Date.now()+n,o=new oV(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new n8(n7.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oq(e,t){if(n9("AsyncQueue",`${t}: ${e}`),rE(e))return new n8(n7.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oB{constructor(e){this.comparator=e?(t,n)=>e(t,n)||r_.comparator(t.key,n.key):(e,t)=>r_.comparator(e.key,t.key),this.keyedMap=iq(),this.sortedSet=new rN(this.comparator)}static emptySet(e){return new oB(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof oB)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new oB;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oz{constructor(){this.Cu=new rN(r_.comparator)}track(e){let t=e.doc.key,n=this.Cu.get(t);n?0!==e.type&&3===n.type?this.Cu=this.Cu.insert(t,e):3===e.type&&1!==n.type?this.Cu=this.Cu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Cu=this.Cu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Cu=this.Cu.remove(t):1===e.type&&2===n.type?this.Cu=this.Cu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):n6():this.Cu=this.Cu.insert(t,e)}xu(){let e=[];return this.Cu.inorderTraversal((t,n)=>{e.push(n)}),e}}class o${constructor(e,t,n,r,i,s,o,a,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new o$(e,t,oB.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&iD(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oW{constructor(){this.Nu=void 0,this.listeners=[]}}class oH{constructor(){this.queries=new iU(e=>iO(e),iD),this.onlineState="Unknown",this.ku=new Set}}async function oK(e,t){let n=t.query,r=!1,i=e.queries.get(n);if(i||(r=!0,i=new oW),r)try{i.Nu=await e.onListen(n)}catch(n){let e=oq(n,`Initialization of query '${iL(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.listeners.push(t),t.Mu(e.onlineState),i.Nu&&t.$u(i.Nu)&&oJ(e)}async function oG(e,t){let n=t.query,r=!1,i=e.queries.get(n);if(i){let e=i.listeners.indexOf(t);e>=0&&(i.listeners.splice(e,1),r=0===i.listeners.length)}if(r)return e.queries.delete(n),e.onUnlisten(n)}function oY(e,t){let n=!1;for(let r of t){let t=r.query,i=e.queries.get(t);if(i){for(let e of i.listeners)e.$u(r)&&(n=!0);i.Nu=r}}n&&oJ(e)}function oQ(e,t,n){let r=e.queries.get(t);if(r)for(let e of r.listeners)e.onError(n);e.queries.delete(t)}function oJ(e){e.ku.forEach(e=>{e.next()})}class oX{constructor(e,t,n){this.query=e,this.Ou=t,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=n||{}}$u(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new o$(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),t=!0):this.qu(e,this.onlineState)&&(this.Uu(e),t=!0),this.Bu=e,t}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let t=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),t=!0),t}qu(e,t){return!e.fromCache||(!this.options.Ku||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Lu(e){if(e.docChanges.length>0)return!0;let t=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Uu(e){e=o$.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oZ{constructor(e){this.key=e}}class o0{constructor(e){this.key=e}}class o1{constructor(e,t){this.query=e,this.Yu=t,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=i$(),this.mutatedKeys=i$(),this.tc=iF(e),this.ec=new oB(this.tc)}get nc(){return this.Yu}sc(e,t){let n=t?t.ic:new oz,r=t?t.ec:this.ec,i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1,a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,l="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let u=r.get(e),h=iM(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(n.track({type:3,doc:h}),f=!0):this.rc(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.tc(h,a)>0||l&&0>this.tc(h,l))&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||l)&&(o=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{ec:s,ic:n,zi:o,mutatedKeys:i}}rc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){let r=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;let i=e.ic.xu();i.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return n6()}};return n(e)-n(t)})(e.type,t.type)||this.tc(e.doc,t.doc)),this.oc(n);let s=t?this.uc():[],o=0===this.Zu.size&&this.current?1:0,a=o!==this.Xu;return(this.Xu=o,0!==i.length||a)?{snapshot:new o$(this.query,e.ec,r,i,e.mutatedKeys,0===o,a,!1,!!n&&n.resumeToken.approximateByteSize()>0),cc:s}:{cc:s}}Mu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({ec:this.ec,ic:new oz,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(e=>this.Yu=this.Yu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Yu=this.Yu.delete(e)),this.current=e.current)}uc(){if(!this.current)return[];let e=this.Zu;this.Zu=i$(),this.ec.forEach(e=>{this.ac(e.key)&&(this.Zu=this.Zu.add(e.key))});let t=[];return e.forEach(e=>{this.Zu.has(e)||t.push(new o0(e))}),this.Zu.forEach(n=>{e.has(n)||t.push(new oZ(n))}),t}hc(e){this.Yu=e.ir,this.Zu=i$();let t=this.sc(e.documents);return this.applyChanges(t,!0)}lc(){return o$.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,0===this.Xu,this.hasCachedResults)}}class o2{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class o4{constructor(e){this.key=e,this.fc=!1}}class o9{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.dc={},this.wc=new iU(e=>iO(e),iD),this._c=new Map,this.mc=new Set,this.gc=new rN(r_.comparator),this.yc=new Map,this.Ic=new s0,this.Tc={},this.Ec=new Map,this.Ac=sG.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return!0===this.vc}}async function o3(e,t){let n,r;let i=function(e){let t=e;return t.remoteStore.remoteSyncer.applyRemoteEvent=o7.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=aa.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=ae.bind(null,t),t.dc.nu=oY.bind(null,t.eventManager),t.dc.Pc=oQ.bind(null,t.eventManager),t}(e),s=i.wc.get(t);if(s)n=s.targetId,i.sharedClientState.addLocalQueryTarget(n),r=s.view.lc();else{let e=await function(e,t){let n=e;return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Bs.getTargetData(e,t).next(i=>i?(r=i,rT.resolve(r)):n.Bs.allocateTargetId(e).next(i=>(r=new sB(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.Bs.addTargetData(e,r).next(()=>r))))}).then(e=>{let r=n.Ji.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(e.targetId,e),n.Yi.set(t,e.targetId)),e})}(i.localStore,iA(t)),s=i.sharedClientState.addLocalQueryTarget(e.targetId);n=e.targetId,r=await o5(i,t,n,"current"===s,e.resumeToken),i.isPrimaryClient&&ok(i.remoteStore,e)}return r}async function o5(e,t,n,r,i){e.Rc=(t,n,r)=>(async function(e,t,n,r){let i=t.view.sc(n);i.zi&&(i=await os(e.localStore,t.query,!1).then(({documents:e})=>t.view.sc(e,i)));let s=r&&r.targetChanges.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s);return ar(e,t.targetId,o.cc),o.snapshot})(e,t,n,r);let s=await os(e.localStore,t,!0),o=new o1(t,s.ir),a=o.sc(s.documents),l=sy.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,l);ar(e,n,u.cc);let h=new o2(t,n,o);return e.wc.set(t,h),e._c.has(n)?e._c.get(n).push(t):e._c.set(n,[t]),u.snapshot}async function o6(e,t){let n=e.wc.get(t),r=e._c.get(n.targetId);if(r.length>1)return e._c.set(n.targetId,r.filter(e=>!iD(e,t))),void e.wc.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await oi(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),oS(e.remoteStore,n.targetId),at(e,n.targetId)}).catch(rb)):(at(e,n.targetId),await oi(e.localStore,n.targetId,!0))}async function o7(e,t){try{let n=await function(e,t){let n=e,r=t.snapshotVersion,i=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{var s;let o,a;let l=n.Zi.newChangeBuffer({trackRemovals:!0});i=n.Ji;let u=[];t.targetChanges.forEach((s,o)=>{var a;let l=i.get(o);if(!l)return;u.push(n.Bs.removeMatchingKeys(e,s.removedDocuments,o).next(()=>n.Bs.addMatchingKeys(e,s.addedDocuments,o)));let h=l.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(o)?h=h.withResumeToken(rM.EMPTY_BYTE_STRING,rf.min()).withLastLimboFreeSnapshotVersion(rf.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,r)),i=i.insert(o,h),a=h,(0===l.resumeToken.approximateByteSize()||a.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(n.Bs.updateTargetData(e,h))});let h=ij,c=i$();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),u.push((s=t.documentUpdates,o=i$(),a=i$(),s.forEach(e=>o=o.add(e)),l.getEntries(e,o).next(e=>{let t=ij;return s.forEach((n,r)=>{let i=e.get(n);r.isFoundDocument()!==i.isFoundDocument()&&(a=a.add(n)),r.isNoDocument()&&r.version.isEqual(rf.min())?(l.removeEntry(n,r.readTime),t=t.insert(n,r)):!i.isValidDocument()||r.version.compareTo(i.version)>0||0===r.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(r),t=t.insert(n,r)):n4("LocalStore","Ignoring outdated watch update for ",n,". Current version:",i.version," Watch version:",r.version)}),{nr:t,sr:a}})).next(e=>{h=e.nr,c=e.sr})),!r.isEqual(rf.min())){let t=n.Bs.getLastRemoteSnapshotVersion(e).next(t=>n.Bs.setTargetsMetadata(e,e.currentSequenceNumber,r));u.push(t)}return rT.waitFor(u).next(()=>l.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,h,c)).next(()=>h)}).then(e=>(n.Ji=i,e))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let r=e.yc.get(n);r&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||n6(),t.addedDocuments.size>0?r.fc=!0:t.modifiedDocuments.size>0?r.fc||n6():t.removedDocuments.size>0&&(r.fc||n6(),r.fc=!1))}),await as(e,n,t)}catch(e){await rb(e)}}function o8(e,t,n){let r=e;if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){let e=[];r.wc.forEach((n,r)=>{let i=r.view.Mu(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){let n=e;n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(let e of n.listeners)e.Mu(t)&&(r=!0)}),r&&oJ(n)}(r.eventManager,t),e.length&&r.dc.nu(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function ae(e,t,n){let r=e;r.sharedClientState.updateQueryState(t,"rejected",n);let i=r.yc.get(t),s=i&&i.key;if(s){let e=new rN(r_.comparator);e=e.insert(s,r7.newNoDocument(s,rf.min()));let n=i$().add(s),i=new sg(rf.min(),new Map,new rN(rh),e,n);await o7(r,i),r.gc=r.gc.remove(s),r.yc.delete(t),ai(r)}else await oi(r.localStore,t,!1).then(()=>at(r,t,n)).catch(rb)}function at(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e._c.get(t)))e.wc.delete(r),n&&e.dc.Pc(r,n);e._c.delete(t),e.isPrimaryClient&&e.Ic.Is(t).forEach(t=>{e.Ic.containsKey(t)||an(e,t)})}function an(e,t){e.mc.delete(t.path.canonicalString());let n=e.gc.get(t);null!==n&&(oS(e.remoteStore,n),e.gc=e.gc.remove(t),e.yc.delete(n),ai(e))}function ar(e,t,n){for(let r of n)r instanceof oZ?(e.Ic.addReference(r.key,t),function(e,t){let n=t.key,r=n.path.canonicalString();e.gc.get(n)||e.mc.has(r)||(n4("SyncEngine","New document in limbo: "+n),e.mc.add(r),ai(e))}(e,r)):r instanceof o0?(n4("SyncEngine","Document no longer in limbo: "+r.key),e.Ic.removeReference(r.key,t),e.Ic.containsKey(r.key)||an(e,r.key)):n6()}function ai(e){for(;e.mc.size>0&&e.gc.size<e.maxConcurrentLimboResolutions;){let t=e.mc.values().next().value;e.mc.delete(t);let n=new r_(rm.fromString(t)),r=e.Ac.next();e.yc.set(r,new o4(n)),e.gc=e.gc.insert(n,r),ok(e.remoteStore,new sB(iA(iI(n.path)),r,"TargetPurposeLimboResolution",rI.ct))}}async function as(e,t,n){let r=[],i=[],s=[];e.wc.isEmpty()||(e.wc.forEach((o,a)=>{s.push(e.Rc(a,t,n).then(t=>{if((t||n)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(a.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){r.push(t);let e=s8.Li(a.targetId,t);i.push(e)}}))}),await Promise.all(s),e.dc.nu(r),await async function(e,t){let n=e;try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>rT.forEach(t,t=>rT.forEach(t.Fi,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>rT.forEach(t.Bi,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!rE(e))throw e;n4("LocalStore","Failed to update sequence numbers: "+e)}for(let e of t){let t=e.targetId;if(!e.fromCache){let e=n.Ji.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.Ji=n.Ji.insert(t,i)}}}(e.localStore,i))}async function ao(e,t){let n=e;if(!n.currentUser.isEqual(t)){n4("SyncEngine","User change. New user:",t.toKey());let e=await on(n.localStore,t);n.currentUser=t,n.Ec.forEach(e=>{e.forEach(e=>{e.reject(new n8(n7.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),n.Ec.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await as(n,e.er)}}function aa(e,t){let n=e.yc.get(t);if(n&&n.fc)return i$().add(n.key);{let n=i$(),r=e._c.get(t);if(!r)return n;for(let t of r){let r=e.wc.get(t);n=n.unionWith(r.view.nc)}return n}}class al{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=oy(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){var t,n,r,i;return t=this.persistence,n=new oe,r=e.initialUser,i=this.serializer,new ot(t,n,r,i)}createPersistence(e){return new s5(s7.zs,this.serializer)}createSharedClientState(e){return new oa}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class au{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>o8(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ao.bind(null,this.syncEngine),await oU(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new oH}createDatastore(e){var t,n,r;let i=oy(e.databaseInfo.databaseId),s=(t=e.databaseInfo,new om(t));return n=e.authCredentials,r=e.appCheckCredentials,new ob(n,r,s,i)}createRemoteStore(e){var t,n,r,i,s;return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>o8(this.syncEngine,e,0),s=ou.D()?new ou:new ol,new oE(t,n,r,i,s)}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){let a=new o9(e,t,n,r,i,s);return o&&(a.vc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){n4("RemoteStore","RemoteStore shutting down."),e.vu.add(5),await oC(e),e.Pu.shutdown(),e.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):n9("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=nZ.UNAUTHENTICATED,this.clientId=ru.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{n4("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(n4("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new n8(n7.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new re;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=oq(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function ad(e,t){e.asyncQueue.verifyOperationInProgress(),n4("FirestoreClient","Initializing OfflineComponentProvider");let n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await on(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function af(e,t){e.asyncQueue.verifyOperationInProgress();let n=await ap(e);n4("FirestoreClient","Initializing OnlineComponentProvider");let r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(e=>oF(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>oF(t.remoteStore,n)),e._onlineComponents=t}async function ap(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){n4("FirestoreClient","Using user provided OfflineComponentProvider");try{await ad(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===n7.FAILED_PRECONDITION||t.code===n7.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;n3("Error using user provided cache. Falling back to memory cache: "+t),await ad(e,new al)}}else n4("FirestoreClient","Using default OfflineComponentProvider"),await ad(e,new al)}return e._offlineComponents}async function am(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(n4("FirestoreClient","Using user provided OnlineComponentProvider"),await af(e,e._uninitializedComponentsProvider._online)):(n4("FirestoreClient","Using default OnlineComponentProvider"),await af(e,new au))),e._onlineComponents}async function ag(e){let t=await am(e),n=t.eventManager;return n.onListen=o3.bind(null,t.syncEngine),n.onUnlisten=o6.bind(null,t.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ay(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let a_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function av(e,t,n){if(!n)throw new n8(n7.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function aw(e){if(!r_.isDocumentKey(e))throw new n8(n7.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ab(e){if(r_.isDocumentKey(e))throw new n8(n7.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function aT(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":n6()}function aE(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new n8(n7.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=aT(e);throw new n8(n7.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new n8(n7.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new n8(n7.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new n8(n7.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ay(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new n8(n7.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new n8(n7.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new n8(n7.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,n;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class aC{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new aI({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new n8(n7.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new n8(n7.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new aI(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new rn;switch(e.type){case"firstParty":return new ro(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new n8(n7.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=a_.get(e);t&&(n4("ComponentProvider","Removing Datastore"),a_.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ax(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ak(this.firestore,e,this._key)}}class aS{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new aS(this.firestore,e,this._query)}}class ax extends aS{constructor(e,t,n){super(e,t,iI(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ak(this.firestore,null,new r_(e))}withConverter(e){return new ax(this.firestore,e,this._path)}}function aN(e,t,...n){if(e=(0,f.m9)(e),av("collection","path",t),e instanceof aC){let r=rm.fromString(t,...n);return ab(r),new ax(e,null,r)}{if(!(e instanceof ak||e instanceof ax))throw new n8(n7.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(rm.fromString(t,...n));return ab(r),new ax(e.firestore,null,r)}}function aA(e,t,...n){if(e=(0,f.m9)(e),1==arguments.length&&(t=ru.A()),av("doc","path",t),e instanceof aC){let r=rm.fromString(t,...n);return aw(r),new ak(e,null,new r_(r))}{if(!(e instanceof ak||e instanceof ax))throw new n8(n7.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(rm.fromString(t,...n));return aw(r),new ak(e.firestore,e instanceof ax?e.converter:null,new r_(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new o_(this,"async_queue_retry"),this.Xc=()=>{let e=og();e&&n4("AsyncQueue","Visibility state changed to "+e.visibilityState),this.qo.Mo()};let e=og();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;let t=og();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});let t=new re;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(0!==this.Qc.length){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!rE(e))throw e;n4("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){let t=this.Gc.then(()=>(this.Hc=!0,e().catch(e=>{let t;this.Wc=e,this.Hc=!1;let n=(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t);throw n9("INTERNAL UNHANDLED ERROR: ",n),e}).then(e=>(this.Hc=!1,e))));return this.Gc=t,t}enqueueAfterDelay(e,t,n){this.Zc(),this.Yc.indexOf(e)>-1&&(t=0);let r=oV.createAndSchedule(this,e,t,n,e=>this.na(e));return this.zc.push(r),r}Zc(){this.Wc&&n6()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(let t of this.zc)if(t.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{for(let t of(this.zc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.zc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){let t=this.zc.indexOf(e);this.zc.splice(t,1)}}function aP(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])}class aD extends aC{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new aR,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||aM(this),this._firestoreClient.terminate()}}function aO(e,t){let n="object"==typeof e?e:(0,h.Mq)(),r=(0,h.qX)(n,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!r._initialized){let e=(0,f.P0)("firestore");e&&function(e,t,n,r={}){var i;let s=(e=aE(e,aC))._getSettings(),o=`${t}:${n}`;if("firestore.googleapis.com"!==s.host&&s.host!==o&&n3("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=nZ.MOCK_USER;else{t=(0,f.Sg)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new n8(n7.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new nZ(s)}e._authCredentials=new rr(new rt(t,n))}}(r,...e)}return r}function aL(e){return e._firestoreClient||aM(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function aM(e){var t,n,r,i,s,o;let a=e._freezeSettings(),l=(i=e._databaseId,s=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",o=e._persistenceKey,new r$(i,s,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,ay(a.experimentalLongPollingOptions),a.useFetchStreams));e._firestoreClient=new ac(e._authCredentials,e._appCheckCredentials,e._queue,l),(null===(n=a.cache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=a.cache)||void 0===r?void 0:r._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:a.cache.kind,_offline:a.cache._offlineComponentProvider,_online:a.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aF{constructor(e){this._byteString=e}static fromBase64String(e){try{return new aF(rM.fromBase64String(e))}catch(e){throw new n8(n7.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new aF(rM.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aU{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new n8(n7.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ry(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aj{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aV{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new n8(n7.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new n8(n7.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return rh(this._lat,e._lat)||rh(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aq=/^__.*__$/;function aB(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw n6()}}class az{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new az(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.aa({path:n,la:!1});return r.fa(e),r}da(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.aa({path:n,la:!1});return r.ua(),r}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return aK(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(0===e.length)throw this._a("Document fields must not be empty");if(aB(this.ca)&&aq.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class a${constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||oy(e)}ya(e,t,n,r=!1){return new az({ca:e,methodName:t,ga:n,path:ry.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function aW(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof rd||e instanceof aV||e instanceof aF||e instanceof ak||e instanceof aj)}let aH=RegExp("[~\\*/\\[\\]]");function aK(e,t,n,r,i){let s=r&&!r.isEmpty(),o=void 0!==i,a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new n8(n7.INVALID_ARGUMENT,a+e+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aG{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ak(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new aY(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(aQ("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class aY extends aG{data(){return super.data()}}function aQ(e,t){return"string"==typeof t?function(e,t,n){if(t.search(aH)>=0)throw aK(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new aU(...t.split("."))._internalPath}catch(r){throw aK(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}(e,t):t instanceof aU?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aJ(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new n8(n7.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class aX{}class aZ extends aX{}function a0(e,t,...n){let r=[];for(let i of(t instanceof aX&&r.push(t),function(e){let t=e.filter(e=>e instanceof a4).length,n=e.filter(e=>e instanceof a1).length;if(t>1||t>0&&n>0)throw new n8(n7.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r=r.concat(n)),r))e=i._apply(e);return e}class a1 extends aZ{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new a1(e,t,n)}_apply(e){let t=this._parse(e);return a7(e._query,t),new aS(e.firestore,e.converter,iR(e._query,t))}_parse(e){let t=function(e){let t=e._freezeSettings(),n=oy(e._databaseId);return new a$(e._databaseId,!!t.ignoreUndefinedProperties,n)}(e.firestore),n=function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new n8(n7.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){a6(o,s);let t=[];for(let n of o)t.push(a5(r,e,n));a={arrayValue:{values:t}}}else a=a5(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||a6(o,s),a=function(e,t,n,r=!1){return function e(t,n){if(aW(t=(0,f.m9)(t)))return function(e,t,n){if(!aW(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let r=aT(n);throw"an object"===r?t._a(e+" a custom object"):t._a(e+" "+r)}}("Unsupported field value:",n,t),function(t,n){let r={};return rx(t)?n.path&&n.path.length>0&&n.fieldMask.push(n.path):rS(t,(t,i)=>{let s=e(i,n.ha(t));null!=s&&(r[t]=s)}),{mapValue:{fields:r}}}(t,n);if(t instanceof aj)return function(e,t){if(!aB(t.ca))throw t._a(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t._a(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(t,n),null;if(void 0===t&&n.ignoreUndefinedProperties)return null;if(n.path&&n.fieldMask.push(n.path),t instanceof Array){if(n.settings.la&&4!==n.ca)throw n._a("Nested arrays are not supported");return function(t,n){let r=[],i=0;for(let s of t){let t=e(s,n.wa(i));null==t&&(t={nullValue:"NULL_VALUE"}),r.push(t),i++}return{arrayValue:{values:r}}}(t,n)}return function(e,t){if(null===(e=(0,f.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var n,r,i;return n=t.serializer,"number"==typeof(i=r=e)&&Number.isInteger(i)&&!rC(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?iK(r):iH(n,r)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=rd.fromDate(e);return{timestampValue:sA(t.serializer,n)}}if(e instanceof rd){let n=new rd(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:sA(t.serializer,n)}}if(e instanceof aV)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof aF)return{bytesValue:sR(t.serializer,e._byteString)};if(e instanceof ak){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t._a(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:sD(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t._a(`Unsupported field value: ${aT(e)}`)}(t,n)}(n,e.ya(r?4:3,t))}(n,t,o,"in"===s||"not-in"===s);return is.create(i,s,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function a2(e,t,n){let r=aQ("where",e);return a1._create(r,t,n)}class a4 extends aX{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new a4(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:io.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e,r=t.getFlattenedFilters();for(let e of r)a7(n,e),n=iR(n,e)}(e._query,t),new aS(e.firestore,e.converter,iR(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class a9 extends aZ{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new a9(e,t,n)}_apply(e){return new aS(e.firestore,e.converter,iP(e._query,this._limit,this._limitType))}}function a3(e){return function(e,t){if(t<=0)throw new n8(n7.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),a9._create("limit",e,"F")}function a5(e,t,n){if("string"==typeof(n=(0,f.m9)(n))){if(""===n)throw new n8(n7.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ix(t)&&-1!==n.indexOf("/"))throw new n8(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(rm.fromString(n));if(!r_.isDocumentKey(r))throw new n8(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return rZ(e,new r_(r))}if(n instanceof ak)return rZ(e,n._key);throw new n8(n7.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${aT(n)}.`)}function a6(e,t){if(!Array.isArray(e)||0===e.length)throw new n8(n7.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function a7(e,t){if(t.isInequality()){let n=iS(e),r=t.field;if(null!==n&&!n.isEqual(r))throw new n8(n7.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${r.toString()}'`);let i=ik(e);null!==i&&function(e,t,n){if(!n.isEqual(t))throw new n8(n7.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}(0,r,i)}let n=function(e,t){for(let n of e)for(let e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new n8(n7.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new n8(n7.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class a8{convertValue(e,t="none"){switch(rK(e)){case 0:return null;case 1:return e.booleanValue;case 2:return rj(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rV(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw n6()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return rS(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new aV(rj(e.latitude),rj(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=rB(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(rz(e));default:return null}}convertTimestamp(e){let t=rU(e);return new rd(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=rm.fromString(e);sq(n)||n6();let r=new rW(n.get(1),n.get(3)),i=new r_(n.popFirst(5));return r.isEqual(t)||n9(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lt extends aG{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new ln(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(aQ("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class ln extends lt{data(e={}){return super.data(e)}}class lr{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new le(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new ln(this._firestore,this._userDataWriter,n.key,n,new le(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new n8(n7.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{let r=new ln(e._firestore,e._userDataWriter,n.doc.key,n.doc,new le(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let r=new ln(e._firestore,e._userDataWriter,t.doc.key,t.doc,new le(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(s=(n=n.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return n6()}}(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(e){e=aE(e,ak);let t=aE(e.firestore,aD);return(function(e,t,n={}){let r=new re;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new ah({next:s=>{t.enqueueAndForget(()=>oG(e,o));let a=s.docs.has(n);!a&&s.fromCache?i.reject(new n8(n7.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&s.fromCache&&r&&"server"===r.source?i.reject(new n8(n7.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),o=new oX(iI(n.path),s,{includeMetadataChanges:!0,Ku:!0});return oK(e,o)})(await ag(e),e.asyncQueue,t,n,r)),r.promise})(aL(t),e._key).then(n=>ll(t,e,n))}class ls extends a8{constructor(e){super(),this.firestore=e}convertBytes(e){return new aF(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ak(this.firestore,null,t)}}function lo(e){e=aE(e,aS);let t=aE(e.firestore,aD),n=aL(t),r=new ls(t);return aJ(e._query),(function(e,t,n={}){let r=new re;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new ah({next:n=>{t.enqueueAndForget(()=>oG(e,o)),n.fromCache&&"server"===r.source?i.reject(new n8(n7.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new oX(n,s,{includeMetadataChanges:!0,Ku:!0});return oK(e,o)})(await ag(e),e.asyncQueue,t,n,r)),r.promise})(n,e._query).then(n=>new lr(t,r,e,n))}function la(e,...t){var n,r,i;let s,o,a;e=(0,f.m9)(e);let l={includeMetadataChanges:!1},u=0;"object"!=typeof t[0]||aP(t[u])||(l=t[u],u++);let h={includeMetadataChanges:l.includeMetadataChanges};if(aP(t[u])){let e=t[u];t[u]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[u+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[u+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}if(e instanceof ak)o=aE(e.firestore,aD),a=iI(e._key.path),s={next:n=>{t[u]&&t[u](ll(o,e,n))},error:t[u+1],complete:t[u+2]};else{let n=aE(e,aS);o=aE(n.firestore,aD),a=n._query;let r=new ls(o);s={next:e=>{t[u]&&t[u](new lr(o,r,n,e))},error:t[u+1],complete:t[u+2]},aJ(e._query)}return function(e,t,n,r){let i=new ah(r),s=new oX(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>oK(await ag(e),s)),()=>{i.Dc(),e.asyncQueue.enqueueAndForget(async()=>oG(await ag(e),s))}}(aL(o),a,h,s)}function ll(e,t,n){let r=n.docs.get(t._key),i=new ls(e);return new lt(e,i,t._key,r,new le(n.hasPendingWrites,n.fromCache),t.converter)}!function(e,t=!0){n0=h.Jn,(0,h.Xd)(new c.wA("firestore",(e,{instanceIdentifier:n,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new aD(new ri(e.getProvider("auth-internal")),new rl(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new n8(n7.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rW(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:t},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,h.KN)(nX,"3.13.0",void 0),(0,h.KN)(nX,"3.13.0","esm2017")}()},7004:function(e,t,n){"use strict";n.d(t,{$C:function(){return _},V1:function(){return v}});var r=n(5816),i=n(4444),s=n(740);function o(e,t){let n={};for(let r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function a(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":{let t=Number(e.value);if(isNaN(t))throw Error("Data cannot be decoded from JSON: "+e);return t}default:throw Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(e=>a(e)):"function"==typeof e||"object"==typeof e?o(e,e=>a(e)):e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let l="functions",u={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class h extends i.ZR{constructor(e,t,n){super(`${l}/${e}`,t||""),this.details=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.appCheck){let t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){let t=await this.getAuthToken(),n=await this.getMessagingToken(),r=await this.getAppCheckToken(e);return{authToken:t,messagingToken:n,appCheckToken:r}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let d="us-central1";class f{constructor(e,t,n,r,i=d,s){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new c(t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{let e=new URL(i);this.customDomain=e.origin,this.region=d}catch(e){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){let t=this.app.options.projectId;if(null!==this.emulatorOrigin){let n=this.emulatorOrigin;return`${n}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}async function p(e,t,n,r){let i;n["Content-Type"]="application/json";try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let s=null;try{s=await i.json()}catch(e){}return{status:i.status,json:s}}async function m(e,t,n,r){let i;n=function e(t){if(null==t)return null;if(t instanceof Number&&(t=t.valueOf()),"number"==typeof t&&isFinite(t)||!0===t||!1===t||"[object String]"===Object.prototype.toString.call(t))return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(t=>e(t));if("function"==typeof t||"object"==typeof t)return o(t,t=>e(t));throw Error("Data cannot be encoded in JSON: "+t)}(n);let s={data:n},l={},c=await e.contextProvider.getContext(r.limitedUseAppCheckTokens);c.authToken&&(l.Authorization="Bearer "+c.authToken),c.messagingToken&&(l["Firebase-Instance-ID-Token"]=c.messagingToken),null!==c.appCheckToken&&(l["X-Firebase-AppCheck"]=c.appCheckToken);let d=r.timeout||7e4,f=(i=null,{promise:new Promise((e,t)=>{i=setTimeout(()=>{t(new h("deadline-exceeded","deadline-exceeded"))},d)}),cancel:()=>{i&&clearTimeout(i)}}),m=await Promise.race([p(t,s,l,e.fetchImpl),f.promise,e.cancelAllRequests]);if(f.cancel(),!m)throw new h("cancelled","Firebase Functions instance was deleted.");let g=function(e,t){let n,r=function(e){if(e>=200&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),i=r;try{let e=t&&t.error;if(e){let t=e.status;if("string"==typeof t){if(!u[t])return new h("internal","internal");r=u[t],i=t}let s=e.message;"string"==typeof s&&(i=s),n=e.details,void 0!==n&&(n=a(n))}}catch(e){}return"ok"===r?null:new h(r,i,n)}(m.status,m.json);if(g)throw g;if(!m.json)throw new h("internal","Response is not valid JSON object.");let y=m.json.data;if(void 0===y&&(y=m.json.result),void 0===y)throw new h("internal","Response is missing data field.");let _=a(y);return{data:_}}let g="@firebase/functions",y="0.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e=(0,r.Mq)(),t=d){let n=(0,r.qX)((0,i.m9)(e),l),s=n.getImmediate({identifier:t}),o=(0,i.P0)("functions");return o&&function(e,t,n){(0,i.m9)(e).emulatorOrigin=`http://${t}:${n}`}(s,...o),s}function v(e,t,n){var r;return r=(0,i.m9)(e),e=>(function(e,t,n,r){let i=e._url(t);return m(e,i,n,r)})(r,t,e,n||{})}!function(e,t){let n=(t,{instanceIdentifier:n})=>{let r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("messaging-internal"),o=t.getProvider("app-check-internal");return new f(r,i,s,o,n,e)};(0,r.Xd)(new s.wA(l,n,"PUBLIC").setMultipleInstances(!0)),(0,r.KN)(g,y,void 0),(0,r.KN)(g,y,"esm2017")}(fetch.bind(self))},6650:function(e,t,n){"use strict";n.d(t,{Jt:function(){return en},cF:function(){return ei},iH:function(){return er},KV:function(){return et}});var r,i,s,o,a=n(5816),l=n(4444),u=n(740);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let h="firebasestorage.googleapis.com",c="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends l.ZR{constructor(e,t,n=0){super(f(e),`Firebase Storage: ${t} (${f(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return f(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function f(e){return"storage/"+e}function p(){return new d(s.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function m(e){return new d(s.INVALID_ARGUMENT,e)}function g(){return new d(s.APP_DELETED,"The Firebase app was deleted.")}function y(e,t){return new d(s.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function _(e){throw new d(s.INTERNAL_ERROR,"Internal error: "+e)}(r=s||(s={})).UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=v.makeFromUrl(e,t)}catch(t){return new v(e,"")}if(""===n.path)return n;throw new d(s.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null,r="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+r+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),l=RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),u=RegExp(`^https?://${t===h?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),c=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:l,indices:{bucket:1,path:3},postModify:o},{regex:u,indices:{bucket:1,path:2},postModify:o}];for(let t=0;t<c.length;t++){let r=c[t],i=r.regex.exec(e);if(i){let e=i[r.indices.bucket],t=i[r.indices.path];t||(t=""),n=new v(e,t),r.postModify(n);break}}if(null==n)throw new d(s.INVALID_URL,"Invalid URL '"+e+"'.");return n}}class w{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function b(e){return"string"==typeof e||e instanceof String}function T(e){return E()&&e instanceof Blob}function E(){return"undefined"!=typeof Blob&&!(0,l.UG)()}function I(e,t,n,r){if(r<t)throw m(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw m(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function k(e){let t=encodeURIComponent,n="?";for(let r in e)if(e.hasOwnProperty(r)){let i=t(r)+"="+t(e[r]);n=n+i+"&"}return n.slice(0,-1)}(i=o||(o={}))[i.NO_ERROR=0]="NO_ERROR",i[i.NETWORK_ERROR=1]="NETWORK_ERROR",i[i.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t,n,r,i,s,o,a,l,u,h,c=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{if(t){e(!1,new x(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===o.NO_ERROR,i=n.getStatus();if(!t||/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let n=-1!==[408,429].indexOf(e),r=-1!==t.indexOf(e);return e>=500&&e<600||n||r}(i,this.additionalRetryCodes_)&&this.retry){let t=n.getErrorCode()===o.ABORT;e(!1,new x(!1,null,t));return}let s=-1!==this.successCodes_.indexOf(i);e(!0,new x(s,n))})},t=(e,t)=>{let n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(e){r(e)}else if(null!==i){let e=p();e.serverResponse=i.getErrorText(),r(this.errorCallback_?this.errorCallback_(i,e):e)}else if(t.canceled){let e=this.appDelete_?g():new d(s.CANCELED,"User canceled the upload/download.");r(e)}else{let e=new d(s.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.");r(e)}};this.canceled_?t(!1,new x(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,n){let r=1,i=null,s=null,o=!1,a=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(d,2===a)},t)}function c(){s&&clearTimeout(s)}function d(e,...t){let n;if(l){c();return}if(e){c(),u.call(null,e,...t);return}let i=2===a||o;if(i){c(),u.call(null,e,...t);return}r<64&&(r*=2),1===a?(a=2,n=0):n=(r+Math.random())*1e3,h(n)}let f=!1;function p(e){!f&&(f=!0,c(),!l&&(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,p(!0)},n),p}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class x{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function N(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(E())return new Blob(e);throw new d(s.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let A={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class R{constructor(e,t){this.data=e,this.contentType=t||null}}function P(e){let t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if((64512&r)==55296){let i=n<e.length-1&&(64512&e.charCodeAt(n+1))==56320;if(i){let i=r,s=e.charCodeAt(++n);r=65536|(1023&i)<<10|1023&s,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else(64512&r)==56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function D(e,t){let n;switch(e){case A.BASE64:{let n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw y(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case A.BASE64URL:{let n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r)throw y(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{n=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new d(s.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw y(e,"Invalid character found")}let r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}class O{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(null===t)throw y(A.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let n=t[1]||null;null!=n&&(this.base64=function(e,t){let n=e.length>=t.length;return!!n&&e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t){let n=0,r="";T(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(T(this.data_)){let n=this.data_,r=n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null;return null===r?null:new L(r)}{let n=new Uint8Array(this.data_.buffer,e,t-e);return new L(n,!0)}}static getBlob(...e){if(E()){let t=e.map(e=>e instanceof L?e.data_:e);return new L(N.apply(null,t))}{let t=e.map(e=>b(e)?function(e,t){switch(e){case A.RAW:return new R(P(t));case A.BASE64:case A.BASE64URL:return new R(D(e,t));case A.DATA_URL:return new R(function(e){let t=new O(e);return t.base64?D(A.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw y(A.DATA_URL,"Malformed data URL.")}return P(t)}(t.rest)}(t),function(e){let t=new O(e);return t.contentType}(t))}throw p()}(A.RAW,e).data:e.data_),n=0;t.forEach(e=>{n+=e.byteLength});let r=new Uint8Array(n),i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]}),new L(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){var t;let n;try{n=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=n)||Array.isArray(t)?null:n}function F(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e,t){return t}class j{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||U}}let V=null;function q(){if(V)return V;let e=[];e.push(new j("bucket")),e.push(new j("generation")),e.push(new j("metageneration")),e.push(new j("name","fullPath",!0));let t=new j("name");t.xform=function(e,t){return!b(t)||t.length<2?t:F(t)},e.push(t);let n=new j("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new j("timeCreated")),e.push(new j("updated")),e.push(new j("md5Hash",null,!0)),e.push(new j("cacheControl",null,!0)),e.push(new j("contentDisposition",null,!0)),e.push(new j("contentEncoding",null,!0)),e.push(new j("contentLanguage",null,!0)),e.push(new j("contentType",null,!0)),e.push(new j("metadata","customMetadata",!0)),V=e}function B(e,t,n){let r=M(t);return null===r?null:function(e,t,n){let r={};r.type="file";let i=n.length;for(let e=0;e<i;e++){let i=n[e];r[i.local]=i.xform(r,t[i.server])}return Object.defineProperty(r,"ref",{get:function(){let t=r.bucket,n=r.fullPath,i=new v(t,n);return e._makeStorageReference(i)}}),r}(e,r,n)}class z{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){if(!e)throw p()}function W(e){return function(t,n){var r,i;let o;return 401===t.getStatus()?o=t.getErrorText().includes("Firebase App Check token is invalid")?new d(s.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new d(s.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(r=e.bucket,o=new d(s.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,o=new d(s.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):o=n,o.status=t.getStatus(),o.serverResponse=n.serverResponse,o}}class H{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=o.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=o.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=o.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw _("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(let e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw _("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw _("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw _("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw _("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class K extends H{initXhr(){this.xhr_.responseType="text"}}function G(){return new K}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e,t){this._service=e,t instanceof v?this._location=t:this._location=v.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Y(e,t)}get root(){let e=new v(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return F(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");if(-1===t)return"";let n=e.slice(0,t);return n}(this._location.path);if(null===e)return null;let t=new v(this._location.bucket,e);return new Y(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new d(s.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function Q(e,t){let n=null==t?void 0:t[c];return null==n?null:v.makeFromBucketSpec(n,e)}class J{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=h,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=v.makeFromBucketSpec(r,this._host):this._bucket=Q(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=v.makeFromBucketSpec(this._url,e):this._bucket=Q(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){I("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){I("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Y(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new w(g());{let s=function(e,t,n,r,i,s,o=!0){var a,l,u;let h=k(e.urlParams),c=e.url+h,d=Object.assign({},e.headers);return a=d,t&&(a["X-Firebase-GMPID"]=t),l=d,null!==n&&n.length>0&&(l.Authorization="Firebase "+n),d["X-Firebase-Storage-Version"]="webjs/"+(null!=s?s:"AppManager"),u=d,null!==r&&(u["X-Firebase-AppCheck"]=r),new S(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}let X="@firebase/storage",Z="0.11.2",ee="storage";function et(e,t,n){return function(e,t,n){e._throwIfRoot("uploadBytes");let r=function(e,t,n,r,i){let o=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},l=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+l;let u=function(e,t,n){let r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),!r.contentType&&(r.contentType=t&&t.type()||"application/octet-stream"),r}(t,r,i),h=function(e,t){let n={},r=t.length;for(let i=0;i<r;i++){let r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}(u,n),c="--"+l+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+h+"\r\n--"+l+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",f=L.getBlob(c,r,"\r\n--"+l+"--");if(null===f)throw new d(s.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");let p={name:u.fullPath},m=C(o,e.host,e._protocol),g=e.maxUploadRetryTime,y=new z(m,"POST",function(t,r){let i=B(e,r,n);return $(null!==i),i},g);return y.urlParams=p,y.headers=a,y.body=f.uploadData(),y.errorHandler=W(t),y}(e.storage,e._location,q(),new L(t,!0),n);return e.storage.makeRequestWithTokens(r,G).then(t=>({metadata:t,ref:e}))}(e=(0,l.m9)(e),t,n)}function en(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,n){let r=t.fullServerUrl(),i=C(r,e.host,e._protocol),o=e.maxOperationRetryTime,a=new z(i,"GET",function(t,r){let i=B(e,r,n);return $(null!==i),function(e,t,n,r){let i=M(t);if(null===i||!b(i.downloadTokens))return null;let s=i.downloadTokens;if(0===s.length)return null;let o=encodeURIComponent,a=s.split(","),l=a.map(t=>{let i=e.bucket,s=e.fullPath,a="/b/"+o(i)+"/o/"+o(s),l=C(a,n,r),u=k({alt:"media",token:t});return l+u});return l[0]}(i,r,e.host,e._protocol)},o);return a.errorHandler=function(e){let t=W(e);return function(n,r){let i=t(n,r);if(404===n.getStatus()){var o;o=e.path,i=new d(s.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")}return i.serverResponse=r.serverResponse,i}}(t),a}(e.storage,e._location,q());return e.storage.makeRequestWithTokens(t,G).then(e=>{if(null===e)throw new d(s.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,l.m9)(e))}function er(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,n){if(t instanceof J){if(null==t._bucket)throw new d(s.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+c+"' property when initializing the app?");let r=new Y(t,t._bucket);return null!=n?e(r,n):r}return void 0!==n?function(e,t){let n=function(e,t){let n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new v(e._location.bucket,n);return new Y(e.storage,r)}(t,n):t}(e,t);if(e instanceof J)return new Y(e,t);throw m("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,l.m9)(e),t)}function ei(e=(0,a.Mq)(),t){e=(0,l.m9)(e);let n=(0,a.qX)(e,ee),r=n.getImmediate({identifier:t}),i=(0,l.P0)("storage");return i&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:(0,l.Sg)(i,e.app.options.projectId))}(e,t,n,r)}(r,...i),r}(0,a.Xd)(new u.wA(ee,function(e,{instanceIdentifier:t}){let n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new J(n,r,i,t,a.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,a.KN)(X,Z,""),(0,a.KN)(X,Z,"esm2017")},9822:function(e,t,n){"use strict";n.d(t,{J:function(){return r}});let r={SET_USER:"SET_USER",CLEAR_USER:"CLEAR_USER",TOGGLE_LOGIN_MODAL:"TOGGLE_LOGIN_MODAL",CLOSE_AUTH_MODAL:"CLOSE_AUTH_MODAL",SET_SELLER:"SET_SELLER",SWITCH_MODE:"SWITCH_MODE",SET_SERVICE_DATA:"SET_SERVICE_DATA",HAS_USER_ORDERED_SERVICE:"HAS_USER_ORDERED_SERVICE",ADD_REVIEW:"ADD_REVIEW",TOGGLE_DARK_MODE:"TOGGLE_DARK_MODE",SET_DARK_MODE:"SET_DARK_MODE"}},5641:function(e,t,n){"use strict";n.d(t,{H:function(){return s}});var r=n(1163),i=n(7294);let s=()=>{let e=(0,r.useRouter)(),t=(0,i.useCallback)(function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.push(t,void 0,n)},[e]),n=(0,i.useCallback)(function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.replace(t,void 0,n)},[e]),s=(0,i.useCallback)(()=>{e.back()},[e]),o=(0,i.useCallback)(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";sessionStorage.setItem("redirectUrl",e.asPath),e.replace(t)},[e]),a=(0,i.useCallback)(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";{let n=sessionStorage.getItem("redirectUrl");n?(sessionStorage.removeItem("redirectUrl"),n!==e.asPath&&e.push(n)):t&&t!==e.asPath&&e.push(t)}},[e]);return{navigate:t,replace:n,goBack:s,navigateWithRedirect:o,navigateToRedirect:a,router:e}}},9611:function(e,t,n){"use strict";n.d(t,{FF:function(){return u},Fb:function(){return h},LV:function(){return _},M3:function(){return p},N_:function(){return g},UD:function(){return v},Vp:function(){return m},av:function(){return w},eC:function(){return d},et:function(){return T},ko:function(){return c},pS:function(){return b},pg:function(){return y}});var r=n(7004),i=n(751),s=n(6650),o=n(6100),a=n(6907);let l=e=>{let t=new Date(e);return["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][t.getDay()]},u=async e=>{let{category:t="",searchTerm:n="",serviceDate:r=""}=e,s=[];try{let e;let n=(0,o.hJ)(i.db,"services");e=t?(0,o.IO)(n,(0,o.ar)("category","==",t)):(0,o.IO)(n);let r=await (0,o.PL)(e);s=r.docs.map(e=>({id:e.id,...e.data()}))}catch(e){throw console.error("Error fetching initial services:",e),e}let u=s;if(n){let e=n.toLowerCase();u=u.filter(t=>{let n=t.title&&t.title.toLowerCase().includes(e),r=t.description&&t.description.toLowerCase().includes(e);return n||r})}if(r)try{r.substring(0,4);let e=l(r),t=[];for(let n of u){let i=e.charAt(0).toUpperCase()+e.slice(1),s="isAvailableOn".concat(i);if(!n[s])continue;let o=await (0,a.ib)(r);o?(!0===n.availableOnPublicHolidays||"yes"===n.availableOnPublicHolidays)&&t.push(n):t.push(n)}u=t}catch(e){console.error("Error during date filtering:",e)}return u},h=async()=>{let e;let t=i.I8.currentUser;if(!t)return console.warn("getAllUserSellerServiceSummaries: User not authenticated."),[];let n=[],r=(0,o.JU)(i.db,"users",t.uid,"userSellerServicesMetadata","summary");try{e=await (0,o.QT)(r)}catch(e){return console.error("Error fetching service metadata:",e),[]}if(!e.exists())return console.log("User service metadata not found for user:",t.uid),[];let s=e.data(),a=s.totalServicesCount||0,l=s.lastGroupIndex;if(0===a||void 0===l||l<0)return[];for(let e=0;e<=l;e++){let r;let s=(0,o.JU)(i.db,"users",t.uid,"userSellerServices",String(e));try{r=await (0,o.QT)(s)}catch(n){console.error("Error fetching service group ".concat(e," for user ").concat(t.uid,":"),n);continue}if(r.exists()){let e=r.data();for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&"object"==typeof e[t]&&null!==e[t]&&e[t].id&&!e[t].disabled&&n.push(e[t])}}return n.sort((e,t)=>{var n,r,i,s;let o=(null===(n=e.createdAt)||void 0===n?void 0:n.seconds)||(null===(r=e.createdAt)||void 0===r?void 0:r._seconds)||("number"==typeof e.createdAt?e.createdAt:0),a=(null===(i=t.createdAt)||void 0===i?void 0:i.seconds)||(null===(s=t.createdAt)||void 0===s?void 0:s._seconds)||("number"==typeof t.createdAt?t.createdAt:0);return a-o}),n},c=async e=>{if(!e)throw Error("Service ID is required");let t=(0,o.JU)(i.db,"services",e),n=await (0,o.QT)(t);if(!n.exists())throw Error("Service not found");let r=n.data(),s=Array.isArray(r.images)?r.images:[],a=Array.isArray(r.features)?r.features:[],l=(0,o.IO)((0,o.hJ)(i.db,"reviews"),(0,o.ar)("serviceId","==",e)),u=await (0,o.PL)(l),h=u.docs.map(e=>({id:e.id,...e.data()})),c=0,d=0;if(r.userId){let e=(0,o.IO)((0,o.hJ)(i.db,"services"),(0,o.ar)("userId","==",r.userId)),t=await (0,o.PL)(e);for(let e of t.docs){let t=e.id,n=(0,o.IO)((0,o.hJ)(i.db,"reviews"),(0,o.ar)("serviceId","==",t)),r=await (0,o.PL)(n);c+=r.size,r.forEach(e=>{d+=e.data().rating})}}let f=c>0?(d/c).toFixed(1):"0",p=0;h.forEach(e=>{p+=e.rating});let m=h.length>0?(p/h.length).toFixed(1):"0";return{...r,images:s,features:a,reviews:h,totalReviews:c,averageRating:f,serviceAverageRating:m}},d=async(e,t)=>{let n=[];for(let r of(console.log("userId",t),e)){let e=(0,s.iH)(i.tO,"services/".concat(t,"/").concat(Date.now(),"_").concat(r.name)),o=await (0,s.KV)(e,r),a=await (0,s.Jt)(o.ref);n.push(a)}return n},f=async(e,t)=>{try{let n=(0,r.V1)(i.wk,e),s=await n(t);return s.data}catch(e){throw console.error("Error calling Firebase function:",e),e}},p=async e=>f("addService",e),m=async e=>f("editService",e),g=async e=>f("addReview",e),y=async(e,t)=>{try{if(!e||!t)return{eligible:!1,reason:"MISSING_PARAMETERS"};let n=(0,o.hJ)(i.db,"orders"),r=(0,o.IO)(n,(0,o.ar)("buyerId","==",e),(0,o.ar)("serviceId","==",t),(0,o.ar)("isCompleted","==",!0),(0,o.b9)(1)),s=await (0,o.PL)(r);if(s.empty)return{eligible:!1,reason:"NOT_ORDERED_OR_COMPLETED"};let a=s.docs[0].data();if(!a.completedAt)return{eligible:!1,reason:"MISSING_COMPLETION_DATE"};let l=a.completedAt.toDate(),u=new Date,h=u.getTime()-l.getTime();if(h/36e5>48)return{eligible:!1,reason:"WINDOW_EXPIRED"};return{eligible:!0,reason:"ELIGIBLE"}}catch(e){return console.error("Error in isReviewEligible:",e),{eligible:!1,reason:"INTERNAL_ERROR",error:e.message}}},_=async e=>f("createOrder",e),v=async(e,t)=>{if(!e||!t)return console.error("serviceId and buyerId are required for hasUserOrderedServiceDirectly"),!1;try{let n=(0,o.hJ)(i.db,"orders"),r=(0,o.IO)(n,(0,o.ar)("serviceId","==",e),(0,o.ar)("buyerId","==",t),(0,o.b9)(1)),s=await (0,o.PL)(r);return!s.empty}catch(e){return console.error("Error in hasUserOrderedServiceDirectly:",e),!1}},w=async e=>f("setUser",e),b=async()=>f("createStripeAccount",{}),T=async e=>{if(!e)throw Error("User ID is required.");try{let t=(0,o.JU)(i.db,"users",e),n=await (0,o.QT)(t);if(!n.exists())throw Error("User not found.");return n.data()}catch(e){throw console.error("Failed to fetch user profile:",e),e}}},4698:function(e,t,n){"use strict";n.d(t,{r:function(){return r}});let r={REACT_APP_NAME:"BridalFlock",REACT_APP_TYPE:"PROD",REACT_APP_DEBUG:!1,testMode:!1,REACT_APP_FB_apiKey:"AIzaSyAqigQTr0f4F8AuO0aR55obn_D7iWBk0l4",REACT_APP_FB_authDomain:"bridalflock-dev.firebaseapp.com",REACT_APP_FB_databaseURL:"https://bridalflock-dev-default-rtdb.asia-southeast1.firebasedatabase.app",REACT_APP_FB_projectId:"bridalflock-dev",REACT_APP_FB_storageBucket:"bridalflock-dev.firebasestorage.app",REACT_APP_FB_messagingSenderId:"236819939871",REACT_APP_FB_appId:"1:236819939871:web:ffed4e46783d79c2824b2a",REACT_APP_FB_recaptchaSiteKey:"",STRIPE_PAYMENT_LINK:"",STRIPE_PK:"pk_test_51Rb1VzQwcO9kmiBdCPcXOLiuNSm2X1MHqQmuVlbJy2TvJYidhmD7FXduGUTXHp9oIr7n5z9RxtAFLaOYZ7LmyhFn00ZziH6krG",WEB_URL:"https://bridalflock-dev.firebaseapp.com",WEB_DOMAIN:"bridalflock-dev.firebaseapp.com",REACT_APP_SUPPORT_EMAIL:"support@bridalflock.com"}},751:function(e,t,n){"use strict";n.d(t,{I8:function(){return d},Fs:function(){return f},db:function(){return p},wk:function(){return g},tO:function(){return m}});var r=n(5816);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,r.KN)("firebase","9.23.0","app");var i=n(9451),s=n(6100),o=n(6650),a=n(9355),l=n(7004),u=n(4698);let h={apiKey:u.r.REACT_APP_FB_apiKey,authDomain:u.r.REACT_APP_FB_authDomain,databaseURL:u.r.REACT_APP_FB_databaseURL,projectId:u.r.REACT_APP_FB_projectId,storageBucket:u.r.REACT_APP_FB_storageBucket,messagingSenderId:u.r.REACT_APP_FB_messagingSenderId,appId:u.r.REACT_APP_FB_appId},c=(0,r.ZF)(h),d=(0,i.v0)(c),f=(0,a.N8)(c),p=(0,s.ad)(c),m=(0,o.cF)(c),g=(0,l.$C)(c,"asia-southeast1")},6907:function(e,t,n){"use strict";n.d(t,{ib:function(){return a},vA:function(){return l}});var r=n(6100),i=n(751);let s=new Map,o=async e=>{let t=String(e);if(s.has(t))return s.get(t);try{console.log("Fetching public holidays for ".concat(t," directly from Firestore..."));let e=(0,r.JU)(i.db,"public_holidays",t),n=await (0,r.QT)(e);if(!n.exists())return console.log("No public holiday document found for ".concat(t," in Firestore.")),s.set(t,[]),[];{let e=n.data().singapore||[];return s.set(t,e),console.log("Successfully fetched and cached ".concat(e.length," holidays for ").concat(t," from Firestore.")),e}}catch(e){return console.error("Error fetching public holidays for ".concat(t," from Firestore:"),e),s.set(t,[]),[]}},a=async e=>{let t,n;if("string"==typeof e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){n=e,t=new Date(e);let r=e.split("-");t=new Date(Date.UTC(parseInt(r[0]),parseInt(r[1])-1,parseInt(r[2])))}else{let r=new Date(e);if(isNaN(r.getTime()))return console.error("Invalid date string provided to isDatePublicHoliday:",e),!1;t=r;let i=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");n="".concat(i,"-").concat(s,"-").concat(o)}}else{if(!(e instanceof Date))return console.error("Invalid dateInput provided to isDatePublicHoliday. Must be a Date object or a valid date string."),!1;t=e;let r=t.getUTCFullYear(),i=String(t.getUTCMonth()+1).padStart(2,"0"),s=String(t.getUTCDate()).padStart(2,"0");n="".concat(r,"-").concat(i,"-").concat(s)}let r=t.getUTCFullYear();try{let e=await o(r);if(!Array.isArray(e))return console.error("Expected an array of holidays for ".concat(r,", but got:"),e),!1;return e.some(e=>e.date===n)}catch(e){return console.error("Error checking if ".concat(n," is a public holiday:"),e),!1}},l=async e=>{let t=e.map(e=>o(String(e)));try{await Promise.all(t),console.log("Successfully prefetched public holidays from Firestore for years:",e.join(", "))}catch(e){console.error("Error prefetching public holidays from Firestore:",e)}}},2947:function(e,t,n){"use strict";n.d(t,{Ix:function(){return V},Am:function(){return R}});var r=n(7294),i=function(){for(var e,t,n=0,r="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=function e(t){var n,r,i="";if("string"==typeof t||"number"==typeof t)i+=t;else if("object"==typeof t){if(Array.isArray(t)){var s=t.length;for(n=0;n<s;n++)t[n]&&(r=e(t[n]))&&(i&&(i+=" "),i+=r)}else for(r in t)t[r]&&(i&&(i+=" "),i+=r)}return i}(e))&&(r&&(r+=" "),r+=t);return r};!function(e){if(!e||"undefined"==typeof document)return;let t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);var s=e=>"number"==typeof e&&!isNaN(e),o=e=>"string"==typeof e,a=e=>"function"==typeof e,l=e=>o(e)||s(e),u=e=>o(e)||a(e)?e:null,h=(e,t)=>!1===e||s(e)&&e>0?e:t,c=e=>(0,r.isValidElement)(e)||o(e)||a(e)||s(e);function d({enter:e,exit:t,appendPosition:n=!1,collapse:i=!0,collapseDuration:s=300}){return function({children:o,position:a,preventExitTransition:l,done:u,nodeRef:h,isIn:c,playToast:d}){let f=n?`${e}--${a}`:e,p=n?`${t}--${a}`:t,m=(0,r.useRef)(0);return(0,r.useLayoutEffect)(()=>{let e=h.current,t=f.split(" "),n=r=>{r.target===h.current&&(d(),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===m.current&&"animationcancel"!==r.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)},[]),(0,r.useEffect)(()=>{let e=h.current,t=()=>{e.removeEventListener("animationend",t),i?function(e,t,n=300){let{scrollHeight:r,style:i}=e;requestAnimationFrame(()=>{i.minHeight="initial",i.height=r+"px",i.transition=`all ${n}ms`,requestAnimationFrame(()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(t,n)})})}(e,u,s):u()};c||(l?t():(m.current=1,e.className+=` ${p}`,e.addEventListener("animationend",t)))},[c]),r.createElement(r.Fragment,null,o)}}function f(e,t){return{content:p(e.content,e.props),containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,reason:e.removalReason,status:t}}function p(e,t,n=!1){return(0,r.isValidElement)(e)&&!o(e.type)?(0,r.cloneElement)(e,{closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):a(e)?e({closeToast:t.closeToast,toastProps:t,data:t.data,isPaused:n}):e}function m({delay:e,isRunning:t,closeToast:n,type:s="default",hide:o,className:l,controlledProgress:u,progress:h,rtl:c,isIn:d,theme:f}){let p=o||u&&0===h,m={animationDuration:`${e}ms`,animationPlayState:t?"running":"paused"};u&&(m.transform=`scaleX(${h})`);let g=i("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":c}),y=a(l)?l({rtl:c,type:s,defaultClassName:g}):i(g,l);return r.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":p},r.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${f} Toastify__progress-bar--${s}`}),r.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer",className:y,style:m,[u&&h>=1?"onTransitionEnd":"onAnimationEnd"]:u&&h<1?null:()=>{d&&n()}}))}var g=1,y=()=>`${g++}`,_=new Map,v=[],w=new Set,b=e=>w.forEach(t=>t(e)),T=()=>_.size>0,E=(e,{containerId:t})=>{var n;return null==(n=_.get(t||1))?void 0:n.toasts.get(e)};function I(e,t){var n;if(t)return!!(null!=(n=_.get(t))&&n.isToastActive(e));let r=!1;return _.forEach(t=>{t.isToastActive(e)&&(r=!0)}),r}var C=(e={})=>{_.forEach(t=>{t.props.limit&&(!e.containerId||t.id===e.containerId)&&t.clearQueue()})};function k(e,t){c(e)&&(T()||v.push({content:e,options:t}),_.forEach(n=>{n.buildToast(e,t)}))}function S(e,t){_.forEach(n=>{null!=t&&null!=t&&t.containerId&&(null==t?void 0:t.containerId)!==n.id||n.toggle(e,null==t?void 0:t.id)})}function x(e,t){return k(e,t),t.toastId}function N(e,t){return{...t,type:t&&t.type||e,toastId:t&&(o(t.toastId)||s(t.toastId))?t.toastId:y()}}function A(e){return(t,n)=>x(t,N(e,n))}function R(e,t){return x(e,N("default",t))}R.loading=(e,t)=>x(e,N("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),R.promise=function(e,{pending:t,error:n,success:r},i){let s;t&&(s=o(t)?R.loading(t,i):R.loading(t.render,{...i,...t}));let l={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},u=(e,t,n)=>{if(null==t){R.dismiss(s);return}let r={type:e,...l,...i,data:n},a=o(t)?{render:t}:t;return s?R.update(s,{...r,...a}):R(a.render,{...r,...a}),n},h=a(e)?e():e;return h.then(e=>u("success",r,e)).catch(e=>u("error",n,e)),h},R.success=A("success"),R.info=A("info"),R.error=A("error"),R.warning=A("warning"),R.warn=R.warning,R.dark=(e,t)=>x(e,N("default",{theme:"dark",...t})),R.dismiss=function(e){!function(e){if(!T()){v=v.filter(t=>null!=e&&t.options.toastId!==e);return}if(null==e||l(e))_.forEach(t=>{t.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){let t=_.get(e.containerId);t?t.removeToast(e.id):_.forEach(t=>{t.removeToast(e.id)})}}(e)},R.clearWaitingQueue=C,R.isActive=I,R.update=(e,t={})=>{let n=E(e,t);if(n){let{props:r,content:i}=n,s={delay:100,...r,...t,toastId:t.toastId||e,updateId:y()};s.toastId!==e&&(s.staleId=e);let o=s.render||i;delete s.render,x(o,s)}},R.done=e=>{R.update(e,{progress:1})},R.onChange=function(e){return w.add(e),()=>{w.delete(e)}},R.play=e=>S(!0,e),R.pause=e=>S(!1,e);var P="undefined"!=typeof window?r.useLayoutEffect:r.useEffect,D=({theme:e,type:t,isLoading:n,...i})=>r.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===e?"currentColor":`var(--toastify-icon-color-${t})`,...i}),O={info:function(e){return r.createElement(D,{...e},r.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return r.createElement(D,{...e},r.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return r.createElement(D,{...e},r.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return r.createElement(D,{...e},r.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return r.createElement("div",{className:"Toastify__spinner"})}},L=e=>e in O,M=e=>{let{isRunning:t,preventExitTransition:n,toastRef:s,eventHandlers:o,playToast:l}=function(e){var t,n;let[i,s]=(0,r.useState)(!1),[o,a]=(0,r.useState)(!1),l=(0,r.useRef)(null),u=(0,r.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:h,pauseOnHover:c,closeToast:d,onClick:f,closeOnClick:p}=e;function m(){s(!0)}function g(){s(!1)}function y(t){let n=l.current;if(u.canDrag&&n){u.didMove=!0,i&&g(),"x"===e.draggableDirection?u.delta=t.clientX-u.start:u.delta=t.clientY-u.start,u.start!==t.clientX&&(u.canCloseOnClick=!1);let r="x"===e.draggableDirection?`${u.delta}px, var(--y)`:`0, calc(${u.delta}px + var(--y))`;n.style.transform=`translate3d(${r},0)`,n.style.opacity=`${1-Math.abs(u.delta/u.removalDistance)}`}}function v(){document.removeEventListener("pointermove",y),document.removeEventListener("pointerup",v);let t=l.current;if(u.canDrag&&u.didMove&&t){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance){a(!0),e.closeToast(!0),e.collapseAll();return}t.style.transition="transform 0.2s, opacity 0.2s",t.style.removeProperty("transform"),t.style.removeProperty("opacity")}}t={id:e.toastId,containerId:e.containerId,fn:s},null==(n=_.get(t.containerId||1))||n.setToggle(t.id,t.fn),(0,r.useEffect)(()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||g(),window.addEventListener("focus",m),window.addEventListener("blur",g),()=>{window.removeEventListener("focus",m),window.removeEventListener("blur",g)}},[e.pauseOnFocusLoss]);let w={onPointerDown:function(t){if(!0===e.draggable||e.draggable===t.pointerType){u.didMove=!1,document.addEventListener("pointermove",y),document.addEventListener("pointerup",v);let n=l.current;u.canCloseOnClick=!0,u.canDrag=!0,n.style.transition="none","x"===e.draggableDirection?(u.start=t.clientX,u.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(u.start=t.clientY,u.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(t){let{top:n,bottom:r,left:i,right:s}=l.current.getBoundingClientRect();"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&t.clientX>=i&&t.clientX<=s&&t.clientY>=n&&t.clientY<=r?g():m()}};return h&&c&&(w.onMouseEnter=g,e.stacked||(w.onMouseLeave=m)),p&&(w.onClick=e=>{f&&f(e),u.canCloseOnClick&&d(!0)}),{playToast:m,pauseToast:g,isRunning:i,preventExitTransition:o,toastRef:l,eventHandlers:w}}(e),{closeButton:u,children:h,autoClose:c,onClick:d,type:f,hideProgressBar:g,closeToast:y,transition:v,position:w,className:b,style:T,progressClassName:E,updateId:I,role:C,progress:k,rtl:S,toastId:x,deleteToast:N,isIn:A,isLoading:R,closeOnClick:P,theme:D,ariaLabel:M}=e,F=i("Toastify__toast",`Toastify__toast-theme--${D}`,`Toastify__toast--${f}`,{"Toastify__toast--rtl":S},{"Toastify__toast--close-on-click":P}),U=a(b)?b({rtl:S,position:w,type:f,defaultClassName:F}):i(F,b),j=function({theme:e,type:t,isLoading:n,icon:i}){let s=null,o={theme:e,type:t};return!1===i||(a(i)?s=i({...o,isLoading:n}):(0,r.isValidElement)(i)?s=(0,r.cloneElement)(i,o):n?s=O.spinner():L(t)&&(s=O[t](o))),s}(e),V=!!k||!c,q={closeToast:y,type:f,theme:D},B=null;return!1===u||(B=a(u)?u(q):(0,r.isValidElement)(u)?(0,r.cloneElement)(u,q):function({closeToast:e,theme:t,ariaLabel:n="close"}){return r.createElement("button",{className:`Toastify__close-button Toastify__close-button--${t}`,type:"button",onClick:t=>{t.stopPropagation(),e(!0)},"aria-label":n},r.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},r.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(q)),r.createElement(v,{isIn:A,done:N,position:w,preventExitTransition:n,nodeRef:s,playToast:l},r.createElement("div",{id:x,tabIndex:0,onClick:d,"data-in":A,className:U,...o,style:T,ref:s,...A&&{role:C,"aria-label":M}},null!=j&&r.createElement("div",{className:i("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!R})},j),p(h,e,!t),B,!e.customProgressBar&&r.createElement(m,{...I&&!V?{key:`p-${I}`}:{},rtl:S,theme:D,delay:c,isRunning:t,isIn:A,closeToast:y,hide:g,type:f,className:E,controlledProgress:V,progress:k||0})))},F=(e,t=!1)=>({enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}),U=d(F("bounce",!0));d(F("slide",!0)),d(F("zoom")),d(F("flip"));var j={position:"top-right",transition:U,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:e=>e.altKey&&"KeyT"===e.code};function V(e){let t={...j,...e},n=e.stacked,[o,l]=(0,r.useState)(!0),d=(0,r.useRef)(null),{getToastToRender:p,isToastActive:m,count:g}=function(e){var t;let n;let{subscribe:i,getSnapshot:o,setProps:a}=(0,r.useRef)((n=e.containerId||1,{subscribe(t){let r,i,o,a,l,d,p,m,g,y,w,T;let E=(r=1,i=0,o=[],a=[],l=e,d=new Map,p=new Set,m=()=>{a=Array.from(d.values()),p.forEach(e=>e())},g=({containerId:e,toastId:t,updateId:r})=>{let i=d.has(t)&&null==r;return(e?e!==n:1!==n)||i},y=e=>{var t,n;null==(n=null==(t=e.props)?void 0:t.onClose)||n.call(t,e.removalReason),e.isActive=!1},w=e=>{if(null==e)d.forEach(y);else{let t=d.get(e);t&&y(t)}m()},T=e=>{var t,n;let{toastId:r,updateId:i}=e.props,s=null==i;e.staleId&&d.delete(e.staleId),e.isActive=!0,d.set(r,e),m(),b(f(e,s?"added":"updated")),s&&(null==(n=(t=e.props).onOpen)||n.call(t))},{id:n,props:l,observe:e=>(p.add(e),()=>p.delete(e)),toggle:(e,t)=>{d.forEach(n=>{var r;(null==t||t===n.props.toastId)&&(null==(r=n.toggle)||r.call(n,e))})},removeToast:w,toasts:d,clearQueue:()=>{i-=o.length,o=[]},buildToast:(e,t)=>{if(g(t))return;let{toastId:n,updateId:a,data:p,staleId:y,delay:_}=t,v=null==a;v&&i++;let E={...l,style:l.toastStyle,key:r++,...Object.fromEntries(Object.entries(t).filter(([e,t])=>null!=t)),toastId:n,updateId:a,data:p,isIn:!1,className:u(t.className||l.toastClassName),progressClassName:u(t.progressClassName||l.progressClassName),autoClose:!t.isLoading&&h(t.autoClose,l.autoClose),closeToast(e){d.get(n).removalReason=e,w(n)},deleteToast(){let e=d.get(n);if(null!=e){if(b(f(e,"removed")),d.delete(n),--i<0&&(i=0),o.length>0){T(o.shift());return}m()}}};E.closeButton=l.closeButton,!1===t.closeButton||c(t.closeButton)?E.closeButton=t.closeButton:!0===t.closeButton&&(E.closeButton=!c(l.closeButton)||l.closeButton);let I={content:e,props:E,staleId:y};l.limit&&l.limit>0&&i>l.limit&&v?o.push(I):s(_)?setTimeout(()=>{T(I)},_):T(I)},setProps(e){l=e},setToggle:(e,t)=>{let n=d.get(e);n&&(n.toggle=t)},isToastActive:e=>{var t;return null==(t=d.get(e))?void 0:t.isActive},getSnapshot:()=>a});_.set(n,E);let I=E.observe(t);return v.forEach(e=>k(e.content,e.options)),v=[],()=>{I(),_.delete(n)}},setProps(e){var t;null==(t=_.get(n))||t.setProps(e)},getSnapshot(){var e;return null==(e=_.get(n))?void 0:e.getSnapshot()}})).current;a(e);let l=null==(t=(0,r.useSyncExternalStore)(i,o,o))?void 0:t.slice();return{getToastToRender:function(t){if(!l)return[];let n=new Map;return e.newestOnTop&&l.reverse(),l.forEach(e=>{let{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)}),Array.from(n,e=>t(e[0],e[1]))},isToastActive:I,count:null==l?void 0:l.length}}(t),{className:y,style:w,rtl:T,containerId:E,hotKeys:C}=t;function S(){n&&(l(!0),R.play())}return P(()=>{var e;if(n){let n=d.current.querySelectorAll('[data-in="true"]'),r=null==(e=t.position)?void 0:e.includes("top"),i=0,s=0;Array.from(n).reverse().forEach((e,t)=>{let n=e;n.classList.add("Toastify__toast--stacked"),t>0&&(n.dataset.collapsed=`${o}`),n.dataset.pos||(n.dataset.pos=r?"top":"bot");let a=i*(o?.2:1)+(o?0:12*t);n.style.setProperty("--y",`${r?a:-1*a}px`),n.style.setProperty("--g","12"),n.style.setProperty("--s",`${1-(o?s:0)}`),i+=n.offsetHeight,s+=.025})}},[o,g,n]),(0,r.useEffect)(()=>{function e(e){var t;let n=d.current;C(e)&&(null==(t=n.querySelector('[tabIndex="0"]'))||t.focus(),l(!1),R.pause()),"Escape"===e.key&&(document.activeElement===n||null!=n&&n.contains(document.activeElement))&&(l(!0),R.play())}return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)}},[C]),r.createElement("section",{ref:d,className:"Toastify",id:E,onMouseEnter:()=>{n&&(l(!1),R.pause())},onMouseLeave:S,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":t["aria-label"]},p((e,t)=>{let s,o=t.length?{...w}:{...w,pointerEvents:"none"};return r.createElement("div",{tabIndex:-1,className:(s=i("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":T}),a(y)?y({position:e,rtl:T,defaultClassName:s}):i(s,u(y))),"data-stacked":n,style:o,key:`c-${e}`},t.map(({content:e,props:t})=>r.createElement(M,{...t,stacked:n,collapseAll:S,isIn:m(t.toastId,t.containerId),key:`t-${t.key}`},e)))}))}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(3837),t(6885)}),_N_E=e.O()}]);