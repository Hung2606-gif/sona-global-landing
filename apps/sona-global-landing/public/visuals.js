/* ============================================
   PREMIUM VISUAL SYSTEM - PROFESSIONAL GRADE
   High-quality animations for premium feel
   ============================================ */

// 1. PREMIUM 3D GLOBE - Chuyên nghiệp, mượt mà
function createPremiumGlobe() {
  const container = document.getElementById('hero-visual');
  if (!container) return;
  
  // Add particle field
  const particleField = document.createElement('div');
  particleField.className = 'particle-field';
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
    particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particleField.appendChild(particle);
  }
  container.appendChild(particleField);
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 600 600');
  svg.setAttribute('class', 'glow-pulse');
  
  svg.innerHTML = `
    <defs>
      <radialGradient id="sphereGradient">
        <stop offset="0%" stop-color="rgb(85,228,255)" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="rgb(0,150,255)" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="rgb(0,50,150)" stop-opacity="0.1"/>
      </radialGradient>
      
      <radialGradient id="coreGradient">
        <stop offset="0%" stop-color="rgb(216,255,94)" stop-opacity="1"/>
        <stop offset="50%" stop-color="rgb(85,228,255)" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
      </radialGradient>
      
      <filter id="premiumGlow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Outer glow rings -->
    <circle cx="300" cy="300" r="200" fill="none" stroke="url(#sphereGradient)" stroke-width="1" opacity="0.3">
      <animate attributeName="r" values="200;210;200" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(85,228,255,0.2)" stroke-width="1">
      <animate attributeName="r" values="220;230;220" dur="5s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Main sphere with gradient -->
    <circle cx="300" cy="300" r="180" fill="url(#sphereGradient)" opacity="0.6" filter="url(#premiumGlow)">
      <animate attributeName="r" values="180;185;180" dur="3s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Grid lines - horizontal -->
    ${[...Array(8)].map((_, i) => {
      const y = 120 + (i * 360 / 8);
      return `
        <ellipse cx="300" cy="300" rx="180" ry="${Math.abs(Math.sin((i / 8) * Math.PI)) * 180}" 
                 fill="none" stroke="rgba(85,228,255,0.3)" stroke-width="1" opacity="0.5"/>
      `;
    }).join('')}
    
    <!-- Orbital rings - animated -->
    <ellipse cx="300" cy="300" rx="220" ry="100" fill="none" stroke="rgba(85,228,255,0.5)" stroke-width="2" filter="url(#softGlow)">
      <animateTransform attributeName="transform" type="rotate" 
                        from="0 300 300" to="360 300 300" dur="20s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="300" cy="300" rx="220" ry="100" fill="none" stroke="rgba(216,255,94,0.4)" stroke-width="2" filter="url(#softGlow)">
      <animateTransform attributeName="transform" type="rotate" 
                        from="60 300 300" to="420 300 300" dur="16s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="300" cy="300" rx="220" ry="100" fill="none" stroke="rgba(85,228,255,0.3)" stroke-width="2" filter="url(#softGlow)">
      <animateTransform attributeName="transform" type="rotate" 
                        from="-60 300 300" to="300 300 300" dur="24s" repeatCount="indefinite"/>
    </ellipse>
    
    <!-- Connection nodes -->
    ${[...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const r = 180;
      const x = 300 + Math.cos(angle) * r;
      const y = 300 + Math.sin(angle) * r;
      return `
        <g>
          <circle cx="${x}" cy="${y}" r="5" fill="rgba(216,255,94,0.8)" filter="url(#softGlow)">
            <animate attributeName="r" values="5;8;5" dur="2s" begin="${i * 0.166}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="${i * 0.166}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${x}" cy="${y}" r="10" fill="none" stroke="rgba(85,228,255,0.6)" stroke-width="1">
            <animate attributeName="r" values="10;15;10" dur="2s" begin="${i * 0.166}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" begin="${i * 0.166}s" repeatCount="indefinite"/>
          </circle>
        </g>
      `;
    }).join('')}
    
    <!-- Energy core -->
    <circle cx="300" cy="300" r="50" fill="url(#coreGradient)" filter="url(#premiumGlow)">
      <animate attributeName="r" values="50;55;50" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="300" cy="300" r="30" fill="rgba(216,255,94,0.6)">
      <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
    </circle>
  `;
  
  container.appendChild(svg);
  
  // Add holographic effect overlay
  const holoEffect = document.createElement('div');
  holoEffect.className = 'holo-effect';
  container.appendChild(holoEffect);
}

