// Romantic ambient music & sound effect manager using HTML5 Audio & Web Audio API
class RomanticSoundManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;

    // 1. Background Music: User uploaded song.mp3
    this.bgMusic = new Audio('/assets/song.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.4;



    // 3. Birthday Song for Candle Blow
    this.birthdaySong = new Audio('/assets/birthday.mp3');
    this.birthdaySong.volume = 0.7;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle Background Music (song.mp3)
  toggleBgm(onStateChange) {
    if (this.isPlayingMusic) {
      this.stopBgm();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBgm();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startBgm() {
    this.isPlayingMusic = true;
    this.bgMusic.play().catch((e) => console.warn('BGM play failed, usually needs user interaction:', e));
  }

  stopBgm() {
    this.isPlayingMusic = false;
    this.bgMusic.pause();
  }

  // Play Surprise Music (using Web Audio API since no mp3 is provided)
  playSurpriseMusic() {
    this.playSparkleChime();
  }

  // Play Birthday Song
  playBirthdaySong() {
    this.birthdaySong.currentTime = 0;
    this.birthdaySong.play().catch((e) => console.warn('Birthday song play failed:', e));
  }

  // Stop the birthday song and reset it
  stopBirthdaySong() {
    this.birthdaySong.pause();
    this.birthdaySong.currentTime = 0;
  }

  // Special sound effect: Candle blow out (wind noise)
  playCandleBlow() {
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn(e);
    }
  }

  // Play a soft sweet chime note
  playNote(freq, duration = 1.8, delay = 0) {
    this.init();
    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio error', e);
      }
    }, delay * 1000);
  }

  // Special sound effect: Gift unbox chime
  playSparkleChime() {
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((freq, idx) => {
      this.playNote(freq, 1.2, idx * 0.08);
    });
  }

  // Natural, tactile mouse click sound (organic microswitch tap)
  playClick() {
    this.init();
    if (!this.ctx) return;

    // Prevent double clicks within 45ms
    const nowMs = Date.now();
    if (this.lastClickTime && nowMs - this.lastClickTime < 45) {
      return;
    }
    this.lastClickTime = nowMs;

    try {
      const now = this.ctx.currentTime;

      // 1. Ultra-short noise transient (physical mechanical switch texture, ~4ms)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.005);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2800, now);
      noiseFilter.Q.setValueAtTime(1.8, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.045, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Crisp switch snap (rapid descending sine transient, ~8ms)
      const oscSnap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      oscSnap.type = 'sine';
      oscSnap.frequency.setValueAtTime(2200, now);
      oscSnap.frequency.exponentialRampToValueAtTime(800, now + 0.008);

      snapGain.gain.setValueAtTime(0.04, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      oscSnap.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      oscSnap.start(now);
      oscSnap.stop(now + 0.012);

      // 3. Tactile body thump (low-mid resonance of button press, ~20ms)
      const oscBody = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      oscBody.type = 'sine';
      oscBody.frequency.setValueAtTime(260, now);
      oscBody.frequency.exponentialRampToValueAtTime(110, now + 0.018);

      bodyGain.gain.setValueAtTime(0.055, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      oscBody.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);
      oscBody.start(now);
      oscBody.stop(now + 0.025);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }

  // Alias for backward compatibility
  playHeartPop() {
    this.playClick();
  }
}

export const romanticAudio = new RomanticSoundManager();
