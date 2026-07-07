interface TimelineItemProps {
  title: string;
  subtitle: string;
  description?: string;
  variant?: "glass" | "plain";
}

export default function TimelineItem({ title, subtitle, description, variant = "plain" }: TimelineItemProps) {
  if (variant === "glass") {
    return (
      <div className="glass-card p-6 group">
        <h4 className="text-xl font-medium text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-purple-300 text-sm mb-3">{subtitle}</p>
        {description && <p className="text-gray-400">{description}</p>}
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l-2 border-primary/50">
      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_#6d28d9]" />
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
}
