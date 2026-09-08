import * as THREE from "three";
import { useMemo } from "react";
import { MachinePart } from "./MachinePart";
import { categoryBaseColor } from "./categoryColors";
import { useMachineStore } from "../../store/machineStore";
import { getActiveMachineComponents } from "../../data/machineRegistry";

export function GenericMachineAssembly(_props: { machineId: string }) {
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const components = useMemo(
    () => getActiveMachineComponents(selectedMachineId),
    [selectedMachineId]
  );

  return (
    <group>
      {components.map((component) => {
        const [sx, sy, sz] = component.size;
        const color = categoryBaseColor[component.category] ?? "#8b939c";

        return (
          <MachinePart key={component.id} component={component}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[sx, sy, sz]} />
              <meshStandardMaterial
                color={color}
                roughness={0.55}
                metalness={0.45}
              />
            </mesh>
            {/* thin highlight rim to visually separate stacked boxes */}
            <lineSegments>
              <edgesGeometry
                args={[new THREE.BoxGeometry(sx * 1.002, sy * 1.002, sz * 1.002)]}
              />
              <lineBasicMaterial color="#1a1f24" transparent opacity={0.35} />
            </lineSegments>
          </MachinePart>
        );
      })}
    </group>
  );
}
