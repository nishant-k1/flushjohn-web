/**
 * City-specific content helper functions
 * Generates unique content for features, services, FAQs, and other sections
 * to avoid duplicate content across city pages
 */

import { CityEnhancement } from "./cityEnhancements";

export interface CityFeature {
  title: string;
  description: string;
}

/**
 * Generate city-specific features based on city data
 */
export function generateCityFeatures(
  displayName: string,
  state: string,
  enhancements: CityEnhancement,
  hasMajorEvents: boolean
): CityFeature[] {
  const features: CityFeature[] = [];

  // Feature 1: Delivery - city-specific
  features.push({
    title: "Fast & Reliable Delivery in " + displayName,
    description: `Same-day delivery available throughout ${displayName}, ${state} and surrounding areas. We understand ${displayName}'s unique geography and traffic patterns to ensure timely service.`,
  });

  // Feature 2: Clean & Sanitized - enhanced with city context
  features.push({
    title: "Professionally Cleaned & Sanitized Units",
    description: `All porta potties are thoroughly cleaned and sanitized before every rental in ${displayName}. Our cleaning protocols meet ${state} health department standards and exceed industry requirements.`,
  });

  // Feature 3: Pricing - city-specific
  const pricingDesc =
    enhancements.events.length > 0 && hasMajorEvents
      ? `Competitive pricing for ${displayName} residents with transparent rates. We offer special pricing for major events and long-term construction rentals in ${displayName}.`
      : `Competitive, transparent pricing for ${displayName} with no hidden fees. Long-term rentals offer the best value for ${displayName} construction projects and events.`;
  features.push({
    title: "Affordable & Transparent Pricing",
    description: pricingDesc,
  });

  // Feature 4: Flexible Plans - city-specific
  features.push({
    title: "Flexible Rental Plans",
    description: `Short-term event rentals and long-term construction solutions available in ${displayName}. We customize rental plans based on ${displayName} project timelines and event schedules.`,
  });

  // Feature 5: Service Options - enhanced with city context
  const serviceTypes =
    enhancements.events.length > 2
      ? `construction sites, festivals, weddings, corporate events, and major ${displayName} gatherings`
      : `construction projects, events, weddings, and corporate gatherings in ${displayName}`;
  features.push({
    title: "Comprehensive Service Options",
    description: `We serve all types of porta potty rental needs in ${displayName}: ${serviceTypes}. From standard units to luxury restroom trailers, we have solutions for every ${displayName} project.`,
  });

  // Feature 6: Support - city-specific
  features.push({
    title: "24/7 Customer Support",
    description: `Round-the-clock customer service for ${displayName} customers. Our local team understands ${displayName}'s unique needs and is always available to help with your porta potty rental requirements.`,
  });

  return features;
}

/**
 * Generate city-specific service descriptions
 */
export function generateCityServices(
  displayName: string,
  state: string,
  enhancements: CityEnhancement
): Array<{
  title: string;
  description: string;
}> {
  const hasConstruction = enhancements.landmarks.some((l) =>
    l.toLowerCase().includes("construction")
  );
  const hasMajorEvents = enhancements.events.length > 2;
  const hasWeddings = enhancements.events.some(
    (e) =>
      e.toLowerCase().includes("wedding") ||
      e.toLowerCase().includes("festival")
  );

  return [
    {
      title: "Construction Site Porta Potties",
      description: hasConstruction
        ? `OSHA-compliant porta potties for ${displayName} construction projects. Perfect for job sites throughout ${displayName} with regular servicing to meet ${state} workplace safety requirements.`
        : `Durable, OSHA-compliant units perfect for construction sites and long-term projects in ${displayName}. Regular servicing ensures clean, reliable facilities for ${displayName} construction crews.`,
    },
    {
      title: "Event Porta Potties",
      description: hasMajorEvents
        ? `High-capacity porta potty solutions for ${displayName} events and festivals. We've served major ${displayName} events with reliable, clean portable restroom facilities.`
        : `Ideal for concerts, festivals, fairs, and large gatherings in ${displayName}. Our event porta potties are perfect for ${displayName} community events, corporate gatherings, and public festivals.`,
    },
    {
      title: "Outdoor & Camping Toilets",
      description: `Convenient portable solutions for remote locations and outdoor events in ${displayName}. Perfect for camping trips, outdoor weddings, and events in ${displayName}'s parks and recreational areas.`,
    },
    {
      title: "Luxury Restroom Trailers",
      description: hasWeddings
        ? `Premium restroom trailers perfect for ${displayName} weddings, VIP events, and upscale occasions. Our luxury units provide the elegance your ${displayName} event deserves.`
        : `Premium facilities perfect for weddings, VIP events, and upscale occasions in ${displayName}. Luxury restroom trailers offer comfort and style for special ${displayName} events.`,
    },
    {
      title: "Emergency & Disaster Relief Toilets",
      description: `Quick deployment solutions for emergencies and disaster relief situations in ${displayName}, ${state}. We provide rapid-response porta potty services when ${displayName} communities need them most.`,
    },
  ];
}

