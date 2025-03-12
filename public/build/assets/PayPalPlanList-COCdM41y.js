import{K as f,r as i,j as e,A as C,S as g}from"./app-B2HQlWnT.js";import{B as h}from"./button-CcFWsllP.js";import{C as j,a as b,b as p,e as N}from"./card-Cmre9O5S.js";import{L as r}from"./label-Vl_i3gfF.js";import{C as y,a as P,b as S}from"./collapsible-CnGq1OLo.js";import{C as c}from"./index-B6t7UWve.js";import{C as v}from"./chevron-down-BIMxEqAL.js";import{L}from"./loader-circle-nSBsVhQj.js";import{P as M}from"./plus-Dewb_ruy.js";import"./index-Em6V7PX4.js";import"./index-DE7A9RwK.js";import"./createLucideIcon-BNvvKPx2.js";function B({pp_plans:s}){var l;f().props.auth.user;const d=`{
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
}`,[o,m]=i.useState(d),[t,n]=i.useState(!1),u=()=>{n(!0),g.post(route("paypal.createPlan"),JSON.parse(o),{onFinish:()=>n(!1)})};return e.jsxs(j,{children:[e.jsx(b,{children:e.jsx(r,{className:"text-xl",children:"PayPal Plans"})}),e.jsx(p,{children:e.jsx(C,{data:"pp_plans",fallback:e.jsx("div",{children:"Loading plans..."}),children:e.jsxs("div",{className:"flex flex-col gap-4",children:[!(s!=null&&s.plans)&&e.jsx(r,{className:"text-red-500",children:"No plans found."}),(l=s==null?void 0:s.plans)==null?void 0:l.map((a,x)=>e.jsxs(y,{className:"p-2 border rounded-md bg-zinc-900",children:[e.jsxs(P,{className:"flex flex-row justify-between w-full items-center",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-start",children:[e.jsxs(r,{children:["ID: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.id})]}),e.jsxs(r,{children:["NAME: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.name})]})]}),e.jsx(v,{})]}),e.jsx(S,{className:"bg-zinc-950 p-2 border rounded-md mt-2",children:e.jsx(c,{"data-color-mode":"dark",value:JSON.stringify(a,null,2),language:"json",padding:15,style:{backgroundColor:"#09090b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}})})]},x))]})})}),e.jsxs(N,{className:"border-t flex-col items-start gap-4",children:[e.jsx(r,{className:"mt-4 text-xl",children:"Create new plan"}),e.jsx(c,{"data-color-mode":"dark",value:o,className:" w-full h-84 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",language:"json",onChange:a=>m(a.target.value),padding:15,style:{backgroundColor:"#18181b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}}),e.jsxs(h,{className:"btn-primary",disabled:t,onClick:u,children:[t?e.jsx(L,{className:"animate-spin"}):e.jsx(M,{}),"Create Plan"]})]})]})}export{B as PayPalPlanList};
