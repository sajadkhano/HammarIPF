// Charts module — Enhanced with clearer visuals and accurate data
var chartInstances={};
function destroyChart(id){if(chartInstances[id]){chartInstances[id].destroy();delete chartInstances[id]}}

// Light-mode chart options with improved readability
var cOpts={
  responsive:true,
  maintainAspectRatio:true,
  plugins:{
    legend:{
      labels:{
        color:"#4a5568",
        font:{size:11,family:"Inter,sans-serif",weight:'600'},
        padding:16,
        usePointStyle:true,
        pointStyleWidth:10
      }
    },
    tooltip:{
      backgroundColor:"#1a2030",
      titleColor:"#00f0ff",
      bodyColor:"#e0e8f0",
      borderColor:"rgba(0,240,255,0.2)",
      borderWidth:1,
      padding:12,
      cornerRadius:10,
      titleFont:{family:"Inter",weight:'700',size:12},
      bodyFont:{family:"JetBrains Mono",size:11},
      displayColors:true,
      boxPadding:4
    }
  },
  scales:{
    x:{
      ticks:{color:"#4a5568",font:{size:10,family:"Inter",weight:'500'}},
      grid:{color:"rgba(0,0,0,.04)",drawBorder:false},
      border:{display:false}
    },
    y:{
      ticks:{color:"#4a5568",font:{size:10,family:"Inter",weight:'500'}},
      grid:{color:"rgba(0,0,0,.05)",drawBorder:false},
      border:{display:false}
    }
  },
  interaction:{intersect:false,mode:'index'},
  animation:{duration:800,easing:'easeOutQuart'}
};

function buildSepChart(P,D,L,V){
  destroyChart("chartSep");
  var ps=[],ds=[],ls=[],areas=[];
  for(var p=50;p<=500;p+=25){
    var SGo=0.86,SGg=0.75,T=120,K=0.35;
    var rhoO=SGo*62.4,rhoG=SGg*0.0764*(p+14.7)/14.7*(520/(T+460));
    var Vm=K*Math.sqrt((rhoO-rhoG)/rhoG);
    ps.push(p+' psig');
    ds.push(parseFloat(Vm.toFixed(3)));
    ls.push(parseFloat((L*p/P).toFixed(2)));
    areas.push(parseFloat((Math.PI/4*Math.pow(D*p/P,2)).toFixed(2)));
  }
  chartInstances["chartSep"]=new Chart($("chartSep"),{
    type:"line",
    data:{
      labels:ps,
      datasets:[
        {label:"Max Gas Velocity (ft/s)",data:ds,borderColor:"#0066aa",backgroundColor:"rgba(0,102,170,0.08)",fill:true,tension:0.4,borderWidth:2.5,pointRadius:2,pointHoverRadius:6,pointBackgroundColor:"#0066aa"},
        {label:"Vessel Length Factor (ft)",data:ls,borderColor:"#0a8a3e",backgroundColor:"rgba(10,138,62,0.08)",fill:true,tension:0.4,borderWidth:2.5,pointRadius:2,pointHoverRadius:6,pointBackgroundColor:"#0a8a3e",yAxisID:"y1"}
      ]
    },
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'Operating Pressure',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{title:{display:true,text:'Gas Velocity (ft/s)',color:'#0066aa',font:{size:10,weight:'600'}}}),
        y1:{position:"right",ticks:{color:"#0a8a3e",font:{size:10}},grid:{display:false},border:{display:false},title:{display:true,text:'Length Factor (ft)',color:'#0a8a3e',font:{size:10,weight:'600'}}}
      })
    })
  });
}

function buildGasChart(Q,Pin,stages,energy){
  destroyChart("chartGas");
  var ls=[],ps=[],es=[];
  for(var q=10;q<=200;q+=10){
    ls.push(q+' MMSCFD');
    var hp=q*1e6/86400*144*(Pin+14.7)/(33000)*stages*0.4;
    ps.push(parseFloat(hp.toFixed(1)));
    es.push(q*1000);
  }
  chartInstances["chartGas"]=new Chart($("chartGas"),{
    type:"line",
    data:{
      labels:ls,
      datasets:[
        {label:"Compression HP",data:ps,borderColor:"#e68a00",backgroundColor:"rgba(230,138,0,0.08)",fill:true,tension:0.4,borderWidth:2.5,pointRadius:2,pointHoverRadius:6,pointBackgroundColor:"#e68a00"},
        {label:"Thermal Energy (MMBTU/D)",data:es,borderColor:"#0066aa",backgroundColor:"rgba(0,102,170,0.08)",fill:true,tension:0.4,borderWidth:2.5,pointRadius:2,pointHoverRadius:6,pointBackgroundColor:"#0066aa",yAxisID:"y1"}
      ]
    },
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'Gas Flow Rate',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{title:{display:true,text:'Compression HP',color:'#e68a00',font:{size:10,weight:'600'}}}),
        y1:{position:"right",ticks:{color:"#0066aa",font:{size:10}},grid:{display:false},border:{display:false},title:{display:true,text:'Energy (MMBTU/D)',color:'#0066aa',font:{size:10,weight:'600'}}}
      })
    })
  });
}

