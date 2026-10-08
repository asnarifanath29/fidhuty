import React from 'react';
import { X, Heart } from 'lucide-react';

export default function LetterModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className="relative z-10 max-w-lg w-full p-8 sm:p-10 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#3b2d20] animate-scaleUp"
        style={{
          backgroundColor: '#f4eedb',
          backgroundImage: `radial-gradient(#d8c4a4 0.75px, transparent 0.75px), radial-gradient(#d8c4a4 0.75px, #f4eedb 0.75px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          border: '1px solid #d9caa7',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7d6852] hover:text-[#2d2217] transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <p className="text-[11px] tracking-[0.25em] text-[#8c745c] uppercase font-sans font-semibold">
            A LETTER FOR FIDHUTTYYYY
          </p>
          <h3 className="font-serif text-3xl text-[#2d2217] italic mt-1">
            "Same you... Same me... Always us..."
          </h3>
          <div className="w-16 h-[1px] bg-[#8c745c]/40 mx-auto mt-2"></div>
        </div>

        <div className="font-handwriting text-2xl sm:text-3xl leading-relaxed text-[#3b2c1e] space-y-4">
          <p>
            My sweet Fidhuttyyyy,
          </p>
          <p>
            No matter how fast the world changes around us, no matter where life takes our steps, my heart will always beat for the same girl I fell in love with.
          </p>
          <p>
            You are my calm in every storm, the warmth in every cold day, and the most beautiful dream I never want to wake up from.
          </p>
          <p>
            Happy Birthday, my love. May our story continue for all the lifetimes to come.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-[#d8c5a5] flex items-center justify-between text-sm text-[#7a644f] font-sans">
          <span>Always & Forever</span>
          <span className="flex items-center gap-1 text-[#b85b4f] font-handwriting text-xl">
            <Heart size={14} fill="#b85b4f" /> Endless Love
          </span>
        </div>
      </div>
    </div>
  );
}
