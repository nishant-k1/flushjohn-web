import React from "react";
import styles from "./styles.module.css";

const Locations = React.memo(({ title, list }) => {
  return (
    <div className={styles.locations}>
      <div className={styles.container}>
        <h2>{title}</h2>
        <p className={styles.list}>{list.join(" | ")}</p>
      </div>
    </div>
  );
});

export default Locations;
