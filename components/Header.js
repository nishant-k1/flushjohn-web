import { FaPinterestSquare } from "react-icons/fa";
import headerStyles from "../styles/Header.module.css";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Header = () => {
  return (
    <div className={headerStyles.section}>
      <div className={headerStyles.container}>
        <Link href="/">
          <img
            src="brand-logo-white.svg"
            style={{ height: "5rem" }}
            alt="brand-logo"
          />
        </Link>
        <ul className={headerStyles.nav}>
          <li>
            <Link href="https://www.facebook.com/portarental">
              <FacebookIcon
                className={`${headerStyles.icon} ${headerStyles.fb}`}
              />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/reliableportable">
              <TwitterIcon
                className={`${headerStyles.icon} ${headerStyles.twitter}`}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/rent_a_porta/">
              <InstagramIcon
                className={`${headerStyles.icon} ${headerStyles.instagram}`}
              />
            </Link>
          </li>
          <li>
            <Link href="linkedin.com/company/rent-a-porta">
              <LinkedInIcon
                className={`${headerStyles.icon} ${headerStyles.linkedin}`}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.pinterest.com/renta_porta">
              <PinterestIcon
                className={`${headerStyles.icon} ${headerStyles.pinterest}`}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
