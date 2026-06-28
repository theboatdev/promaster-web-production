import Link from "next/link";
import type { ProjectListItem } from "@/types/project";
import { buildContactUrl, buildWhatsAppUrl } from "@/lib/projects/detail";

type ProjectCTAProps = {
  project: ProjectListItem;
};

export default function ProjectCTA({ project }: ProjectCTAProps) {
  return (
    <div id="contact" className="di-actions scroll-mt-32">
      <Link href={buildContactUrl(project)} className="di-btn-primary">
        Contact for details
      </Link>
      <a
        href={buildWhatsAppUrl(project)}
        target="_blank"
        rel="noopener noreferrer"
        className="di-btn-secondary"
      >
        WhatsApp Inquiry
      </a>
    </div>
  );
}
