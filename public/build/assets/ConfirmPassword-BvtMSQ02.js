import{m as d,j as s,L as l}from"./app-FXJ6jLQe.js";import{I as p}from"./InputError-CHx1n1wY.js";import{I as c}from"./InputLabel-BRQ5lKoH.js";import{G as u,P as f}from"./GuestLayout-BlA_vzEe.js";import{T as x}from"./TextInput-BFUv8WEs.js";function g(){const{data:a,setData:e,post:o,processing:t,errors:i,reset:m}=d({password:""}),n=r=>{r.preventDefault(),o(route("password.confirm"),{onFinish:()=>m("password")})};return s.jsxs(u,{children:[s.jsx(l,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),s.jsxs("form",{onSubmit:n,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(c,{htmlFor:"password",value:"Password"}),s.jsx(x,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>e("password",r.target.value)}),s.jsx(p,{message:i.password,className:"mt-2"})]}),s.jsx("div",{className:"mt-4 flex items-center justify-end",children:s.jsx(f,{className:"ms-4",disabled:t,children:"Confirm"})})]})]})}export{g as default};
