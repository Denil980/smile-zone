"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from "lucide-react";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Priya T.",
      treatment: "Family & Pediatric Care",
      location: "Verified Google Review • Tilak Nagar Clinic",
      rating: 5,
      text: "My children and I have our dental check ups and treatments done by Dr. Lajja Kamdar at SmileZone Dental Studio. She is very patient, gentle with kids, and explains everything clearly. Highly recommended for families!",
    },
    {
      name: "Rahul M.",
      treatment: "Restorative Dental Care",
      location: "Verified Google Review • Chembur",
      rating: 5,
      text: "I had to get urgent dental treatment and all necessary clinical safety protocols were followed meticulously. The procedure was completely painless and very well explained. Thank you Dr. Lajja for saving my smile.",
    },
    {
      name: "Sneha K.",
      treatment: "Cosmetic & Long-Term Care",
      location: "Verified Google Review • Mumbai",
      rating: 5,
      text: "Dr. Lajja has magic hands. She is fully up to date with the latest dental technology and gives the right long-term medical solution without unnecessary procedures. Transparent, trustworthy, and very reasonable in her charges.",
    },
    {
      name: "Anand S.",
      treatment: "Painless Root Canal & Crown",
      location: "Verified Google Review • Tilak Nagar Clinic",
      rating: 5,
      text: "I had severe dental anxiety for years until I visited SmileZone. Dr. Lajja made the root canal and zirconia crown placement completely pain-free with zero discomfort afterwards. The clinic hygiene is unmatched.",
    },
    {
      name: "Meera R.",
      treatment: "Cosmetic Veneers & Whitening",
      location: "Verified Google Review • Chembur",
      rating: 5,
      text: "Got my teeth whitening and aesthetic smile alignment done here. The results were visible immediately and looked completely natural. Dr. Lajja's clinical precision and warm approach put me at ease throughout.",
    },
    {
      name: "Karan D.",
      treatment: "Digital Scanning & Routine Care",
      location: "Verified Google Review • Mumbai",
      rating: 5,
      text: "State-of-the-art dental equipment, strict sterilization, and prompt appointment timing. Dr. Lajja explains the intraoral scan live on screen before starting. Best dental clinic in Chembur by far.",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-[#FAF8F5]/85 via-white/70 to-[#FAF6F0]/85 py-20 sm:py-28 relative overflow-hidden text-[#092620]"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-mint/10 blur-[150px] rounded-full" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#e8dfc8]/30 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Inner Glass Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#E7DFD5] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-none relative overflow-hidden">
          {/* Top Shimmer Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00c982]/40 to-transparent opacity-50" />

          {/* Header Row */}
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] leading-tight tracking-tight mb-3"
              >
                Patient{" "}
                <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
                  Testimonials
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-[#3B5B52] leading-relaxed font-normal"
              >
                It&apos;s truly rewarding to know what our patients have to say about their experience with Dr. Lajja Kamdar and SmileZone Dental Studio.
              </motion.p>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-4">

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  aria-label="Previous testimonials"
                  className="w-10 h-10 rounded-full bg-white border border-[#D5E5DE] text-[#0A261F] flex items-center justify-center hover:bg-[#085442] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer shadow-none"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Next testimonials"
                  className="w-10 h-10 rounded-full bg-white border border-[#D5E5DE] text-[#0A261F] flex items-center justify-center hover:bg-[#085442] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer shadow-none"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.4]" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Carousel Grid */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 pt-1"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white hover:bg-[#FAFDFB] border border-[#E7DFD5] hover:border-[#085442] shadow-none rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 w-[310px] sm:w-[350px] lg:w-[calc(33.333%-16px)] shrink-0 snap-start overflow-hidden cursor-pointer"
              >
                {/* Top Subtle Shimmer Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00c982] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Top Row: 5 Stars + Verified Badge + Quote Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 stroke-none" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#085442] bg-[#EAF6F0] px-2 py-0.5 rounded-full border border-[#C5E5D5]">
                        <CheckCircle2 className="w-3 h-3 text-[#00c982]" />
                        Verified
                      </span>
                    </div>

                    <Quote className="w-7 h-7 text-[#D4E8DF] group-hover:text-[#085442]/40 transition-colors duration-300" />
                  </div>

                  {/* Patient Review Text */}
                  <p className="text-xs sm:text-sm text-[#24423A] leading-relaxed font-normal mb-6">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                {/* Card Bottom: Procedure Tag, Patient Name & Origin */}
                <div className="pt-4 border-t border-[#EFE8DF] flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#0A261F] group-hover:text-[#085442] transition-colors duration-200">
                      {t.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#085442] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E7DFD5]">
                      {t.treatment}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#69877F] font-medium">
                    {t.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
