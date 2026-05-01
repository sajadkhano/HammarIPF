"use strict";
// ===== NAV HISTORY =====
var navHistory=[],navIdx=-1,navLock=false;
function histPush(t){if(navLock)return;if(navIdx<navHistory.length-1)navHistory=navHistory.slice(0,navIdx+1);navHistory.push(t);navIdx=navHistory.length-1}
function histBack(){if(navIdx>0){navLock=true;navIdx--;switchTab(navHistory[navIdx]);navLock=false}}
function histFwd(){if(navIdx<navHistory.length-1){navLock=true;navIdx++;switchTab(navHistory[navIdx]);navLock=false}}
// patch switchTab
var _origSwitch=switchTab;
switchTab=function(t){_origSwitch(t);histPush(t)};

// ===== SAVE PANEL AS IMAGE =====
function savePanel(id){
  var el=document.getElementById(id);if(!el)return;
  if(typeof html2canvas==='undefined'){showToast('html2canvas not loaded');return}
  showToast('Processing image... please wait');
  // Temporary fix for scrolling issue with html2canvas
  window.scrollTo(0,0);
  html2canvas(el,{backgroundColor:'#1a2030', scale:2, useCORS:true, allowTaint:false}).then(function(c){
    var a=document.createElement('a');
    a.download='Hammar_'+id+'_'+Date.now()+'.png';
    a.href=c.toDataURL('image/png');
    a.click();
    showToast('Saved as image!');
  }).catch(function(err){
    showToast('Error saving image');
    console.error(err);
  });
}
function showToast(msg){var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2500)}

// ===== ENTER KEY =====
document.addEventListener('keydown',function(e){
  if(e.key!=='Enter')return;
  var active=document.querySelector('.tab-panel.active');if(!active)return;
  var id=active.id;
  if(id==='tab-separator')calcSeparator();
  else if(id==='tab-gas')calcGas();
  else if(id==='tab-oil')calcOil();
  else if(id==='tab-water')calcWater();
  else if(id==='tab-chemical')calcChemical();
  else if(id==='tab-storage')calcStorage();
});

