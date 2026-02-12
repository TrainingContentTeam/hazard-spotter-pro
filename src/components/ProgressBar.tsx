interface ProgressBarProps {
  found: number;
  total: number;
  label: string;
}

export default function ProgressBar({ found, total, label }: ProgressBarProps) {
  const pct = total ? (found / total) * 100 : 0;
  const isDone = found === total;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5 text-sm">
        <span className="text-foreground">
          {found} / {total} {label}
        </span>
        {isDone && (
          <span className="text-success font-bold">✅ Complete!</span>
        )}
      </div>
      <div className="w-full h-3 bg-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${isDone ? "bg-success" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
