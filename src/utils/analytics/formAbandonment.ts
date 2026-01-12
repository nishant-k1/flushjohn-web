/**
 * Form Abandonment Tracking Utility
 * 
 * Tracks when users start forms but don't complete them.
 * Sends events to Google Analytics and sets up remarketing audiences.
 */

export type FormType = 
  | "quote_page_form"
  | "hero_quick_quote_form"
  | "modal_quick_quote_form"
  | "contact_form";

export type AbandonmentStep = {
  step: number | string;
  stepName: string;
  timestamp: number;
  fieldsFilled: number;
  totalFields: number;
};

interface FormAbandonmentTracker {
  formType: FormType;
  startTime: number | null;
  currentStep: number | string | null;
  fieldsFilled: number;
  totalFields: number;
  steps: AbandonmentStep[];
}

class FormAbandonmentTracking {
  private trackers: Map<FormType, FormAbandonmentTracker> = new Map();
  private abandonTimeout: number = 30000; // 30 seconds of inactivity = abandonment
  private abandonTimers: Map<FormType, NodeJS.Timeout> = new Map();

  /**
   * Initialize form tracking
   */
  startTracking(
    formType: FormType,
    totalFields: number,
    initialStep?: number | string
  ): void {
    if (typeof window === "undefined") return;

    const tracker: FormAbandonmentTracker = {
      formType,
      startTime: Date.now(),
      currentStep: initialStep || 1,
      fieldsFilled: 0,
      totalFields,
      steps: [],
    };

    this.trackers.set(formType, tracker);

    // Track form start
    this.trackFormStart(formType);

    // Set up beforeunload listener to track abandonment on page leave
    this.setupBeforeUnloadListener(formType);

    // Set up visibility change listener (tab switch/close)
    this.setupVisibilityChangeListener(formType);
  }

