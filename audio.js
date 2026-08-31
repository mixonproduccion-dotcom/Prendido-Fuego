// Sound Synthesizer & Audio FX Engine using Web Audio API
// No external audio assets required - 100% reliable in any browser, tablet, or OBS setup.

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMuted(mute) {
    this.muted = mute;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(mute ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  // --- ROULETTE TICK (Pin hit) ---
  playTick(frequency = 600, gainLevel = 0.3) {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- FIRE IGNITE / PRENDIDO FUEGO WHOOSH (Grand entrance / Big play button) ---
  playFireIgnite() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.9;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Noise generation
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Filter for flame roar
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);
      filter.Q.setValueAtTime(3.2, now);

      // Sub-bass thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(200, now);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.45);
      subGain.gain.setValueAtTime(0.85, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(1.0, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.9);
      subOsc.start(now);
      subOsc.stop(now + 0.6);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- REVEAL / SUSPENSE WHOOSH (Para revelar preguntas y opciones) ---
  playReveal() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- BUZZER / CANCELADO (Error fuerte de TV) ---
  playBuzzer() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sawtooth";
      osc2.type = "sawtooth";

      osc1.frequency.setValueAtTime(140, now);
      osc2.frequency.setValueAtTime(146, now); // Detune for nasty buzz

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.setValueAtTime(0.6, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.65);
      osc2.stop(now + 0.65);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- FACTOS / AIR HORN BURST ---
  playFactosHorn() {
    if (this.muted) return;
    this.init();
    try {
      const notes = [
        { freq: 466.16, start: 0, dur: 0.12 },    // Bb4
        { freq: 466.16, start: 0.14, dur: 0.12 }, // Bb4
        { freq: 466.16, start: 0.28, dur: 0.12 }, // Bb4
        { freq: 466.16, start: 0.42, dur: 0.35 }  // Bb4 long
      ];
      const now = this.ctx.currentTime;

      notes.forEach(n => {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc1.type = "sawtooth";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(n.freq, now + n.start);
        osc2.frequency.setValueAtTime(n.freq * 1.01, now + n.start); // unison detune

        g.gain.setValueAtTime(0.5, now + n.start);
        g.gain.setValueAtTime(0.45, now + n.start + n.dur - 0.02);
        g.gain.exponentialRampToValueAtTime(0.01, now + n.start + n.dur);

        osc1.connect(g);
        osc2.connect(g);
        g.connect(this.masterGain);

        osc1.start(now + n.start);
        osc2.start(now + n.start);
        osc1.stop(now + n.start + n.dur + 0.02);
        osc2.stop(now + n.start + n.dur + 0.02);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- MATCH IDEAL / CELEBRATION CHIME ---
  playMatchChime() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.45, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- CRINGE / MIGAJERA VIOLIN / SAD ---
  playCringe() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.4);
      osc.frequency.linearRampToValueAtTime(260, now + 0.9);
      osc.frequency.linearRampToValueAtTime(200, now + 1.4);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.25, now + 1.0);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.55);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- SIREN / VETO DE PRODUCCIÓN ---
  playSiren() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.25);
      osc.frequency.linearRampToValueAtTime(400, now + 0.5);
      osc.frequency.linearRampToValueAtTime(900, now + 0.75);
      osc.frequency.linearRampToValueAtTime(400, now + 1.0);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.15);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // --- TIMER BEEP (Tick de cuenta regresiva) ---
  playTimerBeep(isFinal = false) {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isFinal ? 880 : 440, now);

      gain.gain.setValueAtTime(isFinal ? 0.6 : 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (isFinal ? 0.35 : 0.1));

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + (isFinal ? 0.4 : 0.12));
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
}

const audioFX = new SoundFX();