// ===== EQUATIONS PANEL =====
var equations=[
  {name:'Retention Time',std:'API 12J',formula:'t = V_liquid / Q_liquid',desc:'Liquid retention time in separator vessel',
   vars:[['V_liquid','60','m³'],['Q_liquid','5000','bpd']],
   calc:function(v){var Qm3=v[1]*0.15898/1440;return Qm3>0?(v[0]/Qm3).toFixed(2)+' min':'N/A'}},
  {name:'Stokes Law Settling',std:'API 12J',formula:'V_t = (Δρ × g × d²) / (18 × μ)',desc:'Terminal settling velocity for droplet separation',
   vars:[['Δρ (lb/ft³)','12','lb/ft³'],['d (micron)','150','μm'],['μ (cp)','3.5','cp']],
   calc:function(v){var df=v[1]*1e-6*3.281;var vt=(v[0]*32.174*df*df)/(18*v[2]*6.72e-4);return (vt*12).toFixed(4)+' in/s'}},
  {name:'Souders-Brown',std:'API 12J / GPSA',formula:'V_max = K × √((ρ_L - ρ_G) / ρ_G)',desc:'Maximum allowable gas velocity in separator',
   vars:[['K factor','0.35','—'],['ρ_L (lb/ft³)','53.5','lb/ft³'],['ρ_G (lb/ft³)','0.5','lb/ft³']],
   calc:function(v){return (v[0]*Math.sqrt((v[1]-v[2])/v[2])).toFixed(3)+' ft/s'}},
  {name:'Oil Density from API',std:'API / ASTM D287',formula:'SG = 141.5 / (API + 131.5)',desc:'Specific gravity from API gravity',
   vars:[['API Gravity','32','°API']],
   calc:function(v){var sg=141.5/(v[0]+131.5);return 'SG = '+sg.toFixed(4)+' | ρ = '+(sg*62.4).toFixed(2)+' lb/ft³'}},
  {name:'GOR Calculation',std:'Field Units',formula:'GOR = (Q_gas × 10⁶) / Q_oil',desc:'Gas-Oil Ratio in standard cubic feet per barrel',
   vars:[['Q_gas (MMSCFD)','50','MMSCFD'],['Q_oil (bpd)','25000','bpd']],
   calc:function(v){return v[1]>0?((v[0]*1e6)/v[1]).toFixed(1)+' SCF/bbl':'N/A'}},
  {name:'Water Cut',std:'Field Units',formula:'WC = Q_water / (Q_oil + Q_water) × 100',desc:'Water cut percentage',
   vars:[['Q_water (bpd)','10000','bpd'],['Q_oil (bpd)','25000','bpd']],
   calc:function(v){var t=v[0]+v[1];return t>0?((v[0]/t)*100).toFixed(2)+' %':'N/A'}},
  {name:'Darcy Flow',std:'API / Darcy',formula:'Q = (k × A × ΔP) / (μ × L)',desc:'Flow rate through porous media',
   vars:[['k (mD)','100','mD'],['A (ft²)','10','ft²'],['ΔP (psi)','500','psi'],['μ (cp)','3.5','cp'],['L (ft)','1000','ft']],
   calc:function(v){var q=(v[0]*v[1]*v[2])/(v[3]*v[4]);return q.toFixed(4)+' bbl/day (simplified)'}},
  {name:'Heater Duty',std:'API / ASTM',formula:'Q = ṁ × Cp × ΔT',desc:'Heat duty for oil heating',
   vars:[['Q_oil (bpd)','25000','bpd'],['ρ (lb/ft³)','53.5','lb/ft³'],['ΔT (°F)','50','°F']],
   calc:function(v){var m=v[0]*5.615*v[1]/24;var duty=m*0.5*v[2]/1e6;return duty.toFixed(3)+' MMBTU/hr'}},
  {name:'Chemical Dose Rate',std:'Field Units',formula:'Rate = Q_L × 158.98 × dose / 10⁶',desc:'Chemical injection rate from ppm dosage',
   vars:[['Q_liquid (bpd)','35000','bpd'],['Dose (ppm)','15','ppm']],
   calc:function(v){var ld=v[0]*158.98*v[1]/1e6;return ld.toFixed(3)+' L/day | '+(ld/24).toFixed(4)+' L/hr'}},
  {name:'Z-Factor (Approx)',std:'Hall-Yarborough',formula:'Z = f(T_pr, P_pr)',desc:'Gas compressibility factor approximation',
   vars:[['SG_gas','0.75','—'],['P (psig)','150','psig'],['T (°F)','120','°F']],
   calc:function(v){var Tpc=168+325*v[0]-12.5*v[0]*v[0];var Ppc=677+15*v[0]-37.5*v[0]*v[0];var Tpr=(v[2]+460)/Tpc;var Ppr=(v[1]+14.7)/Ppc;var Z=1-(3.53*Ppr)/(Math.pow(10,0.9813*Tpr))+0.274*Ppr*Ppr/(Math.pow(10,0.8157*Tpr));Z=Math.max(0.3,Math.min(1.2,Z));return 'Z = '+Z.toFixed(4)}},
  {name:'Compression Ratio',std:'GPSA / API 618',formula:'CR = P_discharge / P_suction',desc:'Overall and per-stage compression ratio',
   vars:[['P_suction (psig)','150','psig'],['P_discharge (psig)','1000','psig']],
   calc:function(v){var cr=(v[1]+14.7)/(v[0]+14.7);var n=Math.max(1,Math.ceil(Math.log(cr)/Math.log(3.5)));return 'CR = '+cr.toFixed(2)+':1 | Stages: '+n+' | Per stage: '+Math.pow(cr,1/n).toFixed(2)+':1'}},
  {name:'Skim Tank Volume',std:'API 421',formula:'V = Q × t_ret',desc:'Required skim tank volume for water treatment',
   vars:[['Q_water (bpd)','10000','bpd'],['t_ret (min)','15','min']],
   calc:function(v){var qf=v[0]*5.615/1440;var vol=qf*v[1];return vol.toFixed(2)+' ft³ | '+(vol*0.178107).toFixed(2)+' bbl'}}
];

