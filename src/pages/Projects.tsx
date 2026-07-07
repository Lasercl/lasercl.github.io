import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectGrid from "../components/projects/ProjectGrid";

const categories = Array.from(
  new Set(projects.flatMap((p) => p.category.split(",").map((c) => c.trim())))
).sort();

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.toLowerCase();
    return projects.filter((p) => {
      const cats = p.category.toLowerCase().split(",").map((c) => c.trim());
      const matchesCategory = category === "" || cats.includes(category);
      const matchesQuery =
        keyword === "" ||
        p.title.toLowerCase().includes(keyword) ||
        p.details.toLowerCase().includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text-subtle">All Projects</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A collection of everything I've built, from static prototypes to full-stack and mobile
          applications.
        </p>

        <ProjectFilters
          categories={categories}
          category={category}
          query={query}
          onCategoryChange={setCategory}
          onQueryChange={setQuery}
        />

        <ProjectGrid projects={filtered} />
      </div>
    </section>
  );
}
