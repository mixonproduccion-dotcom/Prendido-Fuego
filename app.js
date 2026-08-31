// =========================================================
// PRENDIDO FUEGO 🔥 - STUDIO LIVE STREAMING ENGINE (MIX ON)
// Engine for live broadcast, step-by-step game modes,
// 200+ celebrity lore, 100 semaforo red flags gamified in rounds of 10,
// interactive ranking, soundboard synthesis, global funa tracker,
// and instant lower-third chyron graphics.
// =========================================================

// Global App State
let currentTab = "home";
let isOBSMode = false;

// 1. Global Funa Tracker (Funas acumuladas por conductor)
let funaCounts = {
  holder: parseInt(localStorage.getItem("pf_funa_holder") || "0"),
  diane: parseInt(localStorage.getItem("pf_funa_diane") || "0"),
  luli: parseInt(localStorage.getItem("pf_funa_luli") || "0")
};
let currentAccused = "holder";

// 2. Roulette & Tinder Bizarro State
let celebrities = typeof CELEBRITIES_DATABASE !== "undefined" ? [...CELEBRITIES_DATABASE] : [];
let currentVictim = null;
let currentCandidates = [];
let assignedRoles = { match: null, chongo: null, quemado: null };
let rouletteCurrentStep = 1; // 1: Víctima, 2: Cand 1, 3: Cand 2, 4: Cand 3, 5: Juicio Final
let isSpinning = false;
let wheelAngle = 0;

// 3. Semáforo Gamificado (Ronda de 10 Red Flags)
let semaforoRoundCases = [];
let semaforoRoundIndex = 0;
let semaforoRoundVotes = [];

// 4. Ranking State (Interactive Traición & Caretómetro)
let currentRankingIndex = 0;
let currentRankingItems = [];

// 5. Bandos State (Guerra de Bandos: ¿A quién bancás?)
let currentBandoIndex = 0;
let bandoVotes = { a: 1, b: 1 };

// 6. Tribunal State (Dilema -> 3 Opciones -> Veredicto 3 Conductores)
let currentTribunalIndex = 0;
let tribunalCurrentPhase = 1;
let tribunalVotes = { holder: null, diane: null, luli: null };

// 7. Debate Timer State
let timerSeconds = 30;
let timerInitial = 30;
let timerInterval = null;
let timerRunning = false;

// 8. Botón de Funa / Al Banco Modal (30s Derecho a Réplica)
let vetoSeconds = 30;
let vetoInterval = null;
let vetoRunning = false;

// DOM Canvases
let particlesCanvas, particlesCtx;
let rouletteCanvas, rouletteCtx;

// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initRouletteCanvas();
  setupSidebar();
  setupSoundboard();
  setupKeyboardShortcuts();
  setupTimer();
  setupFunaModal();
  setupTabs();
  updateFunaDisplays();

  // Load Initial States
  loadInitialRoulette();
  startSemaforoRound();
  loadRankingSet(0);
  loadBandoDuel(0);
  loadTribunalCase(0);
  setupZocaloEvents();
  setupPlannerEvents();
  setupShowDiaEvents();

  // Set initial home screen state (explicitly hide zocalo on home)
  switchTab("home");
});



// =========================================================
// 1. CONTADOR GLOBAL DE FUNAS / CANCELACIONES
// =========================================================
function updateFunaDisplays() {
  const topH = document.getElementById("topFunaHolder");
  const topD = document.getElementById("topFunaDiane");
  const topL = document.getElementById("topFunaLuli");
  const sideH = document.getElementById("sideFunaHolder");
  const sideD = document.getElementById("sideFunaDiane");
  const sideL = document.getElementById("sideFunaLuli");

  if (topH) topH.textContent = funaCounts.holder;
  if (topD) topD.textContent = funaCounts.diane;
  if (topL) topL.textContent = funaCounts.luli;
  if (sideH) sideH.textContent = funaCounts.holder;
  if (sideD) sideD.textContent = funaCounts.diane;
  if (sideL) sideL.textContent = funaCounts.luli;
}

function adjustFuna(conductor, delta) {
  if (!funaCounts.hasOwnProperty(conductor)) return;
  funaCounts[conductor] = Math.max(0, funaCounts[conductor] + delta);
  localStorage.setItem(`pf_funa_${conductor}`, funaCounts[conductor]);
  updateFunaDisplays();
  audioFX.playTick(500 + delta * 100, 0.2);
}

// =========================================================
// 2. SIDEBAR & DRAWER RETRÁCTIL
// =========================================================
function setupSidebar() {
  const sidebar = document.getElementById("studioSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const btnOpen = document.getElementById("btnOpenSidebar");
  const btnClose = document.getElementById("btnCloseSidebar");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  }

  function toggleSidebar() {
    if (sidebar.classList.contains("open")) closeSidebar();
    else openSidebar();
  }

  btnOpen?.addEventListener("click", toggleSidebar);
  btnClose?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  // Close sidebar when clicking a game card
  document.querySelectorAll(".sidebar-game-card").forEach(card => {
    card.addEventListener("click", () => {
      const tab = card.dataset.tab;
      switchTab(tab);
      closeSidebar();
    });
  });

  // OBS Toggle
  const btnOBS = document.getElementById("btnToggleOBS");
  const btnTopOBS = document.getElementById("btnTopOBS");
  [btnOBS, btnTopOBS].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", toggleOBSMode);
  });

  // Fullscreen Toggle
  const btnFull = document.getElementById("btnToggleFullscreen");
  const btnTopFull = document.getElementById("btnTopFull");
  [btnFull, btnTopFull].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", toggleFullscreen);
  });

  // Audio Mute Toggle
  const btnMute = document.getElementById("btnToggleMute");
  if (btnMute) {
    btnMute.addEventListener("click", () => {
      audioFX.setMuted(!audioFX.muted);
      const icon = document.getElementById("muteIcon");
      if (icon) icon.textContent = audioFX.muted ? "🔇" : "🔊";
      btnMute.innerHTML = `<span id="muteIcon">${audioFX.muted ? "🔇" : "🔊"}</span> Audio ${audioFX.muted ? "Silenciado" : "Activado"}`;
    });
  }

  // Brand pill back to home
  document.getElementById("btnGoHome")?.addEventListener("click", () => switchTab("home"));
}

// =========================================================
// 2.1 BOTONERA DE SONIDOS (PERSISTENTE FLOTANTE & SIDEBAR)
// =========================================================
function setupSoundboard() {
  document.querySelectorAll("[data-sound]").forEach(pad => {
    pad.addEventListener("click", (e) => {
      e.stopPropagation();
      const soundKey = pad.dataset.sound;
      triggerSoundEffect(soundKey);
    });
  });

  // Dock Mute Tool
  document.getElementById("dockBtnMute")?.addEventListener("click", () => {
    audioFX.setMuted(!audioFX.muted);
    const dockIcon = document.getElementById("dockMuteIcon");
    const sideIcon = document.getElementById("muteIcon");
    const isM = audioFX.muted;
    if (dockIcon) dockIcon.textContent = isM ? "🔇" : "🔊";
    if (sideIcon) sideIcon.textContent = isM ? "🔇" : "🔊";
    const sideBtn = document.getElementById("btnToggleMute");
    if (sideBtn) sideBtn.innerHTML = `<span id="muteIcon">${isM ? "🔇" : "🔊"}</span> Audio ${isM ? "Silenciado" : "Activado"}`;
  });

  // Dock Timer Tool
  document.getElementById("dockBtnTimer")?.addEventListener("click", () => {
    if (window.pfToggleTimer) window.pfToggleTimer();
    else document.getElementById("topbarTimerPlay")?.click();
  });
}

function triggerSoundEffect(type) {
  audioFX.init();
  if (type === "fire") audioFX.playFireIgnite();
  else if (type === "factos") audioFX.playFactosHorn();
  else if (type === "buzzer") audioFX.playBuzzer();
  else if (type === "match") audioFX.playMatchChime();
  else if (type === "cringe") audioFX.playCringe();
  else if (type === "siren") {
    if (typeof triggerFunaModal === "function") triggerFunaModal();
    else if (typeof triggerVetoModal === "function") triggerVetoModal();
    else audioFX.playSiren();
  }

  // Visual active flash animation on all pads with that sound type
  document.querySelectorAll(`.dock-pad-btn[data-sound="${type}"]`).forEach(pad => {
    pad.classList.add("pad-active-flash");
    setTimeout(() => pad.classList.remove("pad-active-flash"), 250);
  });
}


function toggleOBSMode() {
  isOBSMode = !isOBSMode;
  document.body.classList.toggle("obs-clean-mode", isOBSMode);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => console.log(err));
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

// =========================================================
// 3. TAB SWITCHER & HEADER STAGE INDICATOR
// =========================================================
function setupTabs() {
  document.querySelectorAll("[data-start-game]").forEach(tile => {
    tile.addEventListener("click", () => {
      const target = tile.dataset.startGame;
      audioFX.playReveal();
      switchTab(target);
    });
  });

  // Botones de Inicio del Show del Día
  document.getElementById("btnStartTodayShow")?.addEventListener("click", () => {
    startShowDia("today");
  });

  document.getElementById("btnStartRngShow")?.addEventListener("click", () => {
    startShowDia("rng");
  });

  document.getElementById("btnHugePlay")?.addEventListener("click", () => {
    startShowDia("today");
  });
}

function switchTab(tabId) {
  currentTab = tabId;

  document.querySelectorAll(".game-view").forEach(view => {
    view.classList.toggle("active", view.id === `section-${tabId}`);
  });

  document.querySelectorAll(".sidebar-game-card").forEach(card => {
    card.classList.toggle("active", card.dataset.tab === tabId);
  });

  // ZÓCALO / GRAPH VISIBILITY: Hide on home, show inside active games
  const zocaloBanner = document.getElementById("lowerThirdBanner");
  if (zocaloBanner) {
    if (tabId === "home") {
      zocaloBanner.style.display = "none";
    } else {
      zocaloBanner.style.display = "flex";
    }
  }

  const indicator = document.getElementById("stageIndicatorText");
  const stageIcons = {
    home: "EN VIVO",
    "show-dia": "🎬 EL SHOW DEL DÍA (COMPLETO)",
    roulette: "🎡 1. LA RULETA & TINDER BIZARRO",
    semaforo: "🚦 2. EL SEMÁFORO DE TOXICIDAD",
    ranking: "📊 3. EL RANKING DE TRAICIÓN",
    bandos: "⚔️ 4. GUERRA DE BANDOS",
    tribunal: "⚖️ 5. EL TRIBUNAL DE FARÁNDULA",
    zocalo: "📰 6. GENERADOR DE ZÓCALOS",
    planner: "🧠 7. PRODUCTOR DE TENDENCIAS"
  };
  if (indicator) indicator.textContent = stageIcons[tabId] || "PRENDIDO FUEGO 🔥";

  // Automatic Chyron/Zócalo Update on tab switch (only when in active games)
  if (tabId === "show-dia") updateLowerThirdShowDia();
  else if (tabId === "roulette") updateLowerThirdRoulette();
  else if (tabId === "semaforo") updateLowerThirdSemaforo();
  else if (tabId === "ranking") updateLowerThirdRanking();
  else if (tabId === "bandos") updateLowerThirdBandos();
  else if (tabId === "tribunal") updateLowerThirdTribunal();
  else if (tabId === "planner") {
    setPresetZocalo("🧠 SHOW PLANNER", "ANALIZADOR DE TENDENCIAS Y ARMADO DE JUEGO EN VIVO");
  }
}


// =========================================================
// 4. MÓDULO 1: LA RULETA & TINDER BIZARRO (PASO A PASO SHOW)
// =========================================================
function loadInitialRoulette() {
  if (!celebrities.length) return;

  const defaultVictim = celebrities.find(c => c.id === "wanda-nara") || celebrities[0];
  const defaultCandidates = [
    celebrities.find(c => c.id === "mauro-icardi") || celebrities[1],
    celebrities.find(c => c.id === "l-gante") || celebrities[2],
    celebrities.find(c => c.id === "china-suarez") || celebrities[3]
  ];

  setRouletteSetup(defaultVictim, defaultCandidates);
  setRouletteStep(1);
}

function setRouletteSetup(victim, candidates) {
  currentVictim = victim;
  currentCandidates = candidates;
  assignedRoles = { match: null, chongo: null, quemado: null };

  renderRouletteStep1();
  renderRouletteStep2();
  renderRouletteStep3();
  renderRouletteStep4();
  renderRouletteStep5();
  updateLowerThirdRoulette();
}

function setRouletteStep(stepNum) {
  rouletteCurrentStep = stepNum;

  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`rouletteStep${i}`);
    if (stepEl) stepEl.classList.toggle("active", i === stepNum);
  }

  document.querySelectorAll("#rouletteStepper .step-pill").forEach(pill => {
    const pStep = parseInt(pill.dataset.rstep);
    pill.classList.toggle("active", pStep === stepNum);
  });

  const badge = document.getElementById("rouletteStepBadge");
  if (badge) badge.textContent = `PASO ${stepNum} / 5`;

  if (stepNum === 1) audioFX.playFireIgnite();
  else if (stepNum === 2 || stepNum === 3) audioFX.playReveal();
  else if (stepNum === 4) audioFX.playFactosHorn();
  else if (stepNum === 5) audioFX.playMatchChime();

  updateLowerThirdRoulette();
}

// STEP 1: LA VÍCTIMA EN EL BANCO
function renderRouletteStep1() {
  const container = document.getElementById("step1VictimCard");
  if (!container || !currentVictim) return;

  container.innerHTML = `
    <div class="reveal-card-badge">🎯 PASO 1 • LA VÍCTIMA EN EL BANCO</div>
    <div class="reveal-hero-tag-badge">${currentVictim.tag || currentVictim.categoryLabel}</div>
    <h2 class="reveal-hero-name">${currentVictim.name}</h2>
    <div class="reveal-hero-quote">"${currentVictim.quote || currentVictim.bio}"</div>
    
    <div class="reveal-hero-lore-box">
      <span class="lore-box-title">🔎 INVESTIGACIÓN & LORE:</span>
      <p class="lore-box-text">${currentVictim.lore || currentVictim.bio}</p>
    </div>

    <div class="reveal-hero-action">
      <button class="btn-advance-huge" id="btnGoToStep2">
        <span>CONTINUAR ▶ REVELAR CANDIDATO 1 [ESPACIO]</span>
      </button>
    </div>
  `;

  document.getElementById("btnGoToStep2")?.addEventListener("click", () => setRouletteStep(2));
}

