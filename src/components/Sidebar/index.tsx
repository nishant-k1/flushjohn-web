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
import Image from "next/image";
// Using environment variables directly
const PHONE_LINK = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const PHONE_NUMBER = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
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
      const target = e.target as Node;
      
      // Don't close if clicking inside the sidebar
      if (sidebarRef.current && sidebarRef.current.contains(target)) {
        return;
      }

      // Close sidebar when clicking outside
      setActive(false);
    };

    // Use capture phase to catch events before they bubble
    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("touchstart", handleOutsideClick, true);

    return () => {
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
    <AnimationWrapper
      effect={animations?.slidebarSlide}
      animationKey={String(active)}
      className={`${styles.section} ${
        active ? styles.active : styles.inactive
      }`}
    >
      <div 
        ref={sidebarRef}
        className={styles.container} 
        onClick={handleSidebarClick}
      >
        <div className={styles.sidebar}>
          <Link href="/">
            <Image
              height={501}
              width={1039}
              onClick={handleClick}
              src={`${CLOUD_FRONT_URL}/logo_white.svg`}
              alt="brand-logo"
              priority={true}
              placeholder="empty"
              style={{
                height: "auto",
                width: "8rem",
                padding: "0",
                margin: "0",
              }}
            />
          </Link>
          <Link href="/" onClick={handleClick}>
            <HomeIcon size={20} />
            Home
          </Link>
          <Link href="/rental-products" onClick={handleClick}>
            <LocalShippingIcon size={20} />
            Rental Products
          </Link>
          <Link href="/quote" onClick={handleClick}>
            <RequestQuoteIcon size={20} />
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
          >
            <PhoneIcon size={20} />
            {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Sidebar;
