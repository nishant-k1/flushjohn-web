import React from "react";
import { Star } from "lucide-react";
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
        className={i < rating ? styles.starActive : styles.starInactive}
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
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i+hVKihuj6VRlddujjwXm3Bx9VoUQpGrVRBevtJ9G/iQgD4f/2Q=="
                    className={styles.testimonialImage}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <div>
                      <div className={styles.rating} style={{ display: "flex", gap: "4px" }}>
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                      </div>
                      {item.verified && (
                        <span className={styles.verifiedBadge}>
                          Verified Customer
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
