import styles from "./styles.module.css";
import EmailIcon from "@mui/icons-material/Email";

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
import { useRouter } from "next/router";

var date = new Date();
var year = date.getFullYear();

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.sectionTop}>
        <div className={styles.container}>
          <ul className={styles.ul}>
            {/* logo */}
            <li className={styles.footerLogo}>
              <Link href="/">
                <img
                  src="reliable_portable_logo.svg"
                  alt="brand-logo"
                  height="5rem"
                  width="8rem"
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
        </div>
      </div>
      <div className={styles.sectionBottom}>
        <div className={styles.container}>
          <p>Copyright © {year} reliableportable.com</p>
        </div>
      </div>
    </>
  );
};

export default Footer;