import React from "react";
import styles from "../styles/Home.module.css";
import { home } from "../constants";

const { hero, features, services, locations } = home;

const Hero = React.memo(({ title, image }) => {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroTitle}>
              <h1>{title}</h1>
            </div>
            <div className={styles.heroImage}>
              <img
                src={image.src}
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Features = React.memo(({ heading, content }) => {
  return (
    <div className={`${styles.section} ${styles.featuresSection}`}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <div className={styles.features}>
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

const Services = React.memo(() => {
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
const Home = () => (
  <div>
    <Hero {...hero} />
    {/* <Features {...features} />
  <Services {...services} />
  <Locations {...locations} /> */}
  </div>
);

export default Home;
