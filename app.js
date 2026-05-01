// ===== Hammar IPF - Smart SCADA Dashboard =====
// Interactive GOSP Dashboard Logic

(function () {
  "use strict";

  // ===== INITIAL DATA =====
  const initialData = [
    { id: "TRAIN 1", status: "ON",   inlet: 31731.52, oil: 22513.10, water: 9218.42,  gas: 64.8, sepVol: 60.0 },
    { id: "TRAIN 2", status: "ON",   inlet: 46508.43, oil: 37796.91, water: 8711.52,  gas: 36.1, sepVol: 60.0 },
    { id: "TRAIN 3", status: "ON",   inlet: 51067.11, oil: 39528.68, water: 11538.43, gas: 35.9, sepVol: 60.0 },
    { id: "TRAIN 4", status: "STOP", inlet: 0.0,      oil: 0.0,      water: 0.0,       gas: 0.0,  sepVol: 60.0 },
  ];

  // Deep clone for live editing
  let trainData = JSON.parse(JSON.stringify(initialData));

  // ===== HEADER CLOCK =====
  function updateClock() {
    const now = new Date();
    const el = document.getElementById("headerTime");
    if (el) {
      el.textContent = now.toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ===== FORMATTING =====
  function fmt(n) {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ===== ENGINEERING CALCULATIONS =====
  function calcResults(d) {
    const waterCut = d.inlet > 0 ? (d.water / d.inlet) * 100 : 0;
    const gor = d.oil > 0 ? (d.gas * 1000000) / d.oil : 0;
    const inletM3 = d.inlet * 0.15898;
    const retTime = inletM3 > 0 ? (d.sepVol * 1440) / inletM3 : 0;
    return { waterCut, gor, inletM3, retTime };
  }

  function calcGlobals() {
    const totInlet = trainData.reduce((s, d) => s + d.inlet, 0);
    const totOil   = trainData.reduce((s, d) => s + d.oil, 0);
    const totGas   = trainData.reduce((s, d) => s + d.gas, 0);
    const demulRate = ((totInlet * 158.98) * (15 / 1000000)) / 24;
    const gasEnergy = totGas * 1000;
    return { totInlet, totOil, totGas, demulRate, gasEnergy };
  }

  // ===== RENDER INPUT TABLE =====
  function renderInputTable() {
    const tbody = document.getElementById("inputTableBody");
    tbody.innerHTML = "";

    trainData.forEach((train, idx) => {
      const tr = document.createElement("tr");

      // Train ID (read-only)
      const tdId = document.createElement("td");
      tdId.innerHTML = `<span style="color:#00f0ff;font-weight:700;">${train.id}</span>`;
      tr.appendChild(tdId);

      // Status (dropdown)
      const tdStatus = document.createElement("td");
      const sel = document.createElement("select");
      sel.className = "status-select";
      sel.innerHTML = `<option value="ON" ${train.status==="ON"?"selected":""}>ON</option><option value="STOP" ${train.status==="STOP"?"selected":""}>STOP</option>`;
      sel.addEventListener("change", function () {
        trainData[idx].status = this.value;
        if (this.value === "STOP") {
          trainData[idx].inlet = 0; trainData[idx].oil = 0;
          trainData[idx].water = 0; trainData[idx].gas = 0;
        }
        renderInputTable();
        renderResultsTable();
        renderKPIs();
      });
      tdStatus.appendChild(sel);
      tr.appendChild(tdStatus);

      // Editable numeric fields
      const fields = ["inlet", "oil", "water", "gas", "sepVol"];
      fields.forEach(field => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.className = "editable-cell";
        input.value = train[field];
        input.step = field === "gas" ? "0.1" : field === "sepVol" ? "1" : "0.01";
        input.min = "0";
        input.id = `input-${idx}-${field}`;

        input.addEventListener("input", function () {
          const val = parseFloat(this.value) || 0;
          trainData[idx][field] = val;
          renderResultsTable();
          renderKPIs();
        });

        input.addEventListener("focus", function () {
          this.select();
        });

        td.appendChild(input);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  // ===== RENDER RESULTS TABLE =====
  function renderResultsTable() {
    const tbody = document.getElementById("resultsTableBody");
    tbody.innerHTML = "";

    trainData.forEach(train => {
      const r = calcResults(train);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="color:#00f0ff;font-weight:700;">${train.id}</td>
        <td>${fmt(r.waterCut)}</td>
        <td>${fmt(r.gor)}</td>
        <td>${fmt(r.inletM3)}</td>
        <td>${fmt(r.retTime)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ===== RENDER KPI CARDS =====
  function renderKPIs() {
    const g = calcGlobals();
    animateValue("kpiInletVal", g.totInlet);
    animateValue("kpiOilVal", g.totOil);
    animateValue("kpiDemulVal", g.demulRate);
    animateValue("kpiEnergyVal", g.gasEnergy);
  }

  // ===== ANIMATE KPI VALUES =====
  const currentValues = {};
  function animateValue(elementId, target) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const start = currentValues[elementId] || 0;
    currentValues[elementId] = target;
    const duration = 600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * ease;
      el.textContent = fmt(current);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ===== INITIALIZE =====
  document.addEventListener("DOMContentLoaded", function () {
    renderInputTable();
    renderResultsTable();
    renderKPIs();
  });
})();
