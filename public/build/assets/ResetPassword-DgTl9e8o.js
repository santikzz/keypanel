import{m as w,j as s,L as f}from"./app-FXJ6jLQe.js";import{I as t}from"./InputError-CHx1n1wY.js";import{I as m}from"./InputLabel-BRQ5lKoH.js";import{G as x,P as j}from"./GuestLayout-BlA_vzEe.js";import{T as l}from"./TextInput-BFUv8WEs.js";function C({token:i,email:n}){const{data:e,setData:o,post:d,processing:p,errors:r,reset:c}=w({token:i,email:n,password:"",password_confirmation:""}),u=a=>{a.preventDefault(),d(route("password.store"),{onFinish:()=>c("password","password_confirmation")})};return s.jsxs(x,{children:[s.jsx(f,{title:"Reset Password"}),s.jsxs("form",{onSubmit:u,children:[s.jsxs("div",{children:[s.jsx(m,{htmlFor:"email",value:"Email"}),s.jsx(l,{id:"email",type:"email",name:"email",value:e.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>o("email",a.target.value)}),s.jsx(t,{message:r.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{htmlFor:"password",value:"Password"}),s.jsx(l,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,onChange:a=>o("password",a.target.value)}),s.jsx(t,{message:r.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(l,{type:"password",name:"password_confirmation",value:e.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>o("password_confirmation",a.target.value)}),s.jsx(t,{message:r.password_confirmation,className:"mt-2"})]}),s.jsx("div",{className:"mt-4 flex items-center justify-end",children:s.jsx(j,{className:"ms-4",disabled:p,children:"Reset Password"})})]})]})}export{C as default};
