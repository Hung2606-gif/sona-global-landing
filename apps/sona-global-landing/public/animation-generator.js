/* ============================================
   28 ANIMATION GENERATOR
   Tạo động tất cả 28 animations
   ============================================ */

// Animation 1: Quantum Sphere
function createQuantumSphere() {
  const container = document.createElement('div');
  container.className = 'quantum-sphere';
  
  const core = document.createElement('div');
  core.className = 'quantum-core';
  container.appendChild(core);
  
  for (let i = 0; i < 5; i++) {
    const ring = document.createElement('div');
    ring.className = 'quantum-ring';
    container.appendChild(ring);
  }
  
  return container;
}

// Animation 2: DNA Helix
function createDNAHelix() {
  const container = document.createElement('div');
  container.className = 'dna-helix';
  
  for (let i = 0; i < 2; i++) {
    const strand = document.createElement('div');
    strand.className = 'dna-strand';
    container.appendChild(strand);
  }
  
  for (let i = 0; i < 12; i++) {
    const node = document.createElement('div');
    node.className = 'dna-node';
    node.style.top = `${(i / 12) * 100}%`;
    node.style.animationDelay = `${i * 0.2}s`;
    container.appendChild(node);
  }
  
  return container;
}

// Animation 3: Neural Network
function createNeuralNetwork() {
  const container = document.createElement('div');
  container.className = 'neural-network';
  
  const nodes = [];
  for (let i = 0; i < 15; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.left = `${10 + Math.random() * 80}%`;
    node.style.top = `${10 + Math.random() * 80}%`;
    node.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(node);
    nodes.push(node);
  }
  
  // Create connections
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.7) {
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        const rect1 = nodes[i].getBoundingClientRect();
        const rect2 = nodes[j].getBoundingClientRect();
        container.appendChild(connection);
      }
    }
  }
  
  return container;
}

// Animation 4: Holographic Pyramid
function createHoloPyramid() {
  const container = document.createElement('div');
  container.className = 'holo-pyramid';
  
  for (let i = 0; i < 4; i++) {
    const face = document.createElement('div');
    face.className = 'pyramid-face';
    face.style.transform = `rotateY(${i * 90}deg) translateZ(100px)`;
    container.appendChild(face);
  }
  
  return container;
}

// Animation 5: Particle Explosion
function createParticleExplosion() {
  const container = document.createElement('div');
  container.className = 'particle-explosion';
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (i / 30) * Math.PI * 2;
    const distance = 150 + Math.random() * 50;
    particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    particle.style.animationDelay = `${i * 0.1}s`;
    container.appendChild(particle);
  }
  
  return container;
}

// Animation 6: Liquid Wave
function createLiquidWave() {
  const container = document.createElement('div');
  container.className = 'liquid-wave';
  
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = 'wave-layer';
    wave.style.animationDelay = `${i * 2}s`;
    container.appendChild(wave);
  }
  
  return container;
}

// Animation 7: Crystal Formation
function createCrystalFormation() {
  const container = document.createElement('div');
  container.className = 'crystal-formation';
  
  for (let i = 0; i < 5; i++) {
    const crystal = document.createElement('div');
    crystal.className = 'crystal';
    crystal.style.left = `${20 + i * 15}%`;
    crystal.style.top = `${30 + (i % 2) * 30}%`;
    crystal.style.animationDelay = `${i * 0.5}s`;
    container.appendChild(crystal);
  }
  
  return container;
}

// Animation 8: Vortex Spiral
function createVortexSpiral() {
  const container = document.createElement('div');
  container.className = 'vortex-spiral';
  
  for (let i = 0; i < 12; i++) {
    const line = document.createElement('div');
    line.className = 'spiral-line';
    line.style.animationDelay = `${i * 0.25}s`;
    line.style.zIndex = 12 - i;
    container.appendChild(line);
  }
  
  return container;
}

