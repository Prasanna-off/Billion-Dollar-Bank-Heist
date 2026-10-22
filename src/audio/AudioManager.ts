import { Settings } from '../types/game';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private settings: Settings = {
    musicEnabled: true,
    sfxEnabled: true,
    masterVolume: 0.8,
    musicVolume: 0.7,
    sfxVolume: 0.9,
    graphicsQuality: 'HIGH',
    fullscreen: false,
  };

  private currentAudioElement: HTMLAudioElement | null = null;
  private currentBgmNode: { stop: () => void } | null = null;
  private currentBgmType: string | null = null;

  constructor() {}

  public init(settings: Settings) {
    this.settings = settings;
  }

  private ensureContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.musicGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.updateVolumes();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateSettings(settings: Settings) {
    this.settings = settings;
    this.updateVolumes();
    if (this.currentAudioElement) {
      this.currentAudioElement.volume =
        (this.settings.musicEnabled ? this.settings.musicVolume : 0) * this.settings.masterVolume;
    }
  }

  private updateVolumes() {
    if (!this.masterGain || !this.musicGain || !this.sfxGain || !this.ctx) return;
    const now = this.ctx.currentTime;

    const master = this.settings.masterVolume;
    const music = this.settings.musicEnabled ? this.settings.musicVolume * master : 0;
    const sfx = this.settings.sfxEnabled ? this.settings.sfxVolume * master : 0;

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(master, now + 0.05);

    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(music, now + 0.05);

    this.sfxGain.gain.cancelScheduledValues(now);
    this.sfxGain.gain.linearRampToValueAtTime(sfx, now + 0.05);
  }

  // Play Sound Effects (Audio Files + Procedural Synthesis Fallbacks)
  public playSfx(
    type:
      | 'click'
      | 'hover'
      | 'door'
      | 'vault_turn'
      | 'granted'
      | 'denied'
      | 'alarm'
      | 'explosion'
      | 'heartbeat'
      | 'footstep'
      | 'countdown'
  ) {
    if (!this.settings.sfxEnabled) return;

    if (type === 'explosion') {
      this.playAudioFile('/assets/audio/explosion_audio.mp3', () => {
        this.synthesizeSfx('explosion');
      });
      return;
    }

    if (type === 'alarm') {
      this.playAudioFile('/assets/audio/lose_audio.mp3', () => {
        this.synthesizeSfx('alarm');
      });
      return;
    }

    this.synthesizeSfx(type);
  }

  private playAudioFile(url: string, fallback: () => void) {
    const audio = new Audio(url);
    audio.volume =
      (this.settings.sfxEnabled ? this.settings.sfxVolume : 0) * this.settings.masterVolume;
    audio.play().catch(() => {
      fallback();
    });
  }

  private synthesizeSfx(type: string) {
    this.ensureContext();
    if (!this.ctx || !this.sfxGain) return;

    const ctx = this.ctx;
    const dest = this.sfxGain;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }
      case 'hover': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.linearRampToValueAtTime(680, now + 0.04);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 'footstep': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.11);
        break;
      }
      case 'door': {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.linearRampToValueAtTime(1200, now + 0.4);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);
        break;
      }
      case 'vault_turn': {
        [180, 240, 320, 400].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          const t = now + idx * 0.09;
          osc.frequency.setValueAtTime(freq, t);
          osc.frequency.exponentialRampToValueAtTime(60, t + 0.18);
          gain.gain.setValueAtTime(0.4, t);
          gain.gain.linearRampToValueAtTime(0.01, t + 0.18);
          osc.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.19);
        });
        break;
      }
      case 'granted': {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const t = now + idx * 0.1;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.35, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
          osc.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.85);
        });
        break;
      }
      case 'denied': {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc2.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc2.frequency.setValueAtTime(154, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.45);
        osc2.stop(now + 0.45);
        break;
      }
      case 'alarm': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.linearRampToValueAtTime(550, now + 0.35);
        osc.frequency.linearRampToValueAtTime(900, now + 0.7);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.75);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.8);
        break;
      }
      case 'heartbeat': {
        [0, 0.14].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const t = now + offset;
          osc.frequency.setValueAtTime(75, t);
          osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
          gain.gain.setValueAtTime(0.6, t);
          gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
          osc.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.13);
        });
        break;
      }
      case 'explosion': {
        const bufferSize = ctx.sampleRate * 2.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.5));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.linearRampToValueAtTime(40, now + 2.2);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(1.0, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 2.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);

        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(130, now);
        subOsc.frequency.exponentialRampToValueAtTime(20, now + 2.0);
        subGain.gain.setValueAtTime(1.0, now);
        subGain.gain.linearRampToValueAtTime(0.001, now + 2.0);
        subOsc.connect(subGain);
        subGain.connect(dest);
        subOsc.start(now);
        subOsc.stop(now + 2.1);
        break;
      }
    }
  }

  // Play Scene BGM (with bgm_audio.mp3 / win_audio.mp3 / lose_audio.mp3)
  public playBgm(
    type:
      | 'MENU_BGM'
      | 'BANK_BGM'
      | 'SECURITY_BGM'
      | 'VAULT_BGM'
      | 'TENSION_BGM'
      | 'WIN_BGM'
      | 'LOSS_BGM'
  ) {
    if (this.currentBgmType === type) return;
    this.stopBgm();
    this.currentBgmType = type;

    if (!this.settings.musicEnabled) return;

    let targetFile = '/assets/audio/bgm_audio.mp3';
    let isLoop = true;

    if (type === 'WIN_BGM') {
      targetFile = '/assets/audio/win_audio.mp3';
      isLoop = false;
    } else if (type === 'LOSS_BGM') {
      targetFile = '/assets/audio/lose_audio.mp3';
      isLoop = false;
    }

    const audio = new Audio(targetFile);
    audio.volume = this.settings.musicVolume * this.settings.masterVolume;
    audio.loop = isLoop;
    this.currentAudioElement = audio;

    audio
      .play()
      .then(() => {
        this.currentBgmNode = {
          stop: () => {
            audio.pause();
            audio.currentTime = 0;
          },
        };
      })
      .catch(() => {
        // Fallback procedural
        this.ensureContext();
        if (this.ctx && this.musicGain) {
          this.startProceduralBgm(type, this.ctx, this.musicGain);
        }
      });
  }

  private startProceduralBgm(type: string, ctx: AudioContext, dest: GainNode) {
    const activeNodes: OscillatorNode[] = [];
    let isRunning = true;
    let timerId: number | null = null;

    if (type === 'MENU_BGM' || type === 'BANK_BGM') {
      const freqs = [174.61, 207.65, 261.63, 349.23];
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.12, ctx.currentTime);
      droneGain.connect(dest);

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(droneGain);
        osc.start();
        activeNodes.push(osc);
      });
    }

    this.currentBgmNode = {
      stop: () => {
        isRunning = false;
        if (timerId !== null) clearTimeout(timerId);
        activeNodes.forEach((n) => {
          try {
            n.stop();
            n.disconnect();
          } catch {}
        });
      },
    };
  }

  public stopBgm() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (this.currentBgmNode) {
      this.currentBgmNode.stop();
      this.currentBgmNode = null;
    }
    this.currentBgmType = null;
  }
}

export const audioManager = new SoundEngine();
