"use client";

import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ScrollVideoHero from "./components/ScrollVideoHero";

export default function Home() {
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleJumpToScene = (sceneIndex: number) => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;
    const totalScrollable = heroEl.offsetHeight - window.innerHeight;
    const targetProgress = sceneIndex === 0 ? 0.16 : sceneIndex === 1 ? 0.48 : 0.78;
    window.scrollTo({
      top: heroEl.offsetTop + targetProgress * totalScrollable,
      behavior: "smooth",
    });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative bg-[#0b0d0c] text-[#f4f4f0] min-h-screen selection:bg-emerald-500 selection:text-black">
      {/* Cinematic Navigation Header */}
      <Navigation
        currentProgress={currentProgress}
        onJumpToScene={handleJumpToScene}
        onReplay={handleReplay}
      />

      {/* Hero Section Only */}
      <ScrollVideoHero onProgressChange={setCurrentProgress} />
    </main>
  );
}
