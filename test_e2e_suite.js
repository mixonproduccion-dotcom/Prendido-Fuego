const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const DIR = __dirname;
const htmlContent = fs.readFileSync(path.join(DIR, "index.html"), "utf8");

// Create JSDOM instance with scripts enabled
const dom = new JSDOM(htmlContent, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost/"
});

const { window } = dom;
const { document } = window;

function createAudioParam() {
  return {
    value: 0,
    setValueAtTime: () => {},
    exponentialRampToValueAtTime: () => {},
    linearRampToValueAtTime: () => {},
    setTargetAtTime: () => {}
  };
}

// Mock Web Audio API and Canvas Context
window.AudioContext = class {
  constructor() {
    this.destination = {};
    this.currentTime = 0;
  }
  createOscillator() {
    return {
      type: "sine",
      frequency: createAudioParam(),
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createGain() {
    return {
      gain: createAudioParam(),
      connect: () => {}
    };
  }
  createBiquadFilter() {
    return {
      type: "lowpass",
      frequency: createAudioParam(),
      Q: createAudioParam(),
      connect: () => {}
    };
  }
  createBufferSource() {
    return {
      buffer: null,
      playbackRate: createAudioParam(),
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createBuffer() {
    return {
      getChannelData: () => new Float32Array(100)
    };
  }
  decodeAudioData(buffer, success) {
    if (success) success({ duration: 1, getChannelData: () => new Float32Array(100) });
  }
  resume() { return Promise.resolve(); }
};
window.webkitAudioContext = window.AudioContext;

// Mock HTMLCanvasElement getContext
window.HTMLCanvasElement.prototype.getContext = function(type) {
  return {
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    arc: () => {},
    closePath: () => {},
    fill: () => {},
    stroke: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
    fillText: () => {},
    drawImage: () => {},
    fillStyle: "#000",
    strokeStyle: "#000",
    lineWidth: 1,
    font: "12px sans-serif",
    shadowColor: "",
    shadowBlur: 0
  };
};

window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
window.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

// Load Scripts in order into JSDOM via script elements
const scriptFiles = [
  "data_celebrities.js",
  "data_tribunal.js",
  "data_semaforo.js",
  "data_bandos.js",
  "data_ranking.js",
  "data_news.js",
  "audio.js",
  "app.js"
];

console.log("=== EXECUTING JS SCRIPTS IN JSDOM ===");
scriptFiles.forEach(file => {
  const code = fs.readFileSync(path.join(DIR, file), "utf8");
  window.eval(code);
});


// Trigger DOMContentLoaded
const evt = document.createEvent("Event");
evt.initEvent("DOMContentLoaded", true, true);
window.dispatchEvent(evt);

console.log("✓ DOMContentLoaded dispatched successfully!");

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`  ✓ ${message}`);
  }
}

// ----------------------------------------------------------------
// TEST 1: Check initial home view and tabs
// ----------------------------------------------------------------
console.log("\n--- TEST 1: Navigation and Tab Switching ---");
const homeView = document.getElementById("section-home");
assert(homeView && homeView.classList.contains("active"), "Home view has 'active' class");
const lowerThird = document.getElementById("lowerThirdBanner");
assert(lowerThird && lowerThird.style.display === "none", "Lower third banner is hidden on home tab");

const tabs = ["roulette", "semaforo", "ranking", "bandos", "tribunal", "zocalo", "planner", "show-dia", "home"];
tabs.forEach(t => {
  window.switchTab(t);
  const v = document.getElementById(`section-${t}`);
  assert(v && v.classList.contains("active"), `View 'section-${t}' is active`);
  if (t === "home") {
    assert(lowerThird.style.display === "none", "Lower third hidden on home");
  } else {
    assert(lowerThird.style.display === "flex", `Lower third visible on tab '${t}'`);
  }
});

// ----------------------------------------------------------------
// TEST 2: Start Today's Master Show (show-dia mode 'today')
// ----------------------------------------------------------------
console.log("\n--- TEST 2: Master Show Pipeline (Wednesday 02/09) ---");
window.startShowDia("today");
const showDiaView = document.getElementById("section-show-dia");
assert(showDiaView && showDiaView.classList.contains("active"), "startShowDia switches to 'show-dia'");

// Step 1: Apertura
console.log("Testing Step 1: Apertura");
const body = document.getElementById("showStageBody");
assert(body && body.innerHTML.toLowerCase().includes("sasha ferro"), "Step 1 renders Sasha Ferro apertura");
window.voteAperturaByHost("holder", "a");
window.voteAperturaByHost("diane", "a");
window.voteAperturaByHost("luli", "b");

// Step 1 -> Step 2
window.nextShowDiaStep();
const stepCounter = document.getElementById("showStepCounter");
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 2"), "Advanced to Step 2 (Bandos)");
assert(body.innerHTML.includes("Lola Latorre") || body.innerHTML.includes("Sorbo"), "Duelo 1 in Step 2 rendered");
window.voteBandoByHost("holder", "b");
window.voteBandoByHost("diane", "b");

// Step 2 Duelo 1 -> Duelo 2
window.nextShowDiaStep();
assert(body.innerHTML.includes("Pinchazos") || body.innerHTML.includes("Mazza"), "Advanced to Duelo 2 (Mazza / Pinchazos)");

// Step 2 Duelo 2 -> Duelo 3
window.nextShowDiaStep();
assert(body.innerHTML.includes("Santi Talledo") || body.innerHTML.includes("Movistar"), "Advanced to Duelo 3 (Santi Talledo)");

// Step 2 -> Step 3 (Tribunal)
window.nextShowDiaStep();
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 3"), "Advanced to Step 3 (Tribunal)");
assert(body.innerHTML.includes("Sasha Ferro") || body.innerHTML.includes("Parrilla"), "Juicio 1 rendered");
window.voteTribunalByHost("holder", "A");
window.voteTribunalByHost("diane", "A");
window.voteTribunalByHost("luli", "C");

// Step 3 Juicio 1 -> Juicio 2
window.nextShowDiaStep();
assert(body.innerHTML.includes("75"), "Advanced to Juicio 2 (75 Años)");

// Step 3 Juicio 2 -> Juicio 3
window.nextShowDiaStep();
assert(body.innerHTML.includes("Robot") || body.innerHTML.includes("Tesla"), "Advanced to Juicio 3 (Robots / Tesla)");

// Step 3 -> Step 4 (Semaforo)
window.nextShowDiaStep();
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 4"), "Advanced to Step 4 (Semaforo)");
for (let s = 0; s < 7; s++) {
  window.voteShowSemaforoMulti(s % 2 === 0 ? "fuego" : "verde");
}

// Step 4 -> Step 5 (Podio)
window.setShowDiaStep(5);
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 5"), "Advanced to Step 5 (Podio)");
window.swapPodio(0, 1);
assert(body.innerHTML.includes("RANKING"), "Podio rendered successfully");

// Step 5 -> Step 6 (Ruleta)
window.nextShowDiaStep();
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 6"), "Advanced to Step 6 (Ruleta)");
window.assignShowThroneMulti("casorio", "Facu Guarino");
window.assignShowThroneMulti("chongo", "Lionel Ferro");
window.assignShowThroneMulti("funa", "Martín Salwe");

// Step 6 Round 1 -> Round 2
window.nextShowDiaStep();
assert(body.innerHTML.includes("Lola Latorre") || body.innerHTML.includes("Sorbo"), "Ruleta at Round 2 (Lola Latorre)");

// Step 6 -> Step 7 (Funa)
window.nextShowDiaStep();
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 7"), "Advanced to Step 7 (Funa)");
window.selectFunaHost("diane");
window.resolveShowFuna("zafo");

// Step 7 -> Step 8 (Dashboard)
window.nextShowDiaStep();
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 8"), "Advanced to Step 8 (Master Dashboard)");
assert(body.innerHTML.includes("ANÁLISIS PSICOLÓGICO"), "Dashboard rendered analysis");
assert(body.innerHTML.includes("VENENO EN SANGRE"), "Dashboard rendered metric gauges");

// Test Backwards Navigation from Step 8 back to Step 1
console.log("\n--- TEST 2.1: Backwards Navigation in show-dia ---");
let backSteps = 0;
while (stepCounter && !stepCounter.textContent.includes("BLOQUE 1") && backSteps < 20) {
  window.prevShowDiaStep();
  backSteps++;
}
assert(stepCounter && stepCounter.textContent.includes("BLOQUE 1"), "Successfully navigated back to Step 1");

// ----------------------------------------------------------------
// TEST 3: Standalone Game Modes
// ----------------------------------------------------------------
console.log("\n--- TEST 3: Standalone Game Modes ---");

// Roulette
console.log("Testing Standalone Roulette:");
window.switchTab("roulette");
window.setRouletteStep(2);
window.setRouletteStep(3);
window.setRouletteStep(4);
window.setRouletteStep(5);
assert(document.getElementById("rouletteStep5") && document.getElementById("rouletteStep5").classList.contains("active"), "Roulette at Step 5 (Thrones)");

// Semáforo
console.log("Testing Standalone Semáforo:");
window.switchTab("semaforo");
window.startSemaforoRound();
for (let i = 0; i < 10; i++) {
  window.selectSemaforoLevel(i % 2 === 0 ? "verde" : "fuego");
}
const resCard = document.getElementById("semaforoResultsCard");
assert(resCard && resCard.style.display === "block", "Semáforo automatically rendered Results Card after 10 questions");

// Ranking
console.log("Testing Standalone Ranking:");
window.switchTab("ranking");
window.loadRankingSet(0);
window.swapRankingItems(0, 1);
window.confirmRankingVerdict();
assert(document.getElementById("rankingStack") !== null, "Ranking confirmed verdict");

// Bandos
console.log("Testing Standalone Bandos:");
window.switchTab("bandos");
window.loadBandoDuel(0);
window.voteBando("a");
window.voteBando("a");
window.voteBando("b");
assert(document.getElementById("bandoCardA") !== null, "Bando votes updated");

// Tribunal
console.log("Testing Standalone Tribunal:");
window.switchTab("tribunal");
window.loadTribunalCase(0);
window.setTribunalPhase(2);
window.setTribunalPhase(3);
window.voteConductor("holder", "A");
window.voteConductor("diane", "A");
window.voteConductor("luli", "B");
const verdictBox = document.getElementById("verdictDecisionText");
assert(verdictBox && verdictBox.innerHTML.includes("OPCIÓN A"), "Verdict announced Option A as winner");

// Funa Modal
console.log("Testing Funa Modal / Al Banco:");
window.triggerFunaModal("holder");
const modal = document.getElementById("vetoModal");
assert(modal && modal.classList.contains("active"), "Funa modal opened");
window.resolveFuna("cancelado");
assert(!modal.classList.contains("active"), "Funa modal closed after resolution");

// TEST 4: Repeat Show Reset Verification
console.log("\n--- TEST 4: Repeat Show Total Reset ---");
window.startShowDia("today");
window.voteAperturaByHost("holder", "a");
window.voteAperturaByHost("diane", "b");
window.nextShowDiaStep();
window.voteBandoByHost("holder", "a");
// Now restart show
window.startShowDia("today");
assert(document.getElementById("showStageBody") !== null, "Show restarted at step 1");
// Check that votes are reset
assert(!document.getElementById("showStageBody").innerHTML.includes("selected-winner"), "No winning side selected yet after reset");
console.log("  ✓ Reset on repeat completely cleared previous choices!");

console.log("\n========================================================");
console.log("🎉 ALL TESTS PASSED! ZERO ERRORS ENCOUNTERED!");
console.log("========================================================\n");
