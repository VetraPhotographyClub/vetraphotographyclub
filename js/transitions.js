/**
 * Vetra Photography Club
 * Time Machine Transitions
 */

// Initialize once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initParallaxEffects();
  init3DCards();
});

// Initialize page transitions
function initPageTransitions() {
  // Add transition container to the document
  const transitionContainer = document.createElement('div');
  transitionContainer.className = 'tm-transition-container';
  
  // Create layers for the time machine effect
  for (let i = 0; i < 5; i++) {
    const layer = document.createElement('div');
    layer.className = 'tm-layer';
    transitionContainer.appendChild(layer);
  }
  
  document.body.appendChild(transitionContainer);
  
  // Add content container for page transitions
  const content = document.querySelector('main');
  if (content) {
    content.classList.add('tm-content');
    content.classList.add('tm-page-enter');
  }
  
  // Handle regular links for page transitions
  document.querySelectorAll('a:not(.menu-link):not([href^="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip external links or special links
      if (
        link.target === '_blank' || 
        link.href.startsWith('tel:') || 
        link.href.startsWith('mailto:') ||
        link.getAttribute('data-no-transition') === 'true'
      ) {
        return;
      }
      
      e.preventDefault();
      const targetPage = link.getAttribute('href');
      navigateToPage(targetPage);
    });
  });
  
  // Handle back button for transitions
  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    
    // Initialize transition
    transitionContainer.classList.add('tm-transition-active');
    document.body.classList.add('tm-transition-active');
    
    // Let the animation play a bit before actually going back
    setTimeout(() => {
      history.back();
    }, 500);
  });
}

// Add parallax effects to elements
function initParallaxEffects() {
  const parallaxItems = document.querySelectorAll('.tm-parallax-item');
  const parallaxContainers = document.querySelectorAll('.tm-parallax-container');
  
  if (parallaxItems.length === 0 && parallaxContainers.length === 0) return;
  
  // For container-based parallax (mouse movement relative to container)
  parallaxContainers.forEach(container => {
    const items = container.querySelectorAll('.tm-parallax-item');
    
    container.addEventListener('mousemove', (e) => {
      const containerRect = container.getBoundingClientRect();
      
      // Calculate mouse position relative to container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      // Calculate center offsets
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      // Calculate offset from center in percentage (-1 to 1)
      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;
      
      // Apply transforms to items based on their data-depth attribute
      items.forEach(item => {
        const depth = parseFloat(item.getAttribute('data-depth') || 0.1);
        const moveX = offsetX * depth * 30;
        const moveY = offsetY * depth * 30;
        const rotateY = offsetX * depth * 10;
        const rotateX = -offsetY * depth * 10;
        
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    // Reset transforms when mouse leaves
    container.addEventListener('mouseleave', () => {
      items.forEach(item => {
        item.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
      });
    });
  });
  
  // For global parallax (mouse movement relative to document)
  if (parallaxItems.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      parallaxItems.forEach(item => {
        if (item.closest('.tm-parallax-container')) return;
        
        const depth = parseFloat(item.getAttribute('data-depth') || 0.1);
        const moveX = mouseX * depth * 100;
        const moveY = mouseY * depth * 100;
        
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });
  }
}

// Initialize 3D card effects
function init3DCards() {
  const cards = document.querySelectorAll('.tm-card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Get position of mouse relative to card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = -((y - centerY) / centerY) * 10;
      
      // Apply transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// This function will be called from main.js to navigate to a new page with animation
function navigateToPage(url) {
  // Get the transition container
  const transitionContainer = document.querySelector('.tm-transition-container');
  if (!transitionContainer) return;
  
  // Get the main content to animate out
  const content = document.querySelector('main');
  
  // Apply transition classes
  transitionContainer.classList.add('tm-transition-active');
  if (content) content.classList.add('tm-page-out');
  document.body.classList.add('tm-transition-active');
  
  // Wait for animation to complete before navigating
  setTimeout(() => {
    window.location.href = url;
  }, 900); // Slightly shorter than the animation to ensure smooth transition
} 