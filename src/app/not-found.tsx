"use client";
import { useEffect, useState } from "react";
export default function NotFound() {
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const classes = Array.from(document.documentElement.classList);
    const themeClass = classes.find(c => c.endsWith('-mode'));
    if (themeClass) {
      const name = themeClass.replace(/-mode$/, '');
      setCurrentTheme(name);
      setIsEnabled(true);
    } else {
      setCurrentTheme('default');
      setIsEnabled(false);
    }
  }, []);

  const seasonalSubtitleMap: Record<string, string> = {
    halloween: "Page Vanished",
    christmas: "Lost in the Snow",
    spring: "Bloom Not Found",
    summer: "Sunburnt URL",
    autumn: "Fallen Leaf Link",
    default: "Page Not Found",
  };
  const subtitle = seasonalSubtitleMap[currentTheme] || seasonalSubtitleMap.default;
  const titleColor = isEnabled ? '#8A0303' : 'IndianRed';
  return (
    <div className="min-h-screen flex items-center justify-center text-center overflow-hidden" style={{ backgroundColor: 'PapayaWhip' }}>
      {/* Gooey SVG filter */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="px-6 max-w-4xl mx-auto">
        {/* Title: show 404 as the main title */}
        <h1 className="relative font-black uppercase leading-none tracking-widest" style={{
          fontFamily: 'Raleway, sans-serif',
          color: titleColor,
          letterSpacing: '-0.12em',
          fontSize: 'clamp(48px, 12vw, 140px)',
          margin: 0 as unknown as number,
          filter: 'url(#goo)'
        }}>
          4 0 4
          <span className="drop" />
          <span className="drop" />
          <span className="drop" />
        </h1>
        {/* Subtitle with seasonal wording */}
        <p className="mt-4 text-gray-800 text-xl md:text-2xl font-bold" style={{ fontFamily: 'Spooky, sans-serif' }}>
          {subtitle}
        </p>
        <p className="mt-2 text-gray-700 text-base md:text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>
          The page you’re looking for doesn’t exist.
        </p>
      </div>

      <style jsx>{`
        .drop {
          width: .12em;
          height: .12em;
          border-radius: 0 100% 100% 100%;
          background-color: currentColor;
          position: absolute;
          top: 80%;
          animation: drop 3s infinite both;
          z-index: 1;
          pointer-events: none;
        }
        /* Align under 4,0,4 roughly */
        .drop:nth-child(2) { left: 18%; }
        .drop:nth-child(3) { left: 50%; animation-delay: -.8s; }
        .drop:nth-child(4) { left: 82%; animation-delay: -1.6s; }
        @media (min-width: 768px) {
          .drop { top: 78%; }
          .drop:nth-child(2) { left: 20%; }
          .drop:nth-child(3) { left: 50%; }
          .drop:nth-child(4) { left: 80%; }
        }
        @keyframes drop {
          0% { transform: translateY(0) scaleX(.85) rotate(45deg); animation-timing-function: ease-out; }
          60% { transform: translateY(140%) scaleX(.85) rotate(45deg); animation-timing-function: ease-in; }
          80%, 100% { transform: translateY(55vh) scaleX(.85) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}


