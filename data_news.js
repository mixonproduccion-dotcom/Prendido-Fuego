// BASE DE DATOS DE NOTICIAS DE ÚLTIMO MOMENTO
const BREAKING_NEWS_DATA = [
  {
    id: "news-01",
    tag: "ROMANCE CONFIRMADO",
    title: "Tiago PZK y La Joaqui blanquearon su noviazgo bajando de un avión privado tomados de la mano",
    time: "HACE 1 HORA",
    trending: true
  },
  {
    id: "news-02",
    tag: "TRAICIÓN URBANA",
    title: "Luck Ra expuso los mensajes de Tiago PZK: 'Me ponía gordito te quiero mientras andaba con mi ex'",
    time: "HACE 2 HORAS",
    trending: true
  },
  {
    id: "news-03",
    tag: "HISTÓRICO EN RIVER",
    title: "Fin de la grieta pop: Tini Stoessel apareció por sorpresa y se abrazó con Lali ante 80.000 personas",
    time: "HACE 3 HORAS",
    trending: true
  },
  {
    id: "news-04",
    tag: "AMOR EN REDES",
    title: "Pedro Rosemblat le dedicó una emotiva carta a Lali tras sus shows en River: 'Te amo y te admiro'",
    time: "HACE 4 HORAS",
    trending: false
  },
  {
    id: "news-05",
    tag: "PRIME TIME TV",
    title: "Telefe estrena hoy MasterChef Celebrity 2026 con Wanda Nara buscando retener el rating frente al streaming",
    time: "HACE 5 HORAS",
    trending: false
  },
  {
    id: "news-06",
    tag: "AURA COLAPINTO",
    title: "Franco Colapinto es furor en redes por sus likes nocturnos a famosas en X tras el fin de semana de carrera",
    time: "HACE 6 HORAS",
    trending: false
  }
];

if (typeof window !== "undefined") {
  window.BREAKING_NEWS_DATA = BREAKING_NEWS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BREAKING_NEWS_DATA };
}
