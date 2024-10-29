import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import Image from "next/image";

const BlogPost = ({ blogPost, slug }: any) => {
  if (!blogPost) return;
  // const { spr, acpr, dfr, hss } = post_data;
  // const currentPost = (slug: string) => {
  //   switch (slug) {
  //     case "standard-portable-restroom":
  //       return spr;
  //     case "ada-compliant-portable-restroom":
  //       return acpr;
  //     case "flushable-restroom-sink-inside":
  //       return dfr;
  //     case "hand-wash-sink-station":
  //       return hss;
  //     default:
  //       throw new Error(`Invalid slug: ${slug}`);
  //   }
  // };
  // const { date, title, image, desc } = currentPost(slug);
  // const { src, alt } = image;
  const { _id, title, createdAt, blogNo, content } = blogPost;
  const { image, date, desc } = content;
  const { src, alt } = image;

  return (
    <div>
      <div className={styles.post}>
        <div className={styles.container}>
          <Breadcrumbs path={`/blog/${slug}`} />
          <div className={styles.wrapper}>
            <h1>{title}</h1>
            <h2>{createdAt}</h2>
            <Image
              src={src}
              alt={alt}
              width={300}
              height={600}
            />
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
