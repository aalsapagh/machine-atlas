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
import { WorkshopEnvironment, SceneLights, Ground, PostFX } from "../../components/machine/SceneEnvironment";

// Assembly centre (motor X=-3.4, pump casing X=0.6 → centre ≈ -1.4)
const ORBIT_TARGET = new THREE.Vector3(-1.4, 0.4, 0);
const CENTER_X = -1.4;

// ─────────────────────────────────────────────────────────────────────────────
// Scene root (must live inside Canvas)
// ─────────────────────────────────────────────────────────────────────────────
function PumpScene({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <WorkshopEnvironment centerX={CENTER_X} />
      <SceneLights centerX={CENTER_X} />
      <Ground />
      <PumpAssembly />
      <HoverTooltip />
      <CameraRig controlsRef={controlsRef} />
      <PostFX />

      <OrbitControls
        ref={controlsRef as React.Ref<OrbitControlsImpl>}
        target={ORBIT_TARGET}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.5}
        maxDistance={22}
        maxPolarAngle={Math.PI * 0.82}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public export
// ─────────────────────────────────────────────────────────────────────────────
export function PumpViewer3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="relative h-full w-full bg-[#080d12]">
      <Canvas
        shadows
        camera={{ fov: 42, near: 0.1, far: 100, position: [3.5, 4.0, 7.5] }}
        gl={{
          antialias:           true,
          toneMapping:         THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace:    THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#080d12"]} />
        <fog attach="fog" args={["#080d12", 30, 55]} />

        <Suspense fallback={null}>
          <PumpScene controlsRef={controlsRef} />
        </Suspense>
      </Canvas>

      <IsolationBanner />
      <ViewControls />
    </div>
  );
}
