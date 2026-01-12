/**
 * A/B Testing Framework
 * 
 * Provides utilities for running A/B tests and tracking variant performance.
 * Uses localStorage for persistence and Google Analytics for tracking.
 */

export type Variant = "A" | "B" | "C" | "D";

export interface ABTestConfig {
  testName: string;
  variants: Variant[];
  defaultVariant?: Variant;
  storageKey?: string;
  weight?: number[]; // Weight for each variant (default: equal weight)
}

export interface ABTestResult {
  variant: Variant;
  testName: string;
  timestamp: number;
}

class ABTestingFramework {
  private activeTests: Map<string, ABTestResult> = new Map();

  /**
   * Initialize A/B test and assign variant
   */
  initTest(config: ABTestConfig): Variant {
    if (typeof window === "undefined") {
      return config.defaultVariant || config.variants[0];
    }

    const storageKey =
      config.storageKey || `ab_test_${config.testName.toLowerCase()}`;

    // Check if user already has a variant assigned
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const result: ABTestResult = JSON.parse(stored);
        this.activeTests.set(config.testName, result);
        return result.variant;
      } catch (error) {
        // Invalid stored data, reassign
      }
    }

    // Assign new variant
    const variant = this.assignVariant(config);
    const result: ABTestResult = {
      variant,
      testName: config.testName,
      timestamp: Date.now(),
    };

    // Store in localStorage
    localStorage.setItem(storageKey, JSON.stringify(result));
    this.activeTests.set(config.testName, result);

    // Track variant assignment
    this.trackVariantAssignment(config.testName, variant);

    return variant;
  }

  /**
   * Assign variant based on weights or random
   */
  private assignVariant(config: ABTestConfig): Variant {
    if (config.weight && config.weight.length === config.variants.length) {
      // Weighted random assignment
      const totalWeight = config.weight.reduce((sum, w) => sum + w, 0);
      let random = Math.random() * totalWeight;

      for (let i = 0; i < config.variants.length; i++) {
        random -= config.weight[i];
        if (random <= 0) {
          return config.variants[i];
        }
      }
    }

    // Equal weight random assignment
    const randomIndex = Math.floor(Math.random() * config.variants.length);
    return config.variants[randomIndex];
  }

  /**
   * Get current variant for a test
   */
  getVariant(testName: string): Variant | null {
    const result = this.activeTests.get(testName);
    if (result) {
      return result.variant;
    }

    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const storageKey = `ab_test_${testName.toLowerCase()}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const result: ABTestResult = JSON.parse(stored);
          this.activeTests.set(testName, result);
          return result.variant;
        } catch (error) {
          // Invalid stored data
        }
      }
    }

    return null;
  }

  /**
   * Track variant assignment
   */
  private trackVariantAssignment(testName: string, variant: Variant): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    try {
      window.gtag("event", "ab_test_assignment", {
        event_category: "A/B Testing",
        event_label: testName,
        test_name: testName,
        variant: variant,
        non_interaction: true,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("A/B test tracking error:", error);
      }
    }
  }

  /**
   * Track conversion for A/B test
   */
  trackConversion(
    testName: string,
    conversionType: string,
    value?: number
  ): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const result = this.activeTests.get(testName);
    if (!result) return;

    try {
      window.gtag("event", "ab_test_conversion", {
        event_category: "A/B Testing",
        event_label: testName,
        test_name: testName,
        variant: result.variant,
        conversion_type: conversionType,
        value: value,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("A/B test conversion tracking error:", error);
      }
    }
  }

  /**
   * Track interaction for A/B test
   */
  trackInteraction(
    testName: string,
    interactionType: string,
    metadata?: Record<string, any>
  ): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const result = this.activeTests.get(testName);
    if (!result) return;

    try {
      window.gtag("event", "ab_test_interaction", {
        event_category: "A/B Testing",
        event_label: testName,
        test_name: testName,
        variant: result.variant,
        interaction_type: interactionType,
        ...metadata,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("A/B test interaction tracking error:", error);
      }
    }
  }

  /**
   * Clear test assignment (for testing)
   */
  clearTest(testName: string): void {
    this.activeTests.delete(testName);
    if (typeof window !== "undefined") {
      const storageKey = `ab_test_${testName.toLowerCase()}`;
      localStorage.removeItem(storageKey);
    }
  }
}

// Export singleton instance
export const abTesting = new ABTestingFramework();

// Predefined test configurations
export const AB_TEST_CONFIGS = {
  FORM_LENGTH: {
    testName: "Form Length",
    variants: ["A", "B"] as Variant[],
    defaultVariant: "A" as Variant,
    storageKey: "ab_test_form_length",
  },
  CTA_BUTTON: {
    testName: "CTA Button",
    variants: ["A", "B"] as Variant[],
    defaultVariant: "A" as Variant,
    storageKey: "ab_test_cta_button",
  },
  HEADLINE: {
    testName: "Headline",
    variants: ["A", "B"] as Variant[],
    defaultVariant: "A" as Variant,
    storageKey: "ab_test_headline",
  },
} as const;
