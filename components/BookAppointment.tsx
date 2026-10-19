"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, ChevronDown, Check, MapPin, Navigation, ExternalLink, MessageSquare } from "lucide-react";
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

  // Close when clicking outside
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
            ? "border-[#085442] ring-2 ring-[#085442]/15 bg-white shadow-sm"
            : "border-[#E2DDD3] hover:border-[#085442]/60"
        } rounded-xl px-4 py-3 text-xs sm:text-sm transition-all duration-200 cursor-pointer text-left`}
      >
        <span
          className={`truncate pr-2 ${
            selectedOption ? "text-[#092620] font-medium" : "text-slate-400 font-normal"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#0b8064] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#085442]" : ""
          }`}
        />
      </button>

      {/* Custom Animated Dropdown Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#bcebd6] rounded-2xl shadow-[0_16px_36px_rgba(8,84,66,0.16)] p-1.5 max-h-64 overflow-y-auto no-scrollbar"
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
                  ? "bg-[#eaf8f1] text-[#085442] font-bold"
                  : "text-slate-400 hover:bg-[#f2faf5] hover:text-[#085442] font-normal"
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
                      ? "bg-[#eaf8f1] text-[#085442] font-bold"
                      : "text-[#092620] hover:bg-[#f2faf5] hover:text-[#085442] font-medium"
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

interface BookAppointmentProps {
  onSuccess: (bookingData: {
    treatment: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    message?: string;
  }) => void;
}

export default function BookAppointment({ onSuccess }: BookAppointmentProps) {
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
      onSuccess(formData);
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
    } catch (err: any) {
      console.error("Booking email dispatch failed:", err);
      setSubmitError("Failed to send booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="book-appointment"
      className="bg-gradient-to-b from-[#FAF8F5]/85 via-[#F4F9F6]/55 to-[#FAF8F5]/85 py-18 sm:py-24 relative overflow-hidden"
    >
      {/* Ambient Lighting & Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[400px] bg-emerald-200/25 blur-[140px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#e8dfc8]/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Booking Container */}
        <div className="bg-white/95 border border-[#E7DFD5] hover:border-[#085442]/40 rounded-[32px] sm:rounded-[36px] overflow-visible shadow-luxury hover:shadow-luxury-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          
          {/* ========================================================= */}
          {/* LEFT FORM COLUMN                                          */}
          {/* ========================================================= */}
          <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-4 sm:mb-5">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0A261F] leading-tight tracking-tight mb-1">
                Book{" "}
                <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
                  Appointment
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal">
                Take the first step towards a healthier, brighter smile.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* Select Treatment (Custom Luxury Dropdown) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
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
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E2DDD3] hover:border-[#085442]/60 focus:border-[#085442] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#092620] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#085442]/15 hover:shadow-xs transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E2DDD3] hover:border-[#085442]/60 focus:border-[#085442] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#092620] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#085442]/15 hover:shadow-xs transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E2DDD3] hover:border-[#085442]/60 focus:border-[#085442] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#092620] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#085442]/15 hover:shadow-xs transition-all duration-200"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E2DDD3] hover:border-[#085442]/60 focus:border-[#085442] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm ${
                      formData.date ? "text-[#092620] font-medium" : "text-slate-400 font-normal"
                    } focus:outline-none focus:ring-2 focus:ring-[#085442]/15 hover:shadow-xs transition-all duration-200 cursor-pointer`}
                  />
                </div>

                {/* Time Slot (Custom Luxury Dropdown) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#085442] uppercase tracking-wider mb-1">
                    Time Slot
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
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#085442] uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5 text-[#085442]" />
                      <span>Custom Message</span>
                      <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Symptoms, questions or notes</span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about any specific dental concerns, tooth pain, symptoms, or notes..."
                    className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E2DDD3] hover:border-[#085442]/60 focus:border-[#085442] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-[#092620] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#085442]/15 hover:shadow-xs transition-all duration-200 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer text-xs text-[#527269] hover:text-[#085442] select-none transition-colors">
                <input
                  type="checkbox"
                  checked={formData.sendCopy}
                  onChange={(e) => setFormData({ ...formData, sendCopy: e.target.checked })}
                  className="rounded text-[#00b070] focus:ring-[#00b070] accent-[#00b070] w-4 h-4 cursor-pointer"
                />
                <span>Send me a confirmation copy via SMS / WhatsApp</span>
              </label>

              {/* Error Notice */}
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden group bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-xs sm:text-sm cursor-pointer w-full sm:w-auto disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                  <Calendar className="w-4 h-4 text-white stroke-[2.4]" />
                  <span className="tracking-tight">
                    {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
                  </span>
                  {!isSubmitting && (
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.4] group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Real Clinic Photo (Fitted Top to Bottom)    */}
          {/* ========================================================= */}
          <div className="relative w-full h-full min-h-[320px] lg:min-h-full overflow-hidden rounded-b-[32px] sm:rounded-b-[36px] lg:rounded-b-none lg:rounded-r-[36px]">
            <img
              src="/assets/ready/doctor_booking_operatory_v2.jpg?v=3"
              alt="Dr. Lajja Kamdar and operatory chair at SmileZone Dental Studio"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

        </div>

        {/* ========================================================= */}
        {/* GOOGLE MAP CLINIC LOCATION BELOW BOOKING FORM             */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 bg-white/95 border border-[#E7DFD5] hover:border-[#085442]/40 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300">
          {/* Header Bar */}
          <div className="p-5 sm:p-7 bg-gradient-to-r from-[#FAF7F2] via-white to-[#F4F9F6] border-b border-[#E7DFD5] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF6F0] border border-[#C5E5D5] text-[#085442] text-[11px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#0b8064]" />
                Clinic Location
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0A261F] tracking-tight">
                Visit Us at SmileZone Dental Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#3B5B52] leading-relaxed font-normal">
                Shop No. 14, Building No. 83, Sindhoo CHS, Sainath Mandir Chowk, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089
              </p>
            </div>

            <a
              href="https://maps.google.com/maps/dir//SmileZone+Dental+Studio+Shop+No.+14,+Building+No.+83,+Sindhoo+CHS+Sainath+Mandir+Chowk,+Tilak+Nagar,+Chembur+Mumbai,+Maharashtra+400089/@19.0707364,72.8970149,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7c89dc14b5451:0x7c5b10c1e51e5905"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,201,130,0.35)] hover:shadow-[0_15px_35px_rgba(0,201,130,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shrink-0 self-start md:self-auto group"
            >
              <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-[320px] sm:h-[400px] bg-[#eaf6ef]">
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
  );
}
