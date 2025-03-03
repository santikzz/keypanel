import{r as h,j as e,S as f}from"./app-BTBLTgKa.js";import{u as g,F as b,a as r,b as t,c as n,d as l,e as o,f as S,s as v,o as y,g as i}from"./form-Ewck4cr5.js";import{V as p}from"./index-C0Aybrov.js";import{A as F}from"./AuthenticatedLayout-ChSu_qVk.js";import{B as C,t as x}from"./createLucideIcon-Dk4g4Rfc.js";import{S as N,a as w,b as A,c as V,d as c}from"./select-D13dZe9U.js";import{I as j,L as E}from"./input-DPBk8N_M.js";import{P as L}from"./plus-562kTAxb.js";import"./label-8Biq_GbJ.js";import"./index-Uk3LIZDJ.js";import"./index-9Zp9f-9W.js";import"./index-DuTKQBgG.js";import"./index-cyAClCp9.js";import"./index-BPDlF92w.js";import"./check-DyFLvgFN.js";import"./x-Dpj60ZH6.js";import"./package-Bg3_ZOXw.js";import"./index-DqEWQkQn.js";import"./index-CycH6tgb.js";const D=y({name:i(),status:i().min(0).default("available"),download_url:i().optional().nullable()});function Y(){const[m,d]=h.useState(!1),a=g({resolver:v(D)}),u=async s=>{d(!0),f.post(route("applications.store"),s,{onError:()=>{p.error("Error creating application",{style:x})},onSuccess:()=>{p.success("Application created",{style:x})},onFinish:()=>d(!1)})};return e.jsx(F,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:"Applications Management"}),e.jsx("p",{className:"text-muted-foreground",children:"View and manage your releases"})]}),e.jsx(b,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(u),className:"flex flex-col gap-4",children:[e.jsx(r,{control:a.control,name:"name",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"App name *"}),e.jsx(l,{children:e.jsx(j,{placeholder:"Enter your application name",type:"text",...s})}),e.jsx(o,{})]})}),e.jsx(r,{control:a.control,name:"status",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Status *"}),e.jsxs(N,{onValueChange:s.onChange,defaultValue:s.value,children:[e.jsx(l,{children:e.jsx(w,{children:e.jsx(A,{placeholder:"Select a status"})})}),e.jsxs(V,{children:[e.jsx(c,{value:"available",children:"Available"}),e.jsx(c,{value:"unavailable",children:"Unavailable"}),e.jsx(c,{value:"hidden",children:"Hidden"})]})]}),e.jsx(o,{})]})}),e.jsx(r,{control:a.control,name:"download_url",render:({field:s})=>e.jsxs(t,{children:[e.jsx(n,{children:"Download URL"}),e.jsx(l,{children:e.jsx(j,{placeholder:"https://example.net/downloads/release.zip",type:"text",...s})}),e.jsx(S,{children:"(Optional) Download URL for launchers"}),e.jsx(o,{})]})}),e.jsx("div",{className:"flex justify-end",children:e.jsx(C,{type:"submit",className:"btn-primary",disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx(E,{className:"animate-spin"}),"Creating app..."]}):e.jsxs(e.Fragment,{children:[e.jsx(L,{})," Create app"]})})})]})})]})})}export{Y as default};
