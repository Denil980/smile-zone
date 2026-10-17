"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PageHeader from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  Play,
  Video,
  X,
  Clock,
  Sparkles,
  Quote,
  Calendar,
} from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  category: string;
  treatment: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  highlight: string;
}

interface VideoStory {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  duration: string;
  rating: number;
  category: string;
  highlight: string;
  quote: string;
  thumbnail: string;
  youtubeId: string;
}

const videoStoriesData: VideoStory[] = [
  {
    id: "v-1",
    patientName: "Sneha Kapoor",
    location: "South Mumbai",
    treatment: "Aesthetic Porcelain Veneers",
    duration: "2:15 min",
    rating: 5,
    category: "Smile Makeover",
    highlight: "From hiding my smile to beaming with confidence!",
    quote: "I hid my teeth in every family photo for 10 years. In just two gentle visits, Dr. Lajja designed a natural, radiant smile that changed my entire life.",
    thumbnail: "/assets/ready/clinic_sofa.jpg",
    youtubeId: "sLPojKlySJY",
  },
  {
    id: "v-2",
    patientName: "Rahul Mehta",
    location: "Chembur East",
    treatment: "Rotary Single-Sitting Root Canal",
    duration: "1:48 min",
    rating: 5,
    category: "Painless Endodontics",
    highlight: "Completely zero pain, finished in just 45 minutes",
    quote: "I had extreme tooth pain and was terrified of root canals. Dr. Lajja explained everything with 3D scans and completed the entire treatment pain-free. I even felt relaxed enough to doze off!",
    thumbnail: "/assets/ready/clinic_chair.jpg",
    youtubeId: "sBTCxHtbFeo",
  },
  {
    id: "v-3",
    patientName: "Ramesh Joshi",
    location: "Tilak Nagar",
    treatment: "3D Guided Implants & Fixed Teeth",
    duration: "2:32 min",
    rating: 5,
    category: "Full Mouth Implants",
    highlight: "Eating almonds and apples again with zero discomfort",
    quote: "At 68 years old, loose dentures made chewing miserable. Dr. Lajja placed digital guided implants with precise care. Today I enjoy all my favorite foods without any pain.",
    thumbnail: "/assets/ready/clinic_scanner.jpg",
    youtubeId: "uv8nL2T06Fc",
  },
  {
    id: "v-4",
    patientName: "Priya & Aarav (8 yrs)",
    location: "Chembur, Mumbai",
    treatment: "Pediatric Preventive Care & Fluoride",
    duration: "1:35 min",
    rating: 5,
    category: "Kids Dentistry",
    highlight: "My 8-year-old son actually looks forward to dental visits",
    quote: "Finding a gentle dentist for young children is tough. Dr. Lajja turned Aarav's checkup into a fun educational game. He felt safe, smiled throughout, and loves visiting SmileZone!",
    thumbnail: "/assets/ready/treatment_pediatric_photo.jpg",
    youtubeId: "mSQCuGndl7I",
  },
];

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "Priya T.",
    category: "Family & Kids Care",
    treatment: "Pediatric & Preventive Dentistry",
    location: "Tilak Nagar, Chembur • Verified Google Review",
    rating: 5,
    date: "Recent Review",
    highlight: "Very patient and gentle with kids",
    text: "My children and I have our dental check ups and treatments done by Dr. Lajja Kamdar at SmileZone Dental Studio. She is very patient, gentle with kids, and explains everything clearly before beginning. The clinic is spotless and modern. Highly recommended for families!",
  },
  {
    id: 2,
    name: "Rahul M.",
    category: "Painless Root Canals",
    treatment: "Rotary Root Canal & Ceramic Crown",
    location: "Chembur, Mumbai • Verified Google Review",
    rating: 5,
    date: "1 month ago",
    highlight: "Completely painless emergency treatment",
    text: "I had severe dental pain and needed an urgent root canal. All necessary clinical safety protocols and 6-step sterilization were followed meticulously. The procedure was completely painless and very well explained on digital X-rays. Thank you Dr. Lajja for saving my tooth!",
  },
  {
    id: 3,
    name: "Sneha K.",
    category: "Cosmetic & Whitening",
    treatment: "Cosmetic Veneers & Smile Makeover",
    location: "Mumbai • Verified Google Review",
    rating: 5,
    date: "2 months ago",
    highlight: "Magic hands and transparent advice",
    text: "Dr. Lajja has magic hands. She is fully up to date with the latest dental technology and gives the right long-term medical solution without pushing unnecessary procedures. Transparent, trustworthy, and very reasonable in her charges. My smile makeover looks so natural!",
  },
  {
    id: 4,
    name: "Anand S.",
    category: "Painless Root Canals",
    treatment: "Single-Sitting Rotary Endodontics",
    location: "Tilak Nagar Clinic • Verified Google Review",
    rating: 5,
    date: "3 months ago",
    highlight: "Overcame my 10-year dental fear",
    text: "I had severe dental anxiety for years until I visited SmileZone. Dr. Lajja made the root canal and zirconia crown placement completely pain-free with zero discomfort afterwards. The clinic hygiene and digital equipment are unmatched in Chembur.",
  },
  {
    id: 5,
    name: "Meera R.",
    category: "Cosmetic & Whitening",
    treatment: "In-Office Teeth Whitening & Polishing",
    location: "Chembur East • Verified Google Review",
    rating: 5,
    date: "3 months ago",
    highlight: "Immediate, natural radiant results",
    text: "Got my teeth whitening and aesthetic smile alignment done here before my family function. The results were visible immediately and looked completely natural. Dr. Lajja's clinical precision and warm approach put me at ease throughout.",
  },
  {
    id: 6,
    name: "Karan D.",
    category: "Implants & Dentures",
    treatment: "3D Digital Guided Dental Implant",
    location: "Chembur West • Verified Google Review",
    rating: 5,
    date: "4 months ago",
    highlight: "Flawless dental implant placement",
    text: "State-of-the-art dental equipment, strict sterilization, and prompt appointment timing. Dr. Lajja and her specialist team planned my molar implant with 3D scanning. The healing was rapid and eating feels completely natural now. Best dental clinic in Chembur by far.",
  },
  {
    id: 7,
    name: "Anita V.",
    category: "Family & Kids Care",
    treatment: "Full Mouth Preventive Maintenance",
    location: "Tilak Nagar • Verified Google Review",
    rating: 5,
    date: "5 months ago",
    highlight: "Warm staff and zero waiting time",
    text: "Dr. Lajja has been our family dentist for over 8 years now. Both my parents got flexible dentures made and they are so comfortable. The staff is courteous, appointments start strictly on time, and every visit is stress-free.",
  },
  {
    id: 8,
    name: "Vikram P.",
    category: "Cosmetic & Whitening",
    treatment: "Diastema Gap Closure & Composite Bonding",
    location: "Ghatkopar, Mumbai • Verified Google Review",
    rating: 5,
    date: "5 months ago",
    highlight: "Artistic gap closure in one sitting",
    text: "Had a visible gap between my front teeth that made me self-conscious when smiling. Dr. Lajja closed it with aesthetic composite bonding in just one single 45-minute sitting without shaving my teeth! Her eye for detail is extraordinary.",
  },
  {
    id: 9,
    name: "Ramesh J.",
    category: "Implants & Dentures",
    treatment: "Precision Flexible Complete Dentures",
    location: "Chembur • Verified Google Review",
    rating: 5,
    date: "6 months ago",
    highlight: "Great comfort for senior citizens",
    text: "Being 68 years old, I struggled with loose dentures from another clinic. Dr. Lajja designed custom flexible dentures that fit snugly without sores. Her respectful, patient approach with senior citizens is truly admirable.",
  },
  {
    id: 10,
    name: "Divya N.",
    category: "Painless Root Canals",
    treatment: "Ultrasonic Plaque Scaling & Gum Care",
    location: "Mumbai • Verified Google Review",
    rating: 5,
    date: "6 months ago",
    highlight: "Gentle cleaning with no sensitivity",
    text: "Usually dental cleanings cause bleeding and sensitivity, but Dr. Lajja uses advanced ultrasonic scalers with water jets that made the entire cleaning painless. My teeth feel fresh, bright, and healthy. Highly recommend SmileZone!",
  },
];

