(function(){'use strict';var r;function ba(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ca=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function da(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var ea=da(this);function u(a,b){if(b)a:{var c=ea;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&b!=null&&ca(c,a,{configurable:!0,writable:!0,value:b})}}
u("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}
function c(f,g){this.h=f;ca(this,"description",{configurable:!0,writable:!0,value:g})}
if(a)return a;c.prototype.toString=function(){return this.h};
var d="jscomp_symbol_"+(Math.random()*1E9>>>0)+"_",e=0;return b});
u("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=ea[b[c]];typeof d==="function"&&typeof d.prototype[a]!="function"&&ca(d.prototype,a,{configurable:!0,writable:!0,value:function(){return fa(ba(this))}})}return a});
function fa(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
var ja=typeof Object.create=="function"?Object.create:function(a){function b(){}
b.prototype=a;return new b},ka=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if(typeof Reflect!="undefined"&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){e===void 0&&(e=c);
e=ja(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),la;
if(typeof Object.setPrototypeOf=="function")la=Object.setPrototypeOf;else{var ma;a:{var oa={a:!0},pa={};try{pa.__proto__=oa;ma=pa.a;break a}catch(a){}ma=!1}la=ma?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var qa=la;
function w(a,b){a.prototype=ja(b.prototype);a.prototype.constructor=a;if(qa)qa(a,b);else for(var c in b)if(c!="prototype")if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.za=b.prototype}
function z(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:ba(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}
function ra(a){if(!(a instanceof Array)){a=z(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}
function sa(a){return ta(a,a)}
function ta(a,b){a.raw=b;Object.freeze&&(Object.freeze(a),Object.freeze(b));return a}
function ua(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var va=typeof Object.assign=="function"?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)ua(d,e)&&(a[e]=d[e])}return a};
u("Object.assign",function(a){return a||va});
function wa(){this.A=!1;this.H=null;this.i=void 0;this.h=1;this.u=this.o=0;this.P=this.j=null}
function xa(a){if(a.A)throw new TypeError("Generator is already running");a.A=!0}
wa.prototype.G=function(a){this.i=a};
function ya(a,b){a.j={exception:b,md:!0};a.h=a.o||a.u}
wa.prototype.return=function(a){this.j={return:a};this.h=this.u};
wa.prototype.yield=function(a,b){this.h=b;return{value:a}};
wa.prototype.D=function(a){this.h=a};
function za(a,b,c){a.o=b;c!=void 0&&(a.u=c)}
function Aa(a){a.o=0;var b=a.j.exception;a.j=null;return b}
function Ba(a){var b=a.P.splice(0)[0];(b=a.j=a.j||b)?b.md?a.h=a.o||a.u:b.D!=void 0&&a.u<b.D?(a.h=b.D,a.j=null):a.h=a.u:a.h=0}
function Ca(a){this.h=new wa;this.i=a}
function Da(a,b){xa(a.h);var c=a.h.H;if(c)return Ea(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.h.return);
a.h.return(b);return Fa(a)}
function Ea(a,b,c,d){try{var e=b.call(a.h.H,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.h.A=!1,e;var f=e.value}catch(g){return a.h.H=null,ya(a.h,g),Fa(a)}a.h.H=null;d.call(a.h,f);return Fa(a)}
function Fa(a){for(;a.h.h;)try{var b=a.i(a.h);if(b)return a.h.A=!1,{value:b.value,done:!1}}catch(c){a.h.i=void 0,ya(a.h,c)}a.h.A=!1;if(a.h.j){b=a.h.j;a.h.j=null;if(b.md)throw b.exception;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function Ga(a){this.next=function(b){xa(a.h);a.h.H?b=Ea(a,a.h.H.next,b,a.h.G):(a.h.G(b),b=Fa(a));return b};
this.throw=function(b){xa(a.h);a.h.H?b=Ea(a,a.h.H["throw"],b,a.h.G):(ya(a.h,b),b=Fa(a));return b};
this.return=function(b){return Da(a,b)};
this[Symbol.iterator]=function(){return this}}
function Ha(a){function b(d){return a.next(d)}
function c(d){return a.throw(d)}
return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}
f(a.next())})}
function A(a){return Ha(new Ga(new Ca(a)))}
function B(){for(var a=Number(this),b=[],c=a;c<arguments.length;c++)b[c-a]=arguments[c];return b}
u("Reflect",function(a){return a?a:{}});
u("Reflect.construct",function(){return ka});
u("Reflect.setPrototypeOf",function(a){return a?a:qa?function(b,c){try{return qa(b,c),!0}catch(d){return!1}}:null});
u("Promise",function(a){function b(g){this.h=0;this.j=void 0;this.i=[];this.A=!1;var h=this.o();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.h=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.i=function(g){if(this.h==null){this.h=[];var h=this;this.j(function(){h.u()})}this.h.push(g)};
var e=ea.setTimeout;c.prototype.j=function(g){e(g,0)};
c.prototype.u=function(){for(;this.h&&this.h.length;){var g=this.h;this.h=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.o(l)}}}this.h=null};
c.prototype.o=function(g){this.j(function(){throw g;})};
b.prototype.o=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.Y),reject:g(this.u)}};
b.prototype.Y=function(g){if(g===this)this.u(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ia(g);else{a:switch(typeof g){case "object":var h=g!=null;break a;case "function":h=!0;break a;default:h=!1}h?this.X(g):this.H(g)}};
b.prototype.X=function(g){var h=void 0;try{h=g.then}catch(k){this.u(k);return}typeof h=="function"?this.oa(h,g):this.H(g)};
b.prototype.u=function(g){this.G(2,g)};
b.prototype.H=function(g){this.G(1,g)};
b.prototype.G=function(g,h){if(this.h!=0)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.j=h;this.h===2&&this.ga();this.P()};
b.prototype.ga=function(){var g=this;e(function(){if(g.U()){var h=ea.console;typeof h!=="undefined"&&h.error(g.j)}},1)};
b.prototype.U=function(){if(this.A)return!1;var g=ea.CustomEvent,h=ea.Event,k=ea.dispatchEvent;if(typeof k==="undefined")return!0;typeof g==="function"?g=new g("unhandledrejection",{cancelable:!0}):typeof h==="function"?g=new h("unhandledrejection",{cancelable:!0}):(g=ea.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.j;return k(g)};
b.prototype.P=function(){if(this.i!=null){for(var g=0;g<this.i.length;++g)f.i(this.i[g]);this.i=null}};
var f=new c;b.prototype.ia=function(g){var h=this.o();g.Yb(h.resolve,h.reject)};
b.prototype.oa=function(g,h){var k=this.o();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(p,t){return typeof p=="function"?function(v){try{l(p(v))}catch(x){m(x)}}:t}
var l,m,n=new b(function(p,t){l=p;m=t});
this.Yb(k(g,l),k(h,m));return n};
b.prototype.catch=function(g){return this.then(void 0,g)};
b.prototype.Yb=function(g,h){function k(){switch(l.h){case 1:g(l.j);break;case 2:h(l.j);break;default:throw Error("Unexpected state: "+l.h);}}
var l=this;this.i==null?f.i(k):this.i.push(k);this.A=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=z(g),m=l.next();!m.done;m=l.next())d(m.value).Yb(h,k)})};
b.all=function(g){var h=z(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(x){p[v]=x;t--;t==0&&l(p)}}
var p=[],t=0;do p.push(void 0),t++,d(k.value).Yb(n(p.length-1),m),k=h.next();while(!k.done)})};
return b});
u("Object.setPrototypeOf",function(a){return a||qa});
u("Symbol.dispose",function(a){return a?a:Symbol("Symbol.dispose")});
u("globalThis",function(a){return a||ea});
u("WeakMap",function(a){function b(k){this.h=(h+=Math.random()+1).toString();if(k){k=z(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return l==="object"&&k!==null||l==="function"}
function e(k){if(!ua(k,g)){var l=new c;ca(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(m.get(k)!=2||m.get(l)!=3)return!1;m.delete(k);m.set(l,4);return!m.has(k)&&m.get(l)==4}catch(n){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!ua(k,g))throw Error("WeakMap key fail: "+k);k[g][this.h]=l;return this};
b.prototype.get=function(k){return d(k)&&ua(k,g)?k[g][this.h]:void 0};
b.prototype.has=function(k){return d(k)&&ua(k,g)&&ua(k[g],this.h)};
b.prototype.delete=function(k){return d(k)&&ua(k,g)&&ua(k[g],this.h)?delete k[g][this.h]:!1};
return b});
u("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h[1];return fa(function(){if(l){for(;l.head!=h[1];)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;l=="object"||l=="function"?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h[0][l];if(m&&ua(h[0],l))for(h=0;h<m.length;h++){var n=m[h];if(k!==k&&n.key!==n.key||k===n.key)return{id:l,list:m,index:h,entry:n}}return{id:l,list:m,index:-1,entry:void 0}}
function e(h){this[0]={};this[1]=b();this.size=0;if(h){h=z(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||typeof a!="function"||!a.prototype.entries||typeof Object.seal!="function")return!1;try{var h=Object.seal({x:4}),k=new a(z([[h,"s"]]));if(k.get(h)!="s"||k.size!=1||k.get({x:4})||k.set({x:4},"t")!=k||k.size!=2)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||m.value[1]!="s")return!1;m=l.next();return m.done||m.value[0].x!=4||m.value[1]!="t"||!l.next().done?!1:!0}catch(n){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=h===0?0:h;var l=d(this,h);l.list||(l.list=this[0][l.id]=[]);l.entry?l.entry.value=k:(l.entry={next:this[1],previous:this[1].previous,head:this[1],key:h,value:k},l.list.push(l.entry),this[1].previous.next=l.entry,this[1].previous=l.entry,this.size++);return this};
e.prototype.delete=function(h){h=d(this,h);return h.entry&&h.list?(h.list.splice(h.index,1),h.list.length||delete this[0][h.id],h.entry.previous.next=h.entry.next,h.entry.next.previous=h.entry.previous,h.entry.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this[0]={};this[1]=this[1].previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).entry};
e.prototype.get=function(h){return(h=d(this,h).entry)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
u("Set",function(a){function b(c){this.h=new Map;if(c){c=z(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.h.size}
if(function(){if(!a||typeof a!="function"||!a.prototype.entries||typeof Object.seal!="function")return!1;try{var c=Object.seal({x:4}),d=new a(z([c]));if(!d.has(c)||d.size!=1||d.add(c)!=d||d.size!=1||d.add({x:4})!=d||d.size!=2)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||f.value[0].x!=4||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=c===0?0:c;this.h.set(c,c);this.size=this.h.size;return this};
b.prototype.delete=function(c){c=this.h.delete(c);this.size=this.h.size;return c};
b.prototype.clear=function(){this.h.clear();this.size=0};
b.prototype.has=function(c){return this.h.has(c)};
b.prototype.entries=function(){return this.h.entries()};
b.prototype.values=function(){return this.h.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.h.forEach(function(f){return c.call(d,f,f,e)})};
return b});
function Ja(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
u("Array.prototype.entries",function(a){return a?a:function(){return Ja(this,function(b,c){return[b,c]})}});
u("Array.prototype.keys",function(a){return a?a:function(){return Ja(this,function(b){return b})}});
function Ka(a,b,c){if(a==null)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Ka(this,b,"startsWith");b+="";var e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});
u("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Ka(this,b,"endsWith");b+="";c===void 0&&(c=d.length);c=Math.max(0,Math.min(c|0,d.length));for(var e=b.length;e>0&&c>0;)if(d[--c]!=b[--e])return!1;return e<=0}});
u("Number.isFinite",function(a){return a?a:function(b){return typeof b!=="number"?!1:!isNaN(b)&&b!==Infinity&&b!==-Infinity}});
u("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});
u("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)ua(b,d)&&c.push(b[d]);return c}});
u("Object.is",function(a){return a?a:function(b,c){return b===c?b!==0||1/b===1/c:b!==b&&c!==c}});
u("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(c<0&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});
u("String.prototype.includes",function(a){return a?a:function(b,c){return Ka(this,b,"includes").indexOf(b,c||0)!==-1}});
u("Array.from",function(a){return a?a:function(b,c,d){c=c!=null?c:function(h){return h};
var e=[],f=typeof Symbol!="undefined"&&Symbol.iterator&&b[Symbol.iterator];if(typeof f=="function"){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
u("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)ua(b,d)&&c.push([d,b[d]]);return c}});
u("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});
u("Number.MIN_SAFE_INTEGER",function(){return-9007199254740991});
u("Number.isInteger",function(a){return a?a:function(b){return Number.isFinite(b)?b===Math.floor(b):!1}});
u("Number.isSafeInteger",function(a){return a?a:function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER}});
u("Math.trunc",function(a){return a?a:function(b){b=Number(b);if(isNaN(b)||b===Infinity||b===-Infinity||b===0)return b;var c=Math.floor(Math.abs(b));return b<0?-c:c}});
u("Number.isNaN",function(a){return a?a:function(b){return typeof b==="number"&&isNaN(b)}});
u("Array.prototype.values",function(a){return a?a:function(){return Ja(this,function(b,c){return c})}});
u("Math.clz32",function(a){return a?a:function(b){b=Number(b)>>>0;if(b===0)return 32;var c=0;(b&4294901760)===0&&(b<<=16,c+=16);(b&4278190080)===0&&(b<<=8,c+=8);(b&4026531840)===0&&(b<<=4,c+=4);(b&3221225472)===0&&(b<<=2,c+=2);(b&2147483648)===0&&c++;return c}});
u("Math.log10",function(a){return a?a:function(b){return Math.log(b)/Math.LN10}});/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var Na=Na||{},C=this||self;function D(a,b,c){a=a.split(".");c=c||C;a[0]in c||typeof c.execScript=="undefined"||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||b===void 0?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function E(a,b){a=a.split(".");b=b||C;for(var c=0;c<a.length;c++)if(b=b[a[c]],b==null)return null;return b}
function Oa(a){var b=typeof a;return b!="object"?b:a?Array.isArray(a)?"array":b:"null"}
function Pa(a){var b=Oa(a);return b=="array"||b=="object"&&typeof a.length=="number"}
function Qa(a){var b=typeof a;return b=="object"&&a!=null||b=="function"}
function Ra(a){return Object.prototype.hasOwnProperty.call(a,Sa)&&a[Sa]||(a[Sa]=++Ta)}
var Sa="closure_uid_"+(Math.random()*1E9>>>0),Ta=0;function Ua(a,b,c){return a.call.apply(a.bind,arguments)}
function Va(a,b,c){if(!a)throw Error();if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Wa(a,b,c){Wa=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Ua:Va;return Wa.apply(null,arguments)}
function Xa(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
function Ya(){return Date.now()}
function Za(a,b){function c(){}
c.prototype=b.prototype;a.za=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
;function $a(a,b){if(Error.captureStackTrace)Error.captureStackTrace(this,$a);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a));b!==void 0&&(this.cause=b)}
Za($a,Error);$a.prototype.name="CustomError";var ab=(new Date("2024-01-01T00:00:00Z")).getTime();function bb(a){var b=a.url;a=a.Lh;this.i=b;this.A=a;a=/[?&]dsh=1(&|$)/.test(b);this.u=!a&&/[?&]ae=1(&|$)/.test(b);this.H=!a&&/[?&]ae=2(&|$)/.test(b);if((this.h=/[?&]adurl=([^&]*)/.exec(b))&&this.h[1]){try{var c=decodeURIComponent(this.h[1])}catch(d){c=null}this.j=c}this.o=(new Date).getTime()-ab}
function db(a,b){return b?a.h?a.i.slice(0,a.h.index)+b+a.i.slice(a.h.index):a.i+b:a.i}
function eb(a){a=a.A;if(!a)return"";var b="";a.platform&&(b+="&uap="+encodeURIComponent(a.platform));a.platformVersion&&(b+="&uapv="+encodeURIComponent(a.platformVersion));a.uaFullVersion&&(b+="&uafv="+encodeURIComponent(a.uaFullVersion));a.architecture&&(b+="&uaa="+encodeURIComponent(a.architecture));a.model&&(b+="&uam="+encodeURIComponent(a.model));a.bitness&&(b+="&uab="+encodeURIComponent(a.bitness));a.fullVersionList&&(b+="&uafvl="+encodeURIComponent(a.fullVersionList.map(function(c){return encodeURIComponent(c.brand)+
";"+encodeURIComponent(c.version)}).join("|")));
typeof a.wow64!=="undefined"&&(b+="&uaw="+Number(a.wow64));return b}
;var fb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};/*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
var gb=globalThis.trustedTypes,hb;function ib(){var a=null;if(!gb)return a;try{var b=function(c){return c};
a=gb.createPolicy("goog#html",{createHTML:b,createScript:b,createScriptURL:b})}catch(c){}return a}
function jb(){hb===void 0&&(hb=ib());return hb}
;function kb(a){this.h=a}
kb.prototype.toString=function(){return this.h+""};
function lb(a){var b=jb();return new kb(b?b.createScriptURL(a):a)}
function mb(a){if(a instanceof kb)return a.h;throw Error("");}
;var nb=sa([""]),ob=ta(["\x00"],["\\0"]),pb=ta(["\n"],["\\n"]),qb=ta(["\x00"],["\\u0000"]);function rb(a){return a.toString().indexOf("`")===-1}
rb(function(a){return a(nb)})||rb(function(a){return a(ob)})||rb(function(a){return a(pb)})||rb(function(a){return a(qb)});function sb(a){this.h=a}
sb.prototype.toString=function(){return this.h};
var tb=new sb("about:invalid#zClosurez");function ub(a){this.te=a}
function vb(a){return new ub(function(b){return b.substr(0,a.length+1).toLowerCase()===a+":"})}
var wb=[vb("data"),vb("http"),vb("https"),vb("mailto"),vb("ftp"),new ub(function(a){return/^[^:]*([/?#]|$)/.test(a)})],xb=/^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
function yb(a){if(a instanceof sb)if(a instanceof sb)a=a.h;else throw Error("");else a=xb.test(a)?a:void 0;return a}
;function zb(a,b){b=yb(b);b!==void 0&&(a.href=b)}
;function Ab(){this.h=Bb[0].toLowerCase()}
Ab.prototype.toString=function(){return this.h};function Cb(a){this.h=a}
Cb.prototype.toString=function(){return this.h+""};function Db(a){var b="true".toString(),c=[new Ab];if(c.length===0)throw Error("");if(c.map(function(d){if(d instanceof Ab)d=d.h;else throw Error("");return d}).every(function(d){return"data-loaded".indexOf(d)!==0}))throw Error('Attribute "data-loaded" does not match any of the allowed prefixes.');
a.setAttribute("data-loaded",b)}
;function Eb(a,b){throw Error(b===void 0?"unexpected value "+a+"!":b);}
;var Fb="alternate author bookmark canonical cite help icon license modulepreload next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" ");function Gb(a,b){if(b instanceof kb)a.href=mb(b).toString(),a.rel="stylesheet";else{if(Fb.indexOf("stylesheet")===-1)throw Error('TrustedResourceUrl href attribute required with rel="stylesheet"');b=yb(b);b!==void 0&&(a.href=b,a.rel="stylesheet")}}
;function Hb(a){a=a===void 0?document:a;var b,c;a=(c=(b="document"in a?a.document:a).querySelector)==null?void 0:c.call(b,"script[nonce]");return a==null?"":a.nonce||a.getAttribute("nonce")||""}
;function Ib(a){this.h=a}
Ib.prototype.toString=function(){return this.h+""};function Jb(a){var b=Hb(a.ownerDocument&&a.ownerDocument.defaultView||window);b&&a.setAttribute("nonce",b)}
function Kb(a,b){if(b instanceof Ib)b=b.h;else throw Error("");a.textContent=b;Jb(a)}
function Lb(a,b){a.src=mb(b);Jb(a)}
;var Mb=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(typeof a==="string")return typeof b!=="string"||b.length!=1?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Nb=Array.prototype.forEach?function(a,b){Array.prototype.forEach.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=typeof a==="string"?a.split(""):a,e=0;e<c;e++)e in d&&b.call(void 0,d[e],e,a)},Ob=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f=typeof a==="string"?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},Pb=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=typeof a==="string"?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Qb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
Nb(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Rb(a,b){a:{for(var c=a.length,d=typeof a==="string"?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return b<0?null:typeof a==="string"?a.charAt(b):a[b]}
function Sb(a,b){b=Mb(a,b);var c;(c=b>=0)&&Array.prototype.splice.call(a,b,1);return c}
function Tb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Pa(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Ub(a,b){a.__closure__error__context__984382||(a.__closure__error__context__984382={});a.__closure__error__context__984382.severity=b}
;function Vb(a){var b=E("window.location.href");a==null&&(a='Unknown Error of type "null/undefined"');if(typeof a==="string")return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||C.$googDebugFname||b}catch(g){e="Not available",c=!0}b=Wb(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(c==
null){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,Xb[c])c=Xb[c];else{c=String(c);if(!Xb[c]){var f=/function\s+([^\(]+)/m.exec(c);Xb[c]=f?f[1]:"[Anonymous]"}c=Xb[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";typeof a.toString==="function"&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}return{message:a.message,
name:a.name,lineNumber:a.lineNumber,fileName:a.fileName,stack:b}}
function Wb(a,b){b||(b={});b[Yb(a)]=!0;var c=a.stack||"",d=a.cause;d&&!b[Yb(d)]&&(c+="\nCaused by: ",d.stack&&d.stack.indexOf(d.toString())==0||(c+=typeof d==="string"?d:d.message+"\n"),c+=Wb(d,b));a=a.errors;if(Array.isArray(a)){d=1;var e;for(e=0;e<a.length&&!(d>4);e++)b[Yb(a[e])]||(c+="\nInner error "+d++ +": ",a[e].stack&&a[e].stack.indexOf(a[e].toString())==0||(c+=typeof a[e]==="string"?a[e]:a[e].message+"\n"),c+=Wb(a[e],b));e<a.length&&(c+="\n... "+(a.length-e)+" more inner errors")}return c}
function Yb(a){var b="";typeof a.toString==="function"&&(b=""+a);return b+a.stack}
var Xb={};function Zb(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var $b=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ac(a){return a?decodeURI(a):a}
function bc(a,b){return b.match($b)[a]||null}
function cc(a){return ac(bc(3,a))}
function dc(a){var b=a.match($b);a=b[5];var c=b[6];b=b[7];var d="";a&&(d+=a);c&&(d+="?"+c);b&&(d+="#"+b);return d}
function ec(a){var b=a.indexOf("#");return b<0?a:a.slice(0,b)}
function fc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)fc(a,String(b[d]),c);else b!=null&&c.push(a+(b===""?"":"="+encodeURIComponent(String(b))))}
function hc(a){var b=[],c;for(c in a)fc(c,a[c],b);return b.join("&")}
function ic(a,b){b=hc(b);if(b){var c=a.indexOf("#");c<0&&(c=a.length);var d=a.indexOf("?");if(d<0||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.slice(0,d),e,a.slice(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;b=a[0]+(a[1]?"?"+a[1]:"")+a[2]}else b=a;return b}
function jc(a,b,c,d){for(var e=c.length;(b=a.indexOf(c,b))>=0&&b<d;){var f=a.charCodeAt(b-1);if(f==38||f==63)if(f=a.charCodeAt(b+e),!f||f==61||f==38||f==35)return b;b+=e+1}return-1}
var kc=/#|$/,lc=/[?&]($|#)/;function mc(a,b){for(var c=a.search(kc),d=0,e,f=[];(e=jc(a,d,b,c))>=0;)f.push(a.substring(d,e)),d=Math.min(a.indexOf("&",e)+1||c,c);f.push(a.slice(d));return f.join("").replace(lc,"$1")}
;function nc(a){var b=b===void 0?41:b;var c=[];oc(a,pc,6).forEach(function(d){qc(d,2)<=b&&c.push(qc(d,1))});
return c}
function rc(a){var b=b===void 0?41:b;var c=[];oc(a,pc,6).forEach(function(d){qc(d,2)>b&&c.push(qc(d,1))});
return c}
function sc(a){var b=b===void 0?41:b;a=(a==null?void 0:qc(a,1))||0;return a>0&&b>=a}
;function tc(a){a&&typeof a.dispose=="function"&&a.dispose()}
;function uc(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Pa(d)?uc.apply(null,d):tc(d)}}
;function G(){this.da=this.da;this.H=this.H}
G.prototype.da=!1;G.prototype.dispose=function(){this.da||(this.da=!0,this.aa())};
G.prototype[Symbol.dispose]=function(){this.dispose()};
function vc(a,b){a.addOnDisposeCallback(Xa(tc,b))}
G.prototype.addOnDisposeCallback=function(a,b){this.da?b!==void 0?a.call(b):a():(this.H||(this.H=[]),b&&(a=a.bind(b)),this.H.push(a))};
G.prototype.aa=function(){if(this.H)for(;this.H.length;)this.H.shift()()};var wc;function xc(){G.apply(this,arguments);this.j=1;this[wc]=this.dispose}
w(xc,G);xc.prototype.share=function(){if(this.da)throw Error("E:AD");this.j++;return this};
xc.prototype.dispose=function(){--this.j||G.prototype.dispose.call(this)};
wc=Symbol.dispose;function yc(a){return{fieldType:2,fieldName:a}}
function zc(a){return{fieldType:3,fieldName:a}}
;function Ac(a){this.h=a;a.zc("/client_streamz/bg/frs",zc("ke"))}
Ac.prototype.record=function(a,b){this.h.record("/client_streamz/bg/frs",a,b)};
function Bc(a){this.h=a;a.zc("/client_streamz/bg/wrl",zc("mn"),yc("ac"),yc("sc"),zc("rk"),zc("mk"))}
Bc.prototype.record=function(a,b,c,d,e,f){this.h.record("/client_streamz/bg/wrl",a,b,c,d,e,f)};
function Cc(a){this.i=a;a.Eb("/client_streamz/bg/ec",zc("en"),zc("mk"))}
Cc.prototype.h=function(a,b){this.i.Cb("/client_streamz/bg/ec",a,b)};
function Dc(a){this.h=a;a.zc("/client_streamz/bg/el",zc("en"),zc("rk"),zc("mk"))}
Dc.prototype.record=function(a,b,c,d){this.h.record("/client_streamz/bg/el",a,b,c,d)};
function Ec(a){this.i=a;a.Eb("/client_streamz/bg/cec",yc("ec"),zc("rk"),zc("mk"))}
Ec.prototype.h=function(a,b,c){this.i.Cb("/client_streamz/bg/cec",a,b,c)};
function Fc(a){this.i=a;a.Eb("/client_streamz/bg/po/csc",yc("cs"),zc("rk"),zc("mk"))}
Fc.prototype.h=function(a,b,c){this.i.Cb("/client_streamz/bg/po/csc",a,b,c)};
function Gc(a){this.i=a;a.Eb("/client_streamz/bg/po/ctav",zc("av"),zc("rk"),zc("mk"))}
Gc.prototype.h=function(a,b,c){this.i.Cb("/client_streamz/bg/po/ctav",a,b,c)};
function Hc(a){this.i=a;a.Eb("/client_streamz/bg/po/cwsc",zc("su"),zc("rk"),zc("mk"))}
Hc.prototype.h=function(a,b,c){this.i.Cb("/client_streamz/bg/po/cwsc",a,b,c)};function Ic(a){C.setTimeout(function(){throw a;},0)}
;var Jc,Kc=E("CLOSURE_FLAGS"),Lc=Kc&&Kc[610401301];Jc=Lc!=null?Lc:!1;function Mc(){var a=C.navigator;return a&&(a=a.userAgent)?a:""}
var Nc,Oc=C.navigator;Nc=Oc?Oc.userAgentData||null:null;function Pc(a){return Jc?Nc?Nc.brands.some(function(b){return(b=b.brand)&&b.indexOf(a)!=-1}):!1:!1}
function H(a){return Mc().indexOf(a)!=-1}
;function Qc(){return Jc?!!Nc&&Nc.brands.length>0:!1}
function Rc(){return Qc()?!1:H("Opera")}
function Sc(){return H("Firefox")||H("FxiOS")}
function Tc(){return Qc()?Pc("Chromium"):(H("Chrome")||H("CriOS"))&&!(Qc()?0:H("Edge"))||H("Silk")}
;function Uc(){return Jc?!!Nc&&!!Nc.platform:!1}
function Vc(){return H("iPhone")&&!H("iPod")&&!H("iPad")}
;var Wc=Rc(),Xc=Qc()?!1:H("Trident")||H("MSIE"),Yc=H("Edge"),Zc=H("Gecko")&&!(Mc().toLowerCase().indexOf("webkit")!=-1&&!H("Edge"))&&!(H("Trident")||H("MSIE"))&&!H("Edge"),$c=Mc().toLowerCase().indexOf("webkit")!=-1&&!H("Edge");$c&&H("Mobile");Uc()||H("Macintosh");Uc()||H("Windows");(Uc()?Nc.platform==="Linux":H("Linux"))||Uc()||H("CrOS");var ad=Uc()?Nc.platform==="Android":H("Android");Vc();H("iPad");H("iPod");Vc()||H("iPad")||H("iPod");Mc().toLowerCase().indexOf("kaios");Sc();var bd=Vc()||H("iPod"),cd=H("iPad");!H("Android")||Tc()||Sc()||Rc()||H("Silk");Tc();var dd=H("Safari")&&!(Tc()||(Qc()?0:H("Coast"))||Rc()||(Qc()?0:H("Edge"))||(Qc()?Pc("Microsoft Edge"):H("Edg/"))||(Qc()?Pc("Opera"):H("OPR"))||Sc()||H("Silk")||H("Android"))&&!(Vc()||H("iPad")||H("iPod"));var ed={},fd=null;function gd(a,b){Pa(a);b===void 0&&(b=0);hd();b=ed[b];for(var c=Array(Math.floor(a.length/3)),d=b[64]||"",e=0,f=0;e<a.length-2;e+=3){var g=a[e],h=a[e+1],k=a[e+2],l=b[g>>2];g=b[(g&3)<<4|h>>4];h=b[(h&15)<<2|k>>6];k=b[k&63];c[f++]=""+l+g+h+k}l=0;k=d;switch(a.length-e){case 2:l=a[e+1],k=b[(l&15)<<2]||d;case 1:a=a[e],c[f]=""+b[a>>2]+b[(a&3)<<4|l>>4]+k+d}return c.join("")}
function id(a){var b=a.length,c=b*3/4;c%3?c=Math.floor(c):"=.".indexOf(a[b-1])!=-1&&(c="=.".indexOf(a[b-2])!=-1?c-2:c-1);var d=new Uint8Array(c),e=0;jd(a,function(f){d[e++]=f});
return e!==c?d.subarray(0,e):d}
function jd(a,b){function c(k){for(;d<a.length;){var l=a.charAt(d++),m=fd[l];if(m!=null)return m;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return k}
hd();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(h===64&&e===-1)break;b(e<<2|f>>4);g!=64&&(b(f<<4&240|g>>2),h!=64&&b(g<<6&192|h))}}
function hd(){if(!fd){fd={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;c<5;c++){var d=a.concat(b[c].split(""));ed[c]=d;for(var e=0;e<d.length;e++){var f=d[e];fd[f]===void 0&&(fd[f]=e)}}}}
;var kd=typeof Uint8Array!=="undefined",ld=!Xc&&typeof btoa==="function";function md(a){if(!ld)return gd(a);for(var b="",c=0,d=a.length-10240;c<d;)b+=String.fromCharCode.apply(null,a.subarray(c,c+=10240));b+=String.fromCharCode.apply(null,c?a.subarray(c):a);return btoa(b)}
var nd=/[-_.]/g,od={"-":"+",_:"/",".":"="};function pd(a){return od[a]||""}
function qd(a){return kd&&a!=null&&a instanceof Uint8Array}
var rd={};function sd(a,b){td(b);this.h=a;if(a!=null&&a.length===0)throw Error("ByteString should be constructed with non-empty values");}
sd.prototype.sizeBytes=function(){td(rd);var a=this.h;if(a!=null&&!qd(a))if(typeof a==="string")if(ld){nd.test(a)&&(a=a.replace(nd,pd));a=atob(a);for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b}else a=id(a);else Oa(a),a=null;return(a=a==null?a:this.h=a)?a.length:0};
var ud;function td(a){if(a!==rd)throw Error("illegal external caller");}
;var vd;function wd(){var a=Error();Ub(a,"incident");Ic(a)}
function xd(a){a=Error(a);Ub(a,"warning");return a}
;function yd(){return typeof BigInt==="function"}
;function zd(a){return Array.prototype.slice.call(a)}
;var Ad=typeof Symbol==="function"&&typeof Symbol()==="symbol";function Bd(a){return typeof Symbol==="function"&&typeof Symbol()==="symbol"?Symbol():a}
var Cd=Bd(),Dd=Bd("2ex"),Ed=Bd("1oa");Math.max.apply(Math,ra(Object.values({Zg:1,Xg:2,Wg:4,dh:8,bh:16,ah:32,Cf:64,fh:128,Vg:256,Ug:512,Yg:1024,If:2048,eh:4096,Jf:8192,Df:16384})));var Fd=Ad?function(a,b){a[Cd]|=b}:function(a,b){a.Ta!==void 0?a.Ta|=b:Object.defineProperties(a,{Ta:{value:b,
configurable:!0,writable:!0,enumerable:!1}})},Gd=Ad?function(a){return a[Cd]|0}:function(a){return a.Ta|0},Hd=Ad?function(a){return a[Cd]}:function(a){return a.Ta},Id=Ad?function(a,b){a[Cd]=b}:function(a,b){a.Ta!==void 0?a.Ta=b:Object.defineProperties(a,{Ta:{value:b,
configurable:!0,writable:!0,enumerable:!1}})};
function Jd(a,b){Id(b,(a|0)&-30975)}
function Kd(a,b){Id(b,(a|34)&-30941)}
;var Ld={},Md={};function Nd(a){return!(!a||typeof a!=="object"||a.h!==Md)}
function Od(a){return a!==null&&typeof a==="object"&&!Array.isArray(a)&&a.constructor===Object}
function Pd(a){return!Array.isArray(a)||a.length?!1:Gd(a)&1?!0:!1}
var Qd,Rd=[];Id(Rd,55);Qd=Object.freeze(Rd);function Sd(a){if(a&2)throw Error();}
var Td=Object.freeze({});function Ud(a){a.th=!0;return a}
;var Vd=Ud(function(a){return typeof a==="number"}),Wd=Ud(function(a){return typeof a==="string"}),Xd=Ud(function(a){return typeof a==="boolean"});
function Yd(){var a=Zd;return Ud(function(b){for(var c in a)if(b===a[c]&&!/^[0-9]+$/.test(c))return!0;return!1})}
var $d=Ud(function(a){return a!=null&&typeof a==="object"&&typeof a.then==="function"});var ae=typeof C.BigInt==="function"&&typeof C.BigInt(0)==="bigint";function be(a){var b=a;if(Wd(b)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b))throw Error(String(b));}else if(Vd(b)&&!Number.isSafeInteger(b))throw Error(String(b));return ae?BigInt(a):a=Xd(a)?a?"1":"0":Wd(a)?a.trim()||"0":String(a)}
var he=Ud(function(a){return ae?a>=ce&&a<=de:a[0]==="-"?ee(a,fe):ee(a,ge)}),fe=Number.MIN_SAFE_INTEGER.toString(),ce=ae?BigInt(Number.MIN_SAFE_INTEGER):void 0,ge=Number.MAX_SAFE_INTEGER.toString(),de=ae?BigInt(Number.MAX_SAFE_INTEGER):void 0;
function ee(a,b){if(a.length>b.length)return!1;if(a.length<b.length||a===b)return!0;for(var c=0;c<a.length;c++){var d=a[c],e=b[c];if(d>e)return!1;if(d<e)return!0}}
;var ie=0,je=0;function ke(a){var b=a>>>0;ie=b;je=(a-b)/4294967296>>>0}
function le(a){if(a<0){ke(0-a);var b=z(me(ie,je));a=b.next().value;b=b.next().value;ie=a>>>0;je=b>>>0}else ke(a)}
function ne(a,b){b>>>=0;a>>>=0;if(b<=2097151)var c=""+(4294967296*b+a);else yd()?c=""+(BigInt(b)<<BigInt(32)|BigInt(a)):(c=(a>>>24|b<<8)&16777215,b=b>>16&65535,a=(a&16777215)+c*6777216+b*6710656,c+=b*8147497,b*=2,a>=1E7&&(c+=a/1E7>>>0,a%=1E7),c>=1E7&&(b+=c/1E7>>>0,c%=1E7),c=b+oe(c)+oe(a));return c}
function oe(a){a=String(a);return"0000000".slice(a.length)+a}
function pe(){var a=ie,b=je;b&2147483648?yd()?a=""+(BigInt(b|0)<<BigInt(32)|BigInt(a>>>0)):(b=z(me(a,b)),a=b.next().value,b=b.next().value,a="-"+ne(a,b)):a=ne(a,b);return a}
function me(a,b){b=~b;a?a=~a+1:b+=1;return[a,b]}
;function qe(a){return a.displayName||a.name||"unknown type name"}
function re(a){if(a!=null&&typeof a!=="boolean")throw Error("Expected boolean but got "+Oa(a)+": "+a);return a}
var se=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function te(a){var b=typeof a;switch(b){case "bigint":return!0;case "number":return Number.isFinite(a)}return b!=="string"?!1:se.test(a)}
function ue(a){if(typeof a!=="number")throw xd("int32");if(!Number.isFinite(a))throw xd("int32");return a|0}
function ve(a){return a==null?a:ue(a)}
function we(a){if(a==null)return a;if(typeof a==="string"){if(!a)return;a=+a}if(typeof a==="number")return Number.isFinite(a)?a|0:void 0}
function xe(a){var b=0;b=b===void 0?0:b;if(!te(a))throw xd("int64");var c=typeof a;switch(b){case 4096:switch(c){case "string":return ye(a);case "bigint":return String(BigInt.asIntN(64,a));default:return ze(a)}case 8192:switch(c){case "string":return b=Math.trunc(Number(a)),Number.isSafeInteger(b)?a=be(b):(b=a.indexOf("."),b!==-1&&(a=a.substring(0,b)),a=yd()?be(BigInt.asIntN(64,BigInt(a))):be(Ae(a))),a;case "bigint":return be(BigInt.asIntN(64,a));default:return Number.isSafeInteger(a)?be(Be(a)):be(ze(a))}case 0:switch(c){case "string":return ye(a);
case "bigint":return be(BigInt.asIntN(64,a));default:return Be(a)}default:return Eb(b,"Unknown format requested type for int64")}}
function Ce(a){return a==null?a:xe(a)}
function De(a){return a[0]==="-"?a.length<20?!0:a.length===20&&Number(a.substring(0,7))>-922337:a.length<19?!0:a.length===19&&Number(a.substring(0,6))<922337}
function Ae(a){a.indexOf(".");if(De(a))return a;if(a.length<16)le(Number(a));else if(yd())a=BigInt(a),ie=Number(a&BigInt(4294967295))>>>0,je=Number(a>>BigInt(32)&BigInt(4294967295));else{var b=+(a[0]==="-");je=ie=0;for(var c=a.length,d=0+b,e=(c-b)%6+b;e<=c;d=e,e+=6)d=Number(a.slice(d,e)),je*=1E6,ie=ie*1E6+d,ie>=4294967296&&(je+=Math.trunc(ie/4294967296),je>>>=0,ie>>>=0);b&&(b=z(me(ie,je)),a=b.next().value,b=b.next().value,ie=a,je=b)}return pe()}
function Be(a){te(a);a=Math.trunc(a);if(!Number.isSafeInteger(a)){le(a);var b=ie,c=je;if(a=c&2147483648)b=~b+1>>>0,c=~c>>>0,b==0&&(c=c+1>>>0);var d=c*4294967296+(b>>>0);b=Number.isSafeInteger(d)?d:ne(b,c);a=typeof b==="number"?a?-b:b:a?"-"+b:b}return a}
function ze(a){te(a);a=Math.trunc(a);if(Number.isSafeInteger(a))a=String(a);else{var b=String(a);De(b)?a=b:(le(a),a=pe())}return a}
function ye(a){te(a);var b=Math.trunc(Number(a));if(Number.isSafeInteger(b))return String(b);b=a.indexOf(".");b!==-1&&(a=a.substring(0,b));return Ae(a)}
function Ee(a){if(a==null)return a;if(typeof a==="bigint")return he(a)?a=Number(a):(a=BigInt.asIntN(64,a),a=he(a)?Number(a):String(a)),a;if(te(a))return typeof a==="number"?Be(a):ye(a)}
function Fe(a){if(typeof a!=="string")throw Error();return a}
function Ge(a){if(a!=null&&typeof a!=="string")throw Error();return a}
function He(a,b){if(!(a instanceof b))throw Error("Expected instanceof "+qe(b)+" but got "+(a&&qe(a.constructor)));}
function Ie(a,b,c){if(a!=null&&typeof a==="object"&&a.Kc===Ld)return a;if(Array.isArray(a)){var d=Gd(a),e=d;e===0&&(e|=c&32);e|=c&2;e!==d&&Id(a,e);return new b(a)}}
;function Je(a){Ke===void 0&&(Ke=typeof Proxy==="function"?Le(Proxy):null);var b;(b=!Ke)||(Me===void 0&&(Me=typeof WeakMap==="function"?Le(WeakMap):null),b=!Me);if(b)return a;if(b=Ne(a))return b;if(Math.random()>.01)return a;Oe(a);b=new Ke(a,{set:function(c,d,e){Pe();c[d]=e;return!0}});
Qe(a,b);return b}
function Pe(){wd()}
var Re=void 0,Se=void 0;function Ne(a){var b;return(b=Re)==null?void 0:b.get(a)}
function Te(a){var b;return((b=Se)==null?void 0:b.get(a))||a}
function Qe(a,b){(Re||(Re=new Me)).set(a,b);(Se||(Se=new Me)).set(b,a)}
var Ke=void 0,Me=void 0;function Le(a){try{return a.toString().indexOf("[native code]")!==-1?a:null}catch(b){return null}}
var Ue=void 0;function Oe(a){if(Ue===void 0){var b=new Ke([],{});Ue=Array.prototype.concat.call([],b).length===1}Ue&&typeof Symbol==="function"&&Symbol.isConcatSpreadable&&(a[Symbol.isConcatSpreadable]=!0)}
;function J(a,b,c){var d=d!=null?d:0;if(a==null){var e=96;c?(a=[c],e|=512):a=[];b&&(e=e&-33521665|(b&1023)<<15)}else{if(!Array.isArray(a))throw Error("narr");e=Gd(a);if(e&2048)throw Error("farr");if(e&64)return a;d===1||d===2||(e|=64);if(c&&(e|=512,c!==a[0]))throw Error("mid");a:{c=a;if(d=c.length){var f=d-1;if(Od(c[f])){e|=256;b=f-(+!!(e&512)-1);if(b>=1024)throw Error("pvtlmt");e=e&-33521665|(b&1023)<<15;break a}}if(b){b=Math.max(b,d-(+!!(e&512)-1));if(b>1024)throw Error("spvt");e=e&-33521665|(b&
1023)<<15}}}Id(a,e);return a}
;function Ve(a,b){return We(b)}
function We(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "bigint":return he(a)?Number(a):String(a);case "boolean":return a?1:0;case "object":if(a)if(Array.isArray(a)){if(Pd(a))return}else{if(qd(a))return md(a);if(a instanceof sd){var b=a.h;return b==null?"":typeof b==="string"?b:a.h=md(b)}}}return a}
;function Xe(a,b,c){a=zd(a);var d=a.length,e=b&256?a[d-1]:void 0;d+=e?-1:0;for(b=b&512?1:0;b<d;b++)a[b]=c(a[b]);if(e){b=a[b]={};for(var f in e)b[f]=c(e[f])}return a}
function Ye(a,b,c,d,e){if(a!=null){if(Array.isArray(a))a=Pd(a)?void 0:e&&Gd(a)&2?a:Ze(a,b,c,d!==void 0,e);else if(Od(a)){var f={},g;for(g in a)f[g]=Ye(a[g],b,c,d,e);a=f}else a=b(a,d);return a}}
function Ze(a,b,c,d,e){var f=d||c?Gd(a):0;d=d?!!(f&32):void 0;a=zd(a);for(var g=0;g<a.length;g++)a[g]=Ye(a[g],b,c,d,e);c&&c(f,a);return a}
function $e(a){return a.Kc===Ld?a.toJSON():We(a)}
;function af(a,b,c){c=c===void 0?Kd:c;if(a!=null){if(kd&&a instanceof Uint8Array)return b?a:new Uint8Array(a);if(Array.isArray(a)){var d=Gd(a);if(d&2)return a;b&&(b=d===0||!!(d&32)&&!(d&64||!(d&16)));return b?(Id(a,(d|34)&-12293),a):Ze(a,af,d&4?Kd:c,!0,!0)}a.Kc===Ld&&(c=a.F,d=Hd(c),a=d&2?a:new a.constructor(bf(c,d,!0)));return a}}
function bf(a,b,c){var d=c||b&2?Kd:Jd,e=!!(b&32);a=Xe(a,b,function(f){return af(f,e,d)});
Fd(a,32|(c?2:0));return a}
function cf(a){var b=a.F,c=Hd(b);return c&2?new a.constructor(bf(b,c,!1)):a}
;function df(a,b){a=a.F;return ef(a,Hd(a),b)}
function ff(a,b,c,d){b=d+(+!!(b&512)-1);if(!(b<0||b>=a.length||b>=c))return a[b]}
function ef(a,b,c,d){if(c===-1)return null;var e=b>>15&1023||536870912;if(c>=e){if(b&256)return a[a.length-1][c]}else{var f=a.length;if(d&&b&256&&(d=a[f-1][c],d!=null)){if(ff(a,b,e,c)&&Dd!=null){var g;a=(g=vd)!=null?g:vd={};g=a[Dd]||0;g>=4||(a[Dd]=g+1,wd())}return d}return ff(a,b,e,c)}}
function K(a,b,c){var d=a.F,e=Hd(d);Sd(e);gf(d,e,b,c);return a}
function gf(a,b,c,d){Od(d);var e=b>>15&1023||536870912;if(c>=e){var f=b;if(b&256)var g=a[a.length-1];else{if(d==null)return f;g=a[e+(+!!(b&512)-1)]={};f|=256}g[c]=d;c<e&&(a[c+(+!!(b&512)-1)]=void 0);f!==b&&Id(a,f);return f}a[c+(+!!(b&512)-1)]=d;b&256&&(a=a[a.length-1],c in a&&delete a[c]);return b}
function hf(a){return jf(a,kf,11,!1)!==void 0}
function lf(a){return!!(2&a)&&!!(4&a)||!!(2048&a)}
function mf(a,b,c){var d=a.F,e=Hd(d);Sd(e);if(b==null)return gf(d,e,3),a;b=Te(b);if(!Array.isArray(b))throw xd();var f=Gd(b),g=f,h=lf(f),k=h||Object.isFrozen(b);h||(f=0);k||(b=zd(b),g=0,f=nf(f,e),f=of(f,e,!0),k=!1);f|=21;h=4&f?4096&f?4096:8192&f?8192:0:void 0;h=h!=null?h:0;for(var l=0;l<b.length;l++){var m=b[l],n=c(m,h);Object.is(m,n)||(k&&(b=zd(b),g=0,f=nf(f,e),f=of(f,e,!0),k=!1),b[l]=n)}f!==g&&(k&&(b=zd(b),f=nf(f,e),f=of(f,e,!0)),Id(b,f));gf(d,e,3,b);return a}
function pf(a,b,c,d){a=a.F;var e=Hd(a);Sd(e);if(d==null){var f=qf(a);if(rf(f,a,e,c)===b)f.set(c,0);else return}else{c.includes(b);f=qf(a);var g=rf(f,a,e,c);g!==b&&(g&&(e=gf(a,e,g)),f.set(c,b))}gf(a,e,b,d)}
function qf(a){if(Ad){var b;return(b=a[Ed])!=null?b:a[Ed]=new Map}if(Ed in a)return a[Ed];b=new Map;Object.defineProperty(a,Ed,{value:b});return b}
function rf(a,b,c,d){var e=a.get(d);if(e!=null)return e;for(var f=e=0;f<d.length;f++){var g=d[f];ef(b,c,g)!=null&&(e!==0&&(c=gf(b,c,e)),e=g)}a.set(d,e);return e}
function jf(a,b,c,d){a=a.F;var e=Hd(a);d=ef(a,e,c,d);b=Ie(d,b,e);b!==d&&b!=null&&gf(a,e,c,b);return b}
function sf(a,b,c,d){b=jf(a,b,c,d===void 0?!1:d);if(b==null)return b;a=a.F;d=Hd(a);if(!(d&2)){var e=cf(b);e!==b&&(b=e,gf(a,d,c,b))}return b}
function oc(a,b,c){var d=void 0===Td?2:4;var e=Hd(a.F),f=e,g=!(2&e);a=a.F;d=(e=!!(2&f))?1:d;g&&(g=!e);e=ef(a,f,c);e=Array.isArray(e)?e:Qd;var h=Gd(e),k=!!(4&h);if(!k){var l=h;l===0&&(l=nf(l,f));h=e;l|=1;var m=f,n=!!(2&l);n&&(m|=2);for(var p=!n,t=!0,v=0,x=0;v<h.length;v++){var y=Ie(h[v],b,m);if(y instanceof b){if(!n){var F=!!(Gd(y.F)&2);p&&(p=!F);t&&(t=F)}h[x++]=y}}x<v&&(h.length=x);l|=4;l=t?l|16:l&-17;l=p?l|8:l&-9;Id(h,l);n&&Object.freeze(h);h=l}if(g&&!(8&h||!e.length&&(d===1||d===4&&32&h))){lf(h)&&
(e=zd(e),h=nf(h,f),f=gf(a,f,c,e));b=e;g=h;for(h=0;h<b.length;h++)l=b[h],m=cf(l),l!==m&&(b[h]=m);g|=8;g=b.length?g&-17:g|16;Id(b,g);h=g}var I;if(d===1||d===4&&32&h){if(!lf(h)){f=h;var V=!!(32&h);h|=!e.length||16&h&&(!k||V)?2:2048;h!==f&&Id(e,h);Object.freeze(e)}}else k=d!==5?!1:!!(32&h)||lf(h)||!!Ne(e),(d===2||k)&&lf(h)&&(e=zd(e),h=nf(h,f),h=of(h,f,!1),Id(e,h),f=gf(a,f,c,e)),lf(h)||(c=h,h=of(h,f,!1),h!==c&&Id(e,h)),k?I=Je(e):d===2&&((V=Re)==null||V.delete(e));return I||e}
function tf(a,b,c,d){d!=null?He(d,b):d=void 0;return K(a,c,d)}
function uf(a,b,c,d){var e=a.F,f=Hd(e);Sd(f);if(d==null)return gf(e,f,c),a;d=Te(d);if(!Array.isArray(d))throw xd();for(var g=Gd(d),h=g,k=lf(g),l=k||Object.isFrozen(d),m=!0,n=!0,p=0;p<d.length;p++){var t=d[p];He(t,b);k||(t=!!(Gd(t.F)&2),m&&(m=!t),n&&(n=t))}k||(g=m?13:5,g=n?g|16:g&-17);l&&g===h||(d=zd(d),h=0,g=nf(g,f),g=of(g,f,!0));g!==h&&Id(d,g);gf(e,f,c,d);return a}
function nf(a,b){a=(2&b?a|2:a&-3)|32;return a&=-2049}
function of(a,b,c){32&b&&c||(a&=-33);return a}
function vf(a){a=df(a,1);var b=b===void 0?!1:b;var c=typeof a;b=a==null?a:c==="bigint"?String(BigInt.asIntN(64,a)):te(a)?c==="string"?ye(a):b?ze(a):Be(a):void 0;return b}
function wf(a,b){return a!=null?a:b}
function qc(a,b,c){c=c===void 0?0:c;return wf(we(df(a,b)),c)}
function xf(a,b){var c=c===void 0?"":c;a=df(a,b);return wf(a==null||typeof a==="string"?a:void 0,c)}
function yf(a){var b=0;b=b===void 0?0:b;a=df(a,1);a=a==null?a:Number.isFinite(a)?a|0:void 0;return wf(a,b)}
function zf(a,b,c){return K(a,b,Ge(c))}
function Af(a,b,c){if(c!=null){if(!Number.isFinite(c))throw xd("enum");c|=0}return K(a,b,c)}
;function Bf(a){return a}
function Cf(a){return a}
function Df(a,b,c,d){return Ef(a,b,c,d,Ff,Gf)}
function Hf(a,b,c,d){return Ef(a,b,c,d,If,Jf)}
function Ef(a,b,c,d,e,f){if(!c.length&&!d)return 0;for(var g=0,h=0,k=0,l=0,m=0,n=c.length-1;n>=0;n--){var p=c[n];d&&n===c.length-1&&p===d||(l++,p!=null&&k++)}if(d)for(var t in d)n=+t,isNaN(n)||(m+=Kf(n),h++,n>g&&(g=n));l=e(l,k)+f(h,g,m);t=k;n=h;p=g;for(var v=m,x=c.length-1;x>=0;x--){var y=c[x];if(!(y==null||d&&x===c.length-1&&y===d)){y=x-b;var F=e(y,t)+f(n,p,v);F<l&&(a=1+y,l=F);n++;t--;v+=Kf(y);p=Math.max(p,y)}}b=e(0,0)+f(n,p,v);b<l&&(a=0,l=b);if(d){n=h;p=g;v=m;t=k;for(var I in d)d=+I,isNaN(d)||d>=
1024||(n--,t++,v-=I.length,g=e(d,t)+f(n,p,v),g<l&&(a=1+d,l=g))}return a}
function Jf(a,b,c){return c+a*3+(a>1?a-1:0)}
function If(a,b){return(a>1?a-1:0)+(a-b)*4}
function Gf(a,b){return a==0?0:9*Math.max(1<<32-Math.clz32(a+a/2-1),4)<=b?a==0?0:a<4?100+(a-1)*16:a<6?148+(a-4)*16:a<12?244+(a-6)*16:a<22?436+(a-12)*19:a<44?820+(a-22)*17:52+32*a:40+4*b}
function Ff(a){return 40+4*a}
function Kf(a){return a>=100?a>=1E4?Math.ceil(Math.log10(1+a)):a<1E3?3:4:a<10?1:2}
;var Lf,Mf;function L(a,b,c){this.F=J(a,b,c)}
r=L.prototype;r.toJSON=function(){return Nf(this)};
r.serialize=function(a){try{return Mf=!0,a&&(Lf=a===Cf||a!==Bf&&a!==Df&&a!==Hf?Cf:a),JSON.stringify(Nf(this),Ve)}finally{a&&(Lf=void 0),Mf=!1}};
function Of(a,b){if(b==null||b=="")return new a;b=JSON.parse(b);if(!Array.isArray(b))throw Error("dnarr");Fd(b,32);return new a(b)}
r.clone=function(){var a=this.F,b=Hd(a);return new this.constructor(bf(a,b,!1))};
r.Kc=Ld;r.toString=function(){try{return Mf=!0,Nf(this).toString()}finally{Mf=!1}};
function Nf(a){var b=a.F,c;Mf?c=b:c=Ze(b,$e,void 0,void 0,!1);b=c;c=!Mf;var d=Hd(c?a.F:b);if(a=b.length){var e=b[a-1],f=Od(e);f?a--:e=void 0;var g=+!!(d&512)-1,h=a-g;d=!!Lf&&!(d&512);var k,l=(k=Lf)!=null?k:Cf;k=d?l(h,g,b,e):h;d=(h=d&&h!==k)?Array.prototype.slice.call(b,0,a):b;if(f||h){b:{var m=d;var n=e;var p;f=!1;if(h)for(l=Math.max(0,k+g);l<m.length;l++){var t=m[l],v=l-g;t==null||Pd(t)||Nd(t)&&t.size===0||(f=m[l]=void 0,((f=p)!=null?f:p={})[v]=t,f=!0)}if(n)for(var x in n)if(l=+x,isNaN(l))l=void 0,
((l=p)!=null?l:p={})[x]=n[x];else if(t=n[x],Array.isArray(t)&&(Pd(t)||Nd(t)&&t.size===0)&&(t=null),t==null&&(f=!0),h&&l<k){f=!0;t=l+g;for(v=m.length;v<=t;v++)m.push(void 0);m[t]=n[l]}else t!=null&&(l=void 0,((l=p)!=null?l:p={})[x]=t);f||(p=n);if(p)for(var y in p){n=p;break b}n=null}m=n==null?e!=null:n!==e}h&&(a=d.length);for(;a>0;a--){p=d[a-1];if(!(p==null||Pd(p)||Nd(p)&&p.size===0))break;var F=!0}if(d!==b||m||F){if(!h&&!c)d=Array.prototype.slice.call(d,0,a);else if(F||m||n)d.length=a;n&&d.push(n)}F=
d}else F=b;return F}
;function Pf(a){return function(b){return Of(a,b)}}
;function Qf(a){this.F=J(a)}
w(Qf,L);function Rf(a,b){return mf(a,b,ue)}
;function Sf(a){this.F=J(a)}
w(Sf,L);var Tf=[1,2,3];function Uf(a){this.F=J(a)}
w(Uf,L);var Vf=[1,2,3];function Wf(a){this.F=J(a)}
w(Wf,L);function Xf(a){this.F=J(a)}
w(Xf,L);function Yf(a){this.F=J(a)}
w(Yf,L);function Zf(a){if(!a)return"";if(/^about:(?:blank|srcdoc)$/.test(a))return window.origin||"";a.indexOf("blob:")===0&&(a=a.substring(5));a=a.split("#")[0].split("?")[0];a=a.toLowerCase();a.indexOf("//")==0&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");c!=-1&&(b=b.substring(0,c));c=a.substring(0,a.indexOf("://"));if(!c)throw Error("URI is missing protocol: "+a);if(c!=="http"&&c!=="https"&&c!=="chrome-extension"&&
c!=="moz-extension"&&c!=="file"&&c!=="android-app"&&c!=="chrome-search"&&c!=="chrome-untrusted"&&c!=="chrome"&&c!=="app"&&c!=="devtools")throw Error("Invalid URI scheme in origin: "+c);a="";var d=b.indexOf(":");if(d!=-1){var e=b.substring(d+1);b=b.substring(0,d);if(c==="http"&&e!=="80"||c==="https"&&e!=="443")a=":"+e}return c+"://"+b+a}
;function $f(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(n){for(var p=g,t=0;t<64;t+=4)p[t/4]=n[t]<<24|n[t+1]<<16|n[t+2]<<8|n[t+3];for(t=16;t<80;t++)n=p[t-3]^p[t-8]^p[t-14]^p[t-16],p[t]=(n<<1|n>>>31)&4294967295;n=e[0];var v=e[1],x=e[2],y=e[3],F=e[4];for(t=0;t<80;t++){if(t<40)if(t<20){var I=y^v&(x^y);var V=1518500249}else I=v^x^y,V=1859775393;else t<60?(I=v&x|y&(v|x),V=2400959708):(I=v^x^y,V=3395469782);I=((n<<5|n>>>27)&4294967295)+I+F+V+p[t]&4294967295;F=y;y=x;x=(v<<30|v>>>2)&4294967295;v=n;n=I}e[0]=e[0]+n&4294967295;e[1]=e[1]+v&4294967295;e[2]=
e[2]+x&4294967295;e[3]=e[3]+y&4294967295;e[4]=e[4]+F&4294967295}
function c(n,p){if(typeof n==="string"){n=unescape(encodeURIComponent(n));for(var t=[],v=0,x=n.length;v<x;++v)t.push(n.charCodeAt(v));n=t}p||(p=n.length);t=0;if(l==0)for(;t+64<p;)b(n.slice(t,t+64)),t+=64,m+=64;for(;t<p;)if(f[l++]=n[t++],m++,l==64)for(l=0,b(f);t+64<p;)b(n.slice(t,t+64)),t+=64,m+=64}
function d(){var n=[],p=m*8;l<56?c(h,56-l):c(h,64-(l-56));for(var t=63;t>=56;t--)f[t]=p&255,p>>>=8;b(f);for(t=p=0;t<5;t++)for(var v=24;v>=0;v-=8)n[p++]=e[t]>>v&255;return n}
for(var e=[],f=[],g=[],h=[128],k=1;k<64;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,Vd:function(){for(var n=d(),p="",t=0;t<n.length;t++)p+="0123456789ABCDEF".charAt(Math.floor(n[t]/16))+"0123456789ABCDEF".charAt(n[t]%16);return p}}}
;function ag(a,b,c){var d=String(C.location.href);return d&&a&&b?[b,bg(Zf(d),a,c||null)].join(" "):null}
function bg(a,b,c){var d=[],e=[];if((Array.isArray(c)?2:1)==1)return e=[b,a],Nb(d,function(h){e.push(h)}),cg(e.join(" "));
var f=[],g=[];Nb(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=f.length==0?[c,b,a]:[f.join(":"),c,b,a];Nb(d,function(h){e.push(h)});
a=cg(e.join(" "));a=[c,a];g.length==0||a.push(g.join(""));return a.join("_")}
function cg(a){var b=$f();b.update(a);return b.Vd().toLowerCase()}
;function dg(a){this.h=a||{cookie:""}}
r=dg.prototype;r.isEnabled=function(){if(!C.navigator.cookieEnabled)return!1;if(this.h.cookie)return!0;this.set("TESTCOOKIESENABLED","1",{Mb:60});if(this.get("TESTCOOKIESENABLED")!=="1")return!1;this.remove("TESTCOOKIESENABLED");return!0};
r.set=function(a,b,c){var d=!1;if(typeof c==="object"){var e=c.Ne;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Mb}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');h===void 0&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=h<0?"":h==0?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+h*1E3)).toUTCString();this.h.cookie=a+"="+b+c+g+h+d+(e!=null?";samesite="+
e:"")};
r.get=function(a,b){for(var c=a+"=",d=(this.h.cookie||"").split(";"),e=0,f;e<d.length;e++){f=fb(d[e]);if(f.lastIndexOf(c,0)==0)return f.slice(c.length);if(f==a)return""}return b};
r.remove=function(a,b,c){var d=this.get(a)!==void 0;this.set(a,"",{Mb:0,path:b,domain:c});return d};
r.clear=function(){for(var a=(this.h.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=fb(a[f]),d=e.indexOf("="),d==-1?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;a>=0;a--)this.remove(b[a])};
var eg=new dg(typeof document=="undefined"?null:document);function fg(){var a=C.__SAPISID||C.__APISID||C.__3PSAPISID||C.__1PSAPISID||C.__OVERRIDE_SID;if(a)return!0;typeof document!=="undefined"&&(a=new dg(document),a=a.get("SAPISID")||a.get("APISID")||a.get("__Secure-3PAPISID")||a.get("__Secure-1PAPISID"));return!!a}
function gg(a,b,c,d){(a=C[a])||typeof document==="undefined"||(a=(new dg(document)).get(b));return a?ag(a,c,d):null}
function hg(a){var b=Zf(String(C.location.href)),c=[];if(fg()){b=b.indexOf("https:")==0||b.indexOf("chrome-extension:")==0||b.indexOf("chrome-untrusted://new-tab-page")==0||b.indexOf("moz-extension:")==0;var d=b?C.__SAPISID:C.__APISID;d||typeof document==="undefined"||(d=new dg(document),d=d.get(b?"SAPISID":"APISID")||d.get("__Secure-3PAPISID"));(d=d?ag(d,b?"SAPISIDHASH":"APISIDHASH",a):null)&&c.push(d);b&&((b=gg("__1PSAPISID","__Secure-1PAPISID","SAPISID1PHASH",a))&&c.push(b),(a=gg("__3PSAPISID",
"__Secure-3PAPISID","SAPISID3PHASH",a))&&c.push(a))}return c.length==0?null:c.join(" ")}
;function ig(){}
ig.prototype.compress=function(a){var b,c,d,e;return A(function(f){switch(f.h){case 1:return b=new CompressionStream("gzip"),c=(new Response(b.readable)).arrayBuffer(),d=b.writable.getWriter(),f.yield(d.write((new TextEncoder).encode(a)),2);case 2:return f.yield(d.close(),3);case 3:return e=Uint8Array,f.yield(c,4);case 4:return f.return(new e(f.i))}})};
ig.prototype.isSupported=function(a){return a<1024?!1:typeof CompressionStream!=="undefined"};function jg(a){this.F=J(a)}
w(jg,L);function kg(a,b){this.intervalMs=a;this.callback=b;this.enabled=!1;this.h=function(){return Ya()};
this.i=this.h()}
kg.prototype.setInterval=function(a){this.intervalMs=a;this.timer&&this.enabled?(this.stop(),this.start()):this.timer&&this.stop()};
kg.prototype.start=function(){var a=this;this.enabled=!0;this.timer||(this.timer=setTimeout(function(){a.tick()},this.intervalMs),this.i=this.h())};
kg.prototype.stop=function(){this.enabled=!1;this.timer&&(clearTimeout(this.timer),this.timer=void 0)};
kg.prototype.tick=function(){var a=this;if(this.enabled){var b=Math.max(this.h()-this.i,0);b<this.intervalMs*.8?this.timer=setTimeout(function(){a.tick()},this.intervalMs-b):(this.timer&&(clearTimeout(this.timer),this.timer=void 0),this.callback(),this.enabled&&(this.stop(),this.start()))}else this.timer=void 0};function lg(a){this.F=J(a)}
w(lg,L);function mg(a){this.F=J(a)}
w(mg,L);function ng(a,b){this.x=a!==void 0?a:0;this.y=b!==void 0?b:0}
r=ng.prototype;r.clone=function(){return new ng(this.x,this.y)};
r.equals=function(a){return a instanceof ng&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
r.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
r.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
r.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
r.scale=function(a,b){this.x*=a;this.y*=typeof b==="number"?b:a;return this};function og(a,b){this.width=a;this.height=b}
r=og.prototype;r.clone=function(){return new og(this.width,this.height)};
r.aspectRatio=function(){return this.width/this.height};
r.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
r.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
r.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
r.scale=function(a,b){this.width*=a;this.height*=typeof b==="number"?b:a;return this};function pg(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function qg(a){var b=rg,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function sg(a){for(var b in a)return!1;return!0}
function tg(a,b){if(a!==null&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function ug(a){return a!==null&&"privembed"in a?a.privembed:!1}
function vg(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function wg(a){var b={},c;for(c in a)b[c]=a[c];return b}
function xg(a){if(!a||typeof a!=="object")return a;if(typeof a.clone==="function")return a.clone();if(typeof Map!=="undefined"&&a instanceof Map)return new Map(a);if(typeof Set!=="undefined"&&a instanceof Set)return new Set(a);if(a instanceof Date)return new Date(a.getTime());var b=Array.isArray(a)?[]:typeof ArrayBuffer!=="function"||typeof ArrayBuffer.isView!=="function"||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=xg(a[c]);return b}
var yg="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function zg(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<yg.length;f++)c=yg[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function Ag(a,b){this.h=a===Bg&&b||""}
Ag.prototype.toString=function(){return this.h};
var Bg={};new Ag(Bg,"");"ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" ").concat(["BUTTON",
"INPUT"]);function Cg(a){var b=document;return typeof a==="string"?b.getElementById(a):a}
function Dg(a){var b=document;a=String(a);b.contentType==="application/xhtml+xml"&&(a=a.toLowerCase());return b.createElement(a)}
function Eg(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function Fg(a){this.F=J(a)}
w(Fg,L);Fg.prototype.ec=function(){return yf(this)};function Gg(a){this.F=J(a)}
w(Gg,L);function Hg(a){this.F=J(a)}
w(Hg,L);function Ig(a,b){uf(a,Gg,1,b)}
;function kf(a){this.F=J(a)}
w(kf,L);var Jg=["platform","platformVersion","architecture","model","uaFullVersion"],Kg=new Hg,Lg=null;function Mg(a,b){b=b===void 0?Jg:b;if(!Lg){var c;a=(c=a.navigator)==null?void 0:c.userAgentData;if(!a||typeof a.getHighEntropyValues!=="function"||a.brands&&typeof a.brands.map!=="function")return Promise.reject(Error("UACH unavailable"));c=(a.brands||[]).map(function(e){var f=new Gg;f=zf(f,1,e.brand);return zf(f,2,e.version)});
Ig(K(Kg,2,re(a.mobile)),c);Lg=a.getHighEntropyValues(b)}var d=new Set(b);return Lg.then(function(e){var f=Kg.clone();d.has("platform")&&zf(f,3,e.platform);d.has("platformVersion")&&zf(f,4,e.platformVersion);d.has("architecture")&&zf(f,5,e.architecture);d.has("model")&&zf(f,6,e.model);d.has("uaFullVersion")&&zf(f,7,e.uaFullVersion);return f}).catch(function(){return Kg.clone()})}
;function Ng(a){this.F=J(a)}
w(Ng,L);function Og(a){this.F=J(a,4)}
w(Og,L);function Pg(a){this.F=J(a,36)}
w(Pg,L);function Qg(a){this.F=J(a,19)}
w(Qg,L);Qg.prototype.Pb=function(a){return Af(this,2,a)};function Rg(a,b){this.Ua=b=b===void 0?!1:b;this.i=this.locale=null;this.h=new Qg;Number.isInteger(a)&&this.h.Pb(a);b||(this.locale=document.documentElement.getAttribute("lang"));Sg(this,new Ng)}
Rg.prototype.Pb=function(a){this.h.Pb(a);return this};
function Sg(a,b){tf(a.h,Ng,1,b);yf(b)||Af(b,1,1);a.Ua||(b=Tg(a),xf(b,5)||zf(b,5,a.locale));a.i&&(b=Tg(a),sf(b,Hg,9)||tf(b,Hg,9,a.i))}
function Ug(a,b){hf(Vg(a))&&(a=Wg(a),Af(a,1,b))}
function Zg(a,b){hf(Vg(a))&&(a=Wg(a),K(a,2,re(b)))}
function Vg(a){return sf(a.h,Ng,1)}
function $g(a){var b=b===void 0?Jg:b;var c=a.Ua?void 0:window;c?Mg(c,b).then(function(d){a.i=d;d=Tg(a);tf(d,Hg,9,a.i);return!0}).catch(function(){return!1}):Promise.resolve(!1)}
function Tg(a){a=Vg(a);var b=sf(a,kf,11);b||(b=new kf,tf(a,kf,11,b));return b}
function Wg(a){a=Tg(a);var b=sf(a,Fg,10);b||(b=new Fg,K(b,2,re(!1)),tf(a,Fg,10,b));return b}
function ah(a,b,c,d,e,f,g){c=c===void 0?0:c;e=e===void 0?null:e;f=f===void 0?0:f;g=g===void 0?0:g;d=d===void 0?0:d;if(hf(Vg(a))){var h=Wg(a);K(h,3,ve(d))}hf(Vg(a))&&(d=Wg(a),K(d,4,ve(f)));hf(Vg(a))&&(f=Wg(a),K(f,5,ve(g)));a=a.h.clone();g=Date.now().toString();a=K(a,4,Ce(g));b=b.slice();b=uf(a,Pg,3,b);e&&(a=new lg,e=K(a,13,ve(e)),a=new mg,e=tf(a,lg,2,e),a=new Og,e=tf(a,mg,1,e),e=Af(e,2,9),tf(b,Og,18,e));c&&K(b,14,Ce(c));return b}
;var bh=function(){if(!C.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{var c=function(){};
C.addEventListener("test",c,b);C.removeEventListener("test",c,b)}catch(d){}return a}();function ch(a){this.h=this.i=this.j=a}
ch.prototype.reset=function(){this.h=this.i=this.j};
ch.prototype.getValue=function(){return this.i};function dh(a){this.F=J(a,8)}
w(dh,L);var eh=Pf(dh);function fh(a){this.F=J(a)}
w(fh,L);var gh=new function(){this.ctor=fh;this.isRepeated=0;this.h=sf;this.defaultValue=void 0};function hh(a){G.call(this);var b=this;this.componentId="";this.h=[];this.Oa="";this.pageId=null;this.Pa=this.ga=-1;this.G=this.experimentIds=null;this.X=this.Y=this.A=this.o=0;this.mb=1;this.timeoutMillis=0;this.ia=!1;this.logSource=a.logSource;this.qb=a.qb||function(){};
this.j=new Rg(a.logSource,a.Ua);this.network=a.network;this.gb=a.gb||null;this.bufferSize=1E3;this.P=a.nf||null;this.sessionIndex=a.sessionIndex||null;this.Hb=a.Hb||!1;this.logger=null;this.withCredentials=!a.dd;this.Ua=a.Ua||!1;this.U=!this.Ua&&!!window&&!!window.navigator&&window.navigator.sendBeacon!==void 0;this.Da=typeof URLSearchParams!=="undefined"&&!!(new URL(ih())).searchParams&&!!(new URL(ih())).searchParams.set;var c=Af(new Ng,1,1);Sg(this.j,c);this.u=new ch(1E4);a=jh(this,a.Xc);this.i=
new kg(this.u.getValue(),a);this.oa=new kg(6E5,a);this.Hb||this.oa.start();this.Ua||(document.addEventListener("visibilitychange",function(){document.visibilityState==="hidden"&&b.Cc()}),document.addEventListener("pagehide",this.Cc.bind(this)))}
w(hh,G);function jh(a,b){return a.Da?b?function(){b().then(function(){a.flush()})}:function(){a.flush()}:function(){}}
r=hh.prototype;r.aa=function(){this.Cc();this.i.stop();this.oa.stop();G.prototype.aa.call(this)};
function kh(a){a.P||(a.P=ih());try{return(new URL(a.P)).toString()}catch(b){return(new URL(a.P,window.location.origin)).toString()}}
r.log=function(a){if(this.Da){a=a.clone();var b=this.mb++;a=K(a,21,Ce(b));this.componentId&&zf(a,26,this.componentId);if(vf(a)==null){var c=Date.now();b=a;c=Number.isFinite(c)?c.toString():"0";K(b,1,Ce(c))}Ee(df(a,15))==null&&K(a,15,Ce((new Date).getTimezoneOffset()*60));this.experimentIds&&(b=a,c=this.experimentIds.clone(),tf(b,jg,16,c));b=this.h.length-this.bufferSize+1;b>0&&(this.h.splice(0,b),this.o+=b);this.h.push(a);this.Hb||this.i.enabled||this.i.start()}};
r.flush=function(a,b){var c=this;if(this.h.length===0)a&&a();else if(this.ia&&this.U)Ug(this.j,3),lh(this);else{var d=Date.now();if(this.Pa>d&&this.ga<d)b&&b("throttled");else{this.network&&(typeof this.network.ec==="function"?Ug(this.j,this.network.ec()):Ug(this.j,0));var e=ah(this.j,this.h,this.o,this.A,this.gb,this.Y,this.X);d={};var f=this.qb();f&&(d.Authorization=f);var g=new URL(kh(this));this.sessionIndex&&(d["X-Goog-AuthUser"]=this.sessionIndex,g.searchParams.set("authuser",this.sessionIndex));
this.pageId&&(Object.defineProperty(d,"X-Goog-PageId",{value:this.pageId}),g.searchParams.set("pageId",this.pageId));if(f&&this.Oa===f)b&&b("stale-auth-token");else{this.h=[];this.i.enabled&&this.i.stop();this.o=0;var h=e.serialize(),k;this.G&&this.G.isSupported(h.length)&&(k=this.G.compress(h));var l={url:g.toString(),body:h,Qd:1,uc:d,requestType:"POST",withCredentials:this.withCredentials,timeoutMillis:this.timeoutMillis},m=function(t){c.u.reset();c.i.setInterval(c.u.getValue());if(t){var v=null;
try{var x=JSON.stringify(JSON.parse(t.replace(")]}'\n","")));v=eh(x)}catch(y){}v&&(t=Number,x="-1",x=x===void 0?"0":x,x=wf(vf(v),x),t=t(x),t>0&&(c.ga=Date.now(),c.Pa=c.ga+t),v=gh.ctor?gh.h(v,gh.ctor,175237375,!0):gh.h(v,175237375,null,!0),v=v===null?void 0:v)&&(v=qc(v,1,-1),v!==-1&&(c.u=new ch(v<1?1:v),c.i.setInterval(c.u.getValue())))}a&&a();c.A=0},n=function(t,v){var x=oc(e,Pg,3);
var y=Ee(df(e,14));y=y==null?void 0:y;var F=c.u;F.h=Math.min(3E5,F.h*2);F.i=Math.min(3E5,F.h+Math.round(.1*(Math.random()-.5)*2*F.h));c.i.setInterval(c.u.getValue());t===401&&f&&(c.Oa=f);y&&(c.o+=y);v===void 0&&(v=c.isRetryable(t));v&&(c.h=x.concat(c.h),c.Hb||c.i.enabled||c.i.start());b&&b("net-send-failed",t);++c.A},p=function(){c.network&&c.network.send(l,m,n)};
k?k.then(function(t){l.uc["Content-Encoding"]="gzip";l.uc["Content-Type"]="application/binary";l.body=t;l.Qd=2;p()},function(){p()}):p()}}}};
r.Cc=function(){Zg(this.j,!0);this.flush();Zg(this.j,!1)};
function lh(a){mh(a,function(b,c){b=new URL(b);b.searchParams.set("format","json");var d=!1;try{d=window.navigator.sendBeacon(b.toString(),c.serialize())}catch(e){}d||(a.U=!1);return d})}
function mh(a,b){if(a.h.length!==0){var c=new URL(kh(a));c.searchParams.delete("format");var d=a.qb();d&&c.searchParams.set("auth",d);c.searchParams.set("authuser",a.sessionIndex||"0");for(d=0;d<10&&a.h.length;++d){var e=a.h.slice(0,32),f=ah(a.j,e,a.o,a.A,a.gb,a.Y,a.X);if(!b(c.toString(),f)){++a.A;break}a.o=0;a.A=0;a.Y=0;a.X=0;a.h=a.h.slice(e.length)}a.i.enabled&&a.i.stop()}}
r.isRetryable=function(a){return 500<=a&&a<600||a===401||a===0};
function ih(){return"https://play.google.com/log?format=json&hasfast=true"}
;function nh(){this.Kd=typeof AbortController!=="undefined"}
nh.prototype.send=function(a,b,c){var d=this,e,f,g,h,k,l,m,n,p,t;return A(function(v){switch(v.h){case 1:return f=(e=d.Kd?new AbortController:void 0)?setTimeout(function(){e.abort()},a.timeoutMillis):void 0,za(v,2,3),g=Object.assign({},{method:a.requestType,
headers:Object.assign({},a.uc)},a.body&&{body:a.body},a.withCredentials&&{credentials:"include"},{signal:a.timeoutMillis&&e?e.signal:null}),v.yield(fetch(a.url,g),5);case 5:h=v.i;if(h.status!==200){(k=c)==null||k(h.status);v.D(3);break}if((l=b)==null){v.D(7);break}return v.yield(h.text(),8);case 8:l(v.i);case 7:case 3:v.P=[v.j];v.o=0;v.u=0;clearTimeout(f);Ba(v);break;case 2:m=Aa(v);switch((n=m)==null?void 0:n.name){case "AbortError":(p=c)==null||p(408);break;default:(t=c)==null||t(400)}v.D(3)}})};
nh.prototype.ec=function(){return 4};function oh(a,b){G.call(this);this.logSource=a;this.sessionIndex=b;this.Ra="https://play.google.com/log?format=json&hasfast=true";this.i=null;this.o=!1;this.network=null;this.componentId="";this.h=this.gb=null;this.j=!1;this.pageId=null}
w(oh,G);function ph(a,b){a.i=b;return a}
function qh(a,b){a.network=b;return a}
function rh(a,b){a.h=b}
oh.prototype.dd=function(){this.u=!0;return this};
function sh(a){a.network||(a.network=new nh);var b=new hh({logSource:a.logSource,qb:a.qb?a.qb:hg,sessionIndex:a.sessionIndex,nf:a.Ra,Ua:a.o,Hb:!1,dd:a.u,Xc:a.Xc,network:a.network});vc(a,b);if(a.i){var c=a.i,d=Tg(b.j);zf(d,7,c)}Math.random()<.5&&(b.G=new ig);a.componentId&&(b.componentId=a.componentId);a.gb&&(b.gb=a.gb);a.pageId&&(b.pageId=a.pageId);a.h&&((d=a.h)?(b.experimentIds||(b.experimentIds=new jg),c=b.experimentIds,d=d.serialize(),zf(c,4,d)):b.experimentIds&&K(b.experimentIds,4));a.j&&(b.ia=
b.U);$g(b.j);a.network.Pb&&a.network.Pb(a.logSource);a.network.Ye&&a.network.Ye(b);return b}
;function th(a,b,c,d,e,f,g){a=a===void 0?-1:a;b=b===void 0?"":b;c=c===void 0?"":c;d=d===void 0?!1:d;e=e===void 0?"":e;G.call(this);this.logSource=a;this.componentId=b;f?b=f:(a=new oh(a,"0"),a.componentId=b,vc(this,a),c!==""&&(a.Ra=c),d&&(a.o=!0),e&&ph(a,e),g&&qh(a,g),b=sh(a));this.h=b}
w(th,G);
th.prototype.flush=function(a){var b=a||[];if(b.length){a=new Yf;for(var c=[],d=0;d<b.length;d++){var e=b[d],f=new Xf;f=zf(f,1,e.i);var g=uh(e);f=mf(f,g,Fe);g=[];var h=[];for(var k=z(e.h.keys()),l=k.next();!l.done;l=k.next())h.push(l.value.split(","));for(k=0;k<h.length;k++){l=h[k];var m=e.o;for(var n=e.Dc(l)||[],p=[],t=0;t<n.length;t++){var v=n[t],x=v&&v.h;v=new Uf;switch(m){case 3:x=Number(x);Number.isFinite(x)&&pf(v,1,Vf,Ce(x));break;case 2:x=Number(x);if(x!=null&&typeof x!=="number")throw Error("Value of float/double field must be a number, found "+typeof x+
": "+x);pf(v,2,Vf,x)}p.push(v)}m=p;for(n=0;n<m.length;n++){p=m[n];t=new Wf;p=tf(t,Uf,2,p);t=l;v=[];x=vh(e);for(var y=0;y<x.length;y++){var F=x[y],I=t[y],V=new Sf;switch(F){case 3:pf(V,1,Tf,Ge(String(I)));break;case 2:F=Number(I);Number.isFinite(F)&&pf(V,2,Tf,ve(F));break;case 1:pf(V,3,Tf,re(I==="true"))}v.push(V)}uf(p,Sf,1,v);g.push(p)}}uf(f,Wf,4,g);c.push(f);e.clear()}uf(a,Xf,1,c);b=this.h;if(a instanceof Pg)b.log(a);else try{var ia=new Pg,Ia=a.serialize();var cb=zf(ia,8,Ia);b.log(cb)}catch(aa){}this.h.flush()}};function wh(a){this.h=a}
;function xh(a,b,c){this.i=a;this.o=b;this.fields=c||[];this.h=new Map}
function vh(a){return a.fields.map(function(b){return b.fieldType})}
function uh(a){return a.fields.map(function(b){return b.fieldName})}
r=xh.prototype;r.Ld=function(a){var b=B.apply(1,arguments),c=this.Dc(b);c?c.push(new wh(a)):this.wd(a,b)};
r.wd=function(a){var b=this.Wc(B.apply(1,arguments));this.h.set(b,[new wh(a)])};
r.Dc=function(){var a=this.Wc(B.apply(0,arguments));return this.h.has(a)?this.h.get(a):void 0};
r.he=function(){var a=this.Dc(B.apply(0,arguments));return a&&a.length?a[0]:void 0};
r.clear=function(){this.h.clear()};
r.Wc=function(){var a=B.apply(0,arguments);return a?a.join(","):"key"};function yh(a,b){xh.call(this,a,3,b)}
w(yh,xh);yh.prototype.j=function(a){var b=B.apply(1,arguments),c=0,d=this.he(b);d&&(c=d.h);this.wd(c+a,b)};function zh(a,b){xh.call(this,a,2,b)}
w(zh,xh);zh.prototype.record=function(a){this.Ld(a,B.apply(1,arguments))};function Ah(a,b){this.type=a;this.h=this.target=b;this.defaultPrevented=this.j=!1}
Ah.prototype.stopPropagation=function(){this.j=!0};
Ah.prototype.preventDefault=function(){this.defaultPrevented=!0};function Bh(a,b){Ah.call(this,a?a.type:"");this.relatedTarget=this.h=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
Za(Bh,Ah);
Bh.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.h=b;b=a.relatedTarget;b||(c=="mouseover"?b=a.fromElement:c=="mouseout"&&(b=a.toElement));this.relatedTarget=b;d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==
void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType=a.pointerType;this.state=a.state;this.i=a;a.defaultPrevented&&Bh.za.preventDefault.call(this)};
Bh.prototype.stopPropagation=function(){Bh.za.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
Bh.prototype.preventDefault=function(){Bh.za.preventDefault.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ch="closure_listenable_"+(Math.random()*1E6|0);var Dh=0;function Eh(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.fc=e;this.key=++Dh;this.Ob=this.Xb=!1}
function Fh(a){a.Ob=!0;a.listener=null;a.proxy=null;a.src=null;a.fc=null}
;function Gh(a){this.src=a;this.listeners={};this.h=0}
Gh.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.h++);var g=Hh(a,b,d,e);g>-1?(b=a[g],c||(b.Xb=!1)):(b=new Eh(b,this.src,f,!!d,e),b.Xb=c,a.push(b));return b};
Gh.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=Hh(e,b,c,d);return b>-1?(Fh(e[b]),Array.prototype.splice.call(e,b,1),e.length==0&&(delete this.listeners[a],this.h--),!0):!1};
function Ih(a,b){var c=b.type;c in a.listeners&&Sb(a.listeners[c],b)&&(Fh(b),a.listeners[c].length==0&&(delete a.listeners[c],a.h--))}
function Hh(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Ob&&f.listener==b&&f.capture==!!c&&f.fc==d)return e}return-1}
;var Jh="closure_lm_"+(Math.random()*1E6|0),Kh={},Lh=0;function Mh(a,b,c,d,e){if(d&&d.once)Nh(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Mh(a,b[f],c,d,e);else c=Oh(c),a&&a[Ch]?a.listen(b,c,Qa(d)?!!d.capture:!!d,e):Ph(a,b,c,!1,d,e)}
function Ph(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=Qa(e)?!!e.capture:!!e,h=Qh(a);h||(a[Jh]=h=new Gh(a));c=h.add(b,c,d,g,f);if(!c.proxy){d=Rh();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)bh||(e=g),e===void 0&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(Sh(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");Lh++}}
function Rh(){function a(c){return b.call(a.src,a.listener,c)}
var b=Th;return a}
function Nh(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Nh(a,b[f],c,d,e);else c=Oh(c),a&&a[Ch]?a.h.add(String(b),c,!0,Qa(d)?!!d.capture:!!d,e):Ph(a,b,c,!0,d,e)}
function Uh(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Uh(a,b[f],c,d,e);else(d=Qa(d)?!!d.capture:!!d,c=Oh(c),a&&a[Ch])?a.h.remove(String(b),c,d,e):a&&(a=Qh(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=Hh(b,c,d,e)),(c=a>-1?b[a]:null)&&Vh(c))}
function Vh(a){if(typeof a!=="number"&&a&&!a.Ob){var b=a.src;if(b&&b[Ch])Ih(b.h,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(Sh(c),d):b.addListener&&b.removeListener&&b.removeListener(d);Lh--;(c=Qh(b))?(Ih(c,a),c.h==0&&(c.src=null,b[Jh]=null)):Fh(a)}}}
function Sh(a){return a in Kh?Kh[a]:Kh[a]="on"+a}
function Th(a,b){if(a.Ob)a=!0;else{b=new Bh(b,this);var c=a.listener,d=a.fc||a.src;a.Xb&&Vh(a);a=c.call(d,b)}return a}
function Qh(a){a=a[Jh];return a instanceof Gh?a:null}
var Wh="__closure_events_fn_"+(Math.random()*1E9>>>0);function Oh(a){if(typeof a==="function")return a;a[Wh]||(a[Wh]=function(b){return a.handleEvent(b)});
return a[Wh]}
;function Xh(){G.call(this);this.h=new Gh(this);this.oa=this;this.Y=null}
Za(Xh,G);Xh.prototype[Ch]=!0;r=Xh.prototype;r.addEventListener=function(a,b,c,d){Mh(this,a,b,c,d)};
r.removeEventListener=function(a,b,c,d){Uh(this,a,b,c,d)};
function Yh(a,b){var c=a.Y;if(c){var d=[];for(var e=1;c;c=c.Y)d.push(c),++e}a=a.oa;c=b.type||b;typeof b==="string"?b=new Ah(b,a):b instanceof Ah?b.target=b.target||a:(e=b,b=new Ah(c,a),zg(b,e));e=!0;var f;if(d)for(f=d.length-1;!b.j&&f>=0;f--){var g=b.h=d[f];e=Zh(g,c,!0,b)&&e}b.j||(g=b.h=a,e=Zh(g,c,!0,b)&&e,b.j||(e=Zh(g,c,!1,b)&&e));if(d)for(f=0;!b.j&&f<d.length;f++)g=b.h=d[f],e=Zh(g,c,!1,b)&&e}
r.aa=function(){Xh.za.aa.call(this);this.removeAllListeners();this.Y=null};
r.listen=function(a,b,c,d){return this.h.add(String(a),b,!1,c,d)};
r.removeAllListeners=function(a){if(this.h){var b=this.h;a=a&&a.toString();var c=0,d;for(d in b.listeners)if(!a||d==a){for(var e=b.listeners[d],f=0;f<e.length;f++)++c,Fh(e[f]);delete b.listeners[d];b.h--}b=c}else b=0;return b};
function Zh(a,b,c,d){b=a.h.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Ob&&g.capture==c){var h=g.listener,k=g.fc||g.src;g.Xb&&Ih(a.h,g);e=h.call(k,d)!==!1&&e}}return e&&!d.defaultPrevented}
;var $h=typeof AsyncContext!=="undefined"&&typeof AsyncContext.Snapshot==="function"?function(a){return a&&AsyncContext.Snapshot.wrap(a)}:function(a){return a};function ai(a,b){this.j=a;this.o=b;this.i=0;this.h=null}
ai.prototype.get=function(){if(this.i>0){this.i--;var a=this.h;this.h=a.next;a.next=null}else a=this.j();return a};
function bi(a,b){a.o(b);a.i<100&&(a.i++,b.next=a.h,a.h=b)}
;function ci(){this.i=this.h=null}
ci.prototype.add=function(a,b){var c=di.get();c.set(a,b);this.i?this.i.next=c:this.h=c;this.i=c};
ci.prototype.remove=function(){var a=null;this.h&&(a=this.h,this.h=this.h.next,this.h||(this.i=null),a.next=null);return a};
var di=new ai(function(){return new ei},function(a){return a.reset()});
function ei(){this.next=this.scope=this.h=null}
ei.prototype.set=function(a,b){this.h=a;this.scope=b;this.next=null};
ei.prototype.reset=function(){this.next=this.scope=this.h=null};var fi,gi=!1,hi=new ci;function ii(a,b){fi||ji();gi||(fi(),gi=!0);hi.add(a,b)}
function ji(){var a=Promise.resolve(void 0);fi=function(){a.then(ki)}}
function ki(){for(var a;a=hi.remove();){try{a.h.call(a.scope)}catch(b){Ic(b)}bi(di,a)}gi=!1}
;function li(){}
function mi(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function ni(a){this.h=0;this.A=void 0;this.o=this.i=this.j=null;this.u=this.H=!1;if(a!=li)try{var b=this;a.call(void 0,function(c){oi(b,2,c)},function(c){oi(b,3,c)})}catch(c){oi(this,3,c)}}
function pi(){this.next=this.context=this.h=this.i=this.child=null;this.j=!1}
pi.prototype.reset=function(){this.context=this.h=this.i=this.child=null;this.j=!1};
var qi=new ai(function(){return new pi},function(a){a.reset()});
function ri(a,b,c){var d=qi.get();d.i=a;d.h=b;d.context=c;return d}
function si(a){return new ni(function(b,c){c(a)})}
ni.prototype.then=function(a,b,c){return ti(this,$h(typeof a==="function"?a:null),$h(typeof b==="function"?b:null),c)};
ni.prototype.$goog_Thenable=!0;r=ni.prototype;r.wc=function(a,b){return ti(this,null,$h(a),b)};
r.catch=ni.prototype.wc;r.cancel=function(a){if(this.h==0){var b=new ui(a);ii(function(){vi(this,b)},this)}};
function vi(a,b){if(a.h==0)if(a.j){var c=a.j;if(c.i){for(var d=0,e=null,f=null,g=c.i;g&&(g.j||(d++,g.child==a&&(e=g),!(e&&d>1)));g=g.next)e||(f=g);e&&(c.h==0&&d==1?vi(c,b):(f?(d=f,d.next==c.o&&(c.o=d),d.next=d.next.next):wi(c),xi(c,e,3,b)))}a.j=null}else oi(a,3,b)}
function yi(a,b){a.i||a.h!=2&&a.h!=3||zi(a);a.o?a.o.next=b:a.i=b;a.o=b}
function ti(a,b,c,d){var e=ri(null,null,null);e.child=new ni(function(f,g){e.i=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.h=c?function(h){try{var k=c.call(d,h);k===void 0&&h instanceof ui?g(h):f(k)}catch(l){g(l)}}:g});
e.child.j=a;yi(a,e);return e.child}
r.lf=function(a){this.h=0;oi(this,2,a)};
r.mf=function(a){this.h=0;oi(this,3,a)};
function oi(a,b,c){if(a.h==0){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.h=1;a:{var d=c,e=a.lf,f=a.mf;if(d instanceof ni){yi(d,ri(e||li,f||null,a));var g=!0}else{if(d)try{var h=!!d.$goog_Thenable}catch(l){h=!1}else h=!1;if(h)d.then(e,f,a),g=!0;else{if(Qa(d))try{var k=d.then;if(typeof k==="function"){Ai(d,k,e,f,a);g=!0;break a}}catch(l){f.call(a,l);g=!0;break a}g=!1}}}g||(a.A=c,a.h=b,a.j=null,zi(a),b!=3||c instanceof ui||Bi(a,c))}}
function Ai(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function zi(a){a.H||(a.H=!0,ii(a.be,a))}
function wi(a){var b=null;a.i&&(b=a.i,a.i=b.next,b.next=null);a.i||(a.o=null);return b}
r.be=function(){for(var a;a=wi(this);)xi(this,a,this.h,this.A);this.H=!1};
function xi(a,b,c,d){if(c==3&&b.h&&!b.j)for(;a&&a.u;a=a.j)a.u=!1;if(b.child)b.child.j=null,Ci(b,c,d);else try{b.j?b.i.call(b.context):Ci(b,c,d)}catch(e){Di.call(null,e)}bi(qi,b)}
function Ci(a,b,c){b==2?a.i.call(a.context,c):a.h&&a.h.call(a.context,c)}
function Bi(a,b){a.u=!0;ii(function(){a.u&&Di.call(null,b)})}
var Di=Ic;function ui(a){$a.call(this,a)}
Za(ui,$a);ui.prototype.name="cancel";function Ei(a,b){Xh.call(this);this.j=a||1;this.i=b||C;this.o=Wa(this.hf,this);this.u=Ya()}
Za(Ei,Xh);r=Ei.prototype;r.enabled=!1;r.Ca=null;r.setInterval=function(a){this.j=a;this.Ca&&this.enabled?(this.stop(),this.start()):this.Ca&&this.stop()};
r.hf=function(){if(this.enabled){var a=Ya()-this.u;a>0&&a<this.j*.8?this.Ca=this.i.setTimeout(this.o,this.j-a):(this.Ca&&(this.i.clearTimeout(this.Ca),this.Ca=null),Yh(this,"tick"),this.enabled&&(this.stop(),this.start()))}};
r.start=function(){this.enabled=!0;this.Ca||(this.Ca=this.i.setTimeout(this.o,this.j),this.u=Ya())};
r.stop=function(){this.enabled=!1;this.Ca&&(this.i.clearTimeout(this.Ca),this.Ca=null)};
r.aa=function(){Ei.za.aa.call(this);this.stop();delete this.i};function Fi(a){G.call(this);this.G=a;this.j=0;this.o=100;this.u=!1;this.i=new Map;this.A=new Set;this.flushInterval=3E4;this.h=new Ei(this.flushInterval);this.h.listen("tick",this.Rb,!1,this);vc(this,this.h)}
w(Fi,G);r=Fi.prototype;r.sendIsolatedPayload=function(a){this.u=a;this.o=1};
function Gi(a){a.h.enabled||a.h.start();a.j++;a.j>=a.o&&a.Rb()}
r.Rb=function(){var a=this.i.values();a=[].concat(ra(a)).filter(function(b){return b.h.size});
a.length&&this.G.flush(a,this.u);Hi(a);this.j=0;this.h.enabled&&this.h.stop()};
r.Eb=function(a){var b=B.apply(1,arguments);this.i.has(a)||this.i.set(a,new yh(a,b))};
r.zc=function(a){var b=B.apply(1,arguments);this.i.has(a)||this.i.set(a,new zh(a,b))};
function Ii(a,b){return a.A.has(b)?void 0:a.i.get(b)}
r.Cb=function(a){this.Jd(a,1,B.apply(1,arguments))};
r.Jd=function(a,b){var c=B.apply(2,arguments),d=Ii(this,a);d&&d instanceof yh&&(d.j(b,c),Gi(this))};
r.record=function(a,b){var c=B.apply(2,arguments),d=Ii(this,a);d&&d instanceof zh&&(d.record(b,c),Gi(this))};
function Hi(a){for(var b=0;b<a.length;b++)a[b].clear()}
;function Ji(){}
Ji.prototype.serialize=function(a){var b=[];Ki(this,a,b);return b.join("")};
function Ki(a,b,c){if(b==null)c.push("null");else{if(typeof b=="object"){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Ki(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],typeof f!="function"&&(c.push(e),Li(d,c),c.push(":"),Ki(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Li(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Mi={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\u000b"},Ni=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function Li(a,b){b.push('"',a.replace(Ni,function(c){var d=Mi[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).slice(1),Mi[c]=d);return d}),'"')}
;function Oi(){Xh.call(this);this.headers=new Map;this.i=!1;this.K=null;this.o=this.X="";this.j=this.U=this.A=this.P=!1;this.G=0;this.u=null;this.ia="";this.ga=!1}
Za(Oi,Xh);var Pi=/^https?$/i,Qi=["POST","PUT"],Ri=[];function Si(a,b,c,d,e,f,g){var h=new Oi;Ri.push(h);b&&h.listen("complete",b);h.h.add("ready",h.Sd,!0,void 0,void 0);f&&(h.G=Math.max(0,f));g&&(h.ga=g);h.send(a,c,d,e)}
r=Oi.prototype;r.Sd=function(){this.dispose();Sb(Ri,this)};
r.send=function(a,b,c,d){if(this.K)throw Error("[goog.net.XhrIo] Object is active with another request="+this.X+"; newUri="+a);b=b?b.toUpperCase():"GET";this.X=a;this.o="";this.P=!1;this.i=!0;this.K=new XMLHttpRequest;this.K.onreadystatechange=$h(Wa(this.pd,this));try{this.getStatus(),this.U=!0,this.K.open(b,String(a),!0),this.U=!1}catch(g){this.getStatus();Ti(this,g);return}a=c||"";c=new Map(this.headers);if(d)if(Object.getPrototypeOf(d)===Object.prototype)for(var e in d)c.set(e,d[e]);else if(typeof d.keys===
"function"&&typeof d.get==="function"){e=z(d.keys());for(var f=e.next();!f.done;f=e.next())f=f.value,c.set(f,d.get(f))}else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(function(g){return"content-type"==g.toLowerCase()});
e=C.FormData&&a instanceof C.FormData;!(Mb(Qi,b)>=0)||d||e||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");b=z(c);for(d=b.next();!d.done;d=b.next())c=z(d.value),d=c.next().value,c=c.next().value,this.K.setRequestHeader(d,c);this.ia&&(this.K.responseType=this.ia);"withCredentials"in this.K&&this.K.withCredentials!==this.ga&&(this.K.withCredentials=this.ga);try{this.u&&(clearTimeout(this.u),this.u=null),this.G>0&&(this.getStatus(),this.u=setTimeout(this.kf.bind(this),this.G)),
this.getStatus(),this.A=!0,this.K.send(a),this.A=!1}catch(g){this.getStatus(),Ti(this,g)}};
r.kf=function(){typeof Na!="undefined"&&this.K&&(this.o="Timed out after "+this.G+"ms, aborting",this.getStatus(),Yh(this,"timeout"),this.abort(8))};
function Ti(a,b){a.i=!1;a.K&&(a.j=!0,a.K.abort(),a.j=!1);a.o=b;Ui(a);Vi(a)}
function Ui(a){a.P||(a.P=!0,Yh(a,"complete"),Yh(a,"error"))}
r.abort=function(){this.K&&this.i&&(this.getStatus(),this.i=!1,this.j=!0,this.K.abort(),this.j=!1,Yh(this,"complete"),Yh(this,"abort"),Vi(this))};
r.aa=function(){this.K&&(this.i&&(this.i=!1,this.j=!0,this.K.abort(),this.j=!1),Vi(this,!0));Oi.za.aa.call(this)};
r.pd=function(){this.da||(this.U||this.A||this.j?Wi(this):this.Ce())};
r.Ce=function(){Wi(this)};
function Wi(a){if(a.i&&typeof Na!="undefined")if(a.A&&(a.K?a.K.readyState:0)==4)setTimeout(a.pd.bind(a),0);else if(Yh(a,"readystatechange"),a.isComplete()){a.getStatus();a.i=!1;try{if(Xi(a))Yh(a,"complete"),Yh(a,"success");else{try{var b=(a.K?a.K.readyState:0)>2?a.K.statusText:""}catch(c){b=""}a.o=b+" ["+a.getStatus()+"]";Ui(a)}}finally{Vi(a)}}}
function Vi(a,b){if(a.K){a.u&&(clearTimeout(a.u),a.u=null);var c=a.K;a.K=null;b||Yh(a,"ready");try{c.onreadystatechange=null}catch(d){}}}
r.isActive=function(){return!!this.K};
r.isComplete=function(){return(this.K?this.K.readyState:0)==4};
function Xi(a){var b=a.getStatus();a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}if(!c){if(b=b===0)a=bc(1,String(a.X)),!a&&C.self&&C.self.location&&(a=C.self.location.protocol.slice(0,-1)),b=!Pi.test(a?a.toLowerCase():"");c=b}return c}
r.getStatus=function(){try{return(this.K?this.K.readyState:0)>2?this.K.status:-1}catch(a){return-1}};
r.getLastError=function(){return typeof this.o==="string"?this.o:String(this.o)};function Yi(){}
Yi.prototype.send=function(a,b,c){b=b===void 0?function(){}:b;
c=c===void 0?function(){}:c;
Si(a.url,function(d){d=d.target;if(Xi(d)){try{var e=d.K?d.K.responseText:""}catch(f){e=""}b(e)}else c(d.getStatus())},a.requestType,a.body,a.uc,a.timeoutMillis,a.withCredentials)};
Yi.prototype.ec=function(){return 1};function Zi(a,b){this.logger=a;this.event=b;this.startTime=$i()}
Zi.prototype.done=function(){this.logger.Lb(this.event,$i()-this.startTime)};
function aj(){xc.apply(this,arguments)}
w(aj,xc);function bj(a,b){var c=$i();b=b();a.Lb("n",$i()-c);return b}
function cj(){aj.apply(this,arguments)}
w(cj,aj);r=cj.prototype;r.Hc=function(){};
r.vb=function(){};
r.Lb=function(){};
r.Ea=function(){};
r.sc=function(){};
r.Bd=function(){};
function dj(a){return{ef:new Ac(a),errorCount:new Ec(a),eventCount:new Cc(a),ae:new Dc(a),Nh:new Bc(a),Ph:new Fc(a),jh:new Gc(a),Oh:new Hc(a)}}
function ej(a,b,c,d,e){a=qh(ph(new oh(1828,"0"),a),new Yi);b.length&&rh(a,Rf(new Qf,b));e!==void 0&&(a.Ra=e);d&&(a.j=!0);var f=new th(1828,"","",!1,"",sh(a));vc(f,a);var g=new Fi({flush:function(h){try{f.flush(h)}catch(k){c(k)}}});
g.addOnDisposeCallback(function(){setTimeout(function(){try{g.Rb()}finally{f.dispose()}})});
g.o=1E5;g.flushInterval=3E4;g.h.setInterval(3E4);return g}
function fj(a,b){G.call(this);var c=this;this.callback=a;this.i=b;this.h=-b;this.addOnDisposeCallback(function(){return void clearTimeout(c.timer)})}
w(fj,G);function gj(a){if(a.timer===void 0){var b=Math.max(0,a.h+a.i-$i());a.timer=setTimeout(function(){try{a.callback()}finally{a.h=$i(),a.timer=void 0}},b)}}
function hj(a,b,c){aj.call(this);this.metrics=a;this.Fa=b;this.jb=c}
w(hj,aj);hj.prototype.Hc=function(a){this.metrics.ef.record(a,this.Fa)};
hj.prototype.vb=function(a){this.metrics.eventCount.h(a,this.Fa)};
hj.prototype.Lb=function(a,b){this.metrics.ae.record(b,a,this.jb,this.Fa)};
hj.prototype.Ea=function(a){this.metrics.errorCount.h(a,this.jb,this.Fa)};
function ij(a,b){b=b===void 0?[]:b;var c={Fa:a.Fa||"_",jb:a.jb||"",dc:a.dc||[],jc:a.jc|0,Ra:a.Ra,kc:a.kc||function(){},
Bc:!!a.Bc,Bb:a.Bb||function(e,f){return ej(e,f,c.kc,c.Bc,c.Ra)}};
b=c.Bb("41",c.dc.concat(b));hj.call(this,dj(b),c.Fa,c.jb);var d=this;this.options=c;this.service=b;this.i=!a.Bb;this.h=new fj(function(){return void d.service.Rb()},c.jc);
this.addOnDisposeCallback(function(){d.h.dispose();d.i&&d.service.dispose()})}
w(ij,hj);ij.prototype.Bd=function(a){var b=this;this.h.dispose();this.i&&this.service.dispose();this.service=this.options.Bb("41",this.options.dc.concat(a));this.h=new fj(function(){return void b.service.Rb()},this.options.jc);
this.metrics=dj(this.service)};
ij.prototype.sc=function(){gj(this.h)};
function $i(){var a,b,c;return(c=(a=globalThis.performance)==null?void 0:(b=a.now)==null?void 0:b.call(a))!=null?c:Date.now()}
;function jj(a){this.F=J(a,0,"bfkj")}
w(jj,L);var kj=function(a){return Ud(function(b){return b instanceof a&&!(Gd(b.F)&2)})}(jj);function lj(a){this.F=J(a)}
w(lj,L);function pc(a){this.F=J(a)}
w(pc,L);function mj(a){this.F=J(a)}
w(mj,L);var nj=Pf(mj);function oj(){var a=this;this.promise=new Promise(function(b,c){a.resolve=b;a.reject=c})}
;function pj(a,b,c){if(a.disable)return new cj;var d=b&&sc(sf(b,lj,7))?nc(b):[];if(c)return c.Bd(d),c.share();a={Fa:a.Fa,jb:a.jb,dc:a.ph,jc:a.zh,Bc:sc(b==null?void 0:sf(b,lj,10)),Ra:a.Ra,kc:a.kc,Bb:a.Bb};d=d===void 0?[]:d;return new ij(a,d)}
function qj(a){function b(v,x,y,F){Promise.resolve().then(function(){k.done();h.sc();h.dispose();g.resolve({Nd:v,bf:x,Bh:y,lh:F})})}
function c(v,x,y,F){if(!d.logger.da){var I="k";x?I="h":y&&(I="u");I!=="k"?F!==0&&(d.logger.vb(I),d.logger.Lb(I,v)):d.i<=0?(d.logger.vb(I),d.logger.Lb(I,v),d.i=Math.floor(Math.random()*200)):d.i--}}
G.call(this);var d=this;this.i=Math.floor(Math.random()*200);this.h=new mj;if("challenge"in a&&kj(a.challenge)){var e=xf(a.challenge,4);var f=xf(a.challenge,5);xf(a.challenge,7)&&(this.h=nj(xf(a.challenge,7)))}else e=a.program,f=a.ke;this.addOnDisposeCallback(function(){var v,x,y;return A(function(F){if(F.h==1)return F.yield(d.j,2);v=F.i;x=v.bf;(y=x)==null||y();F.h=0})});
this.logger=pj(a.Ae||{},this.h,a.mh);vc(this,this.logger);var g=new oj;this.j=g.promise;this.logger.vb("t");var h=this.logger.share(),k=new Zi(h,"t");if(!C[f])throw this.logger.Ea(25),Error("EGOU");if(!C[f].a)throw this.logger.Ea(26),Error("ELIU");try{var l=C[f].a;f=[];var m=[];if(sc(sf(this.h,lj,7))){for(var n=nc(this.h),p=0;p<n.length;p++)f.push(n[p]),m.push(1);var t=rc(this.h);for(n=0;n<t.length;n++)f.push(t[n]),m.push(2)}this.o=z(l(e,b,!0,a.Mh,c,[f,m],xf(this.h,5))).next().value;this.af=g.promise.then(function(){})}catch(v){throw this.logger.Ea(28),
v;
}}
w(qj,G);qj.prototype.snapshot=function(a){if(this.da)throw Error("Already disposed");this.logger.vb("n");var b=this.logger.share();return this.j.then(function(c){var d=c.Nd;return new Promise(function(e){var f=new Zi(b,"n");d(function(g){f.done();b.Hc(g.length);b.sc();b.dispose();e(g)},[a.cd,
a.cf,a.qf,a.df])})})};
qj.prototype.yd=function(a){var b=this;if(this.da)throw Error("Already disposed");this.logger.vb("n");var c=bj(this.logger,function(){return b.o([a.cd,a.cf,a.qf,a.df])});
this.logger.Hc(c.length);this.logger.sc();return c};var rj=window;function sj(a){var b=tj;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a(b[c],c,b)}
function uj(){var a=[];sj(function(b){a.push(b)});
return a}
var tj={rf:"allow-forms",sf:"allow-modals",tf:"allow-orientation-lock",uf:"allow-pointer-lock",vf:"allow-popups",wf:"allow-popups-to-escape-sandbox",xf:"allow-presentation",yf:"allow-same-origin",zf:"allow-scripts",Af:"allow-top-navigation",Bf:"allow-top-navigation-by-user-activation"},vj=mi(function(){return uj()});
function wj(){var a=xj(),b={};Nb(vj(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
function xj(){var a=a===void 0?document:a;return a.createElement("iframe")}
;function yj(a){typeof a=="number"&&(a=Math.round(a)+"px");return a}
;var zj=(new Date).getTime();function Aj(a){Xh.call(this);var b=this;this.A=this.j=0;this.Ba=a!=null?a:{pa:function(e,f){return setTimeout(e,f)},
qa:function(e){clearTimeout(e)}};
var c,d;this.i=(d=(c=window.navigator)==null?void 0:c.onLine)!=null?d:!0;this.o=function(){return A(function(e){return e.yield(Bj(b),0)})};
window.addEventListener("offline",this.o);window.addEventListener("online",this.o);this.A||Cj(this)}
w(Aj,Xh);function Dj(){var a=Ej;Aj.h||(Aj.h=new Aj(a));return Aj.h}
Aj.prototype.dispose=function(){window.removeEventListener("offline",this.o);window.removeEventListener("online",this.o);this.Ba.qa(this.A);delete Aj.h};
Aj.prototype.va=function(){return this.i};
function Cj(a){a.A=a.Ba.pa(function(){var b;return A(function(c){if(c.h==1)return a.i?((b=window.navigator)==null?0:b.onLine)?c.D(3):c.yield(Bj(a),3):c.yield(Bj(a),3);Cj(a);c.h=0})},3E4)}
function Bj(a,b){return a.u?a.u:a.u=new Promise(function(c){var d,e,f,g;return A(function(h){switch(h.h){case 1:return d=window.AbortController?new window.AbortController:void 0,f=(e=d)==null?void 0:e.signal,g=!1,za(h,2,3),d&&(a.j=a.Ba.pa(function(){d.abort()},b||2E4)),h.yield(fetch("/generate_204",{method:"HEAD",
signal:f}),5);case 5:g=!0;case 3:h.P=[h.j];h.o=0;h.u=0;a.u=void 0;a.j&&(a.Ba.qa(a.j),a.j=0);g!==a.i&&(a.i=g,a.i?Yh(a,"networkstatus-online"):Yh(a,"networkstatus-offline"));c(g);Ba(h);break;case 2:Aa(h),g=!1,h.D(3)}})})}
;function Fj(){this.data=[];this.h=-1}
Fj.prototype.set=function(a,b){b=b===void 0?!0:b;0<=a&&a<52&&Number.isInteger(a)&&this.data[a]!==b&&(this.data[a]=b,this.h=-1)};
Fj.prototype.get=function(a){return!!this.data[a]};
function Gj(a){a.h===-1&&(a.h=a.data.reduce(function(b,c,d){return b+(c?Math.pow(2,d):0)},0));
return a.h}
;function Hj(){this.blockSize=-1}
;function Ij(){this.blockSize=-1;this.blockSize=64;this.h=[];this.u=[];this.H=[];this.j=[];this.j[0]=128;for(var a=1;a<this.blockSize;++a)this.j[a]=0;this.o=this.i=0;this.reset()}
Za(Ij,Hj);Ij.prototype.reset=function(){this.h[0]=1732584193;this.h[1]=4023233417;this.h[2]=2562383102;this.h[3]=271733878;this.h[4]=3285377520;this.o=this.i=0};
function Jj(a,b,c){c||(c=0);var d=a.H;if(typeof b==="string")for(var e=0;e<16;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;e<16;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(b=16;b<80;b++)c=d[b-3]^d[b-8]^d[b-14]^d[b-16],d[b]=(c<<1|c>>>31)&4294967295;b=a.h[0];c=a.h[1];e=a.h[2];for(var f=a.h[3],g=a.h[4],h,k,l=0;l<80;l++)l<40?l<20?(h=f^c&(e^f),k=1518500249):(h=c^e^f,k=1859775393):l<60?(h=c&e|f&(c|e),k=2400959708):(h=c^e^f,k=3395469782),
h=(b<<5|b>>>27)+h+g+k+d[l]&4294967295,g=f,f=e,e=(c<<30|c>>>2)&4294967295,c=b,b=h;a.h[0]=a.h[0]+b&4294967295;a.h[1]=a.h[1]+c&4294967295;a.h[2]=a.h[2]+e&4294967295;a.h[3]=a.h[3]+f&4294967295;a.h[4]=a.h[4]+g&4294967295}
Ij.prototype.update=function(a,b){if(a!=null){b===void 0&&(b=a.length);for(var c=b-this.blockSize,d=0,e=this.u,f=this.i;d<b;){if(f==0)for(;d<=c;)Jj(this,a,d),d+=this.blockSize;if(typeof a==="string")for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.blockSize){Jj(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.blockSize){Jj(this,e);f=0;break}}this.i=f;this.o+=b}};
Ij.prototype.digest=function(){var a=[],b=this.o*8;this.i<56?this.update(this.j,56-this.i):this.update(this.j,this.blockSize-(this.i-56));for(var c=this.blockSize-1;c>=56;c--)this.u[c]=b&255,b/=256;Jj(this,this.u);for(c=b=0;c<5;c++)for(var d=24;d>=0;d-=8)a[b]=this.h[c]>>d&255,++b;return a};function Kj(a){return typeof a.className=="string"?a.className:a.getAttribute&&a.getAttribute("class")||""}
function Lj(a,b){typeof a.className=="string"?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function Mj(a,b){a.classList?b=a.classList.contains(b):(a=a.classList?a.classList:Kj(a).match(/\S+/g)||[],b=Mb(a,b)>=0);return b}
function Nj(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):Mj(a,"inverted-hdpi")&&Lj(a,Array.prototype.filter.call(a.classList?a.classList:Kj(a).match(/\S+/g)||[],function(b){return b!="inverted-hdpi"}).join(" "))}
;function Oj(){}
Oj.prototype.next=function(){return Pj};
var Pj={done:!0,value:void 0};Oj.prototype.nb=function(){return this};function Qj(a){if(a instanceof Rj||a instanceof Sj||a instanceof Tj)return a;if(typeof a.next=="function")return new Rj(function(){return a});
if(typeof a[Symbol.iterator]=="function")return new Rj(function(){return a[Symbol.iterator]()});
if(typeof a.nb=="function")return new Rj(function(){return a.nb()});
throw Error("Not an iterator or iterable.");}
function Rj(a){this.h=a}
Rj.prototype.nb=function(){return new Sj(this.h())};
Rj.prototype[Symbol.iterator]=function(){return new Tj(this.h())};
Rj.prototype.i=function(){return new Tj(this.h())};
function Sj(a){this.h=a}
w(Sj,Oj);Sj.prototype.next=function(){return this.h.next()};
Sj.prototype[Symbol.iterator]=function(){return new Tj(this.h)};
Sj.prototype.i=function(){return new Tj(this.h)};
function Tj(a){Rj.call(this,function(){return a});
this.j=a}
w(Tj,Rj);Tj.prototype.next=function(){return this.j.next()};function M(a){G.call(this);this.u=1;this.j=[];this.o=0;this.h=[];this.i={};this.A=!!a}
Za(M,G);r=M.prototype;r.subscribe=function(a,b,c){var d=this.i[a];d||(d=this.i[a]=[]);var e=this.u;this.h[e]=a;this.h[e+1]=b;this.h[e+2]=c;this.u=e+3;d.push(e);return e};
r.unsubscribe=function(a,b,c){if(a=this.i[a]){var d=this.h;if(a=a.find(function(e){return d[e+1]==b&&d[e+2]==c}))return this.Tb(a)}return!1};
r.Tb=function(a){var b=this.h[a];if(b){var c=this.i[b];this.o!=0?(this.j.push(a),this.h[a+1]=function(){}):(c&&Sb(c,a),delete this.h[a],delete this.h[a+1],delete this.h[a+2])}return!!b};
r.lb=function(a,b){var c=this.i[a];if(c){var d=Array(arguments.length-1),e=arguments.length,f;for(f=1;f<e;f++)d[f-1]=arguments[f];if(this.A)for(f=0;f<c.length;f++)e=c[f],Uj(this.h[e+1],this.h[e+2],d);else{this.o++;try{for(f=0,e=c.length;f<e&&!this.da;f++){var g=c[f];this.h[g+1].apply(this.h[g+2],d)}}finally{if(this.o--,this.j.length>0&&this.o==0)for(;c=this.j.pop();)this.Tb(c)}}return f!=0}return!1};
function Uj(a,b,c){ii(function(){a.apply(b,c)})}
r.clear=function(a){if(a){var b=this.i[a];b&&(b.forEach(this.Tb,this),delete this.i[a])}else this.h.length=0,this.i={}};
r.aa=function(){M.za.aa.call(this);this.clear();this.j.length=0};function Vj(a){this.h=a}
Vj.prototype.set=function(a,b){b===void 0?this.h.remove(a):this.h.set(a,(new Ji).serialize(b))};
Vj.prototype.get=function(a){try{var b=this.h.get(a)}catch(c){return}if(b!==null)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Vj.prototype.remove=function(a){this.h.remove(a)};function Wj(a){this.h=a}
Za(Wj,Vj);function Xj(a){this.data=a}
function Yj(a){return a===void 0||a instanceof Xj?a:new Xj(a)}
Wj.prototype.set=function(a,b){Wj.za.set.call(this,a,Yj(b))};
Wj.prototype.i=function(a){a=Wj.za.get.call(this,a);if(a===void 0||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Wj.prototype.get=function(a){if(a=this.i(a)){if(a=a.data,a===void 0)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Zj(a){this.h=a}
Za(Zj,Wj);Zj.prototype.set=function(a,b,c){if(b=Yj(b)){if(c){if(c<Ya()){Zj.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Ya()}Zj.za.set.call(this,a,b)};
Zj.prototype.i=function(a){var b=Zj.za.i.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Ya()||c&&c>Ya())Zj.prototype.remove.call(this,a);else return b}};function ak(){}
;function bk(){}
Za(bk,ak);bk.prototype[Symbol.iterator]=function(){return Qj(this.nb(!0)).i()};
bk.prototype.clear=function(){var a=Array.from(this);a=z(a);for(var b=a.next();!b.done;b=a.next())this.remove(b.value)};function ck(a){this.h=a;this.i=null}
Za(ck,bk);r=ck.prototype;r.isAvailable=function(){var a=this.h;if(a)try{a.setItem("__sak","1");a.removeItem("__sak");var b=!0}catch(c){b=c instanceof DOMException&&(c.name==="QuotaExceededError"||c.code===22||c.code===1014||c.name==="NS_ERROR_DOM_QUOTA_REACHED")&&a&&a.length!==0}else b=!1;return this.i=b};
r.set=function(a,b){dk(this);try{this.h.setItem(a,b)}catch(c){if(this.h.length==0)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
r.get=function(a){dk(this);a=this.h.getItem(a);if(typeof a!=="string"&&a!==null)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){dk(this);this.h.removeItem(a)};
r.nb=function(a){dk(this);var b=0,c=this.h,d=new Oj;d.next=function(){if(b>=c.length)return Pj;var e=c.key(b++);if(a)return{value:e,done:!1};e=c.getItem(e);if(typeof e!=="string")throw"Storage mechanism: Invalid value was encountered";return{value:e,done:!1}};
return d};
r.clear=function(){dk(this);this.h.clear()};
r.key=function(a){dk(this);return this.h.key(a)};
function dk(a){if(a.h==null)throw Error("Storage mechanism: Storage unavailable");var b;((b=a.i)!=null?b:a.isAvailable())||Ic(Error("Storage mechanism: Storage unavailable"))}
;function ek(){var a=null;try{a=C.localStorage||null}catch(b){}ck.call(this,a)}
Za(ek,ck);function fk(a,b){this.i=a;this.h=b+"::"}
Za(fk,bk);fk.prototype.set=function(a,b){this.i.set(this.h+a,b)};
fk.prototype.get=function(a){return this.i.get(this.h+a)};
fk.prototype.remove=function(a){this.i.remove(this.h+a)};
fk.prototype.nb=function(a){var b=this.i[Symbol.iterator](),c=this,d=new Oj;d.next=function(){var e=b.next();if(e.done)return e;for(e=e.value;e.slice(0,c.h.length)!=c.h;){e=b.next();if(e.done)return e;e=e.value}return{value:a?e.slice(c.h.length):c.i.get(e),done:!1}};
return d};/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
var N={},gk=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";N.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if(typeof c!=="object")throw new TypeError(c+"must be non-object");for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}}return a};
N.Sc=function(a,b){if(a.length===b)return a;if(a.subarray)return a.subarray(0,b);a.length=b;return a};
var hk={ob:function(a,b,c,d,e){if(b.subarray&&a.subarray)a.set(b.subarray(c,c+d),e);else for(var f=0;f<d;f++)a[e+f]=b[c+f]},
gd:function(a){var b,c;var d=c=0;for(b=a.length;d<b;d++)c+=a[d].length;var e=new Uint8Array(c);d=c=0;for(b=a.length;d<b;d++){var f=a[d];e.set(f,c);c+=f.length}return e}},ik={ob:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},
gd:function(a){return[].concat.apply([],a)}};
N.Ze=function(){gk?(N.kb=Uint8Array,N.Ha=Uint16Array,N.Id=Int32Array,N.assign(N,hk)):(N.kb=Array,N.Ha=Array,N.Id=Array,N.assign(N,ik))};
N.Ze();var jk=!0;try{new Uint8Array(1)}catch(a){jk=!1}
function kk(a){var b,c,d=a.length,e=0;for(b=0;b<d;b++){var f=a.charCodeAt(b);if((f&64512)===55296&&b+1<d){var g=a.charCodeAt(b+1);(g&64512)===56320&&(f=65536+(f-55296<<10)+(g-56320),b++)}e+=f<128?1:f<2048?2:f<65536?3:4}var h=new N.kb(e);for(b=c=0;c<e;b++)f=a.charCodeAt(b),(f&64512)===55296&&b+1<d&&(g=a.charCodeAt(b+1),(g&64512)===56320&&(f=65536+(f-55296<<10)+(g-56320),b++)),f<128?h[c++]=f:(f<2048?h[c++]=192|f>>>6:(f<65536?h[c++]=224|f>>>12:(h[c++]=240|f>>>18,h[c++]=128|f>>>12&63),h[c++]=128|f>>>
6&63),h[c++]=128|f&63);return h}
;var lk={};lk=function(a,b,c,d){var e=a&65535|0;a=a>>>16&65535|0;for(var f;c!==0;){f=c>2E3?2E3:c;c-=f;do e=e+b[d++]|0,a=a+e|0;while(--f);e%=65521;a%=65521}return e|a<<16|0};for(var mk={},nk,ok=[],pk=0;pk<256;pk++){nk=pk;for(var qk=0;qk<8;qk++)nk=nk&1?3988292384^nk>>>1:nk>>>1;ok[pk]=nk}mk=function(a,b,c,d){c=d+c;for(a^=-1;d<c;d++)a=a>>>8^ok[(a^b[d])&255];return a^-1};var rk={};rk={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};function sk(a){for(var b=a.length;--b>=0;)a[b]=0}
var tk=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],uk=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],vk=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],wk=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],xk=Array(576);sk(xk);var yk=Array(60);sk(yk);var zk=Array(512);sk(zk);var Ak=Array(256);sk(Ak);var Bk=Array(29);sk(Bk);var Ck=Array(30);sk(Ck);function Dk(a,b,c,d,e){this.zd=a;this.ee=b;this.de=c;this.Xd=d;this.ze=e;this.kd=a&&a.length}
var Ek,Fk,Gk;function Hk(a,b){this.ed=a;this.xb=0;this.Xa=b}
function Ik(a,b){a.Z[a.pending++]=b&255;a.Z[a.pending++]=b>>>8&255}
function Jk(a,b,c){a.ha>16-c?(a.na|=b<<a.ha&65535,Ik(a,a.na),a.na=b>>16-a.ha,a.ha+=c-16):(a.na|=b<<a.ha&65535,a.ha+=c)}
function Kk(a,b,c){Jk(a,c[b*2],c[b*2+1])}
function Lk(a,b){var c=0;do c|=a&1,a>>>=1,c<<=1;while(--b>0);return c>>>1}
function Mk(a,b,c){var d=Array(16),e=0,f;for(f=1;f<=15;f++)d[f]=e=e+c[f-1]<<1;for(c=0;c<=b;c++)e=a[c*2+1],e!==0&&(a[c*2]=Lk(d[e]++,e))}
function Nk(a){var b;for(b=0;b<286;b++)a.ra[b*2]=0;for(b=0;b<30;b++)a.ab[b*2]=0;for(b=0;b<19;b++)a.ja[b*2]=0;a.ra[512]=1;a.Na=a.Ab=0;a.xa=a.matches=0}
function Ok(a){a.ha>8?Ik(a,a.na):a.ha>0&&(a.Z[a.pending++]=a.na);a.na=0;a.ha=0}
function Pk(a,b,c){Ok(a);Ik(a,c);Ik(a,~c);N.ob(a.Z,a.window,b,c,a.pending);a.pending+=c}
function Qk(a,b,c,d){var e=b*2,f=c*2;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}
function Rk(a,b,c){for(var d=a.ba[c],e=c<<1;e<=a.La;){e<a.La&&Qk(b,a.ba[e+1],a.ba[e],a.depth)&&e++;if(Qk(b,d,a.ba[e],a.depth))break;a.ba[c]=a.ba[e];c=e;e<<=1}a.ba[c]=d}
function Sk(a,b,c){var d=0;if(a.xa!==0){do{var e=a.Z[a.Gb+d*2]<<8|a.Z[a.Gb+d*2+1];var f=a.Z[a.Gc+d];d++;if(e===0)Kk(a,f,b);else{var g=Ak[f];Kk(a,g+256+1,b);var h=tk[g];h!==0&&(f-=Bk[g],Jk(a,f,h));e--;g=e<256?zk[e]:zk[256+(e>>>7)];Kk(a,g,c);h=uk[g];h!==0&&(e-=Ck[g],Jk(a,e,h))}}while(d<a.xa)}Kk(a,256,b)}
function Tk(a,b){var c=b.ed,d=b.Xa.zd,e=b.Xa.kd,f=b.Xa.Xd,g,h=-1;a.La=0;a.sb=573;for(g=0;g<f;g++)c[g*2]!==0?(a.ba[++a.La]=h=g,a.depth[g]=0):c[g*2+1]=0;for(;a.La<2;){var k=a.ba[++a.La]=h<2?++h:0;c[k*2]=1;a.depth[k]=0;a.Na--;e&&(a.Ab-=d[k*2+1])}b.xb=h;for(g=a.La>>1;g>=1;g--)Rk(a,c,g);k=f;do g=a.ba[1],a.ba[1]=a.ba[a.La--],Rk(a,c,1),d=a.ba[1],a.ba[--a.sb]=g,a.ba[--a.sb]=d,c[k*2]=c[g*2]+c[d*2],a.depth[k]=(a.depth[g]>=a.depth[d]?a.depth[g]:a.depth[d])+1,c[g*2+1]=c[d*2+1]=k,a.ba[1]=k++,Rk(a,c,1);while(a.La>=
2);a.ba[--a.sb]=a.ba[1];g=b.ed;k=b.xb;d=b.Xa.zd;e=b.Xa.kd;f=b.Xa.ee;var l=b.Xa.de,m=b.Xa.ze,n,p=0;for(n=0;n<=15;n++)a.Ia[n]=0;g[a.ba[a.sb]*2+1]=0;for(b=a.sb+1;b<573;b++){var t=a.ba[b];n=g[g[t*2+1]*2+1]+1;n>m&&(n=m,p++);g[t*2+1]=n;if(!(t>k)){a.Ia[n]++;var v=0;t>=l&&(v=f[t-l]);var x=g[t*2];a.Na+=x*(n+v);e&&(a.Ab+=x*(d[t*2+1]+v))}}if(p!==0){do{for(n=m-1;a.Ia[n]===0;)n--;a.Ia[n]--;a.Ia[n+1]+=2;a.Ia[m]--;p-=2}while(p>0);for(n=m;n!==0;n--)for(t=a.Ia[n];t!==0;)d=a.ba[--b],d>k||(g[d*2+1]!==n&&(a.Na+=(n-g[d*
2+1])*g[d*2],g[d*2+1]=n),t--)}Mk(c,h,a.Ia)}
function Uk(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;f===0&&(h=138,k=3);b[(c+1)*2+1]=65535;for(d=0;d<=c;d++){var l=f;f=b[(d+1)*2+1];++g<h&&l===f||(g<k?a.ja[l*2]+=g:l!==0?(l!==e&&a.ja[l*2]++,a.ja[32]++):g<=10?a.ja[34]++:a.ja[36]++,g=0,e=l,f===0?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4))}}
function Vk(a,b,c){var d,e=-1,f=b[1],g=0,h=7,k=4;f===0&&(h=138,k=3);for(d=0;d<=c;d++){var l=f;f=b[(d+1)*2+1];if(!(++g<h&&l===f)){if(g<k){do Kk(a,l,a.ja);while(--g!==0)}else l!==0?(l!==e&&(Kk(a,l,a.ja),g--),Kk(a,16,a.ja),Jk(a,g-3,2)):g<=10?(Kk(a,17,a.ja),Jk(a,g-3,3)):(Kk(a,18,a.ja),Jk(a,g-11,7));g=0;e=l;f===0?(h=138,k=3):l===f?(h=6,k=3):(h=7,k=4)}}}
function Wk(a){var b=4093624447,c;for(c=0;c<=31;c++,b>>>=1)if(b&1&&a.ra[c*2]!==0)return 0;if(a.ra[18]!==0||a.ra[20]!==0||a.ra[26]!==0)return 1;for(c=32;c<256;c++)if(a.ra[c*2]!==0)return 1;return 0}
var Xk=!1;function Yk(a,b,c){a.Z[a.Gb+a.xa*2]=b>>>8&255;a.Z[a.Gb+a.xa*2+1]=b&255;a.Z[a.Gc+a.xa]=c&255;a.xa++;b===0?a.ra[c*2]++:(a.matches++,b--,a.ra[(Ak[c]+256+1)*2]++,a.ab[(b<256?zk[b]:zk[256+(b>>>7)])*2]++);return a.xa===a.Kb-1}
;function Zk(a,b){a.msg=rk[b];return b}
function $k(a){for(var b=a.length;--b>=0;)a[b]=0}
function al(a){var b=a.state,c=b.pending;c>a.S&&(c=a.S);c!==0&&(N.ob(a.output,b.Z,b.Nb,c,a.yb),a.yb+=c,b.Nb+=c,a.Tc+=c,a.S-=c,b.pending-=c,b.pending===0&&(b.Nb=0))}
function bl(a,b){var c=a.ta>=0?a.ta:-1,d=a.v-a.ta,e=0;if(a.level>0){a.M.Ac===2&&(a.M.Ac=Wk(a));Tk(a,a.ic);Tk(a,a.ac);Uk(a,a.ra,a.ic.xb);Uk(a,a.ab,a.ac.xb);Tk(a,a.Yc);for(e=18;e>=3&&a.ja[wk[e]*2+1]===0;e--);a.Na+=3*(e+1)+5+5+4;var f=a.Na+3+7>>>3;var g=a.Ab+3+7>>>3;g<=f&&(f=g)}else f=g=d+5;if(d+4<=f&&c!==-1)Jk(a,b?1:0,3),Pk(a,c,d);else if(a.strategy===4||g===f)Jk(a,2+(b?1:0),3),Sk(a,xk,yk);else{Jk(a,4+(b?1:0),3);c=a.ic.xb+1;d=a.ac.xb+1;e+=1;Jk(a,c-257,5);Jk(a,d-1,5);Jk(a,e-4,4);for(f=0;f<e;f++)Jk(a,
a.ja[wk[f]*2+1],3);Vk(a,a.ra,c-1);Vk(a,a.ab,d-1);Sk(a,a.ra,a.ab)}Nk(a);b&&Ok(a);a.ta=a.v;al(a.M)}
function O(a,b){a.Z[a.pending++]=b}
function cl(a,b){a.Z[a.pending++]=b>>>8&255;a.Z[a.pending++]=b&255}
function dl(a,b){var c=a.nd,d=a.v,e=a.wa,f=a.od,g=a.v>a.la-262?a.v-(a.la-262):0,h=a.window,k=a.Ya,l=a.Ga,m=a.v+258,n=h[d+e-1],p=h[d+e];a.wa>=a.jd&&(c>>=2);f>a.B&&(f=a.B);do{var t=b;if(h[t+e]===p&&h[t+e-1]===n&&h[t]===h[d]&&h[++t]===h[d+1]){d+=2;for(t++;h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&h[++d]===h[++t]&&d<m;);t=258-(m-d);d=m-258;if(t>e){a.wb=b;e=t;if(t>=f)break;n=h[d+e-1];p=h[d+e]}}}while((b=l[b&k])>g&&--c!==0);return e<=
a.B?e:a.B}
function el(a){var b=a.la,c;do{var d=a.Gd-a.B-a.v;if(a.v>=b+(b-262)){N.ob(a.window,a.window,b,b,0);a.wb-=b;a.v-=b;a.ta-=b;var e=c=a.hc;do{var f=a.head[--e];a.head[e]=f>=b?f-b:0}while(--c);e=c=b;do f=a.Ga[--e],a.Ga[e]=f>=b?f-b:0;while(--c);d+=b}if(a.M.ma===0)break;e=a.M;c=a.window;f=a.v+a.B;var g=e.ma;g>d&&(g=d);g===0?c=0:(e.ma-=g,N.ob(c,e.input,e.fb,g,f),e.state.wrap===1?e.J=lk(e.J,c,g,f):e.state.wrap===2&&(e.J=mk(e.J,c,g,f)),e.fb+=g,e.ib+=g,c=g);a.B+=c;if(a.B+a.sa>=3)for(d=a.v-a.sa,a.R=a.window[d],
a.R=(a.R<<a.Ka^a.window[d+1])&a.Ja;a.sa&&!(a.R=(a.R<<a.Ka^a.window[d+3-1])&a.Ja,a.Ga[d&a.Ya]=a.head[a.R],a.head[a.R]=d,d++,a.sa--,a.B+a.sa<3););}while(a.B<262&&a.M.ma!==0)}
function fl(a,b){for(var c;;){if(a.B<262){el(a);if(a.B<262&&b===0)return 1;if(a.B===0)break}c=0;a.B>=3&&(a.R=(a.R<<a.Ka^a.window[a.v+3-1])&a.Ja,c=a.Ga[a.v&a.Ya]=a.head[a.R],a.head[a.R]=a.v);c!==0&&a.v-c<=a.la-262&&(a.T=dl(a,c));if(a.T>=3)if(c=Yk(a,a.v-a.wb,a.T-3),a.B-=a.T,a.T<=a.Ic&&a.B>=3){a.T--;do a.v++,a.R=(a.R<<a.Ka^a.window[a.v+3-1])&a.Ja,a.Ga[a.v&a.Ya]=a.head[a.R],a.head[a.R]=a.v;while(--a.T!==0);a.v++}else a.v+=a.T,a.T=0,a.R=a.window[a.v],a.R=(a.R<<a.Ka^a.window[a.v+1])&a.Ja;else c=Yk(a,0,
a.window[a.v]),a.B--,a.v++;if(c&&(bl(a,!1),a.M.S===0))return 1}a.sa=a.v<2?a.v:2;return b===4?(bl(a,!0),a.M.S===0?3:4):a.xa&&(bl(a,!1),a.M.S===0)?1:2}
function gl(a,b){for(var c,d;;){if(a.B<262){el(a);if(a.B<262&&b===0)return 1;if(a.B===0)break}c=0;a.B>=3&&(a.R=(a.R<<a.Ka^a.window[a.v+3-1])&a.Ja,c=a.Ga[a.v&a.Ya]=a.head[a.R],a.head[a.R]=a.v);a.wa=a.T;a.rd=a.wb;a.T=2;c!==0&&a.wa<a.Ic&&a.v-c<=a.la-262&&(a.T=dl(a,c),a.T<=5&&(a.strategy===1||a.T===3&&a.v-a.wb>4096)&&(a.T=2));if(a.wa>=3&&a.T<=a.wa){d=a.v+a.B-3;c=Yk(a,a.v-1-a.rd,a.wa-3);a.B-=a.wa-1;a.wa-=2;do++a.v<=d&&(a.R=(a.R<<a.Ka^a.window[a.v+3-1])&a.Ja,a.Ga[a.v&a.Ya]=a.head[a.R],a.head[a.R]=a.v);
while(--a.wa!==0);a.cb=0;a.T=2;a.v++;if(c&&(bl(a,!1),a.M.S===0))return 1}else if(a.cb){if((c=Yk(a,0,a.window[a.v-1]))&&bl(a,!1),a.v++,a.B--,a.M.S===0)return 1}else a.cb=1,a.v++,a.B--}a.cb&&(Yk(a,0,a.window[a.v-1]),a.cb=0);a.sa=a.v<2?a.v:2;return b===4?(bl(a,!0),a.M.S===0?3:4):a.xa&&(bl(a,!1),a.M.S===0)?1:2}
function hl(a,b){for(var c,d,e,f=a.window;;){if(a.B<=258){el(a);if(a.B<=258&&b===0)return 1;if(a.B===0)break}a.T=0;if(a.B>=3&&a.v>0&&(d=a.v-1,c=f[d],c===f[++d]&&c===f[++d]&&c===f[++d])){for(e=a.v+258;c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&c===f[++d]&&d<e;);a.T=258-(e-d);a.T>a.B&&(a.T=a.B)}a.T>=3?(c=Yk(a,1,a.T-3),a.B-=a.T,a.v+=a.T,a.T=0):(c=Yk(a,0,a.window[a.v]),a.B--,a.v++);if(c&&(bl(a,!1),a.M.S===0))return 1}a.sa=0;return b===4?(bl(a,!0),a.M.S===0?3:4):
a.xa&&(bl(a,!1),a.M.S===0)?1:2}
function il(a,b){for(var c;;){if(a.B===0&&(el(a),a.B===0)){if(b===0)return 1;break}a.T=0;c=Yk(a,0,a.window[a.v]);a.B--;a.v++;if(c&&(bl(a,!1),a.M.S===0))return 1}a.sa=0;return b===4?(bl(a,!0),a.M.S===0?3:4):a.xa&&(bl(a,!1),a.M.S===0)?1:2}
function jl(a,b,c,d,e){this.le=a;this.ye=b;this.Be=c;this.xe=d;this.ge=e}
var kl;kl=[new jl(0,0,0,0,function(a,b){var c=65535;for(c>a.ya-5&&(c=a.ya-5);;){if(a.B<=1){el(a);if(a.B===0&&b===0)return 1;if(a.B===0)break}a.v+=a.B;a.B=0;var d=a.ta+c;if(a.v===0||a.v>=d)if(a.B=a.v-d,a.v=d,bl(a,!1),a.M.S===0)return 1;if(a.v-a.ta>=a.la-262&&(bl(a,!1),a.M.S===0))return 1}a.sa=0;if(b===4)return bl(a,!0),a.M.S===0?3:4;a.v>a.ta&&bl(a,!1);return 1}),
new jl(4,4,8,4,fl),new jl(4,5,16,8,fl),new jl(4,6,32,32,fl),new jl(4,4,16,16,gl),new jl(8,16,32,32,gl),new jl(8,16,128,128,gl),new jl(8,32,128,256,gl),new jl(32,128,258,1024,gl),new jl(32,258,258,4096,gl)];
function ll(){this.M=null;this.status=0;this.Z=null;this.wrap=this.pending=this.Nb=this.ya=0;this.I=null;this.Aa=0;this.method=8;this.ub=-1;this.Ya=this.Vc=this.la=0;this.window=null;this.Gd=0;this.head=this.Ga=null;this.od=this.jd=this.strategy=this.level=this.Ic=this.nd=this.wa=this.B=this.wb=this.v=this.cb=this.rd=this.T=this.ta=this.Ka=this.Ja=this.Ec=this.hc=this.R=0;this.ra=new N.Ha(1146);this.ab=new N.Ha(122);this.ja=new N.Ha(78);$k(this.ra);$k(this.ab);$k(this.ja);this.Yc=this.ac=this.ic=
null;this.Ia=new N.Ha(16);this.ba=new N.Ha(573);$k(this.ba);this.sb=this.La=0;this.depth=new N.Ha(573);$k(this.depth);this.ha=this.na=this.sa=this.matches=this.Ab=this.Na=this.Gb=this.xa=this.Kb=this.Gc=0}
function ml(a,b){if(!a||!a.state||b>5||b<0)return a?Zk(a,-2):-2;var c=a.state;if(!a.output||!a.input&&a.ma!==0||c.status===666&&b!==4)return Zk(a,a.S===0?-5:-2);c.M=a;var d=c.ub;c.ub=b;if(c.status===42)if(c.wrap===2)a.J=0,O(c,31),O(c,139),O(c,8),c.I?(O(c,(c.I.text?1:0)+(c.I.Sa?2:0)+(c.I.extra?4:0)+(c.I.name?8:0)+(c.I.comment?16:0)),O(c,c.I.time&255),O(c,c.I.time>>8&255),O(c,c.I.time>>16&255),O(c,c.I.time>>24&255),O(c,c.level===9?2:c.strategy>=2||c.level<2?4:0),O(c,c.I.os&255),c.I.extra&&c.I.extra.length&&
(O(c,c.I.extra.length&255),O(c,c.I.extra.length>>8&255)),c.I.Sa&&(a.J=mk(a.J,c.Z,c.pending,0)),c.Aa=0,c.status=69):(O(c,0),O(c,0),O(c,0),O(c,0),O(c,0),O(c,c.level===9?2:c.strategy>=2||c.level<2?4:0),O(c,3),c.status=113);else{var e=8+(c.Vc-8<<4)<<8;e|=(c.strategy>=2||c.level<2?0:c.level<6?1:c.level===6?2:3)<<6;c.v!==0&&(e|=32);c.status=113;cl(c,e+(31-e%31));c.v!==0&&(cl(c,a.J>>>16),cl(c,a.J&65535));a.J=1}if(c.status===69)if(c.I.extra){for(e=c.pending;c.Aa<(c.I.extra.length&65535)&&(c.pending!==c.ya||
(c.I.Sa&&c.pending>e&&(a.J=mk(a.J,c.Z,c.pending-e,e)),al(a),e=c.pending,c.pending!==c.ya));)O(c,c.I.extra[c.Aa]&255),c.Aa++;c.I.Sa&&c.pending>e&&(a.J=mk(a.J,c.Z,c.pending-e,e));c.Aa===c.I.extra.length&&(c.Aa=0,c.status=73)}else c.status=73;if(c.status===73)if(c.I.name){e=c.pending;do{if(c.pending===c.ya&&(c.I.Sa&&c.pending>e&&(a.J=mk(a.J,c.Z,c.pending-e,e)),al(a),e=c.pending,c.pending===c.ya)){var f=1;break}f=c.Aa<c.I.name.length?c.I.name.charCodeAt(c.Aa++)&255:0;O(c,f)}while(f!==0);c.I.Sa&&c.pending>
e&&(a.J=mk(a.J,c.Z,c.pending-e,e));f===0&&(c.Aa=0,c.status=91)}else c.status=91;if(c.status===91)if(c.I.comment){e=c.pending;do{if(c.pending===c.ya&&(c.I.Sa&&c.pending>e&&(a.J=mk(a.J,c.Z,c.pending-e,e)),al(a),e=c.pending,c.pending===c.ya)){f=1;break}f=c.Aa<c.I.comment.length?c.I.comment.charCodeAt(c.Aa++)&255:0;O(c,f)}while(f!==0);c.I.Sa&&c.pending>e&&(a.J=mk(a.J,c.Z,c.pending-e,e));f===0&&(c.status=103)}else c.status=103;c.status===103&&(c.I.Sa?(c.pending+2>c.ya&&al(a),c.pending+2<=c.ya&&(O(c,a.J&
255),O(c,a.J>>8&255),a.J=0,c.status=113)):c.status=113);if(c.pending!==0){if(al(a),a.S===0)return c.ub=-1,0}else if(a.ma===0&&(b<<1)-(b>4?9:0)<=(d<<1)-(d>4?9:0)&&b!==4)return Zk(a,-5);if(c.status===666&&a.ma!==0)return Zk(a,-5);if(a.ma!==0||c.B!==0||b!==0&&c.status!==666){d=c.strategy===2?il(c,b):c.strategy===3?hl(c,b):kl[c.level].ge(c,b);if(d===3||d===4)c.status=666;if(d===1||d===3)return a.S===0&&(c.ub=-1),0;if(d===2&&(b===1?(Jk(c,2,3),Kk(c,256,xk),c.ha===16?(Ik(c,c.na),c.na=0,c.ha=0):c.ha>=8&&
(c.Z[c.pending++]=c.na&255,c.na>>=8,c.ha-=8)):b!==5&&(Jk(c,0,3),Pk(c,0,0),b===3&&($k(c.head),c.B===0&&(c.v=0,c.ta=0,c.sa=0))),al(a),a.S===0))return c.ub=-1,0}if(b!==4)return 0;if(c.wrap<=0)return 1;c.wrap===2?(O(c,a.J&255),O(c,a.J>>8&255),O(c,a.J>>16&255),O(c,a.J>>24&255),O(c,a.ib&255),O(c,a.ib>>8&255),O(c,a.ib>>16&255),O(c,a.ib>>24&255)):(cl(c,a.J>>>16),cl(c,a.J&65535));al(a);c.wrap>0&&(c.wrap=-c.wrap);return c.pending!==0?0:1}
;var nl={};nl=function(){this.input=null;this.ib=this.ma=this.fb=0;this.output=null;this.Tc=this.S=this.yb=0;this.msg="";this.state=null;this.Ac=2;this.J=0};var ol=Object.prototype.toString;
function pl(a){if(!(this instanceof pl))return new pl(a);a=this.options=N.assign({level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,to:""},a||{});a.raw&&a.windowBits>0?a.windowBits=-a.windowBits:a.gzip&&a.windowBits>0&&a.windowBits<16&&(a.windowBits+=16);this.err=0;this.msg="";this.ended=!1;this.chunks=[];this.M=new nl;this.M.S=0;var b=this.M;var c=a.level,d=a.method,e=a.windowBits,f=a.memLevel,g=a.strategy;if(b){var h=1;c===-1&&(c=6);e<0?(h=0,e=-e):e>15&&(h=2,e-=16);if(f<1||f>
9||d!==8||e<8||e>15||c<0||c>9||g<0||g>4)b=Zk(b,-2);else{e===8&&(e=9);var k=new ll;b.state=k;k.M=b;k.wrap=h;k.I=null;k.Vc=e;k.la=1<<k.Vc;k.Ya=k.la-1;k.Ec=f+7;k.hc=1<<k.Ec;k.Ja=k.hc-1;k.Ka=~~((k.Ec+3-1)/3);k.window=new N.kb(k.la*2);k.head=new N.Ha(k.hc);k.Ga=new N.Ha(k.la);k.Kb=1<<f+6;k.ya=k.Kb*4;k.Z=new N.kb(k.ya);k.Gb=1*k.Kb;k.Gc=3*k.Kb;k.level=c;k.strategy=g;k.method=d;if(b&&b.state){b.ib=b.Tc=0;b.Ac=2;c=b.state;c.pending=0;c.Nb=0;c.wrap<0&&(c.wrap=-c.wrap);c.status=c.wrap?42:113;b.J=c.wrap===2?
0:1;c.ub=0;if(!Xk){d=Array(16);for(f=g=0;f<28;f++)for(Bk[f]=g,e=0;e<1<<tk[f];e++)Ak[g++]=f;Ak[g-1]=f;for(f=g=0;f<16;f++)for(Ck[f]=g,e=0;e<1<<uk[f];e++)zk[g++]=f;for(g>>=7;f<30;f++)for(Ck[f]=g<<7,e=0;e<1<<uk[f]-7;e++)zk[256+g++]=f;for(e=0;e<=15;e++)d[e]=0;for(e=0;e<=143;)xk[e*2+1]=8,e++,d[8]++;for(;e<=255;)xk[e*2+1]=9,e++,d[9]++;for(;e<=279;)xk[e*2+1]=7,e++,d[7]++;for(;e<=287;)xk[e*2+1]=8,e++,d[8]++;Mk(xk,287,d);for(e=0;e<30;e++)yk[e*2+1]=5,yk[e*2]=Lk(e,5);Ek=new Dk(xk,tk,257,286,15);Fk=new Dk(yk,
uk,0,30,15);Gk=new Dk([],vk,0,19,7);Xk=!0}c.ic=new Hk(c.ra,Ek);c.ac=new Hk(c.ab,Fk);c.Yc=new Hk(c.ja,Gk);c.na=0;c.ha=0;Nk(c);c=0}else c=Zk(b,-2);c===0&&(b=b.state,b.Gd=2*b.la,$k(b.head),b.Ic=kl[b.level].ye,b.jd=kl[b.level].le,b.od=kl[b.level].Be,b.nd=kl[b.level].xe,b.v=0,b.ta=0,b.B=0,b.sa=0,b.T=b.wa=2,b.cb=0,b.R=0);b=c}}else b=-2;if(b!==0)throw Error(rk[b]);a.header&&(b=this.M)&&b.state&&b.state.wrap===2&&(b.state.I=a.header);if(a.dictionary){var l;typeof a.dictionary==="string"?l=kk(a.dictionary):
ol.call(a.dictionary)==="[object ArrayBuffer]"?l=new Uint8Array(a.dictionary):l=a.dictionary;a=this.M;f=l;g=f.length;if(a&&a.state)if(l=a.state,b=l.wrap,b===2||b===1&&l.status!==42||l.B)b=-2;else{b===1&&(a.J=lk(a.J,f,g,0));l.wrap=0;g>=l.la&&(b===0&&($k(l.head),l.v=0,l.ta=0,l.sa=0),c=new N.kb(l.la),N.ob(c,f,g-l.la,l.la,0),f=c,g=l.la);c=a.ma;d=a.fb;e=a.input;a.ma=g;a.fb=0;a.input=f;for(el(l);l.B>=3;){f=l.v;g=l.B-2;do l.R=(l.R<<l.Ka^l.window[f+3-1])&l.Ja,l.Ga[f&l.Ya]=l.head[l.R],l.head[l.R]=f,f++;while(--g);
l.v=f;l.B=2;el(l)}l.v+=l.B;l.ta=l.v;l.sa=l.B;l.B=0;l.T=l.wa=2;l.cb=0;a.fb=d;a.input=e;a.ma=c;l.wrap=b;b=0}else b=-2;if(b!==0)throw Error(rk[b]);this.gh=!0}}
pl.prototype.push=function(a,b){var c=this.M,d=this.options.chunkSize;if(this.ended)return!1;var e=b===~~b?b:b===!0?4:0;typeof a==="string"?c.input=kk(a):ol.call(a)==="[object ArrayBuffer]"?c.input=new Uint8Array(a):c.input=a;c.fb=0;c.ma=c.input.length;do{c.S===0&&(c.output=new N.kb(d),c.yb=0,c.S=d);a=ml(c,e);if(a!==1&&a!==0)return ql(this,a),this.ended=!0,!1;if(c.S===0||c.ma===0&&(e===4||e===2))if(this.options.to==="string"){var f=N.Sc(c.output,c.yb);b=f;f=f.length;if(f<65537&&(b.subarray&&jk||!b.subarray))b=
String.fromCharCode.apply(null,N.Sc(b,f));else{for(var g="",h=0;h<f;h++)g+=String.fromCharCode(b[h]);b=g}this.chunks.push(b)}else b=N.Sc(c.output,c.yb),this.chunks.push(b)}while((c.ma>0||c.S===0)&&a!==1);if(e===4)return(c=this.M)&&c.state?(d=c.state.status,d!==42&&d!==69&&d!==73&&d!==91&&d!==103&&d!==113&&d!==666?a=Zk(c,-2):(c.state=null,a=d===113?Zk(c,-3):0)):a=-2,ql(this,a),this.ended=!0,a===0;e===2&&(ql(this,0),c.S=0);return!0};
function ql(a,b){b===0&&(a.result=a.options.to==="string"?a.chunks.join(""):N.gd(a.chunks));a.chunks=[];a.err=b;a.msg=a.M.msg}
function rl(a,b){b=b||{};b.gzip=!0;b=new pl(b);b.push(a,!0);if(b.err)throw b.msg||rk[b.err];return b.result}
;function sl(a){if(!a)return null;a=a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue;var b;a?b=lb(a):b=null;return b}
;function tl(a){return lb(a===null?"null":a===void 0?"undefined":a)}
;function ul(a){this.name=a}
;var vl=new ul("rawColdConfigGroup");var wl=new ul("rawHotConfigGroup");function xl(a){this.F=J(a)}
w(xl,L);function yl(a){this.F=J(a)}
w(yl,L);yl.prototype.setTrackingParams=function(a){if(a!=null)if(typeof a==="string")a=a?new sd(a,rd):ud||(ud=new sd(null,rd));else if(a.constructor!==sd)if(qd(a))a=a.length?new sd(new Uint8Array(a),rd):ud||(ud=new sd(null,rd));else throw Error();return K(this,1,a)};var zl=new ul("continuationCommand");var Al=new ul("webCommandMetadata");var Bl=new ul("signalServiceEndpoint");var Cl={Hf:"EMBEDDED_PLAYER_MODE_UNKNOWN",Ef:"EMBEDDED_PLAYER_MODE_DEFAULT",Gf:"EMBEDDED_PLAYER_MODE_PFP",Ff:"EMBEDDED_PLAYER_MODE_PFL"};var Dl=new ul("feedbackEndpoint");var Zd={Jg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_UNKNOWN",dg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_FOR_TESTING",ug:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_RESUME_TO_HOME_TTL",Bg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_START_TO_SHORTS_ANALYSIS_SLICE",Sf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_DEVICE_LAYER_SLICE",Ig:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_UNIFIED_LAYER_SLICE",Lg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_VISITOR_LAYER_SLICE",Ag:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SHOW_SHEET_COMMAND_HANDLER_BLOCK",
Ng:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WIZ_NEXT_MIGRATED_COMPONENT",Mg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WIZ_NEXT_CHANNEL_NAME_TOOLTIP",xg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATION_LOCK_SUPPORTED",Dg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_THEATER_MODE_ENABLED",Rg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_PIN_SUGGESTION",Qg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_LONG_PRESS_EDU_TOAST",Pg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_AMBIENT",Eg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TIME_WATCHED_PANEL",
zg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SEARCH_FROM_SEARCH_BAR_OVERLAY",Sg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_SHOW_VOICE_SEARCH_EDU_TOAST",Cg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_SUGGESTED_LANGUAGE_SELECTED",Tg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_TRIGGER_SHORTS_PIP",kg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IN_ZP_VOICE_CRASHY_SET",qg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_FAST_SWIPE_SUPPRESSED",pg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_FAST_SWIPE_ALLOWED",sg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_PULL_TO_REFRESH_ATTEMPT",
Og:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_WOULD_BLOCK_KABUKI",tg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_TALL_SCREEN",rg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_REEL_NORMAL_SCREEN",Lf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ACCESSIBILITY_MODE_ENABLED",Kf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ACCESSIBILITY_MODE_DISABLED",Mf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_AUTOPLAY_ENABLED",Nf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_CAST_MATCH_OCCURRED",Vf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_ELIGIBLE",Yf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ENDSCREEN_TRIGGERED",
og:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_POSTPLAY_TRIGGERED",ng:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_POSTPLAY_LACT_THRESHOLD_EXCEEDED",eg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_MATCHED_ON_REMOTE_CONNECTION",gg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHABLE_ON_REMOTE_CONNECTION",fg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_MISATTRIBUTED_ON_REMOTE_CONNECTION",jg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_TV_IS_SIGNED_IN_ON_REMOTE_CONNECTION",Gg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TV_START_TYPE_COLD_ON_REMOTE_CONNECTION",
Hg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TV_START_TYPE_NON_COLD_ON_REMOTE_CONNECTION",mg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ON_REMOTE_CONNECTION",Rf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_VALID",Pf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_INVALID",Qf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_UNDEFINED",Of:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_COBALT_PERSISTENT_SETTINGS_TEST_DEFINED",lg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_LACT_THRESHOLD_EXCEEDED",
yg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROUND_TRIP_HANDLING_ON_REMOTE_CONNECTION",ig:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHED_ON_REMOTE_CONNECTION_BEFORE_APP_RELOAD",hg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_IDENTITIES_STATE_SWITCHED_ON_REMOTE_CONNECTION_AFTER_APP_RELOAD",Wf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_INELIGIBLE",Fg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_TVHTML5_MID_ROLL_THRESHOLD_REACHED",ag:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_PENDING",
Zf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_ACTIVATED",Xf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMC3DS_M2_ELIGIBLE",vg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATE_DEVICE_TO_LANDSCAPE",wg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ROTATE_DEVICE_TO_PORTRAIT",Uf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EMBEDS_FACEOFF_UI_EVENT",cg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_EXP_COBALT_HTTP3_CONFIG_RECEIVED",Tf:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_ELIGIBLE_TO_SUPPRESS_TRANSPORT_CONTROLS_BUTTONS",
Kg:"GENERIC_CLIENT_EXPERIMENT_EVENT_TYPE_USER_HAS_THEATER_MODE_COOKIE_ENABLED"};var El=new ul("shareEndpoint"),Fl=new ul("shareEntityEndpoint"),Gl=new ul("shareEntityServiceEndpoint"),Hl=new ul("webPlayerShareEntityServiceEndpoint");var Il=new ul("playlistEditEndpoint");var Jl=new ul("modifyChannelNotificationPreferenceEndpoint");var Kl=new ul("unsubscribeEndpoint");var Ll=new ul("subscribeEndpoint");function Ml(){var a=Nl;E("yt.ads.biscotti.getId_")||D("yt.ads.biscotti.getId_",a)}
function Ol(a){D("yt.ads.biscotti.lastId_",a)}
;function Pl(a,b){b.length>1?a[b[0]]=b[1]:b.length===1&&Object.assign(a,b[0])}
;var Ql=C.window,Rl,Sl,Tl=(Ql==null?void 0:(Rl=Ql.yt)==null?void 0:Rl.config_)||(Ql==null?void 0:(Sl=Ql.ytcfg)==null?void 0:Sl.data_)||{};D("yt.config_",Tl);function Ul(){Pl(Tl,arguments)}
function P(a,b){return a in Tl?Tl[a]:b}
function Vl(a){var b=Tl.EXPERIMENT_FLAGS;return b?b[a]:void 0}
;var Wl=[];function Xl(a){Wl.forEach(function(b){return b(a)})}
function Yl(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Zl(b)}}:a}
function Zl(a){var b=E("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0,void 0,void 0):(b=P("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0,void 0,void 0]),Ul("ERRORS",b));Xl(a)}
function $l(a,b,c,d,e){var f=E("yt.logging.errors.log");f?f(a,"WARNING",b,c,d,void 0,e):(f=P("ERRORS",[]),f.push([a,"WARNING",b,c,d,void 0,e]),Ul("ERRORS",f))}
;var am=/^[\w.]*$/,bm={q:!0,search_query:!0};function cm(a,b){b=a.split(b);for(var c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(f.length===1&&f[0]||f.length===2)try{var g=dm(f[0]||""),h=dm(f[1]||"");if(g in c){var k=c[g];Array.isArray(k)?Tb(k,h):c[g]=[k,h]}else c[g]=h}catch(p){var l=p,m=f[0],n=String(cm);l.args=[{key:m,value:f[1],query:a,method:em===n?"unchanged":n}];bm.hasOwnProperty(m)||$l(l)}}return c}
var em=String(cm);function fm(a){var b=[];pg(a,function(c,d){var e=encodeURIComponent(String(d));c=Array.isArray(c)?c:[c];Nb(c,function(f){f==""?b.push(e):b.push(e+"="+encodeURIComponent(String(f)))})});
return b.join("&")}
function gm(a){a.charAt(0)==="?"&&(a=a.substring(1));return cm(a,"&")}
function hm(a){return a.indexOf("?")!==-1?(a=(a||"").split("#")[0],a=a.split("?",2),gm(a.length>1?a[1]:a[0])):{}}
function im(a,b){return jm(a,b||{},!0)}
function jm(a,b,c){var d=a.split("#",2);a=d[0];d=d.length>1?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=gm(e[1]||"");for(var f in b)!c&&e!==null&&f in e||(e[f]=b[f]);return ic(a,e)+d}
function km(a){if(!b)var b=window.location.href;var c=bc(1,a),d=cc(a);c&&d?(a=a.match($b),b=b.match($b),a=a[3]==b[3]&&a[1]==b[1]&&a[4]==b[4]):a=d?cc(b)===d&&(Number(bc(4,b))||null)===(Number(bc(4,a))||null):!0;return a}
function dm(a){return a&&a.match(am)?a:decodeURIComponent(a.replace(/\+/g," "))}
;function lm(a){var b=mm;a=a===void 0?E("yt.ads.biscotti.lastId_")||"":a;var c=Object,d=c.assign,e={};e.dt=zj;e.flash="0";a:{try{var f=b.h.top.location.href}catch(La){f=2;break a}f=f?f===b.i.location.href?0:1:2}e=(e.frm=f,e);try{e.u_tz=-(new Date).getTimezoneOffset();var g=g===void 0?rj:g;try{var h=g.history.length}catch(La){h=0}e.u_his=h;var k;e.u_h=(k=rj.screen)==null?void 0:k.height;var l;e.u_w=(l=rj.screen)==null?void 0:l.width;var m;e.u_ah=(m=rj.screen)==null?void 0:m.availHeight;var n;e.u_aw=
(n=rj.screen)==null?void 0:n.availWidth;var p;e.u_cd=(p=rj.screen)==null?void 0:p.colorDepth}catch(La){}h=b.h;try{var t=h.screenX;var v=h.screenY}catch(La){}try{var x=h.outerWidth;var y=h.outerHeight}catch(La){}try{var F=h.innerWidth;var I=h.innerHeight}catch(La){}try{var V=h.screenLeft;var ia=h.screenTop}catch(La){}try{F=h.innerWidth,I=h.innerHeight}catch(La){}try{var Ia=h.screen.availWidth;var cb=h.screen.availTop}catch(La){}t=[V,ia,t,v,Ia,cb,x,y,F,I];try{var aa=(b.h.top||window).document,X=aa.compatMode==
"CSS1Compat"?aa.documentElement:aa.body;var na=(new og(X.clientWidth,X.clientHeight)).round()}catch(La){na=new og(-12245933,-12245933)}aa=na;na={};var Ma=Ma===void 0?C:Ma;X=new Fj;"SVGElement"in Ma&&"createElementNS"in Ma.document&&X.set(0);v=wj();v["allow-top-navigation-by-user-activation"]&&X.set(1);v["allow-popups-to-escape-sandbox"]&&X.set(2);Ma.crypto&&Ma.crypto.subtle&&X.set(3);"TextDecoder"in Ma&&"TextEncoder"in Ma&&X.set(4);Ma=Gj(X);na.bc=Ma;na.bih=aa.height;na.biw=aa.width;na.brdim=t.join();
b=b.i;b=(na.vis=b.prerendering?3:{visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[b.visibilityState||b.webkitVisibilityState||b.mozVisibilityState||""]||0,na.wgl=!!rj.WebGLRenderingContext,na);c=d.call(c,e,b);c.ca_type="image";a&&(c.bid=a);return c}
var mm=new function(){var a=window.document;this.h=window;this.i=a};
D("yt.ads_.signals_.getAdSignalsString",function(a){return fm(lm(a))});Ya();navigator.userAgent.indexOf(" (CrKey ");var nm="XMLHttpRequest"in C?function(){return new XMLHttpRequest}:null;
function om(){if(!nm)return null;var a=nm();return"open"in a?a:null}
function pm(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function qm(a,b){typeof a==="function"&&(a=Yl(a));return window.setTimeout(a,b)}
;var rm="client_dev_domain client_dev_expflag client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" ");[].concat(ra(rm),["client_dev_set_cookie"]);function R(a){a=sm(a);return typeof a==="string"&&a==="false"?!1:!!a}
function tm(a,b){a=sm(a);return a===void 0&&b!==void 0?b:Number(a||0)}
function sm(a){return P("EXPERIMENT_FLAGS",{})[a]}
function um(){for(var a=[],b=P("EXPERIMENTS_FORCED_FLAGS",{}),c=z(Object.keys(b)),d=c.next();!d.done;d=c.next())d=d.value,a.push({key:d,value:String(b[d])});c=P("EXPERIMENT_FLAGS",{});d=z(Object.keys(c));for(var e=d.next();!e.done;e=d.next())e=e.value,e.startsWith("force_")&&b[e]===void 0&&a.push({key:e,value:String(c[e])});return a}
;var wm={Authorization:"AUTHORIZATION","X-Goog-EOM-Visitor-Id":"EOM_VISITOR_DATA","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-Youtube-Domain-Admin-State":"DOMAIN_ADMIN_STATE","X-Youtube-Chrome-Connected":"CHROME_CONNECTED_HEADER","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL",
"X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-Goog-AuthUser":"SESSION_INDEX","X-Goog-PageId":"DELEGATED_SESSION_ID"},xm="app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(ra(rm)),ym=!1;function zm(a,b,c,d,e,f,g,h){function k(){(l&&"readyState"in l?l.readyState:0)===4&&b&&Yl(b)(l)}
c=c===void 0?"GET":c;d=d===void 0?"":d;h=h===void 0?!1:h;var l=om();if(!l)return null;"onloadend"in l?l.addEventListener("loadend",k,!1):l.onreadystatechange=k;R("debug_forward_web_query_parameters")&&(a=Am(a));l.open(c,a,!0);f&&(l.responseType=f);g&&(l.withCredentials=!0);c=c==="POST"&&(window.FormData===void 0||!(d instanceof FormData));if(e=Bm(a,e))for(var m in e)l.setRequestHeader(m,e[m]),"content-type"===m.toLowerCase()&&(c=!1);c&&l.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(h&&"setAttributionReporting"in XMLHttpRequest.prototype){a={eventSourceEligible:!0,triggerEligible:!1};try{l.setAttributionReporting(a)}catch(n){$l(n)}}l.send(d);return l}
function Bm(a,b){b=b===void 0?{}:b;var c=km(a),d=P("INNERTUBE_CLIENT_NAME"),e=R("web_ajax_ignore_global_headers_if_set"),f;for(f in wm){var g=P(wm[f]),h=f==="X-Goog-AuthUser"||f==="X-Goog-PageId";f!=="X-Goog-Visitor-Id"||g||(g=P("VISITOR_DATA"));var k;if(!(k=!g)){if(!(k=c||(cc(a)?!1:!0))){k=a;var l;if(l=R("add_auth_headers_to_remarketing_google_dot_com_ping")&&f==="Authorization"&&(d==="TVHTML5"||d==="TVHTML5_UNPLUGGED"||d==="TVHTML5_SIMPLY"))l=cc(k),l=l!==null?l.split(".").reverse():null,l=l===null?
!1:l[1]==="google"?!0:l[2]==="google"?l[0]==="au"&&l[1]==="com"?!0:l[0]==="uk"&&l[1]==="co"?!0:!1:!1;l&&(k=ac(bc(5,k))||"",k=k.split("/"),k="/"+(k.length>1?k[1]:""),l=k==="/pagead");k=l?!0:!1}k=!k}k||e&&b[f]!==void 0||d==="TVHTML5_UNPLUGGED"&&h||(b[f]=g)}"X-Goog-EOM-Visitor-Id"in b&&"X-Goog-Visitor-Id"in b&&delete b["X-Goog-Visitor-Id"];if(c||!cc(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());if(c||!cc(a)){try{var m=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(n){}m&&
(b["X-YouTube-Time-Zone"]=m)}document.location.hostname.endsWith("youtubeeducation.com")||!c&&cc(a)||(b["X-YouTube-Ad-Signals"]=fm(lm()));return b}
function Cm(a,b){b.method="POST";b.postParams||(b.postParams={});return Dm(a,b)}
function Dm(a,b){var c=b.format||"JSON";a=Em(a,b);var d=Fm(a,b),e=!1,f=Gm(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);var l=pm(k),m=null,n=400<=k.status&&k.status<500,p=500<=k.status&&k.status<600;if(l||n||p)m=Hm(a,c,k,b.convertToSafeHtml);l&&(l=Im(c,k,m));m=m||{};n=b.context||C;l?b.onSuccess&&b.onSuccess.call(n,k,m):b.onError&&b.onError.call(n,k,m);b.onFinish&&b.onFinish.call(n,k,m)}},b.method,d,b.headers,b.responseType,b.withCredentials);
d=b.timeout||0;if(b.onTimeout&&d>0){var g=b.onTimeout;var h=qm(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||C,f))},d)}return f}
function Em(a,b){b.includeDomain&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=P("XSRF_FIELD_NAME");if(b=b.urlParams)b[c]&&delete b[c],a=im(a,b);return a}
function Fm(a,b){var c=P("XSRF_FIELD_NAME"),d=P("XSRF_TOKEN"),e=b.postBody||"",f=b.postParams,g=P("XSRF_FIELD_NAME"),h;b.headers&&(h=b.headers["Content-Type"]);b.excludeXsrf||cc(a)&&!b.withCredentials&&cc(a)!==document.location.hostname||b.method!=="POST"||h&&h!=="application/x-www-form-urlencoded"||b.postParams&&b.postParams[g]||(f||(f={}),f[c]=d);(R("ajax_parse_query_data_only_when_filled")&&f&&Object.keys(f).length>0||f)&&typeof e==="string"&&(e=gm(e),zg(e,f),e=b.postBodyFormat&&b.postBodyFormat===
"JSON"?JSON.stringify(e):hc(e));f=e||f&&!sg(f);!ym&&f&&b.method!=="POST"&&(ym=!0,Zl(Error("AJAX request with postData should use POST")));return e}
function Hm(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,$l(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&a.indexOf("json")>=0&&(f.substring(0,5)===")]}'\n"&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?Jm(a):null)e={},Nb(a.getElementsByTagName("*"),function(g){e[g.tagName]=Km(g)})}d&&Lm(e);
return e}
function Lm(a){if(Qa(a))for(var b in a){var c;(c=b==="html_content")||(c=b.length-5,c=c>=0&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];var e=jb();d=new Cb(e?e.createHTML(d):d);a[c]=d}else Lm(a[b])}}
function Im(a,b,c){if(b&&b.status===204)return!0;switch(a){case "JSON":return!!c;case "XML":return Number(c&&c.return_code)===0;case "RAW":return!0;default:return!!c}}
function Jm(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&a.length>0?a[0]:null:null}
function Km(a){var b="";Nb(a.childNodes,function(c){b+=c.nodeValue});
return b}
function Am(a){var b=window.location.search,c=cc(a);R("debug_handle_relative_url_for_query_forward_killswitch")||!c&&km(a)&&(c=document.location.hostname);var d=ac(bc(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=gm(b),f={};Nb(xm,function(g){e[g]&&(f[g]=e[g])});
return jm(a,f||{},!1)}
var Gm=zm;var Mm=[{Jc:function(a){return"Cannot read property '"+a.key+"'"},
lc:{Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}],TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]},{regexp:/(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,groups:["value","base","key"]}]}},{Jc:function(a){return"Cannot call '"+a.key+"'"},
lc:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}},{Jc:function(a){return a.key+" is not defined"},
lc:{ReferenceError:[{regexp:/(.*) is not defined/,groups:["key"]},{regexp:/Can't find variable: (.*)/,groups:["key"]}]}}];var Om={Wa:[],Qa:[{callback:Nm,weight:500}]};function Nm(a){if(a.name==="JavaException")return!0;a=a.stack;return a.includes("chrome://")||a.includes("chrome-extension://")||a.includes("moz-extension://")}
;function Pm(){this.Qa=[];this.Wa=[]}
var Qm;function Rm(){if(!Qm){var a=Qm=new Pm;a.Wa.length=0;a.Qa.length=0;Om.Wa&&a.Wa.push.apply(a.Wa,Om.Wa);Om.Qa&&a.Qa.push.apply(a.Qa,Om.Qa)}return Qm}
;var Sm=new M;function Tm(a){function b(){return a.charCodeAt(d++)}
var c=a.length,d=0;do{var e=Um(b);if(e===Infinity)break;var f=e>>3;switch(e&7){case 0:e=Um(b);if(f===2)return e;break;case 1:if(f===2)return;d+=8;break;case 2:e=Um(b);if(f===2)return a.substr(d,e);d+=e;break;case 5:if(f===2)return;d+=4;break;default:return}}while(d<c)}
function Um(a){var b=a(),c=b&127;if(b<128)return c;b=a();c|=(b&127)<<7;if(b<128)return c;b=a();c|=(b&127)<<14;if(b<128)return c;b=a();return b<128?c|(b&127)<<21:Infinity}
;function Vm(a,b,c,d){if(a)if(Array.isArray(a)){var e=d;for(d=0;d<a.length&&!(a[d]&&(e+=Wm(d,a[d],b,c),e>500));d++);d=e}else if(typeof a==="object")for(e in a){if(a[e]){var f=e;var g=a[e],h=b,k=c;f=typeof g!=="string"||f!=="clickTrackingParams"&&f!=="trackingParams"?0:(g=Tm(atob(g.replace(/-/g,"+").replace(/_/g,"/"))))?Wm(f+".ve",g,h,k):0;d+=f;d+=Wm(e,a[e],b,c);if(d>500)break}}else c[b]=Xm(a),d+=c[b].length;else c[b]=Xm(a),d+=c[b].length;return d}
function Wm(a,b,c,d){c+="."+a;a=Xm(b);d[c]=a;return c.length+a.length}
function Xm(a){try{return(typeof a==="string"?a:String(JSON.stringify(a))).substr(0,500)}catch(b){return"unable to serialize "+typeof a+" ("+b.message+")"}}
;function Ym(a){var b=this;this.i=void 0;this.h=!1;a.addEventListener("beforeinstallprompt",function(c){c.preventDefault();b.i=c});
a.addEventListener("appinstalled",function(){b.h=!0},{once:!0})}
function Zm(){if(!C.matchMedia)return"WEB_DISPLAY_MODE_UNKNOWN";try{return C.matchMedia("(display-mode: standalone)").matches?"WEB_DISPLAY_MODE_STANDALONE":C.matchMedia("(display-mode: minimal-ui)").matches?"WEB_DISPLAY_MODE_MINIMAL_UI":C.matchMedia("(display-mode: fullscreen)").matches?"WEB_DISPLAY_MODE_FULLSCREEN":C.matchMedia("(display-mode: browser)").matches?"WEB_DISPLAY_MODE_BROWSER":"WEB_DISPLAY_MODE_UNKNOWN"}catch(a){return"WEB_DISPLAY_MODE_UNKNOWN"}}
;function $m(){this.ff=!0}
function an(){$m.h||($m.h=new $m);return $m.h}
function bn(a,b){a={};var c=[];"USER_SESSION_ID"in Tl&&c.push({key:"u",value:P("USER_SESSION_ID")});if(c=hg(c))a.Authorization=c,c=b=b==null?void 0:b.sessionIndex,c===void 0&&(c=Number(P("SESSION_INDEX",0)),c=isNaN(c)?0:c),R("voice_search_auth_header_removal")||(a["X-Goog-AuthUser"]=c.toString()),"INNERTUBE_HOST_OVERRIDE"in Tl||(a["X-Origin"]=window.location.origin),b===void 0&&"DELEGATED_SESSION_ID"in Tl&&(a["X-Goog-PageId"]=P("DELEGATED_SESSION_ID"));return a}
;var cn={identityType:"UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"};function dn(a,b,c,d,e){eg.set(""+a,b,{Mb:c,path:"/",domain:d===void 0?"youtube.com":d,secure:e===void 0?!1:e})}
function en(a){return eg.get(""+a,void 0)}
function fn(a,b,c){eg.remove(""+a,b===void 0?"/":b,c===void 0?"youtube.com":c)}
function gn(){if(R("embeds_web_enable_cookie_detection_fix")){if(!C.navigator.cookieEnabled)return!1}else if(!eg.isEnabled())return!1;if(eg.h.cookie)return!0;R("embeds_web_enable_cookie_detection_fix")?eg.set("TESTCOOKIESENABLED","1",{Mb:60,Ne:"none",secure:!0}):eg.set("TESTCOOKIESENABLED","1",{Mb:60});if(eg.get("TESTCOOKIESENABLED")!=="1")return!1;eg.remove("TESTCOOKIESENABLED");return!0}
;var hn=E("ytglobal.prefsUserPrefsPrefs_")||{};D("ytglobal.prefsUserPrefsPrefs_",hn);function jn(){this.h=P("ALT_PREF_COOKIE_NAME","PREF");this.i=P("ALT_PREF_COOKIE_DOMAIN","youtube.com");var a=en(this.h);a&&this.parse(a)}
var kn;function ln(){kn||(kn=new jn);return kn}
r=jn.prototype;r.get=function(a,b){mn(a);nn(a);a=hn[a]!==void 0?hn[a].toString():null;return a!=null?a:b?b:""};
r.set=function(a,b){mn(a);nn(a);if(b==null)throw Error("ExpectedNotNull");hn[a]=b.toString()};
function on(a){return!!((pn("f"+(Math.floor(a/31)+1))||0)&1<<a%31)}
r.remove=function(a){mn(a);nn(a);delete hn[a]};
r.clear=function(){for(var a in hn)delete hn[a]};
function nn(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function mn(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function pn(a){a=hn[a]!==void 0?hn[a].toString():null;return a!=null&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
r.parse=function(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(hn[d]=c.toString())}};var qn={bluetooth:"CONN_DISCO",cellular:"CONN_CELLULAR_UNKNOWN",ethernet:"CONN_WIFI",none:"CONN_NONE",wifi:"CONN_WIFI",wimax:"CONN_CELLULAR_4G",other:"CONN_UNKNOWN",unknown:"CONN_UNKNOWN","slow-2g":"CONN_CELLULAR_2G","2g":"CONN_CELLULAR_2G","3g":"CONN_CELLULAR_3G","4g":"CONN_CELLULAR_4G"},rn={"slow-2g":"EFFECTIVE_CONNECTION_TYPE_SLOW_2G","2g":"EFFECTIVE_CONNECTION_TYPE_2G","3g":"EFFECTIVE_CONNECTION_TYPE_3G","4g":"EFFECTIVE_CONNECTION_TYPE_4G"};
function sn(){var a=C.navigator;return a?a.connection:void 0}
function tn(){var a=sn();if(a){var b=qn[a.type||"unknown"]||"CONN_UNKNOWN";a=qn[a.effectiveType||"unknown"]||"CONN_UNKNOWN";b==="CONN_CELLULAR_UNKNOWN"&&a!=="CONN_UNKNOWN"&&(b=a);if(b!=="CONN_UNKNOWN")return b;if(a!=="CONN_UNKNOWN")return a}}
function un(){var a=sn();if(a!=null&&a.effectiveType)return rn.hasOwnProperty(a.effectiveType)?rn[a.effectiveType]:"EFFECTIVE_CONNECTION_TYPE_UNKNOWN"}
;function S(a){var b=B.apply(1,arguments);var c=Error.call(this,a);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.args=[].concat(ra(b))}
w(S,Error);function vn(){try{return wn(),!0}catch(a){return!1}}
function wn(a){if(P("DATASYNC_ID")!==void 0)return P("DATASYNC_ID");throw new S("Datasync ID not set",a===void 0?"unknown":a);}
;function xn(){}
function yn(a,b){return Ej.Za(a,0,b)}
xn.prototype.pa=function(a,b){return this.Za(a,1,b)};
xn.prototype.Db=function(a){var b=E("yt.scheduler.instance.addImmediateJob");b?b(a):a()};var zn=tm("web_emulated_idle_callback_delay",300),An=1E3/60-3,Bn=[8,5,4,3,2,1,0];
function Cn(a){a=a===void 0?{}:a;G.call(this);this.i=[];this.j={};this.Y=this.h=0;this.X=this.u=!1;this.P=[];this.U=this.ga=!1;for(var b=z(Bn),c=b.next();!c.done;c=b.next())this.i[c.value]=[];this.o=0;this.yc=a.timeout||1;this.G=An;this.A=0;this.oa=this.De.bind(this);this.xc=this.jf.bind(this);this.Oa=this.Md.bind(this);this.Pa=this.ne.bind(this);this.mb=this.He.bind(this);this.Da=!!window.requestIdleCallback&&!!window.cancelIdleCallback&&!R("disable_scheduler_requestIdleCallback");(this.ia=a.useRaf!==
!1&&!!window.requestAnimationFrame)&&document.addEventListener("visibilitychange",this.oa)}
w(Cn,G);r=Cn.prototype;r.Db=function(a){var b=Ya();Dn(this,a);a=Ya()-b;this.u||(this.G-=a)};
r.Za=function(a,b,c){++this.Y;if(b===10)return this.Db(a),this.Y;var d=this.Y;this.j[d]=a;this.u&&!c?this.P.push({id:d,priority:b}):(this.i[b].push(d),this.X||this.u||(this.h!==0&&En(this)!==this.A&&this.stop(),this.start()));return d};
r.qa=function(a){delete this.j[a]};
function Fn(a){a.P.length=0;for(var b=5;b>=0;b--)a.i[b].length=0;a.i[8].length=0;a.j={};a.stop()}
r.isHidden=function(){return!!document.hidden||!1};
function Gn(a){return!a.isHidden()&&a.ia}
function En(a){if(a.i[8].length){if(a.U)return 4;if(Gn(a))return 3}for(var b=5;b>=a.o;b--)if(a.i[b].length>0)return b>0?Gn(a)?3:2:1;return 0}
r.Ea=function(a){var b=E("yt.logging.errors.log");b&&b(a)};
function Dn(a,b){try{b()}catch(c){a.Ea(c)}}
function Hn(a){for(var b=z(Bn),c=b.next();!c.done;c=b.next())if(a.i[c.value].length)return!0;return!1}
r.ne=function(a){var b=void 0;a&&(b=a.timeRemaining());this.ga=!0;In(this,b);this.ga=!1};
r.jf=function(){In(this)};
r.Md=function(){Jn(this)};
r.He=function(a){this.U=!0;var b=En(this);b===4&&b!==this.A&&(this.stop(),this.start());In(this,void 0,a);this.U=!1};
r.De=function(){this.isHidden()||Jn(this);this.h&&(this.stop(),this.start())};
function Jn(a){a.stop();a.u=!0;for(var b=Ya(),c=a.i[8];c.length;){var d=c.shift(),e=a.j[d];delete a.j[d];e&&Dn(a,e)}Kn(a);a.u=!1;Hn(a)&&a.start();b=Ya()-b;a.G-=b}
function Kn(a){for(var b=0,c=a.P.length;b<c;b++){var d=a.P[b];a.i[d.priority].push(d.id)}a.P.length=0}
function In(a,b,c){a.U&&a.A===4&&a.h||a.stop();a.u=!0;b=Ya()+(b||a.G);for(var d=a.i[5];d.length;){var e=d.shift(),f=a.j[e];delete a.j[e];if(f){e=a;try{f(c)}catch(l){e.Ea(l)}}}for(d=a.i[4];d.length;)c=d.shift(),f=a.j[c],delete a.j[c],f&&Dn(a,f);d=a.ga?0:1;d=a.o>d?a.o:d;if(!(Ya()>=b)){do{a:{c=a;f=d;for(e=3;e>=f;e--)for(var g=c.i[e];g.length;){var h=g.shift(),k=c.j[h];delete c.j[h];if(k){c=k;break a}}c=null}c&&Dn(a,c)}while(c&&Ya()<b)}a.u=!1;Kn(a);a.G=An;Hn(a)&&a.start()}
r.start=function(){this.X=!1;if(this.h===0)switch(this.A=En(this),this.A){case 1:var a=this.Pa;this.h=this.Da?window.requestIdleCallback(a,{timeout:3E3}):window.setTimeout(a,zn);break;case 2:this.h=window.setTimeout(this.xc,this.yc);break;case 3:this.h=window.requestAnimationFrame(this.mb);break;case 4:this.h=window.setTimeout(this.Oa,0)}};
r.pause=function(){this.stop();this.X=!0};
r.stop=function(){if(this.h){switch(this.A){case 1:var a=this.h;this.Da?window.cancelIdleCallback(a):window.clearTimeout(a);break;case 2:case 4:window.clearTimeout(this.h);break;case 3:window.cancelAnimationFrame(this.h)}this.h=0}};
r.aa=function(){Fn(this);this.stop();this.ia&&document.removeEventListener("visibilitychange",this.oa);G.prototype.aa.call(this)};var Ln=E("yt.scheduler.instance.timerIdMap_")||{},Mn=tm("kevlar_tuner_scheduler_soft_state_timer_ms",800),Nn=0,On=0;function Pn(){var a=E("ytglobal.schedulerInstanceInstance_");if(!a||a.da)a=new Cn(P("scheduler")||{}),D("ytglobal.schedulerInstanceInstance_",a);return a}
function Qn(){Rn();var a=E("ytglobal.schedulerInstanceInstance_");a&&(tc(a),D("ytglobal.schedulerInstanceInstance_",null))}
function Rn(){Fn(Pn());for(var a in Ln)Ln.hasOwnProperty(a)&&delete Ln[Number(a)]}
function Sn(a,b,c){if(!c)return c=c===void 0,-Pn().Za(a,b,c);var d=window.setTimeout(function(){var e=Pn().Za(a,b);Ln[d]=e},c);
return d}
function Tn(a){Pn().Db(a)}
function Un(a){var b=Pn();if(a<0)b.qa(-a);else{var c=Ln[a];c?(b.qa(c),delete Ln[a]):window.clearTimeout(a)}}
function Vn(){Wn()}
function Wn(){window.clearTimeout(Nn);Pn().start()}
function Xn(){Pn().pause();window.clearTimeout(Nn);Nn=window.setTimeout(Vn,Mn)}
function Yn(){window.clearTimeout(On);On=window.setTimeout(function(){Zn(0)},Mn)}
function Zn(a){Yn();var b=Pn();b.o=a;b.start()}
function $n(a){Yn();var b=Pn();b.o>a&&(b.o=a,b.start())}
function ao(){window.clearTimeout(On);var a=Pn();a.o=0;a.start()}
;function bo(){xn.apply(this,arguments)}
w(bo,xn);function co(){bo.h||(bo.h=new bo);return bo.h}
bo.prototype.Za=function(a,b,c){c!==void 0&&Number.isNaN(Number(c))&&(c=void 0);var d=E("yt.scheduler.instance.addJob");return d?d(a,b,c):c===void 0?(a(),NaN):qm(a,c||0)};
bo.prototype.qa=function(a){if(a===void 0||!Number.isNaN(Number(a))){var b=E("yt.scheduler.instance.cancelJob");b?b(a):window.clearTimeout(a)}};
bo.prototype.start=function(){var a=E("yt.scheduler.instance.start");a&&a()};
bo.prototype.pause=function(){var a=E("yt.scheduler.instance.pause");a&&a()};
var Ej=co();
R("web_scheduler_auto_init")&&!E("yt.scheduler.initialized")&&(D("yt.scheduler.instance.dispose",Qn),D("yt.scheduler.instance.addJob",Sn),D("yt.scheduler.instance.addImmediateJob",Tn),D("yt.scheduler.instance.cancelJob",Un),D("yt.scheduler.instance.cancelAllJobs",Rn),D("yt.scheduler.instance.start",Wn),D("yt.scheduler.instance.pause",Xn),D("yt.scheduler.instance.setPriorityThreshold",Zn),D("yt.scheduler.instance.enablePriorityThreshold",$n),D("yt.scheduler.instance.clearPriorityThreshold",ao),D("yt.scheduler.initialized",
!0));function eo(a){var b=new ek;this.h=(a=b.isAvailable()?a?new fk(b,a):b:null)?new Zj(a):null;this.i=document.domain||window.location.hostname}
eo.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.h)try{this.h.set(a,b,Date.now()+c*1E3);return}catch(f){}var e="";if(d)try{e=escape((new Ji).serialize(b))}catch(f){return}else e=escape(b);dn(a,e,c,this.i)};
eo.prototype.get=function(a,b){var c=void 0,d=!this.h;if(!d)try{c=this.h.get(a)}catch(e){d=!0}if(d&&(c=en(a))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
eo.prototype.remove=function(a){this.h&&this.h.remove(a);fn(a,"/",this.i)};var fo=function(){var a;return function(){a||(a=new eo("ytidb"));return a}}();
function go(){var a;return(a=fo())==null?void 0:a.get("LAST_RESULT_ENTRY_KEY",!0)}
;var ho=[],io,jo=!1;function ko(){var a={};for(io=new lo(a.handleError===void 0?mo:a.handleError,a.logEvent===void 0?no:a.logEvent);ho.length>0;)switch(a=ho.shift(),a.type){case "ERROR":io.Ea(a.payload);break;case "EVENT":io.logEvent(a.eventType,a.payload)}}
function oo(a){jo||(io?io.Ea(a):(ho.push({type:"ERROR",payload:a}),ho.length>10&&ho.shift()))}
function po(a,b){jo||(io?io.logEvent(a,b):(ho.push({type:"EVENT",eventType:a,payload:b}),ho.length>10&&ho.shift()))}
;function qo(a){if(a.indexOf(":")>=0)throw Error("Database name cannot contain ':'");}
function ro(a){return a.substr(0,a.indexOf(":"))||a}
;var so=bd||cd;function to(a){var b=Mc();return b?b.toLowerCase().indexOf(a)>=0:!1}
;var uo={},vo=(uo.AUTH_INVALID="No user identifier specified.",uo.EXPLICIT_ABORT="Transaction was explicitly aborted.",uo.IDB_NOT_SUPPORTED="IndexedDB is not supported.",uo.MISSING_INDEX="Index not created.",uo.MISSING_OBJECT_STORES="Object stores not created.",uo.DB_DELETED_BY_MISSING_OBJECT_STORES="Database is deleted because expected object stores were not created.",uo.DB_REOPENED_BY_MISSING_OBJECT_STORES="Database is reopened because expected object stores were not created.",uo.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",
uo.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",uo.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",uo.EXECUTE_TRANSACTION_ON_CLOSED_DB="Can't start a transaction on a closed database",uo.INCOMPATIBLE_DB_VERSION="The binary is incompatible with the database version",uo),wo={},xo=(wo.AUTH_INVALID="ERROR",wo.EXECUTE_TRANSACTION_ON_CLOSED_DB="WARNING",wo.EXPLICIT_ABORT="IGNORED",wo.IDB_NOT_SUPPORTED="ERROR",wo.MISSING_INDEX=
"WARNING",wo.MISSING_OBJECT_STORES="ERROR",wo.DB_DELETED_BY_MISSING_OBJECT_STORES="WARNING",wo.DB_REOPENED_BY_MISSING_OBJECT_STORES="WARNING",wo.QUOTA_EXCEEDED="WARNING",wo.QUOTA_MAYBE_EXCEEDED="WARNING",wo.UNKNOWN_ABORT="WARNING",wo.INCOMPATIBLE_DB_VERSION="WARNING",wo),yo={},zo=(yo.AUTH_INVALID=!1,yo.EXECUTE_TRANSACTION_ON_CLOSED_DB=!1,yo.EXPLICIT_ABORT=!1,yo.IDB_NOT_SUPPORTED=!1,yo.MISSING_INDEX=!1,yo.MISSING_OBJECT_STORES=!1,yo.DB_DELETED_BY_MISSING_OBJECT_STORES=!1,yo.DB_REOPENED_BY_MISSING_OBJECT_STORES=
!1,yo.QUOTA_EXCEEDED=!1,yo.QUOTA_MAYBE_EXCEEDED=!0,yo.UNKNOWN_ABORT=!0,yo.INCOMPATIBLE_DB_VERSION=!1,yo);function Ao(a,b,c,d,e){b=b===void 0?{}:b;c=c===void 0?vo[a]:c;d=d===void 0?xo[a]:d;e=e===void 0?zo[a]:e;S.call(this,c,Object.assign({},{name:"YtIdbKnownError",isSw:self.document===void 0,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;this.level=d;this.h=e;Object.setPrototypeOf(this,Ao.prototype)}
w(Ao,S);function Bo(a,b){Ao.call(this,"MISSING_OBJECT_STORES",{expectedObjectStores:b,foundObjectStores:a},vo.MISSING_OBJECT_STORES);Object.setPrototypeOf(this,Bo.prototype)}
w(Bo,Ao);function Co(a,b){var c=Error.call(this);this.message=c.message;"stack"in c&&(this.stack=c.stack);this.index=a;this.objectStore=b;Object.setPrototypeOf(this,Co.prototype)}
w(Co,Error);var Do=["The database connection is closing","Can't start a transaction on a closed database","A mutation operation was attempted on a database that did not allow mutations"];
function Eo(a,b,c,d){b=ro(b);var e=a instanceof Error?a:Error("Unexpected error: "+a);if(e instanceof Ao)return e;a={objectStoreNames:c,dbName:b,dbVersion:d};if(e.name==="QuotaExceededError")return new Ao("QUOTA_EXCEEDED",a);if(dd&&e.name==="UnknownError")return new Ao("QUOTA_MAYBE_EXCEEDED",a);if(e instanceof Co)return new Ao("MISSING_INDEX",Object.assign({},a,{objectStore:e.objectStore,index:e.index}));if(e.name==="InvalidStateError"&&Do.some(function(f){return e.message.includes(f)}))return new Ao("EXECUTE_TRANSACTION_ON_CLOSED_DB",
a);
if(e.name==="AbortError")return new Ao("UNKNOWN_ABORT",a,e.message);e.args=[Object.assign({},a,{name:"IdbError",qd:e.name})];e.level="WARNING";return e}
function Fo(a,b,c){var d=go();return new Ao("IDB_NOT_SUPPORTED",{context:{caller:a,publicName:b,version:c,hasSucceededOnce:d==null?void 0:d.hasSucceededOnce}})}
;function Go(a){if(!a)throw Error();throw a;}
function Ho(a){return a}
function Io(a){this.h=a}
function Jo(a){function b(e){if(d.state.status==="PENDING"){d.state={status:"REJECTED",reason:e};e=z(d.i);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
function c(e){if(d.state.status==="PENDING"){d.state={status:"FULFILLED",value:e};e=z(d.h);for(var f=e.next();!f.done;f=e.next())f=f.value,f()}}
var d=this;this.state={status:"PENDING"};this.h=[];this.i=[];a=a.h;try{a(c,b)}catch(e){b(e)}}
Jo.all=function(a){return new Jo(new Io(function(b,c){var d=[],e=a.length;e===0&&b(d);for(var f={tb:0};f.tb<a.length;f={tb:f.tb},++f.tb)Jo.resolve(a[f.tb]).then(function(g){return function(h){d[g.tb]=h;e--;e===0&&b(d)}}(f)).catch(function(g){c(g)})}))};
Jo.resolve=function(a){return new Jo(new Io(function(b,c){a instanceof Jo?a.then(b,c):b(a)}))};
Jo.reject=function(a){return new Jo(new Io(function(b,c){c(a)}))};
Jo.prototype.then=function(a,b){var c=this,d=a!=null?a:Ho,e=b!=null?b:Go;return new Jo(new Io(function(f,g){c.state.status==="PENDING"?(c.h.push(function(){Ko(c,c,d,f,g)}),c.i.push(function(){Lo(c,c,e,f,g)})):c.state.status==="FULFILLED"?Ko(c,c,d,f,g):c.state.status==="REJECTED"&&Lo(c,c,e,f,g)}))};
Jo.prototype.catch=function(a){return this.then(void 0,a)};
function Ko(a,b,c,d,e){try{if(a.state.status!=="FULFILLED")throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof Jo?Mo(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Lo(a,b,c,d,e){try{if(a.state.status!=="REJECTED")throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof Jo?Mo(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Mo(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof Jo?Mo(a,b,f,d,e):d(f)},function(f){e(f)})}
;function No(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Oo(a){return new Promise(function(b,c){No(a,b,c)})}
function Po(a){return new Jo(new Io(function(b,c){No(a,b,c)}))}
;function Qo(a,b){return new Jo(new Io(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()}))}
;var Ro=window,T=Ro.ytcsi&&Ro.ytcsi.now?Ro.ytcsi.now:Ro.performance&&Ro.performance.timing&&Ro.performance.now&&Ro.performance.timing.navigationStart?function(){return Ro.performance.timing.navigationStart+Ro.performance.now()}:function(){return(new Date).getTime()};function So(a,b){this.h=a;this.options=b;this.transactionCount=0;this.j=Math.round(T());this.i=!1}
r=So.prototype;r.add=function(a,b,c){return To(this,[a],{mode:"readwrite",ka:!0},function(d){return d.objectStore(a).add(b,c)})};
r.clear=function(a){return To(this,[a],{mode:"readwrite",ka:!0},function(b){return b.objectStore(a).clear()})};
r.close=function(){this.h.close();var a;((a=this.options)==null?0:a.closed)&&this.options.closed()};
r.count=function(a,b){return To(this,[a],{mode:"readonly",ka:!0},function(c){return c.objectStore(a).count(b)})};
function Uo(a,b,c){a=a.h.createObjectStore(b,c);return new Vo(a)}
r.delete=function(a,b){return To(this,[a],{mode:"readwrite",ka:!0},function(c){return c.objectStore(a).delete(b)})};
r.get=function(a,b){return To(this,[a],{mode:"readonly",ka:!0},function(c){return c.objectStore(a).get(b)})};
function Wo(a,b,c){return To(a,[b],{mode:"readwrite",ka:!0},function(d){d=d.objectStore(b);return Po(d.h.put(c,void 0))})}
r.objectStoreNames=function(){return Array.from(this.h.objectStoreNames)};
function To(a,b,c,d){var e,f,g,h,k,l,m,n,p,t,v,x;return A(function(y){switch(y.h){case 1:var F={mode:"readonly",ka:!1,tag:"IDB_TRANSACTION_TAG_UNKNOWN"};typeof c==="string"?F.mode=c:Object.assign(F,c);e=F;a.transactionCount++;f=e.ka?3:1;g=0;case 2:if(h){y.D(4);break}g++;k=Math.round(T());za(y,5);l=a.h.transaction(b,e.mode);F=y.yield;var I=new Xo(l);I=Yo(I,d);return F.call(y,I,7);case 7:return m=y.i,n=Math.round(T()),Zo(a,k,n,g,void 0,b.join(),e),y.return(m);case 5:p=Aa(y);t=Math.round(T());v=Eo(p,
a.h.name,b.join(),a.h.version);if((x=v instanceof Ao&&!v.h)||g>=f)Zo(a,k,t,g,v,b.join(),e),h=v;y.D(2);break;case 4:return y.return(Promise.reject(h))}})}
function Zo(a,b,c,d,e,f,g){b=c-b;e?(e instanceof Ao&&(e.type==="QUOTA_EXCEEDED"||e.type==="QUOTA_MAYBE_EXCEEDED")&&po("QUOTA_EXCEEDED",{dbName:ro(a.h.name),objectStoreNames:f,transactionCount:a.transactionCount,transactionMode:g.mode}),e instanceof Ao&&e.type==="UNKNOWN_ABORT"&&(c-=a.j,c<0&&c>=2147483648&&(c=0),po("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:f,transactionDuration:b,transactionCount:a.transactionCount,dbDuration:c}),a.i=!0),$o(a,!1,d,f,b,g.tag),oo(e)):$o(a,!0,d,f,b,g.tag)}
function $o(a,b,c,d,e,f){po("TRANSACTION_ENDED",{objectStoreNames:d,connectionHasUnknownAbortedTransaction:a.i,duration:e,isSuccessful:b,tryCount:c,tag:f===void 0?"IDB_TRANSACTION_TAG_UNKNOWN":f})}
r.getName=function(){return this.h.name};
function Vo(a){this.h=a}
r=Vo.prototype;r.add=function(a,b){return Po(this.h.add(a,b))};
r.autoIncrement=function(){return this.h.autoIncrement};
r.clear=function(){return Po(this.h.clear()).then(function(){})};
function ap(a,b,c){a.h.createIndex(b,c,{unique:!1})}
r.count=function(a){return Po(this.h.count(a))};
function bp(a,b){return cp(a,{query:b},function(c){return c.delete().then(function(){return dp(c)})}).then(function(){})}
r.delete=function(a){return a instanceof IDBKeyRange?bp(this,a):Po(this.h.delete(a))};
r.get=function(a){return Po(this.h.get(a))};
r.index=function(a){try{return new ep(this.h.index(a))}catch(b){if(b instanceof Error&&b.name==="NotFoundError")throw new Co(a,this.h.name);throw b;}};
r.getName=function(){return this.h.name};
r.keyPath=function(){return this.h.keyPath};
function cp(a,b,c){a=a.h.openCursor(b.query,b.direction);return fp(a).then(function(d){return Qo(d,c)})}
function Xo(a){var b=this;this.h=a;this.i=new Map;this.aborted=!1;this.done=new Promise(function(c,d){b.h.addEventListener("complete",function(){c()});
b.h.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.h.error)});
b.h.addEventListener("abort",function(){var e=b.h.error;if(e)d(e);else if(!b.aborted){e=Ao;for(var f=b.h.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(k===null)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e("UNKNOWN_ABORT",{objectStoreNames:g.join(),dbName:b.h.db.name,mode:b.h.mode});d(e)}})})}
function Yo(a,b){var c=new Promise(function(d,e){try{b(a).then(function(f){d(f)}).catch(e)}catch(f){e(f),a.abort()}});
return Promise.all([c,a.done]).then(function(d){return z(d).next().value})}
Xo.prototype.abort=function(){this.h.abort();this.aborted=!0;throw new Ao("EXPLICIT_ABORT");};
Xo.prototype.objectStore=function(a){a=this.h.objectStore(a);var b=this.i.get(a);b||(b=new Vo(a),this.i.set(a,b));return b};
function ep(a){this.h=a}
r=ep.prototype;r.count=function(a){return Po(this.h.count(a))};
r.delete=function(a){return gp(this,{query:a},function(b){return b.delete().then(function(){return dp(b)})})};
r.get=function(a){return Po(this.h.get(a))};
r.keyPath=function(){return this.h.keyPath};
r.unique=function(){return this.h.unique};
function gp(a,b,c){a=a.h.openCursor(b.query===void 0?null:b.query,b.direction===void 0?"next":b.direction);return fp(a).then(function(d){return Qo(d,c)})}
function hp(a,b){this.request=a;this.cursor=b}
function fp(a){return Po(a).then(function(b){return b?new hp(a,b):null})}
function dp(a){a.cursor.continue(void 0);return fp(a.request)}
hp.prototype.delete=function(){return Po(this.cursor.delete()).then(function(){})};
hp.prototype.getValue=function(){return this.cursor.value};
hp.prototype.update=function(a){return Po(this.cursor.update(a))};function ip(a,b,c){return new Promise(function(d,e){function f(){p||(p=new So(g.result,{closed:n}));return p}
var g=b!==void 0?self.indexedDB.open(a,b):self.indexedDB.open(a);var h=c.Pd,k=c.blocking,l=c.gf,m=c.upgrade,n=c.closed,p;g.addEventListener("upgradeneeded",function(t){try{if(t.newVersion===null)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(g.transaction===null)throw Error("Invariant: transaction on IDbOpenDbRequest is null");t.dataLoss&&t.dataLoss!=="none"&&po("IDB_DATA_CORRUPTED",{reason:t.dataLossMessage||"unknown reason",dbName:ro(a)});var v=f(),x=new Xo(g.transaction);
m&&m(v,function(y){return t.oldVersion<y&&t.newVersion>=y},x);
x.done.catch(function(y){e(y)})}catch(y){e(y)}});
g.addEventListener("success",function(){var t=g.result;k&&t.addEventListener("versionchange",function(){k(f())});
t.addEventListener("close",function(){po("IDB_UNEXPECTEDLY_CLOSED",{dbName:ro(a),dbVersion:t.version});l&&l()});
d(f())});
g.addEventListener("error",function(){e(g.error)});
h&&g.addEventListener("blocked",function(){h()})})}
function jp(a,b,c){c=c===void 0?{}:c;return ip(a,b,c)}
function kp(a,b){b=b===void 0?{}:b;var c,d,e,f;return A(function(g){if(g.h==1)return za(g,2),c=self.indexedDB.deleteDatabase(a),d=b,(e=d.Pd)&&c.addEventListener("blocked",function(){e()}),g.yield(Oo(c),4);
if(g.h!=2)g.h=0,g.o=0;else throw f=Aa(g),Eo(f,a,"",-1);})}
;function lp(a,b){this.name=a;this.options=b;this.j=!0;this.u=this.o=0}
lp.prototype.i=function(a,b,c){c=c===void 0?{}:c;return jp(a,b,c)};
lp.prototype.delete=function(a){a=a===void 0?{}:a;return kp(this.name,a)};
function mp(a,b){return new Ao("INCOMPATIBLE_DB_VERSION",{dbName:a.name,oldVersion:a.options.version,newVersion:b})}
function np(a,b){if(!b)throw Fo("openWithToken",ro(a.name));return a.open()}
lp.prototype.open=function(){function a(){var f,g,h,k,l,m,n,p,t,v;return A(function(x){switch(x.h){case 1:return g=(f=Error().stack)!=null?f:"",za(x,2),x.yield(c.i(c.name,c.options.version,e),4);case 4:for(var y=h=x.i,F=c.options,I=[],V=z(Object.keys(F.zb)),ia=V.next();!ia.done;ia=V.next()){ia=ia.value;var Ia=F.zb[ia],cb=Ia.Ie===void 0?Number.MAX_VALUE:Ia.Ie;!(y.h.version>=Ia.Fb)||y.h.version>=cb||y.h.objectStoreNames.contains(ia)||I.push(ia)}k=I;if(k.length===0){x.D(5);break}l=Object.keys(c.options.zb);
m=h.objectStoreNames();if(c.u<tm("ytidb_reopen_db_retries",0))return c.u++,h.close(),oo(new Ao("DB_REOPENED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:m})),x.return(a());if(!(c.o<tm("ytidb_remake_db_retries",1))){x.D(6);break}c.o++;return x.yield(c.delete(),7);case 7:return oo(new Ao("DB_DELETED_BY_MISSING_OBJECT_STORES",{dbName:c.name,expectedObjectStores:l,foundObjectStores:m})),x.return(a());case 6:throw new Bo(m,l);case 5:return x.return(h);case 2:n=Aa(x);
if(n instanceof DOMException?n.name!=="VersionError":"DOMError"in self&&n instanceof DOMError?n.name!=="VersionError":!(n instanceof Object&&"message"in n)||n.message!=="An attempt was made to open a database using a lower version than the existing version."){x.D(8);break}return x.yield(c.i(c.name,void 0,Object.assign({},e,{upgrade:void 0})),9);case 9:p=x.i;t=p.h.version;if(c.options.version!==void 0&&t>c.options.version+1)throw p.close(),c.j=!1,mp(c,t);return x.return(p);case 8:throw b(),n instanceof
Error&&!R("ytidb_async_stack_killswitch")&&(n.stack=n.stack+"\n"+g.substring(g.indexOf("\n")+1)),Eo(n,c.name,"",(v=c.options.version)!=null?v:-1);}})}
function b(){c.h===d&&(c.h=void 0)}
var c=this;if(!this.j)throw mp(this);if(this.h)return this.h;var d,e={blocking:function(f){f.close()},
closed:b,gf:b,upgrade:this.options.upgrade};return this.h=d=a()};var op=new lp("YtIdbMeta",{zb:{databases:{Fb:1}},upgrade:function(a,b){b(1)&&Uo(a,"databases",{keyPath:"actualName"})}});
function pp(a,b){var c;return A(function(d){if(d.h==1)return d.yield(np(op,b),2);c=d.i;return d.return(To(c,["databases"],{ka:!0,mode:"readwrite"},function(e){var f=e.objectStore("databases");return f.get(a.actualName).then(function(g){if(g?a.actualName!==g.actualName||a.publicName!==g.publicName||a.userIdentifier!==g.userIdentifier:1)return Po(f.h.put(a,void 0)).then(function(){})})}))})}
function qp(a,b){var c;return A(function(d){if(d.h==1)return a?d.yield(np(op,b),2):d.return();c=d.i;return d.return(c.delete("databases",a))})}
function rp(a,b){var c,d;return A(function(e){return e.h==1?(c=[],e.yield(np(op,b),2)):e.h!=3?(d=e.i,e.yield(To(d,["databases"],{ka:!0,mode:"readonly"},function(f){c.length=0;return cp(f.objectStore("databases"),{},function(g){a(g.getValue())&&c.push(g.getValue());return dp(g)})}),3)):e.return(c)})}
function sp(a){return rp(function(b){return b.publicName==="LogsDatabaseV2"&&b.userIdentifier!==void 0},a)}
function tp(a,b,c){return rp(function(d){return c?d.userIdentifier!==void 0&&!a.includes(d.userIdentifier)&&c.includes(d.publicName):d.userIdentifier!==void 0&&!a.includes(d.userIdentifier)},b)}
function up(a){var b,c;return A(function(d){if(d.h==1)return b=wn("YtIdbMeta hasAnyMeta other"),d.yield(rp(function(e){return e.userIdentifier!==void 0&&e.userIdentifier!==b},a),2);
c=d.i;return d.return(c.length>0)})}
;var vp,wp=new function(){}(new function(){});
function xp(){var a,b,c,d;return A(function(e){switch(e.h){case 1:a=go();if((b=a)==null?0:b.hasSucceededOnce)return e.return(!0);var f;if(f=so)f=/WebKit\/([0-9]+)/.exec(Mc()),f=!!(f&&parseInt(f[1],10)>=600);f&&(f=/WebKit\/([0-9]+)/.exec(Mc()),f=!(f&&parseInt(f[1],10)>=602));if(f||Yc)return e.return(!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return e.return(!1)}catch(g){return e.return(!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return e.return(!1);
za(e,2);d={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0};return e.yield(pp(d,wp),4);case 4:return e.yield(qp("yt-idb-test-do-not-use",wp),5);case 5:return e.return(!0);case 2:return Aa(e),e.return(!1)}})}
function yp(){if(vp!==void 0)return vp;jo=!0;return vp=xp().then(function(a){jo=!1;var b;if((b=fo())!=null&&b.h){var c;b={hasSucceededOnce:((c=go())==null?void 0:c.hasSucceededOnce)||a};var d;(d=fo())==null||d.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0)}return a})}
function zp(){return E("ytglobal.idbToken_")||void 0}
function Ap(){var a=zp();return a?Promise.resolve(a):yp().then(function(b){(b=b?wp:void 0)&&D("ytglobal.idbToken_",b);return b})}
;var Bp=0;function Cp(a,b){Bp||(Bp=Ej.pa(function(){var c,d,e,f,g;return A(function(h){switch(h.h){case 1:return h.yield(Ap(),2);case 2:c=h.i;if(!c)return h.return();d=!0;za(h,3);return h.yield(tp(a,c,b),5);case 5:e=h.i;if(!e.length){d=!1;h.D(6);break}f=e[0];return h.yield(kp(f.actualName),7);case 7:return h.yield(qp(f.actualName,c),6);case 6:h.h=4;h.o=0;break;case 3:g=Aa(h),oo(g),d=!1;case 4:Ej.qa(Bp),Bp=0,d&&Cp(a,b),h.h=0}})}))}
function Dp(){var a;return A(function(b){return b.h==1?b.yield(Ap(),2):(a=b.i)?b.return(up(a)):b.return(!1)})}
new oj;function Ep(a){if(!vn())throw a=new Ao("AUTH_INVALID",{dbName:a}),oo(a),a;var b=wn();return{actualName:a+":"+b,publicName:a,userIdentifier:b}}
function Fp(a,b,c,d){var e,f,g,h,k,l;return A(function(m){switch(m.h){case 1:return f=(e=Error().stack)!=null?e:"",m.yield(Ap(),2);case 2:g=m.i;if(!g)throw h=Fo("openDbImpl",a,b),R("ytidb_async_stack_killswitch")||(h.stack=h.stack+"\n"+f.substring(f.indexOf("\n")+1)),oo(h),h;qo(a);k=c?{actualName:a,publicName:a,userIdentifier:void 0}:Ep(a);za(m,3);return m.yield(pp(k,g),5);case 5:return m.yield(jp(k.actualName,b,d),6);case 6:return m.return(m.i);case 3:return l=Aa(m),za(m,7),m.yield(qp(k.actualName,
g),9);case 9:m.h=8;m.o=0;break;case 7:Aa(m);case 8:throw l;}})}
function Gp(a,b,c){c=c===void 0?{}:c;return Fp(a,b,!1,c)}
function Hp(a,b,c){c=c===void 0?{}:c;return Fp(a,b,!0,c)}
function Ip(a,b){b=b===void 0?{}:b;var c,d;return A(function(e){if(e.h==1)return e.yield(Ap(),2);if(e.h!=3){c=e.i;if(!c)return e.return();qo(a);d=Ep(a);return e.yield(kp(d.actualName,b),3)}return e.yield(qp(d.actualName,c),0)})}
function Jp(a,b,c){a=a.map(function(d){return A(function(e){return e.h==1?e.yield(kp(d.actualName,b),2):e.yield(qp(d.actualName,c),0)})});
return Promise.all(a).then(function(){})}
function Kp(){var a=a===void 0?{}:a;var b,c;return A(function(d){if(d.h==1)return d.yield(Ap(),2);if(d.h!=3){b=d.i;if(!b)return d.return();qo("LogsDatabaseV2");return d.yield(sp(b),3)}c=d.i;return d.yield(Jp(c,a,b),0)})}
function Lp(a,b){b=b===void 0?{}:b;var c;return A(function(d){if(d.h==1)return d.yield(Ap(),2);if(d.h!=3){c=d.i;if(!c)return d.return();qo(a);return d.yield(kp(a,b),3)}return d.yield(qp(a,c),0)})}
;function Mp(a,b){lp.call(this,a,b);this.options=b;qo(a)}
w(Mp,lp);function Np(a,b){var c;return function(){c||(c=new Mp(a,b));return c}}
Mp.prototype.i=function(a,b,c){c=c===void 0?{}:c;return(this.options.shared?Hp:Gp)(a,b,Object.assign({},c))};
Mp.prototype.delete=function(a){a=a===void 0?{}:a;return(this.options.shared?Lp:Ip)(this.name,a)};
function Op(a,b){return Np(a,b)}
;var Pp={},Qp=Op("ytGcfConfig",{zb:(Pp.coldConfigStore={Fb:1},Pp.hotConfigStore={Fb:1},Pp),shared:!1,upgrade:function(a,b){b(1)&&(ap(Uo(a,"hotConfigStore",{keyPath:"key",autoIncrement:!0}),"hotTimestampIndex","timestamp"),ap(Uo(a,"coldConfigStore",{keyPath:"key",autoIncrement:!0}),"coldTimestampIndex","timestamp"))},
version:1});function Rp(a){return np(Qp(),a)}
function Sp(a,b,c){var d,e,f;return A(function(g){switch(g.h){case 1:return d={config:a,hashData:b,timestamp:T()},g.yield(Rp(c),2);case 2:return e=g.i,g.yield(e.clear("hotConfigStore"),3);case 3:return g.yield(Wo(e,"hotConfigStore",d),4);case 4:return f=g.i,g.return(f)}})}
function Tp(a,b,c,d){var e,f,g;return A(function(h){switch(h.h){case 1:return e={config:a,hashData:b,configData:c,timestamp:T()},h.yield(Rp(d),2);case 2:return f=h.i,h.yield(f.clear("coldConfigStore"),3);case 3:return h.yield(Wo(f,"coldConfigStore",e),4);case 4:return g=h.i,h.return(g)}})}
function Up(a){var b,c;return A(function(d){return d.h==1?d.yield(Rp(a),2):d.h!=3?(b=d.i,c=void 0,d.yield(To(b,["coldConfigStore"],{mode:"readwrite",ka:!0},function(e){return gp(e.objectStore("coldConfigStore").index("coldTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
function Vp(a){var b,c;return A(function(d){return d.h==1?d.yield(Rp(a),2):d.h!=3?(b=d.i,c=void 0,d.yield(To(b,["hotConfigStore"],{mode:"readwrite",ka:!0},function(e){return gp(e.objectStore("hotConfigStore").index("hotTimestampIndex"),{direction:"prev"},function(f){c=f.getValue()})}),3)):d.return(c)})}
;function Wp(){G.call(this);this.i=[];this.h=[];var a=E("yt.gcf.config.hotUpdateCallbacks");a?(this.i=[].concat(ra(a)),this.h=a):(this.h=[],D("yt.gcf.config.hotUpdateCallbacks",this.h))}
w(Wp,G);Wp.prototype.aa=function(){for(var a=z(this.i),b=a.next();!b.done;b=a.next()){var c=this.h;b=c.indexOf(b.value);b>=0&&c.splice(b,1)}this.i.length=0;G.prototype.aa.call(this)};function Xp(){this.h=0;this.i=new Wp}
function Yp(){var a;return(a=E("yt.gcf.config.hotConfigGroup"))!=null?a:P("RAW_HOT_CONFIG_GROUP")}
function Zp(a,b,c){var d,e,f;return A(function(g){switch(g.h){case 1:if(!R("start_client_gcf")){g.D(0);break}c&&(a.j=c,D("yt.gcf.config.hotConfigGroup",a.j||null));a.o(b);d=zp();if(!d){g.D(3);break}if(c){g.D(4);break}return g.yield(Vp(d),5);case 5:e=g.i,c=(f=e)==null?void 0:f.config;case 4:return g.yield(Sp(c,b,d),3);case 3:if(c)for(var h=c,k=z(a.i.h),l=k.next();!l.done;l=k.next())l=l.value,l(h);g.h=0}})}
function $p(a,b,c){var d,e,f,g;return A(function(h){if(h.h==1){if(!R("start_client_gcf"))return h.D(0);a.coldHashData=b;D("yt.gcf.config.coldHashData",a.coldHashData||null);return(d=zp())?c?h.D(4):h.yield(Up(d),5):h.D(0)}h.h!=4&&(e=h.i,c=(f=e)==null?void 0:f.config);if(!c)return h.D(0);g=c.configData;return h.yield(Tp(c,b,g,d),0)})}
function aq(){if(!Xp.h){var a=new Xp;Xp.h=a}a=Xp.h;var b=T()-a.h;if(!(a.h!==0&&b<tm("send_config_hash_timer"))){b=E("yt.gcf.config.coldConfigData");var c=E("yt.gcf.config.hotHashData"),d=E("yt.gcf.config.coldHashData");b&&c&&d&&(a.h=T());return{coldConfigData:b,hotHashData:c,coldHashData:d}}}
Xp.prototype.o=function(a){this.hotHashData=a;D("yt.gcf.config.hotHashData",this.hotHashData||null)};function bq(){return"INNERTUBE_API_KEY"in Tl&&"INNERTUBE_API_VERSION"in Tl}
function cq(){return{innertubeApiKey:P("INNERTUBE_API_KEY"),innertubeApiVersion:P("INNERTUBE_API_VERSION"),oe:P("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),ld:P("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),rh:P("INNERTUBE_CONTEXT_CLIENT_NAME",1),innertubeContextClientVersion:P("INNERTUBE_CONTEXT_CLIENT_VERSION"),qe:P("INNERTUBE_CONTEXT_HL"),pe:P("INNERTUBE_CONTEXT_GL"),re:P("INNERTUBE_HOST_OVERRIDE")||"",se:!!P("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),sh:!!P("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:P("SERIALIZED_CLIENT_CONFIG_DATA")}}
function dq(a){var b={client:{hl:a.qe,gl:a.pe,clientName:a.ld,clientVersion:a.innertubeContextClientVersion,configInfo:a.oe}};navigator.userAgent&&(b.client.userAgent=String(navigator.userAgent));var c=C.devicePixelRatio;c&&c!=1&&(b.client.screenDensityFloat=String(c));c=P("EXPERIMENTS_TOKEN","");c!==""&&(b.client.experimentsToken=c);c=um();c.length>0&&(b.request={internalExperimentFlags:c});c=a.ld;if((c==="WEB"||c==="MWEB"||c===1||c===2)&&b){var d;b.client.mainAppWebInfo=(d=b.client.mainAppWebInfo)!=
null?d:{};b.client.mainAppWebInfo.webDisplayMode=Zm()}(d=E("yt.embedded_player.embed_url"))&&b&&(b.thirdParty={embedUrl:d});var e;if(R("web_log_memory_total_kbytes")&&((e=C.navigator)==null?0:e.deviceMemory)){var f;e=(f=C.navigator)==null?void 0:f.deviceMemory;b&&(b.client.memoryTotalKbytes=""+e*1E6)}a.appInstallData&&b&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);(a=tn())&&b&&(b.client.connectionType=a);R("web_log_effective_connection_type")&&
(a=un())&&b&&(b.client.effectiveConnectionType=a);R("start_client_gcf")&&(e=aq())&&(a=e.coldConfigData,f=e.coldHashData,e=e.hotHashData,b&&(b.client.configInfo=b.client.configInfo||{},a&&(b.client.configInfo.coldConfigData=a),f&&(b.client.configInfo.coldHashData=f),e&&(b.client.configInfo.hotHashData=e)));P("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(b.user={onBehalfOfUser:P("DELEGATED_SESSION_ID")});!R("fill_delegate_context_in_gel_killswitch")&&(a=P("INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT"))&&
(b.user=Object.assign({},b.user,{serializedDelegationContext:a}));a=P("INNERTUBE_CONTEXT");var g;if(R("enable_persistent_device_token")&&(a==null?0:(g=a.client)==null?0:g.rolloutToken)){var h;b.client.rolloutToken=a==null?void 0:(h=a.client)==null?void 0:h.rolloutToken}g=Object;h=g.assign;a=b.client;f={};e=z(Object.entries(gm(P("DEVICE",""))));for(d=e.next();!d.done;d=e.next())c=z(d.value),d=c.next().value,c=c.next().value,d==="cbrand"?f.deviceMake=c:d==="cmodel"?f.deviceModel=c:d==="cbr"?f.browserName=
c:d==="cbrver"?f.browserVersion=c:d==="cos"?f.osName=c:d==="cosver"?f.osVersion=c:d==="cplatform"&&(f.platform=c);b.client=h.call(g,a,f);return b}
function eq(a,b,c){c=c===void 0?{}:c;var d={};P("EOM_VISITOR_DATA")?d={"X-Goog-EOM-Visitor-Id":P("EOM_VISITOR_DATA")}:d={"X-Goog-Visitor-Id":c.visitorData||P("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;b=c.authorization||P("AUTHORIZATION");b||(a?b="Bearer "+E("gapi.auth.getToken")().hh:(a=bn(an()),R("pageid_as_header_web")||delete a["X-Goog-PageId"],d=Object.assign({},d,a)));b&&(d.Authorization=b);return d}
;var fq=typeof TextEncoder!=="undefined"?new TextEncoder:null,gq=fq?function(a){return fq.encode(a)}:function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);
e<128?b[c++]=e:(e<2048?b[c++]=e>>6|192:((e&64512)==55296&&d+1<a.length&&(a.charCodeAt(d+1)&64512)==56320?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}a=new Uint8Array(b.length);for(c=0;c<a.length;c++)a[c]=b[c];return a};function hq(a,b){this.version=a;this.args=b}
hq.prototype.serialize=function(){return{version:this.version,args:this.args}};function iq(a,b){this.topic=a;this.h=b}
iq.prototype.toString=function(){return this.topic};var jq=E("ytPubsub2Pubsub2Instance")||new M;M.prototype.subscribe=M.prototype.subscribe;M.prototype.unsubscribeByKey=M.prototype.Tb;M.prototype.publish=M.prototype.lb;M.prototype.clear=M.prototype.clear;D("ytPubsub2Pubsub2Instance",jq);var kq=E("ytPubsub2Pubsub2SubscribedKeys")||{};D("ytPubsub2Pubsub2SubscribedKeys",kq);var lq=E("ytPubsub2Pubsub2TopicToKeys")||{};D("ytPubsub2Pubsub2TopicToKeys",lq);var mq=E("ytPubsub2Pubsub2IsAsync")||{};D("ytPubsub2Pubsub2IsAsync",mq);
D("ytPubsub2Pubsub2SkipSubKey",null);function nq(a,b){var c=oq();c&&c.publish.call(c,a.toString(),a,b)}
function pq(a){var b=qq,c=oq();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=E("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(kq[d])try{if(f&&b instanceof iq&&b!=e)try{var h=b.h,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.Ed){var l=new h;h.Ed=l.version}var m=h.Ed}catch(y){}if(!m||k.version!=m)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{m=Reflect;var n=m.construct;
var p=k.args,t=p.length;if(t>0){var v=Array(t);for(k=0;k<t;k++)v[k]=p[k];var x=v}else x=[];f=n.call(m,h,x)}catch(y){throw y.message="yt.pubsub2.Data.deserialize(): "+y.message,y;}}catch(y){throw y.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+y.message,y;}a.call(window,f)}catch(y){Zl(y)}},mq[b.toString()]?E("yt.scheduler.instance")?Ej.pa(g):qm(g,0):g())});
kq[d]=!0;lq[b.toString()]||(lq[b.toString()]=[]);lq[b.toString()].push(d);return d}
function rq(){var a=sq,b=pq(function(c){a.apply(void 0,arguments);tq(b)});
return b}
function tq(a){var b=oq();b&&(typeof a==="number"&&(a=[a]),Nb(a,function(c){b.unsubscribeByKey(c);delete kq[c]}))}
function oq(){return E("ytPubsub2Pubsub2Instance")}
;function uq(a,b,c){c=c===void 0?{sampleRate:.1}:c;Math.random()<Math.min(.02,c.sampleRate/100)&&nq("meta_logging_csi_event",{timerName:a,Kh:b})}
;var vq=void 0,wq=void 0;function xq(){wq||(wq=sl(P("WORKER_SERIALIZATION_URL")));return wq||void 0}
function yq(){var a=xq();vq||a===void 0||(vq=new Worker(mb(a),void 0));return vq}
;var zq=tm("max_body_size_to_compress",5E5),Aq=tm("min_body_size_to_compress",500),Bq=!0,Cq=0,Dq=0,Eq=tm("compression_performance_threshold_lr",250),Fq=tm("slow_compressions_before_abandon_count",4),Gq=!1,Hq=new Map,Iq=1,Jq=!0;function Kq(){if(typeof Worker==="function"&&xq()&&!Gq){var a=function(c){c=c.data;if(c.op==="gzippedGelBatch"){var d=Hq.get(c.key);d&&(Lq(c.gzippedBatch,d.latencyPayload,d.url,d.options,d.sendFn),Hq.delete(c.key))}},b=yq();
b&&(b.addEventListener("message",a),b.onerror=function(){Hq.clear()},Gq=!0)}}
function Mq(a,b,c,d,e){e=e===void 0?!1:e;var f={startTime:T(),ticks:{},infos:{}};if(Bq)try{var g=Nq(b);if(g!=null&&(g>zq||g<Aq))d(a,c);else{if(R("gzip_gel_with_worker")&&(R("initial_gzip_use_main_thread")&&!Jq||!R("initial_gzip_use_main_thread"))){Gq||Kq();var h=yq();if(h&&!e){Hq.set(Iq,{latencyPayload:f,url:a,options:c,sendFn:d});h.postMessage({op:"gelBatchToGzip",serializedBatch:b,key:Iq});Iq++;return}}var k=rl(gq(b));Lq(k,f,a,c,d)}}catch(l){$l(l),d(a,c)}else d(a,c)}
function Lq(a,b,c,d,e){Jq=!1;var f=T();b.ticks.gelc=f;Dq++;R("disable_compression_due_to_performance_degredation")&&f-b.startTime>=Eq&&(Cq++,R("abandon_compression_after_N_slow_zips")?Dq===tm("compression_disable_point")&&Cq>Fq&&(Bq=!1):Bq=!1);Oq(b);d.headers||(d.headers={});d.headers["Content-Encoding"]="gzip";d.postBody=a;d.postParams=void 0;e(c,d)}
function Pq(a){var b=b===void 0?!1:b;var c=c===void 0?!1:c;var d=T(),e={startTime:d,ticks:{},infos:{}},f=b?E("yt.logging.gzipForFetch",!1):!0;if(Bq&&f){if(!a.body)return a;try{var g=c?a.body:typeof a.body==="string"?a.body:JSON.stringify(a.body);f=g;if(!c&&typeof g==="string"){var h=Nq(g);if(h!=null&&(h>zq||h<Aq))return a;c=b?{level:1}:void 0;f=rl(gq(g),c);var k=T();e.ticks.gelc=k;if(b){Dq++;if((R("disable_compression_due_to_performance_degredation")||R("disable_compression_due_to_performance_degradation_lr"))&&
k-d>=Eq)if(Cq++,R("abandon_compression_after_N_slow_zips")||R("abandon_compression_after_N_slow_zips_lr")){b=Cq/Dq;var l=Fq/tm("compression_disable_point");Dq>0&&Dq%tm("compression_disable_point")===0&&b>=l&&(Bq=!1)}else Bq=!1;Oq(e)}}a.headers=Object.assign({},{"Content-Encoding":"gzip"},a.headers||{});a.body=f;return a}catch(m){return $l(m),a}}else return a}
function Nq(a){try{return(new Blob(a.split(""))).size}catch(b){return $l(b),null}}
function Oq(a){R("gel_compression_csi_killswitch")||!R("log_gel_compression_latency")&&!R("log_gel_compression_latency_lr")||uq("gel_compression",a,{sampleRate:.1})}
;function Qq(a){a=Object.assign({},a);delete a.Authorization;var b=hg();if(b){var c=new Ij;c.update(P("INNERTUBE_API_KEY"));c.update(b);a.hash=gd(c.digest(),3)}return a}
;var Rq;function Sq(){Rq||(Rq=new eo("yt.innertube"));return Rq}
function Tq(a,b,c,d){if(d)return null;d=Sq().get("nextId",!0)||1;var e=Sq().get("requests",!0)||{};e[d]={method:a,request:b,authState:Qq(c),requestTime:Math.round(T())};Sq().set("nextId",d+1,86400,!0);Sq().set("requests",e,86400,!0);return d}
function Uq(a){var b=Sq().get("requests",!0)||{};delete b[a];Sq().set("requests",b,86400,!0)}
function Vq(a){var b=Sq().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(Math.round(T())-d.requestTime<6E4)){var e=d.authState,f=Qq(eq(!1));vg(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(T())),Wq(a,d.method,e,{}));delete b[c]}}Sq().set("requests",b,86400,!0)}}
;function Xq(a){this.Wb=this.h=!1;this.potentialEsfErrorCounter=this.i=0;this.handleError=function(){};
this.rb=function(){};
this.now=Date.now;this.Ib=!1;var b;this.Ad=(b=a.Ad)!=null?b:100;var c;this.vd=(c=a.vd)!=null?c:1;var d;this.td=(d=a.td)!=null?d:2592E6;var e;this.sd=(e=a.sd)!=null?e:12E4;var f;this.ud=(f=a.ud)!=null?f:5E3;var g;this.V=(g=a.V)!=null?g:void 0;this.cc=!!a.cc;var h;this.Zb=(h=a.Zb)!=null?h:.1;var k;this.oc=(k=a.oc)!=null?k:10;a.handleError&&(this.handleError=a.handleError);a.rb&&(this.rb=a.rb);a.Ib&&(this.Ib=a.Ib);a.Wb&&(this.Wb=a.Wb);this.W=a.W;this.Ba=a.Ba;this.fa=a.fa;this.ea=a.ea;this.sendFn=a.sendFn;
this.Pc=a.Pc;this.Mc=a.Mc;Yq(this)&&(!this.W||this.W("networkless_logging"))&&Zq(this)}
function Zq(a){Yq(a)&&!a.Ib&&(a.h=!0,a.cc&&Math.random()<=a.Zb&&a.fa.Rd(a.V),$q(a),a.ea.va()&&a.Sb(),a.ea.listen(a.Pc,a.Sb.bind(a)),a.ea.listen(a.Mc,a.Zc.bind(a)))}
r=Xq.prototype;r.writeThenSend=function(a,b){var c=this;b=b===void 0?{}:b;if(Yq(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.fa.set(d,this.V).then(function(e){d.id=e;c.ea.va()&&ar(c,d)}).catch(function(e){ar(c,d);
br(c,e)})}else this.sendFn(a,b)};
r.sendThenWrite=function(a,b,c){var d=this;b=b===void 0?{}:b;if(Yq(this)&&this.h){var e={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0};this.W&&this.W("nwl_skip_retry")&&(e.skipRetry=c);if(this.ea.va()||this.W&&this.W("nwl_aggressive_send_then_write")&&!e.skipRetry){if(!e.skipRetry){var f=b.onError?b.onError:function(){};
b.onError=function(g,h){return A(function(k){if(k.h==1)return k.yield(d.fa.set(e,d.V).catch(function(l){br(d,l)}),2);
f(g,h);k.h=0})}}this.sendFn(a,b,e.skipRetry)}else this.fa.set(e,this.V).catch(function(g){d.sendFn(a,b,e.skipRetry);
br(d,g)})}else this.sendFn(a,b,this.W&&this.W("nwl_skip_retry")&&c)};
r.sendAndWrite=function(a,b){var c=this;b=b===void 0?{}:b;if(Yq(this)&&this.h){var d={url:a,options:b,timestamp:this.now(),status:"NEW",sendCount:0},e=!1,f=b.onSuccess?b.onSuccess:function(){};
d.options.onSuccess=function(g,h){d.id!==void 0?c.fa.pb(d.id,c.V):e=!0;c.ea.eb&&c.W&&c.W("vss_network_hint")&&c.ea.eb(!0);f(g,h)};
this.sendFn(d.url,d.options,void 0,!0);this.fa.set(d,this.V).then(function(g){d.id=g;e&&c.fa.pb(d.id,c.V)}).catch(function(g){br(c,g)})}else this.sendFn(a,b,void 0,!0)};
r.Sb=function(){var a=this;if(!Yq(this))throw Error("IndexedDB is not supported: throttleSend");this.i||(this.i=this.Ba.pa(function(){var b;return A(function(c){if(c.h==1)return c.yield(a.fa.hd("NEW",a.V),2);if(c.h!=3)return b=c.i,b?c.yield(ar(a,b),3):(a.Zc(),c.return());a.i&&(a.i=0,a.Sb());c.h=0})},this.Ad))};
r.Zc=function(){this.Ba.qa(this.i);this.i=0};
function ar(a,b){var c;return A(function(d){switch(d.h){case 1:if(!Yq(a))throw Error("IndexedDB is not supported: immediateSend");if(b.id===void 0){d.D(2);break}return d.yield(a.fa.we(b.id,a.V),3);case 3:(c=d.i)||a.rb(Error("The request cannot be found in the database."));case 2:if(cr(a,b,a.td)){d.D(4);break}a.rb(Error("Networkless Logging: Stored logs request expired age limit"));if(b.id===void 0){d.D(5);break}return d.yield(a.fa.pb(b.id,a.V),5);case 5:return d.return();case 4:b.skipRetry||(b=dr(a,
b));if(!b){d.D(0);break}if(!b.skipRetry||b.id===void 0){d.D(8);break}return d.yield(a.fa.pb(b.id,a.V),8);case 8:a.sendFn(b.url,b.options,!!b.skipRetry),d.h=0}})}
function dr(a,b){if(!Yq(a))throw Error("IndexedDB is not supported: updateRequestHandlers");var c=b.options.onError?b.options.onError:function(){};
b.options.onError=function(e,f){var g,h,k,l;return A(function(m){switch(m.h){case 1:g=er(f);(h=fr(f))&&a.W&&a.W("web_enable_error_204")&&a.handleError(Error("Request failed due to compression"),b.url,f);if(!(a.W&&a.W("nwl_consider_error_code")&&g||a.W&&!a.W("nwl_consider_error_code")&&a.potentialEsfErrorCounter<=a.oc)){m.D(2);break}if(!a.ea.vc){m.D(3);break}return m.yield(a.ea.vc(),3);case 3:if(a.ea.va()){m.D(2);break}c(e,f);if(!a.W||!a.W("nwl_consider_error_code")||((k=b)==null?void 0:k.id)===void 0){m.D(6);
break}return m.yield(a.fa.Qc(b.id,a.V,!1),6);case 6:return m.return();case 2:if(a.W&&a.W("nwl_consider_error_code")&&!g&&a.potentialEsfErrorCounter>a.oc)return m.return();a.potentialEsfErrorCounter++;if(((l=b)==null?void 0:l.id)===void 0){m.D(8);break}return b.sendCount<a.vd?m.yield(a.fa.Qc(b.id,a.V,!0,h?!1:void 0),12):m.yield(a.fa.pb(b.id,a.V),8);case 12:a.Ba.pa(function(){a.ea.va()&&a.Sb()},a.ud);
case 8:c(e,f),m.h=0}})};
var d=b.options.onSuccess?b.options.onSuccess:function(){};
b.options.onSuccess=function(e,f){var g;return A(function(h){if(h.h==1)return((g=b)==null?void 0:g.id)===void 0?h.D(2):h.yield(a.fa.pb(b.id,a.V),2);a.ea.eb&&a.W&&a.W("vss_network_hint")&&a.ea.eb(!0);d(e,f);h.h=0})};
return b}
function cr(a,b,c){b=b.timestamp;return a.now()-b>=c?!1:!0}
function $q(a){if(!Yq(a))throw Error("IndexedDB is not supported: retryQueuedRequests");a.fa.hd("QUEUED",a.V).then(function(b){b&&!cr(a,b,a.sd)?a.Ba.pa(function(){return A(function(c){if(c.h==1)return b.id===void 0?c.D(2):c.yield(a.fa.Qc(b.id,a.V),2);$q(a);c.h=0})}):a.ea.va()&&a.Sb()})}
function br(a,b){a.Hd&&!a.ea.va()?a.Hd(b):a.handleError(b)}
function Yq(a){return!!a.V||a.Wb}
function er(a){var b;return(a=a==null?void 0:(b=a.error)==null?void 0:b.code)&&a>=400&&a<=599?!1:!0}
function fr(a){var b;a=a==null?void 0:(b=a.error)==null?void 0:b.code;return!(a!==400&&a!==415)}
;var gr;
function hr(){if(gr)return gr();var a={};gr=Op("LogsDatabaseV2",{zb:(a.LogsRequestsStore={Fb:2},a),shared:!1,upgrade:function(b,c,d){c(2)&&Uo(b,"LogsRequestsStore",{keyPath:"id",autoIncrement:!0});c(3);c(5)&&(d=d.objectStore("LogsRequestsStore"),d.h.indexNames.contains("newRequest")&&d.h.deleteIndex("newRequest"),ap(d,"newRequestV2",["status","interface","timestamp"]));c(7)&&b.h.objectStoreNames.contains("sapisid")&&b.h.deleteObjectStore("sapisid");c(9)&&b.h.objectStoreNames.contains("SWHealthLog")&&b.h.deleteObjectStore("SWHealthLog")},
version:9});return gr()}
;function ir(a){return np(hr(),a)}
function jr(a,b){var c,d,e,f;return A(function(g){if(g.h==1)return c={startTime:T(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_WRITE"},ticks:{}},g.yield(ir(b),2);if(g.h!=3)return d=g.i,e=Object.assign({},a,{options:JSON.parse(JSON.stringify(a.options)),interface:P("INNERTUBE_CONTEXT_CLIENT_NAME",0)}),g.yield(Wo(d,"LogsRequestsStore",e),3);f=g.i;c.ticks.tc=T();kr(c);return g.return(f)})}
function lr(a,b){var c,d,e,f,g,h,k,l;return A(function(m){if(m.h==1)return c={startTime:T(),infos:{transactionType:"YT_IDB_TRANSACTION_TYPE_READ"},ticks:{}},m.yield(ir(b),2);if(m.h!=3)return d=m.i,e=P("INNERTUBE_CONTEXT_CLIENT_NAME",0),f=[a,e,0],g=[a,e,T()],h=IDBKeyRange.bound(f,g),k="prev",R("use_fifo_for_networkless")&&(k="next"),l=void 0,m.yield(To(d,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(n){return gp(n.objectStore("LogsRequestsStore").index("newRequestV2"),{query:h,direction:k},
function(p){p.getValue()&&(l=p.getValue(),a==="NEW"&&(l.status="QUEUED",p.update(l)))})}),3);
c.ticks.tc=T();kr(c);return m.return(l)})}
function mr(a,b){var c;return A(function(d){if(d.h==1)return d.yield(ir(b),2);c=d.i;return d.return(To(c,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(e){var f=e.objectStore("LogsRequestsStore");return f.get(a).then(function(g){if(g)return g.status="QUEUED",Po(f.h.put(g,void 0)).then(function(){return g})})}))})}
function nr(a,b,c,d){c=c===void 0?!0:c;var e;return A(function(f){if(f.h==1)return f.yield(ir(b),2);e=f.i;return f.return(To(e,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(g){var h=g.objectStore("LogsRequestsStore");return h.get(a).then(function(k){return k?(k.status="NEW",c&&(k.sendCount+=1),d!==void 0&&(k.options.compress=d),Po(h.h.put(k,void 0)).then(function(){return k})):Jo.resolve(void 0)})}))})}
function or(a,b){var c;return A(function(d){if(d.h==1)return d.yield(ir(b),2);c=d.i;return d.return(c.delete("LogsRequestsStore",a))})}
function pr(a){var b,c;return A(function(d){if(d.h==1)return d.yield(ir(a),2);b=d.i;c=T()-2592E6;return d.yield(To(b,["LogsRequestsStore"],{mode:"readwrite",ka:!0},function(e){return cp(e.objectStore("LogsRequestsStore"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return dp(f)})})}),0)})}
function qr(){A(function(a){return a.yield(Kp(),0)})}
function kr(a){R("nwl_csi_killswitch")||uq("networkless_performance",a,{sampleRate:1})}
;var rr={accountStateChangeSignedIn:23,accountStateChangeSignedOut:24,delayedEventMetricCaptured:11,latencyActionBaselined:6,latencyActionInfo:7,latencyActionTicked:5,offlineTransferStatusChanged:2,offlineImageDownload:335,playbackStartStateChanged:9,systemHealthCaptured:3,mangoOnboardingCompleted:10,mangoPushNotificationReceived:230,mangoUnforkDbMigrationError:121,mangoUnforkDbMigrationSummary:122,mangoUnforkDbMigrationPreunforkDbVersionNumber:133,mangoUnforkDbMigrationPhoneMetadata:134,mangoUnforkDbMigrationPhoneStorage:135,
mangoUnforkDbMigrationStep:142,mangoAsyncApiMigrationEvent:223,mangoDownloadVideoResult:224,mangoHomepageVideoCount:279,mangoHomeV3State:295,mangoImageClientCacheHitEvent:273,sdCardStatusChanged:98,framesDropped:12,thumbnailHovered:13,deviceRetentionInfoCaptured:14,thumbnailLoaded:15,backToAppEvent:318,streamingStatsCaptured:17,offlineVideoShared:19,appCrashed:20,youThere:21,offlineStateSnapshot:22,mdxSessionStarted:25,mdxSessionConnected:26,mdxSessionDisconnected:27,bedrockResourceConsumptionSnapshot:28,
nextGenWatchWatchSwiped:29,kidsAccountsSnapshot:30,zeroStepChannelCreated:31,tvhtml5SearchCompleted:32,offlineSharePairing:34,offlineShareUnlock:35,mdxRouteDistributionSnapshot:36,bedrockRepetitiveActionTimed:37,unpluggedDegradationInfo:229,uploadMp4HeaderMoved:38,uploadVideoTranscoded:39,uploadProcessorStarted:46,uploadProcessorEnded:47,uploadProcessorReady:94,uploadProcessorRequirementPending:95,uploadProcessorInterrupted:96,uploadFrontendEvent:241,assetPackDownloadStarted:41,assetPackDownloaded:42,
assetPackApplied:43,assetPackDeleted:44,appInstallAttributionEvent:459,playbackSessionStopped:45,adBlockerMessagingShown:48,distributionChannelCaptured:49,dataPlanCpidRequested:51,detailedNetworkTypeCaptured:52,sendStateUpdated:53,receiveStateUpdated:54,sendDebugStateUpdated:55,receiveDebugStateUpdated:56,kidsErrored:57,mdxMsnSessionStatsFinished:58,appSettingsCaptured:59,mdxWebSocketServerHttpError:60,mdxWebSocketServer:61,startupCrashesDetected:62,coldStartInfo:435,offlinePlaybackStarted:63,liveChatMessageSent:225,
liveChatUserPresent:434,liveChatBeingModerated:457,liveCreationCameraUpdated:64,liveCreationEncodingCaptured:65,liveCreationError:66,liveCreationHealthUpdated:67,liveCreationVideoEffectsCaptured:68,liveCreationStageOccured:75,liveCreationBroadcastScheduled:123,liveCreationArchiveReplacement:149,liveCreationCostreamingConnection:421,liveCreationStreamWebrtcStats:288,mdxSessionRecoveryStarted:69,mdxSessionRecoveryCompleted:70,mdxSessionRecoveryStopped:71,visualElementShown:72,visualElementHidden:73,
visualElementGestured:78,visualElementStateChanged:208,screenCreated:156,playbackAssociated:202,visualElementAttached:215,playbackContextEvent:214,cloudCastingPlaybackStarted:74,webPlayerApiCalled:76,tvhtml5AccountDialogOpened:79,foregroundHeartbeat:80,foregroundHeartbeatScreenAssociated:111,kidsOfflineSnapshot:81,mdxEncryptionSessionStatsFinished:82,playerRequestCompleted:83,liteSchedulerStatistics:84,mdxSignIn:85,spacecastMetadataLookupRequested:86,spacecastBatchLookupRequested:87,spacecastSummaryRequested:88,
spacecastPlayback:89,spacecastDiscovery:90,tvhtml5LaunchUrlComponentChanged:91,mdxBackgroundPlaybackRequestCompleted:92,mdxBrokenAdditionalDataDeviceDetected:93,tvhtml5LocalStorage:97,tvhtml5DeviceStorageStatus:147,autoCaptionsAvailable:99,playbackScrubbingEvent:339,flexyState:100,interfaceOrientationCaptured:101,mainAppBrowseFragmentCache:102,offlineCacheVerificationFailure:103,offlinePlaybackExceptionDigest:217,vrCopresenceStats:104,vrCopresenceSyncStats:130,vrCopresenceCommsStats:137,vrCopresencePartyStats:153,
vrCopresenceEmojiStats:213,vrCopresenceEvent:141,vrCopresenceFlowTransitEvent:160,vrCowatchPartyEvent:492,vrCowatchUserStartOrJoinEvent:504,vrPlaybackEvent:345,kidsAgeGateTracking:105,offlineDelayAllowedTracking:106,mainAppAutoOfflineState:107,videoAsThumbnailDownload:108,videoAsThumbnailPlayback:109,liteShowMore:110,renderingError:118,kidsProfilePinGateTracking:119,abrTrajectory:124,scrollEvent:125,streamzIncremented:126,kidsProfileSwitcherTracking:127,kidsProfileCreationTracking:129,buyFlowStarted:136,
mbsConnectionInitiated:138,mbsPlaybackInitiated:139,mbsLoadChildren:140,liteProfileFetcher:144,mdxRemoteTransaction:146,reelPlaybackError:148,reachabilityDetectionEvent:150,mobilePlaybackEvent:151,courtsidePlayerStateChanged:152,musicPersistentCacheChecked:154,musicPersistentCacheCleared:155,playbackInterrupted:157,playbackInterruptionResolved:158,fixFopFlow:159,anrDetection:161,backstagePostCreationFlowEnded:162,clientError:163,gamingAccountLinkStatusChanged:164,liteHousewarming:165,buyFlowEvent:167,
kidsParentalGateTracking:168,kidsSignedOutSettingsStatus:437,kidsSignedOutPauseHistoryFixStatus:438,tvhtml5WatchdogViolation:444,ypcUpgradeFlow:169,yongleStudy:170,ypcUpdateFlowStarted:171,ypcUpdateFlowCancelled:172,ypcUpdateFlowSucceeded:173,ypcUpdateFlowFailed:174,liteGrowthkitPromo:175,paymentFlowStarted:341,transactionFlowShowPaymentDialog:405,transactionFlowStarted:176,transactionFlowSecondaryDeviceStarted:222,transactionFlowSecondaryDeviceSignedOutStarted:383,transactionFlowCancelled:177,transactionFlowPaymentCallBackReceived:387,
transactionFlowPaymentSubmitted:460,transactionFlowPaymentSucceeded:329,transactionFlowSucceeded:178,transactionFlowFailed:179,transactionFlowPlayBillingConnectionStartEvent:428,transactionFlowSecondaryDeviceSuccess:458,transactionFlowErrorEvent:411,liteVideoQualityChanged:180,watchBreakEnablementSettingEvent:181,watchBreakFrequencySettingEvent:182,videoEffectsCameraPerformanceMetrics:183,adNotify:184,startupTelemetry:185,playbackOfflineFallbackUsed:186,outOfMemory:187,ypcPauseFlowStarted:188,ypcPauseFlowCancelled:189,
ypcPauseFlowSucceeded:190,ypcPauseFlowFailed:191,uploadFileSelected:192,ypcResumeFlowStarted:193,ypcResumeFlowCancelled:194,ypcResumeFlowSucceeded:195,ypcResumeFlowFailed:196,adsClientStateChange:197,ypcCancelFlowStarted:198,ypcCancelFlowCancelled:199,ypcCancelFlowSucceeded:200,ypcCancelFlowFailed:201,ypcCancelFlowGoToPaymentProcessor:402,ypcDeactivateFlowStarted:320,ypcRedeemFlowStarted:203,ypcRedeemFlowCancelled:204,ypcRedeemFlowSucceeded:205,ypcRedeemFlowFailed:206,ypcFamilyCreateFlowStarted:258,
ypcFamilyCreateFlowCancelled:259,ypcFamilyCreateFlowSucceeded:260,ypcFamilyCreateFlowFailed:261,ypcFamilyManageFlowStarted:262,ypcFamilyManageFlowCancelled:263,ypcFamilyManageFlowSucceeded:264,ypcFamilyManageFlowFailed:265,restoreContextEvent:207,embedsAdEvent:327,autoplayTriggered:209,clientDataErrorEvent:210,experimentalVssValidation:211,tvhtml5TriggeredEvent:212,tvhtml5FrameworksFieldTrialResult:216,tvhtml5FrameworksFieldTrialStart:220,musicOfflinePreferences:218,watchTimeSegment:219,appWidthLayoutError:221,
accountRegistryChange:226,userMentionAutoCompleteBoxEvent:227,downloadRecommendationEnablementSettingEvent:228,musicPlaybackContentModeChangeEvent:231,offlineDbOpenCompleted:232,kidsFlowEvent:233,kidsFlowCorpusSelectedEvent:234,videoEffectsEvent:235,unpluggedOpsEogAnalyticsEvent:236,playbackAudioRouteEvent:237,interactionLoggingDebugModeError:238,offlineYtbRefreshed:239,kidsFlowError:240,musicAutoplayOnLaunchAttempted:242,deviceContextActivityEvent:243,deviceContextEvent:244,templateResolutionException:245,
musicSideloadedPlaylistServiceCalled:246,embedsStorageAccessNotChecked:247,embedsHasStorageAccessResult:248,embedsItpPlayedOnReload:249,embedsRequestStorageAccessResult:250,embedsShouldRequestStorageAccessResult:251,embedsRequestStorageAccessState:256,embedsRequestStorageAccessFailedState:257,embedsItpWatchLaterResult:266,searchSuggestDecodingPayloadFailure:252,siriShortcutActivated:253,tvhtml5KeyboardPerformance:254,latencyActionSpan:255,elementsLog:267,ytbFileOpened:268,tfliteModelError:269,apiTest:270,
yongleUsbSetup:271,touStrikeInterstitialEvent:272,liteStreamToSave:274,appBundleClientEvent:275,ytbFileCreationFailed:276,adNotifyFailure:278,ytbTransferFailed:280,blockingRequestFailed:281,liteAccountSelector:282,liteAccountUiCallbacks:283,dummyPayload:284,browseResponseValidationEvent:285,entitiesError:286,musicIosBackgroundFetch:287,mdxNotificationEvent:289,layersValidationError:290,musicPwaInstalled:291,liteAccountCleanup:292,html5PlayerHealthEvent:293,watchRestoreAttempt:294,liteAccountSignIn:296,
notaireEvent:298,kidsVoiceSearchEvent:299,adNotifyFilled:300,delayedEventDropped:301,analyticsSearchEvent:302,systemDarkThemeOptOutEvent:303,flowEvent:304,networkConnectivityBaselineEvent:305,ytbFileImported:306,downloadStreamUrlExpired:307,directSignInEvent:308,lyricImpressionEvent:309,accessibilityStateEvent:310,tokenRefreshEvent:311,genericAttestationExecution:312,tvhtml5VideoSeek:313,unpluggedAutoPause:314,scrubbingEvent:315,bedtimeReminderEvent:317,tvhtml5UnexpectedRestart:319,tvhtml5StabilityTraceEvent:478,
tvhtml5OperationHealth:467,tvhtml5WatchKeyEvent:321,voiceLanguageChanged:322,tvhtml5LiveChatStatus:323,parentToolsCorpusSelectedEvent:324,offerAdsEnrollmentInitiated:325,networkQualityIntervalEvent:326,deviceStartupMetrics:328,heartbeatActionPlayerTransitioned:330,tvhtml5Lifecycle:331,heartbeatActionPlayerHalted:332,adaptiveInlineMutedSettingEvent:333,mainAppLibraryLoadingState:334,thirdPartyLogMonitoringEvent:336,appShellAssetLoadReport:337,tvhtml5AndroidAttestation:338,tvhtml5StartupSoundEvent:340,
iosBackgroundRefreshTask:342,iosBackgroundProcessingTask:343,sliEventBatch:344,postImpressionEvent:346,musicSideloadedPlaylistExport:347,idbUnexpectedlyClosed:348,voiceSearchEvent:349,mdxSessionCastEvent:350,idbQuotaExceeded:351,idbTransactionEnded:352,idbTransactionAborted:353,tvhtml5KeyboardLogging:354,idbIsSupportedCompleted:355,creatorStudioMobileEvent:356,idbDataCorrupted:357,parentToolsAppChosenEvent:358,webViewBottomSheetResized:359,activeStateControllerScrollPerformanceSummary:360,navigatorValidation:361,
mdxSessionHeartbeat:362,clientHintsPolyfillDiagnostics:363,clientHintsPolyfillEvent:364,proofOfOriginTokenError:365,kidsAddedAccountSummary:366,musicWearableDevice:367,ypcRefundFlowEvent:368,tvhtml5PlaybackMeasurementEvent:369,tvhtml5WatermarkMeasurementEvent:370,clientExpGcfPropagationEvent:371,mainAppReferrerIntent:372,leaderLockEnded:373,leaderLockAcquired:374,googleHatsEvent:375,persistentLensLaunchEvent:376,parentToolsChildWelcomeChosenEvent:378,browseThumbnailPreloadEvent:379,finalPayload:380,
mdxDialAdditionalDataUpdateEvent:381,webOrchestrationTaskLifecycleRecord:382,startupSignalEvent:384,accountError:385,gmsDeviceCheckEvent:386,accountSelectorEvent:388,accountUiCallbacks:389,mdxDialAdditionalDataProbeEvent:390,downloadsSearchIcingApiStats:391,downloadsSearchIndexUpdatedEvent:397,downloadsSearchIndexSnapshot:398,dataPushClientEvent:392,kidsCategorySelectedEvent:393,mdxDeviceManagementSnapshotEvent:394,prefetchRequested:395,prefetchableCommandExecuted:396,gelDebuggingEvent:399,webLinkTtsPlayEnd:400,
clipViewInvalid:401,persistentStorageStateChecked:403,cacheWipeoutEvent:404,playerEvent:410,sfvEffectPipelineStartedEvent:412,sfvEffectPipelinePausedEvent:429,sfvEffectPipelineEndedEvent:413,sfvEffectChosenEvent:414,sfvEffectLoadedEvent:415,sfvEffectUserInteractionEvent:465,sfvEffectFirstFrameProcessedLatencyEvent:416,sfvEffectAggregatedFramesProcessedLatencyEvent:417,sfvEffectAggregatedFramesDroppedEvent:418,sfvEffectPipelineErrorEvent:430,sfvEffectGraphFrozenEvent:419,sfvEffectGlThreadBlockedEvent:420,
mdeQosEvent:510,mdeVideoChangedEvent:442,mdePlayerPerformanceMetrics:472,mdeExporterEvent:497,genericClientExperimentEvent:423,homePreloadTaskScheduled:424,homePreloadTaskExecuted:425,homePreloadCacheHit:426,polymerPropertyChangedInObserver:427,applicationStarted:431,networkCronetRttBatch:432,networkCronetRttSummary:433,repeatChapterLoopEvent:436,seekCancellationEvent:462,lockModeTimeoutEvent:483,externalVideoShareToYoutubeAttempt:501,parentCodeEvent:502,offlineTransferStarted:4,musicOfflineMixtapePreferencesChanged:16,
mangoDailyNewVideosNotificationAttempt:40,mangoDailyNewVideosNotificationError:77,dtwsPlaybackStarted:112,dtwsTileFetchStarted:113,dtwsTileFetchCompleted:114,dtwsTileFetchStatusChanged:145,dtwsKeyframeDecoderBufferSent:115,dtwsTileUnderflowedOnNonkeyframe:116,dtwsBackfillFetchStatusChanged:143,dtwsBackfillUnderflowed:117,dtwsAdaptiveLevelChanged:128,blockingVisitorIdTimeout:277,liteSocial:18,mobileJsInvocation:297,biscottiBasedDetection:439,coWatchStateChange:440,embedsVideoDataDidChange:441,shortsFirst:443,
cruiseControlEvent:445,qoeClientLoggingContext:446,atvRecommendationJobExecuted:447,tvhtml5UserFeedback:448,producerProjectCreated:449,producerProjectOpened:450,producerProjectDeleted:451,producerProjectElementAdded:453,producerProjectElementRemoved:454,producerAppStateChange:509,tvhtml5ShowClockEvent:455,deviceCapabilityCheckMetrics:456,youtubeClearcutEvent:461,offlineBrowseFallbackEvent:463,getCtvTokenEvent:464,startupDroppedFramesSummary:466,screenshotEvent:468,miniAppPlayEvent:469,elementsDebugCounters:470,
fontLoadEvent:471,webKillswitchReceived:473,webKillswitchExecuted:474,cameraOpenEvent:475,manualSmoothnessMeasurement:476,tvhtml5AppQualityEvent:477,polymerPropertyAccessEvent:479,miniAppSdkUsage:480,cobaltTelemetryEvent:481,crossDevicePlayback:482,channelCreatedWithObakeImage:484,channelEditedWithObakeImage:485,offlineDeleteEvent:486,crossDeviceNotificationTransfer:487,androidIntentEvent:488,unpluggedAmbientInterludesCounterfactualEvent:489,keyPlaysPlayback:490,shortsCreationFallbackEvent:493,vssData:491,
castMatch:494,miniAppPerformanceMetrics:495,userFeedbackEvent:496,kidsGuestSessionMismatch:498,musicSideloadedPlaylistMigrationEvent:499,sleepTimerSessionFinishEvent:500,watchEpPromoConflict:503,innertubeResponseCacheMetrics:505,miniAppAdEvent:506,dataPlanUpsellEvent:507,producerProjectRenamed:508,producerMediaSelectionEvent:511,embedsAutoplayStatusChanged:512};var sr={},tr=Op("ServiceWorkerLogsDatabase",{zb:(sr.SWHealthLog={Fb:1},sr),shared:!0,upgrade:function(a,b){b(1)&&ap(Uo(a,"SWHealthLog",{keyPath:"id",autoIncrement:!0}),"swHealthNewRequest",["interface","timestamp"])},
version:1});function ur(a){return np(tr(),a)}
function vr(a){var b,c;A(function(d){if(d.h==1)return d.yield(ur(a),2);b=d.i;c=T()-2592E6;return d.yield(To(b,["SWHealthLog"],{mode:"readwrite",ka:!0},function(e){return cp(e.objectStore("SWHealthLog"),{},function(f){if(f.getValue().timestamp<=c)return f.delete().then(function(){return dp(f)})})}),0)})}
function wr(a){var b;return A(function(c){if(c.h==1)return c.yield(ur(a),2);b=c.i;return c.yield(b.clear("SWHealthLog"),0)})}
;var xr={},yr=0;function zr(a){var b=new Image,c=""+yr++;xr[c]=b;b.onload=b.onerror=function(){delete xr[c]};
b.src=a}
;var Ar;function Br(){Ar||(Ar=new eo("yt.offline"));return Ar}
function Cr(a){if(R("offline_error_handling")){var b=Br().get("errors",!0)||{};b[a.message]={name:a.name,stack:a.stack};a.level&&(b[a.message].level=a.level);Br().set("errors",b,2592E3,!0)}}
;function Dr(){this.h=new Map;this.i=!1}
function Er(){if(!Dr.h){var a=E("yt.networkRequestMonitor.instance")||new Dr;D("yt.networkRequestMonitor.instance",a);Dr.h=a}return Dr.h}
Dr.prototype.requestComplete=function(a,b){b&&(this.i=!0);a=this.removeParams(a);this.h.get(a)||this.h.set(a,b)};
Dr.prototype.isEndpointCFR=function(a){a=this.removeParams(a);return(a=this.h.get(a))?!1:a===!1&&this.i?!0:null};
Dr.prototype.removeParams=function(a){return a.split("?")[0]};
Dr.prototype.removeParams=Dr.prototype.removeParams;Dr.prototype.isEndpointCFR=Dr.prototype.isEndpointCFR;Dr.prototype.requestComplete=Dr.prototype.requestComplete;Dr.getInstance=Er;function Fr(){Xh.call(this);var a=this;this.j=!1;this.i=Dj();this.i.listen("networkstatus-online",function(){if(a.j&&R("offline_error_handling")){var b=Br().get("errors",!0);if(b){for(var c in b)if(b[c]){var d=new S(c,"sent via offline_errors");d.name=b[c].name;d.stack=b[c].stack;d.level=b[c].level;Zl(d)}Br().set("errors",{},2592E3,!0)}}})}
w(Fr,Xh);function Gr(){if(!Fr.h){var a=E("yt.networkStatusManager.instance")||new Fr;D("yt.networkStatusManager.instance",a);Fr.h=a}return Fr.h}
r=Fr.prototype;r.va=function(){return this.i.va()};
r.eb=function(a){this.i.i=a};
r.je=function(){var a=window.navigator.onLine;return a===void 0?!0:a};
r.Yd=function(){this.j=!0};
r.listen=function(a,b){return this.i.listen(a,b)};
r.vc=function(a){a=Bj(this.i,a);a.then(function(b){R("use_cfr_monitor")&&Er().requestComplete("generate_204",b)});
return a};
Fr.prototype.sendNetworkCheckRequest=Fr.prototype.vc;Fr.prototype.listen=Fr.prototype.listen;Fr.prototype.enableErrorFlushing=Fr.prototype.Yd;Fr.prototype.getWindowStatus=Fr.prototype.je;Fr.prototype.networkStatusHint=Fr.prototype.eb;Fr.prototype.isNetworkAvailable=Fr.prototype.va;Fr.getInstance=Gr;function Hr(a){a=a===void 0?{}:a;Xh.call(this);var b=this;this.i=this.u=0;this.j=Gr();var c=E("yt.networkStatusManager.instance.listen").bind(this.j);c&&(a.rateLimit?(this.rateLimit=a.rateLimit,c("networkstatus-online",function(){Ir(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){Ir(b,"publicytnetworkstatus-offline")})):(c("networkstatus-online",function(){Yh(b,"publicytnetworkstatus-online")}),c("networkstatus-offline",function(){Yh(b,"publicytnetworkstatus-offline")})))}
w(Hr,Xh);Hr.prototype.va=function(){var a=E("yt.networkStatusManager.instance.isNetworkAvailable");return a?a.bind(this.j)():!0};
Hr.prototype.eb=function(a){var b=E("yt.networkStatusManager.instance.networkStatusHint").bind(this.j);b&&b(a)};
Hr.prototype.vc=function(a){var b=this,c;return A(function(d){c=E("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.j);return R("skip_network_check_if_cfr")&&Er().isEndpointCFR("generate_204")?d.return(new Promise(function(e){var f;b.eb(((f=window.navigator)==null?void 0:f.onLine)||!0);e(b.va())})):c?d.return(c(a)):d.return(!0)})};
function Ir(a,b){a.rateLimit?a.i?(Ej.qa(a.u),a.u=Ej.pa(function(){a.o!==b&&(Yh(a,b),a.o=b,a.i=T())},a.rateLimit-(T()-a.i))):(Yh(a,b),a.o=b,a.i=T()):Yh(a,b)}
;var Jr;function Kr(){var a=Xq.call;Jr||(Jr=new Hr({xh:!0,oh:!0}));a.call(Xq,this,{fa:{Rd:pr,pb:or,hd:lr,we:mr,Qc:nr,set:jr},ea:Jr,handleError:function(b,c,d){var e,f=d==null?void 0:(e=d.error)==null?void 0:e.code;if(f===400||f===415){var g;$l(new S(b.message,c,d==null?void 0:(g=d.error)==null?void 0:g.code),void 0,void 0,void 0,!0)}else Zl(b)},
rb:$l,sendFn:Lr,now:T,Hd:Cr,Ba:co(),Pc:"publicytnetworkstatus-online",Mc:"publicytnetworkstatus-offline",cc:!0,Zb:.1,oc:tm("potential_esf_error_limit",10),W:R,Ib:!(vn()&&Mr())});this.j=new oj;R("networkless_immediately_drop_all_requests")&&qr();Lp("LogsDatabaseV2")}
w(Kr,Xq);function Nr(){var a=E("yt.networklessRequestController.instance");a||(a=new Kr,D("yt.networklessRequestController.instance",a),R("networkless_logging")&&Ap().then(function(b){a.V=b;Zq(a);a.j.resolve();a.cc&&Math.random()<=a.Zb&&a.V&&vr(a.V);R("networkless_immediately_drop_sw_health_store")&&Or(a)}));
return a}
Kr.prototype.writeThenSend=function(a,b){b||(b={});b=Tr(a,b);vn()||(this.h=!1);Xq.prototype.writeThenSend.call(this,a,b)};
Kr.prototype.sendThenWrite=function(a,b,c){b||(b={});b=Tr(a,b);vn()||(this.h=!1);Xq.prototype.sendThenWrite.call(this,a,b,c)};
Kr.prototype.sendAndWrite=function(a,b){b||(b={});b=Tr(a,b);vn()||(this.h=!1);Xq.prototype.sendAndWrite.call(this,a,b)};
Kr.prototype.awaitInitialization=function(){return this.j.promise};
function Or(a){var b;A(function(c){if(!a.V)throw b=Fo("clearSWHealthLogsDb"),b;return c.return(wr(a.V).catch(function(d){a.handleError(d)}))})}
function Lr(a,b,c,d){d=d===void 0?!1:d;b=R("web_fp_via_jspb")?Object.assign({},b):b;R("use_cfr_monitor")&&Ur(a,b);if(R("use_request_time_ms_header"))b.headers&&km(a)&&(b.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(T())));else{var e;if((e=b.postParams)==null?0:e.requestTimeMs)b.postParams.requestTimeMs=Math.round(T())}if(c&&Object.keys(b).length===0){var f=f===void 0?"":f;var g=g===void 0?!1:g;var h=h===void 0?!1:h;if(a)if(f)zm(a,void 0,"POST",f,void 0);else if(P("USE_NET_AJAX_FOR_PING_TRANSPORT",
!1)||h)zm(a,void 0,"GET","",void 0,void 0,g,h);else{b:{try{var k=new bb({url:a});if(k.u?typeof k.j!=="string"||k.j.length===0?0:{version:3,Wd:k.j,Od:db(k,"&act=1&ri=1"+eb(k))}:k.H&&{version:4,Wd:db(k,"&dct=1&suid="+k.o),Od:db(k,"&act=1&ri=1&suid="+k.o)}){var l=ac(bc(5,a)),m;if(!(m=!l||!l.endsWith("/aclk"))){var n=a.search(kc),p=jc(a,0,"ri",n);if(p<0)var t=null;else{var v=a.indexOf("&",p);if(v<0||v>n)v=n;t=decodeURIComponent(a.slice(p+3,v!==-1?v:0).replace(/\+/g," "))}m=t!=="1"}var x=!m;break b}}catch(F){}x=
!1}if(x){b:{try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")){var y=!0;break b}}catch(F){}y=!1}c=y?!0:!1}else c=!1;c||zr(a)}}else b.compress?b.postBody?(typeof b.postBody!=="string"&&(b.postBody=JSON.stringify(b.postBody)),Mq(a,b.postBody,b,Dm,d)):Mq(a,JSON.stringify(b.postParams),b,Cm,d):Dm(a,b)}
function Tr(a,b){R("use_event_time_ms_header")&&km(a)&&(b.headers||(b.headers={}),b.headers["X-Goog-Event-Time"]=JSON.stringify(Math.round(T())));return b}
function Ur(a,b){var c=b.onError?b.onError:function(){};
b.onError=function(e,f){Er().requestComplete(a,!1);c(e,f)};
var d=b.onSuccess?b.onSuccess:function(){};
b.onSuccess=function(e,f){Er().requestComplete(a,!0);d(e,f)}}
function Mr(){return cc(document.location.toString())!=="www.youtube-nocookie.com"}
;var Vr=!1,Wr=C.ytNetworklessLoggingInitializationOptions||{isNwlInitialized:Vr};D("ytNetworklessLoggingInitializationOptions",Wr);function Xr(){var a;A(function(b){if(b.h==1)return b.yield(Ap(),2);a=b.i;if(!a||!vn()&&!R("nwl_init_require_datasync_id_killswitch")||!Mr())return b.D(0);Vr=!0;Wr.isNwlInitialized=Vr;return b.yield(Nr().awaitInitialization(),0)})}
;function Yr(a){var b=this;this.config_=null;a?this.config_=a:bq()&&(this.config_=cq());yn(function(){Vq(b)},5E3)}
Yr.prototype.isReady=function(){!this.config_&&bq()&&(this.config_=cq());return!!this.config_};
function Wq(a,b,c,d){function e(n){n=n===void 0?!1:n;var p;if(d.retry&&h!="www.youtube-nocookie.com"&&(n||R("skip_ls_gel_retry")||g.headers["Content-Type"]!=="application/json"||(p=Tq(b,c,l,k)),p)){var t=g.onSuccess,v=g.onFetchSuccess;g.onSuccess=function(F,I){Uq(p);t(F,I)};
c.onFetchSuccess=function(F,I){Uq(p);v(F,I)}}try{if(n&&d.retry&&!d.networklessOptions.bypassNetworkless)g.method="POST",d.networklessOptions.writeThenSend?Nr().writeThenSend(m,g):Nr().sendAndWrite(m,g);
else if(d.compress){var x=!d.networklessOptions.writeThenSend;if(g.postBody){var y=g.postBody;typeof y!=="string"&&(y=JSON.stringify(g.postBody));Mq(m,y,g,Dm,x)}else Mq(m,JSON.stringify(g.postParams),g,Cm,x)}else R("web_all_payloads_via_jspb")?Dm(m,g):Cm(m,g)}catch(F){if(F.name==="InvalidAccessError")p&&(Uq(p),p=0),$l(Error("An extension is blocking network request."));else throw F;}p&&yn(function(){Vq(a)},5E3)}
!P("VISITOR_DATA")&&b!=="visitor_id"&&Math.random()<.01&&$l(new S("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var f=new S("innertube xhrclient not ready",b,c,d);Zl(f);throw f;}var g={headers:d.headers||{},method:"POST",postParams:c,postBody:d.postBody,postBodyFormat:d.postBodyFormat||"JSON",onTimeout:function(){d.onTimeout()},
onFetchTimeout:d.onTimeout,onSuccess:function(n,p){if(d.onSuccess)d.onSuccess(p)},
onFetchSuccess:function(n){if(d.onSuccess)d.onSuccess(n)},
onError:function(n,p){if(d.onError)d.onError(p)},
onFetchError:function(n){if(d.onError)d.onError(n)},
timeout:d.timeout,withCredentials:!0,compress:d.compress};g.headers["Content-Type"]||(g.headers["Content-Type"]="application/json");var h="";(f=a.config_.re)&&(h=f);var k=a.config_.se||!1,l=eq(k,h,d);Object.assign(g.headers,l);g.headers.Authorization&&!h&&k&&(g.headers["x-origin"]=window.location.origin);var m=im(""+h+("/youtubei/"+a.config_.innertubeApiVersion+"/"+b),{alt:"json"});(E("ytNetworklessLoggingInitializationOptions")?Wr.isNwlInitialized:Vr)?yp().then(function(n){e(n)}):e(!1)}
;var Zr=0,$r=$c?"webkit":Zc?"moz":Xc?"ms":Wc?"o":"";D("ytDomDomGetNextId",E("ytDomDomGetNextId")||function(){return++Zr});var as={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function bs(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.rotation=this.clientY=this.clientX=0;this.scale=1;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in as||(this[b]=a[b]);this.scale=a.scale;this.rotation=a.rotation;var c=a.target||a.srcElement;c&&c.nodeType==3&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;
if(d)try{d=d.nodeName?d:null}catch(e){d=null}else this.type=="mouseover"?d=a.fromElement:this.type=="mouseout"&&(d=a.toElement);this.relatedTarget=d;this.clientX=a.clientX!=void 0?a.clientX:a.pageX;this.clientY=a.clientY!=void 0?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||(this.type=="keypress"?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.h=a.pageX;this.i=a.pageY}}catch(e){}}
function cs(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.h=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.i=a.clientY+b}}
bs.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
bs.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
bs.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var rg=C.ytEventsEventsListeners||{};D("ytEventsEventsListeners",rg);var ds=C.ytEventsEventsCounter||{count:0};D("ytEventsEventsCounter",ds);
function es(a,b,c,d){d=d===void 0?{}:d;a.addEventListener&&(b!="mouseenter"||"onmouseenter"in document?b!="mouseleave"||"onmouseenter"in document?b=="mousewheel"&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return qg(function(e){var f=typeof e[4]==="boolean"&&e[4]==!!d,g=Qa(e[4])&&Qa(d)&&vg(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
function gs(a,b,c,d){d=d===void 0?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=es(a,b,c,d);if(e)return e;e=++ds.count+"";var f=!(b!="mouseenter"&&b!="mouseleave"||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new bs(h);if(!Eg(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new bs(h);
h.currentTarget=a;return c.call(a,h)};
g=Yl(g);a.addEventListener?(b=="mouseenter"&&f?b="mouseover":b=="mouseleave"&&f?b="mouseout":b=="mousewheel"&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),hs()||typeof d==="boolean"?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);rg[e]=[a,b,c,g,d];return e}
function is(a){a&&(typeof a=="string"&&(a=[a]),Nb(a,function(b){if(b in rg){var c=rg[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?hs()||typeof c==="boolean"?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete rg[b]}}))}
var hs=mi(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});function js(a){this.G=a;this.h=null;this.o=0;this.A=null;this.u=0;this.i=[];for(a=0;a<4;a++)this.i.push(0);this.j=0;this.U=gs(window,"mousemove",Wa(this.X,this));a=Wa(this.P,this);typeof a==="function"&&(a=Yl(a));this.Y=window.setInterval(a,25)}
Za(js,G);js.prototype.X=function(a){a.h===void 0&&cs(a);var b=a.h;a.i===void 0&&cs(a);this.h=new ng(b,a.i)};
js.prototype.P=function(){if(this.h){var a=T();if(this.o!=0){var b=this.A,c=this.h,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.o);this.i[this.j]=Math.abs((d-this.u)/this.u)>.5?1:0;for(c=b=0;c<4;c++)b+=this.i[c]||0;b>=3&&this.G();this.u=d}this.o=a;this.A=this.h;this.j=(this.j+1)%4}};
js.prototype.aa=function(){window.clearInterval(this.Y);is(this.U)};var ks={};
function ls(a){var b=a===void 0?{}:a;a=b.Fe===void 0?!1:b.Fe;b=b.Zd===void 0?!0:b.Zd;if(E("_lact",window)==null){var c=parseInt(P("LACT"),10);c=isFinite(c)?Date.now()-Math.max(c,0):-1;D("_lact",c,window);D("_fact",c,window);c==-1&&ms();gs(document,"keydown",ms);gs(document,"keyup",ms);gs(document,"mousedown",ms);gs(document,"mouseup",ms);a?gs(window,"touchmove",function(){ns("touchmove",200)},{passive:!0}):(gs(window,"resize",function(){ns("resize",200)}),b&&gs(window,"scroll",function(){ns("scroll",200)}));
new js(function(){ns("mouse",100)});
gs(document,"touchstart",ms,{passive:!0});gs(document,"touchend",ms,{passive:!0})}}
function ns(a,b){ks[a]||(ks[a]=!0,Ej.pa(function(){ms();ks[a]=!1},b))}
function ms(){E("_lact",window)==null&&ls();var a=Date.now();D("_lact",a,window);E("_fact",window)==-1&&D("_fact",a,window);(a=E("ytglobal.ytUtilActivityCallback_"))&&a()}
function ps(){var a=E("_lact",window);return a==null?-1:Math.max(Date.now()-a,0)}
;var qs=C.ytPubsubPubsubInstance||new M,rs=C.ytPubsubPubsubSubscribedKeys||{},ss=C.ytPubsubPubsubTopicToKeys||{},ts=C.ytPubsubPubsubIsSynchronous||{};function us(a,b){var c=vs();if(c&&b){var d=c.subscribe(a,function(){function e(){rs[d]&&b.apply&&typeof b.apply=="function"&&b.apply(window,f)}
var f=arguments;try{ts[a]?e():qm(e,0)}catch(g){Zl(g)}},void 0);
rs[d]=!0;ss[a]||(ss[a]=[]);ss[a].push(d);return d}return 0}
function ws(a){var b=vs();b&&(typeof a==="number"?a=[a]:typeof a==="string"&&(a=[parseInt(a,10)]),Nb(a,function(c){b.unsubscribeByKey(c);delete rs[c]}))}
function xs(a,b){var c=vs();c&&c.publish.apply(c,arguments)}
function ys(a){var b=vs();if(b)if(b.clear(a),a)zs(a);else for(var c in ss)zs(c)}
function vs(){return C.ytPubsubPubsubInstance}
function zs(a){ss[a]&&(a=ss[a],Nb(a,function(b){rs[b]&&delete rs[b]}),a.length=0)}
M.prototype.subscribe=M.prototype.subscribe;M.prototype.unsubscribeByKey=M.prototype.Tb;M.prototype.publish=M.prototype.lb;M.prototype.clear=M.prototype.clear;D("ytPubsubPubsubInstance",qs);D("ytPubsubPubsubTopicToKeys",ss);D("ytPubsubPubsubIsSynchronous",ts);D("ytPubsubPubsubSubscribedKeys",rs);var As=Symbol("injectionDeps");function Bs(a){this.name=a}
Bs.prototype.toString=function(){return"InjectionToken("+this.name+")"};
function Cs(a){this.key=a}
function Ds(){this.i=new Map;this.j=new Map;this.h=new Map}
function Es(a,b){a.i.set(b.qc,b);var c=a.j.get(b.qc);if(c)try{c.Gh(a.resolve(b.qc))}catch(d){c.Eh(d)}}
Ds.prototype.resolve=function(a){return a instanceof Cs?Fs(this,a.key,[],!0):Fs(this,a,[])};
function Fs(a,b,c,d){d=d===void 0?!1:d;if(c.indexOf(b)>-1)throw Error("Deps cycle for: "+b);if(a.h.has(b))return a.h.get(b);if(!a.i.has(b)){if(d)return;throw Error("No provider for: "+b);}d=a.i.get(b);c.push(b);if(d.Dd!==void 0)var e=d.Dd;else if(d.pf)e=d[As]?Gs(a,d[As],c):[],e=d.pf.apply(d,ra(e));else if(d.Cd){e=d.Cd;var f=e[As]?Gs(a,e[As],c):[];e=new (Function.prototype.bind.apply(e,[null].concat(ra(f))))}else throw Error("Could not resolve providers for: "+b);c.pop();d.Jh||a.h.set(b,e);return e}
function Gs(a,b,c){return b?b.map(function(d){return d instanceof Cs?Fs(a,d.key,c,!0):Fs(a,d,c)}):[]}
;var Hs;function Is(){Hs||(Hs=new Ds);return Hs}
;var Js=window;function Ks(){var a,b;return"h5vcc"in Js&&((a=Js.h5vcc.traceEvent)==null?0:a.traceBegin)&&((b=Js.h5vcc.traceEvent)==null?0:b.traceEnd)?1:"performance"in Js&&Js.performance.mark&&Js.performance.measure?2:0}
function Ls(a){var b=Ks();switch(b){case 1:Js.h5vcc.traceEvent.traceBegin("YTLR",a);break;case 2:Js.performance.mark(a+"-start");break;case 0:break;default:Eb(b,"unknown trace type")}}
function Ms(a){var b=Ks();switch(b){case 1:Js.h5vcc.traceEvent.traceEnd("YTLR",a);break;case 2:b=a+"-start";var c=a+"-end";Js.performance.mark(c);Js.performance.measure(a,b,c);break;case 0:break;default:Eb(b,"unknown trace type")}}
;var Ns=R("web_enable_lifecycle_monitoring")&&Ks()!==0,Os=R("web_enable_lifecycle_monitoring");function Ps(a){var b,c;(c=(b=window).onerror)==null||c.call(b,a.message,"",0,0,a)}
;function Qs(a){var b=this;var c=c===void 0?0:c;var d=d===void 0?co():d;this.j=c;this.scheduler=d;this.i=new oj;this.h=a;for(a={bb:0};a.bb<this.h.length;a={nc:void 0,bb:a.bb},a.bb++)a.nc=this.h[a.bb],c=function(e){return function(){e.nc.Fc();b.h[e.bb].pc=!0;b.h.every(function(f){return f.pc===!0})&&b.i.resolve()}}(a),d=this.getPriority(a.nc),d=this.scheduler.Za(c,d),this.h[a.bb]=Object.assign({},a.nc,{Fc:c,
jobId:d})}
function Rs(a){var b=Array.from(a.h.keys()).sort(function(d,e){return a.getPriority(a.h[e])-a.getPriority(a.h[d])});
b=z(b);for(var c=b.next();!c.done;c=b.next())c=a.h[c.value],c.jobId===void 0||c.pc||(a.scheduler.qa(c.jobId),a.scheduler.Za(c.Fc,10))}
Qs.prototype.cancel=function(){for(var a=z(this.h),b=a.next();!b.done;b=a.next())b=b.value,b.jobId===void 0||b.pc||this.scheduler.qa(b.jobId),b.pc=!0;this.i.resolve()};
Qs.prototype.getPriority=function(a){var b;return(b=a.priority)!=null?b:this.j};function Ss(a){this.state=a;this.plugins=[];this.o=void 0;this.A={};Ns&&Ls(this.state)}
r=Ss.prototype;r.install=function(a){this.plugins.push(a);return this};
r.uninstall=function(){var a=this;B.apply(0,arguments).forEach(function(b){b=a.plugins.indexOf(b);b>-1&&a.plugins.splice(b,1)})};
r.transition=function(a,b){var c=this;Ns&&Ms(this.state);var d=this.transitions.find(function(f){return Array.isArray(f.from)?f.from.find(function(g){return g===c.state&&f.to===a}):f.from===c.state&&f.to===a});
if(d){this.j&&(Rs(this.j),this.j=void 0);Ts(this,a,b);this.state=a;Ns&&Ls(this.state);d=d.action.bind(this);var e=this.plugins.filter(function(f){return f[a]}).map(function(f){return f[a]});
d(Us(this,e),b)}else throw Error("no transition specified from "+this.state+" to "+a);};
function Us(a,b){var c=b.filter(function(e){return Vs(a,e)===10}),d=b.filter(function(e){return Vs(a,e)!==10});
return a.A.Ih?function(){var e=B.apply(0,arguments);return A(function(f){if(f.h==1)return f.yield(a.Le.apply(a,[c].concat(ra(e))),2);a.xd.apply(a,[d].concat(ra(e)));f.h=0})}:function(){var e=B.apply(0,arguments);
a.Me.apply(a,[c].concat(ra(e)));a.xd.apply(a,[d].concat(ra(e)))}}
r.Me=function(a){for(var b=B.apply(1,arguments),c=co(),d=z(a),e=d.next(),f={};!e.done;f={Jb:void 0},e=d.next())f.Jb=e.value,c.Db(function(g){return function(){Ws(g.Jb.name);Xs(function(){return g.Jb.callback.apply(g.Jb,ra(b))});
Ys(g.Jb.name)}}(f))};
r.Le=function(a){var b=B.apply(1,arguments),c,d,e,f,g;return A(function(h){h.h==1&&(c=co(),d=z(a),e=d.next(),f={});if(h.h!=3){if(e.done)return h.D(0);f.Va=e.value;f.Ub=void 0;g=function(k){return function(){Ws(k.Va.name);var l=Xs(function(){return k.Va.callback.apply(k.Va,ra(b))});
$d(l)?k.Ub=R("web_lifecycle_error_handling_killswitch")?l.then(function(){Ys(k.Va.name)}):l.then(function(){Ys(k.Va.name)},function(m){Ps(m);
Ys(k.Va.name)}):Ys(k.Va.name)}}(f);
c.Db(g);return f.Ub?h.yield(f.Ub,3):h.D(3)}f={Va:void 0,Ub:void 0};e=d.next();return h.D(2)})};
r.xd=function(a){var b=B.apply(1,arguments),c=this,d=a.map(function(e){return{Fc:function(){Ws(e.name);Xs(function(){return e.callback.apply(e,ra(b))});
Ys(e.name)},
priority:Vs(c,e)}});
d.length&&(this.j=new Qs(d))};
function Vs(a,b){var c,d;return(d=(c=a.o)!=null?c:b.priority)!=null?d:0}
function Ws(a){Ns&&a&&Ls(a)}
function Ys(a){Ns&&a&&Ms(a)}
function Ts(a,b,c){Os&&console.groupCollapsed&&console.groupEnd&&(console.groupCollapsed("["+a.constructor.name+"] '"+a.state+"' to '"+b+"'"),console.log("with message: ",c),console.groupEnd())}
ea.Object.defineProperties(Ss.prototype,{currentState:{configurable:!0,enumerable:!0,get:function(){return this.state}}});
function Xs(a){if(R("web_lifecycle_error_handling_killswitch"))return a();try{return a()}catch(b){Ps(b)}}
;function Zs(a){Ss.call(this,a===void 0?"none":a);this.h=null;this.o=10;this.transitions=[{from:"none",to:"application_navigating",action:this.i},{from:"application_navigating",to:"none",action:this.u},{from:"application_navigating",to:"application_navigating",action:function(){}},
{from:"none",to:"none",action:function(){}}]}
var $s;w(Zs,Ss);Zs.prototype.i=function(a,b){var c=this;this.h=yn(function(){c.currentState==="application_navigating"&&c.transition("none")},5E3);
a(b==null?void 0:b.event)};
Zs.prototype.u=function(a,b){this.h&&(Ej.qa(this.h),this.h=null);a(b==null?void 0:b.event)};
function at(){$s||($s=new Zs);return $s}
;var bt=[];D("yt.logging.transport.getScrapedGelPayloads",function(){return bt});function ct(){this.store={};this.h={}}
ct.prototype.storePayload=function(a,b){a=dt(a);this.store[a]?this.store[a].push(b):(this.h={},this.store[a]=[b]);R("more_accurate_gel_parser")&&(b=new CustomEvent("TRANSPORTING_NEW_EVENT"),window.dispatchEvent(b));return a};
ct.prototype.smartExtractMatchingEntries=function(a){if(!a.keys.length)return[];for(var b=et(this,a.keys.splice(0,1)[0]),c=[],d=0;d<b.length;d++)this.store[b[d]]&&a.sizeLimit&&(this.store[b[d]].length<=a.sizeLimit?(c.push.apply(c,ra(this.store[b[d]])),delete this.store[b[d]]):c.push.apply(c,ra(this.store[b[d]].splice(0,a.sizeLimit))));(a==null?0:a.sizeLimit)&&c.length<(a==null?void 0:a.sizeLimit)&&(a.sizeLimit-=c.length,c.push.apply(c,ra(this.smartExtractMatchingEntries(a))));return c};
ct.prototype.extractMatchingEntries=function(a){a=et(this,a);for(var b=[],c=0;c<a.length;c++)this.store[a[c]]&&(b.push.apply(b,ra(this.store[a[c]])),delete this.store[a[c]]);return b};
ct.prototype.getSequenceCount=function(a){a=et(this,a);for(var b=0,c=0;c<a.length;c++){var d=void 0;b+=((d=this.store[a[c]])==null?void 0:d.length)||0}return b};
function et(a,b){var c=dt(b);if(a.h[c])return a.h[c];var d=Object.keys(a.store)||[];if(d.length<=1&&dt(b)===d[0])return d;for(var e=[],f=0;f<d.length;f++){var g=d[f].split("/");if(ft(b.auth,g[0])){var h=b.isJspb;ft(h===void 0?"undefined":h?"true":"false",g[1])&&ft(b.cttAuthInfo,g[2])&&(h=b.tier,h=h===void 0?"undefined":JSON.stringify(h),ft(h,g[3])&&e.push(d[f]))}}return a.h[c]=e}
function ft(a,b){return a===void 0||a==="undefined"?!0:a===b}
ct.prototype.getSequenceCount=ct.prototype.getSequenceCount;ct.prototype.extractMatchingEntries=ct.prototype.extractMatchingEntries;ct.prototype.smartExtractMatchingEntries=ct.prototype.smartExtractMatchingEntries;ct.prototype.storePayload=ct.prototype.storePayload;function dt(a){return[a.auth===void 0?"undefined":a.auth,a.isJspb===void 0?"undefined":a.isJspb,a.cttAuthInfo===void 0?"undefined":a.cttAuthInfo,a.tier===void 0?"undefined":a.tier].join("/")}
;function gt(a,b){if(a)return a[b.name]}
;var ht=tm("initial_gel_batch_timeout",2E3),jt=tm("gel_queue_timeout_max_ms",6E4),kt=tm("gel_min_batch_size",5),lt=void 0;function mt(){this.o=this.h=this.i=0;this.j=!1}
var nt=new mt,ot=new mt,pt=new mt,qt=new mt,rt,st=!0,tt=C.ytLoggingTransportTokensToCttTargetIds_||{};D("ytLoggingTransportTokensToCttTargetIds_",tt);var ut={};function vt(){var a=E("yt.logging.ims");a||(a=new ct,D("yt.logging.ims",a));return a}
function wt(a,b){if(a.endpoint==="log_event"){xt();var c=zt(a),d=At(a.payload)||"";a:{if(R("enable_web_tiered_gel")){var e=rr[d||""];var f,g,h,k=Is().resolve(new Cs(Xp))==null?void 0:(f=Yp())==null?void 0:(g=f.loggingHotConfig)==null?void 0:(h=g.eventLoggingConfig)==null?void 0:h.payloadPolicies;if(k)for(f=0;f<k.length;f++)if(k[f].payloadNumber===e){e=k[f];break a}}e=void 0}k=200;if(e){if(e.enabled===!1&&!R("web_payload_policy_disabled_killswitch"))return;k=Bt(e.tier);if(k===400){Ct(a,b);return}}ut[c]=
!0;e={cttAuthInfo:c,isJspb:!1,tier:k};vt().storePayload(e,a.payload);Dt(b,c,e,d==="gelDebuggingEvent")}}
function Dt(a,b,c,d){function e(){Et({writeThenSend:!0},R("flush_only_full_queue")?b:void 0,f,c.tier)}
var f=!1;f=f===void 0?!1:f;d=d===void 0?!1:d;a&&(lt=new a);a=tm("tvhtml5_logging_max_batch_ads_fork")||tm("tvhtml5_logging_max_batch")||tm("web_logging_max_batch")||100;var g=T(),h=Ft(f,c.tier),k=h.o;d&&(h.j=!0);d=0;c&&(d=vt().getSequenceCount(c));d>=1E3?e():d>=a?rt||(rt=Gt(function(){e();rt=void 0},0)):g-k>=10&&(Ht(f,c.tier),h.o=g)}
function Ct(a,b){if(a.endpoint==="log_event"){R("more_accurate_gel_parser")&&vt().storePayload({isJspb:!1},a.payload);xt();var c=zt(a),d=new Map;d.set(c,[a.payload]);var e=At(a.payload)||"";b&&(lt=new b);return new ni(function(f,g){lt&&lt.isReady()?It(d,lt,f,g,{bypassNetworkless:!0},!0,e==="gelDebuggingEvent"):f()})}}
function zt(a){var b="";if(a.dangerousLogToVisitorSession)b="visitorOnlyApprovedKey";else if(a.cttAuthInfo){b=a.cttAuthInfo;var c={};b.videoId?c.videoId=b.videoId:b.playlistId&&(c.playlistId=b.playlistId);tt[a.cttAuthInfo.token]=c;b=a.cttAuthInfo.token}return b}
function Et(a,b,c,d){a=a===void 0?{}:a;c=c===void 0?!1:c;new ni(function(e,f){var g=Ft(c,d),h=g.j;g.j=!1;Jt(g.i);Jt(g.h);g.h=0;lt&&lt.isReady()?d===void 0&&R("enable_web_tiered_gel")?Kt(e,f,a,b,c,300,h):Kt(e,f,a,b,c,d,h):(Ht(c,d),e())})}
function Kt(a,b,c,d,e,f,g){var h=lt;c=c===void 0?{}:c;e=e===void 0?!1:e;f=f===void 0?200:f;g=g===void 0?!1:g;var k=new Map,l={isJspb:e,cttAuthInfo:d,tier:f};e={isJspb:e,cttAuthInfo:d};if(d!==void 0)f=R("enable_web_tiered_gel")?vt().smartExtractMatchingEntries({keys:[l,e],sizeLimit:1E3}):vt().extractMatchingEntries(e),k.set(d,f);else for(d=z(Object.keys(ut)),l=d.next();!l.done;l=d.next())l=l.value,e=R("enable_web_tiered_gel")?vt().smartExtractMatchingEntries({keys:[{isJspb:!1,cttAuthInfo:l,tier:f},
{isJspb:!1,cttAuthInfo:l}],sizeLimit:1E3}):vt().extractMatchingEntries({isJspb:!1,cttAuthInfo:l}),e.length>0&&k.set(l,e),(R("web_fp_via_jspb_and_json")&&c.writeThenSend||!R("web_fp_via_jspb_and_json"))&&delete ut[l];It(k,h,a,b,c,!1,g)}
function Ht(a,b){function c(){Et({writeThenSend:!0},void 0,a,b)}
a=a===void 0?!1:a;b=b===void 0?200:b;var d=Ft(a,b),e=d===qt||d===pt?5E3:jt;R("web_gel_timeout_cap")&&!d.h&&(e=Gt(function(){c()},e),d.h=e);
Jt(d.i);e=P("LOGGING_BATCH_TIMEOUT",tm("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&st&&(e=ht);e=Gt(function(){tm("gel_min_batch_size")>0?vt().getSequenceCount({cttAuthInfo:void 0,isJspb:a,tier:b})>=kt&&c():c()},e);
d.i=e}
function It(a,b,c,d,e,f,g){e=e===void 0?{}:e;var h=Math.round(T()),k=a.size,l=(g===void 0?0:g)&&R("vss_through_gel_video_stats")?"video_stats":"log_event";a=z(a);var m=a.next();for(g={};!m.done;g={Lc:void 0,batchRequest:void 0,dangerousLogToVisitorSession:void 0,Oc:void 0,Nc:void 0},m=a.next()){var n=z(m.value);m=n.next().value;n=n.next().value;g.batchRequest=xg({context:dq(b.config_||cq())});if(!Pa(n)&&!R("throw_err_when_logevent_malformed_killswitch")){d();break}g.batchRequest.events=n;(n=tt[m])&&
Lt(g.batchRequest,m,n);delete tt[m];g.dangerousLogToVisitorSession=m==="visitorOnlyApprovedKey";Mt(g.batchRequest,h,g.dangerousLogToVisitorSession);R("always_send_and_write")&&(e.writeThenSend=!1);g.Oc=function(p){R("start_client_gcf")&&Ej.pa(function(){return A(function(t){return t.yield(Nt(p),0)})});
k--;k||c()};
g.Lc=0;g.Nc=function(p){return function(){p.Lc++;if(e.bypassNetworkless&&p.Lc===1)try{Wq(b,l,p.batchRequest,Ot({writeThenSend:!0},p.dangerousLogToVisitorSession,p.Oc,p.Nc,f)),st=!1}catch(t){Zl(t),d()}k--;k||c()}}(g);
try{Wq(b,l,g.batchRequest,Ot(e,g.dangerousLogToVisitorSession,g.Oc,g.Nc,f)),st=!1}catch(p){Zl(p),d()}}}
function Ot(a,b,c,d,e){a={retry:!0,onSuccess:c,onError:d,networklessOptions:a,dangerousLogToVisitorSession:b,ih:!!e,headers:{},postBodyFormat:"",postBody:"",compress:R("compress_gel")||R("compress_gel_lr")};Pt()&&(a.headers["X-Goog-Request-Time"]=JSON.stringify(Math.round(T())));return a}
function Mt(a,b,c){Pt()||(a.requestTimeMs=String(b));R("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);!c&&(b=P("EVENT_ID"))&&((c=P("BATCH_CLIENT_COUNTER")||0)||(c=Math.floor(Math.random()*65535/2)),c++,c>65535&&(c=1),Ul("BATCH_CLIENT_COUNTER",c),a.serializedClientEventId={serializedEventId:b,clientCounter:String(c)})}
function Lt(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
function xt(){var a;(a=E("yt.logging.transport.enableScrapingForTest"))||(a=sm("il_payload_scraping"),a=(a!==void 0?String(a):"")!=="enable_il_payload_scraping");a||(bt=[],D("yt.logging.transport.enableScrapingForTest",!0),D("yt.logging.transport.scrapedPayloadsForTesting",bt),D("yt.logging.transport.payloadToScrape","visualElementShown visualElementHidden visualElementAttached screenCreated visualElementGestured visualElementStateChanged".split(" ")),D("yt.logging.transport.getScrapedPayloadFromClientEventsFunction"),
D("yt.logging.transport.scrapeClientEvent",!0))}
function Pt(){return R("use_request_time_ms_header")||R("lr_use_request_time_ms_header")}
function Gt(a,b){return R("transport_use_scheduler")===!1?qm(a,b):R("logging_avoid_blocking_during_navigation")||R("lr_logging_avoid_blocking_during_navigation")?yn(function(){if(at().currentState==="none")a();else{var c={};at().install((c.none={callback:a},c))}},b):yn(a,b)}
function Jt(a){R("transport_use_scheduler")?Ej.qa(a):window.clearTimeout(a)}
function Nt(a){var b,c,d,e,f,g,h,k,l,m;return A(function(n){return n.h==1?(d=(b=a)==null?void 0:(c=b.responseContext)==null?void 0:c.globalConfigGroup,e=gt(d,wl),g=(f=d)==null?void 0:f.hotHashData,h=gt(d,vl),l=(k=d)==null?void 0:k.coldHashData,(m=Is().resolve(new Cs(Xp)))?g?e?n.yield(Zp(m,g,e),2):n.yield(Zp(m,g),2):n.D(2):n.return()):l?h?n.yield($p(m,l,h),0):n.yield($p(m,l),0):n.D(0)})}
function Ft(a,b){b=b===void 0?200:b;return a?b===300?qt:ot:b===300?pt:nt}
function At(a){a=Object.keys(a);a=z(a);for(var b=a.next();!b.done;b=a.next())if(b=b.value,rr[b])return b}
function Bt(a){switch(a){case "DELAYED_EVENT_TIER_UNSPECIFIED":return 0;case "DELAYED_EVENT_TIER_DEFAULT":return 100;case "DELAYED_EVENT_TIER_DISPATCH_TO_EMPTY":return 200;case "DELAYED_EVENT_TIER_FAST":return 300;case "DELAYED_EVENT_TIER_IMMEDIATE":return 400;default:return 200}}
;var Qt=C.ytLoggingGelSequenceIdObj_||{};D("ytLoggingGelSequenceIdObj_",Qt);
function Rt(a,b,c,d){d=d===void 0?{}:d;var e={},f=Math.round(d.timestamp||T());e.eventTimeMs=f<Number.MAX_SAFE_INTEGER?f:0;e[a]=b;a=ps();e.context={lastActivityMs:String(d.timestamp||!isFinite(a)?-1:a)};d.sequenceGroup&&!R("web_gel_sequence_info_killswitch")&&(a=e.context,b=d.sequenceGroup,Qt[b]=b in Qt?Qt[b]+1:0,a.sequence={index:Qt[b],groupKey:b},d.endOfSequence&&delete Qt[d.sequenceGroup]);(d.sendIsolatedPayload?Ct:wt)({endpoint:"log_event",payload:e,cttAuthInfo:d.cttAuthInfo,dangerousLogToVisitorSession:d.dangerousLogToVisitorSession},
c)}
;function no(a,b,c){c=c===void 0?{}:c;var d=Yr;P("ytLoggingEventsDefaultDisabled",!1)&&Yr===Yr&&(d=null);Rt(a,b,d,c)}
;function St(a){return a.slice(0,void 0).map(function(b){return b.name}).join(" > ")}
;var Tt=new Set,Ut=0,Vt=0,Wt=0,Xt=[],Yt=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function mo(a){Zt(a)}
function $t(a){Zt(a,"WARNING")}
function au(a){a instanceof Error?Zt(a):(a=Qa(a)?JSON.stringify(a):String(a),a=new S(a),a.name="RejectedPromiseError",$t(a))}
function Zt(a,b,c,d,e,f,g,h){f=f===void 0?{}:f;f.name=c||P("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||P("INNERTUBE_CONTEXT_CLIENT_VERSION");c=f;b=b===void 0?"ERROR":b;g=g===void 0?!1:g;b=b===void 0?"ERROR":b;g=g===void 0?!1:g;if(a&&(a.hasOwnProperty("level")&&a.level&&(b=a.level),R("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),a.hasOwnProperty("args")&&d.push("Error args: "+
JSON.stringify(a.args)),d.push("File name: "+a.fileName),d.push("Stacktrace: "+a.stack),d=d.join("\n"),window.console.log(d,a)),!(Ut>=5))){d=Xt;var k=Vb(a);e=k.message||"Unknown Error";f=k.name||"UnknownError";var l=k.stack||a.i||"Not available";if(l.startsWith(f+": "+e)){var m=l.split("\n");m.shift();l=m.join("\n")}m=k.lineNumber||"Not available";k=k.fileName||"Not available";var n=0;if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var p=0;p<a.args.length&&!(n=Vm(a.args[p],"params."+p,c,n),
n>=500);p++);else if(a.hasOwnProperty("params")&&a.params){var t=a.params;if(typeof a.params==="object")for(p in t){if(t[p]){var v="params."+p,x=Xm(t[p]);c[v]=x;n+=v.length+x.length;if(n>500)break}}else c.params=Xm(t)}if(d.length)for(p=0;p<d.length&&!(n=Vm(d[p],"params.context."+p,c,n),n>=500);p++);navigator.vendor&&!c.hasOwnProperty("vendor")&&(c["device.vendor"]=navigator.vendor);p={message:e,name:f,lineNumber:m,fileName:k,stack:l,params:c,sampleWeight:1};c=Number(a.columnNumber);isNaN(c)||(p.lineNumber=
p.lineNumber+":"+c);if(a.level==="IGNORED")a=0;else a:{a=Rm();c=z(a.Wa);for(d=c.next();!d.done;d=c.next())if(d=d.value,p.message&&p.message.match(d.yh)){a=d.weight;break a}a=z(a.Qa);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.callback(p)){a=c.weight;break a}a=1}p.sampleWeight=a;a=z(Mm);for(c=a.next();!c.done;c=a.next())if(c=c.value,c.lc[p.name])for(e=z(c.lc[p.name]),d=e.next();!d.done;d=e.next())if(f=d.value,d=p.message.match(f.regexp)){p.params["params.error.original"]=d[0];e=f.groups;f={};
for(m=0;m<e.length;m++)f[e[m]]=d[m+1],p.params["params.error."+e[m]]=d[m+1];p.message=c.Jc(f);break}p.params||(p.params={});a=Rm();p.params["params.errorServiceSignature"]="msg="+a.Wa.length+"&cb="+a.Qa.length;p.params["params.serviceWorker"]="false";C.document&&C.document.querySelectorAll&&(p.params["params.fscripts"]=String(document.querySelectorAll("script:not([nonce])").length));(new Ag(Bg,"sample")).constructor!==Ag&&(p.params["params.fconst"]="true");window.yterr&&typeof window.yterr==="function"&&
window.yterr(p);if(p.sampleWeight!==0&&!Tt.has(p.message)){if(g&&R("web_enable_error_204"))bu(b===void 0?"ERROR":b,p);else{b=b===void 0?"ERROR":b;b==="ERROR"?(Sm.lb("handleError",p),R("record_app_crashed_web")&&Wt===0&&p.sampleWeight===1&&(Wt++,g={appCrashType:"APP_CRASH_TYPE_BREAKPAD"},R("report_client_error_with_app_crash_ks")||(g.systemHealth={crashData:{clientError:{logMessage:{message:p.message}}}}),no("appCrashed",g)),Vt++):b==="WARNING"&&Sm.lb("handleWarning",p);if(R("kevlar_gel_error_routing")){g=
b;h=h===void 0?{}:h;b:{a=z(Yt);for(c=a.next();!c.done;c=a.next())if(to(c.value.toLowerCase())){a=!0;break b}a=!1}if(a)h=void 0;else{c={stackTrace:p.stack};p.fileName&&(c.filename=p.fileName);a=p.lineNumber&&p.lineNumber.split?p.lineNumber.split(":"):[];a.length!==0&&(a.length!==1||isNaN(Number(a[0]))?a.length!==2||isNaN(Number(a[0]))||isNaN(Number(a[1]))||(c.lineNumber=Number(a[0]),c.columnNumber=Number(a[1])):c.lineNumber=Number(a[0]));a={level:"ERROR_LEVEL_UNKNOWN",message:p.message,errorClassName:p.name,
sampleWeight:p.sampleWeight};g==="ERROR"?a.level="ERROR_LEVEL_ERROR":g==="WARNING"&&(a.level="ERROR_LEVEL_WARNNING");c={isObfuscated:!0,browserStackInfo:c};h.pageUrl=window.location.href;h.kvPairs=[];P("FEXP_EXPERIMENTS")&&(h.experimentIds=P("FEXP_EXPERIMENTS"));d=P("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS");if(!Vl("web_disable_gel_stp_ecatcher_killswitch")&&d)for(e=z(Object.keys(d)),f=e.next();!f.done;f=e.next())f=f.value,h.kvPairs.push({key:f,value:String(d[f])});if(d=p.params)for(e=z(Object.keys(d)),
f=e.next();!f.done;f=e.next())f=f.value,h.kvPairs.push({key:"client."+f,value:String(d[f])});d=P("SERVER_NAME");e=P("SERVER_VERSION");d&&e&&(h.kvPairs.push({key:"server.name",value:d}),h.kvPairs.push({key:"server.version",value:e}));h={errorMetadata:h,stackTrace:c,logMessage:a}}h&&(no("clientError",h),(g==="ERROR"||R("errors_flush_gel_always_killswitch"))&&Et(void 0,void 0,!1))}R("suppress_error_204_logging")||bu(b,p)}try{Tt.add(p.message)}catch(y){}Ut++}}}
function bu(a,b){var c=b.params||{};a={urlParams:{a:"logerror",t:"jserror",type:b.name,msg:b.message.substr(0,250),line:b.lineNumber,level:a,"client.name":c.name},postParams:{url:P("PAGE_NAME",window.location.href),file:b.fileName},method:"POST"};c.version&&(a["client.version"]=c.version);if(a.postParams){b.stack&&(a.postParams.stack=b.stack);b=z(Object.keys(c));for(var d=b.next();!d.done;d=b.next())d=d.value,a.postParams["client."+d]=c[d];if(c=P("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS"))for(b=z(Object.keys(c)),
d=b.next();!d.done;d=b.next())d=d.value,a.postParams[d]=c[d];c=P("SERVER_NAME");b=P("SERVER_VERSION");c&&b&&(a.postParams["server.name"]=c,a.postParams["server.version"]=b)}Dm(P("ECATCHER_REPORT_HOST","")+"/error_204",a)}
function cu(a){var b=B.apply(1,arguments);a.args||(a.args=[]);a.args.push.apply(a.args,ra(b))}
;function du(){this.register=new Map}
function eu(a){a=z(a.register.values());for(var b=a.next();!b.done;b=a.next())b.value.Dh("ABORTED")}
du.prototype.clear=function(){eu(this);this.register.clear()};
var fu=new du;var gu=Date.now().toString();
function hu(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;a<16;a++){b=Date.now();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(Math.random()*256)}if(gu)for(a=1,b=0;b<gu.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^gu.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var iu,ju=C.ytLoggingDocDocumentNonce_;ju||(ju=hu(),D("ytLoggingDocDocumentNonce_",ju));iu=ju;function ku(a){this.h=a}
r=ku.prototype;r.getAsJson=function(){var a={};this.h.trackingParams!==void 0?a.trackingParams=this.h.trackingParams:(a.veType=this.h.veType,this.h.veCounter!==void 0&&(a.veCounter=this.h.veCounter),this.h.elementIndex!==void 0&&(a.elementIndex=this.h.elementIndex));this.h.dataElement!==void 0&&(a.dataElement=this.h.dataElement.getAsJson());this.h.youtubeData!==void 0&&(a.youtubeData=this.h.youtubeData);this.h.isCounterfactual&&(a.isCounterfactual=!0);return a};
r.getAsJspb=function(){var a=new yl;this.h.trackingParams!==void 0?a.setTrackingParams(this.h.trackingParams):(this.h.veType!==void 0&&K(a,2,ve(this.h.veType)),this.h.veCounter!==void 0&&K(a,6,ve(this.h.veCounter)),this.h.elementIndex!==void 0&&K(a,3,ve(this.h.elementIndex)),this.h.isCounterfactual&&K(a,5,re(!0)));if(this.h.dataElement!==void 0){var b=this.h.dataElement.getAsJspb();tf(a,yl,7,b)}this.h.youtubeData!==void 0&&tf(a,xl,8,this.h.jspbYoutubeData);return a};
r.toString=function(){return JSON.stringify(this.getAsJson())};
r.isClientVe=function(){return!this.h.trackingParams&&!!this.h.veType};
r.getLoggingDirectives=function(){return this.h.loggingDirectives};function lu(a){return P("client-screen-nonce-store",{})[a===void 0?0:a]}
function mu(a,b){b=b===void 0?0:b;var c=P("client-screen-nonce-store");c||(c={},Ul("client-screen-nonce-store",c));c[b]=a}
function nu(a){a=a===void 0?0:a;return a===0?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function ou(a){return P(nu(a===void 0?0:a))}
D("yt_logging_screen.getRootVeType",ou);function pu(){var a=P("csn-to-ctt-auth-info");a||(a={},Ul("csn-to-ctt-auth-info",a));return a}
function qu(){return Object.values(P("client-screen-nonce-store",{})).filter(function(a){return a!==void 0})}
function ru(a){a=lu(a===void 0?0:a);if(!a&&!P("USE_CSN_FALLBACK",!0))return null;a||(a="UNDEFINED_CSN");return a?a:null}
D("yt_logging_screen.getCurrentCsn",ru);function su(a,b,c){var d=pu();(c=ru(c))&&delete d[c];b&&(d[a]=b)}
function tu(a){return pu()[a]}
D("yt_logging_screen.getCttAuthInfo",tu);D("yt_logging_screen.setCurrentScreen",function(a,b,c,d){c=c===void 0?0:c;if(a!==lu(c)||b!==P(nu(c)))if(su(a,d,c),mu(a,c),Ul(nu(c),b),b=function(){setTimeout(function(){a&&no("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:iu,clientScreenNonce:a})},0)},"requestAnimationFrame"in window)try{window.requestAnimationFrame(b)}catch(e){b()}else b()});function uu(){var a=wg(vu),b;return(new ni(function(c,d){a.onSuccess=function(e){pm(e)?c(new wu(e)):d(new xu("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new xu("Unknown request error","net.unknown",e))};
a.onTimeout=function(e){d(new xu("Request timed out","net.timeout",e))};
b=Dm("//googleads.g.doubleclick.net/pagead/id",a)})).wc(function(c){if(c instanceof ui){var d;
(d=b)==null||d.abort()}return si(c)})}
function xu(a,b,c){$a.call(this,a+", errorCode="+b);this.errorCode=b;this.xhr=c;this.name="PromiseAjaxError"}
w(xu,$a);function wu(a){this.xhr=a}
;function yu(){this.h=0;this.i=null}
yu.prototype.then=function(a,b,c){return this.h===1&&a?(a=a.call(c,this.i))&&typeof a.then==="function"?a:zu(a):this.h===2&&b?(a=b.call(c,this.i))&&typeof a.then==="function"?a:Au(a):this};
yu.prototype.getValue=function(){return this.i};
yu.prototype.isRejected=function(){return this.h==2};
yu.prototype.$goog_Thenable=!0;function Au(a){var b=new yu;a=a===void 0?null:a;b.h=2;b.i=a===void 0?null:a;return b}
function zu(a){var b=new yu;a=a===void 0?null:a;b.h=1;b.i=a===void 0?null:a;return b}
;function Bu(a,b){var c=c===void 0?{}:c;a={method:b===void 0?"POST":b,mode:km(a)?"same-origin":"cors",credentials:km(a)?"same-origin":"include"};b={};for(var d=z(Object.keys(c)),e=d.next();!e.done;e=d.next())e=e.value,c[e]&&(b[e]=c[e]);Object.keys(b).length>0&&(a.headers=b);return a}
;function Cu(){return fg()||(bd||cd)&&to("applewebkit")&&!to("version")&&(!to("safari")||to("gsa/"))||ad&&to("version/")?!0:P("EOM_VISITOR_DATA")?!1:!0}
;function Du(a){a:{var b="EMBEDDED_PLAYER_MODE_UNKNOWN";window.location.hostname.includes("youtubeeducation.com")&&(b="EMBEDDED_PLAYER_MODE_PFL");var c=a.raw_embedded_player_response;if(!c&&(a=a.embedded_player_response))try{c=JSON.parse(a)}catch(e){break a}if(c)b:for(var d in Cl)if(Cl[d]==c.embeddedPlayerMode){b=Cl[d];break b}}return b==="EMBEDDED_PLAYER_MODE_PFL"}
;function Eu(a){$a.call(this,a.message||a.description||a.name);this.isMissing=a instanceof Fu;this.isTimeout=a instanceof xu&&a.errorCode=="net.timeout";this.isCanceled=a instanceof ui}
w(Eu,$a);Eu.prototype.name="BiscottiError";function Fu(){$a.call(this,"Biscotti ID is missing from server")}
w(Fu,$a);Fu.prototype.name="BiscottiMissingError";var vu={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},Gu=null;function Hu(){if(R("disable_biscotti_fetch_entirely_for_all_web_clients"))return Error("Biscotti id fetching has been disabled entirely.");if(!Cu())return Error("User has not consented - not fetching biscotti id.");var a=P("PLAYER_VARS",{});if(ug(a)=="1")return Error("Biscotti ID is not available in private embed mode");if(Du(a))return Error("Biscotti id fetching has been disabled for pfl.")}
function Nl(){var a=Hu();if(a!==void 0)return si(a);Gu||(Gu=uu().then(Iu).wc(function(b){return Ju(2,b)}));
return Gu}
function Iu(a){a=a.xhr.responseText;if(a.lastIndexOf(")]}'",0)!=0)throw new Fu;a=JSON.parse(a.substr(4));if((a.type||1)>1)throw new Fu;a=a.id;Ol(a);Gu=zu(a);Ku(18E5,2);return a}
function Ju(a,b){b=new Eu(b);Ol("");Gu=Au(b);a>0&&Ku(12E4,a-1);throw b;}
function Ku(a,b){qm(function(){uu().then(Iu,function(c){return Ju(b,c)}).wc(li)},a)}
function Lu(){try{var a=E("yt.ads.biscotti.getId_");return a?a():Nl()}catch(b){return si(b)}}
;var Bb=sa(["data-"]);function Mu(a){a&&(a.dataset?a.dataset[Nu()]="true":Db(a))}
function Ou(a){return a?a.dataset?a.dataset[Nu()]:a.getAttribute("data-loaded"):null}
var Pu={};function Nu(){return Pu.loaded||(Pu.loaded="loaded".replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()}))}
;function Qu(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||wg(b);this.assets=a.assets||{};this.attrs=a.attrs||wg(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Qu.prototype.clone=function(){var a=new Qu,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];Oa(c)=="object"?a[b]=wg(c):a[b]=c}return a};var Ru=["share/get_share_panel"],Su=["share/get_web_player_share_panel"],Tu=["feedback"],Uu=["notification/modify_channel_preference"],Vu=["browse/edit_playlist"],Wu=["subscription/subscribe"],Xu=["subscription/unsubscribe"];var Yu=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};D("yt.msgs_",Yu);function Zu(a){Pl(Yu,arguments)}
;function $u(a,b,c){av(a,b,c===void 0?null:c)}
function bv(a){a=cv(a);var b=document.getElementById(a);b&&(ys(a),b.parentNode.removeChild(b))}
function dv(a,b){a&&b&&(a=""+Ra(b),(a=ev[a])&&ws(a))}
function av(a,b,c){c=c===void 0?null:c;var d=cv(a),e=document.getElementById(d),f=e&&Ou(e),g=e&&!f;f?b&&b():(b&&(f=us(d,b),b=""+Ra(b),ev[b]=f),g||(e=fv(a,d,function(){Ou(e)||(Mu(e),xs(d),qm(function(){ys(d)},0))},c)))}
function fv(a,b,c,d){d=d===void 0?null:d;var e=Dg("SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Lb(e,tl(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function cv(a){var b=document.createElement("a");zb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Zb(a)}
var ev={};function gv(a){var b=hv(a),c=document.getElementById(b),d=c&&Ou(c);d||c&&!d||(c=iv(a,b,function(){if(!Ou(c)){Mu(c);xs(b);var e=Xa(ys,b);qm(e,0)}}))}
function iv(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=tl(a);Gb(d,a);(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function hv(a){var b=Dg("A");zb(b,new sb(a));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Zb(a)}
;function jv(a){var b=B.apply(1,arguments);if(!kv(a)||b.some(function(d){return!kv(d)}))throw Error("Only objects may be merged.");
b=z(b);for(var c=b.next();!c.done;c=b.next())lv(a,c.value)}
function lv(a,b){for(var c in b)if(kv(b[c])){if(c in a&&!kv(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});lv(a[c],b[c])}else if(mv(b[c])){if(c in a&&!mv(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);nv(a[c],b[c])}else a[c]=b[c];return a}
function nv(a,b){b=z(b);for(var c=b.next();!c.done;c=b.next())c=c.value,kv(c)?a.push(lv({},c)):mv(c)?a.push(nv([],c)):a.push(c);return a}
function kv(a){return typeof a==="object"&&!Array.isArray(a)}
function mv(a){return typeof a==="object"&&Array.isArray(a)}
;var ov="absolute_experiments app conditional_experiments debugcss debugjs expflag forced_experiments pbj pbjreload sbb spf spfreload sr_bns_address sttick".split(" ");
function pv(a,b){var c=c===void 0?!0:c;var d=P("VALID_SESSION_TEMPDATA_DOMAINS",[]),e=cc(window.location.href);e&&d.push(e);e=cc(a);if(Mb(d,e)>=0||!e&&a.lastIndexOf("/",0)==0)if(d=document.createElement("a"),zb(d,a),a=d.href)if(a=dc(a),a=ec(a))if(c&&!b.csn&&(b.itct||b.ved)&&(b=Object.assign({csn:ru()},b)),f){var f=parseInt(f,10);isFinite(f)&&f>0&&qv(a,b,f)}else qv(a,b)}
function qv(a,b,c){a=rv(a);b=b?hc(b):"";c=c||5;Cu()&&dn(a,b,c)}
function rv(a){for(var b=z(ov),c=b.next();!c.done;c=b.next())a=mc(a,c.value);return"ST-"+Zb(a).toString(36)}
;function sv(a){hq.call(this,1,arguments);this.csn=a}
w(sv,hq);var qq=new iq("screen-created",sv),tv=[],uv=0,vv=new Map,wv=new Map,xv=new Map;
function yv(a,b,c,d,e){e=e===void 0?!1:e;for(var f=zv({cttAuthInfo:tu(b)||void 0},b),g=z(d),h=g.next();!h.done;h=g.next()){h=h.value;var k=h.getAsJson();(sg(k)||!k.trackingParams&&!k.veType)&&$t(Error("Child VE logged with no data"));if(R("no_client_ve_attach_unless_shown")){var l=Av(h,b);if(k.veType&&!wv.has(l)&&!xv.has(l)&&!e){if(!R("il_attach_cache_limit")||vv.size<1E3){vv.set(l,[a,b,c,h]);return}R("il_attach_cache_limit")&&vv.size>1E3&&$t(new S("IL Attach cache exceeded limit"))}h=Av(c,b);vv.has(h)?
Bv(c,b):xv.set(h,!0)}}d=d.filter(function(m){m.csn!==b?(m.csn=b,m=!0):m=!1;return m});
c={csn:b,parentVe:c.getAsJson(),childVes:Pb(d,function(m){return m.getAsJson()})};
b==="UNDEFINED_CSN"?Cv("visualElementAttached",f,c):a?Rt("visualElementAttached",c,a,f):no("visualElementAttached",c,f)}
function Cv(a,b,c){tv.push({Ee:a,payload:c,uh:void 0,options:b});uv||(uv=rq())}
function sq(a){if(tv){for(var b=z(tv),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,no(c.Ee,c.payload,c.options));tv.length=0}uv=0}
function Av(a,b){return""+a.getAsJson().veType+a.getAsJson().veCounter+b}
function Bv(a,b){a=Av(a,b);vv.has(a)&&(b=vv.get(a)||[],yv(b[0],b[1],b[2],[b[3]],!0),vv.delete(a))}
function zv(a,b){R("log_sequence_info_on_gel_web")&&(a.sequenceGroup=b);return a}
;function Dv(){try{return!!self.localStorage}catch(a){return!1}}
;function Ev(a){a=a.match(/(.*)::.*::.*/);if(a!==null)return a[1]}
function Fv(a){if(Dv()){var b=Object.keys(window.localStorage);b=z(b);for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=Ev(c);d===void 0||a.includes(d)||self.localStorage.removeItem(c)}}}
function Gv(){if(!Dv())return!1;var a=wn(),b=Object.keys(window.localStorage);b=z(b);for(var c=b.next();!c.done;c=b.next())if(c=Ev(c.value),c!==void 0&&c!==a)return!0;return!1}
;function Hv(){var a=!1;try{a=!!window.sessionStorage.getItem("session_logininfo")}catch(b){a=!0}return(P("INNERTUBE_CLIENT_NAME")==="WEB"||P("INNERTUBE_CLIENT_NAME")==="WEB_CREATOR")&&a}
function Iv(a){if(P("LOGGED_IN",!0)&&Hv()){var b=P("VALID_SESSION_TEMPDATA_DOMAINS",[]);var c=cc(window.location.href);c&&b.push(c);c=cc(a);Mb(b,c)>=0||!c&&a.lastIndexOf("/",0)==0?(b=dc(a),(b=ec(b))?(b=rv(b),b=(b=en(b)||null)?gm(b):{}):b=null):b=null;b==null&&(b={});c=b;var d=void 0;Hv()?(d||(d=P("LOGIN_INFO")),d?(c.session_logininfo=d,c=!0):c=!1):c=!1;c&&pv(a,b)}}
;function Jv(a,b,c){b=b===void 0?{}:b;c=c===void 0?!1:c;var d=P("EVENT_ID");d&&(b.ei||(b.ei=d));b&&pv(a,b);if(c)return!1;Iv(a);var e=e===void 0?{}:e;var f=f===void 0?"":f;var g=g===void 0?window:g;a=ic(a,e);Iv(a);f=a+f;var h=h===void 0?wb:h;a:if(h=h===void 0?wb:h,f instanceof sb)h=f;else{for(a=0;a<h.length;++a)if(b=h[a],b instanceof ub&&b.te(f)){h=new sb(f);break a}h=void 0}g=g.location;h=yb(h||tb);h!==void 0&&(g.href=h);return!0}
;function Kv(a){if(ug(P("PLAYER_VARS",{}))!="1"){a&&Ml();try{Lu().then(function(){},function(){}),qm(Kv,18E5)}catch(b){Zl(b)}}}
;var Lv=new Map([["dark","USER_INTERFACE_THEME_DARK"],["light","USER_INTERFACE_THEME_LIGHT"]]);function Mv(){var a=a===void 0?window.location.href:a;if(R("kevlar_disable_theme_param"))return null;var b=ac(bc(5,a));if(R("enable_dark_theme_only_on_shorts")&&b!=null&&b.startsWith("/shorts/"))return"USER_INTERFACE_THEME_DARK";try{var c=hm(a).theme;return Lv.get(c)||null}catch(d){}return null}
;function Nv(){this.h={};if(this.i=gn()){var a=en("CONSISTENCY");a&&Ov(this,{encryptedTokenJarContents:a})}}
Nv.prototype.handleResponse=function(a,b){if(!b)throw Error("request needs to be passed into ConsistencyService");var c,d;b=((c=b.Ma.context)==null?void 0:(d=c.request)==null?void 0:d.consistencyTokenJars)||[];var e;if(a=(e=a.responseContext)==null?void 0:e.consistencyTokenJar){e=z(b);for(c=e.next();!c.done;c=e.next())delete this.h[c.value.encryptedTokenJarContents];Ov(this,a)}};
function Ov(a,b){if(b.encryptedTokenJarContents&&(a.h[b.encryptedTokenJarContents]=b,typeof b.expirationSeconds==="string")){var c=Number(b.expirationSeconds);setTimeout(function(){delete a.h[b.encryptedTokenJarContents]},c*1E3);
a.i&&dn("CONSISTENCY",b.encryptedTokenJarContents,c,void 0,!0)}}
;var Pv=window.location.hostname.split(".").slice(-2).join(".");function Qv(){this.j=-1;var a=P("LOCATION_PLAYABILITY_TOKEN");P("INNERTUBE_CLIENT_NAME")==="TVHTML5"&&(this.h=Rv(this))&&(a=this.h.get("yt-location-playability-token"));a&&(this.locationPlayabilityToken=a,this.i=void 0)}
var Sv;function Tv(){Sv=E("yt.clientLocationService.instance");Sv||(Sv=new Qv,D("yt.clientLocationService.instance",Sv));return Sv}
r=Qv.prototype;
r.setLocationOnInnerTubeContext=function(a){a.client||(a.client={});if(this.i)a.client.locationInfo||(a.client.locationInfo={}),a.client.locationInfo.latitudeE7=Math.floor(this.i.coords.latitude*1E7),a.client.locationInfo.longitudeE7=Math.floor(this.i.coords.longitude*1E7),a.client.locationInfo.horizontalAccuracyMeters=Math.round(this.i.coords.accuracy),a.client.locationInfo.forceLocationPlayabilityTokenRefresh=!0;else if(this.o||this.locationPlayabilityToken)a.client.locationPlayabilityToken=this.o||
this.locationPlayabilityToken};
r.handleResponse=function(a){var b;a=(b=a.responseContext)==null?void 0:b.locationPlayabilityToken;a!==void 0&&(this.locationPlayabilityToken=a,this.i=void 0,P("INNERTUBE_CLIENT_NAME")==="TVHTML5"?(this.h=Rv(this))&&this.h.set("yt-location-playability-token",a,15552E3):dn("YT_CL",JSON.stringify({loctok:a}),15552E3,Pv,!0))};
function Rv(a){return a.h===void 0?new eo("yt-client-location"):a.h}
r.clearLocationPlayabilityToken=function(a){a==="TVHTML5"?(this.h=Rv(this))&&this.h.remove("yt-location-playability-token"):fn("YT_CL");this.o=void 0;this.j!==-1&&(clearTimeout(this.j),this.j=-1)};
r.getCurrentPositionFromGeolocation=function(){var a=this;if(!(navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition))return Promise.reject(Error("Geolocation unsupported"));var b=!1,c=1E4;P("INNERTUBE_CLIENT_NAME")==="MWEB"&&(b=!0,c=15E3);return new Promise(function(d,e){navigator.geolocation.getCurrentPosition(function(f){a.i=f;d(f)},function(f){e(f)},{enableHighAccuracy:b,
maximumAge:0,timeout:c})})};
r.createUnpluggedLocationInfo=function(a){var b={};a=a.coords;if(a==null?0:a.latitude)b.latitudeE7=Math.floor(a.latitude*1E7);if(a==null?0:a.longitude)b.longitudeE7=Math.floor(a.longitude*1E7);if(a==null?0:a.accuracy)b.locationRadiusMeters=Math.round(a.accuracy);return b};
r.createLocationInfo=function(a){var b={};a=a.coords;if(a==null?0:a.latitude)b.latitudeE7=Math.floor(a.latitude*1E7);if(a==null?0:a.longitude)b.longitudeE7=Math.floor(a.longitude*1E7);return b};function Uv(a){var b={"Content-Type":"application/json"};P("EOM_VISITOR_DATA")?b["X-Goog-EOM-Visitor-Id"]=P("EOM_VISITOR_DATA"):P("VISITOR_DATA")&&(b["X-Goog-Visitor-Id"]=P("VISITOR_DATA"));b["X-Youtube-Bootstrap-Logged-In"]=P("LOGGED_IN",!1);P("DEBUG_SETTINGS_METADATA")&&(b["X-Debug-Settings-Metadata"]=P("DEBUG_SETTINGS_METADATA"));a!=="cors"&&((a=P("INNERTUBE_CONTEXT_CLIENT_NAME"))&&(b["X-Youtube-Client-Name"]=a),(a=P("INNERTUBE_CONTEXT_CLIENT_VERSION"))&&(b["X-Youtube-Client-Version"]=a),(a=P("CHROME_CONNECTED_HEADER"))&&
(b["X-Youtube-Chrome-Connected"]=a),(a=P("DOMAIN_ADMIN_STATE"))&&(b["X-Youtube-Domain-Admin-State"]=a),P("ENABLE_LAVA_HEADER_ON_IT_EXPANSION")&&(a=P("SERIALIZED_LAVA_DEVICE_CONTEXT"))&&(b["X-YouTube-Lava-Device-Context"]=a));return b}
;function Vv(){this.h={}}
Vv.prototype.contains=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)};
Vv.prototype.get=function(a){if(this.contains(a))return this.h[a]};
Vv.prototype.set=function(a,b){this.h[a]=b};
Vv.prototype.remove=function(a){delete this.h[a]};function Wv(){this.mappings=new Vv}
Wv.prototype.getModuleId=function(a){return a.serviceId.getModuleId()};
Wv.prototype.get=function(a){a:{var b=this.mappings.get(a.toString());switch(b.type){case "mapping":a=b.value;break a;case "factory":b=b.value();this.mappings.set(a.toString(),{type:"mapping",value:b});a=b;break a;default:a=Eb(b)}}return a};
new Wv;function Xv(a){return function(){return new a}}
;var Yv={},Zv=(Yv.WEB_UNPLUGGED="^unplugged/",Yv.WEB_UNPLUGGED_ONBOARDING="^unplugged/",Yv.WEB_UNPLUGGED_OPS="^unplugged/",Yv.WEB_UNPLUGGED_PUBLIC="^unplugged/",Yv.WEB_CREATOR="^creator/",Yv.WEB_KIDS="^kids/",Yv.WEB_EXPERIMENTS="^experiments/",Yv.WEB_MUSIC="^music/",Yv.WEB_REMIX="^music/",Yv.WEB_MUSIC_EMBEDDED_PLAYER="^music/",Yv.WEB_MUSIC_EMBEDDED_PLAYER="^main_app/|^sfv/",Yv);
function $v(a){var b=b===void 0?"UNKNOWN_INTERFACE":b;if(a.length===1)return a[0];var c=Zv[b];if(c){c=new RegExp(c);for(var d=z(a),e=d.next();!e.done;e=d.next())if(e=e.value,c.exec(e))return e}var f=[];Object.entries(Zv).forEach(function(g){var h=z(g);g=h.next().value;h=h.next().value;b!==g&&f.push(h)});
c=new RegExp(f.join("|"));a.sort(function(g,h){return g.length-h.length});
d=z(a);for(e=d.next();!e.done;e=d.next())if(e=e.value,!c.exec(e))return e;return a[0]}
;function aw(){}
aw.prototype.u=function(a,b,c){b=b===void 0?{}:b;c=c===void 0?cn:c;var d=a.clickTrackingParams,e=this.o,f=!1;f=f===void 0?!1:f;e=e===void 0?!1:e;var g=P("INNERTUBE_CONTEXT");if(g){g=xg(g);R("web_no_tracking_params_in_shell_killswitch")||delete g.clickTracking;g.client||(g.client={});var h=g.client;h.clientName==="MWEB"&&h.clientFormFactor!=="AUTOMOTIVE_FORM_FACTOR"&&(h.clientFormFactor=P("IS_TABLET")?"LARGE_FORM_FACTOR":"SMALL_FORM_FACTOR");h.screenWidthPoints=window.innerWidth;h.screenHeightPoints=
window.innerHeight;h.screenPixelDensity=Math.round(window.devicePixelRatio||1);h.screenDensityFloat=window.devicePixelRatio||1;h.utcOffsetMinutes=-Math.floor((new Date).getTimezoneOffset());var k=k===void 0?!1:k;ln();var l="USER_INTERFACE_THEME_LIGHT";on(165)?l="USER_INTERFACE_THEME_DARK":on(174)?l="USER_INTERFACE_THEME_LIGHT":!R("kevlar_legacy_browsers")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme)").matches&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(l="USER_INTERFACE_THEME_DARK");
k=k?l:Mv()||l;h.userInterfaceTheme=k;if(!f){if(k=tn())h.connectionType=k;R("web_log_effective_connection_type")&&(k=un())&&(g.client.effectiveConnectionType=k)}var m;if(R("web_log_memory_total_kbytes")&&((m=C.navigator)==null?0:m.deviceMemory)){var n;m=(n=C.navigator)==null?void 0:n.deviceMemory;g.client.memoryTotalKbytes=""+m*1E6}R("web_gcf_hashes_innertube")&&(k=aq())&&(n=k.coldConfigData,m=k.coldHashData,k=k.hotHashData,g.client.configInfo=g.client.configInfo||{},n&&(g.client.configInfo.coldConfigData=
n),m&&(g.client.configInfo.coldHashData=m),k&&(g.client.configInfo.hotHashData=k));n=hm(C.location.href);!R("web_populate_internal_geo_killswitch")&&n.internalcountrycode&&(h.internalGeo=n.internalcountrycode);h.clientName==="MWEB"||h.clientName==="WEB"?(h.mainAppWebInfo={graftUrl:C.location.href},R("kevlar_woffle")&&Ym.h&&(n=Ym.h,h.mainAppWebInfo.pwaInstallabilityStatus=!n.h&&n.i?"PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED":"PWA_INSTALLABILITY_STATUS_UNKNOWN"),h.mainAppWebInfo.webDisplayMode=Zm(),
h.mainAppWebInfo.isWebNativeShareAvailable=navigator&&navigator.share!==void 0):h.clientName==="TVHTML5"&&(!R("web_lr_app_quality_killswitch")&&(n=P("LIVING_ROOM_APP_QUALITY"))&&(h.tvAppInfo=Object.assign(h.tvAppInfo||{},{appQuality:n})),n=P("LIVING_ROOM_CERTIFICATION_SCOPE"))&&(h.tvAppInfo=Object.assign(h.tvAppInfo||{},{certificationScope:n}));if(!R("web_populate_time_zone_itc_killswitch")){b:{if(typeof Intl!=="undefined")try{var p=(new Intl.DateTimeFormat).resolvedOptions().timeZone;break b}catch(na){}p=
void 0}p&&(h.timeZone=p)}(p=P("EXPERIMENTS_TOKEN",""))?h.experimentsToken=p:delete h.experimentsToken;p=um();Nv.h||(Nv.h=new Nv);h=Nv.h.h;n=[];m=0;for(var t in h)n[m++]=h[t];g.request=Object.assign({},g.request,{internalExperimentFlags:p,consistencyTokenJars:n});!R("web_prequest_context_killswitch")&&(t=P("INNERTUBE_CONTEXT_PREQUEST_CONTEXT"))&&(g.request.externalPrequestContext=t);p=ln();t=on(58);p=p.get("gsml","");g.user=Object.assign({},g.user);t&&(g.user.enableSafetyMode=t);p&&(g.user.lockedSafetyMode=
!0);R("warm_op_csn_cleanup")?e&&(f=ru())&&(g.clientScreenNonce=f):!f&&(f=ru())&&(g.clientScreenNonce=f);d&&(g.clickTracking={clickTrackingParams:d});if(d=E("yt.mdx.remote.remoteClient_"))g.remoteClient=d;Tv().setLocationOnInnerTubeContext(g);try{var v=lm(),x=v.bid;delete v.bid;g.adSignalsInfo={params:[],bid:x};var y=z(Object.entries(v));for(var F=y.next();!F.done;F=y.next()){var I=z(F.value),V=I.next().value,ia=I.next().value;v=V;x=ia;d=void 0;(d=g.adSignalsInfo.params)==null||d.push({key:v,value:""+
x})}var Ia,cb;if(((Ia=g.client)==null?void 0:Ia.clientName)==="TVHTML5"||((cb=g.client)==null?void 0:cb.clientName)==="TVHTML5_UNPLUGGED"){var aa=P("INNERTUBE_CONTEXT");aa.adSignalsInfo&&(g.adSignalsInfo.advertisingId=aa.adSignalsInfo.advertisingId,g.adSignalsInfo.advertisingIdSignalType="DEVICE_ID_TYPE_CONNECTED_TV_IFA",g.adSignalsInfo.limitAdTracking=aa.adSignalsInfo.limitAdTracking)}}catch(na){Zt(na)}y=g}else Zt(Error("Error: No InnerTubeContext shell provided in ytconfig.")),y={};y={context:y};
if(F=this.i(a)){this.h(y,F,b);var X;b="/youtubei/v1/"+$v(this.j());(F=(X=gt(a.commandMetadata,Al))==null?void 0:X.apiUrl)&&(b=F);X=b;(b=P("INNERTUBE_HOST_OVERRIDE"))&&(X=String(b)+String(dc(X)));b={};R("json_condensed_response")&&(b.prettyPrint="false");X=jm(X,b||{},!1);a=Object.assign({},{command:a},void 0);a={input:X,hb:Bu(X),Ma:y,config:a};a.config.Vb?a.config.Vb.identity=c:a.config.Vb={identity:c};return a}Zt(new S("Error: Failed to create Request from Command.",a))};
ea.Object.defineProperties(aw.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!1}}});
function bw(){}
w(bw,aw);function cw(){}
w(cw,bw);cw.prototype.u=function(){return{input:"/getDatasyncIdsEndpoint",hb:Bu("/getDatasyncIdsEndpoint","GET"),Ma:{}}};
cw.prototype.j=function(){return[]};
cw.prototype.i=function(){};
cw.prototype.h=function(){};var dw={},ew=(dw.GET_DATASYNC_IDS=Xv(cw),dw);function fw(a){var b;(b=E("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},D("ytcsi."+(a||"")+"data_",b));return b}
function gw(){var a=fw();a.info||(a.info={});return a.info}
function hw(a){a=fw(a);a.metadata||(a.metadata={});return a.metadata}
function iw(a){a=fw(a);a.tick||(a.tick={});return a.tick}
function jw(a){a=fw(a);if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}else a.gel={gelTicks:{},gelInfos:{}};return a.gel}
function kw(a){a=jw(a);a.gelInfos||(a.gelInfos={});return a.gelInfos}
function lw(a){var b=fw(a).nonce;b||(b=hu(),fw(a).nonce=b);return b}
;function mw(){var a=E("ytcsi.debug");a||(a=[],D("ytcsi.debug",a),D("ytcsi.reference",{}));return a}
function nw(a){a=a||"";var b=E("ytcsi.reference");b||(mw(),b=E("ytcsi.reference"));if(b[a])return b[a];var c=mw(),d={timerName:a,info:{},tick:{},span:{},jspbInfo:[]};c.push(d);return b[a]=d}
;var U={},ow=(U["analytics.explore"]="LATENCY_ACTION_CREATOR_ANALYTICS_EXPLORE",U["artist.analytics"]="LATENCY_ACTION_CREATOR_ARTIST_ANALYTICS",U["artist.events"]="LATENCY_ACTION_CREATOR_ARTIST_CONCERTS",U["artist.presskit"]="LATENCY_ACTION_CREATOR_ARTIST_PROFILE",U["asset.claimed_videos"]="LATENCY_ACTION_CREATOR_CMS_ASSET_CLAIMED_VIDEOS",U["asset.composition"]="LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION",U["asset.composition_ownership"]="LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION_OWNERSHIP",U["asset.composition_policy"]=
"LATENCY_ACTION_CREATOR_CMS_ASSET_COMPOSITION_POLICY",U["asset.embeds"]="LATENCY_ACTION_CREATOR_CMS_ASSET_EMBEDS",U["asset.history"]="LATENCY_ACTION_CREATOR_CMS_ASSET_HISTORY",U["asset.issues"]="LATENCY_ACTION_CREATOR_CMS_ASSET_ISSUES",U["asset.licenses"]="LATENCY_ACTION_CREATOR_CMS_ASSET_LICENSES",U["asset.metadata"]="LATENCY_ACTION_CREATOR_CMS_ASSET_METADATA",U["asset.ownership"]="LATENCY_ACTION_CREATOR_CMS_ASSET_OWNERSHIP",U["asset.policy"]="LATENCY_ACTION_CREATOR_CMS_ASSET_POLICY",U["asset.references"]=
"LATENCY_ACTION_CREATOR_CMS_ASSET_REFERENCES",U["asset.shares"]="LATENCY_ACTION_CREATOR_CMS_ASSET_SHARES",U["asset.sound_recordings"]="LATENCY_ACTION_CREATOR_CMS_ASSET_SOUND_RECORDINGS",U["asset_group.assets"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_ASSETS",U["asset_group.campaigns"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_CAMPAIGNS",U["asset_group.claimed_videos"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_CLAIMED_VIDEOS",U["asset_group.metadata"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUP_METADATA",U["song.analytics"]=
"LATENCY_ACTION_CREATOR_SONG_ANALYTICS",U.creator_channel_dashboard="LATENCY_ACTION_CREATOR_CHANNEL_DASHBOARD",U["channel.analytics"]="LATENCY_ACTION_CREATOR_CHANNEL_ANALYTICS",U["channel.comments"]="LATENCY_ACTION_CREATOR_CHANNEL_COMMENTS",U["channel.content"]="LATENCY_ACTION_CREATOR_POST_LIST",U["channel.content.promotions"]="LATENCY_ACTION_CREATOR_PROMOTION_LIST",U["channel.copyright"]="LATENCY_ACTION_CREATOR_CHANNEL_COPYRIGHT",U["channel.editing"]="LATENCY_ACTION_CREATOR_CHANNEL_EDITING",U["channel.monetization"]=
"LATENCY_ACTION_CREATOR_CHANNEL_MONETIZATION",U["channel.music"]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC",U["channel.music_storefront"]="LATENCY_ACTION_CREATOR_CHANNEL_MUSIC_STOREFRONT",U["channel.playlists"]="LATENCY_ACTION_CREATOR_CHANNEL_PLAYLISTS",U["channel.translations"]="LATENCY_ACTION_CREATOR_CHANNEL_TRANSLATIONS",U["channel.videos"]="LATENCY_ACTION_CREATOR_CHANNEL_VIDEOS",U["channel.live_streaming"]="LATENCY_ACTION_CREATOR_LIVE_STREAMING",U["dialog.copyright_strikes"]="LATENCY_ACTION_CREATOR_DIALOG_COPYRIGHT_STRIKES",
U["dialog.video_copyright"]="LATENCY_ACTION_CREATOR_DIALOG_VIDEO_COPYRIGHT",U["dialog.uploads"]="LATENCY_ACTION_CREATOR_DIALOG_UPLOADS",U.owner="LATENCY_ACTION_CREATOR_CMS_DASHBOARD",U["owner.allowlist"]="LATENCY_ACTION_CREATOR_CMS_ALLOWLIST",U["owner.analytics"]="LATENCY_ACTION_CREATOR_CMS_ANALYTICS",U["owner.art_tracks"]="LATENCY_ACTION_CREATOR_CMS_ART_TRACKS",U["owner.assets"]="LATENCY_ACTION_CREATOR_CMS_ASSETS",U["owner.asset_groups"]="LATENCY_ACTION_CREATOR_CMS_ASSET_GROUPS",U["owner.bulk"]=
"LATENCY_ACTION_CREATOR_CMS_BULK_HISTORY",U["owner.campaigns"]="LATENCY_ACTION_CREATOR_CMS_CAMPAIGNS",U["owner.channel_invites"]="LATENCY_ACTION_CREATOR_CMS_CHANNEL_INVITES",U["owner.channels"]="LATENCY_ACTION_CREATOR_CMS_CHANNELS",U["owner.claimed_videos"]="LATENCY_ACTION_CREATOR_CMS_CLAIMED_VIDEOS",U["owner.claims"]="LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",U["owner.claims.manual"]="LATENCY_ACTION_CREATOR_CMS_MANUAL_CLAIMING",U["owner.delivery"]="LATENCY_ACTION_CREATOR_CMS_CONTENT_DELIVERY",
U["owner.delivery_templates"]="LATENCY_ACTION_CREATOR_CMS_DELIVERY_TEMPLATES",U["owner.issues"]="LATENCY_ACTION_CREATOR_CMS_ISSUES",U["owner.licenses"]="LATENCY_ACTION_CREATOR_CMS_LICENSES",U["owner.pitch_music"]="LATENCY_ACTION_CREATOR_CMS_PITCH_MUSIC",U["owner.policies"]="LATENCY_ACTION_CREATOR_CMS_POLICIES",U["owner.releases"]="LATENCY_ACTION_CREATOR_CMS_RELEASES",U["owner.reports"]="LATENCY_ACTION_CREATOR_CMS_REPORTS",U["owner.videos"]="LATENCY_ACTION_CREATOR_CMS_VIDEOS",U["playlist.videos"]=
"LATENCY_ACTION_CREATOR_PLAYLIST_VIDEO_LIST",U["post.comments"]="LATENCY_ACTION_CREATOR_POST_COMMENTS",U["post.edit"]="LATENCY_ACTION_CREATOR_POST_EDIT",U["promotion.edit"]="LATENCY_ACTION_CREATOR_PROMOTION_EDIT",U["video.analytics"]="LATENCY_ACTION_CREATOR_VIDEO_ANALYTICS",U["video.claims"]="LATENCY_ACTION_CREATOR_VIDEO_CLAIMS",U["video.comments"]="LATENCY_ACTION_CREATOR_VIDEO_COMMENTS",U["video.copyright"]="LATENCY_ACTION_CREATOR_VIDEO_COPYRIGHT",U["video.edit"]="LATENCY_ACTION_CREATOR_VIDEO_EDIT",
U["video.editor"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR",U["video.editor_async"]="LATENCY_ACTION_CREATOR_VIDEO_VIDEO_EDITOR_ASYNC",U["video.live_settings"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_SETTINGS",U["video.live_streaming"]="LATENCY_ACTION_CREATOR_VIDEO_LIVE_STREAMING",U["video.monetization"]="LATENCY_ACTION_CREATOR_VIDEO_MONETIZATION",U["video.policy"]="LATENCY_ACTION_CREATOR_VIDEO_POLICY",U["video.rights_management"]="LATENCY_ACTION_CREATOR_VIDEO_RIGHTS_MANAGEMENT",U["video.translations"]=
"LATENCY_ACTION_CREATOR_VIDEO_TRANSLATIONS",U),W={},pw=(W.auto_search="LATENCY_ACTION_AUTO_SEARCH",W.ad_to_ad="LATENCY_ACTION_AD_TO_AD",W.ad_to_video="LATENCY_ACTION_AD_TO_VIDEO",W.app_startup="LATENCY_ACTION_APP_STARTUP",W.browse="LATENCY_ACTION_BROWSE",W.cast_splash="LATENCY_ACTION_CAST_SPLASH",W.channel_activity="LATENCY_ACTION_KIDS_CHANNEL_ACTIVITY",W.channels="LATENCY_ACTION_CHANNELS",W.chips="LATENCY_ACTION_CHIPS",W.commerce_transaction="LATENCY_ACTION_COMMERCE_TRANSACTION",W.direct_playback=
"LATENCY_ACTION_DIRECT_PLAYBACK",W.editor="LATENCY_ACTION_EDITOR",W.embed="LATENCY_ACTION_EMBED",W.entity_key_serialization_perf="LATENCY_ACTION_ENTITY_KEY_SERIALIZATION_PERF",W.entity_key_deserialization_perf="LATENCY_ACTION_ENTITY_KEY_DESERIALIZATION_PERF",W.explore="LATENCY_ACTION_EXPLORE",W.favorites="LATENCY_ACTION_FAVORITES",W.home="LATENCY_ACTION_HOME",W.inboarding="LATENCY_ACTION_INBOARDING",W.library="LATENCY_ACTION_LIBRARY",W.live="LATENCY_ACTION_LIVE",W.live_pagination="LATENCY_ACTION_LIVE_PAGINATION",
W.management="LATENCY_ACTION_MANAGEMENT",W.mini_app="LATENCY_ACTION_MINI_APP_PLAY",W.notification_settings="LATENCY_ACTION_KIDS_NOTIFICATION_SETTINGS",W.onboarding="LATENCY_ACTION_ONBOARDING",W.parent_profile_settings="LATENCY_ACTION_KIDS_PARENT_PROFILE_SETTINGS",W.parent_tools_collection="LATENCY_ACTION_PARENT_TOOLS_COLLECTION",W.parent_tools_dashboard="LATENCY_ACTION_PARENT_TOOLS_DASHBOARD",W.player_att="LATENCY_ACTION_PLAYER_ATTESTATION",W.prebuffer="LATENCY_ACTION_PREBUFFER",W.prefetch="LATENCY_ACTION_PREFETCH",
W.profile_settings="LATENCY_ACTION_KIDS_PROFILE_SETTINGS",W.profile_switcher="LATENCY_ACTION_LOGIN",W.projects="LATENCY_ACTION_PROJECTS",W.reel_watch="LATENCY_ACTION_REEL_WATCH",W.results="LATENCY_ACTION_RESULTS",W.red="LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",W.premium="LATENCY_ACTION_PREMIUM_PAGE_GET_BROWSE",W.privacy_policy="LATENCY_ACTION_KIDS_PRIVACY_POLICY",W.review="LATENCY_ACTION_REVIEW",W.search_overview_answer="LATENCY_ACTION_SEARCH_OVERVIEW_ANSWER",W.search_ui="LATENCY_ACTION_SEARCH_UI",
W.search_suggest="LATENCY_ACTION_SUGGEST",W.search_zero_state="LATENCY_ACTION_SEARCH_ZERO_STATE",W.secret_code="LATENCY_ACTION_KIDS_SECRET_CODE",W.seek="LATENCY_ACTION_PLAYER_SEEK",W.settings="LATENCY_ACTION_SETTINGS",W.store="LATENCY_ACTION_STORE",W.supervision_dashboard="LATENCY_ACTION_KIDS_SUPERVISION_DASHBOARD",W.tenx="LATENCY_ACTION_TENX",W.video_to_ad="LATENCY_ACTION_VIDEO_TO_AD",W.watch="LATENCY_ACTION_WATCH",W.watch_it_again="LATENCY_ACTION_KIDS_WATCH_IT_AGAIN",W["watch,watch7"]="LATENCY_ACTION_WATCH",
W["watch,watch7_html5"]="LATENCY_ACTION_WATCH",W["watch,watch7ad"]="LATENCY_ACTION_WATCH",W["watch,watch7ad_html5"]="LATENCY_ACTION_WATCH",W.wn_comments="LATENCY_ACTION_LOAD_COMMENTS",W.ww_rqs="LATENCY_ACTION_WHO_IS_WATCHING",W.voice_assistant="LATENCY_ACTION_VOICE_ASSISTANT",W.cast_load_by_entity_to_watch="LATENCY_ACTION_CAST_LOAD_BY_ENTITY_TO_WATCH",W.networkless_performance="LATENCY_ACTION_NETWORKLESS_PERFORMANCE",W.gel_compression="LATENCY_ACTION_GEL_COMPRESSION",W.gel_jspb_serialize="LATENCY_ACTION_GEL_JSPB_SERIALIZE",
W.attestation_challenge_fetch="LATENCY_ACTION_ATTESTATION_CHALLENGE_FETCH",W);Object.assign(pw,ow);function qw(a,b){hq.call(this,1,arguments);this.timer=b}
w(qw,hq);var rw=new iq("aft-recorded",qw);D("ytLoggingGelSequenceIdObj_",C.ytLoggingGelSequenceIdObj_||{});var sw=C.ytLoggingLatencyUsageStats_||{};D("ytLoggingLatencyUsageStats_",sw);function tw(){this.h=0}
function uw(){tw.h||(tw.h=new tw);return tw.h}
tw.prototype.tick=function(a,b,c,d){vw(this,"tick_"+a+"_"+b)||no("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c,cttAuthInfo:d})};
tw.prototype.info=function(a,b,c){var d=Object.keys(a).join("");vw(this,"info_"+d+"_"+b)||(a=Object.assign({},a),a.clientActionNonce=b,no("latencyActionInfo",a,{cttAuthInfo:c}))};
tw.prototype.jspbInfo=function(){};
tw.prototype.span=function(a,b,c){var d=Object.keys(a).join("");vw(this,"span_"+d+"_"+b)||(a.clientActionNonce=b,no("latencyActionSpan",a,{cttAuthInfo:c}))};
function vw(a,b){sw[b]=sw[b]||{count:0};var c=sw[b];c.count++;c.time=T();a.h||(a.h=yn(function(){var d=T(),e;for(e in sw)sw[e]&&d-sw[e].time>6E4&&delete sw[e];a&&(a.h=0)},5E3));
return c.count>5?(c.count===6&&Math.random()*1E5<1&&(c=new S("CSI data exceeded logging limit with key",b.split("_")),b.indexOf("plev")>=0||$t(c)),!0):!1}
;var ww=window;function xw(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
function yw(){var a;if(R("csi_use_performance_navigation_timing")||R("csi_use_performance_navigation_timing_tvhtml5")){var b,c,d,e=Y==null?void 0:(a=Y.getEntriesByType)==null?void 0:(b=a.call(Y,"navigation"))==null?void 0:(c=b[0])==null?void 0:(d=c.toJSON)==null?void 0:d.call(c);e?(e.requestStart=zw(e.requestStart),e.responseEnd=zw(e.responseEnd),e.redirectStart=zw(e.redirectStart),e.redirectEnd=zw(e.redirectEnd),e.domainLookupEnd=zw(e.domainLookupEnd),e.connectStart=zw(e.connectStart),e.connectEnd=
zw(e.connectEnd),e.responseStart=zw(e.responseStart),e.secureConnectionStart=zw(e.secureConnectionStart),e.domainLookupStart=zw(e.domainLookupStart),e.isPerformanceNavigationTiming=!0,a=e):a=Y.timing}else a=R("csi_performance_timing_to_object")?JSON.parse(JSON.stringify(Y.timing)):Y.timing;return a}
function zw(a){return Math.round(Aw()+a)}
function Aw(){return(R("csi_use_time_origin")||R("csi_use_time_origin_tvhtml5"))&&Y.timeOrigin?Math.floor(Y.timeOrigin):Y.timing.navigationStart}
var Y=ww.performance||ww.mozPerformance||ww.msPerformance||ww.webkitPerformance||new xw;var Bw=!1,Cw=!1,Dw={'script[name="scheduler/scheduler"]':"sj",'script[name="player/base"]':"pj",'link[rel="preload"][name="player/embed"]':"pej",'link[rel="stylesheet"][name="www-player"]':"pc",'link[rel="stylesheet"][name="player/www-player"]':"pc",'script[name="desktop_polymer/desktop_polymer"]':"dpj",'link[rel="import"][name="desktop_polymer"]':"dph",'script[name="mobile-c3"]':"mcj",'link[rel="stylesheet"][name="mobile-c3"]':"mcc",'script[name="player-plasma-ias-phone/base"]':"mcppj",'script[name="player-plasma-ias-tablet/base"]':"mcptj",
'link[rel="stylesheet"][name="mobile-polymer-player-ias"]':"mcpc",'link[rel="stylesheet"][name="mobile-polymer-player-svg-ias"]':"mcpsc",'script[name="mobile_blazer_core_mod"]':"mbcj",'link[rel="stylesheet"][name="mobile_blazer_css"]':"mbc",'script[name="mobile_blazer_logged_in_users_mod"]':"mbliuj",'script[name="mobile_blazer_logged_out_users_mod"]':"mblouj",'script[name="mobile_blazer_noncore_mod"]':"mbnj","#player_css":"mbpc",'script[name="mobile_blazer_desktopplayer_mod"]':"mbpj",'link[rel="stylesheet"][name="mobile_blazer_tablet_css"]':"mbtc",
'script[name="mobile_blazer_watch_mod"]':"mbwj"};Wa(Y.clearResourceTimings||Y.webkitClearResourceTimings||Y.mozClearResourceTimings||Y.msClearResourceTimings||Y.oClearResourceTimings||li,Y);function Ew(a,b){if(!R("web_csi_action_sampling_enabled")||!fw(b).actionDisabled){var c=nw(b||"");jv(c.info,a);a.loadType&&(c=a.loadType,hw(b).loadType=c);jv(kw(b),a);c=lw(b);b=fw(b).cttAuthInfo;uw().info(a,c,b)}}
function Fw(){var a,b,c,d;return((d=Is().resolve(new Cs(Xp))==null?void 0:(a=Yp())==null?void 0:(b=a.loggingHotConfig)==null?void 0:(c=b.csiConfig)==null?void 0:c.debugTicks)!=null?d:[]).map(function(e){return Object.values(e)[0]})}
function Z(a,b,c){if(!R("web_csi_action_sampling_enabled")||!fw(c).actionDisabled){var d=lw(c),e;if(e=R("web_csi_debug_sample_enabled")&&d){(Is().resolve(new Cs(Xp))==null?0:Yp())&&!Cw&&(Cw=!0,Z("gcfl",T(),c));var f,g,h;e=(Is().resolve(new Cs(Xp))==null?void 0:(f=Yp())==null?void 0:(g=f.loggingHotConfig)==null?void 0:(h=g.csiConfig)==null?void 0:h.debugSampleWeight)||0;if(f=e!==0)b:{f=Fw();if(f.length>0)for(g=0;g<f.length;g++)if(a===f[g]){f=!0;break b}f=!1}if(f){for(g=f=0;g<d.length;g++)f=f*31+d.charCodeAt(g),
g<d.length-1&&(f%=0x800000000000);e=f%1E5%e!==0;fw(c).debugTicksExcludedLogged||(f={},f.debugTicksExcluded=e,Ew(f,c));fw(c).debugTicksExcludedLogged=!0}else e=!1}if(!e){if(a[0]!=="_"&&(e=a,f=b,!R("enable_strip_performance_mark_in_prod")&&Y.mark))if(e.startsWith("mark_")||(e="mark_"+e),c&&(e+=" ("+c+")"),f===void 0||R("web_csi_disable_alt_time_performance_mark"))Y.mark(e);else{f=R("csi_use_performance_navigation_timing")||R("csi_use_performance_navigation_timing_tvhtml5")?f-Y.timeOrigin:f-(Y.timeOrigin||
Y.timing.navigationStart);try{Y.mark(e,{startTime:f})}catch(k){}}e=nw(c||"");e.tick[a]=b||T();if(e.callback&&e.callback[a])for(e=z(e.callback[a]),f=e.next();!f.done;f=e.next())f=f.value,f();e=jw(c);e.gelTicks&&(e.gelTicks[a]=!0);f=iw(c);e=b||T();R("log_repeated_ytcsi_ticks")?a in f||(f[a]=e):f[a]=e;f=fw(c).cttAuthInfo;a==="_start"?(a=uw(),vw(a,"baseline_"+d)||no("latencyActionBaselined",{clientActionNonce:d},{timestamp:b,cttAuthInfo:f})):uw().tick(a,d,b,f);Gw(c);return e}}}
function Hw(){var a=document;if("visibilityState"in a)a=a.visibilityState;else{var b=$r+"VisibilityState";a=b in a?a[b]:void 0}switch(a){case "hidden":return 0;case "visible":return 1;case "prerender":return 2;case "unloaded":return 3;default:return-1}}
function Iw(){function a(f,g,h){g=g.match("_rid")?g.split("_rid")[0]:g;typeof h==="number"&&(h=JSON.stringify(h));f.requestIds?f.requestIds.push({endpoint:g,id:h}):f.requestIds=[{endpoint:g,id:h}]}
for(var b={},c=z(Object.entries(P("TIMING_INFO",{}))),d=c.next();!d.done;d=c.next()){var e=z(d.value);d=e.next().value;e=e.next().value;switch(d){case "GetBrowse_rid":a(b,d,e);break;case "GetGuide_rid":a(b,d,e);break;case "GetHome_rid":a(b,d,e);break;case "GetPlayer_rid":a(b,d,e);break;case "GetSearch_rid":a(b,d,e);break;case "GetSettings_rid":a(b,d,e);break;case "GetTrending_rid":a(b,d,e);break;case "GetWatchNext_rid":a(b,d,e);break;case "yt_red":b.isRedSubscriber=!!e;break;case "yt_ad":b.isMonetized=
!!e}}return b}
function Jw(a,b){a=document.querySelector(a);if(!a)return!1;var c="",d=a.nodeName;d==="SCRIPT"?(c=a.src,c||(c=a.getAttribute("data-timing-href"))&&(c=window.location.protocol+c)):d==="LINK"&&(c=a.href);Hb(window)&&a.setAttribute("nonce",Hb(window));return c?(a=Y.getEntriesByName(c))&&a[0]&&(a=a[0],c=Aw(),Z("rsf_"+b,c+Math.round(a.fetchStart)),Z("rse_"+b,c+Math.round(a.responseEnd)),a.transferSize!==void 0&&a.transferSize===0)?!0:!1:!1}
function Kw(){var a=window.location.protocol,b=Y.getEntriesByType("resource");b=Ob(b,function(c){return c.name.indexOf(a+"//fonts.gstatic.com/s/")===0});
(b=Qb(b,function(c,d){return d.duration>c.duration?d:c},{duration:0}))&&b.startTime>0&&b.responseEnd>0&&(Z("wffs",zw(b.startTime)),Z("wffe",zw(b.responseEnd)))}
function Lw(a){var b=Mw("aft",a);if(b)return b;b=P((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=b.length,d=0;d<c;d++){var e=Mw(b[d],a);if(e)return e}return NaN}
function Mw(a,b){if(a=iw(b)[a])return typeof a==="number"?a:a[a.length-1]}
function Gw(a){var b=Mw("_start",a),c=Lw(a),d=R("enable_cow_info_csi")||!Bw;b&&c&&d&&(nq(rw,new qw(Math.round(c-b),a)),Bw=!0)}
function Nw(){if(Y.getEntriesByType){var a=Y.getEntriesByType("paint");if(a=Rb(a,function(c){return c.name==="first-paint"}))return zw(a.startTime)}var b;
R("csi_use_performance_navigation_timing")||R("csi_use_performance_navigation_timing_tvhtml5")?b=Y.getEntriesByType("first-paint")[0].startTime:b=Y.timing.Ah;return b?Math.max(0,b):0}
;function Ow(a,b){Yl(function(){nw("").info.actionType=a;b&&Ul("TIMING_AFT_KEYS",b);Ul("TIMING_ACTION",a);var c=Iw();Object.keys(c).length>0&&Ew(c);c={isNavigation:!0,actionType:pw[P("TIMING_ACTION")]||"LATENCY_ACTION_UNKNOWN"};var d=P("PREVIOUS_ACTION");d&&(c.previousAction=pw[d]||"LATENCY_ACTION_UNKNOWN");if(d=P("CLIENT_PROTOCOL"))c.httpProtocol=d;if(d=P("CLIENT_TRANSPORT"))c.transportProtocol=d;(d=ru())&&d!=="UNDEFINED_CSN"&&(c.clientScreenNonce=d);d=Hw();if(d===1||d===-1)c.isVisible=!0;hw();gw();
c.loadType="cold";d=gw();var e=yw(),f=Aw(),g=P("CSI_START_TIMESTAMP_MILLIS",0);g>0&&!R("embeds_web_enable_csi_start_override_killswitch")&&(f=g);f&&(Z("srt",e.responseStart),d.prerender!==1&&Z("_start",f,void 0));d=Nw();d>0&&Z("fpt",d);d=yw();d.isPerformanceNavigationTiming&&Ew({performanceNavigationTiming:!0},void 0);Z("nreqs",d.requestStart,void 0);Z("nress",d.responseStart,void 0);Z("nrese",d.responseEnd,void 0);d.redirectEnd-d.redirectStart>0&&(Z("nrs",d.redirectStart,void 0),Z("nre",d.redirectEnd,
void 0));d.domainLookupEnd-d.domainLookupStart>0&&(Z("ndnss",d.domainLookupStart,void 0),Z("ndnse",d.domainLookupEnd,void 0));d.connectEnd-d.connectStart>0&&(Z("ntcps",d.connectStart,void 0),Z("ntcpe",d.connectEnd,void 0));d.secureConnectionStart>=Aw()&&d.connectEnd-d.secureConnectionStart>0&&(Z("nstcps",d.secureConnectionStart,void 0),Z("ntcpe",d.connectEnd,void 0));Y&&"getEntriesByType"in Y&&Kw();d=[];if(document.querySelector&&Y&&Y.getEntriesByName)for(var h in Dw)Dw.hasOwnProperty(h)&&(e=Dw[h],
Jw(h,e)&&d.push(e));if(d.length>0)for(c.resourceInfo=[],h=z(d),d=h.next();!d.done;d=h.next())c.resourceInfo.push({resourceCache:d.value});Ew(c);c=jw();c.preLoggedGelInfos||(c.preLoggedGelInfos=[]);h=c.preLoggedGelInfos;c=kw();d=void 0;for(e=0;e<h.length;e++)if(f=h[e],f.loadType){d=f.loadType;break}if(hw().loadType==="cold"&&(c.loadType==="cold"||d==="cold")){d=iw();e=jw();e=e.gelTicks?e.gelTicks:e.gelTicks={};for(var k in d)if(!(k in e))if(typeof d[k]==="number")Z(k,Mw(k));else if(R("log_repeated_ytcsi_ticks"))for(f=
z(d[k]),g=f.next();!g.done;g=f.next())g=g.value,Z(k.slice(1),g);k={};d=!1;h=z(h);for(e=h.next();!e.done;e=h.next())d=e.value,jv(c,d),jv(k,d),d=!0;d&&Ew(k)}D("ytglobal.timingready_",!0);k=P("TIMING_ACTION");E("ytglobal.timingready_")&&k&&Pw()&&Lw()&&Gw()})()}
function Pw(){return Yl(function(){return Qw()})()}
function Rw(a,b,c){Yl(Ew)(a,b,c===void 0?!1:c)}
function Sw(a,b,c){return Yl(Z)(a,b,c)}
function Qw(){return Yl(function(){return"_start"in iw()})()}
function Tw(){Yl(function(){var a=lw();requestAnimationFrame(function(){setTimeout(function(){a===lw()&&Sw("ol",void 0,void 0)},0)})})()}
var Uw=window;Uw.ytcsi&&(Uw.ytcsi.infoGel=Rw,Uw.ytcsi.tick=Sw);var Vw="tokens consistency mss client_location entities adblock_detection response_received_commands store PLAYER_PRELOAD shorts_prefetch".split(" "),Ww=["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse","type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.PlayerResponse"];function Xw(a,b,c,d){this.u=a;this.ea=b;this.o=c;this.j=d;this.i=void 0;this.h=new Map;a.Qb||(a.Qb={});a.Qb=Object.assign({},ew,a.Qb)}
function Yw(a,b,c,d){if(Xw.h!==void 0){if(d=Xw.h,a=[a!==d.u,b!==d.ea,c!==d.o,!1,!1,!1,void 0!==d.i],a.some(function(e){return e}))throw new S("InnerTubeTransportService is already initialized",a);
}else Xw.h=new Xw(a,b,c,d)}
function Zw(a){var b={signalServiceEndpoint:{signal:"GET_DATASYNC_IDS"}};var c=c===void 0?cn:c;var d=$w(a,b);return d?new ni(function(e,f){var g,h,k,l,m;return A(function(n){switch(n.h){case 1:return n.yield(d,2);case 2:g=n.i;h=g.u(b,void 0,c);if(!h){f(new S("Error: Failed to build request for command.",b));n.D(0);break}Iv(h.input);l=((k=h.hb)==null?void 0:k.mode)==="cors"?"cors":void 0;if(a.o.ff){var p=h.config,t;p=p==null?void 0:(t=p.Vb)==null?void 0:t.sessionIndex;t=bn(0,{sessionIndex:p});m=Object.assign({},
Uv(l),t);n.D(4);break}return n.yield(ax(h.config,l),5);case 5:m=n.i;case 4:e(bx(a,h,m)),n.h=0}})}):si(new S("Error: No request builder found for command.",b))}
function cx(a,b,c){var d;if(b&&!(b==null?0:(d=b.sequenceMetaData)==null?0:d.skipProcessing)&&a.j){d=z(Vw);for(var e=d.next();!e.done;e=d.next())e=e.value,a.j[e]&&a.j[e].handleResponse(b,c)}}
function bx(a,b,c){var d=d===void 0?function(){}:d;
var e,f,g,h,k,l,m,n,p,t,v,x,y,F,I,V,ia,Ia,cb,aa,X,na,Ma,La,Xg,Yg,Pr,Qr,Rr,Sr;return A(function(ha){switch(ha.h){case 1:ha.D(2);break;case 3:if((e=ha.i)&&!e.isExpired())return ha.return(Promise.resolve(e.h()));case 2:if(!((f=b)==null?0:(g=f.Ma)==null?0:g.context)){ha.D(4);break}h=b.Ma.context;ha.D(5);break;case 5:k=z([]),l=k.next();case 8:if(l.done){ha.D(4);break}m=l.value;return ha.yield(m.Ch(h),9);case 9:l=k.next();ha.D(8);break;case 4:if((n=a.i)==null||!n.Hh(b.input,b.Ma)){ha.D(12);break}return ha.yield(a.i.wh(b.input,
b.Ma),13);case 13:return p=ha.i,cx(a,p,b),ha.return(p);case 12:return(x=(v=b.config)==null?void 0:v.Fh)&&a.h.has(x)?t=a.h.get(x):(y=JSON.stringify(b.Ma),V=(I=(F=b.hb)==null?void 0:F.headers)!=null?I:{},b.hb=Object.assign({},b.hb,{headers:Object.assign({},V,c)}),ia=Object.assign({},b.hb),b.hb.method==="POST"&&(ia=Object.assign({},ia,{body:y})),((Ia=b.config)==null?0:Ia.Je)&&Sw(b.config.Je),cb=function(){return a.ea.fetch(b.input,ia,b.config)},t=cb(),x&&a.h.set(x,t)),ha.yield(t,14);
case 14:if((aa=ha.i)&&"error"in aa&&((X=aa)==null?0:(na=X.error)==null?0:na.details))for(Ma=aa.error.details,La=z(Ma),Xg=La.next();!Xg.done;Xg=La.next())Yg=Xg.value,(Pr=Yg["@type"])&&Ww.indexOf(Pr)>-1&&(delete Yg["@type"],aa=Yg);x&&a.h.has(x)&&a.h.delete(x);((Qr=b.config)==null?0:Qr.Ke)&&Sw(b.config.Ke);if(aa||(Rr=a.i)==null||!Rr.kh(b.input,b.Ma)){ha.D(15);break}return ha.yield(a.i.vh(b.input,b.Ma),16);case 16:aa=ha.i;case 15:return cx(a,aa,b),((Sr=b.config)==null?0:Sr.Ge)&&Sw(b.config.Ge),d(),ha.return(aa||
void 0)}})}
function $w(a,b){a:{a=a.u;var c,d=(c=gt(b,Bl))==null?void 0:c.signal;if(d&&a.Qb&&(c=a.Qb[d])){var e=c();break a}var f;if((c=(f=gt(b,zl))==null?void 0:f.request)&&a.Ud&&(f=a.Ud[c])){e=f();break a}for(e in b)if(a.bd[e]&&(b=a.bd[e])){e=b();break a}e=void 0}if(e!==void 0)return Promise.resolve(e)}
function ax(a,b){var c,d,e,f;return A(function(g){if(g.h==1){e=(c=a)==null?void 0:(d=c.Vb)==null?void 0:d.sessionIndex;var h=g.yield;var k=bn(0,{sessionIndex:e});if(!(k instanceof ni)){var l=new ni(li);oi(l,2,k);k=l}return h.call(g,k,2)}f=g.i;return g.return(Promise.resolve(Object.assign({},Uv(b),f)))})}
;var dx=new Bs("INNERTUBE_TRANSPORT_TOKEN");function ex(){}
w(ex,bw);ex.prototype.j=function(){return Wu};
ex.prototype.i=function(a){return gt(a,Ll)||void 0};
ex.prototype.h=function(a,b,c){c=c===void 0?{}:c;b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params);c.botguardResponse&&(a.botguardResponse=c.botguardResponse);c.feature&&(a.clientFeature=c.feature)};
ea.Object.defineProperties(ex.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});function fx(){}
w(fx,bw);fx.prototype.j=function(){return Xu};
fx.prototype.i=function(a){return gt(a,Kl)||void 0};
fx.prototype.h=function(a,b){b.channelIds&&(a.channelIds=b.channelIds);b.siloName&&(a.siloName=b.siloName);b.params&&(a.params=b.params)};
ea.Object.defineProperties(fx.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});var gx=new Bs("SHARE_CLIENT_PARAMS_PROVIDER_TOKEN");function hx(a){this.H=a}
w(hx,bw);hx.prototype.j=function(){return Ru};
hx.prototype.i=function(a){return gt(a,Fl)||gt(a,Gl)||gt(a,El)};
hx.prototype.h=function(a,b){b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);if(b.clientParamIdentifier){var c;if((c=this.H)==null?0:c.h(b.clientParamIdentifier))a.clientParams=this.H.i(b.clientParamIdentifier)}};
hx[As]=[gx];function ix(){}
w(ix,bw);ix.prototype.j=function(){return Tu};
ix.prototype.i=function(a){return gt(a,Dl)||void 0};
ix.prototype.h=function(a,b,c){a.feedbackTokens=[];b.feedbackToken&&a.feedbackTokens.push(b.feedbackToken);if(b=b.cpn||c.cpn)a.feedbackContext={cpn:b};a.isFeedbackTokenUnencrypted=!!c.is_feedback_token_unencrypted;a.shouldMerge=!1;c.extra_feedback_tokens&&(a.shouldMerge=!0,a.feedbackTokens=a.feedbackTokens.concat(c.extra_feedback_tokens))};
ea.Object.defineProperties(ix.prototype,{o:{configurable:!0,enumerable:!0,get:function(){return!0}}});function jx(){}
w(jx,bw);jx.prototype.j=function(){return Uu};
jx.prototype.i=function(a){return gt(a,Jl)||void 0};
jx.prototype.h=function(a,b){b.params&&(a.params=b.params);b.secondaryParams&&(a.secondaryParams=b.secondaryParams)};function kx(){}
w(kx,bw);kx.prototype.j=function(){return Vu};
kx.prototype.i=function(a){return gt(a,Il)||void 0};
kx.prototype.h=function(a,b){b.actions&&(a.actions=b.actions);b.params&&(a.params=b.params);b.playlistId&&(a.playlistId=b.playlistId)};function lx(){}
w(lx,bw);lx.prototype.j=function(){return Su};
lx.prototype.i=function(a){return gt(a,Hl)};
lx.prototype.h=function(a,b,c){c=c===void 0?{}:c;b.serializedShareEntity&&(a.serializedSharedEntity=b.serializedShareEntity);c.includeListId&&(a.includeListId=!0)};var mx=new Bs("FETCH_FN_TOKEN"),nx=new Bs("PARSE_FN_TOKEN");function ox(a,b){var c=B.apply(2,arguments);a=a===void 0?0:a;S.call(this,b,c);this.errorType=a;Object.setPrototypeOf(this,this.constructor.prototype)}
w(ox,S);var px=new Bs("NETWORK_SLI_TOKEN");function qx(a,b,c){this.h=a;this.i=b;this.j=c}
qx.prototype.fetch=function(a,b,c){var d=this,e,f,g;return A(function(h){e=rx(d,a,b);g=(f=d.i)!=null?f:fetch;return h.return(g(e).then(function(k){return d.handleResponse(k,c)}).catch(function(k){$t(k);
if((c==null?0:c.ce)&&k instanceof ox&&k.errorType===1)return Promise.reject(k)}))})};
function rx(a,b,c){if(a.h){var d=ac(bc(5,mc(b,"key")))||"/UNKNOWN_PATH";a.h.start(d)}a=c;R("wug_networking_gzip_request")&&(a=Pq(c));return new window.Request(b,a)}
qx.prototype.handleResponse=function(a,b){var c,d=(c=this.j)!=null?c:JSON.parse;c=a.text().then(function(e){if((b==null?0:b.ue)&&a.ok)return Of(b.ue,e);e=e.replace(")]}'","");if((b==null?0:b.ce)&&e)try{var f=d(e)}catch(h){throw new ox(1,"JSON parsing failed after fetch");}var g;return(g=f)!=null?g:d(e)});
a.redirected||a.ok?this.h&&this.h.success():(this.h&&this.h.qh(),c=c.then(function(e){$t(new S("Error: API fetch failed",a.status,a.url,e));return Object.assign({},e,{errorMetadata:{status:a.status}})}));
return c};
qx[As]=[new Cs(px),new Cs(mx),new Cs(nx)];var sx=new Bs("NETWORK_MANAGER_TOKEN");var tx;function ux(){var a,b,c;return A(function(d){if(d.h==1)return a=Is().resolve(dx),a?d.yield(Zw(a),2):($t(Error("InnertubeTransportService unavailable in fetchDatasyncIds")),d.return(void 0));if(b=d.i){if(b.errorMetadata)return $t(Error("Datasync IDs fetch responded with "+b.errorMetadata.status+": "+b.error)),d.return(void 0);c=b.nh;return d.return(c)}$t(Error("Network request to get Datasync IDs failed."));return d.return(void 0)})}
;function vx(){var a;return(a=P("WEB_PLAYER_CONTEXT_CONFIGS"))==null?void 0:a.WEB_PLAYER_CONTEXT_CONFIG_ID_EMBEDDED_PLAYER}
;var wx=C.caches,xx;function yx(a){var b=a.indexOf(":");return b===-1?{qd:a}:{qd:a.substring(0,b),datasyncId:a.substring(b+1)}}
function zx(){return A(function(a){if(xx!==void 0)return a.return(xx);xx=new Promise(function(b){var c;return A(function(d){switch(d.h){case 1:return za(d,2),d.yield(wx.open("test-only"),4);case 4:return d.yield(wx.delete("test-only"),5);case 5:d.h=3;d.o=0;break;case 2:if(c=Aa(d),c instanceof Error&&c.name==="SecurityError")return b(!1),d.return();case 3:b("caches"in window),d.h=0}})});
return a.return(xx)})}
function Ax(a){var b,c,d,e,f,g,h;A(function(k){if(k.h==1)return k.yield(zx(),2);if(k.h!=3){if(!k.i)return k.return(!1);b=[];return k.yield(wx.keys(),3)}c=k.i;d=z(c);for(e=d.next();!e.done;e=d.next())f=e.value,g=yx(f),h=g.datasyncId,!h||a.includes(h)||b.push(wx.delete(f));return k.return(Promise.all(b).then(function(l){return l.some(function(m){return m})}))})}
function Bx(){var a,b,c,d,e,f,g;return A(function(h){if(h.h==1)return h.yield(zx(),2);if(h.h!=3){if(!h.i)return h.return(!1);a=wn("cache contains other");return h.yield(wx.keys(),3)}b=h.i;c=z(b);for(d=c.next();!d.done;d=c.next())if(e=d.value,f=yx(e),(g=f.datasyncId)&&g!==a)return h.return(!0);return h.return(!1)})}
;function Cx(){try{return!!self.sessionStorage}catch(a){return!1}}
;function Dx(a){a=a.match(/(.*)::.*::.*/);if(a!==null)return a[1]}
function Ex(a){if(Cx()){var b=Object.keys(window.sessionStorage);b=z(b);for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=Dx(c);d===void 0||a.includes(d)||self.sessionStorage.removeItem(c)}}}
function Fx(){if(!Cx())return!1;var a=wn(),b=Object.keys(window.sessionStorage);b=z(b);for(var c=b.next();!c.done;c=b.next())if(c=Dx(c.value),c!==void 0&&c!==a)return!0;return!1}
;function Gx(){ux().then(function(a){a&&(Cp(a),Ax(a),Fv(a),Ex(a))})}
function Hx(){var a=new Hr;Ej.pa(function(){var b,c,d,e,f;return A(function(g){switch(g.h){case 1:if(R("ytidb_clear_optimizations_killswitch")){g.D(2);break}b=wn("clear");if(b.startsWith("V")&&b.endsWith("||")){var h=[b];Cp(h);Ax(h);Fv(h);Ex(h);return g.return()}c=Gv();d=Fx();return g.yield(Bx(),3);case 3:return e=g.i,g.yield(Dp(),4);case 4:if(f=g.i,!(c||d||e||f))return g.return();case 2:a.va()?Gx():a.h.add("publicytnetworkstatus-online",Gx,!0,void 0,void 0),g.h=0}})})}
;function Ix(){this.state=1;this.h=null}
r=Ix.prototype;r.initialize=function(a,b,c){if(a.program){var d,e=(d=a.interpreterUrl)!=null?d:null;if(a.interpreterSafeScript){var f=a.interpreterSafeScript;f?((f=f.privateDoNotAccessOrElseSafeScriptWrappedValue)?(d=jb(),f=new Ib(d?d.createScript(f):f)):f=null,d=f):d=null}else d=(f=a.interpreterScript)!=null?f:null;a.interpreterSafeUrl&&(e=sl(a.interpreterSafeUrl).toString());Jx(this,d,e,a.program,b,c)}else $t(Error("Cannot initialize botguard without program"))};
function Jx(a,b,c,d,e,f){var g=g===void 0?"trayride":g;c?(a.state=2,$u(c,function(){window[g]?Kx(a,d,g,e):(a.state=3,bv(c),$t(new S("Unable to load Botguard","from "+c)))},f)):b?(f=Dg("SCRIPT"),b instanceof Ib?Kb(f,b):f.textContent=b,f.nonce=Hb(window),document.head.appendChild(f),document.head.removeChild(f),window[g]?Kx(a,d,g,e):(a.state=4,$t(new S("Unable to load Botguard from JS")))):$t(new S("Unable to load VM; no url or JS provided"))}
r.isLoading=function(){return this.state===2};
function Kx(a,b,c,d){a.state=5;try{var e=new qj({program:b,ke:c,Ae:{disable:!R("att_web_record_metrics"),Fa:"aGIf"}});e.af.then(function(){a.state=6;d&&d(b)});
a.Rc(e)}catch(f){a.state=7,f instanceof Error&&$t(f)}}
r.invoke=function(a){a=a===void 0?{}:a;return this.Uc()?this.Fd({cd:a}):null};
r.dispose=function(){this.Rc(null);this.state=8};
r.Uc=function(){return!!this.h};
r.Fd=function(a){return this.h.yd(a)};
r.Rc=function(a){tc(this.h);this.h=a};var Lx=[],Mx=!1;function Nx(){if(!R("disable_biscotti_fetch_for_ad_blocker_detection")&&!R("disable_biscotti_fetch_entirely_for_all_web_clients")&&Cu()){var a=P("PLAYER_VARS",{});if(ug(a)!="1"&&!Du(a)){var b=function(){Mx=!0;"google_ad_status"in window?Ul("DCLKSTAT",1):Ul("DCLKSTAT",2)};
try{$u("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Lx.push(Ej.pa(function(){if(!(Mx||"google_ad_status"in window)){try{dv("//static.doubleclick.net/instream/ad_status.js",b)}catch(c){}Mx=!0;Ul("DCLKSTAT",3)}},5E3))}}}
function Ox(){var a=Number(P("DCLKSTAT",0));return isNaN(a)?0:a}
;function Px(){var a=E("yt.abuse.playerAttLoader");return a&&["bgvma","bgvmb","bgvmc"].every(function(b){return b in a})?a:null}
;function Qx(){Ix.apply(this,arguments)}
w(Qx,Ix);Qx.prototype.Rc=function(a){var b;(b=Px())==null||b.bgvma();a?(b={bgvma:a.dispose.bind(a),bgvmb:a.snapshot.bind(a),bgvmc:a.yd.bind(a)},D("yt.abuse.playerAttLoader",b),D("yt.abuse.playerAttLoaderRun",function(c){return a.snapshot(c)})):(D("yt.abuse.playerAttLoader",null),D("yt.abuse.playerAttLoaderRun",null))};
Qx.prototype.Uc=function(){return!!Px()};
Qx.prototype.Fd=function(a){return Px().bgvmc(a)};function Rx(a){Ss.call(this,a===void 0?"document_active":a);var b=this;this.o=10;this.h=new Map;this.transitions=[{from:"document_active",to:"document_disposed_preventable",action:this.G},{from:"document_active",to:"document_disposed",action:this.u},{from:"document_disposed_preventable",to:"document_disposed",action:this.u},{from:"document_disposed_preventable",to:"flush_logs",action:this.H},{from:"document_disposed_preventable",to:"document_active",action:this.i},{from:"document_disposed",to:"flush_logs",
action:this.H},{from:"document_disposed",to:"document_active",action:this.i},{from:"document_disposed",to:"document_disposed",action:function(){}},
{from:"flush_logs",to:"document_active",action:this.i}];window.addEventListener("pagehide",function(c){b.transition("document_disposed",{event:c})});
window.addEventListener("beforeunload",function(c){b.transition("document_disposed_preventable",{event:c})})}
w(Rx,Ss);Rx.prototype.G=function(a,b){if(!this.h.get("document_disposed_preventable")){a(b==null?void 0:b.event);var c,d;if((b==null?0:(c=b.event)==null?0:c.defaultPrevented)||(b==null?0:(d=b.event)==null?0:d.returnValue)){b.event.returnValue||(b.event.returnValue=!0);b.event.defaultPrevented||b.event.preventDefault();this.h=new Map;this.transition("document_active");return}}this.h.set("document_disposed_preventable",!0);this.h.get("document_disposed")?this.transition("flush_logs"):this.transition("document_disposed")};
Rx.prototype.u=function(a,b){this.h.get("document_disposed")?this.transition("document_active"):(a(b==null?void 0:b.event),this.h.set("document_disposed",!0),this.transition("flush_logs"))};
Rx.prototype.H=function(a,b){a(b==null?void 0:b.event);this.transition("document_active")};
Rx.prototype.i=function(){this.h=new Map};function Sx(a){Ss.call(this,a===void 0?"document_visibility_unknown":a);var b=this;this.transitions=[{from:"document_visibility_unknown",to:"document_visible",action:this.i},{from:"document_visibility_unknown",to:"document_hidden",action:this.h},{from:"document_visibility_unknown",to:"document_foregrounded",action:this.H},{from:"document_visibility_unknown",to:"document_backgrounded",action:this.u},{from:"document_visible",to:"document_hidden",action:this.h},{from:"document_visible",to:"document_foregrounded",
action:this.H},{from:"document_visible",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_visible",action:this.i},{from:"document_foregrounded",to:"document_hidden",action:this.h},{from:"document_foregrounded",to:"document_foregrounded",action:this.H},{from:"document_hidden",to:"document_visible",action:this.i},{from:"document_hidden",to:"document_backgrounded",action:this.u},{from:"document_hidden",to:"document_hidden",action:this.h},{from:"document_backgrounded",to:"document_hidden",
action:this.h},{from:"document_backgrounded",to:"document_backgrounded",action:this.u},{from:"document_backgrounded",to:"document_visible",action:this.i}];document.addEventListener("visibilitychange",function(c){document.visibilityState==="visible"?b.transition("document_visible",{event:c}):b.transition("document_hidden",{event:c})});
R("visibility_lifecycles_dynamic_backgrounding")&&(window.addEventListener("blur",function(c){b.transition("document_backgrounded",{event:c})}),window.addEventListener("focus",function(c){b.transition("document_foregrounded",{event:c})}))}
w(Sx,Ss);Sx.prototype.i=function(a,b){a(b==null?void 0:b.event);R("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_foregrounded")};
Sx.prototype.h=function(a,b){a(b==null?void 0:b.event);R("visibility_lifecycles_dynamic_backgrounding")&&this.transition("document_backgrounded")};
Sx.prototype.u=function(a,b){a(b==null?void 0:b.event)};
Sx.prototype.H=function(a,b){a(b==null?void 0:b.event)};function Tx(){this.o=new Rx;this.u=new Sx}
Tx.prototype.install=function(){var a=B.apply(0,arguments),b=this;a.forEach(function(c){b.o.install(c)});
a.forEach(function(c){b.u.install(c)})};function Ux(){this.o=[];this.i=new Map;this.h=new Map;this.j=new Set}
Ux.prototype.clickCommand=function(a,b,c){var d=a.clickTrackingParams;c=c===void 0?0:c;if(d)if(c=ru(c===void 0?0:c)){a=this.client;d=new ku({trackingParams:d});var e=void 0;if(R("no_client_ve_attach_unless_shown")){var f=Av(d,c);wv.set(f,!0);Bv(d,c)}e=e||"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";f=zv({cttAuthInfo:tu(c)||void 0},c);d={csn:c,ve:d.getAsJson(),gestureType:e};b&&(d.clientData=b);c==="UNDEFINED_CSN"?Cv("visualElementGestured",f,d):a?Rt("visualElementGestured",d,a,f):no("visualElementGestured",
d,f);b=!0}else b=!1;else b=!1;return b};
Ux.prototype.stateChanged=function(a,b,c){this.visualElementStateChanged(new ku({trackingParams:a}),b,c===void 0?0:c)};
Ux.prototype.visualElementStateChanged=function(a,b,c){c=c===void 0?0:c;if(c===0&&this.j.has(c))this.o.push([a,b]);else{var d=c;d=d===void 0?0:d;c=ru(d);a||(a=(a=ou(d===void 0?0:d))?new ku({veType:a,youtubeData:void 0,jspbYoutubeData:void 0}):null);var e=a;c&&e&&(a=this.client,d=zv({cttAuthInfo:tu(c)||void 0},c),b={csn:c,ve:e.getAsJson(),clientData:b},c==="UNDEFINED_CSN"?Cv("visualElementStateChanged",d,b):a?Rt("visualElementStateChanged",b,a,d):no("visualElementStateChanged",b,d))}};
function Vx(a,b){if(b===void 0)for(var c=qu(),d=0;d<c.length;d++)c[d]!==void 0&&Vx(a,c[d]);else a.i.forEach(function(e,f){(f=a.h.get(f))&&yv(a.client,b,f,e)}),a.i.clear(),a.h.clear()}
;function Wx(){Tx.call(this);var a={};this.install((a.document_disposed={callback:this.h},a));R("combine_ve_grafts")&&(a={},this.install((a.document_disposed={callback:this.i},a)));a={};this.install((a.flush_logs={callback:this.j},a));R("web_log_cfg_cee_ks")||yn(Xx)}
w(Wx,Tx);Wx.prototype.j=function(){no("finalPayload",{csn:ru()})};
Wx.prototype.h=function(){eu(fu)};
Wx.prototype.i=function(){var a=Vx;Ux.h||(Ux.h=new Ux);a(Ux.h)};
function Xx(){var a=P("CLIENT_EXPERIMENT_EVENTS");if(a){var b=Yd();a=z(a);for(var c=a.next();!c.done;c=a.next())c=c.value,b(c)&&no("genericClientExperimentEvent",{eventType:c});delete Tl.CLIENT_EXPERIMENT_EVENTS}}
;function Yx(){}
function Zx(){var a=E("ytglobal.storage_");a||(a=new Yx,D("ytglobal.storage_",a));return a}
Yx.prototype.estimate=function(){var a,b,c;return A(function(d){a=navigator;return((b=a.storage)==null?0:b.estimate)?d.return(a.storage.estimate()):((c=a.webkitTemporaryStorage)==null?0:c.queryUsageAndQuota)?d.return($x()):d.return()})};
function $x(){var a=navigator;return new Promise(function(b,c){var d;(d=a.webkitTemporaryStorage)!=null&&d.queryUsageAndQuota?a.webkitTemporaryStorage.queryUsageAndQuota(function(e,f){b({usage:e,quota:f})},function(e){c(e)}):c(Error("webkitTemporaryStorage is not supported."))})}
D("ytglobal.storageClass_",Yx);function lo(a,b){var c=this;this.handleError=a;this.h=b;this.i=!1;self.document===void 0||self.addEventListener("beforeunload",function(){c.i=!0});
this.j=Math.random()<=.2}
lo.prototype.Ea=function(a){this.handleError(a)};
lo.prototype.logEvent=function(a,b){switch(a){case "IDB_DATA_CORRUPTED":R("idb_data_corrupted_killswitch")||this.h("idbDataCorrupted",b);break;case "IDB_UNEXPECTEDLY_CLOSED":this.h("idbUnexpectedlyClosed",b);break;case "IS_SUPPORTED_COMPLETED":R("idb_is_supported_completed_killswitch")||this.h("idbIsSupportedCompleted",b);break;case "QUOTA_EXCEEDED":ay(this,b);break;case "TRANSACTION_ENDED":this.j&&Math.random()<=.1&&this.h("idbTransactionEnded",b);break;case "TRANSACTION_UNEXPECTEDLY_ABORTED":a=
Object.assign({},b,{hasWindowUnloaded:this.i}),this.h("idbTransactionAborted",a)}};
function ay(a,b){Zx().estimate().then(function(c){c=Object.assign({},b,{isSw:self.document===void 0,isIframe:self!==self.top,deviceStorageUsageMbytes:by(c==null?void 0:c.usage),deviceStorageQuotaMbytes:by(c==null?void 0:c.quota)});a.h("idbQuotaExceeded",c)})}
function by(a){return typeof a==="undefined"?"-1":String(Math.ceil(a/1048576))}
;var cy={},dy=(cy["api.invalidparam"]=2,cy.auth=150,cy["drm.auth"]=150,cy["heartbeat.net"]=150,cy["heartbeat.servererror"]=150,cy["heartbeat.stop"]=150,cy["html5.unsupportedads"]=5,cy["fmt.noneavailable"]=5,cy["fmt.decode"]=5,cy["fmt.unplayable"]=5,cy["html5.missingapi"]=5,cy["html5.unsupportedlive"]=5,cy["drm.unavailable"]=5,cy["mrm.blocked"]=151,cy["embedder.identity.denied"]=152,cy);var ey=new Set("endSeconds startSeconds mediaContentUrl suggestedQuality videoId rct rctn".split(" "));function fy(a){return(a.search("cue")===0||a.search("load")===0)&&a!=="loadModule"}
function gy(a,b,c){if(typeof a==="string")return{videoId:a,startSeconds:b,suggestedQuality:c};b={};c=z(ey);for(var d=c.next();!d.done;d=c.next())d=d.value,a[d]&&(b[d]=a[d]);return b}
function hy(a,b,c,d){if(Qa(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};typeof a==="string"&&a.length===16?b.list="PL"+a:b.playlist=a;return b}
;function iy(a){G.call(this);var b=this;this.api=a;this.X=this.u=!1;this.A=[];this.P={};this.j=[];this.i=[];this.Y=!1;this.sessionId=this.h=null;this.targetOrigin="*";this.U=R("web_player_split_event_bus_iframe");this.o=P("POST_MESSAGE_ORIGIN")||document.location.protocol+"//"+document.location.hostname;this.G=function(c){a:if(!(b.o!=="*"&&c.origin!==b.o||b.h&&c.source!==b.h||typeof c.data!=="string")){try{var d=JSON.parse(c.data)}catch(h){break a}if(d)switch(d.event){case "listening":var e=c.source;
c=c.origin;d=d.id;c!=="null"&&(b.o=b.targetOrigin=c);b.h=e;b.sessionId=d;if(b.u){b.X=!0;b.u=!1;b.sendMessage("initialDelivery",jy(b));b.sendMessage("onReady");e=z(b.A);for(d=e.next();!d.done;d=e.next())ky(b,d.value);b.A=[]}break;case "command":if(e=d.func,d=d.args,e==="addEventListener"&&d)e=d[0],d=c.origin,e==="onReady"?b.api.logApiCall(e+" invocation",d):e==="onError"&&b.Y&&(b.api.logApiCall(e+" invocation",d,b.errorCode),b.errorCode=void 0),b.api.logApiCall(e+" registration",d),b.P[e]||e==="onReady"||
(c=ly(b,e,d),b.i.push({eventType:e,listener:c,origin:d}),b.U?b.api.handleExternalCall("addEventListener",[e,c],d):b.api.addEventListener(e,c),b.P[e]=!0);else if(c=c.origin,b.api.isExternalMethodAvailable(e,c)){d=d||[];if(d.length>0&&fy(e)){var f=d;if(Qa(f[0])&&!Array.isArray(f[0]))var g=f[0];else switch(g={},e){case "loadVideoById":case "cueVideoById":g=gy(f[0],f[1]!==void 0?Number(f[1]):void 0,f[2]);break;case "loadVideoByUrl":case "cueVideoByUrl":g=f[0];typeof g==="string"&&(g={mediaContentUrl:g,
startSeconds:f[1]!==void 0?Number(f[1]):void 0,suggestedQuality:f[2]});c:{if((f=g.mediaContentUrl)&&(f=/\/([ve]|embed)\/([^#?]+)/.exec(f))&&f[2]){f=f[2];break c}f=null}g.videoId=f;g=gy(g);break;case "loadPlaylist":case "cuePlaylist":g=hy(f[0],f[1],f[2],f[3])}d.length=1;d[0]=g}b.api.handleExternalCall(e,d,c);fy(e)&&my(b,jy(b))}}}};
ny.addEventListener("message",this.G);if(a=P("WIDGET_ID"))this.sessionId=a;oy(this,"onReady",function(){b.u=!0;var c=b.api.getVideoData();if(!c.isPlayable){b.Y=!0;c=c.errorCode;var d=d===void 0?5:d;b.errorCode=c?dy[c]||d:d;b.sendMessage("onError",Number(b.errorCode))}});
oy(this,"onVideoProgress",this.Ve.bind(this));oy(this,"onVolumeChange",this.We.bind(this));oy(this,"onApiChange",this.Oe.bind(this));oy(this,"onPlaybackQualityChange",this.Se.bind(this));oy(this,"onPlaybackRateChange",this.Te.bind(this));oy(this,"onStateChange",this.Ue.bind(this));oy(this,"onWebglSettingsChanged",this.Xe.bind(this));oy(this,"onCaptionsTrackListChanged",this.Pe.bind(this));oy(this,"captionssettingschanged",this.Qe.bind(this))}
w(iy,G);function my(a,b){a.sendMessage("infoDelivery",b)}
r=iy.prototype;r.sendMessage=function(a,b){a={event:a,info:b===void 0?null:b};this.X?ky(this,a):this.A.push(a)};
function ly(a,b,c){return function(d){b==="onError"?a.api.logApiCall(b+" invocation",c,d):a.api.logApiCall(b+" invocation",c);a.sendMessage(b,d)}}
function oy(a,b,c){a.j.push({eventType:b,listener:c});a.api.addEventListener(b,c)}
function jy(a){if(!a.api)return null;var b=a.api.getApiInterface();Sb(b,"getVideoData");for(var c={apiInterface:b},d=0,e=b.length;d<e;d++){var f=b[d];if(f.search("get")===0||f.search("is")===0){var g=0;f.search("get")===0?g=3:f.search("is")===0&&(g=2);g=f.charAt(g).toLowerCase()+f.substring(g+1);try{var h=a.api[f]();c[g]=h}catch(k){}}}c.videoData=a.api.getVideoData();c.currentTimeLastUpdated_=Date.now()/1E3;return c}
r.Ue=function(a){a={playerState:a,currentTime:this.api.getCurrentTime(),duration:this.api.getDuration(),videoData:this.api.getVideoData(),videoStartBytes:0,videoBytesTotal:this.api.getVideoBytesTotal(),videoLoadedFraction:this.api.getVideoLoadedFraction(),playbackQuality:this.api.getPlaybackQuality(),availableQualityLevels:this.api.getAvailableQualityLevels(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getVideoUrl&&
(a.videoUrl=this.api.getVideoUrl());this.api.getVideoContentRect&&(a.videoContentRect=this.api.getVideoContentRect());this.api.getProgressState&&(a.progressState=this.api.getProgressState());this.api.getPlaylist&&(a.playlist=this.api.getPlaylist());this.api.getPlaylistIndex&&(a.playlistIndex=this.api.getPlaylistIndex());this.api.getStoryboardFormat&&(a.storyboardFormat=this.api.getStoryboardFormat());my(this,a)};
r.Se=function(a){a={playbackQuality:a};this.api.getAvailableQualityLevels&&(a.availableQualityLevels=this.api.getAvailableQualityLevels());this.api.getPreferredQuality&&(a.preferredQuality=this.api.getPreferredQuality());my(this,a)};
r.Te=function(a){my(this,{playbackRate:a})};
r.Oe=function(){for(var a=this.api.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.api.getOptions(e);a.join(", ");b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.api.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
r.We=function(){my(this,{muted:this.api.isMuted(),volume:this.api.getVolume()})};
r.Ve=function(a){a={currentTime:a,videoBytesLoaded:this.api.getVideoBytesLoaded(),videoLoadedFraction:this.api.getVideoLoadedFraction(),currentTimeLastUpdated_:Date.now()/1E3,playbackRate:this.api.getPlaybackRate(),mediaReferenceTime:this.api.getMediaReferenceTime()};this.api.getProgressState&&(a.progressState=this.api.getProgressState());my(this,a)};
r.Xe=function(){my(this,{sphericalProperties:this.api.getSphericalProperties()})};
r.Pe=function(){if(this.api.getCaptionTracks){var a={captionTracks:this.api.getCaptionTracks()};my(this,a)}};
r.Qe=function(){if(this.api.getSubtitlesUserSettings){var a={subtitlesUserSettings:this.api.getSubtitlesUserSettings()};my(this,a)}};
function ky(a,b){if(a.h){b.channel="widget";a.sessionId&&(b.id=a.sessionId);try{var c=JSON.stringify(b);a.h.postMessage(c,a.targetOrigin)}catch(d){$t(d)}}}
r.aa=function(){G.prototype.aa.call(this);ny.removeEventListener("message",this.G);for(var a=0;a<this.j.length;a++){var b=this.j[a];this.api.removeEventListener(b.eventType,b.listener)}this.j=[];for(a=0;a<this.i.length;a++)b=this.i[a],this.U?this.api.handleExternalCall("removeEventListener",[b.eventType,b.listener],b.origin):this.api.removeEventListener(b.eventType,b.listener);this.i=[]};
var ny=window;function py(a,b,c){G.call(this);var d=this;this.api=a;this.id=b;this.origin=c;this.h={};this.j=R("web_player_split_event_bus_iframe");this.i=function(e){a:if(e.origin===d.origin){var f=e.data;if(typeof f==="string"){try{f=JSON.parse(f)}catch(k){break a}if(f.command){var g=f.command;f=f.data;e=e.origin;if(!d.da){var h=f||{};switch(g){case "addEventListener":typeof h.event==="string"&&d.addListener(h.event,e);break;case "removeEventListener":typeof h.event==="string"&&d.removeListener(h.event,e);break;
default:d.api.isReady()&&d.api.isExternalMethodAvailable(g,e||null)&&(f=qy(g,f||{}),f=d.api.handleExternalCall(g,f,e||null),(f=ry(g,f))&&sy(d,g,f))}}}}}};
ty.addEventListener("message",this.i);sy(this,"RECEIVING")}
w(py,G);r=py.prototype;r.addListener=function(a,b){if(!(a in this.h)){var c=this.Re.bind(this,a);this.h[a]=c;this.addEventListener(a,c,b)}};
r.Re=function(a,b){this.da||sy(this,a,uy(a,b))};
r.removeListener=function(a,b){a in this.h&&(this.removeEventListener(a,this.h[a],b),delete this.h[a])};
r.addEventListener=function(a,b,c){this.j?a==="onReady"?this.api.addEventListener(a,b):this.api.handleExternalCall("addEventListener",[a,b],c||null):this.api.addEventListener(a,b)};
r.removeEventListener=function(a,b,c){this.j?a==="onReady"?this.api.removeEventListener(a,b):this.api.handleExternalCall("removeEventListener",[a,b],c||null):this.api.removeEventListener(a,b)};
function qy(a,b){switch(a){case "loadVideoById":return[gy(b)];case "cueVideoById":return[gy(b)];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return[hy(b)];case "cuePlaylist":return[hy(b)];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];
case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function ry(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
function uy(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}if(b!=null)return{value:b}}
function sy(a,b,c){a.da||(b={id:a.id,command:b},c&&(b.data=c),vy.postMessage(JSON.stringify(b),a.origin))}
r.aa=function(){ty.removeEventListener("message",this.i);for(var a in this.h)this.h.hasOwnProperty(a)&&this.removeListener(a);G.prototype.aa.call(this)};
var ty=window,vy=window.parent;var wy=new Qx;function xy(){return wy.Uc()}
function yy(a){a=a===void 0?{}:a;return wy.invoke(a)}
;function zy(a,b,c,d,e){G.call(this);var f=this;this.A=b;this.webPlayerContextConfig=d;this.xc=e;this.Oa=!1;this.api={};this.ia=this.u=null;this.U=new M;this.h={};this.Y=this.oa=this.elementId=this.Pa=this.config=null;this.X=!1;this.j=this.G=null;this.Da={};this.yc=["onReady"];this.lastError=null;this.mb=NaN;this.P={};this.ga=0;this.i=this.o=a;vc(this,this.U);Ay(this);c?this.ga=setTimeout(function(){f.loadNewVideoConfig(c)},0):d&&(By(this),Cy(this))}
w(zy,G);r=zy.prototype;r.getId=function(){return this.A};
r.loadNewVideoConfig=function(a){if(!this.da){this.ga&&(clearTimeout(this.ga),this.ga=0);var b=a||{};b instanceof Qu||(b=new Qu(b));this.config=b;this.setConfig(a);Cy(this);this.isReady()&&Dy(this)}};
function By(a){var b;a.webPlayerContextConfig?b=a.webPlayerContextConfig.rootElementId:b=a.config.attrs.id;a.elementId=b||a.elementId;a.elementId==="video-player"&&(a.elementId=a.A,a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.A:a.config.attrs.id=a.A);var c;((c=a.i)==null?void 0:c.id)===a.elementId&&(a.elementId+="-player",a.webPlayerContextConfig?a.webPlayerContextConfig.rootElementId=a.elementId:a.config.attrs.id=a.elementId)}
r.setConfig=function(a){this.Pa=a;this.config=Ey(a);By(this);if(!this.oa){var b;this.oa=Fy(this,((b=this.config.args)==null?void 0:b.jsapicallback)||"onYouTubePlayerReady")}this.config.args?this.config.args.jsapicallback=null:this.config.args={jsapicallback:null};var c;if((c=this.config)==null?0:c.attrs)a=this.config.attrs,(b=a.width)&&this.i&&(this.i.style.width=yj(Number(b)||b)),(a=a.height)&&this.i&&(this.i.style.height=yj(Number(a)||a))};
function Dy(a){if(a.config&&a.config.loaded!==!0)if(a.config.loaded=!0,!a.config.args||a.config.args.autoplay!=="0"&&a.config.args.autoplay!==0&&a.config.args.autoplay!==!1){var b;a.api.loadVideoByPlayerVars((b=a.config.args)!=null?b:null)}else a.api.cueVideoByPlayerVars(a.config.args)}
function Gy(a){var b=!0,c=Hy(a);c&&a.config&&(b=c.dataset.version===Iy(a));return b&&!!E("yt.player.Application.create")}
function Cy(a){if(!a.da&&!a.X){var b=Gy(a);if(b&&(Hy(a)?"html5":null)==="html5")a.Y="html5",a.isReady()||Jy(a);else if(Ky(a),a.Y="html5",b&&a.j&&a.o)a.o.appendChild(a.j),Jy(a);else{a.config&&(a.config.loaded=!0);var c=!1;a.G=function(){c=!0;var d=Ly(a,"player_bootstrap_method")?E("yt.player.Application.createAlternate")||E("yt.player.Application.create"):E("yt.player.Application.create");var e=a.config?Ey(a.config):void 0;d&&d(a.o,e,a.webPlayerContextConfig,a.xc);Jy(a)};
a.X=!0;b?a.G():($u(Iy(a),a.G),(b=My(a))&&gv(b||""),Ny(a)&&!c&&D("yt.player.Application.create",null))}}}
function Hy(a){var b=Cg(a.elementId);!b&&a.i&&a.i.querySelector&&(b=a.i.querySelector("#"+a.elementId));return b}
function Jy(a){if(!a.da){var b=Hy(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);if(c){a.X=!1;if(!Ly(a,"html5_remove_not_servable_check_killswitch")){var d;if((b==null?0:b.isNotServable)&&a.config&&(b==null?0:b.isNotServable((d=a.config.args)==null?void 0:d.video_id)))return}Oy(a)}else a.mb=setTimeout(function(){Jy(a)},50)}}
function Oy(a){Ay(a);a.Oa=!0;var b=Hy(a);if(b){a.u=Py(a,b,"addEventListener");a.ia=Py(a,b,"removeEventListener");var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=a.api,e=0;e<c.length;e++){var f=c[e];d[f]||(d[f]=Py(a,b,f))}}for(var g in a.h)a.h.hasOwnProperty(g)&&a.u&&a.u(g,a.h[g]);Dy(a);a.oa&&a.oa(a.api);a.U.lb("onReady",a.api)}
function Py(a,b,c){var d=b[c];return function(){var e=B.apply(0,arguments);try{return a.lastError=null,d.apply(b,e)}catch(f){if(c!=="sendAbandonmentPing")throw f.params=c,a.lastError=f,e=new S("PlayerProxy error in method call",{error:f,method:c,playerId:a.A}),e.level="WARNING",e;}}}
function Ay(a){a.Oa=!1;if(a.ia)for(var b in a.h)a.h.hasOwnProperty(b)&&a.ia(b,a.h[b]);for(var c in a.P)a.P.hasOwnProperty(c)&&clearTimeout(Number(c));a.P={};a.u=null;a.ia=null;b=a.api;for(var d in b)b.hasOwnProperty(d)&&(b[d]=null);b.addEventListener=function(e,f){a.addEventListener(e,f)};
b.removeEventListener=function(e,f){a.removeEventListener(e,f)};
b.destroy=function(){a.dispose()};
b.getLastError=function(){return a.getLastError()};
b.getPlayerType=function(){return a.getPlayerType()};
b.getCurrentVideoConfig=function(){return a.Pa};
b.loadNewVideoConfig=function(e){a.loadNewVideoConfig(e)};
b.isReady=function(){return a.isReady()}}
r.isReady=function(){return this.Oa};
r.addEventListener=function(a,b){var c=this,d=Fy(this,b);d&&(Mb(this.yc,a)>=0||this.h[a]||(b=Qy(this,a),this.u&&this.u(a,b)),this.U.subscribe(a,d),a==="onReady"&&this.isReady()&&setTimeout(function(){d(c.api)},0))};
r.removeEventListener=function(a,b){this.da||(b=Fy(this,b))&&this.U.unsubscribe(a,b)};
function Fy(a,b){var c=b;if(typeof b==="string"){if(a.Da[b])return a.Da[b];c=function(){var d=B.apply(0,arguments),e=E(b);if(e)try{e.apply(C,d)}catch(f){throw d=new S("PlayerProxy error when executing callback",{error:f}),d.level="ERROR",d;}};
a.Da[b]=c}return c?c:null}
function Qy(a,b){function c(d){function e(){if(!a.da)try{a.U.lb(b,d!=null?d:void 0)}catch(h){var g=new S("PlayerProxy error when creating global callback",{error:h.message,event:b,playerId:a.A,data:d,originalStack:h.stack,componentStack:h.Td});g.level="WARNING";throw g;}}
if(Ly(a,"web_player_publish_events_immediately"))e();else{var f=setTimeout(function(){e();var g=a.P,h=String(f);h in g&&delete g[h]},0);
tg(a.P,String(f))}}
return a.h[b]=c}
r.getPlayerType=function(){return this.Y||(Hy(this)?"html5":null)};
r.getLastError=function(){return this.lastError};
function Ky(a){a.cancel();Ay(a);a.Y=null;a.config&&(a.config.loaded=!1);var b=Hy(a);b&&(Gy(a)||!Ny(a)?a.j=b:(b&&b.destroy&&b.destroy(),a.j=null));if(a.o)for(a=a.o;b=a.firstChild;)a.removeChild(b)}
r.cancel=function(){this.G&&dv(Iy(this),this.G);clearTimeout(this.mb);this.X=!1};
r.aa=function(){Ky(this);if(this.j&&this.config&&this.j.destroy)try{this.j.destroy()}catch(b){var a=new S("PlayerProxy error during disposal",{error:b});a.level="ERROR";throw a;}this.Da=null;for(a in this.h)this.h.hasOwnProperty(a)&&delete this.h[a];this.Pa=this.config=this.api=null;delete this.o;delete this.i;G.prototype.aa.call(this)};
function Ny(a){var b,c;a=(b=a.config)==null?void 0:(c=b.args)==null?void 0:c.fflags;return!!a&&a.indexOf("player_destroy_old_version=true")!==-1}
function Iy(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.jsUrl:(a=a.config.assets)?a.js:""}
function My(a){return a.webPlayerContextConfig?a.webPlayerContextConfig.cssUrl:(a=a.config.assets)?a.css:""}
function Ly(a,b){if(a.webPlayerContextConfig)var c=a.webPlayerContextConfig.serializedExperimentFlags;else{var d;if((d=a.config)==null?0:d.args)c=a.config.args.fflags}return(c||"").split("&").includes(b+"=true")}
function Ey(a){for(var b={},c=z(Object.keys(a)),d=c.next();!d.done;d=c.next()){d=d.value;var e=a[d];b[d]=typeof e==="object"?wg(e):e}return b}
;var Ry={},Sy="player_uid_"+(Math.random()*1E9>>>0);function Ty(a,b){var c="player",d=!1;d=d===void 0?!0:d;c=typeof c==="string"?Cg(c):c;var e=Sy+"_"+Ra(c),f=Ry[e];if(f&&d)return Uy(a,b)?f.api.loadVideoByPlayerVars(a.args||null):f.loadNewVideoConfig(a),f.api;f=new zy(c,e,a,b,void 0);Ry[e]=f;f.addOnDisposeCallback(function(){delete Ry[f.getId()]});
return f.api}
function Uy(a,b){return b&&b.serializedExperimentFlags?b.serializedExperimentFlags.includes("web_player_remove_playerproxy=true"):a&&a.args&&a.args.fflags?a.args.fflags.includes("web_player_remove_playerproxy=true"):!1}
;var Vy=null,Wy=null;
function Xy(){Tw();var a=ln(),b=on(119),c=window.devicePixelRatio>1;if(document.body&&Mj(document.body,"exp-invert-logo"))if(c&&!Mj(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!Mj(d,"inverted-hdpi")){var e=Kj(d);Lj(d,e+(e.length>0?" inverted-hdpi":"inverted-hdpi"))}}else!c&&Mj(document.body,"inverted-hdpi")&&Nj();if(b!=c){b="f"+(Math.floor(119/31)+1);d=pn(b)||0;d=c?d|67108864:d&-67108865;d===0?delete hn[b]:(c=d.toString(16),hn[b]=c.toString());
c=!0;R("web_secure_pref_cookie_killswitch")&&(c=!1);b=a.h;d=[];for(f in hn)hn.hasOwnProperty(f)&&d.push(f+"="+encodeURIComponent(String(hn[f])));var f=d.join("&");dn(b,f,63072E3,a.i,c)}}
function Yy(){Zy()}
function $y(){Sw("ep_init_pr");Zy()}
function Zy(){var a=Vy.getVideoData(1);a=a.title?a.title+" - YouTube":"YouTube";document.title!==a&&(document.title=a)}
function az(){Vy&&Vy.sendAbandonmentPing&&Vy.sendAbandonmentPing();P("PL_ATT")&&wy.dispose();for(var a=Ej,b=0,c=Lx.length;b<c;b++)a.qa(Lx[b]);Lx.length=0;bv("//static.doubleclick.net/instream/ad_status.js");Mx=!1;Ul("DCLKSTAT",0);uc(Wy);Vy&&(Vy.removeEventListener("onVideoDataChange",Yy),Vy.destroy())}
;D("yt.setConfig",Ul);D("yt.config.set",Ul);D("yt.setMsg",Zu);D("yt.msgs.set",Zu);D("yt.logging.errors.log",Zt);
D("writeEmbed",function(){var a=P("PLAYER_CONFIG");if(!a){var b=P("PLAYER_VARS");b&&(a={args:b})}Kv(!0);a.args.ps==="gvn"&&(document.body.style.backgroundColor="transparent");a.attrs||(a.attrs={width:"100%",height:"100%",id:"video-player"});var c=document.referrer;b=P("POST_MESSAGE_ORIGIN");window!==window.top&&c&&c!==document.URL&&(a.args.loaderUrl=c);Ow("embed",["ol"]);c=vx();if(!c.serializedForcedExperimentIds){var d=hm(window.location.href);d.forced_experiments&&(c.serializedForcedExperimentIds=
d.forced_experiments)}var e;((e=a.args)==null?0:e.autoplay)&&Ow("watch",["pbs","pbu","pbp"]);Vy=Ty(a,c);Vy.addEventListener("onVideoDataChange",Yy);Vy.addEventListener("onReady",$y);a=P("POST_MESSAGE_ID","player");P("ENABLE_JS_API")?Wy=new iy(Vy):P("ENABLE_POST_API")&&typeof a==="string"&&typeof b==="string"&&(Wy=new py(Vy,a,b));Nx();R("ytidb_create_logger_embed_killswitch")||ko();a={};Wx.h||(Wx.h=new Wx);Wx.h.install((a.flush_logs={callback:function(){Et()}},a));
Xr();R("ytidb_clear_embedded_player")&&Ej.pa(function(){var f,g;if(!tx){var h=Is();Es(h,{qc:sx,Cd:qx});var k={bd:{feedbackEndpoint:Xv(ix),modifyChannelNotificationPreferenceEndpoint:Xv(jx),playlistEditEndpoint:Xv(kx),shareEntityEndpoint:Xv(hx),subscribeEndpoint:Xv(ex),unsubscribeEndpoint:Xv(fx),webPlayerShareEntityServiceEndpoint:Xv(lx)}},l=Tv(),m={};l&&(m.client_location=l);f===void 0&&(f=an());g===void 0&&(g=h.resolve(sx));Yw(k,g,f,m);Es(h,{qc:dx,Dd:Xw.h});tx=h.resolve(dx)}Hx()})});
D("yt.abuse.player.botguardInitialized",E("yt.abuse.player.botguardInitialized")||xy);D("yt.abuse.player.invokeBotguard",E("yt.abuse.player.invokeBotguard")||yy);D("yt.abuse.dclkstatus.checkDclkStatus",E("yt.abuse.dclkstatus.checkDclkStatus")||Ox);D("yt.player.exports.navigate",E("yt.player.exports.navigate")||Jv);D("yt.util.activity.init",E("yt.util.activity.init")||ls);D("yt.util.activity.getTimeSinceActive",E("yt.util.activity.getTimeSinceActive")||ps);
D("yt.util.activity.setTimestamp",E("yt.util.activity.setTimestamp")||ms);window.addEventListener("load",Yl(function(){Xy()}));
window.addEventListener("pageshow",Yl(function(a){a.persisted||Xy()}));
window.addEventListener("pagehide",Yl(function(a){R("embeds_web_enable_dispose_player_if_page_not_cached_killswitch")?az():a.persisted||az()}));
window.onerror=function(a,b,c,d,e){var f;b=b===void 0?"Unknown file":b;c=c===void 0?0:c;var g=!1,h=Vl("log_window_onerror_fraction");if(h&&Math.random()<h)g=!0;else{h=document.getElementsByTagName("script");for(var k=0,l=h.length;k<l;k++)if(h[k].src.indexOf("/debug-")>0){g=!0;break}}if(g){g=!1;e?g=!0:(typeof a==="string"?h=a:ErrorEvent&&a instanceof ErrorEvent?(g=!0,h=a.message,b=a.filename,c=a.lineno,d=a.colno):(h="Unknown error",b="Unknown file",c=0),e=new S(h),e.name="UnhandledWindowError",e.message=
h,e.fileName=b,e.lineNumber=c,isNaN(d)?delete e.columnNumber:e.columnNumber=d);if(!R("wiz_enable_component_stack_propagation_killswitch")){a=e;var m;if((m=f)==null||!m.componentStack)if(m=a.Td)f||(f={}),f.componentStack=St(m)}f&&cu(e,f);g?Zt(e):$t(e)}};
Di=au;window.addEventListener("unhandledrejection",function(a){au(a.reason)});
Nb(P("ERRORS")||[],function(a){Zt.apply(null,a)});
Ul("ERRORS",[]);}).call(this);
