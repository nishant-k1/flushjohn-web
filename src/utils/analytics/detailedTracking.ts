/**
 * Detailed Analytics Tracking Utility
 * 
 * Tracks user engagement metrics:
 * - Scroll depth
 * - Time on page
 * - Element visibility
 * - Click tracking
 * - Engagement score
 */

interface ScrollDepth {
  depth: number; // Percentage
  timestamp: number;
}

interface TimeOnPage {
  startTime: number;
  lastActiveTime: number;
  totalTime: number;
}

class DetailedAnalyticsTracking {
  private scrollDepths: Map<string, ScrollDepth[]> = new Map();
  private timeOnPage: Map<string, TimeOnPage> = new Map();
  private visibilityStartTime: number | null = null;
  private isVisible: boolean = true;
  private engagementScore: number = 0;

  /**
   * Initialize detailed tracking for a page
   */
  initPageTracking(pagePath: string): void {
    if (typeof window === "undefined") return;

    // Initialize time on page
    const startTime = Date.now();
    this.timeOnPage.set(pagePath, {
      startTime,
      lastActiveTime: startTime,
      totalTime: 0,
    });

    // Track page view with detailed metrics
    this.trackPageView(pagePath);

    // Set up scroll tracking
    this.setupScrollTracking(pagePath);

    // Set up visibility tracking
    this.setupVisibilityTracking(pagePath);

    // Set up click tracking
    this.setupClickTracking(pagePath);

    // Set up engagement score calculation
    this.calculateEngagementScore(pagePath);
  }

