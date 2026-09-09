import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function Impeller({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  const vaneCount   = 6;
  const diskColor   = "#8a9aaa";  // cast stainless / bronze look
  const vaneColor   = "#6a7a8a";
  const hubColor    = "#b0b6bc";

  return (
    <MachinePart component={component}>
      {/* ── Rear shroud disk ── */}
      <mesh rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 28]} />
        <meshStandardMaterial
          color={diskColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.72}
        />
      </mesh>

      {/* ── Front shroud disk (slightly smaller) ── */}
      <mesh position={[0, 0.1, 0]} rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.04, 28]} />
        <meshStandardMaterial color={diskColor} transparent opacity={opacity} roughness={0.3} metalness={0.72} />
      </mesh>

      {/* ── Curved vanes (6 backward-curved blades) ── */}
      {Array.from({ length: vaneCount }, (_, i) => {
        const angle  = (i / vaneCount) * Math.PI * 2;
        const rx = Math.cos(angle) * 0.22;
        const rz = Math.sin(angle) * 0.22;
        const tilt   = angle + Math.PI * 0.22;  // backward sweep
        return (
          <mesh
            key={i}
            position={[rx, 0.05, rz]}
            rotation={[0, tilt, 0]}
            castShadow
          >
            <boxGeometry args={[0.2, 0.1, 0.025]} />
            <meshStandardMaterial color={vaneColor} transparent opacity={opacity} roughness={0.38} metalness={0.65} />
          </mesh>
        );
      })}

      {/* ── Central hub / boss ── */}
      <mesh rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.18, 16]} />
        <meshStandardMaterial color={hubColor} transparent opacity={opacity} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* ── Impeller eye (suction inlet ring) ── */}
      <mesh position={[0, -0.03, 0]} rotation={[HALF_PI, 0, 0]}>
        <torusGeometry args={[0.22, 0.018, 8, 28]} />
        <meshStandardMaterial color={diskColor} transparent opacity={opacity} roughness={0.35} metalness={0.68} />
      </mesh>

      {/* ── Status indicator (warning on cavitation) ── */}
      <mesh position={[0.32, 0.14, 0.05]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={healthColor}
          emissiveIntensity={0.85}
          transparent
          opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
