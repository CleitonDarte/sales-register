"use strict";(self.webpackChunkjumbo_sales=self.webpackChunkjumbo_sales||[]).push([[592],{8416:(v,g,i)=>{i.d(g,{U:()=>l});var d=i(8256);let l=(()=>{class n{constructor(){this.logo="https://raw.githubusercontent.com/CleitonDarte/sales-register/master/src/assets/images/logo.bar.jumbo.svg"}}return n.\u0275fac=function(S){return new(S||n)},n.\u0275prov=d.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},2852:(v,g,i)=>{i.d(g,{_:()=>n});var d=i(1588),l=i(8256);let n=(()=>{class r{constructor(){}loadStorage(t){return JSON.parse(localStorage[t]||"{}")}saveStorage(t,a){localStorage[t]=JSON.stringify(Object.assign({database:t},a))}loadOpenBaskets(){return this.loadStorage("open-baskets")}saveOpenBaskets(t){this.saveStorage("open-baskets",{data:t})}loadCaixa(){return this.loadStorage("caixa")}newCaixa(t){var a;t.code=(0,d.Z)(),t.id=null!==(a=this.loadCaixa())&&void 0!==a&&a.lastId?this.loadCaixa().lastId+1:1,t.openDate=(new Date).toString(),t.baskets=[];let s=this.loadCaixa().data||[];s.push(t),this.saveStorage("caixa",{data:s,lastId:t.id})}addToCaixa(t){var a;let s=this.loadCaixa().data||[];t.code=(0,d.Z)(),t.date=(new Date).toString(),null===(a=s[s.length-1].baskets)||void 0===a||a.push(t),this.saveStorage("caixa",{data:s,lastId:this.loadCaixa().lastId})}closeCaixa(t){let a=this.loadCaixa().data||[];a[a.length-1]=Object.assign(Object.assign(Object.assign({},a[a.length-1]),t),{closeDate:Date().toString()}),this.saveStorage("caixa",{data:a,lastId:this.loadCaixa().lastId})}loadStock(){return this.loadStorage("stock")}newToStock(t){var a;t.code=(0,d.Z)(),t.id=null!==(a=this.loadStock())&&void 0!==a&&a.lastId?this.loadStock().lastId+1:1,t.date=(new Date).toString();let s=this.loadStock().data||[];s.push(t),this.saveStorage("stock",{data:s,lastId:t.id})}editOnStock(t){let a=this.loadStock().data||[],s=a.indexOf(a.filter(_=>_.code==t.code)[0]);a[s]=Object.assign(Object.assign({},a[s]),t),this.saveStorage("stock",{data:a,lastId:this.loadStock().lastId})}deleteOnStock(t){let a=this.loadStock();a.data=a.data.filter(s=>s.code!=t),this.saveStorage("stock",a)}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=l.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},1588:(v,g,i)=>{i.d(g,{Z:()=>b});const l={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let n;const r=new Uint8Array(16);function S(){if(!n&&(n=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(r)}const t=[];for(let e=0;e<256;++e)t.push((e+256).toString(16).slice(1));const b=function p(e,o,c){if(l.randomUUID&&!o&&!e)return l.randomUUID();const u=(e=e||{}).random||(e.rng||S)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,o){c=c||0;for(let h=0;h<16;++h)o[c+h]=u[h];return o}return function a(e,o=0){return(t[e[o+0]]+t[e[o+1]]+t[e[o+2]]+t[e[o+3]]+"-"+t[e[o+4]]+t[e[o+5]]+"-"+t[e[o+6]]+t[e[o+7]]+"-"+t[e[o+8]]+t[e[o+9]]+"-"+t[e[o+10]]+t[e[o+11]]+t[e[o+12]]+t[e[o+13]]+t[e[o+14]]+t[e[o+15]]).toLowerCase()}(u)}}}]);