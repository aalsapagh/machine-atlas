import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MachineComponent } from "../../types/machine";
import { useMachineStore } from "../../store/machineStore";
import { getComponentPosition } from "../../utils/explosionOffsets";
import { statusColor } from "../../utils/machineHelpers";
import { categoryBaseColor } from "./categoryColors";

interface MachinePartProps {
  component: MachineComponent;
  children: React.ReactNode;
}

export function MachinePart({ component, children }: MachinePartProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [localHover, setLocalHover] = useState(false);

  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const isolatedComponentId = useMachineStore((s) => s.isolatedComponentId);
  const explodedView = useMachineStore((s) => s.explodedView);
  const visibleLayers = useMachineStore((s) => s.visibleLayers);
  const selectComponent = useMachineStore((s) => s.selectComponent);
  const setHoveredComponent = useMachineStore((s) => s.setHoveredComponent);

  const isSelected = selectedComponentId === component.id;
  const isIsolated = isolatedComponentId !== null;
  const isIsolatedTarget = isolatedComponentId === component.id;
  const isLayerVisible = visibleLayers.includes(component.category);

  const targetPos = useMemo(
    () => getComponentPosition(component, explodedView),
    [component, explodedView]
  );

  const visible = isLayerVisible && (!isIsolated || isIsolatedTarget);
  const faded = isIsolated && !isIsolatedTarget;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const speed = Math.min(1, delta * 4);
    g.position.x += (targetPos[0] - g.position.x) * speed;
    g.position.y += (targetPos[1] - g.position.y) * speed;
    g.position.z += (targetPos[2] - g.position.z) * speed;
  });

  const baseColor = categoryBaseColor[component.category];
  const accent = isSelected ? "#3b82f6" : localHover ? "#93c5fd" : statusColor[component.status];

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      position={component.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setLocalHover(true);
        setHoveredComponent(component.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setLocalHover(false);
        setHoveredComponent(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectComponent(component.id);
      }}
      userData={{ componentId: component.id, baseColor, accent, isSelected, isHovered: localHover, faded }}
    >
      {children}
    </group>
  );
}
