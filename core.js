"use strict";
// ===== i18n SYSTEM =====
var currentLang='en';
var i18n={
  en:{overview_title:'Plant Overview — Process Flow Schematic',svg_wellhead:'WELLHEAD',svg_manifold:'MANIFOLD',svg_hpsep:'HP SEPARATOR',svg_lpsep:'LP SEPARATOR',svg_gas:'GAS TREATMENT',svg_gasexp:'GAS EXPORT',svg_oil:'OIL TREATMENT',svg_water:'WATER TREATMENT',svg_storage:'STORAGE',svg_export:'EXPORT',svg_chem:'CHEMICAL INJ.',svg_leg_oil:'Oil Flow',svg_leg_gas:'Gas Flow',svg_leg_water:'Water Flow',svg_leg_chem:'Chemical Inj.',
    nav_overview:'🏭 Overview',nav_separator:'⚙️ Separator Calc',nav_trains:'🚂 Production Trains',nav_gas:'🔥 Gas Treatment',nav_oil:'🛢️ Oil Treatment',nav_water:'💧 Water Treatment',nav_chemical:'🧪 Chemical Injection',nav_storage:'🏗️ Storage & Export',nav_charts:'📈 Charts',nav_equations:'📐 Equations',nav_diagram:'🔍 Process Diagram',nav_control:'🎮 Control Panel',
    btn_lang:'العربية',success_msg:'✅ All systems are stable. Mass balance and chemical injection rates are automatically updated based on live input.',
    status_online:'ONLINE',alarms_title:'System Alarms',pid_title:'PID Level Control — HP Separator',pid_valve:'Liquid Outflow Valve (%)',pid_retention:'Retention Time (min)',pid_auto:'Auto Target 50%',
    sim_on:'⏹️ Live: ON',sim_off:'▶️ Live: OFF'},
  ar:{overview_title:'نظرة عامة على المحطة — مخطط العمليات',svg_wellhead:'رأس البئر',svg_manifold:'المانيفولد',svg_hpsep:'عازل ض. عالي',svg_lpsep:'عازل ض. واطئ',svg_gas:'معالجة الغاز',svg_gasexp:'تصدير الغاز',svg_oil:'معالجة النفط',svg_water:'معالجة الماء',svg_storage:'الخزانات',svg_export:'التصدير',svg_chem:'حقن كيمياوي',svg_leg_oil:'تدفق النفط',svg_leg_gas:'تدفق الغاز',svg_leg_water:'تدفق الماء',svg_leg_chem:'حقن كيمياوي',
    nav_overview:'🏭 نظرة عامة',nav_separator:'⚙️ حاسبة العازل',nav_trains:'🚂 قطارات الإنتاج',nav_gas:'🔥 معالجة الغاز',nav_oil:'🛢️ معالجة النفط',nav_water:'💧 معالجة الماء',nav_chemical:'🧪 الحقن الكيمياوي',nav_storage:'🏗️ الخزن والتصدير',nav_charts:'📈 الرسوم البيانية',nav_equations:'📐 المعادلات',nav_diagram:'🔍 مخطط تفصيلي',nav_control:'🎮 لوحة السيطرة',
    btn_lang:'English',success_msg:'✅ جميع الأنظمة مستقرة. يتم تحديث موازنة الكتلة ومعدلات الحقن الكيمياوي تلقائياً بناءً على المدخلات.',
    status_online:'متصل الآن',alarms_title:'إنذارات النظام',pid_title:'التحكم بالمستوى PID - عازلة الضغط العالي',pid_valve:'صمام خروج السائل (%)',pid_retention:'وقت البقاء (دقيقة)',pid_auto:'ضبط تلقائي 50%',
    sim_on:'⏹️ بث مباشر: يعمل',sim_off:'▶️ بث مباشر: متوقف'}
};
function applyLang(){
  var t=i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key=el.getAttribute('data-i18n');
    if(t[key])el.textContent=t[key];
  });
  // Sidebar buttons
  var tabs=['overview','separator','trains','gas','oil','water','chemical','storage','charts','equations','diagram','control'];
  document.querySelectorAll('.nav-btn').forEach(function(b,i){
    var key='nav_'+tabs[i];
    if(t[key])b.textContent=t[key];
  });
  // Lang button
  $('langBtn').textContent=t.btn_lang;
  // Success banner
  document.querySelectorAll('.success-banner').forEach(function(el){el.textContent=t.success_msg});
  // RTL
  if(currentLang==='ar'){document.documentElement.setAttribute('dir','rtl');document.documentElement.setAttribute('lang','ar')}
  else{document.documentElement.setAttribute('dir','ltr');document.documentElement.setAttribute('lang','en')}
}
function toggleLang(){
  currentLang=currentLang==='en'?'ar':'en';
  applyLang();
}
var trainData=[
{id:"TRAIN 1",status:"ON",inlet:31731.52,oil:22513.10,water:9218.42,gas:64.8,sepVol:60},
{id:"TRAIN 2",status:"ON",inlet:46508.43,oil:37796.91,water:8711.52,gas:36.1,sepVol:60},
{id:"TRAIN 3",status:"ON",inlet:51067.11,oil:39528.68,water:11538.43,gas:35.9,sepVol:60},
{id:"TRAIN 4",status:"STOP",inlet:0,oil:0,water:0,gas:0,sepVol:60}
];
function fmt(n){return n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
function $(id){return document.getElementById(id)}
function val(id){return parseFloat($(id).value)||0}

// Clock
setInterval(function(){var d=new Date();$("clock").textContent=d.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"})},1000);

// Tabs
function switchTab(t){
  document.querySelectorAll(".tab-panel").forEach(function(p){p.classList.remove("active")});
  document.querySelectorAll(".nav-btn").forEach(function(b){b.classList.remove("active")});
  var panel=$("tab-"+t);if(panel)panel.classList.add("active");
  document.querySelectorAll('.nav-btn[data-tab="'+t+'"]').forEach(function(b){b.classList.add("active")});
}
document.querySelectorAll(".nav-btn").forEach(function(b){
  b.addEventListener("click",function(){switchTab(this.dataset.tab)});
});

// Result row helper
function rr(label,value,unit){return '<div class="res-row"><span class="res-label">'+label+'</span><span><span class="res-value">'+value+'</span><span class="res-unit"> '+unit+'</span></span></div>'}

// KPI helper
function kpi(lbl,val,unit){return '<div class="kpi"><div class="kpi-lbl">'+lbl+'</div><div class="kpi-val">'+val+'</div><div class="kpi-u">'+unit+'</div></div>'}

// ===== TRAIN TABLE =====
function renderTrains(){
  var tb=$("trainBody");tb.innerHTML="";
  trainData.forEach(function(t,i){
    var tr=document.createElement("tr");
    var h='<td>'+t.id+'</td>';
    h+='<td><select class="sts-select" onchange="trainSts('+i+',this.value)"><option value="ON"'+(t.status==="ON"?" selected":"")+'>ON</option><option value="STOP"'+(t.status==="STOP"?" selected":"")+'>STOP</option></select></td>';
    ["inlet","oil","water","gas","sepVol"].forEach(function(f){
      h+='<td><input class="edit-cell" type="number" value="'+t[f]+'" step="0.01" min="0" onchange="trainEdit('+i+',\''+f+'\',this.value)"></td>';
    });
    tr.innerHTML=h;tb.appendChild(tr);
  });
  renderTrainResults();
}
function trainSts(i,v){trainData[i].status=v;if(v==="STOP"){trainData[i].inlet=0;trainData[i].oil=0;trainData[i].water=0;trainData[i].gas=0}renderTrains()}
function trainEdit(i,f,v){trainData[i][f]=parseFloat(v)||0;renderTrainResults()}
function renderTrainResults(){
  var tb=$("trainResults");tb.innerHTML="";
  var tI=0,tO=0,tG=0;
  trainData.forEach(function(d){
    var wc=d.inlet>0?(d.water/d.inlet)*100:0;
    var gor=d.oil>0?(d.gas*1e6)/d.oil:0;
    var im=d.inlet*0.15898;
    var rt=im>0?(d.sepVol*1440)/im:0;
    tb.innerHTML+='<tr><td>'+d.id+'</td><td>'+fmt(wc)+'</td><td>'+fmt(gor)+'</td><td>'+fmt(im)+'</td><td>'+fmt(rt)+'</td></tr>';
    tI+=d.inlet;tO+=d.oil;tG+=d.gas;
  });
  var dem=((tI*158.98)*(15/1e6))/24;
  var eng=tG*1000;
  $("trainKPI").innerHTML=kpi("Total Inlet",fmt(tI),"bpd")+kpi("Total Oil",fmt(tO),"bpd")+kpi("Demulsifier Rate",fmt(dem),"L/hr")+kpi("Gas Energy",fmt(eng),"MMBTU/D");
  updateOverview(tI,tO,tG);
}

// ===== OVERVIEW =====
function updateOverview(tI,tO,tG){
  var tW=trainData.reduce(function(s,d){return s+d.water},0);
  var dem=((tI*158.98)*(15/1e6))/24;
  // Update SVG schematic values
  var ids={well:fmt(tI)+' bpd',manifold:fmt(tI)+' bpd',hpsep:fmt(tI)+' bpd',lpsep:fmt(tO)+' bpd',gas:fmt(tG)+' MMSCFD',oil:fmt(tO)+' bpd',water:fmt(tW)+' bpd',storage:fmt(tO*5.615)+' bbl',export:fmt(tO)+' bpd'};
  for(var k in ids){var el=$('sv-'+k);if(el)el.textContent=ids[k]}
  $("overviewKPI").innerHTML=kpi("Total Inlet",fmt(tI),"bpd")+kpi("Total Oil",fmt(tO),"bpd")+kpi("Total Gas",fmt(tG),"MMSCFD")+kpi("Demulsifier",fmt(dem),"L/hr");
  
  // Update new summary panel
  var sumInlet = $('sum-inlet');
  if(sumInlet) sumInlet.innerHTML = fmt(tI) + ' <span style="font-size:10px;">bpd</span>';
}

// ===== SEPARATOR CALCULATOR (API 12J) =====
function calcSeparator(){
  var P=val("sep-P"),T=val("sep-T"),Qo=val("sep-Qo"),Qw=val("sep-Qw"),Qg=val("sep-Qg");
  var API=val("sep-API"),SGg=val("sep-SGg"),muO=val("sep-muO"),dp=val("sep-dp"),K=val("sep-K");
  var tro=val("sep-tro"),trw=val("sep-trw");
  // Oil density from API
  var SGo=141.5/(API+131.5);
  var rhoO=SGo*62.4; // lb/ft3
  var rhoG=SGg*0.0764*(P+14.7)/14.7*(520/(T+460)); // real gas approx
  var rhoW=64.3; // lb/ft3 water
  // Souders-Brown gas velocity
  var Vmax=K*Math.sqrt((rhoO-rhoG)/rhoG);
  // Gas volumetric at conditions
  var Qg_acf=Qg*1e6/86400*(14.7/(P+14.7))*((T+460)/520); // actual ft3/s
  var Ag=Qg_acf>0?Qg_acf/Vmax:0; // gas area ft2
  var Dgas=Math.sqrt(4*Ag/Math.PI);
  // Liquid retention sizing
  var Ql_ft3min=(Qo+Qw)*5.615/1440;
  var Vliq=Ql_ft3min*(tro+trw); // ft3 liquid holdup
  // Assume 50% liquid level, horizontal
  var Dliq=Math.pow(Vliq*8/(Math.PI*3),1/3); // D with L=3D
  var D=Math.max(Dgas,Dliq);
  var L=3*D;
  var Across=Math.PI/4*D*D;
  var Vtotal=Across*L;
  var Vliq_actual=0.5*Vtotal;
  // Stokes settling velocity
  var dpM=dp*1e-6*3.281; // micron to ft
  var Vt=((rhoW-rhoO)*32.174*dpM*dpM)/(18*muO*6.72e-4); // ft/s
  // Water cut
  var WC=(Qo+Qw)>0?Qw/(Qo+Qw)*100:0;
  var GOR=Qo>0?(Qg*1e6)/Qo:0;
  // Retention actual
  var retActual=Ql_ft3min>0?Vliq_actual/Ql_ft3min:0;
  var r=$("sepResults");
  r.innerHTML=rr("Oil Density (ρo)",fmt(rhoO),"lb/ft³")+rr("Gas Density (ρg)",fmt(rhoG),"lb/ft³")+rr("Gas Velocity (Vmax)",fmt(Vmax),"ft/s")+rr("Stokes Settling",fmt(Vt*12),"in/s")+rr("Water Cut",fmt(WC),"%")+rr("GOR",fmt(GOR),"SCF/bbl")+rr("Retention Time",fmt(retActual),"min");
  var v=$("sepVessel");
  v.innerHTML=rr("Vessel Diameter",fmt(D)+" ft / "+fmt(D*12),"in")+rr("Seam-to-Seam Length",fmt(L),"ft")+rr("Cross Section Area",fmt(Across),"ft²")+rr("Total Volume",fmt(Vtotal),"ft³")+rr("Liquid Volume (50%)",fmt(Vliq_actual),"ft³")+rr("Liquid Volume",fmt(Vliq_actual*0.178107),"bbl");
  buildSepChart(P,D,L,Vtotal);
}

// ===== GAS TREATMENT =====
function calcGas(){
  var Q=val("gas-Q"),Pin=val("gas-Pin"),Tin=val("gas-Tin"),SG=val("gas-SG");
  var H2S=val("gas-H2S"),CO2=val("gas-CO2"),H2O=val("gas-H2O"),Pout=val("gas-Pout");
  // Gas MW
  var MW=SG*28.97;
  // Z factor approx (Hall-Yarborough simplified)
  var Tpc=168+325*SG-12.5*SG*SG;
  var Ppc=677+15*SG-37.5*SG*SG;
  var Tpr=(Tin+460)/Tpc;
  var Ppr=(Pin+14.7)/Ppc;
  var Z=1-(3.53*Ppr)/(Math.pow(10,0.9813*Tpr))+0.274*Ppr*Ppr/(Math.pow(10,0.8157*Tpr));
  Z=Math.max(0.3,Math.min(1.2,Z));
  // Gas density
  var rhoG=(Pin+14.7)*MW/(Z*10.73*(Tin+460));
  // Compression ratio
  var CR=Pout>0?(Pout+14.7)/(Pin+14.7):1;
  var nStages=Math.max(1,Math.ceil(Math.log(CR)/Math.log(3.5)));
  var rPerStage=Math.pow(CR,1/nStages);
  // Compression HP (approx)
  var HP=Q*1e6/86400*144*(Pin+14.7)/(33000)*nStages*(Math.pow(rPerStage,0.286)-1)/0.286*1.4;
  HP=Math.abs(HP);
  // Dehydration - glycol rate (2-3 gal TEG/lb H2O)
  var H2Olb=H2O*Q; // lb/day water removed
  var glycol=H2Olb*3; // gal TEG/day
  // Amine for H2S/CO2 (approx 3 gal/min per MMSCFD acid gas)
  var acidGas=(H2S+CO2)/100*Q;
  var amineRate=acidGas*3*1440; // gal/day
  // Thermal energy
  var energy=Q*1000; // MMBTU/D (HHV~1000 BTU/SCF)
  var r=$("gasResults");
  r.innerHTML=rr("Gas MW",fmt(MW),"g/mol")+rr("Z Factor",Z.toFixed(4),"")+rr("Gas Density",fmt(rhoG),"lb/ft³")+rr("Compression Ratio",fmt(CR),":1")+rr("Stages Required",nStages,"stages")+rr("Ratio/Stage",fmt(rPerStage),":1")+rr("Compression Power",fmt(HP),"HP")+rr("Water Removed",fmt(H2Olb),"lb/day")+rr("TEG Circulation",fmt(glycol),"gal/day")+rr("Amine Rate",fmt(amineRate),"gal/day")+rr("Acid Gas Load",fmt(acidGas),"MMSCFD")+rr("Thermal Energy",fmt(energy),"MMBTU/D");
  buildGasChart(Q,Pin,nStages,energy);
}

// ===== OIL TREATMENT =====
function calcOil(){
  var Q=val("oil-Q"),API=val("oil-API"),BSWin=val("oil-BSWin"),BSWout=val("oil-BSWout");
  var salt=val("oil-salt"),saltOut=val("oil-saltOut"),Tin=val("oil-Tin"),Tout=val("oil-Tout"),wash=val("oil-wash");
  var SGo=141.5/(API+131.5);
  var rhoO=SGo*62.4;
  // Water removed
  var waterRemoved=Q*(BSWin-BSWout)/100;
  // Net oil
  var netOil=Q*(1-BSWout/100);
  // Heater duty Q=m*Cp*dT, Cp~0.5 BTU/lb/F for crude
  var massRate=Q*5.615*rhoO/24; // lb/hr
  var heaterDuty=massRate*0.5*(Tout-Tin)/1e6; // MMBTU/hr
  // Wash water volume
  var washVol=Q*wash/100;
  // Salt removal efficiency
  var saltEff=salt>0?(1-saltOut/salt)*100:0;
  // Desalter stages (single or two stage)
  var stages=saltOut<10&&salt>30?2:1;
  // Electrostatic field (typical 1-2 kV/cm, power ~0.5 kW/1000 bbl)
  var desPower=Q/1000*0.5*stages;
  var r=$("oilResults");
  r.innerHTML=rr("Oil SG",SGo.toFixed(4),"")+rr("Oil Density",fmt(rhoO),"lb/ft³")+rr("Water Removed",fmt(waterRemoved),"bpd")+rr("Net Oil Export",fmt(netOil),"bpd")+rr("Heater Duty",fmt(heaterDuty),"MMBTU/hr")+rr("Heater Duty (daily)",fmt(heaterDuty*24),"MMBTU/D")+rr("Wash Water",fmt(washVol),"bpd")+rr("Salt Removal Eff.",fmt(saltEff),"%")+rr("Desalter Stages",stages,"stage(s)")+rr("Desalter Power",fmt(desPower),"kW")+rr("Mass Flow Rate",fmt(massRate),"lb/hr");
  buildOilChart(Q,BSWin,BSWout,heaterDuty);
}

// ===== WATER TREATMENT =====
function calcWater(){
  var Q=val("wat-Q"),OiW=val("wat-OiW"),OiWout=val("wat-OiWout"),TSS=val("wat-TSS"),T=val("wat-T"),ret=val("wat-ret");
  // Skim tank volume
  var Qft3=Q*5.615/1440; // ft3/min
  var Vskim=Qft3*ret;
  var Dskim=Math.pow(Vskim*4/(Math.PI*2),1/3);
  // Oil removed
  var oilRemoved=Q*5.615*(OiW-OiWout)/1e6*7.48; // gal/day approx
  // Removal efficiency
  var remEff=OiW>0?(1-OiWout/OiW)*100:0;
  // Stokes rise rate for oil in water
  var dpOil=60; // micron typical
  var rhoO=52; var rhoW=64.3; var muW=0.7; // cp at ~120F
  var dpFt=dpOil*1e-6*3.281;
  var Vrise=((rhoW-rhoO)*32.174*dpFt*dpFt)/(18*muW*6.72e-4);
  // Hydrocyclone sizing (typ 500-2000 bpd each)
  var nHC=Math.max(1,Math.ceil(Q/1500));
  var r=$("waterResults");
  r.innerHTML=rr("Skim Tank Volume",fmt(Vskim),"ft³")+rr("Skim Tank Volume",fmt(Vskim*0.178107),"bbl")+rr("Skim Tank Diameter",fmt(Dskim),"ft")+rr("Oil Removal Eff.",fmt(remEff),"%")+rr("Oil Recovered",fmt(oilRemoved),"gal/day")+rr("Stokes Rise Rate",fmt(Vrise*12),"in/s")+rr("Hydrocyclones Req.",nHC,"units")+rr("TSS Inlet",fmt(TSS),"mg/L")+rr("Est. TSS Outlet",fmt(TSS*0.15),"mg/L");
  buildWaterChart(Q,OiW,OiWout,remEff);
}

// ===== CHEMICAL INJECTION =====
function calcChemical(){
  var Ql=val("chem-Ql");
  var doses={Demulsifier:val("chem-demul"),Corrosion_Inh:val("chem-corr"),Scale_Inh:val("chem-scale"),H2S_Scavenger:val("chem-h2s"),Biocide:val("chem-bio"),O2_Scavenger:val("chem-o2"),PPD:val("chem-ppd")};
  var r=$("chemResults");r.innerHTML="";
  var labels=[],vals=[],colors=["#00f0ff","#00e676","#ff9800","#e91e63","#9c27b0","#00bcd4","#ffc107"];
  var total=0,i=0;
  for(var k in doses){
    var d=doses[k];
    // rate = Ql(bpd)*158.98(L/bbl)*dose(ppm=mg/L)/1e6(g/mg)*1000(mL/L) => L/day
    var Lday=Ql*158.98*d/1e6;
    var Lhr=Lday/24;
    var galDay=Lday*0.264172;
    r.innerHTML+=rr(k.replace(/_/g," "),fmt(Lhr)+" L/hr | "+fmt(galDay),"gal/day");
    labels.push(k.replace(/_/g," "));vals.push(Lhr);total+=Lhr;i++;
  }
  r.innerHTML+=rr("TOTAL Injection Rate",fmt(total),"L/hr");
  r.innerHTML+=rr("TOTAL Daily",fmt(total*24),"L/day");
  buildChemChart(labels,vals,colors);
}

// ===== STORAGE & EXPORT =====
function calcStorage(){
  var n=val("stg-n"),D=val("stg-D"),H=val("stg-H"),fill=val("stg-fill"),exp=val("stg-exp"),prod=val("stg-prod");
  var Vtank=Math.PI/4*D*D*H; // m3 per tank
  var Vuse=Vtank*fill/100;
  var Vtotal=Vuse*n;
  var Vbbl=Vtotal*6.28981; // m3 to bbl
  var daysStorage=exp>0?Vbbl/exp:0;
  var balance=prod-exp;
  var r=$("storageResults");
  r.innerHTML=rr("Tank Volume (each)",fmt(Vtank),"m³")+rr("Usable Volume (each)",fmt(Vuse),"m³")+rr("Total Usable Volume",fmt(Vtotal),"m³")+rr("Total Usable Volume",fmt(Vbbl),"bbl")+rr("Storage Days",fmt(daysStorage),"days")+rr("Production Rate",fmt(prod),"bpd")+rr("Export Rate",fmt(exp),"bpd")+rr("Daily Balance",fmt(balance),"bpd")+rr("Tank Diameter",fmt(D),"m")+rr("Tank Height",fmt(H),"m");
}

// ===== CONTROL PANEL =====
function renderControl(){
  var g=$("controlGrid");
  var sections=[
    {icon:"🛢️",name:"Wellhead",items:[["Well Pressure","2500 psig","85"],["Well Temperature","180 °F","72"],["Choke Size","48/64 in","75"]]},
    {icon:"⚙️",name:"HP Separator",items:[["Operating Pressure","150 psig","90"],["Temperature","120 °F","80"],["Liquid Level","55%","55"]]},
    {icon:"⚙️",name:"LP Separator",items:[["Operating Pressure","50 psig","88"],["Temperature","110 °F","75"],["Liquid Level","50%","50"]]},
    {icon:"🔥",name:"Gas Compression",items:[["Suction Pressure","50 psig","70"],["Discharge Pressure","1000 psig","82"],["Power Load","2500 HP","78"]]},
    {icon:"🛢️",name:"Oil Heater",items:[["Inlet Temp","100 °F","65"],["Outlet Temp","150 °F","80"],["Duty","25 MMBTU/hr","72"]]},
    {icon:"💧",name:"Water Treatment",items:[["OiW Inlet","500 ppm","60"],["OiW Outlet","35 ppm","92"],["Skim Level","45%","45"]]},
    {icon:"🧪",name:"Chemical Injection",items:[["Demulsifier","12.5 L/hr","88"],["Corrosion Inh.","5.2 L/hr","76"],["Scale Inh.","4.1 L/hr","80"]]},
    {icon:"🏗️",name:"Storage Tanks",items:[["Tank 1 Level","72%","72"],["Tank 2 Level","58%","58"],["Tank 3 Level","45%","45"]]},
    {icon:"🚢",name:"Export",items:[["Export Rate","100,000 bpd","85"],["Pipeline Pressure","800 psig","80"],["Meter Factor","1.0002","99"]]}
  ];
  g.innerHTML="";
  sections.forEach(function(s,si){
    var c='<div class="ctrl-card"><div class="ctrl-head">'+s.icon+" "+s.name+"</div>";
    s.items.forEach(function(it){
      var clr=parseFloat(it[2])>80?"#00e676":parseFloat(it[2])>50?"#ffab40":"#ff5252";
      c+='<div class="ctrl-row"><span>'+it[0]+'</span><span class="ctrl-val">'+it[1]+'</span></div><div class="ctrl-bar"><div class="ctrl-fill" style="width:'+it[2]+"%;background:"+clr+'"></div></div>';
    });
    c+="</div>";g.innerHTML+=c;
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded",function(){
  renderTrains();
  renderControl();
  calcSeparator();
  calcGas();
  calcOil();
  calcWater();
  calcChemical();
  calcStorage();
  initAnalyticsCharts();
  applyLang();
});
