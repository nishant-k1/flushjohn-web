import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

interface City {
  name: string;
  slug: string;
  population: string;
}

interface StateProps {
  state: {
    name: string;
    abbreviation: string;
    displayName: string;
    cities: City[];
    description: string;
  };
}

const StateHubPage = ({ state }: StateProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Porta Potty Rentals in {state.displayName}
          </h1>
          <p className={styles.description}>{state.description}</p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{state.cities.length}</span>
              <span className={styles.statLabel}>
                {state.cities.length === 1 ? "City" : "Cities"} Served
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Mile Radius</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Service</span>
            </div>
          </div>
        </div>

        <div className={styles.citiesSection}>
          <h2 className={styles.sectionTitle}>
            Cities We Serve in {state.displayName}
          </h2>
          <div className={styles.citiesGrid}>
            {state.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/porta-potty-rental/${city.slug}`}
                className={styles.cityCard}
                prefetch={true}
              >
                <h3 className={styles.cityName}>{city.name}</h3>
                <p className={styles.cityPopulation}>Population: {city.population}</p>
                <span className={styles.viewLink}>View Services →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Our Services in {state.displayName}</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Construction Sites</h3>
              <p>
                Long-term porta potty rentals for construction projects throughout{" "}
                {state.displayName}. OSHA-compliant units with regular servicing.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Events & Festivals</h3>
              <p>
                Clean, reliable portable toilets for weddings, festivals, concerts, and
                special events in {state.displayName}.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Emergency Service</h3>
              <p>
                Same-day delivery available for urgent porta potty needs in{" "}
                {state.displayName} cities.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Long-term Rentals</h3>
              <p>
                Weekly and monthly porta potty rental options with regular maintenance
                and cleaning throughout {state.displayName}.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Get an instant quote for porta potty rentals in {state.displayName}. 
            We serve {state.cities.length} major cities with reliable, professional service.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/quote" className={styles.quoteButton}>
              Request a Quote
            </Link>
            <Link href="/contact" className={styles.contactButton}>
              Contact Us
            </Link>
          </div>
        </div>

        <div className={styles.backLink}>
          <Link href="/service-areas">← View All Service Areas</Link>
        </div>
      </div>
    </div>
  );
};

export default StateHubPage;

