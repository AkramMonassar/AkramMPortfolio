/* ==========================================================================
   JavaScript Interactive Logic - Akram Ahmed Monassar Portfolio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Current year footer update
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 1. Language Toggle System
  const langToggleBtn = document.getElementById("lang-toggle");
  const htmlTag = document.documentElement;

  // SEO Meta and Title translation mappings
  const translations = {
    en: {
      title:
        "Akram Monassar | Senior Field & Technical Operations Specialist & Full-Stack Developer",
      desc: "Professional portfolio of Akram Ahmed Monassar — Senior Field & Technical Operations Specialist, Full-Stack Developer, M&E Researcher, and Certified Trainer with 7+ years across software engineering, IT infrastructure, and humanitarian field operations (UNICEF, IOM, Save the Children, Red Cross).",
      keywords:
        "Akram Monassar, Field & Technical Operations Specialist, M&E Researcher, Full Stack Developer, Software Engineering, IT Infrastructure, ODK, KoBo, SPSS, Ibb Yemen",
    },
    ar: {
      title: "أكرم منصر | أخصائي أول عمليات ميدانية وتقنية ومطور ويب متكامل",
      desc: "الموقع المهني لأكرم أحمد منصر — أخصائي أول عمليات ميدانية وتقنية، مطور ويب متكامل، باحث رقابة وتقييم، ومدرب تقني معتمد بخبرة تزيد عن 7 سنوات في هندسة البرمجيات، البنية التحتية، والعمليات الميدانية الإنسانية (اليونيسف، منظمة الهجرة الدولية، إنقاذ الطفولة، الصليب الأحمر).",
      keywords:
        "أكرم منصر, أخصائي عمليات ميدانية وتقنية, باحث رقابة وتقييم, مطور ويب متكامل, هندسة البرمجيات, البنية التحتية, ODK, KoBo, SPSS, إب اليمن",
    },
  };

  function setLanguage(lang) {
    // Toggle HTML attributes
    htmlTag.setAttribute("lang", lang);
    htmlTag.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // Update browser titles and meta for SEO
    document.title = translations[lang].title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", translations[lang].desc);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords)
      metaKeywords.setAttribute("content", translations[lang].keywords);

    // Save preference in LocalStorage
    localStorage.setItem("portfolio-lang", lang);

    // Update active label inside language button
    const label = langToggleBtn.querySelector(".lang-label");
    if (label) {
      label.textContent = label.getAttribute(`data-${lang}`);
    }
  }

  // Initialize Language
  const savedLang = localStorage.getItem("portfolio-lang") || "en";
  setLanguage(savedLang);

  // Lang toggle click handler
  langToggleBtn.addEventListener("click", () => {
    const currentLang = htmlTag.getAttribute("lang");
    const newLang = currentLang === "en" ? "ar" : "en";
    setLanguage(newLang);
  });

  // 2. Theme Toggle System (Dark Theme is default)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const bodyTag = document.body;

  function setTheme(theme) {
    if (theme === "light") {
      bodyTag.classList.add("light-theme");
    } else {
      bodyTag.classList.remove("light-theme");
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  // Initialize Theme
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  setTheme(savedTheme);

  // Theme toggle click handler
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = bodyTag.classList.contains("light-theme")
      ? "dark"
      : "light";
    setTheme(currentTheme);
  });

  // 3. Mobile Navigation Drawer Controller
  const mobileToggleBtn = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMobileMenu() {
    mobileToggleBtn.classList.toggle("active");
    mobileDrawer.classList.toggle("active");
    // Prevent body scroll when menu is active
    document.body.style.overflow = mobileDrawer.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  function closeMobileMenu() {
    mobileToggleBtn.classList.remove("active");
    mobileDrawer.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  mobileToggleBtn.addEventListener("click", toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking outside of drawer content
  window.addEventListener("click", (e) => {
    if (
      mobileDrawer.classList.contains("active") &&
      !mobileDrawer.contains(e.target) &&
      !mobileToggleBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on screen resize to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileDrawer.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // 4. Navbar Scroll Shadow & Height Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 5. Scroll Reveal IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Reveal only once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element enters viewport
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((element) => element.classList.add("active"));
  }

  // 6. Statistics Counter Animation Trigger
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    statNumbers.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const duration = 2000; // 2 seconds animation
      const stepTime = Math.max(Math.floor(duration / target), 15);
      let current = 0;

      const increment = target > 50 ? Math.ceil(target / 100) : 1;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = current.toLocaleString();
        }
      }, stepTime);
    });
  }

  // Detect when statistics grid is visible in viewport
  const statsSection = document.querySelector(".stats-grid");
  if (statsSection && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
          statsObserver.unobserve(statsSection);
        }
      },
      { threshold: 0.2 },
    );

    statsObserver.observe(statsSection);
  } else {
    // Fallback
    setTimeout(startCounters, 800);
  }

  // 7. Interactive Projects Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active style from other filter buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hide");
          // Add subtle scaling reveal
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          }, 50);
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // 8. Contact Form Validator & Submission
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const feedbackSuccess = formFeedback.querySelector(".feedback-success");
  const feedbackError = formFeedback.querySelector(".feedback-error");

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isFormValid = true;
      const formGroups = contactForm.querySelectorAll(".form-group");

      formGroups.forEach((group) => {
        const input = group.querySelector(".form-control");
        if (!input) return;

        const value = input.value.trim();
        let isInputValid = true;

        if (input.required && value === "") {
          isInputValid = false;
        } else if (
          input.type === "email" &&
          value !== "" &&
          !validateEmail(value)
        ) {
          isInputValid = false;
        }

        if (!isInputValid) {
          group.classList.add("invalid");
          isFormValid = false;
        } else {
          group.classList.remove("invalid");
        }
      });

      if (isFormValid) {
        const submitBtn = document.getElementById("form-submit-btn");
        const originalTextEn = submitBtn.querySelector(".lang-en").textContent;
        const originalTextAr = submitBtn.querySelector(".lang-ar").textContent;
        const submitIcon = submitBtn.querySelector(".send-icon");
        submitBtn.disabled = true;
        submitBtn.querySelector(".lang-en").textContent = "Sending...";
        submitBtn.querySelector(".lang-ar").textContent = "جاري الإرسال...";
        submitIcon.className = "fa-solid fa-spinner fa-spin send-icon";

        const formData = new FormData(contactForm);
        formData.append("access_key", "01c5f79d-d9ee-4ab4-938b-36c8d4886bd0");

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              feedbackError.style.display = "none";
              feedbackSuccess.style.display = "flex";
              contactForm.reset();
              setTimeout(() => {
                feedbackSuccess.style.display = "none";
              }, 5000);
            } else {
              feedbackSuccess.style.display = "none";
              feedbackError.style.display = "flex";
              setTimeout(() => {
                feedbackError.style.display = "none";
              }, 4000);
            }
          })
          .catch(() => {
            feedbackSuccess.style.display = "none";
            feedbackError.style.display = "flex";
            setTimeout(() => {
              feedbackError.style.display = "none";
            }, 4000);
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.querySelector(".lang-en").textContent = originalTextEn;
            submitBtn.querySelector(".lang-ar").textContent = originalTextAr;
            submitIcon.className = "fa-solid fa-paper-plane send-icon";
          });
      } else {
        feedbackSuccess.style.display = "none";
        feedbackError.style.display = "flex";

        setTimeout(() => {
          feedbackError.style.display = "none";
        }, 4000);
      }
    });

    // Realtime invalid check reset on typing
    contactForm.querySelectorAll(".form-control").forEach((input) => {
      input.addEventListener("input", () => {
        const group = input.closest(".form-group");
        if (group.classList.contains("invalid")) {
          group.classList.remove("invalid");
        }
      });
    });
  }

  // 9. Back to Top Button Controller
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 10. Printable CV / Resume Modal logic
  const downloadResumeBtn = document.getElementById("download-resume-btn");
  const resumeModal = document.getElementById("resume-modal");
  const closeResumeBtn = document.getElementById("close-resume-btn");
  const printResumeBtn = document.getElementById("print-resume-btn");
  const resumeSheetEn = document.getElementById("resume-sheet-en");
  const resumeSheetAr = document.getElementById("resume-sheet-ar");

  function syncResumeLanguage() {
    const isArabic = htmlTag.getAttribute("lang") === "ar";
    if (isArabic) {
      resumeSheetAr.style.display = "block";
      resumeSheetEn.style.display = "none";
    } else {
      resumeSheetEn.style.display = "block";
      resumeSheetAr.style.display = "none";
    }
  }

  if (downloadResumeBtn && resumeModal) {
    downloadResumeBtn.addEventListener("click", () => {
      syncResumeLanguage();
      resumeModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    const closeModal = () => {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    closeResumeBtn.addEventListener("click", closeModal);

    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && resumeModal.classList.contains("active"))
        closeModal();
    });

    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // 11. Navigation Links Active State on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if user is scrolled past this section's threshold
      if (window.scrollY >= sectionTop - 120) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
});

// 12. Project Images Slider v2 (Autoplay + Lightbox)
const lightbox = document.getElementById("project-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCounter = document.getElementById("lightbox-counter");
let lbImages = [],
  lbIndex = 0;

function updateLightbox() {
  lightboxImg.src = lbImages[lbIndex];
  lightboxCounter.textContent = lbIndex + 1 + " / " + lbImages.length;
}
function openLightbox(images, index) {
  lbImages = images;
  lbIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}
document.getElementById("lightbox-next").addEventListener("click", (e) => {
  e.stopPropagation();
  lbIndex = (lbIndex + 1) % lbImages.length;
  updateLightbox();
});
document.getElementById("lightbox-prev").addEventListener("click", (e) => {
  e.stopPropagation();
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  updateLightbox();
});
lightbox.addEventListener("click", (e) => {
  if (!e.target.closest(".lightbox-arrow")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") {
    lbIndex = (lbIndex + 1) % lbImages.length;
    updateLightbox();
  }
  if (e.key === "ArrowLeft") {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    updateLightbox();
  }
});

document.querySelectorAll(".project-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  const dotsBox = slider.querySelector(".slider-dots");
  if (slides.length <= 1) {
    slider
      .querySelectorAll(".slider-arrow, .slider-dots")
      .forEach((el) => (el.style.display = "none"));
    const singleImg = slides[0].querySelector("img");
    singleImg.addEventListener("click", () =>
      openLightbox([singleImg.getAttribute("src")], 0),
    );
    return;
  }
  let current = 0;
  const go = (i) => {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  };
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      go(i);
      restartAuto();
    });
    dotsBox.appendChild(dot);
  });
  const dots = dotsBox.querySelectorAll(".slider-dot");
  // تشغيل تلقائي كل 4 ثوانٍ
  let auto = setInterval(() => go(current + 1), 4000);
  const restartAuto = () => {
    clearInterval(auto);
    auto = setInterval(() => go(current + 1), 4000);
  };
  slider.addEventListener("mouseenter", () => clearInterval(auto));
  slider.addEventListener("mouseleave", restartAuto);
  slider.querySelector(".next").addEventListener("click", (e) => {
    e.preventDefault();
    go(current + 1);
    restartAuto();
  });
  slider.querySelector(".prev").addEventListener("click", (e) => {
    e.preventDefault();
    go(current - 1);
    restartAuto();
  });
  // فتح الـ Lightbox عند الضغط على الصورة
  const imgs = Array.from(slides).map((s) =>
    s.querySelector("img").getAttribute("src"),
  );
  slides.forEach((s, i) => {
    s.querySelector("img").addEventListener("click", () =>
      openLightbox(imgs, i),
    );
  });
});
