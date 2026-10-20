"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ChevronDown,
  Check,
  X,
  Lock,
} from "lucide-react";
import { sendBookingEmail } from "@/lib/emailService";
import CustomDatePicker from "@/components/CustomDatePicker";

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
  disabled?: boolean;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
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
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        aria-haspopup={disabled ? undefined : "listbox"}
        aria-expanded={disabled ? undefined : isOpen}
        className={`w-full flex items-center justify-between ${
          disabled
            ? "bg-[#FAF7F2]/90 border border-[#E7DFD5] cursor-not-allowed select-none"
            : isOpen
            ? "border-[#047857] ring-2 ring-[#047857]/15 bg-white shadow-sm"
            : "bg-[#FAF7F2] hover:bg-white focus:bg-white border-[#E7DFD5] hover:border-[#047857]/60 cursor-pointer"
        } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm transition-all duration-200 text-left`}
      >
        <span
          className={`truncate pr-2 ${
            selectedOption ? "text-[#0A261F] font-semibold" : "text-slate-400 font-normal"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {disabled ? (
          <Lock className="w-4 h-4 text-[#047857] shrink-0" />
        ) : (
          <ChevronDown
            className={`w-4 h-4 text-[#047857] shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#047857]" : ""
            }`}
          />
        )}
      </button>

      {!disabled && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              role="listbox"
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#E7DFD5] rounded-2xl shadow-luxury-hover p-1.5 max-h-56 overflow-y-auto no-scrollbar"
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer my-0.5 ${
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
      )}
    </div>
  );
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string | null;
  isTreatmentLocked?: boolean;
  onSuccess?: (bookingData: {
    treatment: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    message?: string;
  }) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialTreatment,
  isTreatmentLocked,
  onSuccess,
}: BookingModalProps) {
  const isLocked = isTreatmentLocked ?? Boolean(initialTreatment && initialTreatment.trim() !== "");
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

  // Map initial treatment string to one of the options or blank
  const resolveInitialTreatment = (t?: string | null) => {
    if (!t) return "";
    const found = treatmentOptions.find(
      (opt) =>
        opt.value.toLowerCase() === t.toLowerCase() ||
        opt.label.toLowerCase().includes(t.toLowerCase())
    );
    return found ? found.value : "";
  };

  const [formData, setFormData] = useState({
    treatment: resolveInitialTreatment(initialTreatment),
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

  // Sync initial treatment when modal opens or prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        treatment: resolveInitialTreatment(initialTreatment),
      }));
      setIsSubmitted(false);
      setSubmitError("");
    }
  }, [isOpen, initialTreatment]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
      if (onSuccess) {
        onSuccess(formData);
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Booking email dispatch failed:", err);
      setSubmitError("Failed to send booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setIsSubmitted(false);
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
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#047857] text-[#6B857D] hover:text-white border border-[#E7DFD5] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Form / Confirmation */}
            <div className="w-full flex-1 min-h-0 p-6 sm:p-7 md:p-8 overflow-y-auto flex flex-col justify-start">
              {isSubmitted ? (
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
                      onClick={handleFinish}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] hover:shadow-[0_8px_24px_rgba(0,201,130,0.35)] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(8,84,66,0.25)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-4 sm:mb-5 pr-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0A261F] leading-tight tracking-tight mb-1">
                      Book{" "}
                      <span className="bg-gradient-to-r from-[#047857] via-[#0b8064] to-[#00c982] bg-clip-text text-transparent">
                        Appointment
                      </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4A635B] leading-relaxed font-normal">
                      Take the first step towards a healthier, brighter smile.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Select Treatment */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                          {isLocked ? "Selected Treatment" : "Select Treatment"}
                        </label>
                        <CustomSelect
                          value={formData.treatment}
                          onChange={(val) => setFormData({ ...formData, treatment: val })}
                          options={treatmentOptions}
                          placeholder="Select Treatment"
                          required
                          disabled={isLocked}
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
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 hover:shadow-xs transition-all duration-200"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 hover:shadow-xs transition-all duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 hover:shadow-xs transition-all duration-200"
                        />
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                          Date
                        </label>
                        <CustomDatePicker
                          value={formData.date}
                          onChange={(val) => setFormData({ ...formData, date: val })}
                          minDate={todayStr}
                          placeholder="Select Date"
                          required
                          align="right"
                          theme="emerald"
                        />
                      </div>

                      {/* Time Slot */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
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

                      {/* Message / Concerns Input Box */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-1">
                          Message / Concerns <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type your message, concerns, or anything you'd like to share..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#FAF7F2] hover:bg-white focus:bg-white border border-[#E7DFD5] hover:border-[#047857]/60 focus:border-[#047857] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A261F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#047857]/15 hover:shadow-xs transition-all duration-200"
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
                      <span>Send me a confirmation copy via SMS / WhatsApp</span>
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
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
