// Modern Portfolio Dashboard - PERFORMANCE OPTIMIZED
// =====================================================

// Performance monitoring
const perfMarks = {};
const mark = (name) => perfMarks[name] = performance.now();
const measure = (name) => perfMarks[name] ? Math.round(performance.now() - perfMarks[name]) : 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  mark('init');
  initializeApp();
  console.log(`⚡ Portfolio loaded in ${measure('init')}ms`);
});

// Initialize All Features
function initializeApp() {
  // Critical path - load immediately
  initNavigation();
  initThemeToggle();
  initMobileMenu();

  // Defer non-critical features
  requestIdleCallback(() => {
    initScrollProgress();
    initTypingAnimation();
    initCounterAnimations();
    loadExperienceData();
    loadProjectsData();
    loadSkillsData();
    loadAchievementsData();
    initProjectFilters();
    initScrollAnimations();
  });
}

// RequestIdleCallback polyfill for older browsers
if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => setTimeout(cb, 1);
}

// ============================================
// Particle.js Background (Lazy)
// ============================================
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  // Reduce particles on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 40 : 80;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: particleCount,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#10b981'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#10b981',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: !isMobile, // Disable hover on mobile
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// ============================================
// Navigation (Optimized with RAF)
// ============================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  let ticking = false;
  let lastScrollY = 0;

  // Optimized scroll handler with RAF
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar scroll effect
        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Active link highlighting (throttled)
        if (Math.abs(scrollY - lastScrollY) > 100) {
          updateActiveLink();
          lastScrollY = scrollY;
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  // Update active link
  const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  // Use passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Smooth scroll with better performance
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, { passive: false });
  });
}

// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Re-initialize charts if loaded
    if (typeof initSkillsCharts === 'function' && window.Chart) {
      initSkillsCharts();
    }
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ============================================
// Scroll Progress Bar (Optimized with RAF)
// ============================================
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  let ticking = false;

  const updateProgress = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
}

// ============================================
// Typing Animation (Optimized)
// ============================================
function initTypingAnimation() {
  const titles = portfolioData.personal.title;
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ============================================
// Counter Animations (Optimized with RAF)
// ============================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    animated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(target * easeOutQuad);

        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Use Intersection Observer for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }
}

// ============================================
// Load Data Functions (Optimized with DocumentFragment)
// ============================================
function loadExperienceData() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  div.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item fade-in-up">
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <p class="timeline-company">${exp.company}</p>
          </div>
          <p class="timeline-duration">${exp.duration}</p>
        </div>
        <ul class="timeline-description">
          ${exp.description.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  while (div.firstChild) {
    fragment.appendChild(div.firstChild);
  }

  timeline.appendChild(fragment);
}

function loadProjectsData() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  div.innerHTML = portfolioData.projects.map(project => `
    <div class="project-card fade-in-up" data-category="${project.category.join(' ')}">
      <div class="project-header">
        <i class="fas ${project.icon} project-icon"></i>
      </div>
      <h3 class="project-title">${project.name}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `).join('');

  while (div.firstChild) {
    fragment.appendChild(div.firstChild);
  }

  projectsGrid.appendChild(fragment);
}

