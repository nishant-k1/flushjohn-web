import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  PinterestIcon,
} from "@/components/UI/Icons";
import styles from "../Navbar/styles.module.css";
import Link from "next/link";

const Social = () => {
  return (
    <div>
      <ul className={styles.nav}>
        <li>
          {/* <Link href="https://www.facebook.com/portarental"> */}
          <Link href="/">
            <FacebookIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          {/* <Link href="https://twitter.com/flushjohn"> */}
          <Link href="/">
            <TwitterIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          {/* <Link href="https://www.instagram.com/rent_a_porta/"> */}
          <Link href="/">
            <InstagramIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          {/* <Link href="linkedin.com/company/rent-a-porta"> */}
          <Link href="/">
            <LinkedInIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          {/* <Link href="https://www.pinterest.com/renta_porta"> */}
          <Link href="/">
            <PinterestIcon className={styles.icon} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Social;
