"use client";

import React, { useContext, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  PhoneIcon,
  RequestQuoteIcon,
  LocalShippingIcon,
} from "@/components/UI/Icons";
import { logEvent } from "../../../react-ga4-config";

const PHONE_LINK = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const PHONE_NUMBER = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;

const MobileMenu = () => {
  const { active, setActive } = useContext(SidebarContext);
  const pathname = usePathname();
  const [navbarHeight, setNavbarHeight] = React.useState(80);

  // Calculate navbar height dynamically
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("nav[role='navigation']");
      if (navbar) {
        setNavbarHeight(navbar.getBoundingClientRect().height);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    window.addEventListener("scroll", updateNavbarHeight);

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
      window.removeEventListener("scroll", updateNavbarHeight);
    };
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const handleLinkClick = () => {
    setActive(false);
  };

  if (!active) return null;

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setActive(false)}
        role="presentation"
      />
      <div
        className={styles.mobileMenu}
        role="navigation"
        aria-label="Mobile navigation menu"
        style={{
          top: `${navbarHeight}px`,
          maxHeight: `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        <div className={styles.menuContent}>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={pathname === "/" ? styles.activeLink : ""}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <HomeIcon size={20} aria-hidden="true" />
          <span>Home</span>
        </Link>

        <Link
          href="/rental-products"
          onClick={handleLinkClick}
          className={pathname === "/rental-products" ? styles.activeLink : ""}
          aria-current={pathname === "/rental-products" ? "page" : undefined}
        >
          <LocalShippingIcon size={20} aria-hidden="true" />
          <span>Rental Products</span>
        </Link>

        <Link
          href="/quote"
          onClick={handleLinkClick}
          className={pathname === "/quote" ? styles.activeLink : ""}
          aria-current={pathname === "/quote" ? "page" : undefined}
        >
          <RequestQuoteIcon size={20} aria-hidden="true" />
          <span>Request Quote</span>
        </Link>

        <Link
          href="/contact"
          onClick={handleLinkClick}
          className={pathname === "/contact" ? styles.activeLink : ""}
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Contact</span>
        </Link>

        <Link
          href={PHONE_LINK}
          onClick={() => {
            setActive(false);
            logEvent({
              category: "Button",
              action: "Mobile Menu Phone Call",
              label: "Mobile Menu Phone Call Button",
              value: undefined,
              nonInteraction: undefined,
              transport: "beacon",
            });
          }}
          className={styles.phoneLink}
          aria-label={`Call ${PHONE_NUMBER}`}
        >
          <PhoneIcon size={20} aria-hidden="true" />
          <span>{PHONE_NUMBER}</span>
        </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
