import{d as m,D as l,E as p,H as u,o as y,c as f,J as o,K as r,e as s,aa as c}from"./entry.f59f6ddd.js";const x={layout:"multi-row",class:"absolute ease-in-out duration-300 shadow-lg shadow-transparent min-w-full fk-bg-prime"},w={class:"grid grid-cols-1 gap-4 min-h-screen lg:grid-cols-2"},h={class:"flex flex-col px-10 gap-10 mx-auto w-full max-w-2xl flex-1 md:pb-7"},k={class:"flex flex-col px-10 lg:px-20 gap-10 mx-auto w-full max-w-2xl flex-1"},_=m({__name:"multi-row",props:{primarySticky:{type:Boolean,default:!1},secondarySticky:{type:Boolean,default:!1}},setup(d){const e=d,a=l(window.innerWidth||document.documentElement.clientWidth),t=l(a.value<=1024),n=()=>{a.value=window.innerWidth||document.documentElement.clientWidth,t.value=a.value<=1024};return p(()=>{window.addEventListener("resize",n)}),u(()=>{window.removeEventListener("resize",n)}),(i,g)=>(y(),f("div",x,[o("div",w,[o("div",{class:r(["flex flex-col pt-10 md:pt-20 pb-7",{"lg:sticky":!s(t)&&e.primarySticky,"lg:top-0":!s(t)&&e.primarySticky,"md:min-h-screen":!e.primarySticky,"md:max-h-screen":e.primarySticky}])},[o("div",h,[c(i.$slots,"primary")])],2),o("div",{class:r(["flex flex-col pt-10 md:pt-20 pb-7 fk-bg-dark secondary",{"lg:sticky":!s(t)&&e.secondarySticky,"lg:top-0":!s(t)&&e.secondarySticky,"md:min-h-screen":!e.secondarySticky,"md:max-h-screen":e.secondarySticky}])},[o("div",k,[c(i.$slots,"secondary")])],2)])]))}});export{_ as default};