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
              coverImage: {
                src: string;
                alt: string;
              };
              createdAt: any;
              blogNo: number;
            }) => {
              const { _id, coverImage, title, createdAt, blogNo } = item;
              const { src = "", alt = "" } = coverImage || {};
              const slug = generateSlug(title);
              return (
                <Link
                  href={`/blog/${slug}`}
                  key={_id}
                >
                  <h2>{title || ""}</h2>
                  <h3>{createdAt || ""}</h3>
                  <h4>{blogNo || ""}</h4>
                  {coverImage && (
                    <Image
                      src={src}
                      alt={alt}
                      height={48}
                      width={48}
                    />
                  )}
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
