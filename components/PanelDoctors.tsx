"use client";

import React from "react";
import { motion } from "framer-motion";

interface Doctor {
  name: string;
  role: string;
  qualifications: string;
  img: string;
}

export default function PanelDoctors() {
  const doctors: Doctor[] = [
    {
      name: "Dr. Lajja Kamdar",
      role: "Chief Dental Surgeon & Smile Specialist",
      qualifications:
        "BDS (Nair Hospital Dental College), Certified in Cosmetic Dentistry, Restorative Dentistry, and Pediatric Dentistry. Specialized in Full Mouth Rehabilitation with expertise in SMILE DESIGN",
      img: "/assets/ready/dr_lajja_circle.png",
    },
    {
      name: "Dr. Yoban Shetty",
      role: "Specialist Orthodontist & Dentofacial",
      qualifications:
        "B.D.S., M.D.S (ORTHO), PHD (ORTHO, FRANCE), PG DIPLOMA (COSMETOLOGY, UKRAINE)",
      img: "/assets/ready/dr_yoban_shetty.jpg",
    },
    {
      name: "Dr. Ninad Khatal",
      role: "Consultant Oral Surgeon & Implantologist",
      qualifications:
        "BDS (Pune, India), Masters Oral Surgery & Implantology (Italy) FICOI (USA)",
      img: "/assets/ready/dr_ninad_khatal.jpg",
    },
  ];

  return (
    <section id="doctors" className="bg-gradient-to-b from-[#FAF8F5]/85 via-[#F4F9F6]/55 to-[#FAF8F5]/85 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Ambient Lighting & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-mint/10 blur-[130px] rounded-full" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#e8dfc8]/25 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] tracking-tight leading-tight mb-4"
          >
            Panel Of{" "}
            <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
              Doctors
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-[#527269] leading-relaxed font-normal"
          >
            Our Team Of Best Dental Specialists Who Are Passionate About Providing The Best Dental Treatment To Our Patients.
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* DOCTORS CARDS (Clean, Authentic, Real Human Design)        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white/95 border border-[#E7DFD5] rounded-3xl p-7 sm:p-8 text-center flex flex-col justify-between shadow-luxury hover:border-[#085442] hover:shadow-luxury-hover transition-all duration-300 group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Circular Portrait with Vibrant Ring */}
                <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#00c982] via-[#0b8064] to-[#047857] shadow-[0_8px_20px_rgba(0,201,130,0.25)] mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full rounded-full object-cover bg-white select-none"
                  />
                </div>

                {/* Doctor Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A261F] mb-3 group-hover:text-[#085442] transition-colors duration-200">
                  {doc.name}
                </h3>

                {/* Doctor Qualifications */}
                <div className="min-h-[72px] sm:min-h-[80px] flex items-center justify-center mb-6">
                  <p className="text-xs sm:text-[13px] text-[#527269] leading-relaxed max-w-xs font-normal">
                    {doc.qualifications}
                  </p>
                </div>
              </div>

              {/* Specialization Pill Badge */}
              <div className="w-full pt-2">
                <span className="inline-block bg-[#FAF7F2] text-[#085442] text-xs font-bold px-4 py-2 rounded-full border border-[#E7DFD5] group-hover:bg-[#085442] group-hover:text-white group-hover:border-[#085442] transition-colors duration-300">
                  {doc.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
