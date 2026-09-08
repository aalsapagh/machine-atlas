import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function PumpCasing({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);
  return (
    <MachinePart component={component}>
      {/* volute body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.55, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      {/* discharge nozzle (top) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.5, 16]} />
        <meshStandardMaterial color="#5c7a8a" transparent opacity={opacity} roughness={0.5} />
      </mesh>
      {/* suction nozzle (front) */}
      <mesh position={[0, -0.15, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.4, 16]} />
        <meshStandardMaterial color="#5c7a8a" transparent opacity={opacity} roughness={0.5} />
      </mesh>
      {/* face plate ring */}
      <mesh position={[0, 0, -0.28]}>
        <torusGeometry args={[0.55, 0.03, 8, 32]} />
        <meshStandardMaterial color="#2e3338" transparent opacity={opacity} roughness={0.5} />
      </mesh>
    </MachinePart>
  );
}
