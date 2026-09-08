import type { MachineComponent } from "../types/machine";

/**
 * Computes the world position of a component given the global exploded-view
 * state. When exploded, each component moves along its predefined offset
 * vector away from the assembly core.
 */
export function getComponentPosition(
  component: MachineComponent,
  exploded: boolean,
  progress = 1
): [number, number, number] {
  if (!exploded) return component.position;
  const [px, py, pz] = component.position;
  const [ox, oy, oz] = component.explodedOffset;
  return [px + ox * progress, py + oy * progress, pz + oz * progress];
}
