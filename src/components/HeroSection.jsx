import React from 'react';
import { ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export default function HeroSection({ onStartStory }) {
  const handleStart = () => {
    romanticAudio.playSparkleChime();
    onStartStory();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-20 pb-16 overflow-hidden"
    >
      {/* Full-Screen Unified Romantic Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Background Image: Single, fully-centered, no-repeat */}
        <div
          className="w-full h-full transition-all duration-700"
          style={{
            backgroundImage: `url('/assets/hero_fidhutty.jpg?v=3')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Unified Romantic Gradient Shade: Keeps text crisp while allowing the roses, hands, and cake candle to glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(14, 13, 12, 0.72) 0%, rgba(14, 13, 12, 0.42) 28%, rgba(14, 13, 12, 0.55) 68%, rgba(14, 13, 12, 0.95) 95%, #0e0d0c 100%)',
          }}
        />

        {/* Soft Radial Vignette: Gently darkens outer edges, framing the romantic center */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(14, 13, 12, 0.65) 100%)',
          }}
        />
      </div>

      {/* Ambient Bokeh / Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="twinkle-star w-2 h-2 top-[20%] left-[15%] opacity-70"></div>
        <div className="twinkle-star w-3 h-3 top-[35%] right-[20%] opacity-80" style={{ animationDelay: '1.2s' }}></div>
        <div className="twinkle-star w-1.5 h-1.5 top-[60%] left-[25%] opacity-60" style={{ animationDelay: '2.1s' }}></div>
        <div className="twinkle-star w-2.5 h-2.5 top-[15%] right-[35%] opacity-75" style={{ animationDelay: '0.7s' }}></div>
        <div className="twinkle-star w-2 h-2 top-[75%] right-[15%] opacity-50" style={{ animationDelay: '1.8s' }}></div>
      </div>

      {/* Main Centered Headline Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto my-auto flex flex-col items-center text-center px-4 animate-fadeIn">
        {/* Top small label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f3cbb5]/10 border border-[#f3cbb5]/25 backdrop-blur-xs mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2a57f] animate-ping"></span>
          <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[#f3cbb5] uppercase font-medium">
            A LITTLE SURPRISE FOR YOU
          </span>
        </div>

        {/* Script Cursive: Happy Birthday */}
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f3cbb5] font-normal leading-[1.05] drop-shadow-[0_4px_25px_rgba(226,165,127,0.55)]">
          Happy Birthday
        </h1>

        {/* Serif: MY LOVE & FIDHUTTYYYY */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fbf7ee] font-light tracking-[0.16em] uppercase mt-2 drop-shadow-md">
          MY LOVE <span className="text-[#e2a57f] font-normal">FIDHUTTYYYY</span>
        </h2>

        {/* Delicate Heart Divider */}
        <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-4 sm:my-5">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#e2a57f]/60"></span>
          <span className="text-[#e2a57f] text-sm transform hover:scale-125 transition-transform cursor-pointer">
            ♡
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#e2a57f]/60"></span>
        </div>

        {/* Romantic Subtitle Message */}
        <div className="space-y-1.5 text-sm sm:text-base md:text-lg text-[#e5dec9]/95 font-light tracking-wide max-w-lg mx-auto drop-shadow-sm">
          <p>I made something special for you...</p>
          <p>It's not just a birthday wish,</p>
          <p className="text-[#fbf7ee] font-medium text-base sm:text-lg">it's our story.</p>
        </div>

        {/* Start Our Story CTA Button */}
        <button
          onClick={handleStart}
          className="group relative mt-7 sm:mt-9 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#f3ece2] hover:bg-[#ffffff] text-[#241a14] font-medium tracking-[0.2em] text-xs sm:text-sm uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(243,236,226,0.3)] hover:shadow-[0_12px_35px_rgba(243,236,226,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer"
        >
          <span>START OUR STORY</span>
          <ArrowRight
            size={16}
            className="text-[#241a14] transform group-hover:translate-x-1.5 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
