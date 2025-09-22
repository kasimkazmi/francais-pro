"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HalloweenBat } from "./halloween-bat";
import { HalloweenGhost } from "./halloween-ghost";
import { HalloweenSpider } from "./halloween-spider";
import { HalloweenPumpkin } from "./halloween-pumpkin";

// Mock components for the Halloween elements

interface HalloweenLoaderProps {
  isLoading?: boolean;
  message?: string;
  onComplete?: () => void;
  duration?: number;
}


export function HalloweenLoader({
  isLoading = true,
  message = "Loading...",
  onComplete,
  duration = 5000,
}: HalloweenLoaderProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [showLoader, setShowLoader] = useState(isLoading);
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState("");
  const [currentSpell, setCurrentSpell] = useState(0);

  //  magical effects
  const spellEffects = [
    { emoji: "🔥", name: "Flame Spell", color: "from-red-500 to-orange-500" },
    { emoji: "❄️", name: "Ice Spell", color: "from-blue-500 to-cyan-500" },
    {
      emoji: "⚡",
      name: "Lightning Spell",
      color: "from-yellow-500 to-purple-500",
    },
    { emoji: "🌪️", name: "Wind Spell", color: "from-green-500 to-teal-500" },
    { emoji: "🌟", name: "Star Spell", color: "from-pink-500 to-indigo-500" },
  ];

  useEffect(() => {
    setMounted(true);
    if (isLoading) {
      setShowLoader(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setShowLoader(false);
      if (onComplete) onComplete();
      return;
    }

    const loadingMessages = [
      "🎃 Awakening the French spirits...",
      "👻 Conjuring vocabulary ghosts...",
      "🦇 Summoning pronunciation bats...",
      "🕷️ Weaving grammar webs...",
      "🧙‍♀️ Brewing learning potions...",
      "🔮 Channeling language magic...",
      "⚡ Electrifying your mind...",
      "🌙 Invoking lunar wisdom...",
      "✨ Casting comprehension spells...",
      "🌟 Illuminating French mysteries...",
      "💫 Almost ready for your French adventure!",
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Calculate progress based on time elapsed
        const progressIncrement = 100 / (duration / 100); // More precise calculation
        const newProgress = Math.min(prev + progressIncrement, 100);

        // Update phase based on progress
        if (newProgress < 25) {
          // Early phase
        } else if (newProgress < 50) {
          // Mid phase
        } else if (newProgress < 75) {
          // Late phase
        } else {
          // Final phase
        }

        // Update magic intensity

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoader(false);
            if (onComplete) onComplete();
            // Navigate to welcome route after completion
            router.push('/welcome');
          }, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 100); // Fixed interval of 100ms for smoother progress

    const messageInterval = setInterval(() => {
      const randomMessage =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setCurrentMessage(randomMessage);

      // Create glitch effect occasionally
      if (Math.random() > 0.7) {
        setGlitchText(
          randomMessage
            .split("")
            .map((char) =>
              Math.random() > 0.8
                ? String.fromCharCode(33 + Math.random() * 93)
                : char
            )
            .join("")
        );
        setTimeout(() => setGlitchText(""), 200);
      }
    }, 1200);

    const spellInterval = setInterval(() => {
      setCurrentSpell((prev) => (prev + 1) % 5);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearInterval(spellInterval);
    };
  }, [isLoading, duration, onComplete]);

  if (!showLoader || !mounted) return null;

  const currentSpellEffect = spellEffects[currentSpell];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-orange-900 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes magicPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes orbitalSpin {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        @keyframes ghostFloat {
          0%,
          100% {
            transform: translateY(0px) scaleX(1);
          }
          50% {
            transform: translateY(-30px) scaleX(-1);
          }
        }
        @keyframes batFly {
          0%,
          100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-20px) translateY(-10px) rotate(-15deg);
          }
          50% {
            transform: translateX(0px) translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateX(20px) translateY(-10px) rotate(15deg);
          }
        }
        @keyframes spiderCrawl {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-10px) rotate(-45deg);
          }
          50% {
            transform: translateX(0px) rotate(-90deg);
          }
          75% {
            transform: translateX(10px) rotate(-135deg);
          }
        }
        @keyframes witchHatSpin {
          0%,
          100% {
            transform: rotate(0deg) translateY(0px);
          }
          50% {
            transform: rotate(180deg) translateY(-10px);
          }
        }
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 20px #ff6600, 0 0 30px #ff6600, 0 0 40px #ff6600;
          }
          50% {
            text-shadow: 0 0 30px #9900ff, 0 0 40px #9900ff, 0 0 50px #9900ff;
          }
        }
        @keyframes magicCircle {
          0% {
            transform: rotate(0deg) scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(0.8);
            opacity: 0.5;
          }
        }
        @keyframes energyWave {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(3) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Dynamic background patterns */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentSpellEffect.color} opacity-20 animate-pulse`}
        ></div>
      </div>

      {/* Particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 text-yellow-300 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`bat-${i}`}
            className="absolute text-purple-300 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            🦇
          </div>
        ))}
      </div>

      {/* Orbital decorations with GIFs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4"
            style={{ animation: "ghostFloat 4s ease-in-out infinite" }}
          >
            <HalloweenGhost size="lg" animated={true} />
            {/* <img src="/halloween/ghost-spirits.gif" alt="Ghost" className="w-16 h-16" /> */}
          </div>
          <div
            className="absolute top-1/3 right-1/4"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            {/* <img src="/halloween/pumkin2.gif" alt="Pumpkin" className="w-20 h-20" /> */}
            <HalloweenPumpkin size="lg" glow={true} animated={true} />
          </div>
          <div
            className="absolute bottom-1/4 left-1/3"
            style={{ animation: "witchHatSpin 5s ease-in-out infinite" }}
          >
            {/* <img src="/halloween/sketing.gif" alt="Skeleton" className="w-16 h-16" /> */}
          </div>
          <div
            className="absolute bottom-1/3 right-1/3"
            style={{ animation: "spiderCrawl 4s ease-in-out infinite" }}
          >
            {/* <img src="/halloween/spooky.gif" alt="Spooky" className="w-14 h-14" /> */}
            <HalloweenSpider size="md" color="black" animated={true} />
          </div>
          <div
            className="absolute top-1/2 left-1/6"
            style={{ animation: "batFly 3s ease-in-out infinite" }}
          >
            {/* <img src="/halloween/catbat.gif" alt="Bat" className="w-18 h-18" /> */}
            <HalloweenBat size="lg" animated={true} />
          </div>
          <div
            className="absolute top-2/3 right-1/6"
            style={{ animation: "ghostFloat 3.5s ease-in-out infinite" }}
          >
            {/* <img src="/halloween/boo.gif" alt="Boo" className="w-14 h-14" /> */}
            <HalloweenGhost size="md" animated={true} />
          </div>
        </div>
      </div>

      {/* Main loader content with  effects */}
      <div className="relative z-10 text-center">
        {/* Current spell indicator */}
        <div className="absolute -top-20   left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
          <Image
            src="/halloween/pumkin.gif"
            alt="Halloween Pumpkin"
            width={96}
            height={96}
            className="w-36 h-36 object-contain animate-pulse"
            unoptimized
          />{" "}
        </div>

        {/*  loading message with glitch effect */}
        <div className="mb-8 mt-14">
          <h2
            className="font-bold mb-4 relative overflow-hidden halloween-font-magnificent-title"
            style={{ 
              animation: "textGlow 2s ease-in-out infinite",
              fontSize: "2rem",
              lineHeight: "4rem"
            }}
          >
            <span className="text-orange-300 ">
              {glitchText || currentMessage}
            </span>
            {glitchText && (
              <span className="absolute inset-0 text-red-500 opacity-50 animate-pulse">
                {glitchText}
              </span>
            )}
          </h2>

         
        </div>

        {/*  progress bar with magic effects */}
        <div className="w-96 mx-auto mb-6 relative">
          <div className="bg-gray-900 rounded-full h-6 overflow-hidden relative">
            <div
              className={`h-full bg-gradient-to-r ${currentSpellEffect.color} transition-all duration-300 ease-out relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent"
                style={{ animation: "energyWave 1.5s ease-out infinite" }}
              ></div>
            </div>
          </div>
          {/* Progress percentage display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Background decoration with GIFs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
        {/* <img src="/halloween/spookyseason.gif" alt="Spooky Season" className="w-32 h-32" /> */}
        <HalloweenSpider size="sm" color="brown" animated={true} />
      </div>

      {/* Corner decorations with GIFs */}
      {/* 
      {/* Additional corner decorations */}
      <div className="absolute top-8 right-8 opacity-15">
        <HalloweenGhost size="sm" animated={true} />
      </div>
      <div className="absolute bottom-8 left-8 opacity-15">
        <HalloweenGhost size="sm" animated={true} />
      </div>
    </div>
  );
}
