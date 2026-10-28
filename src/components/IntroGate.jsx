'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

/**
 * Luxury Opening Intro Gate
 * Inspired by https://carnival-ten-omega.vercel.app/
 * 
 * Features:
 * - Deep velvet radial vignette tailored to event palette
 * - Perfectly centered circular artwork with soft feathered perimeter
 * - Thin, elegant SVG gold foil ring that animates from 12 o'clock in 2.2s
 * - Understated typography with title, subtitle, and "Tap anywhere to open"
 * - Instant tap-to-open skip support
 * - Smooth 1.1s cubic-bezier opacity fade-out revealing the invitation card
 * - Discreet floating replay button to replay the reveal on demand
 */
export default function IntroGate({
  artwork = '/assets/couple-golden-intro.jpg',
  title = '',
  subtitle = '',
  palette = ['#26060A', '#D4AF37', '#FAF5EF'],
  showReplayButton = true,
  isContained = false,
  onFinish = () => {},
}) {
  const [introActive, setIntroActive] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [introRemoved, setIntroRemoved] = useState(false);

  // Derive elegant radial background gradient from template palette
  const radialBg = useMemo(() => {
    const primary = palette[0] || '#26060A';
    // If emerald
    if (primary.toLowerCase().includes('0c') || primary.toLowerCase().includes('0e') || primary.toLowerCase().includes('32')) {
      return 'radial-gradient(circle at 50% 50%, #0d3826 0%, #082619 45%, #051810 80%, #020b08 100%)';
    }
    // If noir / charcoal / dark slate
    if (primary.toLowerCase().includes('0e0e') || primary.toLowerCase().includes('0b0c') || primary.toLowerCase().includes('0407')) {
      return 'radial-gradient(circle at 50% 50%, #1e1e24 0%, #141418 45%, #0d0d10 80%, #060608 100%)';
    }
    // If ivory / gold / soft champagne
    if (primary.toLowerCase().includes('faf') || primary.toLowerCase().includes('f5')) {
      return 'radial-gradient(circle at 50% 50%, #2e2619 0%, #221b10 45%, #17120a 80%, #0c0905 100%)';
    }
    // Default: Royal Burgundy / Velvet Wine
    return 'radial-gradient(circle at 50% 50%, #42070D 0%, #35050A 45%, #240307 80%, #150204 100%)';
  }, [palette]);

  const finishIntro = () => {
    if (introDismissed) return;
    setIntroDismissed(true);
    onFinish();
    setTimeout(() => {
      setIntroRemoved(true);
    }, 1150);
  };

  const replayIntro = () => {
    setIntroRemoved(false);
    setIntroDismissed(false);
    setIntroActive(false);
    setTimeout(() => {
      setIntroActive(true);
    }, 80);
    setTimeout(() => {
      finishIntro();
    }, 2400);
  };

  useEffect(() => {
    // Start drawing ring stroke shortly after mount
    const startTimer = setTimeout(() => {
      setIntroActive(true);
    }, 80);

    // Auto dismiss after 2.35s stroke completes
    const autoDismissTimer = setTimeout(() => {
      finishIntro();
    }, 2380);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(autoDismissTimer);
    };
  }, []);

  return (
    <>
      {/* 1. INTRO GATE OVERLAY */}
      {!introRemoved && (
        <div
          id="intro-gate"
          onClick={finishIntro}
          role="button"
          tabIndex={0}
          aria-label="Tap to open invitation"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') finishIntro();
          }}
          className={`${
            isContained
              ? 'absolute inset-0 z-50 h-full w-full rounded-[32px] sm:rounded-[36px]'
              : 'fixed inset-0 z-[9999]'
          } flex flex-col items-center justify-center p-6 cursor-pointer select-none overflow-hidden transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            introDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: radialBg,
          }}
        >
          {/* Ambient subtle warm particles (very understated) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FAF5EF] blur-[0.5px] animate-pulse" />
            <div className="absolute top-3/4 left-1/3 w-1 h-1 rounded-full bg-[#D4AF37] blur-[0.5px] animate-pulse delay-700" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-[#D4AF37] blur-[0.5px] animate-pulse delay-300" />
            <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-[#FAF5EF] blur-[0.5px] animate-pulse delay-1000" />
          </div>

          {/* Central Circular Stage */}
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 max-w-[220px] max-h-[220px]">
            {/* Feathered Artwork */}
            <img
              src={artwork}
              alt={title || "Invitation Artwork"}
              className="w-full h-full object-contain rounded-full select-none pointer-events-none block transition-transform duration-700 ease-out"
              style={{
                maskImage: 'radial-gradient(circle at 50% 50%, black 65%, rgba(0,0,0,0.9) 82%, transparent 98%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 65%, rgba(0,0,0,0.9) 82%, transparent 98%)',
              }}
            />

            {/* Circular SVG Golden Loading Ring */}
            <svg
              className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none -rotate-90 origin-center"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="introGoldGradShared" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2C2" />
                  <stop offset="35%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#F5E8BA" />
                  <stop offset="100%" stopColor="#A98018" />
                </linearGradient>
              </defs>

              {/* Faint guide track */}
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="rgba(212, 175, 55, 0.12)"
                strokeWidth="1.5"
              />

              {/* Animated golden stroke */}
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="url(#introGoldGradShared)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset={introActive ? "0" : "100"}
                pathLength="100"
                style={{
                  transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  filter: 'drop-shadow(0 0 7px rgba(212, 175, 55, 0.75)) drop-shadow(0 0 14px rgba(212, 175, 55, 0.35))',
                }}
              />
            </svg>
          </div>

          {/* Understated Typography & Prompt */}
          <div className="mt-8 text-center max-w-xs flex flex-col items-center pointer-events-none">
            {title && (
              <h2 className="font-serif text-lg sm:text-xl text-[#FAF5EF] font-normal tracking-wide drop-shadow-sm mb-1">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-sans text-[11px] sm:text-xs text-[#D4AF37]/85 tracking-[0.18em] uppercase font-light">
                {subtitle}
              </p>
            )}

            <div className="mt-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 animate-ping" />
              <span className="font-cinzel text-[10px] tracking-[0.28em] uppercase text-[#F5E8BA]/75 font-medium">
                Tap anywhere to open
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING REPLAY BUTTON (Discreet bottom-left control for guests/hosts) */}
      {showReplayButton && introRemoved && (
        <button
          onClick={replayIntro}
          title="Replay opening reveal"
          aria-label="Replay opening reveal"
          className={`${
            isContained ? 'absolute bottom-4 left-4 z-40' : 'fixed bottom-4 left-4 z-40'
          } p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-[#D4AF37] hover:text-[#FFF2C2] border border-[#D4AF37]/30 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 group`}
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90 duration-300" />
        </button>
      )}
    </>
  );
}
