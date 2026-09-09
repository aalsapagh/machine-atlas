import { AlertTriangle } from "lucide-react";
import type { MachineComponent } from "../../types/machine";
import { useTranslation } from "../../i18n/useTranslation";

const severityColor: Record<string, string> = {
  low: "text-industrial-healthy border-industrial-healthy/40 bg-industrial-healthy/10",
  medium: "text-industrial-warning border-industrial-warning/40 bg-industrial-warning/10",
  high: "text-industrial-critical border-industrial-critical/40 bg-industrial-critical/10",
};

export function FailureModesTab({ component }: { component: MachineComponent }) {
  const { t } = useTranslation();

  if (component.failureModes.length === 0) {
    return <p className="text-sm text-industrial-muted">{t("noFailureModes")}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {component.failureModes.map((fm, i) => (
        <div key={i} className="rounded-md border border-industrial-border bg-industrial-panel-alt p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-sm font-medium text-industrial-text">
              <AlertTriangle size={14} className="text-industrial-muted" />
              {fm.name}
            </div>
            <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${severityColor[fm.severity]}`}>
              {t(fm.severity as "low" | "medium" | "high")}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wide text-industrial-muted">{t("symptoms")}</div>
            <ul className="mt-1 list-inside list-disc text-xs text-industrial-text">
              {fm.symptoms.map((s, j) => (
                <li key={j}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wide text-industrial-muted">{t("recommendedAction")}</div>
            <p className="mt-1 text-xs text-industrial-text">{fm.recommendedAction}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
