import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { BiCircle } from "react-icons/bi";
import styles from "./styles.module.css";
import Link from "next/link";

const Slider = (props) => {
  const { img1, img2 } = props.img;
  const [img, setImage] = useState(img1);

  return (
    <>
      <div className={styles.slider}>
        <button
          onClick={() => {
            if (img2) {
              setImage(img1);
            } else {
              setImage(img2);
            }
          }}
        >
          <IoIosArrowDropleft className={styles.arrow} />
        </button>
        <img
          src={img}
          alt="https://www.reliableportable.com"
        />
        <button
          onClick={() => {
            if (img) {
              setImage(img2);
            } else {
              setImage(img1);
            }
          }}
        >
          <IoIosArrowDropright className={styles.arrow} />
        </button>
      </div>
      <div className={styles.indicator}>
        <BiCircle
          className={
            img == img1 ? `${styles.circleIsSelected}` : `${styles.circle}`
          }
        />
        <BiCircle
          className={
            img == img2 ? `${styles.circleIsSelected}` : `${styles.circle}`
          }
        />
      </div>
      <button className={styles.quoteLink}>
        <Link
          type="button"
          href="/quote"
        >
          Get Free Quote
        </Link>
      </button>
    </>
  );
};

export default Slider;
