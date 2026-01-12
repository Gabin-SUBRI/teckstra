// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
  console.log("🪑 Site Teckstra - Version développement avec menu hamburger");

  initHamburgerMenu();
  initMenuNavigation();
  initSmoothScroll();
  initCarousels();
});

/**
 * Gestion du menu hamburger
 */
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");

  // Ouvrir le menu
  hamburgerBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburgerBtn.classList.add("active");
    document.body.style.overflow = "hidden"; // Bloquer le scroll
  });

  // Fermer le menu avec le bouton X
  closeBtn.addEventListener("click", closeMenu);

  // Fermer le menu en cliquant sur l'overlay
  overlay.addEventListener("click", closeMenu);

  // Fonction pour fermer le menu
  function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    document.body.style.overflow = ""; // Réactiver le scroll
  }

  // Fermer le menu avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeMenu();
    }
  });
}

/**
 * Gestion de la navigation du menu
 */
function initMenuNavigation() {
  const menuLinks = document.querySelectorAll(".menu-link");
  const categorySections = document.querySelectorAll(".category-section");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const hamburgerBtn = document.getElementById("hamburgerBtn");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Si c'est le lien contact, laisser le comportement par défaut
      if (this.classList.contains("contact-link")) {
        // Fermer le menu
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = "";
        return;
      }

      e.preventDefault();

      // Récupérer la catégorie sélectionnée
      const category = this.getAttribute("data-category");

      // Retirer la classe active de tous les liens
      menuLinks.forEach((l) => l.classList.remove("active"));

      // Ajouter la classe active au lien cliqué
      this.classList.add("active");

      // Masquer toutes les sections
      categorySections.forEach((section) => {
        section.classList.remove("active");
      });

      // Afficher la section correspondante
      const targetSection = document.getElementById(category);
      if (targetSection) {
        targetSection.classList.add("active");

        // Fermer le menu
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = "";

        // Scroll vers le haut
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Scroll smooth pour les liens d'ancrage
 */
function initSmoothScroll() {
  const contactBtn = document.querySelector(".contact-btn");

  if (contactBtn) {
    contactBtn.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }
}

/**
 * Initialiser les carrousels d'images
 */
function initCarousels() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const imageContainer = card.querySelector(".product-image");
    if (!imageContainer) return;

    const images = imageContainer.querySelectorAll("img");
    if (images.length <= 1) return; // Pas de carrousel si une seule image

    let currentIndex = 0;

    // Activer la première image
    images[0].classList.add("active");

    // Créer les boutons précédent/suivant
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-btn prev";
    prevBtn.innerHTML = "&#10094;";
    prevBtn.setAttribute("aria-label", "Image précédente");

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-btn next";
    nextBtn.innerHTML = "&#10095;";
    nextBtn.setAttribute("aria-label", "Image suivante");

    // Créer les indicateurs (points)
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";

    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Image ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    imageContainer.appendChild(prevBtn);
    imageContainer.appendChild(nextBtn);
    imageContainer.appendChild(dotsContainer);

    function goToSlide(index) {
      images[currentIndex].classList.remove("active");
      dotsContainer.children[currentIndex].classList.remove("active");

      currentIndex = index;

      images[currentIndex].classList.add("active");
      dotsContainer.children[currentIndex].classList.add("active");
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % images.length);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + images.length) % images.length);
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  });
}

/**
 * Message console pour le mode développement
 */
console.log(
  "%c👨‍💻 Mode Développement",
  "color: #a67246; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c📋 Menu avec " +
    document.querySelectorAll(".menu-link").length +
    " catégories",
  "color: #515250;"
);
