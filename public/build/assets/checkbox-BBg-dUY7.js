import{r as s,j as n}from"./app-FXJ6jLQe.js";import{u as O,P as w,a as g}from"./button-Ce_b9ygY.js";import{a as A,c as B,b as j,P as H}from"./index-Dn7W_-lm.js";import{u as K}from"./index-BAmNiSFU.js";import{u as L}from"./index-Bo_VaOlX.js";import{C as q}from"./check-B6cm8EDH.js";var P="Checkbox",[z,Z]=B(P),[T,X]=z(P),N=s.forwardRef((e,i)=>{const{__scopeCheckbox:t,name:u,checked:p,defaultChecked:o,required:h,disabled:d,value:b="on",onCheckedChange:C,form:l,...x}=e,[a,k]=s.useState(null),v=O(i,r=>k(r)),y=s.useRef(!1),R=a?l||!!a.closest("form"):!0,[f=!1,E]=A({prop:p,defaultProp:o,onChange:C}),M=s.useRef(f);return s.useEffect(()=>{const r=a==null?void 0:a.form;if(r){const m=()=>E(M.current);return r.addEventListener("reset",m),()=>r.removeEventListener("reset",m)}},[a,E]),n.jsxs(T,{scope:t,state:f,disabled:d,children:[n.jsx(w.button,{type:"button",role:"checkbox","aria-checked":c(f)?"mixed":f,"aria-required":h,"data-state":_(f),"data-disabled":d?"":void 0,disabled:d,value:b,...x,ref:v,onKeyDown:j(e.onKeyDown,r=>{r.key==="Enter"&&r.preventDefault()}),onClick:j(e.onClick,r=>{E(m=>c(m)?!0:!m),R&&(y.current=r.isPropagationStopped(),y.current||r.stopPropagation())})}),R&&n.jsx(F,{control:a,bubbles:!y.current,name:u,value:b,checked:f,required:h,disabled:d,form:l,style:{transform:"translateX(-100%)"},defaultChecked:c(o)?!1:o})]})});N.displayName=P;var S="CheckboxIndicator",I=s.forwardRef((e,i)=>{const{__scopeCheckbox:t,forceMount:u,...p}=e,o=X(S,t);return n.jsx(H,{present:u||c(o.state)||o.state===!0,children:n.jsx(w.span,{"data-state":_(o.state),"data-disabled":o.disabled?"":void 0,...p,ref:i,style:{pointerEvents:"none",...e.style}})})});I.displayName=S;var F=e=>{const{control:i,checked:t,bubbles:u=!0,defaultChecked:p,...o}=e,h=s.useRef(null),d=K(t),b=L(i);s.useEffect(()=>{const l=h.current,x=window.HTMLInputElement.prototype,k=Object.getOwnPropertyDescriptor(x,"checked").set;if(d!==t&&k){const v=new Event("click",{bubbles:u});l.indeterminate=c(t),k.call(l,c(t)?!1:t),l.dispatchEvent(v)}},[d,t,u]);const C=s.useRef(c(t)?!1:t);return n.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:p??C.current,...o,tabIndex:-1,ref:h,style:{...e.style,...b,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function c(e){return e==="indeterminate"}function _(e){return c(e)?"indeterminate":e?"checked":"unchecked"}var D=N,$=I;const G=s.forwardRef(({className:e,...i},t)=>n.jsx(D,{ref:t,className:g("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...i,children:n.jsx($,{className:g("flex items-center justify-center text-current"),children:n.jsx(q,{className:"h-4 w-4"})})}));G.displayName=D.displayName;export{G as C};