/**
 * Generate city-specific FAQ content
 */
export function generateCityFAQs(
  displayName: string,
  state: string,
  enhancements: CityEnhancement
): Array<{ q: string; a: string }> {
  const faqs: Array<{ q: string; a: string }> = [];

  // Use FAQs from enhancements if available, otherwise generate
  if (enhancements.faqs && enhancements.faqs.length > 0) {
    return enhancements.faqs.map((faq) => ({
      q: faq.question,
      a: faq.answer,
    }));
  }

  // Generate default FAQs with city context
  faqs.push({
    q: `How much does porta potty rental cost in ${displayName}?`,
    a: `Porta potty rental prices in ${displayName}, ${state} vary based on unit type, rental duration, delivery location within ${displayName}, and seasonal demand. We provide free, personalized quotes for ${displayName} projects and events with transparent, no-hidden-fee pricing.`,
  });

  faqs.push({
    q: `Do you deliver to all areas in ${displayName}?`,
    a: `Yes! We provide porta potty delivery throughout ${displayName} and surrounding ${state} areas. Same-day delivery is available for ${displayName} when ordered before 2 PM. We serve ${enhancements.neighborhoods.length > 0 ? `neighborhoods like ${enhancements.neighborhoods.slice(0, 2).join(" and ")}` : `all ${displayName} neighborhoods`} and beyond.`,
  });

  faqs.push({
    q: `How often are the porta potties cleaned in ${displayName}?`,
    a: `We clean and service our porta potties regularly in ${displayName}, typically weekly for long-term rentals, with additional cleaning available upon request. All units meet ${state} health department standards before every ${displayName} rental.`,
  });

  faqs.push({
    q: `What types of events do you serve in ${displayName}?`,
    a: `We serve all types of events in ${displayName}${enhancements.events.length > 0 ? `, including ${enhancements.events.slice(0, 2).join(" and ")}` : ""}: weddings, construction sites, festivals, corporate events, and more. Our ${displayName} team has experience with events of all sizes throughout the area.`,
  });

  return faqs;
}

/**
 * Generate city-specific event card description
 */
export function generateEventDescription(
  eventName: string,
  displayName: string,
  state: string
): string {
  const eventLower = eventName.toLowerCase();

  if (eventLower.includes("festival")) {
    return `Professional porta potty services for ${eventName} in ${displayName}. High-capacity solutions for festival attendees.`;
  }
  if (eventLower.includes("wedding") || eventLower.includes("reception")) {
    return `Elegant portable restroom solutions for ${eventName} in ${displayName}. Luxury units available for special occasions.`;
  }
  if (eventLower.includes("construction") || eventLower.includes("site")) {
    return `Reliable porta potty rentals for ${eventName} in ${displayName}. Long-term solutions with regular servicing.`;
  }
  if (eventLower.includes("sport") || eventLower.includes("game")) {
    return `Athletic event porta potty services for ${eventName} in ${displayName}. Durable units for sports competitions.`;
  }
  if (eventLower.includes("corporate") || eventLower.includes("business")) {
    return `Professional porta potty services for ${eventName} in ${displayName}. Corporate event sanitation solutions.`;
  }

  return `Porta potty rental services for ${eventName} in ${displayName}, ${state}. Professional sanitation solutions for ${displayName} events.`;
}
