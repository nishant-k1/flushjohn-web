import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import Image from "next/image";

const BlogPost = ({ blogPost, slug }: any) => {
  if (!blogPost) return;
  const { title, blogNo, content } = blogPost;
  const { image, date, desc } = content;
  const { src, alt } = image;

  return (
    <div>
      <div className={styles.post}>
        <div className={styles.container}>
          <Breadcrumbs path={`/blog/${slug}`} />
          <div className={styles.wrapper}>
            <h1>{title}</h1>
            <h2>{date}</h2>
            <h3>{blogNo}</h3>
            <Image
              src={src}
              alt={alt}
              width={300}
              height={600}
            />
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
