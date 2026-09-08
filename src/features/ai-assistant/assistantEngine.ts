import type { MachineComponent } from "../../types/machine";
import { formatDate, daysUntil } from "../../utils/machineHelpers";

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

/**
 * Simulated assistant "backend". This function is intentionally isolated
 * from the UI so a real LLM call (e.g. sending the component context + the
 * question to an API) can be dropped in later without touching the chat
 * component.
 */
export function answerQuestion(question: string, component: MachineComponent | undefined): string {
  if (!component) {
    return "Select a component in the viewport or the component tree first, and I can answer questions about it — its function, failure modes, maintenance schedule, and spare parts.";
  }

  const q = question.toLowerCase();

  if (/(what.*do|function|purpose|used for)/.test(q)) {
    return `${component.name}: ${component.function}`;
  }

  if (/(failure|fail|break|wrong)/.test(q)) {
    if (component.failureModes.length === 0) return `${component.name} has no recorded failure modes.`;
    const lines = component.failureModes
      .map((fm) => `- ${fm.name} (${fm.severity} severity): ${fm.symptoms.join(", ")}`)
      .join("\n");
    return `Common failure modes for ${component.name}:\n${lines}\n\nRecommended action: ${component.failureModes[0].recommendedAction}`;
  }

  if (/(next maintenance|when.*maintain|due|schedule)/.test(q)) {
    const remaining = daysUntil(component.nextMaintenanceDate);
    const overdue = remaining < 0;
    return `Next maintenance for ${component.name} is scheduled for ${formatDate(component.nextMaintenanceDate)} (every ${component.maintenanceIntervalDays} days). ${
      overdue ? `This is ${Math.abs(remaining)} day(s) overdue.` : `That is ${remaining} day(s) from now.`
    }`;
  }

  if (/(spare|part|order|stock)/.test(q)) {
    if (component.spareParts.length === 0) return `No spare parts are associated with ${component.name}.`;
    const lines = component.spareParts
      .map((sp) => `- ${sp.partNumber} — ${sp.name} (${sp.stockStatus.replace("-", " ")}, qty ${sp.quantity}, ${sp.supplier})`)
      .join("\n");
    return `Spare parts for ${component.name}:\n${lines}`;
  }

  if (/(warning|critical|status|health|why)/.test(q)) {
    if (component.status === "healthy") {
      return `${component.name} is currently healthy with no active alerts.`;
    }
    const relevantFailure = component.failureModes[0];
    return `${component.name} is showing a ${component.status} status. This is typically related to: ${
      relevantFailure ? relevantFailure.name.toLowerCase() : "an active alert"
    }. ${relevantFailure ? `Recommended action: ${relevantFailure.recommendedAction}` : "Check the Maintenance tab for the latest checklist."}`;
  }

  if (/(checklist|inspect|maintain)/.test(q)) {
    return `Maintenance checklist for ${component.name}:\n${component.maintenanceChecklist.map((c) => `- ${c}`).join("\n")}`;
  }

  if (/(where|location)/.test(q)) {
    return `${component.name} is located: ${component.location}`;
  }

  return `Here's what I know about ${component.name}: ${component.description} You can ask about its function, failure modes, next maintenance date, spare parts, or current status.`;
}

export const SUGGESTED_QUESTIONS = [
  "What does this component do?",
  "What are common failure modes?",
  "When is the next maintenance?",
  "Which spare parts are required?",
  "Why is this component showing a warning?",
];
