import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function TemperatureSensor({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Transmitter head housing ── */}
      <mesh castShadow>
        <boxGeometry args={[0.13, 0.20, 0.13]} />
        <meshPhysicalMaterial
          color="#c9a13b"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent opacity={opacity}
          roughness={0.40} metalness={0.40}
          clearcoat={0.75} clearcoatRoughness={0.22}
        />
      </mesh>

      {/* ── Lid ── */}
      <mesh position={[0, 0.105, 0]}>
        <boxGeometry args={[0.135, 0.014, 0.135]} />
        <meshPhysicalMaterial
          color="#a88030" transparent opacity={opacity}
          roughness={0.48} metalness={0.42} clearcoat={0.7} clearcoatRoughness={0.25}
        />
      </mesh>

      {/* ── Conduit gland ── */}
      <mesh position={[0.078, 0.04, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.062, 10]} />
        <meshStandardMaterial color="#7a8290" transparent opacity={opacity} roughness={0.38} metalness={0.68} />
      </mesh>

      {/* ── Thermowell probe ── */}
      <mesh position={[0, -0.185, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.145, 10]} />
        <meshStandardMaterial color="#bcc5cd" transparent opacity={opacity} roughness={0.20} metalness={0.90} />
      </mesh>
      <mesh position={[0, -0.268, 0]}>
        <sphereGeometry args={[0.020, 10, 10]} />
        <meshStandardMaterial color="#bcc5cd" transparent opacity={opacity} roughness={0.22} metalness={0.88} />
      </mesh>

      {/* ── Status LED ── */}
      <mesh position={[0, 0.118, 0.058]}>
        <sphereGeometry args={[0.024, 10, 10]} />
        <meshStandardMaterial
          color={healthColor} emissive={healthColor} emissiveIntensity={1.0}
          transparent opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
