// ============================================================
// CAMBIA SOLO ESTA LÍNEA cuando cambie el destino de la guía.
// Pega aquí el enlace de tu bio de Instagram (con https://).
// ============================================================
const GUIA_URL = "https://ec68160e.sibforms.com/serve/MUIFALtgEphHvUlLSeTUbkiyDNJRgejXV0HeLU0QfzmNP-aORAJ8T9XHBFlTHlaJ3KZ9Idx57QFL_7Mu7SnRG3B4RfNX3pEsiObRAilSALL2MP-ruc_U72vQK-5fTFJQdkDW1AQUN4H8ml3-4gYJEOg9dMY4UWThB1Hj5RSjYH-JX-yV8fdBXSh7U9j4HCqaGMGhGaFeqpLtEcxP_g==";

// Todos los botones con data-guia usan esa variable.
document.querySelectorAll("[data-guia]").forEach((a) => {
  if (GUIA_URL) {
    a.href = GUIA_URL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  } else {
    // Sin enlace todavía: el botón no hace nada.
    a.addEventListener("click", (e) => e.preventDefault());
  }
});

// ============================================================
// Redes: pega aquí los enlaces (con https://). Instagram ya está.
// Mientras una red esté vacía, su icono se ve pero no lleva a ningún sitio.
// ============================================================
const REDES = {
  instagram: "https://www.instagram.com/compartir.para.sanar/",
  threads: "https://www.threads.com/@compartir.para.sanar",
  facebook: "https://www.facebook.com/profile.php?id=61591102004229",
};

// ============================================================
// Colaboraciones: pega aquí tu email. Se monta al cargar la página,
// así no aparece escrito en el código para los robots de spam.
// ============================================================
const EMAIL_COLABORACIONES = "compartir.para.sanar@outlook.com";

document.querySelectorAll("[data-red]").forEach((a) => {
  const url = REDES[a.dataset.red];
  if (url) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  } else {
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", (e) => e.preventDefault());
  }
});

document.querySelectorAll("[data-email]").forEach((a) => {
  if (EMAIL_COLABORACIONES) {
    a.href = "mailto:" + EMAIL_COLABORACIONES;
    a.textContent = EMAIL_COLABORACIONES; // el botón muestra el email
  } else {
    a.addEventListener("click", (e) => e.preventDefault());
  }
});

// "Saltar al contenido" sin tocar la dirección de la página.
const skip = document.querySelector("[data-skip]");
if (skip) {
  skip.addEventListener("click", (e) => {
    e.preventDefault();
    const main = document.getElementById("contenido");
    if (main) main.focus();
  });
}

// Cabecera: línea fina al bajar y subrayado en la sección que estás leyendo.
const cabecera = document.querySelector(".site-header");
if (cabecera) {
  const marcarScroll = () => cabecera.classList.toggle("is-scrolled", window.scrollY > 8);
  marcarScroll();
  window.addEventListener("scroll", marcarScroll, { passive: true });
}
const enlacesNav = document.querySelectorAll('.nav-links a[href*="#"]');
const secciones = [...enlacesNav]
  .map((a) => document.getElementById(a.getAttribute("href").split("#")[1]))
  .filter(Boolean);
if ("IntersectionObserver" in window && secciones.length) {
  const visor = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      enlacesNav.forEach((a) => {
        const activo = a.getAttribute("href").split("#")[1] === e.target.id;
        if (activo) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach((s) => visor.observe(s));
}

// Enlaces de "escríbeme" dentro del texto: solo ponen la dirección, no cambian el texto.
document.querySelectorAll("[data-mailto]").forEach((a) => {
  if (EMAIL_COLABORACIONES) a.href = "mailto:" + EMAIL_COLABORACIONES;
  else a.addEventListener("click", (e) => e.preventDefault());
});
