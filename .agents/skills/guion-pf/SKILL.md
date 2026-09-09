---
name: guion-pf
description: Flujo integral de produccion diaria para Prendido Fuego (Mix On). Investiga tendencias en Twitter/X con el navegador de Antigravity, suma efemerides pop y disparadores de la mesa, presenta links directos y datos para aprobacion obligatoria del usuario (bloqueante), genera el guion y rundown editorial en guiones_programas/, inyecta los datos interactivos en ruleta-prendido-fuego/ (data_show_dia.js, data_news.js y data_lore_memory.js), corre la suite de tests E2E y despliega a produccion en Vercel.
---

# 🎙️ /guion-pf • Skill de Producción Diaria de Prendido Fuego 🔥

Esta skill automatiza de punta a punta la preparación del programa diario de **Prendido Fuego**, el show insignia de espectáculos, farándula, noche y vínculos de **Mix On Studio** (el "LAM" del streaming).

---

## 💎 LAS 5 REGLAS DE ORO DE LA SKILL (OBLIGATORIAS)

1. **HISTORIAL Y LORE ACUMULATIVO (CERO REPETICIONES ESTANCADAS)**:
   - Es obligatorio consultar previamente los guiones anteriores en `guiones_programas/` y el archivo `data_lore_memory.js`.
   - Traer **temas y polémicas NUEVAS**. Solo se puede retomar un tema anterior si **hubo un nuevo capítulo o giro en la historia en las últimas horas** (ej: declaraciones cruzadas, cartas abiertas, nuevos videos o filtraciones que estiren el lore).
2. **VENTANA TEMPORAL ESTRICTA (MÁXIMO 24 - 48 HORAS PARA TENDENCIAS)**:
   - Las tendencias y tweets de actualidad seleccionados **deben ser pura y exclusivamente de HOY o de AYER**. Prohibido levantar noticias viejas como primicias del día.
3. **IDENTIDAD EDITORIAL: PRENDIDO FUEGO ES EL "LAM" DE MIX ON**:
   - Tono picante, farandulero, bardo de influencers y streamers (Luzu, Olga, Blender, Kick), desamor, infidelidad, traiciones de amigos, contradicciones morales y noche/boliches.
   - Todo tema debe alimentar el debate de pasiones entre los conductores y la clipeabilidad viral para TikTok y Reels. Cero morbo o pajines; se busca chimento con códigos, ironía, bardo picante y juego televisivo.
4. **INTEGRACIÓN TOTAL CON EL WORKSPACE Y LORE DEL PROGRAMA**:
   - Aprovechar las dinámicas documentadas en `Manual de Dinámicas y Juegos Virales para _Prendido Fuego_.md`.
   - Mantener viva la memoria del programa: los chistes internos de la mesa (la mamá de Holder y el Chino Ku en Rosario, el choque automovilístico de Holder, las anécdotas de migajera de Luli, la defensa monógama de Diane).
5. **EFEMÉRIDES POP & DISPARADORES CULTURALES/VINCULARES (NO CUALQUIER VERDURA)**:
   - No limitarse solo a lo que es tendencia en Twitter. Incorporar perlas pop y datos del día que enciendan la mesa:
     - **Efemérides de la Farándula & TV**: Aniversarios de peleas míticas de la TV argentina (Bailando, Gran Hermano, botineras, frases históricas de Moria, Fort, etc.).
     - **Cumpleaños de Celebridades & Vínculos**: Cumpleaños de figuras emblemáticas con historias de pareja o códigos icónicos (ej: Michael Bublé y Luisana Lopilato; debates de amor a distancia, parejas internacionales, etc.).
     - **Días Temáticos con Debate Social**: Efemérides pop como el *Día Internacional de la Belleza*, debatiendo la obsesión por los retoques estéticos, gimnasio y mandíbulas marcadas vs. aceptación.
     - **Disparadores para los 3 Perfiles de la Mesa**:
       - *Tomás Holder*: Códigos nocturnos, entrenamiento, suplementación, noche porteña vs rosarina, seducción, autos y lealtad de vestuario.
       - *Diane Caracchi*: Dignidad vincular, acuerdos claros, límites frente al gaslighting, psicología de relaciones y amor propio.
       - *Luli Casé*: Astrología del día (temporada astral, luna, signos), patrones de apego ansioso, tarot y redención de ex migajeras.
