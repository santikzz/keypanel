import{K as E,r as i,j as e,S as v}from"./app-2b23YrnK.js";import{u as D,s as N,F as R,a as l,b as c,c as m,d,e as p,o as S,g as x}from"./form-OofxsTPd.js";import{V as u}from"./index-DsxUMH9m.js";import{B as h,g as P,t as j}from"./button-BbHsYz03.js";import{D as L,a as _,b as T,c as z,d as k,e as I}from"./dialog-DbC6CjyB.js";import{I as f}from"./input-CbC5UnEm.js";import{P as b}from"./plus-8_r9ynz2.js";import{R as U}from"./refresh-ccw-0cp4bKs4.js";import{L as V}from"./loader-circle-D1mA8ziZ.js";import"./label-BzUgwGFy.js";import"./index-C-2hyLgg.js";import"./index-vd-RcrO-.js";import"./x-CaNmTljD.js";import"./createLucideIcon-xaTbvGYt.js";const A=S({name:x().min(6).max(24).regex(/^[a-zA-Z0-9]+$/,"Username must be alphanumeric"),password:x().min(8).max(64)});function ee(){const s=E().props.auth.user,g=s==null?void 0:s.all_permissions.includes("RESELLER_CREATE"),y=(s==null?void 0:s.resellers_count)>=(s==null?void 0:s.subscription.max_resellers),[w,a]=i.useState(!1),[t,n]=i.useState(!1),o=D({resolver:N(A)}),C=async r=>{n(!0),v.post(route("users.storeReseller"),r,{onError:()=>{u.error("Error creating user",{style:j})},onSuccess:()=>{u.success("User created",{style:j}),a(!1)},onFinish:()=>n(!1)})},F=()=>{const r=P();o.setValue("password",r)};return e.jsxs(L,{open:w,onOpenChange:a,children:[e.jsx(_,{asChild:!0,children:e.jsxs(h,{className:"btn-primary hover:bg-indigo-700",disabled:!g||y,children:[e.jsx(b,{}),"New reseller"," (",s==null?void 0:s.resellers_count,"/",s==null?void 0:s.subscription.max_resellers,")"]})}),e.jsxs(T,{className:"bg-zinc-950 border border-zinc-900",children:[e.jsxs(z,{children:[e.jsx(k,{children:"Create new reseller"}),e.jsx(I,{})]}),e.jsx(R,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(C),className:"flex flex-col gap-4",children:[e.jsx(l,{control:o.control,name:"name",render:({field:r})=>e.jsxs(c,{children:[e.jsx(m,{children:"Username *"}),e.jsx(d,{children:e.jsx(f,{placeholder:"Enter a username",type:"text",...r})}),e.jsx(p,{})]})}),e.jsx(l,{control:o.control,name:"password",render:({field:r})=>e.jsxs(c,{children:[e.jsx(m,{children:"Password *"}),e.jsx(d,{children:e.jsxs("div",{className:"relative",children:[e.jsx(f,{className:"pe-9",placeholder:"Enter a password",...r}),e.jsx("button",{type:"button",className:"absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",onClick:F,children:e.jsx(U,{size:16,strokeWidth:2,"aria-hidden":"true"})})]})}),e.jsx(p,{})]})}),e.jsx("div",{className:"flex justify-end",children:e.jsx(h,{type:"submit",className:"btn-primary",disabled:t,children:t?e.jsxs(e.Fragment,{children:[e.jsx(V,{className:"animate-spin"}),"Creating user..."]}):e.jsxs(e.Fragment,{children:[e.jsx(b,{})," Create user"]})})})]})})]})]})}export{ee as CreateResellerDialog};
