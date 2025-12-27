import React from "react";
import Carousel from "@/components/UI/Carousel";
import Image from "next/image";
import styles from "./styles.module.css";

type TestimonialProps = {
  heading: string;
  content: {
    title: string;
    body: string;
    image: {
      src: string;
      alt: string;
    };
    rating?: number;
    verified?: boolean;
    date?: string;
  }[];
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i < rating ? "#FFD700" : "rgba(255, 255, 255, 0.25)",
          fontSize: "1.25rem",
          textShadow: i < rating ? "0 0 4px rgba(255, 215, 0, 0.5)" : "none",
        }}
      >
        ★
      </span>
    );
  }
  return stars;
};

const Testimonial = ({ heading, content }: TestimonialProps) => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <Carousel
          autoplay
          arrows
        >
          {content &&
            content.map((item, index) => (
              <div key={index}>
                <div className={styles.wrapper}>
                  <div style={{ position: "relative" }}>
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={120}
                      height={120}
                      priority={true}
                      placeholder="empty"
                      style={{
                        height: 120,
                        width: 120,
                        borderRadius: "0",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                        objectFit: "cover",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <div className={styles.ratingContainer}>
                      <div className={styles.rating}>
                        {renderStars(item.rating || 5)}
                      </div>
                      {item.verified && (
                        <span className={styles.verifiedBadge}>
                          ✓ Verified Customer
                        </span>
                      )}
                    </div>
                    <p>{item.body}</p>
                    {item.date && (
                      <p className={styles.testimonialDate}>{item.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
        <div className={styles.trustBadge}>
          Trusted by Thousands Across the USA – 100% Satisfaction Guaranteed!
        </div>
        <div className={styles.asSeenOn}>
          <h3>As Seen On:</h3>
          <div>
            <Image
              height={40}
              width={80}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnnxTSli4RJYRrSbMHov4ZX-AIGRKVoS3Ng&s"
              alt="HomeAdvisor"
            />
            <div className={styles.yelpLogo}>YELP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
