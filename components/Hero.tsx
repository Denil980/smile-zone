"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Play, ArrowRight, Heart } from "lucide-react";

export function TypewriterHeading({
  part1,
  part2,
  hasBreak = false,
  className = "",
  part1ClassName = "",
  part2ClassName = "bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent",
  cursorClassName = "",
  typeSpeed = 48,
  initialDelay = 300,
}: {
  part1: string;
  part2: string;
  hasBreak?: boolean;
  className?: string;
  part1ClassName?: string;
  part2ClassName?: string;
  cursorClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  restartDelay?: number;
  initialDelay?: number;
  loop?: boolean;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const [mounted, setMounted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const totalChars = part1.length + part2.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    // Initial natural hesitation before starting
    if (charIndex === 0 && !isComplete) {
      timeoutId = setTimeout(() => {
        setCharIndex(1);
      }, initialDelay);
      return () => clearTimeout(timeoutId);
    }

    if (charIndex < totalChars) {
      // Natural human typing rhythm (slight micro-fluctuations)
      const isAtBreak = charIndex === part1.length;
      let delay = typeSpeed;

      if (isAtBreak) {
        delay = 220; // Natural breath before second line/word
      } else {
        const char = (charIndex <= part1.length ? part1 : part2)[
          charIndex <= part1.length ? charIndex - 1 : charIndex - part1.length - 1
        ];
        if (char === " ") {
          delay = typeSpeed + 75; // Brief space hesitation
        } else {
          delay = typeSpeed + ((charIndex % 3) * 14 - 10);
        }
      }

      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, delay);
    } else {
      // Typing finished cleanly - stabilize text!
      setIsComplete(true);
      // Let the cursor blink gracefully for 3 seconds then fade out
      const fadeCursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, 3000);
      return () => clearTimeout(fadeCursorTimer);
    }

    return () => clearTimeout(timeoutId);
  }, [mounted, isInView, charIndex, totalChars, part1, part2, typeSpeed, initialDelay, isComplete]);

  const text1 = part1.slice(0, Math.min(charIndex, part1.length));
  const text2 =
    charIndex > part1.length
      ? part2.slice(0, charIndex - part1.length)
      : "";

  const isCursorAtLine1 = charIndex <= part1.length;
  const isCursorAtLine2 = charIndex > part1.length;

  return (
    <h1 ref={containerRef} className={`relative ${className}`}>
      {/* Invisible ghost layout to strictly prevent any layout shifting */}
      <span className="invisible select-none pointer-events-none block" aria-hidden="true">
        <span className={part1ClassName}>{part1}</span>
        {hasBreak ? <br /> : " "}
        <span className={part2ClassName}>{part2}</span>
      </span>

      {/* Accessible text for screen readers & SEO */}
      <span className="sr-only">
        {part1} {part2}
      </span>

      {/* Animated Typing Overlay positioned directly over the ghost layout */}
      <span className="absolute inset-0 block select-text" aria-hidden="true">
        {mounted ? (
          <>
            <span className={part1ClassName}>{text1}</span>
            {isCursorAtLine1 && showCursor && (
              <span
                className={`inline-block w-[3.5px] sm:w-[4px] h-[0.85em] ml-1 bg-[#00c982] align-middle rounded-sm shadow-[0_0_12px_rgba(0,201,130,0.9)] animate-cursor-blink transition-opacity duration-500 ${cursorClassName}`}
              />
            )}
            {hasBreak ? (
              charIndex > part1.length && <br />
            ) : (
              charIndex > part1.length && " "
            )}
            {charIndex > part1.length && (
              <span
                className={`${part2ClassName} transition-all duration-300 ${
                  isComplete ? "drop-shadow-[0_2px_12px_rgba(0,201,130,0.25)]" : ""
                }`}
              >
                {text2}
              </span>
            )}
            {isCursorAtLine2 && showCursor && (
              <span
                className={`inline-block w-[3.5px] sm:w-[4px] h-[0.85em] ml-1 bg-[#00c982] align-middle rounded-sm shadow-[0_0_12px_rgba(0,201,130,0.9)] animate-cursor-blink transition-opacity duration-500 ${cursorClassName}`}
              />
            )}
          </>
        ) : (
          <>
            <span className={part1ClassName}>{part1}</span>
            {hasBreak ? <br /> : " "}
            <span className={part2ClassName}>{part2}</span>
          </>
        )}
      </span>
    </h1>
  );
}

