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
