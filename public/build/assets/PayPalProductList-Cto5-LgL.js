import{K as h,r as i,j as e,A as j,S as u}from"./app-B2HQlWnT.js";import{B as C}from"./button-CcFWsllP.js";import{C as f,a as b,b as p,e as N}from"./card-Cmre9O5S.js";import{L as o}from"./label-Vl_i3gfF.js";import{C as P,a as y,b as S}from"./collapsible-CnGq1OLo.js";import{C as m}from"./index-B6t7UWve.js";import{C as F}from"./chevron-down-BIMxEqAL.js";import{L as M}from"./loader-circle-nSBsVhQj.js";import{P as L}from"./plus-Dewb_ruy.js";import"./index-Em6V7PX4.js";import"./index-DE7A9RwK.js";import"./createLucideIcon-BNvvKPx2.js";function D({pp_products:s}){var n;h().props.auth.user;const d=`{
    "name": "KeyCore",
    "description": "KeyCore",
    "type": "SERVICE",
    "category": "SOFTWARE",
    "image_url": "https://example.com/streaming.jpg",
    "home_url": "https://example.com/home"
}`,[r,c]=i.useState(d),[t,l]=i.useState(!1),x=()=>{l(!0),u.post(route("paypal.createProduct"),JSON.parse(r),{onFinish:()=>l(!1)})};return e.jsxs(f,{children:[e.jsx(b,{children:e.jsx(o,{className:"text-xl",children:"PayPal Products"})}),e.jsx(p,{children:e.jsx(j,{data:"pp_products",fallback:e.jsx("div",{children:"Loading products..."}),children:e.jsxs("div",{className:"flex flex-col gap-4",children:[!(s!=null&&s.products)&&e.jsx(o,{className:"text-red-500",children:"No products found."}),(n=s==null?void 0:s.products)==null?void 0:n.map((a,g)=>e.jsxs(P,{className:"p-2 border rounded-md bg-zinc-900",children:[e.jsxs(y,{className:"flex flex-row justify-between w-full items-center",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-start",children:[e.jsxs(o,{children:["ID: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.id})]}),e.jsxs(o,{children:["NAME: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.name})]})]}),e.jsx(F,{})]}),e.jsx(S,{className:"bg-zinc-950 p-2 border rounded-md mt-2",children:e.jsx(m,{"data-color-mode":"dark",value:JSON.stringify(a,null,2),language:"json",padding:15,style:{backgroundColor:"#09090b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}})})]},g))]})})}),e.jsxs(N,{className:"border-t flex-col items-start gap-4",children:[e.jsx(o,{className:"mt-4 text-xl",children:"Create new product"}),e.jsx(m,{"data-color-mode":"dark",value:r,className:" w-full h-56 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",language:"json",onChange:a=>c(a.target.value),padding:15,style:{backgroundColor:"#18181b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}}),e.jsxs(C,{className:"btn-primary",disabled:t,onClick:x,children:[t?e.jsx(M,{className:"animate-spin"}):e.jsx(L,{}),"Create Product"]})]})]})}export{D as PayPalProductList};
