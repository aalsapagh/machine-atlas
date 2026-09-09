import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PumpAssembly } from "../../components/machine/PumpAssembly";
import { CameraRig } from "../../components/machine/CameraRig";
import { HoverTooltip } from "../../components/machine/HoverTooltip";
import { ViewControls } from "../../components/machine/ViewControls";
import { IsolationBanner } from "../../components/machine/IsolationBanner";

// Pump assembly centre (motor at X=-3.4, pump casing at X=0.6 → centre ≈ -1.4)
const ORBIT_TARGET = new THREE.Vector3(-1.4, 0.4, 0);

// ─────────────────────────────────────────────────────────────────────────────
// Studio lighting rig
// ─────────────────────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      {/* Soft sky ambient */}
      <ambientLight intensity={0.5} color="#c8d4ee" />

      {/* Key light – upper right front, main illumination with shadows */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.85}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.001}
      />

      {/* Fill light – upper left, cool blue bounce */}
      <directionalLight position={[-7, 6, 4]} intensity={0.55} color="#88aaff" />

      {/* Rim / back light – warm accent that separates parts from background */}
      <directionalLight position={[-2, 7, -9]} intensity={0.38} color="#ffddaa" />

      {/* Under-bounce to soften harsh shadow on the base plate underside */}
      <pointLight position={[-1.4, -1.2, 2]} intensity={0.28} color="#3a4858" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ground plane (shadow receiver + subtle grid)
// ─────────────────────────────────────────────────────────────────────────────
function Ground() {
  return (
    <>
      {/* Invisible plane that only receives shadow */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.84, 0]}>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.42} />
      </mesh>

      {/* Subtle grid giving sense of scale and surface */}
      <gridHelper
        args={[28, 56, "#18222e", "#141c28"]}
        position={[0, -0.84, 0]}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D Scene contents (must be inside <Canvas>)
// ─────────────────────────────────────────────────────────────────────────────
function PumpScene({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <Lights />
      <Ground />
      <PumpAssembly />
      <HoverTooltip />
      <CameraRig controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef as React.Ref<OrbitControlsImpl>}
        target={ORBIT_TARGET}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={22}
        maxPolarAngle={Math.PI * 0.82}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────
export function PumpViewer3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="relative h-full w-full bg-[#0a0f16]">
      <Canvas
        shadows
        camera={{
          fov:      42,
          near:     0.1,
          far:      100,
          position: [3.5, 4.0, 7.5],
        }}
        gl={{
          antialias:         true,
          toneMapping:       THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace:  THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#0a0f16"]} />
        <fog attach="fog" args={["#0a0f16", 28, 50]} />

        <Suspense fallback={null}>
          <PumpScene controlsRef={controlsRef} />
        </Suspense>
      </Canvas>

      {/* HTML overlays rendered on top of the Canvas */}
      <IsolationBanner />
      <ViewControls />
    </div>
  );
}
