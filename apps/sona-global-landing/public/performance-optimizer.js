/**
 * PERFORMANCE OPTIMIZER V1.0
 * Optimizes SONA-GLOBAL website performance for all devices
 */

class PerformanceOptimizer {
  constructor() {
    this.isLowEndDevice = this.detectLowEndDevice();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.connectionSpeed = this.getConnectionSpeed();
    this.deviceCapabilities = this.getDeviceCapabilities();
    
    this.init();
  }
  
  // ============================================
  // DEVICE CAPABILITY DETECTION
  // ============================================
  detectLowEndDevice() {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const ua = navigator.userAgent.toLowerCase();
    
    // Low-end indicators
    if (memory <= 2) return true;
    if (cores <= 2) return true;
    if (/android [1-5]\.|android 6\.0/i.test(ua)) return true;
    if (/iphone os [1-9]_|iphone os 10_/i.test(ua)) return true;
    
    return false;
  }
  
  getConnectionSpeed() {
    if (!navigator.connection) return 'unknown';
    
    const conn = navigator.connection;
    if (conn.saveData) return 'slow';
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return 'slow';
    if (conn.effectiveType === '3g') return 'medium';
    return 'fast';
  }
  
  getDeviceCapabilities() {
    return {
      supportsWebGL: !!window.WebGLRenderingContext,
      supportsWebGL2: !!window.WebGL2RenderingContext,
      supportsOffscreenCanvas: !!window.OffscreenCanvas,
      supportsIntersectionObserver: !!window.IntersectionObserver,
      supportsRequestIdleCallback: !!window.requestIdleCallback,
      isMobile: /Android|iPhone|iPad/i.test(navigator.userAgent),
      isRetina: window.devicePixelRatio > 1
    };
  }
  
  // ============================================
  // ADAPTIVE PERFORMANCE SETTINGS
  // ============================================
  getOptimalSettings() {
    const settings = {
      particleCount: 80,
      animationFPS: 60,
      enableFilters: true,
      enableShadows: true,
      enableBlur: true,
      enableParticles: true,
      enableHeavyAnimations: true,
      lazyLoadDelay: 0
    };
    
    // Low-end device optimizations
    if (this.isLowEndDevice) {
      settings.particleCount = 20;
      settings.animationFPS = 30;
      settings.enableFilters = false;
      settings.enableShadows = false;
      settings.enableBlur = false;
      settings.lazyLoadDelay = 500;
    }
    
    // Slow connection optimizations
    if (this.connectionSpeed === 'slow') {
      settings.enableParticles = false;
      settings.enableHeavyAnimations = false;
      settings.lazyLoadDelay = 1000;
    }
    
    // Mobile optimizations
    if (this.deviceCapabilities.isMobile) {
      settings.particleCount = Math.min(settings.particleCount, 30);
      settings.animationFPS = Math.min(settings.animationFPS, 30);
    }
    
    // Reduced motion preference
    if (this.isReducedMotion) {
      settings.enableParticles = false;
      settings.enableHeavyAnimations = false;
      settings.animationFPS = 0;
    }
    
    return settings;
  }
  
  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  init() {
    this.settings = this.getOptimalSettings();
    
    this.optimizeCSS();
    this.optimizeJavaScript();
    this.optimizeImages();
    this.optimizeAnimations();
    this.setupLazyLoading();
    this.setupFrameThrottling();
    
    console.log('🚀 Performance Optimizer loaded:', this.settings);
  }
  
