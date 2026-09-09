import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function Coupling({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);

  const hubColor    = "#2a3040";   // dark steel for hubs
  const rubberColor = "#1a1c1e";   // black rubber spider
  const guardColor  = "#1e2535";   // dark coupling guard

  const hub = {
    color:             hubColor,
    emissive:          emissiveColor,
    emissiveIntensity: emissiveIntensity,
    transparent:       true,
    opacity,
    roughness:         0.38,
    metalness:         0.68,
  };

  return (
    <MachinePart component={component}>
      {/* ── Motor-side hub ── */}
      <mesh position={[-0.12, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.22, 24]} />
        <meshStandardMaterial {...hub} />
      </mesh>
      {/* Hub flange disc */}
      <mesh position={[-0.015, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.23, 0.23, 0.04, 24]} />
        <meshStandardMaterial {...hub} />
      </mesh>

      {/* ── Pump-side hub ── */}
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.22, 24]} />
        <meshStandardMaterial {...hub} />
      </mesh>
      {/* Hub flange disc */}
      <mesh position={[0.015, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.23, 0.23, 0.04, 24]} />
        <meshStandardMaterial {...hub} />
      </mesh>

      {/* ── Elastomeric spider element (rubber between the hubs) ── */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 20]} />
        <meshStandardMaterial
          color={rubberColor}
          transparent
          opacity={opacity}
          roughness={0.88}
          metalness={0.02}
        />
      </mesh>
      {/* Spider teeth (6 rubber fins) */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const rx = Math.cos(angle) * 0.18;
        const rz = Math.sin(angle) * 0.18;
        return (
          <mesh key={i} position={[0, rx, rz]} rotation={[0, 0, HALF_PI + angle]}>
            <boxGeometry args={[0.08, 0.06, 0.04]} />
            <meshStandardMaterial color="#2a1a0a" transparent opacity={opacity} roughness={0.9} metalness={0.0} />
          </mesh>
        );
      })}

      {/* ── Coupling guard (sheet metal half-cylinder cover) ── */}
      <mesh rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.285, 0.285, 0.52, 24, 1, true, 0, Math.PI * 1.7]} />
        <meshStandardMaterial
          color={guardColor}
          transparent
          opacity={opacity * 0.88}
          roughness={0.72}
          metalness={0.3}
          side={2}
        />
      </mesh>
      {/* Guard end rings */}
      {[-0.27, 0.27].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, HALF_PI]}>
          <torusGeometry args={[0.285, 0.018, 6, 24, Math.PI * 1.7]} />
          <meshStandardMaterial color={guardColor} transparent opacity={opacity} roughness={0.65} metalness={0.3} />
        </mesh>
      ))}

      {/* ── Hub bore (chrome inner shaft bore – visual detail) ── */}
      <mesh position={[-0.235, 0, 0]} rotation={[0, 0, HALF_PI]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
        <meshStandardMaterial color="#bcc4cc" transparent opacity={opacity} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.235, 0, 0]} rotation={[0, 0, HALF_PI]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
        <meshStandardMaterial color="#bcc4cc" transparent opacity={opacity} roughness={0.2} metalness={0.9} />
      </mesh>
    </MachinePart>
  );
}