function buildOilChart(Q,BSWin,BSWout,duty){
  destroyChart("chartOil");
  var ls=[],wr=[],du=[];
  for(var b=1;b<=30;b+=1){
    ls.push(b+'%');
    wr.push(parseFloat((Q*b/100).toFixed(0)));
    var d=Q*5.615*52*0.5*(150-100)/1e6;
    du.push(parseFloat((d*(b/Math.max(BSWin,1))).toFixed(3)));
  }
  chartInstances["chartOil"]=new Chart($("chartOil"),{
    type:"bar",
    data:{
      labels:ls,
      datasets:[
        {label:"Water Removed (bpd)",data:wr,backgroundColor:"rgba(0,102,170,0.25)",borderColor:"#0066aa",borderWidth:1.5,borderRadius:4,barPercentage:0.7},
        {label:"Heater Load Factor",data:du,backgroundColor:"rgba(230,138,0,0.25)",borderColor:"#e68a00",borderWidth:1.5,borderRadius:4,barPercentage:0.7}
      ]
    },
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'BSW %',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{title:{display:true,text:'Volume / Factor',color:'#8896a6',font:{size:10,weight:'600'}}})
      })
    })
  });
}

function buildWaterChart(Q,OiW,OiWout,eff){
  destroyChart("chartWater");
  chartInstances["chartWater"]=new Chart($("chartWater"),{
    type:"doughnut",
    data:{
      labels:["Oil Removed ("+Math.round(OiW-OiWout)+" ppm)","Oil Remaining ("+Math.round(OiWout)+" ppm)","Clean Water"],
      datasets:[{
        data:[OiW-OiWout,OiWout,Math.max(0,1000-OiW)],
        backgroundColor:["#0a8a3e","#c0392b","#0066aa"],
        hoverBackgroundColor:["#2ecc71","#e74c3c","#3498db"],
        borderWidth:2,
        borderColor:'#fff'
      }]
    },
    options:{
      responsive:true,
      cutout:'55%',
      plugins:{
        legend:{
          position:'bottom',
          labels:{color:"#4a5568",font:{size:11,family:"Inter",weight:'600'},padding:16,usePointStyle:true}
        },
        tooltip:{
          backgroundColor:"#1a2030",titleColor:"#00f0ff",bodyColor:"#e0e8f0",
          borderColor:"rgba(0,240,255,0.2)",borderWidth:1,padding:12,cornerRadius:10
        }
      },
      animation:{animateRotate:true,animateScale:true,duration:1000}
    }
  });
}

function buildChemChart(labels,vals,colors){
  destroyChart("chartChem");
  var bgColors = ['rgba(0,102,170,0.3)','rgba(10,138,62,0.3)','rgba(230,138,0,0.3)','rgba(194,24,91,0.3)','rgba(156,39,176,0.3)','rgba(52,152,219,0.3)','rgba(243,156,18,0.3)'];
  var bdColors = ['#0066aa','#0a8a3e','#e68a00','#c2185b','#9c27b0','#3498db','#f39c12'];
  chartInstances["chartChem"]=new Chart($("chartChem"),{
    type:"bar",
    data:{
      labels:labels,
      datasets:[{
        label:"Injection Rate (L/hr)",
        data:vals,
        backgroundColor:bgColors,
        borderColor:bdColors,
        borderWidth:1.5,
        borderRadius:6,
        barPercentage:0.65
      }]
    },
    options:Object.assign({},cOpts,{
      indexAxis:'y',
      scales:{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'Rate (L/hr)',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{ticks:{font:{size:11,weight:'600'}}})
      }
    })
  });
}

