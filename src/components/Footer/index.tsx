import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { Locations } from "@/features/locations/components";
import { footerLinks } from "./data";
import { home_data } from "@/features/home/constants";
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
  const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
  const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
  const contact_email = process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!;
  const address_full = process.env.NEXT_PUBLIC_FLUSH_JOHN_ADDRESS!;
  
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
                  height={501}
                  width={1039}
                  priority={true}
                  placeholder="empty"
                  style={{
                    height: "auto",
                    width: "8rem",
                    padding: "0",
                    margin: "0",
                    filter: "invert(1) brightness(0)",
                  }}
                />
              </Link>
            </li>
            {/* social */}
            <li className={styles.social}>
              <h2>Follow Us</h2>
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
              <h2>Quick Links</h2>
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
              <h2>Contact Us</h2>
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

          {/* Business Information Section */}
          <div className={styles.businessInfo}>
            <div className={styles.businessInfoContent}>
              <div className={styles.businessInfoItem}>
                <h3>Business Address</h3>
                <p>{address_full}</p>
              </div>
              <div className={styles.businessInfoItem}>
                <h3>Established</h3>
                <p>2020</p>
              </div>
              <div className={styles.businessInfoItem}>
                <h3>Contact</h3>
                <p>
                  <a href={`tel:${phone_number}`}>{phone_number}</a>
                  <br />
                  <a href={`mailto:${contact_email}`}>{contact_email}</a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.bottomFooter}>
            <div className={styles.copyright}>
              Copyright © {year} FlushJohn. All rights reserved. |{" "}
              <Link href="/about">About Us</Link> |{" "}
              <Link href="/privacy">Privacy Policy</Link> |{" "}
              <Link href="/terms">Terms & Conditions</Link>
            </div>
            <div className={styles.disclaimer}>
              FlushJohn coordinates portable restroom rentals through licensed
              local service providers. Service delivery and fulfillment handled
              by vetted local partners in your area.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
