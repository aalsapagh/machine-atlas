import { useMemo } from "react";
import { useMachineStore, ALL_LAYERS } from "../../store/machineStore";
import { getActiveMachineComponents } from "../../data/machineRegistry";
import { statusColor } from "../../utils/machineHelpers";
import { useTranslation } from "../../i18n/useTranslation";
import type { ComponentCategory } from "../../types/machine";

export function Sidebar({ collapsed, onSelectAny }: { collapsed?: boolean; onSelectAny?: () => void }) {
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const selectComponent = useMachineStore((s) => s.selectComponent);
  const visibleLayers = useMachineStore((s) => s.visibleLayers);
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const { t } = useTranslation();

  const components = getActiveMachineComponents(selectedMachineId);

  const grouped = useMemo(() => {
    const map = new Map<ComponentCategory, typeof components>();
    for (const cat of ALL_LAYERS) map.set(cat, []);
    for (const c of components) {
      map.get(c.category)?.push(c);
    }
    return map;
  }, [components]);

  const categoryTranslation: Record<ComponentCategory, string> = {
    Mechanical: t("categoryMechanical"),
    Electrical: t("categoryElectrical"),
    Instrumentation: t("categoryInstrumentation"),
    Piping: t("categoryPiping"),
    Foundation: t("categoryFoundation"),
    Drivetrain: t("categoryDrivetrain"),
    Braking: t("categoryBraking"),
    Suspension: t("categorySuspension"),
    Body: t("categoryBody"),
    "Fuel System": t("categoryFuelSystem"),
  };

  if (collapsed) return null;

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-industrial-border bg-industrial-panel">
      <div className="border-b border-industrial-border px-3 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-industrial-muted">{t("components")}</span>
      </div>
      <button
        onClick={() => {
          selectComponent(null);
          onSelectAny?.();
        }}
        className={`mx-2 mt-2 rounded-md px-2.5 py-1.5 text-left text-sm ${
          selectedComponentId === null ? "bg-industrial-accent/15 text-industrial-accent" : "text-industrial-muted hover:bg-industrial-panel-alt"
        }`}
      >
        {t("allComponents")}
      </button>
      <nav className="flex flex-1 flex-col gap-3 px-2 py-3">
        {ALL_LAYERS.map((category) => {
          const items = grouped.get(category) ?? [];
          const dimmed = !visibleLayers.includes(category);
          if (items.length === 0) return null;
          return (
            <div key={category} className={dimmed ? "opacity-40" : ""}>
              <div className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-industrial-muted">
                {categoryTranslation[category]}
              </div>
              <div className="flex flex-col gap-0.5">
                {items.map((c) => {
                  const isSelected = selectedComponentId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        selectComponent(c.id);
                        onSelectAny?.();
                      }}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-industrial-accent/15 text-industrial-accent"
                          : "text-industrial-text hover:bg-industrial-panel-alt"
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: statusColor[c.status] }}
                        aria-hidden
                      />
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
