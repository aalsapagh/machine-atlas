import type { ComponentCategory } from "../../types/machine";

// Industrial paint colours matching a real centrifugal pump (dark blue body, steel accessories)
export const categoryBaseColor: Record<ComponentCategory, string> = {
  Mechanical:      "#1565c0",   // Industrial blue – pump casing, bearing housing, coupling
  Electrical:      "#1251a8",   // Slightly deeper blue – motor
  Instrumentation: "#c9a13b",   // Brass/gold – gauges and sensors
  Piping:          "#3a5568",   // Dark pipe-steel blue
  Foundation:      "#3c4248",   // Dark structural steel
  Drivetrain:      "#7a6abf",
  Braking:         "#bf6a6a",
  Suspension:      "#6abf8a",
  Body:            "#6a9abf",
  "Fuel System":   "#bf9a6a",
};
