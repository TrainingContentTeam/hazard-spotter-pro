import { useState, useCallback, useRef, useEffect } from "react";
import type { HotspotData } from "@/data/hotspots";

interface TooltipState {
  label: string;
  desc: string;
  x: number;
  y: number;
}

interface HotspotImageProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: HotspotData[];
  foundIds: Set<string>;
  onFind: (id: string) => void;
  aspectClass?: string;
  containerClass?: string;
}

export default function HotspotImage({
  imageSrc,
  imageAlt,
  hotspots,
  foundIds,
  onFind,
  aspectClass = "aspect-[1920/800]",
  containerClass = "",
}: HotspotImageProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (h: HotspotData, e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!foundIds.has(h.id)) {
        onFind(h.id);
      }

      // Show tooltip near click position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltip({
        label: h.label,
        desc: h.desc,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setTooltip(null), 3500);
    },
    [foundIds, onFind]
  );

  // Adjust tooltip position to stay in viewport
  useEffect(() => {
    if (!tooltip || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const r = el.getBoundingClientRect();
    let left = tooltip.x;
    let top = tooltip.y - 10;

    left = Math.max(12 + r.width / 2, Math.min(window.innerWidth - 12 - r.width / 2, left));
    top = Math.max(12 + r.height, top);

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }, [tooltip]);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg border-2 border-border ${aspectClass} ${containerClass}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />

      {hotspots.map((h) => {
        const isFound = foundIds.has(h.id);
        return (
          <button
            key={h.id}
            onClick={(e) => handleClick(h, e)}
            onTouchStart={(e) => handleClick(h, e)}
            className={`absolute rounded-lg flex items-center justify-center font-extrabold text-xl transition-all duration-200 cursor-pointer select-none
              ${isFound
                ? "border-2 border-success bg-success-dim text-success"
                : "border-none bg-transparent text-transparent"
              }`}
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.w}%`,
              height: `${h.h}%`,
            }}
            aria-label={`Hotspot: ${h.label}`}
          >
            {isFound ? "✓" : "?"}
          </button>
        );
      })}

      {tooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] max-w-[340px] min-w-[180px] bg-card border border-primary/40 rounded-lg p-3 shadow-[0_8px_24px_rgba(0,0,0,0.55)] pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 10}px`,
            transform: "translate(-50%, -100%)",
            animation: "fadeIn 0.15s ease",
          }}
        >
          <div className="font-extrabold text-primary text-sm">{tooltip.label}</div>
          <div className="text-card-foreground text-xs mt-1.5 leading-relaxed">{tooltip.desc}</div>
        </div>
      )}
    </div>
  );
}
