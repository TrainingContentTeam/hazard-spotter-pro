import type { HotspotData } from "@/data/hotspots";

interface ChecklistProps {
  hotspots: HotspotData[];
  foundIds: Set<string>;
}

export default function Checklist({ hotspots, foundIds }: ChecklistProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {hotspots.map((h) => {
        const isFound = foundIds.has(h.id);
        return (
          <div
            key={h.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border min-h-[38px] transition-all duration-200
              ${isFound
                ? "bg-success-dim text-success border-success/30"
                : "bg-secondary/30 text-muted-foreground border-border"
              }`}
          >
            <span>{isFound ? "✓" : "○"}</span>
            <span className={isFound ? "" : "opacity-0"}>{h.label}</span>
          </div>
        );
      })}
    </div>
  );
}
