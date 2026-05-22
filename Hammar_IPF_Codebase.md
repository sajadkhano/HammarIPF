# 🛢️ Hammar IPF - Smart SCADA & Engineering Dashboard
## Complete Project Codebase and Documentation

This document contains the entire source code of the Hammar IPF project, including the frontend SCADA simulation (HTML, CSS, JS, Manifest, Service Worker) and the backend Streamlit analysis script (`app.py`).

## 📁 Project Structure
```text
HammarIPF/
├── README.md
├── index.html
├── styles.css
├── core.js
├── features.js
├── charts.js
├── app.js
├── login.css
├── login.js
├── sw.js
├── manifest.json
├── app.py
└── requirements.txt
```

---

## 📄 File: `README.md`
**Path:** `HammarIPF/README.md`
```markdown
# Hammar IPF - Smart SCADA & Engineering Dashboard 🛢️

![Hammar SCADA](https://img.shields.io/badge/Platform-Smart%20SCADA-blue)
![API Standards](https://img.shields.io/badge/Standards-API%2012J%20%7C%20ASTM-green)

An advanced GOSP (Gas Oil Separation Plant) simulation and engineering platform designed for real-time monitoring and calculation of oil and gas surface facilities.

---

## 🌟 Key Features
- **Interactive SVG Process Flow:** Real-time animated schematic of the plant (Wellhead to Export).
- **Engineering Calculators:** 
  - 3-Phase Separator Sizing (API 12J / Souders-Brown).
  - Oil Treatment (Dehydration & Desalting).
  - Produced Water Treatment.
  - Gas Treatment & Sweetening.
  - Chemical Injection Rates.
- **Dynamic Simulation:** Real-time mass balance and performance monitoring.
- **PWA Ready:** Installable on mobile and desktop for offline monitoring.
- **Bilingual Support:** Full English & Arabic interface.
- **Digital Twin:** Integrated 3D visualization of the GOSP station.

## 🛠️ Standards & Compliance
This project adheres to international engineering standards:
- **API 12J:** Specification for Oil and Gas Separators.
- **ASTM D4007:** Standard Test Method for Water and Sediment.
- **GPSA:** Engineering Data Book for Gas Processing.
- **API 14.1 / 14.5:** Gas Sampling & Measurement.

## 🚀 How to Run
1. **Local Demo:** Run `start_online.vbs` to start the local server and create a secure tunnel for global access.
2. **Web Version:** Open `index.html` in any modern browser.
3. **Data Analysis:** Use the Streamlit version (`app.py`) for deep data analytics.

---
### 👤 Developer
**Sajad Khano**
[GitHub Profile](https://github.com/sajadkhano)

---
*Disclaimer: This is an engineering simulation tool. Always verify results with certified engineering software before field application.*

```

---

