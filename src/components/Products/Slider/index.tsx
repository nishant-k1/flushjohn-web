"use client";

import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import styles from "./styles.module.css";
import Indicator from "./Indicator";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductImage } from "@/constants";

const Slider = ({ src_1, src_2, alt }: ProductImage) => {
  const [toggle, setToggle] = React.useState(false);
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
        <motion.div
          key={toggle ? src_2 : src_1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            height={250}
            width={150}
            src={toggle ? src_2 : src_1}
            alt={alt}
            priority={true}
            placeholder="empty"
          />
        </motion.div>

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