// STEP 2: CANDIDATO 1
function renderRouletteStep2() {
  const mini = document.getElementById("step2VictimMini");
  const container = document.getElementById("step2CandidateCard");
  if (!container || !currentCandidates[0] || !currentVictim) return;

  if (mini) {
    mini.innerHTML = `
      <div class="mini-victim-pill">
        <span>🎯 VÍCTIMA:</span>
        <strong>${currentVictim.name}</strong>
      </div>
    `;
  }

  const cand = currentCandidates[0];
  container.innerHTML = `
    <div class="reveal-card-badge cand-badge-1">⚡ PASO 2 • PRIMER CANDIDATO EN MESA</div>
    <div class="reveal-hero-tag-badge cand-badge-1">${cand.tag || cand.categoryLabel}</div>
    <h2 class="reveal-hero-name">${cand.name}</h2>
    <div class="reveal-hero-quote">"${cand.quote || cand.bio}"</div>
    
    <div class="reveal-hero-lore-box">
      <span class="lore-box-title">🔎 ANTECEDENTES & LORE:</span>
      <p class="lore-box-text">${cand.lore || cand.bio}</p>
    </div>

    <div class="reveal-hero-action">
      <button class="btn-advance-huge" id="btnGoToStep3">
        <span>CONTINUAR ▶ REVELAR CANDIDATO 2 [ESPACIO]</span>
      </button>
    </div>
  `;

  document.getElementById("btnGoToStep3")?.addEventListener("click", () => setRouletteStep(3));
}

// STEP 3: CANDIDATO 2
function renderRouletteStep3() {
  const mini = document.getElementById("step3VictimMini");
  const container = document.getElementById("step3CandidateCard");
  if (!container || !currentCandidates[1] || !currentVictim) return;

  if (mini) {
    mini.innerHTML = `
      <div class="mini-victim-pill">
        <span>🎯 VÍCTIMA: <strong>${currentVictim.name}</strong></span>
        <span>• 1° CANDIDATO: <strong>${currentCandidates[0].name}</strong></span>
      </div>
    `;
  }

  const cand = currentCandidates[1];
  container.innerHTML = `
    <div class="reveal-card-badge cand-badge-2">⚡ PASO 3 • SEGUNDO CANDIDATO EN MESA</div>
    <div class="reveal-hero-tag-badge cand-badge-2">${cand.tag || cand.categoryLabel}</div>
    <h2 class="reveal-hero-name">${cand.name}</h2>
    <div class="reveal-hero-quote">"${cand.quote || cand.bio}"</div>
    
    <div class="reveal-hero-lore-box">
      <span class="lore-box-title">🔎 ANTECEDENTES & LORE:</span>
      <p class="lore-box-text">${cand.lore || cand.bio}</p>
    </div>

    <div class="reveal-hero-action">
      <button class="btn-advance-huge" id="btnGoToStep4">
        <span>CONTINUAR ▶ REVELAR CANDIDATO 3 [ESPACIO]</span>
      </button>
    </div>
  `;

  document.getElementById("btnGoToStep4")?.addEventListener("click", () => setRouletteStep(4));
}

// STEP 4: CANDIDATO 3
function renderRouletteStep4() {
  const mini = document.getElementById("step4VictimMini");
  const container = document.getElementById("step4CandidateCard");
  if (!container || !currentCandidates[2] || !currentVictim) return;

  if (mini) {
    mini.innerHTML = `
      <div class="mini-victim-pill">
        <span>🎯 VÍCTIMA: <strong>${currentVictim.name}</strong></span>
        <span>• 1°: <strong>${currentCandidates[0].name}</strong></span>
        <span>• 2°: <strong>${currentCandidates[1].name}</strong></span>
      </div>
    `;
  }

  const cand = currentCandidates[2];
  container.innerHTML = `
    <div class="reveal-card-badge cand-badge-3">💣 PASO 4 • TERCER Y ÚLTIMO CANDIDATO</div>
    <div class="reveal-hero-tag-badge cand-badge-3">${cand.tag || cand.categoryLabel}</div>
    <h2 class="reveal-hero-name">${cand.name}</h2>
    <div class="reveal-hero-quote">"${cand.quote || cand.bio}"</div>
    
    <div class="reveal-hero-lore-box">
      <span class="lore-box-title">🔎 ANTECEDENTES & LORE:</span>
      <p class="lore-box-text">${cand.lore || cand.bio}</p>
    </div>

    <div class="reveal-hero-action">
      <button class="btn-advance-huge btn-fire-glow" id="btnGoToStep5">
        <span>🔥 VER LOS 4 EN PANTALLA & ASIGNAR TRONOS ▶ [ESPACIO]</span>
      </button>
    </div>
  `;

  document.getElementById("btnGoToStep5")?.addEventListener("click", () => setRouletteStep(5));
}

// STEP 5: PANTALLA FINAL - LOS 4 FAMOSOS CON LORE & TRONOS
function renderRouletteStep5() {
  const grid = document.getElementById("finalSquadGrid");
  if (!grid || !currentVictim || currentCandidates.length < 3) return;
  grid.innerHTML = "";

  // 1. Tarjeta de la Víctima
  const victimCard = document.createElement("div");
  victimCard.className = "squad-celeb-card victim-highlight";
  victimCard.innerHTML = `
    <div class="scc-role-badge">🎯 LA VÍCTIMA</div>
    <h3 class="scc-name">${currentVictim.name}</h3>
    <span class="scc-tag">${currentVictim.tag || currentVictim.categoryLabel}</span>
    <p class="scc-quote">"${currentVictim.quote || currentVictim.bio}"</p>
    <div class="scc-lore-expand">
      <strong>LORE INVESTIGADO:</strong>
      <p>${currentVictim.lore || currentVictim.bio}</p>
    </div>
    <div class="scc-victim-status">⚖️ DICTA SENTENCIA EN MESA</div>
  `;
  grid.appendChild(victimCard);

  // 2. Tarjetas de los 3 Candidatos
  currentCandidates.forEach((cand, idx) => {
    const isAssigned = Object.values(assignedRoles).some(a => a && a.id === cand.id);
    const assignedRoleKey = Object.keys(assignedRoles).find(k => assignedRoles[k] && assignedRoles[k].id === cand.id);

    const candCard = document.createElement("div");
    candCard.className = `squad-celeb-card candidate-card ${isAssigned ? 'assigned-role-' + assignedRoleKey : ''}`;
    candCard.dataset.candidateId = cand.id;

    candCard.innerHTML = `
      <div class="scc-role-badge cand-num-badge">⚡ CANDIDATO ${idx + 1}</div>
      <h3 class="scc-name">${cand.name}</h3>
      <span class="scc-tag">${cand.tag || cand.categoryLabel}</span>
      <p class="scc-quote">"${cand.quote || cand.bio}"</p>
      
      <div class="scc-lore-expand">
        <strong>LORE INVESTIGADO:</strong>
        <p>${cand.lore || cand.bio}</p>
      </div>

      <div class="scc-assign-buttons">
        <button class="btn-assign-action match ${assignedRoleKey === 'match' ? 'active' : ''}" data-role="match" title="Casorio formal">
          💍 Casorio
        </button>
        <button class="btn-assign-action chongo ${assignedRoleKey === 'chongo' ? 'active' : ''}" data-role="chongo" title="Chongo clandestino">
          🤫 Chongo
        </button>
        <button class="btn-assign-action quemar ${assignedRoleKey === 'quemado' ? 'active' : ''}" data-role="quemado" title="A la hoguera">
          🔥 Funa
        </button>
      </div>
    `;

    candCard.querySelectorAll(".btn-assign-action").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        assignRole(cand.id, btn.dataset.role);
      });
    });

    grid.appendChild(candCard);
  });

  renderRoleThrones();
}

function renderRoleThrones() {
  const roles = [
    { key: "match", title: "💍 1. CASORIO FORMAL", desc: "Para casamiento, familia y contratos prenupciales" },
    { key: "chongo", title: "🤫 2. CHONGO CLANDESTINO", desc: "Para una noche de boliche a escondidas" },
    { key: "quemado", title: "🔥 3. ¡PRENDIDO FUEGO!", desc: "Cancelación total y cenizas en la hoguera" }
  ];

  roles.forEach(r => {
    const slot = document.getElementById(`slot-${r.key}`);
    if (!slot) return;
    const assigned = assignedRoles[r.key];

    if (assigned) {
      slot.classList.add("has-assigned");
      slot.innerHTML = `
        <div class="throne-header-tag">${r.title}</div>
        <div class="throne-assigned-content">
          <div class="throne-assigned-info">
            <h4 class="throne-assigned-name">${assigned.name}</h4>
            <span class="throne-assigned-tag">${assigned.tag || ''}</span>
          </div>
          <button class="btn-clear-throne" data-role="${r.key}" title="Liberar trono">✕</button>
        </div>
      `;

      slot.querySelector(".btn-clear-throne")?.addEventListener("click", () => {
        assignedRoles[r.key] = null;
        renderRouletteStep5();
        updateLowerThirdRoulette();
      });
    } else {
      slot.classList.remove("has-assigned");
      slot.innerHTML = `
        <div class="throne-header-tag">${r.title}</div>
        <div class="throne-desc">${r.desc}</div>
        <div class="throne-empty-hint">Hacé click en los botones de arriba</div>
      `;
    }
  });
}

function assignRole(candidateId, roleKey) {
  const candidate = currentCandidates.find(c => c.id === candidateId) || celebrities.find(c => c.id === candidateId);
  if (!candidate) return;

  Object.keys(assignedRoles).forEach(k => {
    if (assignedRoles[k] && assignedRoles[k].id === candidate.id) {
      assignedRoles[k] = null;
    }
  });

  assignedRoles[roleKey] = candidate;

  if (roleKey === "match") audioFX.playMatchChime();
  else if (roleKey === "quemado") audioFX.playFireIgnite();
  else audioFX.playTick(450, 0.4);

  renderRouletteStep5();
  updateLowerThirdRoulette();

  const assignedCount = Object.values(assignedRoles).filter(v => v !== null).length;
  if (assignedCount === 3) {
    audioFX.playFactosHorn();
  }
}

function updateLowerThirdRoulette() {
  if (!currentVictim) return;
  const victimName = currentVictim.name.toUpperCase();

  if (rouletteCurrentStep === 1) {
    setPresetZocalo("🎯 LA VÍCTIMA EN EL BANCO", `${victimName} TIENE QUE DECIDIR EL DESTINO DE 3 FAMOSOS`);
  } else if (rouletteCurrentStep === 2 && currentCandidates[0]) {
    setPresetZocalo("⚡ CANDIDATO 1", `${victimName} RECIBIÓ A ${currentCandidates[0].name.toUpperCase()}`);
  } else if (rouletteCurrentStep === 3 && currentCandidates[1]) {
    setPresetZocalo("⚡ CANDIDATO 2", `APARECIÓ ${currentCandidates[1].name.toUpperCase()} PARA PELEAR CON ${currentCandidates[0].name.toUpperCase()}`);
  } else if (rouletteCurrentStep === 4 && currentCandidates[2]) {
    setPresetZocalo("💣 CANDIDATO 3", `EXPLOTÓ LA MESA: APARECIÓ ${currentCandidates[2].name.toUpperCase()}`);
  } else if (rouletteCurrentStep === 5) {
    if (assignedRoles.quemado && assignedRoles.match) {
      setPresetZocalo(
        "🔥 SENTENCIA DE RULETA",
        `${victimName}: CASORIO CON ${assignedRoles.match.name.toUpperCase()} • FUEGO A ${assignedRoles.quemado.name.toUpperCase()}`
      );
    } else {
      setPresetZocalo(
        "👑 JUICIO FINAL EN MESA",
        `${victimName} DECIDE ENTRE ${currentCandidates.map(c => c.name.split(' ')[0].toUpperCase()).join(", ")}`
      );
    }
  }
}

// Wheel Canvas Physics
const WHEEL_SLICES = 12;
const SLICE_COLORS = [
  "#ff1e00", "#ff7b00", "#d500f9", "#ffb703",
  "#ff005b", "#00e676", "#ff3d00", "#ff9100",
  "#9c27b0", "#ffc107", "#ff1744", "#00b0ff"
];

function initRouletteCanvas() {
  rouletteCanvas = document.getElementById("rouletteCanvas");
  if (!rouletteCanvas) return;
  rouletteCtx = rouletteCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  rouletteCanvas.width = 300 * dpr;
  rouletteCanvas.height = 300 * dpr;
  rouletteCtx.scale(dpr, dpr);
  drawWheel();
}

function drawWheel(currentRotAngle = wheelAngle) {
  if (!rouletteCtx) return;
  const size = 300;
  const center = size / 2;
  const radius = center - 10;
  const sliceAngle = (2 * Math.PI) / WHEEL_SLICES;

  rouletteCtx.clearRect(0, 0, size, size);
  rouletteCtx.save();
  rouletteCtx.translate(center, center);
  rouletteCtx.rotate(currentRotAngle);

  for (let i = 0; i < WHEEL_SLICES; i++) {
    const startA = i * sliceAngle;
    const endA = startA + sliceAngle;

    rouletteCtx.beginPath();
    rouletteCtx.moveTo(0, 0);
    rouletteCtx.arc(0, 0, radius, startA, endA);
    rouletteCtx.closePath();
    rouletteCtx.fillStyle = SLICE_COLORS[i % SLICE_COLORS.length];
    rouletteCtx.fill();

    rouletteCtx.lineWidth = 2;
    rouletteCtx.strokeStyle = "rgba(10, 10, 15, 0.6)";
    rouletteCtx.stroke();

    rouletteCtx.save();
    rouletteCtx.rotate(startA + sliceAngle / 2);
    rouletteCtx.textAlign = "right";
    rouletteCtx.fillStyle = "#ffffff";
    rouletteCtx.font = "bold 13px Bebas Neue, Montserrat";
    rouletteCtx.shadowColor = "rgba(0,0,0,0.8)";
    rouletteCtx.shadowBlur = 4;

    const labels = ["🔥 FUEGO", "💍 MATCH", "🤫 CHONGO", "GH", "TRAP", "BOTINERA", "POLÍTICA", "AURA", "CARETA", "STREAM", "NOCHE", "RED FLAG"];
    rouletteCtx.fillText(labels[i % labels.length], radius - 20, 5);
    rouletteCtx.restore();
  }

  rouletteCtx.restore();
}