## 📄 File: `index.html`
**Path:** `HammarIPF/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Hammar SCADA">
<meta name="theme-color" content="#1a2030">
<meta name="msapplication-TileColor" content="#1a2030">
<title>Hammar IPF - Smart SCADA</title>
<meta name="description" content="Advanced GOSP simulation platform for oil separation, gas treatment, and surface facilities engineering">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="icon" type="image/png" href="icon-192.png">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="login.css">
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js')}</script>
</head>
<body>

<!-- HEADER -->
<header class="header">
  <div class="header-left">
    <img src="شعار الجامعة.jpg" style="width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 0 5px rgba(0,240,255,0.2));">

    <div>
      <div class="logo-stack">
        <div class="station-logo-crop" style="width:45px;height:45px;">
          <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
            <defs>
              <linearGradient id="shieldGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#00f0ff" />
                <stop offset="100%" stop-color="#00e676" />
              </linearGradient>
            </defs>
            <path d="M50,5 L90,25 L90,75 L50,95 L10,75 L10,25 Z" fill="none" stroke="url(#shieldGrad2)" stroke-width="3" />
            <rect x="40" y="45" width="8" height="35" fill="#00f0ff" opacity="0.8" />
            <rect x="52" y="35" width="8" height="45" fill="#00e676" opacity="0.8" />
            <path d="M30,40 Q50,20 70,40" fill="none" stroke="#ffc107" stroke-width="2" />
            <circle cx="50" cy="55" r="10" fill="#1a2030" stroke="#00f0ff" stroke-width="1" />
            <path d="M50,50 Q55,55 50,62 Q45,55 50,50" fill="#ffab40" />
          </svg>
        </div>
        <h1 class="header-title">🎛️ Hammar IPF - Smart SCADA</h1>
      </div>
      <p class="header-sub">Advanced GOSP Simulation &amp; Engineering Calculator — API/ASTM Standards</p>
    </div>
  </div>
  <div class="header-right">
    <button class="icon-btn" id="voiceBtn" onclick="toggleVoice()" title="Voice Control">🎤</button>
    <button class="icon-btn" id="themeBtn" onclick="toggleTheme()" title="Toggle Theme">🌓</button>
    
    <!-- ALARMS DROPDOWN -->
    <div class="alarm-dropdown-container">
      <button class="icon-btn" id="alarmToggle" onclick="toggleAlarms()" title="System Alarms">
        🚨 <span id="alarmCount" class="badge-mini">0</span>
      </button>
      <div class="alarm-panel minimized" id="alarmPanel">
        <div class="alarm-head" onclick="toggleAlarms()">
          🚨 <span data-i18n="alarms_title">System Alarms</span>
        </div>
        <div class="alarm-list" id="alarmList"></div>
      </div>
    </div>

    <button class="sim-btn" id="simBtn" onclick="toggleSimulation()" data-i18n="sim_off">▶️ Live: OFF</button>
    <button class="lang-btn" id="langBtn" onclick="toggleLang()">العربية</button>
    <div class="pulse-dot"></div><span class="sys-on" data-i18n="status_online">ONLINE</span>
    <span class="clock" id="clock"></span>
  </div>
</header>

<!-- LAYOUT -->
<div class="layout">

  <!-- SIDEBAR NAV -->
  <nav class="sidebar" id="sidebar">
    <button class="nav-btn active" data-tab="overview">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" fill="currentColor"/></svg>
      Overview
    </button>
    <button class="nav-btn" data-tab="separator">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" fill="currentColor"/></svg>
      Separator Calc
    </button>
    <button class="nav-btn" data-tab="trains">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" fill="currentColor"/></svg>
      Production Trains
    </button>
    <button class="nav-btn" data-tab="gas">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M17.66,11.2C17.43,10.9 17.15,10.64 16.89,10.38C16.22,9.7 15.46,9.03 15.46,7.73C15.46,6.5 15.93,5.17 16.12,4.04C16.17,3.77 16.22,3.5 16.22,3.22C16.22,2.56 15.93,2 15.43,1.72C14.77,1.35 14.05,1.88 13.79,2.54L13.77,2.56C13.29,3.77 12.63,4.94 12.63,6.23V6.24C12.63,7.74 13.57,9.05 13.57,10.56C13.57,11.3 13.04,11.9 12.47,12.46C11.66,13.28 10.8,14.11 10.8,15.91C10.8,18.9 13.3,21.32 16.46,21.32C19.61,21.32 22.11,18.9 22.11,15.91C22.11,14.3 21.11,12.91 20.11,11.83L17.66,11.2M14.6,20.08C13.85,20.08 13.25,19.46 13.25,18.71C13.25,17.96 13.85,17.34 14.6,17.34C15.35,17.34 15.95,17.96 15.95,18.71C15.95,19.46 15.35,20.08 14.6,20.08M16.63,16.03C15.38,16.03 14.38,15.03 14.38,13.78C14.38,12.53 15.38,11.53 16.63,11.53C17.88,11.53 18.88,12.53 18.88,13.78C18.88,15.03 17.88,16.03 16.63,16.03Z" fill="currentColor"/></svg>
      Gas Treatment
    </button>
    <button class="nav-btn" data-tab="oil">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,2C12,2 6,10 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14C18,10 12,2 12,2Z" fill="currentColor"/></svg>
      Oil Treatment
    </button>
    <button class="nav-btn" data-tab="water">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" fill="currentColor"/></svg>
      Water Treatment
    </button>
    <button class="nav-btn" data-tab="chemical">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" fill="currentColor"/></svg>
      Chemical Injection
    </button>
    <button class="nav-btn" data-tab="storage">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M18,18H6V17H18V18M18,16H6V15H18V16M18,14H6V13H18V14M18,12H6V11H18V12M18,10H6V9H18V10M18,8H6V7H18V8M19,4H5A2,2 0 0,0 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4Z" fill="currentColor"/></svg>
      Storage & Export
    </button>
    <button class="nav-btn" data-tab="charts">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" fill="currentColor"/></svg>
      Charts
    </button>
    <button class="nav-btn" data-tab="equations">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M19,19H5V5H19V19M11,7H13V9H11V7M11,11H13V13H11V11M11,15H13V17H11V15M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z" fill="currentColor"/></svg>
      Equations
    </button>
    <button class="nav-btn" data-tab="diagram">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" fill="currentColor"/></svg>
      Process Diagram
    </button>
    <button class="nav-btn" data-tab="control">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z" fill="currentColor"/></svg>
      Control Panel
    </button>
  </nav>


  <!-- MAIN CONTENT -->
  <main class="content" id="content">

    <!-- ===== OVERVIEW TAB ===== -->
    <div class="tab-panel active" id="tab-overview">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()" title="Back"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()" title="Forward"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="exportPDF()" style="margin-right:8px;background:#e91e63;color:#fff;border:none;">📄 Daily Report</button><button class="save-btn" onclick="savePanel('tab-overview')">💾 Save</button></div>
      <div class="panel-title" data-i18n="overview_title">Plant Overview — Process Flow Schematic</div>
      
      <!-- Live System Summary Panel -->
      <div class="calc-card glass" style="margin-bottom:20px; border-left: 4px solid var(--gas-light);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
          <h3 style="font-size:14px; color:var(--text); font-weight:800; text-transform:uppercase; letter-spacing:1px;">🛰️ Live System Summary</h3>
          <div style="display:flex; gap:10px;">
            <span class="sys-on" style="background:var(--gas-bg); padding:4px 10px; border-radius:4px; font-size:10px;">GOSP-1 ACTIVE</span>
            <span class="sys-on" style="background:var(--water-bg); color:var(--water); padding:4px 10px; border-radius:4px; font-size:10px;">TUNNEL SECURED</span>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px;">
          <div style="background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid var(--card-border);">
            <div style="font-size:10px; color:var(--text3); text-transform:uppercase;">Station Throughput</div>
            <div style="font-family:var(--mono); font-size:18px; font-weight:700; color:var(--oil-light);" id="sum-inlet">135,420 <span style="font-size:10px;">bpd</span></div>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid var(--card-border);">
            <div style="font-size:10px; color:var(--text3); text-transform:uppercase;">Export Quality (BS&W)</div>
            <div style="font-family:var(--mono); font-size:18px; font-weight:700; color:var(--gas-light);">0.15 <span style="font-size:10px;">%</span></div>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid var(--card-border);">
            <div style="font-size:10px; color:var(--text3); text-transform:uppercase;">Gas Energy Output</div>
            <div style="font-family:var(--mono); font-size:18px; font-weight:700; color:var(--water-light);">12.4 <span style="font-size:10px;">MMBTU/D</span></div>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid var(--card-border);">
            <div style="font-size:10px; color:var(--text3); text-transform:uppercase;">System Health</div>
            <div style="font-family:var(--mono); font-size:18px; font-weight:700; color:var(--gas);">STABLE</div>
          </div>
        </div>
      </div>

      <!-- SVG Process Schematic -->
      <div class="schematic-wrap">
        <svg id="plantSVG" viewBox="0 0 1100 520" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="oilG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4a2800"/><stop offset="100%" stop-color="#a05a00"/></linearGradient>
            <linearGradient id="gasG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8b0000"/><stop offset="100%" stop-color="#ff4444"/></linearGradient>
            <linearGradient id="watG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#003366"/><stop offset="100%" stop-color="#0088cc"/></linearGradient>
            <linearGradient id="vesG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a3a5a"/><stop offset="100%" stop-color="#1a2540"/></linearGradient>
            <filter id="glw"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <marker id="arrO" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#a05a00"/></marker>
            <marker id="arrG" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#ff4444"/></marker>
            <marker id="arrW" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#0088cc"/></marker>
            <marker id="arrC" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#00e676"/></marker>
          </defs>
          <!-- Background grid -->
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,240,255,0.03)" stroke-width="0.5"/></pattern>
          <rect width="1100" height="520" fill="url(#grid)"/>
          <!-- WELLHEAD -->
          <g class="svg-node" onclick="switchTab('separator')" style="cursor:pointer">
            <rect x="20" y="180" width="80" height="100" rx="6" fill="url(#vesG)" stroke="#00f0ff" stroke-width="1"/>
            <line x1="60" y1="180" x2="60" y2="140" stroke="#00f0ff" stroke-width="2"/>
            <circle cx="60" cy="135" r="8" fill="none" stroke="#00f0ff" stroke-width="1.5"/>
            <line x1="45" y1="135" x2="75" y2="135" stroke="#00f0ff" stroke-width="1.5"/>
            <text x="60" y="240" text-anchor="middle" fill="#00f0ff" font-size="10" font-weight="700" data-i18n="svg_wellhead">WELLHEAD</text>
            <text x="60" y="255" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-well">— bpd</text>
          </g>
          <!-- Flow: Wellhead to Manifold -->
          <line x1="100" y1="230" x2="150" y2="230" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
          <!-- MANIFOLD -->
          <g class="svg-node">
            <rect x="155" y="200" width="70" height="60" rx="6" fill="url(#vesG)" stroke="#ffab40" stroke-width="1"/>
            <line x1="175" y1="215" x2="175" y2="245" stroke="#ffab40" stroke-width="1.5"/>
            <line x1="190" y1="215" x2="190" y2="245" stroke="#ffab40" stroke-width="1.5"/>
            <line x1="205" y1="215" x2="205" y2="245" stroke="#ffab40" stroke-width="1.5"/>
            <text x="190" y="275" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700" data-i18n="svg_manifold">MANIFOLD</text>
            <text x="190" y="290" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-manifold">— bpd</text>
          </g>
          <!-- Flow: Manifold to HP Sep -->
          <line x1="225" y1="230" x2="280" y2="230" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
          <!-- HP SEPARATOR (horizontal vessel) -->
          <g class="svg-node" onclick="switchTab('separator')" style="cursor:pointer">
            <rect x="285" y="195" width="140" height="70" rx="35" fill="url(#vesG)" stroke="#00e676" stroke-width="1.5"/>
            <line x1="285" y1="235" x2="425" y2="235" stroke="#a05a00" stroke-width="1" opacity="0.5"/>
            <rect x="310" y="210" width="90" height="15" rx="3" fill="#a05a00" opacity="0.3"/>
            <rect x="310" y="235" width="90" height="15" rx="3" fill="#003366" opacity="0.3"/>
            <text x="355" y="275" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700" data-i18n="svg_hpsep">HP SEPARATOR</text>
            <text x="355" y="290" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-hpsep">— bpd</text>
          </g>
          <!-- Flow: HP to LP -->
          <line x1="425" y1="230" x2="480" y2="230" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
          <!-- LP SEPARATOR -->
          <g class="svg-node" onclick="switchTab('separator')" style="cursor:pointer">
            <rect x="485" y="195" width="130" height="70" rx="35" fill="url(#vesG)" stroke="#00e676" stroke-width="1.5"/>
            <rect x="505" y="210" width="85" height="15" rx="3" fill="#a05a00" opacity="0.3"/>
            <rect x="505" y="235" width="85" height="15" rx="3" fill="#003366" opacity="0.3"/>
            <text x="550" y="275" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700" data-i18n="svg_lpsep">LP SEPARATOR</text>
            <text x="550" y="290" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-lpsep">— bpd</text>
          </g>
          <!-- GAS out from HP Sep -->
          <line x1="355" y1="195" x2="355" y2="80" stroke="url(#gasG)" stroke-width="2" marker-end="url(#arrG)" stroke-dasharray="6,3"><animate attributeName="stroke-dashoffset" from="9" to="0" dur="0.8s" repeatCount="indefinite"/></line>
          <!-- GAS TREATMENT -->
          <g class="svg-node" onclick="switchTab('gas')" style="cursor:pointer">
            <rect x="300" y="30" width="110" height="50" rx="8" fill="url(#vesG)" stroke="#ff4444" stroke-width="1.5"/>
            <polygon points="340,42 340,68 360,55" fill="none" stroke="#ff4444" stroke-width="1.5"/>
            <circle cx="380" cy="55" r="10" fill="none" stroke="#ff4444" stroke-width="1"/>
            <text x="355" y="95" text-anchor="middle" fill="#ff4444" font-size="10" font-weight="700" data-i18n="svg_gas">GAS TREATMENT</text>
            <text x="355" y="110" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-gas">— MMSCFD</text>
          </g>
          <!-- Gas export line -->
          <line x1="410" y1="55" x2="500" y2="55" stroke="url(#gasG)" stroke-width="2" marker-end="url(#arrG)"/>
          <text x="500" y="50" fill="#ff4444" font-size="9" font-weight="600" data-i18n="svg_gasexp">GAS EXPORT</text>
          <!-- OIL out from LP Sep -->
          <line x1="615" y1="230" x2="670" y2="230" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
          <!-- OIL TREATMENT -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer">
            <rect x="675" y="200" width="120" height="60" rx="8" fill="url(#vesG)" stroke="#ff9800" stroke-width="1.5"/>
            <rect x="690" y="212" width="35" height="36" rx="4" fill="none" stroke="#ff9800" stroke-width="1" stroke-dasharray="3,2"/>
            <text x="707" y="234" text-anchor="middle" fill="#ff9800" font-size="8">HTR</text>
            <rect x="740" y="212" width="40" height="36" rx="4" fill="none" stroke="#ff9800" stroke-width="1"/>
            <text x="760" y="234" text-anchor="middle" fill="#ff9800" font-size="8">DESAL</text>
            <text x="735" y="275" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="700" data-i18n="svg_oil">OIL TREATMENT</text>
            <text x="735" y="290" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-oil">— bpd</text>
          </g>
          <!-- WATER out from LP Sep -->
          <line x1="550" y1="265" x2="550" y2="370" stroke="url(#watG)" stroke-width="2" marker-end="url(#arrW)" stroke-dasharray="6,3"><animate attributeName="stroke-dashoffset" from="9" to="0" dur="0.8s" repeatCount="indefinite"/></line>
          <!-- WATER TREATMENT -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer">
            <rect x="490" y="375" width="120" height="55" rx="8" fill="url(#vesG)" stroke="#0088cc" stroke-width="1.5"/>
            <ellipse cx="530" cy="402" rx="18" ry="14" fill="none" stroke="#0088cc" stroke-width="1"/>
            <ellipse cx="570" cy="402" rx="18" ry="14" fill="none" stroke="#0088cc" stroke-width="1"/>
            <text x="550" y="445" text-anchor="middle" fill="#0088cc" font-size="10" font-weight="700" data-i18n="svg_water">WATER TREATMENT</text>
            <text x="550" y="460" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-water">— bpd</text>
          </g>
          <!-- Oil to Storage -->
          <line x1="795" y1="230" x2="850" y2="230" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
          <!-- STORAGE TANKS -->
          <g class="svg-node" onclick="switchTab('storage')" style="cursor:pointer">
            <rect x="855" y="185" width="50" height="80" rx="4" fill="url(#vesG)" stroke="#ffc107" stroke-width="1.5"/>
            <rect x="860" y="220" width="40" height="40" rx="2" fill="#a05a00" opacity="0.25"/>
            <rect x="915" y="185" width="50" height="80" rx="4" fill="url(#vesG)" stroke="#ffc107" stroke-width="1.5"/>
            <rect x="920" y="210" width="40" height="50" rx="2" fill="#a05a00" opacity="0.3"/>
            <text x="910" y="280" text-anchor="middle" fill="#ffc107" font-size="10" font-weight="700" data-i18n="svg_storage">STORAGE</text>
            <text x="910" y="295" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-storage">— bbl</text>
          </g>
          <!-- Export -->
          <line x1="965" y1="225" x2="1020" y2="225" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)"/>
          <g class="svg-node">
            <rect x="1020" y="200" width="65" height="50" rx="8" fill="url(#vesG)" stroke="#00e676" stroke-width="1.5"/>
            <text x="1052" y="230" text-anchor="middle" fill="#00e676" font-size="16">🚢</text>
            <text x="1052" y="265" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700" data-i18n="svg_export">EXPORT</text>
            <text x="1052" y="280" text-anchor="middle" fill="#5a7aaa" font-size="9" id="sv-export">— bpd</text>
          </g>
          <!-- CHEMICAL INJECTION -->
          <g class="svg-node" onclick="switchTab('chemical')" style="cursor:pointer">
            <rect x="670" y="380" width="110" height="45" rx="8" fill="url(#vesG)" stroke="#e91e63" stroke-width="1"/>
            <text x="725" y="407" text-anchor="middle" fill="#e91e63" font-size="9" font-weight="700" data-i18n="svg_chem">CHEMICAL INJ.</text>
            <line x1="725" y1="380" x2="725" y2="260" stroke="#e91e63" stroke-width="1" stroke-dasharray="4,3"><animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.2s" repeatCount="indefinite"/></line>
            <circle cx="725" cy="340" r="4" fill="#e91e63" opacity="0.6"><animate attributeName="cy" from="380" to="260" dur="2s" repeatCount="indefinite"/></circle>
          </g>
          <!-- Legend -->
          <g transform="translate(20,470)">
            <rect width="14" height="8" rx="2" fill="#a05a00"/><text x="20" y="8" fill="#7a8aaa" font-size="9" data-i18n="svg_leg_oil">Oil Flow</text>
            <rect x="90" width="14" height="8" rx="2" fill="#ff4444"/><text x="110" y="8" fill="#7a8aaa" font-size="9" data-i18n="svg_leg_gas">Gas Flow</text>
            <rect x="180" width="14" height="8" rx="2" fill="#0088cc"/><text x="200" y="8" fill="#7a8aaa" font-size="9" data-i18n="svg_leg_water">Water Flow</text>
            <rect x="290" width="14" height="8" rx="2" fill="#e91e63"/><text x="310" y="8" fill="#7a8aaa" font-size="9" data-i18n="svg_leg_chem">Chemical Inj.</text>
          </g>
        </svg>
      </div>
      <!-- KPI Summary -->
      <div class="kpi-row" id="overviewKPI"></div>
    </div>

    <!-- ===== SEPARATOR CALCULATOR TAB ===== -->
    <div class="tab-panel" id="tab-separator">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-separator')">💾 Save</button></div>
      <div class="panel-title">3-Phase Separator Engineering Calculator</div>
      <p class="panel-desc">API 12J / ASTM standards — Souders-Brown &amp; Stokes' Law</p>
      <div class="calc-grid">
        <!-- Inputs -->
        <div class="calc-card">
          <div class="card-head blue">Operating Conditions</div>
          <div class="input-group">
            <label>Operating Pressure<input type="number" id="sep-P" value="150" step="5"> <span>psig</span></label>
            <label>Operating Temperature<input type="number" id="sep-T" value="120" step="1"> <span>°F</span></label>
            <label>Oil Flow Rate<input type="number" id="sep-Qo" value="25000" step="100"> <span>bpd</span></label>
            <label>Water Flow Rate<input type="number" id="sep-Qw" value="10000" step="100"> <span>bpd</span></label>
            <label>Gas Flow Rate<input type="number" id="sep-Qg" value="50" step="0.5"> <span>MMSCFD</span></label>
            <label>Oil API Gravity<input type="number" id="sep-API" value="32" step="0.5"> <span>°API</span></label>
            <label>Gas Specific Gravity<input type="number" id="sep-SGg" value="0.75" step="0.01"> <span>—</span></label>
            <label>Oil Viscosity<input type="number" id="sep-muO" value="3.5" step="0.1"> <span>cp</span></label>
            <label>Droplet Diameter<input type="number" id="sep-dp" value="150" step="10"> <span>micron</span></label>
            <label>K Factor (Souders-Brown)<input type="number" id="sep-K" value="0.35" step="0.01"> <span>—</span></label>
            <label>Retention Time (Oil)<input type="number" id="sep-tro" value="3" step="0.5"> <span>min</span></label>
            <label>Retention Time (Water)<input type="number" id="sep-trw" value="3" step="0.5"> <span>min</span></label>
          </div>
          <button class="calc-btn" onclick="calcSeparator()">⚡ Calculate Separator</button>
        </div>
        <!-- Results -->
        <div class="calc-card">
          <div class="card-head green">Separator Results</div>
          <div id="sepResults" class="results-grid"></div>
          <div class="card-head green" style="margin-top:16px">Vessel Specification</div>
          <div id="sepVessel" class="results-grid"></div>
        </div>
      </div>
      <div class="chart-box"><canvas id="chartSep"></canvas></div>
    </div>

    <!-- ===== PRODUCTION TRAINS TAB ===== -->
    <div class="tab-panel" id="tab-trains">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-trains')">💾 Save</button></div>
      <div class="panel-title">Production Trains — Live Data</div>
      <div class="table-wrap">
        <table class="dtable" id="trainInputTable">
          <thead><tr><th>Train</th><th>Status</th><th>Inlet (bpd)</th><th>Oil (bpd)</th><th>Water (bpd)</th><th>Gas (MMSCFD)</th><th>Sep Vol (m³)</th></tr></thead>
          <tbody id="trainBody"></tbody>
        </table>
      </div>
      <div class="panel-title" style="margin-top:20px">Calculated Results</div>
      <div class="table-wrap">
        <table class="dtable res">
          <thead><tr><th>Train</th><th>Water Cut %</th><th>GOR (SCF/bbl)</th><th>Inlet (m³/d)</th><th>Retention (min)</th></tr></thead>
          <tbody id="trainResults"></tbody>
        </table>
      </div>
      <div class="kpi-row" id="trainKPI"></div>
    </div>

    <!-- ===== GAS TREATMENT TAB ===== -->
    <div class="tab-panel" id="tab-gas">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-gas')">💾 Save</button></div>
      <div class="panel-title">Gas Treatment &amp; Processing</div>
      <p class="panel-desc">Dehydration, sweetening, compression — per GPSA/API standards</p>
      <div class="calc-grid">
        <div class="calc-card">
          <div class="card-head orange">Gas Inlet Conditions</div>
          <div class="input-group">
            <label>Gas Rate<input type="number" id="gas-Q" value="50" step="1"> <span>MMSCFD</span></label>
            <label>Inlet Pressure<input type="number" id="gas-Pin" value="150" step="5"> <span>psig</span></label>
            <label>Inlet Temperature<input type="number" id="gas-Tin" value="120" step="1"> <span>°F</span></label>
            <label>Gas Sp. Gravity<input type="number" id="gas-SG" value="0.75" step="0.01"> <span>—</span></label>
            <label>H2S Content<input type="number" id="gas-H2S" value="2.5" step="0.1"> <span>mol%</span></label>
            <label>CO2 Content<input type="number" id="gas-CO2" value="3.0" step="0.1"> <span>mol%</span></label>
            <label>Water Content<input type="number" id="gas-H2O" value="50" step="1"> <span>lb/MMSCF</span></label>
            <label>Export Pressure<input type="number" id="gas-Pout" value="1000" step="50"> <span>psig</span></label>
          </div>
          <button class="calc-btn" onclick="calcGas()">⚡ Calculate Gas Treatment</button>
        </div>
        <div class="calc-card">
          <div class="card-head green">Gas Treatment Results</div>
          <div id="gasResults" class="results-grid"></div>
        </div>
      </div>
      <div class="chart-box"><canvas id="chartGas"></canvas></div>
    </div>

    <!-- ===== OIL TREATMENT TAB ===== -->
    <div class="tab-panel" id="tab-oil">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-oil')">💾 Save</button></div>
      <div class="panel-title">Oil Treatment — Dehydration &amp; Desalting</div>
      <div class="calc-grid">
        <div class="calc-card">
          <div class="card-head purple">Oil Treatment Input</div>
          <div class="input-group">
            <label>Oil Rate<input type="number" id="oil-Q" value="25000" step="100"> <span>bpd</span></label>
            <label>API Gravity<input type="number" id="oil-API" value="32" step="0.5"> <span>°API</span></label>
            <label>Inlet BSW<input type="number" id="oil-BSWin" value="15" step="0.5"> <span>%</span></label>
            <label>Target BSW<input type="number" id="oil-BSWout" value="0.5" step="0.1"> <span>%</span></label>
            <label>Salt Content<input type="number" id="oil-salt" value="50" step="5"> <span>PTB</span></label>
            <label>Target Salt<input type="number" id="oil-saltOut" value="10" step="1"> <span>PTB</span></label>
            <label>Heater Temp In<input type="number" id="oil-Tin" value="100" step="5"> <span>°F</span></label>
            <label>Heater Temp Out<input type="number" id="oil-Tout" value="150" step="5"> <span>°F</span></label>
            <label>Wash Water Rate<input type="number" id="oil-wash" value="5" step="0.5"> <span>% vol</span></label>
          </div>
          <button class="calc-btn" onclick="calcOil()">⚡ Calculate Oil Treatment</button>
        </div>
        <div class="calc-card">
          <div class="card-head green">Oil Treatment Results</div>
          <div id="oilResults" class="results-grid"></div>
        </div>
      </div>
      <div class="chart-box"><canvas id="chartOil"></canvas></div>
    </div>

    <!-- ===== WATER TREATMENT TAB ===== -->
    <div class="tab-panel" id="tab-water">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-water')">💾 Save</button></div>
      <div class="panel-title">Produced Water Treatment</div>
      <div class="calc-grid">
        <div class="calc-card">
          <div class="card-head cyan">Water Treatment Input</div>
          <div class="input-group">
            <label>Water Rate<input type="number" id="wat-Q" value="10000" step="100"> <span>bpd</span></label>
            <label>Oil in Water<input type="number" id="wat-OiW" value="500" step="10"> <span>ppm</span></label>
            <label>Target Oil in Water<input type="number" id="wat-OiWout" value="40" step="5"> <span>ppm</span></label>
            <label>TSS Inlet<input type="number" id="wat-TSS" value="200" step="10"> <span>mg/L</span></label>
            <label>Temperature<input type="number" id="wat-T" value="120" step="5"> <span>°F</span></label>
            <label>Skim Tank Retention<input type="number" id="wat-ret" value="15" step="1"> <span>min</span></label>
          </div>
          <button class="calc-btn" onclick="calcWater()">⚡ Calculate Water Treatment</button>
        </div>
        <div class="calc-card">
          <div class="card-head green">Water Treatment Results</div>
          <div id="waterResults" class="results-grid"></div>
        </div>
      </div>
      <div class="chart-box"><canvas id="chartWater"></canvas></div>
    </div>

    <!-- ===== CHEMICAL INJECTION TAB ===== -->
    <div class="tab-panel" id="tab-chemical">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-chemical')">💾 Save</button></div>
      <div class="panel-title">Chemical Injection System</div>
      <div class="calc-grid">
        <div class="calc-card">
          <div class="card-head pink">Injection Parameters</div>
          <div class="input-group">
            <label>Total Liquid Rate<input type="number" id="chem-Ql" value="35000" step="100"> <span>bpd</span></label>
            <label>Demulsifier Dose<input type="number" id="chem-demul" value="15" step="1"> <span>ppm</span></label>
            <label>Corrosion Inhibitor<input type="number" id="chem-corr" value="10" step="1"> <span>ppm</span></label>
            <label>Scale Inhibitor<input type="number" id="chem-scale" value="8" step="1"> <span>ppm</span></label>
            <label>H2S Scavenger<input type="number" id="chem-h2s" value="20" step="1"> <span>ppm</span></label>
            <label>Biocide<input type="number" id="chem-bio" value="50" step="5"> <span>ppm</span></label>
            <label>Oxygen Scavenger<input type="number" id="chem-o2" value="5" step="1"> <span>ppm</span></label>
            <label>Pour Point Depressant<input type="number" id="chem-ppd" value="100" step="10"> <span>ppm</span></label>
          </div>
          <button class="calc-btn" onclick="calcChemical()">⚡ Calculate Injection Rates</button>
        </div>
        <div class="calc-card">
          <div class="card-head green">Chemical Injection Results</div>
          <div id="chemResults" class="results-grid"></div>
        </div>
      </div>
      <div class="chart-box"><canvas id="chartChem"></canvas></div>
    </div>

    <!-- ===== STORAGE & EXPORT TAB ===== -->
    <div class="tab-panel" id="tab-storage">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-storage')">💾 Save</button></div>
      <div class="panel-title">Storage Tanks &amp; Export</div>
      <div class="calc-grid">
        <div class="calc-card">
          <div class="card-head amber">Tank Specifications</div>
          <div class="input-group">
            <label>Number of Tanks<input type="number" id="stg-n" value="4" step="1" min="1" max="20"> <span>units</span></label>
            <label>Tank Diameter<input type="number" id="stg-D" value="60" step="1"> <span>m</span></label>
            <label>Tank Height<input type="number" id="stg-H" value="18" step="0.5"> <span>m</span></label>
            <label>Max Fill Level<input type="number" id="stg-fill" value="85" step="1"> <span>%</span></label>
            <label>Export Rate<input type="number" id="stg-exp" value="100000" step="1000"> <span>bpd</span></label>
            <label>Oil Production<input type="number" id="stg-prod" value="100000" step="1000"> <span>bpd</span></label>
          </div>
          <button class="calc-btn" onclick="calcStorage()">⚡ Calculate Storage</button>
        </div>
        <div class="calc-card">
          <div class="card-head green">Storage &amp; Export Results</div>
          <div id="storageResults" class="results-grid"></div>
        </div>
      </div>
    </div>

    <!-- ===== CHARTS TAB ===== -->
    <div class="tab-panel" id="tab-charts">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-charts')">💾 Save</button></div>
      <div class="panel-title">Engineering Charts &amp; Analytics</div>
      <div class="charts-grid">
        <div class="chart-box"><div class="chart-title">Separator Efficiency vs Pressure</div><canvas id="chartEffP"></canvas></div>
        <div class="chart-box"><div class="chart-title">GOR vs API Gravity</div><canvas id="chartGorApi"></canvas></div>
        <div class="chart-box"><div class="chart-title">Retention Time vs Flow Rate</div><canvas id="chartRetQ"></canvas></div>
        <div class="chart-box"><div class="chart-title">Chemical Cost Breakdown</div><canvas id="chartChemCost"></canvas></div>
      </div>
    </div>

    <!-- ===== CONTROL PANEL TAB ===== -->
    <!-- ===== EQUATIONS TAB ===== -->
    <div class="tab-panel" id="tab-equations">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-equations')">💾 Save</button></div>
      <div class="panel-title">📐 Engineering Equations — Manual Verification</div>
      <p class="panel-desc">API / ISO / ASTM / Darcy Standards — Enter values to verify calculations</p>
      <div class="eq-grid" id="eqGrid"></div>
    </div>

    <!-- ===== PROCESS DIAGRAM DETAIL TAB ===== -->
    <div class="tab-panel" id="tab-diagram">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button><button class="save-btn" onclick="savePanel('tab-diagram')">💾 Save</button></div>
      <div class="panel-title">🔍 Detailed Process Diagram — Wellhead to Export</div>
      <p class="panel-desc">Click on any equipment to view details</p>
      <div class="schematic-wrap" id="detailDiagramWrap"></div>
      <div id="equipPopup" class="svg-popup"></div>

      <!-- Detailed Process Schematic (Blueprint Style) -->
      <div class="calc-card glass" style="margin-top:20px;padding:20px;overflow:hidden;height:auto;background:#061021;position:relative;border:1px solid rgba(0,240,255,0.2);">
        <div style="position:absolute;top:15px;left:15px;background:rgba(0,180,255,0.1);padding:6px 12px;border-radius:6px;font-size:11px;color:#00f0ff;border:1px solid rgba(0,240,255,0.3);z-index:2;font-weight:700;letter-spacing:1px;">DETAILED PROCESS SCHEMATIC — ENGINEERING VIEW</div>
        
        <div class="blueprint-wrap">
          <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
            <!-- Background Grid -->
            <defs>
              <pattern id="blueGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,240,255,0.05)" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#blueGrid)" />

            <!-- FLOW LINES -->
            <g stroke="rgba(0,240,255,0.3)" stroke-width="2" fill="none">
              <path d="M 50,250 L 150,250" /> <!-- Wellhead to HP -->
              <path d="M 300,250 L 400,250" /> <!-- HP to LP -->
              <path d="M 530,250 L 630,250" /> <!-- LP to Treater -->
              <path d="M 750,250 L 850,250" /> <!-- Treater to Storage -->
              <path d="M 225,210 V 100 H 350" /> <!-- HP Gas out -->
              <path d="M 465,290 V 400 H 550" /> <!-- LP Water out -->
            </g>

            <!-- EQUIPMENT -->
            <!-- Wellhead -->
            <rect x="50" y="210" width="80" height="80" rx="4" fill="rgba(0,20,40,0.8)" stroke="#00f0ff" stroke-width="1.5" />
            <text x="90" y="245" text-anchor="middle" fill="#00f0ff" font-size="10" font-weight="bold">WELLHEAD</text>
            <text x="90" y="260" text-anchor="middle" fill="#5a7aaa" font-size="9">P: 2500 psi</text>

            <!-- HP SEPARATOR -->
            <rect x="150" y="210" width="150" height="80" rx="40" fill="rgba(0,20,40,0.8)" stroke="#00e676" stroke-width="1.5" />
            <text x="225" y="245" text-anchor="middle" fill="#00e676" font-size="10" font-weight="bold">HP SEPARATOR</text>
            <text x="225" y="260" text-anchor="middle" fill="#5a7aaa" font-size="9">150 psig | 120°F</text>

            <!-- LP SEPARATOR -->
            <rect x="400" y="210" width="130" height="80" rx="40" fill="rgba(0,20,40,0.8)" stroke="#00e676" stroke-width="1.5" />
            <text x="465" y="245" text-anchor="middle" fill="#00e676" font-size="10" font-weight="bold">LP SEPARATOR</text>
            <text x="465" y="260" text-anchor="middle" fill="#5a7aaa" font-size="9">50 psig | 115°F</text>

            <!-- OIL TREATER -->
            <rect x="630" y="210" width="120" height="80" rx="8" fill="rgba(0,20,40,0.8)" stroke="#ffab40" stroke-width="1.5" />
            <text x="690" y="245" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="bold">OIL TREATER</text>
            <text x="690" y="260" text-anchor="middle" fill="#5a7aaa" font-size="9">Desalter/Heater</text>

            <!-- STORAGE -->
            <rect x="850" y="210" width="100" height="80" rx="4" fill="rgba(0,20,40,0.8)" stroke="#ffc107" stroke-width="1.5" />
            <text x="900" y="245" text-anchor="middle" fill="#ffc107" font-size="10" font-weight="bold">STORAGE</text>
            <text x="900" y="260" text-anchor="middle" fill="#5a7aaa" font-size="9">Export Tanks</text>

            <!-- GAS PLANT -->
            <rect x="350" y="70" width="120" height="60" rx="8" fill="rgba(0,20,40,0.8)" stroke="#ff4444" stroke-width="1.5" />
            <text x="410" y="100" text-anchor="middle" fill="#ff4444" font-size="10" font-weight="bold">GAS PLANT</text>
            <text x="410" y="115" text-anchor="middle" fill="#5a7aaa" font-size="9">Comp/Dehy</text>

            <!-- WATER TREATMENT -->
            <rect x="550" y="370" width="120" height="60" rx="8" fill="rgba(0,20,40,0.8)" stroke="#0088cc" stroke-width="1.5" />
            <text x="610" y="400" text-anchor="middle" fill="#0088cc" font-size="10" font-weight="bold">WATER TREAT</text>
            <text x="610" y="415" text-anchor="middle" fill="#5a7aaa" font-size="9">WOSEP/CPI</text>

            <!-- ARROWS -->
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0,240,255,0.5)" />
            </marker>
          </svg>
        </div>

        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top, rgba(0,0,0,0.8), transparent);padding:30px;color:#fff;z-index:3;">
          <h3 style="color:#00f0ff;margin:0 0 5px;font-size:18px;">Process Topology View</h3>
          <p style="color:#5a7aaa;font-size:13px;margin:0;">Interactive schematic showing fluid flow and equipment interconnections.</p>
        </div>
      </div>

    </div>

    <!-- ===== CONTROL PANEL TAB ===== -->
    <div class="tab-panel" id="tab-control">
      <div class="panel-nav"><button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button></div>
      <div class="panel-title" data-i18n="nav_control">🎮 Master Control Panel</div>
      
      <!-- Role Selector -->
      <div style="margin-bottom:15px;display:flex;gap:10px;align-items:center;">
        <span style="font-size:11px;color:var(--text3);">ACCESS LEVEL:</span>
        <select id="roleSelect" class="sts-select" onchange="showToast('Access Level Changed to ' + this.value)">
          <option value="Operator">Operator</option>
          <option value="Engineer" selected>Engineer</option>
          <option value="Admin">Administrator</option>
        </select>
      </div>
      
      <!-- Interactive PID Control Element -->
      <div class="pid-wrap">
        <h3 style="color:#00e676;margin-bottom:10px;font-size:14px;" data-i18n="pid_title">PID Level Control — HP Separator</h3>
        <div class="pid-flex">
          <div class="pid-tank-wrap">
            <svg viewBox="0 0 100 150" width="100" height="150">
              <rect x="10" y="10" width="80" height="130" rx="10" fill="none" stroke="#00f0ff" stroke-width="2"/>
              <rect id="pidLevelRect" x="12" y="70" width="76" height="68" rx="8" fill="#a05a00" opacity="0.8"/>
              <text id="pidLevelText" x="50" y="80" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">50%</text>
            </svg>
          </div>
          <div class="pid-controls">
            <label data-i18n="pid_valve">Liquid Outflow Valve (%)</label>
            <input type="range" id="pidValveSlider" min="0" max="100" value="50" oninput="updatePID()">
            <div id="pidValveVal" style="color:#00f0ff;font-weight:bold;margin-bottom:15px;">50%</div>
            
            <label data-i18n="pid_retention">Retention Time (min)</label>
            <div id="pidRetentionVal" style="color:#ffab40;font-size:18px;font-weight:bold;margin-bottom:15px;">3.00</div>
            
            <button class="calc-btn" onclick="autoPID()" style="width:100%" data-i18n="pid_auto">Auto Target 50%</button>
          </div>
        </div>
      </div>

      <div class="control-grid" id="controlGrid"></div>
      <div class="success-banner" data-i18n="success_msg">✅ All systems are stable. Mass balance and chemical injection rates are automatically updated based on live input.</div>
    </div>

  </main>

  <!-- ALARMS PANEL MOVED TO HEADER -->

</div>

<div class="toast" id="toast"></div>
<script src="login.js"></script>
<script src="core.js"></script>
<script src="charts.js"></script>
<script src="features.js"></script>
</body>
</html>

```

