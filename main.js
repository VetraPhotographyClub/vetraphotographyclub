// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();  // prevent default anchor jump
    const targetID = this.getAttribute('href');  // e.g. "#about" or "#contact"
    const targetSection = document.querySelector(targetID);
    if (targetSection) {
      // Scroll to the section smoothly
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const bg = document.querySelector('.distortion-bg');
let distortionIntensity = 0.98;   // scale factor for concave distortion (0.98 = slight inward warp)
let blurIntensity = 2;            // blur in pixels when distortion is active

// Throttle updates with requestAnimationFrame for smoother performance
let rafPending = false;
document.addEventListener('mousemove', (e) => {
  // Save cursor position
  const x = e.clientX;
  const y = e.clientY;
  // If an animation frame is already scheduled, ignore this event (to throttle)
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      applyDistortion(x, y);
    });
  }
});

function applyDistortion(cursorX, cursorY) {
  // Calculate cursor position as percentages of viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const originX = (cursorX / viewportWidth) * 100;
  const originY = (cursorY / viewportHeight) * 100;
  
  // Set transform origin to cursor position
  bg.style.transformOrigin = `${originX}% ${originY}%`;
  // Apply scale for concave effect
  bg.style.transform = `scale(${distortionIntensity})`;
  // Apply blur filter (optional)
  bg.style.filter = `blur(${blurIntensity}px)`;
  // If using class toggle for blur:
  // bg.classList.add('distort-active');
}

document.addEventListener('mouseleave', () => {
  // Remove distortion (scale back to normal)
  bg.style.transform = 'scale(1)';
  bg.style.transformOrigin = '50% 50%'; // reset origin to center (optional)
  bg.style.filter = 'blur(0px)';
  // If using class for blur:
  // bg.classList.remove('distort-active');
});

// For mobile touch interaction
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (!touch) return;
  const x = touch.clientX;
  const y = touch.clientY;
  // Throttle with RAF, similar to mouse
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      applyDistortion(x, y);
    });
  }
}, { passive: true });

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if (touch) {
    applyDistortion(touch.clientX, touch.clientY);
  }
}, { passive: true });

document.addEventListener('touchend', () => {
  // When touch stops, reset the background
  bg.style.transform = 'scale(1)';
  bg.style.transformOrigin = '50% 50%';
  bg.style.filter = 'blur(0px)';
  // bg.classList.remove('distort-active');
}, { passive: true });

// Highlight active menu item on scroll (future feature)
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  // Determine which section is in viewport and add 'active' class to the corresponding nav link
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.pageYOffset;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    
    // If this section is near top of viewport, mark its nav link as active
    if (
      scrollY >= sectionTop - 60 &&   // 60px offset for nav height (approx)
      scrollY < sectionTop + sectionHeight - 60
    ) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
});