function renderEquations(){
  var g=document.getElementById('eqGrid');if(!g)return;g.innerHTML='';
  equations.forEach(function(eq,ei){
    var h='<div class="eq-card"><h3>'+eq.name+' <span style="font-size:10px;color:#8896a6;font-weight:400">'+eq.std+'</span></h3>';
    h+='<div class="eq-formula">'+eq.formula+'</div>';
    h+='<div class="eq-desc">'+eq.desc+'</div>';
    h+='<div class="eq-inputs">';
    eq.vars.forEach(function(v,vi){
      h+='<label>'+v[0]+'<input type="number" id="eq-'+ei+'-'+vi+'" value="'+v[1]+'" step="any"><span>'+v[2]+'</span></label>';
    });
    h+='</div>';
    h+='<button class="eq-calc-btn" onclick="calcEq('+ei+')">Calculate</button>';
    h+='<div class="eq-result" id="eq-res-'+ei+'">—</div></div>';
    g.innerHTML+=h;
  });
}
function calcEq(i){
  var eq=equations[i];var vals=[];
  eq.vars.forEach(function(v,vi){vals.push(parseFloat(document.getElementById('eq-'+i+'-'+vi).value)||0)});
  document.getElementById('eq-res-'+i).textContent=eq.calc(vals);
}

// ===== DETAILED PROCESS DIAGRAM =====
var equipInfo={
  wellhead:{name:'Wellhead / Christmas Tree',desc:'Production wellhead assembly including tubing hanger, casing head, and choke valve. Controls well flow and provides primary pressure reduction. Typical pressure: 1500-3000 psig.'},
  manifold:{name:'Production Manifold',desc:'Collects production from multiple wells and distributes to processing trains. Includes test headers, emergency shutdown valves (ESDVs), and flow measurement.'},
  hpsep:{name:'HP Separator (1st Stage)',desc:'High-pressure three-phase separator. Separates gas, oil, and water at operating pressure 100-200 psig. Designed per API 12J with Souders-Brown and Stokes criteria.'},
  lpsep:{name:'LP Separator (2nd Stage)',desc:'Low-pressure three-phase separator operating at 30-75 psig. Further separates dissolved gas and provides additional water-oil separation. Longer retention time.'},
  gasplant:{name:'Gas Treatment Plant',desc:'Includes gas sweetening (amine unit), dehydration (TEG), and compression. Removes H₂S, CO₂, and water vapor to meet sales gas specifications per GPSA standards.'},
  heater:{name:'Heater Treater / Steam',desc:'Provides heat to reduce oil viscosity and break emulsions. Typical outlet temperature 140-160°F. Duty calculated per API standards. May use direct-fired or steam coils.'},
  desalter:{name:'Electrostatic Desalter',desc:'Removes salt from crude oil using wash water and high-voltage electrostatic field (15-25 kV). Reduces salt content to <10 PTB for export specifications.'},
  demulinj:{name:'Demulsifier Injection',desc:'Chemical injection point for demulsifier/emulsion breaker. Typical dose 5-30 ppm. Breaks water-in-oil emulsions to facilitate separation in downstream vessels.'},
  corrinj:{name:'Corrosion Inhibitor Injection',desc:'Injects corrosion inhibitor to protect piping and vessels. Film-forming amines typical at 5-15 ppm. Critical for high H₂S/CO₂ environments.'},
  watertreat:{name:'Water Treatment (WOSEP/CPI)',desc:'Produced water treatment including skim tanks, corrugated plate interceptors (CPI), and hydrocyclones. Reduces oil-in-water to <40 ppm for disposal/reinjection.'},
  storage:{name:'Crude Storage Tanks',desc:'Atmospheric storage tanks per API 650. Fixed or floating roof design. Provides buffer between production and export. Typical capacity: 500,000-1,000,000 bbl.'},
  export:{name:'Export / Loading',desc:'Export pumps, custody transfer metering (per API MPMS), and loading facilities. Includes LACT units with BS&W analyzers and fiscal metering.'}
};

