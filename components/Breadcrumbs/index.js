import Link from "next/link";
import styles from "./styles.module.css";

const Breadcrumbs = ({ path }) => {
  const pageTitles = path.split("/");

  const route = (pageTitles, index) => {
    if (!pageTitles || !index) return;
    return pageTitles
      .map((item) => {
        if (item === "") return "/";
        else return item;
      })
      .slice(0, index + 1)
      .join("/");
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
        const pageTitle = item.replaceAll("-", " ");
        return (
          <div className={styles.wrapper}>
            <Link href={route(pageTitles, index)}>{pageTitle}</Link>
            {index !== pageTitles.length - 1 && <span>{">>"}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
