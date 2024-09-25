'use client'

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

// import { Event } from "../lib/analytics";
import { Divide as Hamburger } from "hamburger-react";
import { QuickQuoteContext } from "@/contexts/QuickQuoteContext/index";
import { QuickQuoteContextType } from "@/contexts/QuickQuoteContext/index";
import { SidebarContextType } from "@/contexts/SidebarContext";


const Navbar = () => {
  const { active, setActive } = React.useContext<SidebarContextType>(SidebarContext);
  const router = useRouter();

  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext<QuickQuoteContextType>(QuickQuoteContext);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      }
      if (window.scrollY < 50) {
        setScrolled(false);
      }
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
          ? `${router.route === "/" ? styles.navbar_home : styles.navbar} ${
              styles.scrolled
            }`
          : `${router.route === "/" ? styles.navbar_home : styles.navbar}`
      }
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/reliable_portable_logo.svg"
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
              className={router.route === "/" ? styles.activeLink : ""}
            >
              Home
            </Link>
            <Link
              href="/rental-products"
              className={
                router.route === "/rental-products" ? styles.activeLink : ""
              }
            >
              Rental Products
            </Link>
            <Link
              href="/quote"
              className={router.route === "/quote" ? styles.activeLink : ""}
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
