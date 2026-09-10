import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function Shaft({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  const chrome = (color = "#c8d0d8") => ({
    color, emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.16, metalness: 0.96,
  });

  return (
    <MachinePart component={component}>
      {/* ── Precision ground shaft body ── */}
      <mesh rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.076, 0.076, 1.44, 20]} />
        <meshStandardMaterial {...chrome()} />
      </mesh>

      {/* ── Impeller shoulder (+X) ── */}
      <mesh position={[0.64, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.092, 0.092, 0.13, 16]} />
        <meshStandardMaterial {...chrome("#b8c0c8")} />
      </mesh>

      {/* ── Locking nut ── */}
      <mesh position={[0.72, 0, 0]} rotation={[0, 0, H]}>
        <cylinderGeometry args={[0.097, 0.097, 0.062, 6]} />
        <meshStandardMaterial color="#8a929a" transparent opacity={opacity} roughness={0.28} metalness={0.82} />
      </mesh>

      {/* ── Keyway flat ── */}
      <mesh position={[0.36, 0.077, 0]} rotation={[0, 0, H]}>
        <boxGeometry args={[0.52, 0.01, 0.022]} />
        <meshStandardMaterial color="#9aa2ab" transparent opacity={opacity} roughness={0.22} metalness={0.88} />
      </mesh>

      {/* ── Bearing seat step (−X toward bearing housing) ── */}
      <mesh position={[-0.52, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.086, 0.086, 0.28, 16]} />
        <meshStandardMaterial {...chrome("#b0b8c0")} />
      </mesh>
    </MachinePart>
  );
}
