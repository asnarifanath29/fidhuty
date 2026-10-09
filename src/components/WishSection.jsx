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

  // Real Photo Gift Box Modal State
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState(1);

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

  // Open / Close Gift Modal
  const handleOpenGiftModal = (id = 1) => {
    romanticAudio.playSurpriseMusic();
    setSelectedGiftId(id);
    setIsGiftModalOpen(true);
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e2a57f', '#ffd700', '#f4d3cd', '#ffffff'],
    });
  };

  const handleCloseGiftModal = () => {
    romanticAudio.playClick();
    setIsGiftModalOpen(false);
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
              className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#14100e] cursor-pointer select-none transition-all duration-700 ${
                candleLit ? 'hover:shadow-[0_0_35px_rgba(226,165,127,0.3)]' : ''
              }`}
            >
              <img
                src="/assets/birthday_cake.jpg?v=2"
                alt="Birthday Cake for Fidhuttyyyy"
                className="w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              {/* Darkening ambient vignette when candle is blown */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                  candleLit ? 'bg-gradient-to-t from-black/50 via-transparent to-black/15' : 'bg-black/55'
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

        {/* 2. Unbox With Fidhuttyyyy: Real Luxury Gift Box Showcase */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/25 relative bg-gradient-to-b from-[#181413] to-[#120f0e]">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-2">
              <Gift size={13} /> Special Birthday Surprise
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              Birthday Surprise Box
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md mx-auto mt-1 font-light">
              Untie the silk ribbons to unwrap your 3 secret birthday surprises.
            </p>
          </div>

          {/* Real Photo Luxury Gift Card */}
          <div
            onClick={() => handleOpenGiftModal(1)}
            className="group relative max-w-3xl mx-auto rounded-3xl overflow-hidden border border-[#e2a57f]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:border-[#e2a57f] hover:shadow-[0_25px_70px_rgba(226,165,127,0.35)] hover:-translate-y-1 select-none"
          >
            {/* Real Photograph with Candlelight & Ribbons */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#161210]">
              <img
                src="/assets/romantic_gift.jpg"
                alt="Romantic Birthday Gift Box"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"></div>

              {/* Shimmer on Hover */}
              <div className="absolute inset-0 bg-radial from-[#e2a57f]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e2a57f]/40 text-[11px] text-[#f3cbb5] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles size={12} className="text-[#e2a57f]" />
                <span>3 SECRET SURPRISES INSIDE</span>
              </div>

              {/* Center Open Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="transform group-hover:scale-110 active:scale-95 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#e2a57f] to-[#f3cbb5] text-[#14100d] flex items-center justify-center shadow-[0_0_35px_rgba(226,165,127,0.7)] mx-auto mb-3">
                    <Gift size={34} className="text-[#14100d]" />
                  </div>
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/85 backdrop-blur-md text-[#fbf7ee] text-xs sm:text-sm font-medium tracking-wider uppercase border border-[#e2a57f]/60 shadow-xl group-hover:bg-[#1f1714] group-hover:border-[#e2a57f]">
                    <span>Untie Ribbon & Open ♡</span>
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#f3cbb5] drop-shadow-md tracking-wide">
                  Click to reveal your personal love promises and coupons
                </p>
              </div>
            </div>
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
              A special celebration video crafted with love for Fidhuttyyyy.
            </p>
          </div>

          {/* Cinema Frame */}
          <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black border border-[#e2a57f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group">
            {videoFile ? (
              <>
                <video
                  ref={videoRef}
                  src={videoFile}
                  controls
                  playsInline
                  onPlay={() => setIsPlayingVideo(true)}
                  onPause={() => setIsPlayingVideo(false)}
                  onEnded={() => setIsPlayingVideo(false)}
                  className="w-full h-full object-contain bg-black"
                />
                {!isPlayingVideo && (
                  <div
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30 group/btn"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#e2a57f] hover:bg-[#f3cbb5] text-[#14100d] flex items-center justify-center shadow-[0_0_30px_rgba(226,165,127,0.6)] group-hover/btn:scale-110 active:scale-95 transition-all">
                      <Play size={32} className="ml-1 fill-current" />
                    </div>
                    <p className="mt-4 text-sm font-serif italic text-[#fbf7ee] tracking-wider drop-shadow-md">
                      Play Celebration Video ♡
                    </p>
                  </div>
                )}
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
        </div>

        {/* Page-wise Navigation */}
        <ChapterPagination currentPage="wish" onNavigate={onNavigate} />

      </div>

      {/* Real Photo Gift Box Modal: Full Romantic Keepsake Letter Modal */}
      {isGiftModalOpen && (
        <div
          onClick={handleCloseGiftModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            className="relative w-full max-w-2xl bg-[#191412] border border-[#e2a57f]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Golden Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e2a57f]/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={handleCloseGiftModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#e2a57f] hover:text-[#14100d] text-[#fbf7ee] flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10"
              aria-label="Close Surprise Modal"
            >
              <X size={18} />
            </button>

            {/* Modal Top Header */}
            <div className="text-center mb-6 pr-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[10px] tracking-widest uppercase font-semibold mb-2">
                <Gift size={12} /> Unboxed With Love
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf7ee] font-light">
                Surprises For Fidhuttyyyy
              </h3>
            </div>

            {/* 3 Gift Tabs */}
            <div className="flex items-center justify-center gap-2 mb-6 border-b border-white/10 pb-4">
              {gifts.map((g) => {
                const isActive = selectedGiftId === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      romanticAudio.playHeartPop();
                      setSelectedGiftId(g.id);
                    }}
                    className={`flex-1 py-2 px-2 sm:px-4 rounded-xl text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                      isActive
                        ? 'bg-[#e2a57f] text-[#14100d] font-semibold border-[#e2a57f] shadow-md'
                        : 'bg-[#14100e] text-[#d5ccc1] border-white/10 hover:border-[#e2a57f]/40 hover:text-white'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span className="hidden sm:inline">Gift 0{g.id}</span>
                    <span className="text-[11px] opacity-90 truncate">{g.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Gift Keepsake Parchment Display */}
            {(() => {
              const currentGift = gifts.find((g) => g.id === selectedGiftId) || gifts[0];
              return (
                <div className="animate-fadeIn">
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#140e0b] border border-[#e2a57f]/40 shadow-inner relative overflow-hidden">
                    {/* Top Ribbon Stripe */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#b37d46] via-[#ffd89b] to-[#b37d46]"></div>

                    <div className="flex items-center justify-between mb-3 pt-1 border-b border-[#e2a57f]/20 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{currentGift.icon}</span>
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#e2a57f] uppercase font-bold block">
                            GIFT 0{currentGift.id} • {currentGift.tag}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#fbf7ee] font-medium leading-tight">
                            {currentGift.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#a99e91] font-light mb-4">
                      {currentGift.subtitle}
                    </p>

                    {/* Handwritten Heartfelt Message */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#1c1613] border border-[#e2a57f]/25">
                      <p className="font-handwriting text-2xl sm:text-3xl text-[#f3cbb5] leading-relaxed">
                        {currentGift.secret}
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="mt-4 flex items-center justify-between text-xs text-[#e2a57f] pt-1">
                      <span className="font-mono text-[10px] tracking-widest uppercase">
                        SEALED WITH LOVE ♡
                      </span>
                      <span className="font-serif italic text-sm text-[#fbf7ee]">
                        — Forever Yours, Anfu
                      </span>
                    </div>
                  </div>

                  {/* Modal Bottom Navigation */}
                  <div className="mt-6 flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => {
                        romanticAudio.playClick();
                        setSelectedGiftId((prev) => (prev > 1 ? prev - 1 : 3));
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#d5ccc1] hover:text-white border border-white/10 cursor-pointer transition-colors"
                    >
                      <ChevronLeft size={14} />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={handleCloseGiftModal}
                      className="text-[#a99e91] hover:text-[#fbf7ee] text-xs underline underline-offset-4 cursor-pointer py-1"
                    >
                      Fold & Close Box
                    </button>

                    <button
                      onClick={() => {
                        romanticAudio.playClick();
                        setSelectedGiftId((prev) => (prev < 3 ? prev + 1 : 1));
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#e2a57f] hover:bg-[#f3cbb5] text-[#14100d] font-semibold cursor-pointer transition-colors shadow-md"
                    >
                      <span>Next Surprise</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
