export type ComponentStatus = "healthy" | "warning" | "critical";

export type ComponentCategory =
  | "Mechanical"
  | "Electrical"
  | "Instrumentation"
  | "Piping"
  | "Foundation"
  | "Drivetrain"
  | "Braking"
  | "Suspension"
  | "Body"
  | "Fuel System";

export type MachineModelType = 'pump' | 'motorcycle' | 'car' | 'tricycle' | 'truck' | 'compressor' | 'generator' | 'conveyor' | 'generic';

export interface MachineDefinition {
  info: MachineInfo;
  components: MachineComponent[];
  modelType: MachineModelType;
}

export interface FailureMode {
  name: string;
  severity: "low" | "medium" | "high";
  symptoms: string[];
  recommendedAction: string;
}

export interface SparePart {
  partNumber: string;
  name: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  quantity: number;
  supplier: string;
}

export interface MaintenanceHistoryEntry {
  date: string;
  action: string;
  technician: string;
  notes?: string;
}

export interface MachineComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  function: string;
  location: string;
  status: ComponentStatus;
  maintenanceIntervalDays: number;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  maintenanceChecklist: string[];
  maintenanceHistory: MaintenanceHistoryEntry[];
  failureModes: FailureMode[];
  spareParts: SparePart[];
  sensorIds: string[];
  position: [number, number, number];
  explodedOffset: [number, number, number];
  /** approximate bounding size, used for geometry + camera framing */
  size: [number, number, number];
}

export interface MachineInfo {
  id: string;
  name: string;
  tag: string;
  type: string;
  status: "Operational" | "Degraded" | "Shutdown";
  overallHealth: number;
}

export type CameraView = "default" | "front" | "side" | "top";

export type ActivePanel = "overview" | "maintenance" | "failure-modes" | "spare-parts";

export type Language = "en" | "ar";
