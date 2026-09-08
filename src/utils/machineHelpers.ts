import type { ComponentStatus, MachineComponent } from "../types/machine";

export const statusColor: Record<ComponentStatus, string> = {
  healthy: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
};

export const statusLabel: Record<ComponentStatus, string> = {
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export interface SearchHit {
  component: MachineComponent;
  matchType: "name" | "category" | "function" | "failure-mode" | "spare-part";
  matchLabel: string;
}

export function searchComponents(components: MachineComponent[], query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const c of components) {
    if (c.name.toLowerCase().includes(q)) {
      hits.push({ component: c, matchType: "name", matchLabel: c.name });
    }
    if (c.category.toLowerCase().includes(q)) {
      hits.push({ component: c, matchType: "category", matchLabel: `${c.category} category` });
    }
    if (c.function.toLowerCase().includes(q)) {
      hits.push({ component: c, matchType: "function", matchLabel: `Function: ${c.function.slice(0, 40)}…` });
    }
    for (const fm of c.failureModes) {
      if (fm.name.toLowerCase().includes(q)) {
        hits.push({ component: c, matchType: "failure-mode", matchLabel: `${c.name} — ${fm.name}` });
      }
    }
    for (const sp of c.spareParts) {
      if (sp.partNumber.toLowerCase().includes(q) || sp.name.toLowerCase().includes(q)) {
        hits.push({ component: c, matchType: "spare-part", matchLabel: `${sp.partNumber} — ${sp.name}` });
      }
    }
  }
  return hits;
}

export function overallHealthFromComponents(components: MachineComponent[]): number {
  const weights: Record<ComponentStatus, number> = { healthy: 100, warning: 65, critical: 25 };
  const sum = components.reduce((acc, c) => acc + weights[c.status], 0);
  return Math.round(sum / components.length);
}
