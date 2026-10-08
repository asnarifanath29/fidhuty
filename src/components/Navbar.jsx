import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Sparkles, Menu, X } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function Navbar({ activeSection, onNavigate }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMusic = () => {
    romanticAudio.toggleBgm((state) => {
      setIsPlayingMusic(state);
    });
  };

  const navLinks = [
    { id: 'hero', label: 'OUR STORY' },
    { id: 'wish', label: 'BIRTHDAY WISH' },
    { id: 'memories', label: 'BEST MEMORIES' },
    { id: 'voice', label: 'MY VOICE & VIDEO' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    romanticAudio.playHeartPop();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo / Title */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-2 text-left"
          aria-label="Home"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#fbf7ee] font-light group-hover:text-[#e2a57f] transition-colors">
            For You
          </span>
          <span className="text-[#e2a57f] group-hover:scale-125 transition-transform inline-block">
            ♡
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 bg-[#181514]/60 backdrop-blur-md px-7 py-2.5 rounded-full border border-[#e2a57f]/20 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-[#e2a57f] font-semibold'
                    : 'text-[#d5ccc1] hover:text-[#fbf7ee]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#e2a57f] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side controls (Music toggle & Mobile menu) */}
        <div className="flex items-center gap-3">
          {/* Ambient Music Button */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
              isPlayingMusic
                ? 'bg-[#e2a57f]/20 border-[#e2a57f] text-[#fbf7ee] shadow-[0_0_15px_rgba(226,165,127,0.3)]'
                : 'bg-[#181514]/60 border-white/10 text-[#d5ccc1] hover:border-[#e2a57f]/40 hover:text-white'
            }`}
            title={isPlayingMusic ? 'Mute ambient melody' : 'Play romantic melody'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 size={15} className="text-[#e2a57f] animate-pulse" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#e2a57f]">Music On</span>
                {/* Visualizer bars */}
                <span className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 h-full bg-[#e2a57f] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-0.5 h-2 bg-[#e2a57f] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-0.5 h-3 bg-[#e2a57f] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX size={15} />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Music</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#181514]/70 border border-white/10 text-[#fbf7ee]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#141211]/95 backdrop-blur-xl border-b border-[#e2a57f]/20 animate-fadeIn">
          <div className="flex flex-col gap-3 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-4 rounded-xl text-sm tracking-widest uppercase transition-all ${
                  activeSection === link.id
                    ? 'bg-[#e2a57f]/15 text-[#e2a57f] font-semibold border-l-2 border-[#e2a57f]'
                    : 'text-[#d5ccc1] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