function spinRoulette() {
  if (isSpinning) return;
  isSpinning = true;
  const spinBtn = document.getElementById("spinBtn");
  if (spinBtn) spinBtn.disabled = true;

  audioFX.init();

  const shuffled = [...celebrities].sort(() => 0.5 - Math.random());
  const newVictim = shuffled[0];
  const newCandidates = shuffled.slice(1, 4);

  const startRot = wheelAngle;
  const totalRots = 5 + Math.random() * 4;
  const targetRot = startRot + totalRots * Math.PI * 2;
  const duration = 3500;
  const startTime = performance.now();

  let lastTickAngle = startRot;
  const pinStep = (Math.PI * 2) / WHEEL_SLICES;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const currentAngle = startRot + (targetRot - startRot) * ease;
    wheelAngle = currentAngle;

    drawWheel(currentAngle);

    if (Math.abs(currentAngle - lastTickAngle) >= pinStep) {
      audioFX.playTick(550 + Math.random() * 100, 0.25);
      lastTickAngle = currentAngle;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      if (spinBtn) spinBtn.disabled = false;
      setRouletteSetup(newVictim, newCandidates);
      setRouletteStep(1);
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn")?.addEventListener("click", spinRoulette);
document.getElementById("wheelCenterBtn")?.addEventListener("click", spinRoulette);
document.getElementById("btnRouletteSpinAgain")?.addEventListener("click", spinRoulette);

document.querySelectorAll("#rouletteStepper .step-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    const step = parseInt(pill.dataset.rstep);
    setRouletteStep(step);
  });
});

// =========================================================
// 5. MÓDULO 2: EL SEMÁFORO DE TOXICIDAD 2.0 (RONDA DE 10 GAMIFICADA)
// =========================================================
function startSemaforoRound() {
  if (typeof SEMAFORO_CASES === "undefined" || !SEMAFORO_CASES.length) return;
  
  // Pick 10 random cases from the 100 cases
  const shuffled = [...SEMAFORO_CASES].sort(() => 0.5 - Math.random());
  semaforoRoundCases = shuffled.slice(0, 10);
  semaforoRoundIndex = 0;
  semaforoRoundVotes = [];

  document.getElementById("semaforoPlayCard").style.display = "block";
  document.getElementById("semaforoResultsCard").style.display = "none";

  renderSemaforoRoundCurrent();
}

function renderSemaforoRoundCurrent() {
  if (!semaforoRoundCases.length) return;
  const item = semaforoRoundCases[semaforoRoundIndex];

  const cat = document.getElementById("semaforoCategory");
  const count = document.getElementById("semaforoCounter");
  const text = document.getElementById("semaforoText");

  if (cat) cat.textContent = (item.category || "RED FLAGS").toUpperCase();
  if (count) count.textContent = `SITUACIÓN ${semaforoRoundIndex + 1} / 10`;
  if (text) text.textContent = item.text;

  document.querySelectorAll(".semaforo-giant-btn").forEach(btn => btn.classList.remove("active"));
  
  // Highlight if previously voted in this round
  if (semaforoRoundVotes[semaforoRoundIndex]) {
    const prev = semaforoRoundVotes[semaforoRoundIndex];
    document.querySelector(`.semaforo-giant-btn[data-level="${prev}"]`)?.classList.add("active");
  }

  updateLowerThirdSemaforo();
}

function selectSemaforoLevel(level) {
  semaforoRoundVotes[semaforoRoundIndex] = level;

  document.querySelectorAll(".semaforo-giant-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.level === level);
  });

  if (level === "verde") audioFX.playMatchChime();
  else if (level === "amarillo") audioFX.playTick(400, 0.4);
  else if (level === "rojo") audioFX.playBuzzer();
  else if (level === "fuego") audioFX.playFireIgnite();

  const item = semaforoRoundCases[semaforoRoundIndex];
  setPresetZocalo(
    `🚦 SEMÁFORO (${semaforoRoundIndex + 1}/10)`,
    `${item.title.toUpperCase()}: LA MESA VOTÓ ${level.toUpperCase()}`
  );

  // If completed 10 questions, transition to Results Card!
  if (semaforoRoundVotes.filter(v => v).length === 10) {
    setTimeout(() => {
      renderSemaforoResults();
    }, 600);
  }
}

function renderSemaforoResults() {
  const counts = { verde: 0, amarillo: 0, rojo: 0, fuego: 0 };
  semaforoRoundVotes.forEach(v => {
    if (counts.hasOwnProperty(v)) counts[v]++;
  });

  document.getElementById("statCountVerde").textContent = counts.verde;
  document.getElementById("statCountAmarillo").textContent = counts.amarillo;
  document.getElementById("statCountRojo").textContent = counts.rojo;
  document.getElementById("statCountFuego").textContent = counts.fuego;

  const totalToxic = counts.rojo + counts.fuego;
  const diagTitle = document.getElementById("srcDiagTitle");
  const diagDesc = document.getElementById("srcDiagDesc");

  let headlineText = "";
  if (counts.fuego >= 4 || totalToxic >= 7) {
    diagTitle.textContent = "🔥 MESA PRENDIDA FUEGO (NIVEL WANDAGATE)";
    diagDesc.textContent = `La mesa votó ${totalToxic} situaciones como Red Flag y Fuego Nuclear. Nivel de toxicidad extrema: peligro de allanamiento y cancelación en Twitter.`;
    headlineText = "PERFIL TOXICOLÓGICO: MESA PRENDIDA FUEGO (NIVEL WANDAGATE)";
    audioFX.playAirHornSiren();
  } else if (counts.amarillo >= 4) {
    diagTitle.textContent = "🥺 MESA MIGAJERA: APEGO ANSIOSO & TAROT";
    diagDesc.textContent = `Votaron ${counts.amarillo} situaciones como 'Alerta Migajera'. A esta mesa le sobra perdón, le falta amor propio y se quedan esperando al chongo hasta las 4 AM.`;
    headlineText = "PERFIL TOXICOLÓGICO: MESA MIGAJERA (APEGO ANSIOSO Y TAROT)";
    audioFX.playCringe();
  } else if (counts.verde >= 5) {
    diagTitle.textContent = "😇 MESA TIBIA: PAREJA DE 50 AÑOS";
    diagDesc.textContent = `Votaron ${counts.verde} situaciones como 'Verde / Pasa'. Cero conflicto, cero toxicidad, parecen un matrimonio de jubilados tomando mate en la plaza.`;
    headlineText = "PERFIL TOXICOLÓGICO: MESA TIBIA (CERO TOXICIDAD)";
    audioFX.playMatchChime();
  } else {
    diagTitle.textContent = "⚖️ MESA EN EQUILIBRIO TÓXICO MODERADO";
    diagDesc.textContent = `Resultados repartidos entre banderas rojas y verdes. La mesa maneja la toxicidad justa para sobrevivir a la noche porteña sin terminar en comisaría.`;
    headlineText = "PERFIL TOXICOLÓGICO: EQUILIBRIO TÓXICO MODERADO";
    audioFX.playFactosHorn();
  }

  document.getElementById("semaforoPlayCard").style.display = "none";
  document.getElementById("semaforoResultsCard").style.display = "block";

  setPresetZocalo("👑 PERFIL TOXICOLÓGICO FINAL", headlineText);
}

function updateLowerThirdSemaforo() {
  if (!semaforoRoundCases.length) return;
  const item = semaforoRoundCases[semaforoRoundIndex];
  setPresetZocalo(
    `🚦 SEMÁFORO DE RED FLAGS (${semaforoRoundIndex + 1}/10)`,
    `${item.title.toUpperCase()}: ¿VERDE, AMARILLO, ROJO O FUEGO?`
  );
}

document.getElementById("btnPrevSemaforo")?.addEventListener("click", () => {
  if (semaforoRoundIndex > 0) {
    semaforoRoundIndex--;
    renderSemaforoRoundCurrent();
  }
});

document.getElementById("btnNextSemaforo")?.addEventListener("click", () => {
  if (semaforoRoundIndex < 9) {
    semaforoRoundIndex++;
    renderSemaforoRoundCurrent();
  } else {
    renderSemaforoResults();
  }
});

document.getElementById("btnResetSemaforoRound")?.addEventListener("click", startSemaforoRound);
document.getElementById("btnPlayAnotherRound")?.addEventListener("click", startSemaforoRound);

document.querySelectorAll(".semaforo-giant-btn").forEach(btn => {
  btn.addEventListener("click", () => selectSemaforoLevel(btn.dataset.level));
});

// =========================================================
// 6. MÓDULO 3: EL RANKING INTERACTIVO DE TRAICIÓN & CARETAS
// =========================================================
function loadRankingSet(index) {
  if (typeof RANKING_DATA === "undefined" || !RANKING_DATA.length) return;
  if (index < 0) index = RANKING_DATA.length - 1;
  if (index >= RANKING_DATA.length) index = 0;
  currentRankingIndex = index;

  const set = RANKING_DATA[currentRankingIndex];
  document.getElementById("rankingCounter").textContent = `RANKING ${currentRankingIndex + 1} / ${RANKING_DATA.length}`;
  document.getElementById("rankingTitle").textContent = set.title;
  document.getElementById("rankingDesc").textContent = set.description;

  currentRankingItems = [...set.candidates];
  renderRankingStack();
  updateLowerThirdRanking();
}

function renderRankingStack() {
  const stack = document.getElementById("rankingStack");
  if (!stack) return;
  stack.innerHTML = "";

  currentRankingItems.forEach((cand, idx) => {
    const card = document.createElement("div");
    card.className = "ranking-item-card";
    card.innerHTML = `
      <div class="rank-position-pill">#${idx + 1}</div>
      
      <div class="rank-info">
        <div class="rank-name">${cand.name}</div>
        <div class="rank-crime-tag">⚠️ ${cand.crime || cand.tag || ''}</div>
        <p class="rank-lore-snippet">${cand.lore || ''}</p>
      </div>

      <div class="rank-scores-box">
        <div class="score-badge">
          <span class="score-badge-label">AURA</span>
          <span class="score-badge-val">${cand.auraScore || '8.5'}</span>
        </div>
        <div class="score-badge score-traicion">
          <span class="score-badge-label">TRAICIÓN</span>
          <span class="score-badge-val">${cand.traicionScore || '9.0'}</span>
        </div>
      </div>

      <div class="rank-reorder-controls">
        <button class="btn-rank-move" data-dir="up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''} title="Subir de puesto">⬆️</button>
        <button class="btn-rank-move" data-dir="down" data-idx="${idx}" ${idx === currentRankingItems.length - 1 ? 'disabled' : ''} title="Bajar de puesto">⬇️</button>
      </div>
    `;

    card.querySelectorAll(".btn-rank-move").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemIdx = parseInt(btn.dataset.idx);
        const dir = btn.dataset.dir;
        if (dir === "up" && itemIdx > 0) {
          swapRankingItems(itemIdx, itemIdx - 1);
        } else if (dir === "down" && itemIdx < currentRankingItems.length - 1) {
          swapRankingItems(itemIdx, itemIdx + 1);
        }
      });
    });

    stack.appendChild(card);
  });
}

function swapRankingItems(i, j) {
  const temp = currentRankingItems[i];
  currentRankingItems[i] = currentRankingItems[j];
  currentRankingItems[j] = temp;
  audioFX.playTick(550, 0.3);
  renderRankingStack();
}

function confirmRankingVerdict() {
  if (!currentRankingItems.length) return;
  const winner = currentRankingItems[0];
  const set = RANKING_DATA[currentRankingIndex];

  audioFX.playFactosHorn();
  setPresetZocalo(
    `🏆 PODIO: ${set.title.toUpperCase()}`,
    `EL #1 INDISCUTIDO ES ${winner.name.toUpperCase()} (${winner.crime.toUpperCase()})`
  );
}

function updateLowerThirdRanking() {
  if (typeof RANKING_DATA === "undefined" || !RANKING_DATA.length) return;
  const set = RANKING_DATA[currentRankingIndex];
  setPresetZocalo(
    `📊 EL RANKING DE TRAICIÓN`,
    `${set.title.toUpperCase()} • DEBATE Y ORDENAMIENTO EN VIVO`
  );
}

document.getElementById("btnPrevRanking")?.addEventListener("click", () => loadRankingSet(currentRankingIndex - 1));
document.getElementById("btnNextRanking")?.addEventListener("click", () => loadRankingSet(currentRankingIndex + 1));
document.getElementById("btnConfirmRanking")?.addEventListener("click", confirmRankingVerdict);

// =========================================================
// 7. MÓDULO 4: GUERRA DE BANDOS (¿A QUIÉN BANCÁS?)
// =========================================================
function loadBandoDuel(index) {
  if (typeof GUERRA_BANDOS_DATA === "undefined" || !GUERRA_BANDOS_DATA.length) return;
  if (index < 0) index = GUERRA_BANDOS_DATA.length - 1;
  if (index >= GUERRA_BANDOS_DATA.length) index = 0;
  currentBandoIndex = index;

  const duel = GUERRA_BANDOS_DATA[currentBandoIndex];
  bandoVotes = { a: 1, b: 1 };

  document.getElementById("bandoCounter").textContent = `DUELO ${currentBandoIndex + 1} / ${GUERRA_BANDOS_DATA.length}`;
  document.getElementById("bandoTitle").textContent = duel.title;

  // Side A
  document.getElementById("bandoSideAName").textContent = duel.sideA.name;
  document.getElementById("bandoSideABadge").textContent = duel.sideA.badge;
  document.getElementById("bandoSideAArg").textContent = `"${duel.sideA.argument}"`;

  // Side B
  document.getElementById("bandoSideBName").textContent = duel.sideB.name;
  document.getElementById("bandoSideBBadge").textContent = duel.sideB.badge;
  document.getElementById("bandoSideBArg").textContent = `"${duel.sideB.argument}"`;

  updateBandoMeter();
  updateLowerThirdBandos();
}

