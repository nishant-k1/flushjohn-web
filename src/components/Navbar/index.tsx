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
import { s3assets, phone } from "@/constants";
import { PhoneIcon } from "@/components/UI/Icons";

// Dynamically import hamburger-react to reduce initial bundle size
const Hamburger = dynamic(
  () => import("hamburger-react").then((mod) => mod.Divide),
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
              height={501}
              width={1039}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAzOSIgaGVpZ2h0PSI1MDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMzkiIGhlaWdodD0iNTAxIiBmaWxsPSIjZmZmIi8+PC9zdmc+"
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
            <Link href="/">Home</Link>
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
            <Link
              href={phone.phone_link}
              className={styles.phoneLink}
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof window.gtag === "function"
                ) {
                  window.gtag("event", "conversion", {
                    send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                    event_category: "Phone Call",
                    event_label: "Navbar Phone Link",
                    value: 1,
                  });
                }
              }}
            >
              <PhoneIcon size={16} />
              <span>{phone.phone_number}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