---

## 📄 File: `styles.css`
**Path:** `HammarIPF/styles.css`
```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#f4f6f9;color:#1a2030;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#e8ecf1}::-webkit-scrollbar-thumb{background:#b0bcc8;border-radius:3px}

@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes glow{0%,100%{box-shadow:0 0 8px rgba(0,180,80,.2)}50%{box-shadow:0 0 20px rgba(0,180,80,.5)}}
@keyframes headerGradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes arrowPulse{0%,100%{box-shadow:0 2px 8px rgba(0,0,0,.06)}50%{box-shadow:0 2px 12px rgba(10,138,62,.15)}}

/* ===== THREE-PHASE COLOR TOKENS ===== */
:root{
  --oil: #4a2800; --oil-light: #a05a00; --oil-bg: rgba(74, 40, 0, 0.08); --oil-border: rgba(74, 40, 0, 0.2);
  --gas: #00e676; --gas-light: #69f0ae; --gas-bg: rgba(0, 230, 118, 0.08); --gas-border: rgba(0, 230, 118, 0.2);
  --water: #0088cc; --water-light: #33b5e5; --water-bg: rgba(0, 136, 204, 0.08); --water-border: rgba(0, 136, 204, 0.2);
  --accent: #00f0ff; --accent-glow: rgba(0, 240, 255, 0.4);
  --bg: #f8fafc; --card: rgba(255, 255, 255, 0.75); --card-border: rgba(226, 232, 240, 0.8);
  --text: #0f172a; --text2: #475569; --text3: #94a3b8;
  --header-bg: linear-gradient(135deg, #0f172a, #1e293b);
  --mono: 'JetBrains Mono', monospace;
}

body.dark-mode{
  --bg: #020617; --card: rgba(15, 23, 42, 0.8); --card-border: rgba(30, 41, 59, 0.5);
  --text: #f8fafc; --text2: #94a3b8; --text3: #64748b;
  --card-shadow: 0 12px 40px rgba(0,0,0,0.6);
}

.glass{backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--card-border);box-shadow:0 8px 32px rgba(0,0,0,0.05)}

/* HEADER */
.header{background:linear-gradient(135deg,#0f1923,#162030,#1a2840,#162030,#0f1923);background-size:300% 300%;animation:headerGradient 10s ease infinite;border-bottom:2px solid var(--gas);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;backdrop-filter:blur(20px)}
.header::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--oil),var(--oil-light),var(--gas),var(--gas-light),var(--water),var(--water-light),var(--oil));background-size:200% 100%;animation:headerGradient 6s linear infinite}
.header-left{display:flex;align-items:center;gap:12px}
.header-title{font-size:22px;font-weight:900;background:linear-gradient(135deg,var(--accent),#fff,var(--gas-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.5px}
.header-sub{font-size:10px;color:rgba(255,255,255,0.6);margin-top:2px;letter-spacing:0.5px;text-transform:uppercase}
.header-right{display:flex;align-items:center;gap:10px}
.pulse-dot{width:7px;height:7px;border-radius:50%;background:var(--gas-light);animation:pulse 2s infinite}
.sys-on{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--gas-light);font-weight:700}
.clock{font-family:var(--mono);font-size:10px;color:#8a9ab0;padding-left:10px;border-left:1px solid #3a4a60}
.lang-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:11px;font-weight:700;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;letter-spacing:.03em}
.lang-btn:hover{background:rgba(255,255,255,.2);border-color:#fff}

.icon-btn.active{background:var(--gas);border-color:var(--gas-light);box-shadow:0 0 15px var(--gas)}

/* LOGO STACK */
.logo-stack { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.station-logo-crop { 
  height: 45px; 
  width: auto; 
  object-fit: cover; 
  object-position: top; 
  filter: drop-shadow(0 0 8px rgba(0,240,255,0.4));
  transition: transform 0.3s;
}
.station-logo-crop:hover { transform: scale(1.05); }

/* SCHEMATIC */
.schematic-wrap{background:linear-gradient(135deg,#fafcff,#f0f4f9);border:2px solid transparent;border-image:linear-gradient(135deg,var(--oil-border),var(--gas-border),var(--water-border)) 1;border-radius:14px;padding:20px;overflow-x:auto;margin-bottom:16px;box-shadow:0 4px 20px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.8)}
.schematic-wrap svg{width:100%;height:auto;min-width:700px}
.svg-node{transition:transform .2s}
.svg-node:hover{transform:scale(1.02)}
.svg-node:hover rect,.svg-node:hover circle,.svg-node:hover ellipse{filter:brightness(1.15) drop-shadow(0 0 6px rgba(0,230,118,.25));transition:filter .3s}
.svg-node text{font-family:var(--mono)}

/* RTL Support */
html[dir="rtl"] .header-left{flex-direction:row-reverse}
html[dir="rtl"] .sidebar{border-right:none;border-left:1px solid var(--card-border)}
html[dir="rtl"] .nav-btn{text-align:right}
html[dir="rtl"] .nav-btn.active{border-left:none;border-right:3px solid var(--gas)}
html[dir="rtl"] .clock{padding-left:0;padding-right:10px;border-left:none;border-right:1px solid #3a4a60}
html[dir="rtl"] .header-right{flex-direction:row-reverse}
html[dir="rtl"] .res-row{flex-direction:row-reverse}
html[dir="rtl"] .input-group label{direction:rtl}
html[dir="rtl"] .dtable thead th,html[dir="rtl"] .dtable tbody td{text-align:left}
html[dir="rtl"] .dtable thead th:first-child,html[dir="rtl"] .dtable tbody td:first-child{text-align:right}
html[dir="rtl"] .panel-nav{flex-direction:row-reverse}

/* LAYOUT */
.layout{display:flex;min-height:calc(100vh - 56px)}

/* SIDEBAR */
.sidebar{width:210px;background:#fff;border-right:1px solid var(--card-border);padding:12px 8px;display:flex;flex-direction:column;gap:3px;position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;box-shadow:2px 0 8px rgba(0,0,0,.03)}
.nav-btn{background:none;border:none;color:var(--text2);font-size:12px;font-weight:500;padding:10px 12px;border-radius:8px;text-align:left;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:10px}
.nav-btn:hover{background:var(--gas-bg);color:var(--gas)}
.nav-btn.active{background:var(--gas-bg);color:var(--gas);border-left:3px solid var(--gas);font-weight:700}
.nav-icon{width:18px;height:18px;flex-shrink:0;transition:transform .2s}
.nav-btn:hover .nav-icon{transform:scale(1.1)}


/* CONTENT */
.content{flex:1;padding:20px 28px;overflow-y:auto;max-height:calc(100vh - 56px);background:var(--bg)}
.tab-panel{display:none;animation:fadeIn .4s ease both}
.tab-panel.active{display:block}
.panel-title{font-size:18px;font-weight:800;color:var(--text);margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid transparent;border-image:linear-gradient(90deg,var(--gas-border),transparent) 1;display:flex;align-items:center;gap:8px;letter-spacing:-.01em}

/* PANEL NAVIGATION BAR (back/forward/save) */
.panel-nav{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding:8px 0}
.panel-nav .nav-arrow{background:linear-gradient(135deg,#f8fafb,#fff);border:1.5px solid var(--card-border);color:var(--text2);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.panel-nav .nav-arrow svg{width:18px;height:18px;transition:transform .2s}
.panel-nav .nav-arrow:hover{background:linear-gradient(135deg,var(--gas-bg),rgba(46,204,113,.08));color:var(--gas);border-color:var(--gas);box-shadow:0 4px 16px rgba(10,138,62,.12);transform:translateY(-1px)}
.panel-nav .nav-arrow:hover svg{transform:scale(1.15)}
.panel-nav .nav-arrow:active{transform:translateY(0);box-shadow:0 1px 4px rgba(0,0,0,.08)}
.panel-nav .nav-arrow:disabled{opacity:.3;cursor:not-allowed;transform:none}
.panel-nav .save-btn{background:linear-gradient(135deg,#f8fafb,#fff);border:1.5px solid var(--card-border);color:var(--text2);height:40px;padding:0 18px;border-radius:10px;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all .25s;font-family:'Inter',sans-serif;margin-left:auto;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.panel-nav .save-btn:hover{background:linear-gradient(135deg,var(--gas-bg),rgba(46,204,113,.08));color:var(--gas);border-color:var(--gas);box-shadow:0 4px 16px rgba(10,138,62,.12);transform:translateY(-1px)}
html[dir="rtl"] .panel-nav .save-btn{margin-left:0;margin-right:auto}

.panel-desc{font-size:12px;color:var(--text3);margin-bottom:16px}

/* CALC GRID */
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.calc-card{background:var(--card);backdrop-filter:blur(16px);border:1.5px solid var(--card-border);border-radius:16px;padding:22px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:all .3s ease}
.calc-card:hover{border-color:var(--gas-border);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.08)}
.card-head{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:8px 14px;margin:-20px -20px 16px;font-weight:700}
.card-head.blue{background:var(--water-bg);color:var(--water);border-bottom:1px solid var(--water-border)}
.card-head.green{background:var(--gas-bg);color:var(--gas);border-bottom:1px solid var(--gas-border)}
.card-head.orange{background:rgba(255,152,0,.06);color:#e68a00;border-bottom:1px solid rgba(255,152,0,.15)}
.card-head.purple{background:rgba(156,39,176,.06);color:#9c27b0;border-bottom:1px solid rgba(156,39,176,.15)}
.card-head.cyan{background:var(--water-bg);color:var(--water);border-bottom:1px solid var(--water-border)}
.card-head.pink{background:rgba(233,30,99,.06);color:#c2185b;border-bottom:1px solid rgba(233,30,99,.15)}
.card-head.amber{background:rgba(255,160,0,.06);color:#e68a00;border-bottom:1px solid rgba(255,160,0,.15)}
.card-head.oil{background:var(--oil-bg);color:var(--oil);border-bottom:1px solid var(--oil-border)}

/* INPUTS */
.input-group{display:flex;flex-direction:column;gap:8px}
.input-group label{display:grid;grid-template-columns:1fr 100px 50px;align-items:center;gap:8px;font-size:12px;color:var(--text2)}
.input-group input{background:#f8fafb;border:1px solid var(--card-border);border-radius:6px;color:var(--text);font-family:var(--mono);font-size:12px;padding:7px 10px;text-align:right;outline:none;transition:all .25s}
.input-group input:focus{border-color:var(--gas);box-shadow:0 0 0 3px rgba(10,138,62,.1)}
.input-group span{font-family:var(--mono);font-size:10px;color:var(--text3)}
.calc-btn{width:100%;margin-top:14px;padding:12px;background:linear-gradient(135deg,var(--gas),var(--gas-light));color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;transition:all .2s;letter-spacing:.04em}
.calc-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(10,138,62,.3)}
.calc-btn:active{transform:translateY(0)}

/* RESULTS GRID */
.results-grid{display:flex;flex-direction:column;gap:6px}
.res-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.04)}
.res-row:last-child{border-bottom:none}
.res-label{font-size:12px;color:var(--text2)}
.res-value{font-family:var(--mono);font-size:13px;font-weight:600;color:var(--text)}
.res-unit{font-family:var(--mono);font-size:10px;color:var(--text3);margin-left:4px}

/* TABLES */
.table-wrap{overflow-x:auto;border-radius:12px;border:1px solid var(--card-border);margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.dtable{width:100%;border-collapse:collapse;font-size:12px;background:var(--card)}
.dtable thead th{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);background:rgba(0,0,0,.02);padding:12px 14px;text-align:right;border-bottom:2px solid var(--card-border);white-space:nowrap;font-weight:600}
.dtable thead th:first-child{text-align:left}
.dtable tbody td{padding:10px 14px;text-align:right;border-bottom:1px solid rgba(0,0,0,.03);font-family:var(--mono);font-size:12px;color:var(--text)}
.dtable tbody td:first-child{text-align:left;font-weight:600;color:var(--gas)}
.dtable tbody tr:hover td{background:var(--gas-bg)}
.dtable.res tbody td{color:var(--oil)}
.dtable.res tbody td:first-child{color:var(--gas)}
.edit-cell{background:#f8fafb;border:1px solid var(--card-border);border-radius:5px;color:var(--text);font-family:var(--mono);font-size:12px;padding:5px 8px;width:110px;text-align:right;outline:none;transition:all .2s}
.edit-cell:focus{border-color:var(--gas);box-shadow:0 0 0 2px rgba(10,138,62,.1)}
.sts-select{background:#f8fafb;border:1px solid var(--card-border);border-radius:5px;color:var(--text);font-family:var(--mono);font-size:10px;padding:5px 8px;outline:none;cursor:pointer;font-weight:700}
.sts-select option{background:#fff}

/* KPI ROW */
.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:16px 0}
.kpi{background:var(--card);backdrop-filter:blur(16px);border:1.5px solid var(--card-border);border-radius:16px;padding:20px;position:relative;overflow:hidden;transition:all .3s;box-shadow:0 4px 16px rgba(0,0,0,.04)}
.kpi:hover{transform:translateY(-6px);border-color:var(--gas-border);box-shadow:0 15px 45px rgba(10,138,62,.15)}
.kpi::before{content:'';position:absolute;top:0;left:0;right:0;height:4px}
.kpi:nth-child(1)::before{background:linear-gradient(90deg,var(--oil),var(--oil-light))}
.kpi:nth-child(2)::before{background:linear-gradient(90deg,var(--gas),var(--gas-light))}
.kpi:nth-child(3)::before{background:linear-gradient(90deg,var(--water),var(--water-light))}
.kpi:nth-child(4)::before{background:linear-gradient(90deg,#e68a00,#ffc107)}
.kpi::after{content:'';position:absolute;bottom:0;right:0;width:60px;height:60px;border-radius:50%;opacity:.04}
.kpi:nth-child(1)::after{background:var(--oil)}
.kpi:nth-child(2)::after{background:var(--gas)}
.kpi:nth-child(3)::after{background:var(--water)}
.kpi:nth-child(4)::after{background:#ffc107}
.kpi-lbl{font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px}
.kpi-val{font-family:var(--mono);font-size:24px;font-weight:800;color:var(--text);letter-spacing:-.02em}
.kpi-u{font-family:var(--mono);font-size:9px;color:var(--text3);letter-spacing:.1em;margin-top:4px}

/* CHARTS */
.chart-box{background:linear-gradient(135deg,#fff,#fafcfe);border:1.5px solid var(--card-border);border-radius:16px;padding:22px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);position:relative;overflow:hidden}
.chart-box::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--oil),var(--gas),var(--water));opacity:.5}
.chart-title{font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--text3);text-transform:uppercase;margin-bottom:14px;font-weight:700;display:flex;align-items:center;gap:8px}
.chart-title::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--gas);opacity:.6}
.charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}

/* CONTROL PANEL */
.control-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px}
.ctrl-card{background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:18px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.ctrl-card:hover{border-color:var(--gas-border);box-shadow:0 4px 16px rgba(10,138,62,.08)}
.ctrl-head{font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.ctrl-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;color:var(--text2);border-bottom:1px solid rgba(0,0,0,.03)}
.ctrl-val{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--text)}
.ctrl-bar{height:4px;background:#e8ecf1;border-radius:2px;margin-top:4px;overflow:hidden}
.ctrl-fill{height:100%;border-radius:2px;transition:width .6s ease}

/* SUCCESS BANNER */
.success-banner{background:linear-gradient(135deg,var(--gas-bg),rgba(46,204,113,.04));border:1px solid var(--gas-border);border-radius:12px;padding:16px 20px;font-size:13px;color:var(--gas);font-weight:500;text-align:center;margin-top:20px}

/* ===== EQUATIONS PANEL ===== */
.eq-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.eq-card{background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.eq-card h3{font-size:14px;color:var(--text);margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid var(--gas-border)}
.eq-formula{background:#f0f4f8;border:1px solid var(--card-border);border-radius:8px;padding:12px 16px;font-family:var(--mono);font-size:13px;color:var(--oil);margin:8px 0;line-height:1.6;overflow-x:auto}
.eq-desc{font-size:11px;color:var(--text3);margin-bottom:8px;line-height:1.4}
.eq-inputs{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.eq-inputs label{display:grid;grid-template-columns:120px 90px 50px;align-items:center;gap:6px;font-size:11px;color:var(--text2)}
.eq-inputs input{background:#f8fafb;border:1px solid var(--card-border);border-radius:5px;color:var(--text);font-family:var(--mono);font-size:11px;padding:5px 8px;text-align:right;outline:none}
.eq-inputs input:focus{border-color:var(--gas);box-shadow:0 0 0 2px rgba(10,138,62,.1)}
.eq-result{font-family:var(--mono);font-size:14px;font-weight:700;color:var(--text);margin-top:8px;padding:8px 12px;background:var(--gas-bg);border-radius:6px}
.eq-calc-btn{background:var(--gas);color:#fff;border:none;border-radius:6px;padding:8px 16px;font-size:11px;font-weight:700;cursor:pointer;margin-top:8px;transition:all .2s}
.eq-calc-btn:hover{background:var(--gas-light);box-shadow:0 2px 8px rgba(10,138,62,.2)}

/* ===== PROCESS DIAGRAM DETAIL ===== */
.diagram-detail-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:200;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.diagram-detail-overlay.active{display:flex}
.diagram-detail{background:var(--card);border-radius:16px;padding:0;max-width:95vw;max-height:90vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.2);position:relative}
.diagram-detail-header{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:2px solid var(--gas-border);position:sticky;top:0;background:var(--card);z-index:1;border-radius:16px 16px 0 0}
.diagram-detail-header h2{font-size:16px;color:var(--text);font-weight:700}
.diagram-detail-close{background:none;border:1px solid var(--card-border);color:var(--text2);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.diagram-detail-close:hover{background:#fee;color:#c00;border-color:#fcc}
.diagram-detail-body{padding:24px;min-width:900px}

/* SVG Popup tooltip */
.svg-popup{display:none;position:absolute;background:var(--card);border:1px solid var(--gas-border);border-radius:10px;padding:14px 18px;box-shadow:0 8px 30px rgba(0,0,0,.15);z-index:150;max-width:300px;font-size:12px;line-height:1.5;color:var(--text)}
.svg-popup.show{display:block}
.svg-popup h4{color:var(--gas);font-size:13px;margin-bottom:6px}
.svg-popup p{color:var(--text2);margin:0}

/* ===== ADDITIVES DONUT CHART ===== */
.additives-chart-wrap{display:flex;align-items:center;gap:24px;margin-top:16px}
.additives-legend{display:flex;flex-direction:column;gap:6px}
.additives-legend-item{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--text2)}
.additives-legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
.additives-legend-val{font-family:var(--mono);font-weight:600;color:var(--text);margin-left:auto;padding-left:12px}

/* VIDEO */
.video-wrap{position:relative;width:100%;padding-bottom:45%;border-radius:12px;overflow:hidden;border:1px solid var(--card-border);background:#000}
.video-wrap iframe{position:absolute;top:0;left:0;width:100%;height:100%}

/* Toast notification for save */
.toast{position:fixed;bottom:30px;right:30px;background:var(--gas);color:#fff;padding:12px 24px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;opacity:0;transform:translateY(20px);transition:all .3s;pointer-events:none;box-shadow:0 6px 20px rgba(10,138,62,.3)}
.toast.show{opacity:1;transform:translateY(0)}

/* Touch-friendly */
@media(pointer:coarse){
  .nav-btn{padding:14px 16px;font-size:14px;min-height:48px}
  .calc-btn{padding:16px;font-size:15px;min-height:52px}
  .edit-cell,.sts-select{padding:10px 12px;font-size:14px;min-height:44px}
  .input-group label{font-size:14px;padding:4px 0}
  .input-group input{padding:10px 12px;font-size:14px;min-height:44px}
}

/* LARGE SCREENS */
@media(min-width:1440px){
  .content{max-width:1200px}
  .kpi-row{grid-template-columns:repeat(4,1fr)}
  .charts-grid{grid-template-columns:1fr 1fr}
}

/* TABLET LANDSCAPE */
@media(max-width:1280px){
  .sidebar{width:180px}
  .calc-grid{gap:14px}
  .kpi-row{grid-template-columns:repeat(2,1fr)}
  .eq-grid{grid-template-columns:1fr}
}

/* TABLET PORTRAIT */
@media(max-width:1024px){
  .calc-grid,.charts-grid,.eq-grid{grid-template-columns:1fr}
  .kpi-row{grid-template-columns:repeat(2,1fr)}
  .control-grid{grid-template-columns:1fr 1fr}
  .sidebar{width:64px;padding:12px 4px}
  .nav-btn{font-size:0;padding:12px 8px;text-align:center;justify-content:center;display:flex}
  .nav-btn::before{font-size:18px}
  .content{padding:16px}
  .header{padding:10px 16px}
  .header-title{font-size:16px}
  .header-sub{font-size:10px}
  .input-group label{grid-template-columns:1fr 90px 40px;gap:6px}
}

/* PHONE */
@media(max-width:768px){
  .layout{flex-direction:column}
  .sidebar{
    width:100%;flex-direction:row;overflow-x:auto;height:auto;
    position:sticky;top:50px;z-index:99;
    padding:6px 8px;gap:4px;
    background:#fff;border-bottom:1px solid var(--card-border);
    -webkit-overflow-scrolling:touch;
  }
  .nav-btn{font-size:11px;white-space:nowrap;padding:10px 14px;flex-shrink:0}
  .content{padding:12px;max-height:none;overflow-y:visible}
  .kpi-row{grid-template-columns:1fr}
  .control-grid{grid-template-columns:1fr}
  .calc-grid,.eq-grid{grid-template-columns:1fr}
  .charts-grid{grid-template-columns:1fr}
  .header{flex-direction:column;gap:8px;align-items:flex-start;padding:10px 14px}
  .header-title{font-size:15px}
  .header-right{width:100%;justify-content:flex-end}
  .panel-title{font-size:15px}
  .dtable{font-size:11px}
  .dtable thead th{padding:8px 6px;font-size:9px}
  .dtable tbody td{padding:8px 6px}
  .edit-cell{width:80px;font-size:11px}
  .input-group label{grid-template-columns:1fr;gap:4px}
  .input-group input{width:100%}
  .input-group span{display:inline}
  .res-row{flex-wrap:wrap;gap:2px}
  .kpi-val{font-size:18px}
  .diagram-detail-body{min-width:auto}
  .additives-chart-wrap{flex-direction:column}
}

/* Very small phones */
@media(max-width:480px){
  .header-title{font-size:13px}
  .header-sub{display:none}
  .nav-btn{font-size:10px;padding:8px 10px}
  .panel-title{font-size:14px}
  .kpi{padding:12px}
  .kpi-val{font-size:16px}
  .edit-cell{width:70px;font-size:10px}
}

/* ===== SIMULATION & ALARMS & PID ===== */
.sim-btn{background:rgba(0,0,0,0.3);border:1px solid rgba(0,255,136,0.5);color:#00e676;font-size:11px;font-weight:700;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;letter-spacing:.03em;display:flex;align-items:center;gap:6px;}
.sim-btn.active{background:rgba(0,255,136,0.15);color:#fff;border-color:#00ff88;animation:glow 2s infinite;}

.pid-wrap{background:linear-gradient(135deg,var(--card),#fafcfe);border:1.5px solid var(--card-border);border-radius:16px;padding:22px;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,.04);}
.pid-flex{display:flex;gap:30px;align-items:center;}
.pid-tank-wrap{flex:0 0 100px;display:flex;justify-content:center;}
.pid-controls{flex:1;display:flex;flex-direction:column;gap:8px;}
.pid-controls input[type=range]{width:100%;accent-color:var(--gas);margin-bottom:4px;cursor:pointer;}

.alarm-dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}
.badge-mini {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff5252;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
  font-family: var(--mono);
  font-weight: bold;
  border: 1px solid #fff;
  box-shadow: 0 0 5px rgba(255,82,82,0.5);
}

.alarm-panel {
  position: absolute;
  top: 45px;
  right: 0;
  width: 320px;
  background: var(--card);
  border: 1.5px solid #ff5252;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  max-height: 450px;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
}
.alarm-panel.minimized {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}
.alarm-head {
  background: linear-gradient(135deg,#ff5252,#c62828);
  color: #fff;
  padding: 12px 16px;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.badge {
  background: #fff;
  color: #c62828;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-family: var(--mono);
}
.alarm-list{padding:10px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;}
.alarm-item{background:#fff3f3;border-left:4px solid #ff5252;padding:10px;font-size:12px;color:#c62828;border-radius:4px;display:flex;flex-direction:column;gap:4px;animation:fadeIn 0.3s ease;}
.alarm-item.warning{background:#fff8e1;border-color:#ffab40;color:#ef6c00;}
.alarm-time{font-family:var(--mono);font-size:10px;opacity:0.8;}

html[dir="rtl"] .sim-btn{flex-direction:row-reverse;}
html[dir="rtl"] .pid-flex{flex-direction:row-reverse;}
html[dir="rtl"] .alarm-panel{right:auto;left:0;}
html[dir="rtl"] .alarm-item{border-left:none;border-right:4px solid #ff5252;}
html[dir="rtl"] .alarm-item.warning{border-right-color:#ffab40;}

/* BLUEPRINT SCHEMATIC */
.blueprint-wrap { width: 100%; overflow-x: auto; padding: 40px 0; display: flex; justify-content: center; background: radial-gradient(circle at center, #0a1b3d, #061021); border-radius: 12px; }
.blueprint-wrap svg { width: 90%; height: auto; min-width: 800px; filter: drop-shadow(0 0 10px rgba(0,240,255,0.1)); }
.blueprint-wrap rect, .blueprint-wrap circle, .blueprint-wrap ellipse { transition: all 0.3s; cursor: pointer; }
.blueprint-wrap g:hover rect { filter: brightness(1.2); stroke-width: 2.5; }
.blueprint-wrap text { font-family: var(--mono); pointer-events: none; }

/* Print */
@media print{
  .sidebar,.header-right,.calc-btn,.nav-btn,.panel-nav,.alarm-panel{display:none}
  body{background:#fff;color:#000}
  .layout{display:block}
  .content{max-height:none;overflow:visible}
  .tab-panel{display:block!important;page-break-after:always}
}

```

