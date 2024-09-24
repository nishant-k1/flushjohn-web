import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import React from "react";

type BreadcrumbsProps = {
  path: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  const router = useRouter();
  const { asPath } = router;

  // Splitting the path to get titles
  const pageTitles = asPath.split("/");

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
    <div className={styles.breadcrumb}>
      <Link
        href="/"
        style={{ paddingLeft: "0" }}
      >
        Home
      </Link>
      {pageTitles.map((item, index) => {
        if (item === "") return <span key={index}>{">>"}</span>;
        const pageTitle = item.replace(/-/g, " "); // Replace hyphens with spaces for readability
        return (
          <div
            className={styles.wrapper}
            key={index}
          >
            <Link href={`${route(pageTitles, index)}`}>{pageTitle}</Link>
            {index !== pageTitles.length - 1 && <span>{">>"}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
