---
name: guion-pf
description: >-
  Genera, investiga y compila automáticamente el guion diario para el programa de streaming
  'Prendido Fuego' (Mix On) en formato Microsoft Word (.docx) e inyecta la configuración completa
  del circuito 'El Show del Día' en la app interactiva para OBS (ruleta-prendido-fuego).
  Úsalo cuando el usuario pida armar el guion del día, investigar temas de farándula/streaming para PF,
  o pasar links/noticias a formato de guion oficial y preparar la transmisión en vivo.
---

# 🎙️ SKILL MAESTRA DEFINITIVA: PRODUCCIÓN EJECUTIVA & STREAMING HUB PARA "PRENDIDO FUEGO" (MIX ON)

> **Compatibilidad**: 100% Unificada para **macOS (MacBook)** y **Windows 11 (PC de Producción)**.  
> **App Web (Streaming Hub)**: `ruleta-prendido-fuego/`  
> **URL Producción**: [prendido-fuego.vercel.app](https://prendido-fuego.vercel.app/)  
> **OBS Studio**: Clean Feed 1920x1080 @ 60 FPS (Tecla `O`).

---

## 🎯 PROPÓSITO & ADN EDITORIAL

Esta skill automatiza la producción ejecutiva diaria del programa de streaming **Prendido Fuego** (*"El LAM del streaming argentino"*), transmitido por **Mix On Studio**, conducido por:
- **Tomás Holder**: El motor del rating y la incorrección política. Calle, noche, boliches, frases célebres (*"el silencio es mi mejor amigo"*), humor crudo.
- **Dianela 'Diane' Caracchi**: El contrapeso sensato. Estudiante de RR.PP., modelo, 8 años de relación monógama. Límites éticos, perspectiva femenina realista.
- **Luli Casé Rossi**: La nueva fuerza femenina (*"Tarde de Girls"*). Frescura, estética, códigos de noche y picante frente a las posturas masculinas. *(Nota: Abril Zabaleta ya no forma parte del ciclo)*.
- **Producción General**: Mati y Juan.

---

## 💎 LAS 6 REGLAS DE ORO MAESTRAS (INQUEBRANTABLES)

### 1. 🔗 PROTOCOLO ESTRICTO DE LINKS EXACTOS A X/TWITTER (CERO ALUCINACIONES)
* **Obligatoriedad Absoluta**: Cada noticia, bardo, video o viral propuesto en la mesa **DEBE tener su enlace exacto, directo y verificado a X/Twitter** (`https://x.com/[cuenta]/status/[ID]`) o a la fuente audiovisual directa (clip de YouTube, Twitch, Kick o TikTok).
* **TERMINANTEMENTE PROHIBIDO**:
  - URLs genéricas o con puntos suspensivos (ej: `https://x.com/...`).
  - URLs de búsqueda general (ej: `https://x.com/search?q=...`).
  - URLs al perfil de usuario sin el tweet del hecho (ej: solo `https://x.com/AngeldebritoOk`).
  - Inventar IDs numéricos de tweets o enlaces que no existan.
* **Técnica de Extracción de Enlaces**:
  - **En Mac**: Chrome en segundo plano en puerto `9222` con la cuenta `@Mixontv_`, o búsqueda web focalizada extrayendo el permalink del tweet.
  - **En Windows**: Perfil persistente de Antigravity (`C:\Users\Mati\.gemini\antigravity-browser-profile`) o búsquedas web focalizadas con `site:x.com` extrayendo el permalink canónico del tweet.
* **En el Guion Word (.docx)**: Los links deben compilarse como **hipervínculos nativos clickeables en color azul y subrayados** para abrirse con un clic desde Word en PC, tablet o Mac.

### 2. ⏱️ VENTANA TEMPORAL ESTRICTA (24 A 48 HORAS - HOY O AYER)
* Solo entran informaciones, tweets y polémicas del **mismo día (T) o del día anterior (T-1)**.
* Todo tema que tenga más de 48 horas queda **automáticamente descartado**, sin excepciones.

### 3. 📜 HISTORIAL Y LORE ACUMULATIVO (CERO REPETICIONES)
* Antes de proponer temas, consultar `memoria_lores/LORE_CELEBRIDADES.json` y guiones previos en `PF/Guiones/`.
* Prohibido repetir escándalos de programas pasados a menos que haya surgido un **nuevo capítulo en las últimas 24-48 hs** (nuevas declaraciones cruzadas, videos filtrados, respuestas en vivo).

### 4. 🎭 IDENTIDAD: EL "LAM" DE MIX ON
* Farándula joven, influencers, streamers (Luzu, Olga, Blender, Kick, Carajo), noche rosarina vs. porteña, códigos de lealtad, citas, red flags y migajeo. Cero morbo vacío.
* **Regla de Competencia**: Prohibido citar o nombrar a medios competidores directos (ej: *Diario La Capital* de Rosario). Usar fuentes neutrales o cuentas de X (`@porqueTTarg`, `@EsTendenciaEnX`, `@AngeldebritoOk`, etc.).

### 5. 📅 EFEMÉRIDES POP & DISPARADORES CULTURALES DEL DÍA
* Sumar siempre al menos **1 efeméride pop del día** ("Un día como hoy...") que sirva de disparador de debate cultural en la mesa (aniversarios televisivos, bodas o rupturas icónicas, fechas de cultura pop).

### 6. 🛑 PROHIBIDO INVENTAR LA OPINIÓN DE LOS CONDUCTORES
* Tomás Holder, Diane Caracchi y Luli Casé conducen un show espontáneo en vivo; **no son actores teatrales**.
* **Terminantemente prohibido inventar diálogos falsos** atribuidos a los conductores en el guion (ej: *"Holder cruzó a..."* si él no lo dijo).
* En los guiones y dossiers solo van **hechos comprobados, citas textuales de los verdaderos protagonistas y disparadores neutrales** para que la mesa debata libremente.

---

## 🛑 EL FLUJO DE TRABAJO EN 5 FASES

```
┌────────────────────────────────────────────────────────────────────────┐
│ FASE 1: Scouting en X/Twitter + Efemérides Pop (Permalinks exactos)    │
│                           ⬇                                            │
│ FASE 2: Matchmaking Editorial a los 8 Bloques de "El Show del Día"     │
│                           ⬇                                            │
│ FASE 3: 🛑 HARD BLOCKING GATE: Presentar Tabla con Links en Chat       │
│         (STOP TOTAL: Espera de aprobación explícita de Mati)           │
│                           ⬇ (Solo tras aprobación explícita)           │
│ FASE 4: Generación de los 5 Dossiers Oficiales (Word .docx + MD + JSON)│
│                           ⬇                                            │
│ FASE 5: Inyección en Web App (data_show_dia.js) + Git Push a Vercel   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 🛑 FASE 3: HARD BLOCKING GATE (COMPUERTA DE APROBACIÓN OBLIGATORIA)

Tras la investigación, **Antigravity SE DETIENE COMPLETAMENTE** y presenta la propuesta estructurada en el chat:

1. **Titulares para el Ticker de Noticias (`data_news.js`)**
2. **Tabla de Asignación con Links Exactos Verificados**:

| # | Bloque Sugerido | Tema / Escándalo | Protagonistas | Novedad / Enfoque (24-48h) | Link Exacto Verificado a X |
|---|---|---|---|---|---|
| 1 | **Apertura (B1)** | Duelo de Portada | Nombre A vs Nombre B | Hecho concreto de hoy/ayer | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 2 | **Bandos (B2)** | Duelo 1 Tug-of-War | Protagonista 1 vs 2 | Cruce en streaming | `[Ver Clip: @cuenta](https://x.com/cuenta/status/...)` |
| 3 | **Bandos (B2)** | Duelo 2 Tug-of-War | Protagonista 3 vs 4 | Polémica por declaraciones | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 4 | **Bandos (B2)** | Duelo 3 Tug-of-War | Protagonista 5 vs 6 | Conflicto de pareja / noche | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 5 | **Tribunal (B3)** | Caso Moral 1 | Famoso involucrado | ¿Qué harías en su lugar? | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 6 | **Tribunal (B3)** | Caso Moral 2 | Famoso involucrado | Dilema ético o de códigos | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 7 | **Tribunal (B3)** | Caso Moral 3 | Famoso involucrado | Traición o pacto roto | `[Ver Tweet: @cuenta](https://x.com/cuenta/status/...)` |
| 8 | **Semáforo (B4)** | 7 Red Flags | Viral general / Parejas | Situaciones de celos y boliche | `[Ver Viral: @cuenta](https://x.com/cuenta/status/...)` |
| 9 | **Podio (B5)** | Top 5 Caretas | 5 Figuras del ambiente | Ranking temático arrastrable | `[Ver Hilo: @cuenta](https://x.com/cuenta/status/...)` |
| 10 | **Ruleta (B6)** | Víctimas & Tronos | Víctima + 3 candidatos | Match 💍, Chongo 🤫, Funa 🔥 | `[Ver Perfil: @cuenta](https://x.com/cuenta/status/...)` |
| 11 | **Funa (B7)** | Banquillo 30s | El cancelado del día | 30s con sirena de veto | `[Ver Clip: @cuenta](https://x.com/cuenta/status/...)` |
| 12 | **Efeméride** | Disparador Cultural | Ícono pop / TV | "Un día como hoy..." | `[Ver Archivo](https://...)` |

3. **Pregunta de Control Obligatoria**:
   > *"Mati, revisá esta propuesta para el programa de hoy. ¿Te copa este temario y la asignación de los 8 bloques, o querés cambiar o agregar algo antes de compilar e inyectar a la app?"*

**REGLA INQUEBRANTABLE**: No se compila el Word ni se modifica código hasta que Mati responda explícitamente (*"Aprobado"*, *"Cargalo"*, *"De una"*, *"Mandale"*).

---

## 📝 FASE 4: LOS 5 FORMATOS OFICIALES (`PF/Guiones/DD-MM/`)

Tras la aprobación, se generan de forma sincronizada los 5 formatos:
1. **`Guion DD-MM.docx`**: Documento Word oficial para los conductores:
   - Tipografía: **Calibri**.
   - Título: 18pt Negrita (`GUIÓN - PRENDIDO FUEGO`).
   - Subtítulo: 18pt Regular (`EMISIÓN DD/MM`).
   - Secciones: 13pt Negrita Cursiva.
   - Párrafos: 13pt Regular con nombres de protagonistas en **Negrita**, citas en *Cursiva* e **hipervínculos nativos clickeables en Word** hacia X/Twitter.
   - Márgenes: 1 pulgada en los 4 costados.
2. **`guion_del_dia.md`**: Escaleta editorial completa de los 8 bloques con hechos y preguntas de debate con links markdown.
3. **`rundown_del_dia.md`**: Escaleta técnica de tiempos (90 a 105 min), tiros de cámara, zócalos de TV y disparadores de audio SFX.
4. **`noticias_detalladas.md`**: Dossier periodístico de investigación con citas textuales y links exactos a X.
5. **`noticias_detalladas.json`**: JSON estructurado con campo `url` exacto para integraciones y scrapers.

---

## 💻 FASE 5: INYECCIÓN WEB APP, DEPLOY Y OBS STUDIO

1. **Ejecución del Inyector**:
   - En Windows: `python .agents/skills/guion-pf/scripts/inject_show_dia.py --data "payload.json"`
   - En Mac: `python3 .agents/skills/guion-pf/scripts/inject_show_dia.py --data "payload.json"`
2. **Archivos Actualizados en `ruleta-prendido-fuego/`**:
   - `data_show_dia.js` (`CURRENT_SHOW_EPISODE`)
   - `data_news.js` (`BREAKING_NEWS_DATA`)
   - `data_lore_memory.js` (`LORE_MEMORY_DATABASE`)
   - `memoria_lores/LORE_CELEBRIDADES.json` y `LORE_TIMELINE.md`
3. **Test Suite E2E**:
   ```bash
   node ruleta-prendido-fuego/test_e2e_suite.js
   ```
4. **Deploy Automático a Vercel**:
   ```bash
   git add index.html style.css app.js data_show_dia.js data_news.js data_celebrities.js data_lore_memory.js
   git commit -m "feat(show-DD-MM): actualizar show del dia DD-MM y memoria de lores"
   git push origin main
   ```
   *Vercel despliega en producción en ~20 segundos en: [prendido-fuego.vercel.app](https://prendido-fuego.vercel.app/).*
5. **Control al Aire en OBS Studio**:
   - Browser Source: 1920x1080 @ 60 FPS.
   - `Espacio`: Arrancar Show / Siguiente fase / Girar ruleta.
   - `M` o `S`: Drawer de producción.
   - `V`: Alerta de VETO (Sirena roja + 30s banquillo).
   - `O`: OBS Clean Feed Mode (oculta controles y deja limpia la pantalla).
   - `1` a `5`: SFX en vivo (Llamas, Air Horn Factos, Buzzer Cancelado, Campana Match, Violín Cringe).
