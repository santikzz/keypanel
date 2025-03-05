import{m as f,r as g,j as e,L as j,$ as v}from"./app-4OTGGRcX.js";import{I as o}from"./InputError-D4gh8VzZ.js";import{B as r}from"./button-CL0-rTXa.js";import{C as b,d as w}from"./card-e2EOPXwx.js";import{I as c}from"./input-BibZOjCS.js";import{L as d}from"./label-C9muJG0t.js";import{E as N,a as y}from"./eye-C2oKs2Sf.js";import{L as I}from"./loader-circle-CQr58E18.js";import{c as L}from"./createLucideIcon-0tCQbCtX.js";import"./index-3LH4pK_h.js";/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]],z=L("LogIn",C);function R({status:k,canResetPassword:E}){const{data:t,setData:i,post:m,processing:l,errors:n,reset:x}=f({email:"",password:""}),h=s=>{s.preventDefault(),m(route("login"),{onFinish:()=>x("password")})},[a,u]=g.useState(!1),p=()=>u(s=>!s);return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"Sign In"}),e.jsxs("div",{className:"login min-h-screen items-center justify-center flex flex-col gap-6 bg-zinc-900/25",children:["  ",e.jsx(b,{className:"overflow-hidden w-[50em] shadow-lg",children:e.jsxs(w,{className:"grid p-0 md:grid-cols-2",children:[e.jsx("form",{className:"p-6 md:p-8",onSubmit:h,children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center text-center",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Welcome back"}),e.jsx("p",{className:"text-balance text-muted-foreground",children:"Login to your KeyCore account"})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(d,{htmlFor:"email",children:"Email or username"}),e.jsx(c,{id:"email",type:"text",placeholder:"m@example.com",required:!0,value:t.email,onChange:s=>i("email",s.target.value),tabIndex:1}),e.jsx(o,{message:n.email})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(d,{htmlFor:"password",children:"Password"}),e.jsx("a",{href:"#",className:"ml-auto text-sm underline-offset-2 hover:underline",children:"Forgot your password?"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(c,{className:"pe-9",type:a?"text":"password",id:"password",name:"password",value:t.password,onChange:s=>i("password",s.target.value),tabIndex:2}),e.jsx("button",{className:"text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",type:"button",onClick:p,"aria-label":a?"Hide password":"Show password","aria-pressed":a,"aria-controls":"password",children:a?e.jsx(N,{size:16,"aria-hidden":"true"}):e.jsx(y,{size:16,"aria-hidden":"true"})})]}),e.jsx(o,{message:n.password})]}),e.jsxs(r,{type:"submit",className:"w-full btn-primary flex items-center",disabled:l,children:[l?e.jsx(I,{className:"animate-spin mb-0.5"}):e.jsx(z,{className:"mb-0.5"}),"Sign In"]}),e.jsx("div",{className:"relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border",children:e.jsx("span",{className:"relative z-10 bg-background px-2 text-muted-foreground",children:"Or continue with"})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx("a",{href:"/auth/discord",children:e.jsxs(r,{variant:"outline",className:"w-full",type:"button",children:[e.jsxs("svg",{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("title",{children:"Discord"}),e.jsx("path",{fill:"#d4d4d8",d:"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"})]}),e.jsx("span",{className:"sr-only",children:"Login with Discord"})]})}),e.jsx("a",{href:"/auth/google",children:e.jsxs(r,{variant:"outline",className:"w-full",type:"button",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",fill:"#d4d4d8"})}),e.jsx("span",{className:"sr-only",children:"Login with Google"})]})})]}),e.jsxs("div",{className:"text-center text-sm",children:["Don't have an account?"," ",e.jsx(v,{href:"/register",className:"underline underline-offset-4",children:"Sign up"})]})]})}),e.jsx("div",{className:"relative hidden bg-muted md:block",children:e.jsx("img",{src:"/assets/waves.jpg",alt:"Image",className:"absolute inset-0 h-full w-full object-cover brightness-75"})})]})}),e.jsxs("div",{className:"text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary",children:["By clicking continue, you agree to our ",e.jsx("a",{href:"#",children:"Terms of Service"})," ","and ",e.jsx("a",{href:"#",children:"Privacy Policy"}),"."]})]})]})}export{R as default};
