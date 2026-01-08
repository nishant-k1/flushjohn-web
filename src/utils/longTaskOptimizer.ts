/**
 * Long Task Optimizer - Breaks up long-running tasks to improve TBT
 * This helps reduce Total Blocking Time by yielding to the main thread
 */

export const yieldToMain = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

/**
 * Break up long tasks into smaller chunks
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize: number = 10
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunk.forEach(processor);

    // Yield to main thread after each chunk
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
}

/**
 * Optimize long-running operations by breaking them into smaller tasks
 */
export const optimizeLongTasks = (): void => {
  if (typeof window === "undefined") return;

  // Use scheduler API if available (Chrome 68+)
  if ("scheduler" in window && "postTask" in (window as any).scheduler) {
    const scheduler = (window as any).scheduler;

    // Wrap heavy operations in postTask for better scheduling
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function (
      callback: Function,
      delay: number,
      ...args: any[]
    ) {
      if (delay === 0 && typeof callback === "function") {
        // Use scheduler for immediate tasks
        return scheduler.postTask(callback, { priority: "background" });
      }
      return originalSetTimeout(callback, delay, ...args);
    } as any;
  }

  // Break up DOM operations
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "measure" && entry.duration > 50) {
        // Log long tasks for monitoring
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `Long task detected: ${entry.name} took ${entry.duration}ms`
          );
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ["measure"] });
  } catch (e) {
    // PerformanceObserver not supported
  }
};

/**
 * Defer non-critical initialization
 */
export const deferNonCriticalInit = (callback: () => void): void => {
  if (typeof window === "undefined") return;

  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback, { timeout: 2000 });
  } else {
    setTimeout(callback, 100);
  }
};
