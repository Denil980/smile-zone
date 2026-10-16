import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  serviceId: "service_lilid3r",
  templateId: "template_y0lo2js",
  publicKey: "aYbi--YQnntMXH3hc",
};

export interface BookingEmailData {
  treatment: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  sendCopy?: boolean;
}

// Initialize EmailJS in browser environment
if (typeof window !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey,
  });
}

/**
 * Sends booking appointment details to the clinic via EmailJS.
 * Includes comprehensive variable mappings so any template variable names in EmailJS template work seamlessly.
 */
export async function sendBookingEmail(data: BookingEmailData): Promise<{ success: boolean; status?: number; text?: string; error?: any }> {
  try {
    const templateParams: Record<string, any> = {
      // Patient Name aliases
      name: data.name,
      from_name: data.name,
      user_name: data.name,
      patient_name: data.name,

      // Phone aliases
      phone: data.phone,
      user_phone: data.phone,
      phone_number: data.phone,
      contact_number: data.phone,

      // Clinic recipient email (ensures EmailJS routes directly to iamdenildaby@gmail.com)
      to_email: "iamdenildaby@gmail.com",
      recipient_email: "iamdenildaby@gmail.com",
      receiver_email: "iamdenildaby@gmail.com",
      clinic_email: "iamdenildaby@gmail.com",
      admin_email: "iamdenildaby@gmail.com",
      to: "iamdenildaby@gmail.com",
      to_name: "SmileZone Dental Studio",

      // Patient email & reply-to aliases
      patient_email: data.email?.trim() || "Not provided",
      email: data.email?.trim() || "iamdenildaby@gmail.com",
      from_email: data.email?.trim() || "iamdenildaby@gmail.com",
      user_email: data.email?.trim() || "Not provided",
      reply_to: data.email?.trim() || "iamdenildaby@gmail.com",

      // Treatment aliases
      treatment: data.treatment,
      service: data.treatment,
      select_treatment: data.treatment,
      treatment_name: data.treatment,

      // Date aliases
      date: data.date,
      appointment_date: data.date,
      preferred_date: data.date,

      // Time slot aliases
      time: data.time,
      time_slot: data.time,
      preferred_time: data.time,
      slot: data.time,

      // Confirmation copy
      send_copy: data.sendCopy ? "Yes" : "No",
      sms_whatsapp_copy: data.sendCopy ? "Yes" : "No",

      // Comprehensive message summaries
      message: `New Dental Appointment Request Details:\n\n• Patient Name: ${data.name}\n• Phone Number: ${data.phone}\n• Email: ${data.email?.trim() || "Not provided"}\n• Treatment: ${data.treatment}\n• Preferred Date: ${data.date}\n• Preferred Slot: ${data.time}\n• SMS / WhatsApp Confirmation Requested: ${data.sendCopy ? "Yes" : "No"}`,
      details: `Patient: ${data.name} | Phone: ${data.phone} | Treatment: ${data.treatment} | Date: ${data.date} | Slot: ${data.time}`,
    };

    console.log("[EmailJS] Sending appointment email payload with templateParams:", templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log("[EmailJS] Send success response:", response.status, response.text);
    return { success: response.status === 200, status: response.status, text: response.text };
  } catch (error: any) {
    console.error("[EmailJS] Send failure:", error);
    return { success: false, error: error?.text || error?.message || error };
  }
}
