"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutClinic from "@/components/AboutClinic";
import MeetSpecialist from "@/components/MeetSpecialist";
import DentalTreatments from "@/components/DentalTreatments";
import SmileGallery from "@/components/SmileGallery";
import PanelDoctors from "@/components/PanelDoctors";
import Testimonials from "@/components/Testimonials";
import BookAppointment from "@/components/BookAppointment";
import Footer from "@/components/Footer";
import Modals from "@/components/Modals";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalTreatment, setBookingModalTreatment] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<{
    treatment: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-[#092620] relative selection:bg-mint selection:text-emerald-950">
      {/* Persistent Floating Navigation across entire page */}
      <Navbar
        onOpenTreatmentModal={(title) => setSelectedTreatment(title)}
        onOpenBookingModal={() => {
          setBookingModalTreatment(null);
          setBookingModalOpen(true);
        }}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenVideoModal={() => setVideoOpen(true)}
          onOpenBookingModal={() => {
            setBookingModalTreatment(null);
            setBookingModalOpen(true);
          }}
        />

        {/* 2. About Our Clinic */}
        <AboutClinic />

        {/* 3. About Dr. Lajja Kamdar (Meet Our Specialist) */}
        <MeetSpecialist />

        {/* 4. Dental Treatments Grid */}
        <DentalTreatments onOpenTreatmentModal={(title) => setSelectedTreatment(title)} />

        {/* 5. Smile Gallery (Interactive Draggable Before/After Sliders) */}
        <SmileGallery />

        {/* 6. Panel Of Doctors */}
        <PanelDoctors />

        {/* 7. Patient Testimonials */}
        <Testimonials />

        {/* 8. Book Appointment Reservation Banner */}
        <BookAppointment onSuccess={(data) => setBookingData(data)} />
      </main>

      {/* 9. Comprehensive Clinic Footer */}
      <Footer />

      {/* Global Interactive Modals (Video, Treatment Details, Booking Confirmation) */}
      <Modals
        videoOpen={videoOpen}
        onCloseVideo={() => setVideoOpen(false)}
        selectedTreatment={selectedTreatment}
        onCloseTreatment={() => setSelectedTreatment(null)}
        bookingData={bookingData}
        onCloseBooking={() => setBookingData(null)}
      />

      {/* Booking Form Modal Pop-up */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTreatment={bookingModalTreatment}
        onSuccess={(data) => setBookingData(data)}
      />
    </div>
  );
}
