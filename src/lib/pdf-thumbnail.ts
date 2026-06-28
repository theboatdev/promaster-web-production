/**
 * Renders the first page of a PDF to a JPEG data URL (client-side only).
 */
export async function renderPdfThumbnailDataUrl(
  pdfUrl: string,
  scale = 0.6,
): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    const pdfjs = await import("pdfjs-dist");

    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    }

    const pdf = await pdfjs.getDocument({ url: pdfUrl }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return null;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL("image/jpeg", 0.88);
  } catch (error) {
    console.warn("PDF thumbnail render failed:", error);
    return null;
  }
}