  /**
   * Track form start event
   */
  private trackFormStart(formType: FormType): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "form_start", {
        event_category: "Form",
        event_label: formType,
        form_type: formType,
        non_interaction: false,
      });

      // Set remarketing audience (form starter)
      this.setRemarketingAudience("form_starter", formType);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Form start tracking error:", error);
      }
    }
  }

  /**
   * Track field interaction (user filling out form)
   */
  trackFieldInteraction(
    formType: FormType,
    fieldName: string,
    hasValue: boolean
  ): void {
    if (typeof window === "undefined") return;

    const tracker = this.trackers.get(formType);
    if (!tracker) return;

    // Reset abandonment timer
    this.resetAbandonmentTimer(formType);

    // Update fields filled count
    if (hasValue && !tracker.steps.some((s) => s.stepName === fieldName)) {
      tracker.fieldsFilled += 1;
    }

    // Track field interaction
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "form_field_interaction", {
          event_category: "Form",
          event_label: formType,
          form_type: formType,
          field_name: fieldName,
          fields_filled: tracker.fieldsFilled,
          total_fields: tracker.totalFields,
          completion_percentage: Math.round(
            (tracker.fieldsFilled / tracker.totalFields) * 100
          ),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Field interaction tracking error:", error);
        }
      }
    }
  }

  /**
   * Track step change (for multi-step forms)
   */
  trackStepChange(
    formType: FormType,
    step: number | string,
    stepName: string
  ): void {
    if (typeof window === "undefined") return;

    const tracker = this.trackers.get(formType);
    if (!tracker) return;

    // Reset abandonment timer
    this.resetAbandonmentTimer(formType);

    // Record step
    tracker.currentStep = step;
    tracker.steps.push({
      step,
      stepName,
      timestamp: Date.now(),
      fieldsFilled: tracker.fieldsFilled,
      totalFields: tracker.totalFields,
    });

    // Track step change
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "form_step_change", {
          event_category: "Form",
          event_label: formType,
          form_type: formType,
          step: String(step),
          step_name: stepName,
          fields_filled: tracker.fieldsFilled,
          total_fields: tracker.totalFields,
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Step change tracking error:", error);
        }
      }
    }
  }

  /**
   * Track form completion (success - not abandonment)
   */
  trackFormComplete(formType: FormType): void {
    if (typeof window === "undefined") return;

    const tracker = this.trackers.get(formType);
    if (!tracker) return;

    // Clear abandonment timer
    this.clearAbandonmentTimer(formType);

    // Calculate time spent
    const timeSpent = tracker.startTime
      ? Math.round((Date.now() - tracker.startTime) / 1000)
      : 0;

    // Track completion
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "form_complete", {
          event_category: "Form",
          event_label: formType,
          form_type: formType,
          time_spent_seconds: timeSpent,
          fields_filled: tracker.fieldsFilled,
          total_fields: tracker.totalFields,
          steps_completed: tracker.steps.length,
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Form complete tracking error:", error);
        }
      }
    }

    // Remove tracker
    this.trackers.delete(formType);
    this.removeBeforeUnloadListener(formType);
  }

  /**
   * Track form abandonment
   */
  private trackFormAbandonment(
    formType: FormType,
    reason: "timeout" | "page_leave" | "tab_switch"
  ): void {
    if (typeof window === "undefined") return;

    const tracker = this.trackers.get(formType);
    if (!tracker) return;

    // Calculate time spent
    const timeSpent = tracker.startTime
      ? Math.round((Date.now() - tracker.startTime) / 1000)
      : 0;

    // Get last step
    const lastStep = tracker.steps[tracker.steps.length - 1] || {
      step: tracker.currentStep || 1,
      stepName: "unknown",
      timestamp: Date.now(),
      fieldsFilled: tracker.fieldsFilled,
      totalFields: tracker.totalFields,
    };

    // Track abandonment
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "form_abandon", {
          event_category: "Form",
          event_label: formType,
          form_type: formType,
          abandon_reason: reason,
          time_spent_seconds: timeSpent,
          last_step: String(lastStep.step),
          last_step_name: lastStep.stepName,
          fields_filled: tracker.fieldsFilled,
          total_fields: tracker.totalFields,
          completion_percentage: Math.round(
            (tracker.fieldsFilled / tracker.totalFields) * 100
          ),
        });

        // Set remarketing audience (form abandoner)
        this.setRemarketingAudience("form_abandoner", formType, {
          lastStep: String(lastStep.step),
          completionPercentage: Math.round(
            (tracker.fieldsFilled / tracker.totalFields) * 100
          ),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Form abandonment tracking error:", error);
        }
      }
    }

    // Remove tracker
    this.trackers.delete(formType);
  }

  /**
   * Set up abandonment timer (fires after inactivity)
   */
  private resetAbandonmentTimer(formType: FormType): void {
    // Clear existing timer
    this.clearAbandonmentTimer(formType);

    // Set new timer
    const timer = setTimeout(() => {
      this.trackFormAbandonment(formType, "timeout");
    }, this.abandonTimeout);

    this.abandonTimers.set(formType, timer);
  }

  /**
   * Clear abandonment timer
   */
  private clearAbandonmentTimer(formType: FormType): void {
    const timer = this.abandonTimers.get(formType);
    if (timer) {
      clearTimeout(timer);
      this.abandonTimers.delete(formType);
    }
  }

  /**
   * Set up beforeunload listener (page leave)
   */
  private setupBeforeUnloadListener(formType: FormType): void {
    if (typeof window === "undefined") return;

    const handler = () => {
      const tracker = this.trackers.get(formType);
      if (tracker && tracker.fieldsFilled > 0) {
        // Only track if user actually started filling
        this.trackFormAbandonment(formType, "page_leave");
      }
    };

    window.addEventListener("beforeunload", handler);

    // Store handler for cleanup
    (window as any)[`__formAbandonHandler_${formType}`] = handler;
  }

  /**
   * Remove beforeunload listener
   */
  private removeBeforeUnloadListener(formType: FormType): void {
    if (typeof window === "undefined") return;

    const handler = (window as any)[`__formAbandonHandler_${formType}`];
    if (handler) {
      window.removeEventListener("beforeunload", handler);
      delete (window as any)[`__formAbandonHandler_${formType}`];
    }
  }

  /**
   * Set up visibility change listener (tab switch/close)
   */
  private setupVisibilityChangeListener(formType: FormType): void {
    if (typeof window === "undefined") return;

    const handler = () => {
      if (document.hidden) {
        // Tab switched or closed
        const tracker = this.trackers.get(formType);
        if (tracker && tracker.fieldsFilled > 0) {
          // Track after a delay (user might come back)
          setTimeout(() => {
            if (document.hidden && this.trackers.has(formType)) {
              this.trackFormAbandonment(formType, "tab_switch");
            }
          }, 60000); // 1 minute
        }
      }
    };

    document.addEventListener("visibilitychange", handler);

    // Store handler for cleanup
    (document as any)[`__formVisibilityHandler_${formType}`] = handler;
  }

  /**
   * Set remarketing audience (for Google Ads)
   */
  private setRemarketingAudience(
    audienceType: "form_starter" | "form_abandoner",
    formType: FormType,
    metadata?: Record<string, any>
  ): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      // Set custom parameters for remarketing
      window.gtag("set", "user_properties", {
        [`${audienceType}_${formType}`]: true,
        form_type: formType,
        ...metadata,
      });

      // Also send as event for Google Ads audience building
      window.gtag("event", "set_remarketing_audience", {
        event_category: "Remarketing",
        event_label: `${audienceType}_${formType}`,
        audience_type: audienceType,
        form_type: formType,
        ...metadata,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Remarketing audience error:", error);
      }
    }
  }
}

// Export singleton instance
export const formAbandonmentTracking = new FormAbandonmentTracking();
