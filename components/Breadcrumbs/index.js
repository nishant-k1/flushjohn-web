import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const Breadcrumbs = ({ path }) => {
  const router = useRouter();
  const { asPath } = router;
  const pageTitles = asPath.split("/");
  const route = (pageTitles, index) => {
    if (!pageTitles || !index) return;
    return pageTitles
      .map((item) => {
        if (item === "") return "/";
        else return item;
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
        if (item === "") return <span>{">>"}</span>;
        const pageTitle = item.replace(/-/g, " "); // Updated line
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
