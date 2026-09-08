import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useMachineStore } from "../../store/machineStore";
import { getComponentFromMachine } from "../../data/machineRegistry";
import { answerQuestion, SUGGESTED_QUESTIONS, type AssistantMessage } from "../../features/ai-assistant/assistantEngine";
import { useTranslation } from "../../i18n/useTranslation";

export function AssistantPanel() {
  const assistantOpen = useMachineStore((s) => s.assistantOpen);
  const toggleAssistant = useMachineStore((s) => s.toggleAssistant);
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const selectedMachineId = useMachineStore((s) => s.selectedMachineId);
  const { t } = useTranslation();
  const component = getComponentFromMachine(selectedMachineId, selectedComponentId);

  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (assistantOpen) {
      setMessages([
        {
          id: "intro",
          role: "assistant",
          text: component
            ? `You're inspecting ${component.name}. Ask me anything about it — try one of the suggestions below.`
            : t("selectComponentPrompt"),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantOpen, selectedComponentId]);

  if (!assistantOpen) return null;

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: AssistantMessage = { id: crypto.randomUUID(), role: "user", text };
    const reply: AssistantMessage = { id: crypto.randomUUID(), role: "assistant", text: answerQuestion(text, component) };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <div className="pointer-events-auto absolute bottom-4 right-4 z-30 flex h-[26rem] w-80 flex-col rounded-lg border border-industrial-border bg-industrial-panel shadow-2xl">
      <div className="flex items-center justify-between border-b border-industrial-border px-3 py-2.5">
        <div className="flex items-center gap-1.5 text-sm font-medium text-industrial-text">
          <Sparkles size={14} className="text-industrial-accent" />
          {t("aiAssistant")}
        </div>
        <button onClick={toggleAssistant} aria-label="Close assistant" className="rounded p-1 text-industrial-muted hover:bg-industrial-panel-alt hover:text-industrial-text">
          <X size={14} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[90%] whitespace-pre-line rounded-lg px-2.5 py-1.5 text-xs leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-industrial-accent/20 text-industrial-text"
                : "bg-industrial-panel-alt text-industrial-text"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {component && (
        <div className="flex flex-wrap gap-1.5 border-t border-industrial-border px-3 py-2">
          {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border border-industrial-border px-2 py-1 text-[10px] text-industrial-muted hover:border-industrial-accent/50 hover:text-industrial-text"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-1.5 border-t border-industrial-border p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("askAboutComponent")}
          aria-label={t("askAboutComponent")}
          className="flex-1 rounded-md border border-industrial-border bg-industrial-panel-alt px-2.5 py-1.5 text-xs text-industrial-text placeholder:text-industrial-muted focus:border-industrial-accent focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex h-7 w-7 items-center justify-center rounded-md bg-industrial-accent/20 text-industrial-accent hover:bg-industrial-accent/30"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
