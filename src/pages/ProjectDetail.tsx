import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { useLastPushDate } from "../hooks/useLastPushDate";
import ProjectLinks from "../components/projects/ProjectLinks";
import ImageZoomOverlay from "../components/projects/ImageZoomOverlay";
import RelatedProjects from "../components/projects/RelatedProjects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const project = projects.find((p) => p.id === Number(id));

  const lastPushDate = useLastPushDate(project?.apiLastDate ?? "");

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const clients = project.client.split(",").map((c) => c.trim());
  const categoryDisplay = project.category.replace(/,/g, " / ");
  const gallery = [project.path, project.path2, project.path3];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Cek Project ini",
          text: "Aku nemu sesuatu yang keren!",
          url: window.location.href,
        });
      } catch {
        // user cancelled share, nothing to do
      }
    } else {
      alert("Browser kamu belum mendukung Web Share API.");
    }
  };

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start mb-8 gap-4 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold glow-text-subtle">{project.title}</h1>
          <button
            onClick={handleShare}
            className="glass px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
          >
            <i className="fa-solid fa-share-nodes mr-2" />
            Share
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setZoomSrc(src)}
              className="glass-card overflow-hidden aspect-video"
            >
              <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 mb-10">
          <p className="text-gray-300 leading-relaxed mb-8">{project.details}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-2">Client</h3>
              <ul className="text-gray-300 space-y-1">
                {clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-2">Category</h3>
              <p className="text-gray-300">{categoryDisplay}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-2">Objective</h3>
              <p className="text-gray-300">{project.objective}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-2">Tools</h3>
              <p className="text-gray-300">{project.tools}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-2">Last Updated</h3>
              <p className="text-gray-300">{lastPushDate}</p>
            </div>
          </div>

          <ProjectLinks project={project} />
        </div>

        <RelatedProjects projects={projects} currentId={project.id} />
      </div>

      <ImageZoomOverlay src={zoomSrc} onClose={() => setZoomSrc(null)} />
    </section>
  );
}
