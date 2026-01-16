"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext, useEffect, useRef } from "react";
import {
  HomeIcon,
  PhoneIcon,
  RequestQuoteIcon,
  LocalShippingIcon,
} from "@/components/UI/Icons";
import Logo from "@/components/Logo";
// Using environment variables directly
const PHONE_LINK = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const PHONE_NUMBER = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
import { logEvent } from "../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Sidebar = () => {

  const { active, setActive } = useContext(SidebarContext);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (active) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [active]);

  // Handle outside clicks - more reliable than overlay
  useEffect(() => {
    if (!active) {
      return;
    }

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      
      // Don't close if clicking inside the sidebar (check ref)
      if (sidebarRef.current && sidebarRef.current.contains(target)) {
        return;
      }

      // Also check if target is inside any element with data-sidebar attribute
      const sidebarElement = target.closest('[data-sidebar="true"]');
      if (sidebarElement) {
        return;
      }

      // Don't close if clicking on the hamburger button (it handles its own toggle)
      const hamburgerElement = target.closest('[class*="hamburger"]');
      if (hamburgerElement) {
        return;
      }

      // Don't close if clicking on any button with aria-label containing "Toggle" or "menu"
      if (target.closest('button[aria-label*="Toggle"], button[aria-label*="menu"]')) {
        return;
      }

      // Close sidebar when clicking outside
      setActive(false);
    };

    // Use a small delay to avoid immediate closure when opening via hamburger
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick, true);
      document.addEventListener("touchstart", handleOutsideClick, true);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("touchstart", handleOutsideClick, true);
    };
  }, [active, setActive]);

  const handleClick = () => {
    setActive(false);
  };

  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div ref={sidebarRef} data-sidebar="true">
      <AnimationWrapper
        effect={animations?.slidebarSlide}
        animationKey={String(active)}
        className={`${styles.section} ${
          active ? styles.active : styles.inactive
        }`}
      >
        <div 
          className={styles.container} 
          onClick={handleSidebarClick}
        >
        <nav className={styles.sidebar} role="navigation" aria-label="Mobile navigation menu">
          <Link href="/" aria-label="FlushJohn Home" onClick={handleClick}>
            <Logo height="3rem" />
          </Link>
          <Link href="/" onClick={handleClick} aria-label="Home">
            <HomeIcon size={20} aria-hidden="true" />
            Home
          </Link>
          <Link href="/rental-products" onClick={handleClick} aria-label="Rental Products">
            <LocalShippingIcon size={20} aria-hidden="true" />
            Rental Products
          </Link>
          <Link href="/quote" onClick={handleClick} aria-label="Request Quote">
            <RequestQuoteIcon size={20} aria-hidden="true" />
            Request Quote
          </Link>
          <Link
            href={PHONE_LINK}
            onClick={() => {
              setActive(false);
              logEvent({
                category: "Button",
                action: "Sidebar Lead Phone Call",
                label: "Sidebar Lead Phone Call Button",
                value: undefined,
                nonInteraction: undefined,
                transport: "beacon",
              });
            }}
            aria-label={`Call ${PHONE_NUMBER}`}
          >
            <PhoneIcon size={20} aria-hidden="true" />
            {PHONE_NUMBER}
          </Link>
        </nav>
      </div>
    </AnimationWrapper>
    </div>
  );
};

export default Sidebar;
