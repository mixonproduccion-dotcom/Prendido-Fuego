// BASE DE DATOS 6: TITULARES Y NOTICIAS PARA EL TICKER & ZÓCALOS EN VIVO
// Prendido Fuego (Mix On) - Actualizado 09-09

const BREAKING_NEWS_DATA = [
  {
    "tag": "🚨 TARIFA DEL AMOR",
    "headline": "PIBAS EXIGEN SUELDOS DE 3 A 8 MILLONES PARA TENER UNA CITA: 'SI NO LLEGA, NO CALIFICA'",
    "sub": "Tomás Holder: 'Son vividoras de cotillón; el hombre no es el cajero automático de nadie'."
  },
  {
    "tag": "💔 RELACIÓN ABIERTA",
    "headline": "JULI ROCYO PIDIÓ ABRIR LA PAREJA Y SU NOVIO LE CLAVÓ 9 DÍAS DE VISTO: 'ES PEOR QUE ME IGNORE A QUE SEA SINCERA'",
    "sub": "Diane Caracchi: 'Pedir abrir la pareja es la excusa cobarde para meter cuernos'."
  },
  {
    "tag": "💣 GUERRA LAM",
    "headline": "FLOR VIGNA LE RESPONDIÓ A ÁNGEL DE BRITO: 'ME DICE PIOJA PERO VIVE PENDIENTE DE MÍ'",
    "sub": "La cantante redobló la apuesta tras ser acusada de dar vergüenza ajena."
  },
  {
    "tag": "⚡ RESPUESTA ÁNGEL",
    "headline": "ÁNGEL DE BRITO DESTROZÓ A FLOR VIGNA EN X: 'REVISEN SU CONCEPTO DE PICANTE'",
    "sub": "El rey de LAM liquidó el descargo de la artista en vivo."
  },
  {
    "tag": "🏑 ESCÁNDALO LEONA",
    "headline": "VICTORIA GRANATTO NINGUNEÓ A MESSI EN ESPN Y SU HERMANA MAJO SE DESPEGÓ EN HISTORIAS",
    "sub": "Tomás Holder: 'A tu hermana se la defiende con la vida, Majo fue una traidora'."
  },
  {
    "tag": "👗 NEPOBABY EN ACCIÓN",
    "headline": "LOLA LATORRE LANZÓ SU MARCA 'NEPOBABY' TRAS EL ESCÁNDALO DEL PLAGIO A HAILEY BIEBER",
    "sub": "Luli Casé: '¡Amo que facture con el hate de Twitter, es una reina!'."
  },
  {
    "tag": "✨ DÍA DE LA BELLEZA",
    "headline": "BOOM DE RETOQUES ESTÉTICOS Y MANDÍBULA A LOS 20 AÑOS: ¿AMOR PROPIO O CARETEADA?",
    "sub": "Tomás Holder: 'La facha se gana con fierros en el gimnasio, el ácido hialurónico es de tibio'."
  },
  {
    "tag": "🎙️ EGO EN STREAM",
    "headline": "CONNIE ANSALDI CON SU HIJO EN VIVO: '¿LA PERSONA MÁS INTELIGENTE QUE CONOCÍ? YO'",
    "sub": "Aseguró que el pensamiento humano desaparecerá en 5 años y desató una ola de memes."
  }
];

if (typeof window !== "undefined") {
  window.BREAKING_NEWS_DATA = BREAKING_NEWS_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BREAKING_NEWS_DATA };
}
