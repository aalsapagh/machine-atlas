import type { MachineComponent } from "../../types/machine";
import { statusColor, statusLabel } from "../../utils/machineHelpers";

export function OverviewTab({ component }: { component: MachineComponent }) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <Section title="Description">
        <p className="text-industrial-text">{component.description}</p>
      </Section>
      <Section title="Function">
        <p className="text-industrial-text">{component.function}</p>
      </Section>
      <Section title="Location">
        <p className="text-industrial-text">{component.location}</p>
      </Section>
      <Section title="Current Status">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor[component.status] }} />
          <span className="font-medium text-industrial-text">{statusLabel[component.status]}</span>
        </div>
      </Section>
      {component.sensorIds.length > 0 && (
        <Section title="Linked Sensors">
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