function renderDetailDiagram(){
  var w=document.getElementById('detailDiagramWrap');if(!w)return;
  var svg='<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:800px">';
  // Background
  svg+='<rect width="1200" height="600" fill="#f8fafb" rx="12"/>';
  svg+='<text x="600" y="30" text-anchor="middle" fill="#1a2030" font-size="14" font-weight="700" font-family="Inter,sans-serif">HAMMAR IPF — Complete Process Flow Diagram (Wellhead → Export)</text>';
  // Phase color legend
  svg+='<g transform="translate(30,560)"><rect width="14" height="8" rx="2" fill="#3d2200"/><text x="20" y="8" fill="#4a5568" font-size="9" font-family="Inter">Oil</text>';
  svg+='<rect x="60" width="14" height="8" rx="2" fill="#0a8a3e"/><text x="80" y="8" fill="#4a5568" font-size="9" font-family="Inter">Gas</text>';
  svg+='<rect x="120" width="14" height="8" rx="2" fill="#0066aa"/><text x="140" y="8" fill="#4a5568" font-size="9" font-family="Inter">Water</text>';
  svg+='<rect x="190" width="14" height="8" rx="2" fill="#c2185b"/><text x="210" y="8" fill="#4a5568" font-size="9" font-family="Inter">Chemical</text></g>';

  function node(x,y,w,h,color,key,label,icon){
    return '<g class="svg-node" style="cursor:pointer" onclick="showEquipInfo(\''+key+'\',event)">'
      +'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="#fff" stroke="'+color+'" stroke-width="2"/>'
      +'<text x="'+(x+w/2)+'" y="'+(y+h/2-6)+'" text-anchor="middle" fill="'+color+'" font-size="20">'+icon+'</text>'
      +'<text x="'+(x+w/2)+'" y="'+(y+h/2+12)+'" text-anchor="middle" fill="#1a2030" font-size="9" font-weight="700" font-family="Inter,sans-serif">'+label+'</text></g>';
  }
  function arrow(x1,y1,x2,y2,color,dash){
    var d=dash?' stroke-dasharray="6,3"':'';
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="3"'+d+'>'
      +'<animate attributeName="stroke-dashoffset" from="9" to="0" dur="1s" repeatCount="indefinite"/></line>';
  }

  // Nodes - row 1 (main process)
  svg+=node(30,200,90,70,'#3d2200','wellhead','WELLHEAD','🛢️');
  svg+=arrow(120,235,160,235,'#3d2200',true);
  svg+=node(165,200,90,70,'#e68a00','manifold','MANIFOLD','📡');
  svg+=arrow(255,235,295,235,'#3d2200',true);
  svg+=node(300,195,130,80,'#0a8a3e','hpsep','HP SEPARATOR','⚙️');
  svg+=arrow(430,235,470,235,'#3d2200',true);
  svg+=node(475,195,130,80,'#0a8a3e','lpsep','LP SEPARATOR','⚙️');
  svg+=arrow(605,235,645,235,'#3d2200',true);
  svg+=node(650,200,90,70,'#e68a00','heater','HEATER','🔥');
  svg+=arrow(740,235,780,235,'#3d2200',true);
  svg+=node(785,200,100,70,'#9c27b0','desalter','DESALTER','⚡');
  svg+=arrow(885,235,925,235,'#3d2200',true);
  svg+=node(930,200,90,70,'#e68a00','storage','STORAGE','🏗️');
  svg+=arrow(1020,235,1060,235,'#3d2200',false);
  svg+=node(1065,200,100,70,'#0a8a3e','export','EXPORT','🚢');

  // Gas treatment (top)
  svg+=arrow(365,195,365,110,'#0a8a3e',true);
  svg+=node(310,50,110,60,'#0a8a3e','gasplant','GAS TREATMENT','🔥');
  svg+=arrow(540,195,540,110,'#0a8a3e',true);
  svg+='<line x1="420" y1="80" x2="540" y2="80" stroke="#0a8a3e" stroke-width="2" stroke-dasharray="4,3"/>';

  // Water treatment (bottom)
  svg+=arrow(540,275,540,370,'#0066aa',true);
  svg+=node(490,375,110,60,'#0066aa','watertreat','WATER TREAT','💧');

  // Chemical injection
  svg+=node(300,420,90,50,'#c2185b','demulinj','DEMULSIFIER','🧪');
  svg+='<line x1="345" y1="420" x2="345" y2="275" stroke="#c2185b" stroke-width="1.5" stroke-dasharray="4,3"><animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.2s" repeatCount="indefinite"/></line>';
  svg+=node(680,420,90,50,'#c2185b','corrinj','CORR. INH.','🧪');
  svg+='<line x1="725" y1="420" x2="725" y2="270" stroke="#c2185b" stroke-width="1.5" stroke-dasharray="4,3"><animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.2s" repeatCount="indefinite"/></line>';

  svg+='</svg>';
  w.innerHTML=svg;
}

