import { machineComponents, getComponentById } from "../../data/machineData";
import { Motor } from "./parts/Motor";
import { Coupling } from "./parts/Coupling";
import { BearingHousing } from "./parts/BearingHousing";
import { Shaft } from "./parts/Shaft";
import { PumpCasing } from "./parts/PumpCasing";
import { Impeller } from "./parts/Impeller";
import { BasePlate } from "./parts/BasePlate";
import { Foundation } from "./parts/Foundation";
import { Pipe } from "./parts/Pipe";
import { PressureGauge } from "./parts/PressureGauge";
import { TemperatureSensor } from "./parts/TemperatureSensor";

const partRenderers: Record<string, React.ComponentType<{ component: (typeof machineComponents)[number] }>> = {
  motor: Motor,
  coupling: Coupling,
  "bearing-housing": BearingHousing,
  shaft: Shaft,
  "pump-casing": PumpCasing,
  impeller: Impeller,
  "base-plate": BasePlate,
  foundation: Foundation,
  "inlet-pipe": Pipe,
  "outlet-pipe": Pipe,
  "pressure-gauge": PressureGauge,
  "temperature-sensor": TemperatureSensor,
};

export function PumpAssembly() {
  return (
    <group>
      {machineComponents.map((component) => {
        const Renderer = partRenderers[component.id];
        if (!Renderer) return null;
        return <Renderer key={component.id} component={component} />;
      })}
    </group>
  );
}

export function isValidComponentId(id: string): boolean {
  return Boolean(getComponentById(id));
}
