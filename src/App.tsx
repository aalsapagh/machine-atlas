import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { TopToolbar } from "./components/navigation/TopToolbar";
import { LayersPanel } from "./components/navigation/LayersPanel";
import { Sidebar } from "./components/layout/Sidebar";
import { DetailsPanel } from "./components/component-panel/DetailsPanel";
import { Viewport } from "./features/machine-explorer/Viewport";
import { DashboardPanel } from "./components/dashboard/DashboardPanel";
import { ViewControls } from "./components/machine/ViewControls";
import { IsolationBanner } from "./components/machine/IsolationBanner";
import { AssistantPanel } from "./components/ai-assistant/AssistantPanel";
import { useMachineStore } from "./store/machineStore";

function App() {
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);

  useEffect(() => {
    if (selectedComponentId) setMobileDetailsOpen(true);
  }, [selectedComponentId]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-industrial-bg text-industrial-text">
      <div className="flex items-center">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open component list"
          className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center text-industrial-muted md:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="flex-1">
          <TopToolbar />
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <main className="relative min-w-0 flex-1">
          <Viewport />
          <LayersPanel />
          <DashboardPanel />
          <IsolationBanner />
          <ViewControls />
          <AssistantPanel />
        </main>

        <div className="hidden lg:flex">
          <DetailsPanel />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative z-10 h-full">
              <Sidebar onSelectAny={() => setMobileSidebarOpen(false)} />
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              aria-label="Close component list"
              className="absolute right-3 top-3 z-20 rounded p-1.5 text-industrial-text"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Mobile / tablet details drawer */}
        {mobileDetailsOpen && selectedComponentId && (
          <div className="fixed inset-0 z-40 flex justify-end lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileDetailsOpen(false)} />
            <div className="relative z-10 h-full">
              <DetailsPanel onClose={() => setMobileDetailsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
