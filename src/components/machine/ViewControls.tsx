import { useMachineStore } from "../../store/machineStore";
import type { CameraView } from "../../types/machine";

const VIEWS: { id: CameraView; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "front", label: "Front" },
  { id: "side", label: "Side" },
  { id: "top", label: "Top" },
];

export function ViewControls() {
  const cameraView = useMachineStore((s) => s.cameraView);
  const setCameraView = useMachineStore((s) => s.setCameraView);

  return (
    <div className="pointer-events-auto absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-lg border border-industrial-border bg-industrial-panel/95 p-1 shadow-xl backdrop-blur-sm">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          onClick={() => setCameraView(v.id)}
          aria-pressed={cameraView === v.id}
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            cameraView === v.id ? "bg-industrial-accent/20 text-industrial-accent" : "text-industrial-muted hover:text-industrial-text"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
