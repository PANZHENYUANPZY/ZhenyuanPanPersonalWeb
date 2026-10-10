(function () {
  'use strict';
  const fmt = (n,d=2) => (n>0?'+':n<0?'−':'') + Math.abs(n).toFixed(d);
  const textPanel = (title,body) => `<strong>${title}</strong><p>${body}</p>`;
  const table = (headers,rows) => `<div class="rm-table-wrap"><table class="rm-table"><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  function interval(estimate,lo,hi,level) {
    const x=n=>50+(n+8)/16*560;
    return `<svg class="rm-chart" viewBox="0 0 660 128" role="img" aria-label="Estimate ${fmt(estimate)} percentage points; ${level}% confidence interval ${fmt(lo)} to ${fmt(hi)}; comparison band minus five to plus five."><rect x="${x(-5)}" y="20" width="${x(5)-x(-5)}" height="56" fill="#dfebe7"/><line x1="${x(0)}" x2="${x(0)}" y1="10" y2="86" class="rm-zero"/><line x1="${x(lo)}" x2="${x(hi)}" y1="48" y2="48" class="rm-ci"/><circle cx="${x(estimate)}" cy="48" r="7" class="rm-point"/>${[-8,-5,0,5,8].map(n=>`<text x="${x(n)}" y="104" text-anchor="middle">${n>0?'+':''}${n}</text>`).join('')}<text x="330" y="125" text-anchor="middle">Treatment effect · percentage points</text></svg>`;
  }
  const ciRows=[[-.64,-2.20,.92],[2.23,-3.13,7.59],[-1.02,-2.53,.50],[-.21,-1.75,1.34]];
  const thresholds=[[10,65.9,.44,-1.07,1.95],[15,50.1,.21,-1.51,1.92],[20,41.0,-.14,-1.88,1.60],[25,34.3,-.38,-2.22,1.46],[27,31.9,-.68,-2.56,1.20],[30,28.6,-.64,-2.50,1.21],[33,25.3,-.86,-2.81,1.08],[35,23.2,-.87,-2.86,1.12],[40,18.8,-.75,-2.70,1.19],[45,14.8,-.72,-2.42,.98],[50,11.8,-.54,-2.13,1.04],[55,9.5,-.41,-1.93,1.12],[60,7.8,-.26,-1.81,1.28]];
  const policies=[['2005–2015','+0.00259','5.51','2,613'],['2015–2019','+0.00024','0.47','877'],['2019–2022','+0.00133','1.60','616'],['2022–2023','−0.00238','−1.91','339'],['2023–2025','−0.00412','−3.51','575']];
  const portfolios=[
    [['Static 60/40','7.25%','11.11%','0.65','−31.7%','−12.5%'],['Conditional','7.11%','11.06%','0.64','−32.0%','−12.5%']],
    [['Static 60/40','5.71%','11.04%','0.52','−31.7%','−9.7%'],['Conditional','5.63%','11.05%','0.51','−32.0%','−9.7%']],
    [['Static 60/40','1.46%','11.33%','0.13','−20.4%','−12.5%'],['Conditional','1.40%','11.09%','0.13','−20.4%','−12.5%']],
    [['Static 60/40','1.67%','9.84%','0.17','−13.3%','−4.1%'],['Conditional','1.67%','9.51%','0.18','−13.2%','−3.6%']]
  ];
  const concepts={
    audit:[['Selection rewards visibility','Requests with a higher chance of entering the evidence record receive stronger computation incentives. Visible correctness and buyer-average quality diverge.'],['Change the effort incentive','Verification aimed at otherwise unseen outcomes changes the incentive slope. It can weaken or reverse the ordering of compute across request profiles.'],['Recover a representative record','Random outcome checks, a request roster, and known inclusion probabilities let performance measurement account for selection.']],
    provenance:[['Evidence + a private value → an action','The recommendation combines information about the state with a value adjustment suited to the user. Its original rationale identifies both sources.'],['A value adjustment enters a factual belief','The recommendation survives, but the value origin is lost. Later factual reuse assigns evidential weight to the surviving personalized content.'],['The causal record stays attached','The saved record identifies which component came from the user’s value. Correct causal awareness preserves the distinction at reuse.']],
    portability:[['Skill recovery induces more specialization','At an equal immediate reduction in switching loss, recovery protects more of the next unit of specific learning in the fixed-recovery benchmark.'],['Practice changes the comparison','Recovery tools replace private effort, while records can raise the return to practice. Beyond the model’s threshold, record coverage induces the larger design response.']],
    contracts:[['Preserve the bill, improve the workflow','A feasible value-improving, cost-reducing replacement can keep the selected bill. Class-specific action and goal pricing implement the benchmark outcomes.'],['Action count becomes a pricing instrument','A shared per-action price can be capped by low-value demand. More actions increase the bill charged to a higher-value class.'],['Expand the feasible pair of bills','An execution fee changes implementation and adoption. The paper follows the resulting starting welfare level as well as the response to further quality improvement.']],
    archives:[['Maximize what the market learns','The price-information objective balances useful signal content against common nuisance exposure in aggregate order flow.'],['Optimize the return to strategic trading','The symmetric interior private deployment lies between the price-information and standalone-information maxima under the ordering theorem’s conditions.'],['Maximize information in one forecast','The standalone objective evaluates the private signal in isolation from strategic trading and the aggregation of correlated errors.']]
  };
  function access(i) {
    const lines=[['First-site access','A nearby first facility provides an initial route to care.'],['Two-site redundancy','The second facility determines whether a nearby alternative remains available.'],['Backup access after a closure','Once the closest facility disappears, the second site becomes the remaining local option.']];
    return `<svg class="rm-chart" viewBox="0 0 620 190" role="img" aria-label="Schematic origin connected to two dialysis sites"><path d="M70 95 L285 45" fill="none" stroke="${i===2?'#c3cbd3':'#246b73'}" stroke-width="3" ${i===2?'stroke-dasharray="5 5"':''}/><path d="M70 95 L505 125" fill="none" stroke="${i===0?'#c3cbd3':'#246b73'}" stroke-width="3"/><circle cx="70" cy="95" r="12" fill="#19344c"/><circle cx="285" cy="45" r="12" fill="${i===2?'#c3cbd3':'#246b73'}"/><circle cx="505" cy="125" r="12" fill="${i===0?'#c3cbd3':'#246b73'}"/><text x="30" y="133">Demand origin</text><text x="245" y="22">Closest site${i===2?' · closed':''}</text><text x="463" y="164">Second site</text></svg>`+textPanel(...lines[i]);
  }
  function renderChoice(kind,i) {
    if(concepts[kind]) return textPanel(...concepts[kind][i]);
    if(kind==='access') return access(i);
    if(kind==='jhe-ci') {
      const [e,l,h]=ciRows[i];return textPanel(`${fmt(e)} pp · 90% CI [${fmt(l)}, ${fmt(h)}]`,i===1?'The unadjusted interval crosses the +5-point materiality threshold.':'The interval lies inside the ±5-point materiality band.')+interval(e,l,h,90)+ '<div class="rm-legend"><span>Estimate and confidence interval</span><span>±5 pp band</span></div>';
    }
    if(kind==='regime') return textPanel(i?'−0.00170 · Post-2021 loading':'+0.00185 · Pre-2021 loading',i?'Positive real-rate news is associated with a negative equity response. Equity and Treasury price responses align.':'Positive real-rate news is associated with a positive equity response. Equity and Treasury price responses offset.')+`<svg class="rm-chart" viewBox="0 0 620 125" role="img" aria-label="Equity loading ${i?'negative':'positive'}; Treasury yield-price response negative"><text x="15" y="34">Equity</text><text x="15" y="86">Treasury</text><line x1="310" x2="310" y1="5" y2="105" class="rm-zero"/><rect x="${i?180:310}" y="16" width="${i?130:141}" height="24" fill="#246b73"/><path d="M310 73 H190" stroke="#6e84a1" stroke-width="4"/><path d="M200 65 L190 73 L200 81" fill="none" stroke="#6e84a1" stroke-width="3"/><text x="275" y="124">0</text></svg>`;
    if(kind==='policy'){const p=policies[i];return textPanel(`${p[0]} · β = ${p[1]}`,`Market real-rate loading. t-statistic ${p[2]}; ${p[3]} daily observations.`);}
    if(kind==='portfolio')return table(['Allocation','Excess return','Volatility','Sharpe','Max drawdown','Worst quarter'],portfolios[i]);
    return '';
  }
  function init(scroller) {
    if(!scroller) return;
    scroller.querySelectorAll('[data-widget]').forEach(w=>{
      const kind=w.dataset.widget, out=w.querySelector('.rm-output');
      if(!out || w.dataset.mounted) return;
      w.dataset.mounted='true';
      if(kind==='threshold') {
        const slider=w.querySelector('input');
        const update=()=>{const [t,b,e,l,h]=thresholds[Number(slider.value)];w.querySelector('output').textContent=t+' minutes';slider.setAttribute('aria-valuetext',t+' minutes');out.innerHTML=textPanel(`${fmt(e)} pp at ${t} minutes`,`Baseline two-site deficit: ${b.toFixed(1)}%. 95% pointwise confidence interval: [${fmt(l)}, ${fmt(h)}].`)+interval(e,l,h,95);};slider.addEventListener('input',update);update();return;
      }
      if(kind==='coupling') {
        const a=w.querySelector('#rm-settlement'),b=w.querySelector('#rm-coupling');
        const update=()=>{const x=+a.value/100,l=+b.value/100,base=(1+x*x)/4,coupling=l*(1-x)**2/2;w.querySelector('#rm-settlement-value').textContent=x.toFixed(2);w.querySelector('#rm-coupling-value').textContent=l.toFixed(2);a.setAttribute('aria-valuetext',x.toFixed(2));b.setAttribute('aria-valuetext',l.toFixed(2));out.innerHTML=textPanel(`Total cost ${(base+coupling).toFixed(3)}`,`Separate settlement cost ${base.toFixed(3)} + interface cost ${coupling.toFixed(3)}. ${x===1?'Equal settlements eliminate the interface penalty.':'The interface penalty increases with coupling and with the squared settlement gap.'}`);};a.addEventListener('input',update);b.addEventListener('input',update);update();return;
      }
      const buttons=[...w.querySelectorAll('[data-choice]')];
      const update=i=>{buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));out.innerHTML=renderChoice(kind,i);};
      buttons.forEach((b,i)=>b.addEventListener('click',()=>update(i)));update(0);
    });
    scroller.querySelectorAll('.rm-nav a').forEach(a=>a.addEventListener('click',e=>{const target=scroller.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}));
  }
  function prepare(layer,id) {
    const catalog=window.__researchPortfolio;
    if(!catalog || !catalog.papers[id]) return;
    const article=layer.querySelector('.case-article');
    if(!article) return;
    if(!article.classList.contains('rm-article')) {
      const status=document.createElement('div');status.className='rp-preserved-status';status.innerHTML=catalog.status(id,true);article.prepend(status);
      // Consolidate existing scope notes at the owner's requested single location.
      const limitations=[];
      const take=n=>{const t=n.textContent.trim();if(t&&!limitations.includes(t))limitations.push(t);n.remove();};
      article.querySelectorAll('.ca-disclaimer,.sc-illus').forEach(take);
      article.querySelectorAll('.ca-section').forEach(s=>{const h=s.querySelector('.ca-h');if(h&&h.textContent.trim()==='Research Boundaries'){s.querySelectorAll('p').forEach(n=>limitations.push(n.textContent.trim()));s.remove();}});
      article.querySelectorAll('.rs-note,.rs-cap,.rs-tnote,.rs-callout').forEach(n=>{if(/not final|not estimated|No estimated|Datasets are not named|not FDR-adjusted|not a joint path test|Conceptual, not|do not identify pre-crisis/.test(n.textContent))take(n);});
      if(id==='redsea') {
        const scopeSentences=[
          'The study does not construct a universal port-resilience index.',
          'The estimation sample should therefore be interpreted as a coverage-driven exact-match sample of larger and better-connected corridor ports rather than as all ports in the three corridors.',
          'A reported randomization value of 0.000 represents 0 of 200 exceedances under the unadjusted empirical rule, not an exact zero p-value.',
          'It should not be interpreted as a uniform increase in raw export volume.'
        ];
        article.querySelectorAll('.ca-p').forEach(n=>scopeSentences.forEach(sentence=>{if(n.textContent.includes(sentence)){limitations.push(sentence);n.innerHTML=n.innerHTML.replace(sentence,'');}}));
        article.querySelectorAll('.rs-cap').forEach(n=>{if(n.textContent.includes('Schematic, not to scale.')){n.innerHTML=n.innerHTML.replace('Schematic, not to scale.','');limitations.push('The route map is a schematic representation and is not drawn to scale.');}});
      }
      if(id==='redsea') limitations.push('The journal’s approximately 87% overall rejection figure is calculated as 100% minus its reported 13% acceptance rate for 2021. It is a historical overall measure, not a current desk-rejection rate.');
      if(id==='socialcapital')limitations.push('This research-assistant project presents the field-study design and illustrative behavioral mechanisms. Final treatment-effect estimates are not reported here.');
      if(id==='ailabor')limitations.push('The interactive model responses use normalized illustrative parameters. Structural estimation and empirical validation are in progress.');
      const section=document.createElement('section');section.className='rm-section rm-limitation';section.innerHTML='<h2>Limitation</h2>'+limitations.map(t=>'<p>'+catalog.esc(t)+'</p>').join('');article.appendChild(section);
    }
    const title=article.querySelector('h1');if(title){title.id='research-detail-title';layer.setAttribute('aria-labelledby',title.id);}
    layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');
  }
  window.__researchInteractions={init,prepare};
})();
