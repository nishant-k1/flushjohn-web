import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import Locations from "../Home/Locations";
import { footerLinks } from "./data";

import { home_data } from "../../constants";
const { locations } = home_data;

var date = new Date();
var year = date.getFullYear();

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <ul className={styles.ul}>
            {/* logo */}
            <li className={styles.footerLogo}>
              <Link href="/">
                <Image
                  src="/reliable_portable_logo.svg"
                  alt="brand-logo"
                  height={80}
                  width={128}
                />
              </Link>
            </li>
            {/* social */}
            <li className={styles.social}>
              <ul>
                {footerLinks?.social.map((item) => {
                  const { id, name, icon, href } = item;
                  return (
                    <li key={id}>
                      <Link href={href}>
                        {name}
                        {icon}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* nav  */}
            <li className={styles.nav}>
              <ul>
                {footerLinks?.nav.map((item) => {
                  const { id, name, icon, href } = item;
                  return (
                    <li key={id}>
                      <Link href={href}>
                        {name}
                        {icon}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* contact */}
            <li className={styles.contact}>
              <ul>
                {footerLinks?.contact.map((item) => {
                  const { id, name, icon, href } = item;
                  return (
                    <li key={id}>
                      <Link href={href}>
                        {name}
                        {icon}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <Locations {...locations} />
          <div className={styles.bottomFooter}>
            Copyright © {year} reliableportable.com
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
