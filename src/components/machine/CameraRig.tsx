import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useMachineStore } from "../../store/machineStore";

// Assembly spans X = -3.4 (motor) to X = 0.6 (pump casing) → centre ≈ -1.4
const TARGET: [number, number, number] = [-1.4, 0.4, 0];

const VIEW_POSITIONS: Record<string, [number, number, number]> = {
  default: [3.5, 4.0, 7.5],    // professional 3/4 view – front-right elevated
  front:   [-1.4, 1.8, 9.5],   // straight-on (looking along -Z)
  side:    [7.5, 1.8, 0.0],    // right-side view (sees pump casing face)
  top:     [-1.4, 9.5, 0.2],   // plan view
};

export function CameraRig({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  const cameraView       = useMachineStore((s) => s.cameraView);
  const cameraResetToken = useMachineStore((s) => s.cameraResetToken);
  const goal             = useRef(new THREE.Vector3(...VIEW_POSITIONS.default));
  const goalTarget       = useRef(new THREE.Vector3(...TARGET));
  const animating        = useRef(false);

  useEffect(() => {
    const pos = VIEW_POSITIONS[cameraView] ?? VIEW_POSITIONS.default;
    goal.current.set(pos[0], pos[1], pos[2]);
    goalTarget.current.set(TARGET[0], TARGET[1], TARGET[2]);
    animating.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraView, cameraResetToken]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    const speed = Math.min(1, delta * 2.8);
    camera.position.lerp(goal.current, speed);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(goalTarget.current, speed);
      controls.update();
    }
    if (camera.position.distanceTo(goal.current) < 0.015) {
      camera.position.copy(goal.current);
      animating.current = false;
    }
  });

  return null;
}
