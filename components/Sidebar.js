import sidebarStyles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Sidebar = () => {
  const { active, setActive } = useContext(SidebarContext);
  const handleClick = () => {
    setActive(false);
  };

  return (
    <div
      className={`${sidebarStyles.section} ${
        active ? sidebarStyles.active : sidebarStyles.inactive
      }`}
    >
      <div className={sidebarStyles.container}>
        <div className={sidebarStyles.sidebar}>
          <Link href="/">
            <img
              onClick={handleClick}
              src="brand-logo-transparent.svg"
              alt="brand-logo"
            />
          </Link>
          <ul className={sidebarStyles.sidebarMenu}>
            <Link href="/">
              <li onClick={handleClick}>
                <HomeIcon />
                Home
              </li>
            </Link>
            <Link href="/products">
              <li onClick={handleClick}>
                <LocalShippingIcon />
                Portables
              </li>
            </Link>
            <Link href="/quote">
              <li onClick={handleClick}>
                <RequestQuoteIcon />
                Get Free Quote
              </li>
            </Link>
            <Link href="tel:(855) 780-3061">
              <li onClick={handleClick}>
                <PhoneIcon />
                (855) 780-3061
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
