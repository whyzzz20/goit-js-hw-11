import{i as l,S as f}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const d=document.querySelector(".search-form"),c=document.querySelector(".gallery"),a=document.querySelector(".loader");d.addEventListener("submit",y);a.style.display="none";function y(o){o.preventDefault(),c.innerHTML="",a.style.display="block",p(o.target.elements.searchQuery.value),o.target.elements.searchQuery.value=""}function p(o){fetch(`https://pixabay.com/api/?key=41293253-42a55b268bdac57d89d3cc200&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.total===0){l.warning({title:"Wrong request",message:"Sorry, there are no images matching your search query. Please try again!"});return}c.innerHTML=g(t.hits),new f(".gallery a").refresh(),a.style.display="none"}).catch(t=>l.error({title:"Error",message:`Oh, we have problem: ${t}`}))}function g(o){return o.map(({webformatURL:t,largeImageURL:n,tags:s,likes:e,views:r,comments:i,downloads:u,id:m})=>`<a class="gallery__link" href="${n}">
  <div class="gallery-item" id="${m}">
    <img class="gallery-item__img" src="${t}" alt="${s}" loading="lazy">
    <div class="info">
      <p class="info-item"><b>Likes</b>${e}</p>
      <p class="info-item"><b>Views</b>${r}</p>
      <p class="info-item"><b>Comments</b>${i}</p>
      <p class="info-item"><b>Downloads</b>${u}</p>
    </div>
  </div>
</a>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
