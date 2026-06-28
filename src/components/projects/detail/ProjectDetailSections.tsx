import Link from "next/link";
import type { ProjectDetail } from "@/types/project";

type ProjectDetailSectionsProps = {
  project: ProjectDetail;
};

export default function ProjectDetailSections({ project }: ProjectDetailSectionsProps) {
  return (
    <>
      <p id="description" className="di-desc scroll-mt-32">
        {project.description}
      </p>

      {project.productsUsed.length > 0 && (
        <section id="products" className="scroll-mt-32">
          <p className="di-section-label">Products used</p>
          <div className="di-features">
            {project.productsUsed.map((product) => (
              <div className="di-feat-item" key={`${product.categorySlug}-${product.slug}`}>
                {product.categorySlug ? (
                  <Link
                    href={`/products/${product.categorySlug}/${product.slug}`}
                    className="project-detail-link"
                  >
                    {product.name}
                  </Link>
                ) : (
                  product.name
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {project.certifications.length > 0 && (
        <section id="certifications" className="scroll-mt-32">
          <p className="di-section-label">Certifications met</p>
          <div className="di-specs">
            {project.certifications.map((cert) => (
              <div className="di-spec-row" key={cert.id}>
                <span className="di-spec-key">{cert.abbr}</span>
                <span className="di-spec-val">{cert.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.clientRef && (
        <section id="client" className="di-specs scroll-mt-32">
          <p className="di-section-label">Client reference</p>
          <div className="di-spec-row">
            <span className="di-spec-key">Consultant / client</span>
            <span className="di-spec-val">{project.clientRef}</span>
          </div>
        </section>
      )}
    </>
  );
}
