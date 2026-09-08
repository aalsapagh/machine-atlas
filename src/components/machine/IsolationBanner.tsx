import { Eye } from "lucide-react";
import { useMachineStore } from "../../store/machineStore";
import { getComponentById } from "../../data/machineData";

export function IsolationBanner() {
  const isolatedComponentId = useMachineStore((s) => s.isolatedComponentId);
  const exitIsolation = useMachineStore((s) => s.exitIsolation);
  const component = getComponentById(isolatedComponentId);

  if (!component) return null;

  return (
    <div className="pointer-events-auto absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-industrial-accent/50 bg-industrial-panel/95 px-3 py-1.5 text-xs shadow-xl backdrop-blur-sm">
      <Eye size={13} className="text-industrial-accent" />
      <span className="text-industrial-text">
        Isolated: <span className="font-medium">{component.name}</span>
      </span>
      <button onClick={exitIsolation} className="ml-1 rounded-full bg-industrial-accent/15 px-2 py-0.5 font-medium text-industrial-accent hover:bg-industrial-accent/25">
        Exit Isolation
      </button>
    </div>
  );
}
