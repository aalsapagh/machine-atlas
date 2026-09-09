import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function TemperatureSensor({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Transmitter head (weatherproof housing) ── */}
      <mesh castShadow>
        <boxGeometry args={[0.13, 0.2, 0.13]} />
        <meshStandardMaterial
          color="#c9a13b"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.42}
          metalness={0.42}
        />
      </mesh>

      {/* ── Housing lid (top panel) ── */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.14, 0.015, 0.14]} />
        <meshStandardMaterial color="#a88030" transparent opacity={opacity} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ── Conduit entry (cable gland) ── */}
      <mesh position={[0.075, 0.04, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 10]} />
        <meshStandardMaterial color="#7a8290" transparent opacity={opacity} roughness={0.4} metalness={0.65} />
      </mesh>

      {/* ── Thermowell probe (stainless insertion tube) ── */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.14, 10]} />
        <meshStandardMaterial color="#bcc4cc" transparent opacity={opacity} roughness={0.22} metalness={0.88} />
      </mesh>
      {/* Probe tip */}
      <mesh position={[0, -0.265, 0]}>
        <sphereGeometry args={[0.02, 10, 10]} />
        <meshStandardMaterial color="#bcc4cc" transparent opacity={opacity} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* ── Status / alarm LED ── */}
      <mesh position={[0, 0.115, 0.055]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={healthColor}
          emissiveIntensity={0.95}
          transparent
          opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
