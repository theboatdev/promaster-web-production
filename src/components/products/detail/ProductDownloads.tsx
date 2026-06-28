import type { ProductDownload } from "@/types/product";

type ProductDownloadsProps = {
  downloads: ProductDownload[];
  variant?: "compact" | "panel";
};

export default function ProductDownloads({
  downloads,
  variant = "panel",
}: ProductDownloadsProps) {
  if (downloads.length === 0) return null;

  if (variant === "compact") {
    return (
      <div id="downloads" className="detail-downloads-compact scroll-mt-32">
        <p className="detail-downloads-compact-label">Downloads</p>
        <div className="detail-downloads-compact-list">
          {downloads.map((download) => (
            <a
              key={download.id}
              href={download.url}
              className="detail-download-chip"
              download
              title={
                download.fileSize
                  ? `${download.label} (${download.fileSize})`
                  : download.label
              }
            >
              {download.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="downloads" className="detail-panel detail-panel--downloads scroll-mt-32">
      <header className="detail-panel-head">
        <p className="detail-panel-eyebrow">Resources</p>
        <h2 className="detail-panel-title">Downloads</h2>
      </header>
      <div className="detail-download-grid">
        {downloads.map((download) => (
          <a
            key={download.id}
            href={download.url}
            className="detail-download-card"
            download
            title={
              download.fileSize
                ? `${download.label} (${download.fileSize})`
                : download.label
            }
          >
            <span className="detail-download-type">{download.type}</span>
            <span className="detail-download-label">{download.label}</span>
            {download.fileSize && (
              <span className="detail-download-size">{download.fileSize}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
