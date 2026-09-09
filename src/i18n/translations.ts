export type TranslationKey =
  | "appName"
  | "components"
  | "allComponents"
  | "overview"
  | "maintenance"
  | "failureModes"
  | "spareParts"
  | "search"
  | "layers"
  | "explodedView"
  | "dashboard"
  | "aiAssistant"
  | "resetView"
  | "healthy"
  | "warning"
  | "critical"
  | "overallHealth"
  | "maintenanceDue"
  | "activeWarnings"
  | "lastMaintenance"
  | "nextMaintenance"
  | "operational"
  | "degraded"
  | "shutdown"
  | "isolatedPrefix"
  | "exitIsolation"
  | "selectMachine"
  | "industrial"
  | "vehicles"
  | "marine"
  | "description"
  | "function"
  | "location"
  | "status"
  | "maintenanceInterval"
  | "maintenanceChecklist"
  | "maintenanceHistory"
  | "failureMode"
  | "severity"
  | "symptoms"
  | "recommendedAction"
  | "partNumber"
  | "partName"
  | "stockStatus"
  | "quantity"
  | "supplier"
  | "inStock"
  | "lowStock"
  | "outOfStock"
  | "low"
  | "medium"
  | "high"
  | "days"
  | "components_count"
  | "askAboutComponent"
  | "selectComponentPrompt"
  | "categoryMechanical"
  | "categoryElectrical"
  | "categoryInstrumentation"
  | "categoryPiping"
  | "categoryFoundation"
  | "categoryDrivetrain"
  | "categoryBraking"
  | "categorySuspension"
  | "categoryBody"
  | "categoryFuelSystem"
  | "frontView"
  | "sideView"
  | "topView"
  | "fitModel"
  | "noMatch"
  | "currentStatus"
  | "linkedSensors"
  | "interval"
  | "dueIn"
  | "overdue"
  | "isolate"
  | "noMaintenanceHistory"
  | "noFailureModes"
  | "noSpareParts";

type Translations = Record<TranslationKey, string>;

