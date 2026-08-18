/* ============================================
   SONA-GLOBAL VISUAL SYSTEM
   Thay thế TẤT CẢ ảnh tĩnh bằng SVG animations
   ============================================ */

// 1. THAY THẾ GLOBE-SPHERE: Animated 3D Globe
function createHeroGlobe() {
  const container = document.getElementById('hero-visual');
  if (!container) return;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 500 500');
  svg.setAttribute('style', 'width: 100%; max-width: 500px; height: auto;');
  
  svg.innerHTML = `
    <defs>
      <radialGradient id="globeGradient">
        <stop offset="0%" style="stop-color:rgb(85,228,255);stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:rgb(0,100,200);stop-opacity:0.1" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Main globe sphere -->
    <circle cx="250" cy="250" r="150" fill="url(#globeGradient)" opacity="0.4" filter="url(#glow)">
      <animate attributeName="r" values="150;155;150" dur="4s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Orbital rings -->
    <ellipse cx="250" cy="250" rx="180" ry="80" fill="none" stroke="rgba(85,228,255,0.3)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="250" cy="250" rx="180" ry="80" fill="none" stroke="rgba(216,255,94,0.3)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="60 250 250" to="420 250 250" dur="15s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="250" cy="250" rx="180" ry="80" fill="none" stroke="rgba(85,228,255,0.2)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="-60 250 250" to="300 250 250" dur="25s" repeatCount="indefinite"/>
    </ellipse>
    
    <!-- Connection nodes -->
    ${[...Array(8)].map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const x = 250 + Math.cos(angle) * 150;
      const y = 250 + Math.sin(angle) * 150;
      return `
        <circle cx="${x}" cy="${y}" r="4" fill="#d8ff5e" opacity="0.8">
          <animate attributeName="r" values="4;6;4" dur="2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#55e4ff" stroke-width="1" opacity="0.5">
          <animate attributeName="r" values="8;12;8" dur="2s" begin="${i * 0.25}s" repeatCount="indefinite"/>
        </circle>
      `;
    }).join('')}
    
    <!-- Center core -->
    <circle cx="250" cy="250" r="40" fill="rgba(216,255,94,0.4)" filter="url(#glow)">
      <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite"/>
    </circle>
  `;
  
  container.appendChild(svg);
}

// 2. THAY THẾ ORBITAL-ART: AI Atom Animation  
function createAIAtom(container) {
  if (!container) return;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('style', 'width: 120px; height: 120px;');
  
  svg.innerHTML = `
    <defs>
      <radialGradient id="coreGlow">
        <stop offset="0%" style="stop-color:#55e4ff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#d8ff5e;stop-opacity:0.6" />
      </radialGradient>
    </defs>
    
    <!-- Central core -->
    <circle cx="100" cy="100" r="15" fill="url(#coreGlow)">
      <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Electron orbits -->
    <ellipse cx="100" cy="100" rx="60" ry="30" fill="none" stroke="rgba(85,228,255,0.4)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="3s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="100" cy="100" rx="60" ry="30" fill="none" stroke="rgba(85,228,255,0.4)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="60 100 100" to="420 100 100" dur="3s" repeatCount="indefinite"/>
    </ellipse>
    
    <ellipse cx="100" cy="100" rx="60" ry="30" fill="none" stroke="rgba(85,228,255,0.4)" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" from="120 100 100" to="480 100 100" dur="3s" repeatCount="indefinite"/>
    </ellipse>
    
    <!-- Electrons -->
    ${[0, 120, 240].map(deg => `
      <circle r="5" fill="#d8ff5e">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 100,100 m -60,0 a 60,30 0 1,0 120,0 a 60,30 0 1,0 -120,0">
          <animateTransform attributeName="transform" type="rotate" from="${deg} 100 100" to="${deg} 100 100" dur="0s"/>
        </animateMotion>
      </circle>
    `).join('')}
  `;
  
  container.innerHTML = '';
  container.appendChild(svg);
}

// 3. THAY THẾ SCAN-ART: Binary Code Scanner
function createBinaryScanner(container) {
  if (!container) return;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('style', 'width: 120px; height: 120px;');
  
  svg.innerHTML = `
    <defs>
      <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(85,228,255,0);stop-opacity:0" />
        <stop offset="50%" style="stop-color:rgba(85,228,255,0.8);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgba(85,228,255,0);stop-opacity:0" />
      </linearGradient>
    </defs>
    
    <!-- Frame border -->
    <rect x="30" y="30" width="140" height="140" fill="rgba(10,20,40,0.5)" stroke="rgba(85,228,255,0.3)" stroke-width="2" rx="8"/>
    
    <!-- Binary code lines -->
    ${[...Array(6)].map((_, i) => `
      <text x="50" y="${50 + i * 20}" font-family="monospace" font-size="12" fill="rgba(216,255,94,0.6)">
        ${Math.random().toString(2).substr(2, 8)}
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" begin="${i * 0.2}s" repeatCount="indefinite"/>
      </text>
    `).join('')}
    
    <!-- Scan line -->
    <rect x="30" y="30" width="140" height="10" fill="url(#scanGradient)">
      <animate attributeName="y" values="30;160;30" dur="3s" repeatCount="indefinite"/>
    </rect>
    
    <!-- Corner markers -->
    <path d="M 30,30 L 50,30 M 30,30 L 30,50" stroke="#55e4ff" stroke-width="3" stroke-linecap="round"/>
    <path d="M 170,30 L 150,30 M 170,30 L 170,50" stroke="#55e4ff" stroke-width="3" stroke-linecap="round"/>
    <path d="M 30,170 L 50,170 M 30,170 L 30,150" stroke="#55e4ff" stroke-width="3" stroke-linecap="round"/>
    <path d="M 170,170 L 150,170 M 170,170 L 170,150" stroke="#55e4ff" stroke-width="3" stroke-linecap="round"/>
  `;
  
  container.innerHTML = '';
  container.appendChild(svg);
}

// Initialize all visuals
function initVisuals() {
  // 1. Hero globe
  createHeroGlobe();
  
  // 2. AI Apps atom (ecosystem page)
  const aiCard = document.querySelector('.product-card.ai .orbital-art');
  if (aiCard) {
    createAIAtom(aiCard);
  }
  
  // 3. Mobile Apps scanner (ecosystem page)
  const mobileCard = document.querySelector('.product-card.mobile .scan-art');
  if (mobileCard) {
    createBinaryScanner(mobileCard);
  }
  
  console.log('✅ All visual effects loaded');
}

// Auto-run when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisuals);
} else {
  initVisuals();
}
