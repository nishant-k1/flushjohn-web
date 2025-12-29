import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Service } from "../../constants";

type ServicesProps = {
  heading: string;
  content: Service[];
};

const Services = React.memo(({ heading, content }: ServicesProps) => {
  return (
    <div className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.servicesGrid}>
          {/* First column: Heading and description */}
          <div className={styles.headingColumn}>
            <h3 className={styles.heading}>{heading}</h3>
            <p className={styles.description}>
              Comprehensive porta potty rental solutions tailored to meet your
              infrastructure needs.
            </p>
          </div>

          {/* Remaining columns: Service cards */}
          {content.map((item, index) => {
            const { id, image, alt, title, body } = item;

            // Render first 2 cards
            if (index < 2) {
              return (
                <div
                  className={styles.serviceCard}
                  key={id}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={image}
                      alt={alt}
                      height={200}
                      width={300}
                      priority={id === 1}
                      placeholder="empty"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className={styles.textContent}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardBody}>{body}</p>
                  </div>
                </div>
              );
            }

            // After first 2 cards, insert image card (bottom row, first column)
            if (index === 2) {
              return (
                <React.Fragment key={`fragment-${id}`}>
                  {/* Image card in bottom row, first column */}
                  <div className={styles.imageCard}>
                    <Image
                      src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="Professional portable toilet unit at outdoor event - FlushJohn porta potty rental services"
                      height={200}
                      width={300}
                      priority={false}
                      placeholder="empty"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {/* Then render the current card */}
                  <div
                    className={styles.serviceCard}
                    key={id}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={image}
                        alt={alt}
                        height={200}
                        width={300}
                        priority={false}
                        placeholder="empty"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className={styles.textContent}>
                      <h3 className={styles.cardTitle}>{title}</h3>
                      <p className={styles.cardBody}>{body}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            }

            // Render remaining cards
            return (
              <div
                className={styles.serviceCard}
                key={id}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={alt}
                    height={200}
                    width={300}
                    priority={false}
                    placeholder="empty"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardBody}>{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Services;
