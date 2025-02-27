import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.ai7qpRr1.js";import{c as n}from"./createLucideIcon.B8x4Svw_.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],l=n("MessageCircle",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],x=n("Send",h);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],f=n("X",p),v=({phoneNumber:c="1234567890"})=>{const[a,s]=r.useState(!1),[o,i]=r.useState(""),d=t=>{t.preventDefault();const m=encodeURIComponent(o);window.open(`https://wa.me/${c}?text=${m}`,"_blank"),i(""),s(!1)};return e.jsxs("div",{className:"fixed bottom-6 right-6 z-50",children:[a&&e.jsxs("div",{className:"mb-4 bg-white rounded-lg shadow-lg w-72 overflow-hidden transition-all duration-300 ease-in-out",children:[e.jsxs("div",{className:"bg-[#25D366] p-4 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(l,{className:"text-white",size:24}),e.jsx("span",{className:"text-white font-medium",children:"Enviar mensaje"})]}),e.jsx("button",{onClick:()=>s(!1),className:"text-white hover:bg-[#128C7E] p-1 rounded-full transition-colors",children:e.jsx(f,{size:20})})]}),e.jsxs("form",{onSubmit:d,className:"p-4",children:[e.jsx("textarea",{value:o,onChange:t=>i(t.target.value),placeholder:"Escribe tu mensaje aquí...",className:"w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none resize-none mb-3 h-32"}),e.jsxs("button",{type:"submit",className:"w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2",children:[e.jsx("span",{children:"Enviar"}),e.jsx(x,{size:18})]})]})]}),e.jsx("button",{onClick:()=>s(!a),className:"bg-[#25D366] hover:bg-[#128C7E] w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110",children:e.jsx(l,{className:"text-white",size:32})})]})};export{v as default};
