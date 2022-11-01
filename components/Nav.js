import React from "react";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import { Event } from "../lib/analytics";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "./../contexts/QuickQuoteContext/index";
import { ClientWidthContext } from "./../contexts/ClientWidthContext/index";

const Nav = () => {
  const { active, setActive } = React.useContext(SidebarContext);
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);
  const { clientWidth } = React.useContext(ClientWidthContext);
  return (
    <div className={navStyles.section}>
      <div className={navStyles.container}>
        <div className={navStyles.nav}>
          {clientWidth < 769 && (
            <Hamburger
              toggled={active}
              toggle={() => {
                setActive(!active);
                !active && setQuickQuoteViewStatus(false);
              }}
              color="#ffffff"
            />
          )}
          <a
            className={navStyles.phoneMobile}
            href="tel: +1 (855) 780-3061"
            onClick={(e) => {
              Event("Request quote", "Mobile Phone Call", "MPC");
            }}
          >
            <div>
              <FaPhoneAlt />
              (855) 780-3061
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
                  Event("Request quote", "Desktop Phone Call", "DPC");
                }}
              >
                <div>
                  <FaPhoneAlt />
                  (855) 780-3061
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
