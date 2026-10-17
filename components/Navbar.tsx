"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Calendar,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenTreatmentModal?: (title: string) => void;
  onOpenBookingModal?: () => void;
}

export default function Navbar({ onOpenTreatmentModal, onOpenBookingModal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Treatments", href: "/treatments" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Compute active nav synchronously from pathname - zero delay, zero flickering, never jumps to Home first
  const activeNav = (() => {
    if (!pathname || pathname === "/") return "Home";
    if (pathname.startsWith("/about")) return "About";
    if (pathname.startsWith("/treatments")) return "Treatments";
    if (pathname.startsWith("/testimonials")) return "Testimonials";
    if (pathname.startsWith("/gallery")) return "Gallery";
    if (pathname.startsWith("/blog")) return "Blog";
    if (pathname.startsWith("/contact")) return "Contact";
    return "Home";
  })();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all duration-300 py-3 sm:py-4 pointer-events-none">
      <div className="max-w-[1340px] mx-auto px-3 sm:px-6 pointer-events-auto">
        {/* ========================================================= */}
        {/* FLOATING NAVBAR WITH LUXURY FROSTED PORCELAIN CAPSULE     */}
        {/* ========================================================= */}
        <div className="relative flex items-center justify-between w-full">
          {/* Main Horizontal Capsule Bar */}
          <div className="w-full bg-white/90 backdrop-blur-2xl border border-[#e6ded5] rounded-full pl-2 sm:pl-2.5 pr-2.5 sm:pr-3 py-2 flex items-center justify-between gap-3 shadow-[0_10px_35px_rgba(13,56,48,0.06),0_1px_3px_rgba(0,0,0,0.02)] transition-all">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="relative flex items-center justify-center p-1 group"
              >
                {/* Outer Glow Halo */}
                <div className="absolute inset-0 bg-mint/20 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity" />

                {/* Organic Circular Badge Frame */}
                <div
                  className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-[#062c23] via-[#042019] to-[#02140f] p-1 border-2 border-[#00c982] flex items-center justify-center shadow-[0_0_20px_rgba(0,201,130,0.35)] group-hover:scale-105 transition-transform"
                  style={{ width: "54px", height: "54px" }}
                >
                  <img
                    src="/assets/ready/logo.png"
                    alt="SmileZone"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Middle Nav Links (Direct Click - No Dropdowns) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-xs sm:text-sm font-semibold text-[#2d4d44]">
              {navItems.map((item) => {
                const isActive = activeNav === item.name;

                return (
                  <div key={item.name} className="relative flex flex-col items-center">
                    <Link
                      href={item.href}
                      className={`transition-all py-1.5 px-3.5 rounded-full flex items-center justify-center cursor-pointer ${
                        isActive
                          ? "bg-[#085442] border border-[#085442] text-white font-bold shadow-[0_4px_14px_rgba(8,84,66,0.22)]"
                          : "hover:text-[#085442] hover:bg-[#F2ECE4]/75 text-[#3b5951]"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Glowing dot under active item */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00c982] shadow-[0_0_6px_#00c982] mt-1" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Book CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Glowing Book Button */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else if (typeof window !== "undefined") {
                    const el = document.getElementById("book-appointment");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.href = "/#book-appointment";
                  }
                }}
                className="relative overflow-hidden group bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] text-white font-black text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-6 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_16px_rgba(0,176,112,0.28)] hover:shadow-[0_8px_24px_rgba(0,201,130,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" />
                <span className="tracking-tight whitespace-nowrap">Book Appointment</span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 text-[#092620] hover:text-[#085442] transition-colors ml-1 cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE DRAWER NAVIGATION                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-[#041d16] border-l border-mint/20 shadow-2xl p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden pointer-events-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#062c23] via-[#042019] to-[#02140f] p-1 border-2 border-[#00c982] shadow-[0_0_15px_rgba(0,201,130,0.3)]">
                      <img
                        src="/assets/ready/logo.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-lg font-black text-white">
                      Smile<span className="text-mint">Zone</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 mt-6 text-sm font-semibold">
                  {navItems.map((item) => {
                    const isActive = activeNav === item.name;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`py-2 px-3 rounded-xl flex items-center justify-between transition-colors ${
                          isActive
                            ? "bg-[#0b4737] text-white font-bold border border-mint/40"
                            : "text-[#cde2dc] hover:text-mint"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-mint" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Info Strip */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-[#8ab5aa]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-mint shrink-0" />
                    <a
                      href="tel:+919876543210"
                      className="font-bold text-white hover:text-mint transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-mint shrink-0" />
                    <span>Tilak Nagar, Chembur, Mumbai</span>
                  </div>
                </div>
              </div>

              {/* Mobile Book Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else if (typeof window !== "undefined") {
                    const el = document.getElementById("book-appointment");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.href = "/#book-appointment";
                  }
                }}
                className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[#00f29d] via-[#00e599] to-[#00c982] text-[#032019] font-black text-center text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
