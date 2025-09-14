// Animation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // Animation d'entrée retardée pour les éléments
  setTimeout(() => {
    const container = document.querySelector(".construction-container");
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 100);

  // Animation des feuilles flottantes
  createFloatingLeaves();

  // Animation de la barre de progression
  animateProgressBar();

  // Effet de typing sur le message principal
  typewriterEffect();
});

// Création de feuilles flottantes supplémentaires
function createFloatingLeaves() {
  const floatingElements = document.querySelector(".floating-elements");

  // Ajouter plus de feuilles de manière dynamique
  for (let i = 0; i < 6; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.animationDelay = Math.random() * 6 + "s";
    leaf.style.animationDuration = Math.random() * 4 + 4 + "s";
    floatingElements.appendChild(leaf);
  }
}

// Animation de la barre de progression avec pourcentage
function animateProgressBar() {
  const progressFill = document.querySelector(".progress-fill");
  let width = 0;
  const targetWidth = 75; // 75% de progression

  const progressInterval = setInterval(() => {
    if (width >= targetWidth) {
      clearInterval(progressInterval);
    } else {
      width += 1;
      progressFill.style.width = width + "%";
    }
  }, 50);
}

// Effet de machine à écrire sur le titre
function typewriterEffect() {
  const mainMessage = document.querySelector(".main-message");
  const text = "Site en construction";
  mainMessage.textContent = "";

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      mainMessage.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);
}

// Effet de parallaxe léger sur les feuilles au mouvement de la souris
document.addEventListener("mousemove", function (e) {
  const leaves = document.querySelectorAll(".leaf");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  leaves.forEach((leaf, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;

    leaf.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Animation au clic sur les liens sociaux
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Créer un effet de ondulation
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(166, 114, 70, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.marginLeft = "-50px";
    ripple.style.marginTop = "-50px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Animation CSS pour l'effet ripple
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .social-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Messages de console pour le développement
console.log("🔨 Site Teckstra en construction");
console.log("🌳 Patience, nous préparons quelque chose de beau !");

// Fonction pour mettre à jour le statut de construction
function updateConstructionStatus() {
  const statusMessages = [
    "Assemblage des meubles virtuels...",
    "Application de la finition teck...",
    "Test de résistance aux intempéries...",
    "Mise en place du showroom numérique...",
    "Finalisation de l'expérience utilisateur...",
  ];

  let currentMessage = 0;
  const messageElement = document.querySelector(".sub-message");

  setInterval(() => {
    messageElement.style.opacity = "0";

    setTimeout(() => {
      messageElement.textContent = statusMessages[currentMessage];
      messageElement.style.opacity = "0.8";
      currentMessage = (currentMessage + 1) % statusMessages.length;
    }, 500);
  }, 4000);
}

// Lancer l'animation des messages après 3 secondes
setTimeout(updateConstructionStatus, 3000);
