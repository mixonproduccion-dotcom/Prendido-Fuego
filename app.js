// =========================================================
// PRENDIDO FUEGO 🔥 - STUDIO LIVE STREAMING ENGINE (MIX ON)
// Engine for live broadcast, step-by-step game modes,
// 200+ celebrity lore, 100 semaforo red flags gamified in rounds of 10,
// interactive ranking, soundboard synthesis, global funa tracker,
// and instant lower-third chyron graphics.
// =========================================================

// Helper: Extraer nombre corto y claro para botones ("Wanda", "Maxi", "Tini", "Emilia", "Messi", etc.)
function getShortDisplayName(fullName) {
  if (!fullName) return "";
  let clean = fullName.replace(/\(.*?\)/g, "").replace(/['"]/g, "").trim();
  if (clean.toLowerCase().startsWith("el ") || clean.toLowerCase().startsWith("la ")) {
    const withoutArticle = clean.substring(3).trim();
    const parts = withoutArticle.split(" ");
    if (parts[0] && parts[0].length > 1) return parts[0];
  }
  const parts = clean.split(" ");
  if (parts.length >= 2 && parts[0].length > 1) {
    return parts[0];
  }
  return clean;
}

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
    <h2 class="reveal-hero-name anim-question-reveal">${currentVictim.name}</h2>
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
    <h2 class="reveal-hero-name anim-question-reveal">${cand.name}</h2>
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
    <h2 class="reveal-hero-name anim-question-reveal">${cand.name}</h2>
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
    <h2 class="reveal-hero-name anim-question-reveal">${cand.name}</h2>
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
  victimCard.className = "squad-celeb-card victim-highlight anim-card-stagger-1";
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
    candCard.className = `squad-celeb-card candidate-card anim-card-stagger-${idx + 2} ${isAssigned ? 'assigned-role-' + assignedRoleKey : ''}`;
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
  const chain = document.getElementById("semaforoPearlsChain");

  if (cat) cat.textContent = (item.category || "RED FLAGS").toUpperCase();
  if (count) count.textContent = `SITUACIÓN ${semaforoRoundIndex + 1} / 10`;

  if (text) {
    text.textContent = item.text;
    text.classList.remove("anim-question-reveal");
    void text.offsetWidth;
    text.classList.add("anim-question-reveal");
  }

  // Render 10-Pearls Interactive Status Chain
  if (chain) {
    chain.innerHTML = semaforoRoundCases.map((c, idx) => {
      const v = semaforoRoundVotes[idx];
      let vClass = "";
      let icon = idx + 1;
      if (v === "verde") { vClass = "pearl-verde"; icon = "🟢"; }
      else if (v === "amarillo") { vClass = "pearl-amarillo"; icon = "🟡"; }
      else if (v === "rojo") { vClass = "pearl-rojo"; icon = "🔴"; }
      else if (v === "fuego") { vClass = "pearl-fuego"; icon = "🔥"; }
      const isCur = idx === semaforoRoundIndex;
      return `<div class="pearl-node ${vClass} ${isCur ? 'active-now' : ''}" title="Situación ${idx + 1}">${icon}</div>`;
    }).join("");
  }

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

  // Re-render pearls chain to reflect vote
  const chain = document.getElementById("semaforoPearlsChain");
  if (chain) {
    chain.innerHTML = semaforoRoundCases.map((c, idx) => {
      const v = semaforoRoundVotes[idx];
      let vClass = "";
      let icon = idx + 1;
      if (v === "verde") { vClass = "pearl-verde"; icon = "🟢"; }
      else if (v === "amarillo") { vClass = "pearl-amarillo"; icon = "🟡"; }
      else if (v === "rojo") { vClass = "pearl-rojo"; icon = "🔴"; }
      else if (v === "fuego") { vClass = "pearl-fuego"; icon = "🔥"; }
      const isCur = idx === semaforoRoundIndex;
      return `<div class="pearl-node ${vClass} ${isCur ? 'active-now' : ''}" title="Situación ${idx + 1}">${icon}</div>`;
    }).join("");
  }

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

  const bTitle = document.getElementById("bandoTitle");
  if (bTitle) {
    bTitle.textContent = duel.title;
    bTitle.classList.remove("anim-question-reveal");
    void bTitle.offsetWidth;
    bTitle.classList.add("anim-question-reveal");
  }

  // Side A
  document.getElementById("bandoSideAName").textContent = duel.sideA.name;
  document.getElementById("bandoSideABadge").textContent = duel.sideA.badge;
  document.getElementById("bandoSideAArg").textContent = `"${duel.sideA.argument}"`;

  // Side B
  document.getElementById("bandoSideBName").textContent = duel.sideB.name;
  document.getElementById("bandoSideBBadge").textContent = duel.sideB.badge;
  document.getElementById("bandoSideBArg").textContent = `"${duel.sideB.argument}"`;

  // Dynamic Button Labels (e.g. "BANCAR A WANDA [1]", "BANCAR A MAXI [2]")
  const nameA = getShortDisplayName(duel.sideA.name).toUpperCase();
  const nameB = getShortDisplayName(duel.sideB.name).toUpperCase();
  const btnA = document.getElementById("btnVoteSideA");
  const btnB = document.getElementById("btnVoteSideB");
  if (btnA) btnA.textContent = `BANCAR A ${nameA} [1]`;
  if (btnB) btnB.textContent = `BANCAR A ${nameB} [2]`;

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
  if (typeof GUERRA_BANDOS_DATA === "undefined" || !GUERRA_BANDOS_DATA.length) return;
  const duel = GUERRA_BANDOS_DATA[currentBandoIndex];
  const nameA = getShortDisplayName(duel.sideA.name);
  const nameB = getShortDisplayName(duel.sideB.name);

  const total = bandoVotes.a + bandoVotes.b;
  const pctA = Math.round((bandoVotes.a / total) * 100);
  const pctB = 100 - pctA;

  const labelA = document.getElementById("bandoLabelA");
  const labelB = document.getElementById("bandoLabelB");
  if (labelA) labelA.innerHTML = `${nameA}: <strong id="bandoPctA">${pctA}%</strong>`;
  else {
    const elPctA = document.getElementById("bandoPctA");
    if (elPctA) elPctA.textContent = `${pctA}%`;
  }
  if (labelB) labelB.innerHTML = `${nameB}: <strong id="bandoPctB">${pctB}%</strong>`;
  else {
    const elPctB = document.getElementById("bandoPctB");
    if (elPctB) elPctB.textContent = `${pctB}%`;
  }

  const fillA = document.getElementById("meterFillA");
  const fillB = document.getElementById("meterFillB");
  if (fillA) fillA.style.width = `${pctA}%`;
  if (fillB) fillB.style.width = `${pctB}%`;
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
  const bigQEl = document.getElementById("tribunalBigQuestion");
  const ctxEl = document.getElementById("tribunalContext");
  const quoteEl = document.getElementById("tribunalProtagonistQuote");

  if (counterEl) counterEl.textContent = `CASO ${currentTribunalIndex + 1} / ${TRIBUNAL_CASES.length}`;
  if (catEl) catEl.textContent = (currentCase.category || "FARÁNDULA").toUpperCase();
  if (titleEl) titleEl.textContent = currentCase.title;
  if (qNameEl) qNameEl.textContent = (currentCase.protagonist || "WANDA NARA").toUpperCase();
  if (ctxEl) ctxEl.textContent = currentCase.context;
  if (quoteEl) quoteEl.textContent = `"${currentCase.quote || '¿Qué harías vos en su lugar?'}"`;

  if (bigQEl) {
    bigQEl.classList.remove("anim-question-reveal");
    void bigQEl.offsetWidth;
    bigQEl.classList.add("anim-question-reveal");
  }

  renderTribunalCards(currentCase.options);
  resetTribunalPodiums();
  setTribunalPhase(1);
  updateLowerThirdTribunal();
}

function renderTribunalCards(options) {
  const container = document.getElementById("tribunalCardsGrid");
  if (!container) return;
  container.innerHTML = "";

  options.forEach((opt, idx) => {
    const card = document.createElement("div");
    card.className = `tribunal-option-card style-${opt.style || 'holder'} anim-card-stagger-${idx + 1}`;
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
      if (currentTab === "show-dia" && currentShowStep === 4) {
        voteShowSemaforoMulti("fuego");
      } else {
        toggleFullscreen();
      }
    } else if (key === "T") {
      if (currentTab === "show-dia" && currentShowStep === 7) {
        toggleShowFunaTimer();
      } else {
        document.getElementById("topbarTimerPlay")?.click();
      }
    } else if (key === "V") {
      if (currentTab === "show-dia" && currentShowStep === 4) {
        voteShowSemaforoMulti("verde");
      } else {
        triggerSoundEffect("siren");
      }
    } else if (key === "A") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 3) selectShowTribunalMulti("A");
        else if (currentShowStep === 4) voteShowSemaforoMulti("amarillo");
      }
    } else if (key === "B") {
      if (currentTab === "show-dia" && currentShowStep === 3) {
        selectShowTribunalMulti("B");
      }
    } else if (key === "C") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 3) selectShowTribunalMulti("C");
        else if (currentShowStep === 7) resolveShowFuna("cancelado");
      }
    } else if (key === "Z") {
      if (currentTab === "show-dia" && currentShowStep === 7) {
        resolveShowFuna("zafo");
      }
    } else if (key === "R") {
      if (currentTab === "show-dia" && currentShowStep === 4) {
        voteShowSemaforoMulti("rojo");
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
        if (currentShowStep === 1) voteAperturaAll("a");
        else if (currentShowStep === 2) voteShowBandoAll("a");
        else if (currentShowStep === 3) voteTribunalAll("A");
        else if (currentShowStep === 6) {
          const curR = currentShowEpisode?.ruletaList[showRuletaSubIndex];
          if (curR?.candidates[0]) assignShowThroneMulti("casorio", curR.candidates[0].name);
        }
      } else if (currentTab === "bandos") voteBando("a");
      triggerSoundEffect("fire");
    } else if (key === "2") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 1) voteAperturaAll("b");
        else if (currentShowStep === 2) voteShowBandoAll("b");
        else if (currentShowStep === 3) voteTribunalAll("B");
        else if (currentShowStep === 6) {
          const curR = currentShowEpisode?.ruletaList[showRuletaSubIndex];
          if (curR?.candidates[1]) assignShowThroneMulti("chongo", curR.candidates[1].name);
        }
      } else if (currentTab === "bandos") voteBando("b");
      triggerSoundEffect("factos");

    } else if (key === "3") {
      if (currentTab === "show-dia") {
        if (currentShowStep === 1) voteAperturaAll("C");
        else if (currentShowStep === 3) voteTribunalAll("C");
        else if (currentShowStep === 6) {
          const curR = currentShowEpisode?.ruletaList[showRuletaSubIndex];
          if (curR?.candidates[2]) assignShowThroneMulti("funa", curR.candidates[2].name);
        }
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
// 15. MÓDULO MASTER: EL SHOW DEL DÍA (MEGA SHOW 8 BLOQUES)
// =========================================================
let currentShowEpisode = null;
let currentShowStep = 1;
let showBandosSubIndex = 0;
let showTribunalSubIndex = 0;
let showSemaforoSubIndex = 0;
let showRuletaSubIndex = 0;
let showPodioState = [];
let showFunaTimer = 30;
let showFunaRunning = false;
let showFunaInterval = null;

let showUserChoices = {
  mode: "today",
  aperturaVote: null,
  bandos: [],
  tribunal: [],
  semaforo: [],
  podio: [],
  ruleta: [],
  funa: { accused: "holder", result: null },
  metrics: { venom: 80, aura: 85, migajera: 70, careta: 40 }
};

function setupShowDiaEvents() {
  document.getElementById("btnPrevShowStep")?.addEventListener("click", prevShowDiaStep);
  document.getElementById("btnNextShowStep")?.addEventListener("click", nextShowDiaStep);

  document.querySelectorAll("[data-show-step]").forEach(pill => {
    pill.addEventListener("click", () => {
      const targetStep = parseInt(pill.dataset.showStep, 10);
      if (targetStep >= 1 && targetStep <= 8) {
        setShowDiaStep(targetStep);
      }
    });
  });
}

function startShowDia(mode = "today") {
  audioFX.playFireIgnite();
  showUserChoices.mode = mode;
  showBandosSubIndex = 0;
  showTribunalSubIndex = 0;
  showSemaforoSubIndex = 0;
  showRuletaSubIndex = 0;
  showUserChoices.bandos = [];
  showUserChoices.tribunal = [];
  showUserChoices.semaforo = [];
  showUserChoices.ruleta = [];

  if (mode === "today") {
    // 1. APERTURA EDITORIAL
    const apertura = {
      question: "¿HASTA DÓNDE SE JUSTIFICA QUEMAR A UN EX POR RATING Y DESPECHO?",
      context: "El país habla de Wanda consultándole a ChatGPT 7 infidelidades de Maxi tras las anécdotas de Rusia, Tini auditando a su padre con Messi y Antonela, y Messi anunciando su retiro oficial. ¿Todo vale en la guerra del ego?",
      stances: {
        holder: { name: "Tomás Holder", title: "Factos & Cero Hipocresía", text: "Si el vínculo se rompió y no hay lealtad, se tira con todo. Facturá, mostrá las pruebas y no te dejes pisotear jamás." },
        diane: { name: "Diane Caracchi", title: "Dignidad & Códigos", text: "Hay un límite ético. Cuando hay hijos o familia de por medio, el despecho en redes te degrada a vos misma." },
        luli: { name: "Luli Casé", title: "Despecho Glam & Tarot", text: "¡Chicas, firmar 'Solange' es arte puro! Si te rompieron el corazón, que arda Troya y que la culpa la paguen ellos." }
      },
      chatTrigger: "¿De qué lado estás en la mesa? Escribí [1] FACTOS, [2] DIGNIDAD o [3] DESPECHO en el chat."
    };

    // 2. GUERRA DE BANDOS (3 DUELOS AL HILO)
    const bandosList = [
      GUERRA_BANDOS_DATA[0] || {
        id: "duelo-wanda-maxi",
        title: "El Escándalo de Rusia: Wanda Nara vs. Maxi López",
        guide: "¿Bancás a Solange exponiendo las 7 infidelidades históricas o a Maxi que rehizo su vida?",
        sideA: { name: "Wanda Nara ('Solange')", badge: "La que Consulta a ChatGPT", argument: "Bancó sola 3 hijos en Rusia mientras Maxi andaba de joda; tiene derecho a cobrarle todo.", image: "assets/celebrities/wanda-nara.jpg" },
        sideB: { name: "Maxi López", badge: "El que Elige Seguir Adelante", argument: "Fueron anécdotas de soltero antes del matrimonio; Wanda no supera el pasado.", image: "assets/celebrities/maxi-lopez.jpg" }
      },
      GUERRA_BANDOS_DATA[1] || {
        id: "duelo-messi-retiro",
        title: "El Retiro del Capitán: Messi se Despidió de la Selección",
        guide: "¿Retirarse en la cima como el Rey Indiscutido o el clamor del pueblo por 'Un Baile Más'?",
        sideA: { name: "Retiro en la Cima (Gloria Eterna)", badge: "El Fin de una Era", argument: "Ganó todo: Copa América, Finalissima y el Mundial. Irse como Campeón del Mundo es grandeza pura.", image: "assets/logo-pf.jpg" },
        sideB: { name: "El Clamor Popular ('Un Baile Más')", badge: "El Vacío Nacional", argument: "El país se niega a soltarlo; con 39 años sigue siendo el mejor del planeta y lo necesitamos.", image: "assets/logo-pf.jpg" }
      },
      GUERRA_BANDOS_DATA[2] || {
        id: "duelo-tinigate",
        title: "El #TiniGate (US$ 70.000.000): Tini vs. Alejandro Stoessel",
        guide: "¿Auditoría implacable con Messi y Antonela o perdón familiar por respeto a los padres?",
        sideA: { name: "Tini Stoessel (Con Messi y Anto)", badge: "La que Reclama su Trabajo", argument: "Trabajó desde niña sin parar; su dinero le pertenece y debe recuperar hasta el último dólar.", image: "assets/celebrities/tini-stoessel.jpg" },
        sideB: { name: "Alejandro Stoessel", badge: "El Padre & Mánager", argument: "La convirtió en estrella mundial desde Disney; la familia está por encima de los negocios.", image: "assets/logo-pf.jpg" }
      }
    ];

    // 3. TRIBUNAL DE FARÁNDULA (3 CASOS)
    const tribunalList = [
      TRIBUNAL_CASES[1] || TRIBUNAL_CASES[0],
      TRIBUNAL_CASES[2] || TRIBUNAL_CASES[0],
      TRIBUNAL_CASES[3] || TRIBUNAL_CASES[0]
    ];

    // 4. SEMÁFORO DE TOXICIDAD (7 RED FLAGS)
    const semaforoList = [
      {
        id: "sem-1",
        title: "El Historial de Infidelidades con ChatGPT",
        category: "Farándula / Wanda & Maxi",
        guide: "¿Normal o Despecho Tóxico?",
        text: "Le pedís a ChatGPT que liste las 7 infidelidades de tu ex (el barco, la empleada y Barcelona) y subís la captura a Instagram firmando como 'Solange'..."
      },
      {
        id: "sem-2",
        title: "La Icardeada Histórica & El Tatuaje con los Hijos",
        category: "Códigos de Amistad",
        guide: "¿Se perdona o se rompen códigos para siempre?",
        text: "Tu mejor amigo de club te recibe en su casa de Italia y a los 6 meses se casa con tu ex mujer y se tatúa los nombres de tus 3 hijos en el brazo..."
      },
      {
        id: "sem-3",
        title: "El Fetiche de PH & El Ojo de Leuco",
        category: "Intimidad / Juli Poggio & Edul",
        guide: "¿Te copa en la primera cita o salís corriendo?",
        text: "En la primera cita te confiesa que le gusta dar chirlos en la cama y el truco del ojo mientras Gastón Edul te mira con cara cómplice..."
      },
      {
        id: "sem-4",
        title: "El Llanto Desconsolado por el Retiro de Messi",
        category: "Urgente / Conmoción Nacional",
        guide: "¿Empatía total o exageración?",
        text: "Tu pareja se tira a llorar en el piso y cancela todos los planes de la semana porque Messi acaba de publicar su carta de despedida definitiva de la Selección Argentina..."
      },
      {
        id: "sem-5",
        title: "Prohibido Azúcar y Medialunas en la Oficina",
        category: "Trabajo / El Jefe Sigma Fit",
        guide: "¿Disciplina laboral o explotación tóxica?",
        text: "Tu jefe fit te descuenta el sueldo si te encuentra comiendo facturas con grasa de 9 a 18 hs porque 'te da pico de insulina y baja la productividad'..."
      },
      {
        id: "sem-6",
        title: "Tener 22 Años, Ganar Millones y que tu Mamá te Administre Todo",
        category: "Familia & Dinero / Juli Poggio",
        guide: "¿Ahorro inteligente o falta de madurez?",
        text: "Sos mayor de edad, facturás millones por mes pero tu mamá maneja tus cuentas y te pasa plata por semana porque no confía en que sepas ahorrar..."
      },
      {
        id: "sem-7",
        title: "El Casting Bizarro para Hacer Reír a Tinelli",
        category: "Streaming & Cringe / Luzu TV",
        guide: "¿Banco las ganas de figurar o vergüenza ajena?",
        text: "Tu pareja va a un casting de '30 Segundos de Fama' disfrazado de dinosaurio a pasar vergüenza nacional para que Tinelli se tiente en vivo..."
      }
    ];

    // 5. PODIO TOP RANKING
    const podioItem = {
      title: "TOP 5: LAS PEORES TRAICIONES DEL MULTIVERSO WANDAGATE",
      guide: "La mesa debe ordenar del #1 (El más traidor y sin códigos) al #5 (El traidor con más glamour o justificación).",
      candidates: [
        { id: "icardi", name: "Mauro Icardi", crime: "La Icardeada a Maxi López (Amigo de club)", image: "assets/celebrities/mauro-icardi.jpg" },
        { id: "china", name: "La China Suárez", crime: "El Motorhome y el Hotel de París", image: "assets/celebrities/china-suarez.jpg" },
        { id: "maxi", name: "Maxi López", crime: "Las 7 Infidelidades y Sótanos de Rusia", image: "assets/celebrities/maxi-lopez.jpg" },
        { id: "lgante", name: "L-Gante", crime: "El Romance de Cumbia y el Chateau", image: "assets/celebrities/l-gante.jpg" },
        { id: "wanda", name: "Wanda Nara", crime: "Exponer a todos con ChatGPT en LAM", image: "assets/celebrities/wanda-nara.jpg" }
      ]
    };
    showPodioState = [...podioItem.candidates];

    // 6. RULETA & 3 TRONOS (2 RONDAS)
    const ruletaList = [
      {
        victim: celebrities.find(c => c.id === "wanda-nara") || { name: "Wanda Nara", image: "assets/celebrities/wanda-nara.jpg", tag: "La Empresaria del Despecho", lore: "En el ojo de la tormenta tras exponer a Maxi López con ChatGPT y firmar 'Solange'." },
        candidates: [
          celebrities.find(c => c.id === "maxi-lopez") || { name: "Maxi López", image: "assets/celebrities/maxi-lopez.jpg", lore: "El primer marido, padre de 3 hijos y bardo de Rusia." },
          celebrities.find(c => c.id === "mauro-icardi") || { name: "Mauro Icardi", image: "assets/celebrities/mauro-icardi.jpg", lore: "10 años de matrimonio, 2 hijas y la Icardeada histórica." },
          celebrities.find(c => c.id === "l-gante") || { name: "L-Gante", image: "assets/celebrities/l-gante.jpg", lore: "Cumbia 420, amor en Río de Janeiro y guerra en el Chateau." }
        ]
      },
      {
        victim: celebrities.find(c => c.id === "juli-poggio") || { name: "Juli Poggio", image: "assets/celebrities/juli-poggio.jpg", tag: "La Soltera de PH", lore: "Confesó sus fetiches sexuales en la tele y cruzó miradas cómplices con Gastón Edul." },
        candidates: [
          celebrities.find(c => c.id === "gaston-edul") || { name: "Gastón Edul", image: "assets/celebrities/gaston-edul.jpg", lore: "El cronista de la Selección con el que hubo miradas y tensión en PH." },
          celebrities.find(c => c.id === "marcos-ginocchio") || { name: "Marcos Ginocchio", image: "assets/celebrities/marcos-ginocchio.jpg", lore: "El shippeo eterno de Marculi desde Gran Hermano." },
          celebrities.find(c => c.id === "marcelo-tinelli") || { name: "Marcelo Tinelli", image: "assets/celebrities/marcelo-tinelli.jpg", lore: "Reviviendo los 30 segundos de fama tentado de risa en Luzu TV." }
        ]
      }
    ];

    currentShowEpisode = {
      title: "PROGRAMA DE HOY • LUNES 31/08",
      badge: "🔥 GUION OFICIAL • MEGA SHOW TRANSMISIÓN COMPLETA",
      apertura,
      bandosList,
      tribunalList,
      semaforoList,
      podioItem,
      ruletaList,
      funaAccused: "holder"
    };
  } else {
    // Modo RNG aleatorio de 8 bloques
    const shuffledBandos = [...GUERRA_BANDOS_DATA].sort(() => 0.5 - Math.random());
    const shuffledTribunal = [...TRIBUNAL_CASES].sort(() => 0.5 - Math.random());
    const shuffledSemaforo = [...SEMAFORO_CASES].sort(() => 0.5 - Math.random());
    const shuffledCelebs = [...celebrities].sort(() => 0.5 - Math.random());

    currentShowEpisode = {
      title: "MEGA SHOW ALEATORIO (MODO RNG)",
      badge: "🎲 TRANSMISIÓN ALEATORIA INFINITA",
      apertura: {
        question: "¿CUÁL ES EL LÍMITE DE LA CARETEADA EN LA TELE Y EL STREAMING?",
        context: "La mesa debate las mayores polémicas de la farándula argentina con posturas enfrentadas.",
        stances: {
          holder: { name: "Tomás Holder", title: "Factos", text: "La verdad sin filtro siempre, caiga quien caiga." },
          diane: { name: "Diane Caracchi", title: "Límites", text: "Respeto a los códigos y coherencia personal." },
          luli: { name: "Luli Casé", title: "Empatía", text: "Entender el dolor del otro y perdonar." }
        },
        chatTrigger: "¿Con qué conductor te identificás hoy? Votá en el chat."
      },
      bandosList: shuffledBandos.slice(0, 3),
      tribunalList: shuffledTribunal.slice(0, 3),
      semaforoList: shuffledSemaforo.slice(0, 7),
      podioItem: {
        title: "TOP 5: RANKING DE CARETEADA Y TRAICIONES",
        guide: "Ordená a los personajes del más careta al más auténtico de la noche.",
        candidates: shuffledCelebs.slice(0, 5).map(c => ({ id: c.id, name: c.name, crime: c.tag || c.lore, image: c.image }))
      },
      ruletaList: [
        { victim: shuffledCelebs[5], candidates: shuffledCelebs.slice(6, 9) },
        { victim: shuffledCelebs[9], candidates: shuffledCelebs.slice(10, 13) }
      ],
      funaAccused: "holder"
    };
    showPodioState = [...currentShowEpisode.podioItem.candidates];
  }

  switchTab("show-dia");
  setShowDiaStep(1);
}

function setShowDiaStep(step) {
  currentShowStep = Math.max(1, Math.min(8, step));
  audioFX.playReveal();

  // Actualizar Barra y Nodos del Pipeline de Progreso
  const fill = document.getElementById("showPipelineFill");
  if (fill) {
    fill.style.width = `${(currentShowStep / 8) * 100}%`;
  }

  document.querySelectorAll("#showStepIndicators .pipeline-node-btn, #showStepIndicators .step-pill").forEach(pill => {
    const s = parseInt(pill.dataset.showStep, 10);
    pill.classList.toggle("active", s === currentShowStep);
    pill.classList.toggle("completed", s < currentShowStep);
  });


  const modeBadge = document.getElementById("showModeBadge");
  const stepCounter = document.getElementById("showStepCounter");
  const stageTitle = document.getElementById("showStageTitle");

  if (modeBadge && currentShowEpisode) modeBadge.textContent = currentShowEpisode.badge;
  if (stepCounter) stepCounter.textContent = `BLOQUE ${currentShowStep} / 8`;

  const titles = [
    "",
    "🎙️ BLOQUE 1: APERTURA & PREGUNTA EDITORIAL DEL DÍA",
    `⚔️ BLOQUE 2: GUERRA DE BANDOS (DUELO ${showBandosSubIndex + 1} DE ${currentShowEpisode?.bandosList?.length || 3})`,
    `⚖️ BLOQUE 3: EL TRIBUNAL DE FARÁNDULA (JUICIO ${showTribunalSubIndex + 1} DE ${currentShowEpisode?.tribunalList?.length || 3})`,
    `🚦 BLOQUE 4: LA RÁFAGA DEL SEMÁFORO (RED FLAG ${showSemaforoSubIndex + 1} DE ${currentShowEpisode?.semaforoList?.length || 7})`,
    "🏆 BLOQUE 5: EL PODIO DEL BIZARREO (TOP 5 EN VIVO)",
    `🎡 BLOQUE 6: LA RULETA DE 3 TRONOS (RONDA ${showRuletaSubIndex + 1} DE ${currentShowEpisode?.ruletaList?.length || 2})`,
    "🚨 BLOQUE 7: LA ZONA DE FUNA & DERECHO A RÉPLICA (30s)",
    "📊 BLOQUE 8: MASTER DASHBOARD & ANÁLISIS TOXICOLÓGICO TOTAL"
  ];
  if (stageTitle) stageTitle.textContent = titles[currentShowStep];

  const body = document.getElementById("showStageBody");
  if (!body) return;

  if (currentShowStep === 1) renderShowStep1_Apertura(body);
  else if (currentShowStep === 2) renderShowStep2_Bandos(body);
  else if (currentShowStep === 3) renderShowStep3_Tribunal(body);
  else if (currentShowStep === 4) renderShowStep4_Semaforo(body);
  else if (currentShowStep === 5) renderShowStep5_Podio(body);
  else if (currentShowStep === 6) renderShowStep6_Ruleta(body);
  else if (currentShowStep === 7) renderShowStep7_Funa(body);
  else if (currentShowStep === 8) renderShowStep8_Dashboard(body);

  updateLowerThirdShowDia();
}

function nextShowDiaStep() {
  if (currentShowStep === 2) {
    const max = (currentShowEpisode?.bandosList?.length || 3) - 1;
    if (showBandosSubIndex < max) {
      showBandosSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep2_Bandos(body);
      audioFX.playTick(600, 0.2);
      setShowDiaStep(2);
      return;
    }
  } else if (currentShowStep === 3) {
    const max = (currentShowEpisode?.tribunalList?.length || 3) - 1;
    if (showTribunalSubIndex < max) {
      showTribunalSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep3_Tribunal(body);
      audioFX.playTick(600, 0.2);
      setShowDiaStep(3);
      return;
    }
  } else if (currentShowStep === 4) {
    const max = (currentShowEpisode?.semaforoList?.length || 7) - 1;
    if (showSemaforoSubIndex < max) {
      showSemaforoSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep4_Semaforo(body);
      audioFX.playTick(600, 0.2);
      setShowDiaStep(4);
      return;
    }
  } else if (currentShowStep === 6) {
    const max = (currentShowEpisode?.ruletaList?.length || 2) - 1;
    if (showRuletaSubIndex < max) {
      showRuletaSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep6_Ruleta(body);
      audioFX.playTick(600, 0.2);
      setShowDiaStep(6);
      return;
    }
  }

  if (currentShowStep < 8) {
    setShowDiaStep(currentShowStep + 1);
  }
}

// ---------------------------------------------------------
// BLOQUE 1: APERTURA & GRAN DUELO DE PORTADA DEL DÍA
// ---------------------------------------------------------
function renderShowStep1_Apertura(container) {

  const apDuel = currentShowEpisode?.aperturaDuel || {
    title: "EL ESCÁNDALO DE RUSIA: WANDA NARA VS. MAXI LÓPEZ",
    guide: "La gran polémica del día: ¿A quién banca cada conductor de la mesa?",
    sideA: {
      name: "Wanda Nara ('Solange')",
      badge: "La que Consulta a ChatGPT",
      image: "assets/logo-pf.jpg",
      argument: "Bancó 3 hijos sola en Moscú mientras Maxi andaba de joda; tiene derecho a exponer las 7 infidelidades que le confirmó ChatGPT y advertir a las mujeres que ser mantenida sale caro."
    },
    sideB: {
      name: "Maxi López",
      badge: "El que Elige Seguir Adelante",
      image: "assets/logo-pf.jpg",
      argument: "Fueron anécdotas de soltero antes del matrimonio; Wanda no puede soltar el pasado y usa cualquier declaración para generar show y prensa para sus programas de cocina."
    },
    chatTrigger: "¿De qué lado está el chat? Escribí [1] WANDA o [2] MAXI en vivo."
  };

  if (!showUserChoices.aperturaVotes) {
    showUserChoices.aperturaVotes = { holder: null, diane: null, luli: null };
  }
  const votes = showUserChoices.aperturaVotes;

  const countA = Object.values(votes).filter(v => v === "a").length;
  const countB = Object.values(votes).filter(v => v === "b").length;
  const total = countA + countB;
  const pctA = total === 0 ? 50 : Math.round((countA / total) * 100);
  const pctB = 100 - pctA;

  let apVerdict = "EMPATE EN MESA";
  if (countA > countB) apVerdict = `GANA ${getShortDisplayName(apDuel.sideA.name).toUpperCase()} (${countA} a ${countB})`;
  else if (countB > countA) apVerdict = `GANA ${getShortDisplayName(apDuel.sideB.name).toUpperCase()} (${countB} a ${countA})`;

  const getBackersHtml = (side) => {
    const list = [];
    if (votes.holder === side) list.push('<span class="backer-pill pill-holder">🗿 Tomás Holder</span>');
    if (votes.diane === side) list.push('<span class="backer-pill pill-diane">🟢 Diane Caracchi</span>');
    if (votes.luli === side) list.push('<span class="backer-pill pill-luli">💔 Luli Casé</span>');
    return list.length ? `<div class="backers-chips-box"><span class="bc-lbl">Bancado por:</span> ${list.join(" ")}</div>` : '<div class="backers-chips-box empty"><span>Nadie de la mesa lo votó aún</span></div>';
  };

  container.innerHTML = `
    <div class="show-stage-card apertura-block-card bandos-step-arena">
      
      <!-- HERO TITLE DISPARADOR -->
      <div class="apertura-hero-question anim-question-reveal">
        <div class="ahq-tag">🎯 APERTURA DEL PROGRAMA • EL TEMA DE PORTADA DEL DÍA</div>
        <h2 class="ahq-title">${apDuel.title}</h2>
        <p class="ahq-context">${apDuel.guide}</p>
      </div>

      <!-- ENFRENTAMIENTO DE LOS 2 PROTAGONISTAS -->
      <div class="bandos-clash-grid">
        
        <!-- LADO A: WANDA -->
        <div class="bando-fighter-card side-a anim-card-stagger-1 ${countA > countB ? 'selected-winner' : ''}">
          <div class="fighter-photo-wrap">
            <img src="${apDuel.sideA.image}" alt="${apDuel.sideA.name}" class="fighter-img" onerror="this.src='assets/logo-pf.jpg'">
            <div class="fighter-badge">${apDuel.sideA.badge}</div>
          </div>
          <h3 class="fighter-name">${apDuel.sideA.name}</h3>
          <p class="fighter-argument">${apDuel.sideA.argument}</p>
          
          ${getBackersHtml("a")}

          <button class="btn-vote-fighter" onclick="voteAperturaAll('a')">
            VOTO MAYORITARIO A (${getShortDisplayName(apDuel.sideA.name)}) [1]
          </button>
        </div>

        <!-- VS SCORE PIECE -->
        <div class="clash-center-piece">
          <div class="vs-flame-circle pulse-fire-glow">VS</div>
          <div class="vs-score-indicator">${countA} - ${countB}</div>
        </div>

        <!-- LADO B: MAXI -->
        <div class="bando-fighter-card side-b anim-card-stagger-2 ${countB > countA ? 'selected-winner' : ''}">
          <div class="fighter-photo-wrap">
            <img src="${apDuel.sideB.image}" alt="${apDuel.sideB.name}" class="fighter-img" onerror="this.src='assets/logo-pf.jpg'">
            <div class="fighter-badge">${apDuel.sideB.badge}</div>
          </div>
          <h3 class="fighter-name">${apDuel.sideB.name}</h3>
          <p class="fighter-argument">${apDuel.sideB.argument}</p>
          
          ${getBackersHtml("b")}

          <button class="btn-vote-fighter" onclick="voteAperturaAll('b')">
            VOTO MAYORITARIO B (${getShortDisplayName(apDuel.sideB.name)}) [2]
          </button>
        </div>

      </div>

      <!-- PANEL DE VOTACIÓN INDIVIDUAL DE CONDUCTORES -->
      <div class="hosts-individual-vote-panel">
        <div class="hiv-title">🗳️ ¿A QUIÉN BANCA CADA CONDUCTOR? (CADA UNO DESARROLLA Y DEFIENDE SU POSTURA):</div>
        <div class="hiv-grid">
          
          <!-- HOLDER -->
          <div class="hiv-host-card card-holder">
            <div class="hiv-host-name">🗿 Tomás Holder</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${votes.holder === 'a' ? 'active-a' : ''}" onclick="voteAperturaByHost('holder', 'a')">
                ${getShortDisplayName(apDuel.sideA.name)}
              </button>
              <button class="btn-hiv ${votes.holder === 'b' ? 'active-b' : ''}" onclick="voteAperturaByHost('holder', 'b')">
                ${getShortDisplayName(apDuel.sideB.name)}
              </button>
            </div>
          </div>

          <!-- DIANE -->
          <div class="hiv-host-card card-diane">
            <div class="hiv-host-name">🟢 Diane Caracchi</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${votes.diane === 'a' ? 'active-a' : ''}" onclick="voteAperturaByHost('diane', 'a')">
                ${getShortDisplayName(apDuel.sideA.name)}
              </button>
              <button class="btn-hiv ${votes.diane === 'b' ? 'active-b' : ''}" onclick="voteAperturaByHost('diane', 'b')">
                ${getShortDisplayName(apDuel.sideB.name)}
              </button>
            </div>
          </div>

          <!-- LULI -->
          <div class="hiv-host-card card-luli">
            <div class="hiv-host-name">💔 Luli Casé</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${votes.luli === 'a' ? 'active-a' : ''}" onclick="voteAperturaByHost('luli', 'a')">
                ${getShortDisplayName(apDuel.sideA.name)}
              </button>
              <button class="btn-hiv ${votes.luli === 'b' ? 'active-b' : ''}" onclick="voteAperturaByHost('luli', 'b')">
                ${getShortDisplayName(apDuel.sideB.name)}
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- TUG OF WAR BAR -->
      <div class="tug-meter-box">
        <div class="tug-meter-labels">
          <span class="tug-label-a">${apDuel.sideA.name}: <strong>${pctA}%</strong></span>
          <span class="tug-meter-title">⚖️ VEREDICTO DE LA MESA: ${apVerdict}</span>
          <span class="tug-label-b">${apDuel.sideB.name}: <strong>${pctB}%</strong></span>
        </div>
        <div class="tug-bar-track">
          <div class="tug-fill-a" style="width: ${pctA}%;"></div>
          <div class="tug-fill-b" style="width: ${pctB}%;"></div>
        </div>
      </div>

      <!-- CHAT TRIGGER BAR -->
      <div class="apertura-chat-trigger-bar">
        <span class="act-icon">💬</span>
        <div class="act-text">
          <strong>DISPARADOR PARA EL CHAT DE LA TRANSMISIÓN:</strong>
          <span>${apDuel.chatTrigger}</span>
        </div>
      </div>

    </div>
  `;
}

function voteAperturaByHost(hostKey, side) {
  side = (side || "a").toLowerCase();
  if (!showUserChoices.aperturaVotes) {
    showUserChoices.aperturaVotes = { holder: null, diane: null, luli: null };
  }
  showUserChoices.aperturaVotes[hostKey] = side;

  if (side === "a") audioFX.playFireIgnite();
  else audioFX.playFactosHorn();

  const body = document.getElementById("showStageBody");
  if (body) renderShowStep1_Apertura(body);
}

function voteAperturaAll(side) {
  voteAperturaByHost("holder", side);
  voteAperturaByHost("diane", side);
  voteAperturaByHost("luli", side);
}

// ---------------------------------------------------------
// BLOQUE 2: GUERRA DE BANDOS (3 DUELOS AL HILO)
// ---------------------------------------------------------
function renderShowStep2_Bandos(container) {
  const duels = currentShowEpisode?.bandosList || [GUERRA_BANDOS_DATA[0]];
  const duel = duels[showBandosSubIndex] || duels[0];
  
  if (!showUserChoices.bandos[showBandosSubIndex]) {
    showUserChoices.bandos[showBandosSubIndex] = {
      duel,
      hostVotes: { holder: null, diane: null, luli: null },
      votesA: 50,
      votesB: 50
    };
  }
  const hostVotes = showUserChoices.bandos[showBandosSubIndex].hostVotes;
  const votesA = showUserChoices.bandos[showBandosSubIndex].votesA;
  const votesB = showUserChoices.bandos[showBandosSubIndex].votesB;

  const countA = Object.values(hostVotes).filter(v => v === "a").length;
  const countB = Object.values(hostVotes).filter(v => v === "b").length;

  let bandosVerdict = "EMPATE EN MESA";
  if (countA > countB) bandosVerdict = `GANA ${getShortDisplayName(duel.sideA.name).toUpperCase()} (${countA} a ${countB})`;
  else if (countB > countA) bandosVerdict = `GANA ${getShortDisplayName(duel.sideB.name).toUpperCase()} (${countB} a ${countA})`;

  const getBackersHtml = (side) => {
    const list = [];
    if (hostVotes.holder === side) list.push('<span class="backer-pill pill-holder">🗿 Tomás Holder</span>');
    if (hostVotes.diane === side) list.push('<span class="backer-pill pill-diane">🟢 Diane Caracchi</span>');
    if (hostVotes.luli === side) list.push('<span class="backer-pill pill-luli">💔 Luli Casé</span>');
    return list.length ? `<div class="backers-chips-box"><span class="bc-lbl">Bancado por:</span> ${list.join(" ")}</div>` : '<div class="backers-chips-box empty"><span>Nadie de la mesa lo votó aún</span></div>';
  };


  container.innerHTML = `
    <div class="show-stage-card bandos-step-arena">
      <div class="step-guide-tag">
        ⚔️ GUERRA DE BANDOS • DUELO ${showBandosSubIndex + 1} DE ${duels.length} • ${duel.guide || "¿De qué lado se para cada conductor?"}
      </div>
      
      <div class="bandos-clash-grid">
        <!-- BANDO A -->
        <div class="bando-fighter-card side-a anim-card-stagger-1 ${countA > countB ? 'selected-winner' : ''}" id="showCardA">
          <div class="fighter-photo-wrap">
            <img src="${duel.sideA.image}" alt="${duel.sideA.name}" class="fighter-img" onerror="this.src='assets/logo-pf.jpg'">
            <div class="fighter-badge">${duel.sideA.badge}</div>
          </div>
          <h3 class="fighter-name">${duel.sideA.name}</h3>
          <p class="fighter-argument">${duel.sideA.argument || duel.sideA.quote}</p>
          
          ${getBackersHtml("a")}

          <button class="btn-vote-fighter" onclick="voteShowBandoAll('a')">
            VOTO MAYORITARIO A (${getShortDisplayName(duel.sideA.name)}) [1]
          </button>
        </div>

        <!-- VS CLASH -->
        <div class="clash-center-piece">
          <div class="vs-flame-circle">VS</div>
          <div class="vs-score-indicator">${countA} - ${countB}</div>
        </div>

        <!-- BANDO B -->
        <div class="bando-fighter-card side-b anim-card-stagger-2 ${countB > countA ? 'selected-winner' : ''}" id="showCardB">
          <div class="fighter-photo-wrap">
            <img src="${duel.sideB.image}" alt="${duel.sideB.name}" class="fighter-img" onerror="this.src='assets/logo-pf.jpg'">
            <div class="fighter-badge">${duel.sideB.badge}</div>
          </div>
          <h3 class="fighter-name">${duel.sideB.name}</h3>
          <p class="fighter-argument">${duel.sideB.argument || duel.sideB.quote}</p>
          
          ${getBackersHtml("b")}

          <button class="btn-vote-fighter" onclick="voteShowBandoAll('b')">
            VOTO MAYORITARIO B (${getShortDisplayName(duel.sideB.name)}) [2]
          </button>
        </div>
      </div>

      <!-- PANEL DE VOTACIÓN INDIVIDUAL POR CONDUCTOR -->
      <div class="hosts-individual-vote-panel">
        <div class="hiv-title">🗳️ VOTACIÓN INDIVIDUAL DE LA MESA (¿A QUIÉN BANCA CADA UNO?):</div>
        <div class="hiv-grid">
          
          <!-- HOLDER -->
          <div class="hiv-host-card card-holder">
            <div class="hiv-host-name">🗿 Tomás Holder</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.holder === 'a' ? 'active-a' : ''}" onclick="voteBandoByHost('holder', 'a')">
                ${getShortDisplayName(duel.sideA.name)}
              </button>
              <button class="btn-hiv ${hostVotes.holder === 'b' ? 'active-b' : ''}" onclick="voteBandoByHost('holder', 'b')">
                ${getShortDisplayName(duel.sideB.name)}
              </button>
            </div>
          </div>

          <!-- DIANE -->
          <div class="hiv-host-card card-diane">
            <div class="hiv-host-name">🟢 Diane Caracchi</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.diane === 'a' ? 'active-a' : ''}" onclick="voteBandoByHost('diane', 'a')">
                ${getShortDisplayName(duel.sideA.name)}
              </button>
              <button class="btn-hiv ${hostVotes.diane === 'b' ? 'active-b' : ''}" onclick="voteBandoByHost('diane', 'b')">
                ${getShortDisplayName(duel.sideB.name)}
              </button>
            </div>
          </div>

          <!-- LULI -->
          <div class="hiv-host-card card-luli">
            <div class="hiv-host-name">💔 Luli Casé</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.luli === 'a' ? 'active-a' : ''}" onclick="voteBandoByHost('luli', 'a')">
                ${getShortDisplayName(duel.sideA.name)}
              </button>
              <button class="btn-hiv ${hostVotes.luli === 'b' ? 'active-b' : ''}" onclick="voteBandoByHost('luli', 'b')">
                ${getShortDisplayName(duel.sideB.name)}
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- TUG OF WAR BAR -->
      <div class="tug-meter-box">
        <div class="tug-meter-labels">
          <span class="tug-label-a">${duel.sideA.name}: <strong id="showPctA">${votesA}%</strong></span>
          <span class="tug-meter-title">⚖️ VEREDICTO DE LA MESA: ${bandosVerdict}</span>
          <span class="tug-label-b">${duel.sideB.name}: <strong id="showPctB">${votesB}%</strong></span>
        </div>
        <div class="tug-bar-track">
          <div class="tug-fill-a" id="showFillA" style="width: ${votesA}%;"></div>
          <div class="tug-fill-b" id="showFillB" style="width: ${votesB}%;"></div>
        </div>
      </div>

      <div class="sub-progress-dots">
        ${duels.map((d, i) => `
          <div class="sub-dot ${i === showBandosSubIndex ? 'active' : ''} ${showUserChoices.bandos[i]?.hostVotes?.holder ? 'voted' : ''}"></div>
        `).join("")}
      </div>
    </div>
  `;
}

function voteBandoByHost(hostKey, side) {
  if (!showUserChoices.bandos[showBandosSubIndex]) {
    showUserChoices.bandos[showBandosSubIndex] = {
      duel: currentShowEpisode?.bandosList[showBandosSubIndex],
      hostVotes: { holder: null, diane: null, luli: null },
      votesA: 50,
      votesB: 50
    };
  }
  showUserChoices.bandos[showBandosSubIndex].hostVotes[hostKey] = side;

  // Recalculate percentage based on 3 hosts
  const hv = showUserChoices.bandos[showBandosSubIndex].hostVotes;
  const countA = Object.values(hv).filter(v => v === "a").length;
  const countB = Object.values(hv).filter(v => v === "b").length;
  const total = countA + countB;

  if (total === 0) {
    showUserChoices.bandos[showBandosSubIndex].votesA = 50;
    showUserChoices.bandos[showBandosSubIndex].votesB = 50;
  } else {
    showUserChoices.bandos[showBandosSubIndex].votesA = Math.round((countA / total) * 100);
    showUserChoices.bandos[showBandosSubIndex].votesB = 100 - showUserChoices.bandos[showBandosSubIndex].votesA;
  }

  if (side === "a") audioFX.playFireIgnite();
  else audioFX.playFactosHorn();

  const body = document.getElementById("showStageBody");
  if (body) renderShowStep2_Bandos(body);
}

function voteShowBandoAll(side) {
  voteBandoByHost("holder", side);
  voteBandoByHost("diane", side);
  voteBandoByHost("luli", side);
}

// ---------------------------------------------------------
// BLOQUE 3: EL TRIBUNAL DE FARÁNDULA (3 CASOS)
// ---------------------------------------------------------
function renderShowStep3_Tribunal(container) {
  const cases = currentShowEpisode?.tribunalList || TRIBUNAL_CASES.slice(0, 3);
  const caseItem = cases[showTribunalSubIndex] || cases[0];
  
  if (!showUserChoices.tribunal[showTribunalSubIndex]) {
    showUserChoices.tribunal[showTribunalSubIndex] = {
      caseItem,
      hostVotes: { holder: null, diane: null, luli: null },
      option: null
    };
  }
  const hostVotes = showUserChoices.tribunal[showTribunalSubIndex].hostVotes;

  const getOptionBackers = (optId) => {
    const list = [];
    if (hostVotes.holder === optId) list.push('<span class="backer-pill pill-holder">🗿 Holder</span>');
    if (hostVotes.diane === optId) list.push('<span class="backer-pill pill-diane">🟢 Diane</span>');
    if (hostVotes.luli === optId) list.push('<span class="backer-pill pill-luli">💔 Luli</span>');
    return list.length ? `<div class="backers-chips-box"><span class="bc-lbl">Elegido por:</span> ${list.join(" ")}</div>` : '';
  };

  container.innerHTML = `
    <div class="show-stage-card tribunal-step-stage">
      <div class="step-guide-tag">
        ⚖️ EL TRIBUNAL • JUICIO ${showTribunalSubIndex + 1} DE ${cases.length} • ¿QUÉ HARÍA CADA CONDUCTOR EN SU LUGAR?
      </div>

      <div class="tribunal-hero-case-card anim-question-reveal">
        <div class="thc-image-wrap">
          <img src="${caseItem.image}" alt="${caseItem.protagonist}" class="thc-img" onerror="this.src='assets/logo-pf.jpg'">
          <div class="thc-category-badge">${caseItem.category}</div>
        </div>
        <div class="thc-details">
          <div class="thc-protagonist-pill">PROTAGONISTA: ${caseItem.protagonist}</div>
          <h3 class="thc-title">${caseItem.title}</h3>
          <p class="thc-context">${caseItem.context}</p>
          <div class="thc-quote-box">"${caseItem.quote}"</div>
        </div>
      </div>

      <!-- PANEL DE ELECCIÓN INDIVIDUAL DE CADA CONDUCTOR -->
      <div class="hosts-individual-vote-panel">
        <div class="hiv-title">⚖️ ELECCIÓN INDIVIDUAL DE CADA CONDUCTOR:</div>
        <div class="hiv-grid">
          <div class="hiv-host-card card-holder">
            <div class="hiv-host-name">🗿 Tomás Holder</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.holder === 'A' ? 'active-a' : ''}" onclick="voteTribunalByHost('holder', 'A')">Opción A</button>
              <button class="btn-hiv ${hostVotes.holder === 'B' ? 'active-a' : ''}" onclick="voteTribunalByHost('holder', 'B')">Opción B</button>
              <button class="btn-hiv ${hostVotes.holder === 'C' ? 'active-a' : ''}" onclick="voteTribunalByHost('holder', 'C')">Opción C</button>
            </div>
          </div>
          <div class="hiv-host-card card-diane">
            <div class="hiv-host-name">🟢 Diane Caracchi</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.diane === 'A' ? 'active-a' : ''}" onclick="voteTribunalByHost('diane', 'A')">Opción A</button>
              <button class="btn-hiv ${hostVotes.diane === 'B' ? 'active-a' : ''}" onclick="voteTribunalByHost('diane', 'B')">Opción B</button>
              <button class="btn-hiv ${hostVotes.diane === 'C' ? 'active-a' : ''}" onclick="voteTribunalByHost('diane', 'C')">Opción C</button>
            </div>
          </div>
          <div class="hiv-host-card card-luli">
            <div class="hiv-host-name">💔 Luli Casé</div>
            <div class="hiv-btn-group">
              <button class="btn-hiv ${hostVotes.luli === 'A' ? 'active-a' : ''}" onclick="voteTribunalByHost('luli', 'A')">Opción A</button>
              <button class="btn-hiv ${hostVotes.luli === 'B' ? 'active-a' : ''}" onclick="voteTribunalByHost('luli', 'B')">Opción B</button>
              <button class="btn-hiv ${hostVotes.luli === 'C' ? 'active-a' : ''}" onclick="voteTribunalByHost('luli', 'C')">Opción C</button>
            </div>
          </div>
        </div>
      </div>

      <div class="tribunal-options-grid">
        ${caseItem.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const backersCount = Object.values(hostVotes).filter(v => v === letter).length;
          return `
            <div class="tribunal-opt-card style-${opt.style} anim-card-stagger-${idx + 1} ${backersCount > 0 ? 'option-selected-glow' : ''}">
              <div class="toc-badge">${opt.style === 'holder' ? '🔥 FACTOS / HOLDER' : opt.style === 'diane' ? '🟢 DIGNIDAD / DIANE' : '💔 MIGAJERA / LULI'}</div>
              <h4 class="toc-title">${opt.title}</h4>
              <p class="toc-text">${opt.text}</p>
              ${getOptionBackers(letter)}
              <button class="btn-vote-option ${backersCount > 0 ? 'voted' : ''}" onclick="voteTribunalAll('${letter}')">
                ${backersCount > 0 ? `✓ ELEGIDA POR ${backersCount} CONDUCTOR(ES)` : `VOTO MAYORITARIO [${letter}]`}
              </button>
            </div>
          `;
        }).join("")}
      </div>

      <div class="sub-progress-dots">
        ${cases.map((c, i) => `
          <div class="sub-dot ${i === showTribunalSubIndex ? 'active' : ''} ${showUserChoices.tribunal[i]?.option ? 'voted' : ''}"></div>
        `).join("")}
      </div>
    </div>
  `;
}

function selectShowTribunalMulti(optionId) {
  voteTribunalAll(optionId);
}

function voteTribunalByHost(hostKey, optId) {
  if (!showUserChoices.tribunal[showTribunalSubIndex]) {
    const cases = currentShowEpisode?.tribunalList || TRIBUNAL_CASES.slice(0, 3);
    showUserChoices.tribunal[showTribunalSubIndex] = {
      caseItem: cases[showTribunalSubIndex] || cases[0],
      hostVotes: { holder: null, diane: null, luli: null },
      option: null
    };
  }
  showUserChoices.tribunal[showTribunalSubIndex].hostVotes[hostKey] = optId.toUpperCase();
  audioFX.playTick(550, 0.3);
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep3_Tribunal(body);
}

function voteTribunalAll(optId) {
  if (!showUserChoices.tribunal[showTribunalSubIndex]) {
    const cases = currentShowEpisode?.tribunalList || TRIBUNAL_CASES.slice(0, 3);
    showUserChoices.tribunal[showTribunalSubIndex] = {
      caseItem: cases[showTribunalSubIndex] || cases[0],
      hostVotes: { holder: null, diane: null, luli: null },
      option: null
    };
  }
  showUserChoices.tribunal[showTribunalSubIndex].hostVotes.holder = optId.toUpperCase();
  showUserChoices.tribunal[showTribunalSubIndex].hostVotes.diane = optId.toUpperCase();
  showUserChoices.tribunal[showTribunalSubIndex].hostVotes.luli = optId.toUpperCase();
  showUserChoices.tribunal[showTribunalSubIndex].option = optId.toUpperCase();
  audioFX.playReveal();
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep3_Tribunal(body);
}


// ---------------------------------------------------------
// BLOQUE 4: LA RÁFAGA DEL SEMÁFORO (7 RED FLAGS)
// ---------------------------------------------------------
function renderShowStep4_Semaforo(container) {
  const cases = currentShowEpisode?.semaforoList || SEMAFORO_CASES.slice(0, 7);
  const currentCase = cases[showSemaforoSubIndex] || cases[0];
  const savedVote = showUserChoices.semaforo[showSemaforoSubIndex]?.vote;

  container.innerHTML = `
    <div class="show-stage-card semaforo-step-stage">
      <div class="step-guide-tag">
        🚦 RÁFAGA DEL SEMÁFORO • RED FLAG ${showSemaforoSubIndex + 1} DE ${cases.length} • ${currentCase.guide || "¿Es normal o es red flag tóxica?"}
      </div>

      <div class="semaforo-play-card show-semaforo-card anim-question-reveal">
        <div class="spc-category-row">
          <span class="spc-category-badge">${currentCase.category}</span>
          <span class="spc-progress-badge">RED FLAG ${showSemaforoSubIndex + 1} / ${cases.length}</span>
        </div>

        <h3 class="spc-case-title anim-question-reveal">${currentCase.title}</h3>
        <p class="spc-case-text">${currentCase.text}</p>

        <!-- TRAFFIC LIGHT CONTROLS -->
        <div class="semaforo-controls-row">
          <button class="btn-sem-vote btn-sem-green anim-card-stagger-1 ${savedVote === 'verde' ? 'selected' : ''}" onclick="voteShowSemaforoMulti('verde')">
            <span class="sem-icon">🟢</span>
            <span class="sem-title">VERDE</span>
            <span class="sem-desc">Banco / Normal</span>
            <span class="sem-kbd">[V]</span>
          </button>

          <button class="btn-sem-vote btn-sem-yellow anim-card-stagger-2 ${savedVote === 'amarillo' ? 'selected' : ''}" onclick="voteShowSemaforoMulti('amarillo')">
            <span class="sem-icon">🟡</span>
            <span class="sem-title">AMARILLO</span>
            <span class="sem-desc">Alerta / Dudo</span>
            <span class="sem-kbd">[A]</span>
          </button>

          <button class="btn-sem-vote btn-sem-red anim-card-stagger-3 ${savedVote === 'rojo' ? 'selected' : ''}" onclick="voteShowSemaforoMulti('rojo')">
            <span class="sem-icon">🔴</span>
            <span class="sem-title">ROJO</span>
            <span class="sem-desc">Red Flag / No</span>
            <span class="sem-kbd">[R]</span>
          </button>

          <button class="btn-sem-vote btn-sem-fire anim-card-stagger-4 ${savedVote === 'fuego' ? 'selected' : ''}" onclick="voteShowSemaforoMulti('fuego')">
            <span class="sem-icon">🔥</span>
            <span class="sem-title">FUEGO</span>
            <span class="sem-desc">Tóxico / Cancelar</span>
            <span class="sem-kbd">[F]</span>
          </button>
        </div>
      </div>
    </div>
  `;
}


function voteShowSemaforoMulti(level) {
  const cases = currentShowEpisode?.semaforoList || SEMAFORO_CASES.slice(0, 7);
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

  // Auto-advance
  setTimeout(() => {
    if (showSemaforoSubIndex < cases.length - 1) {
      showSemaforoSubIndex++;
      const body = document.getElementById("showStageBody");
      if (body) renderShowStep4_Semaforo(body);
      setShowDiaStep(4);
    } else {
      setShowDiaStep(5);
    }
  }, 400);
}

// ---------------------------------------------------------
// BLOQUE 5: EL PODIO DEL BIZARREO (TOP 5 EN VIVO)
// ---------------------------------------------------------
function renderShowStep5_Podio(container) {
  const item = currentShowEpisode?.podioItem || {
    title: "TOP 5: RANKING DE TRAICIONES DE LA FARÁNDULA",
    guide: "La mesa debe ordenar del #1 al #5 a los protagonistas del multiverso.",
    candidates: []
  };

  const medals = ["🥇 #1 MÁXIMO TRAIDOR", "🥈 #2 SEGUNDO PUESTO", "🥉 #3 TERCER PUESTO", "4️⃣ #4 CUARTO PUESTO", "5️⃣ #5 MENOS TRAIDOR"];

  container.innerHTML = `
    <div class="show-stage-card podio-step-stage">
      <div class="step-guide-tag">
        🏆 EL PODIO DEL BIZARREO • ${item.guide}
      </div>

      <h2 class="podio-main-title">${item.title}</h2>

      <div class="podio-interactive-grid">
        ${showPodioState.map((cand, idx) => `
          <div class="podio-rank-card rank-pos-${idx + 1} anim-card-stagger-${idx + 1}">
            <div class="prc-medal-badge">${medals[idx]}</div>
            <div class="prc-photo-wrap">
              <img src="${cand.image}" alt="${cand.name}" class="prc-img" onerror="this.src='assets/logo-pf.jpg'">
            </div>
            <h3 class="prc-name">${cand.name}</h3>
            <p class="prc-crime">${cand.crime || cand.lore}</p>
            
            <div class="prc-move-buttons">
              <button class="btn-move-rank" onclick="swapPodio(${idx}, ${idx - 1})" ${idx === 0 ? 'disabled' : ''} title="Subir Puesto">
                ⬆ Subir
              </button>
              <button class="btn-move-rank" onclick="swapPodio(${idx}, ${idx + 1})" ${idx === showPodioState.length - 1 ? 'disabled' : ''} title="Bajar Puesto">
                ⬇ Bajar
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="podio-hosts-commentary">
        <div class="phc-item"><strong>Holder:</strong> "Icardi no tiene perdón de Dios. Rompió los códigos sagrados de la capitanía."</div>
        <div class="phc-item"><strong>Diane:</strong> "La China Suárez se lava las manos, pero entrar a un matrimonio ajeno tiene karma."</div>
        <div class="phc-item"><strong>Luli:</strong> "¡Son todos perdonables si te cantan un tema de cumbia y te piden perdón por WhatsApp!"</div>
      </div>
    </div>
  `;
}

function swapPodio(fromIdx, toIdx) {
  if (toIdx < 0 || toIdx >= showPodioState.length) return;
  const temp = showPodioState[fromIdx];
  showPodioState[fromIdx] = showPodioState[toIdx];
  showPodioState[toIdx] = temp;
  showUserChoices.podio = [...showPodioState];
  audioFX.playTick(600, 0.2);
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep5_Podio(body);
}

// ---------------------------------------------------------
// BLOQUE 6: LA RULETA DE 3 TRONOS (2 RONDAS)
// ---------------------------------------------------------
function renderShowStep6_Ruleta(container) {
  const rounds = currentShowEpisode?.ruletaList || [];
  const curRound = rounds[showRuletaSubIndex] || rounds[0];
  const victim = curRound?.victim || celebrities[0];
  const candidates = curRound?.candidates || celebrities.slice(1, 4);

  if (!showUserChoices.ruleta[showRuletaSubIndex]) {
    showUserChoices.ruleta[showRuletaSubIndex] = { victim, assignments: { casorio: null, chongo: null, funa: null } };
  }
  const assign = showUserChoices.ruleta[showRuletaSubIndex].assignments;

  container.innerHTML = `
    <div class="show-stage-card ruleta-step-stage">
      <div class="step-guide-tag">
        🎡 LA RULETA DE 3 TRONOS • RONDA ${showRuletaSubIndex + 1} DE ${rounds.length} • ¿A quién casás con 💍 Casorio, a quién le das una noche de 🔥 Chongo y a quién mandás a la ❌ Funa?
      </div>

      <!-- VICTIM CARD -->
      <div class="ruleta-victim-spotlight anim-question-reveal">
        <div class="rvs-avatar-wrap">
          <img src="${victim.image}" alt="${victim.name}" class="rvs-img" onerror="this.src='assets/logo-pf.jpg'">
          <div class="rvs-badge">VÍCTIMA DE LA RONDA</div>
        </div>
        <div class="rvs-info">
          <h3 class="rvs-name">${victim.name}</h3>
          <div class="rvs-tag">${victim.tag || victim.categoryLabel}</div>
          <p class="rvs-lore">${victim.lore || victim.bio}</p>
        </div>
      </div>

      <div class="ruleta-thrones-clash-grid">
        ${candidates.map((cand, idx) => {
          let curThrone = "";
          if (assign.casorio === cand.name) curThrone = "💍 CASORIO";
          else if (assign.chongo === cand.name) curThrone = "🔥 CHONGO";
          else if (assign.funa === cand.name) curThrone = "❌ FUNA";

          return `
            <div class="candidate-throne-card anim-card-stagger-${idx + 1}">
              <div class="ctc-photo-wrap">
                <img src="${cand.image}" alt="${cand.name}" class="ctc-img" onerror="this.src='assets/logo-pf.jpg'">
                <div class="ctc-assigned-badge ${curThrone ? 'active' : ''}">${curThrone || 'SIN ASIGNAR'}</div>
              </div>
              <h4 class="ctc-name">${cand.name}</h4>
              <p class="ctc-lore">${cand.lore || cand.bio}</p>
              
              <div class="ctc-actions-row">
                <button class="btn-throne-pick btn-tp-casorio ${assign.casorio === cand.name ? 'active' : ''}" onclick="assignShowThroneMulti('casorio', '${cand.name}')">
                  💍 Casorio
                </button>
                <button class="btn-throne-pick btn-tp-chongo ${assign.chongo === cand.name ? 'active' : ''}" onclick="assignShowThroneMulti('chongo', '${cand.name}')">
                  🔥 Chongo
                </button>
                <button class="btn-throne-pick btn-tp-funa ${assign.funa === cand.name ? 'active' : ''}" onclick="assignShowThroneMulti('funa', '${cand.name}')">
                  ❌ Funa
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="sub-progress-dots">
        ${rounds.map((r, i) => `
          <div class="sub-dot ${i === showRuletaSubIndex ? 'active' : ''} ${showUserChoices.ruleta[i]?.assignments?.casorio ? 'voted' : ''}"></div>
        `).join("")}
      </div>
    </div>
  `;
}

function assignShowThroneMulti(throne, candName) {
  if (!showUserChoices.ruleta[showRuletaSubIndex]) {
    showUserChoices.ruleta[showRuletaSubIndex] = { assignments: { casorio: null, chongo: null, funa: null } };
  }
  showUserChoices.ruleta[showRuletaSubIndex].assignments[throne] = candName;

  if (throne === "casorio") audioFX.playMatchChime();
  else if (throne === "chongo") audioFX.playFireIgnite();
  else if (throne === "funa") audioFX.playBuzzer();

  const body = document.getElementById("showStageBody");
  if (body) renderShowStep6_Ruleta(body);
}

// ---------------------------------------------------------
// BLOQUE 7: LA ZONA DE FUNA & DERECHO A RÉPLICA (30s)
// ---------------------------------------------------------
function renderShowStep7_Funa(container) {
  const accused = showUserChoices.funa.accused || "holder";
  const result = showUserChoices.funa.result;

  container.innerHTML = `
    <div class="show-stage-card funa-step-stage">
      <div class="step-guide-tag">
        🚨 LA ZONA DE FUNA • JUICIO EN VIVO • DERECHO A RÉPLICA DE 30 SEGUNDOS
      </div>

      <div class="funa-live-arena anim-question-reveal">
        <div class="fla-header">
          <div class="fla-siren">🚨</div>
          <h2 class="fla-title">¡CONDUCTOR EN JAQUE: ${accused.toUpperCase()}!</h2>
          <p class="fla-sub">Acumuló demasiada polémica y veneno en los bloques anteriores. Tiene 30 segundos para convencer a la mesa de que tiró FACTOS y salvarse de la funa.</p>
        </div>

        <!-- SELECTOR DE CONDUCTOR ACUSADO -->
        <div class="fla-accused-selector">
          <button class="btn-accused-select ${accused === 'holder' ? 'active' : ''}" onclick="selectFunaHost('holder')">
            Tomás Holder (${funaCounts.holder} Funas)
          </button>
          <button class="btn-accused-select ${accused === 'diane' ? 'active' : ''}" onclick="selectFunaHost('diane')">
            Diane Caracchi (${funaCounts.diane} Funas)
          </button>
          <button class="btn-accused-select ${accused === 'luli' ? 'active' : ''}" onclick="selectFunaHost('luli')">
            Luli Casé (${funaCounts.luli} Funas)
          </button>
        </div>

        <!-- GIANT 30S COUNTDOWN -->
        <div class="funa-timer-box">
          <div class="ftb-circle ${showFunaRunning ? 'pulse' : ''}" id="showFunaTimerDisplay">
            ${showFunaTimer}s
          </div>
          <div class="ftb-controls">
            <button class="btn-ftb-play" onclick="toggleShowFunaTimer()">
              ${showFunaRunning ? '⏸ PAUSAR CRONÓMETRO' : '▶ INICIAR 30s AL AIRE'}
            </button>
            <button class="btn-ftb-reset" onclick="resetShowFunaTimer()">
              🔄 REINICIAR (30s)
            </button>
          </div>
        </div>

        <!-- VEREDICT BUTTONS -->
        <div class="funa-verdict-decision-row">
          <button class="btn-funa-verdict btn-fv-zafo ${result === 'zafo' ? 'active' : ''}" onclick="resolveShowFuna('zafo')">
            🟢 ZAFÓ CON FACTOS (NO HAY FUNA) [Z]
          </button>
          <button class="btn-funa-verdict btn-fv-cancelado ${result === 'cancelado' ? 'active' : ''}" onclick="resolveShowFuna('cancelado')">
            💀 CANCELADO / AL BANCO (+1 FUNA) [C]
          </button>
        </div>

        ${result ? `
          <div class="funa-result-banner ${result}">
            ${result === 'zafo' ? '✅ ¡LA MESA LO PERDONÓ! Zafó con factos inapelables.' : '🚨 ¡SENTENCIA CUMPLIDA! Quedó funado y se sumó +1 a su contador global.'}
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function selectFunaHost(host) {
  showUserChoices.funa.accused = host;
  audioFX.playReveal();
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep7_Funa(body);
}

function toggleShowFunaTimer() {
  if (showFunaRunning) {
    clearInterval(showFunaInterval);
    showFunaRunning = false;
  } else {
    showFunaRunning = true;
    audioFX.playSiren();
    showFunaInterval = setInterval(() => {
      if (showFunaTimer > 0) {
        showFunaTimer--;
        const disp = document.getElementById("showFunaTimerDisplay");
        if (disp) disp.textContent = `${showFunaTimer}s`;
        if (showFunaTimer === 5) audioFX.playBuzzer();
      } else {
        clearInterval(showFunaInterval);
        showFunaRunning = false;
        audioFX.playBuzzer();
      }
    }, 1000);
  }
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep7_Funa(body);
}

function resetShowFunaTimer() {
  clearInterval(showFunaInterval);
  showFunaRunning = false;
  showFunaTimer = 30;
  const body = document.getElementById("showStageBody");
  if (body) renderShowStep7_Funa(body);
}

function resolveShowFuna(res) {
  showUserChoices.funa.result = res;
  clearInterval(showFunaInterval);
  showFunaRunning = false;

  if (res === "cancelado") {
    adjustFuna(showUserChoices.funa.accused, 1);
    audioFX.playBuzzer();
  } else {
    audioFX.playFactosHorn();
  }

  const body = document.getElementById("showStageBody");
  if (body) renderShowStep7_Funa(body);
}

// ---------------------------------------------------------
// BLOQUE 8: MASTER DASHBOARD & ANÁLISIS TOXICOLÓGICO TOTAL
// ---------------------------------------------------------
function renderShowStep8_Dashboard(container) {
  const diagnosis = generatePsychologicalAnalysis(showUserChoices);
  audioFX.playFactosHorn();

  // Compute individual conductor stats
  const getHostBandoPicks = (hostKey) => {
    const apPick = showUserChoices.aperturaVotes?.[hostKey];
    const apStr = apPick ? `Apertura: <strong>${apPick === 'a' ? 'Wanda' : 'Maxi'}</strong>` : null;
    const duelsStr = showUserChoices.bandos.map((b, i) => {
      const vote = b.hostVotes?.[hostKey];
      if (!vote) return `Duelo ${i+1}: -`;
      const name = vote === "a" ? getShortDisplayName(b.duel.sideA.name) : getShortDisplayName(b.duel.sideB.name);
      return `D${i+1}: <strong>${name}</strong>`;
    }).join(" • ");
    return [apStr, duelsStr].filter(Boolean).join(" • ");
  };

  container.innerHTML = `
    <div class="show-stage-card dashboard-step-stage">
      
      <!-- HERO DIAGNOSIS BANNER -->
      <div class="final-diagnosis-hero anim-question-reveal">
        <div class="fdh-tag">🧠 ANÁLISIS PSICOLÓGICO & TOXICOLÓGICO DE LA TRANSMISIÓN</div>
        <h2 class="fdh-title">${diagnosis.title}</h2>
        <p class="fdh-desc">${diagnosis.description}</p>
      </div>

      <!-- 4 METRIC GAUGES -->
      <div class="show-metrics-grid">
        <div class="metric-card metric-venom anim-card-stagger-1">
          <div class="mc-icon">🧪</div>
          <div class="mc-val">${diagnosis.venom}%</div>
          <div class="mc-lbl">VENENO EN SANGRE</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.venom}%;"></div></div>
        </div>

        <div class="metric-card metric-aura anim-card-stagger-2">
          <div class="mc-icon">🗿</div>
          <div class="mc-val">${diagnosis.aura}%</div>
          <div class="mc-lbl">FACTOS & AURA ALFA</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.aura}%;"></div></div>
        </div>

        <div class="metric-card metric-migajera anim-card-stagger-3">
          <div class="mc-icon">💔</div>
          <div class="mc-val">${diagnosis.migajera}%</div>
          <div class="mc-lbl">APEGO MIGAJERO</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.migajera}%;"></div></div>
        </div>

        <div class="metric-card metric-careta anim-card-stagger-4">
          <div class="mc-icon">🎭</div>
          <div class="mc-val">${diagnosis.careta}%</div>
          <div class="mc-lbl">CARETÓMETRO MESA</div>
          <div class="mc-bar"><div class="mc-fill" style="width: ${diagnosis.careta}%;"></div></div>
        </div>
      </div>


      <!-- DESGLOSE INDIVIDUAL DE CADA CONDUCTOR -->
      <div class="dashboard-hosts-section">
        <h3 class="dhs-title">👥 PERFIL Y VOTACIÓN INDIVIDUAL DE CADA CONDUCTOR:</h3>
        <div class="dashboard-hosts-grid">
          
          <!-- HOLDER -->
          <div class="dash-host-card dhc-holder">
            <div class="dhc-header">
              <span class="dhc-avatar">🗿</span>
              <div>
                <h4 class="dhc-name">Tomás Holder</h4>
                <span class="dhc-role">El Factero / Postura Tradicional</span>
              </div>
            </div>
            <div class="dhc-body">
              <div class="dhc-stat-row">
                <span>🔥 Factos & Aura:</span> <strong>92%</strong>
              </div>
              <div class="dhc-stat-row">
                <span>🧪 Veneno en Sangre:</span> <strong>78%</strong>
              </div>
              <div class="dhc-picks-box">
                <span class="dpb-label">⚔️ A quién bancó en Bandos:</span>
                <p class="dpb-content">${getHostBandoPicks('holder') || 'Bancó la postura de Maxi y Messi'}</p>
              </div>
              <div class="dhc-verdict-quote">"El hombre de alto valor no negocia los códigos ni se deja llevar por el conventillo."</div>
            </div>
          </div>

          <!-- DIANE -->
          <div class="dash-host-card dhc-diane">
            <div class="dhc-header">
              <span class="dhc-avatar">🟢</span>
              <div>
                <h4 class="dhc-name">Diane Caracchi</h4>
                <span class="dhc-role">La Voz de la Razón / Monogamia</span>
              </div>
            </div>
            <div class="dhc-body">
              <div class="dhc-stat-row">
                <span>🛡️ Dignidad & Límites:</span> <strong>95%</strong>
              </div>
              <div class="dhc-stat-row">
                <span>🚫 Cero Chamuyo:</span> <strong>88%</strong>
              </div>
              <div class="dhc-picks-box">
                <span class="dpb-label">⚔️ A quién bancó en Bandos:</span>
                <p class="dpb-content">${getHostBandoPicks('diane') || 'Bancó límites claros y dignidad'}</p>
              </div>
              <div class="dhc-verdict-quote">"Si no hay respeto ni exclusividad, se corta de raíz. Sin drama y sin circo."</div>
            </div>
          </div>

          <!-- LULI -->
          <div class="dash-host-card dhc-luli">
            <div class="dhc-header">
              <span class="dhc-avatar">💔</span>
              <div>
                <h4 class="dhc-name">Luli Casé</h4>
                <span class="dhc-role">La Reina del Despecho / Tarot</span>
              </div>
            </div>
            <div class="dhc-body">
              <div class="dhc-stat-row">
                <span>💔 Apego Migajero:</span> <strong>96%</strong>
              </div>
              <div class="dhc-stat-row">
                <span>🔮 Justificación Astral:</span> <strong>100%</strong>
              </div>
              <div class="dhc-picks-box">
                <span class="dpb-label">⚔️ A quién bancó en Bandos:</span>
                <p class="dpb-content">${getHostBandoPicks('luli') || 'Bancó a Wanda y el despecho'}</p>
              </div>
              <div class="dhc-verdict-quote">"¡Si te manda un mensaje a las 3 AM con un tema de cumbia, hay que darle otra oportunidad!"</div>
            </div>
          </div>

        </div>
      </div>

      <!-- RECAP OF ALL 8 BLOCKS -->
      <div class="show-recap-grid">
        <div class="recap-box">
          <div class="rb-title">🎙️ 1. APERTURA EDITORIAL</div>
          <div class="rb-content">
            Postura: <strong>${showUserChoices.aperturaVote ? showUserChoices.aperturaVote.toUpperCase() : 'DEBATE ABIERTO'}</strong>
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">⚔️ 2. GUERRA DE BANDOS (3 DUELOS)</div>
          <div class="rb-content">
            ${showUserChoices.bandos.map((b, i) => `Duelo ${i+1}: ${b.duel?.sideA?.name ? getShortDisplayName(b.duel.sideA.name) : 'A'} vs ${b.duel?.sideB?.name ? getShortDisplayName(b.duel.sideB.name) : 'B'}`).join(" • ") || '3 Duelos Jugados'}
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">⚖️ 3. TRIBUNAL DE FARÁNDULA (3 CASOS)</div>
          <div class="rb-content">
            ${showUserChoices.tribunal.map((t, i) => `Caso ${i+1}: [${t.option || '-'}]`).join(" • ") || '3 Juicios Dictados'}
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">🚦 4. RÁFAGA DEL SEMÁFORO (7 RED FLAGS)</div>
          <div class="rb-content">
            ${showUserChoices.semaforo.map((s, i) => `${i+1}. ${s.vote ? s.vote.toUpperCase() : '-'}`).join(" • ") || '7 Red Flags Votadas'}
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">🏆 5. TOP 1 DE TRAICIONES</div>
          <div class="rb-content">
            🥇 <strong>${showPodioState[0]?.name || 'Mauro Icardi'}</strong>
          </div>
        </div>

        <div class="recap-box">
          <div class="rb-title">🎡 6. RULETA Y TRONOS</div>
          <div class="rb-content">
            💍 ${showUserChoices.ruleta[0]?.assignments?.casorio || 'Maxi López'} | ❌ ${showUserChoices.ruleta[0]?.assignments?.funa || 'Mauro Icardi'}
          </div>
        </div>
      </div>

      <!-- FUNA FINAL VERDICT -->
      <div class="funa-verdict-box">
        <div class="fvb-icon">💀</div>
        <div class="fvb-info">
          <h4>VEREDICTO: EL CONDUCTOR MÁS CANCELABLE DE HOY</h4>
          <p>${diagnosis.funadoRecommendation}</p>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="dashboard-actions-row">
        <button class="btn-dash-action" onclick="startShowDia('today')">
          🔄 REPETIR EL SHOW DE HOY
        </button>
        <button class="btn-dash-action btn-dash-rng" onclick="startShowDia('rng')">
          🎲 JUGAR MEGA SHOW ALEATORIO (RNG)
        </button>
        <button class="btn-dash-action btn-dash-home" onclick="switchTab('home')">
          🏠 VOLVER AL INICIO
        </button>
      </div>

    </div>
  `;
}

function generatePsychologicalAnalysis(choices) {
  let venom = 78;
  let aura = 82;
  let migajera = 65;
  let careta = 38;

  if (choices.aperturaVote === "holder") { venom += 10; aura += 12; }
  else if (choices.aperturaVote === "diane") { aura += 8; careta -= 8; }
  else if (choices.aperturaVote === "luli") { migajera += 18; venom += 8; }

  choices.bandos?.forEach(b => {
    if (b.vote === "a") { venom += 5; aura += 4; }
    else if (b.vote === "b") { careta += 5; }
  });

  choices.tribunal?.forEach(t => {
    if (t.option === "A") { aura += 6; venom += 4; }
    else if (t.option === "B") { aura += 4; careta -= 3; }
    else if (t.option === "C") { migajera += 10; aura -= 4; }
  });

  choices.semaforo?.forEach(s => {
    if (s.vote === "fuego") venom += 4;
    else if (s.vote === "verde") aura += 3;
    else if (s.vote === "amarillo") migajera += 4;
    else if (s.vote === "rojo") careta += 3;
  });

  venom = Math.min(99, Math.max(25, venom));
  aura = Math.min(99, Math.max(20, aura));
  migajera = Math.min(99, Math.max(15, migajera));
  careta = Math.min(99, Math.max(10, careta));

  let title = "DIAGNÓSTICO: MESA NIVEL WANDAGATE (TOXICIDAD GALÁCTICA & DESPECHO CON FACTOS)";
  let description = "La mesa demostró una adicción severa a los bardos de conventillo y a las capturas de WhatsApp a las 4 AM. Holder tiró factos que rozan la cancelación en el INADI, Diane intentó poner cordura monogámica sin éxito, y Luli ya le mandó la carta natal de Maxi López a sus amigas.";
  let funadoHost = showUserChoices.funa.accused;
  let funadoRecommendation = `Tomás Holder por justificar las anécdotas de sótanos de Rusia y amenazar con prohibir las medialunas en el estudio.`;

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
    setPresetZocalo("🎙️ SHOW DEL DÍA • BLOQUE 1", "APERTURA & PREGUNTA EDITORIAL: ¿HASTA DÓNDE VALE QUEMAR A UN EX?");
  } else if (currentShowStep === 2) {
    const duel = currentShowEpisode?.bandosList[showBandosSubIndex];
    setPresetZocalo("⚔️ SHOW DEL DÍA • BLOQUE 2", `GUERRA DE BANDOS (${showBandosSubIndex + 1}/3): ${duel?.title?.toUpperCase() || "DUELOS CALIENTES"}`);
  } else if (currentShowStep === 3) {
    const c = currentShowEpisode?.tribunalList[showTribunalSubIndex];
    setPresetZocalo("⚖️ SHOW DEL DÍA • BLOQUE 3", `TRIBUNAL DE FARÁNDULA (${showTribunalSubIndex + 1}/3): ${c?.title?.toUpperCase() || "JUICIOS MORALES"}`);
  } else if (currentShowStep === 4) {
    setPresetZocalo("🚦 SHOW DEL DÍA • BLOQUE 4", `LA RÁFAGA DEL SEMÁFORO (${showSemaforoSubIndex + 1}/7): RED FLAGS DE HOY AL AIRE`);
  } else if (currentShowStep === 5) {
    setPresetZocalo("🏆 SHOW DEL DÍA • BLOQUE 5", "EL PODIO DEL BIZARREO: TOP 5 TRAICIONES DEL MULTIVERSO WANDAGATE");
  } else if (currentShowStep === 6) {
    const r = currentShowEpisode?.ruletaList[showRuletaSubIndex];
    setPresetZocalo("🎡 SHOW DEL DÍA • BLOQUE 6", `LA RULETA DE 3 TRONOS (${showRuletaSubIndex + 1}/2): ${r?.victim?.name?.toUpperCase()} EN EL BANQUILLO`);
  } else if (currentShowStep === 7) {
    setPresetZocalo("🚨 SHOW DEL DÍA • BLOQUE 7", "LA ZONA DE FUNA: DERECHO A RÉPLICA DE 30 SEGUNDOS AL AIRE");
  } else if (currentShowStep === 8) {
    setPresetZocalo("📊 SHOW DEL DÍA • FINAL", "MASTER DASHBOARD & ANÁLISIS PSICOLÓGICO TOTAL DE LA MESA");
  }
}
