"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";
import {
  HomeIcon,
  PhoneIcon,
  RequestQuoteIcon,
  LocalShippingIcon,
} from "@/components/UI/Icons";
import Image from "next/image";
import { phone, s3assets } from "../../constants";
import { logEvent } from "../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Sidebar = () => {
  const { phone_link, phone_number } = phone;

  const { active, setActive } = useContext(SidebarContext);
  const handleClick = () => {
    setActive(false);
  };

  return (
    <AnimationWrapper
      effect={animations?.slidebarSlide}
      animationKey={String(active)}
      className={`${styles.section} ${
        active ? styles.active : styles.inactive
      }`}
    >
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Link href="/">
            <Image
              height={800}
              width={128}
              onClick={handleClick}
              src={`${s3assets}/logo_white.svg`}
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
          <Link
            href="/"
            onClick={handleClick}
          >
            <HomeIcon size={20} />
            Home
          </Link>
          <Link
            href="/rental-products"
            onClick={handleClick}
          >
            <LocalShippingIcon size={20} />
            Rental Products
          </Link>
          <Link
            href="/quote"
            onClick={handleClick}
          >
            <RequestQuoteIcon size={20} />
            Request Quote
          </Link>
          <Link
            href={phone_link}
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
            {phone_number}
          </Link>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Sidebar;
