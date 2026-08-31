const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(BASE_DIR, "assets", "celebrities");

// Helper to check if asset exists
function getAssetPath(id, fallback = "assets/logo-pf.jpg") {
  const file = `${id}.jpg`;
  if (fs.existsSync(path.join(ASSETS_DIR, file))) {
    return `assets/celebrities/${file}`;
  }
  return fallback;
}

// 1. Update data_celebrities.js
const celebFile = path.join(BASE_DIR, "data_celebrities.js");
let celebContent = fs.readFileSync(celebFile, "utf8");
const celebs = require(celebFile).CELEBRITIES_DATABASE;

let updatedCelebs = celebs.map(c => {
  return {
    ...c,
    image: getAssetPath(c.id)
  };
});

const newCelebContent = `// =========================================================
// BASE DE DATOS 1: 200 CELEBRIDADES DE LA FARÁNDULA,
// STREAMING, GH, MÚSICA & POLÍTICA ARGENTINA
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const CELEBRITIES_DATABASE = ${JSON.stringify(updatedCelebs, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CELEBRITIES_DATABASE };
}
`;
fs.writeFileSync(celebFile, newCelebContent, "utf8");
console.log(`Updated ${updatedCelebs.length} celebrities in data_celebrities.js`);

// 2. Update data_bandos.js
const bandosFile = path.join(BASE_DIR, "data_bandos.js");
let bandosData = require(bandosFile).GUERRA_BANDOS_DATA;

const updatedBandos = bandosData.map(b => {
  const sideAImg = getAssetPath(b.sideA.id, getAssetPath(b.sideA.id.replace("-", "")));
  const sideBImg = getAssetPath(b.sideB.id, getAssetPath(b.sideB.id.replace("-", "")));
  return {
    ...b,
    sideA: {
      ...b.sideA,
      image: sideAImg
    },
    sideB: {
      ...b.sideB,
      image: sideBImg
    }
  };
});

const newBandosContent = `// =========================================================
// BASE DE DATOS 4: GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?
// Duelos de Farándula, Música Urbana, Streaming & Escándalos Virales
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const GUERRA_BANDOS_DATA = ${JSON.stringify(updatedBandos, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GUERRA_BANDOS_DATA };
}
`;
fs.writeFileSync(bandosFile, newBandosContent, "utf8");
console.log(`Updated ${updatedBandos.length} duels in data_bandos.js`);

// 3. Update data_ranking.js
const rankingFile = path.join(BASE_DIR, "data_ranking.js");
const rankingContent = fs.readFileSync(rankingFile, "utf8");
let RANKING_DATA = [];
eval(rankingContent.replace("const RANKING_DATA", "RANKING_DATA"));

const updatedRanking = RANKING_DATA.map(cat => {
  return {
    ...cat,
    candidates: (cat.candidates || []).map(cand => {
      return {
        ...cand,
        image: getAssetPath(cand.id)
      };
    })
  };
});

const newRankingContent = `// =========================================================
// BASE DE DATOS 5: RANKING DE CARETEADA & TRAICIONES (TOP 5)
// Dinámicas Interactivas de Votación y Debate en Vivo
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const RANKING_DATA = ${JSON.stringify(updatedRanking, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { RANKING_DATA };
}
`;
fs.writeFileSync(rankingFile, newRankingContent, "utf8");
console.log(`Updated ${updatedRanking.length} ranking categories in data_ranking.js`);

// 4. Update data_tribunal.js
const tribunalFile = path.join(BASE_DIR, "data_tribunal.js");
const tribunalContent = fs.readFileSync(tribunalFile, "utf8");
let TRIBUNAL_CASES = [];
eval(tribunalContent.replace("const TRIBUNAL_CASES", "TRIBUNAL_CASES"));

const caseImageMap = {
  "caso-wanda-maxi-chatgpt": "wanda-nara",
  "caso-tinigate-70m-antonela": "tini-stoessel",
  "caso-jefe-sigma-harinas": "tomas-holder",
  "caso-chino-holder-gisela": "gisela-holder",
  "caso-enzo-valentina-solteria": "valentina-cervantes",
  "caso-joaqui-luckra-casa": "la-joaqui",
  "caso-spreen-riestra-minuto": "spreen",
  "caso-siciliani-florvigna-castro": "florvigna",
  "caso-wanda-lgante-icardi": "wanda-nara",
  "caso-duki-emilia-chats": "emilia-mernes",
  "caso-coty-nacho-tora": "coty-romero",
  "caso-nicki-pesopluma-trueno": "nicki-nicole",
  "caso-occhiato-natijota-olga": "nicolas-occhiato",
  "caso-camila-homs-demil": "cami-homs",
  "caso-charly-benvenuto-redes": "luli-case",
  "caso-billetera-amigos-boliche": "diane-caracchi",
  "caso-el-amigo-del-ex": "luli-case"
};

const updatedTribunal = TRIBUNAL_CASES.map(tc => {
  const celebId = caseImageMap[tc.id] || "tomas-holder";
  return {
    ...tc,
    image: getAssetPath(celebId)
  };
});

const newTribunalContent = `// =========================================================
// BASE DE DATOS 2: EL TRIBUNAL DE FARÁNDULA & DILEMAS MORALES
// "¿Qué harías vos en su lugar?" - 15 Casos de Alta Tensión
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const TRIBUNAL_CASES = ${JSON.stringify(updatedTribunal, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRIBUNAL_CASES };
}
`;
fs.writeFileSync(tribunalFile, newTribunalContent, "utf8");
console.log(`Updated ${updatedTribunal.length} cases in data_tribunal.js`);

// 5. Update celebrities.js if present
const legacyCelebFile = path.join(BASE_DIR, "celebrities.js");
if (fs.existsSync(legacyCelebFile)) {
  const legacyContent = fs.readFileSync(legacyCelebFile, "utf8");
  let CELEBRITIES_DATA = [];
  eval(legacyContent.replace("const CELEBRITIES_DATA", "CELEBRITIES_DATA"));
  const updatedLegacy = CELEBRITIES_DATA.map(c => ({
    ...c,
    image: getAssetPath(c.id)
  }));
  const newLegacyContent = `// Base de Datos de Famosos Argentinos para "Prendido Fuego" (Mix On)
// Categorías: farandula, gh, musica, futbol, politica, streamers

const CELEBRITIES_DATA = ${JSON.stringify(updatedLegacy, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CELEBRITIES_DATA };
}
`;
  fs.writeFileSync(legacyCelebFile, newLegacyContent, "utf8");
  console.log(`Updated legacy celebrities.js with ${updatedLegacy.length} records`);
}

console.log("ALL DATA FILES SUCCESSFULLY UPDATED WITH LOCAL REAL IMAGES!");
