import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import { useRouter } from "next/router";
import { post_data } from "./constant";
import Link from "next/link";

const Blog = () => {
  const router = useRouter();
  const { post_list } = post_data;

  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <Breadcrumbs path={router.pathname} />
        <div className={styles.wrapper}>
          <h1>Blog</h1>
          {post_list.map((item, index) => {
            const { date, title, desc } = item;
            return (
              <Link href={`/blog/${title.toLowerCase().replaceAll(" ", "-")}`}>
                <h2>{title}</h2>
                <h3>{date}</h3>
                <p>{desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;