  /**
   * Track page view with initial metrics
   */
  private trackPageView(pagePath: string): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "page_view_detailed", {
        event_category: "Page Analytics",
        event_label: pagePath,
        page_path: pagePath,
        timestamp: Date.now(),
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Page view tracking error:", error);
      }
    }
  }

  /**
   * Set up scroll depth tracking
   */
  private setupScrollTracking(pagePath: string): void {
    if (typeof window === "undefined") return;

    const scrollDepths: ScrollDepth[] = [];
    const milestones = [25, 50, 75, 90, 100];
    const reachedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track milestone achievements
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !reachedMilestones.has(milestone)
        ) {
          reachedMilestones.add(milestone);
          scrollDepths.push({
            depth: milestone,
            timestamp: Date.now(),
          });

          // Track scroll milestone
          this.trackScrollDepth(pagePath, milestone);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    this.scrollDepths.set(pagePath, scrollDepths);

    // Store handler for cleanup
    (window as any)[`__scrollHandler_${pagePath}`] = handleScroll;
  }

  /**
   * Track scroll depth milestone
   */
  private trackScrollDepth(pagePath: string, depth: number): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "scroll_depth", {
        event_category: "Engagement",
        event_label: pagePath,
        page_path: pagePath,
        scroll_depth: depth,
        non_interaction: true,
      });

      // Update engagement score
      this.engagementScore += 5;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Scroll depth tracking error:", error);
      }
    }
  }

  /**
   * Set up visibility tracking (time page is actually visible)
   */
  private setupVisibilityTracking(pagePath: string): void {
    if (typeof window === "undefined") return;

    const timeOnPage = this.timeOnPage.get(pagePath);
    if (!timeOnPage) return;

    this.visibilityStartTime = Date.now();
    this.isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      const now = Date.now();

      if (document.hidden) {
        // Page hidden - calculate visible time
        if (this.visibilityStartTime && this.isVisible) {
          const visibleTime = now - this.visibilityStartTime;
          timeOnPage.totalTime += visibleTime;
        }
        this.isVisible = false;
      } else {
        // Page visible - restart timer
        this.visibilityStartTime = now;
        this.isVisible = true;
      }

      timeOnPage.lastActiveTime = now;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track time on page periodically
    const timeInterval = setInterval(() => {
      if (!document.hidden) {
        const now = Date.now();
        const visibleTime = this.visibilityStartTime
          ? now - this.visibilityStartTime
          : 0;
        timeOnPage.totalTime += visibleTime;
        this.visibilityStartTime = now;

        // Track time milestones (30s, 1min, 2min, 5min)
        const totalSeconds = Math.round(timeOnPage.totalTime / 1000);
        const milestones = [30, 60, 120, 300];
        milestones.forEach((milestone) => {
          if (
            totalSeconds >= milestone &&
            totalSeconds < milestone + 5
          ) {
            this.trackTimeOnPage(pagePath, milestone);
          }
        });
      }
    }, 5000); // Check every 5 seconds

    // Store for cleanup
    (document as any)[`__visibilityHandler_${pagePath}`] = handleVisibilityChange;
    (window as any)[`__timeInterval_${pagePath}`] = timeInterval;
  }

  /**
   * Track time on page milestone
   */
  private trackTimeOnPage(pagePath: string, seconds: number): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "time_on_page", {
        event_category: "Engagement",
        event_label: pagePath,
        page_path: pagePath,
        time_seconds: seconds,
        non_interaction: true,
      });

      // Update engagement score
      this.engagementScore += 3;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Time on page tracking error:", error);
      }
    }
  }

  /**
   * Set up click tracking
   */
  private setupClickTracking(pagePath: string): void {
    if (typeof window === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Track meaningful clicks (buttons, links, forms)
      const tagName = target.tagName.toLowerCase();
      const isInteractive =
        tagName === "button" ||
        tagName === "a" ||
        tagName === "input" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("form");

      if (isInteractive) {
        this.trackClick(pagePath, {
          element: tagName,
          text: target.textContent?.slice(0, 50) || "",
          href: (target as HTMLAnchorElement).href || "",
        });
      }
    };

    document.addEventListener("click", handleClick);

    // Store for cleanup
    (document as any)[`__clickHandler_${pagePath}`] = handleClick;
  }

  /**
   * Track click event
   */
  private trackClick(
    pagePath: string,
    metadata: { element: string; text: string; href: string }
  ): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "element_click", {
        event_category: "Engagement",
        event_label: pagePath,
        page_path: pagePath,
        element_type: metadata.element,
        element_text: metadata.text,
        element_href: metadata.href,
      });

      // Update engagement score
      this.engagementScore += 2;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Click tracking error:", error);
      }
    }
  }

  /**
   * Calculate and track engagement score
   */
  private calculateEngagementScore(pagePath: string): void {
    if (typeof window === "undefined") return;

    // Track engagement score on page leave
    const handleBeforeUnload = () => {
      const timeOnPage = this.timeOnPage.get(pagePath);
      if (!timeOnPage) return;

      // Final time calculation
      if (!document.hidden && this.visibilityStartTime) {
        const finalVisibleTime = Date.now() - this.visibilityStartTime;
        timeOnPage.totalTime += finalVisibleTime;
      }

      // Calculate final engagement score
      const totalSeconds = Math.round(timeOnPage.totalTime / 1000);
      const scrollDepths = this.scrollDepths.get(pagePath) || [];
      const maxScroll = scrollDepths.length > 0
        ? Math.max(...scrollDepths.map((s) => s.depth))
        : 0;

      // Engagement score formula
      const timeScore = Math.min(totalSeconds / 60, 5); // Max 5 points for time
      const scrollScore = maxScroll / 20; // Max 5 points for scroll
      const interactionScore = Math.min(this.engagementScore / 10, 5); // Max 5 points
      const finalScore = Math.round(timeScore + scrollScore + interactionScore);

      // Track final engagement
      if (typeof window.gtag === "function") {
        try {
          window.gtag("event", "engagement_score", {
            event_category: "Engagement",
            event_label: pagePath,
            page_path: pagePath,
            engagement_score: finalScore,
            time_on_page_seconds: totalSeconds,
            max_scroll_depth: maxScroll,
            non_interaction: true,
          });
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Engagement score tracking error:", error);
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Store for cleanup
    (window as any)[`__engagementHandler_${pagePath}`] = handleBeforeUnload;
  }

  /**
   * Clean up tracking for a page
   */
  cleanup(pagePath: string): void {
    // Remove event listeners
    const scrollHandler = (window as any)[`__scrollHandler_${pagePath}`];
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      delete (window as any)[`__scrollHandler_${pagePath}`];
    }

    const visibilityHandler = (document as any)[`__visibilityHandler_${pagePath}`];
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      delete (document as any)[`__visibilityHandler_${pagePath}`];
    }

    const clickHandler = (document as any)[`__clickHandler_${pagePath}`];
    if (clickHandler) {
      document.removeEventListener("click", clickHandler);
      delete (document as any)[`__clickHandler_${pagePath}`];
    }

    const timeInterval = (window as any)[`__timeInterval_${pagePath}`];
    if (timeInterval) {
      clearInterval(timeInterval);
      delete (window as any)[`__timeInterval_${pagePath}`];
    }

    const engagementHandler = (window as any)[`__engagementHandler_${pagePath}`];
    if (engagementHandler) {
      window.removeEventListener("beforeunload", engagementHandler);
      delete (window as any)[`__engagementHandler_${pagePath}`];
    }

    // Clear data
    this.scrollDepths.delete(pagePath);
    this.timeOnPage.delete(pagePath);
    this.engagementScore = 0;
  }
}

// Export singleton instance
export const detailedAnalytics = new DetailedAnalyticsTracking();
