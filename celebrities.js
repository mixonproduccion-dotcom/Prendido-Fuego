// Base de Datos de Famosos Argentinos para "Prendido Fuego" (Mix On)
// Categorías: farandula, gh, musica, futbol, politica, streamers

const CELEBRITIES_DATA = [
  {
    "id": "wanda-nara",
    "name": "Wanda Nara",
    "category": "farandula",
    "categoryLabel": "Farándula / Botinera Queen",
    "tag": "Reina del Marketing & Chimento",
    "image": "assets/celebrities/wanda-nara.jpg",
    "quote": "La que factura mientras todos lloran",
    "bio": "Empresaria, conductora y protagonista del 90% de los quilombos del país."
  },
  {
    "id": "china-suarez",
    "name": "La China Suárez",
    "category": "farandula",
    "categoryLabel": "Farándula / Actriz",
    "tag": "Terror de los Matrimonios",
    "image": "assets/celebrities/china-suarez.jpg",
    "quote": "Fiel a su libertad sin pedir perdón",
    "bio": "Actriz, cantante, imán mediático y pesadilla de Yanina Latorre."
  },
  {
    "id": "lali-esposito",
    "name": "Lali Espósito",
    "category": "musica",
    "categoryLabel": "Música / Popstar",
    "tag": "Diva Pop Nacional",
    "image": "assets/celebrities/lali-esposito.jpg",
    "quote": "¿Quiénes son? Disciplina y carisma",
    "bio": "La uno del pop argentino, fiestera consagrada y con aura infinita."
  },
  {
    "id": "pampita",
    "name": "Pampita Ardohain",
    "category": "farandula",
    "categoryLabel": "Farándula / Conductora",
    "tag": "Sonrisa Blindada",
    "image": "assets/celebrities/pampita.jpg",
    "quote": "Te destruye sonriendo a 4K",
    "bio": "Supermodelo, conductora y estratega máxima de los medios."
  },
  {
    "id": "yanina-latorre",
    "name": "Yanina Latorre",
    "category": "farandula",
    "categoryLabel": "Farándula / LAM Queen",
    "tag": "Francotiradora Sin Filtro",
    "image": "assets/celebrities/yanina-latorre.jpg",
    "quote": "Tengo los chats, amor. Te aviso.",
    "bio": "El terror de los famosos. Sabe con quién te acostaste antes que vos."
  },
  {
    "id": "felipe-fort",
    "name": "Felipe Fort",
    "category": "farandula",
    "categoryLabel": "Farándula / Heredero",
    "tag": "Aura Millonaria",
    "image": "assets/celebrities/felipe-fort.jpg",
    "quote": "Heredero de Chocolates & Rolls Royce",
    "bio": "El nuevo comandante en potencia, fitness y fanático del lujo."
  },
  {
    "id": "moria-casan",
    "name": "Moria Casán",
    "category": "farandula",
    "categoryLabel": "Farándula / La One",
    "tag": "Lengua Karateca",
    "image": "assets/celebrities/moria-casan.jpg",
    "quote": "Si querés llorar, llorá",
    "bio": "Prócer viviente del espectáculo, inventora de frases de culto."
  },
  {
    "id": "marcelo-tinelli",
    "name": "Marcelo Tinelli",
    "category": "farandula",
    "categoryLabel": "Farándula / Conductor",
    "tag": "El Tiragomas Histórico",
    "image": "assets/celebrities/marcelo-tinelli.jpg",
    "quote": "Buenas noches América",
    "bio": "Tatuado, pelo platinado y buscando recuperar el prime."
  },
  {
    "id": "tomas-holder",
    "name": "Tomás Holder",
    "category": "gh",
    "categoryLabel": "Prendido Fuego / Gym Bro",
    "tag": "Macho Alfa de Rosario",
    "image": "assets/logo-pf.jpg",
    "quote": "Mi mujer no es un hotel, es un hogar",
    "bio": "El primer expulsado más famoso de la historia, fan de la noche y el anabólico."
  },
  {
    "id": "diane-caracchi",
    "name": "Diane Caracchi",
    "category": "farandula",
    "categoryLabel": "Prendido Fuego / Conductora",
    "tag": "El Ancla Moral",
    "image": "assets/celebrities/diane-caracchi.jpg",
    "quote": "Sos un cinco códigos, Tomás",
    "bio": "Defensora de la monogamia, enemiga de los chamuyeros y reina del sentido común."
  },
  {
    "id": "luli-case",
    "name": "Luli Casé Rossi",
    "category": "farandula",
    "categoryLabel": "Prendido Fuego / Conductora",
    "tag": "La Migajera con Tarot",
    "image": "assets/celebrities/luli-case.jpg",
    "quote": "Esperé 2 años a un pibe y resultó ser un chanta",
    "bio": "Sincericidio puro, anécdotas tragicómicas y lecturas astrales picantes."
  },
  {
    "id": "alfa-gh",
    "name": "Walter 'Alfa' Santiago",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Polémico",
    "tag": "Bandana & Pepinos",
    "image": "assets/celebrities/alfa-gh.jpg",
    "quote": "Conozco a todo el mundo, nene",
    "bio": "Expatriado de Miami, polemista nato y enemigo jurado de la tibieza."
  },
  {
    "id": "furia-scaglione",
    "name": "Juliana 'Furia' Scaglione",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Huracán",
    "tag": "Calavera & Gritos de Guerra",
    "image": "assets/celebrities/furia-scaglione.jpg",
    "quote": "¡Cariños! ¡A la final no llegás!",
    "bio": "Fenómeno de masas, lealtad tribal y caos televisivo asegurado."
  },
  {
    "id": "coty-romero",
    "name": "Coty Romero",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Correntina",
    "tag": "La Espontánea Traicionera",
    "image": "assets/celebrities/coty-romero.jpg",
    "quote": "Que se vacha, que se vacha",
    "bio": "Estratega nata, belleza hegemónica y lengua venenosa."
  },
  {
    "id": "marcos-ginocchio",
    "name": "Marcos Ginocchio",
    "category": "gh",
    "categoryLabel": "Gran Hermano / El Primo",
    "tag": "Aura Zen & Silencio",
    "image": "assets/celebrities/marcos-ginocchio.jpg",
    "quote": "Tranqui primo, todo bien",
    "bio": "Ganador invicto, modelo internacional y cero quilombos."
  },
  {
    "id": "daniela-celis",
    "name": "Daniela 'Pestañela' Celis",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Mediática",
    "tag": "Pestañas XXL & Venganza",
    "image": "assets/celebrities/daniela-celis.jpg",
    "quote": "Entré para vengarme de Thiago",
    "bio": "Madre de gemelas, reina del drama y de las extensiones."
  },
  {
    "id": "lucila-la-tora",
    "name": "Lucila 'La Tora' Villar",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Streamer",
    "tag": "La Rubia de Berazategui",
    "image": "assets/logo-pf.jpg",
    "quote": "Te digo las cosas en la cara",
    "bio": "Conductora del streaming de GH, frontal y sin pelos en la lengua."
  },
  {
    "id": "conejo-quiroga",
    "name": "Alexis 'El Conejo' Quiroga",
    "category": "gh",
    "categoryLabel": "Gran Hermano / Cordobés",
    "tag": "Chamuyero Agropecuario",
    "image": "assets/logo-pf.jpg",
    "quote": "Te meto un chamuyo con acento y caés",
    "bio": "Actor, seductor serial y protagonista de romances cruzados."
  },
  {
    "id": "duki",
    "name": "Duki",
    "category": "musica",
    "categoryLabel": "Trap / Rockstar",
    "tag": "El Líder del Movimiento",
    "image": "assets/celebrities/duki.jpg",
    "quote": "Si te sentís solo, ponete mis temas",
    "bio": "Llenó Bernabéu y Vélez. Novio de Emilia y dueño de los estadios."
  },
  {
    "id": "emilia-mernes",
    "name": "Emilia Mernes",
    "category": "musica",
    "categoryLabel": "Música / Popstar",
    "tag": "Brillitos & Glam 2000s",
    "image": "assets/celebrities/emilia-mernes.jpg",
    "quote": "¿Vos me estás jodiendo?",
    "bio": "Megastar del pop argentino, 10 Movistar Arena agotados en horas."
  },
  {
    "id": "rusherking",
    "name": "Rusherking",
    "category": "musica",
    "categoryLabel": "Música / Romántico Urbano",
    "tag": "El Ex de la China & María",
    "image": "assets/celebrities/rusherking.jpg",
    "quote": "Me fui mundial con los bombones",
    "bio": "Santiagueño romántico, experto en salir con las más codiciadas."
  },
  {
    "id": "maria-becerra",
    "name": "María Becerra",
    "category": "musica",
    "categoryLabel": "Música / La Nena de Argentina",
    "tag": "De Quilmes al Mundo",
    "image": "assets/celebrities/maria-becerra.jpg",
    "quote": "La que no te pide permiso",
    "bio": "Llenó River dos veces solita. Humilde, talentosa y de barrio."
  },
  {
    "id": "l-gante",
    "name": "L-Gante",
    "category": "musica",
    "categoryLabel": "RKT / Cumbia 420",
    "tag": "El Embajador del RKT",
    "image": "assets/logo-pf.jpg",
    "quote": "Cumbia 420 pa' los negros",
    "bio": "El chongo oficial de Wanda en los medios, cadenas de oro y Ferrari."
  },
  {
    "id": "nicki-nicole",
    "name": "Nicki Nicole",
    "category": "musica",
    "categoryLabel": "Música / Trapstar Rosario",
    "tag": "La Rosarina del Flow",
    "image": "assets/celebrities/nicki-nicole.jpg",
    "quote": "De Rosario pal mundo entero",
    "bio": "Orgullo santafesino, soltó a Peso Pluma en un minuto por infiel."
  },
  {
    "id": "bizarrap",
    "name": "Bizarrap (BZRP)",
    "category": "musica",
    "categoryLabel": "Música / Productor",
    "tag": "Lentes, Gorra & Hits",
    "image": "assets/celebrities/bizarrap.jpg",
    "quote": "El pibe de Ramos que domina Spotify",
    "bio": "Factura millones sin mostrar la cara completa. El Midas del trap."
  },
  {
    "id": "rodrigo-de-paul",
    "name": "Rodrigo De Paul",
    "category": "futbol",
    "categoryLabel": "Fútbol / Campeón del Mundo",
    "tag": "Motorcito & Chongo con Tatuajes",
    "image": "assets/celebrities/rodrigo-de-paul.jpg",
    "quote": "Tatuado, canchero y con quilombos en Miami",
    "bio": "Guardaespaldas de Messi, ex de Tini y de Cami Homs."
  },
  {
    "id": "mauro-icardi",
    "name": "Mauro Icardi",
    "category": "futbol",
    "categoryLabel": "Fútbol / Delantero Galatasaray",
    "tag": "El Rey de la Icardeada",
    "image": "assets/celebrities/mauro-icardi.jpg",
    "quote": "Subo 40 historias de Wanda por día",
    "bio": "Goleador en Turquía, maestro del despecho y las indirectas en IG."
  },
  {
    "id": "franco-colapinto",
    "name": "Franco Colapinto",
    "category": "futbol",
    "categoryLabel": "Fórmula 1 / Piloto",
    "tag": "Aura 300 km/h & Chamuyo F1",
    "image": "assets/logo-pf.jpg",
    "quote": "¿Por qué no me seguís en Twitter?",
    "bio": "El soltero más codiciado del país, tira cambios a 350 km/h y chamuya en boxes."
  },
  {
    "id": "cami-mayan",
    "name": "Cami Mayan",
    "category": "farandula",
    "categoryLabel": "Influencer / Moda",
    "tag": "La Venganza en Modo Reina",
    "image": "assets/celebrities/cami-mayan.jpg",
    "quote": "Me robó el perro y la mejor amiga",
    "bio": "Ícono de las 'migajeras rehabilitadas', influencer top y facturando el despecho."
  },
  {
    "id": "alexis-mac-allister",
    "name": "Alexis Mac Allister",
    "category": "futbol",
    "categoryLabel": "Fútbol / Liverpool",
    "tag": "Colorado Traidor según Twitter",
    "image": "assets/logo-pf.jpg",
    "quote": "Campeón del Mundo y nuevo amor",
    "bio": "Crack en Anfield, pero cancelado en el grupo de amigas de Cami Mayan."
  },
  {
    "id": "enzo-fernandez",
    "name": "Enzo Fernández",
    "category": "futbol",
    "categoryLabel": "Fútbol / Chelsea",
    "tag": "El Golden Boy & Sex Symbol",
    "image": "assets/celebrities/enzo-fernandez.jpg",
    "quote": "120 palos de euros y facha intacta",
    "bio": "Crack de la Scaloneta, look platinado y codiciado en redes."
  },
  {
    "id": "dibu-martinez",
    "name": "Emiliano 'Dibu' Martínez",
    "category": "futbol",
    "categoryLabel": "Fútbol / Aston Villa",
    "tag": "El Terror Psicológico",
    "image": "assets/celebrities/dibu-martinez.jpg",
    "quote": "Mirá que te como, hermano",
    "bio": "El mejor arquero del planeta, baila en la cara de los rivales y tiene aura infinita."
  },
  {
    "id": "coscu",
    "name": "Martín 'Coscu' Pérez Disalvo",
    "category": "streamers",
    "categoryLabel": "Streamers / Pionero",
    "tag": "El Padrino del Stream",
    "image": "assets/celebrities/coscu.jpg",
    "quote": "Nasheee, de la cuna al cajón",
    "bio": "Fundador de la Coscu Army, reacciones en vivo y eterno debate en redes."
  },
  {
    "id": "luquita-rodriguez",
    "name": "Luquitas Rodríguez",
    "category": "streamers",
    "categoryLabel": "Streamers / Paren La Mano",
    "tag": "Teoría del Pelotazo & Humor",
    "image": "assets/logo-pf.jpg",
    "quote": "Todo es una construcción social",
    "bio": "Líder de Paren La Mano, organizador de Párense de Manos y referente del humor streaming."
  },
  {
    "id": "danelik-star",
    "name": "Danelik Star",
    "category": "streamers",
    "categoryLabel": "TikTok / Mediática",
    "tag": "La Enemiga de Holder",
    "image": "assets/logo-pf.jpg",
    "quote": "No me banco a los caretas del gym",
    "bio": "Tiktoker tucumana, protagonista del épico cruce con Holder por la foto en el boliche."
  },
  {
    "id": "momi-giardina",
    "name": "Momi Giardina",
    "category": "streamers",
    "categoryLabel": "Luzu TV / Nadie Dice Nada",
    "tag": "La Ex Bailarina Despeinada",
    "image": "assets/celebrities/momi-giardina.jpg",
    "quote": "Harta de los tipos de 40",
    "bio": "Comediante, estrella de Luzu y especialista en bardo espontáneo."
  },
  {
    "id": "nicolas-occhiato",
    "name": "Nico Occhiato",
    "category": "streamers",
    "categoryLabel": "Luzu TV / Productor",
    "tag": "El Zar del Streaming",
    "image": "assets/celebrities/nicolas-occhiato.jpg",
    "quote": "Facturando desde las 8 AM",
    "bio": "Novio de Flor Jazmín, creador del imperio Luzu y ex de Flor Vigna."
  },
  {
    "id": "javier-milei",
    "name": "Javier Milei",
    "category": "politica",
    "categoryLabel": "Política / Presidente",
    "tag": "El León Libertario",
    "image": "assets/celebrities/javier-milei.jpg",
    "quote": "¡Viva la libertad, carajo!",
    "bio": "Economista, presidente, amante de los perros y ex novio de Fátima Florez y Yuyito."
  },
  {
    "id": "mauricio-macri",
    "name": "Mauricio Macri",
    "category": "politica",
    "categoryLabel": "Política / Ex Presidente",
    "tag": "Ojos de Cielo & Reposera",
    "image": "assets/celebrities/mauricio-macri.jpg",
    "quote": "¿Se puede? Sí, se puede",
    "bio": "Ingeniero, ex presidente de Boca y fanático del bridge y las vacaciones en Cumelén."
  },
  {
    "id": "alberto-fernandez",
    "name": "Alberto Fernández",
    "category": "politica",
    "categoryLabel": "Política / Ex Presidente",
    "tag": "El Guitarrista de Olivos",
    "image": "assets/celebrities/alberto-fernandez.jpg",
    "quote": "No me acuerdo de ese video en el despacho",
    "bio": "El hombre de los videos filtrados en el sillón de Rivadavia."
  },
  {
    "id": "fatima-florez",
    "name": "Fátima Florez",
    "category": "farandula",
    "categoryLabel": "Farándula / Imitadora",
    "tag": "Mil Caras & Ex Primera Dama",
    "image": "assets/celebrities/fatima-florez.jpg",
    "quote": "Te imito a Moria, Cristina o quien quieras",
    "bio": "Showoman, ex novia presidencial y reina del teatro de Mar del Plata."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CELEBRITIES_DATA };
}
