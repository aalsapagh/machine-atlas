import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Motor({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity, healthColor } = usePartAppearance(component);
  return (
    <MachinePart component={component}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.0, 1.0]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>
      {/* cooling fins */}
      {[-0.35, -0.15, 0.05, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0.52, 0]} castShadow>
          <boxGeometry args={[0.08, 0.08, 1.02]} />
          <meshStandardMaterial color="#5a5f66" transparent opacity={opacity} roughness={0.6} />
        </mesh>
      ))}
      {/* fan cowl */}
      <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.25, 24]} />
        <meshStandardMaterial color="#3a3f45" transparent opacity={opacity} roughness={0.6} />
      </mesh>
      {/* health indicator light */}
      <mesh position={[0.66, 0.35, 0.35]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={healthColor} emissive={healthColor} emissiveIntensity={0.8} transparent opacity={opacity} />
      </mesh>
    </MachinePart>
  );
}
