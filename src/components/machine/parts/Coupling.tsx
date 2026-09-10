import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function Coupling({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } = usePartAppearance(component);

  const hub = {
    color: "#28323e", emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.36, metalness: 0.72,
  };
  const rubber = { color: "#1a1c1e", transparent: true, opacity, roughness: 0.88, metalness: 0.02 };
  const guard  = { color: "#1c2535", transparent: true, opacity: opacity * 0.85, roughness: 0.68, metalness: 0.25 };

  return (
    <MachinePart component={component}>
      {/* ── Motor-side hub ── */}
      <mesh position={[-0.13, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.23, 26]} />
        <meshStandardMaterial {...hub} />
      </mesh>
      <mesh position={[-0.018, 0, 0]} rotation={[0, 0, H]}>
        <cylinderGeometry args={[0.235, 0.235, 0.042, 26]} />
        <meshStandardMaterial {...hub} />
      </mesh>

      {/* ── Pump-side hub ── */}
      <mesh position={[0.13, 0, 0]} rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.23, 26]} />
        <meshStandardMaterial {...hub} />
      </mesh>
      <mesh position={[0.018, 0, 0]} rotation={[0, 0, H]}>
        <cylinderGeometry args={[0.235, 0.235, 0.042, 26]} />
        <meshStandardMaterial {...hub} />
      </mesh>

      {/* ── Elastomeric spider ── */}
      <mesh rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.205, 0.205, 0.085, 22]} />
        <meshStandardMaterial {...rubber} />
      </mesh>
      {/* Spider teeth (6) */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[0, Math.cos(a) * 0.185, Math.sin(a) * 0.185]} rotation={[0, 0, H + a]}>
            <boxGeometry args={[0.085, 0.065, 0.042]} />
            <meshStandardMaterial color="#241610" transparent opacity={opacity} roughness={0.92} metalness={0.0} />
          </mesh>
        );
      })}

      {/* ── Coupling guard (open-bottom sheet-metal shroud) ── */}
      <mesh rotation={[0, 0, H]} castShadow>
        <cylinderGeometry args={[0.295, 0.295, 0.54, 26, 1, true, 0.18, Math.PI * 1.64]} />
        <meshStandardMaterial {...guard} side={2} />
      </mesh>
      {/* Guard end rings */}
      {[-0.285, 0.285].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, H]}>
          <torusGeometry args={[0.295, 0.016, 6, 26, Math.PI * 1.64]} />
          <meshStandardMaterial {...guard} />
        </mesh>
      ))}

      {/* ── Shaft bore highlights ── */}
      {[-0.245, 0.245].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, H]}>
          <cylinderGeometry args={[0.058, 0.058, 0.022, 16]} />
          <meshStandardMaterial color="#bcc5cd" transparent opacity={opacity} roughness={0.2} metalness={0.92} />
        </mesh>
      ))}
    </MachinePart>
  );
}
