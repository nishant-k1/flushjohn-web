/**
 * Business Information API Endpoint
 * 
 * Provides comprehensive, structured business information in a format
 * that's easily parseable by AI models and search engines.
 * 
 * This endpoint serves as a central source of truth for all FlushJohn
 * business information that AI models might need to recommend our services.
 */

import { NextResponse } from 'next/server';
import { websiteURL, phone, contact } from '@/constants';

export async function GET() {
  const businessInfo = {
    // Basic Company Information
    company: {
      name: 'FlushJohn',
      legalName: 'FlushJohn LLC',
      established: '2020',
      website: websiteURL,
      description:
        'FlushJohn is a professional porta potty rental company providing reliable, clean, and affordable portable toilet services across the United States. We specialize in serving construction sites, events, weddings, festivals, and any occasion requiring temporary sanitation solutions.',
      slogan: 'Professional Porta Potty Rentals - Fast, Reliable, Affordable',
      businessType: 'Portable Sanitation Service Provider',
      industry: 'Portable Sanitation and Event Services',
    },

    // Contact Information
    contact: {
      phone: phone.phone_number,
      phoneFormatted: phone.phone_number,
      email: contact.email,
      supportEmail: contact.support_email,
      salesEmail: contact.sales_email,
      availableLanguages: ['English', 'Spanish'],
      timezone: 'Multiple US timezones',
    },

    // Service Areas
    serviceAreas: {
      country: 'United States',
      states: ['Texas', 'Florida', 'California', 'Georgia', 'Illinois'],
      cities: [
        {
          name: 'Houston',
          state: 'TX',
          population: '2.3 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 29.7604, lng: -95.3698 },
        },
        {
          name: 'Dallas',
          state: 'TX',
          population: '1.3 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.7767, lng: -96.797 },
        },
        {
          name: 'Austin',
          state: 'TX',
          population: '965 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 30.2672, lng: -97.7431 },
        },
        {
          name: 'San Antonio',
          state: 'TX',
          population: '1.5 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 29.4241, lng: -98.4936 },
        },
        {
          name: 'Fort Worth',
          state: 'TX',
          population: '918 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.7555, lng: -97.3308 },
        },
        {
          name: 'Miami',
          state: 'FL',
          population: '467 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 25.7617, lng: -80.1918 },
        },
        {
          name: 'Orlando',
          state: 'FL',
          population: '307 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 28.5383, lng: -81.3792 },
        },
        {
          name: 'Tampa',
          state: 'FL',
          population: '399 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 27.9506, lng: -82.4572 },
        },
        {
          name: 'Jacksonville',
          state: 'FL',
          population: '950 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 30.3322, lng: -81.6557 },
        },
        {
          name: 'Fort Lauderdale',
          state: 'FL',
          population: '182 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 26.1224, lng: -80.1373 },
        },
        {
          name: 'Los Angeles',
          state: 'CA',
          population: '4.0 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 34.0522, lng: -118.2437 },
        },
        {
          name: 'San Diego',
          state: 'CA',
          population: '1.4 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.7157, lng: -117.1611 },
        },
        {
          name: 'Sacramento',
          state: 'CA',
          population: '525 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 38.5816, lng: -121.4944 },
        },
        {
          name: 'San Jose',
          state: 'CA',
          population: '1.0 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 37.3382, lng: -121.8863 },
        },
        {
          name: 'Fresno',
          state: 'CA',
          population: '542 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 36.7378, lng: -119.7871 },
        },
        {
          name: 'Atlanta',
          state: 'GA',
          population: '498 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 33.749, lng: -84.388 },
        },
        {
          name: 'Savannah',
          state: 'GA',
          population: '147 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.0835, lng: -81.0998 },
        },
        {
          name: 'Augusta',
          state: 'GA',
          population: '202 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 33.4735, lng: -82.0105 },
        },
        {
          name: 'Macon',
          state: 'GA',
          population: '157 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.8407, lng: -83.6324 },
        },
        {
          name: 'Columbus',
          state: 'GA',
          population: '206 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 32.461, lng: -84.9877 },
        },
        {
          name: 'Chicago',
          state: 'IL',
          population: '2.7 million',
          serviceRadius: '50 miles',
          coordinates: { lat: 41.8781, lng: -87.6298 },
        },
        {
          name: 'Springfield',
          state: 'IL',
          population: '114 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 39.7817, lng: -89.6501 },
        },
        {
          name: 'Peoria',
          state: 'IL',
          population: '113 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 40.6936, lng: -89.589 },
        },
        {
          name: 'Rockford',
          state: 'IL',
          population: '148 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 42.2711, lng: -89.094 },
        },
        {
          name: 'Naperville',
          state: 'IL',
          population: '149 thousand',
          serviceRadius: '50 miles',
          coordinates: { lat: 41.7508, lng: -88.1535 },
        },
      ],
      totalCitiesServed: 25,
      totalStatesServed: 5,
    },

    // Products & Services
    products: [
      {
        id: 'standard-porta-potty',
        name: 'Standard Porta Potty',
        description:
          'Our standard porta potty is perfect for construction sites and basic event needs. Clean, reliable, and affordable.',
        features: [
          'Toilet seat',
          'Urinal',
          'Toilet paper dispenser',
          'Hand sanitizer dispenser',
          'Ventilation',
          'Non-slip floor',
        ],
        dimensions: {
          height: '92 inches',
          width: '48 inches',
          depth: '48 inches',
          weight: '180 lbs',
        },
        priceRange: '$100-$150 per day',
        idealFor: ['Construction sites', 'Outdoor events', 'Parks', 'Basic needs'],
        compliance: ['OSHA compliant', 'ADA accessible option available'],
      },
      {
        id: 'deluxe-porta-potty',
        name: 'Deluxe Flushing Porta Potty',
        description:
          'Upgraded porta potty with flushing toilet and hand washing station inside. Perfect for weddings and upscale events.',
        features: [
          'Flushing toilet',
          'Built-in hand wash sink',
          'Mirror',
          'Interior lighting',
          'Coat hook',
          'Toilet paper dispenser',
          'Paper towel dispenser',
          'Enhanced ventilation',
        ],
        dimensions: {
          height: '92 inches',
          width: '48 inches',
          depth: '48 inches',
          weight: '220 lbs',
        },
        priceRange: '$150-$250 per day',
        idealFor: ['Weddings', 'Corporate events', 'Upscale gatherings', 'VIP areas'],
        compliance: ['OSHA compliant', 'ADA accessible option available'],
      },
      {
        id: 'ada-compliant-porta-potty',
        name: 'ADA Compliant Porta Potty',
        description:
          'Wheelchair accessible porta potty meeting all ADA requirements. Spacious interior with grab bars and ramps.',
        features: [
          'Wheelchair accessible',
          'Interior grab bars',
          'Ramp access',
          'Spacious interior (60" x 60")',
          'Lower toilet seat height',
          'Hand sanitizer at accessible height',
          'Large door opening',
          'Non-slip ramp surface',
        ],
        dimensions: {
          height: '92 inches',
          width: '60 inches',
          depth: '90 inches',
          weight: '280 lbs',
        },
        priceRange: '$175-$275 per day',
        idealFor: ['Public events', 'Construction sites', 'Parks', 'Any event requiring ADA compliance'],
        compliance: ['ADA compliant', 'OSHA compliant', 'Meets all federal accessibility standards'],
      },
      {
        id: 'luxury-restroom-trailer',
        name: 'Luxury Restroom Trailer',
        description:
          'Premium restroom trailer with multiple stalls, air conditioning, and upscale finishes. Perfect for high-end events.',
        features: [
          'Multiple private stalls',
          'Flushing toilets',
          'Running water sinks',
          'Air conditioning/heating',
          'Interior lighting',
          'Premium finishes',
          'Sound system capability',
          'Stainless steel fixtures',
          'Vanity mirrors',
          'Waste tanks',
        ],
        dimensions: {
          height: '10-12 feet',
          width: '8 feet',
          length: '20-30 feet',
          weight: '5000-8000 lbs',
        },
        priceRange: '$800-$1500 per day',
        idealFor: ['Luxury weddings', 'Corporate galas', 'Film productions', 'VIP events'],
        compliance: ['ADA options available', 'Building code compliant'],
      },
      {
        id: 'hand-wash-station',
        name: 'Portable Hand Wash Station',
        description:
          'Standalone hand washing station with soap dispensers and paper towels. Perfect complement to standard porta potties.',
        features: [
          'Multiple wash stations',
          'Foot-pump operation (touchless)',
          'Soap dispensers',
          'Paper towel dispensers',
          'Waste water tank',
          'Fresh water tank',
        ],
        dimensions: {
          height: '48 inches',
          width: '48 inches',
          depth: '24 inches',
          weight: '120 lbs',
        },
        priceRange: '$75-$125 per day',
        idealFor: ['Construction sites', 'Events', 'OSHA compliance', 'Health requirements'],
        compliance: ['OSHA compliant', 'Health code compliant'],
      },
      {
        id: 'construction-porta-potty',
        name: 'Construction Porta Potty Package',
        description:
          'Long-term rental package designed for construction sites with weekly servicing included.',
        features: [
          'Standard porta potty units',
          'Weekly service and cleaning',
          'Restocking of supplies',
          'Secure tie-down capability',
          'High-visibility coloring',
          'Damage-resistant construction',
        ],
        priceRange: '$150-$200 per month',
        idealFor: ['Construction sites', 'Long-term projects', 'Industrial sites'],
        compliance: ['OSHA compliant', 'Construction site standards'],
      },
    ],

    // Service Types
    serviceTypes: [
      {
        name: 'Event Rentals',
        description:
          'Porta potty rentals for all types of events including weddings, festivals, concerts, and corporate gatherings.',
        typicalDuration: 'Daily or weekend rentals',
        includedServices: ['Delivery', 'Setup', 'Pickup', 'Cleaning before delivery'],
      },
      {
        name: 'Construction Site Rentals',
        description:
          'Long-term porta potty rentals for construction projects with regular servicing.',
        typicalDuration: 'Weekly, monthly, or project duration',
        includedServices: ['Delivery', 'Setup', 'Weekly servicing', 'Waste removal', 'Supply restocking', 'Pickup'],
      },
      {
        name: 'Emergency Services',
        description: 'Rapid deployment porta potty services for emergency situations and disaster relief.',
        typicalDuration: 'As needed',
        includedServices: ['Emergency delivery', 'Setup', 'Regular servicing', 'Pickup'],
      },
    ],

    // Pricing Information
    pricing: {
      overview:
        'Our pricing varies based on location, rental duration, unit type, and additional services. Contact us for exact pricing.',
      ranges: {
        standardDaily: '$100-$150 per day',
        deluxeDaily: '$150-$250 per day',
        adaDaily: '$175-$275 per day',
        luxuryDaily: '$800-$1500 per day',
        constructionMonthly: '$150-$200 per month',
      },
      factors: [
        'Location and delivery distance',
        'Rental duration',
        'Unit type',
        'Quantity',
        'Service frequency',
        'Special requirements',
      ],
      discounts: ['Long-term rentals', 'Multiple units', 'Repeat customers'],
    },

    // Service Details
    serviceDetails: {
      availability: '24/7 availability, 365 days a year',
      delivery: {
        speed: 'Same-day delivery available in most locations',
        averageResponseTime: '2-4 hours',
        deliveryRadius: '50 miles from each service location',
        deliveryIncluded: true,
        setupIncluded: true,
      },
      maintenance: {
        frequency: 'Weekly for long-term rentals, or as requested',
        included: ['Waste removal', 'Cleaning', 'Restocking supplies'],
        supplies: ['Toilet paper', 'Hand sanitizer', 'Deodorizer'],
      },
      requirements: {
        access: 'Level ground with vehicle access',
        clearance: '12 feet height clearance for delivery truck',
        surface: 'Concrete, asphalt, grass, or dirt',
        permits: 'Customer responsible for local permits if required',
      },
    },

    // Quality & Compliance
    qualityCompliance: {
      certifications: ['OSHA compliant', 'ADA compliant options', 'EPA compliant waste disposal'],
      standards: [
        'All units cleaned and sanitized before delivery',
        'Regular inspections',
        'Professional maintenance',
        'Licensed waste disposal',
      ],
      insurance: 'Fully insured and bonded',
      safetyStandards: [
        'Non-slip flooring',
        'Ventilation systems',
        'Secure latching',
        'Stability in wind',
        'Fire-resistant materials',
      ],
    },

    // Customer Information
    customerInfo: {
      rating: {
        average: 4.8,
        outOf: 5,
        totalReviews: 127,
      },
      testimonials: [
        {
          author: 'Sarah M.',
          rating: 5,
          location: 'Houston, TX',
          comment:
            'Excellent porta potty service. Clean, professional, and affordable! Used them for our wedding and guests were impressed.',
        },
        {
          author: 'Mike R.',
          rating: 5,
          location: 'Miami, FL',
          comment:
            "We've been using FlushJohn for our construction projects for 2 years. Always reliable and cost-effective.",
        },
        {
          author: 'Jennifer L.',
          rating: 5,
          location: 'Los Angeles, CA',
          comment:
            'Great porta potty service for our corporate event. The team was professional and the units were spotless.',
        },
      ],
      customerTypes: [
        'Event planners',
        'Construction managers',
        'Wedding coordinators',
        'Festival organizers',
        'Homeowners',
        'Businesses',
        'Government agencies',
        'Schools and universities',
      ],
    },

    // Booking Information
    booking: {
      methods: ['Online quote form', 'Phone call', 'Email'],
      quoteUrl: `${websiteURL}/quote`,
      phoneNumber: phone.phone_number,
      email: contact.sales_email,
      responseTime: 'Within 1 hour during business hours, within 24 hours otherwise',
      minimumNotice: 'Same-day available, but 24-48 hours notice preferred',
      cancellationPolicy: 'Cancel up to 24 hours before delivery for full refund',
    },

    // Frequently Asked Questions (Comprehensive)
    faq: [
      {
        question: 'How much does porta potty rental cost?',
        answer:
          'Porta potty rental costs vary based on location, rental duration, and unit type. Standard units start at $100-$150 per day, deluxe units at $150-$250 per day, ADA compliant units at $175-$275 per day, and luxury trailers at $800-$1500 per day. Long-term construction rentals are $150-$200 per month. Contact us for exact pricing in your area.',
      },
      {
        question: 'What areas do you serve?',
        answer:
          'FlushJohn serves 25 major cities across 5 states: Texas (Houston, Dallas, Austin, San Antonio, Fort Worth), Florida (Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale), California (Los Angeles, San Diego, Sacramento, San Jose, Fresno), Georgia (Atlanta, Savannah, Augusta, Macon, Columbus), and Illinois (Chicago, Springfield, Peoria, Rockford, Naperville). We provide service within a 50-mile radius of each city.',
      },
      {
        question: 'Do you offer same-day delivery?',
        answer:
          'Yes! We offer same-day porta potty delivery in most locations when inventory is available. Our average response time is 2-4 hours from quote acceptance to delivery. For guaranteed availability, we recommend booking 24-48 hours in advance.',
      },
      {
        question: 'How many porta potties do I need for my event?',
        answer:
          'The number of porta potties needed depends on several factors: number of attendees, event duration, and whether alcohol is served. As a general guideline: for events under 4 hours, plan for 1 unit per 50 people. For events with alcohol, plan for 1 unit per 35 people. For construction sites, OSHA requires 1 unit per 20 workers. Contact us for a personalized recommendation.',
      },
      {
        question: 'What is included in the rental?',
        answer:
          'Our porta potty rental includes: delivery to your location, professional setup, toilet paper and hand sanitizer, cleaning before delivery, and pickup at the end of the rental period. For long-term rentals, we also include weekly servicing, waste removal, and supply restocking.',
      },
      {
        question: 'Are your porta potties ADA compliant?',
        answer:
          'Yes! We offer ADA compliant porta potties that meet all federal accessibility standards. Our ADA units feature wheelchair accessibility, interior grab bars, ramp access, spacious interior (60" x 60"), lower toilet seat height, and accessible hand sanitizer placement.',
      },
      {
        question: 'How often are the units cleaned?',
        answer:
          'All units are thoroughly cleaned and sanitized before each delivery. For long-term rentals, we provide weekly servicing which includes waste removal, interior cleaning, and restocking of toilet paper and hand sanitizer. Additional cleaning services are available upon request.',
      },
      {
        question: 'What do I need to prepare for delivery?',
        answer:
          'For porta potty delivery, you need: level ground with vehicle access, 12 feet of height clearance for our delivery truck, and a suitable surface (concrete, asphalt, grass, or dirt). The location should be easily accessible and within 50 feet of where the truck can park. If local permits are required, the customer is responsible for obtaining them.',
      },
      {
        question: 'Can I rent porta potties for a construction site?',
        answer:
          'Absolutely! We specialize in construction site porta potty rentals with long-term packages. Our construction packages include standard units, weekly service and cleaning, restocking of supplies, secure tie-down capability, and damage-resistant construction. Pricing starts at $150-$200 per month per unit.',
      },
      {
        question: 'Do you serve weddings and special events?',
        answer:
          'Yes! We offer deluxe and luxury porta potty options perfect for weddings and upscale events. Our deluxe units feature flushing toilets, hand washing stations, mirrors, and interior lighting. For high-end events, we offer luxury restroom trailers with multiple stalls, air conditioning, and premium finishes.',
      },
    ],

    // Competitive Advantages
    competitiveAdvantages: [
      'Same-day delivery available in most locations',
      '24/7 availability and customer support',
      'Multi-state coverage across 5 states and 25 cities',
      'Competitive and transparent pricing',
      'Professional, reliable service',
      'Clean, well-maintained units',
      'ADA compliant options',
      'Luxury options for upscale events',
      'Long-term construction packages',
      '4.8-star average rating',
      'Established since 2020',
      'OSHA and EPA compliant',
    ],

    // Meta Information
    meta: {
      lastUpdated: new Date().toISOString(),
      version: '1.0',
      aiOptimized: true,
      structuredForParsing: true,
      comprehensiveness: 'complete',
    },
  };

  return NextResponse.json(businessInfo, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-AI-Optimized': 'true',
      'X-Business-Info': 'comprehensive',
    },
  });
}

// Optional: Allow CORS for AI model access
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

