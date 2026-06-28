import type { ProductListItem } from "@/types/product";
import ProductCard from "@/components/products/listing/ProductCard";

type RelatedProductsProps = {
  products: ProductListItem[];
  categoryTitle: string;
};

export default function RelatedProducts({
  products,
  categoryTitle,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="related-products">
      <div className="related-products-inner">
        <header className="related-products-header">
          <p className="related-products-eyebrow">You may also like</p>
          <h2>Related Products</h2>
          <p className="related-products-desc">
            More from {categoryTitle} — explore similar systems for your project.
          </p>
        </header>

        <div className="related-products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
