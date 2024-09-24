import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import styles from "./styles.module.css";
import Indicator from "./Indicator";
import Image from "next/image";

const Slider = ({ src_1, src_2, alt }:any) => {
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
        <Image
          height={250}
          width={150}
          src={toggle ? src_1 : src_2}
          alt={alt}
        />
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
