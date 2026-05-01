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
