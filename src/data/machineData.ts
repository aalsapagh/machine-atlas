import type { MachineComponent, MachineInfo } from "../types/machine";

export const machineInfo: MachineInfo = {
  id: "p-101",
  name: "Centrifugal Pump P-101",
  tag: "P-101",
  type: "Horizontal Centrifugal Pump",
  status: "Operational",
  overallHealth: 92,
};

export const machineComponents: MachineComponent[] = [
  {
    id: "motor",
    name: "Motor",
    category: "Electrical",
    description:
      "A 55 kW three-phase induction motor that drives the pump shaft via a flexible coupling.",
    function:
      "Converts electrical energy into rotational mechanical energy to drive the pump impeller.",
    location: "Drive end, mounted on the base plate opposite the pump casing.",
    designRationale:
      "The body is a cylinder because that is the natural shape of the rotating magnetic field inside: a round laminated stator sheds heat and resists internal pressure evenly in every direction, with no corners to concentrate stress. The ribbed fins around it exist purely to add surface area — more skin to shed heat into passing air without making the motor any bigger. The rear fan cowl mirrors that logic in plastic: light, cheap to mould, and shaped to duct air straight over the fins. Four wide-set feet, not two, resist the twisting reaction torque the motor produces every time it starts.",
    status: "healthy",
    maintenanceIntervalDays: 180,
    lastMaintenanceDate: "2026-04-02",
    nextMaintenanceDate: "2026-09-29",
    maintenanceChecklist: [
      "Check winding insulation resistance",
      "Inspect motor bearings for noise and vibration",
      "Verify cooling fan and airflow",
      "Torque-check terminal box connections",
    ],
    maintenanceHistory: [
      { date: "2026-04-02", action: "Insulation resistance test", technician: "R. Haddad", notes: "Passed, 48 MΩ" },
      { date: "2025-10-14", action: "Bearing grease replenishment", technician: "S. Otieno" },
    ],
    failureModes: [
      {
        name: "Winding insulation breakdown",
        severity: "high",
        symptoms: ["Tripping on overcurrent", "Burning smell", "Reduced insulation resistance"],
        recommendedAction: "De-energize immediately and perform full insulation resistance and polarization index test.",
      },
      {
        name: "Bearing wear",
        severity: "medium",
        symptoms: ["Audible grinding", "Elevated vibration at drive-end", "Increased running temperature"],
        recommendedAction: "Schedule bearing replacement during next planned outage.",
      },
    ],
    spareParts: [
      { partNumber: "MOT-BRG-6309", name: "Drive-end ball bearing", stockStatus: "in-stock", quantity: 4, supplier: "SKF" },
      { partNumber: "MOT-FAN-01", name: "Cooling fan assembly", stockStatus: "low-stock", quantity: 1, supplier: "WEG" },
    ],
    sensorIds: ["TMP-MOT-01", "VIB-MOT-01"],
    position: [-3.4, 0.55, 0],
    explodedOffset: [-1.6, 0.6, 0],
    size: [1.3, 1.1, 1.1],
  },
  {
    id: "coupling",
    name: "Coupling",
    category: "Mechanical",
    description:
      "A flexible elastomeric coupling connecting the motor shaft to the pump shaft, absorbing minor misalignment.",
    function: "Transmits torque from the motor shaft to the pump shaft while damping vibration.",
    location: "Between the motor and the bearing housing.",
    designRationale:
      "Two shafts driven by separate machines are never perfectly concentric — thermal growth and foundation settling alone guarantee a fraction of a millimetre of drift. A rigid joint would transmit every bit of that misalignment straight into both sets of bearings as a punishing side load. The rubber-insert design deliberately gives a little, flexing to absorb small offsets and torsional shock, and is built as the sacrificial part: cheap to replace, it fails before the motor or pump shaft ever does.",
    status: "healthy",
    maintenanceIntervalDays: 90,
    lastMaintenanceDate: "2026-06-20",
    nextMaintenanceDate: "2026-09-18",
    maintenanceChecklist: [
      "Inspect elastomeric insert for cracking",
      "Check shaft alignment with dial indicator",
      "Verify coupling guard is secure",
    ],
    maintenanceHistory: [
      { date: "2026-06-20", action: "Alignment check", technician: "R. Haddad", notes: "Within 0.05mm tolerance" },
    ],
    failureModes: [
      {
        name: "Elastomer degradation",
        severity: "medium",
        symptoms: ["Rubber fragments near coupling guard", "Increased vibration", "Knocking sound at startup"],
        recommendedAction: "Replace elastomeric insert and re-check shaft alignment.",
      },
      {
        name: "Misalignment",
        severity: "high",
        symptoms: ["Excess vibration", "Premature bearing wear", "Shaft seal leakage"],
        recommendedAction: "Stop unit and realign motor and pump shafts per OEM tolerance.",
      },
    ],
    spareParts: [
      { partNumber: "CPL-INS-08", name: "Elastomeric insert, size 08", stockStatus: "in-stock", quantity: 3, supplier: "Lovejoy" },
    ],
    sensorIds: [],
    position: [-2.3, 0.55, 0],
    explodedOffset: [-0.7, 0.3, 0],
    size: [0.45, 0.45, 0.45],
  },
  {
    id: "bearing-housing",
    name: "Bearing Housing",
    category: "Mechanical",
    description:
      "Houses the radial and thrust bearings that support the pump shaft and maintain axial/radial alignment.",
    function: "Supports the rotating shaft and absorbs radial and axial loads from the impeller.",
    location: "Between the coupling and the pump casing, on the base plate.",
    designRationale:
      "A cylinder wrapped tightly around the bearings so the oil bath inside stays fully sealed and the radial load from the spinning shaft is carried evenly around the full circumference, rather than concentrated on one wall. The wide pedestal foot beneath it is oversized on purpose — bearings fail from misalignment more than almost anything else, so the housing is built stiff enough that it will not flex or tilt under load. The small round sight glass on the side exists only so a technician can check the oil level at a glance without opening the housing and letting contamination in.",
    status: "warning",
    maintenanceIntervalDays: 120,
    lastMaintenanceDate: "2026-03-10",
    nextMaintenanceDate: "2026-09-12",
    maintenanceChecklist: [
      "Check lubricant level and condition",
      "Measure vibration (ISO 10816)",
      "Inspect for oil leakage at seals",
      "Check bearing temperature trend",
    ],
    maintenanceHistory: [
      { date: "2026-03-10", action: "Oil change", technician: "S. Otieno", notes: "Replaced with ISO VG 68" },
      { date: "2025-11-02", action: "Vibration survey", technician: "R. Haddad", notes: "4.1 mm/s RMS - acceptable" },
    ],
    failureModes: [
      {
        name: "Bearing wear",
        severity: "high",
        symptoms: ["Rising vibration trend", "Elevated housing temperature", "Audible whine"],
        recommendedAction: "Inspect lubrication and vibration levels; plan bearing replacement if trend continues.",
      },
      {
        name: "Lubrication failure",
        severity: "high",
        symptoms: ["Low oil level", "Discolored or contaminated oil", "Rapid temperature rise"],
        recommendedAction: "Top up or replace lubricant immediately and inspect seals for ingress.",
      },
      {
        name: "Misalignment",
        severity: "medium",
        symptoms: ["Uneven bearing wear", "Shaft wobble", "Coupling wear"],
        recommendedAction: "Verify shaft alignment and correct base plate shimming.",
      },
    ],
    spareParts: [
      { partNumber: "BRG-HSG-22", name: "Bearing housing seal kit", stockStatus: "in-stock", quantity: 5, supplier: "SKF" },
      { partNumber: "BRG-6212", name: "Radial ball bearing", stockStatus: "low-stock", quantity: 2, supplier: "SKF" },
    ],
    sensorIds: ["VIB-BRG-01", "TMP-BRG-01"],
    position: [-1.5, 0.55, 0],
    explodedOffset: [-0.2, 0.6, 0.6],
    size: [0.7, 0.65, 0.65],
  },
  {
    id: "shaft",
    name: "Shaft",
    category: "Mechanical",
    description:
      "A precision-machined steel shaft that transmits rotational torque from the coupling to the impeller.",
    function: "Rotates the impeller at operating speed while remaining supported by the bearing housing.",
    location: "Running through the bearing housing into the pump casing.",
    designRationale:
      "A plain round bar because a circular cross-section is the only shape that carries torque and bending loads identically no matter which way it rotates — anything else would flex unevenly once per revolution and shake itself apart. It is deliberately slender relative to its length: a shaft this size is stiff enough to hold the impeller precisely centred inside the casing, but not so massive that it wastes material or adds unnecessary rotating inertia. Where the coupling, bearings and impeller mount, the diameter steps up slightly — a shoulder for each part to seat against, so nothing can creep sideways under load.",
    status: "healthy",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2025-12-01",
    nextMaintenanceDate: "2026-11-26",
    maintenanceChecklist: [
      "Inspect for surface scoring or corrosion",
      "Check runout with dial indicator",
      "Verify keyway condition",
    ],
    maintenanceHistory: [
      { date: "2025-12-01", action: "Runout inspection", technician: "R. Haddad", notes: "0.02mm - within spec" },
    ],
    failureModes: [
      {
        name: "Shaft fatigue cracking",
        severity: "high",
        symptoms: ["Visible surface cracks", "Sudden vibration spike", "Unusual noise under load"],
        recommendedAction: "Remove from service immediately and perform dye-penetrant inspection.",
      },
      {
        name: "Corrosion pitting",
        severity: "low",
        symptoms: ["Surface pitting near seal area", "Minor seal leakage"],
        recommendedAction: "Polish affected area and monitor; replace if pitting deepens.",
      },
    ],
    spareParts: [
      { partNumber: "SFT-101-A", name: "Pump shaft, 45mm precision ground", stockStatus: "low-stock", quantity: 1, supplier: "Flowserve" },
    ],
    sensorIds: [],
    position: [-0.7, 0.55, 0],
    explodedOffset: [0.1, 0.2, -0.6],
    size: [1.4, 0.18, 0.18],
  },
  {
    id: "pump-casing",
    name: "Pump Casing",
    category: "Mechanical",
    description:
      "The volute-shaped casing that contains the impeller and directs flow from the eye to the discharge nozzle.",
    function: "Converts the impeller's kinetic energy into pressure head and guides fluid to the outlet.",
    location: "Discharge end of the pump, mounted on the base plate.",
    designRationale:
      "The spiral (volute) shape is the whole reason the pump can produce pressure at all: fluid leaves the fast-spinning impeller at high speed but low pressure, and the casing's cross-section is deliberately widened, turn by turn, as it wraps toward the discharge nozzle. That gradual widening slows the fluid down in a controlled way, and by Bernoulli's principle, that lost velocity reappears as gained pressure. A sudden, non-spiral chamber would let the flow separate and swirl chaotically instead, wasting energy as turbulence rather than delivering head. The split bolted flanges exist purely for maintenance — they let the whole casing open to reach the impeller and seal without disturbing the piping.",
    status: "healthy",
    maintenanceIntervalDays: 180,
    lastMaintenanceDate: "2026-05-15",
    nextMaintenanceDate: "2026-11-11",
    maintenanceChecklist: [
      "Inspect casing wear rings",
      "Check for external corrosion or cracking",
      "Verify casing bolts torque",
      "Inspect mechanical seal for leakage",
    ],
    maintenanceHistory: [
      { date: "2026-05-15", action: "Wear ring inspection", technician: "S. Otieno", notes: "Clearance within limits" },
    ],
    failureModes: [
      {
        name: "Casing erosion",
        severity: "medium",
        symptoms: ["Thinning wall near volute tongue", "Reduced discharge pressure"],
        recommendedAction: "Perform ultrasonic thickness testing and plan casing overhaul.",
      },
      {
        name: "Mechanical seal leakage",
        severity: "high",
        symptoms: ["Visible fluid leakage at shaft penetration", "Loss of suction"],
        recommendedAction: "Replace mechanical seal and inspect shaft sleeve for scoring.",
      },
    ],
    spareParts: [
      { partNumber: "CAS-SEAL-14", name: "Mechanical seal, 45mm", stockStatus: "in-stock", quantity: 2, supplier: "John Crane" },
      { partNumber: "CAS-WR-09", name: "Wear ring set", stockStatus: "in-stock", quantity: 4, supplier: "Flowserve" },
    ],
    sensorIds: ["PRS-CAS-01"],
    position: [0.6, 0.55, 0],
    explodedOffset: [1.4, 0.3, 0.5],
    size: [1.1, 1.1, 1.1],
  },
  {
    id: "impeller",
    name: "Impeller",
    category: "Mechanical",
    description:
      "A closed-vane impeller keyed to the shaft, generating the centrifugal force that produces flow and head.",
    function: "Accelerates fluid outward from the eye of the pump to build discharge pressure.",
    location: "Inside the pump casing, keyed to the shaft.",
    designRationale:
      "Fluid enters straight down the centre (the \"eye\") and has to leave moving outward and fast, so the vanes are curved backward against the direction of rotation rather than straight or forward-swept — that curvature is what gives the pump a stable, efficient pressure curve across its operating range instead of one that surges or stalls. The two enclosing shroud discs (a \"closed\" impeller) seal the vane passages on both sides so fluid can only travel the intended path outward through them, instead of leaking back around the edges and wasting the energy just spent accelerating it. It is deliberately the smallest, lightest rotating part in the assembly, since every gram here is inertia the motor has to spin up and the shaft has to support.",
    status: "warning",
    maintenanceIntervalDays: 180,
    lastMaintenanceDate: "2026-02-18",
    nextMaintenanceDate: "2026-08-17",
    maintenanceChecklist: [
      "Inspect vanes for erosion or cavitation damage",
      "Check balance and clearance to wear rings",
      "Verify keyway and locking nut torque",
    ],
    maintenanceHistory: [
      { date: "2026-02-18", action: "Cavitation inspection", technician: "R. Haddad", notes: "Minor pitting noted on leading edges" },
    ],
    failureModes: [
      {
        name: "Cavitation damage",
        severity: "high",
        symptoms: ["Pitted vane surfaces", "Rattling noise at low suction pressure", "Reduced flow output"],
        recommendedAction: "Check NPSH available versus required and inspect suction line for restrictions.",
      },
      {
        name: "Impeller imbalance",
        severity: "medium",
        symptoms: ["Vibration synchronous with running speed", "Uneven wear pattern"],
        recommendedAction: "Remove impeller and perform dynamic balancing.",
      },
    ],
    spareParts: [
      { partNumber: "IMP-101-C", name: "Closed impeller, 220mm", stockStatus: "out-of-stock", quantity: 0, supplier: "Flowserve" },
    ],
    sensorIds: [],
    position: [0.55, 0.55, 0],
    explodedOffset: [0.9, -0.5, -0.4],
    size: [0.55, 0.55, 0.55],
  },
  {
    id: "base-plate",
    name: "Base Plate",
    category: "Foundation",
    description:
      "A rigid steel base plate that aligns and supports the motor, bearing housing, and pump casing as one unit.",
    function: "Maintains precise relative alignment between the motor and pump while transmitting loads to the foundation.",
    location: "Mounted directly on the concrete foundation.",
    designRationale:
      "A flat plate alone would sag slightly under the weight of the motor and pump and flex with every vibration, and even a fraction of a millimetre of that flex reappears at the coupling as the misalignment bearings hate. The three I-beam-style ribs underneath solve that the efficient way: they add bending stiffness in the direction that matters most without the weight (or cost) of a solid steel slab. Casting it as one welded unit, rather than bolting the motor and pump to separate foundations, is what actually guarantees their shafts stay aligned — the whole point of the base plate is to make motor and pump move together, not independently, as the machine heats up and vibrates.",
    status: "healthy",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2025-09-30",
    nextMaintenanceDate: "2026-09-25",
    maintenanceChecklist: [
      "Check grouting for cracks or voids",
      "Verify hold-down bolt torque",
      "Inspect for corrosion at welds",
    ],
    maintenanceHistory: [
      { date: "2025-09-30", action: "Bolt torque check", technician: "S. Otieno", notes: "All bolts within spec" },
    ],
    failureModes: [
      {
        name: "Grout deterioration",
        severity: "medium",
        symptoms: ["Visible cracking under base plate", "Increased vibration transmission"],
        recommendedAction: "Re-grout affected sections and re-check alignment.",
      },
    ],
    spareParts: [
      { partNumber: "BSE-BOLT-M20", name: "Hold-down bolt set, M20", stockStatus: "in-stock", quantity: 8, supplier: "Generic" },
    ],
    sensorIds: [],
    position: [-1.4, -0.15, 0],
    explodedOffset: [0, -1.2, 0],
    size: [4.6, 0.2, 1.6],
  },
  {
    id: "foundation",
    name: "Foundation",
    category: "Foundation",
    description: "The reinforced concrete pad that anchors the entire pump skid to the floor.",
    function: "Provides a stable, vibration-damping mounting surface for the pump assembly.",
    location: "Ground level beneath the base plate.",
    designRationale:
      "A rotating machine is, by nature, a small vibration source, and mounting it directly on a light structure would let that vibration travel into the building and amplify. The concrete pad is made deliberately massive — often several times the weight of the pump skid it carries — because sheer mass is the simplest, most reliable way to absorb vibration energy: a heavy, inert block barely moves in response to forces that would visibly shake something lighter. It is also wider than the base plate on every side, so the whole assembly's weight spreads out before reaching the soil or floor slab beneath it, rather than concentrating load under four small feet.",
    status: "healthy",
    maintenanceIntervalDays: 730,
    lastMaintenanceDate: "2025-01-20",
    nextMaintenanceDate: "2027-01-19",
    maintenanceChecklist: [
      "Inspect for surface cracking",
      "Check anchor bolt embedment",
      "Verify drainage around pad",
    ],
    maintenanceHistory: [
      { date: "2025-01-20", action: "Visual inspection", technician: "S. Otieno", notes: "No defects found" },
    ],
    failureModes: [
      {
        name: "Concrete cracking",
        severity: "low",
        symptoms: ["Surface cracks near anchor points", "Settling or unevenness"],
        recommendedAction: "Engage civil engineering for crack assessment and repair.",
      },
    ],
    spareParts: [],
    sensorIds: [],
    position: [-1.4, -0.55, 0],
    explodedOffset: [0, -2.2, 0],
    size: [5.4, 0.5, 2.2],
  },
  {
    id: "inlet-pipe",
    name: "Inlet Pipe",
    category: "Piping",
    description: "The suction pipeline delivering process fluid from upstream storage into the pump eye.",
    function: "Supplies fluid to the pump suction with minimal turbulence and adequate NPSH.",
    location: "Connected to the bottom of the pump casing on the suction side.",
    designRationale:
      "The suction side runs at the lowest pressure anywhere in the system, and if that pressure drops too far, dissolved gas comes out of the fluid as bubbles that collapse violently inside the pump — cavitation, which pits metal and can destroy an impeller in weeks. The inlet pipe is kept straight and generously sized specifically to avoid that: a short, low-friction path with no unnecessary elbows or restrictions preserves as much of the available suction pressure (NPSH) as possible before it reaches the eye of the impeller. The strainer at its inlet is a deliberate weak point too, sized to be the thing that clogs and gets cleaned, rather than letting debris reach — and wreck — the impeller itself.",
    status: "healthy",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2026-01-08",
    nextMaintenanceDate: "2027-01-08",
    maintenanceChecklist: [
      "Inspect for external corrosion",
      "Check flange gasket condition",
      "Verify strainer is clear of debris",
    ],
    maintenanceHistory: [
      { date: "2026-01-08", action: "Strainer cleaning", technician: "R. Haddad" },
    ],
    failureModes: [
      {
        name: "Strainer blockage",
        severity: "medium",
        symptoms: ["Reduced suction pressure", "Pump cavitation noise"],
        recommendedAction: "Isolate and clean suction strainer.",
      },
      {
        name: "Flange gasket leak",
        severity: "medium",
        symptoms: ["Visible fluid seepage at flange", "Loss of prime"],
        recommendedAction: "Replace gasket and re-torque flange bolts in star pattern.",
      },
    ],
    spareParts: [
      { partNumber: "PIP-GSK-6IN", name: "Flange gasket, 6 inch", stockStatus: "in-stock", quantity: 6, supplier: "Generic" },
    ],
    sensorIds: [],
    position: [0.6, -0.05, 0.9],
    explodedOffset: [0.6, -0.3, 1.6],
    size: [0.32, 0.9, 0.32],
  },
  {
    id: "outlet-pipe",
    name: "Outlet Pipe",
    category: "Piping",
    description: "The discharge pipeline carrying pressurized fluid from the pump casing to downstream process equipment.",
    function: "Conveys pressurized discharge flow away from the pump while withstanding system pressure.",
    location: "Connected to the top of the pump casing on the discharge side.",
    designRationale:
      "Unlike the suction pipe, this side of the pump is under full working pressure, so wall thickness and flange ratings matter far more here than pipe diameter. Routing it out the top of the casing keeps the connection at the volute's natural high point, where the discharge nozzle already sits after the fluid has finished gaining pressure. The built-in check valve is there for the moment the pump stops, not while it runs: without it, the pressurised column of fluid already in the discharge line would slam backward through the idle impeller — a water-hammer event that stresses the shaft and casing far more than steady running ever does.",
    status: "healthy",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2026-01-08",
    nextMaintenanceDate: "2027-01-08",
    maintenanceChecklist: [
      "Inspect for external corrosion",
      "Check check-valve operation",
      "Verify flange bolt torque",
    ],
    maintenanceHistory: [
      { date: "2026-01-08", action: "Check valve function test", technician: "R. Haddad", notes: "Passed" },
    ],
    failureModes: [
      {
        name: "Check valve failure",
        severity: "high",
        symptoms: ["Backflow on shutdown", "Water hammer noise"],
        recommendedAction: "Inspect and service or replace the discharge check valve.",
      },
    ],
    spareParts: [
      { partNumber: "PIP-CHK-6IN", name: "Swing check valve, 6 inch", stockStatus: "in-stock", quantity: 1, supplier: "Flowserve" },
    ],
    sensorIds: ["PRS-OUT-01"],
    position: [0.9, 1.6, 0],
    explodedOffset: [1.2, 1.4, -0.8],
    size: [0.32, 1.4, 0.32],
  },
  {
    id: "pressure-gauge",
    name: "Pressure Gauge",
    category: "Instrumentation",
    description: "A local dial gauge providing direct visual indication of pump discharge pressure.",
    function: "Displays real-time discharge pressure for operator monitoring and diagnostics.",
    location: "Mounted on the outlet pipe near the pump casing.",
    designRationale:
      "It is round for a purely mechanical reason: inside, pressure straightens a curved Bourdon tube by an amount proportional to pressure, and that motion is easiest to convert into a needle sweeping a circular scale, giving every psi of range the same angular resolution regardless of where the needle currently sits. Being a local, purely mechanical instrument — no electronics, no power supply — means it keeps reading even if the plant's control system or power goes down, which is exactly when an operator standing at the pump most needs to see pressure directly. It is mounted right at the discharge nozzle, before the fluid travels any distance downstream and loses signal to friction or elevation change.",
    status: "healthy",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2025-12-15",
    nextMaintenanceDate: "2026-12-15",
    maintenanceChecklist: [
      "Verify calibration against reference gauge",
      "Check for lens fogging or needle sticking",
      "Inspect isolation valve operation",
    ],
    maintenanceHistory: [
      { date: "2025-12-15", action: "Calibration check", technician: "S. Otieno", notes: "Within 1% of reference" },
    ],
    failureModes: [
      {
        name: "Gauge drift",
        severity: "low",
        symptoms: ["Reading inconsistent with flow conditions", "Needle sticking"],
        recommendedAction: "Recalibrate or replace the gauge.",
      },
    ],
    spareParts: [
      { partNumber: "INS-PG-016", name: "Pressure gauge, 0-16 bar", stockStatus: "in-stock", quantity: 3, supplier: "WIKA" },
    ],
    sensorIds: ["PRS-OUT-01"],
    position: [1.15, 1.05, 0],
    explodedOffset: [2.0, 1.0, -0.3],
    size: [0.22, 0.22, 0.14],
  },
  {
    id: "temperature-sensor",
    name: "Temperature Sensor",
    category: "Instrumentation",
    description: "An RTD temperature transmitter monitoring bearing housing temperature for condition monitoring.",
    function: "Continuously measures bearing temperature and feeds data to the monitoring system.",
    location: "Mounted on the bearing housing.",
    designRationale:
      "Bearing temperature is one of the earliest warning signs of a failing bearing — friction from a degrading race or starved lubrication shows up as heat well before it shows up as noise or vibration. The RTD element is built as a small probe threaded directly into the bearing housing wall precisely so its tip sits in metal-to-metal contact with the housing, rather than just reading nearby air temperature, which would lag the real bearing condition by minutes. It is deliberately compact and low-profile because its only job is measurement — anything larger would add thermal mass of its own and slow down exactly the response time the sensor exists to provide.",
    status: "critical",
    maintenanceIntervalDays: 365,
    lastMaintenanceDate: "2025-08-22",
    nextMaintenanceDate: "2026-08-22",
    maintenanceChecklist: [
      "Verify sensor calibration",
      "Check wiring and terminal connections",
      "Confirm alarm setpoints",
    ],
    maintenanceHistory: [
      { date: "2025-08-22", action: "Calibration and wiring check", technician: "R. Haddad" },
    ],
    failureModes: [
      {
        name: "Sensor drift / overheat alarm",
        severity: "high",
        symptoms: ["Reading exceeds high alarm setpoint", "Erratic signal"],
        recommendedAction: "Cross-check with handheld thermal probe; recalibrate or replace sensor.",
      },
    ],
    spareParts: [
      { partNumber: "INS-RTD-PT100", name: "PT100 RTD transmitter", stockStatus: "low-stock", quantity: 2, supplier: "Siemens" },
    ],
    sensorIds: ["TMP-BRG-01"],
    position: [-1.75, 0.85, 0.3],
    explodedOffset: [-0.6, 1.3, 1.2],
    size: [0.16, 0.28, 0.16],
  },
];

export function getComponentById(id: string | null): MachineComponent | undefined {
  if (!id) return undefined;
  return machineComponents.find((c) => c.id === id);
}
