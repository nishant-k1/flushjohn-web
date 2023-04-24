import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Link href="/">
          <img
            src="reliable_portable_logo.svg"
            alt="brand-logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
