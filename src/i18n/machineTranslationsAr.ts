// Arabic translations for machine-level info fields (name, type).
// Keyed by machine id.

interface MachineArInfo {
  name: string;
  type: string;
}

const machineTranslationsAr: Record<string, MachineArInfo> = {
  "p-101": {
    name: "مضخة طاردة مركزية",
    type: "مضخة طاردة",
  },
  "mc-701": {
    name: "دراجة نارية هوندا CB500F",
    type: "دراجة نارية رياضية",
  },
  "car-801": {
    name: "سيارة تويوتا كامري",
    type: "سيارة ركاب",
  },
  "tri-901": {
    name: "دراجة توصيل كهربائية ثلاثية العجلات",
    type: "دراجة ثلاثية كهربائية",
  },
  "trk-1001": {
    name: "شاحنة فولفو FH16 الثقيلة",
    type: "شاحنة قاطرة",
  },
  "ac-301": {
    name: "ضاغط هواء صناعي",
    type: "ضاغط ترددي",
  },
  "gen-401": {
    name: "مجموعة مولّد ديزل",
    type: "مولّد احتياطي 30 كيلو فولت أمبير",
  },
  "conv-501": {
    name: "نظام حزام ناقل",
    type: "حزام ناقل مسطح",
  },
};

export function getLocalizedMachineInfo(
  machineId: string,
  language: string
): MachineArInfo | undefined {
  if (language !== "ar") return undefined;
  return machineTranslationsAr[machineId];
}
