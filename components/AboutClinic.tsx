"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  HeartHandshake,
  Star,
} from "lucide-react";

function MetricCounter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
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
      setCount(easeProgress * value);

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
      {decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutClinic() {
  const features = [
    {
      title: "Best Quality Dental Care",
      desc: "We ensure highest standards in dental treatment with precision clinical technology.",
      icon: "/assets/site_images/Icon_1.png",
      lucide: Award,
      badge: "ISO Certified",
    },
    {
      title: "Friendly Staff",
      desc: "A warm, caring team always ready to ensure your visit is calm and comfortable.",
      icon: "/assets/site_images/Icon_2.png",
      lucide: HeartHandshake,
      badge: "Caring Care",
    },
    {
      title: "Dental Treatments For Whole Family",
      desc: "Comprehensive multi-speciality dental care tailored for all age groups.",
      icon: "/assets/site_images/Icon_3.png",
      lucide: Users,
      badge: "All Ages",
    },
  ];

  const trustMetrics = [
    { label: "Clinical Excellence", target: 20, suffix: "+ Yrs" },
    { label: "Delighted Smiles", target: 15000, suffix: "+" },
    { label: "Google Rating", target: 4.9, decimals: 1, suffix: " ★" },
  ];

  return (
    <section
      id="about-clinic"
      className="relative bg-gradient-to-b from-[#FAF8F5]/85 via-white/70 to-[#FAF6F0]/85 py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient Atmospheric Glow & Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-32 w-[520px] h-[520px] bg-gradient-to-br from-mint/15 to-[#e8dfc8]/25 blur-[130px] rounded-full" />
        <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] bg-gradient-to-tr from-emerald-100/30 to-mint/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-white/50 blur-[90px] rounded-full" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1.1fr_0.8fr] items-center gap-10 lg:gap-8 xl:gap-12">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Premium Headline, Narrative & Trust Metrics   */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >

            {/* Main Headline (Strictly 2 lines) */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black text-[#0A261F] leading-tight tracking-tight mb-7 sm:mb-8">
              <span className="block mb-1.5">Best Family Dentist</span>
              <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent inline-block whitespace-nowrap pt-1 pb-3 px-1 -mx-1 leading-normal overflow-visible">
                in Tilak Nagar, Chembur
              </span>
            </h2>

            {/* Subtitle with Emerald Accent Line */}
            <div className="relative pl-3 border-l-2 border-[#00c982] mb-5">
              <h4 className="text-xs sm:text-sm font-bold text-[#085442] tracking-wide">
                Best Quality Dental Care at Dr. Lajja&apos;s SmileZone Dental Studio
              </h4>
            </div>

            {/* Body Description - Two Separate Paragraphs */}
            <div className="space-y-3 mb-6">
              <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal">
                SmileZone Dental Studio is a Multispeciality Dental Clinic in Tilak Nagar, Chembur led by Dr. Lajja Kamdar who has 20+ years of experience in Dentistry.
              </p>
              <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal">
                From General Dentistry, Cosmetic Dentistry, to Dental Implants, at SmileZone Dental Studio we&apos;re proud to offer a wide range of highest-quality dental treatments to our patients.
              </p>
            </div>

            {/* 3 Quick Trust Metric Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mb-7">
              {trustMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="group/metric relative overflow-hidden bg-white/95 hover:bg-[#F2FAF6] border border-[#E7DFD5] hover:border-[#085442] rounded-2xl p-2.5 sm:p-3 text-center shadow-luxury-sm hover:shadow-luxury backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-sm sm:text-base font-black text-[#085442] group-hover/metric:text-[#06382b] tracking-tight transition-colors duration-300">
                    <MetricCounter
                      value={metric.target}
                      decimals={metric.decimals}
                      suffix={metric.suffix}
                    />
                  </div>
                  <div className="text-[10px] text-[#527269] group-hover/metric:text-[#085442] font-semibold leading-tight mt-0.5 transition-colors duration-300">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <Link
              href="/about#about-clinic"
              className="relative overflow-hidden group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-sm px-7 py-3 rounded-full shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              {/* Shimmer Light Reflection Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

              <span className="tracking-tight">Know More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* ========================================================= */}
          {/* CENTER COLUMN: 3 Feature Cards with Luxury Hover Lift      */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {features.map((feat, idx) => {
              const Icon = feat.lucide;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className="group relative bg-white/95 hover:bg-[#F2FAF6] rounded-2xl p-4 sm:p-5 border border-[#E7DFD5] hover:border-[#085442] shadow-luxury hover:shadow-luxury-hover backdrop-blur-sm transition-all duration-300 flex items-start gap-4 overflow-hidden cursor-pointer"
                >
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] group-hover:from-white group-hover:to-[#D2F5E8] border border-[#BCE4D3] group-hover:border-[#085442]/40 flex items-center justify-center p-2.5 shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-[#085442]">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#0A261F] group-hover:text-[#085442] leading-snug transition-colors duration-300">
                      {feat.title}
                    </h3>
                    <span className="text-[10px] font-bold text-[#085442] bg-[#FAF7F2] group-hover:bg-[#085442] group-hover:text-white px-2.5 py-0.5 rounded-full border border-[#E7DFD5] group-hover:border-[#085442] transition-colors duration-300 shrink-0">
                      {feat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#527269] group-hover:text-[#085442] leading-relaxed font-normal transition-colors duration-300">
                    {feat.desc}
                  </p>
                </div>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D Tooth Visual with Orbital Rings & Badges  */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center items-center py-6 lg:py-0"
          >
            {/* Luminous Glowing Aura Backdrop */}
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-mint/30 via-emerald-200/35 to-teal-100/15 blur-3xl -z-10 animate-pulse" />

            {/* Rotating Decorative Concentric Orbital Rings */}
            <div className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-emerald-400/25 border-dashed animate-[spin_35s_linear_infinite] pointer-events-none -z-10" />
            <div className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full border border-teal-200/30 pointer-events-none -z-10" />

            {/* Floating Mini-Badge 1: Top Left */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 left-0 sm:-left-4 z-20 bg-white/95 backdrop-blur-md border border-emerald-200/80 px-3.5 py-2 rounded-2xl shadow-[0_8px_20px_rgba(4,38,30,0.08)] flex items-center gap-2 text-xs font-bold text-emerald-950 pointer-events-none"
            >
              <div className="w-6 h-6 rounded-full bg-mint/20 border border-mint/50 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Gentle Care</span>
                <span className="text-xs font-black text-emerald-900">100% Painless</span>
              </div>
            </motion.div>

            {/* Floating Mini-Badge 2: Bottom Right */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-3 right-0 sm:-right-4 z-20 bg-white/95 backdrop-blur-md border border-emerald-200/80 px-3.5 py-2 rounded-2xl shadow-[0_8px_20px_rgba(4,38,30,0.08)] flex items-center gap-2 text-xs font-bold text-emerald-950 pointer-events-none"
            >
              <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Verified Care</span>
                <span className="text-xs font-black text-emerald-900">Advanced Tech</span>
              </div>
            </motion.div>

            {/* Central 3D Floating Tooth Graphic (Crystal Clear HD) */}
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex items-center justify-center"
            >
              <div className="relative p-2 flex items-center justify-center">
                <img
                  src="/assets/ready/tooth_3d_hd.png?v=3"
                  alt="3D Sparkling White Tooth with Mint Orbital Ring and Fresh Green Leaves"
                  className="w-[280px] sm:w-[320px] lg:w-[340px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,180,120,0.22)] select-none pointer-events-none transition-all duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
