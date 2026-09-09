import { useRef, useEffect } from "react";
import { Cog, Car, Anchor, CheckCircle2 } from "lucide-react";
import { useMachineStore } from "../../store/machineStore";
import { machineRegistry } from "../../data/machineRegistry";
import type { MachineDefinition } from "../../types/machine";
import { useTranslation } from "../../i18n/useTranslation";
import { getLocalizedMachineInfo } from "../../i18n/machineTranslationsAr";

// Group machines into display categories
const INDUSTRIAL_IDS = ["p-101", "ac-301", "gen-401", "conv-501"];
const VEHICLE_IDS = ["mc-701", "car-801", "tri-901", "trk-1001"];
const MARINE_IDS = [] as string[];

function groupRegistry(): { label: string; icon: React.ReactNode; machines: MachineDefinition[] }[] {
  const industrial = machineRegistry.filter((m) => INDUSTRIAL_IDS.includes(m.info.id));
  const vehicles = machineRegistry.filter((m) => VEHICLE_IDS.includes(m.info.id));
  const marine = machineRegistry.filter((m) => MARINE_IDS.includes(m.info.id));
  const others = machineRegistry.filter(
    (m) => !INDUSTRIAL_IDS.includes(m.info.id) && !VEHICLE_IDS.includes(m.info.id) && !MARINE_IDS.includes(m.info.id)
  );
  if (others.length > 0) vehicles.push(...others);
  return [
    { label: "industrial", icon: <Cog size={12} />, machines: industrial },
    { label: "vehicles", icon: <Car size={12} />, machines: vehicles },
    ...(marine.length > 0 ? [{ label: "marine", icon: <Anchor size={12} />, machines: marine }] : []),
  ];
}

const statusDot: Record<string, string> = {
  Operational: "bg-industrial-healthy",
  Degraded: "bg-industrial-warning",
  Shutdown: "bg-industrial-critical",
};

interface Props {
  onClose: () => void;
}

export function MachineSelector({ onClose }: Props) {
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const setSelectedMachine = useMachineStore((s) => s.setSelectedMachine);
  const { t, language } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const groups = groupRegistry();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-lg border border-industrial-border bg-industrial-panel shadow-2xl"
    >
      <div className="border-b border-industrial-border px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-industrial-muted">
        {t("selectMachine")}
      </div>
      <div className="max-h-[480px] overflow-y-auto">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-1.5 px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-industrial-muted">
              {group.icon}
              {t(group.label as "industrial" | "vehicles" | "marine")}
            </div>
            {group.machines.map((machine) => {
              const isActive = machine.info.id === selectedMachineId;
              return (
                <button
                  key={machine.info.id}
                  onClick={() => {
                    setSelectedMachine(machine.info.id);
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-industrial-accent/15 text-industrial-accent"
                      : "text-industrial-text hover:bg-industrial-panel-alt"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">
                        {getLocalizedMachineInfo(machine.info.id, language)?.name ?? machine.info.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-industrial-muted">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[machine.info.status] ?? "bg-industrial-muted"}`}
                      />
                      <span>{machine.info.tag}</span>
                      <span>·</span>
                      <span>{machine.info.overallHealth}%</span>
                    </div>
                  </div>
                  {isActive && <CheckCircle2 size={14} className="shrink-0 text-industrial-accent" />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
