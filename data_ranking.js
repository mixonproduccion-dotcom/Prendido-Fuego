// =========================================================
// BASE DE DATOS 5: SETS PARA "EL RANKING DE TRAICIÓN & CARETAS"
// Aura vs. Nivel de Traición / Caretómetro
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const RANKING_DATA = [
  {
    id: "ranking-traicion-farandula",
    title: "1. El Ranking de Traición en la Farándula",
    description: "Ordenalos del #1 (La traición más fría y descarada) al #5 (El traidor que al menos tuvo códigos o facturó con estilo).",
    candidates: [
      {
        id: "mauro-icardi",
        name: "Mauro Icardi",
        crime: "Traición a Maxi López",
        lore: "Vivía en la casa de Maxi López, le cuidaba los autos, compartía vacaciones y se quedó con la esposa y la representación económica.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        auraScore: 6.5,
        traicionScore: 9.9
      },
      {
        id: "china-suarez",
        name: "La China Suárez",
        crime: "El Motorhome & El Wandagate",
        lore: "Manta de Nepal y palta en el motorhome con Vicuña mientras Pampita lloraba afuera; luego el encuentro en el hotel de París con Icardi.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.5,
        traicionScore: 9.6
      },
      {
        id: "alexis-macallister",
        name: "Alexis Mac Allister",
        crime: "La Traición Navideña",
        lore: "Salió Campeón del Mundo en Qatar con Cami Mayan en la tribuna y a los 5 días en Navidad la dejó por su mejor amiga Ailén Cova.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.0,
        traicionScore: 9.8
      },
      {
        id: "marianela-mirra",
        name: "Marianela Mirra",
        crime: "La Espontánea a Diego Leonardi",
        lore: "Se refugió bajo el ala protectora de Diego en GH 2007, fingió debilidad y en la semifinal le clavó la espontánea que lo sacó de la casa.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.5,
        traicionScore: 9.2
      },
      {
        id: "wanda-nara",
        name: "Wanda Nara",
        crime: "El Recambio Icardi por L-Gante",
        lore: "Tras 10 años de defender a Icardi en Europa, se vino a Buenos Aires, se encerró en General Rodríguez con L-Gante y le cortó las tarjetas.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.8,
        traicionScore: 8.5
      }
    ]
  },
  {
    id: "ranking-caretas-stream",
    title: "2. El Caretómetro del Streaming & Redes",
    description: "Ordenalos del #1 (El más careta, falso y estratega ante cámara) al #5 (El que mantiene la autenticidad y los códigos de barrio).",
    candidates: [
      {
        id: "nicolas-occhiato",
        name: "Nico Occhiato",
        crime: "Empresario 24/7 & Cero Riesgo",
        lore: "Sabe exactamente qué reírse y qué callar para no perder sponsors millonarios ni pauta corporativa.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.9,
        traicionScore: 8.8
      },
      {
        id: "coscu",
        name: "Coscu",
        crime: "Sensibilidad Selectiva",
        lore: "Reacciona sin filtro a los demás pero si alguien le hace una crítica se ofende y arma hilos de 40 tuits de descargo.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.0,
        traicionScore: 7.9
      },
      {
        id: "migue-granados",
        name: "Migue Granados",
        crime: "El Niño Mimado del Humor",
        lore: "Reclama libertad total para hacer chistes ácidos pero no tolera que los medios o críticos cuestionen su estilo.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.7,
        traicionScore: 5.5
      },
      {
        id: "momi-giardina",
        name: "Momi Giardina",
        crime: "Bardo Espontáneo",
        lore: "Cero filtro real. Si tiene que contar una vergüenza sexual o escatológica al aire la cuenta sin pudor ni filtro.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.5,
        traicionScore: 2.1
      },
      {
        id: "luquitas-rodriguez",
        name: "Luquitas Rodríguez",
        crime: "Aura Barrial Blindada",
        lore: "Mantiene el mismo humor, códigos de amistad y grupo de amigos desde la adolescencia sin careteadas.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.9,
        traicionScore: 1.0
      }
    ]
  },
  {
    id: "ranking-traidores-gh",
    title: "3. Los Mayores Traidores de Gran Hermano",
    description: "Ordenalos del #1 (La puñalada más histórica del reality) al #5 (El traidor que fue descubierto al minuto).",
    candidates: [
      {
        id: "coty-romero",
        name: "Coty Romero",
        crime: "La Espontánea a Julieta y Daniela",
        lore: "Abrazó a las chicas en la habitación, les juró lealtad de género y a los 5 minutos fue al confesionario a meterles la espontánea.",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.2,
        traicionScore: 9.7
      },
      {
        id: "cristian-u",
        name: "Cristian U",
        crime: "La Traición a Todo el Grupo",
        lore: "Usó a todos sus aliados como escudos humanos y cuando no le sirvieron más los mandó a placa de nominación sin pestañear.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.8,
        traicionScore: 9.0
      },
      {
        id: "furia-scaglione",
        name: "Furia Scaglione",
        crime: "La Destrucción de Mauro y Cata",
        lore: "Pasó del amor apasionado y la alianza tribal a gritarles en la cara y militar su eliminación sin piedad.",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.9,
        traicionScore: 8.9
      },
      {
        id: "sabrina-cortez",
        name: "Sabrina Cortez",
        crime: "La Traición de los 8 Años",
        lore: "Entró presumiendo 8 años de noviazgo intachable y en dos semanas estaba con Alan bajo las sábanas en horario central.",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80",
        auraScore: 7.3,
        traicionScore: 9.1
      },
      {
        id: "thiago-medina",
        name: "Thiago Medina",
        crime: "La Traición que Creó a Vengañela",
        lore: "Nominó a Daniela Celis pensando que no saldría, provocando su expulsión y el nacimiento de 'Vengañela'.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.4,
        traicionScore: 6.8
      }
    ]
  },
  {
    id: "ranking-traicion-futbol",
    title: "4. Traiciones en el Fútbol & Botineras",
    description: "Ordenalos del #1 (La falta de códigos más imperdonable) al #5 (La traición que se disimuló con copas).",
    candidates: [
      {
        id: "mauro-zarate",
        name: "Mauro Zárate",
        crime: "El Juramento Roto a Vélez",
        lore: "Juró ante las cámaras que en Argentina solo jugaba en Vélez y firmó con Boca diciendo 'pasó el equipo grande'.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        auraScore: 7.5,
        traicionScore: 9.9
      },
      {
        id: "enzo-fernandez",
        name: "Enzo Fernández",
        crime: "El Pedido de Soltería a Valentina",
        lore: "Tras ser Campeón del Mundo y millonario en Londres, le pidió a la madre de sus dos hijos separarse para vivir la soltería.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.4,
        traicionScore: 9.4
      },
      {
        id: "rodrigo-de-paul",
        name: "Rodrigo De Paul",
        crime: "El Final Desprolijo con Cami Homs",
        lore: "Separación confusa mientras nacía su segundo hijo y posterior blanqueo de romance con Tini Stoessel en Ibiza.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.2,
        traicionScore: 8.8
      },
      {
        id: "chiqui-tapia",
        name: "Chiqui Tapia",
        crime: "El Descarte Táctico de Dirigentes",
        lore: "Teje alianzas políticas, promete cargos y cuando no hacen falta más los deja afuera del comité ejecutivo sin aviso.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.8,
        traicionScore: 8.2
      },
      {
        id: "pocho-lavezzi",
        name: "Pocho Lavezzi",
        crime: "El Galán Clandestino de Ibiza",
        lore: "Famoso por sus fiestas secretas en yates y escapadas nocturnas que terminaron en tapas de revistas del corazón.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        auraScore: 9.1,
        traicionScore: 7.0
      }
    ]
  },
  {
    id: "ranking-politicos-panqueques",
    title: "5. Los Políticos Más Panqueques del País",
    description: "Ordenalos del #1 (El giro de 180° más violento) al #5 (El que acomodó el discurso con elegancia).",
    candidates: [
      {
        id: "alberto-fernandez",
        name: "Alberto Fernández",
        crime: "De Crítico Feroz a Presidente de Cristina",
        lore: "Criticó durante 10 años al kirchnerismo en programas de TV y aceptó la candidatura presidencial por una llamada.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        auraScore: 2.0,
        traicionScore: 10.0
      },
      {
        id: "patricia-bullrich",
        name: "Patricia Bullrich",
        crime: "El Recorrido Ideológico Total",
        lore: "Juventud en la JP montonera, ministra de De la Rúa, ministra de Macri y ministra de Seguridad de Milei tras acusarlo de poner bombas.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.9,
        traicionScore: 9.5
      },
      {
        id: "martin-lousteau",
        name: "Martín Lousteau",
        crime: "De Ministro K a Senador Opositor",
        lore: "Autor de la resolución 125 con Cristina, embajador de Macri en Washington y presidente de la UCR votando dividido.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        auraScore: 7.0,
        traicionScore: 9.1
      },
      {
        id: "roberto-garcia-moritan",
        name: "Roberto García Moritán",
        crime: "El Discurso de la Nueva Política",
        lore: "Se presentó como el marido ejemplar y el empresario impoluto, terminando en allanamientos y renuncia forzada.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
        auraScore: 5.5,
        traicionScore: 9.3
      },
      {
        id: "mauricio-macri",
        name: "Mauricio Macri",
        crime: "La Alianza por Conveniencia",
        lore: "Pasó de calificar a los libertarios como inexpertos a fiscalizarles la elección y disputarles el gabinete.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
        auraScore: 8.2,
        traicionScore: 8.0
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { RANKING_DATA };
}
