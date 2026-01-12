/**
 * React Hook for Form Abandonment Tracking
 */

import { useEffect, useRef } from "react";
import {
  formAbandonmentTracking,
  FormType,
} from "@/utils/analytics/formAbandonment";

interface UseFormAbandonmentTrackingOptions {
  formType: FormType;
  totalFields: number;
  initialStep?: number | string;
  onComplete?: () => void;
}

export function useFormAbandonmentTracking({
  formType,
  totalFields,
  initialStep,
  onComplete,
}: UseFormAbandonmentTrackingOptions) {
  const isCompleteRef = useRef(false);

  useEffect(() => {
    // Start tracking when component mounts
    formAbandonmentTracking.startTracking(
      formType,
      totalFields,
      initialStep
    );

    // Cleanup on unmount (if not completed)
    return () => {
      if (!isCompleteRef.current) {
        // Form was abandoned (component unmounted without completion)
        // The beforeunload listener will handle tracking
      }
    };
  }, [formType, totalFields, initialStep]);

  const trackFieldInteraction = (fieldName: string, hasValue: boolean) => {
    if (!isCompleteRef.current) {
      formAbandonmentTracking.trackFieldInteraction(
        formType,
        fieldName,
        hasValue
      );
    }
  };

  const trackStepChange = (step: number | string, stepName: string) => {
    if (!isCompleteRef.current) {
      formAbandonmentTracking.trackStepChange(formType, step, stepName);
    }
  };

  const trackComplete = () => {
    if (!isCompleteRef.current) {
      isCompleteRef.current = true;
      formAbandonmentTracking.trackFormComplete(formType);
      onComplete?.();
    }
  };

  return {
    trackFieldInteraction,
    trackStepChange,
    trackComplete,
  };
}