interface HeroProps {
  onOpenVideoModal: () => void;
  onOpenBookingModal?: () => void;
}

export default function Hero({ onOpenVideoModal, onOpenBookingModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-[#FAF7F2]/80 via-[#F3F8F5]/60 to-[#FAF8F5]/80 text-[#092620] pt-36 sm:pt-48 lg:pt-56 xl:pt-60 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Ambient Atmospheric Luxury Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-mint/15 to-[#e8dfc8]/30 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-gradient-to-tr from-emerald-100/40 to-mint/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-gradient-to-tl from-[#e8dfc8]/25 to-transparent blur-[110px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-12">
          {/* Left Column: Content */}
          <div className="max-w-xl">
            {/* Headline with Typewriter Animation */}
            <TypewriterHeading
              part1="Healthy Smiles"
              part2="Happier Lives"
              hasBreak={true}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A261F] leading-[1.12] tracking-tight mb-4"
              part2ClassName="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent"
            />

            {/* Handwritten Cursive Badge with Smooth Float-In */}
            <motion.div
              initial={{ opacity: 0, y: 14, rotate: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 font-script text-2xl sm:text-3xl text-[#085442] mb-5 select-none"
            >
              <span>Your Smile Our Priority</span>
              <Heart className="w-5 h-5 text-[#00c982] fill-[#00c982] inline-block animate-pulse" />
            </motion.div>

            {/* Subtitle with Soft Fade & Lift */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#3B5B52] leading-relaxed mb-8 max-w-lg"
            >
              At Smile Zone, we combine advanced technology, expert care and a gentle approach to give you a brighter, healthier smile.
            </motion.p>

            {/* Action Buttons with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {/* Primary: Book Appointment CTA */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else if (typeof window !== "undefined") {
                    const el = document.getElementById("book-appointment");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.href = "/#book-appointment";
                  }
                }}
                className="relative overflow-hidden group bg-gradient-to-r from-[#00c982] via-[#00b573] to-[#047857] text-white font-black px-7 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                {/* Shimmer Light Reflection Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                <span className="tracking-tight">Book Appointment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              {/* Secondary: Watch Video Modal Trigger */}
              <button
                onClick={onOpenVideoModal}
                className="group relative overflow-hidden bg-white/90 hover:bg-white backdrop-blur-xl border border-[#D5E5DE] hover:border-[#085442]/40 text-[#0A261F] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full flex items-center gap-3 shadow-[0_8px_20px_rgba(10,38,31,0.06)] hover:shadow-[0_12px_28px_rgba(10,38,31,0.12)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                {/* Outer Glow Halo Ring on Play Icon */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#00c982] to-[#085442] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,201,130,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                <span className="tracking-tight">Watch Video</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual with Patient in Chair */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Luminous Glow Behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-mint/20 via-[#e8dfc8]/25 to-transparent blur-2xl rounded-3xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-white/90 via-white/80 to-[#FAF7F2] border border-[#E2DDD3] shadow-[0_20px_50px_rgba(10,38,31,0.08)] group">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/assets/ready/hero_woman_clean_hd.png?v=3"
                  alt="Patient smiling in dental chair"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Organic Bottom SVG Multi-Layer Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14"
        >
          {/* Back Wave: Warm Champagne Tint */}
          <path
            d="M0,25 C200,95 420,-10 650,55 C880,120 1050,30 1200,60 L1200,120 L0,120 Z"
            fill="rgba(235, 222, 198, 0.45)"
          />
          {/* Mid Wave: Whisper Mint Tint */}
          <path
            d="M0,45 C280,10 520,85 780,25 C980,-20 1100,50 1200,35 L1200,120 L0,120 Z"
            fill="rgba(216, 237, 226, 0.55)"
          />
          {/* Fore Wave: Porcelain Ivory flowing to next section */}
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
    </section>
  );
}
