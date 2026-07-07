import type { Project } from "../../types/project";

const linkClass =
  "px-4 sm:px-6 py-2 bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary rounded-full transition-colors duration-300";

export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.demoLink && (
        <a href={project.demoLink} target="_blank" rel="noreferrer" aria-label="Demo Project" className={linkClass}>
          Demo
        </a>
      )}
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noreferrer" aria-label="GitHub Project" className={linkClass}>
          GitHub
        </a>
      )}
      {project.prototypeLink && (
        <a
          href={project.prototypeLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Prototype Project"
          className={linkClass}
        >
          Prototype
        </a>
      )}
    </div>
  );
}