function showEquipInfo(key,evt){
  var info=equipInfo[key];if(!info)return;
  var popup=document.getElementById('equipPopup');if(!popup)return;
  popup.innerHTML='<h4>'+info.name+'</h4><p>'+info.desc+'</p>';
  popup.classList.add('show');
  var rect=evt.target.closest('.svg-node').getBoundingClientRect();
  var wrap=document.getElementById('tab-diagram').getBoundingClientRect();
  popup.style.left=Math.min(rect.left-wrap.left,wrap.width-320)+'px';
  popup.style.top=(rect.bottom-wrap.top+8)+'px';
  setTimeout(function(){popup.classList.remove('show')},5000);
  document.addEventListener('click',function h(e){if(!popup.contains(e.target)){popup.classList.remove('show');document.removeEventListener('click',h)}},{once:false});
}

// ===== ENHANCED CHEM DONUT =====
var _origCalcChem=calcChemical;
calcChemical=function(){
  _origCalcChem();
  // Build additives donut with field units
  var Ql=parseFloat(document.getElementById('chem-Ql').value)||0;
  var chems=[
    {name:'Demulsifier',id:'chem-demul',color:'#0066aa'},
    {name:'Corrosion Inh.',id:'chem-corr',color:'#0a8a3e'},
    {name:'Scale Inh.',id:'chem-scale',color:'#e68a00'},
    {name:'H₂S Scavenger',id:'chem-h2s',color:'#c2185b'},
    {name:'Biocide',id:'chem-bio',color:'#9c27b0'},
    {name:'O₂ Scavenger',id:'chem-o2',color:'#3498db'},
    {name:'PPD',id:'chem-ppd',color:'#f39c12'}
  ];
  var legend='<div class="additives-legend">';
  chems.forEach(function(c){
    var dose=parseFloat(document.getElementById(c.id).value)||0;
    var galDay=Ql*158.98*dose/1e6*0.264172;
    legend+='<div class="additives-legend-item"><div class="additives-legend-dot" style="background:'+c.color+'"></div>'+c.name+' ('+dose+' ppm)<span class="additives-legend-val">'+galDay.toFixed(2)+' gal/day</span></div>';
  });
  legend+='</div>';
  // Add legend after chart
  var chartBox=document.getElementById('chartChem');
  if(chartBox){
    var wrap=chartBox.closest('.chart-box');
    var existing=wrap.querySelector('.additives-chart-wrap');
    if(existing)existing.remove();
    var div=document.createElement('div');div.className='additives-chart-wrap';
    div.innerHTML=legend;wrap.appendChild(div);
  }
};

// ===== SIMULATION MODE =====
var simActive = false;
var simInterval = null;

function toggleSimulation() {
  simActive = !simActive;
  var btn = document.getElementById('simBtn');
  var t = i18n[currentLang];
  if (simActive) {
    btn.classList.add('active');
    btn.textContent = t.sim_on;
    simInterval = setInterval(runSimulationStep, 2000);
    showToast(currentLang === 'ar' ? 'بدأ وضع المحاكاة' : 'Simulation Mode Started');
  } else {
    btn.classList.remove('active');
    btn.textContent = t.sim_off;
    clearInterval(simInterval);
    showToast(currentLang === 'ar' ? 'توقف وضع المحاكاة' : 'Simulation Mode Stopped');
  }
}

function runSimulationStep() {
  // Slightly fluctuate inputs
  var inputs = ['sep-P', 'sep-T', 'sep-Qo', 'sep-Qg'];
  inputs.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var val = parseFloat(el.value);
    var change = (Math.random() - 0.5) * (val * 0.02); // 2% fluctuation
    el.value = (val + change).toFixed(2);
  });
  
  // Re-calculate everything
  calcSeparator();
  calcGas();
  calcOil();
  calcWater();
  
  // Check for alarms
  checkAlarms();
  
  // Update PID if active
  if (simActive) simulatePIDLevel();
}

