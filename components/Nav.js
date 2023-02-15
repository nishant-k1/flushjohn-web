import React from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { SidebarContext } from "../contexts/SidebarContext";
// import { Event } from "../lib/analytics";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "./../contexts/QuickQuoteContext/index";

const Nav = () => {
  const { active, setActive } = React.useContext(SidebarContext);
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  return (
    <div className={navStyles.section}>
      <div className={navStyles.container}>
        <div className={navStyles.nav}>
          <div className={navStyles.hamburger}>
            <Hamburger
              toggled={active}
              toggle={() => {
                setActive(!active);
                !active && setQuickQuoteViewStatus(false);
              }}
              color="#ffffff"
            />
          </div>
          <a
            className={navStyles.phoneMobile}
            href="tel: +1 (855) 780-3061"
            onClick={(e) => {
              // Event("Request quote", "Mobile Phone Call", "MPC");
            }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "max-content" }}
            >
              <p style={{ textAlign: "center", margin: 0 }}>Order By Phone</p>
              <div>
                <FaPhoneAlt />
                (855) 780-3061
              </div>
            </div>
          </a>
          <Link href="/">
            <img src="brand-logo-white.svg" alt="brand-logo" />
          </Link>
          <ul className={navStyles.navMenu}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Portable Units</Link>
            </li>
            <li className={navStyles.quote}>
              <Link type="button" href="/quote">
                Get Free Quote
              </Link>
            </li>
            <li className={navStyles.phone}>
              <a
                href="tel: +1 (855) 780-3061"
                type="button"
                onClick={(e) => {
                  // Event("Request quote", "Desktop Phone Call", "DPC");
                }}
              >
                <div>
                  <h1>Order By Phone : </h1>
                  <div>
                    <FaPhoneAlt />
                    (855) 780-3061
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
