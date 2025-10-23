
/**
 * Safe console wrapper that filters out non-critical errors
 */
export const safeConsole = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {

    }
  },

  warn: (...args: any[]) => {
    const message = args[0]?.toString() || "";
    if (
      !message.includes("Extension") &&
      !message.includes("chrome-extension") &&
      !message.includes("findDOMNode is deprecated")
    ) {

    }
  },

  error: (...args: any[]) => {
    const message = args[0]?.toString() || "";
    if (
      !message.includes("Extension") &&
      !message.includes("chrome-extension") &&
      !message.includes("Non-passive event listener")
    ) {

    }
  },
};

/**
 * Global error handler for unhandled promises and errors
 */
export const setupGlobalErrorHandlers = () => {
  if (typeof window !== "undefined") {
    window.addEventListener("unhandledrejection", (event) => {
      safeConsole.error("Unhandled promise rejection:", event.reason);
      event.preventDefault();
    });

    window.addEventListener("error", (event) => {
      safeConsole.error("Global error:", event.error);
    });

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

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        (window as any).webkitRequestAnimationFrame ||
        function (callback: FrameRequestCallback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame =
        (window as any).webkitCancelAnimationFrame ||
        function (id: number) {
          clearTimeout(id);
        };
    }

    if (!window.IntersectionObserver) {
      safeConsole.warn("IntersectionObserver not supported");
    }

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
    const cookiesToClean = ["_ga", "_gid", "_gat", "__utm"];

    cookiesToClean.forEach((cookieName) => {
      if (document.cookie.includes(cookieName)) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
      }
    });
  }
};
