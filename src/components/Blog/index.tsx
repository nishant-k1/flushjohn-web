import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

const Blog = ({ blogList }: any) => {
  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Blog</h1>
          {blogList.map(
            (item: { _id: string; date: any; title: any; desc: any }) => {
              const { date, title, desc, _id } = item;
              const slug = title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/\/+/g, "/")
                .replace(/^-|-$/g, "");
              return (
                <Link
                  href={`/blog/${slug}`}
                  key={_id}
                >
                  <h2>{title || ""}</h2>
                  <h3>{date || ""}</h3>
                  <p>{desc || ""}</p>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
