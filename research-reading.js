(function(){
  'use strict';
  let dispose=()=>{};
  const D=()=>window.__researchDepth;
  function prepare(layer,id){
    const article=layer.querySelector('.case-article');
    if(!article||!window.__researchPortfolio.papers[id])return;
    article.classList.add('rp-detail');article.dataset.research=id;
    if(id==='redsea'){
      const F=(...keys)=>D().figure(id,...keys);
      const section=name=>[...article.querySelectorAll('.ca-section')].find(s=>s.querySelector('.ca-h')?.textContent.trim()===name);
      const replacements={'redsea-route.png':'f1','redsea-sample-funnel.png':'f2','redsea-eventstudy.png':'f3','redsea-heatmap-summary.png':'f4','redsea-heatmap-did.png':'fa1','redsea-heatmap-ddd.png':'fa2'};
      Object.entries(replacements).forEach(([src,key])=>{const old=article.querySelector(`img[src="${src}"]`)?.closest('figure');if(old)old.outerHTML=F(key);});
      const tables={'Sample Construction':['ta1','ta2'],'Main Results':['t1'],'Event Study':['t2'],'Exploratory Decomposition':['t3'],'Robustness':['t4']};
      Object.entries(tables).forEach(([name,keys])=>{const s=section(name);if(!s)return;s.querySelectorAll('.rs-tablewrap').forEach(t=>t.remove());s.insertAdjacentHTML('beforeend',F(...keys));});
      section('Data and Measurement')?.insertAdjacentHTML('beforeend',D().steps([
        ['Build a consistent activity panel','Aggregate daily PortWatch calls, imports and exports into a port-month panel, keeping the same outcome definitions across the three corridors.'],
        ['Anchor the seasonal comparison','Standardize each port against its own pre-crisis same-month distribution, then apply the stated shift and winsorization rules.'],
        ['Join geography and network position','Assign constituent IHO basins, compute the geographic rerouting penalty, and match the panel to liner-shipping connectivity records.'],
        ['Estimate exposure gradients','Use port, month and basin-by-month fixed effects with port trends to trace adjustment along the geographic and network dimensions.']
      ]));
      section('Main Results')?.insertAdjacentHTML('beforeend',D().focus('Three adjustment margins, one disruption','The corridor comparison connects a common maritime shock to different local outcomes: import compression in the Southeast Asia gateway corridor, operational reallocation in the Red Sea–Gulf–western Indian Ocean corridor, and a positive pooled export gradient. The 24-test aggregate family supplies the multiple-testing framework for reading these estimates.'));
      const rb=section('Robustness')?.querySelector('.ca-sub');if(rb)rb.textContent='Tracing the Results Across Diagnostic Checks';
      const limitation=article.querySelector('.rm-limitation');
      if(limitation)limitation.insertAdjacentHTML('beforebegin',`<section class="rm-section"><h2><small>Research / Synthesis</small>From the exposure measure to the adjustment mechanism</h2>${D().paragraphs('The paper’s empirical construction keeps geography, network connectivity and outcome composition distinct. Geography describes the extra distance implied by diversion around the Cape. Connectivity describes a port’s integration into liner shipping. Cargo and service outcomes show where adjustment appears. Each enters the design at a different stage, making the mechanism behind a coefficient easier to inspect.', 'The event-time evidence adds timing to this cross-port comparison. Import adjustment in the Southeast Asia gateway corridor appears early in the post-shock period, while some operational and export responses emerge later. Reading the dynamic profiles beside the aggregate heatmaps connects when a response occurs to where and through which activity margin it occurs.', 'The resulting contribution is a port-level account of adjustment to a global chokepoint disruption. It combines an explicit geographic exposure construction, a matched activity–connectivity panel, and dynamic within-basin comparisons. The original tables and figures above expose each stage of that construction, from the sample funnel to the full coefficient maps.')}</section>`);
    }
    if(id==='ailabor'||id==='socialcapital'){
      const limitation=article.querySelector('.rm-limitation');
      const content=id==='ailabor'?D().steps([
        ['Technology to tasks','Follow the AI state into current production, knowledge accumulation and the creation of new tasks. Each channel changes the demand for labor through a different margin.'],
        ['Tasks to match surplus','Use the firm’s optimization problem to translate marginal products into the value of an additional worker. Wages divide the surplus from an existing match.'],
        ['Surplus to vacancies','The free-entry condition links job value to vacancy posting. Matching frictions determine how those vacancies become new employment.'],
        ['Flows to unemployment','Combine job finding and separation in the unemployment flow balance, then compare the structural response with the empirical decomposition.']
      ]):D().steps([
        ['Participation to repeated interaction','Use the tutoring setting to connect structured participation with repeated cooperative experiences.'],
        ['Interaction to behavioral outcomes','Measure trust, reciprocity and cooperation through distinct strategic choices in the experimental games.'],
        ['Assignment to change over time','Combine the randomized design with pre/post measurement to organize the treatment-control comparison.'],
        ['Operations to a research panel','Link participation, matching, attendance and implementation records to the behavioral measurement schedule.']
      ]);
      limitation?.insertAdjacentHTML('beforebegin',`<section class="rm-section"><h2><small>Research / Walkthrough</small>${id==='ailabor'?'Following an AI shock through the model':'Following the field design from participation to measurement'}</h2>${content}</section>`);
    }
    const sections=[...article.querySelectorAll('.rm-section,.ca-section')].filter(s=>!s.querySelector('h1'));
    sections.forEach((s,i)=>{if(!s.id)s.id=`rp-reading-${i}`;s.classList.add('rp-reading-section');});
    const available=sections.map(s=>({id:s.id,title:(s.querySelector('h2,h3,.ca-h')?.textContent||'').replace(/^Research\s*\/\s*\d+\s*/,'').trim()})).filter(s=>s.title);
    const figureCount=article.querySelectorAll('.rm-evidence').length;
    const toolbar=document.createElement('div');toolbar.className='rm-reader-bar';
    toolbar.innerHTML=`<div class="rm-reader-row"><label><span>Explore the research</span><select aria-label="Jump to research section">${available.map(s=>`<option value="${s.id}">${window.__researchPortfolio.esc(s.title)}</option>`).join('')}</select></label><span class="rm-reader-count">${available.length} sections${figureCount?' · '+figureCount+' exhibits':''}</span><span class="rm-reader-percent" aria-label="Reading progress">0%</span></div><div class="rm-reader-track"><i></i></div>`;
    const hero=article.querySelector('.rm-hero,.rs-hero')||article.querySelector('h1')?.closest('section');
    if(hero)hero.after(toolbar);else article.prepend(toolbar);
    article.querySelector('.rm-nav')?.remove();
  }
  function init(scroller){
    dispose();const article=scroller?.querySelector('.rp-detail');if(!article)return;
    const controller=new AbortController(),signal=controller.signal;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections=[...article.querySelectorAll('.rp-reading-section')];
    const select=article.querySelector('.rm-reader-bar select'),fill=article.querySelector('.rm-reader-track i'),percent=article.querySelector('.rm-reader-percent');
    let frame=0;
    function update(){frame=0;const max=scroller.scrollHeight-scroller.clientHeight;const value=max>0?Math.min(100,Math.round(scroller.scrollTop/max*100)):100;fill.style.width=value+'%';percent.textContent=value+'%';const top=scroller.getBoundingClientRect().top+100;let current=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<=top)current=s;});if(current)select.value=current.id;}
    scroller.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true,signal});
    select.addEventListener('change',()=>{article.querySelector('#'+CSS.escape(select.value))?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});},{signal});
    update();
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(!reduce)e.target.animate([{opacity:.5,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});observer.unobserve(e.target);}}),{root:scroller,threshold:.07});
    article.querySelectorAll('.rm-evidence,.rm-insight,.rm-method-steps,.rm-widget').forEach(n=>observer.observe(n));
    const dialog=document.createElement('dialog');dialog.className='rm-lightbox';dialog.setAttribute('aria-label','Manuscript figure viewer');
    dialog.innerHTML='<div class="rm-lightbox-bar"><strong></strong><div><button type="button" class="rm-lightbox-zoom" aria-pressed="false">Actual size</button><button type="button" class="rm-lightbox-close" aria-label="Close enlarged figure">Close ×</button></div></div><div class="rm-lightbox-image"><img alt=""></div>';
    article.appendChild(dialog);let opener;
    const close=()=>{dialog.close();dialog.classList.remove('is-actual');opener?.focus({preventScroll:true});};
    dialog.querySelector('.rm-lightbox-close').addEventListener('click',close,{signal});
    dialog.querySelector('.rm-lightbox-zoom').addEventListener('click',e=>{const actual=dialog.classList.toggle('is-actual');e.currentTarget.setAttribute('aria-pressed',String(actual));e.currentTarget.textContent=actual?'Fit to screen':'Actual size';},{signal});
    dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();close();}},{signal});
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();},{signal});
    dialog.addEventListener('click',e=>{if(e.target===dialog)close();},{signal});
    article.querySelectorAll('.rm-figure-open').forEach(button=>button.addEventListener('click',()=>{opener=button;const img=button.querySelector('img'),copy=dialog.querySelector('img');copy.src=img.src;copy.alt=img.alt;dialog.querySelector('strong').textContent=button.closest('figure').querySelector('h3').textContent;const zoom=dialog.querySelector('.rm-lightbox-zoom');zoom.textContent='Actual size';zoom.setAttribute('aria-pressed','false');dialog.showModal();dialog.querySelector('.rm-lightbox-close').focus();},{signal}));
    article.querySelectorAll('[data-depth-widget]').forEach(w=>{const input=w.querySelector('input'),output=w.querySelector('.rm-output'),label=w.querySelector('output');const refresh=()=>{
      const v=+input.value;
      if(w.dataset.depthWidget==='precision'){const factor=Math.sqrt(1-v/100);label.textContent=v.toFixed(1)+'%';output.innerHTML=`<div class="rm-number-pair"><div><span>Standard error</span><strong>${(3.26*factor).toFixed(2)} <small>pp</small></strong></div><div><span>Minimum detectable effect</span><strong>${(9.14*factor).toFixed(2)} <small>pp</small></strong></div></div><div class="rm-comparison-track"><i style="width:${factor*100}%"></i></div><p>Calculated from the unadjusted 3.26 pp standard error and 9.14 pp minimum detectable effect. The bar shows the remaining share of the original standard error.</p>`;}
      else{label.textContent=v+' bp';output.innerHTML=`<div class="rm-number-pair"><div><span>Before 2021</span><strong class="rm-positive">+${(37.8*v/10).toFixed(1)} <small>bp</small></strong></div><div><span>After 2021</span><strong class="rm-negative">−${(34.7*v/10).toFixed(1)} <small>bp</small></strong></div></div><div class="rm-response-bars"><i style="width:${v/20*48}%;--bar-color:#28776c"></i><i style="width:${v/20*48*34.7/37.8}%;--bar-color:#a34b5b"></i></div><p>Estimated equity response, scaling Exhibit 9’s rounded ten-basis-point comparison.</p>`;}
      input.setAttribute('aria-valuetext',label.textContent);
    };input.addEventListener('input',refresh,{signal});refresh();});
    dispose=()=>{controller.abort();observer.disconnect();cancelAnimationFrame(frame);if(dialog.open)dialog.close();dialog.remove();};
  }
  window.__researchReading={prepare,init,dispose:()=>dispose()};
})();
