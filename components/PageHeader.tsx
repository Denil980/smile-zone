"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  currentPage: string;
  title: string;
  highlightWord?: string;
  description: string;
}

export default function PageHeader({
  currentPage,
  title,
  highlightWord,
  description,
}: PageHeaderProps) {
  // If highlightWord is provided, split and highlight it with the brand gradient
  const renderTitle = () => {
    if (!highlightWord) {
      return title;
    }

    const parts = title.split(highlightWord);
    if (parts.length < 2) return title;

    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-[#00A86B] via-[#059669] to-[#047857] bg-clip-text text-transparent">
          {highlightWord}
        </span>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F9F6]/75 to-[#FAF6F0] pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 border-b border-[#E7DFD5] overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[320px] bg-mint/10 blur-[130px] rounded-full" />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-[#e8dfc8]/30 blur-[120px] rounded-full" />
      </div>

      {/* Top Subtle Shimmer Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00c982]/30 to-transparent opacity-60" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Breadcrumb: Home / [Page Name] */}
          <nav aria-label="Breadcrumb" className="mb-3.5">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide">
              <li>
                <a
                  href="/"
                  className="text-[#085442] hover:text-[#00c982] transition-colors"
                >
                  Home
                </a>
              </li>
              <li className="text-[#9BB4AC] select-none">/</li>
              <li className="text-[#0A261F] font-bold">
                {currentPage}
              </li>
            </ol>
          </nav>

          {/* Page Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A261F] tracking-tight leading-tight mb-3 sm:mb-4">
            {renderTitle()}
          </h1>

          {/* What this page is showing */}
          <p className="text-sm sm:text-base text-[#3B5B52] leading-relaxed font-normal">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
