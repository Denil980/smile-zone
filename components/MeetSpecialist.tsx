"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, GraduationCap, Award, ShieldCheck, Users } from "lucide-react";

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    const frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function MeetSpecialist() {
  const stats = [
    { target: 20, suffix: "+", label: "Years Of Experience", icon: Award },
    { target: 15000, suffix: "+", label: "Happy Patients", icon: Users },
    { target: 100, suffix: "%", label: "Patient Satisfaction", icon: ShieldCheck },
    { text: "Specialist In", label: "Smile Design", icon: GraduationCap },
  ];

  return (
    <section
      id="specialist"
      className="relative bg-gradient-to-b from-[#FAF6F0]/85 via-[#F5F8F6]/60 to-[#FAF8F5]/85 text-[#092620] py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Ambient Lighting & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-mint/10 blur-[130px] rounded-full" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#e8dfc8]/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-16 mb-16">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Narrative & Bio                               */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] leading-tight mb-5">
              Founder <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">Dr. Lajja Kamdar</span>
            </h2>

            {/* Bio Narrative */}
            <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed mb-4 font-normal">
              Dr. Lajja Kamdar is a well-reputed Dentist in Tilak Nagar, Chembur. She acquired her degree of bachelor&apos;s in &apos;Dental Surgery&apos; from the prestigious Nair Hospital Dental College, Mumbai in the year 2000. Her journey with private practice started in 2001 with <strong>SmileZone Dental Studio</strong>, regularly upgraded with the latest techniques, machines, and materials.
            </p>
            <p className="text-xs sm:text-sm text-[#4E6B63] leading-relaxed mb-6 font-normal">
              Specialized in Full Mouth Rehabilitation, SMILE DESIGN, Flexible Dentures, Dental Implants, and Pediatric Root Canals under anesthesia. Strict hospital fumigation, air purification, and sterilization ensure safety is always utmost priority.
            </p>

            {/* Action CTA Button */}
            <Link
              href="/about#lead-dentist"
              className="relative overflow-hidden group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              {/* Shimmer Light Reflection Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

              <span className="tracking-tight">Know More About Dr. Lajja</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Doctor Portrait Real Desk Photograph         */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center items-center relative"
          >
            {/* Luminous Glow Behind Doctor */}
            <div className="absolute -inset-4 bg-gradient-to-t from-mint/20 via-[#e8dfc8]/30 to-transparent blur-3xl rounded-3xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-white via-white/90 to-[#FAF7F2] border-2 border-[#E2DDD3] shadow-[0_20px_50px_rgba(10,38,31,0.08)] group max-w-md w-full">
              <div className="rounded-2xl overflow-hidden relative">
                <img
                  src="/assets/ready/dr_lajja_desk.png"
                  alt="Dr. Lajja Kamdar at SmileZone Dental Studio desk"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-[#E7DFD5] rounded-xl p-3 text-left shadow-lg">
                  <span className="text-[#0A261F] font-extrabold text-sm block">Dr. Lajja Kamdar</span>
                  <span className="text-[#085442] text-xs font-semibold">BDS (Nair Hospital Dental College, 2000) • 20+ Yrs Exp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM: Glassmorphic Stats Strip                           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 border border-[#E7DFD5] backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-luxury"
        >
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-3.5 ${
                  idx < 3 ? "lg:border-r border-[#E7DFD5] lg:pr-4" : ""
                } hover:-translate-y-0.5 transition-transform duration-300`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] border border-[#BCE4D3] flex items-center justify-center text-[#085442] shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-[#085442] stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#085442] leading-none mb-1">
                    {s.target !== undefined ? (
                      <Counter value={s.target} suffix={s.suffix} />
                    ) : (
                      s.text
                    )}
                  </div>
                  <div className="text-xs text-[#527269] font-medium leading-tight">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
