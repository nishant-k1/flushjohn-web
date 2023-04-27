import React from "react";
import styles from "./styles.module.css";

const Services = React.memo((services) => {
  return (
    <div className={`${styles.section} ${styles.servicesSection}`}>
      <div className={styles.container}>
        <h2 className={styles.servicesh2}>Our Services</h2>
        <div className={styles.services}>
          <div>
            <img
              src="/assets/event.svg"
              alt="even_pic"
            />
            <h3>{services.h1}</h3>
            <p>{services.p1}</p>
          </div>
          <div>
            <img
              src="/assets/construction.svg"
              alt="event_pic"
            />
            <h3>{services.h2}</h3>
            <p>{services.p2}</p>
          </div>
          <div>
            <img
              src="/assets/renovation.svg"
              alt="event_pic"
            />
            <h3>{services.h3}</h3>
            <p>{services.p3}</p>
          </div>
          <div>
            <img
              src="/assets/relief.svg"
              alt="even_pic"
            />
            <h3>{services.h4}</h3>
            <p>{services.p4}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Services;
