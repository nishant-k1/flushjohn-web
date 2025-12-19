"use client";

import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import styles from "./styles.module.css";
import Indicator from "./Indicator";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ProductImage } from "../../../constants";

// Lazy load framer-motion to reduce initial bundle size
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const Slider = ({ src_1, src_2, alt }: ProductImage) => {
  const [toggle, setToggle] = useState(false);
  const setImage = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className={styles.slider}>
        <IoIosArrowDropleft
          onClick={setImage}
          className={styles.arrow}
        />
        <MotionDiv
          key={toggle ? src_2 : src_1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "relative",
            width: "150px",
            height: "120px",
            minWidth: "150px",
            minHeight: "120px",
          }}
        >
          <Image
            src={toggle ? src_2 : src_1}
            alt={alt}
            fill
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            style={{ objectFit: "contain" }}
            sizes="150px"
            quality={85}
          />
        </MotionDiv>

        <IoIosArrowDropright
          onClick={setImage}
          className={styles.arrow}
        />
      </div>
      <Indicator toggle={toggle} />
    </div>
  );
};

export default Slider;
