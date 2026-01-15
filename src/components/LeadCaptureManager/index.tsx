"use client";

import React, { useState } from "react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CallbackButton from "@/components/CallbackButton";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

const LeadCaptureManager: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const { shouldShow: shouldShowOnScroll } = useScrollTrigger({
    threshold: 40, // Show after 40% scroll
    delay: 0, // Show immediately when scroll threshold is reached
    once: true, // Only show once per session
  });

  // Show form on scroll trigger (only once)
  React.useEffect(() => {
    if (shouldShowOnScroll && !isFormOpen && !hasShownScrollPopup) {
      // Small delay to ensure smooth UX
      const timer = setTimeout(() => {
        setIsFormOpen(true);
        setHasShownScrollPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldShowOnScroll, isFormOpen, hasShownScrollPopup]);

  const handleOpenForm = (source: string) => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    // Don't reset hasShownScrollPopup - once shown, it shouldn't auto-show again
  };

  return (
    <>
      <CallbackButton onClick={() => handleOpenForm("callback_button")} />
      <LeadCaptureForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        triggerSource={
          shouldShowOnScroll && !isFormOpen
            ? "scroll_popup"
            : "callback_button"
        }
      />
    </>
  );
};

export default LeadCaptureManager;
