import Link from "next/link";
import ProductCTA from "@/components/products/detail/ProductCTA";
import ProductDownloads from "@/components/products/detail/ProductDownloads";
import { getCategoryBySlug } from "@/data/productCategories";
import { getProductDetailBySlug } from "@/lib/products/detail";

const FEATURED_CATEGORY_SLUG = "waterproofing-and-roof-protection";
const FEATURED_PRODUCT_SLUG = "roofex-pu-fiber";

export default async function FeaturedProduct() {
  const product = await getProductDetailBySlug(
    FEATURED_CATEGORY_SLUG,
    FEATURED_PRODUCT_SLUG,
  );

  if (!product) return null;

  const category = await getCategoryBySlug(product.categorySlug);
  const categoryTitle = category?.shortTitle ?? category?.title ?? "Products";
  const image = product.images[0];
  const productHref = `/products/${product.categorySlug}/${product.slug}`;

  return (
    <div id="product-detail">
      <div className="detail-wrap detail-wrap--featured">
        <div className="detail-image">
          {image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.url}
              alt={image.alt || product.name}
              className="detail-image-cover"
            />
          ) : (
            <div className="img-ph detail-image-ph">
              <div className="img-ph-label">Product Image</div>
            </div>
          )}
        </div>

        <div className="detail-info">
          <Link href={productHref} className="di-cat">
            {categoryTitle}
          </Link>
          <Link href={productHref} className="di-name block">
            {product.name}
          </Link>
          <p className="di-desc">{product.description}</p>

          {product.features.length > 0 && (
            <div className="di-features">
              {product.features.map((feat) => (
                <div className="di-feat-item" key={feat}>
                  {feat}
                </div>
              ))}
            </div>
          )}

          {product.specifications.length > 0 && (
            <div className="di-specs">
              {product.specifications.map(({ key, value }) => (
                <div className="di-spec-row" key={key}>
                  <span className="di-spec-key">{key}</span>
                  <span className="di-spec-val">{value}</span>
                </div>
              ))}
            </div>
          )}

          {product.applicationAreas.length > 0 && (
            <div className="di-area-row">
              {product.applicationAreas.map((area) => (
                <span className="di-area-tag" key={area}>
                  {area}
                </span>
              ))}
            </div>
          )}

          {product.downloads.length > 0 ? (
            <ProductDownloads downloads={product.downloads} variant="compact" />
          ) : (
            <div className="detail-downloads-compact">
              <p className="detail-downloads-compact-label">Downloads</p>
              <div className="detail-downloads-compact-list">
                <a href="/technical-data-sheets" className="detail-download-chip">
                  TDS PDF
                </a>
                <a href="#resources" className="detail-download-chip">
                  SDS PDF
                </a>
                <a href="#resources" className="detail-download-chip">
                  Application Guide
                </a>
              </div>
            </div>
          )}

          <ProductCTA product={product} />
        </div>
      </div>
    </div>
  );
}
