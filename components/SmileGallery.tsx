"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";

interface BeforeAfterCardProps {
  id: number;
  beforeImg: string;
  afterImg: string;
  title: string;
  category: string;
}

function BeforeAfterCard({
  id,
  beforeImg,
  afterImg,
  title,
  category,
}: BeforeAfterCardProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(4, Math.min(96, pos)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsInteracting(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteracting) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  return (
    <div className="group relative flex flex-col bg-white hover:bg-[#FAFDFB] border border-[#E7DFD5] hover:border-[#085442] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 shrink-0 w-[245px] sm:w-[265px] md:w-[285px] lg:w-[calc(25%-18px)] snap-start cursor-pointer">
      {/* Top Shimmer Sheen Accent on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00c982] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />

      {/* Top Slider Container (Decreased size & optimized aspect ratio) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[195px] sm:h-[215px] md:h-[230px] w-full overflow-hidden bg-transparent cursor-ew-resize select-none touch-none"
      >
        {/* After Image (Background Layer) */}
        <img
          src={afterImg}
          alt={`${title} After Treatment`}
          className="absolute inset-0 w-full h-full object-cover contrast-[1.08] brightness-[1.04] saturate-[1.08] select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Before Image (Clipped Overlay Layer with clipPath) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          <img
            src={beforeImg}
            alt={`${title} Before Treatment`}
            className="w-full h-full object-cover contrast-[1.08] brightness-[1.04] saturate-[1.08] select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Vertical Divider Line without glow/shadow */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
        />

        {/* Draggable Center Handle without shadow/glow */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#00c982] text-emerald-950 flex items-center justify-center z-30 pointer-events-none group-hover:scale-115 transition-transform duration-300"
        >
          <MoveHorizontal className="w-3.5 h-3.5 text-emerald-950 stroke-[2.8]" />
        </div>

        {/* Floating Before / After Badges without shadow */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center z-20 pointer-events-none">
          <span className="bg-black/75 text-white/95 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/15">
            Before
          </span>
          <span className="bg-[#00c982] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300/40">
            After
          </span>
        </div>

        {/* Interactive Cue Hint */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/60 backdrop-blur-md border border-white/10 text-white/85 text-[9px] font-semibold px-2 py-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
          Drag slider ↔
        </div>
      </div>

      {/* Bottom Title Bar (Clean, without description or extra links) */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-center bg-[#FAF8F5] group-hover:bg-[#F2FAF6] border-t border-[#EFE8DF] transition-colors duration-300">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAF6F0] text-[#085442] border border-[#C5E5D5]">
            {category}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#7C9D94] group-hover:text-[#085442] transition-colors">
            Case #0{id}
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-[#0A261F] leading-snug group-hover:text-[#085442] transition-colors duration-200 line-clamp-1">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function SmileGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const cases = [
    {
      id: 1,
      title: "Teeth Whitening & Alignment",
      category: "Cosmetic Whitening",
      before: "/assets/ready/case1_before_full.png?v=3",
      after: "/assets/ready/case1_after_full.png?v=3",
    },
    {
      id: 2,
      title: "Full Smile Transformation",
      category: "Smile Makeover",
      before: "/assets/ready/case2_before_full.png?v=3",
      after: "/assets/ready/case2_after_full.png?v=3",
    },
    {
      id: 3,
      title: "Porcelain Veneers & Restorations",
      category: "Veneers & Crowns",
      before: "/assets/ready/case3_before_full.png?v=3",
      after: "/assets/ready/case3_after_full.png?v=3",
    },
    {
      id: 4,
      title: "Deep Stain Enamel Brightening",
      category: "Enamel Brightening",
      before: "/assets/ready/case4_before_full.png?v=3",
      after: "/assets/ready/case4_after_full.png?v=3",
    },
    {
      id: 5,
      title: "Aesthetic Smile Realignment",
      category: "Clear Aligners",
      before: "/assets/ready/case5_before_full.png?v=3",
      after: "/assets/ready/case5_after_full.png?v=3",
    },
    {
      id: 6,
      title: "Diastema Closure & Bonding",
      category: "Restorative Bonding",
      before: "/assets/ready/case6_before_full.png?v=3",
      after: "/assets/ready/case6_after_full.png?v=3",
    },
    {
      id: 7,
      title: "Gum Line & Shade Correction",
      category: "Periodontal Aesthetics",
      before: "/assets/ready/case7_before_full.png?v=3",
      after: "/assets/ready/case7_after_full.png?v=3",
    },
    {
      id: 8,
      title: "Comprehensive Smile Design",
      category: "Full Mouth Rehab",
      before: "/assets/ready/case8_before_full.png?v=3",
      after: "/assets/ready/case8_after_full.png?v=3",
    },
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-[#FAF7F2]/80 via-[#F4F9F6]/55 to-[#FAF8F5]/80 py-20 sm:py-28 relative overflow-hidden text-[#092620]"
    >
      {/* Ambient Lighting & Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-mint/10 blur-[150px] rounded-full" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#e8dfc8]/30 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Inner Glass Container without outer shadow */}
        <div className="bg-white/90 backdrop-blur-xl border border-[#E7DFD5] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Top Decorative Shimmer Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00c982]/40 to-transparent opacity-50" />

          {/* Section Header Row */}
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] leading-tight tracking-tight mb-3"
              >
                Smile{" "}
                <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
                  Gallery
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base text-[#3B5B52] leading-relaxed font-normal"
              >
                Explore real results achieved by Dr. Lajja Kamdar. Drag the interactive split-slider on each case to inspect clinical precision, shade brightening, and bite realignment.
              </motion.p>
            </div>

            {/* Navigation Carousel Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={scrollLeft}
                aria-label="Previous gallery cases"
                className="w-10 h-10 rounded-full bg-white border border-[#D5E5DE] text-[#0A261F] flex items-center justify-center hover:bg-[#085442] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next gallery cases"
                className="w-10 h-10 rounded-full bg-white border border-[#D5E5DE] text-[#0A261F] flex items-center justify-center hover:bg-[#085442] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.4]" />
              </button>
            </div>
          </div>

          {/* Interactive Before/After Carousel Grid */}
          <div
            ref={carouselRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pt-1"
          >
            {cases.map((c) => (
              <BeforeAfterCard
                key={c.id}
                id={c.id}
                title={c.title}
                category={c.category}
                beforeImg={c.before}
                afterImg={c.after}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
