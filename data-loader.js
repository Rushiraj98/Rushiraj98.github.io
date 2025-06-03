document.addEventListener('DOMContentLoaded', () => {

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Personal Info
      document.getElementById("name").textContent = data.personal.name;
      document.getElementById("name-about").textContent = data.personal.name;
      document.getElementById("bio").textContent = data.personal.bio;

      // Typing animation
      var typed = new Typed(".typing", {
        strings: [
          data.personal.title,
          "Generative AI Engineer",
          "LLMOps Specialist",
          "AI Solution Architect",
          "ML Engineer"
        ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });

      // EXPERIENCE SECTION
      const expContainer = document.getElementById("experience-container");
      data.experience.forEach((exp, index) => {
        const iconClass = ["fa-building", "fa-briefcase", "fa-laptop-code", "fa-chart-line"][index % 4];

        const expCard = document.createElement("div");
        expCard.classList.add("exp-card");
        expCard.innerHTML = `
          <div class="exp-header">
            <div class="company-logo"><i class="fas ${iconClass}"></i></div>
            <div class="exp-info">
              <h3>${exp.role}</h3>
              <h4>${exp.company}</h4>
              <span class="duration">${exp.duration} | ${exp.location}</span>
            </div>
          </div>
          <div class="exp-details">
            <ul>${exp.description.map(item => `<li>${item}</li>`).join("")}</ul>
          </div>
        `;
        expContainer.appendChild(expCard);
      });

      // PROJECTS SECTION (Carousel)
      const projContainer = document.getElementById("projects-container");
      data.projects.forEach(proj => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="box">
            <div class="text">${proj.name}</div>
            <p>${proj.description}</p>
          </div>
        `;
        projContainer.appendChild(card);
      });

      setTimeout(() => {
        $('.carousel').owlCarousel({
          margin: 20,
          loop: true,
          autoplay: true,
          autoplayTimeout: 2500,
          autoplayHoverPause: true,
          responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
        });
      }, 100);

      // SKILLS SECTION
      const skillsContainer = document.getElementById("skills-container");

      const skillCategories = [
        { category: "Languages & Frameworks", icon: "fa-code", filter: ["Python", "TensorFlow", "PyTorch", "Flutter", "Streamlit"] },
        { category: "Cloud & DevOps", icon: "fa-cloud", filter: ["Azure", "GCP", "AWS", "Docker", "Kubernetes", "LLMOps", "MLOps"] },
        { category: "AI & ML", icon: "fa-brain", filter: ["NLP", "Computer Vision", "Generative AI", "Large Language Models (LLMs)", "Optimization Algorithms"] },
        { category: "Databases & Tools", icon: "fa-database", filter: ["SQL", "Gramex", "Simulation Models", "PyAudioAnalysis", "ThinkDSP"] }
      ];

      skillCategories.forEach(cat => {
        const skillCard = document.createElement("div");
        skillCard.classList.add("skill-category");
        skillCard.innerHTML = `<h3><i class="fas ${cat.icon}"></i> ${cat.category}</h3>`;
        const skillItems = document.createElement("div");
        skillItems.classList.add("skill-items");

        cat.filter.forEach(skill => {
          if (data.skills.includes(skill)) {
            const span = document.createElement("span");
            span.classList.add("skill-tag");
            span.textContent = skill;
            skillItems.appendChild(span);
          }
        });

        skillCard.appendChild(skillItems);
        skillsContainer.appendChild(skillCard);
      });

      // ACHIEVEMENTS SECTION
      const achContainer = document.getElementById("achievements-container");
      data.achievements.forEach(ach => {
        const achCard = document.createElement("div");
        achCard.classList.add("achievement-card");
        achCard.innerHTML = `
          <div class="achievement-icon"><i class="fas fa-award"></i></div>
          <h3>${ach}</h3>
        `;
        achContainer.appendChild(achCard);
      });

      // CONTACT SECTION
    const contactContainer = document.getElementById("contact-container");

    const contactData = [
    { icon: "fa-user", label: "Name", value: data.personal.name },
    { icon: "fa-envelope", label: "Email", value: `<a href="mailto:${data.personal.email}">${data.personal.email}</a>` },
    { icon: "fa-phone-alt", label: "Phone", value: data.personal.phone },
    { icon: "fa-map-marker-alt", label: "Location", value: data.personal.location },
    { icon: "fa-globe", label: "Website", value: `<a href="${data.personal.website}" target="_blank">${data.personal.website}</a>` },
    ];

    contactData.forEach(item => {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `
        <i class="fas ${item.icon}"></i>
        <div class="info">
            <div class="head">${item.label}</div>
            <div class="sub-title">${item.value}</div>
        </div>
    `;
    contactContainer.appendChild(row);
    });

    // SOCIAL ICONS SECTION
    const socialContainer = document.getElementById("social-container");

    const socialData = [
    { platform: "GitHub", url: data.personal.github, img: "https://img.icons8.com/ios-glyphs/40/ffffff/github.png" },
    { platform: "LinkedIn", url: data.personal.linkedin, img: "https://img.icons8.com/fluency/40/000000/linkedin.png" }
    ];

    socialData.forEach(social => {
    const a = document.createElement("a");
    a.href = social.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<img src="${social.img}" alt="${social.platform} logo"/>`;
    socialContainer.appendChild(a);
    });



      // Animation reveal (optional)
      ScrollReveal().reveal('.exp-card', { delay: 200, distance: '20px', origin: 'bottom', interval: 100 });
    })
    .catch(err => console.error("Error loading data.json:", err));
});
