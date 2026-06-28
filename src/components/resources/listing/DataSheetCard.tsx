import Link from "next/link";
import type { ReactNode } from "react";
import type { DataSheetListItem } from "@/types/resource";
import DataSheetPreview from "@/components/resources/listing/DataSheetPreview";

type DataSheetCardProps = {
  dataSheet: DataSheetListItem;
};

function DocumentLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      title="Open data sheet in a new tab"
    >
      {children}
    </a>
  );
}

export default function DataSheetCard({ dataSheet }: DataSheetCardProps) {
  const { product } = dataSheet;
  const productHref = `/products/${product.categorySlug}/${product.slug}`;
  const fileUrl = dataSheet.fileUrl;

  const preview = <DataSheetPreview />;

  const titleContent = fileUrl ? (
    <DocumentLink href={fileUrl} className="data-sheet-card__title-link">
      {dataSheet.title}
    </DocumentLink>
  ) : (
    <span className="data-sheet-card__title-text">{dataSheet.title}</span>
  );

  return (
    <article className="data-sheet-card">
      {fileUrl ? (
        <DocumentLink href={fileUrl} className="data-sheet-card__preview-link">
          {preview}
        </DocumentLink>
      ) : (
        preview
      )}

      <div className="data-sheet-card__body">
        <p className="data-sheet-card__label">Technical Data Sheet</p>

        <h3 className="data-sheet-card__title">{titleContent}</h3>

        <p className="data-sheet-card__product">{product.name}</p>

        <div className="data-sheet-card__footer">
          <Link href={productHref} className="data-sheet-card__cta">
            View product &nbsp;&#8594;
          </Link>
        </div>
      </div>
    </article>
  );
}
