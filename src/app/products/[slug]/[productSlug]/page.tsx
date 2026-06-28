import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/products/detail/ProductGallery";
import ProductDetailBody from "@/components/products/detail/ProductDetailBody";
import ProductDownloads from "@/components/products/detail/ProductDownloads";
import ProductCTA from "@/components/products/detail/ProductCTA";
import RelatedProducts from "@/components/products/detail/RelatedProducts";
import { getCategoryBySlug } from "@/data/productCategories";
import {
  getAllProductParams,
  getProductDetailBySlug,
  getRelatedProducts,
} from "@/lib/products/detail";

type ProductPageProps = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export async function generateStaticParams() {
  return getAllProductParams();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const product = await getProductDetailBySlug(slug, productSlug);

  if (!product) {
    return { title: "Product Not Found | Pro Master" };
  }

  return {
    title: `${product.name} | Pro Master Construction Products`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const [category, product] = await Promise.all([
    getCategoryBySlug(slug),
    getProductDetailBySlug(slug, productSlug),
  ]);

  if (!category || !product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <>
      <Header />

      <main className="page-main">
        {/* <ProductDetailTabs /> */}

        <div className="detail-hero">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="detail-info">
            <p className="di-cat">{category.title}</p>
            <h1 className="di-name">
              {product.name}
              <br />
              {product.sku}
            </h1>
            <p className="di-desc">{product.description}</p>
            <ProductDownloads downloads={product.downloads} variant="compact" />
            <ProductCTA product={product} />
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-body-inner">
            <ProductDetailBody product={product} />
          </div>
        </div>

        <RelatedProducts
          products={relatedProducts}
          categoryTitle={category.shortTitle ?? category.title}
        />
      </main>

      <Footer />
    </>
  );
}
