"use client";

import React from "react";

interface ScrollIndicatorProps {
  progress: number;
}

export default function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  // Fade out quickly as user starts scrolling (> 0.04)
  const isVisible = progress < 0.04;
  const opacity = Math.max(0, 1 - progress * 25);

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-300 flex flex-col items-center gap-2 select-none"
    >
      <div className="backdrop-blur-md bg-black/40 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2.5 shadow-lg">
        <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-neutral-200">
          Scroll To Explore
        </span>
        <svg
          className="w-3.5 h-3.5 text-emerald-400 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400/80">
        Interactive 24s Walkthrough
      </span>
    </div>
  );
}
