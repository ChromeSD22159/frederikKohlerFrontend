import{ae as s,af as i}from"./entry.d25c2e73.js";const a=()=>{const n=s();return i()!=="v4"&&console.warn("useStrapi4 is only available for v4"),{find:(t,e)=>n(`/${t}`,{method:"GET",params:e}),findOne:(t,e,o)=>{typeof e=="object"&&(o=e,e=void 0);const r=[t,e].filter(Boolean).join("/");return n(r,{method:"GET",params:o})},create:(t,e)=>n(`/${t}`,{method:"POST",body:{data:e}}),update:(t,e,o)=>{typeof e=="object"&&(o=e,e=void 0);const r=[t,e].filter(Boolean).join("/");return n(r,{method:"PUT",body:{data:o}})},delete:(t,e)=>{const o=[t,e].filter(Boolean).join("/");return n(o,{method:"DELETE"})}}},v=()=>a();export{v as u};
