import { create } from "zustand";
import type { ActivePanel, CameraView, ComponentCategory } from "../types/machine";

export const ALL_LAYERS: ComponentCategory[] = [
  "Mechanical",
  "Electrical",
  "Instrumentation",
  "Piping",
  "Foundation",
];

interface MachineState {
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  isolatedComponentId: string | null;
  explodedView: boolean;
  visibleLayers: ComponentCategory[];
  searchQuery: string;
  activePanel: ActivePanel;
  cameraView: CameraView;
  cameraResetToken: number;
  layersPanelOpen: boolean;
  assistantOpen: boolean;
  dashboardOpen: boolean;

  selectComponent: (id: string | null) => void;
  setHoveredComponent: (id: string | null) => void;
  isolateComponent: (id: string) => void;
  exitIsolation: () => void;
  toggleExplodedView: () => void;
  setExplodedView: (value: boolean) => void;
  toggleLayer: (layer: ComponentCategory) => void;
  setAllLayers: (visible: boolean) => void;
  setSearchQuery: (q: string) => void;
  setActivePanel: (panel: ActivePanel) => void;
  setCameraView: (view: CameraView) => void;
  resetView: () => void;
  toggleLayersPanel: () => void;
  toggleAssistant: () => void;
  toggleDashboard: () => void;
}

export const useMachineStore = create<MachineState>((set, get) => ({
  selectedComponentId: null,
  hoveredComponentId: null,
  isolatedComponentId: null,
  explodedView: false,
  visibleLayers: [...ALL_LAYERS],
  searchQuery: "",
  activePanel: "overview",
  cameraView: "default",
  cameraResetToken: 0,
  layersPanelOpen: false,
  assistantOpen: false,
  dashboardOpen: true,

  selectComponent: (id) => set({ selectedComponentId: id, activePanel: "overview" }),
  setHoveredComponent: (id) => set({ hoveredComponentId: id }),

  isolateComponent: (id) => set({ isolatedComponentId: id, selectedComponentId: id }),
  exitIsolation: () => set({ isolatedComponentId: null }),

  toggleExplodedView: () => set({ explodedView: !get().explodedView }),
  setExplodedView: (value) => set({ explodedView: value }),

  toggleLayer: (layer) => {
    const current = get().visibleLayers;
    const isVisible = current.includes(layer);
    set({
      visibleLayers: isVisible
        ? current.filter((l) => l !== layer)
        : [...current, layer],
    });
  },
  setAllLayers: (visible) => set({ visibleLayers: visible ? [...ALL_LAYERS] : [] }),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setCameraView: (view) => set({ cameraView: view, cameraResetToken: get().cameraResetToken + 1 }),

  resetView: () =>
    set((state) => ({
      selectedComponentId: null,
      isolatedComponentId: null,
      explodedView: false,
      visibleLayers: [...ALL_LAYERS],
      searchQuery: "",
      cameraView: "default",
      cameraResetToken: state.cameraResetToken + 1,
    })),

  toggleLayersPanel: () => set({ layersPanelOpen: !get().layersPanelOpen }),
  toggleAssistant: () => set({ assistantOpen: !get().assistantOpen }),
  toggleDashboard: () => set({ dashboardOpen: !get().dashboardOpen }),
}));
