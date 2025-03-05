import{r as P,j as Y}from"./app-FXJ6jLQe.js";import{r as Pe}from"./index-Bhapx3qy.js";import{P as bt,u as Ut}from"./button-Ce_b9ygY.js";import{c as Ce,f as Oe,e as _t}from"./index-Dn7W_-lm.js";import{u as Ee}from"./index-Bo_VaOlX.js";const Se=["top","right","bottom","left"],U=Math.min,N=Math.max,ft=Math.round,lt=Math.floor,V=t=>({x:t,y:t}),De={left:"right",right:"left",bottom:"top",top:"bottom"},Me={start:"end",end:"start"};function yt(t,e,n){return N(t,U(e,n))}function X(t,e){return typeof t=="function"?t(e):t}function q(t){return t.split("-")[0]}function tt(t){return t.split("-")[1]}function Rt(t){return t==="x"?"y":"x"}function Pt(t){return t==="y"?"height":"width"}function Z(t){return["top","bottom"].includes(q(t))?"y":"x"}function Ct(t){return Rt(Z(t))}function Te(t,e,n){n===void 0&&(n=!1);const o=tt(t),i=Ct(t),r=Pt(i);let s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=ut(s)),[s,ut(s)]}function Le(t){const e=ut(t);return[vt(t),e,vt(e)]}function vt(t){return t.replace(/start|end/g,e=>Me[e])}function $e(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:s;default:return[]}}function ke(t,e,n,o){const i=tt(t);let r=$e(q(t),n==="start",o);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(vt)))),r}function ut(t){return t.replace(/left|right|bottom|top/g,e=>De[e])}function Fe(t){return{top:0,right:0,bottom:0,left:0,...t}}function Zt(t){return typeof t!="number"?Fe(t):{top:t,right:t,bottom:t,left:t}}function dt(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Bt(t,e,n){let{reference:o,floating:i}=t;const r=Z(e),s=Ct(e),c=Pt(s),a=q(e),l=r==="y",f=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,p=o[c]/2-i[c]/2;let d;switch(a){case"top":d={x:f,y:o.y-i.height};break;case"bottom":d={x:f,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:u};break;case"left":d={x:o.x-i.width,y:u};break;default:d={x:o.x,y:o.y}}switch(tt(e)){case"start":d[s]-=p*(n&&l?-1:1);break;case"end":d[s]+=p*(n&&l?-1:1);break}return d}const Ne=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,c=r.filter(Boolean),a=await(s.isRTL==null?void 0:s.isRTL(e));let l=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:u}=Bt(l,o,a),p=o,d={},m=0;for(let h=0;h<c.length;h++){const{name:w,fn:g}=c[h],{x,y:A,data:y,reset:v}=await g({x:f,y:u,initialPlacement:o,placement:p,strategy:i,middlewareData:d,rects:l,platform:s,elements:{reference:t,floating:e}});f=x??f,u=A??u,d={...d,[w]:{...d[w],...y}},v&&m<=50&&(m++,typeof v=="object"&&(v.placement&&(p=v.placement),v.rects&&(l=v.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:f,y:u}=Bt(l,p,a)),h=-1)}return{x:f,y:u,placement:p,strategy:i,middlewareData:d}};async function ot(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:r,rects:s,elements:c,strategy:a}=t,{boundary:l="clippingAncestors",rootBoundary:f="viewport",elementContext:u="floating",altBoundary:p=!1,padding:d=0}=X(e,t),m=Zt(d),w=c[p?u==="floating"?"reference":"floating":u],g=dt(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(w)))==null||n?w:w.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:l,rootBoundary:f,strategy:a})),x=u==="floating"?{x:o,y:i,width:s.floating.width,height:s.floating.height}:s.reference,A=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),y=await(r.isElement==null?void 0:r.isElement(A))?await(r.getScale==null?void 0:r.getScale(A))||{x:1,y:1}:{x:1,y:1},v=dt(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:A,strategy:a}):x);return{top:(g.top-v.top+m.top)/y.y,bottom:(v.bottom-g.bottom+m.bottom)/y.y,left:(g.left-v.left+m.left)/y.x,right:(v.right-g.right+m.right)/y.x}}const He=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:r,platform:s,elements:c,middlewareData:a}=e,{element:l,padding:f=0}=X(t,e)||{};if(l==null)return{};const u=Zt(f),p={x:n,y:o},d=Ct(i),m=Pt(d),h=await s.getDimensions(l),w=d==="y",g=w?"top":"left",x=w?"bottom":"right",A=w?"clientHeight":"clientWidth",y=r.reference[m]+r.reference[d]-p[d]-r.floating[m],v=p[d]-r.reference[d],R=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l));let C=R?R[A]:0;(!C||!await(s.isElement==null?void 0:s.isElement(R)))&&(C=c.floating[A]||r.floating[m]);const M=y/2-v/2,F=C/2-h[m]/2-1,T=U(u[g],F),$=U(u[x],F),k=T,E=C-h[m]-$,O=C/2-h[m]/2+M,W=yt(k,O,E),S=!a.arrow&&tt(i)!=null&&O!==W&&r.reference[m]/2-(O<k?T:$)-h[m]/2<0,D=S?O<k?O-k:O-E:0;return{[d]:p[d]+D,data:{[d]:W,centerOffset:O-W-D,...S&&{alignmentOffset:D}},reset:S}}}),We=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:a,elements:l}=e,{mainAxis:f=!0,crossAxis:u=!0,fallbackPlacements:p,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:h=!0,...w}=X(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const g=q(i),x=Z(c),A=q(c)===c,y=await(a.isRTL==null?void 0:a.isRTL(l.floating)),v=p||(A||!h?[ut(c)]:Le(c)),R=m!=="none";!p&&R&&v.push(...ke(c,h,m,y));const C=[c,...v],M=await ot(e,w),F=[];let T=((o=r.flip)==null?void 0:o.overflows)||[];if(f&&F.push(M[g]),u){const O=Te(i,s,y);F.push(M[O[0]],M[O[1]])}if(T=[...T,{placement:i,overflows:F}],!F.every(O=>O<=0)){var $,k;const O=((($=r.flip)==null?void 0:$.index)||0)+1,W=C[O];if(W)return{data:{index:O,overflows:T},reset:{placement:W}};let S=(k=T.filter(D=>D.overflows[0]<=0).sort((D,b)=>D.overflows[1]-b.overflows[1])[0])==null?void 0:k.placement;if(!S)switch(d){case"bestFit":{var E;const D=(E=T.filter(b=>{if(R){const L=Z(b.placement);return L===x||L==="y"}return!0}).map(b=>[b.placement,b.overflows.filter(L=>L>0).reduce((L,j)=>L+j,0)]).sort((b,L)=>b[1]-L[1])[0])==null?void 0:E[0];D&&(S=D);break}case"initialPlacement":S=c;break}if(i!==S)return{reset:{placement:S}}}return{}}}};function jt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Vt(t){return Se.some(e=>t[e]>=0)}const _e=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:o="referenceHidden",...i}=X(t,e);switch(o){case"referenceHidden":{const r=await ot(e,{...i,elementContext:"reference"}),s=jt(r,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:Vt(s)}}}case"escaped":{const r=await ot(e,{...i,altBoundary:!0}),s=jt(r,n.floating);return{data:{escapedOffsets:s,escaped:Vt(s)}}}default:return{}}}}};async function Be(t,e){const{placement:n,platform:o,elements:i}=t,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=q(n),c=tt(n),a=Z(n)==="y",l=["left","top"].includes(s)?-1:1,f=r&&a?-1:1,u=X(e,t);let{mainAxis:p,crossAxis:d,alignmentAxis:m}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof m=="number"&&(d=c==="end"?m*-1:m),a?{x:d*f,y:p*l}:{x:p*l,y:d*f}}const je=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:s,middlewareData:c}=e,a=await Be(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+a.x,y:r+a.y,data:{...a,placement:s}}}}},Ve=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:w=>{let{x:g,y:x}=w;return{x:g,y:x}}},...a}=X(t,e),l={x:n,y:o},f=await ot(e,a),u=Z(q(i)),p=Rt(u);let d=l[p],m=l[u];if(r){const w=p==="y"?"top":"left",g=p==="y"?"bottom":"right",x=d+f[w],A=d-f[g];d=yt(x,d,A)}if(s){const w=u==="y"?"top":"left",g=u==="y"?"bottom":"right",x=m+f[w],A=m-f[g];m=yt(x,m,A)}const h=c.fn({...e,[p]:d,[u]:m});return{...h,data:{x:h.x-n,y:h.y-o,enabled:{[p]:r,[u]:s}}}}}},ze=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:i,rects:r,middlewareData:s}=e,{offset:c=0,mainAxis:a=!0,crossAxis:l=!0}=X(t,e),f={x:n,y:o},u=Z(i),p=Rt(u);let d=f[p],m=f[u];const h=X(c,e),w=typeof h=="number"?{mainAxis:h,crossAxis:0}:{mainAxis:0,crossAxis:0,...h};if(a){const A=p==="y"?"height":"width",y=r.reference[p]-r.floating[A]+w.mainAxis,v=r.reference[p]+r.reference[A]-w.mainAxis;d<y?d=y:d>v&&(d=v)}if(l){var g,x;const A=p==="y"?"width":"height",y=["top","left"].includes(q(i)),v=r.reference[u]-r.floating[A]+(y&&((g=s.offset)==null?void 0:g[u])||0)+(y?0:w.crossAxis),R=r.reference[u]+r.reference[A]+(y?0:((x=s.offset)==null?void 0:x[u])||0)-(y?w.crossAxis:0);m<v?m=v:m>R&&(m=R)}return{[p]:d,[u]:m}}}},Ie=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:i,rects:r,platform:s,elements:c}=e,{apply:a=()=>{},...l}=X(t,e),f=await ot(e,l),u=q(i),p=tt(i),d=Z(i)==="y",{width:m,height:h}=r.floating;let w,g;u==="top"||u==="bottom"?(w=u,g=p===(await(s.isRTL==null?void 0:s.isRTL(c.floating))?"start":"end")?"left":"right"):(g=u,w=p==="end"?"top":"bottom");const x=h-f.top-f.bottom,A=m-f.left-f.right,y=U(h-f[w],x),v=U(m-f[g],A),R=!e.middlewareData.shift;let C=y,M=v;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(M=A),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(C=x),R&&!p){const T=N(f.left,0),$=N(f.right,0),k=N(f.top,0),E=N(f.bottom,0);d?M=m-2*(T!==0||$!==0?T+$:N(f.left,f.right)):C=h-2*(k!==0||E!==0?k+E:N(f.top,f.bottom))}await a({...e,availableWidth:M,availableHeight:C});const F=await s.getDimensions(c.floating);return m!==F.width||h!==F.height?{reset:{rects:!0}}:{}}}};function pt(){return typeof window<"u"}function et(t){return Kt(t)?(t.nodeName||"").toLowerCase():"#document"}function H(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function I(t){var e;return(e=(Kt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Kt(t){return pt()?t instanceof Node||t instanceof H(t).Node:!1}function _(t){return pt()?t instanceof Element||t instanceof H(t).Element:!1}function z(t){return pt()?t instanceof HTMLElement||t instanceof H(t).HTMLElement:!1}function zt(t){return!pt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof H(t).ShadowRoot}function rt(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=B(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function Ye(t){return["table","td","th"].includes(et(t))}function ht(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function Ot(t){const e=Et(),n=_(t)?B(t):t;return["transform","translate","scale","rotate","perspective"].some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function Xe(t){let e=K(t);for(;z(e)&&!Q(e);){if(Ot(e))return e;if(ht(e))return null;e=K(e)}return null}function Et(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Q(t){return["html","body","#document"].includes(et(t))}function B(t){return H(t).getComputedStyle(t)}function gt(t){return _(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function K(t){if(et(t)==="html")return t;const e=t.assignedSlot||t.parentNode||zt(t)&&t.host||I(t);return zt(e)?e.host:e}function Gt(t){const e=K(t);return Q(e)?t.ownerDocument?t.ownerDocument.body:t.body:z(e)&&rt(e)?e:Gt(e)}function it(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Gt(t),r=i===((o=t.ownerDocument)==null?void 0:o.body),s=H(i);if(r){const c=At(s);return e.concat(s,s.visualViewport||[],rt(i)?i:[],c&&n?it(c):[])}return e.concat(i,it(i,[],n))}function At(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Jt(t){const e=B(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=z(t),r=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=ft(n)!==r||ft(o)!==s;return c&&(n=r,o=s),{width:n,height:o,$:c}}function St(t){return _(t)?t:t.contextElement}function J(t){const e=St(t);if(!z(e))return V(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Jt(e);let s=(r?ft(n.width):n.width)/o,c=(r?ft(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const qe=V(0);function Qt(t){const e=H(t);return!Et()||!e.visualViewport?qe:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Ue(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==H(t)?!1:e}function G(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),r=St(t);let s=V(1);e&&(o?_(o)&&(s=J(o)):s=J(t));const c=Ue(r,n,o)?Qt(r):V(0);let a=(i.left+c.x)/s.x,l=(i.top+c.y)/s.y,f=i.width/s.x,u=i.height/s.y;if(r){const p=H(r),d=o&&_(o)?H(o):o;let m=p,h=At(m);for(;h&&o&&d!==m;){const w=J(h),g=h.getBoundingClientRect(),x=B(h),A=g.left+(h.clientLeft+parseFloat(x.paddingLeft))*w.x,y=g.top+(h.clientTop+parseFloat(x.paddingTop))*w.y;a*=w.x,l*=w.y,f*=w.x,u*=w.y,a+=A,l+=y,m=H(h),h=At(m)}}return dt({width:f,height:u,x:a,y:l})}function Dt(t,e){const n=gt(t).scrollLeft;return e?e.left+n:G(I(t)).left+n}function te(t,e,n){n===void 0&&(n=!1);const o=t.getBoundingClientRect(),i=o.left+e.scrollLeft-(n?0:Dt(t,o)),r=o.top+e.scrollTop;return{x:i,y:r}}function Ze(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r=i==="fixed",s=I(o),c=e?ht(e.floating):!1;if(o===s||c&&r)return n;let a={scrollLeft:0,scrollTop:0},l=V(1);const f=V(0),u=z(o);if((u||!u&&!r)&&((et(o)!=="body"||rt(s))&&(a=gt(o)),z(o))){const d=G(o);l=J(o),f.x=d.x+o.clientLeft,f.y=d.y+o.clientTop}const p=s&&!u&&!r?te(s,a,!0):V(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-a.scrollLeft*l.x+f.x+p.x,y:n.y*l.y-a.scrollTop*l.y+f.y+p.y}}function Ke(t){return Array.from(t.getClientRects())}function Ge(t){const e=I(t),n=gt(t),o=t.ownerDocument.body,i=N(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=N(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Dt(t);const c=-n.scrollTop;return B(o).direction==="rtl"&&(s+=N(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:s,y:c}}function Je(t,e){const n=H(t),o=I(t),i=n.visualViewport;let r=o.clientWidth,s=o.clientHeight,c=0,a=0;if(i){r=i.width,s=i.height;const l=Et();(!l||l&&e==="fixed")&&(c=i.offsetLeft,a=i.offsetTop)}return{width:r,height:s,x:c,y:a}}function Qe(t,e){const n=G(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=z(t)?J(t):V(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,a=i*r.x,l=o*r.y;return{width:s,height:c,x:a,y:l}}function It(t,e,n){let o;if(e==="viewport")o=Je(t,n);else if(e==="document")o=Ge(I(t));else if(_(e))o=Qe(e,n);else{const i=Qt(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return dt(o)}function ee(t,e){const n=K(t);return n===e||!_(n)||Q(n)?!1:B(n).position==="fixed"||ee(n,e)}function tn(t,e){const n=e.get(t);if(n)return n;let o=it(t,[],!1).filter(c=>_(c)&&et(c)!=="body"),i=null;const r=B(t).position==="fixed";let s=r?K(t):t;for(;_(s)&&!Q(s);){const c=B(s),a=Ot(s);!a&&c.position==="fixed"&&(i=null),(r?!a&&!i:!a&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||rt(s)&&!a&&ee(t,s))?o=o.filter(f=>f!==s):i=c,s=K(s)}return e.set(t,o),o}function en(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=[...n==="clippingAncestors"?ht(e)?[]:tn(e,this._c):[].concat(n),o],c=s[0],a=s.reduce((l,f)=>{const u=It(e,f,i);return l.top=N(u.top,l.top),l.right=U(u.right,l.right),l.bottom=U(u.bottom,l.bottom),l.left=N(u.left,l.left),l},It(e,c,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function nn(t){const{width:e,height:n}=Jt(t);return{width:e,height:n}}function on(t,e,n){const o=z(e),i=I(e),r=n==="fixed",s=G(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const a=V(0);if(o||!o&&!r)if((et(e)!=="body"||rt(i))&&(c=gt(e)),o){const p=G(e,!0,r,e);a.x=p.x+e.clientLeft,a.y=p.y+e.clientTop}else i&&(a.x=Dt(i));const l=i&&!o&&!r?te(i,c):V(0),f=s.left+c.scrollLeft-a.x-l.x,u=s.top+c.scrollTop-a.y-l.y;return{x:f,y:u,width:s.width,height:s.height}}function wt(t){return B(t).position==="static"}function Yt(t,e){if(!z(t)||B(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return I(t)===n&&(n=n.ownerDocument.body),n}function ne(t,e){const n=H(t);if(ht(t))return n;if(!z(t)){let i=K(t);for(;i&&!Q(i);){if(_(i)&&!wt(i))return i;i=K(i)}return n}let o=Yt(t,e);for(;o&&Ye(o)&&wt(o);)o=Yt(o,e);return o&&Q(o)&&wt(o)&&!Ot(o)?n:o||Xe(t)||n}const rn=async function(t){const e=this.getOffsetParent||ne,n=this.getDimensions,o=await n(t.floating);return{reference:on(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function sn(t){return B(t).direction==="rtl"}const cn={convertOffsetParentRelativeRectToViewportRelativeRect:Ze,getDocumentElement:I,getClippingRect:en,getOffsetParent:ne,getElementRects:rn,getClientRects:Ke,getDimensions:nn,getScale:J,isElement:_,isRTL:sn};function oe(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function ln(t,e){let n=null,o;const i=I(t);function r(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function s(c,a){c===void 0&&(c=!1),a===void 0&&(a=1),r();const l=t.getBoundingClientRect(),{left:f,top:u,width:p,height:d}=l;if(c||e(),!p||!d)return;const m=lt(u),h=lt(i.clientWidth-(f+p)),w=lt(i.clientHeight-(u+d)),g=lt(f),A={rootMargin:-m+"px "+-h+"px "+-w+"px "+-g+"px",threshold:N(0,U(1,a))||1};let y=!0;function v(R){const C=R[0].intersectionRatio;if(C!==a){if(!y)return s();C?s(!1,C):o=setTimeout(()=>{s(!1,1e-7)},1e3)}C===1&&!oe(l,t.getBoundingClientRect())&&s(),y=!1}try{n=new IntersectionObserver(v,{...A,root:i.ownerDocument})}catch{n=new IntersectionObserver(v,A)}n.observe(t)}return s(!0),r}function an(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=!1}=o,l=St(t),f=i||r?[...l?it(l):[],...it(e)]:[];f.forEach(g=>{i&&g.addEventListener("scroll",n,{passive:!0}),r&&g.addEventListener("resize",n)});const u=l&&c?ln(l,n):null;let p=-1,d=null;s&&(d=new ResizeObserver(g=>{let[x]=g;x&&x.target===l&&d&&(d.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var A;(A=d)==null||A.observe(e)})),n()}),l&&!a&&d.observe(l),d.observe(e));let m,h=a?G(t):null;a&&w();function w(){const g=G(t);h&&!oe(h,g)&&n(),h=g,m=requestAnimationFrame(w)}return n(),()=>{var g;f.forEach(x=>{i&&x.removeEventListener("scroll",n),r&&x.removeEventListener("resize",n)}),u==null||u(),(g=d)==null||g.disconnect(),d=null,a&&cancelAnimationFrame(m)}}const fn=je,un=Ve,dn=We,mn=Ie,pn=_e,Xt=He,hn=ze,gn=(t,e,n)=>{const o=new Map,i={platform:cn,...n},r={...i.platform,_c:o};return Ne(t,e,{...i,platform:r})};var at=typeof document<"u"?P.useLayoutEffect:P.useEffect;function mt(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="function"&&t.toString()===e.toString())return!0;let n,o,i;if(t&&e&&typeof t=="object"){if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(o=n;o--!==0;)if(!mt(t[o],e[o]))return!1;return!0}if(i=Object.keys(t),n=i.length,n!==Object.keys(e).length)return!1;for(o=n;o--!==0;)if(!{}.hasOwnProperty.call(e,i[o]))return!1;for(o=n;o--!==0;){const r=i[o];if(!(r==="_owner"&&t.$$typeof)&&!mt(t[r],e[r]))return!1}return!0}return t!==t&&e!==e}function ie(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function qt(t,e){const n=ie(t);return Math.round(e*n)/n}function xt(t){const e=P.useRef(t);return at(()=>{e.current=t}),e}function wn(t){t===void 0&&(t={});const{placement:e="bottom",strategy:n="absolute",middleware:o=[],platform:i,elements:{reference:r,floating:s}={},transform:c=!0,whileElementsMounted:a,open:l}=t,[f,u]=P.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[p,d]=P.useState(o);mt(p,o)||d(o);const[m,h]=P.useState(null),[w,g]=P.useState(null),x=P.useCallback(b=>{b!==R.current&&(R.current=b,h(b))},[]),A=P.useCallback(b=>{b!==C.current&&(C.current=b,g(b))},[]),y=r||m,v=s||w,R=P.useRef(null),C=P.useRef(null),M=P.useRef(f),F=a!=null,T=xt(a),$=xt(i),k=xt(l),E=P.useCallback(()=>{if(!R.current||!C.current)return;const b={placement:e,strategy:n,middleware:p};$.current&&(b.platform=$.current),gn(R.current,C.current,b).then(L=>{const j={...L,isPositioned:k.current!==!1};O.current&&!mt(M.current,j)&&(M.current=j,Pe.flushSync(()=>{u(j)}))})},[p,e,n,$,k]);at(()=>{l===!1&&M.current.isPositioned&&(M.current.isPositioned=!1,u(b=>({...b,isPositioned:!1})))},[l]);const O=P.useRef(!1);at(()=>(O.current=!0,()=>{O.current=!1}),[]),at(()=>{if(y&&(R.current=y),v&&(C.current=v),y&&v){if(T.current)return T.current(y,v,E);E()}},[y,v,E,T,F]);const W=P.useMemo(()=>({reference:R,floating:C,setReference:x,setFloating:A}),[x,A]),S=P.useMemo(()=>({reference:y,floating:v}),[y,v]),D=P.useMemo(()=>{const b={position:n,left:0,top:0};if(!S.floating)return b;const L=qt(S.floating,f.x),j=qt(S.floating,f.y);return c?{...b,transform:"translate("+L+"px, "+j+"px)",...ie(S.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:L,top:j}},[n,c,S.floating,f.x,f.y]);return P.useMemo(()=>({...f,update:E,refs:W,elements:S,floatingStyles:D}),[f,E,W,S,D])}const xn=t=>{function e(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:t,fn(n){const{element:o,padding:i}=typeof t=="function"?t(n):t;return o&&e(o)?o.current!=null?Xt({element:o.current,padding:i}).fn(n):{}:o?Xt({element:o,padding:i}).fn(n):{}}}},yn=(t,e)=>({...fn(t),options:[t,e]}),vn=(t,e)=>({...un(t),options:[t,e]}),An=(t,e)=>({...hn(t),options:[t,e]}),bn=(t,e)=>({...dn(t),options:[t,e]}),Rn=(t,e)=>({...mn(t),options:[t,e]}),Pn=(t,e)=>({...pn(t),options:[t,e]}),Cn=(t,e)=>({...xn(t),options:[t,e]});var On="Arrow",re=P.forwardRef((t,e)=>{const{children:n,width:o=10,height:i=5,...r}=t;return Y.jsx(bt.svg,{...r,ref:e,width:o,height:i,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:t.asChild?n:Y.jsx("polygon",{points:"0,0 30,0 15,10"})})});re.displayName=On;var En=re,Mt="Popper",[se,_n]=Ce(Mt),[Sn,ce]=se(Mt),le=t=>{const{__scopePopper:e,children:n}=t,[o,i]=P.useState(null);return Y.jsx(Sn,{scope:e,anchor:o,onAnchorChange:i,children:n})};le.displayName=Mt;var ae="PopperAnchor",fe=P.forwardRef((t,e)=>{const{__scopePopper:n,virtualRef:o,...i}=t,r=ce(ae,n),s=P.useRef(null),c=Ut(e,s);return P.useEffect(()=>{r.onAnchorChange((o==null?void 0:o.current)||s.current)}),o?null:Y.jsx(bt.div,{...i,ref:c})});fe.displayName=ae;var Tt="PopperContent",[Dn,Mn]=se(Tt),ue=P.forwardRef((t,e)=>{var Lt,$t,kt,Ft,Nt,Ht;const{__scopePopper:n,side:o="bottom",sideOffset:i=0,align:r="center",alignOffset:s=0,arrowPadding:c=0,avoidCollisions:a=!0,collisionBoundary:l=[],collisionPadding:f=0,sticky:u="partial",hideWhenDetached:p=!1,updatePositionStrategy:d="optimized",onPlaced:m,...h}=t,w=ce(Tt,n),[g,x]=P.useState(null),A=Ut(e,nt=>x(nt)),[y,v]=P.useState(null),R=Ee(y),C=(R==null?void 0:R.width)??0,M=(R==null?void 0:R.height)??0,F=o+(r!=="center"?"-"+r:""),T=typeof f=="number"?f:{top:0,right:0,bottom:0,left:0,...f},$=Array.isArray(l)?l:[l],k=$.length>0,E={padding:T,boundary:$.filter(Ln),altBoundary:k},{refs:O,floatingStyles:W,placement:S,isPositioned:D,middlewareData:b}=wn({strategy:"fixed",placement:F,whileElementsMounted:(...nt)=>an(...nt,{animationFrame:d==="always"}),elements:{reference:w.anchor},middleware:[yn({mainAxis:i+M,alignmentAxis:s}),a&&vn({mainAxis:!0,crossAxis:!1,limiter:u==="partial"?An():void 0,...E}),a&&bn({...E}),Rn({...E,apply:({elements:nt,rects:Wt,availableWidth:ve,availableHeight:Ae})=>{const{width:be,height:Re}=Wt.reference,ct=nt.floating.style;ct.setProperty("--radix-popper-available-width",`${ve}px`),ct.setProperty("--radix-popper-available-height",`${Ae}px`),ct.setProperty("--radix-popper-anchor-width",`${be}px`),ct.setProperty("--radix-popper-anchor-height",`${Re}px`)}}),y&&Cn({element:y,padding:c}),$n({arrowWidth:C,arrowHeight:M}),p&&Pn({strategy:"referenceHidden",...E})]}),[L,j]=pe(S),st=Oe(m);_t(()=>{D&&(st==null||st())},[D,st]);const he=(Lt=b.arrow)==null?void 0:Lt.x,ge=($t=b.arrow)==null?void 0:$t.y,we=((kt=b.arrow)==null?void 0:kt.centerOffset)!==0,[xe,ye]=P.useState();return _t(()=>{g&&ye(window.getComputedStyle(g).zIndex)},[g]),Y.jsx("div",{ref:O.setFloating,"data-radix-popper-content-wrapper":"",style:{...W,transform:D?W.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:xe,"--radix-popper-transform-origin":[(Ft=b.transformOrigin)==null?void 0:Ft.x,(Nt=b.transformOrigin)==null?void 0:Nt.y].join(" "),...((Ht=b.hide)==null?void 0:Ht.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:t.dir,children:Y.jsx(Dn,{scope:n,placedSide:L,onArrowChange:v,arrowX:he,arrowY:ge,shouldHideArrow:we,children:Y.jsx(bt.div,{"data-side":L,"data-align":j,...h,ref:A,style:{...h.style,animation:D?void 0:"none"}})})})});ue.displayName=Tt;var de="PopperArrow",Tn={top:"bottom",right:"left",bottom:"top",left:"right"},me=P.forwardRef(function(e,n){const{__scopePopper:o,...i}=e,r=Mn(de,o),s=Tn[r.placedSide];return Y.jsx("span",{ref:r.onArrowChange,style:{position:"absolute",left:r.arrowX,top:r.arrowY,[s]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[r.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[r.placedSide],visibility:r.shouldHideArrow?"hidden":void 0},children:Y.jsx(En,{...i,ref:n,style:{...i.style,display:"block"}})})});me.displayName=de;function Ln(t){return t!==null}var $n=t=>({name:"transformOrigin",options:t,fn(e){var w,g,x;const{placement:n,rects:o,middlewareData:i}=e,s=((w=i.arrow)==null?void 0:w.centerOffset)!==0,c=s?0:t.arrowWidth,a=s?0:t.arrowHeight,[l,f]=pe(n),u={start:"0%",center:"50%",end:"100%"}[f],p=(((g=i.arrow)==null?void 0:g.x)??0)+c/2,d=(((x=i.arrow)==null?void 0:x.y)??0)+a/2;let m="",h="";return l==="bottom"?(m=s?u:`${p}px`,h=`${-a}px`):l==="top"?(m=s?u:`${p}px`,h=`${o.floating.height+a}px`):l==="right"?(m=`${-a}px`,h=s?u:`${d}px`):l==="left"&&(m=`${o.floating.width+a}px`,h=s?u:`${d}px`),{data:{x:m,y:h}}}});function pe(t){const[e,n="center"]=t.split("-");return[e,n]}var Bn=le,jn=fe,Vn=ue,zn=me;function In(t,[e,n]){return Math.min(n,Math.max(e,t))}export{jn as A,Vn as C,Bn as R,zn as a,In as b,_n as c};
