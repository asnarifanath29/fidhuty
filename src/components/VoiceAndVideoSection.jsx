import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic, Video, Upload, Heart, Lock, Unlock, Sparkles, Volume2 } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';
import ChapterPagination from './ChapterPagination';

export default function VoiceAndVideoSection({ onNavigate }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [personalVideoUrl, setPersonalVideoUrl] = useState(null);
  const [isLockedForever, setIsLockedForever] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const audioRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Audio simulation timer if no audio file uploaded yet
  useEffect(() => {
    let timer;
    if (isPlayingAudio && !audioUrl) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, audioUrl]);

  const toggleVoiceNote = () => {
    if (audioUrl && audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    } else {
      // Synthesized gentle voice note melody preview
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
      } else {
        setIsPlayingAudio(true);
        romanticAudio.playNote(440, 2);
        setTimeout(() => romanticAudio.playNote(523.25, 2), 600);
        setTimeout(() => romanticAudio.playNote(659.25, 2.5), 1200);
      }
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setIsPlayingAudio(false);
      setAudioProgress(0);
      romanticAudio.playSparkleChime();
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonalVideoUrl(url);
      romanticAudio.playSparkleChime();
    }
  };

  const handleForeverLock = () => {
    romanticAudio.playSparkleChime();
    setIsLockedForever(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e2a57f', '#ffd700', '#f4d3cd', '#ff69b4'],
    });
  };

  return (
    <section id="voice" className="relative min-h-screen py-24 px-4 sm:px-6 bg-[#0a0908] text-white">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#e2a57f]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm tracking-[0.35em] text-[#e2a57f] uppercase font-medium mb-3">
            CHAPTER III
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fbf7ee] font-light tracking-wide mb-4">
            My Voice & <span className="font-script text-5xl sm:text-6xl text-[#f3cbb5]">Heart For Fidhuttyyyy</span>
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mb-4">
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
            <span className="text-[#e2a57f] text-xs">♡</span>
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
          </div>
          <p className="text-sm sm:text-base text-[#d5ccc1] max-w-xl mx-auto font-light">
            Sometimes words typed on a screen aren't enough. Here is my voice and my deepest dedication for you.
          </p>
        </div>

        {/* 1. Voice Note Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Audio Player Card */}
            <div className="w-full md:w-1/2 bg-[#171412] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/40 flex items-center justify-center mb-4 text-[#e2a57f]">
                <Mic size={28} className={isPlayingAudio ? 'animate-pulse' : ''} />
              </div>

              <h3 className="font-serif text-2xl text-[#fbf7ee] mb-1">
                A Voice Note For Fidhuttyyyy
              </h3>
              <p className="text-xs text-[#a99e91] mb-6">
                {audioUrl ? 'Personal Voice Recording Loaded' : 'Click Play to listen to my dedication message'}
              </p>

              {/* Soundwave Visualizer Bars */}
              <div className="w-full flex items-center justify-center gap-1.5 h-12 mb-6 px-4">
                {[40, 65, 85, 45, 95, 70, 50, 80, 100, 60, 45, 75, 90, 55, 35, 70].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? 'bg-gradient-to-t from-[#e2a57f] to-[#f4d3cd]'
                        : 'bg-white/20'
                    }`}
                    style={{
                      height: isPlayingAudio ? `${Math.max(15, (h * Math.random()).toFixed(0))}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleVoiceNote}
                  className="px-7 py-3 rounded-full bg-[#e2a57f] text-[#14100d] font-semibold text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#f3cbb5] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(226,165,127,0.4)]"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause size={16} /> Pause Note
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="#14100d" /> Listen Now
                    </>
                  )}
                </button>

                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#d5ccc1] hover:text-white transition-colors"
                  title="Upload voice recording audio file"
                >
                  <Upload size={16} />
                </button>
              </div>

              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />

              {audioUrl && (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlayingAudio(false)}
                  className="hidden"
                />
              )}
            </div>

            {/* Handwritten Spoken Transcript / Letter */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#151210]/60 rounded-2xl border border-white/5 text-left">
              <span className="text-[11px] uppercase tracking-widest text-[#e2a57f] font-semibold">
                Spoken From The Heart
              </span>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#f3cbb5] leading-relaxed space-y-3 mt-3">
                <p>
                  "To my gorgeous Fidhuttyyyy,
                </p>
                <p>
                  I don't think you realize just how much peace you bring into my life. Every time I hear your voice, every time your eyes light up with that sweet smile, I am reminded of how beautiful life is with you in it."
                </p>
                <p>
                  "You are my girl, my best friend, and my endless love. Happy Birthday, my sweetheart."
                </p>
                <p className="text-right text-[#e2a57f] font-serif italic text-lg pt-2">
                  — Always yours ♡
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Personal Video Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-[#e2a57f]/20">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2a57f]/15 border border-[#e2a57f]/30 text-[#e2a57f] text-[11px] tracking-widest uppercase font-semibold mb-2">
              <Video size={13} /> Dedicated Video
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light">
              A Personal Video For Fidhuttyyyy
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] max-w-md mx-auto mt-1">
              Add your video about her or personal message right here.
            </p>
          </div>

          <div className="relative aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden bg-black/80 border border-[#e2a57f]/30 shadow-2xl flex items-center justify-center">
            {personalVideoUrl ? (
              <video
                src={personalVideoUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-[#e2a57f]">
                  <Video size={24} />
                </div>
                <h4 className="font-serif text-xl text-[#fbf7ee] mb-1">
                  Video About Her
                </h4>
                <p className="text-xs text-[#a99e91] max-w-xs mb-4">
                  Upload your video file anytime to surprise Fidhuttyyyy with your personal video dedication.
                </p>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e2a57f] text-[#14100d] font-medium text-xs tracking-wider uppercase hover:bg-[#f3cbb5] transition-all"
                >
                  <Upload size={14} />
                  <span>Choose Video File</span>
                </button>
              </div>
            )}
          </div>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </div>

        {/* 3. The Forever Love Lock Interactive Component */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#e2a57f]/30 text-center relative overflow-hidden bg-gradient-to-b from-[#1b1715] to-[#120f0d]">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#e2a57f]/20 to-[#d97d74]/20 border border-[#e2a57f]/50 flex items-center justify-center mb-5">
              {isLockedForever ? (
                <Lock size={32} className="text-[#e2a57f] animate-pulse" />
              ) : (
                <Unlock size={32} className="text-[#d5ccc1]" />
              )}
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] mb-2 font-light">
              Our Forever Promise
            </h3>
            <p className="text-xs sm:text-sm text-[#d5ccc1] font-light mb-6">
              "They say that love locked by two hearts can never be undone."
            </p>

            {isLockedForever ? (
              <div className="bg-[#241c18] border border-[#e2a57f] p-6 rounded-2xl animate-fadeIn">
                <div className="text-2xl mb-2">🔒❤️✨</div>
                <h4 className="font-serif text-2xl text-[#f3cbb5]">
                  Locked In My Heart Forever
                </h4>
                <p className="font-handwriting text-2xl text-[#fbf7ee] mt-2">
                  Fidhuttyyyy & Her One and Only Love
                </p>
                <p className="text-xs text-[#a99e91] tracking-widest uppercase mt-3 font-mono">
                  KEY THROWN INTO THE OCEAN • ETERNAL LOVE
                </p>
              </div>
            ) : (
              <button
                onClick={handleForeverLock}
                className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#e2a57f] to-[#c58366] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(226,165,127,0.3)] hover:shadow-[0_15px_40px_rgba(226,165,127,0.5)] hover:scale-105 active:scale-100 flex items-center gap-3 mx-auto"
              >
                <Heart size={16} fill="white" className="group-hover:scale-125 transition-transform" />
                <span>Lock Our Love Forever ♡</span>
              </button>
            )}
          </div>
        </div>

        {/* Page-wise Navigation */}
        <ChapterPagination currentPage="voice" onNavigate={onNavigate} />

      </div>
    </section>
  );
}
