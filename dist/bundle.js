(()=>{"use strict";const e=[document.querySelector("canvas.hide-ending"),document.querySelector("#image-layer"),document.querySelector("#fill-layer"),document.querySelector("#text-layer")],t=[e[0].getContext("2d"),e[1].getContext("2d"),e[2].getContext("2d"),e[3].getContext("2d")];let r={width:200,height:300,existanseLayer:{imgLayer:!1,fillLayer:!1,textLayer:!1},currentImgSrc:!1,currentFill:!1,currentColor:"#000000",currentAlpha:{mono:1,gradient:1},coordsGradient:!1,currentText:!1},i={maxWidth:r.width-10,startHeight:r.height/2,color:"gray",fontFamily:"BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",fontSize:"16px"};const n=function(e){let i=Number(e.target.dataset.id);switch(t[i].clearRect(0,0,r.width,r.height),i){case 1:r.currentImgSrc=!1,r.existanseLayer.imgLayer=!1;break;case 2:r.existanseLayer.fillLayer=!1,r.currentFill=!1;break;case 1:r.existanseLayer.textLayer=!1}};function l(e){r.currentFill="mono",e&&(r.currentColor=e.target.value),t[2].clearRect(0,0,r.width,r.height),t[2].fillStyle=r.currentColor,t[2].globalAlpha=r.currentAlpha.mono,t[2].fillRect(0,0,r.width,r.height),r.existanseLayer.fillLayer=!0}function o(){t[2].clearRect(0,0,r.width,r.height);let e=document.querySelector("input[name='color-grade1']").value,i=document.querySelector("input[name='color-grade2']").value,n=document.querySelector("select[name='gradient-type']").value,l=document.querySelector(".direction-linear"),o=document.querySelector(".direction-radial");switch(n){case"linear":!function(e,i,n,l){let o,a,c,d,u,h=document.querySelector("select[name='gradient-direction']").value;r.currentFill="linear",r.currentFill="linear",n.classList.contains("direction-hidden")&&(n.classList.remove("direction-hidden"),l.classList.add("direction-hidden")),"top"==h?(a=0,c=r.height,d=0,u=0):"left"==h?(a=r.width,c=0,d=0,u=0):"bottom"==h?(a=0,c=0,d=0,u=r.height):"right"==h?(a=0,c=0,d=r.width,u=0):"top left"==h?(a=r.width,c=r.height,d=0,u=0):"top right"==h?(a=0,c=r.height,d=r.width,u=0):"bottom left"==h?(a=r.width,c=0,d=0,u=r.height):"bottom right"==h&&(a=0,c=0,d=r.width,u=r.height),o=t[2].createLinearGradient(a,c,d,u),r.coordsGradient=[a,c,d,u],o.addColorStop(0,e),o.addColorStop(1,i),r.currentColor=[e,i],t[2].fillStyle=o,t[2].fillRect(0,0,r.width,r.height)}(e,i,l,o);break;case"radial":!function(e,i,n,l){let o;r.currentFill="radial",l.classList.contains("direction-hidden")&&(l.classList.remove("direction-hidden"),n.classList.add("direction-hidden")),o=t[2].createRadialGradient(120,100,r.height,0,0,30),o.addColorStop(0,e),o.addColorStop(1,i),r.currentColor=[e,i],t[2].fillStyle=o,t[2].fillRect(0,0,r.width,r.height)}(e,i,l,o)}r.existanseLayer.fillLayer=!0}function a(){let e=document.querySelector("#direction-x").value,i=document.querySelector(".insert-x"),n=document.querySelector("#direction-y").value,l=document.querySelector(".insert-y"),o=document.querySelector("input[name='color-grade1']").value,a=document.querySelector("input[name='color-grade2']").value;i.innerText=Math.floor(100*e/r.width)+"%",l.innerText=Math.floor(100*n/r.height)+"%",t[2].clearRect(0,0,r.width,r.height);let c=t[2].createRadialGradient(120,100,r.height,e,n,30);r.coordsGradient=[120,100,r.height,e,n,30],c.addColorStop(0,o),c.addColorStop(1,a),t[2].fillStyle=c,t[2].fillRect(0,0,r.width,r.height)}function c(){t[3].clearRect(0,0,r.width,r.height);let e=document.querySelector("textarea[name='banner-text']");if(t[3].fillStyle=i.color,t[3].font=`${i.fontSize} ${i.fontFamily}`,Math.floor(t[3].measureText(e.value).width)>i.maxWidth){let n=function(e,t,r){let i=t.split(" "),n=[],l=i[0];for(let t=1;t<i.length;t++){let o=i[t];e.measureText(l+" "+o).width<r?l+=" "+o:(n.push(l),l=o)}return n.push(l),n}(t[3],e.value,i.maxWidth),l=i.startHeight;for(let e of n)t[3].fillText(e,10,l,i.maxWidth),l+=20;r.currentText=n}else t[3].fillText(e.value,10,i.startHeight,i.maxWidth),r.currentText=e.value;r.existanseLayer.textLayer=!0}function d(){if(console.log(r,i),r.existanseLayer.fillLayer){if("mono"==r.currentFill)t[0].globalAlpha=r.currentAlpha.mono,t[0].fillStyle=r.currentColor,t[0].fillRect(0,0,r.width,r.height);else if("linear"==r.currentFill){t[0].globalAlpha=r.currentAlpha.gradient;let e=t[0].createLinearGradient(r.coordsGradient[0],r.coordsGradient[1],r.coordsGradient[2],r.coordsGradient[3]);e.addColorStop(0,r.currentColor[0]),e.addColorStop(1,r.currentColor[1]),t[0].fillStyle=e,t[0].fillRect(0,0,r.width,r.height)}else if("radial"==r.currentFill){let e;t[0].globalAlpha=r.currentAlpha.gradient,e=0!=document.querySelector("#direction-x").value&&0!=document.querySelector("#direction-y").value?t[0].createRadialGradient(r.coordsGradient[0],r.coordsGradient[1],r.coordsGradient[2],r.coordsGradient[3],r.coordsGradient[4],r.coordsGradient[5]):t[0].createRadialGradient(120,100,r.height,0,0,30),e.addColorStop(0,r.currentColor[0]),e.addColorStop(1,r.currentColor[1]),t[0].fillStyle=e,t[0].fillRect(0,0,r.width,r.height)}t[0].globalAlpha=1}if(r.existanseLayer.textLayer)if(t[0].fillStyle=i.color,t[0].font=`${i.fontSize} ${i.fontFamily}`,"string"==typeof r.currentText)t[0].fillText(r.currentText,10,i.startHeight,i.maxWidth);else{let e=i.startHeight;for(let n of r.currentText)t[0].fillText(n,10,e,i.maxWidth),e+=20}}window.onload=()=>{let n=e[1].offsetWidth-2,l=e[1].offsetHeight-2;document.querySelector(".example-area-size").innerText=`${n}*${l}`,e[1].setAttribute("height",l),e[1].setAttribute("width",n),e[2].setAttribute("height",l),e[2].setAttribute("width",n),e[3].setAttribute("height",l),e[3].setAttribute("width",n),e[0].setAttribute("height",l),e[0].setAttribute("width",n),document.querySelector("#direction-x").setAttribute("max",n),document.querySelector("#direction-y").setAttribute("max",l);let o="Пример вашего баннера";t[3].fillStyle=i.color,t[3].font=`${i.fontSize} ${i.fontFamily}`,t[3].fillText(o,10,i.startHeight,i.maxWidth),r.width=n,r.height=l,r.currentText=o};let u=document.querySelectorAll(".option header");for(let e of u)e.addEventListener("click",T);let h=document.querySelectorAll(".fa-times");for(let e of h)e.addEventListener("click",n);document.querySelector(".banner-image").addEventListener("input",(function(e){let i=e.target;if(i.files.length>1)document.querySelector(".error-field").innerText="Пожалуйста, выберите для баннера только одно изображение!";else{t[1].clearRect(0,0,r.width,r.height);let e=i.files[0],n=URL.createObjectURL(e),l=new Image;l.src=n,l.onload=function(){t[1].drawImage(l,0,0,r.width,r.width*l.height/l.width),r.currentImgSrc=n},r.existanseLayer.imgLayer=!0}}));let s=document.querySelector("input[name='color-plain']"),m=document.querySelector("input[name='alpha-mono']");s.addEventListener("input",l),m.addEventListener("input",(function(e){t[2].globalAlpha=e.target.value/100,r.currentAlpha.mono=e.target.value/100,l()}));let g=document.querySelectorAll(".color-gradient"),f=document.querySelector("input[name='alpha-grad']"),y=document.querySelector("select[name='gradient-type']"),S=document.querySelector(".direction-linear"),p=document.getElementById("direction-x"),x=document.getElementById("direction-y");for(let e of g)e.addEventListener("input",o);f.addEventListener("input",(function(e){t[2].globalAlpha=e.target.value/100,r.currentAlpha.gradient=e.target.value/100,o()})),y.addEventListener("input",o),S.addEventListener("input",o),p.addEventListener("input",a),x.addEventListener("input",a);let L=document.querySelector("textarea[name='banner-text']"),v=document.querySelector("input[name='text-size']"),w=document.querySelector("input[name='text-color']"),b=document.querySelector("input[name='text-direction']");L.addEventListener("input",c),v.addEventListener("input",(function(e){i.fontSize=e.target.value+"px",c()})),w.addEventListener("input",(function(e){i.color=e.target.value,c()})),b.addEventListener("input",(function(e){i.startHeight=e.target.value*r.height/100,c()}));let q=document.querySelector(".btn-save"),A=document.querySelector(".btn-PNG"),R=document.querySelector(".btn-HTML"),C=document.querySelector(".btn-JSON");function T(e){let i=Number(e.target.dataset.id),n=document.querySelectorAll("input[type='checkbox']"),l=document.querySelectorAll(".fa.arrows"),o=document.querySelectorAll(".sub");"Пример вашего баннера"==r.currentText&&(r.currentText="",t[3].clearRect(0,0,r.width,r.height)),l[i].classList.contains("fa-chevron-down")?(n[i].checked=!0,l[i].classList.remove("fa-chevron-down"),l[i].classList.add("fa-chevron-up"),o[i].classList.remove("hidden-sub")):(n[i].checked=!1,l[i].classList.remove("fa-chevron-up"),l[i].classList.add("fa-chevron-down"),o[i].classList.add("hidden-sub"))}q.addEventListener("click",(function(){t[0].fillStyle="#FF0000",t[0].clearRect(0,0,r.width,r.height);let e=document.querySelectorAll(".sub-btn");for(let t of e)t.disabled=!1;if(r.existanseLayer.imgLayer){let e=new Image;e.src=r.currentImgSrc,e.onload=function(){t[0].drawImage(e,0,0,r.width,r.width*e.height/e.width),d()}}else d()})),A.addEventListener("click",(function(){let t=e[0].toDataURL(),r=new Image;r.src=t;let i=document.createElement("a");i.setAttribute("href",r.src),i.setAttribute("download","yourBanner"),i.click()})),R.addEventListener("click",(function(){let t=e[0].toDataURL(),r=new Image;r.src=t;let i=`<img src = "${r.src}">`;navigator.clipboard.writeText(i).then((()=>{console.log(`Вы скопировали ${i}`)})).catch((e=>{console.log("Что-то пошло не так...",e)}))})),C.addEventListener("click",(function(){let t=e[0].toDataURL(),r=JSON.stringify(t);navigator.clipboard.writeText(r).then((()=>{console.log(`Вы скопировали ${r}`)})).catch((e=>{console.log("Что-то пошло не так...",e)}))}))})();