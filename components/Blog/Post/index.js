import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";

const Post = ({ slug }) => {
  if (!slug) return;

  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <Breadcrumbs path={`/blog/${slug}`} />
        <div className={styles.wrapper}>{slug}</div>
      </div>
    </div>
  );
};

export default Post;
