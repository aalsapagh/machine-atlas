import { useMemo } from "react";
import { MachinePart } from "./MachinePart";
import { useMachineStore } from "../../store/machineStore";
import { getActiveMachineComponents } from "../../data/machineRegistry";
import { usePartAppearance } from "./usePartAppearance";
import type { MachineComponent } from "../../types/machine";

// ─── Per-component mesh with physical material ────────────────────────────────

function GenericPart({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);
  const [sx, sy, sz] = component.size;

  return (
    <MachinePart component={component}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[sx, sy, sz]} />
        <meshPhysicalMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.40}
          metalness={0.35}
          clearcoat={0.85}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {/* Thin dark edge seam – visually separates stacked/touching parts */}
      <lineSegments renderOrder={1}>
        <edgesGeometry args={[{ width: sx * 1.002, height: sy * 1.002, depth: sz * 1.002 } as never]} />
        <lineBasicMaterial color="#0a0f16" transparent opacity={0.25} />
      </lineSegments>
    </MachinePart>
  );
}

// ─── Assembly group ───────────────────────────────────────────────────────────

export function GenericMachineAssembly(_props: { machineId: string }) {
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const components = useMemo(
    () => getActiveMachineComponents(selectedMachineId),
    [selectedMachineId]
  );

  return (
    <group>
      {components.map((c) => (
        <GenericPart key={c.id} component={c} />
      ))}
    </group>
  );
}
