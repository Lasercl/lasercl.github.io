interface SkillBarProps {
  name: string;
  level: string;
  percent: number;
}

export default function SkillBar({ name, level, percent }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-primary">{level}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-purple-600 to-primary h-2.5 rounded-full shadow-[0_0_10px_#6d28d9]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
