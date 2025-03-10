// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. On-scroll fade/slide-in animations using Intersection Observer
  const observerOptions = { threshold: 0.1 };  // trigger when 10% of element is visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');  // reveal element
        obs.unobserve(entry.target);  // stop observing once visible (animate only once)
      }
    });
  }, observerOptions);
  // Observe all elements with the animation classes
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(elem => {
    observer.observe(elem);
  });

  // 2. Cover flow navigation controls
  const radioButtons = document.querySelectorAll('input[name="coverflow"]');
  // Keyboard support (left/right arrows to navigate slides)
  document.addEventListener('keydown', (e) => {
    const radios = Array.from(radioButtons);
    const currentIndex = radios.findIndex(r => r.checked);
    if (e.key === 'ArrowRight' && currentIndex < radios.length - 1) {
      radios[currentIndex + 1].checked = true;
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      radios[currentIndex - 1].checked = true;
    }
  });
  // Touch swipe support for coverflow (detect swipe left/right on the slider area)
  const slider = document.querySelector('.coverflow-slider');
  let touchStartX = 0;
  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      const radios = Array.from(radioButtons);
      const currentIndex = radios.findIndex(r => r.checked);
      if (Math.abs(diffX) > 50) {  // swipe threshold
        if (diffX < 0 && currentIndex < radios.length - 1) {
          // swiped left
          radios[currentIndex + 1].checked = true;
        } else if (diffX > 0 && currentIndex > 0) {
          // swiped right
          radios[currentIndex - 1].checked = true;
        }
      }
    });
  }
});
