"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Skeleton } from "./Skeleton";
import styles from "./LazyImage.module.css";

type LazyImageProps = {
  src: string;
  alt: string;
  /** Fill the positioned parent (matches this site's `.x-image { position: relative }` card pattern). */
  fill?: boolean;
  /**
   * Scale to 100% of the container's width with height following the image's
   * natural aspect ratio, instead of a fixed pixel box — for containers whose
   * own height is meant to be dictated by the image (e.g. a grid row with
   * `align-items: center` rather than `stretch`). `width`/`height` are still
   * required to give next/image the aspect ratio.
   */
  fluid?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /** Above-the-fold images: skip the skeleton delay and load eagerly. */
  priority?: boolean;
  className?: string;
  objectFit?: CSSProperties["objectFit"];
};

/**
 * next/image wrapped with a skeleton preloader. Renders a shimmering
 * placeholder until the image has actually decoded, then cross-fades it in.
 */
export function LazyImage({
  src,
  alt,
  fill,
  fluid,
  width,
  height,
  sizes,
  priority,
  className,
  objectFit = "cover",
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const showSkeleton = !loaded && !priority;

  return (
    <span
      className={`${styles.wrapper} ${fill ? styles.fill : ""} ${fluid ? styles.fluid : ""} ${className ?? ""}`}
      style={!fill && !fluid ? { width, height } : undefined}
    >
      {showSkeleton && <Skeleton />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        style={fluid ? { objectFit, width: "100%", height: "auto" } : { objectFit }}
        className={`${styles.image} ${loaded || priority ? styles.imageLoaded : styles.imageLoading}`}
      />
    </span>
  );
}
