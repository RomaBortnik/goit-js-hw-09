const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(o){document.body.style.backgroundColor=n(),t.setAttribute("disabled","true"),e.disabled=!1,d=setInterval((()=>{document.body.style.backgroundColor=n()}),1e3)})),e.addEventListener("click",(function(n){t.disabled=!1,e.disabled=!0,clearInterval(d)})),e.setAttribute("disabled","true");let d=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.d62f4114.js.map
