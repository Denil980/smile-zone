"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterCardProps {
  id: number;
  beforeImg: string;
  afterImg: string;
  title: string;
  category: string;
  description: string;
  duration: string;
}

function BeforeAfterSliderCard({
  id,
  beforeImg,
  afterImg,
  title,
  category,
  description,
  duration,
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
    <div className="group bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-[#E7DFD5] hover:border-[#085442] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      {/* Top Slider Interactive Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[230px] sm:h-[260px] w-full overflow-hidden bg-transparent cursor-ew-resize select-none touch-none"
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

        {/* Divider Line without glow/shadow */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
        />

        {/* Handle without shadow/glow */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#00c982] text-[#0A261F] flex items-center justify-center z-30 pointer-events-none group-hover:scale-110 transition-transform duration-300"
        >
          <MoveHorizontal className="w-3.5 h-3.5 text-[#0A261F] stroke-[2.8]" />
        </div>

        {/* Badges without shadow */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider border border-white/20">
            Before
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-[#00c982] text-white font-bold text-[10px] uppercase tracking-wider border border-emerald-400/40">
            After
          </span>
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white/95">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#047857] border border-[#E7DFD5]">
              {category}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#8C9E97]">
              Case #0{id}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#0A261F] leading-snug group-hover:text-[#047857] transition-colors">
            {title}
          </h3>

          <p className="text-xs text-[#4A635B] mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#4A635B]">
          <span className="font-medium text-[#6B857D]">Est. Treatment Time:</span>
          <strong className="text-[#047857] font-semibold">{duration}</strong>
        </div>
      </div>
    </div>
  );
}

const casesData = [
  {
    id: 1,
    title: "Teeth Whitening & Alignment",
    category: "Cosmetic Whitening",
    before: "/assets/ready/case1_before_full.png?v=3",
    after: "/assets/ready/case1_after_full.png?v=3",
    description: "In-office ultrasonic stain lift and enamel-safe peroxide brightening. Natural radiance restored with zero tooth sensitivity.",
    duration: "1 Sitting (45 Mins)",
  },
  {
    id: 2,
    title: "Full Smile Transformation",
    category: "Smile Makeover",
    before: "/assets/ready/case2_before_full.png?v=3",
    after: "/assets/ready/case2_after_full.png?v=3",
    description: "Comprehensive aesthetic rehabilitation combining porcelain crowns and shade-matched composite veneers for balanced facial symmetry.",
    duration: "2 Sittings",
  },
  {
    id: 3,
    title: "Porcelain Veneers & Restorations",
    category: "Veneers & Crowns",
    before: "/assets/ready/case3_before_full.png?v=3",
    after: "/assets/ready/case3_after_full.png?v=3",
    description: "Custom ultra-thin ceramic veneers designed to correct chipped incisal edges, deep staining, and minor tooth rotations.",
    duration: "2 Sittings",
  },
  {
    id: 4,
    title: "Deep Stain Enamel Brightening",
    category: "Cosmetic Whitening",
    before: "/assets/ready/case4_before_full.png?v=3",
    after: "/assets/ready/case4_after_full.png?v=3",
    description: "Targeted stubborn stain removal caused by tea, coffee, and fluorosis, followed by remineralizing fluoride therapy.",
    duration: "1 Sitting (60 Mins)",
  },
  {
    id: 5,
    title: "Aesthetic Smile Realignment",
    category: "Clear Aligners",
    before: "/assets/ready/case5_before_full.png?v=3",
    after: "/assets/ready/case5_after_full.png?v=3",
    description: "Discrete, clear aligners used to correct front teeth crowding and close minor bite misalignment comfortably.",
    duration: "4 - 6 Months",
  },
  {
    id: 6,
    title: "Diastema Closure & Bonding",
    category: "Restorative Bonding",
    before: "/assets/ready/case6_before_full.png?v=3",
    after: "/assets/ready/case6_after_full.png?v=3",
    description: "Minimally invasive composite bonding to close mid-line spacing (diastema) without any natural tooth shaving.",
    duration: "Single Sitting (40 Mins)",
  },
  {
    id: 7,
    title: "Gum Line & Shade Correction",
    category: "Smile Makeover",
    before: "/assets/ready/case7_before_full.png?v=3",
    after: "/assets/ready/case7_after_full.png?v=3",
    description: "Harmonious gingival recontouring and aesthetic tooth-colored restorations for a balanced, youthful smile line.",
    duration: "2 Sittings",
  },
  {
    id: 8,
    title: "Comprehensive Smile Design",
    category: "Full Mouth Rehab",
    before: "/assets/ready/case8_before_full.png?v=3",
    after: "/assets/ready/case8_after_full.png?v=3",
    description: "Digital smile planning for worn dentition, restoring optimal chewing function and youthful smile contours.",
    duration: "Customized Plan",
  },
];

const clinicPhotos = [
  {
    title: "Welcoming Clinic Reception",
    desc: "A calm, comfortable lounge designed to eliminate dental anxiety from the moment you step in.",
    img: "/assets/ready/clinic_reception.jpg",
  },
  {
    title: "Advanced Digital 3D Scanner",
    desc: "Low-radiation digital radiography and high-precision intraoral scanner for painless digital impressions.",
    img: "/assets/ready/clinic_scanner.jpg",
  },
  {
    title: "Ergonomic Dental Operatory",
    desc: "State-of-the-art dental chair equipped with silent micro-motors and hospital-grade sterilization.",
    img: "/assets/ready/doctor_booking_operatory_v2.jpg",
  },
  {
    title: "Modern Sterilization & Cabinets",
    desc: "Strict 6-step autoclave sterilization protocol ensuring 100% patient hygiene and safety.",
    img: "/assets/ready/clinic_cabinets.jpg",
  },
];

const categories = [
  "All Cases",
  "Cosmetic Whitening",
  "Smile Makeover",
  "Veneers & Crowns",
  "Clear Aligners",
  "Restorative Bonding",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Cases");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredCases =
    selectedCategory === "All Cases"
      ? casesData
      : casesData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#0A261F] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Soft Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-teal-400/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      {/* Floating Global Navbar */}
      <Navbar onOpenBookingModal={() => setBookingModalOpen(true)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <main className="pt-24 sm:pt-32 relative z-10">

        {/* ========================================================= */}
        {/* INTERACTIVE BEFORE & AFTER GALLERY                        */}
        {/* ========================================================= */}
        <section className="py-14 sm:py-20 relative">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#047857] to-[#0A261F] text-white border border-[#047857] shadow-[0_6px_20px_rgba(4,120,87,0.3)] scale-105"
                        : "bg-white/90 backdrop-blur-md border border-[#E7DFD5] text-[#0A261F] hover:border-[#047857]/50 hover:text-[#047857] shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Sliders Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredCases.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 12 }}
                    transition={{
                      layout: { type: "spring", stiffness: 320, damping: 28, mass: 0.7 },
                      opacity: { duration: 0.28, ease: "easeOut" },
                      scale: { duration: 0.28, ease: "easeOut" },
                      y: { duration: 0.28, ease: "easeOut" },
                    }}
                  >
                    <BeforeAfterSliderCard
                      id={item.id}
                      beforeImg={item.before}
                      afterImg={item.after}
                      title={item.title}
                      category={item.category}
                      description={item.description}
                      duration={item.duration}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CLINIC ENVIRONMENT & TECHNOLOGY SHOWCASE                  */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F5EFEB]/50 via-[#FAF8F5] to-[#FAF8F5] border-t border-[#E7DFD5] relative overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">

              <h2 className="text-2xl sm:text-4xl font-black text-[#0A261F] tracking-tight">
                Modern Studio &amp; Sterile Operatory
              </h2>
              <p className="text-xs sm:text-sm text-[#4A635B] mt-2">
                A hygienic, comforting space equipped with high-definition digital dental technologies to ensure safety and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clinicPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-[#E7DFD5] hover:border-[#085442] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0A261F] mb-1 group-hover:text-[#047857] transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-[#4A635B] leading-relaxed">
                        {photo.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
