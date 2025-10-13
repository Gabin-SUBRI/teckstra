document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const container = document.querySelector(".construction-container");
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 100);

  createFloatingLeaves();
  animateProgressBar();
  typewriterEffect();
});

function createFloatingLeaves() {
  const floatingElements = document.querySelector(".floating-elements");

  for (let i = 0; i < 6; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.animationDelay = Math.random() * 6 + "s";
    leaf.style.animationDuration = Math.random() * 4 + 4 + "s";
    leaf.style.top = Math.random() * 100 + "%";
    floatingElements.appendChild(leaf);
  }
}

function animateProgressBar() {
  const progressFill = document.querySelector(".progress-fill");
  let width = 0;
  const targetWidth = 75;

  const progressInterval = setInterval(() => {
    if (width >= targetWidth) {
      clearInterval(progressInterval);
    } else {
      width += 1;
      progressFill.style.width = width + "%";
    }
  }, 50);
}

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

document.addEventListener("mousemove", function (e) {
  const leaves = document.querySelectorAll(".leaf");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  leaves.forEach((leaf, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 20;
    const y = (mouseY - 0.5) * speed * 20;

    leaf.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
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
    ripple.style.pointerEvents = "none";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

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

// Effet de scroll
window.addEventListener("scroll", function () {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollHeight = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;

  // Masquer l'indicateur si on est près du bas
  if (scrollHeight > documentHeight - 100) {
    scrollIndicator.style.display = "none";
  } else {
    scrollIndicator.style.display = "block";
  }

  // Parallaxe du fond
  const scrolled = window.scrollY;
  const floatingElements = document.querySelector(".floating-elements");
  floatingElements.style.transform = `translateY(${scrolled * 0.5}px)`;
});

setTimeout(updateConstructionStatus, 3000);

console.log("🔨 Site Teckstra en construction");
console.log("🌳 Patience, nous préparons quelque chose de beau !");
