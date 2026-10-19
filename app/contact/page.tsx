"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  ArrowRight,
  ChevronDown,
  Check,
  Navigation,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { sendBookingEmail } from "@/lib/emailService";

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  required?: boolean;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      {/* Hidden input for HTML5 form validation */}
      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, width: 0, height: 0, position: "absolute", pointerEvents: "none" }}
          value={value}
          onChange={() => {}}
          required={required}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between bg-[#FAF7F2] hover:bg-white focus:bg-white border ${
          isOpen
            ? "border-[#047857] ring-2 ring-[#047857]/15 bg-white shadow-sm"
            : "border-[#E7DFD5] hover:border-[#047857]/60"
        } rounded-xl px-4 py-3 text-xs sm:text-sm transition-all duration-200 cursor-pointer text-left`}
      >
        <span
          className={`truncate pr-2 ${
            selectedOption ? "text-[#0A261F] font-medium" : "text-slate-400 font-normal"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#047857] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#047857]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#E7DFD5] rounded-2xl shadow-luxury-hover p-1.5 max-h-64 overflow-y-auto no-scrollbar"
          >
            {/* Blank Placeholder Option */}
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
                !value
                  ? "bg-[#eaf8f1] text-[#047857] font-bold"
                  : "text-slate-400 hover:bg-[#FAF7F2] hover:text-[#047857] font-normal"
              }`}
            >
              <span className="pr-2 leading-snug">{placeholder}</span>
              {!value && <Check className="w-4 h-4 text-[#00b070] shrink-0 ml-2" />}
            </button>

            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
                    isSelected
                      ? "bg-[#eaf8f1] text-[#047857] font-bold"
                      : "text-[#0A261F] hover:bg-[#FAF7F2] hover:text-[#047857] font-medium"
                  }`}
                >
                  <span className="pr-2 leading-snug">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#00b070] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const todayStr = new Date().toISOString().split("T")[0];

  const treatmentOptions: CustomSelectOption[] = [
    { value: "General Dentistry", label: "General Dentistry (Root Canal, Cleaning, Fillings)" },
    { value: "Dental Implants", label: "Dental Implants" },
    { value: "Cosmetic Dentistry", label: "Cosmetic Dentistry (Veneers, Whitening)" },
    { value: "Braces & Aligners", label: "Braces & Aligners" },
    { value: "Geriatric Dentistry", label: "Geriatric Dentistry (Dentures)" },
    { value: "Pediatric Dentistry", label: "Pediatric Dentistry (Kids Care)" },
    { value: "Digital Dentistry", label: "Digital Dentistry (3D Scanning & Design)" },
  ];

  const timeOptions: CustomSelectOption[] = [
    { value: "Morning Slot (9:00 AM - 1:00 PM)", label: "Morning Slot (9:00 AM - 1:00 PM)" },
    { value: "Evening Slot (5:00 PM - 9:00 PM)", label: "Evening Slot (5:00 PM - 9:00 PM)" },
  ];

  const [formData, setFormData] = useState({
    treatment: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
    sendCopy: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.treatment || !formData.date || !formData.time) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await sendBookingEmail(formData);
      if (!res.success) {
        setSubmitError(
          typeof res.error === "string"
            ? `Email sending failed: ${res.error}`
            : "Could not send booking email via EmailJS. Please check your EmailJS service or connection."
        );
        return;
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Booking email dispatch failed:", err);
      setSubmitError("Failed to send booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError("");
    setFormData({
      treatment: "",
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      message: "",
      sendCopy: true,
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-[#0A261F] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Ambient Luxury Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-teal-400/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      {/* Floating Global Navbar */}
      <Navbar />

      <main className="relative z-10">
        {/* Page Header Section */}
        <PageHeader
          currentPage="Contact"
          title="Contact SmileZone"
          highlightWord="SmileZone"
          description="Get in touch with SmileZone Dental Studio in Tilak Nagar, Chembur. Find clinic directions, consulting hours, phone numbers, or schedule your dental appointment."
        />

        {/* ========================================================= */}
        {/* 3 CORE CONTACT CARDS                                      */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-16 relative z-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Location */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E7DFD5] hover:border-[#085442] shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_32px_rgba(8,84,66,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-[#047857]/20 flex items-center justify-center text-[#047857] mb-4 group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6 text-[#047857]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A261F] mb-2 group-hover:text-[#047857] transition-colors">
                    Clinic Address
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A635B] leading-relaxed font-normal">
                    Shop No. 14, Building No. 83, Sindhoo CHS, Sainath Mandir Chowk, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EAE1]">
                  <a
                    href="https://maps.google.com/maps/dir//SmileZone+Dental+Studio+Shop+No.+14,+Building+No.+83,+Sindhoo+CHS+Sainath+Mandir+Chowk,+Tilak+Nagar,+Chembur+Mumbai,+Maharashtra+400089/@19.0707364,72.8970149,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7c89dc14b5451:0x7c5b10c1e51e5905"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] hover:text-[#00c982] transition-colors"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Phone / Support */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E7DFD5] hover:border-[#085442] shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_32px_rgba(8,84,66,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-[#047857]/20 flex items-center justify-center text-[#047857] mb-4 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6 text-[#047857]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A261F] mb-2 group-hover:text-[#047857] transition-colors">
                    Phone &amp; WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A635B] leading-relaxed font-normal">
                    Call our front desk for appointment slots, emergency consultation, or general inquiries.
                  </p>

                  <div className="mt-3 space-y-1">
                    <div>
                      <a
                        href="tel:+919876543210"
                        className="text-sm font-bold text-[#047857] hover:underline"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:+919123456789"
                        className="text-sm font-bold text-[#047857] hover:underline"
                      >
                        +91 91234 56789
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EAE1]">
                  <a
                    href="https://wa.me/919876543210?text=Hello%20SmileZone%20Dental%20Studio,%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00b070] hover:text-[#047857] transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Working Hours */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E7DFD5] hover:border-[#085442] shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_32px_rgba(8,84,66,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-[#047857]/20 flex items-center justify-center text-[#047857] mb-4 group-hover:scale-105 transition-transform">
                    <Clock className="w-6 h-6 text-[#047857]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A261F] mb-2 group-hover:text-[#047857] transition-colors">
                    Clinic Timings
                  </h3>
                  <div className="text-xs sm:text-sm text-[#4A635B] space-y-1.5 font-normal">
                    <div className="flex justify-between border-b border-[#F0EAE1] pb-1">
                      <span className="font-semibold text-[#0A261F]">Mon – Sat Morning:</span>
                      <span>9:00 AM – 1:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-[#F0EAE1] pb-1">
                      <span className="font-semibold text-[#0A261F]">Mon – Sat Evening:</span>
                      <span>5:00 PM – 9:00 PM</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="font-semibold text-[#0A261F]">Sunday:</span>
                      <span className="text-amber-600 font-semibold">By Appointment</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EAE1] text-xs text-[#6B857D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b070] animate-pulse" />
                  <span>Prompt Appointments • Zero Waiting</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INLINE APPOINTMENT BOOKING FORM                           */}
        {/* ========================================================= */}
        <section id="book-form" className="py-12 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="bg-white/95 backdrop-blur-md border border-[#E7DFD5] hover:border-[#085442] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-luxury hover:shadow-[0_16px_40px_rgba(8,84,66,0.08)] grid grid-cols-1 lg:grid-cols-2 items-stretch transition-all duration-300">
              
              {/* Left Column: Form */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                {isSubmitted ? (
                  <div className="py-8 sm:py-12 text-center space-y-4">
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
                        <strong className="text-[#0A261F]">{formData.name}</strong>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                        <span className="text-[#6B857D] font-medium">Phone:</span>
                        <strong className="text-[#0A261F]">{formData.phone}</strong>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                        <span className="text-[#6B857D] font-medium">Treatment:</span>
                        <strong className="text-[#047857]">{formData.treatment}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6B857D] font-medium">Preferred Slot:</span>
                        <strong className="text-[#0A261F]">{formData.date} ({formData.time.split(" ")[0]})</strong>
                      </div>
                      {formData.message && (
                        <div className="flex flex-col border-t border-[#F0EAE1] pt-2 text-left">
                          <span className="text-[#6B857D] font-medium text-[11px] mb-1">Notes / Message:</span>
                          <p className="text-[#0A261F] text-xs italic bg-white/70 p-2.5 rounded-xl border border-[#E7DFD5] break-words whitespace-pre-wrap leading-relaxed">
                            "{formData.message}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] hover:shadow-[0_8px_24px_rgba(0,201,130,0.35)] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        <span>Book Another Appointment</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 sm:mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-[#047857] border border-[#047857]/20 text-xs font-bold uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#047857]" />
                        Schedule Consultation
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0A261F] leading-tight tracking-tight">
                        Book Your Visit with Dr. Lajja Kamdar
                      </h2>
                      <p className="text-xs sm:text-sm text-[#4A635B] mt-1">
                        Fill in your details and preferred slot. We will confirm your timing promptly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Select Treatment */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Select Treatment
                          </label>
                          <CustomSelect
                            value={formData.treatment}
                            onChange={(val) => setFormData({ ...formData, treatment: val })}
                            options={treatmentOptions}
                            placeholder="Select Treatment"
                            required
                          />
                        </div>

                        {/* Name */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Enter your mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all"
                          />
                        </div>

                        {/* Date */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            required
                            min={todayStr}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={`w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm ${
                              formData.date ? "text-[#0A261F] font-medium" : "text-slate-400 font-normal"
                            } focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all cursor-pointer`}
                          />
                        </div>

                        {/* Time Slot */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Preferred Time Slot
                          </label>
                          <CustomSelect
                            value={formData.time}
                            onChange={(val) => setFormData({ ...formData, time: val })}
                            options={timeOptions}
                            placeholder="Select Time Slot"
                            required
                          />
                        </div>

                        {/* Custom Message Field */}
                        <div className="sm:col-span-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#047857] uppercase tracking-wider">
                              <MessageSquare className="w-3.5 h-3.5 text-[#047857]" />
                              <span>Custom Message</span>
                              <span className="text-slate-400 font-normal lowercase">(optional)</span>
                            </label>
                            <span className="text-[10px] text-slate-400 font-medium">Symptoms, questions or notes</span>
                          </div>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Describe any dental concerns, tooth pain, symptoms, or notes for the doctor..."
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl sm:rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Checkbox */}
                      <label className="flex items-center gap-2 pt-1 cursor-pointer text-xs text-[#4A635B] hover:text-[#047857] select-none transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.sendCopy}
                          onChange={(e) => setFormData({ ...formData, sendCopy: e.target.checked })}
                          className="rounded text-[#00b070] focus:ring-[#00b070] accent-[#00b070] w-4 h-4 cursor-pointer"
                        />
                        <span>Send me confirmation copy via SMS / WhatsApp</span>
                      </label>

                      {/* Error Notice */}
                      {submitError && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                          {submitError}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative overflow-hidden group bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,176,112,0.25)] hover:shadow-[0_10px_28px_rgba(0,201,130,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-xs sm:text-sm cursor-pointer w-full sm:w-auto disabled:opacity-80 disabled:cursor-not-allowed"
                        >
                          <Calendar className="w-4 h-4 text-white" />
                          <span>
                            {isSubmitting ? "Confirming Appointment..." : "Confirm Appointment Request"}
                          </span>
                          {!isSubmitting && (
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Right Column: Operatory Image */}
              <div className="relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#E7DFD5] min-h-[320px] lg:min-h-full bg-slate-900">
                <img
                  src="/assets/ready/doctor_booking_operatory_v2.jpg?v=3"
                  alt="Dr. Lajja Kamdar and operatory chair at SmileZone Dental Studio"
                  className="w-full h-full object-cover object-center select-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE GOOGLE MAPS SECTION                           */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="bg-white/95 backdrop-blur-md border border-[#E7DFD5] hover:border-[#085442] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-luxury hover:shadow-[0_16px_40px_rgba(8,84,66,0.08)] transition-all duration-300">
              {/* Header Bar */}
              <div className="p-5 sm:p-7 bg-gradient-to-r from-[#FAF7F2] via-white to-[#F5EFEB]/50 border-b border-[#E7DFD5] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-[#047857]/20 text-[#047857] text-[11px] font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#047857]" />
                    Interactive Map
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A261F] tracking-tight">
                    Find SmileZone Dental Studio on Google Maps
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A635B] leading-relaxed font-normal">
                    Shop No. 14, Building No. 83, Sindhoo CHS, Sainath Mandir Chowk, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089
                  </p>
                </div>

                <a
                  href="https://maps.google.com/maps/dir//SmileZone+Dental+Studio+Shop+No.+14,+Building+No.+83,+Sindhoo+CHS+Sainath+Mandir+Chowk,+Tilak+Nagar,+Chembur+Mumbai,+Maharashtra+400089/@19.0707364,72.8970149,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7c89dc14b5451:0x7c5b10c1e51e5905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,176,112,0.25)] hover:shadow-[0_8px_24px_rgba(0,201,130,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shrink-0 self-start md:self-auto group"
                >
                  <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
                  <span>Get Navigation Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full h-[360px] sm:h-[440px] bg-[#FAF8F5]">
                <iframe
                  src="https://maps.google.com/maps?q=SmileZone+Dental+Studio,+Shop+No.+14,+Building+No.+83,+Sindhoo+CHS,+Sainath+Mandir+Chowk,+Chembur+West,+Tilak+Nagar,+Chembur,+Mumbai,+Maharashtra+400089&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SmileZone Dental Studio Google Map Location"
                  className="w-full h-full filter saturate-[1.05] contrast-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
