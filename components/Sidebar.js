import sidebarStyles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
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
              src="reliable_portable_logo.svg"
              alt="brand-logo"
              height="5rem"
              width="8rem"
            />
          </Link>
          <Link href="/" onClick={handleClick}>
            <HomeIcon />
            Home
          </Link>
          <Link href="/products" onClick={handleClick}>
            <LocalShippingIcon />
            Portables
          </Link>
          <Link href="/quote" onClick={handleClick}>
            <RequestQuoteIcon />
            Get Free Quote
          </Link>
          <Link href="tel:(855) 780-3061" onClick={handleClick}>
            <PhoneIcon />
            (855) 780-3061
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