function voteBando(side) {
  if (side === "a") {
    bandoVotes.a += 1;
    audioFX.playTick(600, 0.4);
  } else {
    bandoVotes.b += 1;
    audioFX.playTick(450, 0.4);
  }
  updateBandoMeter();
}

function updateBandoMeter() {
  const total = bandoVotes.a + bandoVotes.b;
  const pctA = Math.round((bandoVotes.a / total) * 100);
  const pctB = 100 - pctA;

  document.getElementById("bandoPctA").textContent = `${pctA}%`;
  document.getElementById("bandoPctB").textContent = `${pctB}%`;
  document.getElementById("meterFillA").style.width = `${pctA}%`;
  document.getElementById("meterFillB").style.width = `${pctB}%`;
}

function updateLowerThirdBandos() {
  if (typeof GUERRA_BANDOS_DATA === "undefined" || !GUERRA_BANDOS_DATA.length) return;
  const d = GUERRA_BANDOS_DATA[currentBandoIndex];
  setPresetZocalo(
    `⚔️ GUERRA DE BANDOS`,
    `¿A QUIÉN BANCÁS? ${d.sideA.name.toUpperCase()} VS. ${d.sideB.name.toUpperCase()}`
  );
}

document.getElementById("btnPrevBando")?.addEventListener("click", () => loadBandoDuel(currentBandoIndex - 1));
document.getElementById("btnNextBando")?.addEventListener("click", () => loadBandoDuel(currentBandoIndex + 1));
document.getElementById("btnVoteSideA")?.addEventListener("click", () => voteBando("a"));
document.getElementById("btnVoteSideB")?.addEventListener("click", () => voteBando("b"));

// =========================================================
// 8. MÓDULO 5: EL TRIBUNAL DE FARÁNDULA (DILEMAS MORALES)
// =========================================================
function setTribunalPhase(phaseNum) {
  tribunalCurrentPhase = phaseNum;

  document.getElementById("tribunalPhase1").classList.toggle("active", phaseNum === 1);
  document.getElementById("tribunalPhase2").classList.toggle("active", phaseNum === 2);
  document.getElementById("tribunalPhase3").classList.toggle("active", phaseNum === 3);

  document.querySelectorAll("#tribunalStepper .step-pill").forEach(pill => {
    pill.classList.toggle("active", parseInt(pill.dataset.step) === phaseNum);
  });

  if (phaseNum === 2) audioFX.playReveal();
}

function loadTribunalCase(index) {
  if (typeof TRIBUNAL_CASES === "undefined" || !TRIBUNAL_CASES.length) return;
  if (index < 0) index = TRIBUNAL_CASES.length - 1;
  if (index >= TRIBUNAL_CASES.length) index = 0;
  currentTribunalIndex = index;

  const currentCase = TRIBUNAL_CASES[currentTribunalIndex];
  tribunalVotes = { holder: null, diane: null, luli: null };

  const counterEl = document.getElementById("tribunalCounter");
  const catEl = document.getElementById("tribunalCategory");
  const titleEl = document.getElementById("tribunalTitle");
  const qNameEl = document.getElementById("tribunalProtagonistName");
  const ctxEl = document.getElementById("tribunalContext");
  const quoteEl = document.getElementById("tribunalProtagonistQuote");

  if (counterEl) counterEl.textContent = `CASO ${currentTribunalIndex + 1} / ${TRIBUNAL_CASES.length}`;
  if (catEl) catEl.textContent = (currentCase.category || "FARÁNDULA").toUpperCase();
  if (titleEl) titleEl.textContent = currentCase.title;
  if (qNameEl) qNameEl.textContent = (currentCase.protagonist || "WANDA NARA").toUpperCase();
  if (ctxEl) ctxEl.textContent = currentCase.context;
  if (quoteEl) quoteEl.textContent = `"${currentCase.quote || '¿Qué harías vos en su lugar?'}"`;

  renderTribunalCards(currentCase.options);
  resetTribunalPodiums();
  setTribunalPhase(1);
  updateLowerThirdTribunal();
}

