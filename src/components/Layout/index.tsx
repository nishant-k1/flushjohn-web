"use client";

import styles from "./styles.module.css";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";
import ModalOverlay from "../ModalOverlay";
import { SidebarContextType } from "@/contexts/SidebarContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sidebarContext = useContext<SidebarContextType>(SidebarContext);

  // Ensure the context is not undefined before destructuring
  if (!sidebarContext) {
    throw new Error(
      "SidebarContext must be used within a SidebarContextProvider"
    );
  }

  const { active, setActive } = sidebarContext;

  const handleClick = () => {
    if (active) {
      setActive(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.main} ${active ? styles.active : styles.inactive}`}
    >
      {active && <ModalOverlay />}
      {children}
    </div>
  );
};

export default Layout;
