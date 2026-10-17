"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modals from "@/components/Modals";
import BookingModal from "@/components/BookingModal";
import PageHeader from "@/components/PageHeader";
import { TypewriterHeading } from "@/components/Hero";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Users,
  HeartHandshake,
  MapPin,
  Calendar,
  ArrowRight,
  Phone,
  Stethoscope,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  GraduationCap,
  Clock,
  ZoomIn,
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

export default function AboutPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    role: string;
    qualifications: string;
    experience: string;
    img: string;
    cardDescription: string;
    specialties: string[];
    journey: string;
    clinicalPhilosophy: string;
    keyProcedures: string[];
  } | null>(null);

  // Enlarged certificate state for screen-fitting zoom with top-corner close icon
  const [enlargedCertificate, setEnlargedCertificate] = useState<{
    title: string;
    issuer: string;
    date: string;
    image: string;
    badge: string;
    desc: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEnlargedCertificate(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // =========================================================
  // DATA: CLINIC FEATURES (6 ITEMS)
  // =========================================================
  const clinicFeatures = [
    {
      title: "Advanced Technology",
      desc: "Modern equipment for precise treatment",
      icon: ShieldCheck,
    },
    {
      title: "Hygienic & Safe",
      desc: "Strict sterilization protocols",
      icon: ShieldCheck,
    },
    {
      title: "Patient-Centric Approach",
      desc: "Comfortable and stress-free experience",
      icon: HeartHandshake,
    },
    {
      title: "Complete Dental Care",
      desc: "Solutions for all age groups",
      icon: Stethoscope,
    },
    {
      title: "Friendly Team",
      desc: "A warm and caring staff",
      icon: Users,
    },
    {
      title: "Convenient Location",
      desc: "Easily accessible in Tilak Nagar, Chembur",
      icon: MapPin,
    },
  ];

  // =========================================================
  // DATA: PANEL OF DOCTORS (3 CORE SPECIALISTS)
  // =========================================================
  const doctors = [
    {
      name: "Dr. Lajja Kamdar",
      role: "Founder & Chief Dental Surgeon",
      qualifications: "BDS – Nair Hospital Dental College, Mumbai (Batch of 2000)",
      experience: "20+ Years Clinical Excellence",
      img: "/assets/ready/dr_lajja_square.jpg",
      cardDescription:
        "Founder of SmileZone Dental Studio with over two decades of dedicated private practice in Chembur. Graduating from Nair Hospital Dental College in 2000, she specializes in aesthetic smile design, full mouth occlusal rehabilitation, and gentle pediatric root canals under mild anesthesia.",
      specialties: [
        "Aesthetic Smile Design",
        "Full Mouth Rehabilitation",
        "Pediatric Root Canals",
        "Flexible Dentures & Implants",
        "Restorative Dentistry",
      ],
      journey:
        "Dr. Lajja Kamdar acquired her Bachelor's in Dental Surgery (BDS) from Mumbai's premier apex institution, Nair Hospital Dental College, in 2000. In 2001, she established SmileZone Dental Studio in Tilak Nagar, Chembur, with a personal commitment to providing gentle, hospital-grade dental healthcare for local families. Over the past 20+ years, she has continually updated her clinical capabilities through advanced post-graduate certifications from prestigious institutions including the University of California, San Francisco (UCSF) and the Indian Dental Association. Her practice integrates state-of-the-art optical scanners, biocompatible restorations, and gentle pain-free pediatric dentistry.",
      clinicalPhilosophy:
        "Dr. Lajja believes that visiting a dental clinic should always be a calming, positive experience. She is especially renowned for her gentle, patient-first demeanor with anxious adults and young children, ensuring every procedure is completely pain-free, transparent, and long-lasting. Strict hospital safety measures including chemical fumigation, multi-cycle autoclave sterilization, and clinical air purification are adhered to with zero compromise.",
      keyProcedures: [
        "Complete Smile Makeovers & Porcelain Veneers",
        "Occlusal Full Mouth Reconstruction & Rehabilitation",
        "Fear-Free Pediatric Root Canal Therapy under Anesthesia",
        "Bio-compatible Flexible Dentures & Implant Restorations",
        "Hospital-Grade Sterilization & Clean Air Protocols",
      ],
    },
    {
      name: "Dr. Yoban Shetty",
      role: "Specialist Orthodontist & Dentofacial Orthopedist",
      qualifications:
        "B.D.S., M.D.S. (Orthodontics), Ph.D. (France), PG Diploma (Cosmetology, Ukraine)",
      experience: "15+ Years Clinical Practice",
      img: "/assets/site_images/dr-yoban-shetty-270x270_c.jpg",
      cardDescription:
        "Internationally certified specialist with doctoral training in France and Ukraine alongside his M.D.S. Focuses on discreet clear aligners, ceramic braces, and adult occlusion correction with face-driven aesthetics.",
      specialties: [
        "Discreet Clear Aligners",
        "Ceramic & Self-Ligating Braces",
        "Adult Bite Correction",
        "Dentofacial Aesthetics",
        "Adolescent Orthodontics",
      ],
      journey:
        "Dr. Yoban Shetty brings over 15 years of world-class orthodontic expertise to Chembur. After completing his Master of Dental Surgery (M.D.S.) in Orthodontics, he pursued rigorous international fellowships, earning a Ph.D. in Orthodontics in France and a Postgraduate Diploma in Cosmetology in Ukraine. His global clinical exposure brings state-of-the-art digital orthodontic techniques to patients at SmileZone, bridging facial harmony with precise dental alignment.",
      clinicalPhilosophy:
        "Dr. Yoban approaches orthodontic correction through non-invasive, face-driven planning. By combining 3D intraoral digital scans with customized aligner protocols, he creates radiant smiles that enhance each patient's natural facial symmetry, avoiding unnecessary extractions whenever possible and minimizing overall treatment time.",
      keyProcedures: [
        "3D Intraoral Digital Scanning & Real-Time Smile Simulation",
        "Dentcare & Global Clear Aligner Invisible Systems",
        "Tooth-Colored Aesthetic Ceramic & Sapphire Braces",
        "Complex Malocclusion & Overbite/Underbite Rectification",
        "Non-Extraction Alignment for Teens and Adults",
      ],
    },
    {
      name: "Dr. Ninad Khatal",
      role: "Oral & Maxillofacial Surgeon & Implantologist",
      qualifications:
        "BDS (Pune), Master's in Oral Surgery & Implantology (Italy), Fellow of ICOI (USA)",
      experience: "12+ Years Surgical Excellence",
      img: "/assets/site_images/dr-ninad-khatal-270x270_c.jpg",
      cardDescription:
        "Fellow of the International Congress of Oral Implantologists (USA) with Master's training from Italy. Specializes in minimally invasive dental implants, painless wisdom tooth extractions, and advanced bone grafting.",
      specialties: [
        "Dental Implants & Immediate Loading",
        "Painless Wisdom Tooth Extractions",
        "Advanced Bone Grafting & Sinus Lifts",
        "Minimally Invasive Oral Surgery",
        "Full-Arch Implant Restorations",
      ],
      journey:
        "Dr. Ninad Khatal is a distinguished oral surgeon with over 12 years of specialized surgical experience. After completing his BDS from Pune, he earned a Master's degree in Oral Surgery and Implantology in Italy, followed by achieving the Fellowship of the International Congress of Oral Implantologists (FICOI, USA). He has performed thousands of successful implant and surgical cases with exceptional predictability and gentle recovery protocols.",
      clinicalPhilosophy:
        "Dr. Ninad is dedicated to making surgical dental procedures entirely painless, comfortable, and reassuring. Utilizing micro-surgical instruments, atraumatic extraction techniques, and guided 3D surgical templates, he ensures minimal post-operative downtime and rapid tissue recovery for every patient.",
      keyProcedures: [
        "Single-Tooth & Immediate-Load Dental Implants",
        "Atraumatic Extraction of Impacted Wisdom Teeth",
        "Maxillary Sinus Lift & Guided Bone Augmentation",
        "Full-Mouth Implant-Supported Bridges & Overdentures",
        "Micro-Surgical Tissue Conservation Protocols",
      ],
    },
  ];

  // =========================================================
  // DATA: REAL CLINICAL CERTIFICATES & ACHIEVEMENTS
  // =========================================================
  const certificates = [
    {
      title: "Multi-Disciplinary Restorative Dentistry",
      issuer: "University of California, San Francisco (UCSF) School of Dentistry & IDA",
      date: "3 November 2000",
      image: "/assets/ready/cert_ucsf_restorative_dentistry.jpg",
      badge: "UCSF School of Dentistry",
      desc: "Continuing Dental Education lecture & training on Multi-Disciplinary Restorative Dentistry conducted in co-ordination with Indian Dental Association.",
    },
    {
      title: "1st International Convention of Dental Specialities",
      issuer: "International Convention of Dental Specialities & IDA",
      date: "3rd - 5th November 2000",
      image: "/assets/ready/cert_international_convention.png",
      badge: "International Convention",
      desc: "Awarded to Dr. Lajja A. Kamdar for contributing towards the success of the 1st International Convention of Dental Specialities at Bombay Exhibition Centre, Mumbai.",
    },
    {
      title: "Dentcare Clear Aligner Certification (6 Credit Points)",
      issuer: "Indian Dental Association (IDA) Mumbai Branch & DentCare",
      date: "23 July 2017",
      image: "/assets/ready/cert_dentcare_clear_aligners.png",
      badge: "IDA Mumbai Branch",
      desc: "Continuing Dental Education certification on Dentcare Clear Aligner conducted by IDA Mumbai Branch at Hyatt Regency, Mumbai.",
    },
    {
      title: "The Pro-Relief Movement – Pain Relief Initiative",
      issuer: "Colgate-Palmolive & Indian Dental Association",
      date: "Appreciation Recognition",
      image: "/assets/ready/cert_colgate_pro_relief.png",
      badge: "Colgate & IDA Award",
      desc: "Awarded in recognition of unique contributions in providing clinical relief to patients suffering from severe tooth sensitivity.",
    },
    {
      title: "3rd Triennial Commonwealth Dental & 54th IDA Congress",
      issuer: "Commonwealth Dental Association & Indian Dental Association",
      date: "28 January – 01 February 2000",
      image: "/assets/ready/cert_commonwealth_congress.jpg",
      badge: "Commonwealth & IDA Congress",
      desc: "Certificate of Appreciation presented to Dr. Lajja A. Kamdar for participating as a Delegate in the 3rd Triennial Commonwealth Dental Association & 54th Indian Dental Association Congress, New Delhi.",
    },
  ];

  const clinicSchedule = [
    { day: "Monday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Tuesday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Wednesday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Thursday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Friday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Saturday", morning: "9:00 AM – 1:00 PM", evening: "5:00 PM – 9:00 PM", isClosed: false },
    { day: "Sunday", morning: "Closed", evening: "Closed (By Appointment)", isClosed: true },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#092620] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Floating Navbar */}
      <Navbar
        onOpenTreatmentModal={(title) => setSelectedTreatment(title)}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      <main>
        {/* Page Header Section */}
        <PageHeader
          currentPage="About"
          title="About SmileZone"
          highlightWord="SmileZone"
          description="Discover our patient-first dental philosophy, 20+ years of clinical excellence, and state-of-the-art dental care led by Dr. Lajja Kamdar in Tilak Nagar, Chembur."
        />

        {/* ========================================================= */}
        {/* SECTION 1: ABOUT OUR CLINIC (SMILEZONE DENTAL STUDIO)     */}
        {/* ========================================================= */}
        <section id="about-clinic" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF8F5]/90 via-white/70 to-[#FAF6F0]/80 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-mint/10 blur-[140px] rounded-full" />
            <div className="absolute -top-24 right-10 w-80 h-80 bg-[#e8dfc8]/20 blur-[120px] rounded-full" />
          </div>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Clinic Narrative & 6 Features */}
              <div className="lg:col-span-6 space-y-6">
                {/* Main Heading */}
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#092620] tracking-tight leading-tight sm:leading-none">
                    SmileZone{" "}
                    <span className="text-[#0b8064]">Dental Studio</span>
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-slate-700 mt-2">
                    Comprehensive Dental Care for a Healthier, Happier You
                  </p>
                </div>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  SmileZone Dental Studio is a multispecialty dental clinic located in Tilak Nagar, Chembur. We are committed to providing high-quality, personalized dental care in a comfortable and friendly environment. Our clinic is equipped with advanced technology and modern facilities to ensure safe, painless, and effective treatments for patients of all ages.
                </p>

                {/* 6 Features Grid (2 columns x 3 rows) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {clinicFeatures.map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={feat.title}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f6fbf8] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#e8f7f0] border border-mint/40 flex items-center justify-center text-[#0b8064] shrink-0 shadow-2xs">
                          <Icon className="w-4 h-4 text-[#0b8064]" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#092620] leading-snug">
                            {feat.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Imagery Collage (Bento Grid) with Floating 3D Tooth Card */}
              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-12 gap-3.5 items-stretch">
                  {/* Left Big Reception Image */}
                  <div className="col-span-7 rounded-2xl overflow-hidden shadow-sm border border-[#d6ebe0] bg-[#f8faf9] group relative flex">
                    <img
                      src="/assets/ready/clinic_reception.jpg"
                      alt="SmileZone Dental Studio Reception"
                      className="w-full h-full min-h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right Column: 3 Balanced Images Filling the Entire Height */}
                  <div className="col-span-5 flex flex-col gap-3.5 justify-between">
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-[#d6ebe0] bg-[#f8faf9] group min-h-[110px]">
                      <img
                        src="/assets/ready/clinic_chair.jpg"
                        alt="Dental Operatory Chair"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-[#d6ebe0] bg-[#f8faf9] group min-h-[110px]">
                      <img
                        src="/assets/ready/clinic_cabinets.jpg"
                        alt="Hygiene and Sterilization Cabinets"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-[#d6ebe0] bg-[#f8faf9] group min-h-[110px]">
                      <img
                        src="/assets/ready/clinic_scanner.jpg"
                        alt="3D Digital Intraoral Scanner"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Bottom Wide Image: Waiting Lounge */}
                  <div className="col-span-12 rounded-2xl overflow-hidden shadow-sm border border-[#d6ebe0] bg-[#f8faf9] group h-[140px] sm:h-[160px]">
                    <img
                      src="/assets/ready/clinic_sofa.jpg"
                      alt="Patient Waiting Lounge"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Card: Creating Healthier Smiles */}
                <div className="sm:absolute -bottom-6 -right-2 sm:right-4 mt-4 sm:mt-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(8,84,66,0.12)] border border-[#d6ebe0] flex items-center gap-3.5 max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-mint/20 to-teal-50 flex items-center justify-center shrink-0 border border-mint/30 shadow-2xs">
                    <img
                      src="/assets/ready/tooth_3d_hd.png"
                      alt="Tooth 3D"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#092620] leading-snug">
                      Creating Healthier Smiles for a Brighter Tomorrow
                    </h4>
                    <div className="h-0.5 w-12 bg-mint mt-1.5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: FOUNDER / LEAD DENTIST (DR. LAJJA KAMDAR)      */}
        {/* ========================================================= */}
        <section id="lead-dentist" className="relative bg-gradient-to-b from-[#FAF7F2]/80 via-[#F3F8F5]/60 to-[#FAF8F5]/80 text-[#092620] py-16 sm:py-24 pb-20 sm:pb-32 overflow-hidden border-t border-[#E7DFD5]/60">
          {/* Subtle Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[400px] bg-mint/10 blur-[150px] rounded-full" />
            <div className="absolute top-12 right-12 w-80 h-80 bg-[#e8dfc8]/30 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-0 sm:pt-2">
              {/* Left Column: Doctor Info */}
              <div className="lg:col-span-6 space-y-6 pt-0">
                {/* Heading with Typewriter Animation */}
                <TypewriterHeading
                  part1="Founder Dr. Lajja"
                  part2="Kamdar"
                  hasBreak={false}
                  className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#0A261F] tracking-tight leading-tight"
                  part2ClassName="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent"
                />

                {/* Doctor Bio Narrative in 3 Distinct Paragraphs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal"
                >
                  <p>
                    Dr. Lajja Kamdar is a well-reputed Dentist in Tilak Nagar, Chembur. She acquired her degree of bachelor&apos;s in &apos;Dental Surgery&apos; from the prestigious Nair Hospital Dental College, Mumbai in the year 2000. Dr. Lajja has always kept her skills updated with the latest certified courses related to Cosmetic Dentistry, Restorative Dentistry, and Pediatric Dentistry.
                  </p>
                  <p>
                    She is specialized in Full Mouth Rehabilitation with her expertise in SMILE DESIGN involving the latest in dental technology which includes state-of-the-art Flexible Dentures and Dental Implants.
                  </p>
                  <p>
                    Her journey with private practice started in 2001 with SMILEZONE DENTAL STUDIO, which has been upgraded regularly with the latest techniques, machines, and materials to provide the best treatment to her thousands of happy patients. In her 20+ years of private practice, Dr. Lajja has treated numerous complex cases, giving healthy, confident, and long-lasting smiles with gentle care and a patient-first approach.
                  </p>
                </motion.div>

                {/* Verified Accreditations & Certificates (Passport-Sized with Interactive Hover Zoom) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="pt-3 relative z-30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-[#E6F7F0] border border-[#BCE4D3] flex items-center justify-center text-[#085442]">
                      <Award className="w-3.5 h-3.5 text-[#085442]" />
                    </div>
                    <span className="text-xs font-bold text-[#085442] uppercase tracking-wider">
                      Verified Clinical Accreditations &amp; Certifications
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 items-start">
                    {certificates.map((cert) => (
                      <div
                        key={cert.title}
                        className="group relative flex flex-col items-center"
                      >
                        {/* Passport-Sized Certificate Frame (3:4 ratio) */}
                        <div
                          onClick={() => setEnlargedCertificate(cert)}
                          title="Click to view full screen certificate"
                          className="relative w-full max-w-[94px] sm:max-w-[104px] aspect-[3/4] rounded-xl bg-white p-1 border-2 border-[#D6EBE0] group-hover:border-[#00c982] shadow-sm group-hover:shadow-[0_15px_30px_rgba(4,38,30,0.25)] transition-all duration-300 ease-out group-hover:scale-105 cursor-pointer flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover rounded-[8px]"
                          />

                          {/* Subtle Hover Overlay with Zoom Icon */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[8px] flex flex-col items-center justify-center pointer-events-none p-1 text-center">
                            <span className="p-1 rounded-full bg-white text-[#04261e] shadow-md mb-1">
                              <ZoomIn className="w-3.5 h-3.5 text-[#085442]" />
                            </span>
                            <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                              Click to View
                            </span>
                          </div>
                        </div>

                        {/* Small Description Below */}
                        <div className="mt-2 text-center w-full px-0.5">
                          <h5 className="text-[11px] sm:text-xs font-bold text-[#092620] leading-snug line-clamp-2 group-hover:text-[#0b8064] transition-colors">
                            {cert.badge}
                          </h5>
                          <p className="text-[10px] text-[#527269] font-medium leading-tight mt-0.5 line-clamp-1">
                            {cert.issuer.split("&")[0].trim()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Hero Visual with Circular Backdrop, Cutout & 3 Metric Badges Underneath */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-start pt-4 lg:pt-0">
                {/* Glowing Circular Halo */}
                <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00d084]/20 via-[#e8dfc8]/30 to-transparent border border-[#E7DFD5] shadow-luxury" />

                  {/* Doctor Cutout Image */}
                  <img
                    src="/assets/site_images/Dr-lajja-Kamdar-min.png"
                    alt="Dr. Lajja Kamdar"
                    className="relative z-10 w-[85%] h-auto object-contain drop-shadow-[0_20px_35px_rgba(10,38,31,0.15)] select-none"
                  />
                </div>

                {/* 3 Metric Badges Under Image of the Doctor */}
                <div className="relative z-20 w-full max-w-[540px] -mt-4 sm:-mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {/* Metric 1 */}
                  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-[#E7DFD5] rounded-2xl p-3 shadow-luxury">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] border border-[#BCE4D3] flex items-center justify-center text-[#085442] shrink-0">
                      <Award className="w-5 h-5 text-[#085442]" />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-black text-[#085442] leading-tight">
                        <MetricCounter value={20} suffix="+" />
                      </span>
                      <span className="text-[11px] text-[#527269] font-medium leading-tight block mt-0.5">
                        Years of Experience
                      </span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-[#E7DFD5] rounded-2xl p-3 shadow-luxury">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] border border-[#BCE4D3] flex items-center justify-center text-[#085442] shrink-0">
                      <Users className="w-5 h-5 text-[#085442]" />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-black text-[#085442] leading-tight">
                        <MetricCounter value={5000} suffix="+" />
                      </span>
                      <span className="text-[11px] text-[#527269] font-medium leading-tight block mt-0.5">
                        Happy Patients
                      </span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-[#E7DFD5] rounded-2xl p-3 shadow-luxury">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] border border-[#BCE4D3] flex items-center justify-center text-[#085442] shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#085442]" />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-black text-[#085442] leading-tight">
                        Expertise
                      </span>
                      <span className="text-[11px] text-[#527269] font-medium leading-tight block mt-0.5">
                        Across All Age Groups
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Bottom Multi-Layer Wave Transition into Section 3 */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg
              className="relative block w-full h-[40px] sm:h-[60px]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C350,110 850,110 1200,0 L1200,120 L0,120 Z"
                fill="rgba(245, 238, 226, 0.45)"
              />
              <path
                d="M0,20 C400,10 800,100 1200,15 L1200,120 L0,120 Z"
                fill="rgba(216, 237, 226, 0.5)"
              />
              <path
                d="M0,35 C320,115 880,105 1200,30 L1200,120 L0,120 Z"
                fill="#FAF8F5"
              />
            </svg>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: PANEL OF DOCTORS (DARK FOREST GREEN BACKGROUND)*/}
        {/* ========================================================= */}
        <section id="panel-doctors" className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF8F5]/85 via-[#F4F9F6]/55 to-[#FAF8F5]/85 text-[#092620] relative overflow-hidden">
          {/* Subtle Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-mint/10 blur-[130px] rounded-full" />
          </div>

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
            {/* Header Row: Title & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] tracking-tight leading-tight">
                  Panel Of <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">Doctors</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#527269] max-w-md leading-relaxed">
                Our team of experienced dental specialists is dedicated to providing the best dental care with expertise, compassion, and a patient-first approach.
              </p>
            </div>

            {/* 3 Specialist Doctor Cards Grid - Clean, Human Clinic Aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {doctors.map((doc, idx) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setSelectedDoctor(doc);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedDoctor(doc);
                    }
                  }}
                  className="bg-white/95 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_32px_rgba(8,84,66,0.12)] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 group border border-[#E7DFD5] hover:border-[#085442] cursor-pointer text-left"
                >
                  <div>
                    {/* Doctor Card Photo (Square format, fully visible, zero zoom) */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] mb-5 border border-[#E7DFD5]">
                      <img
                        src={doc.img}
                        alt={doc.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Doctor Identity */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A261F] group-hover:text-[#085442] transition-colors leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#085442] mt-1 mb-0.5">
                      {doc.role}
                    </p>
                    <p className="text-[11px] text-[#527269] font-medium leading-relaxed mb-4">
                      {doc.qualifications}
                    </p>

                    <div className="h-px bg-[#EFE8DF] my-4" />

                    {/* Authentic Editorial Description of Journey & Experience */}
                    <p className="text-xs sm:text-[13px] text-[#3B5B52] leading-relaxed font-normal mb-2">
                      {doc.cardDescription}
                    </p>
                  </div>

                  {/* View Profile Button */}
                  <div className="pt-2">
                    <div className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_rgba(0,201,130,0.35)] group-hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)]">
                      <span>View Profile &amp; Journey</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CLINIC WORKING HOURS & APPOINTMENT BOOKING                */}
        {/* ========================================================= */}
        <section id="working-hours" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF8F5]/85 via-white/65 to-[#F4F9F6]/85 border-t border-[#E7DFD5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-4xl font-black text-[#0A261F] tracking-tight">
                Working Hours &amp; <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">Appointments</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#3B5B52] mt-2">
                Plan your visit to SmileZone Dental Studio, Tilak Nagar, Chembur. Advance booking is recommended for minimal waiting time.
              </p>
            </div>

            {/* Main Working Hours Card */}
            <div className="bg-white rounded-3xl border border-[#E7DFD5] hover:border-[#085442] hover:shadow-[0_16px_40px_rgba(8,84,66,0.08)] shadow-luxury overflow-hidden transition-all duration-300">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#085442] text-white text-xs sm:text-sm">
                      <th className="py-4 px-5 sm:px-6 font-bold">Day</th>
                      <th className="py-4 px-5 sm:px-6 font-bold">Morning Hours</th>
                      <th className="py-4 px-5 sm:px-6 font-bold">Evening Hours</th>
                      <th className="py-4 px-5 sm:px-6 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8DF] text-xs sm:text-sm">
                    {clinicSchedule.map((item) => (
                      <tr
                        key={item.day}
                        className={`hover:bg-[#F2FAF6] transition-colors ${
                          item.isClosed ? "bg-[#FAF8F5]/80" : ""
                        }`}
                      >
                        <td className="py-3.5 px-5 sm:px-6 font-semibold text-[#0A261F]">
                          {item.day}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-[#3B5B52] font-medium">
                          {item.morning}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-[#3B5B52] font-medium">
                          {item.evening}
                        </td>
                        <td className="py-3.5 px-5 sm:px-6 text-right">
                          {item.isClosed ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                              Closed
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF6F0] text-[#085442] border border-[#C5E5D5]">
                              Open
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Footer: Book Appointment & WhatsApp Actions */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-[#FAF7F2] via-white to-[#F4F9F6] border-t border-[#E7DFD5] flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-3.5 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E6F7F0] to-[#F0FAF5] border border-[#BCE4D3] flex items-center justify-center text-[#085442] shrink-0">
                    <Calendar className="w-6 h-6 text-[#085442]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0A261F]">
                      Ready to schedule your appointment?
                    </h4>
                    <p className="text-xs text-[#527269]">
                      Personalized consultations with Dr. Lajja Kamdar &amp; specialist team
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 text-white shrink-0" />
                    <span className="whitespace-nowrap">Book Appointment</span>
                    <ArrowRight className="w-4 h-4 text-white shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Doctor Profile Modal (Features Rich Achievements & One-by-One Certificate Slider for Dr. Lajja) */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoctor(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-mint/40 my-auto"
            >
              {/* 1. FIRST: DOCTOR'S NAME & CREDENTIALS HEADER */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#03221b] via-[#053026] to-[#085442] text-white flex items-start justify-between shrink-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-mint font-semibold mt-1">
                    {selectedDoctor.role}
                  </p>
                  <p className="text-[11px] text-[#b8dfce] mt-0.5 max-w-md leading-relaxed">
                    {selectedDoctor.qualifications}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600">
                {/* 2. THEN: DOCTOR'S IMAGE (FULLY VISIBLE, ZERO ZOOM, SQUARE FORMAT) */}
                <div className="flex justify-center">
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-[#d6ebe0] shadow-md bg-[#f4faf7]">
                    <img
                      src={selectedDoctor.img}
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* 3. THEN: DETAILED DESCRIPTION, JOURNEY & EXPERIENCE */}
                <div className="space-y-5">
                  {/* Journey & Clinical Background */}
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#0b8064]" />
                      <span>Clinical Journey &amp; Experience</span>
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-[#fbfdfc] border border-[#e2f1ea] rounded-2xl p-4 sm:p-5 font-normal text-xs sm:text-sm">
                      {selectedDoctor.journey}
                    </p>
                  </div>

                  {/* Philosophy & Care Approach */}
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-[#0b8064]" />
                      <span>Patient Care Philosophy</span>
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-[#fbfdfc] border border-[#e2f1ea] rounded-2xl p-4 sm:p-5 font-normal text-xs sm:text-sm">
                      {selectedDoctor.clinicalPhilosophy}
                    </p>
                  </div>

                  {/* Core Procedures & Clinical Specializations */}
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#0b8064]" />
                      <span>Key Clinical Procedures &amp; Focus</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedDoctor.keyProcedures.map((proc) => (
                        <div
                          key={proc}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#f4faf7] border border-[#d6ebe0] text-slate-700 text-xs font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00b070] shrink-0 mt-0.5" />
                          <span>{proc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. MODAL FOOTER: BOOK AN APPOINTMENT BUTTON */}
              <div className="p-4 sm:p-5 bg-[#f8faf9] border-t border-[#d6ebe0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#092620]">
                    Ready to consult with {selectedDoctor.name}?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Direct appointments at SmileZone Dental Studio, Chembur
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctor(null);
                    setBookingModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#085442] hover:bg-[#0b8064] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(8,84,66,0.3)] hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  <Calendar className="w-4 h-4 text-mint" />
                  <span>Book Appointment with {selectedDoctor.name}</span>
                  <ArrowRight className="w-4 h-4 text-mint" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Enlarged Certificate Viewer with Top-Corner Close Icon */}
      <AnimatePresence>
        {enlargedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setEnlargedCertificate(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
          >
            {/* Certificate Display Container */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[94vh] max-w-[96vw] flex flex-col items-center justify-center cursor-default"
            >
              {/* Close Button at the Top Corner of the Image */}
              <button
                onClick={() => setEnlargedCertificate(null)}
                aria-label="Close enlarged certificate"
                title="Close (Esc)"
                className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-[105] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#04261e] hover:bg-[#00c982] hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-2 border-[#00c982] flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>

              {/* The Certificate Image Fitting the Screen in Height & Width */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7)] border-2 border-white/20 bg-black/40 flex items-center justify-center">
                <img
                  src={enlargedCertificate.image}
                  alt={enlargedCertificate.title}
                  className="max-h-[82vh] sm:max-h-[86vh] w-auto max-w-[92vw] object-contain rounded-2xl select-none"
                />
              </div>

              {/* Clean Bottom Caption with Certificate Info */}
              <div className="mt-2.5 text-center px-4 max-w-2xl">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00c982]/20 border border-[#00c982]/40 text-[#00E599] text-[11px] font-bold uppercase tracking-wider mb-1">
                  {enlargedCertificate.badge}
                </span>
                <h4 className="text-white text-sm sm:text-base font-bold tracking-tight">
                  {enlargedCertificate.title}
                </h4>
                <p className="text-white/70 text-xs mt-0.5">
                  {enlargedCertificate.issuer} • {enlargedCertificate.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Modals for Treatment View */}
      <Modals
        videoOpen={false}
        onCloseVideo={() => {}}
        selectedTreatment={selectedTreatment}
        onCloseTreatment={() => setSelectedTreatment(null)}
        bookingData={null}
        onCloseBooking={() => {}}
      />

      {/* Booking Form Modal Pop-up */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
