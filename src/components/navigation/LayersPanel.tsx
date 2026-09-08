import { useMachineStore, ALL_LAYERS } from "../../store/machineStore";

export function LayersPanel() {
  const layersPanelOpen = useMachineStore((s) => s.layersPanelOpen);
  const visibleLayers = useMachineStore((s) => s.visibleLayers);
  const toggleLayer = useMachineStore((s) => s.toggleLayer);
  const setAllLayers = useMachineStore((s) => s.setAllLayers);

  if (!layersPanelOpen) return null;

  return (
    <div className="absolute right-4 top-14 z-20 w-56 rounded-md border border-industrial-border bg-industrial-panel p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-industrial-muted">Layers</span>
        <div className="flex gap-2 text-[11px]">
          <button onClick={() => setAllLayers(true)} className="text-industrial-accent hover:underline">
            All
          </button>
          <button onClick={() => setAllLayers(false)} className="text-industrial-muted hover:underline">
            None
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {ALL_LAYERS.map((layer) => {
          const checked = visibleLayers.includes(layer);
          return (
            <label key={layer} className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-industrial-panel-alt">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleLayer(layer)}
                className="h-3.5 w-3.5 accent-blue-500"
              />
              <span className="text-industrial-text">{layer}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