  optimizeCSS() {
    const style = document.createElement('style');
    const css = `
      /* Disable expensive effects on low-end devices */
      ${!this.settings.enableFilters ? `
        .brain-overlay-svg, .ai-atom-visual, .scanner-visual,
        .premium-globe, .neural-particle, .data-pulse {
          filter: none !important;
        }
      ` : ''}
      
      ${!this.settings.enableShadows ? `
        .apero-product-card, .metric-card, .ai-brain-hero,
        .product-orbit, .stats-visual {
          box-shadow: none !important;
          drop-shadow: none !important;
        }
      ` : ''}
      
      ${!this.settings.enableBlur ? `
        .brain-effects-overlay, .glassmorphism,
        .hero-art::before, .section::before {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      ` : ''}
      
      /* GPU acceleration for transforms */
      .neural-particle, .data-pulse, .scan-line,
      .apero-product-card, .product-orbit img {
        will-change: transform;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transform: translate3d(0,0,0);
      }
      
      /* Optimize text rendering */
      body {
        text-rendering: optimizeSpeed;
        -webkit-font-smoothing: subpixel-antialiased;
      }
      
      /* Reduce repaints */
      .site-header, .site-footer {
        contain: layout style paint;
      }
    `;
    
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  optimizeJavaScript() {
    // Throttle scroll events
    let scrollRAF = null;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
      if (scrollRAF) return;
      scrollRAF = requestAnimationFrame(() => {
        if (originalScrollHandler) originalScrollHandler();
        scrollRAF = null;
      });
    }, { passive: true });
    
    // Optimize resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('optimizedResize'));
      }, 250);
    });
  }
  
  optimizeImages() {
    // Progressive image loading
    const images = document.querySelectorAll('img[data-src]');
    
    if (this.deviceCapabilities.supportsIntersectionObserver) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: this.connectionSpeed === 'slow' ? '50px' : '200px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for old browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
  
  optimizeAnimations() {
    if (!this.settings.enableHeavyAnimations) {
      // Disable heavy CSS animations
      const style = document.createElement('style');
      style.textContent = `
        .neural-particle, .data-pulse, .scan-line,
        .connection-line, .brain-outline-pulse,
        .premium-globe, .ai-atom-visual {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    if (!this.settings.enableParticles) {
      // Remove particle canvas
      const canvas = document.getElementById('particle-canvas');
      if (canvas) canvas.remove();
    }
  }
  
  setupLazyLoading() {
    // Lazy load heavy visual components
    const heavyComponents = document.querySelectorAll(
      '.ai-brain-hero, .apero-products, .orbital-art, .scan-art'
    );
    
    if (this.deviceCapabilities.supportsIntersectionObserver) {
      const componentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('loaded');
              this.initComponent(entry.target);
            }, this.settings.lazyLoadDelay);
            
            componentObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '100px'
      });
      
      heavyComponents.forEach(comp => {
        comp.style.opacity = '0';
        comp.style.transition = 'opacity 0.5s ease';
        componentObserver.observe(comp);
      });
    } else {
      // Load immediately for old browsers
      heavyComponents.forEach(comp => this.initComponent(comp));
    }
  }
  
  initComponent(element) {
    element.style.opacity = '1';
    
    // Initialize specific components based on class
    if (element.classList.contains('ai-brain-hero')) {
      this.initOptimizedBrainEffects(element);
    }
    if (element.classList.contains('apero-products')) {
      this.initOptimizedProducts(element);
    }
  }
  
  setupFrameThrottling() {
    // Throttle animations to optimal FPS
    if (this.settings.animationFPS > 0 && this.settings.animationFPS < 60) {
      const frameInterval = 1000 / this.settings.animationFPS;
      let lastFrameTime = 0;
      
      const originalRAF = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) => {
        return originalRAF((currentTime) => {
          if (currentTime - lastFrameTime >= frameInterval) {
            lastFrameTime = currentTime;
            callback(currentTime);
          } else {
            window.requestAnimationFrame(callback);
          }
        });
      };
    }
  }
  
  // ============================================
  // OPTIMIZED COMPONENT INITIALIZERS
  // ============================================
  initOptimizedBrainEffects(container) {
    const particleCount = Math.min(6, this.settings.particleCount / 10);
    
    // Only create essential particles
    for (let i = 0; i < particleCount; i++) {
      const particle = container.querySelector(`.np${i + 1}`);
      if (particle && this.settings.enableParticles) {
        particle.style.animation = `neuralFloat ${4 + i}s ease-in-out infinite`;
      } else if (particle) {
        particle.remove();
      }
    }
    
    // Remove heavy scan lines on low-end devices
    if (!this.settings.enableHeavyAnimations) {
      container.querySelectorAll('.scan-line').forEach(line => line.remove());
    }
  }
  
  initOptimizedProducts(container) {
    const cards = container.querySelectorAll('.apero-product-card');
    
    if (this.deviceCapabilities.isMobile) {
      // Disable complex 3D transforms on mobile
      cards.forEach(card => {
        card.style.transform = 'none';
        card.addEventListener('touchstart', () => {
          card.style.transform = 'scale(0.95)';
        });
        card.addEventListener('touchend', () => {
          card.style.transform = 'none';
        });
      });
    }
  }
  
  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  monitorPerformance() {
    if (!window.performance) return;
    
    // Monitor FPS
    let lastTime = performance.now();
    let frameCount = 0;
    
    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30 && this.settings.animationFPS > 30) {
          console.warn('🐌 Low FPS detected, reducing animation complexity');
          this.reducePerfLevel();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }
  
  reducePerfLevel() {
    // Emergency performance reduction
    this.settings.particleCount = Math.max(10, this.settings.particleCount * 0.5);
    this.settings.animationFPS = Math.max(15, this.settings.animationFPS * 0.75);
    this.settings.enableFilters = false;
    
    // Apply reduced settings
    this.optimizeCSS();
    console.log('⚡ Emergency performance mode activated');
  }
  
  // ============================================
  // MEMORY MANAGEMENT
  // ============================================
  cleanup() {
    // Clean up event listeners and timers
    const intervals = window.intervals || [];
    intervals.forEach(id => clearInterval(id));
    
    const timeouts = window.timeouts || [];
    timeouts.forEach(id => clearTimeout(id));
    
    // Clear animation frames
    const animFrames = window.animFrames || [];
    animFrames.forEach(id => cancelAnimationFrame(id));
  }
  
  // ============================================
  // BATTERY OPTIMIZATION
  // ============================================
  initBatteryOptimization() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const handleBatteryChange = () => {
          if (battery.level < 0.2 || !battery.charging) {
            // Low battery mode
            this.settings.enableParticles = false;
            this.settings.enableHeavyAnimations = false;
            this.settings.animationFPS = 15;
            
            console.log('🔋 Battery saver mode activated');
            this.optimizeAnimations();
          }
        };
        
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
        handleBatteryChange();
      });
    }
  }
}

// ============================================
// NETWORK-AWARE OPTIMIZATIONS
// ============================================
class NetworkOptimizer {
  constructor() {
    this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    this.init();
  }
  
  init() {
    if (!this.connection) return;
    
    this.optimizeForConnection();
    this.connection.addEventListener('change', () => this.optimizeForConnection());
  }
  
  optimizeForConnection() {
    const effectiveType = this.connection.effectiveType;
    const saveData = this.connection.saveData;
    
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      // Disable heavy resources
      this.disableHeavyContent();
    } else if (effectiveType === '3g') {
      // Reduce quality
      this.reduceQuality();
    }
    // 4g and above - full quality
  }
  
  disableHeavyContent() {
    // Remove particle canvas
    const canvas = document.getElementById('particle-canvas');
    if (canvas) canvas.remove();
    
    // Replace videos with static images
    document.querySelectorAll('video').forEach(video => {
      const img = document.createElement('img');
      img.src = video.poster;
      img.className = video.className;
      video.parentNode.replaceChild(img, video);
    });
    
    // Disable autoplay animations
    document.documentElement.classList.add('disable-autoplay');
  }
  
  reduceQuality() {
    // Use lower resolution images
    document.querySelectorAll('img[data-src-hq]').forEach(img => {
      if (img.dataset.srcLq) {
        img.dataset.src = img.dataset.srcLq;
      }
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
let perfOptimizer, networkOptimizer;

function initPerformanceOptimizers() {
  perfOptimizer = new PerformanceOptimizer();
  networkOptimizer = new NetworkOptimizer();
  
  // Monitor performance
  perfOptimizer.monitorPerformance();
  perfOptimizer.initBatteryOptimization();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (perfOptimizer) perfOptimizer.cleanup();
  });
  
  // Expose to global for debugging
  window.perfOptimizer = perfOptimizer;
  window.networkOptimizer = networkOptimizer;
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerformanceOptimizers);
} else {
  initPerformanceOptimizers();
}

export { PerformanceOptimizer, NetworkOptimizer };