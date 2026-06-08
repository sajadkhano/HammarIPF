"use strict";
// ============================================================
//  SEPARATOR DESIGN MODULE — API 12J / ASME Sec VIII / GPSA
//  Hammar IPF SCADA — Enhanced Separator Engineering Window
// ============================================================

// ---- Helper: get selected radio value ----
function sdGetType() {
  var radios = document.querySelectorAll('input[name="sd-type"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return 'H';
}

// ---- Helper: format number ----
function sdFmt(n, dec) {
  dec = dec === undefined ? 2 : dec;
  if (isNaN(n) || !isFinite(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function sdVal(id) { return parseFloat(document.getElementById(id).value) || 0; }


// ---- Result row ----
function sdRR(label, value, unit, highlight) {
  var cls = highlight ? ' sd-highlight' : '';
  return '<div class="sd-res-row' + cls + '">' +
    '<span class="sd-res-label">' + label + '</span>' +
    '<span><span class="sd-res-value">' + value + '</span>' +
    '<span class="sd-res-unit"> ' + unit + '</span></span></div>';
}

// ---- Badge row ----
function sdBadge(label, value, color) {
  return '<div class="sd-badge-row">' +
    '<span class="sd-badge" style="background:' + color + '20;color:' + color + ';border:1px solid ' + color + '40">' + label + '</span>' +
    '<span class="sd-badge-val">' + value + '</span></div>';
}

// ============================================================
//  MAIN CALCULATION ENGINE
// ============================================================
function calcSeparatorDesign() {

  // ---- Read inputs ----
  var sepType     = sdGetType();                                     // H / V / S
  var phase       = document.getElementById('sd-phase').value;      // 2 / 3
  var P           = sdVal('sd-P');      // psig
  var T           = sdVal('sd-T');      // °F
  var Qo          = sdVal('sd-Qo');     // bpd  oil
  var Qw          = sdVal('sd-Qw');     // bpd  water
  var Qg          = sdVal('sd-Qg');     // MMSCFD gas
  var API         = sdVal('sd-API');    // °API
  var SGg         = sdVal('sd-SGg');    // gas SG
  var muO         = sdVal('sd-muO');    // oil viscosity cp
  var dp          = sdVal('sd-dp');     // droplet diameter micron
  var K           = sdVal('sd-K');      // Souders-Brown K
  var tro         = sdVal('sd-tro');    // oil retention min
  var trw         = sdVal('sd-trw');    // water retention min
  var material    = document.getElementById('sd-material').value;
  var corr        = sdVal('sd-corr');   // corrosion allowance inch
  var Je          = sdVal('sd-Je');     // weld efficiency
  var Sallow      = sdVal('sd-Sallow'); // allowable stress psi

  // ---- Phase & Fluid Properties ----
  var SGo  = 141.5 / (API + 131.5);
  var rhoO = SGo * 62.4;       // lb/ft³
  var rhoW = 64.3;             // lb/ft³
  // Real gas density at conditions
  var Tpc  = 168 + 325 * SGg - 12.5 * SGg * SGg;
  var Ppc  = 677 + 15  * SGg - 37.5 * SGg * SGg;
  var Tpr  = (T + 460) / Tpc;
  var Ppr  = (P + 14.7) / Ppc;
  var Z    = 1 - (3.53 * Ppr) / Math.pow(10, 0.9813 * Tpr)
               + 0.274 * Ppr * Ppr / Math.pow(10, 0.8157 * Tpr);
  Z = Math.max(0.3, Math.min(1.2, Z));
  var MW   = SGg * 28.97;
  var rhoG = (P + 14.7) * MW / (Z * 10.73 * (T + 460)); // lb/ft³

  // ---- Souders-Brown Gas Sizing ----
  var Vmax = K * Math.sqrt((rhoO - rhoG) / rhoG);       // ft/s
  var Qg_acfs = Qg * 1e6 / 86400 * (14.7 / (P + 14.7)) * ((T + 460) / 520); // actual ft³/s
  var Ag_req  = Qg_acfs > 0 ? Qg_acfs / Vmax : 0;       // ft² gas cross-section

  // ---- Stokes' Law Settling ----
  var dpFt = dp * 1e-6 * 3.281;   // micron → ft
  var Vt   = ((rhoW - rhoO) * 32.174 * dpFt * dpFt) / (18 * muO * 6.72e-4); // ft/s

  // ---- Liquid Retention Sizing ----
  var Ql_ft3min = (Qo + Qw) * 5.615 / 1440;  // ft³/min
  var Vliq      = Ql_ft3min * (tro + trw);    // ft³ liquid holdup required

  // ---- Vessel Sizing Logic per Type ----
  var D, L, Dgas, Dliq, LiqFrac, gasArea;

  if (sepType === 'H') {
    // HORIZONTAL — L = 3D to 5D, gas on top, liquid on bottom
    LiqFrac = 0.5;
    // From liquid retention: V_liq = LiqFrac * π/4 * D² * L, L=3D → solve D
    Dliq = Math.pow(Vliq / (LiqFrac * Math.PI / 4 * 3), 1/3);
    // From gas: gas area = (1-LiqFrac)*π/4*D² ≥ Ag_req
    Dgas = Ag_req > 0 ? Math.sqrt(Ag_req / ((1 - LiqFrac) * Math.PI / 4)) : 0;
    D    = Math.max(Dgas, Dliq);
    L    = 3 * D;
    gasArea = (1 - LiqFrac) * Math.PI / 4 * D * D;

  } else if (sepType === 'V') {
    // VERTICAL — gas rises up, liquid falls down; D from gas, H from liquid
    Dgas = Ag_req > 0 ? Math.sqrt(4 * Ag_req / Math.PI) : 0;
    // Liquid height H_liq = V_liq / (π/4*D²)
    Dliq = Ag_req > 0 ? Dgas : Math.pow(Vliq * 4 / (Math.PI * 3), 1/3);
    D    = Math.max(Dgas, Dliq, 1.0); // minimum 1 ft
    var Hgas  = Qg_acfs > 0 ? Qg_acfs / (Math.PI / 4 * D * D * Vmax) : 0;
    var Hliq  = Vliq / (Math.PI / 4 * D * D);
    L    = Hgas + Hliq + 2.0; // 2 ft clearance
    LiqFrac = Hliq / L;
    gasArea = Math.PI / 4 * D * D;

  } else {
    // SPHERICAL — special, less common, equal D all around
    var Vsphere = Vliq * 2;  // assume 50% full
    D    = Math.pow(6 * Vsphere / Math.PI, 1/3);
    L    = D;  // for sphere L = D
    LiqFrac = 0.5;
    gasArea = Math.PI / 4 * D * D;
  }

  // ---- API 12J Seam-to-Seam Correction ----
  // Add 1/3 D for inlet nozzle zone + 1/6 D for outlet
  var Lss = sepType === 'V' ? L + D * 0.5 : L + D / 6 + D / 12;

  // ---- ASME Section VIII Shell Thickness ----
  // t = P*D / (2*S*E - 1.2*P) + CA  (cylindrical shell)
  var Pabs   = P + 14.7;
  var Dinch  = D * 12;  // ft → inch
  var t_calc = (Pabs * Dinch) / (2 * Sallow * Je - 1.2 * Pabs); // inch nominal shell
  var t_min  = t_calc + corr;
  // Round up to nearest 1/16
  var t_std  = Math.ceil(t_min * 16) / 16;

  // ---- Head Thickness (ellipsoidal 2:1) ----
  var t_head = (Pabs * Dinch) / (2 * Sallow * Je - 0.2 * Pabs) + corr;
  var t_head_std = Math.ceil(t_head * 16) / 16;

  // ---- Weight Estimate ----
  var rhoSteel = 490; // lb/ft³ steel
  var shellVol  = Math.PI * D * Lss * (t_std / 12); // ft³ shell wall
  var headVol   = 2 * Math.PI / 4 * D * D * (t_head_std / 12); // 2 heads
  var weightEst = (shellVol + headVol) * rhoSteel; // lb
  var weightKg  = weightEst * 0.453592;

  // ---- Operating Parameters ----
  var WC     = (Qo + Qw) > 0 ? Qw / (Qo + Qw) * 100 : 0;
  var GOR    = Qo > 0 ? (Qg * 1e6) / Qo : 0;
  var retAct = Ql_ft3min > 0 ? (LiqFrac * Math.PI / 4 * D * D * Lss) / Ql_ft3min : 0;
  var Vtotal = Math.PI / 4 * D * D * Lss;
  var Vliq_act = LiqFrac * Vtotal;

  // ---- Number of Stages Recommendation ----
  var stagesRec = recommStages(GOR, WC, API, P);

  // ---- Nozzle Sizing (simplified, API 14E) ----
  // Gas nozzle: V_noz < 60 ft/s; Liquid nozzle: V_noz < 3 ft/s
  var gasNozzleArea = Qg_acfs / 60;
  var DgasNozzle    = gasNozzleArea > 0 ? Math.sqrt(4 * gasNozzleArea / Math.PI) * 12 : 2; // inch
  var Qliq_ft3s     = (Qo + Qw) * 5.615 / 86400;
  var DliqNozzle    = Qliq_ft3s > 0 ? Math.sqrt(4 * Qliq_ft3s / (Math.PI * 3)) * 12 : 2; // inch at 3 ft/s

  // ---- Relief Valve Sizing (API 520 estimate) ----
  // Fire case: Q_relief = 21,000 * F * A^0.82 (wetted area ft²)
  var Awet   = Math.PI * D * Lss * 0.6; // approx wetted area ft²
  var F_fire = 0.6; // for insulated vessel
  var Qrelief = 21000 * F_fire * Math.pow(Awet, 0.82); // BTU/hr
  var QrelMscfd = Qrelief / (1000 * 55); // MSCFD rough estimate

  // ---- Display Results ----
  displaySepDesignResults({
    sepType, phase, D, L, Lss, Vtotal, Vliq_act, LiqFrac,
    rhoO, rhoG, rhoW, SGo, Z, MW,
    Vmax, Vt, Ag_req, gasArea, Qg_acfs,
    WC, GOR, retAct, Ql_ft3min,
    t_std, t_head_std, t_min, t_calc,
    weightEst, weightKg, Sallow, Je, corr,
    DgasNozzle, DliqNozzle, Dinch,
    QrelMscfd, Awet,
    stagesRec, P, T, Pabs, API, dp, muO
  });

  // ---- Draw SVG Sketch ----
  drawSepSketch(sepType, D, Lss, LiqFrac, phase);

  // ---- Render Stage Comparison Chart ----
  renderStagesChart(GOR, WC, API, P, Qo, Qw, Qg);
}

// ============================================================
//  STAGE RECOMMENDATION LOGIC (API 12J / GPSA Table)
// ============================================================
function recommStages(GOR, WC, API, P) {
  var stages = 1;
  var reason = [];

  if (GOR > 2000)  { stages = Math.max(stages, 3); reason.push('High GOR > 2000 SCF/bbl'); }
  else if (GOR > 500) { stages = Math.max(stages, 2); reason.push('Moderate GOR > 500 SCF/bbl'); }

  if (P > 500)     { stages = Math.max(stages, 2); reason.push('High wellhead pressure > 500 psig'); }
  if (WC > 70)     { stages = Math.max(stages, 3); reason.push('High water cut > 70%'); }
  if (API < 25)    { stages = Math.max(stages, 2); reason.push('Heavy crude (API < 25°)'); }

  if (reason.length === 0) reason.push('Standard single-stage separation adequate');

  return { stages, reason };
}

// ============================================================
//  DISPLAY RESULTS
// ============================================================
function displaySepDesignResults(r) {
  var typeNames = { H: 'Horizontal 3-Phase', V: 'Vertical 3-Phase', S: 'Spherical' };
  var phaseNames = { '2': '2-Phase (Gas/Liquid)', '3': '3-Phase (Gas/Oil/Water)' };

  // --- Section: Design Summary ---
  var sumDiv = document.getElementById('sd-summary');
  if (sumDiv) {
    sumDiv.innerHTML =
      sdBadge('Type',    typeNames[r.sepType] || r.sepType,   '#00b894') +
      sdBadge('Phase',   phaseNames[r.phase]  || r.phase,     '#0984e3') +
      sdBadge('Stages Recommended', r.stagesRec.stages + ' Stage(s)', '#e17055') +
      sdBadge('API Ref', 'API 12J / ASME Sec VIII / GPSA',   '#6c5ce7') +
      '<div class="sd-stage-reason"><ul>' +
        r.stagesRec.reason.map(function(s){ return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>';
  }

  // --- Section: Fluid Properties ---
  var fluidDiv = document.getElementById('sd-fluid-results');
  if (fluidDiv) {
    fluidDiv.innerHTML =
      sdRR('Oil SG', r.SGo.toFixed(4), '') +
      sdRR('Oil Density (ρo)', sdFmt(r.rhoO), 'lb/ft³') +
      sdRR('Gas Density (ρg)', sdFmt(r.rhoG), 'lb/ft³') +
      sdRR('Water Density (ρw)', sdFmt(r.rhoW), 'lb/ft³') +
      sdRR('Gas Mol. Weight', sdFmt(r.MW), 'g/mol') +
      sdRR('Z-Factor', r.Z.toFixed(4), '') +
      sdRR('Water Cut', sdFmt(r.WC), '%') +
      sdRR('GOR', sdFmt(r.GOR, 0), 'SCF/bbl');
  }

  // --- Section: Gas Sizing ---
  var gasDiv = document.getElementById('sd-gas-results');
  if (gasDiv) {
    gasDiv.innerHTML =
      sdRR('Souders-Brown K', sdFmt(r.Vmax / Math.sqrt((r.rhoO - r.rhoG) / r.rhoG), 2), '(input)') +
      sdRR('Max Gas Velocity (Vmax)', sdFmt(r.Vmax), 'ft/s', true) +
      sdRR('Actual Gas Flow', sdFmt(r.Qg_acfs), 'ft³/s') +
      sdRR('Req. Gas Area (Ag)', sdFmt(r.Ag_req), 'ft²') +
      sdRR('Available Gas Area', sdFmt(r.gasArea), 'ft²') +
      sdRR('Stokes Settling Vel.', sdFmt(r.Vt * 12), 'in/s') +
      sdRR('Liquid Flow Rate', sdFmt(r.Ql_ft3min), 'ft³/min') +
      sdRR('Actual Retention Time', sdFmt(r.retAct), 'min', true);
  }

  // --- Section: Vessel Dimensions ---
  var dimDiv = document.getElementById('sd-dim-results');
  if (dimDiv) {
    dimDiv.innerHTML =
      sdRR('Shell Inner Diameter', sdFmt(r.D) + ' ft / ' + sdFmt(r.D * 12, 1), 'in', true) +
      sdRR('Seam-to-Seam Length', sdFmt(r.Lss), 'ft', true) +
      sdRR('L/D Ratio', sdFmt(r.Lss / r.D, 2), '') +
      sdRR('Total Volume', sdFmt(r.Vtotal), 'ft³') +
      sdRR('Total Volume', sdFmt(r.Vtotal * 0.178107, 1), 'bbl') +
      sdRR('Liquid Volume', sdFmt(r.Vliq_act), 'ft³') +
      sdRR('Liquid Fill', sdFmt(r.LiqFrac * 100, 1), '%');
  }

  // --- Section: ASME Mechanical ---
  var mechDiv = document.getElementById('sd-mech-results');
  if (mechDiv) {
    mechDiv.innerHTML =
      sdRR('Design Pressure', sdFmt(r.P) + ' psig / ' + sdFmt(r.Pabs), 'psia') +
      sdRR('Shell Thickness (calc)', sdFmt(r.t_calc, 4), 'in') +
      sdRR('Shell Thickness (min + CA)', sdFmt(r.t_min, 4), 'in') +
      sdRR('Shell Thickness (std)', sdFmt(r.t_std, 4) + ' in (' + sdFmt(r.t_std * 25.4, 1) + ' mm)', '', true) +
      sdRR('Head Thickness (std)', sdFmt(r.t_head_std, 4) + ' in (' + sdFmt(r.t_head_std * 25.4, 1) + ' mm)', '') +
      sdRR('Allowable Stress (S)', sdFmt(r.Sallow, 0), 'psi') +
      sdRR('Weld Efficiency (E)', sdFmt(r.Je, 2), '') +
      sdRR('Corrosion Allowance', sdFmt(r.corr, 3), 'in') +
      sdRR('Est. Dry Weight', sdFmt(r.weightEst, 0) + ' lb / ' + sdFmt(r.weightKg, 0), 'kg', true);
  }

  // --- Section: Nozzles & Safety ---
  var nozzDiv = document.getElementById('sd-nozz-results');
  if (nozzDiv) {
    nozzDiv.innerHTML =
      sdRR('Gas Outlet Nozzle (min)', sdFmt(r.DgasNozzle, 1), 'in') +
      sdRR('Liquid Outlet Nozzle (min)', sdFmt(r.DliqNozzle, 1), 'in') +
      sdRR('Wetted Surface Area', sdFmt(r.Awet, 1), 'ft²') +
      sdRR('Relief Load (fire case)', sdFmt(r.QrelMscfd, 2), 'MSCFD equiv.') +
      sdRR('Design Standard', 'API 12J + ASME Sec VIII', '') +
      sdRR('Safety Relief', 'API 520 / API 521', '');
  }
}

// ============================================================
//  SVG VESSEL SKETCH
// ============================================================
function drawSepSketch(type, D, L, LiqFrac, phase) {
  var canvas = document.getElementById('sd-sketch');
  if (!canvas) return;

  var svgW = 700, svgH = 300;
  var svg = '';

  if (type === 'H') {
    // Horizontal vessel
    var vx = 60, vy = 80, vw = 500, vh = 140;
    var liqH = vh * LiqFrac;
    var oilH = phase === '3' ? liqH * 0.6 : liqH;
    var watH = phase === '3' ? liqH * 0.4 : 0;

    svg += '<defs>';
    svg += '<linearGradient id="gShell" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c0d8f0"/><stop offset="100%" stop-color="#8ab0d0"/></linearGradient>';
    svg += '<linearGradient id="gOil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8860a"/><stop offset="100%" stop-color="#7a4800"/></linearGradient>';
    svg += '<linearGradient id="gWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4499cc"/><stop offset="100%" stop-color="#1155aa"/></linearGradient>';
    svg += '<linearGradient id="gGas" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffeeaa"/><stop offset="100%" stop-color="#ddcc44" stop-opacity="0.6"/></linearGradient>';
    svg += '</defs>';

    // Shell
    svg += '<rect x="' + vx + '" y="' + vy + '" width="' + vw + '" height="' + vh + '" rx="' + (vh/2) + '" fill="url(#gShell)" stroke="#4477aa" stroke-width="3"/>';

    // Gas zone
    svg += '<clipPath id="cpH"><rect x="' + vx + '" y="' + vy + '" width="' + vw + '" height="' + vh + '" rx="' + (vh/2) + '"/></clipPath>';
    svg += '<rect x="' + vx + '" y="' + vy + '" width="' + vw + '" height="' + (vh - liqH) + '" fill="url(#gGas)" opacity="0.7" clip-path="url(#cpH)"/>';

    // Oil layer
    if (phase === '3') {
      svg += '<rect x="' + vx + '" y="' + (vy + vh - liqH) + '" width="' + vw + '" height="' + oilH + '" fill="url(#gOil)" opacity="0.85" clip-path="url(#cpH)"/>';
      svg += '<rect x="' + vx + '" y="' + (vy + vh - watH) + '" width="' + vw + '" height="' + watH + '" fill="url(#gWat)" opacity="0.85" clip-path="url(#cpH)"/>';
    } else {
      svg += '<rect x="' + vx + '" y="' + (vy + vh - liqH) + '" width="' + vw + '" height="' + liqH + '" fill="url(#gOil)" opacity="0.85" clip-path="url(#cpH)"/>';
    }

    // Interface lines
    svg += '<line x1="' + vx + '" y1="' + (vy + vh - liqH) + '" x2="' + (vx + vw) + '" y2="' + (vy + vh - liqH) + '" stroke="#ff9800" stroke-width="2" stroke-dasharray="8,4" opacity="0.8"/>';
    if (phase === '3') {
      svg += '<line x1="' + vx + '" y1="' + (vy + vh - watH) + '" x2="' + (vx + vw) + '" y2="' + (vy + vh - watH) + '" stroke="#0088cc" stroke-width="2" stroke-dasharray="8,4" opacity="0.8"/>';
    }

    // Inlet nozzle (left)
    svg += '<line x1="10" y1="' + (vy + vh/2) + '" x2="' + vx + '" y2="' + (vy + vh/2) + '" stroke="#555" stroke-width="8" stroke-linecap="round"/>';
    svg += '<text x="5" y="' + (vy + vh/2 - 12) + '" fill="#334" font-size="11" font-weight="700" font-family="Inter,sans-serif">INLET</text>';

    // Gas outlet (top)
    var gasOutX = vx + vw * 0.7;
    svg += '<line x1="' + gasOutX + '" y1="' + vy + '" x2="' + gasOutX + '" y2="20" stroke="#cc9900" stroke-width="6" stroke-linecap="round"/>';
    svg += '<polygon points="' + (gasOutX-8) + ',20 ' + (gasOutX+8) + ',20 ' + gasOutX + ',5" fill="#cc9900"/>';
    svg += '<text x="' + (gasOutX - 20) + '" y="18" fill="#aa7700" font-size="11" font-weight="700" font-family="Inter,sans-serif">GAS</text>';

    // Oil outlet (bottom-right)
    var oilOutX = vx + vw * 0.8;
    svg += '<line x1="' + oilOutX + '" y1="' + (vy + vh) + '" x2="' + oilOutX + '" y2="' + (svgH - 20) + '" stroke="#a05a00" stroke-width="6" stroke-linecap="round"/>';
    svg += '<polygon points="' + (oilOutX-8) + ',' + (svgH-20) + ' ' + (oilOutX+8) + ',' + (svgH-20) + ' ' + oilOutX + ',' + (svgH-5) + '" fill="#a05a00"/>';
    svg += '<text x="' + (oilOutX - 10) + '" y="' + (svgH - 2) + '" fill="#7a4000" font-size="11" font-weight="700" font-family="Inter,sans-serif">OIL</text>';

    if (phase === '3') {
      // Water outlet (bottom-left)
      var watOutX = vx + vw * 0.3;
      svg += '<line x1="' + watOutX + '" y1="' + (vy + vh) + '" x2="' + watOutX + '" y2="' + (svgH - 20) + '" stroke="#0088cc" stroke-width="6" stroke-linecap="round"/>';
      svg += '<polygon points="' + (watOutX-8) + ',' + (svgH-20) + ' ' + (watOutX+8) + ',' + (svgH-20) + ' ' + watOutX + ',' + (svgH-5) + '" fill="#0088cc"/>';
      svg += '<text x="' + (watOutX - 16) + '" y="' + (svgH - 2) + '" fill="#0066aa" font-size="11" font-weight="700" font-family="Inter,sans-serif">WATER</text>';
    }

    // Dimension labels
    svg += '<text x="' + (vx + vw/2) + '" y="' + (vy - 8) + '" text-anchor="middle" fill="#334" font-size="12" font-weight="700" font-family="Inter,sans-serif">L = ' + sdFmt(L) + ' ft</text>';
    svg += '<text x="' + (vx + vw + 14) + '" y="' + (vy + vh/2 + 4) + '" fill="#334" font-size="12" font-weight="700" font-family="Inter,sans-serif">D = ' + sdFmt(D) + ' ft</text>';

    // Zone labels
    svg += '<text x="' + (vx + 60) + '" y="' + (vy + (vh - liqH)/2 + 5) + '" fill="#996600" font-size="12" font-weight="700" font-family="Inter,sans-serif">GAS ZONE</text>';
    if (phase === '3') {
      svg += '<text x="' + (vx + 60) + '" y="' + (vy + vh - liqH + oilH/2 + 5) + '" fill="#fff" font-size="11" font-weight="700" font-family="Inter,sans-serif">OIL LAYER</text>';
      svg += '<text x="' + (vx + 60) + '" y="' + (vy + vh - watH/2 + 5) + '" fill="#eef" font-size="11" font-weight="700" font-family="Inter,sans-serif">WATER LAYER</text>';
    } else {
      svg += '<text x="' + (vx + 60) + '" y="' + (vy + vh - liqH/2 + 5) + '" fill="#fff" font-size="11" font-weight="700" font-family="Inter,sans-serif">LIQUID ZONE</text>';
    }

  } else if (type === 'V') {
    // Vertical vessel
    var vvx = 220, vvy = 20, vvw = 160, vvh = 250;
    var gasH = (1 - LiqFrac) * vvh;
    var liqHv = LiqFrac * vvh;
    var oilHv = phase === '3' ? liqHv * 0.6 : liqHv;
    var watHv = phase === '3' ? liqHv * 0.4 : 0;

    svg += '<defs><linearGradient id="gShellV" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8ab0d0"/><stop offset="100%" stop-color="#c0d8f0"/></linearGradient></defs>';
    // Shell
    svg += '<rect x="' + vvx + '" y="' + vvy + '" width="' + vvw + '" height="' + vvh + '" rx="' + (vvw/2) + '" fill="url(#gShellV)" stroke="#4477aa" stroke-width="3"/>';
    svg += '<clipPath id="cpV"><rect x="' + vvx + '" y="' + vvy + '" width="' + vvw + '" height="' + vvh + '" rx="' + (vvw/2) + '"/></clipPath>';
    // Gas zone (top)
    svg += '<rect x="' + vvx + '" y="' + vvy + '" width="' + vvw + '" height="' + gasH + '" fill="#ffe566" opacity="0.6" clip-path="url(#cpV)"/>';
    // Oil
    if (phase === '3') {
      svg += '<rect x="' + vvx + '" y="' + (vvy + gasH) + '" width="' + vvw + '" height="' + oilHv + '" fill="#c8860a" opacity="0.85" clip-path="url(#cpV)"/>';
      svg += '<rect x="' + vvx + '" y="' + (vvy + gasH + oilHv) + '" width="' + vvw + '" height="' + watHv + '" fill="#4499cc" opacity="0.85" clip-path="url(#cpV)"/>';
    } else {
      svg += '<rect x="' + vvx + '" y="' + (vvy + gasH) + '" width="' + vvw + '" height="' + liqHv + '" fill="#c8860a" opacity="0.85" clip-path="url(#cpV)"/>';
    }

    // Interface line
    svg += '<line x1="' + vvx + '" y1="' + (vvy + gasH) + '" x2="' + (vvx + vvw) + '" y2="' + (vvy + gasH) + '" stroke="#ff9800" stroke-width="2" stroke-dasharray="6,3"/>';
    if (phase === '3') {
      svg += '<line x1="' + vvx + '" y1="' + (vvy + gasH + oilHv) + '" x2="' + (vvx + vvw) + '" y2="' + (vvy + gasH + oilHv) + '" stroke="#0088cc" stroke-width="2" stroke-dasharray="6,3"/>';
    }

    // Nozzles
    svg += '<line x1="' + vvx + '" y1="' + (vvy + vvh * 0.6) + '" x2="' + (vvx - 50) + '" y2="' + (vvy + vvh * 0.6) + '" stroke="#555" stroke-width="8" stroke-linecap="round"/>';
    svg += '<text x="' + (vvx - 48) + '" y="' + (vvy + vvh * 0.6 - 12) + '" fill="#334" font-size="10" font-weight="700" font-family="Inter,sans-serif">INLET</text>';

    svg += '<line x1="' + (vvx + vvw/2) + '" y1="' + vvy + '" x2="' + (vvx + vvw/2) + '" y2="5" stroke="#cc9900" stroke-width="6" stroke-linecap="round"/>';
    svg += '<polygon points="' + (vvx+vvw/2-8) + ',5 ' + (vvx+vvw/2+8) + ',5 ' + (vvx+vvw/2) + ',-8" fill="#cc9900"/>';
    svg += '<text x="' + (vvx + vvw/2 - 12) + '" y="14" fill="#aa7700" font-size="10" font-weight="700" font-family="Inter,sans-serif">GAS</text>';

    svg += '<line x1="' + (vvx + vvw/2) + '" y1="' + (vvy + vvh) + '" x2="' + (vvx + vvw/2) + '" y2="' + (svgH - 5) + '" stroke="#0088cc" stroke-width="6" stroke-linecap="round"/>';
    svg += '<text x="' + (vvx + vvw/2 - 18) + '" y="' + (svgH - 6) + '" fill="#0066aa" font-size="10" font-weight="700" font-family="Inter,sans-serif">LIQUID</text>';

    // Labels
    svg += '<text x="' + (vvx + vvw/2) + '" y="' + (vvy - 5) + '" text-anchor="middle" fill="#334" font-size="11" font-weight="700" font-family="Inter,sans-serif">D = ' + sdFmt(D) + ' ft</text>';
    svg += '<text x="' + (vvx + vvw + 10) + '" y="' + (vvy + vvh/2) + '" fill="#334" font-size="11" font-weight="700" font-family="Inter,sans-serif">H = ' + sdFmt(L) + ' ft</text>';

    // Zone labels
    svg += '<text x="' + (vvx + vvw/2) + '" y="' + (vvy + gasH/2 + 5) + '" text-anchor="middle" fill="#996600" font-size="11" font-weight="700" font-family="Inter,sans-serif">GAS</text>';
    svg += '<text x="' + (vvx + vvw/2) + '" y="' + (vvy + gasH + oilHv/2 + 5) + '" text-anchor="middle" fill="#fff" font-size="10" font-weight="700" font-family="Inter,sans-serif">OIL</text>';
    if (phase === '3') {
      svg += '<text x="' + (vvx + vvw/2) + '" y="' + (vvy + gasH + oilHv + watHv/2 + 5) + '" text-anchor="middle" fill="#eef" font-size="10" font-weight="700" font-family="Inter,sans-serif">WATER</text>';
    }

  } else {
    // Spherical
    var cx = 250, cy = 150, cr = 110;
    svg += '<defs><radialGradient id="gSph" cx="40%" cy="35%"><stop offset="0%" stop-color="#d0e8f8"/><stop offset="100%" stop-color="#6090bb"/></radialGradient></defs>';
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + cr + '" fill="url(#gSph)" stroke="#4477aa" stroke-width="3"/>';
    svg += '<clipPath id="cpSph"><circle cx="' + cx + '" cy="' + cy + '" r="' + cr + '"/></clipPath>';
    svg += '<rect x="' + (cx-cr) + '" y="' + cy + '" width="' + (cr*2) + '" height="' + cr + '" fill="#c8860a" opacity="0.7" clip-path="url(#cpSph)"/>';
    svg += '<text x="' + cx + '" y="' + (cy - 20) + '" text-anchor="middle" fill="#996600" font-size="12" font-weight="700" font-family="Inter,sans-serif">GAS</text>';
    svg += '<text x="' + cx + '" y="' + (cy + 30) + '" text-anchor="middle" fill="#fff" font-size="12" font-weight="700" font-family="Inter,sans-serif">LIQUID</text>';
    svg += '<text x="' + cx + '" y="' + (cy + cr + 20) + '" text-anchor="middle" fill="#334" font-size="12" font-weight="700" font-family="Inter,sans-serif">D = ' + sdFmt(D) + ' ft (Spherical)</text>';
  }

  // Title bar
  svg += '<text x="' + svgW/2 + '" y="' + (svgH - 8) + '" text-anchor="middle" fill="#6688aa" font-size="10" font-family="Inter,sans-serif">Separator Cross-Section Schematic — Engineering View (Not to scale)</text>';

  canvas.innerHTML = '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">' + svg + '</svg>';
}

// ============================================================
//  STAGES COMPARISON CHART
// ============================================================
var sdStagesChart = null;

function renderStagesChart(GOR, WC, API, P, Qo, Qw, Qg) {
  var ctx = document.getElementById('sd-stages-chart');
  if (!ctx) return;

  // Simulate efficiency at each stage count
  var stages = [1, 2, 3];
  var recEfficiency = stages.map(function(n) {
    var base = 70;
    if (n >= 2) base = 88;
    if (n >= 3) base = 96;
    // Adjust for GOR
    if (GOR > 2000 && n < 3) base -= 12;
    if (WC > 70  && n < 2)  base -= 8;
    return Math.min(99, base);
  });

  var gasSep = stages.map(function(n) {
    return Math.min(99, 60 + n * 13 + (GOR > 1000 ? 5 : 0));
  });

  var liquidRec = stages.map(function(n) {
    return Math.min(99.5, 75 + n * 8);
  });

  if (sdStagesChart) { sdStagesChart.destroy(); }

  sdStagesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1-Stage', '2-Stage', '3-Stage'],
      datasets: [
        {
          label: 'Overall Efficiency (%)',
          data: recEfficiency,
          backgroundColor: ['rgba(231,76,60,0.7)', 'rgba(230,176,0,0.7)', 'rgba(0,184,148,0.7)'],
          borderColor:     ['#e74c3c', '#e6b000', '#00b894'],
          borderWidth: 2, borderRadius: 6
        },
        {
          label: 'Gas Separation (%)',
          data: gasSep,
          backgroundColor: ['rgba(231,76,60,0.4)', 'rgba(230,176,0,0.4)', 'rgba(0,184,148,0.4)'],
          borderColor:     ['#e74c3c', '#e6b000', '#00b894'],
          borderWidth: 1, borderRadius: 6
        },
        {
          label: 'Liquid Recovery (%)',
          data: liquidRec,
          backgroundColor: ['rgba(9,132,227,0.4)', 'rgba(9,132,227,0.55)', 'rgba(9,132,227,0.7)'],
          borderColor:     ['#0984e3', '#0984e3', '#0984e3'],
          borderWidth: 1, borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { font: { family: 'Inter', size: 11 }, color: '#475569' } },
        title: {
          display: true,
          text: 'Separation Efficiency vs Number of Stages (API 12J)',
          font: { family: 'Inter', size: 12, weight: '700' },
          color: '#1a2030'
        }
      },
      scales: {
        y: {
          min: 50, max: 100,
          ticks: { font: { family: 'JetBrains Mono', size: 11 }, color: '#94a3b8' },
          grid: { color: 'rgba(0,0,0,0.04)' },
          title: { display: true, text: 'Efficiency (%)', font: { family: 'Inter', size: 11 }, color: '#94a3b8' }
        },
        x: {
          ticks: { font: { family: 'Inter', size: 11, weight: '600' }, color: '#475569' },
          grid: { display: false }
        }
      }
    }
  });
}

// ============================================================
//  UPDATE MATERIAL DEFAULTS
// ============================================================
function sdUpdateMaterial() {
  var mat = document.getElementById('sd-material').value;
  var sEl = document.getElementById('sd-Sallow');
  if (!sEl) return;
  // Typical ASME Section II allowable stress at design temp
  var defaults = {
    'CS-A516-70': 17500,  // Carbon Steel ASTM A516 Gr 70
    'SS-304':     16700,  // Stainless 304
    'SS-316':     16700,  // Stainless 316
    'CS-A106':    15000,  // Carbon Steel A106
    'Duplex-2205': 20000  // Duplex Stainless
  };
  if (defaults[mat]) sEl.value = defaults[mat];
}

// ============================================================
//  INIT — run once on tab load
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Hook material change
  var matEl = document.getElementById('sd-material');
  if (matEl) matEl.addEventListener('change', sdUpdateMaterial);

  // Run initial calc when tab is opened
  var sepDesBtn = document.querySelector('.nav-btn[data-tab="sepdesign"]');
  if (sepDesBtn) {
    sepDesBtn.addEventListener('click', function() {
      setTimeout(calcSeparatorDesign, 100);
    });
  }

  // Enter key support
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    var active = document.querySelector('.tab-panel.active');
    if (active && active.id === 'tab-sepdesign') calcSeparatorDesign();
  });
});
