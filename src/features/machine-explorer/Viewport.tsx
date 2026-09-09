import { useMachineStore } from "../../store/machineStore";
import { PumpViewer3D } from "./PumpViewer3D";
import { MachineViewer2D } from "./MachineViewer2D";

/**
 * Viewport – routes to the appropriate viewer based on selected machine.
 *
 * p-101 (centrifugal pump):  realistic 3-D Canvas viewer (React Three Fiber)
 * All other machines:        interactive 2-D SVG schematic diagram
 */
export function Viewport() {
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);

  if (selectedMachineId === "p-101") {
    return <PumpViewer3D />;
  }

  return <MachineViewer2D />;
}
