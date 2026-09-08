import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Pipe({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);
  const height = component.size[1];
  return (
    <MachinePart component={component}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.16, height, 20]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.45}
          metalness={0.55}
        />
      </mesh>
      {/* flange rings */}
      <mesh position={[0, height / 2 - 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.19, 0.025, 8, 20]} />
        <meshStandardMaterial color="#2e3338" transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.19, 0.025, 8, 20]} />
        <meshStandardMaterial color="#2e3338" transparent opacity={opacity} />
      </mesh>
    </MachinePart>
  );
}
