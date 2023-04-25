import React from "react";
import styles from "../styles.module.css";

const Locations = React.memo(({ title, list }) => {
  return (
    <div className={`${styles.section} ${styles.locationSection}`}>
      <div className={styles.container}>
        <h2 className={styles.locationh2}>{title}</h2>
        <div className={styles.location}>
          <ul className={styles.list}>
            {list && list.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Locations;
