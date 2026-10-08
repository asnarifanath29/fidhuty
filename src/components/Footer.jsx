import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="relative bg-[#080706] text-[#d5ccc1] border-t border-[#e2a57f]/20 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div>
          <h3 className="font-serif text-2xl text-[#fbf7ee] font-light tracking-wide flex items-center justify-center md:justify-start gap-2">
            <span>For Fidhuttyyyy</span>
            <span className="text-[#e2a57f]">♡</span>
          </h3>
          <p className="font-handwriting text-2xl text-[#f3cbb5] mt-1">
            "You make my world a softer, sweeter place."
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-[#a99e91]">
          <p className="flex items-center gap-1.5 font-light">
            Crafted with endless love & devotion <Heart size={13} className="text-[#e2a57f]" fill="#e2a57f" />
          </p>
          <p className="font-mono text-[10px] tracking-widest text-[#7a6f64] uppercase">
            EST. FOREVER & ALWAYS
          </p>
          <button
            onClick={onScrollTop}
            className="mt-2 text-[#e2a57f] hover:text-[#f3cbb5] text-xs flex items-center gap-1 tracking-wider uppercase transition-colors"
          >
            <ArrowUp size={13} /> Back To Top
          </button>
        </div>

      </div>
    </footer>
  );
}
