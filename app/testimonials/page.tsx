"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PageHeader from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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
                    onClick={() => setSelectedCategory(cat)}
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
                {filteredTestimonials.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.94 }}
                    transition={{
                      layout: { type: "spring", stiffness: 350, damping: 30, mass: 0.8 },
                      opacity: { duration: 0.28, ease: "easeOut" },
                      y: { duration: 0.28, ease: "easeOut" },
                      scale: { duration: 0.28, ease: "easeOut" },
                    }}
                    whileHover={{ y: -6 }}
                    className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E7DFD5] hover:border-[#085442] shadow-none transition-all duration-300 flex flex-col justify-between cursor-pointer group"
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
                      <h3 className="text-sm sm:text-base font-bold text-[#0A261F] leading-snug mb-2.5">
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
