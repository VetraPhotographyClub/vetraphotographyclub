/**
 * Vetra Photography Club
 * Main JavaScript
 */

// Initialize once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initThreeBackground();
  initSmoothScroll();
  initMenu();
  initVetraAI();
  initRevealAnimations();
  initToolTips();
});

// Initialize Three.js background
function initThreeBackground() {
  // Get the container
  const container = document.getElementById('background-canvas');
  if (!container) return;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create particle geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Create particle material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 0x1e90ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  // Create particle mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Position camera
  camera.position.z = 5;
  
  // Mouse movement effect
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  });
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate particles based on mouse position
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    // Add slight movement based on mouse position
    particlesMesh.rotation.x += mouseY * 0.0005;
    particlesMesh.rotation.y += mouseX * 0.0005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Initialize Locomotive Scroll for smooth scrolling
function initSmoothScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]') || document.body,
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true }
  });
  
  // Update scroll on window resize
  window.addEventListener('resize', () => {
    setTimeout(() => {
      scroll.update();
    }, 500);
  });
}

// Initialize the menu
function initMenu() {
  const menuButton = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('menu-overlay');
  const closeButton = document.querySelector('.menu-close');
  const menuLinks = document.querySelectorAll('.menu-link');
  
  if (!menuButton || !menuOverlay) return;
  
  // Set initial index for menu items animation
  document.querySelectorAll('nav ul li').forEach((item, index) => {
    item.style.setProperty('--i', index);
  });
  
  // Open menu
  menuButton.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close menu
  closeButton.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Handle menu links and close menu on click
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // For page transitions
        e.preventDefault();
        menuOverlay.classList.remove('active');
        
        const targetPage = link.getAttribute('href');
        navigateToPage(targetPage);
      }
    });
  });
}

// Initialize Vetra AI Assistant
function initVetraAI() {
  const vetraOrb = document.getElementById('vetra-orb');
  const vetraChat = document.getElementById('vetra-chat');
  const chatClose = document.querySelector('.chat-close');
  const sendButton = document.getElementById('send-message');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');
  
  if (!vetraOrb || !vetraChat) return;
  
  // Toggle chat window
  vetraOrb.addEventListener('click', () => {
    vetraChat.classList.toggle('active');
  });
  
  // Close chat window
  chatClose.addEventListener('click', () => {
    vetraChat.classList.remove('active');
  });
  
  // Function to add a message to the chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'assistant');
    
    const messagePara = document.createElement('p');
    messagePara.textContent = text;
    
    messageDiv.appendChild(messagePara);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Handle send button click
  sendButton.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text === '') return;
    
    // Add user message
    addMessage(text, true);
    userInput.value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
      // Simple responses - in a real app, this would connect to an AI API
      const responses = [
        "That's a great photography question! I'd recommend experimenting with different apertures to achieve the depth of field you're looking for.",
        "The golden hour is indeed the best time for portrait photography. Try shooting about 1 hour before sunset for the most flattering light.",
        "For landscape photography, I'd recommend using a tripod and a smaller aperture (f/8 - f/11) for maximum sharpness.",
        "Black and white photography can add a timeless quality to your images. Try converting color photos that have strong contrast.",
        "Our next meetup is scheduled for this Saturday at Riverside Park. Hope to see you there!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Simulate typing effect
      let i = 0;
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('message', 'assistant', 'typing');
      typingDiv.innerHTML = '<p>...</p>';
      chatMessages.appendChild(typingDiv);
      
      const typeWriter = () => {
        if (i < randomResponse.length) {
          typingDiv.querySelector('p').textContent = randomResponse.substring(0, i + 1);
          i++;
          setTimeout(typeWriter, 20);
        } else {
          typingDiv.classList.remove('typing');
        }
      };
      
      typeWriter();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  });
  
  // Allow Enter key to send message
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
}

// Initialize animations for elements that reveal on scroll
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.tm-reveal');
  const revealLists = document.querySelectorAll('.tm-reveal-list');
  
  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Function to check elements and add active class when in viewport
  function checkElements() {
    revealElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
    
    revealLists.forEach(list => {
      if (isInViewport(list)) {
        list.classList.add('active');
      }
    });
  }
  
  // Run on scroll
  window.addEventListener('scroll', checkElements);
  
  // Initial check
  checkElements();
}

// Initialize tooltips using Tippy.js
function initToolTips() {
  if (typeof tippy !== 'undefined') {
    tippy('[data-tippy-content]', {
      theme: 'vetra',
      animation: 'shift-away',
      duration: [200, 100],
      arrow: true
    });
  }
}

// Function to handle page transitions
function navigateToPage(url) {
  // Create transition container if it doesn't exist
  let transitionContainer = document.querySelector('.tm-transition-container');
  
  if (!transitionContainer) {
    transitionContainer = document.createElement('div');
    transitionContainer.className = 'tm-transition-container';
    
    // Create layers
    for (let i = 0; i < 5; i++) {
      const layer = document.createElement('div');
      layer.className = 'tm-layer';
      transitionContainer.appendChild(layer);
    }
    
    document.body.appendChild(transitionContainer);
  }
  
  // Mark content for transition
  document.body.classList.add('tm-transition-active');
  transitionContainer.classList.add('tm-transition-active');
  
  // After animation completes, navigate to the new page
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
} 