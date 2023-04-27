import React from "react";
import styles from "./styles.module.css";

const Locations = React.memo(({ title, list }) => {
  return (
    <div className={styles.locations}>
      <div className={styles.container}>
        <div className={styles.locationWrapper}>
          <h2>{title}</h2>
          <div className={styles.list}>
            {list && list.map((item, index) => <p key={index}>{item}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Locations;
