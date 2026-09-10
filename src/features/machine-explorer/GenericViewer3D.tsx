import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GenericMachineAssembly } from "../../components/machine/GenericMachineAssembly";
import { HoverTooltip } from "../../components/machine/HoverTooltip";
import { ViewControls } from "../../components/machine/ViewControls";
import { IsolationBanner } from "../../components/machine/IsolationBanner";
import { useMachineStore } from "../../store/machineStore";
import { WorkshopEnvironment, SceneLights, Ground, PostFX } from "../../components/machine/SceneEnvironment";

const ORBIT_TARGET = new THREE.Vector3(0, 0.5, 0);

function GenericScene({
  controlsRef,
  machineId,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  machineId: string;
}) {
  return (
    <>
      <WorkshopEnvironment />
      <SceneLights />
      <Ground />
      <GenericMachineAssembly machineId={machineId} />
      <HoverTooltip />
      <PostFX />

      <OrbitControls
        ref={controlsRef as React.Ref<OrbitControlsImpl>}
        target={ORBIT_TARGET}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.5}
        maxDistance={30}
        maxPolarAngle={Math.PI * 0.82}
      />
    </>
  );
}

export function GenericViewer3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);

  return (
    <div className="relative h-full w-full bg-[#080d12]">
      <Canvas
        shadows
        camera={{ fov: 42, near: 0.1, far: 100, position: [5, 5, 10] }}
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
          <GenericScene controlsRef={controlsRef} machineId={selectedMachineId} />
        </Suspense>
      </Canvas>

      <IsolationBanner />
      <ViewControls />
    </div>
  );
}
