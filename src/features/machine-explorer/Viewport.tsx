import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, GizmoHelper, GizmoViewport } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PumpAssembly } from "../../components/machine/PumpAssembly";
import { CameraRig } from "../../components/machine/CameraRig";
import { HoverTooltip } from "../../components/machine/HoverTooltip";
import { useMachineStore } from "../../store/machineStore";

export function Viewport() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const selectComponent = useMachineStore((s) => s.selectComponent);

  return (
    <div className="relative h-full w-full bg-industrial-bg">
      <Canvas
        shadows
        camera={{ position: [5.5, 3.2, 6.5], fov: 42 }}
        onPointerMissed={() => selectComponent(null)}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={["#14171a"]} />
        <fog attach="fog" args={["#14171a", 14, 26]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight position={[-5, 4, -4]} intensity={0.3} />
        <Suspense fallback={null}>
          <PumpAssembly />
          <HoverTooltip />
          <ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={14} blur={2.2} far={4} />
        </Suspense>
        <gridHelper args={[16, 32, "#2e3338", "#22262b"]} position={[0, -1.34, 0]} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          minDistance={2.5}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2 - 0.02}
          target={[-0.2, 0.3, 0]}
        />
        <CameraRig controlsRef={controlsRef} />
        <GizmoHelper alignment="bottom-right" margin={[70, 70]}>
          <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="#e4e7eb" />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}