---

## 📄 File: `core.js`
**Path:** `HammarIPF/core.js`
```javascript
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

```

---

## 📄 File: `features.js`
**Path:** `HammarIPF/features.js`
```javascript
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

function toggleAlarms() {
  document.getElementById('alarmPanel').classList.toggle('minimized');
}

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
  // If many alarms, maybe don't auto-open but pulse the button
  if (currentAlarms.length > 0 && document.getElementById('alarmPanel').classList.contains('minimized')) {
    document.getElementById('alarmToggle').style.animation = 'glow 1s infinite';
  } else {
    document.getElementById('alarmToggle').style.animation = 'none';
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

```

---

## 📄 File: `charts.js`
**Path:** `HammarIPF/charts.js`
```javascript
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

```

---

## 📄 File: `app.js`
**Path:** `HammarIPF/app.js`
```javascript
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

```

---

## 📄 File: `login.css`
**Path:** `HammarIPF/login.css`
```css
/* ===== LOGIN SCREEN ===== */
@keyframes loginFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes loginPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
@keyframes loginGlow{0%{box-shadow:0 0 30px rgba(0,240,255,.15),0 0 60px rgba(0,230,118,.08)}50%{box-shadow:0 0 50px rgba(0,240,255,.3),0 0 90px rgba(124,77,255,.15)}100%{box-shadow:0 0 30px rgba(0,240,255,.15),0 0 60px rgba(0,230,118,.08)}}
@keyframes loginShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-12px)}30%{transform:translateX(10px)}45%{transform:translateX(-8px)}60%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
@keyframes loginSuccess{0%{border-color:rgba(0,230,118,.3)}50%{border-color:#00e676;box-shadow:0 0 60px rgba(0,230,118,.4)}100%{border-color:rgba(0,230,118,.3)}}
@keyframes ringRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes ringRotateR{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes colorShift{0%{border-color:#00f0ff;filter:hue-rotate(0deg)}25%{border-color:#00e676;filter:hue-rotate(60deg)}50%{border-color:#7c4dff;filter:hue-rotate(120deg)}75%{border-color:#ff6d00;filter:hue-rotate(180deg)}100%{border-color:#00f0ff;filter:hue-rotate(360deg)}}
@keyframes dotPop{0%{transform:scale(0);opacity:0}50%{transform:scale(1.3)}100%{transform:scale(1);opacity:1}}
@keyframes fadeOutLogin{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.05)}}

#loginScreen{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000}
#loginScreen.fadeout{animation:fadeOutLogin .6s ease forwards}

.login-bg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,#060912 0%,#0a1428 50%,#060912 100%);
  position:relative;overflow:hidden}

.login-particles{position:absolute;inset:0;pointer-events:none}
.login-particle{position:absolute;border-radius:50%;opacity:0;animation:loginPulse var(--dur,4s) ease-in-out infinite;animation-delay:var(--delay,0s)}

.login-rings{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.login-ring{position:absolute;border-radius:50%;border:1px solid transparent}
.ring1{width:600px;height:600px;border-color:rgba(0,240,255,.05);animation:ringRotate 30s linear infinite}
.ring2{width:450px;height:450px;border-color:rgba(0,230,118,.07);border-style:dashed;animation:ringRotateR 25s linear infinite}

/* Card */
.login-card{position:relative;z-index:10;background:rgba(10,15,28,.8);backdrop-filter:blur(40px);
  border:1px solid rgba(0,240,255,.2);border-radius:32px;display:flex;width:880px;max-width:95vw;min-height:500px;
  box-shadow:0 25px 80px rgba(0,0,0,0.5);
  animation:loginGlow 5s ease-in-out infinite;overflow:hidden;
  transition:all .5s}
.login-card.shake{animation:loginShake .5s ease}
.login-card.success{animation:loginSuccess .8s ease}

.login-left{flex:1.2;padding:50px;display:flex;flex-direction:column;justify-content:center;
  background:linear-gradient(180deg, rgba(0,240,255,0.03) 0%, transparent 100%);
  border-right:1px solid rgba(255,255,255,0.05);position:relative}

.login-right{flex:1;padding:50px;display:flex;flex-direction:column;justify-content:center;background:rgba(0,0,0,0.2)}

/* Credits Section */
.login-credits-wrap{text-align:center;font-family:'Inter',sans-serif}
.university-logo{width:80px;height:80px;margin-bottom:24px;background:#fff;border-radius:14px;padding:8px;box-shadow:0 0 25px rgba(0,240,255,0.3);object-fit:contain}
.credits-title{color:#00f0ff;font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:15px;opacity:0.8}
.credits-text{color:#e0f0ff;font-size:16px;line-height:1.8;margin-bottom:20px;font-weight:400}
.credits-text strong{display:block;margin-top:15px;color:#00e676;font-size:18px;text-shadow:0 0 10px rgba(0,230,118,0.3)}

/* Logo Section */
.login-logo-wrap{display:flex;flex-direction:column;align-items:center;margin-bottom:30px}
.main-logo{width:100px;height:100px;object-fit:contain;margin-bottom:15px;background:#fff;border-radius:18px;padding:10px;box-shadow:0 0 30px rgba(0,240,255,0.3)}
.station-logo-crop{height:80px;width:auto;object-fit:cover;object-position:top;background:#fff;padding:8px;border-radius:14px;}
.login-title{font-family:'Inter',sans-serif;font-size:32px;font-weight:900;text-align:center;
  background:linear-gradient(135deg,#00f0ff,#00e676);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:5px}
.login-subtitle{text-align:center;font-size:11px;color:#5a7aaa;letter-spacing:.3em;text-transform:uppercase;font-weight:600}

/* Form */
.login-field{margin-bottom:20px}
.login-label{display:block;font-size:10px;color:#5a7aaa;text-transform:uppercase;letter-spacing:.2em;font-weight:700;margin-bottom:10px}
.login-input-wrap{display:flex;align-items:center;background:rgba(0,0,0,0.4);border:1px solid rgba(0,240,255,0.2);border-radius:14px;transition:all .3s}
.login-input-wrap:focus-within{border-color:#00f0ff;box-shadow:0 0 20px rgba(0,240,255,0.15);background:rgba(0,0,0,0.6)}
.login-lock-icon{padding-left:15px;font-size:18px;opacity:.7}
.login-input{flex:1;background:none;border:none;outline:none;color:#fff;font-family:'JetBrains Mono',monospace;font-size:18px;padding:15px;letter-spacing:.2em}
.login-input::placeholder{color:rgba(255,255,255,0.15);letter-spacing:.1em}

.login-btn{width:100%;margin-top:10px;padding:16px;background:linear-gradient(135deg,#00f0ff,#00e676);
  border:none;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;transition:all .3s}
.login-btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,240,255,0.3);filter:brightness(1.1)}
.login-btn-text{color:#060912;font-weight:800;letter-spacing:0.1em;font-size:14px}
.login-btn-arrow{color:#060912;font-size:20px}

.login-error{text-align:center;font-size:12px;font-weight:600;margin-top:15px;height:20px;color:#ff5252;opacity:0}
.login-error.show{opacity:1}
.login-error.ok{color:#00e676}

/* Responsive */
@media(max-width:900px){
  .login-card{flex-direction:column;width:95vw;min-height:auto}
  .login-left{padding:30px;border-right:none;border-bottom:1px solid rgba(255,255,255,0.05)}
  .login-right{padding:30px}
  .login-title{font-size:24px}
}


```

