import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { address, phone, contact } from "@/constants";

const serviceAreasByState = {
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

const ServiceAreasPage = () => {
  const totalCities = Object.values(serviceAreasByState).reduce(
    (sum, cities) => sum + cities.length,
    0
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Service Areas</h1>
          <p className={styles.subtitle}>
            FlushJohn provides reliable porta potty rental services across{" "}
            <strong>{totalCities} cities</strong> in{" "}
            <strong>{Object.keys(serviceAreasByState).length} states</strong>.
            We're committed to delivering clean, professional portable toilet
            solutions for events, construction sites, and special occasions
            nationwide.
          </p>
        </div>

        <div className={styles.statesGrid}>
          {Object.entries(serviceAreasByState).map(([state, cities]) => {
            const stateSlug = state.toLowerCase();
            return (
              <div key={state} className={styles.stateSection}>
                <Link href={`/service-areas/${stateSlug}`} className={styles.stateNameLink}>
                  <h2 className={styles.stateName}>{state}</h2>
                </Link>
                <div className={styles.citiesGrid}>
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/porta-potty-rental/${city.slug}`}
                      className={styles.cityCard}
                      prefetch={true}
                    >
                      <h3 className={styles.cityName}>{city.name}</h3>
                      <p className={styles.cityDescription}>{city.description}</p>
                      <span className={styles.viewLink}>
                        View Services →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.contactSection}>
          <h2 className={styles.contactTitle}>Need Service in Another Area?</h2>
          <p className={styles.contactDescription}>
            While we currently serve these {totalCities} cities, we're always
            expanding our coverage. Contact us to see if we can serve your
            location or to request service in a new area.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <strong>Phone:</strong>{" "}
              <a href={phone.phone_link}>{phone.phone_number}</a>
            </div>
            <div className={styles.contactItem}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
            <div className={styles.contactItem}>
              <strong>Address:</strong> {address.full_address}
            </div>
          </div>
          <div className={styles.ctaButtons}>
            <Link href="/quote" className={styles.quoteButton}>
              Request a Quote
            </Link>
            <Link href="/contact" className={styles.contactButton}>
              Contact Us
            </Link>
          </div>
        </div>

        {/* Service Areas Map */}
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Our Service Coverage</h2>
          <p className={styles.mapDescription}>
            FlushJohn serves 25+ cities across 6 states. Use the map below to see our service areas across the United States.
          </p>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1xxxxxxxxxxxxx&hl=en&z=4"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FlushJohn Service Areas Map"
            ></iframe>
          </div>
          <p className={styles.mapNote}>
            Our service areas include major cities in Texas, Florida, California, Georgia, Illinois, and Delaware. 
            Contact us to see if we can serve your specific location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasPage;

