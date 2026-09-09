// =========================================================
// BASE DE DATOS: MEMORIA DE LORES HISTÓRICOS & TIMELINE DE ESCÁNDALOS
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const LORE_MEMORY_DATABASE = {
  "version": "1.0",
  "last_updated": "2026-09-09 13:20",
  "celebrity_lores": {
    "flor-vigna": {
      "tag": "La Cantante Sin Filtro & Guerrera de Redes",
      "quote": "Ángel de Brito es un machista retrógrado que vive de hacerme bullying.",
      "lore": "En guerra total contra el conductor de LAM tras acusarlo de persecución sistemática y de montar campañas de odio en televisión. Se plantó desde el streaming defendiendo su carrera musical independiente.",
      "loreHistory": [
        {
          "date": "2026-09-09",
          "program": "09-09",
          "headline": "Guerra abierta contra Ángel de Brito",
          "detail": "Descargo demoledor acusando a Ángel de Brito de misoginia y violencia mediática sistemática.",
          "quote": "Ángel de Brito es un machista retrógrado que vive de hacerme bullying.",
          "link": "https://x.com/search?q=Flor%20Vigna%20Angel%20de%20Brito&f=live"
        }
      ]
    },
    "juli-rocyo": {
      "tag": "La Influencer de los Vínculos & El Contacto Cero",
      "quote": "El amor libre dura hasta que el otro se enamora en serio de la amante.",
      "lore": "Viral absoluta en TikTok tras exponer la implosión de su relación abierta y cómo el pacto de poliamor terminó en traición, lágrimas y contacto cero definitivo.",
      "loreHistory": [
        {
          "date": "2026-09-09",
          "program": "09-09",
          "headline": "Fin del poliamor y contacto cero",
          "detail": "Relató cómo una pareja abierta terminó en llanto y bloqueo total al romperse los acuerdos de lealtad.",
          "quote": "El amor libre dura hasta que el otro se enamora en serio de la amante.",
          "link": "https://x.com/search?q=Juli%20Rocyo%20pareja%20abierta&f=live"
        }
      ]
    },
    "la-joaqui": {
      "tag": "La Dueña de la Gira & Reina del RKT",
      "quote": "Váyanse de gira, que la gira no se levanta un día diciendo que está confundida.",
      "lore": "Protagonista del mayor escándalo del trap y cuarteto. Tras declarar en Luzu TV que nunca tuvo una pareja que no le fuera infiel, Luck Ra la acusó de estar en pareja con su ex gran amigo Tiago PZK. La Joaqui lo liquidó: 'Una sabe de quién se casa pero nunca de quién se divorcia', revelando que preservó cosas que lo hubieran dejado muy mal parado, mientras Yanina Latorre destapó que el cordobés metía minas a dormir en su casa en Brasil.",
      "loreHistory": [
        {
          "date": "2026-08-31",
          "program": "31-08",
          "headline": "Adelanto del hit del verano",
          "detail": "Presentó en TikTok los primeros compases de su nuevo tema festivo.",
          "quote": "Se viene el tema que sonará en todos lados el próximo verano.",
          "link": "https://x.com/search?q=La%20Joaqui%20tema%20del%20verano&f=live"
        },
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "Trend viral en TikTok",
          "detail": "El baile de su nueva canción explotó en redes sociales como himno juvenil.",
          "quote": "¿Del 1 al 10 cuánto suena este tema?",
          "link": "https://x.com/search?q=La%20Joaqui%20trend&f=live"
        },
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Bomba en Luzu, ruptura con Luck Ra y romance con Tiago PZK",
          "detail": "Declaró que nunca tuvo una pareja fiel. Luck Ra la acusó de traición con Tiago PZK y Joaqui le retrucó con su famosa frase de la gira y las infidelidades en Brasil.",
          "quote": "Una sabe de quién se casa pero nunca de quién se divorcia. Váyanse de gira.",
          "link": "https://x.com/mdzol/status/2096974575590388151"
        }
      ]
    },
    "luck-ra": {
      "tag": "El Cuartetero de los Cuernos",
      "quote": "De la muerte y de los cuernos nadie se salvó, yo pensé que sí pero mi día llegó.",
      "lore": "Tras la ruptura con La Joaqui, estalló en redes publicando un video cantando sobre los cuernos y acusando a su ex amigo Tiago PZK de una 'icardiada' imperdonable. Sin embargo, quedó en el ojo de la tormenta luego de que Yanina Latorre destapara su viaje a Brasil con amigos donde metía a una chica a dormir en la casa alquilada.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "Primeros rumores de crisis con La Joaqui",
          "detail": "Movimientos nocturnos en Costanera y distancia física tras meses de convivencia.",
          "quote": "Fueron los meses más intensos de mi vida.",
          "link": "https://x.com/search?q=Luck%20Ra%20Joaqui&f=live"
        },
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Video demoledor por los cuernos y acusación a Tiago PZK",
          "detail": "Subió un video cantando 'De la muerte y de los cuernos nadie se salvó'. Confirmó que su ex amigo Tiago está con Joaqui pero Yanina Latorre reveló su affaire en Brasil.",
          "quote": "De la muerte y de los cuernos nadie se salvó, mi día llegó.",
          "link": "https://x.com/mdzol/status/2096643946810077318"
        }
      ]
    },
    "tiago-pzk": {
      "tag": "El Gotti Sin Filtro & Amigo Buitre",
      "quote": "Te gustan villeros.",
      "lore": "En el epicentro del escándalo del año tras confirmarse su romance con La Joaqui, ex novia de su ex gran amigo Luck Ra. Tildado en redes de 'icardiada' y buitre de vestuario, respondió al aire con una indirecta demoledora: 'Te gustan villeros', defendiendo que su historia con ella es anterior y profunda.",
      "loreHistory": [
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "La Icardiada del Trap a Luck Ra",
          "detail": "Acusado por Luck Ra de romper los códigos de hermandad. Se viralizó el árbol genealógico del trap (ex de Taichu) y lanzó su indirecta al aire.",
          "quote": "Te gustan villeros.",
          "link": "https://x.com/mdzol/status/2096957540592496671"
        }
      ]
    },
    "tomas-holder": {
      "tag": "Macho Alfa Rosarino & El Conductor Intocable",
      "quote": "Casi nos mata este asesino en la calle; la noche porteña es puro careteo.",
      "lore": "Conductor estrella de Prendido Fuego. Sobrevivió a un grave accidente automovilístico en Buenos Aires donde un conductor imprudente casi lo mata. Viralizó su ranking de boliches porteños en MDZ Online y festejó en vivo el empate agónico de Newell's ante Rosario Central en Arroyito.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "Debate contra los pinchazos y la moral familiar",
          "detail": "Condenó la moda de anabólicos sin gimnasio y defendió la postura de Sasha Ferro sobre los límites de hermanos.",
          "quote": "El silencio es mi mejor amigo, pero a una hermana se la defiende siempre.",
          "link": "https://x.com/search?q=Tomas%20Holder%20Prendido%20Fuego&f=live"
        },
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Choque casi fatal, boliches de Bs As y Clásico Rosarino",
          "detail": "Contó en vivo su choque automovilístico ('Casi nos mata este asesino'), rankeó los mejores boliches de Capital y celebró el empate leproso en Arroyito.",
          "quote": "En Buenos Aires manejan como dementes; en Rosario la noche tiene más código.",
          "link": "https://x.com/mdzol/status/2096984336444870982"
        }
      ]
    },
    "lola-latorre": {
      "tag": "Sorbo by Lola & El Panóptico GPS",
      "quote": "Lo mío es inspiración, no copia... y el GPS a mi novio es por tranquilidad mental.",
      "lore": "Viral permanente en TikTok. Primero acusada de plagiar el packaging y estética de 'Rhode' de Hailey Bieber para su marca 'Sorbo', y luego encendió las redes al confesar que monitorea la ubicación satelital de su novio las 24 horas del día.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "El 'Sorbo Gate' vs. Hailey Bieber",
          "detail": "Acusada de plagiar el packaging de Rhode para su marca Sorbo. Salió a responder: 'Lo mío es inspiración, no copia'.",
          "quote": "Lo mío es inspiración, no copia.",
          "link": "https://x.com/search?q=Lola%20Latorre%20Sorbo&f=live"
        },
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Monitoreo GPS 24/7 a su pareja",
          "detail": "Confesó en un video que controla el GPS de su novio las 24 horas y abrió la polémica por la toxicidad en relaciones jóvenes.",
          "quote": "Es por tranquilidad mental de los dos.",
          "link": "https://x.com/search?q=Lola%20Latorre%20novio&f=live"
        },
        {
          "date": "2026-09-09",
          "program": "09-09",
          "headline": "Funa Nepobaby y debate de privilegios",
          "detail": "Debate ardiente sobre si los hijos de famosos triunfan por talento propio o por la billetera y contactos de sus padres.",
          "quote": "La plata te abre puertas, pero el carisma no se hereda.",
          "link": "https://x.com/search?q=Lola%20Latorre%20nepobaby&f=live"
        }
      ]
    },
    "victoria-granatto": {
      "tag": "La Leona en el Ojo de la Tormenta",
      "quote": "Todo bien con la selección de fútbol, pero como que todas querían que las salude Messi. Chicas, es Messi, no pasa nada... nuestra historia es mucho más grande.",
      "lore": "Delantera de Las Leonas que desató un escándalo nacional al ningunear en ESPN el saludo de Lionel Messi y Los Leones tras salir campeonas mundiales. Tuvo que poner su cuenta de Instagram en privado ante la catarata de repudio, mientras su hermana Majo Granatto publicó una historia despegándose públicamente.",
      "loreHistory": [
        {
          "date": "2026-09-09",
          "program": "09-09",
          "headline": "Ninguneo a Messi en ESPN y traición familiar",
          "detail": "Menospreció a Messi y a la Selección masculina de fútbol en vivo. Su hermana Majo salió a despegarse en historias para salvar su imagen.",
          "quote": "Chicas, es Messi, o sea, no pasa nada... nuestra historia es mucho más grande.",
          "link": "https://x.com/porqueTTarg/status/2097366313278521555"
        }
      ]
    },
    "sasha-ferro": {
      "tag": "La que Puso los Límites de Sangre",
      "quote": "Pensaban que no podían existir peores programas de stream... acá tienen a estos pelotudos.",
      "lore": "Protagonista del mayor escándalo del streaming. Tras sufrir un chiste machista denigrante en vivo en 'Solo por Hoy', le publicó una carta demoledora a su hermano Lionel por reírse en cámara siendo padre de una nena, cortando todo vínculo familiar.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "Ruptura pública con su hermano Lionel Ferro",
          "detail": "Carta abierta demoledora tras el chiste misógino de Salwe. Confirmó que no tienen relación y marcó límites éticos.",
          "quote": "¿Te gustaría que le hagan ese chiste a tu hija mientras su hermano se ríe al lado?",
          "link": "https://x.com/search?q=Sasha%20Ferro%20Lionel&f=live"
        }
      ]
    },
    "lionel-ferro": {
      "tag": "El Hermano en el Banquillo",
      "quote": "Yo no sabía que iban a hacer ese chiste, me agarró de sorpresa.",
      "lore": "En el centro de las críticas tras reírse en vivo de un chiste misógino hacia su hermana Sasha Ferro en el stream. Salió a emitir un descargo aclarando que habló tras el vivo, pero en redes lo condenaron unánimemente por falta de lealtad familiar.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "La risa de la cancelación",
          "detail": "Se rio del chiste de Salwe en Solo por Hoy y provocó la carta de repudio de su propia hermana.",
          "quote": "Estar distanciados no significa que festeje que alguien la lastime.",
          "link": "https://x.com/search?q=Lionel%20Ferro%20Sasha&f=live"
        }
      ]
    },
    "martin-salwe": {
      "tag": "El Provocador con Prontuario",
      "quote": "Le dicen 'Parrilla vieja' porque conoce todos los chorizos.",
      "lore": "Autor del chiste de mal gusto hacia Sasha Ferro que encendió la furia de las redes. Acusado por Facu Guarino y la comunidad de tener un prontuario de machismo, bullying y agresiones verbales en stream y televisión.",
      "loreHistory": [
        {
          "date": "2026-09-02",
          "program": "02-09",
          "headline": "Chiste misógino y repudio generalizado",
          "detail": "Dijo al aire la frase de 'parrilla vieja' sobre Sasha Ferro, generando la reacción furiosa de creadores de contenido.",
          "quote": "Le dicen parrilla vieja porque conoce todos los chorizos.",
          "link": "https://x.com/search?q=Martin%20Salwe%20Sasha&f=live"
        }
      ]
    },
    "thiago-medina": {
      "tag": "De GH a la Calle de Nuevo",
      "quote": "La situación de ser influencer está para atrás, hay que salir a laburar.",
      "lore": "Ex participante de Gran Hermano y padre de gemelas con Daniela Celis. Sorprendió al revelar que la burbuja publicitaria de las redes se pinchó y que volvió a trabajar en el comercio tradicional porque las marcas ya no pagan como antes.",
      "loreHistory": [
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "La crisis de los influencers",
          "detail": "Mostró su trabajo en la calle y expuso la caída de contratos publicitarios en el streaming y redes.",
          "quote": "La situación de ser influencer está para atrás.",
          "link": "https://x.com/search?q=Thiago%20Medina%20influencer&f=live"
        }
      ]
    },
    "mirtha-legrand": {
      "tag": "La Diva Inmortal",
      "quote": "Como te ven te tratan, y si te ven mal te maltratan.",
      "lore": "Internada preventivamente en el Sanatorio Mater Dei este 7 de septiembre por un cuadro de bronquitis. Su nieta Juana Viale tomó el mando de las mesazas con vestido rojo shocking mientras el país sigue su evolución médica.",
      "loreHistory": [
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Internación preventiva en el Mater Dei",
          "detail": "Cuadro bronquial tras un estado gripal. Reposo médico y conducción delegada en Juana Viale.",
          "quote": "Se encuentra de buen ánimo y estable.",
          "link": "https://x.com/search?q=Mirtha%20Legrand%20Mater%20Dei&f=live"
        }
      ]
    },
    "wanda-nara": {
      "tag": "Reina del Marketing & Chimento",
      "quote": "Por miedo a que se me filtren las fotos hot, borré todo.",
      "lore": "Inventora de la profesión botinera moderna y maestra del timing mediático. Tras su cruce con Maxi López en PH donde le preguntó a ChatGPT cuántas veces le fue infiel, confesó que eliminó todo su archivo íntimo con ex parejas por pánico a las filtraciones de hackers.",
      "loreHistory": [
        {
          "date": "2026-08-31",
          "program": "31-08",
          "headline": "Guerra con Maxi López en PH con ChatGPT",
          "detail": "Le preguntó a ChatGPT por las infidelidades de Maxi López en vivo tras las declaraciones de él en televisión.",
          "quote": "ChatGPT me dijo que fueron incontables.",
          "link": "https://x.com/search?q=Wanda%20Nara%20Maxi%20Lopez%20ChatGPT&f=live"
        },
        {
          "date": "2026-09-07",
          "program": "07-09",
          "headline": "Borrado masivo de fotos íntimas",
          "detail": "Confesó en streaming haber eliminado todas las imágenes hot que le enviaba a sus ex novios por miedo a hackeos.",
          "quote": "Por miedo a que se filtren borré todo de todos lados.",
          "link": "https://x.com/search?q=Wanda%20Nara%20fotos&f=live"
        }
      ]
    }
  },
  "scandal_timeline": [
    {
      "week": "Semana 31/08 - 04/09",
      "episodes": [
        "31-08",
        "02-09"
      ],
      "highlights": [
        "Adelanto del tema del verano de La Joaqui en TikTok.",
        "Guerra de Sasha Ferro contra su hermano Lionel Ferro, Martín Salwe y Lauty Gram por chiste machista en stream.",
        "El 'Sorbo Gate': Lola Latorre acusada de plagiar a Hailey Bieber.",
        "Wanda Nara y Maxi López cruce con ChatGPT en PH.",
        "Moda peligrosa de pinchazos estéticos para estar trabado sin gimnasio."
      ]
    },
    {
      "week": "Semana 07/09 - 11/09",
      "episodes": [
        "07-09",
        "09-09"
      ],
      "highlights": [
        "Choque vial casi fatal de Tomás Holder en Libertador ('Casi nos mata este asesino').",
        "Holder rankea sus boliches preferidos de Buenos Aires en MDZ.",
        "La Joaqui declara en Luzu que siempre le fueron infiel y desata la guerra total con Luck Ra.",
        "Luck Ra publica video cantando 'De la muerte y de los cuernos nadie se salvó' y expone traición de Tiago PZK.",
        "Tiago PZK tira indirecta: 'Te gustan villeros'.",
        "La Joaqui fulmina a Luck Ra: 'Una sabe de quién se casa pero nunca de quién se divorcia. Váyanse de gira'.",
        "Yanina Latorre revela que Luck Ra metía chicas a dormir en su casa alquilada en Brasil.",
        "Franco Colapinto termina 9° en Monza y rompe en llanto de bronca; Scaloni lo visita en boxes.",
        "Mirtha Legrand internada preventivamente en el Mater Dei por bronquitis; Juana Viale al frente.",
        "Thiago Medina revela que ser influencer ya no da plata y vuelve a laburar en la calle.",
        "La Tarifa de los 8 Millones: El debate de la billetera, el estatus y las citas porteñas.",
        "Flor Vigna le declara la guerra a Ángel de Brito: 'Es un machista retrógrado que me hace bullying'.",
        "Juli Rocyo y la implosión del poliamor: 'El amor libre dura hasta que se enamoran de la amante'.",
        "Lola Latorre en el centro del debate Nepobaby: El privilegio vs el carisma en streaming.",
        "Victoria Granatto ninguneó a Messi en ESPN y su hermana Majo se despegó en historias de Instagram.",
        "Día Internacional de la Belleza: El debate de los retoques estéticos y mandíbula con ácido a los 20 años vs fierros.",
        "Connie Ansaldi en Blender: Batalla de egos sobre la invención de la televisión moderna."
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.LORE_MEMORY_DATABASE = LORE_MEMORY_DATABASE;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LORE_MEMORY_DATABASE };
}
