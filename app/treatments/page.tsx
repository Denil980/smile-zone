"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Phone,
  Clock,
  X,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

interface TreatmentItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  cardDescription: string;
  fullDescription: string;
  keyProcedures: string[];
  idealFor: string;
  treatmentTime: string;
}

const treatmentsData: TreatmentItem[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    tag: "Comprehensive & Preventive Care",
    image: "/assets/site_images/Root-Canal-400x400_c.png",
    cardDescription:
      "Comprehensive dental care to preserve healthy teeth and gums for a lifetime. From routine examinations and ultrasonic plaque cleaning to tooth-colored fillings and pain-free root canals, we protect your natural teeth with gentle, patient-first care.",
    fullDescription:
      "General Dentistry forms the foundation of lifelong oral wellness at SmileZone Dental Studio. Led by Dr. Lajja Kamdar with over 20 years of clinical experience, our practice focuses on early diagnosis, gentle treatment, and natural tooth preservation. Every checkup includes high-definition digital radiography, thorough periodontal gum health evaluations, and painless ultrasonic scaling to remove calculus and surface stains. When decay occurs, we restore teeth with durable, tooth-colored composite resins that seamlessly match your natural shade. For teeth with inflamed or infected dental pulp, our rotary root canal treatments eliminate pain and save your natural tooth structure under strict 6-step hospital-grade sterilization.",
    keyProcedures: [
      "Complete Oral Examinations & Low-Radiation Digital Radiographs",
      "Painless Ultrasonic Teeth Scaling & Stain Polishing",
      "Tooth-Colored Aesthetic Composite Fillings",
      "Pain-Free Root Canal Therapy (Rotary Endodontics)",
      "Periodontal Gum Disease Treatment & Maintenance",
      "Preventive Pit & Fissure Cavity Sealants",
    ],
    idealFor:
      "Individuals and families seeking routine dental maintenance, cavity protection, toothache relief, and long-term oral hygiene.",
    treatmentTime: "Same-day appointments (30–60 minutes)",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    tag: "Permanent Missing Tooth Replacement",
    image: "/assets/site_images/Dental-Implants_image-400x400_c.png",
    cardDescription:
      "The gold-standard permanent replacement for lost or damaged teeth. Biocompatible titanium posts bond securely with the jawbone to support lifelike crowns, bridges, or full dentures, restoring complete chewing strength and natural smile aesthetics.",
    fullDescription:
      "Missing teeth can cause neighboring teeth to drift, alter clear speech, and cause premature bone loss in the jaw. Dental implants provide the most durable, natural-feeling tooth replacement solution available in modern dentistry. At SmileZone, we utilize biocompatible titanium implant posts that fuse directly with the jawbone through osseointegration, preventing bone resorption and maintaining your facial contours. Whether you need a single tooth replacement with a custom ceramic crown, an implant-supported fixed bridge for multiple missing teeth, or an implant-retained full-arch denture for complete stability, our procedures are meticulously planned for painless placement and predictable long-term longevity.",
    keyProcedures: [
      "Single Tooth Dental Implants with Custom Ceramic Crowns",
      "Implant-Supported Fixed Bridges for Multiple Missing Teeth",
      "Full Arch Implant-Retained Dentures (All-on-4 / All-on-6)",
      "Bone Grafting & Ridge Augmentation when needed",
      "Precision 3D Guided Implant Placement",
    ],
    idealFor:
      "Patients with one or more missing teeth looking for a permanent, non-removable solution that looks, feels, and chews like natural teeth.",
    treatmentTime: "Staged treatment with permanent results lasting decades",
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    tag: "Aesthetic Smile Design & Makeovers",
    image: "/assets/site_images/cosmetic-3-400x400_c.png",
    cardDescription:
      "Customized smile transformations tailored to your facial harmony. We offer ultra-thin porcelain veneers, in-office laser teeth whitening, aesthetic composite bonding, and gap closures to give you a bright, symmetrical, and confident smile.",
    fullDescription:
      "Your smile is often the first thing people notice. Our cosmetic dentistry treatments at SmileZone Dental Studio combine artistic precision with advanced dental materials to resolve aesthetic concerns while preserving maximum healthy enamel. Dr. Lajja Kamdar specializes in aesthetic smile design, ensuring every enhancement looks natural, luminous, and well-balanced rather than overly artificial. From custom porcelain veneers that mask chips, deep discoloration, and minor misalignments, to in-office laser teeth whitening that lifts years of tea, coffee, and smoking stains in under an hour, we tailor each treatment plan to achieve your ideal smile goals.",
    keyProcedures: [
      "Custom Handcrafted Porcelain Veneers & Ceramic Laminates",
      "In-Office Professional Laser Teeth Whitening",
      "Cosmetic Composite Bonding for Chips & Worn Edges",
      "Diastema Closure (Closing Unwanted Gaps Between Teeth)",
      "Gum Contouring & Aesthetic Smile Recontouring",
    ],
    idealFor:
      "Anyone with discolored, chipped, unevenly spaced, or worn teeth seeking a noticeable, long-lasting aesthetic upgrade.",
    treatmentTime: "1 to 2 visits for most cosmetic enhancements",
  },
  {
    id: "geriatric-dentistry",
    name: "Geriatric Dentistry",
    tag: "Specialized Oral Care for Seniors",
    image: "/assets/site_images/dentures-1-400x400_c.png",
    cardDescription:
      "Compassionate, unhurried dental care tailored to the unique physiological needs of older adults. We provide lightweight flexible dentures, precision BPS full dentures, dry mouth management, and gentle periodontal maintenance.",
    fullDescription:
      "Oral health in senior years directly impacts systemic wellbeing, nutrition, and daily comfort. At SmileZone Dental Studio, we understand the complexities of treating older adults—including multiple medications, fragile gum tissue, decreased saliva production, and reduced mobility. Our geriatric dental services emphasize patient comfort, empathy, and dignified care. We provide precision BPS complete dentures engineered for unmatched retention and suction, lightweight flexible partial dentures that eliminate bulky metal clasps, and fast denture repairs or relines. We also manage medication-related xerostomia (dry mouth), root decay, and periodontal conditions so senior patients can chew their food thoroughly and smile with confidence.",
    keyProcedures: [
      "High-Precision BPS Complete Dentures (Maximum Suction & Comfort)",
      "Lightweight Flexible Partial Dentures (Unbreakable & Metal-Free)",
      "Denture Relining, Rebasing & Emergency Repair Services",
      "Dry Mouth (Xerostomia) Management & Saliva Stimulation",
      "Root Surface Caries Treatment & Sensitive Tooth Therapy",
      "Gentle Senior Periodontal Maintenance",
    ],
    idealFor:
      "Senior citizens needing comfortable denture solutions, relief from loose dentures, dry mouth relief, or specialized geriatric oral care.",
    treatmentTime: "Custom-fitted across scheduled comfortable visits",
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    tag: "Orthodontics & Clear Aligners",
    image: "/assets/site_images/braces-400x400_c.png",
    cardDescription:
      "Contemporary orthodontic corrections for crooked teeth, spacing, and bite misalignments. We provide virtually invisible clear aligners, tooth-colored ceramic braces, and traditional brackets supervised by experienced orthodontists.",
    fullDescription:
      "Properly aligned teeth are easier to brush, less prone to gum disease and uneven wear, and significantly enhance facial symmetry. SmileZone Dental Studio provides comprehensive orthodontic options tailored for children, teens, and working professionals. We offer certified clear aligners—custom-fabricated transparent plastic trays that progressively shift your teeth into ideal alignment without metal wires, brackets, or dietary restrictions. For patients requiring complex skeletal bite adjustments, we also offer discreet tooth-colored ceramic braces that blend with natural enamel, as well as dependable low-profile metal braces guided by our specialist orthodontist team.",
    keyProcedures: [
      "DentCare Clear Invisible Aligners (Removable & Discreet)",
      "Aesthetic Tooth-Colored Ceramic Braces",
      "Low-Profile Traditional Metal Braces",
      "Treatment for Crowded Teeth, Spacing & Overbites",
      "Retention Appliances & Long-Term Alignment Maintenance",
    ],
    idealFor:
      "Teens and adults looking to straighten crooked teeth or fix bite issues discreetly and effectively.",
    treatmentTime: "6 to 18 months depending on case complexity",
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    tag: "Gentle Care for Infants, Kids & Teens",
    image: "/assets/ready/treatment_pediatric_photo.jpg",
    cardDescription:
      "Warm, friendly, and fear-free dental visits created specifically for infants, children, and teenagers. We specialize in preventive cavity protection, dental habit correction, gentle restorations, and creating happy lifelong dental habits.",
    fullDescription:
      "A child's early dental experiences build the foundation for their attitude toward oral health for the rest of their life. At SmileZone Dental Studio, we create a warm, playful, and anxiety-free environment where children feel secure and respected. Dr. Lajja Kamdar and our team utilize gentle 'tell-show-do' communication and child-proportioned instruments to make treatments completely painless. We emphasize preventive measures including topical fluoride varnish to strengthen enamel against sugary foods, protective pit and fissure sealants to shield deep molar grooves, and gentle tooth-colored fillings for primary teeth. We also guide parents on teething, diet, and provide habit-breaking appliances for thumb-sucking and tongue-thrusting.",
    keyProcedures: [
      "First Dental Visits & Child Anxiety-Free Acclimatization",
      "Topical Fluoride Varnish Applications for Cavity Resistance",
      "Pit & Fissure Sealants to Protect Deep Grooves in Molars",
      "Gentle Primary Tooth Fillings & Pediatric Crowns",
      "Habit-Breaking Appliances (Thumb Sucking & Mouth Breathing)",
      "Early Orthodontic & Jaw Growth Evaluation",
    ],
    idealFor:
      "Children of all ages—from their very first tooth to teenagers requiring preventive monitoring and gentle cavity care.",
    treatmentTime: "Quick, fun 20–40 minute appointments",
  },
  {
    id: "digital-dentistry",
    name: "Digital Dentistry",
    tag: "Advanced 3D Intraoral Scanning & CAD/CAM",
    image: "/assets/ready/treatment_digital_photo.jpg",
    cardDescription:
      "State-of-the-art digital dental diagnostics and treatment planning. Experience impression-free 3D intraoral optical scanning, computer-aided CAD/CAM restorations, and faster, more precise dental treatments with zero discomfort.",
    fullDescription:
      "Modern dental care has been revolutionized by digital technology, and SmileZone Dental Studio is at the forefront in Chembur. We have replaced messy, uncomfortable gag-inducing impression trays with high-definition 3D intraoral optical scanners. In just a few minutes, our scanner captures an exact, photorealistic digital impression of your teeth and gums on a high-definition monitor. These 3D digital records are utilized for computer-aided CAD/CAM design of custom crowns, precision clear aligners, aesthetic veneers, and guided implant surgical templates. Patients can visually see their teeth in 3D, observe treatment simulations in real time, and enjoy significantly faster turnaround times with micro-millimeter precision.",
    keyProcedures: [
      "High-Definition 3D Intraoral Optical Scanning (No Messy Trays)",
      "Interactive Real-Time 3D Smile & Alignment Previews",
      "CAD/CAM Computer-Designed Crowns & Ceramic Bridges",
      "Digital Guided Implant Surgery Planning",
      "Electronic Dental Records & Precise Progress Tracking",
    ],
    idealFor:
      "Patients seeking the highest standard of accuracy, comfort, speed, and modern impression-free dental treatments.",
    treatmentTime: "Rapid digital scans in under 5 minutes",
  },
];

