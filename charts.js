// Charts module
var chartInstances={};
function destroyChart(id){if(chartInstances[id]){chartInstances[id].destroy();delete chartInstances[id]}}
var cOpts={responsive:true,plugins:{legend:{labels:{color:"#7a8aaa",font:{size:10,family:"JetBrains Mono"}}},tooltip:{backgroundColor:"#0a0f1e",borderColor:"rgba(0,240,255,0.2)",borderWidth:1,titleFont:{family:"JetBrains Mono"},bodyFont:{family:"JetBrains Mono"}}},scales:{x:{ticks:{color:"#5a7aaa",font:{size:10,family:"JetBrains Mono"}},grid:{color:"rgba(0,240,255,0.04)"}},y:{ticks:{color:"#5a7aaa",font:{size:10,family:"JetBrains Mono"}},grid:{color:"rgba(0,240,255,0.04)"}}}};

function buildSepChart(P,D,L,V){
  destroyChart("chartSep");
  var ps=[],ds=[],ls=[];
  for(var p=50;p<=500;p+=25){
    var SGo=0.86,SGg=0.75,T=120,K=0.35;
    var rhoO=SGo*62.4,rhoG=SGg*0.0764*(p+14.7)/14.7*(520/(T+460));
    var Vm=K*Math.sqrt((rhoO-rhoG)/rhoG);
    ps.push(p);ds.push(Vm);ls.push(L*p/P);
  }
  chartInstances["chartSep"]=new Chart($("chartSep"),{type:"line",data:{labels:ps,datasets:[{label:"Max Gas Velocity (ft/s)",data:ds,borderColor:"#00f0ff",backgroundColor:"rgba(0,240,255,0.1)",fill:true,tension:0.4},{label:"Vessel Length Ratio",data:ls,borderColor:"#00e676",backgroundColor:"rgba(0,230,118,0.1)",fill:true,tension:0.4,yAxisID:"y1"}]},options:Object.assign({},cOpts,{scales:Object.assign({},cOpts.scales,{y1:{position:"right",ticks:{color:"#00e676",font:{size:10}},grid:{display:false}}})})});
}

function buildGasChart(Q,Pin,stages,energy){
  destroyChart("chartGas");
  var ls=[],ps=[],es=[];
  for(var q=10;q<=200;q+=10){ls.push(q);ps.push(q*1e6/86400*144*(Pin+14.7)/(33000)*stages*0.4);es.push(q*1000);}
  chartInstances["chartGas"]=new Chart($("chartGas"),{type:"line",data:{labels:ls,datasets:[{label:"Compression HP",data:ps,borderColor:"#ff9800",backgroundColor:"rgba(255,152,0,0.1)",fill:true,tension:0.4},{label:"Thermal Energy MMBTU/D",data:es,borderColor:"#00f0ff",backgroundColor:"rgba(0,240,255,0.1)",fill:true,tension:0.4,yAxisID:"y1"}]},options:Object.assign({},cOpts,{scales:Object.assign({},cOpts.scales,{y1:{position:"right",ticks:{color:"#00f0ff",font:{size:10}},grid:{display:false}}})})});
}

function buildOilChart(Q,BSWin,BSWout,duty){
  destroyChart("chartOil");
  var ls=[],wr=[],du=[];
  for(var b=1;b<=30;b+=1){ls.push(b);wr.push(Q*b/100);var d=Q*5.615*52*0.5*(150-100)/1e6;du.push(d*(b/BSWin));}
  chartInstances["chartOil"]=new Chart($("chartOil"),{type:"bar",data:{labels:ls.map(function(x){return x+"%"}),datasets:[{label:"Water Removed (bpd)",data:wr,backgroundColor:"rgba(0,240,255,0.3)",borderColor:"#00f0ff",borderWidth:1},{label:"Heater Load Factor",data:du,backgroundColor:"rgba(255,152,0,0.3)",borderColor:"#ff9800",borderWidth:1}]},options:cOpts});
}

function buildWaterChart(Q,OiW,OiWout,eff){
  destroyChart("chartWater");
  chartInstances["chartWater"]=new Chart($("chartWater"),{type:"doughnut",data:{labels:["Oil Removed","Oil Remaining","Clean Water"],datasets:[{data:[OiW-OiWout,OiWout,1e6-OiW],backgroundColor:["#00e676","#ff5252","#00f0ff"],borderWidth:0}]},options:{responsive:true,plugins:{legend:{labels:{color:"#7a8aaa",font:{size:10,family:"JetBrains Mono"}}}}}});
}

function buildChemChart(labels,vals,colors){
  destroyChart("chartChem");
  chartInstances["chartChem"]=new Chart($("chartChem"),{type:"bar",data:{labels:labels,datasets:[{label:"Injection Rate (L/hr)",data:vals,backgroundColor:colors.map(function(c){return c+"66"}),borderColor:colors,borderWidth:1}]},options:cOpts});
}

function initAnalyticsCharts(){
  // Efficiency vs Pressure
  var ps2=[],ef=[];
  for(var p=50;p<=400;p+=20){ps2.push(p);var e=82+0.03*(p-50)-0.00005*Math.pow(p-200,2);ef.push(Math.min(98,Math.max(70,e)));}
  new Chart($("chartEffP"),{type:"line",data:{labels:ps2,datasets:[{label:"Separation Efficiency %",data:ef,borderColor:"#00f0ff",backgroundColor:"rgba(0,240,255,0.1)",fill:true,tension:0.4}]},options:cOpts});

  // GOR vs API
  var apis=[],gors=[];
  for(var a=15;a<=50;a+=2){apis.push(a);gors.push(200+Math.pow(a-15,1.5)*8);}
  new Chart($("chartGorApi"),{type:"line",data:{labels:apis,datasets:[{label:"GOR (SCF/bbl)",data:gors,borderColor:"#00e676",backgroundColor:"rgba(0,230,118,0.1)",fill:true,tension:0.4}]},options:cOpts});

  // Retention vs Flow
  var qs=[],rets=[];
  for(var q=5000;q<=80000;q+=5000){qs.push(q);var im=q*0.15898;rets.push(im>0?(60*1440)/im:0);}
  new Chart($("chartRetQ"),{type:"line",data:{labels:qs,datasets:[{label:"Retention Time (min)",data:rets,borderColor:"#ff9800",backgroundColor:"rgba(255,152,0,0.1)",fill:true,tension:0.4}]},options:cOpts});

  // Chemical cost
  new Chart($("chartChemCost"),{type:"pie",data:{labels:["Demulsifier","Corr. Inh.","Scale Inh.","H2S Scav.","Biocide","O2 Scav.","PPD"],datasets:[{data:[25,15,12,18,10,8,12],backgroundColor:["#00f0ff","#00e676","#ff9800","#e91e63","#9c27b0","#00bcd4","#ffc107"],borderWidth:0}]},options:{responsive:true,plugins:{legend:{labels:{color:"#7a8aaa",font:{size:10,family:"JetBrains Mono"}}}}}});
}
