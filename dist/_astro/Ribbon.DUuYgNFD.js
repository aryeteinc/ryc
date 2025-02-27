import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.ai7qpRr1.js";const x=({item:t,maxHeight:d,isMobile:n})=>{const i={height:`${n?64:80}px`,width:"auto",maxWidth:"100%",objectFit:"contain"};return t.type==="logo"?e.jsx("img",{src:t.content,alt:t.name,className:"object-contain grayscale hover:grayscale-0 transition-all duration-300",style:i}):e.jsx("span",{className:`${n?"text-xl":"text-lg"} font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300`,children:t.content})},y=({companies:t=[],speed:d=40,containerWidth:n="100%",spacing:m=32,itemHeight:i=80})=>{const[a,h]=r.useState(!1),[u,f]=r.useState(0),l=r.useRef(null),o=Array.isArray(t)?t:[];if(r.useEffect(()=>{const s=()=>{h(window.innerWidth<=768),l.current&&f(l.current.offsetWidth)};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),o.length===0)return e.jsx("div",{className:"w-full min-h-[120px] flex items-center justify-center",children:e.jsx("span",{className:"text-gray-500",children:"No hay compañías para mostrar"})});const p=a?Math.max(i,100):Math.max(i,120);return e.jsx("div",{className:"w-full bg-white",children:e.jsx("div",{className:"mx-auto",style:{maxWidth:n},children:e.jsxs("div",{ref:l,className:"relative overflow-hidden",style:{height:`${p}px`},children:[e.jsx("div",{className:"absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"}),e.jsx("div",{className:"absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"}),e.jsxs("div",{className:"absolute top-0 left-0 w-full h-full flex items-center",children:[e.jsx("style",{children:`
                @keyframes ticker {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }

                .ticker-container {
                  display: flex;
                  width: max-content;
                  animation: ticker ${d}s linear infinite;
                }

                .ticker-container:hover {
                  animation-play-state: paused;
                }

                .company-group {
                  display: flex;
                  align-items: center;
                  padding: 0 ${m/2}px;
                }
              `}),e.jsx("div",{className:"w-full overflow-hidden",children:e.jsxs("div",{className:"ticker-container",children:[e.jsx("div",{className:"company-group",children:o.map((s,c)=>e.jsx("div",{className:`flex items-center justify-center ${a?"px-4":"px-8"}`,children:e.jsx(x,{item:s,isMobile:a})},`g1-${c}`))}),e.jsx("div",{className:"company-group",children:o.map((s,c)=>e.jsx("div",{className:`flex items-center justify-center ${a?"px-4":"px-8"}`,children:e.jsx(x,{item:s,isMobile:a})},`g2-${c}`))})]})})]})]})})})};export{y as default};