// ===== ALARMS SYSTEM =====
var alarms = [];

function checkAlarms() {
  var p = parseFloat(document.getElementById('sep-P').value);
  var q = parseFloat(document.getElementById('sep-Qo').value);
  
  var newAlarms = [];
  if (p > 180) newAlarms.push({ msg: 'High Pressure Alert: > 180 psig', level: 'critical' });
  if (p < 100) newAlarms.push({ msg: 'Low Pressure Warning: < 100 psig', level: 'warning' });
  if (q > 40000) newAlarms.push({ msg: 'High Production Load: > 40k bpd', level: 'warning' });

  // Update UI
  renderAlarms(newAlarms);
}

function renderAlarms(currentAlarms) {
  var list = document.getElementById('alarmList');
  var count = document.getElementById('alarmCount');
  list.innerHTML = '';
  
  currentAlarms.forEach(function(a) {
    var item = document.createElement('div');
    item.className = 'alarm-item ' + (a.level === 'warning' ? 'warning' : '');
    item.innerHTML = '<span class="alarm-time">' + new Date().toLocaleTimeString() + '</span>' +
                     '<strong>' + a.msg + '</strong>';
    list.appendChild(item);
  });
  
  count.textContent = currentAlarms.length;
  if (currentAlarms.length > 0) {
    document.getElementById('alarmPanel').classList.remove('minimized');
  }
}

// ===== PID CONTROL LOGIC =====
var pidLevel = 50;
var pidTarget = 50;
var pidValve = 50;

function updatePID() {
  pidValve = document.getElementById('pidValveSlider').value;
  document.getElementById('pidValveVal').textContent = pidValve + '%';
  // Adjust level based on valve (simple inverse relationship for demo)
  // In reality, this would be a differential equation
}

function simulatePIDLevel() {
  // Simple simulation: inflow is constant, outflow depends on valve
  var inflow = 5;
  var outflow = pidValve / 10;
  pidLevel += (inflow - outflow);
  pidLevel = Math.max(0, Math.min(100, pidLevel));
  
  // Update UI
  document.getElementById('pidLevelRect').setAttribute('height', (1.3 * pidLevel));
  document.getElementById('pidLevelRect').setAttribute('y', 140 - (1.3 * pidLevel));
  document.getElementById('pidLevelText').textContent = Math.round(pidLevel) + '%';
  
  var ret = (pidLevel / 100) * 6; // Mapping level to retention time
  document.getElementById('pidRetentionVal').textContent = ret.toFixed(2);

  // Animate 3D Isometric View if active
  var iso = document.querySelector('.isometric-sep svg');
  var liq = document.getElementById('isoLiquid');
  if(iso && liq) {
    var scale = 1 + (Math.sin(Date.now() / 500) * 0.01);
    iso.style.transform = 'scale(' + scale + ') rotateX(5deg)';
    
    // Animate liquid height in 3D
    var h = (pidLevel / 100) * 70; // Map level to SVG height
    liq.setAttribute('d', 'M45,' + (130 - h) + ' L155,' + (130 - h) + ' L155,130 L45,130 Z');
    
    var color = pidLevel > 80 ? '#ff5252' : pidLevel < 20 ? '#ffab40' : '#00f0ff';
    iso.querySelector('path[stroke-width="2"]').setAttribute('stroke', color);
  }
}

function autoPID() {
  showToast('Auto PID: Adjusting Valve to reach 50%');
  var interval = setInterval(function() {
    if (pidLevel > 51) pidValve = Math.min(100, parseInt(pidValve) + 2);
    else if (pidLevel < 49) pidValve = Math.max(0, parseInt(pidValve) - 2);
    else {
      clearInterval(interval);
      showToast('Level Stabilized at 50%');
    }
    document.getElementById('pidValveSlider').value = pidValve;
    updatePID();
  }, 200);
}

