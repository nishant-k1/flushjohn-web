import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import { galleryImages } from "./galleryImages";

const Gallery = () => {
  return (
    <React.Fragment>
      <div className={styles.gallery}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />
          <div className={styles.imagesWrapper}>
            {galleryImages.map(({ url, alt, id, height, width }) => {
              return (
                <div key={id}>
                  <Image
                    src={url}
                    alt={alt}
                    height={height}
                    width={width}
                    priority={true}
                    placeholder="empty"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
