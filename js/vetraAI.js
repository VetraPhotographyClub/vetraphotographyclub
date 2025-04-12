/**
 * Vetra Photography Club
 * Vetra AI - Interactive Assistant
 */

// Initialize once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initVetraOrb();
  initVetraChat();
  initAudioVisualization();
});

// Initialize the glowing orb with interactive effects
function initVetraOrb() {
  const orb = document.getElementById('vetra-orb');
  const orbInner = document.querySelector('.orb-inner');
  
  if (!orb || !orbInner) return;
  
  // Add pulsing animation when hovering
  orb.addEventListener('mouseenter', () => {
    orbInner.style.animation = 'none';
    void orbInner.offsetWidth; // Trigger reflow
    orbInner.style.animation = 'pulse 1s infinite';
    orbInner.style.animationDuration = '1s';
  });
  
  orb.addEventListener('mouseleave', () => {
    orbInner.style.animation = 'none';
    void orbInner.offsetWidth; // Trigger reflow
    orbInner.style.animation = 'pulse 2s infinite';
    orbInner.style.animationDuration = '2s';
  });
  
  // Add subtle movement to the orb based on mouse position
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    if (orb.classList.contains('active')) return;
    
    orb.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px) scale(1)`;
  });
}

// Initialize the chat interface with advanced features
function initVetraChat() {
  const vetraChat = document.getElementById('vetra-chat');
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-message');
  
  if (!vetraChat || !chatMessages || !userInput || !sendButton) return;
  
  // Enhanced message display with typing indicator
  function addMessage(text, isUser = false, withTyping = true) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'assistant');
    
    // Add typing animation for assistant messages
    if (!isUser && withTyping) {
      messageDiv.innerHTML = '<p>...</p>';
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Simulate typing
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          const typedText = text.substring(0, i + 1);
          messageDiv.innerHTML = `<p>${typedText}</p>`;
          i++;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
          clearInterval(typeInterval);
        }
      }, 20);
    } else {
      messageDiv.innerHTML = `<p>${text}</p>`;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  // Sample photography-related responses
  const sampleResponses = [
    "That's a great question about photography! To improve your composition skills, try using the rule of thirds and leading lines.",
    "For optimal portrait lighting, position your subject near a large window with diffused light. This creates a flattering, soft effect.",
    "When shooting landscapes, I'd recommend using a small aperture (f/8-f/11) to maximize depth of field and keep everything in focus.",
    "Our next photography meetup is scheduled for Saturday at Sunset Point. We'll be focusing on golden hour techniques.",
    "To capture motion blur in your photos, try using a slower shutter speed (1/15-1/60) and consider using a tripod for stability.",
    "Black and white photography works best with high-contrast scenes. Look for strong highlights and shadows.",
    "To improve your night photography, use a tripod, set your ISO between 800-3200, and use a wide aperture like f/2.8 or wider.",
    "Macro photography tip: Use a dedicated macro lens or extension tubes, and consider using focus stacking for maximum sharpness."
  ];
  
  // Handle send button click with enhanced response
  sendButton.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text === '') return;
    
    // Add user message
    addMessage(text, true, false);
    userInput.value = '';
    
    // Animate orb to show "thinking"
    const orbInner = document.querySelector('.orb-inner');
    if (orbInner) {
      orbInner.style.animation = 'pulse 0.6s infinite';
    }
    
    // Delay for realistic typing simulation
    setTimeout(() => {
      // Get random response, or try to match keywords
      let response = getSmartResponse(text) || 
                     sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      // Add assistant message with typing animation
      addMessage(response, false, true);
      
      // Reset orb animation
      if (orbInner) {
        orbInner.style.animation = 'pulse 2s infinite';
      }
    }, 800);
  });
  
  // Handle Enter key press
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
  
  // Add initial welcome message after a slight delay
  setTimeout(() => {
    addMessage("Hello! I'm Vetra, your photography assistant. Ask me anything about photography or our meetups!", false, true);
  }, 1000);
}

// Try to provide relevant responses based on keywords
function getSmartResponse(text) {
  text = text.toLowerCase();
  
  // Meetup related queries
  if (text.includes('next meetup') || text.includes('upcoming event') || text.includes('when') && text.includes('meet')) {
    return "Our next meetup is this Saturday at Sunset Point Park. We'll meet at 5pm to capture the golden hour. Don't forget to bring your tripod!";
  }
  
  // Camera settings questions
  if (text.includes('aperture') || text.includes('f-stop') || text.includes('depth of field')) {
    return "Aperture controls depth of field. Use a wide aperture (small f-number like f/1.8) for blurry backgrounds in portraits, or a narrow aperture (large f-number like f/11) for sharp landscapes.";
  }
  
  if (text.includes('shutter speed') || text.includes('motion blur')) {
    return "Shutter speed controls motion. Fast speeds (1/1000+) freeze action, while slow speeds (1/30 or slower) create motion blur. For handheld shots, try to stay above 1/(focal length) to avoid camera shake.";
  }
  
  if (text.includes('iso') || text.includes('noise') || text.includes('grain')) {
    return "ISO controls your camera's sensitivity to light. Keep it as low as possible (100-400) in good light for the best quality. Only increase ISO when necessary in darker conditions, as higher values introduce noise.";
  }
  
  // Photography styles
  if (text.includes('portrait') || text.includes('people')) {
    return "For great portraits, focus on the eyes, use a wide aperture (f/1.8-f/4) for a pleasing background blur, and position your subject in flattering light - often slightly angled toward a soft light source.";
  }
  
  if (text.includes('landscape') || text.includes('nature')) {
    return "For landscape photography, use a tripod, set a narrow aperture (f/8-f/13) for maximum depth of field, and shoot during the golden hour or blue hour for magical light. Consider using graduated ND filters for sky balance.";
  }
  
  // No keyword match
  return null;
}

// Add audio visualization to orb when speaking
function initAudioVisualization() {
  const orb = document.getElementById('vetra-orb');
  const orbInner = document.querySelector('.orb-inner');
  
  if (!orb || !orbInner) return;
  
  // We'll simulate audio visualization by adding dynamic glowing
  function simulateAudioVisualization(isActive) {
    if (isActive) {
      // Create glow animation
      const animation = orbInner.animate([
        { boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.7)' },
        { boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.9)' },
        { boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.8)' },
        { boxShadow: '0 0 20px 7px rgba(255, 255, 255, 0.95)' },
        { boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.7)' }
      ], {
        duration: 1500,
        iterations: Infinity
      });
      
      return animation;
    }
  }
  
  // We'll activate this when "speaking"
  document.addEventListener('vetraSpeaking', function(e) {
    const animation = simulateAudioVisualization(true);
    
    // Stop after the message is complete
    setTimeout(() => {
      if (animation) animation.cancel();
    }, e.detail.duration || 3000);
  });
  
  // When a new assistant message appears, trigger the visualization
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const addedNode = mutation.addedNodes[0];
        if (addedNode.classList && 
            addedNode.classList.contains('message') && 
            addedNode.classList.contains('assistant')) {
          
          // Calculate duration based on message length
          const text = addedNode.textContent || '';
          const duration = Math.min(text.length * 50, 5000);
          
          // Dispatch custom event
          document.dispatchEvent(new CustomEvent('vetraSpeaking', {
            detail: { duration: duration }
          }));
        }
      }
    });
  });
  
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
    observer.observe(chatMessages, { childList: true });
  }
} 