import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useMachineStore } from "../../store/machineStore";

const VIEW_POSITIONS: Record<string, [number, number, number]> = {
  default: [5.5, 3.2, 6.5],
  front: [0, 1, 9],
  side: [9, 1, 0],
  top: [0.2, 8.5, 0.1],
};

const TARGET: [number, number, number] = [-0.2, 0.3, 0];

export function CameraRig({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();
  const cameraView = useMachineStore((s) => s.cameraView);
  const cameraResetToken = useMachineStore((s) => s.cameraResetToken);
  const goal = useRef(new THREE.Vector3(...VIEW_POSITIONS.default));
  const goalTarget = useRef(new THREE.Vector3(...TARGET));
  const animating = useRef(false);

  useEffect(() => {
    const pos = VIEW_POSITIONS[cameraView] ?? VIEW_POSITIONS.default;
    goal.current.set(pos[0], pos[1], pos[2]);
    goalTarget.current.set(TARGET[0], TARGET[1], TARGET[2]);
    animating.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraView, cameraResetToken]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    const speed = Math.min(1, delta * 2.5);
    camera.position.lerp(goal.current, speed);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(goalTarget.current, speed);
      controls.update();
    }
    if (camera.position.distanceTo(goal.current) < 0.01) {
      animating.current = false;
    }
  });

  return null;
}
