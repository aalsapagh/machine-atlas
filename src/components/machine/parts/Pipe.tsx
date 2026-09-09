import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const HALF_PI = Math.PI / 2;

export function Pipe({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);

  const pipeH      = component.size[1];
  const flangeColor = "#263040";
  const boltColor   = "#4a5568";

  return (
    <MachinePart component={component}>
      {/* ── Pipe body ── */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.155, 0.155, pipeH, 22]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.44}
          metalness={0.58}
        />
      </mesh>

      {/* ── Pipe inner bore visible at each end ── */}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[0, side * (pipeH / 2 - 0.01), 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.02, 18]} />
          <meshStandardMaterial color="#0a0f16" transparent opacity={opacity} roughness={0.9} metalness={0.1} />
        </mesh>
      ))}

      {/* ── Weld-neck flanges at each end ── */}
      {[-1, 1].map((side, i) => (
        <group key={i}>
          <mesh position={[0, side * (pipeH / 2 - 0.025), 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.045, 24]} />
            <meshStandardMaterial color={flangeColor} transparent opacity={opacity} roughness={0.5} metalness={0.55} />
          </mesh>
          {/* Flange face ring */}
          <mesh position={[0, side * (pipeH / 2 - 0.005), 0]}>
            <torusGeometry args={[0.18, 0.012, 6, 24]} />
            <meshStandardMaterial color="#1a2030" transparent opacity={opacity} roughness={0.5} />
          </mesh>
          {/* 6 flange bolts */}
          {Array.from({ length: 6 }, (_, b) => {
            const angle = (b / 6) * Math.PI * 2;
            const bx = Math.cos(angle) * 0.2;
            const bz = Math.sin(angle) * 0.2;
            return (
              <mesh key={b} position={[bx, side * (pipeH / 2 - 0.025), bz]} rotation={[HALF_PI, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.06, 8]} />
                <meshStandardMaterial color={boltColor} transparent opacity={opacity} roughness={0.35} metalness={0.75} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* ── Check valve body stub (discharge pipe only – heuristic on height) ── */}
      {pipeH > 1.0 && (
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.32, 0.28, 0.32]} />
          <meshStandardMaterial color="#3a5060" transparent opacity={opacity} roughness={0.55} metalness={0.5} />
        </mesh>
      )}
    </MachinePart>
  );
}
