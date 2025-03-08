// main.js

document.addEventListener("DOMContentLoaded", function () {
  // Cache elements for animations
  const fadeIns = document.querySelectorAll(".fade-in");
  const slides = document.querySelectorAll(".slide-in");
  const morphingShape = document.getElementById("morphingShape");

  // Function to update animations and parallax background on scroll
  function updateOnScroll() {
    const windowHeight = window.innerHeight;

    // Fade-in effect
    fadeIns.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });

    // Slide-in effect
    slides.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }
    });

    // Parallax background effect: move background based on scroll
    const scrollAmount = window.scrollY;
    document.body.style.backgroundPosition = `0px ${scrollAmount * 0.5}px`;
  }

  // Throttle the scroll events using requestAnimationFrame
  let isScrolling = false;
  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        updateOnScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  // Run the function once after page load
  updateOnScroll();

  // Morphing SVG Shape Effect
  const morphPaths = [
    "M300,100C380,110,480,190,480,300C480,410,380,490,300,500C220,490,120,410,120,300C120,190,220,110,300,100Z",
    "M320,120C390,130,490,210,490,320C490,430,390,500,320,520C250,500,150,430,150,320C150,210,250,130,320,120Z",
    "M280,80C360,90,460,180,460,290C460,400,360,470,280,480C200,470,100,400,100,290C100,180,200,90,280,80Z"
  ];
  let morphIndex = 0;
  function morphShape() {
    if (morphingShape) {
      const pathEl = morphingShape.querySelector("path");
      if (pathEl) {
        pathEl.setAttribute("d", morphPaths[morphIndex]);
        morphIndex = (morphIndex + 1) % morphPaths.length;
      }
    }
  }
  setInterval(morphShape, 2000);
});
