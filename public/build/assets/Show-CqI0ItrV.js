import{K as O,r as n,j as e,L as U,A as _,S as N}from"./app-FXJ6jLQe.js";import{V as o}from"./index-Dn7W_-lm.js";import{u as V,F as z,b as d,c as h,d as c,e as p,a as x,f as w,s as B,o as G,i as H,h as W,g as A,l as K}from"./form-ADAfqGEn.js";import{A as q}from"./AuthenticatedLayout-BmPgBYc8.js";import{e as J,p as Q,B as u,t as m,g as X}from"./button-Ce_b9ygY.js";import{I as S}from"./input-DC-sq8Ns.js";import{C as Y}from"./checkbox-BBg-dUY7.js";import{L as F}from"./label-CMF0eOr7.js";import{S as Z}from"./switch-D5QyO_oG.js";import{C as $,a as ee,b as se,d as re}from"./card-m4ghHYNq.js";import{A as te,a as ae,b as le,c as ie,d as ne,e as oe,f as de,g as ce}from"./alert-dialog-DLYukafb.js";import{R as me}from"./refresh-ccw-uupUBg6T.js";import{L as j}from"./loader-circle-Cu0U8Rup.js";import{T as he}from"./trash-Bi4YYNvE.js";import{C as pe}from"./check-B6cm8EDH.js";import"./index-Bhapx3qy.js";import"./index-Bhsnbx5j.js";import"./index-DenDO0bJ.js";import"./index-Bo_VaOlX.js";import"./index-BL57jxoK.js";import"./createLucideIcon-BgzLVGAg.js";import"./x-DSSjkk1K.js";import"./package-DkBtlAK3.js";import"./index-BAmNiSFU.js";const xe=G({password:A().min(8).max(64).optional().or(K("")),permissions:W(A()).optional(),disabled:H().optional()});function _e({manager:s}){const a=O().props.auth.user,l=a==null?void 0:a.all_permissions.includes("MANAGER_UPDATE"),E=a==null?void 0:a.all_permissions.includes("MANAGER_DELETE"),[f,b]=n.useState(!1),[g,y]=n.useState(!1),[T,C]=n.useState(!1),t=V({resolver:B(xe)}),k=r=>{console.log("test"),b(!0),N.put(route("users.updateManager",s==null?void 0:s.id),r,{onError:()=>{o.error("Error updating manager",{style:m})},onSuccess:()=>{o.success("Manager updated",{style:m})},onFinish:()=>b(!1)})},P=()=>{y(!0),C(!1),N.delete(route("users.delete",s==null?void 0:s.id),{onError:()=>{o.error("Error deleting user",{style:m})},onSuccess:()=>{o.success("User deleted",{style:m})},onFinish:()=>{y(!1)}})},L=()=>{const r=X();t.setValue("password",r)};return n.useEffect(()=>{s&&t.reset({permissions:s.all_permissions,disabled:s.disabled})},[s]),e.jsxs(q,{children:[e.jsx(U,{title:"Manager Details"}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h2",{className:"text-3xl font-bold tracking-tight",children:"Manager Details"})}),e.jsxs($,{children:[e.jsx(ee,{children:e.jsx(se,{children:"Update details"})}),e.jsx(_,{data:"manager",fallback:e.jsx("div",{className:"flex items-center justify-center py-12",children:e.jsx(j,{className:"h-10 w-10 animate-spin text-indigo-700",size:32})}),children:e.jsx(re,{children:e.jsx(z,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(k),className:"flex flex-col gap-4",children:[e.jsxs(d,{children:[e.jsx(h,{children:"Username"}),e.jsx(c,{children:e.jsx(S,{value:s==null?void 0:s.name,readOnly:!0,disabled:!0})}),e.jsx(p,{})]}),e.jsx(x,{control:t.control,name:"password",render:({field:r})=>e.jsxs(d,{children:[e.jsx(h,{children:"Password"}),e.jsx(c,{children:e.jsxs("div",{className:"relative",children:[e.jsx(S,{className:"pe-9",placeholder:"Change password",...r,disabled:!l}),e.jsx("button",{type:"button",className:"absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",onClick:L,children:e.jsx(me,{size:16,strokeWidth:2,"aria-hidden":"true"})})]})}),e.jsx(w,{children:"Leave empty to keep the current password"}),e.jsx(p,{})]})}),e.jsx(x,{control:t.control,name:"permissions",render:({field:r})=>e.jsxs(e.Fragment,{children:[e.jsx(F,{children:"Permissions"}),e.jsxs(d,{className:"flex flex-col space-y-2 rounded-md border p-4",children:[e.jsx(c,{children:e.jsx("div",{className:"grid grid-cols-3 gap-3",children:J.map((i,v)=>{var D;return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Y,{checked:((D=r.value)==null?void 0:D.includes(i))||!1,onCheckedChange:M=>{const R=M?[...r.value||[],i]:(r.value||[]).filter(I=>I!==i);r.onChange(R)},disabled:!l},v),e.jsx(F,{className:"uppercase text-xs",children:Q(i)})]},v)})})}),e.jsx(p,{})]})]})}),e.jsx(x,{control:t.control,name:"disabled",render:({field:r})=>e.jsxs(d,{className:"flex flex-row items-center justify-between rounded-lg border p-4",children:[e.jsxs("div",{className:"space-y-0.5",children:[e.jsx(h,{children:"Disable account"}),e.jsx(w,{children:"When disabled, the user will not be able to log in"})]}),e.jsx(c,{children:e.jsx(Z,{checked:r.value,onCheckedChange:r.onChange,disabled:!l})})]})}),e.jsxs("div",{className:"flex justify-between",children:[e.jsxs(te,{open:T,onOpenChange:C,children:[e.jsx(ae,{asChild:!0,children:e.jsx(u,{type:"button",variant:"ghost",className:"text-red-500/75",disabled:g||!E,children:g?e.jsxs(e.Fragment,{children:[e.jsx(j,{className:"animate-spin"}),"Delete"]}):e.jsxs(e.Fragment,{children:[e.jsx(he,{}),"Delete"]})})}),e.jsxs(le,{children:[e.jsxs(ie,{children:[e.jsx(ne,{children:"Are you absolutely sure?"}),e.jsx(oe,{children:"This action cannot be undone. This will permanently delete this account and cannot be undone."})]}),e.jsxs(de,{children:[e.jsx(ce,{children:"Cancel"}),e.jsx(u,{className:"btn-danger",onClick:P,children:"Delete"})]})]})]}),e.jsx(u,{type:"submit",className:"btn-primary",disabled:f||!l,children:f?e.jsxs(e.Fragment,{children:[e.jsx(j,{className:"animate-spin"})," Saving changes..."]}):e.jsxs(e.Fragment,{children:[e.jsx(pe,{})," Save changes"]})})]})]})})})})]})]})]})}export{_e as default};
