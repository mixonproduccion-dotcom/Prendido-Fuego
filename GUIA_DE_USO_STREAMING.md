# 🔥 PRENDIDO FUEGO: MANUAL MAESTRO DE PRODUCCIÓN Y STREAMING HUB (MIX ON)

**Plataforma Integral de Juegos y Dinámicas de Streaming en Vivo**  
*Desarrollado para la producción de Mix On (Mati y Juan) y los conductores (Tomás Holder, Diane Caracchi, Luli Casé Rossi).*

---

## 🎛️ 1. Filosofía de Transmisión: "Pensado para el Vivo"

La nueva interfaz está diseñada bajo el concepto de **televisión interactiva y dinámica paso a paso**:
1. **Sin saturación visual en pantalla**: La barra superior ruidosa de pestañas fue reemplazada por una barra de estado minimalista y un **Sidebar lateral retráctil** (tecla `M` o `S`).
2. **Pantalla de Inicio / Hero Splash Screen**: Con la marca oficial de *Prendido Fuego*, perfiles de los conductores y un **botón de PLAY enorme** con efectos de fuego y audio para arrancar el show.
3. **Flujo Paso a Paso ("Te va llevando de pantalla a pantalla")**:
   - Preguntas monumentales con animaciones tipográficas de impacto.
   - Revelación escalonada de opciones con sonido de intriga.
   - Votación en vivo de los conductores con veredicto en tiempo real.

---

## 📺 2. Los 6 Módulos de Transmisión

### 🏠 Pantalla de Inicio / Splash (Hero Screen)
* **Mecánica:** Portada monumental con el logo oficial del ají de *Prendido Fuego*, ambientación de chispas en vivo, selector bento y el **botón gigante de PLAY** (`Espacio`).

### ⚖️ Módulo 1: El Tribunal de Farándula ("¿Qué Harías Vos en su Lugar?")
* **Base de Datos:** [`data_tribunal.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_tribunal.js) (Wanda vs Icardi vs L-Gante, Cami Mayan vs Mac Allister, Pampita vs Moritán, Enzo Fernández, etc.).
* **Flujo en 3 Pasos:**
  1. **Fase 1 (El Dilema):** Pregunta en gigante con animación y tarjeta del protagonista. Botón *"REVELAR LAS 3 POSTURAS ▶"*.
  2. **Fase 2 (Las 3 Opciones):** 3 tarjetas de lujo con posturas extremas para Holder (Ego/Billetera), Diane (Monogamia/Límites) y Luli (Migajera).
  3. **Fase 3 (Votación en Mesa):** Podios individuales para Tomás, Diane y Luli con cálculo instantáneo de la mayoría y sonido de veredicto.

### 🎡 Módulo 2: La Ruleta de la Farándula (Tinder Bizarro)
* **Base de Datos:** [`data_celebrities.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_celebrities.js) (50 celebridades categorizadas: Farándula, GH, Trap, Botineras, Política).
* **Mecánica:** Ruleta canvas con física y ticks de audio. Sortea la Víctima y 3 Pretendientes para repartir los 3 Tronos:
  - 💍 **EL MATCH IDEAL** (Para casorio).
  - 🤫 **EL CHONGO TÓXICO** (Para una noche).
  - 🔥 **¡PRENDIDO FUEGO!** (A la hoguera / Cancelado).

### 🚦 Módulo 3: El Semáforo de Toxicidad 2.0 (Red Flags & Veto 30s)
* **Base de Datos:** [`data_semaforo.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_semaforo.js) (Situaciones de celos, celular, boliche, WhatsApp y migajeo).
* **Mecánica:**
  - Situación expuesta en tipografía gigante.
  - 4 Botones monumentales neón: 🟢 Verde, 🟡 Amarillo, 🔴 Rojo, 🔥 Fuego.
  - **Veto de Producción (`V`):** Sirena de emergencia y modal de 30 segundos en pantalla para derecho a réplica en el banquillo.

### ⚔️ Módulo 4: ¿A Quién le Comprás la Deuda? (Guerra de Bandos)
* **Base de Datos:** [`data_bandos.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_bandos.js) (Wanda vs China, Yanina vs Berardi, Furia vs Coty, etc.).
* **Mecánica:** Split-screen arena con insignia central de choque *VS* y barra interactiva de Tracción (Tug-of-War) con porcentajes en vivo.

### 📊 Módulo 5: El Ranking Cruel de Caretas (Aura vs Caretómetro)
* **Base de Datos:** [`data_ranking.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_ranking.js) (Sets temáticos de 5 famosos).
* **Mecánica:** Podio del #1 al #5 con puntuaciones de Aura y Caretómetro revelables.

### 📰 Módulo 6: Generador de Zócalos & Breaking News Ticker
* **Base de Datos:** [`data_news.js`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/data_news.js).
* **Mecánica:** Editor de graphs en tiempo real y cinta de noticias continua estilo Crónica / LAM.

---

## ⌨️ 3. Atajos de Teclado de Producción (Mati y Juan)

| Tecla | Acción |
| :---: | :--- |
| **`Espacio`** | 🔥 Arrancar Show (en Home) / Avanzar Fase (en Tribunal) / Girar Ruleta (en Ruleta). |
| **`M` o `S`** | ☰ Abrir / Cerrar Sidebar de Producción (Drawer). |
| **`Esc`** | ✕ Cerrar Sidebar o cerrar Modal de Veto. |
| **`1`** | 🔥 SFX Fuego / Whoosh (Llamas ardientes). |
| **`2`** | 📢 SFX Factos / Air Horn (Remates de Holder). |
| **`3`** | ❌ SFX Buzzer / Cancelado (Error de TV). |
| **`4`** | 💍 SFX Campana Match Ideal. |
| **`5`** | 🎻 SFX Violín Cringe / Migajera (Anécdotas de Luli). |
| **`V`** | 🚨 Disparar VETO y reloj de 30 segundos (Sirena + Banquillo). |
| **`T`** | ⏱️ Iniciar / Pausar Reloj de Debate (30s). |
| **`O`** | 🎬 Alternar Modo OBS Clean Feed (Oculta controles y deja gráficos limpios). |
| **`F`** | ⛶ Pantalla Completa. |

---

## 🎬 4. Cómo Integrar en OBS Studio

1. En OBS, agregá una fuente **"Navegador" (Browser Source)**.
2. Marcá la casilla **"Archivo local"** y seleccioná [`ruleta-prendido-fuego/index.html`](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Prendido%20Fuego/ruleta-prendido-fuego/index.html).
3. Configuración:
   - Ancho: `1920`
   - Alto: `1080`
   - FPS: `60`
4. Presioná `O` para activar el **Modo OBS**:
   - Desaparecen los botones administrativos y queda una interfaz de televisión de alta gama con fondo transparente y animaciones impecables.
