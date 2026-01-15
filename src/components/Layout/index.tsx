"use client";
import styles from "./styles.module.css";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import ModalOverlay from "../ModalOverlay";
import { SidebarContextType } from "@/contexts/SidebarContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sidebarContext = useContext<SidebarContextType>(SidebarContext);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!sidebarContext) {
    throw new Error(
      "SidebarContext must be used within a SidebarContextProvider"
    );
  }

  const { active, setActive } = sidebarContext;

  return (
    <main
      id="main-content"
      suppressHydrationWarning
      className={`${styles.main} ${active ? styles.active : styles.inactive} ${isHomePage ? styles.homePage : ""}`}
      role="main"
      aria-label="Main content"
    >
      {active && <ModalOverlay />}
      {children}
    </main>
  );
};

export default Layout;
