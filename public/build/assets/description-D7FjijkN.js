import{r as n,R as f}from"./app-BTBLTgKa.js";import{K as v,y as x,n as C,L as g,o as h}from"./use-sync-refs-CvQBCb6M.js";let E=n.createContext(void 0);function D(){return n.useContext(E)}let p=n.createContext(null);p.displayName="DescriptionContext";function c(){let r=n.useContext(p);if(r===null){let e=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(e,c),e}return r}function T(){var r,e;return(e=(r=n.useContext(p))==null?void 0:r.value)!=null?e:void 0}function $(){let[r,e]=n.useState([]);return[r.length>0?r.join(" "):void 0,n.useMemo(()=>function(t){let a=h(u=>(e(o=>[...o,u]),()=>e(o=>{let i=o.slice(),l=i.indexOf(u);return l!==-1&&i.splice(l,1),i}))),s=n.useMemo(()=>({register:a,slot:t.slot,name:t.name,props:t.props,value:t.value}),[a,t.slot,t.name,t.props,t.value]);return f.createElement(p.Provider,{value:s},t.children)},[e])]}let S="p";function b(r,e){let t=n.useId(),a=D(),{id:s=`headlessui-description-${t}`,...u}=r,o=c(),i=x(e);C(()=>o.register(s),[s,o.register]);let l=a||!1,d=n.useMemo(()=>({...o.slot,disabled:l}),[o.slot,l]),m={ref:i,...o.props,id:s};return g()({ourProps:m,theirProps:u,slot:d,defaultTag:S,name:o.name||"Description"})}let w=v(b),j=Object.assign(w,{});export{j as H,T as U,D as a,$ as w};
