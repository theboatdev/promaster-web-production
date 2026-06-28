import Link from "next/link";
import type { ProjectListItem } from "@/types/project";
import { formatProjectIndex } from "@/lib/projects/listing";

type ProjectListProps = {
  projects: ProjectListItem[];
  totalItems: number;
  startIndex: number;
};

export default function ProjectList({
  projects,
  totalItems,
  startIndex,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="product-grid__empty">
        <p className="mb-2 text-center font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
          No results
        </p>
        <p className="mx-auto max-w-sm text-center text-sm leading-[1.7] text-[var(--black)]">
          No projects match your current search or filters. Try adjusting your
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 font-[family-name:var(--font)] text-[11px] uppercase tracking-[0.13em] text-[var(--black)]">
        Showing {projects.length} of {totalItems} projects
      </p>

      <div className="proj-list proj-list--page">
        {projects.map((project, index) => (
          <Link
            href={`/projects/${project.slug}`}
            className="proj-row proj-row--link"
            key={project.id}
          >
            <div>
              <div className="pr-index">
                {formatProjectIndex(startIndex + index + 1, project.location)}
              </div>
            </div>
            <div>
              <div className="pr-name">{project.name}</div>
              <div className="pr-tags">
                {project.tags.map((tag) => (
                  <span className="pr-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="pr-meta">
              <span className="pr-year">{project.year > 0 ? project.year : "—"}</span>
              <span className="pr-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
