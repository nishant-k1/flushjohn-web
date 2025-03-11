import React from "react";
import { Carousel } from "antd";
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
  }[];
};

const Testimonial = ({ heading, content }: TestimonialProps) => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.container}>
        <h1>{heading}</h1>
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
                    width={96}
                    height={96}
                    style={{
                      height: 96,
                      width: 96,
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
