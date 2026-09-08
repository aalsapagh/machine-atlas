import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Foundation({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);
  return (
    <MachinePart component={component}>
      <mesh receiveShadow>
        <boxGeometry args={[5.4, 0.5, 2.2]} />
        <meshStandardMaterial
          color="#33383d"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </MachinePart>
  );
}
