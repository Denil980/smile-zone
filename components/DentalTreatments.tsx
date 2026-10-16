"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface DentalTreatmentsProps {
  onOpenTreatmentModal: (title: string) => void;
}

export default function DentalTreatments({ onOpenTreatmentModal }: DentalTreatmentsProps) {
  const treatments = [
    {
      title: "General Dentistry",
      icon: "/assets/ready/treatment_01_general.png?v=2",
    },
    {
      title: "Dental Implants",
      icon: "/assets/ready/treatment_02_implants.png?v=2",
    },
    {
      title: "Cosmetic Dentistry",
      icon: "/assets/ready/treatment_03_cosmetic.png?v=2",
    },
    {
      title: "Geriatric Dentistry",
      icon: "/assets/ready/treatment_04_geriatric.png?v=2",
    },
    {
      title: "Braces & Aligners",
      icon: "/assets/ready/treatment_05_braces.png?v=2",
    },
    {
      title: "Pediatric Dentistry",
      icon: "/assets/ready/treatment_06_pediatric.png?v=2",
    },
    {
      title: "Digital Dentistry",
      icon: "/assets/ready/treatment_07_digital.png?v=2",
    },
  ];

  return (
    <section
      id="treatments"
      className="relative bg-gradient-to-b from-[#FAF8F5]/85 via-white/60 to-[#FAF7F2]/85 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Ambient Lighting & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-mint/10 blur-[130px] rounded-full" />
        <div className="absolute -top-24 right-10 w-[420px] h-[420px] bg-[#e8dfc8]/25 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 left-10 w-[420px] h-[420px] bg-emerald-500/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] tracking-tight leading-tight mb-3"
          >
            Our Dental{" "}
            <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
              Treatments
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-[#3B5B52] leading-relaxed font-normal"
          >
            Explore our specialized treatments tailored for healthy, lifelong smiles.
          </motion.p>
        </div>

        {/* Minimalist Treatments Display: Icons and Treatment Names with Hover Effects */}
        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {treatments.map((t, idx) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onOpenTreatmentModal(t.title)}
              className="group flex flex-col items-center cursor-pointer w-28 sm:w-32 lg:w-36 select-none"
            >
              {/* Icon Container with Hover Glow and Floating Lift Effect */}
              <div className="relative mb-3 flex items-center justify-center">
                {/* Soft ambient mint glow halo on hover */}
                <div className="absolute inset-0 rounded-full bg-mint/35 blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

                {/* Icon Circle with smooth lift and shadow expansion */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-110 bg-white/95 border border-[#E7DFD5] shadow-luxury group-hover:border-[#085442]/50 group-hover:shadow-luxury-hover p-2">
                  <img
                    src={t.icon}
                    alt={t.title}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Treatment Name with Color Shift & Expanding Mint Dash */}
              <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#0A261F] group-hover:text-[#085442] text-center leading-snug transition-colors duration-300 px-1">
                {t.title}
              </h3>
              <span className="block w-0 group-hover:w-6 h-0.5 bg-[#00c982] rounded-full mt-1.5 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View All Treatments Dedicated Page Link */}
        <div className="text-center mt-12 sm:mt-14">
          <a
            href="/treatments"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 transition-all"
          >
            <span>View All Treatments &amp; Details</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
