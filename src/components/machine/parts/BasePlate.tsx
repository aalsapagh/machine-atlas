import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function BasePlate({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);
  return (
    <MachinePart component={component}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.6, 0.2, 1.6]} />
        <meshStandardMaterial
          color="#4a4f55"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
    </MachinePart>
  );
}
