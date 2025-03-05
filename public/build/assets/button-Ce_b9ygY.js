import{r as h,j as V}from"./app-FXJ6jLQe.js";import{r as ze}from"./index-Bhapx3qy.js";function ue(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function he(...e){return o=>{let r=!1;const t=e.map(n=>{const s=ue(n,o);return!r&&typeof s=="function"&&(r=!0),s});if(r)return()=>{for(let n=0;n<t.length;n++){const s=t[n];typeof s=="function"?s():ue(e[n],null)}}}}function Cr(...e){return h.useCallback(he(...e),e)}var te=h.forwardRef((e,o)=>{const{children:r,...t}=e,n=h.Children.toArray(r),s=n.find(Me);if(s){const a=s.props.children,p=n.map(d=>d===s?h.Children.count(a)>1?h.Children.only(null):h.isValidElement(a)?a.props.children:null:d);return V.jsx(Z,{...t,ref:o,children:h.isValidElement(a)?h.cloneElement(a,void 0,p):null})}return V.jsx(Z,{...t,ref:o,children:r})});te.displayName="Slot";var Z=h.forwardRef((e,o)=>{const{children:r,...t}=e;if(h.isValidElement(r)){const n=Ne(r),s=Ie(t,r.props);return r.type!==h.Fragment&&(s.ref=o?he(o,n):n),h.cloneElement(r,s)}return h.Children.count(r)>1?h.Children.only(null):null});Z.displayName="SlotClone";var Pe=({children:e})=>V.jsx(V.Fragment,{children:e});function Me(e){return h.isValidElement(e)&&e.type===Pe}function Ie(e,o){const r={...o};for(const t in o){const n=e[t],s=o[t];/^on[A-Z]/.test(t)?n&&s?r[t]=(...p)=>{s(...p),n(...p)}:n&&(r[t]=n):t==="style"?r[t]={...n,...s}:t==="className"&&(r[t]=[n,s].filter(Boolean).join(" "))}return{...e,...r}}function Ne(e){var t,n;let o=(t=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:t.get,r=o&&"isReactWarning"in o&&o.isReactWarning;return r?e.ref:(o=(n=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:n.get,r=o&&"isReactWarning"in o&&o.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var Te=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],zr=Te.reduce((e,o)=>{const r=h.forwardRef((t,n)=>{const{asChild:s,...a}=t,p=s?te:o;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),V.jsx(p,{...a,ref:n})});return r.displayName=`Primitive.${o}`,{...e,[o]:r}},{});function Pr(e,o){e&&ze.flushSync(()=>e.dispatchEvent(o))}function ve(e){var o,r,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(o=0;o<n;o++)e[o]&&(r=ve(e[o]))&&(t&&(t+=" "),t+=r)}else for(r in e)e[r]&&(t&&(t+=" "),t+=r);return t}function ye(){for(var e,o,r=0,t="",n=arguments.length;r<n;r++)(e=arguments[r])&&(o=ve(e))&&(t&&(t+=" "),t+=o);return t}const oe="-",_e=e=>{const o=Ge(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:a=>{const p=a.split(oe);return p[0]===""&&p.length!==1&&p.shift(),xe(p,o)||Le(a)},getConflictingClassGroupIds:(a,p)=>{const d=r[a]||[];return p&&t[a]?[...d,...t[a]]:d}}},xe=(e,o)=>{var a;if(e.length===0)return o.classGroupId;const r=e[0],t=o.nextPart.get(r),n=t?xe(e.slice(1),t):void 0;if(n)return n;if(o.validators.length===0)return;const s=e.join(oe);return(a=o.validators.find(({validator:p})=>p(s)))==null?void 0:a.classGroupId},pe=/^\[(.+)\]$/,Le=e=>{if(pe.test(e)){const o=pe.exec(e)[1],r=o==null?void 0:o.substring(0,o.indexOf(":"));if(r)return"arbitrary.."+r}},Ge=e=>{const{theme:o,classGroups:r}=e,t={nextPart:new Map,validators:[]};for(const n in r)Q(r[n],t,n,o);return t},Q=(e,o,r,t)=>{e.forEach(n=>{if(typeof n=="string"){const s=n===""?o:fe(o,n);s.classGroupId=r;return}if(typeof n=="function"){if(Ve(n)){Q(n(t),o,r,t);return}o.validators.push({validator:n,classGroupId:r});return}Object.entries(n).forEach(([s,a])=>{Q(a,fe(o,s),r,t)})})},fe=(e,o)=>{let r=e;return o.split(oe).forEach(t=>{r.nextPart.has(t)||r.nextPart.set(t,{nextPart:new Map,validators:[]}),r=r.nextPart.get(t)}),r},Ve=e=>e.isThemeGetter,je=e=>{if(e<1)return{get:()=>{},set:()=>{}};let o=0,r=new Map,t=new Map;const n=(s,a)=>{r.set(s,a),o++,o>e&&(o=0,t=r,r=new Map)};return{get(s){let a=r.get(s);if(a!==void 0)return a;if((a=t.get(s))!==void 0)return n(s,a),a},set(s,a){r.has(s)?r.set(s,a):n(s,a)}}},ee="!",re=":",De=re.length,Oe=e=>{const{prefix:o,experimentalParseClassName:r}=e;let t=n=>{const s=[];let a=0,p=0,d=0,f;for(let x=0;x<n.length;x++){let w=n[x];if(a===0&&p===0){if(w===re){s.push(n.slice(d,x)),d=x+De;continue}if(w==="/"){f=x;continue}}w==="["?a++:w==="]"?a--:w==="("?p++:w===")"&&p--}const m=s.length===0?n:n.substring(d),y=We(m),k=y!==m,z=f&&f>d?f-d:void 0;return{modifiers:s,hasImportantModifier:k,baseClassName:y,maybePostfixModifierPosition:z}};if(o){const n=o+re,s=t;t=a=>a.startsWith(n)?s(a.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:a,maybePostfixModifierPosition:void 0}}if(r){const n=t;t=s=>r({className:s,parseClassName:n})}return t},We=e=>e.endsWith(ee)?e.substring(0,e.length-1):e.startsWith(ee)?e.substring(1):e,$e=e=>{const o=Object.fromEntries(e.orderSensitiveModifiers.map(t=>[t,!0]));return t=>{if(t.length<=1)return t;const n=[];let s=[];return t.forEach(a=>{a[0]==="["||o[a]?(n.push(...s.sort(),a),s=[]):s.push(a)}),n.push(...s.sort()),n}},Be=e=>({cache:je(e.cacheSize),parseClassName:Oe(e),sortModifiers:$e(e),..._e(e)}),Fe=/\s+/,Ue=(e,o)=>{const{parseClassName:r,getClassGroupId:t,getConflictingClassGroupIds:n,sortModifiers:s}=o,a=[],p=e.trim().split(Fe);let d="";for(let f=p.length-1;f>=0;f-=1){const m=p[f],{isExternal:y,modifiers:k,hasImportantModifier:z,baseClassName:x,maybePostfixModifierPosition:w}=r(m);if(y){d=m+(d.length>0?" "+d:d);continue}let S=!!w,P=t(S?x.substring(0,w):x);if(!P){if(!S){d=m+(d.length>0?" "+d:d);continue}if(P=t(x),!P){d=m+(d.length>0?" "+d:d);continue}S=!1}const O=s(k).join(":"),W=z?O+ee:O,T=W+P;if(a.includes(T))continue;a.push(T);const _=n(P,S);for(let c=0;c<_.length;++c){const A=_[c];a.push(W+A)}d=m+(d.length>0?" "+d:d)}return d};function Ke(){let e=0,o,r,t="";for(;e<arguments.length;)(o=arguments[e++])&&(r=we(o))&&(t&&(t+=" "),t+=r);return t}const we=e=>{if(typeof e=="string")return e;let o,r="";for(let t=0;t<e.length;t++)e[t]&&(o=we(e[t]))&&(r&&(r+=" "),r+=o);return r};function Ye(e,...o){let r,t,n,s=a;function a(d){const f=o.reduce((m,y)=>y(m),e());return r=Be(f),t=r.cache.get,n=r.cache.set,s=p,p(d)}function p(d){const f=t(d);if(f)return f;const m=Ue(d,r);return n(d,m),m}return function(){return s(Ke.apply(null,arguments))}}const g=e=>{const o=r=>r[e]||[];return o.isThemeGetter=!0,o},Ee=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,ke=/^\((?:(\w[\w-]*):)?(.+)\)$/i,He=/^\d+\/\d+$/,qe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Je=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Xe=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Ze=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Qe=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,G=e=>He.test(e),u=e=>!!e&&!Number.isNaN(Number(e)),I=e=>!!e&&Number.isInteger(Number(e)),be=e=>e.endsWith("%")&&u(e.slice(0,-1)),C=e=>qe.test(e),er=()=>!0,rr=e=>Je.test(e)&&!Xe.test(e),ne=()=>!1,tr=e=>Ze.test(e),or=e=>Qe.test(e),nr=e=>!i(e)&&!l(e),sr=e=>j(e,Re,ne),i=e=>Ee.test(e),N=e=>j(e,Ce,rr),X=e=>j(e,gr,u),ir=e=>j(e,Ae,ne),lr=e=>j(e,Se,or),ar=e=>j(e,ne,tr),l=e=>ke.test(e),Y=e=>D(e,Ce),cr=e=>D(e,hr),dr=e=>D(e,Ae),ur=e=>D(e,Re),pr=e=>D(e,Se),fr=e=>D(e,vr,!0),j=(e,o,r)=>{const t=Ee.exec(e);return t?t[1]?o(t[1]):r(t[2]):!1},D=(e,o,r=!1)=>{const t=ke.exec(e);return t?t[1]?o(t[1]):r:!1},Ae=e=>e==="position",br=new Set(["image","url"]),Se=e=>br.has(e),mr=new Set(["length","size","percentage"]),Re=e=>mr.has(e),Ce=e=>e==="length",gr=e=>e==="number",hr=e=>e==="family-name",vr=e=>e==="shadow",yr=()=>{const e=g("color"),o=g("font"),r=g("text"),t=g("font-weight"),n=g("tracking"),s=g("leading"),a=g("breakpoint"),p=g("container"),d=g("spacing"),f=g("radius"),m=g("shadow"),y=g("inset-shadow"),k=g("drop-shadow"),z=g("blur"),x=g("perspective"),w=g("aspect"),S=g("ease"),P=g("animate"),O=()=>["auto","avoid","all","avoid-page","page","left","right","column"],W=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],T=()=>["auto","hidden","clip","visible","scroll"],_=()=>["auto","contain","none"],c=()=>[l,i,d],A=()=>[G,"full","auto",...c()],se=()=>[I,"none","subgrid",l,i],ie=()=>["auto",{span:["full",I,l,i]},l,i],$=()=>[I,"auto",l,i],le=()=>["auto","min","max","fr",l,i],H=()=>["start","end","center","between","around","evenly","stretch","baseline"],L=()=>["start","end","center","stretch"],R=()=>["auto",...c()],M=()=>[G,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...c()],b=()=>[e,l,i],q=()=>[be,N],v=()=>["","none","full",f,l,i],E=()=>["",u,Y,N],B=()=>["solid","dashed","dotted","double"],ae=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ce=()=>["","none",z,l,i],de=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l,i],F=()=>["none",u,l,i],U=()=>["none",u,l,i],J=()=>[u,l,i],K=()=>[G,"full",...c()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[C],breakpoint:[C],color:[er],container:[C],"drop-shadow":[C],ease:["in","out","in-out"],font:[nr],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[C],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[C],shadow:[C],spacing:["px",u],text:[C],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",G,i,l,w]}],container:["container"],columns:[{columns:[u,i,l,p]}],"break-after":[{"break-after":O()}],"break-before":[{"break-before":O()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...W(),i,l]}],overflow:[{overflow:T()}],"overflow-x":[{"overflow-x":T()}],"overflow-y":[{"overflow-y":T()}],overscroll:[{overscroll:_()}],"overscroll-x":[{"overscroll-x":_()}],"overscroll-y":[{"overscroll-y":_()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:A()}],"inset-x":[{"inset-x":A()}],"inset-y":[{"inset-y":A()}],start:[{start:A()}],end:[{end:A()}],top:[{top:A()}],right:[{right:A()}],bottom:[{bottom:A()}],left:[{left:A()}],visibility:["visible","invisible","collapse"],z:[{z:[I,"auto",l,i]}],basis:[{basis:[G,"full","auto",p,...c()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[u,G,"auto","initial","none",i]}],grow:[{grow:["",u,l,i]}],shrink:[{shrink:["",u,l,i]}],order:[{order:[I,"first","last","none",l,i]}],"grid-cols":[{"grid-cols":se()}],"col-start-end":[{col:ie()}],"col-start":[{"col-start":$()}],"col-end":[{"col-end":$()}],"grid-rows":[{"grid-rows":se()}],"row-start-end":[{row:ie()}],"row-start":[{"row-start":$()}],"row-end":[{"row-end":$()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":le()}],"auto-rows":[{"auto-rows":le()}],gap:[{gap:c()}],"gap-x":[{"gap-x":c()}],"gap-y":[{"gap-y":c()}],"justify-content":[{justify:[...H(),"normal"]}],"justify-items":[{"justify-items":[...L(),"normal"]}],"justify-self":[{"justify-self":["auto",...L()]}],"align-content":[{content:["normal",...H()]}],"align-items":[{items:[...L(),"baseline"]}],"align-self":[{self:["auto",...L(),"baseline"]}],"place-content":[{"place-content":H()}],"place-items":[{"place-items":[...L(),"baseline"]}],"place-self":[{"place-self":["auto",...L()]}],p:[{p:c()}],px:[{px:c()}],py:[{py:c()}],ps:[{ps:c()}],pe:[{pe:c()}],pt:[{pt:c()}],pr:[{pr:c()}],pb:[{pb:c()}],pl:[{pl:c()}],m:[{m:R()}],mx:[{mx:R()}],my:[{my:R()}],ms:[{ms:R()}],me:[{me:R()}],mt:[{mt:R()}],mr:[{mr:R()}],mb:[{mb:R()}],ml:[{ml:R()}],"space-x":[{"space-x":c()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":c()}],"space-y-reverse":["space-y-reverse"],size:[{size:M()}],w:[{w:[p,"screen",...M()]}],"min-w":[{"min-w":[p,"screen","none",...M()]}],"max-w":[{"max-w":[p,"screen","none","prose",{screen:[a]},...M()]}],h:[{h:["screen",...M()]}],"min-h":[{"min-h":["screen","none",...M()]}],"max-h":[{"max-h":["screen",...M()]}],"font-size":[{text:["base",r,Y,N]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[t,l,X]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",be,i]}],"font-family":[{font:[cr,i,o]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,l,i]}],"line-clamp":[{"line-clamp":[u,"none",l,X]}],leading:[{leading:[s,...c()]}],"list-image":[{"list-image":["none",l,i]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",l,i]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:b()}],"text-color":[{text:b()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...B(),"wavy"]}],"text-decoration-thickness":[{decoration:[u,"from-font","auto",l,N]}],"text-decoration-color":[{decoration:b()}],"underline-offset":[{"underline-offset":[u,"auto",l,i]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:c()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l,i]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l,i]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...W(),dr,ir]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",ur,sr]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},I,l,i],radial:["",l,i],conic:[I,l,i]},pr,lr]}],"bg-color":[{bg:b()}],"gradient-from-pos":[{from:q()}],"gradient-via-pos":[{via:q()}],"gradient-to-pos":[{to:q()}],"gradient-from":[{from:b()}],"gradient-via":[{via:b()}],"gradient-to":[{to:b()}],rounded:[{rounded:v()}],"rounded-s":[{"rounded-s":v()}],"rounded-e":[{"rounded-e":v()}],"rounded-t":[{"rounded-t":v()}],"rounded-r":[{"rounded-r":v()}],"rounded-b":[{"rounded-b":v()}],"rounded-l":[{"rounded-l":v()}],"rounded-ss":[{"rounded-ss":v()}],"rounded-se":[{"rounded-se":v()}],"rounded-ee":[{"rounded-ee":v()}],"rounded-es":[{"rounded-es":v()}],"rounded-tl":[{"rounded-tl":v()}],"rounded-tr":[{"rounded-tr":v()}],"rounded-br":[{"rounded-br":v()}],"rounded-bl":[{"rounded-bl":v()}],"border-w":[{border:E()}],"border-w-x":[{"border-x":E()}],"border-w-y":[{"border-y":E()}],"border-w-s":[{"border-s":E()}],"border-w-e":[{"border-e":E()}],"border-w-t":[{"border-t":E()}],"border-w-r":[{"border-r":E()}],"border-w-b":[{"border-b":E()}],"border-w-l":[{"border-l":E()}],"divide-x":[{"divide-x":E()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":E()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...B(),"hidden","none"]}],"divide-style":[{divide:[...B(),"hidden","none"]}],"border-color":[{border:b()}],"border-color-x":[{"border-x":b()}],"border-color-y":[{"border-y":b()}],"border-color-s":[{"border-s":b()}],"border-color-e":[{"border-e":b()}],"border-color-t":[{"border-t":b()}],"border-color-r":[{"border-r":b()}],"border-color-b":[{"border-b":b()}],"border-color-l":[{"border-l":b()}],"divide-color":[{divide:b()}],"outline-style":[{outline:[...B(),"none","hidden"]}],"outline-offset":[{"outline-offset":[u,l,i]}],"outline-w":[{outline:["",u,Y,N]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",m,fr,ar]}],"shadow-color":[{shadow:b()}],"inset-shadow":[{"inset-shadow":["none",l,i,y]}],"inset-shadow-color":[{"inset-shadow":b()}],"ring-w":[{ring:E()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:b()}],"ring-offset-w":[{"ring-offset":[u,N]}],"ring-offset-color":[{"ring-offset":b()}],"inset-ring-w":[{"inset-ring":E()}],"inset-ring-color":[{"inset-ring":b()}],opacity:[{opacity:[u,l,i]}],"mix-blend":[{"mix-blend":[...ae(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ae()}],filter:[{filter:["","none",l,i]}],blur:[{blur:ce()}],brightness:[{brightness:[u,l,i]}],contrast:[{contrast:[u,l,i]}],"drop-shadow":[{"drop-shadow":["","none",k,l,i]}],grayscale:[{grayscale:["",u,l,i]}],"hue-rotate":[{"hue-rotate":[u,l,i]}],invert:[{invert:["",u,l,i]}],saturate:[{saturate:[u,l,i]}],sepia:[{sepia:["",u,l,i]}],"backdrop-filter":[{"backdrop-filter":["","none",l,i]}],"backdrop-blur":[{"backdrop-blur":ce()}],"backdrop-brightness":[{"backdrop-brightness":[u,l,i]}],"backdrop-contrast":[{"backdrop-contrast":[u,l,i]}],"backdrop-grayscale":[{"backdrop-grayscale":["",u,l,i]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u,l,i]}],"backdrop-invert":[{"backdrop-invert":["",u,l,i]}],"backdrop-opacity":[{"backdrop-opacity":[u,l,i]}],"backdrop-saturate":[{"backdrop-saturate":[u,l,i]}],"backdrop-sepia":[{"backdrop-sepia":["",u,l,i]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":c()}],"border-spacing-x":[{"border-spacing-x":c()}],"border-spacing-y":[{"border-spacing-y":c()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",l,i]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[u,"initial",l,i]}],ease:[{ease:["linear","initial",S,l,i]}],delay:[{delay:[u,l,i]}],animate:[{animate:["none",P,l,i]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[x,l,i]}],"perspective-origin":[{"perspective-origin":de()}],rotate:[{rotate:F()}],"rotate-x":[{"rotate-x":F()}],"rotate-y":[{"rotate-y":F()}],"rotate-z":[{"rotate-z":F()}],scale:[{scale:U()}],"scale-x":[{"scale-x":U()}],"scale-y":[{"scale-y":U()}],"scale-z":[{"scale-z":U()}],"scale-3d":["scale-3d"],skew:[{skew:J()}],"skew-x":[{"skew-x":J()}],"skew-y":[{"skew-y":J()}],transform:[{transform:[l,i,"","none","gpu","cpu"]}],"transform-origin":[{origin:de()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:K()}],"translate-x":[{"translate-x":K()}],"translate-y":[{"translate-y":K()}],"translate-z":[{"translate-z":K()}],"translate-none":["translate-none"],accent:[{accent:b()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:b()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l,i]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":c()}],"scroll-mx":[{"scroll-mx":c()}],"scroll-my":[{"scroll-my":c()}],"scroll-ms":[{"scroll-ms":c()}],"scroll-me":[{"scroll-me":c()}],"scroll-mt":[{"scroll-mt":c()}],"scroll-mr":[{"scroll-mr":c()}],"scroll-mb":[{"scroll-mb":c()}],"scroll-ml":[{"scroll-ml":c()}],"scroll-p":[{"scroll-p":c()}],"scroll-px":[{"scroll-px":c()}],"scroll-py":[{"scroll-py":c()}],"scroll-ps":[{"scroll-ps":c()}],"scroll-pe":[{"scroll-pe":c()}],"scroll-pt":[{"scroll-pt":c()}],"scroll-pr":[{"scroll-pr":c()}],"scroll-pb":[{"scroll-pb":c()}],"scroll-pl":[{"scroll-pl":c()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l,i]}],fill:[{fill:["none",...b()]}],"stroke-w":[{stroke:[u,Y,N,X]}],stroke:[{stroke:["none",...b()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},xr=Ye(yr);function wr(...e){return xr(ye(e))}const Mr={background:"#09090b",color:"#ffffff",border:"#18181b"},Ir=(e,o=!1)=>{if(o)return"lifetime";if(e<60)return`${e} seconds`;const r=[{label:"year",value:60*60*24*365},{label:"month",value:60*60*24*30},{label:"week",value:60*60*24*7},{label:"day",value:60*60*24},{label:"hour",value:60*60},{label:"minute",value:60}];for(const{label:t,value:n}of r){const s=Math.floor(e/n);if(s>=1)return`${s} ${t}${s>1?"s":""}`}return e+" seconds"},Nr=[{label:"Hours",value:"hours"},{label:"Days",value:"days"},{label:"Weeks",value:"weeks"},{label:"Months",value:"months"},{label:"Years",value:"years"},{label:"Lifetime",value:"lifetime"}],Tr=(e=16)=>{const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()=+";return Array.from(crypto.getRandomValues(new Uint32Array(e)),t=>o[t%o.length]).join("")},_r=e=>e.replace(/_/g," "),Lr=["APPS_CREATE","APPS_READ","APPS_UPDATE","APPS_DELETE","KEYS_CREATE","KEYS_READ","KEYS_UPDATE","KEYS_DELETE","KEYS_RESET_HWID","KEYS_ADD_TIME","RESELLER_CREATE","RESELLER_READ","RESELLER_UPDATE","RESELLER_DELETE","RESELLER_ADD_BALANCE","MANAGER_CREATE","MANAGER_READ","MANAGER_UPDATE","MANAGER_DELETE"],me=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,ge=ye,Er=(e,o)=>r=>{var t;if((o==null?void 0:o.variants)==null)return ge(e,r==null?void 0:r.class,r==null?void 0:r.className);const{variants:n,defaultVariants:s}=o,a=Object.keys(n).map(f=>{const m=r==null?void 0:r[f],y=s==null?void 0:s[f];if(m===null)return null;const k=me(m)||me(y);return n[f][k]}),p=r&&Object.entries(r).reduce((f,m)=>{let[y,k]=m;return k===void 0||(f[y]=k),f},{}),d=o==null||(t=o.compoundVariants)===null||t===void 0?void 0:t.reduce((f,m)=>{let{class:y,className:k,...z}=m;return Object.entries(z).every(x=>{let[w,S]=x;return Array.isArray(S)?S.includes({...s,...p}[w]):{...s,...p}[w]===S})?[...f,y,k]:f},[]);return ge(e,a,d,r==null?void 0:r.class,r==null?void 0:r.className)},kr=Er("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),Ar=h.forwardRef(({className:e,variant:o,size:r,asChild:t=!1,...n},s)=>{const a=t?te:"button";return V.jsx(a,{className:wr(kr({variant:o,size:r,className:e})),ref:s,...n})});Ar.displayName="Button";export{Ar as B,zr as P,Pe as S,wr as a,Er as b,ye as c,Nr as d,Lr as e,Ir as f,Tr as g,te as h,kr as i,Pr as j,he as k,_r as p,Mr as t,Cr as u};
