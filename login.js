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

