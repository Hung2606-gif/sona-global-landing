/**
 * PREMIUM VISUALS SYSTEM V2.0
 * Professional animations using vanilla JS + Canvas + WebGL techniques
 * Inspired by Stripe, Apple, Vercel animation systems
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroVisual();
  initMetricBars();
  initOrbitAnimations();
  initParticleCanvas();
});

// ============================================
// HERO VISUAL - Advanced 3D Network Globe
// ============================================
function initHeroVisual() {
  const container = document.getElementById('hero-visual');
  if (!container) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 600 600');
  svg.setAttribute('class', 'premium-globe');
  svg.style.filter = 'drop-shadow(0 0 40px rgba(85, 228, 255, 0.3))';
  
  // Defs for gradients and filters
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  
  // Radial gradient for sphere - more vibrant
  const gradientSphere = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
  gradientSphere.setAttribute('id', 'sphereGradient');
  gradientSphere.innerHTML = `
    <stop offset="0%" stop-color="#55e4ff" stop-opacity="0.8"/>
    <stop offset="40%" stop-color="#0084ff" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="#001f3f" stop-opacity="0.9"/>
  `;
  
  // Enhanced glow filter
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'glow');
  filter.innerHTML = `
    <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `;
  
  // Holographic shimmer filter
  const shimmerFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  shimmerFilter.setAttribute('id', 'shimmer');
  shimmerFilter.innerHTML = `
    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  `;
  
  defs.appendChild(gradientSphere);
  defs.appendChild(filter);
  defs.appendChild(shimmerFilter);
  svg.appendChild(defs);
  
  // Main sphere with double layer for depth
  const sphereOuter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  sphereOuter.setAttribute('cx', '300');
  sphereOuter.setAttribute('cy', '300');
  sphereOuter.setAttribute('r', '205');
  sphereOuter.setAttribute('fill', 'none');
  sphereOuter.setAttribute('stroke', 'rgba(85, 228, 255, 0.3)');
  sphereOuter.setAttribute('stroke-width', '2');
  sphereOuter.setAttribute('filter', 'url(#glow)');
  svg.appendChild(sphereOuter);
  
  const sphere = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  sphere.setAttribute('cx', '300');
  sphere.setAttribute('cy', '300');
  sphere.setAttribute('r', '200');
  sphere.setAttribute('fill', 'url(#sphereGradient)');
  sphere.setAttribute('filter', 'url(#shimmer)');
  svg.appendChild(sphere);
  
  // Grid pattern overlay
  const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
  pattern.setAttribute('id', 'gridPattern');
  pattern.setAttribute('width', '40');
  pattern.setAttribute('height', '40');
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  
  const gridLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  gridLine1.setAttribute('d', 'M 40 0 L 0 0 0 40');
  gridLine1.setAttribute('fill', 'none');
  gridLine1.setAttribute('stroke', 'rgba(85, 228, 255, 0.2)');
  gridLine1.setAttribute('stroke-width', '1');
  pattern.appendChild(gridLine1);
  
  defs.appendChild(pattern);
  
  const gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  gridOverlay.setAttribute('cx', '300');
  gridOverlay.setAttribute('cy', '300');
  gridOverlay.setAttribute('r', '200');
  gridOverlay.setAttribute('fill', 'url(#gridPattern)');
  gridOverlay.setAttribute('opacity', '0.3');
  svg.appendChild(gridOverlay);
  
  // Enhanced orbital rings with gradients
  for (let i = 0; i < 4; i++) {
    const rx = 220 + i * 35;
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ring.setAttribute('cx', '300');
    ring.setAttribute('cy', '300');
    ring.setAttribute('rx', rx);
    ring.setAttribute('ry', rx * 0.25);
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', i % 2 === 0 ? 'rgba(85, 228, 255, 0.4)' : 'rgba(216, 255, 94, 0.3)');
    ring.setAttribute('stroke-width', '1.5');
    ring.setAttribute('stroke-dasharray', '10 5');
    ring.style.transformOrigin = '300px 300px';
    ring.style.animation = `ringRotate${i} ${6 + i * 2}s linear infinite`;
    ring.style.opacity = '0';
    ring.style.animationDelay = `${i * 0.3}s`;
    svg.appendChild(ring);
    
    // Add CSS animation with fade in
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ringRotate${i} {
        0% { 
          transform: rotateX(65deg) rotateZ(0deg);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: rotateX(65deg) rotateZ(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Enhanced particle field with connecting lines
  const particles = [];
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 220 + Math.random() * 100;
    const cx = 300 + Math.cos(angle) * radius;
    const cy = 300 + Math.sin(angle) * radius * 0.35;
    
    particles.push({ cx, cy, angle, radius });
    
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    particle.setAttribute('cx', cx);
    particle.setAttribute('cy', cy);
    particle.setAttribute('r', Math.random() * 2.5 + 1.5);
    
    const colors = ['#55e4ff', '#d8ff5e', '#ad8dff'];
    particle.setAttribute('fill', colors[i % 3]);
    particle.setAttribute('opacity', Math.random() * 0.6 + 0.4);
    particle.setAttribute('filter', 'url(#glow)');
    particle.style.animation = `particleBlink ${1.5 + Math.random() * 2}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    svg.appendChild(particle);
  }
  
  // Add connection lines between nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].cx - particles[j].cx;
      const dy = particles[i].cy - particles[j].cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 80) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', particles[i].cx);
        line.setAttribute('y1', particles[i].cy);
        line.setAttribute('x2', particles[j].cx);
        line.setAttribute('y2', particles[j].cy);
        line.setAttribute('stroke', 'rgba(85, 228, 255, 0.15)');
        line.setAttribute('stroke-width', '0.5');
        line.style.animation = `lineFlicker ${3 + Math.random()}s ease-in-out infinite`;
        svg.insertBefore(line, svg.firstChild); // Add behind particles
      }
    }
  }
  
  // Add enhanced animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleBlink {
      0%, 100% { 
        opacity: 0.3; 
        transform: scale(1);
      }
      50% { 
        opacity: 1; 
        transform: scale(1.3);
      }
    }
    
    @keyframes lineFlicker {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
  
  // Enhanced energy core with multiple layers
  const coreOuter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  coreOuter.setAttribute('cx', '300');
  coreOuter.setAttribute('cy', '300');
  coreOuter.setAttribute('r', '25');
  coreOuter.setAttribute('fill', 'rgba(216, 255, 94, 0.2)');
  coreOuter.setAttribute('filter', 'url(#glow)');
  coreOuter.style.animation = 'coreOuterPulse 3s ease-in-out infinite';
  svg.appendChild(coreOuter);
  
  const coreMid = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  coreMid.setAttribute('cx', '300');
  coreMid.setAttribute('cy', '300');
  coreMid.setAttribute('r', '18');
  coreMid.setAttribute('fill', 'rgba(85, 228, 255, 0.4)');
  coreMid.setAttribute('filter', 'url(#glow)');
  coreMid.style.animation = 'coreMidPulse 2s ease-in-out infinite';
  svg.appendChild(coreMid);
  
  const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  core.setAttribute('cx', '300');
  core.setAttribute('cy', '300');
  core.setAttribute('r', '12');
  core.setAttribute('fill', '#d8ff5e');
  core.setAttribute('filter', 'url(#glow)');
  core.style.animation = 'corePulse 1.5s ease-in-out infinite';
  svg.appendChild(core);
  
  const coreStyle = document.createElement('style');
  coreStyle.textContent = `
    @keyframes corePulse {
      0%, 100% { 
        r: 12; 
        opacity: 0.9;
      }
      50% { 
        r: 15; 
        opacity: 1;
      }
    }
    
    @keyframes coreMidPulse {
      0%, 100% { 
        r: 18; 
        opacity: 0.4;
      }
      50% { 
        r: 22; 
        opacity: 0.6;
      }
    }
    
    @keyframes coreOuterPulse {
      0%, 100% { 
        r: 25; 
        opacity: 0.2;
      }
      50% { 
        r: 30; 
        opacity: 0.4;
      }
    }
  `;
  document.head.appendChild(coreStyle);
  
  container.appendChild(svg);
  
  // Mouse interaction
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    svg.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  });
  
  container.addEventListener('mouseleave', () => {
    svg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  });
}

// ============================================
// AI ATOM - Orbital animation for .orbital-art
// ============================================
function createPremiumAIAtom() {
  const containers = document.querySelectorAll('.orbital-art');
  
  containers.forEach(container => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'ai-atom-visual');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Gradient for nucleus
    const gradientNucleus = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradientNucleus.setAttribute('id', 'nucleusGrad');
    gradientNucleus.innerHTML = `
      <stop offset="0%" stop-color="#d8ff5e" stop-opacity="1"/>
      <stop offset="100%" stop-color="#55e4ff" stop-opacity="0.6"/>
    `;
    
    // Glow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'atomGlow');
    filter.innerHTML = `
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    `;
    
    defs.appendChild(gradientNucleus);
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Central nucleus
    const nucleus = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    nucleus.setAttribute('cx', '200');
    nucleus.setAttribute('cy', '200');
    nucleus.setAttribute('r', '25');
    nucleus.setAttribute('fill', 'url(#nucleusGrad)');
    nucleus.setAttribute('filter', 'url(#atomGlow)');
    svg.appendChild(nucleus);
    
    // Orbital paths and electrons
    const orbits = [
      { rx: 80, ry: 40, rotation: 0, color: '#55e4ff' },
      { rx: 120, ry: 60, rotation: 60, color: '#d8ff5e' },
      { rx: 160, ry: 80, rotation: 120, color: '#55e4ff' }
    ];
    
    orbits.forEach((orbit, index) => {
      // Orbit path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      path.setAttribute('cx', '200');
      path.setAttribute('cy', '200');
      path.setAttribute('rx', orbit.rx);
      path.setAttribute('ry', orbit.ry);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', orbit.color);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('opacity', '0.3');
      path.setAttribute('transform', `rotate(${orbit.rotation} 200 200)`);
      svg.appendChild(path);
      
      // Electron
      const electron = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      electron.setAttribute('r', '8');
      electron.setAttribute('fill', orbit.color);
      electron.setAttribute('filter', 'url(#atomGlow)');
      
      // Animation path
      const animPath = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      animPath.setAttribute('dur', `${4 + index}s`);
      animPath.setAttribute('repeatCount', 'indefinite');
      
      const motionPath = `M 200,${200 - orbit.ry} 
                          A ${orbit.rx},${orbit.ry} 0 1,1 200,${200 + orbit.ry}
                          A ${orbit.rx},${orbit.ry} 0 1,1 200,${200 - orbit.ry}`;
      animPath.innerHTML = `<mpath href="#orbitPath${index}"/>`;
      
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('id', `orbitPath${index}`);
      pathElement.setAttribute('d', motionPath);
      pathElement.setAttribute('transform', `rotate(${orbit.rotation} 200 200)`);
      pathElement.setAttribute('opacity', '0');
      svg.appendChild(pathElement);
      
      electron.appendChild(animPath);
      svg.appendChild(electron);
    });
    
    container.appendChild(svg);
  });
}

// ============================================
// BINARY SCANNER - Data visualization for .scan-art
// ============================================
function createPremiumScanner() {
  const containers = document.querySelectorAll('.scan-art');
  
  containers.forEach(container => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'scanner-visual');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Scan line gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'scanGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="rgba(85, 228, 255, 0)" stop-opacity="0"/>
      <stop offset="50%" stop-color="rgba(85, 228, 255, 1)" stop-opacity="1"/>
      <stop offset="100%" stop-color="rgba(85, 228, 255, 0)" stop-opacity="0"/>
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Binary grid
    const binaryChars = ['0', '1'];
    const rows = 15;
    const cols = 20;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', col * 20 + 10);
        text.setAttribute('y', row * 25 + 20);
        text.setAttribute('fill', col % 3 === 0 ? '#55e4ff' : '#0084c8');
        text.setAttribute('font-family', 'monospace');
        text.setAttribute('font-size', '14');
        text.setAttribute('opacity', Math.random() * 0.5 + 0.3);
        text.textContent = binaryChars[Math.floor(Math.random() * 2)];
        
        // Randomly change binary values
        setInterval(() => {
          text.textContent = binaryChars[Math.floor(Math.random() * 2)];
        }, 1000 + Math.random() * 2000);
        
        svg.appendChild(text);
      }
    }
    
    // Scanning line
    const scanLine = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    scanLine.setAttribute('x', '0');
    scanLine.setAttribute('y', '0');
    scanLine.setAttribute('width', '400');
    scanLine.setAttribute('height', '4');
    scanLine.setAttribute('fill', 'url(#scanGradient)');
    scanLine.style.animation = 'scanMove 3s ease-in-out infinite';
    svg.appendChild(scanLine);
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanMove {
        0%, 100% { transform: translateY(0); opacity: 0; }
        10%, 90% { opacity: 1; }
        50% { transform: translateY(400px); }
      }
    `;
    document.head.appendChild(style);
    
    // Data packets
    for (let i = 0; i < 8; i++) {
      const packet = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      packet.setAttribute('x', i * 50);
      packet.setAttribute('y', Math.random() * 400);
      packet.setAttribute('width', '30');
      packet.setAttribute('height', '3');
      packet.setAttribute('fill', '#d8ff5e');
      packet.setAttribute('opacity', '0.6');
      packet.style.animation = `packetFlow${i} ${3 + Math.random() * 2}s linear infinite`;
      svg.appendChild(packet);
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes packetFlow${i} {
          from { transform: translateX(0); opacity: 0; }
          20%, 80% { opacity: 0.8; }
          to { transform: translateX(400px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    container.appendChild(svg);
  });
}

// ============================================
// METRIC BARS - Data visualization
// ============================================
function initMetricBars() {
  const metrics = document.querySelectorAll('.metric-card');
  
  metrics.forEach((card, index) => {
    const viz = document.createElement('div');
    viz.className = 'metric-visualization';
    
    // Create animated bars
    for (let i = 0; i < 50; i++) {
      const bar = document.createElement('div');
      bar.className = 'metric-bar';
      bar.style.left = `${i * 2}%`;
      bar.style.animationDelay = `${i * 0.02}s`;
      bar.style.height = `${Math.random() * 60 + 20}%`;
      viz.appendChild(bar);
    }
    
    card.appendChild(viz);
    
    // Counter animation
    const counter = card.querySelector('strong');
    const target = parseInt(card.getAttribute('data-count')) || 0;
    const suffix = card.getAttribute('data-suffix') || '';
    
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current);
      if (suffix.includes('M')) {
        displayValue = (current / 1).toFixed(0);
      } else if (suffix.includes('TB')) {
        displayValue = (current / 1).toFixed(0);
      }
      
      counter.textContent = displayValue + suffix;
    }, 20);
  });
}

// ============================================
// ORBIT ANIMATIONS - Product rotation
// ============================================
function initOrbitAnimations() {
  const products = document.querySelectorAll('.product-orbit');
  
  products.forEach((product, index) => {
    // Add interactive hover effect
    product.addEventListener('mouseenter', () => {
      products.forEach(p => {
        if (p !== product) {
          p.style.opacity = '0.4';
          p.style.transform = 'scale(0.9)';
        }
      });
    });
    
    product.addEventListener('mouseleave', () => {
      products.forEach(p => {
        p.style.opacity = '1';
        p.style.transform = 'scale(1)';
      });
    });
  });
}

// ============================================
// PARTICLE CANVAS - Background effects
// ============================================
function initParticleCanvas() {
  // Create canvas if not exists
  let canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);
  }
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 80;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(85, 228, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(85, 228, 255, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize all visualizations when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createPremiumAIAtom();
    createPremiumScanner();
  });
} else {
  createPremiumAIAtom();
  createPremiumScanner();
}


// ============================================
// RESPONSIVE HELPERS
// ============================================

// Detect device type
function isMobile() {
  return window.innerWidth <= 720 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isTablet() {
  return window.innerWidth <= 980 && window.innerWidth > 720;
}

// Adjust particle count based on device
function getParticleCount() {
  if (isMobile()) return 30;
  if (isTablet()) return 50;
  return 80;
}

// Adjust animation speeds
function getAnimationSpeed(baseSpeed) {
  if (isMobile()) return baseSpeed * 1.5; // Slower on mobile
  return baseSpeed;
}

// ============================================
// TOUCH OPTIMIZATIONS
// ============================================

// Add touch feedback for cards
document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.metric-card, .value-card, .product-card, .story-card, .resource-card');
    
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      card.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
});

// ============================================
// RESPONSIVE GLOBE SIZING
// ============================================
function getGlobeSize() {
  const width = window.innerWidth;
  
  if (width <= 480) {
    return { width: 300, height: 300, radius: 100 };
  } else if (width <= 720) {
    return { width: 400, height: 400, radius: 130 };
  } else if (width <= 980) {
    return { width: 500, height: 500, radius: 160 };
  } else {
    return { width: 600, height: 600, radius: 200 };
  }
}

// Update globe on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize hero visual if needed
    const container = document.getElementById('hero-visual');
    if (container && container.querySelector('svg')) {
      container.innerHTML = '';
      initHeroVisual();
    }
  }, 250);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Reduce effects on low-end devices
function detectPerformanceMode() {
  const ua = navigator.userAgent.toLowerCase();
  const isLowEnd = /android [1-4]\.|android 5\.[0-1]/i.test(ua);
  
  if (isLowEnd) {
    // Disable heavy animations
    document.documentElement.style.setProperty('--disable-heavy-fx', '1');
    
    // Reduce particle count
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      canvas.style.display = 'none';
    }
  }
}

detectPerformanceMode();

// ============================================
// VIEWPORT HEIGHT FIX (Android Chrome)
// ============================================

// Fix 100vh issue on mobile browsers (address bar)
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// ============================================
// SAFE AREA DETECTION
// ============================================

function detectNotch() {
  const supportsEnv = CSS.supports('padding-top: env(safe-area-inset-top)');
  if (supportsEnv) {
    document.body.classList.add('has-notch');
  }
}

detectNotch();

// ============================================
// LAZY LOADING FOR ANIMATIONS
// ============================================

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Initialize animations only when visible
        if (target.classList.contains('orbital-art') && !target.dataset.initialized) {
          target.dataset.initialized = 'true';
          createPremiumAIAtom();
        }
        
        if (target.classList.contains('scan-art') && !target.dataset.initialized) {
          target.dataset.initialized = 'true';
          createPremiumScanner();
        }
      }
    });
  },
  {
    rootMargin: '100px',
    threshold: 0.1
  }
);

// Observe animation containers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.orbital-art, .scan-art').forEach(el => {
    animationObserver.observe(el);
  });
});

// ============================================
// NETWORK-AWARE LOADING
// ============================================

if ('connection' in navigator) {
  const connection = navigator.connection;
  
  if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // Reduce effects on slow connections
    document.documentElement.classList.add('low-bandwidth');
    
    // Disable particle canvas
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
      canvas.style.display = 'none';
    }
  }
}

// ============================================
// ORIENTATION CHANGE HANDLER
// ============================================

window.addEventListener('orientationchange', () => {
  // Force layout recalculation
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);
});

// ============================================
// PREVENT ZOOM ON DOUBLE TAP (Android)
// ============================================

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// ============================================
// ANDROID BACK BUTTON HANDLER
// ============================================

if ('history' in window && 'pushState' in window.history) {
  // Add state for proper back navigation
  window.addEventListener('load', () => {
    window.history.pushState({ page: 'main' }, '', window.location.href);
  });
}

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER ANDROID
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
  // Polyfill for smooth scroll
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
}

console.log('🚀 Premium Visuals V2.0 Loaded - Responsive: Desktop + Android optimized');
