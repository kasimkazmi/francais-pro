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
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  useEffect(() => {
    // Check if user has interacted with the page before (for autoplay policies)
    const hasInteracted = localStorage.getItem('halloween-music-interacted') === 'true';
    setHasUserInteracted(hasInteracted);

    // Check for saved Halloween mode preference
    const savedMode = localStorage.getItem('halloween-mode') === 'true';
    setIsHalloweenMode(savedMode);
    
    // Check if user manually stopped the music
    const wasManuallyStopped = localStorage.getItem('halloween-music-manually-stopped') === 'true';
    if (wasManuallyStopped) {
      setIsPlaying(false);
      setHasAutoPlayed(true); // Prevent auto-play
    }
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
    
    // Pause music when Halloween mode is disabled
    if (!isHalloweenMode) {
      audio.pause();
      setIsPlaying(false);
      setHasAutoPlayed(false);
      localStorage.removeItem('halloween-music-manually-stopped');
    }
  }, [isHalloweenMode, volume, loop, hasAutoPlayed]);

  // Restore playing state when component mounts and Halloween mode is active
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isHalloweenMode) return;

    // Check if music was playing before (not manually stopped)
    const wasManuallyStopped = localStorage.getItem('halloween-music-manually-stopped') === 'true';
    const wasPlaying = localStorage.getItem('halloween-music-playing') === 'true';
    
    if (wasPlaying && !wasManuallyStopped && !isPlaying) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          setIsPlaying(false);
        });
    }
  }, [isHalloweenMode, isPlaying]);

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

    // Ensure user has interacted for autoplay
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      localStorage.setItem('halloween-music-interacted', 'true');
    }

    if (isPlaying) {
      // Currently playing - pause it and mark as manually stopped
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('halloween-music-manually-stopped', 'true');
      localStorage.setItem('halloween-music-playing', 'false');
    } else {
      // Not playing - start it and remove manual stop flag
      try {
        await audio.play();
        setIsPlaying(true);
        localStorage.removeItem('halloween-music-manually-stopped');
        localStorage.setItem('halloween-music-playing', 'true');
      } catch (error) {
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
