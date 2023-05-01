import React from "react";
import styles from "./styles.module.css";

const Testimonial = ({ heading, content }) => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <div className={styles.testimonialsWrapper}>
          {content &&
            content.map((item, index) => (
              <div
                className={styles.wrapper}
                key={index}
              >
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
