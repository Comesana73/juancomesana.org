// Open external links and PDFs in a new tab.
document.querySelectorAll(".site-main a[href]").forEach((link) => {
  var external = link.hostname && link.hostname !== location.hostname;
  var isPdf = /\.pdf$/i.test(link.pathname);
  if ((external || isPdf) && !link.closest(".photo-grid")) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// Photo-grid lightbox.
(function () {
  var grids = document.querySelectorAll(".photo-grid");
  if (!grids.length) return;

  var lightbox = document.getElementById("lightbox");
  var imageEl = document.getElementById("lightbox-image");
  var counterEl = document.getElementById("lightbox-counter");
  var closeBtn = document.getElementById("lightbox-close");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");
  var photos = [];
  var current = 0;

  grids.forEach(function (grid) {
    grid.querySelectorAll("a").forEach(function (link) {
      var index = photos.length;
      photos.push({
        href: link.getAttribute("href"),
        alt: link.querySelector("img") ? link.querySelector("img").alt : ""
      });
      link.addEventListener("click", function (event) {
        event.preventDefault();
        open(index);
      });
    });
  });

  function open(index) {
    current = index;
    show();
    lightbox.hidden = false;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    lightbox.hidden = true;
    document.removeEventListener("keydown", onKeydown);
  }

  function show() {
    var photo = photos[current];
    imageEl.src = photo.href;
    imageEl.alt = photo.alt;
    counterEl.textContent = (current + 1) + " / " + photos.length;
  }

  function prev() {
    current = (current - 1 + photos.length) % photos.length;
    show();
  }

  function next() {
    current = (current + 1) % photos.length;
    show();
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  }

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) close();
  });
})();

// Contact page: build the mailto link at runtime so the address isn't in the HTML.
(function () {
  const link = document.querySelector(".contact-email");
  if (!link) return;
  const email = `${link.dataset.user}@${link.dataset.domain}`;
  link.href = `mailto:${email}`;
  link.textContent = "Email Juan";
})();
