import { useMachineStore } from "../../store/machineStore";
import { PumpViewer3D } from "./PumpViewer3D";
import { GenericViewer3D } from "./GenericViewer3D";

/**
 * Viewport – routes to the appropriate 3-D viewer based on selected machine.
 *
 * p-101 (centrifugal pump):  bespoke realistic PumpAssembly with detailed parts
 * All other machines:        GenericMachineAssembly – MeshPhysicalMaterial boxes
 *                            with the same IBL/lighting/interaction pipeline
 */
export function Viewport() {
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);

  if (selectedMachineId === "p-101") {
    return <PumpViewer3D />;
  }

  return <GenericViewer3D />;
}
