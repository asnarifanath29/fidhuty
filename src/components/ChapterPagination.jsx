import React from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

const chapters = [
  { id: 'hero', title: 'Our Story', number: 1 },
  { id: 'wish', title: 'Birthday Wish', number: 2 },
  { id: 'memories', title: 'Best Memories', number: 3 },
  { id: 'voice', title: 'My Voice & Video', number: 4 },
];

export default function ChapterPagination({ currentPage, onNavigate }) {
  const currentIndex = chapters.findIndex((c) => c.id === currentPage);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleGo = (id) => {
    romanticAudio.playHeartPop();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 pt-8 border-t border-[#e2a57f]/20 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
      {/* Previous Button */}
      <div className="w-full sm:w-auto flex justify-start">
        {prevChapter ? (
          <button
            onClick={() => handleGo(prevChapter.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181514] hover:bg-[#251f1c] text-[#d5ccc1] hover:text-[#fbf7ee] text-xs uppercase tracking-widest transition-all border border-white/10 hover:border-[#e2a57f]/40 cursor-pointer shadow-md"
          >
            <ArrowLeft size={14} className="text-[#e2a57f]" />
            <span>Prev: {prevChapter.title}</span>
          </button>
        ) : (
          <div className="hidden sm:block w-28"></div>
        )}
      </div>

      {/* Center Indicator Dots & Label */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {chapters.map((ch, idx) => {
            const isActive = ch.id === currentPage;
            return (
              <button
                key={ch.id}
                onClick={() => handleGo(ch.id)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#e2a57f] shadow-[0_0_10px_rgba(226,165,127,0.5)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
                title={`Go to ${ch.title}`}
                aria-label={`Go to ${ch.title}`}
              />
            );
          })}
        </div>
        <span className="text-[11px] tracking-[0.25em] text-[#a99e91] uppercase font-mono">
          Page {currentIndex + 1} of 4 • {chapters[currentIndex]?.title}
        </span>
      </div>

      {/* Next Button */}
      <div className="w-full sm:w-auto flex justify-end">
        {nextChapter ? (
          <button
            onClick={() => handleGo(nextChapter.id)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e2a57f] hover:bg-[#f3cbb5] text-[#14100d] font-semibold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_20px_rgba(226,165,127,0.4)] cursor-pointer hover:translate-x-0.5"
          >
            <span>Next: {nextChapter.title}</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => handleGo('hero')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e2a57f] to-[#d97d74] text-white font-medium text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_20px_rgba(226,165,127,0.4)] cursor-pointer"
          >
            <Heart size={14} fill="white" />
            <span>Restart Story ♡</span>
          </button>
        )}
      </div>
    </div>
  );
}
