"use client";

import React, { useContext } from "react";
import QuickQuoteButton from "./QuickQuoteButton";
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext";
import { QuickQuoteContextType } from "../../contexts/QuickQuoteContext";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const QuickQuote = () => {
  const {
    quickQuoteViewStatus,
    setQuickQuoteViewStatus,
    quickQuoteTitle,
    setQuickQuoteTitle,
    setQuickQuoteRequested,
  } = useContext<QuickQuoteContextType>(QuickQuoteContext);

  const handleCloseForm = () => {
    setQuickQuoteViewStatus(false);
    setQuickQuoteTitle("Get instant free quote");
    setQuickQuoteRequested(false);
  };

  // Determine trigger source based on title (exit intent sets different title)
  const getTriggerSource = () => {
    if (quickQuoteTitle === "Get a Quote Before You Go!") {
      return "exit_intent";
    }
    return "quick_quote_button";
  };

  return (
    <div>
      <LeadCaptureForm
        isOpen={quickQuoteViewStatus}
        onClose={handleCloseForm}
        triggerSource={getTriggerSource()}
      />
      <QuickQuoteButton />
    </div>
  );
};

export default QuickQuote;
