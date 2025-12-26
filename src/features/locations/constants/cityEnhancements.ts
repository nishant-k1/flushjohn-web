/**
 * City-specific enhancements data for SEO and content depth
 * Includes landmarks, events, neighborhoods, and regulations
 */

export interface CityEnhancement {
  landmarks: string[];
  events: string[];
  neighborhoods: string[];
  regulations: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const cityEnhancements: Record<string, CityEnhancement> = {
  dover: {
    landmarks: [
      "Delaware State Capitol",
      "First State Heritage Park",
      "Dover International Speedway",
      "Dover Air Force Base",
      "John Dickinson Plantation",
    ],
    events: [
      "Dover Days Festival",
      "Firefly Music Festival",
      "Delaware State Fair",
      "NASCAR races at Dover Motor Speedway",
    ],
    neighborhoods: [
      "Downtown Dover",
      "Capital Green",
      "Westover Hills",
      "College Park",
    ],
    regulations: [
      "OSHA-compliant units required for construction sites",
      "Delaware health department permits for large events",
      "ADA-compliant units required for public events (1 per 20 units)",
    ],
    faqs: [
      {
        question: `Do you serve Dover, DE?`,
        answer: `Yes, we provide porta potty rental services throughout Dover and the surrounding Delaware area with same-day delivery available.`,
      },
      {
        question: `What's the delivery time in Dover?`,
        answer: `We offer same-day delivery in Dover when ordered before 2 PM. Standard delivery is within 24-48 hours.`,
      },
      {
        question: `Are your porta potties ADA compliant in Dover?`,
        answer: `Yes, we offer ADA-compliant portable toilets that meet all Delaware accessibility requirements for public events and construction sites.`,
      },
    ],
  },
  houston: {
    landmarks: [
      "Space Center Houston",
      "Downtown Houston",
      "Museum District",
      "Galveston Bay Area",
      "NRG Stadium",
    ],
    events: [
      "Houston Livestock Show and Rodeo",
      "Houston Pride Parade",
      "Art Car Parade",
      "Free Press Summer Fest",
    ],
    neighborhoods: [
      "Downtown Houston",
      "Montrose",
      "The Heights",
      "Midtown",
      "Galleria Area",
    ],
    regulations: [
      "Texas Commission on Environmental Quality (TCEQ) regulations",
      "City of Houston permits required for events with 100+ attendees",
      "ADA-compliant units required (1 per 25 standard units)",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Houston?`,
        answer: `Yes, we serve Houston and the greater metropolitan area with fast, reliable delivery and professional service.`,
      },
      {
        question: `What's the delivery time in Houston?`,
        answer: `Same-day delivery is available in Houston for orders placed before 12 PM. Standard delivery is 24-48 hours.`,
      },
      {
        question: `Do you serve construction sites in Houston?`,
        answer: `Yes, we specialize in construction site porta potty rentals throughout Houston with OSHA-compliant units and regular servicing.`,
      },
    ],
  },
  dallas: {
    landmarks: [
      "Dallas Arts District",
      "AT&T Stadium",
      "Reunion Tower",
      "Deep Ellum",
      "Fair Park",
    ],
    events: [
      "State Fair of Texas",
      "Dallas Pride",
      "Dallas International Film Festival",
      "Taste of Dallas",
    ],
    neighborhoods: [
      "Downtown Dallas",
      "Deep Ellum",
      "Uptown",
      "Bishop Arts District",
      "Design District",
    ],
    regulations: [
      "Dallas city permits required for outdoor events",
      "TCEQ regulations for waste disposal",
      "ADA compliance required for public events (1 per 20 units minimum)",
    ],
    faqs: [
      {
        question: `Do you serve Dallas, TX?`,
        answer: `Yes, we provide porta potty rental services throughout Dallas and surrounding areas with competitive pricing and reliable service.`,
      },
      {
        question: `What's the delivery time in Dallas?`,
        answer: `We offer same-day delivery in Dallas for orders placed before 1 PM. Standard delivery is within 24-48 hours.`,
      },
    ],
  },
  austin: {
    landmarks: [
      "State Capitol",
      "University of Texas",
      "South by Southwest (SXSW) venues",
      "Lady Bird Lake",
      "6th Street Entertainment District",
    ],
    events: [
      "South by Southwest (SXSW)",
      "Austin City Limits Music Festival",
      "Austin Pride",
      "Formula 1 US Grand Prix",
    ],
    neighborhoods: [
      "Downtown Austin",
      "South Austin",
      "East Austin",
      "Westlake",
      "The Domain",
    ],
    regulations: [
      "Austin city permits for events in city parks",
      "OSHA compliance for construction sites",
      "ADA-compliant units required (1 per 25 units)",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Austin?`,
        answer: `Yes, we serve Austin and the surrounding area, including popular festival and event venues throughout the city.`,
      },
      {
        question: `Can you handle SXSW and ACL Festival rentals?`,
        answer: `Yes, we have experience providing porta potty services for major festivals and events in Austin including SXSW and ACL.`,
      },
    ],
  },
  "san-antonio": {
    landmarks: [
      "The Alamo",
      "River Walk",
      "San Antonio Missions",
      "Tower of the Americas",
      "SeaWorld San Antonio",
    ],
    events: [
      "Fiesta San Antonio",
      "San Antonio Stock Show & Rodeo",
      "Luminaria Contemporary Arts Festival",
      "Texas Folklife Festival",
    ],
    neighborhoods: [
      "Downtown San Antonio",
      "River Walk District",
      "The Pearl District",
      "Southtown",
      "Medical Center",
    ],
    regulations: [
      "San Antonio city permits for events",
      "TCEQ regulations",
      "ADA compliance required for public events",
    ],
    faqs: [
      {
        question: `Do you serve San Antonio?`,
        answer: `Yes, we provide porta potty rental services throughout San Antonio including downtown, River Walk area, and surrounding communities.`,
      },
    ],
  },
  "fort-worth": {
    landmarks: [
      "Fort Worth Stockyards",
      "Downtown Fort Worth",
      "Kimbell Art Museum",
      "Botanic Garden",
      "Amon Carter Museum",
    ],
    events: [
      "Fort Worth Stock Show & Rodeo",
      "Main St. Arts Festival",
      "Fort Worth Food + Wine Festival",
      "Mayfest",
    ],
    neighborhoods: [
      "Downtown Fort Worth",
      "Stockyards District",
      "Cultural District",
      "Magnolia Avenue",
    ],
    regulations: [
      "Fort Worth city permits for events",
      "TCEQ regulations",
      "ADA compliance requirements",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Fort Worth?`,
        answer: `Yes, we serve Fort Worth including the Stockyards, downtown, and surrounding areas with fast delivery and reliable service.`,
      },
    ],
  },
  miami: {
    landmarks: [
      "South Beach",
      "Art Deco Historic District",
      "Little Havana",
      "Wynwood Arts District",
      "Brickell Financial District",
    ],
    events: [
      "Miami Art Week",
      "Ultra Music Festival",
      "South Beach Wine & Food Festival",
      "Miami International Boat Show",
    ],
    neighborhoods: [
      "South Beach",
      "Downtown Miami",
      "Brickell",
      "Wynwood",
      "Little Havana",
      "Coconut Grove",
    ],
    regulations: [
      "Miami-Dade County permits for outdoor events",
      "Florida Department of Health regulations",
      "ADA compliance required",
      "Beach access regulations for events",
    ],
    faqs: [
      {
        question: `Do you serve Miami, FL?`,
        answer: `Yes, we provide porta potty rental services throughout Miami including South Beach, downtown, and surrounding areas.`,
      },
      {
        question: `Do you provide beach event porta potty rentals?`,
        answer: `Yes, we can provide porta potty rentals for beach events in Miami with appropriate permits and setup.`,
      },
    ],
  },
  orlando: {
    landmarks: [
      "Walt Disney World",
      "Universal Studios",
      "International Drive",
      "Downtown Orlando",
      "Lake Eola Park",
    ],
    events: [
      "EPCOT International Food & Wine Festival",
      "Universal's Halloween Horror Nights",
      "Orlando Pride",
      "Florida Film Festival",
    ],
    neighborhoods: [
      "International Drive",
      "Downtown Orlando",
      "Lake Eola",
      "Winter Park",
      "Dr. Phillips",
    ],
    regulations: [
      "Orange County permits for events",
      "Florida Department of Health regulations",
      "Theme park area special requirements",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Orlando?`,
        answer: `Yes, we serve Orlando and surrounding areas including theme park locations and event venues throughout the city.`,
      },
      {
        question: `Can you serve events near Disney World?`,
        answer: `Yes, we provide porta potty rentals for events in the Orlando area, including locations near major theme parks.`,
      },
    ],
  },
  tampa: {
    landmarks: [
      "Tampa Bay",
      "Ybor City Historic District",
      "Tampa Riverwalk",
      "Busch Gardens",
      "Raymond James Stadium",
    ],
    events: [
      "Gasparilla Pirate Festival",
      "Tampa Bay Black Heritage Festival",
      "Tampa Bay Margarita Festival",
      "Guavaween",
    ],
    neighborhoods: [
      "Downtown Tampa",
      "Ybor City",
      "Hyde Park",
      "Westshore",
      "South Tampa",
    ],
    regulations: [
      "Hillsborough County permits",
      "Florida Department of Health regulations",
      "Waterfront event special requirements",
    ],
    faqs: [
      {
        question: `Do you serve Tampa, FL?`,
        answer: `Yes, we provide porta potty rental services throughout Tampa including downtown, Ybor City, and surrounding areas.`,
      },
    ],
  },
  jacksonville: {
    landmarks: [
      "St. Johns River",
      "Jacksonville Beach",
      "Riverside Historic District",
      "Cummer Museum",
      "EverBank Stadium",
    ],
    events: [
      "Jacksonville Jazz Festival",
      "Jacksonville Seafood Festival",
      "Riverside Arts Market",
      "One Spark Festival",
    ],
    neighborhoods: [
      "Downtown Jacksonville",
      "Riverside",
      "San Marco",
      "Jacksonville Beach",
      "Mandarin",
    ],
    regulations: [
      "Duval County permits",
      "Florida Department of Health regulations",
      "Beach event requirements",
    ],
    faqs: [
      {
        question: `Do you serve Jacksonville, FL?`,
        answer: `Yes, we provide porta potty rental services throughout Jacksonville including downtown, beaches, and surrounding areas.`,
      },
    ],
  },
  "fort-lauderdale": {
    landmarks: [
      "Fort Lauderdale Beach",
      "Las Olas Boulevard",
      "Port Everglades",
      "Bonnet House Museum",
      "Downtown Fort Lauderdale",
    ],
    events: [
      "Fort Lauderdale International Boat Show",
      "Fort Lauderdale Pride",
      "Las Olas Art Fair",
      "Seminole Hard Rock Winterfest Boat Parade",
    ],
    neighborhoods: [
      "Las Olas",
      "Downtown Fort Lauderdale",
      "Victoria Park",
      "Rio Vista",
      "Coral Ridge",
    ],
    regulations: [
      "Broward County permits",
      "Florida Department of Health regulations",
      "Beach event special requirements",
    ],
    faqs: [
      {
        question: `Do you serve Fort Lauderdale?`,
        answer: `Yes, we provide porta potty rental services throughout Fort Lauderdale including beach areas, downtown, and Las Olas.`,
      },
    ],
  },
  "los-angeles": {
    landmarks: [
      "Hollywood",
      "Santa Monica Pier",
      "Venice Beach",
      "Downtown LA",
      "Griffith Observatory",
      "Universal Studios Hollywood",
    ],
    events: [
      "Los Angeles County Fair",
      "Coachella Valley Music and Arts Festival",
      "Rose Parade",
      "LA Pride",
    ],
    neighborhoods: [
      "Hollywood",
      "Santa Monica",
      "Venice",
      "Downtown LA",
      "Beverly Hills",
      "West Hollywood",
    ],
    regulations: [
      "Los Angeles County health permits",
      "City of LA event permits",
      "ADA compliance required (1 per 20 units)",
      "Environmental regulations for waste disposal",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Los Angeles?`,
        answer: `Yes, we serve Los Angeles and surrounding areas including Hollywood, Santa Monica, downtown, and throughout LA County.`,
      },
      {
        question: `What's the delivery time in Los Angeles?`,
        answer: `Same-day delivery is available in Los Angeles for orders placed before 11 AM. Standard delivery is 24-48 hours.`,
      },
    ],
  },
  "san-diego": {
    landmarks: [
      "Balboa Park",
      "San Diego Zoo",
      "Gaslamp Quarter",
      "La Jolla Cove",
      "Coronado Island",
    ],
    events: [
      "San Diego Comic-Con",
      "Del Mar Fair",
      "San Diego Pride",
      "Carlsbad Flower Fields",
    ],
    neighborhoods: [
      "Downtown San Diego",
      "Gaslamp Quarter",
      "La Jolla",
      "Coronado",
      "Pacific Beach",
    ],
    regulations: [
      "San Diego County health permits",
      "City event permits required",
      "Beach event special requirements",
    ],
    faqs: [
      {
        question: `Do you serve San Diego?`,
        answer: `Yes, we provide porta potty rental services throughout San Diego including downtown, beaches, and surrounding areas.`,
      },
    ],
  },
  sacramento: {
    landmarks: [
      "California State Capitol",
      "Old Sacramento",
      "Crocker Art Museum",
      "Sacramento River",
      "Sutter's Fort",
    ],
    events: [
      "California State Fair",
      "Sacramento Music Festival",
      "Farm-to-Fork Festival",
      "Gold Rush Days",
    ],
    neighborhoods: [
      "Downtown Sacramento",
      "Midtown",
      "Old Sacramento",
      "East Sacramento",
      "Land Park",
    ],
    regulations: [
      "Sacramento County health permits",
      "City event permits",
      "State Capitol area special requirements",
    ],
    faqs: [
      {
        question: `Do you serve Sacramento, CA?`,
        answer: `Yes, we provide porta potty rental services throughout Sacramento including downtown, Old Sacramento, and surrounding areas.`,
      },
    ],
  },
  "san-jose": {
    landmarks: [
      "San Jose Tech Museum",
      "Winchester Mystery House",
      "Santana Row",
      "Downtown San Jose",
      "Rosicrucian Egyptian Museum",
    ],
    events: [
      "San Jose Jazz Festival",
      "Silicon Valley Comic Con",
      "Christmas in the Park",
      "San Jose Pride",
    ],
    neighborhoods: [
      "Downtown San Jose",
      "Santana Row",
      "Willow Glen",
      "Campbell",
      "Cupertino",
    ],
    regulations: [
      "Santa Clara County health permits",
      "City of San Jose event permits",
      "Tech campus event requirements",
    ],
    faqs: [
      {
        question: `Do you serve San Jose?`,
        answer: `Yes, we provide porta potty rental services throughout San Jose including downtown, Silicon Valley areas, and surrounding communities.`,
      },
    ],
  },
  fresno: {
    landmarks: [
      "Fresno Chaffee Zoo",
      "Fresno Art Museum",
      "Kearney Mansion Museum",
      "Fresno State University",
      "River Park",
    ],
    events: [
      "Big Fresno Fair",
      "Fresno County Blossom Trail",
      "Fresno Greek Festival",
      "Fresno Jazz Festival",
    ],
    neighborhoods: [
      "Downtown Fresno",
      "Tower District",
      "Fig Garden",
      "River Park",
    ],
    regulations: [
      "Fresno County health permits",
      "City event permits",
      "Agricultural event requirements",
    ],
    faqs: [
      {
        question: `Do you serve Fresno, CA?`,
        answer: `Yes, we provide porta potty rental services throughout Fresno including downtown, Tower District, and surrounding areas.`,
      },
    ],
  },
  atlanta: {
    landmarks: [
      "Georgia State Capitol",
      "Centennial Olympic Park",
      "Martin Luther King Jr. National Historic Site",
      "Piedmont Park",
      "Atlanta BeltLine",
    ],
    events: [
      "Atlanta Film Festival",
      "Atlanta Pride",
      "Music Midtown",
      "Atlanta Jazz Festival",
    ],
    neighborhoods: [
      "Downtown Atlanta",
      "Midtown",
      "Buckhead",
      "Virginia-Highland",
      "Little Five Points",
    ],
    regulations: [
      "Fulton County health permits",
      "City of Atlanta event permits",
      "ADA compliance required",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Atlanta?`,
        answer: `Yes, we serve Atlanta and surrounding areas including downtown, Midtown, Buckhead, and throughout the metro area.`,
      },
      {
        question: `What's the delivery time in Atlanta?`,
        answer: `Same-day delivery is available in Atlanta for orders placed before 1 PM. Standard delivery is 24-48 hours.`,
      },
    ],
  },
  savannah: {
    landmarks: [
      "Historic Savannah",
      "Forsyth Park",
      "River Street",
      "Bonaventure Cemetery",
      "Savannah Historic District",
    ],
    events: [
      "Savannah Music Festival",
      "St. Patrick's Day Festival",
      "Savannah Food & Wine Festival",
      "Savannah Film Festival",
    ],
    neighborhoods: [
      "Historic District",
      "Victorian District",
      "Midtown",
      "Islands",
    ],
    regulations: [
      "Chatham County health permits",
      "Historic district special requirements",
      "City event permits",
    ],
    faqs: [
      {
        question: `Do you serve Savannah, GA?`,
        answer: `Yes, we provide porta potty rental services throughout Savannah including the Historic District, downtown, and surrounding areas.`,
      },
    ],
  },
  augusta: {
    landmarks: [
      "Augusta National Golf Club",
      "Riverwalk Augusta",
      "Masters Tournament",
      "Augusta Museum of History",
      "Morris Museum of Art",
    ],
    events: [
      "Masters Tournament",
      "Augusta Pride",
      "Arts in the Heart of Augusta",
      "Westobou Festival",
    ],
    neighborhoods: [
      "Downtown Augusta",
      "Summerville",
      "West Augusta",
      "National Hills",
    ],
    regulations: [
      "Richmond County health permits",
      "Golf tournament special requirements",
      "City event permits",
    ],
    faqs: [
      {
        question: `Do you serve Augusta, GA?`,
        answer: `Yes, we provide porta potty rental services throughout Augusta including downtown, golf tournament areas, and surrounding communities.`,
      },
    ],
  },
  macon: {
    landmarks: [
      "Ocmulgee National Monument",
      "Hay House",
      "Macon Centreplex",
      "Mercer University",
      "Downtown Macon",
    ],
    events: [
      "Cherry Blossom Festival",
      "Macon Film Festival",
      "Bragg Jam",
      "Macon Pops Concert Series",
    ],
    neighborhoods: [
      "Downtown Macon",
      "Ingleside",
      "Wesleyan",
      "North Macon",
    ],
    regulations: [
      "Bibb County health permits",
      "City event permits",
      "Historic district requirements",
    ],
    faqs: [
      {
        question: `Do you serve Macon, GA?`,
        answer: `Yes, we provide porta potty rental services throughout Macon including downtown, Mercer University area, and surrounding communities.`,
      },
    ],
  },
  columbus: {
    landmarks: [
      "National Infantry Museum",
      "Columbus Museum",
      "RiverWalk",
      "Fort Benning",
      "Uptown Columbus",
    ],
    events: [
      "Columbus Iron Works Festival",
      "Rivertown Market",
      "Columbus Pride",
      "SpringFest",
    ],
    neighborhoods: [
      "Uptown Columbus",
      "Midtown",
      "Fort Benning Area",
      "Lakebottom",
    ],
    regulations: [
      "Muscogee County health permits",
      "City event permits",
      "Military base area requirements",
    ],
    faqs: [
      {
        question: `Do you serve Columbus, GA?`,
        answer: `Yes, we provide porta potty rental services throughout Columbus including Uptown, Fort Benning area, and surrounding communities.`,
      },
    ],
  },
  chicago: {
    landmarks: [
      "Millennium Park",
      "Navy Pier",
      "Willis Tower",
      "Magnificent Mile",
      "Grant Park",
    ],
    events: [
      "Lollapalooza",
      "Taste of Chicago",
      "Chicago Pride",
      "Chicago Air and Water Show",
    ],
    neighborhoods: [
      "Downtown Chicago",
      "Loop",
      "Lincoln Park",
      "Wicker Park",
      "River North",
    ],
    regulations: [
      "Chicago Department of Public Health permits",
      "Park District permits for park events",
      "ADA compliance required (1 per 20 units)",
    ],
    faqs: [
      {
        question: `Do you provide porta potty rentals in Chicago?`,
        answer: `Yes, we serve Chicago and surrounding areas including downtown, major parks, and neighborhoods throughout the city.`,
      },
      {
        question: `What's the delivery time in Chicago?`,
        answer: `Same-day delivery is available in Chicago for orders placed before 12 PM. Standard delivery is 24-48 hours.`,
      },
    ],
  },
  springfield: {
    landmarks: [
      "Illinois State Capitol",
      "Abraham Lincoln Presidential Library",
      "Lincoln Home National Historic Site",
      "Old State Capitol",
      "Dana-Thomas House",
    ],
    events: [
      "Illinois State Fair",
      "Old Capitol Art Fair",
      "Springfield Pride",
      "Route 66 Mother Road Festival",
    ],
    neighborhoods: [
      "Downtown Springfield",
      "Historic West Side",
      "Near North",
      "South Grand",
    ],
    regulations: [
      "Sangamon County health permits",
      "City event permits",
      "State Capitol area requirements",
    ],
    faqs: [
      {
        question: `Do you serve Springfield, IL?`,
        answer: `Yes, we provide porta potty rental services throughout Springfield including downtown, State Capitol area, and surrounding communities.`,
      },
    ],
  },
  peoria: {
    landmarks: [
      "Caterpillar Visitors Center",
      "Peoria Riverfront Museum",
      "Peoria Civic Center",
      "Glen Oak Park",
      "Luthy Botanical Garden",
    ],
    events: [
      "Steamboat Days",
      "Peoria Art Guild Fine Art Fair",
      "Heart of Illinois Fair",
      "Peoria Jazz Festival",
    ],
    neighborhoods: [
      "Downtown Peoria",
      "West Peoria",
      "North Peoria",
      "East Peoria",
    ],
    regulations: [
      "Peoria County health permits",
      "City event permits",
      "Riverfront event requirements",
    ],
    faqs: [
      {
        question: `Do you serve Peoria, IL?`,
        answer: `Yes, we provide porta potty rental services throughout Peoria including downtown, riverfront, and surrounding areas.`,
      },
    ],
  },
  rockford: {
    landmarks: [
      "Rockford Art Museum",
      "Anderson Japanese Gardens",
      "Midway Village Museum",
      "Burpee Museum of Natural History",
      "Sinnissippi Park",
    ],
    events: [
      "Rockford City Market",
      "On the Waterfront",
      "Stroll on State",
      "Rockford Pride",
    ],
    neighborhoods: [
      "Downtown Rockford",
      "Midtown",
      "Edgewater",
      "North End",
    ],
    regulations: [
      "Winnebago County health permits",
      "City event permits",
      "Park event requirements",
    ],
    faqs: [
      {
        question: `Do you serve Rockford, IL?`,
        answer: `Yes, we provide porta potty rental services throughout Rockford including downtown, parks, and surrounding areas.`,
      },
    ],
  },
  naperville: {
    landmarks: [
      "Naperville Riverwalk",
      "Naper Settlement",
      "Centennial Beach",
      "DuPage Children's Museum",
      "North Central College",
    ],
    events: [
      "Naperville Ribfest",
      "Last Fling Festival",
      "Naperville Pride",
      "Naperville Art Fair",
    ],
    neighborhoods: [
      "Downtown Naperville",
      "South Naperville",
      "North Naperville",
      "Riverwalk Area",
    ],
    regulations: [
      "DuPage County health permits",
      "City event permits",
      "Riverwalk event requirements",
    ],
    faqs: [
      {
        question: `Do you serve Naperville, IL?`,
        answer: `Yes, we provide porta potty rental services throughout Naperville including downtown, Riverwalk area, and surrounding communities.`,
      },
    ],
  },
};

/**
 * Get enhancement data for a city
 */
export function getCityEnhancement(citySlug: string): CityEnhancement {
  const normalizedSlug = citySlug.toLowerCase().replace(/\s+/g, "-");
  return cityEnhancements[normalizedSlug] || {
    landmarks: [],
    events: [],
    neighborhoods: [],
    regulations: [],
    faqs: [],
  };
}

