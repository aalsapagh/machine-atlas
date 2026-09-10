import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

export function Foundation({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  return (
    <MachinePart component={component}>
      {/* ── Concrete pad ── */}
      <mesh receiveShadow>
        <boxGeometry args={[5.4, 0.5, 2.2]} />
        <meshStandardMaterial
          color="#2c3035"
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent opacity={opacity}
          roughness={0.92} metalness={0.04}
        />
      </mesh>

      {/* ── Chamfer strip on top perimeter ── */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[5.42, 0.022, 2.22]} />
        <meshStandardMaterial color="#383e44" transparent opacity={opacity} roughness={0.95} metalness={0.02} />
      </mesh>

      {/* ── 8 anchor bolt inserts ── */}
      {([
        [-2.30, 0.86], [-2.30, -0.86],
        [ 2.30, 0.86], [ 2.30, -0.86],
        [-0.70, 0.86], [-0.70, -0.86],
        [ 0.70, 0.86], [ 0.70, -0.86],
      ] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.245, z]}>
          <cylinderGeometry args={[0.038, 0.038, 0.042, 10]} />
          <meshStandardMaterial color="#5a6878" transparent opacity={opacity} roughness={0.32} metalness={0.82} />
        </mesh>
      ))}
    </MachinePart>
  );
}
