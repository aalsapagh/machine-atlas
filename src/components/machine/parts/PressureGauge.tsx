import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function PressureGauge({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Chrome body ── */}
      <mesh rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.115, 0.115, 0.058, 26]} />
        <meshStandardMaterial
          color="#9aa4ae"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent opacity={opacity}
          roughness={0.26} metalness={0.78}
        />
      </mesh>

      {/* ── White face ── */}
      <mesh position={[0, 0, -0.032]} rotation={[H, 0, 0]}>
        <cylinderGeometry args={[0.102, 0.102, 0.006, 26]} />
        <meshStandardMaterial color="#eaecee" transparent opacity={opacity} roughness={0.18} metalness={0.04} />
      </mesh>

      {/* ── Bezel ring ── */}
      <mesh position={[0, 0, -0.031]} rotation={[H, 0, 0]}>
        <torusGeometry args={[0.102, 0.013, 8, 26]} />
        <meshStandardMaterial color="#7a8290" transparent opacity={opacity} roughness={0.32} metalness={0.72} />
      </mesh>

      {/* ── Red needle ── */}
      <mesh position={[0.042, 0.038, -0.034]} rotation={[H, 0, Math.PI * 0.38]}>
        <boxGeometry args={[0.072, 0.007, 0.004]} />
        <meshStandardMaterial color="#e03020" transparent opacity={opacity} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Centre pip */}
      <mesh position={[0, 0, -0.034]} rotation={[H, 0, 0]}>
        <cylinderGeometry args={[0.013, 0.013, 0.006, 12]} />
        <meshStandardMaterial color="#5a6070" transparent opacity={opacity} roughness={0.38} metalness={0.72} />
      </mesh>

      {/* ── Syphon/connection stem ── */}
      <mesh position={[0, -0.125, 0]} castShadow>
        <cylinderGeometry args={[0.023, 0.023, 0.145, 10]} />
        <meshStandardMaterial color="#8a929a" transparent opacity={opacity} roughness={0.34} metalness={0.74} />
      </mesh>

      {/* ── Root valve ── */}
      <mesh position={[0, -0.215, 0]} castShadow>
        <boxGeometry args={[0.055, 0.042, 0.055]} />
        <meshStandardMaterial color="#5a6070" transparent opacity={opacity} roughness={0.5} metalness={0.62} />
      </mesh>
    </MachinePart>
  );
}
