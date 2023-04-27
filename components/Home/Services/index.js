import React from "react";
import styles from "./styles.module.css";

const Services = React.memo(({ heading, content }) => {
  console.log(content);
  return (
    <div className={styles.services}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <div className={styles.serviceWrapper}>
          {content &&
            content.map((item, index) => {
              const { id, image, alt, title, body } = item;
              return (
                <div
                  className={
                    index % 2 === 0
                      ? styles.wrapper
                      : `${styles.wrapper} ${styles.rowReverse}`
                  }
                  key={id}
                >
                  <img
                    src={image}
                    alt={alt}
                  />
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
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
