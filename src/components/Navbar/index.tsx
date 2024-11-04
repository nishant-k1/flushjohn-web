"use client";

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation"; // Import usePathname
import Image from "next/image";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "@/contexts/QuickQuoteContext/index";
import { QuickQuoteContextType } from "@/contexts/QuickQuoteContext/index";
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
              className={styles.logo}
              src={`${s3assets}/logo_white.svg`}
              alt="porta-potty"
              height={64}
              width={100}
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
              className={pathname === "/" ? styles.activeLink : ""}
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
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
