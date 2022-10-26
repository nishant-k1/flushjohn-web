import footerStyles from "../styles/Footer.module.css";
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

var date = new Date();
var year = date.getFullYear();

const Footer = () => {
  return (
    <>
      <div className={footerStyles.sectionTop}>
        <div className={footerStyles.container}>
          <ul className={footerStyles.ul}>
            {/* logo */}
            <li className={footerStyles.footerLogo}>
              <Link href="/">
                <img src="brand-logo-transparent.svg" alt="brand-logo" />
              </Link>
            </li>

            {/* social */}
            <li className={footerStyles.social}>
              <ul>
                <li>
                  <h2>Social</h2>
                </li>
                <li>
                  <Link href="https://www.facebook.com/portarental">
                    <a>
                      <FacebookIcon />
                      Facebook
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/reliableportable">
                    <a>
                      <TwitterIcon />
                      Twitter
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/rent_a_porta/">
                    <a>
                      <InstagramIcon />
                      Instagram
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="linkedin.com/company/rent-a-porta">
                    <a>
                      <LinkedInIcon />
                      Linkedin
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.pinterest.com/renta_porta">
                    <a>
                      <PinterestIcon />
                      Pinterest
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

            {/* nav  */}
            <li className={footerStyles.nav}>
              <ul>
                <li>
                  <h2>Navigation</h2>
                </li>
                <li>
                  <Link href="/">
                    <a>
                      <HomeIcon />
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a>
                      <LocalShippingIcon />
                      Portables
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <a>
                      <PolicyIcon />
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a>
                      <GavelIcon />
                      Terms & Conditions
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer">
                    <a>
                      <ArticleIcon />
                      Disclaimer
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

            {/* contact */}
            <li className={footerStyles.contact}>
              <ul>
                <li>
                  <h2>Reliable Portable</h2>
                </li>
                <li>
                  <Link href="tel:(855) 780-3061">
                    <a>
                      <PhoneIcon />
                      (855) 780-3061
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>
                      <EmailIcon />
                      Email
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/quote">
                    <a>
                      <RequestQuoteIcon />
                      Get Free Quote
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={footerStyles.sectionBottom}>
        <div className={footerStyles.container}>
          <p>Copyright © {year} reliableportable.com</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
