"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * <ProductImage> tries to load the requested .jpg from /public/uploads, and
 * automatically falls back to the .jpg placeholder of the same basename if
 * the .jpg hasn't been uploaded yet. This keeps the UI clean both before and
 * after the admin uploads real photos.
 */
export default function ProductImage({ src, alt, className }: ProductImageProps) {
  const [errored, setErrored] = useState(false);

  // Build the .jpg fallback path from the .jpg path.
  const fallback = src.replace(/\.(jpe?g|png|webp|avif)$/i, ".jpg");
  const finalSrc = errored ? fallback : src;

  // We use <img> (not next/image) so the fallback works cleanly across both
  // the jpg placeholders and the user-uploaded JPGs without remote-config.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!errored) setErrored(true);
      }}
      loading="lazy"
      decoding="async"
    />
  );
}