// ===== PDF REPORT EXPORT =====
function exportPDF() {
  showToast('Generating Daily Production Report...');
  
  var reportWindow = window.open('', '_blank');
  var content = document.getElementById('tab-overview').innerHTML;
  var styles = document.head.innerHTML;
  
  reportWindow.document.write('<html><head>' + styles + '<style>body{background:#fff;padding:40px;}.panel-nav,.save-btn{display:none;}</style></head><body>');
  reportWindow.document.write('<h1>Hammar IPF - Daily Production Report</h1>');
  reportWindow.document.write('<p>Generated on: ' + new Date().toLocaleString() + '</p>');
  reportWindow.document.write(content);
  reportWindow.document.write('</body></html>');
  
  setTimeout(function() {
    reportWindow.print();
    // reportWindow.close();
  }, 1000);
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  var isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('hammarTheme', isDark ? 'dark' : 'light');
  showToast(isDark ? 'Dark Mode Active' : 'Light Mode Active');
}

// ===== VOICE CONTROL (EXPERIMENTAL) =====
var voiceActive = false;
var recognition = null;

function toggleVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    showToast('Voice control not supported in this browser');
    return;
  }
  
  voiceActive = !voiceActive;
  var btn = document.getElementById('voiceBtn');
  
  if (voiceActive) {
    btn.classList.add('active');
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
    
    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    };
    
    recognition.start();
    showToast('Voice Command: Listening...');
  } else {
    btn.classList.remove('active');
    if (recognition) recognition.stop();
    showToast('Voice Command: OFF');
  }
}

function handleVoiceCommand(cmd) {
  console.log('Voice Command:', cmd);
  var t = i18n[currentLang];
  
  if (cmd.includes('overview') || cmd.includes('نظرة عامة')) switchTab('overview');
  if (cmd.includes('calc') || cmd.includes('حاسبة')) switchTab('separator');
  if (cmd.includes('report') || cmd.includes('تقرير')) exportPDF();
  if (cmd.includes('simulation') || cmd.includes('محاكاة')) toggleSimulation();
  
  // Advanced Simulation Commands
  if (cmd.includes('set pressure to') || cmd.includes('ضبط الضغط على')) {
    var num = cmd.match(/\d+/);
    if(num) {
      document.getElementById('sep-P').value = num[0];
      calcSeparator();
      showToast('Pressure set to ' + num[0] + ' psig');
    }
  }
  
  if (cmd.includes('emergency stop') || cmd.includes('توقف اضطراري')) {
    simActive = true; toggleSimulation(); // This will turn it off if active
    showToast('EMERGENCY STOP EXECUTED', 'critical');
  }
}

// ===== ROLE BASED UI =====
function applyRole(role) {
  console.log("Applying Role:", role);
  var sel = document.getElementById('roleSelect');
  if(sel) sel.value = role;
  
  if(role === "Operator") {
    // Disable some sensitive inputs for Operators
    document.querySelectorAll('.edit-cell, .sts-select').forEach(el => {
      if(!el.id.includes('pid')) el.disabled = true;
    });
    showToast('Logged in as Operator (Read-Only Mode)');
  } else if(role === "Administrator") {
    showToast('Administrator Mode: Full Control Granted');
  }
}

// ===== DATA HISTORY LOGGING =====
function logProduction() {
  var p = val("sep-P");
  var q = val("sep-Qo");
  var log = {
    time: new Date().toISOString(),
    pressure: p,
    oil: q,
    user: 'Engineer'
  };
  var history = JSON.parse(localStorage.getItem('hammarHistory') || '[]');
  history.push(log);
  if (history.length > 100) history.shift(); // Keep last 100
  localStorage.setItem('hammarHistory', JSON.stringify(history));
}

// ===== INIT NEW FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
  histPush('overview');
  renderEquations();
  renderDetailDiagram();
  // Minimize alarms by default
  document.getElementById('alarmPanel').classList.add('minimized');
  
  // Load Role if exists
  var savedRole = sessionStorage.getItem('hammar_role');
  if(savedRole) applyRole(savedRole);

  // Load Theme
  if (localStorage.getItem('hammarTheme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Auto-log every 5 minutes if simulation is on
  setInterval(function() {
    if (simActive) logProduction();
  }, 300000);
});
