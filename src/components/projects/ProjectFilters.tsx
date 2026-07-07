interface ProjectFiltersProps {
  categories: string[];
  category: string;
  query: string;
  onCategoryChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export default function ProjectFilters({
  categories,
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-12">
      <input
        id="query"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search projects..."
        className="flex-1 px-5 py-3 rounded-full glass text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        id="projects"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-5 py-3 rounded-full glass text-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="" className="text-black">
          All Projects
        </option>
        {categories.map((c) => (
          <option key={c} value={c.toLowerCase()} className="text-black">
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
