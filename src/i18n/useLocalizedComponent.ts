import type { MachineComponent } from "../types/machine";
import { useMachineStore } from "../store/machineStore";
import { getComponentArFields } from "./componentTranslationsAr";

/**
 * Returns the full component list with Arabic names applied when language is "ar".
 * Safe to call at the top of a component (not inside a loop).
 */
export function useLocalizedComponents(
  components: MachineComponent[],
  machineId: string
): MachineComponent[] {
  const language = useMachineStore((s) => s.language);
  if (language !== "ar") return components;
  return components.map((c) => {
    const arName = getComponentArFields(machineId, c.id)?.name;
    return arName ? { ...c, name: arName } : c;
  });
}

/**
 * Returns the component with Arabic fields overlaid when the active language is "ar".
 * Falls back to English data for any field that has no Arabic translation.
 */
export function useLocalizedComponent(
  component: MachineComponent,
  machineId: string
): MachineComponent {
  const language = useMachineStore((s) => s.language);

  if (language !== "ar") return component;

  const ar = getComponentArFields(machineId, component.id);
  if (!ar) return component;

  return {
    ...component,
    name: ar.name ?? component.name,
    description: ar.description ?? component.description,
    function: ar.function ?? component.function,
    location: ar.location ?? component.location,
    maintenanceChecklist: ar.maintenanceChecklist ?? component.maintenanceChecklist,
    failureModes:
      ar.failureModes
        ? component.failureModes.map((fm, i) => ({
            ...fm,
            name: ar.failureModes![i]?.name ?? fm.name,
            symptoms: ar.failureModes![i]?.symptoms ?? fm.symptoms,
            recommendedAction: ar.failureModes![i]?.recommendedAction ?? fm.recommendedAction,
          }))
        : component.failureModes,
  };
}
