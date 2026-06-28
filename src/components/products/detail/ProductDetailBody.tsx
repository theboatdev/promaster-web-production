import type { ProductDetail } from "@/types/product";

type ProductDetailBodyProps = {
  product: ProductDetail;
};

export default function ProductDetailBody({ product }: ProductDetailBodyProps) {
  const hasFeatures = product.features.length > 0;
  const hasSpecs = product.specifications.length > 0;
  const hasApplication = product.applicationAreas.length > 0;
  return (
    <div className="detail-body-layout">
      {(hasFeatures || hasApplication) && (
        <div
          className={`detail-body-split${hasFeatures && hasApplication ? "" : " detail-body-split--single"}`}
        >
          {hasFeatures && (
            <section id="overview" className="detail-panel detail-panel--features scroll-mt-32">
              <header className="detail-panel-head">
                <p className="detail-panel-eyebrow">Overview</p>
                <h2 className="detail-panel-title">Key Features</h2>
              </header>
              <ul className="detail-feature-grid">
                {product.features.map((feature) => (
                  <li className="detail-feature-card" key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasApplication && (
            <section id="application" className="detail-panel detail-panel--application scroll-mt-32">
              <header className="detail-panel-head">
                <p className="detail-panel-eyebrow">Use Cases</p>
                <h2 className="detail-panel-title">Application Areas</h2>
              </header>
              <ul className="detail-application-grid">
                {product.applicationAreas.map((area) => (
                  <li className="detail-application-card" key={area}>
                    {area}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {hasSpecs && (
        <section id="specs" className="detail-panel detail-panel--specs scroll-mt-32">
          <header className="detail-panel-head">
            <p className="detail-panel-eyebrow">Technical</p>
            <h2 className="detail-panel-title">Specifications</h2>
          </header>
          <dl className="detail-spec-list">
            {product.specifications.map(({ key, value }) => (
              <div className="detail-spec-item" key={key}>
                <dt className="detail-spec-key">{key}</dt>
                <dd className="detail-spec-val">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
