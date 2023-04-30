import Link from "next/link";
import styles from "./styles.module.css";

const Breadcrumbs = ({ path }) => {
  const currentPage = path.split("/");
  return (
    <div className={styles.breadcrumb}>
      <Link href="/">Home</Link>
      {currentPage.map((item) => {
        if (item === "") return <span>{">>"}</span>;
        else return <Link href={path}>{item}</Link>;
      })}
    </div>
  );
};

export default Breadcrumbs;
