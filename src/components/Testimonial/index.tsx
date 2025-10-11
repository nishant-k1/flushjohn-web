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
  }[];
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        style={{ color: i < rating ? "#ffcc00" : "#ccc" }}
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
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={128}
                    height={128}
                    priority={true}
                    placeholder="empty"
                    style={{
                      height: 128,
                      width: 128,
                      borderRadius: "50%",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <div>
                      <div className={styles.rating}>
                        ⭐⭐⭐⭐⭐{/* {renderStars(5)} */}
                      </div>
                      {item.verified && (
                        <span style={{ marginLeft: "8px", color: "#4CAF50" }}>
                          Verified Customer
                        </span>
                      )}
                    </div>
                    <p>{item.body}</p>
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