export const translations: Record<"en" | "ar", Translations> = {
  en: {
    appName: "Industrial Machine Atlas",
    components: "Components",
    allComponents: "All Components",
    overview: "Overview",
    maintenance: "Maintenance",
    failureModes: "Failure Modes",
    spareParts: "Spare Parts",
    search: "Search components...",
    layers: "Layers",
    explodedView: "Exploded View",
    dashboard: "Dashboard",
    aiAssistant: "AI Assistant",
    resetView: "Reset View",
    healthy: "Healthy",
    warning: "Warning",
    critical: "Critical",
    overallHealth: "Overall Health",
    maintenanceDue: "Maintenance Due",
    activeWarnings: "Active Warnings",
    lastMaintenance: "Last Maintenance",
    nextMaintenance: "Next Maintenance",
    operational: "Operational",
    degraded: "Degraded",
    shutdown: "Shutdown",
    isolatedPrefix: "Isolated:",
    exitIsolation: "Exit Isolation",
    selectMachine: "Select Machine",
    industrial: "Industrial",
    vehicles: "Vehicles",
    marine: "Marine",
    description: "Description",
    function: "Function",
    location: "Location",
    status: "Status",
    maintenanceInterval: "Maintenance Interval",
    maintenanceChecklist: "Maintenance Checklist",
    maintenanceHistory: "Maintenance History",
    failureMode: "Failure Mode",
    severity: "Severity",
    symptoms: "Symptoms",
    recommendedAction: "Recommended Action",
    partNumber: "Part Number",
    partName: "Part Name",
    stockStatus: "Stock Status",
    quantity: "Quantity",
    supplier: "Supplier",
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    low: "Low",
    medium: "Medium",
    high: "High",
    days: "days",
    components_count: "components",
    askAboutComponent: "Ask about this component...",
    selectComponentPrompt: "Select a component to start, or ask a general question about the machine.",
    categoryMechanical: "Mechanical",
    categoryElectrical: "Electrical",
    categoryInstrumentation: "Instrumentation",
    categoryPiping: "Piping",
    categoryFoundation: "Foundation",
    categoryDrivetrain: "Drivetrain",
    categoryBraking: "Braking",
    categorySuspension: "Suspension",
    categoryBody: "Body",
    categoryFuelSystem: "Fuel System",
    frontView: "Front",
    sideView: "Side",
    topView: "Top",
    fitModel: "Fit",
    noMatch: "No components match",
    currentStatus: "Current Status",
    linkedSensors: "Linked Sensors",
    interval: "Interval",
    dueIn: "Due In",
    overdue: "overdue",
    isolate: "Isolate",
    noMaintenanceHistory: "No maintenance history recorded.",
    noFailureModes: "No known failure modes recorded for this component.",
    noSpareParts: "No spare parts associated with this component.",
  },
  ar: {
    appName: "أطلس الآلات الصناعية",
    components: "المكونات",
    allComponents: "جميع المكونات",
    overview: "نظرة عامة",
    maintenance: "الصيانة",
    failureModes: "أوضاع العطل",
    spareParts: "قطع الغيار",
    search: "البحث عن المكونات...",
    layers: "الطبقات",
    explodedView: "عرض مُفكك",
    dashboard: "لوحة التحكم",
    aiAssistant: "المساعد الذكي",
    resetView: "إعادة ضبط",
    healthy: "سليم",
    warning: "تحذير",
    critical: "حرج",
    overallHealth: "الصحة العامة",
    maintenanceDue: "صيانة مستحقة",
    activeWarnings: "تحذيرات نشطة",
    lastMaintenance: "آخر صيانة",
    nextMaintenance: "الصيانة القادمة",
    operational: "تشغيلي",
    degraded: "متدهور",
    shutdown: "متوقف",
    isolatedPrefix: "معزول:",
    exitIsolation: "إلغاء العزل",
    selectMachine: "اختر الآلة",
    industrial: "صناعي",
    vehicles: "مركبات",
    marine: "بحري",
    description: "الوصف",
    function: "الوظيفة",
    location: "الموقع",
    status: "الحالة",
    maintenanceInterval: "فترة الصيانة",
    maintenanceChecklist: "قائمة الصيانة",
    maintenanceHistory: "سجل الصيانة",
    failureMode: "وضع العطل",
    severity: "الخطورة",
    symptoms: "الأعراض",
    recommendedAction: "الإجراء الموصى به",
    partNumber: "رقم القطعة",
    partName: "اسم القطعة",
    stockStatus: "حالة المخزون",
    quantity: "الكمية",
    supplier: "المورد",
    inStock: "متوفر",
    lowStock: "مخزون منخفض",
    outOfStock: "غير متوفر",
    low: "منخفض",
    medium: "متوسط",
    high: "مرتفع",
    days: "يوم",
    components_count: "مكونات",
    askAboutComponent: "اسأل عن هذا المكون...",
    selectComponentPrompt: "اختر مكونًا للبدء أو اطرح سؤالًا عامًا عن الآلة.",
    categoryMechanical: "ميكانيكي",
    categoryElectrical: "كهربائي",
    categoryInstrumentation: "أجهزة القياس",
    categoryPiping: "أنابيب",
    categoryFoundation: "أساس",
    categoryDrivetrain: "ناقل الحركة",
    categoryBraking: "الفرامل",
    categorySuspension: "التعليق",
    categoryBody: "الهيكل",
    categoryFuelSystem: "نظام الوقود",
    frontView: "أمامي",
    sideView: "جانبي",
    topView: "علوي",
    fitModel: "ملاءمة",
    noMatch: "لا توجد مكونات تطابق",
    currentStatus: "الحالة الحالية",
    linkedSensors: "أجهزة الاستشعار المرتبطة",
    interval: "الفترة",
    dueIn: "المتبقي",
    overdue: "متأخر",
    isolate: "عزل",
    noMaintenanceHistory: "لا يوجد سجل صيانة مسجّل.",
    noFailureModes: "لا توجد أوضاع عطل معروفة لهذا المكون.",
    noSpareParts: "لا توجد قطع غيار مرتبطة بهذا المكون.",
  },
};
