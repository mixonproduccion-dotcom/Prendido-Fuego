---
name: guion-pf
description: Flujo integral de produccion diaria para Prendido Fuego (Mix On). Investiga tendencias en Twitter/X con el navegador de Antigravity, presenta links directos a cada tweet para aprobacion obligatoria del usuario, genera el guion y rundown editorial en guiones_programas/, inyecta los datos interactivos en ruleta-prendido-fuego/ (data_show_dia.js, data_news.js y data_lore_memory.js), corre la suite de tests E2E y despliega a produccion en Vercel.
---

# 🎙️ /guion-pf • Skill de Produccion Diaria de Prendido Fuego 🔥

Esta skill automatiza de punta a punta la preparacion del programa diario de **Prendido Fuego**, el show insignia de espectaculos, farandula, noche y vinculos de **Mix On Studio** (el "LAM" del streaming).

---

## 💎 LAS 4 REGLAS DE ORO DE LA SKILL (OBLIGATORIAS)

1. **HISTORIAL Y LORE ACUMULATIVO (CERO REPETICIONES ESTANCADAS)**:
   - Es obligatorio consultar previamente los guiones anteriores en `guiones_programas/` y el archivo `data_lore_memory.js`.
   - Traer **temas y polemicas NUEVAS**. Solo se puede retomar un tema anterior si **hubo un nuevo capitulo o giro en la historia en las ultimas horas** (ej: declaraciones cruzadas, cartas abiertas, nuevos videos o filtraciones que estiren el lore).
2. **VENTANA TEMPORAL ESTRICTA (MAXIMO 24 - 48 HORAS)**:
   - Las tendencias y tweets seleccionados **deben ser pura y exclusivamente de HOY o de AYER**. Prohibido levantar temas o tweets de fechas mas viejas.
3. **IDENTIDAD EDITORIAL: PRENDIDO FUEGO ES EL "LAM" DE MIX ON**:
   - Tono picante, farandulero, bardo de influencers y streamers (Luzu, Olga, Blender, Kick), desamor, infidelidad, traiciones de amigos, contradicciones morales y noche/boliches.
   - Todo tema debe alimentar el debate de pasiones entre los conductores y la clipeabilidad viral para TikTok y Reels.
4. **INTEGRACION TOTAL CON EL WORKSPACE Y LORE DEL PROGRAMA**:
   - Aprovechar las dinamicas documentadas en `Manual de Dinamicas y Juegos Virales para _Prendido Fuego_.md`.
   - Mantener viva la memoria del programa: los chistes internos de la mesa (la mama de Holder y el Chino Ku en Rosario, el choque automovilistico de Holder, las anecdotas de migajera de Luli, la defensa monogama de Diane).

---

## 🎭 La Mesa de Conductores (Personas)

- **Tomas Holder (Macho Alfa / Calle, Gym y Codigos de Barrio)**:
  - Antilibios, codigos de hermandad irrompibles (la ex de un amigo jamas se toca).
  - Experto en noche, levante y disciplina de gimnasio. Cero piedad con quienes se victimizan en redes habiendo sido infieles.
  - Frases: *"Factos", "Codigos", "En el gym y en la vida", "Cero tibios"*.
- **Diane Caracchi (Ancla Moral, Monogamia & Limites Claros)**:
  - La voz de la dignidad, la sensatez y los limites sanos en la pareja.
  - Cero tolerancia al gaslighting, la infidelidad camuflada o la misoginia en streams.
  - Frases: *"Dignidad", "Limites sanos", "Hacerse cargo", "Basta de romantizar la toxicidad"*.
- **Luli Case (Empatia, Tarot, Astrologia & Migajera Arrepentida)**:
  - Conecta con el dolor del desamor, la herida de abandono y el apego ansioso.
  - Analiza cartas astrales, signos y energias. Justifica o entiende a los personajes rotos porque "ella estuvo ahi".
  - Frases: *"Pobre, tiene luna en Cancer", "Herida de abandono", "Migajera total", "Limpieza energetica"*.

