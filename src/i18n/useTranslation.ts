import { useMachineStore } from "../store/machineStore";
import { translations, type TranslationKey } from "./translations";

export function useTranslation() {
  const language = useMachineStore((s) => s.language);
  const t = (key: TranslationKey): string => translations[language][key];
  return { t, language };
}
