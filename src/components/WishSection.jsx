import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Flame, Sparkles, Video, Upload, Heart, RefreshCw, Volume2, VolumeX, Gift, Wind } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import ChapterPagination from './ChapterPagination';

export default function WishSection({ onNavigate }) {
  // Candles state: 5 candles on the cake
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, smoke: false, left: '26%', delay: '0s' },
    { id: 2, isLit: true, smoke: false, left: '38%', delay: '0.2s' },
    { id: 3, isLit: true, smoke: false, left: '50%', delay: '0.4s' },
    { id: 4, isLit: true, smoke: false, left: '62%', delay: '0.1s' },
    { id: 5, isLit: true, smoke: false, left: '74%', delay: '0.3s' },
  ]);

  const [wishRevealed, setWishRevealed] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // 3 Interactive Birthday Gift Boxes state
  const [openedGifts, setOpenedGifts] = useState({
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

  // Blow out an individual candle
  const blowCandle = (id) => {
    romanticAudio.playCandleBlow();
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: false, smoke: true } : c))
    );

    setTimeout(() => {
      setCandles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, smoke: false } : c))
      );
    }, 1800);

    // Check if all candles are now out
    setTimeout(() => {
      setCandles((current) => {
        const remainingLit = current.filter((c) => c.isLit);
        if (remainingLit.length === 0) {
          setWishRevealed(true);
          triggerBirthdayConfetti();
          romanticAudio.playBirthdaySong();
        }
        return current;
      });
    }, 200);
  };

  // Blow out all candles at once
  const handleBlowAllCandles = () => {
    romanticAudio.playCandleBlow();
    setCandles((prev) =>
      prev.map((c) => ({ ...c, isLit: false, smoke: true }))
    );

    setTimeout(() => {
      setWishRevealed(true);
      triggerBirthdayConfetti();
      romanticAudio.playBirthdaySong();
    }, 500);

    setTimeout(() => {
      setCandles((prev) => prev.map((c) => ({ ...c, smoke: false })));
    }, 2200);
  };

  // Relight all candles
  const handleRelightCandles = () => {
    romanticAudio.playHeartPop();
    romanticAudio.stopBirthdaySong();
    setCandles((prev) =>
      prev.map((c) => ({ ...c, isLit: true, smoke: false }))
    );
    setWishRevealed(false);
  };

  // Toggle Gift Box
  const toggleGiftBox = (id) => {
    romanticAudio.playSurpriseMusic();
    setOpenedGifts((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        confetti({
          particleCount: 45,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#e2a57f', '#ffd700', '#f4d3cd', '#ffffff'],
        });
      }
      return next;
    });
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
      videoRef.current.play();
      setIsPlayingVideo(true);
    }
  };

  const anyCandlesLit = candles.some((c) => c.isLit);

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
            
            {/* Cake Photo with Interactive Candle Setup */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#14100e]">
              <img
                src="/assets/birthday_cake.jpg"
                alt="Birthday Cake for Fidhuttyyyy"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Darkening ambient vignette */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                  anyCandlesLit ? 'bg-gradient-to-t from-black/60 via-transparent to-black/20' : 'bg-black/45'
                }`}
              ></div>

              {/* Individual Interactive Candles Overlay over the cake */}
              <div className="absolute top-[28%] left-[22%] right-[22%] h-24 pointer-events-auto flex items-end justify-between px-2">
                {candles.map((candle) => (
                  <div
                    key={candle.id}
                    onClick={() => candle.isLit && blowCandle(candle.id)}
                    className="relative flex flex-col items-center cursor-pointer group/candle select-none"
                    title={candle.isLit ? 'Click to blow out this candle' : 'Candle extinguished'}
                  >
                    {/* Glowing Candle Flame */}
                    {candle.isLit ? (
                      <div
                        className="candle-flame relative w-4 h-8 flex items-center justify-center"
                        style={{ animationDelay: candle.delay }}
                      >
                        {/* Outer warm halo */}
                        <span className="absolute w-7 h-7 rounded-full bg-amber-500/30 blur-xs"></span>
                        {/* Main SVG Flame */}
                        <svg className="w-4 h-7 filter drop-shadow-[0_0_8px_rgba(255,180,50,0.9)]" viewBox="0 0 24 36" fill="none">
                          <path
                            d="M12 0C12 0 4 12 4 22C4 28 8 34 12 34C16 34 20 28 20 22C20 12 12 0 12 0Z"
                            fill="url(#flameGrad)"
                          />
                          <path
                            d="M12 12C12 12 8 18 8 24C8 27 10 30 12 30C14 30 16 27 16 24C16 18 12 12 12 12Z"
                            fill="#ffffff"
                            opacity="0.85"
                          />
                          <defs>
                            <linearGradient id="flameGrad" x1="12" y1="0" x2="12" y2="34" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#ffe680" />
                              <stop offset="0.35" stopColor="#ff9900" />
                              <stop offset="0.8" stopColor="#ff3b00" />
                              <stop offset="1" stopColor="#800000" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    ) : (
                      /* Smoke Trail Effect when blown out */
                      candle.smoke ? (
                        <div className="candle-smoke w-4 h-10 flex items-center justify-center">
                          <span className="w-1.5 h-6 bg-gradient-to-t from-gray-400 to-transparent rounded-full blur-xs"></span>
                        </div>
                      ) : (
                        <div className="w-4 h-4"></div>
                      )
                    )}

                    {/* Candle Wick */}
                    <div className="w-[1.5px] h-2 bg-neutral-900 rounded-full mt-[-1px]"></div>

                    {/* Candle Stick */}
                    <div className="w-2.5 h-12 bg-gradient-to-b from-[#fdfbf7] via-[#f5ecd8] to-[#e8d8be] rounded-xs shadow-md border-x border-[#d8c3a1]/40 flex flex-col justify-between py-1">
                      <span className="w-full h-[1px] bg-amber-400/20"></span>
                      <span className="w-full h-[1px] bg-amber-400/20"></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Pill Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs flex items-center gap-2">
                {anyCandlesLit ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    <span className="text-amber-300 font-medium flex items-center gap-1">
                      <Flame size={13} className="text-amber-400" /> Candles are burning bright
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
                  {anyCandlesLit ? "Make a wish & click candles to blow them out..." : "Your wish has been heard, Fidhuttyyyy! ♡"}
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
                  Close your eyes, hold your hands together, and think of your deepest wish for this new year of your life. Click the candles or the button below to blow them out!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {anyCandlesLit ? (
                  <button
                    onClick={handleBlowAllCandles}
                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e2a57f] to-[#d97d74] text-white font-medium text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(226,165,127,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Wind size={16} className="animate-pulse" />
                    <span>Blow Out All Candles 🎂</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRelightCandles}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#fbf7ee] font-medium text-xs sm:text-sm tracking-wider transition-all border border-white/20 cursor-pointer"
                  >
                    <RefreshCw size={15} />
                    <span>Relight Candles ✨</span>
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

        {/* 2. Unbox With Fidhuttyyyy: Birthday Surprise Boxes (Moved & Enhanced here!) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/25 relative bg-gradient-to-b from-[#181413] to-[#120f0e]">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-2">
              <Gift size={13} /> Unbox With Fidhuttyyyy
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              Birthday Surprise Boxes
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md mx-auto mt-1 font-light">
              Untie the silk ribbons and click each gift box to reveal your special birthday surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {gifts.map((gift) => {
              const isOpened = openedGifts[gift.id];
              return (
                <div
                  key={gift.id}
                  onClick={() => toggleGiftBox(gift.id)}
                  className={`group relative cursor-pointer rounded-2xl p-6 transition-all duration-500 border select-none ${
                    isOpened
                      ? 'bg-[#221b18] border-[#e2a57f] shadow-[0_15px_40px_rgba(226,165,127,0.3)] transform -translate-y-1'
                      : 'bg-[#181412] border-white/10 hover:border-[#e2a57f]/50 hover:bg-[#1f1916] gift-box-closed shadow-lg'
                  }`}
                >
                  {/* Closed State: 3D Luxury Gift Box with Bow and Ribbon */}
                  {!isOpened ? (
                    <div className="flex flex-col items-center text-center py-4">
                      {/* 3D Box Illustration Container */}
                      <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                        {/* Box Body */}
                        <div className="w-24 h-20 bg-gradient-to-br from-[#f8f5ef] to-[#e8ded0] rounded-md shadow-xl border border-[#d8caa8] relative overflow-hidden flex items-center justify-center">
                          {/* Vertical Ribbon */}
                          <div className="absolute inset-y-0 w-4 bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#b8860b] shadow-xs"></div>
                          {/* Horizontal Ribbon */}
                          <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-[#d4af37] via-[#ffd700] to-[#b8860b] shadow-xs"></div>
                          
                          {/* Wax Seal / Tag */}
                          <div className="relative z-10 w-9 h-9 rounded-full bg-[#8d2b38] border-2 border-[#ffd700] flex items-center justify-center text-white shadow-md">
                            <span className="text-xs font-serif font-bold">0{gift.id}</span>
                          </div>
                        </div>

                        {/* Box Lid */}
                        <div className="absolute top-2 w-26 h-6 bg-gradient-to-r from-[#ffffff] via-[#f7f2e7] to-[#ebe1cf] rounded-sm shadow-md border border-[#d8caa8] flex items-center justify-center">
                          {/* Silk Ribbon Bow on top */}
                          <div className="absolute -top-3 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full border-2 border-[#ffd700] bg-[#e6b800]/80 -rotate-45 shadow-xs"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffd700] z-10 shadow-xs"></div>
                            <div className="w-4 h-4 rounded-full border-2 border-[#ffd700] bg-[#e6b800]/80 rotate-45 shadow-xs"></div>
                          </div>
                        </div>
                      </div>

                      {/* Title & Tag */}
                      <span className="text-[10px] tracking-widest uppercase font-mono text-[#e2a57f] mb-1">
                        {gift.tag}
                      </span>
                      <h4 className="font-serif text-xl text-[#fbf7ee] font-medium mb-1">
                        {gift.title}
                      </h4>
                      <p className="text-xs text-[#a99e91] font-light">
                        {gift.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/5 w-full text-xs text-[#e2a57f] flex items-center justify-center gap-1 group-hover:scale-105 transition-transform">
                        <span>Click to Open Ribbon 🎀</span>
                      </div>
                    </div>
                  ) : (
                    /* Opened State: Unboxed Letter Reveal */
                    <div className="animate-fadeIn relative py-2">
                      {/* Golden radiance background effect */}
                      <div className="gold-rays absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/15 rounded-full blur-xl pointer-events-none"></div>

                      <div className="flex items-center justify-between mb-3 border-b border-[#e2a57f]/25 pb-2">
                        <span className="text-3xl">{gift.icon}</span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium bg-[#e2a57f]/20 text-[#e2a57f]">
                          Unwrapped ✨
                        </span>
                      </div>

                      <h4 className="font-serif text-xl sm:text-2xl text-[#fbf7ee] mb-2 font-medium">
                        {gift.title}
                      </h4>

                      <div className="mt-3 p-4 rounded-xl bg-[#171311] border border-[#e2a57f]/30">
                        <p className="font-handwriting text-2xl text-[#f3cbb5] leading-relaxed">
                          {gift.secret}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-[#a99e91]">
                        <span className="text-[10px] text-[#e2a57f] tracking-widest font-mono">
                          ALL MY LOVE FOR FIDHUTTYYYY ♡
                        </span>
                        <span className="text-[#a99e91] hover:text-white text-[11px]">
                          Tap to repack 📦
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. AI Birthday Video Showcase */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#e2a57f]/20 relative">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-3">
              <Video size={13} /> Special Tribute Video
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              Fidhuttyyyy's Birthday Cinema
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-lg mx-auto mt-2">
              (Ready for your AI video! Upload or replace your video file below anytime.)
            </p>
          </div>

          {/* Cinema Frame */}
          <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black/90 border border-[#e2a57f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
            {videoFile ? (
              <>
                <video
                  ref={videoRef}
                  src={videoFile}
                  className="w-full h-full object-cover"
                  loop
                  muted={isVideoMuted}
                  playsInline
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-4 rounded-full bg-[#e2a57f] text-black hover:scale-110 transition-transform shadow-lg cursor-pointer"
                  >
                    {isPlayingVideo ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsVideoMuted(!isVideoMuted);
                      if (videoRef.current) videoRef.current.muted = !isVideoMuted;
                    }}
                    className="p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-radial from-[#241c17] to-[#0c0a09]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e2a57f]/10 border border-[#e2a57f]/40 flex items-center justify-center mb-4 relative">
                  <Heart size={36} className="text-[#e2a57f] animate-heart-pulse" fill="#e2a57f" />
                  <span className="absolute inset-0 rounded-full border border-[#e2a57f]/30 animate-ping opacity-30"></span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-[#fbf7ee] tracking-wide mb-2">
                  AI Birthday Video for Fidhuttyyyy
                </h4>
                <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md font-light mb-5">
                  Slot reserved for the AI generated celebration video. Click below to load your video file now or anytime later!
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e2a57f]/20 hover:bg-[#e2a57f] text-[#fbf7ee] hover:text-[#181514] font-medium text-xs tracking-widest uppercase transition-all duration-300 border border-[#e2a57f]/50 cursor-pointer shadow-lg"
                >
                  <Upload size={14} />
                  <span>Choose Video File (.mp4 / .webm)</span>
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#a99e91] max-w-3xl mx-auto px-2">
            <span>✨ Supports MP4, WebM, 1080p AI Video</span>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[#e2a57f] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Upload size={12} /> {videoFile ? 'Replace with new video' : 'Upload video here'}
            </button>
          </div>
        </div>

        {/* Page-wise Navigation */}
        <ChapterPagination currentPage="wish" onNavigate={onNavigate} />

      </div>
    </section>
  );
}
