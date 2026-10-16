# 🦷 SmileZone Dental Studio (Next.js + TypeScript + Tailwind CSS + Framer Motion)

A high-performance, pixel-perfect replication of the **SmileZone Dental Studio** design mockup built with the modern tech stack: **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Prerendering)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with extended emerald/mint brand palette
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid spring animations, micro-interactions, modal transitions, and interactive draggable sliders
- **Icons**: [Lucide React](https://lucide.dev/) + FontAwesome brand icons
- **Typography**: Google Fonts via `next/font` (`Plus Jakarta Sans` for clean UI, `Caveat` for handwritten cursive script)

---

## 🌟 Highlights & Implemented Features

1. **Top Announcement Bar (`components/TopBar.tsx`)**:
   - Location: *Tilak Nagar, Chembur, Mumbai*
   - Timings: *Mon - Sat: 9:00 AM - 8:00 PM*
   - Direct click-to-call: `+91 93213 26336`
   - Social links (*Facebook, Instagram, WhatsApp, YouTube*) + `Book Appointment →` pill CTA.

2. **Sticky Glassmorphic Navigation (`components/Navbar.tsx`)**:
   - Frosted backdrop blur (`bg-emerald-900/80 backdrop-blur-md`).
   - Circular brand logo badge with smile glyph.
   - Interactive treatments dropdown menu with animated Framer Motion transitions.
   - Floating badge: *Gentle Care / Beautiful Results* with glowing tooth icon.
   - Responsive mobile slide-out drawer with spring physics.

3. **Hero Section (`components/Hero.tsx`)**:
   - Deep emerald radial gradient with lush monstera and palm botanical foliage.
   - Headline: **Healthy Smiles**, **Happier Lives**.
   - Handwritten cursive tag: *"Your Smile Our Priority ♡"*.
   - Dual CTAs: Glowing mint **Book Appointment** button & frosted glass **Watch Video** button (launches video modal).
   - 4-item dental features strip: *Advanced Technology, Experienced Dentists, Safe & Hygienic, Patient Focused*.
   - Patient in dental chair cutout with floating badge and organic SVG wave bottom divider.

4. **About Our Clinic (`components/AboutClinic.tsx`)**:
   - Subtitle: *Best Quality Dental Care at Dr. Lajja's SmileZone Dental Studio*.
   - 2×2 feature grid with icons:
     - **Best Quality Dental Care**
     - **Friendly Staff**
     - **Dental Treatments For Whole Family**
     - **COVID Safe Dental Clinic**
   - 3D glossy molar tooth model with floating mint orbital ring.

5. **Meet Our Specialist (`components/MeetSpecialist.tsx`)**:
   - High-definition cutout of **Dr. Lajja Kamdar** in cream blazer.
   - Authentic handwritten signature graphic.
   - 5 credential badges (*BDS Nair Hospital, Certified in Cosmetic Dentistry, Restorative, Pediatric, Full Mouth Rehab*).
   - Glassmorphic stats bar: **20+** Years Experience, **15,000+** Happy Patients, **100%** Satisfaction, **Smile Design Specialist**.

6. **Dental Treatments (`components/DentalTreatments.tsx`)**:
   - 6 cards featuring custom 3D dental illustrations (*Molar, Dental Implant, Sparkling Tooth, Denture Model, Orthodontic Braces, Cute Child Tooth*).
   - Clickable **Know More →** triggers modal with procedure overviews, FAQs, and appointment CTA.

7. **Smile Gallery (`components/SmileGallery.tsx`)**:
   - **Interactive Draggable Before/After Sliders**: Click and drag (or swipe on touch screens) the circular handle `◂ ▸` left/right to reveal before & after states in real-time.
   - 4 smile transformation cases with Before (dark) and After (mint) badge tags.
   - Carousel navigation controls (`<` and `>`).

8. **Panel of Doctors (`components/PanelDoctors.tsx`)**:
   - **Dr. Lajja Kamdar** (BDS Nair Hospital, Smile Design Specialist)
   - **Dr. Yoban Shetty** (B.D.S., M.D.S. Orthodontics France, Cosmetology Ukraine)
   - **Dr. Ninad Khatal** (BDS, Masters Oral Surgery & Implantology Italy, FICOI USA)
   - Circular portraits framed in green-teal gradient rings with hover lift.

9. **Patient Testimonials (`components/Testimonials.tsx`)**:
   - Real patient avatars, 5 gold stars, quote marks, and verified reviews from **Priya T.**, **Rahul M.**, and **Sneha K.**

10. **Book Appointment (`components/BookAppointment.tsx`)**:
    - Complete reservation form with treatment selector, patient name, phone, email, date picker, time slot selector, SMS copy checkbox, and instant confirmation modal.
    - Right side: Dr. Lajja Kamdar at the clinic with the dental chair and floating *"Your Smile Our Priority ♡"* script card.

11. **Modals & Floating Actions (`components/Modals.tsx`, `components/FloatingActions.tsx`)**:
    - Embedded clinic video player modal.
    - Detailed treatment procedure modal.
    - Booking confirmation modal.
    - Floating WhatsApp quick-chat button and Back to Top button.

---

## 🏃‍♂️ How to Run Locally

### 1. Start Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Production Server
```powershell
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
smilezone/
├── app/
│   ├── globals.css              # Tailwind base, utilities, and text-glow classes
│   ├── layout.tsx               # Root layout with Google Fonts (Plus Jakarta Sans & Caveat)
│   └── page.tsx                 # Main page assembling all sections & modal state
├── components/
│   ├── TopBar.tsx               # Top contact and social bar
│   ├── Navbar.tsx               # Sticky glassmorphic navbar with mobile drawer
│   ├── Hero.tsx                 # Hero section with headline, patient visual, and badges
│   ├── AboutClinic.tsx          # 2x2 feature grid with 3D tooth illustration
│   ├── MeetSpecialist.tsx       # Dr. Lajja Kamdar profile, credentials & stats
│   ├── DentalTreatments.tsx     # 3D treatment cards (01 to 06)
│   ├── SmileGallery.tsx         # Interactive draggable Before/After sliders
│   ├── PanelDoctors.tsx         # Circular doctor cards with gradient frames
│   ├── Testimonials.tsx         # Patient review cards with 5 stars
│   ├── BookAppointment.tsx      # Reservation form + clinic background
│   ├── Footer.tsx               # Hours, location, navigation, social links
│   ├── FloatingActions.tsx      # WhatsApp chat & back-to-top buttons
│   └── Modals.tsx               # Video, treatment info & booking modals
├── public/
│   └── assets/
│       ├── ready/               # All production cropped and upscaled assets
│       └── site_images/         # Original icons and clinical photography
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── postcss.config.js
```
