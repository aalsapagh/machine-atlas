import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function Motor({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  // Industrial blue tones
  const bodyBlue   = baseColor;           // #1251a8
  const darkBlue   = "#0d3d6e";
  const deepNavy   = "#091e38";
  const cowlColor  = "#141c28";
  const steelGrey  = "#9aa2ab";
  const chrome     = "#bcc4cc";

  const mat = (color: string, roughness = 0.44, metalness = 0.52) => ({
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
      {/* ── Main cylindrical body ── */}
      <mesh rotation={[0, 0, HALF_PI]} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.46, 1.3, 36, 1]} />
        <meshStandardMaterial {...mat(bodyBlue)} />
      </mesh>

      {/* ── Cooling fin rings (9 evenly spaced along body) ── */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = -0.38 + i * 0.095;
        return (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, HALF_PI]}>
            <cylinderGeometry args={[0.49, 0.49, 0.024, 36]} />
            <meshStandardMaterial
              color={darkBlue}
              transparent
              opacity={opacity}
              roughness={0.5}
              metalness={0.55}
            />
          </mesh>
        );
      })}

      {/* ── Front end-bell (pump / coupling side, +X) ── */}
      <mesh position={[0.72, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.44, 0.46, 0.15, 28]} />
        <meshStandardMaterial {...mat(darkBlue, 0.48, 0.55)} />
      </mesh>

      {/* ── Rear end-bell (fan side, −X) ── */}
      <mesh position={[-0.72, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.44, 0.46, 0.15, 28]} />
        <meshStandardMaterial {...mat(darkBlue, 0.48, 0.55)} />
      </mesh>

      {/* ── Fan cowl (plastic shroud over cooling fan, −X end) ── */}
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.22, 32]} />
        <meshStandardMaterial
          color={cowlColor}
          transparent
          opacity={opacity}
          roughness={0.65}
          metalness={0.25}
        />
      </mesh>
      {/* Fan cowl end cap */}
      <mesh position={[-0.975, 0, 0]} rotation={[0, 0, HALF_PI]}>
        <cylinderGeometry args={[0.5, 0.5, 0.028, 32]} />
        <meshStandardMaterial color={deepNavy} transparent opacity={opacity} roughness={0.7} />
      </mesh>
      {/* Fan ventilation slots (4 louvres on cowl face) */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const sy = Math.sin(angle) * 0.26;
        const sz = Math.cos(angle) * 0.26;
        return (
          <mesh key={i} position={[-0.975, sy, sz]}>
            <boxGeometry args={[0.04, 0.08, 0.025]} />
            <meshStandardMaterial color={deepNavy} transparent opacity={opacity} roughness={0.8} />
          </mesh>
        );
      })}

      {/* ── Terminal / junction box on top ── */}
      <mesh position={[0.06, 0.56, 0]} castShadow>
        <boxGeometry args={[0.38, 0.2, 0.32]} />
        <meshStandardMaterial {...mat(darkBlue, 0.55, 0.45)} />
      </mesh>
      {/* Terminal box lid */}
      <mesh position={[0.06, 0.665, 0]}>
        <boxGeometry args={[0.36, 0.03, 0.3]} />
        <meshStandardMaterial {...mat(bodyBlue, 0.4, 0.5)} />
      </mesh>
      {/* Conduit entry stub on terminal box */}
      <mesh position={[0.06, 0.56, -0.22]}>
        <cylinderGeometry args={[0.025, 0.025, 0.1, 10]} />
        <meshStandardMaterial color={steelGrey} transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* ── Four mounting feet (motor feet cast into frame) ── */}
      {(
        [
          [-0.48,  0.48],
          [ 0.48,  0.48],
          [-0.48, -0.48],
          [ 0.48, -0.48],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <group key={`foot-${i}`}>
          <mesh position={[x, -0.51, z]} castShadow receiveShadow>
            <boxGeometry args={[0.26, 0.1, 0.22]} />
            <meshStandardMaterial color={cowlColor} transparent opacity={opacity} roughness={0.65} metalness={0.35} />
          </mesh>
          {/* Hold-down bolt */}
          <mesh position={[x, -0.595, z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.07, 8]} />
            <meshStandardMaterial color={steelGrey} transparent opacity={opacity} roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Washer */}
          <mesh position={[x, -0.575, z]} rotation={[0, 0, HALF_PI]}>
            <torusGeometry args={[0.04, 0.01, 6, 12]} />
            <meshStandardMaterial color={steelGrey} transparent opacity={opacity} roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── Shaft extension stub (coupling / pump side, +X) ── */}
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.18, 16]} />
        <meshStandardMaterial color={chrome} transparent opacity={opacity} roughness={0.18} metalness={0.92} />
      </mesh>

      {/* ── Shaft keyway flat (tiny chamfer on stub) ── */}
      <mesh position={[0.8, 0.05, 0]} rotation={[0, 0, HALF_PI]}>
        <boxGeometry args={[0.19, 0.015, 0.025]} />
        <meshStandardMaterial color={darkBlue} transparent opacity={opacity} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ── Status / health indicator LED ── */}
      <mesh position={[0.58, 0.5, 0.44]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={healthColor}
          emissiveIntensity={0.95}
          transparent
          opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
