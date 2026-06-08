NEW_SVG = '''      <!-- SVG Process Schematic — Hammar IPF Figure 1 Layout -->
      <div class="schematic-wrap" style="overflow-x:auto;overflow-y:hidden;padding:6px 0;">
        <svg id="plantSVG" viewBox="0 0 1400 625" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;min-width:900px;display:block;font-family:\'Inter\',sans-serif;">
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
          <g class="svg-node" onclick="switchTab(\'gas\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'gas\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'oil\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="480" y="68" width="128" height="74" rx="7" fill="url(#vesG)" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M498,86 Q514,112 530,86" fill="none" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M530,86 Q546,112 562,86" fill="none" stroke="#ffab40" stroke-width="1.8"/>
            <path d="M498,126 Q514,102 530,126" fill="none" stroke="#ffab40" stroke-width="1.3" opacity="0.5"/>
            <path d="M530,126 Q546,102 562,126" fill="none" stroke="#ffab40" stroke-width="1.3" opacity="0.5"/>
            <text x="544" y="154" text-anchor="middle" fill="#ffab40" font-size="9" font-weight="700">C/C EXCHANGER</text>
          </g>

          <line x1="608" y1="105" x2="652" y2="105" stroke="url(#gasG)" stroke-width="2.5" marker-end="url(#arrG)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.9s" repeatCount="indefinite"/></line>

          <!-- CRUDE OIL HEATER -->
          <g class="svg-node" onclick="switchTab(\'oil\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'trains\')" style="cursor:pointer;" filter="url(#glw)">
            <rect x="36" y="244" width="108" height="78" rx="7" fill="url(#vesG)" stroke="#ffab40" stroke-width="2"/>
            <text x="90" y="274" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="800">PRODUCTION</text>
            <text x="90" y="288" text-anchor="middle" fill="#ffab40" font-size="10" font-weight="800">FLUIDS</text>
            <text x="90" y="302" text-anchor="middle" fill="#aaa"   font-size="8.5">from DGS Wells</text>
            <text x="90" y="315" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700" id="sv-well">— bpd</text>
          </g>

          <line x1="144" y1="283" x2="170" y2="283" stroke="url(#oilG)" stroke-width="3" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- 1ST STAGE SEPARATOR -->
          <g class="svg-node" onclick="switchTab(\'separator\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'separator\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'oil\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'oil\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'oil\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'storage\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="1058" y="234" width="80" height="106" rx="5" fill="url(#vesG)" stroke="#ffc107" stroke-width="2"/>
            <rect x="1066" y="276" width="64" height="57" rx="3" fill="#8b3a00" opacity="0.4"/>
            <ellipse cx="1098" cy="238" rx="36" ry="7" fill="none" stroke="#ffc107" stroke-width="1.5"/>
            <line x1="1058" y1="292" x2="1138" y2="292" stroke="#ffc107" stroke-width="1" opacity="0.5"/>
            <text x="1098" y="352" text-anchor="middle" fill="#ffc107" font-size="9.5" font-weight="700">CRUDE OIL</text>
            <text x="1098" y="365" text-anchor="middle" fill="#ffc107" font-size="9.5" font-weight="700">TANK</text>
            <text x="1098" y="378" text-anchor="middle" fill="#888"   font-size="8" id="sv-storage">On-Spec</text>
          </g>

          <!-- OFF-SPEC TANK -->
          <g class="svg-node" onclick="switchTab(\'storage\')" style="cursor:pointer;">
            <rect x="1058" y="395" width="80" height="56" rx="5" fill="url(#vesG)" stroke="#ff9800" stroke-width="1.5"/>
            <rect x="1066" y="407" width="64" height="37" rx="3" fill="#6b3a00" opacity="0.4"/>
            <text x="1098" y="462" text-anchor="middle" fill="#ff9800" font-size="8.5" font-weight="700">OFF-SPEC</text>
            <text x="1098" y="474" text-anchor="middle" fill="#ff9800" font-size="8.5" font-weight="700">TANK</text>
          </g>

          <line x1="1138" y1="272" x2="1186" y2="272" stroke="url(#oilG)" stroke-width="2.8" marker-end="url(#arrO)" stroke-dasharray="8,4"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>

          <!-- EXPORT PUMPS + PIPELINE -->
          <g class="svg-node" onclick="switchTab(\'storage\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="282" y="493" width="152" height="68" rx="7" fill="url(#vesG)" stroke="#29b6f6" stroke-width="1.8"/>
            <circle cx="316" cy="527" r="13" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <text x="316" y="532" text-anchor="middle" fill="#29b6f6" font-size="11" font-weight="700">P</text>
            <text x="378" y="519" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PW TRANSFER</text>
            <text x="378" y="532" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PUMPS</text>
            <text x="378" y="545" text-anchor="middle" fill="#888"   font-size="8">TDS 213,152 ppm</text>
          </g>
          <line x1="434" y1="527" x2="472" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW BUFFER TANK -->
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="474" y="485" width="72" height="90" rx="5" fill="url(#vesG)" stroke="#29b6f6" stroke-width="1.8"/>
            <rect x="482" y="519" width="56" height="49" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="474" y1="535" x2="546" y2="535" stroke="#29b6f6" stroke-width="1" opacity="0.5"/>
            <text x="510" y="585" text-anchor="middle" fill="#29b6f6" font-size="8.5" font-weight="700">PW BUFFER</text>
            <text x="510" y="597" text-anchor="middle" fill="#29b6f6" font-size="8.5" font-weight="700">TANK</text>
          </g>
          <line x1="546" y1="527" x2="576" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- PW TREATMENT PACKAGE -->
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="578" y="483" width="166" height="90" rx="7" fill="url(#vesG)" stroke="#29b6f6" stroke-width="2"/>
            <ellipse cx="620" cy="519" rx="21" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <ellipse cx="670" cy="519" rx="21" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.6"/>
            <ellipse cx="718" cy="519" rx="14" ry="17" fill="none" stroke="#29b6f6" stroke-width="1.3" opacity="0.6"/>
            <text x="660" y="553" text-anchor="middle" fill="#29b6f6" font-size="9.5" font-weight="700">PW TREATMENT</text>
            <text x="660" y="566" text-anchor="middle" fill="#888"   font-size="8.5" id="sv-water">&lt;40 ppm OiW</text>
          </g>
          <line x1="744" y1="527" x2="778" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- TREATED PW TANK -->
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
            <rect x="780" y="485" width="78" height="90" rx="5" fill="url(#vesG)" stroke="#00e676" stroke-width="1.8"/>
            <rect x="788" y="519" width="62" height="49" rx="3" fill="#003366" opacity="0.5"/>
            <line x1="780" y1="535" x2="858" y2="535" stroke="#00e676" stroke-width="1" opacity="0.5"/>
            <text x="819" y="585" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700">TREATED</text>
            <text x="819" y="597" text-anchor="middle" fill="#00e676" font-size="8.5" font-weight="700">PW TANK</text>
          </g>
          <line x1="858" y1="527" x2="892" y2="527" stroke="url(#watG)" stroke-width="2.5" marker-end="url(#arrW)" stroke-dasharray="7,4"><animate attributeName="stroke-dashoffset" from="11" to="0" dur="1.2s" repeatCount="indefinite"/></line>

          <!-- WATER INJECTION PUMPS -->
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;" filter="url(#dropshadow)">
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
          <g class="svg-node" onclick="switchTab(\'water\')" style="cursor:pointer;">
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
'''

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find start marker (the SVG schematic comment line)
start_marker = '      <!-- SVG Process Schematic -->'
end_marker = '      <!-- KPI Summary -->\n      <div class="kpi-row" id="overviewKPI"></div>\n    </div>'

start_idx = content.find(start_marker)
end_idx   = content.find(end_marker) + len(end_marker)

if start_idx == -1:
    print('ERROR: start marker not found')
elif end_idx == -1:
    print('ERROR: end marker not found')
else:
    new_content = content[:start_idx] + NEW_SVG + content[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Done! Lines now:', new_content.count('\n'))
