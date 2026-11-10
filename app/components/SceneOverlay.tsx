"use client";

import React from "react";
import { SCENES } from "../data/scenes";

interface SceneOverlayProps {
  progress: number;
  onExploreClick?: () => void;
}

export default function SceneOverlay({ progress, onExploreClick }: SceneOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20">
      {/* Top spacer for navigation */}
      <div className="h-20" />

      {/* Center Editorial text layer for each scene */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center">
        {SCENES.map((scene, idx) => {
          // Each stop holds for ~2 full scroll views (~200vh-220vh)
          // Stop 1 (Produce): 0.05 to 0.25 (holds at 100% opacity from 0.07 to 0.23)
          // Stop 2 (Juice & Toys): 0.36 to 0.56 (holds at 100% opacity from 0.38 to 0.54)
          // Stop 3 (Checkout): 0.67 to 0.87 (holds at 100% opacity from 0.69 to 0.85)

          let windowStart = 0.05;
          let windowEnterPeak = 0.075;
          let windowExitStart = 0.225;
          let windowEnd = 0.26;

          if (idx === 1) {
            windowStart = 0.36;
            windowEnterPeak = 0.385;
            windowExitStart = 0.535;
            windowEnd = 0.57;
          } else if (idx === 2) {
            windowStart = 0.67;
            windowEnterPeak = 0.695;
            windowExitStart = 0.845;
            windowEnd = 0.88;
          }

          let opacity = 0;
          let translateY = 16;
          let blur = 4;

          if (progress >= windowStart && progress <= windowEnd) {
            if (progress < windowEnterPeak) {
              const ratio = (progress - windowStart) / (windowEnterPeak - windowStart);
              opacity = Math.max(0, Math.min(1, ratio));
              translateY = 16 * (1 - ratio);
              blur = 4 * (1 - ratio);
            } else if (progress > windowExitStart) {
              const ratio = (progress - windowExitStart) / (windowEnd - windowExitStart);
              opacity = Math.max(0, Math.min(1, 1 - ratio));
              translateY = -14 * ratio;
              blur = 3 * ratio;
            } else {
              // Long comfortable reading plateau (holds for ~2 full screen scrolls)
              opacity = 1;
              translateY = 0;
              blur = 0;
            }
          }

          const alignClass =
            scene.alignment === "left"
              ? "items-start text-left ml-0 mr-auto max-w-xl lg:max-w-2xl"
              : scene.alignment === "right"
              ? "items-end text-right ml-auto mr-0 max-w-xl lg:max-w-2xl"
              : "items-center text-center mx-auto max-w-2xl";

          if (opacity <= 0.005) return null;

          return (
            <div
              key={scene.id}
              style={{
                opacity,
                transform: `translate3d(0, ${translateY}px, 0)`,
                filter: `blur(${blur}px)`,
                transition: "filter 0.2s ease-out, opacity 0.2s ease-out",
              }}
              className={`absolute top-1/2 -translate-y-1/2 w-full flex flex-col ${alignClass} select-none`}
            >
              {/* Scene Eyebrow / Tag */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] bg-black/60 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {scene.eyebrow}
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                  {scene.timeCode}
                </span>
              </div>

              {/* Main Cinematic Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] uppercase text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                {scene.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-200 font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-lg">
                {scene.subtitle}
              </p>

              {/* Supporting Editorial Description with protective backdrop */}
              <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 max-w-md shadow-lg">
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                  {scene.description}
                </p>
              </div>

              {/* Badges / Micro highlights */}
              {scene.badges && (
                <div
                  className={`mt-4 flex flex-wrap gap-2 ${
                    scene.alignment === "right"
                      ? "justify-end"
                      : scene.alignment === "center"
                      ? "justify-center"
                      : "justify-start"
                  }`}
                >
                  {scene.badges.map((b, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/15 text-neutral-200 shadow"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Sub progression tags */}
              {scene.subProgression && (
                <div
                  className={`mt-4 hidden md:flex items-center gap-2 text-[10px] tracking-widest text-neutral-300 font-mono ${
                    scene.alignment === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  {scene.subProgression.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <span className="hover:text-emerald-300 transition-colors drop-shadow">{item}</span>
                      {idx < scene.subProgression!.length - 1 && <span className="text-white/30">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Hero CTA (Scene 03 finale - around 88% to 100% progress) */}
      {progress >= 0.88 && (
        <div
          style={{
            opacity: Math.min(1, (progress - 0.88) / 0.08),
            transform: `translate3d(0, ${(1 - Math.min(1, (progress - 0.88) / 0.08)) * 20}px, 0)`,
          }}
          className="pointer-events-auto max-w-xl mx-auto text-center backdrop-blur-xl bg-black/70 border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl mb-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400 block mb-2">
            Journey Completed • Welcome Inside
          </span>
          <h2 className="text-xl sm:text-3xl font-light tracking-tight uppercase text-white mb-2">
            Make Your Next Shopping Trip Better
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mb-5 font-light">
            Everyday organic staples, curated global delicacies, and warm concierge care at your neighbourhood Provence Market.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs uppercase tracking-[0.2em] transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              Replay Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
