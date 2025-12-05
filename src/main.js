/**
 * Oasis - Main Entry Point
 *
 * This file bridges modern ES modules with the legacy codebase.
 * As we modernize, more functionality will move here.
 */

// Import modern experiences
import FireflyTown from './experiences/FireflyTown.js';

// Create instances and expose to global scope for legacy compatibility
const fireflyTown = new FireflyTown();

// Expose to window for legacy minify.js to use
window.FireflyTown = {
  init: (el) => fireflyTown.init(el),
  start: () => fireflyTown.start(),
  dispose: () => fireflyTown.dispose(),
  pause: () => fireflyTown.pause(),
  resume: () => fireflyTown.resume(),
};

// Log that modern modules are loaded
console.log('[Oasis] Modern modules loaded');

// Export for potential future use
export { fireflyTown };
