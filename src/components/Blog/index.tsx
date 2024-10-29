import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/utils";

const Blog = ({ blogList }: any) => {
  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Blog</h1>
          {blogList.map(
            (item: {
              _id: any;
              title: string;
              createdAt: any;
              blogNo: number;
              content: {
                date: any;
                image: {
                  src: string;
                  alt: string;
                };
                desc: string;
                keywords: [string];
              };
            }) => {
              const { _id, title, createdAt, blogNo, content } = item;
              const slug = generateSlug(title);
              return (
                <Link
                  href={`/blog/${slug}`}
                  key={_id}
                >
                  <h2>{title || ""}</h2>
                  <h3>{createdAt || ""}</h3>
                  <h4>{blogNo || ""}</h4>
                  <Image
                    src={content?.image?.src}
                    alt={content?.image?.alt}
                    height={48}
                    width={48}
                  />
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
