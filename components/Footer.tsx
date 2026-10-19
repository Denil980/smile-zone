import React from "react";
import { MapPin, Phone, ChevronRight, Mail, ExternalLink } from "lucide-react";

const workingHours = [
  { day: "Monday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Tuesday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Wednesday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Thursday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Friday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Saturday", hours: "9 - 1pm | 5 - 9pm" },
  { day: "Sunday", hours: "Closed", isClosed: true },
];

export default function Footer() {
  return (
    <footer className="bg-[#082C23] text-[#D0E2DC] pt-16 pb-8 border-t border-[#164D3F]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top 4-Column Grid: About, Quick Links, Treatments, Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1fr_1.2fr] gap-8 xl:gap-10 mb-10">
          {/* Col 1: About */}
          <div>
            <a href="#hero" className="flex items-center gap-3 mb-4 group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-mint/20 to-emerald-900 border border-mint flex items-center justify-center p-1 shadow-glow">
                <img
                  src="/assets/ready/logo.png"
                  alt="SmileZone Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  Smile<span className="text-mint">Zone</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#92b8af] tracking-wider mt-0.5">
                  Dental Studio
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-[#9cbdb4] leading-relaxed mb-6">
              SmileZone Dental Studio is a premier multispeciality dental clinic in Tilak Nagar, Chembur led by Dr. Lajja Kamdar with 20+ years of clinical excellence in cosmetic and restorative dental treatments.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/drlajjassmilezone"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-mint hover:text-emerald-950 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/drlajjassmilezone/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-mint hover:text-emerald-950 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://wa.me/919876543210?text=Hello%20Doctor,%20I%20am%20contacting%20you%20through%20your%20website%20www.smilezone.co.in."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-mint hover:text-emerald-950 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UC8cxeF6J5NDDENM6QnqMu_Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-mint hover:text-emerald-950 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 & 3: Quick Links & Treatments (Side-by-side on mobile, native grid columns on md+) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:contents">
            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-0.5 after:bg-mint">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9cbdb4]">
                <li>
                  <a href="/" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Treatments</span>
                  </a>
                </li>
                <li>
                  <a href="/testimonials" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Patient Testimonials</span>
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Smile Gallery</span>
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Oral Health Blog</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Contact &amp; Location</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Treatments */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-0.5 after:bg-mint">
                Treatments
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9cbdb4]">
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>General Dentistry</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Dental Implants</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Cosmetic Dentistry</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Braces &amp; Aligners</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Pediatric Dentistry</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Geriatric Dentistry</span>
                  </a>
                </li>
                <li>
                  <a href="/treatments" className="hover:text-mint transition-colors flex items-start gap-1.5 leading-snug">
                    <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0 mt-0.5" />
                    <span>Digital Dentistry</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Working Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-0.5 after:bg-mint">
              Working Hours
            </h4>
            <ul className="space-y-2 text-xs text-[#9cbdb4]">
              {workingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className="font-semibold text-white/90">{item.day}:</span>
                  {item.isClosed ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      Closed
                    </span>
                  ) : (
                    <span className="text-mint font-semibold text-right tracking-tight">
                      {item.hours}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dedicated Contact Us Section: Below Quick Links, Treatments & Working Hours */}
        <div className="pt-8 border-t border-white/10 mb-8">
          <div className="bg-gradient-to-r from-[#06241C]/80 via-[#0A3329]/80 to-[#06241C]/80 border border-[#1C5243] rounded-2xl p-6 sm:p-7 shadow-luxury">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-0.5 after:bg-mint flex items-center gap-2">
              <MapPin className="w-4 h-4 text-mint" />
              Contact Us
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start text-xs text-[#9cbdb4]">
              {/* Address & Google Maps Direction */}
              <div className="lg:col-span-5 space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-mint block">
                  Clinic Location
                </span>
                <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
                  SmileZone Dental Studio, Shop No. 14, Building No. 83, Sindhoo CHS, Sainath Mandir Chowk, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089.
                </p>
                <a
                  href="https://maps.google.com/maps/dir//SmileZone+Dental+Studio+Shop+No.+14,+Building+No.+83,+Sindhoo+CHS+Sainath+Mandir+Chowk,+Tilak+Nagar,+Chembur+Mumbai,+Maharashtra+400089/@19.0707364,72.8970149,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7c89dc14b5451:0x7c5b10c1e51e5905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-mint hover:text-white font-semibold transition-colors group mt-1"
                >
                  <span>+ Get directions on Google Map</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Email Addresses */}
              <div className="lg:col-span-3 space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-mint block">
                  Email Us
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-mint shrink-0" />
                    <a
                      href="mailto:drlajja@smilezone.co.in"
                      className="hover:text-mint text-white/90 font-medium transition-colors"
                    >
                      drlajja@smilezone.co.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pl-6">
                    <a
                      href="mailto:info@smilezone.co.in"
                      className="hover:text-mint text-[#9cbdb4] transition-colors"
                    >
                      info@smilezone.co.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Call & WhatsApp */}
              <div className="lg:col-span-4 space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-mint block">
                  Call & WhatsApp
                </span>
                <div className="flex flex-col gap-2.5 w-full">
                  {/* Phone Call */}
                  <a
                    href="tel:+919876543210"
                    className="w-full inline-flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-mint/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Phone className="w-4 h-4 text-mint shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-white tracking-tight text-xs sm:text-sm whitespace-nowrap">
                        +91 98765 43210
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-white/10 px-2 py-0.5 rounded text-mint shrink-0">
                      Call
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Doctor,%20I%20am%20contacting%20you%20through%20your%20website%20www.smilezone.co.in."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 hover:border-mint hover:bg-emerald-900/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg className="w-4 h-4 fill-[#25D366] shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span className="font-semibold text-white tracking-tight text-xs sm:text-sm whitespace-nowrap">
                        +91 98765 43210
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-[#4ade80] border border-emerald-500/30 px-2 py-0.5 rounded shrink-0">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d9e95] gap-3">
          <span>© 2026 SmileZone Dental Studio. All Rights Reserved.</span>
          <span>Crafted with clinical excellence & gentle patient care.</span>
        </div>
      </div>
    </footer>
  );
}
