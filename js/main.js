/**
 * SmileZone Dental Studio - Interactive Features
 * Handcrafted to replicate and elevate the design mockup experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBeforeAfterSliders();
  initCarousels();
  initAppointmentForms();
  initModals();
  initBackToTop();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const drawerClose = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.mobile-menu-drawer a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE BEFORE / AFTER SLIDERS
   Supports mouse dragging, touch dragging, and slider hover
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.ba-slider-container');

  containers.forEach(container => {
    const beforeLayer = container.querySelector('.ba-before-layer');
    const handle = container.querySelector('.ba-handle');
    if (!beforeLayer || !handle) return;

    let isDown = false;

    function updateSlider(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      const percentage = pos * 100;
      beforeLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse Events
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      updateSlider(e.clientX);
    });

    // Touch Events for Mobile & Tablets
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* ==========================================================================
   3. GALLERY & TESTIMONIALS CAROUSEL CONTROLS
   ========================================================================== */
function initCarousels() {
  // Gallery Carousel Buttons
  const galleryGrid = document.querySelector('.gallery-cards-grid');
  const galleryPrev = document.querySelector('.gallery-prev-btn');
  const galleryNext = document.querySelector('.gallery-next-btn');

  if (galleryGrid && galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
      galleryGrid.scrollBy({ left: -320, behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
      galleryGrid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Testimonials Carousel Buttons
  const testiGrid = document.querySelector('.testimonials-grid');
  const testiPrev = document.querySelector('.testi-prev-btn');
  const testiNext = document.querySelector('.testi-next-btn');

  if (testiGrid && testiPrev && testiNext) {
    testiPrev.addEventListener('click', () => {
      testiGrid.scrollBy({ left: -360, behavior: 'smooth' });
    });
    testiNext.addEventListener('click', () => {
      testiGrid.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. APPOINTMENT FORM SUBMISSION & VALIDATION
   ========================================================================== */
function initAppointmentForms() {
  const forms = document.querySelectorAll('.appointment-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const treatment = form.querySelector('[name="treatment"]')?.value;
      const name = form.querySelector('[name="name"]')?.value;
      const phone = form.querySelector('[name="phone"]')?.value;
      const email = form.querySelector('[name="email"]')?.value;
      const date = form.querySelector('[name="date"]')?.value;
      const time = form.querySelector('[name="time"]')?.value;
      const sendCopy = form.querySelector('[name="send_copy"]')?.checked;

      if (!name || !phone) {
        showToast('Please fill in your name and phone number.', 'error');
        return;
      }

      // Display Confirmation Modal
      const modal = document.getElementById('confirmation-modal');
      const detailsBox = document.getElementById('modal-booking-details');

      if (detailsBox) {
        detailsBox.innerHTML = `
          <div style="background: rgba(0, 229, 153, 0.08); padding: 18px; border-radius: 12px; border: 1px solid rgba(0, 229, 153, 0.25); margin: 16px 0;">
            <p><strong>Patient Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Contact:</strong> ${escapeHtml(phone)} ${email ? `(${escapeHtml(email)})` : ''}</p>
            <p><strong>Treatment:</strong> ${treatment ? escapeHtml(treatment) : 'General Consultation'}</p>
            <p><strong>Date & Time:</strong> ${date || 'Preferred Slot'} at ${time || '10:00 AM'}</p>
            <p style="margin-top: 10px; font-size: 0.85rem; color: #a3c2b9;">
              Dr. Lajja Kamdar's desk will call you to confirm your slot within 30 minutes.
            </p>
          </div>
        `;
      }

      if (modal) {
        modal.classList.add('open');
      } else {
        showToast(`Thank you, ${name}! Your appointment request has been submitted.`, 'success');
      }

      form.reset();
    });
  });

  // Set default min date to today for date pickers
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    input.setAttribute('min', today);
  });
}

/* ==========================================================================
   5. MODALS (Video Player & Treatment Details)
   ========================================================================== */
function initModals() {
  // Video Modal
  const videoBtn = document.querySelector('.btn-video-hero');
  const videoModal = document.getElementById('video-modal');

  if (videoBtn && videoModal) {
    videoBtn.addEventListener('click', () => {
      videoModal.classList.add('open');
    });
  }

  // Treatment Details Modal
  const treatmentLinks = document.querySelectorAll('.treatment-card-link, .open-treatment-modal');
  const treatmentModal = document.getElementById('treatment-modal');
  const modalTitle = document.getElementById('treatment-modal-title');
  const modalDesc = document.getElementById('treatment-modal-body');

  const treatmentDetails = {
    'General Dentistry': {
      title: 'General Dentistry',
      body: 'Comprehensive dental exams, cleanings, root canal therapy, tooth-colored composite fillings, and preventive care. Led by Dr. Lajja Kamdar with 20+ years of clinical excellence, ensuring pain-free, comfortable care with strict sterilization protocols.'
    },
    'Dental Implants': {
      title: 'Dental Implants',
      body: 'Permanent titanium tooth root replacements that look, feel, and function just like natural teeth. We specialize in single tooth implants, implant-supported fixed bridges, and implant-retained full arch dentures.'
    },
    'Cosmetic Dentistry': {
      title: 'Cosmetic Dentistry & Smile Design',
      body: 'Transform your smile with porcelain veneers, in-office laser teeth whitening, aesthetic bonding, invisible aligners, and customized digital smile design tailored to your facial harmony.'
    },
    'Geriatric Dentistry': {
      title: 'Geriatric Dentistry',
      body: 'Specialized and compassionate dental care designed for older adults. Includes flexible lightweight dentures, precision BPS full dentures, dry mouth management, and gentle periodontal care.'
    },
    'Braces & Aligners': {
      title: 'Braces & Clear Aligners',
      body: 'Straighten crooked teeth and correct malocclusions using advanced orthodontic solutions. Choose from clear invisible aligners, low-profile ceramic braces, or traditional metal brackets under specialist orthodontist supervision.'
    },
    'Pediatric Dentistry': {
      title: 'Pediatric Dentistry',
      body: 'Gentle, friendly, and fear-free dental care for infants, children, and teenagers. Preventive treatments include fluoride varnish, pit and fissure sealants, tooth monitoring, and habit breaking appliances.'
    }
  };

  treatmentLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.treatment-card-3d');
      const title = card ? card.querySelector('.treatment-card-title')?.innerText.trim() : 'General Dentistry';

      const data = treatmentDetails[title] || treatmentDetails['General Dentistry'];
      if (modalTitle && modalDesc) {
        modalTitle.innerText = data.title;
        modalDesc.innerHTML = `<p style="line-height: 1.7; color: #b2d6cd; font-size: 0.95rem;">${data.body}</p>`;
      }
      if (treatmentModal) treatmentModal.classList.add('open');
    });
  });

  // Global Modal Close Buttons
  const closeBtns = document.querySelectorAll('.modal-close-btn, .btn-modal-dismiss');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.querySelector('.fab-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   7. SMOOTH SCROLLING FOR ALL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #04241e;
    color: #ffffff;
    border: 1px solid var(--color-primary-mint);
    padding: 14px 24px;
    border-radius: 9999px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    z-index: 2000;
    font-size: 0.9rem;
    font-weight: 600;
    animation: fadeInOut 3.5s forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
