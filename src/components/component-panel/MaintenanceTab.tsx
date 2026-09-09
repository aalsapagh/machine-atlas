import { CheckSquare, Clock } from "lucide-react";
import type { MachineComponent } from "../../types/machine";
import { formatDate, daysUntil } from "../../utils/machineHelpers";
import { Section } from "./OverviewTab";
import { useTranslation } from "../../i18n/useTranslation";

export function MaintenanceTab({ component }: { component: MachineComponent }) {
  const { t } = useTranslation();
  const remaining = daysUntil(component.nextMaintenanceDate);
  const overdue = remaining < 0;

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="grid grid-cols-2 gap-2">
        <StatBox label={t("lastMaintenance")} value={formatDate(component.lastMaintenanceDate)} />
        <StatBox label={t("nextMaintenance")} value={formatDate(component.nextMaintenanceDate)} />
        <StatBox label={t("interval")} value={`${component.maintenanceIntervalDays} ${t("days")}`} />
        <StatBox
          label={t("dueIn")}
          value={overdue ? `${Math.abs(remaining)}d ${t("overdue")}` : `${remaining} ${t("days")}`}
        />
      </div>

      <Section title={t("maintenanceChecklist")}>
        <ul className="flex flex-col gap-1.5">
          {component.maintenanceChecklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-industrial-text">
              <CheckSquare size={14} className="mt-0.5 shrink-0 text-industrial-muted" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("maintenanceHistory")}>
        <ul className="flex flex-col gap-2">
          {component.maintenanceHistory.map((entry, i) => (
            <li key={i} className="rounded-md border border-industrial-border bg-industrial-panel-alt p-2">
              <div className="flex items-center gap-1.5 text-xs text-industrial-muted">
                <Clock size={12} />
                {formatDate(entry.date)}
              </div>
              <p className="mt-1 text-sm text-industrial-text">{entry.action}</p>
              <p className="mt-0.5 text-xs text-industrial-muted">
                {entry.technician}
                {entry.notes ? ` — ${entry.notes}` : ""}
              </p>
            </li>
          ))}
          {component.maintenanceHistory.length === 0 && (
            <li className="text-xs text-industrial-muted">{t("noMaintenanceHistory")}</li>
          )}
        </ul>
      </Section>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-industrial-border bg-industrial-panel-alt p-2">
      <div className="text-[10px] uppercase tracking-wide text-industrial-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-industrial-text">{value}</div>
    </div>
  );
}
