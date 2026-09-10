import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GenericMachineAssembly } from "../../components/machine/GenericMachineAssembly";
import { HoverTooltip } from "../../components/machine/HoverTooltip";
import { ViewControls } from "../../components/machine/ViewControls";
import { IsolationBanner } from "../../components/machine/IsolationBanner";
import { useMachineStore } from "../../store/machineStore";

const ORBIT_TARGET = new THREE.Vector3(0, 0.5, 0);

// ─────────────────────────────────────────────────────────────────────────────
// Same synthetic workshop environment as PumpViewer3D
// ─────────────────────────────────────────────────────────────────────────────
function WorkshopEnvironment() {
  return (
    <Environment resolution={512} background={false}>
      <Lightformer
        form="rect"
        intensity={6}
        position={[0, 9, 0]}
        scale={[14, 2, 1]}
        rotation-x={Math.PI / 2}
        color="#ddeeff"
      />
      <Lightformer
        form="rect"
        intensity={2.5}
        position={[-10, 3, 0]}
        scale={[1, 8, 12]}
        rotation-y={Math.PI / 2}
        color="#5588cc"
      />
      <Lightformer
        form="rect"
        intensity={1.8}
        position={[10, 3, 0]}
        scale={[1, 8, 12]}
        rotation-y={-Math.PI / 2}
        color="#ffddaa"
      />
      <Lightformer
        form="rect"
        intensity={1.2}
        position={[0, 2, 12]}
        scale={[14, 5, 1]}
        rotation-y={Math.PI}
        color="#c8d8f0"
      />
      <Lightformer
        form="rect"
        intensity={0.6}
        position={[0, 4, -10]}
        scale={[14, 4, 1]}
        color="#ffe8bb"
      />
      <Lightformer
        form="ring"
        intensity={0.25}
        position={[0, -3, 0]}
        scale={8}
        rotation-x={-Math.PI / 2}
        color="#3a4a5a"
      />
    </Environment>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#aabbcc" />
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={55}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-7, 8, 4]} intensity={0.55} color="#88aaff" />
      <directionalLight position={[0, 6, -10]} intensity={0.4} color="#ffddaa" />
      <pointLight position={[0, -1.0, 2.5]} intensity={0.3} color="#2a3848" />
    </>
  );
}

function Ground() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 60, "#18222e", "#111820"]} position={[0, -0.85, 0]} />
    </>
  );
}

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
