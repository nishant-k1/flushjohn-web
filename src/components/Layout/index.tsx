"use client";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <main
      id="main-content"
      suppressHydrationWarning
      className={`${styles.main} ${isHomePage ? styles.homePage : ""}`}
      role="main"
      aria-label="Main content"
    >
      {children}
    </main>
  );
};

export default Layout;
