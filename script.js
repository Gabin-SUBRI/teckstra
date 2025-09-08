document.querySelectorAll(".sidebar-menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let target = this.getAttribute("data-target");

    // Cacher toutes les sections
    document.querySelectorAll(".product-section").forEach((sec) => {
      sec.style.display = "none";
    });

    // Afficher la bonne section
    document.getElementById(target).style.display = "block";
  });
});
