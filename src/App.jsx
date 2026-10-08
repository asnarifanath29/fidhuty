import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WishSection from './components/WishSection';
import MemoriesGallerySection from './components/MemoriesGallerySection';
import VoiceAndVideoSection from './components/VoiceAndVideoSection';
import Footer from './components/Footer';
import PhotoModal from './components/PhotoModal';
import LetterModal from './components/LetterModal';
import { romanticAudio } from './utils/romanticAudio';

export default function App() {
  // Page-wise state: 'hero', 'wish', 'memories', 'voice'
  const [currentPage, setCurrentPage] = useState('hero');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    romanticAudio.playHeartPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHeroPhoto = () => {
    setSelectedPhoto({
      image: '/assets/our_photo.jpg',
      title: 'Better together ♡',
      date: 'Our Unforgettable Ride',
      note: 'Every drive with you is my favorite memory. Your smile in this picture reminds me why you are my whole world, Fidhuttyyyy.',
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0e0d0c] text-[#fbf7ee] selection:bg-[#e2a57f]/30 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        activeSection={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Page-wise Content Container */}
      <main className="flex-1 w-full animate-fadeIn transition-opacity duration-300">
        {currentPage === 'hero' && (
          <HeroSection
            onStartStory={() => handleNavigate('wish')}
          />
        )}

        {currentPage === 'wish' && (
          <WishSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'memories' && (
          <MemoriesGallerySection
            onOpenPhotoModal={(item) => setSelectedPhoto(item)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'voice' && (
          <VoiceAndVideoSection onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onScrollTop={() => handleNavigate('hero')} />

      {/* Interactive Modals */}
      <PhotoModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {isLetterOpen && (
        <LetterModal onClose={() => setIsLetterOpen(false)} />
      )}
    </div>
  );
}
