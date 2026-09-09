import { useState } from "react";
import { Search, Layers, Box, RotateCcw, ChevronDown, Languages } from "lucide-react";
import { useMachineStore } from "../../store/machineStore";
import { getMachineById } from "../../data/machineRegistry";
import { SearchResults } from "./SearchResults";
import { MachineSelector } from "./MachineSelector";
import { useTranslation } from "../../i18n/useTranslation";
import { getLocalizedMachineInfo } from "../../i18n/machineTranslationsAr";

const statusDot: Record<string, string> = {
  Operational: "bg-industrial-healthy",
  Degraded: "bg-industrial-warning",
  Shutdown: "bg-industrial-critical",
};

export function TopToolbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [machineSelectorOpen, setMachineSelectorOpen] = useState(false);

  const searchQuery = useMachineStore((s) => s.searchQuery);
  const setSearchQuery = useMachineStore((s) => s.setSearchQuery);
  const explodedView = useMachineStore((s) => s.explodedView);
  const toggleExplodedView = useMachineStore((s) => s.toggleExplodedView);
  const toggleLayersPanel = useMachineStore((s) => s.toggleLayersPanel);
  const layersPanelOpen = useMachineStore((s) => s.layersPanelOpen);
  const resetView = useMachineStore((s) => s.resetView);
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const setLanguage = useMachineStore((s) => s.setLanguage);

  const { t, language } = useTranslation();
  const activeMachine = getMachineById(selectedMachineId);
  const machineInfo = activeMachine?.info;
  const localizedMachine = selectedMachineId ? getLocalizedMachineInfo(selectedMachineId, language) : undefined;

  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-4 border-b border-industrial-border bg-industrial-panel px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-industrial-accent/20 text-industrial-accent">
          <Box size={16} />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight text-industrial-text sm:inline">
          {t("appName")}
        </span>
      </div>

      <div className="hidden h-6 w-px bg-industrial-border md:block" />

      {/* Machine selector */}
      <div className="relative hidden md:block">
        <button
          onClick={() => setMachineSelectorOpen((o) => !o)}
          className="flex items-center gap-2 rounded-md border border-industrial-border bg-industrial-panel-alt px-2.5 py-1.5 text-sm text-industrial-text hover:border-industrial-accent/50"
        >
          <span className="font-medium">{machineInfo?.tag}</span>
          <span className="hidden text-industrial-muted lg:inline">
            {localizedMachine?.type ?? machineInfo?.type}
          </span>
          <ChevronDown size={14} className="text-industrial-muted" />
        </button>
        {machineSelectorOpen && (
          <MachineSelector onClose={() => setMachineSelectorOpen(false)} />
        )}
      </div>

      {machineInfo && (
        <div className="hidden items-center gap-1.5 text-xs text-industrial-muted lg:flex">
          <span className={`h-2 w-2 rounded-full ${statusDot[machineInfo.status]}`} />
          {t(machineInfo.status === "Operational" ? "operational" : machineInfo.status === "Degraded" ? "degraded" : "shutdown")}
        </div>
      )}

      <div className="relative ml-auto w-full max-w-xs">
        <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-industrial-muted" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
          placeholder={t("search")}
          aria-label={t("search")}
          className="w-full rounded-md border border-industrial-border bg-industrial-panel-alt py-1.5 pl-8 pr-2 text-sm text-industrial-text placeholder:text-industrial-muted focus:border-industrial-accent focus:outline-none"
        />
        {searchFocused && searchQuery.trim() && <SearchResults />}
      </div>

      <div className="flex items-center gap-1.5">
        <ToolbarButton label={t("layers")} active={layersPanelOpen} onClick={toggleLayersPanel} icon={<Layers size={16} />} />
        <ToolbarButton label={t("explodedView")} active={explodedView} onClick={toggleExplodedView} icon={<Box size={16} />} />
        <ToolbarButton label={t("resetView")} onClick={resetView} icon={<RotateCcw size={16} />} />
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          title={language === "en" ? "العربية" : "English"}
          aria-label="Toggle language"
          className="flex h-8 items-center gap-1 rounded-md border border-industrial-border bg-industrial-panel-alt px-2 text-xs font-medium text-industrial-muted hover:text-industrial-text"
        >
          <Languages size={14} />
          <span className="hidden xl:inline">{language === "en" ? "AR" : "EN"}</span>
        </button>
      </div>
    </header>
  );
}

function ToolbarButton({
  label,
  icon,
  onClick,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors ${
        active
          ? "border-industrial-accent/60 bg-industrial-accent/15 text-industrial-accent"
          : "border-industrial-border bg-industrial-panel-alt text-industrial-muted hover:text-industrial-text"
      }`}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}
