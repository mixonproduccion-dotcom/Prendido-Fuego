// =========================================================
// BASE DE DATOS 2: EL TRIBUNAL DE FARÁNDULA & DILEMAS MORALES
// "¿Qué harías vos en su lugar?" - 14 Casos de Alta Tensión (Lores Argentinos)
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const TRIBUNAL_CASES = [
  {
    id: "caso-chino-holder-gisela",
    title: "El Telo de Rosario: El Chino Ku, Gisela Gordillo y Marisol",
    protagonist: "Marisol (o el Amigo del Reality)",
    category: "Gran Hermano / Traición Familiar",
    context: "Tu novio 'tranquilo y virgo' de la tele sale de Gran Hermano y a los meses lo descubren saliendo de un hotel alojamiento en Rosario con la mamá de su compañero de reality (Gisela Gordillo). Ella muestra los chats en vivo donde él decía estar soltero.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    quote: "El pibe virgo de la televisión era un personaje para la cámara.",
    options: [
      {
        id: "A",
        title: "1. Descarte Inmediato y Show en Vivo en el Streaming (Factos)",
        text: "Le hacés las valijas, lo dejás en la calle, te sentás en LAM a contar cómo te mintió durante 2 años y no le das ni 10 segundos de derecho a réplica. La careteada se paga con la verdad.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Charla a Solas, Cierre Legal y Cero Circo (Dignidad)",
        text: "Cortás la relación en privado con total frialdad, no te prestás al conventillo mediático de la televisión y te enfocás en tus proyectos con la dignidad intacta.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Perdonarlo por Culpa de la Fama y Buscar Ayuda Espiritual (Migajera)",
        text: "Pensás 'pobrecito, la fama le quemó la cabeza', le perdonás la salida del telo, le pedís a tu tarotista que limpie la energía del departamento y seguís conviviendo como si nada.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-enzo-valentina-solteria",
    title: "La 'Soltería Saltada' en Londres: Enzo Fernández vs. Valentina",
    protagonist: "Valentina Cervantes",
    category: "Fútbol / Parejas",
    context: "Acompañaste a tu novio desde que no tenía para el colectivo hasta ser Campeón del Mundo en Qatar. Tienen dos bebés en Londres. De repente te dice: 'Quiero separarme porque me salteé la etapa de soltero a los 19 y quiero vivirla ahora'.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
    quote: "Lo banqué en las malas y cuando llegó a la gloria me pidió soltería.",
    options: [
      {
        id: "A",
        title: "1. Mudanza a Buenos Aires, Agencia Top y Facturar Millones (Factos)",
        text: "Agarrás a tus dos hijos, te instalás en Buenos Aires, firmás contrato con las mejores marcas y canales de TV y demostrás que tu aura brilla el triple sin depender de un futbolista.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Acuerdo Económico Impecable y Respeto por los Hijos (Dignidad)",
        text: "Firmás un convenio de alimentos en dólares ejemplar con abogados, mantenés una relación cordial como padres por los chicos y no soltás una sola palabra de rencor en la prensa.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Esperarlo en Silencio a que se Canse de la Noche de Londres (Migajera)",
        text: "Le decís que lo entendés, te quedás viviendo cerca esperando que en 6 meses se arrepienta de salir con los amigos del Chelsea y vuelva llorando a pedirte casamiento.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-joaqui-luckra-casa",
    title: "El Amor Cuartetero: La Joaqui, Luck Ra y la Casa al Lado",
    protagonist: "La Joaqui",
    category: "Música Urbana / Convivencia",
    context: "Estás enamoradísima, comprás una casa al lado de tu novio para armar una familia ensamblada con tus dos hijas. El pibe se asusta por el compromiso, te corta de un día para el otro y al mes vuelve a hablar con su ex que era tu amiga.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    quote: "Me la jugué entera por amor y me quedé con la casa vacía.",
    options: [
      {
        id: "A",
        title: "1. Vender la Casa, Alquilar un Penthouse y Sacar Temas de RKT (Factos)",
        text: "Vendés la casa al toque para no verle la cara nunca más, te mudás a Puerto Madero y sacás tres temas de RKT destrozándolo a él y a su ex en el estribillo.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Poner el Foco en tus Hijas y Marcar Distancia de Acero (Dignidad)",
        text: "Te quedás en tu casa tranquila, priorizás la felicidad de tus nenas, cortás todo vínculo comercial con el ambiente del cuarteto y dejás que el tiempo ponga a cada uno en su lugar.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Mandarle Mensajes de Madrugada y Tirar las Cartas (Migajera)",
        text: "Le mandás audios llorando a las 4 AM recordándole los momentos lindos, le stalkeás los seguidores a la ex cada media hora y le prendés velas rojas para que vuelva.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-spreen-riestra-minuto",
    title: "El Minuto de Fama: El Debut de Spreen en Primera División",
    protagonist: "El Streamer Famoso",
    category: "Streaming / Fútbol",
    context: "Sos el streamer número 1 del país. Un club de Primera y una marca de energizantes te ofrecen ponerte la camiseta titular contra el puntero del torneo, jugar 59 segundos sin tocar la pelota y salir reemplazado por marketing viral.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80",
    quote: "Le di al club la mayor visibilidad de su historia en 59 segundos.",
    options: [
      {
        id: "A",
        title: "1. Aceptar, Facturar la Pauta y Reírte de los Críticos (Factos)",
        text: "Aceptás de una, te ponés la 47, batís récord de viewers en Kick/YouTube y que los periodistas tradicionales de la tele se queden rabiando mientras vos contás los dólares.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Rechazar por Respeto al Potrero y a los Pibes de Inferiores (Dignidad)",
        text: "Rechazás la propuesta diciendo que el fútbol profesional se respeta y que no te vas a prestar a una payasada de apuestas que le saca el lugar a un pibe que entrenó 10 años.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Jugar el Minuto pero Salir Llorando a Pedir Disculpas Públicas (Inseguridad)",
        text: "Jugás los 59 segundos tentado por la plata, pero apenas termina el partido hacés un vivo de 3 horas llorando y donando la camiseta para que la gente de Twitter no te cancele.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-siciliani-florvigna-castro",
    title: "El 'Siciliani Gate': Mensajes en la Madrugada y la Ex Esposa",
    protagonist: "Flor Vigna",
    category: "Farándula / Infidelidad",
    context: "Descubrís que una actriz consagrada le manda mensajes de madrugada a tu novio con el que convivís hace 2 años. Cuando se separan, ellos blanquean al mes y la ex esposa de él sale en TV diciendo que la actriz hacía lo mismo cuando ella estaba embarazada.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    quote: "Le mandaba mensajes a Luciano mientras convivía conmigo.",
    options: [
      {
        id: "A",
        title: "1. Sacar Canciones de Despecho y Nombrarla en Todos los Móviles (Factos)",
        text: "Le ponés nombre y apellido a la situación, sacás un videoclip con una modelo parecida a ella y aprovechás el bardo mediático para llenar teatros con tu música.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Cortar Todo Vínculo con Elegancia y Cero Declaraciones (Dignidad)",
        text: "Entendés que el problema real no es la tercera persona sino tu ex pareja que no te respetó. Te alejás en silencio y no volvés a pronunciar sus nombres nunca más.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Armar Alianzas con las Otras Ex Parejas para Vengarse (Emocional)",
        text: "Te juntás a merendar con Sabrina Rojas todas las semanas para desahogarte, analizar las fotos de Instagram de ellos dos y mandarle indirectas por TikTok.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-wanda-icardi-lgante",
    title: "El Triángulo Tóxico: Wanda, Icardi y L-Gante en Río de Janeiro",
    protagonist: "Wanda Nara",
    category: "Farándula / Botineras",
    context: "Tu marido multimillonario en Turquía se rompe los ligamentos, pero vos te vas a Río de Janeiro con L-Gante a los besos en la playa. Cuando volvés, él te traba el departamento del Chateau Libertador y llega la policía.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    quote: "Las mujeres ya no lloran, las mujeres facturan y disfrutan en Brasil.",
    options: [
      {
        id: "A",
        title: "1. Denuncia Penal, Desalojo y Mostrar los Chats en LAM (Factos)",
        text: "Le metés una denuncia por violencia de género, le exigís la cuota alimentaria en euros y te mostrás en vivo comiendo asado en General Rodríguez con L-Gante para liquidarlo.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. División de Bienes 50/50 y Fin del Circo por los Hijos (Dignidad)",
        text: "Cortás de raíz el show mediático, firmás la división de bienes con abogados y priorizás la estabilidad emocional de tus hijas en lugar de llamar a los cronistas de TV.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Vivos de TikTok a las 3 AM con L-Gante y Tamara Báez (Show)",
        text: "Prendés vivo en TikTok con L-Gante, invitás a Tamara Báez a cantar RKT y convertís el divorcio en el reality show más bizarro y visto de Latinoamérica.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-tini-stoessel-papa",
    title: "El Desahogo de 'Ángel': Tini Stoessel y la Presión Familiar",
    protagonist: "Tini Stoessel",
    category: "Farándula / Música Pop",
    context: "Trabajás desde los 10 años sin parar. Tu papá/manager se peleó con Tinelli y la industria te hizo cargar con ese odio toda tu adolescencia. A los 26 años colapsás con ataques de pánico y depresión. ¿Cómo sanás?",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    quote: "Me cargué mochilas y juicios que no eran míos.",
    options: [
      {
        id: "A",
        title: "1. Descarte Comercial y Emancipación Tajante (Factos)",
        text: "Le quitás el manejo de tus contratos a tu papá, contratás a un manager de Los Ángeles, cobrás el 100% de tus regalías y cortás todo lazo comercial para que la familia sea solo familia.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Charla Terapéutica Familiar y Retiro Temporal (Dignidad)",
        text: "Ponés un freno a las giras mundiales por 1 año, te sentás a hablar con tus padres sin cámaras, hacés terapia profunda y ponés límites saludables antes de volver a subirte a un escenario.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Disco Catártico, Cambio de Look y Catarsis Pública (Emocional)",
        text: "Te cortás y te teñís el pelo, sacás un álbum desgarrador contando todo con nombres propios, le prendés velas a tu papá en la clínica y hacés shows íntimos llorando junto a tu fandom.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-cami-mayan-macallister",
    title: "La Traición Navideña: Cami Mayan vs. Alexis & Ailén Cova",
    protagonist: "Cami Mayan",
    category: "Fútbol / Traición",
    context: "Salís 5 años con un pibe, se consagran Campeones del Mundo en Qatar, y a los 5 días en Navidad te deja por tu mejor amiga de la infancia, te echa del departamento de Inglaterra y se queda con el perro.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
    quote: "Me robó el perro y la dignidad, pero gané el aura.",
    options: [
      {
        id: "A",
        title: "1. Venganza de Ego y Pareja de Mayor Rango (Factos)",
        text: "No vas a la justicia: te vas a Ibiza, te ponés de novia con un crack rival de la Premier League (ej: Haaland o Enzo) y le festejás un gol en la cara en el clásico inglés.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Demanda Judicial Millonaria y Trabajo en Streaming (Dignidad)",
        text: "Demanda de compensación económica millonaria por los 5 años convividos, exigís la tenencia del perro en primera clase y te sentás en el streaming a liquidarlos con elegancia y alta costura.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Audios Llorando y Congelamiento en el Freezer (Migajera)",
        text: "Le mandás audios de 15 minutos a Ailén Cova pidiéndole explicaciones, le hacés un congelamiento con ruda en el freezer y te quedás esperando 1 año en silencio a que él te mande un WhatsApp.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-pampita-moritan",
    title: "La Sonrisa Impecable: Pampita vs. Moritán y el Divorcio Express",
    protagonist: "Pampita Ardohain",
    category: "Farándula / Política",
    context: "Tu marido ministro empieza a salir en los noticieros por allanamientos, denuncias de contrataciones y rumores de infidelidad con fotos comprometedoras en el ascensor.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    quote: "Yo trabajo desde los 16 años y a mí nadie me va a ensuciar.",
    options: [
      {
        id: "A",
        title: "1. Recambio Inmediato con Polista Millonario (Factos)",
        text: "Ni bien firma la renuncia, te vas al Teatro Colón de la mano con un polista millonario de 1,90 m con campo en Inglaterra, subiendo fotos a 4K en Instagram para liquidar su ego.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Operativo Borrado 24 Horas y Capturas Públicas (Dignidad)",
        text: "El mismo viernes contratás un camión de mudanza a las 11 AM para que lo filme todo el país, publicás las capturas de WhatsApp con fecha y hora y el lunes salís al jurado de gala cobrando el triple.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Aguante Familiar en el Country y Bajo Perfil (Tradicional)",
        text: "Ponés la cara en una conferencia de prensa al lado de él, decís que 'la familia está unida frente a las operaciones' y te vas a esperar que pase la tormenta en una estancia en La Pampa.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-wandagate-efimero",
    title: "El Mensaje Efímero en Instagram a las 3 AM",
    protagonist: "Novia del Influencer",
    category: "Redes / Infidelidad",
    context: "Ves que a tu pareja le llega una notificación de una modelo famosa en modo efímero: 'Qué lindo estabas ayer... lástima que estabas tan acompañado ;) Mandame a Telegram'. Él te jura que no le contestó.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    quote: "El que busca encuentra, pero el que deja la puerta abierta es culpable.",
    options: [
      {
        id: "A",
        title: "1. Valija por el Balcón y Corte Tajante (Factos)",
        text: "Si la mina le escribió al privado es porque en el evento él le tiró miradas. Le bajás la persiana en el acto, le tirás la valija a la vereda y te vas al gimnasio a entrenar. El respeto no se negocia.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Bloqueo Delante Tuyo y Advertencia Final (Dignidad)",
        text: "Lo sentás en la mesa con frialdad. Exigís que la bloquee en vivo de todas las redes delante tuyo y le advertís que a la próxima ambigüedad se termina el noviazgo para siempre.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Stalkeo con 3 Cuentas Falsas y Cartas Natales (Migajera)",
        text: "Lo perdonás porque 'no le contestó', pero te creás tres cuentas truchas en Instagram, le controlás los seguidores cada 10 minutos y le pedís a tu tarotista que revise si tienen un lazo kármico.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-amigo-icardi-primera",
    title: "La Novia Famosa de tu Mejor Amigo en el VIP",
    protagonist: "El Amigo Leal",
    category: "Amistad & Códigos",
    context: "Tu mejor amigo de la infancia se pone de novio con una botinera top. Se va de pretemporada y en el boliche la mina te agarra en el VIP y te dice al oído: 'Él es re básico... vení a mi departamento hoy'.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    quote: "Los códigos entre amigos no se negocian por ninguna mina.",
    options: [
      {
        id: "A",
        title: "1. Empujón, Audio al Amigo y Cancelación del Grupo (Factos)",
        text: "La sacás de encima en 2 segundos, le mandás un audio a tu amigo en el momento: 'Hermano, la mina que tenés al lado es un peligro, te acaba de encarar en Tequila'. Códigos de sangre primero.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Distancia Inmediata y Charla a Solas en un Café (Dignidad)",
        text: "Te vas del boliche para no prestarte al circo, la bloqueás de WhatsApp y al día siguiente citás a tu amigo a tomar un café para contarle con respeto y madurez exactamente lo que pasó.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Silencio por Pánico e Indirectas en TikTok (Inseguridad)",
        text: "No le decís nada por miedo a que tu amigo piense que fuiste vos el que provocó la situación. Te tomás tres tragos para olvidar y le tirás indirectas por TikTok para que él se dé cuenta solo.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-after-mansión-sanisidro",
    title: "El After Clandestino en la Mansión de San Isidro",
    protagonist: "La Novia Engañada",
    category: "Noche & Parejas",
    context: "Tu novio te manda un WhatsApp a las 4 AM diciendo 'estoy cansadísimo, me voy a dormir'. A las 8 AM ves historias públicas de una influencer con tu novio en cuero tomando fernet en una pileta con 20 personas.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    quote: "El problema no es la fiesta, el problema es la mentira cobarde.",
    options: [
      {
        id: "A",
        title: "1. Cambio de Cerradura y Cosas en Bolsas de Basura (Factos)",
        text: "La mentira mata el respeto. Le cambiás la cerradura del departamento, le dejás la ropa en bolsas de basura en la guardia del edificio y no le atendés más el teléfono en tu vida.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Fin de la Convivencia con Frialdad y Calma (Dignidad)",
        text: "Cuando vuelva le decís con frialdad: 'Si querías salir me lo decías de frente; la mentira cobarde no la tolero. Juntá tus cosas y andate, con alguien en quien no confío no tengo futuro'.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Cocinarle Milanesas para el Bajón del Escabio (Migajera)",
        text: "Pensás 'seguro los amigos lo obligaron a subirse al auto'. Le mandás 30 mensajes con signos de pregunta y cuando llega le cocinás milanesas para que no le pegue tan mal la resaca.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-close-friends-ex",
    title: "La Ex Novia en 'Mejores Amigos' de Instagram",
    protagonist: "La Pareja Formal",
    category: "Redes & Red Flags",
    context: "Descubrís que tu novio tiene una lista de Close Friends de 5 personas donde está su ex de toda la vida. Ahí sube fotos en cuero entrenando y frases melancólicas de trap que no sube a su historia pública.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    quote: "Guardarse a la ex en un círculo íntimo es buscar validación del pasado.",
    options: [
      {
        id: "A",
        title: "1. Descarte Inmediato: 'A Mí Me Eligen Entero' (Factos)",
        text: "Eso es de pibe inseguro que vive del pasado. Le decís 'sos un payaso sin códigos', agarrás tus cosas y te vas. A vos te eligen con exclusividad absoluta o no te eligen.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Ultimátum Monogámico Sin Vueltas (Dignidad)",
        text: "Es una red flag inaceptable. 'O cerrás definitivamente todo histeriqueo con tu pasado o acá se termina la pareja'. Sin histeria pero con límites de acero.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Competencia en Lencería a las 3 AM (Migajera)",
        text: "Te comparás con la ex todas las noches, subís fotos en lencería a mejores amigos esperando que él te mande un fuego y asumís que si no lo hace es culpa de tu signo solar.",
        style: "luli"
      }
    ]
  },
  {
    id: "caso-alias-mercadopago-telo",
    title: "El Alias de Mercado Pago en la Puerta del Telo",
    protagonist: "La Chica de la Cita",
    category: "Noche & Primera Cita",
    context: "Primera cita increíble, van a un hotel alojamiento de lujo, la pasan genial. A las 8 AM esperando el Uber, el tipo te muestra el alias de Mercado Pago: 'La habitación salió $65.000 y los forros $8.000... transferime $36.500'.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
    quote: "Pedirte la mitad de los forros por Mercado Pago es la muerte del levante.",
    options: [
      {
        id: "A",
        title: "1. Transferir los $36.500 y Bloqueo Eterno (Factos)",
        text: "Eso es de rata de alcantarilla sin hombría. Si invitás a una mujer a salir, el hombre se hace cargo de la cuenta completa con orgullo. Le transferís para que no llore y lo bloqueás para siempre.",
        style: "holder"
      },
      {
        id: "B",
        title: "2. Pagar Tu Parte y Cero Segunda Cita (Dignidad)",
        text: "Compartir gastos se habla con naturalidad antes, pero pedir la mitad de los preservativos en la vereda demuestra una falta de clase total. Pagás tu parte y no lo ves nunca más.",
        style: "diane"
      },
      {
        id: "C",
        title: "3. Transferir con Propina y Esperar Mensaje (Migajera)",
        text: "Le transferís el 60% por las dudas y le dejás propina en el alias, le agradecés por la noche hermosa y te quedás esperando que te invite a una segunda cita a ver si te cobra el estacionamiento.",
        style: "luli"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRIBUNAL_CASES };
}
