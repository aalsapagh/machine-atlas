import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function Shaft({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Precision ground shaft body ── */}
      <mesh rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 1.42, 20]} />
        <meshStandardMaterial
          color="#c7ccd1"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.18}
          metalness={0.92}
        />
      </mesh>

      {/* ── Impeller end (slightly larger shoulder, +X) ── */}
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
        <meshStandardMaterial color="#b8bec4" transparent opacity={opacity} roughness={0.22} metalness={0.88} />
      </mesh>

      {/* ── Locking nut on impeller end ── */}
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, HALF_PI]}>
        <cylinderGeometry args={[0.095, 0.095, 0.06, 6]} />
        <meshStandardMaterial color="#8a929a" transparent opacity={opacity} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ── Keyway flat (visible surface cut) ── */}
      <mesh position={[0.35, 0.075, 0]} rotation={[0, 0, HALF_PI]}>
        <boxGeometry args={[0.5, 0.01, 0.02]} />
        <meshStandardMaterial color="#9aa2ab" transparent opacity={opacity} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* ── Bearing seat (stepped up slightly toward bearing end, -X) ── */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.26, 16]} />
        <meshStandardMaterial color="#b0b6bc" transparent opacity={opacity} roughness={0.2} metalness={0.9} />
      </mesh>
    </MachinePart>
  );
}
