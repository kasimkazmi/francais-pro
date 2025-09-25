'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';

interface HalloweenMusicManagerProps {
  volume?: number;
  loop?: boolean;
}

export function HalloweenMusicManager({ 
  volume = 0.3, 
  loop = true 
}: HalloweenMusicManagerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // Check if user has interacted with the page before (for autoplay policies)
    const hasInteracted = localStorage.getItem('halloween-music-interacted') === 'true';
    setHasUserInteracted(hasInteracted);

    // Check for saved Halloween mode preference
    const savedMode = localStorage.getItem('halloween-mode') === 'true';
    setIsHalloweenMode(savedMode);

    // Check for saved play state preference
    const savedPlaying = localStorage.getItem('halloween-music-playing') === 'true';
    setIsPlaying(savedPlaying);
  }, []);

  useEffect(() => {
    // Listen for Halloween mode changes globally
    const checkHalloweenMode = () => {
      const isActive = document.documentElement.classList.contains('halloween-mode');
      setIsHalloweenMode(isActive);
    };

    // Initial check
    checkHalloweenMode();

    // Listen for changes
    const observer = new MutationObserver(checkHalloweenMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.volume = volume;
    audio.loop = loop;

    // Only pause music when Halloween mode is disabled
    if (!isHalloweenMode) {
      // console.log('Halloween mode disabled - pausing music');
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('halloween-music-playing', 'false');
    }
  }, [isHalloweenMode, volume, loop]);

  // Restore playing state when component mounts and Halloween mode is active
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isHalloweenMode || !hasUserInteracted) return;

    // Check if music should be playing based on saved state
    const shouldPlay = localStorage.getItem('halloween-music-playing') === 'true';
    if (shouldPlay) {
      // console.log('Restoring music state - should play:', shouldPlay);
      audio.play()
        .then(() => {
          // console.log('Music restored successfully');
          setIsPlaying(true);
        })
        .catch((error) => {
          // console.log('Audio play failed on restore:', error);
          setIsPlaying(false);
        });
    }
  }, [isHalloweenMode, hasUserInteracted]);

  // Handle user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        localStorage.setItem('halloween-music-interacted', 'true');
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [hasUserInteracted]);

  // Toggle music on/off
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // console.log('Toggle clicked - Current state:', { isPlaying, hasUserInteracted });

    // Ensure user has interacted for autoplay
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      localStorage.setItem('halloween-music-interacted', 'true');
    }

    if (isPlaying) {
      // Currently playing - pause it
      // console.log('Pausing music...');
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('halloween-music-playing', 'false');
    } else {
      // Not playing - start it
      // console.log('Starting music...');
      try {
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem('halloween-music-playing', 'true');
        // console.log('Music started successfully');
      } catch (error) {
        // console.log('Audio play failed:', error);
        setIsPlaying(false);
        localStorage.setItem('halloween-music-playing', 'false');
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        <source src="/halloween/halloween-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Floating music control button */}
      {isHalloweenMode && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative group">
            {/* Main floating button */}
            <button
              onClick={toggleMusic}
              className={`
                transition-all duration-300 hover:scale-110 active:scale-95
                relative z-10 cursor-pointer border-none p-3 rounded-full
                ${isPlaying 
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 shadow-lg' 
                  : 'bg-gray-800/80 hover:bg-gray-700/80'
                }
              `}
              aria-label={isPlaying ? 'Stop Halloween music' : 'Play Halloween music'}
            >
              {isPlaying ? (
                <Music className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-orange-400" />
              )}
            </button>
            
         
            {/* Tooltip */}
            <div className={`
              absolute bottom-full right-0 mb-2 px-3 py-1 text-xs rounded-lg whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
              ${isPlaying 
                ? 'bg-gradient-to-r from-orange-600 to-purple-700 text-white shadow-lg' 
                : 'bg-gray-800 text-orange-200 shadow-lg'
              }
            `}>
              {isPlaying ? 'Click to stop music' : 'Click to play music'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
