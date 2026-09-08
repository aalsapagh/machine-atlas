import { useMemo } from "react";
import { X, Activity, AlertCircle, Wrench, CalendarClock } from "lucide-react";
import { machineComponents, machineInfo } from "../../data/machineData";
import { useMachineStore } from "../../store/machineStore";
import { daysUntil, formatDate, overallHealthFromComponents } from "../../utils/machineHelpers";

export function DashboardPanel() {
  const dashboardOpen = useMachineStore((s) => s.dashboardOpen);
  const toggleDashboard = useMachineStore((s) => s.toggleDashboard);
  const selectComponent = useMachineStore((s) => s.selectComponent);

  const stats = useMemo(() => {
    const health = overallHealthFromComponents(machineComponents);
    const warnings = machineComponents.filter((c) => c.status !== "healthy");
    const dueSoon = machineComponents.filter((c) => daysUntil(c.nextMaintenanceDate) <= 14);
    const lastMaintenance = machineComponents
      .map((c) => c.lastMaintenanceDate)
      .sort()
      .at(-1);
    const nextMaintenance = machineComponents
      .map((c) => ({ id: c.id, name: c.name, date: c.nextMaintenanceDate }))
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    return { health, warnings, dueSoon, lastMaintenance, nextMaintenance };
  }, []);

  if (!dashboardOpen) return null;

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-20 w-72 rounded-lg border border-industrial-border bg-industrial-panel/95 p-3.5 shadow-2xl backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold text-industrial-muted">{machineInfo.tag}</div>
          <div className="text-sm font-medium text-industrial-text">{machineInfo.status}</div>
        </div>
        <button onClick={toggleDashboard} aria-label="Close dashboard" className="rounded p-1 text-industrial-muted hover:bg-industrial-panel-alt hover:text-industrial-text">
          <X size={14} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#2e3338" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray={`${(stats.health / 100) * 97.4} 97.4`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-semibold text-industrial-text">{stats.health}%</span>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-industrial-muted">Overall Health</div>
          <div className="text-xs text-industrial-muted">Weighted across {machineComponents.length} components</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <MetricCard
          icon={<Wrench size={13} />}
          label="Maintenance Due"
          value={`${stats.dueSoon.length} Components`}
          tone={stats.dueSoon.length > 0 ? "warning" : "default"}
        />
        <MetricCard
          icon={<AlertCircle size={13} />}
          label="Active Warnings"
          value={String(stats.warnings.length)}
          tone={stats.warnings.length > 0 ? "critical" : "default"}
        />
        <MetricCard icon={<Activity size={13} />} label="Last Maintenance" value={stats.lastMaintenance ? formatDate(stats.lastMaintenance) : "—"} />
        <MetricCard
          icon={<CalendarClock size={13} />}
          label="Next Maintenance"
          value={stats.nextMaintenance ? formatDate(stats.nextMaintenance.date) : "—"}
          onClick={() => stats.nextMaintenance && selectComponent(stats.nextMaintenance.id)}
        />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  tone = "default",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "warning" | "critical";
  onClick?: () => void;
}) {
  const toneClass =
    tone === "critical" ? "text-industrial-critical" : tone === "warning" ? "text-industrial-warning" : "text-industrial-text";
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`flex flex-col gap-1 rounded-md border border-industrial-border bg-industrial-panel-alt p-2 text-left ${onClick ? "hover:border-industrial-accent/50" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-industrial-muted">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <div className={`font-medium ${toneClass}`}>{value}</div>
    </Comp>
  );
}
