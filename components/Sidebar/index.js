import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Image from "next/image";
import { phone } from "../../constants";

const Sidebar = () => {
  const { phone_link, phone_number } = phone;

  const { active, setActive } = useContext(SidebarContext);
  const handleClick = () => {
    setActive(false);
  };

  return (
    <div
      className={`${styles.section} ${
        active ? styles.active : styles.inactive
      }`}
    >
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Link href="/">
            <Image
              height={800}
              width={128}
              onClick={handleClick}
              src="/reliable_portable_logo.svg"
              alt="brand-logo"
            />
          </Link>
          <Link
            href="/"
            onClick={handleClick}
          >
            <HomeIcon />
            Home
          </Link>
          <Link
            href="/products"
            onClick={handleClick}
          >
            <LocalShippingIcon />
            Portables
          </Link>
          <Link
            href="/quote"
            onClick={handleClick}
          >
            <RequestQuoteIcon />
            Get Free Quote
          </Link>
          <Link
            href={phone_link}
            onClick={handleClick}
          >
            <PhoneIcon />
            {phone_number}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
