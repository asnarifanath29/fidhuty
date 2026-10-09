import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Flame, Sparkles, Video, Upload, Heart, RefreshCw, Volume2, VolumeX, Gift, Wind, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import ChapterPagination from './ChapterPagination';

export default function WishSection({ onNavigate }) {
  // Single real birthday candle on the cake
  const [candleLit, setCandleLit] = useState(true);
  const [candleSmoke, setCandleSmoke] = useState(false);

  const [wishRevealed, setWishRevealed] = useState(false);
  const [videoFile, setVideoFile] = useState('/assets/birthday_video.mp4');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // 3 Surprise Boxes open/close state
  const [openedBoxes, setOpenedBoxes] = useState({
    1: false,
    2: false,
    3: false,
  });

  const gifts = [
    {
      id: 1,
      title: 'Gift 01: The Eternal Promise',
      tag: 'Sacred Vow',
      subtitle: 'From Anfu to Fidhuttyyyy',
      secret: '“I promise to choose you even when things are hard. I promise to hold your hand through every chapter of our lives, to listen to you, protect you, and cherish you forever.”',
      icon: '💍',
      color: '#e2a57f',
    },
    {
      id: 2,
      title: 'Gift 02: Fidhuttyyyy’s Love Coupons',
      tag: 'Special Vouchers',
      subtitle: 'Forever Redeemable',
      secret: '✨ Valid for: 1x Midnight drive with your favorite playlist, 1x Unlimited forehead kisses, 1x Any food you crave whenever you want, and 1x Lifetime of my undivided love.',
      icon: '🎟️',
      color: '#f4c2c2',
    },
    {
      id: 3,
      title: 'Gift 03: The Open Wish Box',
      tag: 'Birthday Grant',
      subtitle: 'Your Royal Wish',
      secret: '“Your wish is my command. Whatever your heart desires on this birthday, name it and I will make it happen for you, my queen Fidhuttyyyy.”',
      icon: '🎁',
      color: '#ffd700',
    },
  ];

  // Confetti trigger
  const triggerBirthdayConfetti = () => {
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#e2a57f', '#f4d3cd', '#ffffff', '#ffd700', '#d97d74'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Blow out candle
  const handleBlowCandle = () => {
    if (!candleLit) return;
    romanticAudio.playCandleBlow();
    setCandleLit(false);
    setCandleSmoke(true);

    setTimeout(() => {
      setCandleSmoke(false);
    }, 2400);

    setTimeout(() => {
      setWishRevealed(true);
      triggerBirthdayConfetti();
      romanticAudio.playBirthdaySong();
    }, 400);
  };

  // Relight candle
  const handleRelightCandle = () => {
    romanticAudio.playClick();
    romanticAudio.stopBirthdaySong();
    setCandleLit(true);
    setCandleSmoke(false);
    setWishRevealed(false);
  };

  // Toggle Surprise Box
  const toggleBox = (id) => {
    setOpenedBoxes((prev) => {
      const isCurrentlyOpen = prev[id];
      if (!isCurrentlyOpen) {
        romanticAudio.playSurpriseMusic();
        confetti({
          particleCount: 50,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#e2a57f', '#ffd700', '#f4d3cd', '#ffffff'],
        });
      } else {
        romanticAudio.playClick();
      }
      return { ...prev, [id]: !isCurrentlyOpen };
    });
  };

  const openAllBoxes = () => {
    romanticAudio.playSurpriseMusic();
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e2a57f', '#ffd700', '#f4d3cd', '#ffffff'],
    });
    setOpenedBoxes({ 1: true, 2: true, 3: true });
  };

  const closeAllBoxes = () => {
    romanticAudio.playClick();
    setOpenedBoxes({ 1: false, 2: false, 3: false });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
      setIsPlayingVideo(false);
    }
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      romanticAudio.playClick();
      videoRef.current.play().then(() => {
        setIsPlayingVideo(true);
      }).catch((err) => {
        console.log('Video play error:', err);
      });
    }
  };

  return (
    <section id="wish" className="relative min-h-screen py-24 px-4 sm:px-6 bg-[#0e0d0c] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e2a57f]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm tracking-[0.35em] text-[#e2a57f] uppercase font-medium mb-3">
            CHAPTER I
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fbf7ee] font-light tracking-wide mb-4">
            A Birthday Wish For <span className="font-script text-5xl sm:text-6xl text-[#f3cbb5] capitalize">Fidhuttyyyy</span>
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mb-4">
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
            <span className="text-[#e2a57f] text-xs">♡</span>
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
          </div>
          <p className="text-sm sm:text-base text-[#d5ccc1] max-w-xl mx-auto font-light leading-relaxed">
            Every smile you share lights up my darkest days. Today is the day the world was blessed with you, my sweet Fidhuttyyyy.
          </p>
        </div>

        {/* 1. Interactive Birthday Cake & Realistic Candle Flame Animation */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/20 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Real Cake Photo with Interactive Candle Flame Setup */}
            <div
              onClick={candleLit ? handleBlowCandle : undefined}
              className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#14100e] cursor-pointer select-none transition-all duration-700 ${candleLit ? 'hover:shadow-[0_0_35px_rgba(226,165,127,0.3)]' : ''
                }`}
            >
              <img
                src="/assets/birthday_cake.jpg?v=2"
                alt="Birthday Cake for Fidhuttyyyy"
                className="w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              {/* Darkening ambient vignette when candle is blown */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${candleLit ? 'bg-gradient-to-t from-black/50 via-transparent to-black/15' : 'bg-black/55'
                  }`}
              ></div>

              {/* Interactive Flame & Smoke directly over the real candle flame (X: 44%, Y: 63%) */}
              <div
                className="absolute left-[44%] top-[63%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                title={candleLit ? 'Click to blow out the candle' : 'Candle extinguished'}
              >
                {candleLit ? (
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Warm Golden Halo */}
                    <span className="absolute w-12 h-12 rounded-full bg-amber-400/25 blur-xs animate-pulse"></span>
                    <span className="absolute w-20 h-20 rounded-full bg-amber-500/15 blur-md"></span>

                    {/* Animated Candle Flame SVG */}
                    <div className="candle-flame relative w-5 h-9 flex items-center justify-center">
                      <svg className="w-5 h-8 filter drop-shadow-[0_0_10px_rgba(255,190,60,0.95)]" viewBox="0 0 24 36" fill="none">
                        <path
                          d="M12 0C12 0 4 12 4 22C4 28 8 34 12 34C16 34 20 28 20 22C20 12 12 0 12 0Z"
                          fill="url(#realFlameGrad)"
                        />
                        <path
                          d="M12 12C12 12 8 18 8 24C8 27 10 30 12 30C14 30 16 27 16 24C16 18 12 12 12 12Z"
                          fill="#ffffff"
                          opacity="0.9"
                        />
                        <defs>
                          <linearGradient id="realFlameGrad" x1="12" y1="0" x2="12" y2="34" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff5a6" />
                            <stop offset="0.3" stopColor="#ffa726" />
                            <stop offset="0.75" stopColor="#ff4500" />
                            <stop offset="1" stopColor="#800000" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                ) : candleSmoke ? (
                  /* Smoke Trail Effect when blown out */
                  <div className="candle-smoke flex flex-col items-center">
                    <span className="w-2 h-10 bg-gradient-to-t from-gray-400/70 via-gray-300/40 to-transparent rounded-full blur-xs"></span>
                  </div>
                ) : null}
              </div>

              {/* Status Pill Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs flex items-center gap-2">
                {candleLit ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    <span className="text-amber-300 font-medium flex items-center gap-1">
                      <Flame size={13} className="text-amber-400" /> Candle is burning bright
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-emerald-300 font-medium flex items-center gap-1">
                      ✨ Wish sent to the heavens!
                    </span>
                  </>
                )}
              </div>

              {/* In-cake overlay text */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="font-handwriting text-2xl text-[#f3cbb5] drop-shadow-md">
                  {candleLit ? "Make a wish & click candle to blow it out..." : "Your wish has been heard, Fidhuttyyyy! ♡"}
                </p>
              </div>
            </div>

            {/* Candle Controls & Wish Reveal Card */}
            <div className="flex flex-col justify-center text-left space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#e2a57f] font-semibold">
                  Interactive Birthday Ritual
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] mt-1 mb-3">
                  Make A Wish, Fidhuttyyyy
                </h3>
                <p className="text-sm text-[#d5ccc1] leading-relaxed">
                  Close your eyes, hold your hands together, and think of your deepest wish for this new year of your life. Click the candle or the button below to blow it out!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {candleLit ? (
                  <button
                    onClick={handleBlowCandle}
                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e2a57f] to-[#d97d74] text-white font-medium text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(226,165,127,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Wind size={16} className="animate-pulse" />
                    <span>Blow Out Candle 🎂</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRelightCandle}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#fbf7ee] font-medium text-xs sm:text-sm tracking-wider transition-all border border-white/20 cursor-pointer"
                  >
                    <RefreshCw size={15} />
                    <span>Relight Candle ✨</span>
                  </button>
                )}

                <button
                  onClick={triggerBirthdayConfetti}
                  className="p-3 rounded-full bg-white/5 hover:bg-[#e2a57f]/20 border border-white/10 text-[#e2a57f] transition-all hover:scale-110 cursor-pointer"
                  title="Celebrate with confetti"
                >
                  <Sparkles size={18} />
                </button>
              </div>

              {/* Wish Letter Reveal Box */}
              {wishRevealed && (
                <div className="bg-[#1c1815] border border-[#e2a57f]/40 p-6 rounded-2xl animate-scaleUp shadow-2xl relative">
                  <div className="flex items-center gap-2 text-[#e2a57f] text-xs uppercase tracking-widest font-semibold mb-2">
                    <Heart size={14} fill="#e2a57f" />
                    <span>My Birthday Message To You</span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-[#fbf7ee] italic leading-relaxed">
                    "Happy Birthday, Fidhuttyyyy! May this year bring you boundless happiness, peaceful moments, and all the sweet joys your gentle soul deserves. Whatever comes our way, remember that I am always here, loving you more with each passing breath."
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#e2a57f] pt-2 border-t border-white/10 font-handwriting text-xl">
                    <span>Forever by your side</span>
                    <span>All my love, Anfu ♡</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 2. Birthday Surprise Boxes */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/25 relative bg-gradient-to-b from-[#181413] to-[#120f0e]">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-2">
              <Gift size={13} /> 3 Special Surprises
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              Birthday Surprise Boxes
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md mx-auto mt-1 font-light">
              Tap any surprise box below to unwrap Anfu's secret gifts for you ♡
            </p>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={openAllBoxes}
                className="px-4 py-2 rounded-full bg-[#e2a57f]/20 hover:bg-[#e2a57f]/30 border border-[#e2a57f]/40 text-[#f3cbb5] text-xs font-medium tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={13} className="text-[#ffd700]" />
                <span>Open All 3 Gifts 🎁</span>
              </button>
              <button
                type="button"
                onClick={closeAllBoxes}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#d5ccc1] hover:text-white text-xs font-medium tracking-wider uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} />
                <span>Close All</span>
              </button>
            </div>
          </div>

          {/* 3 Simple, Beautiful, Fast Surprise Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gifts.map((gift) => {
              const isOpen = openedBoxes[gift.id];
              return (
                <div
                  key={gift.id}
                  className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                    isOpen
                      ? 'bg-[#1e1714] border-[#e2a57f] shadow-[0_15px_40px_rgba(226,165,127,0.25)]'
                      : 'bg-[#151110] border-[#e2a57f]/30 hover:border-[#e2a57f]/70 hover:-translate-y-1'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="p-5 pb-3 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{gift.icon}</span>
                      <span className="font-mono text-xs font-bold tracking-widest text-[#e2a57f] uppercase">
                        BOX 0{gift.id}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-white/5 border border-white/10 text-[#d5ccc1]">
                      {gift.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#fbf7ee] font-medium mb-1">
                        {gift.title}
                      </h4>
                      <p className="text-xs text-[#a99e91] mb-4 font-light">
                        {gift.subtitle}
                      </p>

                      {/* Unwrapped Message */}
                      {isOpen ? (
                        <div className="p-4 rounded-xl bg-[#120d0b] border border-[#e2a57f]/40 text-[#f3cbb5] animate-scaleUp shadow-inner relative select-text">
                          <div className="text-[10px] font-mono text-[#e2a57f] tracking-widest uppercase mb-1.5 flex items-center gap-1">
                            <Sparkles size={11} /> Unwrapped Gift:
                          </div>
                          <p className="font-handwriting text-2xl leading-relaxed text-[#fdf0e6]">
                            {gift.secret}
                          </p>
                        </div>
                      ) : (
                        <div
                          onClick={() => toggleBox(gift.id)}
                          className="p-6 rounded-xl bg-[#1a1412] border border-dashed border-[#e2a57f]/30 text-center cursor-pointer hover:bg-[#221a17] transition-all group"
                        >
                          <div className="w-14 h-14 mx-auto rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-2">
                            🎁
                          </div>
                          <span className="text-xs font-medium text-[#e2a57f] tracking-wider uppercase">
                            Click to Unwrap Box
                          </span>
                          <p className="text-[11px] text-[#8e8276] mt-1 font-light">
                            Contains a special surprise from Anfu
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Button Action */}
                    <button
                      type="button"
                      onClick={() => toggleBox(gift.id)}
                      className={`w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isOpen
                          ? 'bg-white/10 hover:bg-white/15 text-[#fbf7ee] border border-white/15'
                          : 'bg-gradient-to-r from-[#e2a57f] to-[#f3cbb5] text-[#14100d] hover:brightness-110 shadow-md'
                      }`}
                    >
                      {isOpen ? (
                        <>
                          <RefreshCw size={12} />
                          <span>Close Box 0{gift.id}</span>
                        </>
                      ) : (
                        <>
                          <Gift size={13} />
                          <span>Unwrap Box 0{gift.id} ♡</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Birthday Reel Showcase (Smartphone / Reel Format 9:16) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#e2a57f]/20 relative">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-3">
              <Video size={13} /> Birthday Reel Tribute
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              Fidhuttyyyy's Birthday Reel
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md mx-auto mt-2 font-light">
              A vertical celebration reel created especially for you ♡
            </p>
          </div>

          {/* Smartphone / Reel Frame (Vertical 9:16) */}
          <div className="relative max-w-[320px] sm:max-w-[360px] mx-auto">
            {/* Outer Luxury Phone Body Border */}
            <div className="relative rounded-[2.8rem] p-3 sm:p-3.5 bg-gradient-to-b from-[#2e241f] via-[#1a1411] to-[#0e0c0b] border-2 border-[#e2a57f]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(226,165,127,0.2)]">

              {/* Dynamic Top Speaker / Camera Notch */}
              <div className="flex items-center justify-center gap-2 mb-2.5">
                <div className="w-16 h-3 bg-black/80 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e2a57f]/60"></span>
                </div>
              </div>

              {/* Reel Screen Display (aspect-[9/16]) */}
              <div
                onClick={toggleVideoPlay}
                className="relative aspect-[9/16] w-full rounded-[2.2rem] overflow-hidden bg-black cursor-pointer group shadow-inner select-none"
              >
                <video
                  ref={videoRef}
                  src={videoFile}
                  playsInline
                  loop
                  onPlay={() => setIsPlayingVideo(true)}
                  onPause={() => setIsPlayingVideo(false)}
                  onEnded={() => setIsPlayingVideo(false)}
                  className="w-full h-full object-cover"
                />

                {/* Reel Header Floating Info (Top bar inside video) */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] text-white font-mono tracking-wider">REEL • FOR FIDHUTTYYYY</span>
                  </div>

                  {/* Audio Mute/Unmute toggle (clickable) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        videoRef.current.muted = !videoRef.current.muted;
                        setIsVideoMuted(videoRef.current.muted);
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center pointer-events-auto border border-white/15 transition-transform active:scale-90"
                    title={isVideoMuted ? "Unmute" : "Mute"}
                  >
                    {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>

                {/* Paused Overlay: Glowing Reel Play Button */}
                {!isPlayingVideo && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-all">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#e2a57f] text-[#14100d] flex items-center justify-center shadow-[0_0_35px_rgba(226,165,127,0.8)] transform group-hover:scale-110 active:scale-95 transition-all">
                      <Play size={32} className="ml-1 fill-current" />
                    </div>
                    <span className="mt-4 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#fbf7ee] text-xs font-medium tracking-wider border border-[#e2a57f]/40 shadow-lg">
                      Tap to Watch Reel ♡
                    </span>
                  </div>
                )}

                {/* Playing Bottom Reel Details (Instagram Reel Style) */}
                <div className="absolute bottom-4 inset-x-4 z-20 flex items-end justify-between pointer-events-none">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#e2a57f] flex items-center justify-center text-[10px] font-bold text-black">
                        ♡
                      </span>
                      <span className="text-xs font-semibold text-white drop-shadow-md">
                        fidhuttyyyy
                      </span>
                    </div>
                    <p className="text-[11px] text-[#fbf7ee] drop-shadow-md line-clamp-2 font-light">
                      Happy Birthday to my favorite girl in the entire world ✨
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#e2a57f] mt-1 drop-shadow-sm font-mono">
                      <span>🎵</span>
                      <span className="truncate">Birthday Celebration • Special Melody</span>
                    </div>
                  </div>

                  {/* Reel floating hearts button */}
                  <div className="flex flex-col items-center gap-3 pointer-events-auto">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors">
                      <Heart size={18} fill="#e2a57f" className="text-[#e2a57f]" />
                    </div>
                  </div>
                </div>

                {/* Subtle Bottom Progress Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10"></div>
              </div>

              {/* Bottom Phone Chin Home Bar */}
              <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-3"></div>
            </div>
          </div>
        </div>

        {/* Page-wise Navigation */}
        <ChapterPagination currentPage="wish" onNavigate={onNavigate} />

      </div>
    </section>
  );
}
