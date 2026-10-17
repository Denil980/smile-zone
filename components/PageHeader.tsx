"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  currentPage: string;
  title: string;
  highlightWord?: string;
  description: string;
}

export default function PageHeader({
  currentPage,
  title,
  highlightWord,
  description,
}: PageHeaderProps) {
  // If highlightWord is provided, split and highlight it with vibrant luminous mint gradient
  const renderTitle = () => {
    if (!highlightWord) {
      return title;
    }

    const parts = title.split(highlightWord);
    if (parts.length < 2) return title;

    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-[#00E599] via-[#4EEDB2] to-[#A7F3D0] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(0,229,153,0.35)]">
          {highlightWord}
        </span>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <section className="relative bg-[#041F18] pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 border-b border-[#00c982]/20 overflow-hidden text-white">
      {/* 1. Base Dark Green to Deep Emerald Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031B14] via-[#073D30] to-[#021711]" />

      {/* 2. White & Green Radial Lighting Glows (Harmonic blend of white, green, and dark green) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Soft diffused white lightning/light orb on the upper right */}
        <div className="absolute -top-24 right-1/4 w-[540px] h-[350px] bg-white/12 blur-[105px] rounded-full mix-blend-screen" />
        {/* Luminous emerald/mint glow aura */}
        <div className="absolute top-1/4 -left-12 w-[560px] h-[380px] bg-[#00c982]/22 blur-[125px] rounded-full mix-blend-screen" />
        {/* Secondary soft white ambient glow */}
        <div className="absolute -bottom-16 right-12 w-[440px] h-[300px] bg-white/10 blur-[95px] rounded-full mix-blend-screen" />
        {/* Gentle deep forest tint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#085442]/30 blur-[140px] rounded-full" />
      </div>

      {/* 3. Lighter White Lightning & Light Sheen Texture */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.45) 0%, transparent 48%),
            radial-gradient(circle at 20% 80%, rgba(0, 201, 130, 0.3) 0%, transparent 42%),
            linear-gradient(125deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.04) 28%, transparent 50%, rgba(255, 255, 255, 0.16) 72%, transparent 100%)
          `,
        }}
      />

      {/* 4. Fine White Lightning Filament Vector Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Primary dynamic lightning streak */}
          <path
            d="M-40,70 L210,135 L370,85 L530,185 L700,125 L880,215 L1070,155 L1240,225"
            stroke="url(#lightningGlow)"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="url(#glowFilter)"
          />
          {/* Secondary delicate lightning branching branch */}
          <path
            d="M90,-30 L270,105 L430,65 L610,155 L770,95 L940,205 L1110,135 L1270,255"
            stroke="url(#lightningGlow)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <path
            d="M530,185 L580,265 L630,235"
            stroke="url(#lightningGlow)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M880,215 L920,290 L960,260"
            stroke="url(#lightningGlow)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <defs>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lightningGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#A7F3D0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00c982" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 5. Top & Bottom Luxury Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00c982]/50 to-transparent" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Breadcrumb: Home / [Page Name] */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <li>
                <a
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li className="text-white/40 select-none">/</li>
              <li className="text-white font-bold">
                {currentPage}
              </li>
            </ol>
          </nav>

          {/* Page Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
            {renderTitle()}
          </h1>

          {/* What this page is showing */}
          <p className="text-sm sm:text-base text-[#D2ECE3] leading-relaxed font-normal">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