function loadSkillsData() {
  const skillsCategories = document.getElementById('skillsCategories');
  if (!skillsCategories) return;

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  div.innerHTML = Object.entries(portfolioData.skills).map(([category, data]) => `
    <div class="skill-category fade-in-up">
      <h3 class="skill-category-title">
        <i class="fas ${data.icon}"></i>
        ${category}
      </h3>
      <div class="skill-tags">
        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');

  while (div.firstChild) {
    fragment.appendChild(div.firstChild);
  }

  skillsCategories.appendChild(fragment);
}

function loadAchievementsData() {
  const achievementsGrid = document.getElementById('achievementsGrid');
  if (!achievementsGrid) return;

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  div.innerHTML = portfolioData.achievements.map(achievement => `
    <div class="achievement-card fade-in-up">
      <div class="achievement-icon">
        <i class="fas ${achievement.icon}"></i>
      </div>
      <h3 class="achievement-title">${achievement.title}</h3>
      <p class="achievement-description">${achievement.description}</p>
    </div>
  `).join('');

  while (div.firstChild) {
    fragment.appendChild(div.firstChild);
  }

  achievementsGrid.appendChild(fragment);
}

// ============================================
// Skills Charts (Lazy loaded) - FIXED VERSION
// ============================================
function initSkillsCharts() {
  // Wait for Chart.js to be fully loaded
  if (typeof Chart === 'undefined') {
    console.log('⏳ Waiting for Chart.js...');
    setTimeout(initSkillsCharts, 100);
    return;
  }

  console.log('✅ Chart.js loaded, initializing charts...');

  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const isDark = theme === 'dark';

  // Better color scheme with improved visibility
  const colors = {
    text: isDark ? '#f3f4f6' : '#1f2937',
    textSecondary: isDark ? '#d1d5db' : '#4b5563',
    grid: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
    primary: '#10b981',
    primaryTransparent: 'rgba(16, 185, 129, 0.25)'
  };

  // Radar Chart Configuration
  const radarCtx = document.getElementById('skillsRadarChart');
  if (radarCtx) {
    // Destroy existing chart
    if (window.radarChart) {
      window.radarChart.destroy();
    }

    // Force canvas size
    radarCtx.style.maxWidth = '500px';
    radarCtx.style.maxHeight = '500px';

    try {
      window.radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: [
            'LLMs & GenAI',
            'MLOps & Cloud',
            'Deep Learning',
            'NLP & CV',
            'Data Engineering',
            'Python & Frameworks'
          ],
          datasets: [{
            label: 'My Skills',
            data: [95, 88, 85, 90, 78, 92],
            fill: true,
            backgroundColor: colors.primaryTransparent,
            borderColor: colors.primary,
            borderWidth: 4,
            pointBackgroundColor: colors.primary,
            pointBorderColor: '#fff',
            pointBorderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 9,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors.primary,
            pointHoverBorderWidth: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: 20
          },
          animation: {
            duration: 1200,
            easing: 'easeOutQuart'
          },
          scales: {
            r: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 25,
                display: true,
                color: colors.textSecondary,
                backdropColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                font: {
                  size: 12,
                  weight: '600'
                },
                showLabelBackdrop: true,
                backdropPadding: 3
              },
              grid: {
                color: colors.grid,
                lineWidth: 2
              },
              angleLines: {
                color: colors.grid,
                lineWidth: 2
              },
              pointLabels: {
                color: colors.text,
                font: {
                  size: 14,
                  weight: '700',
                  family: "'Inter', sans-serif"
                },
                padding: 20
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: colors.text,
                font: {
                  size: 13,
                  weight: '600'
                },
                padding: 15,
                usePointStyle: true
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: colors.text,
              bodyColor: colors.text,
              borderColor: colors.primary,
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.r + '%';
                }
              }
            }
          }
        }
      });

      console.log('✅ Radar chart initialized');
    } catch (error) {
      console.error('❌ Radar chart error:', error);
    }
  }

  // Doughnut Chart Configuration
  const doughnutCtx = document.getElementById('skillsDoughnutChart');
  if (doughnutCtx) {
    // Destroy existing chart
    if (window.doughnutChart) {
      window.doughnutChart.destroy();
    }

    // Force canvas size
    doughnutCtx.style.maxWidth = '500px';
    doughnutCtx.style.maxHeight = '500px';

    try {
      window.doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Python & ML',
            'LLMs & GenAI',
            'AWS & Cloud',
            'MLOps & DevOps',
            'Data Engineering'
          ],
          datasets: [{
            data: [30, 25, 25, 12, 8],
            backgroundColor: [
              'rgba(59, 130, 246, 0.85)',   // Blue
              'rgba(16, 185, 129, 0.85)',   // Green
              'rgba(245, 158, 11, 0.85)',   // Orange
              'rgba(139, 92, 246, 0.85)',   // Purple
              'rgba(236, 72, 153, 0.85)'    // Pink
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(139, 92, 246)',
              'rgb(236, 72, 153)'
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: 10
          },
          animation: {
            duration: 1200,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: colors.text,
                padding: 15,
                font: {
                  size: 12,
                  weight: '500'
                },
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: colors.text,
              bodyColor: colors.text,
              borderColor: colors.primary,
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return label + ': ' + value + '%';
                }
              }
            }
          },
          cutout: '65%'
        }
      });

      console.log('✅ Doughnut chart initialized');
    } catch (error) {
      console.error('❌ Doughnut chart error:', error);
    }
  }
}

// ============================================
// Project Filters (Optimized)
// ============================================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Use RAF for smooth filtering
      requestAnimationFrame(() => {
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || (categories && categories.includes(filter));

          card.style.display = shouldShow ? 'block' : 'none';
          if (shouldShow) {
            card.classList.add('fade-in-up');
          }
        });
      });
    });
  });
}

// ============================================
// Scroll Animations (Optimized IO)
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Batch style changes
  const elements = document.querySelectorAll('.fade-in-up');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// Mobile Menu (Event delegation)
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Event delegation for nav links
  navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ============================================
// Performance Monitoring
// ============================================
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('🎨 LCP:', Math.round(entry.startTime), 'ms');
        }
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Silently fail if not supported
  }
}

// Console welcome message
console.log(`
%c╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║       Welcome to Rushiraj Chavan's Portfolio! 🚀         ║
║                                                           ║
║       AI Decision Scientist | ML Engineer                ║
║       Specializing in LLMs, GenAI & MLOps                ║
║                                                           ║
║       ⚡ Performance Optimized for Speed                 ║
║       Built with ❤️ using HTML, CSS & JavaScript        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`, 'color: #10b981; font-weight: bold; font-size: 12px;');
