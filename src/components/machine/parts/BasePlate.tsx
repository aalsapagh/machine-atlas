import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function BasePlate({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  const plateColor = "#2e3a4a";
  const ribColor   = "#263040";
  const boltColor  = "#6a7888";

  const mat = (color: string, roughness = 0.6, metalness = 0.45) => ({
    color,
    emissive:          emissiveColor,
    emissiveIntensity: emissiveIntensity,
    transparent:       true,
    opacity,
    roughness,
    metalness,
  });

  return (
    <MachinePart component={component}>
      {/* ── Main plate top surface ── */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.6, 0.18, 1.6]} />
        <meshStandardMaterial {...mat(plateColor)} />
      </mesh>

      {/* ── Longitudinal I-beam ribs underneath (3 ribs) ── */}
      {[-0.5, 0, 0.5].map((z, i) => (
        <mesh key={i} position={[0, -0.14, z]} castShadow>
          <boxGeometry args={[4.5, 0.1, 0.06]} />
          <meshStandardMaterial {...mat(ribColor, 0.65, 0.4)} />
        </mesh>
      ))}

      {/* ── Cross-braces (4 lateral ribs) ── */}
      {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
        <mesh key={i} position={[x, -0.14, 0]} castShadow>
          <boxGeometry args={[0.06, 0.1, 1.5]} />
          <meshStandardMaterial {...mat(ribColor, 0.65, 0.4)} />
        </mesh>
      ))}

      {/* ── Foundation anchor bolts (8 positions at corners and mid-span) ── */}
      {(
        [
          [-2.1, 0.65], [-2.1, -0.65],
          [ 2.1, 0.65], [ 2.1, -0.65],
          [-0.7, 0.65], [-0.7, -0.65],
          [ 0.7, 0.65], [ 0.7, -0.65],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <group key={i}>
          {/* Bolt hole boss */}
          <mesh position={[x, -0.06, z]}>
            <cylinderGeometry args={[0.055, 0.055, 0.06, 10]} />
            <meshStandardMaterial {...mat(ribColor, 0.6, 0.4)} />
          </mesh>
          {/* Bolt head */}
          <mesh position={[x, -0.12, z]}>
            <cylinderGeometry args={[0.035, 0.035, 0.05, 6]} />
            <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.35} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── Grout hole pockets (2 visual cut-outs on the top plate) ── */}
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.9]} />
          <meshStandardMaterial color="#202830" transparent opacity={opacity} roughness={0.85} metalness={0.1} />
        </mesh>
      ))}

      {/* ── Levelling pad bosses (shimmed feet positions, 4 pads) ── */}
      {([ [-2.0, 0], [2.0, 0], [-0.5, 0], [0.5, 0] ] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, -0.195, z]}>
          <cylinderGeometry args={[0.09, 0.09, 0.025, 12]} />
          <meshStandardMaterial color="#3a4a5a" transparent opacity={opacity} roughness={0.55} metalness={0.5} />
        </mesh>
      ))}
    </MachinePart>
  );
}
