import{r as s,j as o}from"./app-BTBLTgKa.js";import{n as u,i as k,T as G,j as H,W,c as V,C as Y,b as q,l as B,m as J,k as A,O as K}from"./index-C0Aybrov.js";import{u as D,S as Q,a as n,j as v}from"./createLucideIcon-Dk4g4Rfc.js";var x="AlertDialog",[U,xe]=V(x,[u]),i=u(),N=e=>{const{__scopeAlertDialog:a,...t}=e,r=i(a);return o.jsx(k,{...r,...t,modal:!0})};N.displayName=x;var X="AlertDialogTrigger",y=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(G,{...l,...r,ref:a})});y.displayName=X;var Z="AlertDialogPortal",j=e=>{const{__scopeAlertDialog:a,...t}=e,r=i(a);return o.jsx(H,{...r,...t})};j.displayName=Z;var ee="AlertDialogOverlay",R=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(K,{...l,...r,ref:a})});R.displayName=ee;var c="AlertDialogContent",[ae,te]=U(c),_=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,children:r,...l}=e,g=i(t),p=s.useRef(null),L=D(a,p),f=s.useRef(null);return o.jsx(W,{contentName:c,titleName:b,docsSlug:"alert-dialog",children:o.jsx(ae,{scope:t,cancelRef:f,children:o.jsxs(Y,{role:"alertdialog",...g,...l,ref:L,onOpenAutoFocus:q(l.onOpenAutoFocus,d=>{var m;d.preventDefault(),(m=f.current)==null||m.focus({preventScroll:!0})}),onPointerDownOutside:d=>d.preventDefault(),onInteractOutside:d=>d.preventDefault(),children:[o.jsx(Q,{children:r}),o.jsx(re,{contentRef:p})]})})})});_.displayName=c;var b="AlertDialogTitle",h=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(B,{...l,...r,ref:a})});h.displayName=b;var w="AlertDialogDescription",C=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(J,{...l,...r,ref:a})});C.displayName=w;var oe="AlertDialogAction",E=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(A,{...l,...r,ref:a})});E.displayName=oe;var S="AlertDialogCancel",T=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,{cancelRef:l}=te(S,t),g=i(t),p=D(a,l);return o.jsx(A,{...g,...r,ref:p})});T.displayName=S;var re=({contentRef:e})=>{const a=`\`${c}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${c}\` by passing a \`${w}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${c}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return s.useEffect(()=>{var r;document.getElementById((r=e.current)==null?void 0:r.getAttribute("aria-describedby"))||console.warn(a)},[a,e]),null},se=N,le=y,ie=j,P=R,O=_,$=E,M=T,I=h,F=C;const Ne=se,ye=le,ne=ie,z=s.forwardRef(({className:e,...a},t)=>o.jsx(P,{className:n("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...a,ref:t}));z.displayName=P.displayName;const ce=s.forwardRef(({className:e,...a},t)=>o.jsxs(ne,{children:[o.jsx(z,{}),o.jsx(O,{ref:t,className:n("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a})]}));ce.displayName=O.displayName;const de=({className:e,...a})=>o.jsx("div",{className:n("flex flex-col space-y-2 text-center sm:text-left",e),...a});de.displayName="AlertDialogHeader";const pe=({className:e,...a})=>o.jsx("div",{className:n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...a});pe.displayName="AlertDialogFooter";const ge=s.forwardRef(({className:e,...a},t)=>o.jsx(I,{ref:t,className:n("text-lg font-semibold",e),...a}));ge.displayName=I.displayName;const fe=s.forwardRef(({className:e,...a},t)=>o.jsx(F,{ref:t,className:n("text-sm text-muted-foreground",e),...a}));fe.displayName=F.displayName;const me=s.forwardRef(({className:e,...a},t)=>o.jsx($,{ref:t,className:n(v(),e),...a}));me.displayName=$.displayName;const ue=s.forwardRef(({className:e,...a},t)=>o.jsx(M,{ref:t,className:n(v({variant:"outline"}),"mt-2 sm:mt-0",e),...a}));ue.displayName=M.displayName;export{Ne as A,ye as a,ce as b,de as c,ge as d,fe as e,pe as f,ue as g};
