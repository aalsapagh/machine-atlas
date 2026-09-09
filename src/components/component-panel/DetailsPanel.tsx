import { X, MapPin, Wrench } from "lucide-react";
import { useMachineStore } from "../../store/machineStore";
import { getComponentFromMachine } from "../../data/machineRegistry";
import { statusColor, statusLabel } from "../../utils/machineHelpers";
import { OverviewTab } from "./OverviewTab";
import { MaintenanceTab } from "./MaintenanceTab";
import { FailureModesTab } from "./FailureModesTab";
import { SparePartsTab } from "./SparePartsTab";
import { useTranslation } from "../../i18n/useTranslation";
import { useLocalizedComponent } from "../../i18n/useLocalizedComponent";
import type { ActivePanel } from "../../types/machine";

export function DetailsPanel({ onClose }: { onClose?: () => void }) {
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const selectComponent = useMachineStore((s) => s.selectComponent);
  const isolateComponent = useMachineStore((s) => s.isolateComponent);
  const isolatedComponentId = useMachineStore((s) => s.isolatedComponentId);
  const exitIsolation = useMachineStore((s) => s.exitIsolation);
  const activePanel = useMachineStore((s) => s.activePanel);
  const setActivePanel = useMachineStore((s) => s.setActivePanel);
  const { t } = useTranslation();

  const rawComponent = getComponentFromMachine(selectedMachineId, selectedComponentId);
  const component = useLocalizedComponent(rawComponent ?? ({} as never), selectedMachineId ?? "");

  const TABS: { id: ActivePanel; label: string }[] = [
    { id: "overview", label: t("overview") },
    { id: "maintenance", label: t("maintenance") },
    { id: "failure-modes", label: t("failureModes") },
    { id: "spare-parts", label: t("spareParts") },
  ];

  if (!rawComponent) {
    return (
      <aside className="hidden h-full w-80 shrink-0 flex-col border-l border-industrial-border bg-industrial-panel p-6 text-sm text-industrial-muted lg:flex">
        <p>Select a component in the 3D viewport or the component tree to see its details.</p>
      </aside>
    );
  }

  const isIsolated = isolatedComponentId === component.id;

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-industrial-border bg-industrial-panel">
      <div className="flex items-start justify-between gap-2 border-b border-industrial-border px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: statusColor[component.status] }}
              aria-hidden
            />
            <h2 className="text-sm font-semibold text-industrial-text">{component.name}</h2>
          </div>
          <p className="mt-1 text-xs text-industrial-muted">
            {component.category} · {statusLabel[component.status]}
          </p>
        </div>
        <button
          onClick={() => {
            selectComponent(null);
            onClose?.();
          }}
          aria-label="Close details panel"
          className="rounded p-1 text-industrial-muted hover:bg-industrial-panel-alt hover:text-industrial-text"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 border-b border-industrial-border px-3 py-2">
        <div className="flex items-center gap-1.5 text-xs text-industrial-muted">
          <MapPin size={13} />
          <span className="truncate">{component.location}</span>
        </div>
      </div>

      <div className="flex gap-1 border-b border-industrial-border px-2 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`rounded-t-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              activePanel === tab.id
                ? "border-b-2 border-industrial-accent text-industrial-accent"
                : "text-industrial-muted hover:text-industrial-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {activePanel === "overview" && <OverviewTab component={component} />}
        {activePanel === "maintenance" && <MaintenanceTab component={component} />}
        {activePanel === "failure-modes" && <FailureModesTab component={component} />}
        {activePanel === "spare-parts" && <SparePartsTab component={component} />}
      </div>

      <div className="flex gap-2 border-t border-industrial-border p-3">
        {isIsolated ? (
          <button
            onClick={exitIsolation}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-industrial-accent/60 bg-industrial-accent/15 py-1.5 text-xs font-medium text-industrial-accent"
          >
            {t("exitIsolation")}
          </button>
        ) : (
          <button
            onClick={() => isolateComponent(component.id)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-industrial-border bg-industrial-panel-alt py-1.5 text-xs font-medium text-industrial-text hover:border-industrial-accent/50"
          >
            {t("isolate")}
          </button>
        )}
        <button
          onClick={() => setActivePanel("maintenance")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-industrial-border bg-industrial-panel-alt py-1.5 text-xs font-medium text-industrial-text hover:border-industrial-accent/50"
        >
          <Wrench size={13} />
          {t("maintenance")}
        </button>
      </div>
    </aside>
  );
}
