import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { phone, contact } from "@/constants";
import { serviceAreasByState } from "@/features/locations/constants";

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
                <Link
                  href={`/service-areas/${stateSlug}`}
                  className={styles.stateNameLink}
                >
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
                      <p className={styles.cityDescription}>
                        {city.description}
                      </p>
                      <span className={styles.viewLink}>View Services →</span>
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
            FlushJohn serves 25+ cities across 6 states. Use the map below to
            see our service areas across the United States.
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
            Our service areas include major cities in Texas, Florida,
            California, Georgia, Illinois, and Delaware. Contact us to see if we
            can serve your specific location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasPage;
