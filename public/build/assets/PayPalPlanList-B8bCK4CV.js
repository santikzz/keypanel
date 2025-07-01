import{K as f,r as i,j as e,A as C,S as g}from"./app-T4LLqA-o.js";import{B as h}from"./button-4Fnn4Zm4.js";import{C as j,a as b,b as p,e as N}from"./card-y6lGfkX7.js";import{L as r}from"./label-D3IoOerA.js";import{C as y,a as P,b as S}from"./collapsible-C6ExdMgm.js";import{C as c}from"./index-C7R_80QQ.js";import{C as v}from"./chevron-down-DcCCAuOU.js";import{L}from"./loader-circle-Dv8pZFu_.js";import{P as M}from"./plus-f1ARs8iQ.js";import"./index-Bio6E3Lq.js";import"./index-CXv7NyPn.js";import"./createLucideIcon-Del2cXXK.js";function K({pp_plans:s}){var l;f().props.auth.user;const d=`{
    "product_id": "PROD-02484232WP582913W",
    "name": "KeyCore",
    "description": "KeyCore",
    "status": "ACTIVE",
    "billing_cycles": [
      {
        "frequency": {
          "interval_unit": "MONTH",
          "interval_count": 1
        },
        "tenure_type": "REGULAR",
        "sequence": 1,
        "pricing_scheme": {
          "fixed_price": {
            "value": "10",
            "currency_code": "USD"
          }
        }
      }
    ],
    "payment_preferences": {
      "auto_bill_outstanding": true,
      "setup_fee": {
        "value": "10",
        "currency_code": "USD"
      },
      "setup_fee_failure_action": "CANCEL",
      "payment_failure_threshold": 3
    }
  }`,[o,m]=i.useState(d),[t,n]=i.useState(!1),u=()=>{n(!0),g.post(route("paypal.createPlan"),JSON.parse(o),{onFinish:()=>n(!1)})};return e.jsxs(j,{children:[e.jsx(b,{children:e.jsx(r,{className:"text-xl",children:"PayPal Plans"})}),e.jsx(p,{children:e.jsx(C,{data:"pp_plans",fallback:e.jsx("div",{children:"Loading plans..."}),children:e.jsxs("div",{className:"flex flex-col gap-4",children:[!(s!=null&&s.plans)&&e.jsx(r,{className:"text-red-500",children:"No plans found."}),(l=s==null?void 0:s.plans)==null?void 0:l.map((a,x)=>e.jsxs(y,{className:"p-2 border rounded-md bg-zinc-900",children:[e.jsxs(P,{className:"flex flex-row justify-between w-full items-center",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-start",children:[e.jsxs(r,{children:["ID: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.id})]}),e.jsxs(r,{children:["NAME: ",e.jsx("span",{className:"text-indigo-300",children:a==null?void 0:a.name})]})]}),e.jsx(v,{})]}),e.jsx(S,{className:"bg-zinc-950 p-2 border rounded-md mt-2",children:e.jsx(c,{"data-color-mode":"dark",value:JSON.stringify(a,null,2),language:"json",padding:15,style:{backgroundColor:"#09090b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}})})]},x))]})})}),e.jsxs(N,{className:"border-t flex-col items-start gap-4",children:[e.jsx(r,{className:"mt-4 text-xl",children:"Create new plan"}),e.jsx(c,{"data-color-mode":"dark",value:o,className:" w-full h-84 text-base p-2 border rounded-md bg-zinc-900 text-white border-zinc-800",language:"json",onChange:a=>m(a.target.value),padding:15,style:{backgroundColor:"#18181b",fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"}}),e.jsxs(h,{className:"btn-primary",disabled:t,onClick:u,children:[t?e.jsx(L,{className:"animate-spin"}):e.jsx(M,{}),"Create Plan"]})]})]})}export{K as PayPalPlanList};
