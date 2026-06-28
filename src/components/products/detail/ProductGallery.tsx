"use client";

import { useState } from "react";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <div className="detail-image">
      <div className="detail-gallery">
        <div className="detail-gallery-main">
          {activeImage.url ? (
            <div className="detail-gallery-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="detail-gallery-img"
              />
            </div>
          ) : (
            <div className="img-ph detail-gallery-ph">
              <div className="img-ph-label">{activeImage.alt}</div>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="detail-gallery-thumbs" role="tablist" aria-label={`${productName} images`}>
            {images.map((image, index) => (
              <button
                key={`${image.alt}-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={image.alt}
                onClick={() => setActiveIndex(index)}
                className={`detail-gallery-thumb${activeIndex === index ? " active" : ""}`}
              >
                <div className="img-ph detail-gallery-thumb-ph">
                  <div className="img-ph-label">{index + 1}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
