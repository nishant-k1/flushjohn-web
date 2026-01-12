"use client";

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation"; // Import usePathname
import Image from "next/image";
import dynamic from "next/dynamic";
import { QuickQuoteContext } from "@/features/quote/contexts/QuickQuoteContext";
import { QuickQuoteContextType } from "@/features/quote/contexts/QuickQuoteContext";
import { SidebarContextType } from "@/contexts/SidebarContext";
import { PhoneIcon } from "@/components/UI/Icons";
// Construct Google Ads conversion label from env vars
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;

// Dynamically import hamburger-react to reduce initial bundle size
const Hamburger = dynamic(
  () => import("hamburger-react").then((mod) => ({ default: mod.Divide })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    ),
  }
);

const Navbar = () => {
  const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
  const { active, setActive } =
    React.useContext<SidebarContextType>(SidebarContext);
  const { setQuickQuoteViewStatus } =
    React.useContext<QuickQuoteContextType>(QuickQuoteContext);
  const pathname = usePathname(); // Get the current pathname
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      suppressHydrationWarning
      className={
        scrolled
          ? `${pathname === "/" ? styles.navbar_home : styles.navbar} ${styles.scrolled}`
          : `${pathname === "/" ? styles.navbar_home : styles.navbar}`
      }
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/" aria-label="FlushJohn Home">
            <Image
              src={`${s3assets}/logo_white.svg`}
              alt="FlushJohn - Porta Potty Rental Services"
              height={501}
              width={1039}
              priority={true}
              placeholder="empty"
              style={{
                height: "3rem",
                width: "auto",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {}}
              onMouseLeave={(e) => {}}
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
              label="Toggle navigation menu"
            />
          </div>
          <ul className={styles.navLinks} role="menubar">
            <li role="none">
              <Link href="/" role="menuitem" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
            </li>
            <li role="none">
              <Link
                href="/rental-products"
                className={
                  pathname === "/rental-products" ? styles.activeLink : ""
                }
                role="menuitem"
                aria-current={pathname === "/rental-products" ? "page" : undefined}
              >
                Rental Products
              </Link>
            </li>
            <li role="none">
              <Link
                href="/quote"
                className={pathname === "/quote" ? styles.activeLink : ""}
                role="menuitem"
                aria-current={pathname === "/quote" ? "page" : undefined}
              >
                Request Quote
              </Link>
            </li>
            <li role="none">
              <Link
                href="/contact"
                className={pathname === "/contact" ? styles.activeLink : ""}
                role="menuitem"
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
            <li role="none">
              <Link
                href={process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!}
                className={styles.phoneLink}
                role="menuitem"
                aria-label={`Call ${process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE}`}
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    typeof window.gtag === "function" &&
                    GOOGLE_ADS_CONVERSION_PHONE_CALL
                  ) {
                    window.gtag("event", "conversion", {
                      send_to: GOOGLE_ADS_CONVERSION_PHONE_CALL,
                      event_category: "Phone Call",
                      event_label: "Navbar Phone Link",
                      value: 1,
                    });
                  }
                }}
              >
                <PhoneIcon size={16} aria-hidden="true" />
                <span>{process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
