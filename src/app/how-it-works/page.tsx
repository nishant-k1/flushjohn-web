import React from "react";
import type { Metadata } from "next";
import { websiteURL, s3assets } from "@/constants";
import Script from "next/script";
import styles from "./styles.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | FlushJohn - Simple Porta Potty Rental Process",
  description:
    "Learn how FlushJohn makes porta potty rentals simple. From quote request to delivery, we coordinate everything through our network of trusted local partners.",
  openGraph: {
    title: "How FlushJohn Works - Simple Porta Potty Rental Process",
    description:
      "Learn how FlushJohn makes porta potty rentals simple. From quote request to delivery, we coordinate everything for you.",
    url: `${websiteURL}/how-it-works`,
    type: "website",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        width: 1200,
        height: 630,
        alt: "FlushJohn How It Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | FlushJohn - Simple Porta Potty Rental Process",
    description:
      "Learn how FlushJohn makes porta potty rentals simple. From quote request to delivery, we coordinate everything for you.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/how-it-works`,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Rent a Porta Potty with FlushJohn",
  description:
    "Step-by-step guide to renting a porta potty through FlushJohn's simple booking process",
  totalTime: "PT15M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Request a Free Quote",
      text: "Fill out our simple online quote form or call us directly. Provide your event details, location, dates, and number of units needed.",
      url: `${websiteURL}/quote`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "We Coordinate Service",
      text: "Our team coordinates with trusted local partners in your area to prepare a customized solution tailored to your specific needs.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review Your Quote",
      text: "Receive a transparent, competitive quote that includes delivery, setup, maintenance, and pickup. All pricing is clearly explained.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm and Book",
      text: "Approve the quote and confirm your booking. We handle all coordination with our local partners to ensure seamless service.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Delivery and Setup",
      text: "Our local partners deliver and set up the porta potties at your specified location. We ensure everything is ready before your event.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Enjoy Your Event",
      text: "During your rental period, units are maintained and serviced as needed. Our partners handle all maintenance and restocking.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Pickup and Completion",
      text: "After your event, our local partners handle pickup and cleanup. You're all set - no additional work required on your end.",
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className={styles.howItWorksPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <h1>How It Works</h1>
            <p className={styles.subtitle}>
              Simple, hassle-free porta potty rentals in just a few easy steps
            </p>
          </section>

          {/* Process Steps */}
          <section className={styles.processSection}>
            <div className={styles.processSteps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Request a Free Quote</h3>
                  <p>
                    Fill out our simple online quote form or call us directly.
                    Tell us about your event, location, dates, and requirements.
                    No obligation, and we respond quickly.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>We Coordinate Service</h3>
                  <p>
                    Our team coordinates with trusted local partners in your
                    area to prepare a customized solution tailored to your
                    specific needs. We handle all the coordination.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Review Your Quote</h3>
                  <p>
                    Receive a transparent, competitive quote that includes
                    delivery, setup, maintenance, and pickup. All pricing is
                    clearly explained with no hidden fees.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Confirm and Book</h3>
                  <p>
                    Approve the quote and confirm your booking. We handle all
                    coordination with our local partners to ensure seamless
                    service from start to finish.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3>Delivery and Setup</h3>
                  <p>
                    Our local partners deliver and set up the porta potties at
                    your specified location. We ensure everything is ready
                    before your event begins.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>6</div>
                <div className={styles.stepContent}>
                  <h3>Enjoy Your Event</h3>
                  <p>
                    During your rental period, units are maintained and serviced
                    as needed. Our partners handle all maintenance and
                    restocking - you just enjoy your event.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>7</div>
                <div className={styles.stepContent}>
                  <h3>Pickup and Completion</h3>
                  <p>
                    After your event, our local partners handle pickup and
                    cleanup. You're all set - no additional work required on
                    your end.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose This Process */}
          <section className={styles.benefitsSection}>
            <h2>Why Our Process Works</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <h3>One Point of Contact</h3>
                <p>
                  You deal with us, not multiple vendors. We coordinate
                  everything so you don't have to.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>Fast Response</h3>
                <p>
                  Get quotes quickly, usually within hours. We understand events
                  and construction projects need fast decisions.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>Transparent Pricing</h3>
                <p>
                  No hidden fees or surprises. All costs are clearly explained
                  upfront in your quote.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>Reliable Service</h3>
                <p>
                  Our local partners are vetted for quality and reliability. We
                  ensure you get professional service every time.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <h2>Ready to Get Started?</h2>
            <p>
              Request your free quote today and experience our simple,
              hassle-free process.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/quote" className={styles.primaryButton}>
                Get Free Quote
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
