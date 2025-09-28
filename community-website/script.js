// LinkedIn connection handler
function connectLinkedIn(url) {
  if (url && url !== '#') {
    window.open(url, "_blank");
  } else {
    // Create a stylish notification instead of basic alert
    showNotification("LinkedIn profile coming soon!", "info");
  }
}

// Custom notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #ff6ec7, #4facfe);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .notification-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      margin-left: auto;
      padding: 2px;
    }
    .notification-close:hover {
      opacity: 0.7;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

// Loading screen handler
window.addEventListener('load', function() {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1000);
});

// Scroll progress bar
window.addEventListener('scroll', function() {
  const progressBar = document.getElementById('progressBar');
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = Math.min(scrolled, 100) + '%';
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(20px)';
    navbar.querySelectorAll('a').forEach(link => {
      link.style.color = '#333';
    });
    navbar.querySelector('.logo').style.color = '#333';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.querySelectorAll('a').forEach(link => {
      link.style.color = 'white';
    });
    navbar.querySelector('.logo').style.color = 'white';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe all cards and sections
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  const sections = document.querySelectorAll('.team');
  
  cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Add floating particles
function createParticles() {
  const particlesCount = 6;
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    document.body.appendChild(particle);
  }
}

// Initialize particles after page load
window.addEventListener('load', createParticles);

// Card hover sound effect (optional)
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add subtle hover effect
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Dynamic greeting based on time
function setDynamicGreeting() {
  const hero = document.querySelector('.hero p');
  const hour = new Date().getHours();
  let greeting = "Empowering Women in Computing • Building Tomorrow's Tech Leaders";
  
  if (hour < 12) {
    greeting = "Good Morning! • Empowering Women in Computing";
  } else if (hour < 18) {
    greeting = "Good Afternoon! • Building Tomorrow's Tech Leaders";
  } else {
    greeting = "Good Evening! • Inspiring Innovation Together";
  }
  
  if (hero) {
    hero.textContent = greeting;
  }
}

// Call dynamic greeting on load
window.addEventListener('load', setDynamicGreeting);

// Add click ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.card button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes rippleEffect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.filter = 'blur(0)';
      img.style.opacity = '1';
      observer.unobserve(img);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.card img');
  images.forEach(img => {
    img.style.filter = 'blur(5px)';
    img.style.opacity = '0.5';
    img.style.transition = 'all 0.5s ease';
    imageObserver.observe(img);
  });
});

// Search functionality
function initializeSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Search team members...';
  searchInput.className = 'search-input';
  searchInput.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 10px 15px;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: all 0.3s ease;
    width: 250px;
  `;

  document.body.appendChild(searchInput);

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const role = card.querySelector('p').textContent.toLowerCase();
      
      if (name.includes(searchTerm) || role.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease-out';
      } else {
        card.style.display = searchTerm === '' ? 'block' : 'none';
      }
    });
  });
}

// Initialize search on load
window.addEventListener('load', initializeSearch);

// Mobile menu toggle
function initializeMobileMenu() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
  `;
  
  document.querySelector('.nav-content').appendChild(mobileMenuBtn);
  
  // Mobile menu functionality
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('mobile-open');
    this.querySelector('i').className = navLinks.classList.contains('mobile-open') 
      ? 'fas fa-times' : 'fas fa-bars';
  });
  
  // Add mobile styles
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block !important;
      }
      .nav-links {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 250px;
        height: 100vh;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        transition: right 0.3s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      }
      .nav-links.mobile-open {
        right: 0;
      }
      .nav-links a {
        color: #333 !important;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  `;
  document.head.appendChild(mobileStyle);
}

// Initialize mobile menu
window.addEventListener('load', initializeMobileMenu);

// Scroll to top button
function initializeScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6ec7, #4facfe);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide scroll button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

// Initialize scroll to top button
window.addEventListener('load', initializeScrollToTop);

// Console welcome message
console.log(`
🌟 Welcome to KARE ACM-W Community Website! 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👩‍💻 Empowering Women in Computing
🚀 Building Tomorrow's Tech Leaders
💡 Inspiring Innovation Together

Made with ❤️ by the Web Wizards Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Features:
• Animated gradient backgrounds
• Interactive hover effects
• Mobile responsive design
• Search functionality
• Smooth animations
• Modern glassmorphism UI

🎨 Theme: Pink-Blue Gradient Paradise
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Performance monitoring
window.addEventListener('load', function() {
  setTimeout(() => {
    const loadTime = performance.now();
    console.log(`🚀 Page loaded in ${Math.round(loadTime)}ms`);
    
    // Show success notification
    setTimeout(() => {
      showNotification("🎉 Welcome to KARE ACM-W Community!", "info");
    }, 2000);
  }, 0);
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.code);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s ease-in-out';
    showNotification("🌈 Konami Code activated! You found the easter egg!", "info");
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Reset after animation
    setTimeout(() => {
      document.body.style.animation = '';
      konamiCode = [];
    }, 2000);
  }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  console.log(`📊 Event tracked: ${eventName}`, eventData);
  // Here you would typically send data to your analytics service
  // Example: gtag('event', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
  if (e.target.matches('.card button')) {
    const cardName = e.target.closest('.card').querySelector('h3').textContent;
    trackEvent('connect_button_click', { name: cardName });
  }
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;
    if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
      trackEvent('scroll_depth', { depth: maxScroll + '%' });
    }
  }
});