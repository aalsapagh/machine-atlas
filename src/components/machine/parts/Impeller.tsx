import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function Impeller({ component }: { component: MachineComponent }) {
  const { emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  const disk = {
    color: "#8a9aaa", emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.28, metalness: 0.78,
    clearcoat: 0.5, clearcoatRoughness: 0.25,
  };

  return (
    <MachinePart component={component}>
      {/* ── Rear shroud ── */}
      <mesh rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.39, 0.39, 0.052, 30]} />
        <meshPhysicalMaterial {...disk} />
      </mesh>

      {/* ── Front shroud (slightly smaller) ── */}
      <mesh position={[0, 0.1, 0]} rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.042, 30]} />
        <meshPhysicalMaterial {...disk} />
      </mesh>

      {/* ── 6 backward-curved vanes ── */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.22, 0.05, Math.sin(a) * 0.22]} rotation={[0, a + 0.65, 0]} castShadow>
            <boxGeometry args={[0.22, 0.095, 0.026]} />
            <meshPhysicalMaterial color="#6a7a8a" transparent opacity={opacity} roughness={0.36} metalness={0.72} clearcoat={0.4} clearcoatRoughness={0.3} />
          </mesh>
        );
      })}

      {/* ── Hub / boss ── */}
      <mesh rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.088, 0.088, 0.2, 16]} />
        <meshStandardMaterial color="#b0b8c0" transparent opacity={opacity} roughness={0.22} metalness={0.9} />
      </mesh>

      {/* ── Suction eye ring ── */}
      <mesh position={[0, -0.028, 0]} rotation={[H, 0, 0]}>
        <torusGeometry args={[0.23, 0.018, 8, 30]} />
        <meshPhysicalMaterial {...disk} />
      </mesh>

      {/* ── Status indicator ── */}
      <mesh position={[0.33, 0.14, 0.06]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color={healthColor} emissive={healthColor} emissiveIntensity={1.0} transparent opacity={opacity} />
      </mesh>
    </MachinePart>
  );
}
