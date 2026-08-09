"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pageTitles = pathname.split("/");

  const route = (pageTitles: string[], index: number) => {
    if (!pageTitles || index < 0) return;
    return pageTitles
      .map((item) => {
        if (item === "") return "/";
        return item;
      })
      .slice(0, index + 1)
      .join("/")
      .replace(/\/+/g, "/");
  };

  return (
    <section className={styles.breadcrumbSection}>
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/" style={{ paddingLeft: "0" }}>
            Home
          </Link>
          {pageTitles.map((item, index) => {
            if (item === "") return <span key={index}>{">>"}</span>;
            const pageTitle = item.replace(/-/g, " "); // Replace hyphens with spaces for readability
            return (
              <div className={styles.wrapper} key={index}>
                <Link href={`${route(pageTitles, index)}`}>{pageTitle}</Link>
                {index !== pageTitles.length - 1 && <span>{">>"}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