---

## 📋 Arquitectura de los 8 Bloques del Show

1. **Bloque 1: Apertura & Gran Portada del Dia** (Disparador A vs B con voto individual de Holder, Diane y Luli).
2. **Bloque 2: Guerra de Bandos** (3 duelos al hilo con posturas A vs B).
3. **Bloque 3: Tribunal de Farandula** (3 juicios con opciones A/B/C redactadas para Holder, Diane y Luli).
4. **Bloque 4: Semaforo de Red Flags** (7 situaciones puntuadas: Verde, Amarillo, Rojo, Fuego).
5. **Bloque 5: El Podio Interactivo (Top 5)** (Ranking tematico de traicion, careteada o bajeza).
6. **Bloque 6: Ruleta & Los 3 Tronos** (2 rondas: Casorio 💍, Chongo 🔥, Funa ❌).
7. **Bloque 7: Zona de Funa** (Banquillo de acusados con cronometro de replica de 30 segundos en vivo).
8. **Bloque 8: Master Dashboard** (Metricas psicologicas y diagnostico final en vivo).

---

## 🚀 Flujo de Ejecucion Paso a Paso

### 🟡 FASE 1: Investigacion en Twitter/X (Sesion @Mixontv_)
1. Conectarse a la sesion en segundo plano de Chrome (puerto 9222) de `@Mixontv_` o utilizar herramientas de busqueda en tiempo real.
2. Extraer tendencias y tweets que cumplan estrictamente:
   - Fechas: **Hoy o Ayer** unicamente.
   - Enfoque: **LAM de Mix On** (farandula, streaming, trap, noche, parejas).
   - Novedad: **No repetir** lo que ya se cerro en programas anteriores sin nuevo giro de lore.
3. Guardar el enlace URL exacto de cada tweet.

---

### 🛑 FASE 2: Compuerta Obligatoria de Aprobacion Humana (BLOCKING GATE)
> [!IMPORTANT]
> **REGLA ABSOLUTA**: No crear archivos de guion ni tocar la web antes de recibir la aprobacion expresa del usuario.

Presentar una tabla con los temas propuestos y sus **links directos a cada Tweet**:
```markdown
### 📋 Propuesta de Temas para el Show de Hoy (DD/MM)

| # | Bloque Sugerido | Tema / Escandalo | Protagonistas | Novedad / Giro de Lore | Enlace Directo a X/Twitter |
|---|---|---|---|---|---|
| 1 | Portada (Bloque 1) | ... | ... | ... | [Tweet de @usuario](https://x.com/...) |
```
Esperar la aprobacion afirmativa del usuario (*"Aprobado"* o pedidos de cambios).

---

### 🟢 FASE 3: Generacion Editorial de Guion y Rundown
En `guiones_programas/YYYY-MM-DD_programa_XX/`:
1. `guion_del_dia.md`: Redaccion completa de los 8 bloques con las 3 personalidades del panel.
2. `rundown_del_dia.md`: Tiempos tecnicos (90 - 105 min), zocalos de TV y disparadores de audio.

---

### 💻 FASE 4: Inyeccion de Datos en la Aplicacion Web (`ruleta-prendido-fuego/`)
1. `data_show_dia.js`: Actualizar `CURRENT_SHOW_EPISODE` con los 8 bloques.
2. `data_news.js`: Cargar los titulares de `BREAKING_NEWS_DATA`.
3. `data_lore_memory.js`: Incorporar los nuevos capitulos y personajes al timeline historico.
4. `index.html`: Actualizar subtitulo y badge con la fecha del dia.

---

### 🧪 FASE 5: Verificacion E2E y Deploy a Produccion
1. Correr `node test_e2e_suite.js` (100% pasando).
2. Ejecutar `git commit` y `git push origin main`.
3. Entregar enlace en vivo: `https://prendido-fuego.vercel.app`.
