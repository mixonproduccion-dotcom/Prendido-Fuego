// =========================================================
// BASE DE DATOS 4: GUERRA DE BANDOS: ¿A QUIÉN BANCÁS?
// Duelos de Farándula, Música Urbana, Streaming & Escándalos Virales
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const GUERRA_BANDOS_DATA = [
  {
    "id": "duelo-sasha-lio-salwe",
    "title": "Escándalo en el Stream: Sasha Ferro vs. Lionel Ferro & Martín Salwe",
    "guide": "¿A quién bancás en la mesa? ¿Límites familiares inquebrantables o humor desmedido de stream?",
    "sideA": {
      "id": "sasha-ferro",
      "name": "Sasha Ferro",
      "badge": "La que Puso Límites Familiares",
      "quote": "Pensaban que no podían existir peores programas de stream... acá tienen a estos pelotudos.",
      "argument": "Bancó años de ninguneo; no puede tolerar que su propio hermano se ría en vivo mientras dos tipos la degradan sexualmente ante miles de personas. La sangre no justifica la falta de respeto.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "lio-salwe",
      "name": "Lionel Ferro & Salwe",
      "badge": "El Humor de Stream en Jaque",
      "quote": "Fue un chiste de stream espontáneo, me tomó por sorpresa y hablé tras el vivo.",
      "argument": "Sostienen que fue una humorada al aire sin maldad premeditada, que en el streaming se cruzan límites todo el tiempo y que los problemas familiares se resuelven puertas adentro.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-lola-hailey-sorbo",
    "title": "El 'Sorbo Gate': Lola Latorre vs. Hailey Bieber ('Rhode')",
    "guide": "¿Inspiración legítima para emprender en Argentina o copia y plagio descarado?",
    "sideA": {
      "id": "lola-latorre",
      "name": "Lola Latorre ('Sorbo')",
      "badge": "Inspiración Nacional",
      "quote": "Lo mío es inspiración, no copia.",
      "argument": "En la industria de la cosmética mundial casi todo está inventado; traer y adaptar una tendencia estética global para que el público argentino acceda a productos cancheros es visión de negocio.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "hailey-bieber",
      "name": "Críticas & Hailey Bieber",
      "badge": "Plagio Descarado",
      "quote": "Lo que pedís por internet vs lo que te llega.",
      "argument": "Copió al 100% el packaging, la tipografía minimalista, los tonos grises y el concepto exacto de Rhode; una falta total de creatividad aprovechando el apellido para vender caro.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-mazza-pinchazos-gym",
    "title": "La Polémica de los 'Pinchazos': Tomás Mazza vs. Fitness Natural",
    "guide": "¿El atajo farmacológico para estar marcado o la cultura del esfuerzo y salud?",
    "sideA": {
      "id": "tomas-mazza",
      "name": "Tomás Mazza & 'Pinchazos'",
      "badge": "El Atajo Estético",
      "quote": "Estoy adicto a los anabólicos y los pibes buscan resultados rápidos.",
      "argument": "La sociedad premia el físico hegemónico inmediato en redes; si la ciencia y los fármacos te dan el físico deseado sin pasar 10 años sufriendo en un gimnasio, la gente elige el resultado.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "fitness-natural",
      "name": "Fitness Natural & Salud",
      "badge": "Disciplina & Respeto al Cuerpo",
      "quote": "Sin esfuerzo no hay mérito y con la salud no se jode.",
      "argument": "Pincharse sin entrenar ni comer adecuadamente es una bomba de tiempo para los órganos; el verdadero físico y la disciplina mental se construyen levantando peso y con constancia.",
      "image": "assets/celebrities/tomas-holder.jpg"
    }
  },
  {
    "id": "duelo-talledo-blanqueo",
    "title": "El Blanqueo en el Movistar: Santi Talledo vs. El Perfil Bajo",
    "guide": "¿Mostrar tu amor ante 15.000 personas en vivo o cuidar la intimidad de la pareja?",
    "sideA": {
      "id": "santi-talledo",
      "name": "Santi Talledo & Carli",
      "badge": "Amor Auténtico al Aire",
      "quote": "Presenté a mi novio porque el amor se celebra con la gente que nos banca.",
      "argument": "Vivir el amor con libertad total y compartir tu felicidad con la comunidad de streaming que te acompaña todos los días es el mayor acto de honestidad con el público.",
      "image": "assets/celebrities/santi-talledo.jpg"
    },
    "sideB": {
      "id": "perfil-bajo",
      "name": "El Perfil Bajo",
      "badge": "Intimidad Blindada",
      "quote": "La sobreexposición mediática destruye cualquier relación.",
      "argument": "Cuando metés a miles de fanáticos y a las redes adentro de tu cama y de tu intimidad, ante la primera crisis de pareja la condena pública y los rumores se vuelven insoportables.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-robots-sexuales-pareja",
    "title": "El Futuro del Amor: Robots Sexuales (Tesla / China) vs. Pareja Tradicional",
    "guide": "¿La compañía artificial perfecta sin toxicidad o la imperfección de las relaciones humanas?",
    "sideA": {
      "id": "robots-ia",
      "name": "Robots Humanoides (Tesla/China)",
      "badge": "Cero Toxicidad & Placer",
      "quote": "No te celan, no te mienten y siempre están para vos.",
      "argument": "La tecnología soluciona la soledad humana sin histerias, sin infidelidades de WhatsApp ni reclamos económicos; es una evolución natural de las relaciones en el siglo XXI.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "pareja-humana",
      "name": "Relaciones Humanas Reales",
      "badge": "Emociones & Conexión Real",
      "quote": "El amor real no se enchufa a 220v.",
      "argument": "Un robot nunca podrá sentir empatía, mirarte a los ojos con amor genuino ni acompañarte en momentos difíciles; reemplazar a los humanos por máquinas es la decadencia emocional absoluta.",
      "image": "assets/celebrities/diane-caracchi.jpg"
    }
  },
  {
    "id": "duelo-wanda-maxilopez-rusia",
    "title": "El Escándalo de Rusia: Wanda Nara vs. Maxi López",
    "sideA": {
      "id": "wanda-solange",
      "name": "Wanda Nara ('Solange')",
      "badge": "La que Consulta a ChatGPT",
      "quote": "Me levanto con que a mi ex lo azotaban en sótanos de Rusia. Mujeres no dependan de nadie.",
      "argument": "Bancó 3 hijos sola en Moscú mientras Maxi andaba de joda; tiene derecho a exponer las 7 infidelidades que le confirmó ChatGPT y advertir a las mujeres que ser mantenida sale caro.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "maxi-lopez",
      "name": "Maxi López",
      "badge": "El que Elige Seguir Adelante",
      "quote": "Los hechos ocurrieron antes de que nos conociéramos, Solange. Yo elegí seguir adelante.",
      "argument": "Fueron anécdotas de soltero antes del matrimonio; Wanda no puede soltar el pasado y usa cualquier declaración para generar show y prensa para sus programas de cocina.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-messi-retiro-definitivo",
    "title": "El Retiro del Capitán: Lionel Messi se Despidió de la Selección",
    "sideA": {
      "id": "messi-retiro-cima",
      "name": "Retirarse en la Cima (Gloria Eterna)",
      "badge": "El Fin de una Era",
      "quote": "Di todo lo que tenía, me vacié y me voy con la tranquilidad del deber cumplido.",
      "argument": "Ganó todo: Copa América, Finalissima y la Copa del Mundo en Qatar. Retirarse en el pico absoluto de su carrera sin desgastarse físicamente es la decisión más digna del rey del fútbol.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "messi-un-baile-mas",
      "name": "El Clamor Popular ('Un Baile Más')",
      "badge": "El Vacío Nacional",
      "quote": "Leo, por favor jugá un Mundial más.",
      "argument": "El país entero se niega a soltarlo; con 39 años y caminando en la cancha sigue siendo el mejor del planeta y el pueblo argentino necesita verlo una última vez con la 10.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-tinigate-70m",
    "title": "El #TiniGate ($70M USD): Tini Stoessel vs. Alejandro Stoessel",
    "sideA": {
      "id": "tini-anto",
      "name": "Tini (Con Anto Roccuzzo & Messi)",
      "badge": "La Verdad Financiera",
      "quote": "Trabajo desde los 10 años y merezco controlar mi dinero.",
      "argument": "Trabajó sin descanso toda su vida; con el asesoramiento del equipo de Lionel Messi y Antonela Roccuzzo descubrió irregularidades por 70 millones de dólares y decidió tomar el control total.",
      "image": "assets/logo-pf.jpg"
    },
    "sideB": {
      "id": "stoessel-padre-manager",
      "name": "Alejandro Stoessel",
      "badge": "El Creador de la Estrella",
      "quote": "El nuevo entorno no quiere negociar y vamos a contrademandar.",
      "argument": "Construyó la carrera de su hija desde cero arriesgando su propio patrimonio y salud; considera que el nuevo entorno de la cantante la está manipulando en su contra.",
      "image": "assets/logo-pf.jpg"
    }
  },
  {
    "id": "duelo-joaqui-luckra",
    "title": "El Amor Cuartetero & La Ruptura: La Joaqui vs. Luck Ra",
    "sideA": {
      "id": "joaqui",
      "name": "La Joaqui",
      "badge": "La que Proyectó Familia",
      "quote": "De tín marín de do pingüé, si no te valora ese gil quién se cree.",
      "argument": "Se la jugó con el corazón abierto, compró una casa al lado para armar una familia ensamblada con sus hijas y fue leal hasta el final.",
      "image": "assets/celebrities/joaqui.jpg"
    },
    "sideB": {
      "id": "luckra",
      "name": "Luck Ra",
      "badge": "El Soltero del Cuarteto",
      "quote": "No estaba preparado para convivir tan rápido.",
      "argument": "Está en el pico histórico de su carrera con 25 años y giras semanales; es más sano frenar a tiempo que convivir por presión y terminar odiándose.",
      "image": "assets/celebrities/luckra.jpg"
    }
  },
  {
    "id": "duelo-enzo-valentina",
    "title": "La Soltería Post-Qatar: Enzo Fernández vs. Valentina Cervantes",
    "sideA": {
      "id": "enzo",
      "name": "Enzo Fernández",
      "badge": "El que Fue de Frente",
      "quote": "Fui papá a los 19 y merezco vivir mi juventud.",
      "argument": "Fue sincero de frente en lugar de tener amantes ocultas en Londres; garantiza el 100% del bienestar económico y la paternidad responsable de sus hijos.",
      "image": "assets/celebrities/enzo.jpg"
    },
    "sideB": {
      "id": "valentina",
      "name": "Valentina Cervantes",
      "badge": "La Dama con Aura",
      "quote": "Lo banqué cuando no teníamos nada y volví sin reproches.",
      "argument": "Lo acompañó desde que comían fideos en San Martín hasta la gloria de Qatar; volvió a Argentina con dignidad absoluta, sin hablar mal y facturando como modelo.",
      "image": "assets/celebrities/valentina.jpg"
    }
  },
  {
    "id": "duelo-chino-marisol-gisela",
    "title": "El Escándalo del Telo: Martín 'El Chino' Ku vs. Marisol",
    "sideA": {
      "id": "chino-ku",
      "name": "Martín 'El Chino' Ku",
      "badge": "El Estratega Incomprendido",
      "quote": "Fue todo una opereta armada de los medios.",
      "argument": "Salió de la casa más vista del país con la cabeza quemada; los medios armaron una opereta mediática con fotos descontextualizadas para ensuciarlo.",
      "image": "assets/celebrities/chino-ku.jpg"
    },
    "sideB": {
      "id": "marisol",
      "name": "Marisol & Gisela Gordillo",
      "badge": "Las que Destaparon los Chats",
      "quote": "El pibe virgo de la tele era un personaje.",
      "argument": "Gisela mostró los chats reales donde el Chino decía estar soltero y Marisol lo bancó meses encerrado para que termine en un telo de Rosario.",
      "image": "assets/celebrities/marisol.jpg"
    }
  },
  {
    "id": "duelo-flotvigna-siciliani",
    "title": "El 'Siciliani Gate': Flor Vigna vs. Griselda Siciliani",
    "sideA": {
      "id": "florvigna",
      "name": "Flor Vigna",
      "badge": "La que Descubrió los Mensajes",
      "quote": "Le mandaba mensajes a Luciano mientras convivía conmigo.",
      "argument": "Descubrió los chats en el celular de Luciano Castro, sufrió la traición en silencio y tuvo la valentía de ponerle nombre y apellido a la tercera en discordia.",
      "image": "assets/celebrities/florvigna.jpg"
    },
    "sideB": {
      "id": "siciliani",
      "name": "Griselda Siciliani",
      "badge": "La Libre Sin Filtro",
      "quote": "El pasado es pasado y hoy estamos juntos.",
      "argument": "Actriz consagrada, tiene una historia de amor de más de 15 años con Luciano Castro y no tiene que darle explicaciones a los despechos de las ex.",
      "image": "assets/celebrities/siciliani.jpg"
    }
  },
  {
    "id": "duelo-spreen-futbol",
    "title": "El Minuto de Fama: Spreen en Riestra vs. El Fútbol Tradicional",
    "sideA": {
      "id": "spreen",
      "name": "Iván 'Spreen' Buhajeruk",
      "badge": "El Rey del Marketing Digital",
      "quote": "Le di al club la mayor visibilidad de su historia.",
      "argument": "Aceptó la propuesta de marketing más viral de la década, puso a Deportivo Riestra en las portadas de todo el mundo y no le cobró un peso a la AFA.",
      "image": "assets/celebrities/spreen.jpg"
    },
    "sideB": {
      "id": "futbol-tradicional",
      "name": "El Fútbol Tradicional (Verón/Acuña)",
      "badge": "El Respeto al Potrero",
      "quote": "Una falta de respeto a los chicos que sueñan con debutar.",
      "argument": "El potrero y las inferiores son sagrados en Argentina; regalarle 59 segundos a un streamer por plata de apuestas arruina la esencia del deporte.",
      "image": "assets/celebrities/futbol-tradicional.jpg"
    }
  },
  {
    "id": "duelo-tini-emilia",
    "title": "Reinas del Pop Argentino: Tini Stoessel vs. Emilia Mernes",
    "sideA": {
      "id": "tini",
      "name": "Tini Stoessel",
      "badge": "La Pionera del Pop",
      "quote": "El tiempo cura y la música sana.",
      "argument": "Abrió el camino internacional desde Disney, bancó las peores operaciones mediáticas por su vida privada y sacó 'Un mechón de pelo' contando su depresión real.",
      "image": "assets/celebrities/tini.jpg"
    },
    "sideB": {
      "id": "emilia",
      "name": "Emilia Mernes",
      "badge": "El Fenómeno Y2K",
      "quote": "Brillando en el escenario sin meterme en quilombos.",
      "argument": "Metió 10 Movistar Arena y Vélez sold out, impuso la moda de los 2000s, hits mundiales y se mantiene enfocada en la música y su pareja con Duki sin conventillo.",
      "image": "assets/celebrities/emilia.jpg"
    }
  },
  {
    "id": "duelo-coty-tora",
    "title": "La Traición del Stream: Coty Romero vs. Lucila 'La Tora' Villar",
    "sideA": {
      "id": "coty",
      "name": "Coty Romero",
      "badge": "La que Priorizó el Deseo",
      "quote": "Fui egoísta pero no puedo fingir lo que siento.",
      "argument": "Se enamoró de Nacho de verdad, fue de frente en LAM admitiendo sus errores y no se escondió detrás de la hipocresía de las redes.",
      "image": "assets/celebrities/coty.jpg"
    },
    "sideB": {
      "id": "tora",
      "name": "La Tora Villar",
      "badge": "La Reina de los Códigos",
      "quote": "Los códigos de compañeras de trabajo se respetan.",
      "argument": "Mantuvo el profesionalismo al aire en el stream de Telefe mientras veía a su ex con su compañera de trabajo sin armar papelones televisivos.",
      "image": "assets/celebrities/tora.jpg"
    }
  },
  {
    "id": "duelo-nicki-pesopluma",
    "title": "La Traición de Las Vegas: Nicki Nicole vs. Peso Pluma",
    "sideA": {
      "id": "nicki",
      "name": "Nicki Nicole",
      "badge": "La Dignidad en Letras",
      "quote": "Lo que se ama se respeta; yo de ahí me voy.",
      "argument": "Escribió el comunicado de separación más digno de la música urbana, cortó en seco al enterarse del video y regresó a Argentina con el aura intacta.",
      "image": "assets/celebrities/nicki.jpg"
    },
    "sideB": {
      "id": "pesopluma",
      "name": "Peso Pluma",
      "badge": "El Rockstar del Corrido",
      "quote": "La vida de casino y excesos no perdona.",
      "argument": "Llegó al #1 global de Billboard con 24 años; las tentaciones de Las Vegas y el estilo de vida de estrella mundial son incompatibles con la monogamia tradicional.",
      "image": "assets/celebrities/pesopluma.jpg"
    }
  }
];

if (typeof window !== "undefined") {
  window.GUERRA_BANDOS_DATA = GUERRA_BANDOS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { GUERRA_BANDOS_DATA };
}
