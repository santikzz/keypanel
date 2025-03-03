import{K as R,r as h,j as e,S as k}from"./app-BTBLTgKa.js";import{V as j}from"./index-C0Aybrov.js";import{u as T,s as I,F as L,a as n,b as t,c as g,d as i,e as l,o as M,h as z,g as c}from"./form-Ewck4cr5.js";import{B as f,g as A,p as V,h as O,t as b}from"./createLucideIcon-Dk4g4Rfc.js";import{D as U,a as B,b as _,c as G,d as H,e as K}from"./dialog-DcRx5_hZ.js";import{I as C,L as W}from"./input-DPBk8N_M.js";import{C as Z}from"./checkbox-Dw-5dZAd.js";import{L as y}from"./label-8Biq_GbJ.js";import{P as N}from"./plus-562kTAxb.js";import{R as $}from"./refresh-ccw-CRG4HO2M.js";import"./index-Uk3LIZDJ.js";import"./x-Dpj60ZH6.js";import"./index-DqEWQkQn.js";import"./index-cyAClCp9.js";import"./check-DyFLvgFN.js";const q=M({name:c().min(6).max(24).regex(/^[a-zA-Z0-9]+$/,"Username must be alphanumeric"),password:c().min(8).max(64),permissions:z(c()).optional()});function me(){const o=R().props.auth.user,v=o==null?void 0:o.all_permissions.includes("MANAGER_CREATE"),[w,d]=h.useState(!1),[m,p]=h.useState(!1),r=T({resolver:I(q),defaultValues:{permissions:[]}}),F=async s=>{p(!0),k.post(route("users.storeManager"),s,{onError:()=>{j.error("Error creating user",{style:b})},onSuccess:()=>{j.success("User created",{style:b}),d(!1)},onFinish:()=>{p(!1)}})},S=()=>{const s=O();r.setValue("password",s)};return e.jsxs(U,{open:w,onOpenChange:d,children:[e.jsx(B,{asChild:!0,children:e.jsxs(f,{className:"btn-primary hover:bg-indigo-700",disabled:!v,children:[e.jsx(N,{}),"New manager"]})}),e.jsxs(_,{className:"bg-zinc-950 border border-zinc-900",children:[e.jsxs(G,{children:[e.jsx(H,{children:"Create new manager"}),e.jsx(K,{})]}),e.jsx(L,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(F),className:"flex flex-col gap-4",children:[e.jsx(n,{control:r.control,name:"name",render:({field:s})=>e.jsxs(t,{children:[e.jsx(g,{children:"Username *"}),e.jsx(i,{children:e.jsx(C,{placeholder:"Enter a username",type:"text",...s})}),e.jsx(l,{})]})}),e.jsx(n,{control:r.control,name:"password",render:({field:s})=>e.jsxs(t,{children:[e.jsx(g,{children:"Password *"}),e.jsx(i,{children:e.jsxs("div",{className:"relative",children:[e.jsx(C,{className:"pe-9",placeholder:"Enter a password",...s}),e.jsx("button",{type:"button",className:"absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",onClick:S,children:e.jsx($,{size:16,strokeWidth:2,"aria-hidden":"true"})})]})}),e.jsx(l,{})]})}),e.jsx(n,{control:r.control,name:"permissions",render:({field:s})=>e.jsxs(e.Fragment,{children:[e.jsx(y,{children:"Permissions"}),e.jsxs(t,{className:"flex flex-col space-y-2 rounded-md border p-4",children:[e.jsx(i,{children:e.jsx("div",{className:"grid grid-cols-3 gap-3",children:A.map((a,x)=>{var u;return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Z,{checked:((u=s.value)==null?void 0:u.includes(a))||!1,onCheckedChange:P=>{const D=P?[...s.value||[],a]:(s.value||[]).filter(E=>E!==a);s.onChange(D)}},x),e.jsx(y,{className:"uppercase text-xs",children:V(a)})]},x)})})}),e.jsx(l,{})]})]})}),e.jsx("div",{className:"flex justify-end",children:e.jsx(f,{type:"submit",className:"btn-primary",disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"animate-spin"}),"Creating user..."]}):e.jsxs(e.Fragment,{children:[e.jsx(N,{})," Create user"]})})})]})})]})]})}export{me as CreateManagerDialog};
