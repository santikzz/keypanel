import{r as l,R as E,a as ne}from"./app-BTBLTgKa.js";import{n as x,s as B,K as Q,y as ie,o as $,L as se,O as Ce,a as Fe,A as R,u as ae,m as ye,t as Te}from"./use-sync-refs-CvQBCb6M.js";function $e(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(n=>setTimeout(()=>{throw n}))}function q(){let e=[],n={addEventListener(t,r,i,a){return t.addEventListener(r,i,a),n.add(()=>t.removeEventListener(r,i,a))},requestAnimationFrame(...t){let r=requestAnimationFrame(...t);return n.add(()=>cancelAnimationFrame(r))},nextFrame(...t){return n.requestAnimationFrame(()=>n.requestAnimationFrame(...t))},setTimeout(...t){let r=setTimeout(...t);return n.add(()=>clearTimeout(r))},microTask(...t){let r={current:!0};return $e(()=>{r.current&&t[0]()}),n.add(()=>{r.current=!1})},style(t,r,i){let a=t.style.getPropertyValue(r);return Object.assign(t.style,{[r]:i}),this.add(()=>{Object.assign(t.style,{[r]:a})})},group(t){let r=q();return t(r),this.add(()=>r.dispose())},add(t){return e.includes(t)||e.push(t),()=>{let r=e.indexOf(t);if(r>=0)for(let i of e.splice(r,1))i()}},dispose(){for(let t of e.splice(0))t()}};return n}function ue(){let[e]=l.useState(q);return l.useEffect(()=>()=>e.dispose(),[e]),e}function Se(e=0){let[n,t]=l.useState(e),r=l.useCallback(s=>t(s),[n]),i=l.useCallback(s=>t(o=>o|s),[n]),a=l.useCallback(s=>(n&s)===s,[n]),d=l.useCallback(s=>t(o=>o&~s),[t]),f=l.useCallback(s=>t(o=>o^s),[t]);return{flags:n,setFlag:r,addFlag:i,hasFlag:a,removeFlag:d,toggleFlag:f}}var Ae={},re,le;typeof process<"u"&&typeof globalThis<"u"&&typeof Element<"u"&&((re=process==null?void 0:Ae)==null?void 0:re.NODE_ENV)==="test"&&typeof((le=Element==null?void 0:Element.prototype)==null?void 0:le.getAnimations)>"u"&&(Element.prototype.getAnimations=function(){return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.","Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.","","Example usage:","```js","import { mockAnimationsApi } from 'jsdom-testing-mocks'","mockAnimationsApi()","```"].join(`
`)),[]});var Re=(e=>(e[e.None=0]="None",e[e.Closed=1]="Closed",e[e.Enter=2]="Enter",e[e.Leave=4]="Leave",e))(Re||{});function we(e){let n={};for(let t in e)e[t]===!0&&(n[`data-${t}`]="");return n}function xe(e,n,t,r){let[i,a]=l.useState(t),{hasFlag:d,addFlag:f,removeFlag:s}=Se(e&&i?3:0),o=l.useRef(!1),v=l.useRef(!1),C=ue();return x(()=>{var b;if(e){if(t&&a(!0),!n){t&&f(3);return}return(b=r==null?void 0:r.start)==null||b.call(r,t),Pe(n,{inFlight:o,prepare(){v.current?v.current=!1:v.current=o.current,o.current=!0,!v.current&&(t?(f(3),s(4)):(f(4),s(2)))},run(){v.current?t?(s(3),f(4)):(s(4),f(3)):t?s(1):f(1)},done(){var c;v.current&&typeof n.getAnimations=="function"&&n.getAnimations().length>0||(o.current=!1,s(7),t||a(!1),(c=r==null?void 0:r.end)==null||c.call(r,t))}})}},[e,t,n,C]),e?[i,{closed:d(1),enter:d(2),leave:d(4),transition:d(2)||d(4)}]:[t,{closed:void 0,enter:void 0,leave:void 0,transition:void 0}]}function Pe(e,{prepare:n,run:t,done:r,inFlight:i}){let a=q();return Le(e,{prepare:n,inFlight:i}),a.nextFrame(()=>{t(),a.requestAnimationFrame(()=>{a.add(Oe(e,r))})}),a.dispose}function Oe(e,n){var t,r;let i=q();if(!e)return i.dispose;let a=!1;i.add(()=>{a=!0});let d=(r=(t=e.getAnimations)==null?void 0:t.call(e).filter(f=>f instanceof CSSTransition))!=null?r:[];return d.length===0?(n(),i.dispose):(Promise.allSettled(d.map(f=>f.finished)).then(()=>{a||n()}),i.dispose)}function Le(e,{inFlight:n,prepare:t}){if(n!=null&&n.current){t();return}let r=e.style.transition;e.style.transition="none",t(),e.offsetHeight,e.style.transition=r}let M=l.createContext(null);M.displayName="OpenClosedContext";var w=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(w||{});function oe(){return l.useContext(M)}function ke({value:e,children:n}){return E.createElement(M.Provider,{value:e},n)}function Ke({children:e}){return E.createElement(M.Provider,{value:null},e)}function He(){let e=typeof document>"u";return"useSyncExternalStore"in ne?(n=>n.useSyncExternalStore)(ne)(()=>()=>{},()=>!1,()=>!e):!1}function ce(){let e=He(),[n,t]=l.useState(B.isHandoffComplete);return n&&B.isHandoffComplete===!1&&t(!1),l.useEffect(()=>{n!==!0&&t(!0)},[n]),l.useEffect(()=>B.handoff(),[]),e?!1:n}function Ne(){let e=l.useRef(!1);return x(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function de(e){var n;return!!(e.enter||e.enterFrom||e.enterTo||e.leave||e.leaveFrom||e.leaveTo)||((n=e.as)!=null?n:me)!==l.Fragment||E.Children.count(e.children)===1}let U=l.createContext(null);U.displayName="TransitionContext";var je=(e=>(e.Visible="visible",e.Hidden="hidden",e))(je||{});function qe(){let e=l.useContext(U);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Me(){let e=l.useContext(D);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let D=l.createContext(null);D.displayName="NestingContext";function I(e){return"children"in e?I(e.children):e.current.filter(({el:n})=>n.current!==null).filter(({state:n})=>n==="visible").length>0}function fe(e,n){let t=Fe(e),r=l.useRef([]),i=Ne(),a=ue(),d=$((c,u=R.Hidden)=>{let p=r.current.findIndex(({el:m})=>m===c);p!==-1&&(ae(u,{[R.Unmount](){r.current.splice(p,1)},[R.Hidden](){r.current[p].state="hidden"}}),a.microTask(()=>{var m;!I(r)&&i.current&&((m=t.current)==null||m.call(t))}))}),f=$(c=>{let u=r.current.find(({el:p})=>p===c);return u?u.state!=="visible"&&(u.state="visible"):r.current.push({el:c,state:"visible"}),()=>d(c,R.Unmount)}),s=l.useRef([]),o=l.useRef(Promise.resolve()),v=l.useRef({enter:[],leave:[]}),C=$((c,u,p)=>{s.current.splice(0),n&&(n.chains.current[u]=n.chains.current[u].filter(([m])=>m!==c)),n==null||n.chains.current[u].push([c,new Promise(m=>{s.current.push(m)})]),n==null||n.chains.current[u].push([c,new Promise(m=>{Promise.all(v.current[u].map(([S,P])=>P)).then(()=>m())})]),u==="enter"?o.current=o.current.then(()=>n==null?void 0:n.wait.current).then(()=>p(u)):p(u)}),b=$((c,u,p)=>{Promise.all(v.current[u].splice(0).map(([m,S])=>S)).then(()=>{var m;(m=s.current.shift())==null||m()}).then(()=>p(u))});return l.useMemo(()=>({children:r,register:f,unregister:d,onStart:C,onStop:b,wait:o,chains:v}),[f,d,r,C,b,v,o])}let me=l.Fragment,pe=Ce.RenderStrategy;function Ue(e,n){var t,r;let{transition:i=!0,beforeEnter:a,afterEnter:d,beforeLeave:f,afterLeave:s,enter:o,enterFrom:v,enterTo:C,entered:b,leave:c,leaveFrom:u,leaveTo:p,...m}=e,[S,P]=l.useState(null),h=l.useRef(null),y=de(e),A=ie(...y?[h,n,P]:n===null?[]:[n]),W=(t=m.unmount)==null||t?R.Unmount:R.Hidden,{show:F,appear:X,initial:Y}=qe(),[T,z]=l.useState(F?"visible":"hidden"),Z=Me(),{register:k,unregister:H}=Z;x(()=>k(h),[k,h]),x(()=>{if(W===R.Hidden&&h.current){if(F&&T!=="visible"){z("visible");return}return ae(T,{hidden:()=>H(h),visible:()=>k(h)})}},[T,h,k,H,F,W]);let V=ce();x(()=>{if(y&&V&&T==="visible"&&h.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[h,T,V,y]);let he=Y&&!X,J=X&&F&&Y,_=l.useRef(!1),N=fe(()=>{_.current||(z("hidden"),H(h))},Z),ee=$(K=>{_.current=!0;let j=K?"enter":"leave";N.onStart(h,j,L=>{L==="enter"?a==null||a():L==="leave"&&(f==null||f())})}),te=$(K=>{let j=K?"enter":"leave";_.current=!1,N.onStop(h,j,L=>{L==="enter"?d==null||d():L==="leave"&&(s==null||s())}),j==="leave"&&!I(N)&&(z("hidden"),H(h))});l.useEffect(()=>{y&&i||(ee(F),te(F))},[F,y,i]);let ge=!(!i||!y||!V||he),[,g]=xe(ge,S,F,{start:ee,end:te}),Ee=ye({ref:A,className:((r=Te(m.className,J&&o,J&&v,g.enter&&o,g.enter&&g.closed&&v,g.enter&&!g.closed&&C,g.leave&&c,g.leave&&!g.closed&&u,g.leave&&g.closed&&p,!g.transition&&F&&b))==null?void 0:r.trim())||void 0,...we(g)}),O=0;T==="visible"&&(O|=w.Open),T==="hidden"&&(O|=w.Closed),g.enter&&(O|=w.Opening),g.leave&&(O|=w.Closing);let be=se();return E.createElement(D.Provider,{value:N},E.createElement(ke,{value:O},be({ourProps:Ee,theirProps:m,defaultTag:me,features:pe,visible:T==="visible",name:"Transition.Child"})))}function De(e,n){let{show:t,appear:r=!1,unmount:i=!0,...a}=e,d=l.useRef(null),f=de(e),s=ie(...f?[d,n]:n===null?[]:[n]);ce();let o=oe();if(t===void 0&&o!==null&&(t=(o&w.Open)===w.Open),t===void 0)throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[v,C]=l.useState(t?"visible":"hidden"),b=fe(()=>{t||C("hidden")}),[c,u]=l.useState(!0),p=l.useRef([t]);x(()=>{c!==!1&&p.current[p.current.length-1]!==t&&(p.current.push(t),u(!1))},[p,t]);let m=l.useMemo(()=>({show:t,appear:r,initial:c}),[t,r,c]);x(()=>{t?C("visible"):!I(b)&&d.current!==null&&C("hidden")},[t,b]);let S={unmount:i},P=$(()=>{var A;c&&u(!1),(A=e.beforeEnter)==null||A.call(e)}),h=$(()=>{var A;c&&u(!1),(A=e.beforeLeave)==null||A.call(e)}),y=se();return E.createElement(D.Provider,{value:b},E.createElement(U.Provider,{value:m},y({ourProps:{...S,as:l.Fragment,children:E.createElement(ve,{ref:s,...S,...a,beforeEnter:P,beforeLeave:h})},theirProps:{},defaultTag:l.Fragment,features:pe,visible:v==="visible",name:"Transition"})))}function Ie(e,n){let t=l.useContext(U)!==null,r=oe()!==null;return E.createElement(E.Fragment,null,!t&&r?E.createElement(G,{ref:n,...e}):E.createElement(ve,{ref:n,...e}))}let G=Q(De),ve=Q(Ue),ze=Q(Ie),Be=Object.assign(G,{Child:ze,Root:G});export{ze as F,Ne as f,w as i,ce as l,q as o,ue as p,Ke as s,$e as t,oe as u,Be as z};
