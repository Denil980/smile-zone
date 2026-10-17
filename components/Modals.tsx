"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Calendar } from "lucide-react";

interface ModalsProps {
  videoOpen: boolean;
  onCloseVideo: () => void;
  selectedTreatment: string | null;
  onCloseTreatment: () => void;
  bookingData: {
    treatment: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
  } | null;
  onCloseBooking: () => void;
}

export default function Modals({
  videoOpen,
  onCloseVideo,
  selectedTreatment,
  onCloseTreatment,
  bookingData,
  onCloseBooking,
}: ModalsProps) {
  const treatmentDetails: Record<string, string> = {
    "General Dentistry":
      "Comprehensive dental exams, cleanings, root canal therapy, tooth-colored composite fillings, and preventive care. Led by Dr. Lajja Kamdar with 20+ years of clinical excellence, ensuring pain-free, comfortable care with strict sterilization protocols.",
    "Dental Implants":
      "Permanent titanium tooth root replacements that look, feel, and function just like natural teeth. We specialize in single tooth implants, implant-supported fixed bridges, and implant-retained full arch dentures.",
    "Cosmetic Dentistry":
      "Transform your smile with porcelain veneers, in-office laser teeth whitening, aesthetic bonding, invisible aligners, and customized digital smile design tailored to your facial harmony.",
    "Geriatric Dentistry":
      "Specialized and compassionate dental care designed for older adults. Includes flexible lightweight dentures, precision BPS full dentures, dry mouth management, and gentle periodontal care.",
    "Braces & Aligners":
      "Straighten crooked teeth and correct malocclusions using advanced orthodontic solutions. Choose from clear invisible aligners, low-profile ceramic braces, or traditional metal brackets under specialist orthodontist supervision.",
    "Pediatric Dentistry":
      "Gentle, friendly, and fear-free dental care for infants, children, and teenagers. Preventive treatments include fluoride varnish, pit and fissure sealants, tooth monitoring, and habit breaking appliances.",
    "Digital Dentistry":
      "Next-generation digital dental solutions featuring high-definition 3D intraoral optical scanning, computer-aided CAD/CAM restorations, precision digital smile design, and guided implant planning for unmatched accuracy, comfort, and speed.",
  };

  return (
    <>
      {/* 1. Video Player Modal */}
      <AnimatePresence>
        {videoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseVideo}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-2xl bg-emerald-950 border border-mint/30 rounded-3xl p-6 shadow-2xl z-10"
            >
              <button
                onClick={onCloseVideo}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-mint hover:text-emerald-950 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-bold text-white mb-4">
                Welcome to SmileZone Dental Studio
              </h3>

              <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                  title="SmileZone Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Treatment Details Modal */}
      <AnimatePresence>
        {selectedTreatment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseTreatment}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] sm:max-h-[88vh] overflow-hidden shadow-2xl flex flex-col border border-mint/40 text-left"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#03221b] via-[#053026] to-[#085442] text-white flex items-start justify-between shrink-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {selectedTreatment}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-semibold mt-2 border border-white/10">
                    <span>Specialized Dental Care</span>
                  </div>
                </div>

                <button
                  onClick={onCloseTreatment}
                  aria-label="Close dialog"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 min-h-0 p-5 sm:p-7 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 bg-white">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#fbfdfc] border border-[#e2f1ea] shadow-xs">
                  <p className="text-slate-700 leading-relaxed font-normal text-xs sm:text-sm">
                    {treatmentDetails[selectedTreatment] || treatmentDetails["General Dentistry"]}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 bg-[#f8faf9] border-t border-[#d6ebe0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#092620]">
                    Ready to book {selectedTreatment}?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Direct appointments at SmileZone Dental Studio, Chembur
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href="#book-appointment"
                    onClick={onCloseTreatment}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#085442] hover:bg-[#0b8064] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(8,84,66,0.3)] hover:-translate-y-0.5 cursor-pointer shrink-0"
                  >
                    <Calendar className="w-4 h-4 text-mint" />
                    <span>Book This Treatment</span>
                    <ArrowRight className="w-4 h-4 text-mint" />
                  </a>
                  <button
                    onClick={onCloseTreatment}
                    className="p-3 rounded-full bg-white border border-[#d6ebe0] hover:border-[#085442] text-[#085442] hover:bg-[#FAF7F2] transition-all shrink-0 inline-flex items-center justify-center text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Booking Confirmation Modal */}
      <AnimatePresence>
        {bookingData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseBooking}
              className="fixed inset-0 bg-[#0A261F]/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-[#FAF8F5] rounded-[32px] sm:rounded-[36px] border border-[#E7DFD5] shadow-[0_24px_60px_rgba(10,38,31,0.25)] overflow-hidden z-10 max-h-[85vh] sm:max-h-[88vh] flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onCloseBooking}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#047857] text-[#6B857D] hover:text-white border border-[#E7DFD5] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Confirmation Content */}
              <div className="w-full flex-1 min-h-0 p-6 sm:p-7 md:p-8 overflow-y-auto flex flex-col justify-start">
                <div className="py-6 sm:py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-[#00b070] flex items-center justify-center mx-auto text-[#00b070] shadow-[0_0_20px_rgba(0,176,112,0.2)]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#0A261F] tracking-tight">
                      Appointment Requested!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A635B] mt-1 max-w-sm mx-auto">
                      Thank you for choosing SmileZone Dental Studio. Our team will contact you shortly to confirm your slot.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                    <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                      <span className="text-[#6B857D] font-medium">Patient:</span>
                      <strong className="text-[#0A261F]">{bookingData.name}</strong>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                      <span className="text-[#6B857D] font-medium">Phone:</span>
                      <strong className="text-[#0A261F]">{bookingData.phone}</strong>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                      <span className="text-[#6B857D] font-medium">Treatment:</span>
                      <strong className="text-[#047857]">{bookingData.treatment}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B857D] font-medium">Preferred Slot:</span>
                      <strong className="text-[#0A261F]">
                        {bookingData.date} ({bookingData.time.split(" ")[0]})
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onCloseBooking}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] hover:shadow-[0_8px_24px_rgba(0,201,130,0.35)] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(8,84,66,0.25)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
