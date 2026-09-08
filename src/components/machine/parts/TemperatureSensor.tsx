import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function TemperatureSensor({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity, healthColor } = usePartAppearance(component);
  return (
    <MachinePart component={component}>
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.22, 0.14]} />
        <meshStandardMaterial
          color="#c9a13b"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#7a828c" transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={healthColor} emissive={healthColor} emissiveIntensity={0.9} transparent opacity={opacity} />
      </mesh>
    </MachinePart>
  );
}
