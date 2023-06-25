import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";

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
                <PersonIcon
                  style={{
                    height: 96,
                    width: 96,
                    color: "var(--primary-bg-color)",
                  }}
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
