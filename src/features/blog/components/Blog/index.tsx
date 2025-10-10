import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/utils";
import { convert } from "html-to-text"; // ✅ Import html-to-text

const truncateText = (html: string, maxLength = 150) => {
  const plainText = convert(html, { wordwrap: false }); // ✅ Strip HTML tags
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength).trim() + "..."
    : plainText;
};

const Blog = ({ blogList }: any) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Our Blog</h1>
          <div className={styles.blogWrapper}>
            {blogList.map((item: any) => {
              const { _id, coverImage, title, createdAt, content } = item;
              const blogDate = new Date(createdAt);
              const { src = "", alt = "" } = coverImage || {};
              const slug = generateSlug(title);
              const previewText = truncateText(content);

              return (
                <Link
                  href={`/blog/${slug}`}
                  key={_id}
                  className={styles.blogItem}
                >
                  <div className={styles.imageContainer}>
                    {coverImage && (
                      <Image
                        src={src}
                        alt={alt}
                        width={400}
                        height={200}
                        priority={true}
                        placeholder="empty"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.textContainer}>
                    <h2>{title || "Untitled"}</h2>
                    <h3>
                      {blogDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p>{previewText || "No preview available."}</p>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
