import { MachinePart } from "../MachinePart";
import { usePartAppearance } from "../usePartAppearance";
import type { MachineComponent } from "../../../types/machine";

const H = Math.PI / 2;

/** Centrifugal pump volute casing with discharge and suction nozzles. */
export function PumpCasing({ component }: { component: MachineComponent }) {
  const { baseColor, emissiveColor, emissiveIntensity, opacity } =
    usePartAppearance(component);

  const paint = {
    color:              baseColor,
    emissive:           emissiveColor,
    emissiveIntensity:  emissiveIntensity,
    transparent:        true,
    opacity,
    roughness:          0.36,
    metalness:          0.30,
    clearcoat:          0.55,
    clearcoatRoughness: 0.3,
  };

  const darkMetal = {
    color: "#1e2a38", transparent: true, opacity,
    roughness: 0.55, metalness: 0.65,
  };

  const boltMat = {
    color: "#5a6878", transparent: true, opacity,
    roughness: 0.32, metalness: 0.78,
  };

  return (
    <MachinePart component={component}>
      {/* ── Volute main body (disc, axis along Z so flat face faces camera) ── */}
      <mesh rotation={[H, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.62, 0.62, 44, 1]} />
        <meshPhysicalMaterial {...paint} />
      </mesh>

      {/* ── Volute scroll bulge – the expanding chamber on discharge side ── */}
      {/* Upper bulge: extra material where the volute is widest */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.28, 28, 22, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshPhysicalMaterial {...paint} />
      </mesh>

      {/* ── Bolting split flanges (front & rear) ── */}
      {[-0.34, 0.34].map((z, i) => (
        <group key={i}>
          <mesh position={[0, 0, z]} rotation={[H, 0, 0]}>
            <torusGeometry args={[0.62, 0.038, 8, 44]} />
            <meshStandardMaterial {...darkMetal} />
          </mesh>
          {/* Casing split bolts (8) */}
          {Array.from({ length: 8 }, (_, b) => {
            const a  = (b / 8) * Math.PI * 2;
            const bx = Math.cos(a) * 0.63;
            const by = Math.sin(a) * 0.63;
            return (
              <mesh key={b} position={[bx, by, z]}>
                <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
                <meshStandardMaterial {...boltMat} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* ── Back cover plate / mechanical-seal housing ── */}
      <mesh position={[0, 0, 0.36]} rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.44, 0.44, 0.07, 30]} />
        <meshPhysicalMaterial color="#0e4078" transparent opacity={opacity} roughness={0.44} metalness={0.28} clearcoat={0.5} clearcoatRoughness={0.3} />
      </mesh>

      {/* ── Discharge nozzle (upward, offset toward volute tongue) ── */}
      <mesh position={[0.04, 0.80, 0]} castShadow>
        <cylinderGeometry args={[0.172, 0.190, 0.58, 22]} />
        <meshPhysicalMaterial {...paint} />
      </mesh>
      {/* Discharge weld-neck flange */}
      <mesh position={[0.04, 1.10, 0]}>
        <cylinderGeometry args={[0.255, 0.255, 0.048, 26]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Discharge flange bolts (6) */}
      {Array.from({ length: 6 }, (_, b) => {
        const a  = (b / 6) * Math.PI * 2;
        const bx = 0.04 + Math.cos(a) * 0.23;
        const bz = Math.sin(a) * 0.23;
        return (
          <mesh key={b} position={[bx, 1.10, bz]} rotation={[H, 0, 0]}>
            <cylinderGeometry args={[0.021, 0.021, 0.065, 8]} />
            <meshStandardMaterial {...boltMat} />
          </mesh>
        );
      })}

      {/* ── Suction nozzle (front face, +Z direction) ── */}
      <mesh position={[0, -0.11, 0.65]} rotation={[H, 0, 0]} castShadow>
        <cylinderGeometry args={[0.200, 0.200, 0.40, 22]} />
        <meshPhysicalMaterial color="#1a5aa0" transparent opacity={opacity} roughness={0.38} metalness={0.28} clearcoat={0.5} clearcoatRoughness={0.28} />
      </mesh>
      {/* Suction flange */}
      <mesh position={[0, -0.11, 0.865]} rotation={[H, 0, 0]}>
        <cylinderGeometry args={[0.272, 0.272, 0.048, 26]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Suction bolts (8) */}
      {Array.from({ length: 8 }, (_, b) => {
        const a  = (b / 8) * Math.PI * 2;
        const bx = Math.cos(a) * 0.250;
        const by = Math.sin(a) * 0.250 + (-0.11);
        return (
          <mesh key={b} position={[bx, by, 0.868]}>
            <cylinderGeometry args={[0.021, 0.021, 0.065, 8]} />
            <meshStandardMaterial {...boltMat} />
          </mesh>
        );
      })}

      {/* ── Drain plug (bottom) ── */}
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.06, 10]} />
        <meshStandardMaterial color="#5a6878" transparent opacity={opacity} roughness={0.4} metalness={0.7} />
      </mesh>
    </MachinePart>
  );
}
