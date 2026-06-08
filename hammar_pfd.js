// ===== Hammar IPF — Process Flow Diagram (PFD) Interactive Logic =====
// Based on: Weatherford O&M Manual Vol.1, Zubair Field and Hammar Overview, Rev.00
// Figure 1 — Simplified Overview Hammar IPF

(function () {
  "use strict";

  // ===== EQUIPMENT DATA (from O&M Manual) =====
  const equipmentData = {
    "inlet": {
      title: "🟠 Production Fluids Inlet — from DGS",
      color: "#ffab40",
      rows: [
        ["Source", "Deep Gas Separator (DGS) Wells"],
        ["Total Throughput", "~129,307 bpd (all trains combined)"],
        ["Crude Composition", "Mishrif 46% + 3rd Pay 45.3% + 4th Pay 8.7%"],
        ["GOR Design Basis", "893 SCF/STOB"],
        ["Crude MW", "104.51 g/mol"],
        ["Sweet/Sour", "Sweet (No H₂S detected)"],
        ["Reservoir Types", "Carbonate (Mishrif) + Sandstone (3rd & 4th Pay)"]
      ],
      desc: "Production fluids from the Zubair Field wells are collected at the DGS manifold and piped to the IPF inlet. The feed is a 3-phase mixture of crude oil, produced water, and associated gas.",
      standards: "API-12J | API-14.1 | GPSA Engineering Data Book"
    },
    "sep1": {
      title: "🔵 1st Stage Separator — 3-Phase HP Vessel",
      color: "#00e676",
      rows: [
        ["Inlet Pressure", "15.2 – 36.6 barg (220 – 530 psig)"],
        ["Design Pressure", "138.7 barg (2012 psig)"],
        ["Inlet Temperature", "50°C (winter) – 77°C (summer)"],
        ["Design Temperature", "-5°C to +107°C"],
        ["Phase Separation", "Oil / Water / Gas (3-phase)"],
        ["Separator Volume", "60 m³ per train"],
        ["Retention Time", "3–5 minutes (API-12J)"],
        ["Design Life", "25 years"],
        ["Trains Active", "3 of 4 (Train 4 standby)"]
      ],
      desc: "The first-stage separator performs the primary three-phase separation. High-pressure gas exits the top to the LP Compressor, oil exits the side to the 2nd stage, and produced water exits the bottom to the water treatment header. Horizontal elliptical vessel per API-12J.",
      standards: "API-12J | ASME Sec.VIII Div.1 | API-14.1"
    },
    "sep2": {
      title: "🔵 2nd Stage Separator — 3-Phase LP Vessel",
      color: "#00e676",
      rows: [
        ["Stage", "LP (Low Pressure) 2nd Stage"],
        ["Gas Outlet", "→ LP Compressor → HP Compressor"],
        ["Oil Outlet", "→ Run Down Cooler → Desalter"],
        ["Water Outlet", "→ Produced Water Collection Header"],
        ["Design", "Horizontal 3-phase vessel"],
        ["Purpose", "Flash gas from stabilized oil"],
        ["Retention Time", "3–5 minutes (API-12J)"]
      ],
      desc: "The second-stage separator operates at lower pressure to flash remaining solution gas from the oil. The gas joins the LP compression train, oil proceeds to the run-down cooler, and water goes to the PW header.",
      standards: "API-12J | GPSA | ASTM-D4007"
    },
    "lp-comp": {
      title: "⚙️ LP Compressor — Low Pressure Gas Compression",
      color: "#ff5252",
      rows: [
        ["Type", "Low Pressure (LP) Reciprocating / Centrifugal Compressor"],
        ["Gas Source", "1st Stage + 2nd Stage Separator gas"],
        ["Outlet", "→ HP Compressor"],
        ["Gas Quality", "Sweet (no H₂S detected in design basis)"],
        ["N₂ content", "0.478 mol%"],
        ["CO₂ content", "0.874 mol%"],
        ["CH₄ content", "39.83 mol%"],
        ["LP Fuel Gas System", "Supplies fuel gas to utilities"]
      ],
      desc: "The LP compressor receives low-pressure gas from both separator stages, compresses it and sends it to the HP compressor for final export pressure boost. A fuel gas take-off provides LP fuel gas for local utility burners and engines.",
      standards: "API-619 | GPSA Sec.13 | API-14.1"
    },
    "hp-comp": {
      title: "⚙️ HP Compressor — High Pressure Gas Compression",
      color: "#ff5252",
      rows: [
        ["Type", "High Pressure (HP) Reciprocating / Centrifugal Compressor"],
        ["Gas Source", "LP Compressor outlet"],
        ["Outlet", "→ Crude/Crude Exchanger → Gas Export Pipeline"],
        ["HP Fuel Gas System", "Supplies HP fuel gas to process heaters"],
        ["HP Flare", "Emergency pressure relief to HP Flare header"],
        ["Gas MW", "~104.51 g/mol (blended composition)"],
        ["Total Compressed Gas", "~136.8 MMSCFD (design basis)"]
      ],
      desc: "The HP compressor is the final compression stage, raising gas pressure to pipeline export pressure. The HP fuel gas system takes a side stream to supply the crude oil heater and other high-pressure burners. HP flare connection provides safe pressure relief.",
      standards: "API-619 | API-520/521 | GPSA Sec.13"
    },
    "exchanger": {
      title: "🔁 Crude/Crude Exchanger — Heat Recovery Unit",
      color: "#ffab40",
      rows: [
        ["Type", "Shell & Tube Heat Exchanger"],
        ["Hot Side", "Hot crude from dehydrator outlet"],
        ["Cold Side", "Cool crude from 2nd stage separator"],
        ["Purpose", "Heat recovery to reduce fired heater duty"],
        ["Design Standard", "TEMA / ASME Sec.VIII"],
        ["Fouling Factor", "Per TEMA standards for crude service"]
      ],
      desc: "The crude/crude exchanger pre-heats the incoming cold crude stream using hot crude from the dehydrator, reducing the duty required by the fired crude oil heater. This is a key energy efficiency measure in the IPF design.",
      standards: "TEMA | ASME Sec.VIII | API-660"
    },
    "heater": {
      title: "🔥 Crude Oil Heater — Direct-Fired Treater",
      color: "#ff9800",
      rows: [
        ["Type", "Direct-fired crude oil heater"],
        ["Fuel", "HP Fuel Gas (from HP Compressor fuel gas system)"],
        ["Purpose", "Raise crude temperature for electrostatic desalting/dehydration"],
        ["Target Temperature", "As required for viscosity reduction"],
        ["Heat Source", "HP Fuel Gas burner"],
        ["Crude Viscosity at 15.6°C", "Mishrif: 33.47 cSt | 3rd Pay: 16.21 cSt | 4th Pay: 18.85 cSt"]
      ],
      desc: "The crude oil heater raises the temperature of the crude stream ahead of the electrostatic desalter/dehydrator to reduce viscosity and enhance water-oil separation efficiency. Fired with HP fuel gas taken from the compression train.",
      standards: "API-560 | ASME Sec.VIII | NFPA 86"
    },
    "gas-export": {
      title: "🚀 Gas Export Pipeline",
      color: "#ff5252",
      rows: [
        ["Total Gas Flow", "~136.8 MMSCFD (all trains combined)"],
        ["Gas Type", "Associated gas (sweet — no H₂S)"],
        ["N₂", "0.478 mol%"],
        ["CO₂", "0.874 mol%"],
        ["CH₄", "39.83 mol%"],
        ["C₂H₆", "9.74 mol%"],
        ["C₃H₈", "6.80 mol%"],
        ["C₄+ (heavier)", "Balance"],
        ["From Condensate Collection Header", "Additional condensate stream input"],
        ["Destination", "Gas export pipeline / grid"]
      ],
      desc: "Compressed and dried gas is exported via the high-pressure gas export pipeline. The pipeline also receives gas from the condensate collection header. Gas composition is sweet with no hydrogen sulphide per design basis.",
      standards: "API-14.1 | GPSA | ISO-3977"
    },
    "run-down-cooler": {
      title: "❄️ Run Down Cooler — Air Fin Cooler",
      color: "#29b6f6",
      rows: [
        ["Type", "Air-Cooled Heat Exchanger (Fin-Fan Cooler)"],
        ["Inlet", "Hot crude from 2nd Stage Separator / Charge Pumps"],
        ["Outlet", "→ Desalter at controlled temperature"],
        ["Purpose", "Cool crude to optimum electrostatic treating temperature"],
        ["Cooling Medium", "Ambient air (forced draft)"],
        ["Control", "Outlet temperature controlled to desalter set point"]
      ],
      desc: "The run-down cooler is an air-fin cooler that cools the crude stream from the second-stage separator to the optimum temperature for the electrostatic desalter. Charge pumps boost the crude through the cooler at the required flow rate.",
      standards: "API-661 | ASME Sec.VIII | ISO-13706"
    },
    "charge-pumps": {
      title: "🔄 Charge Pumps — Crude Transfer Pumps",
      color: "#ffab40",
      rows: [
        ["Type", "Centrifugal charge pumps"],
        ["Service", "Transfer crude from 2nd stage to Run Down Cooler → Desalter train"],
        ["Normal", "1 duty + 1 spare configuration"],
        ["Fluid", "Degassed crude oil"],
        ["Operating Pressure", "As required for downstream equipment"],
        ["Control", "Flow-controlled to maintain desalter throughput"]
      ],
      desc: "Charge pumps transfer degassed crude oil from the low-pressure separator to the run-down cooler and the downstream electrostatic treating train. They provide the necessary pressure boost to overcome system pressure drop.",
      standards: "API-610 | ISO-13709"
    },
    "desalter": {
      title: "🧪 Desalter — Electrostatic Desalting Vessel",
      color: "#ffab40",
      rows: [
        ["Type", "Electrostatic Horizontal Desalter"],
        ["Purpose", "Remove dissolved salts from crude oil"],
        ["Wash Water Injection", "~5–10% vol wash water injected"],
        ["Salt Removal Efficiency", ">90% typical"],
        ["Operating Temp", "After crude oil heater (elevated temperature)"],
        ["Wash Water Source", "Wash Water Recirculation Pumps"],
        ["Water Outlet", "→ Produced Water Collection Header"],
        ["Oil Outlet", "→ Dehydrator"]
      ],
      desc: "The electrostatic desalter uses a high-voltage electrical field to coalesce and settle water droplets that contain dissolved salts. Fresh wash water is injected and mixed with the crude, then the salt-laden water is separated under the electric field.",
      standards: "ASTM-D4929 | API-12L | NACE"
    },
    "dehydrator": {
      title: "💡 Dehydrator — Electrostatic Oil Treater",
      color: "#ffab40",
      rows: [
        ["Type", "Electrostatic Horizontal Treater (FWKO + Electrostatic)"],
        ["Purpose", "Reduce BS&W to pipeline export specification"],
        ["Target BS&W", "<0.5% (or per export contract)"],
        ["Operating Mechanism", "High-voltage electrostatic coalescing"],
        ["Oil Outlet", "→ Crude Oil Tank (on-spec)"],
        ["Off-spec Oil", "→ Off-Spec Crude Tank → Off-Spec Pumps"],
        ["Water Outlet", "→ Produced Water Collection Header"],
        ["Wash Water", "→ Recirculation from Wash Water Pumps"]
      ],
      desc: "The dehydrator is the final oil treating step. High-voltage electric fields cause fine water droplets in the oil emulsion to coalesce and settle out. On-spec crude proceeds to the crude oil storage tank, while off-spec crude is recycled for re-treatment.",
      standards: "ASTM-D4007 | API-12L | API-RP-55"
    },
    "crude-tank": {
      title: "🛢️ Crude Oil Tank — On-Spec Storage",
      color: "#ffc107",
      rows: [
        ["Type", "Atmospheric Fixed/Floating Roof Tank"],
        ["Service", "On-spec crude oil storage before export"],
        ["BS&W spec", "<0.5% BS&W"],
        ["Salt spec", "<10 PTB (pounds per thousand barrels)"],
        ["Oil Outlet", "→ Crude Oil Export Pumps → Crude Oil Export Pipeline"],
        ["Floating Roof", "Required per API-650 for vapour control"]
      ],
      desc: "The crude oil storage tank receives on-specification crude from the dehydrator. The tank provides intermediate buffer storage between the continuous production process and the batch export operations via pipeline.",
      standards: "API-650 | API-2000 | NFPA-30"
    },
    "offspec-tank": {
      title: "⚠️ Off-Spec Crude Tank — Substandard Crude",
      color: "#ff9800",
      rows: [
        ["Purpose", "Temporary storage of off-spec crude (high BS&W / salt)"],
        ["Off-Spec Condition", "BS&W > 0.5% OR Salt > 10 PTB"],
        ["Outlet", "→ Off-Spec Transfer Pumps → re-inject to desalter/dehydrator"],
        ["Recycle", "Off-spec crude is recycled back for re-treatment"],
        ["Trigger", "Dehydrator outlet quality monitor trips the valve"]
      ],
      desc: "The off-spec crude tank collects crude that fails the export quality specification. Off-spec transfer pumps recirculate this crude back to the desalter/dehydrator inlet for re-treatment, preventing substandard crude from entering the export pipeline.",
      standards: "API-650 | API-2000"
    },
    "crude-export-pumps": {
      title: "🚀 Crude Oil Export Pumps",
      color: "#00e676",
      rows: [
        ["Type", "High-pressure centrifugal export pumps"],
        ["Service", "Export on-spec crude oil to pipeline"],
        ["Configuration", "Multiple duty + spare pumps"],
        ["Destination", "Crude Oil Export Pipeline → Zubair metering / export"],
        ["Pressure", "As required for pipeline header pressure"],
        ["Total Export", "~100,000 bpd (Hammar IPF design)"]
      ],
      desc: "The crude oil export pumps boost on-spec crude oil from atmospheric tank pressure to the required export pipeline operating pressure. Multiple pump sets ensure high-availability for continuous export operations.",
      standards: "API-610 | ISO-13709"
    },
    "offspec-pumps": {
      title: "🔄 Off-Spec Oil Transfer Pumps",
      color: "#ff9800",
      rows: [
        ["Type", "Centrifugal transfer pumps"],
        ["Service", "Transfer off-spec crude from off-spec tank back to treating train"],
        ["Outlet", "→ Desalter inlet or dehydrator inlet for re-treatment"],
        ["Control", "Automatic start on high level in off-spec tank"]
      ],
      desc: "Off-spec transfer pumps automatically recirculate substandard crude oil from the off-spec tank back to the front of the treating train for re-processing through the desalter and dehydrator.",
      standards: "API-610"
    },
    "wash-recirc": {
      title: "💧 Wash Water Recirculation Pumps",
      color: "#00e676",
      rows: [
        ["Type", "Centrifugal recirculation pumps"],
        ["Source", "Produced Water Collection Header"],
        ["Injection Points", "Desalter + Dehydrator wash water injection"],
        ["Rate", "~5–10% of crude throughput vol"],
        ["Purpose", "Dilute salt concentration in treating vessels"],
        ["Water Quality", "Produced water (after partial treatment)"]
      ],
      desc: "Wash water recirculation pumps take water from the produced water collection header and inject it as wash water into the electrostatic desalter and dehydrator vessels to dilute the salt concentration and aid coalescence.",
      standards: "API-12L | NACE"
    },
    "pw-transfer": {
      title: "💧 Produced Water Transfer Pumps",
      color: "#29b6f6",
      rows: [
        ["Type", "Centrifugal transfer pumps"],
        ["Source", "Produced Water Collection Header (from all separators)"],
        ["Outlet", "→ Produced Water Buffer Tank"],
        ["Total PW Volume", "~29,468 bpd combined from all trains"],
        ["Water Properties", "pH 5.05 | SG 1.1354 | TDS 213,152 ppm"],
        ["Chloride", "131,989 ppm"],
        ["Sodium", "58,677 ppm"]
      ],
      desc: "Produced water from all three separator trains is collected in a common header and transferred by these pumps to the produced water buffer tank for subsequent treatment and reinjection.",
      standards: "API-610 | NACE MR0175"
    },
    "pw-buffer": {
      title: "💧 Produced Water Buffer Tank",
      color: "#29b6f6",
      rows: [
        ["Type", "Atmospheric storage / buffer tank"],
        ["Purpose", "Buffer storage between transfer pumps and treatment package"],
        ["Fluid", "Untreated produced water"],
        ["TDS", "213,152 ppm"],
        ["pH", "5.05"],
        ["SG", "1.1354"],
        ["Outlet", "→ Produced Water Treatment Package"]
      ],
      desc: "The produced water buffer tank provides surge capacity between the upstream production trains and the downstream water treatment package, allowing for flow equalization and settling of coarse solids.",
      standards: "API-650"
    },
    "pw-treatment": {
      title: "🌊 Produced Water Treatment Package",
      color: "#29b6f6",
      rows: [
        ["Technology", "Hydrocyclones + Skim Tank + Flotation / Filtration"],
        ["Inlet Oil in Water", "~500–2000 ppm (typical)"],
        ["Outlet Oil in Water", "<40 ppm (for injection spec)"],
        ["TDS", "213,152 ppm"],
        ["Calcium", "15,720 ppm"],
        ["Magnesium", "3,434 ppm"],
        ["Sulphate", "500 ppm"],
        ["Bicarbonate", "103 ppm"],
        ["Purpose", "Remove residual oil and suspended solids"]
      ],
      desc: "The produced water treatment package reduces residual oil in water from separator-outlet levels to below the reinjection specification of <40 ppm. Typical equipment includes deoiling hydrocyclones, skim tank, and induced gas flotation (IGF) or walnut shell filters.",
      standards: "API-12L | NACE | EPA guidelines | OSPAR MO9"
    },
    "treated-pw-tank": {
      title: "✅ Treated Produced Water Tank",
      color: "#00e676",
      rows: [
        ["Fluid", "Treated produced water (oil-in-water <40 ppm)"],
        ["Purpose", "Buffer tank ahead of injection pumps"],
        ["Outlet", "→ Water Injection Pumps → Injection Wells"],
        ["Quality", "<40 ppm oil | Solids filtered"],
        ["Corrosion", "Corrosion inhibitor dosed to prevent well damage"]
      ],
      desc: "Treated produced water that meets the reservoir injection specification is stored in this tank before being pumped to the injection wells. The water must meet strict quality criteria to avoid well formation damage.",
      standards: "API-RP-45 | NACE MR0175"
    },
    "water-injection": {
      title: "💉 Water Injection Pumps — High Pressure",
      color: "#00e676",
      rows: [
        ["Type", "High-pressure multi-stage centrifugal pumps"],
        ["Service", "Inject treated produced water into reservoir"],
        ["Injection Pressure", "High pressure (above reservoir pressure)"],
        ["Purpose", "Pressure maintenance in Zubair reservoir"],
        ["Destination", "Injection Wells → Zubair Reservoir"],
        ["Configuration", "Multiple duty + spare"],
        ["Chemical", "Scale inhibitor + corrosion inhibitor dosed at pump suction"]
      ],
      desc: "High-pressure injection pumps inject treated produced water into the Zubair reservoir to maintain reservoir pressure and support oil production rates (pressure maintenance / water flooding). Critical for long-term field production sustainability.",
      standards: "API-610 | ISO-13709 | NACE MR0175"
    }
  };

  // ===== SHOW DETAIL MODAL =====
  window.pfdShowDetail = function (equipId) {
    const d = equipmentData[equipId];
    if (!d) return;

    const modal = document.getElementById("pfdModal");
    const content = document.getElementById("pfdModalContent");
    if (!modal || !content) return;

    // Build rows HTML
    let rowsHtml = d.rows.map(([k, v]) =>
      `<tr>
        <td style="padding:7px 10px;font-size:11px;color:#8ab4d4;white-space:nowrap;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${k}</td>
        <td style="padding:7px 10px;font-size:11px;color:#e0e6f0;border-bottom:1px solid rgba(255,255,255,0.05);">${v}</td>
      </tr>`
    ).join("");

    content.innerHTML = `
      <div style="border-left:4px solid ${d.color};padding-left:14px;margin-bottom:20px;">
        <h2 style="font-size:16px;font-weight:800;color:${d.color};margin:0 0 4px;">${d.title}</h2>
        <p style="font-size:12px;color:#8ab4d4;margin:0;line-height:1.6;">${d.desc}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:rgba(0,0,0,0.2);border-radius:8px;overflow:hidden;margin-bottom:16px;">
        <thead>
          <tr style="background:rgba(${hexToRgb(d.color)},0.12);">
            <th style="padding:8px 10px;font-size:10px;color:${d.color};text-align:left;text-transform:uppercase;letter-spacing:1px;">Parameter</th>
            <th style="padding:8px 10px;font-size:10px;color:${d.color};text-align:left;text-transform:uppercase;letter-spacing:1px;">Value</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div style="font-size:10px;color:#666;padding:8px 12px;background:rgba(0,0,0,0.2);border-radius:6px;font-family:monospace;">
        📚 Standards: ${d.standards}
      </div>
    `;

    modal.style.display = "flex";
    document.getElementById("pfdModalBox").style.animation = "none";
    setTimeout(() => { document.getElementById("pfdModalBox").style.animation = ""; }, 10);
  };

  // ===== CLOSE MODAL =====
  window.pfdCloseModal = function () {
    const modal = document.getElementById("pfdModal");
    if (modal) modal.style.display = "none";
  };

  // Close modal on backdrop click
  document.addEventListener("click", function (e) {
    const modal = document.getElementById("pfdModal");
    if (modal && e.target === modal) pfdCloseModal();
  });

  // Close modal on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") pfdCloseModal();
  });

  // ===== PFD NODE HOVER EFFECTS =====
  document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = `
      .pfd-node rect, .pfd-node ellipse {
        transition: filter 0.2s, stroke-width 0.2s;
      }
      .pfd-node:hover rect, .pfd-node:hover ellipse {
        filter: brightness(1.35);
        stroke-width: 2.5 !important;
      }
      .pfd-node:hover {
        filter: drop-shadow(0 0 8px rgba(0,240,255,0.4));
      }
      #pfdModal {
        backdrop-filter: blur(6px);
        animation: pfdFadeIn 0.2s ease;
      }
      @keyframes pfdFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  });

  // Helper: hex to rgb for rgba()
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
  }

})();
