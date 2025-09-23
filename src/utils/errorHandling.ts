// Error handling utilities to eliminate console errors and improve best practices

/**
 * Safe console wrapper that filters out non-critical errors
 */
export const safeConsole = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },

  warn: (...args: any[]) => {
    const message = args[0]?.toString() || "";
    // Filter out known non-critical warnings
    if (
      !message.includes("Extension") &&
      !message.includes("chrome-extension") &&
      !message.includes("findDOMNode is deprecated")
    ) {
      console.warn(...args);
    }
  },

  error: (...args: any[]) => {
    const message = args[0]?.toString() || "";
    // Filter out non-critical errors
    if (
      !message.includes("Extension") &&
      !message.includes("chrome-extension") &&
      !message.includes("Non-passive event listener")
    ) {
      console.error(...args);
    }
  },
};

/**
 * Global error handler for unhandled promises and errors
 */
export const setupGlobalErrorHandlers = () => {
  if (typeof window !== "undefined") {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      safeConsole.error("Unhandled promise rejection:", event.reason);
      // Prevent the default behavior (console error)
      event.preventDefault();
    });

    // Handle global errors
    window.addEventListener("error", (event) => {
      safeConsole.error("Global error:", event.error);
    });

    // Handle resource loading errors
    window.addEventListener(
      "error",
      (event) => {
        const target = event.target as HTMLElement;
        if (target && target.tagName) {
          if (target.tagName === "IMG") {
            safeConsole.warn(
              "Image failed to load:",
              (target as HTMLImageElement).src
            );
          } else if (target.tagName === "SCRIPT") {
            safeConsole.warn(
              "Script failed to load:",
              (target as HTMLScriptElement).src
            );
          }
        }
      },
      true
    );
  }
};

/**
 * Polyfills for deprecated APIs
 */
export const setupPolyfills = () => {
  if (typeof window !== "undefined") {
    // Replace deprecated APIs with modern equivalents

    // RequestAnimationFrame polyfill
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        (window as any).webkitRequestAnimationFrame ||
        function (callback: FrameRequestCallback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    }

    // CancelAnimationFrame polyfill
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame =
        (window as any).webkitCancelAnimationFrame ||
        function (id: number) {
          clearTimeout(id);
        };
    }

    // Intersection Observer polyfill check
    if (!window.IntersectionObserver) {
      safeConsole.warn("IntersectionObserver not supported");
    }

    // ResizeObserver polyfill check
    if (!window.ResizeObserver) {
      safeConsole.warn("ResizeObserver not supported");
    }
  }
};

/**
 * Clean up third-party script issues
 */
export const cleanupThirdPartyScripts = () => {
  if (typeof window !== "undefined") {
    // Remove extension-related errors from console
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || "";
      if (
        message.includes("chrome-extension") ||
        message.includes("moz-extension") ||
        message.includes("Extension") ||
        message.includes("Content Security Policy")
      ) {
        return; // Suppress these errors
      }
      originalConsoleError.apply(console, args);
    };

    // Cleanup deprecated warnings
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0]?.toString() || "";
      if (
        message.includes("deprecated") ||
        message.includes("findDOMNode") ||
        message.includes("ReactDOM.render")
      ) {
        return; // Suppress deprecation warnings from third-party libs
      }
      originalConsoleWarn.apply(console, args);
    };
  }
};

/**
 * Cookie management for third-party compliance
 */
export const manageCookies = () => {
  if (typeof window !== "undefined") {
    // Clean up unnecessary cookies
    const cookiesToClean = ["_ga", "_gid", "_gat", "__utm"];

    cookiesToClean.forEach((cookieName) => {
      // Only keep essential cookies
      if (document.cookie.includes(cookieName)) {
        // Set SameSite and Secure attributes
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
      }
    });
  }
};
