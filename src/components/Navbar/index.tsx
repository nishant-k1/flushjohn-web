"use client";

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation"; // Import usePathname
import Image from "next/image";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "@/features/quote/contexts/QuickQuoteContext";
import { QuickQuoteContextType } from "@/features/quote/contexts/QuickQuoteContext";
import { SidebarContextType } from "@/contexts/SidebarContext";
import { s3assets } from "@/constants";

const Navbar = () => {
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
      className={
        scrolled
          ? `${pathname === "/" ? styles.navbar_home : styles.navbar} ${styles.scrolled}`
          : `${pathname === "/" ? styles.navbar_home : styles.navbar}`
      }
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/">
            <Image
              src={`${s3assets}/logo_white.svg`}
              alt="porta-potty"
              height={64}
              width={100}
              priority={true}
              placeholder="empty"
              style={{
                height: "3rem",
                width: "auto",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(0.96)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
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
          <div className={styles.navLinks}>
            <Link
              href="/"
              // className={pathname === "/" ? styles.activeLink : ""}
            >
              Home
            </Link>
            <Link
              href="/rental-products"
              className={
                pathname === "/rental-products" ? styles.activeLink : ""
              }
            >
              Rental Products
            </Link>
            <Link
              href="/gallery"
              className={pathname === "/gallery" ? styles.activeLink : ""}
            >
              Gallery
            </Link>
            <Link
              href="/quote"
              className={pathname === "/quote" ? styles.activeLink : ""}
            >
              Request Quote
            </Link>
            <Link
              href="/contact"
              className={pathname === "/contact" ? styles.activeLink : ""}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
