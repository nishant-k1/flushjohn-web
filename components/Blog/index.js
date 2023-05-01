import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <Breadcrumbs path={router.pathname} />
        <div className={styles.wrapper}>Blog Post List</div>
      </div>
    </div>
  );
};

export default Blog;
