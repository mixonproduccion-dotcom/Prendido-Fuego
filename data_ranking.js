// =========================================================
// BASE DE DATOS 5: RANKING DE CARETEADA & TRAICIONES (TOP 5)
// Dinámicas Interactivas de Votación y Debate en Vivo
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const RANKING_DATA = [
  {
    "id": "ranking-traicion-familiar-0209",
    "title": "1. El Ranking de Traición Familiar & de Sangre",
    "description": "Ordenalos del #1 (La traición más imperdonable hacia un familiar de sangre) al #5 (El que cometió un error pero zafa por rating o confusión).",
    "candidates": [
      {
        "id": "lionel-ferro",
        "name": "Lionel Ferro",
        "crime": "La Risa del Chiste a su Hermana",
        "lore": "Se rio en vivo en 'Solo por Hoy' mientras Salwe y Lauty Gram denigraban a Sasha Ferro con el chiste de 'parrilla vieja' sin frenarlo.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 3.5,
        "traicionScore": 9.9
      },
      {
        "id": "alejandro-stoessel",
        "name": "Alejandro Stoessel",
        "crime": "El Manejo de los US$ 70M de Tini",
        "lore": "Administró los contratos millonarios de Tini desde que era una niña y desató una auditoría legal impulsada por los abogados de Messi.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 5.0,
        "traicionScore": 9.7
      },
      {
        "id": "mauro-icardi",
        "name": "Mauro Icardi",
        "crime": "La Icardeada a Maxi López",
        "lore": "Vivía en la casa de Maxi López como un hermano de fútbol y se quedó con su esposa, hijas y representación comercial.",
        "image": "assets/celebrities/mauro-icardi.jpg",
        "auraScore": 6.5,
        "traicionScore": 9.8
      },
      {
        "id": "gisela-holder",
        "name": "Gisela Gordillo",
        "crime": "El Telo con el Compañero de Tomás",
        "lore": "Fue a un hotel alojamiento con Martín 'El Chino' Ku, compañero de Gran Hermano de su propio hijo Tomás Holder.",
        "image": "assets/celebrities/gisela-holder.jpg",
        "auraScore": 8.0,
        "traicionScore": 8.9
      },
      {
        "id": "lola-latorre",
        "name": "Lola Latorre",
        "crime": "El 'Sorbo Gate' a Hailey Bieber",
        "lore": "Copió al 100% la línea de labiales de Hailey Bieber y salió en TikTok a defenderse diciendo 'es inspiración, no copia'.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 7.5,
        "traicionScore": 7.2
      }
    ]
  },
  {
    "id": "ranking-caretas-stream-0209",
    "title": "2. El Caretómetro del Streaming & Chistes Pesados",
    "description": "Ordenalos del #1 (El conductor más careta y cancelable) al #5 (El que mantiene la altura y los códigos).",
    "candidates": [
      {
        "id": "martin-salwe",
        "name": "Martín Salwe",
        "crime": "Provocación Machista en Stream",
        "lore": "Tiró el chiste de 'parrilla vieja' al aire amparándose en la impunidad del streaming.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 3.8,
        "traicionScore": 9.8
      },
      {
        "id": "lauty-gram",
        "name": "Lauty Gram",
        "crime": "Festejar el Bardo Ajeno",
        "lore": "Se sumó a la humorada denigrante y luego se desentendió en redes.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 5.9,
        "traicionScore": 8.5
      },
      {
        "id": "luchi-patrone",
        "name": "Luchi Patrone",
        "crime": "Silencio Cómodo en Vivo",
        "lore": "No intervino siendo la única mujer en la mesa y salió a justificarse horas después.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 5.5,
        "traicionScore": 7.8
      },
      {
        "id": "tomas-mazza",
        "name": "Tomás Mazza",
        "crime": "Promoción Involuntaria de Químicos",
        "lore": "Confesó su adicción a anabólicos pero sigue marcando agenda de pinchazos a pibes jóvenes.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 6.8,
        "traicionScore": 6.0
      },
      {
        "id": "facu-guarino",
        "name": "Facu Guarino ('Guari')",
        "crime": "Factos y Defensa Leal",
        "lore": "El único que salió en redes a defender a Sasha y destrozar a Salwe con nombre y apellido.",
        "image": "assets/logo-pf.jpg",
        "auraScore": 9.5,
        "traicionScore": 1.2
      }
    ]
  },
  {
    "id": "ranking-traicion-farandula",
    "title": "3. El Ranking de Traición en la Farándula",
    "description": "Ordenalos del #1 (La traición más fría y descarada) al #5 (El traidor que al menos tuvo códigos o facturó con estilo).",
    "candidates": [
      {
        "id": "mauro-icardi",
        "name": "Mauro Icardi",
        "crime": "Traición a Maxi López",
        "lore": "Vivía en la casa de Maxi López, le cuidaba los autos, compartía vacaciones y se quedó con la esposa y la representación económica.",
        "image": "assets/celebrities/mauro-icardi.jpg",
        "auraScore": 6.5,
        "traicionScore": 9.9
      },
      {
        "id": "china-suarez",
        "name": "La China Suárez",
        "crime": "El Motorhome & El Wandagate",
        "lore": "Manta de Nepal y palta en el motorhome con Vicuña mientras Pampita lloraba afuera; luego el encuentro en el hotel de París con Icardi.",
        "image": "assets/celebrities/china-suarez.jpg",
        "auraScore": 9.5,
        "traicionScore": 9.6
      },
      {
        "id": "alexis-macallister",
        "name": "Alexis Mac Allister",
        "crime": "La Traición Navideña",
        "lore": "Salió Campeón del Mundo en Qatar con Cami Mayan en la tribuna y a los 5 días en Navidad la dejó por su mejor amiga Ailén Cova.",
        "image": "assets/celebrities/alexis-macallister.jpg",
        "auraScore": 8,
        "traicionScore": 9.8
      },
      {
        "id": "marianela-mirra",
        "name": "Marianela Mirra",
        "crime": "La Espontánea a Diego Leonardi",
        "lore": "Se refugió bajo el ala protectora de Diego en GH 2007, fingió debilidad y en la semifinal le clavó la espontánea que lo sacó de la casa.",
        "image": "assets/celebrities/marianela-mirra.jpg",
        "auraScore": 9.5,
        "traicionScore": 9.2
      },
      {
        "id": "wanda-nara",
        "name": "Wanda Nara",
        "crime": "El Recambio Icardi por L-Gante",
        "lore": "Tras 10 años de defender a Icardi en Europa, se vino a Buenos Aires, se encerró en General Rodríguez con L-Gante y le cortó las tarjetas.",
        "image": "assets/celebrities/wanda-nara.jpg",
        "auraScore": 9.8,
        "traicionScore": 8.5
      }
    ]
  },
  {
    "id": "ranking-caretas-stream",
    "title": "2. El Caretómetro del Streaming & Redes",
    "description": "Ordenalos del #1 (El más careta, falso y estratega ante cámara) al #5 (El que mantiene la autenticidad y los códigos de barrio).",
    "candidates": [
      {
        "id": "nicolas-occhiato",
        "name": "Nico Occhiato",
        "crime": "Empresario 24/7 & Cero Riesgo",
        "lore": "Sabe exactamente qué reírse y qué callar para no perder sponsors millonarios ni pauta corporativa.",
        "image": "assets/celebrities/nicolas-occhiato.jpg",
        "auraScore": 8.9,
        "traicionScore": 8.8
      },
      {
        "id": "coscu",
        "name": "Coscu",
        "crime": "Sensibilidad Selectiva",
        "lore": "Reacciona sin filtro a los demás pero si alguien le hace una crítica se ofende y arma hilos de 40 tuits de descargo.",
        "image": "assets/celebrities/coscu.jpg",
        "auraScore": 9,
        "traicionScore": 7.9
      },
      {
        "id": "migue-granados",
        "name": "Migue Granados",
        "crime": "El Niño Mimado del Humor",
        "lore": "Reclama libertad total para hacer chistes ácidos pero no tolera que los medios o críticos cuestionen su estilo.",
        "image": "assets/celebrities/migue-granados.jpg",
        "auraScore": 9.7,
        "traicionScore": 5.5
      },
      {
        "id": "momi-giardina",
        "name": "Momi Giardina",
        "crime": "Bardo Espontáneo",
        "lore": "Cero filtro real. Si tiene que contar una vergüenza sexual o escatológica al aire la cuenta sin pudor ni filtro.",
        "image": "assets/celebrities/momi-giardina.jpg",
        "auraScore": 9.5,
        "traicionScore": 2.1
      },
      {
        "id": "luquitas-rodriguez",
        "name": "Luquitas Rodríguez",
        "crime": "Aura Barrial Blindada",
        "lore": "Mantiene el mismo humor, códigos de amistad y grupo de amigos desde la adolescencia sin careteadas.",
        "image": "assets/celebrities/luquitas-rodriguez.jpg",
        "auraScore": 9.9,
        "traicionScore": 1
      }
    ]
  },
  {
    "id": "ranking-traidores-gh",
    "title": "3. Los Mayores Traidores de Gran Hermano",
    "description": "Ordenalos del #1 (La puñalada más histórica del reality) al #5 (El traidor que fue descubierto al minuto).",
    "candidates": [
      {
        "id": "coty-romero",
        "name": "Coty Romero",
        "crime": "La Espontánea a Julieta y Daniela",
        "lore": "Abrazó a las chicas en la habitación, les juró lealtad de género y a los 5 minutos fue al confesionario a meterles la espontánea.",
        "image": "assets/celebrities/coty-romero.jpg",
        "auraScore": 9.2,
        "traicionScore": 9.7
      },
      {
        "id": "cristian-u",
        "name": "Cristian U",
        "crime": "La Traición a Todo el Grupo",
        "lore": "Usó a todos sus aliados como escudos humanos y cuando no le sirvieron más los mandó a placa de nominación sin pestañear.",
        "image": "assets/celebrities/cristian-u.jpg",
        "auraScore": 9.8,
        "traicionScore": 9
      },
      {
        "id": "furia-scaglione",
        "name": "Furia Scaglione",
        "crime": "La Destrucción de Mauro y Cata",
        "lore": "Pasó del amor apasionado y la alianza tribal a gritarles en la cara y militar su eliminación sin piedad.",
        "image": "assets/celebrities/furia-scaglione.jpg",
        "auraScore": 9.9,
        "traicionScore": 8.9
      },
      {
        "id": "sabrina-cortez",
        "name": "Sabrina Cortez",
        "crime": "La Traición de los 8 Años",
        "lore": "Entró presumiendo 8 años de noviazgo intachable y en dos semanas estaba con Alan bajo las sábanas en horario central.",
        "image": "assets/celebrities/sabrina-cortez.jpg",
        "auraScore": 7.3,
        "traicionScore": 9.1
      },
      {
        "id": "thiago-medina",
        "name": "Thiago Medina",
        "crime": "La Traición que Creó a Vengañela",
        "lore": "Nominó a Daniela Celis pensando que no saldría, provocando su expulsión y el nacimiento de 'Vengañela'.",
        "image": "assets/celebrities/thiago-medina.jpg",
        "auraScore": 9.4,
        "traicionScore": 6.8
      }
    ]
  },
  {
    "id": "ranking-traicion-futbol",
    "title": "4. Traiciones en el Fútbol & Botineras",
    "description": "Ordenalos del #1 (La falta de códigos más imperdonable) al #5 (La traición que se disimuló con copas).",
    "candidates": [
      {
        "id": "mauro-zarate",
        "name": "Mauro Zárate",
        "crime": "El Juramento Roto a Vélez",
        "lore": "Juró ante las cámaras que en Argentina solo jugaba en Vélez y firmó con Boca diciendo 'pasó el equipo grande'.",
        "image": "assets/celebrities/mauro-zarate.jpg",
        "auraScore": 7.5,
        "traicionScore": 9.9
      },
      {
        "id": "enzo-fernandez",
        "name": "Enzo Fernández",
        "crime": "El Pedido de Soltería a Valentina",
        "lore": "Tras ser Campeón del Mundo y millonario en Londres, le pidió a la madre de sus dos hijos separarse para vivir la soltería.",
        "image": "assets/celebrities/enzo-fernandez.jpg",
        "auraScore": 8.4,
        "traicionScore": 9.4
      },
      {
        "id": "rodrigo-de-paul",
        "name": "Rodrigo De Paul",
        "crime": "El Final Desprolijo con Cami Homs",
        "lore": "Separación confusa mientras nacía su segundo hijo y posterior blanqueo de romance con Tini Stoessel en Ibiza.",
        "image": "assets/celebrities/rodrigo-de-paul.jpg",
        "auraScore": 9.2,
        "traicionScore": 8.8
      },
      {
        "id": "chiqui-tapia",
        "name": "Chiqui Tapia",
        "crime": "El Descarte Táctico de Dirigentes",
        "lore": "Teje alianzas políticas, promete cargos y cuando no hacen falta más los deja afuera del comité ejecutivo sin aviso.",
        "image": "assets/celebrities/chiqui-tapia.jpg",
        "auraScore": 8.8,
        "traicionScore": 8.2
      },
      {
        "id": "pocho-lavezzi",
        "name": "Pocho Lavezzi",
        "crime": "El Galán Clandestino de Ibiza",
        "lore": "Famoso por sus fiestas secretas en yates y escapadas nocturnas que terminaron en tapas de revistas del corazón.",
        "image": "assets/celebrities/pocho-lavezzi.jpg",
        "auraScore": 9.1,
        "traicionScore": 7
      }
    ]
  },
  {
    "id": "ranking-politicos-panqueques",
    "title": "5. Los Políticos Más Panqueques del País",
    "description": "Ordenalos del #1 (El giro de 180° más violento) al #5 (El que acomodó el discurso con elegancia).",
    "candidates": [
      {
        "id": "alberto-fernandez",
        "name": "Alberto Fernández",
        "crime": "De Crítico Feroz a Presidente de Cristina",
        "lore": "Criticó durante 10 años al kirchnerismo en programas de TV y aceptó la candidatura presidencial por una llamada.",
        "image": "assets/celebrities/alberto-fernandez.jpg",
        "auraScore": 2,
        "traicionScore": 10
      },
      {
        "id": "patricia-bullrich",
        "name": "Patricia Bullrich",
        "crime": "El Recorrido Ideológico Total",
        "lore": "Juventud en la JP montonera, ministra de De la Rúa, ministra de Macri y ministra de Seguridad de Milei tras acusarlo de poner bombas.",
        "image": "assets/celebrities/patricia-bullrich.jpg",
        "auraScore": 8.9,
        "traicionScore": 9.5
      },
      {
        "id": "martin-lousteau",
        "name": "Martín Lousteau",
        "crime": "De Ministro K a Senador Opositor",
        "lore": "Autor de la resolución 125 con Cristina, embajador de Macri en Washington y presidente de la UCR votando dividido.",
        "image": "assets/celebrities/martin-lousteau.jpg",
        "auraScore": 7,
        "traicionScore": 9.1
      },
      {
        "id": "roberto-garcia-moritan",
        "name": "Roberto García Moritán",
        "crime": "El Discurso de la Nueva Política",
        "lore": "Se presentó como el marido ejemplar y el empresario impoluto, terminando en allanamientos y renuncia forzada.",
        "image": "assets/celebrities/roberto-garcia-moritan.jpg",
        "auraScore": 5.5,
        "traicionScore": 9.3
      },
      {
        "id": "mauricio-macri",
        "name": "Mauricio Macri",
        "crime": "La Alianza por Conveniencia",
        "lore": "Pasó de calificar a los libertarios como inexpertos a fiscalizarles la elección y disputarles el gabinete.",
        "image": "assets/celebrities/mauricio-macri.jpg",
        "auraScore": 8.2,
        "traicionScore": 8
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.RANKING_DATA = RANKING_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RANKING_DATA };
}
