import Link from "next/link";
import type { ProductListItem } from "@/types/product";

type ProductCardProps = {
  product: ProductListItem;
};

export default function ProductCard({ product }: ProductCardProps) {
  const tags = product.applicationAreas.slice(0, 3);

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.image.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image.url}
            alt={product.image.alt || product.name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="img-ph product-card__placeholder">
            <div className="img-ph-label">Product Image</div>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>

        <p className="product-card__description">{product.shortDescription}</p>

        {/* {tags.length > 0 && (
          <ul className="product-card__tags" aria-label="Application areas">
            {tags.map((area) => (
              <li key={area}>
                <span className="product-card__tag">{area}</span>
              </li>
            ))}
          </ul>
        )} */}

        <div className="product-card__footer">
          <Link
            href={`/products/${product.categorySlug}/${product.slug}`}
            className="product-card__cta"
          >
            View product &nbsp;&#8594;
          </Link>
        </div>
      </div>
    </article>
  );
}
