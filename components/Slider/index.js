import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import styles from "./styles.module.css";
import Indicator from "./Indicator";

const Slider = ({ src_1, src_2, alt }) => {
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
        <img
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
