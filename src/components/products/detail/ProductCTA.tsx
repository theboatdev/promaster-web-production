import Link from "next/link";
import type { ProductListItem } from "@/types/product";
import { buildQuoteUrl, buildWhatsAppUrl } from "@/lib/products/detail";

type ProductCTAProps = {
  product: ProductListItem;
};

export default function ProductCTA({ product }: ProductCTAProps) {
  return (
    <div id="inquiry" className="di-actions scroll-mt-32">
      <Link href={buildQuoteUrl(product)} className="di-btn-primary">
        Request a Quote
      </Link>
      <a
        href={buildWhatsAppUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="di-btn-secondary"
      >
        WhatsApp Inquiry
      </a>
    </div>
  );
}
