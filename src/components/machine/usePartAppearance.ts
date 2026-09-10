import { useMachineStore } from "../../store/machineStore";
import { statusColor } from "../../utils/machineHelpers";
import { categoryBaseColor } from "./categoryColors";
import type { MachineComponent } from "../../types/machine";

export function usePartAppearance(component: MachineComponent) {
  const selectedComponentId  = useMachineStore((s) => s.selectedComponentId);
  const hoveredComponentId   = useMachineStore((s) => s.hoveredComponentId);
  const isolatedComponentId  = useMachineStore((s) => s.isolatedComponentId);

  const isSelected = selectedComponentId === component.id;
  const isHovered  = hoveredComponentId  === component.id;
  const isFaded    = isolatedComponentId !== null && isolatedComponentId !== component.id;

  const baseColor = categoryBaseColor[component.category];

  // White emissive for selection (clearly visible on blue paint).
  // Soft blue-white for hover.
  const emissiveColor     = isSelected ? "#ffffff" : isHovered ? "#a0c4ff" : "#000000";
  const emissiveIntensity = isSelected ? 0.38      : isHovered ? 0.18      : 0;

  const opacity     = isFaded ? 0.10 : 1;
  const healthColor = statusColor[component.status];

  return {
    baseColor,
    emissiveColor,
    emissiveIntensity,
    opacity,
    isSelected,
    isHovered,
    isFaded,
    healthColor,
  };
}
