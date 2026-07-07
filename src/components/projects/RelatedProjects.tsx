import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

export default function RelatedProjects({
  projects,
  currentId,
}: {
  projects: Project[];
  currentId: number;
}) {
  const related = projects.filter((p) => p.id !== currentId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-8 glow-text-subtle">Other Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
