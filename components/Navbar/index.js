import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { SidebarContext } from "../../contexts/SidebarContext";

// import { Event } from "../lib/analytics";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext/index";

const Navbar = () => {
  const { active, setActive } = React.useContext(SidebarContext);

  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  const [activeLink, setActiveLink] = React.useState("home");
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 50) {
        setScrolled(true);
      }
      if (window.pageYOffset < 50) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const updateActiveLink = (value) => {
    setActiveLink(value);
  };
  return (
    <nav
      className={
        scrolled ? `${styles.navbar} ${styles.scrolled}` : `${styles.navbar}`
      }
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/">
            <img
              className={styles.logo}
              src="reliable_portable_logo.svg"
              alt="porta-potty"
            />
          </Link>
          <div className={styles.hamburger}>
            <Hamburger
              toggled={active}
              toggle={() => {
                setActive(!active);
                !active && setQuickQuoteViewStatus(false);
              }}
              color="white"
              size={20}
            />
          </div>
          <div className={styles.navLinks}>
            <Link
              href="/"
              className={
                activeLink === "home"
                  ? `${styles.active} ${styles.link}`
                  : `${styles.link}`
              }
              onClick={() => {
                updateActiveLink("home");
              }}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={
                activeLink === "products"
                  ? `${styles.active} ${styles.link}`
                  : `${styles.link}`
              }
              onClick={() => {
                updateActiveLink("products");
              }}
            >
              Portables
            </Link>
            <Link
              href="/quote"
              className={
                activeLink === "quote"
                  ? `${styles.active} ${styles.link}`
                  : `${styles.link}`
              }
              onClick={() => {
                updateActiveLink("quote");
              }}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
