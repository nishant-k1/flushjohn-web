import styles from "./styles.module.css";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import ArticleIcon from "@mui/icons-material/Article";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MessageIcon from "@mui/icons-material/Message";
import { FaBloggerB } from "react-icons/fa";

var date = new Date();
var year = date.getFullYear();

const Footer = () => {
  return (
    <>
      <div className={styles.sectionTop}>
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
                <li>
                  <h2>Social</h2>
                </li>
                <li>
                  <Link href="https://www.facebook.com/portarental">
                    <FacebookIcon />
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/reliableportable">
                    <TwitterIcon />
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/rent_a_porta/">
                    <InstagramIcon />
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="linkedin.com/company/rent-a-porta">
                    <LinkedInIcon />
                    Linkedin
                  </Link>
                </li>
                <li>
                  <Link href="https://www.pinterest.com/renta_porta">
                    <PinterestIcon />
                    Pinterest
                  </Link>
                </li>
              </ul>
            </li>

            {/* nav  */}
            <li className={styles.nav}>
              <ul>
                <li>
                  <h2>Navigation</h2>
                </li>
                <li>
                  <Link href="/">
                    <HomeIcon />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <LocalShippingIcon />
                    Portables
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <FaBloggerB style={{ fontSize: "1.5rem" }} />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <MessageIcon />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <PolicyIcon />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <GavelIcon />
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer">
                    <ArticleIcon />
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </li>

            {/* contact */}
            <li className={styles.contact}>
              <ul>
                <li>
                  <h2>Reliable Portable</h2>
                </li>
                <li>
                  <Link href="tel:(855) 780-3061">
                    <PhoneIcon />
                    (855) 780-3061
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <EmailIcon />
                    Email
                  </Link>
                </li>
                <li>
                  <Link href="/quote">
                    <RequestQuoteIcon />
                    Get Free Quote
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className={styles.bottomFooter}>
            Copyright © {year} reliableportable.com
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
