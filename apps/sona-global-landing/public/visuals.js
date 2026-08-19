/**
 * PREMIUM VISUALS SYSTEM V3.0
 * Apero-style animations - 3D floating cards with perspective
 * High-quality particle effects and smooth transitions
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
// HERO VISUAL - Apero-style 3D Floating Cards
// ============================================
function initHeroVisual() {
  const container = document.getElementById('hero-visual');
  if (!container) return;

  // Create container with perspective
  const stage = document.createElement('div');
  stage.className = 'apero-stage';
  stage.style.cssText = `
    width: 100%;
    height: 500px;
    position: relative;
    perspective: 1500px;
    perspective-origin: center center;
  `;

  // Product cards data
  const products = [
    { name: 'Genius', color: '#FF6B9D', icon: '🎨', x: -30, y: -20, delay: 0 },
    { name: 'FaceMagic', color: '#4ECDC4', icon: '✨', x: 30, y: -30, delay: 0.2 },
    { name: 'Caller ID', color: '#95E1D3', icon: '📱', x: -40, y: 20, delay: 0.4 },
    { name: 'Vista', color: '#F38181', icon: '💎', x: 35, y: 25, delay: 0.6 },
    { name: 'Camera', color: '#AA96DA', icon: '📸', x: 0, y: -5, delay: 0.8 }
  ];

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card-3d';
    card.innerHTML = `
      <div class="card-glow" style="background: ${product.color}"></div>
      <div class="card-content">
        <div class="card-icon">${product.icon}</div>
        <div class="card-name">${product.name}</div>
      </div>
    `;
    
    card.style.cssText = `
      position: absolute;
      width: 180px;
      height: 280px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) translate3d(${product.x}%, ${product.y}%, ${index * 20}px);
      background: linear-gradient(135deg, rgba(20, 30, 48, 0.95), rgba(10, 20, 35, 0.98));
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      overflow: hidden;
      animation: cardFloat${index} ${6 + index * 0.5}s ease-in-out infinite;
      animation-delay: ${product.delay}s;
      transition: transform 0.3s ease;
      cursor: pointer;
    `;

    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = `translate(-50%, -50%) translate3d(${product.x}%, ${product.y}%, ${index * 20 + 50}px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = `translate(-50%, -50%) translate3d(${product.x}%, ${product.y}%, ${index * 20}px)`;
    });

    stage.appendChild(card);

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cardFloat${index} {
        0%, 100% {
          transform: translate(-50%, -50%) translate3d(${product.x}%, ${product.y}%, ${index * 20}px) rotateY(0deg);
        }
        25% {
          transform: translate(-50%, -50%) translate3d(${product.x + 5}%, ${product.y - 8}%, ${index * 20 + 15}px) rotateY(5deg);
        }
        50% {
          transform: translate(-50%, -50%) translate3d(${product.x - 3}%, ${product.y + 5}%, ${index * 20}px) rotateY(0deg);
        }
        75% {
          transform: translate(-50%, -50%) translate3d(${product.x + 2}%, ${product.y + 8}%, ${index * 20 - 10}px) rotateY(-5deg);
        }
      }
    `;
    document.head.appendChild(style);
  });

  // Add card styles
  const cardStyles = document.createElement('style');
  cardStyles.textContent = `
    .apero-stage {
      animation: stageRotate 60s linear infinite;
    }
    
    @keyframes stageRotate {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
    
    .product-card-3d {
      transform-style: preserve-3d;
    }
    
    .card-glow {
      position: absolute;
      inset: -50%;
      opacity: 0.15;
      filter: blur(40px);
      animation: glowPulse 3s ease-in-out infinite;
    }
    
    @keyframes glowPulse {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50% { opacity: 0.25; transform: scale(1.2); }
    }
    
    .card-content {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      z-index: 1;
    }
    
    .card-icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: iconBounce 2s ease-in-out infinite;
    }
    
    @keyframes iconBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .card-name {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      letter-spacing: 0.5px;
    }
  `;
  document.head.appendChild(cardStyles);

  container.appendChild(stage);

  // Mouse parallax effect
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    stage.style.transform = `perspective(1500px) rotateY(${x * 15}deg) rotateX(${-y * 10}deg)`;
  });
  
  container.addEventListener('mouseleave', () => {
    stage.style.transform = 'perspective(1500px) rotateY(0deg) rotateX(0deg)';
  });
}

// ============================================
// AI ATOM - Modern orbital animation
// ============================================
function createPremiumAIAtom() {
  const containers = document.querySelectorAll('.orbital-art');
  
  containers.forEach(container => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'ai-atom-visual');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const gradientNucleus = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradientNucleus.setAttribute('id', 'nucleusGrad');
    gradientNucleus.innerHTML = `
      <stop offset="0%" stop-color="#d8ff5e" stop-opacity="1"/>
      <stop offset="100%" stop-color="#55e4ff" stop-opacity="0.6"/>
    `;
    
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
    
    const nucleus = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    nucleus.setAttribute('cx', '200');
    nucleus.setAttribute('cy', '200');
    nucleus.setAttribute('r', '25');
    nucleus.setAttribute('fill', 'url(#nucleusGrad)');
    nucleus.setAttribute('filter', 'url(#atomGlow)');
    svg.appendChild(nucleus);
    
    const orbits = [
      { rx: 80, ry: 40, rotation: 0, color: '#55e4ff' },
      { rx: 120, ry: 60, rotation: 60, color: '#d8ff5e' },
      { rx: 160, ry: 80, rotation: 120, color: '#55e4ff' }
    ];
    
    orbits.forEach((orbit, index) => {
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
      
      const electron = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      electron.setAttribute('r', '8');
      electron.setAttribute('fill', orbit.color);
      electron.setAttribute('filter', 'url(#atomGlow)');
      
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
// BINARY SCANNER - Data visualization
// ============================================
function createPremiumScanner() {
  const containers = document.querySelectorAll('.scan-art');
  
  containers.forEach(container => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'scanner-visual');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
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
        
        setInterval(() => {
          text.textContent = binaryChars[Math.floor(Math.random() * 2)];
        }, 1000 + Math.random() * 2000);
        
        svg.appendChild(text);
      }
    }
    
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
// METRIC BARS
// ============================================
function initMetricBars() {
  const metrics = document.querySelectorAll('.metric-card');
  
  metrics.forEach((card, index) => {
    const viz = document.createElement('div');
    viz.className = 'metric-visualization';
    
    for (let i = 0; i < 50; i++) {
      const bar = document.createElement('div');
      bar.className = 'metric-bar';
      bar.style.left = `${i * 2}%`;
      bar.style.animationDelay = `${i * 0.02}s`;
      bar.style.height = `${Math.random() * 60 + 20}%`;
      viz.appendChild(bar);
    }
    
    card.appendChild(viz);
    
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
      counter.textContent = displayValue + suffix;
    }, 20);
  });
}

// ============================================
// ORBIT ANIMATIONS
// ============================================
function initOrbitAnimations() {
  const products = document.querySelectorAll('.product-orbit');
  
  products.forEach((product, index) => {
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
// PARTICLE CANVAS - Apero-style
// ============================================
function initParticleCanvas() {
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
  const particleCount = isMobile() ? 30 : 60;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 60 + 180; // Blue-cyan range
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
      ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
      ctx.fill();
      
      // Add glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - distance / 120) * 0.2;
          ctx.strokeStyle = `rgba(85, 228, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ============================================
// RESPONSIVE HELPERS
// ============================================
function isMobile() {
  return window.innerWidth <= 720 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Initialize visualizations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createPremiumAIAtom();
    createPremiumScanner();
  });
} else {
  createPremiumAIAtom();
  createPremiumScanner();
}

console.log('🎨 Apero-style Visuals V3.0 Loaded - Premium 3D effects');
