/* ============================================
   DRAGON ANIMATION GENERATOR
   Tạo con rồng SVG animated cho mỗi section
   ============================================ */

// Dragon SVG Template
function createDragonSVG(className) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `dragon-svg ${className}`);
  svg.setAttribute('viewBox', '0 0 200 60');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  
  // Định nghĩa gradients
  svg.innerHTML = `
    <defs>
      <linearGradient id="dragonGradient-${className}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(85,228,255);stop-opacity:1" />
        <stop offset="50%" style="stop-color:rgb(0,200,255);stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:rgb(216,255,94);stop-opacity:0.8" />
      </linearGradient>
      
      <linearGradient id="dragonBodyGradient-${className}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(216,255,94);stop-opacity:0.7" />
        <stop offset="50%" style="stop-color:rgb(85,228,255);stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:rgb(0,180,255);stop-opacity:0.6" />
      </linearGradient>
      
      <linearGradient id="dragonTailGradient-${className}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(85,228,255);stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
      </linearGradient>
      
      <filter id="glow-${className}">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Dragon Tail (flowing) -->
    <path class="dragon-tail" d="M 10,30 Q 5,20 8,35 T 20,28 T 35,32 T 50,30" 
          stroke="url(#dragonTailGradient-${className})" 
          stroke-width="4" 
          fill="none" 
          stroke-linecap="round"
          filter="url(#glow-${className})"/>
    
    <!-- Dragon Body Segments -->
    <ellipse class="dragon-body-segment" cx="60" cy="30" rx="15" ry="10" 
             fill="url(#dragonBodyGradient-${className})"
             filter="url(#glow-${className})"/>
    <ellipse class="dragon-body-segment" cx="80" cy="29" rx="16" ry="11" 
             fill="url(#dragonBodyGradient-${className})"
             filter="url(#glow-${className})"/>
    <ellipse class="dragon-body-segment" cx="100" cy="28" rx="17" ry="12" 
             fill="url(#dragonBodyGradient-${className})"
             filter="url(#glow-${className})"/>
    
    <!-- Dragon Wings -->
    <path class="dragon-wing" d="M 95,25 Q 85,10 105,8 Q 115,7 110,22 Z" 
          fill="rgba(85,228,255,0.3)" 
          stroke="rgba(85,228,255,0.6)" 
          stroke-width="1.5"
          style="transform-origin: 95px 25px"
          filter="url(#glow-${className})"/>
    <path class="dragon-wing" d="M 115,26 Q 105,12 125,10 Q 135,9 130,24 Z" 
          fill="rgba(85,228,255,0.2)" 
          stroke="rgba(85,228,255,0.5)" 
          stroke-width="1.5"
          style="transform-origin: 115px 26px; animation-delay: 0.2s"
          filter="url(#glow-${className})"/>
    
    <!-- Dragon Head -->
    <ellipse class="dragon-head" cx="130" cy="28" rx="20" ry="14" 
             fill="url(#dragonGradient-${className})"
             filter="url(#glow-${className})"/>
    
    <!-- Dragon Horns -->
    <path d="M 120,20 L 118,12 L 122,18" 
          fill="rgba(216,255,94,0.8)" 
          stroke="rgba(216,255,94,1)" 
          stroke-width="1"/>
    <path d="M 128,19 L 127,10 L 130,17" 
          fill="rgba(216,255,94,0.8)" 
          stroke="rgba(216,255,94,1)" 
          stroke-width="1"/>
    
    <!-- Dragon Eye -->
    <circle class="dragon-eye" cx="135" cy="26" r="3" 
            fill="#d8ff5e"/>
    
    <!-- Dragon Nostril glow -->
    <circle cx="145" cy="30" r="2" 
            fill="rgba(255,200,94,0.8)"
            filter="url(#glow-${className})"/>
    
    <!-- Dragon Mouth line -->
    <path d="M 148,31 Q 152,32 155,30" 
          stroke="rgba(85,228,255,0.6)" 
          stroke-width="2" 
          fill="none" 
          stroke-linecap="round"/>
    
    <!-- Spikes on back -->
    <path d="M 70,22 L 68,16 L 72,21" fill="rgba(216,255,94,0.6)"/>
    <path d="M 85,21 L 83,14 L 87,20" fill="rgba(216,255,94,0.6)"/>
    <path d="M 100,20 L 98,13 L 102,19" fill="rgba(216,255,94,0.6)"/>
  `;
  
  return svg;
}

