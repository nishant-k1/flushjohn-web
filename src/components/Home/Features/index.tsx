import React from "react";
import styles from "./styles.module.css";
import { Feature } from "@/constants";

type FeaturesType = {
  heading: string;
  content: Feature[];
}

const Features = React.memo(({ heading, content }: FeaturesType) => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <div className={styles.featuresWrapper}>
          {content &&
            content.map((item: Feature) => (
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