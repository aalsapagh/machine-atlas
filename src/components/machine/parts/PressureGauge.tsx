import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function PressureGauge({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Gauge body (chromed brass case) ── */}
      <mesh rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.115, 0.115, 0.055, 24]} />
        <meshStandardMaterial
          color="#9aa2ab"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.28}
          metalness={0.75}
        />
      </mesh>

      {/* ── Gauge face (white / off-white) ── */}
      <mesh position={[0, 0, -0.03]} rotation={[HALF_PI, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.005, 24]} />
        <meshStandardMaterial color="#e8eaec" transparent opacity={opacity} roughness={0.2} metalness={0.05} />
      </mesh>

      {/* ── Bezel ring ── */}
      <mesh position={[0, 0, -0.029]} rotation={[HALF_PI, 0, 0]}>
        <torusGeometry args={[0.1, 0.012, 8, 24]} />
        <meshStandardMaterial color="#7a8290" transparent opacity={opacity} roughness={0.35} metalness={0.7} />
      </mesh>

      {/* ── Needle (red, pointing to 3/4 position) ── */}
      <mesh position={[0.04, 0.04, -0.032]} rotation={[HALF_PI, 0, Math.PI * 0.4]}>
        <boxGeometry args={[0.07, 0.007, 0.003]} />
        <meshStandardMaterial color="#e03030" transparent opacity={opacity} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* ── Centre pip ── */}
      <mesh position={[0, 0, -0.032]} rotation={[HALF_PI, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.006, 12]} />
        <meshStandardMaterial color="#5a6070" transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* ── Lower stem / syphon tube ── */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.14, 10]} />
        <meshStandardMaterial color="#8a929a" transparent opacity={opacity} roughness={0.35} metalness={0.72} />
      </mesh>

      {/* ── Root valve (small cube below stem) ── */}
      <mesh position={[0, -0.21, 0]} castShadow>
        <boxGeometry args={[0.055, 0.04, 0.055]} />
        <meshStandardMaterial color="#5a6070" transparent opacity={opacity} roughness={0.5} metalness={0.6} />
      </mesh>
    </MachinePart>
  );
}
