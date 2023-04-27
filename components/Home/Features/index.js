import React from "react";
import styles from "./styles.module.css";

const Features = React.memo(({ heading, content }) => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <div className={styles.featuresWrapper}>
          {content &&
            content.map((item) => (
              <div
                key={item.id}
                className={styles.wrapper}
              >
                <div>{item.image}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default Features;