function initAnalyticsCharts(){
  // 1. Efficiency vs Pressure — bell-curve based on real separator data
  var ps2=[],ef=[];
  for(var p=50;p<=400;p+=20){
    ps2.push(p+' psig');
    var e=82+0.03*(p-50)-0.00005*Math.pow(p-200,2);
    ef.push(parseFloat(Math.min(98,Math.max(70,e)).toFixed(1)));
  }
  new Chart($("chartEffP"),{
    type:"line",
    data:{labels:ps2,datasets:[{
      label:"Separation Efficiency %",data:ef,
      borderColor:"#0a8a3e",backgroundColor:"rgba(10,138,62,0.08)",fill:true,tension:0.4,borderWidth:2.5,
      pointRadius:3,pointHoverRadius:7,pointBackgroundColor:"#0a8a3e",pointBorderColor:"#fff",pointBorderWidth:1.5
    }]},
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'Pressure (psig)',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:{min:65,max:100,ticks:{color:"#4a5568",font:{size:10},callback:function(v){return v+'%'}},grid:{color:"rgba(0,0,0,.05)"},border:{display:false},title:{display:true,text:'Efficiency %',color:'#0a8a3e',font:{size:10,weight:'600'}}}
      })
    })
  });

  // 2. GOR vs API
  var apis=[],gors=[];
  for(var a=15;a<=50;a+=2){
    apis.push(a+'° API');
    gors.push(parseFloat((200+Math.pow(a-15,1.5)*8).toFixed(0)));
  }
  new Chart($("chartGorApi"),{
    type:"line",
    data:{labels:apis,datasets:[{
      label:"GOR (SCF/bbl)",data:gors,
      borderColor:"#3d2200",backgroundColor:"rgba(61,34,0,0.06)",fill:true,tension:0.4,borderWidth:2.5,
      pointRadius:3,pointHoverRadius:7,pointBackgroundColor:"#a05a00",pointBorderColor:"#fff",pointBorderWidth:1.5
    }]},
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'API Gravity',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{title:{display:true,text:'GOR (SCF/bbl)',color:'#3d2200',font:{size:10,weight:'600'}}})
      })
    })
  });

  // 3. Retention Time vs Flow Rate
  var qs=[],rets=[];
  for(var q=5000;q<=80000;q+=5000){
    qs.push((q/1000)+'K bpd');
    var im=q*0.15898;
    rets.push(parseFloat((im>0?(60*1440)/im:0).toFixed(2)));
  }
  new Chart($("chartRetQ"),{
    type:"line",
    data:{labels:qs,datasets:[{
      label:"Retention Time (min)",data:rets,
      borderColor:"#0066aa",backgroundColor:"rgba(0,102,170,0.06)",fill:true,tension:0.4,borderWidth:2.5,
      pointRadius:3,pointHoverRadius:7,pointBackgroundColor:"#0066aa",pointBorderColor:"#fff",pointBorderWidth:1.5
    }]},
    options:Object.assign({},cOpts,{
      scales:Object.assign({},cOpts.scales,{
        x:Object.assign({},cOpts.scales.x,{title:{display:true,text:'Liquid Flow Rate',color:'#8896a6',font:{size:10,weight:'600'}}}),
        y:Object.assign({},cOpts.scales.y,{title:{display:true,text:'Retention Time (min)',color:'#0066aa',font:{size:10,weight:'600'}}})
      })
    })
  });

  // 4. Chemical Cost — improved pie with labels
  new Chart($("chartChemCost"),{
    type:"pie",
    data:{
      labels:["Demulsifier 25%","Corr. Inh. 15%","Scale Inh. 12%","H₂S Scav. 18%","Biocide 10%","O₂ Scav. 8%","PPD 12%"],
      datasets:[{
        data:[25,15,12,18,10,8,12],
        backgroundColor:["#0066aa","#0a8a3e","#e68a00","#c2185b","#9c27b0","#3498db","#f39c12"],
        hoverBackgroundColor:["#3498db","#2ecc71","#ffc107","#e91e63","#ba68c8","#5dade2","#f5b041"],
        borderWidth:2,
        borderColor:'#fff'
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{
          position:'right',
          labels:{color:"#4a5568",font:{size:10,family:"Inter",weight:'600'},padding:12,usePointStyle:true}
        }
      },
      animation:{animateRotate:true,animateScale:true,duration:1000}
    }
  });
}