// 2. PREMIUM AI ATOM - Atomic structure animation
function createPremiumAIAtom(container) {
  if (!container) return;
  
  // Add energy rings
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'energy-ring';
    ring.style.animationDelay = `${i * 1}s`;
    container.appendChild(ring);
  }
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 240 240');
  
  svg.innerHTML = `
    <defs>
      <radialGradient id="atomCore">
        <stop offset="0%" stop-color="rgb(85,228,255)" stop-opacity="1"/>
        <stop offset="100%" stop-color="rgb(216,255,94)" stop-opacity="0.8"/>
      </radialGradient>
      
      <filter id="atomGlow">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Nucleus -->
    <circle cx="120" cy="120" r="20" fill="url(#atomCore)" filter="url(#atomGlow)">
      <animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Electron orbits -->
    ${[0, 60, 120].map(rotation => `
      <g>
        <ellipse cx="120" cy="120" rx="80" ry="40" fill="none" 
                 stroke="rgba(85,228,255,0.5)" stroke-width="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" 
                            from="${rotation} 120 120" to="${rotation + 360} 120 120" 
                            dur="4s" repeatCount="indefinite"/>
        </ellipse>
        
        <!-- Electron -->
        <circle r="6" fill="rgb(216,255,94)" filter="url(#atomGlow)">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#orbit${rotation}"/>
          </animateMotion>
          <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite"/>
        </circle>
        
        <path id="orbit${rotation}" d="M 120,120 m -80,0 a 80,40 0 1,0 160,0 a 80,40 0 1,0 -160,0" 
              fill="none" opacity="0">
          <animateTransform attributeName="transform" type="rotate" 
                            from="${rotation} 120 120" to="${rotation + 360} 120 120" 
                            dur="4s" repeatCount="indefinite"/>
        </path>
      </g>
    `).join('')}
    
    <!-- Particle traces -->
    ${[...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const x = 120 + Math.cos(angle) * 60;
      const y = 120 + Math.sin(angle) * 60;
      return `
        <circle cx="${x}" cy="${y}" r="2" fill="rgba(85,228,255,0.6)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" begin="${i * 0.25}s" repeatCount="indefinite"/>
        </circle>
      `;
    }).join('')}
  `;
  
  container.appendChild(svg);
  
  // Add scan lines effect
  const scanLines = document.createElement('div');
  scanLines.className = 'scan-lines';
  container.appendChild(scanLines);
}

// 3. PREMIUM BINARY SCANNER - Futuristic data visualization
function createPremiumScanner(container) {
  if (!container) return;
  
  // Add light beam
  const beam = document.createElement('div');
  beam.className = 'light-beam';
  container.appendChild(beam);
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 240 240');
  
  const binaryChars = () => Math.random() > 0.5 ? '1' : '0';
  const generateBinary = () => Array(10).fill(0).map(binaryChars).join(' ');
  
  svg.innerHTML = `
    <defs>
      <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(85,228,255,0)" stop-opacity="0"/>
        <stop offset="50%" stop-color="rgba(85,228,255,1)" stop-opacity="1"/>
        <stop offset="100%" stop-color="rgba(85,228,255,0)" stop-opacity="0"/>
      </linearGradient>
      
      <filter id="scanGlow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Frame -->
    <rect x="30" y="30" width="180" height="180" rx="12" 
          fill="rgba(10,20,40,0.7)" stroke="rgba(85,228,255,0.5)" stroke-width="2"/>
    
    <!-- Inner frame -->
    <rect x="40" y="40" width="160" height="160" rx="8" 
          fill="none" stroke="rgba(85,228,255,0.2)" stroke-width="1"/>
    
    <!-- Binary data streams -->
    ${[...Array(8)].map((_, i) => `
      <text x="60" y="${60 + i * 20}" font-family="'Courier New', monospace" 
            font-size="10" fill="rgba(216,255,94,0.8)" letter-spacing="2">
        ${generateBinary()}
        <animate attributeName="opacity" values="0.8;1;0.3;1;0.8" 
                 dur="3s" begin="${i * 0.3}s" repeatCount="indefinite"/>
      </text>
    `).join('')}
    
    <!-- Scan line -->
    <rect x="30" y="40" width="180" height="8" fill="url(#scanGrad)" filter="url(#scanGlow)">
      <animate attributeName="y" values="40;190;40" dur="4s" repeatCount="indefinite"/>
    </rect>
    
    <!-- Corner brackets -->
    ${[
      {x: 30, y: 30, path: 'M 0,20 L 0,0 L 20,0'},
      {x: 190, y: 30, path: 'M 20,0 L 0,0 L 0,20'},
      {x: 30, y: 190, path: 'M 0,0 L 0,20 L 20,20'},
      {x: 190, y: 190, path: 'M 0,20 L 20,20 L 20,0'}
    ].map(bracket => `
      <path d="${bracket.path}" transform="translate(${bracket.x}, ${bracket.y})" 
            stroke="rgb(85,228,255)" stroke-width="3" fill="none" stroke-linecap="round">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
      </path>
    `).join('')}
    
    <!-- Center crosshair -->
    <circle cx="120" cy="120" r="15" fill="none" stroke="rgba(85,228,255,0.6)" stroke-width="1">
      <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite"/>
    </circle>
    <line x1="120" y1="105" x2="120" y2="135" stroke="rgba(85,228,255,0.6)" stroke-width="1"/>
    <line x1="105" y1="120" x2="135" y2="120" stroke="rgba(85,228,255,0.6)" stroke-width="1"/>
  `;
  
  container.appendChild(svg);
  
  // Add holographic overlay
  const holo = document.createElement('div');
  holo.className = 'holo-effect';
  container.appendChild(holo);
}

// Initialize all premium visuals
function initPremiumVisuals() {
  console.log('🎨 Initializing premium visuals...');
  
  // 1. Hero globe
  createPremiumGlobe();
  
  // 2. AI Apps atom
  const aiContainer = document.querySelector('.product-card.ai .orbital-art');
  if (aiContainer) {
    createPremiumAIAtom(aiContainer);
  }
  
  // 3. Mobile Apps scanner
  const scanContainer = document.querySelector('.product-card.mobile .scan-art');
  if (scanContainer) {
    createPremiumScanner(scanContainer);
  }
  
  console.log('✅ Premium visuals loaded successfully!');
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPremiumVisuals);
} else {
  initPremiumVisuals();
}
