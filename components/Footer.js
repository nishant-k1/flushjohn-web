import footerStyles from "../styles/Footer.module.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaPinterestSquare } from "react-icons/fa";

import Link from "next/link";

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
                      <AiFillFacebook className={footerStyles.icon} />
                      Facebook
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/reliableportable">
                    <a>
                      <AiFillTwitterSquare className={footerStyles.icon} />
                      Twitter
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/rent_a_porta/">
                    <a>
                      <AiFillInstagram className={footerStyles.icon} />
                      Instagram
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="linkedin.com/company/rent-a-porta">
                    <a>
                      <AiFillLinkedin className={footerStyles.icon} />
                      Linkedin
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.pinterest.com/renta_porta">
                    <a>
                      <FaPinterestSquare className={footerStyles.icon} />
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
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products">Portable Toilets</Link>
                </li>
                <li>
                  <Link href="/quote">Get a Quote</Link>
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
                  <Link href="tel:(855) 780-3061">(855) 780-3061</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/disclaimer">Disclaimer</Link>
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
