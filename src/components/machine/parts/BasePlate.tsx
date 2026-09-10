import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function BasePlate({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  const plate = {
    color: "#2c3848", emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.58, metalness: 0.42,
    clearcoat: 0.6, clearcoatRoughness: 0.3,
  };
  const rib   = { color: "#232e3c", transparent: true, opacity, roughness: 0.62, metalness: 0.4 };
  const bolt  = { color: "#6a7888", transparent: true, opacity, roughness: 0.32, metalness: 0.82 };

  return (
    <MachinePart component={component}>
      {/* ── Main plate top ── */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.6, 0.18, 1.6]} />
        <meshPhysicalMaterial {...plate} />
      </mesh>

      {/* ── 3 longitudinal I-beam ribs ── */}
      {[-0.52, 0, 0.52].map((z, i) => (
        <mesh key={i} position={[0, -0.145, z]} castShadow>
          <boxGeometry args={[4.5, 0.1, 0.065]} />
          <meshStandardMaterial {...rib} />
        </mesh>
      ))}

      {/* ── 4 lateral cross-braces ── */}
      {[-1.8, -0.5, 0.5, 1.8].map((x, i) => (
        <mesh key={i} position={[x, -0.145, 0]} castShadow>
          <boxGeometry args={[0.065, 0.1, 1.52]} />
          <meshStandardMaterial {...rib} />
        </mesh>
      ))}

      {/* ── 8 anchor bolt holes + heads ── */}
      {([
        [-2.15, 0.66], [-2.15, -0.66],
        [ 2.15, 0.66], [ 2.15, -0.66],
        [-0.65, 0.66], [-0.65, -0.66],
        [ 0.65, 0.66], [ 0.65, -0.66],
      ] as [number,number][]).map(([x, z], i) => (
        <group key={i}>
          <mesh position={[x, -0.058, z]}>
            <cylinderGeometry args={[0.056, 0.056, 0.065, 10]} />
            <meshStandardMaterial {...rib} />
          </mesh>
          <mesh position={[x, -0.128, z]}>
            <cylinderGeometry args={[0.036, 0.036, 0.055, 6]} />
            <meshStandardMaterial {...bolt} />
          </mesh>
        </group>
      ))}

      {/* ── Levelling pad bosses ── */}
      {([-2.0, -0.5, 0.5, 2.0] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.202, 0]}>
          <cylinderGeometry args={[0.092, 0.092, 0.026, 14]} />
          <meshStandardMaterial color="#3a4858" transparent opacity={opacity} roughness={0.55} metalness={0.5} />
        </mesh>
      ))}

      {/* ── Drain channel / grout pockets (surface insets) ── */}
      {[-1.1, 1.1].map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0]}>
          <boxGeometry args={[0.32, 0.018, 0.95]} />
          <meshStandardMaterial color="#1c252e" transparent opacity={opacity} roughness={0.88} metalness={0.08} />
        </mesh>
      ))}
    </MachinePart>
  );
}
