import type { ProjectDetail } from "@/types/project";

type ProjectDetailMetaProps = {
  project: ProjectDetail;
};

export default function ProjectDetailMeta({ project }: ProjectDetailMetaProps) {
  const metaParts = [
    project.projectType,
    project.location,
    project.year > 0 ? String(project.year) : "",
  ].filter(Boolean);

  return (
    <>
      <p className="di-cat">{metaParts.join(" · ")}</p>
      <h1 className="di-name">{project.name}</h1>
      {project.tags.length > 0 && (
        <div className="di-area-row">
          {project.tags.map((tag) => (
            <span className="di-area-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
