import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            src="/reliable_portable_logo.svg"
            alt="brand-logo"
            height={200}
            width={600}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
