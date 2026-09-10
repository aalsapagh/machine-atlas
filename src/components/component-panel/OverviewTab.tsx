import type { MachineComponent } from "../../types/machine";
import { useTranslation } from "../../i18n/useTranslation";

export function OverviewTab({ component }: { component: MachineComponent }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 text-sm">
      <Section title={t("description")}>
        <p className="text-industrial-text">{component.description}</p>
      </Section>
      <Section title={t("function")}>
        <p className="text-industrial-text">{component.function}</p>
      </Section>
      <Section title={t("location")}>
        <p className="text-industrial-text">{component.location}</p>
      </Section>
{component.sensorIds.length > 0 && (
        <Section title={t("linkedSensors")}>
          <div className="flex flex-wrap gap-1.5">
            {component.sensorIds.map((id) => (
              <span key={id} className="rounded border border-industrial-border bg-industrial-panel-alt px-1.5 py-0.5 font-mono text-[11px] text-industrial-muted">
                {id}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-industrial-muted">{title}</h3>
      {children}
    </div>
  );
}
