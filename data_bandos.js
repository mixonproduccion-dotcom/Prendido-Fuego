// =========================================================
// BASE DE DATOS 4: GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?
// Duelos de Farándula, Música Urbana, Streaming & Escándalos Virales
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const GUERRA_BANDOS_DATA = [
  {
    id: "duelo-joaqui-luckra",
    title: "El Amor Cuartetero & La Ruptura: La Joaqui vs. Luck Ra",
    sideA: {
      id: "joaqui",
      name: "La Joaqui",
      badge: "La que Proyectó Familia",
      quote: "Me la jugué entera por amor y me quedé sin nada.",
      argument: "Se la jugó con el corazón abierto, compró una casa al lado para armar una familia ensamblada con sus hijas y fue leal hasta el final.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "luckra",
      name: "Luck Ra",
      badge: "El Soltero del Cuarteto",
      quote: "No estaba preparado para convivir tan rápido.",
      argument: "Está en el pico histórico de su carrera con 25 años y giras semanales; es más sano frenar a tiempo que convivir por presión y terminar odiándose.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-enzo-valentina",
    title: "La Soltería Post-Qatar: Enzo Fernández vs. Valentina Cervantes",
    sideA: {
      id: "enzo",
      name: "Enzo Fernández",
      badge: "El que Fue de Frente",
      quote: "Fui papá a los 19 y merezco vivir mi juventud.",
      argument: "Fue sincero de frente en lugar de tener amantes ocultas en Londres; garantiza el 100% del bienestar económico y la paternidad responsable de sus hijos.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "valentina",
      name: "Valentina Cervantes",
      badge: "La Dama con Aura",
      quote: "Lo banqué cuando no teníamos nada y volví sin reproches.",
      argument: "Lo acompañó desde que comían fideos en San Martín hasta la gloria de Qatar; volvió a Argentina con dignidad absoluta, sin hablar mal y facturando como modelo.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-chino-marisol-gisela",
    title: "El Escándalo del Telo: Martín 'El Chino' Ku vs. Marisol",
    sideA: {
      id: "chino-ku",
      name: "Martín 'El Chino' Ku",
      badge: "El Estratega Incomprendido",
      quote: "Fue todo una opereta armada de los medios.",
      argument: "Salió de la casa más vista del país con la cabeza quemada; los medios armaron una opereta mediática con fotos descontextualizadas para ensuciarlo.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "marisol",
      name: "Marisol & Gisela Gordillo",
      badge: "Las que Destaparon los Chats",
      quote: "El pibe virgo de la tele era un personaje.",
      argument: "Gisela mostró los chats reales donde el Chino decía estar soltero y Marisol lo bancó meses encerrado para que termine en un telo de Rosario.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-flotvigna-siciliani",
    title: "El 'Siciliani Gate': Flor Vigna vs. Griselda Siciliani",
    sideA: {
      id: "florvigna",
      name: "Flor Vigna",
      badge: "La que Descubrió los Mensajes",
      quote: "Le mandaba mensajes a Luciano mientras convivía conmigo.",
      argument: "Descubrió los chats en el celular de Luciano Castro, sufrió la traición en silencio y tuvo la valentía de ponerle nombre y apellido a la tercera en discordia.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "siciliani",
      name: "Griselda Siciliani",
      badge: "La Libre Sin Filtro",
      quote: "El pasado es pasado y hoy estamos juntos.",
      argument: "Actriz consagrada, tiene una historia de amor de más de 15 años con Luciano Castro y no tiene que darle explicaciones a los despechos de las ex.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-spreen-futbol",
    title: "El Minuto de Fama: Spreen en Riestra vs. El Fútbol Tradicional",
    sideA: {
      id: "spreen",
      name: "Iván 'Spreen' Buhajeruk",
      badge: "El Rey del Marketing Digital",
      quote: "Le di al club la mayor visibilidad de su historia.",
      argument: "Aceptó la propuesta de marketing más viral de la década, puso a Deportivo Riestra en las portadas de todo el mundo y no le cobró un peso a la AFA.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "futbol-tradicional",
      name: "El Fútbol Tradicional (Verón/Acuña)",
      badge: "El Respeto al Potrero",
      quote: "Una falta de respeto a los chicos que sueñan con debutar.",
      argument: "El potrero y las inferiores son sagrados en Argentina; regalarle 59 segundos a un streamer por plata de apuestas arruina la esencia del deporte.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-wanda-china",
    title: "El Clásico Nacional: Wanda Nara vs. La China Suárez",
    sideA: {
      id: "wanda",
      name: "Wanda Nara",
      badge: "La que Factura",
      quote: "Las mujeres ya no lloran, facturan.",
      argument: "Madre estratega, empresaria millonaria, perdonó hasta donde pudo y convirtió el dolor en un imperio de marcas, cosméticos y streaming.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "china",
      name: "La China Suárez",
      badge: "La Libre Sin Bozal",
      quote: "Yo soy libre y no le debo explicaciones a nadie.",
      argument: "Mujer libre, magnética, no busca la aprobación de la sociedad machista ni de la tele y vive sus romances sin careteadas.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-tini-emilia",
    title: "Reinas del Pop Argentino: Tini Stoessel vs. Emilia Mernes",
    sideA: {
      id: "tini",
      name: "Tini Stoessel",
      badge: "La Pionera del Pop",
      quote: "El tiempo cura y la música sana.",
      argument: "Abrió el camino internacional desde Disney, bancó las peores operaciones mediáticas por su vida privada y sacó 'Un mechón de pelo' contando su depresión real.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "emilia",
      name: "Emilia Mernes",
      badge: "El Fenómeno Y2K",
      quote: "Brillando en el escenario sin meterme en quilombos.",
      argument: "Metió 10 Movistar Arena y Vélez sold out, impuso la moda de los 2000s, hits mundiales y se mantiene enfocada en la música y su pareja con Duki sin conventillo.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-coty-tora",
    title: "La Traición del Stream: Coty Romero vs. Lucila 'La Tora' Villar",
    sideA: {
      id: "coty",
      name: "Coty Romero",
      badge: "La que Priorizó el Deseo",
      quote: "Fui egoísta pero no puedo fingir lo que siento.",
      argument: "Se enamoró de Nacho de verdad, fue de frente en LAM admitiendo sus errores y no se escondió detrás de la hipocresía de las redes.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "tora",
      name: "La Tora Villar",
      badge: "La Reina de los Códigos",
      quote: "Los códigos de compañeras de trabajo se respetan.",
      argument: "Mantuvo el profesionalismo al aire en el stream de Telefe mientras veía a su ex con su compañera de trabajo sin armar papelones televisivos.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-nicki-pesopluma",
    title: "La Traición de Las Vegas: Nicki Nicole vs. Peso Pluma",
    sideA: {
      id: "nicki",
      name: "Nicki Nicole",
      badge: "La Dignidad en Letras",
      quote: "Lo que se ama se respeta; yo de ahí me voy.",
      argument: "Escribió el comunicado de separación más digno de la música urbana, cortó en seco al enterarse del video y regresó a Argentina con el aura intacta.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "pesopluma",
      name: "Peso Pluma",
      badge: "El Rockstar del Corrido",
      quote: "La vida de casino y excesos no perdona.",
      argument: "Llegó al #1 global de Billboard con 24 años; las tentaciones de Las Vegas y el estilo de vida de estrella mundial son incompatibles con la monogamia tradicional.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: "duelo-occhiato-migue",
    title: "La Batalla del Streaming: Nico Occhiato vs. Migue Granados",
    sideA: {
      id: "occhiato",
      name: "Nico Occhiato (Luzu TV)",
      badge: "El Pionero & Visionario",
      quote: "Construimos una comunidad desde cero.",
      argument: "Creó la industria del streaming moderno en Argentina, apostó todo cuando nadie creía y formó el canal líder en audiencia joven y formatos de comunidad.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80"
    },
    sideB: {
      id: "migue",
      name: "Migue Granados (Olga)",
      badge: "El Talento Disruptivo",
      quote: "Hacemos televisión de lujo en streaming.",
      argument: "Elevó la vara artística, trajo a Messi y a los músicos más grandes con producción de nivel internacional sin atarse a las fórmulas tradicionales.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GUERRA_BANDOS_DATA };
}