6. **PROHIBIDO GUIONAR O PREDEFINIR LO QUE TIENEN QUE DECIR O DEBATIR LOS CONDUCTORES**:
   - Tomás Holder, Diane Caracchi y Luli Casé conducen un stream en vivo espontáneo; son personas reales, **NO son actores teatrales**.
   - **TERMINANTEMENTE PROHIBIDO**: inventar frases, declaraciones ficticias o posturas prefabricadas atribuidas a los conductores como si fueran noticias o parlamentos de teatro.
   - **En los guiones**: Se detallan las noticias reales, los hechos comprobados, los enlaces directos, las citas textuales de los verdaderos protagonistas (famosos, involucrados) y disparadores o preguntas abiertas para que la mesa debata libremente.
   - **En los juegos interactivos (`data_show_dia.js`)**: Las opciones de votación son miradas y dilemas objetivos sobre el tema para que la mesa vote en vivo, NUNCA etiquetadas con "(Holder / Factos)" ni forzando el voto u opinión de nadie.

---

## 🎭 La Mesa de Conductores (Personas)

- **Tomás Holder (Macho Alfa / Calle, Gym y Códigos de Barrio)**:
  - Antitibios, códigos de hermandad irrompibles (la ex de un amigo jamás se toca).
  - Experto en noche, levante y disciplina de gimnasio. Cero piedad con quienes se victimizan en redes habiendo sido infieles.
  - Frases: *"Factos", "Códigos", "En el gym y en la vida", "Cero tibios", "Bajada de humo"*.
- **Diane Caracchi (Ancla Moral, Monogamia & Límites Claros)**:
  - La voz de la dignidad, la sensatez y los límites sanos en la pareja.
  - Cero tolerancia al gaslighting, la infidelidad camuflada o la hipocresía en streams.
  - Frases: *"Dignidad", "Límites sanos", "Hacerse cargo", "Basta de romantizar la toxicidad"*.
- **Luli Casé (Empatía, Tarot, Astrología & Migajera Arrepentida)**:
  - Conecta con el dolor del desamor, la herida de abandono y el apego ansioso.
  - Analiza cartas astrales, signos y energías. Justifica o entiende a los personajes rotos porque "ella estuvo ahí".
  - Frases: *"Pobre, tiene luna en Cáncer", "Herida de abandono", "Migajera total", "Limpieza energética"*.

---

## 📋 Arquitectura de los 8 Bloques del Show

1. **Bloque 1: Apertura & Gran Portada del Día** (Disparador A vs B con voto individual de Holder, Diane y Luli).
2. **Bloque 2: Guerra de Bandos** (3 duelos al hilo con posturas A vs B).
3. **Bloque 3: Tribunal de Farándula** (3 juicios con opciones A/B/C redactadas para Holder, Diane y Luli).
4. **Bloque 4: Semáforo de Red Flags** (7 situaciones puntuadas: Verde, Amarillo, Rojo, Fuego).
5. **Bloque 5: El Podio Interactivo (Top 5)** (Ranking temático de traición, careteada o bajeza).
6. **Bloque 6: Ruleta & Los 3 Tronos** (2 rondas: Casorio 💍, Chongo 🔥, Funa ❌).
7. **Bloque 7: Zona de Funa** (Banquillo de acusados con cronómetro de réplica de 30 segundos en vivo).
8. **Bloque 8: Master Dashboard** (Métricas psicológicas y diagnóstico final en vivo).

---

## 🚀 Flujo de Ejecución Paso a Paso

### 🟡 FASE 1: Investigación Cruzada (Twitter/X + Efemérides Pop & Datos del Día)
1. Conectarse a la sesión en segundo plano de Chrome (puerto 9222) de `@Mixontv_` o utilizar herramientas de búsqueda en tiempo real.
2. Extraer tendencias y tweets que cumplan estrictamente las fechas (**Hoy o Ayer**) y el enfoque LAM.
3. Buscar las **efemérides pop del día**, fechas astronómicas/astrológicas o aniversarios de farándula que calcen con Holder, Diane y Luli.
4. Guardar los enlaces URL exactos a cada tweet y fuentes.

---

