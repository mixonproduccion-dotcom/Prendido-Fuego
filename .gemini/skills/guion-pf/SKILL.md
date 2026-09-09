---
name: guion-pf
description: Flujo integral de produccion diaria para Prendido Fuego (Mix On). Investiga tendencias en Twitter/X con el navegador de Antigravity, presenta links directos a cada tweet para aprobacion obligatoria del usuario, genera el guion y rundown editorial en guiones_programas/, inyecta los datos interactivos en ruleta-prendido-fuego/ (data_show_dia.js y data_news.js), corre la suite de tests E2E y despliega a produccion en Vercel.
---

# 🎙️ /guion-pf • Skill de Produccion Diaria de Prendido Fuego 🔥

Esta skill automatiza de punta a punta la preparacion del programa diario de **Prendido Fuego** (streaming de entretenimiento, vinculos, noche y farandula de **Mix On Studio**).

---

## 🎭 La Identidad de la Mesa (Personas de los Conductores)

Todo contenido generado (guiones, opciones del tribunal, argumentos de bandos) debe respetar fielmente las 3 personalidades del panel:

1. **Tomas Holder (Macho Alfa / Calle, Gym y Codigos de Barrio)**:
   - Defiende los codigos inquebrantables entre amigos y hombres: la ex de un amigo no se toca jamas.
   - Experto en boliches, noche portena vs noche rosarina, levante, disciplina de gimnasio y anti-tibieza.
   - Si alguien llora en redes por infidelidad habiendo sido infiel, lo fulmina sin piedad.
   - Lenguaje: *"Factos", "Codigos", "De una", "Cero tibios", "En el gym y en la vida"*.

2. **Diane Caracchi (Ancla Moral, Limites Claros & Cero Careteada)**:
   - Voz de la sensatez, la dignidad y el respeto en las relaciones.
   - Monogama convencida, cero tolerancia a la infidelidad camuflada, al gaslighting o a la humillacion publica.
   - Odia el morbo televisivo y desenmascara la careteada de los influencers y streamers.
   - Lenguaje: *"Dignidad", "Limites sanos", "Hacerse cargo", "Basta de romantizar la toxicidad"*.

3. **Luli Case (Empatia, Astrologia, Tarot & Migajera Arrepentida)**:
   - Conecta con la herida emocional, el apego ansioso y la nina interior de los protagonistas.
   - Interpreta los escandalos a traves de la carta astral, lunas, signos y karmas vinculares.
   - Suele justificar o entender el perdon hacia personas toxicas porque "ella estuvo ahi".
   - Lenguaje: *"Pobre, tiene la luna en Cancer", "Herida de abandono", "Migajera", "Limpieza energetica", "Energia densa"*.

---

## 📋 Arquitectura del Programa (Los 8 Bloques del Show)

Cada emision diaria se compone de **8 bloques estandarizados**:
1. **Bloque 1: Apertura & Gran Portada del Dia** (Disparador editorial A vs B con votacion individual de Holder, Diane y Luli).
2. **Bloque 2: Guerra de Bandos** (3 duelos al hilo con posturas cruzadas).
3. **Bloque 3: Tribunal de Farandula** (3 juicios con opciones A/B/C redactadas para Holder, Diane y Luli).
4. **Bloque 4: Semaforo de Red Flags** (7 situaciones virales puntuadas: Verde, Amarillo, Rojo, Fuego).
5. **Bloque 5: El Podio Interactivo (Top 5)** (Ranking tematico de traicion, careteada o bajeza humana).
6. **Bloque 6: Ruleta & Los 3 Tronos** (2 rondas con victima al centro y 3 candidatos para Casorio 💍, Chongo 🔥 y Funa ❌).
7. **Bloque 7: Zona de Funa** (Banquillo de acusados con cronometro de replica de 30 segundos en vivo).
8. **Bloque 8: Master Dashboard** (Diagnostico psicologico y metricas consolidadas de la mesa).

---

## 🚀 Flujo de Ejecucion Paso a Paso

### 🟡 FASE 1: Investigacion de Tendencias en Twitter/X
1. Utilizar las herramientas de navegacion o busqueda web de Antigravity para explorar la conversacion en tiempo real en Argentina (Twitter/X, streaming, TikTok, portales de espectaculos).
2. Monitorear los nichos clave:
   - **Farandula y Chimentos**: LAM, Yanina Latorre, Wanda Nara, Mauro Icardi, Pampita, etc.
   - **Musica Urbana y Trap**: La Joaqui, Luck Ra, Tiago PZK, Duki, Emilia Mernes, Tini, Nicki Nicole, L-Gante, etc.
   - **Streaming y Creadores**: Luzu TV, Olga, Blender, Kick, Twitch, Momo, Davo, Coscu, Spreen, etc.
   - **Nocturnidad, Fitness y Virales**: Tomas Holder, Tomas Mazza, anecdotas de boliches, citas fallidas, red flags.
   - **Deportes y Personajes Pop**: Colapinto, futbolistas de Seleccion, Mirtha Legrand.
3. **RECOLECCION OBLIGATORIA DE ENLACES**:
   Para cada tema seleccionado, **guardar el enlace URL directo a los tweets originales**, capturas o videos fuentes.

---

