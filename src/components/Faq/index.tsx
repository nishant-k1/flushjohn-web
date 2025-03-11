import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

const Faq = () => {
  return (
    <React.Fragment>
      <div className={styles.faq}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />

          {/* FAQ Section */}
          <div className={styles.faqWrapper}>
            <h2>Frequently Asked Questions (FAQ)</h2>

            <div className={styles.faqItem}>
              <h3>1. What porta potty rental services do you offer?</h3>
              <p>
                We provide <strong>porta potty rentals</strong> for{" "}
                <Link href="/rental-products">
                  events, construction sites, and outdoor gatherings
                </Link>
                . Our rental options include standard portable toilets,
                handicap-accessible units, and luxury restroom trailers.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>2. How do I book a porta potty rental?</h3>
              <p>
                Booking a porta potty is easy! Visit our{" "}
                <Link href="/quote">quote page</Link>, fill out the request form
                with your event details, and we’ll connect you with a supplier.
                You’ll receive a customized quote within 24 hours.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>3. How far in advance should I book?</h3>
              <p>
                We recommend booking at least a week in advance to ensure
                availability, especially for large events. However, we may
                accommodate <Link href="/contact">last-minute bookings</Link>{" "}
                depending on availability.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>4. What are the payment options?</h3>
              <p>
                We accept all major credit cards, bank transfers, and online
                payment methods. Payment terms vary by supplier. Get details by
                requesting a <Link href="/quote">free quote</Link>.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>5. Do you provide porta potty cleaning services?</h3>
              <p>
                Yes! Our <strong>porta potty rentals</strong> include regular
                servicing, cleaning, and restocking. For long-term rentals,
                cleaning is scheduled at regular intervals to maintain hygiene.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>6. Can I rent a porta potty for just one day?</h3>
              <p>
                Yes! We offer <strong>single-day porta potty rentals</strong> as
                well as long-term rental options. Whether you need a unit for a
                wedding, festival, or construction project, we’ve got you
                covered.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>7. What areas do you service?</h3>
              <p>
                We provide <strong>nationwide porta potty rentals</strong>{" "}
                across all 50 U.S. states. Whether you're in California, Texas,
                or Florida, we’ll connect you with a reliable local supplier.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>8. How are porta potties delivered?</h3>
              <p>
                Once you confirm your booking, our supplier will arrange
                delivery directly to your location. We coordinate the drop-off
                and pickup to ensure a hassle-free experience. Check out our{" "}
                <Link href="/gallery">gallery</Link> to see our portable
                restrooms in action!
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>9. What if I need more porta potties after booking?</h3>
              <p>
                If you need additional units, simply contact us or your
                supplier. We’ll work to accommodate your request, subject to
                availability. Visit our{" "}
                <Link href="/rental-products">rental products</Link> page for
                more options.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>10. Can I cancel or modify my booking?</h3>
              <p>
                Yes, you can modify or cancel your booking, though it may be
                subject to the supplier’s policies. For assistance, visit our{" "}
                <Link href="/contact">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
