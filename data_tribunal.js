// =========================================================
// BASE DE DATOS 2: EL TRIBUNAL DE FARÁNDULA & DILEMAS MORALES
// "¿Qué harías vos en su lugar?" - 15 Casos de Alta Tensión
// Prendido Fuego 🔥 (Mix On Studio)
// =========================================================

const TRIBUNAL_CASES = [
  {
    "id": "caso-wanda-maxi-chatgpt",
    "title": "El Escándalo de Rusia & ChatGPT: Wanda Nara vs. Maxi López",
    "protagonist": "Wanda Nara ('Solange')",
    "category": "Farándula / Infidelidad & IA",
    "context": "Tu ex marido va a la tele (PH) a contar anécdotas de que lo cacheteaban en sótanos de Rusia para tener sexo cuando estaba casado con vos. Le preguntás a ChatGPT cuántas veces te engañó y te lista 7 infidelidades históricas con lujo de detalles.",
    "image": "assets/celebrities/wanda-nara.jpg",
    "quote": "Mujeres salgan a trabajar, no dependan. Ser mantenida a veces sale muy caro. Solange.",
    "options": [
      {
        "id": "A",
        "title": "1. Exponer las 7 Infidelidades con Abogados y Facturar en LAM (Factos)",
        "text": "Publicás las capturas de ChatGPT en Instagram, le recordás que gracias a vos come y aconsejás a todas las mujeres a ser independientes económicamente para no dejarse pisotear.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Silencio por Respeto a los 3 Hijos y Charla en Privado (Dignidad)",
        "text": "No le contestás en redes para no alimentar el conventillo televisivo por respeto a tus 3 hijos adolescentes y le mandás un mensaje frío y privado advirtiéndole que no hable más de vos.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Mandar Indirectas Firmando 'Solange' y Tirar las Cartas (Migajera)",
        "text": "Subís historias a las 3 AM firmando con tu segundo nombre, le preguntás a la astróloga si Maxi sigue enamorado de vos y esperás a que te mande un WhatsApp pidiendo perdón.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-tinigate-70m-antonela",
    "title": "El #TiniGate ($70M USD): Tini Stoessel, su Padre y Antonela Roccuzzo",
    "protagonist": "Tini Stoessel",
    "category": "Música / Fortuna Familiar",
    "context": "Trabajás desde los 10 años sin parar. Descubrís inconsistencias millonarias en el manejo de tus empresas a cargo de tu padre. Antonela Roccuzzo y Messi te contactan con su equipo legal para recuperar más de 70 millones de dólares y tus padres analizan contrademandarte.",
    "image": "assets/celebrities/tini-stoessel.jpg",
    "quote": "La plata que gané trabajando desde niña me pertenece a mí.",
    "options": [
      {
        "id": "A",
        "title": "1. Auditoría Implacable con el Equipo de Messi y Cobrar Todo (Factos)",
        "text": "Le quitás el 100% del poder a tu familia, auditás hasta el último dólar con los mejores abogados de Europa y ponés a tu nombre todas las marcas y regalías de por vida.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Pacto de Cierre Familiar sin Juicio Público (Dignidad)",
        "text": "Le dejás lo que se llevaron como indemnización por los años de trabajo, cortás todo vínculo comercial y salvás el lazo afectivo con tus padres para vivir en paz.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Perdonar por Culpa Kármica y Llorar en el Piano (Emocional)",
        "text": "Sentís culpa por demandar a tu papá, le perdonás los 70 millones, hacés catarsis con Antonela y le componés un tema acústico llorando en el piano.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-jefe-sigma-harinas",
    "title": "El Jefe Sigma: Prohibido Azúcar y Harinas en el Trabajo",
    "protagonist": "El Empleado de Oficina",
    "category": "Vida Cotidiana / Trabajo",
    "context": "Tu jefe fit de 24 años prohíbe terminantemente que los empleados coman medialunas, azúcar o galletitas en la oficina de 9 a 18 hs porque 'baja la productividad y da picos de insulina'. Si te ven con un alfajor te descuentan el presentismo.",
    "image": "assets/celebrities/tomas-holder.jpg",
    "quote": "En esta empresa se rinde al 100% y el azúcar es veneno.",
    "options": [
      {
        "id": "A",
        "title": "1. Bancar al Jefe, Sumar Proteína y Agradecer la Disciplina (Factos)",
        "text": "Le das la razón al jefe: el hombre de éxito no come harinas refinadas. Te llevás tu tupper con bife y arroz al escritorio y te convertís en el empleado del mes.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Denuncia Laboral Inmediata por Abuso Patronal (Dignidad)",
        "text": "Le marcás los límites: el contrato laboral no incluye el control de la alimentación personal. Exigís respeto a tus derechos y que no se meta con tu comida.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Comer Bizcochitos Escondido en el Baño (Inseguridad)",
        "text": "Te comés dos medialunas a las escondidas en el baño con culpa, te lavás los dientes con pánico a que te huelan el azúcar y le pedís perdón al jefe si te descubre.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-chino-holder-gisela",
    "title": "El Telo de Rosario: El Chino Ku, Gisela Gordillo y Marisol",
    "protagonist": "Marisol (o el Amigo del Reality)",
    "category": "Gran Hermano / Traición Familiar",
    "context": "Tu novio 'tranquilo y virgo' de la tele sale de Gran Hermano y a los meses lo descubren saliendo de un hotel alojamiento en Rosario con la mamá de su compañero de reality (Gisela Gordillo). Ella muestra los chats en vivo donde él decía estar soltero.",
    "image": "assets/celebrities/gisela-holder.jpg",
    "quote": "El pibe virgo de la televisión era un personaje para la cámara.",
    "options": [
      {
        "id": "A",
        "title": "1. Descarte Inmediato y Show en Vivo en el Streaming (Factos)",
        "text": "Le hacés las valijas, lo dejás en la calle, te sentás en LAM a contar cómo te mintió durante 2 años y no le das ni 10 segundos de derecho a réplica. La careteada se paga con la verdad.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Charla a Solas, Cierre Legal y Cero Circo (Dignidad)",
        "text": "Cortás la relación en privado con total frialdad, no te prestás al conventillo mediático de la televisión y te enfocás en tus proyectos con la dignidad intacta.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Perdonarlo por Culpa de la Fama y Buscar Ayuda Espiritual (Migajera)",
        "text": "Pensás 'pobrecito, la fama le quemó la cabeza', le perdonás la salida del telo, le pedís a tu tarotista que limpie la energía del departamento y seguís conviviendo como si nada.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-enzo-valentina-solteria",
    "title": "La 'Soltería Saltada' en Londres: Enzo Fernández vs. Valentina",
    "protagonist": "Valentina Cervantes",
    "category": "Fútbol / Parejas",
    "context": "Acompañaste a tu novio desde que no tenía para el colectivo hasta ser Campeón del Mundo en Qatar. Tienen dos bebés en Londres. De repente te dice: 'Quiero separarme porque me salteé la etapa de soltero a los 19 y quiero vivirla ahora'.",
    "image": "assets/celebrities/valentina-cervantes.jpg",
    "quote": "Lo banqué en las malas y cuando llegó a la gloria me pidió soltería.",
    "options": [
      {
        "id": "A",
        "title": "1. Mudanza a Buenos Aires, Agencia Top y Facturar Millones (Factos)",
        "text": "Agarrás a tus dos hijos, te instalás en Buenos Aires, firmás contrato con las mejores marcas y canales de TV y demostrás que tu aura brilla el triple sin depender de un futbolista.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Acuerdo Económico Impecable y Respeto por los Hijos (Dignidad)",
        "text": "Firmás un convenio de alimentos en dólares ejemplar con abogados, mantenés una relación cordial como padres por los chicos y no soltás una sola palabra de rencor en la prensa.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Esperarlo en Silencio a que se Canse de la Noche de Londres (Migajera)",
        "text": "Le decís que lo entendés, te quedás viviendo cerca esperando que en 6 meses se arrepienta de salir con los amigos del Chelsea y vuelva llorando a pedirte casamiento.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-joaqui-luckra-casa",
    "title": "El Amor Cuartetero: La Joaqui, Luck Ra y la Casa al Lado",
    "protagonist": "La Joaqui",
    "category": "Música Urbana / Convivencia",
    "context": "Estás enamoradísima, comprás una casa al lado de tu novio para armar una familia ensamblada con tus dos hijas. El pibe se asusta por el compromiso, te corta de un día para el otro y al mes vuelve a hablar con su ex que era tu amiga.",
    "image": "assets/celebrities/la-joaqui.jpg",
    "quote": "De tín marín de do pingüé, si no te valora ese gil quién se cree.",
    "options": [
      {
        "id": "A",
        "title": "1. Vender la Casa, Alquilar un Penthouse y Sacar Temas de RKT (Factos)",
        "text": "Vendés la casa al toque para no verle la cara nunca más, te mudás a Puerto Madero y sacás tres temas de RKT destrozándolo a él y a su ex en el estribillo.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Poner el Foco en tus Hijas y Marcar Distancia de Acero (Dignidad)",
        "text": "Te quedás en tu casa tranquila, priorizás la felicidad de tus nenas, cortás todo vínculo comercial con el ambiente del cuarteto y dejás que el tiempo ponga a cada uno en su lugar.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Mandarle Mensajes de Madrugada y Tirar las Cartas (Migajera)",
        "text": "Le mandás audios llorando a las 4 AM recordándole los momentos lindos, le stalkeás los seguidores a la ex cada media hora y le prendés velas rojas para que vuelva.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-spreen-riestra-minuto",
    "title": "El Minuto de Fama: El Debut de Spreen en Primera División",
    "protagonist": "El Streamer Famoso",
    "category": "Streaming / Fútbol",
    "context": "Sos el streamer número 1 del país. Un club de Primera y una marca de energizantes te ofrecen ponerte la camiseta titular contra el puntero del torneo, jugar 59 segundos sin tocar la pelota y salir reemplazado por marketing viral.",
    "image": "assets/celebrities/spreen.jpg",
    "quote": "Le di al club la mayor visibilidad de su historia en 59 segundos.",
    "options": [
      {
        "id": "A",
        "title": "1. Aceptar, Facturar la Pauta y Reírte de los Críticos (Factos)",
        "text": "Aceptás de una, te ponés la 47, batís récord de viewers en Kick/YouTube y que los periodistas tradicionales de la tele se queden rabiando mientras vos contás los dólares.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Rechazar por Respeto al Potrero y a los Pibes de Inferiores (Dignidad)",
        "text": "Rechazás la propuesta diciendo que el fútbol profesional se respeta y que no te vas a prestar a una payasada de apuestas que le saca el lugar a un pibe que entrenó 10 años.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Jugar el Minuto pero Salir Llorando a Pedir Disculpas Públicas (Inseguridad)",
        "text": "Jugás los 59 segundos tentado por la plata, pero apenas termina el partido hacés un vivo de 3 horas llorando y donando la camiseta para que la gente de Twitter no te cancele.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-siciliani-florvigna-castro",
    "title": "El 'Siciliani Gate': Mensajes en la Madrugada y la Ex Esposa",
    "protagonist": "Flor Vigna",
    "category": "Farándula / Infidelidad",
    "context": "Descubrís que una actriz consagrada le manda mensajes de madrugada a tu novio con el que convivís hace 2 años. Cuando se separan, ellos blanquean al mes y la ex esposa de él sale en TV diciendo que la actriz hacía lo mismo cuando ella estaba embarazada.",
    "image": "assets/celebrities/florvigna.jpg",
    "quote": "Le mandaba mensajes a Luciano mientras convivía conmigo.",
    "options": [
      {
        "id": "A",
        "title": "1. Sacar Canciones de Despecho y Nombrarla en Todos los Móviles (Factos)",
        "text": "Le ponés nombre y apellido a la situación, sacás un videoclip con una modelo parecida a ella y aprovechás el bardo mediático para llenar teatros con tu música.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Cortar Todo Vínculo con Elegancia y Cero Declaraciones (Dignidad)",
        "text": "Entendés que el problema real no es la tercera persona sino tu ex pareja que no te respetó. Te alejás en silencio y no volvés a pronunciar sus nombres nunca más.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Armar Alianzas con las Otras Ex Parejas para Vengarse (Emocional)",
        "text": "Te juntás a merendar con Sabrina Rojas todas las semanas para desahogarte, analizar las fotos de Instagram de ellos dos y mandarle indirectas por TikTok.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-wanda-lgante-icardi",
    "title": "La Escapada a Río: Wanda, L-Gante y el Chateau Libertador",
    "protagonist": "Wanda Nara",
    "category": "Farándula / Botineras & Cumbia",
    "context": "Te vas de escapada romántica a Brasil a los besos con un cantante de cumbia 13 años menor mientras tu ex marido se rompe los ligamentos en Turquía. Al volver a Buenos Aires, tu ex te bloquea la entrada a tu departamento con la policía.",
    "image": "assets/celebrities/wanda-nara.jpg",
    "quote": "Yo vivo mi vida libre y no le debo nada a ningún hombre.",
    "options": [
      {
        "id": "A",
        "title": "1. Administrar la Billetera y Vivir la Noche (Factos)",
        "text": "Hacés la tuya, te quedás con las propiedades de mayor valor, disfrutás de la noche porteña y que la justicia le embargue las cuentas bancarias a tu ex por despechado.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Corte Frontal y División de Bienes Ejemplar (Dignidad)",
        "text": "Firmás el divorcio definitivo en Europa con abogados de primera línea, terminás el circo mediático y no exponés más a tus hijos a escándalos policiales.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Mudanza a General Rodríguez y Hacerse la Humilde (Migajera)",
        "text": "Te vas a vivir al barrio con tu nuevo chongo, comés asado en la vereda para limpiar tu imagen en redes y le llorás al tarot por las energías negativas de Estambul.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-duki-emilia-chats",
    "title": "Los Chats de DMs: Duki, Emilia Mernes y la Fan de las Redes",
    "protagonist": "Emilia Mernes",
    "category": "Música Urbana / Traición en Redes",
    "context": "Una fanatica viraliza grabaciones de pantalla de supuestos mensajes directos de Instagram con tu novio estrella de trap, donde él le tira onda y le pide fotos. La chica sale en streams jurando que los chats son 100% reales.",
    "image": "assets/celebrities/emilia-mernes.jpg",
    "quote": "Construimos un imperio juntos y no lo voy a tirar por un rumor de Twitter.",
    "options": [
      {
        "id": "A",
        "title": "1. Blindaje Total, Paseo en Miami y Facturar en Dólares (Factos)",
        "text": "Salen agarrados de la mano a caminar por Miami frente a los paparazzi, hacen como si nada hubiera pasado y llenan cuatro estadios más para demostrar quién manda.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Auditoría Privada de Dispositivos y Ultimátum de Respeto (Dignidad)",
        "text": "Tenés una charla a puertas cerradas con pruebas sobre la mesa: un solo desliz más en redes y el noviazgo se termina sin vuelta atrás.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Bloqueo Masivo de Palabras en Redes y Negación Total (Migajera)",
        "text": "Bloqueás la palabra 'Lula' y 'DMs' de todos tus comentarios de TikTok, te convencés de que fue todo inteligencia artificial y le pedís a tus fans que ataquen a la chica.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-coty-nacho-tora",
    "title": "El Romance de Pasillo: Coty Romero, Nacho Castañares y La Tora",
    "protagonist": "Coty Romero",
    "category": "Streaming / Códigos de Amigas",
    "context": "Entrás a trabajar al streaming oficial del canal y te enamorás del ex novio de tu compañera de mesa (La Tora). La química es innegable y empezás a salir con él a escondidas hasta que la prensa los descubre a los besos.",
    "image": "assets/celebrities/coty-romero.jpg",
    "quote": "Fui egoísta pero el corazón no elige de quién enamorarse.",
    "options": [
      {
        "id": "A",
        "title": "1. Blanquear en LAM con Orgullo y Disfrutar el Amor (Factos)",
        "text": "Vas a LAM, admitís que fuiste egoísta pero que estás feliz, te chupan un huevo los códigos de oficina y subís fotos chapando en el feed.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Renunciar al Stream para Cuidar el Clima Laboral (Dignidad)",
        "text": "Pedís el cambio de programa o te abrís tu propio canal para no hacerle pasar un momento incómodo a tu ex compañera todos los días al aire.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Fingir Amistad en Cámara y Llorar en el Camarín (Inseguridad)",
        "text": "Tratás a La Tora con cariño exagerado al aire para no quedar como la mala de la película y te vas a llorar al baño del canal sintiéndote culpable.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-nicki-pesopluma-trueno",
    "title": "La Traición en Las Vegas: Nicki Nicole, Peso Pluma y Trueno",
    "protagonist": "Nicki Nicole",
    "category": "Música / Despecho & Honor",
    "context": "Tu novio mexicano es grabado caminando de la mano con otra mujer en un casino de Las Vegas durante el Super Bowl. El video explota en TikTok mientras vos estabas de gira en Costa Rica.",
    "image": "assets/celebrities/nicki-nicole.jpg",
    "quote": "Lo que se ama se respeta; cuando no hay respeto yo de ahí me voy.",
    "options": [
      {
        "id": "A",
        "title": "1. Comunicado Fulminante, 'Ojos Verdes' y Regreso Triunfal (Factos)",
        "text": "Publicás una historia demoledora cortando la relación en el acto, lanzás un hit de despecho al mes y volvés a colaborar con los pibes de La Boca.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Silencio de Radio y Enfoque en la Música Internacional (Dignidad)",
        "text": "Borrás las fotos de Instagram sin decir una sola palabra, no le das entidad al tipo en ninguna entrevista y te dedicás a romperla en España y Estados Unidos.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Volver Corriendo con tu Ex Novio de la Infancia (Migajera)",
        "text": "Le mandás mensajes a Trueno a las 3 AM diciendo que te diste cuenta de que siempre fue el amor de tu vida y le tirás indirectas por Twitter.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-occhiato-natijota-olga",
    "title": "La Guerra del Streaming: Nico Occhiato, Nati Jota y Olga",
    "protagonist": "El Conductor / Productor",
    "category": "Streaming / Competencia & Egos",
    "context": "Tu co-conductora estrella y figura fundacional de tu canal de streaming decide renunciar porque no le diste el aumento que pedía. A los meses debuta en el canal de la competencia (Olga) liderando la misma franja horaria y te empieza a ganar en las métricas.",
    "image": "assets/celebrities/nicolas-occhiato.jpg",
    "quote": "El streaming es una jungla y acá nadie es imprescindible.",
    "options": [
      {
        "id": "A",
        "title": "1. Blanquear Romance con tu Co-Conductora y Llenar River (Factos)",
        "text": "Metés el romance del año con Flor Jazmín en Pinamar, armás eventos gigantes en el Movistar Arena y demostrás quién es el verdadero dueño del streaming en Argentina.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Mejorar la Propuesta Técnica y Respetar a la Competencia (Dignidad)",
        "text": "Felicitás el crecimiento del medio colega, invertís en nuevos talentos y formatos y mantenés una competencia sana sin chicanas al aire.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Obsesión Diaria con el Minuto a Minuto y Rencor Silencioso (Inseguridad)",
        "text": "Tenés tres pantallas abiertas en el control mirando los viewers de Olga todo el programa, te amargás cuando van arriba y mandás indirectas ácidas.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-camila-homs-demil",
    "title": "La 'Sombra de Tini': Camila Homs, Rodrigo De Paul y el Chateau",
    "protagonist": "Camila Homs",
    "category": "Farándula / Botineras",
    "context": "El padre de tus dos hijos te deja en Madrid tras 12 años juntos y a los pocos meses se muestra públicamente con la estrella pop del país. Te ofrecen 100.000 dólares para salir en el Bailando y contar tu verdad.",
    "image": "assets/celebrities/cami-homs.jpg",
    "quote": "Me banqué todo en silencio mientras el país opinaba de mi vida.",
    "options": [
      {
        "id": "A",
        "title": "1. Agarrar la Guita del Bailando, Ponerte de Novia con un Principito y Facturar (Factos)",
        "text": "Firmás contrato televisivo, te ponés de novia con José Sosa (un futbolista con más facha y clase), ganás el juicio de alimentos y brillás en las pasarelas.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Perfil Bajo Absoluto y Cero Declaraciones sobre tu Ex (Dignidad)",
        "text": "Rechazás todas las notas de espectáculos, te enfocás en criar a tus bebés en paz y dejás que los abogados resuelvan la manutención sin cámaras.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Cantar Temas en Boliches de Punta del Este contra la Amante (Despecho)",
        "text": "Te subís a la tarima en Tequila a las 5 AM cantando canciones contra la estrella pop y le mandás mensajes por WhatsApp a las 4 de la mañana.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-charly-benvenuto-redes",
    "title": "El 'Unfollow' de Madrugada y la Historia Borrada",
    "protagonist": "La Pareja en Crisis",
    "category": "Parejas & Celular",
    "context": "Tu pareja se va a una fiesta Bresh con amigos. A las 4:30 AM deja de seguir tu cuenta de Instagram, borra la foto de perfil donde estaban juntos y sube una historia en un VIP con dos copas de champagne.",
    "image": "assets/celebrities/luli-case.jpg",
    "quote": "Fue un error del algoritmo de Instagram, te lo juro.",
    "options": [
      {
        "id": "A",
        "title": "1. Cambio de Cerradura Inmediato y Salir de Gira con Amigos (Factos)",
        "text": "Le cambiás la combinación a la puerta, le dejás la ropa en dos bolsas de consorcio en la guardia del edificio y te vas de after a Costanera.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Esperar al Día Siguiente Sobrio y Escuchar la Explicación (Dignidad)",
        "text": "No te volvés loco a las 5 AM: esperás al mediodía para tener una charla cara a cara y si no hay una explicación lógica, se termina con altura.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Mandar 47 Mensajes Desesperados y Stalkear a Toda la Bresh (Migajera)",
        "text": "Le reventás el celular con llamadas perdidas, entrás a las historias de todos los que están etiquetados en la fiesta para buscar de quién es la segunda copa.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-billetera-amigos-boliche",
    "title": "La Cuenta del VIP: $800.000 y el 'Te Transfiero Mañana'",
    "protagonist": "El Amigo Pagador",
    "category": "Amistad & Guita",
    "context": "Van a un boliche exclusivo de Costanera entre 6 amigos. Piden dos mesas VIP y champagne premium por un total de $800.000. Al llegar la cuenta, tus amigos dicen 'pagá con tu tarjeta que no tenemos límite y mañana te transferimos'. Pasan tres semanas y nadie te transfirió un peso.",
    "image": "assets/celebrities/diane-caracchi.jpg",
    "quote": "La plata entre amigos no se reclama, pero tampoco se roba.",
    "options": [
      {
        "id": "A",
        "title": "1. Mandar Captura del Resumen al Grupo con Alias y Amenaza (Factos)",
        "text": "Mandás la captura de la tarjeta al grupo de WhatsApp: 'Tienen 2 horas para transferir o los etiqueto a todos en historias de Instagram como morosos'.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Mensaje Individual a Cada Uno y Cero Salidas Futuras (Dignidad)",
        "text": "Le escribís por privado a cada uno con el monto exacto. Al que no paga, lo eliminás de tu círculo de amigos para siempre sin hacer escándalo.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Pagar el Resumen en Silencio para que no se Enojen (Inseguridad)",
        "text": "Te comés la deuda vos solo pagando el mínimo de la tarjeta con intereses monstruosos para no generar mala onda en el grupo y seguís saliendo con ellos.",
        "style": "luli"
      }
    ]
  },
  {
    "id": "caso-el-amigo-del-ex",
    "title": "El 'Chongueo' con el Mejor Amigo de tu Ex",
    "protagonist": "La Soltera Indecisa",
    "category": "Códigos & Noche",
    "context": "Te separaste hace 8 meses de una relación larga. En un cumpleaños en un bar, el mejor amigo de tu ex (que siempre te pareció hermoso) se te acerca en la barra, te dice que siempre le gustaste y te invita a su departamento.",
    "image": "assets/celebrities/luli-case.jpg",
    "quote": "La soltería no tiene códigos, pero la noche pasa factura.",
    "options": [
      {
        "id": "A",
        "title": "1. Irte con el Amigo sin Culpa: La Vida es Una Sola (Factos)",
        "text": "Te vas al departamento del amigo de una. Con tu ex ya terminaste y los códigos entre hombres son problema de ellos dos, no tuyo.",
        "style": "holder"
      },
      {
        "id": "B",
        "title": "2. Rechazar la Propuesta por Respeto a la Historia Pasada (Dignidad)",
        "text": "Le decís que no con una sonrisa: no te gusta mezclarte en traiciones entre amigos ni alimentar quilombos innecesarios en tu vida.",
        "style": "diane"
      },
      {
        "id": "C",
        "title": "3. Darle un Beso en el Baño pero Irte con Culpa y Escribirle a tu Ex (Migajera)",
        "text": "Chapás con el amigo a escondidas, te agarra un ataque de pánico a las 4 AM, te vas a tu casa en Uber y le mandás un mensaje a tu ex diciendo 'te extraño'.",
        "style": "luli"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRIBUNAL_CASES };
}
