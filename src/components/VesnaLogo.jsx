import React from 'react';

/**
 * DAHLIA Luxury Brand Logo Component
 * High-fashion vector emblem featuring a blooming symmetrical Dahlia blossom
 * in antique champagne gold and velvet burgundy.
 */
export default function VesnaLogo({
  size = 'md',
  showTagline = true,
  taglineText = 'The Invitation Atelier',
  variant = 'default', // 'default' | 'monogram-only' | 'wordmark-only'
  className = '',
}) {
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.22em]',
    md: 'text-lg tracking-[0.24em]',
    lg: 'text-2xl tracking-[0.26em]',
  };

  const taglineSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[9.5px]',
    lg: 'text-[11px]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {variant !== 'wordmark-only' && (
        <div
          className={`relative ${emblemSizes[size]} rounded-2xl bg-gradient-to-br from-[#faf8f5] via-[#f5eee6] to-[#ebe1d5] border border-sand-300 flex items-center justify-center shadow-xs transition-all duration-300 flex-shrink-0 group-hover:border-gold-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]`}
        >
          {/* Symmetrical Luxury Dahlia Flower Emblem */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="dahliaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2C98F" />
                <stop offset="50%" stopColor="#C49A3B" />
                <stop offset="100%" stopColor="#8E6B1E" />
              </linearGradient>
              <linearGradient id="dahliaBurgundy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5A0F1E" />
                <stop offset="100%" stopColor="#2A050B" />
              </linearGradient>
            </defs>

            {/* Symmetrical Outer Petals */}
            <path d="M24 6 C25.5 13 25.5 17 24 24 C22.5 17 22.5 13 24 6 Z" fill="url(#dahliaGold)" opacity="0.9" />
            <path d="M24 42 C25.5 35 25.5 31 24 24 C22.5 31 22.5 35 24 42 Z" fill="url(#dahliaGold)" opacity="0.9" />
            <path d="M6 24 C13 25.5 17 25.5 24 24 C17 22.5 13 22.5 6 24 Z" fill="url(#dahliaGold)" opacity="0.9" />
            <path d="M42 24 C35 25.5 31 25.5 24 24 C31 22.5 35 22.5 42 24 Z" fill="url(#dahliaGold)" opacity="0.9" />

            {/* Diagonal Petals */}
            <path d="M11.3 11.3 C17 15 20 18 24 24 C18 20 15 17 11.3 11.3 Z" fill="url(#dahliaBurgundy)" />
            <path d="M36.7 11.3 C31 15 28 18 24 24 C30 20 33 17 36.7 11.3 Z" fill="url(#dahliaBurgundy)" />
            <path d="M11.3 36.7 C17 33 20 30 24 24 C18 28 15 31 11.3 36.7 Z" fill="url(#dahliaBurgundy)" />
            <path d="M36.7 36.7 C31 33 28 30 24 24 C30 28 33 31 36.7 36.7 Z" fill="url(#dahliaBurgundy)" />

            {/* Inner Dahlia Crown Petals */}
            <path d="M24 14 C25 18 25 21 24 24 C23 21 23 18 24 14 Z" fill="url(#dahliaGold)" />
            <path d="M24 34 C25 30 25 27 24 24 C23 27 23 30 24 34 Z" fill="url(#dahliaGold)" />
            <path d="M14 24 C18 25 21 25 24 24 C21 23 18 23 14 24 Z" fill="url(#dahliaGold)" />
            <path d="M34 24 C30 25 27 25 24 24 C27 23 30 23 34 24 Z" fill="url(#dahliaGold)" />

            {/* Floral Core Stamen */}
            <circle cx="24" cy="24" r="3" fill="url(#dahliaBurgundy)" stroke="url(#dahliaGold)" strokeWidth="0.8" />
            <circle cx="24" cy="24" r="1.2" fill="#FAF5EF" />
          </svg>

          {/* Micro gold shimmer dot */}
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gold-500 ring-2 ring-paper shadow-xs" />
        </div>
      )}

      {variant !== 'monogram-only' && (
        <div className="text-left">
          <span
            className={`font-serif font-semibold text-espresso block leading-tight tracking-[0.24em] ${titleSizes[size]}`}
          >
            DAHLIA
          </span>
          {showTagline && (
            <span
              className={`font-sans uppercase tracking-[0.22em] text-olive font-semibold block mt-0.5 ${taglineSizes[size]}`}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
