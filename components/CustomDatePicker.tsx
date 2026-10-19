"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // Format: YYYY-MM-DD
  onChange: (dateStr: string) => void;
  minDate?: string; // Format: YYYY-MM-DD
  placeholder?: string;
  required?: boolean;
  align?: "left" | "right";
  theme?: "emerald" | "deep-emerald";
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CustomDatePicker({
  value,
  onChange,
  minDate,
  placeholder = "Select Date",
  required = false,
  align = "right",
  theme = "emerald",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse value or default to today / minDate for initial view
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const effectiveMin = minDate || todayStr;

  const initialDate = value
    ? new Date(Number(value.split("-")[0]), Number(value.split("-")[1]) - 1, Number(value.split("-")[2]))
    : effectiveMin
    ? new Date(Number(effectiveMin.split("-")[0]), Number(effectiveMin.split("-")[1]) - 1, Number(effectiveMin.split("-")[2]))
    : today;

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Keep view in sync when value changes or popover opens
  useEffect(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      setViewYear(y);
      setViewMonth(m - 1);
    }
  }, [value, isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Calendar calculations
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((prev) => prev - 1);
      setViewMonth(11);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((prev) => prev + 1);
      setViewMonth(0);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Determine if previous month navigation should be disabled
  const isPrevDisabled = () => {
    if (!effectiveMin) return false;
    const [minY, minM] = effectiveMin.split("-").map(Number);
    if (viewYear < minY) return true;
    if (viewYear === minY && viewMonth <= minM - 1) return true;
    return false;
  };

  // Format value for display
  const formatDisplay = (val: string) => {
    if (!val) return "";
    const [y, m, d] = val.split("-").map(Number);
    const dObj = new Date(y, m - 1, d);
    if (isNaN(dObj.getTime())) return val;
    return dObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSelectDay = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    onChange(todayStr);
    const [y, m] = todayStr.split("-").map(Number);
    setViewYear(y);
    setViewMonth(m - 1);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  const isDeep = theme === "deep-emerald";
  const borderFocusClass = isDeep
    ? "border-[#085442] ring-2 ring-[#085442]/15"
    : "border-[#047857] ring-2 ring-[#047857]/15";
  const borderHoverClass = isDeep ? "hover:border-[#085442]/60" : "hover:border-[#047857]/60";
  const iconColorClass = isDeep ? "text-[#085442]" : "text-[#047857]";

  return (
    <div ref={containerRef} className="relative w-full">
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
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between bg-[#FAF7F2] hover:bg-white focus:bg-white border ${
          isOpen
            ? `${borderFocusClass} bg-white shadow-sm`
            : `border-[#E7DFD5] ${borderHoverClass}`
        } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm transition-all duration-200 cursor-pointer text-left`}
      >
        <span
          className={`truncate pr-2 ${
            value ? "text-[#0A261F] font-medium" : "text-slate-400 font-normal"
          }`}
        >
          {value ? formatDisplay(value) : placeholder}
        </span>
        <CalendarIcon
          className={`w-4 h-4 ${iconColorClass} shrink-0 transition-transform duration-200 ${
            isOpen ? "scale-110" : ""
          }`}
        />
      </button>

      {/* Luxury Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute top-full ${
              align === "right" ? "left-0 sm:left-auto sm:right-0" : "left-0"
            } mt-2 z-50 w-[290px] sm:w-[310px] bg-white border border-[#E7DFD5] rounded-2xl shadow-[0_18px_42px_rgba(10,38,31,0.18)] p-3.5 sm:p-4 text-left select-none`}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <h4 className="text-sm font-bold text-[#0A261F] tracking-tight">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </h4>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={isPrevDisabled()}
                  aria-label="Previous month"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B857D] hover:text-[#047857] hover:bg-[#FAF7F2] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B857D] hover:text-[#047857] hover:bg-[#FAF7F2] active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
              {DAY_LABELS.map((day) => (
                <div
                  key={day}
                  className="text-[11px] font-bold text-[#6B857D] uppercase py-0.5 tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Previous month filler days */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => {
                const prevDay = daysInPrevMonth - firstDayIndex + idx + 1;
                return (
                  <div
                    key={`prev-${idx}`}
                    className="h-8 flex items-center justify-center text-[11px] text-slate-300 font-normal pointer-events-none"
                  >
                    {prevDay}
                  </div>
                );
              })}

              {/* Current month days */}
              {Array.from({ length: daysInCurrentMonth }).map((_, idx) => {
                const day = idx + 1;
                const dayStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isPast = effectiveMin ? dayStr < effectiveMin : false;
                const isSelected = value === dayStr;
                const isCurrentToday = dayStr === todayStr;

                if (isPast) {
                  return (
                    <div
                      key={`day-${day}`}
                      className="h-8 flex items-center justify-center text-xs text-slate-300 font-normal cursor-not-allowed select-none"
                    >
                      {day}
                    </div>
                  );
                }

                if (isSelected) {
                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => handleSelectDay(day)}
                      className="h-8 rounded-xl bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-bold text-xs flex items-center justify-center shadow-[0_3px_10px_rgba(0,176,112,0.35)] scale-105 transition-all cursor-pointer"
                    >
                      {day}
                    </button>
                  );
                }

                if (isCurrentToday) {
                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => handleSelectDay(day)}
                      className="h-8 rounded-xl border border-[#00b070] bg-[#eaf8f1] text-[#047857] font-bold text-xs flex items-center justify-center hover:bg-[#d8f3e5] transition-all cursor-pointer"
                    >
                      {day}
                    </button>
                  );
                }

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className="h-8 rounded-xl text-[#0A261F] hover:bg-[#FAF7F2] hover:text-[#047857] font-medium text-xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 pt-2.5 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleSelectToday}
                className="font-bold text-[#047857] hover:text-[#00c982] transition-colors cursor-pointer px-1 py-0.5 rounded-md hover:bg-[#FAF7F2]"
              >
                Today
              </button>

              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-medium text-slate-400 hover:text-red-500 transition-colors cursor-pointer px-1 py-0.5 rounded-md hover:bg-[#FAF7F2]"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
