// PORTFOLIO ENHANCEMENTS - Additional Features
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initEasterEggs();
  initTestimonialSlider();
  initPageLoader();
  initEnhancedInteractions();
  initAnalytics();
});

// ============================================
// Custom Cursor Effect
// ============================================
function initCustomCursor() {
  // Skip on mobile
  if (window.innerWidth <= 768) return;

  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');

  cursor.className = 'custom-cursor';
  cursorDot.className = 'custom-cursor-dot';

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dotX = mouseX;
    dotY = mouseY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows with delay
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Dot follows instantly
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .achievement-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Click effect
  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

// ============================================
// Easter Eggs
// ============================================
function initEasterEggs() {
  // Konami Code Easter Egg
  let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateKonamiEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Logo click counter
  let logoClicks = 0;
  const logo = document.querySelector('.logo a');
  if (logo) {
    logo.addEventListener('click', (e) => {
      logoClicks++;
      if (logoClicks === 5) {
        e.preventDefault();
        showSecretMessage();
        logoClicks = 0;
      }
    });
  }

  // Console Art
  console.log('%c' + `
    ██████╗ ██╗   ██╗███████╗██╗  ██╗██╗██████╗  █████╗      ██╗
    ██╔══██╗██║   ██║██╔════╝██║  ██║██║██╔══██╗██╔══██╗     ██║
    ██████╔╝██║   ██║███████╗███████║██║██████╔╝███████║     ██║
    ██╔══██╗██║   ██║╚════██║██╔══██║██║██╔══██╗██╔══██║██   ██║
    ██║  ██║╚██████╔╝███████║██║  ██║██║██║  ██║██║  ██║╚█████╔╝
    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝

    👋 Hey there, curious developer!

    I see you're checking out the code. Nice! 🔍

    Want to see something cool? Try the Konami Code:
    ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A

    Or click my logo 5 times 😉

    Let's connect: rushirajrajeshchavan@gmail.com
  `, 'color: #10b981; font-family: monospace; font-weight: bold;');
}

function activateKonamiEasterEgg() {
  // Create confetti effect
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        z-index: 10000;
        pointer-events: none;
        animation: fall ${2 + Math.random() * 2}s linear forwards;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }

  // Add CSS animation
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Show message
  alert('🎉 You found the Konami Code Easter Egg! 🎮\n\nYou\'re officially awesome! 🚀\n\n- Rushiraj');
}

function showSecretMessage() {
  const messages = [
    '🎯 You found the secret! Fun fact: I trained my first ML model on a laptop with 4GB RAM!',
    '🚀 Easter Egg Unlocked! I once debugged code for 6 hours... the bug was a missing semicolon.',
    '💡 Secret discovered! My favorite programming language? Python. My second favorite? Also Python.',
    '🎨 Hidden message found! I learned to code by building a chatbot that argued with me.',
    '⚡ Achievement unlocked! Coffee consumed while coding this portfolio: 47 cups ☕'
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  alert(message);
}

// ============================================
// Testimonials Slider
// ============================================
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;

  if (testimonials.length === 0) return;

  function showTestimonial(index) {
    testimonials.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
  });

  // Auto-rotate
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);

  // Show first testimonial
  showTestimonial(0);
}

// ============================================
// Page Loader
// ============================================
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 500);
  });
}

// ============================================
// Enhanced Interactions
// ============================================
function initEnhancedInteractions() {
  // Add ripple effect to buttons
  document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS for ripple animation
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          width: 200px;
          height: 200px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Parallax effect on cards
  if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
}

// ============================================
// Analytics Tracking
// ============================================
function initAnalytics() {
  // Google Analytics 4 (Replace with your Measurement ID)
  // Uncomment and add your GA4 Measurement ID
  /*
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // Replace with your ID
  */

  // Track custom events
  const trackEvent = (category, action, label) => {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    // If GA is enabled:
    // gtag('event', action, { 'event_category': category, 'event_label': label });
  };

  // Track CTA clicks
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('CTA', 'click', btn.textContent.trim());
    });
  });

  // Track project views
  document.querySelectorAll('.project-card').forEach((card, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('Project', 'view', `Project ${index + 1}`);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(card);
  });

  // Track resume downloads
  document.querySelectorAll('[href*="resume"], [href*="cv"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('Resume', 'download', 'CV/Resume');
    });
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const roundedScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments

    if (roundedScroll > maxScroll) {
      maxScroll = roundedScroll;
      trackEvent('Engagement', 'scroll', `${roundedScroll}%`);
    }
  });

  // Track time on page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    trackEvent('Engagement', 'time_on_page', `${timeSpent}s`);
  });
}

// ============================================
// Testimonials Data (Add this to data.js later)
// ============================================
window.testimonialsData = [
  {
    quote: "Rushiraj's expertise in LLMs and GenAI is exceptional. He delivered a complex document processing system that exceeded our expectations, reducing processing time by 30%.",
    author: "Senior Manager",
    role: "National Health Authority",
    company: "Government of India",
    avatar: "https://ui-avatars.com/api/?name=NHA&size=60&background=10b981&color=fff",
    stars: 5
  },
  {
    quote: "Outstanding ML engineer! Rushiraj built our wood pattern regeneration system using Stable Diffusion, cutting design time by 40%. His technical depth and problem-solving skills are remarkable.",
    author: "Project Lead",
    role: "Design Automation",
    company: "Enterprise Client",
    avatar: "https://ui-avatars.com/api/?name=PL&size=60&background=3b82f6&color=fff",
    stars: 5
  },
  {
    quote: "Rushiraj is a talented data scientist with deep knowledge of MLOps and cloud architectures. His work on our supply chain optimization saved 15% in logistics costs.",
    author: "Technical Manager",
    role: "Supply Chain Analytics",
    company: "Accenture Client",
    avatar: "https://ui-avatars.com/api/?name=TM&size=60&background=8b5cf6&color=fff",
    stars: 5
  }
];

// Performance tip logging
console.log('%c⚡ Performance Tips Enabled', 'color: #10b981; font-weight: bold;');
console.log('📊 Analytics tracking initialized (demo mode)');
console.log('🎨 Custom cursor enabled (desktop only)');
console.log('🎮 Easter eggs loaded - try finding them!');
