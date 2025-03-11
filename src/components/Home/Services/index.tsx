import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Service } from "@/constants";
import Link from "next/link";

type ServicesProps = {
  heading: string;
  content: Service[];
};

const Services = React.memo(({ heading, content }: ServicesProps) => {
  return (
    <div className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.serviceGrid}>
          {content.map((item) => {
            const { id, image, alt, title, body } = item;
            return (
              <div
                className={styles.serviceCard}
                key={id}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={alt}
                    height={300}
                    width={450}
                    priority={true}
                    placeholder="empty"
                  />
                </div>
                <div className={styles.textContent}>
                  <h2>{title}</h2>
                  <p>{body}</p>
                  <Link href="/quote">
                    <button className={styles.quoteButton}>
                      Request a Quote
                    </button>
                  </Link>
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
