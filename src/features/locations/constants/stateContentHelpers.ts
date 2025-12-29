/**
 * State-specific content helper functions
 * Generates unique content for services, features, and other sections
 * to avoid duplicate content across state pages
 */

import { StateData } from "./statesData";
import { StateUniqueContent } from "./stateUniqueContent";

export interface StateService {
  title: string;
  description: string;
}

/**
 * Generate state-specific service descriptions
 */
export function generateStateServices(
  state: StateData,
  uniqueContent: StateUniqueContent | null
): StateService[] {
  const services: StateService[] = [];

  // Service 1: Construction Sites
  if (uniqueContent?.constructionOverview) {
    services.push({
      title: "Construction Sites",
      description: uniqueContent.constructionOverview,
    });
  } else {
    const majorCities = state.cities.slice(0, 2).map((c) => c.name).join(" and ");
    services.push({
      title: "Construction Sites",
      description: `Long-term porta potty rentals for construction projects throughout ${state.displayName}. We serve major construction sites in ${majorCities} and across ${state.displayName} with OSHA-compliant units and regular servicing. Our units are designed for ${state.displayName}'s climate and regulatory requirements.`,
    });
  }

  // Service 2: Events & Festivals
  if (uniqueContent?.eventsOverview) {
    services.push({
      title: "Events & Festivals",
      description: uniqueContent.eventsOverview,
    });
  } else {
    const cityCount = state.cities.length;
    services.push({
      title: "Events & Festivals",
      description: `Clean, reliable portable toilets for weddings, festivals, concerts, and special events across ${state.displayName}. We serve events in all ${cityCount} major cities, providing high-capacity solutions for large gatherings and elegant units for special occasions throughout ${state.displayName}.`,
    });
  }

  // Service 3: Emergency Service - state-specific
  const majorCity = state.cities[0]?.name || state.displayName;
  services.push({
    title: "Emergency Service",
    description: `Same-day delivery available for urgent porta potty needs in ${state.displayName} cities. We provide rapid-response porta potty services throughout ${state.displayName}, including ${majorCity} and surrounding areas. Our emergency service ensures quick deployment when ${state.displayName} communities need portable restroom solutions most.`,
  });

  // Service 4: Long-term Rentals - state-specific
  services.push({
    title: "Long-term Rentals",
    description: `Weekly and monthly porta potty rental options with regular maintenance and cleaning throughout ${state.displayName}. Perfect for construction projects, ongoing events, and long-term facilities across ${state.displayName}'s ${state.cities.length} major cities. Our long-term rental plans offer the best value for ${state.displayName} projects.`,
  });

  return services;
}

/**
 * Generate state-specific features/benefits
 */
export function generateStateFeatures(
  state: StateData
): Array<{ title: string; description: string }> {
  const cityCount = state.cities.length;
  const majorCities = state.cities.slice(0, 3).map((c) => c.name).join(", ");
  const totalCities = state.cities.length;

  return [
    {
      title: `Serving ${cityCount} Major Cities`,
      description: `We provide porta potty rental services across ${state.displayName}, including ${majorCities}${totalCities > 3 ? `, and ${totalCities - 3} more cities` : ""}. Our network covers all major metropolitan areas in ${state.displayName}.`,
    },
    {
      title: "Statewide Coverage",
      description: `Comprehensive porta potty rental coverage throughout ${state.displayName}. Whether you're in urban centers or suburban areas, we deliver reliable portable toilet solutions across the entire state.`,
    },
    {
      title: "Local Expertise",
      description: `Our team understands ${state.displayName}'s unique requirements, from local regulations to climate considerations. We provide porta potty rentals tailored to ${state.displayName}'s specific needs.`,
    },
    {
      title: "Flexible Service Options",
      description: `Short-term event rentals and long-term construction solutions available throughout ${state.displayName}. We customize rental plans based on ${state.displayName} project timelines and event schedules.`,
    },
  ];
}

/**
 * Generate state-specific CTA description
 */
export function generateStateCTADescription(state: StateData): string {
  const cityCount = state.cities.length;
  const majorCities = state.cities.slice(0, 2).map((c) => c.name).join(" and ");
  
  return `Get an instant quote for porta potty rentals in ${state.displayName}. We serve ${cityCount} major cities including ${majorCities}${cityCount > 2 ? ` and ${cityCount - 2} more` : ""} with reliable, professional porta potty rental service throughout ${state.displayName}.`;
}

/**
 * Generate state-specific stats (if needed for future enhancements)
 */
export function generateStateStats(state: StateData) {
  return {
    citiesServed: state.cities.length,
    mileRadius: "50+",
    serviceHours: "24/7",
    citiesLabel: state.cities.length === 1 ? "City" : "Cities",
  };
}

