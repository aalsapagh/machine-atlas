import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Foundation({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Main concrete pad ── */}
      <mesh receiveShadow>
        <boxGeometry args={[5.4, 0.5, 2.2]} />
        <meshStandardMaterial
          color="#2c3035"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.92}
          metalness={0.04}
        />
      </mesh>

      {/* ── Chamfered top edge indication (darker strip on perimeter) ── */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[5.42, 0.02, 2.22]} />
        <meshStandardMaterial color="#383e44" transparent opacity={opacity} roughness={0.95} metalness={0.02} />
      </mesh>

      {/* ── Anchor bolt pockets (visible inserts, 8 bolts) ── */}
      {(
        [
          [-2.3, 0.85], [-2.3, -0.85],
          [ 2.3, 0.85], [ 2.3, -0.85],
          [-0.7, 0.85], [-0.7, -0.85],
          [ 0.7, 0.85], [ 0.7, -0.85],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.24, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 10]} />
          <meshStandardMaterial color="#5a6878" transparent opacity={opacity} roughness={0.35} metalness={0.8} />
        </mesh>
      ))}
    </MachinePart>
  );
}
