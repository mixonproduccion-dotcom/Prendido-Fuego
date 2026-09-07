// BASE DE DATOS 6: TITULARES Y NOTICIAS PARA EL TICKER & ZÓCALOS EN VIVO
// Prendido Fuego (Mix On)

const BREAKING_NEWS_DATA = [
  {
    tag: "🔥 EL COGEDERO DE LA MÚSICA",
    headline: "LA JOAQUI BLANQUEÓ CON TIAGO PZK Y LUCK RA EXPLOTÓ EN REDES: 'DE LOS CUERNOS NADIE SE SALVA'",
    sub: "Tomás Holder: 'Con la ex de un amigo jamás se jode, pero Luck Ra perdió códigos en Brasil'."
  },
  {
    tag: "💣 BOMBA LAM",
    headline: "YANINA LATORRE DESTAPÓ A LUCK RA: 'UNA CHICA PERNOCTABA EN SU CASA DE BRASIL'",
    sub: "Diane Caracchi: 'Se hace la víctima en TikTok pero le metía los cuernos a Joaqui'."
  },
  {
    tag: "⚔️ GUERRA DE TRAP",
    headline: "TIAGO PZK LE RESPONDIÓ A LUCK RA TRAS QUEDARSE CON SU EX: 'TE GUSTAN VILLEROS'",
    sub: "Luli Casé: 'Mucho ego herido, energía baja y amistades rotas por despecho'."
  },
  {
    tag: "🥂 DESPECHO NACIONAL",
    headline: "LA JOAQUI DIO CONSEJO DE VIDA: 'LA GIRA NO SE LEVANTA UN DÍA DICIENDO QUE ESTÁ CONFUNDIDA'",
    sub: "El video viral que encendió la polémica entre las solteras del país."
  },
  {
    tag: "🏥 SALUD & FARÁNDULA",
    headline: "INTERNARON A MIRTHA LEGRAND POR BRONQUITIS A 6 MESES DE CUMPLIR 100 AÑOS",
    sub: "Holder: 'La Chiqui tiene más disciplina que todo el streaming junto, el domingo vuelve'."
  },
  {
    tag: "🔥 ESCÁNDALO DE STREAM",
    headline: "SASHA FERRO DESTROZÓ A SU HERMANO TRAS CHISTE MACHISTA EN VIVO EN SOLO POR HOY",
    sub: "Tomás Holder: 'A tu hermana se la defiende con la vida, Lio Ferro fue un tibio'."
  },
  {
    tag: "💄 ¿INSPIRACIÓN O COPIA?",
    headline: "ACUSAN A LOLA LATORRE DE PLAGIAR LA MARCA DE HAILEY BIEBER CON SU LÍNEA 'SORBO'",
    sub: "Lola se defendió en TikTok: 'Lo mío es inspiración, no copia'."
  },
  {
    tag: "💉 POLÉMICA FITNESS",
    headline: "TOMÁS MAZZA CONFESÓ SU ADICCIÓN A LOS ANABÓLICOS Y CRECE LA MODA DE LOS 'PINCHAZOS'",
    sub: "Holder: 'Pincharte sin entrenar es de vago y cagón; la salud no se negocia'."
  },
  {
    tag: "🤖 TENDENCIA FUTURO",
    headline: "FABRICAN ROBOTS SEXUALES EN CHINA Y TESLA ANUNCIA OPTIMUS: ¿ES INFIDELIDAD?",
    sub: "Diane Caracchi: 'Si tu pareja tiene intimidad con un robot, el pacto de pareja está roto'."
  },
  {
    tag: "🎙️ LUZU SOLD OUT",
    headline: "SANTI TALLEDO PRESENTÓ A SU NOVIO EL TIKTOKER CARLI EN EL MOVISTAR ARENA",
    sub: "Luli Casé: '¡El amor más hermoso y auténtico del streaming argentino!'."
  },
  {
    tag: "🚨 ALERTA DE FUNA",
    headline: "TOMÁS HOLDER AL BANCO POR DEFENDER LOS CÓDIGOS DE SANGRE EN LA MESA",
    sub: "Votá en vivo en el chat si Holder zafa o queda cancelado."
  },
  {
    tag: "🔥 URGENTE / PRENDIDO FUEGO",
    headline: "HOLDER LIQUIDÓ A LA NOCHE DE IBIZA: 'PREFIERO LA ARGENTINA TODA LA VIDA'",
    sub: "WhatsApp: 341 749-0173 • ¿Bancás a Holder o es un resentido?"
  },
  {
    tag: "💣 BOMBA MEDIÁTICA",
    headline: "WANDA NARA FUE VISTA EN NORDELTA CON L-GANTE TRAS SU VUELTA DE TURQUÍA",
    sub: "Mauro Icardi subió 15 historias en 10 minutos y después las borró."
  },
  {
    tag: "⚖️ TRIBUNAL DE FARÁNDULA",
    headline: "CAMI MAYAN INICIÓ DEMANDA MILLONARIA A MAC ALLISTER POR COMPENSACIÓN",
    sub: "Diane: 'Le corresponde hasta el último centavo por los años convividos'."
  },
  {
    tag: "🚨 ALERTA RED FLAG",
    headline: "LULI SE SINCERÓ AL AIRE: 'ESPERÉ 2 AÑOS A UN PIBE Y ME METIÓ LOS CUERNOS'",
    sub: "Mandá tu peor anécdota de migajera al WhatsApp de Prendido Fuego."
  },
  {
    tag: "🏎️ EXCLUSIVO F1",
    headline: "COLAPINTO CAUSA FUROR EN REDES TRAS SUS SALIDAS CON FAMOSAS EN MADRID",
    sub: "¿El nuevo soltero más codiciado del país tiene aura infinita?"
  },
  {
    tag: "🥊 GUERRA DE BANDOS",
    headline: "FURIA CONTRA LA TELEVISIÓN TRADICIONAL: 'A MÍ NO ME DOMESTICA NADIE'",
    sub: "Los Furiosos copan el chat de Mix On pidiendo la cabeza de los panelistas."
  },
  {
    tag: "👑 EL RANKING CRUEL",
    headline: "HOLDER MANDÓ A LAS CENIZAS A LOS 'CARETAS DEL GYM': 'A LAS FEAS NO LAS QUIERE NADIE'",
    sub: "El debate de género más cancelable del año dividió por completo a la mesa."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BREAKING_NEWS_DATA };
}
