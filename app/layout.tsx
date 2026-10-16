import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "SmileZone Dental Studio | Best Dentist in Tilak Nagar, Chembur",
  description:
    "SmileZone Dental Studio is a Multispeciality Dental Clinic in Tilak Nagar, Chembur led by Dr. Lajja Kamdar who has 20+ years of dental excellence.",
  icons: {
    icon: "/assets/ready/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable} font-sans`}>
      <body className="antialiased selection:bg-mint selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}