---

## 📄 File: `login.js`
**Path:** `HammarIPF/login.js`
```javascript
"use strict";

(function(){
    var loginScreen = document.createElement('div');
    loginScreen.id = 'loginScreen';
    loginScreen.innerHTML = `
      <div class="login-bg">
        <div class="login-rings">
          <div class="login-ring ring1"></div>
          <div class="login-ring ring2"></div>
        </div>
        <div class="login-particles" id="loginParticles"></div>
        
        <div class="login-card" id="loginCard">
          <!-- Left side: Credits -->
          <div class="login-left">
            <div class="login-credits-wrap">
              <img src="شعار الجامعة.jpg" class="university-logo" alt="Al-Maaqal University" style="animation: loginFloat 3s ease-in-out infinite; box-shadow: 0 0 30px var(--accent-glow); border: 2px solid rgba(0,240,255,0.3);">
              <div class="credits-title">Academic Project</div>

              <div class="credits-text">
                This project was developed and modeled to simulate the Hammar station by Petroleum Engineering students at Al-Maaqal University, under the direct supervision of:
                <strong>"Dr. Eng. Saher Adel & Dr. Mahmoud Badawy"</strong>
              </div>
            </div>
          </div>

          <!-- Right side: Form -->
          <div class="login-right">
            <div class="login-logo-wrap">
              <!-- EMBEDDED HIGH-FIDELITY SVG LOGO -->
              <div class="main-logo station-logo-crop">
                <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
                  <defs>
                    <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#00f0ff" />
                      <stop offset="100%" stop-color="#00e676" />
                    </linearGradient>
                  </defs>
                  <path d="M50,5 L90,25 L90,75 L50,95 L10,75 L10,25 Z" fill="none" stroke="url(#shieldGrad)" stroke-width="3" />
                  <rect x="40" y="45" width="8" height="35" fill="#00f0ff" opacity="0.8" />
                  <rect x="52" y="35" width="8" height="45" fill="#00e676" opacity="0.8" />
                  <path d="M30,40 Q50,20 70,40" fill="none" stroke="#ffc107" stroke-width="2" />
                  <circle cx="50" cy="55" r="10" fill="#1a2030" stroke="#00f0ff" stroke-width="1" />
                  <path d="M50,50 Q55,55 50,62 Q45,55 50,50" fill="#ffab40" />
                </svg>
              </div>
              <h2 class="login-title">HAMMAR IPF</h2>
              <p class="login-subtitle">Smart SCADA Digital Twin</p>
            </div>

            
            <div class="login-field">
              <label class="login-label">ACCESS ROLE</label>
              <div class="login-input-wrap">
                <div class="login-lock-icon">👤</div>
                <select class="login-input" id="loginRole" style="appearance:none;padding-right:30px;background:transparent;cursor:pointer;">
                  <option value="Operator">OPERATOR</option>
                  <option value="Engineer" selected>ENGINEER</option>
                  <option value="Administrator">ADMINISTRATOR</option>
                </select>
              </div>
            </div>

            <div class="login-field">
              <label class="login-label">SECURITY KEY</label>
              <div class="login-input-wrap">
                <div class="login-lock-icon">🔒</div>
                <input type="password" class="login-input" id="loginPass" placeholder="••••••" maxlength="10">
                <button class="login-eye" id="loginEye" type="button">👁️</button>
              </div>
            </div>

            <button class="login-btn" id="loginBtn" type="button">
              <span class="login-btn-text">INITIALIZE SYSTEM</span>
              <span class="login-btn-arrow">→</span>
            </button>
            <div class="login-error" id="loginError"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(loginScreen);

    // Particles
    var pWrap = document.getElementById('loginParticles');
    for(var i=0; i<40; i++){
      var p = document.createElement('div');
      p.className = 'login-particle';
      var size = Math.random()*3 + 1;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.left = Math.random()*100+'%';
      p.style.top = Math.random()*100+'%';
      p.style.setProperty('--dur', (Math.random()*4+3)+'s');
      p.style.setProperty('--delay', (Math.random()*5)+'s');
      p.style.background = Math.random()>0.5 ? '#00f0ff' : '#00e676';
      pWrap.appendChild(p);
    }

    var pass = document.getElementById('loginPass');
    var eye = document.getElementById('loginEye');
    var btn = document.getElementById('loginBtn');
    var err = document.getElementById('loginError');
    var card = document.getElementById('loginCard');

    eye.onclick = function(){
      pass.type = pass.type === 'password' ? 'text' : 'password';
      eye.textContent = pass.type === 'password' ? '👁️' : '🙈';
    };

    function doLogin(){
      var val = pass.value;
      var role = document.getElementById('loginRole').value;
      if(val === "770077"){
        err.textContent = "ACCESS GRANTED";
        err.className = "login-error show ok";
        card.classList.add('success');
        sessionStorage.setItem('hammar_auth', 'true');
        sessionStorage.setItem('hammar_role', role);
        setTimeout(function(){
          loginScreen.classList.add('fadeout');
          setTimeout(function(){
            loginScreen.remove();
            if(window.applyRole) window.applyRole(role);
          }, 600);
        }, 800);
      } else {
        err.textContent = "INVALID SECURITY KEY";
        err.className = "login-error show";
        card.classList.add('shake');
        pass.value = "";
        setTimeout(function(){ card.classList.remove('shake'); }, 500);
      }
    }

    btn.onclick = doLogin;
    pass.onkeydown = function(e){ if(e.key === "Enter") doLogin(); };

    if(sessionStorage.getItem('hammar_auth') === 'true'){
      loginScreen.remove();
    }
})();


