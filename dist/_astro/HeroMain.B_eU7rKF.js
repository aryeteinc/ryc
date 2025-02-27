import{j as e}from"./jsx-runtime.D_zvdyIk.js";import"./index.ai7qpRr1.js";import _ from"./FadeIn.W-YoPskr.js";import{c as k}from"./createLucideIcon.B8x4Svw_.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],v=k("ChevronDown",C),S=({children:s,variant:l="primary",size:t="md",className:m="",onClick:i,type:o="button",disabled:n=!1,rounded:u="full",backgroundColor:a,hoverColor:r,textColor:d,href:g,target:x,navigate:h})=>{const f="font-semibold transition-all duration-300",b=()=>{if(a||r){const w=a?.startsWith("bg-")?a:`bg-${a}-500`,$=r?.startsWith("hover:bg-")?r:`hover:bg-${r||a}-600`;return`${w} ${$} ${d||"text-white"}`}return{primary:"bg-gray-100 hover:bg-gray-200 text-gray-900",secondary:"bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600"}[l]},c={sm:"px-4 py-2 text-sm",md:"px-6 py-3 text-base",lg:"px-8 py-4 text-lg"},p={none:"rounded-none",sm:"rounded",md:"rounded-md",lg:"rounded-lg",full:"rounded-full"},y=N=>{n||(h&&h(),i&&i())},j={className:`
      ${f}
      ${b()}
      ${c[t]}
      ${p[u]}
      ${n?"opacity-50 cursor-not-allowed":"hover:scale-105"}
      ${m}
    `,onClick:y,disabled:n};return g?e.jsx("a",{href:g,target:x,rel:x==="_blank"?"noopener noreferrer":void 0,...j,children:s}):e.jsx("button",{type:o,...j,children:s})},D=({children:s,from:l="from-blue-500",to:t="to-indigo-500",direction:m="right",className:i="",animated:o=!1,animationDuration:n="normal"})=>{const u=()=>{switch(m){case"left":return"bg-gradient-to-l";case"top":return"bg-gradient-to-t";case"bottom":return"bg-gradient-to-b";case"diagonal":return"bg-gradient-to-br";default:return"bg-gradient-to-r"}},a=()=>{switch(n){case"slow":return"animate-[gradient_8s_ease_infinite]";case"fast":return"animate-[gradient_2s_ease_infinite]";default:return"animate-[gradient_4s_ease_infinite]"}},r=`
    ${u()}
    ${l}
    ${t}
    text-transparent
    bg-clip-text
    bg-size-200
    ${o?a():""}
    ${i}
  `.trim(),d=o?{backgroundSize:"200% 200%"}:void 0;return e.jsx("span",{className:r,style:d,children:s})},z=()=>e.jsx("style",{children:`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .bg-size-200 {
      background-size: 200% 200%;
    }
  `}),A=({image:s})=>e.jsx("div",{className:"absolute -right-4 sm:-right-6 md:-right-8 top-1/2 transform -translate-y-1/2",children:e.jsxs("div",{className:"w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative",children:[e.jsx("div",{className:"absolute inset-0 bg-gray-100 rounded-full opacity-20"}),s?e.jsx("img",{src:s,alt:"User icon",className:"w-full h-full relative rounded-full object-cover"}):e.jsxs("svg",{viewBox:"0 0 24 24",className:"w-full h-full relative",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"8",r:"5"}),e.jsx("path",{d:"M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"})]})]})}),W=()=>e.jsx("div",{className:"flex flex-col items-center mt-2",children:e.jsxs("div",{className:"relative",children:[e.jsx(v,{className:"w-6 h-6 text-blue-100 animate-bounce-custom"}),e.jsx(v,{className:"w-6 h-6 text-blue-100 absolute top-0 opacity-50 animate-bounce-custom-delayed"})]})}),q=({gridImages:s,userImage:l})=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-2 gap-2 sm:gap-3",children:[0,1,2,3].map(t=>e.jsx("div",{className:"aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden",children:s[t]?e.jsx("img",{src:s[t],alt:`Grid image ${t+1}`,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-lg"})},t))}),e.jsx(A,{image:l})]}),B=({className:s="",containerClassName:l="",title:t="Your main value proposition",description:m="Lorem ipsum dolor sit amet, consectetur adipisicing elit.",slogan:i="Nuestro slogan",buttonText:o="Call to action",onButtonClick:n,userCount:u=465,rating:a=5,hookText:r="Descubre más abajo",height:d="screen",withHookText:g=!0,image:x,gridImages:h=[],userImage:f})=>{const b=c=>{switch(c){case"screen":return"h-[100vh] md:h-screen";case"auto":return"min-h-[100vh] md:min-h-screen";case"half":return"h-[50vh]";default:return c.startsWith("h-")?c:"h-[100vh] md:h-screen"}};return e.jsxs("main",{className:`block md:relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-200 pt-24 ${b(d)} ${s}`,children:[e.jsx("style",{type:"text/css",children:`
          @keyframes bounceCustom {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          .animate-bounce-custom {
            animation: bounceCustom 1.5s ease-in-out infinite;
          }
          .animate-bounce-custom-delayed {
            animation: bounceCustom 1.5s ease-in-out infinite 0.2s;
          }
        `}),e.jsxs("div",{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col ${l}`,children:[e.jsx("div",{className:"flex-grow flex items-center justify-center",children:e.jsx(_,{"client:visible":!0,delay:200,children:e.jsxs("div",{className:"w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12",children:[e.jsxs("div",{className:"flex-1 space-y-4 md:space-y-6 text-center md:text-left max-w-xl md:max-w-none",children:[e.jsxs("div",{className:"space-y-0",children:[e.jsx("p",{className:"text-sm sm:text-base md:text-lg text-blue-100 max-w-lg mx-auto md:mx-0 mb-0",children:i}),e.jsxs("h1",{className:"text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-blue-100 tracking-tight -mt-1",children:[e.jsx(z,{}),e.jsx(D,{animated:!0,animationDuration:"normal",from:"from-blue-500",to:"to-lime-500",direction:"right",className:"leading-[1.1] font-display",children:t})]})]}),e.jsx("p",{className:"text-sm sm:text-base md:text-xl text-blue-100 max-w-lg mx-auto md:mx-0 font-body",children:m}),e.jsxs("div",{className:"flex flex-col items-center md:items-start gap-3 sm:gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm",children:[e.jsx("span",{className:"text-blue-100",children:"Así lo dicen Todos Nuestros Clientes Satisfechos"}),e.jsx("div",{className:"flex ml-2",children:Array.from({length:a}).map((c,p)=>e.jsx("span",{className:"text-yellow-400",children:"★"},p))})]}),e.jsx(S,{href:"/#contacto",backgroundColor:"bg-gradient-to-r from-blue-500 to-indigo-500",hoverColor:"hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600",onClick:n,className:"w-full sm:w-auto justify-center text-sm sm:text-base px-6 sm:px-8",children:o})]})]}),e.jsx("div",{className:"flex-1 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",children:e.jsxs("div",{className:"relative w-full aspect-square md:aspect-auto",children:[e.jsx("div",{className:"absolute inset-0 bg-gray-100 rounded-xl transform rotate-3"}),e.jsx("div",{className:"relative bg-white p-3 sm:p-4 rounded-xl shadow-lg",children:x?e.jsx("img",{src:x,alt:"Hero section image",className:"w-full h-full object-cover rounded-lg"}):e.jsx(q,{gridImages:h,userImage:f})})]})})]})})}),g&&e.jsx("div",{className:"pb-8 text-center",children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("h2",{className:"text-sm sm:text-base md:text-lg font-semibold text-blue-100",children:r}),e.jsx(W,{})]})})]})]})};export{B as default};
