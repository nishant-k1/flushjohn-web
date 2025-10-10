import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { Locations } from "@/features/locations/components";
import { footerLinks } from "./data";
import { home_data } from "@/features/home/constants";
import { s3assets } from "@/constants";
const { locations } = home_data;

var date = new Date();
var year = date.getFullYear();

type itemType = {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
};

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
                  src={`${s3assets}/logo_white.svg`}
                  alt="brand-logo"
                  height={80}
                  width={128}
                  priority={true}
                  placeholder="empty"
                  style={{
                    height: "auto",
                    width: "8rem",
                    padding: "0",
                    margin: "0",
                  }}
                />
              </Link>
            </li>
            {/* social */}
            <li className={styles.social}>
              <ul>
                {footerLinks?.social.map((item: itemType) => {
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
                {footerLinks?.nav.map((item: itemType) => {
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
                {footerLinks?.contact.map((item: itemType) => {
                  const { id, name, href, icon } = item;
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
            Copyright © {year} flushjohn.com
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