```

---

## 📄 File: `sw.js`
**Path:** `HammarIPF/sw.js`
```javascript
var CACHE='hammar-scada-v3';
var FILES=['index.html','styles.css','login.css','core.js','charts.js','features.js','login.js','manifest.json','sw.js','icon-192.png','icon-512.png','شعار الجامعة.jpg'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}))});

```

---

## 📄 File: `manifest.json`
**Path:** `HammarIPF/manifest.json`
```json
{
  "name": "Hammar IPF - Smart SCADA",
  "short_name": "Hammar SCADA",
  "description": "Advanced GOSP Simulation & Engineering Calculator",
  "start_url": "./index.html",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#05080f",
  "theme_color": "#00f0ff",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"}
  ]
}

```

---

## 📄 File: `app.py`
**Path:** `HammarIPF/app.py`
```python
import streamlit as st
import plotly.graph_objects as go

st.set_page_config(page_title="Hammar IPF Dashboard", layout="wide", page_icon="🛢️")

st.markdown("""
<style>
body, .stApp { background-color: #0a0e1a; color: #e0e6f0; font-family: 'Segoe UI', sans-serif; }
.block-container { padding: 1rem 2rem; }
h1,h2,h3 { color: #00d4ff; }
div[data-testid="stMetric"] {
  background: linear-gradient(135deg,#0d1b2e,#1a2f4e);
  border: 1px solid #00d4ff44; border-radius: 12px; padding: 15px;
}
div[data-testid="stMetricValue"] { color: #00ff88 !important; font-size: 1.6rem !important; }
div[data-testid="stMetricLabel"] { color: #8ab4d4 !important; }
.stTabs [data-baseweb="tab"] { color: #8ab4d4; background: transparent; }
.stTabs [aria-selected="true"] { color: #00d4ff !important; border-bottom: 2px solid #00d4ff; }
hr { border-color: #1e3a5f; }
.st-emotion-cache-1v0mbdj, .st-emotion-cache-z5fcl4 { background: #0d1424; }
</style>
""", unsafe_allow_html=True)

