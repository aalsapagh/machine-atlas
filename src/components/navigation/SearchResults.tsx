import { useMemo } from "react";
import { useMachineStore } from "../../store/machineStore";
import { machineComponents } from "../../data/machineData";
import { searchComponents } from "../../utils/machineHelpers";

export function SearchResults() {
  const searchQuery = useMachineStore((s) => s.searchQuery);
  const selectComponent = useMachineStore((s) => s.selectComponent);
  const setSearchQuery = useMachineStore((s) => s.setSearchQuery);
  const hits = useMemo(() => searchComponents(machineComponents, searchQuery).slice(0, 8), [searchQuery]);

  if (hits.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full mt-1 rounded-md border border-industrial-border bg-industrial-panel p-3 text-xs text-industrial-muted shadow-xl">
        No components match "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full mt-1 max-h-72 overflow-y-auto rounded-md border border-industrial-border bg-industrial-panel py-1 shadow-xl">
      {hits.map((hit, i) => (
        <button
          key={`${hit.component.id}-${i}`}
          onMouseDown={() => {
            selectComponent(hit.component.id);
            setSearchQuery("");
          }}
          className="flex w-full flex-col items-start gap-0.5 px-3 py-1.5 text-left text-xs hover:bg-industrial-panel-alt"
        >
          <span className="font-medium text-industrial-text">{hit.matchLabel}</span>
          <span className="text-industrial-muted">{hit.component.category}</span>
        </button>
      ))}
    </div>
  );
}
