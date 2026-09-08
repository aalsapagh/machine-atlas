import { Html } from "@react-three/drei";
import { useMachineStore } from "../../store/machineStore";
import { getComponentById } from "../../data/machineData";

export function HoverTooltip() {
  const hoveredComponentId = useMachineStore((s) => s.hoveredComponentId);
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const component = getComponentById(hoveredComponentId);

  if (!component || hoveredComponentId === selectedComponentId) return null;

  return (
    <Html position={component.position} center distanceFactor={8} style={{ pointerEvents: "none" }}>
      <div className="translate-y-[-2.2rem] whitespace-nowrap rounded-md border border-industrial-border bg-industrial-panel/95 px-2.5 py-1 text-xs font-medium text-industrial-text shadow-lg">
        {component.name}
      </div>
    </Html>
  );
}
