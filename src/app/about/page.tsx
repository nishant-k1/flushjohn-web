import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import styles from "./styles.module.css";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
const legalName = process.env.NEXT_PUBLIC_FLUSH_JOHN_LEGAL_NAME!;

export const metadata: Metadata = {
  title: "About Us | FlushJohn - Professional Porta Potty Rental Company",
  description:
    "Learn about FlushJohn, a trusted porta potty rental company serving 25+ cities across the United States. Founded in 2020, we provide reliable and affordable portable toilet solutions for events, construction sites, and more.",
  openGraph: {
    title: "About FlushJohn - Professional Porta Potty Rental Services",
    description:
      "Learn about FlushJohn, a trusted porta potty rental company serving 25+ cities across the United States since 2020.",
    url: `${websiteURL}/about`,
    type: "website",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        width: 1200,
        height: 630,
        alt: "FlushJohn About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | FlushJohn - Professional Porta Potty Rental Company",
    description:
      "Learn about FlushJohn, a trusted porta potty rental company serving 25+ cities across the United States since 2020.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/about`,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlushJohn",
  legalName: legalName,
  url: websiteURL,
  logo: `${s3assets}/og-image-flushjonn-web.png`,
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 The Green STE R",
    addressLocality: "Dover",
    addressRegion: "DE",
    postalCode: "19901",
    addressCountry: "United States",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
    contactType: "customer service",
    email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
    areaServed: "US",
  },
  sameAs: [
    process.env.NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_TWITTER!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM!,
  ],
};

export default function AboutPage() {
  const address_full = process.env.NEXT_PUBLIC_FLUSH_JOHN_ADDRESS!;
  const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
  const contact_email = process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!;
  
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className={styles.aboutPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <h1>About FlushJohn</h1>
            <p className={styles.subtitle}>
              Professional porta potty rental services delivered fast and
              hassle-free across the United States
            </p>
          </section>

          {/* Company Overview */}
          <section className={styles.section}>
            <h2>Who We Are</h2>
            <div className={styles.content}>
              <p>
                FlushJohn is a professional porta potty rental company founded
                in 2020. Through our network of trusted local partners, we
                provide reliable, clean, and affordable portable toilet services
                across 25+ cities in 6 states throughout the United States.
              </p>
              <p>
                Our mission is to make porta potty rentals simple, affordable,
                and hassle-free. Whether you're planning a wedding, managing a
                construction site, organizing an event, or handling an
                emergency, we deliver the right solution quickly and at a
                competitive price.
              </p>
            </div>
          </section>

          {/* How We Work */}
          <section className={styles.section}>
            <h2>How We Work</h2>
            <div className={styles.content}>
              <p>
                At FlushJohn, we've built a network of trusted local partners
                across multiple states to ensure you get quality portable toilet
                units and professional service, regardless of your location.
              </p>
              <div className={styles.process}>
                <div className={styles.processStep}>
                  <h3>1. Request a Quote</h3>
                  <p>
                    Fill out our simple online form or call us directly. Tell us
                    about your event, location, dates, and requirements.
                  </p>
                </div>
                <div className={styles.processStep}>
                  <h3>2. We Coordinate Service</h3>
                  <p>
                    Our team coordinates with our local partners to prepare a
                    customized solution tailored to your specific needs.
                  </p>
                </div>
                <div className={styles.processStep}>
                  <h3>3. Get Your Quote</h3>
                  <p>
                    Receive a transparent, competitive quote that includes
                    delivery, setup, and pickup.
                  </p>
                </div>
                <div className={styles.processStep}>
                  <h3>4. Professional Service</h3>
                  <p>
                    Our local partners handle delivery, maintenance, and pickup,
                    ensuring a seamless experience from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Company Information */}
          <section className={styles.section}>
            <h2>Company Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Founded</h3>
                <p>2020</p>
              </div>
              <div className={styles.infoCard}>
                <h3>Business Address</h3>
                <p>{address_full}</p>
              </div>
              <div className={styles.infoCard}>
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${phone_number}`}>{phone_number}</a>
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${contact_email}`}>{contact_email}</a>
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>Service Areas</h3>
                <p>25+ cities across 6 states (TX, FL, CA, GA, IL, DE)</p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className={styles.section}>
            <h2>Why Choose FlushJohn</h2>
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <h3>Wide Coverage</h3>
                <p>
                  Through our network of local partners, we serve 25+ cities
                  across 6 states, ensuring you can find reliable service
                  wherever you need it.
                </p>
              </div>
              <div className={styles.benefit}>
                <h3>Competitive Pricing</h3>
                <p>
                  We work with our local partners to offer competitive pricing
                  on all portable toilet rentals, ensuring you get the best
                  value for quality service.
                </p>
              </div>
              <div className={styles.benefit}>
                <h3>Easy Booking</h3>
                <p>
                  Simple online quote system or phone booking. We coordinate
                  with our local partners to handle all the details so you don't
                  have to.
                </p>
              </div>
              <div className={styles.benefit}>
                <h3>Reliable Service</h3>
                <p>
                  All our local partners are carefully selected and their units
                  are professionally maintained to ensure quality, reliability,
                  and cleanliness.
                </p>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className={styles.section}>
            <h2>Where We Serve</h2>
            <div className={styles.content}>
              <p>
                FlushJohn provides porta potty rental services in the following
                states:
              </p>
              <ul className={styles.stateList}>
                <li>
                  <strong>Texas:</strong> Houston, Dallas, Austin, San Antonio,
                  Fort Worth
                </li>
                <li>
                  <strong>Florida:</strong> Miami, Orlando, Tampa, Jacksonville,
                  Fort Lauderdale
                </li>
                <li>
                  <strong>California:</strong> Los Angeles, San Diego,
                  Sacramento, San Jose, Fresno
                </li>
                <li>
                  <strong>Georgia:</strong> Atlanta, Savannah, Augusta, Macon,
                  Columbus
                </li>
                <li>
                  <strong>Illinois:</strong> Chicago, Springfield, Peoria,
                  Rockford, Naperville
                </li>
                <li>
                  <strong>Delaware:</strong> Dover
                </li>
              </ul>
              <p>
                <a href="/service-areas" className={styles.link}>
                  View all service areas →
                </a>
              </p>
            </div>
          </section>

          {/* Contact CTA */}
          <section className={styles.cta}>
            <h2>Get Started Today</h2>
            <p>
              Need a porta potty rental? Request a free quote and we'll provide
              you with professional service in your area.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/quote" className={styles.primaryButton}>
                Request Free Quote
              </a>
              <a href="/contact" className={styles.secondaryButton}>
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
