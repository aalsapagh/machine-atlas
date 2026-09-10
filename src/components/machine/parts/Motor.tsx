import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

/** Industrial electric motor – horizontal cylindrical frame with cooling fins. */
export function Motor({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  // ── shared material builders ──────────────────────────────────────────────
  /** Primary blue painted metal – uses MeshPhysicalMaterial for IBL clearcoat */
  const paint = (roughness = 0.38) => ({
    color:              baseColor,
    emissive:           emissiveColor,
    emissiveIntensity:  emissiveIntensity,
    transparent:        true,
    opacity,
    roughness,
    metalness:          0.32,
    clearcoat:          0.95,
    clearcoatRoughness: 0.14,
  });

  /** Dark accent (end bells, terminal box body) */
  const darkPaint = {
    color:              "#0c3560",
    transparent:        true,
    opacity,
    roughness:          0.42,
    metalness:          0.3,
    clearcoat:          0.9,
    clearcoatRoughness: 0.18,
  };

  /** Black plastic (fan cowl) */
  const plastic = {
    color:       "#131820",
    transparent: true,
    opacity,
    roughness:   0.72,
    metalness:   0.1,
  };

  /** Bare steel / chrome */
  const steel = {
    color:       "#bcc5cd",
    transparent: true,
    opacity,
    roughness:   0.18,
    metalness:   0.95,
  };

  const FIN_COUNT = 10;
  const FIN_START = -0.42;
  const FIN_STEP  = 0.088;

  return (
    <MachinePart component={component}>
      {/* ── Main cylindrical body (axis → X via 90° Z rotation) ── */}
      <mesh rotation={[0, 0, H]} castShadow receiveShadow>
        <cylinderGeometry args={[0.50, 0.50, 1.38, 40, 1]} />
        <meshPhysicalMaterial {...paint()} />
      </mesh>

      {/* ── Cooling fin rings ── */}
      {Array.from({ length: FIN_COUNT }, (_, i) => (
        <mesh key={i} position={[FIN_START + i * FIN_STEP, 0, 0]} rotation={[0, 0, H]}>
          <cylinderGeometry args={[0.535, 0.535, 0.022, 40]} />
          <meshPhysicalMaterial {...darkPaint} />
        </mesh>
      ))}

      {/* ── Front end-bell (pump side, +X) ── */}
      <mesh position={[0.76, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.46, 0.50, 0.16, 32]} />
        <meshPhysicalMaterial {...darkPaint} />
      </mesh>

      {/* ── Rear end-bell (fan side, −X) ── */}
      <mesh position={[-0.76, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.46, 0.50, 0.16, 32]} />
        <meshPhysicalMaterial {...darkPaint} />
      </mesh>

      {/* ── Fan cowl (plastic shroud, −X) ── */}
      <mesh position={[-0.88, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.535, 0.535, 0.24, 36]} />
        <meshStandardMaterial {...plastic} />
      </mesh>
      {/* Fan cowl end cap */}
      <mesh position={[-1.01, 0, 0]} rotation={[0, 0, H]}>
        <cylinderGeometry args={[0.535, 0.535, 0.025, 36]} />
        <meshStandardMaterial color="#0d1218" transparent opacity={opacity} roughness={0.75} />
      </mesh>
      {/* Vent slots on cowl (4 louvres) */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[-1.01, Math.sin(a) * 0.27, Math.cos(a) * 0.27]}>
            <boxGeometry args={[0.05, 0.1, 0.025]} />
            <meshStandardMaterial color="#0d1218" transparent opacity={opacity} roughness={0.8} />
          </mesh>
        );
      })}

      {/* ── Terminal / junction box ── */}
      <mesh position={[0.08, 0.60, 0]} castShadow>
        <boxGeometry args={[0.40, 0.22, 0.34]} />
        <meshPhysicalMaterial {...darkPaint} />
      </mesh>
      <mesh position={[0.08, 0.715, 0]}>
        <boxGeometry args={[0.38, 0.03, 0.32]} />
        <meshPhysicalMaterial color={baseColor} transparent opacity={opacity} roughness={0.35} metalness={0.3} clearcoat={0.95} clearcoatRoughness={0.12} />
      </mesh>
      {/* Conduit gland on side of terminal box */}
      <mesh position={[0.08, 0.60, -0.24]}>
        <cylinderGeometry args={[0.026, 0.026, 0.1, 10]} />
        <meshStandardMaterial color="#8a929a" transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* ── Four mounting feet ── */}
      {([[-0.50, 0.44], [0.50, 0.44], [-0.50, -0.44], [0.50, -0.44]] as [number, number][]).map(([x, z], i) => (
        <group key={i}>
          {/* Foot pad */}
          <mesh position={[x, -0.535, z]} castShadow receiveShadow>
            <boxGeometry args={[0.28, 0.09, 0.24]} />
            <meshPhysicalMaterial color="#0c3560" transparent opacity={opacity} roughness={0.5} metalness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} />
          </mesh>
          {/* Bolt */}
          <mesh position={[x, -0.605, z]}>
            <cylinderGeometry args={[0.026, 0.026, 0.07, 8]} />
            <meshStandardMaterial color="#9aa2ab" transparent opacity={opacity} roughness={0.28} metalness={0.85} />
          </mesh>
          {/* Washer */}
          <mesh position={[x, -0.583, z]} rotation={[0, 0, H]}>
            <torusGeometry args={[0.042, 0.01, 6, 12]} />
            <meshStandardMaterial color="#9aa2ab" transparent opacity={opacity} roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── Shaft extension stub (coupling side, +X) ── */}
      <mesh position={[0.84, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.058, 0.058, 0.2, 18]} />
        <meshStandardMaterial {...steel} />
      </mesh>

      {/* ── Health indicator LED ── */}
      <mesh position={[0.62, 0.54, 0.46]}>
        <sphereGeometry args={[0.038, 12, 12]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={healthColor}
          emissiveIntensity={1.0}
          transparent
          opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
