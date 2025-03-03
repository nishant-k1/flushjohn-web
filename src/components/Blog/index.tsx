import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/utils";

const Blog = ({ blogList }: any) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Blog</h1>
          <div className={styles.blogWrapper}>
            {blogList.map(
              (item: {
                _id: any;
                title: string;
                coverImage: {
                  src: string;
                  alt: string;
                };
                createdAt: any;
                desc: string;
              }) => {
                const { _id, coverImage, title, createdAt, desc } = item;
                const blogDate = new Date(createdAt);
                const { src = "", alt = "" } = coverImage || {};
                const slug = generateSlug(title);
                return (
                  <Link
                    href={`/blog/${slug}`}
                    key={_id}
                    className={styles.blogItem}
                  >
                    <div className={styles.textContainer}>
                      <h2>{title || ""}</h2>
                      <h3>
                        {blogDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <p>{desc || ""}</p>
                    </div>
                    {coverImage && (
                      <Image
                        src={src}
                        alt={alt}
                        height={200}
                        width={200}
                      />
                    )}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
