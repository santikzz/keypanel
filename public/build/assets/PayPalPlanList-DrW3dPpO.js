import{K as p,r as i,j as e,A as f,S as C}from"./app-2b23YrnK.js";import{B as b}from"./button-BbHsYz03.js";import{C as g,a as h,b as j,e as y}from"./card-DZnqfez5.js";import{L as r}from"./label-BzUgwGFy.js";import{C as P,a as _,b as N}from"./collapsible-CTMgmbvl.js";import{C as c}from"./index-CcKQAaqw.js";import{C as S}from"./chevron-down-DC8akCjh.js";import{L as v}from"./loader-circle-D1mA8ziZ.js";import{P as L}from"./plus-8_r9ynz2.js";import"./index-vd-RcrO-.js";import"./index-C-2hyLgg.js";import"./createLucideIcon-xaTbvGYt.js";function B({plans:s}){var l;p().props.auth.user;const d=`{
  "product_id": "PROD-02484232WP582913W",
  "name": "KeyCore Tier 1",
  "description": "KeyCore Tier 1",
  "status": "ACTIVE",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 1,
      "pricing_scheme": {
        "fixed_price": {
          "value": "3",
          "currency_code": "USD"
        }
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "setup_fee_failure_action": "CANCEL",
    "payment_failure_threshold": 3
  }
}`,[o,m]=i.useState(d),[t,n]=i.useState(!1),u=()=>{n(!0),C.post(route("paypal.createPlan"),JSON.parse(o),{onFinish:()=>n(!1)})};return e.jsxs(g,{children:[e.jsx(h,{children:e.jsx(r,{className:"text-xl",children:"PayPal Products"})}),e.jsx(j,{children:e.jsx(f,{data:"products",fallback:e.jsx("div",{children:"Loading products..."}),children:e.jsx("div",{className:"flex flex-col gap-4",children:(l=s==null?void 0:s.plans)==null?void 0:l.map((a,x)=>e.jsxs(P,{className:"p-2 border rounded-md bg-zinc-900",children:[e.jsxs(_,{className:"flex flex-row justify-between w-full items-center",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs(r,{children:["ID: ",a==null?void 0:a.id]}),e.jsxs(r,{children:["NAME: ",a==null?void 0:a.name]})]}),e.jsx(S,{})]}),e.jsx(N,{className:"bg-zinc-950 p-2 border rounded-md mt-2",children:e.jsx(c,{"data-color-mode":"dark",value:JSON.stringify(a,null,2),language:"json",padding:15,style:{backgroundColor:"#09090b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}})})]},x))})})}),e.jsxs(y,{className:"border-t flex-col items-start gap-4",children:[e.jsx(r,{className:"mt-4 text-xl",children:"Create new plan"}),e.jsx(c,{"data-color-mode":"dark",value:o,className:" w-full h-84 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",language:"json",onChange:a=>m(a.target.value),padding:15,style:{backgroundColor:"#18181b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}}),e.jsxs(b,{className:"btn-primary",disabled:t,onClick:u,children:[t?e.jsx(v,{className:"animate-spin"}):e.jsx(L,{}),"Create Plan"]})]})]})}export{B as PayPalPlanList};
