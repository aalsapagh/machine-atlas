import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function BearingHousing({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  const paint = {
    color: baseColor, emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.40, metalness: 0.30,
    clearcoat: 0.92, clearcoatRoughness: 0.16,
  };

  return (
    <MachinePart component={component}>
      {/* ── Cylindrical body ── */}
      <mesh rotation={[0, 0, H]} castShadow receiveShadow>
        <cylinderGeometry args={[0.33, 0.33, 0.64, 30, 1]} />
        <meshPhysicalMaterial {...paint} />
      </mesh>

      {/* ── End covers ── */}
      {[-0.36, 0.36].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, H]} castShadow>
          <cylinderGeometry args={[0.29, 0.33, 0.065, 26]} />
          <meshPhysicalMaterial {...paint} />
        </mesh>
      ))}

      {/* ── Mounting pedestal ── */}
      <mesh position={[0, -0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.76, 0.13, 0.58]} />
        <meshPhysicalMaterial color="#0c3560" transparent opacity={opacity} roughness={0.5} metalness={0.28} clearcoat={0.85} clearcoatRoughness={0.2} />
      </mesh>
      {/* Gussets */}
      {[-0.26, 0.26].map((x, i) => (
        <mesh key={i} position={[x, -0.28, 0]} castShadow>
          <boxGeometry args={[0.06, 0.13, 0.54]} />
          <meshPhysicalMaterial color="#0c3560" transparent opacity={opacity} roughness={0.55} metalness={0.28} clearcoat={0.8} clearcoatRoughness={0.2} />
        </mesh>
      ))}

      {/* ── Oil fill port ── */}
      <mesh position={[0.20, 0.37, 0]} castShadow>
        <cylinderGeometry args={[0.042, 0.042, 0.1, 12]} />
        <meshStandardMaterial color="#4a5568" transparent opacity={opacity} roughness={0.4} metalness={0.65} />
      </mesh>
      {/* Yellow oil cap */}
      <mesh position={[0.20, 0.425, 0]}>
        <cylinderGeometry args={[0.052, 0.044, 0.022, 12]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={opacity} roughness={0.55} metalness={0.35} />
      </mesh>

      {/* ── Sight glass (oil level) ── */}
      <mesh position={[0, 0, 0.345]} rotation={[H, 0, 0]}>
        <cylinderGeometry args={[0.046, 0.046, 0.065, 14]} />
        <meshStandardMaterial color="#c8dde8" transparent opacity={opacity * 0.65} roughness={0.08} metalness={0.05} />
      </mesh>

      {/* ── Drain plug ── */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.031, 0.031, 0.052, 10]} />
        <meshStandardMaterial color="#5a6878" transparent opacity={opacity} roughness={0.38} metalness={0.72} />
      </mesh>

      {/* ── 4 foot bolt studs ── */}
      {([[-0.30, 0.24], [0.30, 0.24], [-0.30, -0.24], [0.30, -0.24]] as [number,number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, -0.40, z]}>
          <cylinderGeometry args={[0.023, 0.023, 0.042, 8]} />
          <meshStandardMaterial color="#9aa2ab" transparent opacity={opacity} roughness={0.28} metalness={0.85} />
        </mesh>
      ))}

      {/* ── Status indicator ── */}
      <mesh position={[0.12, 0.38, 0.30]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color={healthColor} emissive={healthColor} emissiveIntensity={1.0} transparent opacity={opacity} />
      </mesh>
    </MachinePart>
  );
}
