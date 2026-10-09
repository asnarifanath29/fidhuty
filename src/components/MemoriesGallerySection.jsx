import React, { useState } from 'react';
import { Eye, Calendar } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import ChapterPagination from './ChapterPagination';

export default function MemoriesGallerySection({ onOpenPhotoModal, onNavigate }) {
  // Photo Memories List
  const [memories] = useState([
    {
      id: 1,
      image: '/assets/memory_filutty_roses.jpg',
      title: 'The Most Beautiful Girl in My World',
      subtitle: 'Fidhuttyyyy with Red Roses',
      date: 'Our Sweetest Smile',
      rotation: '-2deg',
      tapeColor: 'rgba(226, 165, 127, 0.4)',
      note: 'Your smile when you hold flowers is the most breathtaking sight in the universe. In your black dress and gentle grace, you outshine every rose in the world.',
      tag: 'Queen of My Heart',
    },
    {
      id: 2,
      image: '/assets/memory_valentine_roses.jpg',
      title: "Happy Valentine's Day, Fidhuttiyee",
      subtitle: 'Handwritten With Love by Anfu',
      date: "Valentine's Night Under The Stars",
      rotation: '2.5deg',
      tapeColor: 'rgba(217, 125, 116, 0.45)',
      note: '“Happy Valentine’s day Fidhuttiyee - Anfu ♡”. Two red roses held high against the winter night sky, a small symbol of a love that reaches past the stars.',
      tag: 'Handwritten Love',
    },
    {
      id: 3,
      image: '/assets/memory_framed_love.jpg',
      title: 'Framed on My Wall, Locked in My Heart',
      subtitle: 'Our Picture & Little Memories',
      date: 'Always Side by Side',
      rotation: '-1.5deg',
      tapeColor: 'rgba(243, 203, 181, 0.5)',
      note: 'Seeing our photo side by side next to your letters and dried flowers is the warmest corner of my world. Every glance reminds me of your gentle warmth.',
      tag: 'Cherished Wall',
    },
    {
      id: 4,
      image: '/assets/memory_love_letter_envelope.jpg',
      title: 'The Maroon Envelope & The Letter',
      subtitle: 'A Gift From The Soul',
      date: '“All the best... Kaakkuo 🤍”',
      rotation: '2deg',
      tapeColor: 'rgba(163, 62, 79, 0.4)',
      note: '“I know how hard you’ve worked for this... and finally.. you did it, man! This is a small gift from my side... insha Allah, we’ll meet soon daa 🤗 miss you...” — The most precious words I have ever received.',
      tag: 'Sacred Letter',
    },
    {
      id: 5,
      image: '/assets/memory_snow_roses.jpg',
      title: 'Winter Snow & The Red Rose',
      subtitle: 'Cold Winter, Warm Love',
      date: 'Balcony in the Snow',
      rotation: '-2.5deg',
      tapeColor: 'rgba(255, 255, 255, 0.4)',
      note: 'Even in the deepest winter snow and icy winds, my love for you never gets cold. A single red rose to remind you of my warmth.',
      tag: 'Winter Memory',
    },
    {
      id: 6,
      image: '/assets/our_photo.jpg',
      title: 'Our Road Trip Laughs',
      subtitle: 'Better Together Always',
      date: 'The Highway Car Ride',
      rotation: '1.5deg',
      tapeColor: 'rgba(226, 165, 127, 0.45)',
      note: 'That car ride where we were laughing and leaning on each other. Holding your hand while driving through life is everything I ever prayed for.',
      tag: 'Better Together',
    },
  ]);

  // Milestone Dates in 2026 (Clean & Minimalist with Golden Line)
  const milestoneDates = [
    {
      date: '16 Jan 2026',
      sentence: 'Where our universe began ♡',
    },
    {
      date: '17 Jan 2026',
      sentence: 'When two hearts started getting closer ♡',
    },
    {
      date: '26 Jan 2026',
      sentence: 'Words spoken straight from my heart ♡',
    },
    {
      date: '28 Jan 2026',
      sentence: 'The day our forever officially began 💍',
    },
    {
      date: '16 Jul 2026',
      sentence: 'Finally standing right in front of you ✨',
    },
    {
      date: '03 Sep 2026',
      sentence: 'Falling deeper in love every second 🌹',
    },
  ];

  return (
    <section id="memories" className="relative min-h-screen py-20 px-4 sm:px-6 bg-[#110f0e] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#e2a57f]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#8d2b38]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm tracking-[0.35em] text-[#e2a57f] uppercase font-medium mb-3">
            CHAPTER III
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fbf7ee] font-light tracking-wide mb-4">
            Best <span className="font-script text-5xl sm:text-6xl text-[#f3cbb5]">Memories</span>
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mb-4">
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
            <span className="text-[#e2a57f] text-xs">♡</span>
            <span className="h-[1px] flex-1 bg-[#e2a57f]/30"></span>
          </div>
          <p className="text-sm sm:text-base text-[#d5ccc1] max-w-2xl mx-auto font-light leading-relaxed">
            Our journey captured in pictures and milestone dates.
          </p>
        </div>

        {/* Polaroids Grid - Very simple, direct display without clutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start mb-24">
          {memories.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                romanticAudio.playHeartPop();
                onOpenPhotoModal(item);
              }}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
              style={{ transform: `rotate(${item.rotation})` }}
            >
              {/* Polaroid Frame */}
              <div className="bg-[#fdfbf7] text-[#2c221a] p-3.5 pb-6 rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.65)] border border-[#eee5d5] relative">
                {/* Vintage Washi Tape Top Accent */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 backdrop-blur-xs border border-black/5 shadow-xs rotate-[-1deg]"
                  style={{ backgroundColor: item.tapeColor || 'rgba(226, 165, 127, 0.4)' }}
                ></div>

                {/* Tag Pill */}
                <div className="absolute top-5 right-5 z-10 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium opacity-90">
                  {item.tag}
                </div>

                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-[#1f1a17]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-light">
                      <Eye size={13} /> View Photo
                    </span>
                  </div>
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="pt-4 text-center px-1">
                  <h4 className="font-handwriting text-2xl sm:text-3xl text-[#34261d] font-bold tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#85705d] font-mono tracking-wider mt-1 flex items-center justify-center gap-1">
                    <Calendar size={11} /> {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Special Dates in 2026 - Clean Timeline */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] font-light tracking-wide">
              Our Special Dates
            </h3>
            <div className="w-12 h-[1px] bg-[#e2a57f]/40 mx-auto mt-3"></div>
          </div>

          <div className="max-w-xl mx-auto">
            {milestoneDates.map((item, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-6 group">
                {/* Golden line on side with glowing node */}
                <div className="flex flex-col items-center self-stretch">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#e2a57f] ring-4 ring-[#e2a57f]/20 shadow-[0_0_12px_rgba(226,165,127,0.85)] group-hover:scale-125 transition-transform shrink-0 mt-1" />
                  {index !== milestoneDates.length - 1 && (
                    <div className="w-[2px] bg-gradient-to-b from-[#e2a57f] via-[#e2a57f]/70 to-[#e2a57f]/30 flex-1 my-1.5" />
                  )}
                </div>

                {/* Clean Date & Sentence */}
                <div className="pb-8 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-[#e2a57f] font-semibold whitespace-nowrap">
                    {item.date}
                  </span>
                  <span className="text-[#e2a57f]/40 hidden sm:inline">—</span>
                  <p className="font-serif italic text-lg sm:text-xl text-[#f5ece1] font-light tracking-wide group-hover:text-[#fbf7ee] transition-colors">
                    {item.sentence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page-wise Navigation */}
        <ChapterPagination currentPage="memories" onNavigate={onNavigate} />
      </div>
    </section>
  );
}
