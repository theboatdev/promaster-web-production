import type { ProductListItem } from "@/types/product";
import ProductCard from "@/components/products/listing/ProductCard";

type ProductGridProps = {
  products: ProductListItem[];
  totalItems: number;
};

export default function ProductGrid({
  products,
  totalItems,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <p className="mb-2 text-center font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
          No results
        </p>
        <p className="mx-auto max-w-sm text-center text-sm leading-[1.7] text-[var(--black)]">
          No products match your current search or filters. Try adjusting your
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 font-[family-name:var(--font)] text-[11px] uppercase tracking-[0.13em] text-[var(--black)]">
        Showing {products.length} of {totalItems} products
      </p>

      <div className="product-grid grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3 xl:gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