### 🛑 FASE 2: Compuerta Obligatoria de Aprobacion Humana (BLOCKING GATE)
> [!IMPORTANT]
> **REGLA ABSOLUTA**: No crear archivos de guion, ni modificar `data_show_dia.js`, ni tocar la web antes de recibir la aprobacion expresa del usuario.

El agente debe pausar la ejecucion y presentarle al usuario un resumen detallado con los temas candidatos en el siguiente formato:

```markdown
### 📋 Propuesta de Temas para el Show de Hoy (DD/MM)

| # | Bloque Sugerido | Tema / Escandalo | Protagonistas | Fuentes y Enlaces Directos de X/Twitter |
|---|---|---|---|---|
| 1 | Portada (Bloque 1) | El Cogedero de la Musica | La Joaqui, Luck Ra, Tiago | [Tweet de @nunditos](https://x.com/...) • [Video @luckra](https://x.com/...) |
| 2 | Bandos (Bloque 2) | Boliches CABA vs Rosario | Holder vs Noche Portena | [Tweet de @mdzol](https://x.com/...) |
| 3 | Tribunal (Bloque 3)| Intensa y Pesada | Fati Pazelli | [Tweet viral @fatipazelli](https://x.com/...) |
...
```

**Instruccion para el Agente**:
- Preguntar claramente: *"¿Aprobas estos temas o preferis reemplazar alguno antes de armar el guion y los juegos interactivos?"*
- **Esperar la respuesta afirmativa del usuario** antes de avanzar a la Fase 3.

---

### 🟢 FASE 3: Generacion Editorial del Guion y Rundown
Una vez que el usuario da el visto bueno, generar en la carpeta `guiones_programas/YYYY-MM-DD_programa_XX/`:

1. **`guion_del_dia.md`**:
   - Portada con fecha y tema central.
   - Redaccion completa de los 8 bloques con dialogos y posturas especificas para Holder, Diane y Luli.
   - Argumentos picantes, frases virales y disparadores para la audiencia y el chat.

2. **`rundown_del_dia.md`**:
   - Minutaje estimado bloque por bloque (duracion total 90 - 105 min).
   - Indicaciones tecnicas para la produccion: zocalos de TV para el switcher, disparadores de audio y efectos.

---

### 💻 FASE 4: Inyeccion de Datos en la Aplicacion Web (`ruleta-prendido-fuego/`)

Actualizar los archivos del frontend interactivo:

1. **`ruleta-prendido-fuego/data_show_dia.js`**:
   Sobrescribir el objeto `CURRENT_SHOW_EPISODE` con la estructura requerida:
   ```javascript
   const CURRENT_SHOW_EPISODE = {
     title: "PROGRAMA DE HOY • [DIA DD/MM]",
     badge: "🔥 GUION OFICIAL • [DIA DD/MM] • MIX ON STUDIO",
     aperturaDuel: {
       id: "...",
       title: "...",
       guide: "...",
       sideA: { name: "...", badge: "...", argument: "...", image: "..." },
       sideB: { name: "...", badge: "...", argument: "...", image: "..." }
     },
     bandosList: [ /* 3 duelos */ ],
     tribunalList: [ /* 3 casos con options A (Holder), B (Diane), C (Luli) */ ],
     semaforoList: [ /* 7 red flags con id, title, category, text */ ],
     podioItem: {
       title: "TOP 5: ...",
       guide: "...",
       candidates: [ /* 5 candidatos con id, name, crime, image */ ]
     },
     ruletaList: [ /* 2 rondas con victim y candidates */ ],
     funaAccused: "holder" // o persona designada
   };
   ```

2. **`ruleta-prendido-fuego/data_news.js`**:
   Actualizar `BREAKING_NEWS_DATA` con 6 a 8 titulares y subtitulos vinculados a las polemicas del dia para el zocalo/ticker en vivo.

3. **`ruleta-prendido-fuego/data_lore_memory.js` & `data_celebrities.js`**:
   Si el show introduce nuevas celebridades o eventos trascendentales, agregar la entrada de lore correspondiente con timestamp y descripcion para la memoria historica.

4. **`ruleta-prendido-fuego/index.html`**:
   Verificar que los badges (#showModeBadge) y subtitulos reflejen la fecha del dia actual.

---

### 🧪 FASE 5: Verificacion E2E y Despliegue en Produccion
1. **Ejecutar Suite de Tests Automatizados**:
   ```bash
   cd "ruleta-prendido-fuego"
   node test_e2e_suite.js
   ```
   Verificar que devuelva: `🎉 ALL TESTS PASSED! ZERO ERRORS ENCOUNTERED!`.
   (Cubre: carga de datos, avance fluido por los 8 bloques, reseteo al repetir show y cierre de modales).

2. **Despliegue a Produccion (GitHub / Vercel)**:
   ```bash
   git add .
   git commit -m "feat(show-DDMM): cargar show completo de hoy DD-MM con links y polemicas reales"
   git push origin main
   ```

3. **Entrega al Usuario**:
   - Confirmar que la app esta en vivo en: `https://prendido-fuego.vercel.app`.
   - Enlazar a los archivos generados en `guiones_programas/`.
   - Resumir los puntos fuertes para la conduccion en piso.
