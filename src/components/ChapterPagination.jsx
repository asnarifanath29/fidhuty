import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

const chapters = [
  { id: 'hero', title: 'Our Story', number: 1 },
  { id: 'wish', title: 'Birthday Wish', number: 2 },
  { id: 'memories', title: 'Best Memories', number: 3 },
  { id: 'voice', title: 'My Voice & Video', number: 4 },
];

export default function ChapterPagination({ currentPage, onNavigate }) {
  const currentIndex = chapters.findIndex((c) => c.id === currentPage);
  const current = chapters[currentIndex] || chapters[0];
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleGo = (id) => {
    romanticAudio.playClick();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 pt-6 border-t border-[#e2a57f]/20 px-4">
      <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-light tracking-wider">
        {/* Previous Chapter Link */}
        <div className="w-1/3 flex justify-start">
          {prevChapter ? (
            <button
              onClick={() => handleGo(prevChapter.id)}
              className="inline-flex items-center gap-2 text-[#d5ccc1] hover:text-[#fbf7ee] transition-all cursor-pointer group py-1.5"
            >
              <ArrowLeft
                size={14}
                className="text-[#e2a57f] group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-serif italic text-sm sm:text-base group-hover:text-[#e2a57f] transition-colors">
                {prevChapter.title}
              </span>
            </button>
          ) : (
            <div className="w-12"></div>
          )}
        </div>

        {/* Center Page Count: Only "2 of 4" */}
        <div className="w-1/3 text-center">
          <span className="text-[#a99e91] font-mono tracking-[0.25em] text-xs uppercase">
            {current.number} <span className="text-[#e2a57f]/70">of</span> 4
          </span>
        </div>

        {/* Next Chapter Link */}
        <div className="w-1/3 flex justify-end">
          {nextChapter ? (
            <button
              onClick={() => handleGo(nextChapter.id)}
              className="inline-flex items-center gap-2 text-[#d5ccc1] hover:text-[#fbf7ee] transition-all cursor-pointer group py-1.5"
            >
              <span className="font-serif italic text-sm sm:text-base group-hover:text-[#e2a57f] transition-colors">
                {nextChapter.title}
              </span>
              <ArrowRight
                size={14}
                className="text-[#e2a57f] group-hover:translate-x-1 transition-transform"
              />
            </button>
          ) : (
            <button
              onClick={() => handleGo('hero')}
              className="inline-flex items-center gap-2 text-[#e2a57f] hover:text-white transition-colors cursor-pointer py-1.5 group"
            >
              <span className="font-serif italic text-sm sm:text-base">
                Restart Story
              </span>
              <RotateCcw
                size={13}
                className="text-[#e2a57f] group-hover:rotate-[-45deg] transition-transform"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
