/**
 * React Hook for A/B Testing
 */

import { useEffect, useState } from "react";
import {
  abTesting,
  Variant,
  ABTestConfig,
} from "@/utils/analytics/abTesting";

export function useABTest(config: ABTestConfig): Variant {
  const [variant, setVariant] = useState<Variant>(
    config.defaultVariant || config.variants[0]
  );

  useEffect(() => {
    const assignedVariant = abTesting.initTest(config);
    setVariant(assignedVariant);
  }, [config.testName]);

  const trackConversion = (conversionType: string, value?: number) => {
    abTesting.trackConversion(config.testName, conversionType, value);
  };

  const trackInteraction = (
    interactionType: string,
    metadata?: Record<string, any>
  ) => {
    abTesting.trackInteraction(config.testName, interactionType, metadata);
  };

  return variant;
}

// Export convenience hook with conversion tracking
export function useABTestWithTracking(config: ABTestConfig) {
  const variant = useABTest(config);

  return {
    variant,
    trackConversion: (conversionType: string, value?: number) => {
      abTesting.trackConversion(config.testName, conversionType, value);
    },
    trackInteraction: (
      interactionType: string,
      metadata?: Record<string, any>
    ) => {
      abTesting.trackInteraction(config.testName, interactionType, metadata);
    },
  };
}
