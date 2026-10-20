"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PageHeader from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  Stethoscope,
  Phone,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "pain-free-root-canals",
    title: "Dispelling Root Canal Myths: Why Rotary Endodontics Is Completely Pain-Free in 2026",
    category: "Root Canals & Endodontics",
    readTime: "5 min read",
    date: "October 10, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/site_images/Root-Canal-400x400_c.png",
    excerpt: "Root canals have historically carried an unfair reputation for pain. Learn how computerized rotary instruments, digital apex locators, and gentle localized anesthetics make modern treatment painless.",
    content: [
      "For decades, the phrase 'root canal' struck fear into the hearts of patients. However, dental science has advanced tremendously. At SmileZone Dental Studio in Tilak Nagar, Chembur, Dr. Lajja Kamdar utilizes modern rotary endodontics that eliminates the discomfort traditionally associated with the procedure.",
      "A root canal treatment becomes necessary when deep decay, trauma, or a cracked tooth allows oral bacteria to infect the living dental pulp inside the tooth canals. Left untreated, this infection causes throbbing pain and abscesses. The root canal procedure simply cleans out the infected pulp tissue, disinfects the microscopic canal walls, and seals the chamber with a sterile biocompatible material called gutta-percha.",
      "Why is modern treatment painless? First, advanced pH-buffered local anesthetics completely numb the tooth and surrounding periodontal fibers before the procedure even begins. Second, flexible nickel-titanium (NiTi) rotary files operate quietly and smoothly, clearing infected canals in a fraction of the time required by traditional manual hand files. Finally, digital apex locators and low-dose digital sensors ensure pinpoint precision without irritating the bone at the tooth tip.",
      "Most patients report feeling nothing more than gentle vibration during the procedure, and immediately experience relief from the severe toothache they had arrived with.",
    ],
    keyTakeaways: [
      "Root canal therapy cures pain; it does not cause it.",
      "Modern rotary nickel-titanium instruments ensure faster, quieter, and smoother canal disinfection.",
      "Capping the treated tooth with a ceramic or zirconia crown protects it from fracture for decades.",
    ],
  },
  {
    id: "clear-aligners-vs-braces",
    title: "Clear Aligners vs. Traditional Braces: What Is the Best Choice for Your Lifestyle?",
    category: "Cosmetic Dentistry",
    readTime: "6 min read",
    date: "September 28, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/site_images/braces-400x400_c.png",
    excerpt: "Want straight teeth without noticeable metal wires? Discover how transparent aligners work, what cases they can treat, and when traditional braces might still be recommended.",
    content: [
      "Crooked, rotated, or crowded teeth do more than affect your self-esteem when smiling in photographs; they also create tight food traps where plaque accumulates, drastically increasing your risk of gingivitis and interdental decay.",
      "Orthodontics has evolved past the days when metal brackets with colorful elastic bands were the only option. Clear aligners—custom-fabricated transparent medical-grade thermoplastic trays—gradually shift your teeth in microscopic increments into optimal alignment.",
      "The primary advantage of clear aligners is their discreet aesthetics. They are virtually invisible from conversational distance. Furthermore, because they are removable, you can eat all your favorite foods without worrying about breaking brackets, and maintain perfect flossing and brushing hygiene.",
      "However, discipline is paramount: aligners must be worn for 20 to 22 hours per day to achieve the predicted clinical outcomes. For complex skeletal bite discrepancies or extreme rotations, modern ceramic or self-ligating brackets may still provide the most predictable outcome.",
    ],
    keyTakeaways: [
      "Clear aligners allow you to straighten your smile discreetly without dietary restrictions.",
      "Aligners require strict compliance: 20-22 hours of daily wear for optimal tooth movement.",
      "A 3D digital intraoral scan at SmileZone can preview your final smile before starting treatment.",
    ],
  },
  {
    id: "bruxism-teeth-grinding",
    title: "5 Subtle Signs You Might Be Grinding Your Teeth at Night (Bruxism)",
    category: "Preventive Care",
    readTime: "4 min read",
    date: "September 15, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/ready/clinic_chair.jpg",
    excerpt: "Morning headaches, unexplained tooth sensitivity, or chipped enamel? You may be grinding or clenching your jaws during sleep without realizing it.",
    content: [
      "Bruxism—the involuntary clenching or grinding of teeth, most commonly during sleep—affects nearly one in three adults. Because it happens while you are unconscious, many patients have no idea they suffer from it until significant dental damage has already occurred.",
      "The forces exerted during nocturnal bruxism can exceed 250 pounds of pressure per square inch. Over time, this constant grinding wears down protective tooth enamel, flattens chewing cusps, and can cause micro-fractures in healthy teeth and existing fillings.",
      "Key warning signs include: waking up with a dull tension headache radiating around the temples, stiffness or popping in the jaw joint (TMJ), sudden sensitivity to hot and cold foods, and chipped or jagged edges on your front teeth.",
      "At SmileZone, Dr. Lajja Kamdar fabricates custom-fit nocturnal occlusal splints (nightguards) that cushion the teeth, redistribute jaw forces, and protect your precious natural enamel while you sleep.",
    ],
    keyTakeaways: [
      "Bruxism can exert over 200 lbs of grinding pressure, flattening enamel and causing fractures.",
      "Morning jaw soreness, temple headaches, and heightened cold sensitivity are classic indicators.",
      "A custom dental nightguard protects teeth and relieves TMJ muscle tension effectively.",
    ],
  },
  {
    id: "pediatric-dental-milestones",
    title: "Pediatric Dental Milestones: Caring for Milk Teeth and Preventing Childhood Cavities",
    category: "Pediatric Dental Care",
    readTime: "5 min read",
    date: "August 30, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/ready/treatment_pediatric_photo.jpg",
    excerpt: "Why are baby teeth so important if they eventually fall out? Practical advice for parents on cavity prevention, pit sealants, and positive dental visits.",
    content: [
      "A common misconception among parents is that milk teeth (primary teeth) don't matter because they will eventually be replaced by permanent adult teeth. In reality, primary teeth serve crucial roles in childhood development.",
      "Milk teeth hold the exact space required for the permanent teeth growing beneath the gums. If a baby tooth is lost prematurely to rampant decay, adjacent teeth drift into the gap, causing severe crowding and impaction of the adult tooth.",
      "Furthermore, infected milk teeth can transmit bacteria to developing permanent teeth and cause intense pain that disrupts sleep, nutrition, and school performance.",
      "Preventive pediatric care at SmileZone includes child-friendly fluoride varnish applications, painless pit and fissure sealants that seal chewing grooves against cavity-causing bacteria, and gentle, fun-filled visits that instill lifelong positive attitudes toward oral wellness.",
    ],
    keyTakeaways: [
      "Primary teeth preserve space for adult teeth and guide proper speech and nutrition.",
      "Preventive pit & fissure sealants reduce molar cavities in children by up to 80%.",
      "Bringing children for checkups by age 2 builds confidence and eliminates fear.",
    ],
  },
  {
    id: "dental-implants-vs-dentures",
    title: "Dental Implants vs. Dentures: What Senior Citizens and Adult Patients Should Know",
    category: "Dental Implants",
    readTime: "6 min read",
    date: "August 14, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/site_images/Dental-Implants_image-400x400_c.png",
    excerpt: "Missing teeth affect nutrition, speech, and jawbone health. Discover the clinical differences between titanium dental implants and modern flexible dentures.",
    content: [
      "Losing a natural tooth—whether due to severe periodontal disease, deep fractures, or age-related tooth wear—has an immediate impact on your ability to chew your favorite foods and speak with clarity.",
      "Historically, removable acrylic dentures were the standard replacement. While modern flexible dentures have improved dramatically in comfort, they do not prevent bone resorption: the jawbone gradually shrinks beneath the gums because there is no tooth root stimulating the bone.",
      "Dental implants are the gold standard for tooth replacement because they replicate both the crown and the root. Made of biocompatible titanium, the implant fuses directly with the jawbone in a biological process called osseointegration.",
      "Once restored with a custom ceramic crown, a dental implant looks, feels, and functions exactly like your natural tooth. You can bite into crunchy apples, nuts, and healthy vegetables without fear of slippage.",
    ],
    keyTakeaways: [
      "Implants stimulate jawbone density and prevent facial collapse caused by tooth loss.",
      "Unlike removable dentures, dental implants never slip, click, or require messy adhesives.",
      "With good oral hygiene, dental implants can last a lifetime.",
    ],
  },
  {
    id: "ultrasonic-scaling-gum-health",
    title: "Why Ultrasonic Teeth Scaling Is Essential for Preventing Gum Disease and Bone Loss",
    category: "Preventive Care",
    readTime: "4 min read",
    date: "July 29, 2026",
    author: "Dr. Lajja Kamdar",
    image: "/assets/ready/clinic_reception.jpg",
    excerpt: "Think brushing twice daily is enough? Discover why professional ultrasonic scaling every 6 months is critical for removing hardened tartar that toothbrushes cannot budge.",
    content: [
      "Even the most diligent brushers cannot clean every millimeter of tooth surface. Over time, salivary minerals calcify soft dental plaque into rock-hard calculus (tartar), particularly behind the lower front teeth and along the gum margins.",
      "Once tartar forms, it acts like a coral reef for harmful anaerobic bacteria. These bacteria release toxins that trigger chronic gum inflammation (gingivitis), leading to bleeding while brushing, persistent bad breath, and swollen red gums.",
      "If left unaddressed, the inflammation progresses to periodontitis: the gums detach from the teeth, forming deep pockets where bacteria destroy the underlying jawbone supporting the teeth. Periodontitis is the leading cause of adult tooth loss worldwide.",
      "At SmileZone, our painless ultrasonic scalers use gentle acoustic vibrations combined with fine cooling water jets to safely shatter hardened tartar without harming tooth enamel. Regular cleanings every 6 months keep your gums tight, pink, and healthy.",
    ],
    keyTakeaways: [
      "Tartar cannot be brushed off with a toothbrush; it requires ultrasonic dental scaling.",
      "Untreated gum inflammation destroys supporting jawbone, leading to tooth mobility.",
      "Professional cleaning every 6 months prevents bad breath, bleeding gums, and expensive treatments.",
    ],
  },
];

