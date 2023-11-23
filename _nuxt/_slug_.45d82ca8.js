import{n as p,N as _,u as h,D as b,c as m,J as e,t as o,P as a,e as g,O as v,o as f,L as x,M as k}from"./entry.5aa2e52d.js";const d=t=>(x("data-v-debed245"),t=t(),k(),t),w={class:"h-screen w-full flex flex-col justify-center items-center fk-bg-prime"},y={class:"flex flex-col justify-center items-center backdrop-blur bg-white/10 p-10 rounded-xl rotate-3 card z-40"},C={class:"text-9xl font-extrabold fk-colored-text tracking-widest"},S={class:"px-2 text-sm rounded rotate-12 absolute backdrop-blur bg-white/40 status"},q={class:"mt-5"},E={class:"text-center text-xs max-w-sm mb-5"},I=d(()=>e("span",{class:"relative block px-8 py-3 backdrop-blur hover:bg-black/70 border border-current button"}," Go Home ",-1)),z=d(()=>e("li",{class:"backdrop-blur bg-white/10 z-20 rounded-xl"},null,-1)),B=d(()=>e("li",{class:"backdrop-blur bg-white/10 z-0 rounded-xl"},null,-1)),T={__name:"[slug]",setup(t){const n=_();h();const c=b([{code:"400",statusCode:"Bad Request",message:"The request could not be understood or was missing required parameters."},{code:"401",statusCode:"Unauthorized",message:"Authentication is required and has failed or has not been provided."},{code:"403",statusCode:"Forbidden",message:"The server understood the request, but it refuses to authorize it."},{code:"404",statusCode:"Page Not Found",message:"The requested resource could not be found on the server."},{code:"500",statusCode:"Internal Server Error",message:"An unexpected condition was encountered on the server."},{code:"502",statusCode:"Bad Gateway",message:"The server was acting as a gateway or proxy and received an invalid response from the upstream server."},{code:"503",statusCode:"Service Unavailable",message:"The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded."}]),u=()=>{v({redirect:"/"})},r=s=>c.value.find(i=>i.code===s)||{statusCode:"500",message:"Internal Server Error"};return(s,l)=>(f(),m("main",w,[e("ul",null,[e("li",y,[e("h1",C,o(r((s._.provides[a]||s.$route).params.slug).code),1),e("div",S,o(r((s._.provides[a]||s.$route).params.slug).statusCode),1),e("button",q,[e("a",{class:"relative inline-block text-sm font-medium fk-text-highlight group active:text-orange-500 focus:outline-none focus:ring",onClick:u},[e("p",E,o(r((s._.provides[a]||s.$route).params.slug).message),1),e("p",null,o(g(n)),1),I])])]),z,B])]))}},N=p(T,[["__scopeId","data-v-debed245"]]);export{N as default};