# ======= HEADER =======
st.markdown("""
<div style='background:linear-gradient(90deg,#050d1a,#0a1f3d,#050d1a);
  border-bottom:2px solid #00d4ff44; padding:25px 20px; margin-bottom:20px; border-radius:10px;'>
  <h1 style='margin:0; font-size:2.4rem; color:#00d4ff; letter-spacing:2px;'>
    🛢️ HAMMAR IPF DASHBOARD
  </h1>
  <p style='color:#8ab4d4; margin:8px 0 0 0; font-size:1rem;'>
    Gas Oil Separation Plant — Integrated Production Facility | SCADA v2.4<br>
    <span style='color:#00ff88; font-size:0.85rem;'>
      ● LIVE | API-12J / API-14.1 / ASTM-D4007 / GPSA Compliant
    </span>
  </p>
</div>
""", unsafe_allow_html=True)

# ======= VIDEO =======
st.markdown("### 🎬 Process Simulation — 3-Phase Separator (API-12J)")
st.video("https://www.youtube.com/watch?v=JmKxN0s3-qQ")
st.markdown("---")

# ======= DEFAULT DATA =======
TRAINS = ["TRAIN 1", "TRAIN 2", "TRAIN 3", "TRAIN 4"]
DEFAULTS = {
    "Status":             ["ON", "ON", "ON", "STOP"],
    "Inlet Fluid (bpd)":  [31731.52, 46508.43, 51067.11, 0.0],
    "Oil Prod (bpd)":     [22513.10, 37796.91, 39528.68, 0.0],
    "Water Prod (bpd)":   [9218.42,  8711.52,  11538.43, 0.0],
    "Total Gas (MMSCFD)": [64.8,     36.1,     35.9,     0.0],
    "Separator Vol (m3)": [60.0,     60.0,     60.0,     60.0],
}

# ======= LIVE DATA EDITOR =======
st.markdown("### ⚙️ Live Production Data — Editable")
st.info("📝 Edit any value below. All charts and calculations update in real time.")

cols = st.columns([1.2, 1, 1.3, 1.3, 1.3, 1.3, 1.3])
headers = ["Train", "Status", "Inlet (bpd)", "Oil (bpd)", "Water (bpd)", "Gas (MMSCFD)", "Sep Vol (m3)"]
for col, h in zip(cols, headers):
    col.markdown(f"<div style='color:#00d4ff; font-size:0.8rem; font-weight:700; padding:4px 0;'>{h}</div>",
                 unsafe_allow_html=True)

data = {}
for key in DEFAULTS:
    data[key] = list(DEFAULTS[key])

inlet, oil, water, gas, sep_vol, statuses = [], [], [], [], [], []

