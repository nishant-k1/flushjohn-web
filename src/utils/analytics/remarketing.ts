/**
 * Remarketing Audience Setup Utility
 * 
 * Sets up remarketing audiences for Google Ads based on user behavior.
 * These audiences can be used in Google Ads for retargeting campaigns.
 */

export type RemarketingAudience =
  | "page_visitor"
  | "quote_page_visitor"
  | "contact_page_visitor"
  | "form_starter"
  | "form_abandoner"
  | "phone_clicker"
  | "high_intent_visitor"
  | "returning_visitor";

interface AudienceMetadata {
  [key: string]: string | number | boolean;
}

class RemarketingAudienceManager {
  private audiences: Set<RemarketingAudience> = new Set();
  private visitCount: number = 0;
  private firstVisitTime: number | null = null;

  /**
   * Initialize remarketing tracking
   */
  init(): void {
    if (typeof window === "undefined") return;

    // Track first visit time
    this.firstVisitTime = Date.now();

    // Check if returning visitor
    const lastVisit = localStorage.getItem("last_visit_time");
    if (lastVisit) {
      const timeSinceLastVisit = Date.now() - parseInt(lastVisit, 10);
      // If last visit was more than 30 minutes ago, consider it a new session
      if (timeSinceLastVisit > 30 * 60 * 1000) {
        this.addAudience("returning_visitor");
      }
    }

    // Update visit count
    const storedCount = localStorage.getItem("visit_count");
    this.visitCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
    localStorage.setItem("visit_count", String(this.visitCount));
    localStorage.setItem("last_visit_time", String(Date.now()));

    // Track page visitor
    this.addAudience("page_visitor");
  }

  /**
   * Add user to remarketing audience
   */
  addAudience(
    audience: RemarketingAudience,
    metadata?: AudienceMetadata
  ): void {
    if (typeof window === "undefined") return;

    // Don't add duplicate audiences in same session
    if (this.audiences.has(audience)) return;

    this.audiences.add(audience);

    // Send to Google Analytics/Google Ads
    if (typeof window.gtag === "function") {
      try {
        // Set user property
        window.gtag("set", "user_properties", {
          [audience]: true,
          visit_count: this.visitCount,
          ...metadata,
        });

        // Send event for audience building
        window.gtag("event", "remarketing_audience", {
          event_category: "Remarketing",
          event_label: audience,
          audience_type: audience,
          visit_count: this.visitCount,
          ...metadata,
        });

        // Store in localStorage for persistence
        const storedAudiences = JSON.parse(
          localStorage.getItem("remarketing_audiences") || "[]"
        );
        if (!storedAudiences.includes(audience)) {
          storedAudiences.push(audience);
          localStorage.setItem(
            "remarketing_audiences",
            JSON.stringify(storedAudiences)
          );
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Remarketing audience error:", error);
        }
      }
    }
  }

  /**
   * Track page visit for remarketing
   */
  trackPageVisit(pagePath: string): void {
    if (typeof window === "undefined") return;

    // Track general page visitor
    this.addAudience("page_visitor", {
      page_path: pagePath,
    });

    // Track specific page visitors
    if (pagePath.includes("/quote")) {
      this.addAudience("quote_page_visitor", {
        page_path: pagePath,
      });
      this.addAudience("high_intent_visitor", {
        page_path: pagePath,
      });
    } else if (pagePath.includes("/contact")) {
      this.addAudience("contact_page_visitor", {
        page_path: pagePath,
      });
    }
  }

  /**
   * Track phone button click
   */
  trackPhoneClick(location: string): void {
    if (typeof window === "undefined") return;

    this.addAudience("phone_clicker", {
      click_location: location,
    });
    this.addAudience("high_intent_visitor", {
      action: "phone_click",
      location,
    });
  }

  /**
   * Track form start
   */
  trackFormStart(formType: string): void {
    if (typeof window === "undefined") return;

    this.addAudience("form_starter", {
      form_type: formType,
    });
    this.addAudience("high_intent_visitor", {
      action: "form_start",
      form_type: formType,
    });
  }

  /**
   * Track form abandonment
   */
  trackFormAbandon(formType: string, lastStep?: string): void {
    if (typeof window === "undefined") return;

    const metadata: AudienceMetadata = {
      form_type: formType,
    };
    
    if (lastStep) {
      metadata.last_step = lastStep;
    }

    this.addAudience("form_abandoner", metadata);
  }

  /**
   * Get current audiences (for debugging)
   */
  getCurrentAudiences(): RemarketingAudience[] {
    return Array.from(this.audiences);
  }

  /**
   * Clear audiences (for testing)
   */
  clearAudiences(): void {
    this.audiences.clear();
    localStorage.removeItem("remarketing_audiences");
  }
}

// Export singleton instance
export const remarketingAudienceManager = new RemarketingAudienceManager();
