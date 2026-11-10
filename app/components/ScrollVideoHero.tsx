"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { getFrameUrl, mapProgressToVideoFrame, TOTAL_FRAMES } from "../data/scenes";
import SceneOverlay from "./SceneOverlay";
import ScrollIndicator from "./ScrollIndicator";

interface ScrollVideoHeroProps {
  onProgressChange?: (progress: number) => void;
}

export default function ScrollVideoHero({ onProgressChange }: ScrollVideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // User-facing progress state
  const [progress, setProgress] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Cached frame images array in a ref to prevent re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  
  // Interpolation targets for buttery-smooth motion (Emil Design Engineering)
  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(1);
  const targetProgressRef = useRef<number>(0);
  const currentRenderedProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Render an image onto the canvas with cover sizing
  const renderImageToCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (!iw || !ih) return;

      // object-fit: cover calculation
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (cw - iw * ratio) / 2;
      const centerShiftY = (ch - ih * ratio) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(
        img,
        0,
        0,
        iw,
        ih,
        centerShiftX,
        centerShiftY,
        iw * ratio,
        ih * ratio
      );
    },
    []
  );

  // Draw frame onto canvas
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const roundedIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIdx)));
      const img = imagesRef.current[roundedIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        renderImageToCanvas(ctx, canvas, img);
        return;
      }

      // Fallback nearest loaded neighbor
      for (let offset = 1; offset < 35; offset++) {
        const prev = imagesRef.current[Math.max(1, roundedIdx - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          renderImageToCanvas(ctx, canvas, prev);
          return;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES, roundedIdx + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          renderImageToCanvas(ctx, canvas, next);
          return;
        }
      }
    },
    [renderImageToCanvas]
  );

  // High-performance image preloader
  useEffect(() => {
    let active = true;

    const loadSingle = (index: number) => {
      if (!active || imagesRef.current[index]) return;
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        if (!active) return;
        imagesRef.current[index] = img;
        if (index === 1 && currentRenderedFrameRef.current <= 1.5) {
          drawFrame(1);
        }
      };
    };

    // Preload immediate opening frames
    for (let i = 1; i <= 40; i++) {
      loadSingle(i);
    }
    // Preload milestones
    for (let i = 41; i <= TOTAL_FRAMES; i += 15) {
      loadSingle(i);
    }
    // Background load remaining
    let currentBatch = 41;
    const interval = setInterval(() => {
      if (!active) return;
      const end = Math.min(TOTAL_FRAMES, currentBatch + 25);
      for (let i = currentBatch; i <= end; i++) {
        loadSingle(i);
      }
      currentBatch += 26;
      if (currentBatch > TOTAL_FRAMES) {
        clearInterval(interval);
      }
    }, 60);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [drawFrame]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentRenderedFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Continuous physics animation loop for ultra-smooth frame interpolation (lerp)
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const currentF = currentRenderedFrameRef.current;
      const targetF = targetFrameRef.current;
      const diffF = targetF - currentF;

      const currentP = currentRenderedProgressRef.current;
      const targetP = targetProgressRef.current;
      const diffP = targetP - currentP;

      if (Math.abs(diffF) > 0.005) {
        const nextF = currentF + diffF * 0.08;
        currentRenderedFrameRef.current = nextF;
        drawFrame(nextF);
      }

      if (Math.abs(diffP) > 0.0008) {
        const nextP = currentP + diffP * 0.08;
        currentRenderedProgressRef.current = nextP;
        setProgress(nextP);
        onProgressChange?.(nextP);
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame, onProgressChange]);

  // Scroll listener: mapped across a generous 1400vh runway
  // giving ~200-240vh (up to 2 full viewport scrolls) per text stop
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      targetProgressRef.current = rawProgress;
      targetFrameRef.current = mapProgressToVideoFrame(rawProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autoplay / Accessibility Reduced-Motion Support
  useEffect(() => {
    let playInterval: NodeJS.Timeout;
    if (isPlayingAuto) {
      playInterval = setInterval(() => {
        const container = containerRef.current;
        if (!container) return;
        const totalScrollable = container.offsetHeight - window.innerHeight;
        const nextProgress = (targetProgressRef.current + 0.001) % 1;
        window.scrollTo({
          top: container.offsetTop + nextProgress * totalScrollable,
          behavior: "auto",
        });
      }, 30);
    }
    return () => clearInterval(playInterval);
  }, [isPlayingAuto]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[1400vh] bg-[#0b0d0c]"
      aria-label="Interactive Supermarket Shopping Experience"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden select-none">
        {/* Cinematic Canvas Video Surface with GPU composition */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover filter contrast-[1.03] brightness-[0.98] transform-gpu will-change-transform"
        />

        {/* Subtle Ambient Vignette & Cinema Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/60" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* Dynamic Editorial Content Overlays with 2-scroll plateau retention */}
        <SceneOverlay
          progress={progress}
          onExploreClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Minimal Initial Scroll Prompt */}
        <ScrollIndicator progress={progress} />

        {/* Accessibility Play / Pause Floating Toggle */}
        <div className="fixed bottom-10 right-6 sm:right-10 z-30 pointer-events-auto">
          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] uppercase font-mono tracking-widest text-neutral-300 hover:text-white hover:bg-black/70 transition-all shadow-xl"
            title={isPlayingAuto ? "Pause Auto-Tour" : "Auto-Play Tour"}
            aria-label={isPlayingAuto ? "Pause Automatic Walkthrough" : "Start Automatic Walkthrough"}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isPlayingAuto ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
              }`}
            />
            <span>{isPlayingAuto ? "PAUSE TOUR" : "AUTO PLAY"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
