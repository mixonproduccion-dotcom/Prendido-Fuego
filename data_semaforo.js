// BASE DE DATOS 3: 100 SITUACIONES PARA "EL SEMÁFORO DE TOXICIDAD 2.0"
// Prendido Fuego 🔥 (Mix On Studio)

const SEMAFORO_CASES = [
  // SITUACIONES VIRALES DEL DÍA (GUION 02/09)
  {
    id: "sem-0209-001",
    title: "El Chiste Misógino y la Risa del Hermano",
    text: "Tu hermano se ríe a carcajadas en un stream en vivo cuando un compañero te denigra y te dice 'parrilla vieja' ante miles de personas...",
    expectedLevel: "fuego",
    category: "Streaming & Traición Familiar",
    tags: ["Sasha Ferro", "Lionel Ferro", "Salwe", "Funa"]
  },
  {
    id: "sem-0209-002",
    title: "El 'Sorbo Gate': Inspiración vs. Plagio",
    text: "Lanzás tu marca de cosméticos con el packaging y la estética calcada de Hailey Bieber y salís en TikTok diciendo 'lo mío es inspiración, no copia'...",
    expectedLevel: "amarillo",
    category: "Farándula & Redes",
    tags: ["Lola Latorre", "Rhode", "Sorbo", "TikTok"]
  },
  {
    id: "sem-0209-003",
    title: "La Moda de los 'Pinchazos'",
    text: "Tu pareja se pincha anabólicos y esteroides para estar trabado y marcado sin pisar el gimnasio ni hacer dieta...",
    expectedLevel: "rojo",
    category: "Salud & Fitness",
    tags: ["Tomás Mazza", "Pinchazos", "Gym", "Química"]
  },
  {
    id: "sem-0209-004",
    title: "La Novia que Tenía 75 en Lugar de 40",
    text: "Descubrís por el Instagram de un cirujano plástico que la persona con la que salís hace 6 meses no tiene 40 años sino 75...",
    expectedLevel: "rojo",
    category: "Virales & Parejas",
    tags: ["Cirujano", "Mentira", "Edad", "Viral"]
  },
  {
    id: "sem-0209-005",
    title: "El Robot Humanoide en la Cama",
    text: "Tu pareja tiene intimidad con un robot humanoide Optimus de Tesla a solas y te jura que 'no cuenta como infidelidad porque es un artefacto'...",
    expectedLevel: "fuego",
    category: "Tecnología & Infidelidad",
    tags: ["Tesla", "Optimus", "Robots", "Infidelidad"]
  },
  {
    id: "sem-0209-006",
    title: "El Blanqueo en el Movistar Arena",
    text: "Tu pareja te pide blanquear la relación arriba del escenario frente a 15.000 fanáticos en un show de streaming...",
    expectedLevel: "verde",
    category: "Amor & Streaming",
    tags: ["Santi Talledo", "Luzu TV", "Carli", "Movistar"]
  },
  {
    id: "sem-0209-007",
    title: "La Carta Abierta de Despecho al Hermano",
    text: "Publicás una carta abierta en Instagram destruyendo a tu propio hermano con nombre y apellido y recordándole su rol de padre...",
    expectedLevel: "verde",
    category: "Dignidad & Vínculos",
    tags: ["Sasha Ferro", "Carta", "Límites"]
  },
  // SITUACIONES VIRALES ANTERIORES
  {
    id: "sem-hoy-001",
    title: "La Consulta a ChatGPT sobre Infidelidades",
    text: "Le preguntás a ChatGPT cuántas veces te engañó tu pareja y subís la captura a tus historias de Instagram etiquetándolo y firmando con tu segundo nombre...",
    expectedLevel: "fuego",
    category: "Farándula & IA",
    tags: ["Wanda Nara", "ChatGPT", "Despecho"]
  },
  {
    id: "sem-hoy-002",
    title: "El Fetiche Viral en la Primera Cita",
    text: "En la primera cita te confiesa que le gusta dar chirlos y experimentar fetiches del ojo en la intimidad (al estilo Juli Poggio en PH)...",
    expectedLevel: "amarillo",
    category: "Intimidad & Tabúes",
    tags: ["Juli Poggio", "PH", "Fetiches"]
  },
  {
    id: "sem-hoy-003",
    title: "El Jefe Anti-Harinas y Cero Azúcar",
    text: "Tu jefe prohíbe terminantemente comer medialunas, facturas y azúcar en horario laboral para que no tengas bajones de insulina y rindas al 100%...",
    expectedLevel: "rojo",
    category: "Trabajo & Disciplina",
    tags: ["La Casa Stream", "Jefe Fit", "Oficina"]
  },
  {
    id: "sem-hoy-004",
    title: "La Mamá Administradora Millonaria",
    text: "Sos mayor de edad, ganás millones pero tu mamá te administra cada centavo y te da plata por semana porque no confía en que sepas ahorrar...",
    expectedLevel: "amarillo",
    category: "Familia & Dinero",
    tags: ["Juli Poggio", "Familia", "Dinero"]
  },
  {
    id: "sem-hoy-005",
    title: "El Mensaje de Despecho en RKT",
    text: "Tu pareja te corta para estar soltero y a la semana sacás un tema de RKT diciéndole 'si no te valora ese gil quién se cree'...",
    expectedLevel: "fuego",
    category: "Música & Rupturas",
    tags: ["La Joaqui", "Luck Ra", "Canción"]
  },
  {
    id: "sem-hoy-006",
    title: "El Llanto Desconsolado por el Retiro de Messi",
    text: "Tu pareja se tira a llorar en el piso y cancela todos los planes del fin de semana porque Messi publicó su carta de retiro definitivo de la Selección...",
    expectedLevel: "verde",
    category: "Fútbol & Emociones",
    tags: ["Messi", "Retiro", "Selección Argentina"]
  },
  {
    id: "sem-hoy-007",
    title: "Los '30 Segundos de Fama' de Tinelli",
    text: "Tu pareja va a un casting de streaming a hacer imitaciones bizarras de animales para que Tinelli se tiente de risa en vivo...",
    expectedLevel: "amarillo",
    category: "Vergüenza Ajena & TV",
    tags: ["Tinelli", "Luzu TV", "Cringe"]
  },

  // 1-10: REDES, CELULAR & STALKING
  {
    id: "sem-001",
    title: "El Like Arqueológico de Madrugada",
    text: "Tu pareja le da like a una foto en bikini/bañador de su ex de hace 4 años un martes a las 3:45 AM, pero jura que 'se le resbaló el dedo scrolleando'.",
    expectedLevel: "rojo",
    category: "Redes & Celular",
    tags: ["Stalkeo", "Ex Parejas", "Redes"]
  },
  {
    id: "sem-002",
    title: "La Ubicación Compartida 24/7",
    text: "Para 'estar más tranquilos y por seguridad vial', te pide que tengan la ubicación compartida en tiempo real por WhatsApp las 24 horas del día.",
    expectedLevel: "fuego",
    category: "Control & Celos",
    tags: ["Control", "GPS", "Psicopatía"]
  },
  {
    id: "sem-003",
    title: "La Papelera de Reciclaje en la Ducha",
    text: "Aprovechás que se está bañando, ponés la clave que memorizaste de reojo y le revisás la papelera de eliminados de WhatsApp y las fotos archivadas porque 'tuviste una corazonada'.",
    expectedLevel: "rojo",
    category: "Invasión de Privacidad",
    tags: ["Celular", "Espionaje", "Corazonada"]
  },
  {
    id: "sem-004",
    title: "La Lista de 'Mejores Amigos' VIP",
    text: "Tiene una lista de 'Mejores Amigos' en Instagram de 15 personas donde solo sube fotos en el espejo del gym y videos tomando trago, pero a vos nunca te agregó 'para no aburrirte con contenido diario'.",
    expectedLevel: "fuego",
    category: "Redes & Celular",
    tags: ["Instagram", "Mejores Amigos", "Ocultar"]
  },
  {
    id: "sem-005",
    title: "El Chat Fijado en Silencioso",
    text: "Descubrís que tiene archivado y silenciado el chat con un 'compañero de la facultad' con el que no habla hace meses, pero la conversación está vacía.",
    expectedLevel: "rojo",
    category: "Redes & Celular",
    tags: ["WhatsApp", "Borrado", "Secretos"]
  },
  {
    id: "sem-006",
    title: "La Foto Sin Etiquetar y Cara Tapada",
    text: "Suben una foto juntos a Instagram donde la otra persona sale impecable con su mejor ángulo y a vos te corta media cara o te tapa con el sticker de la hora/temperatura.",
    expectedLevel: "amarillo",
    category: "Ego & Redes",
    tags: ["Instagram", "Ego", "Stickers"]
  },
  {
    id: "sem-007",
    title: "Seguir a 40 Modelos por Día",
    text: "Revisás sus 'Seguidos' en Instagram y en las últimas 48 horas empezó a seguir a 30 cuentas de influencers en bikini/calzas con menos de 5.000 seguidores.",
    expectedLevel: "rojo",
    category: "Redes & Celular",
    tags: ["Seguidos", "Instagram", "Buitreo"]
  },
  {
    id: "sem-008",
    title: "Reaccionar con 'Fueguitos' a Historias Viejas",
    text: "Tu pareja responde historias de conocidos/as de hace 23 horas con el emoji de fueguito 🔥 o carita con corazones 😍 y después borra el mensaje si no le contestan.",
    expectedLevel: "fuego",
    category: "Redes & Celular",
    tags: ["Fueguitos", "Tonteo", "Infidelidad"]
  },
  {
    id: "sem-009",
    title: "Pedir las Contraseñas 'Por Confianza'",
    text: "Te dice: 'Si no tenemos nada que ocultar, dame tu contraseña de desbloqueo de pantalla y yo te doy la mía para demostrar amor maduro'.",
    expectedLevel: "rojo",
    category: "Control & Celos",
    tags: ["Contraseñas", "Control", "Límites"]
  },
  {
    id: "sem-010",
    title: "El Celular Boca Abajo en la Mesa",
    text: "Cada vez que se sientan a comer o tomar un café, apoya el celular boca abajo sobre la mesa y si vibra, lo agarra disimuladamente y lo mete en el bolsillo sin mirar frente a vos.",
    expectedLevel: "amarillo",
    category: "Redes & Celular",
    tags: ["Celular", "Sospechas", "Misterio"]
  },

  // 11-20: LA NOCHE, BOLICHES & AFTERS
  {
    id: "sem-011",
    title: "El 'Me Quedé Sin Batería' a las 2 AM",
    text: "Sale con amigos a las 11 PM, a las 2:10 AM te manda 'me queda 1% de batería te amo gordo/a' y reaparece al otro día a las 4 de la tarde con una foto en una quinta en Pilar.",
    expectedLevel: "fuego",
    category: "La Noche & Mentiras",
    tags: ["After", "Batería", "Mentiras"]
  },
  {
    id: "sem-012",
    title: "Ir al Boliche 'en Modo Soltero'",
    text: "Salen al mismo boliche pero en grupos separados y te pide: 'No estemos pegados toda la noche para no cortar la vibra del grupo de mis amigos'.",
    expectedLevel: "rojo",
    category: "La Noche & Pareja",
    tags: ["Boliche", "Amigos", "Distancia"]
  },
  {
    id: "sem-013",
    title: "El Trago Aceptado en la Barra VIP",
    text: "Tu pareja está en la barra del boliche, un chabón/mina con plata le invita 3 tragos importados y se queda charlando 20 minutos 'por educación para no ser forro/a'.",
    expectedLevel: "amarillo",
    category: "La Noche & Pareja",
    tags: ["Tragos", "Barra", "Límites"]
  },
  {
    id: "sem-014",
    title: "El After Inesperado en Casa de un Desconocido",
    text: "Termina el boliche a las 6 AM, te dice que se va a dormir a la casa, pero a las 9 AM te enterás por una historia ajena de que terminó en el after en la casa de un chongo/mina que conoció en la pista.",
    expectedLevel: "fuego",
    category: "La Noche & Mentiras",
    tags: ["After", "Desconocidos", "Quilombo"]
  },
  {
    id: "sem-015",
    title: "Subir a un Uber con el Grupo 'Raro'",
    text: "A la salida del boliche, se sube a un Uber compartido con dos personas del sexo opuesto que conoció esa misma noche porque 'iban para la misma zona'.",
    expectedLevel: "rojo",
    category: "La Noche & Pareja",
    tags: ["Uber", "Noche", "Riesgo"]
  },
  {
    id: "sem-016",
    title: "El Abrazo de Saludo con Beso en el Cuello",
    text: "En una previa, saluda a una persona de su grupo con un abrazo de 15 segundos y beso en el cuello mientras te mira de reojo para ver si reaccionás.",
    expectedLevel: "rojo",
    category: "Provocación & Ego",
    tags: ["Previa", "Abrazos", "Provocación"]
  },
  {
    id: "sem-017",
    title: "El 'Mewing' Boliche & Mirada Fija",
    text: "Te clava el visto en WhatsApp 4 días seguidos, pero cuando te lo cruzás en el boliche se te para enfrente, te hace 'mewing', te sostiene la mirada y le pide al mozo que te lleve una copa.",
    expectedLevel: "amarillo",
    category: "Levante & Ego",
    tags: ["Mewing", "Boliche", "Ghosteo"]
  },
  {
    id: "sem-018",
    title: "Bailar Pegado con la Ex Pareja en el Cumpleaños",
    text: "En el cumpleaños de un amigo en común, suena una cumbia vieja y saca a bailar a su ex de la mano cantando los temas a los gritos mirándose a los ojos.",
    expectedLevel: "fuego",
    category: "Ex Parejas & Boliche",
    tags: ["Cumbia", "Ex", "FaltaDeRespeto"]
  },
  {
    id: "sem-019",
    title: "Hacerse el Soltero para Entrar Gratis al VIP",
    text: "En la puerta del boliche, se saca el anillo/cadena y le dice al relacionista público que está soltero/a para conseguir precintos VIP gratis para él/ella y sus amigos.",
    expectedLevel: "rojo",
    category: "La Noche & Valores",
    tags: ["VIP", "Interés", "Caretaje"]
  },
  {
    id: "sem-020",
    title: "Desaparecer 1 Hora 'en el Baño'",
    text: "Están juntos en un festival/boliche, te dice 'voy al baño' y tarda 1 hora y 10 minutos. Vuelve con el pelo despeinado y dice que 'había mucha cola'.",
    expectedLevel: "fuego",
    category: "Sospechas & Noche",
    tags: ["Baño", "Desaparición", "Alerta"]
  },

  // 21-30: EX PAREJAS & FANTASMAS DEL PASADO
  {
    id: "sem-021",
    title: "El Mejor Amigo 'Casi Hermano' en la Misma Cama",
    text: "Tiene un mejor amigo del sexo opuesto con el que se va de vacaciones solo/a a la costa, duermen en la misma cama 'porque no hay plata para dos piezas' y se conocen desde la primaria.",
    expectedLevel: "fuego",
    category: "Amistades Peligrosas",
    tags: ["Amistades", "Vacaciones", "Límites"]
  },
  {
    id: "sem-022",
    title: "Guardar la Caja de Cartas y Regalos del Ex",
    text: "Tiene en la mesa de luz una caja con todas las cartas de amor, peluches y pasajes de avión de sus 4 años de noviazgo con el ex y dice que 'son recuerdos que forman su identidad'.",
    expectedLevel: "amarillo",
    category: "Ex Parejas",
    tags: ["Recuerdos", "Ex", "Apegos"]
  },
  {
    id: "sem-023",
    title: "La Suegra que Sigue Invitando a la Ex",
    text: "La mamá de tu pareja sigue teniendo en el living la foto de comunión de tu novio con su ex y la invita a tomar mate los domingos a la tarde.",
    expectedLevel: "rojo",
    category: "Familia Política",
    tags: ["Suegra", "Ex", "Familia"]
  },
  {
    id: "sem-024",
    title: "El Mensaje de Cumpleaños a las 00:00 Exactas al Ex",
    text: "Pone una alarma el 14 de mayo para mandarle un testamento de 4 párrafos a su ex deseándole un feliz cumpleaños y recordando anécdotas de cuando eran felices.",
    expectedLevel: "fuego",
    category: "Ex Parejas",
    tags: ["Cumpleaños", "Testamento", "Ex"]
  },
  {
    id: "sem-025",
    title: "Compararte en una Discusión con la Ex",
    text: "Están discutiendo por quién lava los platos y te tira: 'Ves, por estas cosas Romina nunca me hacía problema, ella entendía mis tiempos'.",
    expectedLevel: "fuego",
    category: "Manipulación & Violencia Verbal",
    tags: ["Comparaciones", "Ex", "Desprecio"]
  },
  {
    id: "sem-026",
    title: "Seguir Compartiendo la Cuenta de Netflix del Ex",
    text: "Llevan 1 año de novios y sigue usando el perfil 'Amorcito' de la cuenta familiar de Netflix y Spotify del ex para no pagar la suscripción.",
    expectedLevel: "amarillo",
    category: "Ratas & Ex Parejas",
    tags: ["Netflix", "Spotify", "Rata"]
  },
  {
    id: "sem-027",
    title: "Ir a Tomar un Café con el Ex 'Para Cerrar Ciclos'",
    text: "Llevan 6 meses juntos y te avisa: 'El jueves voy a merendar con mi ex a solas porque necesitamos cerrar una etapa en paz y madurez'.",
    expectedLevel: "rojo",
    category: "Ex Parejas",
    tags: ["Café", "CerrarCiclos", "Riesgo"]
  },
  {
    id: "sem-028",
    title: "Tener Tatuado el Nombre del Ex en la Costilla",
    text: "Tiene el nombre de su ex tatuado en letra cursiva en las costillas y dice que tapárselo o borrárselo con láser 'es de inmaduro porque el pasado no se borra'.",
    expectedLevel: "amarillo",
    category: "Ex Parejas",
    tags: ["Tatuajes", "Ex", "Pasado"]
  },
  {
    id: "sem-029",
    title: "Llorar Escuchando una Canción que le Dedicó el Ex",
    text: "Suena una balada de Abel Pintos o Duki en el auto, se le caen las lágrimas, cambia la radio y no te habla durante los siguientes 40 minutos de viaje.",
    expectedLevel: "rojo",
    category: "Duelo Incompleto",
    tags: ["Música", "Lágrimas", "Ex"]
  },
  {
    id: "sem-030",
    title: "Seguir Siendo el Mecánico / Técnico de la Ex",
    text: "Cada vez que a la ex se le pincha una rueda o se le rompe el módem del wifi a las 11 de la noche, tu novio sale corriendo a ayudarla 'por cortesía de caballerosidad'.",
    expectedLevel: "fuego",
    category: "Límites & Ex",
    tags: ["Servicial", "Ex", "FaltaDeLímites"]
  },

  // 31-40: PLATA, RATAS & CONVIVENCIA
  {
    id: "sem-031",
    title: "La Calculadora del 10% en la Primera Cita",
    text: "Salen a cenar a un lugar caro que él eligió, llega la cuenta y saca la calculadora del celular para dividir hasta el centavo del panera, cubierto y propina.",
    expectedLevel: "amarillo",
    category: "Citas & Plata",
    tags: ["Plata", "Primera Cita", "Rata"]
  },
  {
    id: "sem-032",
    title: "El 'Te Hago una Transferencia Mañana' Eterno",
    text: "Pagan las compras del supermercado con tu tarjeta porque 'se olvidó la billetera en el auto' y pasan 3 semanas y nunca te transfiere su mitad.",
    expectedLevel: "rojo",
    category: "Plata & Convivencia",
    tags: ["Transferencias", "Rata", "Convivencia"]
  },
  {
    id: "sem-033",
    title: "Ocultar Aumentos de Sueldo y Compras Caras",
    text: "Le aumentan el sueldo un 50% o cobra un bono en dólares, te dice que 'apenas llega a fin de mes' pero aparece con unas zapatillas de 300 dólares.",
    expectedLevel: "rojo",
    category: "Plata & Mentiras",
    tags: ["Sueldo", "Compras", "Egoísmo"]
  },
  {
    id: "sem-034",
    title: "Exigir que Pagues Vos Porque 'Ganás Más'",
    text: "En todas las salidas asume que la cuenta completa la pagás vos porque tu sueldo es superior, y si pedís dividir te acusa de ser tacaño/a.",
    expectedLevel: "rojo",
    category: "Plata & Pareja",
    tags: ["Sueldo", "Interés", "Manipulación"]
  },
  {
    id: "sem-035",
    title: "Llevarse las Sobras de la Mesa Familiar sin Preguntar",
    text: "Van a comer el domingo a la casa de tus viejos y cuando termina el asado pide un tupper para llevarse 2 kilos de carne para la semana sin aportar un peso para la compra.",
    expectedLevel: "amarillo",
    category: "Familia & Modales",
    tags: ["Tupper", "Asado", "Desubicado"]
  },
  {
    id: "sem-036",
    title: "Pedirle Plata Prestada a tus Amigos a tus Espaldas",
    text: "Te enterás de que le pidió 100.000 pesos prestados a tu mejor amigo/a y le pidió 'que no te cuente nada para no preocuparte'.",
    expectedLevel: "fuego",
    category: "Códigos & Plata",
    tags: ["Préstamos", "Amigos", "Traición"]
  },
  {
    id: "sem-037",
    title: "Revisar los Tickets de lo que Gastás en tus Cosas",
    text: "Se fija en los resúmenes de tu tarjeta de crédito y te cuestiona si era realmente necesario comprarte esa remera o salir a merendar con tus amigas.",
    expectedLevel: "fuego",
    category: "Control Financiero",
    tags: ["Control", "Finanzas", "Toxicidad"]
  },
  {
    id: "sem-038",
    title: "Pagar Siempre con 'Mercado Pago Sin Saldo'",
    text: "Llega la hora de pagar, apoya el celular en el posnet, da 'error de fondos' con cara de sorpresa y te dice 'uh gordi pagá vos y después arreglamos' por cuarta vez consecutiva.",
    expectedLevel: "rojo",
    category: "Ratas & Citas",
    tags: ["MercadoPago", "Rata", "Actuación"]
  },
  {
    id: "sem-039",
    title: "No Pagar el Alquiler para Gastarlo en Ropa o Gym",
    text: "Viven juntos, te dice que no le alcanza para su mitad del alquiler pero se compra suplementos proteicos importados y ropa de marca.",
    expectedLevel: "fuego",
    category: "Convivencia & Prioridades",
    tags: ["Alquiler", "Gym", "Inmadurez"]
  },
  {
    id: "sem-040",
    title: "Hacerte Pagar la Nafta de su Auto Todo el Mes",
    text: "Te pasa a buscar en su auto pero cada 3 días para en la estación de servicio y te pide que le cargues medio tanque porque 'el auto gasta por llevarte a vos'.",
    expectedLevel: "rojo",
    category: "Plata & Pareja",
    tags: ["Nafta", "Auto", "CaraDura"]
  },

  // 41-50: CULTURA MIGAJERA & 'CASI ALGO'
  {
    id: "sem-041",
    title: "La Migajera de los 2 Años (Caso Luli Casé)",
    text: "Seguir esperando y enamorada de un chabón que vive en Miami, que solo te habla para pedirte nudes o cuando está borracho a las 5 AM prometiendo un futuro juntos.",
    expectedLevel: "fuego",
    category: "Cultura Migajera",
    tags: ["Migajera", "Miami", "Ilusión"]
  },
  {
    id: "sem-042",
    title: "Exclusividad sin Título de Noviazgo",
    text: "Llevan saliendo 9 meses, te prohíbe terminantemente ver a otras personas pero cuando le preguntás '¿qué somos?' te responde: 'No me gustan las etiquetas, fluyamos'.",
    expectedLevel: "fuego",
    category: "Casi Algo",
    tags: ["Etiquetas", "Exclusividad", "Cobardía"]
  },
  {
    id: "sem-043",
    title: "El 'Te Quiero Mucho pero Ahora Necesito Sanar'",
    text: "Te dice que sos la persona más increíble del planeta pero que 'tiene traumas de la infancia y no puede darte lo que merecés'... pero a las 2 semanas se pone de novio formal con otra.",
    expectedLevel: "fuego",
    category: "Chamuyos Clásicos",
    tags: ["Sanar", "Excusas", "Mentiras"]
  },
  {
    id: "sem-044",
    title: "Planear Solo Citas de Madrugada en su Casa",
    text: "Nunca te invitó a tomar un helado a la tarde ni a caminar por la plaza; todos los planes son 'venite a ver una peli a mi depto después de la 1 AM'.",
    expectedLevel: "rojo",
    category: "Citas & Interés",
    tags: ["Clandestino", "Madrugada", "Chongo"]
  },
  {
    id: "sem-045",
    title: "Presentarte como 'Una Amiga' Frente a los Padres",
    text: "Te invita a su casa, cae el papá de sorpresa y te presenta diciendo: 'Ella es Romi, una amiga de la facu que me vino a ayudar con un trabajo práctico'.",
    expectedLevel: "fuego",
    category: "Vergüenza & Pareja",
    tags: ["Amiga", "Presentación", "FaltaDeHuevos"]
  },
  {
    id: "sem-046",
    title: "El Like al Tweet Triste para que le Preguntes",
    text: "No te contesta los mensajes directos pero le da RT en Twitter a frases como 'Nadie me entiende en este mundo cruel' para que vayas a rogarle que te hable.",
    expectedLevel: "amarillo",
    category: "Manipulación Emocional",
    tags: ["Twitter", "Indirectas", "Drama"]
  },
  {
    id: "sem-047",
    title: "El 'Te Llamo en 5 Minutos' que Dura 4 Días",
    text: "Le hacés una llamada, te corta con el mensaje predeterminado 'No puedo hablar ahora, ¿qué pasa?' y te vuelve a escribir el domingo siguiente a las 23 hs.",
    expectedLevel: "rojo",
    category: "Desinterés & Falsedad",
    tags: ["Llamadas", "Desinterés", "Ghosteo"]
  },
  {
    id: "sem-048",
    title: "Aceptar Citas Canceladas a las 21:30 hs",
    text: "Tenían una cena reservada a las 22 hs, ya estás cambiado/a y perfumado/a, y a las 21:35 te manda: 'Gordi me quedé dormido/a, ¿lo dejamos para la semana que viene?'.",
    expectedLevel: "rojo",
    category: "Falta de Respeto",
    tags: ["Cancelaciones", "Planes", "Desinterés"]
  },
  {
    id: "sem-049",
    title: "El 'Breadcrumbing' de Fueguitos Semanales",
    text: "No te invita a salir hace 2 meses pero todos los domingos a la noche te reacciona a una historia para asegurarse de que sigas teniéndolo en mente.",
    expectedLevel: "amarillo",
    category: "Cultura Migajera",
    tags: ["Breadcrumbing", "Ego", "Migajas"]
  },
  {
    id: "sem-050",
    title: "Volver Solo Cuando te Ve Feliz con Otra Persona",
    text: "Pasan 6 meses sin que le importes, subís una historia con alguien nuevo y a los 10 minutos te manda: 'Hola perdida, anoche soñé con vos, tenemos que hablar'.",
    expectedLevel: "fuego",
    category: "Ego & Toxicidad",
    tags: ["Perdida", "Celos", "Ego"]
  },

  // 51-60: CÓDIGOS, AMISTADES & TRAICIÓN SCALONETA
  {
    id: "sem-051",
    title: "El Chamuyo al Hermano/a de tu Mejor Amigo",
    text: "Vas a la casa de tu mejor amigo de toda la vida y le tirás los perros a su hermana/o menor por privado de Instagram prometiéndole no contarle nada.",
    expectedLevel: "fuego",
    category: "Códigos de Amistad",
    tags: ["Hermanos", "Amigos", "FaltaDeCódigos"]
  },
  {
    id: "sem-052",
    title: "La 'Jugada Mac Allister' (El Amigo de Toda la Vida)",
    text: "Dejar a tu pareja de 5 años para ponerte de novio formal con la mejor amiga de la infancia que venía a tomar mate con ustedes a la casa.",
    expectedLevel: "fuego",
    category: "Traición & Scaloneta",
    tags: ["MacAllister", "Amigos", "Traición"]
  },
  {
    id: "sem-053",
    title: "Contar los Secretos Íntimos de tu Pareja al Grupo de Amigos",
    text: "En una previa con tus amigos, contás con lujo de detalles las inseguridades corporales o el rendimiento sexual de tu pareja para hacer reír a la mesa.",
    expectedLevel: "fuego",
    category: "Lealtad & Intimidad",
    tags: ["Secretos", "Intimidad", "FaltaDeCódigos"]
  },
  {
    id: "sem-054",
    title: "El Amigo que se Hace el Lindo con tu Pareja en tu Ausencia",
    text: "Te vas al baño en un bar y cuando volvés tu mejor amigo le está haciendo masajes en los hombros a tu novia o diciéndole 'qué lindo perfume tenés'.",
    expectedLevel: "fuego",
    category: "Amistades Peligrosas",
    tags: ["Amigos", "Límites", "Buitres"]
  },
  {
    id: "sem-055",
    title: "Ser Amigo Íntimo de Quien le Hizo Mucho Daño a tu Pareja",
    text: "Tu pareja sufrió bullying o una estafa emocional con una persona, y vos salís a jugar al fútbol o merendar con esa persona diciendo 'yo no me meto en quilombos ajenos'.",
    expectedLevel: "rojo",
    category: "Lealtad de Pareja",
    tags: ["Lealtad", "Bullying", "FaltaDeEmpatía"]
  },
  {
    id: "sem-056",
    title: "Hacer un Grupo de WhatsApp Paralelo sin Vos",
    text: "Tu pareja y su grupo de amigos tienen un grupo paralelo donde se pasan capturas de perfiles de Tinder y organizan salidas 'para solteros'.",
    expectedLevel: "fuego",
    category: "Ocultamiento & Noche",
    tags: ["Grupos", "WhatsApp", "Complot"]
  },
  {
    id: "sem-057",
    title: "Salir con la Ex de tu Amigo a los 15 Días",
    text: "Tu amigo corta una relación de 3 años llorando y a las dos semanas vos empezás a verte a escondidas en su departamento.",
    expectedLevel: "fuego",
    category: "Códigos de Amistad",
    tags: ["Códigos", "ExAmigo", "Icardi"]
  },
  {
    id: "sem-058",
    title: "El Amigo que Siempre te Desmerece Delante de Minas",
    text: "Cada vez que hay chicas en la mesa, tu amigo te gasta con temas vergonzosos de tu pasado o se burla de tu ropa para quedar él como el macho alfa.",
    expectedLevel: "rojo",
    category: "Amistades Tóxicas",
    tags: ["Bullying", "Ego", "Competencia"]
  },
  {
    id: "sem-059",
    title: "Darle Like a Todas las Fotos de la Mejor Amiga de tu Novia",
    text: "No le da like a las fotos de su novia pero no se pierde ni una sola publicación de la mejor amiga en traje de baño.",
    expectedLevel: "fuego",
    category: "Redes & Respeto",
    tags: ["Likes", "Amigas", "Desubicado"]
  },
  {
    id: "sem-060",
    title: "Festejarle las Infidelidades a los Amigos",
    text: "Tu pareja le hace de 'coartada' y le cubre las mentiras a sus amigos infieles mintiéndole en la cara a las novias de ellos.",
    expectedLevel: "rojo",
    category: "Valores & Códigos",
    tags: ["Cómplice", "Mentiras", "Valores"]
  },

  // 61-70: PSICOPATÍA, GASLIGHTING & MANIPULACIÓN
  {
    id: "sem-061",
    title: "El 'Estás Loco/a, Te Inventás Todo en tu Cabeza'",
    text: "Le mostrás una prueba irrefutable de una mentira y te responde a los gritos: 'Estás enferma de los celos, te hacés películas mentales que destruyen la pareja'.",
    expectedLevel: "fuego",
    category: "Gaslighting Puro",
    tags: ["Gaslighting", "Locura", "Manipulación"]
  },
  {
    id: "sem-062",
    title: "La Ley del Hielo de 3 Días por una Pavada",
    text: "Tienen un desacuerdo menor y te castiga con 72 horas de silencio absoluto viviendo en la misma casa, sin mirarte a los ojos.",
    expectedLevel: "fuego",
    category: "Violencia Psicológica",
    tags: ["Silencio", "Castigo", "Madurez"]
  },
  {
    id: "sem-063",
    title: "Amenazar con Terminar la Relación en Cada Discusión",
    text: "Ante el más mínimo desacuerdo te dice: 'Bueno si no te gusta cómo soy agarro mis cosas y me voy, terminemos acá'.",
    expectedLevel: "rojo",
    category: "Manipulación Emocional",
    tags: ["Chantaje", "Ruptura", "Inseguridad"]
  },
  {
    id: "sem-064",
    title: "Hacerse la Víctima Cuando lo Descubrís en Falta",
    text: "Lo enganchás hablando con otra persona y se pone a llorar desconsoladamente diciendo que 'su vida es una mierda y que todo lo hace mal' para que vos termines consolándolo.",
    expectedLevel: "fuego",
    category: "Inversión de Culpa",
    tags: ["Llantos", "Víctima", "Manipulación"]
  },
  {
    id: "sem-065",
    title: "Controlarte la Ropa Antes de Salir",
    text: "Te estás vistiendo para ir a un bar y te dice: '¿En serio vas a salir con ese escote/pantalón tan ajustado? Parecés regalada/o'.",
    expectedLevel: "fuego",
    category: "Control & Machismo",
    tags: ["Ropa", "Control", "Machismo"]
  },
  {
    id: "sem-066",
    title: "Poner a Prueba tu Fidelidad con un Perfil Falso",
    text: "Crea una cuenta trucha de Instagram con fotos de una modelo y te empieza a hablar para ver si le seguís el juego y le pasás el WhatsApp.",
    expectedLevel: "fuego",
    category: "Psicopatía Extrema",
    tags: ["CuentaFalsa", "Trampas", "Enfermedad"]
  },
  {
    id: "sem-067",
    title: "Aislarte Progresivamente de tu Familia y Amigos",
    text: "Empieza a criticar a todas tus amigas/os diciendo que 'te tienen envidia' y que 'tu familia es re tóxica' para que solo salgas con él/ella.",
    expectedLevel: "fuego",
    category: "Aislamiento & Alerta Máxima",
    tags: ["Aislamiento", "Familia", "Peligro"]
  },
  {
    id: "sem-068",
    title: "El Ataque de Celos por un Mozo o Cajero",
    text: "Sos amable y le decís 'muchas gracias, que tengas lindo día' al mozo y tu pareja te acusa de estar tirándole onda en su cara.",
    expectedLevel: "fuego",
    category: "Celos Desmedidos",
    tags: ["Mozo", "Celos", "Vergüenza"]
  },
  {
    id: "sem-069",
    title: "Desaparecer y Dejarte el Celular Apagado tras una Pelea",
    text: "Se pelean a las 8 de la noche, se va de la casa, apaga el teléfono durante 14 horas dejándote con angustia y ataques de pánico.",
    expectedLevel: "rojo",
    category: "Chantaje Emocional",
    tags: ["Desaparición", "Angustia", "Castigo"]
  },
  {
    id: "sem-070",
    title: "Hacer Comentarios Despectivos sobre tu Físico Disfrazados de 'Chiste'",
    text: "Te dice 'estás comiendo muchos carbohidratos gordi, mirá esa pancita' adelante de otras personas y si te quejás dice que 'no tenés sentido del humor'.",
    expectedLevel: "fuego",
    category: "Maltrato Psicológico",
    tags: ["Chistes", "Físico", "Inseguridades"]
  },

  // 71-80: GYM BRO, FIT CULTURE & EGO
  {
    id: "sem-071",
    title: "El Holder de Gimnasio: 45 Fotos al Espejo por Sesión",
    text: "Vas a entrenar con él/ella y se pasa 40 minutos en cuero frente al espejo del gimnasio haciendo poses de culturismo y subiendo historias con frases de superación personal.",
    expectedLevel: "amarillo",
    category: "Gym & Ego",
    tags: ["Gym", "Espejo", "Narcisismo"]
  },
  {
    id: "sem-072",
    title: "Llevarse el Tupper de Pollo con Arroz al Cumpleaños de 15",
    text: "Van al cumpleaños de 15 de tu hermana, no toca el catering de la fiesta y se saca un tupper con pollo hervido y balanza digital en la mesa principal.",
    expectedLevel: "amarillo",
    category: "Obsesión Fit",
    tags: ["Tupper", "Fiesta", "Desubicado"]
  },
  {
    id: "sem-073",
    title: "El Chamuyo Disfrazado de 'Te Corrijo la Postura de Sentadilla'",
    text: "Tu pareja se pasa 25 minutos ayudando y corrigiéndole la postura de sentadilla profunda a personas atractivas en el gym mientras vos estás en la cinta.",
    expectedLevel: "rojo",
    category: "Gym & Chamuyo",
    tags: ["Sentadillas", "Gym", "Tonteo"]
  },
  {
    id: "sem-074",
    title: "Criticarte por Tomar una Cerveza o Comer una Pizza",
    text: "Estás cenando un viernes a la noche y te cuenta las calorías de cada bocado diciéndote: 'Eso te va a tapar los abdominales, después no te quejes'.",
    expectedLevel: "rojo",
    category: "Obsesión & Control",
    tags: ["Calorías", "Comida", "Pesado"]
  },
  {
    id: "sem-075",
    title: "Priorizar la Rutina de Piernas por Encima de una Urgencia",
    text: "Tenés un problema en tu casa o te sentís mal, le pedís que te vaya a buscar y te dice: 'Bancame 45 minutos que recién voy por la segunda serie de cuadríceps'.",
    expectedLevel: "fuego",
    category: "Egoísmo & Prioridades",
    tags: ["Piernas", "Gym", "Egoísmo"]
  },
  {
    id: "sem-076",
    title: "Tener una Cuenta de Instagram Dedicada Exclusivamente a sus Músculos",
    text: "Tiene una cuenta secundaria con 20.000 seguidores donde solo sube reels en ropa interior apretada y responde mensajes privados de alto voltaje.",
    expectedLevel: "rojo",
    category: "Redes & Ego",
    tags: ["OnlyFans", "Músculos", "Redes"]
  },
  {
    id: "sem-077",
    title: "El 'Macho Alfa' que Descalifica a los Pibes Flacos",
    text: "Van caminando por la calle y hace comentarios despectivos en voz alta sobre los chicos que no van al gimnasio o las chicas que no entrenan glúteos.",
    expectedLevel: "amarillo",
    category: "Cultura Alfa / Holder",
    tags: ["Gordofobia", "Alfa", "Cringe"]
  },
  {
    id: "sem-078",
    title: "Gastar Medio Millón de Pesos en Suplementos y no Aportar en Casa",
    text: "Llegan a fin de mes ajustados pero gasta una fortuna en proteína importada, creatina y quemadores de grasa sin consultarte.",
    expectedLevel: "rojo",
    category: "Finanzas & Fit",
    tags: ["Proteínas", "Gastos", "Inmadurez"]
  },
  {
    id: "sem-079",
    title: "Hacerte Grabar sus Videos de TikTok en Medio del Supermercado",
    text: "Te obliga a filmarlo/a haciendo flexiones o poses en el pasillo de los lácteos de Coto para ganar reproducciones en TikTok.",
    expectedLevel: "amarillo",
    category: "Cringe & Redes",
    tags: ["TikTok", "Coto", "VergüenzaAjena"]
  },
  {
    id: "sem-080",
    title: "Mentirte sobre el Uso de Sustancias Químicas",
    text: "Jura que es 100% natural pero le encontrás ampollas y jeringas escondidas adentro de los botines de fútbol en el placard.",
    expectedLevel: "rojo",
    category: "Salud & Mentiras",
    tags: ["Anabólicos", "Secretos", "Salud"]
  },

  // 81-90: FAMILIA, PRESENTACIONES & TIEMPOS
  {
    id: "sem-081",
    title: "Presentar a los Padres a los 7 Días de Salir",
    text: "Llevan una semana de verse y te lleva de sorpresa al asado del domingo familiar con tíos, abuelos y te sienta al lado de la mamá.",
    expectedLevel: "verde",
    category: "Compromiso & Intensidad",
    tags: ["Familia", "Tiempos", "Intensidad"]
  },
  {
    id: "sem-082",
    title: "Meter a la Mamá en Todas las Decisiones de Pareja",
    text: "Van a alquilar un departamento o elegir las vacaciones y no puede decidir nada sin llamar primero a la madre para que le dé el visto bueno.",
    expectedLevel: "rojo",
    category: "Mami-Dependencia",
    tags: ["Mamá", "Dependencia", "Inmadurez"]
  },
  {
    id: "sem-083",
    title: "El Suegro que te Pregunta de Qué Partido Político Sos en la Entrada",
    text: "Llegás a la casa de sus padres por primera vez y el suegro te sienta en la cabecera y te hace un interrogatorio ideológico antes de servir la picada.",
    expectedLevel: "amarillo",
    category: "Familia Política",
    tags: ["Suegro", "Política", "Tensión"]
  },
  {
    id: "sem-084",
    title: "Ocultarle a su Familia que Está de Novio/a con Vos",
    text: "Llevan 1 año conviviendo y cuando la mamá llama por videollamada te pide que te escondas en el balcón o te quedes mudo/a.",
    expectedLevel: "fuego",
    category: "Ocultamiento Familiar",
    tags: ["Ocultar", "Familia", "Vergüenza"]
  },
  {
    id: "sem-085",
    title: "Comparar tu Cocina con la de su Mamá",
    text: "Le cocinás con amor una cena especial y te dice: 'Está rico pero a las milanesas de mi vieja no hay con qué darles, le falta condimento'.",
    expectedLevel: "amarillo",
    category: "Familia & Respeto",
    tags: ["Cocina", "Mamá", "Desagradecido"]
  },
  {
    id: "sem-086",
    title: "Pedir Casamiento / Convivencia al Mes de Conocerse",
    text: "Se conocen hace 30 días en un boliche y cae con las llaves de un departamento diciendo 'nos tenemos que mudar juntos ya porque somos almas gemelas'.",
    expectedLevel: "rojo",
    category: "Love Bombing Extremo",
    tags: ["LoveBombing", "Intensidad", "Peligro"]
  },
  {
    id: "sem-087",
    title: "El Hermano/a de tu Pareja que se Instala 3 Semanas en tu Casa",
    text: "Cae el cuñado sin avisar con la valija y se instala un mes en el sillón de tu living comiendo gratis y usando tu baño.",
    expectedLevel: "rojo",
    category: "Familia & Espacio",
    tags: ["Cuñado", "Convivencia", "Invasión"]
  },
  {
    id: "sem-088",
    title: "Hacer Planes para Navidad y Año Nuevo sin Consultarte",
    text: "El 20 de diciembre te avisa: 'El 24 pasamos con mis viejos en Junín y el 31 con mis primos en Mar del Plata' sin preguntarte por tu familia.",
    expectedLevel: "rojo",
    category: "Egoísmo & Fiestas",
    tags: ["Fiestas", "Familia", "Egoísmo"]
  },
  {
    id: "sem-089",
    title: "El Hermano Menor que te Pide que le Compres Escabio",
    text: "El hermano de 16 años te usa para que le compres botellas de vodka para la previa y te pide que le guardes los secretos a los padres.",
    expectedLevel: "verde",
    category: "Familia & Cuñados",
    tags: ["Cuñado", "Previa", "Complicidad"]
  },
  {
    id: "sem-090",
    title: "Hablar de Hijos y Nombres en la Segunda Cita",
    text: "Están tomando una birra en la segunda salida y te dice: 'A mí me gustaría tener 3 hijos, si es nena le ponemos Francesca y si es varón Bautista'.",
    expectedLevel: "amarillo",
    category: "Intensidad & Citas",
    tags: ["Hijos", "SegundaCita", "Intensidad"]
  },

  // 91-100: DILEMAS LÍMITE, SEXUALIDAD & SITUACIONES VERDES
  {
    id: "sem-091",
    title: "Proponer Abrir la Pareja Después de un Viaje a Solas",
    text: "Vuelve de un viaje de 10 días con amigos en Río de Janeiro y te plantea: 'Estuve pensando que la monogamia es una construcción social, abramos la pareja'.",
    expectedLevel: "fuego",
    category: "Poliamor & Sospechas",
    tags: ["Poliamor", "Río", "Sospechas"]
  },
  {
    id: "sem-092",
    title: "Fingir Orgasmos para que se Apure y Poder Dormir",
    text: "Es medianoche, estás cansado/a, fingís placer exagerado para que termine rápido y puedas poner la alarma de las 7 AM.",
    expectedLevel: "amarillo",
    category: "Sexualidad & Comunicación",
    tags: ["Sexo", "Fingir", "Cansancio"]
  },
  {
    id: "sem-093",
    title: "Pedir Hacer un Trío en la Primera Semana de Novios",
    text: "Llevan 10 días de exclusividad y te dice: 'Para no aburrirnos nunca, me gustaría que sumemos a una amiga tuya a la cama este fin de semana'.",
    expectedLevel: "fuego",
    category: "Sexualidad & Respeto",
    tags: ["Trío", "Amigas", "Desubicado"]
  },
  {
    id: "sem-094",
    title: "Tener una Carpeta Oculta de Fotos con Candado",
    text: "Descubrís que tiene una aplicación falsa de calculadora que al poner un código abre 500 fotos íntimas de personas con las que salió en el pasado.",
    expectedLevel: "fuego",
    category: "Privacidad & Pasado",
    tags: ["FotosÍntimas", "Secretos", "Alerta"]
  },
  {
    id: "sem-095",
    title: "Dejar que tu Pareja Tenga Amistades Sanas sin Celos",
    text: "Tu pareja se va a cenar con sus compañeros/as de trabajo, te avisa a qué hora vuelve y vos te quedás mirando una serie tranquilo/a sin mandar 40 mensajes.",
    expectedLevel: "verde",
    category: "Relación Sana",
    tags: ["Confianza", "Madurez", "Paz"]
  },
  {
    id: "sem-096",
    title: "Dividir las Tareas del Hogar 50/50 sin Reclamar",
    text: "Viven juntos, uno cocina y el otro lava los platos; limpian el departamento los sábados a la mañana con música y mate sin pelear.",
    expectedLevel: "verde",
    category: "Convivencia Sana",
    tags: ["Convivencia", "ParejaSana", "Equipo"]
  },
  {
    id: "sem-097",
    title: "Festejar los Logros del Otro sin Envidia ni Competencia",
    text: "A tu pareja le sale una oportunidad laboral increíble o gana un premio y vos descorchás un vino y lo festejás con orgullo genuino.",
    expectedLevel: "verde",
    category: "Amor Maduro",
    tags: ["Orgullo", "Éxito", "AmorVerdadero"]
  },
  {
    id: "sem-098",
    title: "Tener un Día a la Semana de 'Espacio Personal Libre'",
    text: "Acuerdan que los jueves cada uno hace su plan por separado con sus propios amigos sin tener que invitar obligatoriamente a la pareja.",
    expectedLevel: "verde",
    category: "Espacio Personal",
    tags: ["Amigos", "Libertad", "SaludMental"]
  },
  {
    id: "sem-099",
    title: "Hablar de Sexo y Fantasías de Frente con Respeto",
    text: "Se sientan a tomar un vino y charlan abiertamente sobre qué les gusta, qué no y qué cosas nuevas les gustaría probar sin juzgarse.",
    expectedLevel: "verde",
    category: "Comunicación Íntima",
    tags: ["Sexo", "Confianza", "Comunicación"]
  },
  {
    id: "sem-100",
    title: "La Disculpa Genuina tras una Equivocación",
    text: "Comete un error, se da cuenta sin que se lo tengas que rogar, te mira a los ojos, te pide disculpas sinceras y cambia la actitud inmediatamente.",
    expectedLevel: "verde",
    category: "Madurez Emocional",
    tags: ["Disculpas", "Madurez", "AmorSano"]
  }
];

if (typeof window !== "undefined") {
  window.SEMAFORO_CASES = SEMAFORO_CASES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SEMAFORO_CASES };
}
