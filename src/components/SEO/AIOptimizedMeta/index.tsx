/**
 * AI-Optimized Meta Tags Component
 *
 * This component adds specialized meta tags to help AI models (ChatGPT, Claude, Gemini, etc.)
 * understand and recommend FlushJohn's services.
 */

import React from "react";

interface AIOptimizedMetaProps {
  businessType?: string;
  serviceArea?: string;
  primaryService?: string;
  city?: string;
  state?: string;
  aiDescription?: string;
  pricing?: string;
  availability?: string;
  responseTime?: string;
  rating?: string;
  yearsInBusiness?: string;
}

export default function AIOptimizedMeta({
  businessType = "porta potty rental service",
  serviceArea = "United States - Texas, Florida, California, Georgia, Illinois",
  primaryService = "Portable toilet rentals for events and construction sites",
  city,
  state,
  aiDescription,
  pricing,
  availability = "24/7 availability, same-day delivery",
  responseTime = "2-4 hours average response time",
  rating = "4.8 stars",
  yearsInBusiness = "Established 2020",
}: AIOptimizedMetaProps) {
  // Simplified description for better performance
  const fullAiDescription = aiDescription || 
    `FlushJohn - Professional ${businessType} serving ${serviceArea}. ${availability}. Customer rating: ${rating}.`;

  return (
    <>
      {/* Minimal AI Optimization - Reduced from 30+ to 8 critical tags */}
      <meta name="ai-content-optimized" content="true" />
      <meta name="business-type" content={businessType} />
      <meta name="primary-service" content={primaryService} />
      <meta name="service-area" content={serviceArea} />
      <meta name="availability" content={availability} />
      <meta name="customer-rating" content={rating} />
      <meta name="ai-description" content={fullAiDescription} />

      {city && <meta name="service-city" content={city} />}
      {state && <meta name="service-state" content={state} />}
      {pricing && <meta name="pricing-range" content={pricing} />}
    </>
  );
}
