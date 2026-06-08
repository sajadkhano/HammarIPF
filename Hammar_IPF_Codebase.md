# 🛢️ Hammar IPF - Hano Control & Engineering Dashboard
## Complete Project Codebase and Documentation

This document contains the entire source code of the Hammar IPF project, including the frontend Hano Control simulation (HTML, CSS, JS, Manifest, Service Worker) and the backend Streamlit analysis script (`app.py`).

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
# Hammar IPF - Hano Control & Engineering Dashboard 🛢️

![Hammar SCADA](https://img.shields.io/badge/Platform-Hano%20Control-blue)
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
### 👤 Developer & Creator
**sjjad k. Hano (سجاد ك. هانو)**
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
<title>Hammar IPF - Hano Control</title>
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
        <h1 class="header-title">🎛️ Hammar IPF - Hano Control</h1>
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
    <button class="nav-btn sd-nav-special" data-tab="sepdesign">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M12,1C8.14,1 5,4.14 5,8C5,11.86 8.14,15 12,15C15.86,15 19,11.86 19,8C19,4.14 15.86,1 12,1M12,13A5,5 0 0,1 7,8A5,5 0 0,1 12,3A5,5 0 0,1 17,8A5,5 0 0,1 12,13M12,5A3,3 0 0,0 9,8A3,3 0 0,0 12,11A3,3 0 0,0 15,8A3,3 0 0,0 12,5M2,20V22H22V20C22,17.33 16.67,16 12,16C7.33,16 2,17.33 2,20Z" fill="currentColor"/></svg>
      <span class="sd-nav-label">Separator Design</span>
      <span class="sd-nav-badge">NEW</span>
    </button>
    <button class="nav-btn sd-nav-special" data-tab="hammar-pfd" style="border-color:rgba(255,171,0,0.4);margin-top:4px;">
      <svg class="nav-icon" viewBox="0 0 24 24"><path d="M17,12H7V10H17M17,8H7V6H17M7,16H13V14H7M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" fill="currentColor"/></svg>
      <span class="sd-nav-label">Hammar IPF PFD</span>
      <span class="sd-nav-badge" style="background:linear-gradient(90deg,#ff6b00,#ffab00);">PFD</span>
    </button>
    
    <!-- Developer Credit Section in Sidebar -->
    <div class="sidebar-dev-footer" onclick="openDevModal()">
      <div class="dev-footer-avatar">🎓</div>
      <div class="dev-footer-content">
        <span class="dev-footer-title">DEVELOPED BY</span>
        <span class="dev-footer-name">sjjad k. Hano</span>
      </div>
      <div class="dev-footer-pulse"></div>
    </div>
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

      <!-- SVG Process Schematic — Hammar IPF Figure 1 Layout -->
      <div class="schematic-wrap" style="overflow-x:auto;overflow-y:hidden;padding:6px 0;">
        <svg id="plantSVG" viewBox="0 0 1400 625" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;min-width:900px;display:block;font-family:'Inter',sans-serif;">
          <defs>
            <linearGradient id="oilG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6b2e00"/><stop offset="100%" stop-color="#ffab40"/></linearGradient>
            <linearGradient id="gasG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6a0000"/><stop offset="100%" stop-color="#ff5252"/></linearGradient>
            <linearGradient id="watG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#002244"/><stop offset="100%" stop-color="#29b6f6"/></linearGradient>
            <linearGradient id="rivG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#004d22"/><stop offset="100%" stop-color="#00e676"/></linearGradient>
            <linearGradient id="vesG"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e3048"/><stop offset="100%" stop-color="#0c1a28"/></linearGradient>
            <linearGradient id="ov-zonGas" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(160,30,30,0.09)"/><stop offset="100%" stop-color="rgba(160,30,30,0)"/></linearGradient>
            <linearGradient id="ov-zonOil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(180,100,0,0.08)"/><stop offset="100%" stop-color="rgba(180,100,0,0)"/></linearGradient>
            <linearGradient id="ov-zonWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(0,80,180,0.09)"/><stop offset="100%" stop-color="rgba(0,80,180,0)"/></linearGradient>
            <filter id="glw"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="dropshadow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/></filter>
            <marker id="arrO"   viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#ffab40"/></marker>
            <marker id="arrG"   viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#ff5252"/></marker>
            <marker id="arrW"   viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#29b6f6"/></marker>
            <marker id="arrR"   viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#00e676"/></marker>
            <marker id="arrC"   viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#00e676"/></marker>
            <marker id="arrWdn" viewBox="0 0 6 10" refX="3" refY="9" markerWidth="6" markerHeight="8" orient="auto"><path d="M0,0 L3,10 L6,0z" fill="#29b6f6"/></marker>
            <marker id="arrRup" viewBox="0 0 6 10" refX="3" refY="1" markerWidth="6" markerHeight="8" orient="auto"><path d="M0,10 L3,0 L6,10z" fill="#00e676"/></marker>
          </defs>

          <!-- Background + grid -->
          <rect width="1400" height="625" fill="#060e1a" rx="12"/>
          <pattern id="ovGrid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M35 0L0 0 0 35" fill="none" stroke="rgba(0,200,255,0.025)" stroke-width="0.5"/>
          </pattern>
          <rect width="1400" height="625" fill="url(#ovGrid)" rx="12"/>

          <!-- Zone Backgrounds -->
          <rect x="8" y="30"  width="1385" height="188" rx="6" fill="url(#ov-zonGas)" opacity="0.9"/>
          <rect x="8" y="222" width="1385" height="218" rx="6" fill="url(#ov-zonOil)" opacity="0.9"/>
          <rect x="8" y="444" width="1385" height="170" rx="6" fill="url(#ov-zonWat)" opacity="0.9"/>
          <line x1="14" y1="220" x2="1388" y2="220" stroke="rgba(255,171,0,0.14)" stroke-width="1" stroke-dasharray="10,6"/>
          <line x1="14" y1="442" x2="1388" y2="442" stroke="rgba(0,140,255,0.14)" stroke-width="1" stroke-dasharray="10,6"/>

          <!-- Zone side bars -->
          <rect x="8" y="30"  width="22" height="188" rx="4" fill="rgba(220,40,40,0.12)"/>
          <rect x="8" y="222" width="22" height="218" rx="4" fill="rgba(220,130,0,0.12)"/>
          <rect x="8" y="444" width="22" height="170" rx="4" fill="rgba(0,120,230,0.12)"/>
          <text x="19" y="140" text-anchor="middle" fill="rgba(255,100,100,0.85)" font-size="9" font-weight="700" letter-spacing="2" transform="rotate(-90,19,140)">GAS TRAIN</text>
          <text x="19" y="345" text-anchor="middle" fill="rgba(255,171,64,0.85)" font-size="9" font-weight="700" letter-spacing="2" transform="rotate(-90,19,345)">OIL PROCESS</text>
          <text x="19" y="535" text-anchor="middle" fill="rgba(41,182,246,0.85)" font-size="9" font-weight="700" letter-spacing="2" transform="rotate(-90,19,535)">WATER SYSTEM</text>

          <!-- Title -->
          <rect x="8" y="6" width="1385" height="22" rx="5" fill="rgba(0,15,40,0.8)" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <text x="700" y="21" text-anchor="middle" fill="#00f0ff" font-size="11" font-weight="800" letter-spacing="2">HAMMAR IPF — SIMPLIFIED OVERVIEW  (Figure 1, Weatherford O&amp;M Vol.1)  ·  Click any block to navigate</text>

          <!-- Fuel/Flare header line -->
          <line x1="36" y1="48" x2="1360" y2="48" stroke="rgba(255,82,82,0.14)" stroke-width="1" stroke-dasharray="8,6"/>
          <text x="40" y="44" fill="rgba(255,82,82,0.5)" font-size="8" font-weight="600">HP/LP Fuel Gas  ·  HP Flare  ·  LP Flare</text>

          <!-- ══════════════ ROW 1: GAS TRAIN (Y~125) ══════════════ -->

          <!-- LP COMPRESSOR -->
          <g class="svg-node" onclick="switchTab('gas')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="150" y="68" width="118" height="74" rx="7" fill="url(#vesG)" stroke="#ff5252" stroke-width="1.8"/>
            <polygon points="168,96 168,120 194,108" fill="none" stroke="#ff5252" stroke-width="1.8"/>
            <circle cx="216" cy="108" r="13" fill="none" stroke="#ff5252" stroke-width="1.6"/>
            <line x1="203" y1="108" x2="229" y2="108" stroke="#ff5252" stroke-width="1.2"/>
            <text x="209" y="154" text-anchor="middle" fill="#ff5252" font-size="9.5" font-weight="700">LP COMP.</text>
            <text x="209" y="166" text-anchor="middle" fill="#888" font-size="8">1st Stage Gas</text>
          </g>
          <line x1="209" y1="68" x2="209" y2="48" stroke="#ff5252" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>

          <line x1="268" y1="105" x2="314" y2="105" stroke="url(#gasG)" stroke-width="2.5" marker-end="url(#arrG)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- HP COMPRESSOR -->
          <g class="svg-node" onclick="switchTab('gas')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="316" y="68" width="118" height="74" rx="7" fill="url(#vesG)" stroke="#ff5252" stroke-width="1.8"/>
            <polygon points="334,96 334,120 360,108" fill="none" stroke="#ff5252" stroke-width="1.8"/>
            <circle cx="382" cy="108" r="13" fill="none" stroke="#ff5252" stroke-width="1.6"/>
            <line x1="369" y1="108" x2="395" y2="108" stroke="#ff5252" stroke-width="1.2"/>
            <text x="375" y="154" text-anchor="middle" fill="#ff5252" font-size="9.5" font-weight="700">HP COMP.</text>
            <text x="375" y="166" text-anchor="middle" fill="#888" font-size="8">2nd Stage Gas</text>
          </g>
          <line x1="375" y1="68" x2="375" y2="48" stroke="#ff5252" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>

          <line x1="434" y1="105" x2="478" y2="105" stroke="url(#gasG)" stroke-width="2.5" marker-end="url(#arrG)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- CRUDE/CRUDE EXCHANGER -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="480" y="68" width="128" height="74" rx="7" fill="url(#vesG)" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M498,86 Q514,112 530,86" fill="none" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M530,86 Q546,112 562,86" fill="none" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M498,126 Q514,102 530,126" fill="none" stroke="#ffab40" stroke-width="1.3" opacity="0.5"/>
            <path d="M530,126 Q546,102 562,126" fill="none" stroke="#ffab40" stroke-width="1.3" opacity="0.5"/>
            <text x="544" y="154" text-anchor="middle" fill="#ffab40" font-size="9" font-weight="700">C/C EXCHANGER</text>
          </g>

          <line x1="608" y1="105" x2="652" y2="105" stroke="url(#gasG)" stroke-width="2.5" marker-end="url(#arrG)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL HEATER -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="654" y="68" width="116" height="74" rx="7" fill="url(#vesG)" stroke="#ff9800" stroke-width="1.8"/>
            <path d="M686,128 Q686,104 696,92 Q696,112 706,102 Q706,128 686,128" fill="none" stroke="#ff9800" stroke-width="2"/>
            <path d="M692,124 Q692,110 698,102" fill="none" stroke="#ffcc02" stroke-width="1.5" opacity="0.7"/>
            <text x="712" y="154" text-anchor="middle" fill="#ff9800" font-size="9" font-weight="700">CRUDE HEATER</text>
            <text x="712" y="166" text-anchor="middle" fill="#888" font-size="8">Direct Fired</text>
          </g>
          <line x1="712" y1="68" x2="712" y2="48" stroke="#ff9800" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>

          <line x1="770" y1="105" x2="824" y2="105" stroke="url(#gasG)" stroke-width="3" marker-end="url(#arrG)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- GAS EXPORT PIPELINE -->
          <g class="svg-node" filter="url(#dropshadow)">
            <rect x="826" y="60" width="158" height="90" rx="7" fill="url(#vesG)" stroke="#ff5252" stroke-width="2.2"/>
            <text x="905" y="98"  text-anchor="middle" fill="#ff5252" font-size="12" font-weight="800">GAS EXPORT</text>
            <text x="905" y="113" text-anchor="middle" fill="#ff5252" font-size="12" font-weight="800">PIPELINE</text>
            <text x="905" y="133" text-anchor="middle" fill="#aaa"   font-size="9">136.8 MMSCFD  Sweet</text>
            <text x="905" y="146" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-gas">— MMSCFD</text>
          </g>
          <line x1="984" y1="105" x2="1036" y2="105" stroke="url(#gasG)" stroke-width="3" marker-end="url(#arrG)"/>
          <line x1="1036" y1="80" x2="1036" y2="132" stroke="#ff5252" stroke-width="4" opacity="0.9"/>
          <text x="1050" y="98" fill="#ff5252" font-size="9.5" font-weight="700">EXPORT →</text>
          <line x1="905" y1="60" x2="905" y2="48" stroke="#ff5252" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.5"/>
          <text x="905" y="44" text-anchor="middle" fill="rgba(255,82,82,0.5)" font-size="7.5">Condensate Header</text>

          <!-- ══════════════ ROW 2: OIL PROCESS (Y~328) ══════════════ -->

          <!-- PRODUCTION FLUIDS INLET -->
          <g class="svg-node" onclick="switchTab('trains')" style="cursor:pointer;" filter="url(#glw)">
            <rect x="36" y="244" width="108" height="78" rx="7" fill="url(#vesG)" stroke="#ffab40" stroke-width="2"/>
            <text x="90" y="274" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="800">PRODUCTION</text>
            <text x="90" y="288" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="800">FLUIDS</text>
            <text x="90" y="302" text-anchor="middle" fill="#aaa"   font-size="8.5">from DGS Wells</text>
            <text x="90" y="315" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700" id="sv-well">— bpd</text>
          </g>

          <line x1="144" y1="283" x2="170" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 1ST STAGE SEPARATOR -->
          <g class="svg-node" onclick="switchTab('separator')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="172" y="246" width="142" height="74" rx="37" fill="url(#vesG)" stroke="#00e676" stroke-width="2"/>
            <rect x="194" y="261" width="99" height="14" rx="3" fill="#a05a00" opacity="0.5"/>
            <rect x="194" y="282" width="99" height="14" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="189" y1="276" x2="307" y2="276" stroke="rgba(0,240,255,0.25)" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="243" y="337" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700">1st STAGE SEP.</text>
            <text x="243" y="350" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-hpsep">15.2–36.6 barg</text>
          </g>
          <!-- gas up -->
          <line x1="243" y1="246" x2="243" y2="182" stroke="url(#gasG)" stroke-width="2" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="243" y1="182" x2="209" y2="142" stroke="url(#gasG)" stroke-width="2" marker-end="url(#arrG)" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <text x="256" y="216" fill="#ff5252" font-size="8" opacity="0.7">Gas ↑</text>
          <!-- PW down -->
          <line x1="243" y1="320" x2="243" y2="455" stroke="url(#watG)" stroke-width="2" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="256" y="390" fill="#29b6f6" font-size="8" opacity="0.7">PW ↓</text>

          <line x1="314" y1="283" x2="348" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 2ND STAGE SEPARATOR -->
          <g class="svg-node" onclick="switchTab('separator')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="350" y="246" width="142" height="74" rx="37" fill="url(#vesG)" stroke="#00e676" stroke-width="2"/>
            <rect x="372" y="261" width="99" height="14" rx="3" fill="#a05a00" opacity="0.5"/>
            <rect x="372" y="282" width="99" height="14" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="367" y1="276" x2="485" y2="276" stroke="rgba(0,240,255,0.25)" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="421" y="337" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700">2nd STAGE SEP.</text>
            <text x="421" y="350" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-lpsep">LP Stage</text>
          </g>
          <!-- gas up -->
          <line x1="421" y1="246" x2="421" y2="182" stroke="url(#gasG)" stroke-width="2" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="421" y1="182" x2="375" y2="142" stroke="url(#gasG)" stroke-width="2" marker-end="url(#arrG)" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <text x="434" y="216" fill="#ff5252" font-size="8" opacity="0.7">Gas ↑</text>
          <!-- PW down -->
          <line x1="421" y1="320" x2="421" y2="455" stroke="url(#watG)" stroke-width="2" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="434" y="390" fill="#29b6f6" font-size="8" opacity="0.7">PW ↓</text>

          <line x1="492" y1="283" x2="526" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- RUN DOWN COOLER -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="528" y="248" width="116" height="70" rx="7" fill="url(#vesG)" stroke="#29b6f6" stroke-width="1.8"/>
            <path d="M544,266 Q562,286 580,266" fill="none" stroke="#29b6f6" stroke-width="1.8"/>
            <path d="M580,266 Q598,286 616,266" fill="none" stroke="#29b6f6" stroke-width="1.8"/>
            <path d="M544,288 Q562,268 580,288" fill="none" stroke="#29b6f6" stroke-width="1.3" opacity="0.5"/>
            <path d="M580,288 Q598,268 616,288" fill="none" stroke="#29b6f6" stroke-width="1.3" opacity="0.5"/>
            <text x="586" y="334" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">RUN DOWN</text>
            <text x="586" y="347" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">COOLER</text>
          </g>
          <!-- hot crude -> HEX -->
          <line x1="586" y1="248" x2="586" y2="196" stroke="url(#oilG)" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.4s" repeatCount="indefinite"/></line>
          <line x1="586" y1="196" x2="544" y2="142" stroke="url(#oilG)" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5" marker-end="url(#arrO)"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.4s" repeatCount="indefinite"/></line>

          <line x1="644" y1="283" x2="678" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- DESALTER -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="680" y="246" width="148" height="74" rx="37" fill="url(#vesG)" stroke="#ffab40" stroke-width="2"/>
            <rect x="700" y="261" width="108" height="14" rx="3" fill="#a05a00" opacity="0.5"/>
            <rect x="700" y="282" width="108" height="14" rx="3" fill="#003366" opacity="0.5"/>
            <text x="754" y="272" text-anchor="middle" fill="rgba(255,200,0,0.55)" font-size="8">&#9889;&#9889;&#9889;</text>
            <text x="754" y="337" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700">DESALTER</text>
            <text x="754" y="350" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-oil">Electrostatic</text>
          </g>
          <!-- wash water -->
          <line x1="754" y1="320" x2="754" y2="455" stroke="url(#rivG)" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.65"><animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.4s" repeatCount="indefinite"/></line>
          <text x="768" y="390" fill="#00e676" font-size="8" opacity="0.7">Wash&#8597;</text>

          <line x1="828" y1="283" x2="860" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- DEHYDRATOR -->
          <g class="svg-node" onclick="switchTab('oil')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="862" y="246" width="155" height="74" rx="37" fill="url(#vesG)" stroke="#ffab40" stroke-width="2"/>
            <rect x="883" y="261" width="112" height="14" rx="3" fill="#a05a00" opacity="0.5"/>
            <rect x="883" y="282" width="112" height="14" rx="3" fill="#003366" opacity="0.4"/>
            <text x="939" y="272" text-anchor="middle" fill="rgba(255,200,0,0.55)" font-size="8">&#9889;&#9889;&#9889;</text>
            <text x="939" y="337" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700">DEHYDRATOR</text>
            <text x="939" y="350" text-anchor="middle" fill="#888"   font-size="8.5">Electrostatic</text>
          </g>
          <!-- PW down -->
          <line x1="939" y1="320" x2="939" y2="455" stroke="url(#watG)" stroke-width="2" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="952" y="390" fill="#29b6f6" font-size="8" opacity="0.7">PW ↓</text>

          <line x1="1017" y1="283" x2="1056" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL TANK -->
          <g class="svg-node" onclick="switchTab('storage')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="1058" y="234" width="80" height="106" rx="5" fill="url(#vesG)" stroke="#ffc107" stroke-width="2"/>
            <rect x="1066" y="276" width="64" height="57" rx="3" fill="#8b3a00" opacity="0.4"/>
            <ellipse cx="1098" cy="238" rx="36" ry="7" fill="none" stroke="#ffc107" stroke-width="1.5"/>
            <line x1="1058" y1="292" x2="1138" y2="292" stroke="#ffc107" stroke-width="1" opacity="0.5"/>
            <text x="1098" y="352" text-anchor="middle" fill="#ffc107" font-size="9.5" font-weight="700">CRUDE OIL</text>
            <text x="1098" y="365" text-anchor="middle" fill="#ffc107" font-size="9.5" font-weight="700">TANK</text>
            <text x="1098" y="378" text-anchor="middle" fill="#888"   font-size="8" id="sv-storage">On-Spec</text>
          </g>

          <!-- OFF-SPEC TANK -->
          <g class="svg-node" onclick="switchTab('storage')" style="cursor:pointer;">
            <rect x="1058" y="395" width="80" height="56" rx="5" fill="url(#vesG)" stroke="#ff9800" stroke-width="1.5"/>
            <rect x="1066" y="407" width="64" height="37" rx="3" fill="#6b3a00" opacity="0.4"/>
            <text x="1098" y="462" text-anchor="middle" fill="#ff9800" font-size="8.5" font-weight="700">OFF-SPEC</text>
            <text x="1098" y="474" text-anchor="middle" fill="#ff9800" font-size="8.5" font-weight="700">TANK</text>
          </g>

          <line x1="1138" y1="272" x2="1186" y2="272" stroke="url(#oilG)" stroke-width="2.8" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- EXPORT PUMPS + PIPELINE -->
          <g class="svg-node" onclick="switchTab('storage')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="1188" y="246" width="68" height="56" rx="6" fill="url(#vesG)" stroke="#00e676" stroke-width="1.8"/>
            <circle cx="1222" cy="266" r="13" fill="none" stroke="#00e676" stroke-width="1.8"/>
            <text x="1222" y="271" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">P</text>
            <text x="1222" y="315" text-anchor="middle" fill="#00e676" font-size="9" font-weight="700">EXPORT</text>
            <text x="1222" y="327" text-anchor="middle" fill="#00e676" font-size="9" font-weight="700">PUMPS</text>
          </g>
          <line x1="1222" y1="246" x2="1222" y2="202" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)"/>
          <rect x="1152" y="172" width="162" height="32" rx="5" fill="rgba(107,46,0,0.3)" stroke="#ffab40" stroke-width="1.5"/>
          <text x="1233" y="192" text-anchor="middle" fill="#ffab40" font-size="9.5" font-weight="700">CRUDE EXPORT PIPELINE &#8594;</text>
          <text x="1233" y="203" text-anchor="middle" fill="#888" font-size="7.5" id="sv-export">— bpd</text>

          <!-- Off-spec recycle -->
          <path d="M1138,423 L1164,423 L1164,374 L1098,374 L1098,340" fill="none" stroke="url(#oilG)" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.45" marker-end="url(#arrO)"/>

          <!-- ══════════════ ROW 3: WATER SYSTEM (Y~525) ══════════════ -->

          <!-- PW Collection Header -->
          <line x1="243" y1="493" x2="939" y2="493" stroke="url(#watG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="591" y="487" text-anchor="middle" fill="#29b6f6" font-size="8.5" font-weight="600" opacity="0.85">— Produced Water Collection Header —</text>

          <!-- PW drop lines -->
          <line x1="243" y1="455" x2="243" y2="493" stroke="url(#watG)" stroke-width="2" marker-end="url(#arrWdn)"/>
          <line x1="421" y1="455" x2="421" y2="493" stroke="url(#watG)" stroke-width="2" marker-end="url(#arrWdn)"/>
          <line x1="754" y1="455" x2="754" y2="493" stroke="url(#watG)" stroke-width="2" marker-end="url(#arrWdn)"/>
          <line x1="939" y1="455" x2="939" y2="493" stroke="url(#watG)" stroke-width="2" marker-end="url(#arrWdn)"/>

          <!-- WASH WATER RECIRC PUMPS -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="36" y="493" width="152" height="68" rx="7" fill="url(#vesG)" stroke="#00e676" stroke-width="1.8"/>
            <circle cx="70" cy="527" r="13" fill="none" stroke="#00e676" stroke-width="1.6"/>
            <text x="70" y="532" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">P</text>
            <text x="132" y="519" text-anchor="middle" fill="#00e676" font-size="9.5" font-weight="700">WASH WATER</text>
            <text x="132" y="532" text-anchor="middle" fill="#00e676" font-size="9.5" font-weight="700">RECIRC PUMPS</text>
            <text x="132" y="545" text-anchor="middle" fill="#888"  font-size="8">Desalter / Dehydrator</text>
          </g>
          <line x1="243" y1="493" x2="188" y2="493" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)"/>
          <path d="M188,527 L236,527 L236,464 L754,464 L754,455" fill="none" stroke="url(#rivG)" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.65" marker-end="url(#arrRup)"/>

          <!-- PW TRANSFER PUMPS -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="282" y="493" width="152" height="68" rx="7" fill="url(#vesG)" stroke="#29b6f6" stroke-width="1.8"/>
            <circle cx="316" cy="527" r="13" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <text x="316" y="532" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">P</text>
            <text x="378" y="519" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PW TRANSFER</text>
            <text x="378" y="532" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PUMPS</text>
            <text x="378" y="545" text-anchor="middle" fill="#888"   font-size="8">TDS 213,152 ppm</text>
          </g>
          <line x1="434" y1="527" x2="472" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW BUFFER TANK -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="474" y="485" width="72" height="90" rx="5" fill="url(#vesG)" stroke="#29b6f6" stroke-width="1.8"/>
            <rect x="482" y="519" width="56" height="49" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="474" y1="535" x2="546" y2="535" stroke="#29b6f6" stroke-width="1" opacity="0.5"/>
            <text x="510" y="585" text-anchor="middle" fill="#29b6f6" font-size="8.5" font-weight="700">PW BUFFER</text>
            <text x="510" y="597" text-anchor="middle" fill="#29b6f6" font-size="8.5" font-weight="700">TANK</text>
          </g>
          <line x1="546" y1="527" x2="576" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW TREATMENT PACKAGE -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="578" y="483" width="166" height="90" rx="7" fill="url(#vesG)" stroke="#29b6f6" stroke-width="2"/>
            <ellipse cx="620" cy="519" rx="21" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <ellipse cx="670" cy="519" rx="21" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <ellipse cx="718" cy="519" rx="14" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.3" opacity="0.6"/>
            <text x="660" y="553" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PW TREATMENT</text>
            <text x="660" y="566" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-water">&lt;40 ppm OiW</text>
          </g>
          <line x1="744" y1="527" x2="778" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- TREATED PW TANK -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="780" y="485" width="78" height="90" rx="5" fill="url(#vesG)" stroke="#00e676" stroke-width="1.8"/>
            <rect x="788" y="519" width="62" height="49" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="780" y1="535" x2="858" y2="535" stroke="#00e676" stroke-width="1" opacity="0.5"/>
            <text x="819" y="585" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700">TREATED</text>
            <text x="819" y="597" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700">PW TANK</text>
          </g>
          <line x1="858" y1="527" x2="892" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- WATER INJECTION PUMPS -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="894" y="493" width="162" height="70" rx="7" fill="url(#vesG)" stroke="#00e676" stroke-width="2.2"/>
            <circle cx="930" cy="528" r="16" fill="none" stroke="#00e676" stroke-width="2"/>
            <text x="930" y="534" text-anchor="middle" fill="#00e676" font-size="12" font-weight="800">P</text>
            <text x="1004" y="514" text-anchor="middle" fill="#00e676" font-size="9.5" font-weight="700">WATER INJ.</text>
            <text x="1004" y="528" text-anchor="middle" fill="#00e676" font-size="9.5" font-weight="700">PUMPS</text>
            <text x="1004" y="542" text-anchor="middle" fill="#888"   font-size="8">Zubair Reservoir</text>
          </g>
          <!-- injection -> wells -->
          <line x1="975" y1="493" x2="975" y2="444" stroke="url(#rivG)" stroke-width="2.5" marker-end="url(#arrRup)"/>
          <rect x="926" y="418" width="98" height="28" rx="5" fill="rgba(0,77,34,0.3)" stroke="#00e676" stroke-width="1.5"/>
          <text x="975" y="432" text-anchor="middle" fill="#00e676" font-size="9" font-weight="700">INJECTION WELLS</text>
          <text x="975" y="445" text-anchor="middle" fill="#888" font-size="7.5">Zubair Reservoir</text>

          <!-- WASH WATER TANK (River Water) -->
          <g class="svg-node" onclick="switchTab('water')" style="cursor:pointer;">
            <rect x="1098" y="493" width="90" height="70" rx="5" fill="url(#vesG)" stroke="#00e676" stroke-width="1.5"/>
            <rect x="1106" y="519" width="74" height="37" rx="3" fill="#003d20" opacity="0.6"/>
            <text x="1143" y="511" text-anchor="middle" fill="#00e676" font-size="9" font-weight="700">WASH WATER</text>
            <text x="1143" y="524" text-anchor="middle" fill="#00e676" font-size="9" font-weight="700">TANK</text>
            <text x="1143" y="537" text-anchor="middle" fill="#aaa"  font-size="8">+ River Water</text>
          </g>
          <line x1="1143" y1="468" x2="1143" y2="493" stroke="url(#rivG)" stroke-width="1.8" marker-end="url(#arrWdn)"/>
          <text x="1143" y="464" text-anchor="middle" fill="#00e676" font-size="8">River Water &#8595;</text>

          <!-- Legend -->
          <g transform="translate(36,610)">
            <rect width="12" height="6" rx="2" fill="#ffab40"/><text x="17" y="6.5" fill="#7a8aaa" font-size="8.5" data-i18n="svg_leg_oil">Oil Flow</text>
            <rect x="80"  width="12" height="6" rx="2" fill="#ff5252"/><text x="97"  y="6.5" fill="#7a8aaa" font-size="8.5" data-i18n="svg_leg_gas">Gas Flow</text>
            <rect x="162" width="12" height="6" rx="2" fill="#29b6f6"/><text x="179" y="6.5" fill="#7a8aaa" font-size="8.5" data-i18n="svg_leg_water">Produced Water</text>
            <rect x="284" width="12" height="6" rx="2" fill="#00e676"/><text x="301" y="6.5" fill="#7a8aaa" font-size="8.5" data-i18n="svg_leg_chem">Wash / River Water</text>
            <text x="440" y="6.5" fill="#7a8aaa" font-size="8.5">&#128433;&#65039; Click any block to open its calculator</text>
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

    <!-- ===== SEPARATOR DESIGN TAB ===== -->
    <div class="tab-panel" id="tab-sepdesign">
      <div class="panel-nav">
        <button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
        <button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
        <button class="save-btn" onclick="savePanel('tab-sepdesign')">💾 Save</button>
      </div>

      <!-- Header -->
      <div class="sd-header">
        <div class="sd-header-left">
          <div class="sd-header-icon">⚗️</div>
          <div>
            <div class="panel-title" style="margin-bottom:4px">Separator Design &amp; Sizing Tool</div>
            <p class="panel-desc" style="margin:0">API 12J &bull; ASME Section VIII &bull; GPSA &bull; J12 — Full engineering design, stage selection &amp; mechanical sizing</p>
          </div>
        </div>
        <div class="sd-std-badges">
          <span class="sd-std-badge" style="background:#e8f5e9;color:#2e7d32;border:1px solid #a5d6a7">📘 API 12J</span>
          <span class="sd-std-badge" style="background:#e3f2fd;color:#1565c0;border:1px solid #90caf9">🔩 ASME Sec VIII</span>
          <span class="sd-std-badge" style="background:#fce4ec;color:#880e4f;border:1px solid #f48fb1">📋 GPSA</span>
          <span class="sd-std-badge" style="background:#f3e5f5;color:#4a148c;border:1px solid #ce93d8">📐 J12</span>
        </div>
      </div>

      <!-- TOP SECTION: Configuration + Design Summary -->
      <div class="sd-top-grid">

        <!-- Col 1: Separator Type & Phase -->
        <div class="calc-card sd-config-card">
          <div class="card-head" style="background:linear-gradient(135deg,#0d47a1,#1565c0);color:#fff;border:none;margin:-22px -22px 18px">🔧 Separator Configuration</div>

          <div class="sd-type-selector">
            <label class="sd-type-opt" id="sdtype-H">
              <input type="radio" name="sd-type" id="sd-type" value="H" checked onchange="document.getElementById('sd-type').value=this.value">
              <div class="sd-type-card">
                <div class="sd-type-svg">
                  <svg viewBox="0 0 80 40" width="70" height="35"><rect x="2" y="8" width="76" height="24" rx="12" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><rect x="10" y="14" width="60" height="5" rx="2" fill="#c8860a" opacity="0.7"/><rect x="10" y="21" width="60" height="5" rx="2" fill="#4499cc" opacity="0.7"/><text x="40" y="5" text-anchor="middle" fill="#1565c0" font-size="6" font-weight="bold" font-family="Inter">GAS</text></svg>
                </div>
                <span class="sd-type-name">Horizontal</span>
                <span class="sd-type-sub">L = 3D to 5D</span>
              </div>
            </label>
            <label class="sd-type-opt" id="sdtype-V">
              <input type="radio" name="sd-type" value="V" onchange="document.getElementById('sd-type').value=this.value">
              <div class="sd-type-card">
                <div class="sd-type-svg">
                  <svg viewBox="0 0 40 80" width="35" height="70"><rect x="8" y="2" width="24" height="76" rx="12" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><rect x="10" y="4" width="20" height="28" rx="4" fill="#ffe566" opacity="0.7"/><rect x="10" y="34" width="20" height="22" rx="2" fill="#c8860a" opacity="0.8"/><rect x="10" y="58" width="20" height="18" rx="2" fill="#4499cc" opacity="0.8"/></svg>
                </div>
                <span class="sd-type-name">Vertical</span>
                <span class="sd-type-sub">H = 2D to 4D</span>
              </div>
            </label>
            <label class="sd-type-opt" id="sdtype-S">
              <input type="radio" name="sd-type" value="S" onchange="document.getElementById('sd-type').value=this.value">
              <div class="sd-type-card">
                <div class="sd-type-svg">
                  <svg viewBox="0 0 60 60" width="50" height="50"><circle cx="30" cy="30" r="26" fill="#fce4ec" stroke="#880e4f" stroke-width="2"/><ellipse cx="30" cy="38" rx="22" ry="12" fill="#c8860a" opacity="0.7"/><text x="30" y="22" text-anchor="middle" fill="#880e4f" font-size="7" font-weight="bold" font-family="Inter">GAS</text></svg>
                </div>
                <span class="sd-type-name">Spherical</span>
                <span class="sd-type-sub">Low capacity</span>
              </div>
            </label>
          </div>

          <div style="margin-top:18px">
            <label class="sd-field-label">Separation Phase</label>
            <select id="sd-phase" class="sd-select">
              <option value="3">3-Phase (Gas / Oil / Water)</option>
              <option value="2">2-Phase (Gas / Liquid)</option>
            </select>
          </div>

          <div style="margin-top:14px">
            <label class="sd-field-label">Shell Material</label>
            <select id="sd-material" class="sd-select" onchange="sdUpdateMaterial()">
              <option value="CS-A516-70">Carbon Steel — ASTM A516 Gr.70</option>
              <option value="SS-304">Stainless Steel — SS 304</option>
              <option value="SS-316">Stainless Steel — SS 316</option>
              <option value="CS-A106">Carbon Steel — ASTM A106</option>
              <option value="Duplex-2205">Duplex Stainless — 2205</option>
            </select>
          </div>
        </div>

        <!-- Col 2: Design Summary (populated by JS) -->
        <div class="calc-card sd-summary-card">
          <div class="card-head" style="background:linear-gradient(135deg,#1b5e20,#2e7d32);color:#fff;border:none;margin:-22px -22px 18px">📊 Design Recommendation</div>
          <div id="sd-summary"><div class="sd-placeholder">⚡ Enter parameters and click <strong>Calculate</strong> to see recommendations</div></div>
        </div>

      </div>

      <!-- MIDDLE SECTION: All Inputs -->
      <div class="sd-inputs-grid">

        <!-- Operating Conditions -->
        <div class="calc-card">
          <div class="card-head blue">⚙️ Operating Conditions</div>
          <div class="input-group">
            <label>Operating Pressure <input type="number" id="sd-P" value="150" step="5"> <span>psig</span></label>
            <label>Operating Temperature <input type="number" id="sd-T" value="120" step="1"> <span>°F</span></label>
            <label>Oil Flow Rate <input type="number" id="sd-Qo" value="25000" step="100"> <span>bpd</span></label>
            <label>Water Flow Rate <input type="number" id="sd-Qw" value="10000" step="100"> <span>bpd</span></label>
            <label>Gas Flow Rate <input type="number" id="sd-Qg" value="50" step="0.5"> <span>MMSCFD</span></label>
          </div>
        </div>

        <!-- Fluid Properties -->
        <div class="calc-card">
          <div class="card-head orange">🛢️ Fluid Properties</div>
          <div class="input-group">
            <label>Oil API Gravity <input type="number" id="sd-API" value="32" step="0.5"> <span>°API</span></label>
            <label>Gas Specific Gravity <input type="number" id="sd-SGg" value="0.75" step="0.01"> <span>—</span></label>
            <label>Oil Viscosity (μ) <input type="number" id="sd-muO" value="3.5" step="0.1"> <span>cp</span></label>
            <label>Droplet Diameter <input type="number" id="sd-dp" value="150" step="10"> <span>μm</span></label>
            <label>K Factor (Souders-Brown) <input type="number" id="sd-K" value="0.35" step="0.01"> <span>—</span></label>
          </div>
        </div>

        <!-- Retention Times -->
        <div class="calc-card">
          <div class="card-head purple">⏱️ Retention Times (API 12J)</div>
          <div class="input-group">
            <label>Oil Retention Time <input type="number" id="sd-tro" value="3" step="0.5"> <span>min</span></label>
            <label>Water Retention Time <input type="number" id="sd-trw" value="3" step="0.5"> <span>min</span></label>
          </div>
          <div class="sd-ref-box">
            <div class="sd-ref-title">📋 API 12J Reference Values</div>
            <div class="sd-ref-row"><span>Light crude (&gt;35° API)</span><span>1–2 min</span></div>
            <div class="sd-ref-row"><span>Medium crude (25–35°)</span><span>2–4 min</span></div>
            <div class="sd-ref-row"><span>Heavy crude (&lt;25° API)</span><span>5–10 min</span></div>
            <div class="sd-ref-row"><span>Water (clean)</span><span>3–5 min</span></div>
            <div class="sd-ref-row"><span>Water (emulsion)</span><span>5–15 min</span></div>
          </div>
        </div>

        <!-- ASME Mechanical -->
        <div class="calc-card">
          <div class="card-head" style="background:rgba(136,14,79,0.08);color:#880e4f;border-bottom:1px solid rgba(136,14,79,0.2)">🔩 ASME Section VIII — Mechanical</div>
          <div class="input-group">
            <label>Allowable Stress (S) <input type="number" id="sd-Sallow" value="17500" step="100"> <span>psi</span></label>
            <label>Weld Efficiency (E) <input type="number" id="sd-Je" value="1.0" step="0.05" min="0.6" max="1.0"> <span>—</span></label>
            <label>Corrosion Allowance <input type="number" id="sd-corr" value="0.125" step="0.0625"> <span>in</span></label>
          </div>
          <div class="sd-ref-box" style="margin-top:12px">
            <div class="sd-ref-title">🔩 Typical Allowable Stress (ASME)</div>
            <div class="sd-ref-row"><span>CS A516-70</span><span>17,500 psi</span></div>
            <div class="sd-ref-row"><span>SS 304/316</span><span>16,700 psi</span></div>
            <div class="sd-ref-row"><span>Duplex 2205</span><span>20,000 psi</span></div>
          </div>
        </div>

      </div>

      <!-- CALCULATE BUTTON -->
      <button class="sd-calc-btn" onclick="calcSeparatorDesign()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Calculate Separator Design
        <span style="font-size:11px;opacity:0.85;font-weight:400">(API 12J + ASME Sec VIII)</span>
      </button>

      <!-- RESULTS SECTION -->
      <div class="sd-results-grid">

        <!-- Fluid Results -->
        <div class="calc-card">
          <div class="card-head green">🧪 Fluid Properties</div>
          <div id="sd-fluid-results" class="results-grid"><div class="sd-placeholder">Run calculation first</div></div>
        </div>

        <!-- Gas Sizing -->
        <div class="calc-card">
          <div class="card-head blue">💨 Gas Sizing — Souders-Brown &amp; Stokes</div>
          <div id="sd-gas-results" class="results-grid"><div class="sd-placeholder">Run calculation first</div></div>
        </div>

        <!-- Vessel Dimensions -->
        <div class="calc-card">
          <div class="card-head orange">📐 Vessel Dimensions</div>
          <div id="sd-dim-results" class="results-grid"><div class="sd-placeholder">Run calculation first</div></div>
        </div>

        <!-- ASME Mechanical Results -->
        <div class="calc-card">
          <div class="card-head" style="background:rgba(136,14,79,0.08);color:#880e4f;border-bottom:1px solid rgba(136,14,79,0.2)">🔩 ASME Mechanical</div>
          <div id="sd-mech-results" class="results-grid"><div class="sd-placeholder">Run calculation first</div></div>
        </div>

        <!-- Nozzles & Safety -->
        <div class="calc-card">
          <div class="card-head" style="background:rgba(230,74,25,0.08);color:#bf360c;border-bottom:1px solid rgba(230,74,25,0.2)">🔧 Nozzles &amp; Safety (API 520)</div>
          <div id="sd-nozz-results" class="results-grid"><div class="sd-placeholder">Run calculation first</div></div>
        </div>

        <!-- Vessel Sketch -->
        <div class="calc-card sd-sketch-card">
          <div class="card-head" style="background:linear-gradient(135deg,#263238,#37474f);color:#eceff1;border:none;margin:-22px -22px 18px">🖼️ Vessel Cross-Section Sketch</div>
          <div id="sd-sketch" class="sd-sketch-box">
            <div class="sd-placeholder" style="padding:60px 20px">Run calculation to generate sketch</div>
          </div>
        </div>

      </div>

      <!-- STAGES COMPARISON CHART -->
      <div class="chart-box" style="margin-top:4px">
        <div class="chart-title">📊 Stage Count vs Separation Efficiency — API 12J</div>
        <canvas id="sd-stages-chart" style="max-height:300px"></canvas>
      </div>

      <!-- STANDARDS REFERENCE TABLE -->
      <div class="calc-card" style="margin-top:20px">
        <div class="card-head" style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff;border:none;margin:-22px -22px 18px">📚 Engineering Standards Reference</div>
        <div class="table-wrap" style="margin:0">
          <table class="dtable">
            <thead><tr><th style="text-align:left">Standard</th><th style="text-align:left">Scope</th><th>Key Parameter</th><th>Typical Range</th></tr></thead>
            <tbody>
              <tr><td style="color:#1565c0;font-weight:700">API 12J</td><td style="text-align:left">Oil/Gas Separator Design</td><td>Retention Time</td><td>1 – 15 min</td></tr>
              <tr><td style="color:#1565c0;font-weight:700">API 12J</td><td style="text-align:left">Souders-Brown Criterion</td><td>K Factor</td><td>0.12 – 0.50 ft/s</td></tr>
              <tr><td style="color:#2e7d32;font-weight:700">ASME Sec VIII Div 1</td><td style="text-align:left">Pressure Vessel Design</td><td>Shell Thickness</td><td>t = PD/(2SE-1.2P)+CA</td></tr>
              <tr><td style="color:#2e7d32;font-weight:700">ASME Sec VIII</td><td style="text-align:left">Weld Joint Efficiency</td><td>E Factor</td><td>0.70 – 1.00</td></tr>
              <tr><td style="color:#880e4f;font-weight:700">GPSA</td><td style="text-align:left">Gas Processing Sizing</td><td>Stokes' Law</td><td>dp &gt; 100 μm</td></tr>
              <tr><td style="color:#880e4f;font-weight:700">GPSA Sec 7</td><td style="text-align:left">Phase Envelope</td><td>L/D Ratio</td><td>2.5 – 5.0</td></tr>
              <tr><td style="color:#4a148c;font-weight:700">API 520/521</td><td style="text-align:left">Relief Valve Sizing</td><td>Fire Case Load</td><td>21,000 × F × A^0.82</td></tr>
              <tr><td style="color:#4a148c;font-weight:700">API 14E</td><td style="text-align:left">Nozzle Velocity</td><td>Gas Nozzle</td><td>&lt; 60 ft/s</td></tr>
              <tr><td style="color:#e65100;font-weight:700">API 14E</td><td style="text-align:left">Erosional Velocity</td><td>Liquid Nozzle</td><td>&lt; 3 ft/s</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <!-- ===== END SEPARATOR DESIGN TAB ===== -->

    <!-- ===== HAMMAR IPF PFD TAB ===== -->
    <div class="tab-panel" id="tab-hammar-pfd">
      <div class="panel-nav">
        <button class="nav-arrow" onclick="histBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
        <button class="nav-arrow" onclick="histFwd()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
        <button class="save-btn" onclick="savePanel('tab-hammar-pfd')">💾 Save</button>
      </div>
      <div class="panel-title">🗺️ Hammar IPF — Simplified Process Flow Diagram (PFD)</div>
      <p class="panel-desc">Figure 1 — Weatherford O&amp;M Manual Vol.1, Rev.00 &nbsp;|&nbsp; 🖱️ Click any equipment block to view full technical details</p>

      <!-- Legend Bar -->
      <div style="display:flex;gap:22px;flex-wrap:wrap;align-items:center;margin-bottom:14px;padding:10px 18px;background:rgba(0,0,0,0.2);border-radius:10px;border:1px solid rgba(255,255,255,0.07);">
        <span style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#ccc;font-weight:500;"><span style="width:32px;height:5px;background:linear-gradient(90deg,#8b3a00,#ffab40);border-radius:3px;display:inline-block;"></span>Crude / Oil</span>
        <span style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#ccc;font-weight:500;"><span style="width:32px;height:5px;background:linear-gradient(90deg,#7a0000,#ff5252);border-radius:3px;display:inline-block;"></span>Gas</span>
        <span style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#ccc;font-weight:500;"><span style="width:32px;height:5px;background:linear-gradient(90deg,#003366,#29b6f6);border-radius:3px;display:inline-block;"></span>Produced Water</span>
        <span style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#ccc;font-weight:500;"><span style="width:32px;height:5px;background:linear-gradient(90deg,#005c2e,#00e676);border-radius:3px;display:inline-block;"></span>Wash / River Water</span>
        <span style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#888;">🖱️ Click any block for details</span>
      </div>

      <!-- Main PFD — scrollable container -->
      <div style="width:100%;overflow-x:auto;overflow-y:auto;background:rgba(0,5,15,0.5);border-radius:12px;border:1px solid rgba(0,240,255,0.1);padding:8px;">
        <svg id="hammarPFD" viewBox="0 0 1600 950" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;min-width:1100px;display:block;font-family:'Inter',sans-serif;">
          <defs>
            <linearGradient id="pfd-oilG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8b3a00"/><stop offset="100%" stop-color="#ffab40"/></linearGradient>
            <linearGradient id="pfd-gasG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#7a0000"/><stop offset="100%" stop-color="#ff5252"/></linearGradient>
            <linearGradient id="pfd-watG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#003366"/><stop offset="100%" stop-color="#29b6f6"/></linearGradient>
            <linearGradient id="pfd-rivG"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#005c2e"/><stop offset="100%" stop-color="#00e676"/></linearGradient>
            <linearGradient id="pfd-eqBg"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e3048"/><stop offset="100%" stop-color="#0c1a28"/></linearGradient>
            <linearGradient id="pfd-zonGas" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(180,40,40,0.07)"/><stop offset="100%" stop-color="rgba(180,40,40,0)"/></linearGradient>
            <linearGradient id="pfd-zonOil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(200,120,0,0.06)"/><stop offset="100%" stop-color="rgba(200,120,0,0)"/></linearGradient>
            <linearGradient id="pfd-zonWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(0,100,200,0.07)"/><stop offset="100%" stop-color="rgba(0,100,200,0)"/></linearGradient>
            <filter id="pfd-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="pfd-shadow"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.6)"/></filter>
            <!-- Arrows -->
            <marker id="pfd-arrO" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#ffab40"/></marker>
            <marker id="pfd-arrG" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#ff5252"/></marker>
            <marker id="pfd-arrW" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#29b6f6"/></marker>
            <marker id="pfd-arrR" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6z" fill="#00e676"/></marker>
            <marker id="pfd-arrGdn" viewBox="0 0 6 10" refX="3" refY="9" markerWidth="6" markerHeight="8" orient="auto"><path d="M0,0 L3,10 L6,0z" fill="#ff5252"/></marker>
            <marker id="pfd-arrWdn" viewBox="0 0 6 10" refX="3" refY="9" markerWidth="6" markerHeight="8" orient="auto"><path d="M0,0 L3,10 L6,0z" fill="#29b6f6"/></marker>
            <marker id="pfd-arrRup" viewBox="0 0 6 10" refX="3" refY="1" markerWidth="6" markerHeight="8" orient="auto"><path d="M0,10 L3,0 L6,10z" fill="#00e676"/></marker>
          </defs>

          <!-- ░░░ BACKGROUND ░░░ -->
          <rect width="1600" height="950" fill="#060e1a" rx="12"/>
          <pattern id="pfd-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(0,200,255,0.025)" stroke-width="0.5"/>
          </pattern>
          <rect width="1600" height="950" fill="url(#pfd-grid)" rx="12"/>

          <!-- ░░░ ZONE BACKGROUNDS ░░░ -->
          <rect x="10" y="58"  width="1580" height="250" rx="8" fill="url(#pfd-zonGas)"  opacity="0.8"/>
          <rect x="10" y="318" width="1580" height="280" rx="8" fill="url(#pfd-zonOil)"  opacity="0.8"/>
          <rect x="10" y="608" width="1580" height="300" rx="8" fill="url(#pfd-zonWat)"  opacity="0.8"/>

          <!-- ░░░ ZONE DIVIDERS ░░░ -->
          <line x1="18" y1="310" x2="1582" y2="310" stroke="rgba(255,171,0,0.18)" stroke-width="1.2" stroke-dasharray="8,5"/>
          <line x1="18" y1="600" x2="1582" y2="600" stroke="rgba(0,150,255,0.18)" stroke-width="1.2" stroke-dasharray="8,5"/>

          <!-- ░░░ ZONE LABELS (vertical) ░░░ -->
          <rect x="10" y="58"  width="28" height="250" rx="4" fill="rgba(255,50,50,0.1)"/>
          <rect x="10" y="318" width="28" height="280" rx="4" fill="rgba(255,150,0,0.1)"/>
          <rect x="10" y="608" width="28" height="300" rx="4" fill="rgba(0,150,255,0.1)"/>
          <text x="24" y="200"  text-anchor="middle" fill="rgba(255,100,100,0.8)" font-size="11" font-weight="700" letter-spacing="3" transform="rotate(-90,24,200)">GAS TRAIN</text>
          <text x="24" y="465"  text-anchor="middle" fill="rgba(255,171,0,0.8)"  font-size="11" font-weight="700" letter-spacing="3" transform="rotate(-90,24,465)">OIL PROCESS</text>
          <text x="24" y="762"  text-anchor="middle" fill="rgba(41,182,246,0.8)" font-size="11" font-weight="700" letter-spacing="3" transform="rotate(-90,24,762)">WATER SYSTEM</text>

          <!-- ░░░ TITLE BAR ░░░ -->
          <rect x="10" y="10" width="1580" height="44" rx="7" fill="rgba(0,20,45,0.85)" stroke="rgba(0,240,255,0.25)" stroke-width="1.2"/>
          <text x="800" y="37" text-anchor="middle" fill="#00f0ff" font-size="15" font-weight="800" letter-spacing="2.5">HAMMAR IPF — SIMPLIFIED PROCESS FLOW DIAGRAM  (Figure 1 · Weatherford O&amp;M Vol.1 · Rev.00)</text>

          <!-- ======================================================
               ROW 1: GAS TRAIN  (Y centre = 175)
               Columns: 260 → 450 → 640 → 830 → 1020 → 1220 → 1470
               ====================================================== -->

          <!-- Flare / Fuel Gas header line -->
          <line x1="48"  y1="100" x2="1540" y2="100" stroke="rgba(255,82,82,0.2)" stroke-width="1" stroke-dasharray="6,6"/>
          <text x="55" y="96" fill="rgba(255,82,82,0.6)" font-size="10" font-weight="600">HP Fuel Gas Supply  /  HP Flare  /  LP Flare  /  LP Fuel Gas System</text>

          <!-- LP COMPRESSOR (x=210, y-centre=195) -->
          <g class="pfd-node" onclick="pfdShowDetail('lp-comp')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="210" y="120" width="140" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#ff5252" stroke-width="2"/>
            <polygon points="230,155 230,185 258,170" fill="none" stroke="#ff5252" stroke-width="2"/>
            <circle cx="285" cy="170" r="16" fill="none" stroke="#ff5252" stroke-width="1.8"/>
            <line x1="269" y1="170" x2="301" y2="170" stroke="#ff5252" stroke-width="1.2"/>
            <text x="280" y="228" text-anchor="middle" fill="#ff5252" font-size="11" font-weight="700">LP COMPRESSOR</text>
            <text x="280" y="242" text-anchor="middle" fill="#888" font-size="9.5">1st Stage Gas</text>
          </g>
          <!-- LP → Flare tap -->
          <line x1="280" y1="120" x2="280" y2="100" stroke="#ff5252" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>

          <!-- LP COMP → HP COMP -->
          <line x1="350" y1="165" x2="430" y2="165" stroke="url(#pfd-gasG)" stroke-width="3" marker-end="url(#pfd-arrG)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- HP COMPRESSOR (x=430, y-centre=195) -->
          <g class="pfd-node" onclick="pfdShowDetail('hp-comp')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="430" y="120" width="140" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#ff5252" stroke-width="2"/>
            <polygon points="450,155 450,185 478,170" fill="none" stroke="#ff5252" stroke-width="2"/>
            <circle cx="505" cy="170" r="16" fill="none" stroke="#ff5252" stroke-width="1.8"/>
            <line x1="489" y1="170" x2="521" y2="170" stroke="#ff5252" stroke-width="1.2"/>
            <text x="500" y="228" text-anchor="middle" fill="#ff5252" font-size="11" font-weight="700">HP COMPRESSOR</text>
            <text x="500" y="242" text-anchor="middle" fill="#888" font-size="9.5">2nd Stage Gas</text>
          </g>
          <!-- HP → Flare tap -->
          <line x1="500" y1="120" x2="500" y2="100" stroke="#ff5252" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>

          <!-- HP COMP → CRUDE/CRUDE EXCHANGER -->
          <line x1="570" y1="165" x2="650" y2="165" stroke="url(#pfd-gasG)" stroke-width="3" marker-end="url(#pfd-arrG)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- CRUDE/CRUDE EXCHANGER (x=650, y-centre=195) -->
          <g class="pfd-node" onclick="pfdShowDetail('exchanger')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="650" y="120" width="155" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#ffab40" stroke-width="2"/>
            <!-- HEX symbol -->
            <path d="M675,140 Q692,168 709,140" fill="none" stroke="#ffab40" stroke-width="2"/>
            <path d="M709,140 Q726,168 743,140" fill="none" stroke="#ffab40" stroke-width="2"/>
            <path d="M675,190 Q692,162 709,190" fill="none" stroke="#ffab40" stroke-width="1.5" opacity="0.5"/>
            <path d="M709,190 Q726,162 743,190" fill="none" stroke="#ffab40" stroke-width="1.5" opacity="0.5"/>
            <text x="727" y="228" text-anchor="middle" fill="#ffab40" font-size="11" font-weight="700">CRUDE / CRUDE</text>
            <text x="727" y="242" text-anchor="middle" fill="#ffab40" font-size="11" font-weight="700">EXCHANGER</text>
          </g>

          <!-- EXCHANGER → CRUDE OIL HEATER -->
          <line x1="805" y1="165" x2="885" y2="165" stroke="url(#pfd-gasG)" stroke-width="3" marker-end="url(#pfd-arrG)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL HEATER (x=885, y-centre=195) -->
          <g class="pfd-node" onclick="pfdShowDetail('heater')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="885" y="120" width="145" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#ff9800" stroke-width="2"/>
            <!-- flame -->
            <path d="M928,195 Q928,168 940,155 Q940,178 952,165 Q952,195 928,195" fill="none" stroke="#ff9800" stroke-width="2.2"/>
            <path d="M935,190 Q935,175 942,165" fill="none" stroke="#ffcc02" stroke-width="1.5" opacity="0.7"/>
            <text x="957" y="228" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="700">CRUDE OIL</text>
            <text x="957" y="242" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="700">HEATER</text>
          </g>
          <!-- Heater → Flare tap -->
          <line x1="957" y1="120" x2="957" y2="100" stroke="#ff9800" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.6"/>

          <!-- HEATER → GAS EXPORT -->
          <line x1="1030" y1="165" x2="1120" y2="165" stroke="url(#pfd-gasG)" stroke-width="3.5" marker-end="url(#pfd-arrG)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- GAS EXPORT PIPELINE (x=1120, y-centre=195) -->
          <g class="pfd-node" onclick="pfdShowDetail('gas-export')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1120" y="110" width="180" height="110" rx="8" fill="url(#pfd-eqBg)" stroke="#ff5252" stroke-width="2.5"/>
            <text x="1210" y="152" text-anchor="middle" fill="#ff5252" font-size="13" font-weight="800">GAS EXPORT</text>
            <text x="1210" y="170" text-anchor="middle" fill="#ff5252" font-size="13" font-weight="800">PIPELINE</text>
            <text x="1210" y="192" text-anchor="middle" fill="#aaa"  font-size="10">136.8 MMSCFD</text>
            <text x="1210" y="206" text-anchor="middle" fill="#aaa"  font-size="10">Sweet — No H₂S</text>
          </g>
          <!-- Gas export exit arrow -->
          <line x1="1300" y1="165" x2="1360" y2="165" stroke="url(#pfd-gasG)" stroke-width="3.5" marker-end="url(#pfd-arrG)"/>
          <line x1="1360" y1="140" x2="1360" y2="200" stroke="#ff5252" stroke-width="4" opacity="0.9"/>
          <text x="1380" y="158" fill="#ff5252" font-size="10.5" font-weight="700">EXPORT →</text>

          <!-- From Condensate Collection Header (dashed input from top-right) -->
          <line x1="1210" y1="110" x2="1210" y2="80" stroke="#ff5252" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.6"/>
          <text x="1210" y="75" text-anchor="middle" fill="rgba(255,82,82,0.7)" font-size="9">From Condensate Header</text>

          <!-- ======================================================
               ROW 2: OIL PROCESS  (Y centre = 450)
               ====================================================== -->

          <!-- PRODUCTION FLUIDS INLET (x=48, y-centre=450) -->
          <g class="pfd-node" onclick="pfdShowDetail('inlet')" style="cursor:pointer;" filter="url(#pfd-glow)">
            <rect x="48" y="390" width="130" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#ffab40" stroke-width="2.2"/>
            <text x="113" y="422" text-anchor="middle" fill="#ffab40" font-size="12" font-weight="800">PRODUCTION</text>
            <text x="113" y="438" text-anchor="middle" fill="#ffab40" font-size="12" font-weight="800">FLUIDS</text>
            <text x="113" y="454" text-anchor="middle" fill="#aaa"  font-size="10">from DGS Wells</text>
            <text x="113" y="470" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700">▶ 129,307 bpd</text>
          </g>

          <!-- INLET → 1ST SEP -->
          <line x1="178" y1="435" x2="218" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 1ST STAGE SEPARATOR (ellipse, x=218..388, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('sep1')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="218" y="385" width="170" height="100" rx="50" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2.5"/>
            <rect x="240" y="403" width="126" height="18" rx="4" fill="#a05a00" opacity="0.5"/>
            <rect x="240" y="428" width="126" height="18" rx="4" fill="#003366" opacity="0.5"/>
            <line x1="235" y1="423" x2="381" y2="423" stroke="rgba(0,240,255,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="303" y="505" text-anchor="middle" fill="#00e676" font-size="12" font-weight="700">1st STAGE SEP.</text>
            <text x="303" y="520" text-anchor="middle" fill="#aaa"   font-size="10">15.2 – 36.6 barg</text>
          </g>

          <!-- 1ST SEP gas up to LP COMP row -->
          <line x1="303" y1="385" x2="303" y2="260" stroke="url(#pfd-gasG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="303" y1="260" x2="280" y2="210" stroke="url(#pfd-gasG)" stroke-width="2.5" marker-end="url(#pfd-arrG)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <text x="315" y="325" fill="#ff5252" font-size="9.5" opacity="0.8">Gas ↑</text>

          <!-- 1ST SEP → 2ND SEP oil -->
          <line x1="388" y1="435" x2="438" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 1ST SEP water down -->
          <line x1="303" y1="485" x2="303" y2="630" stroke="url(#pfd-watG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="315" y="560" fill="#29b6f6" font-size="9.5" opacity="0.8">PW ↓</text>

          <!-- 2ND STAGE SEPARATOR (x=438..608, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('sep2')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="438" y="385" width="170" height="100" rx="50" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2.5"/>
            <rect x="460" y="403" width="126" height="18" rx="4" fill="#a05a00" opacity="0.5"/>
            <rect x="460" y="428" width="126" height="18" rx="4" fill="#003366" opacity="0.5"/>
            <line x1="455" y1="423" x2="601" y2="423" stroke="rgba(0,240,255,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="523" y="505" text-anchor="middle" fill="#00e676" font-size="12" font-weight="700">2nd STAGE SEP.</text>
            <text x="523" y="520" text-anchor="middle" fill="#aaa"   font-size="10">LP Stage</text>
          </g>

          <!-- 2ND SEP gas up to LP COMP row -->
          <line x1="523" y1="385" x2="523" y2="260" stroke="url(#pfd-gasG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <line x1="523" y1="260" x2="500" y2="210" stroke="url(#pfd-gasG)" stroke-width="2.5" marker-end="url(#pfd-arrG)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="0.9s" repeatCount="indefinite"/></line>
          <text x="535" y="325" fill="#ff5252" font-size="9.5" opacity="0.8">Gas ↑</text>

          <!-- 2ND SEP → RUN DOWN COOLER -->
          <line x1="608" y1="435" x2="658" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 2ND SEP water down -->
          <line x1="523" y1="485" x2="523" y2="630" stroke="url(#pfd-watG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="535" y="560" fill="#29b6f6" font-size="9.5" opacity="0.8">PW ↓</text>

          <!-- CHARGE PUMPS (below 2nd Sep, above water zone) -->
          <g class="pfd-node" onclick="pfdShowDetail('charge-pumps')" style="cursor:pointer;">
            <rect x="453" y="540" width="110" height="52" rx="6" fill="url(#pfd-eqBg)" stroke="#ffab40" stroke-width="1.5"/>
            <circle cx="478" cy="566" r="13" fill="none" stroke="#ffab40" stroke-width="1.5"/>
            <text x="478" y="571" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700">P</text>
            <text x="530" y="562" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700">CHARGE</text>
            <text x="530" y="575" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="700">PUMPS</text>
          </g>

          <!-- RUN DOWN COOLER (x=658..808, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('run-down-cooler')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="658" y="390" width="155" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#29b6f6" stroke-width="2"/>
            <!-- cooler waves -->
            <path d="M678,418 Q700,440 722,418" fill="none" stroke="#29b6f6" stroke-width="2"/>
            <path d="M722,418 Q744,440 766,418" fill="none" stroke="#29b6f6" stroke-width="2"/>
            <path d="M678,445 Q700,423 722,445" fill="none" stroke="#29b6f6" stroke-width="1.4" opacity="0.5"/>
            <path d="M722,445 Q744,423 766,445" fill="none" stroke="#29b6f6" stroke-width="1.4" opacity="0.5"/>
            <text x="735" y="503" text-anchor="middle" fill="#29b6f6" font-size="12" font-weight="700">RUN DOWN</text>
            <text x="735" y="518" text-anchor="middle" fill="#29b6f6" font-size="12" font-weight="700">COOLER</text>
          </g>
          <!-- hot crude to exchanger (dashed upward) -->
          <line x1="735" y1="390" x2="735" y2="300" stroke="url(#pfd-oilG)" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.55"><animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.3s" repeatCount="indefinite"/></line>
          <line x1="735" y1="300" x2="727" y2="210" stroke="url(#pfd-oilG)" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.55" marker-end="url(#pfd-arrO)"><animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.3s" repeatCount="indefinite"/></line>
          <text x="750" y="350" fill="rgba(255,171,0,0.5)" font-size="9">Hot crude→HEX</text>

          <!-- RUN DOWN COOLER → DESALTER -->
          <line x1="813" y1="435" x2="863" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- DESALTER (x=863..1043, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('desalter')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="863" y="385" width="180" height="100" rx="50" fill="url(#pfd-eqBg)" stroke="#ffab40" stroke-width="2.5"/>
            <rect x="887" y="403" width="132" height="18" rx="4" fill="#a05a00" opacity="0.5"/>
            <rect x="887" y="428" width="132" height="18" rx="4" fill="#003366" opacity="0.5"/>
            <line x1="882" y1="423" x2="1040" y2="423" stroke="rgba(0,240,255,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
            <!-- electrostatic symbol -->
            <text x="953" y="418" text-anchor="middle" fill="rgba(255,200,0,0.6)" font-size="9">⚡ ⚡ ⚡</text>
            <text x="953" y="505" text-anchor="middle" fill="#ffab40" font-size="12" font-weight="700">DESALTER</text>
            <text x="953" y="520" text-anchor="middle" fill="#aaa"   font-size="10">Electrostatic</text>
          </g>

          <!-- Wash water into Desalter (from bottom) -->
          <line x1="953" y1="485" x2="953" y2="630" stroke="url(#pfd-rivG)" stroke-width="2" stroke-dasharray="6,4" opacity="0.7"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.4s" repeatCount="indefinite"/></line>
          <text x="965" y="548" fill="#00e676" font-size="9.5" opacity="0.7">Wash↕</text>

          <!-- DESALTER → DEHYDRATOR -->
          <line x1="1043" y1="435" x2="1093" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- DEHYDRATOR (x=1093..1283, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('dehydrator')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1093" y="385" width="190" height="100" rx="50" fill="url(#pfd-eqBg)" stroke="#ffab40" stroke-width="2.5"/>
            <rect x="1117" y="403" width="142" height="18" rx="4" fill="#a05a00" opacity="0.5"/>
            <rect x="1117" y="428" width="142" height="18" rx="4" fill="#003366" opacity="0.4"/>
            <line x1="1112" y1="423" x2="1280" y2="423" stroke="rgba(0,240,255,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="1188" y="418" text-anchor="middle" fill="rgba(255,200,0,0.6)" font-size="9">⚡ ⚡ ⚡</text>
            <text x="1188" y="505" text-anchor="middle" fill="#ffab40" font-size="12" font-weight="700">DEHYDRATOR</text>
            <text x="1188" y="520" text-anchor="middle" fill="#aaa"   font-size="10">Electrostatic</text>
          </g>

          <!-- Dehydrator water down -->
          <line x1="1188" y1="485" x2="1188" y2="630" stroke="url(#pfd-watG)" stroke-width="2.5" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="1200" y="558" fill="#29b6f6" font-size="9.5" opacity="0.8">PW ↓</text>

          <!-- DEHYDRATOR → CRUDE OIL TANK -->
          <line x1="1283" y1="435" x2="1353" y2="435" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)" stroke-dasharray="9,4"><animate attributeName="stroke-dashoffset" from="13" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL TANK (x=1355, y-centre=435) -->
          <g class="pfd-node" onclick="pfdShowDetail('crude-tank')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1355" y="368" width="100" height="130" rx="6" fill="url(#pfd-eqBg)" stroke="#ffc107" stroke-width="2.2"/>
            <!-- tank fill -->
            <rect x="1364" y="418" width="82" height="72" rx="3" fill="#8b3a00" opacity="0.4"/>
            <line x1="1355" y1="440" x2="1455" y2="440" stroke="#ffc107" stroke-width="1.2" opacity="0.6"/>
            <!-- floating roof symbol -->
            <ellipse cx="1405" cy="372" rx="46" ry="8" fill="none" stroke="#ffc107" stroke-width="1.5"/>
            <text x="1405" y="516" text-anchor="middle" fill="#ffc107" font-size="12" font-weight="700">CRUDE OIL</text>
            <text x="1405" y="530" text-anchor="middle" fill="#ffc107" font-size="12" font-weight="700">TANK</text>
            <text x="1405" y="544" text-anchor="middle" fill="#aaa"  font-size="10">On-Spec</text>
          </g>

          <!-- OFF-SPEC CRUDE TANK (below main tank) -->
          <g class="pfd-node" onclick="pfdShowDetail('offspec-tank')" style="cursor:pointer;">
            <rect x="1355" y="560" width="100" height="82" rx="6" fill="url(#pfd-eqBg)" stroke="#ff9800" stroke-width="1.8"/>
            <rect x="1364" y="578" width="82" height="56" rx="3" fill="#6b3a00" opacity="0.4"/>
            <text x="1405" y="658" text-anchor="middle" fill="#ff9800" font-size="10.5" font-weight="700">OFF-SPEC</text>
            <text x="1405" y="671" text-anchor="middle" fill="#ff9800" font-size="10.5" font-weight="700">CRUDE TANK</text>
          </g>

          <!-- Crude Tank → Crude Export Pumps -->
          <line x1="1455" y1="420" x2="1505" y2="420" stroke="url(#pfd-oilG)" stroke-width="3" marker-end="url(#pfd-arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL EXPORT PUMPS -->
          <g class="pfd-node" onclick="pfdShowDetail('crude-export-pumps')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1507" y="390" width="82" height="64" rx="6" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2"/>
            <circle cx="1548" cy="415" r="16" fill="none" stroke="#00e676" stroke-width="1.8"/>
            <text x="1548" y="420" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">P</text>
            <text x="1548" y="470" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700">EXPORT</text>
            <text x="1548" y="483" text-anchor="middle" fill="#00e676" font-size="10" font-weight="700">PUMPS</text>
          </g>
          <!-- Export pumps → pipeline (vertical end bar) -->
          <line x1="1548" y1="390" x2="1548" y2="340" stroke="url(#pfd-oilG)" stroke-width="3.5" marker-end="url(#pfd-arrO)"/>
          <rect x="1530" y="310" width="120" height="34" rx="5" fill="rgba(139,58,0,0.3)" stroke="#ffab40" stroke-width="1.5"/>
          <text x="1590" y="332" text-anchor="middle" fill="#ffab40" font-size="10.5" font-weight="700">CRUDE EXPORT PIPELINE →</text>

          <!-- Off-spec pumps -->
          <g class="pfd-node" onclick="pfdShowDetail('offspec-pumps')" style="cursor:pointer;">
            <rect x="1507" y="565" width="82" height="58" rx="6" fill="url(#pfd-eqBg)" stroke="#ff9800" stroke-width="1.5"/>
            <circle cx="1548" cy="590" r="13" fill="none" stroke="#ff9800" stroke-width="1.5"/>
            <text x="1548" y="595" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="700">P</text>
            <text x="1548" y="635" text-anchor="middle" fill="#ff9800" font-size="9.5" font-weight="700">OFF-SPEC</text>
            <text x="1548" y="648" text-anchor="middle" fill="#ff9800" font-size="9.5" font-weight="700">TRANSFER</text>
          </g>
          <line x1="1455" y1="595" x2="1505" y2="595" stroke="url(#pfd-oilG)" stroke-width="2" marker-end="url(#pfd-arrO)" stroke-dasharray="6,4"><animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.3s" repeatCount="indefinite"/></line>
          <!-- Off-spec recycle back -->
          <path d="M1548,565 L1548,500 L1405,500 L1405,500" fill="none" stroke="url(#pfd-oilG)" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.6" marker-end="url(#pfd-arrO)"/>

          <!-- ======================================================
               ROW 3: WATER SYSTEM  (Y centre = 760)
               Columns: 240 → 450 → 660 → 870 → 1080 → 1290 → 1480
               ====================================================== -->

          <!-- Produced Water Header (horizontal collector) -->
          <line x1="303" y1="680" x2="1188" y2="680" stroke="url(#pfd-watG)" stroke-width="3" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite"/></line>
          <text x="745" y="672" text-anchor="middle" fill="#29b6f6" font-size="10" font-weight="600" opacity="0.9">— Produced Water Collection Header —</text>

          <!-- Water drop-ins from separators / dehydrator -->
          <line x1="303"  y1="630" x2="303"  y2="680" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>
          <line x1="523"  y1="630" x2="523"  y2="680" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>
          <line x1="953"  y1="630" x2="953"  y2="680" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>
          <line x1="1188" y1="630" x2="1188" y2="680" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>

          <!-- WASH WATER RECIRC PUMPS (x=240, y=720) -->
          <g class="pfd-node" onclick="pfdShowDetail('wash-recirc')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="200" y="710" width="175" height="80" rx="8" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2"/>
            <circle cx="233" cy="750" r="16" fill="none" stroke="#00e676" stroke-width="1.8"/>
            <text x="233" y="756" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">P</text>
            <text x="310" y="742" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">WASH WATER</text>
            <text x="310" y="757" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">RECIRC. PUMPS</text>
            <text x="310" y="771" text-anchor="middle" fill="#aaa"  font-size="9.5">→ Desalter / Dehydrator</text>
          </g>
          <!-- Header → Wash Recirc Pumps -->
          <line x1="303" y1="680" x2="303" y2="710" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>
          <!-- Wash Recirc → Desalter (recycle up) -->
          <path d="M375,750 L420,750 L420,650 L953,650 L953,600" fill="none" stroke="url(#pfd-rivG)" stroke-width="2" stroke-dasharray="6,4" opacity="0.7" marker-end="url(#pfd-arrRup)"/>

          <!-- PW TRANSFER PUMPS (x=460, y=720) -->
          <g class="pfd-node" onclick="pfdShowDetail('pw-transfer')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="435" y="710" width="170" height="80" rx="8" fill="url(#pfd-eqBg)" stroke="#29b6f6" stroke-width="2"/>
            <circle cx="468" cy="750" r="16" fill="none" stroke="#29b6f6" stroke-width="1.8"/>
            <text x="468" y="756" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">P</text>
            <text x="540" y="742" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">PW TRANSFER</text>
            <text x="540" y="757" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">PUMPS</text>
            <text x="540" y="771" text-anchor="middle" fill="#aaa"   font-size="9.5">TDS 213,152 ppm</text>
          </g>
          <line x1="520" y1="680" x2="520" y2="710" stroke="url(#pfd-watG)" stroke-width="2.5" marker-end="url(#pfd-arrWdn)"/>

          <!-- PW TRANSFER → PW BUFFER TANK -->
          <line x1="605" y1="750" x2="665" y2="750" stroke="url(#pfd-watG)" stroke-width="3" marker-end="url(#pfd-arrW)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW BUFFER TANK (x=665, y=710) -->
          <g class="pfd-node" onclick="pfdShowDetail('pw-buffer')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="665" y="700" width="100" height="110" rx="6" fill="url(#pfd-eqBg)" stroke="#29b6f6" stroke-width="2.2"/>
            <rect x="674" y="742" width="82" height="60" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="665" y1="760" x2="765" y2="760" stroke="#29b6f6" stroke-width="1" opacity="0.5"/>
            <text x="715" y="825" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">PW BUFFER</text>
            <text x="715" y="840" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">TANK</text>
          </g>

          <!-- PW BUFFER → PW TREATMENT PACKAGE -->
          <line x1="765" y1="750" x2="825" y2="750" stroke="url(#pfd-watG)" stroke-width="3" marker-end="url(#pfd-arrW)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW TREATMENT PACKAGE (x=825, y=710) -->
          <g class="pfd-node" onclick="pfdShowDetail('pw-treatment')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="825" y="700" width="195" height="110" rx="8" fill="url(#pfd-eqBg)" stroke="#29b6f6" stroke-width="2.5"/>
            <!-- hydrocyclone symbols -->
            <ellipse cx="875" cy="745" rx="26" ry="20" fill="none" stroke="#29b6f6" stroke-width="1.8"/>
            <ellipse cx="938" cy="745" rx="26" ry="20" fill="none" stroke="#29b6f6" stroke-width="1.8"/>
            <ellipse cx="1001" cy="745" rx="17" ry="20" fill="none" stroke="#29b6f6" stroke-width="1.5" opacity="0.6"/>
            <text x="922" y="790" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">PW TREATMENT</text>
            <text x="922" y="804" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">PACKAGE</text>
            <text x="922" y="820" text-anchor="middle" fill="#aaa"   font-size="9.5">&lt;40 ppm OiW outlet</text>
          </g>

          <!-- PW TREATMENT → TREATED PW TANK -->
          <line x1="1020" y1="750" x2="1078" y2="750" stroke="url(#pfd-watG)" stroke-width="3" marker-end="url(#pfd-arrW)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- TREATED PW TANK (x=1080, y=710) -->
          <g class="pfd-node" onclick="pfdShowDetail('treated-pw-tank')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1080" y="700" width="105" height="110" rx="6" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2.2"/>
            <rect x="1090" y="742" width="85" height="60" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="1080" y1="760" x2="1185" y2="760" stroke="#00e676" stroke-width="1" opacity="0.5"/>
            <text x="1132" y="825" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">TREATED PW</text>
            <text x="1132" y="840" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">TANK</text>
          </g>

          <!-- TREATED PW TANK → WATER INJECTION PUMPS -->
          <line x1="1185" y1="750" x2="1248" y2="750" stroke="url(#pfd-watG)" stroke-width="3" marker-end="url(#pfd-arrW)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- WATER INJECTION PUMPS (x=1250, y=715) -->
          <g class="pfd-node" onclick="pfdShowDetail('water-injection')" style="cursor:pointer;" filter="url(#pfd-shadow)">
            <rect x="1250" y="705" width="190" height="90" rx="8" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="2.5"/>
            <circle cx="1290" cy="750" r="20" fill="none" stroke="#00e676" stroke-width="2"/>
            <text x="1290" y="756" text-anchor="middle" fill="#00e676" font-size="13" font-weight="800">P</text>
            <text x="1375" y="742" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">WATER</text>
            <text x="1375" y="757" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">INJECTION</text>
            <text x="1375" y="772" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">PUMPS</text>
          </g>

          <!-- INJECTION PUMPS → WELLS (vertical up) -->
          <line x1="1345" y1="705" x2="1345" y2="650" stroke="url(#pfd-rivG)" stroke-width="3" marker-end="url(#pfd-arrRup)"/>
          <!-- Injection Wells block -->
          <rect x="1282" y="608" width="125" height="44" rx="6" fill="rgba(0,92,46,0.3)" stroke="#00e676" stroke-width="1.8"/>
          <text x="1345" y="627" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">INJECTION WELLS</text>
          <text x="1345" y="643" text-anchor="middle" fill="#aaa"   font-size="9.5">→ Zubair Reservoir</text>

          <!-- WASH WATER TANK + River Water (far right, water zone) -->
          <g class="pfd-node" onclick="pfdShowDetail('wash-recirc')" style="cursor:pointer;">
            <rect x="1470" y="705" width="110" height="90" rx="6" fill="url(#pfd-eqBg)" stroke="#00e676" stroke-width="1.8"/>
            <rect x="1480" y="740" width="90" height="48" rx="3" fill="#003d20" opacity="0.6"/>
            <text x="1525" y="730" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">WASH WATER</text>
            <text x="1525" y="745" text-anchor="middle" fill="#00e676" font-size="11" font-weight="700">TANK</text>
            <text x="1525" y="760" text-anchor="middle" fill="#aaa"  font-size="9.5">+ River Water</text>
          </g>
          <!-- River water arrow in -->
          <line x1="1525" y1="680" x2="1525" y2="705" stroke="url(#pfd-rivG)" stroke-width="2" marker-end="url(#pfd-arrWdn)"/>
          <text x="1525" y="675" text-anchor="middle" fill="#00e676" font-size="9.5">River Water ↓</text>
          <!-- Wash water → Injection pumps -->
          <line x1="1470" y1="750" x2="1440" y2="750" stroke="url(#pfd-rivG)" stroke-width="2" stroke-dasharray="5,4" opacity="0.7" marker-end="url(#pfd-arrR)"/>

          <!-- ░░░ BOTTOM SOURCE LABELS ░░░ -->
          <text x="113"  y="930" text-anchor="middle" fill="rgba(255,171,64,0.5)" font-size="9.5">LP Fuel Gas System</text>
          <line x1="113" y1="900" x2="113" y2="920" stroke="rgba(255,171,64,0.3)" stroke-width="1"/>

        </svg>
      </div>

      <!-- Quick Reference Cards (preserved, now in 4-col grid) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:22px;">

        <div class="calc-card" style="border-left:4px solid #00e676;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('sep1')">
          <div style="font-size:13px;color:#00e676;font-weight:800;margin-bottom:10px;">🔵 Separation Stage</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">1st Stage:</b> 15.2–36.6 barg | 50–77°C<br>
            <b style="color:#aaa;">2nd Stage:</b> LP flash stage<br>
            <b style="color:#aaa;">GOR:</b> 893 SCF/STOB<br>
            <b style="color:#aaa;">Design Life:</b> 25 years | 3 trains active
          </div>
        </div>

        <div class="calc-card" style="border-left:4px solid #ff5252;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('hp-comp')">
          <div style="font-size:13px;color:#ff5252;font-weight:800;margin-bottom:10px;">⚙️ Gas Compression Train</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">LP → HP Compressor → HEX → Heater</b><br>
            <b style="color:#aaa;">Total Gas:</b> 136.8 MMSCFD<br>
            <b style="color:#aaa;">Quality:</b> Sweet (No H₂S detected)<br>
            <b style="color:#aaa;">CH₄:</b> 39.83 mol% | CO₂: 0.87 mol%
          </div>
        </div>

        <div class="calc-card" style="border-left:4px solid #ffab40;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('desalter')">
          <div style="font-size:13px;color:#ffab40;font-weight:800;margin-bottom:10px;">🧪 Oil Treatment Train</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">Run Down Cooler → Desalter → Dehydrator</b><br>
            <b style="color:#aaa;">Crude Mix:</b> Mishrif 46% · 3rd Pay 45.3% · 4th Pay 8.7%<br>
            <b style="color:#aaa;">MW:</b> 104.51 g/mol<br>
            <b style="color:#aaa;">Export Spec:</b> BS&amp;W &lt;0.5% | Salt &lt;10 PTB
          </div>
        </div>

        <div class="calc-card" style="border-left:4px solid #29b6f6;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('pw-treatment')">
          <div style="font-size:13px;color:#29b6f6;font-weight:800;margin-bottom:10px;">💧 Water System</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">PW Transfer → Buffer → Treatment → Injection</b><br>
            <b style="color:#aaa;">TDS:</b> 213,152 ppm | pH 5.05 | SG 1.1354<br>
            <b style="color:#aaa;">Cl⁻:</b> 131,989 ppm | Na⁺: 58,677 ppm<br>
            <b style="color:#aaa;">Treated OiW:</b> &lt;40 ppm → Reservoir Injection
          </div>
        </div>

        <div class="calc-card" style="border-left:4px solid #ffc107;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('crude-tank')">
          <div style="font-size:13px;color:#ffc107;font-weight:800;margin-bottom:10px;">🛢️ Storage &amp; Export</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">On-Spec Tank → Export Pumps → Pipeline</b><br>
            <b style="color:#aaa;">Off-Spec Tank → Transfer Pumps → Re-treat</b><br>
            <b style="color:#aaa;">Export:</b> Crude Oil Export Pipeline<br>
            <b style="color:#aaa;">Standard:</b> API-650 | API-2000 | NFPA-30
          </div>
        </div>

        <div class="calc-card" style="border-left:4px solid #ff9800;cursor:pointer;padding:18px 20px;" onclick="pfdShowDetail('inlet')">
          <div style="font-size:13px;color:#ff9800;font-weight:800;margin-bottom:10px;">📋 Fluid Properties</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.85;">
            <b style="color:#aaa;">Reservoirs:</b> Mishrif (Carbonate) + 3rd & 4th Pay (Sandstone)<br>
            <b style="color:#aaa;">Viscosity at 15.6°C:</b> 16–33 cSt<br>
            <b style="color:#aaa;">Sweet crude</b> — H₂S = 0 ppm<br>
            <b style="color:#aaa;">Inlet P:</b> 15.2–36.6 barg | T: 50–77°C
          </div>
        </div>

      </div>

      <!-- Equipment Detail Modal -->
      <div id="pfdModal" style="display:none;position:fixed;inset:0;background:rgba(0,5,20,0.85);z-index:9999;align-items:center;justify-content:center;backdrop-filter:blur(6px);">
        <div id="pfdModalBox" style="background:linear-gradient(145deg,#0e1e30,#1a2e45);border:1px solid rgba(0,240,255,0.3);border-radius:16px;max-width:660px;width:92%;max-height:82vh;overflow-y:auto;padding:32px 30px;position:relative;box-shadow:0 8px 60px rgba(0,0,0,0.7),0 0 40px rgba(0,240,255,0.08);">
          <button onclick="pfdCloseModal()" style="position:absolute;top:16px;right:18px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#ccc;font-size:18px;cursor:pointer;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,50,50,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">✕</button>
          <div id="pfdModalContent"></div>
        </div>
      </div>

    </div>
    <!-- ===== END HAMMAR IPF PFD TAB ===== -->

  </main>

  <!-- ALARMS PANEL MOVED TO HEADER -->

</div>

<!-- Developer & Project Info Modal -->
<div id="devModal" style="display:none;position:fixed;inset:0;background:rgba(0,5,20,0.85);z-index:10000;align-items:center;justify-content:center;backdrop-filter:blur(8px);">
  <div id="devModalBox" style="background:linear-gradient(145deg,#070f1a,#101e30);border:2px solid rgba(0,240,255,0.3);border-radius:24px;max-width:540px;width:90%;max-height:85vh;overflow-y:auto;padding:36px;position:relative;box-shadow:0 15px 60px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.05);animation:modalSlideIn 0.3s ease forwards;">
    <button onclick="closeDevModal()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#a5c0d6;font-size:18px;cursor:pointer;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,50,50,0.2)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.color='#a5c0d6'">✕</button>
    
    <div style="text-align:center;">
      <img src="شعار الجامعة.jpg" style="width:90px;height:90px;object-fit:contain;background:#fff;border-radius:18px;padding:6px;box-shadow:0 0 30px rgba(0,240,255,0.25);border:2px solid rgba(0,240,255,0.2);margin-bottom:20px;">
      <h3 style="font-size:15px;color:#00f0ff;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">Al-Maaqal University</h3>
      <p style="font-size:12px;color:#5a7aaa;margin-bottom:24px;">Petroleum Engineering Department</p>
      
      <div style="background:rgba(0,240,255,0.03);border:1px solid rgba(0,240,255,0.12);border-radius:16px;padding:20px;margin-bottom:24px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,#00f0ff,#00e676);"></div>
        <div style="font-size:10px;color:#a5c0d6;letter-spacing:2px;font-weight:700;margin-bottom:6px;">ACADEMIC GRADUATION PROJECT</div>
        <div style="font-size:24px;font-weight:900;color:#00f0ff;text-shadow:0 0 10px rgba(0,240,255,0.3);margin-bottom:4px;">sjjad k. Hano</div>
        <div style="font-size:13px;color:#00e676;font-weight:700;margin-bottom:12px;">الطالب سجاد ك. هانو</div>
        <p style="font-size:13px;color:#a5c0d6;line-height:1.6;margin:0;">
          Created and programmed this advanced digital twin simulation platform ("Hano Control") for the Hammar GOSP (Gas Oil Separation Plant) surface facilities.
        </p>
      </div>

      <div style="background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:12px;padding:14px;margin-bottom:24px;text-align:left;">
        <div style="font-size:9px;color:#5a7aaa;letter-spacing:1px;font-weight:700;margin-bottom:4px;text-align:center;">PROJECT SUPERVISORS</div>
        <div style="font-size:13px;color:#e0f0ff;font-weight:600;text-align:center;">Dr. Eng. Saher Adel &amp; Dr. Mahmoud Badawy</div>
      </div>

      <button onclick="closeDevModal()" style="background:linear-gradient(90deg,#00f0ff,#00e676);border:none;border-radius:12px;padding:12px 30px;color:#050a14;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 5px 20px rgba(0,240,255,0.25);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 8px 25px rgba(0,240,255,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 5px 20px rgba(0,240,255,0.25)'">
        CLOSE PROFILE
      </button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>
<script src="login.js"></script>
<script src="core.js"></script>
<script src="charts.js"></script>
<script src="features.js"></script>
<script src="separator_design.js"></script>
<script src="hammar_pfd.js"></script>
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

/* ================================================================
   SEPARATOR DESIGN MODULE — STYLES
   ================================================================ */

/* --- Sidebar nav button special style --- */
.sd-nav-special{
  margin-top:8px;
  background:linear-gradient(135deg,rgba(13,71,161,0.08),rgba(21,101,192,0.04));
  border-top:1px solid rgba(13,71,161,0.12);
  position:relative;
  flex-wrap:wrap;
  gap:4px;
}
.sd-nav-special:hover{
  background:linear-gradient(135deg,rgba(13,71,161,0.15),rgba(21,101,192,0.08));
  color:#1565c0;
  border-color:#1565c0;
}
.sd-nav-special.active{
  background:linear-gradient(135deg,rgba(13,71,161,0.15),rgba(21,101,192,0.08));
  color:#1565c0;
  border-left:3px solid #1565c0;
}
.sd-nav-label{flex:1}
.sd-nav-badge{
  background:linear-gradient(135deg,#e53935,#b71c1c);
  color:#fff;
  font-size:9px;
  font-weight:800;
  padding:2px 6px;
  border-radius:10px;
  letter-spacing:.08em;
  animation:pulse 2s infinite;
  flex-shrink:0;
}

/* --- Page Header --- */
.sd-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:linear-gradient(135deg,#e3f2fd,#f1f8e9);
  border:1.5px solid #90caf9;
  border-radius:16px;
  padding:18px 24px;
  margin-bottom:20px;
  gap:16px;
  flex-wrap:wrap;
}
.sd-header-left{display:flex;align-items:center;gap:16px}
.sd-header-icon{font-size:32px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.12))}
.sd-std-badges{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.sd-std-badge{
  font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;
  letter-spacing:.03em;white-space:nowrap;
}

/* --- Top Grid (Config + Summary) --- */
.sd-top-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin-bottom:20px;
}
.sd-config-card,.sd-summary-card{min-height:320px}

/* --- Type Selector --- */
.sd-type-selector{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.sd-type-opt{cursor:pointer;user-select:none}
.sd-type-opt input[type=radio]{display:none}
.sd-type-card{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  padding:12px 14px;border-radius:14px;border:2px solid var(--card-border);
  background:#fafcfe;cursor:pointer;transition:all .25s;min-width:90px;
}
.sd-type-opt input[type=radio]:checked + .sd-type-card{
  border-color:#1565c0;
  background:linear-gradient(135deg,#e3f2fd,#fff);
  box-shadow:0 4px 18px rgba(21,101,192,.18);
  transform:translateY(-3px);
}
.sd-type-card:hover{border-color:#90caf9;background:#f0f7ff;transform:translateY(-2px)}
.sd-type-svg{display:flex;align-items:center;justify-content:center;min-height:50px}
.sd-type-name{font-size:12px;font-weight:700;color:var(--text)}
.sd-type-sub{font-size:10px;color:var(--text3);font-family:var(--mono)}

/* --- Select Dropdowns --- */
.sd-select{
  width:100%;padding:9px 12px;border:1.5px solid var(--card-border);
  border-radius:8px;background:#f8fafb;color:var(--text);
  font-family:'Inter',sans-serif;font-size:12px;font-weight:500;
  outline:none;cursor:pointer;transition:all .25s;margin-top:4px;
}
.sd-select:focus{border-color:#1565c0;box-shadow:0 0 0 3px rgba(21,101,192,.1)}

/* --- Field label --- */
.sd-field-label{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.06em}

/* --- Inputs Grid --- */
.sd-inputs-grid{
  display:grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  gap:16px;
  margin-bottom:20px;
}

/* --- Reference Box --- */
.sd-ref-box{
  margin-top:14px;background:rgba(0,0,0,.02);
  border:1px solid var(--card-border);border-radius:10px;
  padding:12px;
}
.sd-ref-title{font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.sd-ref-row{
  display:flex;justify-content:space-between;align-items:center;
  font-size:11px;color:var(--text2);padding:4px 0;
  border-bottom:1px solid rgba(0,0,0,.04);
}
.sd-ref-row:last-child{border-bottom:none}
.sd-ref-row span:last-child{font-family:var(--mono);font-weight:600;color:var(--gas);font-size:11px}

/* --- Calculate Button --- */
.sd-calc-btn{
  width:100%;padding:16px;margin-bottom:24px;
  background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);
  color:#fff;border:none;border-radius:12px;
  font-weight:800;font-size:14px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:12px;
  transition:all .25s;letter-spacing:.04em;
  box-shadow:0 4px 20px rgba(13,71,161,.3);
}
.sd-calc-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 32px rgba(13,71,161,.45);
  background:linear-gradient(135deg,#1565c0,#1976d2,#1e88e5);
}
.sd-calc-btn:active{transform:translateY(0)}

/* --- Results Grid --- */
.sd-results-grid{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:16px;
  margin-bottom:20px;
}
.sd-sketch-card{grid-column:span 1}

/* --- Sketch Box --- */
.sd-sketch-box{
  background:linear-gradient(135deg,#f8fbff,#eef5fc);
  border:1.5px solid #90caf9;border-radius:12px;
  padding:16px;min-height:220px;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
}
.sd-sketch-box svg{width:100%;height:auto;display:block}

/* --- Result Rows --- */
.sd-res-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04);
}
.sd-res-row:last-child{border-bottom:none}
.sd-res-row.sd-highlight{
  background:linear-gradient(135deg,rgba(21,101,192,.05),rgba(21,101,192,.02));
  border-radius:6px;padding:7px 8px;
  border-left:3px solid #1565c0;margin:2px 0;
}
.sd-res-label{font-size:11px;color:var(--text2)}
.sd-res-value{font-family:var(--mono);font-size:13px;font-weight:700;color:var(--text)}
.sd-res-unit{font-family:var(--mono);font-size:10px;color:var(--text3);margin-left:3px}

/* --- Summary Badges --- */
.sd-badge-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.sd-badge{
  font-size:11px;font-weight:700;padding:4px 12px;
  border-radius:20px;white-space:nowrap;flex-shrink:0;min-width:120px;text-align:center;
}
.sd-badge-val{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--text)}
.sd-stage-reason{
  margin-top:10px;padding:10px 14px;
  background:linear-gradient(135deg,rgba(0,184,148,.06),rgba(0,184,148,.02));
  border:1px solid rgba(0,184,148,.2);border-radius:10px;
}
.sd-stage-reason ul{list-style:none;padding:0;margin:0}
.sd-stage-reason li{
  font-size:11px;color:var(--text2);padding:4px 0;
  padding-left:18px;position:relative;
}
.sd-stage-reason li::before{
  content:'✓';position:absolute;left:0;
  color:#00b894;font-weight:700;font-size:11px;
}

/* --- Placeholder --- */
.sd-placeholder{
  color:var(--text3);font-size:12px;text-align:center;
  padding:20px;font-style:italic;
}

/* --- Responsive --- */
@media(max-width:1400px){
  .sd-inputs-grid{grid-template-columns:1fr 1fr}
  .sd-results-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:1024px){
  .sd-top-grid{grid-template-columns:1fr}
  .sd-inputs-grid{grid-template-columns:1fr 1fr}
  .sd-results-grid{grid-template-columns:1fr}
  .sd-sketch-card{grid-column:span 1}
}
@media(max-width:768px){
  .sd-header{flex-direction:column;align-items:flex-start}
  .sd-inputs-grid{grid-template-columns:1fr}
  .sd-type-selector{justify-content:flex-start}
}

/* Dark mode overrides */
body.dark-mode .sd-header{background:linear-gradient(135deg,rgba(13,71,161,.15),rgba(27,94,32,.1));border-color:rgba(21,101,192,.3)}
body.dark-mode .sd-type-card{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.1)}
body.dark-mode .sd-type-opt input[type=radio]:checked + .sd-type-card{background:rgba(21,101,192,.2);border-color:#1976d2}
body.dark-mode .sd-select{background:rgba(255,255,255,.06);color:var(--text)}
body.dark-mode .sd-sketch-box{background:linear-gradient(135deg,#0d1b2a,#0a1520);border-color:rgba(21,101,192,.3)}
body.dark-mode .sd-ref-box{background:rgba(255,255,255,.03)}
body.dark-mode .sd-res-row.sd-highlight{background:rgba(21,101,192,.12)}

/* ===== SIDEBAR DEVELOPER FOOTER ===== */
.sidebar-dev-footer {
  margin-top: auto;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(0, 230, 118, 0.03));
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
}
.sidebar-dev-footer:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.15);
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(0, 230, 118, 0.05));
}
.dev-footer-avatar {
  font-size: 18px;
  background: rgba(0, 240, 255, 0.1);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 240, 255, 0.2);
}
.dev-footer-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dev-footer-title {
  font-size: 8px;
  color: var(--text3);
  letter-spacing: 1.5px;
  font-weight: 700;
  text-transform: uppercase;
}
.dev-footer-name {
  font-size: 11px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: 0.5px;
}
body.dark-mode .dev-footer-name {
  color: #00f0ff;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
}
.dev-footer-pulse {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 6px;
  height: 6px;
  background-color: #00e676;
  border-radius: 50%;
  box-shadow: 0 0 8px #00e676;
  animation: pulseGreen 2s infinite;
}

@keyframes pulseGreen {
  0% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #00e676; }
  100% { transform: scale(0.9); opacity: 0.6; }
}

@keyframes modalSlideIn {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media(max-width:1024px){
  .sidebar-dev-footer {
    padding: 8px 0;
    justify-content: center;
  }
  .sidebar-dev-footer .dev-footer-content,
  .sidebar-dev-footer .dev-footer-pulse {
    display: none;
  }
}
@media(max-width:768px){
  .sidebar-dev-footer {
    display: none;
  }
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

// ===== DEVELOPER MODAL ACTIONS =====
window.openDevModal = function() {
  var modal = document.getElementById('devModal');
  if (modal) {
    modal.style.display = 'flex';
  }
};

window.closeDevModal = function() {
  var modal = document.getElementById('devModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// Close developer modal when clicking outside the box
document.addEventListener('click', function(e) {
  var modal = document.getElementById('devModal');
  if (modal && modal.style.display === 'flex' && e.target === modal) {
    window.closeDevModal();
  }
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
// ===== Hammar IPF - Hano Control Dashboard =====
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
@keyframes loginFloat {0%, 100% {transform: translateY(0) scale(1)} 50% {transform: translateY(-8px) scale(1.02)}}
@keyframes loginPulse {0%, 100% {opacity: .4; transform: scale(1)} 50% {opacity: 1; transform: scale(1.6)}}
@keyframes loginGlow {
  0% {box-shadow: 0 0 40px rgba(0, 240, 255, 0.15), 0 0 80px rgba(0, 230, 118, 0.05), inset 0 0 20px rgba(0, 240, 255, 0.05);}
  50% {box-shadow: 0 0 60px rgba(0, 240, 255, 0.35), 0 0 100px rgba(124, 77, 255, 0.2), inset 0 0 30px rgba(0, 230, 118, 0.1);}
  100% {box-shadow: 0 0 40px rgba(0, 240, 255, 0.15), 0 0 80px rgba(0, 230, 118, 0.05), inset 0 0 20px rgba(0, 240, 255, 0.05);}
}
@keyframes loginShake {0%, 100% {transform: translateX(0)} 15% {transform: translateX(-10px)} 30% {transform: translateX(8px)} 45% {transform: translateX(-6px)} 60% {transform: translateX(4px)} 75% {transform: translateX(-2px)}}
@keyframes loginSuccess {0% {border-color: rgba(0,230,118,.3)} 50% {border-color: #00e676; box-shadow: 0 0 80px rgba(0, 230, 118, 0.5)} 100% {border-color: rgba(0,230,118,.3)}}
@keyframes ringRotate {from {transform: rotate(0deg)} to {transform: rotate(360deg)}}
@keyframes ringRotateR {from {transform: rotate(360deg)} to {transform: rotate(0deg)}}
@keyframes fadeOutLogin {0% {opacity: 1; transform: scale(1)} 100% {opacity: 0; transform: scale(1.03); filter: blur(10px)}}
@keyframes gradientSweep {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes cardPulseGlow {
  0%, 100% {
    box-shadow: 0 8px 32px 0 rgba(0, 240, 255, 0.03);
    border-color: rgba(0, 240, 255, 0.12);
  }
  50% {
    box-shadow: 0 8px 32px 0 rgba(0, 230, 118, 0.08);
    border-color: rgba(0, 230, 118, 0.2);
  }
}

#loginScreen {position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000}
#loginScreen.fadeout {animation: fadeOutLogin .6s cubic-bezier(0.4, 0, 0.2, 1) forwards}

.login-bg {width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at center, #0e1a30 0%, #050a14 100%);
  position: relative; overflow: hidden}

.login-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center;
  pointer-events: none;
  z-index: 1;
  animation: gridPulse 8s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.75; }
}

.login-particles {position: absolute; inset: 0; pointer-events: none}
.login-particle {position: absolute; border-radius: 50%; opacity: 0; animation: loginPulse var(--dur,4s) ease-in-out infinite; animation-delay: var(--delay,0s)}

.login-rings {position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none}
.login-ring {position: absolute; border-radius: 50%; border: 1px solid transparent}
.ring1 {width: 700px; height: 700px; border-color: rgba(0, 240, 255, 0.04); animation: ringRotate 40s linear infinite}
.ring2 {width: 500px; height: 500px; border-color: rgba(0, 230, 118, 0.05); border-style: dashed; animation: ringRotateR 30s linear infinite}

/* Tech HUD Rings on Left Side */
.tech-hud-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 360px;
  margin-top: -180px;
  margin-left: -180px;
  border: 1px dashed rgba(0, 240, 255, 0.08);
  border-radius: 50%;
  animation: ringRotate 25s linear infinite;
  pointer-events: none;
}
.tech-hud-ring2 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
  border: 1px double rgba(0, 230, 118, 0.05);
  border-radius: 50%;
  animation: ringRotateR 35s linear infinite;
  pointer-events: none;
}

/* Card */
.login-card {position: relative; z-index: 10; background: rgba(8, 12, 24, 0.65); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 36px; display: flex; width: 920px; max-width: 95vw; min-height: 520px;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: loginGlow 6s ease-in-out infinite; overflow: hidden;
  transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s, border-color 0.5s;
  transform-style: preserve-3d;
  perspective: 1000px;}
.login-card.shake {animation: loginShake .5s ease}
.login-card.success {animation: loginSuccess .8s ease}

.login-left {flex: 1.15; padding: 45px; display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(180deg, rgba(0, 240, 255, 0.03) 0%, transparent 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.06); position: relative}

.login-right {flex: 1; padding: 45px; display: flex; flex-direction: column; justify-content: center; background: rgba(0, 0, 0, 0.25)}

/* Credits Section */
.login-credits-wrap {text-align: center; font-family: 'Inter', sans-serif; z-index: 2}
.university-logo {width: 85px; height: 85px; margin-bottom: 20px; background: #fff; border-radius: 16px; padding: 6px; box-shadow: 0 0 25px rgba(0, 240, 255, 0.25); border: 2px solid rgba(0, 240, 255, 0.2); animation: loginFloat 4s ease-in-out infinite; object-fit: contain}
.credits-title {color: #00f0ff; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px; opacity: 0.85}
.credits-text {color: #a5c0d6; font-size: 14.5px; line-height: 1.7; margin-bottom: 15px; font-weight: 400}

/* Developer Credit Card */
.developer-credit-card {
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 20px;
  padding: 20px 16px;
  margin: 20px 0;
  box-shadow: 0 8px 32px 0 rgba(0, 240, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: cardPulseGlow 4s ease-in-out infinite;
}
.developer-credit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.15), transparent);
  transition: 0.5s;
}
.developer-credit-card:hover::before {
  left: 100%;
  transition: 0.8s ease;
}
.developer-credit-card:hover {
  border-color: rgba(0, 240, 255, 0.5);
  transform: scale(1.03) translateY(-3px);
  box-shadow: 0 15px 45px 0 rgba(0, 240, 255, 0.2);
}
.dev-subtitle {
  font-size: 8.5px;
  color: #8ab4d4;
  letter-spacing: 0.2em;
  font-weight: 800;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.dev-name {
  font-size: 22px;
  font-weight: 950;
  color: #00f0ff;
  text-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.dev-arabic {
  font-size: 12px;
  color: #00e676;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 230, 118, 0.3);
  letter-spacing: 0.01em;
  margin-top: 4px;
}
.dev-dept {
  font-size: 9px;
  color: #5a7aaa;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: 6px;
  text-transform: uppercase;
}
.dev-badge-glow {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%);
  pointer-events: none;
}
.cyber-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(0, 240, 255, 0.4), transparent);
  animation: scanSweep 3s linear infinite;
  pointer-events: none;
  z-index: 5;
}
@keyframes scanSweep {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* Supervision Card */
.supervision-card {
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 10px 14px;
}
.sup-title {
  font-size: 8px;
  color: #5a7aaa;
  letter-spacing: 0.15em;
  font-weight: 700;
  margin-bottom: 3px;
}
.sup-names {
  font-size: 12px;
  color: #e0f0ff;
  font-weight: 600;
  opacity: 0.9;
}

/* Logo Section */
.login-logo-wrap {display: flex; flex-direction: column; align-items: center; margin-bottom: 25px}
.main-logo {width: 90px; height: 90px; object-fit: contain; margin-bottom: 12px; background: #fff; border-radius: 18px; padding: 8px; box-shadow: 0 0 25px rgba(0, 240, 255, 0.25); border: 2px solid rgba(0, 240, 255, 0.15); transition: all 0.3s ease}
.main-logo:hover {transform: scale(1.05) rotate(2deg); box-shadow: 0 0 35px rgba(0, 240, 255, 0.4)}
.station-logo-crop {height: 75px; width: 75px; object-fit: cover; object-position: top; background: #fff; padding: 6px; border-radius: 14px;}
.login-title {font-family: 'Inter', sans-serif; font-size: 30px; font-weight: 900; text-align: center;
  background: linear-gradient(135deg, #00f0ff, #00e676);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 4px; letter-spacing: 0.02em}
.login-subtitle {text-align: center; font-size: 10px; color: #5a7aaa; letter-spacing: .25em; text-transform: uppercase; font-weight: 600}

/* Form */
.login-field {margin-bottom: 18px}
.login-label {display: block; font-size: 10px; color: #5a7aaa; text-transform: uppercase; letter-spacing: .18em; font-weight: 700; margin-bottom: 8px}
.login-input-wrap {display: flex; align-items: center; background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(0, 240, 255, 0.18); border-radius: 14px; transition: all .3s ease; position: relative}
.login-input-wrap:focus-within {border-color: #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.12); background: rgba(0, 0, 0, 0.55)}
.login-lock-icon {padding-left: 15px; font-size: 16px; opacity: .65}
.login-input {flex: 1; background: none; border: none; outline: none; color: #fff; font-family: 'JetBrains Mono', monospace; font-size: 17px; padding: 14px; letter-spacing: .2em}
.login-input::placeholder {color: rgba(255, 255, 255, 0.12); letter-spacing: .1em}

.login-eye {background: none; border: none; outline: none; padding-right: 15px; font-size: 18px; cursor: pointer; opacity: 0.5; transition: opacity 0.2s}
.login-eye:hover {opacity: 0.9}

.login-btn {width: 100%; margin-top: 10px; padding: 15px;
  background: linear-gradient(-45deg, #00f0ff, #00e676, #7c4dff, #00f0ff);
  background-size: 300% 300%;
  animation: gradientSweep 6s ease infinite;
  border: none; border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1)}
.login-btn:hover {transform: translateY(-2px) scale(1.005); box-shadow: 0 10px 30px rgba(0, 240, 255, 0.35), 0 0 15px rgba(0, 230, 118, 0.25); filter: brightness(1.05)}
.login-btn-text {color: #060912; font-weight: 800; letter-spacing: 0.08em; font-size: 13.5px}
.login-btn-arrow {color: #060912; font-size: 18px; transition: transform 0.2s}
.login-btn:hover .login-btn-arrow {transform: translateX(4px)}

.login-error {text-align: center; font-size: 12px; font-weight: 600; margin-top: 12px; height: 18px; color: #ff5252; opacity: 0; transition: opacity 0.3s}
.login-error.show {opacity: 1}
.login-error.ok {color: #00e676}

/* Responsive */
@media(max-width:900px){
  .login-card {flex-direction: column; width: 95vw; min-height: auto}
  .login-left {padding: 30px; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.06)}
  .login-right {padding: 30px}
  .login-title {font-size: 24px}
  .tech-hud-ring, .tech-hud-ring2 {display: none}
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
            <div class="tech-hud-ring"></div>
            <div class="tech-hud-ring2"></div>
            <div class="login-credits-wrap">
              <img src="شعار الجامعة.jpg" class="university-logo" alt="Al-Maaqal University">
              <div class="credits-title">Academic Graduation Project</div>

              <div class="credits-text">
                This engineering system was designed and modeled to simulate the Hammar GOSP Station by Petroleum Engineering department at Al-Maaqal University.
              </div>
              
              <div class="developer-credit-card">
                <div class="cyber-scanline"></div>
                <div class="dev-badge-glow"></div>
                <div class="dev-subtitle">SYSTEM CREATOR & DEVELOPER</div>
                <div class="dev-name">sjjad k. Hano</div>
                <div class="dev-arabic">تم التطوير والإنشاء من قبل الطالب سجاد ك. هانو</div>
                <div class="dev-dept">Petroleum Engineering Department</div>
              </div>

              <div class="supervision-card">
                <div class="sup-title">UNDER THE DIRECT SUPERVISION OF</div>
                <div class="sup-names">Dr. Eng. Saher Adel & Dr. Mahmoud Badawy</div>
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
              <p class="login-subtitle">Hano Control Digital Twin</p>
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

    // 3D Parallax Mouse Move effect on login card
    var bg = document.querySelector('.login-bg');
    if (bg && card) {
      bg.addEventListener('mousemove', function(e) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var mouseX = e.clientX - w / 2;
        var mouseY = e.clientY - h / 2;
        
        // Calculate rotation angles (max 6 degrees)
        var rotateY = (mouseX / (w / 2)) * 6;
        var rotateX = -(mouseY / (h / 2)) * 6;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
        var rings = document.querySelector('.login-rings');
        if (rings) {
          rings.style.transform = 'translate(' + (mouseX * -0.025) + 'px, ' + (mouseY * -0.025) + 'px)';
        }
        var pWrap = document.getElementById('loginParticles');
        if (pWrap) {
          pWrap.style.transform = 'translate(' + (mouseX * 0.035) + 'px, ' + (mouseY * 0.035) + 'px)';
        }
      });

      bg.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        var rings = document.querySelector('.login-rings');
        if (rings) rings.style.transform = 'translate(0, 0)';
        var pWrap = document.getElementById('loginParticles');
        if (pWrap) pWrap.style.transform = 'translate(0, 0)';
      });
    }

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
  "name": "Hammar IPF - Hano Control",
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