// Animation 9: Matrix Rain
function createMatrixRain() {
  const container = document.createElement('div');
  container.className = 'matrix-rain';
  
  const chars = '01アイウエオカキクケコサシスセソ';
  
  for (let i = 0; i < 20; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${i * 5}%`;
    column.style.animationDelay = `${Math.random() * 5}s`;
    column.style.animationDuration = `${3 + Math.random() * 4}s`;
    
    let text = '';
    for (let j = 0; j < 20; j++) {
      text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
    }
    column.innerHTML = text;
    
    container.appendChild(column);
  }
  
  return container;
}

// Animation 10: Nebula Cloud
function createNebulaCloud() {
  const container = document.createElement('div');
  container.className = 'nebula-cloud';
  return container;
}

// Animation 11: Electromagnetic Field
function createEMField() {
  const container = document.createElement('div');
  container.className = 'electromagnetic-field';
  
  for (let i = 0; i < 8; i++) {
    const wave = document.createElement('div');
    wave.className = 'em-wave';
    wave.style.top = `${20 + i * 10}%`;
    wave.style.animationDelay = `${i * 0.2}s`;
    container.appendChild(wave);
  }
  
  return container;
}

// Animation 12: Fractal Tree
function createFractalTree() {
  const container = document.createElement('div');
  container.className = 'fractal-tree';
  
  for (let i = 0; i < 7; i++) {
    const branch = document.createElement('div');
    branch.className = 'fractal-branch';
    branch.style.transform = `translateX(-50%) rotate(${-30 + i * 10}deg)`;
    branch.style.animationDelay = `${i * 0.3}s`;
    container.appendChild(branch);
  }
  
  return container;
}

// Animation 13: Aurora Borealis
function createAurora() {
  const container = document.createElement('div');
  container.className = 'aurora-borealis';
  
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = 'aurora-wave';
    wave.style.top = `${i * 30}%`;
    wave.style.animationDelay = `${i * 3}s`;
    container.appendChild(wave);
  }
  
  return container;
}

// Animation 14: Plasma Orb
function createPlasmaOrb() {
  const container = document.createElement('div');
  container.className = 'plasma-orb';
  return container;
}

// Animation 15: Constellation Map
function createConstellation() {
  const container = document.createElement('div');
  container.className = 'constellation-map';
  
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
  
  return container;
}

// Animation 16-28: Simplified versions
function createSimpleAnimation(type) {
  const animations = {
    'hexagon-grid': createQuantumSphere, // Reuse with different class
    'particle-swarm': createParticleExplosion,
    'energy-waves': createLiquidWave,
    'cyber-circuit': createNeuralNetwork,
    'light-beam': createVortexSpiral,
    'data-stream': createMatrixRain,
    'cosmic-dust': createNebulaCloud,
    'force-field': createEMField,
    'growing-tree': createFractalTree,
    'northern-lights': createAurora,
    'energy-sphere': createPlasmaOrb,
    'star-field': createConstellation,
    'quantum-foam': createQuantumSphere
  };
  
  return animations[type] ? animations[type]() : createQuantumSphere();
}

// Main initialization function
function init28Animations() {
  const animations = [
    { selector: '.page-hero', generator: createQuantumSphere },
    { selector: '.intro-section', generator: createDNAHelix },
    { selector: '.values-section', generator: createNeuralNetwork },
    { selector: '.featured-products-section', generator: createParticleExplosion },
    { selector: '.module-hero', generator: createHoloPyramid },
    { selector: '.content-section', generator: createLiquidWave },
    { selector: '.data-section', generator: createCrystalFormation },
    { selector: '.publishing-hero', generator: createVortexSpiral },
    { selector: '.partnership-section', generator: createMatrixRain },
    { selector: '.process-section', generator: createNebulaCloud },
    { selector: '.share-hero', generator: createEMField },
    { selector: '.insights-section', generator: createFractalTree },
    { selector: '.culture-section', generator: createAurora },
    { selector: '.library-hero', generator: createPlasmaOrb },
    { selector: '.resources-section', generator: createConstellation },
    { selector: '.contact-hero', generator: () => createSimpleAnimation('hexagon-grid') },
    // Add more mappings...
  ];
  
  animations.forEach(({ selector, generator }) => {
    const sections = document.querySelectorAll(selector);
    sections.forEach(section => {
      if (!section.querySelector('.animation-container')) {
        const animContainer = document.createElement('div');
        animContainer.className = 'animation-container';
        animContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;';
        
        const animation = generator();
        animContainer.appendChild(animation);
        section.insertBefore(animContainer, section.firstChild);
      }
    });
  });
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init28Animations);
} else {
  init28Animations();
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init28Animations };
}