for i, train in enumerate(TRAINS):
    row_cols = st.columns([1.2, 1, 1.3, 1.3, 1.3, 1.3, 1.3])
    row_cols[0].markdown(
        f"<div style='color:#00ff88; font-weight:bold; padding-top:8px;'>{train}</div>",
        unsafe_allow_html=True)
    s  = row_cols[1].selectbox("", ["ON","STOP"], index=0 if DEFAULTS["Status"][i]=="ON" else 1,
                                key=f"st_{i}", label_visibility="collapsed")
    inf = row_cols[2].number_input("", value=DEFAULTS["Inlet Fluid (bpd)"][i], min_value=0.0,
                                   key=f"inf_{i}", label_visibility="collapsed", format="%.2f")
    op  = row_cols[3].number_input("", value=DEFAULTS["Oil Prod (bpd)"][i], min_value=0.0,
                                   key=f"op_{i}", label_visibility="collapsed", format="%.2f")
    wp  = row_cols[4].number_input("", value=DEFAULTS["Water Prod (bpd)"][i], min_value=0.0,
                                   key=f"wp_{i}", label_visibility="collapsed", format="%.2f")
    tg  = row_cols[5].number_input("", value=DEFAULTS["Total Gas (MMSCFD)"][i], min_value=0.0,
                                   key=f"tg_{i}", label_visibility="collapsed", format="%.2f")
    sv  = row_cols[6].number_input("", value=DEFAULTS["Separator Vol (m3)"][i], min_value=0.0,
                                   key=f"sv_{i}", label_visibility="collapsed", format="%.1f")
    statuses.append(s); inlet.append(inf); oil.append(op)
    water.append(wp);   gas.append(tg);   sep_vol.append(sv)

st.markdown("---")

# ======= CALCULATIONS =======
EPS = 1e-9

def safe_div(a, b): return a / (b + EPS)

wc   = [safe_div(water[i], inlet[i]) * 100 for i in range(4)]
gor  = [safe_div(gas[i] * 1_000_000, oil[i]) for i in range(4)]
m3d  = [inlet[i] * 0.158987 for i in range(4)]
rt   = [safe_div(sep_vol[i] * 1440, m3d[i]) for i in range(4)]
eff  = [safe_div(oil[i] + water[i], inlet[i]) * 100 for i in range(4)]
load = [safe_div(inlet[i], sep_vol[i]) for i in range(4)]

# Calculated table
st.markdown("### 📊 Calculated Engineering Results (API-12J / API-14.1 / ASTM-D4007)")
hdr = st.columns([1.2,1.2,1.4,1.2,1.6,1.4,1.4])
for col, h in zip(hdr,
    ["Train","Water Cut (%)","GOR (SCF/bbl)","Inlet m³/d","Retention (min)","Efficiency (%)","Load (bpd/m³)"]):
    col.markdown(f"<div style='color:#00d4ff; font-size:0.78rem; font-weight:700;'>{h}</div>",
                 unsafe_allow_html=True)

rt_ok  = lambda v: "🟢" if 3 <= v <= 5 else "🟡" if v > 0 else "⚫"
wc_ok  = lambda v: "🟢" if v < 30 else "🟡" if v < 50 else "🔴"
eff_ok = lambda v: "🟢" if v >= 95 else "🟡" if v >= 80 else "🔴"

for i in range(4):
    row = st.columns([1.2,1.2,1.4,1.2,1.6,1.4,1.4])
    clr = "#00ff88" if statuses[i]=="ON" else "#ff4444"
    row[0].markdown(f"<span style='color:{clr}; font-weight:bold;'>{TRAINS[i]}</span>",
                    unsafe_allow_html=True)
    row[1].markdown(f"{wc_ok(wc[i])} **{wc[i]:.2f}%**")
    row[2].markdown(f"**{gor[i]:,.0f}**")
    row[3].markdown(f"**{m3d[i]:,.0f}**")
    row[4].markdown(f"{rt_ok(rt[i])} **{rt[i]:.2f}**")
    row[5].markdown(f"{eff_ok(eff[i])} **{eff[i]:.1f}%**")
    row[6].markdown(f"**{load[i]:.0f}**")

st.caption("🟢 Normal  🟡 Warning  🔴 Critical | Retention target 3-5 min (API-12J) | GOR per API-14.1")
st.markdown("---")

# ======= CHARTS =======
DARK_BG  = "#0a0e1a"
PLOT_BG  = "#0d1424"
FONT_CLR = "#8ab4d4"
BASE_LAYOUT = dict(
    template="plotly_dark",
    paper_bgcolor=DARK_BG,
    plot_bgcolor=PLOT_BG,
    font_color=FONT_CLR,
    margin=dict(t=50,b=30,l=30,r=30)
)

tab1, tab2, tab3, tab4 = st.tabs(
    ["🛢️ Production", "💧 Water & GOR", "⏱ Separator", "🌡 Efficiency"])

with tab1:
    fig = go.Figure()
    fig.add_trace(go.Bar(name="Oil (bpd)",  x=TRAINS, y=oil,   marker_color="#00ff88"))
    fig.add_trace(go.Bar(name="Water (bpd)",x=TRAINS, y=water, marker_color="#0099ff"))
    fig.add_trace(go.Bar(name="Gas x1000",  x=TRAINS, y=[g*1000 for g in gas], marker_color="#ffaa00"))
    fig.update_layout(**BASE_LAYOUT, barmode="group", title="Production per Train")
    st.plotly_chart(fig, use_container_width=True)

    fig2 = go.Figure()
    fig2.add_trace(go.Bar(name="Oil",   x=TRAINS, y=oil,   marker_color="#00ff88"))
    fig2.add_trace(go.Bar(name="Water", x=TRAINS, y=water, marker_color="#0099ff"))
    fig2.update_layout(**BASE_LAYOUT, barmode="stack", title="Liquid Composition (Stacked)")
    st.plotly_chart(fig2, use_container_width=True)

with tab2:
    col1, col2 = st.columns(2)
    with col1:
        wc_colors = ["#00ff88" if v < 30 else "#ffaa00" if v < 50 else "#ff4444" for v in wc]
        fig = go.Figure(go.Bar(x=TRAINS, y=wc, marker_color=wc_colors,
            text=[f"{v:.1f}%" for v in wc], textposition="outside"))
        fig.add_hline(y=30, line_dash="dash", line_color="#ffaa00",
                      annotation_text="Warning 30%", annotation_position="right")
        fig.add_hline(y=50, line_dash="dash", line_color="#ff4444",
                      annotation_text="Critical 50%", annotation_position="right")
        fig.update_layout(**BASE_LAYOUT, title="Water Cut % (ASTM-D4007)")
        st.plotly_chart(fig, use_container_width=True)
    with col2:
        fig = go.Figure(go.Bar(x=TRAINS, y=gor, marker_color="#ffaa00",
            text=[f"{v:,.0f}" for v in gor], textposition="outside"))
        fig.update_layout(**BASE_LAYOUT, title="GOR SCF/bbl (API-14.1)")
        st.plotly_chart(fig, use_container_width=True)

    total_oil_sum   = sum(oil)
    total_water_sum = sum(water)
    fig_pie = go.Figure(go.Pie(
        labels=["Total Oil", "Total Water"],
        values=[total_oil_sum, total_water_sum],
        marker_colors=["#00ff88", "#0099ff"], hole=0.4,
        textinfo="percent+label"))
    fig_pie.update_layout(**BASE_LAYOUT, title="Plant Liquid Split")
    st.plotly_chart(fig_pie, use_container_width=True)

with tab3:
    col1, col2 = st.columns(2)
    with col1:
        rt_colors = ["#00ff88" if 3 <= v <= 5 else "#ffaa00" if v < 3 else "#ff4444" for v in rt]
        fig = go.Figure(go.Bar(x=TRAINS, y=rt, marker_color=rt_colors,
            text=[f"{v:.1f} min" for v in rt], textposition="outside"))
        fig.add_hrect(y0=3, y1=5, fillcolor="#00d4ff", opacity=0.08,
            annotation_text="API-12J: 3-5 min", annotation_position="top left")
        fig.update_layout(**BASE_LAYOUT, title="Retention Time — API-12J Compliance")
        st.plotly_chart(fig, use_container_width=True)
    with col2:
        fig = go.Figure(go.Bar(x=TRAINS, y=m3d, marker_color="#aa44ff",
            text=[f"{v:.0f}" for v in m3d], textposition="outside"))
        fig.update_layout(**BASE_LAYOUT, title="Inlet Volume Flow (m³/d)")
        st.plotly_chart(fig, use_container_width=True)

    fig = go.Figure(go.Bar(x=TRAINS, y=load, marker_color="#ff6699",
        text=[f"{v:.0f}" for v in load], textposition="outside"))
    fig.update_layout(**BASE_LAYOUT, title="Separator Liquid Loading (bpd/m³)")
    st.plotly_chart(fig, use_container_width=True)

with tab4:
    eff_colors = ["#00ff88" if v >= 95 else "#ffaa00" if v >= 80 else "#ff4444" for v in eff]
    fig = go.Figure(go.Bar(x=TRAINS, y=eff, marker_color=eff_colors,
        text=[f"{v:.1f}%" for v in eff], textposition="outside"))
    fig.add_hline(y=95, line_dash="dash", line_color="#00ff88",
                  annotation_text="Target >= 95%", annotation_position="right")
    fig.update_layout(**BASE_LAYOUT, title="Separator Efficiency (%)")
    st.plotly_chart(fig, use_container_width=True)

    cats = ["Low Water Cut", "Low GOR", "Retention OK", "Efficiency", "Throughput"]
    fig_radar = go.Figure()
    for i, train in enumerate(TRAINS):
        if statuses[i] == "ON" and inlet[i] > 0:
            vals = [
                max(0, 100 - wc[i]),
                max(0, 100 - min(gor[i]/30, 100)),
                max(0, min(rt[i]/5*100, 100)),
                eff[i],
                min(inlet[i]/60000*100, 100),
            ]
            fig_radar.add_trace(go.Scatterpolar(
                r=vals + [vals[0]], theta=cats + [cats[0]],
                name=train, fill="toself", opacity=0.65))
    fig_radar.update_layout(**BASE_LAYOUT, title="Train Performance Radar",
        polar=dict(bgcolor=PLOT_BG))
    st.plotly_chart(fig_radar, use_container_width=True)

st.markdown("---")

# ======= SURFACE CONTROL & KPI =======
st.markdown("### 🧪 Surface Control & Chemical Injection System")

total_inlet = sum(inlet)
total_oil   = sum(oil)
total_water = sum(water)
total_gas   = sum(gas)

demulsifier = ((total_inlet * 158.98) * (15 / 1_000_000)) / 24
scale_inh   = ((total_inlet * 158.98) * (10 / 1_000_000)) / 24
corr_inh    = ((total_inlet * 158.98) * (8  / 1_000_000)) / 24
gas_energy  = total_gas * 1000
gas_gj      = total_gas * 1055.056

st.markdown("#### 📦 Plant KPI Totals")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Total Inlet Fluid",  f"{total_inlet:,.0f} bpd",
          f"{total_inlet*0.158987:,.0f} m³/d")
c2.metric("Total Oil Produced", f"{total_oil:,.0f} bpd",
          f"{safe_div(total_oil, total_inlet)*100:.1f}% of inlet")
c3.metric("Demulsifier Rate",   f"{demulsifier:.2f} L/hr", "@15 ppm — API/NACE")
c4.metric("Gas Thermal Energy", f"{gas_energy:,.0f} MMBTU/D", f"{gas_gj:,.0f} MJ/D")

st.markdown("#### 💉 Chemical Injection Details")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Scale Inhibitor",     f"{scale_inh:.2f} L/hr",   "@10 ppm")
c2.metric("Corrosion Inhibitor", f"{corr_inh:.2f} L/hr",    "@8 ppm")
c3.metric("Total Water Prod",    f"{total_water:,.0f} bpd",  f"{total_water*0.158987:,.0f} m³/d")
c4.metric("Total Gas Prod",      f"{total_gas:.2f} MMSCFD",  f"{total_gas*28316.8:.0f} m³/d")

chems = ["Demulsifier", "Scale Inhibitor", "Corrosion Inhibitor"]
rates = [demulsifier, scale_inh, corr_inh]
fig_chem = go.Figure(go.Bar(x=chems, y=rates,
    marker_color=["#00ff88", "#0099ff", "#ffaa00"],
    text=[f"{r:.3f} L/hr" for r in rates], textposition="outside"))
fig_chem.update_layout(**BASE_LAYOUT, title="Chemical Injection Rates (L/hr)")
st.plotly_chart(fig_chem, use_container_width=True)

st.markdown("---")
st.success("✅ All systems are stable. Mass balance is automatically updated based on your inputs.")
st.caption("Standards: API-12J | API-14.1 | API-14.5 | ASTM-D4007 | API-RP-19B | GPSA Engineering Data Book")

```

---

## 📄 File: `requirements.txt`
**Path:** `HammarIPF/requirements.txt`
```text
streamlit==1.32.0
pandas==2.2.1
plotly==5.20.0
numpy==1.26.4

```

---