const categories = [
  "All Reviews",
  "Painless Root Canals",
  "Cosmetic & Whitening",
  "Family & Kids Care",
  "Implants & Dentures",
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Reviews");
  const [filterKey, setFilterKey] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);

  // Close video modal on Escape key & manage body scroll
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedVideo(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedVideo]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    // Increment filterKey so cards always trigger a fresh sequential one-by-one cascade
    setFilterKey((prev) => prev + 1);
  };

  const filteredTestimonials =
    selectedCategory === "All Reviews"
      ? testimonialsData
      : testimonialsData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#092620] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Floating Global Navbar */}
      <Navbar onOpenBookingModal={() => setBookingModalOpen(true)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <main>
        {/* Page Header Section */}
        <PageHeader
          currentPage="Testimonials"
          title="Patient Testimonials"
          highlightWord="Testimonials"
          description="Read genuine verified reviews and patient stories about pain-free dental treatments, gentle care, and lasting smile transformations at SmileZone Dental Studio."
        />

        {/* ========================================================= */}
        {/* PATIENT VIDEO TESTIMONIALS SECTION (4 VIDEOS)             */}
        {/* ========================================================= */}
        <section className="pt-12 sm:pt-16 pb-8 relative">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#00c982]/30 text-[#085442] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Video className="w-3.5 h-3.5 text-[#00c982]" />
                <span>Patient Video Stories</span>
                <Sparkles className="w-3 h-3 text-[#00c982]" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A261F] tracking-tight">
                Real Smiles, Inspiring Stories
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#3B5B52] leading-relaxed">
                Watch heartfelt video journeys of our patients sharing their experience with painless root canals, cosmetic smile designs, and dental implants.
              </p>
            </div>

            {/* 4 Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoStoriesData.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white/95 rounded-3xl border border-[#E7DFD5] hover:border-[#00c982] shadow-sm hover:shadow-[0_16px_36px_rgba(0,201,130,0.14)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group"
                >
                  {/* Video Thumbnail with Play Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.patientName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 group-hover:from-black/75 transition-all duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#085442] shadow-sm">
                        {video.category}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center gap-1 shadow-sm">
                        <Clock className="w-2.5 h-2.5 text-[#00c982]" />
                        {video.duration}
                      </span>
                    </div>

                    {/* Glowing Play Button Center */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-14 h-14 rounded-full bg-[#00c982]/30 animate-ping group-hover:scale-125 duration-1000" />
                        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00c982] via-[#00b070] to-[#047857] text-white flex items-center justify-center shadow-[0_0_25px_rgba(0,201,130,0.6)] group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Thumbnail Overlay Tag */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1 text-[11px] font-medium text-emerald-100 pointer-events-none">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00c982] shrink-0" />
                      <span className="truncate">Verified Patient Story</span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(video.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                        ))}
                        <span className="text-[11px] font-bold text-amber-600 ml-1">5.0</span>
                      </div>

                      {/* Highlight */}
                      <h3 className="text-sm font-bold text-[#0A261F] leading-snug group-hover:text-[#085442] transition-colors mb-2">
                        &ldquo;{video.highlight}&rdquo;
                      </h3>

                      {/* Short Quote Preview */}
                      <p className="text-xs text-[#4A6B62] line-clamp-2 leading-relaxed">
                        {video.quote}
                      </p>
                    </div>

                    {/* Patient Footer */}
                    <div className="mt-4 pt-3 border-t border-[#EFE8DF] flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#0A261F]">
                          {video.patientName}
                        </h4>
                        <p className="text-[10px] text-[#7C9D94]">
                          {video.treatment}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-[#085442] group-hover:text-[#00c982] flex items-center gap-1 transition-colors">
                        Watch <Play className="w-2.5 h-2.5 fill-current" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* VIDEO MODAL PLAYER                                        */}
        {/* ========================================================= */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-[#092620] text-white rounded-3xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#071F1A]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#00c982]/20 flex items-center justify-center text-[#00c982]">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        {selectedVideo.patientName}&apos;s Smile Story
                        <CheckCircle2 className="w-4 h-4 text-[#00c982]" />
                      </h3>
                      <p className="text-xs text-white/60">
                        {selectedVideo.treatment} • {selectedVideo.location}
                      </p>
                    </div>
                  </div>

                  {/* Close Cross Button */}
                  <button
                    onClick={() => setSelectedVideo(null)}
                    aria-label="Close video"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:scale-105"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 16:9 Video Frame */}
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${selectedVideo.patientName} Testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Modal Footer / Quote & Booking CTA */}
                <div className="p-5 sm:p-6 bg-[#071F1A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="max-w-md">
                    <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                      {[...Array(selectedVideo.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                      <span className="text-xs text-white/70 ml-1 font-semibold">Verified Review</span>
                    </div>
                    <p className="text-xs text-white/80 italic leading-relaxed">
                      &ldquo;{selectedVideo.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedVideo(null);
                        setBookingModalOpen(true);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#00c982] to-[#047857] hover:from-[#00b070] hover:to-[#036045] shadow-[0_4px_16px_rgba(0,201,130,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* FILTERABLE TESTIMONIALS GRID                              */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-16 relative">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white shadow-[0_6px_20px_rgba(0,201,130,0.35)] scale-105"
                        : "bg-white border border-[#E7DFD5] text-[#3B5B52] hover:border-[#085442] hover:text-[#085442] shadow-luxury-sm"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Testimonials Masonry / Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            >
              <AnimatePresence mode="popLayout">
                {filteredTestimonials.map((item, index) => (
                  <motion.div
                    key={`${selectedCategory}-${filterKey}-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 32, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.94, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.44,
                      delay: index * 0.07, // Staggered delay: 0s, 0.07s, 0.14s, 0.21s... cascading one by one!
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 36px -10px rgba(0, 201, 130, 0.15)",
                      borderColor: "#00c982",
                      transition: { duration: 0.2 },
                    }}
                    className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E7DFD5] shadow-none transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Rating Stars & Treatment Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#085442] border border-[#E7DFD5]">
                          {item.category}
                        </span>
                      </div>

                      {/* Highlight Quote */}
                      <h3 className="text-sm sm:text-base font-bold text-[#0A261F] leading-snug mb-2.5 group-hover:text-[#085442] transition-colors">
                        &ldquo;{item.highlight}&rdquo;
                      </h3>

                      {/* Main Review Body */}
                      <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal">
                        {item.text}
                      </p>
                    </div>

                    {/* Patient Footer */}
                    <div className="mt-5 pt-4 border-t border-[#EFE8DF] flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0A261F]">
                            {item.name}
                          </h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00c982]" />
                        </div>
                        <p className="text-[11px] text-[#527269] mt-0.5">
                          {item.treatment}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-medium text-[#7C9D94]">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