// Create dragon container for a section
function initDragonForSection(sectionElement, dragonClass) {
  // Add dragon-section class
  sectionElement.classList.add('dragon-section');
  
  // Create canvas container
  const canvas = document.createElement('div');
  canvas.className = 'dragon-canvas';
  
  // Create dragon body
  const dragonBody = document.createElement('div');
  dragonBody.className = `dragon-body ${dragonClass}`;
  
  // Add SVG
  const svg = createDragonSVG(dragonClass);
  dragonBody.appendChild(svg);
  
  // Add scales effect
  const scales = document.createElement('div');
  scales.className = 'dragon-scales';
  dragonBody.appendChild(scales);
  
  // Create trail container
  const trail = document.createElement('div');
  trail.className = 'dragon-trail';
  dragonBody.appendChild(trail);
  
  canvas.appendChild(dragonBody);
  sectionElement.insertBefore(canvas, sectionElement.firstChild);
  
  // Start trail generation
  generateTrail(dragonBody, trail);
  
  // Random breath effect
  if (Math.random() > 0.7) {
    setTimeout(() => triggerDragonBreath(dragonBody), Math.random() * 10000 + 5000);
  }
  
  return dragonBody;
}

// Generate particle trail behind dragon
function generateTrail(dragonBody, trailContainer) {
  setInterval(() => {
    const rect = dragonBody.getBoundingClientRect();
    const parentRect = dragonBody.parentElement.parentElement.getBoundingClientRect();
    
    // Calculate relative position
    const relativeTop = rect.top - parentRect.top;
    const relativeLeft = rect.left - parentRect.left;
    
    // Create energy trail
    const energyTrail = document.createElement('div');
    energyTrail.className = 'energy-trail';
    energyTrail.style.top = `${relativeTop + rect.height / 2}px`;
    energyTrail.style.left = `${relativeLeft + rect.width / 3}px`;
    trailContainer.appendChild(energyTrail);
    
    // Create particles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.top = `${relativeTop + rect.height / 2 + (Math.random() - 0.5) * 20}px`;
        particle.style.left = `${relativeLeft + rect.width / 3 + (Math.random() - 0.5) * 30}px`;
        trailContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => particle.remove(), 1500);
      }, i * 100);
    }
    
    // Remove energy trail after animation
    setTimeout(() => energyTrail.remove(), 2000);
  }, 300);
}

// Dragon breath attack effect
function triggerDragonBreath(dragonBody) {
  dragonBody.classList.add('dragon-breathing');
  
  const breath = document.createElement('div');
  breath.className = 'dragon-breath';
  dragonBody.appendChild(breath);
  
  // Create lightning bolts
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const bolt = document.createElement('div');
      bolt.className = 'lightning-bolt';
      bolt.style.left = `${150 + Math.random() * 30}px`;
      bolt.style.top = `${20 + Math.random() * 20}px`;
      bolt.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
      dragonBody.appendChild(bolt);
      
      setTimeout(() => bolt.remove(), 200);
    }, i * 100);
  }
  
  setTimeout(() => {
    dragonBody.classList.remove('dragon-breathing');
    breath.remove();
  }, 900);
  
  // Trigger roar ripple
  triggerRoarRipple(dragonBody);
}

// Roar effect with expanding ripples
function triggerRoarRipple(dragonBody) {
  const rect = dragonBody.getBoundingClientRect();
  const parentRect = dragonBody.parentElement.parentElement.getBoundingClientRect();
  
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ripple = document.createElement('div');
      ripple.className = 'roar-ripple';
      ripple.style.top = `${rect.top - parentRect.top + rect.height / 2}px`;
      ripple.style.left = `${rect.left - parentRect.left + rect.width}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      dragonBody.parentElement.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 1500);
    }, i * 300);
  }
}

// Create magic circle when dragon passes
function createMagicCircle(sectionElement, x, y) {
  const circle = document.createElement('div');
  circle.className = 'magic-circle';
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.transform = 'translate(-50%, -50%)';
  
  sectionElement.querySelector('.dragon-canvas').appendChild(circle);
  
  setTimeout(() => circle.remove(), 2000);
}

// Initialize all dragons on page
function initAllDragons() {
  // Check if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    let dragonClass = '';
    
    // Assign dragon animation based on section
    if (section.classList.contains('about-hero') || section.classList.contains('page-hero')) {
      dragonClass = 'dragon-hero';
    } else if (section.classList.contains('intro-section')) {
      dragonClass = 'dragon-mission';
    } else if (section.classList.contains('values-section')) {
      dragonClass = 'dragon-values';
    } else if (section.classList.contains('featured-products-section') || section.classList.contains('content-section')) {
      dragonClass = 'dragon-products';
    } else if (index % 2 === 0) {
      dragonClass = 'dragon-hero';
    } else {
      dragonClass = 'dragon-mission';
    }
    
    if (dragonClass) {
      const dragon = initDragonForSection(section, dragonClass);
      
      // Random magic circles
      setInterval(() => {
        if (Math.random() > 0.8) {
          const rect = section.getBoundingClientRect();
          createMagicCircle(
            section,
            Math.random() * rect.width,
            Math.random() * rect.height
          );
        }
      }, 8000);
    }
  });
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initAllDragons, createDragonSVG };
}
