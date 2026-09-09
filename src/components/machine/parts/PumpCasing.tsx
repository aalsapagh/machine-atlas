import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function PumpCasing({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);

  const flangeColor  = "#263040";
  const steelColor   = "#3a5568";
  const boltColor    = "#5a6878";
  const coverColor   = "#0e3d70";

  const body = {
    color:             baseColor,
    emissive:          emissiveColor,
    emissiveIntensity: emissiveIntensity,
    transparent:       true,
    opacity,
    roughness:         0.38,
    metalness:         0.58,
  };

  return (
    <MachinePart component={component}>
      {/* ── Volute body (wide disc, axis along Z so face points outward) ── */}
      <mesh rotation={[HALF_PI, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.53, 0.57, 0.58, 40, 1]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* ── Volute spiral "tongue" bulge on the discharge side ── */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <sphereGeometry args={[0.24, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* ── Back cover plate (mechanical seal housing side, −Z) ── */}
      <mesh position={[0, 0, 0.34]} rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 28]} />
        <meshStandardMaterial color={coverColor} transparent opacity={opacity} roughness={0.46} metalness={0.58} />
      </mesh>
      {/* Seal gland flange ring */}
      <mesh position={[0, 0, 0.36]} rotation={[HALF_PI, 0, 0]}>
        <torusGeometry args={[0.42, 0.03, 8, 28]} />
        <meshStandardMaterial color={flangeColor} transparent opacity={opacity} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ── Front casing bolt-flange ring ── */}
      <mesh position={[0, 0, -0.32]} rotation={[HALF_PI, 0, 0]}>
        <torusGeometry args={[0.58, 0.036, 8, 40]} />
        <meshStandardMaterial color={flangeColor} transparent opacity={opacity} roughness={0.55} metalness={0.5} />
      </mesh>

      {/* Casing split bolts (8 around the flange) */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const bx = Math.cos(angle) * 0.58;
        const by = Math.sin(angle) * 0.58;
        return (
          <mesh key={i} position={[bx, by, -0.32]}>
            <cylinderGeometry args={[0.024, 0.024, 0.065, 8]} />
            <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.3} metalness={0.75} />
          </mesh>
        );
      })}

      {/* ── Discharge nozzle (exits upward, tangential off the volute) ── */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <cylinderGeometry args={[0.165, 0.185, 0.54, 20]} />
        <meshStandardMaterial {...body} />
      </mesh>
      {/* Discharge weld-neck flange */}
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.045, 24]} />
        <meshStandardMaterial color={flangeColor} transparent opacity={opacity} roughness={0.5} metalness={0.52} />
      </mesh>
      {/* Discharge flange bolts */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const fx = Math.cos(angle) * 0.22;
        const fz = Math.sin(angle) * 0.22;
        return (
          <mesh key={i} position={[fx, 1.045, fz]} rotation={[HALF_PI, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
            <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.3} metalness={0.75} />
          </mesh>
        );
      })}

      {/* ── Suction nozzle (faces front +Z) ── */}
      <mesh position={[0, -0.12, 0.6]} rotation={[HALF_PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.195, 0.195, 0.38, 20]} />
        <meshStandardMaterial color={steelColor} transparent opacity={opacity} roughness={0.4} metalness={0.58} />
      </mesh>
      {/* Suction flange */}
      <mesh position={[0, -0.12, 0.81]} rotation={[HALF_PI, 0, 0]}>
        <cylinderGeometry args={[0.265, 0.265, 0.045, 24]} />
        <meshStandardMaterial color={flangeColor} transparent opacity={opacity} roughness={0.5} metalness={0.52} />
      </mesh>
      {/* Suction flange bolts */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const bx = Math.cos(angle) * 0.245;
        const by = Math.sin(angle) * 0.245;
        return (
          <mesh key={i} position={[bx, by + (-0.12), 0.82]}>
            <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
            <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.3} metalness={0.75} />
          </mesh>
        );
      })}

      {/* ── Drain plug (bottom of casing) ── */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 10]} />
        <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>
    </MachinePart>
  );
}
