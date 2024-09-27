import React from "react";
import styles from "./styles.module.css";
// import { NextSeo } from "next-seo";
import Breadcrumbs from "../Breadcrumbs";

const Faq = () => {
  return (
    <React.Fragment>
      {/* <NextSeo
        noindex={true}
        nofollow={true}
      /> */}
      <div className={styles.faq}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />

          {/* FAQ Section */}
          <div className={styles.faqWrapper}>
            <h2>Frequently Asked Questions (FAQ)</h2>

            <div className={styles.faqItem}>
              <h3>1. What services do you offer?</h3>
              <p>
                We provide porta potty rental services by connecting consumers
                with trusted suppliers. Whether it’s for events, construction
                sites, or outdoor gatherings, we help you find the right
                portable sanitation solution.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>2. How do I book a porta potty rental?</h3>
              <p>
                Simply visit our website, fill out the request form, and provide
                your event details, location, and the number of units you need.
                Our team will connect you with a supplier, and you'll receive a
                quote within 24 hours.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>3. How far in advance should I book?</h3>
              <p>
                We recommend booking at least a week in advance to ensure
                availability, especially for large events. However, we can often
                accommodate last-minute bookings depending on supplier
                availability.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>4. What are the payment options?</h3>
              <p>
                We accept all major credit cards, bank transfers, and online
                payment methods. Payment terms may vary depending on the
                supplier and the nature of the rental.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>
                5. Do you provide cleaning services for the porta potties?
              </h3>
              <p>
                Yes, all porta potty rentals include periodic cleaning and
                servicing, which is handled by the supplier. For long-term
                rentals, servicing will occur at regular intervals.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>6. Can I rent for a single day?</h3>
              <p>
                Yes, we offer both short-term (single day) and long-term
                rentals. Whether you need a porta potty for a day or a month, we
                have options available to suit your needs.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>7. What areas do you service?</h3>
              <p>
                We work with suppliers across multiple regions. Simply provide
                your location when requesting a quote, and we’ll connect you
                with a supplier that services your area.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>8. How are the porta potties delivered?</h3>
              <p>
                Once you confirm your booking, the supplier will arrange
                delivery directly to your location. Delivery times will be
                coordinated with you to ensure the units arrive on time.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>9. What happens if I need more units after booking?</h3>
              <p>
                If you find that you need additional porta potties after your
                initial booking, simply contact us or your supplier. We’ll work
                to accommodate your needs, subject to availability.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>10. Can I cancel or modify my booking?</h3>
              <p>
                Yes, cancellations and modifications are allowed, though they
                may be subject to the supplier’s terms and conditions. Please
                check with us for specific policies based on your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
