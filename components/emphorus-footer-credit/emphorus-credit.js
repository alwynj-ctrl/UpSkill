/**
 * Emphorus Footer Credit Component - Vanilla JavaScript
 * 
 * Usage:
 * 1. Include this script: <script src="emphorus-credit.js"></script>
 * 2. Include the CSS: <link rel="stylesheet" href="emphorus-credit.css">
 * 3. Add container: <div id="emphorus-credit"></div>
 * 4. Initialize: EmphorusCredit.init('#emphorus-credit');
 */

const EmphorusCredit = {
  /**
   * Initialize the Emphorus credit component
   * @param {string} selector - CSS selector for the container element
   * @param {Object} options - Configuration options
   * @param {string} options.url - URL to open on click (default: https://www.emphorus.in)
   * @param {string} options.text - Text to display (default: "Crafted with")
   * @param {string} options.brandName - Brand name (default: "Emphorus")
   */
  init: function(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) {
      console.error(`Emphorus Credit: Container "${selector}" not found`);
      return;
    }

    const config = {
      url: options.url || 'https://www.emphorus.in',
      text: options.text || 'Crafted with',
      brandName: options.brandName || 'Emphorus'
    };

    const logoSvg = `
      <svg width="50" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="emphorus-logo" aria-label="Emphorus Logo">
        <defs>
          <linearGradient id="emphorus-logo-gradient-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a5568" />
            <stop offset="20%" stop-color="#6b7280" />
            <stop offset="40%" stop-color="#8b7a8b" />
            <stop offset="60%" stop-color="#b88a8a" />
            <stop offset="80%" stop-color="#d4958d" />
            <stop offset="100%" stop-color="#e8a798" />
          </linearGradient>
        </defs>
        <path d="M256 50 L406 140 L406 320 L256 410 L106 320 L106 140 Z" fill="url(#emphorus-logo-gradient-${Date.now()})" opacity="0.2" class="emphorus-logo-bg"/>
        <path d="M256 80 L380 150 L380 290 L256 360 L132 290 L132 150 Z" stroke="url(#emphorus-logo-gradient-${Date.now()})" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" class="emphorus-logo-outline"/>
        <path d="M256 220 L290 256 L256 292 L222 256 Z" fill="url(#emphorus-logo-gradient-${Date.now()})" class="emphorus-logo-gem"/>
        <path d="M256 292 L256 340" stroke="url(#emphorus-logo-gradient-${Date.now()})" stroke-width="12" stroke-linecap="round" class="emphorus-logo-stem"/>
      </svg>
    `;

    const html = `
      <div class="emphorus-credit-container">
        <a 
          href="${config.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="emphorus-credit-link"
        >
          <div class="emphorus-credit-wrapper">
            <div class="emphorus-credit-text">
              ${config.text} <span class="emphorus-heart">♥</span> by <span class="emphorus-logo-container">${logoSvg}</span>
            </div>
            <div class="emphorus-motionblur">
              <div class="emphorus-motion-box">
                <div class="emphorus-fireball-core"></div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;

    container.innerHTML = html;
  },

  /**
   * Create and return the component as an HTML string
   * @param {Object} options - Configuration options
   * @returns {string} HTML string
   */
  render: function(options = {}) {
    const config = {
      url: options.url || 'https://www.emphorus.in',
      text: options.text || 'Crafted with',
      brandName: options.brandName || 'Emphorus'
    };

    const uniqueId = Date.now() + Math.random();
    const logoSvg = `
      <svg width="50" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" class="emphorus-logo" aria-label="Emphorus Logo">
        <defs>
          <linearGradient id="emphorus-logo-gradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a5568" />
            <stop offset="20%" stop-color="#6b7280" />
            <stop offset="40%" stop-color="#8b7a8b" />
            <stop offset="60%" stop-color="#b88a8a" />
            <stop offset="80%" stop-color="#d4958d" />
            <stop offset="100%" stop-color="#e8a798" />
          </linearGradient>
        </defs>
        <path d="M256 50 L406 140 L406 320 L256 410 L106 320 L106 140 Z" fill="url(#emphorus-logo-gradient-${uniqueId})" opacity="0.2" class="emphorus-logo-bg"/>
        <path d="M256 80 L380 150 L380 290 L256 360 L132 290 L132 150 Z" stroke="url(#emphorus-logo-gradient-${uniqueId})" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" class="emphorus-logo-outline"/>
        <path d="M256 220 L290 256 L256 292 L222 256 Z" fill="url(#emphorus-logo-gradient-${uniqueId})" class="emphorus-logo-gem"/>
        <path d="M256 292 L256 340" stroke="url(#emphorus-logo-gradient-${uniqueId})" stroke-width="12" stroke-linecap="round" class="emphorus-logo-stem"/>
      </svg>
    `;

    return `
      <div class="emphorus-credit-container">
        <a 
          href="${config.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="emphorus-credit-link"
        >
          <div class="emphorus-credit-wrapper">
            <div class="emphorus-credit-text">
              ${config.text} <span class="emphorus-heart">♥</span> by <span class="emphorus-logo-container">${logoSvg}</span>
            </div>
            <div class="emphorus-motionblur">
              <div class="emphorus-motion-box">
                <div class="emphorus-fireball-core"></div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }
};

// Auto-initialize if data attribute is present
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const autoInit = document.querySelector('[data-emphorus-credit]');
    if (autoInit) {
      const url = autoInit.getAttribute('data-url');
      const text = autoInit.getAttribute('data-text');
      const brandName = autoInit.getAttribute('data-brand');
      
      EmphorusCredit.init('[data-emphorus-credit]', {
        url: url,
        text: text,
        brandName: brandName
      });
    }
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmphorusCredit;
}

