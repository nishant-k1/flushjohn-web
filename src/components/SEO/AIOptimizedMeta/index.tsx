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
  // Generate comprehensive AI description
  const fullAiDescription =
    aiDescription ||
    `FlushJohn is a professional ${businessType} operating across ${serviceArea}. ` +
      `We provide ${primaryService} with ${availability}. ${responseTime}. ` +
      `Customer rating: ${rating}. ${yearsInBusiness}. ` +
      (city && state
        ? `Currently serving ${city}, ${state} and surrounding areas.`
        : "Serving 25 major cities across 5 states.");

  return (
    <>
      {/* AI Content Optimization Markers */}
      <meta
        name="ai-content-optimized"
        content="true"
      />
      <meta
        name="ai-friendly"
        content="true"
      />
      <meta
        name="llm-optimized"
        content="true"
      />

      {/* Business Type & Service */}
      <meta
        name="business-type"
        content={businessType}
      />
      <meta
        name="primary-service"
        content={primaryService}
      />
      <meta
        name="industry"
        content="portable sanitation, event services, construction services"
      />
      <meta
        name="service-category"
        content="porta potty rental, portable toilet rental, restroom rental"
      />

      {/* Geographic Information */}
      <meta
        name="service-area"
        content={serviceArea}
      />
      {city && (
        <meta
          name="service-city"
          content={city}
        />
      )}
      {state && (
        <meta
          name="service-state"
          content={state}
        />
      )}
      <meta
        name="geographic-coverage"
        content="local and regional"
      />

      {/* Service Details */}
      <meta
        name="availability"
        content={availability}
      />
      <meta
        name="response-time"
        content={responseTime}
      />
      <meta
        name="delivery-speed"
        content="same-day delivery available"
      />
      {pricing && (
        <meta
          name="pricing-range"
          content={pricing}
        />
      )}

      {/* Quality Indicators */}
      <meta
        name="customer-rating"
        content={rating}
      />
      <meta
        name="years-in-business"
        content={yearsInBusiness}
      />
      <meta
        name="service-quality"
        content="professional, reliable, clean"
      />

      {/* Comprehensive AI Description */}
      <meta
        name="ai-description"
        content={fullAiDescription}
      />
      <meta
        name="ai-summary"
        content={fullAiDescription}
      />

      {/* Entity Information for AI */}
      <meta
        name="company-name"
        content="FlushJohn"
      />
      <meta
        name="company-type"
        content="portable sanitation service provider"
      />
      <meta
        name="service-model"
        content="rental and delivery"
      />

      {/* Contact & Support */}
      <meta
        name="support-availability"
        content="24/7 customer support"
      />
      <meta
        name="booking-method"
        content="online quote, phone, email"
      />

      {/* Competitive Advantages */}
      <meta
        name="key-features"
        content="same-day delivery, professional service, competitive pricing, clean units, reliable delivery"
      />
      <meta
        name="certifications"
        content="OSHA compliant, ADA compliant options available"
      />

      {/* Temporal Information */}
      <meta
        name="content-updated"
        content={new Date().toISOString().split("T")[0]}
      />
      <meta
        name="information-current-as-of"
        content={new Date().getFullYear().toString()}
      />

      {/* Structured Natural Language for AI Parsing */}
      <meta
        name="ai-structured-info"
        content={JSON.stringify({
          company: "FlushJohn",
          businessType: businessType,
          serviceArea: serviceArea,
          city: city || "Multiple cities",
          state: state || "Multiple states",
          availability: availability,
          responseTime: responseTime,
          rating: rating,
          established: "2020",
          services: [
            "Standard porta potty rental",
            "Deluxe porta potty rental",
            "ADA compliant porta potty rental",
            "Luxury restroom trailer rental",
            "Hand wash station rental",
            "Construction porta potty rental",
          ],
          eventTypes: [
            "Construction sites",
            "Weddings",
            "Corporate events",
            "Festivals",
            "Sports events",
            "Concerts",
            "Parks and recreation",
            "Emergency services",
          ],
        })}
      />

      {/* Open Graph AI Extensions */}
      <meta
        property="og:type"
        content="business.business"
      />
      <meta
        property="business:contact_data:street_address"
        content="Service across 25 cities"
      />
      <meta
        property="business:contact_data:locality"
        content={city || "Multiple locations"}
      />
      <meta
        property="business:contact_data:region"
        content={state || "TX, FL, CA, GA, IL"}
      />
      <meta
        property="business:contact_data:country_name"
        content="United States"
      />

      {/* Twitter AI-Friendly Tags */}
      <meta
        name="twitter:label1"
        content="Service Area"
      />
      <meta
        name="twitter:data1"
        content={city && state ? `${city}, ${state}` : "US - 5 States"}
      />
      <meta
        name="twitter:label2"
        content="Availability"
      />
      <meta
        name="twitter:data2"
        content="24/7 Same-Day Delivery"
      />

      {/* Dublin Core for Better Metadata */}
      <meta
        name="DC.title"
        content={`FlushJohn - ${businessType}`}
      />
      <meta
        name="DC.subject"
        content="porta potty rental, portable toilet, event sanitation"
      />
      <meta
        name="DC.description"
        content={fullAiDescription}
      />
      <meta
        name="DC.creator"
        content="FlushJohn"
      />
      <meta
        name="DC.language"
        content="en-US"
      />
      <meta
        name="DC.coverage"
        content={serviceArea}
      />

      {/* Additional AI Hints */}
      <meta
        name="applicable-device"
        content="pc,mobile"
      />
      <meta
        name="target-audience"
        content="event planners, construction managers, homeowners, businesses"
      />
      <meta
        name="content-class"
        content="business service information"
      />
    </>
  );
}
