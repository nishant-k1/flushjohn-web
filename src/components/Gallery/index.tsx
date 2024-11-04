import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";

const Gallery = () => {
  return (
    <React.Fragment>
      <div className={styles.gallery}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />
          <div className={styles.disclaimerWrapper}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
