import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import { galleryImages } from "./galleryImages";

const Gallery = () => {
  return (
    <React.Fragment>
      <div className={styles.gallery}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />
          <div className={styles.imagesWrapper}>
            {galleryImages.map(({ url, alt, id, height, width }, index) => {
              // Only prioritize first 3 images for faster initial load
              const isPriority = index < 3;
              return (
                <div
                  key={id}
                  style={{
                    position: "relative",
                    aspectRatio: `${width}/${height}`,
                    width: "100%",
                    contain: "layout style paint",
                  }}
                >
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    priority={isPriority}
                    loading={isPriority ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
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
