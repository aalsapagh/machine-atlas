import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Impeller({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);
  const vaneCount = 6;
  return (
    <MachinePart component={component}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.14, 24]} />
        <meshStandardMaterial
          color="#9aa2ab"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.75}
        />
      </mesh>
      {Array.from({ length: vaneCount }).map((_, i) => {
        const angle = (i / vaneCount) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.18, Math.sin(angle) * 0.18, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.22, 0.04, 0.12]} />
            <meshStandardMaterial color="#7a828c" transparent opacity={opacity} roughness={0.4} metalness={0.6} />
          </mesh>
        );
      })}
    </MachinePart>
  );
}