function renderTribunalCards(options) {
  const container = document.getElementById("tribunalCardsGrid");
  if (!container) return;
  container.innerHTML = "";

  options.forEach((opt) => {
    const card = document.createElement("div");
    card.className = `tribunal-option-card style-${opt.style || 'holder'}`;
    card.innerHTML = `
      <span class="opt-letter-tag">OPCIÓN ${opt.id}</span>
      <h4 class="opt-title">${opt.title}</h4>
      <p class="opt-desc">${opt.text}</p>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".tribunal-option-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      audioFX.playTick(500, 0.3);
    });

    container.appendChild(card);
  });
}

function resetTribunalPodiums() {
  ["holder", "diane", "luli"].forEach(cond => {
    const pill = document.getElementById(`voteLock${cond.charAt(0).toUpperCase() + cond.slice(1)}`);
    if (pill) {
      pill.textContent = "-";
      pill.style.background = "#1e293b";
      pill.style.borderColor = "white";
    }
  });

  document.querySelectorAll(".btn-vote-key").forEach(btn => btn.classList.remove("voted"));
  const banner = document.getElementById("verdictDecisionText");
  if (banner) banner.textContent = "Seleccioná los votos de los 3 conductores para dictar la sentencia oficial.";
}

function voteConductor(conductor, choice) {
  tribunalVotes[conductor] = choice;

  const pill = document.getElementById(`voteLock${conductor.charAt(0).toUpperCase() + conductor.slice(1)}`);
  if (pill) {
    pill.textContent = choice;
    pill.style.background = choice === "A" ? "#ff7a00" : (choice === "B" ? "#00e676" : "#d500f9");
    pill.style.borderColor = "#ffffff";
  }

  document.querySelectorAll(`.btn-vote-key[data-conductor="${conductor}"]`).forEach(btn => {
    btn.classList.toggle("voted", btn.dataset.choice === choice);
  });

  audioFX.playTick(600, 0.4);
  checkTribunalFinalVerdict();
}

function checkTribunalFinalVerdict() {
  const votes = Object.values(tribunalVotes).filter(v => v !== null);
  if (votes.length === 3) {
    const counts = { A: 0, B: 0, C: 0 };
    votes.forEach(v => counts[v] = (counts[v] || 0) + 1);

    let winner = "A";
    if (counts.B > counts[winner]) winner = "B";
    if (counts.C > counts[winner]) winner = "C";

    const currentCase = TRIBUNAL_CASES[currentTribunalIndex];
    const winningOption = currentCase.options.find(o => o.id === winner);

    const banner = document.getElementById("verdictDecisionText");
    if (banner && winningOption) {
      banner.innerHTML = `🏆 <strong style="color: var(--fire-yellow);">LA MESA SENTENCIÓ: OPCIÓN ${winner} (${winningOption.title.toUpperCase()})</strong>`;
      audioFX.playFactosHorn();
      setPresetZocalo(
        `⚖️ VEREDICTO DE LA MESA (${winner})`,
        `${currentCase.protagonist.toUpperCase()}: GANÓ "${winningOption.title.toUpperCase()}"`
      );
    }
  }
}

function updateLowerThirdTribunal() {
  if (typeof TRIBUNAL_CASES === "undefined" || !TRIBUNAL_CASES.length) return;
  const c = TRIBUNAL_CASES[currentTribunalIndex];
  setPresetZocalo(
    `⚖️ TRIBUNAL DE FARÁNDULA`,
    `¿QUÉ HARÍAS VOS EN EL LUGAR DE ${c.protagonist.toUpperCase()}? ${c.title.toUpperCase()}`
  );
}

document.getElementById("btnRevealTribunalOptions")?.addEventListener("click", () => setTribunalPhase(2));
document.getElementById("btnBackToDilemma")?.addEventListener("click", () => setTribunalPhase(1));
document.getElementById("btnGoToVoting")?.addEventListener("click", () => setTribunalPhase(3));
document.getElementById("btnBackToOptions")?.addEventListener("click", () => setTribunalPhase(2));
document.getElementById("btnNextCaseDirect")?.addEventListener("click", () => loadTribunalCase(currentTribunalIndex + 1));
document.getElementById("btnPrevTribunal")?.addEventListener("click", () => loadTribunalCase(currentTribunalIndex - 1));
document.getElementById("btnNextTribunal")?.addEventListener("click", () => loadTribunalCase(currentTribunalIndex + 1));

document.querySelectorAll("#tribunalStepper .step-pill").forEach(pill => {
  pill.addEventListener("click", () => setTribunalPhase(parseInt(pill.dataset.step)));
});

document.querySelectorAll(".btn-vote-key").forEach(btn => {
  btn.addEventListener("click", () => {
    voteConductor(btn.dataset.conductor, btn.dataset.choice);
  });
});

// =========================================================
// 9. MÓDULO 6: GENERADOR DE ZÓCALOS (GRAPH EN VIVO)
// =========================================================
function setPresetZocalo(tag, headline) {
  const tagEl = document.getElementById("lowerThirdTag");
  const headEl = document.getElementById("lowerThirdHeadline");
  const inputTag = document.getElementById("inputCustomTag");
  const inputHead = document.getElementById("inputCustomHeadline");
  const banner = document.getElementById("lowerThirdBanner");

  if (tagEl) tagEl.textContent = tag;
  if (headEl) headEl.textContent = headline;
  if (inputTag) inputTag.value = tag;
  if (inputHead) inputHead.value = headline;

  if (banner) {
    banner.classList.remove("updated");
    void banner.offsetWidth;
    banner.classList.add("updated");
  }
}

function setupZocaloEvents() {
  document.getElementById("btnPushZocalo")?.addEventListener("click", () => {
    const tag = document.getElementById("inputCustomTag").value;
    const headline = document.getElementById("inputCustomHeadline").value;
    setPresetZocalo(tag, headline);
    audioFX.playFactosHorn();
  });
}

// =========================================================
// 10. RELOJ DE DEBATE
// =========================================================
function setupTimer() {
  const topVal = document.getElementById("topbarTimerVal");
  const sideVal = document.getElementById("sidebarTimerDisplay");
  const topPlay = document.getElementById("topbarTimerPlay");
  const sidePlay = document.getElementById("sidebarTimerStart");

  function updateTimerDisplays() {
    if (topVal) topVal.textContent = `${timerSeconds}s`;
    if (sideVal) sideVal.textContent = `${timerSeconds}s`;
  }

  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      if (topPlay) topPlay.textContent = "▶";
      if (sidePlay) sidePlay.textContent = "▶ INICIAR [T]";
    } else {
      timerRunning = true;
      if (topPlay) topPlay.textContent = "⏸";
      if (sidePlay) sidePlay.textContent = "⏸ PAUSAR [T]";
      audioFX.init();

      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          timerSeconds--;
          updateTimerDisplays();
          if (timerSeconds <= 5) audioFX.playTimerBeep(timerSeconds === 0);
        } else {
          clearInterval(timerInterval);
          timerRunning = false;
          audioFX.playBuzzer();
          if (topPlay) topPlay.textContent = "▶";
          if (sidePlay) sidePlay.textContent = "▶ INICIAR [T]";
          timerSeconds = timerInitial;
          updateTimerDisplays();
        }
      }, 1000);
    }
  }

  topPlay?.addEventListener("click", toggleTimer);
  sidePlay?.addEventListener("click", toggleTimer);

  document.querySelectorAll(".btn-timer-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      timerInitial = parseInt(btn.dataset.seconds);
      timerSeconds = timerInitial;
      updateTimerDisplays();
      if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        if (topPlay) topPlay.textContent = "▶";
        if (sidePlay) sidePlay.textContent = "▶ INICIAR [T]";
      }
    });
  });
}

// =========================================================
// 11. BOTÓN DE FUNA / MANDAR AL BANCO (30s DERECHO A RÉPLICA)
// =========================================================
function setupFunaModal() {
  const modal = document.getElementById("vetoModal");
  const btnTrigger = document.getElementById("btnTriggerVeto");
  const btnTopFuna = document.getElementById("btnTopFuna");
  const btnClose = document.getElementById("btnCloseVeto");
  const btnZafo = document.getElementById("btnFunaZafo");
  const btnCancelado = document.getElementById("btnFunaCancelado");

  btnTrigger?.addEventListener("click", () => triggerFunaModal());
  btnTopFuna?.addEventListener("click", () => triggerFunaModal());
  btnClose?.addEventListener("click", closeFunaModal);

  // Accused Selector Chips
  document.querySelectorAll(".btn-accused-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".btn-accused-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentAccused = chip.dataset.accused;
      audioFX.playTick(500, 0.2);
    });
  });

  // Veredicto: Se justificó bien (Zafó)
  btnZafo?.addEventListener("click", () => {
    resolveFuna("zafo");
  });

  // Veredicto: ¡Cancelado / Funado Total!
  btnCancelado?.addEventListener("click", () => {
    resolveFuna("cancelado");
  });
}

function triggerFunaModal(conductor = "holder") {
  const modal = document.getElementById("vetoModal");
  const countEl = document.getElementById("vetoCountdown");
  if (!modal) return;

  currentAccused = conductor;
  document.querySelectorAll(".btn-accused-chip").forEach(c => {
    c.classList.toggle("active", c.dataset.accused === conductor);
  });

  modal.classList.add("active");
  vetoSeconds = 30;
  if (countEl) countEl.textContent = vetoSeconds;
  audioFX.playAirHornSiren();

  const nameMap = { holder: "TOMÁS HOLDER", diane: "DIANE CARACCHI", luli: "LULI CASÉ" };
  setPresetZocalo(
    "🚨 ALERTA DE FUNA EN VIVO",
    `${nameMap[currentAccused] || 'CONDUCTOR'} FUE MANDADO AL BANCO • 30s DE DERECHO A RÉPLICA`
  );

  clearInterval(vetoInterval);
  vetoRunning = true;
  vetoInterval = setInterval(() => {
    if (vetoSeconds > 0) {
      vetoSeconds--;
      if (countEl) countEl.textContent = vetoSeconds;
      if (vetoSeconds <= 5) audioFX.playTimerBeep(vetoSeconds === 0);
    } else {
      clearInterval(vetoInterval);
      vetoRunning = false;
      audioFX.playBuzzer();
    }
  }, 1000);
}

function resolveFuna(verdict) {
  const nameMap = { holder: "TOMÁS HOLDER", diane: "DIANE CARACCHI", luli: "LULI CASÉ" };
  const targetName = nameMap[currentAccused] || "CONDUCTOR";

  if (verdict === "zafo") {
    audioFX.playMatchChime();
    setPresetZocalo(
      "🟢 ZAFÓ DE LA FUNA",
      `LA MESA LE CREYÓ A ${targetName}: SE JUSTIFICÓ BIEN Y SALIÓ DEL BANCO`
    );
  } else if (verdict === "cancelado") {
    adjustFuna(currentAccused, 1);
    audioFX.playBuzzer();
    audioFX.playFireIgnite();
    setPresetZocalo(
      "💀 ¡FUNADO TOTAL!",
      `${targetName} FUE AL BANCO Y LA MESA LO SENTENCIÓ: CANCELADO (+1 FUNA)`
    );
  }

  closeFunaModal();
}

function closeFunaModal() {
  const modal = document.getElementById("vetoModal");
  if (modal) modal.classList.remove("active");
  clearInterval(vetoInterval);
  vetoRunning = false;
}

// =========================================================
// 12. TECLADO & SHORTCUTS DE ESTUDIO (TRANSMISIÓN EN VIVO)
// =========================================================
function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

    const key = e.key.toUpperCase();
    const modal = document.getElementById("vetoModal");
    const isModalOpen = modal && modal.classList.contains("active");

    if (isModalOpen) {
      if (key === "Z") {
        resolveFuna("zafo");
        return;
      } else if (key === "C") {
        resolveFuna("cancelado");
        return;
      } else if (key === "ESCAPE") {
        closeFunaModal();
        return;
      }
    }

    if (e.code === "Space") {
      e.preventDefault();
      if (currentTab === "show-dia") {
        nextShowDiaStep();
      } else if (currentTab === "roulette") {
        if (rouletteCurrentStep < 5) setRouletteStep(rouletteCurrentStep + 1);
        else spinRoulette();
      } else if (currentTab === "semaforo") {
        if (document.getElementById("semaforoResultsCard").style.display === "block") {
          startSemaforoRound();
        } else if (semaforoRoundIndex < 9) {
          semaforoRoundIndex++;
          renderSemaforoRoundCurrent();
        } else {
          renderSemaforoResults();
        }
      } else if (currentTab === "tribunal") {
        if (tribunalCurrentPhase < 3) setTribunalPhase(tribunalCurrentPhase + 1);
        else loadTribunalCase(currentTribunalIndex + 1);
      } else if (currentTab === "home") {
        startShowDia("today");
      }
    } else if (key === "M") {
      const sidebar = document.getElementById("studioSidebar");
      const overlay = document.getElementById("sidebarOverlay");
      sidebar?.classList.toggle("open");
      overlay?.classList.toggle("active");
    } else if (key === "O") {
      toggleOBSMode();
    } else if (key === "F") {
      if (currentTab === "show-dia" && currentShowStep === 3) {
        voteShowSemaforo("fuego");
      } else {
        toggleFullscreen();
      }
    } else if (key === "T") {
      document.getElementById("topbarTimerPlay")?.click();
    } else if (key === "V") {
      if (currentTab === "show-dia" && currentShowStep === 3) {
        voteShowSemaforo("verde");
      } else {
        triggerSoundEffect("siren");
      }
    } else if (key === "A") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 2) selectShowTribunal("A");
        else if (currentShowStep === 3) voteShowSemaforo("amarillo");
      }
    } else if (key === "B") {
      if (currentTab === "show-dia" && currentShowStep === 2) {
        selectShowTribunal("B");
      }
    } else if (key === "C") {
      if (currentTab === "show-dia" && currentShowStep === 2) {
        selectShowTribunal("C");
      }
    } else if (key === "R") {
      if (currentTab === "show-dia" && currentShowStep === 3) {
        voteShowSemaforo("rojo");
      } else if (currentTab === "roulette") spinRoulette();
      else if (currentTab === "semaforo") startSemaforoRound();
    } else if (key === "N") {
      if (currentTab === "show-dia") nextShowDiaStep();
      else if (currentTab === "semaforo") {
        if (semaforoRoundIndex < 9) {
          semaforoRoundIndex++;
          renderSemaforoRoundCurrent();
        } else {
          renderSemaforoResults();
        }
      } else if (currentTab === "ranking") loadRankingSet(currentRankingIndex + 1);
      else if (currentTab === "bandos") loadBandoDuel(currentBandoIndex + 1);
      else if (currentTab === "tribunal") loadTribunalCase(currentTribunalIndex + 1);
    } else if (key === "1") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 1) voteShowBando("a");
        else if (currentShowStep === 2) selectShowTribunal("A");
        else if (currentShowStep === 4) assignShowThrone("casorio");
      } else if (currentTab === "bandos") voteBando("a");
      triggerSoundEffect("fire");
    } else if (key === "2") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 1) voteShowBando("b");
        else if (currentShowStep === 2) selectShowTribunal("B");
        else if (currentShowStep === 4) assignShowThrone("chongo");
      } else if (currentTab === "bandos") voteBando("b");
      triggerSoundEffect("factos");
    } else if (key === "3") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 2) selectShowTribunal("C");
        else if (currentShowStep === 4) assignShowThrone("funa");
      }
      triggerSoundEffect("buzzer");
    } else if (key === "4") {
      triggerSoundEffect("match");
    } else if (key === "5") {
      triggerSoundEffect("cringe");
    } else if (key === "ESCAPE") {
      closeFunaModal();
    }

  });
}

// =========================================================
// 13. PARTICLES ENGINE (CHISPAS & CENIZAS VOLÁTILES)
// =========================================================
function initParticles() {
  particlesCanvas = document.getElementById("particlesCanvas");
  if (!particlesCanvas) return;
  particlesCtx = particlesCanvas.getContext("2d");

  function resize() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const count = 45;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      radius: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 1.5 + 0.5),
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.4 ? "#ff4500" : "#ffb703"
    });
  }

  function render() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y < 0) {
        p.y = particlesCanvas.height + 10;
        p.x = Math.random() * particlesCanvas.width;
      }
      particlesCtx.beginPath();
      particlesCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      particlesCtx.fillStyle = p.color;
      particlesCtx.globalAlpha = p.alpha;
      particlesCtx.fill();
    });
    particlesCtx.globalAlpha = 1;
    requestAnimationFrame(render);
  }
  render();
}

// =========================================================
// 14. MÓDULO 7: PRODUCTOR DE TENDENCIAS & RUNDOWN DEL DÍA
// =========================================================
let currentGeneratedBando = null;
let currentGeneratedTribunal = null;
let currentGeneratedSemaforo = null;
let currentGeneratedZocalo = null;

const TREND_PRESETS = {
  joaqui: "Luck Ra se separó de La Joaqui porque ella compró una casa al lado para armar familia ensamblada y él sintió asfixia a sus 25 años y con giras. Ahora él volvió a hablar con su ex Guille Giles, que era re amiga de La Joaqui.",
  chino: "Martín El Chino Ku fue visto saliendo de un telo en Rosario con Gisela Gordillo, la mamá de Tomás Holder. La mamá mostró chats donde El Chino le decía que lo de ser virgo en Gran Hermano era un personaje y que estaba soltero, desatando la crisis con su novia Marisol.",
  enzo: "Enzo Fernández le pidió a Valentina Cervantes separarse en Londres porque fue papá a los 19 y siente que se salteó la etapa de la juventud y la soltería. Valentina volvió con sus dos hijos a la casa de la abuela con dignidad y empezó a modelar y hablar en LAM.",
  siciliani: "Flor Vigna acusó a Griselda Siciliani de mandarle mensajes de madrugada a Luciano Castro mientras convivían. Sabrina Rojas confirmó que Griselda le hacía lo mismo cuando ella estaba embarazada, y Flor sacó canciones de despecho.",
  spreen: "Iván Spreen debutó como titular en Primera División con Deportivo Riestra contra Vélez, jugó 59 segundos sin tocar la pelota y salió reemplazado por marketing. La AFA lo multó con 20 millones de pesos e investigan apuestas clandestinas."
};

function setupPlannerEvents() {
  const btnAnalyze = document.getElementById("btnAnalyzeTrend");
  const textarea = document.getElementById("inputDailyTrend");
  const btnClear = document.getElementById("btnClearPlanner");

  // Presets
  document.querySelectorAll(".btn-trend-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const presetKey = btn.dataset.preset;
      if (TREND_PRESETS[presetKey] && textarea) {
        textarea.value = TREND_PRESETS[presetKey];
        audioFX.playTick(550, 0.3);
        analyzeDailyTrend(textarea.value);
      }
    });
  });

  btnAnalyze?.addEventListener("click", () => {
    if (textarea && textarea.value.trim().length > 0) {
      analyzeDailyTrend(textarea.value);
    } else {
      alert("Por favor escribí o pegá una tendencia o hacé click en un preset del día.");
    }
  });

  btnClear?.addEventListener("click", () => {
    if (textarea) textarea.value = "";
    document.getElementById("plannerResultsWrapper").style.display = "none";
  });

  // Injection Actions
  document.getElementById("btnInjectBando")?.addEventListener("click", () => {
    if (currentGeneratedBando && typeof GUERRA_BANDOS_DATA !== "undefined") {
      GUERRA_BANDOS_DATA.unshift(currentGeneratedBando);
      loadBandoDuel(0);
      switchTab("bandos");
      audioFX.playFactosHorn();
    }
  });

  document.getElementById("btnInjectTribunal")?.addEventListener("click", () => {
    if (currentGeneratedTribunal && typeof TRIBUNAL_CASES !== "undefined") {
      TRIBUNAL_CASES.unshift(currentGeneratedTribunal);
      loadTribunalCase(0);
      switchTab("tribunal");
      audioFX.playReveal();
    }
  });

  document.getElementById("btnInjectSemaforo")?.addEventListener("click", () => {
    if (currentGeneratedSemaforo && typeof SEMAFORO_CASES !== "undefined") {
      SEMAFORO_CASES.unshift(currentGeneratedSemaforo);
      startSemaforoRound();
      switchTab("semaforo");
      audioFX.playMatchChime();
    }
  });

  document.getElementById("btnPushGenZocalo")?.addEventListener("click", () => {
    if (currentGeneratedZocalo) {
      setPresetZocalo(currentGeneratedZocalo.tag, currentGeneratedZocalo.headline);
      audioFX.playFactosHorn();
    }
  });
}

function analyzeDailyTrend(rawText) {
  const text = rawText.toLowerCase();
  audioFX.playFireIgnite();

  let rec = {
    gameName: "⚔️ GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?",
    why: "Este conflicto divide a la audiencia en dos posturas opuestas e irreconciliables. Es el formato ideal para generar clips virales de alta retención donde los 3 conductores toman bandos cruzados.",
    holderRole: "Factos, ego masculino y defensa de la libertad o corte tajante de raíz.",
    dianeRole: "Límites claros, defensa de la monogamia, valores éticos y repudio a la traición.",
    luliRole: "Empatía con la víctima, apego emocional, análisis de cartas astrales y perdón.",
    bando: null,
    tribunal: null,
    semaforo: null,
    zocalo: null
  };

  // Heuristic Logic based on keywords
  if (text.includes("chino") || text.includes("holder") || text.includes("telo") || text.includes("marisol") || text.includes("gisela")) {
    rec.gameName = "⚖️ EL TRIBUNAL DE FARÁNDULA";
    rec.why = "El 'Chino Gate' toca directamente al entorno de Tomás Holder. Es dinamita pura para la mesa de Prendido Fuego porque expone la hipocresía de los reality shows y el morbo familiar.";
    rec.holderRole = "Explotar de bronca contra la careteada de los que se hacen los virgos en la tele.";
    rec.dianeRole = "Condenar la falta de códigos de meterse con la madre de un compañero de reality.";
    rec.luliRole = "Celebrar a la mamá de Holder por mostrar las pruebas y destapar la olla sin miedo.";

    rec.bando = {
      id: "gen-chino-marisol",
      title: "El Escándalo del Telo: Martín 'El Chino' Ku vs. Marisol",
      sideA: { id: "chino", name: "El Chino Ku", badge: "El Estratega", argument: "Dijo que fue todo una opereta armada de los medios para ensuciar su imagen.", image: "assets/celebrities/martin-ku.jpg" },
      sideB: { id: "marisol", name: "Marisol & Gisela", badge: "Las que Expusieron", argument: "Mostraron los chats reales donde el Chino juraba estar soltero mientras convivía.", image: "assets/celebrities/gisela-holder.jpg" }
    };
    rec.tribunal = {
      id: "gen-tribunal-chino",
      title: "El Telo de Rosario: El Chino Ku, Gisela Gordillo y Marisol",
      protagonist: "Marisol (Novia del Chino)",
      category: "Gran Hermano / Traición",
      context: "Tu novio de la tele es descubierto en un telo en Rosario con la mamá de su compañero de reality y ella muestra los chats en vivo.",
      image: "assets/celebrities/gisela-holder.jpg",
      quote: "El pibe virgo de la televisión era un personaje para la cámara.",
      options: [
        { id: "A", title: "1. Valija a la Calle y Show en LAM (Factos)", text: "Le hacés las valijas, lo dejás en la calle y te sentás en LAM a contar todo.", style: "holder" },
        { id: "B", title: "2. Cierre Frío en Privado (Dignidad)", text: "Cortás la relación en privado con total frialdad sin prestarte al circo.", style: "diane" },
        { id: "C", title: "3. Perdonarlo por la Fama (Migajera)", text: "Pensás que la fama le quemó la cabeza y seguís conviviendo como si nada.", style: "luli" }
      ]
    };
    rec.semaforo = { id: "gen-sem-chino", title: "El Chongo en el Telo Ajeno", category: "Traición", text: "Tu novio te dice que se va de viaje de trabajo a Rosario y sale en los portales saliendo de un telo con una famosa..." };
    rec.zocalo = { tag: "🚨 ESCÁNDALO DEL TELO", headline: "EL CHINO KU AL BANCO: GISELA GORDILLO MOSTRÓ LOS CHATS Y MARISOL EXPLOTÓ" };

  } else if (text.includes("spreen") || text.includes("riestra") || text.includes("futbol") || text.includes("velez") || text.includes("minuto")) {
    rec.gameName = "⚔️ GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?";
    rec.why = "El debate de Spreen enfrenta la cultura del streaming y el marketing moderno contra el folclore y los valores del fútbol tradicional. Provoca choque generacional instantáneo.";
    rec.holderRole = "Bancar el marketing, los números de audiencia y el derecho a facturar.";
    rec.dianeRole = "Defender el respeto al esfuerzo, los pibes de inferiores y la seriedad del deporte.";
    rec.luliRole = "Reírse de lo bizarro de la situación y compadecerse de los memes de Spreen.";

    rec.bando = {
      id: "gen-spreen-riestra",
      title: "El Minuto de Fama: Spreen en Riestra vs. El Fútbol Tradicional",
      sideA: { id: "spreen", name: "Iván 'Spreen'", badge: "Rey del Marketing", argument: "Le dio al club y al torneo la mayor visibilidad mundial de su historia.", image: "assets/celebrities/spreen.jpg" },
      sideB: { id: "potrero", name: "Fútbol Tradicional", badge: "Respeto al Potrero", argument: "Una falta de respeto a los chicos que entrenan 10 años en inferiores.", image: "assets/celebrities/futbol-tradicional.jpg" }
    };
    rec.tribunal = {
      id: "gen-tribunal-spreen",
      title: "El Minuto de Fama: Spreen en Primera División",
      protagonist: "Iván 'Spreen'",
      category: "Streaming / Fútbol",
      context: "Te ofrecen debutar como titular en Primera 59 segundos sin tocar la pelota por un acuerdo de marketing viral.",
      image: "assets/celebrities/spreen.jpg",
      quote: "Le di a Riestra la mayor visibilidad de su historia.",
      options: [
        { id: "A", title: "1. Aceptar y Facturar Millones (Factos)", text: "Aceptás de una, batís récords de viewers y que los periodistas sigan ladrando.", style: "holder" },
        { id: "B", title: "2. Rechazar por Respeto al Deporte (Dignidad)", text: "Rechazás diciendo que el fútbol profesional y los pibes se respetan.", style: "diane" },
        { id: "C", title: "3. Jugar y Pedir Disculpas Llorando (Emocional)", text: "Jugás tentado por la plata pero hacés un vivo de 3 horas pidiendo perdón.", style: "luli" }
      ]
    };
    rec.semaforo = { id: "gen-sem-spreen", title: "El Minuto Vendido", category: "Códigos", text: "Aceptarías hacer el ridículo 1 minuto en televisión nacional a cambio de 50.000 dólares..." };
    rec.zocalo = { tag: "⚽ ESCÁNDALO EN AFA", headline: "SPREEN EN RIESTRA: ¿MARKETING BRILLANTE O FALTA DE RESPETO TOTAL AL FÚTBOL?" };

  } else if (text.includes("enzo") || text.includes("valentina") || text.includes("solter") || text.includes("londres")) {
    rec.gameName = "⚔️ GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?";
    rec.why = "El caso de Enzo y Valentina interpela a todas las parejas jóvenes. La tensión entre 'vivir la juventud' vs. 'la lealtad con quien te bancó en las malas' garantiza récord de comentarios.";
    rec.holderRole = "Defender la sinceridad de Enzo: mejor decir la verdad que tener amantes ocultas.";
    rec.dianeRole = "Destrozar la actitud cobarde de descartar a la mujer que te bancó desde la nada.";
    rec.luliRole = "Idolatrar la dignidad de Valentina y bancarla como la reina con más aura del país.";

    rec.bando = {
      id: "gen-enzo-valen",
      title: "La Soltería Post-Qatar: Enzo Fernández vs. Valentina Cervantes",
      sideA: { id: "enzo", name: "Enzo Fernández", badge: "El que Fue de Frente", argument: "Fue papá a los 19 y eligió ser sincero para no engañarla en secreto.", image: "assets/celebrities/enzo-fernandez.jpg" },
      sideB: { id: "valen", name: "Valentina Cervantes", badge: "La Dama con Aura", argument: "Lo bancó comiendo fideos en San Martín y volvió con dignidad total a Argentina.", image: "assets/celebrities/valentina-cervantes.jpg" }
    };
    rec.tribunal = {
      id: "gen-tribunal-enzo",
      title: "La 'Soltería Saltada' en Londres",
      protagonist: "Valentina Cervantes",
      category: "Fútbol / Parejas",
      context: "Acompañaste a tu novio hasta ser Campeón del Mundo y en Londres te dice que quiere vivir la soltería que se salteó.",
      image: "assets/celebrities/valentina-cervantes.jpg",
      quote: "Lo banqué en las malas y cuando llegó a la gloria me pidió soltería.",
      options: [
        { id: "A", title: "1. Buenos Aires, Agencia Top y Facturar (Factos)", text: "Te mudás a Buenos Aires, firmás como modelo y brillás sin depender de él.", style: "holder" },
        { id: "B", title: "2. Convenio en Dólares y Respeto Familiar (Dignidad)", text: "Firmás un convenio impecable por los hijos y no soltás rencor en TV.", style: "diane" },
        { id: "C", title: "3. Esperarlo en Silencio en Londres (Migajera)", text: "Te quedás cerca esperando que se canse de salir y vuelva arrepentido.", style: "luli" }
      ]
    };
    rec.semaforo = { id: "gen-sem-enzo", title: "El Planteo de Soltería", category: "Parejas", text: "Tu pareja de 5 años te dice que te ama pero necesita estar solo para 'vivir su juventud'..." };
    rec.zocalo = { tag: "💍 RUPTURA SCALONETA", headline: "ENZO VS VALENTINA: ¿SINCERIDAD MADURA O TRAICIÓN TRAS LLEGAR A LA CIMA?" };

  } else {
    // Default: La Joaqui / Romance / Cuarteto / Traición
    rec.gameName = "⚔️ GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?";
    rec.why = "La combinación de amor, compra de casa, asfixia de convivencia y el regreso con la ex amiga toca todas las fibras de la noche y las relaciones modernas.";
    rec.holderRole = "Factos: a los 25 años y con giras nadie quiere meterse en una casa con hijos ajenos.";
    rec.dianeRole = "Condenar la inmadurez de ilusionar a una mujer y luego volver con la ex amiga.";
    rec.luliRole = "Empatía total con La Joaqui, dolor astral y canciones de RKT como terapia.";

    rec.bando = {
      id: "gen-joaqui-luck",
      title: "El Amor Cuartetero & La Ruptura: La Joaqui vs. Luck Ra",
      sideA: { id: "joaqui", name: "La Joaqui", badge: "La que Proyectó Familia", argument: "Se la jugó por amor, compró la casa al lado y fue traicionada con la ex amiga.", image: "assets/celebrities/la-joaqui.jpg" },
      sideB: { id: "luck", name: "Luck Ra", badge: "El Soltero de 25 Años", argument: "Está en el pico de su carrera; convivir por presión familiar arruina a cualquiera.", image: "assets/celebrities/luck-ra.jpg" }
    };
    rec.tribunal = {
      id: "gen-tribunal-joaqui",
      title: "El Amor Cuartetero: La Casa y la Ex Amiga",
      protagonist: "La Joaqui",
      category: "Música Urbana / Convivencia",
      context: "Comprás una casa al lado de tu novio para armar familia, él se asusta y vuelve a hablar con su ex que era tu amiga.",
      image: "assets/celebrities/la-joaqui.jpg",
      quote: "Me la jugué entera por amor y me quedé con la casa vacía.",
      options: [
        { id: "A", title: "1. Vender la Casa y Sacar RKT (Factos)", text: "Vendés la casa al toque y sacás 3 temas de RKT liquidándolos.", style: "holder" },
        { id: "B", title: "2. Foco en tus Hijas y Cero Contacto (Dignidad)", text: "Te quedás en tu casa tranquila y cortás todo vínculo comercial.", style: "diane" },
        { id: "C", title: "3. Audios a las 4 AM y Velas Rojas (Migajera)", text: "Le mandás mensajes de madrugada y le prendés velas para que vuelva.", style: "luli" }
      ]
    };
    rec.semaforo = { id: "gen-sem-joaqui", title: "La Ex que Era Tu Amiga", category: "Red Flags", text: "Tu ex pareja vuelve a hablar con una persona que se convirtió en tu amiga íntima durante la relación..." };
    rec.zocalo = { tag: "🔥 BOMBA DEL DÍA", headline: "LUCK RA VOLVIÓ CON SU EX TRAS SEPARARSE DE LA JOAQUI: ¿TRAICIÓN O ASFIXIA?" };
  }

  // Save generated objects
  currentGeneratedBando = rec.bando;
  currentGeneratedTribunal = rec.tribunal;
  currentGeneratedSemaforo = rec.semaforo;
  currentGeneratedZocalo = rec.zocalo;

  // Render to DOM
  document.getElementById("recGameName").textContent = rec.gameName;
  document.getElementById("recGameWhy").textContent = rec.why;
  document.getElementById("recRoleHolder").textContent = rec.holderRole;
  document.getElementById("recRoleDiane").textContent = rec.dianeRole;
  document.getElementById("recRoleLuli").textContent = rec.luliRole;

  if (rec.bando) {
    document.getElementById("genBandoTitle").textContent = rec.bando.title;
    document.getElementById("genBandoSummary").textContent = `${rec.bando.sideA.name} (${rec.bando.sideA.badge}) vs. ${rec.bando.sideB.name} (${rec.bando.sideB.badge})`;
  }
  if (rec.tribunal) {
    document.getElementById("genTribunalTitle").textContent = rec.tribunal.title;
    document.getElementById("genTribunalSummary").textContent = `Protagonista: ${rec.tribunal.protagonist} • "${rec.tribunal.quote}"`;
  }
  if (rec.semaforo) {
    document.getElementById("genSemaforoTitle").textContent = rec.semaforo.title;
    document.getElementById("genSemaforoSummary").textContent = rec.semaforo.text;
  }
  if (rec.zocalo) {
    document.getElementById("genZocaloTag").textContent = rec.zocalo.tag;
    document.getElementById("genZocaloHeadline").textContent = rec.zocalo.headline;
  }

  const results = document.getElementById("plannerResultsWrapper");
  results.style.display = "block";
  results.scrollIntoView({ behavior: "smooth" });
}

// =========================================================
// 15. MÓDULO MASTER: EL SHOW DEL DÍA (CIRCUITO UNIFICADO)
// =========================================================
let currentShowEpisode = null;
let currentShowStep = 1;
let showSemaforoSubIndex = 0;
let showUserChoices = {
  mode: "today",
  bandos: { duel: null, vote: null, votesA: 50, votesB: 50 },
  tribunal: { caseItem: null, option: null },
  semaforo: [],
  ruleta: { victim: null, candidates: [], assignments: { casorio: null, chongo: null, funa: null } },
  metrics: { venom: 88, aura: 85, migajera: 75, careta: 35 }
};

function setupShowDiaEvents() {
  document.getElementById("btnPrevShowStep")?.addEventListener("click", prevShowDiaStep);
  document.getElementById("btnNextShowStep")?.addEventListener("click", nextShowDiaStep);

  document.querySelectorAll("[data-show-step]").forEach(pill => {
    pill.addEventListener("click", () => {
      const targetStep = parseInt(pill.dataset.showStep, 10);
      if (targetStep >= 1 && targetStep <= 5) {
        setShowDiaStep(targetStep);
      }
    });
  });
}

function startShowDia(mode = "today") {
  audioFX.playFireIgnite();
  showUserChoices.mode = mode;
  showSemaforoSubIndex = 0;
  showUserChoices.semaforo = [];

  if (mode === "today") {
    // Curated for Today's Script (31/08) con TODO el Lore Multiverso Cruzado
    const bando = (typeof GUERRA_BANDOS_DATA !== "undefined" && GUERRA_BANDOS_DATA.length) ? GUERRA_BANDOS_DATA[0] : null;
    const tribunal = (typeof TRIBUNAL_CASES !== "undefined" && TRIBUNAL_CASES.length > 1) ? TRIBUNAL_CASES[1] : (TRIBUNAL_CASES[0] || null);
    
    // Semáforo con los 5 lores del día cruzados
    const semaforo = [
      {
        id: "sem-lore-wanda-chatgpt",
        title: "El Historial de Infidelidades con ChatGPT",
        category: "Farándula / Wanda & Maxi",
        text: "Le pedís a ChatGPT que liste las 7 infidelidades históricas de tu ex marido (el barco, la empleada y Barcelona) y subís la captura a Instagram firmando como 'Solange'..."
      },
      {
        id: "sem-lore-icardi-tatuaje",
        title: "La Icardeada Histórica & El Tatuaje",
        category: "Códigos / Icardi & Maxi",
        text: "Tu mejor amigo de club te recibe en su casa de Italia y a los 6 meses se pone de novio con tu ex mujer y se tatúa los nombres de tus 3 hijos en el brazo..."
      },
      {
        id: "sem-lore-poggio-ph",
        title: "El Fetiche de PH & El Ojo de Leuco",
        category: "Intimidad / Juli Poggio & Edul",
        text: "En la primera cita te confiesa que le gusta dar chirlos en la cama y el truco del ojo mientras Gastón Edul te mira con cara cómplice..."
      },
      {
        id: "sem-lore-messi-retiro",
        title: "El Llanto Desconsolado por el Retiro de Messi",
        category: "Urgente / Conmoción Nacional",
        text: "Tu pareja se tira a llorar en el piso y cancela todos los planes de la semana porque Messi acaba de publicar su carta de despedida definitiva de la Selección Argentina..."
      },
      {
        id: "sem-lore-jefe-harinas",
        title: "Prohibido Azúcar y Medialunas en la Oficina",
        category: "Trabajo / El Jefe Sigma Fit",
        text: "Tu jefe fit te descuenta el sueldo si te encuentra comiendo facturas con grasa de 9 a 18 hs porque 'te da pico de insulina y baja la productividad'..."
      }
    ];
    
    // Ruleta Multiverso: Víctima Wanda Nara con sus 3 hombres históricos
    const victim = celebrities.find(c => c.id === "wanda-nara") || celebrities[0];
    const candidates = [
      celebrities.find(c => c.id === "maxi-lopez") || { name: "Maxi López", image: "assets/celebrities/maxi-lopez.jpg", lore: "El primer marido, padre de Valentino, Constantino y Benedicto. El bardo de Rusia y ChatGPT." },
      celebrities.find(c => c.id === "mauro-icardi") || { name: "Mauro Icardi", image: "assets/celebrities/mauro-icardi.jpg", lore: "La icardeada histórica de 2013, 10 años de matrimonio, 2 hijas y el Wandagate en París." },
      celebrities.find(c => c.id === "l-gante") || { name: "L-Gante", image: "assets/celebrities/l-gante.jpg", lore: "El amor de cumbia 420, la escapada a Río de Janeiro y la guerra en el Chateau Libertador." }
    ];

    currentShowEpisode = {
      title: "PROGRAMA DE HOY • LUNES 31/08",
      badge: "🔥 GUION OFICIAL • MULTIVERSO PRENDIDO FUEGO",
      bando,
      tribunal,
      semaforo,
      ruleta: { victim, candidates }
    };
  } else {
    // Randomized Episode with RNG from all databases
    const bando = GUERRA_BANDOS_DATA[Math.floor(Math.random() * GUERRA_BANDOS_DATA.length)];
    const tribunal = TRIBUNAL_CASES[Math.floor(Math.random() * TRIBUNAL_CASES.length)];
    const shuffledSem = [...SEMAFORO_CASES].sort(() => 0.5 - Math.random());
    const semaforo = shuffledSem.slice(0, 4);
    
    const shuffledCelebs = [...celebrities].sort(() => 0.5 - Math.random());
    const victim = shuffledCelebs[0];
    const candidates = shuffledCelebs.slice(1, 4);

    currentShowEpisode = {
      title: "SHOW ALEATORIO (MODO RNG)",
      badge: "🎲 GENERADOR DE BARDOS & LORES",
      bando,
      tribunal,
      semaforo,
      ruleta: { victim, candidates }
    };
  }

  showUserChoices.bandos.duel = currentShowEpisode.bando;
  showUserChoices.bandos.vote = null;
  showUserChoices.bandos.votesA = 50;
  showUserChoices.bandos.votesB = 50;

  showUserChoices.tribunal.caseItem = currentShowEpisode.tribunal;
  showUserChoices.tribunal.option = null;

  showUserChoices.ruleta.victim = currentShowEpisode.ruleta.victim;
  showUserChoices.ruleta.candidates = currentShowEpisode.ruleta.candidates;
  showUserChoices.ruleta.assignments = { casorio: null, chongo: null, funa: null };

  switchTab("show-dia");
  setShowDiaStep(1);
}

function setShowDiaStep(step) {
  currentShowStep = Math.max(1, Math.min(5, step));
  audioFX.playReveal();

  // Update Stepper Indicators
  document.querySelectorAll(".show-step-indicators .step-pill").forEach(pill => {
    const s = parseInt(pill.dataset.showStep, 10);
    pill.classList.toggle("active", s === currentShowStep);
    pill.classList.toggle("completed", s < currentShowStep);
  });

  const modeBadge = document.getElementById("showModeBadge");
  const stepCounter = document.getElementById("showStepCounter");
  const stageTitle = document.getElementById("showStageTitle");

  if (modeBadge && currentShowEpisode) modeBadge.textContent = currentShowEpisode.badge;
  if (stepCounter) stepCounter.textContent = `ETAPA ${currentShowStep} / 5`;

  const totalSem = currentShowEpisode?.semaforo?.length || 5;
  const titles = [
    "",
    `⚔️ ETAPA 1: ${currentShowEpisode?.bando?.title || "GUERRA DE BANDOS"}`,
    `⚖️ ETAPA 2: ${currentShowEpisode?.tribunal?.title || "EL TRIBUNAL DE FARÁNDULA"}`,
    `🚦 ETAPA 3: RÁFAGA DEL SEMÁFORO (${totalSem} RED FLAGS VIRALES)`,
    `🎡 ETAPA 4: LA RULETA BIZARRA & 3 TRONOS`,
    `📊 ETAPA 5: DASHBOARD FINAL & ANÁLISIS PSICOLÓGICO DE LA MESA`
  ];
  if (stageTitle) stageTitle.textContent = titles[currentShowStep];

  const body = document.getElementById("showStageBody");
  if (!body) return;

  if (currentShowStep === 1) renderShowStep1_Bandos(body);
  else if (currentShowStep === 2) renderShowStep2_Tribunal(body);
  else if (currentShowStep === 3) renderShowStep3_Semaforo(body);
  else if (currentShowStep === 4) renderShowStep4_Ruleta(body);
  else if (currentShowStep === 5) renderShowStep5_Dashboard(body);

  updateLowerThirdShowDia();
}

function nextShowDiaStep() {
  const maxSemIndex = (currentShowEpisode?.semaforo?.length || 3) - 1;
  if (currentShowStep === 3) {
    if (showSemaforoSubIndex < maxSemIndex) {
      showSemaforoSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep3_Semaforo(body);
      audioFX.playTick(600, 0.2);
      return;
    }
  }

  if (currentShowStep < 5) {
    setShowDiaStep(currentShowStep + 1);
  } else {
    audioFX.playFactosHorn();
  }
}

function prevShowDiaStep() {
  if (currentShowStep === 3 && showSemaforoSubIndex > 0) {
    showSemaforoSubIndex--;
    const body = document.getElementById("showStageBody");
    if (body) renderShowStep3_Semaforo(body);
    return;
  }

  if (currentShowStep > 1) {
    setShowDiaStep(currentShowStep - 1);
  }
}

// ---------------------------------------------------------
// STEP 1: GUERRA DE BANDOS
// ---------------------------------------------------------
function renderShowStep1_Bandos(container) {
  const duel = currentShowEpisode?.bando || GUERRA_BANDOS_DATA[0];
  if (!duel) return;

  container.innerHTML = `
    <div class="show-stage-card bandos-step-arena">
      <div class="step-guide-tag">
        ⚔️ DUELO EN VIVO • ¿De qué lado se para la mesa en este bardo? Votá con los botones o teclas [1] y [2]
      </div>
      
      <div class="bandos-clash-grid">
        <!-- BANDO A -->
        <div class="bando-fighter-card side-a ${showUserChoices.bandos.vote === 'a' ? 'selected-winner' : ''}" id="showCardA">
          <div class="fighter-badge">${duel.sideA.badge}</div>
          <h3 class="fighter-name">${duel.sideA.name}</h3>
          <p class="fighter-argument">${duel.sideA.argument || duel.sideA.quote}</p>
          <button class="btn-vote-fighter" onclick="voteShowBando('a')">
            ${showUserChoices.bandos.vote === 'a' ? '✓ BANCADO POR LA MESA' : 'BANCAR BANDO A [1]'}
          </button>
        </div>

        <!-- VS CLASH -->
        <div class="clash-center-piece">
          <div class="vs-flame-circle">VS</div>
          <div class="vs-clash-glow"></div>
        </div>

        <!-- BANDO B -->
        <div class="bando-fighter-card side-b ${showUserChoices.bandos.vote === 'b' ? 'selected-winner' : ''}" id="showCardB">
          <div class="fighter-badge">${duel.sideB.badge}</div>
          <h3 class="fighter-name">${duel.sideB.name}</h3>
          <p class="fighter-argument">${duel.sideB.argument || duel.sideB.quote}</p>
          <button class="btn-vote-fighter" onclick="voteShowBando('b')">
            ${showUserChoices.bandos.vote === 'b' ? '✓ BANCADO POR LA MESA' : 'BANCAR BANDO B [2]'}
          </button>
        </div>
      </div>

      <!-- TUG OF WAR BAR -->
      <div class="tug-meter-box">
        <div class="tug-meter-labels">
          <span class="tug-label-a">${duel.sideA.name}: <strong id="showPctA">${showUserChoices.bandos.votesA}%</strong></span>
          <span class="tug-meter-title">⚖️ BALANCE DE LA MESA</span>
          <span class="tug-label-b">${duel.sideB.name}: <strong id="showPctB">${showUserChoices.bandos.votesB}%</strong></span>
        </div>
        <div class="tug-bar-track">
          <div class="tug-fill-a" id="showFillA" style="width: ${showUserChoices.bandos.votesA}%;"></div>
          <div class="tug-fill-b" id="showFillB" style="width: ${showUserChoices.bandos.votesB}%;"></div>
        </div>
      </div>
    </div>
  `;
}

function voteShowBando(side) {
  showUserChoices.bandos.vote = side;
  if (side === "a") {
    showUserChoices.bandos.votesA = Math.min(95, showUserChoices.bandos.votesA + 15);
    showUserChoices.bandos.votesB = 100 - showUserChoices.bandos.votesA;
    audioFX.playFireIgnite();
  } else {
    showUserChoices.bandos.votesB = Math.min(95, showUserChoices.bandos.votesB + 15);
    showUserChoices.bandos.votesA = 100 - showUserChoices.bandos.votesB;
    audioFX.playFactosHorn();
  }

  const fillA = document.getElementById("showFillA");
  const fillB = document.getElementById("showFillB");
  const pctA = document.getElementById("showPctA");
  const pctB = document.getElementById("showPctB");

  if (fillA) fillA.style.width = `${showUserChoices.bandos.votesA}%`;
  if (fillB) fillB.style.width = `${showUserChoices.bandos.votesB}%`;
  if (pctA) pctA.textContent = `${showUserChoices.bandos.votesA}%`;
  if (pctB) pctB.textContent = `${showUserChoices.bandos.votesB}%`;

  document.getElementById("showCardA")?.classList.toggle("selected-winner", side === "a");
  document.getElementById("showCardB")?.classList.toggle("selected-winner", side === "b");
}

// ---------------------------------------------------------
// STEP 2: EL TRIBUNAL DE FARÁNDULA
// ---------------------------------------------------------
function renderShowStep2_Tribunal(container) {
  const caseItem = currentShowEpisode?.tribunal || TRIBUNAL_CASES[0];
  if (!caseItem) return;

  const chosen = showUserChoices.tribunal.option;

  container.innerHTML = `
    <div class="show-stage-card tribunal-step-stage">
      <div class="step-guide-tag">
        ⚖️ ¿QUÉ HARÍAS VOS EN SU LUGAR? • Elegí una de las 3 opciones de la mesa [A], [B] o [C]
      </div>

      <div class="tribunal-hero-case-card text-only">
        <div class="thc-details">
          <div class="thc-category-badge">${caseItem.category}</div>
          <div class="thc-protagonist-pill">PROTAGONISTA: ${caseItem.protagonist}</div>
          <h3 class="thc-title">${caseItem.title}</h3>
          <p class="thc-context">${caseItem.context}</p>
          <div class="thc-quote-box">"${caseItem.quote}"</div>
        </div>
      </div>

      <div class="tribunal-options-grid">
        ${caseItem.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = chosen === letter;
          return `
            <div class="tribunal-opt-card style-${opt.style} ${isSelected ? 'option-selected-glow' : ''}" onclick="selectShowTribunal('${letter}')">
              <div class="toc-badge">${opt.style === 'holder' ? '🔥 FACTOS / HOLDER' : opt.style === 'diane' ? '🟢 DIGNIDAD / DIANE' : '💔 MIGAJERA / LULI'}</div>
              <h4 class="toc-title">${opt.title}</h4>
              <p class="toc-text">${opt.text}</p>
              <button class="btn-vote-option ${isSelected ? 'voted' : ''}">
                ${isSelected ? '✓ OPCIÓN ELEGIDA POR LA MESA' : `ELEGIR OPCIÓN [${letter}]`}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function selectShowTribunal(optionId) {
  showUserChoices.tribunal.option = optionId;
  audioFX.playReveal();
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep2_Tribunal(body);
}

// ---------------------------------------------------------
// STEP 3: LA RÁFAGA DEL SEMÁFORO (3 RED FLAGS)
// ---------------------------------------------------------
function renderShowStep3_Semaforo(container) {
  const cases = currentShowEpisode?.semaforo || SEMAFORO_CASES.slice(0, 3);
  const currentCase = cases[showSemaforoSubIndex] || cases[0];
  const savedVote = showUserChoices.semaforo[showSemaforoSubIndex]?.vote;

  container.innerHTML = `
    <div class="show-stage-card semaforo-step-stage">
      <div class="step-guide-tag">
        🚦 RÁFAGA DEL SEMÁFORO • CASO ${showSemaforoSubIndex + 1} DE 3 • Votá con [V] Verde, [A] Amarillo, [R] Rojo o [F] Fuego
      </div>

      <div class="semaforo-play-card show-semaforo-card">
        <div class="spc-category-row">
          <span class="spc-category-badge">${currentCase.category}</span>
          <span class="spc-progress-badge">RED FLAG ${showSemaforoSubIndex + 1} / 3</span>
        </div>

        <h3 class="spc-case-title">${currentCase.title}</h3>
        <p class="spc-case-text">${currentCase.text}</p>

        <!-- TRAFFIC LIGHT CONTROLS -->
        <div class="semaforo-controls-row">
          <button class="btn-sem-vote btn-sem-green ${savedVote === 'verde' ? 'selected' : ''}" onclick="voteShowSemaforo('verde')">
            <span class="sem-icon">🟢</span>
            <span class="sem-title">VERDE</span>
            <span class="sem-desc">Banco / Normal</span>
            <span class="sem-kbd">[V]</span>
          </button>

          <button class="btn-sem-vote btn-sem-yellow ${savedVote === 'amarillo' ? 'selected' : ''}" onclick="voteShowSemaforo('amarillo')">
            <span class="sem-icon">🟡</span>
            <span class="sem-title">AMARILLO</span>
            <span class="sem-desc">Alerta / Dudo</span>
            <span class="sem-kbd">[A]</span>
          </button>

          <button class="btn-sem-vote btn-sem-red ${savedVote === 'rojo' ? 'selected' : ''}" onclick="voteShowSemaforo('rojo')">
            <span class="sem-icon">🔴</span>
            <span class="sem-title">ROJO</span>
            <span class="sem-desc">Red Flag / No</span>
            <span class="sem-kbd">[R]</span>
          </button>

          <button class="btn-sem-vote btn-sem-fire ${savedVote === 'fuego' ? 'selected' : ''}" onclick="voteShowSemaforo('fuego')">
            <span class="sem-icon">🔥</span>
            <span class="sem-title">FUEGO</span>
            <span class="sem-desc">Tóxico / Cancelar</span>
            <span class="sem-kbd">[F]</span>
          </button>
        </div>

        <div class="semaforo-sub-dots">
          ${cases.map((c, i) => `
            <div class="sub-dot ${i === showSemaforoSubIndex ? 'active' : ''} ${showUserChoices.semaforo[i] ? 'voted' : ''}"></div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function voteShowSemaforo(level) {
  const cases = currentShowEpisode?.semaforo || SEMAFORO_CASES.slice(0, 3);
  const cur = cases[showSemaforoSubIndex] || cases[0];

  showUserChoices.semaforo[showSemaforoSubIndex] = {
    title: cur.title,
    text: cur.text,
    vote: level
  };

  if (level === "verde") audioFX.playMatchChime();
  else if (level === "amarillo") audioFX.playTick(500, 0.3);
  else if (level === "rojo") audioFX.playBuzzer();
  else if (level === "fuego") audioFX.playFireIgnite();

  // Auto-advance to next sub-case or step 4
  setTimeout(() => {
    if (showSemaforoSubIndex < 2) {
      showSemaforoSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep3_Semaforo(body);
    } else {
      setShowDiaStep(4);
    }
  }, 400);
}

// ---------------------------------------------------------
// STEP 4: LA RULETA & 3 TRONOS
// ---------------------------------------------------------
function renderShowStep4_Ruleta(container) {
  const victim = currentShowEpisode?.ruleta?.victim || celebrities[0];
  const candidates = currentShowEpisode?.ruleta?.candidates || celebrities.slice(1, 4);
  const assign = showUserChoices.ruleta.assignments;

  container.innerHTML = `
    <div class="show-stage-card ruleta-step-stage">
      <div class="step-guide-tag">
        🎡 TINDER BIZARRO EN MESA • ${victim.name} en el banquillo. Asigná a los 3 candidatos a los 3 Tronos
      </div>

      <!-- VICTIM CARD -->
      <div class="ruleta-victim-spotlight text-only">
        <div class="rvs-info">
          <div class="rvs-badge">VÍCTIMA DEL DÍA</div>
          <h3 class="rvs-name">${victim.name}</h3>
          <div class="rvs-tag">${victim.tag || victim.categoryLabel}</div>
          <p class="rvs-lore">${victim.lore || victim.bio}</p>
        </div>
      </div>

      <!-- 3 CANDIDATES & 3 THRONES -->
      <div class="ruleta-thrones-clash-grid">
        ${candidates.map((cand, idx) => {
          let curThrone = "";
          if (assign.casorio === cand.name) curThrone = "💍 CASORIO";
          else if (assign.chongo === cand.name) curThrone = "🔥 CHONGO";
          else if (assign.funa === cand.name) curThrone = "❌ FUNA";

          return `
            <div class="candidate-throne-card text-only">
              <div class="ctc-assigned-badge ${curThrone ? 'active' : ''}">${curThrone || 'SIN ASIGNAR'}</div>
              <h4 class="ctc-name">${cand.name}</h4>
              <p class="ctc-lore">${cand.lore || cand.bio}</p>
              
              <div class="ctc-actions-row">
                <button class="btn-throne-pick btn-tp-casorio ${assign.casorio === cand.name ? 'active' : ''}" onclick="assignShowThroneDirect('casorio', '${cand.name}')">
                  💍 Casorio
                </button>
                <button class="btn-throne-pick btn-tp-chongo ${assign.chongo === cand.name ? 'active' : ''}" onclick="assignShowThroneDirect('chongo', '${cand.name}')">
                  🔥 Chongo
                </button>
                <button class="btn-throne-pick btn-tp-funa ${assign.funa === cand.name ? 'active' : ''}" onclick="assignShowThroneDirect('funa', '${cand.name}')">
                  ❌ Funa
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function assignShowThroneDirect(throne, candName) {
  showUserChoices.ruleta.assignments[throne] = candName;
  if (throne === "casorio") audioFX.playMatchChime();
  else if (throne === "chongo") audioFX.playFireIgnite();
  else if (throne === "funa") audioFX.playBuzzer();

  const body = document.getElementById("showStageBody");
  if (body) renderShowStep4_Ruleta(body);
}

function assignShowThrone(throne) {
  const candidates = currentShowEpisode?.ruleta?.candidates || [];
  const unassigned = candidates.find(c => !Object.values(showUserChoices.ruleta.assignments).includes(c.name));
  if (unassigned) {
    assignShowThroneDirect(throne, unassigned.name);
  }
}

// ---------------------------------------------------------
// STEP 5: MASTER DASHBOARD & ANÁLISIS PSICOLÓGICO
// ---------------------------------------------------------
function renderShowStep5_Dashboard(container) {
  const diagnosis = generatePsychologicalAnalysis(showUserChoices);
  audioFX.playFactosHorn();

  container.innerHTML = `
    <div class="show-stage-card dashboard-step-stage">
      
      <!-- HERO DIAGNOSIS BANNER -->
      <div class="final-diagnosis-hero">
        <div class="fdh-tag">🧠 ANÁLISIS PSICOLÓGICO & TOXICOLÓGICO DEL SHOW DE HOY</div>
        <h2 class="fdh-title">${diagnosis.title}</h2>
        <p class="fdh-desc">${diagnosis.description}</p>
      </div>

      <!-- 4 METRIC GAUGES -->
      <div class="show-metrics-grid">
        <div class="metric-card metric-venom">
          <div class="mc-icon">🧪</div>
          <div class="mc-val">${diagnosis.venom}%</div>
          <div class="mc-lbl">VENENO EN SANGRE</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.venom}%;"></div></div>
        </div>

        <div class="metric-card metric-aura">
          <div class="mc-icon">🗿</div>
          <div class="mc-val">${diagnosis.aura}%</div>
          <div class="mc-lbl">FACTOS & AURA ALFA</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.aura}%;"></div></div>
        </div>

        <div class="metric-card metric-migajera">
          <div class="mc-icon">💔</div>
          <div class="mc-val">${diagnosis.migajera}%</div>
          <div class="mc-lbl">APEGO MIGAJERO</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.migajera}%;"></div></div>
        </div>

        <div class="metric-card metric-careta">
          <div class="mc-icon">🎭</div>
          <div class="mc-val">${diagnosis.careta}%</div>
          <div class="mc-lbl">CARETÓMETRO MESA</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.careta}%;"></div></div>
        </div>
      </div>

      <!-- RECAP OF CHOICES -->
      <div class="show-recap-grid">
        <div class="recap-box">
          <div class="rb-title">⚔️ GUERRA DE BANDOS</div>
          <div class="rb-content">
            Bando Elegido: <strong>${showUserChoices.bandos.vote === 'a' ? showUserChoices.bandos.duel?.sideA?.name : showUserChoices.bandos.duel?.sideB?.name || 'Empate Técnico'}</strong>
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">⚖️ TRIBUNAL DE FARÁNDULA</div>
          <div class="rb-content">
            Postura: <strong>${showUserChoices.tribunal.option === 'A' ? 'Factos / Tomás Holder' : showUserChoices.tribunal.option === 'B' ? 'Dignidad / Diane' : 'Migajera / Luli'}</strong>
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">🚦 SEMÁFORO DE HOY</div>
          <div class="rb-content">
            ${showUserChoices.semaforo.map((s, i) => `${i+1}. ${s.vote ? s.vote.toUpperCase() : 'PENDIENTE'}`).join(" • ")}
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">💍 CASORIO & FUNA</div>
          <div class="rb-content">
            💍 ${showUserChoices.ruleta.assignments.casorio || 'Nadie'} | ❌ ${showUserChoices.ruleta.assignments.funa || 'Nadie'}
          </div>
        </div>
      </div>

      <!-- FUNA RECOMMENDATION -->
      <div class="funa-verdict-box">
        <div class="fvb-icon">💀</div>
        <div class="fvb-info">
          <h4>VEREDICTO: EL CONDUCTOR MÁS CANCELABLE DE HOY</h4>
          <p>${diagnosis.funadoRecommendation}</p>
        </div>
        <button class="btn-apply-funa" onclick="applyDashboardFuna('${diagnosis.funadoHost}')">
          🚨 SUMAR +1 FUNA A ${diagnosis.funadoHost.toUpperCase()}
        </button>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="dashboard-actions-row">
        <button class="btn-dash-action" onclick="startShowDia('today')">
          🔄 REPETIR EL SHOW DE HOY
        </button>
        <button class="btn-dash-action btn-dash-rng" onclick="startShowDia('rng')">
          🎲 JUGAR SHOW ALEATORIO (RNG)
        </button>
        <button class="btn-dash-action btn-dash-home" onclick="switchTab('home')">
          🏠 VOLVER AL INICIO
        </button>
      </div>

    </div>
  `;
}

function generatePsychologicalAnalysis(choices) {
  let venom = 75;
  let aura = 80;
  let migajera = 60;
  let careta = 40;

  if (choices.bandos.vote === "a") {
    venom += 15;
    aura += 10;
  } else if (choices.bandos.vote === "b") {
    careta += 15;
    aura -= 5;
  }

  if (choices.tribunal.option === "A") {
    aura += 15;
    venom += 10;
  } else if (choices.tribunal.option === "B") {
    aura += 10;
    careta -= 10;
  } else if (choices.tribunal.option === "C") {
    migajera += 30;
    aura -= 15;
  }

  choices.semaforo.forEach(s => {
    if (s.vote === "fuego") venom += 8;
    else if (s.vote === "verde") aura += 5;
    else if (s.vote === "amarillo") migajera += 8;
    else if (s.vote === "rojo") careta += 5;
  });

  venom = Math.min(99, Math.max(25, venom));
  aura = Math.min(99, Math.max(20, aura));
  migajera = Math.min(99, Math.max(15, migajera));
  careta = Math.min(99, Math.max(10, careta));

  let title = "DIAGNÓSTICO: MESA NIVEL WANDAGATE (TOXICIDAD GALÁCTICA & DESPECHO CON FACTOS)";
  let description = "La mesa demostró una adicción severa a los bardos de conventillo y a las capturas de WhatsApp a las 4 AM. Holder tiró factos que rozan la cancelación en el INADI, Diane intentó poner cordura monogámica sin éxito, y Luli ya le mandó la carta natal de Maxi López a sus amigas.";
  let funadoHost = "holder";
  let funadoRecommendation = "Tomás Holder por justificar las anécdotas de sótanos de Rusia y amenazar con prohibir las medialunas en el estudio.";

  if (migajera > 75) {
    title = "DIAGNÓSTICO: MESA MIGAJERA CRÓNICA (APEGO ANSIOSO, TAROT Y MEDIALUNAS EN EL BAÑO)";
    description = "El nivel de apego de esta mesa asusta a cualquier psicólogo de la UBA. Perdonarían una infidelidad en un telo si el chongo les escribe un tema de RKT y les promete no comer azúcar en el laburo.";
    funadoHost = "luli";
    funadoRecommendation = "Luli Casé por defender firmar como 'Solange' y justificar los 70 millones con culpa kármica.";
  } else if (aura > 85) {
    title = "DIAGNÓSTICO: MESA MONOGÁMICA CON DIGNIDAD DE ACERO & RESPETO A LOS CÓDIGOS";
    description = "Cero tolerancia a la careteada. Esta mesa corta en seco, se lleva a los hijos con las valijas y factura como modelo internacional sin mirar atrás.";
    funadoHost = "diane";
    funadoRecommendation = "Diane Caracchi por ser demasiado correcta y no dejar que Holder prenda fuego el estudio con los audios de PH.";
  }

  return {
    title,
    description,
    venom,
    aura,
    migajera,
    careta,
    funadoHost,
    funadoRecommendation
  };
}

function applyDashboardFuna(host) {
  adjustFuna(host, 1);
  triggerSoundEffect("siren");
  alert(`🚨 ¡SENTENCIA APLICADA! Se sumó +1 FUNA a ${host.toUpperCase()}. Total acumulado: ${funaCounts[host]}`);
}

function updateLowerThirdShowDia() {
  if (currentShowStep === 1) {
    setPresetZocalo("⚔️ SHOW DEL DÍA • ETAPA 1", `${currentShowEpisode?.bando?.title?.toUpperCase() || "GUERRA DE BANDOS"}`);
  } else if (currentShowStep === 2) {
    setPresetZocalo("⚖️ SHOW DEL DÍA • ETAPA 2", `${currentShowEpisode?.tribunal?.title?.toUpperCase() || "EL TRIBUNAL DE FARÁNDULA"}`);
  } else if (currentShowStep === 3) {
    setPresetZocalo("🚦 SHOW DEL DÍA • ETAPA 3", "LA RÁFAGA DEL SEMÁFORO: 3 RED FLAGS DE HOY AL AIRE");
  } else if (currentShowStep === 4) {
    setPresetZocalo("🎡 SHOW DEL DÍA • ETAPA 4", "LA RULETA BIZARRA & LOS 3 TRONOS (CASORIO, CHONGO, FUNA)");
  } else if (currentShowStep === 5) {
    setPresetZocalo("🏆 SHOW DEL DÍA • FINAL", "DASHBOARD FINAL & ANÁLISIS PSICOLÓGICO DE LA MESA");
  }
}
