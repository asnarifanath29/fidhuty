import React from 'react';
import { X, Heart, Calendar } from 'lucide-react';

export default function PhotoModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative z-10 max-w-lg w-full bg-[#fdfbf7] text-[#2c221a] p-4 sm:p-6 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#ede3c8] animate-scaleUp max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181514] text-white flex items-center justify-center hover:bg-[#e2a57f] hover:text-black transition-colors shadow-lg z-20 cursor-pointer"
          aria-label="Close"
        >
          <X size={17} />
        </button>

        {/* Photo Container */}
        <div className="relative w-full overflow-hidden rounded-xs bg-[#1a1412] shadow-inner mb-4 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="w-full max-h-[58vh] object-contain rounded-xs"
          />
        </div>

        {/* Caption & Loving Note */}
        <div className="text-center px-2">
          <h3 className="font-handwriting text-2xl sm:text-3xl text-[#3d2f25] font-bold">
            {item.title}
          </h3>
          <p className="text-xs text-[#7d6952] font-mono tracking-wider mt-0.5 flex items-center justify-center gap-1">
            <Calendar size={12} /> {item.date}
          </p>

          <p className="mt-3 text-sm sm:text-base text-[#4a3d32] font-light italic leading-relaxed">
            "{item.note || 'Every memory with you is a treasure I will guard forever.'}"
          </p>

          <div className="mt-4 pt-3 border-t border-[#eee2cc] flex items-center justify-center gap-1.5 text-[#b85b4f] font-handwriting text-xl">
            <Heart size={14} fill="#b85b4f" />
            <span>Fidhuttyyyy & Anfu ♡ Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}
