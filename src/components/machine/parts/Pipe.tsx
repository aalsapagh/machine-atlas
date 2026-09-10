import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

export function Pipe({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);

  const pipeH  = component.size[1];
  const pipeMat = {
    color: baseColor, emissive: emissiveColor, emissiveIntensity,
    transparent: true, opacity, roughness: 0.42, metalness: 0.55,
    clearcoat: 0.7, clearcoatRoughness: 0.22,
  };
  const darkMetal = { color: "#1e2a38", transparent: true, opacity, roughness: 0.52, metalness: 0.68 };
  const boltMat   = { color: "#5a6878", transparent: true, opacity, roughness: 0.30, metalness: 0.80 };

  return (
    <MachinePart component={component}>
      {/* ── Pipe body ── */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.155, 0.155, pipeH, 24]} />
        <meshPhysicalMaterial {...pipeMat} />
      </mesh>

      {/* ── Inner bore at ends ── */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[0, s * (pipeH / 2 - 0.012), 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.022, 20]} />
          <meshStandardMaterial color="#080d12" transparent opacity={opacity} roughness={0.95} />
        </mesh>
      ))}

      {/* ── Weld-neck flanges ── */}
      {[-1, 1].map((s, i) => (
        <group key={i}>
          <mesh position={[0, s * (pipeH / 2 - 0.026), 0]}>
            <cylinderGeometry args={[0.225, 0.225, 0.048, 26]} />
            <meshStandardMaterial {...darkMetal} />
          </mesh>
          {/* Face ring */}
          <mesh position={[0, s * (pipeH / 2 - 0.006), 0]}>
            <torusGeometry args={[0.185, 0.012, 6, 26]} />
            <meshStandardMaterial color="#141c28" transparent opacity={opacity} roughness={0.5} />
          </mesh>
          {/* 6 flange bolts */}
          {Array.from({ length: 6 }, (_, b) => {
            const a = (b / 6) * Math.PI * 2;
            const bx = Math.cos(a) * 0.202;
            const bz = Math.sin(a) * 0.202;
            return (
              <mesh key={b} position={[bx, s * (pipeH / 2 - 0.026), bz]} rotation={[H, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.062, 8]} />
                <meshStandardMaterial {...boltMat} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* ── Check valve body (discharge pipe only, taller pipe heuristic) ── */}
      {pipeH > 1.0 && (
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.33, 0.30, 0.33]} />
          <meshPhysicalMaterial color="#3a5060" transparent opacity={opacity} roughness={0.52} metalness={0.5} clearcoat={0.6} clearcoatRoughness={0.28} />
        </mesh>
      )}
    </MachinePart>
  );
}