### 🛑 FASE 2: Compuerta Obligatoria de Aprobación Humana (HARD BLOCKING GATE)
> [!CAUTION]
> **DETENCIÓN TOTAL OBLIGATORIA**: Aunque el comando se ejecute con `/goal`, el asistente **DEBE DETENERSE COMPLETAMENTE** en esta fase.
> **ESTÁ TERMINANTEMENTE PROHIBIDO** avanzar a redactar guiones, modificar código o desplegar a producción sin que el usuario haya respondido y aprobado expresamente las tendencias y temas propuestos.

Presentar una tabla con los temas propuestos, sus **links directos a cada Tweet / fuente** y los disparadores para la mesa:
```markdown
### 📋 Propuesta de Temas para el Show de Hoy (DD/MM)

| # | Bloque Sugerido | Tema / Escándalo / Efeméride | Protagonistas | Novedad / Enfoque para la Mesa | Enlace Directo a X / Fuente |
|---|---|---|---|---|---|
| 1 | Portada (Bloque 1) | ... | ... | ... | [Tweet de @usuario](https://x.com/...) |
| 2 | Guerra de Bandos | ... | ... | ... | [Tweet de @usuario](https://x.com/...) |
| 3 | Tribunal de Farándula | ... | ... | ... | ... |
| 4 | Efeméride / Dato Pop | ... | ... | ... | ... |
```
**FIN DEL TURNO DEL ASISTENTE**: Esperar la confirmación y feedback del usuario antes de tocar cualquier archivo.

---

### 🟢 FASE 3: Generación Editorial en Todos los Formatos (Solo post-aprobación)
> [!IMPORTANT]
> Los guiones y dossiers del día deben generarse en **TODOS LOS FORMATOS ESTÁNDAR** dentro de la carpeta canónica `PF/Guiones/DD-MM/` (ej: `PF/Guiones/09-09/`) y quedar sincronizados tanto en el workspace local como en Google Drive (`Google Drive/Prendido Fuego/PF/Guiones/DD-MM/`):
> 
> 1. **`Guion DD-MM.docx`**: Documento Word oficial para la mesa de conducción. Formato tipográfico estricto:
>    - Tipografía: Calibri.
>    - Título: 18pt negrita (`GUIÓN - PRENDIDO FUEGO`, space_before=6pt, space_after=2pt).
>    - Subtítulo: 18pt regular (`DÍA DD/MM`, space_after=14pt).
>    - Encabezados de sección: 13pt negrita (`Apertura: ...`, `Escándalo Central: ...`, `Tendencias, Deportes y Actualidad`, space_before=6pt, space_after=6pt).
>    - Párrafos: 13pt regular con nombres de conductores/personajes en **13pt negrita** y enlaces a fuentes directos y claros (space_after=4pt, y 10pt antes de nueva sección).
> 2. **`guion_del_dia.md`**: Guion editorial completo de los 8 bloques con diálogos, remates y posturas de Tomás Holder, Diane Caracchi y Luli Casé.
> 3. **`rundown_del_dia.md`**: Escaleta técnica con bloques temporales (90 - 105 min), zócalos de TV, disparadores de audio y dinámicas de interacción.
> 4. **`noticias_detalladas.md`**: Dossier periodístico exhaustivo con fuentes directas, citas textuales destacadas y disparadores de debate específicos para cada conductor.
> 5. **`noticias_detalladas.json`**: Estructura JSON completa y normalizada de las noticias investigadas con sus fuentes, personajes, citas y disparadores para consumo de agentes y aplicaciones.


---

### 💻 FASE 4: Inyección de Datos en la Aplicación Web (`ruleta-prendido-fuego/`)
1. `data_show_dia.js`: Actualizar `CURRENT_SHOW_EPISODE` con los 8 bloques.
2. `data_news.js`: Cargar los titulares de `BREAKING_NEWS_DATA`.
3. `data_lore_memory.js`: Incorporar los nuevos capítulos y personajes al timeline histórico.
4. `index.html`: Actualizar subtítulo y badge con la fecha del día.

---

### 🧪 FASE 5: Verificación E2E y Deploy a Producción
1. Correr `node test_e2e_suite.js` (100% pasando).
2. Ejecutar `git commit` y `git push origin main`.
3. Entregar enlace en vivo: `https://prendido-fuego.vercel.app`.
