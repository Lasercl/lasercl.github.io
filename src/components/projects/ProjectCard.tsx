import { Link } from "react-router-dom";
import type { Project } from "../../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="glass-card group overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="h-48 overflow-hidden relative bg-black/50 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-300" />
        <img
          src={project.path}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 flex-1 line-clamp-3">{project.details}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.category.split(",").map((c) => (
            <span
              key={c}
              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-purple-300"
            >
              {c.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