export default function TreatmentsPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalTreatment, setBookingModalTreatment] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-[#092620] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Floating Navbar */}
      <Navbar
        onOpenTreatmentModal={(title) => {
          const found = treatmentsData.find((t) => t.name.toLowerCase() === title.toLowerCase());
          if (found) setSelectedTreatment(found);
        }}
        onOpenBookingModal={() => {
          setBookingModalTreatment(null);
          setBookingModalOpen(true);
        }}
      />

      <main className="pt-24 sm:pt-32">
        {/* ========================================================= */}
        {/* 7 TREATMENTS CARDS GRID                                   */}
        {/* ========================================================= */}
        <section className="py-8 sm:py-14 bg-gradient-to-b from-[#FAF8F5]/80 via-white/60 to-[#FAF6F0]/80 relative overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[380px] bg-mint/10 blur-[140px] rounded-full" />
            <div className="absolute top-3/4 right-1/4 w-[600px] h-[350px] bg-[#e8dfc8]/25 blur-[130px] rounded-full" />
          </div>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {treatmentsData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedTreatment(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedTreatment(item);
                    }
                  }}
                  className="bg-white/95 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_32px_rgba(8,84,66,0.12)] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 group border border-[#E7DFD5] hover:border-[#085442] cursor-pointer text-left"
                >
                  <div>
                    {/* Treatment Image (Contained, fully visible, centered, zero zoom) */}
                    <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-[#FAF7F2] mb-5 border border-[#E7DFD5] p-3 flex items-center justify-center group-hover:border-[#085442]/40 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300 select-none"
                      />
                    </div>

                    {/* Tag / Category */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF6F0] border border-[#C5E5D5] text-[#085442] text-[11px] font-bold uppercase tracking-wider mb-2.5">
                      <span>{item.tag}</span>
                    </div>

                    {/* Treatment Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A261F] group-hover:text-[#085442] transition-colors mb-2.5 leading-snug">
                      {item.name}
                    </h3>

                    <div className="h-px bg-[#EFE8DF] my-3.5" />

                    {/* Treatment Description */}
                    <p className="text-xs sm:text-[13px] text-[#3B5B52] leading-relaxed font-normal mb-5">
                      {item.cardDescription}
                    </p>
                  </div>

                  {/* Two Buttons: Book Appointment & View More */}
                  <div className="pt-2 border-t border-[#EFE8DF] flex items-center gap-2.5">
                    {/* Button 1: Book Appointment */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookingModalTreatment(item.name);
                        setBookingModalOpen(true);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer text-center"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="whitespace-nowrap">Book Appointment</span>
                    </button>

                    {/* Button 2: View More */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTreatment(item);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] hover:border-[#085442] hover:bg-[#F2FAF6] text-[#085442] font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 group-hover:border-[#085442]"
                    >
                      <span>View More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <Footer />

      {/* ========================================================= */}
      {/* POP-UP MODAL: TREATMENT DETAILS                           */}
      {/* (Shows Treatment Name -> Image -> Description -> Book CTA)*/}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedTreatment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTreatment(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-mint/40 my-auto text-left"
            >
              {/* 1. FIRST: TREATMENT NAME & BADGE HEADER */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#03221b] via-[#053026] to-[#085442] text-white flex items-start justify-between shrink-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {selectedTreatment.name}
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-semibold mt-2 border border-white/10">
                    <span>{selectedTreatment.tag}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. MODAL BODY (Scrollable) */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 bg-white">
                {/* Treatment Image (Fully visible, zero zoom, square showcase format matching doctor photo) */}
                <div className="flex justify-center">
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-[#d6ebe0] shadow-md bg-[#f4faf7] p-3 flex items-center justify-center">
                    <img
                      src={selectedTreatment.image}
                      alt={selectedTreatment.name}
                      className="w-full h-full object-contain object-center select-none"
                    />
                  </div>
                </div>

                {/* Detailed Description & Clinical Overview */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#0b8064]" />
                      <span>Clinical Overview &amp; Care</span>
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-[#fbfdfc] border border-[#e2f1ea] rounded-2xl p-4 sm:p-5 font-normal text-xs sm:text-sm shadow-xs">
                      {selectedTreatment.fullDescription}
                    </p>
                  </div>

                  {/* Key Procedures Included */}
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0b8064]" />
                      <span>Key Procedures &amp; Care Included:</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedTreatment.keyProcedures.map((proc, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#f4faf7] border border-[#d6ebe0] text-slate-700 text-xs font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00b070] shrink-0 mt-0.5" />
                          <span>{proc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info Chips: Ideal For & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-[#fbfdfc] border border-[#e2f1ea] shadow-xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#085442] mb-1.5">
                        <span>Ideal For</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedTreatment.idealFor}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fbfdfc] border border-[#e2f1ea] shadow-xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#085442] mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0b8064]" />
                        <span>Appointment Duration</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedTreatment.treatmentTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. MODAL FOOTER: BOOK AN APPOINTMENT BUTTON */}
              <div className="p-4 sm:p-5 bg-[#f8faf9] border-t border-[#d6ebe0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#092620]">
                    Ready to consult for {selectedTreatment.name}?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Direct appointments at SmileZone Dental Studio, Chembur
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const treatmentName = selectedTreatment.name;
                      setSelectedTreatment(null);
                      setBookingModalTreatment(treatmentName);
                      setBookingModalOpen(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#085442] hover:bg-[#0b8064] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(8,84,66,0.3)] hover:-translate-y-0.5 cursor-pointer shrink-0"
                  >
                    <Calendar className="w-4 h-4 text-mint" />
                    <span>Book Appointment for {selectedTreatment.name}</span>
                    <ArrowRight className="w-4 h-4 text-mint" />
                  </button>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Doctor,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(selectedTreatment.name)}%20at%20SmileZone%20Dental%20Studio.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white border border-[#d6ebe0] hover:border-[#085442] text-[#085442] hover:bg-[#FAF7F2] transition-all shrink-0 inline-flex items-center justify-center"
                    aria-label="Chat on WhatsApp"
                  >
                    <Phone className="w-4 h-4 text-[#00b070]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Form Modal Pop-up */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTreatment={bookingModalTreatment}
      />
    </div>
  );
}
