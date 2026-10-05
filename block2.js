// Gym App — Blocco 2 (8 settimane) — 75% calisthenics / 25% sala pesi
// Migrazione non distruttiva: conserva logs, pesi, impostazioni e storico.
(function(){
  const block2Plans=[
    {id:'mon-on',day:'LUN',mode:'ON',name:'A ON — Planche + Push + Gambe',focus:'Planche + forza calisthenics + tricipiti',exercises:[
      {id:'planche-hold',name:'Planche Hold / Progressione',sets:5,reps:'6–12s',rir:'2–3',rest:120,type:'skill',note:'Mantieni la variante finché 5×12s sono pulite; poi aumenta difficoltà.'},
      {id:'planche-lean-pushup',name:'Planche Lean Push-up',sets:3,reps:'6–10',rir:'1–2',rest:90,type:'strength',note:'Aumenta lean o reps senza perdere proiezione scapolare.'},
      {id:'weighted-dip',name:'Dip zavorrati',sets:4,reps:'5–8',rir:'1–2',rest:120,type:'strength',note:'+2–2,5 kg quando chiudi 4×8 pulite.'},
      {id:'hspu-prog-a',name:'HSPU Progression',sets:3,reps:'4–8',rir:'1–2',rest:90,type:'strength',note:'Pike → piedi rialzati → HSPU assistito → libero.'},
      {id:'hack-squat-a',name:'Hack Squat / Bulgarian Split Squat',sets:3,reps:'8–12',rir:'1–2',rest:120,type:'strength',note:'Doppia progressione.'},
      {id:'overhead-triceps-a',name:'Estensione tricipiti overhead al cavo',sets:3,reps:'10–15',rir:'1–2',rest:75,type:'hypertrophy',note:'Doppia progressione.'},
      {id:'pushdown-a',name:'Pushdown corda',sets:2,reps:'12–18',rir:'1–2',rest:60,type:'hypertrophy',note:'Doppia progressione.'}
    ]},
    {id:'tue-off',day:'MAR',mode:'OFF',name:'OFF — Planche + Mobilità',focus:'Micro-sessione Planche • RPE 3–5',exercises:[
      {id:'wrist-mob-a',name:'Mobilità polsi',sets:1,reps:'2–3 min',rir:'',rest:30,type:'mobility'},
      {id:'scap-protraction',name:'Scapular push-up + Protraction Hold',sets:2,reps:'10 + 15–20s',rir:'',rest:45,type:'mobility'},
      {id:'wall-slides-cars',name:'Wall Slides + Shoulder CARs',sets:2,reps:'8–10 + 5/lato',rir:'',rest:45,type:'mobility'},
      {id:'planche-prog',name:'Planche Progression Hold',sets:3,reps:'6–10s',rir:'',rest:90,type:'skill'},
      {id:'planche-lean',name:'Planche Lean',sets:2,reps:'15–20s',rir:'',rest:90,type:'skill'},
      {id:'lat-biceps-stretch',name:'Stretch dorsali + bicipiti/spalla',sets:2,reps:'30–45s',rir:'',rest:30,type:'mobility'}
    ]},
    {id:'wed-on',day:'MER',mode:'ON',name:'B ON — Muscle-up + Front Lever + Pull',focus:'Muscle-up + Front Lever + schiena + bicipiti',exercises:[
      {id:'muscle-up-skill',name:'Muscle-up Skill',sets:4,reps:'1–3',rir:'2–3',rest:180,type:'skill',note:'Pulite → più alte/esplosive → zavorra solo dopo.'},
      {id:'fl-progression',name:'Front Lever Hold / Progressione',sets:4,reps:'8–12s',rir:'2–3',rest:120,type:'skill',note:'Tuck → advanced tuck → one-leg → straddle assistita.'},
      {id:'fl-raises',name:'Front Lever Raises / Pulls',sets:3,reps:'3–6',rir:'2',rest:90,type:'skill',note:'Aumenta ROM o difficoltà prima del volume.'},
      {id:'weighted-pullup-b',name:'Pull-up zavorrate',sets:4,reps:'5–8',rir:'1–2',rest:120,load:12.5,type:'strength',note:'+2–2,5 kg quando chiudi 4×8.'},
      {id:'pulley-b',name:'Seated Cable Row / Pulley basso',sets:3,reps:'8–12',rir:'1–2',rest:90,type:'hypertrophy',note:'Doppia progressione; +2,5–5 kg quando chiudi 3×12.'},
      {id:'ez-curl',name:'Curl EZ',sets:3,reps:'8–12',rir:'1–2',rest:75,type:'hypertrophy',note:'Doppia progressione.'},
      {id:'hammer-curl-b',name:'Hammer Curl',sets:3,reps:'10–15',rir:'1–2',rest:60,type:'hypertrophy',note:'Doppia progressione.'}
    ]},
    {id:'thu-off',day:'GIO',mode:'OFF',name:'OFF — Front Lever + Mobilità',focus:'Micro-sessione Front Lever • RPE 3–5',exercises:[
      {id:'fl-active-hang',name:'Scapular Pull-up + Active Hang',sets:2,reps:'8 + 15–20s',rir:'',rest:60,type:'mobility'},
      {id:'fl-easy',name:'Front Lever Progression Hold',sets:3,reps:'5–8s',rir:'',rest:90,type:'skill'},
      {id:'fl-scap-pull',name:'Front Lever Scapular Pulls',sets:2,reps:'4–6',rir:'',rest:60,type:'skill'},
      {id:'shoulder-lat-mob',name:'Mobilità flessione spalla + dorsali',sets:2,reps:'30–45s',rir:'',rest:30,type:'mobility'},
      {id:'wrist-chest-mob',name:'Mobilità polsi + apertura torace',sets:2,reps:'30–45s',rir:'',rest:30,type:'mobility'}
    ]},
    {id:'fri-on',day:'VEN',mode:'ON',name:'C ON — Handstand + Gambe + Braccia',focus:'Handstand + HSPU + gambe + braccia',exercises:[
      {id:'handstand',name:'Handstand libero',sets:5,reps:'20–40s / 5–8 tentativi',rir:'',rest:90,type:'skill',note:'Più tempo libero e meno assistenza; qualità > durata.'},
      {id:'hspu-wall',name:'HSPU Negative / Progression',sets:4,reps:'3–6',rir:'2',rest:90,type:'strength',note:'Riduci assistenza o aumenta ROM.'},
      {id:'pseudo-planche-c',name:'Pseudo Planche Push-up',sets:3,reps:'6–10',rir:'1–2',rest:90,type:'strength',note:'Aumenta lean o reps.'},
      {id:'hack-squat-c',name:'Hack Squat',sets:4,reps:'8–12',rir:'1–2',rest:120,type:'strength',note:'Doppia progressione.'},
      {id:'leg-curl',name:'Leg Curl',sets:3,reps:'10–15',rir:'1–2',rest:75,type:'hypertrophy',note:'Doppia progressione.'},
      {id:'arms-superset-c1',name:'Superset: Curl cavo + Pushdown',sets:3,reps:'10–15 + 10–15',rir:'1–2',rest:60,type:'hypertrophy',note:'Doppia progressione.'},
      {id:'arms-superset-c2',name:'Superset: Hammer Curl + Estensione tricipiti',sets:2,reps:'12–15 + 12–15',rir:'1–2',rest:60,type:'hypertrophy',note:'Doppia progressione.'}
    ]}
  ];

  const progression=[
    ['1','Accumulo tecnico','Planche: 5×6–8s','FL: 4×8s','MU: transizioni/negative pulite','RIR 2–3'],
    ['2','Volume','Planche: 5×8–10s','FL: 4×9–10s','MU: 4×2','Aggiungi reps'],
    ['3','Consolidamento','Planche: 5×10–12s','FL: 4×10–12s','MU: 4×2–3','Top range'],
    ['4','Deload tecnico','Planche: −20/30% volume','FL: −20/30% volume','MU: 3×1–2','RIR 3–4'],
    ['5','Intensificazione','Planche: variante più difficile se pronta','FL: variante più difficile se pronta','MU: più esplosività','Riparti basso nel range'],
    ['6','Intensificazione','Planche: 5×6–10s','FL: 4×8–10s','MU: 4×1–3','Progressione carico'],
    ['7','Picco tecnico','Planche: 5×8–12s pulite','FL: 4×10–12s pulite','MU: 4×1–3 qualità massima','Top performance'],
    ['8','Test / assestamento','Test tenuta/variante','Test tenuta/variante','Test reps pulite','Riduci volume se serve']
  ];

  // Versione 5 = Blocco 2. Sostituisce solo la scheda, mai lo storico.
  if(typeof state!=='undefined' && (Number(state.planVersion)||0)<5){
    state.plans=block2Plans;
    state.planVersion=5;
    state.block2Week=1;
    if(typeof save==='function') save();
  }

  document.title='Gym App 2.0 • Block 2';

  function addBlock2Card(){
    const section=document.getElementById('plans');
    if(!section || document.getElementById('block2Progression')) return;
    const card=document.createElement('div');
    card.className='card'; card.id='block2Progression';
    const week=Math.max(1,Math.min(8,Number(state.block2Week)||1));
    const row=progression[week-1];
    card.innerHTML='<div class="row between"><div><div class="eyebrow">BLOCCO 2 • 8 SETTIMANE</div><h3 style="margin:4px 0">Settimana '+week+' — '+row[1]+'</h3></div><div class="row"><button class="secondary" id="b2Prev">−</button><span class="chip accent">'+week+'/8</span><button class="secondary" id="b2Next">＋</button></div></div>'+
      '<div class="list" style="margin-top:10px"><div class="suggest">'+row[2]+'</div><div class="suggest">'+row[3]+'</div><div class="suggest">'+row[4]+'</div><div class="muted small">Forza/ipertrofia: '+row[5]+'</div></div>';
    const firstCard=section.querySelector('.card');
    if(firstCard) section.insertBefore(card,firstCard); else section.appendChild(card);
    card.querySelector('#b2Prev').onclick=()=>{state.block2Week=Math.max(1,week-1);save();card.remove();addBlock2Card();};
    card.querySelector('#b2Next').onclick=()=>{state.block2Week=Math.min(8,week+1);save();card.remove();addBlock2Card();};
  }

  function refreshStaticText(){
    const section=document.getElementById('plans');
    if(!section)return;
    section.querySelectorAll('p').forEach(p=>{
      if(p.textContent.includes('Muscle-up escluso')) p.textContent='Sabato e domenica: riposo. Blocco 2: skill prioritarie Muscle-up, Front Lever, Planche e Handstand. Micro-sessioni OFF a RPE 3–5, senza cedimento.';
    });
  }

  if(typeof renderPlans==='function'){
    const originalRenderPlans=renderPlans;
    renderPlans=function(){originalRenderPlans();addBlock2Card();refreshStaticText();};
  }
  if(typeof renderHome==='function') renderHome();
  if(typeof renderPlans==='function' && document.getElementById('plans')?.classList.contains('active')) renderPlans();
})();
