"use client";
import styles from "./styles.module.css";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext, useCallback } from "react";
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

  // Optimize click handler with useCallback to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    if (active) {
      setActive(false);
    }
  }, [active, setActive]);

  return (
    <main
      onClick={handleClick}
      className={`${styles.main} ${active ? styles.active : styles.inactive}`}
      role="main"
      aria-label="Main content"
    >
      {active && <ModalOverlay />}
      {children}
    </main>
  );
};

export default Layout;
