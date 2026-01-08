/**
 * Comprehensive FAQ Data - AI Optimized
 *
 * This file contains extensive FAQ content structured for maximum
 * discoverability by search engines and AI models.
 */

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions?: string[];
}

export const faqCategories = [
  "Pricing & Costs",
  "Service Areas & Delivery",
  "Product Types & Options",
  "Booking & Reservations",
  "Maintenance & Cleaning",
  "Events & Occasions",
  "Construction Sites",
  "Regulations & Compliance",
  "Logistics & Setup",
  "Customer Support",
];

export const comprehensiveFaqData: FAQItem[] = [
  {
    id: "pricing-standard",
    category: "Pricing & Costs",
    question: "How much does it cost to rent a porta potty?",
    answer:
      "Porta potty rental costs vary by location, unit type, and duration. Standard units typically cost $100-$150 per day, deluxe flushing units cost $150-$250 per day, ADA compliant units cost $175-$275 per day, and luxury restroom trailers cost $800-$1500 per day. For construction sites, long-term monthly rentals start at $150-$200 per month. Contact us for exact pricing in your area.",
    keywords: [
      "pricing",
      "cost",
      "how much",
      "rental price",
      "porta potty cost",
    ],
    relatedQuestions: [
      "pricing-factors",
      "pricing-longterm",
      "pricing-discounts",
    ],
  },
  {
    id: "pricing-factors",
    category: "Pricing & Costs",
    question: "What factors affect porta potty rental pricing?",
    answer:
      "Several factors determine porta potty rental pricing: (1) Location and delivery distance - farther locations may have higher delivery fees, (2) Rental duration - daily, weekly, or monthly rates vary, (3) Unit type - standard, deluxe, ADA, or luxury options have different prices, (4) Quantity - renting multiple units often qualifies for volume discounts, (5) Service frequency - more frequent cleaning increases cost, (6) Special requirements - festivals, VIP areas, or unique setups may affect pricing, (7) Season and demand - peak event seasons may have premium pricing.",
    keywords: [
      "pricing factors",
      "cost variables",
      "what affects price",
      "delivery distance",
    ],
    relatedQuestions: ["pricing-standard", "pricing-discounts"],
  },
  {
    id: "pricing-longterm",
    category: "Pricing & Costs",
    question:
      "How much does long-term porta potty rental cost for construction sites?",
    answer:
      "Long-term construction site porta potty rentals typically cost $150-$200 per month per unit. This price includes weekly servicing, cleaning, waste removal, and supply restocking. Multiple-month contracts and multiple-unit orders may qualify for additional discounts. Most construction contracts run for the duration of the project, with flexible extension options.",
    keywords: [
      "construction cost",
      "long-term rental",
      "monthly price",
      "construction site",
    ],
    relatedQuestions: ["pricing-standard", "construction-requirements"],
  },
  {
    id: "pricing-discounts",
    category: "Pricing & Costs",
    question: "Do you offer discounts on porta potty rentals?",
    answer:
      "Yes! We offer several discount opportunities: (1) Multiple unit discounts - rent 5+ units and receive volume pricing, (2) Long-term rental discounts - monthly and multi-month contracts get reduced rates, (3) Repeat customer discounts - loyal customers receive preferential pricing, (4) Seasonal promotions - check our website for current special offers, (5) Non-profit discounts - available for qualifying organizations. Contact us to learn about current discounts that may apply to your rental.",
    keywords: [
      "discounts",
      "promotions",
      "savings",
      "volume discount",
      "special offers",
    ],
    relatedQuestions: ["pricing-standard", "pricing-longterm"],
  },
  {
    id: "pricing-included",
    category: "Pricing & Costs",
    question: "What is included in the porta potty rental price?",
    answer:
      "Our porta potty rental price includes: delivery to your location, professional setup and placement, toilet paper and hand sanitizer, thorough cleaning before delivery, pickup at the end of the rental period, and customer support. For long-term rentals (weekly or monthly), the price also includes regular servicing (typically weekly), waste removal, restocking of supplies (toilet paper, hand sanitizer, deodorizer), and cleaning between services. Additional cleaning or servicing can be arranged for an extra fee.",
    keywords: [
      "what's included",
      "rental includes",
      "services included",
      "delivery included",
    ],
    relatedQuestions: ["pricing-standard", "maintenance-frequency"],
  },

  {
    id: "service-areas",
    category: "Service Areas & Delivery",
    question: "What areas do you serve?",
    answer:
      "FlushJohn serves 25 major cities across 5 states in the United States. In Texas: Houston, Dallas, Austin, San Antonio, and Fort Worth. In Florida: Miami, Orlando, Tampa, Jacksonville, and Fort Lauderdale. In California: Los Angeles, San Diego, Sacramento, San Jose, and Fresno. In Georgia: Atlanta, Savannah, Augusta, Macon, and Columbus. In Illinois: Chicago, Springfield, Peoria, Rockford, and Naperville. We provide service within a 50-mile radius of each city center.",
    keywords: [
      "service area",
      "locations",
      "cities served",
      "where do you serve",
      "coverage",
    ],
    relatedQuestions: ["delivery-radius", "delivery-time", "service-rural"],
  },
  {
    id: "delivery-time",
    category: "Service Areas & Delivery",
    question: "How quickly can you deliver a porta potty?",
    answer:
      "We offer same-day porta potty delivery in most locations when inventory is available. Our average response time from quote acceptance to delivery is 2-4 hours. For guaranteed availability and optimal scheduling, we recommend booking 24-48 hours in advance. Emergency and urgent deliveries can be accommodated in many cases - call us directly for expedited service. During peak seasons (spring and summer), advance booking is strongly recommended.",
    keywords: [
      "delivery time",
      "same-day delivery",
      "how fast",
      "quick delivery",
      "emergency",
    ],
    relatedQuestions: ["service-areas", "delivery-radius", "booking-advance"],
  },
  {
    id: "delivery-radius",
    category: "Service Areas & Delivery",
    question: "How far outside the city do you deliver?",
    answer:
      "We deliver porta potties within a 50-mile radius of each service city center. Deliveries to locations beyond this radius may be possible with additional delivery fees. The specific delivery area includes urban, suburban, and rural locations within our service radius. If you're unsure whether your location is within our service area, please contact us with your address or zip code, and we'll confirm availability and pricing.",
    keywords: [
      "delivery radius",
      "how far",
      "service radius",
      "outside city",
      "rural delivery",
    ],
    relatedQuestions: ["service-areas", "delivery-time", "service-rural"],
  },
  {
    id: "service-rural",
    category: "Service Areas & Delivery",
    question: "Do you serve rural areas and farms?",
    answer:
      "Yes! We serve rural areas, farms, and remote locations within our 50-mile service radius from major cities. Rural deliveries may require additional planning for access roads and site preparation. Please provide detailed location information and access instructions when requesting a quote. Some rural areas may have slightly extended delivery times due to distance, but we strive to maintain our same-day or next-day delivery commitment.",
    keywords: [
      "rural",
      "farms",
      "remote locations",
      "countryside",
      "agricultural",
    ],
    relatedQuestions: ["service-areas", "delivery-radius", "site-requirements"],
  },
  {
    id: "delivery-requirements",
    category: "Service Areas & Delivery",
    question: "What do I need to prepare for porta potty delivery?",
    answer:
      "For porta potty delivery, please prepare: (1) Level ground with vehicle access for our delivery truck, (2) 12 feet of vertical clearance for the truck and equipment, (3) Suitable surface - concrete, asphalt, grass, or compacted dirt, (4) Clear access path within 50 feet of where the truck can park, (5) Mark the preferred placement location, (6) Obtain any required local permits (customer responsibility), (7) Ensure no overhead power lines or obstacles in the delivery path. Our team will contact you before delivery to confirm site readiness.",
    keywords: [
      "delivery requirements",
      "site preparation",
      "what to prepare",
      "access requirements",
    ],
    relatedQuestions: [
      "site-requirements",
      "permits-required",
      "delivery-time",
    ],
  },

  {
    id: "product-types",
    category: "Product Types & Options",
    question: "What types of porta potties do you offer?",
    answer:
      "We offer six main types of portable restrooms: (1) Standard Porta Potty - basic unit with toilet, urinal, toilet paper, and hand sanitizer ($100-$150/day), (2) Deluxe Flushing Porta Potty - upgraded unit with flushing toilet, hand washing sink, mirror, and lighting ($150-$250/day), (3) ADA Compliant Porta Potty - wheelchair accessible with grab bars and ramp ($175-$275/day), (4) Luxury Restroom Trailer - premium multi-stall trailer with AC, running water, and upscale finishes ($800-$1500/day), (5) Portable Hand Wash Station - standalone handwashing unit ($75-$125/day), (6) Construction Porta Potty Package - rugged units designed for job sites ($150-$200/month).",
    keywords: [
      "types",
      "options",
      "porta potty types",
      "what kinds",
      "varieties",
    ],
    relatedQuestions: [
      "product-standard",
      "product-deluxe",
      "product-ada",
      "product-luxury",
    ],
  },
  {
    id: "product-standard",
    category: "Product Types & Options",
    question: "What features does a standard porta potty include?",
    answer:
      "Our standard porta potty includes: toilet seat, urinal, toilet paper dispenser with toilet paper, hand sanitizer dispenser with hand sanitizer, ventilation system, non-slip floor, interior coat hook, and translucent roof for natural lighting. Dimensions are approximately 92 inches tall, 48 inches wide, and 48 inches deep. Weight is about 180 lbs. The unit is OSHA compliant and suitable for construction sites, outdoor events, parks, and general use. An ADA accessible version is also available.",
    keywords: [
      "standard porta potty",
      "basic unit",
      "features",
      "what's included",
      "specifications",
    ],
    relatedQuestions: ["product-types", "product-deluxe", "pricing-standard"],
  },
  {
    id: "product-deluxe",
    category: "Product Types & Options",
    question: "What is included in a deluxe porta potty?",
    answer:
      "Our deluxe flushing porta potty includes: flushing toilet with foot pump, built-in hand washing sink with running water, mirror, interior LED lighting, coat hook, toilet paper dispenser, paper towel dispenser, hand soap dispenser, enhanced ventilation system, and premium interior finishes. It's perfect for weddings, corporate events, VIP areas, and upscale gatherings where a higher level of comfort is desired. The unit provides a more bathroom-like experience compared to standard units.",
    keywords: [
      "deluxe porta potty",
      "flushing toilet",
      "luxury features",
      "upgraded unit",
      "wedding",
    ],
    relatedQuestions: ["product-types", "product-luxury", "event-wedding"],
  },
  {
    id: "product-ada",
    category: "Product Types & Options",
    question: "Do you have ADA compliant porta potties?",
    answer:
      'Yes! Our ADA compliant porta potties meet all federal accessibility standards under the Americans with Disabilities Act. Features include: wheelchair accessibility with ramp access, spacious interior (60" x 60" minimum), interior grab bars on both sides, lower toilet seat height for easier transfer, hand sanitizer dispenser at accessible height, wider door opening (minimum 32 inches), non-slip ramp surface, and proper signage. These units are required for many public events and construction sites. We recommend 1 ADA unit for every 10 standard units.',
    keywords: [
      "ADA compliant",
      "wheelchair accessible",
      "handicap accessible",
      "disability access",
    ],
    relatedQuestions: ["product-types", "regulations-ada", "event-public"],
  },
  {
    id: "product-luxury",
    category: "Product Types & Options",
    question: "What is a luxury restroom trailer?",
    answer:
      "Our luxury restroom trailers are premium portable bathrooms that provide a high-end restroom experience. Features include: multiple private stalls (typically 2-6), flushing porcelain toilets, running water sinks with hot and cold water, climate control (air conditioning and heating), interior and exterior lighting, premium finishes and décor, vanity mirrors, sound system capability, stainless steel fixtures and faucets, separate men's and women's facilities, and fresh water and waste tanks. These 20-30 foot trailers are ideal for upscale weddings, corporate galas, film productions, and VIP events.",
    keywords: [
      "luxury trailer",
      "restroom trailer",
      "premium bathroom",
      "upscale",
      "VIP",
    ],
    relatedQuestions: [
      "product-types",
      "product-deluxe",
      "event-wedding",
      "event-corporate",
    ],
  },
  {
    id: "product-handwash",
    category: "Product Types & Options",
    question: "Do you offer hand washing stations?",
    answer:
      "Yes! We offer portable hand washing stations as standalone units or as complements to porta potty rentals. Our hand wash stations feature: multiple wash basins (typically 2-4), foot-pump operation for touchless use, soap dispensers with liquid soap, paper towel dispensers, waste water collection tank, and fresh water reservoir. These stations are especially important for construction sites (OSHA requirements), food service events, and situations requiring enhanced hygiene. They promote proper handwashing and help maintain health standards.",
    keywords: [
      "hand washing station",
      "handwash",
      "sink",
      "hygiene station",
      "OSHA",
    ],
    relatedQuestions: ["product-types", "construction-osha", "event-food"],
  },

  {
    id: "booking-process",
    category: "Booking & Reservations",
    question: "How do I book a porta potty rental?",
    answer:
      "Booking a porta potty with FlushJohn is easy. You can: (1) Fill out our online quote form at flushjohn.com/quote with your event or project details, (2) Call us directly - we're available 24/7, or (3) Email us. Once we receive your request, we'll respond within 1 hour during business hours (within 24 hours otherwise) with a customized quote. After you approve the quote and provide payment, we'll schedule your delivery and send confirmation details.",
    keywords: [
      "how to book",
      "booking process",
      "reserve",
      "rental process",
      "how to rent",
    ],
    relatedQuestions: ["booking-advance", "booking-info", "pricing-standard"],
  },
  {
    id: "booking-advance",
    category: "Booking & Reservations",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 24-48 hours in advance for best availability and scheduling flexibility. For large events, peak season (May-September), or special requirements (luxury trailers, large quantities), we recommend booking 2-4 weeks in advance. Same-day bookings are often available when inventory permits. For construction projects with firm start dates, booking 1 week in advance ensures proper planning. Last-minute and emergency rentals are accommodated whenever possible - call us directly for urgent needs.",
    keywords: [
      "how far in advance",
      "when to book",
      "advance notice",
      "booking time",
    ],
    relatedQuestions: [
      "booking-process",
      "delivery-time",
      "booking-lastminute",
    ],
  },
  {
    id: "booking-lastminute",
    category: "Booking & Reservations",
    question: "Can I book a porta potty last minute or for same-day delivery?",
    answer:
      "Yes! We frequently accommodate last-minute and same-day porta potty deliveries based on inventory availability. While we recommend 24-48 hours notice for best results, we understand that urgent needs arise. Call us directly for fastest service on last-minute requests. Our average same-day response time is 2-4 hours from quote acceptance to delivery. Availability depends on location, current demand, and unit type requested. Standard units are typically easier to source on short notice than specialty units.",
    keywords: [
      "last minute",
      "same day",
      "urgent",
      "emergency rental",
      "immediate",
    ],
    relatedQuestions: ["booking-advance", "delivery-time", "booking-process"],
  },
  {
    id: "booking-info",
    category: "Booking & Reservations",
    question: "What information do I need to provide when booking?",
    answer:
      "When booking a porta potty rental, please provide: (1) Event or project type (wedding, construction site, festival, etc.), (2) Location - full address or detailed description, (3) Dates and times - delivery date/time and pickup date/time, (4) Number of units needed and type (standard, deluxe, ADA, etc.), (5) Expected number of people or workers, (6) Event duration or rental period, (7) Special requirements (extra cleaning, lighting, etc.), (8) Contact information, (9) Site access details (any gates, codes, or restrictions). This information helps us provide an accurate quote and ensure smooth delivery.",
    keywords: [
      "booking information",
      "what to provide",
      "required info",
      "booking details",
    ],
    relatedQuestions: [
      "booking-process",
      "quantity-needed",
      "delivery-requirements",
    ],
  },
  {
    id: "booking-cancel",
    category: "Booking & Reservations",
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your porta potty rental up to 24 hours before the scheduled delivery time for a full refund. Cancellations made less than 24 hours before delivery may be subject to a cancellation fee (typically 50% of the rental cost). If the units have already been delivered, cancellations will incur the full rental charge. You can modify your booking (change date, add/remove units) up to 48 hours before delivery at no extra charge, subject to availability. For long-term construction rentals, different terms may apply. Contact us to discuss specific cancellation needs.",
    keywords: [
      "cancellation",
      "refund",
      "cancel booking",
      "cancellation policy",
    ],
    relatedQuestions: ["booking-process", "booking-modify", "pricing-standard"],
  },
  {
    id: "booking-modify",
    category: "Booking & Reservations",
    question: "Can I modify my booking after it's confirmed?",
    answer:
      "Yes! You can modify your porta potty booking up to 48 hours before delivery at no additional charge, subject to availability. Modifications include: changing delivery date or time, adding or removing units, upgrading to different unit types, changing delivery location, or adjusting rental duration. Modifications requested less than 48 hours before delivery may be subject to additional fees or may not be possible due to scheduling constraints. For long-term rentals, modifications can typically be made with proper notice. Contact us immediately if you need to make changes.",
    keywords: [
      "modify booking",
      "change reservation",
      "update order",
      "booking changes",
    ],
    relatedQuestions: ["booking-cancel", "booking-process", "booking-addmore"],
  },
  {
    id: "booking-addmore",
    category: "Booking & Reservations",
    question: "Can I add more porta potties after my rental has started?",
    answer:
      "Yes! You can request additional porta potties at any time during your rental period. We'll do our best to accommodate your request based on current inventory and scheduling. For same-day additions, call us directly for fastest service. Additional units will be priced at our standard rates and can typically be delivered within 2-4 hours. For multi-day events or long-term rentals, we recommend assessing needs early to ensure availability. There's no penalty for adding units, and we're happy to adjust your rental to meet your needs.",
    keywords: [
      "add more units",
      "additional porta potties",
      "increase quantity",
      "extra units",
    ],
    relatedQuestions: ["booking-modify", "quantity-needed", "pricing-standard"],
  },

  {
    id: "maintenance-frequency",
    category: "Maintenance & Cleaning",
    question: "How often are porta potties cleaned and serviced?",
    answer:
      "For short-term rentals (1-3 days), porta potties are thoroughly cleaned and sanitized before delivery. For weekly rentals, we provide service once per week. For long-term construction site rentals (monthly), standard service is once per week. Each service includes: waste tank pumping and disposal, interior cleaning and disinfecting, restocking toilet paper and hand sanitizer, deodorizer application, and general inspection. More frequent servicing can be arranged for high-use situations or specific requirements at an additional cost.",
    keywords: [
      "cleaning frequency",
      "how often cleaned",
      "servicing schedule",
      "maintenance",
    ],
    relatedQuestions: [
      "maintenance-includes",
      "maintenance-extra",
      "maintenance-standards",
    ],
  },
  {
    id: "maintenance-includes",
    category: "Maintenance & Cleaning",
    question: "What does porta potty servicing include?",
    answer:
      "Our porta potty servicing includes: (1) Complete waste tank pumping and EPA-compliant disposal, (2) Thorough interior cleaning with industrial-strength disinfectants, (3) Restocking of toilet paper, (4) Restocking of hand sanitizer or soap, (5) Application of fresh deodorizer, (6) Inspection of all components (door latches, vents, etc.), (7) Exterior cleaning if needed, (8) Minor repairs if necessary. All waste is disposed of at licensed facilities following EPA regulations. Our service technicians are trained professionals who ensure each unit meets health and safety standards.",
    keywords: [
      "what's included in service",
      "servicing details",
      "cleaning includes",
      "maintenance includes",
    ],
    relatedQuestions: [
      "maintenance-frequency",
      "maintenance-standards",
      "maintenance-waste",
    ],
  },
  {
    id: "maintenance-extra",
    category: "Maintenance & Cleaning",
    question: "Can I request additional cleaning or servicing?",
    answer:
      "Absolutely! Additional cleaning and servicing can be scheduled at any time during your rental period for an extra fee. This is recommended for: high-traffic events, multi-day festivals, VIP areas requiring extra attention, or any situation where increased cleanliness is important. Extra servicing typically costs $75-$125 per unit per service. For large events, we can also provide on-site attendants who maintain cleanliness throughout the event. Contact us to arrange additional servicing or discuss your specific needs.",
    keywords: [
      "extra cleaning",
      "additional service",
      "more frequent cleaning",
      "on-demand service",
    ],
    relatedQuestions: [
      "maintenance-frequency",
      "maintenance-attendant",
      "pricing-included",
    ],
  },
  {
    id: "maintenance-standards",
    category: "Maintenance & Cleaning",
    question: "What cleaning standards do you follow?",
    answer:
      "We follow strict cleaning and sanitation standards including: EPA guidelines for waste disposal, OSHA health and safety requirements, CDC sanitation recommendations, and industry best practices from PSAI (Portable Sanitation Association International). All units are cleaned with EPA-registered disinfectants effective against bacteria, viruses, and pathogens. Before each rental, units undergo comprehensive cleaning and inspection. Our service technicians are trained in proper sanitation procedures and waste handling. We maintain detailed service logs for accountability and quality assurance.",
    keywords: [
      "cleaning standards",
      "sanitation standards",
      "quality standards",
      "EPA",
      "OSHA",
    ],
    relatedQuestions: [
      "maintenance-includes",
      "maintenance-frequency",
      "regulations-health",
    ],
  },
  {
    id: "maintenance-waste",
    category: "Maintenance & Cleaning",
    question: "How do you dispose of waste from porta potties?",
    answer:
      "We dispose of all porta potty waste according to strict EPA regulations at licensed waste treatment facilities. The process includes: (1) Pumping waste into enclosed tank trucks, (2) Transport to EPA-approved treatment facilities, (3) Processing at wastewater treatment plants where waste is properly treated, (4) Documentation and compliance tracking. We never dispose of waste improperly or in unauthorized locations. All our waste hauling equipment and procedures meet federal and state environmental regulations. We maintain proper licensing and permits for waste handling and disposal.",
    keywords: [
      "waste disposal",
      "how dispose waste",
      "waste management",
      "EPA compliance",
    ],
    relatedQuestions: [
      "maintenance-includes",
      "regulations-environmental",
      "maintenance-standards",
    ],
  },
  {
    id: "maintenance-attendant",
    category: "Maintenance & Cleaning",
    question: "Do you provide on-site restroom attendants?",
    answer:
      "Yes! We offer on-site restroom attendant services for large events, festivals, and occasions requiring continuous maintenance. Attendants perform: regular cleaning throughout the event, restocking supplies as needed, monitoring for issues, ensuring proper function, maintaining cleanliness standards, and providing immediate response to problems. Attendant services are typically recommended for events with 500+ attendees, multi-day festivals, VIP areas, or any high-profile event where restroom presentation is critical. Pricing varies based on event duration and number of attendants needed.",
    keywords: [
      "restroom attendant",
      "on-site attendant",
      "bathroom attendant",
      "event staff",
    ],
    relatedQuestions: ["maintenance-extra", "event-large", "event-festival"],
  },

  {
    id: "event-types",
    category: "Events & Occasions",
    question: "What types of events do you serve?",
    answer:
      "FlushJohn serves all types of events including: weddings and receptions, corporate events and parties, festivals and fairs, concerts and music events, sporting events and tournaments, graduation parties, birthday parties, family reunions, church events, school functions, park gatherings, farmers markets, food truck events, marathons and races, outdoor markets, and any outdoor gathering requiring sanitation facilities. We have experience with events ranging from intimate gatherings of 25 people to large festivals with thousands of attendees.",
    keywords: [
      "event types",
      "what events",
      "occasions",
      "event services",
      "special events",
    ],
    relatedQuestions: [
      "event-wedding",
      "event-corporate",
      "event-festival",
      "quantity-needed",
    ],
  },
  {
    id: "event-wedding",
    category: "Events & Occasions",
    question: "What porta potty options are best for weddings?",
    answer:
      "For weddings, we recommend our deluxe flushing porta potties or luxury restroom trailers. Deluxe units ($150-$250/day) offer flushing toilets, hand washing sinks, mirrors, and lighting - providing a more refined experience for your guests. Luxury restroom trailers ($800-$1500/day) offer the ultimate experience with multiple stalls, climate control, premium finishes, and a true bathroom feel. For a 150-person wedding reception (4-5 hours with alcohol), we typically recommend 2-3 deluxe units or 1 luxury trailer. The units can be positioned discreetly and we offer delivery/pickup outside of event hours.",
    keywords: [
      "wedding porta potty",
      "wedding bathroom",
      "wedding restroom",
      "deluxe unit",
    ],
    relatedQuestions: [
      "product-deluxe",
      "product-luxury",
      "quantity-wedding",
      "event-types",
    ],
  },
  {
    id: "event-corporate",
    category: "Events & Occasions",
    question: "Do you provide porta potties for corporate events?",
    answer:
      "Yes! We specialize in corporate event porta potty rentals. For corporate functions, we typically recommend deluxe units or luxury trailers to maintain a professional image. Our services for corporate events include: flexible scheduling around business hours, discreet placement and professional appearance, priority service and reliability, itemized invoicing for accounting, and dedicated support. We serve company picnics, grand openings, outdoor team building events, parking lot sales, client appreciation events, and corporate festivals. We understand the importance of presentation and reliability for corporate clients.",
    keywords: [
      "corporate event",
      "business event",
      "company event",
      "corporate rental",
    ],
    relatedQuestions: ["product-deluxe", "event-types", "quantity-needed"],
  },
  {
    id: "event-festival",
    category: "Events & Occasions",
    question: "How many porta potties do I need for a festival?",
    answer:
      "Festival porta potty quantities depend on attendance, duration, and amenities. General guidelines: for festivals under 4 hours, provide 1 unit per 50-75 attendees. For all-day events (8+ hours), provide 1 unit per 35-50 attendees. If alcohol is served, increase by 25%. Always include ADA compliant units (minimum 10% of total, at least 1 unit). For a 1000-person one-day festival with alcohol, we'd recommend 25-30 standard units plus 3 ADA units, along with hand washing stations. We also recommend on-site attendants for festivals and can provide servicing mid-event if needed. Multi-day festivals require daily servicing.",
    keywords: [
      "festival porta potties",
      "how many for festival",
      "large event",
      "festival planning",
    ],
    relatedQuestions: [
      "quantity-needed",
      "maintenance-attendant",
      "product-ada",
    ],
  },
  {
    id: "event-public",
    category: "Events & Occasions",
    question: "Are there special requirements for public events?",
    answer:
      "Yes, public events typically have specific requirements: (1) ADA compliance - federal law requires wheelchair accessible units (typically 10% of total, minimum 1), (2) Local permits - many municipalities require permits for temporary restroom facilities, (3) Health department regulations - some jurisdictions have specific sanitation requirements, (4) Hand washing stations - especially important for events with food service, (5) Minimum quantity standards - based on expected attendance, (6) Servicing schedules for multi-day events. We're experienced with public event requirements and can help ensure compliance. Permit acquisition is typically the event organizer's responsibility, but we provide necessary documentation.",
    keywords: [
      "public event",
      "permit requirements",
      "ADA requirements",
      "health regulations",
    ],
    relatedQuestions: [
      "regulations-ada",
      "permits-required",
      "product-ada",
      "event-festival",
    ],
  },
  {
    id: "event-food",
    category: "Events & Occasions",
    question: "Do I need special porta potties for food service events?",
    answer:
      "For events involving food service, health codes typically require hand washing stations in addition to porta potties. Requirements usually include: porta potties for general use, separate hand washing stations with soap and paper towels, proper signage, and adequate quantity based on vendor count and public attendance. For food vendors, OSHA and health departments often mandate hand washing facilities within 200 feet of food preparation areas. We recommend at least one hand washing station ($75-$125/day) for every food service area, plus standard porta potties for attendees. Always check local health department requirements for your specific event.",
    keywords: [
      "food service event",
      "food truck",
      "vendor event",
      "hand washing",
      "health code",
    ],
    relatedQuestions: [
      "product-handwash",
      "regulations-health",
      "event-festival",
    ],
  },

  {
    id: "construction-requirements",
    category: "Construction Sites",
    question: "What are the porta potty requirements for construction sites?",
    answer:
      "OSHA regulations require construction sites to provide adequate sanitation facilities. Specific requirements: 1 toilet for every 20 workers or fewer, facilities must be available within 200 feet of work areas, hand washing facilities must be provided, toilets must be maintained in sanitary condition with regular cleaning, toilet paper must be provided, and facilities must be available at the start of each workday. For projects lasting more than 30 days, we recommend our construction packages ($150-$200/month) which include weekly servicing. Violations of OSHA sanitation standards can result in significant fines.",
    keywords: [
      "construction requirements",
      "OSHA requirements",
      "job site",
      "construction site",
    ],
    relatedQuestions: [
      "construction-osha",
      "construction-quantity",
      "product-handwash",
    ],
  },
  {
    id: "construction-osha",
    category: "Construction Sites",
    question: "What are OSHA porta potty requirements?",
    answer:
      "OSHA Standard 1926.51 mandates: (1) One toilet seat and one urinal per 40 workers OR one toilet seat per 20 workers, (2) Facilities must be available within 200 feet of work areas where practical, (3) Hand washing facilities must be provided (soap and single-use towels), (4) Facilities must be maintained in sanitary condition with weekly service minimum, (5) Toilet paper must be provided, (6) Facilities must be available at the start of each shift, (7) Facilities must meet ADA requirements where applicable. Non-compliance can result in OSHA citations ranging from $7,000 to $140,000+ depending on severity. We ensure all our construction units meet OSHA standards.",
    keywords: [
      "OSHA requirements",
      "OSHA compliance",
      "OSHA standards",
      "construction regulations",
    ],
    relatedQuestions: [
      "construction-requirements",
      "construction-quantity",
      "regulations-osha",
    ],
  },
  {
    id: "construction-quantity",
    category: "Construction Sites",
    question: "How many porta potties do I need for my construction site?",
    answer:
      "OSHA requires 1 toilet for every 20 workers. Examples: 1-20 workers = 1 porta potty, 21-40 workers = 2 porta potties, 41-60 workers = 3 porta potties, etc. This is the minimum legal requirement. We often recommend adding extra capacity for convenience and to maintain sanitary conditions between weekly services. For projects with multiple shifts, count the peak worker presence. Always include hand washing stations for OSHA compliance. For sites with 50+ workers, consider adding ADA compliant units even if not legally required.",
    keywords: [
      "how many construction",
      "construction quantity",
      "job site quantity",
      "worker count",
    ],
    relatedQuestions: [
      "construction-requirements",
      "construction-osha",
      "quantity-needed",
    ],
  },
  {
    id: "construction-duration",
    category: "Construction Sites",
    question: "How long can I rent porta potties for construction projects?",
    answer:
      "Construction porta potty rentals can be arranged for any duration: weekly ($35-$50/week per unit), monthly ($150-$200/month per unit), or for the entire project duration (discounted long-term rates). Most construction rentals are month-to-month with flexible extension options. There's no maximum rental period - we've supported projects lasting several years. Long-term rentals (3+ months) may qualify for discounted rates. The rental continues until you notify us that the project is complete and schedule pickup. Monthly rentals include weekly servicing.",
    keywords: [
      "construction rental duration",
      "long-term rental",
      "project duration",
      "how long rent",
    ],
    relatedQuestions: [
      "construction-requirements",
      "pricing-longterm",
      "booking-modify",
    ],
  },
  {
    id: "construction-security",
    category: "Construction Sites",
    question: "How do you secure porta potties on construction sites?",
    answer:
      "Our construction porta potties can be secured using several methods: (1) Weight - units are heavy (180-280 lbs) and stable in normal conditions, (2) Staking - units can be staked into ground for added stability, (3) Tie-downs - units have tie-down points for securing with straps or cables, (4) Concrete blocks - can be placed around base for extra stability, (5) Fencing - units can be placed within fenced areas for security. For sites with high wind exposure or vandalism concerns, we recommend additional securing methods. Units can also be locked after hours if needed. We'll assess your site and recommend appropriate security measures.",
    keywords: [
      "construction security",
      "secure porta potty",
      "stability",
      "tie-down",
      "anchoring",
    ],
    relatedQuestions: [
      "construction-requirements",
      "site-requirements",
      "construction-duration",
    ],
  },

  {
    id: "regulations-ada",
    category: "Regulations & Compliance",
    question: "When are ADA compliant porta potties required?",
    answer:
      'The Americans with Disabilities Act (ADA) requires accessible restroom facilities for: all public events and gatherings, construction sites (when workers with disabilities are present), government-funded projects, commercial properties open to the public, and any event or facility covered by Title II or Title III of the ADA. General guidelines: public events should have at least 5% accessible units (minimum 1), construction sites should have at least 1 ADA unit per site. ADA units must meet specific requirements: minimum 60"x60" interior space, grab bars, accessible door width, proper ramp, and accessible fixtures. Non-compliance can result in legal penalties and discrimination claims.',
    keywords: [
      "ADA requirements",
      "when ADA required",
      "disability access",
      "wheelchair access",
    ],
    relatedQuestions: ["product-ada", "regulations-osha", "event-public"],
  },
  {
    id: "regulations-osha",
    category: "Regulations & Compliance",
    question: "What OSHA regulations apply to porta potty rentals?",
    answer:
      "OSHA regulations governing portable sanitation include: Standard 1926.51 (construction sanitation), Standard 1910.141 (general sanitation), and related health standards. Key requirements: adequate toilet facilities based on worker count, facilities within 200 feet of work areas, hand washing facilities with soap and towels, sanitary maintenance and weekly cleaning, toilet paper provision, facilities available at shift start, proper waste disposal, and accessibility for workers with disabilities. OSHA can conduct inspections and issue citations for non-compliance. Penalties range from $7,000-$140,000+ depending on violation severity. All our units meet OSHA standards.",
    keywords: [
      "OSHA regulations",
      "OSHA rules",
      "workplace sanitation",
      "safety compliance",
    ],
    relatedQuestions: [
      "construction-osha",
      "construction-requirements",
      "regulations-health",
    ],
  },
  {
    id: "regulations-health",
    category: "Regulations & Compliance",
    question: "What health department regulations apply to porta potties?",
    answer:
      "Health department regulations vary by state and locality but typically include: minimum sanitation standards, cleaning and maintenance frequency, waste disposal requirements, hand washing facilities for food service events, proper ventilation, adequate toilet paper and supplies, vector control (flies, odors), and proper signage. For events with food service, health departments often require permits and inspections. We follow CDC sanitation guidelines, use EPA-registered disinfectants, and maintain compliance with local health codes. Our service procedures exceed most health department minimum requirements. We can provide documentation of our sanitation practices for permit applications.",
    keywords: [
      "health regulations",
      "health department",
      "sanitation requirements",
      "health code",
    ],
    relatedQuestions: [
      "maintenance-standards",
      "event-food",
      "permits-required",
    ],
  },
  {
    id: "regulations-environmental",
    category: "Regulations & Compliance",
    question: "How do porta potties comply with environmental regulations?",
    answer:
      "We strictly comply with all environmental regulations including: EPA waste disposal standards - all waste disposed at licensed treatment facilities, proper waste transport in approved vehicles, no discharge to storm drains or ground, use of biodegradable and environmentally-safe chemicals, prevention of groundwater contamination, compliance with Clean Water Act, proper licensing and permitting for waste hauling, and documentation of disposal. Our units contain waste in sealed tanks preventing environmental contamination. All waste is treated at wastewater treatment plants before release. We maintain required permits and follow state environmental agency guidelines.",
    keywords: [
      "environmental regulations",
      "EPA compliance",
      "waste disposal laws",
      "environmental protection",
    ],
    relatedQuestions: [
      "maintenance-waste",
      "regulations-health",
      "maintenance-standards",
    ],
  },
  {
    id: "permits-required",
    category: "Regulations & Compliance",
    question: "Do I need a permit for porta potty rental?",
    answer:
      "Permit requirements vary by location. You may need permits for: large public events (city/county event permits), street or sidewalk placement (right-of-way permits), extended construction projects (building department permits), food service events (health department permits), park or public property use (parks department permits). Small private events on private property typically don't require permits. We recommend checking with your local city/county offices early in planning. We can provide specifications, insurance certificates, and documentation needed for permit applications. Permit acquisition is typically the customer's responsibility, but we're happy to assist with information.",
    keywords: [
      "permits",
      "permit required",
      "licensing",
      "authorization",
      "permissions",
    ],
    relatedQuestions: ["regulations-ada", "event-public", "regulations-health"],
  },

  {
    id: "site-requirements",
    category: "Logistics & Setup",
    question: "What site requirements are needed for porta potty placement?",
    answer:
      "For proper porta potty placement, you need: (1) Level ground - units must sit level for proper function, (2) Firm surface - concrete, asphalt, compacted gravel, or firm grass (avoid mud or soft ground), (3) Vehicle access - delivery truck needs access within 50 feet, (4) Clearance - 12 feet vertical clearance for delivery truck and boom, (5) No overhead obstacles - no power lines, tree branches, or structures in path, (6) Adequate space - minimum 4'x4' footprint per unit plus door swing space, (7) Away from food areas - recommended 50+ feet from food service or preparation, (8) Accessible to users - consider pedestrian paths and lighting. We'll help assess your site before delivery.",
    keywords: [
      "site requirements",
      "placement requirements",
      "ground requirements",
      "access requirements",
    ],
    relatedQuestions: [
      "delivery-requirements",
      "site-terrain",
      "site-placement",
    ],
  },
  {
    id: "site-terrain",
    category: "Logistics & Setup",
    question: "Can porta potties be placed on uneven or soft ground?",
    answer:
      "Porta potties should be placed on relatively level, firm ground. Minor unevenness (1-2 inches) can usually be accommodated with leveling boards or pads. For significantly uneven terrain, we may need to use wooden platforms or leveling systems. Soft ground (mud, sand, loose dirt) can cause units to sink or become unstable. Solutions for soft ground: place plywood sheets under units for distribution of weight, use ground protection mats, wait for ground to dry if possible, or select alternate placement location. For construction sites with poor ground conditions, discuss terrain challenges when booking so we can plan appropriate solutions.",
    keywords: [
      "uneven ground",
      "soft ground",
      "terrain",
      "mud",
      "ground conditions",
    ],
    relatedQuestions: [
      "site-requirements",
      "construction-security",
      "site-placement",
    ],
  },
  {
    id: "site-placement",
    category: "Logistics & Setup",
    question: "Where should I place porta potties?",
    answer:
      "Best practices for porta potty placement: (1) Accessibility - convenient location within 200 feet of main activity areas, (2) Privacy - somewhat secluded but not isolated for safety, (3) Lighting - near lighting for evening events if possible, (4) Level ground - stable, firm surface, (5) Away from food - minimum 50 feet from food preparation or service areas, (6) Grouped together - place multiple units together for efficiency, (7) ADA access - accessible units on accessible paths, (8) Away from property lines - respect neighboring properties, (9) Easy delivery access - truck can reach within 50 feet. For construction sites, place centrally to work areas. We can provide placement recommendations based on your site layout.",
    keywords: [
      "where to place",
      "porta potty location",
      "placement tips",
      "positioning",
    ],
    relatedQuestions: [
      "site-requirements",
      "site-terrain",
      "delivery-requirements",
    ],
  },
  {
    id: "site-multiple",
    category: "Logistics & Setup",
    question: "Can porta potties be placed at multiple locations?",
    answer:
      "Yes! We can deliver porta potties to multiple locations within our service area. This is common for: large events with multiple activity areas, construction projects with multiple work zones, company locations across a city, or events spanning large areas. Delivery to multiple sites within the same service area typically doesn't incur extra fees if coordinated on the same delivery day. For widely separated locations (different cities), scheduling and pricing is handled separately for each location. Let us know your multi-site needs when requesting a quote, and we'll coordinate efficient delivery logistics.",
    keywords: [
      "multiple locations",
      "different locations",
      "multiple sites",
      "spread out",
    ],
    relatedQuestions: [
      "site-placement",
      "delivery-requirements",
      "booking-info",
    ],
  },

  {
    id: "support-hours",
    category: "Customer Support",
    question: "What are your customer service hours?",
    answer:
      "FlushJohn provides 24/7 customer support, 365 days a year. You can reach us anytime by phone for urgent needs, emergencies, or general questions. For non-urgent inquiries submitted by email or online form, we respond within 1 hour during business hours (8 AM - 6 PM local time, Monday-Friday) and within 24 hours on weekends and holidays. Emergency services and same-day deliveries are available every day including weekends and holidays. We understand that events and construction needs don't follow regular business hours, so we're always available to assist you.",
    keywords: [
      "customer service hours",
      "support hours",
      "availability",
      "24/7",
      "when open",
    ],
    relatedQuestions: [
      "support-contact",
      "support-emergency",
      "booking-process",
    ],
  },
  {
    id: "support-contact",
    category: "Customer Support",
    question: "How do I contact FlushJohn?",
    answer:
      "You can contact FlushJohn through multiple channels: (1) Phone - call us directly for immediate assistance (available 24/7), (2) Online quote form at flushjohn.com/quote, (3) Email (responses within 1 hour during business hours), (4) Contact form on our website at flushjohn.com/contact. Our phone number provides the fastest response for urgent needs, last-minute bookings, or emergency situations. For detailed project planning or non-urgent quote requests, the online form allows you to provide comprehensive information for accurate pricing.",
    keywords: [
      "contact",
      "phone number",
      "email",
      "how to reach",
      "get in touch",
    ],
    relatedQuestions: ["support-hours", "booking-process", "support-emergency"],
  },
  {
    id: "support-emergency",
    category: "Customer Support",
    question: "What if I have an emergency or urgent issue during my rental?",
    answer:
      "For emergencies or urgent issues during your rental period, call us immediately - we're available 24/7. Emergency situations we handle: unit malfunction or damage, unit tipping or instability, unexpected increase in usage requiring more units, sanitation emergencies, vandalism or theft, severe weather damage, or any safety concerns. We respond to emergencies as quickly as possible, typically within 1-2 hours. For same-day urgent needs (additional units, emergency servicing), we prioritize emergency calls and often can respond within hours. Always call rather than email for emergency situations.",
    keywords: [
      "emergency",
      "urgent issue",
      "problem",
      "emergency service",
      "24/7",
    ],
    relatedQuestions: ["support-hours", "support-contact", "support-issues"],
  },
  {
    id: "support-issues",
    category: "Customer Support",
    question: "What if there's a problem with my porta potty rental?",
    answer:
      "If you experience any problems with your porta potty rental, contact us immediately and we'll resolve it quickly. Common issues and solutions: (1) Unit won't lock - we'll send a technician or replace the unit, (2) Unpleasant odor - we'll provide emergency servicing, (3) Out of supplies - we'll restock immediately, (4) Damage - we'll assess and replace if necessary, (5) Delivery issues - we'll reschedule at no charge, (6) Wrong unit type - we'll exchange for correct unit. Most issues can be resolved within a few hours. We stand behind our service and will make things right. Your satisfaction is our priority.",
    keywords: [
      "problems",
      "issues",
      "complaints",
      "service problems",
      "troubleshooting",
    ],
    relatedQuestions: [
      "support-emergency",
      "support-contact",
      "maintenance-frequency",
    ],
  },
  {
    id: "quantity-needed",
    category: "Logistics & Setup",
    question: "How many porta potties do I need for my event?",
    answer:
      "The number of porta potties needed depends on: (1) Attendance - the number of people expected, (2) Event duration - longer events need more units, (3) Alcohol service - increases restroom usage by 30-40%, (4) Event type - concerts and festivals have higher usage than corporate events. General guidelines: For events under 4 hours without alcohol: 1 unit per 50 people. For events under 4 hours with alcohol: 1 unit per 35-40 people. For all-day events (8+ hours): 1 unit per 35 people. Always include at least 1 ADA compliant unit. For construction sites: 1 unit per 20 workers (OSHA requirement). Contact us for personalized recommendations based on your specific event.",
    keywords: [
      "how many needed",
      "quantity",
      "number of units",
      "how many porta potties",
    ],
    relatedQuestions: [
      "event-festival",
      "construction-quantity",
      "quantity-wedding",
    ],
  },
  {
    id: "quantity-wedding",
    category: "Logistics & Setup",
    question: "How many porta potties do I need for a wedding?",
    answer:
      "For wedding porta potty quantities, consider: (1) Guest count, (2) Reception duration, (3) Alcohol service. Recommendations: 50 guests / 4 hours / with bar = 2 units, 100 guests / 4-5 hours / with bar = 2-3 units, 150 guests / 5 hours / with bar = 3-4 units, 200 guests / 5+ hours / with bar = 4-5 units. We recommend deluxe or luxury units for weddings rather than standard units. It's better to have extra capacity than too few units. Consider separate units for ceremony vs. reception if locations are far apart. Plan for women's higher usage (60-70% of restroom usage typically). Include 1 ADA unit for accessibility.",
    keywords: [
      "wedding quantity",
      "how many for wedding",
      "wedding planning",
      "guest count",
    ],
    relatedQuestions: ["event-wedding", "product-deluxe", "quantity-needed"],
  },
];

export function generateFAQSchema(faqItems: FAQItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getFAQsByCategory(category: string): FAQItem[] {
  return comprehensiveFaqData.filter((item) => item.category === category);
}

export function searchFAQs(keyword: string): FAQItem[] {
  const lowerKeyword = keyword.toLowerCase();
  return comprehensiveFaqData.filter(
    (item) =>
      item.question.toLowerCase().includes(lowerKeyword) ||
      item.answer.toLowerCase().includes(lowerKeyword) ||
      item.keywords.some((k) => k.toLowerCase().includes(lowerKeyword))
  );
}

export default comprehensiveFaqData;
