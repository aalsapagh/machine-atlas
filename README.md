# Industrial Machine Atlas

**Live demo: [machine-atlas.vercel.app](https://machine-atlas.vercel.app)**

An interactive 3D industrial machine explorer — inspect a centrifugal pump assembly (P-101) in 3D, drill into any component's function, maintenance history, failure modes, and spare parts.

## Stack

React 19 + TypeScript + Vite, Three.js via React Three Fiber and drei, Tailwind CSS v4, Zustand for UI state, Lucide React icons.

## Running it

```bash
npm install
npm run dev       # dev server, http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## What's implemented

- **Procedural 3D pump assembly** (no external model dependency): motor, coupling, bearing housing, shaft, pump casing, impeller, base plate, foundation, inlet/outlet pipe, pressure gauge, and temperature sensor — each a separate, selectable Three.js object built from primitives (`src/components/machine/parts/`).
- **Selection & highlighting**: click a part in the viewport or the component tree to select it; hover shows a tooltip and a highlight outline; clicking empty space clears the selection.
- **Isolate**: hides every other component and shows an "Exit Isolation" pill.
- **Exploded view**: animates every component to a predefined offset and smoothly interpolates back.
- **Layers**: toggle Mechanical / Electrical / Instrumentation / Piping / Foundation visibility from the toolbar dropdown, and the sidebar dims hidden categories.
- **View controls**: Default / Front / Side / Top camera presets, all animated, plus free orbit/zoom via mouse.
- **Component tree** (left sidebar): grouped by category, each row shows a health dot; collapses into a slide-over drawer on small screens.
- **Details panel** (right): Overview, Maintenance (checklist + history + due date), Failure Modes (severity, symptoms, recommended action), and Spare Parts (stock status, quantity, supplier) tabs; becomes a slide-over drawer on small/medium screens.
- **Search**: matches component name, category, function text, failure mode names, and spare part numbers/names; clicking a result selects that component.
- **Dashboard overlay**: overall weighted health, active warnings, components due for maintenance, last/next maintenance dates.
- **Simulated AI assistant**: a small chat panel that answers questions about the selected component (function, failure modes, next maintenance, spare parts, status) from the structured data — no external LLM call. The logic lives in one function (`src/features/ai-assistant/assistantEngine.ts`) so it can be swapped for a real API call later without touching the UI.
- **Responsive layout**: sidebar and details panel become drawers under `lg`/`md` breakpoints; the 3D viewport stays usable at all sizes.
- **Dark industrial visual theme**: charcoal background, neutral panels, blue selection accent, green/amber/red health colors.

## Architecture

```
src/
  components/
    layout/            Sidebar
    navigation/         TopToolbar, SearchResults, LayersPanel
    machine/            3D pump parts, camera rig, hover tooltip, isolation banner, view controls
    component-panel/    Right-hand details panel + its four tabs
    dashboard/          Machine health overview panel
    ai-assistant/        Assistant chat panel
  features/
    machine-explorer/    Canvas/Viewport wrapper
    ai-assistant/         Rule-based assistant "engine"
  data/                  machineData.ts — the single source of truth for all component data
  store/                 machineStore.ts — Zustand store for selection/isolation/explode/layers/search/etc.
  types/                 machine.ts — shared TypeScript types
  utils/                 explosionOffsets.ts, machineHelpers.ts (formatting, search, health calc)
```

Component data (descriptions, failure modes, spare parts, maintenance history) is centralized in `src/data/machineData.ts` — none of it is hardcoded into UI components.

## Known limitations

- The 3D model is procedural (primitive-built), not a real engineering CAD model. `MachinePart` positions/animates each part by ID, so swapping in a GLTF/GLB model later mainly means replacing the geometry inside each `parts/*.tsx` file (or driving a single loaded scene's named meshes from the same component IDs) — the selection, isolation, exploded-view, and camera logic don't need to change.
- The AI assistant is rule-based pattern matching over the selected component's data, not a real language model.
- Only one machine (P-101) exists; the machine selector in the toolbar is currently decorative.
- No backend/persistence — all data is static demo data in `machineData.ts`.

## Next steps for real data

1. Replace the procedural geometry with a GLTF/GLB model, keeping one root object per component id (or a mapping from mesh name → component id) so the existing selection/isolation/exploded-view code keeps working unchanged.
2. Replace `src/data/machineData.ts` with a fetch from a real CMMS/EAM system (SAP PM, IBM Maximo, etc.) or a small backend API, matched to the same `MachineComponent` shape.
3. Wire live sensor values (the `sensorIds` on each component) to a real telemetry feed to drive `status` dynamically instead of static demo values.
4. Replace `answerQuestion()` in `assistantEngine.ts` with a call to an LLM API, passing the selected component's JSON as context alongside the user's question.
