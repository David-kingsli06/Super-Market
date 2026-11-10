"use client";

import React, { useState } from "react";

interface NavigationProps {
  currentProgress?: number;
  onJumpToScene?: (sceneIndex: number) => void;
  onReplay?: () => void;
}

export default function Navigation({ currentProgress = 0, onJumpToScene, onReplay }: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="pointer-events-auto flex items-center justify-between backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          
          {/* Brand Logo */}
          <button
            onClick={() => onReplay ? onReplay() : onJumpToScene?.(0)}
            className="flex items-center gap-3 group focus:outline-none text-left"
            aria-label="Provence Market Home"
          >
            <div className="w-8 h-8 rounded-full border border-emerald-400/40 flex items-center justify-center bg-emerald-500/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase font-sans">
                Provence
              </span>
              <span className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase -mt-0.5">
                Market & Co.
              </span>
            </div>
          </button>

          {/* Center Contextual Navigation */}
          <nav className="flex items-center gap-1 text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-300">
            <button
              onClick={() => onJumpToScene?.(0)}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:bg-white/5 ${
                currentProgress >= 0 && currentProgress < 0.334
                  ? "text-emerald-300 bg-emerald-950/50 border border-emerald-500/30"
                  : ""
              }`}
            >
              01 Fresh
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => onJumpToScene?.(1)}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:bg-white/5 ${
                currentProgress >= 0.334 && currentProgress < 0.667
                  ? "text-emerald-300 bg-emerald-950/50 border border-emerald-500/30"
                  : ""
              }`}
            >
              02 Discover
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={() => onJumpToScene?.(2)}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:bg-white/5 ${
                currentProgress >= 0.667 && currentProgress <= 1
                  ? "text-emerald-300 bg-emerald-950/50 border border-emerald-500/30"
                  : ""
              }`}
            >
              03 Checkout
            </button>
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onReplay?.()}
              className="text-[11px] uppercase tracking-[0.18em] font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3.5 py-1.5 rounded-full transition-colors"
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
