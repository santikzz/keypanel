import{r as s,j as y,a as wt}from"./app-Bqj-BHKK.js";import{u as $,P as M,j as Ct,h as xt}from"./button-CUcI-oLe.js";import{R as St}from"./index-Bk2ENxtN.js";let Pt={data:""},Dt=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Pt,Nt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ot=/\/\*[^]*?\*\/|  +/g,Ne=/\n+/g,L=(e,t)=>{let n="",r="",a="";for(let o in e){let c=e[o];o[0]=="@"?o[1]=="i"?n=o+" "+c+";":r+=o[1]=="f"?L(c,o):o+"{"+L(c,o[1]=="k"?"":t)+"}":typeof c=="object"?r+=L(c,t?t.replace(/([^,])+/g,i=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):o):c!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=L.p?L.p(o,c):o+":"+c+";")}return n+(t&&a?t+"{"+a+"}":a)+r},A={},$e=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+$e(e[n]);return t}return e},Rt=(e,t,n,r,a)=>{let o=$e(e),c=A[o]||(A[o]=(l=>{let u=0,f=11;for(;u<l.length;)f=101*f+l.charCodeAt(u++)>>>0;return"go"+f})(o));if(!A[c]){let l=o!==e?e:(u=>{let f,v,m=[{}];for(;f=Nt.exec(u.replace(Ot,""));)f[4]?m.shift():f[3]?(v=f[3].replace(Ne," ").trim(),m.unshift(m[0][v]=m[0][v]||{})):m[0][f[1]]=f[2].replace(Ne," ").trim();return m[0]})(e);A[c]=L(a?{["@keyframes "+c]:l}:l,n?"":"."+c)}let i=n&&A.g?A.g:null;return n&&(A.g=A[c]),((l,u,f,v)=>{v?u.data=u.data.replace(v,l):u.data.indexOf(l)===-1&&(u.data=f?l+u.data:u.data+l)})(A[c],t,r,i),c},At=(e,t,n)=>e.reduce((r,a,o)=>{let c=t[o];if(c&&c.call){let i=c(n),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;c=l?"."+l:i&&typeof i=="object"?i.props?"":L(i,""):i===!1?"":i}return r+a+(c??"")},"");function se(e){let t=this||{},n=e.call?e(t.p):e;return Rt(n.unshift?n.raw?At(n,[].slice.call(arguments,1),t.p):n.reduce((r,a)=>Object.assign(r,a&&a.call?a(t.p):a),{}):n,Dt(t.target),t.g,t.o,t.k)}let Be,be,Ee;se.bind({g:1});let T=se.bind({k:1});function Tt(e,t,n,r){L.p=t,Be=e,be=n,Ee=r}function _(e,t){let n=this||{};return function(){let r=arguments;function a(o,c){let i=Object.assign({},o),l=i.className||a.className;n.p=Object.assign({theme:be&&be()},i),n.o=/ *go\d+/.test(l),i.className=se.apply(n,r)+(l?" "+l:"");let u=e;return e[0]&&(u=i.as||e,delete i.as),Ee&&u[0]&&Ee(i),Be(u,i)}return t?t(a):a}}var Mt=e=>typeof e=="function",oe=(e,t)=>Mt(e)?e(t):e,It=(()=>{let e=0;return()=>(++e).toString()})(),Ue=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Lt=20,ze=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Lt)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:n}=t;return ze(e,{type:e.toasts.find(o=>o.id===n.id)?1:0,toast:n});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(o=>o.id===r||r===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+a}))}}},te=[],F={toasts:[],pausedAt:void 0},B=e=>{F=ze(F,e),te.forEach(t=>{t(F)})},kt={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_t=(e={})=>{let[t,n]=s.useState(F),r=s.useRef(F);s.useEffect(()=>(r.current!==F&&n(F),te.push(n),()=>{let o=te.indexOf(n);o>-1&&te.splice(o,1)}),[]);let a=t.toasts.map(o=>{var c,i,l;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((c=e[o.type])==null?void 0:c.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((i=e[o.type])==null?void 0:i.duration)||(e==null?void 0:e.duration)||kt[o.type],style:{...e.style,...(l=e[o.type])==null?void 0:l.style,...o.style}}});return{...t,toasts:a}},Ft=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||It()}),G=e=>(t,n)=>{let r=Ft(t,e,n);return B({type:2,toast:r}),r.id},P=(e,t)=>G("blank")(e,t);P.error=G("error");P.success=G("success");P.loading=G("loading");P.custom=G("custom");P.dismiss=e=>{B({type:3,toastId:e})};P.remove=e=>B({type:4,toastId:e});P.promise=(e,t,n)=>{let r=P.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(a=>{let o=t.success?oe(t.success,a):void 0;return o?P.success(o,{id:r,...n,...n==null?void 0:n.success}):P.dismiss(r),a}).catch(a=>{let o=t.error?oe(t.error,a):void 0;o?P.error(o,{id:r,...n,...n==null?void 0:n.error}):P.dismiss(r)}),e};var jt=(e,t)=>{B({type:1,toast:{id:e,height:t}})},Wt=()=>{B({type:5,time:Date.now()})},Y=new Map,$t=1e3,Bt=(e,t=$t)=>{if(Y.has(e))return;let n=setTimeout(()=>{Y.delete(e),B({type:4,toastId:e})},t);Y.set(e,n)},Ut=e=>{let{toasts:t,pausedAt:n}=_t(e);s.useEffect(()=>{if(n)return;let o=Date.now(),c=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(o-i.createdAt);if(l<0){i.visible&&P.dismiss(i.id);return}return setTimeout(()=>P.dismiss(i.id),l)});return()=>{c.forEach(i=>i&&clearTimeout(i))}},[t,n]);let r=s.useCallback(()=>{n&&B({type:6,time:Date.now()})},[n]),a=s.useCallback((o,c)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:u}=c||{},f=t.filter(p=>(p.position||u)===(o.position||u)&&p.height),v=f.findIndex(p=>p.id===o.id),m=f.filter((p,b)=>b<v&&p.visible).length;return f.filter(p=>p.visible).slice(...i?[m+1]:[0,m]).reduce((p,b)=>p+(b.height||0)+l,0)},[t]);return s.useEffect(()=>{t.forEach(o=>{if(o.dismissed)Bt(o.id,o.removeDelay);else{let c=Y.get(o.id);c&&(clearTimeout(c),Y.delete(o.id))}})},[t]),{toasts:t,handlers:{updateHeight:jt,startPause:Wt,endPause:r,calculateOffset:a}}},zt=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Kt=T`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Vt=T`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ht=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${zt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Kt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Vt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Yt=T`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Gt=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Yt} 1s linear infinite;
`,Xt=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Zt=T`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,qt=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Xt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Zt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Qt=_("div")`
  position: absolute;
`,Jt=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,en=T`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,tn=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${en} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,nn=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?s.createElement(tn,null,t):t:n==="blank"?null:s.createElement(Jt,null,s.createElement(Gt,{...r}),n!=="loading"&&s.createElement(Qt,null,n==="error"?s.createElement(Ht,{...r}):s.createElement(qt,{...r})))},rn=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,on=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,an="0%{opacity:0;} 100%{opacity:1;}",sn="0%{opacity:1;} 100%{opacity:0;}",cn=_("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,un=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ln=(e,t)=>{let n=e.includes("top")?1:-1,[r,a]=Ue()?[an,sn]:[rn(n),on(n)];return{animation:t?`${T(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${T(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},dn=s.memo(({toast:e,position:t,style:n,children:r})=>{let a=e.height?ln(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(nn,{toast:e}),c=s.createElement(un,{...e.ariaProps},oe(e.message,e));return s.createElement(cn,{className:e.className,style:{...a,...n,...e.style}},typeof r=="function"?r({icon:o,message:c}):s.createElement(s.Fragment,null,o,c))});Tt(s.createElement);var fn=({id:e,className:t,style:n,onHeightUpdate:r,children:a})=>{let o=s.useCallback(c=>{if(c){let i=()=>{let l=c.getBoundingClientRect().height;r(e,l)};i(),new MutationObserver(i).observe(c,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:o,className:t,style:n},a)},vn=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Ue()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...a}},mn=se`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,X=16,Wr=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:a,containerStyle:o,containerClassName:c})=>{let{toasts:i,handlers:l}=Ut(n);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:X,left:X,right:X,bottom:X,pointerEvents:"none",...o},className:c,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(u=>{let f=u.position||t,v=l.calculateOffset(u,{reverseOrder:e,gutter:r,defaultPosition:t}),m=vn(f,v);return s.createElement(fn,{id:u.id,key:u.id,onHeightUpdate:l.updateHeight,className:u.visible?mn:"",style:m},u.type==="custom"?oe(u.message,u):a?a(u):s.createElement(dn,{toast:u,position:f}))}))},$r=P;function pn(e,t){const n=s.createContext(t),r=o=>{const{children:c,...i}=o,l=s.useMemo(()=>i,Object.values(i));return y.jsx(n.Provider,{value:l,children:c})};r.displayName=e+"Provider";function a(o){const c=s.useContext(n);if(c)return c;if(t!==void 0)return t;throw new Error(`\`${o}\` must be used within \`${e}\``)}return[r,a]}function hn(e,t=[]){let n=[];function r(o,c){const i=s.createContext(c),l=n.length;n=[...n,c];const u=v=>{var g;const{scope:m,children:p,...b}=v,d=((g=m==null?void 0:m[e])==null?void 0:g[l])||i,h=s.useMemo(()=>b,Object.values(b));return y.jsx(d.Provider,{value:h,children:p})};u.displayName=o+"Provider";function f(v,m){var d;const p=((d=m==null?void 0:m[e])==null?void 0:d[l])||i,b=s.useContext(p);if(b)return b;if(c!==void 0)return c;throw new Error(`\`${v}\` must be used within \`${o}\``)}return[u,f]}const a=()=>{const o=n.map(c=>s.createContext(c));return function(i){const l=(i==null?void 0:i[e])||o;return s.useMemo(()=>({[`__scope${e}`]:{...i,[e]:l}}),[i,l])}};return a.scopeName=e,[r,gn(a,...t)]}function gn(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const c=r.reduce((i,{useScope:l,scopeName:u})=>{const v=l(o)[`__scope${u}`];return{...i,...v}},{});return s.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return n.scopeName=t.scopeName,n}function j(e){const t=s.useRef(e);return s.useEffect(()=>{t.current=e}),s.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}var ae=globalThis!=null&&globalThis.document?s.useLayoutEffect:()=>{};function k(e,t,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function yn({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,a]=bn({defaultProp:t,onChange:n}),o=e!==void 0,c=o?e:r,i=j(n),l=s.useCallback(u=>{if(o){const v=typeof u=="function"?u(e):u;v!==e&&i(v)}else a(u)},[o,e,a,i]);return[c,l]}function bn({defaultProp:e,onChange:t}){const n=s.useState(e),[r]=n,a=s.useRef(r),o=j(t);return s.useEffect(()=>{a.current!==r&&(o(r),a.current=r)},[r,a,o]),n}function En(e,t=globalThis==null?void 0:globalThis.document){const n=j(e);s.useEffect(()=>{const r=a=>{a.key==="Escape"&&n(a)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var wn="DismissableLayer",we="dismissableLayer.update",Cn="dismissableLayer.pointerDownOutside",xn="dismissableLayer.focusOutside",Oe,Ke=s.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Ve=s.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:a,onFocusOutside:o,onInteractOutside:c,onDismiss:i,...l}=e,u=s.useContext(Ke),[f,v]=s.useState(null),m=(f==null?void 0:f.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,p]=s.useState({}),b=$(t,E=>v(E)),d=Array.from(u.layers),[h]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),g=d.indexOf(h),S=f?d.indexOf(f):-1,w=u.layersWithOutsidePointerEventsDisabled.size>0,C=S>=g,x=Dn(E=>{const R=E.target,H=[...u.branches].some(le=>le.contains(R));!C||H||(a==null||a(E),c==null||c(E),E.defaultPrevented||i==null||i())},m),O=Nn(E=>{const R=E.target;[...u.branches].some(le=>le.contains(R))||(o==null||o(E),c==null||c(E),E.defaultPrevented||i==null||i())},m);return En(E=>{S===u.layers.size-1&&(r==null||r(E),!E.defaultPrevented&&i&&(E.preventDefault(),i()))},m),s.useEffect(()=>{if(f)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Oe=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(f)),u.layers.add(f),Re(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=Oe)}},[f,m,n,u]),s.useEffect(()=>()=>{f&&(u.layers.delete(f),u.layersWithOutsidePointerEventsDisabled.delete(f),Re())},[f,u]),s.useEffect(()=>{const E=()=>p({});return document.addEventListener(we,E),()=>document.removeEventListener(we,E)},[]),y.jsx(M.div,{...l,ref:b,style:{pointerEvents:w?C?"auto":"none":void 0,...e.style},onFocusCapture:k(e.onFocusCapture,O.onFocusCapture),onBlurCapture:k(e.onBlurCapture,O.onBlurCapture),onPointerDownCapture:k(e.onPointerDownCapture,x.onPointerDownCapture)})});Ve.displayName=wn;var Sn="DismissableLayerBranch",Pn=s.forwardRef((e,t)=>{const n=s.useContext(Ke),r=s.useRef(null),a=$(t,r);return s.useEffect(()=>{const o=r.current;if(o)return n.branches.add(o),()=>{n.branches.delete(o)}},[n.branches]),y.jsx(M.div,{...e,ref:a})});Pn.displayName=Sn;function Dn(e,t=globalThis==null?void 0:globalThis.document){const n=j(e),r=s.useRef(!1),a=s.useRef(()=>{});return s.useEffect(()=>{const o=i=>{if(i.target&&!r.current){let l=function(){He(Cn,n,u,{discrete:!0})};const u={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",a.current),a.current=l,t.addEventListener("click",a.current,{once:!0})):l()}else t.removeEventListener("click",a.current);r.current=!1},c=window.setTimeout(()=>{t.addEventListener("pointerdown",o)},0);return()=>{window.clearTimeout(c),t.removeEventListener("pointerdown",o),t.removeEventListener("click",a.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Nn(e,t=globalThis==null?void 0:globalThis.document){const n=j(e),r=s.useRef(!1);return s.useEffect(()=>{const a=o=>{o.target&&!r.current&&He(xn,n,{originalEvent:o},{discrete:!1})};return t.addEventListener("focusin",a),()=>t.removeEventListener("focusin",a)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function Re(){const e=new CustomEvent(we);document.dispatchEvent(e)}function He(e,t,n,{discrete:r}){const a=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&a.addEventListener(e,t,{once:!0}),r?Ct(a,o):a.dispatchEvent(o)}var de=0;function On(){s.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??Ae()),document.body.insertAdjacentElement("beforeend",e[1]??Ae()),de++,()=>{de===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),de--}},[])}function Ae(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var fe="focusScope.autoFocusOnMount",ve="focusScope.autoFocusOnUnmount",Te={bubbles:!1,cancelable:!0},Rn="FocusScope",Ye=s.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:a,onUnmountAutoFocus:o,...c}=e,[i,l]=s.useState(null),u=j(a),f=j(o),v=s.useRef(null),m=$(t,d=>l(d)),p=s.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;s.useEffect(()=>{if(r){let d=function(w){if(p.paused||!i)return;const C=w.target;i.contains(C)?v.current=C:I(v.current,{select:!0})},h=function(w){if(p.paused||!i)return;const C=w.relatedTarget;C!==null&&(i.contains(C)||I(v.current,{select:!0}))},g=function(w){if(document.activeElement===document.body)for(const x of w)x.removedNodes.length>0&&I(i)};document.addEventListener("focusin",d),document.addEventListener("focusout",h);const S=new MutationObserver(g);return i&&S.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",d),document.removeEventListener("focusout",h),S.disconnect()}}},[r,i,p.paused]),s.useEffect(()=>{if(i){Ie.add(p);const d=document.activeElement;if(!i.contains(d)){const g=new CustomEvent(fe,Te);i.addEventListener(fe,u),i.dispatchEvent(g),g.defaultPrevented||(An(kn(Ge(i)),{select:!0}),document.activeElement===d&&I(i))}return()=>{i.removeEventListener(fe,u),setTimeout(()=>{const g=new CustomEvent(ve,Te);i.addEventListener(ve,f),i.dispatchEvent(g),g.defaultPrevented||I(d??document.body,{select:!0}),i.removeEventListener(ve,f),Ie.remove(p)},0)}}},[i,u,f,p]);const b=s.useCallback(d=>{if(!n&&!r||p.paused)return;const h=d.key==="Tab"&&!d.altKey&&!d.ctrlKey&&!d.metaKey,g=document.activeElement;if(h&&g){const S=d.currentTarget,[w,C]=Tn(S);w&&C?!d.shiftKey&&g===C?(d.preventDefault(),n&&I(w,{select:!0})):d.shiftKey&&g===w&&(d.preventDefault(),n&&I(C,{select:!0})):g===S&&d.preventDefault()}},[n,r,p.paused]);return y.jsx(M.div,{tabIndex:-1,...c,ref:m,onKeyDown:b})});Ye.displayName=Rn;function An(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(I(r,{select:t}),document.activeElement!==n)return}function Tn(e){const t=Ge(e),n=Me(t,e),r=Me(t.reverse(),e);return[n,r]}function Ge(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function Me(e,t){for(const n of e)if(!Mn(n,{upTo:t}))return n}function Mn(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function In(e){return e instanceof HTMLInputElement&&"select"in e}function I(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&In(e)&&t&&e.select()}}var Ie=Ln();function Ln(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=Le(e,t),e.unshift(t)},remove(t){var n;e=Le(e,t),(n=e[0])==null||n.resume()}}}function Le(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function kn(e){return e.filter(t=>t.tagName!=="A")}var _n=wt.useId||(()=>{}),Fn=0;function me(e){const[t,n]=s.useState(_n());return ae(()=>{n(r=>r??String(Fn++))},[e]),e||(t?`radix-${t}`:"")}var jn="Portal",Xe=s.forwardRef((e,t)=>{var i;const{container:n,...r}=e,[a,o]=s.useState(!1);ae(()=>o(!0),[]);const c=n||a&&((i=globalThis==null?void 0:globalThis.document)==null?void 0:i.body);return c?St.createPortal(y.jsx(M.div,{...r,ref:t}),c):null});Xe.displayName=jn;function Wn(e,t){return s.useReducer((n,r)=>t[n][r]??n,e)}var ce=e=>{const{present:t,children:n}=e,r=$n(t),a=typeof n=="function"?n({present:r.isPresent}):s.Children.only(n),o=$(r.ref,Bn(a));return typeof n=="function"||r.isPresent?s.cloneElement(a,{ref:o}):null};ce.displayName="Presence";function $n(e){const[t,n]=s.useState(),r=s.useRef({}),a=s.useRef(e),o=s.useRef("none"),c=e?"mounted":"unmounted",[i,l]=Wn(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return s.useEffect(()=>{const u=Z(r.current);o.current=i==="mounted"?u:"none"},[i]),ae(()=>{const u=r.current,f=a.current;if(f!==e){const m=o.current,p=Z(u);e?l("MOUNT"):p==="none"||(u==null?void 0:u.display)==="none"?l("UNMOUNT"):l(f&&m!==p?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,l]),ae(()=>{if(t){let u;const f=t.ownerDocument.defaultView??window,v=p=>{const d=Z(r.current).includes(p.animationName);if(p.target===t&&d&&(l("ANIMATION_END"),!a.current)){const h=t.style.animationFillMode;t.style.animationFillMode="forwards",u=f.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=h)})}},m=p=>{p.target===t&&(o.current=Z(r.current))};return t.addEventListener("animationstart",m),t.addEventListener("animationcancel",v),t.addEventListener("animationend",v),()=>{f.clearTimeout(u),t.removeEventListener("animationstart",m),t.removeEventListener("animationcancel",v),t.removeEventListener("animationend",v)}}else l("ANIMATION_END")},[t,l]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:s.useCallback(u=>{u&&(r.current=getComputedStyle(u)),n(u)},[])}}function Z(e){return(e==null?void 0:e.animationName)||"none"}function Bn(e){var r,a;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(a=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:a.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Un=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},U=new WeakMap,q=new WeakMap,Q={},pe=0,Ze=function(e){return e&&(e.host||Ze(e.parentNode))},zn=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Ze(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},Kn=function(e,t,n,r){var a=zn(t,Array.isArray(e)?e:[e]);Q[n]||(Q[n]=new WeakMap);var o=Q[n],c=[],i=new Set,l=new Set(a),u=function(v){!v||i.has(v)||(i.add(v),u(v.parentNode))};a.forEach(u);var f=function(v){!v||l.has(v)||Array.prototype.forEach.call(v.children,function(m){if(i.has(m))f(m);else try{var p=m.getAttribute(r),b=p!==null&&p!=="false",d=(U.get(m)||0)+1,h=(o.get(m)||0)+1;U.set(m,d),o.set(m,h),c.push(m),d===1&&b&&q.set(m,!0),h===1&&m.setAttribute(n,"true"),b||m.setAttribute(r,"true")}catch(g){console.error("aria-hidden: cannot operate on ",m,g)}})};return f(t),i.clear(),pe++,function(){c.forEach(function(v){var m=U.get(v)-1,p=o.get(v)-1;U.set(v,m),o.set(v,p),m||(q.has(v)||v.removeAttribute(r),q.delete(v)),p||v.removeAttribute(n)}),pe--,pe||(U=new WeakMap,U=new WeakMap,q=new WeakMap,Q={})}},Vn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=Un(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),Kn(r,a,n,"aria-hidden")):function(){return null}},N=function(){return N=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},N.apply(this,arguments)};function qe(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function Hn(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,o;r<a;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var ne="right-scroll-bar-position",re="width-before-scroll-bar",Yn="with-scroll-bars-hidden",Gn="--removed-body-scroll-bar-size";function he(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Xn(e,t){var n=s.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}var Zn=typeof window<"u"?s.useLayoutEffect:s.useEffect,ke=new WeakMap;function qn(e,t){var n=Xn(null,function(r){return e.forEach(function(a){return he(a,r)})});return Zn(function(){var r=ke.get(n);if(r){var a=new Set(r),o=new Set(e),c=n.current;a.forEach(function(i){o.has(i)||he(i,null)}),o.forEach(function(i){a.has(i)||he(i,c)})}ke.set(n,e)},[e]),n}function Qn(e){return e}function Jn(e,t){t===void 0&&(t=Qn);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(o){var c=t(o,r);return n.push(c),function(){n=n.filter(function(i){return i!==c})}},assignSyncMedium:function(o){for(r=!0;n.length;){var c=n;n=[],c.forEach(o)}n={push:function(i){return o(i)},filter:function(){return n}}},assignMedium:function(o){r=!0;var c=[];if(n.length){var i=n;n=[],i.forEach(o),c=n}var l=function(){var f=c;c=[],f.forEach(o)},u=function(){return Promise.resolve().then(l)};u(),n={push:function(f){c.push(f),u()},filter:function(f){return c=c.filter(f),n}}}};return a}function er(e){e===void 0&&(e={});var t=Jn(null);return t.options=N({async:!0,ssr:!1},e),t}var Qe=function(e){var t=e.sideCar,n=qe(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return s.createElement(r,N({},n))};Qe.isSideCarExport=!0;function tr(e,t){return e.useMedium(t),Qe}var Je=er(),ge=function(){},ue=s.forwardRef(function(e,t){var n=s.useRef(null),r=s.useState({onScrollCapture:ge,onWheelCapture:ge,onTouchMoveCapture:ge}),a=r[0],o=r[1],c=e.forwardProps,i=e.children,l=e.className,u=e.removeScrollBar,f=e.enabled,v=e.shards,m=e.sideCar,p=e.noIsolation,b=e.inert,d=e.allowPinchZoom,h=e.as,g=h===void 0?"div":h,S=e.gapMode,w=qe(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),C=m,x=qn([n,t]),O=N(N({},w),a);return s.createElement(s.Fragment,null,f&&s.createElement(C,{sideCar:Je,removeScrollBar:u,shards:v,noIsolation:p,inert:b,setCallbacks:o,allowPinchZoom:!!d,lockRef:n,gapMode:S}),c?s.cloneElement(s.Children.only(i),N(N({},O),{ref:x})):s.createElement(g,N({},O,{className:l,ref:x}),i))});ue.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};ue.classNames={fullWidth:re,zeroRight:ne};var nr=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function rr(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=nr();return t&&e.setAttribute("nonce",t),e}function or(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function ar(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var ir=function(){var e=0,t=null;return{add:function(n){e==0&&(t=rr())&&(or(t,n),ar(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},sr=function(){var e=ir();return function(t,n){s.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},et=function(){var e=sr(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},cr={left:0,top:0,right:0,gap:0},ye=function(e){return parseInt(e||"",10)||0},ur=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[ye(n),ye(r),ye(a)]},lr=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return cr;var t=ur(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},dr=et(),V="data-scroll-locked",fr=function(e,t,n,r){var a=e.left,o=e.top,c=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(Yn,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(V,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(ne,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(re,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(ne," .").concat(ne,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(re," .").concat(re,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(V,`] {
    `).concat(Gn,": ").concat(i,`px;
  }
`)},_e=function(){var e=parseInt(document.body.getAttribute(V)||"0",10);return isFinite(e)?e:0},vr=function(){s.useEffect(function(){return document.body.setAttribute(V,(_e()+1).toString()),function(){var e=_e()-1;e<=0?document.body.removeAttribute(V):document.body.setAttribute(V,e.toString())}},[])},mr=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r;vr();var o=s.useMemo(function(){return lr(a)},[a]);return s.createElement(dr,{styles:fr(o,!t,a,n?"":"!important")})},Ce=!1;if(typeof window<"u")try{var J=Object.defineProperty({},"passive",{get:function(){return Ce=!0,!0}});window.addEventListener("test",J,J),window.removeEventListener("test",J,J)}catch{Ce=!1}var z=Ce?{passive:!1}:!1,pr=function(e){return e.tagName==="TEXTAREA"},tt=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!pr(e)&&n[t]==="visible")},hr=function(e){return tt(e,"overflowY")},gr=function(e){return tt(e,"overflowX")},Fe=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var a=nt(e,r);if(a){var o=rt(e,r),c=o[1],i=o[2];if(c>i)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},yr=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},br=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},nt=function(e,t){return e==="v"?hr(t):gr(t)},rt=function(e,t){return e==="v"?yr(t):br(t)},Er=function(e,t){return e==="h"&&t==="rtl"?-1:1},wr=function(e,t,n,r,a){var o=Er(e,window.getComputedStyle(t).direction),c=o*r,i=n.target,l=t.contains(i),u=!1,f=c>0,v=0,m=0;do{var p=rt(e,i),b=p[0],d=p[1],h=p[2],g=d-h-o*b;(b||g)&&nt(e,i)&&(v+=g,m+=b),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!l&&i!==document.body||l&&(t.contains(i)||t===i));return(f&&Math.abs(v)<1||!f&&Math.abs(m)<1)&&(u=!0),u},ee=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},je=function(e){return[e.deltaX,e.deltaY]},We=function(e){return e&&"current"in e?e.current:e},Cr=function(e,t){return e[0]===t[0]&&e[1]===t[1]},xr=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Sr=0,K=[];function Pr(e){var t=s.useRef([]),n=s.useRef([0,0]),r=s.useRef(),a=s.useState(Sr++)[0],o=s.useState(et)[0],c=s.useRef(e);s.useEffect(function(){c.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var d=Hn([e.lockRef.current],(e.shards||[]).map(We),!0).filter(Boolean);return d.forEach(function(h){return h.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),d.forEach(function(h){return h.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var i=s.useCallback(function(d,h){if("touches"in d&&d.touches.length===2||d.type==="wheel"&&d.ctrlKey)return!c.current.allowPinchZoom;var g=ee(d),S=n.current,w="deltaX"in d?d.deltaX:S[0]-g[0],C="deltaY"in d?d.deltaY:S[1]-g[1],x,O=d.target,E=Math.abs(w)>Math.abs(C)?"h":"v";if("touches"in d&&E==="h"&&O.type==="range")return!1;var R=Fe(E,O);if(!R)return!0;if(R?x=E:(x=E==="v"?"h":"v",R=Fe(E,O)),!R)return!1;if(!r.current&&"changedTouches"in d&&(w||C)&&(r.current=x),!x)return!0;var H=r.current||x;return wr(H,h,d,H==="h"?w:C)},[]),l=s.useCallback(function(d){var h=d;if(!(!K.length||K[K.length-1]!==o)){var g="deltaY"in h?je(h):ee(h),S=t.current.filter(function(x){return x.name===h.type&&(x.target===h.target||h.target===x.shadowParent)&&Cr(x.delta,g)})[0];if(S&&S.should){h.cancelable&&h.preventDefault();return}if(!S){var w=(c.current.shards||[]).map(We).filter(Boolean).filter(function(x){return x.contains(h.target)}),C=w.length>0?i(h,w[0]):!c.current.noIsolation;C&&h.cancelable&&h.preventDefault()}}},[]),u=s.useCallback(function(d,h,g,S){var w={name:d,delta:h,target:g,should:S,shadowParent:Dr(g)};t.current.push(w),setTimeout(function(){t.current=t.current.filter(function(C){return C!==w})},1)},[]),f=s.useCallback(function(d){n.current=ee(d),r.current=void 0},[]),v=s.useCallback(function(d){u(d.type,je(d),d.target,i(d,e.lockRef.current))},[]),m=s.useCallback(function(d){u(d.type,ee(d),d.target,i(d,e.lockRef.current))},[]);s.useEffect(function(){return K.push(o),e.setCallbacks({onScrollCapture:v,onWheelCapture:v,onTouchMoveCapture:m}),document.addEventListener("wheel",l,z),document.addEventListener("touchmove",l,z),document.addEventListener("touchstart",f,z),function(){K=K.filter(function(d){return d!==o}),document.removeEventListener("wheel",l,z),document.removeEventListener("touchmove",l,z),document.removeEventListener("touchstart",f,z)}},[]);var p=e.removeScrollBar,b=e.inert;return s.createElement(s.Fragment,null,b?s.createElement(o,{styles:xr(a)}):null,p?s.createElement(mr,{gapMode:e.gapMode}):null)}function Dr(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const Nr=tr(Je,Pr);var ot=s.forwardRef(function(e,t){return s.createElement(ue,N({},e,{ref:t,sideCar:Nr}))});ot.classNames=ue.classNames;var xe="Dialog",[at,Br]=hn(xe),[Or,D]=at(xe),it=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:a,onOpenChange:o,modal:c=!0}=e,i=s.useRef(null),l=s.useRef(null),[u=!1,f]=yn({prop:r,defaultProp:a,onChange:o});return y.jsx(Or,{scope:t,triggerRef:i,contentRef:l,contentId:me(),titleId:me(),descriptionId:me(),open:u,onOpenChange:f,onOpenToggle:s.useCallback(()=>f(v=>!v),[f]),modal:c,children:n})};it.displayName=xe;var st="DialogTrigger",ct=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=D(st,n),o=$(t,a.triggerRef);return y.jsx(M.button,{type:"button","aria-haspopup":"dialog","aria-expanded":a.open,"aria-controls":a.contentId,"data-state":De(a.open),...r,ref:o,onClick:k(e.onClick,a.onOpenToggle)})});ct.displayName=st;var Se="DialogPortal",[Rr,ut]=at(Se,{forceMount:void 0}),lt=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:a}=e,o=D(Se,t);return y.jsx(Rr,{scope:t,forceMount:n,children:s.Children.map(r,c=>y.jsx(ce,{present:n||o.open,children:y.jsx(Xe,{asChild:!0,container:a,children:c})}))})};lt.displayName=Se;var ie="DialogOverlay",dt=s.forwardRef((e,t)=>{const n=ut(ie,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,o=D(ie,e.__scopeDialog);return o.modal?y.jsx(ce,{present:r||o.open,children:y.jsx(Ar,{...a,ref:t})}):null});dt.displayName=ie;var Ar=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=D(ie,n);return y.jsx(ot,{as:xt,allowPinchZoom:!0,shards:[a.contentRef],children:y.jsx(M.div,{"data-state":De(a.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),W="DialogContent",ft=s.forwardRef((e,t)=>{const n=ut(W,e.__scopeDialog),{forceMount:r=n.forceMount,...a}=e,o=D(W,e.__scopeDialog);return y.jsx(ce,{present:r||o.open,children:o.modal?y.jsx(Tr,{...a,ref:t}):y.jsx(Mr,{...a,ref:t})})});ft.displayName=W;var Tr=s.forwardRef((e,t)=>{const n=D(W,e.__scopeDialog),r=s.useRef(null),a=$(t,n.contentRef,r);return s.useEffect(()=>{const o=r.current;if(o)return Vn(o)},[]),y.jsx(vt,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:k(e.onCloseAutoFocus,o=>{var c;o.preventDefault(),(c=n.triggerRef.current)==null||c.focus()}),onPointerDownOutside:k(e.onPointerDownOutside,o=>{const c=o.detail.originalEvent,i=c.button===0&&c.ctrlKey===!0;(c.button===2||i)&&o.preventDefault()}),onFocusOutside:k(e.onFocusOutside,o=>o.preventDefault())})}),Mr=s.forwardRef((e,t)=>{const n=D(W,e.__scopeDialog),r=s.useRef(!1),a=s.useRef(!1);return y.jsx(vt,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:o=>{var c,i;(c=e.onCloseAutoFocus)==null||c.call(e,o),o.defaultPrevented||(r.current||(i=n.triggerRef.current)==null||i.focus(),o.preventDefault()),r.current=!1,a.current=!1},onInteractOutside:o=>{var l,u;(l=e.onInteractOutside)==null||l.call(e,o),o.defaultPrevented||(r.current=!0,o.detail.originalEvent.type==="pointerdown"&&(a.current=!0));const c=o.target;((u=n.triggerRef.current)==null?void 0:u.contains(c))&&o.preventDefault(),o.detail.originalEvent.type==="focusin"&&a.current&&o.preventDefault()}})}),vt=s.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:o,...c}=e,i=D(W,n),l=s.useRef(null),u=$(t,l);return On(),y.jsxs(y.Fragment,{children:[y.jsx(Ye,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:a,onUnmountAutoFocus:o,children:y.jsx(Ve,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":De(i.open),...c,ref:u,onDismiss:()=>i.onOpenChange(!1)})}),y.jsxs(y.Fragment,{children:[y.jsx(Ir,{titleId:i.titleId}),y.jsx(kr,{contentRef:l,descriptionId:i.descriptionId})]})]})}),Pe="DialogTitle",mt=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=D(Pe,n);return y.jsx(M.h2,{id:a.titleId,...r,ref:t})});mt.displayName=Pe;var pt="DialogDescription",ht=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=D(pt,n);return y.jsx(M.p,{id:a.descriptionId,...r,ref:t})});ht.displayName=pt;var gt="DialogClose",yt=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,a=D(gt,n);return y.jsx(M.button,{type:"button",...r,ref:t,onClick:k(e.onClick,()=>a.onOpenChange(!1))})});yt.displayName=gt;function De(e){return e?"open":"closed"}var bt="DialogTitleWarning",[Ur,Et]=pn(bt,{contentName:W,titleName:Pe,docsSlug:"dialog"}),Ir=({titleId:e})=>{const t=Et(bt),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return s.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Lr="DialogDescriptionWarning",kr=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Et(Lr).contentName}}.`;return s.useEffect(()=>{var o;const a=(o=e.current)==null?void 0:o.getAttribute("aria-describedby");t&&a&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},zr=it,Kr=ct,Vr=lt,Hr=dt,Yr=ft,Gr=mt,Xr=ht,Zr=yt;export{Yr as C,Ve as D,Ye as F,Hr as O,ce as P,ot as R,Kr as T,$r as V,Ur as W,yn as a,k as b,hn as c,Xe as d,ae as e,j as f,On as g,Vn as h,zr as i,Vr as j,Zr as k,Gr as l,Xr as m,Br as n,Wr as o,me as u};
