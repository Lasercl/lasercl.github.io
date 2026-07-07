import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-gray-400 text-center py-16">No projects match your search.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
