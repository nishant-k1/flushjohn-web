import React from "react";
import styles from "./styles.module.css";
import { Feature } from "@/constants";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

type FeaturesType = {
  heading: string;
  content: Feature[];
};

const Features = React.memo(({ heading, content }: FeaturesType) => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <h1>{heading}</h1>
        <div className={styles.featuresWrapper}>
          {content &&
            content.map((item: Feature) => (
              <div
                key={item.id}
                className={styles.wrapper}
              >
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
                <div className={styles.iconContainer}>
                  <AnimationWrapper effect={animations?.bobbleImage}>
                    {item.image}
                  </AnimationWrapper>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default Features;
