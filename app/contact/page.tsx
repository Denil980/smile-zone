"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BookingModal from "@/components/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ChevronDown,
  Check,
  Navigation,
  ExternalLink,
  Send,
} from "lucide-react";
import { sendContactInquiryEmail } from "@/lib/emailService";

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
        } rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all duration-200 cursor-pointer text-left`}
      >
        <span
          className={`truncate pr-2 ${
            selectedOption ? "text-[#0A261F] font-semibold" : "text-slate-400 font-normal"
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
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#E7DFD5] rounded-2xl shadow-luxury-hover p-1.5 pr-2 max-h-64 overflow-y-auto custom-dropdown-scrollbar"
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
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
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
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const inquiryOptions: CustomSelectOption[] = [
    { value: "Doctor", label: "Doctor" },
    { value: "Hospital", label: "Hospital" },
    { value: "Clinic", label: "Clinic" },
    { value: "Appointment", label: "Appointment" },
    { value: "General Inquiry", label: "General Inquiry" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryRegarding: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.inquiryRegarding) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await sendContactInquiryEmail(formData);
      if (!res.success) {
        setSubmitError(
          typeof res.error === "string"
            ? `Email sending failed: ${res.error}`
            : "Could not send inquiry via EmailJS. Please check your connection or contact us directly."
        );
        return;
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Contact inquiry dispatch failed:", err);
      setSubmitError("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError("");
    setFormData({
      name: "",
      phone: "",
      email: "",
      inquiryRegarding: "",
      message: "",
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
      <Navbar onOpenBookingModal={() => setBookingModalOpen(true)} />

      <main className="relative z-10">
        {/* Page Header Section */}
        <PageHeader
          currentPage="Contact"
          title="Contact SmileZone"
          highlightWord="SmileZone"
          description="Get in touch with SmileZone Dental Studio in Tilak Nagar, Chembur. Find clinic directions, consulting hours, phone numbers, or send an inquiry to our team."
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
        {/* CONTACT / INQUIRY FORM                                    */}
        {/* ========================================================= */}
        <section id="contact-form" className="py-12 sm:py-16">
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
                        Inquiry Submitted Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A635B] mt-1 max-w-sm mx-auto">
                        Thank you for reaching out to SmileZone Dental Studio. Our clinic team will review your inquiry and get back to you shortly.
                      </p>
                    </div>

                    {/* Summary Box */}
                    <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                        <span className="text-[#6B857D] font-medium">Patient Name:</span>
                        <strong className="text-[#0A261F]">{formData.name}</strong>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                        <span className="text-[#6B857D] font-medium">Phone:</span>
                        <strong className="text-[#0A261F]">{formData.phone}</strong>
                      </div>
                      {formData.email && (
                        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                          <span className="text-[#6B857D] font-medium">Email:</span>
                          <strong className="text-[#0A261F]">{formData.email}</strong>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
                        <span className="text-[#6B857D] font-medium">Inquiry Regarding:</span>
                        <strong className="text-[#047857]">{formData.inquiryRegarding}</strong>
                      </div>
                      {formData.message && (
                        <div className="flex flex-col pt-1 text-left">
                          <span className="text-[#6B857D] font-medium text-[11px] mb-1">Message:</span>
                          <p className="text-[#0A261F] text-xs italic bg-white/70 p-2.5 rounded-xl border border-[#E7DFD5] break-words whitespace-pre-wrap leading-relaxed">
                            &ldquo;{formData.message}&rdquo;
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
                        <span>Submit Another Inquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 sm:mb-6">
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0A261F] leading-tight tracking-tight">
                        Send Us a Message
                      </h2>
                      <p className="text-xs sm:text-sm text-[#4A635B] mt-1">
                        Have a question, inquiry, or need information? Fill out the form below and our team will get back to you promptly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* What is your inquiry regarding? */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            What is your inquiry regarding?
                          </label>
                          <CustomSelect
                            value={formData.inquiryRegarding}
                            onChange={(val) => setFormData({ ...formData, inquiryRegarding: val })}
                            options={inquiryOptions}
                            placeholder="Select category"
                            required
                          />
                        </div>

                        {/* Patient Name */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Patient Name
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

                        {/* Phone Number */}
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

                        {/* Email Address */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all"
                          />
                        </div>

                        {/* Message / Custom Textbox */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                            Your Message / What You&apos;d Like to Talk About
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Type what you want to talk about or inform us (in two to three sentences)..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 transition-all resize-none leading-relaxed"
                          />
                        </div>
                      </div>

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
                          <Send className="w-4 h-4 text-white" />
                          <span>
                            {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
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

              {/* Map Embed Frame */}
              <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-100">
                <iframe
                  title="SmileZone Dental Studio Tilak Nagar Chembur Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8225574347596!2d72.89443997596568!3d19.070736382132644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89dc14b5451%3A0x7c5b10c1e51e5905!2sSmileZone%20Dental%20Studio!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.05] contrast-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Form Modal Pop-up (for Navbar button) */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Clinic Footer */}
      <Footer />
    </div>
  );
}
