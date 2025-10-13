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
          <Link href="https://www.facebook.com/flushjohn" target="_blank" rel="noopener noreferrer">
            <FacebookIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.twitter.com/flushjohn" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/flushjohn" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/company/flushjohn" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.pinterest.com/flushjohn" target="_blank" rel="noopener noreferrer">
            <PinterestIcon className={styles.icon} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Social;
