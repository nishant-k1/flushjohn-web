import styles from "./styles.module.css";

const Testimonial = ({ heading, content }) => {
  return (
    <div
      className={`${styles.section} ${styles.testimonialSectionSection}`}
    >
      <div className={styles.container}>
        <div className={styles.testimonialSection}>
          <h2>{heading}</h2>
          <div className={styles.testimonials}>
            {content &&
              content.map((item) => (
                <div>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                  />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
