/**
 * Service Areas by State - City data with descriptions for service areas page
 * Derived from statesData but with additional descriptions
 * 
 * Last Updated: 2025
 */

export interface ServiceAreaCity {
  name: string;
  slug: string;
  state: string;
  description: string;
}

export interface ServiceAreaState {
  [stateName: string]: ServiceAreaCity[];
}

export const serviceAreasByState: ServiceAreaState = {
  Delaware: [
    { 
      name: "Dover", 
      slug: "dover", 
      state: "DE",
      description: "Delaware's capital city with government facilities, historic areas, and construction projects"
    },
  ],
  Texas: [
    { 
      name: "Houston", 
      slug: "houston", 
      state: "TX",
      description: "Major metropolitan area with extensive construction and event venues"
    },
    { 
      name: "Dallas", 
      slug: "dallas", 
      state: "TX",
      description: "Large city with corporate events, construction sites, and festivals"
    },
    { 
      name: "Austin", 
      slug: "austin", 
      state: "TX",
      description: "Music festivals, tech events, and growing construction industry"
    },
    { 
      name: "San Antonio", 
      slug: "san-antonio", 
      state: "TX",
      description: "Historic city with military bases, events, and construction projects"
    },
    { 
      name: "Fort Worth", 
      slug: "fort-worth", 
      state: "TX",
      description: "Western heritage events, construction sites, and corporate facilities"
    },
  ],
  Florida: [
    { 
      name: "Miami", 
      slug: "miami", 
      state: "FL",
      description: "Beach events, festivals, construction, and luxury venues"
    },
    { 
      name: "Orlando", 
      slug: "orlando", 
      state: "FL",
      description: "Theme parks, conventions, weddings, and major events"
    },
    { 
      name: "Tampa", 
      slug: "tampa", 
      state: "FL",
      description: "Sports events, festivals, construction, and waterfront venues"
    },
    { 
      name: "Jacksonville", 
      slug: "jacksonville", 
      state: "FL",
      description: "Large metropolitan area with construction, events, and corporate facilities"
    },
    { 
      name: "Fort Lauderdale", 
      slug: "fort-lauderdale", 
      state: "FL",
      description: "Beach events, boat shows, construction, and upscale venues"
    },
  ],
  California: [
    { 
      name: "Los Angeles", 
      slug: "los-angeles", 
      state: "CA",
      description: "Entertainment industry events, construction, festivals, and major venues"
    },
    { 
      name: "San Diego", 
      slug: "san-diego", 
      state: "CA",
      description: "Beach events, conventions, military bases, and construction"
    },
    { 
      name: "Sacramento", 
      slug: "sacramento", 
      state: "CA",
      description: "State capital with government facilities, events, and construction"
    },
    { 
      name: "San Jose", 
      slug: "san-jose", 
      state: "CA",
      description: "Tech industry events, construction, corporate facilities, and festivals"
    },
    { 
      name: "Fresno", 
      slug: "fresno", 
      state: "CA",
      description: "Agricultural events, construction, festivals, and community gatherings"
    },
  ],
  Georgia: [
    { 
      name: "Atlanta", 
      slug: "atlanta", 
      state: "GA",
      description: "Major metropolitan area with sports events, conventions, and construction"
    },
    { 
      name: "Savannah", 
      slug: "savannah", 
      state: "GA",
      description: "Historic city with festivals, events, and construction projects"
    },
    { 
      name: "Augusta", 
      slug: "augusta", 
      state: "GA",
      description: "Golf events, festivals, construction, and corporate facilities"
    },
    { 
      name: "Macon", 
      slug: "macon", 
      state: "GA",
      description: "Music festivals, events, construction, and community gatherings"
    },
    { 
      name: "Columbus", 
      slug: "columbus", 
      state: "GA",
      description: "Military bases, events, construction, and corporate facilities"
    },
  ],
  Illinois: [
    { 
      name: "Chicago", 
      slug: "chicago", 
      state: "IL",
      description: "Major metropolitan area with festivals, construction, and major events"
    },
    { 
      name: "Springfield", 
      slug: "springfield", 
      state: "IL",
      description: "State capital with government facilities, events, and construction"
    },
    { 
      name: "Peoria", 
      slug: "peoria", 
      state: "IL",
      description: "Corporate events, construction, festivals, and community gatherings"
    },
    { 
      name: "Rockford", 
      slug: "rockford", 
      state: "IL",
      description: "Manufacturing facilities, events, construction, and festivals"
    },
    { 
      name: "Naperville", 
      slug: "naperville", 
      state: "IL",
      description: "Suburban events, construction, corporate facilities, and community gatherings"
    },
  ],
};