const categories = [
  "All Articles",
  "Preventive Care",
  "Root Canals & Endodontics",
  "Cosmetic Dentistry",
  "Pediatric Dental Care",
  "Dental Implants",
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.68, // Waits for previous card to smoothly reach position and settle before next card starts
      delayChildren: 0.05,
    },
  },
};

const articleCardVariants = {
  hidden: {
    opacity: 0,
    y: 28, // Soft, graceful upward distance from bottom
    scale: 0.985, // Subtle, natural perspective
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65, // Gentle, luxurious deceleration
      ease: [0.22, 1, 0.36, 1], // Silky smooth ease-out curve
    },
  },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [filterKey, setFilterKey] = useState(0);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    // Increment filterKey so cards always trigger a fresh sequential one-by-one cascade
    setFilterKey((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (activeArticle) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveArticle(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeArticle]);

  const filteredPosts =
    selectedCategory === "All Articles"
      ? blogPosts
      : blogPosts.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#0A261F] relative selection:bg-mint selection:text-emerald-950 font-sans">
      {/* Ambient Luxury Glows */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-200 ${activeArticle ? "opacity-0 invisible" : "opacity-100"}`}>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-teal-400/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      {/* Floating Global Navbar - fully hidden when modal is open */}
      <div className={`transition-opacity duration-200 ${activeArticle ? "opacity-0 invisible pointer-events-none" : "opacity-100"}`}>
        <Navbar onOpenBookingModal={() => setBookingModalOpen(true)} />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <main className={`relative z-10 transition-opacity duration-200 ${activeArticle ? "opacity-0 invisible pointer-events-none" : "opacity-100"}`}>
        {/* Page Header Section */}
        <PageHeader
          currentPage="Blog"
          title="Dental Health Blog"
          highlightWord="Blog"
          description="Clinical insights, oral hygiene tips, and expert dental guides from Dr. Lajja Kamdar to help you and your family maintain bright, healthy smiles."
        />

        {/* ========================================================= */}
        {/* FEATURED ARTICLE SPOTLIGHT                                */}
        {/* ========================================================= */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div
              onClick={() => setActiveArticle(blogPosts[0])}
              className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#E7DFD5] hover:border-[#085442] shadow-luxury hover:shadow-luxury-hover hover:shadow-[0_12px_36px_rgba(8,84,66,0.12)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-center cursor-pointer"
            >
              <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-slate-900 group">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#047857] to-[#0A261F] text-white text-xs font-bold uppercase tracking-wider shadow-sm border border-emerald-500/30">
                    Featured Guide
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#6B857D] mb-3">
                    <span className="font-bold text-[#047857] uppercase tracking-wider">
                      {blogPosts[0].category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#047857]" /> {blogPosts[0].readTime}
                    </span>
                    <span>•</span>
                    <span>{blogPosts[0].date}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A261F] tracking-tight leading-snug">
                    {blogPosts[0].title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4A635B] mt-3 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-[#047857]/20 flex items-center justify-center text-[#047857]">
                      <Stethoscope className="w-4 h-4 text-[#047857]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A261F]">
                        {blogPosts[0].author}
                      </div>
                      <div className="text-[10px] text-[#8C9E97]">Chief Dental Surgeon</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticle(blogPosts[0]);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00c982] via-[#00b070] to-[#047857] hover:shadow-[0_8px_24px_rgba(0,201,130,0.35)] text-white font-bold text-xs shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ARTICLES GRID & FILTER                                    */}
        {/* ========================================================= */}
        <section className="pb-16 sm:pb-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#047857] to-[#0A261F] text-white border border-[#047857] shadow-[0_6px_20px_rgba(4,120,87,0.3)] scale-105"
                        : "bg-white/90 backdrop-blur-md border border-[#E7DFD5] text-[#0A261F] hover:border-[#047857]/50 hover:text-[#047857] shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Articles Grid Container */}
            <div className="min-h-[440px]">
              <motion.div
                key={`${selectedCategory}-${filterKey}`}
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={articleCardVariants}
                    style={{
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 36px -10px rgba(4, 120, 87, 0.15)",
                      borderColor: "#085442",
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => setActiveArticle(post)}
                    className="bg-white rounded-3xl overflow-hidden border border-[#E7DFD5] shadow-luxury transition-colors duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Card Thumbnail */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0A261F]/80 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider border border-white/20">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-[11px] text-[#6B857D] mb-2">
                          <Clock className="w-3 h-3 text-[#047857]" />
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#0A261F] leading-snug group-hover:text-[#047857] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-[#4A635B] mt-2 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 border-t border-[#F0EAE1] flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-[#6B857D]">
                        By {post.author}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveArticle(post);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] hover:text-[#00c982] cursor-pointer"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - hidden when modal is open */}
      <div className={`transition-opacity duration-200 ${activeArticle ? "opacity-0 invisible pointer-events-none" : "opacity-100"}`}>
        <Footer />
      </div>

      {/* ========================================================= */}
      {/* ARTICLE DETAIL READER MODAL                               */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-3 sm:p-6 flex items-center justify-center overflow-hidden"
          >
            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] sm:max-h-[88vh] overflow-hidden shadow-2xl flex flex-col border border-mint/40 text-left"
            >
              {/* 1. FIRST: ARTICLE TITLE & BADGE HEADER */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#03221b] via-[#053026] to-[#085442] text-white flex items-start justify-between shrink-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {activeArticle.title}
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-semibold mt-2 border border-white/10">
                    <span>{activeArticle.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. MODAL BODY (Scrollable) */}
              <div className="flex-1 min-h-0 p-5 sm:p-7 overflow-y-auto custom-dropdown-scrollbar space-y-6 text-xs sm:text-sm text-slate-600 bg-white">
                {/* Article Image showcase matching Treatments photo display */}
                <div className="flex justify-center">
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-[#d6ebe0] shadow-md bg-[#f4faf7] p-3 flex items-center justify-center">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      className="w-full h-full object-contain object-center select-none"
                    />
                  </div>
                </div>

                {/* Detailed Article Content */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#0b8064]" />
                      <span>Clinical Overview &amp; Insights</span>
                    </h3>
                    <div className="space-y-3 text-slate-700 leading-relaxed bg-[#fbfdfc] border border-[#e2f1ea] rounded-2xl p-4 sm:p-5 font-normal text-xs sm:text-sm shadow-xs">
                      {activeArticle.content.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Key Clinical Takeaways */}
                  <div>
                    <h3 className="text-xs font-bold text-[#085442] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0b8064]" />
                      <span>Key Clinical Takeaways:</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeArticle.keyTakeaways.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#f4faf7] border border-[#d6ebe0] text-slate-700 text-xs font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00b070] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info Chips: Author & Reading Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-[#fbfdfc] border border-[#e2f1ea] shadow-xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#085442] mb-1.5">
                        <span>Author &amp; Specialist</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {activeArticle.author}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fbfdfc] border border-[#e2f1ea] shadow-xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#085442] mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0b8064]" />
                        <span>Reading Time &amp; Date</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {activeArticle.readTime} • {activeArticle.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. MODAL FOOTER */}
              <div className="p-4 sm:p-5 bg-[#f8faf9] border-t border-[#d6ebe0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#092620]">
                    Ready to consult Dr. Lajja Kamdar?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Direct appointments at SmileZone Dental Studio, Chembur
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveArticle(null);
                      setBookingModalOpen(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#085442] hover:bg-[#0b8064] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(8,84,66,0.3)] hover:-translate-y-0.5 cursor-pointer shrink-0"
                  >
                    <Calendar className="w-4 h-4 text-mint" />
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4 text-mint" />
                  </button>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Doctor,%20I%20have%20a%20question%20regarding%20${encodeURIComponent(activeArticle.title)}%20at%20SmileZone%20Dental%20Studio.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white border border-[#d6ebe0] hover:border-[#085442] text-[#085442] hover:bg-[#FAF7F2] transition-all shrink-0 inline-flex items-center justify-center"
                    aria-label="WhatsApp Inquiry"
                    title="WhatsApp Inquiry"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-200 ${activeArticle ? "opacity-0 invisible pointer-events-none" : "opacity-100"}`}>
        <Footer />
      </div>
    </div>
  );
}
