import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function BearingHousing({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity, healthColor } =
    usePartAppearance(component);

  const darkBlue  = "#0d3d6e";
  const steelGrey = "#4a5568";
  const chrome    = "#9aa2ab";

  const body = {
    color:             baseColor,
    emissive:          emissiveColor,
    emissiveIntensity: emissiveIntensity,
    transparent:       true,
    opacity,
    roughness:         0.44,
    metalness:         0.55,
  };

  return (
    <MachinePart component={component}>
      {/* ── Main cylindrical housing body (axis along X / shaft axis) ── */}
      <mesh rotation={[0, 0, HALF_PI]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.62, 28, 1]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* ── Drive-end (DE) end cover ── */}
      <mesh position={[-0.34, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.06, 24]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* ── Non-drive-end (NDE) end cover ── */}
      <mesh position={[0.34, 0, 0]} rotation={[0, 0, HALF_PI]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.06, 24]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* ── Mounting pedestal / base (below cylinder) ── */}
      <mesh position={[0, -0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.72, 0.12, 0.56]} />
        <meshStandardMaterial color={darkBlue} transparent opacity={opacity} roughness={0.56} metalness={0.45} />
      </mesh>
      {/* Pedestal gusset plates (triangular illusion via thin boxes) */}
      {[-0.24, 0.24].map((x, i) => (
        <mesh key={i} position={[x, -0.26, 0]} castShadow>
          <boxGeometry args={[0.06, 0.12, 0.52]} />
          <meshStandardMaterial color={darkBlue} transparent opacity={opacity} roughness={0.6} metalness={0.4} />
        </mesh>
      ))}

      {/* ── Oil fill port (top, offset to one side) ── */}
      <mesh position={[0.18, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 10]} />
        <meshStandardMaterial color={steelGrey} transparent opacity={opacity} roughness={0.4} metalness={0.65} />
      </mesh>
      {/* Oil cap */}
      <mesh position={[0.18, 0.41, 0]}>
        <cylinderGeometry args={[0.05, 0.042, 0.02, 10]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={opacity} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* ── Oil sight glass (side, shows lubricant level) ── */}
      <mesh position={[0, 0.0, 0.33]} rotation={[HALF_PI, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.06, 12]} />
        <meshStandardMaterial color="#c8dae8" transparent opacity={opacity * 0.7} roughness={0.1} metalness={0.05} />
      </mesh>

      {/* ── Drain plug ── */}
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 10]} />
        <meshStandardMaterial color={steelGrey} transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* ── 4 mounting bolt studs ── */}
      {([ [-0.28, 0.22], [0.28, 0.22], [-0.28, -0.22], [0.28, -0.22] ] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, -0.385, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.04, 8]} />
          <meshStandardMaterial color={chrome} transparent opacity={opacity} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* ── Status indicator (bearing temperature LED) ── */}
      <mesh position={[0.1, 0.36, 0.28]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={healthColor}
          emissiveIntensity={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>
    </MachinePart>
  );
}
